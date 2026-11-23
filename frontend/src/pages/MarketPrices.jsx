import { useState } from "react";

import {
  Search,
  MapPin,
  TrendingUp,
  TrendingDown,
  IndianRupee,
  Wheat,
  Calculator,
  ArrowUpRight,
  Award,
} from "lucide-react";

// DEMONSTRATION DATA ONLY — NOT REAL MARKET PRICES
const marketData = [
  {
    id: 1,
    commodity: "Tomato",
    mandi: "Mysuru",
    district: "Mysuru",
    price: 2400,
    minimum: 1800,
    maximum: 2800,
    change: 8.5,
    date: "23 Nov 2026",
  },
  {
    id: 2,
    commodity: "Tomato",
    mandi: "Bengaluru",
    district: "Bengaluru Urban",
    price: 2800,
    minimum: 2200,
    maximum: 3200,
    change: 12.4,
    date: "23 Nov 2026",
  },
  {
    id: 3,
    commodity: "Tomato",
    mandi: "Mandya",
    district: "Mandya",
    price: 2600,
    minimum: 2000,
    maximum: 2900,
    change: 5.2,
    date: "23 Nov 2026",
  },
  {
    id: 4,
    commodity: "Tomato",
    mandi: "Hassan",
    district: "Hassan",
    price: 2300,
    minimum: 1900,
    maximum: 2700,
    change: -2.5,
    date: "23 Nov 2026",
  },
  {
    id: 5,
    commodity: "Onion",
    mandi: "Mysuru",
    district: "Mysuru",
    price: 3200,
    minimum: 2800,
    maximum: 3500,
    change: 4.2,
    date: "23 Nov 2026",
  },
  {
    id: 6,
    commodity: "Onion",
    mandi: "Bengaluru",
    district: "Bengaluru Urban",
    price: 3500,
    minimum: 3000,
    maximum: 3800,
    change: 7.5,
    date: "23 Nov 2026",
  },
  {
    id: 7,
    commodity: "Onion",
    mandi: "Mandya",
    district: "Mandya",
    price: 2900,
    minimum: 2500,
    maximum: 3200,
    change: -1.5,
    date: "23 Nov 2026",
  },
  {
    id: 8,
    commodity: "Potato",
    mandi: "Mysuru",
    district: "Mysuru",
    price: 1800,
    minimum: 1500,
    maximum: 2100,
    change: 3.5,
    date: "23 Nov 2026",
  },
  {
    id: 9,
    commodity: "Potato",
    mandi: "Bengaluru",
    district: "Bengaluru Urban",
    price: 2100,
    minimum: 1800,
    maximum: 2400,
    change: 6.2,
    date: "23 Nov 2026",
  },
  {
    id: 10,
    commodity: "Potato",
    mandi: "Hassan",
    district: "Hassan",
    price: 1700,
    minimum: 1400,
    maximum: 2000,
    change: -2.1,
    date: "23 Nov 2026",
  },
  {
    id: 11,
    commodity: "Green Chilli",
    mandi: "Mysuru",
    district: "Mysuru",
    price: 4500,
    minimum: 4000,
    maximum: 5000,
    change: 9.2,
    date: "23 Nov 2026",
  },
  {
    id: 12,
    commodity: "Green Chilli",
    mandi: "Mandya",
    district: "Mandya",
    price: 4200,
    minimum: 3800,
    maximum: 4700,
    change: 3.8,
    date: "23 Nov 2026",
  },
];

function MarketPrices() {
  const [commodity, setCommodity] = useState("Tomato");
  const [searchTerm, setSearchTerm] = useState("");
  const [quantity, setQuantity] = useState(10);
  const [selectedMandi, setSelectedMandi] = useState("All");

  // Filter market data
  const filteredMarkets = marketData.filter((market) => {
    return (
      market.commodity === commodity &&
      market.mandi.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedMandi === "All" || market.mandi === selectedMandi)
    );
  });

  // Find highest price
  const highestMarket = filteredMarkets.reduce(
    (highest, current) =>
      current.price > (highest?.price || 0) ? current : highest,
    null
  );

  // Find lowest price
  const lowestMarket = filteredMarkets.reduce(
    (lowest, current) =>
      current.price < (lowest?.price || Infinity) ? current : lowest,
    null
  );

  // Calculate selling revenue
  const estimatedRevenue = highestMarket
    ? highestMarket.price * quantity
    : 0;

  const averagePrice =
    filteredMarkets.length > 0
      ? Math.round(
          filteredMarkets.reduce((total, market) => total + market.price, 0) /
            filteredMarkets.length
        )
      : 0;

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN").format(price);

  return (
    <div className="min-h-screen bg-[#f8faf5] p-5 md:p-8">

      {/* Header */}

      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-700">
            Agricultural Intelligence
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            Market Price Comparison
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Compare commodity prices across different mandis.
          </p>
        </div>

        <div className="rounded-xl bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800">
          ⚠ Demonstration data – Not live prices
        </div>

      </div>

      {/* Commodity Selection */}

      <section className="mb-7 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

        <div className="mb-5 flex items-center gap-3">
          <div className="rounded-xl bg-brand-100 p-3 text-brand-700">
            <Wheat size={23} />
          </div>

          <div>
            <h2 className="font-bold text-gray-900">
              Select Commodity
            </h2>

            <p className="text-sm text-gray-500">
              Choose the agricultural product you want to compare.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">

          {["Tomato", "Onion", "Potato", "Green Chilli"].map((item) => (

            <button
              key={item}
              onClick={() => {
                setCommodity(item);
                setSearchTerm("");
                setSelectedMandi("All");
              }}
              className={`rounded-xl border px-4 py-4 text-sm font-semibold transition ${
                commodity === item
                  ? "border-brand-700 bg-brand-50 text-brand-800"
                  : "border-gray-200 text-gray-600 hover:border-brand-300"
              }`}
            >
              {item}
            </button>

          ))}

        </div>

      </section>

      {/* Price Summary Cards */}

      <section className="mb-7 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Highest Market Price
          </p>

          <h2 className="mt-3 text-2xl font-bold text-green-700">
            ₹{formatPrice(highestMarket?.price || 0)}
          </h2>

          <p className="mt-2 text-xs text-gray-500">
            {highestMarket?.mandi || "No market found"}
          </p>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Lowest Market Price
          </p>

          <h2 className="mt-3 text-2xl font-bold text-red-600">
            ₹{formatPrice(lowestMarket?.price || 0)}
          </h2>

          <p className="mt-2 text-xs text-gray-500">
            {lowestMarket?.mandi || "No market found"}
          </p>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Average Market Price
          </p>

          <h2 className="mt-3 text-2xl font-bold text-gray-900">
            ₹{formatPrice(averagePrice)}
          </h2>

          <p className="mt-2 text-xs text-gray-500">
            Per quintal
          </p>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Price Difference
          </p>

          <h2 className="mt-3 text-2xl font-bold text-brand-700">
            ₹{formatPrice(
              highestMarket && lowestMarket
                ? highestMarket.price - lowestMarket.price
                : 0
            )}
          </h2>

          <p className="mt-2 text-xs text-gray-500">
            Highest minus lowest
          </p>
        </div>

      </section>

      {/* Search and Filter */}

      <section className="mb-6 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">

        <div className="grid gap-4 md:grid-cols-2">

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Search Mandi
            </label>

            <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3">

              <Search size={19} className="text-gray-400" />

              <input
                type="text"
                placeholder="Search by mandi name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent text-sm outline-none"
              />

            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Filter by Mandi
            </label>

            <select
              value={selectedMandi}
              onChange={(e) => setSelectedMandi(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none"
            >
              <option value="All">All Mandis</option>
              <option value="Mysuru">Mysuru</option>
              <option value="Bengaluru">Bengaluru</option>
              <option value="Mandya">Mandya</option>
              <option value="Hassan">Hassan</option>
            </select>
          </div>

        </div>

      </section>

      {/* Market Price Table */}

      <section className="mb-7 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

        <div className="border-b border-gray-100 p-5">

          <h2 className="text-lg font-bold text-gray-900">
            {commodity} – Market Prices
          </h2>

          <p className="mt-1 text-xs text-gray-500">
            Prices shown are illustrative and expressed per quintal.
          </p>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full min-w-[750px] text-left">

            <thead className="bg-gray-50 text-xs uppercase text-gray-500">

              <tr>
                <th className="px-6 py-4">Mandi</th>
                <th className="px-6 py-4">Minimum Price</th>
                <th className="px-6 py-4">Maximum Price</th>
                <th className="px-6 py-4">Modal Price</th>
                <th className="px-6 py-4">Change</th>
                <th className="px-6 py-4">Market Date</th>
              </tr>

            </thead>

            <tbody className="divide-y divide-gray-100">

              {filteredMarkets.map((market) => (

                <tr
                  key={market.id}
                  className={`hover:bg-gray-50 ${
                    highestMarket?.id === market.id
                      ? "bg-green-50/50"
                      : ""
                  }`}
                >

                  <td className="px-6 py-5">

                    <div className="flex items-center gap-2">

                      <MapPin size={17} className="text-brand-700" />

                      <div>
                        <p className="font-semibold text-gray-800">
                          {market.mandi}
                        </p>

                        <p className="text-xs text-gray-400">
                          {market.district}
                        </p>
                      </div>

                      {highestMarket?.id === market.id && (
                        <Award size={18} className="text-amber-500" />
                      )}

                    </div>

                  </td>

                  <td className="px-6 py-5 text-sm">
                    ₹{formatPrice(market.minimum)}
                  </td>

                  <td className="px-6 py-5 text-sm">
                    ₹{formatPrice(market.maximum)}
                  </td>

                  <td className="px-6 py-5 font-bold text-gray-900">
                    ₹{formatPrice(market.price)}
                  </td>

                  <td className="px-6 py-5">

                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                        market.change >= 0
                          ? "bg-green-50 text-green-700"
                          : "bg-red-50 text-red-700"
                      }`}
                    >

                      {market.change >= 0 ? (
                        <TrendingUp size={14} />
                      ) : (
                        <TrendingDown size={14} />
                      )}

                      {Math.abs(market.change)}%

                    </span>

                  </td>

                  <td className="px-6 py-5 text-xs text-gray-500">
                    {market.date}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

          {filteredMarkets.length === 0 && (
            <div className="p-10 text-center text-sm text-gray-500">
              No matching market records found.
            </div>
          )}

        </div>

      </section>

      {/* Revenue Calculator */}

      <section className="rounded-2xl bg-brand-800 p-6 text-white md:p-8">

        <div className="mb-7 flex items-center gap-3">

          <div className="rounded-xl bg-white/10 p-3">
            <Calculator size={26} />
          </div>

          <div>
            <h2 className="text-xl font-bold">
              Selling Revenue Calculator
            </h2>

            <p className="text-sm text-green-100">
              Estimate your selling revenue using the highest displayed price.
            </p>
          </div>

        </div>

        <div className="grid gap-7 md:grid-cols-2">

          <div>

            <label className="mb-3 block text-sm font-medium text-green-100">
              Enter your quantity (in quintals)
            </label>

            <input
              type="number"
              min="0"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(0, Number(e.target.value)))}
              className="w-full rounded-xl border border-white/20 bg-white/10 px-5 py-4 text-xl font-bold text-white outline-none placeholder:text-green-200"
            />

            <p className="mt-3 text-xs text-green-100">
              1 quintal = 100 kilograms.
            </p>

          </div>

          <div className="rounded-2xl bg-white p-6 text-gray-900">

            <p className="text-sm text-gray-500">
              Estimated Gross Revenue
            </p>

            <div className="mt-3 flex items-center gap-1">

              <IndianRupee size={27} className="text-brand-700" />

              <h3 className="text-3xl font-bold text-brand-800">
                {formatPrice(estimatedRevenue)}
              </h3>

            </div>

            <p className="mt-3 text-xs text-gray-500">
              {quantity} quintals × ₹
              {formatPrice(highestMarket?.price || 0)}
            </p>

            {highestMarket && (
              <div className="mt-5 flex items-center gap-2 rounded-lg bg-green-50 p-3 text-sm text-green-800">
                <ArrowUpRight size={18} />

                Highest displayed price: {highestMarket.mandi}
              </div>
            )}

          </div>

        </div>

        <p className="mt-6 text-xs leading-5 text-green-100">
          This is a gross revenue estimate based on demonstration data. It
          excludes transportation, loading, unloading, market fees and other
          selling expenses. Actual prices must be verified before selling.
        </p>

      </section>

    </div>
  );
}

export default MarketPrices;
