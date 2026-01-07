


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


//   const totalItemCount = useCartStore((state) =>
//     state.items.reduce((sum, item) => sum + item.quantity, 0)
//   );

//   const totalSpend = useCartStore((state) =>
//     state.items.reduce((sumSpend, item) => sumSpend + item.price * item.quantity, 0)
//   )
interface CartState{
    items: CartItem[];
// totalSpend: number,
totalItemCount: () => number;
    addToCart : (item : CartItem) => void;
    removeFromCart: (product_id: number, size:string) => void;
    updateQuantity: (product_id: number, quantity: number, size: string) => void;
shippingFee: () => number;
totalSpend: () => number;
freeShippingThreshold: number;
amountToFreeShipping: () => number;

}


const useCartStore = create<CartState>((set, get) => ({
    items: [],
  totalItemCount: () =>
    get().items.reduce((sum, item) => sum + item.quantity, 0),
  totalSpend: () =>
  get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),

    shippingFee: () =>{
        const total = get().totalSpend();

 

if (total < 25){
    return 12.99;
}

if( total < 50 && total >=25){
    return 7.99;
}

if( total <75 && total >=50){
    return 4.99;
}

return 0;

    },
    freeShippingThreshold: 75, 
    amountToFreeShipping: () => { 
        
    const total = get().totalSpend(); 
    const threshold = get().freeShippingThreshold; 
    return Math.max(0, threshold - total); },
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