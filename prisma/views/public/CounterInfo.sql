SELECT
  c.id,
  c.num,
  u.name
FROM
  (
    "Counter" c
    LEFT JOIN "User" u ON ((u.id = c."userId"))
  );