from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import mysql.connector
from pydantic import BaseModel

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
def read_item(id):
    sql = "select * from journee where id_badge = %s"
    value=[id] 
    cursor.execute(sql,value)
    id_day = cursor.fetchall()
    return id_day


@app.get("/pointage/{id}/{date}")
def read_itemDate(id, date):
     sql = "select * from journee where id_badge = %s and jour = %s"
     value=[id,date]
     cursor.execute(sql,value)
     id_day = cursor.fetchall()
     return id_day


class Pointage(BaseModel):
    id: int
    date: str
    heure: str
    choix: int

@app.get("/pointage/{id}/{date}/{heure}/{choix}")
def read_item_date(id: int, date: str, heure: str, choix: int):
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



@app.get("/all")
def read_root():
    cursor.execute("select * from journee inner join employee on journee.id_badge = employee.id_badge")
    all = cursor.fetchall()
    return all

@app.get("/items/")
def read_item():
    return{"UwU": "salut"}

