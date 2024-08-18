export const timerEntity = {
  elements: [
    // {
    //   id: "2434_123",
    //   name: "Maria Eduarda",
    //   stopped: false,
    //   seconds: 20,
    // },
  ],

  add({ name, id }) {
    const newTimer = {
      id: id,
      name,
      stopped: false,
      seconds: 0,
    };
    this.elements.push(newTimer);
  },

  toggle(id) {
    const timer = this.elements.find((timer) => timer.id === id);
    if (timer) {
      timer.stopped = !timer.stopped;
    }
  },

  remove(id) {
    const index = this.elements.findIndex((timer) => timer.id === id);
    if (index > -1) {
      this.elements.splice(index, 1);
    }
  },
};

setInterval(() => {
  timerEntity.elements.forEach((timer) => {
    if (!timer.stopped) {
      timer.seconds += 1;
    }
    syncTimerWithHtml();
  });
}, 1000);

function syncTimerWithHtml() {
  timerEntity.elements.forEach((timer) => {
    const timerElement = document.querySelector(
      `[data-id="${timer.id}"] [data-seconds]`
    );
    const stopBtn = document.querySelector(`[data-id="${timer.id}"] .stop`);
    // Se um deles existe, o outro também deve existir..
    // Essa é minha filosofia Abender
    if (timerElement) {
      if (timer.stopped) {
        stopBtn.dataset.stopped = "true";
      } else {
        stopBtn.dataset.stopped = "false";
      }

      const minutes = Math.floor(timer.seconds / 60);
      let seconds = timer.seconds % 60;

      if (seconds < 10) {
        seconds = `0${seconds}`;
      }
      timerElement.textContent = `${minutes}m${seconds}s`;
    }
  });
}
