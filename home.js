const miss = document.getElementById("missing");
miss.style.color = "red";
miss.style.display = "none";

var weekday = NrSemaine(currentDate());


function user(){
    const url = window.location.search
    const urlParams = new URLSearchParams(url)
    const usr = urlParams.get('id')
    return usr
}

let usr = user()

function clocking() {
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
                    document.getElementById("overtime_"+(i+1)).textContent = ""
                    document.getElementById("GlobalHours_"+(i+1)).textContent = ""
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
                        document.getElementById("GlobalHours_"+dataDate.getUTCDay()).textContent = toTimeString((data[index+ind][2]-data[index+ind][1])+(data[index+ind][4]-data[index+ind][3] ))
                        document.getElementById("overtime_"+dataDate.getUTCDay()).textContent = toTimeString(((data[index+ind][2]-data[index+ind][1])+(data[index+ind][4]-data[index+ind][3] ))-25200)
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
    
                        document.getElementById("GlobalHours_"+dataDate.getUTCDay()).textContent = toTimeString((data[index][2]-data[index][1])+(data[index][4]-data[index][3] ))
                        document.getElementById("overtime_"+dataDate.getUTCDay()).textContent = toTimeString(((data[index][2]-data[index][1])+(data[index][4]-data[index][3] ))-25200)
                    }
                }
                console.log(data[0][2])
    
            }
            data.forEach(element => {
                console.log(element)
                let sec = (element[2]-element[1])+(element[4]-element[3])
                console.log(toTimeString(sec))
            });
        
        

        


 
            for (let index = 0; index < data.length; index++) {
                for (let i = 0; i < 4; i++) {
                    if (data[index][i] == null) {
                        miss.style.display = "flex"
                    }
                }
            }
        })
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

function toTimeString(totalSeconds) {
    const totalMs = totalSeconds * 1000;
    if(totalSeconds>0){
        const result = new Date(totalMs).toISOString().slice(11, 19);
        return result
    }else{
        let stack = totalSeconds*(-1)
        stack *= 1000
        const result = new Date(stack).toISOString().slice(11, 19);
        return "-"+result
    }

  
  }

function redirect() {
    const a = document.querySelectorAll("a")
    for (var i = 0; i < a.length; i++) {
        a[i].href += `?id=${usr}`
    }
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
    console.log("click",ind)
    if(ind == 1){
        weekday+=1
        if(weekday > 52){
            weekday = 1;
        }
        console.log(weekday)
        clocking()
        return weekday
    }else{
        weekday-=1
        if(weekday < 1){
            weekday = 52;
        }
        console.log(weekday)
        clocking()
        return weekday
    }
}
function NrSemaine(madate) {
    var prem = new Date(madate.getUTCFullYear(),0,1);
    var sem = Math.floor((((madate - prem) / 86400000) + (madate.getUTCDay()))/7);
    return sem
    }

window.onload = dashboard(), clocking(),  redirect()