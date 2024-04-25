import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { NgxUploaderModule } from 'ngx-uploader';
import { PDFDocument } from 'pdf-lib';

@Component({
  selector: 'app-pdf-merge',
  standalone: true,
  imports: [CommonModule, NgxUploaderModule],
  templateUrl: './pdf-merge.component.html',
  styleUrl: './pdf-merge.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PdfMergeComponent {
  faFilePdf = faFilePdf;
  selectedFiles: File[] = [];
  safePdfUrl: SafeResourceUrl | null = null;

  constructor(private sanitizer: DomSanitizer) {}

  async onFileSelected(event: any) {
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      this.selectedFiles.push(files.item(i)!);
    }
  }

  async mergePdfs() {
    const mergedPdf = await PDFDocument.create();

    for (const file of this.selectedFiles) {
      const pdfBytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(pdfBytes);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }

    const mergedPdfFile = await mergedPdf.save();
    await this.displayPdf(mergedPdfFile);

    this.downloadBlob(
      new Blob([mergedPdfFile], { type: 'application/pdf' }),
      'merged.pdf',
    );
  }

  downloadBlob(blob: Blob, filename: string) {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
  }

  private async displayPdf(pdfBytes: Uint8Array) {
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const unsafeUrl = URL.createObjectURL(blob);
    this.safePdfUrl =
      await this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);
  }
}
