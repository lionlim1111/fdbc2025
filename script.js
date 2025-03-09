const card = document.getElementById('card');
const quiz = document.getElementById('quiz');
const surprise = document.getElementById('surprise');
const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
const birthdaySong = document.getElementById('birthday-song');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let confetti = [];
const confettiCount = 150;

// Flip card on click and show quiz
card.addEventListener('click', () => {
    card.classList.toggle('flipped');
    if (card.classList.contains('flipped')) {
        startConfetti();
        setTimeout(() => {
            quiz.style.display = 'block';
        }, 1000);
    } else {
        quiz.style.display = 'none';
    }
});

// Confetti effect
function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
}

function createConfetti() {
    for (let i = 0; i < confettiCount; i++) {
        confetti.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            r: randomInRange(5, 15),
            d: randomInRange(0.1, 0.5),
            color: `hsl(${Math.random() * 360}, 100%, 50%)`,
            tilt: randomInRange(-10, 10),
            tiltAngle: 0,
            shape: Math.random() > 0.5 ? 'circle' : 'square'
        });
    }
}

function drawConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confetti.forEach((c, i) => {
        c.y += c.d;
        c.tiltAngle += 0.1;
        ctx.beginPath();
        if (c.shape === 'circle') {
            ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
        } else {
            ctx.rect(c.x - c.r, c.y - c.r, c.r * 2, c.r * 2);
        }
        ctx.fillStyle = c.color;
        ctx.fill();

        if (c.y > canvas.height) confetti.splice(i, 1);
    });

    if (confetti.length > 0) requestAnimationFrame(drawConfetti);
}

function startConfetti() {
    confetti = [];
    createConfetti();
    drawConfetti();
}

// Quiz logic with surprise page
function checkAnswer(answer) {
    if (answer === 'mitochondria') {
        alert('Correct! 🎉 Mitochondria is the powerhouse of the cell!');
        quiz.style.display = 'none';
        card.style.display = 'none';
        startConfetti();
        setTimeout(() => {
            surprise.style.display = 'flex';
            birthdaySong.play().catch(() => {
                console.log('Audio playback was blocked. User interaction may be required.');
            });
        }, 500);
    } else {
        alert('Oops! Try again.');
    }
}

// Resize canvas if window size changes
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});