import { Product } from '../../models/Product';

export interface PaymentRequestBody {
  products: Product[];
  currency: string;
}
