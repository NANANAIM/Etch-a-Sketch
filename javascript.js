// Alternar el borde de los cuadros (grid) al pulsar el botón
let gridVisible = true; // Variable para saber si el grid (bordes) está visible
const toggleGridBtn = document.getElementById('toggle-grid'); // Referencia al botón para alternar el grid
toggleGridBtn.addEventListener('click', toggleGrid); // Al hacer clic en el botón, ejecuta la función toggleGrid

//////////////
// (Espacio vacío, puedes eliminarlo)
/////////////

function toggleGrid() {
  gridVisible = !gridVisible; // Cambia el estado de gridVisible (true/false)
  document.querySelectorAll('.container-celda').forEach(celda => {
    celda.style.border = gridVisible ? '1px solid #ccc' : '0'; // Aplica o quita el borde a cada celda
  });
}

const gridContainer = document.getElementById('grid-container'); // Referencia al contenedor del grid
const gridSizeInput = document.getElementById('grid-size'); // Referencia al input tipo range para el tamaño del grid
const gridSizeValue = document.getElementById('grid-size-value'); // Referencia al span que muestra el tamaño actual

// función para un color uniforme
let currentColor = '#000000'; // Color actual seleccionado
const colorPicker = document.getElementById('color-picker'); // Referencia al input de color
colorPicker.oninput = (e) => currentColor = e.target.value; // Actualiza el color actual cuando el usuario elige uno nuevo

// Modo exclusivo para color, arcoíris y borrador
let currentMode = 'color'; // Variable para saber el modo activo: 'color', 'rainbow', 'eraser'
const colorBtn = document.getElementById('color-mode'); // Referencia al botón de color uniforme
const rainbowBtn = document.getElementById('rainbow-mode'); // Referencia al botón de arcoíris
const eraserBtn = document.getElementById('eraser-mode'); // Referencia al botón de borrador

colorBtn.addEventListener('click', () => setMode('color')); // Al hacer clic, activa el modo color uniforme
rainbowBtn.addEventListener('click', () => setMode('rainbow')); // Al hacer clic, activa el modo arcoíris
eraserBtn.addEventListener('click', () => setMode('eraser')); // Al hacer clic, activa el modo borrador

function setMode(mode) {
  currentMode = mode; // Cambia el modo actual
  colorBtn.classList.toggle('active', mode === 'color'); // Resalta el botón activo
  rainbowBtn.classList.toggle('active', mode === 'rainbow');
  eraserBtn.classList.toggle('active', mode === 'eraser');
}

function handleCellHover(e) {
  if (currentMode === 'rainbow') {
    e.target.style.backgroundColor = getRandomColor(); // Si está en modo arcoíris, pinta con color aleatorio
  } else if (currentMode === 'eraser') {
    e.target.style.backgroundColor = '#EEEEEE'; // Si está en modo borrador, pinta de color base (blanco)
  } else {
    e.target.style.backgroundColor = currentColor; // Si está en modo color, pinta con el color seleccionado
  }
}

//funcion para arcoiris
function getRandomColor() {
  const letters = '0123456789ABCDEF'; // Caracteres hexadecimales
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]; // Genera un color hexadecimal aleatorio
  }
  return color;
}

function crearGrid(size) {
  // Limpiar el grid anterior
  gridContainer.innerHTML = '';
  // Actualizar las filas y columnas del grid
  gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  gridContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  // Crear las celdas
  for (let i = 0; i < size * size; i++) {
    const celda = document.createElement('div');
    celda.classList.add('container-celda');
    celda.addEventListener('mouseover', handleCellHover); // Asigna el evento para pintar la celda
    gridContainer.appendChild(celda); // Agrega la celda al grid
  }
}

// Inicializar con 16x16
crearGrid(16);

// Actualizar el grid cuando el usuario mueve el slider
gridSizeInput.addEventListener('input', function() {
  const size = parseInt(this.value); // Obtiene el nuevo tamaño
  gridSizeValue.textContent = `${size} x ${size}`; // Actualiza el texto del tamaño
  crearGrid(size); // Crea el grid con el nuevo tamaño
});

