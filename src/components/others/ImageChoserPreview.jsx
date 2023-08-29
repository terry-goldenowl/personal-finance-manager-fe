import React, { useState } from "react";
import Input from "../elements/Input";

function ImageChoserPreview({
  setImage,
  errors,
  setErrors,
  defaultPreview = "",
}) {
  const [preview, setPreview] = useState(defaultPreview);

  const handleFileChange = (event) => {
    // CLEAR ANY PHOTO STATE BEFORE
    setImage(null);

    const file = event.target.files[0];

    setErrors((prev) => {
      if (prev && prev.image) delete prev.image;
      return prev;
    });

    if (file) {
      const fileName = file.name;
      const fileExtension = fileName.split(".").pop().toLowerCase();
      const imageExtensions = ["jpg", "jpeg", "png", "gif"];

      if (!imageExtensions.includes(fileExtension)) {
        setPreview(null);
        setErrors((prev) => {
          return { ...prev, image: "Must be an image!" };
        });
        return;
      }

      setImage(file);

      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  };

  return (
    <>
      <Input
        label={"Image"}
        type={"file"}
        name={"image"}
        size="small"
        accept={"image/*"}
        onChange={handleFileChange}
        error={(errors && errors.image) || null}
      />

      {/* PHOTO PREVIEW */}
      {preview && (
        <div className="overflow-hidden mb-3 flex justify-center">
          <img
            src={preview}
            alt=""
            className="object-cover max-h-56 w-72 rounded-lg"
          />
        </div>
      )}
    </>
  );
}

export default ImageChoserPreview;
