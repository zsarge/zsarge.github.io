import React, { useState, useEffect } from "react";

const quotes = [
  "No Aarons were harmed in the making of this website",
  "Made with 100% sounds",
  "To be loved is to be known",
];

const RandomQuote: React.FC = () => {
  const [quote, setQuote] = useState<string>("");

  useEffect(() => {
    // Pick a random quote on component mount
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  }, []);

  return <p className="text-lg text-gray-600 dark:text-gray-400 text-center italic">{quote}</p>;
};

export default RandomQuote;
