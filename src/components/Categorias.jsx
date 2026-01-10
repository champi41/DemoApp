import imgRolls from "../assets/sushi.jpg";
import imgCeviche from "../assets/ceviche.jpg";
import imgBurgers from "../assets/burger.jpg";
import imgTablas from "../assets/tabla.jpg";
import imgPremium from "../assets/premium.jpg";
const Categorias = ({ onCatChange, activeCat, categorias }) => {
  const labelMap = {
    [categorias.TODO]: "Todo",
    [categorias.ROLLS]: "Rolls",
    [categorias.CEVICHES]: "Ceviches",
    [categorias.BURGERS]: "Sushi Burgers",
    [categorias.TABLAS]: "Tablas",
    [categorias.PREMIUM]: "Premium",
  };
  const imageMap = {
    [categorias.ROLLS]: imgRolls,
    [categorias.CEVICHES]: imgCeviche,
    [categorias.BURGERS]: imgBurgers,
    [categorias.TABLAS]: imgTablas,
    [categorias.PREMIUM]: imgPremium,
  };
  return (
    <div className="categorias">
      <h2>Categorías</h2>
      <div className="listaCat">
        {Object.values(categorias).map((categoriaValor) => (
          <button
            key={categoriaValor}
            onClick={() => onCatChange(categoriaValor)}
            className={`Cat-button ${
              activeCat === categoriaValor ? "active" : ""
            }`}
            style={{
              backgroundImage: `url(${imageMap[categoriaValor]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <span className="button-text">
              {labelMap[categoriaValor] || categoriaValor}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Categorias;
