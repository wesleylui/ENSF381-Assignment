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

/*---------------------------------------------------------*/


function addToCart(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the product name and price from the clicked product
    const productName = event.target.parentElement.querySelector('.product-name').textContent;
    const productPrice = parseFloat(event.target.parentElement.querySelector('.price').textContent.replace('$', ''));

    // Check if the product is already in the cart
    const cartItem = document.querySelector(`.cart-items li[data-name="${productName}"]`);

    if (cartItem) {
        const quantityElement = cartItem.querySelector('.quantity');
        const currentQuantity = parseInt(quantityElement.textContent);
        quantityElement.textContent = currentQuantity + 1;
    } else {
        const cartItems = document.querySelector('.cart-items');
        const li = document.createElement('li');
        li.dataset.name = productName;
        li.innerHTML = `
            ${productName} - ${productPrice.toFixed(2)} - <span class="quantity">1</span>
            <button class="remove-btn">Remove</button>
        `;
        cartItems.appendChild(li);

        // Add event listener to the remove button
        const removeButton = li.querySelector('.remove-btn');
        removeButton.addEventListener('click', removeFromCart);
    }
    // Show an alert confirming that the product has been added to the cart
    alert(`${productName} has been added to the cart.`);
}

function removeFromCart(event) {
    // Get the parent list element of the clicked remove button
    const cartItem = event.target.parentElement;

    // Get the quantity element
    const quantityElement = cartItem.querySelector('.quantity');

    // Decrement the quantity by one
    let currentQuantity = parseInt(quantityElement.textContent);
    currentQuantity--;

    if (currentQuantity === 0) {
        cartItem.remove();
    } else {
        quantityElement.textContent = currentQuantity;
    }

}


