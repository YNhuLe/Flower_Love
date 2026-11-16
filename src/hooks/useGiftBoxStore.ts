import {create} from "zustand";
import {persist} from "zustand/middleware";

export const MAX_ITEMS_PER_BOX = 10;
interface GiftBoxState {
    selectedItems : Record < number, number>;
    addItem: (giftId: number) => void;
    removeItem: (giftId: number) => void;
    clearBox : () => void;
}
/** store that
 * manages the state of a gift box, including adding, removing, and clearing items.
 * Ensures that the number of items does not exceed the maximum allowed per box.
 * data is persisted using zustand's persist middleware. and saved on localStorage to survive the refresh, close, and reopen of the browser.
 * Provides a convenient hook for components to access and manipulate the gift box state.
 */

export const useGiftBoxStore = create<GiftBoxState>()(

persist(
    (set) =>(
        {
            selectedItems: {},
            addItem: (giftId)=>
                set((state) => {
                    const count = Object.values(state.selectedItems).reduce((a, b) => a + b , 0);
                    if ( count >= MAX_ITEMS_PER_BOX) return state;
                    return {
                        selectedItems:{
                            ...state.selectedItems,
                            [giftId] : (state.selectedItems[giftId] || 0) + 1,
                        }
                    }
                }),
            removeItem: (giftId) => 
                set((state) => {
                    const current =  state.selectedItems[giftId] || 0;
                    if( current <= 1) {
                        const { [giftId]: _removed, ...rest} = state.selectedItems;
                        return { selectedItems: rest};
                    };
                    return { selectedItems: {...state.selectedItems, [giftId]: current - 1 } };
                }),
                clearBox: () => set({selectedItems: {}}),
        }
    ),
    {
        name: "evergreen-gift-box", version : 1
    }
)
);