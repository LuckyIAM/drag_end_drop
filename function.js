
const table = document.querySelector('.table-container')
const events = document.querySelector(".events")
const dataEvent=JSON.parse(localStorage.getItem('data'))
const arrFiltred = [];



function createElementDOM(class_name, textElement, appendelement){
    const nameElement = document.createElement('div')
    nameElement.classList.add(class_name)
    nameElement.innerText = textElement
    appendelement.appendChild(nameElement)
}

function createRow(nr, nameExecutor, flag){
    const container = document.createElement('div')
    container.classList.add(`row_${nr}`, 'row')
    let widthRow
    if(innerWidth < 634){
        widthRow = `${163 * 2}px`
    }else{
        widthRow = `${317 * 2}px`
    }
    
    table.appendChild(container)

    createElementDOM("space", "", table)

    //create first cell
    const createFirstCel = document.createElement('div')
    createFirstCel.classList.add(`firstCell_${nr}_${nameExecutor}`, innerWidth < 634 ? 'firstCellM' : 'firstCell')
    createFirstCel.innerHTML = `<b>${nameExecutor}</b>`
    container.appendChild(createFirstCel)

    //create all cells
    for(let i = 0; i < 7; i++){
        const createCell = document.createElement('div')
        createCell.classList.add(`cell_${i}_${nameExecutor}`, innerWidth < 634 ? 'cellM' : 'cell')
        if(flag){
            createCell.innerText = ""
        }else{
            createCell.innerHTML = `<b>дата${1+i}</b>`
        }
        container.appendChild(createCell)
    }    
}


createRow("null", "ФИО", false)

for(let i = 0; i < dataEvent.length; i++){
    if(!arrFiltred.includes(dataEvent[i].name)){
        arrFiltred.push(dataEvent[i].name)
    }
}

for(let i = 0; i < arrFiltred.length; i++){
    createRow(i, arrFiltred[i], true)
}



//drow events
for(let i = 0; i < dataEvent.length; i++){
    const id = i+1
    const name = dataEvent[i].name
    const status = dataEvent[i].status
    const dateEvent = `${dataEvent[i].start}-${dataEvent[i].end}`
    const tikedEvent = dataEvent[i].tiket
    const sorted = dataEvent[i].sorted
    createEvent( id, name, status, dateEvent, tikedEvent, sorted, events, dataEvent)
}




function createEvent(nr, nameExecutor, status, dateEvent, tiket, sorted, events, dataEvent, changeTag){
    //container of event
    const container = document.createElement('div')
    if(!sorted){
        if(status === "work"){
            container.classList.add(`event_${nr}_${nameExecutor}`, "work", innerWidth < 634 ?"eventM": "event")
        }else{
            container.classList.add(`event_${nr}_${nameExecutor}`, "vacation", innerWidth < 634 ?"eventM": "event")
        }

        events.appendChild(container)

        createElementDOM('id', nr, container)

        const data = document.createElement('div')
        data.classList.add("data")
        container.appendChild(data)

        const dataLeft = document.createElement('div')
        dataLeft.classList.add("data-left")
        data.appendChild(dataLeft)

        createElementDOM('name', nameExecutor, dataLeft)

        if(!dataEvent[nr - 1].sorted){
            const date = document.createElement('div')
            date.classList.add('date')
            date.innerText = dateEvent
            dataLeft.append(date)
        }


        const dataCenter = document.createElement('div')
        dataCenter.classList.add("data-center")
        data.appendChild(dataCenter)

        createElementDOM('status', status, dataCenter)

        createElementDOM('tiket', tiket, dataCenter)


        const dataRight = document.createElement('div')
        dataRight.classList.add("data-right")
        data.appendChild(dataRight)

        createElementDOM(sorted, '', dataRight)
        // change tag div on input for change data
        const changeElemant = document.querySelector(`.event_${nr}_${nameExecutor}`);
        const parsedStatus =changeElemant.children[1].children[1].children[0].innerText
        const parsedSored = changeElemant.children[1].children[2].children[0].className;
        const parsedData = changeElemant.children[1].children[0].children[1].innerText;
        const parsedName = changeElemant.className.split(' ')[0].split('_')[2]

        const btnChange = document.createElement('div')
        btnChange.classList.add('btn-change')
        btnChange.innerHTML = parsedStatus === "work" ? `<img src = './img/exchange.png'/>`: ""
        btnChange.addEventListener('click', (e) => {
            e.preventDefault()
            if(parsedSored === "false" && parsedStatus === "work"){
                changeElemant.children[1].children[0].children[1].remove()
                const input = document.createElement('input')
                input.classList.add('date-input') 
                input.setAttribute("value", parsedData)
                input.setAttribute("type", "text")
                dataLeft.append(input)
            }
        })
        dataRight.append(btnChange)

        //change tag input to div and send changes data to json
        const parsedDataInput = changeElemant.children[1].getElementsByTagName("input");
        const btnAccept = document.createElement('div')
        btnAccept.classList.add('btn-accept')
        btnAccept.innerHTML = parsedStatus === "work" ? `<img src = './img/tick-mark.png'/>`: ""
        btnAccept.addEventListener('click', (e) => {
            e.preventDefault()
            for(let i = 0; i < dataEvent.length; i++){
                if(dataEvent[i].name === parsedName &&
                    dataEvent[i].start === parsedData.split('-')[0] 
                    && dataEvent[i].end === parsedData.split('-')[1]){
                        const date = document.createElement('div')
                        date.innerText = parsedDataInput[0].value
                        date.classList.add('date')
                        dataEvent[i]['start'] = parsedDataInput[0].value.split('-')[0]
                        dataEvent[i]['end'] = parsedDataInput[0].value.split('-')[1]
                        localStorage.setItem("data", JSON.stringify(dataEvent))
                        parsedDataInput[0].remove()
                        dataLeft.append(date)
                    }
            }
        })
dataRight.append(btnAccept)
    }else{
        container.classList.add(`event_${nr}_${nameExecutor}`, "notActive", innerWidth < 634 ?"eventM": "event")
    }
}

function drowCells(saveElements, dataEvent, dragElement, dropItem){
    const start = +dragElement.children[1].children[0].children[1].innerText.split('-')[0].split(".")[0]
    const end = +dragElement.children[1].children[0].children[1].innerText.split('-')[1].split(".")[0]
    const indexDragElement = +dragElement.children[0].innerText - 1
    let flag = true;
    for(let c = start - 1; c < end; c++){
        const cellCheck = document.querySelector(`.cell_${c}_${dropItem.children[0].innerText}`)
        if(cellCheck.classList.contains("work") || cellCheck.classList.contains("vacation")){
            flag = false
        }
    }
    if(flag){
        saveElements.push(dataEvent[indexDragElement])
        localStorage.setItem("draw-row", JSON.stringify(saveElements))
        for(let j = start - 1; j < end; j++){
            const drow = document.querySelector(`.cell_${j}_${dropItem.children[0].innerText}`)
            if(dragElement.classList.contains("work")){
                dropItem.classList.remove("active")
                drow.classList.add("work")
                dataEvent[indexDragElement]['sorted'] = true
                localStorage.setItem("data", JSON.stringify(dataEvent))
            }else{
                dropItem.classList.remove("active")
                dropItem.classList.remove("active")
                drow.classList.add("vacation")
                dataEvent[indexDragElement]['sorted'] = true
                localStorage.setItem("data", JSON.stringify(dataEvent))
            }
        }
        dragElement.remove()
    }else if(!flag){
        let modal;
        if(dragElement.classList.contains("work")){
            modal = document.querySelector('.modal')
            modal.classList.add("active-modal")
            const textModal = document.querySelector(".text-modal")
            textModal.innerHTML = `Сотрудник  &nbsp; ${dragElement.children[1].children[0].innerText}</b> &nbsp;&nbsp; <br/> в эти дни занят. <br/> Посмотрите график и поменяите даты! `
        }else{
            modal = document.querySelector('.modal')
            modal.classList.add("active-modal")
            const textModal = document.querySelector(".text-modal")
            textModal.innerHTML = `Сотрудник ${dragElement.children[1].children[0].innerText} в эти дни занят посмотрите график.<br/> Отпуск измкнить нельзя!`
        }
        const btnClose = document.querySelector(".close-modal")
        btnClose.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.remove("active-modal")
        })
    }
}

function deleteEventFromTable(){
    for(let i = 0; i < arrFiltred.length; i++){
        const getExecuter = document.querySelector(`.firstCell_${i}_${arrFiltred[i]}`)
        getExecuter.addEventListener("click", (e) => {
            e.preventDefault();
            for(let j = 0; j < dataEvent.length; j++){
                if(dataEvent[j].name === arrFiltred[i]){
                    dataEvent[j].sorted = false
                    localStorage.setItem('data', JSON.stringify(dataEvent))
                    window.location.reload()
                }
            }
        })
        
    }
}

function drowRow(){
    for(let i = 0; i < dataEvent.length; i++){
        if(dataEvent[i].sorted){
            const getElement = document.querySelector(`.firstCell_${i}_${dataEvent[i].name}`)
            const start = +dataEvent[i].start.split('.')[0]
            const end = +dataEvent[i].end.split('.')[0]
            for(let j = start - 1; j < end; j++){
                const cell = document.querySelector(`.cell_${j}_${dataEvent[i].name}`)
                cell.classList.add(`${dataEvent[i].status}`)
            }
        }
    }
}

