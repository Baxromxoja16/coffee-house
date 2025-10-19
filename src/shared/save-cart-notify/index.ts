import { IProduct } from "../../types/interfaces";

export function saveCartAndNotify(cart: IProduct) {
    const cartsString = localStorage.getItem('carts') || '[]';
    const carts: IProduct[] = JSON.parse(cartsString);

    carts.push(cart);

    localStorage.setItem('cart', JSON.stringify(carts));

    window.dispatchEvent(new CustomEvent('cart-updated', { detail: carts }));
}
