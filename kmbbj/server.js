const express = require('express');
// CORS 설정
const cors = require("cors");
const app = express();

const APP_FRONT_URL = process.env.REACT_APP_FRONT_URL;

const corsOptions ={
    origin: APP_FRONT_URL,
    credentials:true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionSuccessStatus:200,
}

app.use(cors(corsOptions));

const data = {
    message: "API 호출이 성공적으로 처리되었습니다.",
    status: "success"
};

app.get('/api', (req, res) => {
    // CORS 헤더 설정
    res.header("Access-Control-Allow-Origin", APP_FRONT_URL);
    res.header("Access-Control-Allow-Credentials", "true");
    
    // data를 응답으로 보냄
    res.send(data);
})

// 서버 실행
app.listen(5000, () => {
    console.log('서버가 포트 5000에서 실행 중입니다.');
});