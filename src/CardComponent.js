import { timerEntity } from "./timerEntity.js";
import { createHTMLElement as render } from "./utils.js";
/**
 *
 * @param {{name: string, id: string}} parameters
 * @returns
 */
export function CardComponent({ name, id }) {
  const cardId = `${new Date().getTime()}_${id}`;
  const closeBtn = render({
    el: "button",
    text: "Fechar",
    attributes: {
      class: "close",
    },
    events: {
      click: () => {
        timerEntity.toggle(cardId);
        timerEntity.remove(cardId);
        document.querySelector(`[data-id="${cardId}"]`).remove();
      },
    },
  });
  const childName = render({
    el: "p",
    children: [render({ el: "strong", text: "Nome da criança:" }), name],
  });
  const childId = render({
    el: "p",
    children: [render({ el: "strong", text: "Cod. Identificador:" }), id],
  });
  const childTimer = render({
    el: "p",
    children: [
      render({ el: "strong", text: "Timer:" }),
      render({ el: "span", attributes: { "data-seconds": null } }),
    ],
  });

  const stopBtn = render({
    el: "button",
    events: {
      click: () => {
        timerEntity.toggle(cardId);
      },
    },
    attributes: {
      class: "stop",
      "data-stopped": "false",
    },
    children: [
      render({ el: "span", text: "Parar" }),
      render({ el: "span", text: "Continuar" }),
    ],
  });

  const card = render({
    el: "article",
    attributes: {
      "data-id": cardId,
    },
    children: [closeBtn, childName, childId, childTimer, stopBtn],
  });
  return render({
    el: "li",
    children: [card],
  });
}

{
  /*
<li>
  <article data-id="21213_123">
    <button class="close">Fechar</button>

    <p>
      <strong>Nome da criança:</strong> Maria Eduarda
    </p>
    <p>
      <strong>Cod. Identificador:</strong> 123
    </p>
    <p>
      <strong>Timer:</strong> 18m43s
    </p>
    <button class="stop" data-stopped="false">
      <span>Parar</span>
      <span>Continuar</span>
    </button>
  </article>
</li>
*/
}
