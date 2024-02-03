from fastapi import FastAPI, HTTPException, Response
from fastapi.middleware.cors import CORSMiddleware
import mysql.connector
from pydantic import BaseModel
from fastapi.responses import JSONResponse

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

connection = mysql.connector.connect(
    host='127.0.0.1',
    user='max',
    password='root',
    database='Badge'
)
cursor = connection.cursor()


    
@app.get("/")
def read_root():
    return{"Hello": "World"}

@app.get("/pointage/{id}")
def read_item(id , response : Response):
    sql = "select * from journee where id_badge = %s order by jour desc"
    value=[id] 
    cursor.execute(sql,value)
    id_day = cursor.fetchall()
    response.headers["Access-Control-Allow-Origin"] = "*"
    return JSONResponse(id_day)


@app.get("/pointage/{id}/{date}")
def read_itemDate(id, date):
     sql = "select arrive_matin, depart_matin, arrive_soir, depart_soir from journee where id_badge = %s and jour = %s"
     value=[id,date]
     cursor.execute(sql,value)
     id_day = cursor.fetchall()
     return {"res":id_day}

class Pointage(BaseModel):
    id: int
    date: str
    heure: str
    choix: int
    nom: str
    prenom: str
    poste: str
    key_badge: str
    jour: str
    arrive_matin: str
    depart_matin: str
    arrive_soir: str
    depart_soir:str


@app.get("/pointage/{id}/{date}/{heure}/{choix}")
def upd_pointage(id: int, date: str, heure: str, choix: int):
    print(id, date, heure, choix)
    
    if choix == 1:
        sql = "update journee set arrive_matin = %s where id_badge = %s and jour = %s"
    elif choix == 2:
        sql = "update journee set depart_matin = %s where id_badge = %s and jour = %s"
    elif choix == 3:
        sql = "update journee set arrive_soir = %s where id_badge = %s and jour = %s"
    elif choix == 4:
        sql = "update journee set depart_soir = %s where id_badge = %s and jour = %s"
    else:
        raise HTTPException(status_code=400, detail="Choix invalide, veuillez choisir parmi 1, 2, 3 ou 4.")

    cursor.execute(sql, (heure, id, date))
    connection.commit()
    
    return {"res": "good"}

@app.get("/pointage/{id}/{nom}/{prenom}/{poste}/{key_badge}")
def upd_employee(id: int, nom: str, prenom: str, poste: str, key_badge: str):
    sql = "update employee set nom = %s, prenom = %s, poste = %s, key_badge = %s where id_badge = %s"

    cursor.execute(sql, (nom, prenom, poste, key_badge, id))
    connection.commit()

    return {"res": "good"}

@app.post("/pointage/{nom}/{prenom}/{poste}/{key_badge}")
def upd_employee(nom: str, prenom: str, poste: str, key_badge: str):
     cursor.execute("SELECT MAX(id_badge) FROM employee")
     last_id = cursor.fetchone()[0]
     new_id = last_id + 1 if last_id is not None else 1
     sql = "INSERT INTO employee (id_badge, nom, prenom, poste, key_badge) VALUES (%s, %s, %s, %s, %s)"


     cursor.execute(sql, (new_id, nom, prenom, poste, key_badge))
     connection.commit()

     return {"res": "good"}


@app.post("/pointage/{jour}/{arrive_matin}/{depart_matin}/{arrive_soir}/{depart_soir}")
def upd_employee(jour: str, arrive_matin: str, depart_matin: str, arrive_soir: str, depart_soir: str):

     sql = "INSERT INTO journee (jour, arrive_matin, depart_matin, arrive_soir, depart_soir) VALUES (%s, %s, %s, %s, %s)"
 
     cursor.execute(sql, (jour, arrive_matin, depart_matin, arrive_soir, depart_soir))
     connection.commit()
 
     return {"res": "good"}

@app.get("/all")
def read_root():
    cursor.execute("select * from journee inner join employee on journee.id_badge = employee.id_badge")
    all = cursor.fetchall()
    return all

@app.get("/post/{id}")
def read_post(id):
    sql ="select poste from employee where id_badge = %s"
    value=[id]
    cursor.execute(sql,value)
    post = cursor.fetchall()
    return {"res":post}

@app.get("/connexion/{id}/{badge}")
def read_connexion(id,badge):
    sql="select * from employee where id_badge = %s and nom = %s"
    cursor.execute(sql,(badge,id))
    data=cursor.fetchall()
    return {"res":data}
        

