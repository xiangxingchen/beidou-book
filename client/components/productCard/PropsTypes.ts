export default interface ProductCardPropTypes {
  isShowAllBenefits?: boolean;
  title?: string;
  tags?: string[];
  insurePlan?: string[];
  brandImg?: string;
  isFixedPrice: boolean;
  price: string;
  benefits: {
    name: string;
    quota: string;
  }[];
}
