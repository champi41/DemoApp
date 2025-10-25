const Categorias = ({ onCatChange, activeCat, categorias }) => {
  const labelMap = {
    [categorias.TODO]: "Todo",
    [categorias.ROLLS]: "Rolls",
    [categorias.CEVICHES]: "Ceviches",
    [categorias.BURGERS]: "Sushi Burgers",
    [categorias.TABLAS]: "Tablas",
    [categorias.COMBOS]: "Combos",
    [categorias.PREMIUM]: "Rolls Premiums",
  };
  return (
    <div className="categorias">
      <h2>Categorias</h2>
      <div className="listaCat">
        {Object.values(categorias).map((categoriaValor) => (
          <button
            key={categoriaValor}
            onClick={() => onCatChange(categoriaValor)}
            className={`Cat-button ${
              activeCat === categoriaValor ? "active" : ""
            }`}
          >
            {labelMap[categoriaValor] || categoriaValor}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Categorias;
