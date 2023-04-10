import { backendURL } from './backendURL.js';


// For all of these below. The information aka the response.
// Is located in the 'text' variable.

// Takes Username returns that the user can log-in or can't. 
// Takes nothing returns a comma delimted string of all users.
async function getUser(name){
    await fetch(backendURL+'getUser?name='+name).then( function (response) {       //can remove "?name=<blah>+name" section and replace it with nothing and it will return all users.
        return response.text();
    }).then( function (text){
        console.log(text);
    }).catch((err) => {
        console.log("Cannot find /getUser on backend.");
    });
}

// Takse usernames and hashed password. Returns if it was created or not.
async function createUser(name, hashedPassword){
    await fetch(backendURL+'createUser?name='+name+'&password='+hashedPassword).then( function (response) {    
        return response.text();
    }).then( function (text){
        console.log(text);
    }).catch((err) => {
        console.log("Cannot find /createUser on backend.");
    });
}

// Takes a username and hashed password. Updates hashed password to the new one. Returns if it works or not.
async function updateUser(name, newHashedPassword){
    await fetch(backendURL+'updateUser?name='+name+'&password='+newHashedPassword).then( function (response) {
        return response.text();
    }).then( function (text){
        console.log(text);
    }).catch((err) => {
        console.log("Cannot find /updateUser on backend.");
    });
}