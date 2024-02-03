const miss = document.getElementById("missing");
miss.style.color = "red";
miss.style.display = "none";


function user(){
    const url = window.location.search
    const urlParams = new URLSearchParams(url)
    const usr = urlParams.get('id')
    return usr
}


function clocking(id) {
    console.log(id)
    fetch(`http://192.168.1.213:8000/pointage/${id}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            for (let index = 0; index < data.length; index++) {
                for (let i = 0; i < 4; i++) {
                    if (data[index][i] == null) {
                        miss.style.display = "flex"
                    }
                }
            }
        })
}
function dashboard(id) {
    fetch(`http://192.168.1.213:8000/post/${id}`)
        .then(response => response.json())
        .then(data => {
            console.log(data[0])
            if (data[0] == "RH") {
                console.log("ok")
                document.getElementById("manage").style.display = "flex"
            }
        })
}

function redirect() {
    const url = window.location.search
    const urlParams = new URLSearchParams(url)
    const usr = urlParams.get('id')
    const a = document.querySelectorAll("a")
    for (var i = 0; i < a.length; i++) {
        a[i].href += `?id=${usr}`
    }
}

window.onload = clocking(user()), dashboard(user()), redirect()