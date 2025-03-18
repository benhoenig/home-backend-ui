import React from 'react';
import { Grid, Box } from '@chakra-ui/react';
import PropertyImage from './PropertyImage';
import { getPropertyGallery } from '../utils/propertyImages';

/**
 * PropertyGallery Component
 * 
 * Displays a grid of property images
 * 
 * @param {Object} props
 * @param {string} props.propertyType - Type of property (Condo, House, etc.)
 * @param {string|number} props.propertyId - Unique ID of the property
 * @param {number} props.count - Number of images to display
 */
const PropertyGallery = ({ 
  propertyType, 
  propertyId, 
  count = 6,
  gridTemplateColumns = "repeat(2, 1fr)",
  gap = 4,
  ...props 
}) => {
  // Get the array of image URLs
  const imageIndexes = Array.from({ length: count }, (_, i) => i);
  
  return (
    <Grid 
      templateColumns={gridTemplateColumns}
      gap={gap}
      {...props}
    >
      {imageIndexes.map((index) => (
        <Box 
          key={index} 
          borderRadius="md" 
          overflow="hidden"
        >
          <PropertyImage
            propertyType={propertyType}
            propertyId={propertyId}
            index={index}
            alt={`${propertyType} photo ${index + 1}`}
            w="100%"
            h="150px"
            objectFit="cover"
          />
        </Box>
      ))}
    </Grid>
  );
};

export default PropertyGallery; 