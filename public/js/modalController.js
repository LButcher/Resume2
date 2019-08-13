let modal = null;
let hasEventAdded = false;

function modalClicked(event) {
    if (event.target.id === 'main-modal') {
        closeModal();
    }
}

// Disables background scroll so scrolling is only applied to the modal content
function openModal(btnName) {

    const scrollY = document.documentElement.style.getPropertyValue("--scrolltrack");
    document.querySelector('body').style.position = 'auto';
    document.querySelector('body').style.overflowY = 'scroll';
    const doc = document.querySelector('html');
    doc.style.position = 'fixed';
    doc.style.top = "-" + scrollY;
    modal = document.querySelector('#main-modal');
    modal.style.display = "block";
    let modalTemplate = getTemplate(btnName);
    modal.innerHTML = modalTemplate.innerHTML;
    // Scroll to the top when opening to prevent scroll persistance across modals
    modal.scrollTop = 0;
    modalContainer = document.querySelector('.modal-container');
    modalContainer.style.display = "block";
    modal.focus();

}

function closeModal() {
    document.querySelector('body').style.overflowY = 'auto';
    const doc = document.querySelector('html');
    const scrollY = doc.style.top;
    doc.style.position = '';
    doc.style.top = '';
    document.querySelector('html').style.scrollBehavior = 'auto';
    window.scrollTo(0, parseInt(scrollY) * -1);
    document.querySelector('html').style.scrollBehavior = 'smooth';
    modal.style.display = "none";
}

function getTemplate(id) {
    let templateName = id + '-template';
    return document.querySelector('#' + templateName);
}