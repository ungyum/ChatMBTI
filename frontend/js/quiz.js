quizBtn.addEventListener("click", () => {
  // 채팅창 지워주고
  chatInterface.innerHTML = "";
  // 챗스크린에 quiz 넣어주고
  chatScreen.classList.add("quiz");
  // mbti-btn 히든 지워주고
  mbtiBtnChat.classList.remove("hidden");
});
