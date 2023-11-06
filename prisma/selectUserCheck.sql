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
     c.value
    FROM "Metering" m
    LEFT JOIN "User" p ON p.id=m.userId
    LEFT JOIN "Check" c ON c.id=m.checkId