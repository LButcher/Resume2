let modal = null;

function gridButtonPressed(element) {
    try {
        let btn = element.id;
        console.log(element);
        setModal(btn);
    } catch (e) {
        console.log(e);
    }
}

function setModal(item) {
    //document.querySelector('#mainBody').style.overflow='hidden';
    /* const scrollY = window.scrollY;
     document.querySelector('body').style.position = 'fixed';
     document.querySelector('body').style.top = scrollY + 'px';*/
    const scrollY = document.documentElement.style.getPropertyValue('--scroll-y');
    //const body = document.body;
    document.querySelector('body').style.position = 'auto';
    document.querySelector('body').style.overflowY = 'scroll';

    const body = document.querySelector('html');
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}`;
    let modalName = '#modal_' + item;
    modal = document.querySelector(modalName);
    modal.style.display = "block";
    modal.focus();
    let modalTemplate = document.querySelector('#cpscButton-template');
    modal.innerHTML = modalTemplate.innerHTML;
    //modal.innerHTML = '<object type="text/html" data="../views/cpsc319Modal.html"></object>'
    //modal.innerHTML = url('/views/cpsc319Modal.html');
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
    modal = null;
}

document.addEventListener('keydown', event => {
    if (event.key == 'Escape' && modal) {
        closeModal();
    }
})

window.addEventListener('scroll', () => {
    document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
});