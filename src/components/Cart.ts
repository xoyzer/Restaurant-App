export interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

export class Cart {
    private cartElement: HTMLElement | null = null;

    render(container: HTMLElement) {
        container.innerHTML = `
            <div class="cart">
              <button class="close-cart">Закрыть</button>
              <h2>Ваша корзина</h2>
              <div class="cart-items"></div>
              <div class="cart-total"></div>
              <button class="checkout">Перейти к оплате</button>
            </div>
        `;
        this.cartElement = container.querySelector(".cart");
        this.updateCart();

        const checkoutButton = container.querySelector<HTMLButtonElement>(".checkout");
        if (checkoutButton) {
            checkoutButton.addEventListener("click", () => {
                window.location.href = "/checkout.html";
            });
        } else {
            console.error("Checkout button not found");
        }

        const closeButton = container.querySelector<HTMLButtonElement>(".close-cart");
        if (closeButton) {
            closeButton.addEventListener("click", () => {
                this.closeCart();
            });
        } else {
            console.error("Close button not found");
        }

        this.cartElement?.addEventListener("click", (event) => {
            event.stopPropagation();
        });
    }

    updateCart() {
        if (!this.cartElement) return;

        const cartItemsContainer = this.cartElement.querySelector<HTMLDivElement>(".cart-items");
        const cartTotalContainer = this.cartElement.querySelector<HTMLDivElement>(".cart-total");
        const cartIcon = document.querySelector<HTMLDivElement>("#cart-icon");

        if (cartItemsContainer && cartTotalContainer) {
            const cartItems: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
            cartItemsContainer.innerHTML = cartItems
                .map(
                    (item: CartItem, index: number) => `
                        <div class="cart-item">
                            <p>${item.name} (x${item.quantity})</p>
                            <p>₽${(item.price * item.quantity).toFixed(2)}</p>
                            <button data-index="${index}">Удалить</button>
                        </div>
                    `
                )
                .join("");

            const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
            cartTotalContainer.innerHTML = `Итого: ₽${total.toFixed(2)}`;

            const removeButtons = cartItemsContainer.querySelectorAll<HTMLButtonElement>(".cart-item button");
            removeButtons.forEach((button) => {
                button.addEventListener("click", () => {
                    const index = button.getAttribute("data-index");
                    if (index !== null) {
                        this.removeFromCart(Number(index));
                        this.updateCart();
                    }
                });
            });

            const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
            if (cartIcon) {
                cartIcon.setAttribute("data-count", totalItems > 0 ? String(totalItems) : "");
            }
        } else {
            console.error("Cart items or total container not found");
        }
    }

    addToCart(item: Omit<CartItem, "quantity">) {
        console.log("Adding item to cart:", item);
        const cartItems: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
        const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cartItems.push({ ...item, quantity: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(cartItems));
        this.updateCart();
    }

    removeFromCart(index: number) {
        const cartItems: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
        cartItems.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cartItems));
        this.updateCart();
    }

    toggleCart() {
        if (this.cartElement) {
            this.cartElement.classList.toggle("show");
        }
    }

    closeCart() {
        if (this.cartElement) {
            this.cartElement.classList.remove("show");
        }
    }
}
