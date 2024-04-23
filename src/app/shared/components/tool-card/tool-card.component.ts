import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgbRatingConfig, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tool-card',
  standalone: true,
  imports: [CommonModule, NgbRatingModule],
  templateUrl: './tool-card.component.html',
  styleUrl: './tool-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolCardComponent {
  constructor(config: NgbRatingConfig) {
    config.max = 5;
  }
  rating = 4;
  title = 'Hello World';
  description = 'Utilities for controlling the font weight of an element.';
  toolClass = 'Tool';
}
