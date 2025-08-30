/* ===== NAV: marcar item selecionado, persistir e atualizar ao scroll ===== */
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = Array.from(document.querySelectorAll('#navLinks a')); // pega os links da UL
  const sections = Array.from(document.querySelectorAll('section[id]')); // seções com id pra sync scroll

  // Função para definir active e salvar
  function setActiveLink(link) {
    navLinks.forEach(l => l.classList.remove('active'));
    if (!link) return;
    link.classList.add('active');
    try {
      localStorage.setItem('activeNav', link.getAttribute('href'));
    } catch (e) {
      // no localStorage? ignore
    }
  }

  // Restora pelo hash da URL ou pelo localStorage
  const saved = localStorage.getItem('activeNav');
  const currentHash = window.location.hash;
  let initial = null;
  if (currentHash) {
    initial = navLinks.find(l => l.getAttribute('href') === currentHash);
  }
  if (!initial && saved) {
    initial = navLinks.find(l => l.getAttribute('href') === saved);
  }
  if (!initial) {
    // opcional: marca o primeiro link como padrão
    initial = navLinks[0];
  }
  setActiveLink(initial);

  // Clique: marca e (se for âncora) deixa o smooth scroll do menu.js cuidar da rolagem
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      setActiveLink(link);

      // Se for menu mobile (tu tem toggle), fecha o menu ao clicar
      const navList = document.getElementById('navLinks');
      if (navList && navList.classList.contains('open')) {
        navList.classList.remove('open');
      }
    });
  });

  // Atualiza active conforme o scroll — considera um offset pra cabeçalho
  function onScroll() {
    const scrollPos = window.scrollY + 120; // ajuste se teu header for maior/menor
    for (let sec of sections) {
      if (sec.offsetTop <= scrollPos && (sec.offsetTop + sec.offsetHeight) > scrollPos) {
        const id = `#${sec.id}`;
        const link = navLinks.find(l => l.getAttribute('href') === id);
        if (link) {
          // evita escrever no localStorage a todo scroll — só se diferente
          if (!link.classList.contains('active')) setActiveLink(link);
          break;
        }
      }
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  // dispara uma vez para atualizar no load
  onScroll();
});
