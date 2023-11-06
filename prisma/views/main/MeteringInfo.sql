SELECT
  m.id,
  m.createdAt,
  m.num,
  m.value,
  m.intake,
  m.payment,
  m.isNoValue,
  m.isCommon,
  m.checkId,
  m.userId,
  p.name,
  c.value,
  c.summa
FROM
  "Metering" AS m
  LEFT JOIN "User" AS p ON p.id = m.userId
  LEFT JOIN "Check" AS c ON c.id = m.checkId;