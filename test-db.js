
const pool = require('./config/db');

async function testConnection() {
  try {
    const [rows] = await pool.query(
      'SELECT DATABASE() AS db_name, VERSION() AS version'
    );

    console.log('MySQL Connected Successfully!');
    console.log('Database:', rows[0].db_name);
    console.log('MySQL Version:', rows[0].version);

  } catch (error) {
    console.error('MySQL Connection Failed!');
    console.error('Error Code:', error.code);
    console.error('Message:', error.message);
    process.exitCode = 1;

  } finally {
    await pool.end();
  }
}

testConnection();
