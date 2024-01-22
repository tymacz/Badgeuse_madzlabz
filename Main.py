from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
#from fastapi import SQL.connector

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return{"UwU": "Oni chan"}

@app.get("/pointage")
def read_item():
    return{"date": "2024/01/20","arriver_matin":"9 AM","depart_matin":"12 AM","arriver_aprem":"1 PM","depart_aprem":"null"}



@app.post("/")
def read_root():
    return{"UwU": "Oni chan"}

@app.post("/items/")
def read_item():
    return{"UwU": "salut"}

