// 환경변수, express
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();

// CORS
const cors = require("cors");
// let corsOptions = {
//   origin: "http://localhost:3000",
//   methods: ["POST"],
//   allowedHeaders: ["Content-Type"],
//   credentials: true,
// };
app.use(cors()); // 나중에 corsOPtions 넣어주기

// post 받기
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 서버 열기
app.listen(3000, () => {
  console.log(`Server listening at http://localhost:3000`);
});
