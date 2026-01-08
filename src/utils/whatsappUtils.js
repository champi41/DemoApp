

// Número de WhatsApp al que enviarás los pedidos (ejemplo con código de país)
const WHATSAPP_NUMBER = "56936163861"; // Reemplaza con tu número (sin + o 00)

/**
 * Genera el enlace final de WhatsApp con el resumen del pedido.
 */
const formatPrice = (price) => {

  if (typeof price !== "number") return "$0";

  return price.toLocaleString("es-CL", { style: "currency", currency: "CLP" });
};
export const generateWhatsAppLink = (carrito, datosCliente, totalPagar) => {
  // 1. ITEMS DEL PEDIDO
  const itemsList = carrito
    .map(
      (item) =>
        `- ${item.nombre} x ${item.cantidad} (${formatPrice(
          item.precio * item.cantidad
        )})`
    )
    .join("\n"); // Une los ítems con un salto de línea

  // 2. DETALLES DEL CLIENTE
  const {
    nombre,
    tipoEntrega,
    direccion,
    metodoPago,
    salsas,
    cantidadPalitos,
  } = datosCliente;

  // Lógica para la entrega
  const entregaTexto =
    tipoEntrega === "delivery"
      ? `Delivery en: ${direccion}`
      : `Retira en local.`;

  // 3. ARMADO DEL MENSAJE COMPLETO
  const message = `

¡Hola! Mi nombre es ${nombre} y este es mi pedido:
---
${itemsList}
---
TOTAL: ${formatPrice(totalPagar)}
---
DETALLES:
- Entrega: ${entregaTexto}
- Pago: ${metodoPago}
- Palitos: ${cantidadPalitos || 0} unidades
- Notas (Salsas/Otros): ${salsas || "Sin notas adicionales"}
    
📞 Favor, confirmar disponibilidad y total final.
`;
  // 4. GENERAR EL ENLACE
  // El mensaje debe codificarse para URL (urlencode)
  const encodedMessage = encodeURIComponent(message);
  // Retorna el enlace directo a la API de WhatsApp
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
};
