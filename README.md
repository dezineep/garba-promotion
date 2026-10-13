# Find a Garba Partner · Modulus Seventeen

The Navratri campaign page served at **modulusseventeen.com/garba**. Plain HTML, CSS and JS with no build step.

## Files

- `index.html`: the page shell
- `styles.css`: all styling. The Garba look comes first, then the Modulus Seventeen look (`body.m17`), which is built from the main site's components.
- `app.js`: screens, logic and backend calls. Campaign copy, video IDs, the partner pool, counts and the prize all live in `CONFIG` at the top.
- `assets/`: the prize image, plus `bots/`, the SELL / BUY bag badges used by the pixel bots

## The flow

1. **Garba look** (before the match): age check → gender → profession → partner search → match found. It's free to play, with no prices.
2. **Modulus Seventeen look** (from the reveal on): video reveal with the giveaway card, quest stepper and Community Shield vote → giveaway (gift box → prize → form → Instagram step) → entry confirmed. Business owners go straight to the 1-month-free offer.

## Deploying

Upload the folder contents to `/garba/` on the site. Asset paths are absolute (`/garba/assets/...`), so the page has to be served from `/garba/`.

After changing `styles.css` or `app.js`, bump the `?v=` number on both links in `index.html` so phones load the new files.

## Local preview

Serve a folder that contains this repo as `garba/`, then open `http://localhost:<port>/garba/`. On localhost the page talks to a backend at `http://localhost:5500/api/` (see `apiBase` in `CONFIG`). Without one, the votes, shares and entries calls fail quietly, and the entry step shows an error.
