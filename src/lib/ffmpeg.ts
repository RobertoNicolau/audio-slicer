import { FFmpeg } from '@ffmpeg/ffmpeg';
import { toBlobURL } from '@ffmpeg/util';


let ffmpeg: FFmpeg | null;

const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.4/dist/esm'
const workerBaseURL = 'https://cdnjs.cloudflare.com/ajax/libs/ffmpeg/0.12.7/esm'

export async function getFFmpeg() {

  if (ffmpeg) {
    return ffmpeg;
  }

  ffmpeg = new FFmpeg();

  await ffmpeg.load({
    coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js?url`, 'text/javascript'),
    wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm?url`, 'application/wasm'),
    workerURL: await toBlobURL(`${workerBaseURL}/worker.min.js?url`, 'text/javascript'),
  }).then(() => {
    console.log('## ffmpeg loaded ##');
  })
  return ffmpeg;
}


