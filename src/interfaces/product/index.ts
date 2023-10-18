import { OrderItemInterface } from 'interfaces/order-item';
import { PharmacyInterface } from 'interfaces/pharmacy';
import { GetQueryInterface } from 'interfaces';

export interface ProductInterface {
  id?: string;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  pharmacy_id: string;
  created_at?: any;
  updated_at?: any;
  order_item?: OrderItemInterface[];
  pharmacy?: PharmacyInterface;
  _count?: {
    order_item?: number;
  };
}

export interface ProductGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  description?: string;
  pharmacy_id?: string;
}
