const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById("loader");

// Show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide loading
function complete() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Get Quote From API
async function getQuote() {
    loading();
    const proxyURL = 'https://cors-anywhere.herokuapp.com/'
    const apiURL = 'https://type.fit/api/quotes';

    try {
        let randNum = randomNum();
        const response = await fetch(apiURL);
        const data = await response.json();
        // If author is blank, add "Unknown"
        if (data[randNum].author === "") {
            authorText.innerText = "Unknown";
        } else {
            authorText.innerText = data[randNum].author;
        }
        // Reduce font size long quotes
        if (data[randNum].text.length > 120) {
            quoteText.classList.add("long-quote");
        } else {
            quoteText.classList.remove("long-quote");
        }
        quoteText.innerText = data[randNum].text;
        // Stop loader, Show quote
        complete();
    } catch (error) {
        console.log("No quote: ", error);
    }
}

// random generator
function randomNum() {
    let num = Math.floor(Math.random() * 1643);
    return num;
}

// Tweet Quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterURL = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterURL, '_blank');
}

// Event listener
newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On Load
getQuote()