const express = require('express');
// CORS 설정
const cors=require("cors");
const app = express();

const corsOptions ={
    origin:'*',
    credentials:true,
    optionSuccessStatus:200,
}

app.use(cors(corsOptions))