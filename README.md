# Koruxa Potion & Rune Exchange

GitHub Pages form + Cloudflare Worker for Discord-delivered clan swap requests.

## Live sections
- Small Overload orders: 1 potion each, max 100
- Mid Overload bundles: 150 potions each, max 7 bundles
- Bulk Overload bundles: 1,500 potions each, no listed bundle limit
- Nexus Rune bundles: 1,000 runes each


## Important config
- Frontend Worker URL: `script.js` → `API_URL`
- Worker allowed GitHub Pages host: `worker/wrangler.jsonc` → `ALLOWED_ORIGINS`
- Discord webhook is stored as a Worker secret named `DISCORD_WEBHOOK_URL`
