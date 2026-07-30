import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import env from "../config/env.js";

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    console.log("File uploaded on cloundinary", response.url);

    fs.unlinkSync(localFilePath);
    return {
      url: response.url,
      public_id: response.public_id,
    };
  } catch (error) {
    fs.unlinkSync(localFilePath);
    return null;
  }
};

const deleteFromCloudinary = async (public_id) => {
  try {
    if (!public_id) return null;

    const response = await cloudinary.uploader.destroy(public_id, {
      resource_type: "auto",
    });

    console.log("File deleted successfully from Cloudinary");
    return response;
  } catch (error) {
    console.error("Error deleting file from Cloudinary:", error);
    return null;
  }
};

export { uploadOnCloudinary, deleteFromCloudinary };
