/**
 * DEAD CODE — intentionally emptied.
 *
 * Never imported, and would not have worked: it prefixed every path with
 * `/api/products` while the axios baseURL already ends in `/api`, producing
 * `/api/api/products`. It also typed two payloads as `any`. There is no
 * products page in this app yet — rewrite this against the real endpoint when
 * one is added rather than reviving it as-is.
 *
 * The file is kept as an empty module rather than deleted so that any stray
 * import fails loudly at the import site instead of resolving to stale UI.
 * Safe to delete outright once you have confirmed nothing references it.
 */

export {};
