import flask
from flask import request, jsonify
from flask_cors import CORS, cross_origin
from pymongo import MongoClient
import os
import json

app = flask.Flask(__name__)
app.config["DEBUG"] = True
CORS(app)

PORT = os.getenv('PORT', 8000)
HOST = os.getenv('HOST', '0.0.0.0')
DB_USER = os.getenv('DB_USER', 'user')
DB_PASS = os.getenv('DB_PASSWORD', 'password1!')
DB_HOST = os.getenv('DB_HOST', 'DevopsMongo')
DB_PORT = 27017

client = MongoClient(DB_HOST, DB_PORT, username=DB_USER, password=DB_PASS)
db = client.DevopsDB
collection = db.DevopsList

@app.route('/', methods=['GET'])
def home():
    return "<h1>Distant Reading Archive</h1><p>This site is a prototype API for distant reading of science fiction novels.</p>"

@app.route('/list', methods=['GET'])
def list():
    sentences = collection.find()
    docs = []
    for doc in sentences:
        docs.append(doc.get('sentence'))
    response = jsonify(docs)
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

@app.route('/add', methods=['POST'])
@cross_origin()
def add():
    data = json.loads(request.data)
    try:
        collection.insert_one(data)
        return "Sentence inserted successfully"
    except:
        return "Sentence was not inserted"


@app.route('/remove', methods=['DELETE'])
@cross_origin()
def delete():
    data = json.loads(request.data)
    try:
        test = collection.delete_one(data)
        return "Sentence removed successfully"
    except:
        return "Sentence was not removed"

if __name__ == '__main__':
    app.run(host=HOST, port=PORT)