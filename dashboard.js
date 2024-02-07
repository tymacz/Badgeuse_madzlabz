function display () {
    fetch(`http://10.191.14.110:8000/all`)
    .then(response => response.json())
    .then(data => {
     console.log(data.res)
     let emp = document.getElementById("employee")
     for(let index = 0;index < data.res.length;index++) {
        let tr = document.createElement("tr");
        for(let indextd = 0 ;indextd <= data.res[index].length;indextd++){
            let td = document.createElement("td")
            td.textContent = data.res[index][indextd]
            tr.appendChild(td)
        }
        emp.appendChild(tr)
        
    }
    let tr = document.createElement("tr")
    for(let i =0;i<5;i++){
        let td = document.createElement("td")
            td.setAttribute("id","create_"+(i+1))
            switch (i) {
                case 0:{td.textContent="Add";tr.appendChild(td);break;  }
                case 1:{td.textContent="New";tr.appendChild(td);break;  }
                case 2:{td.textContent="Employee";tr.appendChild(td);break;  }
                case 3:{td.textContent="Click";tr.appendChild(td);break;  }
                case 4:{td.textContent="Here";tr.appendChild(td);break;  }}
            
            
    }
    emp.appendChild(tr)
})
}

function edit(){
    
    document.addEventListener('DOMContentLoaded', function () {
        const table = document.getElementById('myData');
    
        table.addEventListener('click', function (event) {
            const cell = event.target;
            
            // Vérifie si la cellule cliquée est différente de la cellule d'en-tête
            if (cell.tagName === 'TD') {
                // Vérifie si la cellule cliquée est l'une des cases "Add", "New", ou "Employee"
                const cellText = cell.textContent.trim();
                if (cellText === 'New' || cellText === 'Employee' || cellText === 'Click' || cellText === 'Here') {
                    // Crée un élément input pour éditer la cellule
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.style.backgroundColor = 'lightpink'; // Change la couleur de fond de l'input
    
                    // Remplace le contenu de la cellule par l'élément input
                    cell.innerHTML = '';
                    cell.appendChild(input);
    
                    // Focus sur l'élément input et sélectionne tout le texte
                    input.focus();

                    
    
                    // Gère l'événement de pression de touche sur l'entrée
                    input.addEventListener('keydown', function (e) {
                        if (e.key === 'Enter') {
                            // Met à jour la valeur de la cellule avec la nouvelle valeur de l'entrée
                            const newEmployeeName = input.value;

                            switch (cellText) {
                                case 'New':
                                    newValueNom = input.value;
                                    break;
                                case 'Employee':
                                    employeeValuePrenom = input.value;
                                    break;
                                case 'Click':
                                    clickValueJob = input.value;
                                    break;
                                case 'Here':
                                    hereValueKey = input.value;
                                    break;
                                default:
                                    break;
                            }
                            console.log(newValueNom, employeeValuePrenom, clickValueJob, hereValueKey)

                            // Appelle updateEmployee avec les valeurs appropriées
                            
                        } else if (e.key === 'Escape') {
                            // Annule les modifications si l'utilisateur appuie sur la touche Escape
                        }
                    });

                    
                }
            }
        });

        const btnN = document.getElementById("send");
        
        // Ajoutez un écouteur d'événements au bouton "send" pour activer la fonction ajoutEmployee()
        btnN.addEventListener("click", function() {
            ajoutEmployee(newValueNom, employeeValuePrenom, clickValueJob, hereValueKey);
        });
    });

}


function ajoutEmployee(nom, prenom, poste, key_badge) {
  // Configurer l'en-tête de la requête pour indiquer que les données sont au format JSON
  const headers = {
    'Content-Type': 'application/json'
  };

  // Effectuer la requête HTTP
  fetch(`http://10.191.14.110:8000/addemp/${nom}/${prenom}/${poste}/${key_badge}`, {
    method: 'POST', // Spécifier la méthode HTTP POST
    headers: headers, // Ajouter l'en-tête Content-Type
    body: JSON.stringify({ // Convertir les données en format JSON
      nom: nom,
      prenom: prenom,
      poste: poste,
      key_badge: key_badge
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


window.onload = display(),edit()