// checkout.ts
import { CheckoutPage } from "./pages/CheckoutPage";
import "./style.css";

const app = document.querySelector<HTMLDivElement>("#app");

if (app) {
    const checkoutPage = new CheckoutPage();
    checkoutPage.render(app);
}
