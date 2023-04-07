const api = {
  // post 보내는 함수
  postChat: async function (userInput, chatHistory, mbti) {
    const response = await fetch("http://localhost:4000/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userInput: userInput,
        chatHistory: chatHistory,
        mbtiRaw: mbti,
      }),
    });
    const data = await response.json();
    if (data.error) {
      console.log("hello");
      throw new Error("Error in api.postChat");
    }
    return data.content; // 실제 챗
  },
};
