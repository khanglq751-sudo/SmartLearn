// =======================================
// SMARTLEARN - SMART TUTOR V2
// =======================================

let lastTopic = "";


// =======================================
// TẠO KHUNG CHAT
// =======================================

function createChatBox() {

    if (document.getElementById("chatBox")) {
        return;
    }

    const chatBox = document.createElement("div");

    chatBox.id = "chatBox";
    chatBox.className = "chat-box";

    chatBox.innerHTML = `
        <div class="chat-header">

            <div>
                🤖 <b>SmartLearn Assistant</b>
            </div>

            <button id="closeChat">✕</button>

        </div>


        <div class="chat-messages"
             id="chatMessages">

            <div class="bot-message">
                👋 Chào bạn! Mình là trợ lý SmartLearn.
                Mình có thể giải thích bài, phân tích tiến trình
                và gợi ý bạn nên học gì tiếp theo.
            </div>

        </div>


        <div class="quick-chat">

            <button data-question="Tôi đang yếu phần nào?">
                📊 Tiến trình
            </button>

            <button data-question="Tôi nên học gì tiếp?">
                📚 Học tiếp
            </button>

            <button data-question="Prefix Sum là gì?">
                ➕ Prefix Sum
            </button>

            <button data-question="Binary Search là gì?">
                🔎 Binary Search
            </button>

        </div>

        <div class="chat-input">

            <input
                id="chatInput"
                type="text"
                placeholder="Hỏi SmartLearn..."
            >

            <button id="sendChat">
                Gửi
            </button>

        </div>
    `;

    document.body.appendChild(chatBox);


    // Nút hỏi nhanh
    document
        .querySelectorAll(".quick-chat button")
        .forEach(function(button) {

            button.addEventListener("click", function() {

                const question =
                    button.dataset.question;

                document.getElementById("chatInput")
                    .value = question;

                sendMessage();

            });

        });
}


// =======================================
// MỞ / ĐÓNG
// =======================================

function toggleChat() {

    createChatBox();

    const chatBox =
        document.getElementById("chatBox");

    if (chatBox.classList.contains("open")) {

        chatBox.style.display = "none";
        chatBox.classList.remove("open");

    } else {

        chatBox.style.display = "flex";
        chatBox.classList.add("open");

        document.getElementById("chatInput").focus();
    }
}


// =======================================
// GỬI TIN NHẮN
// =======================================

function sendMessage() {

    const input =
        document.getElementById("chatInput");

    const messages =
        document.getElementById("chatMessages");

    if (!input || !messages) {
        return;
    }

    const message =
        input.value.trim();

    if (message === "") {
        return;
    }


    // Người dùng
    addMessage(
        message,
        "user-message"
    );

    input.value = "";


    // Đang suy nghĩ
    const thinking =
        document.createElement("div");

    thinking.className =
        "bot-message";

    thinking.textContent =
        "🤔 Đang phân tích...";

    messages.appendChild(thinking);

    messages.scrollTop =
        messages.scrollHeight;


    setTimeout(function() {

        thinking.textContent =
            getSmartResponse(message);

        messages.scrollTop =
            messages.scrollHeight;

    }, 350);
}


// =======================================
// THÊM TIN NHẮN
// =======================================

function addMessage(text, className) {

    const messages =
        document.getElementById("chatMessages");

    const message =
        document.createElement("div");

    message.className =
        className;

    message.textContent =
        text;

    messages.appendChild(message);

    messages.scrollTop =
        messages.scrollHeight;
}


// =======================================
// LẤY KNOWLEDGE
// =======================================

function getKnowledge() {

    return JSON.parse(
        localStorage.getItem("knowledge")
    ) || {};
}


// =======================================
// TÌM CHỦ ĐỀ YẾU NHẤT
// =======================================

function getWeakestTopic() {

    const knowledge =
        getKnowledge();

    let result = {
        subject: "",
        topic: "",
        score: 101
    };


    for (const subject in knowledge) {

        for (const topic in knowledge[subject]) {

            const score =
                Number(
                    knowledge[subject][topic]
                );


            if (score < result.score) {

                result = {
                    subject: subject,
                    topic: topic,
                    score: score
                };

            }
        }
    }

    return result;
}


// =======================================
// TÌM TIẾN TRÌNH MÔN
// =======================================

function getSubjectProgress(subject) {

    const knowledge =
        getKnowledge();

    if (!knowledge[subject]) {
        return 0;
    }

    const values =
        Object.values(
            knowledge[subject]
        );

    if (values.length === 0) {
        return 0;
    }

    const total =
        values.reduce(
            function(sum, value) {
                return sum + Number(value);
            },
            0
        );

    return Math.round(
        total / values.length
    );
}


// =======================================
// SMART RESPONSE
// =======================================

function getSmartResponse(message) {

    const text =
        message
            .toLowerCase()
            .trim();


    // -------------------------------
    // CHÀO HỎI
    // -------------------------------

    if (
        text === "hi" ||
        text === "hello" ||
        text.includes("xin chào") ||
        text.includes("chào bạn")
    ) {

        return (
            "👋 Chào bạn! " +
            "Bạn có thể hỏi mình bài nào đang khó, " +
            "chủ đề nào đang yếu hoặc hỏi trực tiếp kiến thức."
        );
    }


    // -------------------------------
    // HỌC GÌ TIẾP
    // -------------------------------

    if (
        text.includes("học gì tiếp") ||
        text.includes("nên học gì") ||
        text.includes("học bài nào") ||
        text.includes("tiếp theo")
    ) {

        const weak =
            getWeakestTopic();

        if (weak.topic !== "") {

            lastTopic =
                weak.topic;

            return (
                "🎯 Mình đề xuất bạn học " +
                weak.topic +
                " của môn " +
                weak.subject +
                " trước.\n\n" +
                "Tiến trình hiện tại: " +
                weak.score +
                "%."
            );
        }

        return "📚 Chưa có đủ dữ liệu để đề xuất.";
    }


    // -------------------------------
    // TIẾN TRÌNH
    // -------------------------------

    if (
        text.includes("tiến trình") ||
        text.includes("tiến độ") ||
        text.includes("kết quả") ||
        text.includes("điểm của tôi") ||
        text.includes("tôi yếu")
    ) {

        const weak =
            getWeakestTopic();


        const math =
            getSubjectProgress("Toán");

        const info =
            getSubjectProgress("Tin học");

        const english =
            getSubjectProgress("Tiếng Anh");


        if (weak.topic !== "") {

            return (
                "📊 Tiến trình hiện tại:\n\n" +
                "📐 Toán: " + math + "%\n" +
                "💻 Tin học: " + info + "%\n" +
                "🇬🇧 Tiếng Anh: " + english + "%\n\n" +
                "🔎 Chủ đề thấp nhất: " +
                weak.topic +
                " (" +
                weak.score +
                "%)"
            );
        }

        return "📊 Chưa có dữ liệu học tập.";
    }


    // ===================================
    // PREFIX SUM
    // ===================================

    if (
        text.includes("prefix sum") ||
        text.includes("prefixsum") ||
        text.includes("mảng cộng dồn")
    ) {

        lastTopic =
            "Prefix Sum";

        if (
            text.includes("công thức") ||
            text.includes("tính tổng")
        ) {

            return (
                "➕ Công thức Prefix Sum:\n\n" +
                "sum(l, r) = prefix[r] - prefix[l - 1]\n\n" +
                "Ví dụ: tổng đoạn [2, 4]\n" +
                "→ prefix[4] - prefix[1]."
            );
        }

        return (
            "➕ Prefix Sum là kỹ thuật tạo mảng " +
            "cộng dồn để tính tổng một đoạn nhanh.\n\n" +
            "Công thức quan trọng:\n" +
            "prefix[r] - prefix[l - 1]"
        );
    }


    // ===================================
    // TWO POINTERS
    // ===================================

    if (
        text.includes("two pointers") ||
        text.includes("two pointer") ||
        text.includes("hai con trỏ")
    ) {

        lastTopic =
            "Two Pointers";

        return (
            "👉 Two Pointers thường dùng hai vị trí " +
            "left và right.\n\n" +
            "Ví dụ tìm hai số có tổng bằng K:\n\n" +
            "Nếu tổng < K → left++\n" +
            "Nếu tổng > K → right--\n" +
            "Nếu tổng = K → tìm thấy."
        );
    }


    // ===================================
    // BINARY SEARCH
    // ===================================

    if (
        text.includes("binary search") ||
        text.includes("binarysearch") ||
        text.includes("tìm kiếm nhị phân")
    ) {

        lastTopic =
            "Binary Search";

        return (
            "🔎 Binary Search chia đôi phạm vi tìm kiếm.\n\n" +
            "mid = (left + right) // 2\n\n" +
            "a[mid] < x → tìm bên phải\n" +
            "a[mid] > x → tìm bên trái\n" +
            "a[mid] == x → tìm thấy."
        );
    }


    // ===================================
    // MID
    // ===================================

    if (
        text.includes("mid là gì") ||
        text.includes("mid là") ||
        text.includes("mid?")
    ) {

        lastTopic =
            "Binary Search";

        return (
            "🔎 mid là vị trí ở giữa left và right.\n\n" +
            "Ta thường tính:\n" +
            "mid = (left + right) // 2"
        );
    }


    // ===================================
    // CHECK
    // ===================================

    if (
        text.includes("check(mid)") ||
        text.includes("check mid") ||
        text.includes("hàm check")
    ) {

        lastTopic =
            "Binary Search";

        return (
            "🧠 Trong Binary Search trên đáp án, " +
            "check(mid) dùng để kiểm tra xem mid " +
            "có thỏa điều kiện hay không.\n\n" +
            "Nếu check(mid) đúng → có thể tìm về một phía.\n" +
            "Nếu sai → tìm phía còn lại."
        );
    }


    // ===================================
    // MẢNG
    // ===================================

    if (
        text.includes("mảng là gì") ||
        text.includes("list là gì") ||
        text.includes("mảng python")
    ) {

        lastTopic =
            "Mảng";

        return (
            "📦 Trong Python, list thường được dùng " +
            "để lưu nhiều phần tử.\n\n" +
            "Ví dụ:\n" +
            "a = [2, 4, 6, 8]\n\n" +
            "Phần tử đầu tiên có index 0."
        );
    }


    // ===================================
    // CHUỖI
    // ===================================

    if (
        text.includes("chuỗi là gì") ||
        text.includes("string là gì")
    ) {

        lastTopic =
            "Chuỗi";

        return (
            "🔤 Chuỗi là dãy ký tự.\n\n" +
            'Ví dụ: s = "Python"\n\n' +
            "s[0] là 'P' và len(s) là độ dài chuỗi."
        );
    }


    // ===================================
    // PYTHON
    // ===================================

    if (
        text.includes("python") ||
        text.includes("lập trình python")
    ) {

        lastTopic =
            "Python cơ bản";

        return (
            "🐍 Python cơ bản nên học theo thứ tự:\n\n" +
            "1. Biến\n" +
            "2. input() / print()\n" +
            "3. if / else\n" +
            "4. for / while\n" +
            "5. list\n" +
            "6. hàm"
        );
    }


    // ===================================
    // CẤP SỐ CỘNG
    // ===================================

    if (
        text.includes("cấp số cộng") ||
        text.includes("csc")
    ) {

        lastTopic =
            "Cấp số cộng";

        return (
            "📈 Cấp số cộng có công sai d.\n\n" +
            "Số hạng tổng quát:\n" +
            "aₙ = a₁ + (n - 1)d\n\n" +
            "Tổng:\n" +
            "Sₙ = n(a₁ + aₙ) / 2"
        );
    }


    // ===================================
    // CẤP SỐ NHÂN
    // ===================================

    if (
        text.includes("cấp số nhân") ||
        text.includes("csn")
    ) {

        lastTopic =
            "Cấp số nhân";

        return (
            "📊 Cấp số nhân có công bội q.\n\n" +
            "uₙ = u₁ × qⁿ⁻¹"
        );
    }


    // ===================================
    // HÀM SỐ
    // ===================================

    if (
        text.includes("hàm số là gì") ||
        text.includes("hàm số")
    ) {

        lastTopic =
            "Hàm số";

        return (
            "📉 Hàm số là quy tắc tương ứng mỗi giá trị " +
            "của x với một giá trị duy nhất của y.\n\n" +
            "Ví dụ: f(x) = 2x + 1."
        );
    }


    // ===================================
    // GIỚI HẠN
    // ===================================

    if (
        text.includes("giới hạn là gì") ||
        text.includes("giới hạn")
    ) {

        lastTopic =
            "Giới hạn";

        return (
            "∞ Giới hạn mô tả giá trị mà biểu thức " +
            "tiến tới khi biến tiến tới một giá trị nào đó."
        );
    }


    // ===================================
    // TIẾNG ANH
    // ===================================

    if (
        text.includes("tiếng anh") ||
        text.includes("english")
    ) {

        return (
            "🇬🇧 SmartLearn có:\n\n" +
            "📚 Từ vựng\n" +
            "🧠 Ngữ pháp\n" +
            "📖 Reading"
        );
    }


    // ===================================
    // THÌ
    // ===================================

    if (
        text.includes("thì hiện tại") ||
        text.includes("present simple") ||
        text.includes("present continuous") ||
        text.includes("tenses")
    ) {

        lastTopic =
            "Thì trong tiếng Anh";

        return (
            "⏰ Một số thì cơ bản:\n\n" +
            "Present Simple → thói quen, sự thật.\n" +
            "Present Continuous → đang xảy ra.\n" +
            "Past Simple → đã xảy ra.\n" +
            "Future Simple → sẽ xảy ra."
        );
    }


    // ===================================
    // PASSIVE
    // ===================================

    if (
        text.includes("passive voice") ||
        text.includes("bị động")
    ) {

        lastTopic =
            "Passive Voice";

        return (
            "🔄 Passive Voice thường có dạng:\n\n" +
            "S + be + V3/ed\n\n" +
            "Ví dụ:\n" +
            "The room is cleaned every day."
        );
    }


    // ===================================
    // CONDITIONAL
    // ===================================

    if (
        text.includes("câu điều kiện") ||
        text.includes("conditional")
    ) {

        lastTopic =
            "Conditional Sentences";

        return (
            "🔀 Câu điều kiện loại 1:\n" +
            "If + hiện tại đơn, will + V\n\n" +
            "Ví dụ:\n" +
            "If I study hard, I will pass."
        );
    }


    // ===================================
    // KHÔNG HIỂU
    // ===================================

    if (lastTopic !== "") {

        return (
            "🤔 Mình chưa hiểu chính xác câu hỏi.\n\n" +
            "Bạn đang học " +
            lastTopic +
            ", nên thử hỏi cụ thể hơn, ví dụ:\n" +
            "• Công thức là gì?\n" +
            "• Cho mình ví dụ.\n" +
            "• Giải thích dễ hiểu hơn."
        );
    }


    return (
        "🤖 Mình chưa hiểu câu hỏi.\n\n" +
        "Bạn có thể hỏi:\n" +
        "• Tôi đang yếu phần nào?\n" +
        "• Tôi nên học gì tiếp?\n" +
        "• Prefix Sum là gì?\n" +
        "• Binary Search là gì?\n" +
        "• Giải thích Passive Voice."
    );
}


// =======================================
// SỰ KIỆN
// =======================================

document.addEventListener(
    "click",
    function(event) {

        if (
            event.target.closest(".floating-chat")
        ) {

            event.preventDefault();

            const button =
                event.target.closest(".floating-chat");

            if (!button.hasAttribute("onclick")) {
                toggleChat();
            }

            return;
        }

        if (
            event.target.closest("#sendChat")
        ) {

            sendMessage();

            return;
        }

        if (
            event.target.closest("#closeChat")
        ) {

            const chatBox =
                document.getElementById("chatBox");

            if (chatBox) {
                chatBox.style.display = "none";
                chatBox.classList.remove("open");
            }
        }

    }
);


// Enter
document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Enter" &&
            event.target.id === "chatInput"
        ) {

            sendMessage();

        }

    }
);


// =======================================
// KHỞI ĐỘNG
// =======================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        createChatBox();

    }
);