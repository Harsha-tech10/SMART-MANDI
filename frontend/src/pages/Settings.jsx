 import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Save } from "lucide-react";
import i18n from "../i18n/i18n";

function Settings() {
  const navigate = useNavigate();

  const [name, setName] = useState(
    localStorage.getItem("farmerName") || ""
  );

  const [phone, setPhone] = useState(
    localStorage.getItem("farmerPhone") || ""
  );

  const [state, setState] = useState(
    localStorage.getItem("farmerState") || "Karnataka"
  );

  const [district, setDistrict] = useState(
    localStorage.getItem("farmerDistrict") || "Mysuru"
  );

  const [mandi, setMandi] = useState(
    localStorage.getItem("preferredMandi") || "Mysuru APMC"
  );

  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "en"
  );

  const [notifications, setNotifications] = useState(
    localStorage.getItem("notifications") !== "false"
  );

  const [compactMode, setCompactMode] = useState(
    localStorage.getItem("compactMode") === "true"
  );

  const [darkTheme, setDarkTheme] = useState(
    localStorage.getItem("darkTheme") === "true"
  );

  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark-theme",
      darkTheme
    );
  }, [darkTheme]);

  const districts = [
    "Mysuru",
    "Mandya",
    "Bengaluru",
    "Hassan",
    "Chamarajanagar",
    "Tumakuru",
    "Chikkamagaluru",
  ];

  const mandis = [
    "Mysuru APMC",
    "Mandya APMC",
    "Bengaluru APMC",
    "Hassan APMC",
    "Nanjangud APMC",
    "T. Narasipura APMC",
  ];

  // SAVE ALL SETTINGS

  const saveSettings = () => {
    setSaving(true);
    setMessage("");

    try {
      localStorage.setItem("farmerName", name);
      localStorage.setItem("farmerPhone", phone);

      localStorage.setItem("farmerState", state);
      localStorage.setItem("farmerDistrict", district);
      localStorage.setItem("preferredMandi", mandi);

      localStorage.setItem("language", language);
      localStorage.setItem("notifications", String(notifications));
      localStorage.setItem("compactMode", String(compactMode));
      localStorage.setItem("darkTheme", String(darkTheme));

      // Apply selected language
      i18n.changeLanguage(language);

      // Apply selected theme
      document.documentElement.classList.toggle(
        "dark-theme",
        darkTheme
      );

      setMessage("Changes saved successfully!");
    } catch (error) {
      console.error("Settings save error:", error);
      setMessage("Unable to save changes. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // Automatically hide success notification
  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      setMessage("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [message]);

  const sectionStyle =
    "rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6";

  const inputStyle =
    "mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-green-600";

  const labelStyle = "text-sm font-semibold text-gray-700";

  return (
    <div className="min-h-screen bg-[#f8faf5] px-4 py-6 sm:px-6 lg:px-10">

      <div className="mx-auto max-w-5xl">

        {/* HEADER */}

        <button
          onClick={() => navigate("/dashboard")}
          className="mb-5 text-sm font-semibold text-green-700 hover:text-green-900"
        >
          ← Back to Dashboard
        </button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Settings
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage your profile and application preferences.
          </p>
        </div>

        {/* SAVE SUCCESS / ERROR MESSAGE */}

        {message && (
          <div
            role="status"
            aria-live="polite"
            className={`mb-6 flex items-center gap-3 rounded-xl border p-4 text-sm font-semibold ${
              message.includes("successfully")
                ? "border-green-200 bg-green-50 text-green-800"
                : "border-red-200 bg-red-50 text-red-800"
            }`}
          >
            {message.includes("successfully") && (
              <CheckCircle size={21} />
            )}

            <span>{message}</span>
          </div>
        )}

        <div className="space-y-6">

          {/* FARMER PROFILE */}

          <section className={sectionStyle}>
            <h2 className="mb-2 text-xl font-bold text-gray-900">
              Farmer Profile
            </h2>

            <p className="mb-6 text-sm text-gray-500">
              Manage your basic personal information.
            </p>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={labelStyle}>Full Name</label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className={inputStyle}
                />
              </div>

              <div>
                <label className={labelStyle}>Mobile Number</label>

                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your mobile number"
                  className={inputStyle}
                />
              </div>
            </div>
          </section>

          {/* LOCATION PREFERENCES */}

          <section className={sectionStyle}>
            <h2 className="mb-2 text-xl font-bold text-gray-900">
              Location Preferences
            </h2>

            <p className="mb-6 text-sm text-gray-500">
              Select your location and preferred agricultural market.
            </p>

            <div className="grid gap-5 sm:grid-cols-2">

              <div>
                <label className={labelStyle}>State</label>

                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className={inputStyle}
                >
                  <option value="Karnataka">Karnataka</option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Kerala">Kerala</option>
                </select>
              </div>

              <div>
                <label className={labelStyle}>District</label>

                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className={inputStyle}
                >
                  {districts.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className={labelStyle}>Preferred Mandi</label>

                <select
                  value={mandi}
                  onChange={(e) => setMandi(e.target.value)}
                  className={inputStyle}
                >
                  {mandis.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

            </div>
          </section>

          {/* LANGUAGE SETTINGS */}

          <section className={sectionStyle}>
            <h2 className="mb-2 text-xl font-bold text-gray-900">
              Language Settings
            </h2>

            <p className="mb-6 text-sm text-gray-500">
              Choose your preferred application language.
            </p>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { code: "en", label: "English" },
                { code: "kn", label: "ಕನ್ನಡ" },
                { code: "te", label: "తెలుగు" },
                { code: "hi", label: "हिन्दी" },
              ].map((item) => (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => setLanguage(item.code)}
                  className={`rounded-xl border p-4 text-sm font-semibold transition ${
                    language === item.code
                      ? "border-green-600 bg-green-50 text-green-800"
                      : "border-gray-200 bg-gray-50 text-gray-600"
                  }`}
                >
                  {item.label}
                  {language === item.code && (
                    <span className="ml-2">✓</span>
                  )}
                </button>
              ))}
            </div>
          </section>

          {/* NOTIFICATIONS */}

          <section className={sectionStyle}>
            <h2 className="mb-5 text-xl font-bold text-gray-900">
              Notifications
            </h2>

            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-gray-800">
                  Enable Notifications
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Allow future market price alerts and updates.
                </p>
              </div>

              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
                className="h-5 w-5 accent-green-600"
              />
            </div>
          </section>

          {/* DISPLAY PREFERENCES */}

          <section className={sectionStyle}>
            <h2 className="mb-5 text-xl font-bold text-gray-900">
              Display Preferences
            </h2>

            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-gray-800">
                  Compact Display
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Save your preference for a compact interface.
                </p>
              </div>

              <input
                type="checkbox"
                checked={compactMode}
                onChange={(e) => setCompactMode(e.target.checked)}
                className="h-5 w-5 accent-green-600"
              />
            </div>

            <div className="mt-6 flex items-center justify-between gap-4 border-t border-gray-200 pt-5">
              <div>
                <p className="font-semibold text-gray-800">
                  Black / Dark Theme
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Switch between light and dark appearance.
                </p>

                <span className="mt-2 inline-block rounded-lg bg-gray-100 px-3 py-1 text-xs text-gray-600">
                  {darkTheme ? "Dark mode enabled" : "Light mode enabled"}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setDarkTheme(!darkTheme)}
                className={`relative h-7 w-12 rounded-full transition ${
                  darkTheme ? "bg-green-600" : "bg-gray-300"
                }`}
                aria-label="Toggle dark theme"
              >
                <span
                  className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                    darkTheme ? "left-6" : "left-1"
                  }`}
                />
              </button>
            </div>
          </section>

          {/* ACCOUNT SECURITY */}

          <section className={sectionStyle}>
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              Account & Security
            </h2>

            <p className="text-sm leading-6 text-gray-600">
              Secure login, password management and account verification
              will be implemented when the backend authentication system
              is connected.
            </p>
          </section>

          {/* HELP AND SUPPORT */}

          <section className={sectionStyle}>
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              Help & Support
            </h2>

            <p className="text-sm leading-6 text-gray-600">
              Help documentation, frequently asked questions and
              customer support features will be added in a future version.
            </p>
          </section>

        </div>

        {/* SAVE BUTTON */}

        <div className="mt-8 flex justify-end">
          <button
            type="button"
            onClick={saveSettings}
            disabled={saving}
            className="flex items-center gap-2 rounded-xl bg-green-700 px-8 py-3.5 font-semibold text-white shadow-md transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Save size={18} />
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>

        <p className="mt-6 text-center text-xs text-gray-400">
          SMART MANDI AI | Farmer Settings
        </p>

      </div>
    </div>
  );
}

export default Settings;