const gridContainer = document.getElementById('grid-container');
const gridSizeInput = document.getElementById('grid-size');
const gridSizeValue = document.getElementById('grid-size-value');

// función para un color uniforme
let currentColor = '#000000';
const colorPicker = document.getElementById('color-picker');
colorPicker.oninput = (e) => currentColor = e.target.value;

function handleCellHover(e) {
  e.target.style.backgroundColor = currentColor;
}

//funcion para quitar el grid

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
    celda.addEventListener('mouseover', handleCellHover);
    gridContainer.appendChild(celda);
  }
}

// Inicializar con 16x16
crearGrid(16);

// Actualizar el grid cuando el usuario mueve el slider
gridSizeInput.addEventListener('input', function() {
  const size = parseInt(this.value);
  gridSizeValue.textContent = `${size} x ${size}`;
  crearGrid(size);
});