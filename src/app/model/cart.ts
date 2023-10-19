import { Product } from "./product";
import { User } from "./user";

export interface Cart {
    orderProducts: Product[];
    orders: Product[];
    user:User;
    cart:Product[];
}
