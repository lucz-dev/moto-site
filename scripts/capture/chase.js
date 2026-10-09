// Chase camera on a vehicle: exact position, heading smoothed (no drift behind at speed).
// __makeChase(opts) returns step(dt), which places the camera for the current sim state;
// __chase(opts) runs it every animation frame (real-time use).
window.__makeChase = function (opts) {
  const o = Object.assign({ kind: 'bike', id: 2, dist: 5, height: 1.6, side: 0, look: 8, lookY: 0.8, sh: 3.5, orbit: 0, orbitFrom: 0 }, opts);
  GAME.camera('free');
  let hs = null, t = 0;
  const find = () => (o.kind === 'bike' ? GAME.bikes() : GAME.cars()).find((b) => b.id === o.id);
  return function step(dt) {
    t += dt;
    const b = find(); if (!b) return;
    if (hs === null) hs = b.heading;
    let d = b.heading - hs; while (d > Math.PI) d -= 2 * Math.PI; while (d < -Math.PI) d += 2 * Math.PI;
    hs += d * (1 - Math.exp(-o.sh * dt));
    const a = hs + o.orbitFrom + o.orbit * t;
    const fx = Math.sin(a), fz = Math.cos(a), lx = fz, lz = -fx;
    const hx = Math.sin(hs), hz = Math.cos(hs);
    const ex = b.x - fx * o.dist + lx * o.side, ez = b.z - fz * o.dist + lz * o.side;
    let ey = b.y + o.height;
    try { const g = GAME.groundAt(ex, ez); const gy = typeof g === 'number' ? g : g?.y; if (typeof gy === 'number') ey = Math.max(ey, gy + 0.7); } catch {}
    GAME.cameraPose({ x: ex, y: ey, z: ez, tx: b.x + hx * o.look, ty: b.y + o.lookY, tz: b.z + hz * o.look });
  };
};
window.__chase = function (opts) {
  const step = window.__makeChase(opts);
  let last = performance.now();
  function tick(now) {
    if (window.__chaseStop) return;
    requestAnimationFrame(tick);
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    step(dt);
  }
  window.__chaseStop = false;
  requestAnimationFrame(tick);
};
// Real-time canvas recording. Frame timing follows the renderer, so it stutters whenever
// rendering can't keep up: use race-video.mjs for the site's videos.
window.__record = function (ms, { mime = 'video/mp4;codecs=avc1.640028', bps = 4.5e6, fps = 30 } = {}) {
  const canvas = document.querySelector('#app canvas');
  const stream = canvas.captureStream(fps);
  const rec = new MediaRecorder(stream, { mimeType: mime, videoBitsPerSecond: bps });
  const chunks = [];
  rec.ondataavailable = (e) => e.data.size && chunks.push(e.data);
  return new Promise((resolve) => {
    rec.onstop = () => { const blob = new Blob(chunks, { type: mime }); const fr = new FileReader(); fr.onload = () => resolve(fr.result.split(',')[1]); fr.readAsDataURL(blob); };
    rec.start(1000);
    setTimeout(() => rec.stop(), ms);
  });
};
