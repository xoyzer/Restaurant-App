// CheckoutPage.ts
import { CartItem } from "../components/Cart";

export class CheckoutPage {
    render(container: HTMLElement) {
        container.innerHTML = `
            <div class="checkout-page">
                <h2>Сводка заказа</h2>
                <div class="order-items"></div>
                <div class="order-total"></div>
                <button class="buy">Купить</button>
            </div>
        `;

        this.renderOrderSummary(container);
    }

    renderOrderSummary(container: HTMLElement) {
        const orderItemsContainer = container.querySelector<HTMLDivElement>(".order-items");
        const orderTotalContainer = container.querySelector<HTMLDivElement>(".order-total");

        if (orderItemsContainer && orderTotalContainer) {
            const cartItems: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");

            orderItemsContainer.innerHTML = cartItems
                .map(
                    (item) => `
                    <div class="order-item">
                        <p>${item.name}</p>
                        <p>Количество: ${item.quantity}</p>
                        <p>Цена: ₽${item.price.toFixed(2)}</p>
                        <p>Общая стоимость: ₽${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                `
                )
                .join("");

            const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
            orderTotalContainer.innerHTML = `Итого: ₽${total.toFixed(2)}`;

            const buyButton = container.querySelector<HTMLButtonElement>(".buy");
            if (buyButton) {
                buyButton.addEventListener("click", () => {
                    alert("Покупка успешна!");
                    localStorage.removeItem("cart");
                    window.location.href = "/";
                });
            } else {
                console.error("Кнопка покупки не найдена");
            }
        } else {
            console.error("Контейнеры для элементов заказа или общей суммы не найдены");
        }
    }
}
