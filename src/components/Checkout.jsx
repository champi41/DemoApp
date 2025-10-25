import React, { useState, useEffect } from "react";
import { generateWhatsAppLink } from "../utils/whatsappUtils";
// Costos fijos (puedes mover esto a constants.js)
const COSTO_DELIVERY = 2500;
const formatPrice = (price) => {
  // Asegúrate de que price sea un número
  if (typeof price !== "number") return "$0";

  return price.toLocaleString("es-CL", { style: "currency", currency: "CLP" });
};
const Checkout = ({ carrito, datosCliente, setDatosCliente, onVolver }) => {
  // Estado local del formulario que luego se sincronizará con datosCliente
  const [formData, setFormData] = useState(datosCliente);

  // Calcula costos
  const subtotal = carrito.reduce(
    (sum, item) => sum + item.precio * item.cantidad,
    0
  );

  // Lógica para aplicar delivery
  const esDelivery = formData.tipoEntrega === "delivery";
  const costoEnvio = esDelivery ? COSTO_DELIVERY : 0;
  const totalPagar = subtotal + costoEnvio;

  // Maneja los cambios en los inputs del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Al enviar el formulario (o al continuar), actualiza el estado global en App.jsx
  const handleFinalizar = (e) => {
    e.preventDefault();
    setDatosCliente(formData); // Guarda los datos en App.jsx
    const whatsappUrl = generateWhatsAppLink(carrito, formData, totalPagar);
    window.open(whatsappUrl, "_blank");
    alert("¡Pedido Listo! Generando link de WhatsApp...");
  };

  return (
    <div className="checkout-container">
      <button className="btn-volver" onClick={onVolver}>
        ← Volver al Carrito
      </button>

      <h2>Checkout</h2>

      <form onSubmit={handleFinalizar}>
        {/* 1. INFORMACIÓN BÁSICA */}
        <div className="form-section" id="dp">
          <h4>Datos Personales</h4>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre completo"
            required
            onChange={handleChange}
            value={formData.nombre || ""}
          />
        </div>
        <div className="form-section" id="o">
          <h4>Opciones del Pedido</h4>
          <input
            type="number"
            name="cantidadPalitos"
            id="palitos"
            min="1"
            placeholder="Cantidad de palitos (opcional)"
            onChange={handleChange}
            value={formData.cantidadPalitos || ""}
          />

          <label htmlFor="salsas">Salsas y Comentarios Adicionales:</label>
          <textarea
            name="salsas"
            id="salsas"
            rows="3"
            placeholder="Ej: salsa teriyaki y soya, mas teriyaki que soya, etc. Comentarios: No tocar el timbre."
            onChange={handleChange}
            value={formData.salsas || ""}
          />
        </div>
        {/* 2. ENTREGA */}
        <div className="form-section" id="e">
          <h4>Método de Entrega</h4>
          <div className="metodos">
            <label className="radio-label">
              <input
                type="radio"
                name="tipoEntrega"
                value="retiro"
                required
                onChange={handleChange}
                checked={formData.tipoEntrega === "retiro"}
              />
              <span>Retiro en Local</span>
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="tipoEntrega"
                value="delivery"
                required
                onChange={handleChange}
                checked={formData.tipoEntrega === "delivery"}
              />
              <span>Delivery ({formatPrice(COSTO_DELIVERY)})</span>
            </label>
          </div>

          {esDelivery && (
            <input
              type="text"
              name="direccion"
              placeholder="Dirección y número depto/casa"
              required
              onChange={handleChange}
              value={formData.direccion || ""}
            />
          )}
        </div>

        {/* 3. PAGO */}
        <div className="form-section" id="p">
          <h4>Método de Pago</h4>
          <div className="metodosP">
            <label className="radio-label">
              <input
                type="radio"
                name="metodoPago"
                value="transferencia"
                required
                onChange={handleChange}
                checked={formData.metodoPago === "transferencia"}
              />
              <span>Transferencia</span>
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="metodoPago"
                value="alRetirar"
                required
                onChange={handleChange}
                checked={formData.metodoPago === "alRetirar"}
              />
              <span>Efectivo/Tarjeta (Retiro)</span>
            </label>
          </div>
        </div>

        {/* 4. RESUMEN DE COMPRA FINAL */}
        <div className="resumen-final">
          <p>Subtotal: {formatPrice(subtotal)}</p>
          <p>Costo de Envío: {formatPrice(costoEnvio)}</p>
          <h3>Total Final: {formatPrice(totalPagar)}</h3>
        </div>

        {/* BOTÓN FINAL DE WHATSAPP */}
        <div className="button">
          <button type="submit" className="boton-whatsapp-final">
            Enviar Pedido
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
