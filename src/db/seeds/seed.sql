INSERT INTO users (email, password) 
VALUES
  ('rafael_massimo@hotmail.com', '$2b$10$J96VIRQ2PWq5/olG3l8M6uxl75S/LlJV60Ns5UH3Q5MzxUK0xUwQy'),
  ('masahiro@kotani.com', '$2b$10$7lNVS54W3Z.WneYAOcyr5uqNorkNJjtr6QVGFtKIaDSO8JtUi4TCm');


INSERT INTO urls (user_id, longUrl, shortUrl, visit_count, unique_visit_count, create_at, originating_ip_address) 
VALUES
  (1, 'https://animista.net', '123qwe', 10, 1, NOW(), '');