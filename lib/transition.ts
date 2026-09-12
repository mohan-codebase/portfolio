/**
 * Bridges links and the page-transition curtain without a React context: the
 * curtain registers a handler, and <TransitionLink> asks it to take over a
 * navigation. With no handler (before hydration, or with reduced motion),
 * links fall back to plain Next.js navigation.
 */

type Handler = (href: string) => boolean;

let handler: Handler | null = null;

export function setTransitionHandler(next: Handler | null) {
  handler = next;
}

/** Returns true when the curtain has taken over the navigation. */
export function startPageTransition(href: string) {
  return handler ? handler(href) : false;
}
