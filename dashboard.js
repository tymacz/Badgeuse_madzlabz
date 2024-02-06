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

window.onload = display()