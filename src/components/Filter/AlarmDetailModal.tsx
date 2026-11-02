import React, { useMemo, useState } from 'react';
import {
  Box,
  Button,
  Grid,
  GridItem as CGridItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Tag,
  Text,
  Flex,
  Input,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  GetAlarmCommentsById,
  PostAlarmCommentById,
  DeleteAlarmCommentById,
  GetAlarmAssignUsersById,
  AssignUserToAlarmById,
  UnassignUserToAlarmById
} from '../../api/Alarm/AlarmActivityAPI';
import AlarmLiveTableAPI from '../../api/Alarm/AlarmLiveTableAPI';
import { SearchDevParams } from './AlarmFilterPanel';
import { setRef } from '@mui/material';

export type AlarmDetailData = {
  device?: string;
  createdTs?: number;
  resolvedTs?: number;
  type?: string;
  severity?: string;
  status?: string;
  assignee?: any;
  ackId?: string | null;
  clrId?: string | null;
};

const formatTs = (ts?: number) =>
  ts && !isNaN(ts) && ts > 0 ? new Date(ts).toLocaleString().replace(',', '') : '-';

const computeDuration = (createdTs?: number, resolvedTs?: number) => {
  if (!createdTs || isNaN(createdTs)) return '-';
  const end = resolvedTs && resolvedTs > 0 ? resolvedTs : Date.now();
  const diffMs = Math.max(0, end - createdTs);
  const secs = Math.floor(diffMs / 1000);
  const minutes = Math.floor(secs / 60);
  const hours = Math.floor(minutes / 60);
  const remMin = minutes % 60;
  const remSec = secs % 60;
  if (hours > 0) return `${hours}h ${remMin}m ${remSec}s`;
  if (minutes > 0) return `${minutes}m ${remSec}s`;
  return `${remSec}s`;
};

export interface AlarmDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: AlarmDetailData | null;
  onAck?: (id: string) => void;
  onClear?: (id: string) => void;
  onAssign?: (id: string) => void;
  onAssignSuccess?: () => void;
  searchParams?: SearchDevParams;
  timeWindow?: { startTs: number; endTs: number; aggregate: string; interval: number };
  plant?: boolean;
  setRefresh?: React.Dispatch<React.SetStateAction<number>>;
}

export default function AlarmDetailModal({
  isOpen,
  onClose,
  data,
  onAck,
  onClear,
  onAssign,
  onAssignSuccess,
  searchParams,
  timeWindow,
  plant,
  setRefresh
}: AlarmDetailModalProps) {
  const headerBg = useColorModeValue('blue.700', 'blue.600');
  const cardBg = useColorModeValue('gray.50', 'whiteAlpha.100');
  const borderCol = useColorModeValue('gray.200', 'whiteAlpha.300');

  const sevScheme = useMemo(() => {
    const sev = (data?.severity || '').toLowerCase();
    if (sev.includes('critical')) return 'red';
    if (sev.includes('major')) return 'orange';
    if (sev.includes('minor')) return 'yellow';
    if (sev.includes('warning')) return 'yellow';
    return 'gray';
  }, [data?.severity]);

  // assignee holds the selected user id (or 'Unassigned')
  const [assignee, setAssignee] = useState<string>('Unassigned');
  const [comment, setComment] = useState<string>('');

  const [comments, setComments] = useState<any[]>([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [commentError, setCommentError] = useState<string | null>(null);
  const [postingComment, setPostingComment] = useState(false);

  const [assignUsers, setAssignUsers] = useState<any[]>([]);
  const [loadingAssign, setLoadingAssign] = useState(false);
  const [assignError, setAssignError] = useState<string | null>(null);

  // decode JWT payload safely from localStorage.token
  const getTokenPayload = (): any | null => {
    const t = localStorage.getItem('token');
    if (!t) return null;
    const parts = t.split('.');
    if (parts.length < 2) return null;
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const pad = base64 + '='.repeat((4 - (base64.length % 4)) % 4);
    try {
      const json = atob(pad);
      return JSON.parse(json);
    } catch {
      return null;
    }
  };

  // current user info from token (id + first/last/full name)
  const currentUserInfo = useMemo(() => {
    const p = getTokenPayload();
    if (!p) return null;

    const id = String(p.userId ?? p.id ?? p.sub ?? p.user_id ?? p.uid ?? '') || null;

    const firstName =
      p.firstName ?? p.firstname ?? p.givenName ?? p.given_name ?? p.fname ?? null;
    const lastName =
      p.lastName ?? p.lastname ?? p.familyName ?? p.family_name ?? p.lname ?? null;

    const full =
      [firstName, lastName].filter(Boolean).join(' ').trim() ||
      p.name || p.username || p.email || null;

    return { id, firstName, lastName, full };
  }, []);

  // Helpers to extract id/label from possible user shapes
  const getUserId = (u: any) => {
    // Robust extractor: handles primitives, objects and nested id shapes
    const extract = (v: any): string => {
      if (v == null) return '';
      if (typeof v === 'string' || typeof v === 'number') return String(v);
      // If v itself is an object that wraps the id in another object, try common keys
      const candidates = [
        'id', 'userId', 'value', 'uuid', 'user_id', 'userID'
      ];
      for (const k of candidates) {
        if (k in v) {
          const inner = (v as any)[k];
          if (typeof inner === 'string' || typeof inner === 'number') return String(inner);
          // if inner is object, try to recurse
          if (typeof inner === 'object' && inner !== null) return extract(inner);
        }
      }
      // fallback to other name fields
      const nameFields = ['username', 'email', 'name', 'fullName', 'displayName'];
      for (const k of nameFields) {
        if (k in v && (typeof (v as any)[k] === 'string' || typeof (v as any)[k] === 'number')) {
          return String((v as any)[k]);
        }
      }
      // As last resort stringify
      try {
        return JSON.stringify(v);
      } catch {
        return String(v);
      }
    };

    return extract(u);
  };

  const getUserLabel = (u: any) => {
    if (!u && u !== 0) return String(u);
    if (typeof u === 'string' || typeof u === 'number') return String(u);
    return (
      u.name || u.fullName || u.displayName || u.username || u.email || String(u.id ?? '')
    );
  };

  const normalizeUsers = (res: any): Array<{ id: string; label: string; raw: any }> => {
    if (!res) return [];
    // API may return array directly, or an object like { users: [...] } or { data: [...] }
    const list = Array.isArray(res)
      ? res
      : Array.isArray(res.users)
      ? res.users
      : Array.isArray(res.data)
      ? res.data
      : [];

    return list.map((u: any) => ({ id: getUserId(u), label: getUserLabel(u), raw: u }));
  };

  // Helpers for rendering comment author/text safely (avoid rendering objects)
  const renderCommentAuthor = (c: any) => {
    // Try many shapes: c.user, c.author, c.userId, c.createdBy, c.name, c.authorName
    const tryParseJson = (s: any) => {
      if (typeof s !== 'string') return null;
      try {
        return JSON.parse(s);
      } catch {
        return null;
      }
    };

    const pickNameFromObj = (u: any) => {
      if (!u) return null;
      const first = (u.firstName || u.firstname || u.givenName || u.given_name || u.first || '').trim();
      const last = (u.lastName || u.lastname || u.familyName || u.family_name || u.last || '').trim();
      if (first || last) return `${first} ${last}`.trim();
      const name = u.name || u.fullName || u.displayName || u.username || u.email || u.text || null;
      if (typeof name === 'string' && name) return name;
      return null;
    };

    const candidates = [c?.user, c?.author, c?.createdBy, c?.createdByUser, c?.userId, c?.authorName, c?.name];

    // 1) If any candidate resolves to current user id, show token name
    try {
      if (currentUserInfo?.id) {
        for (const cand of candidates) {
          const resolved = getUserId(cand);
          if (resolved && String(resolved) === String(currentUserInfo.id)) return currentUserInfo.full || 'You';
        }
      }
    } catch {}

    // 2) If comment has explicit name field (string or object)
    const nameField = c?.name ?? c?.authorName ?? null;
    if (nameField) {
      if (typeof nameField === 'string') {
        // if JSON string, parse and prefer first/last
        const parsed = tryParseJson(nameField);
        if (parsed) {
          const pName = pickNameFromObj(parsed);
          if (pName) return pName;
          if (parsed.text) return String(parsed.text);
        }
        // otherwise treat raw string as display name (may be email or full name)
        if (nameField.includes(' ')) return nameField;
        return nameField;
      }
      if (typeof nameField === 'object') {
        const n = pickNameFromObj(nameField);
        if (n) return n;
      }
    }

    // 3) Look at user/author object for first/last or display name
    const userObj = c?.user ?? c?.author ?? c?.createdBy ?? null;
    const fromUserObj = pickNameFromObj(userObj);
    if (fromUserObj) return fromUserObj;

    // 4) If user is a primitive string (maybe email or name), return it
    if (typeof userObj === 'string' || typeof c?.user === 'string') {
      const s = (userObj as any) || (c?.user as any);
      if (typeof s === 'string' && s) return s;
    }

    // 5) Try to resolve id -> label using assignUsers (covers nested id shapes)
    try {
      const resolvedId = getUserId(c?.user ?? c?.userId ?? c?.createdBy ?? {});
      if (resolvedId) {
        const match = assignUsers.find((au: any) => String(au.id) === String(resolvedId));
        if (match) return match.label;
      }
    } catch {}

    // 6) Final fallbacks
    if (c?.user && (typeof c.user === 'object')) {
      return String(c.user.id ?? JSON.stringify(c.user));
    }
    if (c?.user && (typeof c.user === 'string' || typeof c.user === 'number')) return String(c.user);
    if (c?.userId && (typeof c.userId === 'string' || typeof c.userId === 'number')) return String(c.userId);

    return 'User';
  };

  const renderCommentText = (c: any) => {
    const pick = (v: any): string | null => {
      if (v == null) return null;
      if (typeof v === 'string' || typeof v === 'number') return String(v);
      if (typeof v === 'object') {
        // common nested shapes
        if (typeof v.text === 'string' || typeof v.text === 'number') return String(v.text);
        if (typeof v.comment === 'string' || typeof v.comment === 'number') return String(v.comment);
        if (typeof v.message === 'string' || typeof v.message === 'number') return String(v.message);
        // deeper fallback: try to JSON-serialize small objects
        try {
          return JSON.stringify(v);
        } catch {
          return String(v);
        }
      }
      return String(v);
    };

    return pick(c?.comment) ?? pick(c?.text) ?? pick(c) ?? '-';
  };

  // Normalize server responses for comments into an array of comment objects
  const normalizeComments = (res: any): any[] => {
    if (!res) return [];
    if (Array.isArray(res)) return res;
    // common wrappers
    if (Array.isArray(res.comments)) return res.comments;
    if (Array.isArray(res.data)) return res.data;
    if (Array.isArray(res.result)) return res.result;
    if (Array.isArray(res.payload)) return res.payload;

    // sometimes API returns { comments: { data: [...] } }
    try {
      const candidates = [res.comments, res.data, res.result, res.payload];
      for (const c of candidates) {
        if (!c) continue;
        if (Array.isArray(c)) return c;
        if (Array.isArray(c?.data)) return c.data;
      }
    } catch {}

    // If it's a single comment object, return it as array
    if (typeof res === 'object') return [res];

    return [];
  };

  // Fetch comments when modal opens or alarm changes
  React.useEffect(() => {
    if (!isOpen || !data?.ackId) return;
    setLoadingComments(true);
    setCommentError(null);
    GetAlarmCommentsById(data.ackId)
      .then(res => setComments(normalizeComments(res)))
      .catch(e => setCommentError('Failed to load comments'))
      .finally(() => setLoadingComments(false));
  }, [isOpen, data?.ackId]);

  // Fetch assignable users when modal opens or alarm changes
  React.useEffect(() => {
    if (!isOpen || !data?.ackId) return;
    setLoadingAssign(true);
    setAssignError(null);
    GetAlarmAssignUsersById(data.ackId)
      .then(res => {
        const norm = normalizeUsers(res);
        setAssignUsers(norm);
        // If data has assignee info, try to set selected id
        if (data?.assignee) {
          // data.assignee may be id or object
          const assigneeId = typeof data.assignee === 'string' || typeof data.assignee === 'number'
            ? String(data.assignee)
            : getUserId(data.assignee);
          // if found in normalized list, set it, otherwise keep as raw id
          const found = norm.find(u => u.id === assigneeId);
          setAssignee(found ? found.id : assigneeId || 'Unassigned');
        } else {
          setAssignee('Unassigned');
        }
      })
      .catch((e: any) => {
        const msg = e?.response?.data?.message || e?.message || 'Failed to load users';
        setAssignError(String(msg));
        setAssignUsers([]);
        setAssignee('Unassigned');
      })
      .finally(() => setLoadingAssign(false));
  }, [isOpen, data?.ackId]);

  // Post a comment
  const handlePostComment = async () => {
    if (!comment.trim() || !data?.ackId) return;
    const text = comment.trim();
    const tempId = `temp-${Date.now()}`;
    const username = localStorage.getItem('username') || 'You';

    // use token name for optimistic author if available
    const optimisticAuthor =
      (currentUserInfo?.full && currentUserInfo.full) || username;

    // Optimistic update: show comment immediately
    setComments(prev => [{ id: tempId, comment: text, user: optimisticAuthor, pending: true }, ...prev ]);
    setComment('');
    setCommentError(null);
    setPostingComment(true);

    try {
      // Use server response to replace optimistic comment when possible
      const res = await PostAlarmCommentById(data.ackId, text);
      setCommentError(null);

      // If server returned the created comment object, replace the temp one
      if (res && typeof res === 'object') {
        setComments(prev => prev.map(c => (c.id === tempId ? res : c)));
      } else {
        // Fallback: refresh comments list
        setLoadingComments(true);
        GetAlarmCommentsById(data.ackId).then(r => setComments(normalizeComments(r))).finally(() => setLoadingComments(false));
      }
    } catch (e: any) {
      // remove optimistic comment on failure
      setComments(prev => prev.filter(c => c.id !== tempId));
      setCommentError(e?.response?.data?.message || e?.message || 'Failed to post comment');
      setPostingComment(false);
      return;
    }

    setPostingComment(false);
  };

  // Delete a comment
  const handleDeleteComment = async (commentId: any) => {
    if (!data?.ackId) return;
    // Normalize commentId which might be a nested object like { id: '...' } or { commentId: '...' }
    const normalizedId = typeof commentId === 'object' && commentId !== null
      ? String(commentId.id ?? commentId.commentId ?? commentId?.value ?? '')
      : String(commentId);
    if (!normalizedId) {
      setCommentError('Invalid comment id');
      return;
    }

    try {
      await DeleteAlarmCommentById(data.ackId, normalizedId);
      setCommentError(null);
    } catch (e: any) {
      setCommentError(e?.response?.data?.message || e?.message || 'Failed to delete comment');
      return;
    }
    // Refresh comments
    setLoadingComments(true);
    GetAlarmCommentsById(data.ackId)
      .then(res => setComments(normalizeComments(res)))
      .finally(() => setLoadingComments(false));
  };

  // Assign user
  const handleAssignUser = async (userId: string) => {
    if (!data?.ackId) {
      setAssignError('No alarm ID available');
      return;
    }

    setLoadingAssign(true);
    setAssignError(null);
    
    try {
      // First assign the user
      const assignResponse = await AssignUserToAlarmById(data.ackId, userId);
      
      // Update local state with the response
      setAssignee(userId);
      // Call the alarm table API directly to refresh the data
      setRefresh && setRefresh((prev) => prev + 1);
      
      // Force refresh assignable users to get latest state
      const users = await GetAlarmAssignUsersById(data.ackId);
      const normalizedUsers = normalizeUsers(users);
      setAssignUsers(normalizedUsers);
      
      // Add a comment about the assignment
      const username = normalizedUsers.find(u => u.id === userId)?.label || 'User';
      try {
        await PostAlarmCommentById(data.ackId, `Alarm assigned to ${username}`);
        // Refresh comments to show the new assignment comment
        const commentsResponse = await GetAlarmCommentsById(data.ackId);
        setComments(normalizeComments(commentsResponse));
      } catch (commentError) {
        console.error('Failed to add assignment comment:', commentError);
      }
      // Notify parent (if provided) so it can call main alarm API / refresh alarm list
      try {
        if (onAssignSuccess) onAssignSuccess();
        else if (onAssign && data?.ackId) onAssign(String(data.ackId));
      } catch (cbErr) {
        console.error('onAssign callback error:', cbErr);
      }
      
    } catch (e: any) {
      console.error('Assignment error:', e);
      const errorMessage = e?.response?.data?.message || e?.message || 'Failed to assign user';
      setAssignError(errorMessage);
      // Reset assignee to previous value if assignment failed
      const prevAssignee = data.assignee ? 
        (typeof data.assignee === 'string' ? data.assignee : getUserId(data.assignee)) 
        : 'Unassigned';
      setAssignee(prevAssignee);
    } finally {
      setLoadingAssign(false);
    }
  };

  // Unassign user (mirror assign flow: update UI, refresh table, refresh users, add comment, notify parent)
  const handleUnassignUser = async () => {
    if (!data?.ackId) return;

    setLoadingAssign(true);
    setAssignError(null);

    try {
      // Call unassign API
      await UnassignUserToAlarmById(data.ackId);

      // Update local UI immediately
      setAssignee('Unassigned');

      // Refresh alarm table via API if parent provided search/time info
      setRefresh && setRefresh((prev) => prev + 1);

      // Refresh assignable users list and normalize
      try {
        const users = await GetAlarmAssignUsersById(data.ackId);
        const normalized = normalizeUsers(users);
        setAssignUsers(normalized);
      } catch (e: any) {
        const msg = e?.response?.data?.message || e?.message || 'Failed to load users';
        setAssignError(String(msg));
      }

      // Add a comment about the unassignment
      try {
        await PostAlarmCommentById(data.ackId, `Alarm unassigned`);
        // Refresh comments to show the new unassignment comment
        const commentsResponse = await GetAlarmCommentsById(data.ackId);
        setComments(normalizeComments(commentsResponse));
      } catch (commentErr) {
        console.error('Failed to add unassignment comment:', commentErr);
      }

      // Notify parent so it can refresh its list/state
      try {
        if (onAssignSuccess) onAssignSuccess();
        else if (onAssign && data?.ackId) onAssign(String(data.ackId));
      } catch (cbErr) {
        console.error('onAssign callback error after unassign:', cbErr);
      }

    } catch (e: any) {
      const errorMsg = e?.response?.data?.message || e?.message || 'Failed to unassign user';
      setAssignError(errorMsg);
      // Try to reset to previous assignee recorded in data
      const prevAssignee = data?.assignee
        ? (typeof data.assignee === 'string' ? data.assignee : getUserId(data.assignee))
        : 'Unassigned';
      setAssignee(prevAssignee);
    } finally {
      setLoadingAssign(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader bg={headerBg} color="white" borderTopRadius="md">
          Alarm details
        </ModalHeader>
        <ModalCloseButton color="white" />
        <ModalBody>
          {/* Top info cards */}
          <Grid templateColumns="repeat(2, 1fr)" gap={3} mb={2}>
            <CGridItem>
              <Text fontSize="xs" color="gray.500">Originator</Text>
              <Box bg={cardBg} border="1px" borderColor={borderCol} rounded="md" px={3} py={2}>
                {data?.device ?? '-'}
              </Box>
            </CGridItem>

            <CGridItem>
              <Text fontSize="xs" color="gray.500">Severity</Text>
              <Box bg={cardBg} border="1px" borderColor={borderCol} rounded="md" px={3} py={2}>
                <Tag colorScheme={sevScheme as any} variant="subtle" fontWeight="bold">
                  {data?.severity ?? '-'}
                </Tag>
              </Box>
            </CGridItem>

            <CGridItem>
              <Text fontSize="xs" color="gray.500">Start time</Text>
              <Box bg={cardBg} border="1px" borderColor={borderCol} rounded="md" px={3} py={2}>
                {formatTs(data?.createdTs)}
              </Box>
            </CGridItem>

            <CGridItem>
              <Text fontSize="xs" color="gray.500">Duration</Text>
              <Box bg={cardBg} border="1px" borderColor={borderCol} rounded="md" px={3} py={2}>
                {computeDuration(data?.createdTs, data?.resolvedTs)}
              </Box>
            </CGridItem>

            <CGridItem>
              <Text fontSize="xs" color="gray.500">Type</Text>
              <Box bg={cardBg} border="1px" borderColor={borderCol} rounded="md" px={3} py={2}>
                {data?.type ?? '-'}
              </Box>
            </CGridItem>

            <CGridItem>
              <Text fontSize="xs" color="gray.500">Status</Text>
              <Box bg={cardBg} border="1px" borderColor={borderCol} rounded="md" px={3} py={2}>
                {data?.status ?? '-'}
              </Box>
            </CGridItem>
          </Grid>

          {/* Assignee row */}
          <Box
            border="1px"
            borderColor={borderCol}
            rounded="md"
            mb={4}
            bg={useColorModeValue('gray.50', 'whiteAlpha.100')}
          >
            <Flex align="center" px={3} py={3} gap={3}>
              <Box
                w="28px"
                h="28px"
                rounded="full"
                bg={useColorModeValue('gray.200', 'whiteAlpha.300')}
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                fontWeight="bold"
                color="gray.600"
              >
                <Box as="span">👤</Box>
              </Box>
              <Box flex="1">
                <Text fontSize="xs" color="gray.500" mb={1}>Assignee</Text>
                <Select
                  size="sm"
                  value={assignee}
                  onChange={e => {
                    if (e.target.value === "unassign") {
                      handleUnassignUser();
                    } else {
                      handleAssignUser(e.target.value);
                    }
                  }}
                  isDisabled={loadingAssign}
                  placeholder="Select an assignee"
                >
                  <option value="unassign" style={{color: 'red'}}>Unassign</option>
                  {assignUsers.map((u: any) => (
                    <option key={u.id} value={u.id}>{u.label}</option>
                  ))}
                </Select>
                {assignError && (
                  <Text fontSize="sm" color="red.500" mt={2}>{assignError}</Text>
                )}
              </Box>
            </Flex>
          </Box>

          {/* Comments section */}
          <Box border="1px" borderColor={borderCol} rounded="md" mb={4}>
            <Flex px={3} py={2} borderBottom="1px" borderColor={borderCol} bg={useColorModeValue('gray.50', 'whiteAlpha.100')} align="center" justify="space-between">
              <Text fontWeight="semibold">Comments</Text>
              <Button size="xs" variant="ghost" title="Refresh" onClick={() => {
                setLoadingComments(true);
                GetAlarmCommentsById(data?.ackId || '').then(res => setComments(normalizeComments(res))).finally(() => setLoadingComments(false));
              }}>↻</Button>
            </Flex>
            <Box px={3} py={2}>
              {/* Input at top: user types new comment here */}
              <Flex mb={3} gap={2} align="center">
                <Input
                  placeholder="Add a comment..."
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  size="sm"
                />
                <Button colorScheme="blue" size="sm" onClick={handlePostComment} isDisabled={!comment.trim() || loadingComments || postingComment}>
                  Post
                </Button>
              </Flex>
              {loadingComments ? (
                <Text fontSize="sm" color="gray.500">Loading comments...</Text>
              ) : commentError ? (
                <Text fontSize="sm" color="red.500">{commentError}</Text>
              ) : comments.length === 0 ? (
                <Text fontSize="sm" color="gray.500">No comments yet.</Text>
              ) : (
                // If more than 5 comments, make the comments list scrollable
                <Box maxH={comments.length > 5 ? '220px' : undefined} overflowY={comments.length > 5 ? 'auto' : undefined} pr={comments.length > 5 ? 2 : undefined}>
                  {comments.map((c: any) => (
                    <Flex key={c.id || c.commentId || String(c?.id ?? JSON.stringify(c))} align="center" justify="space-between" mb={2}>
                      <Box>
                        <Text fontSize="sm" fontWeight="bold">{renderCommentAuthor(c)}{c.pending ? ' (sending...)' : ''}</Text>
                        <Text fontSize="sm">{renderCommentText(c)}</Text>
                      </Box>
                      <Button size="xs" colorScheme="red" variant="ghost" onClick={() => handleDeleteComment(c.commentId || c.id)} isDisabled={!!c.pending}>
                        Delete
                      </Button>
                    </Flex>
                  ))}
                </Box>
              )}
            </Box>
          </Box>
        </ModalBody>

        <ModalFooter gap={3}>
          <Button
            colorScheme="blue"
            onClick={() => data?.ackId && onAck?.(String(data.ackId))}
            isDisabled={!data?.ackId}
          >
            Acknowledge
          </Button>
          <Button
            colorScheme="red"
            onClick={() => data?.clrId && onClear?.(String(data.clrId))}
            isDisabled={!data?.clrId}
          >
            Clear
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}