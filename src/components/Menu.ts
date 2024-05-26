import menuData from "../assets/menu.json";
import { Cart } from "./Cart";

interface MenuItem {
    id: number;
    name: string;
    category: string;
    price: number;
    image: string;
}

export class Menu {
    private items: MenuItem[] = menuData as MenuItem[];
    private cart = new Cart();

    render(container: HTMLElement) {
        container.innerHTML = `
            <div class="menu">
                <h2>Меню</h2>
                <div class="filters">
                    <button data-category="all">Все</button>
                    <button data-category="Супы">Супы</button>
                    <button data-category="Салаты">Салаты</button>
                    <button data-category="Мясо">Мясо</button>
                    <button data-category="Напитки">Напитки</button>
                </div>
                <div class="menu-items"></div>
            </div>
        `;

        const menuItemsContainer = container.querySelector<HTMLDivElement>(".menu-items");
        const filterButtons = container.querySelectorAll<HTMLButtonElement>(".filters button");

        if (menuItemsContainer) {
            filterButtons.forEach((button) => {
                button.addEventListener("click", () => {
                    const category = button.getAttribute("data-category");
                    this.renderItems(menuItemsContainer, category);
                });
            });

            this.renderItems(menuItemsContainer, "all");
        } else {
            console.error("Menu items container not found");
        }
    }

    renderItems(container: HTMLElement, category: string | null) {
        let filteredItems = this.items;
        if (category && category !== "all") {
            filteredItems = this.items.filter((item) => item.category === category);
        }

        container.innerHTML = filteredItems
            .map(
                (item) => `
                    <div class="menu-item">
                        <img src="${item.image}" alt="${item.name}" />
                        <h3>${item.name}</h3>
                        <p>Категория: ${item.category}</p>
                        <p>Цена: ₽${item.price.toFixed(2)}</p>
                        <button data-id="${item.id}">Добавить в корзину</button>
                    </div>
                `
            )
            .join("");

        const addToCartButtons = container.querySelectorAll<HTMLButtonElement>(".menu-item button");
        addToCartButtons.forEach((button) => {
            button.addEventListener("click", () => {
                const itemId = button.getAttribute("data-id");
                const item = this.items.find((i) => i.id === Number(itemId));
                if (item) {
                    this.cart.addToCart(item);
                }
            });
        });
    }
}
