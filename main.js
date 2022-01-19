const svgGroup = document.getElementById('svgGroup');
const canvasGroup = document.getElementById('canvasGroup');
let title = document.getElementById('title');
const buttonSwitch = document.getElementById('switch');
const buttonStartPause = document.getElementById('start');
const buttonReset = document.getElementById('reset');

const planetSVGs = document.querySelectorAll('.planet');
let running = true;
let canvasActive = false;
const svgState = false;
const canvasState = true;

function resetState(state) {
    svgGroup.hidden = state;
    canvasGroup.hidden = !state;
    canvasActive = state;

    setStart();
}
function setStart() {
    running = true;
    buttonStartPause.textContent = 'Pause';
}
function setPause() {
    running = false;
    buttonStartPause.textContent = 'Start';
}
function startSVG() {
    for (let i = 0; i < planetSVGs.length; i++) {
        planetSVGs[i].style.animationPlayState = 'running';
        planetSVGs[i].classList.add('planet');
    }
}

//Technologie wechseln
buttonSwitch.addEventListener('click', ev => {
    if (title.textContent === 'SVG') {
        title.textContent = 'Canvas';
        resetCanvas();
        animate();
        resetState(canvasState);
    } else {
        title.textContent = 'SVG';
        resetState(svgState);
        startSVG();
    }
});
// Start/Pause
buttonStartPause.addEventListener('click', ev => {
   if (running) {
       //Canvas
       cancelAnimationFrame(animation);

       //SVG
       for (let i = 0; i < planetSVGs.length; i++) {
           planetSVGs[i].style.animationPlayState = 'paused';
       }


       setPause();
   } else {
       if (canvasActive) {
           // Canvas
           animate();
       } else {
           //SVG
           startSVG();
       }

       setStart()
   }
});
// Reset
buttonReset.addEventListener('click', ev => {
    if (canvasActive) {
        //Canvas
        resetCanvas();
        initCanvas();
        clearCanvas();
        planets.forEach(planet => {
            planet.update();
        })
    } else {
        //SVG
        for (let i = 0; i < planetSVGs.length; i++) {
            planetSVGs[i].classList.remove('planet');
            void planetSVGs[i].offsetHeight;
            void planetSVGs[i].offsetWidth;
        }
    }


    setPause();
});