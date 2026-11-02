      // 2. Native <dialog> open/close triggers + Safari closedBy="any" light-dismiss fallback
      document.querySelectorAll('[data-open-dialog]').forEach((trigger) => {
        trigger.addEventListener('click', () => {
          const targetId = trigger.getAttribute('data-open-dialog');
          if (!targetId) return;
          const dialog = document.getElementById(targetId) as HTMLDialogElement | null;
          if (!dialog) return;

          const presetPosition = trigger.getAttribute('data-position-title');
          if (presetPosition) {
            const posInput = dialog.querySelector('input[name="position"]') as HTMLInputElement | null;
            if (posInput) posInput.value = presetPosition;
          }

          dialog.showModal();
        });
      });

      document.querySelectorAll('dialog').forEach((dialog) => {
        dialog.querySelectorAll('[data-close-dialog]').forEach((el) => {
          el.addEventListener('click', () => dialog.close());
        });

        if (!('closedBy' in HTMLDialogElement.prototype)) {
          dialog.addEventListener('click', (event) => {
            if (event.target !== dialog) return;
            const rect = dialog.getBoundingClientRect();
            const isDialogContent =
              rect.top <= event.clientY &&
              event.clientY <= rect.top + rect.height &&
              rect.left <= event.clientX &&
              event.clientX <= rect.left + rect.width;
            if (isDialogContent) return;
            dialog.close();
          });
        }
      });


export {};
