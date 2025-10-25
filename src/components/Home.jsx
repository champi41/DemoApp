import { useState } from "react";
import Categorias from "./Categorias";
import Header from "./Header";
import Productos from "./Productos";
import { PRODUCTOS, CATEGORIAS } from "../constants";

const Home = ({onAddToCart}) => {
  const [activeCategoria, setActiveCategoria] = useState("todo");

  const productosFiltrados = PRODUCTOS.filter((producto) => {
    if (activeCategoria === "todo") {
      return true;
    }
    return producto.categoria === activeCategoria;
  });
  const renderActiveComponent = () => {
    return (
      <Productos productos={productosFiltrados} onAddToCart={onAddToCart} />
    );
  };
  return (
    <div className="home">
      <Header></Header>
      <Categorias
        onCatChange={setActiveCategoria}
        activeCat={activeCategoria}
        categorias={CATEGORIAS}
      ></Categorias>
      <div className="container">{renderActiveComponent()}</div>
    </div>
  );
};

export default Home;
