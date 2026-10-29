CREATE TABLE IF NOT EXISTS service_items (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  description VARCHAR(500) NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
INSERT INTO service_items (name, description)
SELECT 'Example service item', 'Seed data created for local development.'
WHERE NOT EXISTS (SELECT 1 FROM service_items);
