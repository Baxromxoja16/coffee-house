import { Category, PaymentMethodEnum } from "./enums";

/** Categories */
export interface Categories {
    coffee: IProduct[],
    tea: IProduct[],
    dessert: IProduct[]
}
/** Size entry (har bir size uchun obyekt) */
export interface SizeEntry {
    size: string;
    price: string;
    discountPrice?: string;
}

/** Map of sizes — backendda aniq kalitlar bo'lsa ularni qo'yamiz */
export type SizesMap = {
    s?: SizeEntry;
    m?: SizeEntry;
    l?: SizeEntry;
    xl?: SizeEntry;
    xxl?: SizeEntry;
};

/** Additive (qo'shimchalar) */
export interface Additive {
    name: string;
    price: string;
    discountPrice?: string;
}

/** Asosiy product (list itemlarda ishlatiladi) */
export interface IProduct {
    id: number;
    name: string;
    description: string;
    price: string;
    discountPrice?: string;
    category: Category;
    index?: number;
}

/** Product detail (batafsil) */
export interface IProductDetail extends IProduct {
    image?: string;
    sizes?: SizesMap;
    additives?: Additive[];
}

/** Generic success response with `data` */
export interface ApiResponse {
    data?: IProduct[];
    message?: string;
    error?: string | null;
}

/** products/favorites */
// export type ProductsListResponse = ApiResponse<IProduct[]>;

/** getDetails (data: ProductDetail) */
// export type ProductDetailResponse = ApiResponse<IProductDetail>;

/** Simulated / error response structure */
export interface ApiErrorResponse {
    error: string;
    isTestError?: boolean;
    timestamp?: string; // ISO string
}

export interface AuthResponse {
    data: AuthSuccessResponse,
    message: string
}

export interface AuthSuccessResponse {
    access_token: string;
    user: User;
}

export interface User {
    id?: number;
    login: string;
    city: string;
    street: string;
    houseNumber: number;
    paymentMethod: PaymentMethodEnum;
    createdAt?: string; // ISO format
}

export interface CartItem {
    id: number;
    name: string;
    description: string;
    category: Category;
    totalPrice: {
        price: string;
        discountPrice: string;
        hasDiscount: boolean;
    }
    currentAdditive: Additive;
    currentSize: SizeEntry;
    image?: string;
}

export type ToastType = 'success' | 'error' | 'warning';

export interface Toast {
  id: number;
  type: ToastType;
  message: string;
  duration: number; // ms
  createdAt: number;
}