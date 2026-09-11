import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);

const STORAGE_KEY = "etme_cart_v1";
const MAX_QTY = 20;

function leerCarritoGuardado() {
  if (typeof window === "undefined") return [];
  try {
    const crudo = window.localStorage.getItem(STORAGE_KEY);
    const items = crudo ? JSON.parse(crudo) : [];
    return Array.isArray(items) ? items : [];
  } catch {
    return [];
  }
}

// Une talla+color+producto en una sola clave: cada combinación es una línea
// distinta del carrito, aunque compartan variantId... no debería pasar,
// pero variantId ya es único por sí solo así que se usa directo.
const lineKey = (variantId) => variantId;

export function CartProvider({ children }) {
  const [items, setItems] = useState(leerCarritoGuardado);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // localStorage no disponible (modo privado, cuota llena...): el
      // carrito sigue funcionando en memoria durante la sesión.
    }
  }, [items]);

  function addItem(item, quantity = 1) {
    setItems((prev) => {
      const key = lineKey(item.variantId);
      const existente = prev.find((i) => lineKey(i.variantId) === key);
      if (existente) {
        const nuevaCantidad = Math.min(existente.quantity + quantity, MAX_QTY);
        return prev.map((i) =>
          lineKey(i.variantId) === key ? { ...i, quantity: nuevaCantidad } : i
        );
      }
      return [...prev, { ...item, quantity: Math.min(quantity, MAX_QTY) }];
    });
    setOpen(true);
  }

  function removeItem(variantId) {
    setItems((prev) => prev.filter((i) => i.variantId !== variantId));
  }

  function updateQuantity(variantId, quantity) {
    setItems((prev) =>
      prev.map((i) =>
        i.variantId === variantId
          ? { ...i, quantity: Math.max(1, Math.min(quantity, MAX_QTY)) }
          : i
      )
    );
  }

  function clear() {
    setItems([]);
  }

  const count = useMemo(() => items.reduce((n, i) => n + i.quantity, 0), [items]);
  const total = useMemo(
    () => items.reduce((n, i) => n + i.unitPrice * i.quantity, 0),
    [items]
  );

  const value = {
    items,
    count,
    total,
    open,
    openCart: () => setOpen(true),
    closeCart: () => setOpen(false),
    addItem,
    removeItem,
    updateQuantity,
    clear,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return ctx;
}
