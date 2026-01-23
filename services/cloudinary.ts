import cloudinary from '../lib/cloudinary';

export type CloudinaryUploadResult = {
  secure_url: string;
  public_id: string;
};

export async function uploadToCloudinary(
  file: File
): Promise<CloudinaryUploadResult> {
  const MAX_FILE_BYTES = 5 * 1024 * 1024; // adjust to product limits
  if (!file.type || !file.type.startsWith('image/')) {
    throw new Error('Only image uploads are allowed');
  }
  if (file.size > MAX_FILE_BYTES) {
    throw new Error('Image exceeds the allowed size limit');
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const base64 = buffer.toString('base64');
  const dataURL = `data:${file.type};base64,${base64}`;

  try {
    const result = await cloudinary.uploader.upload(dataURL, {
      folder: 'tech-blog',
      transformation: [{ format: 'webp' }],
    });

    return {
      secure_url: result.secure_url,
      public_id: result.public_id,
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Failed to upload image');
  }
}

export async function deleteFromCloudinary(publicId: string) {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Cloudinary delete error:', error);
  }
}
