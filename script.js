const API_URL = "https://koruxa-potion-rune-exchange.spookbuilds.workers.dev";

const state = {
  menu: [],
  basket: []
};

const elements = {
  exchangeGroups: document.querySelector("#exchange-groups"),
  menuStatus: document.querySelector("#menu-status"),
  itemSearch: document.querySelector("#item-search"),
  template: document.querySelector("#exchange-card-template"),
  basketItems: document.querySelector("#basket-items"),
  emptyBasket: document.querySelector("#empty-basket"),
  basketCount: document.querySelector("#basket-count"),
  receiveSummary: document.querySelector("#receive-summary"),
  receiveSummaryLines: document.querySelector("#receive-summary-lines"),
  checkoutForm: document.querySelector("#checkout-form"),
  playerName: document.querySelector("#player-name"),
  orderNotes: document.querySelector("#order-notes"),
  website: document.querySelector("#website"),
  submitOrder: document.querySelector("#submit-order"),
  formMessage: document.querySelector("#form-message")
};

const numberFormatter = new Intl.NumberFormat("en-GB");

function formatNumber(value) {
  return numberFormatter.format(value);
}

function pluralise(label, amount) {
  if (amount === 1) return label;
  return label.endsWith("s") ? label : `${label}s`;
}

function getItemById(itemId) {
  return state.menu.find((item) => item.id === itemId);
}

function getTradeOption(item, optionId) {
  return item?.options.find((option) => option.id === optionId);
}

function makeBasketKey(itemId, optionId) {
  return `${itemId}::${optionId}`;
}

function clampQuantity(value, maxQuantity) {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed)) return 1;
  const upper = Number.isInteger(maxQuantity) ? maxQuantity : Number.MAX_SAFE_INTEGER;
  return Math.min(upper, Math.max(1, parsed));
}

function scaledTradeLines(option, quantity) {
  return option.give.map((entry) => ({
    name: entry.name,
    amount: entry.amount * quantity
  }));
}

function formatTradeLines(lines) {
  return lines
    .map((entry) => `<span><strong>${formatNumber(entry.amount)}</strong> ${entry.name}</span>`)
    .join("");
}

function categoryLabel(category) {
  const labels = {
    overloads: "Overload Potions",
    runes: "Nexus Runes",
    jewels: "Cut Jewels"
  };
  return labels[category] || category;
}

function categoryEyebrow(category) {
  const labels = {
    overloads: "ALCHEMY EXCHANGE",
    runes: "RUNE EXCHANGE",
    jewels: "JEWELLERY EXCHANGE"
  };
  return labels[category] || "CLAN EXCHANGE";
}

async function loadMenu() {
  try {
    const response = await fetch(`${API_URL}/menu`);
    if (!response.ok) throw new Error("Could not load the exchange menu.");

    const data = await response.json();
    state.menu = Array.isArray(data.items) ? data.items : [];
    elements.menuStatus.hidden = true;
    renderMenu(state.menu);
  } catch (error) {
    console.error(error);
    elements.menuStatus.textContent =
      "The exchange could not load. Check API_URL in script.js and make sure the Cloudflare Worker is deployed.";
    elements.menuStatus.classList.remove("notice--loading");
    elements.menuStatus.classList.add("notice--error");
  }
}

function renderMenu(items) {
  elements.exchangeGroups.innerHTML = "";

  if (items.length === 0) {
    elements.exchangeGroups.innerHTML = '<p class="notice">No exchange items match that search.</p>';
    return;
  }

  const categories = [...new Set(items.map((item) => item.category))];

  categories.forEach((category) => {
    const group = document.createElement("section");
    group.className = "exchange-group";

    const heading = document.createElement("div");
    heading.className = "group-heading";
    heading.innerHTML = `
      <p class="eyebrow">${categoryEyebrow(category)}</p>
      <h3>${categoryLabel(category)}</h3>
    `;

    const grid = document.createElement("div");
    grid.className = "exchange-grid";

    items
      .filter((item) => item.category === category)
      .forEach((item) => grid.appendChild(createCard(item)));

    group.append(heading, grid);
    elements.exchangeGroups.appendChild(group);
  });
}

function createCard(item) {
  const fragment = elements.template.content.cloneNode(true);
  const card = fragment.querySelector(".exchange-card");
  const icon = fragment.querySelector(".item-icon");
  const kicker = fragment.querySelector(".card-kicker");
  const name = fragment.querySelector(".item-name");
  const description = fragment.querySelector(".item-description");
  const valueBadge = fragment.querySelector(".value-badge");
  const receiveAmount = fragment.querySelector(".receive-amount");
  const tradeSelect = fragment.querySelector(".trade-select");
  const tradePreview = fragment.querySelector(".trade-preview");
  const specialNote = fragment.querySelector(".special-note");
  const quantityLabel = fragment.querySelector(".quantity-label");
  const quantityInput = fragment.querySelector(".quantity-input");
  const calculatedReceive = fragment.querySelector(".calculated-receive");
  const addButton = fragment.querySelector(".add-button");

  card.dataset.itemId = item.id;
  card.dataset.category = item.category;
  icon.textContent = item.icon;
  kicker.textContent = item.kicker || categoryLabel(item.category);
  name.textContent = item.name;
  description.textContent = item.description;
  receiveAmount.textContent = `${formatNumber(item.receive.amount)} ${pluralise(item.receive.name, item.receive.amount)}`;

  if (item.badge) {
    valueBadge.textContent = item.badge;
  } else {
    valueBadge.hidden = true;
  }

  if (item.maxQuantity) {
    quantityInput.max = String(item.maxQuantity);
  } else {
    quantityInput.removeAttribute("max");
  }

  quantityLabel.textContent = item.quantityLabel || "Qty";

  item.options.forEach((option) => {
    const optionElement = document.createElement("option");
    optionElement.value = option.id;
    optionElement.textContent = option.name;
    tradeSelect.appendChild(optionElement);
  });

  const updatePreview = () => {
    const selectedOption = getTradeOption(item, tradeSelect.value);
    const quantity = clampQuantity(quantityInput.value, item.maxQuantity);
    const received = item.receive.amount * quantity;

    if (quantityInput.value !== "") quantityInput.value = quantity;
    tradePreview.innerHTML = formatTradeLines(scaledTradeLines(selectedOption, quantity));
    calculatedReceive.textContent = `Receive ${formatNumber(received)}`;

    if (selectedOption.highlight) {
      specialNote.hidden = false;
      specialNote.textContent = selectedOption.highlight;
    } else if (item.note) {
      specialNote.hidden = false;
      specialNote.textContent = item.note;
    } else {
      specialNote.hidden = true;
      specialNote.textContent = "";
    }
  };

  tradeSelect.addEventListener("change", updatePreview);
  quantityInput.addEventListener("input", () => {
    if (quantityInput.value.trim() === "") {
      tradePreview.innerHTML = '<span class="muted-chip">Enter a quantity</span>';
      calculatedReceive.textContent = "—";
      return;
    }
    updatePreview();
  });
  quantityInput.addEventListener("blur", updatePreview);

  addButton.addEventListener("click", () => {
    const quantity = clampQuantity(quantityInput.value, item.maxQuantity);
    const added = addToBasket(item.id, tradeSelect.value, quantity);
    quantityInput.value = "1";
    updatePreview();

    addButton.textContent = added ? "Added ✓" : "Limit reached";
    window.setTimeout(() => {
      addButton.textContent = "Add";
    }, 900);
  });

  updatePreview();
  return fragment;
}

function getBasketQuantityForItem(itemId) {
  return state.basket
    .filter((entry) => entry.itemId === itemId)
    .reduce((sum, entry) => sum + entry.quantity, 0);
}

function addToBasket(itemId, optionId, quantity) {
  const item = getItemById(itemId);
  const option = getTradeOption(item, optionId);
  if (!item || !option) return false;

  let quantityToAdd = quantity;
  if (item.maxQuantity) {
    const remaining = item.maxQuantity - getBasketQuantityForItem(itemId);
    if (remaining <= 0) return false;
    quantityToAdd = Math.min(quantityToAdd, remaining);
  }

  const key = makeBasketKey(itemId, optionId);
  const existing = state.basket.find((entry) => entry.key === key);

  if (existing) {
    existing.quantity += quantityToAdd;
  } else {
    state.basket.push({ key, itemId, optionId, quantity: quantityToAdd });
  }

  renderBasket();
  return true;
}

function changeBasketQuantity(key, change) {
  const basketItem = state.basket.find((entry) => entry.key === key);
  if (!basketItem) return;

  const item = getItemById(basketItem.itemId);
  basketItem.quantity += change;

  if (basketItem.quantity <= 0) {
    state.basket = state.basket.filter((entry) => entry.key !== key);
  } else if (item?.maxQuantity) {
    const otherQuantity = state.basket
      .filter((entry) => entry.key !== key && entry.itemId === basketItem.itemId)
      .reduce((sum, entry) => sum + entry.quantity, 0);
    basketItem.quantity = Math.min(basketItem.quantity, Math.max(1, item.maxQuantity - otherQuantity));
  }

  renderBasket();
}

function removeBasketItem(key) {
  state.basket = state.basket.filter((entry) => entry.key !== key);
  renderBasket();
}

function getReceiveTotals() {
  const totals = new Map();

  state.basket.forEach((basketItem) => {
    const item = getItemById(basketItem.itemId);
    if (!item) return;

    const key = item.receive.name;
    totals.set(key, (totals.get(key) || 0) + (item.receive.amount * basketItem.quantity));
  });

  return totals;
}

function renderBasket() {
  elements.basketItems.innerHTML = "";
  const hasItems = state.basket.length > 0;
  elements.emptyBasket.hidden = hasItems;
  elements.receiveSummary.hidden = !hasItems;

  state.basket.forEach((basketItem) => {
    const item = getItemById(basketItem.itemId);
    const option = getTradeOption(item, basketItem.optionId);
    if (!item || !option) return;

    const received = item.receive.amount * basketItem.quantity;
    const wrapper = document.createElement("div");
    wrapper.className = "basket-item";

    const top = document.createElement("div");
    top.className = "basket-item__top";

    const info = document.createElement("div");
    const itemName = document.createElement("p");
    itemName.className = "basket-item__name";
    itemName.textContent = `${item.icon} ${formatNumber(received)} ${pluralise(item.receive.name, received)}`;

    const meta = document.createElement("p");
    meta.className = "basket-item__meta";
    meta.textContent = option.name;
    info.append(itemName, meta);

    const removeButton = document.createElement("button");
    removeButton.className = "remove-item";
    removeButton.type = "button";
    removeButton.setAttribute("aria-label", `Remove ${item.name}`);
    removeButton.textContent = "✕";
    removeButton.addEventListener("click", () => removeBasketItem(basketItem.key));
    top.append(info, removeButton);

    const requirements = document.createElement("div");
    requirements.className = "basket-requirements";
    requirements.innerHTML = formatTradeLines(scaledTradeLines(option, basketItem.quantity));

    const bottom = document.createElement("div");
    bottom.className = "basket-item__bottom";

    const stepper = document.createElement("div");
    stepper.className = "mini-stepper";

    const minusButton = document.createElement("button");
    minusButton.type = "button";
    minusButton.setAttribute("aria-label", "Decrease quantity");
    minusButton.textContent = "−";
    minusButton.addEventListener("click", () => changeBasketQuantity(basketItem.key, -1));

    const quantity = document.createElement("span");
    quantity.textContent = basketItem.quantity;

    const plusButton = document.createElement("button");
    plusButton.type = "button";
    plusButton.setAttribute("aria-label", "Increase quantity");
    plusButton.textContent = "+";
    if (item.maxQuantity && getBasketQuantityForItem(item.id) >= item.maxQuantity) plusButton.disabled = true;
    plusButton.addEventListener("click", () => changeBasketQuantity(basketItem.key, 1));

    stepper.append(minusButton, quantity, plusButton);

    const bundleText = document.createElement("span");
    bundleText.className = "basket-bundle-text";
    bundleText.textContent = item.quantityLabel === "Potions" ? "potion quantity" : `${basketItem.quantity} bundle${basketItem.quantity === 1 ? "" : "s"}`;

    bottom.append(stepper, bundleText);
    wrapper.append(top, requirements, bottom);
    elements.basketItems.appendChild(wrapper);
  });

  const receiveTotals = getReceiveTotals();
  elements.receiveSummaryLines.innerHTML = "";
  for (const [name, amount] of receiveTotals.entries()) {
    const line = document.createElement("div");
    line.innerHTML = `<strong>${formatNumber(amount)}</strong><span>${pluralise(name, amount)}</span>`;
    elements.receiveSummaryLines.appendChild(line);
  }

  const totalUnits = state.basket.reduce((sum, entry) => sum + entry.quantity, 0);
  elements.basketCount.textContent = totalUnits;
  elements.submitOrder.disabled = !hasItems;

  if (!hasItems) clearFormMessage();
}

function clearFormMessage() {
  elements.formMessage.textContent = "";
  elements.formMessage.className = "form-message";
}

function showFormMessage(message, type) {
  elements.formMessage.textContent = message;
  elements.formMessage.className = `form-message is-${type}`;
}

elements.itemSearch.addEventListener("input", (event) => {
  const query = event.target.value.trim().toLowerCase();
  const filtered = state.menu.filter((item) => {
    const haystack = [
      item.name,
      item.description,
      item.category,
      ...item.options.map((option) => option.name),
      ...item.options.flatMap((option) => option.give.map((entry) => entry.name))
    ].join(" ").toLowerCase();
    return haystack.includes(query);
  });
  renderMenu(filtered);
});

elements.checkoutForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  clearFormMessage();

  if (state.basket.length === 0) {
    showFormMessage("Add at least one swap to your basket.", "error");
    return;
  }

  const playerName = elements.playerName.value.trim();
  const notes = elements.orderNotes.value.trim();

  if (playerName.length < 2 || playerName.length > 40) {
    showFormMessage("Enter the Koruxa/Discord name you use in the clan.", "error");
    elements.playerName.focus();
    return;
  }

  if (notes.length > 300) {
    showFormMessage("Notes must be 300 characters or fewer.", "error");
    return;
  }

  const payload = {
    playerName,
    notes,
    website: elements.website.value,
    items: state.basket.map((entry) => ({
      itemId: entry.itemId,
      optionId: entry.optionId,
      quantity: entry.quantity
    }))
  };

  elements.submitOrder.disabled = true;
  elements.submitOrder.textContent = "Sending request...";

  try {
    const response = await fetch(`${API_URL}/order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || "The swap request could not be sent.");

    state.basket = [];
    elements.checkoutForm.reset();
    renderBasket();
    showFormMessage(`✅ Swap request sent! Ref: ${data.orderId}`, "success");
    window.setTimeout(clearFormMessage, 10000);
  } catch (error) {
    console.error(error);
    showFormMessage(error.message || "Something went wrong while sending the request.", "error");
  } finally {
    elements.submitOrder.textContent = "Submit swap request";
    if (state.basket.length > 0) elements.submitOrder.disabled = false;
  }
});

loadMenu();
renderBasket();
