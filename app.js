const express = require("express");

const app = express();
const port = 3000;

app.use(express.json()); // JSON 형식의 데이터를 받기 위해 추가
app.use(express.urlencoded({ extended: true })); // form 데이터 받기 위해 추가

// 라우팅 처리
const indexRouter = require('./routes/indexRoutes');
app.use('/visitor', indexRouter);

// 미들웨어
app.set("view engine", "ejs");
app.set("views", "./views");

// 기본 홈 라우트
app.get("/", (req, res) => {
    res.render("index", {title: "mvc패턴과 mysql 연습"});
});

// 서버연결
app.listen(port, () => {
    console.log(`서버 실행 ${port}`);
});