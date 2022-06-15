
let label = document.getElementById('label');
let ShoppingCart = document.getElementById('shopping-card');

let basket = JSON.parse(window.localStorage.getItem("data")) || [];

//Calculate total amount of items selected
let calculation =()=>{
    let cartIcon = document.getElementById('cartAmount');
    cartIcon.innerHTML = basket.map((x)=>x.item).reduce((x,y) => x + y, 0);
};
  
calculation();

generatecardItems =() =>{
    if(basket.length !==0){
        return ShoppingCart.innerHTML = basket.map((x) =>{
            let {id, item} = x;
            let search = shopItemsData.find((x) =>x.id === id) || [];
            let {img, price, name} = search;
            return `
            <div class="cart-item">
                <img width="100" src="${img}" alt="${name}"/>
                
                <div class="details">

                    <div class="title-price-x">
                        <h4 class="title-price">
                            <p>${name}</p>
                            <p class="cart-item-item">${price}</p>
                        </h4>
                        <i onclick="removeItem(${id})"  class="fa fa-minus"></i>
                    </div>

                    <div class="card-buttons">
                        <div class="buttons">
                            <i onclick="decrement(${id})" class="fa fa-minus"></i>
                            <div id=${id} class="quantity">${item}</div>
                            <i onclick="increment(${id})" class="fa fa-plus"></i>
                        </div>
                    </div>

                    <h3>GH₵ ${item * price}</h3>

                </div>
            </div>
            `;
        }).join("");
    }
    else{
        ShoppingCart.innerHTML = "";
        label.innerHTML = `
        <div id="checkout-cart">
            <h2>Card is Empty</h2>
            <a href="home.html">
            <button class="HomeBtn">Back to Home</button>
            </a>
        </div>
        `;
    }
}

generatecardItems();

//Increase the selected items in the cart.
let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((x)=> x.id === selectedItem.id);

        if(search === undefined){
            basket.push({
            id: selectedItem.id,
            item: 1,
            });  
        }
        else{
            search.item += 1;
        }
    

    generatecardItems();
    update(selectedItem.id); 
    localStorage.setItem("data", JSON.stringify(basket));
}

//Decrease the selected profduct the cart
let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x)=> x.id === selectedItem.id);

    if(search === undefined) return

    else if(search.item === 0) return;
    else{
        search.item -= 1;
    }    
    update(selectedItem.id);
    basket = basket.filter((x) =>x.item !== 0);
    localStorage.setItem("data", JSON.stringify(basket));
};

//Update the amount on each card item picked
let update = (id) => {
    let search = basket.find((x) => x.id === id);
    document.getElementById(id).innerHTML = search.item;
    calculation();
    TotalAmount();
};


//Remove one item from the cart.
let removeItem = (id) =>{
    let selectedItem = id;
    basket = basket.filter((x) => x.id !== selectedItem.id);
    calculation();
    generatecardItems();
    TotalAmount();
    localStorage.setItem("data". JSON.stringify(basket));
}


//Calculate the total amount if the items selected
let TotalAmount = () =>{
    if(basket.length !==0){
        let amount = basket.map((x) =>{
            let {id, item} = x;
            let filterData = shopItemsData.find((x) => x.id === id);
            return filterData.price * item;
        })
        .reduce((x,y) => x+y, 0);

        return (label.innerHTML = `
            <div id="checkout-cart">
                <h2>Total Bill : GH₵ ${amount}</h2>
                <button class="checkout">Checkout</button>
                <button onclick="clearCart()" class="removeAll">Clear Cart</button>
            </div>
        `);
    }
        else return;
}

TotalAmount();

//Clear the cart
let clearCart = () =>{
    basket = [];
    generatecardItems();
    calculation();
    localStorage.setItem("date", JSON.stringify(basket));
}