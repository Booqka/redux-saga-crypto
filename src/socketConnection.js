import { eventChannel } from 'redux-saga'
import {GETTED_CRYPTO} from "./actions/types";

export default function initWebsocket() {
    return eventChannel(emitter => {
        const ws = new WebSocket('wss://ws.coincap.io/prices?assets=bitcoin,ethereum,monero,litecoin');
        ws.onopen = () => {
            console.log('opening...');
        };
        ws.onerror = (error) => {
            console.log('WebSocket error ' + error);
            console.dir(error)
        };
        ws.onmessage = (e) => {
            let msg = null
            try {
                msg = JSON.parse(e.data)
            } catch(e) {
                console.error(`Error parsing : ${e.data}`)
            }
            if (msg) {
                return emitter({type: GETTED_CRYPTO, payload: msg })
            }
        };
        return () => {
            console.log('Socket off')
        }
    })
}