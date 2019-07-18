let modal = null;
let hasEventAdded = false;

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

function openModal(btnName) {

    const scrollY = document.documentElement.style.getPropertyValue('--scroll-y');
    document.querySelector('body').style.position = 'auto';
    document.querySelector('body').style.overflowY = 'scroll';
    const body = document.querySelector('html');
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}`;

    modal = document.querySelector('#main-modal');
    modal.style.display = "block";
    modal.focus();
    let modalTemplate = getTemplate(btnName);
    modal.innerHTML = modalTemplate.innerHTML;

}

function closeModal() {
    //document.querySelector('#mainBody').style.overflow = 'auto';
    //const body = document.body;
    const body = document.querySelector('html');
    const scrollY = body.style.top;
    body.style.position = '';
    body.style.top = '';
    document.querySelector('html').style.scrollBehavior = 'auto';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
    document.querySelector('html').style.scrollBehavior = 'smooth';
    modal.style.display = "none";
}

function getTemplate(id) {
    let templateName = id + '-template';
    return document.querySelector('#' + templateName);
}

document.addEventListener('keydown', event => {
    console.log(event);
    if (event.key == 'Escape' && modal) {
        closeModal();
    }
})



window.addEventListener('scroll', () => {
    document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
});