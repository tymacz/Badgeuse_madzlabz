function clockingoff(){

    const  date = new Date()
    const localDate = date.toLocaleString("fr-FR").split(" ")
    let formatLocalDate=String(localDate).replace(/\//g,"-")
    formatLocalDate= formatLocalDate.split(",")
    let dateParts = formatLocalDate[0].split('-');
    let reformattedDateStr = dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0];
    const jour = date.getUTCDay()
    const url = window.location.search
    const urlParams = new URLSearchParams(url)
    const usr = urlParams.get('id')
    fetch(`http://192.168.1.213:8000/pointage/${usr}`)
        .then(response => response.json())
        .then(data => {
            const dateActuelle = new Date(reformattedDateStr)
            const day = dateActuelle.getUTCDay()
            for (let index = 0; index < day; index++) {
                const dataDate = new Date(data[index][0])
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
    
    console.log(tdElements)
    // Loop through each td element
    tdElements.forEach((tdElement) => {
      // Check if the text content is "--:--"
      console.log(tdElement)
      if (tdElement.textContent === '--:--') {
        // Remove the text from the td element
        console.log(tdElement)
        tdElement.innerText = '';
    
        // Add the button to the td element
        tdElement.appendChild(btn);
      }
    });
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
    
    window.onload = clockingoff(),redirect(),edit()