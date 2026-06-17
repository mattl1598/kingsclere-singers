import sass
from flask import Flask, Response, redirect, render_template_string, request, send_from_directory, url_for, send_file, \
	abort, make_response

app = Flask(__name__)


@app.route("/")
def index():
	return send_file('index.html')


@app.route("/jsx/<file>")
def jsx(file):
	response = make_response(send_file(f"jsx/{file}"))
	mimetype = 'text/jsx'
	response.headers['mimetype'] = mimetype
	return response


@app.route("/css/<file>")
@app.route("/app.css")
def css(file="app.css"):
	fp = 'scss/' + file.replace(".css", ".scss")
	try:
		output = sass.compile(filename=fp.replace("\\", "/"))
		response = Response(
			output,
			mimetype='text/css'
		)
		return response
	except OSError as e:
		print(e)
		abort(404)


@app.get("/img/<path:path>")
def img(path):
	return send_from_directory(f"img/", path)


@app.get("/img/photo.jpg")
def photo():
	return send_file('img/photo.jpg')


@app.get("/img/poster1.webp")
def photo2():
	return send_file('img/poster1.webp')


@app.get("/img/logo.svg")
def logo():
	return send_file('img/logo.svg')


@app.get("/img/profile_picture.webp")
def photo3():
	return send_file('img/profile_picture.webp')


if __name__ == '__main__':
	# This will create the database if it doesn't already exist.
	app.run(host='0.0.0.0')


