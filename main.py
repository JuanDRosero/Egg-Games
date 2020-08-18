# -*- coding: utf-8 -*-
"""
Created on Mon Aug 17 12:58:43 2020
    Pagina de Juegos
@author: Maria Fernanda Uribe Hernandez
        Yeimer Serrano Navarro 
        Juan David Rosero Torres
"""

from flask import Flask
from flask import render_template

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/Ping")
def Ping():
    return render_template("juego1.html")
@app.route("/Snake")
def Snake():
    return render_template("snakePagina.html")

if(__name__=="__main__"):
    app.run()
