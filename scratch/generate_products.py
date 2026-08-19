import json

categories = [
    ('Electronics', [
        ('Wireless Noise-Cancelling Headphones', 'Premium audio experience with active noise cancellation, 30-hour battery, and fast charging.', 12999, 15999, '20% OFF', 4.8, 342, 'Sony', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop'),
        ('Smartwatch Pro', 'Advanced health tracking, ECG, oxygen monitoring, and always-on display.', 24999, 29999, '16% OFF', 4.7, 856, 'Apple', 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=600&auto=format&fit=crop'),
        ('Premium Bluetooth Speaker', '360-degree sound, waterproof design, and 20-hour playtime.', 8999, 10999, '18% OFF', 4.6, 215, 'JBL', 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=600&auto=format&fit=crop'),
        ('4K Android Smart TV', 'Stunning 4K visuals, HDR10+, and built-in voice assistant.', 45999, 55999, '17% OFF', 4.5, 124, 'Samsung', 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=600&auto=format&fit=crop'),
        ('Wireless Mechanical Keyboard', 'Tactile switches, RGB backlighting, and multi-device connection.', 10999, 12999, '15% OFF', 4.9, 412, 'Logitech', 'https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=600&auto=format&fit=crop')
    ]),
    ('Fashion', [
        ('Premium Oversized Cotton T-Shirt', '100% organic cotton, relaxed fit, perfect for everyday wear.', 1499, 1999, '25% OFF', 4.5, 210, 'Zara', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=600&auto=format&fit=crop'),
        ('Classic Denim Jacket', 'Vintage wash, durable denim, multiple pockets.', 3499, 4999, '30% OFF', 4.6, 185, 'Levis', 'https://images.unsplash.com/photo-1495105787522-5334e3ffa0efa?q=80&w=600&auto=format&fit=crop'),
        ('Mens Casual Shirt', 'Breathable linen blend, button-down collar, regular fit.', 2499, 3299, '24% OFF', 4.4, 320, 'H&M', 'https://images.unsplash.com/photo-1596755094514-f87e32f85e2c?q=80&w=600&auto=format&fit=crop'),
        ('Womens Summer Dress', 'Floral print, lightweight fabric, adjustable straps.', 2999, 3999, '25% OFF', 4.7, 410, 'Mango', 'https://images.unsplash.com/photo-1515347619362-75fe22d2b9d2?q=80&w=600&auto=format&fit=crop'),
        ('Premium Hoodie', 'Fleece lining, kangaroo pocket, ribbed cuffs.', 2799, 3599, '22% OFF', 4.8, 530, 'Nike', 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600&auto=format&fit=crop')
    ]),
    ('Groceries', [
        ('Organic Basmati Rice', 'Long grain, aromatic, naturally aged for 2 years.', 450, 550, '18% OFF', 4.7, 890, 'India Gate', 'https://images.unsplash.com/photo-1586201375761-83865001e8ac?q=80&w=600&auto=format&fit=crop'),
        ('Fresh Mixed Fruits Basket', 'Assorted seasonal fruits directly from farms.', 899, 1100, '18% OFF', 4.5, 340, 'FarmFresh', 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=600&auto=format&fit=crop'),
        ('Premium Almonds', 'Rich in nutrients, vacuum packed for freshness.', 950, 1200, '20% OFF', 4.8, 1200, 'Happilo', 'https://images.unsplash.com/photo-1508061253366-f7da158b6d90?q=80&w=600&auto=format&fit=crop'),
        ('Organic Honey', 'Pure, unfiltered raw honey with natural antioxidants.', 499, 650, '23% OFF', 4.9, 670, 'Dabur', 'https://images.unsplash.com/photo-1587049352847-81a56d773c1c?q=80&w=600&auto=format&fit=crop'),
        ('Whole Wheat Atta', 'Stone-ground, rich in fiber, makes soft rotis.', 220, 280, '21% OFF', 4.6, 2100, 'Aashirvaad', 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600&auto=format&fit=crop')
    ]),
    ('Beauty', [
        ('Vitamin C Face Serum', 'Brightens skin, reduces dark spots, with hyaluronic acid.', 899, 1299, '30% OFF', 4.6, 950, 'Plum', 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop'),
        ('Hydrating Face Moisturizer', 'Lightweight, 24-hour hydration, suitable for all skin types.', 599, 799, '25% OFF', 4.7, 1240, 'Cetaphil', 'https://images.unsplash.com/photo-1611078516035-64a66a3a9681?q=80&w=600&auto=format&fit=crop'),
        ('Matte Lipstick Set', 'Long-lasting, smudge-proof, vivid colors.', 1299, 1899, '31% OFF', 4.5, 430, 'MAC', 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=600&auto=format&fit=crop'),
        ('Gentle Face Cleanser', 'Soap-free formula, balances skin pH.', 450, 550, '18% OFF', 4.8, 2300, 'Neutrogena', 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=600&auto=format&fit=crop'),
        ('Hair Repair Serum', 'Controls frizz, adds shine, protects from heat.', 650, 850, '23% OFF', 4.4, 670, 'Loreal', 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=600&auto=format&fit=crop')
    ]),
    ('Home & Living', [
        ('Modern Table Lamp', 'Warm LED light, minimalist design, touch controls.', 1899, 2599, '26% OFF', 4.7, 320, 'Philips', 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=600&auto=format&fit=crop'),
        ('Premium Bedside Table', 'Solid wood finish, single drawer, easy assembly.', 3499, 4999, '30% OFF', 4.5, 150, 'IKEA', 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?q=80&w=600&auto=format&fit=crop'),
        ('Decorative Wall Art', 'Abstract canvas painting, ready to hang.', 1299, 1999, '35% OFF', 4.8, 410, 'Artisan', 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=600&auto=format&fit=crop'),
        ('Soft Cotton Bedsheet Set', '300 thread count, breathable, includes 2 pillowcases.', 1599, 2299, '30% OFF', 4.6, 890, 'Bombay Dyeing', 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=600&auto=format&fit=crop'),
        ('Aroma Diffuser', 'Ultrasonic humidifier, 7 LED colors, quiet operation.', 1199, 1699, '29% OFF', 4.4, 560, 'HomeCentre', 'https://images.unsplash.com/photo-1602928321679-560bb453f190?q=80&w=600&auto=format&fit=crop')
    ]),
    ('Sports', [
        ('Professional Football', 'FIFA quality pro standard, seamless surface.', 2499, 3299, '24% OFF', 4.7, 650, 'Adidas', 'https://images.unsplash.com/photo-1614632537197-38a4705f42cb?q=80&w=600&auto=format&fit=crop'),
        ('Running Training Shoes', 'Responsive cushioning, breathable mesh upper.', 4599, 5999, '23% OFF', 4.8, 1200, 'Puma', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop'),
        ('Adjustable Dumbbell Set', 'Space-saving design, 2.5kg to 24kg weight range.', 12999, 16999, '23% OFF', 4.9, 340, 'Bowflex', 'https://images.unsplash.com/photo-1638043689404-511bb649c043?q=80&w=600&auto=format&fit=crop'),
        ('Yoga Mat', 'Anti-slip, 6mm thickness, eco-friendly TPE material.', 999, 1499, '33% OFF', 4.6, 2100, 'Decathlon', 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?q=80&w=600&auto=format&fit=crop'),
        ('Sports Water Bottle', 'BPA-free, leak-proof, 1L capacity with tracker.', 499, 799, '37% OFF', 4.5, 980, 'Milton', 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=600&auto=format&fit=crop')
    ]),
    ('Footwear', [
        ('Premium Running Sneakers', 'Lightweight, shock-absorbing, perfect for marathons.', 6999, 8999, '22% OFF', 4.8, 1450, 'Nike', 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=80&w=600&auto=format&fit=crop'),
        ('Casual White Sneakers', 'Classic design, synthetic leather, comfortable everyday wear.', 2499, 3499, '28% OFF', 4.6, 3200, 'Adidas', 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=600&auto=format&fit=crop'),
        ('Mens Formal Shoes', 'Genuine leather, slip-resistant sole, elegant finish.', 3999, 5499, '27% OFF', 4.5, 670, 'Clarks', 'https://images.unsplash.com/photo-1614252339474-df1567d4fc4b?q=80&w=600&auto=format&fit=crop'),
        ('Womens Lifestyle Sneakers', 'Trendy chunky sole, pastel colors, breathable.', 3299, 4599, '28% OFF', 4.7, 890, 'Puma', 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=600&auto=format&fit=crop'),
        ('Sports Training Shoes', 'High stability, durable outsole for gym workouts.', 4299, 5999, '28% OFF', 4.6, 540, 'Reebok', 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=600&auto=format&fit=crop')
    ]),
    ('Accessories', [
        ('Classic Analog Watch', 'Stainless steel band, water-resistant, minimal dial.', 5499, 7999, '31% OFF', 4.7, 920, 'Fossil', 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop'),
        ('Leather Wallet', 'Genuine leather, RFID blocking, multiple card slots.', 1299, 1999, '35% OFF', 4.8, 1250, 'Tommy Hilfiger', 'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=600&auto=format&fit=crop'),
        ('Premium Sunglasses', 'Polarized lenses, UV400 protection, aviator frame.', 2999, 4499, '33% OFF', 4.6, 840, 'RayBan', 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=600&auto=format&fit=crop'),
        ('Laptop Backpack', 'Water-resistant, fits 15.6 inch laptops, anti-theft design.', 1899, 2999, '36% OFF', 4.5, 2100, 'Wildcraft', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop'),
        ('Minimalist Belt', 'Full-grain leather, classic buckle, versatile style.', 999, 1499, '33% OFF', 4.7, 630, 'Allen Solly', 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=600&auto=format&fit=crop')
    ]),
    ('Books', [
        ('Atomic Habits', 'An Easy & Proven Way to Build Good Habits & Break Bad Ones.', 499, 699, '28% OFF', 4.9, 15000, 'James Clear', 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=600&auto=format&fit=crop'),
        ('The Psychology of Money', 'Timeless lessons on wealth, greed, and happiness.', 350, 499, '30% OFF', 4.8, 12000, 'Morgan Housel', 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=600&auto=format&fit=crop'),
        ('Clean Code', 'A Handbook of Agile Software Craftsmanship.', 899, 1299, '30% OFF', 4.8, 8500, 'Robert C. Martin', 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop'),
        ('The Pragmatic Programmer', 'Your journey to mastery, 20th Anniversary Edition.', 999, 1499, '33% OFF', 4.9, 6200, 'David Thomas', 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=600&auto=format&fit=crop'),
        ('Deep Work', 'Rules for Focused Success in a Distracted World.', 450, 650, '30% OFF', 4.7, 9800, 'Cal Newport', 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=600&auto=format&fit=crop')
    ])
]

products_list = []
id_counter = 1

for category_name, items in categories:
    for name, desc, price, original, discount, rating, rev, brand, img in items:
        products_list.append({
            'id': str(id_counter),
            'name': name,
            'category': category_name,
            'image': img,
            'price': price,
            'originalPrice': original,
            'discount': discount,
            'rating': rating,
            'reviewCount': rev,
            'description': desc,
            'features': ['Premium Build Quality', 'Durable Material', 'Modern Design', '1 Year Warranty', 'Free Returns'],
            'availability': 'In Stock',
            'brand': brand,
            'delivery': 'Delivery within 2-4 business days',
            'returnPolicy': '7 Days replacement policy'
        })
        id_counter += 1

output_js = "export const products = " + json.dumps(products_list, indent=2) + ";\\n"
with open('data/products.js', 'w', encoding='utf-8') as f:
    f.write(output_js)

print('Successfully generated 45 products in data/products.js')
