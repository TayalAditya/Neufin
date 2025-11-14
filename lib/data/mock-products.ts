import { Product } from "@/lib/validations/product";

const categories = [
  "Electronics",
  "Clothing",
  "Books",
  "Home & Kitchen",
  "Sports & Outdoors",
  "Toys & Games",
  "Beauty & Personal Care",
  "Automotive",
];

const productNames = {
  Electronics: [
    "Wireless Bluetooth Headphones",
    "4K Smart LED TV",
    "Laptop Pro 15-inch",
    "Smartphone X Pro",
    "Tablet 10-inch",
    "Smart Watch Series 5",
    "Digital Camera DSLR",
    "Portable Bluetooth Speaker",
    "Gaming Console",
    "Wireless Mouse",
  ],
  Clothing: [
    "Cotton T-Shirt",
    "Denim Jeans",
    "Formal Shirt",
    "Casual Sneakers",
    "Leather Jacket",
    "Running Shoes",
    "Hoodie Sweatshirt",
    "Formal Trousers",
    "Summer Dress",
    "Winter Coat",
  ],
  Books: [
    "The Art of Programming",
    "Mystery Novel Collection",
    "Science Fiction Epic",
    "Self-Help Guide",
    "Cooking Masterclass",
    "Historical Biography",
    "Business Strategy",
    "Children's Adventure",
    "Poetry Anthology",
    "Travel Guide India",
  ],
  "Home & Kitchen": [
    "Non-Stick Cookware Set",
    "Coffee Maker Machine",
    "Vacuum Cleaner Robot",
    "Bedsheet Cotton Set",
    "Kitchen Knife Set",
    "Dinner Plate Set",
    "Table Lamp LED",
    "Microwave Oven",
    "Water Purifier",
    "Air Fryer",
  ],
  "Sports & Outdoors": [
    "Yoga Mat Premium",
    "Camping Tent 4-Person",
    "Cricket Bat Professional",
    "Football Size 5",
    "Badminton Racket",
    "Cycling Helmet",
    "Gym Dumbbell Set",
    "Swimming Goggles",
    "Hiking Backpack",
    "Tennis Racket",
  ],
  "Toys & Games": [
    "Board Game Family Pack",
    "Remote Control Car",
    "Building Blocks Set",
    "Puzzle 1000 Pieces",
    "Action Figure Collectible",
    "Doll House Set",
    "Educational Learning Toy",
    "Video Game Bundle",
    "Art & Craft Kit",
    "Musical Instrument Toy",
  ],
  "Beauty & Personal Care": [
    "Face Cream Moisturizer",
    "Hair Dryer Professional",
    "Perfume Luxury Edition",
    "Makeup Kit Complete",
    "Electric Toothbrush",
    "Shampoo & Conditioner Set",
    "Skincare Serum",
    "Nail Polish Collection",
    "Beard Trimmer",
    "Sunscreen SPF 50",
  ],
  Automotive: [
    "Car Phone Holder",
    "Dash Camera HD",
    "Car Air Freshener",
    "Tire Pressure Gauge",
    "Car Vacuum Cleaner",
    "LED Headlight Bulbs",
    "Car Cover Waterproof",
    "Jump Starter Portable",
    "Car Seat Covers",
    "GPS Navigation System",
  ],
};

const descriptions = [
  "Premium quality product with excellent durability and performance.",
  "Designed for modern lifestyle with sleek aesthetics and functionality.",
  "Best-in-class features that exceed expectations.",
  "Carefully crafted with attention to detail and quality materials.",
  "Perfect blend of style, comfort, and practicality.",
  "Industry-leading technology for superior user experience.",
  "Eco-friendly and sustainable choice for conscious consumers.",
  "Versatile design suitable for various occasions and needs.",
];

// Product name to image mapping for better accuracy
const productImageMap: Record<string, string> = {
  // Electronics
  "Wireless Bluetooth Headphones": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
  "4K Smart LED TV": "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1",
  "Laptop Pro 15-inch": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
  "Smartphone X Pro": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
  "Tablet 10-inch": "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0",
  "Smart Watch Series 5": "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
  "Digital Camera DSLR": "https://images.unsplash.com/photo-1502920917128-1aa500764cbd",
  "Portable Bluetooth Speaker": "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1",
  "Gaming Console": "https://images.unsplash.com/photo-1486401899868-0e435ed85128",
  "Wireless Mouse": "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46",
  
  // Clothing
  "Cotton T-Shirt": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
  "Denim Jeans": "https://images.unsplash.com/photo-1542272604-787c3835535d",
  "Formal Shirt": "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633",
  "Casual Sneakers": "https://images.unsplash.com/photo-1549298916-b41d501d3772",
  "Leather Jacket": "https://images.unsplash.com/photo-1551028719-00167b16eac5",
  "Running Shoes": "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
  "Hoodie Sweatshirt": "https://images.unsplash.com/photo-1556821840-3a63f95609a7",
  "Formal Trousers": "https://images.unsplash.com/photo-1473966968600-fa801b869a1a",
  "Summer Dress": "https://images.unsplash.com/photo-1595777457583-95e059d581b8",
  "Winter Coat": "https://images.unsplash.com/photo-1539533018447-63fcce2678e3",
  
  // Books
  "The Art of Programming": "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
  "Mystery Novel Collection": "https://images.unsplash.com/photo-1544947950-fa07a98d237f",
  "Science Fiction Epic": "https://images.unsplash.com/photo-1512820790803-83ca734da794",
  "Self-Help Guide": "https://images.unsplash.com/photo-1495446815901-a7297e633e8d",
  "Cooking Masterclass": "https://images.unsplash.com/photo-1466637574441-749b8f19452f",
  "Historical Biography": "https://images.unsplash.com/photo-1481627834876-b7833e8f5570",
  "Business Strategy": "https://images.unsplash.com/photo-1543002588-bfa74002ed7e",
  "Children's Adventure": "https://images.unsplash.com/photo-1532012197267-da84d127e765",
  "Poetry Anthology": "https://images.unsplash.com/photo-1519682337058-a94d519337bc",
  "Travel Guide India": "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
  
  // Home & Kitchen
  "Non-Stick Cookware Set": "https://images.unsplash.com/photo-1556911220-bff31c812dba",
  "Coffee Maker Machine": "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6",
  "Vacuum Cleaner Robot": "https://images.unsplash.com/photo-1558317374-067fb5f30001",
  "Bedsheet Cotton Set": "https://images.unsplash.com/photo-1631679706909-1844bbd07221",
  "Kitchen Knife Set": "https://images.unsplash.com/photo-1593618998160-e34014e67546",
  "Dinner Plate Set": "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61",
  "Table Lamp LED": "https://images.unsplash.com/photo-1507473885765-e6ed057f782c",
  "Microwave Oven": "https://images.unsplash.com/photo-1585659722983-3a675dabf23d",
  "Water Purifier": "https://images.unsplash.com/photo-1595514535116-2f6a0b7e7fae",
  "Air Fryer": "https://images.unsplash.com/photo-1585515320310-259814833e62",
  
  // Sports & Outdoors
  "Yoga Mat Premium": "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f",
  "Camping Tent 4-Person": "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d",
  "Cricket Bat Professional": "https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972",
  "Football Size 5": "https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab",
  "Badminton Racket": "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea",
  "Cycling Helmet": "https://images.unsplash.com/photo-1557804506-669a67965ba0",
  "Gym Dumbbell Set": "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",
  "Swimming Goggles": "https://images.unsplash.com/photo-1530549387789-4c1017266635",
  "Hiking Backpack": "https://images.unsplash.com/photo-1622260614153-03223fb72052",
  "Tennis Racket": "https://images.unsplash.com/photo-1617083278663-f9bd4a5a5b7e",
  
  // Toys & Games
  "Board Game Family Pack": "https://images.unsplash.com/photo-1566694271453-390536dd1f0d",
  "Remote Control Car": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64",
  "Building Blocks Set": "https://images.unsplash.com/photo-1587654780291-39c9404d746b",
  "Puzzle 1000 Pieces": "https://images.unsplash.com/photo-1495364141860-b0d03eccd065",
  "Action Figure Collectible": "https://images.unsplash.com/photo-1601814933824-fd0b574dd592",
  "Doll House Set": "https://images.unsplash.com/photo-1563396983906-b3795482a59a",
  "Educational Learning Toy": "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4",
  "Video Game Bundle": "https://images.unsplash.com/photo-1550745165-9bc0b252726f",
  "Art & Craft Kit": "https://images.unsplash.com/photo-1513364776144-60967b0f800f",
  "Musical Instrument Toy": "https://images.unsplash.com/photo-1511379938547-c1f69419868d",
  
  // Beauty & Personal Care
  "Face Cream Moisturizer": "https://images.unsplash.com/photo-1556228578-0d85b1a4d571",
  "Hair Dryer Professional": "https://images.unsplash.com/photo-1522338242992-e1a54906a8da",
  "Perfume Luxury Edition": "https://images.unsplash.com/photo-1541643600914-78b084683601",
  "Makeup Kit Complete": "https://images.unsplash.com/photo-1596462502278-27bfdc403348",
  "Electric Toothbrush": "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04",
  "Shampoo & Conditioner Set": "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d",
  "Skincare Serum": "https://images.unsplash.com/photo-1620916566398-39f1143ab7be",
  "Nail Polish Collection": "https://images.unsplash.com/photo-1610992015732-2449b76344bc",
  "Beard Trimmer": "https://images.unsplash.com/photo-1621607512214-68297480165e",
  "Sunscreen SPF 50": "https://images.unsplash.com/photo-1556228720-195a672e8a03",
  
  // Automotive
  "Car Phone Holder": "https://images.unsplash.com/photo-1519003722824-194d4455a60c",
  "Dash Camera HD": "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae",
  "Car Air Freshener": "https://images.unsplash.com/photo-1585128792020-803d29415281",
  "Tire Pressure Gauge": "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d",
  "Car Vacuum Cleaner": "https://images.unsplash.com/photo-1607860108855-64acf2078ed9",
  "LED Headlight Bulbs": "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b",
  "Car Cover Waterproof": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d",
  "Jump Starter Portable": "https://images.unsplash.com/photo-1621939514649-280e2ee25f60",
  "Car Seat Covers": "https://images.unsplash.com/photo-1449130015084-2fae5eca97f4",
  "GPS Navigation System": "https://images.unsplash.com/photo-1526368746824-4e9b5d6e0b6f",
};

function generateProduct(id: number): Product {
  // Use ID for consistent randomization instead of Math.random()
  const categoryIndex = id % categories.length;
  const category = categories[categoryIndex];
  const productList = productNames[category as keyof typeof productNames];
  const nameIndex = id % productList.length;
  const baseName = productList[nameIndex];
  const descriptionIndex = id % descriptions.length;
  const description = descriptions[descriptionIndex];
  
  // Get product-specific image based on base name (without ID)
  const imageUrl = productImageMap[baseName] || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e";
  const price = ((id * 789) % 50000) + 500;
  const rating = +((((id * 17) % 20) / 10 + 3).toFixed(1)); // 3.0 to 5.0
  const inStock = (id % 5) !== 0; // 80% in stock

  // Determine special tags based on product ID
  let tag = null;
  let discount = 0;
  let originalPrice = null;

  if (id % 8 === 0) {
    tag = "Hot Deal";
    discount = 20;
    originalPrice = Math.floor(price / 0.8);
  } else if (id % 7 === 0) {
    tag = "Trending";
  } else if (id % 6 === 0) {
    tag = "New Arrival";
  } else if (id % 9 === 0) {
    discount = 15;
    originalPrice = Math.floor(price / 0.85);
  }

  return {
    id: `prod-${id.toString().padStart(4, "0")}`,
    name: baseName,
    shortDescription: description.slice(0, 80) + "...",
    description: `${description} This ${baseName.toLowerCase()} offers exceptional value with cutting-edge features. Whether you're a professional or enthusiast, this product delivers outstanding performance. Built with premium materials and backed by extensive research and development.`,
    price,
    currency: "INR",
    imageUrl: imageUrl,
    category,
    rating,
    inStock,
    attributes: {
      brand: "Premium Brand",
      warranty: "1 Year",
      color: ["Black", "White", "Blue", "Red"][(id * 7) % 4],
      size: ["S", "M", "L", "XL", "Standard"][(id * 11) % 5],
      tag,
      discount,
      originalPrice,
    },
  };
}

// Generate 80 unique mock products with better distribution
export const mockProducts: Product[] = Array.from({ length: 80 }, (_, i) =>
  generateProduct(i + 1)
);

export function getProducts(
  page: number = 1,
  limit: number = 10,
  search?: string
): { data: Product[]; total: number } {
  let filtered = mockProducts;

  // Filter by search query
  if (search && search.trim()) {
    const query = search.toLowerCase();
    filtered = mockProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category?.toLowerCase().includes(query)
    );
  }

  const total = filtered.length;
  const start = (page - 1) * limit;
  const end = start + limit;
  const data = filtered.slice(start, end);

  return { data, total };
}

export function getProductById(id: string): Product | undefined {
  return mockProducts.find((product) => product.id === id);
}
