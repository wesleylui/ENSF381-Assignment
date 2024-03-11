var inShoppingCartList = [];
var shoppingCartOrder = [];

function countElements(arr, element) {
    var count = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === element) {
            count++;
        }
    }
    return count;
}

function removeCart(index, shoppingCart) {
    let cartElement = index;
    let position = shoppingCartOrder.indexOf(cartElement)
    var shoppingCartTexts = document.getElementsByClassName("cart-text");
    let indexToRemove = inShoppingCartList.indexOf(cartElement);

    if (indexToRemove !== -1) {
        inShoppingCartList.splice(indexToRemove, 1);
    }

    if (!inShoppingCartList.includes(cartElement)) {
        let indexToRemove = shoppingCartOrder.indexOf(cartElement);
        if (indexToRemove !== -1) {
            shoppingCartOrder.splice(indexToRemove, 1);
        }
        let position = shoppingCartOrder.indexOf(cartElement)
        const childElements = shoppingCart.children
        shoppingCart.removeChild(childElements[indexToRemove+1])
    }
    else {
        let count = countElements(inShoppingCartList, cartElement);
        var productNames = document.getElementsByClassName("product-title");
        var prices = document.getElementsByClassName("price-tag");
        shoppingCartTexts[position].textContent = `${productNames[cartElement].textContent} - ${prices[cartElement].textContent} - ${count}`;
    }                   
    console.log(inShoppingCartList);
    console.log(shoppingCartOrder);
    let count = countElements(inShoppingCartList, cartElement);
}

function addCart(id) {
    var index = parseInt(id);
    var productNames = document.getElementsByClassName("product-title");
    var prices = document.getElementsByClassName("price-tag");
    alert(`${productNames[index].textContent} has been added to the cart`);

    inShoppingCartList.push(index);

    if (!shoppingCartOrder.includes(index)) {
        shoppingCartOrder.push(index);
    }

    let count = countElements(inShoppingCartList, index);
    console.log(inShoppingCartList);
    console.log(shoppingCartOrder);


    if (count <= 1) {
        var cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        var cartText = document.createElement("p");
        cartText.className = "cart-text";
        cartText.textContent = `${productNames[index].textContent} - ${prices[index].textContent} - 1`;
        var cartBtn = document.createElement("button");
        cartBtn.className = "cart-button";
        cartBtn.textContent = "Remove";
        let position = shoppingCartOrder.indexOf(index);
        cartBtn.onclick = () => {removeCart(index, shoppingCart, productNames, prices)};
        cartItem.append(cartText);
        cartItem.appendChild(cartBtn);
        var shoppingCart = document.getElementById("shopping-cart");
        shoppingCart.appendChild(cartItem);
        console.log(shoppingCart);
    }
    else {
        let cartElement = index;
        let position = shoppingCartOrder.indexOf(cartElement);
        var shoppingCartTexts = document.getElementsByClassName("cart-text");
        shoppingCartTexts[position].textContent = `${productNames[cartElement].textContent} - ${prices[cartElement].textContent} - ${count}`;
    }
}
