from random import randint
from flask import Flask, jsonify, render_template, request

app = Flask(__name__)

players = {}


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/join', methods=('POST',))
def join():
    edge = 300
    players[request.remote_addr] = {
        'ip': request.remote_addr,
        'position': [randint(-edge, edge), 0, randint(-edge, edge)]
    }
    return 'OK'


@app.route('/move', methods=('POST',))
def move():
    player = players[request.remote_addr]
    pos = player['position']
    movement = request.json
    pos[0] += movement[0]
    pos[2] += movement[1]
    return 'OK'


@app.route('/state')
def state():
    return jsonify({'players': list(players.values())})


app.run(host='0.0.0.0', debug=True)
