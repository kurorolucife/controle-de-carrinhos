import { CardComponent } from "./CardComponent.js";
import { timerEntity } from "./timerEntity.js";
export function handleSubmitItem() {
  /**
   * @type {HTMLFormElement}
   */
  const form = document.querySelector("#cadastrar-carrinho");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    [...form.elements].forEach((element) => {
      if (!element.checkValidity()) {
        element.reportValidity();
        console.log("Oi?");
        return;
      }
    });

    const formData = new FormData(form);
    const { name, id } = Object.fromEntries(formData.entries());
    const card = CardComponent({ name, id });
    const cardId = `${new Date().getTime()}_${id}`;
    timerEntity.add({ name, id: cardId });
    document.querySelector("#carrinhos").appendChild(card);
  });
}
