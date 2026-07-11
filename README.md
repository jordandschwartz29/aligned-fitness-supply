# Aligned Fitness Supply

E-commerce site for serious lifters. Plain HTML/CSS/JavaScript — no frameworks, no build step.

## Folder layout

```
aligned-fitness-supply/
├── index.html        Homepage (hero, departments, featured)
├── shop.html         All products, filterable by category
├── product.html      Single product page (uses ?id= in the URL)
├── cart.html         Shopping cart
├── style.css     All styling — brand colors at the top in :root
├── products.js    ← YOUR PRODUCT DATABASE — edit this to add products
├── store.js       Store logic (don't need to touch)
└── images/           Put product photos here (create this folder)
```

## Launch on GitHub Pages (one-time setup, ~15 min)

1. Create a free account at github.com (if you don't have one).
2. Click **+** (top right) → **New repository**. Name it `aligned-fitness-supply`, set it **Public**, click **Create repository**.
3. On the new repo page, click **uploading an existing file**, drag this entire folder's contents in, click **Commit changes**.
4. Go to **Settings → Pages** (left sidebar). Under "Branch", pick `main` and `/ (root)`, click **Save**.
5. Wait ~2 minutes. Your site is live at `https://YOUR-USERNAME.github.io/aligned-fitness-supply/`.

Any time you edit a file and re-upload it, the live site updates in a minute or two.

## Adding a product

Open `products.js`, copy an existing product block, paste it before the closing `]`, and edit the values. Give it a unique `id`. Save, re-upload, done.

## Adding product photos

1. Create an `images` folder in the repo.
2. Upload photos (square, ~1000×1000px, JPG, under 300KB each is ideal).
3. In `products.js`, set the product's image: `image: "images/your-photo.jpg"`.

## Changing colors / branding

Open `style.css` — the first block (`:root`) holds every brand color. Change `--accent` to re-theme the whole site.

## Still to do before launch (Week 2)

- [ ] Stripe checkout (serverless function on Vercel)
- [ ] Real product photos + descriptions from suppliers
- [ ] About / Contact / Shipping & Returns pages
- [ ] Custom domain
- [ ] Test purchase end-to-end
