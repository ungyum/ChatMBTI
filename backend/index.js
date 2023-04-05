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
const apiCall = async (userInput, chatHistory) => {
  const messages = [
    { role: "system", content: "You are acting as my friend" },
    // { role: "user", content: process.env.PROMPT_TEST },
    // { role: "assistant", content: "준비됐어!" },
    // { role: "user", content: "너 이름이 뭐야?" },
    // { role: "assistant", content: "나는 제임스야 ㅋㅋㅋ" },
  ];
  for (let i = 0; i < chatHistory.length; i++) {
    messages.push(chatHistory[i]);
  }
  messages.push({ role: "user", content: userInput });
  console.log(messages); // 이거는 지워도 됨
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    max_tokens: 5, // test 테스트용
    messages: messages,
  });
  console.log(completion.data.choices[0].message); // 이거는 지워도 됨
  return completion.data.choices[0].message["content"];
};

// post 받기
app.post("/api", async (req, res) => {
  const { userInput, chatHistory } = req.body;
  const chat = await apiCall(userInput, chatHistory);
  res.json({ content: chat });
});

// 서버 열기
app.listen(4000, () => {
  console.log(`Server listening at http://localhost:4000`);
});
