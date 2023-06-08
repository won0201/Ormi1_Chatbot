const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const chatContainer = document.getElementById("chat-container");
const chatList = document.getElementById("chat-list");

// openAI API
let url = `https://estsoft-openai-api.jejucodingcamp.workers.dev/`;

// 사용자의 질문
let question;

let data_function = [
  {
    role: "system",
    content:
      "assistant는 고민 상담에 능통한 따뜻한 성격과 상냥한 말투를 가진 전문가이다.",
  },
];

// 화면에 뿌려줄 데이터, 질문들
let questionData = [];
let data = [];

// input에 입력된 질문 받아오는 함수
chatInput.addEventListener("input", (e) => {
  question = e.target.value;
});

// 사용자의 질문을 객체로 만들어서 push
const sendQuestion = (question) => {
  if (question) {
    data.push({
      role: "user",
      content: question,
    });
  }
};

// 화면에 질문 그려주는 함수
const printQuestion = () => {
  if (questionData.length > 0) {
    let li = document.createElement("li");
    li.classList.add("question");
    li.innerText = questionData[questionData.length - 1].content;
    chatList.appendChild(li);
    questionData = [];
    question = false;
  }
};

// API 요청을 보내는 함수
const apiPost = async () => {
  const result = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    redirect: "follow",
  })
    .then((res) => res.json())
    .then((res) => {
      printAnswer(res.choices[0].message.content);
    })
    .catch((err) => {
      console.log(err);
    });
};

// 챗봇의 인사
const chatbotGreeting = "안녕하세요. 말씀해주세요.";

// 화면 로딩 시 챗봇의 인사를 출력
window.addEventListener("DOMContentLoaded", () => {
  printAnswer(chatbotGreeting);
});

// 화면에 답변을 그려주는 함수
const printAnswer = (answer) => {
  let li = document.createElement("li");
  li.classList.add("answer");
  li.innerText = answer;
  chatList.appendChild(li);
};

// 대화 추가 함수
function addChat(text, isQuestion) {
  const chatList = document.getElementById("chat-list");
  const chatItem = document.createElement("li");
  chatItem.classList.add(isQuestion ? "question" : "answer");
  chatItem.textContent = text;
  chatList.appendChild(chatItem);
}

// 채팅 폼 제출 이벤트 핸들러
document
  .getElementById("chat-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const input = document.getElementById("chat-input");
    const message = input.value.trim();
    if (message !== "") {
      addChat(message, true);
      input.value = "";
    }
  });

// Submit 이벤트 처리
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  chatInput.value = null;
  sendQuestion(question);
  apiPost();
  printQuestion();
});
