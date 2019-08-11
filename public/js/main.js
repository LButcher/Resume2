let cards = [
    { name: 'cpscProjectCard', shown: false },
    { name: 'yelpProjectCard', shown: false },
    { name: 'portfolioCard', shown: false },
    { name: 'robotsCard', shown: false }
];

let aboutItems = [
    { name: 'about-item-1', shown: false },
    { name: 'about-item-2', shown: false },
    { name: 'about-item-3', shown: false },

]

let contactItems = [
    { name: 'contact-mail', shown: false },
    { name: 'contact-linkedin', shown: false },
    { name: 'contact-git', shown: false }
]

function checkBrowser() {
    var ua = window.navigator.userAgent.indexOf("Trident");
    if (ua >= 0) {
        alert("I currently do not support Internet Explorer. Main functionality should still work but may be displayed incorrectly. Please use any other modern browser. Thanks!")
    }
}

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

// Scrolls to set section in page. 
// targetElement will be About, Projects or Contact
function pageScroll(e, targetElement) {
    if (e.srcElement.offsetParent.className == "main-nav") {
        document.querySelector('#navToggle').checked = false;
    }
    e.preventDefault();
    const targetElementId = '#' + targetElement;
    const elementY = document.querySelector(targetElementId).getBoundingClientRect().top;
    const navHeight = document.querySelector('nav').getBoundingClientRect().height;
    const scrollToY = parseInt(elementY) - navHeight;
    window.scrollBy(0, scrollToY);
}

function checkItems(items) {
    let threshold = 550;
    //Traditional for loop for IE11....
    for (let i = 0; i < items.length; i++) {
        let currItem = document.querySelector("#" + items[i].name);
        let currItemPos = currItem.getBoundingClientRect();
        if (currItemPos.top <= window.innerHeight && (currItemPos.bottom + threshold) >= window.innerHeight &&
            !items[i].shown) {
            items[i].shown = true;
            addRule(items[i].name, currItem, currItemPos);
        }
    }
    for (let i = 0; i < items.length; i++) {
        if (items[i].shown) {
            items.splice(i, 1);
        }
    }
}

function addRule(elementName, currElement, currPos) {
    let left = currPos.x;
    let keyFrame = "0%{transform:translateX(-" + left + "px);}";
    document.styleSheets[0].insertRule("@keyframes " + elementName + "-entry {" + keyFrame + "100%{transform:translateX(0);}}", 0);
    currElement.style.animation = elementName + "-entry 500ms";
    currElement.style.opacity = 1;

}

document.addEventListener('keydown', function(event) {
    if (event.key == 'Escape' || event.key == 'Esc' && modal) {
        closeModal();
    }
})


window.addEventListener('scroll', function() {
    document.documentElement.style.setProperty("--scrolltrack", window.pageYOffset + "px");
    setNav();
    if (cards.length > 0) {
        checkItems(cards);
    }
    if (aboutItems.length > 0) {
        checkItems(aboutItems);
    }
    if (contactItems.length > 0) {
        checkItems(contactItems);
    }
});