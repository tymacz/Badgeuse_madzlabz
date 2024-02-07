var weekday = NrSemaine(currentDate());
let tab;

const url = window.location.search;
const urlParams = new URLSearchParams(url);
let userId = urlParams.get('id');


function user(){
    const url = window.location.search;
    const urlParams = new URLSearchParams(url);
    userId = urlParams.get('id');
    console.log(userId)
    return userId;
}

let usr = user()

function clockingoff(){
fetch(`http://10.191.14.110:8000/pointage/${userId}`)
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
    const a = document.querySelectorAll("a")
    for (var i=0; i < a.length ; i++ ) {
        a[i].href +=`?id=${userId}` 
    }
}

function NrSemaine(madate) {
    var prem = new Date(madate.getUTCFullYear(),0,1);
    var sem = Math.floor((((madate - prem) / 86400000) + (madate.getUTCDay()))/7);
    return sem
    }

    function getDateFromDayAndWeek(dayOfWeek, weekNumber) {
        const CDate = new Date(2024, 1, 0); // Créez une date de référence pour l'année en cours
        CDate.setDate(1); // Réglez la date sur le premier jour du mois (1er janvier)
        console.log(CDate)
        CDate.setDate(weekday*7)
        console.log(CDate)
        // Réglez le jour de la semaine en fonction du numéro du jour (1 pour lundi, 2 pour mardi, etc.)
        CDate.setDate(CDate.getDate() + (dayOfWeek - CDate.getDay() + 7) % 7);
        console.log((dayOfWeek - CDate.getDay() + 7) % 8)
        // Réglez le jour du mois en fonction du numéro de la semaine
        CDate.setDate(CDate.getDate())
        
        return CDate;
      }

function editCase(){
    fetch(`http://10.191.14.110:8000/pointage/${userId}`)
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

            console.log("choix : ", choix)
            const date = getDateFromDayAndWeek(colonne,weekday)
            const localDate = date.toLocaleString("fr-FR").split(" ")
            let formatLocalDate=String(localDate).replace(/\//g,"-")
            formatLocalDate= formatLocalDate.split(",")
            let dateParts = formatLocalDate[0].split('-');
            let reformattedDateStr = dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0];
            console.log(reformattedDateStr)
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
                            updateEmployee(choix, reformattedDateStr, input.value, userId);
                        }
                        
                    } else if (e.key === 'Escape') {
                        // Annule les modifications si l'utilisateur appuie sur la touche Escape
                        cell.textContent = oldValue;
                    }
                });
    
                // Gère l'événement de pression de touche sur l'entrée
                input.addEventListener('keydown', function (e) {
                    if (e.key === 'Enter') {
                        console.log(input.value);
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

function updateEmployee(choix, jour, heure, userId) {
  // Configurer l'en-tête de la requête pour indiquer que les données sont au format JSON
  const headers = {
    'Content-Type': 'application/json'
  };
 
    console.log(userId)
  
 
  let user = parseInt(userId)

  // Effectuer la requête HTTP
  fetch(`http://10.191.14.110:8000/modifhorraire/${choix}/${jour}/${heure}/${userId}`, {
    method: 'POST', // Spécifier la méthode HTTP POST
    headers: headers, // Ajouter l'en-tête Content-Type
    body: JSON.stringify({ // Convertir les données en format JSON
      choix: choix,
      jour: jour,
      heure: heure,
      userId: userId
    })
  })
    .then(response => response.json()) // Convertir la réponse en JSON
    .then(data => {
      // Traiter la réponse de la requête POST
      console.log('Réponse de la requête POST :', data);
    })
    .catch(error => {
      console.error('Erreur lors de la requête POST :', error);
      // Gérer les erreurs de la requête POST
    });
}

function dashboard() {
    fetch(`http://10.191.14.110:8000/post/${usr}`)
        .then(response => response.json())
        .then(data => {
            if (data[0] == "RH") {
                console.log("ok")
                document.getElementById("manage").style.display = "flex"
            }
        })
}


window.onload = clockingoff(),redirect(),editCase(),dashboard()