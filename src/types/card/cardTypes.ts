export interface PaymentItemProps {
  storeName: string;
  detail: string;
  price: number;
  date: string;
  paymentStatus: string;
}

export interface AddCardFormData {
  cardNumber: string;
  cvc: string;
  expirationDate: string;
  cardHolderName: string;
  cardPassword: string;
}

export interface CardInfoData {
  cardId: string;
  cardName: string;
  cardType: string;
  cardLastNum: string;
  cardImage: string;
}
