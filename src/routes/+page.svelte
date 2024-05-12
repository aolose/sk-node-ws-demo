<script>
    import {onMount} from "svelte";
    import {io} from "socket.io-client";

    let value = ''
    let sys = ''
    /**@type {HTMLPreElement} */
    let pre;
    let message = ''
    let status = 'disconnect'
    /**@type {import('socket.io-client').Socket} */
    let socket
    let stat
    /**@param e {InputEvent}*/
    let send = function (e) {
        if (!value || status !== 'connected' || e.type === 'keydown' && e.key !== 'Enter') return
        socket.emit('hello', value)
        value = ''
    }

    const connect = () => {
        socket = io(`ws${location.origin.slice(4)}/hello`, {
            reconnectionDelayMax: 10000,
        });
        socket.on('connect', () => {
            status = 'connected'
        })
        socket.on('disconnect', () => {
            status = 'disconnect'
        })
        socket.on('sys', (data) => {
            sys = data
        })
        socket.on('echo', (data) => {
            message += `[${new Date().toLocaleTimeString()}] ${data}\n`
            setTimeout(() => {
                pre.scrollTo({
                    top: pre.scrollHeight,
                    behavior: 'smooth'
                })
            }, 100)
        })
        return () => {
            socket.disconnect()
        }
    }
    onMount(connect)
    const op = () => {
        window.open('/', '',
            `toolbar=no,
            location=no,
            status=no,
            menubar=no,
            scrollbars=no,
            resizable=yes,
            width=400,
            height=400`)
    }
</script>
<div class="box">
    <div class="h">
        <h1>Sveltekit(adapter-node) Websocket Demo</h1>
        <p>{sys} status:{status} </p>
    </div>
    <div class="msg">
        <pre bind:this={pre}>{`${message}`}</pre>
    </div>
    <div class="ipt">
        <button on:click={op}>OPEN NEW CHAT</button>
        <input bind:value={value} placeholder="Press Enter to send" on:keydown={send}>
    </div>
</div>

<style>
    * {
        min-height: 30px;
        padding: 10px;
        margin: 0;
        font-size: 13px;
        box-sizing: border-box;
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    }

    .h {
        padding: 0 10px
    }

    .h * {
        padding: 0 0 10px;
    }

    h1 {
        font-size: 14px;
        color: #fff;
    }

    div {
        display: flex;
    }

    p {
        flex: 1;
        text-align: right;
    }

    .ipt {
        padding: 10px 0;
    }

    input {
        color: greenyellow;
        flex: 1;
        margin-left: 5px;
        padding: 15px 20px;
        font-size: 16px;
    }

    input::placeholder {
        color: rgba(123, 255, 0, 0.51);
    }

    button {
        cursor: pointer;
        font-size: 12px;
        background: greenyellow;
        font-weight: 800;
    }

    input, .msg {
        background: rgba(255, 255, 255, 0.01);
        border: 1px solid rgba(124, 255, 2, 0.38);
    }

    .msg {
        flex: 1;
        padding: 0;
    }

    .box {
        position: absolute;
        flex-direction: column;
        align-content: center;
        justify-content: center;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #000000;
        color: greenyellow;
    }

    pre {
        max-height: 100%;
        overflow: auto;
        line-height: 2;
        width: 100%;
        padding: 20px;
        white-space: pre-wrap;
        align-self: flex-end;
        scrollbar-color: rgba(128, 128, 128, 0.32) rgba(169, 169, 169, 0.27);
        scrollbar-width: thin;
    }
</style>
