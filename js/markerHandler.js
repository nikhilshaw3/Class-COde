AFRAME.registerComponent("markerhandler",{
init: async function(){

    var dishes = await this.getDishes()

this.el.addEventListener("markerFound",()=>{
console.log("Marker is found");

var markerId = this.el.id
this.handleMarkerFound(dishes,markerId)
})

this.el.addEventListener("markerLost",()=>{
console.log("Marker is lost");
this.handleMarkerLost()
})


},

handleMarkerFound:function(dishes,markerId){

var todaysDate = new Date()
var todaysDay = todaysDate.getDay()
var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

var dish = dishes.filter(dish=>dish.id===markerId)[0]

if(dish.unavailable_days.includes(days[todaysDay])){
swal({
    icon:"warning",
    title:dish.dish_name.toUpperCase(),
    text:"THIS DISH IS NOT AVAILABLE TODAY",
    timer:2500,
    buttons:false
})
}else{}

var buttonDiv = document.getElementById("button-div")
buttonDiv.style.display = "flex"

var ratingButton = document.getElementById("rating-button")
var orderButton = document.getElementById("order-button")

ratingButton.addEventListener("click",function(){
    swal({
        icon:"warning",
        title:"RATE THE DISH",
        text:"WORK IN PROGRESS",
    })
})

orderButton.addEventListener("click",function(){
    swal({
        icon:"https://i.imgur.com/4NZ6uLY.jpg",
        title:"THANKS!! FOR THE ORDER",
        text:"YOUR ORDER WILL BE SERVED SOON ON THE TABLE"
    })
})

},

handleMarkerLost:function(){
var buttonDiv = document.getElementById("button-div")
buttonDiv.style.display = "none"
},

getDishes: async function(){
    return await firebase
    .firestore()
    .collection("dishes")
    .get()
    .then(snap=>{
        return snap.docs.map(doc=>doc.data())
    })
    }
    })