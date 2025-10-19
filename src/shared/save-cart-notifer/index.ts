import { IProductDetail } from "../../types/interfaces";

export function saveCartAndNotify(cart: IProductDetail) {
    const cartsString = localStorage.getItem('carts') || '[]';
    const carts: IProductDetail[] = JSON.parse(cartsString);

    carts.push(cart);

    localStorage.setItem('cart', JSON.stringify(carts));

    window.dispatchEvent(new CustomEvent('cart-updated', { detail: carts }));
}
