import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  SecurityContext,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PDFDocument } from 'pdf-lib';

@Component({
  selector: 'app-pdf-split',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pdf-split.component.html',
  styleUrl: './pdf-split.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PdfSplitComponent {
  pdfSrc: SafeResourceUrl | null = null;
  fromPage: number = 1;
  toPage: number = 1;

  constructor(
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef,
  ) {}

  async onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const arrayBuffer = await file.arrayBuffer();
      const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
      const unsafeUrl = URL.createObjectURL(blob);
      // 使用DomSanitizer将URL标记为安全的
      this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);
      this.cdr.detectChanges();
    }
  }

  async splitPDF() {
    const pdfUrl = this.sanitizer.sanitize(
      SecurityContext.RESOURCE_URL,
      this.pdfSrc,
    );
    if (!pdfUrl) {
      return;
    }

    const existingPdfBytes = await fetch(pdfUrl).then((res) =>
      res.arrayBuffer(),
    );
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const totalPages = pdfDoc.getPageCount();

    const start = Math.max(this.fromPage - 1, 0);
    const end = Math.min(this.toPage, totalPages);

    const newPdfDoc = await PDFDocument.create();
    for (let i = start; i < end; i++) {
      const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [i]);
      newPdfDoc.addPage(copiedPage);
    }

    const pdfBytes = await newPdfDoc.save();
    this.download(pdfBytes, 'split-document.pdf', 'application/pdf');
  }

  download(blob: Uint8Array, filename: string, mimeType: string) {
    const blobUrl = URL.createObjectURL(new Blob([blob], { type: mimeType }));
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }
}
