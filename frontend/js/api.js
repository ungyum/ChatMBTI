const api = {
  // post 보내는 함수
  postChat: async function (userInput, chatHistory, mbti) {
    const response = await fetch(
      "https://3pba7ji2tzwavco7qbpmvvpmbm0ztzxs.lambda-url.ap-northeast-2.on.aws/api",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "userInput": userInput, // property에 콤마 없어지면 minify 할때 에러남: pretter 설정에서 quote props: preserve로 바꿔주면 됨
          "chatHistory": chatHistory,
          "mbtiRaw": mbti,
        }),
      }
    );
    const data = await response.json();
    if (data.error) {
      throw new Error("Error in api.postChat");
    }
    return data.content; // 실제 챗
  },
};
