import { Component } from '@angular/core';
import { CardDetailComponent } from './components/card-detail/card-detail.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardDetailComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
