document.getElementById("searchSubmit").addEventListener("click", search, false);
window.onload=init;

async function init(){
    if (!document.cookie){
        document.getElementById("favoritesPage").style.display = "none";
    }
}

async function search() {
    const value = document.getElementById("searchbox").value;
    window.location.href = "/Search/search.html?ticker=" + value.toUpperCase()
}