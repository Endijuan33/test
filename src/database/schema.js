export const CREATE_TABLES = [
  // Tabel HP
  `CREATE TABLE IF NOT EXISTS phones (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT UNIQUE, -- SM.A56.5G.8/256.BLK
    brand TEXT,
    type TEXT,
    ram_rom TEXT, -- 4/64
    price INTEGER
  );`,
  // Tabel Unit IMEI
  `CREATE TABLE IF NOT EXISTS units (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    phone_id INTEGER,
    imei TEXT UNIQUE,
    status TEXT, -- 'in' or 'out'
    created_at TEXT,
    sold_at TEXT,
    FOREIGN KEY(phone_id) REFERENCES phones(id)
  );`,
  // Log Transaksi
  `CREATE TABLE IF NOT EXISTS logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    unit_id INTEGER,
    action TEXT, -- 'in' or 'out'
    timestamp TEXT,
    FOREIGN KEY(unit_id) REFERENCES units(id)
  );`,
  // User (optional, multi-user)
  `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    role TEXT -- admin/kasir
  );`
];
