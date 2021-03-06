const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')
const icon = document.getElementById('icon')


function showLoadingSpinner() {
    loader.hidden = false
    quoteContainer.hidden = true
}

function removeLoadingSpinner() {
    if (!loader.hidden) {
        quoteContainer.hidden = false
        loader.hidden = true
    }
}

// Get Quote From API
async function getQuote() {
    showLoadingSpinner()
    const proxyUrl = 'https://dry-forest-79113.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json'
    try {
        const response = await fetch(proxyUrl + apiUrl)
        const data = await response.json()

        // Showing The Author Text & Icon, If Were Made Hidden Due To Any Error
        authorText.classList.remove('hide')
        icon.classList.remove('hide')

        // Reduce Font Size For Long Quotes
        if (data.quoteText.length > 120) {
            quoteText.classList.add('long-quote')
        } else {
            quoteText.classList.remove('long-quote')
        }
        quoteText.innerText = data.quoteText

        // If Author Is Blank, Add Unknown
        if (data.quoteAuthor === '') {
            authorText = 'Unknown'
        }else {
            authorText.innerText = data.quoteAuthor
        }
        //Stop Loader, Show Code
        removeLoadingSpinner()
    } catch (err) {

        //Hiding The Author Name & The Icon & Showing A Error Message
        quoteText.innerText = 'Whoops, Something Went Wrong... Please Try Again'
        authorText.classList.add('hide')
        icon.classList.add('hide')
        removeLoadingSpinner()
        console.log(err)
    }
}

// Tweet Quote
const tweetQuote = () => {
    const quote = quoteText.innerText
    const author = authorText.innerText
    const tweetUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`
    window.open(tweetUrl, '_blank')
}

// Event Listeners
twitterBtn.addEventListener('click', tweetQuote)
newQuoteBtn.addEventListener('click', getQuote)

// On Load
getQuote()