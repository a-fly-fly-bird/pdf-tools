import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { NgbRatingConfig, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tool-card',
  standalone: true,
  imports: [CommonModule, NgbRatingModule, FontAwesomeModule],
  templateUrl: './tool-card.component.html',
  styleUrl: './tool-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolCardComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() toolClass: string = '';
  @Input() toolIcon = faCoffee;

  constructor(config: NgbRatingConfig) {
    config.max = 5;
  }
}
