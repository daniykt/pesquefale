// menu.js - Controle do Header Horizontal e Menu Fullscreen

// Função para redirecionar para detalhes do post
function redirectToPostDetails(postId) {
  console.log('Redirecionando para post:', postId);
  // window.location.href = `post-details.html?id=${postId}`;
}

// Toggle do tema
document.addEventListener('DOMContentLoaded', function() {
  const themeBtn = document.getElementById('theme-btn');
  
  if (themeBtn) {
    themeBtn.addEventListener('click', function() {
      document.body.classList.toggle('dark-mode');
      const icon = this.querySelector('.material-symbols-outlined');
      const text = this.querySelector('.nav-text');
      
      if (document.body.classList.contains('dark-mode')) {
        icon.textContent = 'light_mode';
        if (text) text.textContent = 'Modo Claro';
        localStorage.setItem('theme', 'dark');
      } else {
        icon.textContent = 'dark_mode';
        if (text) text.textContent = 'Modo Escuro';
        localStorage.setItem('theme', 'light');
      }
    });
  }

  // Verificar tema salvo
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    const icon = themeBtn?.querySelector('.material-symbols-outlined');
    const text = themeBtn?.querySelector('.nav-text');
    if (icon) icon.textContent = 'light_mode';
    if (text) text.textContent = 'Modo Claro';
  }
});

// Controle do Menu Hambúrguer
document.addEventListener('DOMContentLoaded', function() {
  const sidebar = document.querySelector('.sidebar');
  const sidebarHeader = document.querySelector('.sidebar-header');
  const navMenu = document.querySelector('.nav-menu');
  const navItems = document.querySelectorAll('.nav-item');
  
  // Criar botão hambúrguer com animação
  const mobileMenuBtn = document.createElement('button');
  mobileMenuBtn.className = 'mobile-menu-btn';
  mobileMenuBtn.setAttribute('aria-label', 'Menu');
  
  // Criar linhas do hambúrguer
  const line1 = document.createElement('span');
  line1.className = 'line1';
  const line2 = document.createElement('span');
  line2.className = 'line2';
  const line3 = document.createElement('span');
  line3.className = 'line3';
  
  mobileMenuBtn.appendChild(line1);
  mobileMenuBtn.appendChild(line2);
  mobileMenuBtn.appendChild(line3);
  
  // Adicionar botão ao header
  if (sidebarHeader) {
    sidebarHeader.appendChild(mobileMenuBtn);
  }

  // Criar overlay
  const overlay = document.createElement('div');
  overlay.className = 'sidebar-overlay';
  sidebar.insertAdjacentElement('afterend', overlay);

  // Toggle do menu
  function toggleMenu() {
    sidebar.classList.toggle('open');
    document.body.classList.toggle('no-scroll');
    
    // Animar itens do menu
    if (sidebar.classList.contains('open')) {
      navItems.forEach((item, index) => {
        setTimeout(() => {
          item.style.animation = 'slideIn 0.3s ease forwards';
        }, index * 50);
      });
    } else {
      navItems.forEach(item => {
        item.style.animation = '';
      });
    }
  }

  // Event listeners
  mobileMenuBtn.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', toggleMenu);

  // Fechar menu ao clicar em um link
  navItems.forEach(item => {
    item.addEventListener('click', function() {
      if (window.innerWidth <= 768) {
        sidebar.classList.remove('open');
        document.body.classList.remove('no-scroll');
      }
    });
  });

  // Fechar menu ao redimensionar para desktop
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth >= 769) {
        sidebar.classList.remove('open');
        document.body.classList.remove('no-scroll');
        navItems.forEach(item => {
          item.style.animation = '';
        });
      }
    }, 250);
  });

  // Definir item ativo baseado na URL
  function setActiveItem() {
    const currentPage = window.location.pathname.split('/').pop() || 'home.html';
    
    navItems.forEach(item => {
      const itemHref = item.getAttribute('href');
      if (itemHref === currentPage) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  setActiveItem();

  // Adicionar animação de entrada para os itens do menu
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
  document.head.appendChild(style);
});

// Smooth scroll para links âncora
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerHeight = 70;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Adicionar sombra ao header quando rolar a página
window.addEventListener('scroll', function() {
  const sidebar = document.querySelector('.sidebar');
  if (window.scrollY > 10) {
    sidebar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
  } else {
    sidebar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
  }
});