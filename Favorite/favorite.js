import { backendURL } from '../backendURL.js';
window.onload = init;

document.getElementById("searchSubmit").addEventListener("click", search, false);

async function search() {
    const value = document.getElementById("searchbox").value;
    window.location.href = "/Search/search.html?ticker=" + value.toUpperCase()
}

// This is an example API request. 
async function init() {
    await fetch(backendURL + 'hello?name=Developer').then(function (response) {
        return response.text();
    }).then(function (text) {
        console.log(text);
    }).catch((err) => {
        console.log("Unable to get <blank> request.");
    });

    // Need to implement a get trades on the backend.
    await fetch(backendURL + 'getTrades').then(function (response) {
        return response.text();
    }).then(function (text) {
        formatTrades(text)
    }).catch((err) => {
        // console.log(err);
        // console.log("Unable to get obtain Trades");
        // This runs everytime, not sure why. I think it is because it lacks HTML to insert into.
        // I think I should limit it. 
    });
    if (document.cookie != ''){
        document.getElementById("isLoggedIn").innerHTML = "<a class='nav-link' href='/LoginRegister/login.html'>Log Out</a>";
    } else {
        
    }
}

async function formatTrades(input) {
    let name = document.cookie;
    name = name.substring(9);
    let favorites;
    await fetch(backendURL+'getUser?name='+name).then( function (response) {
        return response.text();
    }).then( function (text){
        favorites = text.split("!");
        favorites = favorites[1];

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
            let defaultTemplate;
            let favIndex;
            //Checks whether the user is logged in or not.
            if (document.cookie){
                defaultTemplate = "<div class='card-body'><h5 class='card-title'>"+ticker+" #"+filedAfter+"</h5><h6 class='card-subtitle mb-2 text-muted'>Traded: "+published+"</h6><h6 class='card-subtitle mb-2 text-muted'>Published: "+traded+"</h6><p class='card-text'>"+type+" $"+size+" worth of shares at $"+price+" per share.</p><a href='https://robinhood.com/us/en/' target='_blank' class='btn btn-primary'>Purchase Stock</a><br/><a href='"+researchStockLink+"'  target='_blank' class='btn btn-secondary'>Research Stock</a><br/><button class='btn btn-outline-danger' id='favorite"+index+"' onClick='favClicked(this.id)' for='danger-outlined'>Favorite</button></div>";
                if (document.getElementById("card"+index) != null){
                    document.getElementById("card"+index).innerHTML = defaultTemplate
                    document.getElementById("card"+index).style = "width: 18rem;";
                    favIndex = "favorite"+index;
    
                    if (document.cookie){
                        document.getElementById("favorite"+index).addEventListener("click", () => favClicked(favIndex, ticker), false);
                    }
                }
            }

            if (favorites != "" && favorites != null){
                let favoritesArr = favorites.split(",");
                for (let i = 0; i < favoritesArr.length; i++){
                    if (favoritesArr[i] == ticker && document.cookie){
                        document.getElementById(favIndex).innerHTML = 'Unfavorite';
                    }
                }
            }

            if (document.getElementById(favIndex).innerHTML == 'Favorite'){
                document.getElementById("card"+index).style = "width: 18rem; display: none;";
            }
        });
    }).catch((err) => {
        console.log("Cannot get previous favorites.");
    });
    console.log("Trades Updated");
}

function favClicked(idOfElement, ticker){
    if (document.getElementById("card1") != null) {
        console.log('Favorite Clicked');
        if (document.getElementById(idOfElement).innerHTML == 'Favorite'){
            document.getElementById(idOfElement).innerHTML = 'Unfavorite';
            let caller = updateFavorites("add", ticker);
        } else {
            document.getElementById(idOfElement).innerHTML = 'Favorite';
            let caller = updateFavorites("remove", ticker);
        }
    }
}

async function updateFavorites(addOrRemove, ticker){
    let name = document.cookie;
    name = name.substring(9);
    let favorites;
    await fetch(backendURL+'getUser?name='+name).then( function (response) {
        return response.text();
    }).then( function (text){
        favorites = text.split("!");
        favorites = favorites[1];
        
        if (addOrRemove == "add"){
            favorites = favorites+","+ticker;
            fetch(backendURL+'updateFavorites?name='+name+'&favorites='+favorites).then( function (response) {
                return response.text();
            }).then( function (text){
                console.log(text);
            }).catch((err) => {
                console.log("Unable to update favorites.");
            });
        } else if (addOrRemove == "remove"){
            let favArr = favorites.split(",");
            for (let i = 0; i < favArr.length; i++){
                if (favArr[i] == ticker){
                    delete favArr[i];
                    break;
                }
            }
            favorites = "";
            for (let i = 0; i < favArr.length; i++){
                if (favArr[i] != undefined && favArr[i] != "undefined"){
                    favorites = favorites + favArr[i] + ",";
                }
            }
            favorites = favorites.substring(0, favorites.length - 1);
            fetch(backendURL+'updateFavorites?name='+name+'&favorites='+favorites).then( function (response) {
                return response.text();
            }).then( function (text){
                console.log(text);
            }).catch((err) => {
                console.log("Unable to update favorites.");
            });
        } else {
            console.log("Error Occured.");
        }
        
    }).catch((err) => {
        console.log("Cannot get previous favorites.");
    });
}
