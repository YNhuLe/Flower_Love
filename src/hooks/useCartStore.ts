import {create} from "zustand";

interface CartItem{
product_id: number;
name: string;
science_name: string;
level: string;
stock: number;
price: number;
quantity: number;
size: string;
image: string}

interface CartState{
    items: CartItem[];
    addToCart : (item : CartItem) => void,
    removeFromCart: (product_id: number, size:string) => void;
    updateQuantity: (product_id: number, quantity: number, size: string) => void;
}


const useCartStore = create<CartState>((set) => ({
    items: [],
    addToCart: (item: CartItem) =>
        set((state: CartState): Partial<CartState> => {
            //check if the item already in the cart
            const existingItem = state.items.find((i: CartItem) =>
                i.product_id === item.product_id && i.size === item.size);

            if (existingItem) {
                //if the item exists, update the quantity
                return {
                    items: state.items.map((i: CartItem) =>
                        i.product_id === item.product_id && i.size === item.size
                            ? { ...i, quantity: i.quantity + item.quantity } : i)
                };
            }

            return { items: [...state.items, item] };
        }),
        removeFromCart: (product_id, size) =>
            set((state) =>({
                items: state.items.filter(
              (i) => !(i.product_id === product_id && i.size === size)  )
            })),

            //update the quantity in cart
            updateQuantity:(product_id, quantity, size) =>
                set((state) =>({
                    items: state.items.map((i) =>
                        i.product_id === product_id && i.size === size ? {...i, quantity} : i
                    )
                }))
  
   
}))

export default useCartStore;