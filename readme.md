# Sneakers - E-commerce Landing Page

A single-page sneaker store built with vanilla HTML, CSS, and JavaScript. Features a product slider, product customizer (color/size selection), a shopping cart with persistent storage, and a mock checkout flow.

## Features

- **Hero slider** - Browse featured products (Air Force, Dunk, Jordan) with a "Buy Now" button on each slide.
- **Product customizer** - Select a product from the nav menu, switch between color variants, and pick a size.
- **Shopping cart** - Add items from the slider or the product customizer, adjust quantities, remove items, and see a running total. Cart contents persist across page reloads via `localStorage`.
- **Checkout flow** - Cart → payment modal → form validation → mock payment confirmation popup.
- **Responsive nav** - Hamburger menu for mobile.

## File Structure

```
├── index.html      # Page markup
├── style.css        # All styling
├── script.js         # Product data, slider, cart, and checkout logic
└── img/              # Product images, icons, gallery photos
```

## Setup

No build step required — this is a static site.

1. Clone or download the project folder.
2. Make sure the `img/` folder sits alongside `index.html` with all referenced images (product shots, icons, gallery photos).
3. Open `index.html` in a browser, or serve it locally:
   ```bash
   npx serve .
   ```

## How the Cart Works

- `products` (in `script.js`) is the single source of truth for product data — each item has an `id`, `tatle` (title), `price`, and a `colors` array of `{ code, img }`.
- Clicking a slider's **Buy Now** button adds that slide's product (by array index) to the cart.
- Clicking the main product **Buy Now** button adds whatever is currently selected (`choosenProduct` + the currently displayed color image).
- Cart state lives in the `cart` array and is synced to `localStorage` on every change via `saveCart()`.
- The cart drawer (`.cart-drawer`) and its overlay (`.cart-overlay`) toggle open/closed via the `.open` class.

## How Checkout Works

1. Clicking **Checkout** in the cart drawer closes the drawer and opens the `#payment` modal.
2. Filling out the form and clicking **Checkout!** inside the modal validates that all fields are non-empty.
3. On success: the cart is cleared, the payment modal closes, and a **"Payment Made!"** confirmation popup (`#successOverlay`) appears.
4. Clicking **Done** closes the confirmation.

> ⚠️ This checkout is a **front-end mock only** — there is no real payment processor or backend. Card details are validated for presence only, not processed or transmitted anywhere. For production use, integrate a real payment gateway (e.g. Stripe, PayFast) and move validation/order handling server-side.

## Required Element IDs (script.js depends on these existing in index.html)

| Element | ID/Class |
|---|---|
| Payment modal | `#payment` |
| Payment modal close (X) | `#closePayment` |
| Payment backdrop | `#paymentOverlay` (must be a **sibling** of `#payment`, not nested inside it) |
| Checkout submit button (inside modal) | `#payButton` |
| Payment form inputs | `#payName`, `#payPhone`, `#payAddress`, `#payCardNumber`, `#payMM`, `#payYYYY`, `#payCVV` |
| Success popup | `#successOverlay` |
| Success popup close button | `#successClose` |
| Main product buy button | `#buyProductBtn` |
| Cart checkout button | `.checkout-btn` |

If any of these are missing or misnamed in the HTML, the corresponding `document.querySelector(...)` call returns `null`, and the next line that calls `.addEventListener` on it will throw and stop the rest of the script from running — including buttons defined further down the file.

## Known Issues / Troubleshooting

- **"Buy Now" does nothing:** Open DevTools (F12) → Console. A red error naming a `null` element almost always means an ID in `script.js` doesn't match the HTML. Fix the HTML first — script errors halt the whole file.
- **Cart total looks wrong after edits:** Clear `localStorage` (`localStorage.removeItem("cart")` in the console) to reset to a clean state during development.
- **Typo note:** Product objects use the key `tatle` (not `title`) throughout - this is intentional to match the existing data structure, not a bug to "fix" unless you rename it everywhere consistently.

## Credits

© Cikiso Nonkululeko. All rights reserved. 2026.
