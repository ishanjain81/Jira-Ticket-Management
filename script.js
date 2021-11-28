let addBtn = document.querySelector(".add-btn");
let removeBtn = document.querySelector(".remove-btn");
let modalCont = document.querySelector(".modal-cont");
let mainCont = document.querySelector(".main-cont");
let textareaCont = document.querySelector(".textarea-cont");
let allPriorityColors = document.querySelectorAll(".priority-color");
let toolBoxColors = document.querySelectorAll(".color");

let colors = ["lightpink","lightblue","lightgreen","black"];
let modalPriorityColor = colors[colors.length-1];

let addFlag = false;
let removeFlag = false;

let lockClass = "fa-lock";
let unlockClass = "fa-lock-open";

let ticketsArr = [];

for(let i=0;i < toolBoxColors.length ;i++){
    toolBoxColors[i].addEventListener("click",(e)=>{
        let currentToolBoxColor = toolBoxColors[i].classList[0];

        let filteredTickets = ticketsArr.filter((ticketObj,idx)=>{
            return currentToolBoxColor === ticketObj.ticketColor;
        });

        let allTicketsCont = document.querySelectorAll(".ticket-cont");
        for(let j = 0;j < allTicketsCont.length;j++){
            allTicketsCont[j].remove();
        }

        filteredTickets.forEach((ticketObj,idx) =>{
            createTicket(ticketObj.ticketColor,ticketObj.ticketTask,ticketObj.ticketID);
        });
    });

    toolBoxColors[i].addEventListener("dblclick",(e)=>{
        let allTicketsCont = document.querySelectorAll(".ticket-cont");
        for(let j = 0;j < allTicketsCont.length;j++){
            allTicketsCont[j].remove();
        }

        ticketsArr.forEach((ticketObj)=>{
            createTicket(ticketObj.ticketColor,ticketObj.ticketTask,ticketObj.ticketID);
        });
    });
}

// Listeneter for modal Priority Coloring
allPriorityColors.forEach((colorElem,idx)=>{
    colorElem.addEventListener("click",(e)=>{
        allPriorityColors.forEach((priorityColorElem,idx) =>{
            priorityColorElem.classList.remove("border");
        });
        colorElem.classList.add("border");
        modalPriorityColor = colorElem.classList[0];
    });
});

addBtn.addEventListener("click", (e) =>{
    // Display Modal
    // Genearate Ticket

    // AddFlag -> true, M display
    // AddFlag -> false, M hide
    addFlag = !addFlag;
    if(addFlag){
        modalCont.style.display = "flex";
    }
    else{
        modalCont.style.display = "none";
    }
});

removeBtn.addEventListener("click",(e)=>{
    removeFlag = !removeFlag;
});

modalCont.addEventListener("keydown",(e)=>{
    let key = e.key;
    if(key === "Shift"){
        createTicket(modalPriorityColor,textareaCont.value);
        addFlag = !addFlag;
        setModalToDefault();
    }
});

function createTicket(ticketColor,ticketTask,ticketID){
    let id = (ticketID  || shortid());
    let ticketCont = document.createElement("div");
    ticketCont.setAttribute("class","ticket-cont");
    ticketCont.innerHTML = `
        <div class="ticket-color ${ticketColor}"></div>
        <div class="ticket-id">#${id}</div>
        <div class="task-area">
            ${ticketTask}
        </div>
        <div class="ticket-lock"><i class="fas fa-lock"></i></div>
    `;
    mainCont.appendChild(ticketCont);

    // Create Object of Ticket and add to Array
    if(!ticketID)
        ticketsArr.push({ticketColor, ticketTask, ticketID : id});

    handleRemoval(ticketCont);
    handleLock(ticketCont);
    handleColor(ticketCont);
}

function handleRemoval(ticket){
    // removeFlag -> true -> remove
    ticket.addEventListener("click",(e)=>{
        if(removeFlag){
            ticket.remove();
        }
    }); 
}

function handleLock(ticket){
   let ticketLockElem = ticket.querySelector(".ticket-lock");
   let ticketLock = ticketLockElem.children[0];
   let ticketTaskArea = ticket.querySelector(".task-area");
   ticketLock.addEventListener("click",(e)=>{
        if(ticketLock.classList.contains(lockClass)){
            ticketLock.classList.remove(lockClass);
            ticketLock.classList.add(unlockClass);
            ticketTaskArea.setAttribute("contenteditable","true");
        }
        else{
            ticketLock.classList.remove(unlockClass);
            ticketLock.classList.add(lockClass);
            ticketTaskArea.setAttribute("contenteditable","false");
        }
   });
}

function handleColor(ticket){
    let ticketColor = ticket.querySelector(".ticket-color");
    ticketColor.addEventListener("click",(e)=>{
        let currentTicketColor = ticketColor.classList[1];
        let currentTicketColorIdx = colors.findIndex((color)=>{
            return currentTicketColor === color;
        })
        currentTicketColorIdx = (currentTicketColorIdx + 1) % colors.length;
        let newTicketColor = colors[currentTicketColorIdx];
        ticketColor.classList.remove(currentTicketColor);
        ticketColor.classList.add(newTicketColor);
    });

}

function setModalToDefault(){
    allPriorityColors.forEach((priorityColorElem,idx) =>{
        priorityColorElem.classList.remove("border");
    });
    allPriorityColors[allPriorityColors.length-1].classList.add("border");
    modalCont.style.display = "none";
    textareaCont.value = "";
    modalPriorityColor = colors[colors.length-1];
}