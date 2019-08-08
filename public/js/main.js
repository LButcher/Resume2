let cards = [
    { name: 'cpscProjectCard', shown: false },
    { name: 'yelpProjectCard', shown: false },
    { name: 'portfolioCard', shown: false },
    { name: 'robotsCard', shown: false }
];

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
    e.preventDefault();
    const targetElementId = '#' + targetElement;
    const elementY = document.querySelector(targetElementId).getBoundingClientRect().top;
    const navHeight = document.querySelector('nav').getBoundingClientRect().height;
    const scrollToY = parseInt(elementY) - navHeight;
    window.scrollBy(0, scrollToY);
}

function checkCards() {
    //Traditional for loop for IE11....
    for (let i = 0; i < cards.length; i++) {
        let currCard = document.querySelector('#' + cards[i].name);
        let currCardPos = currCard.getBoundingClientRect();
        if (currCardPos.top <= window.innerHeight && !cards[i].shown) {
            cards[i].shown = true;
            addRule(cards[i].name, currCard, currCardPos);
        }
    }

}

function addRule(cardName, currCard, currCardPos) {
    let left = currCardPos.x;
    let keyFrame = "0%{transform:translateX(-" + left + "px);}";
    document.styleSheets[0].insertRule("@keyframes " + cardName + "-entry {" + keyFrame + "100%{transform:translateX(0);}}", 0);
    currCard.style.opacity = 1;
    currCard.style.animation = cardName + "-entry 500ms";
}

document.addEventListener('keydown', function(event) {
    if (event.key == 'Escape' || event.key == 'Esc' && modal) {
        closeModal();
    }
})


window.addEventListener('scroll', function() {
    document.documentElement.style.setProperty("--scrolltrack", window.pageYOffset + "px");
    console.log(document.documentElement.style);

    setNav();
    checkCards();
});