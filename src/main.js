
let shop = document.getElementById('shop');

/**
 *! Basket will return empty array is localStorage is empty.*/

let basket = JSON.parse(localStorage.getItem("data")) || [];
  
let generateShop = ()=>{ 
    return (shop.innerHTML = shopItemsData.map((x)=>{
        let {id, name, price, desc, img} = x;
        let search = basket.find((y)=> y.id === id) || [];
        return`
            <div id=product-id-${id} class="item">
                <img width="220" src=${img} alt="${name}">
                <div class="details">
                    <h3>${name}</h3>
                    <p>${desc}</p>
                    <div class="price-quantity">
                        <h2>GH₵ ${price}</h2>
                        <div class="buttons">
                            <i onclick="decrement(${id})" class="fa fa-minus">
                            </i>
                            <div id="${id}" class="quantity">${search.item === undefined ? 0 : search.item}</div>
                            <i onclick="increment(${id})" class="fa fa-plus"></i>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join(""));
}

//Geneting shop
generateShop();

//Increase Cart Item
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
        console.log(basket);
    update(selectedItem.id); 
    localStorage.setItem("data", JSON.stringify(basket));
};

//Decrease Cart Item
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

let update = (id) => {
    let search = basket.find((x) => x.id === id);
    document.getElementById(id).innerHTML = search.item;
    calculation();
};

let calculation =()=>{
    let cartIcon = document.getElementById('cartAmount');
    cartIcon.innerHTML = basket.map((x)=>x.item).reduce((x,y) => x + y, 0);
};

calculation();
