import { useToast } from "@chakra-ui/react";

type ToastMessages = {
  loading?: { title?: string; description?: string };
  success?: { title?: string; description?: string };
  error?: { title?: string; description?: string };
};

export function usePromiseToast() {
  const toast = useToast();

  function showPromiseToast<T>(promise: Promise<T>, messages: ToastMessages) {
    toast.promise(promise, {
      loading: {
        title: messages.loading?.title || "Loading...",
        description: messages.loading?.description || "Please wait",
        position : "top-left"
      },
      success: {
        title: messages.success?.title || "Success!",
        description: messages.success?.description || "Action completed",
        isClosable : true,
        position : "top-left"
      },
      error: (err: any) => ({
        title: messages.error?.title || "Error!",
        description:
          err?.response?.data?.error ||
          err?.message ||
          messages.error?.description ||
          "Something went wrong",
        isClosable: true,
        position : "top-left"
      }),
    });

    return promise;
  }

  return showPromiseToast;
}
