const mysql = require("mysql2/promise");

// DB 연결
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "0000",
    database: "jwt",
});

// 특정 ID로 유저 조회
const getUserById = async (id) => {
    const query = "SELECT * FROM user WHERE id = ?";
    const [rows] = await pool.query(query, [id]);
    // console.log("조회된 결과:", rows); 
    return rows[0]; // ID는 고유해야 하므로 한 개만 반환
};

module.exports = { getUserById };
