import React, { useEffect, useState } from "react";
import ModalWithNothing from "../../../components/modal/ModalWithNothing";
import WalletsService from "../../../services/wallets";
import SelectWithImage from "../../../components/elements/SelectWithImage";
import CategoriesService from "../../../services/categories";
import Input from "../../../components/elements/Input";
import format from "date-fns/format";
import TransactionsService from "../../../services/transactions";
import { motion } from "framer-motion";
import ImageChoserPreview from "../../../components/others/ImageChoserPreview";
import { toast } from "react-toastify";
import formatCurrency from "../../../utils/currencyFormatter";

function AddTransaction({
  isAdding,
  setIsAdding,
  type,
  transaction = null,
  isDeleting,
  setIsDeleting,
  onAddingSuccess,
}) {
  const [categories, setCategories] = useState([]);
  const [wallets, setWallets] = useState([]);
  const [categorySelected, setCategorySelected] = useState({});
  const [walletSelected, setWalletSelected] = useState({});
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState();
  const [formattedAmount, setFormattedAmount] = useState("");
  const [photo, setPhoto] = useState(null);
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    getWallets();
    getCategories();
  }, []);

  useEffect(() => {
    if (transaction) {
      setCategorySelected(
        categories.length > 0 &&
          categories.find((cate) => cate.name == transaction.category.name)
      );
      setWalletSelected(
        wallets.length > 0 &&
          wallets.find((wallet) => wallet.id == transaction.wallet_id)
      );
      setTitle(transaction.title);
      setAmount(transaction.amount);
      setDate(new Date(transaction.date));
      setDescription(transaction.description || "");
    } else {
      setWalletSelected(
        wallets.find((wallet) => wallet.default == 1) || wallets[0]
      );
      setCategorySelected(categories[0]);
    }
  }, [wallets, categories]);

  const getWallets = async () => {
    const data = await WalletsService.getWallets();
    setWallets(data.data.wallets);
  };

  const getCategories = async () => {
    const data = await CategoriesService.getCategories({ type });
    setCategories(data.data.categories);
  };

  const saveTransaction = async () => {
    setErrors(null);

    if (!title || title.length === 0) {
      return setErrors((prev) => {
        return { ...prev, title: "Title is required!" };
      });
    }

    if (!amount || amount <= 0) {
      return setErrors((prev) => {
        return { ...prev, amount: "Amount is invalid!" };
      });
    }

    if (!errors) {
      const data = {
        wallet_id: walletSelected.id,
        category_id: categorySelected.id,
        title,
        amount,
        date: format(new Date(date), "yyyy/MM/dd"),
        image: photo,
        description,
      };

      let responseData;
      if (!transaction) {
        responseData = await TransactionsService.createTransaction(data);
      } else {
        responseData = await TransactionsService.updateTransaction(
          data,
          transaction.id
        );
      }

      if (responseData.status === "success") {
        setIsAdding(false);
        onAddingSuccess(transaction ? "update" : "create");
      } else {
        setErrors(responseData.error);
      }
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
  };

  const handleAmountChange = (event) => {
    setErrors((prev) => {
      if (prev && prev.amount) delete prev.amount;
      return prev;
    });

    const { value } = event.target;
    const cleanAmount = value.replace(/[^0-9]/g, "");

    if (value.length > 0 && isNaN(parseInt(value))) {
      setErrors((prev) => {
        return { ...prev, amount: "Invalid amount!" };
      });
    } else {
      setFormattedAmount(cleanAmount.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
      setAmount(cleanAmount);
    }
  };

  return (
    <>
      <ModalWithNothing onClose={handleCancel} width={"w-1/2"}>
        {/*HEADER*/}
        <div className="flex items-start justify-center p-5 border-b border-solid border-slate-200 rounded-t max-h-screen">
          <h3 className="text-2xl text-center">
            {" "}
            {transaction ? "Transaction detail" : `Add ${type}`}
          </h3>
        </div>

        {/*BODY*/}
        <div className="relative px-6 py-4 flex-auto">
          <div className="flex">
            {/* LEFT SIDE INPUTS (REQUIRED) */}
            <div className="p-3 border-r border-gray-200 w-1/2">
              <SelectWithImage
                data={wallets}
                label={"Wallets"}
                selected={walletSelected}
                setSelected={setWalletSelected}
                required
              />
              <SelectWithImage
                data={categories.map((category) => {
                  return {
                    ...category,
                    image: process.env.REACT_APP_API_HOST + category.image,
                  };
                })}
                label={"Category"}
                selected={{
                  ...categorySelected,
                  image:
                    process.env.REACT_APP_API_HOST + categorySelected?.image,
                }}
                setSelected={setCategorySelected}
                required
              />
              <Input
                label={"Title"}
                type={"text"}
                name={"title"}
                size="small"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                error={(errors && errors.title) || null}
              />
              <Input
                label={"Amount"}
                type={"text"}
                name={"amount"}
                size="small"
                value={formattedAmount}
                onChange={handleAmountChange}
                required
                error={(errors && errors.amount) || null}
              />
              <Input
                label={"Date"}
                type={"date"}
                name={"date"}
                size="small"
                value={format(new Date(date), "yyyy-MM-dd")}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            {/* RIGHT SIDE INPUTS (OPTIONAL)*/}
            <div className="p-3 w-1/2">
              <ImageChoserPreview
                image={photo}
                setImage={setPhoto}
                errors={errors}
                setErrors={setErrors}
                defaultPreview={
                  transaction
                    ? process.env.REACT_APP_API_HOST + transaction.image
                    : ""
                }
              />

              {/* DESCRIPTION */}
              <div>
                <label htmlFor="description">Description</label>
                <textarea
                  className="block border-gray-300 ring-inset ring-gray-300 focus:ring-purple-400 w-full outline-none shadow-sm rounded-md py-1.5 px-3 text-sm ring-1"
                  type={"text"}
                  name={"description"}
                  size="small"
                  rows={4}
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/*FOOTER*/}
        <div
          className={
            "flex items-center px-6 py-4 border-t border-solid border-slate-200 rounded-b " +
            (transaction ? "justify-between" : "justify-end")
          }
        >
          {transaction && (
            <div>
              <button
                className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-2 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                onClick={() => setIsDeleting(true)}
              >
                Delete
              </button>
            </div>
          )}
          <div>
            <button
              className="text-gray-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={handleCancel}
            >
              Cancle
            </button>
            <button
              className="bg-purple-500 text-white active:bg-purple-600 font-bold uppercase text-sm px-6 py-2 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={saveTransaction}
            >
              {!transaction ? "Add transaction" : "Update transaction"}
            </button>
          </div>
        </div>
      </ModalWithNothing>
    </>
  );
}

export default AddTransaction;
