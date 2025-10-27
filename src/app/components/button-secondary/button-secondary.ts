import { Component } from '@angular/core';

@Component({
  selector: 'app-button-secondary',
  imports: [],
  template: `
    <button class="secondary-button">
      <ng-content select="span"></ng-content>
    </button>
  `,
  styles: `
    .secondary-button {
        padding: 10px 78px;
        border: none;
        border-radius: 100px;
        cursor: pointer;
        line-height: 150%;
        letter-spacing: 0;
        font-size: 16px;
        font-weight: 600;
        background: transparent;
        color: var(--dark);
        border: 1px solid var(--boder-dark);

        transition: ease-in-out 0.3s;
    }

    .secondary-button:hover {
        background: var(--container);
        color: var(--light);
        border: 1px solid var(--container);
    }
  `,
})
export class ButtonSecondary {

}
