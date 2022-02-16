import handleRequest from './src/entry-server.jsx';
// eslint-disable-next-line node/no-missing-import
import indexHtml from './dist/client/index.html?raw';
import {getAssetFromKV} from '@cloudflare/kv-asset-handler';

// Mock Oxygen global
globalThis.Oxygen = {env: globalThis};

addEventListener('fetch', (event) => {
  try {
    event.respondWith(
      handleRequest(event.request, {
        indexTemplate: indexHtml,
        assetHandler,
        cache: caches.default,
        context: {
          waitUntil: event.waitUntil ? (p) => event.waitUntil(p) : undefined,
        },
      })
    );
  } catch (error) {
    event.respondWith(
      new Response(error.message || error.toString(), {
        status: 500,
      })
    );
  }

  async function assetHandler(url) {
    const response = await getAssetFromKV(event, {});

    if (response.status < 400) {
      const filename = url.pathname.split('/').pop();

      const maxAge =
        filename.split('.').length > 2
          ? 31536000 // hashed asset, will never be updated
          : 86400; // favico and other public assets

      response.headers.append('cache-control', `public, max-age=${maxAge}`);
    }

    return response;
  }
});
