CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  category TEXT,
  price TEXT,
  size TEXT,
  material TEXT,
  status TEXT,
  summary TEXT,
  description TEXT,
  care TEXT,
  coverImage TEXT,
  gallery TEXT,
  featured INTEGER DEFAULT 0,
  visible INTEGER DEFAULT 1,
  sortOrder INTEGER DEFAULT 99,
  seoTitle TEXT,
  seoDescription TEXT,
  createdAt TEXT,
  updatedAt TEXT
);

CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);
