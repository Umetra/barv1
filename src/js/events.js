// Fonction pour charger et afficher les événements
async function loadEvents() {
    try {
        // Charger le fichier JSON
        const response = await fetch('/events.json');
        const data = await response.json();
        
        // Afficher la liste des événements (avec clic)
        displayEventsList(data.upcoming, data);
        
        // Afficher l'événement à la une par défaut
        displayFeaturedEvent(data.featured);
        
    } catch (error) {
        console.error('Erreur lors du chargement des événements:', error);
        document.getElementById('events-list').innerHTML = 
            '<p style="text-align: center; color: var(--color-text-muted);">Erreur de chargement des événements</p>';
    }
}

// Afficher la liste des événements avec interaction
function displayEventsList(events, allData) {
    const container = document.getElementById('events-list');
    
    container.innerHTML = events.map((event, index) => `
        <div class="event-item" data-event-index="${index}" onclick="showEventDetails(${index})">
            <div class="event-item-date">
                <span class="date-day">${event.day}</span>
                <span class="date-month">${event.month}</span>
            </div>
            <div class="event-item-info">
                <h4>${event.title}</h4>
                <p>🕐 ${event.time}</p>
            </div>
            <div class="event-item-arrow">
                <span>→</span>
            </div>
        </div>
    `).join('');
    
    // Stocker les données pour y accéder au clic
    window.eventsData = allData;
}

// Afficher les détails d'un événement spécifique
function showEventDetails(index) {
    const event = window.eventsData.upcoming[index];
    
    // Créer un objet événement détaillé (avec fallback sur les données par défaut)
    const detailedEvent = {
        date: `${event.day} ${event.month}`,
        title: event.title,
        description: event.description || "Venez profiter d'une soirée exceptionnelle au bar. Ambiance garantie !",
        image: event.image || window.eventsData.featured.image,
        time: event.time,
        price: event.price || "Entrée gratuite",
        genre: event.genre || "Musique live",
        link: event.link || "https://instagram.com/"
    };
    
    displayFeaturedEvent(detailedEvent);
    
    // Effet visuel : mettre en surbrillance l'événement sélectionné
    highlightSelectedEvent(index);
    
    // Scroll smooth vers l'événement à la une (optionnel)
    document.getElementById('featured-event').scrollIntoView({ 
        behavior: 'smooth', 
        block: 'nearest' 
    });
}

// Mettre en surbrillance l'événement sélectionné
function highlightSelectedEvent(index) {
    // Retirer la classe active de tous les événements
    document.querySelectorAll('.event-item').forEach(item => {
        item.classList.remove('event-item-active');
    });
    
    // Ajouter la classe active à l'événement cliqué
    const selectedItem = document.querySelector(`[data-event-index="${index}"]`);
    if (selectedItem) {
        selectedItem.classList.add('event-item-active');
    }
}

// Afficher l'événement à la une
function displayFeaturedEvent(event) {
    const container = document.getElementById('featured-event');
    
    container.innerHTML = `
        <div class="featured-event-image">
            <img src="${event.image}" alt="${event.title}">
            <div class="featured-badge">
                <span>À ne pas manquer !</span>
            </div>
        </div>
        
        <div class="featured-event-info">
            <span class="event-date-badge">${event.date}</span>
            <h4>${event.title}</h4>
            <p>${event.description}</p>
            
            <div class="event-details">
                <div class="event-detail-item">
                    <span class="detail-icon">🕐</span>
                    <span>${event.time}</span>
                </div>
                <div class="event-detail-item">
                    <span class="detail-icon">🎫</span>
                    <span>${event.price}</span>
                </div>
                <div class="event-detail-item">
                    <span class="detail-icon">🎵</span>
                    <span>${event.genre}</span>
                </div>
            </div>
            
            <a href="${event.link}" target="_blank" class="btn btn-primary">
                Plus d'infos sur Instagram
            </a>
        </div>
    `;
    
    // Animation d'apparition
    container.style.opacity = '0';
    setTimeout(() => {
        container.style.transition = 'opacity 0.3s ease';
        container.style.opacity = '1';
    }, 50);
}

// Rendre la fonction accessible globalement
window.showEventDetails = showEventDetails;

// Charger les événements au chargement de la page
document.addEventListener('DOMContentLoaded', loadEvents);
