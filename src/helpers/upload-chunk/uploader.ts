import { uploadChunkApi } from '@/apis/user/storage/storage.api';

interface IOptions {
  chunkSize?: number;
  file: File;
  parent_id: string;
}
export class Uploader {
  parent_id: string;
  chunkSize: number;
  file: File;
  uploadedSize: number;
  parts: any[];
  uploadedParts: any[];
  uploadId: string | null;
  total_size: number;
  isDone: boolean;
  onProgressFn: (progress) => void;
  onErrorFn: (err) => void;
  onCompleteFn: (response) => void;

  constructor(options: IOptions) {
    this.chunkSize = options.chunkSize || 1024 * 1024 * 25;
    this.file = options.file;
    this.uploadedSize = 0;
    this.parts = [];
    this.parent_id = options.parent_id;
    this.uploadedParts = [];
    this.uploadId = null;
    this.isDone = false;
    this.onProgressFn = (progress) => console.log('progress', progress);
    this.onErrorFn = (err) => console.log('err', err);
    this.onCompleteFn = (response) => console.log('response', response);
  }

  async start() {
    await this.initialize();
  }

  async initialize() {
    try {
      this.total_size = this.file.size;
      const numberOfParts = Math.ceil(this.file.size / this.chunkSize);
      this.parts.push(
        ...[...Array(numberOfParts).keys()].map((_, index) => ({
          PartNumber: numberOfParts - index,
        })),
      );
      this.sendNext();
    } catch (error) {
      await this.complete(error, null);
    }
  }
  async sendNext() {
    const part = this.parts.pop();
    if (this.file && part) {
      const sentSize = (part.PartNumber - 1) * this.chunkSize;
      const chunk = this.file.slice(sentSize, sentSize + this.chunkSize);
      if (this.parts.length == 0) {
        const res = await this.sendCompleteRequest(new File([chunk], `${this.file.name}_${part.PartNumber}`));
        this.onCompleteFn(res);
      } else {
        try {
          const response = await uploadChunkApi({
            file: new File([chunk], part.PartNumber === 1 ? `${this.file.name}` : `${this.file.name}_${part.PartNumber}`),
            file_id: this.uploadId,
            id: this.parent_id,
            last: false,
            total_size: this.total_size,
          });
          this.uploadId = response.id;
          this.sendNext();
        } catch (err) {
          this.complete(err);
          console.log(this.uploadedParts + '/' + this.total_size);
        }
      }
    }
  }
  async complete(error: unknown | undefined = null, file: File = null) {
    if (error && !file) {
      this.onErrorFn(error);
      return;
    }
    try {
      const response = await this.sendCompleteRequest(file);
      this.onCompleteFn(response);
    } catch (error) {
      this.onErrorFn(error);
    }
  }

  async sendCompleteRequest(file: File) {
    if (this.uploadId) {
      try {
        const response = await uploadChunkApi({
          file: file,
          file_id: this.uploadId,
          id: this.parent_id,
          last: true,
          total_size: this.total_size,
        });
        return response;
      } catch (error) {
        this.complete(error);
        console.log('send-complete-error', error);
      }
    }
  }

  // sendChunk(chunk, part, sendChunkStarted): Promise<void> {
  //   return new Promise((resolve, reject) => {
  //     this.upload(chunk, part, sendChunkStarted)
  //       .then((status) => {
  //         if (status !== 200) {
  //           reject(new Error('Failed chunk upload'));
  //           return;
  //         }

  //         resolve();
  //       })
  //       .catch((error) => {
  //         reject(error);
  //       });
  //   });
  // }

  // handleProgress(part, event) {
  //   //console.log('part', part, 'event', event);
  //   if (this.file) {
  //     if (event.type === 'progress' || event.type === 'error' || event.type === 'abort') {
  //       this.progressCache[part] = event.loaded;
  //     }

  //     if (event.type === 'uploaded') {
  //       this.uploadedSize += this.progressCache[part] || 0;
  //       delete this.progressCache[part];
  //     }

  //     const inProgress = Object.keys(this.progressCache)
  //       .map(Number)
  //       .reduce((memo, id) => (memo += this.progressCache[id]), 0);

  //     const sent = Math.min(this.uploadedSize + inProgress, this.file.size);

  //     const total = this.file.size;

  //     const percentage = Math.round((sent / total) * 100);

  //     this.onProgressFn({
  //       sent: sent,
  //       total: total,
  //       percentage: percentage,
  //     });
  //   }
  // }

  // upload(file, part, sendChunkStarted) {
  //   return new Promise(async (resolve, reject) => {
  //     if (this.uploadId && this.fileKey) {
  //       // we need to get the multipart chunk url immediately before starting the upload
  //       // since creating them beforehand may result in the urls expiring
  //       const {
  //         data: { signedUrl },
  //       } = await api.request({
  //         url: `/multipart_uploads/${this.uploadId}/part_url`,
  //         method: 'POST',
  //         data: {
  //           fileKey: this.fileKey,
  //           partNumber: part.PartNumber,
  //         },
  //       });

  //       // - 1 because PartNumber is an index starting from 1 and not 0
  //       const xhr = (this.activeConnections[part.PartNumber - 1] = new XMLHttpRequest());

  //       sendChunkStarted();

  //       const progressListener = this.handleProgress.bind(this, part.PartNumber - 1);

  //       xhr.upload.addEventListener('progress', progressListener);

  //       xhr.addEventListener('error', progressListener);
  //       xhr.addEventListener('abort', progressListener);
  //       xhr.addEventListener('loadend', progressListener);

  //       xhr.open('PUT', signedUrl);

  //       xhr.onreadystatechange = () => {
  //         if (xhr.readyState === 4 && xhr.status === 200) {
  //           // retrieving the ETag parameter from the HTTP headers
  //           const ETag = xhr.getResponseHeader('etag');

  //           if (ETag) {
  //             const uploadedPart = {
  //               PartNumber: part.PartNumber,
  //               // removing the " enclosing carachters from
  //               // the raw ETag
  //               ETag: ETag.replaceAll('"', ''),
  //             };

  //             this.uploadedParts.push(uploadedPart);

  //             resolve(xhr.status);
  //             delete this.activeConnections[part.PartNumber - 1];
  //           }
  //         }
  //       };

  //       xhr.onerror = (error) => {
  //         console.log('xhr error', error);
  //         reject(error);
  //         delete this.activeConnections[part.PartNumber - 1];
  //       };

  //       xhr.onabort = () => {
  //         console.log('xhr abort');
  //         reject(new Error('Upload canceled by user'));
  //         delete this.activeConnections[part.PartNumber - 1];
  //       };

  //       xhr.send(file);
  //     }
  //   });
  // }

  onProgress(onProgress) {
    this.onProgressFn = onProgress;
    return this;
  }

  onComplete(onComplete) {
    this.onCompleteFn = onComplete;
    return this;
  }

  onError(onError) {
    this.onErrorFn = onError;
    return this;
  }
}
