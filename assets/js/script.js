//-------------------------------------------------------------
// Inserir ano atual

document.addEventListener("DOMContentLoaded", function () {
  let anoAtual = new Date().getFullYear();
  document.querySelector("#ano").textContent = anoAtual;
});

//-------------------------------------------------------------
// Animação máquina digitadora

document.addEventListener("DOMContentLoaded", () => {
  new TypeIt(".paragrafo_animated", {
    speed: 200,
    // strings: ["Web", "Front-End"],
    loop: true,
  })
    .type("Web", { delay: 800 })
    .delete(3)
    .type("Front-End", { delay: 500 })
    .go();
});

//-------------------------------------------------------------
// Animação de titulos

document.addEventListener("DOMContentLoaded", function () {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  });

  const fadeElements = document.querySelectorAll(".fade-in");
  fadeElements.forEach((element) => {
    observer.observe(element);
  });
});

//------------------------------------------------------------
//

document.addEventListener("DOMContentLoaded", function () {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("a-bomb");
      }
    });
  });

  const fadeElementsLeft = document.querySelectorAll(".heyleft");
  fadeElementsLeft.forEach((element) => {
    observer.observe(element);
  });

  const fadeElementsRight = document.querySelectorAll(".heyright");
  fadeElementsRight.forEach((element) => {
    observer.observe(element);
  });
});

//-------------------------------------------------------------
//

gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".tools__custom__card").forEach((card) => {
  gsap.fromTo(
    card,
    { opacity: 0, y: 100 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      scrollTrigger: {
        trigger: card,
        start: "top 80%",
        end: "+=100",
        scrub: true,
      },
    }
  );
});
