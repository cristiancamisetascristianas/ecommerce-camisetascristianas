-- ============================================================
-- En Tus Manos Estoy · Migración inicial
-- Ejecutar UNA VEZ en: Supabase Dashboard → SQL Editor → Run
-- ============================================================

CREATE TABLE IF NOT EXISTS products (
  id          TEXT        PRIMARY KEY,
  name        TEXT        NOT NULL,
  category    TEXT        NOT NULL CHECK (category IN ('hombre', 'mujer', 'pareja')),
  price       INTEGER     NOT NULL,
  badge       TEXT,
  short       TEXT,
  description TEXT,
  features    TEXT[]      DEFAULT '{}',
  sizes       TEXT[]      DEFAULT '{}',
  images      TEXT[]      DEFAULT '{}',
  active      BOOLEAN     DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read products"
  ON products FOR SELECT
  USING (true);

GRANT SELECT ON products TO anon;
GRANT SELECT ON products TO authenticated;
