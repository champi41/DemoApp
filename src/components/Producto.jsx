
const Producto = ({ producto, onAddToCart }) => {
  const {nombre, precio, img} = producto;
  return (
    <div className="producto">
      <div className="imagen">
        <img src={img} />
      </div>
      <div className="info">
        <h3>{nombre}</h3>
        <p className="precio">${precio}</p>
      </div>
      <button className="agregar" onClick={() => onAddToCart(producto)}>
        Agregar
      </button>
    </div>
  );
};

export default Producto