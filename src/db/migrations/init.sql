DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS urls CASCADE;


CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(500)
);

CREATE TABLE urls (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  longUrl VARCHAR(255) NOT NULL,
  shortUrl VARCHAR(500),
  visit_count INTEGER DEFAULT 0,
  unique_visit_count INTEGER DEFAULT 0,
  create_at TIMESTAMP DEFAULT NOW(),
  originating_ip_address VARCHAR(500)
);