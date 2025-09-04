interface BestProductProp {
  id: string;
  common_name: string;
  image_url: string;
  details: string;
  original_price: number;
  discounted_price: number;
}
interface GiftBoxProps{
    id: string;
    titile: string;
    description: string;
    img_url: string;
    discount: number;
    price: number;
    ori_price: number;
}
interface GiftboxItemsProps{
     id: number;
     giftbox_id: number;
     item_name: string;
     quantity: number;

}

interface GiftboxWithItemsProps extends GiftBoxProps{
    items: GiftboxItemsProps[];
}
export type {BestProductProp, GiftboxWithItemsProps}