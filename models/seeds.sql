USE searchdb;

SELECT search,
    CONCAT('$', FORMAT(price, 2)) price
FROM searchdb
ORDER BY price;