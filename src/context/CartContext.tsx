import { createContext, ReactNode,useState, useContext } from "react";
interface CartItem{
    id: number;
common_name: string;
scientific_name: string;
plantinglevel: string;
stock_quality: number;
size: string;
original_price: number;
discount_percentage?: number;
}

interface CartContextType{
    error: string | null;
    loading: boolean;
    cart: CartItem[];
    setCart: (cart: CartItem[]) => void;
    setError: (error: string | null) => void;
    setLoading: (loading: boolean) => void;
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: number) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined);
const useCart = () =>{
    const context = useContext(CartContext);
    if( !context){
        throw new Error('useCart must be used within a CartProvider')
    }
    return context;
}

function CartContextProvider({children}:{children: ReactNode}){
const [error,setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  function addToCart(item:CartItem){
    setCart(prev =>[...prev, item])
  }

  function removeFromCart(id: number){
    setCart(prev => prev.filter(item => item.id !== id))

  }
    return (
        <CartContext.Provider value={{ error, loading, cart, setCart, setError, setLoading, addToCart, removeFromCart }}>
        
        {children}
        </CartContext.Provider>
    )
}

export {CartContextProvider, useCart,CartItem};
export default CartContext;