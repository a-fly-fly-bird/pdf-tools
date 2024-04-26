import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { NgxUploaderModule } from 'ngx-uploader';
import { PDFDocument } from 'pdf-lib';

@Component({
  selector: 'app-pdf-merge',
  standalone: true,
  imports: [CommonModule, NgxUploaderModule, FontAwesomeModule],
  templateUrl: './pdf-merge.component.html',
  styleUrls: ['./pdf-merge.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PdfMergeComponent {
  faFilePdf = faFilePdf;
  selectedFiles: File[] = [];
  safePdfUrl: SafeResourceUrl | null = null;
  mergedBlob: Blob | null = null;

  constructor(
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef,
  ) {}

  async onFileSelected(event: any) {
    this.selectedFiles = Array.from(event.target.files);
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
    this.mergedBlob = new Blob([mergedPdfFile], { type: 'application/pdf' });
    this.displayPdf(mergedPdfFile);
  }

  private async displayPdf(pdfBytes: Uint8Array) {
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const unsafeUrl = URL.createObjectURL(blob);
    this.safePdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);
    this.cdr.detectChanges();
  }

  downloadBlob(blob: Blob, filename: string) {
    // 创建一个链接元素
    const link = document.createElement('a');
    // 创建一个 DOMString 表示 blob 对象的 URL
    link.href = URL.createObjectURL(blob);
    // 设置下载文件名称
    link.download = filename;
    // 追加链接到 body（隐藏），点击链接，然后移除链接
    document.body.appendChild(link);
    link.click();
    // 清理并移除创建的 URL 对象，以避免内存泄漏
    URL.revokeObjectURL(link.href);
    document.body.removeChild(link);
  }
}
