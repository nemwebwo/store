
const pool = require('../config/db');

// จำนวนรายการสินค้าและจำนวนคงเหลือ
exports.getProductSummary = async () => {
  const [rows] = await pool.query(`
    SELECT
      COUNT(*) AS totalProducts,
      COALESCE(SUM(quantity), 0) AS stockQuantity
    FROM products
    WHERE deleted_at IS NULL
  `);

  return rows[0];
};

// ยอดนำเข้าและส่งออกทั้งหมด
exports.getMovementSummary = async () => {
  const [rows] = await pool.query(`
    SELECT
      COALESCE(
        SUM(CASE WHEN type = 'IN' THEN quantity ELSE 0 END),
        0
      ) AS stockIn,
      COALESCE(
        SUM(CASE WHEN type = 'OUT' THEN quantity ELSE 0 END),
        0
      ) AS stockOut
    FROM stock_movements
  `);

  return rows[0];
};

// ประวัติการเคลื่อนไหวล่าสุด 10 รายการ
exports.getRecentMovements = async () => {
  const [rows] = await pool.query(`
    SELECT
      sm.id,
      p.product_code,
      p.product_name,
      sm.type,
      sm.quantity,
      sm.note,
      sm.created_at,
      u.username
    FROM stock_movements sm
    JOIN products p ON sm.product_id = p.id
    JOIN users u ON sm.user_id = u.id
    ORDER BY sm.created_at DESC, sm.id DESC
    LIMIT 10
  `);

  return rows;
};
