// Etiquetas de las categorías de navegación.
// La columna `category` de la base usa: hombre | mujer | nino | unisex | pareja
const CATEGORY_LABELS = {
  hombre: "Hombre",
  mujer: "Mujer",
  unisex: "Unisex",
  nino: "Niños",
  pareja: "Pareja",
};

// Orden en el que se muestran los filtros
const CATEGORY_ORDER = ["hombre", "mujer", "unisex", "pareja", "nino"];

// Construye los filtros a partir de los productos que realmente llegaron,
// para que no aparezca una categoría vacía ni falte una nueva.
export function buildCategories(products) {
  const presentes = new Set(products.map((p) => p.category).filter(Boolean));

  const ordenadas = CATEGORY_ORDER.filter((id) => presentes.has(id));
  // Cualquier categoría nueva que no esté en el orden previsto va al final
  const resto = [...presentes].filter((id) => !CATEGORY_ORDER.includes(id));

  return [
    { id: "todos", label: "Todos" },
    ...[...ordenadas, ...resto].map((id) => ({
      id,
      label: CATEGORY_LABELS[id] ?? id,
    })),
  ];
}

export { CATEGORY_LABELS };
