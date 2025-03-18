import React, { useState } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Text,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
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
  TabPanels,
  TabPanel,
  Tabs,
  Button,
  Image,
  Grid,
  GridItem,
  VStack,
  Tag,
  Avatar,
  useColorModeValue,
  Tooltip,
  Divider,
  Skeleton,
} from '@chakra-ui/react';
import { FiSearch, FiFilter, FiMapPin, FiUser, FiPhone, FiCalendar, FiEdit, FiTrash2, FiBriefcase, FiHeart, FiImage } from 'react-icons/fi';
import PropertyImage from './PropertyImage';
import PropertyGallery from './PropertyGallery';
import AdvancedSearchFilters from './AdvancedSearchFilters';
import ListingForm from './ListingForm';

// Sample data based on the database schema
const sampleListings = [
  {
    listing_id: 1,
    listing_code: 'L12345',
    listing_name: 'Modern House in Thonglor',
    marketing_status: 'พร้อมประกาศ',
    owner_focus: true,
    listing_type: 'A List',
    listing_status: 'For Rent',
    project_location: 'นอกโครงการ',
    owner_name: 'John Doe',
    project_name: null,
    zone_name: 'Thonglor',
    property_type: 'House',
    bedroom: 3,
    bathroom: 3,
    ไร่: 0,
    งาน: 1,
    วา: 50,
    พื้นที่ใช้สอย: 150,
    ตอนโต๊ะ: 200,
    จำนวนชั้น: 2,
    building: null,
    อยู่ชั้นที่: null,
    unit_no: null,
    ทิศออกตัว: 'ทิศเหนือ',
    view: 'Garden',
    direction: 'North',
    asking_price: null,
    rental_price: 80000,
    ราคารับ_net: 72000,
    street: 'ซอยทองหล่อ 10',
    location_grade: 'A',
    parking: '2 cars',
    bts: 'Thonglor (350m)',
    mrt: 'N/A',
    arl: 'N/A',
    google_maps_link: 'https://maps.google.com/?q=Thonglor+10',
    remark: 'Beautiful house with garden and private pool',
    created_by: 'Agent A',
    assigned_to: 'Agent A',
    created_time: '2023-09-22',
    months_on_sale: 6,
  },
  {
    listing_id: 2,
    listing_code: 'L12346',
    listing_name: 'Luxury Condo at The XXXIX',
    marketing_status: 'พร้อมประกาศ',
    owner_focus: false,
    listing_type: 'Exclusive List',
    listing_status: 'For Sale',
    project_location: 'ในโครงการ',
    owner_name: 'Jane Smith',
    project_name: 'The XXXIX',
    zone_name: 'Sukhumvit',
    property_type: 'Condo',
    bedroom: 2,
    bathroom: 2,
    ไร่: null,
    งาน: null,
    วา: null,
    พื้นที่ใช้สอย: 65,
    ตอนโต๊ะ: null,
    จำนวนชั้น: null,
    building: 'Tower A',
    อยู่ชั้นที่: '15',
    unit_no: 'A1502',
    ทิศออกตัว: 'ทิศตะวันออก',
    view: 'City',
    direction: 'East',
    asking_price: 12000000,
    rental_price: null,
    ราคารับ_net: 11400000,
    street: 'ซอยสุขุมวิท 39',
    location_grade: 'A+',
    parking: '1 car',
    bts: 'Phrom Phong (400m)',
    mrt: 'N/A',
    arl: 'N/A',
    google_maps_link: 'https://maps.google.com/?q=The+XXXIX+Sukhumvit',
    remark: 'Fully furnished with high-end appliances',
    created_by: 'Agent B',
    assigned_to: 'Agent B',
    created_time: '2023-10-15',
    months_on_sale: 5,
  },
  {
    listing_id: 3,
    listing_code: 'L12347',
    listing_name: 'Single House in Bangna',
    marketing_status: 'พร้อมประกาศ',
    owner_focus: true,
    listing_type: 'A List',
    listing_status: 'For Sale & Rent',
    project_location: 'ในโครงการ',
    owner_name: 'Robert Chen',
    project_name: 'Perfect Place Bangna',
    zone_name: 'Bangna',
    property_type: 'House',
    bedroom: 4,
    bathroom: 3,
    ไร่: 0,
    งาน: 1,
    วา: 80,
    พื้นที่ใช้สอย: 220,
    ตอนโต๊ะ: 280,
    จำนวนชั้น: 2,
    building: null,
    อยู่ชั้นที่: null,
    unit_no: '88/123',
    ทิศออกตัว: 'ทิศใต้',
    view: 'Garden',
    direction: 'South',
    asking_price: 15000000,
    rental_price: 65000,
    ราคารับ_net: 14250000,
    street: 'บางนา-ตราด กม.7',
    location_grade: 'B+',
    parking: '3 cars',
    bts: 'N/A',
    mrt: 'N/A',
    arl: 'N/A',
    google_maps_link: 'https://maps.google.com/?q=Perfect+Place+Bangna',
    remark: 'Corner unit with large garden',
    created_by: 'Agent C',
    assigned_to: 'Agent C',
    created_time: '2023-08-10',
    months_on_sale: 7,
  },
  {
    listing_id: 4,
    listing_code: 'L12348',
    listing_name: 'Townhouse in Ratchada',
    marketing_status: 'ขายแล้ว',
    owner_focus: false,
    listing_type: 'A List',
    listing_status: 'For Sale',
    project_location: 'ในโครงการ',
    owner_name: 'Sarah Wong',
    project_name: 'Baan Klang Muang',
    zone_name: 'Ratchada',
    property_type: 'Townhouse',
    bedroom: 3,
    bathroom: 3,
    ไร่: 0,
    งาน: 0,
    วา: 24,
    พื้นที่ใช้สอย: 180,
    ตอนโต๊ะ: 200,
    จำนวนชั้น: 3,
    building: null,
    อยู่ชั้นที่: null,
    unit_no: '55/67',
    ทิศออกตัว: 'ทิศตะวันตก',
    view: 'Street',
    direction: 'West',
    asking_price: 7500000,
    rental_price: null,
    ราคารับ_net: 7125000,
    street: 'ซอยรัชดา 32',
    location_grade: 'B',
    parking: '2 cars',
    bts: 'N/A',
    mrt: 'Ladprao (600m)',
    arl: 'N/A',
    google_maps_link: 'https://maps.google.com/?q=Baan+Klang+Muang+Ratchada',
    remark: 'Renovated kitchen and bathrooms',
    created_by: 'Agent A',
    assigned_to: 'Agent A',
    created_time: '2023-07-05',
    months_on_sale: 8,
  },
  {
    listing_id: 5,
    listing_code: 'L12349',
    listing_name: 'Penthouse at The River',
    marketing_status: 'เอาประกาศออก (ชั่วคราว)',
    owner_focus: false,
    listing_type: 'Exclusive List',
    listing_status: 'For Rent',
    project_location: 'ในโครงการ',
    owner_name: 'William Brown',
    project_name: 'The River',
    zone_name: 'Riverside',
    property_type: 'Penthouse',
    bedroom: 3,
    bathroom: 4,
    ไร่: null,
    งาน: null,
    วา: null,
    พื้นที่ใช้สอย: 280,
    ตอนโต๊ะ: null,
    จำนวนชั้น: 2,
    building: 'South Tower',
    อยู่ชั้นที่: '70-71',
    unit_no: 'PH01',
    ทิศออกตัว: 'ทิศตะวันออก',
    view: 'River',
    direction: 'East',
    asking_price: null,
    rental_price: 180000,
    ราคารับ_net: 162000,
    street: 'เจริญนคร',
    location_grade: 'A+',
    parking: '3 cars',
    bts: 'Saphan Taksin (700m)',
    mrt: 'N/A',
    arl: 'N/A',
    google_maps_link: 'https://maps.google.com/?q=The+River+Bangkok',
    remark: 'Private roof terrace with infinity pool',
    created_by: 'Agent D',
    assigned_to: 'Agent D',
    created_time: '2023-09-01',
    months_on_sale: 6,
  },
  {
    listing_id: 6,
    listing_code: 'L12350',
    listing_name: 'Land in Bangna',
    marketing_status: 'เอาประกาศออก (ถาวร)',
    owner_focus: false,
    listing_type: 'Exclusive List',
    listing_status: 'For Sale',
    project_location: 'นอกโครงการ',
    owner_name: 'Thomas Black',
    project_name: null,
    zone_name: 'Bangna',
    property_type: 'Land',
    bedroom: null,
    bathroom: null,
    ไร่: 5,
    งาน: 2,
    วา: 80,
    พื้นที่ใช้สอย: null,
    ตอนโต๊ะ: 8280,
    จำนวนชั้น: null,
    building: null,
    อยู่ชั้นที่: null,
    unit_no: null,
    ทิศออกตัว: 'ทิศตะวันออก',
    view: 'Open',
    direction: 'East',
    asking_price: 28000000,
    rental_price: null,
    ราคารับ_net: 26600000,
    street: 'ถนนบางนา-ตราด กม.15',
    location_grade: 'B',
    parking: null,
    bts: 'N/A',
    mrt: 'N/A',
    arl: 'N/A',
    google_maps_link: 'https://maps.google.com/?q=Bangna+Km15',
    remark: 'Corner plot with access from two roads',
    created_by: 'Agent B',
    assigned_to: 'Agent A',
    created_time: '2023-08-01',
    months_on_sale: 7,
  },
];

const ListingDrawer = ({ isOpen, onClose, listing, canEdit = false, onToggleOwnerFocus }) => {
  const tabBg = useColorModeValue('white', 'gray.800');
  
  if (!listing) return null;
  
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">
          <Flex align="center" justify="space-between">
            <Box>
              <Text fontWeight="bold">{listing.listing_name}</Text>
              <Flex align="center" mt={1}>
                <Text fontSize="sm" color="gray.500" mr={2}>
                  {listing.listing_code}
                </Text>
                <Badge 
                  colorScheme={
                    listing.listing_status === 'For Sale' ? 'blue' :
                    listing.listing_status === 'For Rent' ? 'green' : 'purple'
                  }
                >
                  {listing.listing_status}
                </Badge>
              </Flex>
            </Box>
            <Tooltip label={listing.owner_focus ? "Remove from Owner Focus" : "Add to Owner Focus"}>
              <IconButton
                aria-label="Toggle owner focus"
                icon={<FiHeart />}
                variant="ghost"
                colorScheme={listing.owner_focus ? "red" : "gray"}
                onClick={() => onToggleOwnerFocus(listing.listing_id)}
                _hover={{ 
                  bg: listing.owner_focus ? 'red.100' : 'gray.100',
                }}
                fill={listing.owner_focus ? "red.500" : "none"}
                size="md"
              />
            </Tooltip>
          </Flex>
        </DrawerHeader>
        
        <DrawerBody p={0}>
          <Tabs>
            <TabList bg={tabBg} position="sticky" top={0} zIndex={1} px={4}>
              <Tab>Details</Tab>
              <Tab>Photos</Tab>
              <Tab>Location</Tab>
              <Tab>History</Tab>
              <Tab>Matching Tags</Tab>
            </TabList>
            
            <TabPanels>
              <TabPanel>
                {/* Property Details */}
                <VStack align="stretch" spacing={6}>
                  {/* Main Photo */}
                  <Box position="relative" borderRadius="md" overflow="hidden">
                    <PropertyImage
                      propertyType={listing.property_type}
                      propertyId={listing.listing_id}
                      alt={listing.listing_name}
                      w="100%"
                      h="200px"
                      objectFit="cover"
                    />
                    <Badge
                      position="absolute"
                      top={3}
                      right={3}
                      colorScheme={
                        listing.marketing_status === 'พร้อมประกาศ' ? 'green' :
                        listing.marketing_status === 'ขายแล้ว' ? 'red' : 'orange'
                      }
                      px={2}
                      py={1}
                    >
                      {listing.marketing_status}
                    </Badge>
                  </Box>

                  {/* Price */}
                  <Box p={4} bg="gray.50" borderRadius="md" mb={2}>
                    {listing.asking_price && (
                      <Flex justify="space-between" align="center" mb={listing.rental_price ? 2 : 0}>
                        <Text fontWeight="medium" color="gray.600">
                          Sale Price
                        </Text>
                        <Text fontWeight="bold" fontSize="xl" color="brand.500">
                          ฿{listing.asking_price?.toLocaleString() || 'N/A'}
                        </Text>
                      </Flex>
                    )}
                    
                    {listing.rental_price && (
                      <Flex justify="space-between" align="center">
                        <Text fontWeight="medium" color="gray.600">Rental Price</Text>
                        <Text fontWeight="bold" fontSize={listing.asking_price ? "lg" : "xl"} color={listing.asking_price ? "green.500" : "brand.500"}>
                          ฿{listing.rental_price?.toLocaleString() || 'N/A'}/mo
                        </Text>
                      </Flex>
                    )}
                    
                    {listing.พื้นที่ใช้สอย && listing.asking_price && (
                      <Flex justify="space-between" align="center" mt={2}>
                        <Text fontWeight="medium" color="gray.600">Price Per SQM</Text>
                        <Text fontWeight="medium" fontSize="md" color="gray.600">
                          ฿{Math.round(listing.asking_price / listing.พื้นที่ใช้สอย).toLocaleString()}
                        </Text>
                      </Flex>
                    )}
                  </Box>

                  {/* Property Information */}
                  <Box>
                    <Text fontWeight="semibold" mb={3}>Property Information</Text>
                    <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                      <GridItem>
                        <Text color="gray.600">Project Location</Text>
                        <Text fontWeight="medium">{listing.project_location}</Text>
                      </GridItem>

                      <GridItem>
                        <Text color="gray.600">ชื่อถนน/ซอย</Text>
                        <Text fontWeight="medium">{listing.street || '-'}</Text>
                      </GridItem>

                      <GridItem>
                        <Text color="gray.600">Zone/Area</Text>
                        <Text fontWeight="medium">{listing.zone_name}</Text>
                      </GridItem>

                      <GridItem>
                        <Text color="gray.600">Type</Text>
                        <Text fontWeight="medium">{listing.property_type}</Text>
                      </GridItem>
                      
                      <GridItem>
                        <Text color="gray.600">Bedrooms</Text>
                        <Text fontWeight="medium">{listing.bedroom}</Text>
                      </GridItem>
                      <GridItem>
                        <Text color="gray.600">Bathrooms</Text>
                        <Text fontWeight="medium">{listing.bathroom}</Text>
                      </GridItem>

                      {listing.property_type !== 'Condo' && (
                        <>
                          <GridItem colSpan={2}>
                            <Text color="gray.600">Land Size</Text>
                            <Text fontWeight="medium">
                              {listing.ไร่ ? `${listing.ไร่} rai, ` : ''}
                              {listing.งาน ? `${listing.งาน} ngan, ` : ''}
                              {listing.วา ? `${listing.วา} sq.wah` : ''}
                              {!listing.ไร่ && !listing.งาน && !listing.วา && '-'}
                            </Text>
                          </GridItem>

                          <GridItem>
                            <Text color="gray.600">Usable Area</Text>
                            <Text fontWeight="medium">{listing.พื้นที่ใช้สอย} sqm</Text>
                          </GridItem>
                        </>
                      )}

                      {listing.property_type === 'Condo' && (
                        <>
                          <GridItem>
                            <Text color="gray.600">Size</Text>
                            <Text fontWeight="medium">{listing.พื้นที่ใช้สอย} sqm</Text>
                          </GridItem>

                          <GridItem>
                            <Text color="gray.600">Floor</Text>
                            <Text fontWeight="medium">{listing.อยู่ชั้นที่ || '-'}</Text>
                          </GridItem>
                        </>
                      )}

                      <GridItem>
                        <Text color="gray.600">No. of Floors</Text>
                        <Text fontWeight="medium">{listing.จำนวนชั้น || '-'}</Text>
                      </GridItem>

                      <GridItem>
                        <Text color="gray.600">Unit No.</Text>
                        <Text fontWeight="medium">{listing.unit_no || '-'}</Text>
                      </GridItem>

                      <GridItem>
                        <Text color="gray.600">Building</Text>
                        <Text fontWeight="medium">{listing.building || '-'}</Text>
                      </GridItem>

                      <GridItem>
                        <Text color="gray.600">Project</Text>
                        <Text fontWeight="medium">{listing.project_name || 'N/A'}</Text>
                      </GridItem>

                      <GridItem>
                        <Text color="gray.600">ที่จอดรถ</Text>
                        <Text fontWeight="medium">{listing.parking || '-'}</Text>
                      </GridItem>
                    </Grid>
                  </Box>

                  {/* Agent */}
                  <Box>
                    <Text fontWeight="semibold" mb={3}>Agent</Text>
                    <Flex align="center">
                      <Avatar size="sm" name={listing.assigned_to} mr={3} />
                      <Box>
                        <Text fontWeight="medium">{listing.assigned_to}</Text>
                        <Text fontSize="sm" color="gray.500">Assigned Agent</Text>
                      </Box>
                    </Flex>
                  </Box>

                  {/* Added details */}
                  <Box>
                    <Text fontWeight="semibold" mb={3}>Additional Information</Text>
                    <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                      <GridItem>
                        <Text color="gray.600">Listing Type</Text>
                        <Tag size="sm" colorScheme={
                          listing.listing_type === 'A List' ? 'purple' :
                          listing.listing_type === 'Exclusive List' ? 'red' : 'gray'
                        }>
                          {listing.listing_type}
                        </Tag>
                      </GridItem>
                      
                      <GridItem>
                        <Text color="gray.600">Location Grade</Text>
                        <Text fontWeight="medium">{listing.location_grade || '-'}</Text>
                      </GridItem>
                      
                      <GridItem>
                        <Text color="gray.600">Created Date</Text>
                        <Text fontWeight="medium">{listing.created_time}</Text>
                      </GridItem>
                      
                      <GridItem>
                        <Text color="gray.600">Months on Market</Text>
                        <Text fontWeight="medium">{listing.months_on_sale}</Text>
                      </GridItem>
                      
                      <GridItem colSpan={2}>
                        <Text color="gray.600">Net Price</Text>
                        <Text fontWeight="medium">
                          {listing.ราคารับ_net 
                            ? `฿${listing.ราคารับ_net.toLocaleString()}` 
                            : '-'}
                        </Text>
                      </GridItem>
                      
                      <GridItem colSpan={2}>
                        <Text color="gray.600">Remarks</Text>
                        <Text fontWeight="medium">{listing.remark || '-'}</Text>
                      </GridItem>
                    </Grid>
                  </Box>
                  
                  {/* Action buttons */}
                  {canEdit && (
                    <HStack spacing={4} mt={4}>
                      <Button
                        leftIcon={<FiEdit />}
                        colorScheme="brand"
                        variant="solid"
                        w="full"
                      >
                        Edit Listing
                      </Button>
                      <Button
                        leftIcon={<FiTrash2 />}
                        colorScheme="red"
                        variant="outline"
                        w="full"
                      >
                        Remove Listing
                      </Button>
                    </HStack>
                  )}
                </VStack>
              </TabPanel>
              
              <TabPanel>
                {/* Photos Tab */}
                <PropertyGallery 
                  propertyType={listing.property_type}
                  propertyId={listing.listing_id}
                  count={6}
                />
              </TabPanel>
              
              <TabPanel>
                {/* Location Tab */}
                <Box
                  bg="gray.100"
                  borderRadius="md"
                  h="300px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <VStack>
                    <FiMapPin size={30} />
                    <Text>Map View Placeholder</Text>
                    <Text fontSize="sm" color="gray.500">Google Maps integration would go here</Text>
                  </VStack>
                </Box>
                
                <Box mt={4}>
                  <Text fontWeight="semibold" mb={2}>Location Details</Text>
                  <Text mb={1}>Zone: {listing.zone_name}</Text>
                  <Text mb={1}>Project: {listing.project_name || 'N/A'}</Text>
                  <Text mb={1}>Type: {listing.project_location}</Text>
                  
                  <Text fontWeight="semibold" mt={4} mb={2}>Nearby Transit</Text>
                  <Grid templateColumns="repeat(3, 1fr)" gap={2}>
                    <GridItem>
                      <Text color="gray.600">BTS</Text>
                      <Text fontWeight="medium">{listing.bts || 'N/A'}</Text>
                    </GridItem>
                    <GridItem>
                      <Text color="gray.600">MRT</Text>
                      <Text fontWeight="medium">{listing.mrt || 'N/A'}</Text>
                    </GridItem>
                    <GridItem>
                      <Text color="gray.600">ARL</Text>
                      <Text fontWeight="medium">{listing.arl || 'N/A'}</Text>
                    </GridItem>
                  </Grid>
                  
                  {listing.google_maps_link && (
                    <Button 
                      mt={4} 
                      colorScheme="brand" 
                      size="sm" 
                      leftIcon={<FiMapPin />}
                      as="a" 
                      href={listing.google_maps_link} 
                      target="_blank"
                    >
                      Open in Google Maps
                    </Button>
                  )}
                </Box>
              </TabPanel>
              
              <TabPanel>
                {/* History Tab */}
                <VStack align="stretch" spacing={4}>
                  <Box p={4} borderRadius="md" border="1px" borderColor="gray.200">
                    <Flex align="center">
                      <Box mr={3} color="blue.500"><FiCalendar /></Box>
                      <Box>
                        <Text fontWeight="medium">Listing Created</Text>
                        <Text fontSize="sm" color="gray.500">
                          {listing.created_time} by {listing.created_by}
                        </Text>
                      </Box>
                    </Flex>
                  </Box>
                  
                  <Box p={4} borderRadius="md" border="1px" borderColor="gray.200">
                    <Flex align="center">
                      <Box mr={3} color="purple.500"><FiUser /></Box>
                      <Box>
                        <Text fontWeight="medium">Assigned to Agent</Text>
                        <Text fontSize="sm" color="gray.500">
                          {listing.created_time} - Assigned to {listing.assigned_to}
                        </Text>
                      </Box>
                    </Flex>
                  </Box>
                  
                  {listing.marketing_status === 'ขายแล้ว' && (
                    <Box p={4} borderRadius="md" border="1px" borderColor="gray.200">
                      <Flex align="center">
                        <Box mr={3} color="green.500"><FiBriefcase /></Box>
                        <Box>
                          <Text fontWeight="medium">Property Sold</Text>
                          <Text fontSize="sm" color="gray.500">
                            {new Date(new Date(listing.created_time).getTime() + (Math.random() * 5000000000)).toISOString().split('T')[0]}
                          </Text>
                        </Box>
                      </Flex>
                    </Box>
                  )}
                </VStack>
              </TabPanel>
              
              <TabPanel>
                {/* Matching Tags Tab */}
                <Box>
                  <Text fontWeight="semibold" mb={4}>Matching Property Tags</Text>
                  
                  <Flex flexWrap="wrap" gap={2} mb={6}>
                    {/* Sample tags */}
                    {(listing.property_type === 'Condo' ? [
                      'ห้องมุม', 
                      'เฟอร์นิเจอร์ครบชุด', 
                      'วิวสวย', 
                      'ใกล้ BTS', 
                      'พร้อมอยู่'
                    ] : listing.property_type === 'House' ? [
                      'มีสระว่ายน้ำส่วนตัว', 
                      'เฟอร์นิเจอร์ครบชุด', 
                      'สวนสวย', 
                      'บ้านใหม่', 
                      'ที่ดินแปลงใหญ่'
                    ] : listing.property_type === 'Penthouse' ? [
                      'ลิฟต์ส่วนตัว', 
                      'วิวโล่ง', 
                      'เพดานสูง', 
                      'เฟอร์นิเจอร์ครบชุด', 
                      'มีสระว่ายน้ำ'
                    ] : [
                      'ทำเลดี', 
                      'ใกล้ถนนใหญ่', 
                      'เหมาะทำธุรกิจ'
                    ]).map((tag, idx) => (
                      <Tag key={idx} size="md" colorScheme="brand" variant="solid" px={3} py={1.5}>
                        {tag}
                      </Tag>
                    ))}
                  </Flex>
                  
                  <Text fontSize="sm" color="gray.500" mt={2}>
                    Tags are automatically generated based on property features and location to help match with potential buyers.
                  </Text>
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

const ListingsTable = ({ 
  canEdit = false, 
  myListingsOnly = false, 
  title = "All Listings", 
  hideAgentColumn = false,
  focusOnly = false,
}) => {
  const [selectedListing, setSelectedListing] = useState(null);
  const [listings, setListings] = useState(sampleListings);
  const [filteredListings, setFilteredListings] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { 
    isOpen: isFormOpen, 
    onOpen: onFormOpen, 
    onClose: onFormClose 
  } = useDisclosure();
  
  // Toggle owner focus for a listing
  const handleToggleOwnerFocus = (listingId) => {
    setListings(prevListings => 
      prevListings.map(listing => 
        listing.listing_id === listingId 
          ? { ...listing, owner_focus: !listing.owner_focus } 
          : listing
      )
    );
    
    // If in drawer view, update the selected listing too
    if (selectedListing && selectedListing.listing_id === listingId) {
      setSelectedListing(prev => ({ ...prev, owner_focus: !prev.owner_focus }));
    }
  };
  
  const handleSearch = (filters) => {
    // Filter listings based on all the advanced filters
    let filtered = listings
      .filter(listing => !myListingsOnly || listing.assigned_to === 'Agent A') // For "My Listings" view
      .filter(listing => !focusOnly || listing.owner_focus); // For "Owner Focus" view
    
    // Apply text search
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(listing => 
        listing.listing_name.toLowerCase().includes(searchLower) ||
        listing.listing_code.toLowerCase().includes(searchLower) ||
        listing.zone_name.toLowerCase().includes(searchLower) ||
        (listing.street && listing.street.toLowerCase().includes(searchLower))
      );
    }
    
    // Apply status filter
    if (filters.statusFilter) {
      filtered = filtered.filter(listing => listing.listing_status === filters.statusFilter);
    }
    
    // Apply listing type filter
    if (filters.selectedListingTypes && filters.selectedListingTypes.length > 0) {
      filtered = filtered.filter(listing => 
        filters.selectedListingTypes.includes(listing.listing_type)
      );
    }
    
    // Apply zone filter
    if (filters.selectedZones && filters.selectedZones.length > 0) {
      filtered = filtered.filter(listing => 
        filters.selectedZones.includes(listing.zone_name)
      );
    }
    
    // Apply price range filter
    if (filters.priceRange) {
      const [minPrice, maxPrice] = filters.priceRange;
      filtered = filtered.filter(listing => 
        !listing.asking_price || (listing.asking_price >= minPrice && listing.asking_price <= maxPrice)
      );
    }
    
    // Apply rental price range filter
    if (filters.rentalPriceRange) {
      const [minRent, maxRent] = filters.rentalPriceRange;
      filtered = filtered.filter(listing => 
        !listing.rental_price || (listing.rental_price >= minRent && listing.rental_price <= maxRent)
      );
    }
    
    // Apply agent filter
    if (filters.selectedAgents && filters.selectedAgents.length > 0) {
      filtered = filtered.filter(listing => 
        filters.selectedAgents.includes(listing.assigned_to)
      );
    }
    
    // Apply property type filter
    if (filters.selectedPropertyTypes && filters.selectedPropertyTypes.length > 0) {
      filtered = filtered.filter(listing => 
        filters.selectedPropertyTypes.includes(listing.property_type)
      );
    }
    
    // Apply project location filter
    if (filters.isProjectType !== undefined) {
      filtered = filtered.filter(listing => 
        (filters.isProjectType && listing.project_location === 'ในโครงการ') || 
        (!filters.isProjectType && listing.project_location === 'นอกโครงการ')
      );
    }
    
    // Apply land size filter
    if (filters.landSizeRange) {
      const [minLand, maxLand] = filters.landSizeRange;
      const hasSomeValue = (listing) => listing.ไร่ > 0 || listing.งาน > 0 || listing.วา > 0;
      
      filtered = filtered.filter(listing => {
        // Skip this filter for condos
        if (listing.property_type === 'Condo') return true;
        
        // Convert to standardized rai unit for comparison
        // 1 rai = 4 ngan, 1 ngan = 100 sq wah
        const totalRai = (listing.ไร่ || 0) + (listing.งาน || 0) / 4 + (listing.วา || 0) / 400;
        return !hasSomeValue(listing) || (totalRai >= minLand && totalRai <= maxLand);
      });
    }
    
    // Apply size filter (sqm)
    if (filters.sizeRange) {
      const [minSize, maxSize] = filters.sizeRange;
      filtered = filtered.filter(listing => 
        !listing.พื้นที่ใช้สอย || (listing.พื้นที่ใช้สอย >= minSize && listing.พื้นที่ใช้สอย <= maxSize)
      );
    }
    
    // Apply floor count filter
    if (filters.floorCountRange) {
      const [minFloors, maxFloors] = filters.floorCountRange;
      filtered = filtered.filter(listing => 
        !listing.จำนวนชั้น || (listing.จำนวนชั้น >= minFloors && listing.จำนวนชั้น <= maxFloors)
      );
    }
    
    // Apply floor number filter
    if (filters.floorNumberRange) {
      const [minFloorNum, maxFloorNum] = filters.floorNumberRange;
      filtered = filtered.filter(listing => {
        // Skip for non-condo/non-penthouse properties
        if (!['Condo', 'Penthouse'].includes(listing.property_type)) return true;
        
        // Parse floor number - this handles strings like "15-16" or "12A"
        const floorNum = parseInt(listing.อยู่ชั้นที่);
        return isNaN(floorNum) || (floorNum >= minFloorNum && floorNum <= maxFloorNum);
      });
    }
    
    // Apply parking filter
    if (filters.parkingRange) {
      const [minParking, maxParking] = filters.parkingRange;
      filtered = filtered.filter(listing => {
        if (!listing.parking) return true;
        
        // Extract number from strings like "2 cars"
        const parkingMatch = listing.parking.match(/(\d+)/);
        const parkingCount = parkingMatch ? parseInt(parkingMatch[1]) : 0;
        return parkingCount >= minParking && parkingCount <= maxParking;
      });
    }
    
    // Apply direction filter
    if (filters.selectedDirections && filters.selectedDirections.length > 0) {
      filtered = filtered.filter(listing => 
        !listing.direction || filters.selectedDirections.includes(listing.direction)
      );
    }
    
    // Apply view filter
    if (filters.selectedViews && filters.selectedViews.length > 0) {
      filtered = filtered.filter(listing => 
        !listing.view || filters.selectedViews.includes(listing.view)
      );
    }
    
    // Apply transit filters
    if (filters.transit) {
      // BTS filter
      if (filters.transit.bts && filters.transit.bts.length > 0) {
        filtered = filtered.filter(listing => {
          if (!listing.bts || listing.bts === 'N/A') return false;
          
          return filters.transit.bts.some(station => 
            listing.bts.includes(station)
          );
        });
      }
      
      // MRT filter
      if (filters.transit.mrt && filters.transit.mrt.length > 0) {
        filtered = filtered.filter(listing => {
          if (!listing.mrt || listing.mrt === 'N/A') return false;
          
          return filters.transit.mrt.some(station => 
            listing.mrt.includes(station)
          );
        });
      }
      
      // ARL filter
      if (filters.transit.arl && filters.transit.arl.length > 0) {
        filtered = filtered.filter(listing => {
          if (!listing.arl || listing.arl === 'N/A') return false;
          
          return filters.transit.arl.some(station => 
            listing.arl.includes(station)
          );
        });
      }
    }
    
    // Apply tags filter (simplified implementation as we don't have actual tags data)
    if (filters.selectedTags && filters.selectedTags.length > 0) {
      filtered = filtered.filter(listing => {
        // This is a simplified implementation without real tag data
        // In real app, you'd check against listing.tags array
        
        // Let's assume some logic based on property characteristics
        const simulatedTags = [];
        
        if (listing.property_type === 'Condo') {
          simulatedTags.push('ห้องมุม', 'เฟอร์นิเจอร์ครบชุด', 'ใกล้ BTS');
        }
        
        if (listing.property_type === 'House') {
          simulatedTags.push('สวนสวย', 'ที่ดินแปลงใหญ่', 'บ้านใหม่');
        }
        
        if (listing.view === 'River') {
          simulatedTags.push('วิวสวย', 'วิวโล่ง');
        }
        
        if (listing.view === 'Garden') {
          simulatedTags.push('วิวสวย', 'พร้อมอยู่');
        }
        
        if (parseInt(listing.parking) > 2) {
          simulatedTags.push('ที่จอดรถกว้าง');
        }
        
        return filters.selectedTags.some(tag => simulatedTags.includes(tag));
      });
    }
    
    setFilteredListings(filtered);
  };
  
  // Initialize filtered listings
  React.useEffect(() => {
    // Initial filter to respect myListingsOnly and focusOnly
    const initialFiltered = listings
      .filter(listing => !myListingsOnly || listing.assigned_to === 'Agent A')
      .filter(listing => !focusOnly || listing.owner_focus);
    
    setFilteredListings(initialFiltered);
  }, [listings, myListingsOnly, focusOnly]);
  
  const handleRowClick = (listing) => {
    setSelectedListing(listing);
    onOpen();
  };
  
  return (
    <Box>
      <Flex justify="space-between" align="center" mb={4}>
        <Text fontSize="2xl" fontWeight="bold">{title}</Text>
        {canEdit && (
          <Button leftIcon={<FiEdit />} colorScheme="brand" onClick={onFormOpen}>
            Add New Listing
          </Button>
        )}
      </Flex>
      
      {/* Advanced Search Filters */}
      <AdvancedSearchFilters 
        onSearch={handleSearch} 
        showAgentFilter={!myListingsOnly && !hideAgentColumn}
      />
      
      {/* Display count of results above the table */}
      <Flex justify="space-between" align="center" mb={3}>
        <Text fontSize="sm" color="gray.600">
          {filteredListings.length} {filteredListings.length === 1 ? 'listing' : 'listings'} found
        </Text>
      </Flex>
      
      {/* Listings Table */}
      <Box overflowX="auto">
        <Table variant="simple">
          <Thead bg="gray.50">
            <Tr>
              {myListingsOnly && <Th>Marketing Status</Th>}
              {(myListingsOnly || focusOnly) && (
                <Th width="60px" textAlign="center">OF</Th>
              )}
              <Th width="80px">Image</Th>
              <Th>Listing</Th>
              <Th>Code</Th>
              <Th>Status</Th>
              <Th>Type</Th>
              <Th>Location</Th>
              <Th isNumeric>Price (฿)</Th>
              {!hideAgentColumn && <Th>Agent</Th>}
              <Th>Market Time</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredListings.length > 0 ? (
              filteredListings.map((listing) => (
                <Tr 
                  key={listing.listing_id}
                  cursor="pointer"
                  _hover={{ bg: 'gray.50' }}
                  transition="background 0.2s"
                >
                  {myListingsOnly && (
                    <Td onClick={() => handleRowClick(listing)}>
                      <Badge
                        colorScheme={
                          listing.marketing_status === 'พร้อมประกาศ' ? 'green' :
                          listing.marketing_status === 'ขายแล้ว' ? 'red' :
                          listing.marketing_status === 'เอาประกาศออก (ถาวร)' ? 'gray' : 'orange'
                        }
                      >
                        {listing.marketing_status}
                      </Badge>
                    </Td>
                  )}
                  {(myListingsOnly || focusOnly) && (
                    <Td textAlign="center" p={0} onClick={(e) => e.stopPropagation()}>
                      <IconButton
                        aria-label={listing.owner_focus ? "Remove from Owner Focus" : "Add to Owner Focus"}
                        icon={<FiHeart />}
                        variant="ghost"
                        colorScheme={listing.owner_focus ? "red" : "gray"}
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleOwnerFocus(listing.listing_id);
                        }}
                        fill={listing.owner_focus ? "red.500" : "none"}
                      />
                    </Td>
                  )}
                  <Td width="80px" p={2} onClick={() => handleRowClick(listing)}>
                    <Box 
                      width="60px" 
                      height="60px" 
                      borderRadius="md" 
                      overflow="hidden"
                      border="1px solid"
                      borderColor="gray.200"
                    >
                      <PropertyImage
                        propertyType={listing.property_type}
                        propertyId={listing.listing_id}
                        alt={listing.listing_name}
                        objectFit="cover"
                        width="100%"
                        height="100%"
                      />
                    </Box>
                  </Td>
                  <Td onClick={() => handleRowClick(listing)}>
                    <Box>
                      <Text fontWeight="medium">{listing.listing_name}</Text>
                    </Box>
                  </Td>
                  <Td onClick={() => handleRowClick(listing)}>
                    <Text fontSize="sm" color="gray.500">{listing.listing_code}</Text>
                  </Td>
                  <Td onClick={() => handleRowClick(listing)}>
                    <Badge
                      colorScheme={
                        listing.listing_status === 'For Sale' ? 'blue' :
                        listing.listing_status === 'For Rent' ? 'green' : 'purple'
                      }
                    >
                      {listing.listing_status}
                    </Badge>
                  </Td>
                  <Td onClick={() => handleRowClick(listing)}>{listing.property_type}</Td>
                  <Td onClick={() => handleRowClick(listing)}>{listing.zone_name}</Td>
                  <Td isNumeric onClick={() => handleRowClick(listing)}>
                    {listing.listing_status.includes('Sale') 
                      ? (listing.asking_price?.toLocaleString() || '-')
                      : (listing.rental_price?.toLocaleString() + '/mo' || '-')}
                  </Td>
                  {!hideAgentColumn && <Td onClick={() => handleRowClick(listing)}>{listing.assigned_to}</Td>}
                  <Td onClick={() => handleRowClick(listing)}>{listing.months_on_sale} months</Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan={
                  (hideAgentColumn ? 8 : 9) + 
                  (myListingsOnly ? 1 : 0) + 
                  ((myListingsOnly || focusOnly) ? 1 : 0)
                } textAlign="center" py={10}>
                  <Text color="gray.500">No listings found</Text>
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </Box>
      
      {/* Detail Drawer */}
      <ListingDrawer
        isOpen={isOpen}
        onClose={onClose}
        listing={selectedListing}
        canEdit={canEdit}
        onToggleOwnerFocus={handleToggleOwnerFocus}
      />
      
      {/* Add/Edit Listing Form */}
      <ListingForm 
        isOpen={isFormOpen}
        onClose={onFormClose}
      />
    </Box>
  );
};

export default ListingsTable;