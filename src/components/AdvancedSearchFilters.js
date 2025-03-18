import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  HStack,
  InputGroup,
  InputLeftElement,
  Input,
  Select,
  Button,
  Stack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Switch,
  FormControl,
  FormLabel,
  Text,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Checkbox,
  CheckboxGroup,
  Divider,
  Tag,
  TagLabel,
  TagCloseButton,
  Wrap,
  WrapItem,
  Grid,
  GridItem,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Icon,
  IconButton,
  VStack,
} from '@chakra-ui/react';
import { 
  FiSearch, 
  FiFilter, 
  FiArrowLeft, 
  FiArrowRight, 
  FiChevronDown,
  FiX,
  FiCheck,
  FiSliders,
  FiChevronUp,
  FiChevronRight,
} from 'react-icons/fi';

// Sample data
const sampleZones = [
  'Sukhumvit', 'Silom', 'Sathorn', 'Thonglor', 'Asoke', 'Riverside', 'Ratchada', 
  'Bangna', 'Rama 9', 'Phra Khanong', 'Phaya Thai', 'Ari', 'Ekkamai', 'Victory Monument'
];

const samplePropertyTypes = [
  'Condo', 'House', 'Townhouse', 'Land', 'Penthouse', 'Villa', 'Commercial'
];

const sampleViews = [
  'Garden', 'City', 'River', 'Pool', 'Lake', 'Mountain', 'Sea', 'Park'
];

const sampleDirections = [
  'North', 'South', 'East', 'West', 'Northeast', 'Northwest', 'Southeast', 'Southwest'
];

const sampleTags = [
  'ห้องมุม', 'เฟอร์นิเจอร์ครบชุด', 'วิวสวย', 'ใกล้ BTS', 'พร้อมอยู่',
  'มีสระว่ายน้ำส่วนตัว', 'สวนสวย', 'บ้านใหม่', 'ที่ดินแปลงใหญ่',
  'ลิฟต์ส่วนตัว', 'วิวโล่ง', 'เพดานสูง', 'มีสระว่ายน้ำ', 'ใกล้ถนนใหญ่', 'เหมาะทำธุรกิจ'
];

const sampleBTS = [
  'Thonglor', 'Ekkamai', 'Phrom Phong', 'Asoke', 'Nana', 
  'Ploenchit', 'Siam', 'Victory Monument', 'Mo Chit'
];

const sampleMRT = [
  'Sukhumvit', 'Petchaburi', 'Thailand Cultural Centre', 'Huai Khwang', 
  'Sutthisan', 'Ratchadaphisek', 'Lat Phrao', 'Phahon Yothin'
];

const sampleARL = [
  'Phaya Thai', 'Ratchaprarop', 'Makkasan', 'Ramkhamhaeng', 
  'Hua Mak', 'Ban Thap Chang', 'Lat Krabang'
];

const sampleAgents = [
  'Agent A', 'Agent B', 'Agent C', 'Agent D', 'Agent E'
];

const sampleListingTypes = [
  'Normal List', 'A List', 'Exclusive List'
];

const NumberRangeInput = ({ min, max, value, onChange, step = 1, precision = 0, disabled = false }) => {
  const handleMinChange = (valueAsString, valueAsNumber) => {
    onChange([valueAsNumber, value[1]]);
  };

  const handleMaxChange = (valueAsString, valueAsNumber) => {
    onChange([value[0], valueAsNumber]);
  };

  return (
    <HStack spacing={2}>
      <NumberInput 
        size="sm" 
        min={min} 
        max={value[1]} 
        value={value[0]} 
        onChange={handleMinChange}
        step={step}
        precision={precision}
        isDisabled={disabled}
      >
        <NumberInputField placeholder="Min" />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Text>-</Text>
      <NumberInput 
        size="sm" 
        min={value[0]} 
        max={max} 
        value={value[1]} 
        onChange={handleMaxChange}
        step={step}
        precision={precision}
        isDisabled={disabled}
      >
        <NumberInputField placeholder="Max" />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </HStack>
  );
};

const MultiSelectMenu = ({ 
  options, 
  selectedValues, 
  onChange, 
  placeholder = "Select options",
  disabled = false,
  checkboxGroup = true,
  size = "md"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOptions = options.filter(option => 
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleOption = (value) => {
    const newValues = selectedValues.includes(value)
      ? selectedValues.filter(item => item !== value)
      : [...selectedValues, value];
    onChange(newValues);
  };

  const handleCheckboxChange = (values) => {
    onChange(values);
  };

  return (
    <Popover
      isOpen={isOpen}
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
      placement="bottom-start"
      closeOnBlur={true}
      isLazy
      strategy="fixed"
      gutter={2}
    >
      <PopoverTrigger>
        <Button
          rightIcon={<FiChevronDown />}
          size={size}
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          isDisabled={disabled}
          width="full"
          textAlign="left"
          justifyContent="space-between"
        >
          {selectedValues.length === 0 
            ? placeholder 
            : `${selectedValues.length} selected`}
        </Button>
      </PopoverTrigger>
      <PopoverContent width="300px" zIndex={1500}>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>
          <Input
            size="sm"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
        </PopoverHeader>
        <PopoverBody maxH="200px" overflowY="auto">
          {checkboxGroup ? (
            <CheckboxGroup value={selectedValues} onChange={handleCheckboxChange}>
              <Stack spacing={1}>
                {filteredOptions.map((option) => (
                  <Checkbox key={option} value={option}>
                    {option}
                  </Checkbox>
                ))}
              </Stack>
            </CheckboxGroup>
          ) : (
            <Stack spacing={1}>
              {filteredOptions.map((option) => (
                <Box
                  key={option}
                  px={2}
                  py={1}
                  cursor="pointer"
                  _hover={{ bg: 'gray.100' }}
                  onClick={() => handleToggleOption(option)}
                  display="flex"
                  alignItems="center"
                >
                  <Box mr={2} color={selectedValues.includes(option) ? 'blue.500' : 'transparent'}>
                    <FiCheck />
                  </Box>
                  <Text>{option}</Text>
                </Box>
              ))}
            </Stack>
          )}
        </PopoverBody>
        <PopoverFooter>
          <Flex justify="space-between">
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={() => onChange([])}
            >
              Clear All
            </Button>
            <Button 
              size="sm" 
              colorScheme="blue" 
              onClick={() => setIsOpen(false)}
            >
              Apply
            </Button>
          </Flex>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};

const AdvancedSearchFilters = ({ 
  onSearch, 
  showAgentFilter = false,
  initialFilters = {}
}) => {
  // Base filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedZones, setSelectedZones] = useState([]);
  const [selectedListingTypes, setSelectedListingTypes] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100000000]);
  const [rentalPriceRange, setRentalPriceRange] = useState([0, 500000]);
  const [selectedAgents, setSelectedAgents] = useState([]);

  // More Search filters
  const [isProjectType, setIsProjectType] = useState(true); // true = ในโครงการ, false = นอกโครงการ
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState([]);
  const [landSizeRange, setLandSizeRange] = useState([0, 100]);
  const [sizeRange, setSizeRange] = useState([0, 500]);
  const [floorCountRange, setFloorCountRange] = useState([1, 50]);
  const [floorNumberRange, setFloorNumberRange] = useState([1, 100]);
  const [parkingRange, setParkingRange] = useState([0, 10]);
  const [selectedDirections, setSelectedDirections] = useState([]);
  const [selectedViews, setSelectedViews] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  
  // Transit filters
  const [isBTSEnabled, setIsBTSEnabled] = useState(false);
  const [selectedBTS, setSelectedBTS] = useState([]);
  const [isMRTEnabled, setIsMRTEnabled] = useState(false);
  const [selectedMRT, setSelectedMRT] = useState([]);
  const [isARLEnabled, setIsARLEnabled] = useState(false);
  const [selectedARL, setSelectedARL] = useState([]);

  // Active filters count (for More Search button badge)
  const [activeMoreFiltersCount, setActiveMoreFiltersCount] = useState(0);

  // New state for accordion
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    // Count active filters in More Search
    let count = 0;
    if (selectedPropertyTypes.length > 0) count++;
    if (selectedDirections.length > 0) count++;
    if (selectedViews.length > 0) count++;
    if (selectedTags.length > 0) count++;
    if (isBTSEnabled && selectedBTS.length > 0) count++;
    if (isMRTEnabled && selectedMRT.length > 0) count++;
    if (isARLEnabled && selectedARL.length > 0) count++;
    
    const hasSizeFilter = sizeRange[0] > 0 || sizeRange[1] < 500;
    const hasLandSizeFilter = landSizeRange[0] > 0 || landSizeRange[1] < 100;
    const hasFloorCountFilter = floorCountRange[0] > 1 || floorCountRange[1] < 50;
    const hasFloorNumberFilter = floorNumberRange[0] > 1 || floorNumberRange[1] < 100;
    const hasParkingFilter = parkingRange[0] > 0 || parkingRange[1] < 10;
    
    if (hasSizeFilter) count++;
    if (hasLandSizeFilter) count++;
    if (hasFloorCountFilter) count++;
    if (hasFloorNumberFilter) count++;
    if (hasParkingFilter) count++;
    
    setActiveMoreFiltersCount(count);
  }, [
    selectedPropertyTypes, selectedDirections, selectedViews, selectedTags,
    isBTSEnabled, selectedBTS, isMRTEnabled, selectedMRT, isARLEnabled, selectedARL,
    sizeRange, landSizeRange, floorCountRange, floorNumberRange, parkingRange
  ]);

  const handleSearch = () => {
    // Combine all filters into a single object
    const filters = {
      searchTerm,
      statusFilter,
      selectedZones,
      selectedListingTypes,
      priceRange,
      rentalPriceRange,
      selectedAgents,
      isProjectType,
      selectedPropertyTypes,
      landSizeRange,
      sizeRange,
      floorCountRange,
      floorNumberRange,
      parkingRange,
      selectedDirections,
      selectedViews,
      selectedTags,
      transit: {
        bts: isBTSEnabled ? selectedBTS : [],
        mrt: isMRTEnabled ? selectedMRT : [],
        arl: isARLEnabled ? selectedARL : []
      }
    };
    
    // Call the onSearch callback with the filters
    onSearch(filters);
  };

  const handleClearAll = () => {
    // Reset all filters to default values
    setSearchTerm('');
    setStatusFilter('');
    setSelectedZones([]);
    setSelectedListingTypes([]);
    setPriceRange([0, 100000000]);
    setRentalPriceRange([0, 500000]);
    setSelectedAgents([]);
    setIsProjectType(true);
    setSelectedPropertyTypes([]);
    setLandSizeRange([0, 100]);
    setSizeRange([0, 500]);
    setFloorCountRange([1, 50]);
    setFloorNumberRange([1, 100]);
    setParkingRange([0, 10]);
    setSelectedDirections([]);
    setSelectedViews([]);
    setSelectedTags([]);
    setIsBTSEnabled(false);
    setSelectedBTS([]);
    setIsMRTEnabled(false);
    setSelectedMRT([]);
    setIsARLEnabled(false);
    setSelectedARL([]);
  };

  // Determine if rental price should be shown
  const showRentalPrice = statusFilter === 'For Rent' || 
    statusFilter === 'For Sale & Rent' || 
    statusFilter === 'ขายพร้อมผู้เช่า';

  // Determine if sale price should be shown
  const showSalePrice = statusFilter === 'For Sale' || 
    statusFilter === 'For Sale & Rent' || 
    statusFilter === 'ขายพร้อมผู้เช่า' || 
    statusFilter === 'ขายดาวน์' ||
    statusFilter === '';

  return (
    <Box mb={6}>
      <Accordion 
        allowToggle 
        defaultIndex={[0]} 
        onChange={() => setIsExpanded(!isExpanded)}
      >
        <AccordionItem border="none">
          <h2>
            <AccordionButton px={0}>
              <Flex width="100%" align="center" justify="space-between">
                <Box display="flex" alignItems="center">
                  <Icon as={FiFilter} mr={2} />
                  <Text fontWeight="medium">Search & Filters</Text>
                </Box>
                <HStack>
                  {!isExpanded && (selectedZones.length > 0 || selectedListingTypes.length > 0 || 
                    (showAgentFilter && selectedAgents.length > 0) || 
                    (priceRange[0] > 0 || priceRange[1] < 100000000) || 
                    (rentalPriceRange[0] > 0 || rentalPriceRange[1] < 500000) ||
                    activeMoreFiltersCount > 0) && (
                    <Tag colorScheme="brand" size="sm" borderRadius="full">
                      {selectedZones.length + selectedListingTypes.length + 
                       (showAgentFilter ? selectedAgents.length : 0) + 
                       ((priceRange[0] > 0 || priceRange[1] < 100000000) ? 1 : 0) + 
                       ((rentalPriceRange[0] > 0 || rentalPriceRange[1] < 500000) ? 1 : 0) + 
                       activeMoreFiltersCount} active filters
                    </Tag>
                  )}
                  <AccordionIcon />
                </HStack>
              </Flex>
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} px={0}>
            {/* First Row: Search bar | All Statuses */}
            <Grid 
              templateColumns={{ 
                base: "1fr", 
                md: showAgentFilter
                  ? "minmax(200px, 2fr) minmax(150px, 1fr) minmax(150px, 1fr)"
                  : "minmax(200px, 2fr) minmax(150px, 1fr)"
              }}
              gap={4} 
              mb={4}
            >
              {/* Search bar - spans multiple columns to align with dropdowns on second row */}
              <GridItem colSpan={{ base: 1, md: showAgentFilter ? 2 : 1 }}>
                <InputGroup size="md">
                  <InputLeftElement pointerEvents="none">
                    <FiSearch color="gray.300" />
                  </InputLeftElement>
                  <Input
                    placeholder="Search by name, code, or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputGroup>
              </GridItem>
              
              {/* All Statuses */}
              <GridItem>
                <Select
                  placeholder="All Statuses"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  size="md"
                >
                  <option value="For Sale">For Sale</option>
                  <option value="For Rent">For Rent</option>
                  <option value="For Sale & Rent">For Sale & Rent</option>
                  <option value="ขายพร้อมผู้เช่า">ขายพร้อมผู้เช่า</option>
                  <option value="ขายดาวน์">ขายดาวน์</option>
                </Select>
              </GridItem>
            </Grid>

            {/* Second Row: Zone | Listing Type | Property Type | Agent (if shown) */}
            <Grid 
              templateColumns={{ 
                base: "1fr", 
                md: showAgentFilter 
                  ? "repeat(4, 1fr)"
                  : "repeat(3, 1fr)"
              }}
              gap={4} 
              mb={4}
            >
              {/* Zone */}
              <GridItem>
                <MultiSelectMenu
                  options={sampleZones}
                  selectedValues={selectedZones}
                  onChange={setSelectedZones}
                  placeholder="All Zones"
                  size="md"
                />
              </GridItem>

              {/* Listing Types */}
              <GridItem>
                <MultiSelectMenu
                  options={sampleListingTypes}
                  selectedValues={selectedListingTypes}
                  onChange={setSelectedListingTypes}
                  placeholder="All Listing Types"
                  size="md"
                />
              </GridItem>

              {/* Property Types - moved to second row */}
              <GridItem>
                <MultiSelectMenu
                  options={samplePropertyTypes}
                  selectedValues={selectedPropertyTypes}
                  onChange={setSelectedPropertyTypes}
                  placeholder="All Property Types"
                  size="md"
                />
              </GridItem>

              {/* Agent filter - only on All Listings page */}
              {showAgentFilter && (
                <GridItem>
                  <MultiSelectMenu
                    options={sampleAgents}
                    selectedValues={selectedAgents}
                    onChange={setSelectedAgents}
                    placeholder="All Agents"
                    size="md"
                  />
                </GridItem>
              )}
            </Grid>

            {/* Third Row: Price | More */}
            <Grid 
              templateColumns={{ 
                base: "1fr", 
                md: "1fr auto auto auto"
              }}
              gap={4} 
              mb={4}
            >
              {/* Price - Shows sale price or rental price or both based on status filter */}
              <GridItem>
                {/* If only showing one type of price */}
                {!(showRentalPrice && showSalePrice) && (
                  <Flex align="center">
                    <Text fontSize="sm" mr={2} minWidth="80px">
                      {showRentalPrice ? "Rental Price:" : "Price:"}
                    </Text>
                    <Box flex="1">
                      <NumberRangeInput
                        min={0}
                        max={showRentalPrice ? 500000 : 100000000}
                        value={showRentalPrice ? rentalPriceRange : priceRange}
                        onChange={showRentalPrice ? setRentalPriceRange : setPriceRange}
                        step={showRentalPrice ? 1000 : 100000}
                      />
                    </Box>
                  </Flex>
                )}
                
                {/* If showing both types of prices */}
                {showRentalPrice && showSalePrice && (
                  <VStack spacing={2} align="stretch">
                    <Flex align="center">
                      <Text fontSize="sm" mr={2} minWidth="80px">Sale Price:</Text>
                      <Box flex="1">
                        <NumberRangeInput
                          min={0}
                          max={100000000}
                          value={priceRange}
                          onChange={setPriceRange}
                          step={100000}
                        />
                      </Box>
                    </Flex>
                    <Flex align="center">
                      <Text fontSize="sm" mr={2} minWidth="80px">Rental Price:</Text>
                      <Box flex="1">
                        <NumberRangeInput
                          min={0}
                          max={500000}
                          value={rentalPriceRange}
                          onChange={setRentalPriceRange}
                          step={1000}
                        />
                      </Box>
                    </Flex>
                  </VStack>
                )}
              </GridItem>

              {/* More Search Button */}
              <GridItem display="flex" alignItems="center">
                <Popover placement="bottom-start" strategy="fixed" gutter={2}>
                  <PopoverTrigger>
                    <Button 
                      leftIcon={<FiSliders />} 
                      rightIcon={activeMoreFiltersCount > 0 ? 
                        <Tag size="sm" colorScheme="blue" borderRadius="full">
                          {activeMoreFiltersCount}
                        </Tag> : undefined
                      }
                      variant="outline"
                      size="md"
                      width="full"
                    >
                      More
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent width={{ base: "300px", md: "500px" }} p={4} zIndex={1500}>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader fontWeight="semibold">Advanced Filters</PopoverHeader>
                    <PopoverBody maxH="65vh" overflowY="auto">
                      {/* Single column layout with inline labels */}
                      <VStack spacing={5} align="stretch">
                        {/* Project Location */}
                        <FormControl>
                          <Flex align="center" mb={2}>
                            <FormLabel fontSize="sm" mb={0} minWidth="120px">Project Location</FormLabel>
                            <Flex flex={1}>
                              <Button
                                size="sm"
                                colorScheme={isProjectType ? "blue" : "gray"}
                                variant={isProjectType ? "solid" : "outline"}
                                onClick={() => setIsProjectType(true)}
                                mr={2}
                                flex={1}
                              >
                                ในโครงการ
                              </Button>
                              <Button
                                size="sm"
                                colorScheme={!isProjectType ? "blue" : "gray"}
                                variant={!isProjectType ? "solid" : "outline"}
                                onClick={() => setIsProjectType(false)}
                                flex={1}
                              >
                                นอกโครงการ
                              </Button>
                            </Flex>
                          </Flex>
                        </FormControl>

                        {/* Land Size */}
                        <FormControl>
                          <Flex align="center">
                            <FormLabel fontSize="sm" mb={0} minWidth="120px">Land Size (Rai)</FormLabel>
                            <Box flex={1}>
                              <NumberRangeInput
                                min={0}
                                max={100}
                                value={landSizeRange}
                                onChange={setLandSizeRange}
                                step={0.25}
                                precision={2}
                                disabled={selectedPropertyTypes.length === 1 && selectedPropertyTypes[0] === 'Condo'}
                              />
                            </Box>
                          </Flex>
                        </FormControl>

                        {/* Size */}
                        <FormControl>
                          <Flex align="center">
                            <FormLabel fontSize="sm" mb={0} minWidth="120px">Size (sqm)</FormLabel>
                            <Box flex={1}>
                              <NumberRangeInput
                                min={0}
                                max={500}
                                value={sizeRange}
                                onChange={setSizeRange}
                                step={5}
                              />
                            </Box>
                          </Flex>
                        </FormControl>

                        {/* No. of Floors */}
                        <FormControl>
                          <Flex align="center">
                            <FormLabel fontSize="sm" mb={0} minWidth="120px">No. of Floors</FormLabel>
                            <Box flex={1}>
                              <NumberRangeInput
                                min={1}
                                max={50}
                                value={floorCountRange}
                                onChange={setFloorCountRange}
                                step={1}
                              />
                            </Box>
                          </Flex>
                        </FormControl>

                        {/* Floor */}
                        <FormControl>
                          <Flex align="center">
                            <FormLabel fontSize="sm" mb={0} minWidth="120px">Floor</FormLabel>
                            <Box flex={1}>
                              <NumberRangeInput
                                min={1}
                                max={100}
                                value={floorNumberRange}
                                onChange={setFloorNumberRange}
                                step={1}
                                disabled={selectedPropertyTypes.length === 1 && 
                                  !['Condo', 'Penthouse'].includes(selectedPropertyTypes[0])}
                              />
                            </Box>
                          </Flex>
                        </FormControl>

                        {/* Parking Spaces */}
                        <FormControl>
                          <Flex align="center">
                            <FormLabel fontSize="sm" mb={0} minWidth="120px">Parking Spaces</FormLabel>
                            <Box flex={1}>
                              <NumberRangeInput
                                min={0}
                                max={10}
                                value={parkingRange}
                                onChange={setParkingRange}
                                step={1}
                              />
                            </Box>
                          </Flex>
                        </FormControl>

                        {/* Direction */}
                        <FormControl>
                          <FormLabel fontSize="sm" mb={2}>Direction</FormLabel>
                          <CheckboxGroup value={selectedDirections} onChange={setSelectedDirections}>
                            <Grid templateColumns="repeat(2, 1fr)" gap={1}>
                              {sampleDirections.map(direction => (
                                <Checkbox key={direction} value={direction} size="sm">
                                  {direction}
                                </Checkbox>
                              ))}
                            </Grid>
                          </CheckboxGroup>
                        </FormControl>

                        {/* View */}
                        <FormControl>
                          <Flex align="center">
                            <FormLabel fontSize="sm" mb={0} minWidth="120px">View</FormLabel>
                            <Box flex={1}>
                              <MultiSelectMenu
                                options={sampleViews}
                                selectedValues={selectedViews}
                                onChange={setSelectedViews}
                                placeholder="Select Views"
                                size="md"
                              />
                            </Box>
                          </Flex>
                        </FormControl>

                        {/* Matching Tags with selected tags display */}
                        <FormControl>
                          <Flex align="center" mb={2}>
                            <FormLabel fontSize="sm" mb={0} minWidth="120px">Matching Tags</FormLabel>
                            <Box flex={1}>
                              <MultiSelectMenu
                                options={sampleTags}
                                selectedValues={selectedTags}
                                onChange={setSelectedTags}
                                placeholder="Select Tags"
                                size="md"
                              />
                            </Box>
                          </Flex>
                          {selectedTags.length > 0 && (
                            <Wrap spacing={2} ml="120px">
                              {selectedTags.map(tag => (
                                <WrapItem key={tag}>
                                  <Tag size="sm" borderRadius="full" variant="subtle" colorScheme="blue">
                                    <TagLabel>{tag}</TagLabel>
                                    <TagCloseButton onClick={() => 
                                      setSelectedTags(prev => prev.filter(t => t !== tag))} 
                                  />
                                  </Tag>
                                </WrapItem>
                              ))}
                            </Wrap>
                          )}
                        </FormControl>

                        <Divider my={2} />

                        {/* Transit Options - Single toggle for all stations */}
                        <FormControl>
                          <FormLabel fontSize="sm" fontWeight="medium" mb={3}>Transit Options</FormLabel>
                          <Flex align="center" mb={3}>
                            <FormLabel fontSize="sm" mb={0}>Enable Transit Filters</FormLabel>
                            <Switch 
                              isChecked={isBTSEnabled || isMRTEnabled || isARLEnabled} 
                              onChange={(e) => {
                                const newState = e.target.checked;
                                setIsBTSEnabled(newState);
                                setIsMRTEnabled(newState);
                                setIsARLEnabled(newState);
                              }}
                              ml={2}
                            />
                          </Flex>

                          {/* BTS Stations */}
                          <FormControl mb={4} isDisabled={!(isBTSEnabled || isMRTEnabled || isARLEnabled)}>
                            <Flex align="center" mb={2}>
                              <FormLabel fontSize="sm" mb={0} minWidth="120px">BTS Stations</FormLabel>
                              <Box flex={1}>
                                <MultiSelectMenu
                                  options={sampleBTS}
                                  selectedValues={selectedBTS}
                                  onChange={setSelectedBTS}
                                  placeholder="Select BTS Stations"
                                  disabled={!(isBTSEnabled || isMRTEnabled || isARLEnabled)}
                                  size="md"
                                />
                              </Box>
                            </Flex>
                          </FormControl>

                          {/* MRT Stations */}
                          <FormControl mb={4} isDisabled={!(isBTSEnabled || isMRTEnabled || isARLEnabled)}>
                            <Flex align="center" mb={2}>
                              <FormLabel fontSize="sm" mb={0} minWidth="120px">MRT Stations</FormLabel>
                              <Box flex={1}>
                                <MultiSelectMenu
                                  options={sampleMRT}
                                  selectedValues={selectedMRT}
                                  onChange={setSelectedMRT}
                                  placeholder="Select MRT Stations"
                                  disabled={!(isBTSEnabled || isMRTEnabled || isARLEnabled)}
                                  size="md"
                                />
                              </Box>
                            </Flex>
                          </FormControl>

                          {/* ARL Stations */}
                          <FormControl mb={4} isDisabled={!(isBTSEnabled || isMRTEnabled || isARLEnabled)}>
                            <Flex align="center" mb={2}>
                              <FormLabel fontSize="sm" mb={0} minWidth="120px">ARL Stations</FormLabel>
                              <Box flex={1}>
                                <MultiSelectMenu
                                  options={sampleARL}
                                  selectedValues={selectedARL}
                                  onChange={setSelectedARL}
                                  placeholder="Select ARL Stations"
                                  disabled={!(isBTSEnabled || isMRTEnabled || isARLEnabled)}
                                  size="md"
                                />
                              </Box>
                            </Flex>
                          </FormControl>
                        </FormControl>
                      </VStack>
                    </PopoverBody>
                    <PopoverFooter>
                      <Flex justify="space-between">
                        <Button variant="ghost" onClick={handleClearAll}>Clear All</Button>
                        <Button colorScheme="blue" onClick={handleSearch}>Apply Filters</Button>
                      </Flex>
                    </PopoverFooter>
                  </PopoverContent>
                </Popover>
              </GridItem>

              {/* Clear All Button */}
              <GridItem display="flex" alignItems="center">
                <Button variant="outline" onClick={handleClearAll} size="md" width="full">
                  Clear All
                </Button>
              </GridItem>

              {/* Search Button */}
              <GridItem display="flex" alignItems="center">
                <Button colorScheme="brand" onClick={handleSearch} size="md" width="full">
                  Search
                </Button>
              </GridItem>
            </Grid>

            {/* Active Filters Display */}
            {(selectedZones.length > 0 || selectedListingTypes.length > 0 || 
              (showAgentFilter && selectedAgents.length > 0) ||
              (priceRange[0] > 0 || priceRange[1] < 100000000) && showSalePrice ||
              (rentalPriceRange[0] > 0 || rentalPriceRange[1] < 500000) && showRentalPrice ||
              selectedPropertyTypes.length > 0) && (
              <Wrap spacing={2} mb={4}>
                {selectedZones.length > 0 && (
                  <WrapItem>
                    <Tag size="md" borderRadius="full" variant="subtle" colorScheme="blue">
                      <TagLabel>Zones: {selectedZones.length}</TagLabel>
                      <TagCloseButton onClick={() => setSelectedZones([])} />
                    </Tag>
                  </WrapItem>
                )}
                
                {selectedListingTypes.length > 0 && (
                  <WrapItem>
                    <Tag size="md" borderRadius="full" variant="subtle" colorScheme="blue">
                      <TagLabel>Listing Types: {selectedListingTypes.length}</TagLabel>
                      <TagCloseButton onClick={() => setSelectedListingTypes([])} />
                    </Tag>
                  </WrapItem>
                )}
                
                {showAgentFilter && selectedAgents.length > 0 && (
                  <WrapItem>
                    <Tag size="md" borderRadius="full" variant="subtle" colorScheme="blue">
                      <TagLabel>Agents: {selectedAgents.length}</TagLabel>
                      <TagCloseButton onClick={() => setSelectedAgents([])} />
                    </Tag>
                  </WrapItem>
                )}
                
                {(priceRange[0] > 0 || priceRange[1] < 100000000) && showSalePrice && (
                  <WrapItem>
                    <Tag size="md" borderRadius="full" variant="subtle" colorScheme="blue">
                      <TagLabel>Price: ฿{priceRange[0].toLocaleString()} - ฿{priceRange[1].toLocaleString()}</TagLabel>
                      <TagCloseButton onClick={() => setPriceRange([0, 100000000])} />
                    </Tag>
                  </WrapItem>
                )}
                
                {(rentalPriceRange[0] > 0 || rentalPriceRange[1] < 500000) && showRentalPrice && (
                  <WrapItem>
                    <Tag size="md" borderRadius="full" variant="subtle" colorScheme="blue">
                      <TagLabel>Rental: ฿{rentalPriceRange[0].toLocaleString()} - ฿{rentalPriceRange[1].toLocaleString()}/mo</TagLabel>
                      <TagCloseButton onClick={() => setRentalPriceRange([0, 500000])} />
                    </Tag>
                  </WrapItem>
                )}
                
                {selectedPropertyTypes.length > 0 && (
                  <WrapItem>
                    <Tag size="md" borderRadius="full" variant="subtle" colorScheme="purple">
                      <TagLabel>Property Types: {selectedPropertyTypes.length}</TagLabel>
                      <TagCloseButton onClick={() => setSelectedPropertyTypes([])} />
                    </Tag>
                  </WrapItem>
                )}
              </Wrap>
            )}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};

export default AdvancedSearchFilters; 