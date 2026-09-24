// =========================
// SMARTLEARN - TOÁN
// =========================

// Lấy dữ liệu đã lưu
let knowledge = JSON.parse(
    localStorage.getItem("knowledge")
) || {};


// Nếu chưa có dữ liệu Toán
if (!knowledge["Toán"]) {

    knowledge["Toán"] = {
        "Cấp số cộng": 50,
        "Cấp số nhân": 50,
        "Hàm số": 50,
        "Giới hạn": 50
    };
}


// Nếu có Toán nhưng thiếu chủ đề
if (!knowledge["Toán"]["Cấp số cộng"]) {
    knowledge["Toán"]["Cấp số cộng"] = 50;
}

if (!knowledge["Toán"]["Cấp số nhân"]) {
    knowledge["Toán"]["Cấp số nhân"] = 50;
}


// Xác định bài hiện tại
const path = window.location.pathname;

let currentTopic = "Cấp số cộng";

if (path.includes("cap-so-nhan")) {
    currentTopic = "Cấp số nhân";
}

else if (path.includes("ham-so")) {
    currentTopic = "Hàm số";
}

else if (path.includes("gioi-han")) {
    currentTopic = "Giới hạn";
}


// Hiển thị tiến trình
function showProgress() {

    const score =
        knowledge["Toán"][currentTopic];

    document.getElementById(
        "topicProgress"
    ).textContent = score + "%";

    document.getElementById(
        "progressFill"
    ).style.width = score + "%";
}


// Kiểm tra bài tập
function checkAnswer() {

    const input =
        document.getElementById("answerInput");

    const result =
        document.getElementById("exerciseResult");

    const answer = Number(input.value);


    // Đáp án của từng bài
    let correctAnswer;

    if (currentTopic === "Cấp số cộng") {
        correctAnswer = 45;
    }

    else if (currentTopic === "Cấp số nhân") {
        correctAnswer = 45;
    }

    else if (currentTopic === "Hàm số") {
        correctAnswer = 14;
    }

    else if (currentTopic === "Giới hạn") {
        correctAnswer = 6;
    }


    // Kiểm tra
    if (answer === correctAnswer) {

        result.textContent =
            "✅ Chính xác!";

        knowledge["Toán"][currentTopic] += 10;

    } else {

        result.textContent =
            "❌ Chưa đúng! Hãy kiểm tra lại.";

        knowledge["Toán"][currentTopic] -= 10;
    }


    // Giới hạn 0 → 100
    if (
        knowledge["Toán"][currentTopic] > 100
    ) {
        knowledge["Toán"][currentTopic] = 100;
    }

    if (
        knowledge["Toán"][currentTopic] < 0
    ) {
        knowledge["Toán"][currentTopic] = 0;
    }


    // Lưu dữ liệu
    localStorage.setItem(
        "knowledge",
        JSON.stringify(knowledge)
    );


    // Cập nhật giao diện
    showProgress();
}


// Hiển thị khi mở trang
showProgress();