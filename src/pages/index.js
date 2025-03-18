import React, { useState } from 'react';
import {
  Box,
  Grid,
  Flex,
  Heading,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Select,
  SimpleGrid,
  Card,
  CardBody,
  Stack,
  Icon,
  Divider,
  Badge,
} from '@chakra-ui/react';
import { FiHome, FiDollarSign, FiTrendingUp, FiCalendar, FiClock } from 'react-icons/fi';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

// Sample data for dashboard
const statCards = [
  {
    label: 'Total Listings',
    value: 346,
    icon: FiHome,
    change: 12,
    changeType: 'increase',
    color: 'brand.500',
  },
  {
    label: 'Active Listings',
    value: 278,
    icon: FiTrendingUp,
    change: 8.1,
    changeType: 'increase',
    color: 'green.500',
  },
  {
    label: 'Sold Properties',
    value: 53,
    icon: FiDollarSign,
    change: 21.3,
    changeType: 'increase',
    color: 'purple.500',
  },
  {
    label: 'Avg. Days on Market',
    value: '42',
    icon: FiClock,
    change: 5.2,
    changeType: 'decrease',
    color: 'orange.500',
  },
];

// Sample data for charts
const monthlyListingsData = [
  { name: 'Jan', sales: 15, rentals: 12 },
  { name: 'Feb', sales: 20, rentals: 15 },
  { name: 'Mar', sales: 18, rentals: 14 },
  { name: 'Apr', sales: 25, rentals: 17 },
  { name: 'May', sales: 27, rentals: 13 },
  { name: 'Jun', sales: 32, rentals: 16 },
];

const propertyTypeData = [
  { name: 'Condo', value: 45 },
  { name: 'House', value: 30 },
  { name: 'Townhouse', value: 15 },
  { name: 'Land', value: 10 },
];

const recentListings = [
  {
    id: 'L12345',
    name: 'Luxury Condo at Downtown',
    price: '฿15,500,000',
    type: 'For Sale',
    status: 'พร้อมประกาศ',
    date: '2 days ago',
  },
  {
    id: 'L12346',
    name: 'Modern Townhouse in Sukhumvit',
    price: '฿35,000/mo',
    type: 'For Rent',
    status: 'พร้อมประกาศ',
    date: '3 days ago',
  },
  {
    id: 'L12347',
    name: 'Spacious Villa in Phuket',
    price: '฿32,000,000',
    type: 'For Sale',
    status: 'พร้อมประกาศ',
    date: '5 days ago',
  },
  {
    id: 'L12348',
    name: 'Office Space near Asoke',
    price: '฿50,000/mo',
    type: 'For Rent',
    status: 'พร้อมประกาศ',
    date: '1 week ago',
  },
];

const COLORS = ['#3182CE', '#00C49F', '#FFBB28', '#FF8042'];

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState('month');

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg">Dashboard</Heading>
        <Select 
          w="200px"
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
        >
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="custom">Custom Range</option>
        </Select>
      </Flex>

      {/* Stat Cards */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
        {statCards.map((stat, index) => (
          <Card key={index}>
            <CardBody>
              <Flex align="center">
                <Box
                  mr={4}
                  p={2}
                  borderRadius="lg"
                  bg={stat.color + '.50'}
                  color={stat.color}
                >
                  <Icon as={stat.icon} boxSize={6} />
                </Box>
                <Stat>
                  <StatLabel fontWeight="medium">{stat.label}</StatLabel>
                  <StatNumber>{stat.value}</StatNumber>
                  <StatHelpText>
                    <StatArrow type={stat.changeType} />
                    {stat.change}% {stat.changeType === 'increase' ? 'more' : 'less'}
                  </StatHelpText>
                </Stat>
              </Flex>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>

      {/* Charts */}
      <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={6} mb={8}>
        <Card>
          <CardBody>
            <Heading size="md" mb={4}>Monthly Listings</Heading>
            <Box h="300px">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyListingsData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sales" name="For Sale" fill="#3182CE" />
                  <Bar dataKey="rentals" name="For Rent" fill="#00C49F" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Heading size="md" mb={4}>Property Types</Heading>
            <Box h="300px">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={propertyTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {propertyTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </CardBody>
        </Card>
      </Grid>

      {/* Recent Listings */}
      <Card mb={8}>
        <CardBody>
          <Heading size="md" mb={4}>Recent Listings</Heading>
          <Stack spacing={4} divider={<Divider />}>
            {recentListings.map((listing, index) => (
              <Flex key={index} justify="space-between" align="center">
                <Box>
                  <Text fontWeight="medium">{listing.name}</Text>
                  <Text fontSize="sm" color="gray.600">{listing.id}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold">{listing.price}</Text>
                  <Badge
                    colorScheme={listing.type === 'For Sale' ? 'blue' : 'green'}
                    mr={2}
                  >
                    {listing.type}
                  </Badge>
                  <Text fontSize="sm" color="gray.500" as="span">
                    {listing.date}
                  </Text>
                </Box>
              </Flex>
            ))}
          </Stack>
        </CardBody>
      </Card>

      {/* Agent Performance */}
      <Card>
        <CardBody>
          <Heading size="md" mb={4}>Agent Performance</Heading>
          <Box h="300px">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={[
                  { month: 'Jan', listings: 5, sales: 2 },
                  { month: 'Feb', listings: 7, sales: 3 },
                  { month: 'Mar', listings: 10, sales: 4 },
                  { month: 'Apr', listings: 8, sales: 5 },
                  { month: 'May', listings: 12, sales: 6 },
                  { month: 'Jun', listings: 15, sales: 8 },
                ]}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="listings"
                  name="New Listings"
                  stroke="#3182CE"
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="sales"
                  name="Sales Closed"
                  stroke="#FF8042"
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </CardBody>
      </Card>
    </Box>
  );
} 