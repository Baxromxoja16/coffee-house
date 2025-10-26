import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'main',
        loadComponent: () => import('./pages/main/main').then(m => m.Main),
    },
    {
        path: 'cart',
        loadComponent: () => import('./pages/cart/cart').then(m => m.Cart),
    },
    {
        path: 'menu',
        loadComponent: () => import('./pages/menu/menu').then(m => m.Menu),
    },
    {
        path: 'sign-in',
        loadComponent: () => import('./pages/sign-in/sign-in').then(m => m.SignIn),
    },
    {
        path: 'register',
        loadComponent: () => import('./pages/register/register').then(m => m.Register),
    },
    { path: '**', redirectTo: 'main' },
];
