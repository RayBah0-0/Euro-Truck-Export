import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';

// Initialize Cloudinary instance
export const cld = new Cloudinary({ 
  cloud: { 
    cloudName: 'dqhesb1lq' 
  } 
});

/**
 * Generate optimized Cloudinary image URL
 * @param publicId - The Cloudinary public ID (e.g., 'trucks/volvo-fh16-1')
 * @param width - Optional width for resizing
 * @param height - Optional height for resizing
 * @returns Cloudinary image instance
 */
export function getCloudinaryImage(publicId: string, width?: number, height?: number) {
  const img = cld.image(publicId)
    .format('auto') // Automatically deliver best format (WebP, AVIF, etc.)
    .quality('auto'); // Automatically optimize quality
  
  if (width && height) {
    img.resize(auto().gravity(autoGravity()).width(width).height(height));
  } else if (width) {
    img.resize(auto().width(width));
  }
  
  return img;
}

/**
 * Get direct Cloudinary URL string (for backward compatibility with existing code)
 * @param publicId - The Cloudinary public ID (e.g., 'trucks/volvo-fh16-1')
 * @param width - Optional width for resizing
 * @returns URL string
 */
export function getCloudinaryUrl(publicId: string, width?: number): string {
  let url = `https://res.cloudinary.com/dqhesb1lq/image/upload/`;
  
  // Add transformations
  const transformations = [];
  if (width) transformations.push(`w_${width}`);
  transformations.push('f_auto', 'q_auto'); // auto format and quality
  
  if (transformations.length > 0) {
    url += transformations.join(',') + '/';
  }
  
  url += publicId;
  
  return url;
}

/**
 * Helper to generate thumbnail URL
 */
export function getThumbnailUrl(publicId: string): string {
  return getCloudinaryUrl(publicId, 400);
}

/**
 * Helper to generate full-size image URL
 */
export function getFullImageUrl(publicId: string): string {
  return getCloudinaryUrl(publicId, 1920);
}
