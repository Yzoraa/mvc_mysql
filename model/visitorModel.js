const mysql = require('mysql2/promise'); // npm i mysql2 진행함

// DB 연결
const pool = mysql.createPool({
    host: "localhost", // DB가 설치된 호스트 IP 주소
    user:"root", // DB 접속 유저이름
    password: "0000", // DB 접속 비밀번호
    database: "user" // DB 이름
});

// 데이터 전부 가져오기
const getAllvisitor = async () =>{
    const query = "select * from users";
    const [rows] = await pool.query(query);
    return rows;
}

// 해당하는 데이터 하나만 가져오기
const getOnevisitor = async (userid) =>{
    const query2 = `select * from users where id = ${userid}`;
    const [rows] = await pool.query(query2);
    return rows[0];
};

// 등록하기
const postData = async (data) => {
    try {
        const query = "INSERT INTO users (userid, name, comment) VALUES (?, ?, ?)";
        const values = [data.userid, data.name, data.comment];
        const [result] = await pool.query(query, values);

        console.log("성공:", result);
        return "데이터가 성공적으로 등록되었습니다.";
    } catch (error) {
        console.error("오류:", error);
    }
};

// 해당 아이디 가진 데이터(row) 삭제
const deleteRow = async (id) =>{
    const query = `delete from users where id = ${Number(id)}`;
    try{
        await pool.query(query,[id]);
    } catch(error){
        console.log('삭제 실패');
    }
};

// 해당 아이디 가진 데이터 수정
const updateRow = async (data) =>{
    const query = 'UPDATE users SET name = ?, comment = ? WHERE  id = ?';
    try{
        await pool.query(query, [data.name, data.comment, Number(data.id)]);
    } catch(error){
        console.log('수정 실패');
    }
}

module.exports = { getAllvisitor, getOnevisitor, postData, deleteRow, updateRow };