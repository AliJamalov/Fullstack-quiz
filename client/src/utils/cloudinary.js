import axios from "axios";

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

// Функция для загрузки одного нескольких изображений
export const uploadImages = async (files) => {
  const uploadedImageUrls = [];

  for (const file of files) {
    const formDataImage = new FormData();
    formDataImage.append("file", file);
    formDataImage.append("upload_preset", uploadPreset);
    formDataImage.append("folder", "quiz");

    const uploadRes = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formDataImage);

    uploadedImageUrls.push(uploadRes.data.secure_url);
  }
  return uploadedImageUrls;
};

// Функция для загрузки одного изображения
export const uploadSingleImage = async (file) => {
  try {
    const formDataImage = new FormData();
    formDataImage.append("file", file);
    formDataImage.append("upload_preset", uploadPreset);
    formDataImage.append("folder", "quiz");

    const uploadRes = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formDataImage);

    return uploadRes.data.secure_url;
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
};
