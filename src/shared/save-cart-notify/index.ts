import { CartItem } from "../../types/interfaces";

export function saveCartAndNotify(cart: CartItem) {
    const cartsString = localStorage.getItem('cart') || '[]';
    const carts: CartItem[] = JSON.parse(cartsString);
    
    const foundCart =  carts.findIndex((v) => v.id === cart.id);
    if(foundCart + 1) {
        carts.splice(foundCart, 1, cart)
        localStorage.setItem('cart', JSON.stringify(carts));
        return true;
    };

    carts.push(cart);

    localStorage.setItem('cart', JSON.stringify(carts));

    window.dispatchEvent(new CustomEvent('cart-updated', { detail: carts }));
    return false;
}
