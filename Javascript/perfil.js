function toggleSeguir() {
    const btn = document.querySelector('.btn-seguir');
    const icon = btn.querySelector('.material-symbols-outlined');
    const text = btn.querySelector('.btn-text');
    
    if (btn.classList.contains('seguindo')) {
        icon.textContent = 'person_add';
        text.textContent = 'Seguir';
        btn.classList.remove('seguindo');
    } else {
        icon.textContent = 'person_remove';
        text.textContent = 'Deixar de seguir';
        btn.classList.add('seguindo');
    }
}
