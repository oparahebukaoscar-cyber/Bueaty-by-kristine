// scripts/check_dev_server.js
// Simple dev server health check for localhost:5173
const urls = ['http://localhost:5173/', 'http://localhost:5173/admin/products'];
(async () => {
  for (const u of urls) {
    try {
      const r = await fetch(u);
      console.log(u, 'status', r.status);
      const txt = await r.text();
      console.log(u, 'bodyLength', txt.length);
    } catch (err) {
      console.error(u, 'error', err.message || err);
    }
  }
})();
