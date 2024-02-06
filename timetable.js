const id = 1;
const currentDate = new Date().toISOString().split('T')[0];
const apiUrl = `http://10.191.14.110:8000/pointage/${id}/${currentDate}`;

// 1. Récupérer les données de l'API
fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    // 2. Traiter les données pour obtenir les informations nécessaires
    const hoursData = data.hours || []; // Assurez-vous que "data.hours" existe, sinon, initialisez-le à un tableau vide

    // 3. Ajouter les événements dynamiquement à la liste calendarEvents d'EvoCalendar
    const calendarEvents = [
      {
        name: "Total Hours",
        badge: "Total",
        description: "Total hours worked for the day",
        type: "event",
        date: currentDate,
        // Ajouter une propriété "hours" avec les données récupérées de l'API
        hours: hoursData
      }
    ];

    // 4. Gérer le cas où il manque des valeurs (moins de 4 valeurs)
    if (hoursData.length < 4) {
      // Afficher les informations manquantes dans le tableau avec une couleur différente
      console.log("Il manque des valeurs dans le tableau.");
      // Vous pouvez ajouter votre logique ici pour mettre en surbrillance les cellules manquantes dans le tableau
    }

    // Initialiser le calendrier EvoCalendar avec les événements
    $("#evoCalendar").evoCalendar({
      calendarEvents: calendarEvents
    });
  })
  .catch(error => console.error('Erreur lors de la récupération des données de l\'API:', error));


function redirect () {
  const url = window.location.search
  const urlParams = new URLSearchParams(url)
  const usr = urlParams.get('id')
  const a = document.querySelectorAll("a")
  for (var i=0; i < a.length ; i++ ) {
    console.log(a[i].href)
    a[i].href +=`?id=${usr}` 
    console.log(a[i].href)  
  }
}

window.onload = redirect()