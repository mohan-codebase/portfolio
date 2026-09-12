/**
 * One requestAnimationFrame loop for the whole site. Smooth scrolling, the
 * cursor and the marquee all subscribe here, so each frame is computed once,
 * in a predictable order. The loop only runs while something is listening.
 */

export type FrameCallback = (time: number, delta: number) => void;

const callbacks = new Set<FrameCallback>();
let frame = 0;
let last = 0;

function loop(time: number) {
  // A tab coming back from the background reports a huge delta; clamp it so eased values never jump.
  const delta = last ? Math.min(time - last, 64) : 1000 / 60;
  last = time;
  callbacks.forEach((callback) => callback(time, delta));
  frame = callbacks.size ? requestAnimationFrame(loop) : 0;
  if (!frame) last = 0;
}

/** Subscribes to the shared frame loop and returns the unsubscribe function. */
export function onFrame(callback: FrameCallback) {
  callbacks.add(callback);
  if (!frame) frame = requestAnimationFrame(loop);
  return () => {
    callbacks.delete(callback);
  };
}

/**
 * Frame-rate independent easing towards a target. `factor` is tuned at 60 fps,
 * so motion feels the same on 120 Hz phones and 60 Hz laptops.
 */
export function approach(current: number, target: number, factor: number, delta: number) {
  return current + (target - current) * (1 - Math.pow(1 - factor, delta / (1000 / 60)));
}
