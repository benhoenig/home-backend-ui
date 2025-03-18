import React from 'react';
import { Box, Container } from '@chakra-ui/react';
import ListingsTable from '../components/ListingsTable';

export default function MyListings() {
  return (
    <Container maxW="container.xl" px={0}>
      <ListingsTable 
        canEdit={true} 
        myListingsOnly={true} 
        title="My Listings" 
        hideAgentColumn={true} 
      />
    </Container>
  );
} 