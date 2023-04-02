let mbtiHistory; // mbti 값 기록해줄 변수

quizBtn.addEventListener("click", () => {
  mbtiHistory = [...mbti]; // 기록해주고
  // mbti 값 지워주고
  for (let i = 0; i < 4; i++) {
    mbti[i] = "?";
  }
  // 채팅창 지워주고
  chatInterface.innerHTML = "";
});
