// Detalhes da publicação
const detalhesPublicacao = [
    { label: "Data da publicação", value: "25 de Abril de 2025" },
    { label: "Autor", value: "João Pescador" },
    { label: "Local de pesca", value: "Praia de Ubatuba, SP" },
    { label: "Espécie pescada", value: "Dourado" }
];

// Comentários da publicação
const comentarios = [
    { autor: "Carlos Silva", conteudo: "Que peixe incrível! Parabéns pela captura!" },
    { autor: "Ana Pescadora", conteudo: "Ubatuba realmente tem ótimos locais para pesca!" },
    { autor: "Marcos Ribeiro", conteudo: "Qual foi a isca utilizada?" }
];

// Função para renderizar detalhes da publicação
function carregarDetalhes() {
    const container = document.getElementById('details-container');
    detalhesPublicacao.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('details-card');
        div.innerHTML = `
            <div class="detail-item">
                <span class="detail-label">${item.label}:</span>
                <span class="detail-value">${item.value}</span>
            </div>
        `;
        container.appendChild(div);
    });
}

// Função para renderizar comentários
function carregarComentarios() {
    const container = document.getElementById('comments-container');
    comentarios.forEach(comentario => {
        const div = document.createElement('div');
        div.classList.add('comment');
        div.innerHTML = `
            <div class="comment-author">${comentario.autor}</div>
            <div class="comment-content">${comentario.conteudo}</div>
        `;
        container.appendChild(div);
    });
}

// Função para renderizar eventos
function carregarEventos() {
    const container = document.getElementById('events-container');
    eventos.forEach(evento => {
        const div = document.createElement('div');
        div.classList.add('event-card');
        div.innerHTML = `
            <div class="event-title">${evento.titulo}</div>
            <div class="event-date">${evento.data}</div>
            <div class="event-description">${evento.descricao}</div>
        `;
        container.appendChild(div);
    });
}

// Chamar funções ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    carregarDetalhes();
    carregarComentarios();
    carregarEventos();
});


document.addEventListener('DOMContentLoaded', function() {
    // Recupera os dados da publicação do localStorage
    const postData = JSON.parse(localStorage.getItem('currentPost'));
    
    if (postData) {
      // Preenche os elementos com os dados da publicação
      document.getElementById('detail-post-image').src = postData.image;
      document.getElementById('detail-post-author').textContent = 
        `${postData.author} • ${postData.date}`;
      document.getElementById('detail-post-location').textContent = postData.location;
      document.getElementById('detail-post-text').textContent = postData.text;
      
      // Preenche os comentários
      const commentsContainer = document.getElementById('detail-post-comments');
      postData.comments.forEach(comment => {
        const commentDiv = document.createElement('div');
        commentDiv.className = 'comment';
        commentDiv.innerHTML = `<strong>${comment.author}:</strong> ${comment.text}`;
        commentsContainer.appendChild(commentDiv);
      });
    } else {
      // Se não houver dados, redireciona de volta para a home
      window.location.href = 'home.html';
    }
    
    // Adicione aqui o código do tema escuro/claro se necessário
  });