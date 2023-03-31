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

// openAI
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// openAI API request
const apiCall = async () => {
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: "Hello world" }],
  });
  console.log(completion.data.choices[0].message); // 이거는 지워도 됨
  return completion.data.choices[0].message;
};

// 서버 열기
app.listen(4000, () => {
  console.log(`Server listening at http://localhost:4000`);
});
