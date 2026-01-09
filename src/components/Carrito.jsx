import trash from "../assets/trash.png"
import minus from "../assets/minus.png";
import plus from "../assets/plus.png";
const formatPrice = (price) => {
  return price.toLocaleString("es-CL", { style: "currency", currency: "CLP" });
};
const Carrito = ({
  carrito,
  onIncrease,
  onDecrease,
  onRemove,
  onContinuarPedido,
  onVolver
}) => {
  // Calcula el subtotal total de todos los ítems
  const subtotal = carrito.reduce(
    (sum, item) => sum + item.precio * item.cantidad,
    0
  );

  // Mensaje si el carrito está vacío
  if (carrito.length === 0) {
    return (
      <div className="carrito-vacio">
        <h2>Carrito Vacío 😞</h2>
        <p>Añade productos de nuestro menú para empezar un pedido.</p>
      </div>
    );
  }
  return (
    <div className="carrito">
      <header className="hcarrito">
        <button onClick={onVolver}>Volver</button>
        <h3>Mi Pedido</h3>
      </header>

      {/* LISTA DE ÍTEMS EN EL CARRITO */}
      <div className="lista-carrito">
        {carrito.map((item) => (
          <div key={item.id} className="item-carrito">
            <img src={item.img} alt={item.nombre} className="item-imagen" />
            <div className="item-detalle">
              <p className="item-nombre">{item.nombre}</p>
              <p className="item-precio-unitario">
                {formatPrice(item.precio)} c/u
              </p>
            </div>
            <div className="item-cantidad-control">
              <button
                className="btn-cantidad btn-disminuir"
                onClick={() => onDecrease(item.id)}
                disabled={item.cantidad === 1}
              >
                <img src={minus} alt="-" />
              </button>
              <span className="cantidad-display">{item.cantidad}</span>
              <button
                className="btn-cantidad btn-aumentar"
                onClick={() => onIncrease(item)}
              >
                <img src={plus} alt="+" />
              </button>
            </div>

            <p className="item-subtotal">
              {formatPrice(item.precio * item.cantidad)}
            </p>

            {/* 🌟 Botón de Eliminar (para borrar totalmente) 🌟 */}
            <button
              className="btn-eliminar-item"
              onClick={() => onRemove(item.id)} // Le pasamos solo el ID
            >
              <img src={trash} alt="Borrar" />
            </button>
          </div>
        ))}
      </div>

      {/* RESUMEN DE COSTOS */}
      <div className="resumen-costos">
        <div className="costo-linea">
          <span>Subtotal:</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
      </div>

      {/* BOTÓN FINAL DE PAGO/PEDIDO */}
      <button className="boton-final-pedido" onClick={onContinuarPedido}>
        Continuar con el Pedido ({formatPrice(subtotal)})
      </button>
    </div>
  );
};

export default Carrito;
