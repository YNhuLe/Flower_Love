//product interface
interface BestProductProp {
  id: string;
  common_name: string;
  image_url: string;
  details: string;
  original_price: number;
  discounted_price: number;
  rating: number;
}
interface GiftBoxProps {
  id: string;
  title: string;
  description: string;
  img_url: string;
  discount: number;
  price: number;
  ori_price: number;
  isFirst?: boolean;
  customize?: boolean;
}
interface GiftboxItemsProps {
  id: number;
  giftbox_id: number;
  item_name: string;
  quantity: number;
}

interface GiftboxWithItemsProps extends GiftBoxProps {
  items: GiftboxItemsProps[];
}

//gift interface
interface GiftItemProps {
  id: number;
  name: string;
  description?: string;
  price: number;
  img_url?: string;
  category_id: number;
  isNewArrival?: boolean;
  isPopular?: boolean;
  isOnSale?: boolean;
}

interface GiftCategories {
  id: number;
  name: string;
}

interface GiftItemsCategoriesProps extends GiftCategories {
  gift_items: GiftCategories[];
}
export type {
  BestProductProp,
  GiftboxWithItemsProps,
  GiftItemsCategoriesProps, GiftCategories
};
