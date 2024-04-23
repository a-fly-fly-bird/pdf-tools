import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-pdf-merge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pdf-merge.component.html',
  styleUrl: './pdf-merge.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PdfMergeComponent {}
