#!/usr/bin/env python
# -*- coding: utf8 -*-
# Version modifiee de la librairie https://github.com/mxgxw/MFRC522-python

import RPi.GPIO as GPIO
import MFRC522
import signal
import mysql.connector
import time
import datetime

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


while continue_reading:
    # Detecter les tags
    (status,TagType) = MIFAREReader.MFRC522_Request(MIFAREReader.PICC_REQIDL)

    # Une carte est detectee
    # Recuperation UID
    (status,uid) = MIFAREReader.MFRC522_Anticoll()

    if status == MIFAREReader.MI_OK:
        x = datetime.datetime.now()
        key_badge = str(uid[0])+"."+str(uid[1])+"."+str(uid[2])+"."+str(uid[3])
        sql = ("select arrive_matin,depart_matin,arrive_soir,depart_soir  from journee inner join employee on journee.id_badge = employee.id_badge where jour = %s and key_badge = %s")
        cursor.execute(sql,(x.strftime("%Y-%m-%d"),key_badge))
        value = cursor.fetchall()
        key = [key_badge]
        idSql = ("select id_badge ,nom , prenom from employee where key_badge = %s")
        cursor.execute(idSql,(key))
        id = cursor.fetchone()
        try :
         if (len(value[0])==4):
          nonecpt = value.count(None)
          match nonecpt :
           case 4:
            sendSql= ("insert into journee (jour, arrive_matin,id_badge) values(%s,%s,%s)")
            cursor.execute(sendSql,(x.strftime("%Y-%m-%d"),x.strftime("%X"),id[0]))
            connection.commit()
            print ("Hi",id[1],id[2] )
            print (value)
           case 3:
            sendSql=("update journee set depart_matin = %s where jour = %s and id_badge = %s")
            cursor.execute(sendSql,(x.strftime("%X"),x.strftime("%Y-%m-%d"),id[0]))
            connection.commit()
            print ("Bye",id[1],id[2])
           case 2: 
            sendSql=("update journee set arrive_soir = %s where jour = %s and id_badge = %s")
            cursor.execute(sendSql,(x.strftime("%X"),x.strftime("%Y-%m-%d"),id[0]))
            connection.commit()
            print ("Hi",id[1],id[2])
           case 1 :
            sendSql = ("update journee set depart_soir = %s where jour = %s and id_badge = %s")
            cursor.execute(sendSql,(x.strftime("%X"),x.strftime("%Y-%m-%d"),id[0]))
            connection.commit() 
            print("Bye",id[1],id[2])
           case 0 :
            print ("Error : all clocking off are made")
        except : 
         print ("badge not recognized")
        time.sleep(5)
