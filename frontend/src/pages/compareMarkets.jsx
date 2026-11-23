import { useState } from "react";
import {
  ArrowLeft,
  ArrowUpDown,
  MapPin,
  TrendingUp,
  TrendingDown,
  Scale,
  IndianRupee,
  Search,
  CheckCircle2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const marketData = [
  {
    id: 1,
    mandi: "Mysuru Mandi",
    location: "Mysuru, Karnataka",
    commodity: "Tomato",
    price: 2400,
    unit: "Quintal",
    date: "23 Nov 2026",
  },
  {
    id: 2,
    mandi: "Bengaluru Mandi",
    location: "Bengaluru, Karnataka",
    commodity: "Tomato",
    price: 2800,
    unit: "Quintal",
    date: "23 Nov 2026",
  },
  {
    id: 3,
    mandi: "Mandya Mandi",
    location: "Mandya, Karnataka",
    commodity: "Tomato",
    price: 2200,
    unit: "Quintal",
    date: "23 Nov 2026",
  },
  {
    id: 4,
    mandi: "Hassan Mandi",
    location: "Hassan, Karnataka",
    commodity: "Tomato",
    price: 2600,
    unit: "Quintal",
    date: "23 Nov 2026",
  },
  {
    id: 5,
    mandi: "Mysuru Mandi",
    location: "Mysuru, Karnataka",
    commodity: "Onion",
    price: 3000,
    unit: "Quintal",
    date: "23 Nov 2026",
  },
  {
    id: 6,
    mandi: "Bengaluru Mandi",
    location: "Bengaluru, Karnataka",
    commodity: "Onion",
    price: 3400,
    unit: "Quintal",
    date: "23 Nov 2026",
  },
  {
    id: 7,
    mandi: "Mandya Mandi",
    location: "Mandya, Karnataka",
    commodity: "Onion",
    price: 2800,
    unit: "Quintal",
    date: "23 Nov 2026",
  },
  {
    id: 8,
    mandi: "Hassan Mandi",
    location: "Hassan, Karnataka",
    commodity: "Onion",
    price: 3200,
    unit: "Quintal",
    date: "23 Nov 2026",
  },
];

function CompareMarkets() {
  const navigate = useNavigate();

  const [commodity, setCommodity] = useState("Tomato");
  const [quantity, setQuantity] = useState(10);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("high");

  const filteredMarkets = marketData
    .filter((item) => item.commodity === commodity)
    .filter((item) =>
      item.mandi.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder === "high"
        ? b.price - a.price
        : a.price - b.price
    );

  const highestPrice =
    filteredMarkets.length > 0
      ? Math.max(...filteredMarkets.map((item) => item.price))
      : 0;

  const lowestPrice =
    filteredMarkets.length > 0
      ? Math.min(...filteredMarkets.map((item) => item.price))
      : 0;

  const priceDifference = highestPrice - lowestPrice;

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN").format(price);

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">

      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <button
            onClick={() => navigate("/dashboard")}
            className="mb-4 flex items-center gap-2 text-sm font-medium text-green-700 hover:text-green-900"
          >
            <ArrowLeft size={18} />
            Back to Dashboard
          </button>

          <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
            Compare Agricultural Markets
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Compare mandi prices and understand where your crop may
            receive a better price.
          </p>
        </div>

        <div className="flex w-fit items-center gap-2 rounded-xl bg-green-100 px-4 py-3 text-sm font-medium text-green-800">
          <CheckCircle2 size={18} />
          Market Comparison
        </div>

      </div>

      {/* Demo Notice */}
      <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
        <strong>Demonstration data:</strong> The prices displayed on
        this page are fictional sample values for testing the interface.
        They are not verified live mandi prices.
      </div>

      {/* Commodity Selection */}
      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

        <h2 className="mb-4 text-lg font-semibold text-slate-800">
          Select Commodity
        </h2>

        <div className="flex flex-wrap gap-3">

          {["Tomato", "Onion"].map((item) => (
            <button
              key={item}
              onClick={() => setCommodity(item)}
              className={`rounded-xl px-6 py-3 text-sm font-semibold transition ${
                commodity === item
                  ? "bg-green-700 text-white shadow-md"
                  : "border border-slate-200 bg-white text-slate-600 hover:bg-green-50"
              }`}
            >
              {item}
            </button>
          ))}

        </div>

      </div>

      {/* Summary Cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm text-slate-500">Highest Price</p>
            <TrendingUp className="text-green-600" />
          </div>

          <h2 className="text-2xl font-bold text-green-700">
            ₹{formatPrice(highestPrice)}
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Per quintal
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm text-slate-500">Lowest Price</p>
            <TrendingDown className="text-red-500" />
          </div>

          <h2 className="text-2xl font-bold text-red-600">
            ₹{formatPrice(lowestPrice)}
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Per quintal
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm text-slate-500">Price Difference</p>
            <Scale className="text-blue-600" />
          </div>

          <h2 className="text-2xl font-bold text-blue-700">
            ₹{formatPrice(priceDifference)}
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Highest minus lowest
          </p>
        </div>

      </div>

      {/* Search and Sort */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row">

        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-3.5 text-slate-400"
            size={19}
          />

          <input
            type="text"
            placeholder="Search mandi..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-green-500"
          />
        </div>

        <button
          onClick={() =>
            setSortOrder(sortOrder === "high" ? "low" : "high")
          }
          className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 hover:bg-green-50"
        >
          <ArrowUpDown size={18} />
          {sortOrder === "high" ? "Highest First" : "Lowest First"}
        </button>

      </div>

      {/* Market Comparison Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-100 p-5">
          <h2 className="text-lg font-semibold text-slate-800">
            {commodity} Price Comparison
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Compare prices across different mandis.
          </p>
        </div>

        <div className="overflow-x-auto">

          <table className="w-full min-w-[650px] text-left">

            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-5 py-4">Mandi</th>
                <th className="px-5 py-4">Location</th>
                <th className="px-5 py-4">Price / Quintal</th>
                <th className="px-5 py-4">Market Date</th>
                <th className="px-5 py-4">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">

              {filteredMarkets.map((market) => (

                <tr
                  key={market.id}
                  className="hover:bg-green-50/50"
                >

                  <td className="px-5 py-4 font-semibold text-slate-800">
                    {market.mandi}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-500">
                    <span className="flex items-center gap-1">
                      <MapPin size={15} />
                      {market.location}
                    </span>
                  </td>

                  <td className="px-5 py-4 font-bold text-green-700">
                    ₹{formatPrice(market.price)}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-500">
                    {market.date}
                  </td>

                  <td className="px-5 py-4">

                    {market.price === highestPrice ? (
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                        Highest
                      </span>
                    ) : market.price === lowestPrice ? (
                      <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                        Lowest
                      </span>
                    ) : (
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                        Available
                      </span>
                    )}

                  </td>

                </tr>

              ))}

              {filteredMarkets.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="px-5 py-10 text-center text-sm text-slate-500"
                  >
                    No matching mandis found.
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* Revenue Estimate */}
      <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-5 sm:p-6">

        <div className="mb-4 flex items-center gap-3">
          <div className="rounded-xl bg-green-700 p-3 text-white">
            <IndianRupee size={22} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-800">
              Estimated Selling Value
            </h2>

            <p className="text-sm text-slate-600">
              Calculate the gross value of your selected crop quantity.
            </p>
          </div>
        </div>

        <label className="mb-2 block text-sm font-medium text-slate-700">
          Quantity (in quintals)
        </label>

        <input
          type="number"
          min="0"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="mb-5 w-full max-w-xs rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-green-500"
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

          <div className="rounded-xl bg-white p-4">
            <p className="text-sm text-slate-500">
              At Highest Market Price
            </p>

            <h3 className="mt-2 text-2xl font-bold text-green-700">
              ₹{formatPrice(highestPrice * Math.max(0, Number(quantity) || 0))}
            </h3>
          </div>

          <div className="rounded-xl bg-white p-4">
            <p className="text-sm text-slate-500">
              At Lowest Market Price
            </p>

            <h3 className="mt-2 text-2xl font-bold text-red-600">
              ₹{formatPrice(lowestPrice * Math.max(0, Number(quantity) || 0))}
            </h3>
          </div>

        </div>

        <p className="mt-4 text-xs text-slate-600">
          These are gross estimates based on sample prices. Transport,
          loading, unloading, market fees and other expenses are not
          deducted.
        </p>

      </div>

    </div>
  );
}

export default CompareMarkets;