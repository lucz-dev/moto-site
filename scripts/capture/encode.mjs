// Encode a JPEG frame stream (race-video.mjs) into a web MP4: H.264 High, yuv420p, faststart.
// CLI: node encode.mjs clips/coastbc.mjpeg out.mp4 [fps] [crf] [width]
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { FFMPEG } from './env.mjs';

export function encode(input, output, { fps = 60, crf = 21, width = 1920 } = {}) {
  const args = ['-y', '-hide_banner', '-loglevel', 'error', '-f', 'mjpeg', '-framerate', String(fps), '-i', input,
    '-vf', `scale=${width}:-2:flags=lanczos:in_color_matrix=bt601:out_color_matrix=bt709:in_range=pc:out_range=tv,format=yuv420p`, '-c:v', 'libx264', '-preset', 'slow', '-crf', String(crf),
    '-profile:v', 'high', '-color_range', 'tv', '-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709',
    '-movflags', '+faststart', '-an', output];
  return new Promise((resolve, reject) => {
    const ff = spawn(FFMPEG, args, { stdio: 'inherit' });
    ff.on('close', (code) => (code === 0 ? resolve() : reject(new Error(`ffmpeg exited with ${code}`))));
  });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const [input, output, fps = '60', crf = '21', width = '1920'] = process.argv.slice(2);
  await encode(input, output, { fps: +fps, crf: +crf, width: +width });
  console.log('ok', output);
}
