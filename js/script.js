// script.js

// DOM Elements
const cardList = document.getElementById("cardList");
const heartBtn = document.getElementById("heartBtn");
const heartCountEl = document.getElementById("heartCount");
const coinCountEl = document.getElementById("coinCount");
const historyList = document.getElementById("historyList");
const clearHistoryBtn = document.getElementById("clearHistory");

// State
let coins = 100;
let hearts = 0;
let callHistory = [];

coinCountEl.textContent = coins;
heartCountEl.textContent = hearts;

// Load services
const services = JSON.parse(cardList.dataset.services);

// Render cards
function renderCards() {
  cardList.innerHTML = "";
  services.forEach(service => {
    const card = document.createElement("div");
    card.className = "relative bg-[#141B3A] rounded-2xl p-4 flex flex-col items-center gap-2 hover:bg-[#1F2945] transition";

    // Card image top
    const img = document.createElement("img");
    img.src = service.icon;
    img.alt = service.nameEn;
    img.className = "h-16 w-16 mt-2";
    card.appendChild(img);

    // Card love icon top-right
    const loveBtn = document.createElement("button");
    loveBtn.innerHTML = "❤️";
    loveBtn.className = "absolute top-2 right-2 text-lg";
    loveBtn.addEventListener("click", () => {
      hearts++;
      heartCountEl.textContent = hearts;
    });
    card.appendChild(loveBtn);

    // Service name & number
    const title = document.createElement("h4");
    title.className = "font-semibold mt-2";
    title.textContent = service.nameBn;
    card.appendChild(title);

    const numberP = document.createElement("p");
    numberP.className = "opacity-80 flex justify-between w-full mt-1";
    numberP.innerHTML = `<span>${service.number}</span>`;
    card.appendChild(numberP);

    // Call button
    const callBtn = document.createElement("button");
    callBtn.textContent = "Call";
    callBtn.className = "bg-blue-600 px-3 py-1 rounded-lg text-sm hover:bg-blue-500 mt-2 w-full";
    callBtn.dataset.number = service.number;

    callBtn.addEventListener("click", () => {
      if (coins >= 20) {
        coins -= 20;
        coinCountEl.textContent = coins;
        callHistory.unshift(service.number);
        renderHistory();
      } else {
        alert("Not enough coins to call!");
      }
    });

    card.appendChild(callBtn);

    cardList.appendChild(card);
  });
}

// Render history
function renderHistory() {
  historyList.innerHTML = "";
  callHistory.forEach(num => {
    const li = document.createElement("li");
    li.className = "bg-slate-100 text-black rounded-lg p-2";
    li.textContent = num;
    historyList.appendChild(li);
  });
}

// Clear history
clearHistoryBtn.addEventListener("click", () => {
  callHistory = [];
  renderHistory();
});

// Initial render
renderCards();
