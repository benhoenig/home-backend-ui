import React, { useState } from 'react';
import {
  Box,
  Flex,
  IconButton,
  Text,
  VStack,
  HStack,
  CloseButton,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import {
  FiMenu,
  FiHome,
  FiList,
  FiFolder,
  FiUsers,
  FiStar,
  FiLogOut,
  FiSettings,
  FiBell,
  FiPieChart,
  FiDatabase,
  FiMonitor,
  FiUserCheck,
  FiTrendingUp,
  FiTarget,
  FiGrid,
  FiFileText,
  FiCpu,
} from 'react-icons/fi';
import Link from 'next/link';
import { useRouter } from 'next/router';

// NavItem component for sidebar links
const NavItem = ({ icon, children, href, active, ...rest }) => {
  return (
    <Link href={href} passHref style={{ width: '100%', textDecoration: 'none' }}>
      <Flex
        align="center"
        px="4"
        py="3"
        cursor="pointer"
        role="group"
        fontWeight={active ? "600" : "normal"}
        color={active ? "brand.500" : "gray.600"}
        bg={active ? "gray.100" : "transparent"}
        borderRadius="md"
        transition="all 0.2s"
        _hover={{
          bg: 'gray.100',
          color: 'brand.500',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            as={icon}
            color={active ? "brand.500" : "gray.500"}
            _groupHover={{
              color: 'brand.500',
            }}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

// NavGroup component for sidebar sections
const NavGroup = ({ icon, title, children, activePath, initiallyExpanded = false }) => {
  const isActive = children.some(child => activePath === child.href);
  
  return (
    <AccordionItem border="none">
      <AccordionButton 
        px={4} 
        py={3} 
        _hover={{ bg: 'gray.100' }} 
        bg={isActive ? 'gray.100' : 'transparent'}
        borderRadius="md"
      >
        <HStack flex="1" textAlign="left" spacing={4}>
          {icon && <Icon as={icon} color={isActive ? "brand.500" : "gray.500"} />}
          <Text fontWeight="medium" color={isActive ? "brand.500" : "gray.700"}>{title}</Text>
        </HStack>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel pb={2} px={0}>
        <VStack align="stretch" spacing={1} pl={2}>
          {children.map((child, index) => (
            <NavItem
              key={index}
              icon={child.icon}
              href={child.href}
              active={activePath === child.href}
            >
              {child.label}
            </NavItem>
          ))}
        </VStack>
      </AccordionPanel>
    </AccordionItem>
  );
};

// Sidebar content
const SidebarContent = ({ activePath, onClose, ...rest }) => {
  // Navigation structure
  const navGroups = [
    {
      title: 'Sales Support',
      icon: FiTrendingUp,
      items: [
        { label: 'Listing Manager', href: '/listing-manager', icon: FiFileText },
      ]
    },
    {
      title: 'Sales',
      icon: FiPieChart,
      items: [
        { label: 'Dashboard', href: '/', icon: FiHome },
        { label: 'All Listings', href: '/listings', icon: FiList },
        { label: 'My Listings', href: '/my-listings', icon: FiFolder },
        { label: 'Owner Focus', href: '/focus', icon: FiStar },
      ]
    },
    {
      title: 'Records',
      icon: FiDatabase,
      items: [
        { label: 'Contacts', href: '/contacts', icon: FiUsers },
      ]
    },
    {
      title: 'Marketing',
      icon: FiTarget,
      items: []
    },
    {
      title: 'Human Resource',
      icon: FiUserCheck,
      items: []
    },
    {
      title: 'Master Data',
      icon: FiGrid,
      items: []
    },
  ];

  return (
    <Box
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Heading fontSize="xl" fontWeight="bold" color="brand.500">
          RealtorPro
        </Heading>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      
      <Box px={3} py={5} overflowY="auto" h="calc(100vh - 5rem)">
        <Accordion allowMultiple defaultIndex={[0, 1]}>
          {navGroups.map((group, idx) => (
            <NavGroup
              key={idx}
              title={group.title}
              icon={group.icon}
              activePath={activePath}
              initiallyExpanded={group.items.some(item => item.href === activePath)}
            >
              {group.items}
            </NavGroup>
          ))}
        </Accordion>
        
        <Box mt={6} mb={3} px={4}>
          <Text fontSize="xs" fontWeight="semibold" color="gray.500">
            SYSTEM
          </Text>
        </Box>
        
        <NavItem icon={FiSettings} href="/settings" active={activePath === '/settings'}>
          Settings
        </NavItem>
        <NavItem icon={FiLogOut} href="/logout" active={activePath === '/logout'}>
          Logout
        </NavItem>
      </Box>
    </Box>
  );
};

// MainLayout component
const MainLayout = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')}>
      {/* Sidebar for desktop view */}
      <SidebarContent
        activePath={router.pathname}
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      
      {/* Mobile drawer */}
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="xs"
      >
        <DrawerContent>
          <SidebarContent activePath={router.pathname} onClose={onClose} />
        </DrawerContent>
      </Drawer>
      
      {/* Header and content */}
      <Box ml={{ base: 0, md: 60 }} p={0}>
        <Flex
          px={4}
          height="16"
          alignItems="center"
          bg={useColorModeValue('white', 'gray.900')}
          borderBottomWidth="1px"
          borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
          justifyContent="space-between"
        >
          <IconButton
            variant="ghost"
            onClick={onOpen}
            aria-label="open menu"
            icon={<FiMenu />}
            display={{ base: 'flex', md: 'none' }}
          />
          
          <HStack spacing={4}>
            <IconButton
              aria-label="notifications"
              variant="ghost"
              icon={<FiBell />}
              color="gray.500"
            />
            
            <Menu>
              <MenuButton>
                <HStack>
                  <Avatar
                    size="sm"
                    name="John Doe"
                    src="https://bit.ly/dan-abramov"
                  />
                  <Text display={{ base: 'none', md: 'flex' }} fontWeight="medium">
                    John Doe
                  </Text>
                </HStack>
              </MenuButton>
              <MenuList>
                <MenuItem>Profile</MenuItem>
                <MenuItem>Settings</MenuItem>
                <MenuDivider />
                <MenuItem>Logout</MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </Flex>
        
        <Box p={5}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout; 