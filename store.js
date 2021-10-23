if (document.readyState == 'loading'){
	document.addEventListener('DOMContentLoaded', ready)
} else {
	ready()

}

function ready() {

	//document class is everything inside your HTML : it has bunch of methods on it for querying(1st step) 

	var removeCartItemButtons = document.getElementsByClassName('btn-danger')
	console.log(removeCartItemButtons)

	//add event listeners now (2nd step)

	for (var i = 0; i < removeCartItemButtons.length; i++){
		var button = removeCartItemButtons[i]
		button.addEventListener('click', removeCartItem )
	}
		
	var quantityInputs = document.getElementsByClassName('cart-quantity-input')
	for(var i = 0; i < quantityInputs.length; i++) {
	    var input = quantityInputs[i]
	    input.addEventListener('change', quantityChanged) 	

	}

	var addToCartButtons = document.getElementsByClassName('shop-item-button')
	for(var i = 0; i < addToCartButtons.length; i++) {
		var button = addToCartButtons[i]
		button.addEventListener('click', addToCartClicked)

	}	

	document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
		
}

function purchaseClicked (event) {
	alert('Thank You for your purchase')   
	// now delete all the items of the cart
	var cartItems = document.getElementsByClassName('cart-items')[0]     // only one 'cart-items' so [0] used explicitly
	while(cartItems.hasChildNodes()){
		cartItems.removeChild(cartItems.firstChild)
	}
	updateCartTotal()
}

function removeCartItem(event) {
	var buttonClicked = event.target
	buttonClicked.parentElement.parentElement.remove()
	updateCartTotal()
}

function quantityChanged(event) {
 	var input = event.target   // to get input element
	if (isNaN(input.value) || input.value <=0) {  // to check if inp is no or not
		input.value = 1  // lowest possible value.
	}
	updateCartTotal()
}

function addToCartClicked(event) {
	var button = event.target
	var shopItem = button.parentElement.parentElement
	var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
	var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
	var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
	// console.log(title, price, imageSrc)

	// to add a new row
	addItemToCart(title, price, imageSrc)
	updateCartTotal()

}

function addItemToCart(title, price, imageSrc) {
	var cartRow = document.createElement('div')  // allows to create element of any type
	cartRow.classList.add('cart-row')	// for styling add class 'cart-row' to newly created cartROw
	var cartItems = document.getElementsByClassName('cart-items')[0]
	var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
	for(var i = 0; i < cartItemNames.length; i++) {
		if(cartItemNames[i].innerText == title) {
			alert('This item is already added to the cart')
			return 	
		}
	}
	var cartRowContents = `
		
                   <div class="cart-item cart-column">
                        <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
                        <span class="cart-item-title">${title}</span>
                    </div>
                    <span class="cart-price cart-column">${price}</span>
                    <div class="cart-quantity cart-column">
                        <input class="cart-quantity-input" type="number" value="1">
                        <button class="btn btn-danger" type="button">REMOVE</button>
                    </div> `
	cartRow.innerHTML = cartRowContents

	cartItems.append(cartRow)    // this will append the newly created cartRow at end of cartItems
	cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)   // to enable the remove btn functionality in newly added div
	cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('click', quantityChanged)
}

//update cart total value after removing (3rd step)
function updateCartTotal(){
	var cartItemContainer = document.getElementsByClassName('cart-items')[0]
	var cartRows = cartItemContainer.getElementsByClassName('cart-row')
	var total = 0
	for(var i = 0; i < cartRows.length; i++) {
		var cartRow = cartRows[i]
		var priceElement = cartRow.getElementsByClassName('cart-price')[0]
		var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
		//console.log(priceElement, quantityElement)
		var price = parseFloat(priceElement.innerText.replace('$', ''))
		var quantity = quantityElement.value
		total = total + (price * quantity) 
	}
	total = Math.round(total * 100 ) / 100  // to round off to 2 nearesr decimal places
	document.getElementsByClassName('cart-total-price')[0].innerText = '$'+ total 
}
