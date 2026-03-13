const SUPABASE_URL = "https://mzvlmimtpmeqgjsbhwzl.supabase.co"

const SUPABASE_KEY = "sb_publishable_f3iOquNuPNPnWCtTuKd0PA_QYkFYhbq"

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY)

let cart = []

function addToCart(item){

cart.push(item)

updateCart()

}

function updateCart(){

let cartList = document.getElementById("cart")

cartList.innerHTML = ""

cart.forEach(product => {

let li = document.createElement("li")

li.textContent = product

cartList.appendChild(li)

})

}

async function sendOrder(){

if(cart.length === 0){

alert("Cart is empty")

return

}

let orderText = cart.join(", ")

await client
.from("orders")
.insert([{order:orderText}])

cart = []

updateCart()

alert("Order sent!")

}

function adminLogin(){

let password = prompt("Enter admin password")

if(password === "230711"){

loadOrders()

}else{

alert("Wrong password")

}

}

async function loadOrders(){

let { data } = await client
.from("orders")
.select("*")
.order("id",{ascending:false})

let box = document.getElementById("orders")

box.innerHTML = "<h2>Orders</h2>"

data.forEach(order => {

let div = document.createElement("div")

div.style.background = "white"
div.style.margin = "10px"
div.style.padding = "10px"
div.style.borderRadius = "10px"

div.innerHTML = "📦 " + order.order

box.appendChild(div)

})

}