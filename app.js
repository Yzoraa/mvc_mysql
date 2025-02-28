const express = require("express");
const cookieParser = require("cookie-parser");
const loginMiddleware = require("./middleware/loginMiddleware");

const app = express();
const port = 3000;

const loginRouter = require("./routes/loginRoutes");

app.use(cookieParser("")); // 서명된 쿠키 사용
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', loginRouter);


app.set("view engine", "ejs");
app.set("views", "./views");

// 홈 라우트 - 쿠키 값 확인 후 팝업 표시 여부 결정
// app.get("/", (req, res) => {
//     const hidePopup = req.signedCookies.hidePopup || false; // 쿠키 값 확인
//     res.render("main", { hidePopup }); // EJS에 hidePopup 값 전달
// });

// JWT 로그인 연습
app.get("/", (req, res) =>{
    res.render("index");
})
app.get("/login", (req, res) => {
    res.render("login");
});
app.get("/loginFinish", loginMiddleware, async (req, res) => {
    console.log("데이터 있나", req.user);
    res.render("loginFinish", { user: req.user });
});


// 팝업 차단 쿠키 설정 (체크 후 닫기 버튼을 누르면 실행됨)
// app.post("/set-cookie", (req, res) => {
//     const { hidePopup } = req.body;

//     if (hidePopup === "true") {
//         res.cookie("hidePopup", true, {
//             maxAge: 24 * 60 * 60 * 1000, // 1일 유지
//             httpOnly: true,
//             signed: true,
//         });
//     }

//     res.send({ success: true });
// });

// 서버 실행
app.listen(port, () => {
    console.log(`서버 실행 ${port}`);
});
