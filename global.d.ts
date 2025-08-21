declare module "../constants" {
  export const imgList: string[];
  export const imgList2: string[];
  export const cardDetails: string[];
}

declare module "*.svg" {
  const value: string;
  export default value;
}
