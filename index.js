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
}