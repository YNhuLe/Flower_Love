//product interface
interface BestProductProp {
  id: string;
  common_name: string;
  image_url: string;
  details: string;
  rating: number;
  isnewarrival: boolean;
  watering_requirements:string;

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
  category_name: string;
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
  category_name: string;
}

interface GiftItemsCategoriesProps extends GiftCategories {
  gift_items: GiftItemProps[];
}

//categories interface
interface CategoriesProps{ 
  name: string;
  description: string;
  quantity: number;
  cate_img?: string;
}

//products interface
interface NewProductProps{
  id: number;
  common_name: string;
  scientific_name: string;
  description: string;

  image_url: string[];


  light_requirements: string;
  watering_requirements: string;
  humidity_preference: string;
  temperature_range: string;
  soil_type: string;
  fertilizer_info: string;
  potting_tip: string;
  common_problems: string;
  growth_habit: string;
  mature_width: string;
  mature_height: string;
  bloom_info: string;
  is_pet_friendly: boolean;
  air_purifying: boolean;
  humidity: string;
  light: string;
  stock_quantity: number;
  shipping_info: string;
  rating: number;
  num_reviews: number;
  isnewarrival: boolean;
  plantinglevel: string;
  isonsale: boolean;
  category_id: string;
  benefits: string
}

interface PlantSizeProps{
  size_id: number;
  plant_id: number;
  original_price: number;
  discount_percentage: number
size: string
}
//Plant details with nested sizes array
interface PlantWithSize extends NewProductProps{
sizes: (PlantSizeProps & {discounted_price: number})[];
}


interface ProductWithCategory extends CategoriesProps, NewProductProps,PlantWithSize {
}

interface ProductAndInfo{
  new_products : ProductWithCategory[]
}
export type {
  BestProductProp,
  GiftboxWithItemsProps,
  GiftItemsCategoriesProps,
  GiftCategories,
  GiftItemProps,
  CategoriesProps,
ProductAndInfo,
NewProductProps,ProductWithCategory,
PlantWithSize
};
