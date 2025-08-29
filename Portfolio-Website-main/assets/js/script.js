document.addEventListener("DOMContentLoaded", () => {
  // -------------------------
  // 1️⃣ Preloader Fade-Out
  // -------------------------
  window.addEventListener("load", () => {
    const loader = document.getElementById("loader-wrapper");
    if (loader) {
      loader.style.transition = "opacity 0.8s ease";
      loader.style.opacity = "0";
      setTimeout(() => (loader.style.display = "none"), 800);
    }
  });

  // -------------------------
  // 2️⃣ Navbar Toggle
  // -------------------------
  const menu = document.querySelector("#menu");
  const navbar = document.querySelector(".navbar");

  if (menu && navbar) {
    menu.addEventListener("click", () => {
      menu.classList.toggle("fa-times");
      navbar.classList.toggle("nav-toggle");
    });

    window.addEventListener("scroll", () => {
      menu.classList.remove("fa-times");
      navbar.classList.remove("nav-toggle");
    });
  }

  // -------------------------
  // 3️⃣ Scroll-to-Top Button
  // -------------------------
  const scrollTopBtn = document.getElementById("scroll-top");
  if (scrollTopBtn) {
    window.addEventListener("scroll", () => {
      scrollTopBtn.classList.toggle("active", window.scrollY > 60);
    });
  }

  // -------------------------
  // 4️⃣ Smooth Scrolling
  // -------------------------
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.offsetTop, behavior: "smooth" });
      }
    });
  });

  // -------------------------
  // 5️⃣ Scroll Spy for Active Links
  // -------------------------
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".navbar ul li a");

  window.addEventListener("scroll", () => {
    const scrollPos = window.scrollY + 200;
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach((link) => link.classList.remove("active"));
        const activeLink = document.querySelector(
          `.navbar ul li a[href="#${sectionId}"]`
        );
        if (activeLink) activeLink.classList.add("active");
      }
    });
  });

  // -------------------------
  // 6️⃣ EmailJS Contact Form
  // -------------------------
  const contactForm = document.getElementById("contact-form");
  const emailInput = contactForm?.querySelector('input[name="email"]');

  if (contactForm) {
    // Initialize EmailJS
    emailjs.init("Ge3TsUQ6OFo6uCR2I");

    // Real-time email validation (lowercase only)
    if (emailInput) {
      emailInput.addEventListener("input", () => {
        emailInput.value = emailInput.value.toLowerCase();
        if (!emailInput.validity.valid) {
          emailInput.setCustomValidity("Please enter a valid lowercase email.");
        } else {
          emailInput.setCustomValidity("");
        }
      });
    }

    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const submitBtn = contactForm.querySelector("button[type='submit']");
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";

      if (emailInput) emailInput.value = emailInput.value.toLowerCase();

      emailjs
        .sendForm("contact_service", "template_contact", this)
        .then(() => {
          showMessage("✅ Your message has been sent successfully!", "success");
          contactForm.reset();
        })
        .catch(() => {
          showMessage("❌ Failed to send message. Please try again.", "error");
        })
        .finally(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = 'Submit <i class="fa fa-paper-plane"></i>';
        });
    });

    function showMessage(text, type) {
      const oldMsg = contactForm.querySelector(".form-message");
      if (oldMsg) oldMsg.remove();

      const msg = document.createElement("div");
      msg.className = `form-message ${type}`;
      msg.textContent = text;
      contactForm.appendChild(msg);

      setTimeout(() => msg.remove(), 10000);
    }
  }

  // -------------------------
  // 7️⃣ Dynamic Skills from JSON
  // -------------------------
  const skillsContainer = document.getElementById("skillsContainer");
  if (skillsContainer) {
    fetch("./skills.json")
      .then((res) => res.json())
      .then((skills) => {
        skills.forEach((skill, index) => {
          const div = document.createElement("div");
          div.className = "bar";
          div.innerHTML = `
            <div class="info">
              <img src="${skill.icon}" alt="${skill.name}" />
              <span>${skill.name}</span>
            </div>
          `;
          div.style.opacity = "0";
          div.style.transform = "translateY(30px)";
          div.style.transition = `all 0.6s ease ${index * 0.1}s`;

          skillsContainer.appendChild(div);

          setTimeout(() => {
            div.style.opacity = "1";
            div.style.transform = "translateY(0)";
          }, 100);
        });
      })
      .catch((err) => console.error("Error loading skills:", err));
  }

  // -------------------------
  // 8️⃣ Typed.js Animation
  // -------------------------
  if (document.querySelector(".typing-text")) {
    new Typed(".typing-text", {
      strings: [
        "frontend development",
        "backend development",
        "web designing",
        "web development",
      ],
      loop: true,
      typeSpeed: 40,
      backSpeed: 20,
      backDelay: 500,
    });
  }

  // -------------------------
  // 9️⃣ Vanilla Tilt
  // -------------------------
  VanillaTilt.init(document.querySelectorAll(".tilt"), { max: 15 });

  // -------------------------
  // 🔟 ScrollReveal Animations
  // -------------------------
  const srtop = ScrollReveal({
    origin: "top",
    distance: "80px",
    duration: 1000,
    reset: true,
  });

  srtop.reveal(".home .content h3, .home .content p, .home .content .btn", {
    delay: 200,
  });
  srtop.reveal(".home .image", { delay: 400 });
  srtop.reveal(".home .socials li", { interval: 200 });
  srtop.reveal(
    ".about .content h3, .about .content p, .about .content .box-container",
    { delay: 200 }
  );
  srtop.reveal(".skills .container .bar", { interval: 200 });
  srtop.reveal(".education .box, .work .box", { interval: 200 });
  srtop.reveal(".experience .timeline .container", { interval: 200 });
  srtop.reveal(".contact .container, .contact .form-group", { delay: 400 });

  // -------------------------
  // 1️⃣1️⃣ Page Visibility
  // -------------------------
  document.addEventListener("visibilitychange", function () {
    const favicon = document.getElementById("favicon");
    if (document.visibilityState === "visible") {
      document.title = "Portfolio | Karthik Chowdhary";
      favicon.href = "assets/images/favicon.png";
    } else {
      document.title = "Come Back To Portfolio!";
      favicon.href = "assets/images/favhand.png";
    }
  });

  // -------------------------
  // 1️⃣2️⃣ Disable DevTools
  // -------------------------
  document.addEventListener("keydown", function (e) {
    if (
      e.keyCode === 123 ||
      (e.ctrlKey &&
        e.shiftKey &&
        ["I", "C", "J"].includes(e.key.toUpperCase())) ||
      (e.ctrlKey && e.key.toUpperCase() === "U")
    ) {
      e.preventDefault();
      return false;
    }
  });
});

/* ===== Tawk.to Live Chat Integration ===== */
var Tawk_API = Tawk_API || {},
  Tawk_LoadStart = new Date();
(function () {
  var s1 = document.createElement("script"),
    s0 = document.getElementsByTagName("script")[0];
  s1.async = true;
  s1.src = "https://embed.tawk.to/60df10bf7f4b000ac03ab6a8/1f9jlirg6";
  s1.charset = "UTF-8";
  s1.setAttribute("crossorigin", "*");
  s0.parentNode.insertBefore(s1, s0);
})();
/* ===== End of Tawk.to Integration ===== */

/* ===== Google Analytics Integration ===== */
(function (i, s, o, g, r, a, m) {
  i["GoogleAnalyticsObject"] = r;
  (i[r] =
    i[r] ||
    function () {
      (i[r].q = i[r].q || []).push(arguments);
    }),
    (i[r].l = 1 * new Date());
  (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
  a.async = 1;
  a.src = g;
  m.parentNode.insertBefore(a, m);
})(
  window,
  document,
  "script",
  "https://www.google-analytics.com/analytics.js",
  "ga"
);

ga("create", "UA-XXXXXXXXX-X", "auto"); // Replace with your tracking ID
ga("send", "pageview");
/* ===== End of Google Analytics Integration ===== */

/* ===== Cookie Consent Banner ===== */
window.addEventListener("load", function () {
  if (
    !document.cookie
      .split("; ")
      .find((row) => row.startsWith("cookie_consent="))
  ) {
    const consentBanner = document.createElement("div");
    consentBanner.id = "cookie-consent-banner";
    consentBanner.innerHTML = `
      <div class="consent-content">
        <p>We use cookies to improve your experience on our site. By using our site, you accept our <a href="/privacy-policy" target="_blank">Privacy Policy</a>.</p>
        <button id="accept-cookies">Accept</button>
      </div>
    `;
    document.body.appendChild(consentBanner);

    document.getElementById("accept-cookies").onclick = function () {
      document.cookie =
        "cookie_consent=accepted; max-age=" + 60 * 60 * 24 * 30 + "; path=/"; // 30 days
      consentBanner.remove();
    };
  }
});
/* ===== End of Cookie Consent Banner ===== */

/* ===== Dark Mode Toggle ===== */
document.addEventListener("DOMContentLoaded", () => {
  const toggleSwitch = document.getElementById("dark-mode-toggle");
  const currentTheme =
    localStorage.getItem("theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light");

  if (currentTheme) {
    document.documentElement.setAttribute("data-theme", currentTheme);
    if (currentTheme === "dark") {
      toggleSwitch.checked = true;
    }
  }

  toggleSwitch.addEventListener("change", function () {
    if (this.checked) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  });
});
/* ===== End of Dark Mode Toggle ===== */
