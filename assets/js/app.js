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

// document.addEventListener("DOMContentLoaded", function() {

//   var sectionPadding = parseFloat(getComputedStyle(document.querySelector('section')).paddingLeft);
//   var xOffset = sectionPadding - 50; // Define o deslocamento horizontal (x)

//   gsap.timeline()
//     .to(".section_about", { duration: 1, opacity: 1 })
//     .fromTo(".about_image", { x: 0, opacity: 0 }, { duration: 2, x: -xOffset, opacity: 1 }, "-=0.5")
//     .fromTo(".about_texts", { x: 0, opacity: 0 }, { duration: 2, x: xOffset, opacity: 1 }, "-=1");
// });

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

// ------------------------------------------------------------
// 



//-------------------------------------------------------------
// Criação de desenhos na página header

// Seleciona o elemento canvas e define seu contexto 2D
const canvas = document.getElementById("canva"); // Obtém o elemento canvas do HTML pelo ID
const ctx = canvas.getContext("2d"); // Define o contexto 2D para desenho no canvas
canvas.width = window.innerWidth; // Define a largura do canvas igual à largura da janela
canvas.height = window.innerHeight; // Define a altura do canvas igual à altura da janela

// Array para armazenar as partículas (círculos)
let particlesArray;

// Array para armazenar as estrelas da galáxia
let galaxiesArray;

// Objeto para armazenar a posição atual do mouse
const mouse = {
  x: null, // Posição X inicialmente nula
  y: null, // Posição Y inicialmente nula
  radius: (canvas.height / 80) * (canvas.width / 80), // Define o raio de interação do mouse baseado nas dimensões do canvas
};

// Evento para atualizar a posição do mouse
window.addEventListener("mousemove", function (event) {
  mouse.x = event.x; // Atualiza a posição X do mouse com base no evento de movimento
  mouse.y = event.y; // Atualiza a posição Y do mouse com base no evento de movimento
});

// Evento para ajustar o tamanho do canvas quando a janela é redimensionada
window.addEventListener("resize", function () {
  canvas.width = window.innerWidth; // Atualiza a largura do canvas com a largura da janela
  canvas.height = window.innerHeight; // Atualiza a altura do canvas com a altura da janela
  init(); // Recria as partículas e estrelas para ajustar ao novo tamanho
});

// Classe para definir as partículas (círculos)
class Particle {
  constructor(x, y, directionX, directionY, size, color) {
    this.x = x; // Posição X inicial da partícula
    this.y = y; // Posição Y inicial da partícula
    this.directionX = directionX; // Direção e velocidade X da partícula
    this.directionY = directionY; // Direção e velocidade Y da partícula
    this.size = size; // Tamanho da partícula (raio do círculo)
    this.color = color; // Cor da partícula
  }

  // Método para desenhar a partícula (círculo)
  draw() {
    ctx.beginPath(); // Inicia um novo caminho de desenho
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false); // Desenha um arco (círculo)
    ctx.fillStyle = this.color; // Define a cor de preenchimento do círculo
    ctx.fill(); // Preenche o círculo com a cor especificada
  }

  // Método para atualizar a posição da partícula
  update() {
    // Verifica se a partícula atingiu as bordas do canvas e inverte sua direção se necessário
    if (this.x + this.size > canvas.width || this.x - this.size < 0) {
      this.directionX = -this.directionX; // Inverte a direção X
    }
    if (this.y + this.size > canvas.height || this.y - this.size < 0) {
      this.directionY = -this.directionY; // Inverte a direção Y
    }

    // Move a partícula de acordo com sua direção e velocidade
    this.x += this.directionX; // Atualiza a posição X da partícula
    this.y += this.directionY; // Atualiza a posição Y da partícula

    // Interatividade com o mouse: aumenta o tamanho da partícula se o mouse estiver próximo
    if (
      mouse.x - this.x < mouse.radius &&
      mouse.x - this.x > -mouse.radius &&
      mouse.y - this.y < mouse.radius &&
      mouse.y - this.y > -mouse.radius
    ) {
      if (this.size < 8) {
        this.size += 3; // Aumenta o tamanho da partícula
      }
    } else if (this.size > 1) {
      this.size -= 0.1; // Reduz gradualmente o tamanho da partícula
    }

    if (this.size < 0) {
      this.size = 0; // Garante que o tamanho da partícula nunca seja menor que zero
    }

    this.draw(); // Chama o método draw() para desenhar a partícula na nova posição
  }
}

// Classe para definir as estrelas da galáxia
class Galaxy {
  constructor(x, y, radius, color, velocity) {
    this.x = x; // Posição X inicial da estrela da galáxia
    this.y = y; // Posição Y inicial da estrela da galáxia
    this.radius = radius; // Raio da estrela da galáxia
    this.color = color; // Cor da estrela da galáxia
    this.velocity = velocity; // Velocidade de movimento da estrela da galáxia
  }

  // Método para desenhar a estrela da galáxia
  draw() {
    ctx.save(); // Salva o estado atual do contexto de desenho
    ctx.beginPath(); // Inicia um novo caminho de desenho
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false); // Desenha um arco (círculo)
    ctx.fillStyle = this.color; // Define a cor de preenchimento do círculo da estrela
    ctx.shadowColor = "#e3eaef"; // Define a cor da sombra
    ctx.shadowBlur = 20; // Define o desfoque da sombra
    ctx.fill(); // Preenche o círculo com a cor especificada
    ctx.restore(); // Restaura o estado anterior do contexto de desenho
  }

  // Método para atualizar a posição da estrela da galáxia
  update() {
    this.draw(); // Chama o método draw() para desenhar a estrela na posição atual
  }
}

// Função para inicializar as partículas e estrelas
function init() {
  particlesArray = []; // Inicializa o array de partículas vazio
  galaxiesArray = []; // Inicializa o array de estrelas da galáxia vazio

  const numberOfParticles = 100; // Número de partículas desejado
  for (let i = 0; i < numberOfParticles; i++) {
    let size = Math.random() * 5 + 1; // Tamanho aleatório das partículas
    let x = Math.random() * (canvas.width - size * 2) + size; // Posição X aleatória dentro do canvas
    let y = Math.random() * (canvas.height - size * 2) + size; // Posição Y aleatória dentro do canvas
    let directionX = (Math.random() - 0.5) * 2; // Direção e velocidade X aleatórias
    let directionY = (Math.random() - 0.5) * 2; // Direção e velocidade Y aleatórias
    let color = "rgba(255, 255, 255, 0.8)"; // Cor das partículas

    particlesArray.push(
      new Particle(x, y, directionX, directionY, size, color)
    ); // Adiciona nova partícula ao array
  }

  const numberOfGalaxies = 50; // Número de estrelas da galáxia desejado
  for (let i = 0; i < numberOfGalaxies; i++) {
    let radius = Math.random() * 2; // Raio aleatório das estrelas da galáxia
    let x = Math.random() * canvas.width; // Posição X aleatória dentro do canvas
    let y = Math.random() * canvas.height; // Posição Y aleatória dentro do canvas
    let color = "rgba(255, 255, 255, 0.8)"; // Cor das estrelas da galáxia
    let velocity = (Math.random() - 0.5) * 0.5; // Velocidade aleatória das estrelas da galáxia

    galaxiesArray.push(new Galaxy(x, y, radius, color, velocity)); // Adiciona nova estrela da galáxia ao array
  }
}

// Função para animar as partículas e estrelas
function animate() {
  requestAnimationFrame(animate); // Chama animate continuamente para criar uma animação suave
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpa o canvas a cada frame para animação limpa

  galaxiesArray.forEach((galaxy) => {
    galaxy.update(); // Atualiza a posição de cada estrela da galáxia
  });

  particlesArray.forEach((particle) => {
    particle.update(); // Atualiza a posição de cada partícula
  });

  connect(); // Conecta as
}

// Função para conectar as partículas próximas com linhas
function connect() {
  let opacityValue = 1; // Valor inicial da opacidade das linhas de conexão entre partículas
  for (let a = 0; a < particlesArray.length; a++) {
    for (let b = a; b < particlesArray.length; b++) {
      // Calcula a distância ao quadrado entre duas partículas para determinar a proximidade
      let distance =
        (particlesArray[a].x - particlesArray[b].x) ** 2 +
        (particlesArray[a].y - particlesArray[b].y) ** 2;

      // Se a distância entre as partículas for menor que um limite, desenha uma linha entre elas
      if (distance < (canvas.width / 7) * (canvas.height / 7)) {
        opacityValue = 1 - distance / 20000; // Calcula a opacidade com base na distância
        ctx.strokeStyle = "rgba(255,255,255," + opacityValue + ")"; // Define a cor e a opacidade da linha
        ctx.lineWidth = 1; // Define a largura da linha de conexão
        ctx.beginPath(); // Inicia um novo caminho de desenho
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y); // Move o ponto inicial da linha
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y); // Desenha uma linha até o ponto final
        ctx.stroke(); // Aplica o desenho da linha com a cor e opacidade especificadas
      }
    }
  }
}

init(); // Inicializa as partículas e estrelas ao carregar a página
animate(); // Inicia a animação contínua das partículas e estrelas
