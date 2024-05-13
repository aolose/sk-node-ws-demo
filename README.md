
# sk-node-ws-demo

sveltekit + adapter-node + socket.io

![screenshot](screenshot.png)


 [try it on codesandbox.io](https://codesandbox.io/p/github/aolose/sk-node-ws-demo/main)


Very simple to use websockets at server side:

```js
import {useServer} from "vite-sveltekit-node-ws";
import {Server} from 'socket.io'

useServer((server) => {
    const wsServer = new Server(server)
    wsServer.of('hello').on('connect', ws => {
        ws.on('hello', e => {
            ws.emit('echo', `echo: ${e}`)
        })
    })
},(path)=>/socket\.io|hello/.test(path))
```

Client side:

```js
import {io} from "socket.io-client";
import {onMount} from "svelte";

onMount(()=>{
  io(`ws${location.origin.slice(4)}/hello`, {
      reconnectionDelayMax: 10000,
  });
});
```


You only need to configure the vite plugin：

```js
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import ws from 'vite-sveltekit-node-ws';

export default defineConfig({
	plugins: [sveltekit(),ws()]
});
```

### vite plugin [vite-sveltekit-node-ws](https://github.com/aolose/vite-sveltekit-node-ws)


### dev
```
pnpm run dev
```


### prev
```
pnpm run prev
```


### prod
```
pnpm run build
pnpm run prod
```
