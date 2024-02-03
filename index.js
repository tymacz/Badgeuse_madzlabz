const btn = document.getElementById("btn")
btn.addEventListener("click",(event)=> {event.preventDefault(); connexion()});

function connexion() {
    const name = document.getElementById("name").value
    const id = document.getElementById("id").value
  fetch(`http://192.168.1.213:8000/connexion/${name}/${id}`)
    .then((response) => response.json())
    .then((data) => {
        if(data.length!=0){
            window.location.href=`http://192.168.1.213/html/home_page.html?id=${id}`
        }else{
          
        }
      })
    .catch((error) => console.error("Erreur lors de la requête API :", error));
} 