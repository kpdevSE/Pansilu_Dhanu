// Birthday Wish Website JavaScript
// Interactive functionality for the romantic birthday message

class BirthdayWishApp {
  constructor() {
    this.modal = document.getElementById("modalOverlay");
    this.envelope = document.getElementById("envelope");
    this.closeBtn = document.getElementById("closeBtn");
    this.typewriterText = document.getElementById("typewriterText");
    this.confettiContainer = document.getElementById("confettiContainer");

    // Birthday message content
    this.message = `Happy Birthday, Danu! 🎉🎂✨

Today marks another year of your incredible journey, and I feel so blessed to be part of it! 🌟 You bring so much joy, laughter, and happiness into my life every single day. 😊💕

Your friendship is one of the most precious gifts I've ever received 🎁. You make every day feel brighter just by being you! ✨

As you celebrate another year of life, I want you to know that you are cherished beyond measure 💖. You deserve all the happiness 😄, success 🏆, and wonderful experiences that this new year will bring! 🌈

Thank you for being the amazing person you are 🙏. Thank you for every smile 😊, every laugh 😂, and every moment we've shared together 💫.

May this new year bring you endless joy 🎊, countless adventures 🌍, and all the love your beautiful heart can hold 💕. You are truly one of a kind 🌟, and I'm so grateful to have you in my life! 🙏✨

I regretfully apologize for asking you so late. 😅💕`;

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.startBackgroundAnimations();
  }

  setupEventListeners() {
    // Envelope click to open modal
    this.envelope.addEventListener("click", () => {
      this.openModal();
    });

    // Close modal events
    this.closeBtn.addEventListener("click", () => {
      this.closeModal();
    });

    // Close modal when clicking outside
    this.modal.addEventListener("click", (e) => {
      if (e.target === this.modal) {
        this.closeModal();
      }
    });

    // Close modal with Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.modal.classList.contains("active")) {
        this.closeModal();
      }
    });

    // Touch events for mobile
    this.envelope.addEventListener("touchstart", (e) => {
      e.preventDefault();
    });

    this.envelope.addEventListener("touchend", (e) => {
      e.preventDefault();
      this.openModal();
    });
  }

  openModal() {
    // Start envelope opening animation
    this.envelope.classList.add("opening");

    // Open modal after envelope animation
    setTimeout(() => {
      this.modal.classList.add("active");
      this.createConfetti();
      this.startTypewriter();
    }, 800); // Wait for envelope animation to complete

    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";
  }

  closeModal() {
    this.modal.classList.remove("active");
    this.typewriterText.textContent = "";

    // Reset envelope animation
    this.envelope.classList.remove("opening");

    // Restore body scroll
    document.body.style.overflow = "auto";
  }

  startTypewriter() {
    let index = 0;
    const speed = 30; // Typing speed in milliseconds

    const typeNextChar = () => {
      if (index < this.message.length) {
        this.typewriterText.textContent += this.message.charAt(index);
        index++;
        setTimeout(typeNextChar, speed);
      }
    };

    // Clear previous content and start typing
    this.typewriterText.textContent = "";
    setTimeout(typeNextChar, 500); // Small delay before starting
  }

  createConfetti() {
    const colors = ["#ff6b9d", "#ff8fab", "#e8b4b8", "#d4a5c7", "#f4d03f"];
    const confettiCount = 50;

    for (let i = 0; i < confettiCount; i++) {
      setTimeout(() => {
        const confetti = document.createElement("div");
        confetti.className = "confetti";
        confetti.style.left = Math.random() * 100 + "%";
        confetti.style.backgroundColor =
          colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 2 + "s";
        confetti.style.animationDuration = Math.random() * 2 + 2 + "s";

        this.confettiContainer.appendChild(confetti);

        // Remove confetti after animation
        setTimeout(() => {
          if (confetti.parentNode) {
            confetti.parentNode.removeChild(confetti);
          }
        }, 5000);
      }, i * 50);
    }
  }

  startBackgroundAnimations() {
    // Add some interactive sparkles on mouse move
    document.addEventListener("mousemove", (e) => {
      if (Math.random() > 0.95) {
        // 5% chance
        this.createSparkle(e.clientX, e.clientY);
      }
    });
  }

  createSparkle(x, y) {
    const sparkle = document.createElement("div");
    sparkle.style.position = "fixed";
    sparkle.style.left = x + "px";
    sparkle.style.top = y + "px";
    sparkle.style.width = "4px";
    sparkle.style.height = "4px";
    sparkle.style.background = "#f4d03f";
    sparkle.style.borderRadius = "50%";
    sparkle.style.pointerEvents = "none";
    sparkle.style.zIndex = "100";
    sparkle.style.animation = "sparkle 1s ease-out forwards";

    document.body.appendChild(sparkle);

    // Remove sparkle after animation
    setTimeout(() => {
      if (sparkle.parentNode) {
        sparkle.parentNode.removeChild(sparkle);
      }
    }, 1000);
  }
}

// Add sparkle animation to CSS dynamically
const sparkleStyle = document.createElement("style");
sparkleStyle.textContent = `
    @keyframes sparkle {
        0% {
            opacity: 1;
            transform: scale(0) rotate(0deg);
        }
        50% {
            opacity: 1;
            transform: scale(1) rotate(180deg);
        }
        100% {
            opacity: 0;
            transform: scale(0) rotate(360deg);
        }
    }
`;
document.head.appendChild(sparkleStyle);

// Initialize the app when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new BirthdayWishApp();
});

// Add some additional interactive features
document.addEventListener("DOMContentLoaded", () => {
  // Add floating animation to the envelope on hover
  const envelope = document.getElementById("envelope");

  envelope.addEventListener("mouseenter", () => {
    envelope.style.animation = "envelopeFloat 2s ease-in-out infinite";
  });

  envelope.addEventListener("mouseleave", () => {
    envelope.style.animation = "none";
  });
});

// Add envelope float animation
const envelopeFloatStyle = document.createElement("style");
envelopeFloatStyle.textContent = `
    @keyframes envelopeFloat {
        0%, 100% {
            transform: translateY(0px);
        }
        50% {
            transform: translateY(-10px);
        }
    }
`;
document.head.appendChild(envelopeFloatStyle);

// Performance optimization: Reduce animations on low-end devices
if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
  document.documentElement.style.setProperty("--animation-duration", "0.5s");
}

// Add loading state
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// Add loading animation CSS
const loadingStyle = document.createElement("style");
loadingStyle.textContent = `
    body:not(.loaded) .main-container {
        opacity: 0;
        transform: translateY(20px);
    }
    
    body.loaded .main-container {
        opacity: 1;
        transform: translateY(0);
        transition: opacity 0.5s ease, transform 0.5s ease;
    }
`;
document.head.appendChild(loadingStyle);
