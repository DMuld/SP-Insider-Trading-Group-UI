import { backendURL } from '../backendURL.js';
// const { createHash } = require('crypto');
export { isLoggedIn };
window.onload=init;
var user = "guest";
var isLoggedIn;

// For all of these below. The information aka the response.
// Is located in the 'text' variable.

// Takes a string and returns the hashed version of the string.
// function hash(string){
//     return createHash('sha256').update(string).digest('hex');
// }
async function init(){
    isLoggedIn = false;

    //Deletes Cookies, aka logs out.
    if (document.cookie){
        document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        alert("Logged Out");
    } else {
        document.getElementById("favoritesPage").style.display = "none";
    }
}

if (window.location.pathname.split("/").pop() == "login.html") {
    document.getElementById("loginSubmit").addEventListener("click", addUser, false);
} else {
    if (document.getElementById("registerSubmit")){
        document.getElementById("registerSubmit").addEventListener("click", registerUser, false);
    } else {
        console.log("Register Submit Does Not Exist");
    }
}

document.getElementById("searchSubmit").addEventListener("click", search, false);

async function search() {
    const value = document.getElementById("searchbox").value;
    window.location.href = "/Search/search.html?ticker=" + value.toUpperCase()
}

async function addUser(){
    const name = document.getElementById("useremail").value;
    const hashedPassword = document.getElementById("userpassword").value;
    var authenticated;

    if (name && hashedPassword) {
        authenticated = authenticateUser(name, hashedPassword);
    }
}

async function registerUser(){
    
    const newName = document.getElementById("newuseremail").value;
    const newHashedPassword = document.getElementById("newuserpassword1").value;
    const newHashedPassword2 = document.getElementById("newuserpassword2").value;

    if (newHashedPassword == newHashedPassword2 && newHashedPassword && newName) {
        createUser(newName, newHashedPassword);
    }
}

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

// Takes Username and Password and returns positively if the user exists and negatively if not
async function authenticateUser(name, hashedPassword){
    await fetch(backendURL+'authenticateUser?name='+name+'&password='+hashedPassword).then( function (response) {
        return response.text();
    }).then( function (text){
        console.log(text);

        if (text == "Authenticated")
        {
            console.log("User authenticated");
            // User authentication is always true - FIX
            window.location.href="../index.html";
            isLoggedIn = true;
            document.cookie = 'username='+name+'; path=/';
            document.getElementById("favoritesPage").style.display = "inherit";
        } else {
            alert("User not authenticated");
        }
        
    }).catch((err) => {
        console.log("Cannot find /authenticateUser on backend.");
    })

    
}

// Takse usernames and hashed password. Returns if it was created or not.
async function createUser(name, hashedPassword){
    await fetch(backendURL+'createUser?name='+name+'&password='+hashedPassword).then( function (response) {    
        return response.text();
    }).then( function (text){
        console.log(text);
        window.location.href="./login.html"
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