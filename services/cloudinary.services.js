import { v2 as cloudinary } from "cloudinary";
import config from "dotenv/config";
import fs from "fs";

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (localFilePath) => {
  try {
    console.log("localfilepath>>>>>>>>>>>>>>>>>>>>>>>>", localFilePath);

    if (!localFilePath) return null;

    const uploadResult = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: "images",
    });

    // Delete the local file after upload
    fs.unlinkSync(localFilePath);
    return uploadResult;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    console.log("Upload on cloudinary error: ", error);
    return null;
  }
};
