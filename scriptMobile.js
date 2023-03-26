let itemAppend;
const saveElements = []
const row = document.querySelectorAll('.row')


function drag(){
    for (let i = 0; i < dataEvent.length; i++){
        if(dataEvent[i].sorted === false){
            const elementEvent = document.querySelector(`.event_${i+1}_${dataEvent[i].name}`)
            elementEvent.addEventListener('touchmove', (e) => {
                e.preventDefault();
                let touch = e.targetTouches[0]
                let widthContainer;
                if(innerWidth < 634){
                    widthContainer = 163
                }else{
                    widthContainer = 317
                }
                elementEvent.style.zIndex = "10"
                elementEvent.style.top = `${touch.pageY - 30}px`
                elementEvent.style.left = `${touch.pageX - widthContainer}px`
                elementEvent.style.position = 'absolute'
                row.forEach(ele => {
                    if(elementEvent.getBoundingClientRect().top + 15 < ele.getBoundingClientRect().bottom &&
                        elementEvent.getBoundingClientRect().left + elementEvent.offsetWidth / 2 < ele.getBoundingClientRect().right &&
                        elementEvent.getBoundingClientRect().right - elementEvent.offsetWidth / 2 > ele.getBoundingClientRect().left &&
                        elementEvent.getBoundingClientRect().bottom  - 15 > ele.getBoundingClientRect().top){
                        ele.classList.add("active")
                        itemAppend = ele
                    }else{
                        ele.classList.remove("active")
                    }
                })
            })
        }
    }
    
}




function drop(){
    for (let i = 0; i < dataEvent.length; i++){
        if(dataEvent[i].sorted === false){
            const elementEvent = document.querySelector(`.event_${i+1}_${dataEvent[i].name}`)
            elementEvent.addEventListener('touchend', () => {
                if(itemAppend && itemAppend.children[0] && elementEvent.children[1].children[0].children[0].innerText === itemAppend.children[0].innerText){
                    drowCells(saveElements, dataEvent, elementEvent, itemAppend, i)
                }
            })
        }
    }
}



if(innerHeight < 634){
    drag()
    drop()
    drowRow()
    deleteEventFromTable()
}