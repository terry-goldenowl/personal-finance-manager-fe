import React, { useEffect, useState } from "react";
import Modal from "../../../components/modal/Modal";
import Input from "../../../components/elements/Input";
import ImageChoserPreview from "../../../components/others/ImageChoserPreview";
import WalletsService from "../../../services/wallets";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { walletActions } from "../../../stores/wallets";

function AddWallet({ onClose, onAddSuccess, wallet = null, isNew = null }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState(null);
  const [isDefault, setIsDefault] = useState(false);
  const [title, setTitle] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (wallet) {
      setName(wallet.name);
      setTitle("Update wallet");
      setIsDefault(wallet.default);
    } else {
      if (isNew) {
        setTitle("Set up your default wallet");
        setIsDefault(true);
      } else {
        setTitle("Add new wallet");
      }
    }
  }, []);

  const saveWallet = async () => {
    setErrors(null);

    if (name.length === 0) {
      return setErrors((prev) => {
        return { ...prev, name: "Name is required!" };
      });
    }

    if (!wallet && !image) {
      return setErrors((prev) => {
        return { ...prev, image: "Image is required!" };
      });
    }

    let data = { name, default: isDefault ? 1 : 0 };

    if (image) {
      data = { ...data, image };
    }

    console.log(data);

    let responseData;
    if (!wallet) {
      responseData = await WalletsService.createWallet(data);
    } else {
      responseData = await WalletsService.updateWallet(data, wallet.id);
    }

    if (responseData.status === "success") {
      if (isNew) {
        dispatch(walletActions.setHaveDefaultWallet(true));
        navigate("/transactions");
      } else {
        onClose();
        onAddSuccess(wallet ? "update" : "create");
      }
    } else {
      setErrors(responseData.error);
    }
  };

  return (
    <Modal
      title={title}
      onClose={onClose}
      onAccept={saveWallet}
      width={"w-1/4"}
      action={isNew ? "yes" : "yesno"}
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

        <ImageChoserPreview
          image={image}
          setImage={setImage}
          errors={errors}
          setErrors={setErrors}
          defaultPreview={
            wallet && process.env.REACT_APP_API_HOST + wallet.image
          }
          required
        />

        <div className="flex gap-1 items-center">
          <input
            type="checkbox"
            name="default"
            id="default"
            checked={isDefault}
            onChange={(event) => setIsDefault(event.target.checked)}
            disabled={isNew}
          />
          <label htmlFor="default">Set as default wallet</label>
        </div>
      </div>
    </Modal>
  );
}

export default AddWallet;
