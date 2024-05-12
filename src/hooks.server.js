import {useServer} from "vite-sveltekit-node-ws";
import {Server} from 'socket.io'

const pools = new Set()

const msg = s=>{
    pools.forEach((a,i)=>a.emit('echo',s))
}

useServer((server) => {
    const wsServer = new Server(server)
    wsServer.of('hello').on('connect', ws => {
        const user = `👾${Math.random().toString(36).slice(8)}`
        pools.add(ws)
        msg(`${user} has joined the channel. Current online: ${pools.size}`)
        ws.on('disconnect',()=>{
            pools.delete(ws)
            msg(`${user} has left the channel. Current online: ${pools.size}`)
        })
        ws.on('hello', e => {
            msg(`${user}: ${e}`)
        })
    })
},(path)=>/socket\.io|hello/.test(path))
