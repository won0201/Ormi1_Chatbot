const $form = document.querySelector("#chat-form");
const $input = document.querySelector("input");
const $comment = document.querySelector("textarea#comment");
const $form_function = document.querySelector(".function");

// openAI API
let url = `https://estsoft-openai-api.jejucodingcamp.workers.dev/`;

// 사용자의 질문
let question;

let data_function = [
  {
    role: "system",
    content: "assistant는 댓글을 보고 별점을 부여하는 전문가이다.",
  },
  {
    role: "user",
    content:
      "댓글이 주어질 것이다. 댓글의 뉘앙스와 정보를 보고, 다른 정보 없이 댓글에 별점을 부과해야한다. 추가 질문을 할 수 없다.",
  },
  {
    role: "system",
    content: "임의적으로 판단해서 부여해야한다. 별점은 0~5점 사이이다.",
  },
  {
    role: "system",
    content:
      "별점은 정수로만 표현할 수 있다. 0점, 1점, 2점, 3점, 4점, 5점 이렇게 6가지로 가능하며 정 어려운 경우 0.5점, 1.5점, 2.5점, 3.5점, 4.5점까지는 표현 가능하다.",
  },
  {
    role: "system",
    content: '답변 형식 : {"별점" : {"$점"}, "이유" : "이유작성"}',
  },
  {
    role: "user",
    content: "모든 형식에 맞는지 다시한번 점검해줘",
  },
];

// 화면에 뿌려줄 데이터, 질문들
let questionData = [];
let data = []; // 수정: data 변수 추가

// input에 입력된 질문 받아오는 함수
$input.addEventListener("input", (e) => {
  question = e.target.value;
  comment = question;
});

// 사용자의 질문을 객체를 만들어서 push
const sendQuestion = (question) => {
  if (question) {
    data.push({
      role: "user",
      content: question,
    });
    questionData.push({
      role: "user",
      content: question,
    });
  }
};

// 화면에 질문 그려주는 함수
const printQuestion = async () => {
  if (question) {
    let li = document.createElement("li");
    li.classList.add("question");
    questionData.map((el) => {
      li.innerText = el.content;
    });
    $chatList.appendChild(li);
    questionData = [];
    question = false;
  }
};

// 화면에 답변 그려주는 함수
const printAnswer = (answer) => {
  let li = document.createElement("li");
  li.classList.add("answer");
  li.innerText = answer;
  $chatList.appendChild(li);
};

// api 요청보내는 함수
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

// submit
$form.addEventListener("submit", (e) => {
  e.preventDefault();
  $input.value = null;
  sendQuestion(question);
  apiPost();
  printQuestion();
});
