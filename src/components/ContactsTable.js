import React, { useState } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  HStack,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Button,
  Avatar,
  Badge,
  Grid,
  GridItem,
  VStack,
  Heading,
  Divider,
  Tag,
  useColorModeValue,
} from '@chakra-ui/react';
import { 
  FiSearch, 
  FiPhone, 
  FiMail, 
  FiUser, 
  FiHome, 
  FiEdit, 
  FiPlus, 
  FiCalendar,
  FiMessageSquare,
  FiFileText
} from 'react-icons/fi';

// Sample data for contacts
const sampleContacts = [
  {
    owner_id: 1,
    name: 'John Smith',
    contact_info: '+66 81 234 5678 | john.smith@example.com',
    email: 'john.smith@example.com',
    phone: '+66 81 234 5678',
    listings: [
      {
        listing_id: 1,
        listing_code: 'L12345',
        listing_name: 'The Residence Condominium',
        listing_status: 'For Sale',
        asking_price: 8500000,
        marketing_status: 'พร้อมประกาศ',
      }
    ],
    notes: [
      { date: '2023-10-12', text: 'Initial contact made. Interested in selling property.' },
      { date: '2023-10-25', text: 'Scheduled property inspection for Nov 5.' },
    ],
    last_contact: '2023-10-25',
  },
  {
    owner_id: 2,
    name: 'Sarah Johnson',
    contact_info: '+66 95 876 5432 | sarah.j@example.com',
    email: 'sarah.j@example.com',
    phone: '+66 95 876 5432',
    listings: [
      {
        listing_id: 2,
        listing_code: 'L12346',
        listing_name: 'Modern House in Thonglor',
        listing_status: 'For Rent',
        rental_price: 80000,
        marketing_status: 'พร้อมประกาศ',
      }
    ],
    notes: [
      { date: '2023-09-05', text: 'Client looking to rent out property in Thonglor area.' },
      { date: '2023-09-15', text: 'Property listed for rent. Client prefers long-term tenants.' },
    ],
    last_contact: '2023-09-15',
  },
  {
    owner_id: 3,
    name: 'Michael Wong',
    contact_info: '+66 89 123 4567 | mwong@example.com',
    email: 'mwong@example.com',
    phone: '+66 89 123 4567',
    listings: [
      {
        listing_id: 3,
        listing_code: 'L12347',
        listing_name: 'Luxury Villa in Phuket',
        listing_status: 'For Sale & Rent',
        asking_price: 35000000,
        rental_price: 180000,
        marketing_status: 'พร้อมประกาศ',
      }
    ],
    notes: [
      { date: '2023-08-10', text: 'Owner of luxury property in Phuket, looking for both sale and rental options.' },
      { date: '2023-08-22', text: 'Agreed on listing terms. Property to be marketed internationally.' },
      { date: '2023-09-30', text: 'Several viewing inquiries received. Scheduled viewings for next week.' },
    ],
    last_contact: '2023-09-30',
  },
  {
    owner_id: 4,
    name: 'Piyawan Somchai',
    contact_info: '+66 82 345 6789 | piyawan@example.com',
    email: 'piyawan@example.com',
    phone: '+66 82 345 6789',
    listings: [
      {
        listing_id: 4,
        listing_code: 'L12348',
        listing_name: 'Townhouse at Ramkhamhaeng',
        listing_status: 'For Sale',
        asking_price: 6500000,
        marketing_status: 'ขายแล้ว',
      }
    ],
    notes: [
      { date: '2023-06-15', text: 'Owner wants to sell townhouse quickly due to relocation.' },
      { date: '2023-07-20', text: 'Reduced asking price to attract more buyers.' },
      { date: '2023-10-05', text: 'Offer accepted. Processing sale documents.' },
      { date: '2023-11-10', text: 'Sale completed. Property transferred to new owner.' },
    ],
    last_contact: '2023-11-10',
  },
  {
    owner_id: 5,
    name: 'Bangkok Properties Co.',
    contact_info: '+66 2 123 4567 | info@bkproperties.co.th',
    email: 'info@bkproperties.co.th',
    phone: '+66 2 123 4567',
    listings: [
      {
        listing_id: 5,
        listing_code: 'L12349',
        listing_name: 'Commercial Space in Siam',
        listing_status: 'For Rent',
        rental_price: 95000,
        marketing_status: 'พร้อมประกาศ',
      }
    ],
    notes: [
      { date: '2023-07-01', text: 'Company representative inquired about listing commercial space.' },
      { date: '2023-07-15', text: 'Property details and photos received.' },
    ],
    last_contact: '2023-07-15',
  },
  {
    owner_id: 6,
    name: 'Thomas Black',
    contact_info: '+66 83 456 7890 | thomas.black@example.com',
    email: 'thomas.black@example.com',
    phone: '+66 83 456 7890',
    listings: [
      {
        listing_id: 6,
        listing_code: 'L12350',
        listing_name: 'Penthouse at Riverside',
        listing_status: 'For Sale',
        asking_price: 28000000,
        marketing_status: 'เอาประกาศออก (ชั่วคราว)',
      }
    ],
    notes: [
      { date: '2023-05-20', text: 'Foreign owner looking to sell premium penthouse.' },
      { date: '2023-06-10', text: 'Property listed at premium price point.' },
      { date: '2023-08-15', text: 'Owner requested to temporarily remove listing while renovations are completed.' },
    ],
    last_contact: '2023-08-15',
  },
];

// Contact Drawer Component
const ContactDrawer = ({ isOpen, onClose, contact }) => {
  const tabBg = useColorModeValue('white', 'gray.800');
  const [newNote, setNewNote] = useState('');
  
  if (!contact) return null;
  
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">
          <Flex align="center">
            <Avatar name={contact.name} mr={3} size="sm" />
            <Box>
              <Text fontWeight="bold">{contact.name}</Text>
              <Text fontSize="sm" color="gray.500">Seller</Text>
            </Box>
          </Flex>
        </DrawerHeader>
        
        <DrawerBody p={0}>
          <Tabs>
            <TabList bg={tabBg} position="sticky" top={0} zIndex={1} px={4}>
              <Tab>Contact Info</Tab>
              <Tab>Properties</Tab>
              <Tab>Notes</Tab>
            </TabList>
            
            <TabPanels>
              <TabPanel>
                <VStack align="stretch" spacing={6}>
                  {/* Contact Information */}
                  <Box>
                    <Heading size="sm" mb={4}>Contact Information</Heading>
                    <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                      <GridItem colSpan={2}>
                        <Flex align="center">
                          <Box
                            p={2}
                            borderRadius="md"
                            bg="blue.50"
                            color="blue.500"
                            mr={3}
                          >
                            <FiPhone />
                          </Box>
                          <Box>
                            <Text color="gray.600" fontSize="sm">Phone</Text>
                            <Text fontWeight="medium">{contact.phone}</Text>
                          </Box>
                        </Flex>
                      </GridItem>
                      
                      <GridItem colSpan={2}>
                        <Flex align="center">
                          <Box
                            p={2}
                            borderRadius="md"
                            bg="green.50"
                            color="green.500"
                            mr={3}
                          >
                            <FiMail />
                          </Box>
                          <Box>
                            <Text color="gray.600" fontSize="sm">Email</Text>
                            <Text fontWeight="medium">{contact.email}</Text>
                          </Box>
                        </Flex>
                      </GridItem>
                      
                      <GridItem colSpan={2}>
                        <Flex align="center">
                          <Box
                            p={2}
                            borderRadius="md"
                            bg="purple.50"
                            color="purple.500"
                            mr={3}
                          >
                            <FiCalendar />
                          </Box>
                          <Box>
                            <Text color="gray.600" fontSize="sm">Last Contact</Text>
                            <Text fontWeight="medium">{contact.last_contact}</Text>
                          </Box>
                        </Flex>
                      </GridItem>
                    </Grid>
                  </Box>
                  
                  <Divider />
                  
                  {/* Quick Actions */}
                  <Box>
                    <Heading size="sm" mb={4}>Quick Actions</Heading>
                    <HStack spacing={4}>
                      <Button leftIcon={<FiPhone />} colorScheme="blue" flex={1}>
                        Call
                      </Button>
                      <Button leftIcon={<FiMail />} colorScheme="green" flex={1}>
                        Email
                      </Button>
                      <Button leftIcon={<FiPlus />} colorScheme="brand" flex={1}>
                        Add Note
                      </Button>
                    </HStack>
                  </Box>
                  
                  <Divider />
                  
                  {/* Recent Activity */}
                  <Box>
                    <Heading size="sm" mb={4}>Recent Activity</Heading>
                    <VStack align="stretch" spacing={3}>
                      {contact.notes.slice(-2).map((note, index) => (
                        <Box 
                          key={index} 
                          p={3} 
                          borderRadius="md" 
                          border="1px" 
                          borderColor="gray.200"
                        >
                          <Flex justify="space-between" mb={1}>
                            <Text fontWeight="medium" color="gray.700">Note</Text>
                            <Text fontSize="sm" color="gray.500">{note.date}</Text>
                          </Flex>
                          <Text fontSize="sm">{note.text}</Text>
                        </Box>
                      ))}
                    </VStack>
                  </Box>
                </VStack>
              </TabPanel>
              
              <TabPanel>
                <VStack align="stretch" spacing={4}>
                  <Heading size="sm" mb={2}>Properties</Heading>
                  
                  {contact.listings.map((listing, index) => (
                    <Box 
                      key={index}
                      p={4}
                      borderRadius="md"
                      border="1px"
                      borderColor="gray.200"
                    >
                      <Flex justify="space-between" mb={2}>
                        <Text fontWeight="semibold">{listing.listing_name}</Text>
                        <Badge
                          colorScheme={
                            listing.marketing_status === 'พร้อมประกาศ' ? 'green' :
                            listing.marketing_status === 'ขายแล้ว' ? 'red' : 'orange'
                          }
                        >
                          {listing.marketing_status}
                        </Badge>
                      </Flex>
                      
                      <Text fontSize="sm" color="gray.500" mb={3}>
                        {listing.listing_code}
                      </Text>
                      
                      <Flex justify="space-between" align="center">
                        <Badge
                          colorScheme={
                            listing.listing_status === 'For Sale' ? 'blue' :
                            listing.listing_status === 'For Rent' ? 'green' : 'purple'
                          }
                        >
                          {listing.listing_status}
                        </Badge>
                        
                        <Text fontWeight="bold">
                          {listing.listing_status.includes('Sale') 
                            ? `฿${listing.asking_price?.toLocaleString() || 'N/A'}`
                            : `฿${listing.rental_price?.toLocaleString() || 'N/A'}/mo`}
                        </Text>
                      </Flex>
                    </Box>
                  ))}
                  
                  <Button leftIcon={<FiPlus />} colorScheme="brand" w="full" mt={2}>
                    Add New Property
                  </Button>
                </VStack>
              </TabPanel>
              
              <TabPanel>
                <VStack align="stretch" spacing={4}>
                  <Flex>
                    <Input
                      placeholder="Add a new note..."
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      mr={2}
                    />
                    <Button colorScheme="brand">Add</Button>
                  </Flex>
                  
                  <Divider />
                  
                  <Heading size="sm" mb={2}>Notes History</Heading>
                  
                  {contact.notes.map((note, index) => (
                    <Box 
                      key={index}
                      p={4}
                      borderRadius="md"
                      border="1px"
                      borderColor="gray.200"
                    >
                      <Flex justify="space-between" mb={2} align="center">
                        <Text fontWeight="semibold" color="gray.700">
                          <FiMessageSquare style={{ display: 'inline', marginRight: '8px' }} />
                          {note.date}
                        </Text>
                        <IconButton
                          aria-label="Edit note"
                          icon={<FiEdit />}
                          size="sm"
                          variant="ghost"
                        />
                      </Flex>
                      <Text>{note.text}</Text>
                    </Box>
                  ))}
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

// Main ContactsTable Component
const ContactsTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  // Filter contacts based on search term
  const filteredContacts = sampleContacts.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleRowClick = (contact) => {
    setSelectedContact(contact);
    onOpen();
  };
  
  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6}>
        <Text fontSize="2xl" fontWeight="bold">Seller Contacts</Text>
        <Button leftIcon={<FiPlus />} colorScheme="brand">
          Add New Contact
        </Button>
      </Flex>
      
      {/* Search */}
      <Box mb={6}>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <FiSearch color="gray.300" />
          </InputLeftElement>
          <Input
            placeholder="Search contacts by name, email or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
      </Box>
      
      {/* Contacts Table */}
      <Box overflowX="auto">
        <Table variant="simple">
          <Thead bg="gray.50">
            <Tr>
              <Th>Name</Th>
              <Th>Contact Info</Th>
              <Th>Properties</Th>
              <Th>Last Contact</Th>
              <Th>Notes</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredContacts.length > 0 ? (
              filteredContacts.map((contact) => (
                <Tr
                  key={contact.owner_id}
                  onClick={() => handleRowClick(contact)}
                  cursor="pointer"
                  _hover={{ bg: 'gray.50' }}
                  transition="background 0.2s"
                >
                  <Td>
                    <Flex align="center">
                      <Avatar size="sm" name={contact.name} mr={3} />
                      <Text fontWeight="medium">{contact.name}</Text>
                    </Flex>
                  </Td>
                  <Td>
                    <VStack align="start" spacing={0}>
                      <Flex align="center">
                        <FiPhone size={12} style={{ marginRight: '6px' }} />
                        <Text fontSize="sm">{contact.phone}</Text>
                      </Flex>
                      <Flex align="center">
                        <FiMail size={12} style={{ marginRight: '6px' }} />
                        <Text fontSize="sm">{contact.email}</Text>
                      </Flex>
                    </VStack>
                  </Td>
                  <Td>
                    <HStack spacing={1}>
                      {contact.listings.map((listing, idx) => (
                        <Tag
                          key={idx}
                          size="sm"
                          colorScheme={
                            listing.listing_status === 'For Sale' ? 'blue' :
                            listing.listing_status === 'For Rent' ? 'green' : 'purple'
                          }
                        >
                          {listing.listing_code}
                        </Tag>
                      ))}
                      {!contact.listings.length && <Text>-</Text>}
                    </HStack>
                  </Td>
                  <Td>
                    <Text>{contact.last_contact}</Text>
                  </Td>
                  <Td>
                    <Badge>{contact.notes.length} notes</Badge>
                  </Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan={5} textAlign="center" py={10}>
                  <Text color="gray.500">No contacts found</Text>
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </Box>
      
      {/* Contact Detail Drawer */}
      <ContactDrawer
        isOpen={isOpen}
        onClose={onClose}
        contact={selectedContact}
      />
    </Box>
  );
};

export default ContactsTable; 