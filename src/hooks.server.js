import {useServer} from "vite-sveltekit-node-ws";
import {Server} from 'socket.io'

const pools = new Set()

const msg = (c, s) => pools.forEach(a => a.emit(c, s))
const online = ()=> msg('sys', `online users:${pools.size}`);
useServer((server) => {
    const wsServer = new Server(server)
    wsServer.of('hello').on('connect', ws => {
        const user = `👽${Math.random().toString(36).slice(8)}`
        pools.add(ws)
        online()
        msg('echo', `${user} has joined the channel.`);
        ws.on('disconnect', () => {
            pools.delete(ws)
            online()
            msg('echo', `${user} has left the channel.`)
        });
        ws.on('hello', e => {
            msg('echo', `${user}: ${e}`)
        });
    });
}, (path) => /socket\.io|hello/.test(path))
