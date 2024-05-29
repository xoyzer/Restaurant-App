import "./style.css";
import { Menu } from "./components/Menu";
import { Cart } from "./components/Cart";

const app = document.querySelector<HTMLDivElement>("#app");

if (app) {
    const cart = new Cart();

    app.innerHTML = `
    <div class="header">
        <h1>Ресторан</h1>
        <div id="cart-icon">🛒</div>
    </div>
    <div class="main-content">
        <div id="menu-container"></div>
    </div>
    `;

    const menuContainer = document.querySelector<HTMLDivElement>("#menu-container");
    const cartIcon = document.querySelector<HTMLDivElement>("#cart-icon");

    if (menuContainer) {
        const menu = new Menu(cart);
        menu.render(menuContainer);
    } else {
        console.error("Menu container not found");
    }

    cartIcon?.addEventListener("click", (event) => {
        event.stopPropagation();
        cart.toggleCart();
    });

    document.body.insertAdjacentHTML("beforeend", `<div id="cart-container"></div>`);
    const cartContainer = document.querySelector<HTMLDivElement>("#cart-container");

    if (cartContainer) {
        cart.render(cartContainer);
    } else {
        console.error("Cart container not found");
    }

    document.addEventListener("click", (event) => {
        const target = event.target as HTMLElement;
        if (!cartContainer?.contains(target) && !cartIcon?.contains(target)) {
            cart.closeCart();
        }
    });

    cartContainer?.addEventListener("click", (event) => {
        event.stopPropagation();
    });
}
