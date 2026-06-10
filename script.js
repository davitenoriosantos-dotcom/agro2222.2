// Modo Noturno
const toggleDark = document.getElementById('toggleDark');
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark') {
  document.documentElement.setAttribute('data-theme', 'dark');
  toggleDark.innerHTML = '<i class="fas fa-sun"></i>';
}

toggleDark.addEventListener('click', () => {
  if (document.documentElement.getAttribute('data-theme') === 'dark') {
    document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('theme', 'light');
    toggleDark.innerHTML = '<i class="fas fa-moon"></i>';
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    toggleDark.innerHTML = '<i class="fas fa-sun"></i>';
  }
});

// Temperatura em Tempo Real (Open-Meteo)
async function getWeather() {
  const tempEl = document.getElementById('temperature');
  const locationEl = document.getElementById('location');
  const conditionEl = document.getElementById('condition');

  if (!navigator.geolocation) {
    locationEl.textContent = "Geolocalização não suportada";
    return;
  }

  navigator.geolocation.getCurrentPosition(async (position) => {
    const { latitude, longitude } = position.coords;

    try {
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code`
      );
      const data = await res.json();

      tempEl.textContent = `${data.current.temperature_2m} °C`;
      locationEl.textContent = `Sua localização aproximada`;
      conditionEl.textContent = "Condições atuais";
    } catch (e) {
      tempEl.textContent = "Erro ao carregar";
    }
  }, () => {
    locationEl.textContent = "Permita o acesso à localização para ver a temperatura local";
  });
}

getWeather();

// Quizzes
const quizzes = [
  {
    question: "Qual é uma prática fundamental da agricultura sustentável?",
    options: ["Uso intensivo de agrotóxicos", "Rotação de culturas", "Monocultura em larga escala", "Desmatamento para expansão"],
    correct: 1
  },
  {
    question: "O que significa agroecologia?",
    options: ["Agricultura baseada apenas em tecnologia", "Sistema que integra ecologia e produção de alimentos", "Uso exclusivo de transgênicos", "Produção em estufas controladas"],
    correct: 1
  },
  {
    question: "Qual o principal benefício da agricultura orgânica?",
    options: ["Maior velocidade de produção", "Menor uso de insumos químicos e preservação do solo", "Maior dependência de petróleo", "Menor custo inicial"],
    correct: 1
  },
  {
    question: "O que é consórcio de culturas?",
    options: ["Plantar a mesma cultura em sequência", "Cultivar diferentes espécies no mesmo espaço", "Usar apenas uma espécie por ano", "Plantio em terraços"],
    correct: 1
  },
  {
    question: "Por que a agricultura sustentável é importante para o futuro?",
    options: ["Aumenta o lucro imediato", "Preserva recursos naturais para as próximas gerações", "Reduz a biodiversidade", "Aumenta o uso de água"],
    correct: 1
  }
];

function createQuizzes() {
  const container = document.getElementById('quiz-container');
  
  quizzes.forEach((quiz, index) => {
    const quizEl = document.createElement('div');
    quizEl.className = 'quiz';
    quizEl.innerHTML = `
      <h3>Quiz ${index + 1}: ${quiz.question}</h3>
      <div class="options" data-correct="${quiz.correct}"></div>
    `;

    const optionsDiv = quizEl.querySelector('.options');
    
    quiz.options.forEach((option, i) => {
      const opt = document.createElement('div');
      opt.className = 'option';
      opt.textContent = option;
      opt.dataset.index = i;
      
      opt.addEventListener('click', () => {
        const correctIndex = parseInt(optionsDiv.dataset.correct);
        
        Array.from(optionsDiv.children).forEach(o => {
          o.style.pointerEvents = 'none';
          if (parseInt(o.dataset.index) === correctIndex) {
            o.classList.add('correct');
          } else if (parseInt(o.dataset.index) === i) {
            o.classList.add('wrong');
          }
        });
      });
      
      optionsDiv.appendChild(opt);
    });

    container.appendChild(quizEl);
  });
}

createQuizzes();
