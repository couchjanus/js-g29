'use strict';

class Store {

    static init(key) {
        if (!Store.isset(key)) {
            Store.set(key, []);
        }
        return Store.get(key);
    }

    static get(key) {
        let value = localStorage.getItem(key);
        return value === null ? null : JSON.parse(value);
    }

    static set(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    static isset(key) {
        return this.get(key) !== null;
    }
}

let cart = [];
let wishlist = [];
const modalWindow = document.querySelector('.modal-window');
function saveWishlist(wishlist) {
    Store.set('wishlist', wishlist);
}
function saveCart(cart) {
    Store.set('basket', cart);
}

const productContainer = document.querySelector('.product-container');

let productItemTemplate = (product) => `<div class="product">
<div class="icons" data-id="${product.id}">
  <a href="#!" class="fas fa-shopping-cart add-to-cart"></a>
  <a href="#!" class="fas fa-heart add-to-wishlist"></a>
  <a href="#productView" class="fas fa-eye detail"></a>
</div>
<div class="image">
  <div class="badge text-white bg-${product.badge.bg}">${product.badge.title}</div>
  <img src="${product.image}">
</div>

<div class="content">
  <h3>${product.name}</h3>
  <div>$<span class="price">${product.price}</span></div>
</div>
</div>`;


function populateProductList(products) {
    let content = '';
    for (const item of products) {
        content += productItemTemplate(item);
    }
    return content;
}

let modalTemplate = product => `<div class="modal" id="productView">
<div class="modal-dialog">

  <div class="modal-content overflow-hidden border-0">

    <a href="#" class="p-4 close btn-close"><i class="fas fa-times"></i></a>

    <div class="modal-body">

      <div class="row align-items-stretch">

        <div class="col-lg-6">

          <div class="bg-center bg-cover d-block h-100"
            style="background: url(${product.image})"></div>

        </div>

        <div class="col-lg-6">

          <div class="p-4 my-md-4">

            <ul class="list-inline mb-2">

            </ul>

            <h2 class="h4">${product.name}</h2>
            <p class="text-muted">$${product.price}</p>
            <p class="text-sm mb-4">${product.description}</p>

            <div class="row align-items-stretch mb-4 btn-block">

              <div class="col-sm-7">
                <div class="d-flex align-items-center justify-content-between py-1 px-3"><span
                    class="text-uppercase mr-4">Quantity</span>
                  <div class="quantity">
                    <i class="fas fa-caret-left dec-btn"></i>
                    <input class="form-control" type="text" value="1">
                    <i class="fas fa-caret-right inc-btn"></i>
                  </div>
                </div>
              </div>

              <div class="col-sm-5">
                <a class="btn btn-primary w-100 d-flex align-items-center justify-content-center" href="#!">Add to cart</a>
              </div>

            </div>

            <a class="btn btn-link text-dark text-decoration-none" href="#!"><i class="far fa-heart"></i>Add to
              wish list</a>

          </div>

        </div>

      </div>
    </div>
  </div>
</div>
</div>
`;

function addProductToWishlist(item = {}) {
    wishlist = [...wishlist, item];
    // console.log(wishlist);
    saveWishlist(wishlist)
}

function addProductToWishlistButton() {
    let addToWishlistButtons = document.querySelectorAll('.add-to-wishlist');

    addToWishlistButtons.forEach((item) => {
        item.addEventListener('click', (event) => {
            // totalNumber(1);
            let productId = event.target.closest('.icons').dataset.id;
            // console.log('Pagent value = ', event.target.closest('.icons').dataset.id)
            addProductToWishlist({id: productId, name: products[+productId-1].name, price: products[+productId-1].price})
        })
    });
}

function addProductToCart(product, amount=1) {

    let inCart = cart.some(element => element.id === product.id);

    if (inCart) {
        cart.forEach(item => {
            if(item.id === product.id) {
                item.amount += amount;
            }
        })
    } else {
        let cartItem = {...product, amount:amount};
        cart = [...cart, cartItem];
    }
    
    saveCart(cart)
}

function addProductToCartButton() {
    let addToCartButtons = document.querySelectorAll('.add-to-cart');

    addToCartButtons.forEach((item) => {
        item.addEventListener('click', (event) => {

            let productId = event.target.closest('.icons').dataset.id;
            // console.log('Pagent value = ', event.target.closest('.icons').dataset.id)
            addProductToCart({id: productId, name: products[+productId-1].name, price: products[+productId-1].price})
        })
    });
}

function toggleModal(cart, param, product={}) {
    if (modalWindow.innerHTML == '') {
        modalWindow.innerHTML = modalTemplate(product);
    }else {
        modalWindow.innerHTML = '';
    }
    modalWindow.style.display = param;
}

function detailButton(products) {
    let detailButtons = document.querySelectorAll('.detail');

    detailButtons.forEach((item) => {
        item.addEventListener('click', (event) => {

            let productId = event.target.closest('.icons').dataset.id;
           
            // console.log(products)
            let product = products.find(item => item.id === +productId);
            console.log(product)
            toggleModal(cart, 'block', product);
        })
    });
}

window.addEventListener("DOMContentLoaded", (event) => {
    
    (() => {
        cart = Store.init('basket');
        wishlist = Store.init('wishlist');

        if (productContainer) {
            productContainer.innerHTML = populateProductList(products);
            addProductToWishlistButton();
            addProductToCartButton();
            detailButton(products);
        }
    })();

})