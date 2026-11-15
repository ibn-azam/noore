"use client";

import {
  createContext,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";

const CART_STORAGE_KEY = "noore-cart";
const CartContext = createContext(null);
const listeners = new Set();
let currentSnapshot = "[]";
let isSnapshotInitialized = false;

function parseCart(value) {
  const parsed = JSON.parse(value);

  if (
    !Array.isArray(parsed) ||
    parsed.some(
      (item) =>
        !item ||
        typeof item.id !== "number" ||
        typeof item.name !== "string" ||
        typeof item.price !== "number" ||
        typeof item.image !== "string" ||
        !Number.isInteger(item.quantity) ||
        item.quantity < 1
    )
  ) {
    throw new Error("Stored cart has an invalid format.");
  }

  return parsed;
}

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

function getSnapshot() {
  if (typeof window === "undefined") return "[]";
  if (isSnapshotInitialized) return currentSnapshot;

  try {
    currentSnapshot = window.localStorage.getItem(CART_STORAGE_KEY) || "[]";
    parseCart(currentSnapshot);
  } catch (error) {
    console.error("Unable to load the saved cart.", error);
    currentSnapshot = "[]";
  }

  isSnapshotInitialized = true;
  return currentSnapshot;
}

function getServerSnapshot() {
  return "[]";
}

function handleStorageChange(event) {
  if (event.key !== CART_STORAGE_KEY && event.key !== null) return;

  try {
    currentSnapshot = event.newValue ? JSON.stringify(parseCart(event.newValue)) : "[]";
  } catch (error) {
    console.error("Unable to read the updated saved cart.", error);
    return;
  }

  isSnapshotInitialized = true;
  notifyListeners();
}

function subscribe(listener) {
  listeners.add(listener);
  window.addEventListener("storage", handleStorageChange);
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      window.removeEventListener("storage", handleStorageChange);
    }
  };
}

function saveCart(items) {
  currentSnapshot = JSON.stringify(items);
  isSnapshotInitialized = true;

  try {
    window.localStorage.setItem(CART_STORAGE_KEY, currentSnapshot);
  } catch (error) {
    console.error("Unable to save the cart.", error);
  }

  notifyListeners();
}

function addToCart(product) {
  const items = parseCart(getSnapshot());
  const existingItem = items.find((item) => item.id === product.id);

  saveCart(
    existingItem
      ? items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      : [...items, { ...product, quantity: 1 }]
  );
}

function updateQuantity(productId, quantity) {
  const items = parseCart(getSnapshot());
  saveCart(
    quantity < 1
      ? items.filter((item) => item.id !== productId)
      : items.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        )
  );
}

function removeFromCart(productId) {
  saveCart(parseCart(getSnapshot()).filter((item) => item.id !== productId));
}

export function CartProvider({ children }) {
  const snapshot = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );
  const items = useMemo(() => parseCart(snapshot), [snapshot]);
  const cartCount = items.reduce((total, item) => total + item.quantity, 0);
  const value = useMemo(
    () => ({ items, cartCount, addToCart, updateQuantity, removeFromCart }),
    [items, cartCount]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const cart = useContext(CartContext);

  if (!cart) {
    throw new Error("useCart must be used within a CartProvider.");
  }

  return cart;
}
