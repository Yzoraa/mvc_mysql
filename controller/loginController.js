const loginModel = require("../model/loginModel");
const jwt = require("jsonwebtoken");

const secretKey = "27B6B3322BC296BB86228997A342F"; // JWT 시크릿 키

// 아이디 하나
const loginUser = async (req, res) => {
    try {
        console.log("요청 받은 데이터:", req.body);
        const { id, pw } = req.body;

        const user = await loginModel.getUserById(id);
        // console.log("조회된 유저 정보:", user);

        if (!user) {
            return res.json({ result: false, message: "존재하지 않는 사용자" });
        }
        if (user.pw !== pw) {
            return res.json({ result: false, message: "비밀번호 오류" });
        }

        // JWT 토큰 생성
        const token = jwt.sign({ id: user.id, name: user.name }, secretKey);
        // 쿠키에 JWT 저장
        res.cookie("token", token, { httpOnly: true });
        res.json({ result: true, message: "로그인 성공", token });

    } catch (error) {
        console.error("로그인 오류:", error);
        res.json({ result: false, message: "로그인 정보 올바르지 않음" });
    }
};

// 검증
const verifyUser = async (req, res, next) => {
    try {
        // 쿠키에서 JWT 가져오기
        const token = req.cookies.token; 

        if (!token) {
            return res.json({ result: false, message: "토큰없음" });
        }

        const decoded = jwt.verify(token, secretKey);
        const user = await loginModel.getUserById(decoded.id);

        if (!user) {
            return res.json({ result: false, message: "사용자를 찾을 수 없음" });
        }

        req.user = user;
        next(); // 추가한 미들웨어 실행

    } catch (error) {
        console.error("토큰 검증 오류:", error);
        return res.json({ result: false, message: "유효하지 않은 토큰" });
    }
};


module.exports = { loginUser, verifyUser };
