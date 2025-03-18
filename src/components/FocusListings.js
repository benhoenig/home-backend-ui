import React, { useState } from 'react';
import {
  Box,
  Text,
  Flex,
  Grid,
  Badge,
  Button,
  Select,
  InputGroup,
  InputLeftElement,
  Input,
  Card,
  CardBody,
  Heading,
  Stack,
  Divider,
  Image,
  HStack,
  VStack,
  Avatar,
  Tag,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiSearch, FiFilter, FiMoreVertical, FiEdit, FiPhone, FiMail, FiStar, FiCalendar } from 'react-icons/fi';

// Sample data for focus listings
const focusListings = [
  {
    listing_id: 1,
    listing_code: 'L12345',
    listing_name: 'The Residence Condominium',
    marketing_status: 'พร้อมประกาศ',
    listing_type: 'A List',
    listing_status: 'For Sale',
    property_type: 'Condo',
    zone_name: 'Sukhumvit',
    bedroom: 2,
    bathroom: 2,
    พื้นที่ใช้สอย: 85.5,
    asking_price: 8500000,
    owner_name: 'John Smith',
    owner_contact: '+66 81 234 5678',
    owner_email: 'john.smith@example.com',
    assigned_to: 'Agent B',
    created_time: '2023-06-15',
    last_contact: '2023-12-01',
    focus_reason: 'Owner wants to sell within 3 months',
    focus_status: 'High Priority',
    next_action: '2024-01-15',
    action_note: 'Follow up with potential buyer',
  },
  {
    listing_id: 3,
    listing_code: 'L12347',
    listing_name: 'Luxury Villa in Phuket',
    marketing_status: 'พร้อมประกาศ',
    listing_type: 'Exclusive List',
    listing_status: 'For Sale & Rent',
    property_type: 'Villa',
    zone_name: 'Phuket',
    bedroom: 5,
    bathroom: 6,
    พื้นที่ใช้สอย: 450,
    asking_price: 35000000,
    rental_price: 180000,
    owner_name: 'Michael Wong',
    owner_contact: '+66 89 123 4567',
    owner_email: 'mwong@example.com',
    assigned_to: 'Agent D',
    created_time: '2023-03-10',
    last_contact: '2023-12-10',
    focus_reason: 'Premium property with high commission',
    focus_status: 'Medium Priority',
    next_action: '2024-01-20',
    action_note: 'Schedule professional photo shoot',
  },
  {
    listing_id: 6,
    listing_code: 'L12350',
    listing_name: 'Penthouse at Riverside',
    marketing_status: 'เอาประกาศออก (ชั่วคราว)',
    listing_type: 'Exclusive List',
    listing_status: 'For Sale',
    property_type: 'Penthouse',
    zone_name: 'Riverside',
    bedroom: 4,
    bathroom: 5,
    พื้นที่ใช้สอย: 300,
    asking_price: 28000000,
    owner_name: 'Thomas Black',
    owner_contact: '+66 83 456 7890',
    owner_email: 'thomas.black@example.com',
    assigned_to: 'Agent A',
    created_time: '2023-08-01',
    last_contact: '2023-11-05',
    focus_reason: 'Renovations completed, ready to re-list',
    focus_status: 'High Priority',
    next_action: '2024-01-10',
    action_note: 'Contact owner to confirm new photos and listing details',
  },
];

const FocusListingCard = ({ listing, onOpenDetails }) => {
  const cardBg = useColorModeValue('white', 'gray.700');
  
  return (
    <Card 
      mb={4} 
      boxShadow="sm" 
      bg={cardBg} 
      position="relative"
      borderTop="4px solid"
      borderColor={
        listing.focus_status === 'High Priority' ? 'red.400' :
        listing.focus_status === 'Medium Priority' ? 'orange.400' : 'green.400'
      }
    >
      <CardBody>
        <Grid templateColumns={{ base: '1fr', md: '250px 1fr' }} gap={5}>
          {/* Property Image */}
          <Box>
            <Image
              src={`https://source.unsplash.com/random/300x200/?real+estate,${listing.property_type}`}
              alt={listing.listing_name}
              borderRadius="md"
              objectFit="cover"
              h="full"
              maxH="180px"
              w="full"
            />
          </Box>
          
          {/* Property Details */}
          <Box>
            <Flex justify="space-between" align="flex-start" mb={3}>
              <Box>
                <Flex align="center" mb={1}>
                  <Heading size="md" fontWeight="bold" mr={2}>{listing.listing_name}</Heading>
                  <Badge colorScheme={listing.focus_status === 'High Priority' ? 'red' : 'orange'}>
                    {listing.focus_status}
                  </Badge>
                </Flex>
                <Text fontSize="sm" color="gray.500" mb={1}>
                  {listing.listing_code} • {listing.property_type} in {listing.zone_name}
                </Text>
              </Box>
              
              <Menu>
                <MenuButton
                  as={IconButton}
                  icon={<FiMoreVertical />}
                  variant="ghost"
                  size="sm"
                  aria-label="More options"
                />
                <MenuList>
                  <MenuItem icon={<FiEdit />}>Edit Focus Details</MenuItem>
                  <MenuItem icon={<FiStar />}>Remove from Focus</MenuItem>
                </MenuList>
              </Menu>
            </Flex>
            
            <Divider my={3} />
            
            <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={4}>
              {/* Property Info */}
              <Box>
                <Text fontSize="sm" fontWeight="semibold" mb={2}>Property</Text>
                <VStack align="flex-start" spacing={1}>
                  <HStack>
                    <Badge>{listing.bedroom} bed</Badge>
                    <Badge>{listing.bathroom} bath</Badge>
                    <Badge>{listing.พื้นที่ใช้สอย} sqm</Badge>
                  </HStack>
                  
                  <Badge
                    colorScheme={
                      listing.listing_status === 'For Sale' ? 'blue' :
                      listing.listing_status === 'For Rent' ? 'green' : 'purple'
                    }
                  >
                    {listing.listing_status}
                  </Badge>
                  
                  <Text fontWeight="bold" color="brand.500">
                    {listing.listing_status.includes('Sale') && 
                      `฿${listing.asking_price?.toLocaleString()}`}
                    {listing.listing_status === 'For Sale & Rent' && ' / '}
                    {listing.listing_status.includes('Rent') && 
                      `฿${listing.rental_price?.toLocaleString()}/mo`}
                  </Text>
                </VStack>
              </Box>
              
              {/* Owner Info */}
              <Box>
                <Text fontSize="sm" fontWeight="semibold" mb={2}>Owner</Text>
                <VStack align="flex-start" spacing={1}>
                  <Flex align="center">
                    <Avatar size="xs" name={listing.owner_name} mr={2} />
                    <Text fontSize="sm">{listing.owner_name}</Text>
                  </Flex>
                  <Text fontSize="sm">Last Contact: {listing.last_contact}</Text>
                </VStack>
              </Box>
              
              {/* Next Action */}
              <Box>
                <Text fontSize="sm" fontWeight="semibold" mb={2}>Next Action</Text>
                <VStack align="flex-start" spacing={1}>
                  <Flex align="center">
                    <FiCalendar style={{ marginRight: '8px' }} />
                    <Text fontSize="sm">{listing.next_action}</Text>
                  </Flex>
                  <Text fontSize="sm" noOfLines={2}>{listing.action_note}</Text>
                </VStack>
              </Box>
            </Grid>
            
            <HStack spacing={2} mt={4}>
              <Button size="sm" leftIcon={<FiPhone />} colorScheme="blue" variant="outline">
                Call Owner
              </Button>
              <Button size="sm" leftIcon={<FiMail />} colorScheme="green" variant="outline">
                Email
              </Button>
              <Button 
                size="sm" 
                onClick={() => onOpenDetails(listing)}
                variant="solid" 
                colorScheme="brand"
              >
                View Details
              </Button>
            </HStack>
          </Box>
        </Grid>
      </CardBody>
    </Card>
  );
};

const FocusDetailsModal = ({ isOpen, onClose, listing }) => {
  if (!listing) return null;
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text>{listing.listing_name}</Text>
          <Text fontSize="sm" color="gray.500">{listing.listing_code}</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <VStack spacing={6} align="stretch">
            {/* Images */}
            <Box borderRadius="md" overflow="hidden">
              <Image
                src={`https://source.unsplash.com/random/800x400/?real+estate,${listing.property_type}`}
                alt={listing.listing_name}
              />
            </Box>
            
            {/* Focus Information */}
            <Box>
              <Heading size="sm" mb={3}>Focus Information</Heading>
              <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                <Box>
                  <Text color="gray.600" fontSize="sm">Focus Status</Text>
                  <Badge
                    colorScheme={
                      listing.focus_status === 'High Priority' ? 'red' :
                      listing.focus_status === 'Medium Priority' ? 'orange' : 'green'
                    }
                  >
                    {listing.focus_status}
                  </Badge>
                </Box>
                
                <Box>
                  <Text color="gray.600" fontSize="sm">Next Action Date</Text>
                  <Text fontWeight="medium">{listing.next_action}</Text>
                </Box>
                
                <Box gridColumn="span 2">
                  <Text color="gray.600" fontSize="sm">Reason for Focus</Text>
                  <Text fontWeight="medium">{listing.focus_reason}</Text>
                </Box>
                
                <Box gridColumn="span 2">
                  <Text color="gray.600" fontSize="sm">Action Required</Text>
                  <Text fontWeight="medium">{listing.action_note}</Text>
                </Box>
              </Grid>
            </Box>
            
            <Divider />
            
            {/* Property Details */}
            <Box>
              <Heading size="sm" mb={3}>Property Details</Heading>
              <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                <Box>
                  <Text color="gray.600" fontSize="sm">Type</Text>
                  <Text fontWeight="medium">{listing.property_type}</Text>
                </Box>
                
                <Box>
                  <Text color="gray.600" fontSize="sm">Location</Text>
                  <Text fontWeight="medium">{listing.zone_name}</Text>
                </Box>
                
                <Box>
                  <Text color="gray.600" fontSize="sm">Status</Text>
                  <Badge
                    colorScheme={
                      listing.listing_status === 'For Sale' ? 'blue' :
                      listing.listing_status === 'For Rent' ? 'green' : 'purple'
                    }
                  >
                    {listing.listing_status}
                  </Badge>
                </Box>
                
                <Box>
                  <Text color="gray.600" fontSize="sm">Bedrooms</Text>
                  <Text fontWeight="medium">{listing.bedroom}</Text>
                </Box>
                
                <Box>
                  <Text color="gray.600" fontSize="sm">Bathrooms</Text>
                  <Text fontWeight="medium">{listing.bathroom}</Text>
                </Box>
                
                <Box>
                  <Text color="gray.600" fontSize="sm">Area</Text>
                  <Text fontWeight="medium">{listing.พื้นที่ใช้สอย} sqm</Text>
                </Box>
                
                <Box gridColumn="span 3">
                  <Text color="gray.600" fontSize="sm">Price</Text>
                  <Text fontWeight="bold" color="brand.500">
                    {listing.listing_status.includes('Sale') && 
                      `฿${listing.asking_price?.toLocaleString()}`}
                    {listing.listing_status === 'For Sale & Rent' && ' / '}
                    {listing.listing_status.includes('Rent') && 
                      `฿${listing.rental_price?.toLocaleString()}/mo`}
                  </Text>
                </Box>
              </Grid>
            </Box>
            
            <Divider />
            
            {/* Owner Information */}
            <Box>
              <Heading size="sm" mb={3}>Owner Information</Heading>
              <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                <Box>
                  <Text color="gray.600" fontSize="sm">Name</Text>
                  <Text fontWeight="medium">{listing.owner_name}</Text>
                </Box>
                
                <Box>
                  <Text color="gray.600" fontSize="sm">Last Contact</Text>
                  <Text fontWeight="medium">{listing.last_contact}</Text>
                </Box>
                
                <Box>
                  <Text color="gray.600" fontSize="sm">Phone</Text>
                  <Text fontWeight="medium">{listing.owner_contact}</Text>
                </Box>
                
                <Box>
                  <Text color="gray.600" fontSize="sm">Email</Text>
                  <Text fontWeight="medium">{listing.owner_email}</Text>
                </Box>
              </Grid>
            </Box>
            
            {/* Action Buttons */}
            <HStack spacing={4}>
              <Button leftIcon={<FiEdit />} colorScheme="brand" w="full">
                Edit Focus Details
              </Button>
              <Button leftIcon={<FiStar />} colorScheme="orange" variant="outline" w="full">
                Remove from Focus
              </Button>
            </HStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const FocusListings = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [selectedListing, setSelectedListing] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  // Filter listings based on search term and priority filter
  const filteredListings = focusListings
    .filter(listing => 
      listing.listing_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.listing_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.zone_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.owner_name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(listing => !priorityFilter || listing.focus_status === priorityFilter);
  
  const handleOpenDetails = (listing) => {
    setSelectedListing(listing);
    onOpen();
  };
  
  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6}>
        <Text fontSize="2xl" fontWeight="bold">Owner Focus</Text>
        <Button colorScheme="brand">
          Add to Focus
        </Button>
      </Flex>
      
      {/* Filters */}
      <Flex mb={6} gap={4} direction={{ base: 'column', md: 'row' }}>
        <InputGroup flex={1}>
          <InputLeftElement pointerEvents="none">
            <FiSearch color="gray.300" />
          </InputLeftElement>
          <Input
            placeholder="Search listings or owners..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
        
        <Select
          placeholder="Filter by Priority"
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          icon={<FiFilter />}
          w={{ base: 'full', md: '250px' }}
        >
          <option value="High Priority">High Priority</option>
          <option value="Medium Priority">Medium Priority</option>
          <option value="Low Priority">Low Priority</option>
        </Select>
      </Flex>
      
      {/* Listings */}
      <Box>
        {filteredListings.length > 0 ? (
          filteredListings.map(listing => (
            <FocusListingCard 
              key={listing.listing_id} 
              listing={listing} 
              onOpenDetails={handleOpenDetails}
            />
          ))
        ) : (
          <Box textAlign="center" p={10} bg="white" borderRadius="md">
            <Text color="gray.500">No focus listings found</Text>
          </Box>
        )}
      </Box>
      
      {/* Details Modal */}
      <FocusDetailsModal
        isOpen={isOpen}
        onClose={onClose}
        listing={selectedListing}
      />
    </Box>
  );
};

export default FocusListings; 