import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageLike, createWorker } from 'tesseract.js';

@Component({
  selector: 'app-ocr',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './ocr.component.html',
  styleUrls: ['./ocr.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OcrComponent {
  imageUrl: string | ArrayBuffer | undefined;
  ocrResult = '';
  isLoading = false;

  constructor(private modalService: NgbModal) {}

  async handleFileInput(event: Event) {
    this.isLoading = true;
    const target = event.target as HTMLInputElement;
    if (target?.files) {
      const file = target.files[0];
      const imageUrl = await this.convertToBase64(file);
      this.imageUrl = imageUrl;
      await this.recognizeImage(imageUrl);
    }
    this.isLoading = false;
  }

  convertToBase64(file: File): Promise<string | ArrayBuffer> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.result) {
          resolve(reader.result);
        } else {
          reject(new Error('File reading failed'));
        }
      };
      reader.onerror = (error) => reject(error);
    });
  }

  async recognizeImage(imageUrl: string | ArrayBuffer) {
    const worker = await createWorker();
    await worker.load();

    // 将 imageUrl 转换为 ImageLike 类型
    let imageData: ImageLike;
    if (typeof imageUrl === 'string') {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const arrayBuffer = await blob.arrayBuffer();
      imageData = new Uint8Array(arrayBuffer) as unknown as ImageLike;
    } else {
      imageData = new Uint8Array(imageUrl) as unknown as ImageLike;
    }

    const {
      data: { text },
    } = await worker.recognize(imageData);
    this.ocrResult = text;
    await worker.terminate();
  }

  copyText(textToCopy: string) {
    const el = document.createElement('textarea');
    el.value = textToCopy;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }

  open(content: any) {
    this.modalService.open(content, { size: 'lg' });
  }
}
