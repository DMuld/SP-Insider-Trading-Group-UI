import { backendURL } from './backendURL.js';
window.onload=init;

// This is an example API request. 
async function init(){
    await fetch(backendURL+'hello?name=Developer').then( function (response) {
        return response.text();
    }).then( function (text){
        console.log(text);
    }).catch((err) => {
        console.log("Unable to get <blank> request.");
    });

    // Need to implement a get trades on the backend.
    await fetch(backendURL+'getTrades').then( function (response) {
        return response.text();
    }).then( function (text){
        formatTrades(text)
    }).catch((err) => {
        // console.log(err);
        // console.log("Unable to get obtain Trades");
        // This runs everytime, not sure why. I think it is because it lacks HTML to insert into.
        // I think I should limit it. 
    });
}

function formatTrades(input) {
    let index = -1
    let tradesArr = input.split("|");
    tradesArr.forEach(card => {
        let cardArr = card.split("!");
        let ticker = cardArr[0];
        let published = cardArr[1];
        let traded = cardArr[2];
        let filedAfter = cardArr[3];
        let type = cardArr[4];
        let size = cardArr[5];
        let price = cardArr[6];
        let researchStockLink = "https://finance.yahoo.com/quote/"+ticker
        index += 1;
        let defaultTemplate = "<div class='card-body'><h5 class='card-title'>"+ticker+" #"+filedAfter+"</h5><h6 class='card-subtitle mb-2 text-muted'>Published: "+published+"</h6><h6 class='card-subtitle mb-2 text-muted'>Traded: "+traded+"</h6><p class='card-text'>"+type+" "+size+" shares at $"+price+" per share.</p><a href='https://robinhood.com/us/en/' target='_blank' class='btn btn-primary'>Purchase Stock</a><br/><a href='"+researchStockLink+"'  target='_blank' class='btn btn-secondary'>Research Stock</a></div>";
        document.getElementById("card"+index).innerHTML = defaultTemplate
        document.getElementById("card"+index).style = "width: 18rem;"
    });
    console.log("I Ran")
}

