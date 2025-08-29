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

// History Elements
const historyList = document.getElementById("historyList");
const clearHistoryBtn = document.getElementById("clearHistory");

// --------------------
// Helper Functions
// --------------------

// Add heart count
function addHeart() {
  heartCount++;
  heartCounter.textContent = heartCount;
}

// Make a call
function makeCall(serviceName, number) {
  if (coins < 20) {
    alert("Not enough coins to make a call!");
    return;
  }
  coins -= 20;
  coinCounter.textContent = coins;
  alert(`Calling ${serviceName} at ${number}`);
  addToHistory(serviceName, number);
}

// Add entry to history
function addToHistory(serviceName, number) {
  const now = new Date();
  const time = now.toLocaleTimeString(); // hh:mm:ss AM/PM
  const li = document.createElement("li");
  li.textContent = `${serviceName} - ${number} (at ${time})`;
  li.className = "bg-[#f5fff6] px-3 py-2 rounded shadow text-sm";
  historyList.prepend(li); // newest first
}

// Copy number to clipboard
function copyNumber(number) {
  navigator.clipboard.writeText(number);
  copyCount++;
  copyCounter.textContent = copyCount;
}

// --------------------
// Card Definitions
// --------------------
const cards = [
  { id: "Emergency", name: "National Emergency", number: "999" },
  { id: "Police", name: "Police Helpline", number: "999" },
  { id: "Ambulance", name: "Ambulance", number: "108" },
  { id: "Fire", name: "Fire Service", number: "999" },
  { id: "Women", name: "Women & Child Helpline", number: "109" },
  { id: "Corruption", name: "Anti-Corruption", number: "106" }
];

// --------------------
// Add Events to Cards
// --------------------
cards.forEach(card => {
  // Heart
  const heartBtn = document.querySelector(`#card${card.id} .fa-heart`);
  heartBtn?.addEventListener("click", addHeart);

  // Copy
  const copyBtn = document.getElementById(`copy${card.id}`);
  copyBtn?.addEventListener("click", () => {
    copyNumber(card.number);
  });

  // Call
  const callBtn = document.getElementById(`call${card.id}`);
  callBtn?.addEventListener("click", () => {
    makeCall(card.name, card.number);
  });
});

// --------------------
// Clear History Button
// --------------------
clearHistoryBtn.addEventListener("click", () => {
  historyList.innerHTML = "";
});
