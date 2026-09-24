// =========================
// SMARTLEARN - TIẾNG ANH
// =========================


// Lấy dữ liệu đã lưu
let knowledge = JSON.parse(
    localStorage.getItem("knowledge")
) || {};


// Tạo dữ liệu Tiếng Anh
if (!knowledge["Tiếng Anh"]) {

    knowledge["Tiếng Anh"] = {
        "Từ vựng": 50,
        "Thì trong tiếng Anh": 50,
        "Passive Voice": 50,
        "Conditional Sentences": 50,
        "Reading": 50
    };
}

if (
    knowledge["Tiếng Anh"]["Từ vựng - School"] === undefined
) {
    knowledge["Tiếng Anh"]["Từ vựng - School"] = 50;
}

if (
    knowledge["Tiếng Anh"]["Từ vựng - Technology"] === undefined
) {
    knowledge["Tiếng Anh"]["Từ vựng - Technology"] = 50;
}


// Bổ sung dữ liệu nếu localStorage đã tồn tại
const englishTopics = [
    "Từ vựng",
    "Thì trong tiếng Anh",
    "Passive Voice",
    "Conditional Sentences",
    "Reading"
];

englishTopics.forEach(function(topic) {

    if (
        knowledge["Tiếng Anh"][topic] === undefined
    ) {
        knowledge["Tiếng Anh"][topic] = 50;
    }

});

if (knowledge["Tiếng Anh"]["Conditional Sentences"] === undefined) {
    knowledge["Tiếng Anh"]["Conditional Sentences"] = 50;
}

if (knowledge["Tiếng Anh"]["Reading"] === undefined) {
    knowledge["Tiếng Anh"]["Reading"] = 50;
}


// Chủ đề hiện tại
const path = window.location.pathname;

let currentTopic = "Thì trong tiếng Anh";

if (path.includes("vocabulary-school")) {
    currentTopic = "Từ vựng - School";
}

else if (path.includes("vocabulary-technology")) {
    currentTopic = "Từ vựng - Technology";
}

else if (path.includes("passive-voice")) {
    currentTopic = "Passive Voice";
}

else if (path.includes("conditionals")) {
    currentTopic = "Conditional Sentences";
}

else if (path.includes("reading-basic")) {
    currentTopic = "Reading";
}

else if (path.includes("vocabulary")) {
    currentTopic = "Từ vựng";
}


// Hiển thị tiến trình
function showProgress() {

    const score =
        knowledge["Tiếng Anh"][currentTopic];

    document.getElementById(
        "topicProgress"
    ).textContent = score + "%";

    document.getElementById(
        "progressFill"
    ).style.width = score + "%";
}


// Kiểm tra bài thì
function checkTenseAnswer(answer) {

    const result =
        document.getElementById("exerciseResult");


    // Không cho trả lời nhiều lần
    if (result.dataset.answered === "true") {
        return;
    }

    result.dataset.answered = "true";


    if (answer === "continuous") {

        result.textContent =
            "✅ Chính xác! 'now' cho thấy hành động đang diễn ra.";

        knowledge["Tiếng Anh"]["Thì trong tiếng Anh"] += 10;

    } else {

        result.textContent =
            "❌ Chưa đúng! Hãy chú ý từ 'now'.";

        knowledge["Tiếng Anh"]["Thì trong tiếng Anh"] -= 10;
    }


    // Giới hạn 0 → 100
    if (
        knowledge["Tiếng Anh"]["Thì trong tiếng Anh"] > 100
    ) {
        knowledge["Tiếng Anh"]["Thì trong tiếng Anh"] = 100;
    }

    if (
        knowledge["Tiếng Anh"]["Thì trong tiếng Anh"] < 0
    ) {
        knowledge["Tiếng Anh"]["Thì trong tiếng Anh"] = 0;
    }


    // Lưu dữ liệu
    localStorage.setItem(
        "knowledge",
        JSON.stringify(knowledge)
    );


    // Cập nhật tiến trình
    showProgress();
}


// Kiểm tra bài Passive Voice
function checkPassiveAnswer(answer) {

    const result =
        document.getElementById("exerciseResult");

    // Không cho trả lời nhiều lần
    if (result.dataset.answered === "true") {
        return;
    }

    result.dataset.answered = "true";

    if (answer === "a") {

        result.textContent =
            "✅ Chính xác! Đây là câu bị động ở thì hiện tại đơn.";

        knowledge["Tiếng Anh"]["Passive Voice"] += 10;

    } else {

        result.textContent =
            "❌ Chưa đúng! Hãy nhớ: am/is/are + V3/ed.";

        knowledge["Tiếng Anh"]["Passive Voice"] -= 10;
    }

    // Giới hạn 0 → 100
    if (
        knowledge["Tiếng Anh"]["Passive Voice"] > 100
    ) {
        knowledge["Tiếng Anh"]["Passive Voice"] = 100;
    }

    if (
        knowledge["Tiếng Anh"]["Passive Voice"] < 0
    ) {
        knowledge["Tiếng Anh"]["Passive Voice"] = 0;
    }

    // Lưu
    localStorage.setItem(
        "knowledge",
        JSON.stringify(knowledge)
    );

    // Cập nhật
    showProgress();
}


// Kiểm tra câu điều kiện
function checkConditionalAnswer(answer) {

    const result =
        document.getElementById("exerciseResult");

    // Chỉ được trả lời một lần
    if (result.dataset.answered === "true") {
        return;
    }

    result.dataset.answered = "true";

    if (answer === "b") {

        result.textContent =
            "✅ Chính xác! Đây là câu điều kiện loại 1.";

        knowledge["Tiếng Anh"]["Conditional Sentences"] += 10;

    } else {

        result.textContent =
            "❌ Chưa đúng! Loại 1 dùng will + V ở mệnh đề chính.";

        knowledge["Tiếng Anh"]["Conditional Sentences"] -= 10;
    }

    // Giới hạn 0 → 100
    if (
        knowledge["Tiếng Anh"]["Conditional Sentences"] > 100
    ) {
        knowledge["Tiếng Anh"]["Conditional Sentences"] = 100;
    }

    if (
        knowledge["Tiếng Anh"]["Conditional Sentences"] < 0
    ) {
        knowledge["Tiếng Anh"]["Conditional Sentences"] = 0;
    }

    // Lưu dữ liệu
    localStorage.setItem(
        "knowledge",
        JSON.stringify(knowledge)
    );

    // Cập nhật tiến trình
    showProgress();
}


// Kiểm tra từ vựng School
function checkVocabularyAnswer(answer) {

    const result =
        document.getElementById("exerciseResult");

    // Chỉ được trả lời một lần
    if (result.dataset.answered === "true") {
        return;
    }

    result.dataset.answered = "true";

    if (answer === "b") {

        result.textContent =
            "✅ Chính xác! library = thư viện.";

        knowledge["Tiếng Anh"]["Từ vựng - School"] += 10;

    } else {

        result.textContent =
            "❌ Chưa đúng! library = thư viện.";

        knowledge["Tiếng Anh"]["Từ vựng - School"] -= 10;
    }

    // Giới hạn 0 → 100
    if (
        knowledge["Tiếng Anh"]["Từ vựng - School"] > 100
    ) {
        knowledge["Tiếng Anh"]["Từ vựng - School"] = 100;
    }

    if (
        knowledge["Tiếng Anh"]["Từ vựng - School"] < 0
    ) {
        knowledge["Tiếng Anh"]["Từ vựng - School"] = 0;
    }

    // Lưu dữ liệu
    localStorage.setItem(
        "knowledge",
        JSON.stringify(knowledge)
    );

    // Cập nhật tiến trình
    showProgress();
}


// Kiểm tra từ vựng Technology
function checkTechnologyAnswer(answer) {

    const result =
        document.getElementById("exerciseResult");

    // Chỉ được trả lời một lần
    if (result.dataset.answered === "true") {
        return;
    }

    result.dataset.answered = "true";

    if (answer === "b") {

        result.textContent =
            "✅ Chính xác! keyboard = bàn phím.";

        knowledge["Tiếng Anh"]["Từ vựng - Technology"] += 10;

    } else {

        result.textContent =
            "❌ Chưa đúng! keyboard = bàn phím.";

        knowledge["Tiếng Anh"]["Từ vựng - Technology"] -= 10;
    }

    // Giới hạn 0 → 100
    if (
        knowledge["Tiếng Anh"]["Từ vựng - Technology"] > 100
    ) {
        knowledge["Tiếng Anh"]["Từ vựng - Technology"] = 100;
    }

    if (
        knowledge["Tiếng Anh"]["Từ vựng - Technology"] < 0
    ) {
        knowledge["Tiếng Anh"]["Từ vựng - Technology"] = 0;
    }

    // Lưu dữ liệu
    localStorage.setItem(
        "knowledge",
        JSON.stringify(knowledge)
    );

    // Cập nhật giao diện
    showProgress();
}


// Kiểm tra câu Reading
function checkReadingAnswer(answer) {

    const result =
        document.getElementById("exerciseResult");

    // Chỉ được trả lời một lần
    if (result.dataset.answered === "true") {
        return;
    }

    result.dataset.answered = "true";

    if (answer === "a") {

        result.textContent =
            "✅ Chính xác! Anna likes English and computer science.";

        knowledge["Tiếng Anh"]["Reading"] += 10;

    } else {

        result.textContent =
            "❌ Chưa đúng! Hãy đọc lại đoạn văn đầu tiên.";

        knowledge["Tiếng Anh"]["Reading"] -= 10;
    }

    // Giới hạn 0 → 100
    if (knowledge["Tiếng Anh"]["Reading"] > 100) {
        knowledge["Tiếng Anh"]["Reading"] = 100;
    }

    if (knowledge["Tiếng Anh"]["Reading"] < 0) {
        knowledge["Tiếng Anh"]["Reading"] = 0;
    }

    // Lưu dữ liệu
    localStorage.setItem(
        "knowledge",
        JSON.stringify(knowledge)
    );

    // Cập nhật tiến trình
    showProgress();
}


// Hiển thị khi mở trang
showProgress();