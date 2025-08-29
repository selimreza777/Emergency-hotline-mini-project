// --------------------
// Initial Counters
// --------------------
let heartCount = 0;
let copyCount = 0;
let coins = 100;

// --------------------
// Navbar Elements
// --------------------
const heartCounter = document.getElementById("heartCount");
const copyCounter = document.getElementById("copyCount");
const coinCounter = document.getElementById("coinCount");

// History
const historyList = document.getElementById("historyList");
const clearHistoryBtn = document.getElementById("clearHistory");

// --------------------
// Helper Functions
// --------------------

// Add heart
function addHeart() {
  heartCount++;
  heartCounter.textContent = heartCount;
}

// Call a service
function makeCall(service, number) {
  if (coins < 20) {
    alert("Not enough coins to make a call!");
    return;
  }
  coins -= 20;
  coinCounter.textContent = coins;
  alert(`Calling ${service} at ${number}`);
  addToHistory(service, number);
}

// Add entry to history with time
function addToHistory(action, number) {
  const now = new Date();
  const time = now.toLocaleTimeString(); // hh:mm:ss AM/PM
  const li = document.createElement("li");
  li.textContent = `${action} - ${number} (at ${time})`;
  li.className = "bg-[#f5fff6] px-3 py-2 rounded shadow text-sm";
  historyList.prepend(li); // newest on top
}

// Copy number (no history)
function copyNumber(number) {
  navigator.clipboard.writeText(number);
  copyCount++;
  copyCounter.textContent = copyCount;
}

// --------------------
// Card Events
// --------------------
const cards = [
  { cardId: "cardEmergency", name: "National Emergency", numberId: "numberEmergency" },
  { cardId: "cardPolice", name: "Police Helpline", numberId: "numberPolice" },
  { cardId: "cardAmbulance", name: "Ambulance", numberId: "numberAmbulance" },
  { cardId: "cardFire", name: "Fire Service", numberId: "numberFire" },
  { cardId: "cardWomen", name: "Women & Child Helpline", numberId: "numberWomen" },
  { cardId: "cardCorruption", name: "Anti-Corruption", numberId: "numberCorruption" }
];

cards.forEach(card => {
  const cardEl = document.getElementById(card.cardId);

  // Heart
  cardEl.querySelector(".fa-heart").addEventListener("click", addHeart);

  // Copy
  cardEl.querySelector(`[id^="copy"]`).addEventListener("click", () => {
    copyNumber(document.getElementById(card.numberId).textContent);
  });

  // Call
  cardEl.querySelector(`[id^="call"]`).addEventListener("click", () => {
    const number = document.getElementById(card.numberId).textContent;
    makeCall(card.name, number);
  });
});

// --------------------
// Clear History Button
// --------------------
clearHistoryBtn.addEventListener("click", () => {
  historyList.innerHTML = "";
});
