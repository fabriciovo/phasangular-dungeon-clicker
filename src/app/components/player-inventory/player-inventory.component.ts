import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-player-inventory',
  standalone: true,
  imports: [],
  templateUrl: './player-inventory.component.html',
  styleUrl: './player-inventory.component.css'
})
export class PlayerInventoryComponent {
  @Input() playerItems: any[] = [];
}
