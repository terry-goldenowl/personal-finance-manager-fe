import React, { useEffect, useState } from "react";
import Modal from "../../../components/modal/Modal";
import Input from "../../../components/elements/Input";
import Select from "../../../components/elements/Select";
import ImageChoserPreview from "../../../components/others/ImageChoserPreview";
import CategoriesService from "../../../services/categories";
import { toast } from "react-toastify";

const types = [
  { id: 1, name: "expenses" },
  { id: 2, name: "incomes" },
];

function AddCategories({ onClose, onAddSuccess, category = null }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [type, setType] = useState(types[0]);
  const [errors, setErrors] = useState(null);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (category) {
      setName(category.name);
      setType(types.find((t) => t.name === category.type));
    }
  }, []);

  const saveCategory = async () => {
    try {
      let haveErrors = false;
      setErrors(null);
      setProcessing(true);

      if (name.length === 0) {
        haveErrors = true;
        setErrors((prev) => {
          return { ...prev, name: "Name is required!" };
        });
      }

      if (!category && !image) {
        haveErrors = true;
        setErrors((prev) => {
          return { ...prev, image: "Image is required!" };
        });
      }

      if (!haveErrors) {
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
          onClose();
          onAddSuccess(category ? "update" : "create", category !== null);
        }
      }
    } catch (e) {
      toast.error(e.response.data.message);
    }
    setProcessing(false);
  };

  return (
    <Modal
      title={category ? "Update category" : "Add new category"}
      onClose={onClose}
      onAccept={saveCategory}
      width={"lg:w-1/4 sm:w-3/5 md:1/2 w-11/12"}
      processing={processing}
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
          defaultPreview={category && category.image}
          required
        />
      </div>
    </Modal>
  );
}

export default AddCategories;
