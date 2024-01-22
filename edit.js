
fetch("http://192.168.1.192:8000/pointage")
    .then(response => response.json())
    .then(data => {
        console.log(data.date)
        const date = new Date(data.date);
        console.log(date.getUTCDay()+1,date)
        document.getElementById("morning_arrived_hour_"+date.getUTCDay()).textContent = data.arriver_matin
        document.getElementById("morning_leaving_hour_"+date.getUTCDay()).textContent = data.depart_matin
        document.getElementById("afternoon_arrived_hour_"+date.getUTCDay()).textContent = data.arriver_aprem
        document.getElementById("afternoon_leaving_hour_"+date.getUTCDay()).textContent = data.depart_aprem
        console.log(data.arriver_matin, data.depart_matin)
    })