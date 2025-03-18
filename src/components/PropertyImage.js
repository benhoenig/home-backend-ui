import React, { useState } from 'react';
import { Box, Image, Skeleton } from '@chakra-ui/react';
import { getPropertyImage, getOnlineImage } from '../utils/propertyImages';

/**
 * PropertyImage Component
 * 
 * Renders property images with error handling and fallback options
 * 
 * @param {Object} props
 * @param {string} props.propertyType - Type of property (Condo, House, etc.)
 * @param {string|number} props.propertyId - Unique ID of the property
 * @param {number} props.index - Optional index for gallery images
 * @param {string} props.alt - Alt text for the image
 */
const PropertyImage = ({ 
  propertyType, 
  propertyId, 
  index = 0, 
  alt = "Property image",
  ...props 
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [useOnlineFallback, setUseOnlineFallback] = useState(false);
  
  // Get correct image path
  const imageSrc = useOnlineFallback 
    ? getOnlineImage(propertyType, index)
    : getPropertyImage(propertyType, propertyId, index);
  
  // Handle successful image load
  const handleImageLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };
  
  // Handle image loading error
  const handleImageError = () => {
    setIsLoading(false);
    setHasError(true);
    
    // If local image failed, try using online fallback
    if (!useOnlineFallback) {
      setUseOnlineFallback(true);
      setIsLoading(true);
    }
  };
  
  return (
    <Box position="relative" {...props}>
      {isLoading && (
        <Skeleton 
          height={props.height || props.h || "100%"} 
          width={props.width || props.w || "100%"} 
          borderRadius={props.borderRadius || "md"}
        />
      )}
      
      <Image
        src={imageSrc}
        alt={alt}
        onLoad={handleImageLoad}
        onError={handleImageError}
        style={{ display: isLoading ? 'none' : 'block' }}
        fallbackSrc="https://via.placeholder.com/400x300?text=Property+Image"
        {...props}
      />
    </Box>
  );
};

export default PropertyImage; 