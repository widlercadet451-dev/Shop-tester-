const express = require("express");
const cors = require("cors");
const path = require("path");
const { Pool } = require("pg");

const app = express();
const PORT = process.env.PORT || 10000;
app.use(cors());
app.use(express.json({ limit: "1mb" }));

let pool = null;
if (process.env.DATABASE_URL) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL.includes("localhost") ? false : { rejectUnauthorized: false }
  });
}

app.get("/api/health", async (_req, res) => {
  let database = "demo mode";
  if (pool) {
    try { await pool.query("SELECT 1"); database = "connected"; }
    catch { database = "unavailable"; }
  }
  res.json({ status: "ok", app: "DexShop", database });
});

app.get("/api/products", (_req, res) => {
  res.json({ message: "DexShop product API is ready. Connect the product database to manage live inventory.", products: [] });
});

app.post("/api/orders", async (req, res) => {
  const { customer, items, total } = req.body || {};
  if (!customer?.name || !customer?.phone || !customer?.address || !Array.isArray(items) || !items.length) {
    return res.status(400).json({ error: "Informations de commande incomplètes." });
  }
  if (!Number.isFinite(Number(total)) || Number(total) <= 0) {
    return res.status(400).json({ error: "Total de commande invalide." });
  }
  try {
    if (pool) {
      const result = await pool.query(
        "INSERT INTO orders (customer_name, phone, address, email, items, total_htg, status) VALUES ($1,$2,$3,$4,$5,$6,'pending') RETURNING id, status",
        [customer.name, customer.phone, customer.address, customer.email || null, JSON.stringify(items), Number(total)]
      );
      return res.status(201).json({ message: "Commande enregistrée.", order: result.rows[0] });
    }
    return res.status(202).json({ message: "Commande reçue en mode démonstration. Configurez PostgreSQL pour conserver les commandes." });
  } catch (err) {
    console.error("Order error:", err.message);
    return res.status(500).json({ error: "Impossible d'enregistrer la commande." });
  }
});

app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

app.listen(PORT, () => console.log(`DexShop server listening on ${PORT}`));
