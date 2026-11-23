import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  Sprout,
  Menu,
  X,
  ArrowRight,
  TrendingUp,
  FileSpreadsheet,
  MessageCircle,
  BarChart3,
  ShieldCheck,
  Languages,
  MapPin,
} from "lucide-react";

function Home() {
  const { t, i18n } = useTranslation();

  const [menuOpen, setMenuOpen] = useState(false);

  // Change website language
  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    localStorage.setItem("language", language);
    setMenuOpen(false);
  };

  // Features
  const features = [
    {
      icon: TrendingUp,
      title: t("marketComparison"),
      description: t("marketComparisonDesc"),
    },
    {
      icon: FileSpreadsheet,
      title: t("dataProcessing"),
      description: t("dataProcessingDesc"),
    },
    {
      icon: MessageCircle,
      title: t("aiAssistant"),
      description: t("aiAssistantDesc"),
    },
    {
      icon: BarChart3,
      title: t("priceAnalytics"),
      description: t("priceAnalyticsDesc"),
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8faf5] text-gray-800">

      {/* NAVIGATION BAR */}

      <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">

          {/* Logo */}

          <Link to="/" className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-700 text-white">
              <Sprout size={26} />
            </div>

            <div>
              <h1 className="text-lg font-bold text-brand-800">
                SMART MANDI AI
              </h1>

              <p className="text-xs text-gray-500">
                Farmer Intelligence Platform
              </p>
            </div>

          </Link>

          {/* Desktop Navigation */}

          <div className="hidden items-center gap-8 md:flex">

            <a href="#home" className="text-sm font-medium hover:text-brand-700">
              {t("home")}
            </a>

            <a href="#features" className="text-sm font-medium hover:text-brand-700">
              {t("features")}
            </a>

            <a href="#about" className="text-sm font-medium hover:text-brand-700">
              {t("about")}
            </a>

            <a href="#how-it-works" className="text-sm font-medium hover:text-brand-700">
              {t("howItWorks")}
            </a>

          </div>

          {/* Language and Login */}

          <div className="hidden items-center gap-4 md:flex">

            <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2">

              <Languages size={17} className="text-brand-700" />

              <select
                value={i18n.resolvedLanguage || i18n.language}
                onChange={(e) => changeLanguage(e.target.value)}
                className="bg-transparent text-sm outline-none"
              >
                <option value="en">English</option>
                <option value="kn">ಕನ್ನಡ</option>
                <option value="te">తెలుగు</option>
                <option value="hi">हिन्दी</option>
              </select>

            </div>

            <Link
              to="/dashboard"
              className="rounded-lg bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-800"
            >
              {t("getStarted")}
            </Link>

          </div>

          {/* Mobile Menu Button */}

          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={25} /> : <Menu size={25} />}
          </button>

        </div>

        {/* Mobile Navigation */}

        {menuOpen && (

          <div className="border-t border-gray-100 bg-white px-5 py-5 md:hidden">

            <div className="flex flex-col gap-5">

              <a href="#home" onClick={() => setMenuOpen(false)}>
                {t("home")}
              </a>

              <a href="#features" onClick={() => setMenuOpen(false)}>
                {t("features")}
              </a>

              <a href="#about" onClick={() => setMenuOpen(false)}>
                {t("about")}
              </a>

              <a href="#how-it-works" onClick={() => setMenuOpen(false)}>
                {t("howItWorks")}
              </a>

              <select
                value={i18n.resolvedLanguage || i18n.language}
                onChange={(e) => changeLanguage(e.target.value)}
                className="w-full rounded-lg border border-gray-200 p-3"
              >
                <option value="en">English</option>
                <option value="kn">ಕನ್ನಡ</option>
                <option value="te">తెలుగు</option>
                <option value="hi">हिन्दी</option>
              </select>

              <Link
                to="/dashboard"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg bg-brand-700 px-5 py-3 text-center font-semibold text-white"
              >
                {t("getStarted")}
              </Link>

            </div>

          </div>

        )}

      </nav>


      {/* HERO SECTION */}

      <section
        id="home"
        className="relative overflow-hidden px-5 py-24 md:py-32"
      >

        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">

          {/* Hero Content */}

          <div>

            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-brand-100 px-4 py-2 text-sm font-medium text-brand-800">

              <Sprout size={17} />

              {t("welcome")}

            </div>

            <h1 className="text-4xl font-extrabold leading-tight text-gray-900 md:text-6xl">

              {t("heroTitle")}

            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-gray-600 md:text-lg">

              {t("heroDescription")}

            </p>

            {/* Hero Buttons */}

            <div className="mt-9 flex flex-wrap gap-4">

              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-7 py-4 font-semibold text-white shadow-lg transition hover:bg-brand-800"
              >
                {t("exploreMarkets")}

                <ArrowRight size={20} />

              </Link>

              <a
                href="#about"
                className="rounded-xl border border-gray-300 bg-white px-7 py-4 font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                {t("learnMore")}
              </a>

            </div>

            {/* Trust Indicators */}

            <div className="mt-12 flex flex-wrap gap-7">

              <div className="flex items-center gap-2 text-sm text-gray-600">

                <ShieldCheck className="text-brand-700" size={20} />

                {t("verifiedData")}

              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600">

                <Languages className="text-brand-700" size={20} />

                {t("regionalLanguages")}

              </div>

            </div>

          </div>


          {/* Hero Visual */}

          <div className="relative">

            <div className="rounded-3xl bg-brand-100 p-8 md:p-12">

              <div className="rounded-2xl bg-white p-6 shadow-xl">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-sm text-gray-500">
                      {t("multipleMandis")}
                    </p>

                    <h3 className="mt-1 text-2xl font-bold text-gray-900">
                      Smart Market Insights
                    </h3>

                  </div>

                  <div className="rounded-xl bg-brand-100 p-3 text-brand-700">
                    <TrendingUp size={28} />
                  </div>

                </div>

                <div className="mt-8 space-y-5">

                  <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4">

                    <div className="flex items-center gap-3">

                      <div className="rounded-lg bg-green-100 p-3 text-green-700">
                        <MapPin size={20} />
                      </div>

                      <div>
                        <p className="font-semibold">Mysuru Mandi</p>
                        <p className="text-xs text-gray-500">Market location</p>
                      </div>

                    </div>

                    <span className="text-sm font-semibold text-brand-700">
                      {t("compareMarkets")}
                    </span>

                  </div>


                  <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4">

                    <div className="flex items-center gap-3">

                      <div className="rounded-lg bg-amber-100 p-3 text-amber-700">
                        <TrendingUp size={20} />
                      </div>

                      <div>
                        <p className="font-semibold">Bengaluru Mandi</p>
                        <p className="text-xs text-gray-500">Market location</p>
                      </div>

                    </div>

                    <span className="text-sm font-semibold text-brand-700">
                      {t("compareMarkets")}
                    </span>

                  </div>


                  <div className="rounded-xl bg-brand-700 p-5 text-white">

                    <p className="text-sm text-green-100">
                      {t("tagline")}
                    </p>

                    <div className="mt-3 flex items-center gap-2">
                      <Sprout size={22} />
                      <span className="font-bold">
                        SMART MANDI AI
                      </span>
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* FEATURES SECTION */}

      <section id="features" className="bg-white px-5 py-24">

        <div className="mx-auto max-w-7xl">

          <div className="mx-auto mb-16 max-w-2xl text-center">

            <p className="font-semibold uppercase tracking-widest text-brand-700">
              {t("ourFeatures")}
            </p>

            <h2 className="mt-4 text-3xl font-bold text-gray-900 md:text-4xl">
              {t("featureHeading")}
            </h2>

            <p className="mt-4 leading-7 text-gray-500">
              {t("featureIntroduction")}
            </p>

          </div>


          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">

            {features.map((feature, index) => {

              const Icon = feature.icon;

              return (

                <div
                  key={index}
                  className="rounded-2xl border border-gray-100 bg-[#f8faf5] p-7 transition duration-300 hover:-translate-y-2 hover:shadow-xl"
                >

                  <div className="mb-6 inline-flex rounded-xl bg-brand-100 p-4 text-brand-700">

                    <Icon size={27} />

                  </div>

                  <h3 className="text-lg font-bold text-gray-900">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-gray-500">
                    {feature.description}
                  </p>

                </div>

              );

            })}

          </div>

        </div>

      </section>


      {/* ABOUT SECTION */}

      <section id="about" className="px-5 py-24">

        <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">

          <div className="rounded-3xl bg-brand-700 p-10 text-white md:p-14">

            <Sprout size={55} />

            <h2 className="mt-7 text-3xl font-bold">
              {t("empoweringFarmers")}
            </h2>

            <p className="mt-5 leading-8 text-green-100">
              {t("agricultureTechnology")}
            </p>

            <div className="mt-9 grid grid-cols-2 gap-5">

              <div className="rounded-xl bg-white/10 p-4">

                <p className="text-2xl font-bold">4</p>

                <p className="mt-1 text-sm text-green-100">
                  Regional Languages
                </p>

              </div>

              <div className="rounded-xl bg-white/10 p-4">

                <p className="text-2xl font-bold">AI</p>

                <p className="mt-1 text-sm text-green-100">
                  Smart Assistance
                </p>

              </div>

            </div>

          </div>


          <div>

            <p className="font-semibold uppercase tracking-widest text-brand-700">
              {t("about")}
            </p>

            <h2 className="mt-4 text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
              {t("aboutTitle")}
            </h2>

            <p className="mt-6 text-base leading-8 text-gray-600">
              {t("aboutDescription")}
            </p>

            <div className="mt-8 flex items-start gap-4">

              <div className="rounded-xl bg-brand-100 p-3 text-brand-700">
                <ShieldCheck size={25} />
              </div>

              <div>

                <h3 className="font-bold text-gray-900">
                  {t("verifiedData")}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  {t("featureIntroduction")}
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* HOW IT WORKS SECTION */}

      <section id="how-it-works" className="bg-white px-5 py-24">

        <div className="mx-auto max-w-7xl">

          <div className="mb-16 text-center">

            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
              {t("howTitle")}
            </h2>

            <p className="mt-4 text-gray-500">
              {t("howDescription")}
            </p>

          </div>


          <div className="grid gap-8 md:grid-cols-3">

            {/* Step 1 */}

            <div className="rounded-2xl border border-gray-100 p-8 text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-100 text-brand-700">

                <FileSpreadsheet size={30} />

              </div>

              <span className="mt-6 block text-sm font-bold text-brand-700">
                STEP 01
              </span>

              <h3 className="mt-3 text-xl font-bold">
                {t("stepOneTitle")}
              </h3>

              <p className="mt-3 text-sm leading-7 text-gray-500">
                {t("stepOneDescription")}
              </p>

            </div>


            {/* Step 2 */}

            <div className="rounded-2xl border border-gray-100 p-8 text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-100 text-brand-700">

                <BarChart3 size={30} />

              </div>

              <span className="mt-6 block text-sm font-bold text-brand-700">
                STEP 02
              </span>

              <h3 className="mt-3 text-xl font-bold">
                {t("stepTwoTitle")}
              </h3>

              <p className="mt-3 text-sm leading-7 text-gray-500">
                {t("stepTwoDescription")}
              </p>

            </div>


            {/* Step 3 */}

            <div className="rounded-2xl border border-gray-100 p-8 text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-100 text-brand-700">

                <TrendingUp size={30} />

              </div>

              <span className="mt-6 block text-sm font-bold text-brand-700">
                STEP 03
              </span>

              <h3 className="mt-3 text-xl font-bold">
                {t("stepThreeTitle")}
              </h3>

              <p className="mt-3 text-sm leading-7 text-gray-500">
                {t("stepThreeDescription")}
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* CALL TO ACTION */}

      <section className="px-5 py-20">

        <div className="mx-auto max-w-5xl rounded-3xl bg-brand-800 px-7 py-14 text-center text-white md:px-16">

          <Sprout className="mx-auto" size={45} />

          <h2 className="mt-6 text-3xl font-bold md:text-4xl">
            {t("tagline")}
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-green-100">
            {t("heroDescription")}
          </p>

          <Link
            to="/dashboard"
            className="mt-9 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-bold text-brand-800 transition hover:bg-green-50"
          >
            {t("getStarted")}

            <ArrowRight size={20} />

          </Link>

        </div>

      </section>


      {/* FOOTER */}

      <footer className="border-t border-gray-200 bg-white px-5 py-10">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 md:flex-row">

          <div className="flex items-center gap-3">

            <div className="rounded-lg bg-brand-700 p-2 text-white">
              <Sprout size={22} />
            </div>

            <span className="font-bold text-brand-800">
              SMART MANDI AI
            </span>

          </div>

          <p className="text-center text-sm text-gray-500">
            {t("tagline")}
          </p>

          <p className="text-sm text-gray-400">
            © 2026 Smart Mandi AI
          </p>

        </div>

      </footer>

    </div>
  );
}

export default Home;