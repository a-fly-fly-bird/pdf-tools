import { Injectable } from '@angular/core';
import { PDFDocument } from 'pdf-lib';

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  constructor() {}

  async splitPdf(
    file: ArrayBuffer,
    fromPage: number,
    toPage: number,
  ): Promise<Blob> {
    const existingPdfDoc = await PDFDocument.load(file);
    const newPdfDoc = await PDFDocument.create();

    const pageIndices = Array.from(
      { length: toPage - fromPage + 1 },
      (_, i) => i + fromPage - 1,
    );
    const pages = await newPdfDoc.copyPages(existingPdfDoc, pageIndices);

    pages.forEach((page) => {
      newPdfDoc.addPage(page);
    });

    const pdfBytes = await newPdfDoc.save();
    return new Blob([pdfBytes], { type: 'application/pdf' });
  }
}
