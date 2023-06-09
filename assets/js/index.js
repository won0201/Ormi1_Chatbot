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
  {
    role: "system",
    content: "assistant는 특별한 요청이 없다면, 한국어로 대답해야한다.",
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
const printQuestion = (question) => {
  let li = document.createElement("li");
  li.classList.add("question");

  const questionContainer = document.createElement("div");
  questionContainer.classList.add("question-container");

  const userIcon = document.createElement("img");
  userIcon.classList.add("user-icon");
  userIcon.src = "./assets/img/user.png";
  userIcon.alt = "User";

  const questionText = document.createElement("div");
  questionText.classList.add("chat_content");
  questionText.textContent = question;

  questionContainer.appendChild(userIcon);
  questionContainer.appendChild(questionText);
  li.appendChild(questionContainer);
  chatList.appendChild(li);
};

// 화면에 로딩 표시를 보여주는 함수
const showLoadingIndicator = () => {
  const loadingIndicator = document.createElement("div");
  loadingIndicator.classList.add("loading-indicator");
  loadingIndicator.id = "loading-indicator";

  // loadingIndicator를 chatList의 맨 뒤에 추가
  chatList.appendChild(loadingIndicator);
};

// 화면에 로딩 표시를 숨기는 함수
const hideLoadingIndicator = () => {
  const loadingIndicator = document.getElementById("loading-indicator");
  if (loadingIndicator) {
    loadingIndicator.remove();
  }
};

// API 요청을 보내는 함수
const apiPost = async () => {
  showLoadingIndicator();

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      redirect: "follow",
    });

    if (response.ok) {
      const result = await response.json();
      return result.choices[0].message.content;
    } else {
      throw new Error("API 요청에 실패했습니다.");
    }
  } catch (error) {
    console.log(error);
  } finally {
    hideLoadingIndicator();
    data = [];
  }
};

// 챗봇의 인사
const chatbotGreeting = `안녕하세요. 반가워요.`;

// 화면 로딩 시 챗봇의 인사를 출력
window.addEventListener("DOMContentLoaded", () => {
  printAnswer(chatbotGreeting);
});

// 화면에 답변을 그려주는 함수
const printAnswer = (answer) => {
  let li = document.createElement("li");
  li.classList.add("answer");

  const answerContainer = document.createElement("div");
  answerContainer.classList.add("answer-container");

  const chatbotImage = document.createElement("img");
  chatbotImage.classList.add("chatbot-image");
  chatbotImage.src = "./assets/img/bot.png";
  chatbotImage.alt = "Chatbot";

  const answerText = document.createElement("div");
  answerText.classList.add("chat_content");
  answerText.textContent = answer;

  answerContainer.appendChild(chatbotImage);
  answerContainer.appendChild(answerText);
  li.appendChild(answerContainer);
  chatList.appendChild(li);

  hideLoadingIndicator();
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
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const input = document.getElementById("chat-input");
    const message = input.value.trim();
    if (message !== "") {
      input.value = "";
      sendQuestion(message);
      printQuestion(message);
      const answer = await apiPost();
      printAnswer(answer);
    }
  });

// Submit 이벤트 처리
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  chatInput.value = null;
  sendQuestion(question);
  apiPost();
});
