class RoutineFinder {
  constructor(root) {
    this.root = root;
    this.form = root.querySelector('[data-routine-form]');
    this.steps = [...root.querySelectorAll('[data-routine-step]')];
    this.progress = root.querySelector('[data-routine-progress]');
    this.result = root.querySelector('[data-routine-results]');
    this.current = 0;
    this.form?.addEventListener('click', (event) => this.handleClick(event));
    this.form?.addEventListener('submit', (event) => this.submit(event));
    this.showStep(0);
  }

  handleClick(event) {
    const next = event.target.closest('[data-routine-next]');
    const previous = event.target.closest('[data-routine-previous]');
    if (next) {
      const selected = this.steps[this.current].querySelector('input:checked');
      const error = this.steps[this.current].querySelector('[data-step-error]');
      if (!selected) {
        error.hidden = false;
        return;
      }
      error.hidden = true;
      this.showStep(this.current + 1);
    }
    if (previous) this.showStep(this.current - 1);
  }

  showStep(index) {
    this.current = Math.max(0, Math.min(index, this.steps.length - 1));
    this.steps.forEach((step, stepIndex) => {
      step.hidden = stepIndex !== this.current;
    });
    this.progress.style.width = `${((this.current + 1) / this.steps.length) * 100}%`;
    this.root.querySelector('[data-routine-count]').textContent = `${this.current + 1} de ${this.steps.length}`;
  }

  submit(event) {
    event.preventDefault();
    const data = new FormData(this.form);
    const unselected = this.steps.findIndex((step) => !step.querySelector('input:checked'));
    if (unselected >= 0) {
      this.showStep(unselected);
      this.steps[unselected].querySelector('[data-step-error]').hidden = false;
      return;
    }

    const needsProfessional = data.get('red_flags') === 'yes' || data.get('special_care') === 'yes';
    const target = needsProfessional ? 'safety' : data.get('need');
    this.form.hidden = true;
    this.result.hidden = false;
    this.root.querySelectorAll('[data-routine-result]').forEach((panel) => {
      panel.hidden = panel.dataset.routineResult !== target;
    });
    // Mover foco al resultado y scroll respetando prefers-reduced-motion
    const heading = this.result.querySelector('h2, [data-routine-title]');
    if (heading) {
      heading.setAttribute('tabindex', '-1');
      heading.focus({ preventScroll: true });
    }
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.result.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-routine-finder]').forEach((root) => new RoutineFinder(root));
});
