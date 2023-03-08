
window.onload=init;

// document.addEventListener('load', init);
async function init(){
    let helloWorldPrint = document.getElementById("helloworld");
    await fetch('http://localhost:8080/hello?name=Devin', {mode: 'no-cors'}).then((response) => {
        response.text();
    }).then((text) => {
        console.log(text);
    });
}

// , {
//     method: 'GET',
//     headers: {
//         "Access-Control-Allow-Origin": "*",
//         "Content-Type": "text/plain"
//     },
//     mode: 'no-cors'
//     // ,
//     // body: response
// }