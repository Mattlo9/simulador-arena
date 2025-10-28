let grid;
let w = 10; //Ancho de cada celda
let cols, rows;

let canvas;
let ctx;
let mousePressed = false;

function Crear2dArray(rows, cols) {
    let arr = Array(rows);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(cols)
        for (let j = 0; j < arr[i].length; j++) {
            arr[i][j] = 0;
        }
    }
    return arr;
}

function setup() {
    canvas = document.getElementById('my-canvas')
    ctx = canvas.getContext('2d')

    canvas.addEventListener('mousedown', handleMousePress); //Detecta click
    canvas.addEventListener('mousemove', handleMouseMove); //Detecta movimiento

    canvas.addEventListener('mouseup', () => {
        mousePressed = false
    })

    rows = canvas.height / w; //Largo
    cols = canvas.width / w; //Ancho

    grid = Crear2dArray(rows, cols);
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            grid[i][j] = 0 //Para pintar las cuadriculas
        } 
    }
    requestAnimationFrame(draw)
}

function draw() {
    ctx.fillStyle = 'rgb(220, 220, 220)'; //Define el color
    ctx.fillRect(0, 0, canvas.width, canvas.height); //Rellena el canvas de ese color

    for (let i = 0; i < rows; i++) {
        for (j = 0; j < cols; j++) {
            //Posiciones
            let x = j * w; //Horizontal
            let y = i * w; //Vertical

            let state = grid[i][j]
            if (state === 1) {
                // ¡Elige tu color para la arena aquí!
                ctx.fillStyle = 'rgb(230, 190, 138)'; // Un color arena
            } else {
                // Es 0 (vacío), usa el color de fondo
                ctx.fillStyle = 'rgb(0, 0, 0)';
            }

            ctx.fillRect(x, y, w, w);


        }
    }

    //Calcula donde estara la arena en el siguiente fotograma
    let nextGrid = Crear2dArray(rows, cols);
    for (let i = 0; i < rows; i++) {
        for (j = 0; j < cols; j++) {
            let state = grid[i][j];

            if (state === 0) {
                continue
            }

            if (i < rows - 1) {
                let below = grid[i+1][j]; 
                if (below === 0) {
                    nextGrid[i][j] = 0;
                    nextGrid[i+1][j] = 1;
                } else {
                    let dir = (Math.random() < 0.5 ? 1 : -1);

                    let colA = j + dir
                    let colB = j - dir

                    if (colA >= 0 && colA < cols && grid[i+1][colA] === 0) {
                        nextGrid[i][j] = 0;
                        nextGrid[i+1][colA] = 1;
                    } else if (colB >= 0 && colB < cols && grid[i+1][colB] === 0) {
                            nextGrid[i][j] = 0;
                            nextGrid[i+1][colB] = 1;
                    } else {
                        nextGrid[i][j] = 1
                    }
                }
            } else {
                nextGrid[i][j] = 1;
            }

        }
    }
    grid = nextGrid;
    requestAnimationFrame(draw);
}

function handleMousePress(event) {
    mousePressed = true;
    addSand(event)
}

function handleMouseMove(event) {
    if (mousePressed) {
        addSand(event)
    }
}

function addSand(event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const Mousecol = Math.floor(mouseX / w);
    const Mouserow = Math.floor(mouseY / w);

    let matrix = 2;
    let extent = Math.floor(matrix/2); 

    for (let i = -extent; i <= extent; i++) {
        for (let j = -extent; j <= extent; j++) {
            let col = Mousecol + j;
            let row = Mouserow + i;
            if (row >= 0 && row < rows && col >= 0 && col < cols) {
        
                grid[row][col] = 1;
            }
        }
    }

    
}


window.onload = setup;