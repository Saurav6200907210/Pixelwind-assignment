const https = require('https');

const products = [
  {id: 7, query: 'denim-jacket'},
  {id: 8, query: 'mens-shirt'},
  {id: 9, query: 'summer-dress'},
  {id: 11, query: 'rice'},
  {id: 13, query: 'almonds'},
  {id: 14, query: 'honey-jar'},
  {id: 26, query: 'soccer-ball'},
  {id: 28, query: 'dumbbells'},
  {id: 31, query: 'running-shoes'},
  {id: 32, query: 'white-sneakers'},
  {id: 33, query: 'mens-formal-shoes'},
  {id: 17, query: 'face-moisturizer'},
  {id: 16, query: 'face-serum'}
];

const fetchImage = (query) => {
  return new Promise((resolve) => {
    https.get('https://unsplash.com/s/photos/' + query, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        // match regular photo ID
        const match = data.match(/https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9\-]+\?[^\s"&]+/g);
        if (match && match.length > 0) {
          const url = match[0].split('?')[0] + '?q=80&w=600&auto=format&fit=crop';
          resolve(url);
        } else {
          resolve('https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop');
        }
      });
    }).on('error', () => resolve('error'));
  });
};

async function run() {
  const result = {};
  for (let p of products) {
    const url = await fetchImage(p.query);
    result[p.id] = url;
    console.log(p.id + '::' + url);
  }
}
run();
