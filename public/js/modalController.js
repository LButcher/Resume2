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

function setNav() {

    const topMargin = 150; //__px from top of window innerheight
    const nav = document.querySelector('.main-nav');
    const titleY = document.querySelector('.heading-title').getBoundingClientRect().top;
    const scrollY = document.documentElement.style.getPropertyValue('--scroll-y');
    const aboutY = document.querySelector('#about').getBoundingClientRect().top;
    const projectsY = document.querySelector('#projects').getBoundingClientRect().top;
    const contactY = document.querySelector('#contact').getBoundingClientRect().top;
    if (inTitle(scrollY, titleY)) {
        nav.style.backgroundColor = 'transparent';
        document.querySelector('#about-option').style.textDecoration = 'none';
        document.querySelector('#projects-option').style.textDecoration = 'none';
        document.querySelector('#contact-option').style.textDecoration = 'none';

    } else {
        nav.style.backgroundColor = 'black';
    }
    if (aboutY <= topMargin && aboutY > 0) {
        document.querySelector('#about-option').style.textDecoration = 'underline';
        document.querySelector('#projects-option').style.textDecoration = 'none';
        document.querySelector('#contact-option').style.textDecoration = 'none';

    } else if (projectsY <= topMargin && projectsY > 0) {
        document.querySelector('#about-option').style.textDecoration = 'none';
        document.querySelector('#projects-option').style.textDecoration = 'underline';
        document.querySelector('#contact-option').style.textDecoration = 'none';
    }

}

function inTitle(scrollY, titleY) {
    return (parseInt(scrollY) < 800 && titleY > 20);
}

function pageScroll(e, targetElement) {
    e.preventDefault();
    const targetElementId = '#' + targetElement;
    const elementY = document.querySelector(targetElementId).getBoundingClientRect().top;
    const navHeight = document.querySelector('nav').getBoundingClientRect().height;
    const scrollToY = parseInt(elementY) - navHeight;
    window.scrollBy(0, scrollToY);
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