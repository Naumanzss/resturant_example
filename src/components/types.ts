export interface MenuItem {
  _id: string;
  itemCategory: string[];
  itemName: string;
  itemDescription: string;
  itemSubDescription: string;
  itemPrice: number;
}

export interface ReservationItem {
  _id: string;
  reservationDate: Date;
  reservationFull: boolean;
}
