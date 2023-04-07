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
const apiCall = async (userInput, chatHistory, mbti) => {
  const messages = [
    // { role: "system", content: "You are acting as my friend" },
    // { role: "user", content: process.env.PROMPT_TEST },
    // { role: "assistant", content: "준비됐어!" },
    // { role: "user", content: "너 이름이 뭐야?" },
    // { role: "assistant", content: "나는 제임스야 ㅋㅋㅋ" },
    // { role: "assistant", content: "안녕, 요즘 어떻게 지내?" },
    { role: "user", content: `say: I'm ${mbti}` },
  ];
  // 히스토리 추가
  for (let i = 0; i < chatHistory.length; i++) {
    messages.push(chatHistory[i]);
  }
  // 히스토리 추가 후 유저 입력 추가
  messages.push({ role: "user", content: userInput });
  console.log(messages); // 이거는 지워도 됨
  // openAI API 요청
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    temperature: 0.7,
    max_tokens: 5, // test 테스트용
    messages: messages,
  });
  // 받아온거 출력
  console.log(completion.data.choices[0].message); // 이거는 지워도 됨
  return completion.data.choices[0].message["content"];
};

// 시작 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// 퀴즈로 숫자 왔을 때
const mbtiList = [
  // IS** ttff 순, jpjp 순
  "istj", //0000
  "istp", //0001
  "isfj", //0010
  "isfp", //0011
  // IN** ttff 순, jpjp 순
  "intj", //0100
  "intp", //0101
  "infj",
  "infp",
  // ES** ttff 순, jpjp 순
  "estj",
  "estp",
  "esfj",
  "esfp",
  // EN** ttff 순, jpjp 순
  "entj",
  "entp",
  "enfj",
  "enfp",
];

// post 받기
app.post("/api", async (req, res) => {
  const { userInput, chatHistory, mbtiRaw } = req.body;
  const mbti = mbtiRaw.length !== 4 ? mbtiList[mbtiRaw] : mbtiRaw; // 숫자로 왔을 때 mbti로 바꿔주기
  // apiCall이 error가 났을 때, 리턴하지 않고 apiCall(userInput, chatHistory, mbti)을 3번까지 다시 실행 후 그래도 error가 났을 때 에러를 리턴
  let error = false;
  let content;
  for (let i = 0; i < 3; i++) {
    try {
      content = await apiCall(userInput, chatHistory, mbti);
      break;
    } catch (err) {
      error = true;
    }
  }
  if (error) {
    return res.status(500).json({ error: "Error in apiCall" });
  } else {
    return res.json({ content: content });
  }
});

// 서버 열기
app.listen(4000, () => {
  console.log(`Server listening at http://localhost:4000`);
});
