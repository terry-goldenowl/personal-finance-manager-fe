import React, { useEffect, useState } from "react";
import Modal from "../../../components/modal/Modal";
import Input from "../../../components/elements/Input";
import Select from "../../../components/elements/Select";
import ImageChoserPreview from "../../../components/others/ImageChoserPreview";
import CategoriesService from "../../../services/categories";

const types = [
  { id: 1, name: "expenses" },
  { id: 2, name: "incomes" },
];

function AddCategories({ onClose, onAddSuccess, category = null }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [type, setType] = useState(types[0]);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    if (category) {
      setName(category.name);
      setType(types.find((t) => t.name === category.type));
    }
  }, []);

  const saveCategory = async () => {
    setErrors(null);

    if (name.length === 0) {
      setErrors((prev) => {
        return { ...prev, name: "Name is required!" };
      });
    }

    if (!category && !image) {
      setErrors((prev) => {
        return { ...prev, image: "Image is required!" };
      });
    }

    if (!errors) {
      let data = { name, type: type.name };
      if (image) {
        data = { ...data, image };
      }

      let responseData;
      if (!category) {
        responseData = await CategoriesService.createCategory(data);
      } else {
        responseData = await CategoriesService.updateCategory(
          data,
          category.id
        );
      }

      if (responseData.status === "success") {
        onAddSuccess(category ? "update" : "create");
      } else {
        setErrors(responseData.error);
      }
    }
  };

  return (
    <Modal
      title={category ? "Update category" : "Add new categories"}
      onClose={onClose}
      onAccept={saveCategory}
      width={"w-1/4"}
    >
      <div className="">
        <Input
          label={"Name"}
          type={"text"}
          name={"title"}
          size="small"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={(errors && errors.name) || null}
          required
        />

        <Select
          label={"Type"}
          selected={type}
          setSelected={setType}
          data={types}
          required
        />

        <ImageChoserPreview
          image={image}
          setImage={setImage}
          errors={errors}
          setErrors={setErrors}
          defaultPreview={
            category && process.env.REACT_APP_API_HOST + category.image
          }
          required
        />
      </div>
    </Modal>
  );
}

export default AddCategories;
