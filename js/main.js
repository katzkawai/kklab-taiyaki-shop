"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const html = document.documentElement;
  const langToggle = document.getElementById("langToggle");
  const langBtns = langToggle.querySelectorAll(".lang-toggle__btn");
  const hamburger = document.getElementById("hamburger");
  const nav = document.querySelector(".header__nav");
  const header = document.querySelector(".header");
  const fadeEls = document.querySelectorAll(".fade-in");

  /* ---- Language Toggle ---- */
  const switchLang = (lang) => {
    html.setAttribute("data-lang", lang);
    langBtns.forEach((btn) => {
      btn.classList.toggle("is-active", btn.dataset.lang === lang);
    });
    localStorage.setItem("taiyaki-lang", lang);
  };

  const savedLang = localStorage.getItem("taiyaki-lang");
  if (savedLang === "en" || savedLang === "ja") {
    switchLang(savedLang);
  }

  langToggle.addEventListener("click", () => {
    const current = html.getAttribute("data-lang");
    switchLang(current === "ja" ? "en" : "ja");
  });

  /* ---- Hamburger ---- */
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("is-open");
    nav.classList.toggle("is-open");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("is-open");
      nav.classList.remove("is-open");
    });
  });

  /* ---- Header scroll effect ---- */
  const onScroll = () => {
    header.classList.toggle("header--scrolled", window.scrollY > 20);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Fade-in animation ---- */
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    fadeEls.forEach((el) => observer.observe(el));
  } else {
    fadeEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---- Contact form ---- */
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const lang = html.getAttribute("data-lang");
      const msg =
        lang === "en"
          ? "Thank you for your inquiry. We will get back to you soon."
          : "お問い合わせいただきありがとうございます。\n後ほどご連絡いたします。";
      alert(msg);
      form.reset();
    });
  }

  /* ---- Smooth scroll for anchor links ---- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        e.preventDefault();
        const offset =
          target.getBoundingClientRect().top +
          window.scrollY -
          parseInt(getComputedStyle(document.documentElement).scrollPaddingTop || 0, 10) -
          70;
        window.scrollTo({ top: offset, behavior: "smooth" });
      }
    });
  });
});
