document.getElementById("searchSubmit").addEventListener("click", search, false);

async function search() {
    const value = document.getElementById("searchbox").value;
    window.location.href = "/Search/search.html?ticker=" + value.toUpperCase()
}