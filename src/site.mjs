// Public addresses and pagination shared by the app, generators and media checks.
export const SITE_URL = 'https://carpentry-liu.github.io/awesome-astra-3d/';
export const REPOSITORY_URL =
  'https://github.com/carpentry-liu/awesome-astra-3d';
export const PAGE_SIZE = 36;

export function assertCaseId(id) {
  if (typeof id !== 'string' || !/^[a-z0-9][a-z0-9-]*$/.test(id))
    throw new Error(`Unsafe case ID: ${id}`);
}
