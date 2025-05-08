// Función para generar un porcentaje aleatorio entre 20 y 40
function generarPorcentajeAleatorio() {
    return Math.floor(Math.random() * (40 - 20 + 1)) + 20; // Genera un número aleatorio entre 20 y 40
  }
  
  // Generar un número de cotización aleatorio entre 000 y 1000
  function generarNumeroCotizacion() {
    const numero = Math.floor(Math.random() * 1001); // Genera un número entre 0 y 1000
    return numero.toString().padStart(3, '0'); // Devuelve el número con 3 dígitos (ej: 005, 120)
  }
  
  // Función para calcular los valores de la cotización
  function calcularCotizacion(event) {
    event.preventDefault(); // Evitar el envío del formulario
  
    // Obtener los datos del formulario
    const autoSeleccionado = document.getElementById('auto').value;
    const precioAuto = parseFloat(document.getElementById('precio').value);
    const porcentajePagoInicial = generarPorcentajeAleatorio(); // Obtener el porcentaje aleatorio
    const plazo = parseInt(document.getElementById('plazo').value);
  
    if (!autoSeleccionado || !precioAuto || !plazo) {
      alert('Por favor, completa todos los campos.');
      return;
    }
  
    // Calcular el pago inicial (porcentaje aleatorio del precio del auto)
    const pagoInicial = precioAuto * (porcentajePagoInicial / 100);
  
    // Calcular el total a financiar (precio - pago inicial)
    const totalFinanciar = precioAuto - pagoInicial;
  
    // Calcular la mensualidad (total a financiar / plazo)
    const mensualidad = totalFinanciar / plazo;
  
    // Mostrar los resultados en el contenedor #resultado
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
  
  // Asignar la función de cálculo al evento de envío del formulario
  window.onload = function() {
    document.getElementById('numero').value = generarNumeroCotizacion(); // Generar número de cotización al cargar
    const form = document.getElementById('formCotizacion');
    form.addEventListener('submit', calcularCotizacion); // Añadir el evento para realizar el cálculo al enviar el formulario
  
    // Actualizar el precio cuando se elija un auto
    const selectAuto = document.getElementById('auto');
    selectAuto.addEventListener('change', function() {
      const precio = selectAuto.options[selectAuto.selectedIndex].getAttribute('data-precio');
      document.getElementById('precio').value = precio ? precio : ''; // Actualiza el precio automáticamente
    });
  };
  