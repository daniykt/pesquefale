function salvarNotificacoes() {
  const notificacoes = document.querySelectorAll('.notificacao');
  const dados = [];

  notificacoes.forEach(noti => {
    dados.push({
      id: noti.dataset.id,
      lida: noti.classList.contains('lida'),
      conteudo: noti.querySelector('.comentario').innerHTML,
      data: noti.querySelector('.data').innerText
    });
  });

  localStorage.setItem('notificacoes', JSON.stringify(dados));
}

function carregarNotificacoes() {
  const container = document.querySelector('.container-notificacoes');
  const salvas = JSON.parse(localStorage.getItem('notificacoes'));

  if (!salvas || salvas.length === 0) return;
   if (!container) return;
  container.innerHTML = '';

  salvas.forEach(noti => {
    const div = document.createElement('div');
    div.classList.add('notificacao');
    div.dataset.id = noti.id;
    if (noti.lida) div.classList.add('lida');

    div.innerHTML = `
      <div class="meta">
        <span class="data">${noti.data}</span>
        <button class="close" onclick="excluir(this)">&times;</button>
      </div>
      <p class="comentario">${noti.conteudo}</p>
      <div class="botoes">
        <button onclick="marcarComoLida(this)"><i class="fas fa-check"></i> Lida</button>
        <button class="like-btn" onclick="toggleReaction(this, 'like')"><i class="far fa-thumbs-up"></i> Curtir</button>
        <button class="dislike-btn" onclick="toggleReaction(this, 'dislike')"><i class="far fa-thumbs-down"></i> Não Curtir</button>
        <button class="favorite-btn" onclick="toggleFavorite(this)"><i class="far fa-star"></i> Favorito</button>
      </div>
    `;

    container.appendChild(div);
  });

  atualizarContador();
}

function atualizarContador() {
  const notificacoesNaoLidas = document.querySelectorAll('.notificacao:not(.lida)');
  const contador = document.getElementById('contador');
  contador.innerText = notificacoesNaoLidas.length;
  contador.style.display = notificacoesNaoLidas.length > 0 ? 'inline-block' : 'none';

  localStorage.setItem('contadorNotificacoes', notificacoesNaoLidas.length);
  salvarNotificacoes();
}

function pegaNotificacoes() {
  const notificacoes = Number(localStorage.getItem('contadorNotificacoes'));
  console.log(notificacoes);
  const contador = document.getElementById('contador');
  contador.innerText = notificacoes;
  contador.style.display = notificacoes > 0 ? 'inline-block' : 'none';

}

function marcarComoLida(botao) {
  const noti = botao.closest('.notificacao');
  noti.classList.add('lida');
  atualizarContador();
}

function toggleReaction(botao, type) {
  const noti = botao.closest(".notificacao");
  const oppositeType = type === 'like' ? 'dislike' : 'like';

  if (botao.classList.contains('active')) {
    botao.classList.remove("active");
    botao.querySelector("i").classList.replace("fas", "far");
  } else {
    botao.classList.add("active");
    botao.querySelector("i").classList.replace("far", "fas");

    const oppositeBtn = noti.querySelector(`.${oppositeType}-btn`);
    if (oppositeBtn.classList.contains('active')) {
      oppositeBtn.classList.remove("active");
      oppositeBtn.querySelector("i").classList.replace("fas", "far");
    }
  }
}

function toggleFavorite(botao) {
  botao.classList.toggle("active");
  const icon = botao.querySelector("i");
  icon.classList.toggle("fas");
  icon.classList.toggle("far");
}

function excluir(botao) {
  const noti = botao.closest('.notificacao');
  noti.remove();
  atualizarContador();
}

document.addEventListener('DOMContentLoaded', pegaNotificacoes);
document.addEventListener('DOMContentLoaded', carregarNotificacoes);


document.addEventListener('DOMContentLoaded', () => {
  if (!localStorage.getItem('notificacoes')) {
    salvarNotificacoes(); // Salva as notificações do HTML atual
  }
});
