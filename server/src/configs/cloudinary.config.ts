import envConfig from '@config/env.config';
import { v2 as cloudinary } from 'cloudinary';

// Return "https" URLs by setting secure: true
const cloudinaryInstance = cloudinary;
cloudinary.config({
  api_key: envConfig.CLOUDINARY_API_KEY,
  api_secret: envConfig.CLOUDINARY_API_SECRET,
  cloud_name: envConfig.CLOUDINARY_CLOUD_NAME,
  secure: true,
});

export default cloudinaryInstance;
