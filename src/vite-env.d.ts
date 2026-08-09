/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** URL canonique du site, sans slash final. Defaut : https://peakcl.com */
  readonly VITE_SITE_URL?: string;
}
