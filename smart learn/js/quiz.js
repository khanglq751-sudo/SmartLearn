// =========================
// SMARTLEARN - QUIZ
// =========================

let history = JSON.parse(
    localStorage.getItem("history")
) || [];

const quizzes = [

    {
        subject: "Toán",
        topic: "Cấp số cộng",
        question: "Dãy 2, 5, 8, 11 có công sai bằng bao nhiêu?",
        options: ["2", "3", "4", "5"],
        answer: "3"
    },

    {
        subject: "Toán",
        topic: "Cấp số nhân",
        question: "Cấp số nhân 2, 4, 8 có công bội bằng bao nhiêu?",
        options: ["1", "2", "3", "4"],
        answer: "2"
    },

    {
        subject: "Tin học",
        topic: "Python cơ bản",
        question: "Lệnh nào dùng để in dữ liệu?",
        options: ["input()", "print()", "map()", "range()"],
        answer: "print()"
    },

    {
        subject: "Tin học",
        topic: "Prefix Sum",
        question: "Tổng đoạn [l, r] thường được tính bằng công thức nào?",
        options: [
            "prefix[r] + prefix[l - 1]",
            "prefix[r] - prefix[l - 1]",
            "prefix[l] - prefix[r]",
            "prefix[r] * prefix[l]"
        ],
        answer: "prefix[r] - prefix[l - 1]"
    },

    {
        subject: "Tin học",
        topic: "Binary Search",
        question: "Công thức tính mid thường là gì?",
        options: [
            "(left + right) / 2",
            "(left + right) // 2",
            "left + right",
            "right - left"
        ],
        answer: "(left + right) // 2"
    },

    {
        subject: "Tiếng Anh",
        topic: "Thì",
        question: "She ___ to school every day.",
        options: ["go", "goes", "going", "went"],
        answer: "goes"
    },

    {
        subject: "Tiếng Anh",
        topic: "Passive Voice",
        question: "The room ___ every day.",
        options: ["clean", "is cleaned", "cleaned", "cleaning"],
        answer: "is cleaned"
    }

];


let currentQuestion = 0;
let score = 0;
let answered = false;


const questionNumber =
    document.getElementById("questionNumber");

const quizQuestion =
    document.getElementById("quizQuestion");

const quizOptions =
    document.getElementById("quizOptions");

const quizResult =
    document.getElementById("quizResult");

const scoreElement =
    document.getElementById("score");

const quizSubject =
    document.getElementById("quizSubject");

const nextQuiz =
    document.getElementById("nextQuiz");


// =========================
// HIỂN THỊ CÂU HỎI
// =========================

function loadQuestion() {

    const quiz =
        quizzes[currentQuestion];

    answered = false;

    questionNumber.textContent =
        currentQuestion + 1;

    quizQuestion.textContent =
        quiz.question;

    quizSubject.textContent =
        "📚 " + quiz.subject;

    quizResult.textContent = "";

    quizOptions.innerHTML = "";


    quiz.options.forEach(function(option) {

        const button =
            document.createElement("button");

        button.className =
            "quiz-option";

        button.textContent =
            option;

        button.onclick = function() {
            checkAnswer(option);
        };

        quizOptions.appendChild(button);

    });
}


// =========================
// CHẤM ĐÁP ÁN
// =========================

function checkAnswer(selected) {

    if (answered) {
        return;
    }

    answered = true;

    const quiz =
        quizzes[currentQuestion];

    if (selected === quiz.answer) {

        score++;

        scoreElement.textContent =
            score;

        quizResult.textContent =
            "✅ Chính xác!";

    } else {

        quizResult.textContent =
            "❌ Sai! Đáp án đúng là: " +
            quiz.answer;
    }

    // Lấy dữ liệu kiến thức
    let knowledge = JSON.parse(
        localStorage.getItem("knowledge")
    ) || {};

    // Tạo môn nếu chưa có
    if (!knowledge[quiz.subject]) {
        knowledge[quiz.subject] = {};
    }

    if (knowledge[quiz.subject][quiz.topic] === undefined) {
        knowledge[quiz.subject][quiz.topic] = 50;
    }

    // Cập nhật kiến thức
    if (selected === quiz.answer) {

        knowledge[quiz.subject][quiz.topic] += 10;

    } else {

        knowledge[quiz.subject][quiz.topic] -= 10;
    }

    // Giới hạn 0 → 100
    if (knowledge[quiz.subject][quiz.topic] > 100) {
        knowledge[quiz.subject][quiz.topic] = 100;
    }

    if (knowledge[quiz.subject][quiz.topic] < 0) {
        knowledge[quiz.subject][quiz.topic] = 0;
    }

    // Lưu
    localStorage.setItem(
        "knowledge",
        JSON.stringify(knowledge)
    );

    history.push({
        subject: quiz.subject,
        topic: quiz.topic,
        correct: selected === quiz.answer,
        time: new Date().toLocaleString("vi-VN")
    });

    localStorage.setItem(
        "history",
        JSON.stringify(history)
    );

    document
        .querySelectorAll(".quiz-option")
        .forEach(function(button) {

            button.disabled = true;

        });
}


// =========================
// CÂU TIẾP
// =========================

nextQuiz.onclick = function() {

    currentQuestion++;


    if (currentQuestion >= quizzes.length) {

        quizQuestion.textContent =
            "🎉 Hoàn thành Quiz!";

        quizOptions.innerHTML = "";

        quizResult.textContent =
            "Bạn đạt " +
            score +
            "/" +
            quizzes.length +
            " câu đúng.";

        nextQuiz.textContent =
            "Làm lại";

        nextQuiz.onclick = function() {

            currentQuestion = 0;
            score = 0;

            scoreElement.textContent = "0";

            nextQuiz.textContent =
                "Câu tiếp theo →";

            nextQuiz.onclick =
                nextQuestion;

            loadQuestion();
        };

        return;
    }

    loadQuestion();
};


function nextQuestion() {

    currentQuestion++;

    if (currentQuestion >= quizzes.length) {
        currentQuestion = 0;
    }

    loadQuestion();
}


loadQuestion();