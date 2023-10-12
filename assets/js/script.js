//* IMPORTAÇÃO
const qs = (el) => document.querySelector(el);
const qsa = (el) => document.querySelectorAll(el);

let pizzaID;
let modalQt;
let basePrice;
let size;
let key;


//* CRIAÇÃO DOS CARDS DINÂMICAMENTE
pizzaJson.map((pizza, index) => {
  let pizzaCard = qs(".models .pizza-card--menu--container").cloneNode(true);

  pizzaCard.setAttribute("data-key", index);
  pizzaCard.querySelector(".pizza-card--img").setAttribute("src", pizza.image);
  pizzaCard.querySelector(".pizza-card--title").innerHTML = pizza.name;
  pizzaCard.querySelector(".pizza-card--desc").innerHTML = pizza.description;
  pizzaCard.querySelector(".pizza-card--button--img").setAttribute("src", "/assets/img/add_pizza_btn.svg");

  qs("#menu .pizza-cards--area").append(pizzaCard);
});



//*ABRIR O MODAL
function openMenuCentral(e) {
  key = parseInt(e.parentElement.getAttribute("data-key"));
  modalQt = 1;

  qs("#menu-central").classList.remove("hide");

  if (window.innerWidth <= 744) {
    qs("#menu").classList.add("hide");
  }

  qs("#menu-central #pizza-card--img").setAttribute("src", pizzaJson[key].image);
  qs("#menu-central .pizza-card--title").textContent = pizzaJson[key].name;
  qs("#menu-central .pizza-card--desc").textContent = pizzaJson[key].description;
  qs("#price").innerHTML = pizzaJson[key].info[2].price.toFixed(2).toString().replace(".", ",");
  qs("#qtd-pizzas-menu").innerHTML = modalQt;

  pizzaID = pizzaJson[key].id;



  //* BOTÕES DO SIZE
  qs(".size-button.active").classList.remove("active");
  basePrice = pizzaJson[key].info[2].price;

  qsa(".size-button").forEach((sizeBtn, sizeIndex) => {
    if (sizeIndex == 2) {
      sizeBtn.classList.add("active")
      size = pizzaJson[key].info[sizeIndex].size
    }

    sizeBtn.addEventListener("click", () => {
      qs("#price").innerHTML = pizzaJson[key].info[sizeIndex].price.toFixed(2).replace(".", ",");
      qs(".size-button.active").classList.remove("active");
      sizeBtn.classList.add("active");

      modalQt = 1;

      qs("#qtd-pizzas-menu").innerHTML = modalQt;

      basePrice = pizzaJson[key].info[sizeIndex].price.toFixed(2);
      basePrice = parseFloat(basePrice)

      size = pizzaJson[key].info[sizeIndex].size
    });
  });
}



//* BOTOES DE QTD PIZZA MODAL
let result;
qs("#menu-central .plus").addEventListener("click", () => {
  modalQt++
  result = basePrice * modalQt

  qs("#qtd-pizzas-menu").textContent = modalQt;
  qs("#price").textContent = (result).toFixed(2).replace('.', ',')
})
qs("#menu-central .minus").addEventListener("click", () => {
  if (modalQt <= 1) {
    return
  }

  qs("#price").textContent = (result - basePrice).toFixed(2).replace('.', ',')
  result = result - basePrice

  modalQt--
  qs("#qtd-pizzas-menu").textContent = modalQt;
})



//* ADICIONAR AO CARRINHO BUTTON
let cart = [];

qs(".add-cart-btn").addEventListener("click", () => {
  let pizzaCard = qs(".pizza-card--cart--container").cloneNode(true);
  let cartQt = modalQt

  pizzaCard.querySelector(".pizza-card--img").setAttribute("src", pizzaJson[key].image);
  pizzaCard.querySelector(".pizza-card--title").textContent = `${pizzaJson[key].name} (${size.toUpperCase()})`;
  pizzaCard.querySelector(".qtd-pizzas").textContent = cartQt;

  if (modalQt == 1) {
    result = basePrice
  }

  let identifier = `${pizzaJson[key].id}@${size}`

  let newKey = cart.findIndex(obj => obj.identifier == identifier)

  if (newKey != -1) {
    cart[newKey].qt += modalQt
    cart[newKey].price += basePrice * modalQt
    cart[newKey].html.querySelector(".qtd-pizzas").textContent = cart[newKey].qt;
  } else {
    cart.push({
      identifier,
      size,
      html: pizzaCard,
      qt: cartQt,
      basePrice: basePrice,
      price: result
    });
  }

  alert("Item adicionado ao Carrinho!");

  cart.map(pizzaCard => {
    qs("#cart .pizza-cards--area").appendChild(pizzaCard.html);
    qs(".circle").classList.remove("hide");
  });

  calculatePrices()
  closeMenu()
});



//* CALCULAR OS PREÇOS DO CARRINHO
function calculatePrices() {
  let discount = 0.1
  let somaPreco = cart.reduce((acumulador, pizzaCard) => {
    return acumulador + pizzaCard.price
  }, 0)

  qs("#cart .sub-price").innerHTML = somaPreco.toFixed(2).replace(".", ",")
  qs("#cart .disc-price").innerHTML = (somaPreco - (somaPreco * (1 - discount))).toFixed(2).replace(".", ",")
  qs("#cart .total-price").innerHTML = (somaPreco * (1 - discount)).toFixed(2).replace(".", ",")
}


//* CLOSE MODAL BUTTON

function closeMenu() {
  modalQt = 1;

  qs("#menu-central").classList.add("hide");
  qs(".container").classList.remove("menu-central");

  if (qs("#menu").classList.contains("hide")) {
    qs("#menu").classList.remove("hide");
  }
}



//*     CARRINHO    *//

//* ABRIR E FECHAR CARRINHO

function toggleCart(el) {
  qs("#menu .pizza-cards--area").classList.toggle("cart");
  qs(".content").classList.toggle("cart");
  qs("body").classList.toggle("cart");
  qs("#cart").classList.toggle("hide");

  closeMenu();

  if (!qs("#cart").classList.contains("hide")) {
    //CARRINHO ABERTO

    qs(".x").classList.remove("hide");
    qs(".x").classList.add("close-cart--button");

    qs(".cart-img").classList.add("hide");
    qs(".circle").classList.add("hide");

    if (window.innerWidth <= 744) {
      qs("#menu").classList.add("hide");
      qs("#cart").style.borderRadius = "0";
      qs("body").style.flexDirection = "column";
    }
  } else {
    //CARRINHO FECHADO
    qs("#cart").classList.add("hide");
    qs(".cart-img").classList.remove("hide");
    qs(".x").classList.add("hide");

    if (cart.length > 0) {
      qs(".circle").classList.remove("hide");
    } else {
      qs(".circle").classList.add("hide");
    }

    if (qs("#menu").classList.contains("hide")) {
      qs("#menu").classList.remove("hide");
    }
  }
}


//* BOTOES DE QTD PIZZA CARRINHO

function qtdPizzasCart(e) {
  if (e.target.classList.contains("plus") || e.target.parentElement.classList.contains("plus")) {
    let card = e.target.closest('.pizza-card--cart--container')
    console.log(card)

    cart.findIndex((obj, index) => {
      if (obj.html == card) {
        obj.qt++
        card.querySelector('.qtd-pizzas').textContent = obj.qt

        obj.price = obj.basePrice * obj.qt

        console.log(cart)
      }
    })
    calculatePrices()

  } else if (e.target.classList.contains("minus") || e.target.parentElement.classList.contains("minus")) {
    cart.findIndex((obj, index) => {
      let card = e.target.closest('.pizza-card--cart--container')

      if (obj.html == card) {
        obj.qt--

        if (obj.qt == 0) {  // EXCLUIR PIZZA DO CARRINHO
          let filteredList = cart.filter(pizzaCard => {
            if (pizzaCard.html == obj.html) {
              qs("#cart .pizza-cards--area").removeChild(pizzaCard.html)
            }
            return pizzaCard.html != obj.html
          })
          cart = filteredList
        }
        else if (obj.qt == 1) {
          obj.price = basePrice
        }
        else {
          obj.price = obj.price - obj.basePrice
        }

        if (cart.length == 0) {
          toggleCart()
        }

        card.querySelector('.qtd-pizzas').textContent = obj.qt
        calculatePrices()
        console.log(cart)
      }
    })
  }
}

qs("#finalize-buy").addEventListener("click", () => {
  alert("Seu pedido está em preparo, obrigado pela preferência!!")
})