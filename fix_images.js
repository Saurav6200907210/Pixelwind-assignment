const fs = require('fs');

const replacements = {
  // Classic Denim Jacket
  "7": "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=600&auto=format&fit=crop",
  // Mens Casual Shirt
  "8": "https://cdn.dummyjson.com/product-images/mens-shirts/man-plaid-shirt/1.webp",
  // Womens Summer Dress
  "9": "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=600&auto=format&fit=crop",
  // Organic Basmati Rice
  "11": "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?q=80&w=600&auto=format&fit=crop",
  // Premium Almonds
  "13": "https://images.unsplash.com/photo-1563223771-5fe4038fbfc9?q=80&w=600&auto=format&fit=crop",
  // Organic Honey
  "14": "https://cdn.dummyjson.com/product-images/groceries/honey-jar/1.webp",
  // Vitamin C Face Serum
  "16": "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=600&auto=format&fit=crop",
  // Hydrating Face Moisturizer
  "17": "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=600&auto=format&fit=crop",
  // Professional Football
  "26": "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=600&auto=format&fit=crop",
  // Adjustable Dumbbells
  "28": "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=600&auto=format&fit=crop",
  // Premium Running Sneakers
  "31": "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=600&auto=format&fit=crop",
  // Casual White Sneakers
  "32": "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600&auto=format&fit=crop",
  // Mens Formal Shoes (We'll use a dummyjson shoe or unsplash shoe)
  "33": "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=600&auto=format&fit=crop"
};

const codePath = 'data/products.js';
let code = fs.readFileSync(codePath, 'utf8');

// We use regex to find and replace the image URLs for the specified IDs
// Instead of evaluating and re-stringifying, we can just replace within the file directly to preserve formatting.

Object.keys(replacements).forEach(id => {
  const targetId = '"' + id + '"';
  const regex = new RegExp('(\"id\":\\s*' + targetId + '[\\s\\S]*?\"image\":\\s*\")[^\"]+(\")', 'g');
  code = code.replace(regex, '$1' + replacements[id] + '$2');
});

fs.writeFileSync(codePath, code, 'utf8');
console.log('Fixed images successfully!');
