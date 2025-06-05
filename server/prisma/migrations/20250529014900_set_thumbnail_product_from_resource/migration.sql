-- This is an empty migration.
DO $$

BEGIN

CREATE TEMP TABLE temp_result AS
SELECT 
  p.id AS id, 
  MAX(pr.resource_id) AS thumbnail_id
FROM 
  products p
JOIN 
  product_resources pr ON p.id = pr.product_id
GROUP BY 
  p.id;
  
UPDATE products
SET thumbnail_id = temp_result.thumbnail_id
FROM temp_result
WHERE products.id = temp_result.id;

COMMIT;
END
$$;