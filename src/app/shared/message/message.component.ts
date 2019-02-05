import { FormControl } from '@angular/forms';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-message',
  template: `
    <div *ngIf="temErro()" class="ui-messages ui-messages-error">
      {{ texto }}
    </div>
  `,
  styles: [`
    .ui-messages-error {
      margin: 0;
      padding: 8px;
      margin-top: 4px;
    }
  `]
})
export class MessageComponent {

  @Input() error: string;
  @Input() control: FormControl;
  @Input() texto: string;

  temErro(): boolean {
    return this.control.hasError(this.error) && this.control.dirty;
  }
}
