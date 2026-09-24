// =========================
// SMARTLEARN - FLASHCARD
// =========================

const flashcards = [

    {
        subject: "Toán",
        question: "Công thức số hạng tổng quát của cấp số cộng?",
        answer: "aₙ = a₁ + (n - 1)d"
    },

    {
        subject: "Toán",
        question: "Công thức tổng n số hạng đầu của cấp số cộng?",
        answer: "Sₙ = n(a₁ + aₙ) / 2"
    },

    {
        subject: "Tin học",
        question: "Công thức tổng đoạn [l, r] bằng Prefix Sum?",
        answer: "prefix[r] - prefix[l - 1]"
    },

    {
        subject: "Tin học",
        question: "Binary Search thường tính mid như thế nào?",
        answer: "mid = (left + right) // 2"
    },

    {
        subject: "Tiếng Anh",
        question: "Công thức Present Continuous?",
        answer: "S + am/is/are + V-ing"
    },

    {
        subject: "Tiếng Anh",
        question: "Câu bị động hiện tại đơn có dạng gì?",
        answer: "am/is/are + V3/ed"
    }

];


let currentCard = 0;


// DOM
const subject =
    document.getElementById("flashcardSubject");

const question =
    document.getElementById("flashcardQuestion");

const answer =
    document.getElementById("flashcardAnswer");

const showAnswer =
    document.getElementById("showFlashcardAnswer");

const rating =
    document.getElementById("flashcardRating");

const nextButton =
    document.getElementById("nextFlashcard");


// =========================
// HIỂN THỊ THẺ
// =========================

function loadFlashcard() {

    const card =
        flashcards[currentCard];

    subject.textContent =
        "📚 " + card.subject;

    question.textContent =
        card.question;

    answer.textContent =
        card.answer;

    answer.style.display =
        "none";

    rating.style.display =
        "none";

    showAnswer.style.display =
        "inline-block";

    showAnswer.textContent =
        "Xem đáp án";
}


// =========================
// XEM ĐÁP ÁN
// =========================

showAnswer.onclick = function() {

    answer.style.display =
        "block";

    rating.style.display =
        "block";

    showAnswer.textContent =
        "Đã xem đáp án";
};


// =========================
// ĐÁNH GIÁ
// =========================

document
    .querySelectorAll(".rating-btn")
    .forEach(function(button) {

        button.onclick = function() {

            const level =
                button.dataset.level;

            let history = JSON.parse(
                localStorage.getItem("history")
            ) || [];

            history.push({
                subject: flashcards[currentCard].subject,
                topic: "Flashcard",
                correct: level === "easy",
                time: new Date().toLocaleString("vi-VN")
            });

            localStorage.setItem(
                "history",
                JSON.stringify(history)
            );

            let flashcardProgress =
                JSON.parse(
                    localStorage.getItem(
                        "flashcardProgress"
                    )
                ) || {
                    forgot: 0,
                    hard: 0,
                    easy: 0
                };


            flashcardProgress[level]++;


            localStorage.setItem(
                "flashcardProgress",
                JSON.stringify(
                    flashcardProgress
                )
            );


            // Chuyển câu tiếp theo
            nextCard();
        };

    });


// =========================
// CÂU TIẾP
// =========================

function nextCard() {

    currentCard++;

    if (
        currentCard >= flashcards.length
    ) {

        currentCard = 0;

    }

    loadFlashcard();
}


nextButton.onclick =
    nextCard;


// Chạy
loadFlashcard();