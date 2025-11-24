// Starfield background
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
let stars = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    generateStars();
}

function generateStars() {
    const count = Math.floor((canvas.width + canvas.height) / 6);
    stars = Array.from({ length: count }, () => {
        const y = Math.random() * canvas.height;
        return {
            x: Math.random() * canvas.width,
            y,
            prevY: y,
            size: Math.random() * 1.3 + 0.2,
            velocity: Math.random() * 0.2 + 0.05
        };
    });
}

function animateStars() {
    ctx.fillStyle = 'rgba(4, 7, 20, 0.25)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    stars.forEach(star => {
        const headGradient = ctx.createRadialGradient(
            star.x,
            star.y,
            0,
            star.x,
            star.y,
            star.size * 2
        );
        headGradient.addColorStop(0, '#ffffff');
        headGradient.addColorStop(1, 'rgba(255,255,255,0)');

        ctx.strokeStyle = 'rgba(255,255,255,0.35)';
        ctx.lineWidth = Math.max(0.5, star.size * 0.9);
        ctx.beginPath();
        ctx.moveTo(star.x, star.prevY);
        ctx.lineTo(star.x, star.y);
        ctx.stroke();

        ctx.fillStyle = headGradient;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * 1.6, 0, Math.PI * 2);
        ctx.fill();

        star.prevY = star.y;
        star.y += star.velocity * 12;
        if (star.y > canvas.height) {
            star.y = 0;
            star.prevY = 0;
        }
    });
    requestAnimationFrame(animateStars);
}

resizeCanvas();
animateStars();
window.addEventListener('resize', resizeCanvas);

// Smooth nav highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => link.classList.toggle(
                'active',
                link.getAttribute('href').slice(1) === entry.target.id
            ));
        }
    });
}, { threshold: 0.5 });

sections.forEach(section => observer.observe(section));

// Scroll indicator
const scrollIndicator = document.querySelector('.scroll-indicator');
window.addEventListener('scroll', () => {
    const progress = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    scrollIndicator.style.transform = 'scaleX(' + progress + ')';
});

// Button actions
document.getElementById('contactBtn').addEventListener('click', () => {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('copyEmail').addEventListener('click', async () => {
    const email = 'muhammad.talha0415@gmail.com';
    try {
        await navigator.clipboard.writeText(email);
        alert('Email copied to clipboard!');
    } catch (err) {
        alert('Copy failed, please copy manually.');
    }
});

document.getElementById('year').textContent = new Date().getFullYear();

// Contact form feedback
document.getElementById('contactForm').addEventListener('submit', event => {
    event.preventDefault();
    event.target.reset();
    alert('Signal transmitted successfully!');
});

