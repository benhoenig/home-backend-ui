import React from 'react';
import { Box, Container } from '@chakra-ui/react';
import ListingsTable from '../components/ListingsTable';

export default function Focus() {
  return (
    <Container maxW="container.xl" px={0}>
      <ListingsTable 
        canEdit={false} 
        title="Owner Focus" 
        focusOnly={true} 
      />
    </Container>
  );
} 