export enum AwardTypeEnum {
  VOUCHER = 'Vouchers',
  PRODUCT = 'Products',
  GIFTCARD = 'Giftcards',
}

export type AwardType = keyof typeof AwardTypeEnum;
