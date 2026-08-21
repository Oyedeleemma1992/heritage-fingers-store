import oloyinBowl from '../assets/images/oloyin_beans_bowl_1786996797609.jpg';
import oloyinMacro from '../assets/images/oloyin_beans_macro_1786996809767.jpg';
import oloyinSack from '../assets/images/oloyin_beans_sack_1786996819553.jpg';

import peeledBowl from '../assets/images/peeled_beans_bowl_1786997365680.jpg';
import peeledMacro from '../assets/images/peeled_beans_macro_1786997376421.jpg';
import peeledScoop from '../assets/images/peeled_beans_scoop_1786997385803.jpg';

import crayfishBasket from '../assets/images/dry_crayfish_basket_1786997548342.jpg';
import crayfishMacro from '../assets/images/dry_crayfish_macro_1786997559608.jpg';
import crayfishScoop from '../assets/images/dry_crayfish_scoop_1786997571156.jpg';

import plantainBowl from '../assets/images/spicy_plantain_chips_bowl_1786997716560.jpg';
import plantainMacro from '../assets/images/spicy_plantain_chips_macro_1786997728684.jpg';
import plantainStack from '../assets/images/spicy_plantain_chips_stack_1786997738820.jpg';

import maltDrinksAssorted from '../assets/images/malt_drinks_assorted_1786997914537.jpg';
import softDrinksIce from '../assets/images/soft_drinks_ice_1786997927583.jpg';
import maltGlassPour from '../assets/images/malt_glass_pour_1786997937661.jpg';
import sodasBucket from '../assets/images/sodas_bucket_1786997952180.jpg';

import egusiBowl from '../assets/images/egusi_bowl_1786998215457.jpg';
import egusiMacro from '../assets/images/egusi_macro_1786998228083.jpg';
import egusiScoop from '../assets/images/egusi_scoop_1786998238365.jpg';

import ofadaBowl from '../assets/images/ofada_rice_bowl_1786998593186.jpg';
import ofadaMacro from '../assets/images/ofada_rice_macro_1786998605483.jpg';
import ofadaScoop from '../assets/images/ofada_rice_scoop_1786998616082.jpg';

import ijebuGarriBowl from '../assets/images/ijebu_garri_bowl_1786999311812.jpg';
import ijebuGarriMacro from '../assets/images/ijebu_garri_macro_1786999324790.jpg';
import ijebuGarriScoop from '../assets/images/ijebu_garri_scoop_1786999336271.jpg';

import poundedYamPrepared from '../assets/images/pounded_yam_prepared_1786999896825.jpg';
import poundedYamServed from '../assets/images/pounded_yam_served_1786999911075.jpg';
import poundedYamFlour from '../assets/images/pounded_yam_flour_1786999923882.jpg';

import yamTubersWhole from '../assets/images/yam_tubers_whole_1787000183958.jpg';

import plantainFlourBowl from '../assets/images/plantain_flour_bowl_1787001046901.jpg';
import plantainFlourScoop from '../assets/images/plantain_flour_scoop_1787001152993.jpg';

// NEW: Added ProductVariant interface
export interface ProductVariant {
  size: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price?: number;
  size: string;
  category: string;
  imageUrl: string;
  imageUrls?: string[];
  available: boolean;
  variants?: ProductVariant[]; // NEW: Added variants support
}

// NEW: Expanded categories list based on inventory needs
export const CATEGORIES = [
  'All',
  'Spices & Seasonings',
  'Fresh Produce (Tomatoes, Peppers & Vegetables)',
  'Dry Fish & Crayfish',
  'Fresh & Frozen Fish',
  'Meat & Poultry',
  'Grains, Rice & Staples',
  'Flour & Swallow',
  'Oils, Sauces & Condiments',
  'Cooked Foods & Savouries (Moi Moi, Small Chops)',
  'Snacks & Bakery',
  'Drinks & Beverages',
  'Special Bulk Orders'
];

export const PRODUCTS: Product[] = [
  // --- Grains, Rice & Staples ---
  {
    id: 'gs1',
    name: 'Nigerian Honey Beans (Oloyin)',
    description: 'Premium Nigerian honey beans, also known as Oloyin, perfect for traditional African meals.',
    price: 8.99,
    size: '1.5kg',
    category: 'Grains, Rice & Staples',
    imageUrl: oloyinBowl,
    imageUrls: [oloyinBowl, oloyinMacro, oloyinSack],
    available: true,
  },
  {
    id: 'gs2',
    name: 'Peeled Beans',
    description: 'Convenient peeled beans prepared for easier cooking and delicious Nigerian dishes like akara and moi moi.',
    price: 5.50,
    size: '1kg',
    category: 'Grains, Rice & Staples',
    imageUrl: peeledBowl,
    imageUrls: [peeledBowl, peeledMacro, peeledScoop],
    available: true,
  },
  {
    id: 'gs3',
    name: 'Ofada Rice',
    description: 'Traditional unpolished Nigerian local rice, known for its unique aroma and flavour.',
    price: 12.99,
    size: '1kg',
    category: 'Grains, Rice & Staples',
    imageUrl: ofadaBowl,
    imageUrls: [ofadaBowl, ofadaMacro, ofadaScoop],
    available: true,
  },
  {
    id: 'gs4',
    name: 'Ijebu Garri',
    description: 'Crispy, sour cassava flakes traditionally produced in Ijebu. Perfect for soaking or making eba.',
    price: 6.50,
    size: '1.5kg',
    category: 'Grains, Rice & Staples',
    imageUrl: ijebuGarriBowl,
    imageUrls: [ijebuGarriBowl, ijebuGarriMacro, ijebuGarriScoop],
    available: true,
  },
  
  // --- Flour & Swallow ---
  {
    id: 'gs5',
    name: 'Poundo Yam',
    description: 'Quick and easy poundo yam flour. Achieves a smooth, lump-free texture for your favourite soups.',
    price: 9.50,
    size: '2kg',
    category: 'Flour & Swallow',
    imageUrl: poundedYamPrepared,
    imageUrls: [poundedYamPrepared, poundedYamServed, poundedYamFlour],
    available: true,
  },
  {
    id: 'ag2',
    name: 'Plantain Flour',
    description: '100% natural unripe plantain flour, a healthy alternative for swallows and baking.',
    price: 7.99,
    size: '1kg',
    category: 'Flour & Swallow',
    imageUrl: plantainFlourBowl,
    imageUrls: [plantainFlourBowl, plantainFlourScoop],
    available: true,
  },
  {
    id: 'ag3',
    name: 'Cassava Flour',
    description: 'Finely milled cassava flour for a variety of baking and cooking needs.',
    price: 5.99,
    size: '1kg',
    category: 'Flour & Swallow',
    imageUrl: 'https://i.ibb.co/BpDy6F3/cass1.jpg',
    imageUrls: [
      'https://i.ibb.co/BpDy6F3/cass1.jpg',
      'https://i.ibb.co/yc51hw6c/cass2.jpg',
      'https://i.ibb.co/Y7snKtcY/cass3.jpg',
      'https://i.ibb.co/rKWXkZmK/cass4.jpg'
    ],
    available: true,
  },

  // --- Fresh Produce & Tubers ---
  {
    id: 'ag1',
    name: 'Yam Tubers',
    description: 'Fresh, premium white African yams. Perfect for boiling, roasting, or pounding.',
    price: 8.00,
    size: 'Large Tuber',
    category: 'Fresh Produce (Tomatoes, Peppers & Vegetables)',
    imageUrl: yamTubersWhole,
    imageUrls: [yamTubersWhole],
    available: true,
  },

  // --- Dry Fish & Crayfish ---
  {
    id: 'df1',
    name: 'Dry Crayfish',
    description: 'Carefully selected dried crayfish, perfect for adding authentic flavour to soups, stews and traditional African dishes.',
    price: 5.99,
    size: '250g',
    category: 'Dry Fish & Crayfish',
    imageUrl: crayfishBasket,
    imageUrls: [crayfishBasket, crayfishMacro, crayfishScoop],
    available: true,
  },
  {
    id: 'df2',
    name: 'Stockfish (Cod)',
    description: 'Premium quality dried stockfish. Requires soaking before use. Essential for traditional soups.',
    price: 18.50,
    size: '500g',
    category: 'Dry Fish & Crayfish',
    imageUrl: 'https://i.ibb.co/7drmsRgH/stock1.jpg',
    imageUrls: [
      'https://i.ibb.co/7drmsRgH/stock1.jpg',
      'https://i.ibb.co/DPmnBkBs/stock2.jpg',
      'https://i.ibb.co/KzjXNkVL/stock3.jpg',
      'https://i.ibb.co/sJNMPb7b/stock4.jpg'
    ],
    available: true,
  },
  {
    id: 'df4',
    name: 'Smoked Fish',
    description: 'Traditionally smoked catfish, cleaned and ready to add rich smoky flavour to your cooking.',
    price: 12.00,
    size: 'Medium Pack',
    category: 'Dry Fish & Crayfish',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/03/Dried_smoked_catfish.jpg',
    imageUrls: [
      'https://upload.wikimedia.org/wikipedia/commons/0/03/Dried_smoked_catfish.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/1/1c/Smoked_catfish.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/c/c8/Smoked_Catfish_Badagry_Market.jpg'
    ],
    available: true,
  },

  // --- Oils, Sauces & Condiments ---
  {
    id: 'osc1',
    name: 'Premium Red Palm Oil',
    description: 'Authentic, unrefined red palm oil sourced directly from West Africa. Perfect for traditional soups and stews.',
    price: 6.99, // Base price for default size
    size: '1L',
    category: 'Oils, Sauces & Condiments',
    imageUrl: 'https://i.ibb.co/PGPT9pcK/palm1.jpg',
    imageUrls: [
      'https://i.ibb.co/PGPT9pcK/palm1.jpg',
      'https://i.ibb.co/8DBfGV1Z/palm2.jpg',
      'https://i.ibb.co/pjfgV1bQ/palm3.jpg'
    ],
    available: true,
    // NEW: Added Variants Example
    variants: [
      { size: '1L', price: 6.99 },
      { size: '2L', price: 12.50 },
      { size: '4L', price: 22.00 }
    ]
  },
  {
    id: 'osc2',
    name: 'Shito (Ghanaian Pepper Sauce)',
    description: 'Spicy and flavourful black pepper sauce made with dried fish and shrimp.',
    price: 5.50,
    size: '250g',
    category: 'Oils, Sauces & Condiments',
    imageUrl: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800',
    available: true,
  },

  // --- Spices & Seasonings ---
  {
    id: 'df3',
    name: 'Dried Bitter Leaf',
    description: 'Washed and sun-dried bitter leaves, ready to be rehydrated for traditional soups.',
    price: 3.50,
    size: '100g',
    category: 'Spices & Seasonings',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b0/Dried_bitter_leaf.jpg',
    imageUrls: [
      'https://upload.wikimedia.org/wikipedia/commons/b/b0/Dried_bitter_leaf.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/a/a1/Dry_bitter_leafs.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/8/85/Dried_leaves_on_sale_at_the_Monday_Market_in_Kakuri%2C_Kaduna_01.jpg'
    ],
    available: true,
  },
  {
    id: 'osc3',
    name: 'Jollof Seasoning Blend',
    description: 'Our special blend of spices to give your Jollof rice that authentic party flavour.',
    price: 3.99,
    size: '150g',
    category: 'Spices & Seasonings',
    imageUrl: 'https://i.ibb.co/fdCSGRdF/joll1.jpg',
    imageUrls: [
      'https://i.ibb.co/fdCSGRdF/joll1.jpg',
      'https://i.ibb.co/hJrdCn0S/joll2.jpg',
      'https://i.ibb.co/HTNXJcBn/joll3.jpg',
      'https://i.ibb.co/QjzmTB1L/joll4.webp'
    ],
    available: true,
  },
  {
    id: 'osc4',
    name: 'Suya Spice (Yaji)',
    description: 'Spicy peanut-based rub perfect for grilling meat, chicken, or fish.',
    price: 4.50,
    size: '200g',
    category: 'Spices & Seasonings',
    imageUrl: 'https://i.ibb.co/GfM4LFbk/suya-yaji-2.jpg',
    imageUrls: [
      'https://i.ibb.co/GfM4LFbk/suya-yaji-2.jpg',
      'https://i.ibb.co/PvMkYtB2/suya-yaji-3.jpg',
      'https://i.ibb.co/HpP1D5Q5/suya-yaji-4.jpg',
      'https://i.ibb.co/3YSz6XnY/suya-yaji1.jpg'
    ],
    available: true,
  },

  // --- Snacks & Bakery ---
  {
    id: 'sn1',
    name: 'Spicy Plantain Chips',
    description: 'Crunchy, sweet and spicy plantain chips. The perfect on-the-go African snack.',
    price: 1.99,
    size: '150g',
    category: 'Snacks & Bakery',
    imageUrl: plantainBowl,
    imageUrls: [plantainBowl, plantainMacro, plantainStack],
    available: true,
  },
  {
    id: 'sn2',
    name: 'Chin Chin',
    description: 'Classic Nigerian crunchy fried dough snack with a hint of nutmeg.',
    price: 4.50,
    size: '500g',
    category: 'Snacks & Bakery',
    imageUrl: 'https://i.ibb.co/ZpwRfcm5/Nigerian-Chin-Chin-photo-2.jpg',
    imageUrls: [
      'https://i.ibb.co/ZpwRfcm5/Nigerian-Chin-Chin-photo-2.jpg',
      'https://i.ibb.co/21mzq0zX/Nigerian-Chin-Chin-photo-4.jpg',
      'https://i.ibb.co/99Q4L0wv/Nigerian-Chin-Chin-photo-5.jpg'
    ],
    available: true,
  },
  {
    id: 'sn3',
    name: 'Roasted Groundnuts',
    description: 'Perfectly roasted peanuts, lightly salted. Great for pairing with garri.',
    price: 2.99,
    size: '250g',
    category: 'Snacks & Bakery',
    imageUrl: 'https://i.ibb.co/MyJtvf4q/groundnut1.jpg',
    imageUrls: [
      'https://i.ibb.co/MyJtvf4q/groundnut1.jpg',
      'https://i.ibb.co/CKstBHPM/groundnut2.jpg',
      'https://i.ibb.co/5W1Pmrg6/groundut-2.jpg'
    ],
    available: true,
  },
  {
    id: 'bc2',
    name: 'Meat Pie',
    description: 'Classic Nigerian meat pie with a flaky, buttery crust and rich minced beef and potato filling.',
    price: 3.50,
    size: '1 piece',
    category: 'Snacks & Bakery',
    imageUrl: 'https://i.ibb.co/q3bsSr0Q/meatpie1.jpg',
    imageUrls: [
      'https://i.ibb.co/q3bsSr0Q/meatpie1.jpg',
      'https://i.ibb.co/Qzm5XdT/meatpie2.jpg',
      'https://i.ibb.co/QBgSxfy/meatpie3.png',
      'https://i.ibb.co/4ZCJXh5K/meatpie4.jpg',
      'https://i.ibb.co/8nVJkt5g/meatpie5.jpg'
    ],
    available: true,
  },
  {
    id: 'bc4',
    name: 'Chicken Pie',
    description: 'Delicious flaky pastry filled with creamy, seasoned chicken breast pieces.',
    price: 3.50,
    size: '1 piece',
    category: 'Snacks & Bakery',
    imageUrl: 'https://i.ibb.co/RpYLB69z/pie1.jpg',
    imageUrls: [
      'https://i.ibb.co/RpYLB69z/pie1.jpg',
      'https://i.ibb.co/MDdzRpDN/pie2.jpg',
      'https://i.ibb.co/ZvyNsx7/pie3.jpg',
      'https://i.ibb.co/SDH5bs5x/pie4.jpg'
    ],
    available: true,
  },
  
  // --- Cooked Foods & Savouries ---
  {
    id: 'sn4',
    name: 'Puff-Puff (Freshly Made)',
    description: 'Soft, spongy, and sweet deep-fried dough balls. Sold by the dozen.',
    price: 5.00,
    size: '12 pieces',
    category: 'Cooked Foods & Savouries (Moi Moi, Small Chops)',
    imageUrl: 'https://i.ibb.co/fGvqP2g7/puff1.jpg',
    imageUrls: [
      'https://i.ibb.co/fGvqP2g7/puff1.jpg',
      'https://i.ibb.co/jvqRrs9T/puff2.jpg',
      'https://i.ibb.co/cckDp3NT/puff3.jpg',
      'https://i.ibb.co/wZmMGzbm/puff4.jpg'
    ],
    available: true,
  },
  {
    id: 'sc1',
    name: 'Party Small Chops Box',
    description: 'A mix of spring rolls, samosas, puff-puff, and grilled chicken/peppered gizzard.',
    size: 'Party Box',
    category: 'Cooked Foods & Savouries (Moi Moi, Small Chops)',
    imageUrl: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=800',
    available: true,
  },
  {
    id: 'sc2',
    name: 'Spring Rolls',
    description: 'Crispy fried spring rolls packed with seasoned mixed vegetables.',
    price: 5.00,
    size: '10 pieces',
    category: 'Cooked Foods & Savouries (Moi Moi, Small Chops)',
    imageUrl: 'https://i.ibb.co/wrbTrnbs/spring1.jpg',
    imageUrls: [
      'https://i.ibb.co/wrbTrnbs/spring1.jpg',
      'https://i.ibb.co/m5zZYnwf/spring2.jpg',
      'https://i.ibb.co/4RcDPtSW/spring3.jpg',
      'https://i.ibb.co/XPL1Vbq/spring4.jpg'
    ],
    available: true,
  },
  {
    id: 'sc3',
    name: 'Gizdodo',
    description: 'Spicy peppered gizzard mixed with fried plantains. Perfect party starter.',
    price: 12.00,
    size: 'Medium Bowl',
    category: 'Cooked Foods & Savouries (Moi Moi, Small Chops)',
    imageUrl: 'https://i.ibb.co/wrBLgCpd/gizard1.jpg',
    imageUrls: [
      'https://i.ibb.co/wrBLgCpd/gizard1.jpg',
      'https://i.ibb.co/hJ7tT2FH/gizard2.jpg',
      'https://i.ibb.co/PZjBNnPd/gizard3.jpg',
      'https://i.ibb.co/3yjwkGNW/gizard4.jpg'
    ],
    available: true,
  },

  // --- Drinks & Beverages ---
  {
    id: 'db1',
    name: 'Malt Drink & Soft Drinks Assorted',
    description: 'Classic, refreshing non-alcoholic malt beverages and popular soft drinks (Malta Guinness, Maltina, Fayrouz, Fanta, Sprite, etc.).',
    price: 1.50,
    size: '330ml',
    category: 'Drinks & Beverages',
    imageUrl: maltDrinksAssorted,
    imageUrls: [maltDrinksAssorted, softDrinksIce, maltGlassPour, sodasBucket],
    available: true,
  },
  {
    id: 'db2',
    name: 'Zobo Drink (Hibiscus)',
    description: 'Freshly brewed hibiscus tea with ginger, cloves, and pineapple flavour.',
    price: 3.50,
    size: '500ml',
    category: 'Drinks & Beverages',
    imageUrl: 'https://i.ibb.co/My07tfkt/Zobo-3.jpg',
    imageUrls: [
      'https://i.ibb.co/My07tfkt/Zobo-3.jpg',
      'https://i.ibb.co/B2b22mTZ/zobo1.jpg',
      'https://i.ibb.co/n4t2kxp/zobo2.jpg'
    ],
    available: true,
  },
  {
    id: 'db3',
    name: 'Tropical Fruit Drink',
    description: 'Refreshing mixed tropical fruit juice.',
    price: 2.50,
    size: '1L',
    category: 'Drinks & Beverages',
    imageUrl: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&q=80&w=800',
    available: true,
  },

  // --- Fresh & Frozen Fish ---
  {
    id: 'ff1',
    name: 'Frozen Croaker Fish',
    description: 'Cleaned and whole frozen croaker fish. Perfect for grilling or making fish stew.',
    price: 15.00,
    size: '1kg',
    category: 'Fresh & Frozen Fish',
    imageUrl: 'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&q=80&w=800',
    available: true,
    // NEW: Added Variants Example based on your pricing discussion
    variants: [
      { size: '1kg', price: 15.00 },
      { size: '3 Pieces', price: 10.00 },
      { size: '1 Box', price: 99.99 }
    ]
  },

  // --- Meat & Poultry ---
  {
    id: 'ff3',
    name: 'Hard Chicken (Hen)',
    description: 'Frozen whole boiling fowl. Gives excellent flavour and rich stock for soups and stews.',
    price: 8.50,
    size: '1 Bird',
    category: 'Meat & Poultry',
    imageUrl: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&q=80&w=800', 
    available: true,
  },
  
  // --- African Ingredients ---
  {
    id: 'ai1',
    name: 'Ground Egusi (Melon Seeds)',
    description: 'Finely ground, premium quality egusi seeds, ready to be used in your favourite traditional soups.',
    price: 4.50,
    size: '500g',
    category: 'Spices & Seasonings', // Moved Egusi to Spices & Seasonings logically
    imageUrl: egusiBowl,
    imageUrls: [egusiBowl, egusiMacro, egusiScoop],
    available: true,
  },
  {
    id: 'ai2',
    name: 'Whole Ogbono',
    description: 'Premium whole wild mango seeds, known for their excellent drawing texture in soups.',
    price: 8.99,
    size: '250g',
    category: 'Spices & Seasonings', // Moved Ogbono to Spices & Seasonings
    imageUrl: 'https://i.ibb.co/wNLh2fjh/Obono1.jpg',
    imageUrls: [
      'https://i.ibb.co/wNLh2fjh/Obono1.jpg',
      'https://i.ibb.co/fdy9py3W/obono2.jpg',
      'https://i.ibb.co/NgWJ3jxT/obono3.jpg',
      'https://i.ibb.co/PnB4TRW/obono4.jpg',
      'https://i.ibb.co/xSGgPCch/obono5.jpg'
    ],
    available: true,
  },
  {
    id: 'ai3',
    name: 'Iru (Locust Beans)',
    description: 'Traditional fermented locust beans. A staple flavour enhancer in many West African soups.',
    price: 2.50,
    size: '100g',
    category: 'Spices & Seasonings', // Moved Iru to Spices & Seasonings
    imageUrl: 'https://i.ibb.co/yF5RxL61/Iru-4.jpg',
    imageUrls: [
      'https://i.ibb.co/yF5RxL61/Iru-4.jpg',
      'https://i.ibb.co/BHyGNGgp/iru1.jpg',
      'https://i.ibb.co/yBNnfkjG/iru2.jpg',
      'https://i.ibb.co/XwxcNsw/iru3.jpg'
    ],
    available: true,
  },

  // --- Special Bulk Orders ---
  {
    id: 'so1',
    name: 'Event Small Chops Tray',
    description: 'Large catering tray of mixed small chops designed for weddings, parties, or corporate events.',
    size: 'Custom Tray',
    category: 'Special Bulk Orders',
    imageUrl: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=800',
    available: true,
  },
  {
    id: 'so2',
    name: 'Corporate Bulk Grocery Order',
    description: 'Need to source African groceries in bulk for your restaurant, event, or business? Let us help.',
    size: 'Bulk',
    category: 'Special Bulk Orders',
    imageUrl: 'https://i.ibb.co/ZC50f96/bulk1.jpg',
    imageUrls: [
      'https://i.ibb.co/ZC50f96/bulk1.jpg',
      'https://i.ibb.co/6cP2B0jc/bulk2.jpg',
      'https://i.ibb.co/Z6qBZKbc/bulk3.jpg',
      'https://i.ibb.co/7dTkZc8v/bulk4.jpg'
    ],
    available: true,
  }
];