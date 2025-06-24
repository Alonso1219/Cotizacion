document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('formCotizacion');
  const autoSelect = document.getElementById('auto');
  const precioInput = document.getElementById('precio');
  
  // Actualizar precio cuando se selecciona un auto
  autoSelect.addEventListener('change', function() {
    const selectedOption = this.options[this.selectedIndex];
    const precioBase = selectedOption.getAttribute('data-precio');
    
    // Solo actualizar el precio si no es "Personalizado"
    if (selectedOption.value !== "Personalizado") {
      precioInput.value = precioBase || '0';
    } else {
      precioInput.value = '';
      precioInput.focus();
    }
  });
  
  // Calcular cotización
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const precio = parseFloat(precioInput.value);
    const porcentaje = parseFloat(document.getElementById('porcentaje').value);
    const plazo = parseInt(document.getElementById('plazo').value);
    
    // Validaciones (aquí estaba el error - faltaba cerrar paréntesis en isNaN(precio))
    if (isNaN(precio)) {
      alert('Por favor ingrese un precio válido');
      return;
    }
    
    if (isNaN(porcentaje)) {
      alert('Por favor ingrese un porcentaje válido');
      return;
    }
    
    if (isNaN(plazo)) {
      alert('Por favor seleccione un plazo válido');
      return;
    }
    
    // Cálculos financieros
    const pagoInicial = (precio * porcentaje) / 100;
    const montoFinanciar = precio - pagoInicial;
    const pagoMensual = montoFinanciar / plazo;
    
    // Mostrar resultados
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = `
      <h2>Resultado de la Cotización</h2>
      <p><strong>Auto seleccionado:</strong> ${autoSelect.value === "Personalizado" ? "Auto personalizado" : autoSelect.options[autoSelect.selectedIndex].text}</p>
      <p><strong>Precio del auto:</strong> $${precio.toLocaleString('es-MX')}</p>
      <p><strong>Pago inicial (${porcentaje}%):</strong> $${pagoInicial.toLocaleString('es-MX')}</p>
      <p><strong>Monto a financiar:</strong> $${montoFinanciar.toLocaleString('es-MX')}</p>
      <p><strong>Pago mensual por ${plazo} meses:</strong> $${pagoMensual.toLocaleString('es-MX')}</p>
    `;
  });
});