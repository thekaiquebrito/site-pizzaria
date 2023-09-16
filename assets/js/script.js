//* IMPORTAÇÃO
let body = document.querySelector('body');
let cardsContainer = document.querySelector('.cards');
let cartContainer = document.querySelector('#cart');
let menuCentralContainer = document.querySelector('#menu-central');
let containerPrincipal = document.querySelector('.container');


//* CRIAÇÃO DOS CARDS DINÂMICAMENTE 
function createCard() {
    for (let i in menu) {

        let image = document.createElement('img');
        image.setAttribute('src', menu[i].image)

        let title = document.createElement('div');
        title.classList.add('title');
        title.textContent = menu[i].name;

        let description = document.createElement('div');
        description.classList.add('description');
        description.textContent = menu[i].description

        let cardButton = document.createElement('button');
        cardButton.classList.add('card-button');
        let imgButton = document.createElement('img');
        imgButton.setAttribute('src', 'assets/img/add_pizza_btn.svg');
        cardButton.appendChild(imgButton)

        let card = document.createElement('div');
        card.classList.add('card');
        card.appendChild(image);
        card.appendChild(title);
        card.appendChild(description);
        card.appendChild(cardButton);

        cardsContainer.appendChild(card);
    }
}

createCard()

//* EVENTOS DE CLIQUE
function openCart() {
    cardsContainer.classList.toggle('cart');
    body.classList.toggle('cart');
    cartContainer.classList.toggle('hide');
}

let cardButton = document.querySelectorAll('.card-button');

function openMenuCentral() {
    menuCentralContainer.classList.remove('hide');
    containerPrincipal.classList.add('menu-central')
}

cardButton.forEach(element => {
    element.addEventListener('click', openMenuCentral)
});
