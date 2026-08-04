/**
 * @deprecated Superseded by `./categoryKeys`.
 *
 * This module used to export a second, incompatible `categoryKeys` whose
 * `list()` took three positional arguments while callers passed a single
 * params object. `constants/index.ts` re-exported this file, so the object
 * hooks actually received was this one — hence "Expected 3 arguments, but
 * got 1". Re-exported here so nothing can bind to a divergent copy again.
 */
export * from "./categoryKeys";
