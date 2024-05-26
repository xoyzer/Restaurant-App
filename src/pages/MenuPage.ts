import { Menu } from '../components/Menu';
import { Cart } from '../components/Cart';

export class MenuPage {
  render(container: HTMLElement) {
    container.innerHTML = `
      <div class="menu-page">
        <div class="menu-container"></div>
        <div class="cart-container"></div>
      </div>
    `;

    const menuContainer = container.querySelector<HTMLDivElement>('.menu-container');
    const cartContainer = container.querySelector<HTMLDivElement>('.cart-container');

    if (menuContainer && cartContainer) {
      const menu = new Menu();
      const cart = new Cart();

      menu.render(menuContainer);
      cart.render(cartContainer);
    } else {
      console.error('Menu or Cart container not found');
    }
  }
}
