// เปลี่ยนหน้า
function goToSurprisePage() {
    window.location.href = "surprise.html";
}

function goToGamePage() {
    window.location.href = "game.html";
}

// เล่นเพลงพื้นหลัง
function playMusic() {
    let music = document.getElementById("backgroundMusic");
    if (music.paused) {
        music.play();
        localStorage.setItem("musicStatus", "playing");
    }
}

// 🎈 ลูกโป่งและหัวใจลอยขึ้น 🎈
function createFloatingElement() {
    const element = document.createElement("img");
    const isBalloon = Math.random() > 0.5;

    element.src = isBalloon 
        ? "https://cdn-icons-png.flaticon.com/512/1511/1511321.png" 
        : "https://cdn-icons-png.flaticon.com/512/833/833472.png";

    element.classList.add("floating");

    // กำหนดตำแหน่งเริ่มทางซ้ายแบบเต็มหน้าจอ
    element.style.left = Math.random() * window.innerWidth + "px";

    // สุ่มขนาดให้ดูหลากหลาย
    const size = Math.random() * 20 + 30; // ขนาด 30–50px
    element.style.width = size + "px";

    // ความเร็วลอยขึ้นแบบสุ่ม
    element.style.animationDuration = (Math.random() * 3 + 3) + "s";

    document.body.appendChild(element);

    // เอาออกหลังจบ animation
    setTimeout(() => element.remove(), 7000);
}

// สร้างลูกโป่งและหัวใจลอยทุกๆ 500 มิลลิวินาที
setInterval(createFloatingElement, 500);

// เก็บสถานะเพลงใน LocalStorage
document.addEventListener("DOMContentLoaded", function () {
    let music = document.getElementById("backgroundMusic");
    if (localStorage.getItem("musicStatus") === "playing") {
        music.play();
    }
});

const questions = [
    {
        question: "เราชอบสีอะไร?",
        answers: ["แดง", "น้ำเงิน", "เขียว"],
        correctAnswer: 1
    },
    {
        question: "เราชอบอาหารอะไร?",
        answers: ["พิซซ่า", "ข้าวผัด", "สเต็ก"],
        correctAnswer: 0
    },
    {
        question: "เราชอบเที่ยวไหน?",
        answers: ["ภูเขา", "ทะเล", "เมือง"],
        correctAnswer: 1
    }
];

let currentQuestion = 0;

function displayQuestion() {
    if (currentQuestion < questions.length) {
        const q = questions[currentQuestion];
        document.getElementById("question").textContent = q.question;
        const buttons = document.querySelectorAll(".answer");
        buttons.forEach((button, index) => {
            button.textContent = q.answers[index];
        });
    } else {
        displayGift();
    }
}

function checkAnswer(answerIndex) {
    const correct = questions[currentQuestion].correctAnswer;
    if (answerIndex === correct) {
        // ใช้ SweetAlert2 แทน alert
        Swal.fire({
            icon: 'success',
            title: 'ตอบถูก!',
            text: 'คุณตอบคำถามได้ถูกต้อง!',
        }).then(() => {
            currentQuestion++;
            displayQuestion();
        });
    } else {
        // ใช้ SweetAlert2 แทน alert
        Swal.fire({
            icon: 'error',
            title: 'ตอบผิด!',
            text: 'ลองใหม่อีกครั้ง',
        });
    }
}

function displayGift() {
    const giftMessages = [
        "ของขวัญที่คุณได้รับคือ: ทริปสุดพิเศษ!",
        "ของขวัญที่คุณได้รับคือ: แกดเจ็ตใหม่สุดล้ำ!",
        "ของขวัญที่คุณได้รับคือ: การ์ดอวยพรจากเพื่อน!"
    ];
    const randomGift = giftMessages[Math.floor(Math.random() * giftMessages.length)];

    // ใช้ SweetAlert2 แทนการแสดงของขวัญ
    Swal.fire({
        icon: 'success',
        title: 'ขอแสดงความยินดี!',
        text: randomGift,
    });
}

displayQuestion();

function playMusic() {
    document.getElementById("videoContainer").style.display = "block";
    player.playVideo(); // สั่งให้เล่นวิดีโอ
}

// สร้าง IntersectionObserver เพื่อทำงานเมื่อมีการเลื่อนผ่าน
const observeText = document.querySelectorAll('.container h1'); // ค้นหาข้อความ h1 ทุกอัน

const options = {
    root: null, // การตรวจสอบจาก viewport
    rootMargin: '0px', // ขอบเขตสำหรับการตรวจจับ
    threshold: 0.5 // เริ่มทำงานเมื่อ 50% ของข้อความแสดงใน viewport
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) { // เมื่อข้อความเริ่มแสดง
            entry.target.classList.add('fade-in'); // เพิ่ม class สำหรับการอนิเมชั่น
            observer.unobserve(entry.target); // หยุดการสังเกตการณ์หลังจากข้อความแสดงแล้ว
        }
    });
}, options);

// สังเกตข้อความทั้งหมดที่ต้องการ
observeText.forEach(text => {
    observer.observe(text);
});

document.addEventListener("DOMContentLoaded", function () {
    const fadeElements = document.querySelectorAll(".fade-in");

    function fadeInOnScroll() {
        fadeElements.forEach((el) => {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            if (rect.top < windowHeight * 0.8) {
                el.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", fadeInOnScroll);
    fadeInOnScroll(); // เรียกทันที
});

document.addEventListener("DOMContentLoaded", function () {
    const fadeElements = document.querySelectorAll(".fade-in");

    function fadeInOnScroll() {
        fadeElements.forEach((el) => {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            if (rect.top < windowHeight * 0.8) {
                el.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", fadeInOnScroll);
    fadeInOnScroll(); // เรียกทันที

    // เปลี่ยนรูปภาพอัตโนมัติ
    const images = ['p/2.jpg', 'p/4.jpg', 'p/7.jpg']; 
    let currentImageIndex = 0;
    const imageElement = document.getElementById("birthdayImage");

    function changeImage() {
        imageElement.classList.add("image-fade"); // เริ่มจางออก
        setTimeout(() => {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            imageElement.src = images[currentImageIndex];
            imageElement.classList.remove("image-fade"); // ทำให้กลับมาชัด
        }, 1000);
    }

    setInterval(changeImage, 3000); // เปลี่ยนรูปทุก 3 วินาที
});

// function showHBD(imageElement) {
//     // หาสถานที่แสดงข้อความ HBD ที่ตรงกลางภาพ
//     const hbdMessage = document.getElementById("hbd-message");

//     // แสดงข้อความ HBD
//     hbdMessage.innerHTML = "HBD! 🎉";
//     hbdMessage.style.display = "block";
    
//     // หาตำแหน่งของภาพที่คลิก
//     const rect = imageElement.getBoundingClientRect();
//     hbdMessage.style.top = (rect.top + rect.height / 2) + "px"; // ตั้งตำแหน่ง Y
//     hbdMessage.style.left = (rect.left + rect.width / 2) + "px"; // ตั้งตำแหน่ง X

//     // ซ่อนข้อความ HBD หลังจาก 2 วินาที
//     setTimeout(() => {
//         hbdMessage.style.display = "none";
//     }, 2000);
// }

