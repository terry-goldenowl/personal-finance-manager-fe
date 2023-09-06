import React, { useEffect, useState } from "react";
import Modal from "../../../components/modal/Modal";
import CategoriesService from "../../../services/categories";
import SelectWithImage from "../../../components/elements/SelectWithImage";
import WalletsService from "../../../services/wallets";
import Input from "../../../components/elements/Input";
import Select from "../../../components/elements/Select";
import monthsGetter from "../../../utils/monthsGetter";
import yearsGetter from "../../../utils/yearsGetter";
import ReportsService from "../../../services/reports";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import formatCurrency from "../../../utils/currencyFormatter";
import PlansService from "../../../services/plans";
import { toast } from "react-toastify";

function AddCategoryPlan({
  onClose,
  onUpdateSuccess,
  _month,
  _year,
  category = null,
}) {
  const [categories, setCategories] = useState([]);
  const [categoryChosen, setCategoryChosen] = useState();
  const [wallets, setWallets] = useState([]);
  const [walletChosen, setWalletChosen] = useState();
  const [amount, setAmount] = useState();
  const [formattedAmount, setFormattedAmount] = useState();
  const [month, setMonth] = useState(
    _month
      ? monthsGetter().find((month) => month.id + 1 === _month)
      : monthsGetter().find((month) => month.id === new Date().getMonth())
  );
  const [year, setYear] = useState(
    _year
      ? { id: _year, name: _year }
      : yearsGetter(20).find((year) => year.id === new Date().getFullYear())
  );
  const [errors, setErrors] = useState(null);
  const [lastMonthValue, setLastMonthValue] = useState({});

  const getCategories = async () => {
    const data = await CategoriesService.getCategories({ type: "expenses" });
    setCategories(data.data.categories);
    if (category) setCategoryChosen(category);
    else setCategoryChosen(data.data.categories[0]);
  };

  const getWallets = async () => {
    const data = await WalletsService.getWallets();
    setWallets(data.data.wallets);
    setWalletChosen(data.data.wallets[0]);
  };

  const getReport = async () => {
    const responseData = await ReportsService.getReports({
      year: year.id,
      month: month.id,
      report_type: "categories",
      // wallet: 2,
    });

    if (responseData.data.reports[categoryChosen.name])
      setLastMonthValue(responseData.data.reports[categoryChosen.name].amount);
  };

  useEffect(() => {
    getWallets();
    getCategories();
  }, []);

  useEffect(() => {
    if (year && month && categoryChosen && walletChosen) getReport();
  }, [year, month, categoryChosen, walletChosen]);

  const handleAmountChange = (event) => {
    setErrors((prev) => {
      if (prev && prev.amount) delete prev.amount;
      return prev;
    });

    const { value } = event.target;
    const cleanAmount = value.replace(/[^0-9]/g, "");

    if (value.length > 0 && isNaN(parseInt(value)) && parseInt(value) <= 0) {
      setErrors((prev) => {
        return { ...prev, amount: "Invalid amount!" };
      });
    } else {
      setFormattedAmount(cleanAmount.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
      setAmount(cleanAmount);
    }
  };

  const handleAddPlan = async () => {
    setErrors(null);

    if (!amount || amount.length === 0) {
      return setErrors((prev) => {
        return { ...prev, amount: "Amount is required!" };
      });
    }

    const data = {
      wallet_id: walletChosen.id,
      category_id: categoryChosen.id,
      month: month.id + 1,
      year: year.id,
      amount,
    };

    const responseData = await PlansService.createCategoryPlan(data);

    if (responseData.status === "success") {
      onClose();
      toast.success("Create plan successfully!");
      onUpdateSuccess();
    } else {
      toast.error(responseData.error);
    }
  };

  return (
    <Modal
      onAccept={handleAddPlan}
      onClose={onClose}
      title={"Add category plan"}
      width={"w-1/4"}
    >
      {categoryChosen && (
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faInfoCircle} className="text-blue-600" />
          {!isNaN(lastMonthValue) && (
            <p className="text-sm text-blue-600 italic">
              Total expenses of all transactions belong to this category last
              month is{" "}
              <span className="font-bold">
                {formatCurrency(lastMonthValue)}
              </span>
            </p>
          )}
          {!lastMonthValue && (
            <p className="text-sm text-blue-600 italic">
              You didn't spend anything of this category last month!
            </p>
          )}
        </div>
      )}
      <SelectWithImage
        data={wallets}
        label={"Wallet:"}
        selected={walletChosen}
        setSelected={setWalletChosen}
        required
      />
      <SelectWithImage
        data={categories.map((cate) => {
          return {
            ...cate,
            image: process.env.REACT_APP_API_HOST + cate.image,
          };
        })}
        label={"Category:"}
        selected={categoryChosen}
        setSelected={setCategoryChosen}
        required
      />
      <Input
        label={"Intended amount"}
        name={"amount"}
        type={"text"}
        required
        size="small"
        value={formattedAmount}
        onChange={handleAmountChange}
        error={errors && errors.amount}
      />
      <div className="flex gap-2">
        <div className="w-1/2">
          <Select
            label={"Month"}
            required
            selected={month}
            setSelected={setMonth}
            data={monthsGetter()}
          />
        </div>
        <div className="w-1/2">
          <Select
            label={"Year"}
            required
            selected={year}
            setSelected={setYear}
            data={yearsGetter(20)}
          />
        </div>
      </div>
    </Modal>
  );
}

export default AddCategoryPlan;
