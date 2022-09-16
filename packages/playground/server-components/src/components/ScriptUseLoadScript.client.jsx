import {useLoadScript} from '@shopify/hydrogen/experimental';

export default function ScriptUseLoadScript({
  reload = false,
  load = 'afterHydration',
}) {
  // Load script as afterHydration in the <head />
  const status = useLoadScript({
    src: '/scripts/cdn?script=use-load-script.js',
    id: 'use-load-script',
    target: 'head',
    load,
    reload,
  });

  return (
    <div style={{marginTop: '1rem'}}>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'error' && <p>Error...</p>}
      {status === 'done' && (
        <div style={{border: '1px solid black', padding: '1rem'}}>
          <small>
            Injected by use-load-script.
            <br />
            target: <code>head</code>
            <br />
            reload: <code>{reload ? 'true' : 'false'}</code>
            <br />
            load: <code>{load}</code>
          </small>
          <h2 style={{color: 'orange'}}>
            Loaded use-load-script.js via {`useLoadScript({..})`} 🔥{' '}
          </h2>
        </div>
      )}
    </div>
  );
}