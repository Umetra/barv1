// ========================================
// GALLERY LIGHTBOX MODAL
// ========================================

export function initGallery() {
    const modal = document.getElementById('photoModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const closeBtn = document.querySelector('.modal-close');
    const prevBtn = document.querySelector('.modal-prev');
    const nextBtn = document.querySelector('.modal-next');
    const cards = document.querySelectorAll('.instagram-card[data-photo]');
    
    let currentIndex = 0;
    let scrollPosition = 0; // ✅ Stocker la position de scroll
    
    const photos = Array.from(cards).map(card => {
        const img = card.querySelector('img');
        return {
            src: img.src,
            title: img.dataset.title || img.alt,
            description: img.dataset.description || ''
        };
    });

    // Ouvrir le modal
    function openModal(index) {
        currentIndex = index;
        
        // ✅ Sauvegarder la position de scroll actuelle
        scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        
        updateModalContent();
        modal.classList.add('active');
        
        // ✅ Bloquer le scroll ET fixer la position
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollPosition}px`;
        document.body.style.width = '100%';
    }

    // Fermer le modal
    function closeModal() {
        modal.classList.remove('active');
        
        // ✅ Restaurer le scroll et la position exacte
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, scrollPosition);
    }

    // Mettre à jour le contenu du modal
    function updateModalContent() {
        const photo = photos[currentIndex];
        modalImage.src = photo.src;
        modalImage.alt = photo.title;
        modalTitle.textContent = photo.title;
        modalDescription.textContent = photo.description;

        // Désactiver les boutons aux extrémités
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === photos.length - 1;
    }

    // Navigation
    function showNext() {
        if (currentIndex < photos.length - 1) {
            currentIndex++;
            updateModalContent();
        }
    }

    function showPrev() {
        if (currentIndex > 0) {
            currentIndex--;
            updateModalContent();
        }
    }

    // Event listeners
    cards.forEach((card, index) => {
        card.addEventListener('click', (e) => {
            e.preventDefault(); // ✅ Empêcher comportement par défaut
            e.stopPropagation(); // ✅ Empêcher propagation
            openModal(index);
        });
    });

    closeBtn.addEventListener('click', closeModal);
    prevBtn.addEventListener('click', showPrev);
    nextBtn.addEventListener('click', showNext);

    // Fermer en cliquant sur le fond noir
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Navigation clavier
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;

        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'ArrowRight') showNext();
    });
}
