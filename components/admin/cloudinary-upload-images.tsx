"use client";
import { CldUploadButton } from "next-cloudinary";
import React, { useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";

interface CloudinaryUploadImagesProps {
  handleUploadSuccess: (uploaded: any) => void;
}

const CloudinaryUploadImages = ({
  handleUploadSuccess,
}: CloudinaryUploadImagesProps) => {
  const [IsDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  return (
    <div>
      <p>
        <IoCloudUploadOutline size={22} className="text-custom-font" />
      </p>
      <p className="hover:underline">
        <CldUploadButton
          options={{ multiple: true }}
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
          onUpload={handleUploadSuccess}
          onOpen={() => {
            setTimeout(() => (document.body.style.pointerEvents = ""), 0);
            setIsDialogOpen && setIsDialogOpen(true);
          }}
          onClose={() => {
            setTimeout(() => (document.body.style.pointerEvents = "none"), 0);
          }}
        >
          <span>
            Brows to <span className="text-blue-700 underline">upload</span>{" "}
            images
          </span>
        </CldUploadButton>
      </p>
    </div>
  );
};

export default CloudinaryUploadImages;
