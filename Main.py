from fastapi import fastapi
from fastapi import SQL.connector

app = FastAPI()

@app.get("/")
def read_root():
    return{"UwU": "Oni chan"}

@app.get("/items/")
def read_item():
    return("UwU": "salut")



@app.post("/")
def read_root():
    return{"UwU": "Oni chan"}

@app.post("/items/")
def read_item():
    return("UwU": "salut")

