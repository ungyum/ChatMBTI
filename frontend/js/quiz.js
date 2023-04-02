quizBtn.addEventListener("click", () => {
  // mbti 값 지워주고
  for (let i = 0; i < 4; i++) {
    mbti[i] = "?";
  }
  // 채팅창 지워주고
  chatInterface.innerHTML = "";
});
