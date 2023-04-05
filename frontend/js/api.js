const api = {
  // post 보내는 함수
  postChat: async function (userInput, chatHistory) {
    const response = await fetch("http://localhost:4000/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userInput: userInput, chatHistory: chatHistory }),
    });
    const data = await response.json();
    return data.content; // 실제 챗
  },
};
