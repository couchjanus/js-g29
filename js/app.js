'use strict';



// const totalNumberItemsInWishlist = document.getElementById('total-number-items-in-wishlist')

// console.log(totalNumberItemsInWishlist)

// console.log(totalNumberItemsInWishlist.innerText)

// totalNumberItemsInWishlist.innerText = 5

// console.log(totalNumberItemsInWishlist.innerText)

// let addToWishlist = document.querySelector('.add-to-wishlist')
// console.log(addToWishlist)



let products = document.querySelectorAll('.product');

// console.log(products[products.length-2]);

console.log(products[6]);

console.log(typeof(products));

console.log(typeof([]));

let arr = [1,2,3,4,5,6,7];

// console.log(arr[arr.length-1]);

// for (let i = 0; i < arr.length; i++) {
//     console.log(i);
// }

// for (let i = 0; i < products.length; i++) {
//     console.log(products[i]);
// }


// let i = 0;

// while (8 < arr.length) {
//     console.log(i);
//     i++;
// }

// while (i < products.length) {
//     console.log(products[i]);
//     i++;
// }

// do {
//     console.log(i);
//     i++;
// } while (i < arr.length)


// for (let i of arr) {
//     console.log(arr[i]);
// }

// products.forEach()
console.log(fnDec())

function fnDec() {
    return "Declaration fn";
}


// console.log(fnExp())

let fnExp = function() {
    return 'Function expression';
}

console.log(fnExp())


function addTest() {
    totalNumberItemsInWishlist.innerText = ++totalNumberItemsInWishlist.innerText
}
const totalNumberItemsInWishlist = document.getElementById('total-number-items-in-wishlist')
let addToWishlist = document.querySelector('.add-to-wishlist')

// addToWishlist.addEventListener('click', addTest)

addToWishlist.addEventListener('click', function() {
    totalNumberItemsInWishlist.innerText = ++totalNumberItemsInWishlist.innerText
});

let shopingCartItems = [];


products.forEach(function(product) {
    // console.log(product.querySelector('h3').innerText)
    // console.log(product.querySelector('.price').innerText)

    product.querySelector('.add-to-cart').addEventListener('click', function() {
        console.log(product.querySelector('h3').innerText)
        console.log(product.querySelector('.price').innerText)
        let shopingCatrItem = {
            name: '',
            price: 0
        }        

        shopingCatrItem.name = product.querySelector('h3').innerText
        shopingCatrItem.price = +product.querySelector('.price').innerText
        shopingCartItems.push(shopingCatrItem)
        console.log(shopingCartItems)
    })
    
})

// function counter() {

//     let value = 0;

//     return function(incrementer) {
//         value += incrementer;
//         console.log(value);
//     }
// }

// let totalNumber = counter();

// totalNumber(1)
// totalNumber(10)
// totalNumber(1)
// totalNumber(1)


function counter() {

    let value = +totalNumberItemsInWishlist.innerText;

    return function(incrementer) {
        value += incrementer;
        totalNumberItemsInWishlist.innerText = value
        console.log(value);
    }
}

let totalNumber = counter();

let addToWishlistButtons = document.querySelectorAll('.add-to-wishlist');

addToWishlistButtons.forEach(function(item) {
    item.addEventListener('click', function() {
        totalNumber(1);
    })
});

function main() {

}

// () => {} function() {return }
window.addEventListener("DOMContentLoaded", (event) => {
    console.log('DOM fully loaded and parsed');
    (() => {
        console.log(event)
        main()
    })();

})