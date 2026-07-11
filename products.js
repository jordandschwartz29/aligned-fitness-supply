/* ============================================================
   STRENGTH MERCHANT — PRODUCT DATABASE
   ============================================================
   This is your store's inventory. To add a product, copy one
   of the blocks between { and }, paste it before the closing ],
   and edit the values. Every product needs a UNIQUE id.

   Fields:
   id        - unique code, lowercase, no spaces (used in links)
   name      - product name shown to customers
   category  - must match one of the CATEGORIES below
   price     - in dollars (19.99 not "$19.99")
   image     - path to a photo in the images/ folder, or "" for
               a placeholder until you have photos
   description - shown on the product page
   featured  - true = shows on the homepage
   ============================================================ */

const CATEGORIES = [
  { slug: "clothing",     name: "Clothing" },
  { slug: "accessories",  name: "Lifting Accessories" },
  { slug: "supplements",  name: "Supplements" },
  // To add a category later, add a line here, e.g.:
  // { slug: "equipment", name: "Home Gym Equipment" },
];

const PRODUCTS = [
  {
    id: "sm-hoodie-black",
    name: "Merchant Heavyweight Hoodie",
    category: "clothing",
    price: 54.99,
    image: "",
    description: "12oz heavyweight cotton hoodie. Cut for lifters — room in the shoulders and arms, no billow at the waist. Screen-printed Strength Merchant crest.",
    featured: true
  },
  {
    id: "sm-tee-iron",
    name: "Iron Standard Tee",
    category: "clothing",
    price: 27.99,
    image: "",
    description: "Midweight cotton tee that holds its shape wash after wash. Athletic cut through the chest and shoulders.",
    featured: false
  },
  {
    id: "sm-shorts-train",
    name: "Training Day Shorts",
    category: "clothing",
    price: 34.99,
    image: "",
    description: "7-inch inseam, four-way stretch, deep pockets. Squats, sled work, everything in between.",
    featured: false
  },
  {
    id: "sm-belt-lever",
    name: "10mm Lever Belt",
    category: "accessories",
    price: 119.99,
    image: "",
    description: "10mm vegetable-tanned leather lever belt. Uniform 4-inch width, matte black lever. Breaks in fast, then lasts decades.",
    featured: true
  },
  {
    id: "sm-straps-fig8",
    name: "Figure-8 Lifting Straps",
    category: "accessories",
    price: 21.99,
    image: "",
    description: "Heavy cotton figure-8 straps for pulls where grip should not be the limiting factor.",
    featured: false
  },
  {
    id: "sm-sleeves-knee",
    name: "7mm Knee Sleeves (Pair)",
    category: "accessories",
    price: 64.99,
    image: "",
    description: "7mm neoprene, competition-legal cut. Warmth and rebound out of the hole without cutting circulation.",
    featured: false
  },
  {
    id: "sm-chalk-block",
    name: "Block Chalk (8-Pack)",
    category: "accessories",
    price: 15.99,
    image: "",
    description: "Pure magnesium carbonate blocks. No fillers, no scent, no slipping.",
    featured: false
  },
  {
    id: "sm-creatine-mono",
    name: "Creatine Monohydrate — 500g",
    category: "supplements",
    price: 29.99,
    image: "",
    description: "Micronized creatine monohydrate, 100 servings. Unflavored, third-party tested. The most studied supplement in strength sports.",
    featured: true
  },
  {
    id: "sm-whey-vanilla",
    name: "Merchant Whey — Vanilla, 2lb",
    category: "supplements",
    price: 44.99,
    image: "",
    description: "25g protein per scoop from whey concentrate and isolate. Mixes clean in water or milk. Third-party tested.",
    featured: false
  },
  {
    id: "sm-preworkout",
    name: "Opening Bell Pre-Workout",
    category: "supplements",
    price: 39.99,
    image: "",
    description: "200mg caffeine, 6g citrulline, 3.2g beta-alanine. Full doses, full label transparency. 30 servings.",
    featured: false
  }
];
