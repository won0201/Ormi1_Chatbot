const $form_function = document.querySelector(".function");
const $comment = document.querySelector("#comment");

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
