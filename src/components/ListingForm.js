import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  NumberInput,
  NumberInputField,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Textarea,
  useColorModeValue,
  VStack,
  HStack,
  Image,
  IconButton,
  Divider,
} from '@chakra-ui/react';
import { FiUpload, FiX, FiDownload } from 'react-icons/fi';

const ListingForm = ({ isOpen, onClose, listing = null }) => {
  const [activeTab, setActiveTab] = useState(0);
  const tabBg = useColorModeValue('white', 'gray.800');
  const isEditing = !!listing;
  
  // Form state
  const [formData, setFormData] = useState({
    // Basic Information
    listing_name: listing?.listing_name || '',
    listing_code: listing?.listing_code || '',
    auto_generate_code: true,
    property_type: listing?.property_type || 'Condo',
    listing_status: listing?.listing_status || 'For Sale',
    is_project: listing?.is_project || 'ในโครงการ',
    project_name: listing?.project_name || '',
    street_soi: listing?.street_soi || '',
    
    // Owner Information
    selected_owner: listing?.selected_owner || null,
    owner_name: listing?.owner_name || '',
    owner_phone: listing?.owner_phone || '',
    owner_email: listing?.owner_email || '',
    available_showing: {
      days: listing?.available_showing?.days || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      time_start: listing?.available_showing?.time_start || '09:00',
      time_end: listing?.available_showing?.time_end || '18:00',
    },
    
    // Property Details
    bedrooms: listing?.bedrooms || '',
    bathrooms: listing?.bathrooms || '',
    area_sqm: listing?.area_sqm || '',
    floor: listing?.floor || '',
    unit_no: listing?.unit_no || '',
    features: listing?.features || [],
    description: listing?.description || '',
    
    // Location
    zone_name: listing?.zone_name || 'Sukhumvit',
    building_name: listing?.building_name || '',
    latitude: listing?.latitude || '',
    longitude: listing?.longitude || '',
    bts_station: listing?.bts_station || 'Asoke',
    bts_distance: listing?.bts_distance || '',
    mrt_station: listing?.mrt_station || 'Sukhumvit',
    mrt_distance: listing?.mrt_distance || '',
    arl_station: listing?.arl_station || 'None',
    arl_distance: listing?.arl_distance || '',
    location_tags: listing?.location_tags || [],
    custom_location_tag: listing?.custom_location_tag || '',
    
    // Pricing & Marketing
    asking_price: listing?.asking_price || '',
    rental_price: listing?.rental_price || '',
    net_price: listing?.net_price || '',
    marketing_headline: listing?.marketing_headline || '',
    marketing_description: listing?.marketing_description || '',
    marketing_status: listing?.marketing_status || 'พร้อมประกาศ',
    investor_tags: listing?.investor_tags || [],
    custom_investor_tag: listing?.custom_investor_tag || '',
    remark: listing?.remark || '',
    
    // Media
    photos: listing?.photos || [],
    floor_plans: listing?.floor_plans || [],
    main_image_index: listing?.main_image_index || 0,
    virtual_tour_link: listing?.virtual_tour_link || '',
  });
  
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleNestedInputChange = (parent, field, value) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value
      }
    }));
  };
  
  const handleSave = () => {
    // Here you would normally save the data to your backend
    console.log('Saving form data:', formData);
    onClose();
  };
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent maxH="90vh">
        <ModalHeader borderBottomWidth="1px">
          {isEditing ? 'Edit Listing' : 'Add New Listing'}
        </ModalHeader>
        <ModalCloseButton />
        
        <ModalBody p={0}>
          <Tabs 
            index={activeTab} 
            onChange={setActiveTab}
            colorScheme="brand"
            h="100%"
          >
            <TabList bg={tabBg} position="sticky" top={0} zIndex={1} px={4}>
              <Tab>Basic Information</Tab>
              <Tab>Property Details</Tab>
              <Tab>Location</Tab>
              <Tab>Media</Tab>
              <Tab>Pricing & Marketing</Tab>
              <Tab>A & Exclusive</Tab>
            </TabList>
            
            <TabPanels>
              {/* Basic Information Tab */}
              <TabPanel>
                <Box p={4} maxW="800px" mx="auto">
                  <Heading size="md" mb={6}>Basic Information</Heading>
                  
                  {/* Top Section */}
                  <Grid templateColumns="140px 1fr" gap={4} mb={6}>
                    <FormLabel htmlFor="listing_name" mb={0}>Listing Name*:</FormLabel>
                    <FormControl>
                      <Input 
                        id="listing_name"
                        value={formData.listing_name}
                        onChange={(e) => handleInputChange('listing_name', e.target.value)}
                        placeholder="Auto-generated"
                      />
                    </FormControl>
                  </Grid>
                  
                  <Divider my={6} />
                  
                  {/* Project Type Selection */}
                  <Box mb={6}>
                    <Flex 
                      borderWidth="1px" 
                      borderRadius="md" 
                      overflow="hidden"
                    >
                      <Button 
                        flex={1} 
                        py={3}
                        colorScheme={formData.is_project === 'ในโครงการ' ? 'brand' : 'gray'}
                        variant={formData.is_project === 'ในโครงการ' ? 'solid' : 'outline'}
                        borderRadius={0}
                        onClick={() => handleInputChange('is_project', 'ในโครงการ')}
                        leftIcon={formData.is_project === 'ในโครงการ' ? <Box as="span" mr={1}>✓</Box> : null}
                      >
                        ในโครงการ
                      </Button>
                      <Button 
                        flex={1} 
                        py={3}
                        colorScheme={formData.is_project === 'นอกโครงการ' ? 'brand' : 'gray'}
                        variant={formData.is_project === 'นอกโครงการ' ? 'solid' : 'outline'}
                        borderRadius={0}
                        onClick={() => handleInputChange('is_project', 'นอกโครงการ')}
                        leftIcon={formData.is_project === 'นอกโครงการ' ? <Box as="span" mr={1}>✓</Box> : null}
                      >
                        นอกโครงการ
                      </Button>
                    </Flex>
                  </Box>
                  
                  {/* Mid Section */}
                  <Grid templateColumns="repeat(2, 1fr)" gap={4} mb={6}>
                    <FormControl>
                      <Select
                        id="listing_status"
                        value={formData.listing_status}
                        onChange={(e) => handleInputChange('listing_status', e.target.value)}
                      >
                        <option value="For Sale">For Sale</option>
                        <option value="For Rent">For Rent</option>
                        <option value="For Sale & Rent">For Sale & Rent</option>
                        <option value="ขายพร้อมผู้เช่า">ขายพร้อมผู้เช่า</option>
                        <option value="ขายดาวน์">ขายดาวน์</option>
                      </Select>
                    </FormControl>
                    
                    <FormControl>
                      <Select
                        id="property_type"
                        value={formData.property_type}
                        onChange={(e) => handleInputChange('property_type', e.target.value)}
                      >
                        <option value="Condo">Condo</option>
                        <option value="House">House</option>
                        <option value="Townhouse">Townhouse</option>
                        <option value="Land">Land</option>
                        <option value="Commercial">Commercial</option>
                      </Select>
                    </FormControl>
                  </Grid>
                  
                  {formData.is_project === 'ในโครงการ' && (
                    <FormControl mb={6}>
                      <Box position="relative">
                        <Flex align="center">
                          <Select 
                            placeholder="Select Project"
                            value={formData.project_name}
                            onChange={(e) => handleInputChange('project_name', e.target.value)}
                            w="100%"
                          >
                            <option value="The Reserve Sathorn">The Reserve Sathorn</option>
                            <option value="Noble Recole">Noble Recole</option>
                            <option value="Noble Around 33">Noble Around 33</option>
                            <option value="Ashton Asoke">Ashton Asoke</option>
                            <option value="The Line Asoke-Ratchada">The Line Asoke-Ratchada</option>
                          </Select>
                          <Button ml={2} size="sm" colorScheme="blue" variant="outline">
                            + Add
                          </Button>
                        </Flex>
                        <Text fontSize="sm" color="gray.500" mt={1}>You can search for existing projects or add a new one</Text>
                      </Box>
                    </FormControl>
                  )}
                  
                  {formData.is_project === 'นอกโครงการ' && (
                    <FormControl mb={6}>
                      <Input 
                        id="street_soi"
                        value={formData.street_soi}
                        onChange={(e) => handleInputChange('street_soi', e.target.value)}
                        placeholder="Type in Street/Soi"
                      />
                    </FormControl>
                  )}
                  
                  <Divider my={6} />
                  
                  {/* Owner Information Section */}
                  <Box mb={6}>
                    <Heading size="md" mb={4}>Owner Information</Heading>
                    
                    <VStack align="start" spacing={3} mb={6}>
                      <Select 
                        placeholder="Select Owner"
                        value={formData.selected_owner}
                        onChange={(e) => {
                          handleInputChange('selected_owner', e.target.value);
                          // In a real app, you would fetch owner details here
                        }}
                        w="100%"
                        maxW="300px"
                      >
                        <option value="owner1">John Doe</option>
                        <option value="owner2">Jane Smith</option>
                        <option value="owner3">Bob Johnson</option>
                      </Select>
                      <Button variant="outline" colorScheme="blue" size="sm">+ Add New Owner</Button>
                    </VStack>
                    
                    {formData.selected_owner && (
                      <Box borderWidth="1px" borderRadius="md" p={4} mb={6}>
                        <Grid templateColumns="120px 1fr" gap={4} mb={4}>
                          <FormLabel htmlFor="owner_name" mb={0}>Owner Name:</FormLabel>
                          <FormControl>
                            <Input 
                              id="owner_name"
                              value={formData.owner_name}
                              isReadOnly={true}
                              placeholder="Auto-filled"
                              onChange={(e) => handleInputChange('owner_name', e.target.value)}
                            />
                          </FormControl>
                        </Grid>
                        
                        <Grid templateColumns="120px 1fr" gap={4} mb={4}>
                          <FormLabel htmlFor="owner_phone" mb={0}>Phone:</FormLabel>
                          <FormControl>
                            <Input 
                              id="owner_phone"
                              value={formData.owner_phone}
                              isReadOnly={true}
                              placeholder="Auto-filled"
                              onChange={(e) => handleInputChange('owner_phone', e.target.value)}
                            />
                          </FormControl>
                        </Grid>
                        
                        <Box mt={4}>
                          <FormLabel mb={2}>Available For Showing:</FormLabel>
                          <Grid templateColumns="repeat(7, auto)" gap={3} mb={4} pl={4}>
                            <Checkbox 
                              isChecked={formData.available_showing.days.includes('Mon')}
                              onChange={(e) => {
                                const days = e.target.checked 
                                  ? [...formData.available_showing.days, 'Mon']
                                  : formData.available_showing.days.filter(d => d !== 'Mon');
                                handleNestedInputChange('available_showing', 'days', days);
                              }}
                            >
                              Mon
                            </Checkbox>
                            <Checkbox 
                              isChecked={formData.available_showing.days.includes('Tue')}
                              onChange={(e) => {
                                const days = e.target.checked 
                                  ? [...formData.available_showing.days, 'Tue']
                                  : formData.available_showing.days.filter(d => d !== 'Tue');
                                handleNestedInputChange('available_showing', 'days', days);
                              }}
                            >
                              Tue
                            </Checkbox>
                            <Checkbox 
                              isChecked={formData.available_showing.days.includes('Wed')}
                              onChange={(e) => {
                                const days = e.target.checked 
                                  ? [...formData.available_showing.days, 'Wed']
                                  : formData.available_showing.days.filter(d => d !== 'Wed');
                                handleNestedInputChange('available_showing', 'days', days);
                              }}
                            >
                              Wed
                            </Checkbox>
                            <Checkbox 
                              isChecked={formData.available_showing.days.includes('Thu')}
                              onChange={(e) => {
                                const days = e.target.checked 
                                  ? [...formData.available_showing.days, 'Thu']
                                  : formData.available_showing.days.filter(d => d !== 'Thu');
                                handleNestedInputChange('available_showing', 'days', days);
                              }}
                            >
                              Thu
                            </Checkbox>
                            <Checkbox 
                              isChecked={formData.available_showing.days.includes('Fri')}
                              onChange={(e) => {
                                const days = e.target.checked 
                                  ? [...formData.available_showing.days, 'Fri']
                                  : formData.available_showing.days.filter(d => d !== 'Fri');
                                handleNestedInputChange('available_showing', 'days', days);
                              }}
                            >
                              Fri
                            </Checkbox>
                            <Checkbox 
                              isChecked={formData.available_showing.days.includes('Sat')}
                              onChange={(e) => {
                                const days = e.target.checked 
                                  ? [...formData.available_showing.days, 'Sat']
                                  : formData.available_showing.days.filter(d => d !== 'Sat');
                                handleNestedInputChange('available_showing', 'days', days);
                              }}
                            >
                              Sat
                            </Checkbox>
                            <Checkbox 
                              isChecked={formData.available_showing.days.includes('Sun')}
                              onChange={(e) => {
                                const days = e.target.checked 
                                  ? [...formData.available_showing.days, 'Sun']
                                  : formData.available_showing.days.filter(d => d !== 'Sun');
                                handleNestedInputChange('available_showing', 'days', days);
                              }}
                            >
                              Sun
                            </Checkbox>
                          </Grid>
                          
                          <Flex align="center" pl={4}>
                            <Text mr={2}>From</Text>
                            <Select 
                              value={formData.available_showing.time_start}
                              onChange={(e) => handleNestedInputChange('available_showing', 'time_start', e.target.value)}
                              w="120px"
                            >
                              <option value="08:00">8:00 AM</option>
                              <option value="09:00">9:00 AM</option>
                              <option value="10:00">10:00 AM</option>
                              <option value="11:00">11:00 AM</option>
                              <option value="12:00">12:00 PM</option>
                              <option value="13:00">1:00 PM</option>
                              <option value="14:00">2:00 PM</option>
                            </Select>
                            <Text mx={2}>To</Text>
                            <Select 
                              value={formData.available_showing.time_end}
                              onChange={(e) => handleNestedInputChange('available_showing', 'time_end', e.target.value)}
                              w="120px"
                            >
                              <option value="16:00">4:00 PM</option>
                              <option value="17:00">5:00 PM</option>
                              <option value="18:00">6:00 PM</option>
                              <option value="19:00">7:00 PM</option>
                              <option value="20:00">8:00 PM</option>
                            </Select>
                          </Flex>
                        </Box>
                      </Box>
                    )}
                  </Box>
                </Box>
              </TabPanel>
              
              {/* Property Details Tab */}
              <TabPanel>
                <Box p={4} maxW="800px" mx="auto">
                  <Heading size="md" mb={6}>Property Details</Heading>
                  
                  <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                    {/* Size Section */}
                    <Box borderWidth="1px" borderRadius="md" p={4}>
                      <Heading size="sm" mb={4} textAlign="center">Size</Heading>
                      
                      {formData.property_type === 'Condo' && (
                        <FormControl mb={4}>
                          <Grid templateColumns="120px 1fr" gap={2} alignItems="center">
                            <FormLabel mb={0}>Usable Area:</FormLabel>
                            <InputGroup>
                              <Input 
                                value={formData.area_sqm}
                                onChange={(e) => handleInputChange('area_sqm', e.target.value)}
                                placeholder="0"
                              />
                              <InputLeftAddon children="sqm" />
                            </InputGroup>
                          </Grid>
                        </FormControl>
                      )}
                      
                      {(formData.property_type === 'House' || formData.property_type === 'Townhouse' || formData.property_type === 'Land') && (
                        <>
                          <FormControl mb={4}>
                            <FormLabel mb={2}>Land Size:</FormLabel>
                            <Grid templateColumns="repeat(3, 1fr)" gap={2} alignItems="center">
                              <Box>
                                <Text textAlign="center" fontSize="sm" mb={1}>ไร่</Text>
                                <Input 
                                  value={formData.land_size_rai || ""}
                                  onChange={(e) => handleInputChange('land_size_rai', e.target.value)}
                                  placeholder="0"
                                />
                              </Box>
                              <Box>
                                <Text textAlign="center" fontSize="sm" mb={1}>งาน</Text>
                                <Input 
                                  value={formData.land_size_ngan || ""}
                                  onChange={(e) => handleInputChange('land_size_ngan', e.target.value)}
                                  placeholder="0"
                                />
                              </Box>
                              <Box>
                                <Text textAlign="center" fontSize="sm" mb={1}>วา</Text>
                                <Input 
                                  value={formData.land_size_sqwa || ""}
                                  onChange={(e) => handleInputChange('land_size_sqwa', e.target.value)}
                                  placeholder="0"
                                />
                              </Box>
                            </Grid>
                          </FormControl>
                          
                          <FormControl mb={4}>
                            <Grid templateColumns="120px 1fr" gap={2} alignItems="center">
                              <FormLabel mb={0}>Usable Area:</FormLabel>
                              <InputGroup>
                                <Input 
                                  value={formData.area_sqm}
                                  onChange={(e) => handleInputChange('area_sqm', e.target.value)}
                                  placeholder="0"
                                />
                                <InputLeftAddon children="sqm" />
                              </InputGroup>
                            </Grid>
                          </FormControl>
                        </>
                      )}
                      
                      <FormControl mb={4}>
                        <Grid templateColumns="120px 1fr" gap={2} alignItems="center">
                          <FormLabel mb={0}>Year Built:</FormLabel>
                          <Input 
                            value={formData.year_built || ""}
                            onChange={(e) => handleInputChange('year_built', e.target.value)}
                            placeholder="e.g. 2023"
                          />
                        </Grid>
                      </FormControl>
                      
                      <FormControl mb={4}>
                        <Grid templateColumns="120px 1fr" gap={2} alignItems="center">
                          <FormLabel mb={0}>No. of Floors:</FormLabel>
                          <Input 
                            value={formData.floors || ""}
                            onChange={(e) => handleInputChange('floors', e.target.value)}
                            placeholder="0"
                          />
                        </Grid>
                      </FormControl>
                      
                      <FormControl mb={4}>
                        <Grid templateColumns="120px 1fr" gap={2} alignItems="center">
                          <FormLabel mb={0}>Floor Number:</FormLabel>
                          <Input 
                            value={formData.floor}
                            onChange={(e) => handleInputChange('floor', e.target.value)}
                            placeholder="0"
                          />
                        </Grid>
                      </FormControl>
                    </Box>
                    
                    {/* Features Section */}
                    <Box borderWidth="1px" borderRadius="md" p={4}>
                      <Heading size="sm" mb={4} textAlign="center">Features</Heading>
                      
                      <FormControl mb={4}>
                        <Grid templateColumns="120px 1fr" gap={2} alignItems="center">
                          <FormLabel mb={0}>Bedrooms:</FormLabel>
                          <Input 
                            value={formData.bedrooms}
                            onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                            placeholder="0"
                            type="number"
                            min="0"
                          />
                        </Grid>
                      </FormControl>
                      
                      <FormControl mb={4}>
                        <Grid templateColumns="120px 1fr" gap={2} alignItems="center">
                          <FormLabel mb={0}>Bathrooms:</FormLabel>
                          <Input 
                            value={formData.bathrooms}
                            onChange={(e) => handleInputChange('bathrooms', e.target.value)}
                            placeholder="0"
                            type="number"
                            min="0"
                          />
                        </Grid>
                      </FormControl>
                      
                      <FormControl mb={4}>
                        <Grid templateColumns="120px 1fr" gap={2} alignItems="center">
                          <FormLabel mb={0}>Utilities Room:</FormLabel>
                          <Input 
                            value={formData.maid_room || ""}
                            onChange={(e) => handleInputChange('maid_room', e.target.value)}
                            placeholder="0"
                            type="number"
                            min="0"
                          />
                        </Grid>
                      </FormControl>
                      
                      <FormControl mb={4}>
                        <Grid templateColumns="120px 1fr" gap={2} alignItems="center">
                          <FormLabel mb={0}>Parking:</FormLabel>
                          <Input 
                            value={formData.parking || ""}
                            onChange={(e) => handleInputChange('parking', e.target.value)}
                            placeholder="0"
                            type="number"
                            min="0"
                          />
                        </Grid>
                      </FormControl>
                      
                      <FormControl mb={4}>
                        <Grid templateColumns="120px 1fr" gap={2} alignItems="center">
                          <FormLabel mb={0}>Direction:</FormLabel>
                          <Select
                            value={formData.direction || "North"}
                            onChange={(e) => handleInputChange('direction', e.target.value)}
                          >
                            <option value="North">North</option>
                            <option value="East">East</option>
                            <option value="South">South</option>
                            <option value="West">West</option>
                            <option value="Northeast">Northeast</option>
                            <option value="Northwest">Northwest</option>
                            <option value="Southeast">Southeast</option>
                            <option value="Southwest">Southwest</option>
                          </Select>
                        </Grid>
                      </FormControl>
                      
                      <FormControl mb={4}>
                        <Grid templateColumns="120px 1fr" gap={2} alignItems="center">
                          <FormLabel mb={0}>View:</FormLabel>
                          <Select
                            value={formData.view || "City"}
                            onChange={(e) => handleInputChange('view', e.target.value)}
                          >
                            <option value="City">City</option>
                            <option value="Garden">Garden</option>
                            <option value="Pool">Pool</option>
                            <option value="River">River</option>
                            <option value="Sea">Sea</option>
                            <option value="Mountain">Mountain</option>
                          </Select>
                        </Grid>
                      </FormControl>
                      
                      <FormControl mb={4}>
                        <Grid templateColumns="120px 1fr" gap={2} alignItems="center">
                          <FormLabel mb={0}>Unit No.:</FormLabel>
                          <Input 
                            value={formData.unit_no}
                            onChange={(e) => handleInputChange('unit_no', e.target.value)}
                            placeholder="e.g. 1234"
                          />
                        </Grid>
                      </FormControl>
                    </Box>
                  </Grid>
                  
                  <Box mt={6} p={4} borderWidth="1px" borderRadius="md">
                    <Heading size="sm" mb={4}>Furniture & Appliances:</Heading>
                    <Text mb={2} fontSize="sm" color="gray.500">(Matching tags filtered by "furniture")</Text>
                    
                    <Flex align="center" mb={4}>
                      <Select 
                        placeholder="Select furniture/appliance"
                        onChange={(e) => {
                          if (!e.target.value) return;
                          const current = formData.furnishings || [];
                          if (!current.includes(e.target.value)) {
                            handleInputChange('furnishings', [...current, e.target.value]);
                          }
                          // Reset the select value
                          e.target.value = '';
                        }}
                        maxW="300px"
                      >
                        <option value="Fully Furnished">Fully Furnished</option>
                        <option value="Air Conditioning">Air Conditioning</option>
                        <option value="TV">TV</option>
                        <option value="Refrigerator">Refrigerator</option>
                        <option value="Washing Machine">Washing Machine</option>
                        <option value="Water Heater">Water Heater</option>
                        <option value="Microwave">Microwave</option>
                        <option value="Oven">Oven</option>
                        <option value="Dishwasher">Dishwasher</option>
                        <option value="Dining Table">Dining Table</option>
                      </Select>
                      
                      <Input 
                        placeholder="Custom furniture tag"
                        value={formData.custom_furniture_tag || ""}
                        onChange={(e) => handleInputChange('custom_furniture_tag', e.target.value)}
                        size="sm"
                        ml={2}
                        maxW="200px"
                      />
                      <Button 
                        size="sm" 
                        ml={2} 
                        colorScheme="blue"
                        onClick={() => {
                          if (!formData.custom_furniture_tag) return;
                          const current = formData.furnishings || [];
                          if (!current.includes(formData.custom_furniture_tag)) {
                            handleInputChange('furnishings', [...current, formData.custom_furniture_tag]);
                            handleInputChange('custom_furniture_tag', '');
                          }
                        }}
                      >
                        + Add Custom
                      </Button>
                    </Flex>
                    
                    <Flex flexWrap="wrap" gap={2}>
                      {(formData.furnishings || []).map((item, index) => (
                        <Box 
                          key={index} 
                          bg="gray.100" 
                          px={3} 
                          py={1} 
                          borderRadius="md"
                          display="flex"
                          alignItems="center"
                        >
                          <Text fontSize="sm">{item}</Text>
                          <IconButton
                            icon={<FiX />}
                            size="xs"
                            variant="ghost"
                            ml={1}
                            aria-label={`Remove ${item}`}
                            onClick={() => {
                              const updated = (formData.furnishings || []).filter((_, i) => i !== index);
                              handleInputChange('furnishings', updated);
                            }}
                          />
                        </Box>
                      ))}
                    </Flex>
                  </Box>
                </Box>
              </TabPanel>
              
              {/* Location Tab */}
              <TabPanel>
                <Box p={4} maxW="800px" mx="auto">
                  <Heading size="md" mb={6}>Location</Heading>
                  
                  <FormControl mb={6}>
                    <Grid templateColumns="120px 1fr" gap={2} alignItems="center">
                      <FormLabel mb={0}>Zone*:</FormLabel>
                      <Select
                        value={formData.zone_name || 'Sukhumvit'}
                        onChange={(e) => handleInputChange('zone_name', e.target.value)}
                      >
                        <option value="Sukhumvit">Sukhumvit</option>
                        <option value="Silom">Silom</option>
                        <option value="Sathorn">Sathorn</option>
                        <option value="Riverside">Riverside</option>
                        <option value="Ratchada">Ratchada</option>
                        <option value="Rama9">Rama 9</option>
                        <option value="Phayathai">Phayathai</option>
                      </Select>
                    </Grid>
                  </FormControl>
                  
                  <Box 
                    borderWidth="1px" 
                    borderRadius="md" 
                    height="300px" 
                    mb={6} 
                    position="relative"
                    overflow="hidden"
                  >
                    <Box 
                      position="absolute" 
                      top="50%" 
                      left="50%" 
                      transform="translate(-50%, -50%)"
                      textAlign="center"
                    >
                      <Text fontSize="xl" fontWeight="bold" mb={1}>MAP INTERFACE</Text>
                      <Text fontSize="md" color="gray.500">(Select Location)</Text>
                    </Box>
                  </Box>
                  
                  <Heading size="sm" mb={4}>Transit Options:</Heading>
                  
                  <Grid templateColumns="120px 1fr 120px 1fr" gap={3} mb={3} alignItems="center">
                    <FormLabel mb={0}>BTS Station:</FormLabel>
                    <Flex alignItems="center">
                      <Select
                        value={formData.bts_station || 'Asoke'}
                        onChange={(e) => handleInputChange('bts_station', e.target.value)}
                        mr={2}
                      >
                        <option value="Asoke">Asoke</option>
                        <option value="Nana">Nana</option>
                        <option value="Phrom Phong">Phrom Phong</option>
                        <option value="Thong Lo">Thong Lo</option>
                        <option value="Ekkamai">Ekkamai</option>
                      </Select>
                      <Button size="sm" colorScheme="blue" variant="outline">+ Add Another</Button>
                    </Flex>
                    <FormLabel mb={0}>Distance:</FormLabel>
                    <InputGroup maxW="150px">
                      <Input
                        value={formData.bts_distance || ''}
                        onChange={(e) => handleInputChange('bts_distance', e.target.value)}
                        placeholder="0"
                      />
                      <InputLeftAddon children="m" />
                    </InputGroup>
                  </Grid>
                  
                  <Grid templateColumns="120px 1fr 120px 1fr" gap={3} mb={3} alignItems="center">
                    <FormLabel mb={0}>MRT Station:</FormLabel>
                    <Select
                      value={formData.mrt_station || 'Sukhumvit'}
                      onChange={(e) => handleInputChange('mrt_station', e.target.value)}
                    >
                      <option value="Sukhumvit">Sukhumvit</option>
                      <option value="Queen Sirikit">Queen Sirikit</option>
                      <option value="Petchaburi">Petchaburi</option>
                      <option value="Rama 9">Rama 9</option>
                      <option value="Thailand Cultural Centre">Thailand Cultural Centre</option>
                    </Select>
                    <FormLabel mb={0}>Distance:</FormLabel>
                    <InputGroup maxW="150px">
                      <Input
                        value={formData.mrt_distance || ''}
                        onChange={(e) => handleInputChange('mrt_distance', e.target.value)}
                        placeholder="0"
                      />
                      <InputLeftAddon children="m" />
                    </InputGroup>
                  </Grid>
                  
                  <Grid templateColumns="120px 1fr 120px 1fr" gap={3} mb={6} alignItems="center">
                    <FormLabel mb={0}>ARL Station:</FormLabel>
                    <Select
                      value={formData.arl_station || 'None'}
                      onChange={(e) => handleInputChange('arl_station', e.target.value)}
                    >
                      <option value="None">None</option>
                      <option value="Makkasan">Makkasan</option>
                      <option value="Ratchaprarop">Ratchaprarop</option>
                      <option value="Phaya Thai">Phaya Thai</option>
                    </Select>
                    <FormLabel mb={0}>Distance:</FormLabel>
                    <InputGroup maxW="150px">
                      <Input
                        value={formData.arl_distance || ''}
                        onChange={(e) => handleInputChange('arl_distance', e.target.value)}
                        placeholder="0"
                      />
                      <InputLeftAddon children="m" />
                    </InputGroup>
                  </Grid>
                  
                  <Box borderWidth="1px" borderRadius="md" p={4} mb={6}>
                    <Heading size="sm" mb={4}>Location & Transportation Tags:</Heading>
                    <Text mb={2} fontSize="sm" color="gray.500">(Matching tags filtered by "location & transportation")</Text>
                    
                    <Flex align="center" mb={4}>
                      <Select 
                        placeholder="Select location tag"
                        onChange={(e) => {
                          if (!e.target.value) return;
                          const current = formData.location_tags || [];
                          if (!current.includes(e.target.value)) {
                            handleInputChange('location_tags', [...current, e.target.value]);
                          }
                          // Reset the select value
                          e.target.value = '';
                        }}
                        maxW="300px"
                      >
                        <option value="ใกล้ BTS">ใกล้ BTS</option>
                        <option value="ใกล้ห้างสรรพสินค้า">ใกล้ห้างสรรพสินค้า</option>
                        <option value="ใกล้โรงเรียน">ใกล้โรงเรียน</option>
                        <option value="ใกล้ทางด่วน">ใกล้ทางด่วน</option>
                        <option value="ใกล้สวนสาธารณะ">ใกล้สวนสาธารณะ</option>
                        <option value="ใกล้โรงพยาบาล">ใกล้โรงพยาบาล</option>
                      </Select>
                      
                      <Input 
                        placeholder="Custom location tag"
                        value={formData.custom_location_tag || ""}
                        onChange={(e) => handleInputChange('custom_location_tag', e.target.value)}
                        size="sm"
                        ml={2}
                        maxW="200px"
                      />
                      <Button 
                        size="sm" 
                        ml={2} 
                        colorScheme="blue"
                        onClick={() => {
                          if (!formData.custom_location_tag) return;
                          const current = formData.location_tags || [];
                          if (!current.includes(formData.custom_location_tag)) {
                            handleInputChange('location_tags', [...current, formData.custom_location_tag]);
                            handleInputChange('custom_location_tag', '');
                          }
                        }}
                      >
                        + Add Custom
                      </Button>
                    </Flex>
                    
                    <Flex flexWrap="wrap" gap={2}>
                      {(formData.location_tags || []).map((item, index) => (
                        <Box 
                          key={index} 
                          bg="gray.100" 
                          px={3} 
                          py={1} 
                          borderRadius="md"
                          display="flex"
                          alignItems="center"
                        >
                          <Text fontSize="sm">{item}</Text>
                          <IconButton
                            icon={<FiX />}
                            size="xs"
                            variant="ghost"
                            ml={1}
                            aria-label={`Remove ${item}`}
                            onClick={() => {
                              const updated = (formData.location_tags || []).filter((_, i) => i !== index);
                              handleInputChange('location_tags', updated);
                            }}
                          />
                        </Box>
                      ))}
                    </Flex>
                  </Box>
                </Box>
              </TabPanel>
              
              {/* Media Tab */}
              <TabPanel>
                <Box p={4} maxW="800px" mx="auto">
                  <Heading size="md" mb={6}>Media</Heading>
                  
                  {/* Photos Section */}
                  <Box mb={6}>
                    <Heading size="sm" mb={4}>Photos</Heading>
                    
                    <Grid templateColumns="repeat(5, 1fr)" gap={4} mb={4}>
                      {/* Upload New Image */}
                      <Box 
                        borderWidth="1px" 
                        borderStyle="dashed" 
                        borderRadius="md" 
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        h="150px"
                        cursor="pointer"
                        _hover={{ bg: 'gray.50' }}
                        position="relative"
                      >
                        <Box as="span" fontSize="2xl" mb={2}>+</Box>
                        <Text fontWeight="medium">Upload</Text>
                        <Input 
                          type="file" 
                          position="absolute" 
                          top={0} 
                          left={0} 
                          opacity={0} 
                          w="100%" 
                          h="100%" 
                          cursor="pointer"
                          accept="image/*"
                        />
                      </Box>
                    </Grid>
                    
                    <Text fontSize="sm" color="gray.500" mb={4}>Drag to reorder</Text>
                    
                    <Button 
                      leftIcon={<FiDownload />} 
                      variant="outline" 
                      size="sm"
                    >
                      Download All
                    </Button>
                  </Box>
                  
                  {/* Floor Plan Section */}
                  <Box mb={6}>
                    <Heading size="sm" mb={4}>Floor Plan</Heading>
                    
                    <Grid templateColumns="repeat(5, 1fr)" gap={4} mb={4}>
                      {/* Upload New Floor Plan */}
                      <Box 
                        borderWidth="1px" 
                        borderStyle="dashed" 
                        borderRadius="md" 
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        h="150px"
                        cursor="pointer"
                        _hover={{ bg: 'gray.50' }}
                        position="relative"
                      >
                        <Box as="span" fontSize="2xl" mb={2}>+</Box>
                        <Text fontWeight="medium">Upload</Text>
                        <Input 
                          type="file" 
                          position="absolute" 
                          top={0} 
                          left={0} 
                          opacity={0} 
                          w="100%" 
                          h="100%" 
                          cursor="pointer"
                          accept="image/*"
                        />
                      </Box>
                    </Grid>
                    
                    <Button 
                      leftIcon={<FiDownload />} 
                      variant="outline" 
                      size="sm"
                    >
                      Download All
                    </Button>
                  </Box>
                  
                  {/* Virtual Tour Link */}
                  <Box mb={6}>
                    <FormControl>
                      <Grid templateColumns="150px 1fr" gap={2} alignItems="center">
                        <FormLabel mb={0}>Virtual Tour Link:</FormLabel>
                        <Input
                          value={formData.virtual_tour_link || ''}
                          onChange={(e) => handleInputChange('virtual_tour_link', e.target.value)}
                          placeholder="https://"
                        />
                      </Grid>
                    </FormControl>
                  </Box>
                </Box>
              </TabPanel>
              
              {/* Pricing & Marketing Tab */}
              <TabPanel>
                <Box p={4} maxW="800px" mx="auto">
                  <Heading size="md" mb={6}>Pricing & Marketing</Heading>
                  
                  {/* Pricing Section */}
                  <Box mb={6}>
                    <Heading size="sm" mb={4}>Pricing</Heading>
                    
                    <Box borderWidth="1px" borderRadius="md" p={4}>
                      <Grid templateColumns="150px 1fr" gap={4} mb={3} alignItems="center">
                        <FormLabel htmlFor="asking_price" mb={0}>Asking Price*:</FormLabel>
                        <InputGroup>
                          <InputLeftAddon children="฿" />
                          <Input
                            id="asking_price"
                            value={formData.asking_price}
                            onChange={(e) => handleInputChange('asking_price', e.target.value)}
                            placeholder="0"
                          />
                        </InputGroup>
                      </Grid>
                      
                      <Grid templateColumns="150px 1fr" gap={4} mb={3} alignItems="center">
                        <FormLabel htmlFor="rental_price" mb={0}>Rental Price:</FormLabel>
                        <Flex alignItems="center">
                          <InputGroup>
                            <InputLeftAddon children="฿" />
                            <Input
                              id="rental_price"
                              value={formData.rental_price}
                              onChange={(e) => handleInputChange('rental_price', e.target.value)}
                              placeholder="0"
                            />
                          </InputGroup>
                          <Text ml={2}>per month</Text>
                        </Flex>
                      </Grid>
                      
                      <Grid templateColumns="150px 1fr" gap={4} alignItems="center">
                        <FormLabel htmlFor="net_price" mb={0}>Net Price:</FormLabel>
                        <InputGroup>
                          <InputLeftAddon children="฿" />
                          <Input
                            id="net_price"
                            value={formData.net_price}
                            onChange={(e) => handleInputChange('net_price', e.target.value)}
                            placeholder="0"
                          />
                        </InputGroup>
                      </Grid>
                    </Box>
                  </Box>
                  
                  {/* Marketing Status */}
                  <FormControl mb={6}>
                    <Grid templateColumns="150px 1fr" gap={4} alignItems="center">
                      <FormLabel htmlFor="marketing_status" mb={0}>Marketing Status*:</FormLabel>
                      <Select
                        id="marketing_status"
                        value={formData.marketing_status || 'พร้อมประกาศ'}
                        onChange={(e) => handleInputChange('marketing_status', e.target.value)}
                      >
                        <option value="พร้อมประกาศ">พร้อมประกาศ</option>
                        <option value="เอาประกาศออก (ชั่วคราว)">เอาประกาศออก (ชั่วคราว)</option>
                        <option value="ขายแล้ว">ขายแล้ว</option>
                        <option value="เอาประกาศออก (ถาวร)">เอาประกาศออก (ถาวร)</option>
                      </Select>
                    </Grid>
                  </FormControl>
                  
                  {/* Investor Tags Section */}
                  <Box borderWidth="1px" borderRadius="md" p={4} mb={6}>
                    <Heading size="sm" mb={4}>For Investor Tags:</Heading>
                    <Text mb={2} fontSize="sm" color="gray.500">(Matching tags filtered by "for investor")</Text>
                    
                    <Flex align="center" mb={4}>
                      <Select 
                        placeholder="Select investor tag"
                        onChange={(e) => {
                          if (!e.target.value) return;
                          const current = formData.investor_tags || [];
                          if (!current.includes(e.target.value)) {
                            handleInputChange('investor_tags', [...current, e.target.value]);
                          }
                          // Reset the select value
                          e.target.value = '';
                        }}
                        maxW="300px"
                      >
                        <option value="ผลตอบแทนดี">ผลตอบแทนดี</option>
                        <option value="โครงการใหม่">โครงการใหม่</option>
                        <option value="พร้อมผู้เช่า">พร้อมผู้เช่า</option>
                        <option value="ทำเลศักยภาพ">ทำเลศักยภาพ</option>
                        <option value="ราคาต่ำกว่าตลาด">ราคาต่ำกว่าตลาด</option>
                        <option value="ใกล้รถไฟฟ้า">ใกล้รถไฟฟ้า</option>
                      </Select>
                      
                      <Input 
                        placeholder="Custom investor tag"
                        value={formData.custom_investor_tag || ""}
                        onChange={(e) => handleInputChange('custom_investor_tag', e.target.value)}
                        size="sm"
                        ml={2}
                        maxW="200px"
                      />
                      <Button 
                        size="sm" 
                        ml={2} 
                        colorScheme="blue"
                        onClick={() => {
                          if (!formData.custom_investor_tag) return;
                          const current = formData.investor_tags || [];
                          if (!current.includes(formData.custom_investor_tag)) {
                            handleInputChange('investor_tags', [...current, formData.custom_investor_tag]);
                            handleInputChange('custom_investor_tag', '');
                          }
                        }}
                      >
                        + Add Custom
                      </Button>
                    </Flex>
                    
                    <Flex flexWrap="wrap" gap={2}>
                      {(formData.investor_tags || []).map((item, index) => (
                        <Box 
                          key={index} 
                          bg="gray.100" 
                          px={3} 
                          py={1} 
                          borderRadius="md"
                          display="flex"
                          alignItems="center"
                        >
                          <Text fontSize="sm">{item}</Text>
                          <IconButton
                            icon={<FiX />}
                            size="xs"
                            variant="ghost"
                            ml={1}
                            aria-label={`Remove ${item}`}
                            onClick={() => {
                              const updated = (formData.investor_tags || []).filter((_, i) => i !== index);
                              handleInputChange('investor_tags', updated);
                            }}
                          />
                        </Box>
                      ))}
                    </Flex>
                  </Box>
                  
                  {/* Remark Section */}
                  <Box mb={6}>
                    <FormControl>
                      <Grid templateColumns="150px 1fr" gap={4} alignItems="start">
                        <FormLabel htmlFor="remark" mb={0}>Remark:</FormLabel>
                        <Textarea
                          id="remark"
                          value={formData.remark || ''}
                          onChange={(e) => handleInputChange('remark', e.target.value)}
                          placeholder="Additional notes or remarks"
                          rows={5}
                        />
                      </Grid>
                    </FormControl>
                  </Box>
                </Box>
              </TabPanel>
              
              {/* A & Exclusive Tab */}
              <TabPanel>
                <VStack spacing={6} align="stretch" p={4}>
                  <Box>
                    <Heading size="md" mb={4}>A & Exclusive Settings</Heading>
                    <Text mb={4} color="gray.500">
                      Configure additional settings for A-list and exclusive properties.
                    </Text>
                    {/* Content will be added in future updates */}
                  </Box>
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
        
        <ModalFooter borderTopWidth="1px">
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="brand" onClick={handleSave}>
            {isEditing ? 'Update' : 'Save'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ListingForm; 