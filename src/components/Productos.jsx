
import Producto from './Producto'
const Productos = ({ productos, onAddToCart }) => {
  return (
    <div className="productos">
      {productos.map((producto) => (
        <Producto
        key={producto.id}
          producto={producto}
          onAddToCart={onAddToCart}
        ></Producto>
      ))}
    </div>
  );
};

export default Productos