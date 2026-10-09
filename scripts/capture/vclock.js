// Page clock for frame-exact recording (added as an init script, before the game loads).
// Normally a pass-through. After __vclock.manual(true), requestAnimationFrame callbacks
// only run on __vclock.advance(ms), and performance.now() / Date.now() return the virtual
// time, so the game, its client animations and the camera all move by exactly `ms` per frame,
// however long the frame takes to render.
(() => {
  const realRaf = window.requestAnimationFrame.bind(window);
  const realNow = performance.now.bind(performance);
  const realDateNow = Date.now;
  const queue = new Map();
  const cancelled = new Set();
  let manual = false;
  let vnow = 0;
  let dateOffset = 0;
  let nextId = 1;

  window.requestAnimationFrame = (cb) => {
    const id = nextId++;
    if (manual) queue.set(id, cb);
    // A frame requested before switching to manual waits for the first advance().
    else realRaf((t) => { if (cancelled.delete(id)) return; if (manual) queue.set(id, cb); else cb(t); });
    return id;
  };
  window.cancelAnimationFrame = (id) => {
    if (!queue.delete(id)) cancelled.add(id);
  };
  performance.now = () => (manual ? vnow : realNow());
  Date.now = () => (manual ? Math.round(vnow + dateOffset) : realDateNow());

  window.__vclock = {
    manual(on) {
      if (on && !manual) {
        vnow = realNow();
        dateOffset = realDateNow() - vnow;
      }
      manual = on;
    },
    /** Move the virtual clock by `ms` and run the frames waiting for it. */
    advance(ms) {
      vnow += ms;
      const due = [...queue.values()];
      queue.clear();
      for (const cb of due) cb(vnow);
    },
  };
})();
