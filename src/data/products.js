// Catálogo de productos · En Tus Manos Estoy
// Las imágenes son de muestra (Unsplash). Reemplázalas por las fotos reales
// de la marca colocándolas en /public y apuntando aquí a esa ruta.

const u = (id, w = 900) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const CATEGORIES = [
  { id: "todos", label: "Todos" },
  { id: "oversize", label: "Oversize" },
  { id: "basicas", label: "Básicas" },
  { id: "personalizadas", label: "Personalizadas" },
  { id: "ninos", label: "Niños" },
];

export const PRODUCTS = [
  {
    id: "fe-mueve-montanas",
    name: "Camiseta Oversize «Fe que Mueve Montañas»",
    category: "oversize",
    price: 69900,
    badge: "Más vendida",
    short:
      "Caída oversize en algodón pesado con estampado minimalista al frente.",
    description:
      "Nuestra prenda insignia. Una caída oversize en algodón peinado de 220 g que cae perfecto y dura lavada tras lavada. El diseño «Fe que mueve montañas» va estampado con tintas de alta durabilidad, suaves al tacto, que no se cuartean. Pensada para que vistas tu fe con estilo todos los días.",
    features: [
      "Algodón peinado 100% · 220 g (tela pesada)",
      "Estampado de alta durabilidad, suave al tacto",
      "Corte oversize unisex",
      "Diseño exclusivo de la casa",
    ],
    sizes: ["S", "M", "L", "XL"],
    images: [
      u("1521572163474-6864f9cf17ab"),
      u("1503341504253-dff4815485f1"),
      u("1622445275576-721325763afe"),
    ],
  },
  {
    id: "salmo-23",
    name: "Camiseta «Salmo 23» Tierra",
    category: "basicas",
    price: 54900,
    badge: "Nuevo",
    short: "Básica en tono café tierra con verso tipográfico en la espalda.",
    description:
      "Una básica que no es básica. Color café tierra, nuestro favorito, con el Salmo 23 compuesto en una tipografía serif elegante sobre la espalda. Versátil para el día a día y suave desde la primera puesta.",
    features: [
      "Algodón 100% · 180 g",
      "Tipografía serif estampada en la espalda",
      "Color café tierra exclusivo",
      "Corte regular unisex",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      u("1576566588028-4147f3842f27"),
      u("1583743814966-8936f5b7be1a"),
      u("1618354691373-d851c5c3a990"),
    ],
  },
  {
    id: "gracia-sobre-gracia",
    name: "Camiseta «Gracia sobre Gracia»",
    category: "basicas",
    price: 52900,
    short: "Blanca esencial con lettering manuscrito en el pecho.",
    description:
      "Blanco impecable y un lettering manuscrito hecho a mano que recuerda que cada día recibimos gracia sobre gracia. La prenda comodín de tu clóset: combina con todo y se siente premium.",
    features: [
      "Algodón 100% · 180 g",
      "Lettering manuscrito original",
      "Cuello redondo reforzado",
      "Corte regular unisex",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      u("1618517351616-38fb9c5210c6"),
      u("1554568218-0f1715e72254"),
      u("1576566588028-4147f3842f27"),
    ],
  },
  {
    id: "luz-del-mundo",
    name: "Oversize «Luz del Mundo»",
    category: "oversize",
    price: 71900,
    badge: "Edición limitada",
    short: "Negra oversize con estampado dorado mate en el frente.",
    description:
      "Edición limitada. Negro profundo con un estampado «Luz del mundo» en dorado mate que resalta sin gritar. Tela pesada, caída amplia y un acabado que se siente de boutique. Unidades contadas.",
    features: [
      "Algodón peinado 100% · 220 g",
      "Estampado en dorado mate premium",
      "Corte oversize unisex",
      "Edición limitada numerada",
    ],
    sizes: ["S", "M", "L", "XL"],
    images: [
      u("1503341504253-dff4815485f1"),
      u("1604644401890-0bd678c83788"),
      u("1521572163474-6864f9cf17ab"),
    ],
  },
  {
    id: "personalizada-versiculo",
    name: "Camiseta Personalizada · Tu Versículo",
    category: "personalizadas",
    price: 64900,
    badge: "A tu medida",
    short: "Tú eliges el versículo, el color y la tipografía. La creamos a mano.",
    description:
      "Tu prenda, tu historia. Elige el versículo que te marcó, el color de la camiseta y la tipografía; nosotros la diseñamos y la estampamos a mano para ti. Ideal para regalos, grupos, retiros e iglesias. Escríbenos por WhatsApp y la creamos juntos.",
    features: [
      "Versículo y diseño a tu elección",
      "Disponible en blanco, negro, beige y café tierra",
      "Descuentos por pedidos al por mayor (iglesias y grupos)",
      "Algodón 100% · estampado de alta durabilidad",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "2XL"],
    images: [
      u("1622445275576-721325763afe"),
      u("1618354691373-d851c5c3a990"),
      u("1554568218-0f1715e72254"),
    ],
  },
  {
    id: "elegido-amado",
    name: "Camiseta «Elegido y Amado»",
    category: "basicas",
    price: 53900,
    short: "Beige cálido con diseño tipográfico de pecho.",
    description:
      "En tono beige cálido, recordándote una verdad sencilla: eres elegido y amado. Diseño tipográfico discreto al pecho, perfecto para combinar con jeans o un look monocromático.",
    features: [
      "Algodón 100% · 180 g",
      "Color beige cálido exclusivo",
      "Estampado discreto al pecho",
      "Corte regular unisex",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      u("1583743814966-8936f5b7be1a"),
      u("1618517351616-38fb9c5210c6"),
      u("1576566588028-4147f3842f27"),
    ],
  },
  {
    id: "hijo-del-rey",
    name: "Camiseta Niños «Hijo del Rey»",
    category: "ninos",
    price: 42900,
    badge: "Para los peques",
    short: "Suave, resistente al juego y con un mensaje que los acompaña.",
    description:
      "Para los más pequeños de la casa. Algodón extra suave, costuras reforzadas que aguantan el juego y un diseño «Hijo del Rey» lleno de ternura. Para que crezcan sabiendo de quién son.",
    features: [
      "Algodón suave 100% pensado para niños",
      "Costuras reforzadas",
      "Estampado libre de tóxicos",
      "Tallas de 2 a 12 años",
    ],
    sizes: ["2", "4", "6", "8", "10", "12"],
    images: [
      u("1519238263530-99bdd11df2ea"),
      u("1503944583220-79d8926ad5e2"),
      u("1622445275576-721325763afe"),
    ],
  },
  {
    id: "todo-puedo-oversize",
    name: "Oversize «Todo lo Puedo»",
    category: "oversize",
    price: 69900,
    short: "Filipenses 4:13 en una caída oversize cómoda y moderna.",
    description:
      "Filipenses 4:13 llevado a una prenda moderna. Caída oversize, tela pesada y un estampado limpio que acompaña tus días de entrenamiento, estudio o trabajo. Recuerda de dónde viene tu fuerza.",
    features: [
      "Algodón peinado 100% · 220 g",
      "Estampado «Todo lo puedo en Cristo»",
      "Corte oversize unisex",
      "Cuello reforzado anti-deformación",
    ],
    sizes: ["S", "M", "L", "XL"],
    images: [
      u("1604644401890-0bd678c83788"),
      u("1521572163474-6864f9cf17ab"),
      u("1503341504253-dff4815485f1"),
    ],
  },
];

// Miniaturas para la sección de Instagram
export const INSTA_IMAGES = [
  u("1521572163474-6864f9cf17ab", 500),
  u("1503341504253-dff4815485f1", 500),
  u("1576566588028-4147f3842f27", 500),
  u("1618517351616-38fb9c5210c6", 500),
  u("1622445275576-721325763afe", 500),
  u("1604644401890-0bd678c83788", 500),
];
