/**
 * Property Images Utility
 * 
 * This file maps property types to sets of images to ensure consistent
 * image display throughout the application.
 */

// Base image paths 
const CONDO_IMAGES = [
  '/images/properties/condo-1.jpg',
  '/images/properties/condo-2.jpg',
  '/images/properties/condo-3.jpg',
  '/images/properties/condo-4.jpg',
  '/images/properties/condo-5.jpg',
  '/images/properties/condo-6.jpg',
];

const HOUSE_IMAGES = [
  '/images/properties/house-1.jpg',
  '/images/properties/house-2.jpg',
  '/images/properties/house-3.jpg',
  '/images/properties/house-4.jpg',
  '/images/properties/house-5.jpg',
  '/images/properties/house-6.jpg',
];

const TOWNHOUSE_IMAGES = [
  '/images/properties/townhouse-1.jpg',
  '/images/properties/townhouse-2.jpg',
  '/images/properties/townhouse-3.jpg',
  '/images/properties/townhouse-4.jpg',
  '/images/properties/townhouse-5.jpg',
  '/images/properties/townhouse-6.jpg',
];

const PENTHOUSE_IMAGES = [
  '/images/properties/penthouse-1.jpg',
  '/images/properties/penthouse-2.jpg',
  '/images/properties/penthouse-3.jpg',
  '/images/properties/penthouse-4.jpg',
  '/images/properties/penthouse-5.jpg',
  '/images/properties/penthouse-6.jpg',
];

const LAND_IMAGES = [
  '/images/properties/land-1.jpg',
  '/images/properties/land-2.jpg',
  '/images/properties/land-3.jpg',
  '/images/properties/land-4.jpg',
  '/images/properties/land-5.jpg',
  '/images/properties/land-6.jpg',
];

const COMMERCIAL_IMAGES = [
  '/images/properties/commercial-1.jpg',
  '/images/properties/commercial-2.jpg',
  '/images/properties/commercial-3.jpg',
  '/images/properties/commercial-4.jpg',
  '/images/properties/commercial-5.jpg',
  '/images/properties/commercial-6.jpg',
];

// Fallback image if type doesn't match
const DEFAULT_IMAGE = '/images/properties/default.jpg';

// Main mapping object
export const propertyImageMap = {
  'Condo': CONDO_IMAGES,
  'House': HOUSE_IMAGES,
  'Townhouse': TOWNHOUSE_IMAGES,
  'Penthouse': PENTHOUSE_IMAGES,
  'Land': LAND_IMAGES,
  'Commercial': COMMERCIAL_IMAGES,
};

/**
 * Function to get a stable image URL for a property based on its type and ID
 * @param {string} propertyType - Type of property (Condo, House, etc.)
 * @param {number|string} propertyId - Unique identifier for the property
 * @param {number} [imageIndex=0] - Optional index to get specific image (for galleries)
 * @returns {string} URL to the property image
 */
export const getPropertyImage = (propertyType, propertyId, imageIndex = 0) => {
  // Get the correct image set for this property type
  const imageSet = propertyImageMap[propertyType] || [];
  
  if (!imageSet.length) {
    return DEFAULT_IMAGE;
  }
  
  // Use the property ID to deterministically select an image
  // This ensures the same property always gets the same image
  const mainImageIndex = typeof propertyId === 'number' 
    ? propertyId % imageSet.length
    : Math.abs(String(propertyId).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % imageSet.length;
  
  // For secondary images (in galleries), rotate through the set
  const targetIndex = imageIndex === 0 
    ? mainImageIndex 
    : (mainImageIndex + imageIndex) % imageSet.length;
  
  return imageSet[targetIndex] || DEFAULT_IMAGE;
};

/**
 * Function to get all gallery images for a property
 * @param {string} propertyType - Type of property
 * @param {number|string} propertyId - Unique identifier for the property
 * @param {number} [count=6] - Number of images to return
 * @returns {string[]} Array of image URLs
 */
export const getPropertyGallery = (propertyType, propertyId, count = 6) => {
  const imageSet = propertyImageMap[propertyType] || [];
  
  if (!imageSet.length) {
    return Array(count).fill(DEFAULT_IMAGE);
  }
  
  const gallery = [];
  for (let i = 0; i < count; i++) {
    gallery.push(getPropertyImage(propertyType, propertyId, i));
  }
  
  return gallery;
};

// Backup URLs to online images for testing when local images are missing
export const onlineImageFallbacks = {
  'Condo': [
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2',
  ],
  'House': [
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6',
    'https://images.unsplash.com/photo-1580587771525-78b9dba3b914',
    'https://images.unsplash.com/photo-1568605114967-8130f3a36994',
  ],
  'Townhouse': [
    'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6',
    'https://images.unsplash.com/photo-1625602812206-5ec545ca1231',
    'https://images.unsplash.com/photo-1605146769289-440113cc3d00',
  ],
  'Penthouse': [
    'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af',
    'https://images.unsplash.com/photo-1545083036-b175dd155a1d',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9',
  ],
  'Land': [
    'https://images.unsplash.com/photo-1500382017468-9049fed747ef',
    'https://images.unsplash.com/photo-1469122312224-c5846569feb1',
    'https://images.unsplash.com/photo-1501854140801-50d01698950b',
  ],
  'Commercial': [
    'https://images.unsplash.com/photo-1497366754035-f200968a6e72',
    'https://images.unsplash.com/photo-1497215728101-856f4ea42174',
    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d',
  ],
  'Default': [
    'https://images.unsplash.com/photo-1560518883-ce09059eeffa',
  ]
};

/**
 * Get an online image URL when local images are unavailable
 * @param {string} propertyType - Type of property
 * @param {number} index - Image index
 * @returns {string} URL to the online image with parameters
 */
export const getOnlineImage = (propertyType, index = 0) => {
  const fallbacks = onlineImageFallbacks[propertyType] || onlineImageFallbacks.Default;
  const baseUrl = fallbacks[index % fallbacks.length];
  // Add parameters for size and quality
  return `${baseUrl}?auto=format&fit=crop&w=800&q=80`;
}; 