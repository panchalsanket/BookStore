cartlist = document.querySelector('#courses-list')
cardbadge = document.querySelector('#cardbadge');
clearcart = document.querySelector('#clear-cart')


//Listerner
document.addEventListener('DOMContentLoaded', pageLoad);
clearcart.addEventListener('click', clearCart)
cartlist.addEventListener('click', (e) => {
    var coursedetail
    e.preventDefault();
    if (e.target.classList.contains('add-to-cart')) {
        coursedetail = e.target.parentElement.parentElement;
        getCourseDetail(coursedetail)
    }
})
//get course details that have been selected
function getCourseDetail(item) {
    var imgsrc = item.querySelector('img').src
    var imgname = item.querySelector('h4').innerHTML
    var imgprice = item.querySelector('.price span').innerHTML
    cartdata = {
        img: imgsrc,
        name: imgname,
        price: imgprice
    }
    console.log(cartdata)
    addcartlocalstorage(cartdata)
}
//add cart details to local storage 
function addcartlocalstorage(data) {
    console.log('adding data to storage');
    cartdata = getcartlocalstorage()
    if (cartdata.length === 0) {
        cartdata[0] = data
    }
    else {
        cartdata.push(data)
    }

    localStorage.setItem('cartitem', JSON.stringify(cartdata))
    document.location.reload(true)
}
// get cart data from localstorage 
function getcartlocalstorage() {
    var cartdata;
    localdata = localStorage.getItem('cartitem')
    if (localdata === null) {
        cartdata = []
    }
    else {
        cartdata = JSON.parse(localdata)
    }
    return cartdata
}

// page load function
function pageLoad(e) {
    shoppingcart = document.querySelector('#shopping-cart tbody')
    cartdetails = getcartlocalstorage();
    if (cartdetails.length === 0) {
        cartelement = document.createElement('tr')
        cartelement.innerHTML =
            `
            <td><p>No Item Added</p></td>
              
        `
        shoppingcart.appendChild(cartelement)
        cardbadge.innerHTML = 0
        document.querySelector('#clear-cart').remove()
    }
    else {
        cartdetails.forEach((item) => {
            cartelement = document.createElement('tr')
            cartelement.innerHTML = `
            <td><img src="${item.img}" height="100px"></td>
            <td>${item.name}</td>
            <td>${item.price}</td>
            `
            shoppingcart.appendChild(cartelement)
        })
        cardbadge.innerHTML = cartdetails.length
    }
}
// clear cart data for addtocart
function clearCart() {
    console.log('clearing localstorage data');
    localStorage.clear()
    document.location.reload(true)

}