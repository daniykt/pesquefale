
  // Detecta a página atual pelo nome do arquivo na URL
  const currentPage = window.location.pathname.split("/").pop(); // Ex: perfil.html

  // Pega todos os links da nav com data-page
  const links = document.querySelectorAll("nav.navigation a");

  links.forEach(link => {
    const href = link.getAttribute("href");
    if (href === currentPage) {
      link.classList.add("active");
    }
  });

  document.addEventListener('DOMContentLoaded', function() {
    const themeBtn = document.getElementById('theme-btn');
    const body = document.body;
    
    // Verifica o tema salvo no localStorage (se já foi escolhido antes)
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    // Aplica o tema salvo
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeBtn.innerHTML = '<span class="material-symbols-outlined">light_mode</span>';
    }
    
    // Alterna entre temas quando o botão é clicado
    themeBtn.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        
        // Salva a preferência no localStorage
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            themeBtn.innerHTML = '<span class="material-symbols-outlined">light_mode</span>';
        } else {
            localStorage.setItem('theme', 'light');
            themeBtn.innerHTML = '<span class="material-symbols-outlined">dark_mode</span>';
        }
    });
});

// Função para redirecionar para a página de detalhes
function redirectToPostDetails(postId) {
  // Armazena os dados da publicação que será visualizada
  const post = getPostById(postId); // Você precisará implementar esta função
  
  // Salva os dados no localStorage para acessar na página de detalhes
  localStorage.setItem('currentPost', JSON.stringify(post));
  
  // Redireciona para a página de detalhes
  window.location.href = '../html/detalhespublicacao.html';
}

// Função para obter os dados da publicação (exemplo básico)
function getPostById(postId) {
  // Na prática, você pode buscar isso de um array ou API
  // Aqui estou simulando com dados fixos baseados no seu HTML
  
  const posts = {
    1: {
      id: 1,
      author: "@lula",
      date: "06/05/2025",
      location: "Brasília - São Paulo",
      text: "Meu cumpanheiro pescou hoje!",
      image: "https://pbs.twimg.com/media/CxEcXvsW8AA5OTJ.jpg",
      comments: [
        { author: "@bolsonaro", text: "Não era pra postar, tá ok?" },
        { author: "@pl", text: "kkkkkkkkkkk" }
      ]
    },
    2: {
      id: 2,
      author: "@pessi",
      date: "06/05/2025",
      location: "Matão - SP",
      text: "Olha o peixe que o pai pego!",
      image: "https://images7.memedroid.com/images/UPLOADED944/6502578f5efae.jpeg",
      comments: [
        { author: "@neymar", text: "pode não paizão" }
      ]
    }
  };
  
  return posts[postId];
}

// Adicione este evento para prevenir que cliques nos botões de ação propaguem para o post-card
document.querySelectorAll('.post-actions button').forEach(button => {
  button.addEventListener('click', function(e) {
    e.stopPropagation(); // Impede que o evento chegue ao post-card
  });
});

