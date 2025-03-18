import React from 'react';
import { Box, Container } from '@chakra-ui/react';
import ContactsTable from '../components/ContactsTable';

export default function Contacts() {
  return (
    <Container maxW="container.xl" px={0}>
      <ContactsTable />
    </Container>
  );
} 