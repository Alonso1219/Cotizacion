// Función para generar un porcentaje aleatorio entre 20 y 40
function generarPorcentajeAleatorio() {
  return Math.floor(Math.random() * (40 - 20 + 1)) + 20; // Número entre 20 y 40
}

// Generar un número de cotización aleatorio entre 000 y 1000
function generarNumeroCotizacion() {
  const numero = Math.floor(Math.random() * 1001); // Número entre 0 y 1000
  return numero.toString().padStart(3, '0'); // Con 3 dígitos, ej: 005
}

// Función para calcular la cotización
function calcularCotizacion(event) {
  event.preventDefault();

  const autoSeleccionado = document.getElementById('auto').value;
  const precioAuto = parseFloat(document.getElementById('precio').value);
  const porcentajePagoInicial = generarPorcentajeAleatorio();
  const plazo = parseInt(document.getElementById('plazo').value);

  if (!autoSeleccionado || !precioAuto || !plazo) {
    alert('Por favor, completa todos los campos.');
    return;
  }

  const pagoInicial = precioAuto * (porcentajePagoInicial / 100);
  const totalFinanciar = precioAuto - pagoInicial;
  const mensualidad = totalFinanciar / plazo;

  const resultadoDiv = document.getElementById('resultado');
  resultadoDiv.innerHTML = `
    <h2>Detalles de la Cotización</h2>
    <p><strong>Número de Cotización:</strong> ${generarNumeroCotizacion()}</p>
    <p><strong>Auto Seleccionado:</strong> ${autoSeleccionado}</p>
    <p><strong>Precio del Auto:</strong> $${precioAuto.toFixed(2)}</p>
    <p><strong>Pago Inicial (${porcentajePagoInicial}%):</strong> $${pagoInicial.toFixed(2)}</p>
    <p><strong>Total a Financiar:</strong> $${totalFinanciar.toFixed(2)}</p>
    <p><strong>Mensualidad a ${plazo} meses:</strong> $${mensualidad.toFixed(2)}</p>
  `;
}

// Al cargar la página
window.onload = function() {
  document.getElementById('numero').value = generarNumeroCotizacion();
  const form = document.getElementById('formCotizacion');
  form.addEventListener('submit', calcularCotizacion);
};

// Actualizar precio al seleccionar auto, pero permitir edición manual después
document.getElementById('auto').addEventListener('change', function () {
  const selectedOption = this.options[this.selectedIndex];
  const precio = selectedOption.getAttribute('data-precio');
  if (precio > 0) {
    document.getElementById('precio').value = precio;
  }
});
