/**
 * Scroll position shared between the GSAP-driven page choreography and the R3F
 * render loop.
 *
 * Deliberately a mutable module singleton rather than React state: the 3D scene
 * reads it inside useFrame at 60fps, and routing that through React would cause
 * a re-render per frame.
 */
export const scrollState = {
  /** 0 at the top of the document, 1 at the bottom. */
  progress: 0,
  /** Index of the section currently filling the viewport. */
  sectionIndex: 0,
  /** Normalised scroll velocity, clamped to [-1, 1]. */
  velocity: 0,
  /** Pointer position in normalised device coords, for the cursor tilt. */
  pointerX: 0,
  pointerY: 0,
};

export type ScrollState = typeof scrollState;
