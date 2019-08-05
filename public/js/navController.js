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