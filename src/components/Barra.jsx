import cart from "../assets/cart.png";
import home from "../assets/home.png";
import check from "../assets/check.png";
const Barra = ({onVistaChange, activeVista, vistas, cantidad}) => {
  return (
    <div className="fondo">
      <div className="barra">
        <button
          className={`vista-button ${
            activeVista === vistas.HOME ? "active" : ""
          }`}
          onClick={() => onVistaChange(vistas.HOME)}
        >
          <img src={home} alt="Home" />
        </button>
        <button
          className={`vista-button ${
            activeVista === vistas.CARRITO ? "active" : ""
          }`}
          onClick={() => onVistaChange(vistas.CARRITO)}
        >
          <img src={cart} alt="Carrito" />
          <p>{cantidad}</p>
        </button>
        <button
          className={`vista-button ${
            activeVista === vistas.CHECKOUT ? "active" : ""
          }`}
          onClick={() => onVistaChange(vistas.CHECKOUT)}
        >
          <img src={check} alt="Checkout" />
        </button>
      </div>
    </div>
  );
};

export default Barra;
