
const pool = require('./config/db');

async function testProducts() {
  try {
    const [products] = await pool.query(`
      SELECT
        id,
        product_code,
        product_name,
        quantity,
        unit
      FROM products
      WHERE deleted_at IS NULL
      ORDER BY id
    `);

    console.log('Products from MySQL:');
    console.table(products);

    const [summary] = await pool.query(`
      SELECT
        COUNT(*) AS total_products,
        COALESCE(SUM(quantity), 0) AS total_quantity
      FROM products
      WHERE deleted_at IS NULL
    `);

    console.log('Dashboard Summary:');
    console.table(summary);

  } catch (error) {
    console.error('Database Error:', error.message);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

testProducts();
