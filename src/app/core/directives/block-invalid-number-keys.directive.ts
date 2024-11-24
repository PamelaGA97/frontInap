import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appBlockInvalidNumberKeys]',
  standalone: true
})
export class BlockInvalidNumberKeysDirective {

   @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent): void {
    const invalidKeys = ['e', 'E', '+', '-'];

    if (invalidKeys.includes(event.key)) {
      event.preventDefault();
    }
  }
}
