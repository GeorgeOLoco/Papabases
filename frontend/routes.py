from flask import Flask, render_template, request, flash, redirect, url_for, abort
from flask_mysqldb import MySQL
from frontend import app, db  # initially created by __init__.py, need to be used here
from frontend.forms import *
import requests

@app.route("/")
def index():
    return render_template("landing.html", pageTitle="Login Page")



@app.route("/signuppages/signuphandlers.html")
def signup_handler():
    return render_template("/signuppages/signuphandlers.html", pageTitle="Sign up Handler")

@app.route("/signuppages/signupteachers.html")
def signup_teacher():
    return render_template("/signuppages/signupteachers.html", pageTitle="Sign up Teacher")

@app.route("/signuppages/signupstudents.html")
def signup_student():
    return render_template("/signuppages/signupstudents.html", pageTitle="Sign up Student")

@app.route("/wait_for_approval.html")
def wait_for_approval():
    return render_template("/signuppages/wait_for_approval.html", pageTitle="Wait up")



@app.route("/adduser/<username>/<password>/<user_name>/<birthday>/<email>",methods=["POST"])
def signup_user_to_db(username,password,user_name,birthday,email):
    url = request.args.get('http://localhost:3305/adduser/{}/{}/{}/{}/{}'.format(username,password,user_name,birthday,email)) 
    if url:
        try:
            response = requests.get(url)
            response.raise_for_status()  # Raise an exception for unsuccessful status codes (4xx or 5xx)
            return render_template("/signuppages/wait_for_approval.html", pageTitle="Come back soon")# Return the content of the response
        except requests.exceptions.RequestException as e:
            return f"An error occurred: {e}"
    else:
        return "Please provide a valid URL."




@app.route("/student.html")
def page_for_student():
    return render_template("/student.html", pageTitle="Home Page")

@app.route("/teacher.html")
def page_for_teacher():
    return render_template("/teacher.html", pageTitle="Home Page")

@app.route("/handler.html")
def page_for_handler():
    return render_template("/handler.html", pageTitle="Home Page")

@app.route("/mastoras.html")
def page_for_mastoras():
    return render_template("/mastoras.html", pageTitle="Home Page")