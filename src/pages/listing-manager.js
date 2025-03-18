import React, { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
  Button,
  Grid,
  Card,
  CardBody,
  Badge,
  HStack,
  VStack,
  SimpleGrid,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Divider,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  FiPlus,
  FiSearch,
  FiFilter,
  FiMoreVertical,
  FiEdit,
  FiTrash2,
  FiDownload,
  FiUpload,
  FiShare2,
  FiCheckCircle,
  FiAlertCircle,
} from 'react-icons/fi';

// Sample data for the Listing Manager
const pendingListings = [
  {
    id: 'P12345',
    name: 'New Condo Listing in Sukhumvit',
    status: 'Pending Review',
    submittedBy: 'Agent A',
    submittedDate: '2024-01-05',
    type: 'New Listing',
    priority: 'High',
  },
  {
    id: 'P12346',
    name: 'Price Update for House in Thonglor',
    status: 'Pending Approval',
    submittedBy: 'Agent B',
    submittedDate: '2024-01-07',
    type: 'Price Update',
    priority: 'Medium',
  },
  {
    id: 'P12347',
    name: 'Photo Upload for Riverside Penthouse',
    status: 'Pending Review',
    submittedBy: 'Agent C',
    submittedDate: '2024-01-10',
    type: 'Media Update',
    priority: 'Low',
  },
  {
    id: 'P12348',
    name: 'Status Change - Property Sold',
    status: 'Pending Approval',
    submittedBy: 'Agent A',
    submittedDate: '2024-01-12',
    type: 'Status Update',
    priority: 'High',
  },
  {
    id: 'P12349',
    name: 'Remove Listing Temporarily',
    status: 'Pending Review',
    submittedBy: 'Agent D',
    submittedDate: '2024-01-15',
    type: 'Status Update',
    priority: 'Medium',
  },
];

const recentActivity = [
  {
    id: 'A12350',
    action: 'Listing Approved',
    listing: 'Luxury Condo at Asoke',
    performedBy: 'Manager X',
    date: '2024-01-15',
  },
  {
    id: 'A12351',
    action: 'Price Update Rejected',
    listing: 'Townhouse at Sathorn',
    performedBy: 'Manager Y',
    date: '2024-01-14',
    notes: 'Price too high for current market conditions',
  },
  {
    id: 'A12352',
    action: 'Photos Updated',
    listing: 'House in Rama 9',
    performedBy: 'Agent C',
    date: '2024-01-13',
  },
  {
    id: 'A12353',
    action: 'Listing Marked as Sold',
    listing: 'Condo in Ladprao',
    performedBy: 'Manager X',
    date: '2024-01-12',
  },
  {
    id: 'A12354',
    action: 'New Listing Created',
    listing: 'Villa in Pattaya',
    performedBy: 'Agent B',
    date: '2024-01-10',
  },
];

const ListingManager = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  
  const filteredPendingListings = pendingListings
    .filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.submittedBy.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(item => !statusFilter || item.status === statusFilter)
    .filter(item => !typeFilter || item.type === typeFilter);
  
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems(filteredPendingListings.map(item => item.id));
    } else {
      setSelectedItems([]);
    }
  };
  
  const handleSelectItem = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(itemId => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };
  
  return (
    <Container maxW="container.xl" px={0}>
      <Box mb={8}>
        <Heading size="lg" mb={2}>Listing Manager</Heading>
        <Text color="gray.600">Manage and approve property listings and updates</Text>
      </Box>
      
      {/* Stats Section */}
      <SimpleGrid columns={{ base: 1, md: 4 }} spacing={6} mb={8}>
        <Card>
          <CardBody>
            <Stat>
              <StatLabel fontWeight="medium">Pending Review</StatLabel>
              <StatNumber>15</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                23.36%
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Stat>
              <StatLabel fontWeight="medium">Approved Today</StatLabel>
              <StatNumber>8</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                14.05%
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Stat>
              <StatLabel fontWeight="medium">Rejected</StatLabel>
              <StatNumber>2</StatNumber>
              <StatHelpText>
                <StatArrow type="decrease" />
                9.05%
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Stat>
              <StatLabel fontWeight="medium">Avg. Review Time</StatLabel>
              <StatNumber>8.3h</StatNumber>
              <StatHelpText>
                <StatArrow type="decrease" />
                12.65%
              </StatHelpText>
            </Stat>
          </CardBody>
        </Card>
      </SimpleGrid>
      
      {/* Main Content */}
      <Tabs 
        variant="enclosed" 
        colorScheme="brand" 
        index={selectedTab}
        onChange={(index) => setSelectedTab(index)}
      >
        <TabList>
          <Tab>Pending Approvals</Tab>
          <Tab>Recent Activity</Tab>
          <Tab>Reports</Tab>
        </TabList>
        
        <TabPanels>
          {/* Pending Approvals Tab */}
          <TabPanel p={0} pt={6}>
            <Flex mb={6} justify="space-between" align="center" wrap="wrap" gap={4}>
              <HStack spacing={4} flex={{ base: '1', md: 'auto' }}>
                <InputGroup w={{ base: 'full', md: '300px' }}>
                  <InputLeftElement pointerEvents="none">
                    <FiSearch color="gray.300" />
                  </InputLeftElement>
                  <Input
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputGroup>
                
                <Select 
                  placeholder="Filter by Status"
                  w={{ base: 'full', md: '200px' }}
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="Pending Review">Pending Review</option>
                  <option value="Pending Approval">Pending Approval</option>
                </Select>
                
                <Select 
                  placeholder="Filter by Type"
                  w={{ base: 'full', md: '200px' }}
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                >
                  <option value="New Listing">New Listing</option>
                  <option value="Price Update">Price Update</option>
                  <option value="Status Update">Status Update</option>
                  <option value="Media Update">Media Update</option>
                </Select>
              </HStack>
              
              <HStack>
                <Button 
                  colorScheme="green" 
                  leftIcon={<FiCheckCircle />}
                  isDisabled={selectedItems.length === 0}
                >
                  Approve Selected
                </Button>
                <Button 
                  colorScheme="red" 
                  variant="outline" 
                  leftIcon={<FiAlertCircle />}
                  isDisabled={selectedItems.length === 0}
                >
                  Reject
                </Button>
              </HStack>
            </Flex>
            
            <Box overflowX="auto">
              <Table variant="simple">
                <Thead bg="gray.50">
                  <Tr>
                    <Th px={4} width="40px">
                      <Checkbox 
                        isChecked={
                          filteredPendingListings.length > 0 && 
                          selectedItems.length === filteredPendingListings.length
                        }
                        onChange={handleSelectAll}
                      />
                    </Th>
                    <Th>Listing Details</Th>
                    <Th>Type</Th>
                    <Th>Status</Th>
                    <Th>Submitted By</Th>
                    <Th>Date</Th>
                    <Th>Priority</Th>
                    <Th width="60px"></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {filteredPendingListings.length > 0 ? (
                    filteredPendingListings.map((item) => (
                      <Tr key={item.id} _hover={{ bg: 'gray.50' }}>
                        <Td px={4}>
                          <Checkbox 
                            isChecked={selectedItems.includes(item.id)}
                            onChange={() => handleSelectItem(item.id)}
                          />
                        </Td>
                        <Td>
                          <Box>
                            <Text fontWeight="medium">{item.name}</Text>
                            <Text fontSize="sm" color="gray.500">{item.id}</Text>
                          </Box>
                        </Td>
                        <Td>
                          <Badge
                            colorScheme={
                              item.type === 'New Listing' ? 'blue' :
                              item.type === 'Price Update' ? 'purple' :
                              item.type === 'Status Update' ? 'orange' : 'teal'
                            }
                          >
                            {item.type}
                          </Badge>
                        </Td>
                        <Td>
                          <Badge
                            colorScheme={item.status === 'Pending Review' ? 'yellow' : 'orange'}
                          >
                            {item.status}
                          </Badge>
                        </Td>
                        <Td>{item.submittedBy}</Td>
                        <Td>{item.submittedDate}</Td>
                        <Td>
                          <Badge
                            colorScheme={
                              item.priority === 'High' ? 'red' :
                              item.priority === 'Medium' ? 'orange' : 'green'
                            }
                          >
                            {item.priority}
                          </Badge>
                        </Td>
                        <Td>
                          <Menu>
                            <MenuButton
                              as={IconButton}
                              icon={<FiMoreVertical />}
                              variant="ghost"
                              size="sm"
                            />
                            <MenuList>
                              <MenuItem icon={<FiCheckCircle />}>Approve</MenuItem>
                              <MenuItem icon={<FiAlertCircle />}>Reject</MenuItem>
                              <MenuItem icon={<FiEdit />}>Edit</MenuItem>
                              <MenuItem icon={<FiTrash2 />}>Delete</MenuItem>
                            </MenuList>
                          </Menu>
                        </Td>
                      </Tr>
                    ))
                  ) : (
                    <Tr>
                      <Td colSpan={8} textAlign="center" py={10}>
                        <Text color="gray.500">No pending approvals found</Text>
                      </Td>
                    </Tr>
                  )}
                </Tbody>
              </Table>
            </Box>
          </TabPanel>
          
          {/* Recent Activity Tab */}
          <TabPanel p={0} pt={6}>
            <Box overflowX="auto">
              <Table variant="simple">
                <Thead bg="gray.50">
                  <Tr>
                    <Th>Action</Th>
                    <Th>Listing</Th>
                    <Th>Performed By</Th>
                    <Th>Date</Th>
                    <Th width="60px"></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {recentActivity.map((activity) => (
                    <Tr key={activity.id} _hover={{ bg: 'gray.50' }}>
                      <Td>
                        <Box>
                          <Text fontWeight="medium">{activity.action}</Text>
                          {activity.notes && (
                            <Text fontSize="sm" color="gray.500">{activity.notes}</Text>
                          )}
                        </Box>
                      </Td>
                      <Td>{activity.listing}</Td>
                      <Td>{activity.performedBy}</Td>
                      <Td>{activity.date}</Td>
                      <Td>
                        <Menu>
                          <MenuButton
                            as={IconButton}
                            icon={<FiMoreVertical />}
                            variant="ghost"
                            size="sm"
                          />
                          <MenuList>
                            <MenuItem icon={<FiEdit />}>View Details</MenuItem>
                            <MenuItem icon={<FiShare2 />}>Share</MenuItem>
                          </MenuList>
                        </Menu>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          </TabPanel>
          
          {/* Reports Tab */}
          <TabPanel p={0} pt={6}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              <Card>
                <CardBody>
                  <Heading size="sm" mb={4}>Approval Time Analytics</Heading>
                  <Text color="gray.600" fontSize="sm" mb={4}>
                    Average time to approve listings by type
                  </Text>
                  <Box height="200px" bg="gray.100" borderRadius="md" display="flex" alignItems="center" justifyContent="center">
                    <Text>Chart placeholder</Text>
                  </Box>
                </CardBody>
              </Card>
              
              <Card>
                <CardBody>
                  <Heading size="sm" mb={4}>Approval Rate</Heading>
                  <Text color="gray.600" fontSize="sm" mb={4}>
                    Percentage of approvals vs. rejections
                  </Text>
                  <Box height="200px" bg="gray.100" borderRadius="md" display="flex" alignItems="center" justifyContent="center">
                    <Text>Chart placeholder</Text>
                  </Box>
                </CardBody>
              </Card>
              
              <Card>
                <CardBody>
                  <Heading size="sm" mb={4}>Recent Listing Submissions</Heading>
                  <Text color="gray.600" fontSize="sm" mb={4}>
                    Number of listings submitted over time
                  </Text>
                  <Box height="200px" bg="gray.100" borderRadius="md" display="flex" alignItems="center" justifyContent="center">
                    <Text>Chart placeholder</Text>
                  </Box>
                </CardBody>
              </Card>
              
              <Card>
                <CardBody>
                  <Heading size="sm" mb={4}>Submission Types</Heading>
                  <Text color="gray.600" fontSize="sm" mb={4}>
                    Distribution of submission types
                  </Text>
                  <Box height="200px" bg="gray.100" borderRadius="md" display="flex" alignItems="center" justifyContent="center">
                    <Text>Chart placeholder</Text>
                  </Box>
                </CardBody>
              </Card>
            </SimpleGrid>
            
            <HStack mt={6} spacing={4}>
              <Button leftIcon={<FiDownload />} colorScheme="brand">
                Export Report
              </Button>
              <Button leftIcon={<FiShare2 />} variant="outline">
                Share Report
              </Button>
            </HStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default ListingManager; 