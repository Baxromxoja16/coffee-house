import { IProduct } from "../../types/interfaces";

export function saveCartAndNotify(cart: IProduct) {
    // console.log(cart);
    const cartsString = localStorage.getItem('cart') || '[]';
    const carts: IProduct[] = JSON.parse(cartsString);
    console.log(carts.find((v) => v.id === cart.id)?.id);
    if(carts.find((v) => v.id === cart.id)?.id) return true;
    // console.log(carts);
    carts.push(cart);
    // console.log(carts);

    localStorage.setItem('cart', JSON.stringify(carts));

    window.dispatchEvent(new CustomEvent('cart-updated', { detail: carts }));
    return false;
}
