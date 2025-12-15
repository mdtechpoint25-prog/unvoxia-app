import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(
  file: File | Buffer,
  options?: {
    folder?: string;
    public_id?: string;
    transformation?: any;
  }
) {
  try {
    let fileBuffer: Buffer;

    if (file instanceof File) {
      const arrayBuffer = await file.arrayBuffer();
      fileBuffer = Buffer.from(arrayBuffer);
    } else {
      fileBuffer = file;
    }

    const base64File = `data:image/png;base64,${fileBuffer.toString('base64')}`;

    const result = await cloudinary.uploader.upload(base64File, {
      folder: options?.folder || 'noma',
      public_id: options?.public_id,
      transformation: options?.transformation,
      resource_type: 'auto',
    });

    return {
      url: result.secure_url,
      publicId: result.public_id,
      format: result.format,
      width: result.width,
      height: result.height,
    };
  } catch (error) {
    console.error('❌ Error uploading to Cloudinary:', error);
    throw error;
  }
}

export async function deleteImage(publicId: string) {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error('❌ Error deleting from Cloudinary:', error);
    throw error;
  }
}

export async function getImageUrl(publicId: string, transformation?: any) {
  return cloudinary.url(publicId, {
    secure: true,
    transformation,
  });
}

export { cloudinary };
