let eventDrag;


for(let i = 0; i < dataEvent.length; i++){
    if(!arrFiltred.includes(dataEvent[i].name)){
        arrFiltred.push(dataEvent[i].name)
    }
}

function dragForDesktop(){    
    for(let i = 0; i< dataEvent.length; i++){
        if(!dataEvent[i].sorted){
            const eventDraggable = document.querySelector(`.event_${i+1}_${dataEvent[i].name}`)
            eventDraggable.setAttribute("draggable", "true")
            eventDraggable.addEventListener('dragstart', () => {
                eventDrag = eventDraggable

            })
        }
    }
}



function DragOverDesktop(){
    
    for( let item of table.children){
        item.addEventListener('dragover', (e) => {
            e.preventDefault()
        })
    }
}

function dropForDesktop(){
    for( let item = 0; item < table.children.length; item++){
        table.children[item].addEventListener('drop', () => {
            const classNameRow = table.children[item].children[0].className.split(' ')[0].split('_')[2]
            if(classNameRow === eventDrag.className.split(' ')[0].split('_')[2]){
                drowCells(saveElements, dataEvent, eventDrag, table.children[item], item)
            }
        })
    }
}




if(innerHeight >= 634){
    dragForDesktop()
    DragOverDesktop()
    dropForDesktop()
    drowRow()
    deleteEventFromTable()
}