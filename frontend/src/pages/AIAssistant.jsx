import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  Bot,
  Send,
  User,
  Languages,
  Sprout,
  Trash2,
  Sparkles,
} from "lucide-react";

// LANGUAGE CONTENT
const translations = {
  en: {
    title: "AI Farmer Assistant",
    subtitle: "Your smart agricultural companion",
    welcome: "Namaste! How can I help you today?",
    description:
      "Ask me about market prices, selling decisions and agricultural information.",
    placeholder: "Ask your farming question...",
    send: "Send",
    thinking: "Thinking...",
    demo: "Demo AI",
    suggestions: [
      "How do I compare mandi prices?",
      "How can I calculate my profit?",
      "What is a quintal?",
      "How do I choose a mandi?",
    ],
    quintal:
      "One quintal is equal to 100 kilograms. For example, 5 quintals = 500 kilograms.",
    profit:
      "To calculate your net revenue, multiply the selling price per quintal by your quantity. Then subtract transportation, loading, unloading, market fees and other expenses.",
    market:
      "You can use the Compare Markets feature to compare mandi prices. Check the commodity, quality, unit and market date before making a decision. Also consider transportation expenses.",
    default:
      "Thank you for your question! I am currently running in demonstration mode. A real AI service will be connected later to provide more detailed agricultural guidance.",
  },

  kn: {
    title: "AI ರೈತ ಸಹಾಯಕ",
    subtitle: "ನಿಮ್ಮ ಸ್ಮಾರ್ಟ್ ಕೃಷಿ ಸಹಾಯಕ",
    welcome: "ನಮಸ್ಕಾರ! ಇಂದು ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಲಿ?",
    description:
      "ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು ಮತ್ತು ಕೃಷಿ ಮಾಹಿತಿಯ ಬಗ್ಗೆ ನನ್ನನ್ನು ಕೇಳಿ.",
    placeholder: "ನಿಮ್ಮ ಕೃಷಿ ಪ್ರಶ್ನೆಯನ್ನು ಕೇಳಿ...",
    send: "ಕಳುಹಿಸಿ",
    thinking: "ಯೋಚಿಸುತ್ತಿದೆ...",
    demo: "ಡೆಮೊ AI",
    suggestions: [
      "ಮಂಡಿ ಬೆಲೆಗಳನ್ನು ಹೇಗೆ ಹೋಲಿಸಬಹುದು?",
      "ನನ್ನ ಲಾಭವನ್ನು ಹೇಗೆ ಲೆಕ್ಕ ಹಾಕುವುದು?",
      "ಕ್ವಿಂಟಾಲ್ ಎಂದರೇನು?",
      "ಮಂಡಿಯನ್ನು ಹೇಗೆ ಆಯ್ಕೆ ಮಾಡುವುದು?",
    ],
    quintal:
      "ಒಂದು ಕ್ವಿಂಟಾಲ್ ಎಂದರೆ 100 ಕಿಲೋಗ್ರಾಂ. ಉದಾಹರಣೆಗೆ, 5 ಕ್ವಿಂಟಾಲ್ = 500 ಕಿಲೋಗ್ರಾಂ.",
    profit:
      "ನಿಮ್ಮ ನಿವ್ವಳ ಆದಾಯವನ್ನು ಲೆಕ್ಕ ಹಾಕಲು, ಪ್ರತಿ ಕ್ವಿಂಟಾಲ್ ಮಾರಾಟದ ಬೆಲೆಯನ್ನು ಪ್ರಮಾಣದಿಂದ ಗುಣಿಸಿ. ನಂತರ ಸಾರಿಗೆ, ಲೋಡಿಂಗ್, ಅನ್‌ಲೋಡಿಂಗ್ ಮತ್ತು ಇತರ ವೆಚ್ಚಗಳನ್ನು ಕಳೆಯಿರಿ.",
    market:
      "ಮಂಡಿ ಬೆಲೆಗಳನ್ನು ಹೋಲಿಸಲು Compare Markets ವೈಶಿಷ್ಟ್ಯವನ್ನು ಬಳಸಿ. ನಿರ್ಧಾರ ತೆಗೆದುಕೊಳ್ಳುವ ಮೊದಲು ಬೆಳೆ, ಗುಣಮಟ್ಟ, ಅಳತೆ ಮತ್ತು ಮಾರುಕಟ್ಟೆ ದಿನಾಂಕವನ್ನು ಪರಿಶೀಲಿಸಿ.",
    default:
      "ನಿಮ್ಮ ಪ್ರಶ್ನೆಗೆ ಧನ್ಯವಾದಗಳು! ಈಗ ನಾನು ಡೆಮೊ ಮೋಡ್‌ನಲ್ಲಿ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತಿದ್ದೇನೆ. ನಿಜವಾದ AI ಸೇವೆಯನ್ನು ನಂತರ ಸಂಪರ್ಕಿಸಲಾಗುತ್ತದೆ.",
  },

  te: {
    title: "AI రైతు సహాయకుడు",
    subtitle: "మీ స్మార్ట్ వ్యవసాయ సహాయకుడు",
    welcome: "నమస్కారం! ఈ రోజు నేను మీకు ఎలా సహాయపడగలను?",
    description:
      "మార్కెట్ ధరలు మరియు వ్యవసాయ సమాచారం గురించి నన్ను అడగండి.",
    placeholder: "మీ వ్యవసాయ ప్రశ్న అడగండి...",
    send: "పంపండి",
    thinking: "ఆలోచిస్తోంది...",
    demo: "డెమో AI",
    suggestions: [
      "మండి ధరలను ఎలా పోల్చాలి?",
      "నా లాభాన్ని ఎలా లెక్కించాలి?",
      "క్వింటాల్ అంటే ఏమిటి?",
      "మండిని ఎలా ఎంచుకోవాలి?",
    ],
    quintal:
      "ఒక క్వింటాల్ అంటే 100 కిలోగ్రాములు. ఉదాహరణకు, 5 క్వింటాళ్లు = 500 కిలోగ్రాములు.",
    profit:
      "మీ నికర ఆదాయాన్ని లెక్కించడానికి, క్వింటాల్‌కు అమ్మకపు ధరను పరిమాణంతో గుణించండి. ఆ తర్వాత రవాణా, లోడింగ్, అన్‌లోడింగ్ మరియు ఇతర ఖర్చులను తీసివేయండి.",
    market:
      "మండి ధరలను పోల్చడానికి Compare Markets ఫీచర్ ఉపయోగించండి. నిర్ణయం తీసుకునే ముందు పంట, నాణ్యత, యూనిట్ మరియు మార్కెట్ తేదీని తనిఖీ చేయండి.",
    default:
      "మీ ప్రశ్నకు ధన్యవాదాలు! ప్రస్తుతం నేను డెమో మోడ్‌లో పనిచేస్తున్నాను. నిజమైన AI సేవను తర్వాత అనుసంధానిస్తాము.",
  },

  hi: {
    title: "AI किसान सहायक",
    subtitle: "आपका स्मार्ट कृषि साथी",
    welcome: "नमस्ते! आज मैं आपकी कैसे मदद कर सकता हूँ?",
    description:
      "मंडी की कीमतों और कृषि जानकारी के बारे में मुझसे पूछें।",
    placeholder: "अपना कृषि प्रश्न पूछें...",
    send: "भेजें",
    thinking: "सोच रहा है...",
    demo: "डेमो AI",
    suggestions: [
      "मंडी की कीमतों की तुलना कैसे करें?",
      "मैं अपना लाभ कैसे निकालूँ?",
      "क्विंटल क्या होता है?",
      "मंडी कैसे चुनें?",
    ],
    quintal:
      "एक क्विंटल 100 किलोग्राम के बराबर होता है। उदाहरण के लिए, 5 क्विंटल = 500 किलोग्राम।",
    profit:
      "अपनी शुद्ध आय निकालने के लिए प्रति क्विंटल बिक्री मूल्य को मात्रा से गुणा करें। फिर परिवहन, लोडिंग, अनलोडिंग और अन्य खर्च घटाएँ।",
    market:
      "मंडी की कीमतों की तुलना करने के लिए Compare Markets सुविधा का उपयोग करें। निर्णय लेने से पहले फसल, गुणवत्ता, इकाई और बाजार की तारीख जाँचें।",
    default:
      "आपके प्रश्न के लिए धन्यवाद! अभी मैं डेमो मोड में काम कर रहा हूँ। वास्तविक AI सेवा बाद में जोड़ी जाएगी।",
  },
};

// DEMONSTRATION RESPONSE FUNCTION
function getResponse(question, language) {
  const text = question.toLowerCase();
  const content = translations[language] || translations.en;

  if (
    text.includes("quintal") ||
    text.includes("ಕ್ವಿಂಟಾಲ್") ||
    text.includes("క్వింటాల్") ||
    text.includes("क्विंटल")
  ) {
    return content.quintal;
  }

  if (
    text.includes("profit") ||
    text.includes("revenue") ||
    text.includes("ಲಾಭ") ||
    text.includes("లాభ") ||
    text.includes("लाभ")
  ) {
    return content.profit;
  }

  if (
    text.includes("price") ||
    text.includes("mandi") ||
    text.includes("ಮಂಡಿ") ||
    text.includes("ధర") ||
    text.includes("मंडी")
  ) {
    return content.market;
  }

  return content.default;
}

function AIAssistant() {
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("language") || "en";
  });

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const t = translations[language] || translations.en;

  // Automatically scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  // Change language
  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;

    setLanguage(selectedLanguage);
    localStorage.setItem("language", selectedLanguage);
  };

  // Send message
  const sendMessage = (text) => {
    const question = text.trim();

    if (!question || loading) {
      return;
    }

 const userMessage = {
  id: crypto.randomUUID(),
  role: "user",
  text: String(question),
};
    setMessages((previousMessages) => [
      ...previousMessages,
      userMessage,
    ]);

    setInput("");
    setLoading(true);

    const selectedLanguage = language;

    setTimeout(() => {
      const answer = getResponse(question, selectedLanguage);

      const assistantMessage = {
        id: Date.now() + 1,
        role: "assistant",
        text: answer,
      };

      setMessages((previousMessages) => [
        ...previousMessages,
        assistantMessage,
      ]);

      setLoading(false);
    }, 700);
  };

  // Clear conversation
  const clearChat = () => {
    setMessages([]);
    setInput("");
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 p-3 sm:p-6">

      {/* PAGE HEADER */}
      <div className="mx-auto mb-5 w-full max-w-5xl">

        <button
          onClick={() => navigate("/dashboard")}
          className="mb-4 flex items-center gap-2 text-sm font-medium text-green-700"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>

        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

          <div className="flex items-center gap-3">

            <div className="rounded-2xl bg-green-700 p-3 text-white">
              <Bot size={28} />
            </div>

            <div>
              <h1 className="text-xl font-bold text-slate-800 sm:text-2xl">
                {t.title}
              </h1>

              <p className="text-sm text-slate-500">
                {t.subtitle}
              </p>
            </div>

          </div>

          {/* LANGUAGE SELECTOR */}
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2">

            <Languages size={18} className="text-green-700" />

            <select
              value={language}
              onChange={handleLanguageChange}
              className="bg-transparent text-sm font-medium outline-none"
            >
              <option value="en">English</option>
              <option value="kn">ಕನ್ನಡ</option>
              <option value="te">తెలుగు</option>
              <option value="hi">हिन्दी</option>
            </select>

          </div>

        </div>

      </div>

      {/* CHAT WINDOW */}
      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        {/* CHAT HEADER */}
        <div className="flex items-center justify-between border-b border-slate-100 p-4">

          <div className="flex items-center gap-3">

            <div className="rounded-full bg-green-100 p-2 text-green-700">
              <Sprout size={21} />
            </div>

            <div>
              <p className="font-semibold text-slate-800">
                Smart Mandi Assistant
              </p>

              <p className="text-xs text-green-600">
                <Sparkles size={12} className="mr-1 inline" />
                {t.demo}
              </p>
            </div>

          </div>

          <button
            onClick={clearChat}
            title="Clear conversation"
            className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 size={19} />
          </button>

        </div>

        {/* CHAT MESSAGES */}
        <div className="flex-1 space-y-5 overflow-y-auto p-4 sm:p-6">

          {/* WELCOME MESSAGE */}
          <div className="flex items-start gap-3">

            <div className="rounded-full bg-green-100 p-2 text-green-700">
              <Bot size={19} />
            </div>

            <div className="max-w-[85%] rounded-2xl rounded-tl-none bg-slate-100 p-4">

              <p className="font-semibold text-slate-800">
                {t.welcome}
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                {t.description}
              </p>

            </div>

          </div>

          {/* SUGGESTED QUESTIONS */}
          {messages.length === 0 && (
            <div className="ml-10">

              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                Suggested Questions
              </p>

              <div className="flex flex-wrap gap-2">

                {t.suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => sendMessage(suggestion)}
                    disabled={loading}
                    className="rounded-xl border border-green-200 bg-green-50 px-3 py-2 text-left text-xs font-medium text-green-800 hover:bg-green-100 sm:text-sm"
                  >
                    {suggestion}
                  </button>
                ))}

              </div>

            </div>
          )}

          {/* USER AND ASSISTANT MESSAGES */}
          {messages.map((message) => (

            <div
              key={message.id}
              className={`flex items-start gap-3 ${
                message.role === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >

              {message.role === "assistant" && (
                <div className="rounded-full bg-green-100 p-2 text-green-700">
                  <Bot size={19} />
                </div>
              )}

              <div
                className={`max-w-[85%] whitespace-pre-wrap break-words rounded-2xl p-4 text-sm leading-6 ${
                  message.role === "user"
                    ? "rounded-tr-none bg-green-700 text-white"
                    : "rounded-tl-none bg-slate-100 text-slate-700"
                }`}
              >
                {message.text}
              </div>

              {message.role === "user" && (
                <div className="rounded-full bg-slate-200 p-2 text-slate-600">
                  <User size={19} />
                </div>
              )}

            </div>

          ))}

          {/* LOADING MESSAGE */}
          {loading && (
            <div className="flex items-center gap-3">

              <div className="rounded-full bg-green-100 p-2 text-green-700">
                <Bot size={19} />
              </div>

              <div className="rounded-xl bg-slate-100 px-4 py-3 text-sm text-slate-500">
                {t.thinking}
              </div>

            </div>
          )}

          <div ref={messagesEndRef} />

        </div>

        {/* MESSAGE INPUT */}
        <div className="border-t border-slate-100 bg-white p-3 sm:p-4">

          <form
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage(input);
            }}
            className="flex items-center gap-2"
          >

            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder={t.placeholder}
              className="min-w-0 flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
            />

            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="flex items-center justify-center gap-2 rounded-xl bg-green-700 px-4 py-3 text-white hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Send size={18} />

              <span className="hidden sm:inline">
                {t.send}
              </span>
            </button>

          </form>

          <p className="mt-3 text-center text-xs text-slate-400">
            Demonstration assistant. Verify market information before making selling decisions.
          </p>

        </div>

      </div>

    </div>
  );
}

export default AIAssistant;