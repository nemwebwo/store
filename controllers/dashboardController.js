
const dashboardModel = require('../models/dashboardModel');

exports.index = async (req, res) => {
  try {
    const [
      productSummary,
      movementSummary,
      recentMovements
    ] = await Promise.all([
      dashboardModel.getProductSummary(),
      dashboardModel.getMovementSummary(),
      dashboardModel.getRecentMovements()
    ]);

    const stats = {
      totalProducts: Number(productSummary.totalProducts),
      stockQuantity: Number(productSummary.stockQuantity),
      stockIn: Number(movementSummary.stockIn),
      stockOut: Number(movementSummary.stockOut)
    };

    res.render('dashboard/index', {
      title: 'Dashboard',
      stats,
      recentMovements
    });

  } catch (error) {
    console.error('Dashboard Error:', error);

    res.status(500).send(
      'เกิดข้อผิดพลาดในการโหลดข้อมูล Dashboard'
    );
  }
};
