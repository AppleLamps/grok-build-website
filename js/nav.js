export function initNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
    nav.classList.toggle("is-open", !expanded);
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      toggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      toggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
    }
  });
}

export function initScrollReveal() {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const elements = document.querySelectorAll(".reveal");

  if (prefersReduced) {
    elements.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  elements.forEach((el) => observer.observe(el));
}

/**
 * Section index: highlights the rail link whose section currently sits
 * closest to one-third from the top of the viewport, and adds a dark-mode
 * class when that section is the dark architecture band.
 */
export function initSectionIndex() {
  const rail = document.querySelector(".section-index");
  if (!rail) return;

  const items = Array.from(rail.querySelectorAll(".section-index__item"));
  if (!items.length) return;

  const sections = items
    .map((item) => {
      const id = item.dataset.indexFor;
      const node = id ? document.getElementById(id) : null;
      return node ? { item, node, isDark: node.classList.contains("is-dark") } : null;
    })
    .filter(Boolean);

  if (!sections.length) return;

  let ticking = false;

  const update = () => {
    ticking = false;
    const anchor = window.innerHeight * 0.33;
    let active = sections[0];

    for (const section of sections) {
      const top = section.node.getBoundingClientRect().top;
      if (top - anchor <= 0) active = section;
    }

    for (const section of sections) {
      section.item.classList.toggle("is-active", section === active);
    }

    rail.classList.toggle("is-on-dark", Boolean(active.isDark));
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };

  rail.setAttribute("aria-hidden", "false");
  update();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
}
