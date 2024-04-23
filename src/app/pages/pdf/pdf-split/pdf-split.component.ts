import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-pdf-split',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pdf-split.component.html',
  styleUrl: './pdf-split.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PdfSplitComponent {}
