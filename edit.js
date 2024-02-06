var weekday = NrSemaine(currentDate());
let tab;
function clockingoff(){
const url = window.location.search
const urlParams = new URLSearchParams(url)
const usr = urlParams.get('id')
fetch(`http://10.191.14.110:8000/pointage/${usr}`)
    .then(response => response.json())
    .then(data => {
        const day = currentDate().getUTCDay()
        var ind = NrSemaine(currentDate()) - weekday
        ind = ind*5
        const dataDateTest = new Date(data[0][0])
        if(dataDateTest.getUTCDay()!=day){
            alert("No clocking off this week")

        }else{
            for(let i =0;i<5;i++){
                document.getElementById("morning_arrived_hour_"+(i+1)).textContent = ""
                document.getElementById("morning_leaving_hour_"+(i+1)).textContent = ""
                document.getElementById("afternoon_arrived_hour_"+(i+1)).textContent = ""
                document.getElementById("afternoon_leaving_hour_"+(i+1)).textContent = ""
            }
            document.getElementById("s").textContent = "Week : " + (weekday)
            if(ind != 0){
                ind+=day
                for (let index = 0; index < 5; index++) {
                    const dataDate = new Date(data[index+ind][0])
                    console.log("data index+ind ",data[index+ind])
                    const cellDate = new Date(data[index + ind][0]);
                    cell.setAttribute('data-date', cellDate.toISOString());
                    for(let i =0;i<4; i++){
                        if(data[index][i]==0){
                            data[index][i] = null
                        }
                    }
                    document.getElementById("morning_arrived_hour_"+dataDate.getUTCDay()).textContent = formatTime(data[index+ind][1])
                    document.getElementById("morning_leaving_hour_"+dataDate.getUTCDay()).textContent = formatTime(data[index+ind][2])
                    document.getElementById("afternoon_arrived_hour_"+dataDate.getUTCDay()).textContent = formatTime(data[index+ind][3])
                    document.getElementById("afternoon_leaving_hour_"+dataDate.getUTCDay()).textContent = formatTime(data[index+ind][4])
                    
                }
            }else{
                for (let index = 0; index < day; index++) {
                    const dataDate = new Date(data[index][0])
                    console.log(dataDate.getUTCDay())
                    for(let i =0;i<4; i++){
                        if(data[index][i]==0){
                            data[index][i] = null
                        }
                    }

                    document.getElementById("morning_arrived_hour_"+dataDate.getUTCDay()).textContent = formatTime(data[index][1])
                    document.getElementById("morning_leaving_hour_"+dataDate.getUTCDay()).textContent = formatTime(data[index][2])
                    document.getElementById("afternoon_arrived_hour_"+dataDate.getUTCDay()).textContent = formatTime(data[index][3])
                    document.getElementById("afternoon_leaving_hour_"+dataDate.getUTCDay()).textContent = formatTime(data[index][4])
                    
                }
            }
        
            
        }

 
    })
}
function formatTime(seconds) {
    if(seconds ==null){
        return ("--:--")
    }
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    const ampm = hrs > 11 ? 'PM' : 'AM';
    const hrsFormatted = (hrs % 12) || 12;
    return `${hrsFormatted.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')} ${ampm}`;
}

function edit(){
 // Select all td elements
const tdElements = document.querySelectorAll('td');
const btn = document.createElement("button")
btn.innerText="edit"
// Loop through each td element
tdElements.forEach((tdElement) => {
  // Check if the text content is "--:--"
  if (tdElement.textContent === '--:--') {
    // Remove the text from the td element
    tdElement.innerText = '';

    // Add the button to the td element
    tdElement.appendChild(btn);
  }
});
}

const btnP = document.getElementById("prev")
const btnN = document.getElementById("next")
btnP.addEventListener("click",(event)=> {event.preventDefault(); week(2)});
btnN.addEventListener("click",(event)=> {event.preventDefault(); week(1)});

function currentDate(){
    const  date = new Date()
    const localDate = date.toLocaleString("fr-FR").split(" ")
    let formatLocalDate=String(localDate).replace(/\//g,"-")
    formatLocalDate= formatLocalDate.split(",")
    let dateParts = formatLocalDate[0].split('-');
    let reformattedDateStr = dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0];
    const dateActuelle = new Date(reformattedDateStr)
    return dateActuelle
}

function week(ind){
    if(ind == 1){
        weekday+=1
        if(weekday > 52){
            weekday = 1;
        }
        clockingoff()
        return weekday
    }else{
        weekday-=1
        if(weekday < 1){
            weekday = 52;
        }
        clockingoff()
        return weekday
    }
}
    
function redirect () {
    const url = window.location.search
    const urlParams = new URLSearchParams(url)
    const usr = urlParams.get('id')
    const a = document.querySelectorAll("a")
    for (var i=0; i < a.length ; i++ ) {
        a[i].href +=`?id=${usr}` 
    }
}

function NrSemaine(madate) {
    var prem = new Date(madate.getUTCFullYear(),0,1);
    var sem = Math.floor((((madate - prem) / 86400000) + (madate.getUTCDay()))/7);
    return sem
    }

function editCase(){
    const url = window.location.search
    const urlParams = new URLSearchParams(url)
    const usr = urlParams.get('id')
    fetch(`http://10.191.14.110:8000/pointage/${usr}`)
    .then(response => response.json())
    .then(data => {
        console.log(data[0][0])
    })
    document.addEventListener('DOMContentLoaded', function () {
        const table = document.getElementById('myTable');
    
        table.addEventListener('click', function (event) {
            const cell = event.target
            


            let choix
            if (cell.id.includes("morning_arrived_hour")) {
                choix = 1;
            } else if (cell.id.includes("morning_leaving_hour")) {
                choix = 2;
            } else if (cell.id.includes("afternoon_arrived_hour")) {
                choix = 3;
            } else if (cell.id.includes("afternoon_leaving_hour")) {
                choix = 4;
            } else {
                choix = null;
            }
            let colonne
            if (cell.id.includes("1")) {
                colonne = 1;
            } else if (cell.id.includes("2")) {
                colonne = 2;
            } else if (cell.id.includes("3")) {
                colonne = 3;
            } else if (cell.id.includes("4")) {
                colonne = 4;
            } else {
                colonne = null;
            }

            dateApelle = //data[colonne][choix]
            console.log("choix : ", choix)
    
            // Vérifie si la cellule cliquée est différente de la cellule d'en-tête
            if (cell.tagName === 'TD') {
                const oldValue = cell.textContent;
    
                // Crée un élément input pour éditer la cellule
                const input = document.createElement('input');
                input.type = 'text';
                input.value = oldValue;
                input.style.backgroundColor = 'lightblue'; // Change la couleur de fond de l'input
    
                // Remplace le contenu de la cellule par l'élément input
                cell.innerHTML = '';
                cell.appendChild(input);
    
                // Focus sur l'élément input et sélectionne tout le texte
                input.focus();
                input.select();

                // Gère l'événement de pression de touche sur l'entrée
                input.addEventListener('keydown', function (e) {
                    if (e.key === 'Enter') {
                        // Met à jour la valeur de la cellule avec la nouvelle valeur de l'entrée
                        cell.textContent = input.value;
                        // Appelle updateEmployee avec les valeurs appropriées
                        if(choix != null)
                        {
                            updateEmployee(choix, dateApelle, input.value);
                        }
                        
                    } else if (e.key === 'Escape') {
                        // Annule les modifications si l'utilisateur appuie sur la touche Escape
                        cell.textContent = oldValue;
                    }
                });
    
                // Gère l'événement de pression de touche sur l'entrée
                input.addEventListener('keydown', function (e) {
                    if (e.key === 'Enter') {
                        // Met à jour la valeur de la cellule avec la nouvelle valeur de l'entrée
                        cell.textContent = input.value;
                    } else if (e.key === 'Escape') {
                        // Annule les modifications si l'utilisateur appuie sur la touche Escape
                        cell.textContent = oldValue;
                    }
                });
    
                // Gère l'événement click sur le document pour fermer la zone de texte
                document.addEventListener('click', function (e) {
                    if (!cell.contains(e.target)) {
                        // Si le clic est en dehors de la cellule, enlève l'élément input
                        cell.textContent = oldValue;
                    }
                });
            }
        });
    });
    
}

function updateEmployee(choix, jour, heure) {
    const id_badge = 2; // Vous avez mentionné que l'id_badge est toujours égal à 2

    // Construire l'URL de l'API
    const url = `http://10.191.14.110:8000/modifhorraire/${choix}/${jour}/${heure}/${id_badge}`;

    // Configurer les options de la requête POST
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ choix, jour, heure, id_badge }) // Convertir les données en format JSON
    };

    // Effectuer la requête HTTP
    fetch(url, options)
        .then(response => response.json())
        .then(data => {
            console.log(data); // Gérer la réponse de l'API
            // Vous pouvez ajouter d'autres actions à effectuer après la réponse de l'API
        })
        .catch(error => {
            console.error('Erreur lors de la requête POST :', error);
            // Gérer les erreurs de la requête POST
        });
}


window.onload = clockingoff(),redirect(),edit(),editCase()