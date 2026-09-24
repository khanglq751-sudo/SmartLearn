// =========================
// SMARTLEARN - TIẾN TRÌNH
// =========================

let knowledge = JSON.parse(
    localStorage.getItem("knowledge")
) || {};


// =========================
// DỮ LIỆU MẶC ĐỊNH
// =========================

if (!knowledge["Toán"]) {
    knowledge["Toán"] = {
        "Cấp số cộng": 50,
        "Cấp số nhân": 50,
        "Hàm số": 50,
        "Giới hạn": 50
    };
}

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

if (!knowledge["Tiếng Anh"]) {
    knowledge["Tiếng Anh"] = {
        "Từ vựng - School": 50,
        "Từ vựng - Technology": 50,
        "Thì trong tiếng Anh": 50,
        "Passive Voice": 50,
        "Conditional Sentences": 50,
        "Reading": 50
    };
}


// =========================
// TÍNH ĐIỂM TRUNG BÌNH
// =========================

function calculateSubjectProgress(subject) {

    const topics = knowledge[subject];

    if (!topics) {
        return 0;
    }

    const values = Object.values(topics);

    if (values.length === 0) {
        return 0;
    }

    const total = values.reduce(
        function(sum, value) {
            return sum + value;
        },
        0
    );

    return Math.round(
        total / values.length
    );
}


// =========================
// TÌM CHỦ ĐỀ YẾU NHẤT
// =========================

function findWeakestTopic() {

    let weakestSubject = "";
    let weakestTopic = "";
    let weakestScore = 101;

    for (let subject in knowledge) {

        for (let topic in knowledge[subject]) {

            const score =
                knowledge[subject][topic];

            if (score < weakestScore) {

                weakestScore = score;
                weakestSubject = subject;
                weakestTopic = topic;
            }
        }
    }

    return {
        subject: weakestSubject,
        topic: weakestTopic,
        score: weakestScore
    };
}


// =========================
// GỢI Ý ĐƯỜNG DẪN
// =========================

function getLessonLink(subject, topic) {

    if (subject === "Toán") {

        if (topic === "Cấp số cộng")
            return "math/cap-so-cong.html";

        if (topic === "Cấp số nhân")
            return "math/cap-so-nhan.html";

        if (topic === "Hàm số")
            return "math/ham-so.html";

        if (topic === "Giới hạn")
            return "math/gioi-han.html";
    }


    if (subject === "Tin học") {

        if (topic === "Python cơ bản")
            return "informatics/python-co-ban.html";

        if (topic === "Mảng")
            return "informatics/mang.html";

        if (topic === "Chuỗi")
            return "informatics/chuoi.html";

        if (topic === "Prefix Sum")
            return "informatics/prefix-sum.html";

        if (topic === "Two Pointers")
            return "informatics/two-pointers.html";

        if (topic === "Binary Search")
            return "informatics/binary-search.html";
    }


    if (subject === "Tiếng Anh") {

        if (topic === "Từ vựng - School")
            return "english/vocabulary-school.html";

        if (topic === "Từ vựng - Technology")
            return "english/vocabulary-technology.html";

        if (topic === "Thì trong tiếng Anh")
            return "english/tenses.html";

        if (topic === "Passive Voice")
            return "english/passive-voice.html";

        if (topic === "Conditional Sentences")
            return "english/conditionals.html";

        if (topic === "Reading")
            return "english/reading-basic.html";
    }

    return "";
}


// =========================
// HIỂN THỊ DASHBOARD
// =========================

function renderDashboard() {

    const math =
        calculateSubjectProgress("Toán");

    const informatics =
        calculateSubjectProgress("Tin học");

    const english =
        calculateSubjectProgress("Tiếng Anh");


    const mathText =
        document.getElementById("mathDashboard");

    const infoText =
        document.getElementById("informaticsDashboard");

    const englishText =
        document.getElementById("englishDashboard");


    if (mathText) {
        mathText.textContent = math + "%";
    }

    if (infoText) {
        infoText.textContent = informatics + "%";
    }

    if (englishText) {
        englishText.textContent = english + "%";
    }


    const mathBar =
        document.getElementById("mathBar");

    const infoBar =
        document.getElementById("informaticsBar");

    const englishBar =
        document.getElementById("englishBar");


    if (mathBar) {
        mathBar.style.width = math + "%";
    }

    if (infoBar) {
        infoBar.style.width = informatics + "%";
    }

    if (englishBar) {
        englishBar.style.width = english + "%";
    }


    // Chủ đề yếu nhất
    const weakest = findWeakestTopic();

    const weakTopic =
        document.getElementById("weakTopic");

    if (weakTopic && weakest.topic) {

        weakTopic.innerHTML =
            "⚠️ <b>" +
            weakest.topic +
            "</b> — " +
            weakest.score +
            "%<br>" +
            "<small>Môn: " +
            weakest.subject +
            "</small>";
    }


    // Gợi ý
    const suggestion =
        document.getElementById(
            "learningSuggestion"
        );

    if (suggestion && weakest.topic) {

        if (weakest.score < 50) {

            suggestion.textContent =
                "Bạn nên ưu tiên ôn lại " +
                weakest.topic +
                " vì tiến trình hiện tại đang dưới 50%.";

        } else {

            suggestion.textContent =
                "Các chủ đề của bạn đang ở mức khá tốt. " +
                "Hãy tiếp tục luyện tập để tăng độ chắc chắn.";
        }
    }


    // Nút học ngay
    const studyButton =
        document.getElementById("studyButton");

    if (studyButton && weakest.topic) {

        studyButton.onclick = function() {

            const link =
                getLessonLink(
                    weakest.subject,
                    weakest.topic
                );

            if (link) {
                window.location.href = link;
            }
        };
    }
}


// =========================
// PHẦN DÙNG CHO INDEX
// =========================

function showOverallProgress() {

    const math =
        calculateSubjectProgress("Toán");

    const informatics =
        calculateSubjectProgress("Tin học");

    const english =
        calculateSubjectProgress("Tiếng Anh");


    const overall =
        Math.round(
            (math + informatics + english) / 3
        );


    const overallProgress =
        document.getElementById(
            "overallProgress"
        );

    if (overallProgress) {
        overallProgress.textContent =
            overall + "%";
    }


    const mathProgress =
        document.getElementById(
            "mathProgress"
        );

    const infoProgress =
        document.getElementById(
            "informaticsProgress"
        );

    const englishProgress =
        document.getElementById(
            "englishProgress"
        );


    if (mathProgress) {
        mathProgress.textContent =
            math + "%";
    }

    if (infoProgress) {
        infoProgress.textContent =
            informatics + "%";
    }

    if (englishProgress) {
        englishProgress.textContent =
            english + "%";
    }
}


// =========================
// MỞ BẢNG TIẾN TRÌNH
// =========================

function toggleProgress() {

    const panel =
        document.getElementById(
            "progressPanel"
        );

    if (!panel) {
        return;
    }

    if (panel.style.display === "block") {

        panel.style.display = "none";

    } else {

        panel.style.display = "block";

        showOverallProgress();
    }
}


// Chạy
renderDashboard();
showOverallProgress();