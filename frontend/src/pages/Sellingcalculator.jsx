import { useState } from "react";
import {
  ArrowLeft,
  Calculator,
  IndianRupee,
  Truck,
  Package,
  Wallet,
  TrendingUp,
  RotateCcw,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function SellingCalculator() {
  const navigate = useNavigate();

  const [commodity, setCommodity] = useState("Tomato");
  const [mandi, setMandi] = useState("Mysuru Mandi");

  const [quantity, setQuantity] = useState("10");
  const [price, setPrice] = useState("2400");

  const [transport, setTransport] = useState("500");
  const [loading, setLoading] = useState("200");
  const [marketFee, setMarketFee] = useState("100");
  const [otherExpenses, setOtherExpenses] = useState("100");

  const number = (value) => Math.max(0, Number(value) || 0);

  const totalQuantity = number(quantity);
  const sellingPrice = number(price);

  const grossRevenue = totalQuantity * sellingPrice;

  const totalExpenses =
    number(transport) +
    number(loading) +
    number(marketFee) +
    number(otherExpenses);

  const netRevenue = grossRevenue - totalExpenses;

  const formatPrice = (value) =>
    new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 2,
    }).format(value);

  const resetCalculator = () => {
    setCommodity("Tomato");
    setMandi("Mysuru Mandi");
    setQuantity("10");
    setPrice("2400");
    setTransport("500");
    setLoading("200");
    setMarketFee("100");
    setOtherExpenses("100");
  };

  const expenseFields = [
    {
      label: "Transportation Charges",
      value: transport,
      setter: setTransport,
      icon: Truck,
      description: "Cost of transporting crops to the mandi",
    },
    {
      label: "Loading & Unloading",
      value: loading,
      setter: setLoading,
      icon: Package,
      description: "Labour and handling charges",
    },
    {
      label: "Market Fees",
      value: marketFee,
      setter: setMarketFee,
      icon: Wallet,
      description: "Market-related charges",
    },
    {
      label: "Other Expenses",
      value: otherExpenses,
      setter: setOtherExpenses,
      icon: IndianRupee,
      description: "Any additional selling expenses",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">

      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate("/dashboard")}
          className="mb-4 flex items-center gap-2 text-sm font-medium text-green-700 hover:text-green-900"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>

        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-green-100 p-3 text-green-700">
            <Calculator size={25} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
              Selling Calculator
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Calculate your estimated earnings after selling expenses.
            </p>
          </div>
        </div>
      </div>

      {/* Demo Notice */}
      <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
        <strong>Sample calculation:</strong> The initial values are
        demonstration figures. Enter your actual market price and
        expenses before making a selling decision.
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

        {/* Input Section */}
        <div className="space-y-6 xl:col-span-2">

          {/* Crop Details */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

            <h2 className="mb-5 text-lg font-bold text-slate-800">
              1. Crop & Market Details
            </h2>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Select Commodity
                </label>

                <select
                  value={commodity}
                  onChange={(e) => setCommodity(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-green-500"
                >
                  <option>Tomato</option>
                  <option>Onion</option>
                  <option>Potato</option>
                  <option>Green Chilli</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Select Mandi
                </label>

                <select
                  value={mandi}
                  onChange={(e) => setMandi(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-green-500"
                >
                  <option>Mysuru Mandi</option>
                  <option>Bengaluru Mandi</option>
                  <option>Mandya Mandi</option>
                  <option>Hassan Mandi</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Quantity (Quintals)
                </label>

                <input
                  type="number"
                  min="0"
                  step="any"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-green-500"
                  placeholder="Enter quantity"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Selling Price (₹ / Quintal)
                </label>

                <input
                  type="number"
                  min="0"
                  step="any"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-green-500"
                  placeholder="Enter selling price"
                />
              </div>

            </div>
          </div>

          {/* Expense Details */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

            <h2 className="mb-2 text-lg font-bold text-slate-800">
              2. Selling Expenses
            </h2>

            <p className="mb-5 text-sm text-slate-500">
              Enter the expenses required to sell and transport your crops.
            </p>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

              {expenseFields.map((field) => {
                const Icon = field.icon;

                return (
                  <div key={field.label}>

                    <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                      <Icon size={17} className="text-green-700" />
                      {field.label}
                    </label>

                    <div className="relative">
                      <span className="absolute left-3 top-3 text-slate-500">
                        ₹
                      </span>

                      <input
                        type="number"
                        min="0"
                        step="any"
                        value={field.value}
                        onChange={(e) => field.setter(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 py-3 pl-8 pr-4 outline-none focus:border-green-500"
                        placeholder="Enter amount"
                      />
                    </div>

                    <p className="mt-1 text-xs text-slate-400">
                      {field.description}
                    </p>

                  </div>
                );
              })}

            </div>

            <button
              onClick={resetCalculator}
              className="mt-6 flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-green-700"
            >
              <RotateCcw size={16} />
              Reset Calculator
            </button>

          </div>

        </div>

        {/* Results Section */}
        <div className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-xl bg-green-100 p-3 text-green-700">
              <TrendingUp size={22} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-800">
                Revenue Summary
              </h2>

              <p className="text-xs text-slate-500">
                Estimated selling calculation
              </p>
            </div>
          </div>

          <div className="space-y-4">

            <div className="flex justify-between gap-3">
              <span className="text-sm text-slate-500">
                Commodity
              </span>
              <span className="text-sm font-semibold text-slate-800">
                {commodity}
              </span>
            </div>

            <div className="flex justify-between gap-3">
              <span className="text-sm text-slate-500">
                Mandi
              </span>
              <span className="text-right text-sm font-semibold text-slate-800">
                {mandi}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-sm text-slate-500">
                Quantity
              </span>
              <span className="text-sm font-semibold text-slate-800">
                {formatPrice(totalQuantity)} Quintals
              </span>
            </div>

            <hr className="border-slate-100" />

            <div className="flex justify-between gap-3">
              <span className="text-sm text-slate-600">
                Gross Revenue
              </span>
              <span className="font-semibold text-slate-800">
                ₹{formatPrice(grossRevenue)}
              </span>
            </div>

            <div className="flex justify-between gap-3">
              <span className="text-sm text-slate-600">
                Total Expenses
              </span>
              <span className="font-semibold text-red-600">
                − ₹{formatPrice(totalExpenses)}
              </span>
            </div>

            <hr className="border-slate-100" />

            <div className="rounded-xl bg-green-50 p-4">

              <p className="text-sm font-medium text-green-800">
                Estimated Net Revenue
              </p>

              <h2
                className={`mt-2 break-words text-3xl font-bold ${
                  netRevenue >= 0
                    ? "text-green-700"
                    : "text-red-600"
                }`}
              >
                ₹{formatPrice(netRevenue)}
              </h2>

              <p className="mt-2 text-xs text-slate-500">
                Gross revenue − Total expenses
              </p>

            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs text-slate-500">
                Net revenue per quintal
              </p>

              <p className="mt-1 text-lg font-bold text-slate-800">
                ₹
                {formatPrice(
                  totalQuantity > 0
                    ? netRevenue / totalQuantity
                    : 0
                )}
              </p>
            </div>

          </div>

          <p className="mt-5 text-xs leading-5 text-slate-400">
            This is an estimate based only on the values you enter.
            Actual earnings may vary due to quality deductions,
            commissions, taxes and other charges.
          </p>

        </div>

      </div>

    </div>
  );
}

export default SellingCalculator;