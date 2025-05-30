// anime-quotes.js

document.addEventListener("DOMContentLoaded", () => {
  const quoteBox = document.getElementById("anime-quote-box");
  const quoteText = document.getElementById("anime-quote-text");
  const quoteMeta = document.getElementById("anime-quote-meta");

  function fetchQuote() {
    fetch("https://yurippe.vercel.app/api/quotes?random=1")
      .then((res) => res.json())
      .then((data) => {
        const quote = data[0];
        quoteText.textContent = `"${quote.quote}"`;
        quoteMeta.textContent = `— ${quote.character} (${quote.show})`;
      })
      .catch((err) => {
        quoteText.textContent = "Failed to load quote.";
        quoteMeta.textContent = "";
        console.error("Quote fetch error:", err);
      });
  }

  fetchQuote();
  setInterval(fetchQuote, 35000); // every 25 seconds

  // Sakura petal animation
  const numPetals = 20;
  for (let i = 0; i < numPetals; i++) {
    const petal = document.createElement("div");
    petal.className = "sakura-petal";
    petal.style.left = `${Math.random() * 100}%`;
    petal.style.animationDelay = `${Math.random() * 5}s`;
    document.body.appendChild(petal);
  }
});
