import React from "react";
import { Box, Flex, Icon, useColorModeValue } from "@chakra-ui/react";

interface NavItemProps {
  icon?: React.ElementType;
  children: React.ReactNode;
  showLabel: boolean;
  isOpen? : boolean;
  [x: string]: any;
}

const NavItem: React.FC<NavItemProps> = ({
  icon,
  children,
  showLabel,
  isOpen,
  ...rest
}) => {
  const color = useColorModeValue("white", "gray.300");
  return (
    <Flex
      align="center"
      px="3"
      // pl="4"
      py="3"
      opacity={!showLabel ? isOpen ? 1 : 0.6 : 1}
      cursor="pointer"
      color="inherit"
      // _dark={{ color: "#FFFFFF" }}
      _hover={{
        width: "max-width",
        // bg: "rgba(25, 202, 22, 0.2)",
        // _dark: { bg: "rgba(25, 202, 22, 0.2)" },
        // color: "#FFFFFF",
        // fontWeight: 600,
      }}
      role="group"
      // fontWeight="semibold"
      transition=".15s ease"
      {...rest}
    >
      {icon && (
        <Box
          p={2}
          borderRadius={"6px"}
          bg={!showLabel ? isOpen ? "rgba(255, 255, 255, 0.2)" : "transparent" : "transparent"}
        >
          <Icon
            mx="10"
            _groupHover={{ color: color }}
            as={icon}
          />
        </Box>
      )}
      {showLabel && children}
    </Flex>
  );
};

export default NavItem;
