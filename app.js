const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const port = 3000;
app.use(cookieParser("mySecretKey")); // 서명된 쿠키 사용

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", "./views");

// 홈 라우트 - 쿠키 값 확인 후 팝업 표시 여부 결정
app.get("/", (req, res) => {
    const hidePopup = req.signedCookies.hidePopup || false; // 쿠키 값 확인
    res.render("main", { hidePopup }); // EJS에 hidePopup 값 전달
});

// 팝업 차단 쿠키 설정 (체크 후 닫기 버튼을 누르면 실행됨)
app.post("/set-cookie", (req, res) => {
    const { hidePopup } = req.body;

    if (hidePopup === "true") {
        res.cookie("hidePopup", true, {
            maxAge: 24 * 60 * 60 * 1000, // 1일 유지
            httpOnly: true,
            signed: true,
        });
    }

    res.send({ success: true });
});

// 서버 실행
app.listen(port, () => {
    console.log(`서버 실행 ${port}`);
});
