import type { UploadApiResponse } from 'cloudinary';
import cloudinary from '../config/cloudinary.js';
import { NotFoundError } from '../errors/NotFoundError.js';
import { prisma } from '../lib/prisma.js';
import type { WardrobeItemImage } from '../generated/prisma/client.js';

interface UploadImagePayload {
  itemId: string;
  userId: string;
  file: Express.Multer.File;
}

export const uploadImage = async ({
  itemId,
  userId,
  file,
}: UploadImagePayload): Promise<WardrobeItemImage> => {
  const wardrobeItem = await prisma.wardrobeItem.findFirst({
    where: { userId, id: itemId, archivedAt: null },
  });

  if (!wardrobeItem) {
    throw new NotFoundError('Wardrobe item not found');
  }

  const uploadResult = await new Promise<UploadApiResponse>(
    (resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'wardrobe',
          resource_type: 'image',
        },
        (error, result) => {
          if (error) {
            reject(error);
            return;
          }

          resolve(result as UploadApiResponse);
        },
      );

      uploadStream.end(file.buffer);

      return;
    },
  );

  const { public_id, secure_url, version, width, height, format } =
    uploadResult;

  const imageCount = await prisma.wardrobeItemImage.count({
    where: { wardrobeItemId: itemId },
  });

  const image = await prisma.wardrobeItemImage.create({
    data: {
      wardrobeItemId: itemId,
      cloudinaryPublicId: public_id,
      secureUrl: secure_url,
      position: imageCount,
      version,
      width,
      height,
      format,
    },
  });

  return image;
};
