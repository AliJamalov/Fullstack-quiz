import React, { useRef, useState } from "react";
import { useAuthStore } from "../store/authStore";
import { CgProfile } from "react-icons/cg";
import { TbMoodEdit } from "react-icons/tb";
import { MdLogout } from "react-icons/md";
import { axiosInstance } from "../utils/axios";
import { uploadSingleImage } from "../utils/cloudinary";
import toast from "react-hot-toast";

const Profile = () => {
  const { user, logout } = useAuthStore();
  const inputRef = useRef(null);

  const [username, setUsername] = useState(user?.username);
  const [prevImage, setPrevImage] = useState(user?.profilePic || null);
  const [updatedProfilePic, setUpdatedProfilePic] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setUpdatedProfilePic(file);
        setPrevImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let uploadedImgUrl = null;

      if (updatedProfilePic) {
        uploadedImgUrl = await uploadSingleImage(updatedProfilePic);
        if (!uploadedImgUrl) {
          toast.error("Image uploading failed");
          return;
        }
      }

      const updatedData = { username };
      if (uploadedImgUrl) updatedData.profilePic = uploadedImgUrl;

      await axiosInstance.patch("/users", updatedData);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto px-[50px] pt-[20px] flex flex-col items-center">
      <div onClick={logout} className="flex items-center gap-3 mb-4 bg-yellow-500 rounded-md px-2 py-1 cursor-pointer">
        <MdLogout color="white" size={25} />
        <p className="font-medium text-white text-md">Logout</p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
        <div>
          {prevImage ? (
            <img className="w-[200px] h-[200px] rounded-full object-cover" src={prevImage} alt="profile-preview" />
          ) : (
            <CgProfile color="white" className="w-[200px] h-[200px]" />
          )}
        </div>

        <div className="flex justify-end mt-1 ml-[90px]">
          <TbMoodEdit onClick={() => inputRef?.current.click()} size={25} color="yellow" className="cursor-pointer" />
        </div>

        <input onChange={handleImageChange} accept="image/*" ref={inputRef} type="file" className="hidden" />

        <label className="block mt-3 mb-1 text-white">Username</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border border-white p-2 outline-none rounded-md text-white bg-transparent w-[300px]"
          type="text"
          placeholder="Username"
        />
        <div className="mt-5 w-full flex justify-center">
          <button
            disabled={loading}
            className={`${
              loading ? "bg-yellow-300" : "bg-yellow-500"
            } cursor-pointer text-white p-2 rounded-md w-full max-w-[300px]`}
            type="submit"
          >
            {loading ? "Loading..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
