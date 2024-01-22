#!/usr/bin/env python
# -*- coding: utf8 -*-
# Version modifiee de la librairie https://github.com/mxgxw/MFRC522-python

import RPi.GPIO as GPIO
import MFRC522
import signal
import mysql.connector
import time

continue_reading = True

connection = mysql.connector.connect(
    host='127.0.0.1',
    user='max',
    password='root',
    database='Badge'
)
cursor = connection.cursor()

# Fonction qui arrete la lecture proprement 
def end_read(signal,frame):
    global continue_reading
    print ("Lecture terminée")
    continue_reading = False
    GPIO.cleanup()

signal.signal(signal.SIGINT, end_read)
MIFAREReader = MFRC522.MFRC522()

print ("Passer le tag RFID a lire")

while continue_reading:
    
    # Detecter les tags
    (status,TagType) = MIFAREReader.MFRC522_Request(MIFAREReader.PICC_REQIDL)

    # Une carte est detectee
    if status == MIFAREReader.MI_OK:
        print ("Carte detectee")
        
    # Recuperation UID
    (status,uid) = MIFAREReader.MFRC522_Anticoll()

    if status == MIFAREReader.MI_OK:
        key_badge = str(uid[0])+"."+str(uid[1])+"."+str(uid[2])+"."+str(uid[3])
        sql = ("select arrive_matin,depart_matin,arrive_soir,depart_soir  from journee inner join employee on journee.id_badge = employee.id_badge where jour = %s and key_badge = %s")
        cursor.execute(sql,("2024-01-22",key_badge))
        value = cursor.fetchall()
        key = [key_badge]
        idSql = ("select id_badge from employee where key_badge = %s")
        cursor.execute(idSql,(key))
        id = cursor.fetchone()
        if (len(value)==0):
         sendSql= ("insert into journee (jour, arrive_matin,id_badge) values(%s,%s,%s)")
         cursor.execute(sendSql,("2024-01-22","9:00",id[0]))
         connection.commit()
        value1 =value[0].count(None)
        print ("UID de la carte : ",value1)
        # Clee d authentification par defaut
        key = [0xFF,0xFF,0xFF,0xFF,0xFF,0xFF]
        # Selection du tag
        MIFAREReader.MFRC522_SelectTag(uid)

        # Authentification
        status = MIFAREReader.MFRC522_Auth(MIFAREReader.PICC_AUTHENT1A, 8, key, uid)

        if status == MIFAREReader.MI_OK:
            MIFAREReader.MFRC522_Read(8)
            MIFAREReader.MFRC522_StopCrypto1()
        else:
            print ("Erreur d\'Authentification")
        time.sleep(5)
