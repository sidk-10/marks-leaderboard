from flask import Flask, render_template, send_from_directory

app = Flask(__name__, template_folder="./views/public", static_folder="./views/public", static_url_path='')

@app.route('/')
def index():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)