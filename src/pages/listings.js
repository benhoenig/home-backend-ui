import React from 'react';
import { Box, Container } from '@chakra-ui/react';
import ListingsTable from '../components/ListingsTable';

export default function Listings() {
  return (
    <Container maxW="container.xl" px={0}>
      <ListingsTable 
        canEdit={false} 
        myListingsOnly={false} 
        title="All Listings" 
        hideAgentColumn={false}
      />
    </Container>
  );
} 