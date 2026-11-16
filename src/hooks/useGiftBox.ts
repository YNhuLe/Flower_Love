import {useMemo,  useState} from "react";
import { ShoppingCart, Minus, Plus } from "lucide-react";
import {useGiftBoxStore, MAX_ITEMS_PER_BOX} from "../hooks/useGiftBoxStore";
import { GiftItemProps } from "types/types";

export const PACKAGING_FEE_CENTS = 499;

export const tocents = (price: number | string) => Math.round(Number(price) * 100);

export const formatCents = (cents: number)=>
    
new Intl.NumberFormat("en-CA", {style: "currency", currency: "CAD"}).format(cents / 100);


export interface GiftBoxLine {
    item: GiftItemProps;
quantity: number;
lineTotalCents: number;
}

export function useGiftBox(giftItems : GiftItemProps[]) {

const { selectedItems, addItem, removeItem, clearBox } = useGiftBoxStore();

const lines: GiftBoxLine[] = useMemo(
    () => giftItems.filter((item) => (selectedItems[item.gift_id] || 0 ) > 0)
    .map((item) => {
        const quantity = selectedItems[item.gift_id];
         return {item, quantity, lineTotalCents: tocents(item.price) * quantity}
    }),
    [giftItems, selectedItems]
       
);
const totalItems= lines.reduce((sum,l ) => sum + l.quantity, 0 )
const subtotalCents= lines.reduce((sum, l) => sum + l.lineTotalCents, 0);
const packagingCents = totalItems > 0 ? PACKAGING_FEE_CENTS : 0;
const totalCents =  subtotalCents + packagingCents;
const validateMessage = totalItems === 0 ? "Add at least one item to your gift box." : null;


return{
    getQuantity: ( giftId : number) => selectedItems[giftId] || 0,
    isBoxFull : totalItems >= MAX_ITEMS_PER_BOX,
    addItem, removeItem, clearBox, lines, totalItems, subtotalCents, packagingCents,
    totalCents, validateMessage
}

}