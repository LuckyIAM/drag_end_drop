import data from "./dataEvent.json" assert { type: "json" }

let dataEvent

if(!localStorage.getItem("data")){
    localStorage.setItem("data", JSON.stringify(data))
    dataEvent = localStorage.getItem("data")
    window.location.reload()
}else{
    dataEvent = localStorage.getItem("data")
}