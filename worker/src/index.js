const OVERLOAD_ITEMS = [
  {
    id: "overload-small",
    category: "overloads",
    icon: "🧪",
    kicker: "Small orders",
    name: "Overload Potion",
    description: "Order individual potions up to a maximum of 100.",
    receive: { name: "Overload Potion", amount: 1 },
    quantityLabel: "Potions",
    maxQuantity: 100,
    badge: "Up to 100",
    options: [
      {
        id: "mixed-herbs-extracts",
        name: "Herbs + Spirit Extracts",
        give: [
          { name: "Spiritbloom", amount: 2 },
          { name: "Voidpetal", amount: 3 },
          { name: "Celestine Herb", amount: 4 },
          { name: "Spirit Extracts", amount: 2 },
          { name: "Elderbloom", amount: 4 },
          { name: "Frostleaf", amount: 1 }
        ]
      },
      {
        id: "herbs-only",
        name: "Herbs only",
        give: [
          { name: "Spiritbloom", amount: 4 },
          { name: "Voidpetal", amount: 6 },
          { name: "Celestine Herb", amount: 8 },
          { name: "Elderbloom", amount: 8 },
          { name: "Frostleaf", amount: 2 }
        ]
      },
      {
        id: "extracts-only",
        name: "Spirit Extracts only",
        give: [
          { name: "Spirit Extracts", amount: 3 }
        ]
      },
      {
        id: "seeds-only",
        name: "Seeds only",
        give: [
          { name: "Spiritbloom Seed", amount: 1 },
          { name: "Voidpetal Seed", amount: 1 },
          { name: "Celestine Seed", amount: 1 },
          { name: "Elderbloom Seed", amount: 1 },
          { name: "Frostleaf Seed", amount: 1 }
        ]
      }
    ]
  },
  {
    id: "overload-mid",
    category: "overloads",
    icon: "⚗️",
    kicker: "Mid-size orders",
    name: "150 Overload Potions",
    description: "One bundle gives 150 potions. Order up to 7 bundles (1,050 potions).",
    receive: { name: "Overload Potion", amount: 150 },
    quantityLabel: "Bundles",
    maxQuantity: 7,
    badge: "+50% value",
    options: [
      {
        id: "mixed-herbs-extracts",
        name: "Herbs + Spirit Extracts",
        give: [
          { name: "Spiritbloom", amount: 200 },
          { name: "Voidpetal", amount: 300 },
          { name: "Celestine Herb", amount: 400 },
          { name: "Spirit Extracts", amount: 200 },
          { name: "Elderbloom", amount: 400 },
          { name: "Frostleaf", amount: 100 }
        ]
      },
      {
        id: "herbs-only",
        name: "Herbs only",
        give: [
          { name: "Spiritbloom", amount: 400 },
          { name: "Voidpetal", amount: 600 },
          { name: "Celestine Herb", amount: 800 },
          { name: "Elderbloom", amount: 800 },
          { name: "Frostleaf", amount: 200 }
        ]
      },
      {
        id: "extracts-only",
        name: "Spirit Extracts only",
        give: [
          { name: "Spirit Extracts", amount: 300 }
        ]
      },
      {
        id: "seeds-only",
        name: "Seeds only",
        give: [
          { name: "Spiritbloom Seed", amount: 100 },
          { name: "Voidpetal Seed", amount: 100 },
          { name: "Celestine Seed", amount: 100 },
          { name: "Elderbloom Seed", amount: 100 },
          { name: "Frostleaf Seed", amount: 100 }
        ]
      }
    ]
  },
  {
    id: "overload-large",
    category: "overloads",
    icon: "✨",
    kicker: "Bulk orders",
    name: "1,500 Overload Potions",
    description: "One bulk bundle gives 1,500 potions, with no listed bundle limit.",
    receive: { name: "Overload Potion", amount: 1500 },
    quantityLabel: "Bundles",
    maxQuantity: null,
    badge: "2× potion value",
    note: "For very large orders, further discounts can be discussed in Discord.",
    options: [
      {
        id: "mixed-herbs-extracts",
        name: "Herbs + Spirit Extracts",
        give: [
          { name: "Spiritbloom", amount: 1500 },
          { name: "Voidpetal", amount: 2250 },
          { name: "Celestine Herb", amount: 3000 },
          { name: "Spirit Extracts", amount: 1500 },
          { name: "Elderbloom", amount: 3000 },
          { name: "Frostleaf", amount: 750 }
        ]
      },
      {
        id: "herbs-only",
        name: "Herbs only",
        give: [
          { name: "Spiritbloom", amount: 3000 },
          { name: "Voidpetal", amount: 4500 },
          { name: "Celestine Herb", amount: 6000 },
          { name: "Elderbloom", amount: 6000 },
          { name: "Frostleaf", amount: 1500 }
        ]
      },
      {
        id: "extracts-only",
        name: "Spirit Extracts only — special bulk rate",
        highlight: "🔥 Special bulk rate: only 1.5 Spirit Extracts per Overload potion - half the amount of the small-order extract rate. Even larger orders can discuss a further discount.",
        give: [
          { name: "Spirit Extracts", amount: 2250 }
        ]
      },
      {
        id: "seeds-only",
        name: "Seeds only",
        give: [
          { name: "Spiritbloom Seed", amount: 750 },
          { name: "Voidpetal Seed", amount: 750 },
          { name: "Celestine Seed", amount: 750 },
          { name: "Elderbloom Seed", amount: 750 },
          { name: "Frostleaf Seed", amount: 750 }
        ]
      }
    ]
  }
];

const RUNE_ITEMS = [
  {
    id: "nexus-runes-1000",
    category: "runes",
    icon: "🔮",
    kicker: "Rune exchange",
    name: "1,000 Nexus Runes",
    description: "Swap one accepted rune/essence type or gold for each 1,000-rune bundle.",
    receive: { name: "Nexus Rune", amount: 1000 },
    quantityLabel: "Bundles",
    maxQuantity: null,
    badge: "1,000 per bundle",
    options: [
      { id: "aetherite", name: "Aetherite Runes", give: [{ name: "Aetherite Runes", amount: 3000 }] },
      { id: "voidstone", name: "Voidstone Runes", give: [{ name: "Voidstone Runes", amount: 3000 }] },
      { id: "fluxite", name: "Fluxite Runes", give: [{ name: "Fluxite Runes", amount: 2000 }] },
      { id: "prismite", name: "Prismite Runes", give: [{ name: "Prismite Runes", amount: 2000 }] },
      { id: "celestite", name: "Celestite Runes", give: [{ name: "Celestite Runes", amount: 1000 }] },
      { id: "void-essence", name: "Void Essence", give: [{ name: "Void Essence", amount: 7500 }] },
      { id: "gold", name: "Gold", give: [{ name: "Gold", amount: 3000000 }] }
    ]
  }
];

// FUTURE CUT JEWELS
// These are fully coded but intentionally OFFLINE for now.
const CUT_JEWEL_ITEMS = [
  ["cut-opal", "Cut Opal", 5000],
  ["cut-amber", "Cut Amber", 10000],
  ["cut-aquastone", "Cut Aquastone", 15000],
  ["cut-garnet", "Cut Garnet", 20000],
  ["cut-frostgem", "Cut Frostgem", 25000],
  ["cut-voidopal", "Cut Voidopal", 30000],
  ["cut-sunstone", "Cut Sunstone", 35000],
  ["cut-duskgem", "Cut Duskgem", 40000],
  ["cut-stormheart", "Cut Stormheart", 45000],
  ["cut-astralite", "Cut Astralite", 50000],
  ["cut-emberstone", "Cut Emberstone", 55000],
  ["cut-magmaheart", "Cut Magmaheart", 60000],
  ["cut-pyreshard", "Cut Pyreshard", 65000]
].map(([id, name, gold]) => ({
  id,
  category: "jewels",
  icon: "💎",
  kicker: "Cut jewel",
  name,
  description: "Cut jewel for jewellery use only.",
  receive: { name, amount: 1 },
  quantityLabel: "Jewels",
  maxQuantity: null,
  badge: `${new Intl.NumberFormat("en-GB").format(gold)} gold each`,
  options: [
    { id: "gold", name: "Gold", give: [{ name: "Gold", amount: gold }] }
  ]
}));

const MENU = [
  ...OVERLOAD_ITEMS,
  ...RUNE_ITEMS,
  // ...CUT_JEWEL_ITEMS, // <-- FUTURE: remove ONLY the // at the start of this line to make cut jewels live.
];

const MENU_BY_ID = new Map(MENU.map((item) => [item.id, item]));

function allowedOrigins(env) {
  return String(env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

function corsHeaders(request, env) {
  const origin = request.headers.get("Origin");
  const allowed = allowedOrigins(env);
  const headers = {
    "Vary": "Origin",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400"
  };
  if (origin && allowed.includes(origin)) headers["Access-Control-Allow-Origin"] = origin;
  return headers;
}

function jsonResponse(request, env, data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      ...corsHeaders(request, env),
      "Content-Type": "application/json; charset=UTF-8"
    }
  });
}

function isOriginAllowed(request, env) {
  const origin = request.headers.get("Origin");
  if (!origin) return true;
  return allowedOrigins(env).includes(origin);
}

function cleanSingleLine(value, maxLength) {
  return String(value ?? "").replace(/[\r\n\t]+/g, " ").trim().slice(0, maxLength);
}

function cleanNotes(value, maxLength) {
  return String(value ?? "").replace(/\r\n?/g, "\n").trim().slice(0, maxLength);
}

function formatNumber(value) {
  return new Intl.NumberFormat("en-GB").format(value);
}

function makeOrderId() {
  const datePart = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  const randomPart = crypto.randomUUID().slice(0, 6).toUpperCase();
  return `SWAP-${datePart}-${randomPart}`;
}

function validateAndPriceOrder(body) {
  const playerName = cleanSingleLine(body.playerName, 40);
  const notes = cleanNotes(body.notes, 300);
  const honeypot = cleanSingleLine(body.website, 100);

  if (honeypot) return { error: "Request rejected." };
  if (playerName.length < 2) return { error: "A Koruxa/Discord name is required." };
  if (!Array.isArray(body.items) || body.items.length === 0) return { error: "The basket is empty." };
  if (body.items.length > 24) return { error: "There are too many separate lines in this request." };

  const pricedItems = [];
  const receiveTotals = new Map();
  const itemQuantities = new Map();

  for (const submitted of body.items) {
    const itemId = cleanSingleLine(submitted.itemId, 80);
    const optionId = cleanSingleLine(submitted.optionId, 80);
    const quantity = Number(submitted.quantity);

    const menuItem = MENU_BY_ID.get(itemId);
    if (!menuItem) return { error: `Unknown exchange item: ${itemId || "blank"}.` };

    const option = menuItem.options.find((entry) => entry.id === optionId);
    if (!option) return { error: `Invalid swap option for ${menuItem.name}.` };

    if (!Number.isSafeInteger(quantity) || quantity < 1) {
      return { error: `Invalid quantity for ${menuItem.name}.` };
    }
    const newItemQuantity = (itemQuantities.get(itemId) || 0) + quantity;
    itemQuantities.set(itemId, newItemQuantity);
    if (menuItem.maxQuantity && newItemQuantity > menuItem.maxQuantity) {
      return { error: `${menuItem.name} is limited to ${menuItem.maxQuantity} total, even across different swap options.` };
    }

    const receiveAmount = menuItem.receive.amount * quantity;
    if (!Number.isSafeInteger(receiveAmount)) return { error: "Requested amount is too large." };

    const give = option.give.map((entry) => {
      const amount = entry.amount * quantity;
      if (!Number.isSafeInteger(amount)) throw new Error("TRADE_TOTAL_TOO_LARGE");
      return { name: entry.name, amount };
    });

    const newReceiveTotal = (receiveTotals.get(menuItem.receive.name) || 0) + receiveAmount;
    if (!Number.isSafeInteger(newReceiveTotal)) return { error: "Requested amount is too large." };
    receiveTotals.set(menuItem.receive.name, newReceiveTotal);

    pricedItems.push({
      itemId,
      itemName: menuItem.name,
      category: menuItem.category,
      icon: menuItem.icon,
      quantity,
      optionId,
      optionName: option.name,
      receiveName: menuItem.receive.name,
      receiveAmount,
      give,
      highlight: option.highlight || ""
    });
  }

  return {
    order: {
      playerName,
      notes,
      items: pricedItems,
      receiveTotals: [...receiveTotals.entries()].map(([name, amount]) => ({ name, amount }))
    }
  };
}

function buildDiscordPayload(order, orderId) {
  const lines = order.items.map((item) => {
    const giveText = item.give.map((entry) => `${formatNumber(entry.amount)} ${entry.name}`).join(" • ");
    return (
      `${item.icon} **${formatNumber(item.receiveAmount)} ${item.receiveName}${item.receiveAmount === 1 ? "" : "s"}**\n` +
      `↳ **${item.optionName}**\n` +
      `↳ Give: ${giveText}` +
      (item.highlight ? `\n↳ 🔥 ${item.highlight.replace(/^🔥\s*/, "")}` : "")
    );
  });

  const receiveSummary = order.receiveTotals
    .map((entry) => `**${formatNumber(entry.amount)}** ${entry.name}${entry.amount === 1 ? "" : "s"}`)
    .join("\n");

  const fields = [
    { name: "Player", value: order.playerName, inline: true },
    { name: "Requested", value: receiveSummary || "—", inline: true }
  ];

  if (order.notes) fields.push({ name: "Notes", value: order.notes, inline: false });

  return {
    username: "Koruxa Exchange",
    allowed_mentions: { parse: [] },
    embeds: [
      {
        title: "🔮 New Clan Swap Request",
        description: lines.join("\n\n").slice(0, 3900),
        color: 12164584,
        fields,
        footer: { text: `Request ${orderId}` },
        timestamp: new Date().toISOString()
      }
    ]
  };
}

async function sendToDiscord(webhookUrl, payload) {
  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const details = await response.text().catch(() => "");
    console.error("Discord webhook failed:", response.status, details);
    throw new Error("Discord webhook failed.");
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      if (!isOriginAllowed(request, env)) return new Response(null, { status: 403 });
      return new Response(null, { status: 204, headers: corsHeaders(request, env) });
    }

    if (!isOriginAllowed(request, env)) {
      return jsonResponse(request, env, { error: "Origin not allowed." }, 403);
    }

    if (request.method === "GET" && url.pathname === "/menu") {
      return new Response(JSON.stringify({ items: MENU }), {
        status: 200,
        headers: {
          ...corsHeaders(request, env),
          "Content-Type": "application/json; charset=UTF-8",
          "Cache-Control": "public, max-age=300"
        }
      });
    }

    if (request.method === "GET" && url.pathname === "/") {
      return jsonResponse(request, env, { ok: true, service: "Koruxa Potion & Rune Exchange API" });
    }

    if (request.method === "POST" && url.pathname === "/order") {
      if (!env.DISCORD_WEBHOOK_URL) {
        console.error("DISCORD_WEBHOOK_URL secret is missing.");
        return jsonResponse(request, env, { error: "Swap service is not configured." }, 500);
      }

      const contentType = request.headers.get("Content-Type") || "";
      if (!contentType.toLowerCase().includes("application/json")) {
        return jsonResponse(request, env, { error: "JSON required." }, 415);
      }

      let body;
      try {
        body = await request.json();
      } catch {
        return jsonResponse(request, env, { error: "Invalid JSON." }, 400);
      }

      let result;
      try {
        result = validateAndPriceOrder(body);
      } catch (error) {
        if (error?.message === "TRADE_TOTAL_TOO_LARGE") {
          return jsonResponse(request, env, { error: "Requested amount is too large." }, 400);
        }
        console.error(error);
        return jsonResponse(request, env, { error: "The request could not be validated." }, 400);
      }

      if (result.error) return jsonResponse(request, env, { error: result.error }, 400);

      const orderId = makeOrderId();
      const discordPayload = buildDiscordPayload(result.order, orderId);

      try {
        await sendToDiscord(env.DISCORD_WEBHOOK_URL, discordPayload);
      } catch (error) {
        console.error(error);
        return jsonResponse(request, env, { error: "The request could not be delivered to Discord." }, 502);
      }

      return jsonResponse(request, env, { ok: true, orderId });
    }

    return jsonResponse(request, env, { error: "Not found." }, 404);
  }
};
