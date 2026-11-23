 import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Sprout,
  LayoutDashboard,
  TrendingUp,
  GitCompareArrows,
  Calculator,
  MessageCircle,
  BarChart3,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  ArrowUpRight,
  ArrowDownRight,
  MapPin,
  Wheat,
  Users,
  Languages,
  LogOut,
} from "lucide-react";

function Dashboard() {
  const navigate = useNavigate();

  const [activePage, setActivePage] = useState("Overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Demonstration data only.
  // These are NOT actual or verified mandi prices.

  const marketPrices = [
    {
      commodity: "Tomato",
      mandi: "Mysuru",
      price: "₹2,400",
      unit: "Quintal",
      change: "+8.5%",
      trend: "up",
    },
    {
      commodity: "Onion",
      mandi: "Bengaluru",
      price: "₹3,200",
      unit: "Quintal",
      change: "-2.4%",
      trend: "down",
    },
    {
      commodity: "Potato",
      mandi: "Hassan",
      price: "₹1,800",
      unit: "Quintal",
      change: "+4.2%",
      trend: "up",
    },
    {
      commodity: "Green Chilli",
      mandi: "Mysuru",
      price: "₹4,500",
      unit: "Quintal",
      change: "+6.1%",
      trend: "up",
    },
    {
      commodity: "Cabbage",
      mandi: "Mandya",
      price: "₹1,200",
      unit: "Quintal",
      change: "-1.8%",
      trend: "down",
    },
  ];

  // Farmer dashboard navigation

  const menuItems = [
    { name: "Overview", icon: LayoutDashboard },
    { name: "Market Prices", icon: TrendingUp },
    { name: "Compare Markets", icon: GitCompareArrows },
    { name: "Selling Calculator", icon: Calculator },
    { name: "AI Assistant", icon: MessageCircle },
    { name: "Price Analytics", icon: BarChart3 },
    { name: "Settings", icon: Settings },
  ];

  // Dashboard statistics

  const stats = [
    {
      title: "Total Mandis",
      value: "24",
      description: "Markets available",
      icon: MapPin,
    },
    {
      title: "Commodities",
      value: "48",
      description: "Products tracked",
      icon: Wheat,
    },
    {
      title: "Market Updates",
      value: "156",
      description: "Demonstration records",
      icon: TrendingUp,
    },
    {
      title: "Cooperative Members",
      value: "120",
      description: "Registered members",
      icon: Users,
    },
  ];

  // Sidebar navigation handler

  const handleNavigation = (page) => {
    setActivePage(page);
    setSidebarOpen(false);

    const routes = {
      Overview: "/dashboard",
      "Market Prices": "/market-prices",
      "Compare Markets": "/compare-markets",
      "Selling Calculator": "/selling-calculator",
      "AI Assistant": "/ai-assistant",
      "Price Analytics": "/price-analytics",
      Settings: "/settings",
    };

    if (routes[page]) {
      navigate(routes[page]);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8faf5] text-gray-800">

      {/* MOBILE SIDEBAR OVERLAY */}

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-gray-200 bg-white shadow-xl transition-transform duration-300 lg:translate-x-0 lg:shadow-none ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >

        {/* LOGO */}

        <div className="flex h-20 shrink-0 items-center gap-3 border-b border-gray-100 px-5">

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-700 text-white">
            <Sprout size={28} />
          </div>

          <div>
            <h1 className="text-lg font-bold text-brand-800">
              SMART MANDI AI
            </h1>

            <p className="text-xs text-gray-500">
              Farmer Intelligence
            </p>
          </div>

          {/* MOBILE CLOSE BUTTON */}

          <button
            onClick={() => setSidebarOpen(false)}
            className="ml-auto rounded-lg p-2 text-gray-500 hover:bg-gray-100 lg:hidden"
            aria-label="Close navigation menu"
          >
            <X size={23} />
          </button>

        </div>

        {/* SIDEBAR MENU */}

        <div className="flex-1 overflow-y-auto px-4 py-7">

          <p className="mb-5 px-3 text-xs font-bold uppercase tracking-wider text-gray-400">
            Main Menu
          </p>

          <nav className="space-y-2">

            {menuItems.map((item) => {

              const Icon = item.icon;

              return (

                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.name)}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3.5 text-left text-sm font-semibold transition-all ${
                    activePage === item.name
                      ? "bg-brand-50 text-brand-800"
                      : "text-gray-600 hover:bg-gray-50 hover:text-brand-700"
                  }`}
                >

                  <Icon size={20} />

                  <span>{item.name}</span>

                </button>

              );

            })}

          </nav>

        </div>

        {/* SIDEBAR FOOTER */}

        <div className="shrink-0 border-t border-gray-100 p-4">

          <div className="rounded-xl bg-brand-50 p-4">

            <div className="mb-2 flex items-center gap-2 text-brand-800">

              <Languages size={20} />

              <span className="text-sm font-bold">
                Local Languages
              </span>

            </div>

            <p className="text-xs leading-5 text-gray-600">
              Access agricultural market information in your preferred language.
            </p>

          </div>

          <button
            onClick={() => navigate("/")}
            className="mt-4 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-red-600"
          >
            <LogOut size={19} />
            Back to Home
          </button>

        </div>

      </aside>

      {/* MAIN CONTENT */}

      <main className="min-h-screen min-w-0 lg:ml-72">

        {/* TOP HEADER */}

        <header className="sticky top-0 z-30 flex h-20 items-center justify-between gap-3 border-b border-gray-200 bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">

          <div className="flex min-w-0 items-center gap-3">

            {/* MOBILE HAMBURGER BUTTON */}

            <button
              onClick={() => setSidebarOpen(true)}
              className="shrink-0 rounded-lg border border-gray-200 p-2.5 text-gray-700 hover:bg-gray-50 lg:hidden"
              aria-label="Open navigation menu"
            >
              <Menu size={23} />
            </button>

            <div className="min-w-0">

              <h2 className="truncate text-lg font-bold text-gray-900 sm:text-xl">
                {activePage}
              </h2>

              <p className="hidden text-xs text-gray-500 sm:block">
                Your agricultural market dashboard
              </p>

            </div>

          </div>

          {/* HEADER ACTIONS */}

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">

            <button
              className="rounded-lg border border-gray-200 p-2.5 text-gray-600 hover:bg-gray-50"
              aria-label="Search"
            >
              <Search size={19} />
            </button>

            <button
              className="relative rounded-lg border border-gray-200 p-2.5 text-gray-600 hover:bg-gray-50"
              aria-label="Notifications"
            >
              <Bell size={19} />

              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
            </button>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 font-bold text-brand-800">
              F
            </div>

          </div>

        </header>

        {/* DASHBOARD CONTENT */}

        <div className="mx-auto max-w-[1600px] p-4 sm:p-6 lg:p-8">

          {/* WELCOME SECTION */}

          <section className="mb-8">

            <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-center">

              <div>

                <h1 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                  Welcome, Farmer! 🌱
                </h1>

                <p className="mt-2 text-sm leading-6 text-gray-500 sm:text-base">
                  Understand agricultural markets and make better selling decisions.
                </p>

              </div>

              <div className="inline-flex w-fit items-center rounded-lg bg-amber-50 px-4 py-3 text-xs font-medium text-amber-800">
                ⚠ Demonstration data – Not live mandi prices
              </div>

            </div>

          </section>

          {/* STATISTICS */}

          <section className="mb-8 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5">

            {stats.map((stat) => {

              const Icon = stat.icon;

              return (

                <div
                  key={stat.title}
                  className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5"
                >

                  <div className="flex items-start justify-between gap-2">

                    <p className="text-xs font-medium leading-5 text-gray-500 sm:text-sm">
                      {stat.title}
                    </p>

                    <div className="shrink-0 rounded-xl bg-brand-50 p-2 text-brand-700 sm:p-3">
                      <Icon size={20} />
                    </div>

                  </div>

                  <h3 className="mt-4 text-2xl font-extrabold text-gray-900 sm:text-3xl">
                    {stat.value}
                  </h3>

                  <p className="mt-1 text-xs text-gray-500">
                    {stat.description}
                  </p>

                </div>

              );

            })}

          </section>

          {/* RECENT MARKET PRICES */}

          <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

            <div className="flex flex-col justify-between gap-4 border-b border-gray-100 p-5 sm:flex-row sm:items-center sm:p-6">

              <div>

                <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
                  Recent Market Prices
                </h2>

                <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                  Illustrative commodity prices for interface testing
                </p>

              </div>

              <button
                onClick={() => handleNavigation("Market Prices")}
                className="w-full rounded-xl bg-brand-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-800 sm:w-auto"
              >
                View All Markets →
              </button>

            </div>

            {/* RESPONSIVE TABLE */}

            <div className="overflow-x-auto">

              <table className="w-full min-w-[650px] text-left">

                <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">

                  <tr>

                    <th className="px-6 py-4">Commodity</th>

                    <th className="px-6 py-4">Mandi</th>

                    <th className="px-6 py-4">Price</th>

                    <th className="px-6 py-4">Unit</th>

                    <th className="px-6 py-4">Change</th>

                  </tr>

                </thead>

                <tbody className="divide-y divide-gray-100">

                  {marketPrices.map((item) => (

                    <tr
                      key={item.commodity}
                      className="transition hover:bg-gray-50"
                    >

                      <td className="px-6 py-5 font-semibold text-gray-800">
                        {item.commodity}
                      </td>

                      <td className="px-6 py-5 text-sm text-gray-600">
                        {item.mandi}
                      </td>

                      <td className="px-6 py-5 font-bold text-gray-900">
                        {item.price}
                      </td>

                      <td className="px-6 py-5 text-sm text-gray-500">
                        {item.unit}
                      </td>

                      <td className="px-6 py-5">

                        <span
                          className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold ${
                            item.trend === "up"
                              ? "bg-green-50 text-green-700"
                              : "bg-red-50 text-red-700"
                          }`}
                        >

                          {item.trend === "up" ? (
                            <ArrowUpRight size={14} />
                          ) : (
                            <ArrowDownRight size={14} />
                          )}

                          {item.change}

                        </span>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

            <div className="border-t border-gray-100 px-5 py-4 text-xs leading-5 text-amber-700">
              These prices are fictional demonstration values. They are not verified market records.
            </div>

          </section>

          {/* QUICK ACCESS CARDS */}

          <section className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">

            {/* COMPARE MARKETS */}

            <div className="rounded-2xl bg-brand-700 p-6 text-white sm:p-8">

              <GitCompareArrows size={30} />

              <h3 className="mt-5 text-xl font-bold">
                Compare Different Mandis
              </h3>

              <p className="mt-3 text-sm leading-7 text-green-100">
                Compare agricultural commodity prices across different markets and identify better selling opportunities.
              </p>

              <button
                onClick={() => handleNavigation("Compare Markets")}
                className="mt-6 rounded-xl bg-white px-5 py-3 text-sm font-bold text-brand-800 transition hover:bg-green-50"
              >
                Compare Markets →
              </button>

            </div>

            {/* AI ASSISTANT */}

            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">

              <MessageCircle size={30} className="text-brand-700" />

              <h3 className="mt-5 text-xl font-bold text-gray-900">
                AI Farmer Assistant
              </h3>

              <p className="mt-3 text-sm leading-7 text-gray-500">
                Understand market information and get agricultural market assistance in your preferred language.
              </p>

              <button
                onClick={() => handleNavigation("AI Assistant")}
                className="mt-6 rounded-xl border border-brand-700 px-5 py-3 text-sm font-bold text-brand-700 transition hover:bg-brand-50"
              >
                Explore Assistant →
              </button>

            </div>

          </section>

          {/* FOOTER */}

          <footer className="mt-10 border-t border-gray-200 py-6 text-center">

            <p className="text-xs leading-6 text-gray-400">
              SMART MANDI AI · Smarter Agriculture. Better Decisions.
            </p>

            <p className="mt-1 text-xs text-gray-400">
              Market information must be verified before making selling decisions.
            </p>

          </footer>

        </div>

      </main>

    </div>
  );
}

export default Dashboard;