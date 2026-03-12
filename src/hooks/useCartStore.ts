import { create } from "zustand";

interface CartItem {
  product_id: number;
  name: string;
  science_name: string;
  level: string;
  stock: number;
  price: number;
  quantity: number;
  size: string;
  image: string;
  discount_percentage?: number;
}

interface CartState {
  items: CartItem[];
  // totalSpend: number,
  totalItemCount: () => number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (product_id: number, size: string) => void;
  updateQuantity: (product_id: number, quantity: number, size: string) => void;
  shippingFee: () => number | null;
  totalSpend: () => number;
  freeShippingThreshold: number;
  amountToFreeShipping: () => number;
  getDiscountRate: (code: string) => number;
  discountCode: string;
  setDiscountCode: (code: string) => void;
isApplyDisabled: (discountCode: string) => boolean;
  getTotal: (discountCode: string) => number;
  getDiscountSave: (discountRate: number) => number;
}

const useCartStore = create<CartState>((set, get) => ({
  items: [],
  totalItemCount: () =>
    get().items.reduce((sum, item) => sum + item.quantity, 0),
  totalSpend: () =>
    get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),

  shippingFee: () => {
    const total = get().totalSpend();

    if (total === 0) {
      return null;
    }
    if (total < 25) {
      return 12.99;
    }

    if (total < 50) {
      return 7.99;
    }

    if (total < 75) {
      return 4.99;
    }

    return 0;
  },
  freeShippingThreshold: 75,
  amountToFreeShipping: () => {
    const total = get().totalSpend();
    const threshold = get().freeShippingThreshold;
    return Math.max(0, threshold - total);
  },
  addToCart: (item: CartItem) =>
    set((state: CartState): Partial<CartState> => {
      //check if the item already in the cart
      const existingItem = state.items.find(
        (i: CartItem) =>
          i.product_id === item.product_id && i.size === item.size,
      );

      if (existingItem) {
        //if the item exists, update the quantity
        return {
          items: state.items.map((i: CartItem) =>
            i.product_id === item.product_id && i.size === item.size
              ? { ...i, quantity: i.quantity + item.quantity }
              : i,
          ),
        };
      }

      return { items: [...state.items, item] };
    }),
  removeFromCart: (product_id, size) =>
    set((state) => ({
      items: state.items.filter(
        (i) => !(i.product_id === product_id && i.size === size),
      ),
    })),

  //update the quantity in cart
  updateQuantity: (product_id, quantity, size) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.product_id === product_id && i.size === size ? { ...i, quantity } : i,
      ),
    })),

  //get discount rate based on code

  discountCode: "",
  setDiscountCode: (code) => set({ discountCode: code }),
  getDiscountRate: (code: string) => {
    const normalized = code.trim().toUpperCase();
    if (normalized === "PLANT10") return 0.1;
    if (normalized === "WELCOME20") return 0.2;
    return 0;
  },

  //check if the apply button is disabled
  isApplyDisabled: (discountCode: string) => {
    const upper = discountCode.trim().toUpperCase();
    const isValid = upper === "PLANT10" || upper === "WELCOME20";
    return discountCode.trim() === "" || discountCode === upper || !isValid;
  },

  //get the total spend
  getTotal: (discountCode: string) => {
    const subtotal = get().totalSpend();
    if (subtotal === 0) return 0;
    const rawShipping = get().shippingFee();
    const shipping = rawShipping === null || rawShipping < 0 ? 0 : rawShipping;
    const tax = subtotal * 0.05;
    const discountRate = get().getDiscountRate(discountCode);
    const beforeDiscount = subtotal + shipping + tax;
    const afterDiscount = beforeDiscount * (1 - discountRate);
    return afterDiscount;
  },

  //get from save
  getDiscountSave: (discountRate: number) => {
    return get().totalSpend() * discountRate;
  },
}));

export default useCartStore;
