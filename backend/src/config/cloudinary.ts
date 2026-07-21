import { v2 as cloudinary } from 'cloudinary';
import { env } from './env.js';

cloudinary.config({
  cloud_name: env.data.CLOUDINARY_CLOUD_NAME,
  api_key: env.data.CLOUDINARY_API_KEY,
  api_secret: env.data.CLOUDINARY_API_SECRET,
});

export default cloudinary;
