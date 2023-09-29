//* IMPORTAÇÃO
const qs = (el) => document.querySelector(el)
const qsa = (el) => document.querySelectorAll(el)

let body = qs('body');
let cardsContainer = qs('.pizza-cards--area');
let cartContainer = qs('#cart');
let menuCentralContainer = qs('#menu-central');
let containerPrincipal = qs('.container');


//* CRIAÇÃO DOS CARDS DINÂMICAMENTE 
pizzaJson.map(pizza => {
    let pizzaCard = qs('.models .pizza-card--container').cloneNode(true);

    pizzaCard.querySelector('.pizza-card--img').setAttribute('src', pizza.image)
    // pizzaCard.qs('.pizza-card--title').textContent = pizza.name
    // pizzaCard.qs('.pizza-card--desc').textContent = pizza.description
    // pizzaCard.qs('.pizza-card--button--img').setAttribute('src', '/assets/img/add_pizza_btn.svg')

    

    qs('.pizza-cards--area').append(pizzaCard)
})

//* EVENTOS DE CLIQUE
    // ABRIR CARRINHO
function openCart() {
    cardsContainer.classList.toggle('cart');
    body.classList.toggle('cart');
    cartContainer.classList.toggle('hide');

    closeMenu()

    if (window.innerWidth <= '650px') {
       
        qs('#menu').classList.add('hide')
        
    }
}

    //  ABRIR/CRIAR MENU CENTRAL
let cardButton = qsa('.card-button');
let parentCard;
let pizzaID;

function createMenuCentral() {
    for (let i in pizzaJson) {
        if (parentCard.childNodes[1].textContent === pizzaJson[i].name) {
            let image = qs('#img-cart')
            image.setAttribute('src', pizzaJson[i].image)

            let title = qs('.title-cart');
            title.textContent = pizzaJson[i].name;
            
            let description = qs('.description-cart');
            description.textContent = pizzaJson[i].description;

            let price = qs('#price');
            price.innerHTML = pizzaJson[i].price.g.toFixed(2).toString().replace('.', ',')

            let qtdPizzas = qs('#qtd-pizzas-menu');
            qtdPizzas.innerHTML = 1
            
            pizzaID = pizzaJson[i].id;
        }
    }
}

function setBasePrice() {
    let active = qs('.active');

    if (active.classList.contains('g')) {
        for (let i in pizzaJson) {
            if (pizzaID === pizzaJson[i].id) {
                let basePrice = pizzaJson[i].price.g

                return basePrice
            }
        }
    }
    if (active.classList.contains('m')) {
        for (let i in pizzaJson) {
            if (pizzaID === pizzaJson[i].id) {
                let basePrice = pizzaJson[i].price.m

                return basePrice
            }
        }
    }
    if (active.classList.contains('p')) {
        for (let i in pizzaJson) {
            if (pizzaID === pizzaJson[i].id) {
                let basePrice = pizzaJson[i].price.p.toFixed(2)

                return basePrice
            }
        }
    }
}

function openMenuCentral(e) {
    const targetEl = e.target
    const parentEl = targetEl.parentNode
    parentCard = parentEl.parentNode
    
    createMenuCentral()
    setBasePrice();

    menuCentralContainer.classList.remove('hide');
    containerPrincipal.classList.add('menu-central');

    if (window.innerWidth <= 744) {
        qs('#menu').classList.add('hide')
    }
}


cardButton.forEach(element => {
    element.setAttribute('onclick', 'openMenuCentral(event)')
});


    //* EVENTOS DO MENU CENTRAL

        // IMPORTS
let price = qs('#price');
let qtdPizzasText = qs('#qtd-pizzas-menu');
let cancelBtn = qs('.cancel');


        // SELECTION SIZE EVENTS
function getP() {
    qs('.size-button.active').classList.remove('active')
    qs('p').classList.add('active')

    for (let i in pizzaJson) {
        if (pizzaID === pizzaJson[i].id) {
            price.textContent = pizzaJson[i].price.p.toFixed(2).toString().replace('.', ',')
        }
    }

    qtdPizzasText.textContent = 1
}
function getM() {
    qs('.size-button.active').classList.remove('active')
    qs('m').classList.add('active')

    for (let i in pizzaJson) {
        if (pizzaID === pizzaJson[i].id) {
            price.textContent = pizzaJson[i].price.m.toFixed(2).toString().replace('.', ',')
        }
    }

    qtdPizzasText.textContent = 1
}
function getG() {
    qs('.size-button.active').classList.remove('active')
    qs('g').classList.add('active')

    for (let i in pizzaJson) {
        if (pizzaID === pizzaJson[i].id) {
            price.textContent = pizzaJson[i].price.g.toFixed(2).toString().replace('.', ',')

        }
    }

    qtdPizzasText.textContent = 1
}


        // CANCEL BUTTON
function closeMenu() {
    menuCentralContainer.classList.add('hide');
    containerPrincipal.classList.remove('menu-central');

    qs('.size-button.active').classList.remove('active')
    g.classList.add('active')
}


    //  QTD PIZZAS
let newBasePrice;
let infoReturn;

function qtdPizzas(element) {
let basePrice = setBasePrice()
let result = 0;
let numPizza = 0;
    

    if (element.classList.contains('plus')) {
        numPizza = parseInt(qtdPizzasText.textContent)
        numPizza += 1
        qtdPizzasText.textContent = numPizza

        result = basePrice * numPizza
        price.textContent = result.toFixed(2).toString().replace('.', ',');

        
    } else if (element.classList.contains('minus')) {

        numPizza = parseInt(qtdPizzasText.textContent)

        if (numPizza <= 1) {
            return
        }

        qtdPizzasText.textContent = numPizza - 1

        newBasePrice = parseFloat(price.innerHTML.replace(',', '.'));
        
        result = newBasePrice - basePrice

        price.textContent = result.toFixed(2).toString().replace('.', ',');

        numPizza -= 1
    } 
    
    


}

    // ADD CART BUTTON
let cartPreviewContainer = document.querySelector('.preview-container');
let pizzasOnCart = [];

if (pizzasOnCart.length == 0) {
    qs('.preview-container').innerHTML = '<p>Adicione Itens ao Carrinho</p>'
}
