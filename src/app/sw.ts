import { defaultCache } from '@serwist/next/worker';
import type { PrecacheEntry, SerwistGlobalConfig } from 'serwist';
import { Serwist } from 'serwist';

// This declares the value of `injectionPoint` to TypeScript.
// `injectionPoint` is the string that will be replaced by the
// actual precache manifest. By default, this string is set to
// `"self.__SW_MANIFEST"`.
declare global {
    interface WorkerGlobalScope extends SerwistGlobalConfig {
        __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
    }
}

declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
    precacheEntries: self.__SW_MANIFEST,
    skipWaiting: true,
    clientsClaim: true,
    navigationPreload: true,
    runtimeCaching: defaultCache,
    
});

self.addEventListener('fetch', async (event: any) => {
    const DOMAIN = process.env.NEXT_PUBLIC_SITE_DOMAIN!;

    const EVENT = event;

    if (
        EVENT.request.url.includes('http://www.googletagmanager.com/gtag/js')
    ) {
        return true;
    }
    console.log("OUT: ", EVENT.request.url)
    return EVENT;
});

serwist.addEventListeners();
