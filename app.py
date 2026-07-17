from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/nosotros')
def nosotros():
    return render_template('nosotros.html')

@app.route('/camara')
def camara():
    return render_template('camara.html')

@app.route('/coleccion')
def coleccion():
    return render_template('coleccion.html')

@app.route('/accesorio')
def accesorio():
    return render_template('accesorio.html')

@app.route('/photoboot')
def photoboot():
    return render_template('photoboot.html')

@app.route('/contacto')
def contacto():
    return render_template('contacto.html')

@app.route('/carrito')
def carrito():
    return render_template('carrito.html')

if __name__ == "__main__":
    app.run()