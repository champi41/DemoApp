import { useState } from "react";
import Home from "./components/Home";
import Carrito from "./components/Carrito";
import Barra from "./components/Barra";
import ToastNotification from "./components/ToastNotification";
import Checkout from "./components/Checkout";
const VISTAS = {
  HOME: "home",
  CARRITO: "carrito",
  CHECKOUT: "checkout",
};
function App() {
  const [activeVista, setActiveVista] = useState(VISTAS.HOME);
  const [carrito, setCarrito] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [datosCliente, setDatosCliente] = useState({});
  const handleAddToCart = (productoAAnadir) => {
    setCarrito((prevCarrito) => {
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
      const existeItem = prevCarrito.find(
        (item) => item.id === productoAAnadir.id
      );
      if (existeItem) {
        return prevCarrito.map((item) =>
          item.id === productoAAnadir.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        return [...prevCarrito, { ...productoAAnadir, cantidad: 1 }];
      }
    });
  };
  const handleDecreaseQuantity = (itemId) => {
    setCarrito((prevCarrito) => {
      const itemExistente = prevCarrito.find((item) => item.id === itemId);

      if (!itemExistente) return prevCarrito;

      if (itemExistente.cantidad === 1) {
        // Si la cantidad es 1, lo eliminamos completamente
        return prevCarrito.filter((item) => item.id !== itemId);
      } else {
        // Si es mayor a 1, solo disminuimos la cantidad
        return prevCarrito.map((item) =>
          item.id === itemId ? { ...item, cantidad: item.cantidad - 1 } : item
        );
      }
    });
  };

  const handleRemoveItem = (itemId) => {
    setCarrito((prevCarrito) => {
      // Filtra el array, manteniendo solo los ítems cuyo ID NO coincide
      return prevCarrito.filter((item) => item.id !== itemId);
    });
  };
  const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);

  const renderActiveView = () => {
    switch (activeVista) {
      case VISTAS.HOME:
        return <Home onAddToCart={handleAddToCart}></Home>;
      case VISTAS.CARRITO:
        return (
          <Carrito
            carrito={carrito}
            onIncrease={handleAddToCart}
            onDecrease={handleDecreaseQuantity}
            onRemove={handleRemoveItem}
            onContinuarPedido={() => setActiveVista(VISTAS.CHECKOUT)}
          ></Carrito>
        );
      case VISTAS.CHECKOUT:
        return (
          <Checkout
            carrito={carrito}
            datosCliente={datosCliente}
            setDatosCliente={setDatosCliente}
            onVolver={() => setActiveVista(VISTAS.CARRITO)}
          />
        );
      default:
        <Home onAddToCart={handleAddToCart}></Home>;
    }
  };

  return (
    <>
      <Barra
        onVistaChange={setActiveVista}
        activeVista={activeVista}
        vistas={VISTAS}
        cantidad={totalItems}
      ></Barra>
      <div className="main">{renderActiveView()}</div>
      {showToast && <ToastNotification />}
    </>
  );
}

export default App;
