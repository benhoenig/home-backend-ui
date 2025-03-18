# Property Images

This directory contains images for different property types used throughout the application.

## File Naming Convention

Images should follow this naming convention:
- `[property-type]-[number].jpg`

For example:
- `condo-1.jpg`
- `house-2.jpg`
- `townhouse-3.jpg`

## Required Property Types

The application uses images for the following property types:
- Condo
- House
- Townhouse
- Penthouse
- Land
- Commercial

Each property type should have at least 6 images (numbered 1-6).

## Fallback Mechanism

If local images aren't available, the application will use Unsplash images as fallbacks.

## Adding New Images

To add new property images:
1. Name them according to the convention above
2. Place them in this directory
3. Make sure they are JPG format and web-optimized
4. Ideally, use images with a 4:3 or 16:9 aspect ratio

## Default Image

A `default.jpg` file should be added to handle cases where a specific property type image is not found. 