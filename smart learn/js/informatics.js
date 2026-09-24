// =========================
// SMARTLEARN - TIN HỌC
// =========================

// Lấy dữ liệu đã lưu
let knowledge = JSON.parse(
    localStorage.getItem("knowledge")
) || {};


// Tạo dữ liệu Tin học nếu chưa có
if (!knowledge["Tin học"]) {

    knowledge["Tin học"] = {
        "Python cơ bản": 50,
        "Mảng": 50,
        "Chuỗi": 50,
        "Prefix Sum": 50,
        "Two Pointers": 50,
        "Binary Search": 50
    };
}

if (knowledge["Tin học"]["Mảng"] === undefined) {
    knowledge["Tin học"]["Mảng"] = 50;
}

if (knowledge["Tin học"]["Chuỗi"] === undefined) {
    knowledge["Tin học"]["Chuỗi"] = 50;
}

if (knowledge["Tin học"]["Prefix Sum"] === undefined) {
    knowledge["Tin học"]["Prefix Sum"] = 50;
}

if (knowledge["Tin học"]["Two Pointers"] === undefined) {
    knowledge["Tin học"]["Two Pointers"] = 50;
}

if (knowledge["Tin học"]["Binary Search"] === undefined) {
    knowledge["Tin học"]["Binary Search"] = 50;
}


// Xác định chủ đề hiện tại
const path = window.location.pathname;

let currentTopic = "Python cơ bản";

if (path.includes("mang")) {
    currentTopic = "Mảng";
}

else if (path.includes("chuoi")) {
    currentTopic = "Chuỗi";
}

else if (path.includes("prefix-sum")) {
    currentTopic = "Prefix Sum";
}

else if (path.includes("two-pointers")) {
    currentTopic = "Two Pointers";
}

else if (path.includes("binary-search")) {
    currentTopic = "Binary Search";
}


// Hiển thị tiến trình
function showProgress() {

    const score =
        knowledge["Tin học"][currentTopic];

    document.getElementById(
        "topicProgress"
    ).textContent = score + "%";

    document.getElementById(
        "progressFill"
    ).style.width = score + "%";
}


// Kiểm tra câu Python
function checkPythonAnswer(answer) {

    const result =
        document.getElementById("pythonResult");

    if (answer === "print") {

        result.textContent =
            "✅ Chính xác!";

        knowledge["Tin học"]["Python cơ bản"] += 10;

    } else {

        result.textContent =
            "❌ Chưa đúng! Hãy xem lại phần trên.";

        knowledge["Tin học"]["Python cơ bản"] -= 10;
    }


    // Giới hạn 0 → 100
    if (
        knowledge["Tin học"]["Python cơ bản"] > 100
    ) {
        knowledge["Tin học"]["Python cơ bản"] = 100;
    }

    if (
        knowledge["Tin học"]["Python cơ bản"] < 0
    ) {
        knowledge["Tin học"]["Python cơ bản"] = 0;
    }


    // Lưu
    localStorage.setItem(
        "knowledge",
        JSON.stringify(knowledge)
    );


    showProgress();
}


// Kiểm tra bài tập Mảng
function checkArrayAnswer() {

    const input =
        document.getElementById("answerInput");

    const result =
        document.getElementById("exerciseResult");

    const answer = Number(input.value);

    // 3 + 6 + 2 + 8 + 5 = 24
    const correctAnswer = 24;

    if (answer === correctAnswer) {

        result.textContent =
            "✅ Chính xác!";

        knowledge["Tin học"]["Mảng"] += 10;

    } else {

        result.textContent =
            "❌ Chưa đúng! Hãy tính lại tổng.";

        knowledge["Tin học"]["Mảng"] -= 10;
    }

    // Giới hạn 0 → 100
    if (knowledge["Tin học"]["Mảng"] > 100) {
        knowledge["Tin học"]["Mảng"] = 100;
    }

    if (knowledge["Tin học"]["Mảng"] < 0) {
        knowledge["Tin học"]["Mảng"] = 0;
    }

    // Lưu dữ liệu
    localStorage.setItem(
        "knowledge",
        JSON.stringify(knowledge)
    );

    showProgress();
}


function checkStringAnswer() {

    const input =
        document.getElementById("answerInput");

    const result =
        document.getElementById("exerciseResult");

    const answer = Number(input.value);

    // "programming" có 2 ký tự m
    const correctAnswer = 2;

    if (answer === correctAnswer) {

        result.textContent =
            "✅ Chính xác!";

        knowledge["Tin học"]["Chuỗi"] += 10;

    } else {

        result.textContent =
            "❌ Chưa đúng! Hãy đếm lại.";

        knowledge["Tin học"]["Chuỗi"] -= 10;
    }

    // Giới hạn 0 → 100
    if (knowledge["Tin học"]["Chuỗi"] > 100) {
        knowledge["Tin học"]["Chuỗi"] = 100;
    }

    if (knowledge["Tin học"]["Chuỗi"] < 0) {
        knowledge["Tin học"]["Chuỗi"] = 0;
    }

    localStorage.setItem(
        "knowledge",
        JSON.stringify(knowledge)
    );

    showProgress();
}


// Kiểm tra bài Prefix Sum
function checkPrefixAnswer() {

    const input =
        document.getElementById("answerInput");

    const result =
        document.getElementById("exerciseResult");

    const answer = Number(input.value);

    // 5 + 2 + 7 = 14
    const correctAnswer = 14;

    if (answer === correctAnswer) {

        result.textContent =
            "✅ Chính xác! Bạn đã hiểu Prefix Sum.";

        knowledge["Tin học"]["Prefix Sum"] += 10;

    } else {

        result.textContent =
            "❌ Chưa đúng! Hãy tính lại đoạn [2, 4].";

        knowledge["Tin học"]["Prefix Sum"] -= 10;
    }

    // Giới hạn 0 → 100
    if (
        knowledge["Tin học"]["Prefix Sum"] > 100
    ) {
        knowledge["Tin học"]["Prefix Sum"] = 100;
    }

    if (
        knowledge["Tin học"]["Prefix Sum"] < 0
    ) {
        knowledge["Tin học"]["Prefix Sum"] = 0;
    }

    // Lưu dữ liệu
    localStorage.setItem(
        "knowledge",
        JSON.stringify(knowledge)
    );

    // Cập nhật giao diện
    showProgress();
}


// Kiểm tra bài Two Pointers
function checkTwoPointersAnswer() {

    const input =
        document.getElementById("answerInput");

    const result =
        document.getElementById("exerciseResult");

    // Tách hai số người dùng nhập
    const values = input.value.trim().split(/\s+/);

    if (values.length !== 2) {

        result.textContent =
            "⚠️ Hãy nhập đúng 2 số.";

        return;
    }

    const a = Number(values[0]);
    const b = Number(values[1]);

    // Hai cặp đúng là 3 + 9 và 5 + 7
    const correct =
        (a === 3 && b === 9) ||
        (a === 9 && b === 3) ||
        (a === 5 && b === 7) ||
        (a === 7 && b === 5);

    if (correct) {

        result.textContent =
            "✅ Chính xác!";

        knowledge["Tin học"]["Two Pointers"] += 10;

    } else {

        result.textContent =
            "❌ Chưa đúng! Hãy tìm lại hai số có tổng bằng 12.";

        knowledge["Tin học"]["Two Pointers"] -= 10;
    }

    // Giới hạn 0 → 100
    if (
        knowledge["Tin học"]["Two Pointers"] > 100
    ) {
        knowledge["Tin học"]["Two Pointers"] = 100;
    }

    if (
        knowledge["Tin học"]["Two Pointers"] < 0
    ) {
        knowledge["Tin học"]["Two Pointers"] = 0;
    }

    // Lưu
    localStorage.setItem(
        "knowledge",
        JSON.stringify(knowledge)
    );

    showProgress();
}


// Kiểm tra bài Binary Search
function checkBinaryAnswer() {

    const input =
        document.getElementById("answerInput");

    const result =
        document.getElementById("exerciseResult");

    const answer = Number(input.value);

    // [2, 4, 6, 8, 10, 12, 14]
    // 10 nằm ở index 4
    const correctAnswer = 4;

    if (answer === correctAnswer) {

        result.textContent =
            "✅ Chính xác!";

        knowledge["Tin học"]["Binary Search"] += 10;

    } else {

        result.textContent =
            "❌ Chưa đúng! Hãy nhớ index bắt đầu từ 0.";

        knowledge["Tin học"]["Binary Search"] -= 10;
    }

    // Giới hạn 0 → 100
    if (
        knowledge["Tin học"]["Binary Search"] > 100
    ) {
        knowledge["Tin học"]["Binary Search"] = 100;
    }

    if (
        knowledge["Tin học"]["Binary Search"] < 0
    ) {
        knowledge["Tin học"]["Binary Search"] = 0;
    }

    localStorage.setItem(
        "knowledge",
        JSON.stringify(knowledge)
    );

    showProgress();
}


showProgress();
