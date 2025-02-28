const jwt = require("jsonwebtoken");
const loginModel = require("../model/loginModel"); // DB 조회를 위해 추가
const secretKey = "27B6B3322BC296BB86228997A342F"; // JWT 시크릿 키

const authMiddleware = async (req, res, next) => {
    // 쿠키에서 JWT 가져오기
    const token = req.cookies.token; 

    if (!token) {
        return res.status(401).json({ result: false, message: "토큰 없음" });
    }
    // console.log("받은 토큰:", token);

    try {
        const decoded = jwt.verify(token, secretKey); // 토큰 검증
        console.log("검증된 토큰:", decoded);

        const user = await loginModel.getUserById(decoded.id); // DB에서 사용자 조회

        if (!user) {
            return res.json({ result: false, message: "사용자를 찾을 수 없음" });
        }

        req.user = user; 
        next();

    } catch (error) {
        console.error("토큰 검증 오류:", error);
        return res.json({ result: false, message: "유효하지 않은 토큰" });
    }
};

module.exports = authMiddleware;
