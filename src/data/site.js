// Configuración central de la marca "En Tus Manos Estoy"

export const BRAND = {
  name: "En Tus Manos Estoy",
  handle: "@entusmanos.estoy",
  slogan: "La mejor moda, los mejores estilos.",
  bio: "Camisetas cristianas con diseños personalizados, hechas con propósito.",
  whatsappNumber: "573013622413",
  instagram: "https://instagram.com/entusmanos.estoy",
  city: "Colombia",
  schedule: "Lunes a sábado · 9:00 a.m. – 7:00 p.m.",
};

// Construye un enlace de WhatsApp con mensaje prellenado
export function waLink(message) {
  return `https://wa.me/${BRAND.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

// Mensaje prellenado para un producto concreto
export function waProduct(productName) {
  return waLink(`Hola, me interesa ${productName} 🙌 ¿Me cuentas precio, tallas y colores disponibles?`);
}

// Formatea precios en pesos colombianos
export function cop(value) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);
}
