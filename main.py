import pymysql
from app import app
from db_config import mysql
from flask import jsonify
from flask import flash, request


def search():
    data= request.get_json()
    title=data["title"]
    author=data["author"]

    link= "https://www.googleapis.com/books/v1/volumes?q="

    if title:
        url += f"intitle:{title}"

    if author:
        url+= f"+inauthor:{author}"
    response= requests.get(url)
    results= response.json()
    return jsonify(results)