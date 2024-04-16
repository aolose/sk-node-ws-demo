<script>
    import {onMount} from "svelte";
    import {io} from "socket.io-client";

    let value = ''
    let message = ''
    let status = 'disconnect'
    /**@type {import('socket.io-client').Socket} */
    let socket
    let stat
    /**@param e {InputEvent|MouseEvent}*/
    let send = function (e) {
        if (!value || status !== 'connected' || e.type === 'keydown' && e.key !== 'Enter') return
        socket.emit('hello', value)
        value = ''
        e.target?.nextElementSibling.focus()
    }

    const connect = () => {
        socket = io(`ws${location.origin.slice(4)}/hello`, {
            reconnectionDelayMax: 10000,
        });
        socket.on('connect',()=>{
            status = 'connected'
        })
        socket.on('disconnect',()=>{
            status = 'disconnect'
        })
        socket.on('echo', (data) => {
            message = `${new Date().toLocaleTimeString()} ${data}\n` + message
        })
        return () => {
            socket.disconnect()
        }
    }
    onMount(connect)
</script>
<h1>Sveltekit Node Websocket Test</h1>
<div>
    <button on:click={send}>Press Enter to send</button>
    <input bind:value={value} on:keydown={send}>
</div>
<div class="msg">
    <pre>{`Client Status:[${status}]\n${message}`}</pre>
</div>

<style>
    * {
        min-height: 30px;
        padding: 10px 20px;
        margin: 0;
        box-sizing: border-box;
    }

    div {
        display: flex;
    }

    input {
        flex: 1;
        margin-left: 10px
    }

    pre {
        max-height: 500px;
        line-height: 2;
        width: 100%;
        background: #f0f0f0;
        border: 1px solid rgba(0, 0, 0, .2);
        white-space: pre;
        overflow: auto;
    }
</style>
