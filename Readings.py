#!/usr/bin/env python
# -*- coding: utf8 -*-
# Version modifiée de la bibliothèque https://github.com/mxgxw/MFRC522-python

import RPi.GPIO as GPIO
import MFRC522
import signal

continue_reading = True

# Fonction qui arrête la lecture proprement
def end_read(signal, frame):
    global continue_reading
    print("Lecture terminée")
    continue_reading = False
    GPIO.cleanup()

signal.signal(signal.SIGINT, end_read)
MIFAREReader = MFRC522.MFRC522()

print("Passer le tag RFID à lire")

while continue_reading:
    # Détecter les tags
    (status, TagType) = MIFAREReader.MFRC522_Request(MIFAREReader.PICC_REQIDL)
    
    # Une carte est détectée
    if status == MIFAREReader.MI_OK:
        print("Carte détectée")

        # Récupération UID
        (status, uid) = MIFAREReader.MFRC522_Anticoll()

        if status == MIFAREReader.MI_OK:
            print("UID de la carte : "+str(uid[0])+"."+str(uid[1])+"."+str(uid[2])+"."+str(uid[3]))

            # Clé d'authentification par défaut
            key = [0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF]

            # Sélection du tag
            MIFAREReader.MFRC522_SelectTag(uid)

            # Authentification
            status = MIFAREReader.MFRC522_Auth(MIFAREReader.PICC_AUTHENT1A, 8, key, uid)

            if status == MIFAREReader.MI_OK:
                MIFAREReader.MFRC522_Read(8)
                MIFAREReader.MFRC522_StopCrypto1()
            else:
                print("Erreur d'Authentification")
