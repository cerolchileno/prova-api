const listaPaises = document.getElementById('listaPaises');
const listaFavoritos = document.getElementById('listaFavoritos');
const entradaFiltro = document.getElementById('entradaFiltro');
const detalhesPais = document.getElementById('detalhesPais');

let todosOsPaises = []; // Lista de todos os países
let favoritos = JSON.parse(localStorage.getItem('favoritos')) || []; // Lista de favoritos


function buscarPaises() {
    fetch('https://restcountries.com/v3.1/all')
        .then(resposta => resposta.json())
        .then(dados => {
            todosOsPaises = dados; 
            exibirPaises(todosOsPaises);
            exibirFavoritos(); 
        });
}

function exibirPaises(paises) {
    listaPaises.innerHTML = ''; 
    paises.forEach(pais => {
        const li = document.createElement('li');
        li.textContent = pais.name.common; 
        li.onclick = () => mostrarDetalhesPais(pais); 
        listaPaises.appendChild(li);
    });
}


function mostrarDetalhesPais(pais) {
    const ehFavorito = favoritos.includes(pais.name.common);
    
    detalhesPais.innerHTML = `
        <h3>${pais.name.common}</h3>
        <p>Capital: ${pais.capital ? pais.capital[0] : 'N/A'}</p>
        <p>População: ${pais.population}</p>
        <button onclick="alternarFavorito('${pais.name.common}')">
            ${ehFavorito ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
        </button>
    `;
}

function alternarFavorito(nomePais) {
    if (favoritos.includes(nomePais)) {
        favoritos = favoritos.filter(fav => fav !== nomePais); 
    } else {
        favoritos.push(nomePais); 
    }
    localStorage.setItem('favoritos', JSON.stringify(favoritos)); 
    exibirFavoritos(); 
    exibirPaises(todosOsPaises); 
}


function exibirFavoritos() {
    listaFavoritos.innerHTML = ''; 
    favoritos.forEach(fav => {
        const li = document.createElement('li');
        li.textContent = fav; 
        const botaoRemover = document.createElement('button');
        botaoRemover.textContent = 'Remover';
        botaoRemover.onclick = () => removerFavorito(fav); 
        li.appendChild(botaoRemover); 
        listaFavoritos.appendChild(li);
    });
}


function removerFavorito(nomePais) {
    favoritos = favoritos.filter(fav => fav !== nomePais);
    localStorage.setItem('favoritos', JSON.stringify(favoritos)); 
    exibirFavoritos(); 
}


entradaFiltro.addEventListener('input', () => {
    const termoBusca = entradaFiltro.value.toLowerCase(); 
    const paisesFiltrados = todosOsPaises.filter(pais => 
        pais.name.common.toLowerCase().includes(termoBusca)
    );
    exibirPaises(paisesFiltrados); 
});

buscarPaises(); 