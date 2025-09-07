// Dados mockados de locais de pesca
const fishingLocations = [
    {
        id: 1,
        name: "Represa do Vale Sereno",
        image: "https://img.freepik.com/fotos-premium/paisagem-da-natureza-do-verao-com-rio-montes-e-floresta-dia-quente-de-sol_113767-132.jpg",
        description: "Um dos melhores locais para pesca de tucunaré e pintado. Águas claras e correntes moderadas.",
        type: "Represa",
        fishTypes: ["tucunaré", "pintado", "dourado"],
        city: "Barra do Garças, MT",
        rating: 4.7,
        facilities: ["Boas estradas e trilhas"],
        bestSeason: "Maio a Setembro"
    },
    {
        id: 2,
        name: "Lago das Fendas",
        image: "https://plus.unsplash.com/premium_photo-1664304439817-21d34749c55d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGFpc2FnZW0lMjBkbyUyMHJpb3xlbnwwfHwwfHx8MA%3D%3D",
        description: "Lago particular com ótima estrutura para pesca esportiva, especialmente de pacu e piapara.",
        type: "Lago",
        fishTypes: ["pacu", "piapara", "tilápia"],
        city: "Manaus, AM",
        rating: 4.5,
        facilities: ["Local fresco e limpo"],
        bestSeason: "Ano todo"
    },
    {
        id: 3,
        name: "Represa Jacarupema",
        image: "https://www.marinatamoios.com.br/wp-content/uploads/2018/08/Paraibuna-Marina-Tamoios2.jpg",
        description: "Grande represa conhecida por suas corvinas e tucunarés de bom porte. Área com vários pontos de pesca.",
        type: "Represa",
        fishTypes: ["corvina", "tucunaré", "traíra"],
        city: "Capitólio, MG",
        rating: 4.3,
        facilities: ["Restaurantes e pousadas"],
        bestSeason: "Outubro a Março"
    },
    {
        id: 4,
        name: "Pesqueiro Recanto do Dourado",
        image: "https://www.hotelfazendaserranegra.com.br/lazer/img/pesqueiro/00.jpg",
        description: "Pesqueiro com tanques naturais abastecidos por riacho. Ideal para pesca com família e iniciantes.",
        type: "Pesqueiro",
        fishTypes: ["tilápia", "carpa", "pacu"],
        city: "Campinas, SP",
        rating: 4.0,
        facilities: ["aluguel de equipamentos", "restaurante", "área infantil"],
        bestSeason: "Ano todo"
    },
    {
        id: 5,
        name: "Rio Venturina",
        image: "https://img.nsctotal.com.br/wp-content/uploads/legacy/s3fs-public/graphql-upload-files/shutterstock_2087048275%20(1).jpg",
        description: "Excelente local para pesca, com variedade de espécies como robalo, dourado e garoupa.",
        type: "Rio",
        fishTypes: ["robalo", "dourado", "garoupa"],
        city: "Mata de São João, BA",
        rating: 4.8,
        facilities: ["barcos", "guia especializado", "pousadas"],
        bestSeason: "Novembro a Abril"
    },
    {
        id: 6,
        name: "Rio Ventovale",
        image: "https://images.pexels.com/photos/247600/pexels-photo-247600.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        description: "Um dos melhores locais para pesca de tucunaré. Experiência única na floresta.",
        type: "Rio",
        fishTypes: ["tucunaré", "piranha", "pirarucu"],
        city: "Petrolina, PE",
        rating: 4.9,
        facilities: ["guias locais", "transporte"],
        bestSeason: "Julho a Novembro"
    }
];

// Elementos do DOM
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const fishTypeFilter = document.getElementById('fish-type');
const locationTypeFilter = document.getElementById('location-type');
const ratingFilter = document.getElementById('rating');
const resultsContainer = document.getElementById('results-container');
const noResultsMessage = document.getElementById('no-results');

// Função para renderizar os locais de pesca
function renderFishingLocations(locations) {
    resultsContainer.innerHTML = '';
    
    if (locations.length === 0) {
        noResultsMessage.classList.remove('hidden');
        return;
    }
    
    noResultsMessage.classList.add('hidden');
    
    locations.forEach(location => {
        const card = document.createElement('div');
        card.className = 'location-card';
        
        // Criar tags de tipos de peixe
        const fishTags = location.fishTypes.map(fish => 
            `<span class="tag"><i class="fas fa-fish"></i> ${fish}</span>`
        ).join('');
        
        // Criar ícones de facilidades
        const facilityIcons = {
            "embarcações": "fa-ship",
            "guia": "fa-user-tie",
            "restaurante": "fa-utensils",
            "quiosques": "fa-umbrella-beach",
            "aluguel de equipamentos": "fa-fishing-rod",
            "estacionamento": "fa-parking",
            "hotéis": "fa-hotel",
            "marinas": "fa-anchor",
            "área infantil": "fa-child",
            "barcos": "fa-ship",
            "guias especializados": "fa-user-tie",
            "pousadas": "fa-bed",
            "hotéis flutuantes": "fa-water",
            "transporte": "fa-bus"
        };
        
        const facilitiesList = location.facilities.map(facility => 
            `<span class="tag"><i class="fas ${facilityIcons[facility] || 'fa-check'}"></i> ${facility}</span>`
        ).join('');
        
        card.innerHTML = `
            <img src="${location.image}" alt="${location.name}" class="location-image">
            <div class="location-info">
                <div class="location-name">${location.name}</div>
                <div class="location-details">
                    <div class="detail-item"><i class="fas fa-map-marker-alt"></i> ${location.city}</div>
                    <div class="detail-item"><i class="fas fa-calendar-alt"></i> Melhor época: ${location.bestSeason}</div>
                    <div class="detail-item"><i class="fas fa-water"></i> ${location.type.charAt(0).toUpperCase() + location.type.slice(1)}</div>
                </div>
                <div class="location-description">${location.description}</div>
                <div style="margin-bottom: 10px;">${fishTags}</div>
                <div style="margin-bottom: 15px;">${facilitiesList}</div>
                <div class="location-ratings">⭐ ${location.rating}/5</div>
            </div>
        `;
        
        resultsContainer.appendChild(card);
    });
}

// Função de pesquisa com filtros
function searchLocations() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedFishType = fishTypeFilter.value;
    const selectedLocationType = locationTypeFilter.value;
    const minRating = parseFloat(ratingFilter.value);
    
    const filteredLocations = fishingLocations.filter(location => {
        // Filtro por termo de pesquisa
        const matchesSearch = 
            location.name.toLowerCase().includes(searchTerm) || 
            location.description.toLowerCase().includes(searchTerm) ||
            location.city.toLowerCase().includes(searchTerm) ||
            location.fishTypes.some(fish => fish.includes(searchTerm));
        
        // Filtro por tipo de peixe
        const matchesFishType = 
            selectedFishType === '' || 
            location.fishTypes.includes(selectedFishType);
        
        // Filtro por tipo de local
        const matchesLocationType = 
            selectedLocationType === '' || 
            location.type === selectedLocationType;
        
        // Filtro por avaliação
        const matchesRating = 
            location.rating >= minRating;
        
        return matchesSearch && matchesFishType && matchesLocationType && matchesRating;
    });
    
    renderFishingLocations(filteredLocations);
}

// Event Listeners
searchButton.addEventListener('click', searchLocations);
searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        searchLocations();
    }
});

fishTypeFilter.addEventListener('change', searchLocations);
locationTypeFilter.addEventListener('change', searchLocations);
ratingFilter.addEventListener('change', searchLocations);

// Mostrar todos os locais ao carregar a página
window.addEventListener('load', () => {
    renderFishingLocations(fishingLocations);
});