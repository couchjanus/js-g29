'use strict';
// 
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
// 
let cart = [];
let wishlist = [];
const modalWindow = document.querySelector('.modal-window');
const productsInCart = document.querySelector('.products-in-cart');
function saveWishlist(wishlist) {
    Store.set('wishlist', wishlist);
}
function saveCart(cart) {
    Store.set('basket', cart);
}

const productContainer = document.querySelector('.product-container');

const totalNumberItemsInWishlist = document.querySelector('#total-number-items-in-wishlist');

const totalNumberItemsInCart = document.querySelector('#total-number-items-in-cart');



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
    let inWishlist = wishlist.some(e => e.id === item.id);

    if(!inWishlist) {
        wishlist = [...wishlist, item];
        saveWishlist(wishlist);
        wishlistItemsAmount(wishlist)
    }  
}

function addProductToWishlistButton() {
    let addToWishlistButtons = document.querySelectorAll('.add-to-wishlist');

    addToWishlistButtons.forEach((item) => {
        item.addEventListener('click', (event) => {
            // totalNumber(1);
            let productId = event.target.closest('.icons').dataset.id;
            // console.log('Pagent value = ', event.target.closest('.icons').dataset.id)
            addProductToWishlist({id: productId, price: products[+productId-1].price})
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
    
    saveCart(cart);
    cartItemsAmount(cart);
}

function addProductToCartButton() {
    let addToCartButtons = document.querySelectorAll('.add-to-cart');

    addToCartButtons.forEach((item) => {
        item.addEventListener('click', (event) => {

            let productId = event.target.closest('.icons').dataset.id;
            
            addProductToCart({id: productId, price: products[+productId-1].price})
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


const cartItemTemplate = (amount, product) => `<tr class="cart-item" id='id${product.id}'>
<td class="ps-0 py-3 border-light" scope="row">
  <a class="reset-anchor d-block" href="detail.html"><img src="${product.image}" alt="${product.name}" width="70"></a>
</td>
<td class="ps-0 py-3 border-light" scope="row">
    <strong><a class="reset-anchor" href="detail.html">${product.name}</a></strong>
</td>
<td class="p-3 align-middle border-light">
  <p class="mb-0 small">$${product.price}</p>
</td>

<td class="p-3 align-middle border-light">
  <div class="border d-flex align-items-center justify-content-between px-3"><span class="small text-uppercase text-gray headings-font-family">Quantity</span>
    <div class="quantity" data-id="${product.id}">
      <i class="fas fa-caret-left dec-btn"></i>
      <input class="form-control form-control-sm border-0 shadow-0 p-0" type="text" value="${amount}">
      <i class="fas fa-caret-right inc-btn"></i>
    </div>
  </div>
</td>
<td class="p-3 align-middle border-light">
  <p class="mb-0 small">$<span class="product-subtotal"></span></p>
</td>
<td class="p-3 align-middle border-light"><a class="reset-anchor" href="#!"><i class="fas fa-trash-alt small text-muted" data-id="${product.id}"></i></a></td>
</tr>`;

const findItem = (items, id) => items.find(item => item.id == id);

const populateShoppingCart = (cart, products) => {
    let result = '';
    // let id = 3;
    // console.log(findItem(products, id));
    cart.forEach(item => result += cartItemTemplate(item.amount, findItem(products, item.id)));
    return result;
}

const filterItem = (cart, id) => cart.filter(item => item.id != id);


function setCartTotal(cart) {
    let tmpTotal = 0;

    cart.map(item => {
        tmpTotal = item.price * item.amount;
        // console.log(productsInCart.querySelector(`#id${item.id} .product-subtotal`))
        productsInCart.querySelector(`#id${item.id} .product-subtotal`).innerText = parseFloat(tmpTotal.toFixed(2));

    });

    let subTotal = parseFloat(cart.reduce((prev, cur) => prev + cur.price * cur.amount, 0).toFixed(2));

    let cartTax = subTotal * 0.07;

    document.querySelector('.cart-subtotal').textContent = subTotal;
    document.querySelector('.cart-tax').textContent = cartTax.toFixed(2);
    document.querySelector('.cart-total').textContent = subTotal + cartTax;

}

function wishlistItemsAmount(wishlist) {
    totalNumberItemsInWishlist.textContent = wishlist.length;
}

function cartItemsAmount(cart) {
    totalNumberItemsInCart.textContent = cart.reduce((prev, cur) => prev + cur.amount, 0);
}

function renderCart() {
    productsInCart.addEventListener('click', event => {
        if(event.target.classList.contains('fa-trash-alt')) {
            cart = filterItem(cart, event.target.dataset.id);
            saveCart(cart);
            setCartTotal(cart);
            cartItemsAmount(cart);
            event.target.closest('.cart-item').remove();
        }
        else if (event.target.classList.contains('dec-btn')) {
            let tmp = findItem(cart, event.target.closest('.quantity').dataset.id);

            if (tmp !== undefined && tmp.amount > 1) {
                tmp.amount -= 1;
                event.target.nextElementSibling.value = tmp.amount;
            } else {
                cart = filterItem(cart, event.target.closest('.quantity').dataset.id);
                event.target.closest('.cart-item').remove();
            }
            saveCart(cart);
            setCartTotal(cart);
            cartItemsAmount(cart);
        }
        else if (event.target.classList.contains('inc-btn')) {
            let tmp = findItem(cart, event.target.closest('.quantity').dataset.id);
            tmp.amount += 1;
            event.target.previousElementSibling.value = tmp.amount;
            saveCart(cart);
            setCartTotal(cart);
            cartItemsAmount(cart)
        }
    })


}

function distinctSections(items) {
    let mapped = [...items.map(item => item.section)];
    let unique = [...new Set(mapped)];
    // console.log(unique)
    return unique;
}

const categoriesId = document.getElementById('categories');

let sectionName = section => {
    let div = document.createElement('div');
    div.setAttribute('class', 'py-2 px-4 bg-dark text-white mb-3');
    div.innerHTML = `<strong class="text-uppercase fw-bold">${section}</strong>`;
    return div;
}

let liElement = (obj) => `<li class="mb-2"><a class="reset-anchor category-item" href="#!" data-id="${obj.id}">${obj.name}</a></li> `;


let ulElement = items => {
    let ul = document.createElement('ul');
    ul.setAttribute('class', 'list-unsyled text-muted categories');

    let result = '';
    for (let item of items) {
        result += liElement(item);
    }
    ul.innerHTML = result;
    return ul;
}

function categoriesCollation(items, categories) {
    let results = [];
    let i = 0;
    for (let section of items) {
        results[i] = categories.filter(item => item.section === section);
        i++;
    }
    return results;
}

function renderCategory(selector, products) {
    const categorySelectors = document.querySelectorAll(selector);
    categorySelectors.forEach(item => item.addEventListener('click', e => {
        e.preventDefault();

        if (e.target.classList.contains('category-item')) {
            const category = e.target.dataset.id;

            const categoryFilter = items => items.filter(item => item.category == category);

            productContainer.innerHTML = populateProductList(categoryFilter(products));
        } else {
            productContainer.innerHTML = populateProductList(products);
        }

    }))
}

const showOnly = document.querySelector('.show-only');

const badgeTemplate = (item) => `<div class="form-check mb-1"><input class="form-check-input" type="checkbox" id="id-${item}" value="${item}" name="badge"><label class="form-check-label" for="id-${item}">${item}</label></div>`

const renderValue = (value, products) => populateProductList(products.filter(product => product.badge.title.includes(value)));


const selectPicker = document.querySelector('.selectpicker');

const sortingOrders = [
    {key: "default", value: "Default sorting"},
    {key: "popularity", value: "Popularity Products"},
    {key: "low-high", value: "Low to High Prices"},
    {key: "high-low", value: "High to Low Prices"},
];

const sortingOptions = sortingOrders.map(item => `<option value="${item.key}">${item.value}</option>`).join('');

let compare = (key, order = 'asc') => (a, b) => {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) return 0;

    const A = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key];
    const B = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key];

    let comparison = 0;
    comparison = (A > B) ? 1 : -1;
    return (order === 'desc') ? -comparison : comparison;

}

const svgContent = index => {
    switch(index) {
        case 0:
            return `<path d="M62 46v-5l-8-7h-8"></path>
            <circle cx="24" cy="54" r="4"></circle>
            <circle cx="54" cy="54" r="4"></circle>
            <path d="M50 54H28m-8 0h-4v-8h46v8h-4M24.5 24H46v22m-30 0V29.8M2 38h6m-2 8h2"></path>
            <circle cx="14" cy="18" r="12"></circle>
            <path d="M14 12v8h6"></path>`;
        case 1:
            return ` <path d="M52.3 48.8c1.2.8 3 1.9 2.7 4.3S51 62 43 62s-17.7-6.3-26.2-14.8S2 28.9 2 21 9 9.3 10.9 9s3.6 1.5 4.3 2.7l6 9.2a4.3 4.3 0 0 1-1.1 5.8c-2.6 2.1-6.8 4.6 2.9 14.3s12.3 5.4 14.3 2.9a4.3 4.3 0 0 1 5.8-1.1z"></path>
            <path d="M54 2l-6 14h14m-4-6v12m-14 0H32l8.5-10v-.2A6 6 0 0 0 32 3.6"></path>`;
        case 2:
            return `<path 
            d="M25.6 61L3 38.4 38.4 3l21.2 1.4L61 25.6 25.6 61z"></path>
          <circle cx="48" cy="15" r="4" ></circle>
          <path d="M31.3 21.4l11.3 11.3m-22.6 0l8.5 8.5M25.6 27l5.7 5.7"></path>`;
    }
}

function makeIcon(node, i) {
    const svgIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg')

    svgIcon.setAttribute('fill', 'none')
    svgIcon.setAttribute('viewBox', '0 0 64 64')

    svgIcon.setAttribute('stroke', 'black')

    svgIcon.classList.add('svg-icon', 'svg-icon-big')

    svgIcon.innerHTML = svgContent(i)
    // svgIcon.innerHTML = `<circle cx="48" cy="15" r="4"></circle>`

    return node.append(svgIcon)
   
}

const makeServiceBlock = () => {

    const serviceDescription = [
        {
            title: 'Free shipping',
            description: 'Free shipping worldwide'
        },
        {
            title: '24 x 7 service',
            description: 'Free shipping worldwide'
        },
        {
            title: 'Festivaloffers',
            description: 'Free shipping worldwide'
        },
    ]


    const srvContainer = item => `<div class="col-lg-4 px-3">
    <div class="d-inline-block">
    <div class="d-flex align-items-end icon srv">
        
        <div class="text-start ms-3">
        <h6 class="text-uppercase mb-1">${item.title}</h6>
        <p class="text-sm mb-0 text-muted">${item.description}</p>
        </div>
    </div>
    </div>
    </div>`;


    let result = ''

    for (let i=0; i<serviceDescription.length; i++) {
        result += srvContainer(serviceDescription[i])
    }
    return result
}

function fetchData(url) {
    return fetch(url, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    }).then(response => {
        if(response.status >= 400) {
            return response.json().then(err => {
                const error = new Error('Something wend wrong!')
                error.data = err
                throw error
            })
        }
        return response.json()
    })
}

const url = 'https://my-json-server.typicode.com/couchjanus/db';

window.addEventListener("DOMContentLoaded", (event) => {
    
    (() => {
        cart = Store.init('basket');
        wishlist = Store.init('wishlist');

        cartItemsAmount(cart)
        wishlistItemsAmount(wishlist)

        const services = document.querySelector('.services')

        if (services) {
            services.innerHTML = makeServiceBlock()

            let srv = document.querySelectorAll(".srv")

            srv.forEach((node, i) => makeIcon(node, i))
        }


        // distinctSections(categories)

        fetchData(`${url}/products`)

        .then(products => {
            // console.log(products)

       

        if (productsInCart) {
            // console.log(productsInCart)
            productsInCart.innerHTML = populateShoppingCart(cart, products);
            setCartTotal(cart);
            renderCart();
        }
        

        if (productContainer) {
            productContainer.innerHTML = populateProductList(products);
            addProductToWishlistButton();
            addProductToCartButton();
            detailButton(products);

            if (categoriesId) {
                fetchData(`${url}/categories`)
                .then(categories => {

               
                let distinct = distinctSections(categories);

                for (let i = 0; i < distinct.length; i++) {
                    let collation = categoriesCollation(distinct, categories);
                    
                    categoriesId.append(sectionName(distinct[i]));
                    categoriesId.append(ulElement(collation[i]));

                }
                renderCategory('#categories', products);

            })
            }

            if (showOnly) {

                let badges = [...new Set([...products.map(item => item.badge.title)].filter(item => item != ''))];

                showOnly.innerHTML = badges.map(item => badgeTemplate(item)).join("");

                let checkboxes = document.querySelectorAll('input[name="badge"]');

                let values = [];

                checkboxes.forEach(item => {
                    item.addEventListener('change', e => {
                        if (e.target.checked) {
                            values.push(item.value)

                            productContainer.innerHTML = values.map(value => renderValue(value, products)).join("")
                        } else {
                            if (values.length != 0) {
                                values.pop(item.value)
                                productContainer.innerHTML = values.map(value => renderValue(value, products)).join("")
                            }
                        }

                        if (values.length == 0) {
                            productContainer.innerHTML = populateProductList(products);
                        }
                    })
                })


            }

            if (selectPicker) {
                selectPicker.innerHTML = sortingOptions;

                selectPicker.addEventListener('change', function() {
                    switch(this.value) {
                        case 'low-high':
                            productContainer.innerHTML = populateProductList(products.sort(compare('price', 'asc')));
                            break;

                        case 'high-low':
                            productContainer.innerHTML = populateProductList(products.sort(compare('price', 'desc')));
                            break;
                        case 'popularity':
                            productContainer.innerHTML = populateProductList(products.sort(compare('stars', 'desc')));
                            break;
                        default:
                            productContainer.innerHTML = populateProductList(products.sort(compare('id', 'asc')));
                    }
                })
            }
        }
    }) // end fetch
    })();

})