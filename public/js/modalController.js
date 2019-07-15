let modal = null;

function gridButtonPressed(element) {
    try {
        let btn = element.id;
        console.log(element);
        setModal(btn);
    }
    catch(e){
        console.log(e);
    }
}

function setModal(item){
    //document.querySelector('#mainBody').style.overflow='hidden';
    //document.querySelector('html').style.position='fixed';
    let modalName = '#modal_'+item;
    modal = document.querySelector(modalName);
    modal.style.display = "block";
    modal.focus();
    modal.innerHTML = '<object type="text/html" data="../views/cpsc319Modal.html"></object>'
}

function closeModal(){
    document.querySelector('#mainBody').style.overflow='auto';
    modal.style.display = "none";
}

document.addEventListener("keydown", event => {
    if(event.key=='Escape'){
        closeModal();
    }
})