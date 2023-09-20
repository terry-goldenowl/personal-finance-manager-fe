import React, { useEffect, useState } from "react";
import Modal from "../../../components/modal/Modal";
import SelectWithImage from "../../../components/elements/SelectWithImage";
import Select from "../../../components/elements/Select";
import Input from "../../../components/elements/Input";
import monthsGetter from "../../../utils/monthsGetter";
import yearsGetter from "../../../utils/yearsGetter";
import ReportsService from "../../../services/reports";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import formatCurrency from "../../../utils/currencyFormatter";
import WalletsService from "../../../services/wallets";
import PlansService from "../../../services/plans";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

function AddMonthPlan({ onClose, onAddingSuccess, _month, _year }) {
  const { wallets, walletChosen } = useSelector((state) => state.wallet);
  const [walletSelected, setWalletSelected] = useState(walletChosen);
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
  const [lastMonthValue, setLastMonthValue] = useState(null);
  const [loadingTotalLastMonth, setLoadingTotalLastMonth] = useState(false);
  const [processingSave, setProcessingSave] = useState(false);

  const getReport = async () => {
    try {
      setLoadingTotalLastMonth(true);
      const responseData = await ReportsService.getReports({
        year: year.id,
        report_type: "expenses-incomes",
        wallet: walletSelected?.id,
      });

      if (responseData.data.reports[month.id + ""]) {
        const lastMonthExpense =
          responseData.data.reports[month.id + ""].expenses;
        setLastMonthValue(lastMonthExpense);
      } else {
        setLastMonthValue(0);
      }

      setLoadingTotalLastMonth(false);
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  useEffect(() => {
    if (walletSelected) getReport();
  }, [year, month, walletSelected]);

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

  const handleAddPlan = async () => {
    try {
      setErrors(null);
      setProcessingSave(true);

      if (!amount || amount.length === 0) {
        return setErrors((prev) => {
          return { ...prev, amount: "Amount is required!" };
        });
      }

      const data = {
        wallet_id: walletSelected.id,
        month: month.id + 1,
        year: year.id,
        amount,
      };

      const responseData = await PlansService.createMonthPlan(data);

      if (responseData.status === "success") {
        onClose();
        onAddingSuccess();
        toast.success("Create plan successfully!");
      }
      setProcessingSave(false);
    } catch (e) {
      setProcessingSave(false);
      toast.error(e.response.data.message);
    }
  };

  return (
    <Modal
      onAccept={handleAddPlan}
      onClose={onClose}
      title={"Add month plan"}
      width={"lg:w-1/4 sm:w-1/2 w-11/12"}
      processing={processingSave}
    >
      {month && year && (
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faInfoCircle} className="text-blue-600" />
          {!loadingTotalLastMonth && lastMonthValue > 0 && (
            <p className="text-sm text-blue-600 italic">
              Total expenses of all transactions last month is{" "}
              <span className="font-bold">
                {formatCurrency(lastMonthValue)}
              </span>
            </p>
          )}
          {!loadingTotalLastMonth && lastMonthValue === 0 && (
            <p className="text-sm text-blue-600 italic">
              You didn't spend anything last month!
            </p>
          )}
          {loadingTotalLastMonth && (
            <p className="text-sm text-blue-600 italic">
              Loading total expenses last month ...
            </p>
          )}
        </div>
      )}
      <SelectWithImage
        data={wallets}
        label={"Wallet"}
        selected={walletSelected}
        setSelected={setWalletSelected}
        required
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
    </Modal>
  );
}

export default AddMonthPlan;
