import React, { useState } from "react";
import { useRef } from "react";
import { axiosInstance } from "../../utils/axios";
import { uploadSingleImage } from "../../utils/cloudinary";
import toast from "react-hot-toast";
import { PiSpinner } from "react-icons/pi";

const AddQuizModal = ({ toggleAddModal, fetchQuizes }) => {
  const inputRef = useRef();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [prevImage, setPrevImage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImage(file);
        setPrevImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !image) return;
    setLoading(true);
    try {
      const uploadedImageUrl = await uploadSingleImage(image);

      if (uploadedImageUrl) {
        await axiosInstance.post("/quizes", {
          title,
          description,
          image: uploadedImageUrl,
        });
        toast.success("Quiz added successfuly!");
        toggleAddModal();
        fetchQuizes();
      } else {
        toast.error("Image upload failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Add quiz</h2>
        {/* Title */}
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Title"
          className="w-full p-2 border rounded-lg mb-3"
        />
        {/* Description */}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full p-2 border rounded-lg mb-3"
        />
        {/* Prev image */}
        {prevImage && (
          <img
            src={prevImage}
            onChange={handleImageChange}
            className="rounded mb-3 w-[80px] h-[80px]"
            alt="prev-image"
          />
        )}{" "}
        {/* Upload image */}
        <input onChange={handleImageChange} ref={inputRef} type="file" accept="image/*" className="hidden" />
        <button
          onClick={() => inputRef.current.click()}
          className="bg-yellow-400 text-white rounded p-2 cursor-pointer"
        >
          Upload image
        </button>
        <div className="flex justify-end gap-2">
          <button onClick={toggleAddModal} className="px-4 py-2 bg-gray-300 rounded-lg cursor-pointer">
            Close
          </button>
          <button
            disabled={loading}
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer"
          >
            {loading ? <PiSpinner size={20} className="animate-spin" /> : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddQuizModal;
