import {useServer} from "vite-sveltekit-node-ws";
import {Server} from 'socket.io'

useServer((server) => {
    const wsServer = new Server(server)
    wsServer.of('hello').on('connect', ws => {
        ws.on('hello', e => {
            ws.emit('echo', `echo: ${e}`)
        })
    })
})
