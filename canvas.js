const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
let planets = [];
let animation;

canvas.width = 900;
canvas.height = 900;

const x = canvas.width / 2;
const y = canvas.height / 2;

function Planet(x, y, radius, color, velocity, orbitRadius) {
    this.x = x;
    this.y = y;
    this.startingPos = {
        x,
        y
    }
    this.radian = 0;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.orbitRadius = orbitRadius;
    this.draw = function () {
        context.beginPath();
        context.lineWidth = 1;
        context.arc(
            this.startingPos.x,
            this.startingPos.y,
            this.orbitRadius,
            0,
            Math.PI * 2,
            false
        );
        context.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        context.stroke();
        context.closePath();

        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
    };
    this.update = function () {
        this.radian += this.velocity;
        this.x = this.startingPos.x + Math.cos(this.radian) * this.orbitRadius;
        this.y = this.startingPos.y + Math.sin(this.radian) * this.orbitRadius;

        this.draw();
    };
}

function initCanvas() {
    planets = [];
    let sun = new Planet(x, y, 45, 'yellow', 0, 0);
    let mercury = new Planet(x, y, 3, '#696969', 0.03490658503988659153847381536977, 80);
    let venus = new Planet(x, y, 7, '#FF7F50', 0.01495996501709425351648877801562, 110);
    let earth = new Planet(x, y, 7, '#1E90FF', 0.00872664625997164788461845384244, 140);
    let mars = new Planet(x, y, 5, '#c4967f', 0.00455303283128955541806180200475, 180);
    let jupyter = new Planet(x, y, 21, '#2F4F4F', 0.00072722052166430399038487115353692, 250);
    let saturn = new Planet(x, y, 19, '#B8860B', 0.00028611954950726714375798209319485, 310);
    let uranus = new Planet(x, y, 17, '#87CEFA', 0.00010059534593627259809358448233364, 365);
    let neptune = new Planet(x, y, 15, '#4169E1', 0.000051408814491732829953569683902463, 415);
    planets.push(sun, mercury, venus, earth, mars, jupyter, saturn, uranus, neptune);
}

function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = '#141a26';
    context.fillRect(0, 0, canvas.width, canvas.height);
}

function animate() {
    animation = requestAnimationFrame(animate)
    clearCanvas();
    planets.forEach(planet => {
        planet.update();
    })

}

function resetCanvas() {
    cancelAnimationFrame(animation);
    context.clearRect(0, 0, canvas.width, canvas.height);
    initCanvas();
}
