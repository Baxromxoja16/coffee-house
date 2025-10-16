
/** Kategoriya enum (agar backend string qaytarsa ham enum orqali tekshirish mumkin) */
export enum Category {
    Coffee = 'coffee',
    Dessert = 'dessert',
    Tea = 'tea'
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
    category: Category | string;
}

/** Product detail (batafsil) */
export interface IProductDetail extends IProduct {
    image?: string;
    sizes?: SizesMap;
    additives?: Additive[];
}

/** Generic success response with `data` */
export interface ApiResponse<T> {
    data: T;
    message?: string;
    error?: string | null;
}

/** products/favorites */
export type ProductsListResponse = ApiResponse<IProduct[]>;

/** getDetails (data: ProductDetail) */
export type ProductDetailResponse = ApiResponse<IProductDetail>;

/** Simulated / error response structure */
export interface ApiErrorResponse {
    error: string;
    isTestError?: boolean;
    timestamp?: string; // ISO string
}
