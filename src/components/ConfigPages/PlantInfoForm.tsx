import React, { useState, useRef } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Textarea,
  Heading,
  SimpleGrid,
  Divider,
  Text,
  ButtonGroup,
  useClipboard,
  Flex, // Import Flex for alignment
  Tooltip // Import Tooltip for hints
} from '@chakra-ui/react';
import { FaInfoCircle } from 'react-icons/fa'; // Import info icon

const PlantInfoForm = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [formData, setFormData] = useState({
    Plant_Name: '',
    plant_id: '',
    Capacity: {
      Capacity: null,
      'PV Capacity': null,
      'DG Capacity': null,
      'BESS Capacity': null,
      'WIND Capacity': null
    },
    Energy_System: '',
    Latitude: null,
    Longitude: null,
    AC_Capacity: null,
    country: '',
    timeZone: '',
    type: '',
    image_url: '',
    commissioned: '',
    pv_capacity: '',
    dg_capacity: '',
    location: ''
  });

  // Utility to parse a value to a number or return null
  const toNumber = (value: any) => {
    const num = parseFloat(value);
    return isNaN(num) ? null : num;
  };

  const parsedFormData = {
    ...formData,
    Capacity: {
      'Capacity': toNumber(formData.Capacity['Capacity']),
      'PV Capacity': toNumber(formData.Capacity['PV Capacity']),
      'DG Capacity': toNumber(formData.Capacity['DG Capacity']),
      'BESS Capacity': toNumber(formData.Capacity['BESS Capacity']),
      'WIND Capacity': toNumber(formData.Capacity['WIND Capacity']),
    },
    Latitude: toNumber(formData.Latitude),
    Longitude: toNumber(formData.Longitude),
    AC_Capacity: toNumber(formData.AC_Capacity),
  };

  const jsonString = JSON.stringify(parsedFormData, null, 2);
  const textAreaRef = useRef(null);
  const { onCopy } = useClipboard(jsonString);

  // Handle download of JSON file
  const handleDownload = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${formData.Plant_Name || 'plant-info'}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (
      ['Capacity', 'PV Capacity', 'DG Capacity', 'BESS Capacity', 'WIND Capacity'].includes(name)
    ) {
      setFormData(prev => ({
        ...prev,
        Capacity: {
          ...prev.Capacity,
          [name]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Handle form submission and open modal
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onOpen();
  };

  // Data for input fields with their labels and hint messages
  const inputFields = [
    { label: "Plant Name", name: "Plant_Name", hint: "Enter the official name of the energy plant. (e.g.: Hybrid.Sanvijay Rollings)" },
    { label: "Plant ID", name: "plant_id", hint: "A unique identifier for the plant. (e.g.: Plant_001)" },
    { type: "divider", text: "⚙️ Capacity Info" },
    { label: "Total Capacity", name: "Capacity", hint: "Overall power generation capacity of the plant in Megawatts. (e.g.: 550)" },
    { label: "PV Capacity", name: "PV Capacity", hint: "Capacity from PhotoVoltaic (solar) sources in MW. (e.g.:550)" },
    { label: "DG Capacity", name: "DG Capacity", hint: "Capacity from Diesel Generator sources in MW. (e.g.:500)" },
    { label: "BESS Capacity", name: "BESS Capacity", hint: "Battery Energy Storage System capacity in Megawatt-hours." },
    { label: "WIND Capacity", name: "WIND Capacity", hint: "Capacity from Wind energy sources in MW." },
    { type: "divider", text: "🌐 Location Info" },
    { label: "Latitude", name: "Latitude", hint: "Geographical latitude of the plant's location. (e.g.: 21.1466)" },
    { label: "Longitude", name: "Longitude", hint: "Geographical longitude of the plant's location. (e.g.: 79.0888)" },
    { label: "Location", name: "location", hint: "General physical location of the plant (e.g., city, region)." },
    { label: "Country", name: "country", hint: "The country where the plant is located. (e.g.: India)" },
    { label: "Time Zone", name: "timeZone", hint: "The time zone of the plant's operational area (e.g., 'Asia/Kolkata')." },
    { type: "divider", text: "🔌 System Info" },
    { label: "Energy System", name: "Energy_System", hint: "Type of energy system (e.g., 'Hybrid', 'Solar Only')." },
    { label: "Type", name: "type", hint: "Specific type of plant (e.g., PV')." },
    { label: "AC Capacity", name: "AC_Capacity", hint: "Alternating Current (AC) power capacity in MW. (e.g.: 550)" },
    { label: "Commissioned Date", name: "commissioned", hint: "Date when the plant became operational (e.g., 'YYYY-MM-DD')." },
    { label: "PV Capacity Details", name: "pv_capacity", hint: "Detailed description of PV capacity. (e.g.: 550 kW, Sungrow SG110CX,Sungrow SG50CX)" },
    { label: "DG Capacity Details", name: "dg_capacity", hint: "Detailed description of DG capacity. (e.g.: 500KVA)" },
    { label: "Image URL", name: "image_url", hint: "URL to an image of the plant." },
  ];

  // Reusable Input component with hint icon
  type InputGroupProps = {
    label: string;
    name: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    hint?: string;
  };

  function InputGroup({
    label,
    name,
    onChange,
    hint // New prop for hint message
  }: InputGroupProps) {
    return (
      <FormControl>
        <Flex justify="space-between" align="center">
          <FormLabel fontSize="sm" mb="0">{label}</FormLabel>
          {hint && (
            <Tooltip label={hint} fontSize="xs" placement="right" bg="gray.700" color="white" hasArrow>
              <Box as="span" ml={1} cursor="help">
                <FaInfoCircle size="12px" color="gray.500" />
              </Box>
            </Tooltip>
          )}
        </Flex>
        <Input
          name={name}
          onChange={onChange}
          size="sm"
          bg="white"
          color="black"
          _placeholder={{ color: 'gray.500' }}
          rounded="md" // Apply rounded corners to input
        />
      </FormControl>
    );
  }

  return (
    <Box
      bgGradient="linear(to-br, gray.900, gray.800)"
      color="white"
      p={6}
      rounded="2xl"
      shadow="2xl"
      maxW="480px"
      mx="auto"
      mt={"87px"}
      mb={10} // Added bottom margin for better spacing
    >
      <Heading
        mb={4}
        textAlign="center"
        fontSize="2xl"
        bgGradient="linear(to-r, teal.300, green.400)"
        bgClip="text"
      >
        🌱 Energy Plant Info
      </Heading>

      <form onSubmit={handleSubmit}>
        <SimpleGrid columns={1} spacing={3}>
          {inputFields.map((field, index) => (
            field.type === "divider" ? (
              <React.Fragment key={index}>
                <Divider my={2} />
                <Text fontSize="sm" color="teal.300">{field.text}</Text>
              </React.Fragment>
            ) : (
              <InputGroup
                key={field.name}
                label={field.label ?? ""}
                name={field.name ?? ""}
                onChange={handleChange}
                hint={field.hint} // Pass the hint prop
              />
            )
          ))}
        </SimpleGrid>

        <Button
          mt={6}
          colorScheme="teal"
          type="submit"
          width="full"
          py={2} // Add padding for better button appearance
          rounded="lg" // Apply rounded corners to button
          _hover={{ bg: "teal.600", shadow: "lg" }} // Add hover effect
        >
          Submit
        </Button>
      </form>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent bg="gray.800" color="white" rounded="xl"> {/* Apply rounded corners to modal */}
          <ModalHeader>📦 Submitted JSON</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}> {/* Add padding-bottom for better spacing */}
            <Textarea
              ref={textAreaRef}
              value={jsonString}
              readOnly
              height="350px"
              bg="gray.900"
              border="1px solid rgba(255,255,255,0.1)" // Softer border
              mb={3}
              rounded="md" // Apply rounded corners to textarea
              fontFamily="monospace" // Use monospace font for JSON
              p={4} // Add padding to textarea
            />
            <ButtonGroup size="sm" variant="outline" spacing={4} mt={2}>
              <Button
                colorScheme="teal"
                onClick={onCopy}
                rounded="md"
                _hover={{ bg: "teal.600", color: "white" }}
              >
                Copy
              </Button>
              <Button
                colorScheme="green"
                onClick={handleDownload}
                rounded="md"
                _hover={{ bg: "green.600", color: "white" }}
              >
                Download
              </Button>
            </ButtonGroup>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}


export default PlantInfoForm