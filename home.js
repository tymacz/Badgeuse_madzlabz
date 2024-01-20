const miss = document.getElementById("missing");
miss.style.color="red";
miss.style.display= "none";

fetch("http://192.168.1.192:8000/pointage")
    .then(response => response.json())
    .then(data => {
        if(data.arriver_aprem == "null" ||data.arriver_matin == "null" || data.depart_aprem=="null" ||data.depart_matin == "null"){
            miss.style.display="flex"
        }else{
            const morning =document.querySelectorAll("td#morning")
            for(let i =0 ; i<morning.length;i++){
                morning[i].textContent = data.matin
            }
            const afternoon =document.querySelectorAll("td#afternoon")
            for(let i =0 ; i<morning.length;i++){
                afternoon[i].textContent = data.aprem
            }
        }
        console.log(data.arriver_aprem, data.arriver_matin)
    })