'use strict';

// alert("Hello from outside script")

/**
 * documatations
 */

// token

var a = 1;

// block
{
    const b = 1;
    // b = 5
    a = 77;
    let c = a + b;
}
let b = 2;
let c = a + b;
// + - */ %
let C;
console.log(typeof(c))
console.log(typeof('c'))
console.log(typeof(true))
console.log(typeof(C))
console.log(typeof(null))

c++ // c = c + 1
++c
--c // c = c -1
c-- 

let f1 = 0.1
let f2 = 0.2

console.log(f1 + f2)


if (f1 + f2 == 0.3) {
    console.log('0.3')
}

if (c < 2) {
    console.log('This is True')
}
else if(c == 0) {
    console.log('This is 0')
}
else {
    console.log('This is False')
    console.log('c = ', c)
}



console.log('Hello' + 'String')

console.log(1 + 'String')

console.log('Hello' + 1)

console.log(6/0)

function div(x, y) {
    if (y == 0) {
        return "Error ZeroDiv"
    }
    return x / y
}

// console.log(typeof(div))

console.log(div(8, 10))

console.log(document.documentElement)

console.log(document.body)
// document.all[33].style.backgroundColor = '#aa0033'
console.log(document.all[33].style.backgroundColor)

// document.body.innerHTML = 'Hello Java Script'

const totalNumberItemsInWishlist = document.getElementById('total-number-items-in-wishlist')

console.log(totalNumberItemsInWishlist)

console.log(totalNumberItemsInWishlist.innerText)

totalNumberItemsInWishlist.innerText = 5

console.log(totalNumberItemsInWishlist.innerText)

let addToWishlist = document.querySelector('.add-to-wishlist')
console.log(addToWishlist)

function addTest() {
    totalNumberItemsInWishlist.innerText = ++totalNumberItemsInWishlist.innerText
}
addToWishlist.addEventListener('click', addTest)