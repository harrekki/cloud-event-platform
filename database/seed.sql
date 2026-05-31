INSERT INTO users (
  first_name,
  last_name,
  email,
  phone,
  password_hash,
  role
)
VALUES
(
  'Admin',
  'User',
  'admin@example.com',
  '5551112222',
  '$2b$10$OdtLlNXxZBVbTpGd0F35FO1otPzu0f.Yq0WvoH8TtAfYv.sDXFZje',
  'admin'
),
(
  'Test',
  'User',
  'user@example.com',
  '5553334444',
  '$2b$10$7C0SRjKT0c.CgYrQWkQdMOlhwUi.a2xJMxI4MTE26n0mRW8f/wOGy',
  'user'
);

INSERT INTO events (
  title,
  description,
  location,
  event_date,
  capacity,
  created_by
)
VALUES
(
  'AWS Cloud Fundamentals',
  'Introductory workshop covering AWS services.',
  'Online',
  '2026-06-15 18:00:00',
  50,
  1
),
(
  'React Fundamentals',
  'Hands-on React workshop.',
  'Albuquerque, NM',
  '2026-06-22 10:00:00',
  30,
  1
);