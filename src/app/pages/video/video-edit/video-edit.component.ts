import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { createFFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';

@Component({
  selector: 'app-video-edit',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-edit.component.html',
  styleUrl: './video-edit.component.scss',
})
export default class VideoEditComponent {
  ffmpeg = createFFmpeg({
    log: true,
  });
  selectedVideo: File | null = null;
  videoUrl: string | null = null;
  outputUrl: string | null = null;

  async onVideoSelect(event: Event): Promise<void> {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (files && files.length > 0) {
      this.selectedVideo = files[0];
      this.videoUrl = URL.createObjectURL(this.selectedVideo);
    }
  }

  async trimVideo(): Promise<void> {
    if (!this.ffmpeg.isLoaded()) {
      await this.ffmpeg.load();
    }

    this.ffmpeg.FS(
      'writeFile',
      this.selectedVideo!.name,
      await fetchFile(this.videoUrl!),
    );

    // 假设我们要裁剪视频中的前5秒
    await this.ffmpeg.run(
      '-i',
      this.selectedVideo!.name,
      '-ss',
      '00:00:00',
      '-t',
      '00:00:05',
      'output.mp4',
    );

    const data = this.ffmpeg.FS('readFile', 'output.mp4');
    const videoBlob = new Blob([data.buffer], { type: 'video/mp4' });
    this.outputUrl = URL.createObjectURL(videoBlob);
  }

  async mergeVideos(): Promise<void> {
    if (!this.ffmpeg.isLoaded()) {
      await this.ffmpeg.load();
    }

    // 这里需要有多个视频文件示例，暂时只处理一个文件
    this.ffmpeg.FS(
      'writeFile',
      this.selectedVideo!.name,
      await fetchFile(this.videoUrl!),
    );

    await this.ffmpeg.run(
      '-f',
      'concat',
      '-safe',
      '0',
      '-i',
      'filelist.txt',
      '-c',
      'copy',
      'output.mp4',
    );

    const data = this.ffmpeg.FS('readFile', 'output.mp4');
    const videoBlob = new Blob([data.buffer], { type: 'video/mp4' });
    this.outputUrl = URL.createObjectURL(videoBlob);
  }
}
