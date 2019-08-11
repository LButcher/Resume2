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

function checkAboutItems() {
    //Traditional for loop for IE11....
    for (let i = 0; i < aboutItems.length; i++) {
        let currItem = document.querySelector('#' + aboutItems[i].name);
        let currItemPos = currItem.getBoundingClientRect();
        if (currItemPos.top <= window.innerHeight && !aboutItems[i].shown) {
            aboutItems[i].shown = true;
            addRule(aboutItems[i].name, currItem, currItemPos);
            aboutItems.splice(i, 1);
        }
    }
}

function checkCards() {
    //Traditional for loop for IE11....
    for (let i = 0; i < cards.length; i++) {
        let currCard = document.querySelector('#' + cards[i].name);
        let currCardPos = currCard.getBoundingClientRect();
        if (currCardPos.top <= window.innerHeight && !cards[i].shown) {
            cards[i].shown = true;
            addRule(cards[i].name, currCard, currCardPos);
            cards.splice(i, 1);
        }
    }

}

function addRule(elementName, currElement, currPos) {
    let left = currPos.x;
    let keyFrame = "0%{transform:translateX(-" + left + "px);}";
    document.styleSheets[0].insertRule("@keyframes " + elementName + "-entry {" + keyFrame + "100%{transform:translateX(0);}}", 0);
    currElement.style.opacity = 1;
    currElement.style.animation = elementName + "-entry 500ms";
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
        checkCards();
    }
    if (aboutItems.length > 0) {
        checkAboutItems();
    }
});