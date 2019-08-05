let modal = null;
let hasEventAdded = false;

// Triggered when the "Read More" button is pressed in the projects grid
function gridButtonPressed(element) {
    try {
        let btn = element.id;
        if (!hasEventAdded) {
            document.querySelector('#main-modal').addEventListener('click', modalClicked);
            hasEventAdded = true;
        }
        openModal(btn);
    } catch (e) {
        console.log(e);
    }
}

function modalClicked(event) {
    if (event.target.id === 'main-modal') {
        closeModal();
    }
}

// Disables background scroll so scrolling is only applied to the modal content
function openModal(btnName) {

    const scrollY = document.documentElement.style.getPropertyValue('--scroll-y');
    document.querySelector('body').style.position = 'auto';
    document.querySelector('body').style.overflowY = 'scroll';
    const doc = document.querySelector('html');
    doc.style.position = 'fixed';
    doc.style.top = `-${scrollY}`;
    modal = document.querySelector('#main-modal');
    modal.style.display = "block";
    modal.focus();
    let modalTemplate = getTemplate(btnName);
    modal.innerHTML = modalTemplate.innerHTML;
}

function closeModal() {

    const doc = document.querySelector('html');
    const scrollY = doc.style.top;
    doc.style.position = '';
    doc.style.top = '';
    document.querySelector('html').style.scrollBehavior = 'auto';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
    document.querySelector('html').style.scrollBehavior = 'smooth';
    modal.style.display = "none";
}

function getTemplate(id) {
    let templateName = id + '-template';
    return document.querySelector('#' + templateName);
}

function setModalAnimations() {
    try {
        // document.querySelector('.main-modal').style.
    } catch (e) {

    }
}

document.addEventListener('keydown', event => {
    if (event.key == 'Escape' && modal) {
        closeModal();
    }
})


window.addEventListener('scroll', () => {
    document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
    setNav();
});