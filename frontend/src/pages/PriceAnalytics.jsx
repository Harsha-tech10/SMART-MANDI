 import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  BarChart3,
  IndianRupee,
  CalendarDays,
  MapPin,
} from "lucide-react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

// FICTIONAL DEMONSTRATION PRICE DATA
const priceHistory = {
  Tomato: [
    { date: "Nov 17", Mysuru: 2100, Bengaluru: 2300, Mandya: 1900 },
    { date: "Nov 18", Mysuru: 2200, Bengaluru: 2400, Mandya: 2000 },
    { date: "Nov 19", Mysuru: 2150, Bengaluru: 2500, Mandya: 1950 },
    { date: "Nov 20", Mysuru: 2300, Bengaluru: 2600, Mandya: 2050 },
    { date: "Nov 21", Mysuru: 2250, Bengaluru: 2550, Mandya: 2100 },
    { date: "Nov 22", Mysuru: 2350, Bengaluru: 2700, Mandya: 2150 },
    { date: "Nov 23", Mysuru: 2400, Bengaluru: 2800, Mandya: 2200 },
  ],

  Onion: [
    { date: "Nov 17", Mysuru: 2800, Bengaluru: 3100, Mandya: 2600 },
    { date: "Nov 18", Mysuru: 2850, Bengaluru: 3200, Mandya: 2650 },
    { date: "Nov 19", Mysuru: 2900, Bengaluru: 3150, Mandya: 2700 },
    { date: "Nov 20", Mysuru: 2950, Bengaluru: 3300, Mandya: 2750 },
    { date: "Nov 21", Mysuru: 2900, Bengaluru: 3250, Mandya: 2800 },
    { date: "Nov 22", Mysuru: 2950, Bengaluru: 3350, Mandya: 2750 },
    { date: "Nov 23", Mysuru: 3000, Bengaluru: 3400, Mandya: 2800 },
  ],

  Potato: [
    { date: "Nov 17", Mysuru: 1800, Bengaluru: 2000, Mandya: 1700 },
    { date: "Nov 18", Mysuru: 1850, Bengaluru: 2050, Mandya: 1750 },
    { date: "Nov 19", Mysuru: 1900, Bengaluru: 2100, Mandya: 1800 },
    { date: "Nov 20", Mysuru: 1850, Bengaluru: 2150, Mandya: 1750 },
    { date: "Nov 21", Mysuru: 1950, Bengaluru: 2200, Mandya: 1850 },
    { date: "Nov 22", Mysuru: 2000, Bengaluru: 2250, Mandya: 1900 },
    { date: "Nov 23", Mysuru: 2050, Bengaluru: 2300, Mandya: 1950 },
  ],

  "Green Chilli": [
    { date: "Nov 17", Mysuru: 3500, Bengaluru: 3800, Mandya: 3200 },
    { date: "Nov 18", Mysuru: 3600, Bengaluru: 3900, Mandya: 3300 },
    { date: "Nov 19", Mysuru: 3550, Bengaluru: 4000, Mandya: 3250 },
    { date: "Nov 20", Mysuru: 3700, Bengaluru: 4100, Mandya: 3350 },
    { date: "Nov 21", Mysuru: 3650, Bengaluru: 4050, Mandya: 3400 },
    { date: "Nov 22", Mysuru: 3800, Bengaluru: 4200, Mandya: 3450 },
    { date: "Nov 23", Mysuru: 3900, Bengaluru: 4300, Mandya: 3500 },
  ],
};

const formatPrice = (value) =>
  new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 2,
  }).format(value);

function PriceAnalytics() {
  const navigate = useNavigate();

  const [commodity, setCommodity] = useState("Tomato");
  const [selectedMandi, setSelectedMandi] = useState("All");

  const data = priceHistory[commodity] || [];

  const mandis =
    selectedMandi === "All"
      ? ["Mysuru", "Bengaluru", "Mandya"]
      : [selectedMandi];

  const latestRecord = data[data.length - 1] || {};
  const firstRecord = data[0] || {};

  const allPrices = mandis.flatMap((mandi) =>
    data.map((item) => item[mandi])
  );

  const highestPrice =
    allPrices.length > 0 ? Math.max(...allPrices) : 0;

  const lowestPrice =
    allPrices.length > 0 ? Math.min(...allPrices) : 0;

  const averagePrice =
    allPrices.length > 0
      ? allPrices.reduce((sum, value) => sum + value, 0) /
        allPrices.length
      : 0;

  const currentAverage =
    mandis.reduce(
      (sum, mandi) => sum + (latestRecord[mandi] || 0),
      0
    ) / mandis.length;

  const previousAverage =
    mandis.reduce(
      (sum, mandi) => sum + (firstRecord[mandi] || 0),
      0
    ) / mandis.length;

  const priceChange = currentAverage - previousAverage;

  const percentageChange =
    previousAverage > 0
      ? (priceChange / previousAverage) * 100
      : 0;

  const chartColors = {
    Mysuru: "#16a34a",
    Bengaluru: "#2563eb",
    Mandya: "#d97706",
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">

      {/* HEADER */}
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
            <BarChart3 size={26} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
              Price Analytics
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Understand agricultural market price movements.
            </p>
          </div>

        </div>
      </div>

      {/* DEMO NOTICE */}
      <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
        <strong>Demonstration data:</strong> All prices and charts
        displayed here are fictional sample values, not verified live
        market records.
      </div>

      {/* FILTERS */}
      <div className="mb-6 grid grid-cols-1 gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:grid-cols-2">

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Select Commodity
          </label>

          <select
            value={commodity}
            onChange={(e) => setCommodity(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-green-500"
          >
            {Object.keys(priceHistory).map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Select Mandi
          </label>

          <select
            value={selectedMandi}
            onChange={(e) => setSelectedMandi(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-green-500"
          >
            <option value="All">All Mandis</option>
            <option value="Mysuru">Mysuru</option>
            <option value="Bengaluru">Bengaluru</option>
            <option value="Mandya">Mandya</option>
          </select>
        </div>

      </div>

      {/* STATISTICS */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-3 flex justify-between">
            <p className="text-sm text-slate-500">Highest Price</p>
            <TrendingUp className="text-green-600" />
          </div>

          <h2 className="text-2xl font-bold text-green-700">
            ₹{formatPrice(highestPrice)}
          </h2>

          <p className="mt-1 text-xs text-slate-400">
            Per quintal
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-3 flex justify-between">
            <p className="text-sm text-slate-500">Lowest Price</p>
            <TrendingDown className="text-red-500" />
          </div>

          <h2 className="text-2xl font-bold text-red-600">
            ₹{formatPrice(lowestPrice)}
          </h2>

          <p className="mt-1 text-xs text-slate-400">
            Per quintal
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-3 flex justify-between">
            <p className="text-sm text-slate-500">Average Price</p>
            <IndianRupee className="text-blue-600" />
          </div>

          <h2 className="text-2xl font-bold text-blue-700">
            ₹{formatPrice(averagePrice)}
          </h2>

          <p className="mt-1 text-xs text-slate-400">
            Per quintal
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-3 flex justify-between">
            <p className="text-sm text-slate-500">Price Movement</p>

            {priceChange >= 0 ? (
              <TrendingUp className="text-green-600" />
            ) : (
              <TrendingDown className="text-red-600" />
            )}
          </div>

          <h2
            className={`text-2xl font-bold ${
              priceChange >= 0 ? "text-green-700" : "text-red-600"
            }`}
          >
            {priceChange >= 0 ? "+" : ""}
            {percentageChange.toFixed(2)}%
          </h2>

          <p className="mt-1 text-xs text-slate-400">
            First to latest sample date
          </p>
        </div>

      </div>

      {/* BAR GRAPH ONLY */}
      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">

        <div className="mb-6">
          <h2 className="text-lg font-bold text-slate-800">
            {commodity} Mandi Price Comparison
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Compare historical prices across selected mandis.
          </p>
        </div>

        <div className="h-80 w-full">

          <ResponsiveContainer width="100%" height="100%">

            <BarChart
              data={data}
              margin={{
                top: 10,
                right: 15,
                left: 5,
                bottom: 5,
              }}
            >

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
              />

              <YAxis
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `₹${value}`}
              />

              <Tooltip
                formatter={(value) => [
                  `₹${formatPrice(value)} / Quintal`,
                  "Price",
                ]}
              />

              <Legend />

              {mandis.map((mandi) => (
                <Bar
                  key={mandi}
                  dataKey={mandi}
                  name={`${mandi} Mandi`}
                  fill={chartColors[mandi]}
                  radius={[5, 5, 0, 0]}
                />
              ))}

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* HISTORICAL RECORDS TABLE */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-100 p-5">

          <div className="flex items-center gap-2">
            <CalendarDays className="text-green-700" size={20} />

            <h2 className="text-lg font-bold text-slate-800">
              Historical Market Records
            </h2>
          </div>

          <p className="mt-1 text-sm text-slate-500">
            Sample price records for {commodity}.
          </p>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full min-w-[600px] text-left">

            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-5 py-4">Date</th>

                {mandis.map((mandi) => (
                  <th key={mandi} className="px-5 py-4">
                    {mandi}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">

              {data.map((record) => (
                <tr
                  key={record.date}
                  className="hover:bg-green-50/50"
                >
                  <td className="px-5 py-4 text-sm font-medium text-slate-700">
                    {record.date}
                  </td>

                  {mandis.map((mandi) => (
                    <td
                      key={mandi}
                      className="px-5 py-4 text-sm font-semibold text-green-700"
                    >
                      ₹{formatPrice(record[mandi])}
                    </td>
                  ))}
                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* INFORMATION */}
      <div className="mt-6 flex items-start gap-3 rounded-xl bg-blue-50 p-4 text-sm text-blue-800">

        <MapPin size={19} className="mt-0.5 shrink-0" />

        <p>
          Prices are displayed per quintal. One quintal equals 100 kg.
          Actual selling decisions should use verified records with
          matching commodity, quality, unit and market date.
        </p>

      </div>

    </div>
  );
}

export default PriceAnalytics;