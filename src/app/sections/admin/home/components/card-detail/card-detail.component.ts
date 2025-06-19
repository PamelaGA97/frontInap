import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CardDetailEnum } from './enum/card-detail.enum';

@Component({
    selector: 'app-card-detail',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './card-detail.component.html',
    styleUrl: './card-detail.component.scss'
})
export class CardDetailComponent {
  @Input() title: string = '';
  @Input() count: number = 0;
  @Input() color: CardDetailEnum = CardDetailEnum.GREEN;
  @Input() materialIcon: string = 'favorite';
  cardDetailEnum = CardDetailEnum;
}
