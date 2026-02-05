/**
 * Utility for handling asset paths with basePath for GitHub Pages deployment.
 *
 * In static export mode, Next.js doesn't automatically prefix image src paths
 * with the basePath, so we need to handle this manually.
 */

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

/**
 * Returns the full path to an asset, including the basePath when deployed to GitHub Pages.
 * @param path - The path to the asset (should start with /)
 * @returns The full path including basePath
 */
export function getAssetPath(path: string): string {
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${basePath}${normalizedPath}`;
}
