let addBtn = document.querySelector(".add-btn");
let modalCont = document.querySelector(".modal-cont");
let mainCont = document.querySelector(".main-cont");
let textareaCont = document.querySelector(".textarea-cont");
let addFlag = false;

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

modalCont.addEventListener("keydown",(e)=>{
    let key = e.key;
    if(key === "Shift"){
        createTicket();
        addFlag = !addFlag;
        modalCont.style.display = "none";
        textareaCont.value = "";
    }
});

function createTicket(){
    let ticketCont = document.createElement("div");
    ticketCont.setAttribute("class","ticket-cont");
    ticketCont.innerHTML = `
        <div class="ticket-color"></div>
        <div class="ticket-id">#sample-id</div>
        <div class="task-area">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, laboriosam assumenda. Illo voluptate
            error porro!
        </div>
    `;
    mainCont.appendChild(ticketCont);
}
