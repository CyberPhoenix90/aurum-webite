/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/aurumjs/prebuilt/cjs/aurum_server/aurum_server_client.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/aurumjs/prebuilt/cjs/aurum_server/aurum_server_client.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.syncDuplexDataSource = exports.syncArrayDataSource = exports.syncDataSource = exports.syncMapDataSource = exports.syncObjectDataSource = exports.syncSetDataSource = exports.getRemoteFunction = exports.RemoteProtocol = void 0;
const cancellation_token_js_1 = __webpack_require__(/*! ../utilities/cancellation_token.js */ "./node_modules/aurumjs/prebuilt/cjs/utilities/cancellation_token.js");
var RemoteProtocol;
(function (RemoteProtocol) {
    RemoteProtocol[RemoteProtocol["HEARTBEAT"] = 0] = "HEARTBEAT";
    RemoteProtocol[RemoteProtocol["LISTEN_DATASOURCE"] = 1] = "LISTEN_DATASOURCE";
    RemoteProtocol[RemoteProtocol["LISTEN_DATASOURCE_ERR"] = 2] = "LISTEN_DATASOURCE_ERR";
    RemoteProtocol[RemoteProtocol["UPDATE_DATASOURCE"] = 3] = "UPDATE_DATASOURCE";
    RemoteProtocol[RemoteProtocol["UPDATE_DATASOURCE_ERR"] = 4] = "UPDATE_DATASOURCE_ERR";
    RemoteProtocol[RemoteProtocol["CANCEL_DATASOURCE"] = 5] = "CANCEL_DATASOURCE";
    RemoteProtocol[RemoteProtocol["PERFORM_RPC"] = 6] = "PERFORM_RPC";
    RemoteProtocol[RemoteProtocol["PERFORM_RPC_ERR"] = 7] = "PERFORM_RPC_ERR";
    RemoteProtocol[RemoteProtocol["PERFORM_RPC_RESULT"] = 8] = "PERFORM_RPC_RESULT";
    RemoteProtocol[RemoteProtocol["PERFORM_RPC_RESULT_ERR"] = 9] = "PERFORM_RPC_RESULT_ERR";
    RemoteProtocol[RemoteProtocol["LISTEN_DUPLEX_DATASOURCE_ERR"] = 10] = "LISTEN_DUPLEX_DATASOURCE_ERR";
    RemoteProtocol[RemoteProtocol["LISTEN_DUPLEX_DATASOURCE"] = 11] = "LISTEN_DUPLEX_DATASOURCE";
    RemoteProtocol[RemoteProtocol["UPDATE_DUPLEX_DATASOURCE"] = 12] = "UPDATE_DUPLEX_DATASOURCE";
    RemoteProtocol[RemoteProtocol["UPDATE_DUPLEX_DATASOURCE_ERR"] = 13] = "UPDATE_DUPLEX_DATASOURCE_ERR";
    RemoteProtocol[RemoteProtocol["CANCEL_DUPLEX_DATASOURCE"] = 14] = "CANCEL_DUPLEX_DATASOURCE";
    RemoteProtocol[RemoteProtocol["LISTEN_ARRAY_DATASOURCE"] = 15] = "LISTEN_ARRAY_DATASOURCE";
    RemoteProtocol[RemoteProtocol["LISTEN_ARRAY_DATASOURCE_ERR"] = 16] = "LISTEN_ARRAY_DATASOURCE_ERR";
    RemoteProtocol[RemoteProtocol["UPDATE_ARRAY_DATASOURCE"] = 17] = "UPDATE_ARRAY_DATASOURCE";
    RemoteProtocol[RemoteProtocol["UPDATE_ARRAY_DATASOURCE_ERR"] = 18] = "UPDATE_ARRAY_DATASOURCE_ERR";
    RemoteProtocol[RemoteProtocol["CANCEL_ARRAY_DATASOURCE"] = 19] = "CANCEL_ARRAY_DATASOURCE";
    RemoteProtocol[RemoteProtocol["LISTEN_MAP_DATASOURCE"] = 20] = "LISTEN_MAP_DATASOURCE";
    RemoteProtocol[RemoteProtocol["LISTEN_MAP_DATASOURCE_ERR"] = 21] = "LISTEN_MAP_DATASOURCE_ERR";
    RemoteProtocol[RemoteProtocol["UPDATE_MAP_DATASOURCE"] = 22] = "UPDATE_MAP_DATASOURCE";
    RemoteProtocol[RemoteProtocol["UPDATE_MAP_DATASOURCE_ERR"] = 23] = "UPDATE_MAP_DATASOURCE_ERR";
    RemoteProtocol[RemoteProtocol["CANCEL_MAP_DATASOURCE"] = 24] = "CANCEL_MAP_DATASOURCE";
    RemoteProtocol[RemoteProtocol["LISTEN_OBJECT_DATASOURCE"] = 25] = "LISTEN_OBJECT_DATASOURCE";
    RemoteProtocol[RemoteProtocol["LISTEN_OBJECT_DATASOURCE_ERR"] = 26] = "LISTEN_OBJECT_DATASOURCE_ERR";
    RemoteProtocol[RemoteProtocol["UPDATE_OBJECT_DATASOURCE"] = 27] = "UPDATE_OBJECT_DATASOURCE";
    RemoteProtocol[RemoteProtocol["UPDATE_OBJECT_DATASOURCE_ERR"] = 28] = "UPDATE_OBJECT_DATASOURCE_ERR";
    RemoteProtocol[RemoteProtocol["CANCEL_OBJECT_DATASOURCE"] = 29] = "CANCEL_OBJECT_DATASOURCE";
    RemoteProtocol[RemoteProtocol["LISTEN_SET_DATASOURCE"] = 30] = "LISTEN_SET_DATASOURCE";
    RemoteProtocol[RemoteProtocol["LISTEN_SET_DATASOURCE_ERR"] = 31] = "LISTEN_SET_DATASOURCE_ERR";
    RemoteProtocol[RemoteProtocol["UPDATE_SET_DATASOURCE"] = 32] = "UPDATE_SET_DATASOURCE";
    RemoteProtocol[RemoteProtocol["UPDATE_SET_DATASOURCE_ERR"] = 33] = "UPDATE_SET_DATASOURCE_ERR";
    RemoteProtocol[RemoteProtocol["CANCEL_SET_DATASOURCE"] = 34] = "CANCEL_SET_DATASOURCE";
})(RemoteProtocol = exports.RemoteProtocol || (exports.RemoteProtocol = {}));
const pendingRPCResponses = new Map();
function getRemoteFunction(aurumServerInfo, cancellation) {
    return syncFunction(aurumServerInfo, cancellation);
}
exports.getRemoteFunction = getRemoteFunction;
function syncFunction(aurumServerInfo, cancellation) {
    const key = makeKey(aurumServerInfo.protocol, aurumServerInfo.host);
    return async (input) => {
        await ensureConnection(key, aurumServerInfo.protocol, aurumServerInfo.host);
        return new Promise((resolve, reject) => {
            const client = connections.get(key);
            if (!client) {
                throw new Error('Client not connected');
            }
            return client.performRPC(input, aurumServerInfo.id, aurumServerInfo.authenticationToken, cancellation).then(resolve, reject);
        });
    };
}
async function syncSetDataSource(source, aurumServerInfo, cancellation) {
    const key = makeKey(aurumServerInfo.protocol, aurumServerInfo.host);
    await ensureConnection(key, aurumServerInfo.protocol, aurumServerInfo.host);
    connections.get(key).syncSetDataSource(source, aurumServerInfo.id, aurumServerInfo.authenticationToken, cancellation);
}
exports.syncSetDataSource = syncSetDataSource;
async function syncObjectDataSource(source, aurumServerInfo, cancellation) {
    const key = makeKey(aurumServerInfo.protocol, aurumServerInfo.host);
    await ensureConnection(key, aurumServerInfo.protocol, aurumServerInfo.host);
    connections.get(key).syncObjectDataSource(source, aurumServerInfo.id, aurumServerInfo.authenticationToken, cancellation);
}
exports.syncObjectDataSource = syncObjectDataSource;
async function syncMapDataSource(source, aurumServerInfo, cancellation) {
    const key = makeKey(aurumServerInfo.protocol, aurumServerInfo.host);
    await ensureConnection(key, aurumServerInfo.protocol, aurumServerInfo.host);
    connections.get(key).syncMapDataSource(source, aurumServerInfo.id, aurumServerInfo.authenticationToken, cancellation);
}
exports.syncMapDataSource = syncMapDataSource;
async function syncDataSource(source, aurumServerInfo, cancellation) {
    const key = makeKey(aurumServerInfo.protocol, aurumServerInfo.host);
    await ensureConnection(key, aurumServerInfo.protocol, aurumServerInfo.host);
    connections.get(key).syncDataSource(source, aurumServerInfo.id, aurumServerInfo.authenticationToken, cancellation);
}
exports.syncDataSource = syncDataSource;
function makeKey(protocol, host) {
    return `${resolveProtocol(protocol)}://${resolveHost(host)}`;
}
async function syncArrayDataSource(source, aurumServerInfo, cancellation) {
    const key = makeKey(aurumServerInfo.protocol, aurumServerInfo.host);
    await ensureConnection(key, aurumServerInfo.protocol, aurumServerInfo.host);
    connections.get(key).syncArrayDataSource(source, aurumServerInfo.id, aurumServerInfo.authenticationToken, cancellation);
}
exports.syncArrayDataSource = syncArrayDataSource;
async function syncDuplexDataSource(source, aurumServerInfo, cancellation) {
    const key = makeKey(aurumServerInfo.protocol, aurumServerInfo.host);
    await ensureConnection(key, aurumServerInfo.protocol, aurumServerInfo.host);
    connections.get(key).syncDuplexDataSource(source, aurumServerInfo.id, aurumServerInfo.authenticationToken, cancellation);
}
exports.syncDuplexDataSource = syncDuplexDataSource;
const connections = new Map();
const pendingConnections = new Map();
class AurumServerClient {
    constructor(connection) {
        this.masterToken = new cancellation_token_js_1.CancellationToken();
        this.connection = connection;
        this.synchedDataSources = new Map();
        this.synchedDuplexDataSources = new Map();
        this.synchedArrayDataSources = new Map();
        this.synchedMapDataSources = new Map();
        this.synchedObjectDataSources = new Map();
        this.synchedSetDataSources = new Map();
    }
    syncDataSource(source, id, authenticationToken, cancellation) {
        this.syncSource(cancellation, id, authenticationToken, source, this.synchedDataSources, RemoteProtocol.LISTEN_DATASOURCE, RemoteProtocol.CANCEL_DATASOURCE);
    }
    syncObjectDataSource(source, id, authenticationToken, cancellation) {
        this.syncSource(cancellation, id, authenticationToken, source, this.synchedObjectDataSources, RemoteProtocol.LISTEN_OBJECT_DATASOURCE, RemoteProtocol.CANCEL_OBJECT_DATASOURCE);
    }
    performRPC(input, endpointId, authenticationToken, cancellation) {
        return new Promise((resolve, reject) => {
            const uuid = Math.random().toString();
            pendingRPCResponses.set(uuid, { resolve, reject });
            this.connection.send(JSON.stringify({
                type: RemoteProtocol.PERFORM_RPC,
                token: authenticationToken,
                id: endpointId,
                value: input,
                uuid
            }));
        });
    }
    syncSetDataSource(source, id, authenticationToken, cancellation) {
        this.syncSource(cancellation, id, authenticationToken, source, this.synchedSetDataSources, RemoteProtocol.LISTEN_SET_DATASOURCE, RemoteProtocol.CANCEL_SET_DATASOURCE);
    }
    syncMapDataSource(source, id, authenticationToken, cancellation) {
        this.syncSource(cancellation, id, authenticationToken, source, this.synchedMapDataSources, RemoteProtocol.LISTEN_MAP_DATASOURCE, RemoteProtocol.CANCEL_MAP_DATASOURCE);
    }
    syncArrayDataSource(source, id, authenticationToken, cancellation) {
        this.syncSource(cancellation, id, authenticationToken, source, this.synchedArrayDataSources, RemoteProtocol.LISTEN_ARRAY_DATASOURCE, RemoteProtocol.CANCEL_ARRAY_DATASOURCE);
    }
    syncDuplexDataSource(source, id, authenticationToken, cancellation) {
        this.syncSource(cancellation, id, authenticationToken, source, this.synchedDuplexDataSources, RemoteProtocol.LISTEN_DUPLEX_DATASOURCE, RemoteProtocol.CANCEL_DUPLEX_DATASOURCE);
        source.listenUpstream((v) => {
            this.connection.send(JSON.stringify({
                type: RemoteProtocol.UPDATE_DUPLEX_DATASOURCE,
                token: authenticationToken,
                value: v,
                id
            }));
        }, cancellation_token_js_1.CancellationToken.fromMultiple([cancellation, this.masterToken]));
    }
    syncSource(cancellation, id, authenticationToken, source, syncedSources, listenMessage, cancelMessage) {
        cancellation.addCancelable(() => {
            const listenersByAuth = syncedSources.get(id);
            const listeners = listenersByAuth.get(authenticationToken);
            listeners.listeners.splice(listeners.listeners.findIndex((s) => s.source === source));
            if (listeners.listeners.length === 0) {
                listenersByAuth.delete(authenticationToken);
                listeners.source.cancelAll();
                this.connection.send(JSON.stringify({
                    type: cancelMessage,
                    id,
                    token: authenticationToken
                }));
            }
        });
        if (!syncedSources.has(id)) {
            syncedSources.set(id, new Map());
        }
        if (!syncedSources.get(id).has(authenticationToken)) {
            this.connection.send(JSON.stringify({
                type: listenMessage,
                id,
                token: authenticationToken
            }));
            syncedSources.get(id).set(authenticationToken, { source, listeners: [] });
        }
        syncedSources.get(id).get(authenticationToken).listeners.push({
            source,
            token: cancellation
        });
    }
    static connect(host, protocol) {
        let pendingToken = new cancellation_token_js_1.CancellationToken();
        let started = false;
        let latency = [0, 0, 0, 0, 0];
        let cycle = 0;
        let latencyTs;
        let lastBeat;
        return new Promise((resolve, reject) => {
            protocol = resolveProtocol(protocol);
            host = resolveHost(host);
            const connection = new WebSocket(`${protocol}://${host}`);
            const client = new AurumServerClient(connection);
            client.masterToken.addCancelable(() => {
                connections.delete(makeKey(protocol, host));
            });
            pendingToken.setTimeout(() => {
                connection.close(4001, 'no response');
                reject();
                client.masterToken.cancel();
            }, 5000);
            connection.addEventListener('message', (m) => {
                lastBeat = Date.now();
                try {
                    const msg = JSON.parse(m.data);
                    switch (msg.type) {
                        case RemoteProtocol.HEARTBEAT:
                            latency[cycle] = Date.now() - latencyTs;
                            if ((cycle + 1) % latency.length === 0) {
                                console.log(`AurumServer latency: ${(latency.reduce((p, c) => p + c) / latency.length).toFixed(1)}ms`);
                                cycle = 0;
                            }
                            else {
                                cycle++;
                            }
                            break;
                        case RemoteProtocol.PERFORM_RPC_RESULT_ERR:
                        case RemoteProtocol.PERFORM_RPC_ERR:
                            pendingRPCResponses.get(msg.uuid).reject(new Error(msg.error));
                            pendingRPCResponses.delete(msg.uuid);
                            break;
                        case RemoteProtocol.PERFORM_RPC_RESULT:
                            pendingRPCResponses.get(msg.uuid).resolve(msg.result);
                            pendingRPCResponses.delete(msg.uuid);
                            break;
                        case RemoteProtocol.UPDATE_DATASOURCE:
                            if (client.synchedDataSources.has(msg.id)) {
                                const byAuth = client.synchedDataSources.get(msg.id);
                                for (const dss of byAuth.values()) {
                                    dss.source.update(msg.value);
                                }
                            }
                            break;
                        case RemoteProtocol.UPDATE_ARRAY_DATASOURCE:
                            if (client.synchedArrayDataSources.has(msg.id)) {
                                const byAuth = client.synchedArrayDataSources.get(msg.id);
                                for (const dss of byAuth.values()) {
                                    const change = msg.change;
                                    dss.source.applyCollectionChange(change);
                                }
                            }
                            break;
                        case RemoteProtocol.UPDATE_DUPLEX_DATASOURCE:
                            if (client.synchedDuplexDataSources.has(msg.id)) {
                                const byAuth = client.synchedDuplexDataSources.get(msg.id);
                                for (const dss of byAuth.values()) {
                                    dss.source.updateDownstream(msg.value);
                                }
                            }
                            break;
                        case RemoteProtocol.UPDATE_MAP_DATASOURCE:
                            if (client.synchedMapDataSources.has(msg.id)) {
                                const byAuth = client.synchedMapDataSources.get(msg.id);
                                for (const dss of byAuth.values()) {
                                    dss.source.applyMapChange(msg.change);
                                }
                            }
                            break;
                    }
                }
                catch (e) {
                    console.warn('Recieved malformed message from server');
                    console.warn(e);
                }
            });
            connection.addEventListener('error', (e) => {
                client.masterToken.cancel();
                reject(e);
            });
            connection.addEventListener('open', () => {
                pendingToken.cancel();
                pendingToken = undefined;
                started = true;
                lastBeat = Date.now();
                client.masterToken.setInterval(() => {
                    if (Date.now() - lastBeat > 10000) {
                        connection.close(4000, 'timeout');
                        return;
                    }
                    latencyTs = Date.now();
                    connection.send(JSON.stringify({
                        type: RemoteProtocol.HEARTBEAT
                    }));
                }, 2500);
                resolve(client);
            });
            connection.addEventListener('close', () => {
                client.masterToken.cancel();
                if (started) {
                    ensureConnection(makeKey(protocol, host), protocol, host).then((newClient) => {
                        newClient.migrate(client);
                    });
                }
                else {
                    reject();
                }
            });
        });
    }
    migrate(client) {
        for (const id of client.synchedDataSources.keys()) {
            for (const auth of client.synchedDataSources.get(id).keys()) {
                for (const { source, token } of client.synchedDataSources.get(id).get(auth).listeners) {
                    this.syncDataSource(source, id, auth, token);
                }
            }
        }
        for (const id of client.synchedArrayDataSources.keys()) {
            for (const auth of client.synchedArrayDataSources.get(id).keys()) {
                for (const { source, token } of client.synchedArrayDataSources.get(id).get(auth).listeners) {
                    this.syncArrayDataSource(source, id, auth, token);
                }
            }
        }
        for (const id of client.synchedDuplexDataSources.keys()) {
            for (const auth of client.synchedDuplexDataSources.get(id).keys()) {
                for (const { source, token } of client.synchedDuplexDataSources.get(id).get(auth).listeners) {
                    this.syncDuplexDataSource(source, id, auth, token);
                }
            }
        }
        for (const id of client.synchedMapDataSources.keys()) {
            for (const auth of client.synchedMapDataSources.get(id).keys()) {
                for (const { source, token } of client.synchedMapDataSources.get(id).get(auth).listeners) {
                    this.syncMapDataSource(source, id, auth, token);
                }
            }
        }
        for (const id of client.synchedObjectDataSources.keys()) {
            for (const auth of client.synchedObjectDataSources.get(id).keys()) {
                for (const { source, token } of client.synchedObjectDataSources.get(id).get(auth).listeners) {
                    this.syncObjectDataSource(source, id, auth, token);
                }
            }
        }
        for (const id of client.synchedSetDataSources.keys()) {
            for (const auth of client.synchedSetDataSources.get(id).keys()) {
                for (const { source, token } of client.synchedSetDataSources.get(id).get(auth).listeners) {
                    this.syncSetDataSource(source, id, auth, token);
                }
            }
        }
        this.synchedDataSources = new Map();
        this.synchedDuplexDataSources = new Map();
        this.synchedArrayDataSources = new Map();
        this.synchedMapDataSources = new Map();
        this.synchedObjectDataSources = new Map();
        this.synchedSetDataSources = new Map();
    }
}
function resolveProtocol(protocol) {
    if (!protocol) {
        if (typeof location === 'undefined') {
            throw new Error('Protocol is not optional in non browser environments');
        }
        if (location.protocol.startsWith('https')) {
            protocol = 'wss';
        }
        else {
            protocol = 'ws';
        }
    }
    return protocol;
}
function resolveHost(host) {
    if (!host) {
        if (typeof location === 'undefined') {
            throw new Error('Host is not optional in non browser environments');
        }
        return location.host;
    }
    return host;
}
async function ensureConnection(key, protocol, host) {
    if (connections.has(key)) {
        return connections.get(key);
    }
    let backoff = 1000;
    if (pendingConnections.has(key)) {
        return pendingConnections.get(key);
    }
    else {
        const pendingConnection = new Promise((resolve) => {
            async function tryConnect() {
                const p = AurumServerClient.connect(host, protocol);
                try {
                    const client = await p;
                    connections.set(key, client);
                    pendingConnections.delete(key);
                    resolve(client);
                    backoff = 1000;
                }
                catch (e) {
                    setTimeout(() => {
                        backoff += 1000;
                        tryConnect();
                    }, backoff);
                }
            }
            tryConnect();
        });
        pendingConnections.set(key, pendingConnection);
        return pendingConnection;
    }
}
//# sourceMappingURL=aurum_server_client.js.map

/***/ }),

/***/ "./node_modules/aurumjs/prebuilt/cjs/aurumjs.js":
/*!******************************************************!*\
  !*** ./node_modules/aurumjs/prebuilt/cjs/aurumjs.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getRemoteFunction = exports.RemoteProtocol = exports.enableDiagnosticMode = exports.enableDebugMode = exports.debugMode = exports.aurumToHTML = exports.aurumElementModelIdentitiy = exports.AurumElement = exports.createRenderSession = exports.createLifeCycle = exports.createAPI = exports.ArrayAurumElement = exports.SingularAurumElement = void 0;
__exportStar(__webpack_require__(/*! ./rendering/webcomponent.js */ "./node_modules/aurumjs/prebuilt/cjs/rendering/webcomponent.js"), exports);
var aurum_element_js_1 = __webpack_require__(/*! ./rendering/aurum_element.js */ "./node_modules/aurumjs/prebuilt/cjs/rendering/aurum_element.js");
Object.defineProperty(exports, "SingularAurumElement", ({ enumerable: true, get: function () { return aurum_element_js_1.SingularAurumElement; } }));
Object.defineProperty(exports, "ArrayAurumElement", ({ enumerable: true, get: function () { return aurum_element_js_1.ArrayAurumElement; } }));
Object.defineProperty(exports, "createAPI", ({ enumerable: true, get: function () { return aurum_element_js_1.createAPI; } }));
Object.defineProperty(exports, "createLifeCycle", ({ enumerable: true, get: function () { return aurum_element_js_1.createLifeCycle; } }));
Object.defineProperty(exports, "createRenderSession", ({ enumerable: true, get: function () { return aurum_element_js_1.createRenderSession; } }));
Object.defineProperty(exports, "AurumElement", ({ enumerable: true, get: function () { return aurum_element_js_1.AurumElement; } }));
Object.defineProperty(exports, "aurumElementModelIdentitiy", ({ enumerable: true, get: function () { return aurum_element_js_1.aurumElementModelIdentitiy; } }));
__exportStar(__webpack_require__(/*! ./rendering/aurum_style.js */ "./node_modules/aurumjs/prebuilt/cjs/rendering/aurum_style.js"), exports);
__exportStar(__webpack_require__(/*! ./builtin_components/router.js */ "./node_modules/aurumjs/prebuilt/cjs/builtin_components/router.js"), exports);
__exportStar(__webpack_require__(/*! ./builtin_components/suspense.js */ "./node_modules/aurumjs/prebuilt/cjs/builtin_components/suspense.js"), exports);
__exportStar(__webpack_require__(/*! ./builtin_components/error_boundary.js */ "./node_modules/aurumjs/prebuilt/cjs/builtin_components/error_boundary.js"), exports);
__exportStar(__webpack_require__(/*! ./builtin_components/switch.js */ "./node_modules/aurumjs/prebuilt/cjs/builtin_components/switch.js"), exports);
__exportStar(__webpack_require__(/*! ./stream/data_source.js */ "./node_modules/aurumjs/prebuilt/cjs/stream/data_source.js"), exports);
__exportStar(__webpack_require__(/*! ./stream/duplex_data_source.js */ "./node_modules/aurumjs/prebuilt/cjs/stream/duplex_data_source.js"), exports);
__exportStar(__webpack_require__(/*! ./stream/object_data_source.js */ "./node_modules/aurumjs/prebuilt/cjs/stream/object_data_source.js"), exports);
__exportStar(__webpack_require__(/*! ./stream/tree_data_source.js */ "./node_modules/aurumjs/prebuilt/cjs/stream/tree_data_source.js"), exports);
__exportStar(__webpack_require__(/*! ./stream/data_source_operators.js */ "./node_modules/aurumjs/prebuilt/cjs/stream/data_source_operators.js"), exports);
__exportStar(__webpack_require__(/*! ./stream/duplex_data_source_operators.js */ "./node_modules/aurumjs/prebuilt/cjs/stream/duplex_data_source_operators.js"), exports);
__exportStar(__webpack_require__(/*! ./stream/operator_model.js */ "./node_modules/aurumjs/prebuilt/cjs/stream/operator_model.js"), exports);
__exportStar(__webpack_require__(/*! ./stream/stream.js */ "./node_modules/aurumjs/prebuilt/cjs/stream/stream.js"), exports);
__exportStar(__webpack_require__(/*! ./utilities/aurum.js */ "./node_modules/aurumjs/prebuilt/cjs/utilities/aurum.js"), exports);
__exportStar(__webpack_require__(/*! ./utilities/cancellation_token.js */ "./node_modules/aurumjs/prebuilt/cjs/utilities/cancellation_token.js"), exports);
__exportStar(__webpack_require__(/*! ./utilities/event_emitter.js */ "./node_modules/aurumjs/prebuilt/cjs/utilities/event_emitter.js"), exports);
__exportStar(__webpack_require__(/*! ./utilities/classname.js */ "./node_modules/aurumjs/prebuilt/cjs/utilities/classname.js"), exports);
__exportStar(__webpack_require__(/*! ./utilities/sources.js */ "./node_modules/aurumjs/prebuilt/cjs/utilities/sources.js"), exports);
__exportStar(__webpack_require__(/*! ./stream/emitters.js */ "./node_modules/aurumjs/prebuilt/cjs/stream/emitters.js"), exports);
__exportStar(__webpack_require__(/*! ./nodes/string_adapter.js */ "./node_modules/aurumjs/prebuilt/cjs/nodes/string_adapter.js"), exports);
__exportStar(__webpack_require__(/*! ./utilities/transclusion.js */ "./node_modules/aurumjs/prebuilt/cjs/utilities/transclusion.js"), exports);
var dom_adapter_js_1 = __webpack_require__(/*! ./builtin_components/dom_adapter.js */ "./node_modules/aurumjs/prebuilt/cjs/builtin_components/dom_adapter.js");
Object.defineProperty(exports, "aurumToHTML", ({ enumerable: true, get: function () { return dom_adapter_js_1.aurumToHTML; } }));
var debug_mode_js_1 = __webpack_require__(/*! ./debug_mode.js */ "./node_modules/aurumjs/prebuilt/cjs/debug_mode.js");
Object.defineProperty(exports, "debugMode", ({ enumerable: true, get: function () { return debug_mode_js_1.debugMode; } }));
Object.defineProperty(exports, "enableDebugMode", ({ enumerable: true, get: function () { return debug_mode_js_1.enableDebugMode; } }));
Object.defineProperty(exports, "enableDiagnosticMode", ({ enumerable: true, get: function () { return debug_mode_js_1.enableDiagnosticMode; } }));
var aurum_server_client_js_1 = __webpack_require__(/*! ./aurum_server/aurum_server_client.js */ "./node_modules/aurumjs/prebuilt/cjs/aurum_server/aurum_server_client.js");
Object.defineProperty(exports, "RemoteProtocol", ({ enumerable: true, get: function () { return aurum_server_client_js_1.RemoteProtocol; } }));
Object.defineProperty(exports, "getRemoteFunction", ({ enumerable: true, get: function () { return aurum_server_client_js_1.getRemoteFunction; } }));
//# sourceMappingURL=aurumjs.js.map

/***/ }),

/***/ "./node_modules/aurumjs/prebuilt/cjs/builtin_components/dom_adapter.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/aurumjs/prebuilt/cjs/builtin_components/dom_adapter.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.aurumToHTML = exports.createEventHandlers = exports.processHTMLNode = exports.DomNodeCreator = exports.defaultAttributes = exports.defaultEvents = void 0;
const data_source_js_1 = __webpack_require__(/*! ../stream/data_source.js */ "./node_modules/aurumjs/prebuilt/cjs/stream/data_source.js");
const duplex_data_source_js_1 = __webpack_require__(/*! ../stream/duplex_data_source.js */ "./node_modules/aurumjs/prebuilt/cjs/stream/duplex_data_source.js");
const aurum_element_js_1 = __webpack_require__(/*! ../rendering/aurum_element.js */ "./node_modules/aurumjs/prebuilt/cjs/rendering/aurum_element.js");
const data_source_operators_js_1 = __webpack_require__(/*! ../stream/data_source_operators.js */ "./node_modules/aurumjs/prebuilt/cjs/stream/data_source_operators.js");
/**
 * @internal
 */
exports.defaultEvents = {
    drag: 'onDrag',
    dragstart: 'onDragStart',
    dragend: 'onDragEnd',
    dragexit: 'onDragExit',
    dragover: 'onDragOver',
    dragenter: 'onDragEnter',
    dragleave: 'onDragLeave',
    drop: 'onDrop',
    blur: 'onBlur',
    focus: 'onFocus',
    click: 'onClick',
    dblclick: 'onDblClick',
    keydown: 'onKeyDown',
    keyhit: 'onKeyHit',
    keyup: 'onKeyUp',
    contextmenu: 'onContextMenu',
    mousedown: 'onMouseDown',
    mouseup: 'onMouseUp',
    mousemove: 'onMouseMove',
    mouseenter: 'onMouseEnter',
    mouseleave: 'onMouseLeave',
    mousewheel: 'onMouseWheel',
    load: 'onLoad',
    error: 'onError'
};
/**
 * @internal
 */
exports.defaultAttributes = ['id', 'name', 'draggable', 'tabindex', 'style', 'role', 'contenteditable', 'slot', 'title'];
function DomNodeCreator(nodeName, extraAttributes, extraEvents, extraLogic) {
    return function (props, children, api) {
        const node = document.createElement(nodeName);
        if (props) {
            processHTMLNode(node, props, api.cancellationToken, extraAttributes, extraEvents);
        }
        //@ts-ignore
        const renderedChildren = (0, aurum_element_js_1.renderInternal)(children, api.renderSession);
        connectChildren(node, renderedChildren);
        if (props) {
            if (props.onAttach) {
                api.onAttach(() => props.onAttach(node));
            }
            if (props.onDetach) {
                api.onDetach(() => {
                    if (node.isConnected) {
                        node.parentElement.removeChild(node);
                    }
                    props.onDetach(node);
                });
            }
        }
        extraLogic === null || extraLogic === void 0 ? void 0 : extraLogic(node, props, api.cancellationToken);
        return node;
    };
}
exports.DomNodeCreator = DomNodeCreator;
function connectChildren(target, children) {
    if (children === undefined || children === null || children.length === 0) {
        return;
    }
    for (const child of children) {
        if (!child) {
            continue;
        }
        if (child instanceof Text || child instanceof HTMLElement) {
            target.appendChild(child);
        }
        else if (child instanceof aurum_element_js_1.AurumElement) {
            child.attachToDom(target, target.childNodes.length);
        }
        else {
            throw new Error(`Unexpected child type passed to DOM Node: ${children}`);
        }
    }
}
function processHTMLNode(node, props, cleanUp, extraAttributes, extraEvents) {
    createEventHandlers(node, exports.defaultEvents, props);
    if (extraEvents) {
        createEventHandlers(node, extraEvents, props);
    }
    const dataProps = Object.keys(props).filter((e) => e.includes('-'));
    bindProps(node, exports.defaultAttributes, props, cleanUp, dataProps);
    if (extraAttributes) {
        bindProps(node, extraAttributes, props, cleanUp);
    }
    if (props.class) {
        handleClass(node, props.class, cleanUp);
    }
}
exports.processHTMLNode = processHTMLNode;
function createEventHandlers(node, events, props) {
    for (const key in events) {
        if (props[events[key]]) {
            if (props[events[key]] instanceof data_source_js_1.DataSource) {
                //@ts-ignore
                node.addEventListener(key, (e) => props[events[key]].update(e));
            }
            else if (props[events[key]] instanceof duplex_data_source_js_1.DuplexDataSource) {
                //@ts-ignore
                node.addEventListener(key, (e) => props[events[key]].updateDownstream(e));
            }
            else if (typeof props[events[key]] === 'function') {
                //@ts-ignore
                node.addEventListener(key, (e) => props[events[key]](e));
            }
        }
    }
}
exports.createEventHandlers = createEventHandlers;
function bindProps(node, keys, props, cleanUp, dynamicProps) {
    for (const key of keys) {
        if (props[key]) {
            assignStringSourceToAttribute(node, props[key], key, cleanUp);
        }
    }
    if (dynamicProps) {
        for (const key of dynamicProps) {
            if (props[key]) {
                assignStringSourceToAttribute(node, props[key], key, cleanUp);
            }
        }
    }
}
/**
 * Renders Aurum content synchronously in line.
 * @param content Content to render
 */
function aurumToHTML(content) {
    const rs = (0, aurum_element_js_1.createRenderSession)();
    const renderedContent = (0, aurum_element_js_1.renderInternal)(content, rs);
    return {
        content: renderedContent,
        fireOnAttach: () => rs.attachCalls.forEach((c) => c()),
        dispose: () => rs.sessionToken.cancel()
    };
}
exports.aurumToHTML = aurumToHTML;
function assignStringSourceToAttribute(node, data, key, cleanUp) {
    if (typeof data === 'string') {
        node.setAttribute(key, data);
    }
    else if (typeof data === 'boolean') {
        if (data) {
            node.setAttribute(key, '');
        }
    }
    else if (data instanceof data_source_js_1.DataSource || data instanceof duplex_data_source_js_1.DuplexDataSource) {
        if (typeof data.value === 'string') {
            node.setAttribute(key, data.value);
        }
        else if (typeof data.value === 'boolean') {
            if (data.value) {
                node.setAttribute(key, '');
            }
        }
        data.transform((0, data_source_operators_js_1.dsUnique)(), cleanUp).listen((v) => {
            if (typeof v === 'string') {
                node.setAttribute(key, v);
            }
            else if (typeof v === 'boolean') {
                if (v) {
                    node.setAttribute(key, '');
                }
                else {
                    node.removeAttribute(key);
                }
            }
        });
    }
    else {
        throw new Error('Attributes only support types boolean, string, number and data sources');
    }
}
function handleClass(node, data, cleanUp) {
    if (typeof data === 'string') {
        node.className = data;
    }
    else if (data instanceof data_source_js_1.DataSource || data instanceof duplex_data_source_js_1.DuplexDataSource) {
        data.transform((0, data_source_operators_js_1.dsUnique)(), cleanUp)
            .withInitial(data.value)
            .listenAndRepeat((v) => {
            if (Array.isArray(v)) {
                node.className = v.join(' ');
            }
            else {
                node.className = v;
            }
        });
    }
    else {
        const value = data.reduce((p, c) => {
            if (!c) {
                return p;
            }
            if (typeof c === 'string') {
                return `${p} ${c}`;
            }
            else {
                if (c.value) {
                    return `${p} ${c.value}`;
                }
                else {
                    return p;
                }
            }
        }, '');
        node.className = value;
        for (const i of data) {
            if (i instanceof data_source_js_1.DataSource) {
                i.transform((0, data_source_operators_js_1.dsUnique)(), cleanUp).listen((v) => {
                    const value = data.reduce((p, c) => {
                        if (typeof c === 'string') {
                            return `${p} ${c}`;
                        }
                        else {
                            if (c.value) {
                                return `${p} ${c.value}`;
                            }
                            else {
                                return p;
                            }
                        }
                    }, '');
                    node.className = value;
                });
            }
        }
    }
}
//# sourceMappingURL=dom_adapter.js.map

/***/ }),

/***/ "./node_modules/aurumjs/prebuilt/cjs/builtin_components/error_boundary.js":
/*!********************************************************************************!*\
  !*** ./node_modules/aurumjs/prebuilt/cjs/builtin_components/error_boundary.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ErrorBoundary = void 0;
const aurum_element_js_1 = __webpack_require__(/*! ../rendering/aurum_element.js */ "./node_modules/aurumjs/prebuilt/cjs/rendering/aurum_element.js");
const data_source_js_1 = __webpack_require__(/*! ../stream/data_source.js */ "./node_modules/aurumjs/prebuilt/cjs/stream/data_source.js");
function ErrorBoundary(props, children, api) {
    const data = new data_source_js_1.DataSource(props === null || props === void 0 ? void 0 : props.suspenseFallback);
    const renderFallbackError = typeof (props === null || props === void 0 ? void 0 : props.errorFallback) === 'function' ? props.errorFallback : (error) => props === null || props === void 0 ? void 0 : props.errorFallback;
    const lc = (0, aurum_element_js_1.createLifeCycle)();
    api.onDetach(() => lc.onDetach());
    function onDone(res) {
        if (!api.cancellationToken.isCanceled) {
            data.update(res);
            lc.onAttach();
        }
    }
    function onError(error) {
        console.error(error);
        if (!api.cancellationToken.isCanceled) {
            data.update(renderFallbackError(error));
        }
    }
    async function handleRenderedChildren(res) {
        if (res instanceof Promise) {
            res.then(handleRenderedChildren, onError);
        }
        else {
            const nestedRendered = api.prerender(res, lc);
            if (nestedRendered.some((s) => s instanceof Promise)) {
                await Promise.all(nestedRendered).then(handleRenderedChildren, onError);
            }
            else {
                onDone(nestedRendered);
            }
        }
    }
    async function renderChildren() {
        try {
            const rendered = api.prerender(children, lc);
            await handleRenderedChildren(rendered);
        }
        catch (error) {
            onError(error);
        }
    }
    renderChildren();
    return data;
}
exports.ErrorBoundary = ErrorBoundary;
//# sourceMappingURL=error_boundary.js.map

/***/ }),

/***/ "./node_modules/aurumjs/prebuilt/cjs/builtin_components/router.js":
/*!************************************************************************!*\
  !*** ./node_modules/aurumjs/prebuilt/cjs/builtin_components/router.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DefaultRoute = exports.Route = exports.AurumRouter = void 0;
const aurumjs_js_1 = __webpack_require__(/*! ../aurumjs.js */ "./node_modules/aurumjs/prebuilt/cjs/aurumjs.js");
const data_source_js_1 = __webpack_require__(/*! ../stream/data_source.js */ "./node_modules/aurumjs/prebuilt/cjs/stream/data_source.js");
const data_source_operators_js_1 = __webpack_require__(/*! ../stream/data_source_operators.js */ "./node_modules/aurumjs/prebuilt/cjs/stream/data_source_operators.js");
function AurumRouter(props, children, api) {
    const resolvedChildren = (0, aurumjs_js_1.resolveChildren)(children, api.cancellationToken, (c) => {
        if (c.factory !== Route && c.factory !== DefaultRoute) {
            throw new Error('Aurum Router only accepts Route and DefaultRoute instances as children');
        }
    }).filter(Boolean);
    resolvedChildren
        .reduce((acc, c) => {
        if (c.factory === DefaultRoute) {
            return acc + 1;
        }
        else {
            return acc;
        }
    }, 0, api.cancellationToken)
        .listenAndRepeat((count) => {
        if (count > 1) {
            throw new Error(`Too many default routes only 0 or 1 allowed. Found ${count}`);
        }
    });
    const urlDataSource = new data_source_js_1.DataSource();
    if (typeof window !== 'undefined') {
        (0, aurumjs_js_1.urlHashEmitter)(urlDataSource, true, api.cancellationToken);
    }
    const activeRoute = new data_source_js_1.DataSource();
    activeRoute.transform((0, data_source_operators_js_1.dsUnique)(), (0, data_source_operators_js_1.dsDiff)(), (0, data_source_operators_js_1.dsTap)(({ newValue, oldValue }) => {
        var _a, _b, _c, _d;
        if (oldValue) {
            (_b = (_a = oldValue.props) === null || _a === void 0 ? void 0 : _a.onNavigateFrom) === null || _b === void 0 ? void 0 : _b.call(_a);
        }
        if (newValue) {
            (_d = (_c = newValue.props) === null || _c === void 0 ? void 0 : _c.onNavigateTo) === null || _d === void 0 ? void 0 : _d.call(_c);
        }
    }));
    return urlDataSource
        .transform((0, data_source_operators_js_1.dsUnique)(), api.cancellationToken)
        .withInitial(urlDataSource.value)
        .transform((0, data_source_operators_js_1.dsMap)((p) => selectRoute(p, resolvedChildren, activeRoute)));
}
exports.AurumRouter = AurumRouter;
function selectRoute(url, routes, activeRoute) {
    let selected;
    if (url === undefined || url === null) {
        selected = routes.find((r) => r.factory === DefaultRoute);
    }
    else {
        if (routes.find((r) => { var _a; return ((_a = r.props) === null || _a === void 0 ? void 0 : _a.href) === url; })) {
            selected = routes.find((r) => { var _a; return ((_a = r.props) === null || _a === void 0 ? void 0 : _a.href) === url; });
        }
        else {
            const segments = url.split('/');
            segments.pop();
            while (segments.length) {
                const path = segments.join('/');
                if (routes.find((r) => { var _a; return ((_a = r.props) === null || _a === void 0 ? void 0 : _a.href) === path; })) {
                    selected = routes.find((r) => { var _a; return ((_a = r.props) === null || _a === void 0 ? void 0 : _a.href) === path; });
                    break;
                }
                segments.pop();
            }
            if (!selected) {
                selected = routes.find((r) => r.factory === DefaultRoute);
            }
        }
    }
    if (selected) {
        activeRoute.update(selected);
        return selected.children;
    }
    else {
        activeRoute.update(undefined);
        return undefined;
    }
}
function Route(props, children) {
    return undefined;
}
exports.Route = Route;
function DefaultRoute(props, children) {
    return undefined;
}
exports.DefaultRoute = DefaultRoute;
//# sourceMappingURL=router.js.map

/***/ }),

/***/ "./node_modules/aurumjs/prebuilt/cjs/builtin_components/suspense.js":
/*!**************************************************************************!*\
  !*** ./node_modules/aurumjs/prebuilt/cjs/builtin_components/suspense.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Suspense = void 0;
const aurumjs_js_1 = __webpack_require__(/*! ../aurumjs.js */ "./node_modules/aurumjs/prebuilt/cjs/aurumjs.js");
function Suspense(props, children, api) {
    return (aurumjs_js_1.Aurum.factory(aurumjs_js_1.ErrorBoundary, { suspenseFallback: props === null || props === void 0 ? void 0 : props.fallback, errorFallback: (error) => {
            throw error;
        } }, children));
}
exports.Suspense = Suspense;
//# sourceMappingURL=suspense.js.map

/***/ }),

/***/ "./node_modules/aurumjs/prebuilt/cjs/builtin_components/switch.js":
/*!************************************************************************!*\
  !*** ./node_modules/aurumjs/prebuilt/cjs/builtin_components/switch.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DefaultSwitchCase = exports.SwitchCase = exports.Switch = void 0;
const aurum_element_js_1 = __webpack_require__(/*! ../rendering/aurum_element.js */ "./node_modules/aurumjs/prebuilt/cjs/rendering/aurum_element.js");
const data_source_operators_js_1 = __webpack_require__(/*! ../stream/data_source_operators.js */ "./node_modules/aurumjs/prebuilt/cjs/stream/data_source_operators.js");
const cancellation_token_js_1 = __webpack_require__(/*! ../utilities/cancellation_token.js */ "./node_modules/aurumjs/prebuilt/cjs/utilities/cancellation_token.js");
function Switch(props, children, api) {
    children = [].concat.apply([], children.filter((c) => !!c));
    if (children.some((c) => !c[aurum_element_js_1.aurumElementModelIdentitiy] ||
        !(c.factory === SwitchCase || c.factory === DefaultSwitchCase))) {
        throw new Error('Switch only accepts SwitchCase as children');
    }
    if (children.filter((c) => c.factory === DefaultSwitchCase).length > 1) {
        throw new Error('Too many default switch cases only 0 or 1 allowed');
    }
    const cleanUp = new cancellation_token_js_1.CancellationToken();
    api.onDetach(() => {
        cleanUp.cancel();
    });
    const u = props.state.transform((0, data_source_operators_js_1.dsUnique)(), cleanUp);
    return u.withInitial(props.state.value).transform((0, data_source_operators_js_1.dsMap)((state) => selectCase(state, children)));
}
exports.Switch = Switch;
function selectCase(state, children) {
    var _a, _b, _c;
    return (_b = (_a = children.find((c) => { var _a; return ((_a = c.props) === null || _a === void 0 ? void 0 : _a.when) === state; })) === null || _a === void 0 ? void 0 : _a.children) !== null && _b !== void 0 ? _b : (_c = children.find((p) => p.factory === DefaultSwitchCase)) === null || _c === void 0 ? void 0 : _c.children;
}
function SwitchCase(props, children) {
    return undefined;
}
exports.SwitchCase = SwitchCase;
function DefaultSwitchCase(props, children) {
    return undefined;
}
exports.DefaultSwitchCase = DefaultSwitchCase;
//# sourceMappingURL=switch.js.map

/***/ }),

/***/ "./node_modules/aurumjs/prebuilt/cjs/debug_mode.js":
/*!*********************************************************!*\
  !*** ./node_modules/aurumjs/prebuilt/cjs/debug_mode.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.debugRegisterConsumer = exports.debugDeclareUpdate = exports.debugRegisterUnlink = exports.debugRegisterLink = exports.debugRegisterStream = exports.enableDebugMode = exports.enableDiagnosticMode = exports.diagnosticMode = exports.debugMode = void 0;
const event_emitter_js_1 = __webpack_require__(/*! ./utilities/event_emitter.js */ "./node_modules/aurumjs/prebuilt/cjs/utilities/event_emitter.js");
exports.debugMode = false;
exports.diagnosticMode = false;
const customWindow = globalThis;
let debugStreamData;
function enableDiagnosticMode() {
    exports.diagnosticMode = true;
}
exports.enableDiagnosticMode = enableDiagnosticMode;
/**
 * Initializes the debug features of aurum. Required for the use of aurum devtools
 * Run this function before creating any streams or any aurum components for best results
 * Enabling this harms performance and breaks backwards compatibility with some browsers
 * Do not enable in production
 */
function enableDebugMode() {
    debugStreamData = [];
    exports.debugMode = true;
    setInterval(() => garbageCollect(), 60000);
    customWindow.__debugUpdates = new event_emitter_js_1.EventEmitter();
    customWindow.__debugNewSource = new event_emitter_js_1.EventEmitter();
    customWindow.__debugLinked = new event_emitter_js_1.EventEmitter();
    customWindow.__debugUnlinked = new event_emitter_js_1.EventEmitter();
    customWindow.__debugGetStreamData = () => debugStreamData.map(serializeStreamData);
}
exports.enableDebugMode = enableDebugMode;
function serializeStreamData(ref) {
    let serializedValue;
    try {
        serializedValue = JSON.stringify(ref.value);
    }
    catch (e) {
        serializedValue = '[Unserializable]';
    }
    return {
        name: ref.name,
        value: serializedValue,
        children: ref.children,
        consumers: ref.consumers,
        id: ref.id,
        parents: ref.parents,
        stack: ref.stack,
        timestamp: ref.timestamp
    };
}
function debugRegisterStream(stream, stack) {
    const ref = {
        name: stream.name,
        value: stream.value,
        id: Math.random(),
        children: [],
        parents: [],
        stack,
        timestamp: Date.now(),
        reference: new WeakRef(stream),
        consumers: []
    };
    debugStreamData.push(ref);
    customWindow.__debugNewSource.fire({
        source: serializeStreamData(ref)
    });
}
exports.debugRegisterStream = debugRegisterStream;
function debugRegisterLink(parent, child) {
    let pref = findDataByRef(parent);
    let cref = findDataByRef(child);
    if (!pref) {
        throw new Error('illegal state');
    }
    if (!cref) {
        throw new Error('illegal state');
    }
    pref.children.push(cref.id);
    cref.parents.push(pref.id);
    customWindow.__debugLinked.fire({
        child: serializeStreamData(cref),
        parent: serializeStreamData(pref)
    });
}
exports.debugRegisterLink = debugRegisterLink;
function debugRegisterUnlink(parent, child) {
    let pref = findDataByRef(parent);
    let cref = findDataByRef(child);
    if (!pref) {
        throw new Error('illegal state');
    }
    if (!cref) {
        throw new Error('illegal state');
    }
    const cindex = pref.children.indexOf(cref.id);
    if (cindex === -1) {
        throw new Error('illegal state');
    }
    pref.children.splice(cindex, 1);
    const pindex = cref.parents.indexOf(pref.id);
    if (pindex === -1) {
        throw new Error('illegal state');
    }
    cref.parents.splice(cindex, 1);
    customWindow.__debugUnlinked.fire({
        child: serializeStreamData(cref),
        parent: serializeStreamData(pref)
    });
}
exports.debugRegisterUnlink = debugRegisterUnlink;
function debugDeclareUpdate(source, value, stack) {
    let ref = findDataByRef(source);
    if (!ref) {
        throw new Error('illegal state');
    }
    ref.value = source.value;
    customWindow.__debugUpdates.fire({
        newValue: value,
        source: serializeStreamData(ref),
        stack
    });
}
exports.debugDeclareUpdate = debugDeclareUpdate;
function debugRegisterConsumer(stream, consumer, consumerStack) {
    let ref = findDataByRef(stream);
    if (!ref) {
        throw new Error('illegal state');
    }
    ref.consumers.push({
        code: consumer,
        stack: consumerStack
    });
}
exports.debugRegisterConsumer = debugRegisterConsumer;
function garbageCollect() {
    debugStreamData = debugStreamData.filter((dsd) => dsd.reference.deref() !== undefined);
}
function findDataByRef(target) {
    return debugStreamData.find((dsd) => dsd.reference.deref() === target);
}
//# sourceMappingURL=debug_mode.js.map

/***/ }),

/***/ "./node_modules/aurumjs/prebuilt/cjs/nodes/input.js":
/*!**********************************************************!*\
  !*** ./node_modules/aurumjs/prebuilt/cjs/nodes/input.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Input = void 0;
const dom_adapter_js_1 = __webpack_require__(/*! ../builtin_components/dom_adapter.js */ "./node_modules/aurumjs/prebuilt/cjs/builtin_components/dom_adapter.js");
const data_source_js_1 = __webpack_require__(/*! ../stream/data_source.js */ "./node_modules/aurumjs/prebuilt/cjs/stream/data_source.js");
const duplex_data_source_js_1 = __webpack_require__(/*! ../stream/duplex_data_source.js */ "./node_modules/aurumjs/prebuilt/cjs/stream/duplex_data_source.js");
/**
 * @internal
 */
const inputEvents = { input: 'onInput', change: 'onChange' };
/**
 * @internal
 */
const inputProps = [
    'placeholder',
    'readonly',
    'disabled',
    'accept',
    'alt',
    'autocomplete',
    'autofocus',
    'checked',
    'defaultChecked',
    'formAction',
    'formEnctype',
    'formMethod',
    'formNoValidate',
    'formTarget',
    'max',
    'maxLength',
    'min',
    'minLength',
    'pattern',
    'multiple',
    'required',
    'type',
    'step',
    'list'
];
/**
 * @internal
 */
exports.Input = (0, dom_adapter_js_1.DomNodeCreator)('input', inputProps, inputEvents, (node, props, cleanUp) => {
    const input = node;
    if (props.value) {
        if (props.value instanceof data_source_js_1.DataSource) {
            props.value.listenAndRepeat((v) => {
                input.value = v !== null && v !== void 0 ? v : '';
            }, cleanUp);
            input.addEventListener('input', () => {
                props.value.update(input.value);
            });
        }
        else if (props.value instanceof duplex_data_source_js_1.DuplexDataSource) {
            props.value.listenAndRepeat((v) => {
                input.value = v !== null && v !== void 0 ? v : '';
            }, cleanUp);
            input.addEventListener('input', () => {
                props.value.updateUpstream(input.value);
            });
        }
        else {
            input.value = props.value;
        }
    }
    if (props.checked) {
        if (props.checked instanceof data_source_js_1.DataSource) {
            props.checked.listenAndRepeat((v) => {
                input.checked = v !== null && v !== void 0 ? v : false;
            }, cleanUp);
            input.addEventListener('change', () => {
                props.checked.update(input.checked);
            });
        }
        else if (props.checked instanceof duplex_data_source_js_1.DuplexDataSource) {
            props.checked.listenAndRepeat((v) => {
                input.checked = v !== null && v !== void 0 ? v : false;
            }, cleanUp);
            input.addEventListener('change', () => {
                props.checked.updateUpstream(input.checked);
            });
        }
        else {
            input.checked = props.checked;
        }
    }
});
//# sourceMappingURL=input.js.map

/***/ }),

/***/ "./node_modules/aurumjs/prebuilt/cjs/nodes/select.js":
/*!***********************************************************!*\
  !*** ./node_modules/aurumjs/prebuilt/cjs/nodes/select.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Select = void 0;
const data_source_js_1 = __webpack_require__(/*! ../stream/data_source.js */ "./node_modules/aurumjs/prebuilt/cjs/stream/data_source.js");
const duplex_data_source_js_1 = __webpack_require__(/*! ../stream/duplex_data_source.js */ "./node_modules/aurumjs/prebuilt/cjs/stream/duplex_data_source.js");
const dom_adapter_js_1 = __webpack_require__(/*! ../builtin_components/dom_adapter.js */ "./node_modules/aurumjs/prebuilt/cjs/builtin_components/dom_adapter.js");
/**
 * @internal
 */
const selectEvents = { change: 'onChange' };
/**
 * @internal
 */
exports.Select = (0, dom_adapter_js_1.DomNodeCreator)('select', undefined, selectEvents, (node, props, cleanUp) => {
    const select = node;
    if ((props === null || props === void 0 ? void 0 : props.value) || (props === null || props === void 0 ? void 0 : props.selectedIndex)) {
        // In case props.value is a data source we need to reapply the value when the children change because the children may be unstable/be removed and re-added which would falsify the state.
        if (props.value instanceof data_source_js_1.DataSource || props.value instanceof duplex_data_source_js_1.DuplexDataSource) {
            const mo = new MutationObserver(() => {
                select.value = props.value.value;
            });
            mo.observe(select, {
                childList: true
            });
            cleanUp.addCancelable(() => {
                mo.disconnect();
            });
        }
        if (props.selectedIndex instanceof data_source_js_1.DataSource || props.selectedIndex instanceof duplex_data_source_js_1.DuplexDataSource) {
            const mo = new MutationObserver(() => {
                select.selectedIndex = props.selectedIndex.value;
            });
            mo.observe(select, {
                childList: true
            });
            cleanUp.addCancelable(() => {
                mo.disconnect();
            });
        }
        if (props.value instanceof data_source_js_1.DataSource) {
            props.value.listenAndRepeat((v) => {
                select.value = v;
            }, cleanUp);
            select.addEventListener('change', () => {
                props.value.update(select.value);
            });
        }
        else if (props.value instanceof duplex_data_source_js_1.DuplexDataSource) {
            props.value.listenAndRepeat((v) => {
                select.value = v;
            }, cleanUp);
            select.addEventListener('change', () => {
                props.value.updateUpstream(select.value);
            });
        }
        else {
            select.value = props.value;
        }
        if (props === null || props === void 0 ? void 0 : props.selectedIndex) {
            if (props.selectedIndex instanceof data_source_js_1.DataSource) {
                props.selectedIndex.listenAndRepeat((v) => {
                    select.selectedIndex = v;
                }, cleanUp);
                select.addEventListener('change', () => {
                    props.selectedIndex.update(select.selectedIndex);
                });
            }
            else if (props.selectedIndex instanceof duplex_data_source_js_1.DuplexDataSource) {
                props.selectedIndex.listenAndRepeat((v) => {
                    select.selectedIndex = v;
                }, cleanUp);
                select.addEventListener('change', () => {
                    props.selectedIndex.updateUpstream(select.selectedIndex);
                });
            }
            else {
                select.selectedIndex = props.selectedIndex;
            }
        }
    }
});
//# sourceMappingURL=select.js.map

/***/ }),

/***/ "./node_modules/aurumjs/prebuilt/cjs/nodes/simple_dom_nodes.js":
/*!*********************************************************************!*\
  !*** ./node_modules/aurumjs/prebuilt/cjs/nodes/simple_dom_nodes.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Nav = exports.Link = exports.Label = exports.Img = exports.IFrame = exports.I = exports.Heading = exports.Header = exports.Head = exports.Html = exports.Meta = exports.Form = exports.Footer = exports.Em = exports.Details = exports.Data = exports.Canvas = exports.Button = exports.Br = exports.Audio = exports.Hr = exports.P = exports.Pre = exports.Q = exports.Template = exports.THead = exports.Summary = exports.Title = exports.Body = exports.B = exports.Li = exports.Ol = exports.Ul = exports.Video = exports.NoScript = exports.Span = exports.Aside = exports.Article = exports.Area = exports.H6 = exports.H5 = exports.H4 = exports.H3 = exports.H2 = exports.H1 = exports.Address = exports.Abbr = exports.A = exports.Div = exports.Code = void 0;
exports.Object = exports.Output = exports.Picture = exports.Wbr = exports.Var = exports.Kbd = exports.Samp = exports.Strong = exports.Slot = exports.OptGroup = exports.Option = exports.Progress = exports.Svg = exports.Script = exports.Param = exports.Track = exports.Source = exports.Style = exports.Time = exports.Th = exports.Td = exports.Tr = exports.Caption = exports.Colgroup = exports.Col = exports.TFoot = exports.TBody = exports.Table = exports.Sup = exports.Sub = void 0;
const dom_adapter_js_1 = __webpack_require__(/*! ../builtin_components/dom_adapter.js */ "./node_modules/aurumjs/prebuilt/cjs/builtin_components/dom_adapter.js");
/**
 * @internal
 */
exports.Code = (0, dom_adapter_js_1.DomNodeCreator)('code');
/**
 * @internal
 */
exports.Div = (0, dom_adapter_js_1.DomNodeCreator)('div');
/**
 * @internal
 */
exports.A = (0, dom_adapter_js_1.DomNodeCreator)('a', ['href', 'target', 'hreflang', 'media', 'download', 'ping', 'referrerpolicy', 'rel', 'type']);
/**
 * @internal
 */
exports.Abbr = (0, dom_adapter_js_1.DomNodeCreator)('abbr');
/**
 * @internal
 */
exports.Address = (0, dom_adapter_js_1.DomNodeCreator)('address');
/**
 * @internal
 */
exports.H1 = (0, dom_adapter_js_1.DomNodeCreator)('h1');
/**
 * @internal
 */
exports.H2 = (0, dom_adapter_js_1.DomNodeCreator)('h2');
/**
 * @internal
 */
exports.H3 = (0, dom_adapter_js_1.DomNodeCreator)('h3');
/**
 * @internal
 */
exports.H4 = (0, dom_adapter_js_1.DomNodeCreator)('h4');
/**
 * @internal
 */
exports.H5 = (0, dom_adapter_js_1.DomNodeCreator)('h5');
/**
 * @internal
 */
exports.H6 = (0, dom_adapter_js_1.DomNodeCreator)('h6');
/**
 * @internal
 */
exports.Area = (0, dom_adapter_js_1.DomNodeCreator)('area', [
    'alt',
    'coors',
    'download',
    'href',
    'hreflang',
    'media',
    'rel',
    'shape',
    'target',
    'type',
    'ping',
    'referrerpolicy'
]);
/**
 * @internal
 */
exports.Article = (0, dom_adapter_js_1.DomNodeCreator)('article');
/**
 * @internal
 */
exports.Aside = (0, dom_adapter_js_1.DomNodeCreator)('aside');
/**
 * @internal
 */
exports.Span = (0, dom_adapter_js_1.DomNodeCreator)('span');
/**
 * @internal
 */
exports.NoScript = (0, dom_adapter_js_1.DomNodeCreator)('noscript');
/**
 * @internal
 */
exports.Video = (0, dom_adapter_js_1.DomNodeCreator)('video', [
    'controls',
    'autoplay',
    'loop',
    'muted',
    'preload',
    'src',
    'poster',
    'width',
    'height',
    'autopictureinpicture',
    'controlslist',
    'crossorigin',
    'disablepictureinpicture',
    'disableremoteplayback',
    'playsinline'
], {
    canPlay: 'onCanPlay',
    canplaythrough: 'onCanPlayThrough',
    complete: 'onComplete',
    durationchange: 'onDurationChange',
    emptied: 'onEmptied',
    ended: 'onEnded',
    loadeddata: 'onLoadedData',
    loadedmetadata: 'onLoadedMetadata',
    pause: 'onPause',
    play: 'onPlay',
    playing: 'onPlaying',
    progress: 'onProgress',
    ratechange: 'onRateChange',
    seeked: 'onSeeked',
    seeking: 'onSeeking',
    stalled: 'onStalled',
    suspend: 'onSuspend',
    timeupdate: 'onTimeUpdate',
    volumechange: 'onVolumeChange',
    waiting: 'onWaiting'
});
/**
 * @internal
 */
exports.Ul = (0, dom_adapter_js_1.DomNodeCreator)('ul');
/**
 * @internal
 */
exports.Ol = (0, dom_adapter_js_1.DomNodeCreator)('ol');
/**
 * @internal
 */
exports.Li = (0, dom_adapter_js_1.DomNodeCreator)('li');
/**
 * @internal
 */
exports.B = (0, dom_adapter_js_1.DomNodeCreator)('b');
/**
 * @internal
 */
exports.Body = (0, dom_adapter_js_1.DomNodeCreator)('body');
/**
 * @internal
 */
exports.Title = (0, dom_adapter_js_1.DomNodeCreator)('title');
/**
 * @internal
 */
exports.Summary = (0, dom_adapter_js_1.DomNodeCreator)('summary');
/**
 * @internal
 */
exports.THead = (0, dom_adapter_js_1.DomNodeCreator)('thead');
/**
 * @internal
 */
exports.Template = (0, dom_adapter_js_1.DomNodeCreator)('template');
/**
 * @internal
 */
exports.Q = (0, dom_adapter_js_1.DomNodeCreator)('q');
/**
 * @internal
 */
exports.Pre = (0, dom_adapter_js_1.DomNodeCreator)('pre');
/**
 * @internal
 */
exports.P = (0, dom_adapter_js_1.DomNodeCreator)('p');
/**
 * @internal
 */
exports.Hr = (0, dom_adapter_js_1.DomNodeCreator)('hr');
/**
 * @internal
 */
exports.Audio = (0, dom_adapter_js_1.DomNodeCreator)('audio', ['controls', 'autoplay', 'loop', 'muted', 'preload', 'src', 'crossorigin'], {
    audioprocess: 'onAudioProcess',
    canplay: 'onCanPlay',
    canplaythrough: 'onCanPlayThrough',
    complete: 'onComplete',
    durationchange: 'onDurationChange',
    emptied: 'onEmptied',
    ended: 'onEnded',
    loadeddata: 'onLoadedData',
    loadedmetadata: 'onLoadedMetadata',
    pause: 'onPause',
    play: 'onPlay',
    playing: 'onPlaying',
    ratechange: 'onRateChange',
    seeked: 'onSeeked',
    seeking: 'onSeeking',
    stalled: 'onStalled',
    suspend: 'onSuspend',
    timeupdate: 'onTimeUpdate',
    volumechange: 'onVolumeChange',
    waiting: 'onWaiting'
});
/**
 * @internal
 */
exports.Br = (0, dom_adapter_js_1.DomNodeCreator)('br');
/**
 * @internal
 */
exports.Button = (0, dom_adapter_js_1.DomNodeCreator)('button', [
    'disabled',
    'autofocus',
    'form',
    'formaction',
    'formenctype',
    'formmethod',
    'formnovalidate',
    'formtarget',
    'type'
]);
/**
 * @internal
 */
exports.Canvas = (0, dom_adapter_js_1.DomNodeCreator)('canvas', ['width', 'height']);
/**
 * @internal
 */
exports.Data = (0, dom_adapter_js_1.DomNodeCreator)('data', ['value']);
/**
 * @internal
 */
exports.Details = (0, dom_adapter_js_1.DomNodeCreator)('details');
/**
 * @internal
 */
exports.Em = (0, dom_adapter_js_1.DomNodeCreator)('em');
/**
 * @internal
 */
exports.Footer = (0, dom_adapter_js_1.DomNodeCreator)('footer');
/**
 * @internal
 */
exports.Form = (0, dom_adapter_js_1.DomNodeCreator)('form', ['action', 'method', 'rel', 'enctype', 'novalidate', 'target', 'accept-charset', 'autocomplete']);
/**
 * @internal
 */
exports.Meta = (0, dom_adapter_js_1.DomNodeCreator)('meta', ['http-equiv', 'charset', 'content']);
/**
 * @internal
 */
exports.Html = (0, dom_adapter_js_1.DomNodeCreator)('html', ['lang', 'xmlns']);
/**
 * @internal
 */
exports.Head = (0, dom_adapter_js_1.DomNodeCreator)('head');
/**
 * @internal
 */
exports.Header = (0, dom_adapter_js_1.DomNodeCreator)('header');
/**
 * @internal
 */
exports.Heading = (0, dom_adapter_js_1.DomNodeCreator)('heading');
/**
 * @internal
 */
exports.I = (0, dom_adapter_js_1.DomNodeCreator)('i');
/**
 * @internal
 */
exports.IFrame = (0, dom_adapter_js_1.DomNodeCreator)('iframe', [
    'src',
    'srcdoc',
    'width',
    'height',
    'allow',
    'allowfullscreen',
    'allowpaymentrequest',
    'loading',
    'sandbox',
    'frameborder',
    'csp',
    'referrerpolicy'
]);
/**
 * @internal
 */
exports.Img = (0, dom_adapter_js_1.DomNodeCreator)('img', [
    'src',
    'alt',
    'width',
    'height',
    'referrerpolicy',
    'sizes',
    'srcset',
    'usemap',
    'crossorigin',
    'decoding',
    'ismap',
    'loading'
]);
/**
 * @internal
 */
exports.Label = (0, dom_adapter_js_1.DomNodeCreator)('label', ['for']);
/**
 * @internal
 */
exports.Link = (0, dom_adapter_js_1.DomNodeCreator)('link', [
    'href',
    'rel',
    'media',
    'as',
    'disabled',
    'type',
    'crossorigin',
    'hreflang',
    'referrerpolicy',
    'sizes',
    'integrity',
    'imagesizes',
    'prefetch'
]);
/**
 * @internal
 */
exports.Nav = (0, dom_adapter_js_1.DomNodeCreator)('nav');
/**
 * @internal
 */
exports.Sub = (0, dom_adapter_js_1.DomNodeCreator)('sub');
/**
 * @internal
 */
exports.Sup = (0, dom_adapter_js_1.DomNodeCreator)('sup');
/**
 * @internal
 */
exports.Table = (0, dom_adapter_js_1.DomNodeCreator)('table');
/**
 * @internal
 */
exports.TBody = (0, dom_adapter_js_1.DomNodeCreator)('tbody');
/**
 * @internal
 */
exports.TFoot = (0, dom_adapter_js_1.DomNodeCreator)('tfoot');
/**
 * @internal
 */
exports.Col = (0, dom_adapter_js_1.DomNodeCreator)('col', ['span']);
/**
 * @internal
 */
exports.Colgroup = (0, dom_adapter_js_1.DomNodeCreator)('colgroup', ['span']);
/**
 * @internal
 */
exports.Caption = (0, dom_adapter_js_1.DomNodeCreator)('caption');
/**
 * @internal
 */
exports.Tr = (0, dom_adapter_js_1.DomNodeCreator)('tr');
/**
 * @internal
 */
exports.Td = (0, dom_adapter_js_1.DomNodeCreator)('td', ['colspan', 'headers', 'rowspan']);
/**
 * @internal
 */
exports.Th = (0, dom_adapter_js_1.DomNodeCreator)('th', ['scope', 'abbr', 'colspan', 'headers', 'rowspan']);
/**
 * @internal
 */
exports.Time = (0, dom_adapter_js_1.DomNodeCreator)('time', ['datetime']);
/**
 * @internal
 */
exports.Style = (0, dom_adapter_js_1.DomNodeCreator)('style', ['media', 'type', 'nonce']);
/**
 * @internal
 */
exports.Source = (0, dom_adapter_js_1.DomNodeCreator)('source', ['src', 'srcset', 'media', 'sizes', 'type']);
/**
 * @internal
 */
exports.Track = (0, dom_adapter_js_1.DomNodeCreator)('track', ['src', 'srclang', 'label', 'kind', 'default']);
/**
 * @internal
 */
exports.Param = (0, dom_adapter_js_1.DomNodeCreator)('param', ['value']);
/**
 * @internal
 */
exports.Script = (0, dom_adapter_js_1.DomNodeCreator)('script', [
    'src',
    'async',
    'defer',
    'integrity',
    'nomodule',
    'type',
    'crossorigin',
    'referrerpolicy',
    'text',
    'nonce'
]);
/**
 * @internal
 */
exports.Svg = (0, dom_adapter_js_1.DomNodeCreator)('svg', ['width', 'height']);
/**
 * @internal
 */
exports.Progress = (0, dom_adapter_js_1.DomNodeCreator)('progress', ['max', 'value']);
/**
 * @internal
 */
exports.Option = (0, dom_adapter_js_1.DomNodeCreator)('option', ['value', 'label', 'disabled', 'selected']);
/**
 * @internal
 */
exports.OptGroup = (0, dom_adapter_js_1.DomNodeCreator)('optgroup', ['label', 'disabled']);
/**
 * @internal
 */
exports.Slot = (0, dom_adapter_js_1.DomNodeCreator)('slot');
/**
 * @internal
 */
exports.Strong = (0, dom_adapter_js_1.DomNodeCreator)('strong');
/**
 * @internal
 */
exports.Samp = (0, dom_adapter_js_1.DomNodeCreator)('samp');
/**
 * @internal
 */
exports.Kbd = (0, dom_adapter_js_1.DomNodeCreator)('kbd');
/**
 * @internal
 */
exports.Var = (0, dom_adapter_js_1.DomNodeCreator)('var');
/**
 * @internal
 */
exports.Wbr = (0, dom_adapter_js_1.DomNodeCreator)('wbr');
/**
 * @internal
 */
exports.Picture = (0, dom_adapter_js_1.DomNodeCreator)('picture');
/**
 * @internal
 */
exports.Output = (0, dom_adapter_js_1.DomNodeCreator)('output', ['for', 'form']);
/**
 * @internal
 */
exports.Object = (0, dom_adapter_js_1.DomNodeCreator)('object', ['data', 'width', 'height', 'form', 'type', 'usemap']);
//# sourceMappingURL=simple_dom_nodes.js.map

/***/ }),

/***/ "./node_modules/aurumjs/prebuilt/cjs/nodes/string_adapter.js":
/*!*******************************************************************!*\
  !*** ./node_modules/aurumjs/prebuilt/cjs/nodes/string_adapter.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.aurumToString = void 0;
const aurum_element_js_1 = __webpack_require__(/*! ../rendering/aurum_element.js */ "./node_modules/aurumjs/prebuilt/cjs/rendering/aurum_element.js");
const data_source_js_1 = __webpack_require__(/*! ../stream/data_source.js */ "./node_modules/aurumjs/prebuilt/cjs/stream/data_source.js");
const duplex_data_source_js_1 = __webpack_require__(/*! ../stream/duplex_data_source.js */ "./node_modules/aurumjs/prebuilt/cjs/stream/duplex_data_source.js");
const cancellation_token_js_1 = __webpack_require__(/*! ../utilities/cancellation_token.js */ "./node_modules/aurumjs/prebuilt/cjs/utilities/cancellation_token.js");
async function aurumToString(content, config = {}) {
    if (content === undefined || content === null) {
        return '';
    }
    if (Array.isArray(content)) {
        const result = [];
        for (const item of content) {
            result.push(await aurumToString(item));
        }
        return result.join('');
    }
    if (content instanceof Promise) {
        return aurumToString(await content);
    }
    if (['number', 'string', 'bigint', 'boolean'].includes(typeof content)) {
        return content.toString();
    }
    else if (content instanceof data_source_js_1.DataSource) {
        return aurumToString(content.value);
    }
    else if (content instanceof duplex_data_source_js_1.DuplexDataSource) {
        return aurumToString(content.value);
    }
    else if (content instanceof data_source_js_1.ArrayDataSource) {
        return aurumToString(content.getData());
    }
    else {
        const item = content;
        if (!item.isIntrinsic) {
            return aurumToString(item.factory(item.props, item.children, (0, aurum_element_js_1.createAPI)({
                attachCalls: [],
                sessionToken: new cancellation_token_js_1.CancellationToken(),
                tokens: []
            })));
        }
        if (config.tagBlacklist && config.tagBlacklist.includes(item.name)) {
            return '';
        }
        if (config.tagWhitelist && !config.tagWhitelist.includes(item.name)) {
            return '';
        }
        let propString = ' ';
        let children = '';
        if (item.children) {
            children = await aurumToString(item.children);
        }
        for (const prop in item.props) {
            if (config.attributeBlacklist && config.attributeBlacklist.includes(prop)) {
                continue;
            }
            if (config.attributeWhitelist && !config.attributeWhitelist.includes(prop)) {
                continue;
            }
            if (item.props[prop] != undefined) {
                propString += `${prop}="${item.props[prop].toString()}" `;
            }
        }
        return `<${item.name}${propString.trimRight()}>${children}</${item.name}>`;
    }
}
exports.aurumToString = aurumToString;
//# sourceMappingURL=string_adapter.js.map

/***/ }),

/***/ "./node_modules/aurumjs/prebuilt/cjs/nodes/textarea.js":
/*!*************************************************************!*\
  !*** ./node_modules/aurumjs/prebuilt/cjs/nodes/textarea.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TextArea = void 0;
const data_source_js_1 = __webpack_require__(/*! ../stream/data_source.js */ "./node_modules/aurumjs/prebuilt/cjs/stream/data_source.js");
const duplex_data_source_js_1 = __webpack_require__(/*! ../stream/duplex_data_source.js */ "./node_modules/aurumjs/prebuilt/cjs/stream/duplex_data_source.js");
const dom_adapter_js_1 = __webpack_require__(/*! ../builtin_components/dom_adapter.js */ "./node_modules/aurumjs/prebuilt/cjs/builtin_components/dom_adapter.js");
/**
 * @internal
 */
const textAreaEvents = { input: 'onInput', change: 'onChange' };
/**
 * @internal
 */
const textAreaProps = [
    'placeholder',
    'readonly',
    'disabled',
    'form',
    'cols',
    'rows',
    'wrap',
    'autocomplete',
    'autofocus',
    'max',
    'maxLength',
    'min',
    'spellcheck',
    'minLength',
    'required',
    'type'
];
/**
 * @internal
 */
exports.TextArea = (0, dom_adapter_js_1.DomNodeCreator)('textArea', textAreaProps, textAreaEvents, (node, props, cleanUp) => {
    const textArea = node;
    if (props.value) {
        if (props.value instanceof data_source_js_1.DataSource) {
            props.value.listenAndRepeat((v) => {
                textArea.value = v;
            }, cleanUp);
            textArea.addEventListener('input', () => {
                props.value.update(textArea.value);
            });
        }
        else if (props.value instanceof duplex_data_source_js_1.DuplexDataSource) {
            props.value.listenAndRepeat((v) => {
                textArea.value = v;
            }, cleanUp);
            textArea.addEventListener('input', () => {
                props.value.updateUpstream(textArea.value);
            });
        }
        else {
            textArea.value = props.value;
        }
    }
});
//# sourceMappingURL=textarea.js.map

/***/ }),

/***/ "./node_modules/aurumjs/prebuilt/cjs/rendering/aurum_element.js":
/*!**********************************************************************!*\
  !*** ./node_modules/aurumjs/prebuilt/cjs/rendering/aurum_element.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SingularAurumElement = exports.ArrayAurumElement = exports.createAPI = exports.renderInternal = exports.AurumElement = exports.createLifeCycle = exports.nodeData = exports.aurumElementModelIdentitiy = exports.createRenderSession = void 0;
const debug_mode_js_1 = __webpack_require__(/*! ../debug_mode.js */ "./node_modules/aurumjs/prebuilt/cjs/debug_mode.js");
const data_source_js_1 = __webpack_require__(/*! ../stream/data_source.js */ "./node_modules/aurumjs/prebuilt/cjs/stream/data_source.js");
const duplex_data_source_js_1 = __webpack_require__(/*! ../stream/duplex_data_source.js */ "./node_modules/aurumjs/prebuilt/cjs/stream/duplex_data_source.js");
const cancellation_token_js_1 = __webpack_require__(/*! ../utilities/cancellation_token.js */ "./node_modules/aurumjs/prebuilt/cjs/utilities/cancellation_token.js");
const event_emitter_js_1 = __webpack_require__(/*! ../utilities/event_emitter.js */ "./node_modules/aurumjs/prebuilt/cjs/utilities/event_emitter.js");
const classname_js_1 = __webpack_require__(/*! ../utilities/classname.js */ "./node_modules/aurumjs/prebuilt/cjs/utilities/classname.js");
function createRenderSession() {
    const session = {
        attachCalls: [],
        sessionToken: new cancellation_token_js_1.CancellationToken(() => {
            for (const token of session.tokens) {
                token.cancel();
            }
        }),
        tokens: []
    };
    return session;
}
exports.createRenderSession = createRenderSession;
exports.aurumElementModelIdentitiy = Symbol('AurumElementModel');
exports.nodeData = new WeakMap();
function createLifeCycle() {
    const lc = {
        attach: new event_emitter_js_1.EventEmitter(),
        detach: new event_emitter_js_1.EventEmitter(),
        onAttach() {
            lc.attach.fire();
        },
        onDetach() {
            lc.detach.fire();
        }
    };
    return lc;
}
exports.createLifeCycle = createLifeCycle;
class AurumElement {
    constructor(dataSource, api) {
        this.disposed = false;
        this.children = [];
        this.api = api;
        this.api.onAttach(() => {
            if (this.hostNode === undefined) {
                throw new Error('illegal state: Attach fired but not actually attached');
            }
            this.render(dataSource);
        });
    }
    dispose() {
        if (this.disposed) {
            return;
        }
        if (this.hostNode.isConnected) {
            this.clearContent();
            this.contentStartMarker.remove();
            this.contentEndMarker.remove();
        }
        this.disposed = true;
    }
    attachToDom(node, index) {
        if (this.hostNode) {
            throw new Error('Aurum Element is already attached');
        }
        const id = AurumElement.id++;
        this.hostNode = node;
        this.contentStartMarker = document.createComment('START Aurum Node ' + id);
        //@ts-ignore
        this.contentStartMarker.owner = this;
        this.contentEndMarker = document.createComment('END Aurum Node ' + id);
        if (index >= node.childNodes.length) {
            node.appendChild(this.contentStartMarker);
            node.appendChild(this.contentEndMarker);
        }
        else {
            node.insertBefore(this.contentStartMarker, node.childNodes[index]);
            node.insertBefore(this.contentEndMarker, node.childNodes[index + 1]);
        }
    }
    getStartIndex() {
        return this.getWorkIndex() - 1;
    }
    getWorkIndex() {
        if (this.lastStartIndex !== undefined && this.hostNode.childNodes[this.lastStartIndex] === this.contentStartMarker) {
            return this.lastStartIndex + 1;
        }
        for (let i = 0; i < this.hostNode.childNodes.length; i++) {
            if (this.hostNode.childNodes[i] === this.contentStartMarker) {
                this.lastStartIndex = i;
                return i + 1;
            }
        }
        return -1;
    }
    getLastIndex() {
        if (this.lastEndIndex !== undefined && this.hostNode.childNodes[this.lastEndIndex] === this.contentEndMarker) {
            return this.lastEndIndex;
        }
        for (let i = 0; i < this.hostNode.childNodes.length; i++) {
            if (this.hostNode.childNodes[i] === this.contentEndMarker) {
                this.lastEndIndex = i;
                return i;
            }
        }
        return -1;
    }
    clearContent() {
        if (this.hostNode === undefined) {
            throw new Error('illegal state: Aurum element was not attched to anything');
        }
        let workIndex = this.getWorkIndex();
        while (this.hostNode.childNodes[workIndex] !== this.contentEndMarker) {
            if (!(this.hostNode.childNodes[workIndex] instanceof Comment)) {
                this.hostNode.removeChild(this.hostNode.childNodes[workIndex]);
            }
            else {
                //@ts-ignore
                if (this.hostNode.childNodes[workIndex].owner.disposed) {
                    break;
                }
                //@ts-ignore
                this.hostNode.childNodes[workIndex].owner.dispose();
            }
        }
    }
    updateDom() {
        var _a;
        const workIndex = this.getWorkIndex();
        let i;
        let offset = 0;
        for (i = 0; i < this.children.length; i++) {
            const child = this.children[i];
            if (child === undefined || child === null) {
                offset--;
                continue;
            }
            if (child === this.hostNode.childNodes[i + workIndex + offset]) {
                continue;
            }
            if (child instanceof AurumElement) {
                if (!child.hostNode) {
                    child.attachToDom(this.hostNode, i + workIndex + offset);
                }
                if (child.getStartIndex() === i + workIndex + offset) {
                    offset += child.getLastIndex() - i - offset - workIndex;
                }
                else {
                    let start = child.getStartIndex();
                    let end = child.getLastIndex();
                    for (let ptr = start, swapIteration = 0; ptr <= end; ptr++, swapIteration++) {
                        const itemA = this.hostNode.childNodes[i + workIndex + offset + swapIteration];
                        const itemB = this.hostNode.childNodes[ptr];
                        const parentA = itemA.parentNode;
                        const siblingA = itemA.nextSibling === itemB ? itemB : itemA.nextSibling;
                        itemB.parentNode.insertBefore(itemA, itemB);
                        parentA.insertBefore(itemB, siblingA);
                    }
                    offset += child.getLastIndex() - i - offset - workIndex;
                }
                continue;
            }
            if (this.hostNode.childNodes[i + workIndex + offset] !== this.contentEndMarker &&
                this.hostNode.childNodes[i + workIndex + offset] !== this.children[i] &&
                this.hostNode.childNodes[i + workIndex + offset] !== ((_a = this.children[i + 1]) === null || _a === void 0 ? void 0 : _a.contentStartMarker)) {
                if (child instanceof HTMLElement || child instanceof Text) {
                    this.hostNode.removeChild(this.hostNode.childNodes[i + workIndex + offset]);
                    if (this.hostNode.childNodes[i + workIndex + offset]) {
                        this.lastEndIndex++;
                        this.hostNode.insertBefore(child, this.hostNode.childNodes[i + workIndex + offset]);
                    }
                    else {
                        this.lastEndIndex++;
                        this.hostNode.appendChild(child);
                    }
                }
                else {
                    throw new Error('not implemented');
                }
            }
            else {
                if (child instanceof HTMLElement || child instanceof Text) {
                    if (this.hostNode.childNodes[i + workIndex + offset]) {
                        this.lastEndIndex++;
                        this.hostNode.insertBefore(child, this.hostNode.childNodes[i + workIndex + offset]);
                    }
                    else {
                        this.lastEndIndex++;
                        this.hostNode.appendChild(child);
                    }
                }
                else {
                    throw new Error('not implemented');
                }
            }
        }
        while (this.hostNode.childNodes[i + workIndex + offset] !== this.contentEndMarker) {
            this.lastEndIndex--;
            this.hostNode.removeChild(this.hostNode.childNodes[i + workIndex + offset]);
        }
    }
}
exports.AurumElement = AurumElement;
AurumElement.id = 1;
/**
 * @internal
 */
function renderInternal(element, session, prerendering = false) {
    var _a;
    if (element == undefined) {
        return undefined;
    }
    if (Array.isArray(element)) {
        const result = [];
        for (const item of element) {
            const rendered = renderInternal(item, session, prerendering);
            // Flatten the rendered content into a single array to avoid having to iterate over nested arrays later
            if (rendered !== undefined && rendered !== null) {
                if (Array.isArray(rendered)) {
                    result.push(...rendered);
                }
                else {
                    result.push(rendered);
                }
            }
        }
        return result;
    }
    if (!prerendering) {
        const type = typeof element;
        if (type === 'string') {
            return document.createTextNode(element);
        }
        else if (type === 'number' || type === 'bigint' || type === 'boolean') {
            return document.createTextNode(element.toString());
        }
        if (element instanceof Promise) {
            const ds = new data_source_js_1.DataSource();
            element.then((val) => {
                ds.update(val);
            });
            const result = new SingularAurumElement(ds, createAPI(session));
            return result;
        }
        else if (element instanceof data_source_js_1.DataSource || element instanceof duplex_data_source_js_1.DuplexDataSource) {
            const result = new SingularAurumElement(element, createAPI(session));
            return result;
        }
        else if (element instanceof data_source_js_1.ArrayDataSource) {
            const result = new ArrayAurumElement(element, createAPI(session));
            return result;
        }
    }
    if (element[exports.aurumElementModelIdentitiy]) {
        const model = element;
        let api;
        //Optimization: skip creating API for no props basic html nodes because they are by far the most frequent and this can yield a noticable performance increase
        if (!model.isIntrinsic || model.props) {
            api = createAPI(session);
        }
        else {
            api = {
                renderSession: session
            };
        }
        if (!model.isIntrinsic && debug_mode_js_1.diagnosticMode) {
            console.log(`Rendering ${model.name}`);
            api.onAttach(() => {
                console.log(`Attaching ${model.name}`);
            });
            api.onDetach(() => {
                console.log(`Detaching ${model.name}`);
            });
        }
        let componentResult;
        if (model.isIntrinsic) {
            componentResult = model.factory(model.props, model.children, api);
        }
        else {
            componentResult = model.factory((_a = model.props) !== null && _a !== void 0 ? _a : {}, model.children, api);
        }
        return renderInternal(componentResult, session, prerendering);
    }
    // Unsupported types are returned as is in hope that a transclusion component will transform it into something compatible
    return element;
}
exports.renderInternal = renderInternal;
/**
 * @internal
 */
function createAPI(session) {
    let token = undefined;
    const api = {
        renderSession: session,
        synchronizeLifeCycle(lifeCycle) {
            api.onAttach(() => lifeCycle.onAttach());
            api.onDetach(() => lifeCycle.onDetach());
        },
        onAttach: (cb) => {
            session.attachCalls.push(cb);
        },
        onDetach: (cb) => {
            if (!token) {
                token = new cancellation_token_js_1.CancellationToken();
                session.tokens.push(token);
            }
            token.addCancelable(cb);
        },
        get cancellationToken() {
            if (!token) {
                token = new cancellation_token_js_1.CancellationToken();
                session.tokens.push(token);
            }
            return token;
        },
        prerender(target, lifeCycle) {
            const lc = lifeCycle;
            const subSession = createRenderSession();
            const result = renderInternal(target, subSession, true);
            lc.attach.subscribeOnce(() => {
                subSession.attachCalls.forEach((cb) => cb());
            });
            lc.detach.subscribeOnce(() => {
                lc.attach.cancelAll();
                subSession.sessionToken.cancel();
            });
            return result;
        },
        className(data) {
            return (0, classname_js_1.aurumClassName)(data, api.cancellationToken);
        }
    };
    return api;
}
exports.createAPI = createAPI;
class ArrayAurumElement extends AurumElement {
    constructor(dataSource, api) {
        super(dataSource, api);
        this.renderSessions = new WeakMap();
        this.dataSource = dataSource;
    }
    dispose() {
        if (this.disposed) {
            return;
        }
        this.api.cancellationToken.cancel();
        super.dispose();
    }
    attachToDom(node, index) {
        super.attachToDom(node, index);
        //@ts-ignore
        this.contentStartMarker.dataSource = this.dataSource;
        //@ts-ignore
        this.contentEndMarker.dataSource = this.dataSource;
    }
    render(dataSource) {
        dataSource.listenAndRepeat((n) => {
            if (!this.disposed) {
                this.handleNewContent(n);
            }
        }, this.api.cancellationToken);
    }
    spliceChildren(index, amount, ...newItems) {
        var _a;
        let removed;
        if (newItems) {
            removed = this.children.splice(index, amount, ...newItems);
        }
        else {
            removed = this.children.splice(index, amount);
        }
        for (const item of removed) {
            (_a = this.renderSessions.get(item)) === null || _a === void 0 ? void 0 : _a.sessionToken.cancel();
        }
    }
    handleNewContent(change) {
        if (this.hostNode === undefined) {
            throw new Error('illegal state: Aurum element was not attched to anything');
        }
        let optimized = false;
        const ac = [];
        switch (change.operationDetailed) {
            case 'merge':
                const source = change.previousState.slice();
                for (let i = 0; i < change.newState.length; i++) {
                    if (this.children.length <= i) {
                        const rendered = this.renderItem(change.newState[i], ac);
                        if (Array.isArray(rendered)) {
                            this.children.push(...rendered);
                        }
                        else {
                            this.children.push(rendered);
                        }
                        source.push(change.newState[i]);
                    }
                    else if (source[i] !== change.newState[i]) {
                        const index = source.indexOf(change.newState[i], i);
                        if (index !== -1) {
                            const a = this.children[i];
                            const b = this.children[index];
                            this.children[i] = b;
                            this.children[index] = a;
                            const c = source[i];
                            const d = source[index];
                            source[i] = d;
                            source[index] = c;
                        }
                        else {
                            const rendered = this.renderItem(change.newState[i], ac);
                            if (Array.isArray(rendered)) {
                                this.spliceChildren(i, 0, ...rendered);
                            }
                            else {
                                this.spliceChildren(i, 0, rendered);
                            }
                            source.splice(i, 0, change.newState[i]);
                        }
                    }
                }
                if (this.children.length > change.newState.length) {
                    this.spliceChildren(change.newState.length, this.children.length - change.newState.length);
                }
                break;
            case 'remove':
            case 'removeLeft':
            case 'removeRight':
                this.spliceChildren(flattenIndex(change.newState, change.index), flattenIndex(change.items, change.items.length));
                break;
            case 'append':
                let targetIndex = this.getLastIndex();
                optimized = true;
                for (const item of change.items) {
                    const rendered = this.renderItem(item, ac);
                    if (Array.isArray(rendered)) {
                        this.children = this.children.concat(rendered);
                        for (let i = 0; i <= rendered.length; i++) {
                            if (rendered[i]) {
                                if (rendered[i] instanceof AurumElement) {
                                    rendered[i].attachToDom(this.hostNode, targetIndex);
                                    this.lastEndIndex = this.getLastIndex();
                                    targetIndex = this.lastEndIndex;
                                }
                                else {
                                    this.hostNode.insertBefore(rendered[i], this.hostNode.childNodes[targetIndex]);
                                    this.lastEndIndex++;
                                    targetIndex++;
                                }
                            }
                        }
                    }
                    else {
                        this.children.push(rendered);
                        if (rendered) {
                            if (rendered instanceof AurumElement) {
                                rendered.attachToDom(this.hostNode, targetIndex);
                                this.lastEndIndex = this.getLastIndex();
                                targetIndex = this.lastEndIndex;
                            }
                            else {
                                this.hostNode.insertBefore(rendered, this.hostNode.childNodes[targetIndex]);
                                this.lastEndIndex++;
                                targetIndex++;
                            }
                        }
                    }
                }
                break;
            case 'replace':
                const rendered = this.renderItem(change.items[0], ac);
                if (Array.isArray(rendered)) {
                    throw new Error('illegal state');
                }
                else {
                    this.children[change.index] = rendered;
                }
                break;
            case 'swap':
                const itemA = this.children[change.index];
                const itemB = this.children[change.index2];
                if (itemA instanceof HTMLElement && itemB instanceof HTMLElement) {
                    optimized = true;
                    if (itemA.parentElement === itemB.parentElement) {
                        if (itemA.nextSibling === itemB) {
                            itemB.parentNode.insertBefore(itemB, itemA);
                            this.children[change.index2] = itemA;
                            this.children[change.index] = itemB;
                            break;
                        }
                        if (itemB.nextSibling === itemA) {
                            itemB.parentNode.insertBefore(itemA, itemB);
                            this.children[change.index2] = itemA;
                            this.children[change.index] = itemB;
                            break;
                        }
                    }
                    const parentA = itemA.parentNode;
                    const siblingA = itemA.nextSibling === itemB ? itemB : itemA.nextSibling;
                    itemB.parentNode.insertBefore(itemA, itemB);
                    parentA.insertBefore(itemB, siblingA);
                }
                this.children[change.index2] = itemA;
                this.children[change.index] = itemB;
                break;
            case 'prepend':
                for (let i = change.items.length - 1; i >= 0; i--) {
                    const item = change.items[i];
                    const rendered = this.renderItem(item, ac);
                    if (Array.isArray(rendered)) {
                        throw new Error('illegal state');
                    }
                    else {
                        this.children.unshift(rendered);
                    }
                }
                break;
            case 'insert':
                let index = change.index;
                for (const item of change.items) {
                    const rendered = this.renderItem(item, ac);
                    if (Array.isArray(rendered)) {
                        throw new Error('illegal state');
                    }
                    else {
                        this.children.splice(index, 0, rendered);
                        index += 1;
                    }
                }
                break;
            case 'clear':
                this.spliceChildren(0, this.children.length);
                this.renderSessions = new WeakMap();
                break;
            default:
                throw new Error('not implemented');
        }
        if (!optimized) {
            this.updateDom();
        }
        for (const c of ac) {
            c();
        }
    }
    renderItem(item, attachCalls) {
        if (item === null || item === undefined) {
            return;
        }
        const s = createRenderSession();
        const rendered = renderInternal(item, s);
        if (rendered === undefined || rendered === null) {
            return;
        }
        if (rendered instanceof AurumElement) {
            s.sessionToken.addCancelable(() => rendered.dispose());
        }
        this.renderSessions.set(rendered, s);
        attachCalls.push(...s.attachCalls);
        return rendered;
    }
}
exports.ArrayAurumElement = ArrayAurumElement;
function flattenIndex(source, index) {
    let flatIndex = 0;
    for (let i = 0; i < index; i++) {
        if (Array.isArray(source[i])) {
            flatIndex += flattenIndex(source[i], source[i].length);
        }
        else {
            flatIndex++;
        }
    }
    return flatIndex;
}
class SingularAurumElement extends AurumElement {
    constructor(dataSource, api) {
        super(dataSource, api);
        this.api.cancellationToken.addCancelable(() => { var _a; return (_a = this.renderSession) === null || _a === void 0 ? void 0 : _a.sessionToken.cancel(); });
        this.dataSource = dataSource;
    }
    dispose() {
        if (this.disposed) {
            return;
        }
        this.api.cancellationToken.cancel();
        super.dispose();
    }
    attachToDom(node, index) {
        super.attachToDom(node, index);
        //@ts-ignore
        this.contentStartMarker.dataSource = this.dataSource;
        //@ts-ignore
        this.contentEndMarker.dataSource = this.dataSource;
    }
    render(dataSource) {
        dataSource.listenAndRepeat((n) => {
            if (!this.disposed) {
                this.handleNewContent(n);
            }
        }, this.api.cancellationToken);
    }
    handleNewContent(newValue) {
        if (this.lastValue === newValue) {
            return;
        }
        let optimized = false;
        if (this.children.length === 1 && this.children[0] instanceof Text) {
            const type = typeof newValue;
            if (type === 'string' || type === 'bigint' || type === 'number' || type === 'boolean') {
                this.children[0].nodeValue = newValue;
                optimized = true;
            }
        }
        if (!optimized) {
            this.fullRebuild(newValue);
            this.updateDom();
            for (const cb of this.renderSession.attachCalls) {
                cb();
            }
        }
        this.lastValue = newValue;
    }
    fullRebuild(newValue) {
        this.clearContent();
        this.endSession();
        this.renderSession = createRenderSession();
        let rendered = renderInternal(newValue, this.renderSession);
        if (rendered === undefined) {
            this.children = [];
            return;
        }
        if (!Array.isArray(rendered)) {
            rendered = [rendered];
        }
        for (const item of rendered) {
            if (item instanceof AurumElement) {
                this.renderSession.sessionToken.addCancelable(() => {
                    item.dispose();
                });
            }
        }
        if (Array.isArray(rendered)) {
            this.children = rendered;
        }
    }
    endSession() {
        if (this.renderSession) {
            this.renderSession.sessionToken.cancel();
            this.renderSession = undefined;
        }
    }
}
exports.SingularAurumElement = SingularAurumElement;
//# sourceMappingURL=aurum_element.js.map

/***/ }),

/***/ "./node_modules/aurumjs/prebuilt/cjs/rendering/aurum_style.js":
/*!********************************************************************!*\
  !*** ./node_modules/aurumjs/prebuilt/cjs/rendering/aurum_style.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.css = void 0;
const data_source_js_1 = __webpack_require__(/*! ../stream/data_source.js */ "./node_modules/aurumjs/prebuilt/cjs/stream/data_source.js");
const duplex_data_source_js_1 = __webpack_require__(/*! ../stream/duplex_data_source.js */ "./node_modules/aurumjs/prebuilt/cjs/stream/duplex_data_source.js");
const stream_js_1 = __webpack_require__(/*! ../stream/stream.js */ "./node_modules/aurumjs/prebuilt/cjs/stream/stream.js");
const aurum_js_1 = __webpack_require__(/*! ../utilities/aurum.js */ "./node_modules/aurumjs/prebuilt/cjs/utilities/aurum.js");
const cancellation_token_js_1 = __webpack_require__(/*! ../utilities/cancellation_token.js */ "./node_modules/aurumjs/prebuilt/cjs/utilities/cancellation_token.js");
/**
 * Generates a style tag with the provided style as content, supports data sources, duplex data sources and streams instead of strings in the template.
 * Updates style content if any of the datasources used updates.
 */
function css(fragments, ...input) {
    const result = new data_source_js_1.DataSource();
    const token = new cancellation_token_js_1.CancellationToken();
    for (const ins of input) {
        if (ins instanceof data_source_js_1.DataSource || ins instanceof duplex_data_source_js_1.DuplexDataSource || ins instanceof stream_js_1.Stream) {
            ins.listen(() => result.update(recompute(fragments, input)), token);
        }
    }
    result.update(recompute(fragments, input));
    return aurum_js_1.Aurum.factory('style', {
        onDetach: () => token.cancel()
    }, result);
}
exports.css = css;
function recompute(fragments, input) {
    let result = '';
    for (let i = 0; i < fragments.length; i++) {
        result += fragments[i];
        if (input[i]) {
            if (input[i] instanceof data_source_js_1.DataSource || input[i] instanceof duplex_data_source_js_1.DuplexDataSource || input[i] instanceof stream_js_1.Stream) {
                result += input[i].value;
            }
            else {
                result += input[i];
            }
        }
    }
    return result;
}
//# sourceMappingURL=aurum_style.js.map

/***/ }),

/***/ "./node_modules/aurumjs/prebuilt/cjs/rendering/webcomponent.js":
/*!*********************************************************************!*\
  !*** ./node_modules/aurumjs/prebuilt/cjs/rendering/webcomponent.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Webcomponent = void 0;
const aurum_js_1 = __webpack_require__(/*! ../utilities/aurum.js */ "./node_modules/aurumjs/prebuilt/cjs/utilities/aurum.js");
const aurum_element_js_1 = __webpack_require__(/*! ./aurum_element.js */ "./node_modules/aurumjs/prebuilt/cjs/rendering/aurum_element.js");
const data_source_js_1 = __webpack_require__(/*! ../stream/data_source.js */ "./node_modules/aurumjs/prebuilt/cjs/stream/data_source.js");
const dom_adapter_js_1 = __webpack_require__(/*! ../builtin_components/dom_adapter.js */ "./node_modules/aurumjs/prebuilt/cjs/builtin_components/dom_adapter.js");
/**
 * Wrapper around native web components allows using aurum style component structure to create native components.
 */
function Webcomponent(config, logic) {
    customElements.define(config.name, class extends HTMLElement {
        constructor() {
            super();
            if (config.observedAttributes === undefined) {
                config.observedAttributes = [];
            }
            this.props = {};
            for (const attr of config.observedAttributes) {
                this.props[attr] = new data_source_js_1.DataSource();
            }
        }
        static get observedAttributes() {
            return config.observedAttributes;
        }
        attributeChangedCallback(name, oldValue, newValue) {
            if (oldValue !== newValue) {
                this.props[name].update(newValue);
            }
        }
        connectedCallback() {
            var _a;
            const template = document.createDocumentFragment();
            this.session = (0, aurum_element_js_1.createRenderSession)();
            this.api = (0, aurum_element_js_1.createAPI)(this.session);
            const content = logic(this.props, this.api);
            for (const cb of this.session.attachCalls) {
                cb();
            }
            aurum_js_1.Aurum.attach(content, template);
            this.attachShadow({
                mode: (_a = config.shadowRootMode) !== null && _a !== void 0 ? _a : 'open',
                delegatesFocus: config.shadowRootDelegatesFocus
            }).appendChild(template);
        }
        disconnectedCallback() {
            this.session.sessionToken.cancel();
        }
    });
    return (0, dom_adapter_js_1.DomNodeCreator)(config.name, config.observedAttributes, undefined, (node, props) => {
        for (const key in props) {
            //@ts-ignore
            if (!(key in node.props)) {
                //@ts-ignore
                node.props[key] = props[key];
            }
        }
    });
}
exports.Webcomponent = Webcomponent;
//# sourceMappingURL=webcomponent.js.map

/***/ }),

/***/ "./node_modules/aurumjs/prebuilt/cjs/stream/data_source.js":
/*!*****************************************************************!*\
  !*** ./node_modules/aurumjs/prebuilt/cjs/stream/data_source.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SetDataSource = exports.MapDataSource = exports.processTransform = exports.FilteredArrayView = exports.SortedArrayView = exports.UniqueArrayView = exports.SlicedArrayView = exports.ReversedArrayView = exports.MappedArrayView = exports.FlattenedArrayView = exports.ArrayDataSource = exports.DataSource = void 0;
const aurumjs_js_1 = __webpack_require__(/*! ../aurumjs.js */ "./node_modules/aurumjs/prebuilt/cjs/aurumjs.js");
const aurum_server_client_js_1 = __webpack_require__(/*! ../aurum_server/aurum_server_client.js */ "./node_modules/aurumjs/prebuilt/cjs/aurum_server/aurum_server_client.js");
const debug_mode_js_1 = __webpack_require__(/*! ../debug_mode.js */ "./node_modules/aurumjs/prebuilt/cjs/debug_mode.js");
const cancellation_token_js_1 = __webpack_require__(/*! ../utilities/cancellation_token.js */ "./node_modules/aurumjs/prebuilt/cjs/utilities/cancellation_token.js");
const event_emitter_js_1 = __webpack_require__(/*! ../utilities/event_emitter.js */ "./node_modules/aurumjs/prebuilt/cjs/utilities/event_emitter.js");
const data_source_operators_js_1 = __webpack_require__(/*! ./data_source_operators.js */ "./node_modules/aurumjs/prebuilt/cjs/stream/data_source_operators.js");
const duplex_data_source_js_1 = __webpack_require__(/*! ./duplex_data_source.js */ "./node_modules/aurumjs/prebuilt/cjs/stream/duplex_data_source.js");
const operator_model_js_1 = __webpack_require__(/*! ./operator_model.js */ "./node_modules/aurumjs/prebuilt/cjs/stream/operator_model.js");
const stream_js_1 = __webpack_require__(/*! ./stream.js */ "./node_modules/aurumjs/prebuilt/cjs/stream/stream.js");
/**
 * Datasources wrap a value and allow you to update it in an observable way. Datasources can be manipulated like streams and can be bound directly in the JSX syntax and will update the html whenever the value changes
 */
class DataSource {
    constructor(initialValue, name = 'RootDataSource') {
        this.name = name;
        this.value = initialValue;
        if (debug_mode_js_1.debugMode) {
            (0, debug_mode_js_1.debugRegisterStream)(this, new Error().stack);
        }
        this.primed = initialValue !== undefined;
        this.errorEvent = new event_emitter_js_1.EventEmitter();
        this.updateEvent = new event_emitter_js_1.EventEmitter();
    }
    toString() {
        return this.value.toString();
    }
    static toDataSource(value) {
        if (value instanceof DataSource) {
            return value;
        }
        else {
            return new DataSource(value);
        }
    }
    static fromEvent(event, cancellation) {
        const result = new DataSource();
        event.subscribe((v) => result.update(v), cancellation);
        return result;
    }
    /**
     * Connects to an aurum-server exposed datasource. View https://github.com/CyberPhoenix90/aurum-server for more information
     * Note that type safety is not guaranteed. Whatever the server sends as an update will be propagated
     * @param  {AurumServerInfo} aurumServerInfo
     * @returns DataSource
     */
    static fromRemoteSource(aurumServerInfo, cancellation) {
        const result = new DataSource();
        (0, aurum_server_client_js_1.syncDataSource)(result, aurumServerInfo, cancellation);
        return result;
    }
    static fromMultipleSources(sources, cancellation) {
        const result = new DataSource();
        for (const s of sources) {
            if (debug_mode_js_1.debugMode) {
                (0, debug_mode_js_1.debugRegisterLink)(s, result);
            }
            s.listenInternal((v) => result.update(v), cancellation);
        }
        result.name = `Combination of [${sources.map((v) => v.name).join(' & ')}]`;
        return result;
    }
    /**
     * Allows tapping into the stream and calls a function for each value.
     */
    tap(callback, cancellationToken) {
        this.listen((value) => {
            callback(value);
        }, cancellationToken);
        return this;
    }
    /**
     * Assign a function to handle errors and map them back to regular values. Rethrow the error in case you want to fallback to emitting error
     */
    handleErrors(callback) {
        this.errorHandler = callback;
        return this;
    }
    onError(callback, cancellationToken) {
        this.errorEvent.subscribe(callback, cancellationToken);
        return this;
    }
    emitError(e) {
        if (this.errorHandler) {
            try {
                return this.update(this.errorHandler(e));
            }
            catch (newError) {
                e = newError;
            }
        }
        if (this.errorEvent.hasSubscriptions()) {
            this.errorEvent.fire(e);
        }
        else {
            throw e;
        }
    }
    /**
     * Updates with the same value as the last value
     */
    repeatLast() {
        this.update(this.value);
        return this;
    }
    /**
     * Updates the value in the data source and calls the listen callback for all listeners
     * @param newValue new value for the data source
     */
    update(newValue) {
        this.primed = true;
        if (this.updating) {
            throw new Error('Problem in data source: Unstable value propagation. When updating a value the stream was updated back as a direct response. This can lead to infinite loops and is therefore not allowed');
        }
        this.updating = true;
        this.value = newValue;
        this.updateEvent.fire(newValue);
        if (debug_mode_js_1.debugMode) {
            (0, debug_mode_js_1.debugDeclareUpdate)(this, newValue, new Error().stack);
        }
        this.updating = false;
    }
    /**
     * Updates the data source with a value if it has never had a value before
     */
    withInitial(value) {
        if (!this.primed) {
            this.update(value);
        }
        return this;
    }
    /**
     * Same as listen but will immediately call the callback with the current value first
     * @param callback Callback to call when value is updated
     * @param cancellationToken Optional token to control the cancellation of the subscription
     * @returns Cancellation callback, can be used to cancel subscription without a cancellation token
     */
    listenAndRepeat(callback, cancellationToken) {
        if (this.primed) {
            callback(this.value);
        }
        return this.listen(callback, cancellationToken);
    }
    listenAndRepeatInternal(callback, cancellationToken, parent) {
        callback(this.value);
        return this.listenInternal(callback, cancellationToken, parent);
    }
    /**
     * Subscribes to the updates of the data stream
     * @param callback Callback to call when value is updated
     * @param cancellationToken Optional token to control the cancellation of the subscription
     * @returns Cancellation callback, can be used to cancel subscription without a cancellation token
     */
    listen(callback, cancellationToken) {
        if (debug_mode_js_1.debugMode) {
            (0, debug_mode_js_1.debugRegisterConsumer)(this, callback.toString(), new Error().stack);
        }
        return this.listenInternal(callback, cancellationToken);
    }
    listenInternal(callback, cancellationToken, parent) {
        const cancel = this.updateEvent.subscribe(callback, cancellationToken).cancel;
        return cancel;
    }
    /**
     * Subscribes to the updates of the data stream for a single update
     * @param callback Callback to call when value is updated
     * @param cancellationToken Optional token to control the cancellation of the subscription
     * @returns Cancellation callback, can be used to cancel subscription without a cancellation token
     */
    listenOnce(callback, cancellationToken) {
        return this.updateEvent.subscribeOnce(callback, cancellationToken).cancel;
    }
    transform(operationA, operationB, operationC, operationD, operationE, operationF, operationG, operationH, operationI, operationJ, operationK, cancellationToken) {
        let token;
        const operations = [
            operationA,
            operationB,
            operationC,
            operationD,
            operationE,
            operationF,
            operationG,
            operationH,
            operationI,
            operationJ,
            operationK
        ].filter((e) => e && (e instanceof cancellation_token_js_1.CancellationToken ? ((token = e), false) : true));
        if (cancellationToken) {
            token = cancellationToken;
        }
        const result = new DataSource(undefined, this.name + ' ' + operations.map((v) => v.name).join(' '));
        if (debug_mode_js_1.debugMode) {
            (0, debug_mode_js_1.debugRegisterLink)(this, result);
        }
        (this.primed ? this.listenAndRepeatInternal : this.listenInternal).call(this, processTransform(operations, result), token);
        this.onError((e) => result.emitError(e), token);
        return result;
    }
    static fromAggregation(sources, combinator, cancellationToken) {
        var _a;
        cancellationToken = cancellationToken !== null && cancellationToken !== void 0 ? cancellationToken : new cancellation_token_js_1.CancellationToken();
        const aggregatedSource = new DataSource(combinator(...sources.map((s) => s === null || s === void 0 ? void 0 : s.value)));
        for (let i = 0; i < sources.length; i++) {
            (_a = sources[i]) === null || _a === void 0 ? void 0 : _a.listen(() => {
                aggregatedSource.update(combinator(...sources.map((s) => s === null || s === void 0 ? void 0 : s.value)));
            }, cancellationToken);
        }
        return aggregatedSource;
    }
    aggregate(otherSources, combinator, cancellationToken) {
        var _a;
        cancellationToken = cancellationToken !== null && cancellationToken !== void 0 ? cancellationToken : new cancellation_token_js_1.CancellationToken();
        const aggregatedSource = new DataSource(combinator(this.value, ...otherSources.map((s) => s === null || s === void 0 ? void 0 : s.value)));
        for (let i = 0; i < otherSources.length; i++) {
            (_a = otherSources[i]) === null || _a === void 0 ? void 0 : _a.listen(() => {
                aggregatedSource.update(combinator(this.value, ...otherSources.map((s) => s === null || s === void 0 ? void 0 : s.value)));
            }, cancellationToken);
        }
        this.listen(() => aggregatedSource.update(combinator(this.value, ...otherSources.map((s) => s === null || s === void 0 ? void 0 : s.value))), cancellationToken);
        return aggregatedSource;
    }
    /**
     * Forwards all updates from this source to another
     * @param targetDataSource datasource to pipe the updates to
     * @param cancellationToken  Cancellation token to cancel the subscription the target datasource has to this datasource
     */
    pipe(targetDataSource, cancellationToken) {
        this.listen((v) => targetDataSource.update(v), cancellationToken);
        return this;
    }
    /**
     * Like aggregate except that it aggregates an array data source of datasources
     * @param data Second parent for the new source
     * @param cancellationToken  Cancellation token to cancel the subscriptions the new datasource has to the two parent datasources
     */
    static dynamicAggregation(data, aggregate, cancellationToken) {
        cancellationToken = cancellationToken !== null && cancellationToken !== void 0 ? cancellationToken : new cancellation_token_js_1.CancellationToken();
        const session = new WeakMap();
        const result = new DataSource();
        data.listenAndRepeat((change) => {
            for (const item of change.items) {
                listenToSubSource(item);
            }
            result.update(aggregate(data.getData().map((e) => e.value)));
        });
        data.onItemsAdded.subscribe((items) => {
            for (const item of items) {
                listenToSubSource(item);
            }
        });
        data.onItemsRemoved.subscribe((items) => {
            for (const item of items) {
                session.get(item).cancel();
                session.delete(item);
            }
        });
        return result;
        function listenToSubSource(item) {
            session.set(item, new cancellation_token_js_1.CancellationToken());
            item.listen(() => {
                result.update(aggregate(data.getData().map((e) => e.value)));
            }, session.get(item));
        }
    }
    /**
     * Like aggregate except that no combination method is needed as a result both parents must have the same type and the new stream just exposes the last update recieved from either parent
     * @param otherSource Second parent for the new source
     * @param cancellationToken  Cancellation token to cancel the subscriptions the new datasource has to the two parent datasources
     */
    combine(otherSources, cancellationToken) {
        cancellationToken = cancellationToken !== null && cancellationToken !== void 0 ? cancellationToken : new cancellation_token_js_1.CancellationToken();
        let combinedDataSource;
        if (this.primed) {
            combinedDataSource = new DataSource(this.value);
        }
        else {
            combinedDataSource = new DataSource();
        }
        this.pipe(combinedDataSource, cancellationToken);
        for (const otherSource of otherSources) {
            otherSource.pipe(combinedDataSource, cancellationToken);
        }
        return combinedDataSource;
    }
    /**
     * Returns a promise that resolves when the next update occurs
     * @param cancellationToken
     */
    awaitNextUpdate(cancellationToken) {
        return new Promise((resolve) => {
            this.listenOnce((value) => resolve(value), cancellationToken);
        });
    }
    /**
     * Remove all listeners
     */
    cancelAll() {
        this.updateEvent.cancelAll();
    }
}
exports.DataSource = DataSource;
class ArrayDataSource {
    constructor(initialData, name = 'RootArrayDataSource') {
        this.onItemsAdded = new event_emitter_js_1.EventEmitter();
        this.onItemsRemoved = new event_emitter_js_1.EventEmitter();
        this.name = name;
        if (initialData) {
            this.data = initialData.slice();
        }
        else {
            this.data = [];
        }
        this.lengthSource = new DataSource(this.data.length, this.name + '.length');
        this.updateEvent = new event_emitter_js_1.EventEmitter();
    }
    *[Symbol.iterator]() {
        yield* this.getData();
        return;
    }
    toSetDataSource(cancellationToken) {
        const result = new SetDataSource();
        this.listenAndRepeat((change) => {
            switch (change.operation) {
                case 'add':
                    for (const item of change.items) {
                        result.add(item);
                    }
                    break;
                case 'remove':
                    for (const item of change.items) {
                        if (!this.includes(item)) {
                            result.delete(item);
                        }
                    }
                    break;
                case 'replace':
                    if (!this.includes(change.target)) {
                        result.delete(change.target);
                    }
                    for (const item of change.items) {
                        result.add(item);
                    }
                    break;
                case 'merge':
                    result.clear();
                    for (const item of change.items) {
                        result.add(item);
                    }
                    break;
            }
        }, cancellationToken);
        return result;
    }
    toString() {
        return this.data.toString();
    }
    static fromFetchText(response, config = { itemSeperatorSequence: '\n' }) {
        const decoder = new TextDecoder('utf-8');
        const stream = new ArrayDataSource();
        const { onComplete, itemSeperatorSequence } = config;
        let buffer = '';
        const readerStream = response.body.getReader();
        function read(reader) {
            reader.read().then(({ done, value }) => {
                if (!done) {
                    const data = (buffer + decoder.decode(value)).split(itemSeperatorSequence);
                    buffer = data.splice(data.length - 1, 1)[0];
                    stream.appendArray(data);
                    read(reader);
                }
                else {
                    if (buffer.length) {
                        stream.push(buffer);
                    }
                    onComplete === null || onComplete === void 0 ? void 0 : onComplete();
                }
            });
        }
        read(readerStream);
        return stream;
    }
    static fromFetchJSON(response, config = {
        itemSeperatorSequence: '\n'
    }) {
        const decoder = new TextDecoder('utf-8');
        const stream = new ArrayDataSource();
        const { onParseError, onComplete, itemSeperatorSequence } = config;
        let buffer = '';
        const readerStream = response.body.getReader();
        function read(reader) {
            reader.read().then(({ done, value }) => {
                if (!done) {
                    const data = (buffer + decoder.decode(value)).split(itemSeperatorSequence);
                    buffer = data.splice(data.length - 1, 1)[0];
                    for (const item of data) {
                        parseAndPush(item);
                    }
                    read(reader);
                }
                else {
                    if (buffer.length) {
                        parseAndPush(buffer);
                    }
                    onComplete === null || onComplete === void 0 ? void 0 : onComplete();
                }
            });
        }
        read(readerStream);
        function parseAndPush(item) {
            try {
                stream.push(JSON.parse(item));
            }
            catch (e) {
                try {
                    stream.push(onParseError(item));
                }
                catch (e) {
                    // Ignore item if it can't be parsed and/or no error handler is provided
                }
            }
        }
        return stream;
    }
    /**
     * Connects to an aurum-server exposed array datasource. View https://github.com/CyberPhoenix90/aurum-server for more information
     * Note that type safety is not guaranteed. Whatever the server sends as an update will be propagated
     * @param  {AurumServerInfo} aurumServerInfo
     * @returns DataSource
     */
    static fromRemoteSource(aurumServerInfo, cancellation) {
        const result = new ArrayDataSource();
        (0, aurum_server_client_js_1.syncArrayDataSource)(result, aurumServerInfo, cancellation);
        return result;
    }
    static fromMultipleSources(sources, cancellationToken) {
        var _a;
        const boundaries = [0];
        const result = new ArrayDataSource(undefined, `ArrayDataSource of (${sources.reduce((p, c) => p + (c instanceof ArrayDataSource ? c.name + ' ' : ''), '')})`);
        for (let i = 0; i < sources.length; i++) {
            const item = sources[i];
            if (Array.isArray(item)) {
                result.appendArray(item);
            }
            else if (item instanceof DataSource || item instanceof duplex_data_source_js_1.DuplexDataSource || item instanceof stream_js_1.Stream) {
                let index = i;
                item.transform((0, data_source_operators_js_1.dsDiff)(), (0, data_source_operators_js_1.dsTap)(({ newValue, oldValue }) => {
                    let sizeDiff = 0;
                    let oldSize = 0;
                    let newSize = 0;
                    if (Array.isArray(oldValue)) {
                        oldSize = oldValue.length;
                        sizeDiff -= oldValue.length;
                    }
                    else if (oldValue !== undefined) {
                        oldSize = 1;
                        sizeDiff--;
                    }
                    if (Array.isArray(newValue)) {
                        sizeDiff += newValue.length;
                        newSize = newValue.length;
                    }
                    else if (newValue !== undefined) {
                        sizeDiff++;
                        newSize = 1;
                    }
                    if (Array.isArray(newValue)) {
                        for (let i = 0; i < newValue.length; i++) {
                            if (i < oldSize) {
                                result.set(boundaries[index] + i, newValue[i]);
                            }
                            else {
                                result.insertAt(boundaries[index] + i, newValue[i]);
                            }
                        }
                    }
                    else if (newValue !== undefined) {
                        if (newSize <= oldSize) {
                            result.set(boundaries[index], newValue);
                        }
                        else {
                            result.insertAt(boundaries[index], newValue);
                        }
                    }
                    for (let i = 0; i < oldSize - newSize; i++) {
                        result.removeAt(boundaries[index] + newSize);
                    }
                    for (let i = index + 1; i < boundaries.length; i++) {
                        boundaries[i] += sizeDiff;
                    }
                }), cancellationToken);
            }
            else {
                result.appendArray((_a = sources[i].data) !== null && _a !== void 0 ? _a : []);
                let index = i;
                sources[i].listen((change) => {
                    switch (change.operationDetailed) {
                        case 'append':
                        case 'prepend':
                        case 'insert':
                            result.insertAt(change.index + boundaries[index], ...change.items);
                            for (let i = index + 1; i < boundaries.length; i++) {
                                boundaries[i] += change.count;
                            }
                            break;
                        case 'remove':
                        case 'removeLeft':
                        case 'removeRight':
                        case 'clear':
                            result.removeRange(change.index + boundaries[index], change.index + boundaries[index] + change.count);
                            for (let i = index + 1; i < boundaries.length; i++) {
                                boundaries[i] -= change.count;
                            }
                            break;
                        case 'merge':
                            const lengthDiff = change.newState.length + change.previousState.length;
                            result.removeRange(change.index + boundaries[index], change.index + boundaries[index] + change.previousState.length);
                            result.insertAt(change.index + boundaries[index], ...change.newState);
                            if (lengthDiff != 0) {
                                for (let i = index + 1; i < boundaries.length; i++) {
                                    boundaries[i] += lengthDiff;
                                }
                            }
                            break;
                        case 'replace':
                            result.set(change.index + boundaries[index], change.items[0]);
                            break;
                        case 'swap':
                            result.swap(change.index + boundaries[index], change.index2 + boundaries[index]);
                            break;
                    }
                }, cancellationToken);
            }
            boundaries.push(result.length.value);
        }
        return result;
    }
    /**
     * Creates a new array data source where the type T is no longer wrapped by a DataSource however the values of these data sources are observed on the parent
     * array data source and changes are forwarded to the new array data source through array mutations. This makes it possible to use view methods such as map and filter
     * on the raw data instead of on data sources to cover highly dynamic use cases
     */
    static DynamicArrayDataSourceToArrayDataSource(arrayDataSource, cancellation) {
        const result = new ArrayDataSource();
        const session = new WeakMap();
        arrayDataSource.listenAndRepeat(({ operationDetailed, index, index2, count, items, previousState, newState, target }) => {
            switch (operationDetailed) {
                case 'append':
                    for (const item of items) {
                        listenToItem(item);
                    }
                    result.appendArray(items.map((item) => (0, aurumjs_js_1.getValueOf)(item)));
                    break;
                case 'prepend':
                    for (const item of items) {
                        listenToItem(item);
                    }
                    result.unshift(...items.map((item) => (0, aurumjs_js_1.getValueOf)(item)));
                    break;
                case 'merge':
                    for (const item of previousState) {
                        stopLitenToItem(item);
                    }
                    for (const item of newState) {
                        listenToItem(item);
                    }
                    result.merge(newState.map((i) => (0, aurumjs_js_1.getValueOf)(i)));
                    break;
                case 'insert':
                    for (const item of items) {
                        listenToItem(item);
                    }
                    result.insertAt(index, ...items.map((item) => (0, aurumjs_js_1.getValueOf)(item)));
                    break;
                case 'clear':
                    for (const item of previousState) {
                        stopLitenToItem(item);
                    }
                    result.clear();
                    break;
                case 'remove':
                    for (const item of items) {
                        stopLitenToItem(item);
                    }
                    result.removeRange(index, index + count);
                    break;
                case 'removeLeft':
                    for (const item of items) {
                        stopLitenToItem(item);
                    }
                    result.removeLeft(count);
                    break;
                case 'removeRight':
                    for (const item of items) {
                        stopLitenToItem(item);
                    }
                    result.removeRight(count);
                    break;
                case 'replace':
                    stopLitenToItem(target);
                    listenToItem(items[0]);
                    result.set(index, (0, aurumjs_js_1.getValueOf)(items[0]));
                    break;
                case 'swap':
                    result.swap(index, index2);
                    break;
            }
        }, cancellation);
        return result;
        function listenToItem(item) {
            if (!('listen' in item)) {
                return;
            }
            session.set(item, new cancellation_token_js_1.CancellationToken());
            cancellation.chain(session.get(item));
            item.listen((value) => {
                result.set(arrayDataSource.indexOf(item), value);
            }, session.get(item));
        }
        function stopLitenToItem(item) {
            if (session.has(item)) {
                session.get(item).cancel();
                session.delete(item);
            }
        }
    }
    static toArrayDataSource(value) {
        if (value instanceof ArrayDataSource) {
            return value;
        }
        else {
            return new ArrayDataSource(value);
        }
    }
    pipe(target, cancellation) {
        this.listenAndRepeat((c) => target.applyCollectionChange(c), cancellation);
    }
    /**
     * Remove all listeners
     */
    cancelAll() {
        this.onItemsAdded.cancelAll();
        this.onItemsRemoved.cancelAll();
        this.updateEvent.cancelAll();
    }
    /**
     * Same as listen but will immediately call the callback with an append of all existing elements first
     */
    listenAndRepeat(callback, cancellationToken) {
        if (this.data.length) {
            callback({
                operation: 'add',
                operationDetailed: 'append',
                index: 0,
                items: this.data,
                newState: this.data,
                count: this.data.length
            });
        }
        return this.listen(callback, cancellationToken);
    }
    /**
     * Sends a reset signal followed by an append with all items signal. This will force all the views of this source the synchronize can be useful in case your views rely on non pure transformation functions.
     */
    repeatCurrentState() {
        this.update({
            operation: 'remove',
            operationDetailed: 'clear',
            count: this.data.length,
            index: 0,
            items: this.data,
            newState: []
        });
        this.update({
            operation: 'add',
            operationDetailed: 'append',
            index: 0,
            items: this.data,
            newState: this.data,
            count: this.data.length
        });
    }
    listen(callback, cancellationToken) {
        return this.updateEvent.subscribe(callback, cancellationToken).cancel;
    }
    listenOnce(callback, cancellationToken) {
        return this.updateEvent.subscribeOnce(callback, cancellationToken).cancel;
    }
    /**
     * Applies the changes described in the colleciton change to the array. Useful for synchronizing array data sources over the network or workers by serializing the changes and sending them over
     * @param collectionChange
     */
    applyCollectionChange(collectionChange) {
        switch (collectionChange.operationDetailed) {
            case 'append':
                this.appendArray(collectionChange.items);
                break;
            case 'clear':
                this.clear();
                break;
            case 'insert':
                this.insertAt(collectionChange.index, ...collectionChange.items);
                break;
            case 'merge':
                this.merge(collectionChange.items);
                break;
            case 'prepend':
                this.unshift(...collectionChange.items);
                break;
            case 'remove':
                this.removeRange(collectionChange.index, collectionChange.index + collectionChange.count);
                break;
            case 'removeLeft':
                this.removeLeft(collectionChange.count);
                break;
            case 'removeRight':
                this.removeRight(collectionChange.count);
                break;
            case 'replace':
                this.set(collectionChange.index, collectionChange.items[0]);
                break;
            case 'swap':
                this.swap(collectionChange.index, collectionChange.index2);
                break;
        }
    }
    /**
     * Returns a promise that resolves when the next update occurs
     * @param cancellationToken
     */
    awaitNextUpdate(cancellationToken) {
        return new Promise((resolve) => {
            this.listenOnce((value) => resolve(value), cancellationToken);
        });
    }
    get length() {
        return this.lengthSource;
    }
    getData() {
        return this.data;
    }
    get(index) {
        return this.data[index];
    }
    set(index, item) {
        const old = this.data[index];
        if (old === item) {
            return;
        }
        this.data[index] = item;
        this.update({ operation: 'replace', operationDetailed: 'replace', target: old, count: 1, index, items: [item], newState: this.data });
        this.onItemsRemoved.fire([old]);
        this.onItemsAdded.fire([item]);
        if (this.lengthSource.value !== this.data.length) {
            this.lengthSource.update(this.data.length);
        }
    }
    indexOf(item) {
        return this.data.indexOf(item);
    }
    find(predicate, thisArg) {
        return this.data.find(predicate, thisArg);
    }
    findIndex(predicate, thisArg) {
        return this.data.findIndex(predicate, thisArg);
    }
    lastIndexOf(item) {
        return this.data.lastIndexOf(item);
    }
    includes(item) {
        return this.data.includes(item);
    }
    replace(item, newItem) {
        const index = this.indexOf(item);
        if (index !== -1) {
            this.set(index, newItem);
        }
    }
    swap(indexA, indexB) {
        if (indexA === indexB) {
            return;
        }
        const itemA = this.data[indexA];
        const itemB = this.data[indexB];
        this.data[indexB] = itemA;
        this.data[indexA] = itemB;
        this.update({ operation: 'swap', operationDetailed: 'swap', index: indexA, index2: indexB, items: [itemA, itemB], newState: this.data });
        if (this.lengthSource.value !== this.data.length) {
            this.lengthSource.update(this.data.length);
        }
    }
    swapItems(itemA, itemB) {
        if (itemA === itemB) {
            return;
        }
        const indexA = this.data.indexOf(itemA);
        const indexB = this.data.indexOf(itemB);
        if (indexA !== -1 && indexB !== -1) {
            this.data[indexB] = itemA;
            this.data[indexA] = itemB;
        }
        this.update({ operation: 'swap', operationDetailed: 'swap', index: indexA, index2: indexB, items: [itemA, itemB], newState: this.data });
        if (this.lengthSource.value !== this.data.length) {
            this.lengthSource.update(this.data.length);
        }
    }
    appendArray(items) {
        if (!items || items.length === 0) {
            return;
        }
        if (items.length <= 65000) {
            //Push is significantly faster than concat but it is limited to 65535 items in one push
            this.data.push.apply(this.data, items);
        }
        else {
            console.warn('Appending over 65000 items in one go can lead to performance issues. Consider streaming your changes progressively');
            this.data = this.data.concat(items);
        }
        if (this.lengthSource.value !== this.data.length) {
            this.lengthSource.update(this.data.length);
        }
        this.update({
            operation: 'add',
            operationDetailed: 'append',
            count: items.length,
            index: this.data.length - items.length,
            items,
            newState: this.data
        });
        this.onItemsAdded.fire(items);
    }
    splice(index, deleteCount, ...insertion) {
        let removed = [];
        if (deleteCount > 0) {
            removed = this.removeAt(index, deleteCount);
        }
        if (insertion && insertion.length > 0) {
            this.insertAt(index, ...insertion);
        }
        return removed;
    }
    insertAt(index, ...items) {
        if (items.length === 0) {
            return;
        }
        this.data.splice(index, 0, ...items);
        this.update({
            operation: 'add',
            operationDetailed: 'insert',
            count: items.length,
            index,
            items,
            newState: this.data
        });
        this.onItemsAdded.fire(items);
        this.lengthSource.update(this.data.length);
    }
    push(...items) {
        this.appendArray(items);
    }
    unshift(...items) {
        this.data.unshift(...items);
        if (this.lengthSource.value !== this.data.length) {
            this.lengthSource.update(this.data.length);
        }
        this.update({ operation: 'add', operationDetailed: 'prepend', count: items.length, items, index: 0, newState: this.data });
        this.onItemsAdded.fire(items);
    }
    pop() {
        //This could technically just call removeRight(1) but removeRight is based on splicing which creates a new array so this can be significantly faster
        const item = this.data.pop();
        if (this.lengthSource.value !== this.data.length) {
            this.lengthSource.update(this.data.length);
        }
        this.update({
            operation: 'remove',
            operationDetailed: 'removeRight',
            count: 1,
            index: this.data.length,
            items: [item],
            newState: this.data
        });
        this.onItemsRemoved.fire([item]);
        return item;
    }
    merge(newData) {
        if (newData.length === 0) {
            return this.clear();
        }
        if (newData === this.data) {
            return;
        }
        const old = this.data;
        this.data = newData.slice();
        if (this.lengthSource.value !== this.data.length) {
            this.lengthSource.update(this.data.length);
        }
        this.update({
            operation: 'merge',
            operationDetailed: 'merge',
            previousState: old,
            index: 0,
            items: this.data,
            newState: this.data
        });
        this.onItemsRemoved.fire(old);
        this.onItemsAdded.fire(this.data);
    }
    removeRight(count) {
        const length = this.data.length;
        const result = this.data.splice(length - count, count);
        if (this.lengthSource.value !== this.data.length) {
            this.lengthSource.update(this.data.length);
        }
        this.update({ operation: 'remove', operationDetailed: 'removeRight', count, index: length - count, items: result, newState: this.data });
        this.onItemsRemoved.fire(result);
        return result;
    }
    removeLeft(count) {
        const removed = this.data.splice(0, count);
        if (this.lengthSource.value !== this.data.length) {
            this.lengthSource.update(this.data.length);
        }
        this.update({ operation: 'remove', operationDetailed: 'removeLeft', count, index: 0, items: removed, newState: this.data });
        this.onItemsRemoved.fire(removed);
    }
    removeAt(index, count = 1) {
        const removed = this.data.splice(index, count);
        this.update({ operation: 'remove', operationDetailed: 'remove', count: removed.length, index, items: removed, newState: this.data });
        this.onItemsRemoved.fire(removed);
        if (this.lengthSource.value !== this.data.length) {
            this.lengthSource.update(this.data.length);
        }
        return removed;
    }
    removeRange(start, end) {
        const removed = this.data.splice(start, end - start);
        if (this.lengthSource.value !== this.data.length) {
            this.lengthSource.update(this.data.length);
        }
        this.update({ operation: 'remove', operationDetailed: 'remove', count: removed.length, index: start, items: removed, newState: this.data });
        this.onItemsRemoved.fire(removed);
        return removed;
    }
    remove(item) {
        const index = this.data.indexOf(item);
        if (index !== -1) {
            return this.removeAt(index)[0];
        }
        else {
            return undefined;
        }
    }
    clear() {
        if (this.data.length === 0) {
            return;
        }
        const items = this.data;
        this.data = [];
        if (this.lengthSource.value !== this.data.length) {
            this.lengthSource.update(this.data.length);
        }
        this.update({
            operation: 'remove',
            operationDetailed: 'clear',
            count: items.length,
            index: 0,
            items,
            previousState: items,
            newState: this.data
        });
        this.onItemsRemoved.fire(items);
    }
    some(cb) {
        return this.data.some(cb);
    }
    every(cb) {
        return this.data.every(cb);
    }
    shift() {
        const item = this.data.shift();
        if (this.lengthSource.value !== this.data.length) {
            this.lengthSource.update(this.data.length);
        }
        this.update({ operation: 'remove', operationDetailed: 'removeLeft', items: [item], count: 1, index: 0, newState: this.data });
        this.onItemsRemoved.fire([item]);
        return item;
    }
    toArray() {
        return this.data.slice();
    }
    flat(cancellationToken, config) {
        const view = new FlattenedArrayView(this, 1, cancellationToken, this.name + '.flat()', config);
        return view;
    }
    reduce(reducer, initial, cancellationToken) {
        const result = new DataSource(initial);
        this.listenAndRepeat((change) => {
            switch (change.operation) {
                case 'add':
                    let newVal = result.value;
                    for (const item of change.items) {
                        newVal = reducer(newVal, item);
                    }
                    result.update(newVal);
                    break;
                case 'merge':
                case 'replace':
                case 'swap':
                case 'remove':
                    let newVal2 = initial;
                    for (const item of change.newState) {
                        newVal2 = reducer(newVal2, item);
                    }
                    result.update(newVal2);
                    break;
            }
        }, cancellationToken);
        return result;
    }
    reverse(cancellationToken, config) {
        const view = new ReversedArrayView(this, cancellationToken, this.name + '.reverse()', config);
        return view;
    }
    sort(comparator = (a, b) => {
        if (a == undefined) {
            return 1;
        }
        if (b == undefined) {
            return -1;
        }
        if (typeof a === 'number' && typeof b === 'number') {
            return a - b;
        }
        else {
            return a.toString().localeCompare(b.toString());
        }
    }, dependencies = [], cancellationToken, config) {
        const view = new SortedArrayView(this, comparator, cancellationToken, this.name + '.sort()', config);
        dependencies.forEach((dep) => {
            dep.listen(() => view.refresh());
        }, cancellationToken);
        return view;
    }
    slice(start, end, cancellationToken, config) {
        if (typeof start === 'number') {
            start = new DataSource(start);
        }
        if (typeof end === 'number') {
            end = new DataSource(end);
        }
        if (end === undefined) {
            end = this.length;
        }
        return new SlicedArrayView(this, start, end, cancellationToken, this.name + '.slice()', config);
    }
    map(mapper, dependencies = [], cancellationToken, config) {
        const view = new MappedArrayView(this, mapper, cancellationToken, this.name + '.map()', config);
        dependencies.forEach((dep) => {
            dep.listen(() => view.refresh());
        }, cancellationToken);
        return view;
    }
    unique(cancellationToken, config) {
        return new UniqueArrayView(this, cancellationToken, this.name + '.unique()', config);
    }
    indexBy(key, cancellationToken, config) {
        const view = new MapDataSource();
        this.listenAndRepeat((change) => {
            var _a;
            if (!((_a = config === null || config === void 0 ? void 0 : config.ignoredOperations) === null || _a === void 0 ? void 0 : _a.includes(change.operationDetailed))) {
                switch (change.operation) {
                    case 'add':
                        for (const item of change.items) {
                            view.set(item[key], item);
                        }
                        break;
                    case 'remove':
                        for (const item of change.items) {
                            view.delete(item[key]);
                        }
                        break;
                    case 'replace':
                        view.delete(change.target[key]);
                        view.set(change.items[0][key], change.items[0]);
                        break;
                    case 'merge':
                        const oldKeys = new Set(view.keys());
                        const newKeys = new Set(change.items.map((item) => item[key]));
                        for (const oldKey of oldKeys) {
                            if (!newKeys.has(oldKey)) {
                                view.delete(oldKey);
                            }
                        }
                        for (const newKey of newKeys) {
                            if (!oldKeys.has(newKey)) {
                                view.set(newKey, change.items.find((item) => item[key] === newKey));
                            }
                        }
                        break;
                }
            }
        }, cancellationToken);
        return view;
    }
    indexByProvider(provider, cancellationToken, config) {
        const view = new MapDataSource();
        this.listenAndRepeat((change) => {
            var _a;
            if (!((_a = config === null || config === void 0 ? void 0 : config.ignoredOperations) === null || _a === void 0 ? void 0 : _a.includes(change.operationDetailed))) {
                switch (change.operation) {
                    case 'add':
                        for (const item of change.items) {
                            view.set(provider(item), item);
                        }
                        break;
                    case 'remove':
                        for (const item of change.items) {
                            view.delete(provider(item));
                        }
                        break;
                    case 'replace':
                        view.delete(provider(change.target));
                        view.set(provider(change.items[0]), change.items[0]);
                        break;
                    case 'merge':
                        const oldKeys = new Set(view.keys());
                        const newKeys = new Set(change.items.map((item) => provider(item)));
                        for (const oldKey of oldKeys) {
                            if (!newKeys.has(oldKey)) {
                                view.delete(oldKey);
                            }
                        }
                        for (const newKey of newKeys) {
                            if (!oldKeys.has(newKey)) {
                                view.set(newKey, change.items.find((item) => provider(item) === newKey));
                            }
                        }
                        break;
                }
            }
        }, cancellationToken);
        return view;
    }
    groupBy(key, cancellationToken, config) {
        const view = new MapDataSource();
        function handleRemove(item) {
            const list = view.get(item[key]);
            list.splice(list.indexOf(item), 1);
            if (list.length.value === 0) {
                view.delete(item[key]);
            }
        }
        function handleAdd(item) {
            if (!view.has(item[key])) {
                view.set(item[key], new ArrayDataSource());
            }
            view.get(item[key]).push(item);
        }
        this.listenAndRepeat((change) => {
            var _a;
            if (!((_a = config === null || config === void 0 ? void 0 : config.ignoredOperations) === null || _a === void 0 ? void 0 : _a.includes(change.operationDetailed))) {
                switch (change.operation) {
                    case 'add':
                        for (const item of change.items) {
                            handleAdd(item);
                        }
                        break;
                    case 'remove':
                        for (const item of change.items) {
                            handleRemove(item);
                        }
                        break;
                    case 'replace':
                        handleRemove(change.target);
                        handleAdd(change.items[0]);
                        break;
                    case 'merge':
                        const diff = change.previousState.filter((item) => !change.newState.includes(item));
                        for (const item of diff) {
                            if (view.has(item[key]) && view.get(item[key]).includes(item)) {
                                handleRemove(item);
                            }
                        }
                        for (const item of change.items) {
                            if (!view.has(item[key])) {
                                handleAdd(item);
                            }
                            else {
                                if (!view.get(item[key]).includes(item)) {
                                    handleAdd(item);
                                }
                            }
                        }
                        break;
                }
            }
        }, cancellationToken);
        return view;
    }
    groupByProvider(provider, cancellationToken, config) {
        const view = new MapDataSource();
        function handleRemove(item) {
            const list = view.get(provider(item));
            list.splice(list.indexOf(item), 1);
            if (list.length.value === 0) {
                view.delete(provider(item));
            }
        }
        function handleAdd(item) {
            if (!view.has(provider(item))) {
                view.set(provider(item), new ArrayDataSource());
            }
            view.get(provider(item)).push(item);
        }
        this.listenAndRepeat((change) => {
            var _a;
            if (!((_a = config === null || config === void 0 ? void 0 : config.ignoredOperations) === null || _a === void 0 ? void 0 : _a.includes(change.operationDetailed))) {
                switch (change.operation) {
                    case 'add':
                        for (const item of change.items) {
                            handleAdd(item);
                        }
                        break;
                    case 'remove':
                        for (const item of change.items) {
                            handleRemove(item);
                        }
                        break;
                    case 'replace':
                        handleRemove(change.target);
                        handleAdd(change.items[0]);
                        break;
                    case 'merge':
                        const diff = change.previousState.filter((item) => !change.newState.includes(item));
                        for (const item of diff) {
                            if (view.has(provider(item)) && view.get(provider(item)).includes(item)) {
                                handleRemove(item);
                            }
                        }
                        for (const item of change.items) {
                            if (!view.has(provider(item))) {
                                handleAdd(item);
                            }
                            else {
                                if (!view.get(provider(item)).includes(item)) {
                                    handleAdd(item);
                                }
                            }
                        }
                        break;
                }
            }
        }, cancellationToken);
        return view;
    }
    groupByMultiProvider(provider, cancellationToken, config) {
        const view = new MapDataSource();
        function handleRemove(item) {
            for (const i of provider(item)) {
                const list = view.get(i);
                list.splice(list.indexOf(item), 1);
                if (list.length.value === 0) {
                    view.delete(i);
                }
            }
        }
        function handleAdd(item) {
            for (const i of provider(item)) {
                if (!view.has(i)) {
                    view.set(i, new ArrayDataSource());
                }
                view.get(i).push(item);
            }
        }
        this.listenAndRepeat((change) => {
            var _a;
            if (!((_a = config === null || config === void 0 ? void 0 : config.ignoredOperations) === null || _a === void 0 ? void 0 : _a.includes(change.operationDetailed))) {
                switch (change.operation) {
                    case 'add':
                        for (const item of change.items) {
                            handleAdd(item);
                        }
                        break;
                    case 'remove':
                        for (const item of change.items) {
                            handleRemove(item);
                        }
                        break;
                    case 'replace':
                        handleRemove(change.target);
                        handleAdd(change.items[0]);
                        break;
                    case 'merge':
                        const diff = change.previousState.filter((item) => !change.newState.includes(item));
                        for (const item of diff) {
                            for (const i of provider(item)) {
                                if (view.has(i) && view.get(i).includes(item)) {
                                    handleRemove(item);
                                }
                            }
                        }
                        for (const item of change.items) {
                            for (const i of provider(item)) {
                                if (!view.has(i)) {
                                    handleAdd(item);
                                }
                                else {
                                    if (!view.get(i).includes(item)) {
                                        handleAdd(item);
                                    }
                                }
                            }
                        }
                        break;
                }
            }
        }, cancellationToken);
        return view;
    }
    filter(callback, dependencies = [], cancellationToken, config) {
        const view = new FilteredArrayView(this, callback, cancellationToken, this.name + '.filter()', config);
        dependencies.forEach((dep) => {
            dep.listen(() => view.refresh(), cancellationToken);
        });
        return view;
    }
    forEach(callbackfn) {
        return this.data.forEach(callbackfn);
    }
    update(change) {
        this.updateEvent.fire(change);
    }
}
exports.ArrayDataSource = ArrayDataSource;
class FlattenedArrayView extends ArrayDataSource {
    constructor(parent, depth, cancellationToken = new cancellation_token_js_1.CancellationToken(), name, config) {
        super([], name);
        this.depth = depth;
        this.parent = parent;
        this.refresh();
        parent.listen((change) => {
            var _a;
            if ((_a = config === null || config === void 0 ? void 0 : config.ignoredOperations) === null || _a === void 0 ? void 0 : _a.includes(change.operationDetailed)) {
                return;
            }
            switch (change.operationDetailed) {
                case 'removeLeft':
                case 'removeRight':
                case 'remove':
                case 'swap':
                case 'replace':
                case 'insert':
                case 'merge':
                case 'prepend':
                case 'append':
                    this.refresh();
                    break;
                case 'clear':
                    this.clear();
                    break;
            }
        }, cancellationToken);
    }
    refresh() {
        if (this.sessionToken) {
            this.sessionToken.cancel();
            this.sessionToken = undefined;
        }
        const data = this.parent.getData();
        if (data.length > 0) {
            if (data[0] instanceof ArrayDataSource) {
                this.sessionToken = new cancellation_token_js_1.CancellationToken();
                const combination = ArrayDataSource.fromMultipleSources(data);
                combination.listen((change) => {
                    this.applyCollectionChange(change);
                }, this.sessionToken);
                this.merge(combination.getData());
            }
            else {
                this.merge(data.flat(this.depth));
            }
        }
    }
}
exports.FlattenedArrayView = FlattenedArrayView;
class MappedArrayView extends ArrayDataSource {
    constructor(parent, mapper, cancellationToken = new cancellation_token_js_1.CancellationToken(), name, config) {
        const initial = parent.getData().map(mapper);
        super(initial, name);
        this.parent = parent;
        this.mapper = mapper;
        parent.listen((change) => {
            var _a;
            if ((_a = config === null || config === void 0 ? void 0 : config.ignoredOperations) === null || _a === void 0 ? void 0 : _a.includes(change.operationDetailed)) {
                return;
            }
            switch (change.operationDetailed) {
                case 'removeLeft':
                    this.removeLeft(change.count);
                    break;
                case 'removeRight':
                    this.removeRight(change.count);
                    break;
                case 'remove':
                    for (let i = 0; i < change.items.length; i++) {
                        this.remove(this.data[change.index + i]);
                    }
                    break;
                case 'clear':
                    this.clear();
                    break;
                case 'prepend':
                    this.unshift(...change.items.map(this.mapper));
                    break;
                case 'append':
                    this.appendArray(change.items.map(this.mapper));
                    break;
                case 'insert':
                    this.insertAt(change.index, ...change.items.map(this.mapper));
                    break;
                case 'swap':
                    this.swap(change.index, change.index2);
                    break;
                case 'replace':
                    this.set(change.index, this.mapper(change.items[0]));
                    break;
                case 'merge':
                    const old = this.data.slice();
                    const source = change.previousState.slice();
                    for (let i = 0; i < change.newState.length; i++) {
                        if (this.data.length <= i) {
                            this.data.push(this.mapper(change.newState[i]));
                            source.push(change.newState[i]);
                        }
                        else if (source[i] !== change.newState[i]) {
                            const index = source.indexOf(change.newState[i], i);
                            if (index !== -1) {
                                const a = this.data[i];
                                const b = this.data[index];
                                this.data[i] = b;
                                this.data[index] = a;
                                const c = source[i];
                                const d = source[index];
                                source[i] = d;
                                source[index] = c;
                            }
                            else {
                                //@ts-ignore
                                this.data.splice(i, 0, this.mapper(change.newState[i]));
                                source.splice(i, 0, change.newState[i]);
                            }
                        }
                    }
                    if (this.data.length > change.newState.length) {
                        this.data.length = change.newState.length;
                    }
                    this.length.update(this.data.length);
                    this.update({
                        operation: 'merge',
                        operationDetailed: 'merge',
                        previousState: old,
                        index: 0,
                        items: this.data,
                        newState: this.data
                    });
                    this.onItemsRemoved.fire(old);
                    this.onItemsAdded.fire(this.data);
                    break;
            }
        }, cancellationToken);
    }
    refresh() {
        this.merge(this.parent.getData().map(this.mapper));
    }
}
exports.MappedArrayView = MappedArrayView;
class ReversedArrayView extends ArrayDataSource {
    constructor(parent, cancellationToken = new cancellation_token_js_1.CancellationToken(), name, config) {
        const initial = parent.getData().slice().reverse();
        super(initial, name);
        this.parent = parent;
        parent.listen((change) => {
            var _a;
            if ((_a = config === null || config === void 0 ? void 0 : config.ignoredOperations) === null || _a === void 0 ? void 0 : _a.includes(change.operationDetailed)) {
                return;
            }
            switch (change.operationDetailed) {
                case 'removeLeft':
                    this.removeRight(change.count);
                    break;
                case 'removeRight':
                    this.removeLeft(change.count);
                    break;
                case 'remove':
                    for (const item of change.items) {
                        this.remove(item);
                    }
                    break;
                case 'clear':
                    this.clear();
                    break;
                case 'prepend':
                    this.appendArray(change.items.reverse());
                    break;
                case 'append':
                    this.unshift(...change.items.reverse());
                    break;
                case 'insert':
                    this.merge(change.newState.slice().reverse());
                    break;
                case 'merge':
                    this.merge(change.items.slice().reverse());
                    break;
                case 'swap':
                    this.merge(change.newState.slice().reverse());
                    break;
                case 'replace':
                    this.merge(change.newState.slice().reverse());
                    break;
            }
        }, cancellationToken);
    }
    refresh() {
        this.merge(this.parent.getData().slice().reverse());
    }
}
exports.ReversedArrayView = ReversedArrayView;
class SlicedArrayView extends ArrayDataSource {
    constructor(parent, start, end, cancellationToken = new cancellation_token_js_1.CancellationToken(), name, config) {
        const initial = parent.getData().slice(start.value, end.value);
        super(initial, name);
        start.listen(() => this.merge(parent.getData().slice(start.value, end.value)), cancellationToken);
        end.listen(() => this.merge(parent.getData().slice(start.value, end.value)), cancellationToken);
        parent.listen((change) => {
            var _a;
            if ((_a = config === null || config === void 0 ? void 0 : config.ignoredOperations) === null || _a === void 0 ? void 0 : _a.includes(change.operationDetailed)) {
                return;
            }
            switch (change.operationDetailed) {
                case 'removeLeft':
                case 'removeRight':
                case 'remove':
                case 'append':
                case 'prepend':
                case 'insert':
                case 'swap':
                case 'replace':
                case 'merge':
                    this.merge(parent.getData().slice(start.value, end.value));
                    break;
                case 'clear':
                    this.clear();
                    break;
            }
        }, cancellationToken);
    }
}
exports.SlicedArrayView = SlicedArrayView;
class UniqueArrayView extends ArrayDataSource {
    constructor(parent, cancellationToken = new cancellation_token_js_1.CancellationToken(), name, config) {
        const initial = Array.from(new Set(parent.getData()));
        super(initial, name);
        let filteredItems;
        parent.listen((change) => {
            var _a;
            if ((_a = config === null || config === void 0 ? void 0 : config.ignoredOperations) === null || _a === void 0 ? void 0 : _a.includes(change.operationDetailed)) {
                return;
            }
            switch (change.operationDetailed) {
                case 'removeLeft':
                case 'removeRight':
                case 'remove':
                    for (const item of change.items) {
                        if (!change.newState.includes(item)) {
                            this.remove(item);
                        }
                    }
                    break;
                case 'clear':
                    this.clear();
                    break;
                case 'prepend':
                    filteredItems = change.items.filter((e) => !this.data.includes(e));
                    this.unshift(...filteredItems);
                    break;
                case 'append':
                    filteredItems = change.items.filter((e) => !this.data.includes(e));
                    this.appendArray(filteredItems);
                    break;
                case 'insert':
                    filteredItems = change.items.filter((e) => !this.data.includes(e));
                    this.insertAt(change.index, ...filteredItems);
                    break;
                case 'merge':
                    this.merge(Array.from(new Set(parent.getData())));
                    break;
                case 'swap':
                    this.swap(change.index, change.index2);
                    break;
                case 'replace':
                    if (this.data.includes(change.items[0])) {
                        this.remove(change.target);
                    }
                    else {
                        this.set(change.index, change.items[0]);
                    }
                    break;
            }
        }, cancellationToken);
    }
}
exports.UniqueArrayView = UniqueArrayView;
class SortedArrayView extends ArrayDataSource {
    constructor(parent, comparator, cancellationToken = new cancellation_token_js_1.CancellationToken(), name, config) {
        const initial = parent.getData().slice().sort(comparator);
        super(initial, name);
        this.parent = parent;
        this.comparator = comparator;
        parent.listen((change) => {
            var _a;
            if ((_a = config === null || config === void 0 ? void 0 : config.ignoredOperations) === null || _a === void 0 ? void 0 : _a.includes(change.operationDetailed)) {
                return;
            }
            switch (change.operationDetailed) {
                case 'removeLeft':
                case 'removeRight':
                case 'remove':
                    for (const item of change.items) {
                        this.remove(item);
                    }
                    break;
                case 'clear':
                    this.clear();
                    break;
                case 'prepend':
                    this.unshift(...change.items);
                    this.data.sort(this.comparator);
                    break;
                case 'append':
                    this.appendSorted(change.items);
                    break;
                case 'insert':
                    this.appendSorted(change.items);
                    break;
                case 'merge':
                    this.merge(change.items.slice().sort(this.comparator));
                    break;
                case 'swap':
                    break;
                case 'replace':
                    this.remove(change.target);
                    this.appendSorted(change.items);
                    break;
            }
        }, cancellationToken);
    }
    appendSorted(items) {
        if (items.length === 1 && this.data.length === 0) {
            this.push(items[0]);
        }
        else {
            this.merge(this.data.concat(items).sort(this.comparator));
        }
    }
    refresh() {
        this.merge(this.parent.getData().slice().sort(this.comparator));
    }
}
exports.SortedArrayView = SortedArrayView;
class FilteredArrayView extends ArrayDataSource {
    constructor(parent, filter, cancellationToken = new cancellation_token_js_1.CancellationToken(), name, config) {
        if (Array.isArray(parent)) {
            parent = new ArrayDataSource(parent);
        }
        filter = filter !== null && filter !== void 0 ? filter : (() => true);
        const initial = parent.data.filter(filter);
        super(initial, name);
        this.parent = parent;
        this.viewFilter = filter;
        parent.listen((change) => {
            var _a;
            if ((_a = config === null || config === void 0 ? void 0 : config.ignoredOperations) === null || _a === void 0 ? void 0 : _a.includes(change.operationDetailed)) {
                return;
            }
            let filteredItems;
            switch (change.operationDetailed) {
                case 'clear':
                    this.clear();
                    break;
                case 'removeLeft':
                case 'removeRight':
                case 'remove':
                    for (const item of change.items) {
                        this.remove(item);
                    }
                    break;
                case 'prepend':
                    filteredItems = change.items.filter(this.viewFilter);
                    this.unshift(...filteredItems);
                    break;
                case 'append':
                    filteredItems = change.items.filter(this.viewFilter);
                    this.appendArray(filteredItems);
                    break;
                case 'insert':
                    filteredItems = change.items.filter(this.viewFilter);
                    this.insertAt(change.index, ...filteredItems);
                    break;
                case 'merge':
                    this.merge(change.items.filter(this.viewFilter));
                    break;
                case 'swap':
                    const indexA = this.data.indexOf(change.items[0]);
                    const indexB = this.data.indexOf(change.items[1]);
                    if (indexA !== -1 && indexB !== -1) {
                        this.swap(indexA, indexB);
                    }
                    break;
                case 'replace':
                    const index = this.data.indexOf(change.target);
                    if (index !== -1) {
                        const acceptNew = this.viewFilter(change.items[0]);
                        if (acceptNew) {
                            this.set(index, change.items[0]);
                        }
                        else {
                            this.remove(change.target);
                        }
                    }
                    break;
            }
        }, cancellationToken);
    }
    /**
     * Replaces the filter function
     * @param filter
     * @returns returns new size of array view after applying filter
     */
    updateFilter(filter) {
        if (this.viewFilter === filter) {
            return this.data.length;
        }
        this.viewFilter = filter;
        this.refresh();
        return this.data.length;
    }
    /**
     * Recalculates the filter. Only needed if your filter function isn't pure and you know the result would be different if run again compared to before
     */
    refresh() {
        this.merge(this.parent.data.filter(this.viewFilter));
    }
}
exports.FilteredArrayView = FilteredArrayView;
function processTransform(operations, result) {
    return async (v) => {
        try {
            for (const operation of operations) {
                switch (operation.operationType) {
                    case operator_model_js_1.OperationType.NOOP:
                    case operator_model_js_1.OperationType.MAP:
                        v = operation.operation(v);
                        break;
                    case operator_model_js_1.OperationType.MAP_DELAY_FILTER:
                        const tmp = await operation.operation(v);
                        if (tmp.cancelled) {
                            return;
                        }
                        else {
                            v = await tmp.item;
                        }
                        break;
                    case operator_model_js_1.OperationType.DELAY:
                    case operator_model_js_1.OperationType.MAP_DELAY:
                        v = await operation.operation(v);
                        break;
                    case operator_model_js_1.OperationType.DELAY_FILTER:
                        if (!(await operation.operation(v))) {
                            return;
                        }
                        break;
                    case operator_model_js_1.OperationType.FILTER:
                        if (!operation.operation(v)) {
                            return;
                        }
                        break;
                }
            }
            result.update(v);
        }
        catch (e) {
            result.emitError(e);
        }
    };
}
exports.processTransform = processTransform;
class MapDataSource {
    constructor(initialData) {
        this.data = initialData !== null && initialData !== void 0 ? initialData : new Map();
        this.updateEvent = new event_emitter_js_1.EventEmitter();
        this.updateEventOnKey = new Map();
    }
    cancelAll() {
        this.updateEvent.cancelAll();
        this.updateEventOnKey.forEach((v, k) => v.cancelAll());
        this.updateEventOnKey.clear();
    }
    /**
     * Connects to an aurum-server exposed map datasource. View https://github.com/CyberPhoenix90/aurum-server for more information
     * Note that type safety is not guaranteed. Whatever the server sends as an update will be propagated. Make sure you trust the server
     * @param  {AurumServerInfo} aurumServerInfo
     * @returns DataSource
     */
    static fromRemoteSource(aurumServerInfo, cancellation) {
        const result = new MapDataSource();
        (0, aurum_server_client_js_1.syncMapDataSource)(result, aurumServerInfo, cancellation);
        return result;
    }
    static fromMultipleMaps(maps, cancellationToken) {
        const result = new MapDataSource();
        let i = 0;
        for (const map of maps) {
            let index = i;
            result.assign(map);
            map.listen((change) => {
                let isOverwritten = false;
                for (let j = index + 1; j < maps.length; j++) {
                    if (maps[j].has(change.key)) {
                        isOverwritten = true;
                        break;
                    }
                }
                if (!isOverwritten) {
                    if (change.deleted) {
                        result.delete(change.key);
                    }
                    else {
                        result.set(change.key, change.newValue);
                    }
                }
            }, cancellationToken);
        }
        return result;
    }
    pipe(target, cancellation) {
        this.listenAndRepeat((c) => target.applyMapChange(c), cancellation);
    }
    forEach(callbackfn, thisArg) {
        this.data.forEach(callbackfn, thisArg);
    }
    toString() {
        return this.data.toString();
    }
    static toMapDataSource(value) {
        if (value instanceof MapDataSource) {
            return value;
        }
        else {
            return new MapDataSource(value);
        }
    }
    applyMapChange(change) {
        if (change.deleted && this.data.has(change.key)) {
            this.delete(change.key);
        }
        else if (!change.deleted && !this.data.has(change.key)) {
            this.set(change.key, change.newValue);
        }
    }
    /**
     * Creates a datasource for a single key of the object
     * @param key
     * @param cancellationToken
     */
    pick(key, cancellationToken) {
        const subDataSource = new DataSource(this.data.get(key));
        this.listenOnKey(key, (v) => {
            subDataSource.update(v.newValue);
        }, cancellationToken);
        return subDataSource;
    }
    /**
     * Listen to changes of the object
     */
    listen(callback, cancellationToken) {
        return this.updateEvent.subscribe(callback, cancellationToken).cancel;
    }
    /**
     * Same as listen but will immediately call the callback with the current value of each key
     */
    listenAndRepeat(callback, cancellationToken) {
        const c = this.updateEvent.subscribe(callback, cancellationToken).cancel;
        for (const key of this.data.keys()) {
            callback({
                key,
                newValue: this.data.get(key),
                oldValue: undefined,
                deleted: false
            });
        }
        return c;
    }
    map(mapper, cancellation) {
        const result = new MapDataSource();
        const lifeTimeMap = new Map();
        this.listenAndRepeat((change) => {
            if (change.deleted) {
                lifeTimeMap.get(change.key).cancel();
                lifeTimeMap.delete(change.key);
                result.delete(change.key);
            }
            else {
                const lifeTimeToken = new cancellation_token_js_1.CancellationToken();
                if (lifeTimeMap.has(change.key)) {
                    lifeTimeMap.get(change.key).cancel();
                }
                lifeTimeMap.set(change.key, lifeTimeToken);
                const newItem = mapper(change.key, change.newValue, lifeTimeToken);
                result.set(change.key, newItem);
            }
        }, cancellation);
        return result;
    }
    toArrayDataSource(cancellation) {
        const stateMap = new Map();
        const result = new ArrayDataSource();
        this.listenAndRepeat((change) => {
            if (change.deleted && stateMap.has(change.key)) {
                const item = stateMap.get(change.key);
                result.remove(item);
                stateMap.delete(change.key);
            }
            else if (stateMap.has(change.key)) {
                const newItem = change.newValue;
                result.replace(stateMap.get(change.key), newItem);
                stateMap.set(change.key, newItem);
            }
            else if (!stateMap.has(change.key) && !change.deleted) {
                const newItem = change.newValue;
                result.push(newItem);
                stateMap.set(change.key, newItem);
            }
        }, cancellation);
        return result;
    }
    clear() {
        for (const key of this.data.keys()) {
            this.delete(key);
        }
    }
    /**
     * Same as listenOnKey but will immediately call the callback with the current value first
     */
    listenOnKeyAndRepeat(key, callback, cancellationToken) {
        callback({
            key,
            newValue: this.data.get(key),
            oldValue: undefined
        });
        return this.listenOnKey(key, callback, cancellationToken);
    }
    /**
     * Listen to changes of a single key of the object
     */
    listenOnKey(key, callback, cancellationToken) {
        if (!this.updateEventOnKey.has(key)) {
            this.updateEventOnKey.set(key, new event_emitter_js_1.EventEmitter());
        }
        const event = this.updateEventOnKey.get(key);
        return event.subscribe(callback, cancellationToken).cancel;
    }
    /**
     * Returns all the keys of the object in the source
     */
    keys() {
        return this.data.keys();
    }
    /**
     * Returns all the values of the object in the source
     */
    values() {
        return this.data.values();
    }
    /**
     * get the current value of a key of the object
     * @param key
     */
    get(key) {
        return this.data.get(key);
    }
    /**
     * check if map has a key
     * @param key
     */
    has(key) {
        return this.data.has(key);
    }
    /**
     * delete a key from the object
     * @param key
     * @param value
     */
    delete(key) {
        if (!this.has(key)) {
            return;
        }
        const old = this.data.get(key);
        this.data.delete(key);
        this.updateEvent.fire({ oldValue: old, key, newValue: undefined, deleted: true });
        if (this.updateEventOnKey.has(key)) {
            this.updateEventOnKey.get(key).fire({ oldValue: old, key, newValue: undefined });
        }
    }
    /**
     * set the value for a key of the object
     * @param key
     * @param value
     */
    set(key, value) {
        if (this.data.get(key) === value) {
            return;
        }
        const old = this.data.get(key);
        this.data.set(key, value);
        this.updateEvent.fire({ oldValue: old, key, newValue: this.data.get(key) });
        if (this.updateEventOnKey.has(key)) {
            this.updateEventOnKey.get(key).fire({ oldValue: old, key, newValue: this.data.get(key) });
        }
    }
    /**
     * Merge the key value pairs of an object into this object non recursively
     * @param newData
     */
    assign(newData) {
        for (const key of newData.keys()) {
            this.set(key, newData.get(key));
        }
    }
    /**
     * Returns a shallow copy of the map
     */
    toMap() {
        return new Map(this.data.entries());
    }
}
exports.MapDataSource = MapDataSource;
class SetDataSource {
    constructor(initialData) {
        if (Array.isArray(initialData)) {
            this.data = new Set(initialData);
        }
        else {
            this.data = initialData !== null && initialData !== void 0 ? initialData : new Set();
        }
        this.updateEvent = new event_emitter_js_1.EventEmitter();
        this.updateEventOnKey = new Map();
    }
    /**
     * Connects to an aurum-server exposed set datasource. View https://github.com/CyberPhoenix90/aurum-server for more information
     * Note that type safety is not guaranteed. Whatever the server sends as an update will be propagated. Make sure you trust the server
     * @param  {AurumServerInfo} aurumServerInfo
     * @returns DataSource
     */
    static fromRemoteSource(aurumServerInfo, cancellation) {
        const result = new SetDataSource(undefined);
        (0, aurum_server_client_js_1.syncSetDataSource)(result, aurumServerInfo, cancellation);
        return result;
    }
    /**
     * Remove all listeners
     */
    cancelAll() {
        this.updateEvent.cancelAll();
    }
    applySetChange(change) {
        if (change.exists && !this.has(change.key)) {
            this.data.add(change.key);
        }
        else if (!change.exists && this.has(change.key)) {
            this.data.delete(change.key);
        }
    }
    clear() {
        for (const key of this.data.keys()) {
            this.delete(key);
        }
    }
    isSubsetOf(otherSet) {
        for (const key of this) {
            if (!otherSet.has(key)) {
                return false;
            }
        }
        return true;
    }
    isSupersetOf(otherSet) {
        for (const key of otherSet) {
            if (!this.has(key)) {
                return false;
            }
        }
        return true;
    }
    isDisjointWith(otherSet) {
        for (const key of otherSet) {
            if (this.has(key)) {
                return false;
            }
        }
        return true;
    }
    get size() {
        return this.data.size;
    }
    isIdenticalTo(otherSet) {
        if (this.size !== otherSet.size) {
            return false;
        }
        for (const key of otherSet) {
            if (!this.has(key)) {
                return false;
            }
        }
        return true;
    }
    static toSetDataSource(value) {
        if (value instanceof SetDataSource) {
            return value;
        }
        else {
            return new SetDataSource(value);
        }
    }
    [Symbol.iterator]() {
        return this.data.keys();
    }
    /**
     * Returns an iterable of [v,v] pairs for every value `v` in the set.
     */
    entries() {
        return this.data.entries();
    }
    /**
     * Returns an iterable of values in the set.
     */
    values() {
        return this.data.values();
    }
    difference(otherSet, cancellationToken) {
        const result = new SetDataSource();
        const otherSetKeys = new Set(otherSet.keys());
        this.listenAndRepeat((change) => {
            if (change.exists && !otherSetKeys.has(change.key)) {
                result.add(change.key);
            }
            if (!change.exists) {
                result.delete(change.key);
            }
        }, cancellationToken);
        otherSet.listenAndRepeat((change) => {
            if (change.exists) {
                result.delete(change.key);
            }
            if (!change.exists && this.has(change.key)) {
                result.add(change.key);
            }
        }, cancellationToken);
        return result;
    }
    union(otherSet, cancellationToken) {
        const result = new SetDataSource();
        this.listenAndRepeat((change) => {
            if (change.exists) {
                result.add(change.key);
            }
            else if (!otherSet.has(change.key)) {
                result.delete(change.key);
            }
        }, cancellationToken);
        otherSet.listenAndRepeat((change) => {
            if (change.exists) {
                result.add(change.key);
            }
            else if (!this.has(change.key)) {
                result.delete(change.key);
            }
        }, cancellationToken);
        return result;
    }
    intersection(otherSet, cancellationToken) {
        const result = new SetDataSource();
        this.listenAndRepeat((change) => {
            if (change.exists && otherSet.has(change.key)) {
                result.add(change.key);
            }
            else {
                result.delete(change.key);
            }
        }, cancellationToken);
        otherSet.listenAndRepeat((change) => {
            if (change.exists && this.has(change.key)) {
                result.add(change.key);
            }
            else {
                result.delete(change.key);
            }
        }, cancellationToken);
        return result;
    }
    symmetricDifference(otherSet, cancellationToken) {
        const result = new SetDataSource();
        this.listenAndRepeat((change) => {
            if (change.exists && !otherSet.has(change.key)) {
                result.add(change.key);
            }
            else if (!change.exists && otherSet.has(change.key)) {
                result.add(change.key);
            }
            else if (change.exists && otherSet.has(change.key)) {
                result.delete(change.key);
            }
            else if (!change.exists && !otherSet.has(change.key)) {
                result.delete(change.key);
            }
        }, cancellationToken);
        otherSet.listenAndRepeat((change) => {
            if (change.exists && !this.has(change.key)) {
                result.add(change.key);
            }
            else if (!change.exists && this.has(change.key)) {
                result.add(change.key);
            }
            else if (change.exists && this.has(change.key)) {
                result.delete(change.key);
            }
            else if (!change.exists && !this.has(change.key)) {
                result.delete(change.key);
            }
        }, cancellationToken);
        return result;
    }
    toString() {
        return this.data.toString();
    }
    /**
     * Creates a datasource for a single key of the object
     * @param key
     * @param cancellationToken
     */
    pick(key, cancellationToken) {
        const subDataSource = new DataSource(this.data.has(key));
        this.listenOnKey(key, (v) => {
            subDataSource.update(v);
        }, cancellationToken);
        return subDataSource;
    }
    /**
     * Listen to changes of the object
     */
    listen(callback, cancellationToken) {
        return this.updateEvent.subscribe(callback, cancellationToken).cancel;
    }
    /**
     * Same as listen but will immediately call the callback with the current value of each key
     */
    listenAndRepeat(callback, cancellationToken) {
        const c = this.updateEvent.subscribe(callback, cancellationToken).cancel;
        for (const key of this.data.keys()) {
            callback({
                key,
                exists: true
            });
        }
        return c;
    }
    /**
     * Same as listenOnKey but will immediately call the callback with the current value first
     */
    listenOnKeyAndRepeat(key, callback, cancellationToken) {
        callback(this.has(key));
        return this.listenOnKey(key, callback, cancellationToken);
    }
    /**
     * Listen to changes of a single key of the object
     */
    listenOnKey(key, callback, cancellationToken) {
        if (!this.updateEventOnKey.has(key)) {
            this.updateEventOnKey.set(key, new event_emitter_js_1.EventEmitter());
        }
        const event = this.updateEventOnKey.get(key);
        return event.subscribe(callback, cancellationToken).cancel;
    }
    toArrayDataSource(cancellationToken) {
        return this.map((key) => key, cancellationToken);
    }
    map(mapper, cancellationToken) {
        const stateMap = new Map();
        const result = new ArrayDataSource();
        this.listenAndRepeat((change) => {
            if (!change.exists && stateMap.has(change.key)) {
                const item = stateMap.get(change.key);
                result.remove(item);
                stateMap.delete(change.key);
            }
            else if (!stateMap.has(change.key) && change.exists) {
                const newItem = mapper(change.key);
                result.push(newItem);
                stateMap.set(change.key, newItem);
            }
        }, cancellationToken);
        return result;
    }
    /**
     * Returns all the keys of the object in the source
     */
    keys() {
        return this.data.keys();
    }
    /**
     * check if map has a key
     * @param key
     */
    has(key) {
        return this.data.has(key);
    }
    /**
     * delete a key from the object
     * @param key
     * @param value
     */
    delete(key) {
        if (this.has(key)) {
            this.data.delete(key);
            this.updateEvent.fire({ key, exists: false });
            if (this.updateEventOnKey.has(key)) {
                this.updateEventOnKey.get(key).fire(false);
            }
        }
    }
    /**
     * set the value for a key of the object
     * @param key
     * @param value
     */
    add(key) {
        if (this.data.has(key)) {
            return;
        }
        this.data.add(key);
        this.updateEvent.fire({ key, exists: true });
        if (this.updateEventOnKey.has(key)) {
            this.updateEventOnKey.get(key).fire(true);
        }
    }
    /**
     * Merge the key value pairs of an object into this object non recursively
     * @param newData
     */
    assign(newData) {
        for (const key of newData.keys()) {
            this.add(key);
        }
    }
    /**
     * Returns a shallow copy of the set
     */
    toSet() {
        return new Set(this.data.keys());
    }
    toArray() {
        return Array.from(this.data.keys());
    }
}
exports.SetDataSource = SetDataSource;
//# sourceMappingURL=data_source.js.map

/***/ }),

/***/ "./node_modules/aurumjs/prebuilt/cjs/stream/data_source_operators.js":
/*!***************************************************************************!*\
  !*** ./node_modules/aurumjs/prebuilt/cjs/stream/data_source_operators.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.dsPipeAll = exports.dsLog = exports.dsLoadBalance = exports.dsTap = exports.dsThroughputMeter = exports.dsHistory = exports.dsPipeUp = exports.dsPipe = exports.dsPick = exports.dsBuffer = exports.dsThrottle = exports.dsLock = exports.dsThrottleFrame = exports.dsMicroDebounce = exports.dsDebounce = exports.dsDelay = exports.dsStringJoin = exports.dsReduce = exports.dsAwaitLatest = exports.dsAwaitOrdered = exports.dsAwait = exports.dsUnique = exports.dsSemaphore = exports.dsCutOffDynamic = exports.dsCutOff = exports.dsSkip = exports.dsSkipDynamic = exports.dsMax = exports.dsMin = exports.dsOdd = exports.dsEven = exports.dsFilterAsync = exports.dsFilter = exports.dsUpdateToken = exports.dsDiff = exports.dsMapAsync = exports.dsFork = exports.dsMap = void 0;
const event_emitter_js_1 = __webpack_require__(/*! ../utilities/event_emitter.js */ "./node_modules/aurumjs/prebuilt/cjs/utilities/event_emitter.js");
const data_source_js_1 = __webpack_require__(/*! ./data_source.js */ "./node_modules/aurumjs/prebuilt/cjs/stream/data_source.js");
const stream_js_1 = __webpack_require__(/*! ./stream.js */ "./node_modules/aurumjs/prebuilt/cjs/stream/stream.js");
const operator_model_js_1 = __webpack_require__(/*! ./operator_model.js */ "./node_modules/aurumjs/prebuilt/cjs/stream/operator_model.js");
const cancellation_token_js_1 = __webpack_require__(/*! ../utilities/cancellation_token.js */ "./node_modules/aurumjs/prebuilt/cjs/utilities/cancellation_token.js");
/**
 * Mutates an update
 */
function dsMap(mapper) {
    return {
        name: 'map',
        operationType: operator_model_js_1.OperationType.MAP,
        operation: (v) => mapper(v)
    };
}
exports.dsMap = dsMap;
/**
 * Forwards an update to one of two possible sources based on a condition
 */
function dsFork(condition, truthyPath, falsyPath) {
    return {
        name: 'fork',
        operationType: operator_model_js_1.OperationType.NOOP,
        operation: (v) => {
            if (condition(v)) {
                truthyPath.update(v);
            }
            else {
                falsyPath.update(v);
            }
            return v;
        }
    };
}
exports.dsFork = dsFork;
/**
 * Same as map but with an async mapper function
 */
function dsMapAsync(mapper) {
    return {
        name: 'mapAsync',
        operationType: operator_model_js_1.OperationType.MAP_DELAY,
        operation: (v) => mapper(v)
    };
}
exports.dsMapAsync = dsMapAsync;
/**
 * Changes updates to contain the value of the previous update as well as the current
 */
function dsDiff() {
    let lastValue = undefined;
    return {
        name: 'diff',
        operationType: operator_model_js_1.OperationType.MAP,
        operation: (v) => {
            let result = {
                oldValue: lastValue,
                newValue: v
            };
            lastValue = v;
            return result;
        }
    };
}
exports.dsDiff = dsDiff;
/**
 * Changes updates to contain the value of the previous update as well as the current
 */
function dsUpdateToken() {
    let token;
    return {
        name: 'diff',
        operationType: operator_model_js_1.OperationType.MAP,
        operation: (v) => {
            if (token) {
                token.cancel();
            }
            token = new cancellation_token_js_1.CancellationToken();
            return {
                token,
                value: v
            };
        }
    };
}
exports.dsUpdateToken = dsUpdateToken;
/**
 * Blocks updates that don't pass the filter predicate
 */
function dsFilter(predicate) {
    return {
        name: 'filter',
        operationType: operator_model_js_1.OperationType.FILTER,
        operation: (v) => predicate(v)
    };
}
exports.dsFilter = dsFilter;
/**
 * Same as filter but with an async predicate function
 */
function dsFilterAsync(predicate) {
    return {
        name: 'filterAsync',
        operationType: operator_model_js_1.OperationType.DELAY_FILTER,
        operation: (v) => predicate(v)
    };
}
exports.dsFilterAsync = dsFilterAsync;
/**
 * Only propagate an update if the value is even
 */
function dsEven() {
    return {
        name: 'even',
        operationType: operator_model_js_1.OperationType.FILTER,
        operation: (v) => v % 2 === 0
    };
}
exports.dsEven = dsEven;
/**
 * Only propagate an update if the value is odd
 */
function dsOdd() {
    return {
        name: 'odd',
        operationType: operator_model_js_1.OperationType.FILTER,
        operation: (v) => v % 2 !== 0
    };
}
exports.dsOdd = dsOdd;
/**
 * Only propagate an update if the value is lower than the previous update
 */
function dsMin() {
    let last = Number.MAX_SAFE_INTEGER;
    return {
        name: 'min',
        operationType: operator_model_js_1.OperationType.FILTER,
        operation: (v) => {
            if (v < last) {
                last = v;
                return true;
            }
            else {
                return false;
            }
        }
    };
}
exports.dsMin = dsMin;
/**
 * Only propagate an update if the value is higher than the previous update
 */
function dsMax() {
    let last = Number.MIN_SAFE_INTEGER;
    return {
        name: 'max',
        operationType: operator_model_js_1.OperationType.FILTER,
        operation: (v) => {
            if (v > last) {
                last = v;
                return true;
            }
            else {
                return false;
            }
        }
    };
}
exports.dsMax = dsMax;
/**
 * Ignore the first N updates where N depends on an external source
 */
function dsSkipDynamic(amountLeft) {
    return {
        operationType: operator_model_js_1.OperationType.FILTER,
        name: 'skipDynamic',
        operation: (v) => {
            if (amountLeft.value === 0) {
                return true;
            }
            else {
                amountLeft.update(amountLeft.value - 1);
                return false;
            }
        }
    };
}
exports.dsSkipDynamic = dsSkipDynamic;
/**
 * Ignore the first N updates
 */
function dsSkip(amount) {
    return {
        operationType: operator_model_js_1.OperationType.FILTER,
        name: `skip ${amount}`,
        operation: (v) => {
            if (amount === 0) {
                return true;
            }
            else {
                amount--;
                return false;
            }
        }
    };
}
exports.dsSkip = dsSkip;
/**
 * Allows only a certain number of updates to pass decreasing a counter on each pass
 * If the counter reaches 0 the updates are lost
 */
function dsCutOff(amount) {
    return {
        name: `cutoff ${amount}`,
        operationType: operator_model_js_1.OperationType.FILTER,
        operation: (v) => {
            if (amount === 0) {
                return false;
            }
            else {
                amount--;
                return true;
            }
        }
    };
}
exports.dsCutOff = dsCutOff;
/**
 * Allows only a certain number of updates to pass decreasing a counter on each pass, the counter being an external
 * datasource can be changed externally.
 * If the counter reaches 0 the updates are lost
 */
function dsCutOffDynamic(amountLeft) {
    return {
        name: 'cutoffDynamic',
        operationType: operator_model_js_1.OperationType.FILTER,
        operation: (v) => {
            if (amountLeft.value === 0) {
                return false;
            }
            else {
                amountLeft.update(amountLeft.value - 1);
                return true;
            }
        }
    };
}
exports.dsCutOffDynamic = dsCutOffDynamic;
/**
 * Allows only a certain number of updates to pass decreasing a counter on each pass, the counter being an external
 * datasource can be changed externally.
 * If the counter reaches 0 the updates are buffered until they are unlocked again
 */
function dsSemaphore(state) {
    return {
        operationType: operator_model_js_1.OperationType.DELAY,
        name: 'semaphore',
        operation: (v) => {
            return new Promise((resolve) => {
                if (state.value > 0) {
                    state.update(state.value - 1);
                    resolve(v);
                }
                else {
                    const cancel = state.listen(() => {
                        if (state.value > 0) {
                            cancel();
                            state.update(state.value - 1);
                            resolve(v);
                        }
                    });
                }
            });
        }
    };
}
exports.dsSemaphore = dsSemaphore;
/**
 * Filters out updates if they have the same value as the previous update, uses reference equality by default
 */
function dsUnique(isEqual) {
    let primed = false;
    let last;
    return {
        name: 'unique',
        operationType: operator_model_js_1.OperationType.FILTER,
        operation: (v) => {
            if (primed && (isEqual ? isEqual(last, v) : v === last)) {
                return false;
            }
            else {
                primed = true;
                last = v;
                return true;
            }
        }
    };
}
exports.dsUnique = dsUnique;
/**
 * Takes promises and updates with the resolved value, if multiple promises come in processes updates as promises resolve in any order
 */
function dsAwait() {
    return {
        name: 'await',
        operationType: operator_model_js_1.OperationType.MAP_DELAY,
        operation: (v) => {
            return v;
        }
    };
}
exports.dsAwait = dsAwait;
/**
 * Takes promises and updates with the resolved value, if multiple promises come in makes sure the updates fire in the same order that the promises came in
 */
function dsAwaitOrdered() {
    const queue = [];
    const onDequeue = new event_emitter_js_1.EventEmitter();
    return {
        operationType: operator_model_js_1.OperationType.MAP_DELAY,
        name: 'awaitOrdered',
        operation: async (v) => {
            queue.push(v);
            if (queue.length === 1) {
                return processItem();
            }
            else {
                const unsub = onDequeue.subscribe(async () => {
                    if (queue[0] === v) {
                        unsub.cancel();
                        return processItem();
                    }
                });
            }
        }
    };
    async function processItem() {
        await queue[0];
        const item = queue.shift();
        onDequeue.fire();
        return item;
    }
}
exports.dsAwaitOrdered = dsAwaitOrdered;
/**
 * awaits promise and forwards the resolved value, if a new promise comes in while the first isn't resolved then the first
 * promise will be ignored even if it resolves first and instead we focus on the newest promise. This is useful for cancellable
 * async operations where we only care about the result if it's the latest action
 */
function dsAwaitLatest() {
    let freshnessToken;
    return {
        operationType: operator_model_js_1.OperationType.MAP_DELAY_FILTER,
        name: 'awaitLatest',
        operation: async (v) => {
            freshnessToken = Date.now();
            const timestamp = freshnessToken;
            const resolved = await v;
            if (freshnessToken === timestamp) {
                return {
                    item: resolved,
                    cancelled: false
                };
            }
            else {
                return {
                    item: undefined,
                    cancelled: true
                };
            }
        }
    };
}
exports.dsAwaitLatest = dsAwaitLatest;
/**
 * Reduces all updates down to a value
 */
function dsReduce(reducer, initialValue) {
    let last = initialValue;
    return {
        name: 'reduce',
        operationType: operator_model_js_1.OperationType.MAP,
        operation: (v) => {
            last = reducer(last, v);
            return last;
        }
    };
}
exports.dsReduce = dsReduce;
/**
 * Builds a string where each update is appened to the string optionally with a seperator
 */
function dsStringJoin(seperator = ', ') {
    let last;
    return {
        name: `stringJoin ${seperator}`,
        operationType: operator_model_js_1.OperationType.MAP,
        operation: (v) => {
            if (last) {
                last += seperator + v;
            }
            else {
                last = v;
            }
            return last;
        }
    };
}
exports.dsStringJoin = dsStringJoin;
/**
 * Adds a fixed amount of lag to updates
 */
function dsDelay(time) {
    return {
        name: `delay ${time}ms`,
        operationType: operator_model_js_1.OperationType.DELAY,
        operation: (v) => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(v);
                }, time);
            });
        }
    };
}
exports.dsDelay = dsDelay;
/**
 * Starts a timer when an update occurs, delays the update until the timer passed if a new update arrives the initial
 * update is cancelled and the process starts again
 */
function dsDebounce(time) {
    let timeout;
    let cancelled = new event_emitter_js_1.EventEmitter();
    return {
        operationType: operator_model_js_1.OperationType.DELAY_FILTER,
        name: `debounce ${time}ms`,
        operation: (v) => {
            return new Promise((resolve) => {
                clearTimeout(timeout);
                cancelled.fire();
                cancelled.subscribeOnce(() => {
                    resolve(false);
                });
                timeout = setTimeout(() => {
                    resolve(true);
                    cancelled.cancelAll();
                }, time);
            });
        }
    };
}
exports.dsDebounce = dsDebounce;
/**
 * Only allow up to 1 update to propagate per frame makes update run as a microtask
 */
function dsMicroDebounce() {
    let scheduled;
    return {
        operationType: operator_model_js_1.OperationType.DELAY_FILTER,
        name: `microDebounce`,
        operation: (v) => {
            return new Promise((resolve) => {
                if (!scheduled) {
                    scheduled = true;
                    queueMicrotask(() => resolve(true));
                }
                else {
                    resolve(false);
                }
            });
        }
    };
}
exports.dsMicroDebounce = dsMicroDebounce;
/**
 * Debounce update to occur at most one per animation frame
 */
function dsThrottleFrame() {
    let timeout;
    let cancelled = new event_emitter_js_1.EventEmitter();
    return {
        operationType: operator_model_js_1.OperationType.DELAY_FILTER,
        name: `throttle frame`,
        operation: (v) => {
            return new Promise((resolve) => {
                clearTimeout(timeout);
                cancelled.fire();
                cancelled.subscribeOnce(() => {
                    resolve(false);
                });
                timeout = requestAnimationFrame(() => {
                    resolve(true);
                    cancelled.cancelAll();
                });
            });
        }
    };
}
exports.dsThrottleFrame = dsThrottleFrame;
/**
 * May or may not block all updates based on the state provided by another source
 * When unblocked the last value that was blocked is passed through
 * lock state
 * true => updates pass through
 * false => latest update state is buffered and passes once unlocked
 */
function dsLock(state) {
    return {
        name: 'lock',
        operationType: operator_model_js_1.OperationType.DELAY,
        operation: (v) => {
            return new Promise((resolve) => {
                if (state.value) {
                    resolve(v);
                }
                else {
                    const cancel = state.listen(() => {
                        if (state.value) {
                            cancel();
                            resolve(v);
                        }
                    });
                }
            });
        }
    };
}
exports.dsLock = dsLock;
/**
 * Allows at most one update per N milliseconds to pass through
 */
function dsThrottle(time) {
    let cooldown = false;
    return {
        name: `throttle ${time}ms`,
        operationType: operator_model_js_1.OperationType.FILTER,
        operation: (v) => {
            if (!cooldown) {
                cooldown = true;
                setTimeout(() => {
                    cooldown = false;
                }, time);
                return true;
            }
            else {
                return false;
            }
        }
    };
}
exports.dsThrottle = dsThrottle;
/**
 * When an update occurs a timer is started, during that time all subsequent updates are collected in an array and then
 * once the timer runs out an update is made with all updates collected so far as an array
 */
function dsBuffer(time) {
    let buffer = [];
    let promise;
    return {
        name: `buffer ${time}ms`,
        operationType: operator_model_js_1.OperationType.MAP_DELAY_FILTER,
        operation: (v) => {
            buffer.push(v);
            if (!promise) {
                promise = new Promise((resolve) => {
                    setTimeout(() => {
                        promise = undefined;
                        resolve({
                            cancelled: false,
                            item: buffer
                        });
                        buffer = [];
                    }, time);
                });
                return promise;
            }
            else {
                return Promise.resolve({
                    cancelled: true,
                    item: undefined
                });
            }
        }
    };
}
exports.dsBuffer = dsBuffer;
/**
 * Extracts only the value of a key of the update value
 */
function dsPick(key) {
    return {
        name: `pick ${key.toString()}`,
        operationType: operator_model_js_1.OperationType.MAP,
        operation: (v) => {
            if (v !== undefined && v !== null) {
                return v[key];
            }
            else {
                return v;
            }
        }
    };
}
exports.dsPick = dsPick;
/**
 * Forwards an event to another source
 */
function dsPipe(target) {
    return {
        name: `pipe ${target.name}`,
        operationType: operator_model_js_1.OperationType.NOOP,
        operation: (v) => {
            if (target instanceof data_source_js_1.DataSource || target instanceof stream_js_1.Stream) {
                target.update(v);
            }
            else {
                target.updateDownstream(v);
            }
            return v;
        }
    };
}
exports.dsPipe = dsPipe;
/**
 * Same as pipe except for duplex data sources it pipes upstream
 */
function dsPipeUp(target) {
    return {
        name: `pipeup ${target.name}`,
        operationType: operator_model_js_1.OperationType.NOOP,
        operation: (v) => {
            if (target instanceof data_source_js_1.DataSource || target instanceof stream_js_1.Stream) {
                target.update(v);
            }
            else {
                target.updateUpstream(v);
            }
            return v;
        }
    };
}
exports.dsPipeUp = dsPipeUp;
/**
 * Lets you keep a history of the updates of a source by pushing it onto an array datasource
 */
function dsHistory(reportTarget, generations, cancellationToken = new cancellation_token_js_1.CancellationToken()) {
    return {
        operationType: operator_model_js_1.OperationType.NOOP,
        name: `history`,
        operation: (v) => {
            if (!cancellationToken.isCanceled) {
                if (generations) {
                    if (reportTarget.length.value >= generations) {
                        reportTarget.removeLeft(reportTarget.length.value - generations);
                    }
                }
                reportTarget.push(v);
            }
            return v;
        }
    };
}
exports.dsHistory = dsHistory;
/**
 * Monitors the number of events per interval
 */
function dsThroughputMeter(reportTarget, interval, cancellationToken = new cancellation_token_js_1.CancellationToken()) {
    let amount = 0;
    cancellationToken.setInterval(() => {
        reportTarget.update(amount);
        amount = 0;
    }, interval);
    return {
        operationType: operator_model_js_1.OperationType.NOOP,
        name: `throughput meter`,
        operation: (v) => {
            amount++;
            return v;
        }
    };
}
exports.dsThroughputMeter = dsThroughputMeter;
/**
 * Allows inserting a callback that gets called with an update
 */
function dsTap(cb) {
    return {
        name: 'tap',
        operationType: operator_model_js_1.OperationType.NOOP,
        operation: (v) => {
            cb(v);
            return v;
        }
    };
}
exports.dsTap = dsTap;
/**
 * Pipes updates to the targets in round-robin fashion
 */
function dsLoadBalance(targets) {
    let i = 0;
    return {
        name: `loadBalance [${targets.map((v) => v.name).join()}]`,
        operationType: operator_model_js_1.OperationType.NOOP,
        operation: (v) => {
            const target = targets[i++];
            if (i >= targets.length) {
                i = 0;
            }
            if (target instanceof data_source_js_1.DataSource || target instanceof stream_js_1.Stream) {
                target.update(v);
            }
            else {
                target.updateDownstream(v);
            }
            return v;
        }
    };
}
exports.dsLoadBalance = dsLoadBalance;
/**
 * Logs updates to the console
 */
function dsLog(prefix = '', suffix = '') {
    return {
        name: `log`,
        operationType: operator_model_js_1.OperationType.NOOP,
        operation: (v) => {
            console.log(`${prefix}${v}${suffix}`);
            return v;
        }
    };
}
exports.dsLog = dsLog;
function dsPipeAll(...sources) {
    return {
        name: `pipeAll [${sources.map((v) => v.name).join()}]`,
        operationType: operator_model_js_1.OperationType.NOOP,
        operation: (v) => {
            sources.forEach((source) => {
                if (source instanceof data_source_js_1.DataSource || source instanceof stream_js_1.Stream) {
                    source.update(v);
                }
                else {
                    source.updateDownstream(v);
                }
            });
            return v;
        }
    };
}
exports.dsPipeAll = dsPipeAll;
//# sourceMappingURL=data_source_operators.js.map

/***/ }),

/***/ "./node_modules/aurumjs/prebuilt/cjs/stream/duplex_data_source.js":
/*!************************************************************************!*\
  !*** ./node_modules/aurumjs/prebuilt/cjs/stream/duplex_data_source.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.processTransformDuplex = exports.DuplexDataSource = void 0;
const aurum_server_client_js_1 = __webpack_require__(/*! ../aurum_server/aurum_server_client.js */ "./node_modules/aurumjs/prebuilt/cjs/aurum_server/aurum_server_client.js");
const cancellation_token_js_1 = __webpack_require__(/*! ../utilities/cancellation_token.js */ "./node_modules/aurumjs/prebuilt/cjs/utilities/cancellation_token.js");
const event_emitter_js_1 = __webpack_require__(/*! ../utilities/event_emitter.js */ "./node_modules/aurumjs/prebuilt/cjs/utilities/event_emitter.js");
const data_source_js_1 = __webpack_require__(/*! ./data_source.js */ "./node_modules/aurumjs/prebuilt/cjs/stream/data_source.js");
const duplex_data_source_operators_js_1 = __webpack_require__(/*! ./duplex_data_source_operators.js */ "./node_modules/aurumjs/prebuilt/cjs/stream/duplex_data_source_operators.js");
const operator_model_js_1 = __webpack_require__(/*! ./operator_model.js */ "./node_modules/aurumjs/prebuilt/cjs/stream/operator_model.js");
/**
 * Same as DataSource except data can flow in both directions
 */
class DuplexDataSource {
    /**
     *
     * @param initialValue
     * @param rootNode If a write is done propagate this update back down to all the consumers. Useful at the root node
     */
    constructor(initialValue, rootNode = true, name = 'RootDuplexDataSource') {
        this.name = name;
        this.value = initialValue;
        this.primed = initialValue !== undefined;
        this.updateDownstreamEvent = new event_emitter_js_1.EventEmitter();
        this.updateUpstreamEvent = new event_emitter_js_1.EventEmitter();
        this.propagateWritesToReadStream = rootNode;
    }
    /**
     * Connects to an aurum-server exposed datasource view https://github.com/CyberPhoenix90/aurum-server for more information
     * Note that type safety is not guaranteed. Whatever the server sends as an update will be propagated
     * @param  {AurumServerInfo} aurumServerInfo
     * @returns DataSource
     */
    static fromRemoteSource(aurumServerInfo, cancellation) {
        const result = new DuplexDataSource(undefined, false);
        (0, aurum_server_client_js_1.syncDuplexDataSource)(result, aurumServerInfo, cancellation);
        return result;
    }
    static toDuplexDataSource(value) {
        if (value instanceof DuplexDataSource) {
            return value;
        }
        else {
            return new DuplexDataSource(value);
        }
    }
    /**
     * Makes it possible to have 2 completely separate data flow pipelines for each direction
     * @param downStream stream to pipe downstream data to
     * @param upstream  stream to pipe upstream data to
     */
    static fromTwoDataSource(downStream, upstream, initialValue, propagateWritesToReadStream = true) {
        const result = new DuplexDataSource(initialValue, propagateWritesToReadStream);
        //@ts-ignore
        result.updateDownstreamEvent = downStream.updateEvent;
        //@ts-ignore
        result.updateUpstreamEvent = upstream.updateEvent;
        return result;
    }
    /**
     * Updates the data source with a value if it has never had a value before
     */
    withInitial(value) {
        if (!this.primed) {
            this.updateDownstream(value);
        }
        return this;
    }
    toString() {
        return this.value.toString();
    }
    /**
     * Allows creating a duplex stream that blocks data in one direction. Useful for plugging into code that uses two way flow but only one way is desired
     * @param direction direction of the dataflow that is allowed
     */
    static createOneWay(direction = duplex_data_source_operators_js_1.DataFlow.DOWNSTREAM, initialValue) {
        return new DuplexDataSource(initialValue, false).transformDuplex((0, duplex_data_source_operators_js_1.ddsOneWayFlow)(direction));
    }
    /**
     * Updates the value in the data source and calls the listen callback for all listeners
     * @param newValue new value for the data source
     */
    updateDownstream(newValue) {
        if (this.updatingDownstream) {
            throw new Error('Problem in datas source: Unstable value propagation, when updating a value the stream was updated back as a direct response. This can lead to infinite loops and is therefore not allowed');
        }
        this.primed = true;
        this.updatingDownstream = true;
        this.value = newValue;
        this.updateDownstreamEvent.fire(newValue);
        this.updatingDownstream = false;
    }
    /**
     * Updates the value in the data source and calls the listen callback for all listeners
     * @param newValue new value for the data source
     */
    updateUpstream(newValue) {
        if (this.updatingUpstream) {
            throw new Error('Problem in datas source: Unstable value propagation, when updating a value the stream was updated back as a direct response. This can lead to infinite loops and is therefore not allowed');
        }
        this.primed = true;
        this.updatingUpstream = true;
        this.value = newValue;
        this.updateUpstreamEvent.fire(newValue);
        if (this.propagateWritesToReadStream) {
            this.updateDownstreamEvent.fire(newValue);
        }
        this.updatingUpstream = false;
    }
    /**
     * Same as listen but will immediately call the callback with the current value first
     * @param callback Callback to call when value is updated
     * @param cancellationToken Optional token to control the cancellation of the subscription
     * @returns Cancellation callback, can be used to cancel subscription without a cancellation token
     */
    listenAndRepeat(callback, cancellationToken) {
        if (this.primed) {
            callback(this.value);
        }
        return this.listen(callback, cancellationToken);
    }
    /**
     * alias for listenDownstream
     * @param callback Callback to call when value is updated
     * @param cancellationToken Optional token to control the cancellation of the subscription
     * @returns Cancellation callback, can be used to cancel subscription without a cancellation token
     */
    listen(callback, cancellationToken) {
        return this.listenInternal(callback, cancellationToken);
    }
    listenInternal(callback, cancellationToken) {
        return this.updateDownstreamEvent.subscribe(callback, cancellationToken).cancel;
    }
    /**
     * Subscribes exclusively to updates of the data stream that occur due to an update flowing upstream
     * @param callback Callback to call when value is updated
     * @param cancellationToken Optional token to control the cancellation of the subscription
     * @returns Cancellation callback, can be used to cancel subscription without a cancellation token
     */
    listenUpstream(callback, cancellationToken) {
        return this.updateUpstreamEvent.subscribe(callback, cancellationToken).cancel;
    }
    /**
     * Subscribes exclusively to updates of the data stream that occur due to an update flowing upstream
     * @param callback Callback to call when value is updated
     * @param cancellationToken Optional token to control the cancellation of the subscription
     * @returns Cancellation callback, can be used to cancel subscription without a cancellation token
     */
    listenUpstreamAndRepeat(callback, cancellationToken) {
        if (this.primed) {
            callback(this.value);
        }
        return this.updateUpstreamEvent.subscribe(callback, cancellationToken).cancel;
    }
    /**
     * Subscribes exclusively to one update of the data stream that occur due to an update flowing upstream
     * @param callback Callback to call when value is updated
     * @param cancellationToken Optional token to control the cancellation of the subscription
     * @returns Cancellation callback, can be used to cancel subscription without a cancellation token
     */
    listenUpstreamOnce(callback, cancellationToken) {
        return this.updateUpstreamEvent.subscribeOnce(callback, cancellationToken).cancel;
    }
    /**
     * Subscribes exclusively to updates of the data stream that occur due to an update flowing downstream
     * @param callback Callback to call when value is updated
     * @param cancellationToken Optional token to control the cancellation of the subscription
     * @returns Cancellation callback, can be used to cancel subscription without a cancellation token
     */
    listenDownstream(callback, cancellationToken) {
        return this.updateDownstreamEvent.subscribe(callback, cancellationToken).cancel;
    }
    downStreamToDataSource(cancellationToken) {
        const downStreamDatasource = new data_source_js_1.DataSource(this.value);
        this.listenDownstream((newVal) => {
            downStreamDatasource.update(newVal);
        }, cancellationToken);
        return downStreamDatasource;
    }
    aggregate(otherSources, combinator, cancellationToken) {
        var _a;
        cancellationToken = cancellationToken !== null && cancellationToken !== void 0 ? cancellationToken : new cancellation_token_js_1.CancellationToken();
        const aggregatedSource = new data_source_js_1.DataSource(combinator(this.value, ...otherSources.map((s) => s === null || s === void 0 ? void 0 : s.value)));
        for (let i = 0; i < otherSources.length; i++) {
            (_a = otherSources[i]) === null || _a === void 0 ? void 0 : _a.listen(() => {
                aggregatedSource.update(combinator(this.value, ...otherSources.map((s) => s === null || s === void 0 ? void 0 : s.value)));
            }, cancellationToken);
        }
        this.listen(() => aggregatedSource.update(combinator(this.value, ...otherSources.map((s) => s === null || s === void 0 ? void 0 : s.value))), cancellationToken);
        return aggregatedSource;
    }
    transformDuplex(operationA, operationB, operationC, operationD, operationE, operationF, operationG, operationH, operationI, operationJ, operationK, cancellationToken) {
        let token;
        const operations = [
            operationA,
            operationB,
            operationC,
            operationD,
            operationE,
            operationF,
            operationG,
            operationH,
            operationI,
            operationJ,
            operationK
        ].filter((e) => e && (e instanceof cancellation_token_js_1.CancellationToken ? ((token = e), false) : true));
        if (cancellationToken) {
            token = cancellationToken;
        }
        const result = new DuplexDataSource(undefined, false, this.name + ' ' + operations.map((v) => v.name).join(' '));
        (this.primed ? this.listenAndRepeat : this.listen).call(this, processTransformDuplex(operations, result, duplex_data_source_operators_js_1.DataFlow.DOWNSTREAM), token);
        result.listenUpstream.call(result, processTransformDuplex(operations, this, duplex_data_source_operators_js_1.DataFlow.UPSTREAM), token);
        return result;
    }
    transform(operationA, operationB, operationC, operationD, operationE, operationF, operationG, operationH, operationI, operationJ, operationK, cancellationToken) {
        let token;
        const operations = [
            operationA,
            operationB,
            operationC,
            operationD,
            operationE,
            operationF,
            operationG,
            operationH,
            operationI,
            operationJ,
            operationK
        ].filter((e) => e && (e instanceof cancellation_token_js_1.CancellationToken ? ((token = e), false) : true));
        if (cancellationToken) {
            token = cancellationToken;
        }
        const result = new data_source_js_1.DataSource(undefined, this.name + ' ' + operations.map((v) => v.name).join(' '));
        (this.primed ? this.listenAndRepeat : this.listen).call(this, (0, data_source_js_1.processTransform)(operations, result), token);
        return result;
    }
    /**
     * Forwards all updates from this source to another
     * @param targetDataSource datasource to pipe the updates to
     * @param cancellationToken  Cancellation token to cancel the subscriptions added to the datasources by this operation
     */
    pipe(targetDataSource, cancellationToken) {
        this.listenDownstream((newVal) => targetDataSource.updateDownstream(newVal), cancellationToken);
        targetDataSource.listenUpstream((newVal) => this.updateUpstream(newVal), cancellationToken);
        return this;
    }
    listenOnce(callback, cancellationToken) {
        return this.updateDownstreamEvent.subscribeOnce(callback, cancellationToken).cancel;
    }
    /**
     * Returns a promise that resolves when the next update occurs
     * @param cancellationToken
     */
    awaitNextUpdate(cancellationToken) {
        return new Promise((resolve) => {
            this.listenOnce((value) => resolve(value), cancellationToken);
        });
    }
    /**
     * Remove all listeners
     */
    cancelAll() {
        this.updateDownstreamEvent.cancelAll();
        this.updateUpstreamEvent.cancelAll();
    }
    cancelAllDownstream() {
        this.updateDownstreamEvent.cancelAll();
    }
    cancelAllUpstream() {
        this.updateUpstreamEvent.cancelAll();
    }
    /**
     * Assign a function to handle errors and map them back to regular values. Rethrow the error in case you want to fallback to emitting error
     */
    handleErrors(callback) {
        this.errorHandler = callback;
        return this;
    }
    onError(callback, cancellationToken) {
        this.errorEvent.subscribe(callback, cancellationToken);
        return this;
    }
    emitError(e, direction) {
        if (this.errorHandler) {
            try {
                if (direction === duplex_data_source_operators_js_1.DataFlow.DOWNSTREAM) {
                    return this.updateDownstream(this.errorHandler(e));
                }
                else {
                    return this.updateUpstream(this.errorHandler(e));
                }
            }
            catch (newError) {
                e = newError;
            }
        }
        if (this.errorEvent.hasSubscriptions()) {
            this.errorEvent.fire(e);
        }
        else {
            throw e;
        }
    }
}
exports.DuplexDataSource = DuplexDataSource;
function processTransformDuplex(operations, result, direction) {
    return async (v) => {
        try {
            for (const operation of operations) {
                switch (operation.operationType) {
                    case operator_model_js_1.OperationType.NOOP:
                    case operator_model_js_1.OperationType.MAP:
                        v =
                            direction === duplex_data_source_operators_js_1.DataFlow.DOWNSTREAM
                                ? operation.operationDown(v)
                                : operation.operationUp(v);
                        break;
                    case operator_model_js_1.OperationType.MAP_DELAY_FILTER:
                        const tmp = direction === duplex_data_source_operators_js_1.DataFlow.DOWNSTREAM
                            ? await operation.operationDown(v)
                            : await operation.operationUp(v);
                        if (tmp.cancelled) {
                            return;
                        }
                        else {
                            v = await tmp.item;
                        }
                        break;
                    case operator_model_js_1.OperationType.DELAY:
                    case operator_model_js_1.OperationType.MAP_DELAY:
                        v =
                            direction === duplex_data_source_operators_js_1.DataFlow.DOWNSTREAM
                                ? await operation.operationDown(v)
                                : await operation.operationUp(v);
                        break;
                    case operator_model_js_1.OperationType.DELAY_FILTER:
                        if (!(direction === duplex_data_source_operators_js_1.DataFlow.DOWNSTREAM
                            ? await operation.operationDown(v)
                            : await operation.operationUp(v))) {
                            return;
                        }
                        break;
                    case operator_model_js_1.OperationType.FILTER:
                        if (!(direction === duplex_data_source_operators_js_1.DataFlow.DOWNSTREAM
                            ? operation.operationDown(v)
                            : operation.operationUp(v))) {
                            return;
                        }
                        break;
                }
            }
            if (direction === duplex_data_source_operators_js_1.DataFlow.DOWNSTREAM) {
                result.updateDownstream(v);
            }
            else {
                result.updateUpstream(v);
            }
        }
        catch (e) {
            result.emitError(e, direction);
        }
    };
}
exports.processTransformDuplex = processTransformDuplex;
//# sourceMappingURL=duplex_data_source.js.map

/***/ }),

/***/ "./node_modules/aurumjs/prebuilt/cjs/stream/duplex_data_source_operators.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/aurumjs/prebuilt/cjs/stream/duplex_data_source_operators.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ddsUnique = exports.ddsFilter = exports.ddsOneWayFlow = exports.ddsDebounce = exports.ddsMap = exports.DataFlowBoth = exports.DataFlow = void 0;
const data_source_operators_js_1 = __webpack_require__(/*! ./data_source_operators.js */ "./node_modules/aurumjs/prebuilt/cjs/stream/data_source_operators.js");
const operator_model_js_1 = __webpack_require__(/*! ./operator_model.js */ "./node_modules/aurumjs/prebuilt/cjs/stream/operator_model.js");
var DataFlow;
(function (DataFlow) {
    DataFlow[DataFlow["UPSTREAM"] = 0] = "UPSTREAM";
    DataFlow[DataFlow["DOWNSTREAM"] = 1] = "DOWNSTREAM";
})(DataFlow = exports.DataFlow || (exports.DataFlow = {}));
var DataFlowBoth;
(function (DataFlowBoth) {
    DataFlowBoth[DataFlowBoth["UPSTREAM"] = 0] = "UPSTREAM";
    DataFlowBoth[DataFlowBoth["DOWNSTREAM"] = 1] = "DOWNSTREAM";
    DataFlowBoth[DataFlowBoth["BOTH"] = 2] = "BOTH";
})(DataFlowBoth = exports.DataFlowBoth || (exports.DataFlowBoth = {}));
function ddsMap(mapDown, mapUp) {
    return {
        name: 'map',
        operationType: operator_model_js_1.OperationType.MAP,
        operationDown: (v) => mapDown(v),
        operationUp: (v) => mapUp(v)
    };
}
exports.ddsMap = ddsMap;
/**
 * Starts a timer when an update occurs, delays the update until the timer passed if a new update arrives the initial
 * update is cancelled and the process starts again
 */
function ddsDebounce(time, direction) {
    const debounceDown = (0, data_source_operators_js_1.dsDebounce)(time);
    const debounceUp = (0, data_source_operators_js_1.dsDebounce)(time);
    return {
        operationType: operator_model_js_1.OperationType.DELAY_FILTER,
        name: `debounce ${time}ms`,
        operationDown: (v) => {
            if (direction === undefined || direction === DataFlowBoth.DOWNSTREAM || direction === DataFlowBoth.BOTH) {
                return debounceDown.operation(v);
            }
            else {
                return Promise.resolve(true);
            }
        },
        operationUp: (v) => {
            if (direction === undefined || direction === DataFlowBoth.UPSTREAM || direction === DataFlowBoth.BOTH) {
                return debounceUp.operation(v);
            }
            else {
                return Promise.resolve(true);
            }
        }
    };
}
exports.ddsDebounce = ddsDebounce;
function ddsOneWayFlow(direction) {
    if (direction === DataFlow.DOWNSTREAM) {
        return ddsFilter(() => true, () => false);
    }
    else {
        return ddsFilter(() => false, () => true);
    }
}
exports.ddsOneWayFlow = ddsOneWayFlow;
function ddsFilter(predicateDown, predicateUp) {
    return {
        name: 'filter',
        operationType: operator_model_js_1.OperationType.FILTER,
        operationDown: (v) => predicateDown(v),
        operationUp: (v) => predicateUp(v)
    };
}
exports.ddsFilter = ddsFilter;
function ddsUnique(direction, isEqual) {
    let lastDown;
    let lastUp;
    let primedUp = false;
    let primedDown = false;
    return {
        name: 'filter',
        operationType: operator_model_js_1.OperationType.FILTER,
        operationDown: (v) => {
            if (direction === undefined || direction === DataFlowBoth.DOWNSTREAM || direction === DataFlowBoth.BOTH) {
                if (primedDown && (isEqual ? isEqual(lastDown, v) : v === lastDown)) {
                    return false;
                }
                else {
                    primedDown = true;
                    lastDown = v;
                    return true;
                }
            }
            else {
                return true;
            }
        },
        operationUp: (v) => {
            if (direction === undefined || direction === DataFlowBoth.UPSTREAM || direction === DataFlowBoth.BOTH) {
                if (primedUp && (isEqual ? isEqual(lastUp, v) : v === lastUp)) {
                    return false;
                }
                else {
                    lastUp = v;
                    primedUp = true;
                    return true;
                }
            }
            else {
                return true;
            }
        }
    };
}
exports.ddsUnique = ddsUnique;
//# sourceMappingURL=duplex_data_source_operators.js.map

/***/ }),

/***/ "./node_modules/aurumjs/prebuilt/cjs/stream/emitters.js":
/*!**************************************************************!*\
  !*** ./node_modules/aurumjs/prebuilt/cjs/stream/emitters.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.tweenEmitter = exports.animate = exports.windowSizeEmitter = exports.urlHashEmitter = exports.intervalEmitter = void 0;
const data_source_js_1 = __webpack_require__(/*! ./data_source.js */ "./node_modules/aurumjs/prebuilt/cjs/stream/data_source.js");
const stream_js_1 = __webpack_require__(/*! ./stream.js */ "./node_modules/aurumjs/prebuilt/cjs/stream/stream.js");
const duplex_data_source_js_1 = __webpack_require__(/*! ./duplex_data_source.js */ "./node_modules/aurumjs/prebuilt/cjs/stream/duplex_data_source.js");
const cancellation_token_js_1 = __webpack_require__(/*! ../utilities/cancellation_token.js */ "./node_modules/aurumjs/prebuilt/cjs/utilities/cancellation_token.js");
const data_source_operators_js_1 = __webpack_require__(/*! ./data_source_operators.js */ "./node_modules/aurumjs/prebuilt/cjs/stream/data_source_operators.js");
/**
 * Convenience function to update a stream at fixed intervals
 */
function intervalEmitter(target, interval, value, cancellationToken) {
    (cancellationToken !== null && cancellationToken !== void 0 ? cancellationToken : new cancellation_token_js_1.CancellationToken()).setInterval(() => {
        updateSource(target, value);
    }, interval);
}
exports.intervalEmitter = intervalEmitter;
function updateSource(target, value) {
    if (target instanceof data_source_js_1.ArrayDataSource) {
        target.push(value);
    }
    else if (target instanceof duplex_data_source_js_1.DuplexDataSource) {
        target.updateDownstream(value);
    }
    else {
        target.update(value);
    }
}
function urlHashEmitter(target, stripInHashParameters = false, cancellationToken) {
    updateSource(target, stripInHashParameters ? getUrlHash() : location.hash);
    (cancellationToken !== null && cancellationToken !== void 0 ? cancellationToken : new cancellation_token_js_1.CancellationToken()).registerDomEvent(window, 'hashchange', () => {
        updateSource(target, stripInHashParameters ? getUrlHash() : location.hash);
    });
}
exports.urlHashEmitter = urlHashEmitter;
function getUrlHash() {
    const hash = location.hash.substring(1);
    if (hash.includes('?')) {
        return hash.substring(0, hash.indexOf('?'));
    }
    else if (hash.includes('#')) {
        return hash.substring(0, hash.indexOf('#'));
    }
    else {
        return hash;
    }
}
/**
 * Convenience function to stream the window size to a data source
 */
function windowSizeEmitter(target, debounce = 100, cancellationToken) {
    cancellationToken !== null && cancellationToken !== void 0 ? cancellationToken : (cancellationToken = new cancellation_token_js_1.CancellationToken());
    const updateStream = new data_source_js_1.DataSource();
    cancellationToken.registerDomEvent(window, 'resize', () => {
        updateStream.update();
    });
    target.assign({
        width: window.innerWidth,
        height: window.innerHeight
    });
    updateStream.transform((0, data_source_operators_js_1.dsDebounce)(debounce), (0, data_source_operators_js_1.dsTap)(() => target.assign({
        width: window.innerWidth,
        height: window.innerHeight
    })));
}
exports.windowSizeEmitter = windowSizeEmitter;
/**
 * Calls the callback every animation frame with a number from 0 to 1 indicating how far along in the animation timeline it is.
 *
 */
function animate(cb, time, cancellationToken) {
    return new Promise((resolve) => {
        const animationToken = new cancellation_token_js_1.CancellationToken();
        if (cancellationToken) {
            cancellationToken.chain(animationToken);
        }
        animationToken.addCancelable(resolve);
        let start = Date.now();
        (0, cancellation_token_js_1.registerAnimationLoop)(() => {
            const progress = Math.min(1, (Date.now() - start) / time);
            cb(progress);
            if (progress === 1) {
                animationToken.cancel();
            }
        }, animationToken);
    });
}
exports.animate = animate;
/**
 * Convenience function to stream animate to a datasource
 */
function tweenEmitter(target, duration, startValue, endValue, interpolation, cancellationToken) {
    if (target instanceof data_source_js_1.DataSource || target instanceof duplex_data_source_js_1.DuplexDataSource || target instanceof stream_js_1.Stream) {
        if (startValue === endValue) {
            return new Promise((res) => setTimeout(res, duration));
        }
    }
    return animate((progress) => {
        if (interpolation) {
            progress = interpolation(progress);
        }
        const value = startValue + (endValue - startValue) * progress;
        if (target instanceof data_source_js_1.ArrayDataSource) {
            target.push(value);
        }
        else if (target instanceof duplex_data_source_js_1.DuplexDataSource) {
            target.updateDownstream(value);
        }
        else {
            target.update(value);
        }
    }, duration, cancellationToken);
}
exports.tweenEmitter = tweenEmitter;
//# sourceMappingURL=emitters.js.map

/***/ }),

/***/ "./node_modules/aurumjs/prebuilt/cjs/stream/object_data_source.js":
/*!************************************************************************!*\
  !*** ./node_modules/aurumjs/prebuilt/cjs/stream/object_data_source.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ObjectDataSource = void 0;
const aurum_server_client_js_1 = __webpack_require__(/*! ../aurum_server/aurum_server_client.js */ "./node_modules/aurumjs/prebuilt/cjs/aurum_server/aurum_server_client.js");
const event_emitter_js_1 = __webpack_require__(/*! ../utilities/event_emitter.js */ "./node_modules/aurumjs/prebuilt/cjs/utilities/event_emitter.js");
const data_source_js_1 = __webpack_require__(/*! ./data_source.js */ "./node_modules/aurumjs/prebuilt/cjs/stream/data_source.js");
const duplex_data_source_js_1 = __webpack_require__(/*! ./duplex_data_source.js */ "./node_modules/aurumjs/prebuilt/cjs/stream/duplex_data_source.js");
class ObjectDataSource {
    constructor(initialData) {
        this.data = initialData;
        this.updateEvent = new event_emitter_js_1.EventEmitter();
        this.updateEventOnKey = new Map();
    }
    /**
     * Connects to an aurum-server exposed object datasource. View https://github.com/CyberPhoenix90/aurum-server for more information
     * Note that type safety is not guaranteed. Whatever the server sends as an update will be propagated. Make sure you trust the server
     * @param  {AurumServerInfo} aurumServerInfo
     * @returns DataSource
     */
    static fromRemoteSource(aurumServerInfo, cancellation) {
        const result = new ObjectDataSource(undefined);
        (0, aurum_server_client_js_1.syncObjectDataSource)(result, aurumServerInfo, cancellation);
        return result;
    }
    static toObjectDataSource(value) {
        if (value instanceof ObjectDataSource) {
            return value;
        }
        else {
            return new ObjectDataSource(value);
        }
    }
    toString() {
        return this.data.toString();
    }
    /**
     * Remove all listeners
     */
    cancelAll() {
        this.updateEvent.cancelAll();
        this.updateEventOnKey.forEach((v) => v.cancelAll());
    }
    pickObject(key, cancellationToken) {
        if (typeof this.data[key] === 'object') {
            const subDataSource = new ObjectDataSource(this.data[key]);
            subDataSource.listen((change) => {
                if (change.deleted) {
                    delete this.data[key][change.key];
                }
                else {
                    this.get(key)[change.key] = change.newValue;
                }
            }, cancellationToken);
            this.listenOnKey(key, (v) => {
                if (typeof v.newValue === 'object') {
                    if (v.newValue !== subDataSource.data) {
                        subDataSource.merge(v.newValue);
                    }
                }
                else {
                    subDataSource.clear();
                }
            });
            return subDataSource;
        }
        else {
            throw new Error('Cannot pick a non object key');
        }
    }
    pickArray(key, cancellationToken) {
        var _a;
        if (Array.isArray(this.data[key])) {
            const subDataSource = new data_source_js_1.ArrayDataSource((_a = this.data) === null || _a === void 0 ? void 0 : _a[key]);
            subDataSource.listen((change) => {
                this.set(key, change.newState);
            }, cancellationToken);
            this.listenOnKey(key, (v) => {
                if (Array.isArray(v.newValue)) {
                    if (v.newValue.length !== subDataSource.length.value || !subDataSource.getData().every((item, index) => v.newValue[index] === item)) {
                        subDataSource.merge(v.newValue);
                    }
                }
                else {
                    subDataSource.clear();
                }
            });
            return subDataSource;
        }
        else {
            throw new Error('Cannot pick a non array key');
        }
    }
    /**
     * Creates a datasource for a single key of the object
     * @param key
     * @param cancellationToken
     */
    pick(key, cancellationToken) {
        var _a;
        const subDataSource = new data_source_js_1.DataSource((_a = this.data) === null || _a === void 0 ? void 0 : _a[key]);
        subDataSource.listen(() => {
            this.set(key, subDataSource.value);
        }, cancellationToken);
        this.listenOnKey(key, (v) => {
            if (subDataSource.value !== v.newValue) {
                subDataSource.update(v.newValue);
            }
        }, cancellationToken);
        return subDataSource;
    }
    /**
     * Creates a duplexdatasource for a single key of the object
     * @param key
     * @param cancellationToken
     */
    pickDuplex(key, cancellationToken) {
        var _a;
        const subDataSource = new duplex_data_source_js_1.DuplexDataSource((_a = this.data) === null || _a === void 0 ? void 0 : _a[key]);
        subDataSource.listenUpstream((v) => {
            this.set(key, v);
        });
        this.listenOnKey(key, (v) => {
            if (subDataSource.value !== v.newValue) {
                subDataSource.updateDownstream(v.newValue);
            }
        }, cancellationToken);
        return subDataSource;
    }
    hasKey(key) {
        return this.data.hasOwnProperty(key);
    }
    applyObjectChange(change) {
        if (change.deleted && this.hasKey(change.key)) {
            this.delete(change.key);
        }
        else if (change.newValue !== this.get(change.key)) {
            this.set(change.key, change.newValue);
        }
    }
    /**
     * Listen to changes of the object
     */
    listen(callback, cancellationToken) {
        return this.updateEvent.subscribe(callback, cancellationToken).cancel;
    }
    map(mapper) {
        const stateMap = new Map();
        const result = new data_source_js_1.ArrayDataSource();
        this.listenAndRepeat((change) => {
            if (change.deleted && stateMap.has(change.key)) {
                const item = stateMap.get(change.key);
                result.remove(item);
                stateMap.delete(change.key);
            }
            else if (stateMap.has(change.key)) {
                const newItem = mapper(change.key, change.newValue);
                result.replace(stateMap.get(change.key), newItem);
                stateMap.set(change.key, newItem);
            }
            else if (!stateMap.has(change.key) && !change.deleted) {
                const newItem = mapper(change.key, change.newValue);
                result.push(newItem);
                stateMap.set(change.key, newItem);
            }
        });
        return result;
    }
    /**
     * Same as listen but will immediately call the callback with the current value of each key
     */
    listenAndRepeat(callback, cancellationToken) {
        const c = this.updateEvent.subscribe(callback, cancellationToken).cancel;
        for (const key in this.data) {
            callback({
                key,
                newValue: this.data[key],
                oldValue: undefined,
                deleted: false
            });
        }
        return c;
    }
    /**
     * Same as listenOnKey but will immediately call the callback with the current value first
     */
    listenOnKeyAndRepeat(key, callback, cancellationToken) {
        callback({
            key,
            newValue: this.data[key],
            oldValue: undefined
        });
        return this.listenOnKey(key, callback, cancellationToken);
    }
    /**
     * Listen to changes of a single key of the object
     */
    listenOnKey(key, callback, cancellationToken) {
        if (!this.updateEventOnKey.has(key)) {
            this.updateEventOnKey.set(key, new event_emitter_js_1.EventEmitter());
        }
        const event = this.updateEventOnKey.get(key);
        return event.subscribe(callback, cancellationToken).cancel;
    }
    /**
     * Returns all the keys of the object in the source
     */
    keys() {
        return Object.keys(this.data);
    }
    /**
     * Returns all the values of the object in the source
     */
    values() {
        return Object.values(this.data);
    }
    /**
     * get the current value of a key of the object
     * @param key
     */
    get(key) {
        return this.data[key];
    }
    /**
     * delete a key from the object
     * @param key
     * @param value
     */
    delete(key) {
        if (this.hasKey(key)) {
            const old = this.data[key];
            delete this.data[key];
            this.updateEvent.fire({ oldValue: old, key, newValue: undefined, deleted: true });
            if (this.updateEventOnKey.has(key)) {
                this.updateEventOnKey.get(key).fire({ oldValue: old, key, newValue: undefined });
            }
        }
    }
    /**
     * set the value for a key of the object
     * @param key
     * @param value
     */
    set(key, value) {
        if (this.data[key] === value) {
            return;
        }
        const old = this.data[key];
        this.data[key] = value;
        this.updateEvent.fire({ oldValue: old, key, newValue: this.data[key] });
        if (this.updateEventOnKey.has(key)) {
            this.updateEventOnKey.get(key).fire({ oldValue: old, key, newValue: this.data[key] });
        }
    }
    /**
     * Merge the key value pairs of an object into this object non recursively
     * @param newData
     */
    assign(newData) {
        if (newData instanceof ObjectDataSource) {
            for (const key of newData.keys()) {
                this.set(key, newData.data[key]);
            }
        }
        else {
            for (const key of Object.keys(newData)) {
                this.set(key, newData[key]);
            }
        }
    }
    /**
     * Merge the key value pairs of an object into this object non recursively and delete properties that do not exist in the newData
     * @param newData
     */
    merge(newData) {
        var _a;
        const keys = new Set(Object.keys((_a = this.data) !== null && _a !== void 0 ? _a : {}));
        if (newData instanceof ObjectDataSource) {
            for (const key of newData.keys()) {
                keys.delete(key);
                this.set(key, newData.data[key]);
            }
        }
        else {
            for (const key of Object.keys(newData)) {
                keys.delete(key);
                this.set(key, newData[key]);
            }
        }
        for (const key of keys) {
            this.delete(key);
        }
    }
    /**
     * Deletes all keys
     */
    clear() {
        if (this.data == undefined) {
            return;
        }
        for (const key in this.data) {
            this.delete(key);
        }
    }
    getData() {
        return this.data;
    }
    /**
     * Returns a shallow copy of the object
     */
    toObject() {
        return { ...this.data };
    }
    /**
     * Returns a simplified version of this datasource
     */
    toDataSource() {
        const stream = new data_source_js_1.DataSource(this.data);
        this.listen((s) => {
            stream.update(this.data);
        });
        return stream;
    }
}
exports.ObjectDataSource = ObjectDataSource;
//# sourceMappingURL=object_data_source.js.map

/***/ }),

/***/ "./node_modules/aurumjs/prebuilt/cjs/stream/operator_model.js":
/*!********************************************************************!*\
  !*** ./node_modules/aurumjs/prebuilt/cjs/stream/operator_model.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OperationType = void 0;
var OperationType;
(function (OperationType) {
    OperationType[OperationType["FILTER"] = 0] = "FILTER";
    OperationType[OperationType["NOOP"] = 1] = "NOOP";
    OperationType[OperationType["MAP"] = 2] = "MAP";
    OperationType[OperationType["DELAY"] = 3] = "DELAY";
    OperationType[OperationType["MAP_DELAY"] = 4] = "MAP_DELAY";
    OperationType[OperationType["DELAY_FILTER"] = 5] = "DELAY_FILTER";
    OperationType[OperationType["MAP_DELAY_FILTER"] = 6] = "MAP_DELAY_FILTER";
})(OperationType = exports.OperationType || (exports.OperationType = {}));
//# sourceMappingURL=operator_model.js.map

/***/ }),

/***/ "./node_modules/aurumjs/prebuilt/cjs/stream/stream.js":
/*!************************************************************!*\
  !*** ./node_modules/aurumjs/prebuilt/cjs/stream/stream.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Stream = void 0;
const cancellation_token_js_1 = __webpack_require__(/*! ../utilities/cancellation_token.js */ "./node_modules/aurumjs/prebuilt/cjs/utilities/cancellation_token.js");
const data_source_js_1 = __webpack_require__(/*! ./data_source.js */ "./node_modules/aurumjs/prebuilt/cjs/stream/data_source.js");
/**
 * Lets you logically combine 2 data sources so that update calls go through the input source and listen goes to the output source
 */
class Stream {
    constructor() { }
    get name() {
        return `IN:${this.input.name} OUT:${this.output.name}`;
    }
    /**
     * The current value of this data source, can be changed through update
     */
    get value() {
        return this.output.value;
    }
    static fromFetchRaw(url) {
        const input = new data_source_js_1.DataSource();
        const output = new data_source_js_1.DataSource();
        input.listen((value) => {
            output.update(fetch(url, value));
        });
        return Stream.fromPreconnectedSources(input, output);
    }
    static fromPreconnectedSources(inputSource, outputSource) {
        const result = new Stream();
        result.input = inputSource !== null && inputSource !== void 0 ? inputSource : new data_source_js_1.DataSource();
        result.output = outputSource !== null && outputSource !== void 0 ? outputSource : result.input;
        return result;
    }
    aggregate(otherSources, combinator, cancellationToken) {
        cancellationToken = cancellationToken !== null && cancellationToken !== void 0 ? cancellationToken : new cancellation_token_js_1.CancellationToken();
        const aggregatedSource = new data_source_js_1.DataSource(combinator(this.value, ...otherSources.map((s) => s.value)));
        for (let i = 0; i < otherSources.length; i++) {
            otherSources[i].listen(() => {
                aggregatedSource.update(combinator(this.value, ...otherSources.map((s) => s.value)));
            }, cancellationToken);
        }
        this.listen(() => aggregatedSource.update(combinator(this.value, ...otherSources.map((s) => s.value))), cancellationToken);
        return aggregatedSource;
    }
    static fromStreamTransformation(operationA, operationB, operationC, operationD, operationE, operationF, operationG, operationH, operationI, operationJ) {
        const result = new Stream();
        result.input = new data_source_js_1.DataSource();
        result.output = result.input.transform(operationA, operationB, operationC, operationD, operationE, operationF, operationG, operationH, operationI, operationJ);
        return result;
    }
    static fromFetchPostJson(url, baseRequestData) {
        const input = new data_source_js_1.DataSource();
        const output = new data_source_js_1.DataSource();
        input.listen(async (value) => {
            output.update(await fetch(url, Object.assign({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            }, baseRequestData, {
                body: JSON.stringify(value)
            })).then((s) => s.json()));
        });
        return Stream.fromPreconnectedSources(input, output);
    }
    static fromFetchGetJson(url, baseRequestData) {
        const input = new data_source_js_1.DataSource();
        const output = new data_source_js_1.DataSource();
        input.listen(async () => {
            output.update(await fetch(url).then((s) => s.json()));
        });
        return Stream.fromPreconnectedSources(input, output);
    }
    update(data) {
        this.input.update(data);
    }
    transform(operationA, operationB, operationC, operationD, operationE, operationF, operationG, operationH, operationI, operationJ, operationK, cancellationToken) {
        let token;
        const operations = [
            operationA,
            operationB,
            operationC,
            operationD,
            operationE,
            operationF,
            operationG,
            operationH,
            operationI,
            operationJ,
            operationK
        ].filter((e) => e && (e instanceof cancellation_token_js_1.CancellationToken ? ((token = e), false) : true));
        if (cancellationToken) {
            token = cancellationToken;
        }
        const result = new data_source_js_1.DataSource(undefined, this.output.name + ' ' + operations.map((v) => v.name).join(' '));
        this.listen((0, data_source_js_1.processTransform)(operations, result), token);
        return Stream.fromPreconnectedSources(this.input, result);
    }
    getInput() {
        return this.input;
    }
    getOutput() {
        return this.output;
    }
    listen(callback, cancellationToken) {
        return this.output.listen(callback, cancellationToken);
    }
    listenAndRepeat(callback, cancellationToken) {
        return this.output.listenAndRepeat(callback, cancellationToken);
    }
    listenOnce(callback, cancellationToken) {
        return this.output.listenOnce(callback, cancellationToken);
    }
    awaitNextUpdate(cancellationToken) {
        return this.output.awaitNextUpdate(cancellationToken);
    }
    cancelAll() {
        this.input.cancelAll();
        this.output.cancelAll();
    }
}
exports.Stream = Stream;
//# sourceMappingURL=stream.js.map

/***/ }),

/***/ "./node_modules/aurumjs/prebuilt/cjs/stream/tree_data_source.js":
/*!**********************************************************************!*\
  !*** ./node_modules/aurumjs/prebuilt/cjs/stream/tree_data_source.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TreeDataSource = void 0;
const cancellation_token_js_1 = __webpack_require__(/*! ../utilities/cancellation_token.js */ "./node_modules/aurumjs/prebuilt/cjs/utilities/cancellation_token.js");
const event_emitter_js_1 = __webpack_require__(/*! ../utilities/event_emitter.js */ "./node_modules/aurumjs/prebuilt/cjs/utilities/event_emitter.js");
const sources_js_1 = __webpack_require__(/*! ../utilities/sources.js */ "./node_modules/aurumjs/prebuilt/cjs/utilities/sources.js");
const data_source_js_1 = __webpack_require__(/*! ./data_source.js */ "./node_modules/aurumjs/prebuilt/cjs/stream/data_source.js");
class TreeDataSource {
    constructor(childrenKey, roots) {
        this.watchCount = 0;
        this.childrenKey = childrenKey;
        this.roots = data_source_js_1.ArrayDataSource.toArrayDataSource(roots);
        this.updateEvent = new event_emitter_js_1.EventEmitter();
    }
    watch(cancellationToken) {
        this.watchCount++;
        cancellationToken.addCancelable(() => {
            this.watchCount--;
            if (this.watchCount === 0) {
                this.watchToken.cancel();
                this.watchToken = undefined;
            }
        });
        if (!this.watchToken) {
            this.watchToken = new cancellation_token_js_1.CancellationToken();
            const watchMap = new Map();
            if (this.roots instanceof data_source_js_1.ArrayDataSource) {
                this.roots.listen((change) => {
                    this.watchHandleChange(change, undefined, watchMap);
                }, this.watchToken);
            }
            for (const root of this.roots) {
                for (const { node } of this.iterateLevelWithMetaData(root, this.roots.length.value)) {
                    if (node[this.childrenKey] instanceof data_source_js_1.ArrayDataSource) {
                        watchMap.set(node, new cancellation_token_js_1.CancellationToken());
                        this.watchToken.chain(watchMap.get(node));
                        node[this.childrenKey].listenAndRepeat((change) => {
                            this.watchHandleChange(change, node, watchMap);
                        }, watchMap.get(node));
                    }
                }
            }
        }
    }
    watchHandleChange(change, parent, watchMap) {
        var _a;
        switch (change.operation) {
            case 'add':
                let i = 0;
                for (const item of change.items) {
                    this.updateEvent.fire({
                        changedNode: item,
                        index: change.index + i++,
                        parentNode: parent,
                        operation: 'added'
                    });
                    if (item[this.childrenKey] instanceof data_source_js_1.ArrayDataSource) {
                        watchMap.set(item, new cancellation_token_js_1.CancellationToken());
                        this.watchToken.chain(watchMap.get(item));
                        item[this.childrenKey].listenAndRepeat((change) => {
                            this.watchHandleChange(change, item, watchMap);
                        }, watchMap.get(item));
                    }
                }
                break;
            case 'remove':
                let j = 0;
                for (const item of change.items) {
                    (_a = watchMap.get(item)) === null || _a === void 0 ? void 0 : _a.cancel();
                    this.updateEvent.fire({
                        changedNode: item,
                        index: change.index + j++,
                        parentNode: parent,
                        operation: 'deleted'
                    });
                }
                break;
            case 'merge':
                throw new Error('Not implemented');
            case 'replace':
                this.updateEvent.fire({
                    changedNode: change.target,
                    index: change.index,
                    parentNode: parent,
                    operation: 'deleted'
                });
                this.updateEvent.fire({
                    changedNode: change.items[0],
                    index: change.index,
                    parentNode: parent,
                    operation: 'added'
                });
                break;
        }
    }
    listen(callback, cancellationToken) {
        this.watch(cancellationToken);
        return this.updateEvent.subscribe(callback, cancellationToken).cancel;
    }
    listenAndRepeat(callback, cancellationToken) {
        for (const { parent, node, index } of this.iterateLevelWithMetaData(this.roots, 0)) {
            callback({
                changedNode: node,
                index,
                parentNode: parent,
                operation: 'added'
            });
        }
        return this.listen(callback, cancellationToken);
    }
    adaptNodeList(nodes, token, nodeList = new data_source_js_1.ArrayDataSource()) {
        const adaptMap = new Map();
        nodes.listenAndRepeat((change) => {
            switch (change.operation) {
                case 'add':
                    for (const item of change.items) {
                        this.addItem(adaptMap, token, item, nodeList);
                    }
                    break;
                case 'remove':
                    for (const item of change.items) {
                        this.removeItem(nodeList, adaptMap, item);
                    }
                    break;
                case 'merge':
                    throw new Error('Not implemented');
                case 'replace':
                    this.removeItem(nodeList, adaptMap, change.target);
                    this.addItem(adaptMap, token, change.items[0], nodeList);
                    break;
            }
        }, token);
        return nodeList;
    }
    adaptNodeTree(parent, nodes, mapper, newKey, token) {
        nodes = data_source_js_1.ArrayDataSource.toArrayDataSource(nodes);
        const newRoots = nodes.map(mapper);
        if (parent) {
            parent[newKey] = newRoots;
        }
        nodes.listenAndRepeat((change) => {
            switch (change.operation) {
                case 'add':
                    let i = change.index;
                    for (const item of change.items) {
                        this.adaptNodeTree(newRoots.get(i++), item[newKey], mapper, newKey, token);
                    }
                    break;
                case 'merge':
                    throw new Error('Not implemented');
                case 'replace':
                    this.adaptNodeTree(newRoots[change.index], change.items[0][newKey], mapper, newKey, token);
                    break;
            }
        }, token);
        return newRoots;
    }
    map(mapper, newKey = this.childrenKey, cancellationToken) {
        return new TreeDataSource(newKey, this.adaptNodeTree(undefined, this.roots, mapper, newKey, cancellationToken));
    }
    addItem(adaptMap, parentToken, item, nodeList) {
        nodeList.push(item);
        adaptMap.set(item, new cancellation_token_js_1.CancellationToken());
        parentToken.chain(adaptMap.get(item));
        const list = data_source_js_1.ArrayDataSource.toArrayDataSource(item[this.childrenKey]);
        this.adaptNodeList(list, adaptMap.get(item), nodeList);
    }
    removeItem(nodeList, adaptMap, item) {
        adaptMap.get(item).cancel();
        nodeList.remove(item);
    }
    createArrayDataSourceOfNodes(cancellationToken) {
        return this.adaptNodeList(this.roots, cancellationToken);
    }
    *[Symbol.iterator]() {
        for (const root of this.roots) {
            yield* this.iterateLevel(root);
        }
        return;
    }
    *iterateWithMetaData() {
        let i = 0;
        for (const root of this.roots) {
            yield* this.iterateLevelWithMetaData(root, this.roots.length.value, undefined, i);
        }
        return;
    }
    *iterateLevelWithMetaData(node, lastIndex, parent, index = 0, level = 0) {
        yield { node: node, parent, index, level, lastIndex };
        let i = 0;
        for (const child of node[this.childrenKey]) {
            yield* this.iterateLevelWithMetaData(child, (0, sources_js_1.getValueOf)(node[this.childrenKey].length), node, i++, level + 1);
        }
    }
    *iterateLevel(level) {
        yield level;
        for (const child of level[this.childrenKey]) {
            yield* this.iterateLevel(child);
        }
    }
}
exports.TreeDataSource = TreeDataSource;
//# sourceMappingURL=tree_data_source.js.map

/***/ }),

/***/ "./node_modules/aurumjs/prebuilt/cjs/utilities/aurum.js":
/*!**************************************************************!*\
  !*** ./node_modules/aurumjs/prebuilt/cjs/utilities/aurum.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Aurum = void 0;
const input_js_1 = __webpack_require__(/*! ../nodes/input.js */ "./node_modules/aurumjs/prebuilt/cjs/nodes/input.js");
const select_js_1 = __webpack_require__(/*! ../nodes/select.js */ "./node_modules/aurumjs/prebuilt/cjs/nodes/select.js");
const simple_dom_nodes_js_1 = __webpack_require__(/*! ../nodes/simple_dom_nodes.js */ "./node_modules/aurumjs/prebuilt/cjs/nodes/simple_dom_nodes.js");
const textarea_js_1 = __webpack_require__(/*! ../nodes/textarea.js */ "./node_modules/aurumjs/prebuilt/cjs/nodes/textarea.js");
const aurum_element_js_1 = __webpack_require__(/*! ../rendering/aurum_element.js */ "./node_modules/aurumjs/prebuilt/cjs/rendering/aurum_element.js");
const data_source_js_1 = __webpack_require__(/*! ../stream/data_source.js */ "./node_modules/aurumjs/prebuilt/cjs/stream/data_source.js");
const nodeMap = {
    address: simple_dom_nodes_js_1.Address,
    kbd: simple_dom_nodes_js_1.Kbd,
    samp: simple_dom_nodes_js_1.Samp,
    object: simple_dom_nodes_js_1.Object,
    optgroup: simple_dom_nodes_js_1.OptGroup,
    picture: simple_dom_nodes_js_1.Picture,
    output: simple_dom_nodes_js_1.Output,
    param: simple_dom_nodes_js_1.Param,
    strong: simple_dom_nodes_js_1.Strong,
    track: simple_dom_nodes_js_1.Track,
    var: simple_dom_nodes_js_1.Var,
    wbr: simple_dom_nodes_js_1.Wbr,
    button: simple_dom_nodes_js_1.Button,
    code: simple_dom_nodes_js_1.Code,
    hr: simple_dom_nodes_js_1.Hr,
    div: simple_dom_nodes_js_1.Div,
    input: input_js_1.Input,
    li: simple_dom_nodes_js_1.Li,
    span: simple_dom_nodes_js_1.Span,
    style: simple_dom_nodes_js_1.Style,
    ul: simple_dom_nodes_js_1.Ul,
    p: simple_dom_nodes_js_1.P,
    img: simple_dom_nodes_js_1.Img,
    link: simple_dom_nodes_js_1.Link,
    canvas: simple_dom_nodes_js_1.Canvas,
    a: simple_dom_nodes_js_1.A,
    article: simple_dom_nodes_js_1.Article,
    br: simple_dom_nodes_js_1.Br,
    form: simple_dom_nodes_js_1.Form,
    label: simple_dom_nodes_js_1.Label,
    ol: simple_dom_nodes_js_1.Ol,
    pre: simple_dom_nodes_js_1.Pre,
    progress: simple_dom_nodes_js_1.Progress,
    table: simple_dom_nodes_js_1.Table,
    td: simple_dom_nodes_js_1.Td,
    tr: simple_dom_nodes_js_1.Tr,
    th: simple_dom_nodes_js_1.Th,
    textarea: textarea_js_1.TextArea,
    h1: simple_dom_nodes_js_1.H1,
    h2: simple_dom_nodes_js_1.H2,
    h3: simple_dom_nodes_js_1.H3,
    h4: simple_dom_nodes_js_1.H4,
    h5: simple_dom_nodes_js_1.H5,
    h6: simple_dom_nodes_js_1.H6,
    html: simple_dom_nodes_js_1.Html,
    head: simple_dom_nodes_js_1.Head,
    header: simple_dom_nodes_js_1.Header,
    footer: simple_dom_nodes_js_1.Footer,
    nav: simple_dom_nodes_js_1.Nav,
    b: simple_dom_nodes_js_1.B,
    i: simple_dom_nodes_js_1.I,
    script: simple_dom_nodes_js_1.Script,
    abbr: simple_dom_nodes_js_1.Abbr,
    area: simple_dom_nodes_js_1.Area,
    aside: simple_dom_nodes_js_1.Aside,
    audio: simple_dom_nodes_js_1.Audio,
    em: simple_dom_nodes_js_1.Em,
    heading: simple_dom_nodes_js_1.Heading,
    iframe: simple_dom_nodes_js_1.IFrame,
    noscript: simple_dom_nodes_js_1.NoScript,
    option: simple_dom_nodes_js_1.Option,
    q: simple_dom_nodes_js_1.Q,
    select: select_js_1.Select,
    source: simple_dom_nodes_js_1.Source,
    title: simple_dom_nodes_js_1.Title,
    video: simple_dom_nodes_js_1.Video,
    tbody: simple_dom_nodes_js_1.TBody,
    tfoot: simple_dom_nodes_js_1.TFoot,
    meta: simple_dom_nodes_js_1.Meta,
    body: simple_dom_nodes_js_1.Body,
    thead: simple_dom_nodes_js_1.THead,
    summary: simple_dom_nodes_js_1.Summary,
    details: simple_dom_nodes_js_1.Details,
    sub: simple_dom_nodes_js_1.Sub,
    sup: simple_dom_nodes_js_1.Sup,
    svg: simple_dom_nodes_js_1.Svg,
    data: simple_dom_nodes_js_1.Data,
    time: simple_dom_nodes_js_1.Time,
    template: simple_dom_nodes_js_1.Template,
    slot: simple_dom_nodes_js_1.Slot,
    col: simple_dom_nodes_js_1.Col,
    colgroup: simple_dom_nodes_js_1.Colgroup,
    caption: simple_dom_nodes_js_1.Caption
};
class Aurum {
    static rehydrate(aurumRenderable, dom) {
        const target = dom.parentElement;
        dom.remove();
        return Aurum.attach(aurumRenderable, target);
    }
    static attach(aurumRenderable, dom) {
        const session = (0, aurum_element_js_1.createRenderSession)();
        const content = (0, aurum_element_js_1.renderInternal)(aurumRenderable, session);
        if (content instanceof aurum_element_js_1.AurumElement) {
            content.attachToDom(dom, dom.childNodes.length);
            session.sessionToken.addCancelable(() => content.dispose());
        }
        else if (Array.isArray(content)) {
            const root = new aurum_element_js_1.ArrayAurumElement(new data_source_js_1.ArrayDataSource(content), (0, aurum_element_js_1.createAPI)(session));
            session.sessionToken.addCancelable(() => root.dispose());
            root.attachToDom(dom, dom.childNodes.length);
        }
        else {
            dom.appendChild(content);
            session.sessionToken.addCancelable(() => {
                if (content.isConnected) {
                    dom.removeChild(content);
                }
            });
        }
        for (let i = session.attachCalls.length - 1; i >= 0; i--) {
            session.attachCalls[i]();
        }
        return session.sessionToken;
    }
    static fragment() { }
    static factory(node, args, ...innerNodes) {
        //@ts-ignore
        if (node === Aurum.fragment) {
            return innerNodes;
        }
        let name;
        let intrinsic = false;
        if (typeof node === 'string') {
            intrinsic = true;
            name = node;
            const type = node;
            node = nodeMap[node];
            if (node === undefined) {
                throw new Error(`Node ${type} does not exist or is not supported`);
            }
        }
        else {
            name = node.name;
        }
        return {
            [aurum_element_js_1.aurumElementModelIdentitiy]: true,
            name,
            isIntrinsic: intrinsic,
            factory: node,
            props: args,
            children: innerNodes
        };
    }
}
exports.Aurum = Aurum;
//# sourceMappingURL=aurum.js.map

/***/ }),

/***/ "./node_modules/aurumjs/prebuilt/cjs/utilities/cancellation_token.js":
/*!***************************************************************************!*\
  !*** ./node_modules/aurumjs/prebuilt/cjs/utilities/cancellation_token.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.registerAnimationLoop = exports.CancellationToken = void 0;
class CancellationToken {
    constructor(...cancellables) {
        this.cancelables = cancellables !== null && cancellables !== void 0 ? cancellables : [];
        this._isCancelled = false;
    }
    get isCanceled() {
        return this._isCancelled;
    }
    static fromMultiple(tokens) {
        const result = new CancellationToken();
        for (const token of tokens) {
            token.chain(result);
        }
        return result;
    }
    hasCancellables() {
        return this.cancelables.length > 0;
    }
    /**
     * Attaches a new cancelable to this token
     * @param delegate
     */
    addCancelable(delegate) {
        this.throwIfCancelled('attempting to add cancellable to token that is already cancelled');
        this.cancelables.push(delegate);
        if (this.cancelables.length === 200) {
            console.log('potential memory leak: cancellation token has over 200 clean up calls');
        }
        return this;
    }
    removeCancelable(delegate) {
        this.throwIfCancelled('attempting to remove cancellable from token that is already cancelled');
        const index = this.cancelables.indexOf(delegate);
        if (index !== -1) {
            this.cancelables.splice(index, 1);
        }
        return this;
    }
    setTimeout(cb, time = 0) {
        const id = setTimeout(() => {
            this.removeCancelable(cancelable);
            cb();
        }, time);
        const cancelable = () => clearTimeout(id);
        this.addCancelable(cancelable);
    }
    setInterval(cb, time) {
        const id = setInterval(cb, time);
        this.addCancelable(() => clearInterval(id));
    }
    requestAnimationFrame(cb) {
        const id = requestAnimationFrame(() => {
            this.removeCancelable(cancelable);
            cb();
        });
        const cancelable = () => cancelAnimationFrame(id);
        this.addCancelable(cancelable);
    }
    animationLoop(cb) {
        registerAnimationLoop(cb, this);
    }
    throwIfCancelled(msg) {
        if (this.isCanceled) {
            throw new Error(msg || 'cancellation token is cancelled');
        }
    }
    chain(target, twoWays = false) {
        const cancelable = () => target.cancel();
        if (twoWays) {
            target.chain(this, false);
        }
        else {
            target.addCancelable(() => {
                if (!this.isCanceled) {
                    this.removeCancelable(cancelable);
                }
            });
        }
        this.addCancelable(cancelable);
        return this;
    }
    /**
     * Registers an event using addEventListener and if you cancel the token the event will be canceled as well
     */
    registerDomEvent(eventEmitter, event, callback) {
        eventEmitter.addEventListener(event, callback);
        this.addCancelable(() => eventEmitter.removeEventListener(event, callback));
        return this;
    }
    /**
     * Cancels everything attached to this token
     */
    cancel() {
        if (this.isCanceled) {
            return;
        }
        this._isCancelled = true;
        this.cancelables.forEach((c) => c());
        this.cancelables = undefined;
    }
}
exports.CancellationToken = CancellationToken;
CancellationToken.forever = new CancellationToken();
const animationCbs = [];
let looping = false;
function registerAnimationLoop(callback, token) {
    animationCbs.push(callback);
    token.addCancelable(() => {
        animationCbs.splice(animationCbs.indexOf(callback), 1);
    });
    if (!looping) {
        looping = true;
        requestAnimationFrame(loop);
    }
}
exports.registerAnimationLoop = registerAnimationLoop;
function loop(time) {
    for (const cb of animationCbs) {
        try {
            cb(time);
        }
        catch (e) {
            console.error(e);
        }
    }
    if (animationCbs.length === 0) {
        looping = false;
    }
    if (looping) {
        requestAnimationFrame(loop);
    }
}
CancellationToken.forever.addCancelable = () => void 0;
CancellationToken.forever.cancel = () => {
    throw new Error('Cannot cancel forever token');
};
//# sourceMappingURL=cancellation_token.js.map

/***/ }),

/***/ "./node_modules/aurumjs/prebuilt/cjs/utilities/classname.js":
/*!******************************************************************!*\
  !*** ./node_modules/aurumjs/prebuilt/cjs/utilities/classname.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.combineAttribute = exports.combineClass = exports.aurumClassName = void 0;
const data_source_js_1 = __webpack_require__(/*! ../stream/data_source.js */ "./node_modules/aurumjs/prebuilt/cjs/stream/data_source.js");
const duplex_data_source_js_1 = __webpack_require__(/*! ../stream/duplex_data_source.js */ "./node_modules/aurumjs/prebuilt/cjs/stream/duplex_data_source.js");
function aurumClassName(data, cancellationToken) {
    const result = [];
    for (const key in data) {
        if (data[key]) {
            if (data[key] instanceof data_source_js_1.DataSource || data[key] instanceof duplex_data_source_js_1.DuplexDataSource) {
                const source = data[key];
                const mappedSource = new data_source_js_1.DataSource(source.value ? key : '');
                source.listen((value) => {
                    mappedSource.update(value ? key : '');
                }, cancellationToken);
                result.push(mappedSource);
            }
            else {
                result.push(key);
            }
        }
    }
    return result;
}
exports.aurumClassName = aurumClassName;
function combineClass(cancellationToken, ...args) {
    args = args.filter((e) => !!e);
    if (args.length < 2) {
        return args[0];
    }
    const constants = [];
    const sources = [];
    resolveConstants(args);
    function resolveConstants(args) {
        for (const arg of args) {
            if (typeof arg === 'string') {
                constants.push(arg);
            }
            if (Array.isArray(arg)) {
                resolveConstants(arg);
            }
            if (arg instanceof data_source_js_1.DataSource || arg instanceof duplex_data_source_js_1.DuplexDataSource) {
                sources.push(arg);
            }
        }
    }
    if (sources.length) {
        return sources[0].aggregate(sources.slice(1), (...data) => {
            if (constants.length) {
                return data.flat().concat(constants);
            }
            else {
                return data.flat();
            }
        }, cancellationToken);
    }
    else {
        return constants;
    }
}
exports.combineClass = combineClass;
function combineAttribute(cancellationToken, ...args) {
    const constants = [];
    const sources = [];
    for (const attr of args) {
        if (typeof attr === 'string' || typeof attr === 'boolean') {
            constants.push(attr);
        }
        if (attr instanceof data_source_js_1.DataSource || attr instanceof duplex_data_source_js_1.DuplexDataSource) {
            sources.push(attr);
        }
    }
    if (sources.length) {
        return sources[0].aggregate(sources.slice(1), (...data) => {
            if (constants.length) {
                return data.concat(constants).join(' ');
            }
            else {
                return data.join(' ');
            }
        }, cancellationToken);
    }
    else {
        return constants.join(' ');
    }
}
exports.combineAttribute = combineAttribute;
//# sourceMappingURL=classname.js.map

/***/ }),

/***/ "./node_modules/aurumjs/prebuilt/cjs/utilities/event_emitter.js":
/*!**********************************************************************!*\
  !*** ./node_modules/aurumjs/prebuilt/cjs/utilities/event_emitter.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EventEmitter = void 0;
/**
 * Event emitter is at the core of aurums stream system. It's a basic pub sub style typesafe event system optimized for high update throughput
 */
class EventEmitter {
    constructor() {
        this.subscribeChannel = [];
        this.subscribeOnceChannel = [];
        this.onAfterFire = [];
    }
    /**
     * Set a number of subscriptions that any event can have at most before emitting warnings. The subscriptions will continue working but the warnings can be used
     * to track potential subscription memory leaks
     */
    static setSubscriptionLeakWarningThreshold(limit) {
        EventEmitter.leakWarningThreshold = limit;
    }
    /**
     * returns the count of subscriptions both one time and regular
     */
    get subscriptions() {
        return this.subscribeChannel.length + this.subscribeOnceChannel.length;
    }
    /**
     * Subscribe to the event. The callback will be called whenever the event fires an update
     */
    subscribe(callback, cancellationToken) {
        const { facade } = this.createSubscription(callback, this.subscribeChannel, cancellationToken);
        if (EventEmitter.leakWarningThreshold && this.subscribeChannel.length > EventEmitter.leakWarningThreshold) {
            console.warn(`Observable has ${this.subscribeChannel.length} subscriptions. This could potentially indicate a memory leak`);
        }
        return facade;
    }
    /**
     * Subscribe to the event. The callback will be called when the event next fires an update after which the subscription is cancelled
     */
    subscribeOnce(callback, cancellationToken) {
        const { facade } = this.createSubscription(callback, this.subscribeOnceChannel, cancellationToken);
        if (EventEmitter.leakWarningThreshold && this.subscribeOnceChannel.length > EventEmitter.leakWarningThreshold) {
            console.warn(`Observable has ${this.subscribeOnceChannel.length} one time subscriptions. This could potentially indicate a memory leak`);
        }
        return facade;
    }
    /**
     * Whether the event has any subscriptions
     */
    hasSubscriptions() {
        return this.subscriptions > 0;
    }
    /**
     * Removes all currently active subscriptions. If called in the callback of a subscription will be defered until after the fire event finished
     */
    cancelAll() {
        var _a;
        if (!this.isFiring) {
            this.subscribeChannel.length = 0;
            this.subscribeOnceChannel.length = 0;
            (_a = this.onEmpty) === null || _a === void 0 ? void 0 : _a.call(this);
        }
        else {
            this.onAfterFire.push(() => {
                var _a;
                this.subscribeChannel.length = 0;
                this.subscribeOnceChannel.length = 0;
                (_a = this.onEmpty) === null || _a === void 0 ? void 0 : _a.call(this);
            });
        }
    }
    afterFire() {
        if (this.onAfterFire.length > 0) {
            this.onAfterFire.forEach((cb) => cb());
            this.onAfterFire.length = 0;
        }
    }
    /**
     * Publishes a new value all subscribers will be called
     * Errors in the callbacks are caught and deferred until after fire finishes before throwing to avoid interrupting the propagation of the event
     * to all subscribers simply because of one faulty subscriber
     */
    fire(data) {
        const length = this.subscribeChannel.length;
        const lengthOnce = this.subscribeOnceChannel.length;
        if (length === 0 && lengthOnce === 0) {
            //Cut some overhead in the case nothing is listening
            return;
        }
        this.isFiring = true;
        let error = undefined;
        for (let i = 0; i < length; i++) {
            try {
                this.subscribeChannel[i].callback(data);
            }
            catch (e) {
                error = e;
                console.error(e);
            }
        }
        if (this.subscribeOnceChannel.length > 0) {
            for (let i = 0; i < lengthOnce; i++) {
                try {
                    this.subscribeOnceChannel[i].callback(data);
                }
                catch (e) {
                    error = e;
                    console.error(e);
                }
            }
            this.subscribeOnceChannel.length = 0;
        }
        this.isFiring = false;
        this.afterFire();
        if (error) {
            throw error;
        }
    }
    createSubscription(callback, channel, cancellationToken) {
        const that = this;
        const subscription = {
            callback
        };
        const facade = {
            cancel() {
                that.cancel(subscription, channel);
            }
        };
        if (cancellationToken !== undefined) {
            cancellationToken.addCancelable(() => that.cancel(subscription, channel));
        }
        if (this.isFiring) {
            this.onAfterFire.push(() => channel.push(subscription));
        }
        else {
            channel.push(subscription);
        }
        return { subscription, facade };
    }
    cancel(subscription, channel) {
        var _a;
        let index = channel.indexOf(subscription);
        if (index >= 0) {
            if (!this.isFiring) {
                channel.splice(index, 1);
                if (!this.hasSubscriptions()) {
                    (_a = this.onEmpty) === null || _a === void 0 ? void 0 : _a.call(this);
                }
            }
            else {
                this.onAfterFire.push(() => this.cancel(subscription, channel));
            }
        }
    }
}
exports.EventEmitter = EventEmitter;
//# sourceMappingURL=event_emitter.js.map

/***/ }),

/***/ "./node_modules/aurumjs/prebuilt/cjs/utilities/sources.js":
/*!****************************************************************!*\
  !*** ./node_modules/aurumjs/prebuilt/cjs/utilities/sources.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.unwrapObjectRecursive = exports.getValueOf = void 0;
const aurumjs_js_1 = __webpack_require__(/*! ../aurumjs.js */ "./node_modules/aurumjs/prebuilt/cjs/aurumjs.js");
const data_source_js_1 = __webpack_require__(/*! ../stream/data_source.js */ "./node_modules/aurumjs/prebuilt/cjs/stream/data_source.js");
const duplex_data_source_js_1 = __webpack_require__(/*! ../stream/duplex_data_source.js */ "./node_modules/aurumjs/prebuilt/cjs/stream/duplex_data_source.js");
const stream_js_1 = __webpack_require__(/*! ../stream/stream.js */ "./node_modules/aurumjs/prebuilt/cjs/stream/stream.js");
function getValueOf(sourceOrPrimitive) {
    if (sourceOrPrimitive instanceof data_source_js_1.DataSource || sourceOrPrimitive instanceof duplex_data_source_js_1.DuplexDataSource || sourceOrPrimitive instanceof stream_js_1.Stream) {
        return sourceOrPrimitive.value;
    }
    if (sourceOrPrimitive instanceof data_source_js_1.ArrayDataSource) {
        return sourceOrPrimitive.getData();
    }
    return sourceOrPrimitive;
}
exports.getValueOf = getValueOf;
function unwrapObjectRecursive(object) {
    if (object instanceof data_source_js_1.DataSource || object instanceof duplex_data_source_js_1.DuplexDataSource || object instanceof stream_js_1.Stream) {
        //@ts-ignore
        return unwrapObjectRecursive(object.value);
    }
    if (object instanceof data_source_js_1.ArrayDataSource) {
        //@ts-ignore
        return unwrapObjectRecursive(object.toArray());
    }
    if (object instanceof aurumjs_js_1.ObjectDataSource) {
        //@ts-ignore
        return unwrapObjectRecursive(object.getData());
    }
    if (object instanceof duplex_data_source_js_1.DuplexDataSource) {
        //@ts-ignore
        return unwrapObjectRecursive(object.value);
    }
    if (object instanceof stream_js_1.Stream) {
        //@ts-ignore
        return unwrapObjectRecursive(object.value);
    }
    if (Array.isArray(object)) {
        //@ts-ignore
        return object.map(unwrapObjectRecursive);
    }
    if (object instanceof Object) {
        const result = {};
        for (const key in object) {
            result[key] = unwrapObjectRecursive(object[key]);
        }
        return result;
    }
    //@ts-ignore
    return object;
}
exports.unwrapObjectRecursive = unwrapObjectRecursive;
//# sourceMappingURL=sources.js.map

/***/ }),

/***/ "./node_modules/aurumjs/prebuilt/cjs/utilities/transclusion.js":
/*!*********************************************************************!*\
  !*** ./node_modules/aurumjs/prebuilt/cjs/utilities/transclusion.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.resolveChildren = void 0;
const data_source_js_1 = __webpack_require__(/*! ../stream/data_source.js */ "./node_modules/aurumjs/prebuilt/cjs/stream/data_source.js");
function resolveChildren(children, cancellationToken, validation) {
    const chunks = process(children);
    const result = data_source_js_1.ArrayDataSource.fromMultipleSources(chunks, cancellationToken);
    if (validation) {
        result.listen((c) => {
            switch (c.operation) {
                case 'add':
                case 'replace':
                case 'merge':
                    for (const item of c.items) {
                        validation(item);
                    }
                    break;
            }
        }, cancellationToken);
    }
    return result;
}
exports.resolveChildren = resolveChildren;
function process(children) {
    const chunks = [];
    let currentChunk = [];
    for (const child of children) {
        if (child instanceof data_source_js_1.ArrayDataSource) {
            if (currentChunk.length) {
                chunks.push(currentChunk);
                currentChunk.length = 0;
            }
            chunks.push(child);
        }
        else if (child instanceof data_source_js_1.DataSource) {
            currentChunk.push(child);
        }
        else if (child instanceof data_source_js_1.DataSource) {
            currentChunk.push(child);
        }
        else if (child instanceof data_source_js_1.DataSource) {
            currentChunk.push(child);
        }
        else if (Array.isArray(child)) {
            chunks.push(...process(child));
        }
        else {
            currentChunk.push(child);
        }
    }
    if (currentChunk.length) {
        chunks.push(currentChunk);
    }
    return chunks;
}
//# sourceMappingURL=transclusion.js.map

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	(() => {
/******/ 		var getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; typeof current == 'object' && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 			}
/******/ 			def['default'] = () => (value);
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "static/js/" + chunkId + ".bundle.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "aurum.org:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			};
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "./";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"app": 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						} else installedChunks[chunkId] = 0;
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 		
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkaurum_org"] = self["webpackChunkaurum_org"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/setup.ts ***!
  \**********************/
/* harmony import */ var aurumjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurumjs */ "./node_modules/aurumjs/prebuilt/cjs/aurumjs.js");
/* harmony import */ var aurumjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(aurumjs__WEBPACK_IMPORTED_MODULE_0__);

// enableDebugMode();
aurumjs__WEBPACK_IMPORTED_MODULE_0__.EventEmitter.setSubscriptionLeakWarningThreshold(300);
Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_css-loader_dist_runtime_api_js-node_modules_css-loader_dist_runtime_sour-7235ae"), __webpack_require__.e("src_main_tsx")]).then(__webpack_require__.bind(__webpack_require__, /*! ./main */ "./src/main.tsx"));

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLDRCQUE0QjtBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLHNCQUFzQjtBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0RBQXNELFFBQVE7QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQSxvQkFBb0IsV0FBVztBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5REFBeUQsUUFBUSxpR0FBaUc7QUFDbEs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0Isb0JBQW9CO0FBQzVDO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUJBQXlCO0FBQ2pEO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixzSEFBc0g7QUFDNUk7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQix5SEFBeUg7QUFDL0k7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQix5SEFBeUg7QUFDL0k7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQiwyR0FBMkc7QUFDakk7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQix5SEFBeUg7QUFDL0k7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQiw0R0FBNEc7QUFDbEk7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IscUhBQXFIO0FBQzNJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsNEhBQTRIO0FBQ2xKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsOEdBQThHO0FBQ3BJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MseUJBQXlCO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyw0QkFBNEI7QUFDaEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsaUJBQWlCO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxpQkFBaUI7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0Msd0RBQXdEO0FBQ3hGO0FBQ0Esa0RBQWtELHlDQUF5QztBQUMzRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxrREFBa0Q7QUFDbEY7QUFDQSxrREFBa0Qsa0RBQWtEO0FBQ3BHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLGlCQUFpQjtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixPQUFPO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLE9BQU87QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUJBQXlCO0FBQ2pEO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSw2QkFBNkIsT0FBTztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixzQkFBc0I7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0Qjs7Ozs7Ozs7OztBQzFNYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxhQUFhO0FBQ2IsbUJBQW1CLG1CQUFPLENBQUMsNkVBQW1CO0FBQzlDLG9CQUFvQixtQkFBTyxDQUFDLCtFQUFvQjtBQUNoRCw4QkFBOEIsbUJBQU8sQ0FBQyxtR0FBOEI7QUFDcEUsc0JBQXNCLG1CQUFPLENBQUMsbUZBQXNCO0FBQ3BELDJCQUEyQixtQkFBTyxDQUFDLHFHQUErQjtBQUNsRSx5QkFBeUIsbUJBQU8sQ0FBQywyRkFBMEI7QUFDM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxxREFBcUQsUUFBUTtBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsTUFBTTtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7Ozs7Ozs7Ozs7QUM1SmE7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsNkJBQTZCLEdBQUcseUJBQXlCO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUMzSWE7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0Qsd0JBQXdCLEdBQUcsb0JBQW9CLEdBQUcsc0JBQXNCO0FBQ3hFLHlCQUF5QixtQkFBTyxDQUFDLDJGQUEwQjtBQUMzRCxnQ0FBZ0MsbUJBQU8sQ0FBQyx5R0FBaUM7QUFDekU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QjtBQUN4Qjs7Ozs7Ozs7OztBQ3ZGYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxvQkFBb0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixTQUFTO0FBQ3pCO0FBQ0EsMkNBQTJDLDhCQUE4QjtBQUN6RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixTQUFTO0FBQ3pCO0FBQ0EsMkNBQTJDLGtDQUFrQztBQUM3RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixZQUFZO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixnQkFBZ0I7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCOzs7Ozs7Ozs7O0FDM0phO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELDZCQUE2QixHQUFHLGtCQUFrQjtBQUNsRCxxQkFBcUIsbUJBQU8sQ0FBQyxxRUFBZTtBQUM1Qyx5QkFBeUIsbUJBQU8sQ0FBQywyRkFBMEI7QUFDM0QsZ0NBQWdDLG1CQUFPLENBQUMseUdBQWlDO0FBQ3pFLG9CQUFvQixtQkFBTyxDQUFDLGlGQUFxQjtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3Qjs7Ozs7Ozs7OztBQ3JEYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCx1QkFBdUI7QUFDdkIseUJBQXlCLG1CQUFPLENBQUMsMkZBQTBCO0FBQzNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O1VDdkRBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7Ozs7V0N6QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esc0RBQXNEO1dBQ3RELHNDQUFzQyxpRUFBaUU7V0FDdkc7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQ3pCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsRUFBRTtXQUNGOzs7OztXQ1JBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7O1dDSkE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx1QkFBdUIsNEJBQTRCO1dBQ25EO1dBQ0E7V0FDQTtXQUNBLGlCQUFpQixvQkFBb0I7V0FDckM7V0FDQSxtR0FBbUcsWUFBWTtXQUMvRztXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsbUVBQW1FLGlDQUFpQztXQUNwRztXQUNBO1dBQ0E7V0FDQTs7Ozs7V0N4Q0E7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BOzs7OztXQ0FBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUM7O1dBRWpDO1dBQ0E7V0FDQTtXQUNBLEtBQUs7V0FDTCxlQUFlO1dBQ2Y7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxNQUFNO1dBQ047V0FDQTtXQUNBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLE1BQU0scUJBQXFCO1dBQzNCO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTtXQUNBO1dBQ0E7Ozs7O1dDckZBOzs7Ozs7Ozs7Ozs7QUNBdUM7QUFFdkMscUJBQXFCO0FBQ3JCLHFGQUFnRCxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3RELHNSQUFnQixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXVydW0ub3JnLy4vbm9kZV9tb2R1bGVzL2F1cnVtanMvcHJlYnVpbHQvY2pzL2F1cnVtX3NlcnZlci9hdXJ1bV9zZXJ2ZXJfY2xpZW50LmpzIiwid2VicGFjazovL2F1cnVtLm9yZy8uL25vZGVfbW9kdWxlcy9hdXJ1bWpzL3ByZWJ1aWx0L2Nqcy9hdXJ1bWpzLmpzIiwid2VicGFjazovL2F1cnVtLm9yZy8uL25vZGVfbW9kdWxlcy9hdXJ1bWpzL3ByZWJ1aWx0L2Nqcy9idWlsdGluX2NvbXBvbmVudHMvZG9tX2FkYXB0ZXIuanMiLCJ3ZWJwYWNrOi8vYXVydW0ub3JnLy4vbm9kZV9tb2R1bGVzL2F1cnVtanMvcHJlYnVpbHQvY2pzL2J1aWx0aW5fY29tcG9uZW50cy9lcnJvcl9ib3VuZGFyeS5qcyIsIndlYnBhY2s6Ly9hdXJ1bS5vcmcvLi9ub2RlX21vZHVsZXMvYXVydW1qcy9wcmVidWlsdC9janMvYnVpbHRpbl9jb21wb25lbnRzL3JvdXRlci5qcyIsIndlYnBhY2s6Ly9hdXJ1bS5vcmcvLi9ub2RlX21vZHVsZXMvYXVydW1qcy9wcmVidWlsdC9janMvYnVpbHRpbl9jb21wb25lbnRzL3N1c3BlbnNlLmpzIiwid2VicGFjazovL2F1cnVtLm9yZy8uL25vZGVfbW9kdWxlcy9hdXJ1bWpzL3ByZWJ1aWx0L2Nqcy9idWlsdGluX2NvbXBvbmVudHMvc3dpdGNoLmpzIiwid2VicGFjazovL2F1cnVtLm9yZy8uL25vZGVfbW9kdWxlcy9hdXJ1bWpzL3ByZWJ1aWx0L2Nqcy9kZWJ1Z19tb2RlLmpzIiwid2VicGFjazovL2F1cnVtLm9yZy8uL25vZGVfbW9kdWxlcy9hdXJ1bWpzL3ByZWJ1aWx0L2Nqcy9ub2Rlcy9pbnB1dC5qcyIsIndlYnBhY2s6Ly9hdXJ1bS5vcmcvLi9ub2RlX21vZHVsZXMvYXVydW1qcy9wcmVidWlsdC9janMvbm9kZXMvc2VsZWN0LmpzIiwid2VicGFjazovL2F1cnVtLm9yZy8uL25vZGVfbW9kdWxlcy9hdXJ1bWpzL3ByZWJ1aWx0L2Nqcy9ub2Rlcy9zaW1wbGVfZG9tX25vZGVzLmpzIiwid2VicGFjazovL2F1cnVtLm9yZy8uL25vZGVfbW9kdWxlcy9hdXJ1bWpzL3ByZWJ1aWx0L2Nqcy9ub2Rlcy9zdHJpbmdfYWRhcHRlci5qcyIsIndlYnBhY2s6Ly9hdXJ1bS5vcmcvLi9ub2RlX21vZHVsZXMvYXVydW1qcy9wcmVidWlsdC9janMvbm9kZXMvdGV4dGFyZWEuanMiLCJ3ZWJwYWNrOi8vYXVydW0ub3JnLy4vbm9kZV9tb2R1bGVzL2F1cnVtanMvcHJlYnVpbHQvY2pzL3JlbmRlcmluZy9hdXJ1bV9lbGVtZW50LmpzIiwid2VicGFjazovL2F1cnVtLm9yZy8uL25vZGVfbW9kdWxlcy9hdXJ1bWpzL3ByZWJ1aWx0L2Nqcy9yZW5kZXJpbmcvYXVydW1fc3R5bGUuanMiLCJ3ZWJwYWNrOi8vYXVydW0ub3JnLy4vbm9kZV9tb2R1bGVzL2F1cnVtanMvcHJlYnVpbHQvY2pzL3JlbmRlcmluZy93ZWJjb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vYXVydW0ub3JnLy4vbm9kZV9tb2R1bGVzL2F1cnVtanMvcHJlYnVpbHQvY2pzL3N0cmVhbS9kYXRhX3NvdXJjZS5qcyIsIndlYnBhY2s6Ly9hdXJ1bS5vcmcvLi9ub2RlX21vZHVsZXMvYXVydW1qcy9wcmVidWlsdC9janMvc3RyZWFtL2RhdGFfc291cmNlX29wZXJhdG9ycy5qcyIsIndlYnBhY2s6Ly9hdXJ1bS5vcmcvLi9ub2RlX21vZHVsZXMvYXVydW1qcy9wcmVidWlsdC9janMvc3RyZWFtL2R1cGxleF9kYXRhX3NvdXJjZS5qcyIsIndlYnBhY2s6Ly9hdXJ1bS5vcmcvLi9ub2RlX21vZHVsZXMvYXVydW1qcy9wcmVidWlsdC9janMvc3RyZWFtL2R1cGxleF9kYXRhX3NvdXJjZV9vcGVyYXRvcnMuanMiLCJ3ZWJwYWNrOi8vYXVydW0ub3JnLy4vbm9kZV9tb2R1bGVzL2F1cnVtanMvcHJlYnVpbHQvY2pzL3N0cmVhbS9lbWl0dGVycy5qcyIsIndlYnBhY2s6Ly9hdXJ1bS5vcmcvLi9ub2RlX21vZHVsZXMvYXVydW1qcy9wcmVidWlsdC9janMvc3RyZWFtL29iamVjdF9kYXRhX3NvdXJjZS5qcyIsIndlYnBhY2s6Ly9hdXJ1bS5vcmcvLi9ub2RlX21vZHVsZXMvYXVydW1qcy9wcmVidWlsdC9janMvc3RyZWFtL29wZXJhdG9yX21vZGVsLmpzIiwid2VicGFjazovL2F1cnVtLm9yZy8uL25vZGVfbW9kdWxlcy9hdXJ1bWpzL3ByZWJ1aWx0L2Nqcy9zdHJlYW0vc3RyZWFtLmpzIiwid2VicGFjazovL2F1cnVtLm9yZy8uL25vZGVfbW9kdWxlcy9hdXJ1bWpzL3ByZWJ1aWx0L2Nqcy9zdHJlYW0vdHJlZV9kYXRhX3NvdXJjZS5qcyIsIndlYnBhY2s6Ly9hdXJ1bS5vcmcvLi9ub2RlX21vZHVsZXMvYXVydW1qcy9wcmVidWlsdC9janMvdXRpbGl0aWVzL2F1cnVtLmpzIiwid2VicGFjazovL2F1cnVtLm9yZy8uL25vZGVfbW9kdWxlcy9hdXJ1bWpzL3ByZWJ1aWx0L2Nqcy91dGlsaXRpZXMvY2FuY2VsbGF0aW9uX3Rva2VuLmpzIiwid2VicGFjazovL2F1cnVtLm9yZy8uL25vZGVfbW9kdWxlcy9hdXJ1bWpzL3ByZWJ1aWx0L2Nqcy91dGlsaXRpZXMvY2xhc3NuYW1lLmpzIiwid2VicGFjazovL2F1cnVtLm9yZy8uL25vZGVfbW9kdWxlcy9hdXJ1bWpzL3ByZWJ1aWx0L2Nqcy91dGlsaXRpZXMvZXZlbnRfZW1pdHRlci5qcyIsIndlYnBhY2s6Ly9hdXJ1bS5vcmcvLi9ub2RlX21vZHVsZXMvYXVydW1qcy9wcmVidWlsdC9janMvdXRpbGl0aWVzL3NvdXJjZXMuanMiLCJ3ZWJwYWNrOi8vYXVydW0ub3JnLy4vbm9kZV9tb2R1bGVzL2F1cnVtanMvcHJlYnVpbHQvY2pzL3V0aWxpdGllcy90cmFuc2NsdXNpb24uanMiLCJ3ZWJwYWNrOi8vYXVydW0ub3JnL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2F1cnVtLm9yZy93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9hdXJ1bS5vcmcvd2VicGFjay9ydW50aW1lL2NyZWF0ZSBmYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYXVydW0ub3JnL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9hdXJ1bS5vcmcvd2VicGFjay9ydW50aW1lL2Vuc3VyZSBjaHVuayIsIndlYnBhY2s6Ly9hdXJ1bS5vcmcvd2VicGFjay9ydW50aW1lL2dldCBqYXZhc2NyaXB0IGNodW5rIGZpbGVuYW1lIiwid2VicGFjazovL2F1cnVtLm9yZy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2F1cnVtLm9yZy93ZWJwYWNrL3J1bnRpbWUvbG9hZCBzY3JpcHQiLCJ3ZWJwYWNrOi8vYXVydW0ub3JnL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYXVydW0ub3JnL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL2F1cnVtLm9yZy93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9hdXJ1bS5vcmcvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL2F1cnVtLm9yZy8uL3NyYy9zZXR1cC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuc3luY0R1cGxleERhdGFTb3VyY2UgPSBleHBvcnRzLnN5bmNBcnJheURhdGFTb3VyY2UgPSBleHBvcnRzLnN5bmNEYXRhU291cmNlID0gZXhwb3J0cy5zeW5jTWFwRGF0YVNvdXJjZSA9IGV4cG9ydHMuc3luY09iamVjdERhdGFTb3VyY2UgPSBleHBvcnRzLnN5bmNTZXREYXRhU291cmNlID0gZXhwb3J0cy5nZXRSZW1vdGVGdW5jdGlvbiA9IGV4cG9ydHMuUmVtb3RlUHJvdG9jb2wgPSB2b2lkIDA7XG5jb25zdCBjYW5jZWxsYXRpb25fdG9rZW5fanNfMSA9IHJlcXVpcmUoXCIuLi91dGlsaXRpZXMvY2FuY2VsbGF0aW9uX3Rva2VuLmpzXCIpO1xudmFyIFJlbW90ZVByb3RvY29sO1xuKGZ1bmN0aW9uIChSZW1vdGVQcm90b2NvbCkge1xuICAgIFJlbW90ZVByb3RvY29sW1JlbW90ZVByb3RvY29sW1wiSEVBUlRCRUFUXCJdID0gMF0gPSBcIkhFQVJUQkVBVFwiO1xuICAgIFJlbW90ZVByb3RvY29sW1JlbW90ZVByb3RvY29sW1wiTElTVEVOX0RBVEFTT1VSQ0VcIl0gPSAxXSA9IFwiTElTVEVOX0RBVEFTT1VSQ0VcIjtcbiAgICBSZW1vdGVQcm90b2NvbFtSZW1vdGVQcm90b2NvbFtcIkxJU1RFTl9EQVRBU09VUkNFX0VSUlwiXSA9IDJdID0gXCJMSVNURU5fREFUQVNPVVJDRV9FUlJcIjtcbiAgICBSZW1vdGVQcm90b2NvbFtSZW1vdGVQcm90b2NvbFtcIlVQREFURV9EQVRBU09VUkNFXCJdID0gM10gPSBcIlVQREFURV9EQVRBU09VUkNFXCI7XG4gICAgUmVtb3RlUHJvdG9jb2xbUmVtb3RlUHJvdG9jb2xbXCJVUERBVEVfREFUQVNPVVJDRV9FUlJcIl0gPSA0XSA9IFwiVVBEQVRFX0RBVEFTT1VSQ0VfRVJSXCI7XG4gICAgUmVtb3RlUHJvdG9jb2xbUmVtb3RlUHJvdG9jb2xbXCJDQU5DRUxfREFUQVNPVVJDRVwiXSA9IDVdID0gXCJDQU5DRUxfREFUQVNPVVJDRVwiO1xuICAgIFJlbW90ZVByb3RvY29sW1JlbW90ZVByb3RvY29sW1wiUEVSRk9STV9SUENcIl0gPSA2XSA9IFwiUEVSRk9STV9SUENcIjtcbiAgICBSZW1vdGVQcm90b2NvbFtSZW1vdGVQcm90b2NvbFtcIlBFUkZPUk1fUlBDX0VSUlwiXSA9IDddID0gXCJQRVJGT1JNX1JQQ19FUlJcIjtcbiAgICBSZW1vdGVQcm90b2NvbFtSZW1vdGVQcm90b2NvbFtcIlBFUkZPUk1fUlBDX1JFU1VMVFwiXSA9IDhdID0gXCJQRVJGT1JNX1JQQ19SRVNVTFRcIjtcbiAgICBSZW1vdGVQcm90b2NvbFtSZW1vdGVQcm90b2NvbFtcIlBFUkZPUk1fUlBDX1JFU1VMVF9FUlJcIl0gPSA5XSA9IFwiUEVSRk9STV9SUENfUkVTVUxUX0VSUlwiO1xuICAgIFJlbW90ZVByb3RvY29sW1JlbW90ZVByb3RvY29sW1wiTElTVEVOX0RVUExFWF9EQVRBU09VUkNFX0VSUlwiXSA9IDEwXSA9IFwiTElTVEVOX0RVUExFWF9EQVRBU09VUkNFX0VSUlwiO1xuICAgIFJlbW90ZVByb3RvY29sW1JlbW90ZVByb3RvY29sW1wiTElTVEVOX0RVUExFWF9EQVRBU09VUkNFXCJdID0gMTFdID0gXCJMSVNURU5fRFVQTEVYX0RBVEFTT1VSQ0VcIjtcbiAgICBSZW1vdGVQcm90b2NvbFtSZW1vdGVQcm90b2NvbFtcIlVQREFURV9EVVBMRVhfREFUQVNPVVJDRVwiXSA9IDEyXSA9IFwiVVBEQVRFX0RVUExFWF9EQVRBU09VUkNFXCI7XG4gICAgUmVtb3RlUHJvdG9jb2xbUmVtb3RlUHJvdG9jb2xbXCJVUERBVEVfRFVQTEVYX0RBVEFTT1VSQ0VfRVJSXCJdID0gMTNdID0gXCJVUERBVEVfRFVQTEVYX0RBVEFTT1VSQ0VfRVJSXCI7XG4gICAgUmVtb3RlUHJvdG9jb2xbUmVtb3RlUHJvdG9jb2xbXCJDQU5DRUxfRFVQTEVYX0RBVEFTT1VSQ0VcIl0gPSAxNF0gPSBcIkNBTkNFTF9EVVBMRVhfREFUQVNPVVJDRVwiO1xuICAgIFJlbW90ZVByb3RvY29sW1JlbW90ZVByb3RvY29sW1wiTElTVEVOX0FSUkFZX0RBVEFTT1VSQ0VcIl0gPSAxNV0gPSBcIkxJU1RFTl9BUlJBWV9EQVRBU09VUkNFXCI7XG4gICAgUmVtb3RlUHJvdG9jb2xbUmVtb3RlUHJvdG9jb2xbXCJMSVNURU5fQVJSQVlfREFUQVNPVVJDRV9FUlJcIl0gPSAxNl0gPSBcIkxJU1RFTl9BUlJBWV9EQVRBU09VUkNFX0VSUlwiO1xuICAgIFJlbW90ZVByb3RvY29sW1JlbW90ZVByb3RvY29sW1wiVVBEQVRFX0FSUkFZX0RBVEFTT1VSQ0VcIl0gPSAxN10gPSBcIlVQREFURV9BUlJBWV9EQVRBU09VUkNFXCI7XG4gICAgUmVtb3RlUHJvdG9jb2xbUmVtb3RlUHJvdG9jb2xbXCJVUERBVEVfQVJSQVlfREFUQVNPVVJDRV9FUlJcIl0gPSAxOF0gPSBcIlVQREFURV9BUlJBWV9EQVRBU09VUkNFX0VSUlwiO1xuICAgIFJlbW90ZVByb3RvY29sW1JlbW90ZVByb3RvY29sW1wiQ0FOQ0VMX0FSUkFZX0RBVEFTT1VSQ0VcIl0gPSAxOV0gPSBcIkNBTkNFTF9BUlJBWV9EQVRBU09VUkNFXCI7XG4gICAgUmVtb3RlUHJvdG9jb2xbUmVtb3RlUHJvdG9jb2xbXCJMSVNURU5fTUFQX0RBVEFTT1VSQ0VcIl0gPSAyMF0gPSBcIkxJU1RFTl9NQVBfREFUQVNPVVJDRVwiO1xuICAgIFJlbW90ZVByb3RvY29sW1JlbW90ZVByb3RvY29sW1wiTElTVEVOX01BUF9EQVRBU09VUkNFX0VSUlwiXSA9IDIxXSA9IFwiTElTVEVOX01BUF9EQVRBU09VUkNFX0VSUlwiO1xuICAgIFJlbW90ZVByb3RvY29sW1JlbW90ZVByb3RvY29sW1wiVVBEQVRFX01BUF9EQVRBU09VUkNFXCJdID0gMjJdID0gXCJVUERBVEVfTUFQX0RBVEFTT1VSQ0VcIjtcbiAgICBSZW1vdGVQcm90b2NvbFtSZW1vdGVQcm90b2NvbFtcIlVQREFURV9NQVBfREFUQVNPVVJDRV9FUlJcIl0gPSAyM10gPSBcIlVQREFURV9NQVBfREFUQVNPVVJDRV9FUlJcIjtcbiAgICBSZW1vdGVQcm90b2NvbFtSZW1vdGVQcm90b2NvbFtcIkNBTkNFTF9NQVBfREFUQVNPVVJDRVwiXSA9IDI0XSA9IFwiQ0FOQ0VMX01BUF9EQVRBU09VUkNFXCI7XG4gICAgUmVtb3RlUHJvdG9jb2xbUmVtb3RlUHJvdG9jb2xbXCJMSVNURU5fT0JKRUNUX0RBVEFTT1VSQ0VcIl0gPSAyNV0gPSBcIkxJU1RFTl9PQkpFQ1RfREFUQVNPVVJDRVwiO1xuICAgIFJlbW90ZVByb3RvY29sW1JlbW90ZVByb3RvY29sW1wiTElTVEVOX09CSkVDVF9EQVRBU09VUkNFX0VSUlwiXSA9IDI2XSA9IFwiTElTVEVOX09CSkVDVF9EQVRBU09VUkNFX0VSUlwiO1xuICAgIFJlbW90ZVByb3RvY29sW1JlbW90ZVByb3RvY29sW1wiVVBEQVRFX09CSkVDVF9EQVRBU09VUkNFXCJdID0gMjddID0gXCJVUERBVEVfT0JKRUNUX0RBVEFTT1VSQ0VcIjtcbiAgICBSZW1vdGVQcm90b2NvbFtSZW1vdGVQcm90b2NvbFtcIlVQREFURV9PQkpFQ1RfREFUQVNPVVJDRV9FUlJcIl0gPSAyOF0gPSBcIlVQREFURV9PQkpFQ1RfREFUQVNPVVJDRV9FUlJcIjtcbiAgICBSZW1vdGVQcm90b2NvbFtSZW1vdGVQcm90b2NvbFtcIkNBTkNFTF9PQkpFQ1RfREFUQVNPVVJDRVwiXSA9IDI5XSA9IFwiQ0FOQ0VMX09CSkVDVF9EQVRBU09VUkNFXCI7XG4gICAgUmVtb3RlUHJvdG9jb2xbUmVtb3RlUHJvdG9jb2xbXCJMSVNURU5fU0VUX0RBVEFTT1VSQ0VcIl0gPSAzMF0gPSBcIkxJU1RFTl9TRVRfREFUQVNPVVJDRVwiO1xuICAgIFJlbW90ZVByb3RvY29sW1JlbW90ZVByb3RvY29sW1wiTElTVEVOX1NFVF9EQVRBU09VUkNFX0VSUlwiXSA9IDMxXSA9IFwiTElTVEVOX1NFVF9EQVRBU09VUkNFX0VSUlwiO1xuICAgIFJlbW90ZVByb3RvY29sW1JlbW90ZVByb3RvY29sW1wiVVBEQVRFX1NFVF9EQVRBU09VUkNFXCJdID0gMzJdID0gXCJVUERBVEVfU0VUX0RBVEFTT1VSQ0VcIjtcbiAgICBSZW1vdGVQcm90b2NvbFtSZW1vdGVQcm90b2NvbFtcIlVQREFURV9TRVRfREFUQVNPVVJDRV9FUlJcIl0gPSAzM10gPSBcIlVQREFURV9TRVRfREFUQVNPVVJDRV9FUlJcIjtcbiAgICBSZW1vdGVQcm90b2NvbFtSZW1vdGVQcm90b2NvbFtcIkNBTkNFTF9TRVRfREFUQVNPVVJDRVwiXSA9IDM0XSA9IFwiQ0FOQ0VMX1NFVF9EQVRBU09VUkNFXCI7XG59KShSZW1vdGVQcm90b2NvbCA9IGV4cG9ydHMuUmVtb3RlUHJvdG9jb2wgfHwgKGV4cG9ydHMuUmVtb3RlUHJvdG9jb2wgPSB7fSkpO1xuY29uc3QgcGVuZGluZ1JQQ1Jlc3BvbnNlcyA9IG5ldyBNYXAoKTtcbmZ1bmN0aW9uIGdldFJlbW90ZUZ1bmN0aW9uKGF1cnVtU2VydmVySW5mbywgY2FuY2VsbGF0aW9uKSB7XG4gICAgcmV0dXJuIHN5bmNGdW5jdGlvbihhdXJ1bVNlcnZlckluZm8sIGNhbmNlbGxhdGlvbik7XG59XG5leHBvcnRzLmdldFJlbW90ZUZ1bmN0aW9uID0gZ2V0UmVtb3RlRnVuY3Rpb247XG5mdW5jdGlvbiBzeW5jRnVuY3Rpb24oYXVydW1TZXJ2ZXJJbmZvLCBjYW5jZWxsYXRpb24pIHtcbiAgICBjb25zdCBrZXkgPSBtYWtlS2V5KGF1cnVtU2VydmVySW5mby5wcm90b2NvbCwgYXVydW1TZXJ2ZXJJbmZvLmhvc3QpO1xuICAgIHJldHVybiBhc3luYyAoaW5wdXQpID0+IHtcbiAgICAgICAgYXdhaXQgZW5zdXJlQ29ubmVjdGlvbihrZXksIGF1cnVtU2VydmVySW5mby5wcm90b2NvbCwgYXVydW1TZXJ2ZXJJbmZvLmhvc3QpO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2xpZW50ID0gY29ubmVjdGlvbnMuZ2V0KGtleSk7XG4gICAgICAgICAgICBpZiAoIWNsaWVudCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ2xpZW50IG5vdCBjb25uZWN0ZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjbGllbnQucGVyZm9ybVJQQyhpbnB1dCwgYXVydW1TZXJ2ZXJJbmZvLmlkLCBhdXJ1bVNlcnZlckluZm8uYXV0aGVudGljYXRpb25Ub2tlbiwgY2FuY2VsbGF0aW9uKS50aGVuKHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgIH07XG59XG5hc3luYyBmdW5jdGlvbiBzeW5jU2V0RGF0YVNvdXJjZShzb3VyY2UsIGF1cnVtU2VydmVySW5mbywgY2FuY2VsbGF0aW9uKSB7XG4gICAgY29uc3Qga2V5ID0gbWFrZUtleShhdXJ1bVNlcnZlckluZm8ucHJvdG9jb2wsIGF1cnVtU2VydmVySW5mby5ob3N0KTtcbiAgICBhd2FpdCBlbnN1cmVDb25uZWN0aW9uKGtleSwgYXVydW1TZXJ2ZXJJbmZvLnByb3RvY29sLCBhdXJ1bVNlcnZlckluZm8uaG9zdCk7XG4gICAgY29ubmVjdGlvbnMuZ2V0KGtleSkuc3luY1NldERhdGFTb3VyY2Uoc291cmNlLCBhdXJ1bVNlcnZlckluZm8uaWQsIGF1cnVtU2VydmVySW5mby5hdXRoZW50aWNhdGlvblRva2VuLCBjYW5jZWxsYXRpb24pO1xufVxuZXhwb3J0cy5zeW5jU2V0RGF0YVNvdXJjZSA9IHN5bmNTZXREYXRhU291cmNlO1xuYXN5bmMgZnVuY3Rpb24gc3luY09iamVjdERhdGFTb3VyY2Uoc291cmNlLCBhdXJ1bVNlcnZlckluZm8sIGNhbmNlbGxhdGlvbikge1xuICAgIGNvbnN0IGtleSA9IG1ha2VLZXkoYXVydW1TZXJ2ZXJJbmZvLnByb3RvY29sLCBhdXJ1bVNlcnZlckluZm8uaG9zdCk7XG4gICAgYXdhaXQgZW5zdXJlQ29ubmVjdGlvbihrZXksIGF1cnVtU2VydmVySW5mby5wcm90b2NvbCwgYXVydW1TZXJ2ZXJJbmZvLmhvc3QpO1xuICAgIGNvbm5lY3Rpb25zLmdldChrZXkpLnN5bmNPYmplY3REYXRhU291cmNlKHNvdXJjZSwgYXVydW1TZXJ2ZXJJbmZvLmlkLCBhdXJ1bVNlcnZlckluZm8uYXV0aGVudGljYXRpb25Ub2tlbiwgY2FuY2VsbGF0aW9uKTtcbn1cbmV4cG9ydHMuc3luY09iamVjdERhdGFTb3VyY2UgPSBzeW5jT2JqZWN0RGF0YVNvdXJjZTtcbmFzeW5jIGZ1bmN0aW9uIHN5bmNNYXBEYXRhU291cmNlKHNvdXJjZSwgYXVydW1TZXJ2ZXJJbmZvLCBjYW5jZWxsYXRpb24pIHtcbiAgICBjb25zdCBrZXkgPSBtYWtlS2V5KGF1cnVtU2VydmVySW5mby5wcm90b2NvbCwgYXVydW1TZXJ2ZXJJbmZvLmhvc3QpO1xuICAgIGF3YWl0IGVuc3VyZUNvbm5lY3Rpb24oa2V5LCBhdXJ1bVNlcnZlckluZm8ucHJvdG9jb2wsIGF1cnVtU2VydmVySW5mby5ob3N0KTtcbiAgICBjb25uZWN0aW9ucy5nZXQoa2V5KS5zeW5jTWFwRGF0YVNvdXJjZShzb3VyY2UsIGF1cnVtU2VydmVySW5mby5pZCwgYXVydW1TZXJ2ZXJJbmZvLmF1dGhlbnRpY2F0aW9uVG9rZW4sIGNhbmNlbGxhdGlvbik7XG59XG5leHBvcnRzLnN5bmNNYXBEYXRhU291cmNlID0gc3luY01hcERhdGFTb3VyY2U7XG5hc3luYyBmdW5jdGlvbiBzeW5jRGF0YVNvdXJjZShzb3VyY2UsIGF1cnVtU2VydmVySW5mbywgY2FuY2VsbGF0aW9uKSB7XG4gICAgY29uc3Qga2V5ID0gbWFrZUtleShhdXJ1bVNlcnZlckluZm8ucHJvdG9jb2wsIGF1cnVtU2VydmVySW5mby5ob3N0KTtcbiAgICBhd2FpdCBlbnN1cmVDb25uZWN0aW9uKGtleSwgYXVydW1TZXJ2ZXJJbmZvLnByb3RvY29sLCBhdXJ1bVNlcnZlckluZm8uaG9zdCk7XG4gICAgY29ubmVjdGlvbnMuZ2V0KGtleSkuc3luY0RhdGFTb3VyY2Uoc291cmNlLCBhdXJ1bVNlcnZlckluZm8uaWQsIGF1cnVtU2VydmVySW5mby5hdXRoZW50aWNhdGlvblRva2VuLCBjYW5jZWxsYXRpb24pO1xufVxuZXhwb3J0cy5zeW5jRGF0YVNvdXJjZSA9IHN5bmNEYXRhU291cmNlO1xuZnVuY3Rpb24gbWFrZUtleShwcm90b2NvbCwgaG9zdCkge1xuICAgIHJldHVybiBgJHtyZXNvbHZlUHJvdG9jb2wocHJvdG9jb2wpfTovLyR7cmVzb2x2ZUhvc3QoaG9zdCl9YDtcbn1cbmFzeW5jIGZ1bmN0aW9uIHN5bmNBcnJheURhdGFTb3VyY2Uoc291cmNlLCBhdXJ1bVNlcnZlckluZm8sIGNhbmNlbGxhdGlvbikge1xuICAgIGNvbnN0IGtleSA9IG1ha2VLZXkoYXVydW1TZXJ2ZXJJbmZvLnByb3RvY29sLCBhdXJ1bVNlcnZlckluZm8uaG9zdCk7XG4gICAgYXdhaXQgZW5zdXJlQ29ubmVjdGlvbihrZXksIGF1cnVtU2VydmVySW5mby5wcm90b2NvbCwgYXVydW1TZXJ2ZXJJbmZvLmhvc3QpO1xuICAgIGNvbm5lY3Rpb25zLmdldChrZXkpLnN5bmNBcnJheURhdGFTb3VyY2Uoc291cmNlLCBhdXJ1bVNlcnZlckluZm8uaWQsIGF1cnVtU2VydmVySW5mby5hdXRoZW50aWNhdGlvblRva2VuLCBjYW5jZWxsYXRpb24pO1xufVxuZXhwb3J0cy5zeW5jQXJyYXlEYXRhU291cmNlID0gc3luY0FycmF5RGF0YVNvdXJjZTtcbmFzeW5jIGZ1bmN0aW9uIHN5bmNEdXBsZXhEYXRhU291cmNlKHNvdXJjZSwgYXVydW1TZXJ2ZXJJbmZvLCBjYW5jZWxsYXRpb24pIHtcbiAgICBjb25zdCBrZXkgPSBtYWtlS2V5KGF1cnVtU2VydmVySW5mby5wcm90b2NvbCwgYXVydW1TZXJ2ZXJJbmZvLmhvc3QpO1xuICAgIGF3YWl0IGVuc3VyZUNvbm5lY3Rpb24oa2V5LCBhdXJ1bVNlcnZlckluZm8ucHJvdG9jb2wsIGF1cnVtU2VydmVySW5mby5ob3N0KTtcbiAgICBjb25uZWN0aW9ucy5nZXQoa2V5KS5zeW5jRHVwbGV4RGF0YVNvdXJjZShzb3VyY2UsIGF1cnVtU2VydmVySW5mby5pZCwgYXVydW1TZXJ2ZXJJbmZvLmF1dGhlbnRpY2F0aW9uVG9rZW4sIGNhbmNlbGxhdGlvbik7XG59XG5leHBvcnRzLnN5bmNEdXBsZXhEYXRhU291cmNlID0gc3luY0R1cGxleERhdGFTb3VyY2U7XG5jb25zdCBjb25uZWN0aW9ucyA9IG5ldyBNYXAoKTtcbmNvbnN0IHBlbmRpbmdDb25uZWN0aW9ucyA9IG5ldyBNYXAoKTtcbmNsYXNzIEF1cnVtU2VydmVyQ2xpZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihjb25uZWN0aW9uKSB7XG4gICAgICAgIHRoaXMubWFzdGVyVG9rZW4gPSBuZXcgY2FuY2VsbGF0aW9uX3Rva2VuX2pzXzEuQ2FuY2VsbGF0aW9uVG9rZW4oKTtcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uID0gY29ubmVjdGlvbjtcbiAgICAgICAgdGhpcy5zeW5jaGVkRGF0YVNvdXJjZXMgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMuc3luY2hlZER1cGxleERhdGFTb3VyY2VzID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLnN5bmNoZWRBcnJheURhdGFTb3VyY2VzID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLnN5bmNoZWRNYXBEYXRhU291cmNlcyA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5zeW5jaGVkT2JqZWN0RGF0YVNvdXJjZXMgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMuc3luY2hlZFNldERhdGFTb3VyY2VzID0gbmV3IE1hcCgpO1xuICAgIH1cbiAgICBzeW5jRGF0YVNvdXJjZShzb3VyY2UsIGlkLCBhdXRoZW50aWNhdGlvblRva2VuLCBjYW5jZWxsYXRpb24pIHtcbiAgICAgICAgdGhpcy5zeW5jU291cmNlKGNhbmNlbGxhdGlvbiwgaWQsIGF1dGhlbnRpY2F0aW9uVG9rZW4sIHNvdXJjZSwgdGhpcy5zeW5jaGVkRGF0YVNvdXJjZXMsIFJlbW90ZVByb3RvY29sLkxJU1RFTl9EQVRBU09VUkNFLCBSZW1vdGVQcm90b2NvbC5DQU5DRUxfREFUQVNPVVJDRSk7XG4gICAgfVxuICAgIHN5bmNPYmplY3REYXRhU291cmNlKHNvdXJjZSwgaWQsIGF1dGhlbnRpY2F0aW9uVG9rZW4sIGNhbmNlbGxhdGlvbikge1xuICAgICAgICB0aGlzLnN5bmNTb3VyY2UoY2FuY2VsbGF0aW9uLCBpZCwgYXV0aGVudGljYXRpb25Ub2tlbiwgc291cmNlLCB0aGlzLnN5bmNoZWRPYmplY3REYXRhU291cmNlcywgUmVtb3RlUHJvdG9jb2wuTElTVEVOX09CSkVDVF9EQVRBU09VUkNFLCBSZW1vdGVQcm90b2NvbC5DQU5DRUxfT0JKRUNUX0RBVEFTT1VSQ0UpO1xuICAgIH1cbiAgICBwZXJmb3JtUlBDKGlucHV0LCBlbmRwb2ludElkLCBhdXRoZW50aWNhdGlvblRva2VuLCBjYW5jZWxsYXRpb24pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHV1aWQgPSBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICBwZW5kaW5nUlBDUmVzcG9uc2VzLnNldCh1dWlkLCB7IHJlc29sdmUsIHJlamVjdCB9KTtcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvbi5zZW5kKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICB0eXBlOiBSZW1vdGVQcm90b2NvbC5QRVJGT1JNX1JQQyxcbiAgICAgICAgICAgICAgICB0b2tlbjogYXV0aGVudGljYXRpb25Ub2tlbixcbiAgICAgICAgICAgICAgICBpZDogZW5kcG9pbnRJZCxcbiAgICAgICAgICAgICAgICB2YWx1ZTogaW5wdXQsXG4gICAgICAgICAgICAgICAgdXVpZFxuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgc3luY1NldERhdGFTb3VyY2Uoc291cmNlLCBpZCwgYXV0aGVudGljYXRpb25Ub2tlbiwgY2FuY2VsbGF0aW9uKSB7XG4gICAgICAgIHRoaXMuc3luY1NvdXJjZShjYW5jZWxsYXRpb24sIGlkLCBhdXRoZW50aWNhdGlvblRva2VuLCBzb3VyY2UsIHRoaXMuc3luY2hlZFNldERhdGFTb3VyY2VzLCBSZW1vdGVQcm90b2NvbC5MSVNURU5fU0VUX0RBVEFTT1VSQ0UsIFJlbW90ZVByb3RvY29sLkNBTkNFTF9TRVRfREFUQVNPVVJDRSk7XG4gICAgfVxuICAgIHN5bmNNYXBEYXRhU291cmNlKHNvdXJjZSwgaWQsIGF1dGhlbnRpY2F0aW9uVG9rZW4sIGNhbmNlbGxhdGlvbikge1xuICAgICAgICB0aGlzLnN5bmNTb3VyY2UoY2FuY2VsbGF0aW9uLCBpZCwgYXV0aGVudGljYXRpb25Ub2tlbiwgc291cmNlLCB0aGlzLnN5bmNoZWRNYXBEYXRhU291cmNlcywgUmVtb3RlUHJvdG9jb2wuTElTVEVOX01BUF9EQVRBU09VUkNFLCBSZW1vdGVQcm90b2NvbC5DQU5DRUxfTUFQX0RBVEFTT1VSQ0UpO1xuICAgIH1cbiAgICBzeW5jQXJyYXlEYXRhU291cmNlKHNvdXJjZSwgaWQsIGF1dGhlbnRpY2F0aW9uVG9rZW4sIGNhbmNlbGxhdGlvbikge1xuICAgICAgICB0aGlzLnN5bmNTb3VyY2UoY2FuY2VsbGF0aW9uLCBpZCwgYXV0aGVudGljYXRpb25Ub2tlbiwgc291cmNlLCB0aGlzLnN5bmNoZWRBcnJheURhdGFTb3VyY2VzLCBSZW1vdGVQcm90b2NvbC5MSVNURU5fQVJSQVlfREFUQVNPVVJDRSwgUmVtb3RlUHJvdG9jb2wuQ0FOQ0VMX0FSUkFZX0RBVEFTT1VSQ0UpO1xuICAgIH1cbiAgICBzeW5jRHVwbGV4RGF0YVNvdXJjZShzb3VyY2UsIGlkLCBhdXRoZW50aWNhdGlvblRva2VuLCBjYW5jZWxsYXRpb24pIHtcbiAgICAgICAgdGhpcy5zeW5jU291cmNlKGNhbmNlbGxhdGlvbiwgaWQsIGF1dGhlbnRpY2F0aW9uVG9rZW4sIHNvdXJjZSwgdGhpcy5zeW5jaGVkRHVwbGV4RGF0YVNvdXJjZXMsIFJlbW90ZVByb3RvY29sLkxJU1RFTl9EVVBMRVhfREFUQVNPVVJDRSwgUmVtb3RlUHJvdG9jb2wuQ0FOQ0VMX0RVUExFWF9EQVRBU09VUkNFKTtcbiAgICAgICAgc291cmNlLmxpc3RlblVwc3RyZWFtKCh2KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb24uc2VuZChKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgdHlwZTogUmVtb3RlUHJvdG9jb2wuVVBEQVRFX0RVUExFWF9EQVRBU09VUkNFLFxuICAgICAgICAgICAgICAgIHRva2VuOiBhdXRoZW50aWNhdGlvblRva2VuLFxuICAgICAgICAgICAgICAgIHZhbHVlOiB2LFxuICAgICAgICAgICAgICAgIGlkXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH0sIGNhbmNlbGxhdGlvbl90b2tlbl9qc18xLkNhbmNlbGxhdGlvblRva2VuLmZyb21NdWx0aXBsZShbY2FuY2VsbGF0aW9uLCB0aGlzLm1hc3RlclRva2VuXSkpO1xuICAgIH1cbiAgICBzeW5jU291cmNlKGNhbmNlbGxhdGlvbiwgaWQsIGF1dGhlbnRpY2F0aW9uVG9rZW4sIHNvdXJjZSwgc3luY2VkU291cmNlcywgbGlzdGVuTWVzc2FnZSwgY2FuY2VsTWVzc2FnZSkge1xuICAgICAgICBjYW5jZWxsYXRpb24uYWRkQ2FuY2VsYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBsaXN0ZW5lcnNCeUF1dGggPSBzeW5jZWRTb3VyY2VzLmdldChpZCk7XG4gICAgICAgICAgICBjb25zdCBsaXN0ZW5lcnMgPSBsaXN0ZW5lcnNCeUF1dGguZ2V0KGF1dGhlbnRpY2F0aW9uVG9rZW4pO1xuICAgICAgICAgICAgbGlzdGVuZXJzLmxpc3RlbmVycy5zcGxpY2UobGlzdGVuZXJzLmxpc3RlbmVycy5maW5kSW5kZXgoKHMpID0+IHMuc291cmNlID09PSBzb3VyY2UpKTtcbiAgICAgICAgICAgIGlmIChsaXN0ZW5lcnMubGlzdGVuZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGxpc3RlbmVyc0J5QXV0aC5kZWxldGUoYXV0aGVudGljYXRpb25Ub2tlbik7XG4gICAgICAgICAgICAgICAgbGlzdGVuZXJzLnNvdXJjZS5jYW5jZWxBbGwoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb24uc2VuZChKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IGNhbmNlbE1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgICAgIGlkLFxuICAgICAgICAgICAgICAgICAgICB0b2tlbjogYXV0aGVudGljYXRpb25Ub2tlblxuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmICghc3luY2VkU291cmNlcy5oYXMoaWQpKSB7XG4gICAgICAgICAgICBzeW5jZWRTb3VyY2VzLnNldChpZCwgbmV3IE1hcCgpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXN5bmNlZFNvdXJjZXMuZ2V0KGlkKS5oYXMoYXV0aGVudGljYXRpb25Ub2tlbikpIHtcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvbi5zZW5kKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICB0eXBlOiBsaXN0ZW5NZXNzYWdlLFxuICAgICAgICAgICAgICAgIGlkLFxuICAgICAgICAgICAgICAgIHRva2VuOiBhdXRoZW50aWNhdGlvblRva2VuXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICBzeW5jZWRTb3VyY2VzLmdldChpZCkuc2V0KGF1dGhlbnRpY2F0aW9uVG9rZW4sIHsgc291cmNlLCBsaXN0ZW5lcnM6IFtdIH0pO1xuICAgICAgICB9XG4gICAgICAgIHN5bmNlZFNvdXJjZXMuZ2V0KGlkKS5nZXQoYXV0aGVudGljYXRpb25Ub2tlbikubGlzdGVuZXJzLnB1c2goe1xuICAgICAgICAgICAgc291cmNlLFxuICAgICAgICAgICAgdG9rZW46IGNhbmNlbGxhdGlvblxuICAgICAgICB9KTtcbiAgICB9XG4gICAgc3RhdGljIGNvbm5lY3QoaG9zdCwgcHJvdG9jb2wpIHtcbiAgICAgICAgbGV0IHBlbmRpbmdUb2tlbiA9IG5ldyBjYW5jZWxsYXRpb25fdG9rZW5fanNfMS5DYW5jZWxsYXRpb25Ub2tlbigpO1xuICAgICAgICBsZXQgc3RhcnRlZCA9IGZhbHNlO1xuICAgICAgICBsZXQgbGF0ZW5jeSA9IFswLCAwLCAwLCAwLCAwXTtcbiAgICAgICAgbGV0IGN5Y2xlID0gMDtcbiAgICAgICAgbGV0IGxhdGVuY3lUcztcbiAgICAgICAgbGV0IGxhc3RCZWF0O1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgcHJvdG9jb2wgPSByZXNvbHZlUHJvdG9jb2wocHJvdG9jb2wpO1xuICAgICAgICAgICAgaG9zdCA9IHJlc29sdmVIb3N0KGhvc3QpO1xuICAgICAgICAgICAgY29uc3QgY29ubmVjdGlvbiA9IG5ldyBXZWJTb2NrZXQoYCR7cHJvdG9jb2x9Oi8vJHtob3N0fWApO1xuICAgICAgICAgICAgY29uc3QgY2xpZW50ID0gbmV3IEF1cnVtU2VydmVyQ2xpZW50KGNvbm5lY3Rpb24pO1xuICAgICAgICAgICAgY2xpZW50Lm1hc3RlclRva2VuLmFkZENhbmNlbGFibGUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb25zLmRlbGV0ZShtYWtlS2V5KHByb3RvY29sLCBob3N0KSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHBlbmRpbmdUb2tlbi5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmNsb3NlKDQwMDEsICdubyByZXNwb25zZScpO1xuICAgICAgICAgICAgICAgIHJlamVjdCgpO1xuICAgICAgICAgICAgICAgIGNsaWVudC5tYXN0ZXJUb2tlbi5jYW5jZWwoKTtcbiAgICAgICAgICAgIH0sIDUwMDApO1xuICAgICAgICAgICAgY29ubmVjdGlvbi5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgKG0pID0+IHtcbiAgICAgICAgICAgICAgICBsYXN0QmVhdCA9IERhdGUubm93KCk7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbXNnID0gSlNPTi5wYXJzZShtLmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKG1zZy50eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFJlbW90ZVByb3RvY29sLkhFQVJUQkVBVDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXRlbmN5W2N5Y2xlXSA9IERhdGUubm93KCkgLSBsYXRlbmN5VHM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChjeWNsZSArIDEpICUgbGF0ZW5jeS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYEF1cnVtU2VydmVyIGxhdGVuY3k6ICR7KGxhdGVuY3kucmVkdWNlKChwLCBjKSA9PiBwICsgYykgLyBsYXRlbmN5Lmxlbmd0aCkudG9GaXhlZCgxKX1tc2ApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjeWNsZSA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjeWNsZSsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgUmVtb3RlUHJvdG9jb2wuUEVSRk9STV9SUENfUkVTVUxUX0VSUjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgUmVtb3RlUHJvdG9jb2wuUEVSRk9STV9SUENfRVJSOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlbmRpbmdSUENSZXNwb25zZXMuZ2V0KG1zZy51dWlkKS5yZWplY3QobmV3IEVycm9yKG1zZy5lcnJvcikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlbmRpbmdSUENSZXNwb25zZXMuZGVsZXRlKG1zZy51dWlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgUmVtb3RlUHJvdG9jb2wuUEVSRk9STV9SUENfUkVTVUxUOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlbmRpbmdSUENSZXNwb25zZXMuZ2V0KG1zZy51dWlkKS5yZXNvbHZlKG1zZy5yZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlbmRpbmdSUENSZXNwb25zZXMuZGVsZXRlKG1zZy51dWlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgUmVtb3RlUHJvdG9jb2wuVVBEQVRFX0RBVEFTT1VSQ0U6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNsaWVudC5zeW5jaGVkRGF0YVNvdXJjZXMuaGFzKG1zZy5pZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYnlBdXRoID0gY2xpZW50LnN5bmNoZWREYXRhU291cmNlcy5nZXQobXNnLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBkc3Mgb2YgYnlBdXRoLnZhbHVlcygpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkc3Muc291cmNlLnVwZGF0ZShtc2cudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBSZW1vdGVQcm90b2NvbC5VUERBVEVfQVJSQVlfREFUQVNPVVJDRTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2xpZW50LnN5bmNoZWRBcnJheURhdGFTb3VyY2VzLmhhcyhtc2cuaWQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJ5QXV0aCA9IGNsaWVudC5zeW5jaGVkQXJyYXlEYXRhU291cmNlcy5nZXQobXNnLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBkc3Mgb2YgYnlBdXRoLnZhbHVlcygpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjaGFuZ2UgPSBtc2cuY2hhbmdlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHNzLnNvdXJjZS5hcHBseUNvbGxlY3Rpb25DaGFuZ2UoY2hhbmdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgUmVtb3RlUHJvdG9jb2wuVVBEQVRFX0RVUExFWF9EQVRBU09VUkNFOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjbGllbnQuc3luY2hlZER1cGxleERhdGFTb3VyY2VzLmhhcyhtc2cuaWQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJ5QXV0aCA9IGNsaWVudC5zeW5jaGVkRHVwbGV4RGF0YVNvdXJjZXMuZ2V0KG1zZy5pZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgZHNzIG9mIGJ5QXV0aC52YWx1ZXMoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHNzLnNvdXJjZS51cGRhdGVEb3duc3RyZWFtKG1zZy52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFJlbW90ZVByb3RvY29sLlVQREFURV9NQVBfREFUQVNPVVJDRTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2xpZW50LnN5bmNoZWRNYXBEYXRhU291cmNlcy5oYXMobXNnLmlkKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBieUF1dGggPSBjbGllbnQuc3luY2hlZE1hcERhdGFTb3VyY2VzLmdldChtc2cuaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGRzcyBvZiBieUF1dGgudmFsdWVzKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRzcy5zb3VyY2UuYXBwbHlNYXBDaGFuZ2UobXNnLmNoYW5nZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdSZWNpZXZlZCBtYWxmb3JtZWQgbWVzc2FnZSBmcm9tIHNlcnZlcicpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25uZWN0aW9uLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgKGUpID0+IHtcbiAgICAgICAgICAgICAgICBjbGllbnQubWFzdGVyVG9rZW4uY2FuY2VsKCk7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25uZWN0aW9uLmFkZEV2ZW50TGlzdGVuZXIoJ29wZW4nLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcGVuZGluZ1Rva2VuLmNhbmNlbCgpO1xuICAgICAgICAgICAgICAgIHBlbmRpbmdUb2tlbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICBzdGFydGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBsYXN0QmVhdCA9IERhdGUubm93KCk7XG4gICAgICAgICAgICAgICAgY2xpZW50Lm1hc3RlclRva2VuLnNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKERhdGUubm93KCkgLSBsYXN0QmVhdCA+IDEwMDAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmNsb3NlKDQwMDAsICd0aW1lb3V0Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbGF0ZW5jeVRzID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5zZW5kKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFJlbW90ZVByb3RvY29sLkhFQVJUQkVBVFxuICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgfSwgMjUwMCk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShjbGllbnQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25uZWN0aW9uLmFkZEV2ZW50TGlzdGVuZXIoJ2Nsb3NlJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNsaWVudC5tYXN0ZXJUb2tlbi5jYW5jZWwoKTtcbiAgICAgICAgICAgICAgICBpZiAoc3RhcnRlZCkge1xuICAgICAgICAgICAgICAgICAgICBlbnN1cmVDb25uZWN0aW9uKG1ha2VLZXkocHJvdG9jb2wsIGhvc3QpLCBwcm90b2NvbCwgaG9zdCkudGhlbigobmV3Q2xpZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdDbGllbnQubWlncmF0ZShjbGllbnQpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgbWlncmF0ZShjbGllbnQpIHtcbiAgICAgICAgZm9yIChjb25zdCBpZCBvZiBjbGllbnQuc3luY2hlZERhdGFTb3VyY2VzLmtleXMoKSkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBhdXRoIG9mIGNsaWVudC5zeW5jaGVkRGF0YVNvdXJjZXMuZ2V0KGlkKS5rZXlzKCkpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHsgc291cmNlLCB0b2tlbiB9IG9mIGNsaWVudC5zeW5jaGVkRGF0YVNvdXJjZXMuZ2V0KGlkKS5nZXQoYXV0aCkubGlzdGVuZXJzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3luY0RhdGFTb3VyY2Uoc291cmNlLCBpZCwgYXV0aCwgdG9rZW4pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IGlkIG9mIGNsaWVudC5zeW5jaGVkQXJyYXlEYXRhU291cmNlcy5rZXlzKCkpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgYXV0aCBvZiBjbGllbnQuc3luY2hlZEFycmF5RGF0YVNvdXJjZXMuZ2V0KGlkKS5rZXlzKCkpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHsgc291cmNlLCB0b2tlbiB9IG9mIGNsaWVudC5zeW5jaGVkQXJyYXlEYXRhU291cmNlcy5nZXQoaWQpLmdldChhdXRoKS5saXN0ZW5lcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zeW5jQXJyYXlEYXRhU291cmNlKHNvdXJjZSwgaWQsIGF1dGgsIHRva2VuKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBpZCBvZiBjbGllbnQuc3luY2hlZER1cGxleERhdGFTb3VyY2VzLmtleXMoKSkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBhdXRoIG9mIGNsaWVudC5zeW5jaGVkRHVwbGV4RGF0YVNvdXJjZXMuZ2V0KGlkKS5rZXlzKCkpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHsgc291cmNlLCB0b2tlbiB9IG9mIGNsaWVudC5zeW5jaGVkRHVwbGV4RGF0YVNvdXJjZXMuZ2V0KGlkKS5nZXQoYXV0aCkubGlzdGVuZXJzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3luY0R1cGxleERhdGFTb3VyY2Uoc291cmNlLCBpZCwgYXV0aCwgdG9rZW4pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IGlkIG9mIGNsaWVudC5zeW5jaGVkTWFwRGF0YVNvdXJjZXMua2V5cygpKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGF1dGggb2YgY2xpZW50LnN5bmNoZWRNYXBEYXRhU291cmNlcy5nZXQoaWQpLmtleXMoKSkge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgeyBzb3VyY2UsIHRva2VuIH0gb2YgY2xpZW50LnN5bmNoZWRNYXBEYXRhU291cmNlcy5nZXQoaWQpLmdldChhdXRoKS5saXN0ZW5lcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zeW5jTWFwRGF0YVNvdXJjZShzb3VyY2UsIGlkLCBhdXRoLCB0b2tlbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgaWQgb2YgY2xpZW50LnN5bmNoZWRPYmplY3REYXRhU291cmNlcy5rZXlzKCkpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgYXV0aCBvZiBjbGllbnQuc3luY2hlZE9iamVjdERhdGFTb3VyY2VzLmdldChpZCkua2V5cygpKSB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCB7IHNvdXJjZSwgdG9rZW4gfSBvZiBjbGllbnQuc3luY2hlZE9iamVjdERhdGFTb3VyY2VzLmdldChpZCkuZ2V0KGF1dGgpLmxpc3RlbmVycykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN5bmNPYmplY3REYXRhU291cmNlKHNvdXJjZSwgaWQsIGF1dGgsIHRva2VuKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBpZCBvZiBjbGllbnQuc3luY2hlZFNldERhdGFTb3VyY2VzLmtleXMoKSkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBhdXRoIG9mIGNsaWVudC5zeW5jaGVkU2V0RGF0YVNvdXJjZXMuZ2V0KGlkKS5rZXlzKCkpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHsgc291cmNlLCB0b2tlbiB9IG9mIGNsaWVudC5zeW5jaGVkU2V0RGF0YVNvdXJjZXMuZ2V0KGlkKS5nZXQoYXV0aCkubGlzdGVuZXJzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3luY1NldERhdGFTb3VyY2Uoc291cmNlLCBpZCwgYXV0aCwgdG9rZW4pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN5bmNoZWREYXRhU291cmNlcyA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5zeW5jaGVkRHVwbGV4RGF0YVNvdXJjZXMgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMuc3luY2hlZEFycmF5RGF0YVNvdXJjZXMgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMuc3luY2hlZE1hcERhdGFTb3VyY2VzID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLnN5bmNoZWRPYmplY3REYXRhU291cmNlcyA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5zeW5jaGVkU2V0RGF0YVNvdXJjZXMgPSBuZXcgTWFwKCk7XG4gICAgfVxufVxuZnVuY3Rpb24gcmVzb2x2ZVByb3RvY29sKHByb3RvY29sKSB7XG4gICAgaWYgKCFwcm90b2NvbCkge1xuICAgICAgICBpZiAodHlwZW9mIGxvY2F0aW9uID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQcm90b2NvbCBpcyBub3Qgb3B0aW9uYWwgaW4gbm9uIGJyb3dzZXIgZW52aXJvbm1lbnRzJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxvY2F0aW9uLnByb3RvY29sLnN0YXJ0c1dpdGgoJ2h0dHBzJykpIHtcbiAgICAgICAgICAgIHByb3RvY29sID0gJ3dzcyc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBwcm90b2NvbCA9ICd3cyc7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHByb3RvY29sO1xufVxuZnVuY3Rpb24gcmVzb2x2ZUhvc3QoaG9zdCkge1xuICAgIGlmICghaG9zdCkge1xuICAgICAgICBpZiAodHlwZW9mIGxvY2F0aW9uID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdIb3N0IGlzIG5vdCBvcHRpb25hbCBpbiBub24gYnJvd3NlciBlbnZpcm9ubWVudHMnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbG9jYXRpb24uaG9zdDtcbiAgICB9XG4gICAgcmV0dXJuIGhvc3Q7XG59XG5hc3luYyBmdW5jdGlvbiBlbnN1cmVDb25uZWN0aW9uKGtleSwgcHJvdG9jb2wsIGhvc3QpIHtcbiAgICBpZiAoY29ubmVjdGlvbnMuaGFzKGtleSkpIHtcbiAgICAgICAgcmV0dXJuIGNvbm5lY3Rpb25zLmdldChrZXkpO1xuICAgIH1cbiAgICBsZXQgYmFja29mZiA9IDEwMDA7XG4gICAgaWYgKHBlbmRpbmdDb25uZWN0aW9ucy5oYXMoa2V5KSkge1xuICAgICAgICByZXR1cm4gcGVuZGluZ0Nvbm5lY3Rpb25zLmdldChrZXkpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgY29uc3QgcGVuZGluZ0Nvbm5lY3Rpb24gPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgYXN5bmMgZnVuY3Rpb24gdHJ5Q29ubmVjdCgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwID0gQXVydW1TZXJ2ZXJDbGllbnQuY29ubmVjdChob3N0LCBwcm90b2NvbCk7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2xpZW50ID0gYXdhaXQgcDtcbiAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbnMuc2V0KGtleSwgY2xpZW50KTtcbiAgICAgICAgICAgICAgICAgICAgcGVuZGluZ0Nvbm5lY3Rpb25zLmRlbGV0ZShrZXkpO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGNsaWVudCk7XG4gICAgICAgICAgICAgICAgICAgIGJhY2tvZmYgPSAxMDAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tvZmYgKz0gMTAwMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeUNvbm5lY3QoKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgYmFja29mZik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdHJ5Q29ubmVjdCgpO1xuICAgICAgICB9KTtcbiAgICAgICAgcGVuZGluZ0Nvbm5lY3Rpb25zLnNldChrZXksIHBlbmRpbmdDb25uZWN0aW9uKTtcbiAgICAgICAgcmV0dXJuIHBlbmRpbmdDb25uZWN0aW9uO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWF1cnVtX3NlcnZlcl9jbGllbnQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XG4gICAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcbiAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fZXhwb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19leHBvcnRTdGFyKSB8fCBmdW5jdGlvbihtLCBleHBvcnRzKSB7XG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChleHBvcnRzLCBwKSkgX19jcmVhdGVCaW5kaW5nKGV4cG9ydHMsIG0sIHApO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZ2V0UmVtb3RlRnVuY3Rpb24gPSBleHBvcnRzLlJlbW90ZVByb3RvY29sID0gZXhwb3J0cy5lbmFibGVEaWFnbm9zdGljTW9kZSA9IGV4cG9ydHMuZW5hYmxlRGVidWdNb2RlID0gZXhwb3J0cy5kZWJ1Z01vZGUgPSBleHBvcnRzLmF1cnVtVG9IVE1MID0gZXhwb3J0cy5hdXJ1bUVsZW1lbnRNb2RlbElkZW50aXRpeSA9IGV4cG9ydHMuQXVydW1FbGVtZW50ID0gZXhwb3J0cy5jcmVhdGVSZW5kZXJTZXNzaW9uID0gZXhwb3J0cy5jcmVhdGVMaWZlQ3ljbGUgPSBleHBvcnRzLmNyZWF0ZUFQSSA9IGV4cG9ydHMuQXJyYXlBdXJ1bUVsZW1lbnQgPSBleHBvcnRzLlNpbmd1bGFyQXVydW1FbGVtZW50ID0gdm9pZCAwO1xuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL3JlbmRlcmluZy93ZWJjb21wb25lbnQuanNcIiksIGV4cG9ydHMpO1xudmFyIGF1cnVtX2VsZW1lbnRfanNfMSA9IHJlcXVpcmUoXCIuL3JlbmRlcmluZy9hdXJ1bV9lbGVtZW50LmpzXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiU2luZ3VsYXJBdXJ1bUVsZW1lbnRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGF1cnVtX2VsZW1lbnRfanNfMS5TaW5ndWxhckF1cnVtRWxlbWVudDsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkFycmF5QXVydW1FbGVtZW50XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBhdXJ1bV9lbGVtZW50X2pzXzEuQXJyYXlBdXJ1bUVsZW1lbnQ7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJjcmVhdGVBUElcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGF1cnVtX2VsZW1lbnRfanNfMS5jcmVhdGVBUEk7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJjcmVhdGVMaWZlQ3ljbGVcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGF1cnVtX2VsZW1lbnRfanNfMS5jcmVhdGVMaWZlQ3ljbGU7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJjcmVhdGVSZW5kZXJTZXNzaW9uXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBhdXJ1bV9lbGVtZW50X2pzXzEuY3JlYXRlUmVuZGVyU2Vzc2lvbjsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkF1cnVtRWxlbWVudFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gYXVydW1fZWxlbWVudF9qc18xLkF1cnVtRWxlbWVudDsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImF1cnVtRWxlbWVudE1vZGVsSWRlbnRpdGl5XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBhdXJ1bV9lbGVtZW50X2pzXzEuYXVydW1FbGVtZW50TW9kZWxJZGVudGl0aXk7IH0gfSk7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vcmVuZGVyaW5nL2F1cnVtX3N0eWxlLmpzXCIpLCBleHBvcnRzKTtcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9idWlsdGluX2NvbXBvbmVudHMvcm91dGVyLmpzXCIpLCBleHBvcnRzKTtcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9idWlsdGluX2NvbXBvbmVudHMvc3VzcGVuc2UuanNcIiksIGV4cG9ydHMpO1xuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL2J1aWx0aW5fY29tcG9uZW50cy9lcnJvcl9ib3VuZGFyeS5qc1wiKSwgZXhwb3J0cyk7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vYnVpbHRpbl9jb21wb25lbnRzL3N3aXRjaC5qc1wiKSwgZXhwb3J0cyk7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vc3RyZWFtL2RhdGFfc291cmNlLmpzXCIpLCBleHBvcnRzKTtcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9zdHJlYW0vZHVwbGV4X2RhdGFfc291cmNlLmpzXCIpLCBleHBvcnRzKTtcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9zdHJlYW0vb2JqZWN0X2RhdGFfc291cmNlLmpzXCIpLCBleHBvcnRzKTtcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9zdHJlYW0vdHJlZV9kYXRhX3NvdXJjZS5qc1wiKSwgZXhwb3J0cyk7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vc3RyZWFtL2RhdGFfc291cmNlX29wZXJhdG9ycy5qc1wiKSwgZXhwb3J0cyk7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vc3RyZWFtL2R1cGxleF9kYXRhX3NvdXJjZV9vcGVyYXRvcnMuanNcIiksIGV4cG9ydHMpO1xuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL3N0cmVhbS9vcGVyYXRvcl9tb2RlbC5qc1wiKSwgZXhwb3J0cyk7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vc3RyZWFtL3N0cmVhbS5qc1wiKSwgZXhwb3J0cyk7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vdXRpbGl0aWVzL2F1cnVtLmpzXCIpLCBleHBvcnRzKTtcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi91dGlsaXRpZXMvY2FuY2VsbGF0aW9uX3Rva2VuLmpzXCIpLCBleHBvcnRzKTtcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi91dGlsaXRpZXMvZXZlbnRfZW1pdHRlci5qc1wiKSwgZXhwb3J0cyk7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vdXRpbGl0aWVzL2NsYXNzbmFtZS5qc1wiKSwgZXhwb3J0cyk7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vdXRpbGl0aWVzL3NvdXJjZXMuanNcIiksIGV4cG9ydHMpO1xuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL3N0cmVhbS9lbWl0dGVycy5qc1wiKSwgZXhwb3J0cyk7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vbm9kZXMvc3RyaW5nX2FkYXB0ZXIuanNcIiksIGV4cG9ydHMpO1xuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL3V0aWxpdGllcy90cmFuc2NsdXNpb24uanNcIiksIGV4cG9ydHMpO1xudmFyIGRvbV9hZGFwdGVyX2pzXzEgPSByZXF1aXJlKFwiLi9idWlsdGluX2NvbXBvbmVudHMvZG9tX2FkYXB0ZXIuanNcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJhdXJ1bVRvSFRNTFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gZG9tX2FkYXB0ZXJfanNfMS5hdXJ1bVRvSFRNTDsgfSB9KTtcbnZhciBkZWJ1Z19tb2RlX2pzXzEgPSByZXF1aXJlKFwiLi9kZWJ1Z19tb2RlLmpzXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiZGVidWdNb2RlXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBkZWJ1Z19tb2RlX2pzXzEuZGVidWdNb2RlOyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiZW5hYmxlRGVidWdNb2RlXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBkZWJ1Z19tb2RlX2pzXzEuZW5hYmxlRGVidWdNb2RlOyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiZW5hYmxlRGlhZ25vc3RpY01vZGVcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGRlYnVnX21vZGVfanNfMS5lbmFibGVEaWFnbm9zdGljTW9kZTsgfSB9KTtcbnZhciBhdXJ1bV9zZXJ2ZXJfY2xpZW50X2pzXzEgPSByZXF1aXJlKFwiLi9hdXJ1bV9zZXJ2ZXIvYXVydW1fc2VydmVyX2NsaWVudC5qc1wiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIlJlbW90ZVByb3RvY29sXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBhdXJ1bV9zZXJ2ZXJfY2xpZW50X2pzXzEuUmVtb3RlUHJvdG9jb2w7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJnZXRSZW1vdGVGdW5jdGlvblwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gYXVydW1fc2VydmVyX2NsaWVudF9qc18xLmdldFJlbW90ZUZ1bmN0aW9uOyB9IH0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXVydW1qcy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuYXVydW1Ub0hUTUwgPSBleHBvcnRzLmNyZWF0ZUV2ZW50SGFuZGxlcnMgPSBleHBvcnRzLnByb2Nlc3NIVE1MTm9kZSA9IGV4cG9ydHMuRG9tTm9kZUNyZWF0b3IgPSBleHBvcnRzLmRlZmF1bHRBdHRyaWJ1dGVzID0gZXhwb3J0cy5kZWZhdWx0RXZlbnRzID0gdm9pZCAwO1xuY29uc3QgZGF0YV9zb3VyY2VfanNfMSA9IHJlcXVpcmUoXCIuLi9zdHJlYW0vZGF0YV9zb3VyY2UuanNcIik7XG5jb25zdCBkdXBsZXhfZGF0YV9zb3VyY2VfanNfMSA9IHJlcXVpcmUoXCIuLi9zdHJlYW0vZHVwbGV4X2RhdGFfc291cmNlLmpzXCIpO1xuY29uc3QgYXVydW1fZWxlbWVudF9qc18xID0gcmVxdWlyZShcIi4uL3JlbmRlcmluZy9hdXJ1bV9lbGVtZW50LmpzXCIpO1xuY29uc3QgZGF0YV9zb3VyY2Vfb3BlcmF0b3JzX2pzXzEgPSByZXF1aXJlKFwiLi4vc3RyZWFtL2RhdGFfc291cmNlX29wZXJhdG9ycy5qc1wiKTtcbi8qKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydHMuZGVmYXVsdEV2ZW50cyA9IHtcbiAgICBkcmFnOiAnb25EcmFnJyxcbiAgICBkcmFnc3RhcnQ6ICdvbkRyYWdTdGFydCcsXG4gICAgZHJhZ2VuZDogJ29uRHJhZ0VuZCcsXG4gICAgZHJhZ2V4aXQ6ICdvbkRyYWdFeGl0JyxcbiAgICBkcmFnb3ZlcjogJ29uRHJhZ092ZXInLFxuICAgIGRyYWdlbnRlcjogJ29uRHJhZ0VudGVyJyxcbiAgICBkcmFnbGVhdmU6ICdvbkRyYWdMZWF2ZScsXG4gICAgZHJvcDogJ29uRHJvcCcsXG4gICAgYmx1cjogJ29uQmx1cicsXG4gICAgZm9jdXM6ICdvbkZvY3VzJyxcbiAgICBjbGljazogJ29uQ2xpY2snLFxuICAgIGRibGNsaWNrOiAnb25EYmxDbGljaycsXG4gICAga2V5ZG93bjogJ29uS2V5RG93bicsXG4gICAga2V5aGl0OiAnb25LZXlIaXQnLFxuICAgIGtleXVwOiAnb25LZXlVcCcsXG4gICAgY29udGV4dG1lbnU6ICdvbkNvbnRleHRNZW51JyxcbiAgICBtb3VzZWRvd246ICdvbk1vdXNlRG93bicsXG4gICAgbW91c2V1cDogJ29uTW91c2VVcCcsXG4gICAgbW91c2Vtb3ZlOiAnb25Nb3VzZU1vdmUnLFxuICAgIG1vdXNlZW50ZXI6ICdvbk1vdXNlRW50ZXInLFxuICAgIG1vdXNlbGVhdmU6ICdvbk1vdXNlTGVhdmUnLFxuICAgIG1vdXNld2hlZWw6ICdvbk1vdXNlV2hlZWwnLFxuICAgIGxvYWQ6ICdvbkxvYWQnLFxuICAgIGVycm9yOiAnb25FcnJvcidcbn07XG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnRzLmRlZmF1bHRBdHRyaWJ1dGVzID0gWydpZCcsICduYW1lJywgJ2RyYWdnYWJsZScsICd0YWJpbmRleCcsICdzdHlsZScsICdyb2xlJywgJ2NvbnRlbnRlZGl0YWJsZScsICdzbG90JywgJ3RpdGxlJ107XG5mdW5jdGlvbiBEb21Ob2RlQ3JlYXRvcihub2RlTmFtZSwgZXh0cmFBdHRyaWJ1dGVzLCBleHRyYUV2ZW50cywgZXh0cmFMb2dpYykge1xuICAgIHJldHVybiBmdW5jdGlvbiAocHJvcHMsIGNoaWxkcmVuLCBhcGkpIHtcbiAgICAgICAgY29uc3Qgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobm9kZU5hbWUpO1xuICAgICAgICBpZiAocHJvcHMpIHtcbiAgICAgICAgICAgIHByb2Nlc3NIVE1MTm9kZShub2RlLCBwcm9wcywgYXBpLmNhbmNlbGxhdGlvblRva2VuLCBleHRyYUF0dHJpYnV0ZXMsIGV4dHJhRXZlbnRzKTtcbiAgICAgICAgfVxuICAgICAgICAvL0B0cy1pZ25vcmVcbiAgICAgICAgY29uc3QgcmVuZGVyZWRDaGlsZHJlbiA9ICgwLCBhdXJ1bV9lbGVtZW50X2pzXzEucmVuZGVySW50ZXJuYWwpKGNoaWxkcmVuLCBhcGkucmVuZGVyU2Vzc2lvbik7XG4gICAgICAgIGNvbm5lY3RDaGlsZHJlbihub2RlLCByZW5kZXJlZENoaWxkcmVuKTtcbiAgICAgICAgaWYgKHByb3BzKSB7XG4gICAgICAgICAgICBpZiAocHJvcHMub25BdHRhY2gpIHtcbiAgICAgICAgICAgICAgICBhcGkub25BdHRhY2goKCkgPT4gcHJvcHMub25BdHRhY2gobm9kZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHByb3BzLm9uRGV0YWNoKSB7XG4gICAgICAgICAgICAgICAgYXBpLm9uRGV0YWNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGUuaXNDb25uZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZChub2RlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBwcm9wcy5vbkRldGFjaChub2RlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBleHRyYUxvZ2ljID09PSBudWxsIHx8IGV4dHJhTG9naWMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGV4dHJhTG9naWMobm9kZSwgcHJvcHMsIGFwaS5jYW5jZWxsYXRpb25Ub2tlbik7XG4gICAgICAgIHJldHVybiBub2RlO1xuICAgIH07XG59XG5leHBvcnRzLkRvbU5vZGVDcmVhdG9yID0gRG9tTm9kZUNyZWF0b3I7XG5mdW5jdGlvbiBjb25uZWN0Q2hpbGRyZW4odGFyZ2V0LCBjaGlsZHJlbikge1xuICAgIGlmIChjaGlsZHJlbiA9PT0gdW5kZWZpbmVkIHx8IGNoaWxkcmVuID09PSBudWxsIHx8IGNoaWxkcmVuLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGZvciAoY29uc3QgY2hpbGQgb2YgY2hpbGRyZW4pIHtcbiAgICAgICAgaWYgKCFjaGlsZCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgVGV4dCB8fCBjaGlsZCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgICAgICB0YXJnZXQuYXBwZW5kQ2hpbGQoY2hpbGQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNoaWxkIGluc3RhbmNlb2YgYXVydW1fZWxlbWVudF9qc18xLkF1cnVtRWxlbWVudCkge1xuICAgICAgICAgICAgY2hpbGQuYXR0YWNoVG9Eb20odGFyZ2V0LCB0YXJnZXQuY2hpbGROb2Rlcy5sZW5ndGgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmV4cGVjdGVkIGNoaWxkIHR5cGUgcGFzc2VkIHRvIERPTSBOb2RlOiAke2NoaWxkcmVufWApO1xuICAgICAgICB9XG4gICAgfVxufVxuZnVuY3Rpb24gcHJvY2Vzc0hUTUxOb2RlKG5vZGUsIHByb3BzLCBjbGVhblVwLCBleHRyYUF0dHJpYnV0ZXMsIGV4dHJhRXZlbnRzKSB7XG4gICAgY3JlYXRlRXZlbnRIYW5kbGVycyhub2RlLCBleHBvcnRzLmRlZmF1bHRFdmVudHMsIHByb3BzKTtcbiAgICBpZiAoZXh0cmFFdmVudHMpIHtcbiAgICAgICAgY3JlYXRlRXZlbnRIYW5kbGVycyhub2RlLCBleHRyYUV2ZW50cywgcHJvcHMpO1xuICAgIH1cbiAgICBjb25zdCBkYXRhUHJvcHMgPSBPYmplY3Qua2V5cyhwcm9wcykuZmlsdGVyKChlKSA9PiBlLmluY2x1ZGVzKCctJykpO1xuICAgIGJpbmRQcm9wcyhub2RlLCBleHBvcnRzLmRlZmF1bHRBdHRyaWJ1dGVzLCBwcm9wcywgY2xlYW5VcCwgZGF0YVByb3BzKTtcbiAgICBpZiAoZXh0cmFBdHRyaWJ1dGVzKSB7XG4gICAgICAgIGJpbmRQcm9wcyhub2RlLCBleHRyYUF0dHJpYnV0ZXMsIHByb3BzLCBjbGVhblVwKTtcbiAgICB9XG4gICAgaWYgKHByb3BzLmNsYXNzKSB7XG4gICAgICAgIGhhbmRsZUNsYXNzKG5vZGUsIHByb3BzLmNsYXNzLCBjbGVhblVwKTtcbiAgICB9XG59XG5leHBvcnRzLnByb2Nlc3NIVE1MTm9kZSA9IHByb2Nlc3NIVE1MTm9kZTtcbmZ1bmN0aW9uIGNyZWF0ZUV2ZW50SGFuZGxlcnMobm9kZSwgZXZlbnRzLCBwcm9wcykge1xuICAgIGZvciAoY29uc3Qga2V5IGluIGV2ZW50cykge1xuICAgICAgICBpZiAocHJvcHNbZXZlbnRzW2tleV1dKSB7XG4gICAgICAgICAgICBpZiAocHJvcHNbZXZlbnRzW2tleV1dIGluc3RhbmNlb2YgZGF0YV9zb3VyY2VfanNfMS5EYXRhU291cmNlKSB7XG4gICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKGtleSwgKGUpID0+IHByb3BzW2V2ZW50c1trZXldXS51cGRhdGUoZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAocHJvcHNbZXZlbnRzW2tleV1dIGluc3RhbmNlb2YgZHVwbGV4X2RhdGFfc291cmNlX2pzXzEuRHVwbGV4RGF0YVNvdXJjZSkge1xuICAgICAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcihrZXksIChlKSA9PiBwcm9wc1tldmVudHNba2V5XV0udXBkYXRlRG93bnN0cmVhbShlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgcHJvcHNbZXZlbnRzW2tleV1dID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKGtleSwgKGUpID0+IHByb3BzW2V2ZW50c1trZXldXShlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLmNyZWF0ZUV2ZW50SGFuZGxlcnMgPSBjcmVhdGVFdmVudEhhbmRsZXJzO1xuZnVuY3Rpb24gYmluZFByb3BzKG5vZGUsIGtleXMsIHByb3BzLCBjbGVhblVwLCBkeW5hbWljUHJvcHMpIHtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBrZXlzKSB7XG4gICAgICAgIGlmIChwcm9wc1trZXldKSB7XG4gICAgICAgICAgICBhc3NpZ25TdHJpbmdTb3VyY2VUb0F0dHJpYnV0ZShub2RlLCBwcm9wc1trZXldLCBrZXksIGNsZWFuVXApO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChkeW5hbWljUHJvcHMpIHtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgZHluYW1pY1Byb3BzKSB7XG4gICAgICAgICAgICBpZiAocHJvcHNba2V5XSkge1xuICAgICAgICAgICAgICAgIGFzc2lnblN0cmluZ1NvdXJjZVRvQXR0cmlidXRlKG5vZGUsIHByb3BzW2tleV0sIGtleSwgY2xlYW5VcCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4vKipcbiAqIFJlbmRlcnMgQXVydW0gY29udGVudCBzeW5jaHJvbm91c2x5IGluIGxpbmUuXG4gKiBAcGFyYW0gY29udGVudCBDb250ZW50IHRvIHJlbmRlclxuICovXG5mdW5jdGlvbiBhdXJ1bVRvSFRNTChjb250ZW50KSB7XG4gICAgY29uc3QgcnMgPSAoMCwgYXVydW1fZWxlbWVudF9qc18xLmNyZWF0ZVJlbmRlclNlc3Npb24pKCk7XG4gICAgY29uc3QgcmVuZGVyZWRDb250ZW50ID0gKDAsIGF1cnVtX2VsZW1lbnRfanNfMS5yZW5kZXJJbnRlcm5hbCkoY29udGVudCwgcnMpO1xuICAgIHJldHVybiB7XG4gICAgICAgIGNvbnRlbnQ6IHJlbmRlcmVkQ29udGVudCxcbiAgICAgICAgZmlyZU9uQXR0YWNoOiAoKSA9PiBycy5hdHRhY2hDYWxscy5mb3JFYWNoKChjKSA9PiBjKCkpLFxuICAgICAgICBkaXNwb3NlOiAoKSA9PiBycy5zZXNzaW9uVG9rZW4uY2FuY2VsKClcbiAgICB9O1xufVxuZXhwb3J0cy5hdXJ1bVRvSFRNTCA9IGF1cnVtVG9IVE1MO1xuZnVuY3Rpb24gYXNzaWduU3RyaW5nU291cmNlVG9BdHRyaWJ1dGUobm9kZSwgZGF0YSwga2V5LCBjbGVhblVwKSB7XG4gICAgaWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xuICAgICAgICBub2RlLnNldEF0dHJpYnV0ZShrZXksIGRhdGEpO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgZGF0YSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICBub2RlLnNldEF0dHJpYnV0ZShrZXksICcnKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChkYXRhIGluc3RhbmNlb2YgZGF0YV9zb3VyY2VfanNfMS5EYXRhU291cmNlIHx8IGRhdGEgaW5zdGFuY2VvZiBkdXBsZXhfZGF0YV9zb3VyY2VfanNfMS5EdXBsZXhEYXRhU291cmNlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZGF0YS52YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIG5vZGUuc2V0QXR0cmlidXRlKGtleSwgZGF0YS52YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIGRhdGEudmFsdWUgPT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgaWYgKGRhdGEudmFsdWUpIHtcbiAgICAgICAgICAgICAgICBub2RlLnNldEF0dHJpYnV0ZShrZXksICcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBkYXRhLnRyYW5zZm9ybSgoMCwgZGF0YV9zb3VyY2Vfb3BlcmF0b3JzX2pzXzEuZHNVbmlxdWUpKCksIGNsZWFuVXApLmxpc3RlbigodikgPT4ge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB2ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIG5vZGUuc2V0QXR0cmlidXRlKGtleSwgdik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgdiA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgICAgICAgICAgaWYgKHYpIHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUoa2V5LCAnJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBub2RlLnJlbW92ZUF0dHJpYnV0ZShrZXkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0F0dHJpYnV0ZXMgb25seSBzdXBwb3J0IHR5cGVzIGJvb2xlYW4sIHN0cmluZywgbnVtYmVyIGFuZCBkYXRhIHNvdXJjZXMnKTtcbiAgICB9XG59XG5mdW5jdGlvbiBoYW5kbGVDbGFzcyhub2RlLCBkYXRhLCBjbGVhblVwKSB7XG4gICAgaWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xuICAgICAgICBub2RlLmNsYXNzTmFtZSA9IGRhdGE7XG4gICAgfVxuICAgIGVsc2UgaWYgKGRhdGEgaW5zdGFuY2VvZiBkYXRhX3NvdXJjZV9qc18xLkRhdGFTb3VyY2UgfHwgZGF0YSBpbnN0YW5jZW9mIGR1cGxleF9kYXRhX3NvdXJjZV9qc18xLkR1cGxleERhdGFTb3VyY2UpIHtcbiAgICAgICAgZGF0YS50cmFuc2Zvcm0oKDAsIGRhdGFfc291cmNlX29wZXJhdG9yc19qc18xLmRzVW5pcXVlKSgpLCBjbGVhblVwKVxuICAgICAgICAgICAgLndpdGhJbml0aWFsKGRhdGEudmFsdWUpXG4gICAgICAgICAgICAubGlzdGVuQW5kUmVwZWF0KCh2KSA9PiB7XG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2KSkge1xuICAgICAgICAgICAgICAgIG5vZGUuY2xhc3NOYW1lID0gdi5qb2luKCcgJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBub2RlLmNsYXNzTmFtZSA9IHY7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBkYXRhLnJlZHVjZSgocCwgYykgPT4ge1xuICAgICAgICAgICAgaWYgKCFjKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIGMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGAke3B9ICR7Y31gO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKGMudmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGAke3B9ICR7Yy52YWx1ZX1gO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCAnJyk7XG4gICAgICAgIG5vZGUuY2xhc3NOYW1lID0gdmFsdWU7XG4gICAgICAgIGZvciAoY29uc3QgaSBvZiBkYXRhKSB7XG4gICAgICAgICAgICBpZiAoaSBpbnN0YW5jZW9mIGRhdGFfc291cmNlX2pzXzEuRGF0YVNvdXJjZSkge1xuICAgICAgICAgICAgICAgIGkudHJhbnNmb3JtKCgwLCBkYXRhX3NvdXJjZV9vcGVyYXRvcnNfanNfMS5kc1VuaXF1ZSkoKSwgY2xlYW5VcCkubGlzdGVuKCh2KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gZGF0YS5yZWR1Y2UoKHAsIGMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgYyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYCR7cH0gJHtjfWA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYy52YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYCR7cH0gJHtjLnZhbHVlfWA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sICcnKTtcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5jbGFzc05hbWUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRvbV9hZGFwdGVyLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5FcnJvckJvdW5kYXJ5ID0gdm9pZCAwO1xuY29uc3QgYXVydW1fZWxlbWVudF9qc18xID0gcmVxdWlyZShcIi4uL3JlbmRlcmluZy9hdXJ1bV9lbGVtZW50LmpzXCIpO1xuY29uc3QgZGF0YV9zb3VyY2VfanNfMSA9IHJlcXVpcmUoXCIuLi9zdHJlYW0vZGF0YV9zb3VyY2UuanNcIik7XG5mdW5jdGlvbiBFcnJvckJvdW5kYXJ5KHByb3BzLCBjaGlsZHJlbiwgYXBpKSB7XG4gICAgY29uc3QgZGF0YSA9IG5ldyBkYXRhX3NvdXJjZV9qc18xLkRhdGFTb3VyY2UocHJvcHMgPT09IG51bGwgfHwgcHJvcHMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHByb3BzLnN1c3BlbnNlRmFsbGJhY2spO1xuICAgIGNvbnN0IHJlbmRlckZhbGxiYWNrRXJyb3IgPSB0eXBlb2YgKHByb3BzID09PSBudWxsIHx8IHByb3BzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBwcm9wcy5lcnJvckZhbGxiYWNrKSA9PT0gJ2Z1bmN0aW9uJyA/IHByb3BzLmVycm9yRmFsbGJhY2sgOiAoZXJyb3IpID0+IHByb3BzID09PSBudWxsIHx8IHByb3BzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBwcm9wcy5lcnJvckZhbGxiYWNrO1xuICAgIGNvbnN0IGxjID0gKDAsIGF1cnVtX2VsZW1lbnRfanNfMS5jcmVhdGVMaWZlQ3ljbGUpKCk7XG4gICAgYXBpLm9uRGV0YWNoKCgpID0+IGxjLm9uRGV0YWNoKCkpO1xuICAgIGZ1bmN0aW9uIG9uRG9uZShyZXMpIHtcbiAgICAgICAgaWYgKCFhcGkuY2FuY2VsbGF0aW9uVG9rZW4uaXNDYW5jZWxlZCkge1xuICAgICAgICAgICAgZGF0YS51cGRhdGUocmVzKTtcbiAgICAgICAgICAgIGxjLm9uQXR0YWNoKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gb25FcnJvcihlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgaWYgKCFhcGkuY2FuY2VsbGF0aW9uVG9rZW4uaXNDYW5jZWxlZCkge1xuICAgICAgICAgICAgZGF0YS51cGRhdGUocmVuZGVyRmFsbGJhY2tFcnJvcihlcnJvcikpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFzeW5jIGZ1bmN0aW9uIGhhbmRsZVJlbmRlcmVkQ2hpbGRyZW4ocmVzKSB7XG4gICAgICAgIGlmIChyZXMgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgICAgICByZXMudGhlbihoYW5kbGVSZW5kZXJlZENoaWxkcmVuLCBvbkVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IG5lc3RlZFJlbmRlcmVkID0gYXBpLnByZXJlbmRlcihyZXMsIGxjKTtcbiAgICAgICAgICAgIGlmIChuZXN0ZWRSZW5kZXJlZC5zb21lKChzKSA9PiBzIGluc3RhbmNlb2YgUHJvbWlzZSkpIHtcbiAgICAgICAgICAgICAgICBhd2FpdCBQcm9taXNlLmFsbChuZXN0ZWRSZW5kZXJlZCkudGhlbihoYW5kbGVSZW5kZXJlZENoaWxkcmVuLCBvbkVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIG9uRG9uZShuZXN0ZWRSZW5kZXJlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXN5bmMgZnVuY3Rpb24gcmVuZGVyQ2hpbGRyZW4oKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCByZW5kZXJlZCA9IGFwaS5wcmVyZW5kZXIoY2hpbGRyZW4sIGxjKTtcbiAgICAgICAgICAgIGF3YWl0IGhhbmRsZVJlbmRlcmVkQ2hpbGRyZW4ocmVuZGVyZWQpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgb25FcnJvcihlcnJvcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVuZGVyQ2hpbGRyZW4oKTtcbiAgICByZXR1cm4gZGF0YTtcbn1cbmV4cG9ydHMuRXJyb3JCb3VuZGFyeSA9IEVycm9yQm91bmRhcnk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1lcnJvcl9ib3VuZGFyeS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuRGVmYXVsdFJvdXRlID0gZXhwb3J0cy5Sb3V0ZSA9IGV4cG9ydHMuQXVydW1Sb3V0ZXIgPSB2b2lkIDA7XG5jb25zdCBhdXJ1bWpzX2pzXzEgPSByZXF1aXJlKFwiLi4vYXVydW1qcy5qc1wiKTtcbmNvbnN0IGRhdGFfc291cmNlX2pzXzEgPSByZXF1aXJlKFwiLi4vc3RyZWFtL2RhdGFfc291cmNlLmpzXCIpO1xuY29uc3QgZGF0YV9zb3VyY2Vfb3BlcmF0b3JzX2pzXzEgPSByZXF1aXJlKFwiLi4vc3RyZWFtL2RhdGFfc291cmNlX29wZXJhdG9ycy5qc1wiKTtcbmZ1bmN0aW9uIEF1cnVtUm91dGVyKHByb3BzLCBjaGlsZHJlbiwgYXBpKSB7XG4gICAgY29uc3QgcmVzb2x2ZWRDaGlsZHJlbiA9ICgwLCBhdXJ1bWpzX2pzXzEucmVzb2x2ZUNoaWxkcmVuKShjaGlsZHJlbiwgYXBpLmNhbmNlbGxhdGlvblRva2VuLCAoYykgPT4ge1xuICAgICAgICBpZiAoYy5mYWN0b3J5ICE9PSBSb3V0ZSAmJiBjLmZhY3RvcnkgIT09IERlZmF1bHRSb3V0ZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBdXJ1bSBSb3V0ZXIgb25seSBhY2NlcHRzIFJvdXRlIGFuZCBEZWZhdWx0Um91dGUgaW5zdGFuY2VzIGFzIGNoaWxkcmVuJyk7XG4gICAgICAgIH1cbiAgICB9KS5maWx0ZXIoQm9vbGVhbik7XG4gICAgcmVzb2x2ZWRDaGlsZHJlblxuICAgICAgICAucmVkdWNlKChhY2MsIGMpID0+IHtcbiAgICAgICAgaWYgKGMuZmFjdG9yeSA9PT0gRGVmYXVsdFJvdXRlKSB7XG4gICAgICAgICAgICByZXR1cm4gYWNjICsgMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgIH1cbiAgICB9LCAwLCBhcGkuY2FuY2VsbGF0aW9uVG9rZW4pXG4gICAgICAgIC5saXN0ZW5BbmRSZXBlYXQoKGNvdW50KSA9PiB7XG4gICAgICAgIGlmIChjb3VudCA+IDEpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVG9vIG1hbnkgZGVmYXVsdCByb3V0ZXMgb25seSAwIG9yIDEgYWxsb3dlZC4gRm91bmQgJHtjb3VudH1gKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGNvbnN0IHVybERhdGFTb3VyY2UgPSBuZXcgZGF0YV9zb3VyY2VfanNfMS5EYXRhU291cmNlKCk7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICgwLCBhdXJ1bWpzX2pzXzEudXJsSGFzaEVtaXR0ZXIpKHVybERhdGFTb3VyY2UsIHRydWUsIGFwaS5jYW5jZWxsYXRpb25Ub2tlbik7XG4gICAgfVxuICAgIGNvbnN0IGFjdGl2ZVJvdXRlID0gbmV3IGRhdGFfc291cmNlX2pzXzEuRGF0YVNvdXJjZSgpO1xuICAgIGFjdGl2ZVJvdXRlLnRyYW5zZm9ybSgoMCwgZGF0YV9zb3VyY2Vfb3BlcmF0b3JzX2pzXzEuZHNVbmlxdWUpKCksICgwLCBkYXRhX3NvdXJjZV9vcGVyYXRvcnNfanNfMS5kc0RpZmYpKCksICgwLCBkYXRhX3NvdXJjZV9vcGVyYXRvcnNfanNfMS5kc1RhcCkoKHsgbmV3VmFsdWUsIG9sZFZhbHVlIH0pID0+IHtcbiAgICAgICAgdmFyIF9hLCBfYiwgX2MsIF9kO1xuICAgICAgICBpZiAob2xkVmFsdWUpIHtcbiAgICAgICAgICAgIChfYiA9IChfYSA9IG9sZFZhbHVlLnByb3BzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Eub25OYXZpZ2F0ZUZyb20pID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5jYWxsKF9hKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmV3VmFsdWUpIHtcbiAgICAgICAgICAgIChfZCA9IChfYyA9IG5ld1ZhbHVlLnByb3BzKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Mub25OYXZpZ2F0ZVRvKSA9PT0gbnVsbCB8fCBfZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2QuY2FsbChfYyk7XG4gICAgICAgIH1cbiAgICB9KSk7XG4gICAgcmV0dXJuIHVybERhdGFTb3VyY2VcbiAgICAgICAgLnRyYW5zZm9ybSgoMCwgZGF0YV9zb3VyY2Vfb3BlcmF0b3JzX2pzXzEuZHNVbmlxdWUpKCksIGFwaS5jYW5jZWxsYXRpb25Ub2tlbilcbiAgICAgICAgLndpdGhJbml0aWFsKHVybERhdGFTb3VyY2UudmFsdWUpXG4gICAgICAgIC50cmFuc2Zvcm0oKDAsIGRhdGFfc291cmNlX29wZXJhdG9yc19qc18xLmRzTWFwKSgocCkgPT4gc2VsZWN0Um91dGUocCwgcmVzb2x2ZWRDaGlsZHJlbiwgYWN0aXZlUm91dGUpKSk7XG59XG5leHBvcnRzLkF1cnVtUm91dGVyID0gQXVydW1Sb3V0ZXI7XG5mdW5jdGlvbiBzZWxlY3RSb3V0ZSh1cmwsIHJvdXRlcywgYWN0aXZlUm91dGUpIHtcbiAgICBsZXQgc2VsZWN0ZWQ7XG4gICAgaWYgKHVybCA9PT0gdW5kZWZpbmVkIHx8IHVybCA9PT0gbnVsbCkge1xuICAgICAgICBzZWxlY3RlZCA9IHJvdXRlcy5maW5kKChyKSA9PiByLmZhY3RvcnkgPT09IERlZmF1bHRSb3V0ZSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBpZiAocm91dGVzLmZpbmQoKHIpID0+IHsgdmFyIF9hOyByZXR1cm4gKChfYSA9IHIucHJvcHMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5ocmVmKSA9PT0gdXJsOyB9KSkge1xuICAgICAgICAgICAgc2VsZWN0ZWQgPSByb3V0ZXMuZmluZCgocikgPT4geyB2YXIgX2E7IHJldHVybiAoKF9hID0gci5wcm9wcykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmhyZWYpID09PSB1cmw7IH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc3Qgc2VnbWVudHMgPSB1cmwuc3BsaXQoJy8nKTtcbiAgICAgICAgICAgIHNlZ21lbnRzLnBvcCgpO1xuICAgICAgICAgICAgd2hpbGUgKHNlZ21lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBhdGggPSBzZWdtZW50cy5qb2luKCcvJyk7XG4gICAgICAgICAgICAgICAgaWYgKHJvdXRlcy5maW5kKChyKSA9PiB7IHZhciBfYTsgcmV0dXJuICgoX2EgPSByLnByb3BzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuaHJlZikgPT09IHBhdGg7IH0pKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkID0gcm91dGVzLmZpbmQoKHIpID0+IHsgdmFyIF9hOyByZXR1cm4gKChfYSA9IHIucHJvcHMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5ocmVmKSA9PT0gcGF0aDsgfSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzZWdtZW50cy5wb3AoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZCA9IHJvdXRlcy5maW5kKChyKSA9PiByLmZhY3RvcnkgPT09IERlZmF1bHRSb3V0ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKHNlbGVjdGVkKSB7XG4gICAgICAgIGFjdGl2ZVJvdXRlLnVwZGF0ZShzZWxlY3RlZCk7XG4gICAgICAgIHJldHVybiBzZWxlY3RlZC5jaGlsZHJlbjtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGFjdGl2ZVJvdXRlLnVwZGF0ZSh1bmRlZmluZWQpO1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbn1cbmZ1bmN0aW9uIFJvdXRlKHByb3BzLCBjaGlsZHJlbikge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG59XG5leHBvcnRzLlJvdXRlID0gUm91dGU7XG5mdW5jdGlvbiBEZWZhdWx0Um91dGUocHJvcHMsIGNoaWxkcmVuKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cbmV4cG9ydHMuRGVmYXVsdFJvdXRlID0gRGVmYXVsdFJvdXRlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cm91dGVyLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5TdXNwZW5zZSA9IHZvaWQgMDtcbmNvbnN0IGF1cnVtanNfanNfMSA9IHJlcXVpcmUoXCIuLi9hdXJ1bWpzLmpzXCIpO1xuZnVuY3Rpb24gU3VzcGVuc2UocHJvcHMsIGNoaWxkcmVuLCBhcGkpIHtcbiAgICByZXR1cm4gKGF1cnVtanNfanNfMS5BdXJ1bS5mYWN0b3J5KGF1cnVtanNfanNfMS5FcnJvckJvdW5kYXJ5LCB7IHN1c3BlbnNlRmFsbGJhY2s6IHByb3BzID09PSBudWxsIHx8IHByb3BzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBwcm9wcy5mYWxsYmFjaywgZXJyb3JGYWxsYmFjazogKGVycm9yKSA9PiB7XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfSB9LCBjaGlsZHJlbikpO1xufVxuZXhwb3J0cy5TdXNwZW5zZSA9IFN1c3BlbnNlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c3VzcGVuc2UuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkRlZmF1bHRTd2l0Y2hDYXNlID0gZXhwb3J0cy5Td2l0Y2hDYXNlID0gZXhwb3J0cy5Td2l0Y2ggPSB2b2lkIDA7XG5jb25zdCBhdXJ1bV9lbGVtZW50X2pzXzEgPSByZXF1aXJlKFwiLi4vcmVuZGVyaW5nL2F1cnVtX2VsZW1lbnQuanNcIik7XG5jb25zdCBkYXRhX3NvdXJjZV9vcGVyYXRvcnNfanNfMSA9IHJlcXVpcmUoXCIuLi9zdHJlYW0vZGF0YV9zb3VyY2Vfb3BlcmF0b3JzLmpzXCIpO1xuY29uc3QgY2FuY2VsbGF0aW9uX3Rva2VuX2pzXzEgPSByZXF1aXJlKFwiLi4vdXRpbGl0aWVzL2NhbmNlbGxhdGlvbl90b2tlbi5qc1wiKTtcbmZ1bmN0aW9uIFN3aXRjaChwcm9wcywgY2hpbGRyZW4sIGFwaSkge1xuICAgIGNoaWxkcmVuID0gW10uY29uY2F0LmFwcGx5KFtdLCBjaGlsZHJlbi5maWx0ZXIoKGMpID0+ICEhYykpO1xuICAgIGlmIChjaGlsZHJlbi5zb21lKChjKSA9PiAhY1thdXJ1bV9lbGVtZW50X2pzXzEuYXVydW1FbGVtZW50TW9kZWxJZGVudGl0aXldIHx8XG4gICAgICAgICEoYy5mYWN0b3J5ID09PSBTd2l0Y2hDYXNlIHx8IGMuZmFjdG9yeSA9PT0gRGVmYXVsdFN3aXRjaENhc2UpKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1N3aXRjaCBvbmx5IGFjY2VwdHMgU3dpdGNoQ2FzZSBhcyBjaGlsZHJlbicpO1xuICAgIH1cbiAgICBpZiAoY2hpbGRyZW4uZmlsdGVyKChjKSA9PiBjLmZhY3RvcnkgPT09IERlZmF1bHRTd2l0Y2hDYXNlKS5sZW5ndGggPiAxKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVG9vIG1hbnkgZGVmYXVsdCBzd2l0Y2ggY2FzZXMgb25seSAwIG9yIDEgYWxsb3dlZCcpO1xuICAgIH1cbiAgICBjb25zdCBjbGVhblVwID0gbmV3IGNhbmNlbGxhdGlvbl90b2tlbl9qc18xLkNhbmNlbGxhdGlvblRva2VuKCk7XG4gICAgYXBpLm9uRGV0YWNoKCgpID0+IHtcbiAgICAgICAgY2xlYW5VcC5jYW5jZWwoKTtcbiAgICB9KTtcbiAgICBjb25zdCB1ID0gcHJvcHMuc3RhdGUudHJhbnNmb3JtKCgwLCBkYXRhX3NvdXJjZV9vcGVyYXRvcnNfanNfMS5kc1VuaXF1ZSkoKSwgY2xlYW5VcCk7XG4gICAgcmV0dXJuIHUud2l0aEluaXRpYWwocHJvcHMuc3RhdGUudmFsdWUpLnRyYW5zZm9ybSgoMCwgZGF0YV9zb3VyY2Vfb3BlcmF0b3JzX2pzXzEuZHNNYXApKChzdGF0ZSkgPT4gc2VsZWN0Q2FzZShzdGF0ZSwgY2hpbGRyZW4pKSk7XG59XG5leHBvcnRzLlN3aXRjaCA9IFN3aXRjaDtcbmZ1bmN0aW9uIHNlbGVjdENhc2Uoc3RhdGUsIGNoaWxkcmVuKSB7XG4gICAgdmFyIF9hLCBfYiwgX2M7XG4gICAgcmV0dXJuIChfYiA9IChfYSA9IGNoaWxkcmVuLmZpbmQoKGMpID0+IHsgdmFyIF9hOyByZXR1cm4gKChfYSA9IGMucHJvcHMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS53aGVuKSA9PT0gc3RhdGU7IH0pKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY2hpbGRyZW4pICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6IChfYyA9IGNoaWxkcmVuLmZpbmQoKHApID0+IHAuZmFjdG9yeSA9PT0gRGVmYXVsdFN3aXRjaENhc2UpKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MuY2hpbGRyZW47XG59XG5mdW5jdGlvbiBTd2l0Y2hDYXNlKHByb3BzLCBjaGlsZHJlbikge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG59XG5leHBvcnRzLlN3aXRjaENhc2UgPSBTd2l0Y2hDYXNlO1xuZnVuY3Rpb24gRGVmYXVsdFN3aXRjaENhc2UocHJvcHMsIGNoaWxkcmVuKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cbmV4cG9ydHMuRGVmYXVsdFN3aXRjaENhc2UgPSBEZWZhdWx0U3dpdGNoQ2FzZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXN3aXRjaC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZGVidWdSZWdpc3RlckNvbnN1bWVyID0gZXhwb3J0cy5kZWJ1Z0RlY2xhcmVVcGRhdGUgPSBleHBvcnRzLmRlYnVnUmVnaXN0ZXJVbmxpbmsgPSBleHBvcnRzLmRlYnVnUmVnaXN0ZXJMaW5rID0gZXhwb3J0cy5kZWJ1Z1JlZ2lzdGVyU3RyZWFtID0gZXhwb3J0cy5lbmFibGVEZWJ1Z01vZGUgPSBleHBvcnRzLmVuYWJsZURpYWdub3N0aWNNb2RlID0gZXhwb3J0cy5kaWFnbm9zdGljTW9kZSA9IGV4cG9ydHMuZGVidWdNb2RlID0gdm9pZCAwO1xuY29uc3QgZXZlbnRfZW1pdHRlcl9qc18xID0gcmVxdWlyZShcIi4vdXRpbGl0aWVzL2V2ZW50X2VtaXR0ZXIuanNcIik7XG5leHBvcnRzLmRlYnVnTW9kZSA9IGZhbHNlO1xuZXhwb3J0cy5kaWFnbm9zdGljTW9kZSA9IGZhbHNlO1xuY29uc3QgY3VzdG9tV2luZG93ID0gZ2xvYmFsVGhpcztcbmxldCBkZWJ1Z1N0cmVhbURhdGE7XG5mdW5jdGlvbiBlbmFibGVEaWFnbm9zdGljTW9kZSgpIHtcbiAgICBleHBvcnRzLmRpYWdub3N0aWNNb2RlID0gdHJ1ZTtcbn1cbmV4cG9ydHMuZW5hYmxlRGlhZ25vc3RpY01vZGUgPSBlbmFibGVEaWFnbm9zdGljTW9kZTtcbi8qKlxuICogSW5pdGlhbGl6ZXMgdGhlIGRlYnVnIGZlYXR1cmVzIG9mIGF1cnVtLiBSZXF1aXJlZCBmb3IgdGhlIHVzZSBvZiBhdXJ1bSBkZXZ0b29sc1xuICogUnVuIHRoaXMgZnVuY3Rpb24gYmVmb3JlIGNyZWF0aW5nIGFueSBzdHJlYW1zIG9yIGFueSBhdXJ1bSBjb21wb25lbnRzIGZvciBiZXN0IHJlc3VsdHNcbiAqIEVuYWJsaW5nIHRoaXMgaGFybXMgcGVyZm9ybWFuY2UgYW5kIGJyZWFrcyBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eSB3aXRoIHNvbWUgYnJvd3NlcnNcbiAqIERvIG5vdCBlbmFibGUgaW4gcHJvZHVjdGlvblxuICovXG5mdW5jdGlvbiBlbmFibGVEZWJ1Z01vZGUoKSB7XG4gICAgZGVidWdTdHJlYW1EYXRhID0gW107XG4gICAgZXhwb3J0cy5kZWJ1Z01vZGUgPSB0cnVlO1xuICAgIHNldEludGVydmFsKCgpID0+IGdhcmJhZ2VDb2xsZWN0KCksIDYwMDAwKTtcbiAgICBjdXN0b21XaW5kb3cuX19kZWJ1Z1VwZGF0ZXMgPSBuZXcgZXZlbnRfZW1pdHRlcl9qc18xLkV2ZW50RW1pdHRlcigpO1xuICAgIGN1c3RvbVdpbmRvdy5fX2RlYnVnTmV3U291cmNlID0gbmV3IGV2ZW50X2VtaXR0ZXJfanNfMS5FdmVudEVtaXR0ZXIoKTtcbiAgICBjdXN0b21XaW5kb3cuX19kZWJ1Z0xpbmtlZCA9IG5ldyBldmVudF9lbWl0dGVyX2pzXzEuRXZlbnRFbWl0dGVyKCk7XG4gICAgY3VzdG9tV2luZG93Ll9fZGVidWdVbmxpbmtlZCA9IG5ldyBldmVudF9lbWl0dGVyX2pzXzEuRXZlbnRFbWl0dGVyKCk7XG4gICAgY3VzdG9tV2luZG93Ll9fZGVidWdHZXRTdHJlYW1EYXRhID0gKCkgPT4gZGVidWdTdHJlYW1EYXRhLm1hcChzZXJpYWxpemVTdHJlYW1EYXRhKTtcbn1cbmV4cG9ydHMuZW5hYmxlRGVidWdNb2RlID0gZW5hYmxlRGVidWdNb2RlO1xuZnVuY3Rpb24gc2VyaWFsaXplU3RyZWFtRGF0YShyZWYpIHtcbiAgICBsZXQgc2VyaWFsaXplZFZhbHVlO1xuICAgIHRyeSB7XG4gICAgICAgIHNlcmlhbGl6ZWRWYWx1ZSA9IEpTT04uc3RyaW5naWZ5KHJlZi52YWx1ZSk7XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICAgIHNlcmlhbGl6ZWRWYWx1ZSA9ICdbVW5zZXJpYWxpemFibGVdJztcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZTogcmVmLm5hbWUsXG4gICAgICAgIHZhbHVlOiBzZXJpYWxpemVkVmFsdWUsXG4gICAgICAgIGNoaWxkcmVuOiByZWYuY2hpbGRyZW4sXG4gICAgICAgIGNvbnN1bWVyczogcmVmLmNvbnN1bWVycyxcbiAgICAgICAgaWQ6IHJlZi5pZCxcbiAgICAgICAgcGFyZW50czogcmVmLnBhcmVudHMsXG4gICAgICAgIHN0YWNrOiByZWYuc3RhY2ssXG4gICAgICAgIHRpbWVzdGFtcDogcmVmLnRpbWVzdGFtcFxuICAgIH07XG59XG5mdW5jdGlvbiBkZWJ1Z1JlZ2lzdGVyU3RyZWFtKHN0cmVhbSwgc3RhY2spIHtcbiAgICBjb25zdCByZWYgPSB7XG4gICAgICAgIG5hbWU6IHN0cmVhbS5uYW1lLFxuICAgICAgICB2YWx1ZTogc3RyZWFtLnZhbHVlLFxuICAgICAgICBpZDogTWF0aC5yYW5kb20oKSxcbiAgICAgICAgY2hpbGRyZW46IFtdLFxuICAgICAgICBwYXJlbnRzOiBbXSxcbiAgICAgICAgc3RhY2ssXG4gICAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKSxcbiAgICAgICAgcmVmZXJlbmNlOiBuZXcgV2Vha1JlZihzdHJlYW0pLFxuICAgICAgICBjb25zdW1lcnM6IFtdXG4gICAgfTtcbiAgICBkZWJ1Z1N0cmVhbURhdGEucHVzaChyZWYpO1xuICAgIGN1c3RvbVdpbmRvdy5fX2RlYnVnTmV3U291cmNlLmZpcmUoe1xuICAgICAgICBzb3VyY2U6IHNlcmlhbGl6ZVN0cmVhbURhdGEocmVmKVxuICAgIH0pO1xufVxuZXhwb3J0cy5kZWJ1Z1JlZ2lzdGVyU3RyZWFtID0gZGVidWdSZWdpc3RlclN0cmVhbTtcbmZ1bmN0aW9uIGRlYnVnUmVnaXN0ZXJMaW5rKHBhcmVudCwgY2hpbGQpIHtcbiAgICBsZXQgcHJlZiA9IGZpbmREYXRhQnlSZWYocGFyZW50KTtcbiAgICBsZXQgY3JlZiA9IGZpbmREYXRhQnlSZWYoY2hpbGQpO1xuICAgIGlmICghcHJlZikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2lsbGVnYWwgc3RhdGUnKTtcbiAgICB9XG4gICAgaWYgKCFjcmVmKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignaWxsZWdhbCBzdGF0ZScpO1xuICAgIH1cbiAgICBwcmVmLmNoaWxkcmVuLnB1c2goY3JlZi5pZCk7XG4gICAgY3JlZi5wYXJlbnRzLnB1c2gocHJlZi5pZCk7XG4gICAgY3VzdG9tV2luZG93Ll9fZGVidWdMaW5rZWQuZmlyZSh7XG4gICAgICAgIGNoaWxkOiBzZXJpYWxpemVTdHJlYW1EYXRhKGNyZWYpLFxuICAgICAgICBwYXJlbnQ6IHNlcmlhbGl6ZVN0cmVhbURhdGEocHJlZilcbiAgICB9KTtcbn1cbmV4cG9ydHMuZGVidWdSZWdpc3RlckxpbmsgPSBkZWJ1Z1JlZ2lzdGVyTGluaztcbmZ1bmN0aW9uIGRlYnVnUmVnaXN0ZXJVbmxpbmsocGFyZW50LCBjaGlsZCkge1xuICAgIGxldCBwcmVmID0gZmluZERhdGFCeVJlZihwYXJlbnQpO1xuICAgIGxldCBjcmVmID0gZmluZERhdGFCeVJlZihjaGlsZCk7XG4gICAgaWYgKCFwcmVmKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignaWxsZWdhbCBzdGF0ZScpO1xuICAgIH1cbiAgICBpZiAoIWNyZWYpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbGxlZ2FsIHN0YXRlJyk7XG4gICAgfVxuICAgIGNvbnN0IGNpbmRleCA9IHByZWYuY2hpbGRyZW4uaW5kZXhPZihjcmVmLmlkKTtcbiAgICBpZiAoY2luZGV4ID09PSAtMSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2lsbGVnYWwgc3RhdGUnKTtcbiAgICB9XG4gICAgcHJlZi5jaGlsZHJlbi5zcGxpY2UoY2luZGV4LCAxKTtcbiAgICBjb25zdCBwaW5kZXggPSBjcmVmLnBhcmVudHMuaW5kZXhPZihwcmVmLmlkKTtcbiAgICBpZiAocGluZGV4ID09PSAtMSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2lsbGVnYWwgc3RhdGUnKTtcbiAgICB9XG4gICAgY3JlZi5wYXJlbnRzLnNwbGljZShjaW5kZXgsIDEpO1xuICAgIGN1c3RvbVdpbmRvdy5fX2RlYnVnVW5saW5rZWQuZmlyZSh7XG4gICAgICAgIGNoaWxkOiBzZXJpYWxpemVTdHJlYW1EYXRhKGNyZWYpLFxuICAgICAgICBwYXJlbnQ6IHNlcmlhbGl6ZVN0cmVhbURhdGEocHJlZilcbiAgICB9KTtcbn1cbmV4cG9ydHMuZGVidWdSZWdpc3RlclVubGluayA9IGRlYnVnUmVnaXN0ZXJVbmxpbms7XG5mdW5jdGlvbiBkZWJ1Z0RlY2xhcmVVcGRhdGUoc291cmNlLCB2YWx1ZSwgc3RhY2spIHtcbiAgICBsZXQgcmVmID0gZmluZERhdGFCeVJlZihzb3VyY2UpO1xuICAgIGlmICghcmVmKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignaWxsZWdhbCBzdGF0ZScpO1xuICAgIH1cbiAgICByZWYudmFsdWUgPSBzb3VyY2UudmFsdWU7XG4gICAgY3VzdG9tV2luZG93Ll9fZGVidWdVcGRhdGVzLmZpcmUoe1xuICAgICAgICBuZXdWYWx1ZTogdmFsdWUsXG4gICAgICAgIHNvdXJjZTogc2VyaWFsaXplU3RyZWFtRGF0YShyZWYpLFxuICAgICAgICBzdGFja1xuICAgIH0pO1xufVxuZXhwb3J0cy5kZWJ1Z0RlY2xhcmVVcGRhdGUgPSBkZWJ1Z0RlY2xhcmVVcGRhdGU7XG5mdW5jdGlvbiBkZWJ1Z1JlZ2lzdGVyQ29uc3VtZXIoc3RyZWFtLCBjb25zdW1lciwgY29uc3VtZXJTdGFjaykge1xuICAgIGxldCByZWYgPSBmaW5kRGF0YUJ5UmVmKHN0cmVhbSk7XG4gICAgaWYgKCFyZWYpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbGxlZ2FsIHN0YXRlJyk7XG4gICAgfVxuICAgIHJlZi5jb25zdW1lcnMucHVzaCh7XG4gICAgICAgIGNvZGU6IGNvbnN1bWVyLFxuICAgICAgICBzdGFjazogY29uc3VtZXJTdGFja1xuICAgIH0pO1xufVxuZXhwb3J0cy5kZWJ1Z1JlZ2lzdGVyQ29uc3VtZXIgPSBkZWJ1Z1JlZ2lzdGVyQ29uc3VtZXI7XG5mdW5jdGlvbiBnYXJiYWdlQ29sbGVjdCgpIHtcbiAgICBkZWJ1Z1N0cmVhbURhdGEgPSBkZWJ1Z1N0cmVhbURhdGEuZmlsdGVyKChkc2QpID0+IGRzZC5yZWZlcmVuY2UuZGVyZWYoKSAhPT0gdW5kZWZpbmVkKTtcbn1cbmZ1bmN0aW9uIGZpbmREYXRhQnlSZWYodGFyZ2V0KSB7XG4gICAgcmV0dXJuIGRlYnVnU3RyZWFtRGF0YS5maW5kKChkc2QpID0+IGRzZC5yZWZlcmVuY2UuZGVyZWYoKSA9PT0gdGFyZ2V0KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRlYnVnX21vZGUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLklucHV0ID0gdm9pZCAwO1xuY29uc3QgZG9tX2FkYXB0ZXJfanNfMSA9IHJlcXVpcmUoXCIuLi9idWlsdGluX2NvbXBvbmVudHMvZG9tX2FkYXB0ZXIuanNcIik7XG5jb25zdCBkYXRhX3NvdXJjZV9qc18xID0gcmVxdWlyZShcIi4uL3N0cmVhbS9kYXRhX3NvdXJjZS5qc1wiKTtcbmNvbnN0IGR1cGxleF9kYXRhX3NvdXJjZV9qc18xID0gcmVxdWlyZShcIi4uL3N0cmVhbS9kdXBsZXhfZGF0YV9zb3VyY2UuanNcIik7XG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5jb25zdCBpbnB1dEV2ZW50cyA9IHsgaW5wdXQ6ICdvbklucHV0JywgY2hhbmdlOiAnb25DaGFuZ2UnIH07XG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5jb25zdCBpbnB1dFByb3BzID0gW1xuICAgICdwbGFjZWhvbGRlcicsXG4gICAgJ3JlYWRvbmx5JyxcbiAgICAnZGlzYWJsZWQnLFxuICAgICdhY2NlcHQnLFxuICAgICdhbHQnLFxuICAgICdhdXRvY29tcGxldGUnLFxuICAgICdhdXRvZm9jdXMnLFxuICAgICdjaGVja2VkJyxcbiAgICAnZGVmYXVsdENoZWNrZWQnLFxuICAgICdmb3JtQWN0aW9uJyxcbiAgICAnZm9ybUVuY3R5cGUnLFxuICAgICdmb3JtTWV0aG9kJyxcbiAgICAnZm9ybU5vVmFsaWRhdGUnLFxuICAgICdmb3JtVGFyZ2V0JyxcbiAgICAnbWF4JyxcbiAgICAnbWF4TGVuZ3RoJyxcbiAgICAnbWluJyxcbiAgICAnbWluTGVuZ3RoJyxcbiAgICAncGF0dGVybicsXG4gICAgJ211bHRpcGxlJyxcbiAgICAncmVxdWlyZWQnLFxuICAgICd0eXBlJyxcbiAgICAnc3RlcCcsXG4gICAgJ2xpc3QnXG5dO1xuLyoqXG4gKiBAaW50ZXJuYWxcbiAqL1xuZXhwb3J0cy5JbnB1dCA9ICgwLCBkb21fYWRhcHRlcl9qc18xLkRvbU5vZGVDcmVhdG9yKSgnaW5wdXQnLCBpbnB1dFByb3BzLCBpbnB1dEV2ZW50cywgKG5vZGUsIHByb3BzLCBjbGVhblVwKSA9PiB7XG4gICAgY29uc3QgaW5wdXQgPSBub2RlO1xuICAgIGlmIChwcm9wcy52YWx1ZSkge1xuICAgICAgICBpZiAocHJvcHMudmFsdWUgaW5zdGFuY2VvZiBkYXRhX3NvdXJjZV9qc18xLkRhdGFTb3VyY2UpIHtcbiAgICAgICAgICAgIHByb3BzLnZhbHVlLmxpc3RlbkFuZFJlcGVhdCgodikgPT4ge1xuICAgICAgICAgICAgICAgIGlucHV0LnZhbHVlID0gdiAhPT0gbnVsbCAmJiB2ICE9PSB2b2lkIDAgPyB2IDogJyc7XG4gICAgICAgICAgICB9LCBjbGVhblVwKTtcbiAgICAgICAgICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHByb3BzLnZhbHVlLnVwZGF0ZShpbnB1dC52YWx1ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChwcm9wcy52YWx1ZSBpbnN0YW5jZW9mIGR1cGxleF9kYXRhX3NvdXJjZV9qc18xLkR1cGxleERhdGFTb3VyY2UpIHtcbiAgICAgICAgICAgIHByb3BzLnZhbHVlLmxpc3RlbkFuZFJlcGVhdCgodikgPT4ge1xuICAgICAgICAgICAgICAgIGlucHV0LnZhbHVlID0gdiAhPT0gbnVsbCAmJiB2ICE9PSB2b2lkIDAgPyB2IDogJyc7XG4gICAgICAgICAgICB9LCBjbGVhblVwKTtcbiAgICAgICAgICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHByb3BzLnZhbHVlLnVwZGF0ZVVwc3RyZWFtKGlucHV0LnZhbHVlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaW5wdXQudmFsdWUgPSBwcm9wcy52YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAocHJvcHMuY2hlY2tlZCkge1xuICAgICAgICBpZiAocHJvcHMuY2hlY2tlZCBpbnN0YW5jZW9mIGRhdGFfc291cmNlX2pzXzEuRGF0YVNvdXJjZSkge1xuICAgICAgICAgICAgcHJvcHMuY2hlY2tlZC5saXN0ZW5BbmRSZXBlYXQoKHYpID0+IHtcbiAgICAgICAgICAgICAgICBpbnB1dC5jaGVja2VkID0gdiAhPT0gbnVsbCAmJiB2ICE9PSB2b2lkIDAgPyB2IDogZmFsc2U7XG4gICAgICAgICAgICB9LCBjbGVhblVwKTtcbiAgICAgICAgICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICAgICAgICAgICAgICBwcm9wcy5jaGVja2VkLnVwZGF0ZShpbnB1dC5jaGVja2VkKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHByb3BzLmNoZWNrZWQgaW5zdGFuY2VvZiBkdXBsZXhfZGF0YV9zb3VyY2VfanNfMS5EdXBsZXhEYXRhU291cmNlKSB7XG4gICAgICAgICAgICBwcm9wcy5jaGVja2VkLmxpc3RlbkFuZFJlcGVhdCgodikgPT4ge1xuICAgICAgICAgICAgICAgIGlucHV0LmNoZWNrZWQgPSB2ICE9PSBudWxsICYmIHYgIT09IHZvaWQgMCA/IHYgOiBmYWxzZTtcbiAgICAgICAgICAgIH0sIGNsZWFuVXApO1xuICAgICAgICAgICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHByb3BzLmNoZWNrZWQudXBkYXRlVXBzdHJlYW0oaW5wdXQuY2hlY2tlZCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlucHV0LmNoZWNrZWQgPSBwcm9wcy5jaGVja2VkO1xuICAgICAgICB9XG4gICAgfVxufSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbnB1dC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuU2VsZWN0ID0gdm9pZCAwO1xuY29uc3QgZGF0YV9zb3VyY2VfanNfMSA9IHJlcXVpcmUoXCIuLi9zdHJlYW0vZGF0YV9zb3VyY2UuanNcIik7XG5jb25zdCBkdXBsZXhfZGF0YV9zb3VyY2VfanNfMSA9IHJlcXVpcmUoXCIuLi9zdHJlYW0vZHVwbGV4X2RhdGFfc291cmNlLmpzXCIpO1xuY29uc3QgZG9tX2FkYXB0ZXJfanNfMSA9IHJlcXVpcmUoXCIuLi9idWlsdGluX2NvbXBvbmVudHMvZG9tX2FkYXB0ZXIuanNcIik7XG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5jb25zdCBzZWxlY3RFdmVudHMgPSB7IGNoYW5nZTogJ29uQ2hhbmdlJyB9O1xuLyoqXG4gKiBAaW50ZXJuYWxcbiAqL1xuZXhwb3J0cy5TZWxlY3QgPSAoMCwgZG9tX2FkYXB0ZXJfanNfMS5Eb21Ob2RlQ3JlYXRvcikoJ3NlbGVjdCcsIHVuZGVmaW5lZCwgc2VsZWN0RXZlbnRzLCAobm9kZSwgcHJvcHMsIGNsZWFuVXApID0+IHtcbiAgICBjb25zdCBzZWxlY3QgPSBub2RlO1xuICAgIGlmICgocHJvcHMgPT09IG51bGwgfHwgcHJvcHMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHByb3BzLnZhbHVlKSB8fCAocHJvcHMgPT09IG51bGwgfHwgcHJvcHMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHByb3BzLnNlbGVjdGVkSW5kZXgpKSB7XG4gICAgICAgIC8vIEluIGNhc2UgcHJvcHMudmFsdWUgaXMgYSBkYXRhIHNvdXJjZSB3ZSBuZWVkIHRvIHJlYXBwbHkgdGhlIHZhbHVlIHdoZW4gdGhlIGNoaWxkcmVuIGNoYW5nZSBiZWNhdXNlIHRoZSBjaGlsZHJlbiBtYXkgYmUgdW5zdGFibGUvYmUgcmVtb3ZlZCBhbmQgcmUtYWRkZWQgd2hpY2ggd291bGQgZmFsc2lmeSB0aGUgc3RhdGUuXG4gICAgICAgIGlmIChwcm9wcy52YWx1ZSBpbnN0YW5jZW9mIGRhdGFfc291cmNlX2pzXzEuRGF0YVNvdXJjZSB8fCBwcm9wcy52YWx1ZSBpbnN0YW5jZW9mIGR1cGxleF9kYXRhX3NvdXJjZV9qc18xLkR1cGxleERhdGFTb3VyY2UpIHtcbiAgICAgICAgICAgIGNvbnN0IG1vID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHNlbGVjdC52YWx1ZSA9IHByb3BzLnZhbHVlLnZhbHVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBtby5vYnNlcnZlKHNlbGVjdCwge1xuICAgICAgICAgICAgICAgIGNoaWxkTGlzdDogdHJ1ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjbGVhblVwLmFkZENhbmNlbGFibGUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIG1vLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wcy5zZWxlY3RlZEluZGV4IGluc3RhbmNlb2YgZGF0YV9zb3VyY2VfanNfMS5EYXRhU291cmNlIHx8IHByb3BzLnNlbGVjdGVkSW5kZXggaW5zdGFuY2VvZiBkdXBsZXhfZGF0YV9zb3VyY2VfanNfMS5EdXBsZXhEYXRhU291cmNlKSB7XG4gICAgICAgICAgICBjb25zdCBtbyA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHtcbiAgICAgICAgICAgICAgICBzZWxlY3Quc2VsZWN0ZWRJbmRleCA9IHByb3BzLnNlbGVjdGVkSW5kZXgudmFsdWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG1vLm9ic2VydmUoc2VsZWN0LCB7XG4gICAgICAgICAgICAgICAgY2hpbGRMaXN0OiB0cnVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNsZWFuVXAuYWRkQ2FuY2VsYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgbW8uZGlzY29ubmVjdCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BzLnZhbHVlIGluc3RhbmNlb2YgZGF0YV9zb3VyY2VfanNfMS5EYXRhU291cmNlKSB7XG4gICAgICAgICAgICBwcm9wcy52YWx1ZS5saXN0ZW5BbmRSZXBlYXQoKHYpID0+IHtcbiAgICAgICAgICAgICAgICBzZWxlY3QudmFsdWUgPSB2O1xuICAgICAgICAgICAgfSwgY2xlYW5VcCk7XG4gICAgICAgICAgICBzZWxlY3QuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHByb3BzLnZhbHVlLnVwZGF0ZShzZWxlY3QudmFsdWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocHJvcHMudmFsdWUgaW5zdGFuY2VvZiBkdXBsZXhfZGF0YV9zb3VyY2VfanNfMS5EdXBsZXhEYXRhU291cmNlKSB7XG4gICAgICAgICAgICBwcm9wcy52YWx1ZS5saXN0ZW5BbmRSZXBlYXQoKHYpID0+IHtcbiAgICAgICAgICAgICAgICBzZWxlY3QudmFsdWUgPSB2O1xuICAgICAgICAgICAgfSwgY2xlYW5VcCk7XG4gICAgICAgICAgICBzZWxlY3QuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHByb3BzLnZhbHVlLnVwZGF0ZVVwc3RyZWFtKHNlbGVjdC52YWx1ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHNlbGVjdC52YWx1ZSA9IHByb3BzLnZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wcyA9PT0gbnVsbCB8fCBwcm9wcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogcHJvcHMuc2VsZWN0ZWRJbmRleCkge1xuICAgICAgICAgICAgaWYgKHByb3BzLnNlbGVjdGVkSW5kZXggaW5zdGFuY2VvZiBkYXRhX3NvdXJjZV9qc18xLkRhdGFTb3VyY2UpIHtcbiAgICAgICAgICAgICAgICBwcm9wcy5zZWxlY3RlZEluZGV4Lmxpc3RlbkFuZFJlcGVhdCgodikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3Quc2VsZWN0ZWRJbmRleCA9IHY7XG4gICAgICAgICAgICAgICAgfSwgY2xlYW5VcCk7XG4gICAgICAgICAgICAgICAgc2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcHJvcHMuc2VsZWN0ZWRJbmRleC51cGRhdGUoc2VsZWN0LnNlbGVjdGVkSW5kZXgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAocHJvcHMuc2VsZWN0ZWRJbmRleCBpbnN0YW5jZW9mIGR1cGxleF9kYXRhX3NvdXJjZV9qc18xLkR1cGxleERhdGFTb3VyY2UpIHtcbiAgICAgICAgICAgICAgICBwcm9wcy5zZWxlY3RlZEluZGV4Lmxpc3RlbkFuZFJlcGVhdCgodikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3Quc2VsZWN0ZWRJbmRleCA9IHY7XG4gICAgICAgICAgICAgICAgfSwgY2xlYW5VcCk7XG4gICAgICAgICAgICAgICAgc2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcHJvcHMuc2VsZWN0ZWRJbmRleC51cGRhdGVVcHN0cmVhbShzZWxlY3Quc2VsZWN0ZWRJbmRleCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZWxlY3Quc2VsZWN0ZWRJbmRleCA9IHByb3BzLnNlbGVjdGVkSW5kZXg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNlbGVjdC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuTmF2ID0gZXhwb3J0cy5MaW5rID0gZXhwb3J0cy5MYWJlbCA9IGV4cG9ydHMuSW1nID0gZXhwb3J0cy5JRnJhbWUgPSBleHBvcnRzLkkgPSBleHBvcnRzLkhlYWRpbmcgPSBleHBvcnRzLkhlYWRlciA9IGV4cG9ydHMuSGVhZCA9IGV4cG9ydHMuSHRtbCA9IGV4cG9ydHMuTWV0YSA9IGV4cG9ydHMuRm9ybSA9IGV4cG9ydHMuRm9vdGVyID0gZXhwb3J0cy5FbSA9IGV4cG9ydHMuRGV0YWlscyA9IGV4cG9ydHMuRGF0YSA9IGV4cG9ydHMuQ2FudmFzID0gZXhwb3J0cy5CdXR0b24gPSBleHBvcnRzLkJyID0gZXhwb3J0cy5BdWRpbyA9IGV4cG9ydHMuSHIgPSBleHBvcnRzLlAgPSBleHBvcnRzLlByZSA9IGV4cG9ydHMuUSA9IGV4cG9ydHMuVGVtcGxhdGUgPSBleHBvcnRzLlRIZWFkID0gZXhwb3J0cy5TdW1tYXJ5ID0gZXhwb3J0cy5UaXRsZSA9IGV4cG9ydHMuQm9keSA9IGV4cG9ydHMuQiA9IGV4cG9ydHMuTGkgPSBleHBvcnRzLk9sID0gZXhwb3J0cy5VbCA9IGV4cG9ydHMuVmlkZW8gPSBleHBvcnRzLk5vU2NyaXB0ID0gZXhwb3J0cy5TcGFuID0gZXhwb3J0cy5Bc2lkZSA9IGV4cG9ydHMuQXJ0aWNsZSA9IGV4cG9ydHMuQXJlYSA9IGV4cG9ydHMuSDYgPSBleHBvcnRzLkg1ID0gZXhwb3J0cy5INCA9IGV4cG9ydHMuSDMgPSBleHBvcnRzLkgyID0gZXhwb3J0cy5IMSA9IGV4cG9ydHMuQWRkcmVzcyA9IGV4cG9ydHMuQWJiciA9IGV4cG9ydHMuQSA9IGV4cG9ydHMuRGl2ID0gZXhwb3J0cy5Db2RlID0gdm9pZCAwO1xuZXhwb3J0cy5PYmplY3QgPSBleHBvcnRzLk91dHB1dCA9IGV4cG9ydHMuUGljdHVyZSA9IGV4cG9ydHMuV2JyID0gZXhwb3J0cy5WYXIgPSBleHBvcnRzLktiZCA9IGV4cG9ydHMuU2FtcCA9IGV4cG9ydHMuU3Ryb25nID0gZXhwb3J0cy5TbG90ID0gZXhwb3J0cy5PcHRHcm91cCA9IGV4cG9ydHMuT3B0aW9uID0gZXhwb3J0cy5Qcm9ncmVzcyA9IGV4cG9ydHMuU3ZnID0gZXhwb3J0cy5TY3JpcHQgPSBleHBvcnRzLlBhcmFtID0gZXhwb3J0cy5UcmFjayA9IGV4cG9ydHMuU291cmNlID0gZXhwb3J0cy5TdHlsZSA9IGV4cG9ydHMuVGltZSA9IGV4cG9ydHMuVGggPSBleHBvcnRzLlRkID0gZXhwb3J0cy5UciA9IGV4cG9ydHMuQ2FwdGlvbiA9IGV4cG9ydHMuQ29sZ3JvdXAgPSBleHBvcnRzLkNvbCA9IGV4cG9ydHMuVEZvb3QgPSBleHBvcnRzLlRCb2R5ID0gZXhwb3J0cy5UYWJsZSA9IGV4cG9ydHMuU3VwID0gZXhwb3J0cy5TdWIgPSB2b2lkIDA7XG5jb25zdCBkb21fYWRhcHRlcl9qc18xID0gcmVxdWlyZShcIi4uL2J1aWx0aW5fY29tcG9uZW50cy9kb21fYWRhcHRlci5qc1wiKTtcbi8qKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydHMuQ29kZSA9ICgwLCBkb21fYWRhcHRlcl9qc18xLkRvbU5vZGVDcmVhdG9yKSgnY29kZScpO1xuLyoqXG4gKiBAaW50ZXJuYWxcbiAqL1xuZXhwb3J0cy5EaXYgPSAoMCwgZG9tX2FkYXB0ZXJfanNfMS5Eb21Ob2RlQ3JlYXRvcikoJ2RpdicpO1xuLyoqXG4gKiBAaW50ZXJuYWxcbiAqL1xuZXhwb3J0cy5BID0gKDAsIGRvbV9hZGFwdGVyX2pzXzEuRG9tTm9kZUNyZWF0b3IpKCdhJywgWydocmVmJywgJ3RhcmdldCcsICdocmVmbGFuZycsICdtZWRpYScsICdkb3dubG9hZCcsICdwaW5nJywgJ3JlZmVycmVycG9saWN5JywgJ3JlbCcsICd0eXBlJ10pO1xuLyoqXG4gKiBAaW50ZXJuYWxcbiAqL1xuZXhwb3J0cy5BYmJyID0gKDAsIGRvbV9hZGFwdGVyX2pzXzEuRG9tTm9kZUNyZWF0b3IpKCdhYmJyJyk7XG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnRzLkFkZHJlc3MgPSAoMCwgZG9tX2FkYXB0ZXJfanNfMS5Eb21Ob2RlQ3JlYXRvcikoJ2FkZHJlc3MnKTtcbi8qKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydHMuSDEgPSAoMCwgZG9tX2FkYXB0ZXJfanNfMS5Eb21Ob2RlQ3JlYXRvcikoJ2gxJyk7XG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnRzLkgyID0gKDAsIGRvbV9hZGFwdGVyX2pzXzEuRG9tTm9kZUNyZWF0b3IpKCdoMicpO1xuLyoqXG4gKiBAaW50ZXJuYWxcbiAqL1xuZXhwb3J0cy5IMyA9ICgwLCBkb21fYWRhcHRlcl9qc18xLkRvbU5vZGVDcmVhdG9yKSgnaDMnKTtcbi8qKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydHMuSDQgPSAoMCwgZG9tX2FkYXB0ZXJfanNfMS5Eb21Ob2RlQ3JlYXRvcikoJ2g0Jyk7XG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnRzLkg1ID0gKDAsIGRvbV9hZGFwdGVyX2pzXzEuRG9tTm9kZUNyZWF0b3IpKCdoNScpO1xuLyoqXG4gKiBAaW50ZXJuYWxcbiAqL1xuZXhwb3J0cy5INiA9ICgwLCBkb21fYWRhcHRlcl9qc18xLkRvbU5vZGVDcmVhdG9yKSgnaDYnKTtcbi8qKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydHMuQXJlYSA9ICgwLCBkb21fYWRhcHRlcl9qc18xLkRvbU5vZGVDcmVhdG9yKSgnYXJlYScsIFtcbiAgICAnYWx0JyxcbiAgICAnY29vcnMnLFxuICAgICdkb3dubG9hZCcsXG4gICAgJ2hyZWYnLFxuICAgICdocmVmbGFuZycsXG4gICAgJ21lZGlhJyxcbiAgICAncmVsJyxcbiAgICAnc2hhcGUnLFxuICAgICd0YXJnZXQnLFxuICAgICd0eXBlJyxcbiAgICAncGluZycsXG4gICAgJ3JlZmVycmVycG9saWN5J1xuXSk7XG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnRzLkFydGljbGUgPSAoMCwgZG9tX2FkYXB0ZXJfanNfMS5Eb21Ob2RlQ3JlYXRvcikoJ2FydGljbGUnKTtcbi8qKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydHMuQXNpZGUgPSAoMCwgZG9tX2FkYXB0ZXJfanNfMS5Eb21Ob2RlQ3JlYXRvcikoJ2FzaWRlJyk7XG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnRzLlNwYW4gPSAoMCwgZG9tX2FkYXB0ZXJfanNfMS5Eb21Ob2RlQ3JlYXRvcikoJ3NwYW4nKTtcbi8qKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydHMuTm9TY3JpcHQgPSAoMCwgZG9tX2FkYXB0ZXJfanNfMS5Eb21Ob2RlQ3JlYXRvcikoJ25vc2NyaXB0Jyk7XG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnRzLlZpZGVvID0gKDAsIGRvbV9hZGFwdGVyX2pzXzEuRG9tTm9kZUNyZWF0b3IpKCd2aWRlbycsIFtcbiAgICAnY29udHJvbHMnLFxuICAgICdhdXRvcGxheScsXG4gICAgJ2xvb3AnLFxuICAgICdtdXRlZCcsXG4gICAgJ3ByZWxvYWQnLFxuICAgICdzcmMnLFxuICAgICdwb3N0ZXInLFxuICAgICd3aWR0aCcsXG4gICAgJ2hlaWdodCcsXG4gICAgJ2F1dG9waWN0dXJlaW5waWN0dXJlJyxcbiAgICAnY29udHJvbHNsaXN0JyxcbiAgICAnY3Jvc3NvcmlnaW4nLFxuICAgICdkaXNhYmxlcGljdHVyZWlucGljdHVyZScsXG4gICAgJ2Rpc2FibGVyZW1vdGVwbGF5YmFjaycsXG4gICAgJ3BsYXlzaW5saW5lJ1xuXSwge1xuICAgIGNhblBsYXk6ICdvbkNhblBsYXknLFxuICAgIGNhbnBsYXl0aHJvdWdoOiAnb25DYW5QbGF5VGhyb3VnaCcsXG4gICAgY29tcGxldGU6ICdvbkNvbXBsZXRlJyxcbiAgICBkdXJhdGlvbmNoYW5nZTogJ29uRHVyYXRpb25DaGFuZ2UnLFxuICAgIGVtcHRpZWQ6ICdvbkVtcHRpZWQnLFxuICAgIGVuZGVkOiAnb25FbmRlZCcsXG4gICAgbG9hZGVkZGF0YTogJ29uTG9hZGVkRGF0YScsXG4gICAgbG9hZGVkbWV0YWRhdGE6ICdvbkxvYWRlZE1ldGFkYXRhJyxcbiAgICBwYXVzZTogJ29uUGF1c2UnLFxuICAgIHBsYXk6ICdvblBsYXknLFxuICAgIHBsYXlpbmc6ICdvblBsYXlpbmcnLFxuICAgIHByb2dyZXNzOiAnb25Qcm9ncmVzcycsXG4gICAgcmF0ZWNoYW5nZTogJ29uUmF0ZUNoYW5nZScsXG4gICAgc2Vla2VkOiAnb25TZWVrZWQnLFxuICAgIHNlZWtpbmc6ICdvblNlZWtpbmcnLFxuICAgIHN0YWxsZWQ6ICdvblN0YWxsZWQnLFxuICAgIHN1c3BlbmQ6ICdvblN1c3BlbmQnLFxuICAgIHRpbWV1cGRhdGU6ICdvblRpbWVVcGRhdGUnLFxuICAgIHZvbHVtZWNoYW5nZTogJ29uVm9sdW1lQ2hhbmdlJyxcbiAgICB3YWl0aW5nOiAnb25XYWl0aW5nJ1xufSk7XG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnRzLlVsID0gKDAsIGRvbV9hZGFwdGVyX2pzXzEuRG9tTm9kZUNyZWF0b3IpKCd1bCcpO1xuLyoqXG4gKiBAaW50ZXJuYWxcbiAqL1xuZXhwb3J0cy5PbCA9ICgwLCBkb21fYWRhcHRlcl9qc18xLkRvbU5vZGVDcmVhdG9yKSgnb2wnKTtcbi8qKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydHMuTGkgPSAoMCwgZG9tX2FkYXB0ZXJfanNfMS5Eb21Ob2RlQ3JlYXRvcikoJ2xpJyk7XG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnRzLkIgPSAoMCwgZG9tX2FkYXB0ZXJfanNfMS5Eb21Ob2RlQ3JlYXRvcikoJ2InKTtcbi8qKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydHMuQm9keSA9ICgwLCBkb21fYWRhcHRlcl9qc18xLkRvbU5vZGVDcmVhdG9yKSgnYm9keScpO1xuLyoqXG4gKiBAaW50ZXJuYWxcbiAqL1xuZXhwb3J0cy5UaXRsZSA9ICgwLCBkb21fYWRhcHRlcl9qc18xLkRvbU5vZGVDcmVhdG9yKSgndGl0bGUnKTtcbi8qKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydHMuU3VtbWFyeSA9ICgwLCBkb21fYWRhcHRlcl9qc18xLkRvbU5vZGVDcmVhdG9yKSgnc3VtbWFyeScpO1xuLyoqXG4gKiBAaW50ZXJuYWxcbiAqL1xuZXhwb3J0cy5USGVhZCA9ICgwLCBkb21fYWRhcHRlcl9qc18xLkRvbU5vZGVDcmVhdG9yKSgndGhlYWQnKTtcbi8qKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydHMuVGVtcGxhdGUgPSAoMCwgZG9tX2FkYXB0ZXJfanNfMS5Eb21Ob2RlQ3JlYXRvcikoJ3RlbXBsYXRlJyk7XG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnRzLlEgPSAoMCwgZG9tX2FkYXB0ZXJfanNfMS5Eb21Ob2RlQ3JlYXRvcikoJ3EnKTtcbi8qKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydHMuUHJlID0gKDAsIGRvbV9hZGFwdGVyX2pzXzEuRG9tTm9kZUNyZWF0b3IpKCdwcmUnKTtcbi8qKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydHMuUCA9ICgwLCBkb21fYWRhcHRlcl9qc18xLkRvbU5vZGVDcmVhdG9yKSgncCcpO1xuLyoqXG4gKiBAaW50ZXJuYWxcbiAqL1xuZXhwb3J0cy5IciA9ICgwLCBkb21fYWRhcHRlcl9qc18xLkRvbU5vZGVDcmVhdG9yKSgnaHInKTtcbi8qKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydHMuQXVkaW8gPSAoMCwgZG9tX2FkYXB0ZXJfanNfMS5Eb21Ob2RlQ3JlYXRvcikoJ2F1ZGlvJywgWydjb250cm9scycsICdhdXRvcGxheScsICdsb29wJywgJ211dGVkJywgJ3ByZWxvYWQnLCAnc3JjJywgJ2Nyb3Nzb3JpZ2luJ10sIHtcbiAgICBhdWRpb3Byb2Nlc3M6ICdvbkF1ZGlvUHJvY2VzcycsXG4gICAgY2FucGxheTogJ29uQ2FuUGxheScsXG4gICAgY2FucGxheXRocm91Z2g6ICdvbkNhblBsYXlUaHJvdWdoJyxcbiAgICBjb21wbGV0ZTogJ29uQ29tcGxldGUnLFxuICAgIGR1cmF0aW9uY2hhbmdlOiAnb25EdXJhdGlvbkNoYW5nZScsXG4gICAgZW1wdGllZDogJ29uRW1wdGllZCcsXG4gICAgZW5kZWQ6ICdvbkVuZGVkJyxcbiAgICBsb2FkZWRkYXRhOiAnb25Mb2FkZWREYXRhJyxcbiAgICBsb2FkZWRtZXRhZGF0YTogJ29uTG9hZGVkTWV0YWRhdGEnLFxuICAgIHBhdXNlOiAnb25QYXVzZScsXG4gICAgcGxheTogJ29uUGxheScsXG4gICAgcGxheWluZzogJ29uUGxheWluZycsXG4gICAgcmF0ZWNoYW5nZTogJ29uUmF0ZUNoYW5nZScsXG4gICAgc2Vla2VkOiAnb25TZWVrZWQnLFxuICAgIHNlZWtpbmc6ICdvblNlZWtpbmcnLFxuICAgIHN0YWxsZWQ6ICdvblN0YWxsZWQnLFxuICAgIHN1c3BlbmQ6ICdvblN1c3BlbmQnLFxuICAgIHRpbWV1cGRhdGU6ICdvblRpbWVVcGRhdGUnLFxuICAgIHZvbHVtZWNoYW5nZTogJ29uVm9sdW1lQ2hhbmdlJyxcbiAgICB3YWl0aW5nOiAnb25XYWl0aW5nJ1xufSk7XG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnRzLkJyID0gKDAsIGRvbV9hZGFwdGVyX2pzXzEuRG9tTm9kZUNyZWF0b3IpKCdicicpO1xuLyoqXG4gKiBAaW50ZXJuYWxcbiAqL1xuZXhwb3J0cy5CdXR0b24gPSAoMCwgZG9tX2FkYXB0ZXJfanNfMS5Eb21Ob2RlQ3JlYXRvcikoJ2J1dHRvbicsIFtcbiAgICAnZGlzYWJsZWQnLFxuICAgICdhdXRvZm9jdXMnLFxuICAgICdmb3JtJyxcbiAgICAnZm9ybWFjdGlvbicsXG4gICAgJ2Zvcm1lbmN0eXBlJyxcbiAgICAnZm9ybW1ldGhvZCcsXG4gICAgJ2Zvcm1ub3ZhbGlkYXRlJyxcbiAgICAnZm9ybXRhcmdldCcsXG4gICAgJ3R5cGUnXG5dKTtcbi8qKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydHMuQ2FudmFzID0gKDAsIGRvbV9hZGFwdGVyX2pzXzEuRG9tTm9kZUNyZWF0b3IpKCdjYW52YXMnLCBbJ3dpZHRoJywgJ2hlaWdodCddKTtcbi8qKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydHMuRGF0YSA9ICgwLCBkb21fYWRhcHRlcl9qc18xLkRvbU5vZGVDcmVhdG9yKSgnZGF0YScsIFsndmFsdWUnXSk7XG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnRzLkRldGFpbHMgPSAoMCwgZG9tX2FkYXB0ZXJfanNfMS5Eb21Ob2RlQ3JlYXRvcikoJ2RldGFpbHMnKTtcbi8qKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydHMuRW0gPSAoMCwgZG9tX2FkYXB0ZXJfanNfMS5Eb21Ob2RlQ3JlYXRvcikoJ2VtJyk7XG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnRzLkZvb3RlciA9ICgwLCBkb21fYWRhcHRlcl9qc18xLkRvbU5vZGVDcmVhdG9yKSgnZm9vdGVyJyk7XG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnRzLkZvcm0gPSAoMCwgZG9tX2FkYXB0ZXJfanNfMS5Eb21Ob2RlQ3JlYXRvcikoJ2Zvcm0nLCBbJ2FjdGlvbicsICdtZXRob2QnLCAncmVsJywgJ2VuY3R5cGUnLCAnbm92YWxpZGF0ZScsICd0YXJnZXQnLCAnYWNjZXB0LWNoYXJzZXQnLCAnYXV0b2NvbXBsZXRlJ10pO1xuLyoqXG4gKiBAaW50ZXJuYWxcbiAqL1xuZXhwb3J0cy5NZXRhID0gKDAsIGRvbV9hZGFwdGVyX2pzXzEuRG9tTm9kZUNyZWF0b3IpKCdtZXRhJywgWydodHRwLWVxdWl2JywgJ2NoYXJzZXQnLCAnY29udGVudCddKTtcbi8qKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydHMuSHRtbCA9ICgwLCBkb21fYWRhcHRlcl9qc18xLkRvbU5vZGVDcmVhdG9yKSgnaHRtbCcsIFsnbGFuZycsICd4bWxucyddKTtcbi8qKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydHMuSGVhZCA9ICgwLCBkb21fYWRhcHRlcl9qc18xLkRvbU5vZGVDcmVhdG9yKSgnaGVhZCcpO1xuLyoqXG4gKiBAaW50ZXJuYWxcbiAqL1xuZXhwb3J0cy5IZWFkZXIgPSAoMCwgZG9tX2FkYXB0ZXJfanNfMS5Eb21Ob2RlQ3JlYXRvcikoJ2hlYWRlcicpO1xuLyoqXG4gKiBAaW50ZXJuYWxcbiAqL1xuZXhwb3J0cy5IZWFkaW5nID0gKDAsIGRvbV9hZGFwdGVyX2pzXzEuRG9tTm9kZUNyZWF0b3IpKCdoZWFkaW5nJyk7XG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnRzLkkgPSAoMCwgZG9tX2FkYXB0ZXJfanNfMS5Eb21Ob2RlQ3JlYXRvcikoJ2knKTtcbi8qKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydHMuSUZyYW1lID0gKDAsIGRvbV9hZGFwdGVyX2pzXzEuRG9tTm9kZUNyZWF0b3IpKCdpZnJhbWUnLCBbXG4gICAgJ3NyYycsXG4gICAgJ3NyY2RvYycsXG4gICAgJ3dpZHRoJyxcbiAgICAnaGVpZ2h0JyxcbiAgICAnYWxsb3cnLFxuICAgICdhbGxvd2Z1bGxzY3JlZW4nLFxuICAgICdhbGxvd3BheW1lbnRyZXF1ZXN0JyxcbiAgICAnbG9hZGluZycsXG4gICAgJ3NhbmRib3gnLFxuICAgICdmcmFtZWJvcmRlcicsXG4gICAgJ2NzcCcsXG4gICAgJ3JlZmVycmVycG9saWN5J1xuXSk7XG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnRzLkltZyA9ICgwLCBkb21fYWRhcHRlcl9qc18xLkRvbU5vZGVDcmVhdG9yKSgnaW1nJywgW1xuICAgICdzcmMnLFxuICAgICdhbHQnLFxuICAgICd3aWR0aCcsXG4gICAgJ2hlaWdodCcsXG4gICAgJ3JlZmVycmVycG9saWN5JyxcbiAgICAnc2l6ZXMnLFxuICAgICdzcmNzZXQnLFxuICAgICd1c2VtYXAnLFxuICAgICdjcm9zc29yaWdpbicsXG4gICAgJ2RlY29kaW5nJyxcbiAgICAnaXNtYXAnLFxuICAgICdsb2FkaW5nJ1xuXSk7XG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnRzLkxhYmVsID0gKDAsIGRvbV9hZGFwdGVyX2pzXzEuRG9tTm9kZUNyZWF0b3IpKCdsYWJlbCcsIFsnZm9yJ10pO1xuLyoqXG4gKiBAaW50ZXJuYWxcbiAqL1xuZXhwb3J0cy5MaW5rID0gKDAsIGRvbV9hZGFwdGVyX2pzXzEuRG9tTm9kZUNyZWF0b3IpKCdsaW5rJywgW1xuICAgICdocmVmJyxcbiAgICAncmVsJyxcbiAgICAnbWVkaWEnLFxuICAgICdhcycsXG4gICAgJ2Rpc2FibGVkJyxcbiAgICAndHlwZScsXG4gICAgJ2Nyb3Nzb3JpZ2luJyxcbiAgICAnaHJlZmxhbmcnLFxuICAgICdyZWZlcnJlcnBvbGljeScsXG4gICAgJ3NpemVzJyxcbiAgICAnaW50ZWdyaXR5JyxcbiAgICAnaW1hZ2VzaXplcycsXG4gICAgJ3ByZWZldGNoJ1xuXSk7XG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnRzLk5hdiA9ICgwLCBkb21fYWRhcHRlcl9qc18xLkRvbU5vZGVDcmVhdG9yKSgnbmF2Jyk7XG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnRzLlN1YiA9ICgwLCBkb21fYWRhcHRlcl9qc18xLkRvbU5vZGVDcmVhdG9yKSgnc3ViJyk7XG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnRzLlN1cCA9ICgwLCBkb21fYWRhcHRlcl9qc18xLkRvbU5vZGVDcmVhdG9yKSgnc3VwJyk7XG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnRzLlRhYmxlID0gKDAsIGRvbV9hZGFwdGVyX2pzXzEuRG9tTm9kZUNyZWF0b3IpKCd0YWJsZScpO1xuLyoqXG4gKiBAaW50ZXJuYWxcbiAqL1xuZXhwb3J0cy5UQm9keSA9ICgwLCBkb21fYWRhcHRlcl9qc18xLkRvbU5vZGVDcmVhdG9yKSgndGJvZHknKTtcbi8qKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydHMuVEZvb3QgPSAoMCwgZG9tX2FkYXB0ZXJfanNfMS5Eb21Ob2RlQ3JlYXRvcikoJ3Rmb290Jyk7XG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnRzLkNvbCA9ICgwLCBkb21fYWRhcHRlcl9qc18xLkRvbU5vZGVDcmVhdG9yKSgnY29sJywgWydzcGFuJ10pO1xuLyoqXG4gKiBAaW50ZXJuYWxcbiAqL1xuZXhwb3J0cy5Db2xncm91cCA9ICgwLCBkb21fYWRhcHRlcl9qc18xLkRvbU5vZGVDcmVhdG9yKSgnY29sZ3JvdXAnLCBbJ3NwYW4nXSk7XG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnRzLkNhcHRpb24gPSAoMCwgZG9tX2FkYXB0ZXJfanNfMS5Eb21Ob2RlQ3JlYXRvcikoJ2NhcHRpb24nKTtcbi8qKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydHMuVHIgPSAoMCwgZG9tX2FkYXB0ZXJfanNfMS5Eb21Ob2RlQ3JlYXRvcikoJ3RyJyk7XG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnRzLlRkID0gKDAsIGRvbV9hZGFwdGVyX2pzXzEuRG9tTm9kZUNyZWF0b3IpKCd0ZCcsIFsnY29sc3BhbicsICdoZWFkZXJzJywgJ3Jvd3NwYW4nXSk7XG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnRzLlRoID0gKDAsIGRvbV9hZGFwdGVyX2pzXzEuRG9tTm9kZUNyZWF0b3IpKCd0aCcsIFsnc2NvcGUnLCAnYWJicicsICdjb2xzcGFuJywgJ2hlYWRlcnMnLCAncm93c3BhbiddKTtcbi8qKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydHMuVGltZSA9ICgwLCBkb21fYWRhcHRlcl9qc18xLkRvbU5vZGVDcmVhdG9yKSgndGltZScsIFsnZGF0ZXRpbWUnXSk7XG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnRzLlN0eWxlID0gKDAsIGRvbV9hZGFwdGVyX2pzXzEuRG9tTm9kZUNyZWF0b3IpKCdzdHlsZScsIFsnbWVkaWEnLCAndHlwZScsICdub25jZSddKTtcbi8qKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydHMuU291cmNlID0gKDAsIGRvbV9hZGFwdGVyX2pzXzEuRG9tTm9kZUNyZWF0b3IpKCdzb3VyY2UnLCBbJ3NyYycsICdzcmNzZXQnLCAnbWVkaWEnLCAnc2l6ZXMnLCAndHlwZSddKTtcbi8qKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydHMuVHJhY2sgPSAoMCwgZG9tX2FkYXB0ZXJfanNfMS5Eb21Ob2RlQ3JlYXRvcikoJ3RyYWNrJywgWydzcmMnLCAnc3JjbGFuZycsICdsYWJlbCcsICdraW5kJywgJ2RlZmF1bHQnXSk7XG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnRzLlBhcmFtID0gKDAsIGRvbV9hZGFwdGVyX2pzXzEuRG9tTm9kZUNyZWF0b3IpKCdwYXJhbScsIFsndmFsdWUnXSk7XG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnRzLlNjcmlwdCA9ICgwLCBkb21fYWRhcHRlcl9qc18xLkRvbU5vZGVDcmVhdG9yKSgnc2NyaXB0JywgW1xuICAgICdzcmMnLFxuICAgICdhc3luYycsXG4gICAgJ2RlZmVyJyxcbiAgICAnaW50ZWdyaXR5JyxcbiAgICAnbm9tb2R1bGUnLFxuICAgICd0eXBlJyxcbiAgICAnY3Jvc3NvcmlnaW4nLFxuICAgICdyZWZlcnJlcnBvbGljeScsXG4gICAgJ3RleHQnLFxuICAgICdub25jZSdcbl0pO1xuLyoqXG4gKiBAaW50ZXJuYWxcbiAqL1xuZXhwb3J0cy5TdmcgPSAoMCwgZG9tX2FkYXB0ZXJfanNfMS5Eb21Ob2RlQ3JlYXRvcikoJ3N2ZycsIFsnd2lkdGgnLCAnaGVpZ2h0J10pO1xuLyoqXG4gKiBAaW50ZXJuYWxcbiAqL1xuZXhwb3J0cy5Qcm9ncmVzcyA9ICgwLCBkb21fYWRhcHRlcl9qc18xLkRvbU5vZGVDcmVhdG9yKSgncHJvZ3Jlc3MnLCBbJ21heCcsICd2YWx1ZSddKTtcbi8qKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydHMuT3B0aW9uID0gKDAsIGRvbV9hZGFwdGVyX2pzXzEuRG9tTm9kZUNyZWF0b3IpKCdvcHRpb24nLCBbJ3ZhbHVlJywgJ2xhYmVsJywgJ2Rpc2FibGVkJywgJ3NlbGVjdGVkJ10pO1xuLyoqXG4gKiBAaW50ZXJuYWxcbiAqL1xuZXhwb3J0cy5PcHRHcm91cCA9ICgwLCBkb21fYWRhcHRlcl9qc18xLkRvbU5vZGVDcmVhdG9yKSgnb3B0Z3JvdXAnLCBbJ2xhYmVsJywgJ2Rpc2FibGVkJ10pO1xuLyoqXG4gKiBAaW50ZXJuYWxcbiAqL1xuZXhwb3J0cy5TbG90ID0gKDAsIGRvbV9hZGFwdGVyX2pzXzEuRG9tTm9kZUNyZWF0b3IpKCdzbG90Jyk7XG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnRzLlN0cm9uZyA9ICgwLCBkb21fYWRhcHRlcl9qc18xLkRvbU5vZGVDcmVhdG9yKSgnc3Ryb25nJyk7XG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnRzLlNhbXAgPSAoMCwgZG9tX2FkYXB0ZXJfanNfMS5Eb21Ob2RlQ3JlYXRvcikoJ3NhbXAnKTtcbi8qKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydHMuS2JkID0gKDAsIGRvbV9hZGFwdGVyX2pzXzEuRG9tTm9kZUNyZWF0b3IpKCdrYmQnKTtcbi8qKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydHMuVmFyID0gKDAsIGRvbV9hZGFwdGVyX2pzXzEuRG9tTm9kZUNyZWF0b3IpKCd2YXInKTtcbi8qKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydHMuV2JyID0gKDAsIGRvbV9hZGFwdGVyX2pzXzEuRG9tTm9kZUNyZWF0b3IpKCd3YnInKTtcbi8qKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydHMuUGljdHVyZSA9ICgwLCBkb21fYWRhcHRlcl9qc18xLkRvbU5vZGVDcmVhdG9yKSgncGljdHVyZScpO1xuLyoqXG4gKiBAaW50ZXJuYWxcbiAqL1xuZXhwb3J0cy5PdXRwdXQgPSAoMCwgZG9tX2FkYXB0ZXJfanNfMS5Eb21Ob2RlQ3JlYXRvcikoJ291dHB1dCcsIFsnZm9yJywgJ2Zvcm0nXSk7XG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnRzLk9iamVjdCA9ICgwLCBkb21fYWRhcHRlcl9qc18xLkRvbU5vZGVDcmVhdG9yKSgnb2JqZWN0JywgWydkYXRhJywgJ3dpZHRoJywgJ2hlaWdodCcsICdmb3JtJywgJ3R5cGUnLCAndXNlbWFwJ10pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2ltcGxlX2RvbV9ub2Rlcy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuYXVydW1Ub1N0cmluZyA9IHZvaWQgMDtcbmNvbnN0IGF1cnVtX2VsZW1lbnRfanNfMSA9IHJlcXVpcmUoXCIuLi9yZW5kZXJpbmcvYXVydW1fZWxlbWVudC5qc1wiKTtcbmNvbnN0IGRhdGFfc291cmNlX2pzXzEgPSByZXF1aXJlKFwiLi4vc3RyZWFtL2RhdGFfc291cmNlLmpzXCIpO1xuY29uc3QgZHVwbGV4X2RhdGFfc291cmNlX2pzXzEgPSByZXF1aXJlKFwiLi4vc3RyZWFtL2R1cGxleF9kYXRhX3NvdXJjZS5qc1wiKTtcbmNvbnN0IGNhbmNlbGxhdGlvbl90b2tlbl9qc18xID0gcmVxdWlyZShcIi4uL3V0aWxpdGllcy9jYW5jZWxsYXRpb25fdG9rZW4uanNcIik7XG5hc3luYyBmdW5jdGlvbiBhdXJ1bVRvU3RyaW5nKGNvbnRlbnQsIGNvbmZpZyA9IHt9KSB7XG4gICAgaWYgKGNvbnRlbnQgPT09IHVuZGVmaW5lZCB8fCBjb250ZW50ID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoY29udGVudCkpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBjb250ZW50KSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChhd2FpdCBhdXJ1bVRvU3RyaW5nKGl0ZW0pKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0LmpvaW4oJycpO1xuICAgIH1cbiAgICBpZiAoY29udGVudCBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgcmV0dXJuIGF1cnVtVG9TdHJpbmcoYXdhaXQgY29udGVudCk7XG4gICAgfVxuICAgIGlmIChbJ251bWJlcicsICdzdHJpbmcnLCAnYmlnaW50JywgJ2Jvb2xlYW4nXS5pbmNsdWRlcyh0eXBlb2YgY29udGVudCkpIHtcbiAgICAgICAgcmV0dXJuIGNvbnRlbnQudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoY29udGVudCBpbnN0YW5jZW9mIGRhdGFfc291cmNlX2pzXzEuRGF0YVNvdXJjZSkge1xuICAgICAgICByZXR1cm4gYXVydW1Ub1N0cmluZyhjb250ZW50LnZhbHVlKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoY29udGVudCBpbnN0YW5jZW9mIGR1cGxleF9kYXRhX3NvdXJjZV9qc18xLkR1cGxleERhdGFTb3VyY2UpIHtcbiAgICAgICAgcmV0dXJuIGF1cnVtVG9TdHJpbmcoY29udGVudC52YWx1ZSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGNvbnRlbnQgaW5zdGFuY2VvZiBkYXRhX3NvdXJjZV9qc18xLkFycmF5RGF0YVNvdXJjZSkge1xuICAgICAgICByZXR1cm4gYXVydW1Ub1N0cmluZyhjb250ZW50LmdldERhdGEoKSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBjb25zdCBpdGVtID0gY29udGVudDtcbiAgICAgICAgaWYgKCFpdGVtLmlzSW50cmluc2ljKSB7XG4gICAgICAgICAgICByZXR1cm4gYXVydW1Ub1N0cmluZyhpdGVtLmZhY3RvcnkoaXRlbS5wcm9wcywgaXRlbS5jaGlsZHJlbiwgKDAsIGF1cnVtX2VsZW1lbnRfanNfMS5jcmVhdGVBUEkpKHtcbiAgICAgICAgICAgICAgICBhdHRhY2hDYWxsczogW10sXG4gICAgICAgICAgICAgICAgc2Vzc2lvblRva2VuOiBuZXcgY2FuY2VsbGF0aW9uX3Rva2VuX2pzXzEuQ2FuY2VsbGF0aW9uVG9rZW4oKSxcbiAgICAgICAgICAgICAgICB0b2tlbnM6IFtdXG4gICAgICAgICAgICB9KSkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb25maWcudGFnQmxhY2tsaXN0ICYmIGNvbmZpZy50YWdCbGFja2xpc3QuaW5jbHVkZXMoaXRlbS5uYW1lKSkge1xuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb25maWcudGFnV2hpdGVsaXN0ICYmICFjb25maWcudGFnV2hpdGVsaXN0LmluY2x1ZGVzKGl0ZW0ubmFtZSkpIHtcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfVxuICAgICAgICBsZXQgcHJvcFN0cmluZyA9ICcgJztcbiAgICAgICAgbGV0IGNoaWxkcmVuID0gJyc7XG4gICAgICAgIGlmIChpdGVtLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICBjaGlsZHJlbiA9IGF3YWl0IGF1cnVtVG9TdHJpbmcoaXRlbS5jaGlsZHJlbik7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBwcm9wIGluIGl0ZW0ucHJvcHMpIHtcbiAgICAgICAgICAgIGlmIChjb25maWcuYXR0cmlidXRlQmxhY2tsaXN0ICYmIGNvbmZpZy5hdHRyaWJ1dGVCbGFja2xpc3QuaW5jbHVkZXMocHJvcCkpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjb25maWcuYXR0cmlidXRlV2hpdGVsaXN0ICYmICFjb25maWcuYXR0cmlidXRlV2hpdGVsaXN0LmluY2x1ZGVzKHByb3ApKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaXRlbS5wcm9wc1twcm9wXSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBwcm9wU3RyaW5nICs9IGAke3Byb3B9PVwiJHtpdGVtLnByb3BzW3Byb3BdLnRvU3RyaW5nKCl9XCIgYDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYDwke2l0ZW0ubmFtZX0ke3Byb3BTdHJpbmcudHJpbVJpZ2h0KCl9PiR7Y2hpbGRyZW59PC8ke2l0ZW0ubmFtZX0+YDtcbiAgICB9XG59XG5leHBvcnRzLmF1cnVtVG9TdHJpbmcgPSBhdXJ1bVRvU3RyaW5nO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c3RyaW5nX2FkYXB0ZXIuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlRleHRBcmVhID0gdm9pZCAwO1xuY29uc3QgZGF0YV9zb3VyY2VfanNfMSA9IHJlcXVpcmUoXCIuLi9zdHJlYW0vZGF0YV9zb3VyY2UuanNcIik7XG5jb25zdCBkdXBsZXhfZGF0YV9zb3VyY2VfanNfMSA9IHJlcXVpcmUoXCIuLi9zdHJlYW0vZHVwbGV4X2RhdGFfc291cmNlLmpzXCIpO1xuY29uc3QgZG9tX2FkYXB0ZXJfanNfMSA9IHJlcXVpcmUoXCIuLi9idWlsdGluX2NvbXBvbmVudHMvZG9tX2FkYXB0ZXIuanNcIik7XG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5jb25zdCB0ZXh0QXJlYUV2ZW50cyA9IHsgaW5wdXQ6ICdvbklucHV0JywgY2hhbmdlOiAnb25DaGFuZ2UnIH07XG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5jb25zdCB0ZXh0QXJlYVByb3BzID0gW1xuICAgICdwbGFjZWhvbGRlcicsXG4gICAgJ3JlYWRvbmx5JyxcbiAgICAnZGlzYWJsZWQnLFxuICAgICdmb3JtJyxcbiAgICAnY29scycsXG4gICAgJ3Jvd3MnLFxuICAgICd3cmFwJyxcbiAgICAnYXV0b2NvbXBsZXRlJyxcbiAgICAnYXV0b2ZvY3VzJyxcbiAgICAnbWF4JyxcbiAgICAnbWF4TGVuZ3RoJyxcbiAgICAnbWluJyxcbiAgICAnc3BlbGxjaGVjaycsXG4gICAgJ21pbkxlbmd0aCcsXG4gICAgJ3JlcXVpcmVkJyxcbiAgICAndHlwZSdcbl07XG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnRzLlRleHRBcmVhID0gKDAsIGRvbV9hZGFwdGVyX2pzXzEuRG9tTm9kZUNyZWF0b3IpKCd0ZXh0QXJlYScsIHRleHRBcmVhUHJvcHMsIHRleHRBcmVhRXZlbnRzLCAobm9kZSwgcHJvcHMsIGNsZWFuVXApID0+IHtcbiAgICBjb25zdCB0ZXh0QXJlYSA9IG5vZGU7XG4gICAgaWYgKHByb3BzLnZhbHVlKSB7XG4gICAgICAgIGlmIChwcm9wcy52YWx1ZSBpbnN0YW5jZW9mIGRhdGFfc291cmNlX2pzXzEuRGF0YVNvdXJjZSkge1xuICAgICAgICAgICAgcHJvcHMudmFsdWUubGlzdGVuQW5kUmVwZWF0KCh2KSA9PiB7XG4gICAgICAgICAgICAgICAgdGV4dEFyZWEudmFsdWUgPSB2O1xuICAgICAgICAgICAgfSwgY2xlYW5VcCk7XG4gICAgICAgICAgICB0ZXh0QXJlYS5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICBwcm9wcy52YWx1ZS51cGRhdGUodGV4dEFyZWEudmFsdWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocHJvcHMudmFsdWUgaW5zdGFuY2VvZiBkdXBsZXhfZGF0YV9zb3VyY2VfanNfMS5EdXBsZXhEYXRhU291cmNlKSB7XG4gICAgICAgICAgICBwcm9wcy52YWx1ZS5saXN0ZW5BbmRSZXBlYXQoKHYpID0+IHtcbiAgICAgICAgICAgICAgICB0ZXh0QXJlYS52YWx1ZSA9IHY7XG4gICAgICAgICAgICB9LCBjbGVhblVwKTtcbiAgICAgICAgICAgIHRleHRBcmVhLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHByb3BzLnZhbHVlLnVwZGF0ZVVwc3RyZWFtKHRleHRBcmVhLnZhbHVlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGV4dEFyZWEudmFsdWUgPSBwcm9wcy52YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dGV4dGFyZWEuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlNpbmd1bGFyQXVydW1FbGVtZW50ID0gZXhwb3J0cy5BcnJheUF1cnVtRWxlbWVudCA9IGV4cG9ydHMuY3JlYXRlQVBJID0gZXhwb3J0cy5yZW5kZXJJbnRlcm5hbCA9IGV4cG9ydHMuQXVydW1FbGVtZW50ID0gZXhwb3J0cy5jcmVhdGVMaWZlQ3ljbGUgPSBleHBvcnRzLm5vZGVEYXRhID0gZXhwb3J0cy5hdXJ1bUVsZW1lbnRNb2RlbElkZW50aXRpeSA9IGV4cG9ydHMuY3JlYXRlUmVuZGVyU2Vzc2lvbiA9IHZvaWQgMDtcbmNvbnN0IGRlYnVnX21vZGVfanNfMSA9IHJlcXVpcmUoXCIuLi9kZWJ1Z19tb2RlLmpzXCIpO1xuY29uc3QgZGF0YV9zb3VyY2VfanNfMSA9IHJlcXVpcmUoXCIuLi9zdHJlYW0vZGF0YV9zb3VyY2UuanNcIik7XG5jb25zdCBkdXBsZXhfZGF0YV9zb3VyY2VfanNfMSA9IHJlcXVpcmUoXCIuLi9zdHJlYW0vZHVwbGV4X2RhdGFfc291cmNlLmpzXCIpO1xuY29uc3QgY2FuY2VsbGF0aW9uX3Rva2VuX2pzXzEgPSByZXF1aXJlKFwiLi4vdXRpbGl0aWVzL2NhbmNlbGxhdGlvbl90b2tlbi5qc1wiKTtcbmNvbnN0IGV2ZW50X2VtaXR0ZXJfanNfMSA9IHJlcXVpcmUoXCIuLi91dGlsaXRpZXMvZXZlbnRfZW1pdHRlci5qc1wiKTtcbmNvbnN0IGNsYXNzbmFtZV9qc18xID0gcmVxdWlyZShcIi4uL3V0aWxpdGllcy9jbGFzc25hbWUuanNcIik7XG5mdW5jdGlvbiBjcmVhdGVSZW5kZXJTZXNzaW9uKCkge1xuICAgIGNvbnN0IHNlc3Npb24gPSB7XG4gICAgICAgIGF0dGFjaENhbGxzOiBbXSxcbiAgICAgICAgc2Vzc2lvblRva2VuOiBuZXcgY2FuY2VsbGF0aW9uX3Rva2VuX2pzXzEuQ2FuY2VsbGF0aW9uVG9rZW4oKCkgPT4ge1xuICAgICAgICAgICAgZm9yIChjb25zdCB0b2tlbiBvZiBzZXNzaW9uLnRva2Vucykge1xuICAgICAgICAgICAgICAgIHRva2VuLmNhbmNlbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KSxcbiAgICAgICAgdG9rZW5zOiBbXVxuICAgIH07XG4gICAgcmV0dXJuIHNlc3Npb247XG59XG5leHBvcnRzLmNyZWF0ZVJlbmRlclNlc3Npb24gPSBjcmVhdGVSZW5kZXJTZXNzaW9uO1xuZXhwb3J0cy5hdXJ1bUVsZW1lbnRNb2RlbElkZW50aXRpeSA9IFN5bWJvbCgnQXVydW1FbGVtZW50TW9kZWwnKTtcbmV4cG9ydHMubm9kZURhdGEgPSBuZXcgV2Vha01hcCgpO1xuZnVuY3Rpb24gY3JlYXRlTGlmZUN5Y2xlKCkge1xuICAgIGNvbnN0IGxjID0ge1xuICAgICAgICBhdHRhY2g6IG5ldyBldmVudF9lbWl0dGVyX2pzXzEuRXZlbnRFbWl0dGVyKCksXG4gICAgICAgIGRldGFjaDogbmV3IGV2ZW50X2VtaXR0ZXJfanNfMS5FdmVudEVtaXR0ZXIoKSxcbiAgICAgICAgb25BdHRhY2goKSB7XG4gICAgICAgICAgICBsYy5hdHRhY2guZmlyZSgpO1xuICAgICAgICB9LFxuICAgICAgICBvbkRldGFjaCgpIHtcbiAgICAgICAgICAgIGxjLmRldGFjaC5maXJlKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBsYztcbn1cbmV4cG9ydHMuY3JlYXRlTGlmZUN5Y2xlID0gY3JlYXRlTGlmZUN5Y2xlO1xuY2xhc3MgQXVydW1FbGVtZW50IHtcbiAgICBjb25zdHJ1Y3RvcihkYXRhU291cmNlLCBhcGkpIHtcbiAgICAgICAgdGhpcy5kaXNwb3NlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNoaWxkcmVuID0gW107XG4gICAgICAgIHRoaXMuYXBpID0gYXBpO1xuICAgICAgICB0aGlzLmFwaS5vbkF0dGFjaCgoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5ob3N0Tm9kZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbGxlZ2FsIHN0YXRlOiBBdHRhY2ggZmlyZWQgYnV0IG5vdCBhY3R1YWxseSBhdHRhY2hlZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5yZW5kZXIoZGF0YVNvdXJjZSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBkaXNwb3NlKCkge1xuICAgICAgICBpZiAodGhpcy5kaXNwb3NlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmhvc3ROb2RlLmlzQ29ubmVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyQ29udGVudCgpO1xuICAgICAgICAgICAgdGhpcy5jb250ZW50U3RhcnRNYXJrZXIucmVtb3ZlKCk7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnRFbmRNYXJrZXIucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kaXNwb3NlZCA9IHRydWU7XG4gICAgfVxuICAgIGF0dGFjaFRvRG9tKG5vZGUsIGluZGV4KSB7XG4gICAgICAgIGlmICh0aGlzLmhvc3ROb2RlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0F1cnVtIEVsZW1lbnQgaXMgYWxyZWFkeSBhdHRhY2hlZCcpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGlkID0gQXVydW1FbGVtZW50LmlkKys7XG4gICAgICAgIHRoaXMuaG9zdE5vZGUgPSBub2RlO1xuICAgICAgICB0aGlzLmNvbnRlbnRTdGFydE1hcmtlciA9IGRvY3VtZW50LmNyZWF0ZUNvbW1lbnQoJ1NUQVJUIEF1cnVtIE5vZGUgJyArIGlkKTtcbiAgICAgICAgLy9AdHMtaWdub3JlXG4gICAgICAgIHRoaXMuY29udGVudFN0YXJ0TWFya2VyLm93bmVyID0gdGhpcztcbiAgICAgICAgdGhpcy5jb250ZW50RW5kTWFya2VyID0gZG9jdW1lbnQuY3JlYXRlQ29tbWVudCgnRU5EIEF1cnVtIE5vZGUgJyArIGlkKTtcbiAgICAgICAgaWYgKGluZGV4ID49IG5vZGUuY2hpbGROb2Rlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIG5vZGUuYXBwZW5kQ2hpbGQodGhpcy5jb250ZW50U3RhcnRNYXJrZXIpO1xuICAgICAgICAgICAgbm9kZS5hcHBlbmRDaGlsZCh0aGlzLmNvbnRlbnRFbmRNYXJrZXIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbm9kZS5pbnNlcnRCZWZvcmUodGhpcy5jb250ZW50U3RhcnRNYXJrZXIsIG5vZGUuY2hpbGROb2Rlc1tpbmRleF0pO1xuICAgICAgICAgICAgbm9kZS5pbnNlcnRCZWZvcmUodGhpcy5jb250ZW50RW5kTWFya2VyLCBub2RlLmNoaWxkTm9kZXNbaW5kZXggKyAxXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0U3RhcnRJbmRleCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0V29ya0luZGV4KCkgLSAxO1xuICAgIH1cbiAgICBnZXRXb3JrSW5kZXgoKSB7XG4gICAgICAgIGlmICh0aGlzLmxhc3RTdGFydEluZGV4ICE9PSB1bmRlZmluZWQgJiYgdGhpcy5ob3N0Tm9kZS5jaGlsZE5vZGVzW3RoaXMubGFzdFN0YXJ0SW5kZXhdID09PSB0aGlzLmNvbnRlbnRTdGFydE1hcmtlcikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubGFzdFN0YXJ0SW5kZXggKyAxO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5ob3N0Tm9kZS5jaGlsZE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5ob3N0Tm9kZS5jaGlsZE5vZGVzW2ldID09PSB0aGlzLmNvbnRlbnRTdGFydE1hcmtlcikge1xuICAgICAgICAgICAgICAgIHRoaXMubGFzdFN0YXJ0SW5kZXggPSBpO1xuICAgICAgICAgICAgICAgIHJldHVybiBpICsgMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gLTE7XG4gICAgfVxuICAgIGdldExhc3RJbmRleCgpIHtcbiAgICAgICAgaWYgKHRoaXMubGFzdEVuZEluZGV4ICE9PSB1bmRlZmluZWQgJiYgdGhpcy5ob3N0Tm9kZS5jaGlsZE5vZGVzW3RoaXMubGFzdEVuZEluZGV4XSA9PT0gdGhpcy5jb250ZW50RW5kTWFya2VyKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sYXN0RW5kSW5kZXg7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmhvc3ROb2RlLmNoaWxkTm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmhvc3ROb2RlLmNoaWxkTm9kZXNbaV0gPT09IHRoaXMuY29udGVudEVuZE1hcmtlcikge1xuICAgICAgICAgICAgICAgIHRoaXMubGFzdEVuZEluZGV4ID0gaTtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gLTE7XG4gICAgfVxuICAgIGNsZWFyQ29udGVudCgpIHtcbiAgICAgICAgaWYgKHRoaXMuaG9zdE5vZGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbGxlZ2FsIHN0YXRlOiBBdXJ1bSBlbGVtZW50IHdhcyBub3QgYXR0Y2hlZCB0byBhbnl0aGluZycpO1xuICAgICAgICB9XG4gICAgICAgIGxldCB3b3JrSW5kZXggPSB0aGlzLmdldFdvcmtJbmRleCgpO1xuICAgICAgICB3aGlsZSAodGhpcy5ob3N0Tm9kZS5jaGlsZE5vZGVzW3dvcmtJbmRleF0gIT09IHRoaXMuY29udGVudEVuZE1hcmtlcikge1xuICAgICAgICAgICAgaWYgKCEodGhpcy5ob3N0Tm9kZS5jaGlsZE5vZGVzW3dvcmtJbmRleF0gaW5zdGFuY2VvZiBDb21tZW50KSkge1xuICAgICAgICAgICAgICAgIHRoaXMuaG9zdE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5ob3N0Tm9kZS5jaGlsZE5vZGVzW3dvcmtJbmRleF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaG9zdE5vZGUuY2hpbGROb2Rlc1t3b3JrSW5kZXhdLm93bmVyLmRpc3Bvc2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICB0aGlzLmhvc3ROb2RlLmNoaWxkTm9kZXNbd29ya0luZGV4XS5vd25lci5kaXNwb3NlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgdXBkYXRlRG9tKCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGNvbnN0IHdvcmtJbmRleCA9IHRoaXMuZ2V0V29ya0luZGV4KCk7XG4gICAgICAgIGxldCBpO1xuICAgICAgICBsZXQgb2Zmc2V0ID0gMDtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkID0gdGhpcy5jaGlsZHJlbltpXTtcbiAgICAgICAgICAgIGlmIChjaGlsZCA9PT0gdW5kZWZpbmVkIHx8IGNoaWxkID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgb2Zmc2V0LS07XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY2hpbGQgPT09IHRoaXMuaG9zdE5vZGUuY2hpbGROb2Rlc1tpICsgd29ya0luZGV4ICsgb2Zmc2V0XSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgQXVydW1FbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgaWYgKCFjaGlsZC5ob3N0Tm9kZSkge1xuICAgICAgICAgICAgICAgICAgICBjaGlsZC5hdHRhY2hUb0RvbSh0aGlzLmhvc3ROb2RlLCBpICsgd29ya0luZGV4ICsgb2Zmc2V0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkLmdldFN0YXJ0SW5kZXgoKSA9PT0gaSArIHdvcmtJbmRleCArIG9mZnNldCkge1xuICAgICAgICAgICAgICAgICAgICBvZmZzZXQgKz0gY2hpbGQuZ2V0TGFzdEluZGV4KCkgLSBpIC0gb2Zmc2V0IC0gd29ya0luZGV4O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN0YXJ0ID0gY2hpbGQuZ2V0U3RhcnRJbmRleCgpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgZW5kID0gY2hpbGQuZ2V0TGFzdEluZGV4KCk7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHB0ciA9IHN0YXJ0LCBzd2FwSXRlcmF0aW9uID0gMDsgcHRyIDw9IGVuZDsgcHRyKyssIHN3YXBJdGVyYXRpb24rKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbUEgPSB0aGlzLmhvc3ROb2RlLmNoaWxkTm9kZXNbaSArIHdvcmtJbmRleCArIG9mZnNldCArIHN3YXBJdGVyYXRpb25dO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbUIgPSB0aGlzLmhvc3ROb2RlLmNoaWxkTm9kZXNbcHRyXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcmVudEEgPSBpdGVtQS5wYXJlbnROb2RlO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2libGluZ0EgPSBpdGVtQS5uZXh0U2libGluZyA9PT0gaXRlbUIgPyBpdGVtQiA6IGl0ZW1BLm5leHRTaWJsaW5nO1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbUIucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoaXRlbUEsIGl0ZW1CKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudEEuaW5zZXJ0QmVmb3JlKGl0ZW1CLCBzaWJsaW5nQSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0ICs9IGNoaWxkLmdldExhc3RJbmRleCgpIC0gaSAtIG9mZnNldCAtIHdvcmtJbmRleDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5ob3N0Tm9kZS5jaGlsZE5vZGVzW2kgKyB3b3JrSW5kZXggKyBvZmZzZXRdICE9PSB0aGlzLmNvbnRlbnRFbmRNYXJrZXIgJiZcbiAgICAgICAgICAgICAgICB0aGlzLmhvc3ROb2RlLmNoaWxkTm9kZXNbaSArIHdvcmtJbmRleCArIG9mZnNldF0gIT09IHRoaXMuY2hpbGRyZW5baV0gJiZcbiAgICAgICAgICAgICAgICB0aGlzLmhvc3ROb2RlLmNoaWxkTm9kZXNbaSArIHdvcmtJbmRleCArIG9mZnNldF0gIT09ICgoX2EgPSB0aGlzLmNoaWxkcmVuW2kgKyAxXSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmNvbnRlbnRTdGFydE1hcmtlcikpIHtcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCB8fCBjaGlsZCBpbnN0YW5jZW9mIFRleHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ob3N0Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLmhvc3ROb2RlLmNoaWxkTm9kZXNbaSArIHdvcmtJbmRleCArIG9mZnNldF0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5ob3N0Tm9kZS5jaGlsZE5vZGVzW2kgKyB3b3JrSW5kZXggKyBvZmZzZXRdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxhc3RFbmRJbmRleCsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ob3N0Tm9kZS5pbnNlcnRCZWZvcmUoY2hpbGQsIHRoaXMuaG9zdE5vZGUuY2hpbGROb2Rlc1tpICsgd29ya0luZGV4ICsgb2Zmc2V0XSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxhc3RFbmRJbmRleCsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ob3N0Tm9kZS5hcHBlbmRDaGlsZChjaGlsZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbm90IGltcGxlbWVudGVkJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgfHwgY2hpbGQgaW5zdGFuY2VvZiBUZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmhvc3ROb2RlLmNoaWxkTm9kZXNbaSArIHdvcmtJbmRleCArIG9mZnNldF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGFzdEVuZEluZGV4Kys7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhvc3ROb2RlLmluc2VydEJlZm9yZShjaGlsZCwgdGhpcy5ob3N0Tm9kZS5jaGlsZE5vZGVzW2kgKyB3b3JrSW5kZXggKyBvZmZzZXRdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGFzdEVuZEluZGV4Kys7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhvc3ROb2RlLmFwcGVuZENoaWxkKGNoaWxkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdub3QgaW1wbGVtZW50ZWQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUgKHRoaXMuaG9zdE5vZGUuY2hpbGROb2Rlc1tpICsgd29ya0luZGV4ICsgb2Zmc2V0XSAhPT0gdGhpcy5jb250ZW50RW5kTWFya2VyKSB7XG4gICAgICAgICAgICB0aGlzLmxhc3RFbmRJbmRleC0tO1xuICAgICAgICAgICAgdGhpcy5ob3N0Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLmhvc3ROb2RlLmNoaWxkTm9kZXNbaSArIHdvcmtJbmRleCArIG9mZnNldF0pO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5BdXJ1bUVsZW1lbnQgPSBBdXJ1bUVsZW1lbnQ7XG5BdXJ1bUVsZW1lbnQuaWQgPSAxO1xuLyoqXG4gKiBAaW50ZXJuYWxcbiAqL1xuZnVuY3Rpb24gcmVuZGVySW50ZXJuYWwoZWxlbWVudCwgc2Vzc2lvbiwgcHJlcmVuZGVyaW5nID0gZmFsc2UpIHtcbiAgICB2YXIgX2E7XG4gICAgaWYgKGVsZW1lbnQgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGlmIChBcnJheS5pc0FycmF5KGVsZW1lbnQpKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgZWxlbWVudCkge1xuICAgICAgICAgICAgY29uc3QgcmVuZGVyZWQgPSByZW5kZXJJbnRlcm5hbChpdGVtLCBzZXNzaW9uLCBwcmVyZW5kZXJpbmcpO1xuICAgICAgICAgICAgLy8gRmxhdHRlbiB0aGUgcmVuZGVyZWQgY29udGVudCBpbnRvIGEgc2luZ2xlIGFycmF5IHRvIGF2b2lkIGhhdmluZyB0byBpdGVyYXRlIG92ZXIgbmVzdGVkIGFycmF5cyBsYXRlclxuICAgICAgICAgICAgaWYgKHJlbmRlcmVkICE9PSB1bmRlZmluZWQgJiYgcmVuZGVyZWQgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShyZW5kZXJlZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goLi4ucmVuZGVyZWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2gocmVuZGVyZWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBpZiAoIXByZXJlbmRlcmluZykge1xuICAgICAgICBjb25zdCB0eXBlID0gdHlwZW9mIGVsZW1lbnQ7XG4gICAgICAgIGlmICh0eXBlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPT09ICdudW1iZXInIHx8IHR5cGUgPT09ICdiaWdpbnQnIHx8IHR5cGUgPT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGVsZW1lbnQudG9TdHJpbmcoKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgICAgICBjb25zdCBkcyA9IG5ldyBkYXRhX3NvdXJjZV9qc18xLkRhdGFTb3VyY2UoKTtcbiAgICAgICAgICAgIGVsZW1lbnQudGhlbigodmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgZHMudXBkYXRlKHZhbCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBTaW5ndWxhckF1cnVtRWxlbWVudChkcywgY3JlYXRlQVBJKHNlc3Npb24pKTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIGRhdGFfc291cmNlX2pzXzEuRGF0YVNvdXJjZSB8fCBlbGVtZW50IGluc3RhbmNlb2YgZHVwbGV4X2RhdGFfc291cmNlX2pzXzEuRHVwbGV4RGF0YVNvdXJjZSkge1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gbmV3IFNpbmd1bGFyQXVydW1FbGVtZW50KGVsZW1lbnQsIGNyZWF0ZUFQSShzZXNzaW9uKSk7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBkYXRhX3NvdXJjZV9qc18xLkFycmF5RGF0YVNvdXJjZSkge1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gbmV3IEFycmF5QXVydW1FbGVtZW50KGVsZW1lbnQsIGNyZWF0ZUFQSShzZXNzaW9uKSk7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChlbGVtZW50W2V4cG9ydHMuYXVydW1FbGVtZW50TW9kZWxJZGVudGl0aXldKSB7XG4gICAgICAgIGNvbnN0IG1vZGVsID0gZWxlbWVudDtcbiAgICAgICAgbGV0IGFwaTtcbiAgICAgICAgLy9PcHRpbWl6YXRpb246IHNraXAgY3JlYXRpbmcgQVBJIGZvciBubyBwcm9wcyBiYXNpYyBodG1sIG5vZGVzIGJlY2F1c2UgdGhleSBhcmUgYnkgZmFyIHRoZSBtb3N0IGZyZXF1ZW50IGFuZCB0aGlzIGNhbiB5aWVsZCBhIG5vdGljYWJsZSBwZXJmb3JtYW5jZSBpbmNyZWFzZVxuICAgICAgICBpZiAoIW1vZGVsLmlzSW50cmluc2ljIHx8IG1vZGVsLnByb3BzKSB7XG4gICAgICAgICAgICBhcGkgPSBjcmVhdGVBUEkoc2Vzc2lvbik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBhcGkgPSB7XG4gICAgICAgICAgICAgICAgcmVuZGVyU2Vzc2lvbjogc2Vzc2lvblxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIW1vZGVsLmlzSW50cmluc2ljICYmIGRlYnVnX21vZGVfanNfMS5kaWFnbm9zdGljTW9kZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYFJlbmRlcmluZyAke21vZGVsLm5hbWV9YCk7XG4gICAgICAgICAgICBhcGkub25BdHRhY2goKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBBdHRhY2hpbmcgJHttb2RlbC5uYW1lfWApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBhcGkub25EZXRhY2goKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBEZXRhY2hpbmcgJHttb2RlbC5uYW1lfWApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGNvbXBvbmVudFJlc3VsdDtcbiAgICAgICAgaWYgKG1vZGVsLmlzSW50cmluc2ljKSB7XG4gICAgICAgICAgICBjb21wb25lbnRSZXN1bHQgPSBtb2RlbC5mYWN0b3J5KG1vZGVsLnByb3BzLCBtb2RlbC5jaGlsZHJlbiwgYXBpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbXBvbmVudFJlc3VsdCA9IG1vZGVsLmZhY3RvcnkoKF9hID0gbW9kZWwucHJvcHMpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IHt9LCBtb2RlbC5jaGlsZHJlbiwgYXBpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVuZGVySW50ZXJuYWwoY29tcG9uZW50UmVzdWx0LCBzZXNzaW9uLCBwcmVyZW5kZXJpbmcpO1xuICAgIH1cbiAgICAvLyBVbnN1cHBvcnRlZCB0eXBlcyBhcmUgcmV0dXJuZWQgYXMgaXMgaW4gaG9wZSB0aGF0IGEgdHJhbnNjbHVzaW9uIGNvbXBvbmVudCB3aWxsIHRyYW5zZm9ybSBpdCBpbnRvIHNvbWV0aGluZyBjb21wYXRpYmxlXG4gICAgcmV0dXJuIGVsZW1lbnQ7XG59XG5leHBvcnRzLnJlbmRlckludGVybmFsID0gcmVuZGVySW50ZXJuYWw7XG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5mdW5jdGlvbiBjcmVhdGVBUEkoc2Vzc2lvbikge1xuICAgIGxldCB0b2tlbiA9IHVuZGVmaW5lZDtcbiAgICBjb25zdCBhcGkgPSB7XG4gICAgICAgIHJlbmRlclNlc3Npb246IHNlc3Npb24sXG4gICAgICAgIHN5bmNocm9uaXplTGlmZUN5Y2xlKGxpZmVDeWNsZSkge1xuICAgICAgICAgICAgYXBpLm9uQXR0YWNoKCgpID0+IGxpZmVDeWNsZS5vbkF0dGFjaCgpKTtcbiAgICAgICAgICAgIGFwaS5vbkRldGFjaCgoKSA9PiBsaWZlQ3ljbGUub25EZXRhY2goKSk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uQXR0YWNoOiAoY2IpID0+IHtcbiAgICAgICAgICAgIHNlc3Npb24uYXR0YWNoQ2FsbHMucHVzaChjYik7XG4gICAgICAgIH0sXG4gICAgICAgIG9uRGV0YWNoOiAoY2IpID0+IHtcbiAgICAgICAgICAgIGlmICghdG9rZW4pIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA9IG5ldyBjYW5jZWxsYXRpb25fdG9rZW5fanNfMS5DYW5jZWxsYXRpb25Ub2tlbigpO1xuICAgICAgICAgICAgICAgIHNlc3Npb24udG9rZW5zLnB1c2godG9rZW4pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdG9rZW4uYWRkQ2FuY2VsYWJsZShjYik7XG4gICAgICAgIH0sXG4gICAgICAgIGdldCBjYW5jZWxsYXRpb25Ub2tlbigpIHtcbiAgICAgICAgICAgIGlmICghdG9rZW4pIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA9IG5ldyBjYW5jZWxsYXRpb25fdG9rZW5fanNfMS5DYW5jZWxsYXRpb25Ub2tlbigpO1xuICAgICAgICAgICAgICAgIHNlc3Npb24udG9rZW5zLnB1c2godG9rZW4pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRva2VuO1xuICAgICAgICB9LFxuICAgICAgICBwcmVyZW5kZXIodGFyZ2V0LCBsaWZlQ3ljbGUpIHtcbiAgICAgICAgICAgIGNvbnN0IGxjID0gbGlmZUN5Y2xlO1xuICAgICAgICAgICAgY29uc3Qgc3ViU2Vzc2lvbiA9IGNyZWF0ZVJlbmRlclNlc3Npb24oKTtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHJlbmRlckludGVybmFsKHRhcmdldCwgc3ViU2Vzc2lvbiwgdHJ1ZSk7XG4gICAgICAgICAgICBsYy5hdHRhY2guc3Vic2NyaWJlT25jZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgc3ViU2Vzc2lvbi5hdHRhY2hDYWxscy5mb3JFYWNoKChjYikgPT4gY2IoKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGxjLmRldGFjaC5zdWJzY3JpYmVPbmNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICBsYy5hdHRhY2guY2FuY2VsQWxsKCk7XG4gICAgICAgICAgICAgICAgc3ViU2Vzc2lvbi5zZXNzaW9uVG9rZW4uY2FuY2VsKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH0sXG4gICAgICAgIGNsYXNzTmFtZShkYXRhKSB7XG4gICAgICAgICAgICByZXR1cm4gKDAsIGNsYXNzbmFtZV9qc18xLmF1cnVtQ2xhc3NOYW1lKShkYXRhLCBhcGkuY2FuY2VsbGF0aW9uVG9rZW4pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gYXBpO1xufVxuZXhwb3J0cy5jcmVhdGVBUEkgPSBjcmVhdGVBUEk7XG5jbGFzcyBBcnJheUF1cnVtRWxlbWVudCBleHRlbmRzIEF1cnVtRWxlbWVudCB7XG4gICAgY29uc3RydWN0b3IoZGF0YVNvdXJjZSwgYXBpKSB7XG4gICAgICAgIHN1cGVyKGRhdGFTb3VyY2UsIGFwaSk7XG4gICAgICAgIHRoaXMucmVuZGVyU2Vzc2lvbnMgPSBuZXcgV2Vha01hcCgpO1xuICAgICAgICB0aGlzLmRhdGFTb3VyY2UgPSBkYXRhU291cmNlO1xuICAgIH1cbiAgICBkaXNwb3NlKCkge1xuICAgICAgICBpZiAodGhpcy5kaXNwb3NlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYXBpLmNhbmNlbGxhdGlvblRva2VuLmNhbmNlbCgpO1xuICAgICAgICBzdXBlci5kaXNwb3NlKCk7XG4gICAgfVxuICAgIGF0dGFjaFRvRG9tKG5vZGUsIGluZGV4KSB7XG4gICAgICAgIHN1cGVyLmF0dGFjaFRvRG9tKG5vZGUsIGluZGV4KTtcbiAgICAgICAgLy9AdHMtaWdub3JlXG4gICAgICAgIHRoaXMuY29udGVudFN0YXJ0TWFya2VyLmRhdGFTb3VyY2UgPSB0aGlzLmRhdGFTb3VyY2U7XG4gICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICB0aGlzLmNvbnRlbnRFbmRNYXJrZXIuZGF0YVNvdXJjZSA9IHRoaXMuZGF0YVNvdXJjZTtcbiAgICB9XG4gICAgcmVuZGVyKGRhdGFTb3VyY2UpIHtcbiAgICAgICAgZGF0YVNvdXJjZS5saXN0ZW5BbmRSZXBlYXQoKG4pID0+IHtcbiAgICAgICAgICAgIGlmICghdGhpcy5kaXNwb3NlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlTmV3Q29udGVudChuKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdGhpcy5hcGkuY2FuY2VsbGF0aW9uVG9rZW4pO1xuICAgIH1cbiAgICBzcGxpY2VDaGlsZHJlbihpbmRleCwgYW1vdW50LCAuLi5uZXdJdGVtcykge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGxldCByZW1vdmVkO1xuICAgICAgICBpZiAobmV3SXRlbXMpIHtcbiAgICAgICAgICAgIHJlbW92ZWQgPSB0aGlzLmNoaWxkcmVuLnNwbGljZShpbmRleCwgYW1vdW50LCAuLi5uZXdJdGVtcyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZW1vdmVkID0gdGhpcy5jaGlsZHJlbi5zcGxpY2UoaW5kZXgsIGFtb3VudCk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIHJlbW92ZWQpIHtcbiAgICAgICAgICAgIChfYSA9IHRoaXMucmVuZGVyU2Vzc2lvbnMuZ2V0KGl0ZW0pKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Euc2Vzc2lvblRva2VuLmNhbmNlbCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGhhbmRsZU5ld0NvbnRlbnQoY2hhbmdlKSB7XG4gICAgICAgIGlmICh0aGlzLmhvc3ROb2RlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignaWxsZWdhbCBzdGF0ZTogQXVydW0gZWxlbWVudCB3YXMgbm90IGF0dGNoZWQgdG8gYW55dGhpbmcnKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgb3B0aW1pemVkID0gZmFsc2U7XG4gICAgICAgIGNvbnN0IGFjID0gW107XG4gICAgICAgIHN3aXRjaCAoY2hhbmdlLm9wZXJhdGlvbkRldGFpbGVkKSB7XG4gICAgICAgICAgICBjYXNlICdtZXJnZSc6XG4gICAgICAgICAgICAgICAgY29uc3Qgc291cmNlID0gY2hhbmdlLnByZXZpb3VzU3RhdGUuc2xpY2UoKTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoYW5nZS5uZXdTdGF0ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jaGlsZHJlbi5sZW5ndGggPD0gaSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVuZGVyZWQgPSB0aGlzLnJlbmRlckl0ZW0oY2hhbmdlLm5ld1N0YXRlW2ldLCBhYyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShyZW5kZXJlZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoaWxkcmVuLnB1c2goLi4ucmVuZGVyZWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGlsZHJlbi5wdXNoKHJlbmRlcmVkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZS5wdXNoKGNoYW5nZS5uZXdTdGF0ZVtpXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoc291cmNlW2ldICE9PSBjaGFuZ2UubmV3U3RhdGVbaV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gc291cmNlLmluZGV4T2YoY2hhbmdlLm5ld1N0YXRlW2ldLCBpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhID0gdGhpcy5jaGlsZHJlbltpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBiID0gdGhpcy5jaGlsZHJlbltpbmRleF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGlsZHJlbltpXSA9IGI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGlsZHJlbltpbmRleF0gPSBhO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGMgPSBzb3VyY2VbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZCA9IHNvdXJjZVtpbmRleF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlW2ldID0gZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2VbaW5kZXhdID0gYztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlbmRlcmVkID0gdGhpcy5yZW5kZXJJdGVtKGNoYW5nZS5uZXdTdGF0ZVtpXSwgYWMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHJlbmRlcmVkKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNwbGljZUNoaWxkcmVuKGksIDAsIC4uLnJlbmRlcmVkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3BsaWNlQ2hpbGRyZW4oaSwgMCwgcmVuZGVyZWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2Uuc3BsaWNlKGksIDAsIGNoYW5nZS5uZXdTdGF0ZVtpXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY2hpbGRyZW4ubGVuZ3RoID4gY2hhbmdlLm5ld1N0YXRlLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNwbGljZUNoaWxkcmVuKGNoYW5nZS5uZXdTdGF0ZS5sZW5ndGgsIHRoaXMuY2hpbGRyZW4ubGVuZ3RoIC0gY2hhbmdlLm5ld1N0YXRlLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAncmVtb3ZlJzpcbiAgICAgICAgICAgIGNhc2UgJ3JlbW92ZUxlZnQnOlxuICAgICAgICAgICAgY2FzZSAncmVtb3ZlUmlnaHQnOlxuICAgICAgICAgICAgICAgIHRoaXMuc3BsaWNlQ2hpbGRyZW4oZmxhdHRlbkluZGV4KGNoYW5nZS5uZXdTdGF0ZSwgY2hhbmdlLmluZGV4KSwgZmxhdHRlbkluZGV4KGNoYW5nZS5pdGVtcywgY2hhbmdlLml0ZW1zLmxlbmd0aCkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnYXBwZW5kJzpcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0SW5kZXggPSB0aGlzLmdldExhc3RJbmRleCgpO1xuICAgICAgICAgICAgICAgIG9wdGltaXplZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIGNoYW5nZS5pdGVtcykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZW5kZXJlZCA9IHRoaXMucmVuZGVySXRlbShpdGVtLCBhYyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHJlbmRlcmVkKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGlsZHJlbiA9IHRoaXMuY2hpbGRyZW4uY29uY2F0KHJlbmRlcmVkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IHJlbmRlcmVkLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlbmRlcmVkW2ldKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZW5kZXJlZFtpXSBpbnN0YW5jZW9mIEF1cnVtRWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVuZGVyZWRbaV0uYXR0YWNoVG9Eb20odGhpcy5ob3N0Tm9kZSwgdGFyZ2V0SW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXN0RW5kSW5kZXggPSB0aGlzLmdldExhc3RJbmRleCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0SW5kZXggPSB0aGlzLmxhc3RFbmRJbmRleDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaG9zdE5vZGUuaW5zZXJ0QmVmb3JlKHJlbmRlcmVkW2ldLCB0aGlzLmhvc3ROb2RlLmNoaWxkTm9kZXNbdGFyZ2V0SW5kZXhdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGFzdEVuZEluZGV4Kys7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRJbmRleCsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGlsZHJlbi5wdXNoKHJlbmRlcmVkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZW5kZXJlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZW5kZXJlZCBpbnN0YW5jZW9mIEF1cnVtRWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW5kZXJlZC5hdHRhY2hUb0RvbSh0aGlzLmhvc3ROb2RlLCB0YXJnZXRJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGFzdEVuZEluZGV4ID0gdGhpcy5nZXRMYXN0SW5kZXgoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0SW5kZXggPSB0aGlzLmxhc3RFbmRJbmRleDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaG9zdE5vZGUuaW5zZXJ0QmVmb3JlKHJlbmRlcmVkLCB0aGlzLmhvc3ROb2RlLmNoaWxkTm9kZXNbdGFyZ2V0SW5kZXhdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXN0RW5kSW5kZXgrKztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0SW5kZXgrKztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdyZXBsYWNlJzpcbiAgICAgICAgICAgICAgICBjb25zdCByZW5kZXJlZCA9IHRoaXMucmVuZGVySXRlbShjaGFuZ2UuaXRlbXNbMF0sIGFjKTtcbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShyZW5kZXJlZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbGxlZ2FsIHN0YXRlJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoaWxkcmVuW2NoYW5nZS5pbmRleF0gPSByZW5kZXJlZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdzd2FwJzpcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtQSA9IHRoaXMuY2hpbGRyZW5bY2hhbmdlLmluZGV4XTtcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtQiA9IHRoaXMuY2hpbGRyZW5bY2hhbmdlLmluZGV4Ml07XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW1BIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgJiYgaXRlbUIgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICBvcHRpbWl6ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbUEucGFyZW50RWxlbWVudCA9PT0gaXRlbUIucGFyZW50RWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1BLm5leHRTaWJsaW5nID09PSBpdGVtQikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1CLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGl0ZW1CLCBpdGVtQSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGlsZHJlbltjaGFuZ2UuaW5kZXgyXSA9IGl0ZW1BO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hpbGRyZW5bY2hhbmdlLmluZGV4XSA9IGl0ZW1CO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1CLm5leHRTaWJsaW5nID09PSBpdGVtQSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1CLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGl0ZW1BLCBpdGVtQik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGlsZHJlbltjaGFuZ2UuaW5kZXgyXSA9IGl0ZW1BO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hpbGRyZW5bY2hhbmdlLmluZGV4XSA9IGl0ZW1CO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcmVudEEgPSBpdGVtQS5wYXJlbnROb2RlO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzaWJsaW5nQSA9IGl0ZW1BLm5leHRTaWJsaW5nID09PSBpdGVtQiA/IGl0ZW1CIDogaXRlbUEubmV4dFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1CLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGl0ZW1BLCBpdGVtQik7XG4gICAgICAgICAgICAgICAgICAgIHBhcmVudEEuaW5zZXJ0QmVmb3JlKGl0ZW1CLCBzaWJsaW5nQSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuY2hpbGRyZW5bY2hhbmdlLmluZGV4Ml0gPSBpdGVtQTtcbiAgICAgICAgICAgICAgICB0aGlzLmNoaWxkcmVuW2NoYW5nZS5pbmRleF0gPSBpdGVtQjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3ByZXBlbmQnOlxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSBjaGFuZ2UuaXRlbXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IGNoYW5nZS5pdGVtc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVuZGVyZWQgPSB0aGlzLnJlbmRlckl0ZW0oaXRlbSwgYWMpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShyZW5kZXJlZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignaWxsZWdhbCBzdGF0ZScpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGlsZHJlbi51bnNoaWZ0KHJlbmRlcmVkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2luc2VydCc6XG4gICAgICAgICAgICAgICAgbGV0IGluZGV4ID0gY2hhbmdlLmluZGV4O1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBjaGFuZ2UuaXRlbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVuZGVyZWQgPSB0aGlzLnJlbmRlckl0ZW0oaXRlbSwgYWMpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShyZW5kZXJlZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignaWxsZWdhbCBzdGF0ZScpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGlsZHJlbi5zcGxpY2UoaW5kZXgsIDAsIHJlbmRlcmVkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4ICs9IDE7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdjbGVhcic6XG4gICAgICAgICAgICAgICAgdGhpcy5zcGxpY2VDaGlsZHJlbigwLCB0aGlzLmNoaWxkcmVuLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJTZXNzaW9ucyA9IG5ldyBXZWFrTWFwKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbm90IGltcGxlbWVudGVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFvcHRpbWl6ZWQpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlRG9tKCk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBjIG9mIGFjKSB7XG4gICAgICAgICAgICBjKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVuZGVySXRlbShpdGVtLCBhdHRhY2hDYWxscykge1xuICAgICAgICBpZiAoaXRlbSA9PT0gbnVsbCB8fCBpdGVtID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzID0gY3JlYXRlUmVuZGVyU2Vzc2lvbigpO1xuICAgICAgICBjb25zdCByZW5kZXJlZCA9IHJlbmRlckludGVybmFsKGl0ZW0sIHMpO1xuICAgICAgICBpZiAocmVuZGVyZWQgPT09IHVuZGVmaW5lZCB8fCByZW5kZXJlZCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZW5kZXJlZCBpbnN0YW5jZW9mIEF1cnVtRWxlbWVudCkge1xuICAgICAgICAgICAgcy5zZXNzaW9uVG9rZW4uYWRkQ2FuY2VsYWJsZSgoKSA9PiByZW5kZXJlZC5kaXNwb3NlKCkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVuZGVyU2Vzc2lvbnMuc2V0KHJlbmRlcmVkLCBzKTtcbiAgICAgICAgYXR0YWNoQ2FsbHMucHVzaCguLi5zLmF0dGFjaENhbGxzKTtcbiAgICAgICAgcmV0dXJuIHJlbmRlcmVkO1xuICAgIH1cbn1cbmV4cG9ydHMuQXJyYXlBdXJ1bUVsZW1lbnQgPSBBcnJheUF1cnVtRWxlbWVudDtcbmZ1bmN0aW9uIGZsYXR0ZW5JbmRleChzb3VyY2UsIGluZGV4KSB7XG4gICAgbGV0IGZsYXRJbmRleCA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbmRleDsgaSsrKSB7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHNvdXJjZVtpXSkpIHtcbiAgICAgICAgICAgIGZsYXRJbmRleCArPSBmbGF0dGVuSW5kZXgoc291cmNlW2ldLCBzb3VyY2VbaV0ubGVuZ3RoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGZsYXRJbmRleCsrO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmbGF0SW5kZXg7XG59XG5jbGFzcyBTaW5ndWxhckF1cnVtRWxlbWVudCBleHRlbmRzIEF1cnVtRWxlbWVudCB7XG4gICAgY29uc3RydWN0b3IoZGF0YVNvdXJjZSwgYXBpKSB7XG4gICAgICAgIHN1cGVyKGRhdGFTb3VyY2UsIGFwaSk7XG4gICAgICAgIHRoaXMuYXBpLmNhbmNlbGxhdGlvblRva2VuLmFkZENhbmNlbGFibGUoKCkgPT4geyB2YXIgX2E7IHJldHVybiAoX2EgPSB0aGlzLnJlbmRlclNlc3Npb24pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5zZXNzaW9uVG9rZW4uY2FuY2VsKCk7IH0pO1xuICAgICAgICB0aGlzLmRhdGFTb3VyY2UgPSBkYXRhU291cmNlO1xuICAgIH1cbiAgICBkaXNwb3NlKCkge1xuICAgICAgICBpZiAodGhpcy5kaXNwb3NlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYXBpLmNhbmNlbGxhdGlvblRva2VuLmNhbmNlbCgpO1xuICAgICAgICBzdXBlci5kaXNwb3NlKCk7XG4gICAgfVxuICAgIGF0dGFjaFRvRG9tKG5vZGUsIGluZGV4KSB7XG4gICAgICAgIHN1cGVyLmF0dGFjaFRvRG9tKG5vZGUsIGluZGV4KTtcbiAgICAgICAgLy9AdHMtaWdub3JlXG4gICAgICAgIHRoaXMuY29udGVudFN0YXJ0TWFya2VyLmRhdGFTb3VyY2UgPSB0aGlzLmRhdGFTb3VyY2U7XG4gICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICB0aGlzLmNvbnRlbnRFbmRNYXJrZXIuZGF0YVNvdXJjZSA9IHRoaXMuZGF0YVNvdXJjZTtcbiAgICB9XG4gICAgcmVuZGVyKGRhdGFTb3VyY2UpIHtcbiAgICAgICAgZGF0YVNvdXJjZS5saXN0ZW5BbmRSZXBlYXQoKG4pID0+IHtcbiAgICAgICAgICAgIGlmICghdGhpcy5kaXNwb3NlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlTmV3Q29udGVudChuKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdGhpcy5hcGkuY2FuY2VsbGF0aW9uVG9rZW4pO1xuICAgIH1cbiAgICBoYW5kbGVOZXdDb250ZW50KG5ld1ZhbHVlKSB7XG4gICAgICAgIGlmICh0aGlzLmxhc3RWYWx1ZSA9PT0gbmV3VmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgb3B0aW1pemVkID0gZmFsc2U7XG4gICAgICAgIGlmICh0aGlzLmNoaWxkcmVuLmxlbmd0aCA9PT0gMSAmJiB0aGlzLmNoaWxkcmVuWzBdIGluc3RhbmNlb2YgVGV4dCkge1xuICAgICAgICAgICAgY29uc3QgdHlwZSA9IHR5cGVvZiBuZXdWYWx1ZTtcbiAgICAgICAgICAgIGlmICh0eXBlID09PSAnc3RyaW5nJyB8fCB0eXBlID09PSAnYmlnaW50JyB8fCB0eXBlID09PSAnbnVtYmVyJyB8fCB0eXBlID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNoaWxkcmVuWzBdLm5vZGVWYWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgICAgICAgICAgIG9wdGltaXplZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFvcHRpbWl6ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZnVsbFJlYnVpbGQobmV3VmFsdWUpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVEb20oKTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgY2Igb2YgdGhpcy5yZW5kZXJTZXNzaW9uLmF0dGFjaENhbGxzKSB7XG4gICAgICAgICAgICAgICAgY2IoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxhc3RWYWx1ZSA9IG5ld1ZhbHVlO1xuICAgIH1cbiAgICBmdWxsUmVidWlsZChuZXdWYWx1ZSkge1xuICAgICAgICB0aGlzLmNsZWFyQ29udGVudCgpO1xuICAgICAgICB0aGlzLmVuZFNlc3Npb24oKTtcbiAgICAgICAgdGhpcy5yZW5kZXJTZXNzaW9uID0gY3JlYXRlUmVuZGVyU2Vzc2lvbigpO1xuICAgICAgICBsZXQgcmVuZGVyZWQgPSByZW5kZXJJbnRlcm5hbChuZXdWYWx1ZSwgdGhpcy5yZW5kZXJTZXNzaW9uKTtcbiAgICAgICAgaWYgKHJlbmRlcmVkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuY2hpbGRyZW4gPSBbXTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkocmVuZGVyZWQpKSB7XG4gICAgICAgICAgICByZW5kZXJlZCA9IFtyZW5kZXJlZF07XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIHJlbmRlcmVkKSB7XG4gICAgICAgICAgICBpZiAoaXRlbSBpbnN0YW5jZW9mIEF1cnVtRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyU2Vzc2lvbi5zZXNzaW9uVG9rZW4uYWRkQ2FuY2VsYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHJlbmRlcmVkKSkge1xuICAgICAgICAgICAgdGhpcy5jaGlsZHJlbiA9IHJlbmRlcmVkO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVuZFNlc3Npb24oKSB7XG4gICAgICAgIGlmICh0aGlzLnJlbmRlclNlc3Npb24pIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyU2Vzc2lvbi5zZXNzaW9uVG9rZW4uY2FuY2VsKCk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlclNlc3Npb24gPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLlNpbmd1bGFyQXVydW1FbGVtZW50ID0gU2luZ3VsYXJBdXJ1bUVsZW1lbnQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hdXJ1bV9lbGVtZW50LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5jc3MgPSB2b2lkIDA7XG5jb25zdCBkYXRhX3NvdXJjZV9qc18xID0gcmVxdWlyZShcIi4uL3N0cmVhbS9kYXRhX3NvdXJjZS5qc1wiKTtcbmNvbnN0IGR1cGxleF9kYXRhX3NvdXJjZV9qc18xID0gcmVxdWlyZShcIi4uL3N0cmVhbS9kdXBsZXhfZGF0YV9zb3VyY2UuanNcIik7XG5jb25zdCBzdHJlYW1fanNfMSA9IHJlcXVpcmUoXCIuLi9zdHJlYW0vc3RyZWFtLmpzXCIpO1xuY29uc3QgYXVydW1fanNfMSA9IHJlcXVpcmUoXCIuLi91dGlsaXRpZXMvYXVydW0uanNcIik7XG5jb25zdCBjYW5jZWxsYXRpb25fdG9rZW5fanNfMSA9IHJlcXVpcmUoXCIuLi91dGlsaXRpZXMvY2FuY2VsbGF0aW9uX3Rva2VuLmpzXCIpO1xuLyoqXG4gKiBHZW5lcmF0ZXMgYSBzdHlsZSB0YWcgd2l0aCB0aGUgcHJvdmlkZWQgc3R5bGUgYXMgY29udGVudCwgc3VwcG9ydHMgZGF0YSBzb3VyY2VzLCBkdXBsZXggZGF0YSBzb3VyY2VzIGFuZCBzdHJlYW1zIGluc3RlYWQgb2Ygc3RyaW5ncyBpbiB0aGUgdGVtcGxhdGUuXG4gKiBVcGRhdGVzIHN0eWxlIGNvbnRlbnQgaWYgYW55IG9mIHRoZSBkYXRhc291cmNlcyB1c2VkIHVwZGF0ZXMuXG4gKi9cbmZ1bmN0aW9uIGNzcyhmcmFnbWVudHMsIC4uLmlucHV0KSB7XG4gICAgY29uc3QgcmVzdWx0ID0gbmV3IGRhdGFfc291cmNlX2pzXzEuRGF0YVNvdXJjZSgpO1xuICAgIGNvbnN0IHRva2VuID0gbmV3IGNhbmNlbGxhdGlvbl90b2tlbl9qc18xLkNhbmNlbGxhdGlvblRva2VuKCk7XG4gICAgZm9yIChjb25zdCBpbnMgb2YgaW5wdXQpIHtcbiAgICAgICAgaWYgKGlucyBpbnN0YW5jZW9mIGRhdGFfc291cmNlX2pzXzEuRGF0YVNvdXJjZSB8fCBpbnMgaW5zdGFuY2VvZiBkdXBsZXhfZGF0YV9zb3VyY2VfanNfMS5EdXBsZXhEYXRhU291cmNlIHx8IGlucyBpbnN0YW5jZW9mIHN0cmVhbV9qc18xLlN0cmVhbSkge1xuICAgICAgICAgICAgaW5zLmxpc3RlbigoKSA9PiByZXN1bHQudXBkYXRlKHJlY29tcHV0ZShmcmFnbWVudHMsIGlucHV0KSksIHRva2VuKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXN1bHQudXBkYXRlKHJlY29tcHV0ZShmcmFnbWVudHMsIGlucHV0KSk7XG4gICAgcmV0dXJuIGF1cnVtX2pzXzEuQXVydW0uZmFjdG9yeSgnc3R5bGUnLCB7XG4gICAgICAgIG9uRGV0YWNoOiAoKSA9PiB0b2tlbi5jYW5jZWwoKVxuICAgIH0sIHJlc3VsdCk7XG59XG5leHBvcnRzLmNzcyA9IGNzcztcbmZ1bmN0aW9uIHJlY29tcHV0ZShmcmFnbWVudHMsIGlucHV0KSB7XG4gICAgbGV0IHJlc3VsdCA9ICcnO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZnJhZ21lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHJlc3VsdCArPSBmcmFnbWVudHNbaV07XG4gICAgICAgIGlmIChpbnB1dFtpXSkge1xuICAgICAgICAgICAgaWYgKGlucHV0W2ldIGluc3RhbmNlb2YgZGF0YV9zb3VyY2VfanNfMS5EYXRhU291cmNlIHx8IGlucHV0W2ldIGluc3RhbmNlb2YgZHVwbGV4X2RhdGFfc291cmNlX2pzXzEuRHVwbGV4RGF0YVNvdXJjZSB8fCBpbnB1dFtpXSBpbnN0YW5jZW9mIHN0cmVhbV9qc18xLlN0cmVhbSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCArPSBpbnB1dFtpXS52YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlc3VsdCArPSBpbnB1dFtpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXVydW1fc3R5bGUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLldlYmNvbXBvbmVudCA9IHZvaWQgMDtcbmNvbnN0IGF1cnVtX2pzXzEgPSByZXF1aXJlKFwiLi4vdXRpbGl0aWVzL2F1cnVtLmpzXCIpO1xuY29uc3QgYXVydW1fZWxlbWVudF9qc18xID0gcmVxdWlyZShcIi4vYXVydW1fZWxlbWVudC5qc1wiKTtcbmNvbnN0IGRhdGFfc291cmNlX2pzXzEgPSByZXF1aXJlKFwiLi4vc3RyZWFtL2RhdGFfc291cmNlLmpzXCIpO1xuY29uc3QgZG9tX2FkYXB0ZXJfanNfMSA9IHJlcXVpcmUoXCIuLi9idWlsdGluX2NvbXBvbmVudHMvZG9tX2FkYXB0ZXIuanNcIik7XG4vKipcbiAqIFdyYXBwZXIgYXJvdW5kIG5hdGl2ZSB3ZWIgY29tcG9uZW50cyBhbGxvd3MgdXNpbmcgYXVydW0gc3R5bGUgY29tcG9uZW50IHN0cnVjdHVyZSB0byBjcmVhdGUgbmF0aXZlIGNvbXBvbmVudHMuXG4gKi9cbmZ1bmN0aW9uIFdlYmNvbXBvbmVudChjb25maWcsIGxvZ2ljKSB7XG4gICAgY3VzdG9tRWxlbWVudHMuZGVmaW5lKGNvbmZpZy5uYW1lLCBjbGFzcyBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgICAgICBzdXBlcigpO1xuICAgICAgICAgICAgaWYgKGNvbmZpZy5vYnNlcnZlZEF0dHJpYnV0ZXMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGNvbmZpZy5vYnNlcnZlZEF0dHJpYnV0ZXMgPSBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucHJvcHMgPSB7fTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgYXR0ciBvZiBjb25maWcub2JzZXJ2ZWRBdHRyaWJ1dGVzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wc1thdHRyXSA9IG5ldyBkYXRhX3NvdXJjZV9qc18xLkRhdGFTb3VyY2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICAgICAgICAgIHJldHVybiBjb25maWcub2JzZXJ2ZWRBdHRyaWJ1dGVzO1xuICAgICAgICB9XG4gICAgICAgIGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhuYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUpIHtcbiAgICAgICAgICAgIGlmIChvbGRWYWx1ZSAhPT0gbmV3VmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzW25hbWVdLnVwZGF0ZShuZXdWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICBjb25zdCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICAgICAgICAgIHRoaXMuc2Vzc2lvbiA9ICgwLCBhdXJ1bV9lbGVtZW50X2pzXzEuY3JlYXRlUmVuZGVyU2Vzc2lvbikoKTtcbiAgICAgICAgICAgIHRoaXMuYXBpID0gKDAsIGF1cnVtX2VsZW1lbnRfanNfMS5jcmVhdGVBUEkpKHRoaXMuc2Vzc2lvbik7XG4gICAgICAgICAgICBjb25zdCBjb250ZW50ID0gbG9naWModGhpcy5wcm9wcywgdGhpcy5hcGkpO1xuICAgICAgICAgICAgZm9yIChjb25zdCBjYiBvZiB0aGlzLnNlc3Npb24uYXR0YWNoQ2FsbHMpIHtcbiAgICAgICAgICAgICAgICBjYigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYXVydW1fanNfMS5BdXJ1bS5hdHRhY2goY29udGVudCwgdGVtcGxhdGUpO1xuICAgICAgICAgICAgdGhpcy5hdHRhY2hTaGFkb3coe1xuICAgICAgICAgICAgICAgIG1vZGU6IChfYSA9IGNvbmZpZy5zaGFkb3dSb290TW9kZSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogJ29wZW4nLFxuICAgICAgICAgICAgICAgIGRlbGVnYXRlc0ZvY3VzOiBjb25maWcuc2hhZG93Um9vdERlbGVnYXRlc0ZvY3VzXG4gICAgICAgICAgICB9KS5hcHBlbmRDaGlsZCh0ZW1wbGF0ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgICAgICAgICB0aGlzLnNlc3Npb24uc2Vzc2lvblRva2VuLmNhbmNlbCgpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuICgwLCBkb21fYWRhcHRlcl9qc18xLkRvbU5vZGVDcmVhdG9yKShjb25maWcubmFtZSwgY29uZmlnLm9ic2VydmVkQXR0cmlidXRlcywgdW5kZWZpbmVkLCAobm9kZSwgcHJvcHMpID0+IHtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gcHJvcHMpIHtcbiAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICAgICAgaWYgKCEoa2V5IGluIG5vZGUucHJvcHMpKSB7XG4gICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgbm9kZS5wcm9wc1trZXldID0gcHJvcHNba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xufVxuZXhwb3J0cy5XZWJjb21wb25lbnQgPSBXZWJjb21wb25lbnQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD13ZWJjb21wb25lbnQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlNldERhdGFTb3VyY2UgPSBleHBvcnRzLk1hcERhdGFTb3VyY2UgPSBleHBvcnRzLnByb2Nlc3NUcmFuc2Zvcm0gPSBleHBvcnRzLkZpbHRlcmVkQXJyYXlWaWV3ID0gZXhwb3J0cy5Tb3J0ZWRBcnJheVZpZXcgPSBleHBvcnRzLlVuaXF1ZUFycmF5VmlldyA9IGV4cG9ydHMuU2xpY2VkQXJyYXlWaWV3ID0gZXhwb3J0cy5SZXZlcnNlZEFycmF5VmlldyA9IGV4cG9ydHMuTWFwcGVkQXJyYXlWaWV3ID0gZXhwb3J0cy5GbGF0dGVuZWRBcnJheVZpZXcgPSBleHBvcnRzLkFycmF5RGF0YVNvdXJjZSA9IGV4cG9ydHMuRGF0YVNvdXJjZSA9IHZvaWQgMDtcbmNvbnN0IGF1cnVtanNfanNfMSA9IHJlcXVpcmUoXCIuLi9hdXJ1bWpzLmpzXCIpO1xuY29uc3QgYXVydW1fc2VydmVyX2NsaWVudF9qc18xID0gcmVxdWlyZShcIi4uL2F1cnVtX3NlcnZlci9hdXJ1bV9zZXJ2ZXJfY2xpZW50LmpzXCIpO1xuY29uc3QgZGVidWdfbW9kZV9qc18xID0gcmVxdWlyZShcIi4uL2RlYnVnX21vZGUuanNcIik7XG5jb25zdCBjYW5jZWxsYXRpb25fdG9rZW5fanNfMSA9IHJlcXVpcmUoXCIuLi91dGlsaXRpZXMvY2FuY2VsbGF0aW9uX3Rva2VuLmpzXCIpO1xuY29uc3QgZXZlbnRfZW1pdHRlcl9qc18xID0gcmVxdWlyZShcIi4uL3V0aWxpdGllcy9ldmVudF9lbWl0dGVyLmpzXCIpO1xuY29uc3QgZGF0YV9zb3VyY2Vfb3BlcmF0b3JzX2pzXzEgPSByZXF1aXJlKFwiLi9kYXRhX3NvdXJjZV9vcGVyYXRvcnMuanNcIik7XG5jb25zdCBkdXBsZXhfZGF0YV9zb3VyY2VfanNfMSA9IHJlcXVpcmUoXCIuL2R1cGxleF9kYXRhX3NvdXJjZS5qc1wiKTtcbmNvbnN0IG9wZXJhdG9yX21vZGVsX2pzXzEgPSByZXF1aXJlKFwiLi9vcGVyYXRvcl9tb2RlbC5qc1wiKTtcbmNvbnN0IHN0cmVhbV9qc18xID0gcmVxdWlyZShcIi4vc3RyZWFtLmpzXCIpO1xuLyoqXG4gKiBEYXRhc291cmNlcyB3cmFwIGEgdmFsdWUgYW5kIGFsbG93IHlvdSB0byB1cGRhdGUgaXQgaW4gYW4gb2JzZXJ2YWJsZSB3YXkuIERhdGFzb3VyY2VzIGNhbiBiZSBtYW5pcHVsYXRlZCBsaWtlIHN0cmVhbXMgYW5kIGNhbiBiZSBib3VuZCBkaXJlY3RseSBpbiB0aGUgSlNYIHN5bnRheCBhbmQgd2lsbCB1cGRhdGUgdGhlIGh0bWwgd2hlbmV2ZXIgdGhlIHZhbHVlIGNoYW5nZXNcbiAqL1xuY2xhc3MgRGF0YVNvdXJjZSB7XG4gICAgY29uc3RydWN0b3IoaW5pdGlhbFZhbHVlLCBuYW1lID0gJ1Jvb3REYXRhU291cmNlJykge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLnZhbHVlID0gaW5pdGlhbFZhbHVlO1xuICAgICAgICBpZiAoZGVidWdfbW9kZV9qc18xLmRlYnVnTW9kZSkge1xuICAgICAgICAgICAgKDAsIGRlYnVnX21vZGVfanNfMS5kZWJ1Z1JlZ2lzdGVyU3RyZWFtKSh0aGlzLCBuZXcgRXJyb3IoKS5zdGFjayk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wcmltZWQgPSBpbml0aWFsVmFsdWUgIT09IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5lcnJvckV2ZW50ID0gbmV3IGV2ZW50X2VtaXR0ZXJfanNfMS5FdmVudEVtaXR0ZXIoKTtcbiAgICAgICAgdGhpcy51cGRhdGVFdmVudCA9IG5ldyBldmVudF9lbWl0dGVyX2pzXzEuRXZlbnRFbWl0dGVyKCk7XG4gICAgfVxuICAgIHRvU3RyaW5nKCkge1xuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZS50b1N0cmluZygpO1xuICAgIH1cbiAgICBzdGF0aWMgdG9EYXRhU291cmNlKHZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIERhdGFTb3VyY2UpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRGF0YVNvdXJjZSh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhdGljIGZyb21FdmVudChldmVudCwgY2FuY2VsbGF0aW9uKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBEYXRhU291cmNlKCk7XG4gICAgICAgIGV2ZW50LnN1YnNjcmliZSgodikgPT4gcmVzdWx0LnVwZGF0ZSh2KSwgY2FuY2VsbGF0aW9uKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ29ubmVjdHMgdG8gYW4gYXVydW0tc2VydmVyIGV4cG9zZWQgZGF0YXNvdXJjZS4gVmlldyBodHRwczovL2dpdGh1Yi5jb20vQ3liZXJQaG9lbml4OTAvYXVydW0tc2VydmVyIGZvciBtb3JlIGluZm9ybWF0aW9uXG4gICAgICogTm90ZSB0aGF0IHR5cGUgc2FmZXR5IGlzIG5vdCBndWFyYW50ZWVkLiBXaGF0ZXZlciB0aGUgc2VydmVyIHNlbmRzIGFzIGFuIHVwZGF0ZSB3aWxsIGJlIHByb3BhZ2F0ZWRcbiAgICAgKiBAcGFyYW0gIHtBdXJ1bVNlcnZlckluZm99IGF1cnVtU2VydmVySW5mb1xuICAgICAqIEByZXR1cm5zIERhdGFTb3VyY2VcbiAgICAgKi9cbiAgICBzdGF0aWMgZnJvbVJlbW90ZVNvdXJjZShhdXJ1bVNlcnZlckluZm8sIGNhbmNlbGxhdGlvbikge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBuZXcgRGF0YVNvdXJjZSgpO1xuICAgICAgICAoMCwgYXVydW1fc2VydmVyX2NsaWVudF9qc18xLnN5bmNEYXRhU291cmNlKShyZXN1bHQsIGF1cnVtU2VydmVySW5mbywgY2FuY2VsbGF0aW9uKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgc3RhdGljIGZyb21NdWx0aXBsZVNvdXJjZXMoc291cmNlcywgY2FuY2VsbGF0aW9uKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBEYXRhU291cmNlKCk7XG4gICAgICAgIGZvciAoY29uc3QgcyBvZiBzb3VyY2VzKSB7XG4gICAgICAgICAgICBpZiAoZGVidWdfbW9kZV9qc18xLmRlYnVnTW9kZSkge1xuICAgICAgICAgICAgICAgICgwLCBkZWJ1Z19tb2RlX2pzXzEuZGVidWdSZWdpc3RlckxpbmspKHMsIHJlc3VsdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzLmxpc3RlbkludGVybmFsKCh2KSA9PiByZXN1bHQudXBkYXRlKHYpLCBjYW5jZWxsYXRpb24pO1xuICAgICAgICB9XG4gICAgICAgIHJlc3VsdC5uYW1lID0gYENvbWJpbmF0aW9uIG9mIFske3NvdXJjZXMubWFwKCh2KSA9PiB2Lm5hbWUpLmpvaW4oJyAmICcpfV1gO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBbGxvd3MgdGFwcGluZyBpbnRvIHRoZSBzdHJlYW0gYW5kIGNhbGxzIGEgZnVuY3Rpb24gZm9yIGVhY2ggdmFsdWUuXG4gICAgICovXG4gICAgdGFwKGNhbGxiYWNrLCBjYW5jZWxsYXRpb25Ub2tlbikge1xuICAgICAgICB0aGlzLmxpc3RlbigodmFsdWUpID0+IHtcbiAgICAgICAgICAgIGNhbGxiYWNrKHZhbHVlKTtcbiAgICAgICAgfSwgY2FuY2VsbGF0aW9uVG9rZW4pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQXNzaWduIGEgZnVuY3Rpb24gdG8gaGFuZGxlIGVycm9ycyBhbmQgbWFwIHRoZW0gYmFjayB0byByZWd1bGFyIHZhbHVlcy4gUmV0aHJvdyB0aGUgZXJyb3IgaW4gY2FzZSB5b3Ugd2FudCB0byBmYWxsYmFjayB0byBlbWl0dGluZyBlcnJvclxuICAgICAqL1xuICAgIGhhbmRsZUVycm9ycyhjYWxsYmFjaykge1xuICAgICAgICB0aGlzLmVycm9ySGFuZGxlciA9IGNhbGxiYWNrO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgb25FcnJvcihjYWxsYmFjaywgY2FuY2VsbGF0aW9uVG9rZW4pIHtcbiAgICAgICAgdGhpcy5lcnJvckV2ZW50LnN1YnNjcmliZShjYWxsYmFjaywgY2FuY2VsbGF0aW9uVG9rZW4pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgZW1pdEVycm9yKGUpIHtcbiAgICAgICAgaWYgKHRoaXMuZXJyb3JIYW5kbGVyKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnVwZGF0ZSh0aGlzLmVycm9ySGFuZGxlcihlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAobmV3RXJyb3IpIHtcbiAgICAgICAgICAgICAgICBlID0gbmV3RXJyb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZXJyb3JFdmVudC5oYXNTdWJzY3JpcHRpb25zKCkpIHtcbiAgICAgICAgICAgIHRoaXMuZXJyb3JFdmVudC5maXJlKGUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBVcGRhdGVzIHdpdGggdGhlIHNhbWUgdmFsdWUgYXMgdGhlIGxhc3QgdmFsdWVcbiAgICAgKi9cbiAgICByZXBlYXRMYXN0KCkge1xuICAgICAgICB0aGlzLnVwZGF0ZSh0aGlzLnZhbHVlKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVwZGF0ZXMgdGhlIHZhbHVlIGluIHRoZSBkYXRhIHNvdXJjZSBhbmQgY2FsbHMgdGhlIGxpc3RlbiBjYWxsYmFjayBmb3IgYWxsIGxpc3RlbmVyc1xuICAgICAqIEBwYXJhbSBuZXdWYWx1ZSBuZXcgdmFsdWUgZm9yIHRoZSBkYXRhIHNvdXJjZVxuICAgICAqL1xuICAgIHVwZGF0ZShuZXdWYWx1ZSkge1xuICAgICAgICB0aGlzLnByaW1lZCA9IHRydWU7XG4gICAgICAgIGlmICh0aGlzLnVwZGF0aW5nKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Byb2JsZW0gaW4gZGF0YSBzb3VyY2U6IFVuc3RhYmxlIHZhbHVlIHByb3BhZ2F0aW9uLiBXaGVuIHVwZGF0aW5nIGEgdmFsdWUgdGhlIHN0cmVhbSB3YXMgdXBkYXRlZCBiYWNrIGFzIGEgZGlyZWN0IHJlc3BvbnNlLiBUaGlzIGNhbiBsZWFkIHRvIGluZmluaXRlIGxvb3BzIGFuZCBpcyB0aGVyZWZvcmUgbm90IGFsbG93ZWQnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnVwZGF0aW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgICB0aGlzLnVwZGF0ZUV2ZW50LmZpcmUobmV3VmFsdWUpO1xuICAgICAgICBpZiAoZGVidWdfbW9kZV9qc18xLmRlYnVnTW9kZSkge1xuICAgICAgICAgICAgKDAsIGRlYnVnX21vZGVfanNfMS5kZWJ1Z0RlY2xhcmVVcGRhdGUpKHRoaXMsIG5ld1ZhbHVlLCBuZXcgRXJyb3IoKS5zdGFjayk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy51cGRhdGluZyA9IGZhbHNlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBVcGRhdGVzIHRoZSBkYXRhIHNvdXJjZSB3aXRoIGEgdmFsdWUgaWYgaXQgaGFzIG5ldmVyIGhhZCBhIHZhbHVlIGJlZm9yZVxuICAgICAqL1xuICAgIHdpdGhJbml0aWFsKHZhbHVlKSB7XG4gICAgICAgIGlmICghdGhpcy5wcmltZWQpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2FtZSBhcyBsaXN0ZW4gYnV0IHdpbGwgaW1tZWRpYXRlbHkgY2FsbCB0aGUgY2FsbGJhY2sgd2l0aCB0aGUgY3VycmVudCB2YWx1ZSBmaXJzdFxuICAgICAqIEBwYXJhbSBjYWxsYmFjayBDYWxsYmFjayB0byBjYWxsIHdoZW4gdmFsdWUgaXMgdXBkYXRlZFxuICAgICAqIEBwYXJhbSBjYW5jZWxsYXRpb25Ub2tlbiBPcHRpb25hbCB0b2tlbiB0byBjb250cm9sIHRoZSBjYW5jZWxsYXRpb24gb2YgdGhlIHN1YnNjcmlwdGlvblxuICAgICAqIEByZXR1cm5zIENhbmNlbGxhdGlvbiBjYWxsYmFjaywgY2FuIGJlIHVzZWQgdG8gY2FuY2VsIHN1YnNjcmlwdGlvbiB3aXRob3V0IGEgY2FuY2VsbGF0aW9uIHRva2VuXG4gICAgICovXG4gICAgbGlzdGVuQW5kUmVwZWF0KGNhbGxiYWNrLCBjYW5jZWxsYXRpb25Ub2tlbikge1xuICAgICAgICBpZiAodGhpcy5wcmltZWQpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKHRoaXMudmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmxpc3RlbihjYWxsYmFjaywgY2FuY2VsbGF0aW9uVG9rZW4pO1xuICAgIH1cbiAgICBsaXN0ZW5BbmRSZXBlYXRJbnRlcm5hbChjYWxsYmFjaywgY2FuY2VsbGF0aW9uVG9rZW4sIHBhcmVudCkge1xuICAgICAgICBjYWxsYmFjayh0aGlzLnZhbHVlKTtcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdGVuSW50ZXJuYWwoY2FsbGJhY2ssIGNhbmNlbGxhdGlvblRva2VuLCBwYXJlbnQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTdWJzY3JpYmVzIHRvIHRoZSB1cGRhdGVzIG9mIHRoZSBkYXRhIHN0cmVhbVxuICAgICAqIEBwYXJhbSBjYWxsYmFjayBDYWxsYmFjayB0byBjYWxsIHdoZW4gdmFsdWUgaXMgdXBkYXRlZFxuICAgICAqIEBwYXJhbSBjYW5jZWxsYXRpb25Ub2tlbiBPcHRpb25hbCB0b2tlbiB0byBjb250cm9sIHRoZSBjYW5jZWxsYXRpb24gb2YgdGhlIHN1YnNjcmlwdGlvblxuICAgICAqIEByZXR1cm5zIENhbmNlbGxhdGlvbiBjYWxsYmFjaywgY2FuIGJlIHVzZWQgdG8gY2FuY2VsIHN1YnNjcmlwdGlvbiB3aXRob3V0IGEgY2FuY2VsbGF0aW9uIHRva2VuXG4gICAgICovXG4gICAgbGlzdGVuKGNhbGxiYWNrLCBjYW5jZWxsYXRpb25Ub2tlbikge1xuICAgICAgICBpZiAoZGVidWdfbW9kZV9qc18xLmRlYnVnTW9kZSkge1xuICAgICAgICAgICAgKDAsIGRlYnVnX21vZGVfanNfMS5kZWJ1Z1JlZ2lzdGVyQ29uc3VtZXIpKHRoaXMsIGNhbGxiYWNrLnRvU3RyaW5nKCksIG5ldyBFcnJvcigpLnN0YWNrKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5saXN0ZW5JbnRlcm5hbChjYWxsYmFjaywgY2FuY2VsbGF0aW9uVG9rZW4pO1xuICAgIH1cbiAgICBsaXN0ZW5JbnRlcm5hbChjYWxsYmFjaywgY2FuY2VsbGF0aW9uVG9rZW4sIHBhcmVudCkge1xuICAgICAgICBjb25zdCBjYW5jZWwgPSB0aGlzLnVwZGF0ZUV2ZW50LnN1YnNjcmliZShjYWxsYmFjaywgY2FuY2VsbGF0aW9uVG9rZW4pLmNhbmNlbDtcbiAgICAgICAgcmV0dXJuIGNhbmNlbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU3Vic2NyaWJlcyB0byB0aGUgdXBkYXRlcyBvZiB0aGUgZGF0YSBzdHJlYW0gZm9yIGEgc2luZ2xlIHVwZGF0ZVxuICAgICAqIEBwYXJhbSBjYWxsYmFjayBDYWxsYmFjayB0byBjYWxsIHdoZW4gdmFsdWUgaXMgdXBkYXRlZFxuICAgICAqIEBwYXJhbSBjYW5jZWxsYXRpb25Ub2tlbiBPcHRpb25hbCB0b2tlbiB0byBjb250cm9sIHRoZSBjYW5jZWxsYXRpb24gb2YgdGhlIHN1YnNjcmlwdGlvblxuICAgICAqIEByZXR1cm5zIENhbmNlbGxhdGlvbiBjYWxsYmFjaywgY2FuIGJlIHVzZWQgdG8gY2FuY2VsIHN1YnNjcmlwdGlvbiB3aXRob3V0IGEgY2FuY2VsbGF0aW9uIHRva2VuXG4gICAgICovXG4gICAgbGlzdGVuT25jZShjYWxsYmFjaywgY2FuY2VsbGF0aW9uVG9rZW4pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudXBkYXRlRXZlbnQuc3Vic2NyaWJlT25jZShjYWxsYmFjaywgY2FuY2VsbGF0aW9uVG9rZW4pLmNhbmNlbDtcbiAgICB9XG4gICAgdHJhbnNmb3JtKG9wZXJhdGlvbkEsIG9wZXJhdGlvbkIsIG9wZXJhdGlvbkMsIG9wZXJhdGlvbkQsIG9wZXJhdGlvbkUsIG9wZXJhdGlvbkYsIG9wZXJhdGlvbkcsIG9wZXJhdGlvbkgsIG9wZXJhdGlvbkksIG9wZXJhdGlvbkosIG9wZXJhdGlvbkssIGNhbmNlbGxhdGlvblRva2VuKSB7XG4gICAgICAgIGxldCB0b2tlbjtcbiAgICAgICAgY29uc3Qgb3BlcmF0aW9ucyA9IFtcbiAgICAgICAgICAgIG9wZXJhdGlvbkEsXG4gICAgICAgICAgICBvcGVyYXRpb25CLFxuICAgICAgICAgICAgb3BlcmF0aW9uQyxcbiAgICAgICAgICAgIG9wZXJhdGlvbkQsXG4gICAgICAgICAgICBvcGVyYXRpb25FLFxuICAgICAgICAgICAgb3BlcmF0aW9uRixcbiAgICAgICAgICAgIG9wZXJhdGlvbkcsXG4gICAgICAgICAgICBvcGVyYXRpb25ILFxuICAgICAgICAgICAgb3BlcmF0aW9uSSxcbiAgICAgICAgICAgIG9wZXJhdGlvbkosXG4gICAgICAgICAgICBvcGVyYXRpb25LXG4gICAgICAgIF0uZmlsdGVyKChlKSA9PiBlICYmIChlIGluc3RhbmNlb2YgY2FuY2VsbGF0aW9uX3Rva2VuX2pzXzEuQ2FuY2VsbGF0aW9uVG9rZW4gPyAoKHRva2VuID0gZSksIGZhbHNlKSA6IHRydWUpKTtcbiAgICAgICAgaWYgKGNhbmNlbGxhdGlvblRva2VuKSB7XG4gICAgICAgICAgICB0b2tlbiA9IGNhbmNlbGxhdGlvblRva2VuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBEYXRhU291cmNlKHVuZGVmaW5lZCwgdGhpcy5uYW1lICsgJyAnICsgb3BlcmF0aW9ucy5tYXAoKHYpID0+IHYubmFtZSkuam9pbignICcpKTtcbiAgICAgICAgaWYgKGRlYnVnX21vZGVfanNfMS5kZWJ1Z01vZGUpIHtcbiAgICAgICAgICAgICgwLCBkZWJ1Z19tb2RlX2pzXzEuZGVidWdSZWdpc3RlckxpbmspKHRoaXMsIHJlc3VsdCk7XG4gICAgICAgIH1cbiAgICAgICAgKHRoaXMucHJpbWVkID8gdGhpcy5saXN0ZW5BbmRSZXBlYXRJbnRlcm5hbCA6IHRoaXMubGlzdGVuSW50ZXJuYWwpLmNhbGwodGhpcywgcHJvY2Vzc1RyYW5zZm9ybShvcGVyYXRpb25zLCByZXN1bHQpLCB0b2tlbik7XG4gICAgICAgIHRoaXMub25FcnJvcigoZSkgPT4gcmVzdWx0LmVtaXRFcnJvcihlKSwgdG9rZW4pO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBzdGF0aWMgZnJvbUFnZ3JlZ2F0aW9uKHNvdXJjZXMsIGNvbWJpbmF0b3IsIGNhbmNlbGxhdGlvblRva2VuKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgY2FuY2VsbGF0aW9uVG9rZW4gPSBjYW5jZWxsYXRpb25Ub2tlbiAhPT0gbnVsbCAmJiBjYW5jZWxsYXRpb25Ub2tlbiAhPT0gdm9pZCAwID8gY2FuY2VsbGF0aW9uVG9rZW4gOiBuZXcgY2FuY2VsbGF0aW9uX3Rva2VuX2pzXzEuQ2FuY2VsbGF0aW9uVG9rZW4oKTtcbiAgICAgICAgY29uc3QgYWdncmVnYXRlZFNvdXJjZSA9IG5ldyBEYXRhU291cmNlKGNvbWJpbmF0b3IoLi4uc291cmNlcy5tYXAoKHMpID0+IHMgPT09IG51bGwgfHwgcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogcy52YWx1ZSkpKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzb3VyY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAoX2EgPSBzb3VyY2VzW2ldKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubGlzdGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBhZ2dyZWdhdGVkU291cmNlLnVwZGF0ZShjb21iaW5hdG9yKC4uLnNvdXJjZXMubWFwKChzKSA9PiBzID09PSBudWxsIHx8IHMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHMudmFsdWUpKSk7XG4gICAgICAgICAgICB9LCBjYW5jZWxsYXRpb25Ub2tlbik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFnZ3JlZ2F0ZWRTb3VyY2U7XG4gICAgfVxuICAgIGFnZ3JlZ2F0ZShvdGhlclNvdXJjZXMsIGNvbWJpbmF0b3IsIGNhbmNlbGxhdGlvblRva2VuKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgY2FuY2VsbGF0aW9uVG9rZW4gPSBjYW5jZWxsYXRpb25Ub2tlbiAhPT0gbnVsbCAmJiBjYW5jZWxsYXRpb25Ub2tlbiAhPT0gdm9pZCAwID8gY2FuY2VsbGF0aW9uVG9rZW4gOiBuZXcgY2FuY2VsbGF0aW9uX3Rva2VuX2pzXzEuQ2FuY2VsbGF0aW9uVG9rZW4oKTtcbiAgICAgICAgY29uc3QgYWdncmVnYXRlZFNvdXJjZSA9IG5ldyBEYXRhU291cmNlKGNvbWJpbmF0b3IodGhpcy52YWx1ZSwgLi4ub3RoZXJTb3VyY2VzLm1hcCgocykgPT4gcyA9PT0gbnVsbCB8fCBzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzLnZhbHVlKSkpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG90aGVyU291cmNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgKF9hID0gb3RoZXJTb3VyY2VzW2ldKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubGlzdGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBhZ2dyZWdhdGVkU291cmNlLnVwZGF0ZShjb21iaW5hdG9yKHRoaXMudmFsdWUsIC4uLm90aGVyU291cmNlcy5tYXAoKHMpID0+IHMgPT09IG51bGwgfHwgcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogcy52YWx1ZSkpKTtcbiAgICAgICAgICAgIH0sIGNhbmNlbGxhdGlvblRva2VuKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxpc3RlbigoKSA9PiBhZ2dyZWdhdGVkU291cmNlLnVwZGF0ZShjb21iaW5hdG9yKHRoaXMudmFsdWUsIC4uLm90aGVyU291cmNlcy5tYXAoKHMpID0+IHMgPT09IG51bGwgfHwgcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogcy52YWx1ZSkpKSwgY2FuY2VsbGF0aW9uVG9rZW4pO1xuICAgICAgICByZXR1cm4gYWdncmVnYXRlZFNvdXJjZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRm9yd2FyZHMgYWxsIHVwZGF0ZXMgZnJvbSB0aGlzIHNvdXJjZSB0byBhbm90aGVyXG4gICAgICogQHBhcmFtIHRhcmdldERhdGFTb3VyY2UgZGF0YXNvdXJjZSB0byBwaXBlIHRoZSB1cGRhdGVzIHRvXG4gICAgICogQHBhcmFtIGNhbmNlbGxhdGlvblRva2VuICBDYW5jZWxsYXRpb24gdG9rZW4gdG8gY2FuY2VsIHRoZSBzdWJzY3JpcHRpb24gdGhlIHRhcmdldCBkYXRhc291cmNlIGhhcyB0byB0aGlzIGRhdGFzb3VyY2VcbiAgICAgKi9cbiAgICBwaXBlKHRhcmdldERhdGFTb3VyY2UsIGNhbmNlbGxhdGlvblRva2VuKSB7XG4gICAgICAgIHRoaXMubGlzdGVuKCh2KSA9PiB0YXJnZXREYXRhU291cmNlLnVwZGF0ZSh2KSwgY2FuY2VsbGF0aW9uVG9rZW4pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogTGlrZSBhZ2dyZWdhdGUgZXhjZXB0IHRoYXQgaXQgYWdncmVnYXRlcyBhbiBhcnJheSBkYXRhIHNvdXJjZSBvZiBkYXRhc291cmNlc1xuICAgICAqIEBwYXJhbSBkYXRhIFNlY29uZCBwYXJlbnQgZm9yIHRoZSBuZXcgc291cmNlXG4gICAgICogQHBhcmFtIGNhbmNlbGxhdGlvblRva2VuICBDYW5jZWxsYXRpb24gdG9rZW4gdG8gY2FuY2VsIHRoZSBzdWJzY3JpcHRpb25zIHRoZSBuZXcgZGF0YXNvdXJjZSBoYXMgdG8gdGhlIHR3byBwYXJlbnQgZGF0YXNvdXJjZXNcbiAgICAgKi9cbiAgICBzdGF0aWMgZHluYW1pY0FnZ3JlZ2F0aW9uKGRhdGEsIGFnZ3JlZ2F0ZSwgY2FuY2VsbGF0aW9uVG9rZW4pIHtcbiAgICAgICAgY2FuY2VsbGF0aW9uVG9rZW4gPSBjYW5jZWxsYXRpb25Ub2tlbiAhPT0gbnVsbCAmJiBjYW5jZWxsYXRpb25Ub2tlbiAhPT0gdm9pZCAwID8gY2FuY2VsbGF0aW9uVG9rZW4gOiBuZXcgY2FuY2VsbGF0aW9uX3Rva2VuX2pzXzEuQ2FuY2VsbGF0aW9uVG9rZW4oKTtcbiAgICAgICAgY29uc3Qgc2Vzc2lvbiA9IG5ldyBXZWFrTWFwKCk7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBEYXRhU291cmNlKCk7XG4gICAgICAgIGRhdGEubGlzdGVuQW5kUmVwZWF0KChjaGFuZ2UpID0+IHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBjaGFuZ2UuaXRlbXMpIHtcbiAgICAgICAgICAgICAgICBsaXN0ZW5Ub1N1YlNvdXJjZShpdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc3VsdC51cGRhdGUoYWdncmVnYXRlKGRhdGEuZ2V0RGF0YSgpLm1hcCgoZSkgPT4gZS52YWx1ZSkpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGRhdGEub25JdGVtc0FkZGVkLnN1YnNjcmliZSgoaXRlbXMpID0+IHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcykge1xuICAgICAgICAgICAgICAgIGxpc3RlblRvU3ViU291cmNlKGl0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgZGF0YS5vbkl0ZW1zUmVtb3ZlZC5zdWJzY3JpYmUoKGl0ZW1zKSA9PiB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICAgICAgICAgICAgICBzZXNzaW9uLmdldChpdGVtKS5jYW5jZWwoKTtcbiAgICAgICAgICAgICAgICBzZXNzaW9uLmRlbGV0ZShpdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIGZ1bmN0aW9uIGxpc3RlblRvU3ViU291cmNlKGl0ZW0pIHtcbiAgICAgICAgICAgIHNlc3Npb24uc2V0KGl0ZW0sIG5ldyBjYW5jZWxsYXRpb25fdG9rZW5fanNfMS5DYW5jZWxsYXRpb25Ub2tlbigpKTtcbiAgICAgICAgICAgIGl0ZW0ubGlzdGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICByZXN1bHQudXBkYXRlKGFnZ3JlZ2F0ZShkYXRhLmdldERhdGEoKS5tYXAoKGUpID0+IGUudmFsdWUpKSk7XG4gICAgICAgICAgICB9LCBzZXNzaW9uLmdldChpdGVtKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogTGlrZSBhZ2dyZWdhdGUgZXhjZXB0IHRoYXQgbm8gY29tYmluYXRpb24gbWV0aG9kIGlzIG5lZWRlZCBhcyBhIHJlc3VsdCBib3RoIHBhcmVudHMgbXVzdCBoYXZlIHRoZSBzYW1lIHR5cGUgYW5kIHRoZSBuZXcgc3RyZWFtIGp1c3QgZXhwb3NlcyB0aGUgbGFzdCB1cGRhdGUgcmVjaWV2ZWQgZnJvbSBlaXRoZXIgcGFyZW50XG4gICAgICogQHBhcmFtIG90aGVyU291cmNlIFNlY29uZCBwYXJlbnQgZm9yIHRoZSBuZXcgc291cmNlXG4gICAgICogQHBhcmFtIGNhbmNlbGxhdGlvblRva2VuICBDYW5jZWxsYXRpb24gdG9rZW4gdG8gY2FuY2VsIHRoZSBzdWJzY3JpcHRpb25zIHRoZSBuZXcgZGF0YXNvdXJjZSBoYXMgdG8gdGhlIHR3byBwYXJlbnQgZGF0YXNvdXJjZXNcbiAgICAgKi9cbiAgICBjb21iaW5lKG90aGVyU291cmNlcywgY2FuY2VsbGF0aW9uVG9rZW4pIHtcbiAgICAgICAgY2FuY2VsbGF0aW9uVG9rZW4gPSBjYW5jZWxsYXRpb25Ub2tlbiAhPT0gbnVsbCAmJiBjYW5jZWxsYXRpb25Ub2tlbiAhPT0gdm9pZCAwID8gY2FuY2VsbGF0aW9uVG9rZW4gOiBuZXcgY2FuY2VsbGF0aW9uX3Rva2VuX2pzXzEuQ2FuY2VsbGF0aW9uVG9rZW4oKTtcbiAgICAgICAgbGV0IGNvbWJpbmVkRGF0YVNvdXJjZTtcbiAgICAgICAgaWYgKHRoaXMucHJpbWVkKSB7XG4gICAgICAgICAgICBjb21iaW5lZERhdGFTb3VyY2UgPSBuZXcgRGF0YVNvdXJjZSh0aGlzLnZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbWJpbmVkRGF0YVNvdXJjZSA9IG5ldyBEYXRhU291cmNlKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5waXBlKGNvbWJpbmVkRGF0YVNvdXJjZSwgY2FuY2VsbGF0aW9uVG9rZW4pO1xuICAgICAgICBmb3IgKGNvbnN0IG90aGVyU291cmNlIG9mIG90aGVyU291cmNlcykge1xuICAgICAgICAgICAgb3RoZXJTb3VyY2UucGlwZShjb21iaW5lZERhdGFTb3VyY2UsIGNhbmNlbGxhdGlvblRva2VuKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29tYmluZWREYXRhU291cmNlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIG5leHQgdXBkYXRlIG9jY3Vyc1xuICAgICAqIEBwYXJhbSBjYW5jZWxsYXRpb25Ub2tlblxuICAgICAqL1xuICAgIGF3YWl0TmV4dFVwZGF0ZShjYW5jZWxsYXRpb25Ub2tlbikge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgIHRoaXMubGlzdGVuT25jZSgodmFsdWUpID0+IHJlc29sdmUodmFsdWUpLCBjYW5jZWxsYXRpb25Ub2tlbik7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgYWxsIGxpc3RlbmVyc1xuICAgICAqL1xuICAgIGNhbmNlbEFsbCgpIHtcbiAgICAgICAgdGhpcy51cGRhdGVFdmVudC5jYW5jZWxBbGwoKTtcbiAgICB9XG59XG5leHBvcnRzLkRhdGFTb3VyY2UgPSBEYXRhU291cmNlO1xuY2xhc3MgQXJyYXlEYXRhU291cmNlIHtcbiAgICBjb25zdHJ1Y3Rvcihpbml0aWFsRGF0YSwgbmFtZSA9ICdSb290QXJyYXlEYXRhU291cmNlJykge1xuICAgICAgICB0aGlzLm9uSXRlbXNBZGRlZCA9IG5ldyBldmVudF9lbWl0dGVyX2pzXzEuRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIHRoaXMub25JdGVtc1JlbW92ZWQgPSBuZXcgZXZlbnRfZW1pdHRlcl9qc18xLkV2ZW50RW1pdHRlcigpO1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICBpZiAoaW5pdGlhbERhdGEpIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YSA9IGluaXRpYWxEYXRhLnNsaWNlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmRhdGEgPSBbXTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxlbmd0aFNvdXJjZSA9IG5ldyBEYXRhU291cmNlKHRoaXMuZGF0YS5sZW5ndGgsIHRoaXMubmFtZSArICcubGVuZ3RoJyk7XG4gICAgICAgIHRoaXMudXBkYXRlRXZlbnQgPSBuZXcgZXZlbnRfZW1pdHRlcl9qc18xLkV2ZW50RW1pdHRlcigpO1xuICAgIH1cbiAgICAqW1N5bWJvbC5pdGVyYXRvcl0oKSB7XG4gICAgICAgIHlpZWxkKiB0aGlzLmdldERhdGEoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0b1NldERhdGFTb3VyY2UoY2FuY2VsbGF0aW9uVG9rZW4pIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gbmV3IFNldERhdGFTb3VyY2UoKTtcbiAgICAgICAgdGhpcy5saXN0ZW5BbmRSZXBlYXQoKGNoYW5nZSkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoIChjaGFuZ2Uub3BlcmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnYWRkJzpcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIGNoYW5nZS5pdGVtcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmFkZChpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdyZW1vdmUnOlxuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgY2hhbmdlLml0ZW1zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaW5jbHVkZXMoaXRlbSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuZGVsZXRlKGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3JlcGxhY2UnOlxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaW5jbHVkZXMoY2hhbmdlLnRhcmdldCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5kZWxldGUoY2hhbmdlLnRhcmdldCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIGNoYW5nZS5pdGVtcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmFkZChpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdtZXJnZSc6XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5jbGVhcigpO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgY2hhbmdlLml0ZW1zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuYWRkKGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBjYW5jZWxsYXRpb25Ub2tlbik7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIHRvU3RyaW5nKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIHN0YXRpYyBmcm9tRmV0Y2hUZXh0KHJlc3BvbnNlLCBjb25maWcgPSB7IGl0ZW1TZXBlcmF0b3JTZXF1ZW5jZTogJ1xcbicgfSkge1xuICAgICAgICBjb25zdCBkZWNvZGVyID0gbmV3IFRleHREZWNvZGVyKCd1dGYtOCcpO1xuICAgICAgICBjb25zdCBzdHJlYW0gPSBuZXcgQXJyYXlEYXRhU291cmNlKCk7XG4gICAgICAgIGNvbnN0IHsgb25Db21wbGV0ZSwgaXRlbVNlcGVyYXRvclNlcXVlbmNlIH0gPSBjb25maWc7XG4gICAgICAgIGxldCBidWZmZXIgPSAnJztcbiAgICAgICAgY29uc3QgcmVhZGVyU3RyZWFtID0gcmVzcG9uc2UuYm9keS5nZXRSZWFkZXIoKTtcbiAgICAgICAgZnVuY3Rpb24gcmVhZChyZWFkZXIpIHtcbiAgICAgICAgICAgIHJlYWRlci5yZWFkKCkudGhlbigoeyBkb25lLCB2YWx1ZSB9KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFkb25lKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSAoYnVmZmVyICsgZGVjb2Rlci5kZWNvZGUodmFsdWUpKS5zcGxpdChpdGVtU2VwZXJhdG9yU2VxdWVuY2UpO1xuICAgICAgICAgICAgICAgICAgICBidWZmZXIgPSBkYXRhLnNwbGljZShkYXRhLmxlbmd0aCAtIDEsIDEpWzBdO1xuICAgICAgICAgICAgICAgICAgICBzdHJlYW0uYXBwZW5kQXJyYXkoZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIHJlYWQocmVhZGVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChidWZmZXIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJlYW0ucHVzaChidWZmZXIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIG9uQ29tcGxldGUgPT09IG51bGwgfHwgb25Db21wbGV0ZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogb25Db21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJlYWQocmVhZGVyU3RyZWFtKTtcbiAgICAgICAgcmV0dXJuIHN0cmVhbTtcbiAgICB9XG4gICAgc3RhdGljIGZyb21GZXRjaEpTT04ocmVzcG9uc2UsIGNvbmZpZyA9IHtcbiAgICAgICAgaXRlbVNlcGVyYXRvclNlcXVlbmNlOiAnXFxuJ1xuICAgIH0pIHtcbiAgICAgICAgY29uc3QgZGVjb2RlciA9IG5ldyBUZXh0RGVjb2RlcigndXRmLTgnKTtcbiAgICAgICAgY29uc3Qgc3RyZWFtID0gbmV3IEFycmF5RGF0YVNvdXJjZSgpO1xuICAgICAgICBjb25zdCB7IG9uUGFyc2VFcnJvciwgb25Db21wbGV0ZSwgaXRlbVNlcGVyYXRvclNlcXVlbmNlIH0gPSBjb25maWc7XG4gICAgICAgIGxldCBidWZmZXIgPSAnJztcbiAgICAgICAgY29uc3QgcmVhZGVyU3RyZWFtID0gcmVzcG9uc2UuYm9keS5nZXRSZWFkZXIoKTtcbiAgICAgICAgZnVuY3Rpb24gcmVhZChyZWFkZXIpIHtcbiAgICAgICAgICAgIHJlYWRlci5yZWFkKCkudGhlbigoeyBkb25lLCB2YWx1ZSB9KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFkb25lKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSAoYnVmZmVyICsgZGVjb2Rlci5kZWNvZGUodmFsdWUpKS5zcGxpdChpdGVtU2VwZXJhdG9yU2VxdWVuY2UpO1xuICAgICAgICAgICAgICAgICAgICBidWZmZXIgPSBkYXRhLnNwbGljZShkYXRhLmxlbmd0aCAtIDEsIDEpWzBdO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VBbmRQdXNoKGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJlYWQocmVhZGVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChidWZmZXIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJzZUFuZFB1c2goYnVmZmVyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBvbkNvbXBsZXRlID09PSBudWxsIHx8IG9uQ29tcGxldGUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9uQ29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZWFkKHJlYWRlclN0cmVhbSk7XG4gICAgICAgIGZ1bmN0aW9uIHBhcnNlQW5kUHVzaChpdGVtKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHN0cmVhbS5wdXNoKEpTT04ucGFyc2UoaXRlbSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBzdHJlYW0ucHVzaChvblBhcnNlRXJyb3IoaXRlbSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBJZ25vcmUgaXRlbSBpZiBpdCBjYW4ndCBiZSBwYXJzZWQgYW5kL29yIG5vIGVycm9yIGhhbmRsZXIgaXMgcHJvdmlkZWRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0cmVhbTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ29ubmVjdHMgdG8gYW4gYXVydW0tc2VydmVyIGV4cG9zZWQgYXJyYXkgZGF0YXNvdXJjZS4gVmlldyBodHRwczovL2dpdGh1Yi5jb20vQ3liZXJQaG9lbml4OTAvYXVydW0tc2VydmVyIGZvciBtb3JlIGluZm9ybWF0aW9uXG4gICAgICogTm90ZSB0aGF0IHR5cGUgc2FmZXR5IGlzIG5vdCBndWFyYW50ZWVkLiBXaGF0ZXZlciB0aGUgc2VydmVyIHNlbmRzIGFzIGFuIHVwZGF0ZSB3aWxsIGJlIHByb3BhZ2F0ZWRcbiAgICAgKiBAcGFyYW0gIHtBdXJ1bVNlcnZlckluZm99IGF1cnVtU2VydmVySW5mb1xuICAgICAqIEByZXR1cm5zIERhdGFTb3VyY2VcbiAgICAgKi9cbiAgICBzdGF0aWMgZnJvbVJlbW90ZVNvdXJjZShhdXJ1bVNlcnZlckluZm8sIGNhbmNlbGxhdGlvbikge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBuZXcgQXJyYXlEYXRhU291cmNlKCk7XG4gICAgICAgICgwLCBhdXJ1bV9zZXJ2ZXJfY2xpZW50X2pzXzEuc3luY0FycmF5RGF0YVNvdXJjZSkocmVzdWx0LCBhdXJ1bVNlcnZlckluZm8sIGNhbmNlbGxhdGlvbik7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIHN0YXRpYyBmcm9tTXVsdGlwbGVTb3VyY2VzKHNvdXJjZXMsIGNhbmNlbGxhdGlvblRva2VuKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgY29uc3QgYm91bmRhcmllcyA9IFswXTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gbmV3IEFycmF5RGF0YVNvdXJjZSh1bmRlZmluZWQsIGBBcnJheURhdGFTb3VyY2Ugb2YgKCR7c291cmNlcy5yZWR1Y2UoKHAsIGMpID0+IHAgKyAoYyBpbnN0YW5jZW9mIEFycmF5RGF0YVNvdXJjZSA/IGMubmFtZSArICcgJyA6ICcnKSwgJycpfSlgKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzb3VyY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBpdGVtID0gc291cmNlc1tpXTtcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGl0ZW0pKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LmFwcGVuZEFycmF5KGl0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoaXRlbSBpbnN0YW5jZW9mIERhdGFTb3VyY2UgfHwgaXRlbSBpbnN0YW5jZW9mIGR1cGxleF9kYXRhX3NvdXJjZV9qc18xLkR1cGxleERhdGFTb3VyY2UgfHwgaXRlbSBpbnN0YW5jZW9mIHN0cmVhbV9qc18xLlN0cmVhbSkge1xuICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgaXRlbS50cmFuc2Zvcm0oKDAsIGRhdGFfc291cmNlX29wZXJhdG9yc19qc18xLmRzRGlmZikoKSwgKDAsIGRhdGFfc291cmNlX29wZXJhdG9yc19qc18xLmRzVGFwKSgoeyBuZXdWYWx1ZSwgb2xkVmFsdWUgfSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2l6ZURpZmYgPSAwO1xuICAgICAgICAgICAgICAgICAgICBsZXQgb2xkU2l6ZSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXdTaXplID0gMDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkob2xkVmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvbGRTaXplID0gb2xkVmFsdWUubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZURpZmYgLT0gb2xkVmFsdWUubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKG9sZFZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9sZFNpemUgPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZURpZmYtLTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShuZXdWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpemVEaWZmICs9IG5ld1ZhbHVlLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1NpemUgPSBuZXdWYWx1ZS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAobmV3VmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZURpZmYrKztcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1NpemUgPSAxO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KG5ld1ZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXdWYWx1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpIDwgb2xkU2l6ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuc2V0KGJvdW5kYXJpZXNbaW5kZXhdICsgaSwgbmV3VmFsdWVbaV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0Lmluc2VydEF0KGJvdW5kYXJpZXNbaW5kZXhdICsgaSwgbmV3VmFsdWVbaV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChuZXdWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV3U2l6ZSA8PSBvbGRTaXplKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnNldChib3VuZGFyaWVzW2luZGV4XSwgbmV3VmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0Lmluc2VydEF0KGJvdW5kYXJpZXNbaW5kZXhdLCBuZXdWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvbGRTaXplIC0gbmV3U2l6ZTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQucmVtb3ZlQXQoYm91bmRhcmllc1tpbmRleF0gKyBuZXdTaXplKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gaW5kZXggKyAxOyBpIDwgYm91bmRhcmllcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgYm91bmRhcmllc1tpXSArPSBzaXplRGlmZjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pLCBjYW5jZWxsYXRpb25Ub2tlbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXN1bHQuYXBwZW5kQXJyYXkoKF9hID0gc291cmNlc1tpXS5kYXRhKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBbXSk7XG4gICAgICAgICAgICAgICAgbGV0IGluZGV4ID0gaTtcbiAgICAgICAgICAgICAgICBzb3VyY2VzW2ldLmxpc3RlbigoY2hhbmdlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoY2hhbmdlLm9wZXJhdGlvbkRldGFpbGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdhcHBlbmQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAncHJlcGVuZCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdpbnNlcnQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5pbnNlcnRBdChjaGFuZ2UuaW5kZXggKyBib3VuZGFyaWVzW2luZGV4XSwgLi4uY2hhbmdlLml0ZW1zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gaW5kZXggKyAxOyBpIDwgYm91bmRhcmllcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3VuZGFyaWVzW2ldICs9IGNoYW5nZS5jb3VudDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdyZW1vdmUnOlxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAncmVtb3ZlTGVmdCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdyZW1vdmVSaWdodCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdjbGVhcic6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnJlbW92ZVJhbmdlKGNoYW5nZS5pbmRleCArIGJvdW5kYXJpZXNbaW5kZXhdLCBjaGFuZ2UuaW5kZXggKyBib3VuZGFyaWVzW2luZGV4XSArIGNoYW5nZS5jb3VudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IGluZGV4ICsgMTsgaSA8IGJvdW5kYXJpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm91bmRhcmllc1tpXSAtPSBjaGFuZ2UuY291bnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnbWVyZ2UnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxlbmd0aERpZmYgPSBjaGFuZ2UubmV3U3RhdGUubGVuZ3RoICsgY2hhbmdlLnByZXZpb3VzU3RhdGUubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5yZW1vdmVSYW5nZShjaGFuZ2UuaW5kZXggKyBib3VuZGFyaWVzW2luZGV4XSwgY2hhbmdlLmluZGV4ICsgYm91bmRhcmllc1tpbmRleF0gKyBjaGFuZ2UucHJldmlvdXNTdGF0ZS5sZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5pbnNlcnRBdChjaGFuZ2UuaW5kZXggKyBib3VuZGFyaWVzW2luZGV4XSwgLi4uY2hhbmdlLm5ld1N0YXRlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGVuZ3RoRGlmZiAhPSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSBpbmRleCArIDE7IGkgPCBib3VuZGFyaWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3VuZGFyaWVzW2ldICs9IGxlbmd0aERpZmY7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdyZXBsYWNlJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuc2V0KGNoYW5nZS5pbmRleCArIGJvdW5kYXJpZXNbaW5kZXhdLCBjaGFuZ2UuaXRlbXNbMF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnc3dhcCc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnN3YXAoY2hhbmdlLmluZGV4ICsgYm91bmRhcmllc1tpbmRleF0sIGNoYW5nZS5pbmRleDIgKyBib3VuZGFyaWVzW2luZGV4XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCBjYW5jZWxsYXRpb25Ub2tlbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBib3VuZGFyaWVzLnB1c2gocmVzdWx0Lmxlbmd0aC52YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBhcnJheSBkYXRhIHNvdXJjZSB3aGVyZSB0aGUgdHlwZSBUIGlzIG5vIGxvbmdlciB3cmFwcGVkIGJ5IGEgRGF0YVNvdXJjZSBob3dldmVyIHRoZSB2YWx1ZXMgb2YgdGhlc2UgZGF0YSBzb3VyY2VzIGFyZSBvYnNlcnZlZCBvbiB0aGUgcGFyZW50XG4gICAgICogYXJyYXkgZGF0YSBzb3VyY2UgYW5kIGNoYW5nZXMgYXJlIGZvcndhcmRlZCB0byB0aGUgbmV3IGFycmF5IGRhdGEgc291cmNlIHRocm91Z2ggYXJyYXkgbXV0YXRpb25zLiBUaGlzIG1ha2VzIGl0IHBvc3NpYmxlIHRvIHVzZSB2aWV3IG1ldGhvZHMgc3VjaCBhcyBtYXAgYW5kIGZpbHRlclxuICAgICAqIG9uIHRoZSByYXcgZGF0YSBpbnN0ZWFkIG9mIG9uIGRhdGEgc291cmNlcyB0byBjb3ZlciBoaWdobHkgZHluYW1pYyB1c2UgY2FzZXNcbiAgICAgKi9cbiAgICBzdGF0aWMgRHluYW1pY0FycmF5RGF0YVNvdXJjZVRvQXJyYXlEYXRhU291cmNlKGFycmF5RGF0YVNvdXJjZSwgY2FuY2VsbGF0aW9uKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBBcnJheURhdGFTb3VyY2UoKTtcbiAgICAgICAgY29uc3Qgc2Vzc2lvbiA9IG5ldyBXZWFrTWFwKCk7XG4gICAgICAgIGFycmF5RGF0YVNvdXJjZS5saXN0ZW5BbmRSZXBlYXQoKHsgb3BlcmF0aW9uRGV0YWlsZWQsIGluZGV4LCBpbmRleDIsIGNvdW50LCBpdGVtcywgcHJldmlvdXNTdGF0ZSwgbmV3U3RhdGUsIHRhcmdldCB9KSA9PiB7XG4gICAgICAgICAgICBzd2l0Y2ggKG9wZXJhdGlvbkRldGFpbGVkKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnYXBwZW5kJzpcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaXN0ZW5Ub0l0ZW0oaXRlbSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmFwcGVuZEFycmF5KGl0ZW1zLm1hcCgoaXRlbSkgPT4gKDAsIGF1cnVtanNfanNfMS5nZXRWYWx1ZU9mKShpdGVtKSkpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdwcmVwZW5kJzpcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaXN0ZW5Ub0l0ZW0oaXRlbSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnVuc2hpZnQoLi4uaXRlbXMubWFwKChpdGVtKSA9PiAoMCwgYXVydW1qc19qc18xLmdldFZhbHVlT2YpKGl0ZW0pKSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ21lcmdlJzpcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIHByZXZpb3VzU3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0b3BMaXRlblRvSXRlbShpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgbmV3U3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpc3RlblRvSXRlbShpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXN1bHQubWVyZ2UobmV3U3RhdGUubWFwKChpKSA9PiAoMCwgYXVydW1qc19qc18xLmdldFZhbHVlT2YpKGkpKSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2luc2VydCc6XG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGlzdGVuVG9JdGVtKGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5pbnNlcnRBdChpbmRleCwgLi4uaXRlbXMubWFwKChpdGVtKSA9PiAoMCwgYXVydW1qc19qc18xLmdldFZhbHVlT2YpKGl0ZW0pKSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2NsZWFyJzpcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIHByZXZpb3VzU3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0b3BMaXRlblRvSXRlbShpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXN1bHQuY2xlYXIoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAncmVtb3ZlJzpcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdG9wTGl0ZW5Ub0l0ZW0oaXRlbSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnJlbW92ZVJhbmdlKGluZGV4LCBpbmRleCArIGNvdW50KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAncmVtb3ZlTGVmdCc6XG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RvcExpdGVuVG9JdGVtKGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5yZW1vdmVMZWZ0KGNvdW50KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAncmVtb3ZlUmlnaHQnOlxuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0b3BMaXRlblRvSXRlbShpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXN1bHQucmVtb3ZlUmlnaHQoY291bnQpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdyZXBsYWNlJzpcbiAgICAgICAgICAgICAgICAgICAgc3RvcExpdGVuVG9JdGVtKHRhcmdldCk7XG4gICAgICAgICAgICAgICAgICAgIGxpc3RlblRvSXRlbShpdGVtc1swXSk7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5zZXQoaW5kZXgsICgwLCBhdXJ1bWpzX2pzXzEuZ2V0VmFsdWVPZikoaXRlbXNbMF0pKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnc3dhcCc6XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5zd2FwKGluZGV4LCBpbmRleDIpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgY2FuY2VsbGF0aW9uKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgZnVuY3Rpb24gbGlzdGVuVG9JdGVtKGl0ZW0pIHtcbiAgICAgICAgICAgIGlmICghKCdsaXN0ZW4nIGluIGl0ZW0pKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2Vzc2lvbi5zZXQoaXRlbSwgbmV3IGNhbmNlbGxhdGlvbl90b2tlbl9qc18xLkNhbmNlbGxhdGlvblRva2VuKCkpO1xuICAgICAgICAgICAgY2FuY2VsbGF0aW9uLmNoYWluKHNlc3Npb24uZ2V0KGl0ZW0pKTtcbiAgICAgICAgICAgIGl0ZW0ubGlzdGVuKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5zZXQoYXJyYXlEYXRhU291cmNlLmluZGV4T2YoaXRlbSksIHZhbHVlKTtcbiAgICAgICAgICAgIH0sIHNlc3Npb24uZ2V0KGl0ZW0pKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBzdG9wTGl0ZW5Ub0l0ZW0oaXRlbSkge1xuICAgICAgICAgICAgaWYgKHNlc3Npb24uaGFzKGl0ZW0pKSB7XG4gICAgICAgICAgICAgICAgc2Vzc2lvbi5nZXQoaXRlbSkuY2FuY2VsKCk7XG4gICAgICAgICAgICAgICAgc2Vzc2lvbi5kZWxldGUoaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhdGljIHRvQXJyYXlEYXRhU291cmNlKHZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEFycmF5RGF0YVNvdXJjZSkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBBcnJheURhdGFTb3VyY2UodmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHBpcGUodGFyZ2V0LCBjYW5jZWxsYXRpb24pIHtcbiAgICAgICAgdGhpcy5saXN0ZW5BbmRSZXBlYXQoKGMpID0+IHRhcmdldC5hcHBseUNvbGxlY3Rpb25DaGFuZ2UoYyksIGNhbmNlbGxhdGlvbik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlbW92ZSBhbGwgbGlzdGVuZXJzXG4gICAgICovXG4gICAgY2FuY2VsQWxsKCkge1xuICAgICAgICB0aGlzLm9uSXRlbXNBZGRlZC5jYW5jZWxBbGwoKTtcbiAgICAgICAgdGhpcy5vbkl0ZW1zUmVtb3ZlZC5jYW5jZWxBbGwoKTtcbiAgICAgICAgdGhpcy51cGRhdGVFdmVudC5jYW5jZWxBbGwoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2FtZSBhcyBsaXN0ZW4gYnV0IHdpbGwgaW1tZWRpYXRlbHkgY2FsbCB0aGUgY2FsbGJhY2sgd2l0aCBhbiBhcHBlbmQgb2YgYWxsIGV4aXN0aW5nIGVsZW1lbnRzIGZpcnN0XG4gICAgICovXG4gICAgbGlzdGVuQW5kUmVwZWF0KGNhbGxiYWNrLCBjYW5jZWxsYXRpb25Ub2tlbikge1xuICAgICAgICBpZiAodGhpcy5kYXRhLmxlbmd0aCkge1xuICAgICAgICAgICAgY2FsbGJhY2soe1xuICAgICAgICAgICAgICAgIG9wZXJhdGlvbjogJ2FkZCcsXG4gICAgICAgICAgICAgICAgb3BlcmF0aW9uRGV0YWlsZWQ6ICdhcHBlbmQnLFxuICAgICAgICAgICAgICAgIGluZGV4OiAwLFxuICAgICAgICAgICAgICAgIGl0ZW1zOiB0aGlzLmRhdGEsXG4gICAgICAgICAgICAgICAgbmV3U3RhdGU6IHRoaXMuZGF0YSxcbiAgICAgICAgICAgICAgICBjb3VudDogdGhpcy5kYXRhLmxlbmd0aFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdGVuKGNhbGxiYWNrLCBjYW5jZWxsYXRpb25Ub2tlbik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNlbmRzIGEgcmVzZXQgc2lnbmFsIGZvbGxvd2VkIGJ5IGFuIGFwcGVuZCB3aXRoIGFsbCBpdGVtcyBzaWduYWwuIFRoaXMgd2lsbCBmb3JjZSBhbGwgdGhlIHZpZXdzIG9mIHRoaXMgc291cmNlIHRoZSBzeW5jaHJvbml6ZSBjYW4gYmUgdXNlZnVsIGluIGNhc2UgeW91ciB2aWV3cyByZWx5IG9uIG5vbiBwdXJlIHRyYW5zZm9ybWF0aW9uIGZ1bmN0aW9ucy5cbiAgICAgKi9cbiAgICByZXBlYXRDdXJyZW50U3RhdGUoKSB7XG4gICAgICAgIHRoaXMudXBkYXRlKHtcbiAgICAgICAgICAgIG9wZXJhdGlvbjogJ3JlbW92ZScsXG4gICAgICAgICAgICBvcGVyYXRpb25EZXRhaWxlZDogJ2NsZWFyJyxcbiAgICAgICAgICAgIGNvdW50OiB0aGlzLmRhdGEubGVuZ3RoLFxuICAgICAgICAgICAgaW5kZXg6IDAsXG4gICAgICAgICAgICBpdGVtczogdGhpcy5kYXRhLFxuICAgICAgICAgICAgbmV3U3RhdGU6IFtdXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnVwZGF0ZSh7XG4gICAgICAgICAgICBvcGVyYXRpb246ICdhZGQnLFxuICAgICAgICAgICAgb3BlcmF0aW9uRGV0YWlsZWQ6ICdhcHBlbmQnLFxuICAgICAgICAgICAgaW5kZXg6IDAsXG4gICAgICAgICAgICBpdGVtczogdGhpcy5kYXRhLFxuICAgICAgICAgICAgbmV3U3RhdGU6IHRoaXMuZGF0YSxcbiAgICAgICAgICAgIGNvdW50OiB0aGlzLmRhdGEubGVuZ3RoXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBsaXN0ZW4oY2FsbGJhY2ssIGNhbmNlbGxhdGlvblRva2VuKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnVwZGF0ZUV2ZW50LnN1YnNjcmliZShjYWxsYmFjaywgY2FuY2VsbGF0aW9uVG9rZW4pLmNhbmNlbDtcbiAgICB9XG4gICAgbGlzdGVuT25jZShjYWxsYmFjaywgY2FuY2VsbGF0aW9uVG9rZW4pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudXBkYXRlRXZlbnQuc3Vic2NyaWJlT25jZShjYWxsYmFjaywgY2FuY2VsbGF0aW9uVG9rZW4pLmNhbmNlbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQXBwbGllcyB0aGUgY2hhbmdlcyBkZXNjcmliZWQgaW4gdGhlIGNvbGxlY2l0b24gY2hhbmdlIHRvIHRoZSBhcnJheS4gVXNlZnVsIGZvciBzeW5jaHJvbml6aW5nIGFycmF5IGRhdGEgc291cmNlcyBvdmVyIHRoZSBuZXR3b3JrIG9yIHdvcmtlcnMgYnkgc2VyaWFsaXppbmcgdGhlIGNoYW5nZXMgYW5kIHNlbmRpbmcgdGhlbSBvdmVyXG4gICAgICogQHBhcmFtIGNvbGxlY3Rpb25DaGFuZ2VcbiAgICAgKi9cbiAgICBhcHBseUNvbGxlY3Rpb25DaGFuZ2UoY29sbGVjdGlvbkNoYW5nZSkge1xuICAgICAgICBzd2l0Y2ggKGNvbGxlY3Rpb25DaGFuZ2Uub3BlcmF0aW9uRGV0YWlsZWQpIHtcbiAgICAgICAgICAgIGNhc2UgJ2FwcGVuZCc6XG4gICAgICAgICAgICAgICAgdGhpcy5hcHBlbmRBcnJheShjb2xsZWN0aW9uQ2hhbmdlLml0ZW1zKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2NsZWFyJzpcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdpbnNlcnQnOlxuICAgICAgICAgICAgICAgIHRoaXMuaW5zZXJ0QXQoY29sbGVjdGlvbkNoYW5nZS5pbmRleCwgLi4uY29sbGVjdGlvbkNoYW5nZS5pdGVtcyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdtZXJnZSc6XG4gICAgICAgICAgICAgICAgdGhpcy5tZXJnZShjb2xsZWN0aW9uQ2hhbmdlLml0ZW1zKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3ByZXBlbmQnOlxuICAgICAgICAgICAgICAgIHRoaXMudW5zaGlmdCguLi5jb2xsZWN0aW9uQ2hhbmdlLml0ZW1zKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3JlbW92ZSc6XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVSYW5nZShjb2xsZWN0aW9uQ2hhbmdlLmluZGV4LCBjb2xsZWN0aW9uQ2hhbmdlLmluZGV4ICsgY29sbGVjdGlvbkNoYW5nZS5jb3VudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdyZW1vdmVMZWZ0JzpcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUxlZnQoY29sbGVjdGlvbkNoYW5nZS5jb3VudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdyZW1vdmVSaWdodCc6XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVSaWdodChjb2xsZWN0aW9uQ2hhbmdlLmNvdW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3JlcGxhY2UnOlxuICAgICAgICAgICAgICAgIHRoaXMuc2V0KGNvbGxlY3Rpb25DaGFuZ2UuaW5kZXgsIGNvbGxlY3Rpb25DaGFuZ2UuaXRlbXNbMF0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnc3dhcCc6XG4gICAgICAgICAgICAgICAgdGhpcy5zd2FwKGNvbGxlY3Rpb25DaGFuZ2UuaW5kZXgsIGNvbGxlY3Rpb25DaGFuZ2UuaW5kZXgyKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIG5leHQgdXBkYXRlIG9jY3Vyc1xuICAgICAqIEBwYXJhbSBjYW5jZWxsYXRpb25Ub2tlblxuICAgICAqL1xuICAgIGF3YWl0TmV4dFVwZGF0ZShjYW5jZWxsYXRpb25Ub2tlbikge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgIHRoaXMubGlzdGVuT25jZSgodmFsdWUpID0+IHJlc29sdmUodmFsdWUpLCBjYW5jZWxsYXRpb25Ub2tlbik7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBnZXQgbGVuZ3RoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5sZW5ndGhTb3VyY2U7XG4gICAgfVxuICAgIGdldERhdGEoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGE7XG4gICAgfVxuICAgIGdldChpbmRleCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRhW2luZGV4XTtcbiAgICB9XG4gICAgc2V0KGluZGV4LCBpdGVtKSB7XG4gICAgICAgIGNvbnN0IG9sZCA9IHRoaXMuZGF0YVtpbmRleF07XG4gICAgICAgIGlmIChvbGQgPT09IGl0ZW0pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRhdGFbaW5kZXhdID0gaXRlbTtcbiAgICAgICAgdGhpcy51cGRhdGUoeyBvcGVyYXRpb246ICdyZXBsYWNlJywgb3BlcmF0aW9uRGV0YWlsZWQ6ICdyZXBsYWNlJywgdGFyZ2V0OiBvbGQsIGNvdW50OiAxLCBpbmRleCwgaXRlbXM6IFtpdGVtXSwgbmV3U3RhdGU6IHRoaXMuZGF0YSB9KTtcbiAgICAgICAgdGhpcy5vbkl0ZW1zUmVtb3ZlZC5maXJlKFtvbGRdKTtcbiAgICAgICAgdGhpcy5vbkl0ZW1zQWRkZWQuZmlyZShbaXRlbV0pO1xuICAgICAgICBpZiAodGhpcy5sZW5ndGhTb3VyY2UudmFsdWUgIT09IHRoaXMuZGF0YS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMubGVuZ3RoU291cmNlLnVwZGF0ZSh0aGlzLmRhdGEubGVuZ3RoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpbmRleE9mKGl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5pbmRleE9mKGl0ZW0pO1xuICAgIH1cbiAgICBmaW5kKHByZWRpY2F0ZSwgdGhpc0FyZykge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmZpbmQocHJlZGljYXRlLCB0aGlzQXJnKTtcbiAgICB9XG4gICAgZmluZEluZGV4KHByZWRpY2F0ZSwgdGhpc0FyZykge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmZpbmRJbmRleChwcmVkaWNhdGUsIHRoaXNBcmcpO1xuICAgIH1cbiAgICBsYXN0SW5kZXhPZihpdGVtKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEubGFzdEluZGV4T2YoaXRlbSk7XG4gICAgfVxuICAgIGluY2x1ZGVzKGl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5pbmNsdWRlcyhpdGVtKTtcbiAgICB9XG4gICAgcmVwbGFjZShpdGVtLCBuZXdJdGVtKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5pbmRleE9mKGl0ZW0pO1xuICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLnNldChpbmRleCwgbmV3SXRlbSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3dhcChpbmRleEEsIGluZGV4Qikge1xuICAgICAgICBpZiAoaW5kZXhBID09PSBpbmRleEIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBpdGVtQSA9IHRoaXMuZGF0YVtpbmRleEFdO1xuICAgICAgICBjb25zdCBpdGVtQiA9IHRoaXMuZGF0YVtpbmRleEJdO1xuICAgICAgICB0aGlzLmRhdGFbaW5kZXhCXSA9IGl0ZW1BO1xuICAgICAgICB0aGlzLmRhdGFbaW5kZXhBXSA9IGl0ZW1CO1xuICAgICAgICB0aGlzLnVwZGF0ZSh7IG9wZXJhdGlvbjogJ3N3YXAnLCBvcGVyYXRpb25EZXRhaWxlZDogJ3N3YXAnLCBpbmRleDogaW5kZXhBLCBpbmRleDI6IGluZGV4QiwgaXRlbXM6IFtpdGVtQSwgaXRlbUJdLCBuZXdTdGF0ZTogdGhpcy5kYXRhIH0pO1xuICAgICAgICBpZiAodGhpcy5sZW5ndGhTb3VyY2UudmFsdWUgIT09IHRoaXMuZGF0YS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMubGVuZ3RoU291cmNlLnVwZGF0ZSh0aGlzLmRhdGEubGVuZ3RoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzd2FwSXRlbXMoaXRlbUEsIGl0ZW1CKSB7XG4gICAgICAgIGlmIChpdGVtQSA9PT0gaXRlbUIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBpbmRleEEgPSB0aGlzLmRhdGEuaW5kZXhPZihpdGVtQSk7XG4gICAgICAgIGNvbnN0IGluZGV4QiA9IHRoaXMuZGF0YS5pbmRleE9mKGl0ZW1CKTtcbiAgICAgICAgaWYgKGluZGV4QSAhPT0gLTEgJiYgaW5kZXhCICE9PSAtMSkge1xuICAgICAgICAgICAgdGhpcy5kYXRhW2luZGV4Ql0gPSBpdGVtQTtcbiAgICAgICAgICAgIHRoaXMuZGF0YVtpbmRleEFdID0gaXRlbUI7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy51cGRhdGUoeyBvcGVyYXRpb246ICdzd2FwJywgb3BlcmF0aW9uRGV0YWlsZWQ6ICdzd2FwJywgaW5kZXg6IGluZGV4QSwgaW5kZXgyOiBpbmRleEIsIGl0ZW1zOiBbaXRlbUEsIGl0ZW1CXSwgbmV3U3RhdGU6IHRoaXMuZGF0YSB9KTtcbiAgICAgICAgaWYgKHRoaXMubGVuZ3RoU291cmNlLnZhbHVlICE9PSB0aGlzLmRhdGEubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLmxlbmd0aFNvdXJjZS51cGRhdGUodGhpcy5kYXRhLmxlbmd0aCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXBwZW5kQXJyYXkoaXRlbXMpIHtcbiAgICAgICAgaWYgKCFpdGVtcyB8fCBpdGVtcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXRlbXMubGVuZ3RoIDw9IDY1MDAwKSB7XG4gICAgICAgICAgICAvL1B1c2ggaXMgc2lnbmlmaWNhbnRseSBmYXN0ZXIgdGhhbiBjb25jYXQgYnV0IGl0IGlzIGxpbWl0ZWQgdG8gNjU1MzUgaXRlbXMgaW4gb25lIHB1c2hcbiAgICAgICAgICAgIHRoaXMuZGF0YS5wdXNoLmFwcGx5KHRoaXMuZGF0YSwgaXRlbXMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdBcHBlbmRpbmcgb3ZlciA2NTAwMCBpdGVtcyBpbiBvbmUgZ28gY2FuIGxlYWQgdG8gcGVyZm9ybWFuY2UgaXNzdWVzLiBDb25zaWRlciBzdHJlYW1pbmcgeW91ciBjaGFuZ2VzIHByb2dyZXNzaXZlbHknKTtcbiAgICAgICAgICAgIHRoaXMuZGF0YSA9IHRoaXMuZGF0YS5jb25jYXQoaXRlbXMpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmxlbmd0aFNvdXJjZS52YWx1ZSAhPT0gdGhpcy5kYXRhLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5sZW5ndGhTb3VyY2UudXBkYXRlKHRoaXMuZGF0YS5sZW5ndGgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudXBkYXRlKHtcbiAgICAgICAgICAgIG9wZXJhdGlvbjogJ2FkZCcsXG4gICAgICAgICAgICBvcGVyYXRpb25EZXRhaWxlZDogJ2FwcGVuZCcsXG4gICAgICAgICAgICBjb3VudDogaXRlbXMubGVuZ3RoLFxuICAgICAgICAgICAgaW5kZXg6IHRoaXMuZGF0YS5sZW5ndGggLSBpdGVtcy5sZW5ndGgsXG4gICAgICAgICAgICBpdGVtcyxcbiAgICAgICAgICAgIG5ld1N0YXRlOiB0aGlzLmRhdGFcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMub25JdGVtc0FkZGVkLmZpcmUoaXRlbXMpO1xuICAgIH1cbiAgICBzcGxpY2UoaW5kZXgsIGRlbGV0ZUNvdW50LCAuLi5pbnNlcnRpb24pIHtcbiAgICAgICAgbGV0IHJlbW92ZWQgPSBbXTtcbiAgICAgICAgaWYgKGRlbGV0ZUNvdW50ID4gMCkge1xuICAgICAgICAgICAgcmVtb3ZlZCA9IHRoaXMucmVtb3ZlQXQoaW5kZXgsIGRlbGV0ZUNvdW50KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaW5zZXJ0aW9uICYmIGluc2VydGlvbi5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLmluc2VydEF0KGluZGV4LCAuLi5pbnNlcnRpb24pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZW1vdmVkO1xuICAgIH1cbiAgICBpbnNlcnRBdChpbmRleCwgLi4uaXRlbXMpIHtcbiAgICAgICAgaWYgKGl0ZW1zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGF0YS5zcGxpY2UoaW5kZXgsIDAsIC4uLml0ZW1zKTtcbiAgICAgICAgdGhpcy51cGRhdGUoe1xuICAgICAgICAgICAgb3BlcmF0aW9uOiAnYWRkJyxcbiAgICAgICAgICAgIG9wZXJhdGlvbkRldGFpbGVkOiAnaW5zZXJ0JyxcbiAgICAgICAgICAgIGNvdW50OiBpdGVtcy5sZW5ndGgsXG4gICAgICAgICAgICBpbmRleCxcbiAgICAgICAgICAgIGl0ZW1zLFxuICAgICAgICAgICAgbmV3U3RhdGU6IHRoaXMuZGF0YVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5vbkl0ZW1zQWRkZWQuZmlyZShpdGVtcyk7XG4gICAgICAgIHRoaXMubGVuZ3RoU291cmNlLnVwZGF0ZSh0aGlzLmRhdGEubGVuZ3RoKTtcbiAgICB9XG4gICAgcHVzaCguLi5pdGVtcykge1xuICAgICAgICB0aGlzLmFwcGVuZEFycmF5KGl0ZW1zKTtcbiAgICB9XG4gICAgdW5zaGlmdCguLi5pdGVtcykge1xuICAgICAgICB0aGlzLmRhdGEudW5zaGlmdCguLi5pdGVtcyk7XG4gICAgICAgIGlmICh0aGlzLmxlbmd0aFNvdXJjZS52YWx1ZSAhPT0gdGhpcy5kYXRhLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5sZW5ndGhTb3VyY2UudXBkYXRlKHRoaXMuZGF0YS5sZW5ndGgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudXBkYXRlKHsgb3BlcmF0aW9uOiAnYWRkJywgb3BlcmF0aW9uRGV0YWlsZWQ6ICdwcmVwZW5kJywgY291bnQ6IGl0ZW1zLmxlbmd0aCwgaXRlbXMsIGluZGV4OiAwLCBuZXdTdGF0ZTogdGhpcy5kYXRhIH0pO1xuICAgICAgICB0aGlzLm9uSXRlbXNBZGRlZC5maXJlKGl0ZW1zKTtcbiAgICB9XG4gICAgcG9wKCkge1xuICAgICAgICAvL1RoaXMgY291bGQgdGVjaG5pY2FsbHkganVzdCBjYWxsIHJlbW92ZVJpZ2h0KDEpIGJ1dCByZW1vdmVSaWdodCBpcyBiYXNlZCBvbiBzcGxpY2luZyB3aGljaCBjcmVhdGVzIGEgbmV3IGFycmF5IHNvIHRoaXMgY2FuIGJlIHNpZ25pZmljYW50bHkgZmFzdGVyXG4gICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLmRhdGEucG9wKCk7XG4gICAgICAgIGlmICh0aGlzLmxlbmd0aFNvdXJjZS52YWx1ZSAhPT0gdGhpcy5kYXRhLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5sZW5ndGhTb3VyY2UudXBkYXRlKHRoaXMuZGF0YS5sZW5ndGgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudXBkYXRlKHtcbiAgICAgICAgICAgIG9wZXJhdGlvbjogJ3JlbW92ZScsXG4gICAgICAgICAgICBvcGVyYXRpb25EZXRhaWxlZDogJ3JlbW92ZVJpZ2h0JyxcbiAgICAgICAgICAgIGNvdW50OiAxLFxuICAgICAgICAgICAgaW5kZXg6IHRoaXMuZGF0YS5sZW5ndGgsXG4gICAgICAgICAgICBpdGVtczogW2l0ZW1dLFxuICAgICAgICAgICAgbmV3U3RhdGU6IHRoaXMuZGF0YVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5vbkl0ZW1zUmVtb3ZlZC5maXJlKFtpdGVtXSk7XG4gICAgICAgIHJldHVybiBpdGVtO1xuICAgIH1cbiAgICBtZXJnZShuZXdEYXRhKSB7XG4gICAgICAgIGlmIChuZXdEYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2xlYXIoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmV3RGF0YSA9PT0gdGhpcy5kYXRhKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgb2xkID0gdGhpcy5kYXRhO1xuICAgICAgICB0aGlzLmRhdGEgPSBuZXdEYXRhLnNsaWNlKCk7XG4gICAgICAgIGlmICh0aGlzLmxlbmd0aFNvdXJjZS52YWx1ZSAhPT0gdGhpcy5kYXRhLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5sZW5ndGhTb3VyY2UudXBkYXRlKHRoaXMuZGF0YS5sZW5ndGgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudXBkYXRlKHtcbiAgICAgICAgICAgIG9wZXJhdGlvbjogJ21lcmdlJyxcbiAgICAgICAgICAgIG9wZXJhdGlvbkRldGFpbGVkOiAnbWVyZ2UnLFxuICAgICAgICAgICAgcHJldmlvdXNTdGF0ZTogb2xkLFxuICAgICAgICAgICAgaW5kZXg6IDAsXG4gICAgICAgICAgICBpdGVtczogdGhpcy5kYXRhLFxuICAgICAgICAgICAgbmV3U3RhdGU6IHRoaXMuZGF0YVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5vbkl0ZW1zUmVtb3ZlZC5maXJlKG9sZCk7XG4gICAgICAgIHRoaXMub25JdGVtc0FkZGVkLmZpcmUodGhpcy5kYXRhKTtcbiAgICB9XG4gICAgcmVtb3ZlUmlnaHQoY291bnQpIHtcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gdGhpcy5kYXRhLmxlbmd0aDtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5kYXRhLnNwbGljZShsZW5ndGggLSBjb3VudCwgY291bnQpO1xuICAgICAgICBpZiAodGhpcy5sZW5ndGhTb3VyY2UudmFsdWUgIT09IHRoaXMuZGF0YS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMubGVuZ3RoU291cmNlLnVwZGF0ZSh0aGlzLmRhdGEubGVuZ3RoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnVwZGF0ZSh7IG9wZXJhdGlvbjogJ3JlbW92ZScsIG9wZXJhdGlvbkRldGFpbGVkOiAncmVtb3ZlUmlnaHQnLCBjb3VudCwgaW5kZXg6IGxlbmd0aCAtIGNvdW50LCBpdGVtczogcmVzdWx0LCBuZXdTdGF0ZTogdGhpcy5kYXRhIH0pO1xuICAgICAgICB0aGlzLm9uSXRlbXNSZW1vdmVkLmZpcmUocmVzdWx0KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgcmVtb3ZlTGVmdChjb3VudCkge1xuICAgICAgICBjb25zdCByZW1vdmVkID0gdGhpcy5kYXRhLnNwbGljZSgwLCBjb3VudCk7XG4gICAgICAgIGlmICh0aGlzLmxlbmd0aFNvdXJjZS52YWx1ZSAhPT0gdGhpcy5kYXRhLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5sZW5ndGhTb3VyY2UudXBkYXRlKHRoaXMuZGF0YS5sZW5ndGgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudXBkYXRlKHsgb3BlcmF0aW9uOiAncmVtb3ZlJywgb3BlcmF0aW9uRGV0YWlsZWQ6ICdyZW1vdmVMZWZ0JywgY291bnQsIGluZGV4OiAwLCBpdGVtczogcmVtb3ZlZCwgbmV3U3RhdGU6IHRoaXMuZGF0YSB9KTtcbiAgICAgICAgdGhpcy5vbkl0ZW1zUmVtb3ZlZC5maXJlKHJlbW92ZWQpO1xuICAgIH1cbiAgICByZW1vdmVBdChpbmRleCwgY291bnQgPSAxKSB7XG4gICAgICAgIGNvbnN0IHJlbW92ZWQgPSB0aGlzLmRhdGEuc3BsaWNlKGluZGV4LCBjb3VudCk7XG4gICAgICAgIHRoaXMudXBkYXRlKHsgb3BlcmF0aW9uOiAncmVtb3ZlJywgb3BlcmF0aW9uRGV0YWlsZWQ6ICdyZW1vdmUnLCBjb3VudDogcmVtb3ZlZC5sZW5ndGgsIGluZGV4LCBpdGVtczogcmVtb3ZlZCwgbmV3U3RhdGU6IHRoaXMuZGF0YSB9KTtcbiAgICAgICAgdGhpcy5vbkl0ZW1zUmVtb3ZlZC5maXJlKHJlbW92ZWQpO1xuICAgICAgICBpZiAodGhpcy5sZW5ndGhTb3VyY2UudmFsdWUgIT09IHRoaXMuZGF0YS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMubGVuZ3RoU291cmNlLnVwZGF0ZSh0aGlzLmRhdGEubGVuZ3RoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVtb3ZlZDtcbiAgICB9XG4gICAgcmVtb3ZlUmFuZ2Uoc3RhcnQsIGVuZCkge1xuICAgICAgICBjb25zdCByZW1vdmVkID0gdGhpcy5kYXRhLnNwbGljZShzdGFydCwgZW5kIC0gc3RhcnQpO1xuICAgICAgICBpZiAodGhpcy5sZW5ndGhTb3VyY2UudmFsdWUgIT09IHRoaXMuZGF0YS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMubGVuZ3RoU291cmNlLnVwZGF0ZSh0aGlzLmRhdGEubGVuZ3RoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnVwZGF0ZSh7IG9wZXJhdGlvbjogJ3JlbW92ZScsIG9wZXJhdGlvbkRldGFpbGVkOiAncmVtb3ZlJywgY291bnQ6IHJlbW92ZWQubGVuZ3RoLCBpbmRleDogc3RhcnQsIGl0ZW1zOiByZW1vdmVkLCBuZXdTdGF0ZTogdGhpcy5kYXRhIH0pO1xuICAgICAgICB0aGlzLm9uSXRlbXNSZW1vdmVkLmZpcmUocmVtb3ZlZCk7XG4gICAgICAgIHJldHVybiByZW1vdmVkO1xuICAgIH1cbiAgICByZW1vdmUoaXRlbSkge1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuZGF0YS5pbmRleE9mKGl0ZW0pO1xuICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZW1vdmVBdChpbmRleClbMF07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNsZWFyKCkge1xuICAgICAgICBpZiAodGhpcy5kYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGl0ZW1zID0gdGhpcy5kYXRhO1xuICAgICAgICB0aGlzLmRhdGEgPSBbXTtcbiAgICAgICAgaWYgKHRoaXMubGVuZ3RoU291cmNlLnZhbHVlICE9PSB0aGlzLmRhdGEubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLmxlbmd0aFNvdXJjZS51cGRhdGUodGhpcy5kYXRhLmxlbmd0aCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy51cGRhdGUoe1xuICAgICAgICAgICAgb3BlcmF0aW9uOiAncmVtb3ZlJyxcbiAgICAgICAgICAgIG9wZXJhdGlvbkRldGFpbGVkOiAnY2xlYXInLFxuICAgICAgICAgICAgY291bnQ6IGl0ZW1zLmxlbmd0aCxcbiAgICAgICAgICAgIGluZGV4OiAwLFxuICAgICAgICAgICAgaXRlbXMsXG4gICAgICAgICAgICBwcmV2aW91c1N0YXRlOiBpdGVtcyxcbiAgICAgICAgICAgIG5ld1N0YXRlOiB0aGlzLmRhdGFcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMub25JdGVtc1JlbW92ZWQuZmlyZShpdGVtcyk7XG4gICAgfVxuICAgIHNvbWUoY2IpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5zb21lKGNiKTtcbiAgICB9XG4gICAgZXZlcnkoY2IpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5ldmVyeShjYik7XG4gICAgfVxuICAgIHNoaWZ0KCkge1xuICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5kYXRhLnNoaWZ0KCk7XG4gICAgICAgIGlmICh0aGlzLmxlbmd0aFNvdXJjZS52YWx1ZSAhPT0gdGhpcy5kYXRhLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5sZW5ndGhTb3VyY2UudXBkYXRlKHRoaXMuZGF0YS5sZW5ndGgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudXBkYXRlKHsgb3BlcmF0aW9uOiAncmVtb3ZlJywgb3BlcmF0aW9uRGV0YWlsZWQ6ICdyZW1vdmVMZWZ0JywgaXRlbXM6IFtpdGVtXSwgY291bnQ6IDEsIGluZGV4OiAwLCBuZXdTdGF0ZTogdGhpcy5kYXRhIH0pO1xuICAgICAgICB0aGlzLm9uSXRlbXNSZW1vdmVkLmZpcmUoW2l0ZW1dKTtcbiAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgfVxuICAgIHRvQXJyYXkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuc2xpY2UoKTtcbiAgICB9XG4gICAgZmxhdChjYW5jZWxsYXRpb25Ub2tlbiwgY29uZmlnKSB7XG4gICAgICAgIGNvbnN0IHZpZXcgPSBuZXcgRmxhdHRlbmVkQXJyYXlWaWV3KHRoaXMsIDEsIGNhbmNlbGxhdGlvblRva2VuLCB0aGlzLm5hbWUgKyAnLmZsYXQoKScsIGNvbmZpZyk7XG4gICAgICAgIHJldHVybiB2aWV3O1xuICAgIH1cbiAgICByZWR1Y2UocmVkdWNlciwgaW5pdGlhbCwgY2FuY2VsbGF0aW9uVG9rZW4pIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gbmV3IERhdGFTb3VyY2UoaW5pdGlhbCk7XG4gICAgICAgIHRoaXMubGlzdGVuQW5kUmVwZWF0KChjaGFuZ2UpID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCAoY2hhbmdlLm9wZXJhdGlvbikge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2FkZCc6XG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXdWYWwgPSByZXN1bHQudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBjaGFuZ2UuaXRlbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1ZhbCA9IHJlZHVjZXIobmV3VmFsLCBpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXN1bHQudXBkYXRlKG5ld1ZhbCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ21lcmdlJzpcbiAgICAgICAgICAgICAgICBjYXNlICdyZXBsYWNlJzpcbiAgICAgICAgICAgICAgICBjYXNlICdzd2FwJzpcbiAgICAgICAgICAgICAgICBjYXNlICdyZW1vdmUnOlxuICAgICAgICAgICAgICAgICAgICBsZXQgbmV3VmFsMiA9IGluaXRpYWw7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBjaGFuZ2UubmV3U3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1ZhbDIgPSByZWR1Y2VyKG5ld1ZhbDIsIGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC51cGRhdGUobmV3VmFsMik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBjYW5jZWxsYXRpb25Ub2tlbik7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIHJldmVyc2UoY2FuY2VsbGF0aW9uVG9rZW4sIGNvbmZpZykge1xuICAgICAgICBjb25zdCB2aWV3ID0gbmV3IFJldmVyc2VkQXJyYXlWaWV3KHRoaXMsIGNhbmNlbGxhdGlvblRva2VuLCB0aGlzLm5hbWUgKyAnLnJldmVyc2UoKScsIGNvbmZpZyk7XG4gICAgICAgIHJldHVybiB2aWV3O1xuICAgIH1cbiAgICBzb3J0KGNvbXBhcmF0b3IgPSAoYSwgYikgPT4ge1xuICAgICAgICBpZiAoYSA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9XG4gICAgICAgIGlmIChiID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgYSA9PT0gJ251bWJlcicgJiYgdHlwZW9mIGIgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICByZXR1cm4gYSAtIGI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gYS50b1N0cmluZygpLmxvY2FsZUNvbXBhcmUoYi50b1N0cmluZygpKTtcbiAgICAgICAgfVxuICAgIH0sIGRlcGVuZGVuY2llcyA9IFtdLCBjYW5jZWxsYXRpb25Ub2tlbiwgY29uZmlnKSB7XG4gICAgICAgIGNvbnN0IHZpZXcgPSBuZXcgU29ydGVkQXJyYXlWaWV3KHRoaXMsIGNvbXBhcmF0b3IsIGNhbmNlbGxhdGlvblRva2VuLCB0aGlzLm5hbWUgKyAnLnNvcnQoKScsIGNvbmZpZyk7XG4gICAgICAgIGRlcGVuZGVuY2llcy5mb3JFYWNoKChkZXApID0+IHtcbiAgICAgICAgICAgIGRlcC5saXN0ZW4oKCkgPT4gdmlldy5yZWZyZXNoKCkpO1xuICAgICAgICB9LCBjYW5jZWxsYXRpb25Ub2tlbik7XG4gICAgICAgIHJldHVybiB2aWV3O1xuICAgIH1cbiAgICBzbGljZShzdGFydCwgZW5kLCBjYW5jZWxsYXRpb25Ub2tlbiwgY29uZmlnKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc3RhcnQgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICBzdGFydCA9IG5ldyBEYXRhU291cmNlKHN0YXJ0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIGVuZCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIGVuZCA9IG5ldyBEYXRhU291cmNlKGVuZCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVuZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBlbmQgPSB0aGlzLmxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IFNsaWNlZEFycmF5Vmlldyh0aGlzLCBzdGFydCwgZW5kLCBjYW5jZWxsYXRpb25Ub2tlbiwgdGhpcy5uYW1lICsgJy5zbGljZSgpJywgY29uZmlnKTtcbiAgICB9XG4gICAgbWFwKG1hcHBlciwgZGVwZW5kZW5jaWVzID0gW10sIGNhbmNlbGxhdGlvblRva2VuLCBjb25maWcpIHtcbiAgICAgICAgY29uc3QgdmlldyA9IG5ldyBNYXBwZWRBcnJheVZpZXcodGhpcywgbWFwcGVyLCBjYW5jZWxsYXRpb25Ub2tlbiwgdGhpcy5uYW1lICsgJy5tYXAoKScsIGNvbmZpZyk7XG4gICAgICAgIGRlcGVuZGVuY2llcy5mb3JFYWNoKChkZXApID0+IHtcbiAgICAgICAgICAgIGRlcC5saXN0ZW4oKCkgPT4gdmlldy5yZWZyZXNoKCkpO1xuICAgICAgICB9LCBjYW5jZWxsYXRpb25Ub2tlbik7XG4gICAgICAgIHJldHVybiB2aWV3O1xuICAgIH1cbiAgICB1bmlxdWUoY2FuY2VsbGF0aW9uVG9rZW4sIGNvbmZpZykge1xuICAgICAgICByZXR1cm4gbmV3IFVuaXF1ZUFycmF5Vmlldyh0aGlzLCBjYW5jZWxsYXRpb25Ub2tlbiwgdGhpcy5uYW1lICsgJy51bmlxdWUoKScsIGNvbmZpZyk7XG4gICAgfVxuICAgIGluZGV4Qnkoa2V5LCBjYW5jZWxsYXRpb25Ub2tlbiwgY29uZmlnKSB7XG4gICAgICAgIGNvbnN0IHZpZXcgPSBuZXcgTWFwRGF0YVNvdXJjZSgpO1xuICAgICAgICB0aGlzLmxpc3RlbkFuZFJlcGVhdCgoY2hhbmdlKSA9PiB7XG4gICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICBpZiAoISgoX2EgPSBjb25maWcgPT09IG51bGwgfHwgY29uZmlnID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjb25maWcuaWdub3JlZE9wZXJhdGlvbnMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5pbmNsdWRlcyhjaGFuZ2Uub3BlcmF0aW9uRGV0YWlsZWQpKSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoY2hhbmdlLm9wZXJhdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdhZGQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIGNoYW5nZS5pdGVtcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZXcuc2V0KGl0ZW1ba2V5XSwgaXRlbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAncmVtb3ZlJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBjaGFuZ2UuaXRlbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWV3LmRlbGV0ZShpdGVtW2tleV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3JlcGxhY2UnOlxuICAgICAgICAgICAgICAgICAgICAgICAgdmlldy5kZWxldGUoY2hhbmdlLnRhcmdldFtrZXldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXcuc2V0KGNoYW5nZS5pdGVtc1swXVtrZXldLCBjaGFuZ2UuaXRlbXNbMF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ21lcmdlJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG9sZEtleXMgPSBuZXcgU2V0KHZpZXcua2V5cygpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld0tleXMgPSBuZXcgU2V0KGNoYW5nZS5pdGVtcy5tYXAoKGl0ZW0pID0+IGl0ZW1ba2V5XSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBvbGRLZXkgb2Ygb2xkS2V5cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbmV3S2V5cy5oYXMob2xkS2V5KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWV3LmRlbGV0ZShvbGRLZXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgbmV3S2V5IG9mIG5ld0tleXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW9sZEtleXMuaGFzKG5ld0tleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlldy5zZXQobmV3S2V5LCBjaGFuZ2UuaXRlbXMuZmluZCgoaXRlbSkgPT4gaXRlbVtrZXldID09PSBuZXdLZXkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIGNhbmNlbGxhdGlvblRva2VuKTtcbiAgICAgICAgcmV0dXJuIHZpZXc7XG4gICAgfVxuICAgIGluZGV4QnlQcm92aWRlcihwcm92aWRlciwgY2FuY2VsbGF0aW9uVG9rZW4sIGNvbmZpZykge1xuICAgICAgICBjb25zdCB2aWV3ID0gbmV3IE1hcERhdGFTb3VyY2UoKTtcbiAgICAgICAgdGhpcy5saXN0ZW5BbmRSZXBlYXQoKGNoYW5nZSkgPT4ge1xuICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgaWYgKCEoKF9hID0gY29uZmlnID09PSBudWxsIHx8IGNvbmZpZyA9PT0gdm9pZCAwID8gdm9pZCAwIDogY29uZmlnLmlnbm9yZWRPcGVyYXRpb25zKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuaW5jbHVkZXMoY2hhbmdlLm9wZXJhdGlvbkRldGFpbGVkKSkpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGNoYW5nZS5vcGVyYXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnYWRkJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBjaGFuZ2UuaXRlbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWV3LnNldChwcm92aWRlcihpdGVtKSwgaXRlbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAncmVtb3ZlJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBjaGFuZ2UuaXRlbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWV3LmRlbGV0ZShwcm92aWRlcihpdGVtKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAncmVwbGFjZSc6XG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3LmRlbGV0ZShwcm92aWRlcihjaGFuZ2UudGFyZ2V0KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3LnNldChwcm92aWRlcihjaGFuZ2UuaXRlbXNbMF0pLCBjaGFuZ2UuaXRlbXNbMF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ21lcmdlJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG9sZEtleXMgPSBuZXcgU2V0KHZpZXcua2V5cygpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld0tleXMgPSBuZXcgU2V0KGNoYW5nZS5pdGVtcy5tYXAoKGl0ZW0pID0+IHByb3ZpZGVyKGl0ZW0pKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IG9sZEtleSBvZiBvbGRLZXlzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFuZXdLZXlzLmhhcyhvbGRLZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZXcuZGVsZXRlKG9sZEtleSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBuZXdLZXkgb2YgbmV3S2V5cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghb2xkS2V5cy5oYXMobmV3S2V5KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWV3LnNldChuZXdLZXksIGNoYW5nZS5pdGVtcy5maW5kKChpdGVtKSA9PiBwcm92aWRlcihpdGVtKSA9PT0gbmV3S2V5KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCBjYW5jZWxsYXRpb25Ub2tlbik7XG4gICAgICAgIHJldHVybiB2aWV3O1xuICAgIH1cbiAgICBncm91cEJ5KGtleSwgY2FuY2VsbGF0aW9uVG9rZW4sIGNvbmZpZykge1xuICAgICAgICBjb25zdCB2aWV3ID0gbmV3IE1hcERhdGFTb3VyY2UoKTtcbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlUmVtb3ZlKGl0ZW0pIHtcbiAgICAgICAgICAgIGNvbnN0IGxpc3QgPSB2aWV3LmdldChpdGVtW2tleV0pO1xuICAgICAgICAgICAgbGlzdC5zcGxpY2UobGlzdC5pbmRleE9mKGl0ZW0pLCAxKTtcbiAgICAgICAgICAgIGlmIChsaXN0Lmxlbmd0aC52YWx1ZSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHZpZXcuZGVsZXRlKGl0ZW1ba2V5XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlQWRkKGl0ZW0pIHtcbiAgICAgICAgICAgIGlmICghdmlldy5oYXMoaXRlbVtrZXldKSkge1xuICAgICAgICAgICAgICAgIHZpZXcuc2V0KGl0ZW1ba2V5XSwgbmV3IEFycmF5RGF0YVNvdXJjZSgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZpZXcuZ2V0KGl0ZW1ba2V5XSkucHVzaChpdGVtKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxpc3RlbkFuZFJlcGVhdCgoY2hhbmdlKSA9PiB7XG4gICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICBpZiAoISgoX2EgPSBjb25maWcgPT09IG51bGwgfHwgY29uZmlnID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjb25maWcuaWdub3JlZE9wZXJhdGlvbnMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5pbmNsdWRlcyhjaGFuZ2Uub3BlcmF0aW9uRGV0YWlsZWQpKSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoY2hhbmdlLm9wZXJhdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdhZGQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIGNoYW5nZS5pdGVtcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZUFkZChpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdyZW1vdmUnOlxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIGNoYW5nZS5pdGVtcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZVJlbW92ZShpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdyZXBsYWNlJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZVJlbW92ZShjaGFuZ2UudGFyZ2V0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZUFkZChjaGFuZ2UuaXRlbXNbMF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ21lcmdlJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRpZmYgPSBjaGFuZ2UucHJldmlvdXNTdGF0ZS5maWx0ZXIoKGl0ZW0pID0+ICFjaGFuZ2UubmV3U3RhdGUuaW5jbHVkZXMoaXRlbSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIGRpZmYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmlldy5oYXMoaXRlbVtrZXldKSAmJiB2aWV3LmdldChpdGVtW2tleV0pLmluY2x1ZGVzKGl0ZW0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZVJlbW92ZShpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgY2hhbmdlLml0ZW1zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF2aWV3LmhhcyhpdGVtW2tleV0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZUFkZChpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdmlldy5nZXQoaXRlbVtrZXldKS5pbmNsdWRlcyhpdGVtKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlQWRkKGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCBjYW5jZWxsYXRpb25Ub2tlbik7XG4gICAgICAgIHJldHVybiB2aWV3O1xuICAgIH1cbiAgICBncm91cEJ5UHJvdmlkZXIocHJvdmlkZXIsIGNhbmNlbGxhdGlvblRva2VuLCBjb25maWcpIHtcbiAgICAgICAgY29uc3QgdmlldyA9IG5ldyBNYXBEYXRhU291cmNlKCk7XG4gICAgICAgIGZ1bmN0aW9uIGhhbmRsZVJlbW92ZShpdGVtKSB7XG4gICAgICAgICAgICBjb25zdCBsaXN0ID0gdmlldy5nZXQocHJvdmlkZXIoaXRlbSkpO1xuICAgICAgICAgICAgbGlzdC5zcGxpY2UobGlzdC5pbmRleE9mKGl0ZW0pLCAxKTtcbiAgICAgICAgICAgIGlmIChsaXN0Lmxlbmd0aC52YWx1ZSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHZpZXcuZGVsZXRlKHByb3ZpZGVyKGl0ZW0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBoYW5kbGVBZGQoaXRlbSkge1xuICAgICAgICAgICAgaWYgKCF2aWV3Lmhhcyhwcm92aWRlcihpdGVtKSkpIHtcbiAgICAgICAgICAgICAgICB2aWV3LnNldChwcm92aWRlcihpdGVtKSwgbmV3IEFycmF5RGF0YVNvdXJjZSgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZpZXcuZ2V0KHByb3ZpZGVyKGl0ZW0pKS5wdXNoKGl0ZW0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubGlzdGVuQW5kUmVwZWF0KChjaGFuZ2UpID0+IHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIGlmICghKChfYSA9IGNvbmZpZyA9PT0gbnVsbCB8fCBjb25maWcgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNvbmZpZy5pZ25vcmVkT3BlcmF0aW9ucykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmluY2x1ZGVzKGNoYW5nZS5vcGVyYXRpb25EZXRhaWxlZCkpKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChjaGFuZ2Uub3BlcmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2FkZCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgY2hhbmdlLml0ZW1zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlQWRkKGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3JlbW92ZSc6XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgY2hhbmdlLml0ZW1zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlUmVtb3ZlKGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3JlcGxhY2UnOlxuICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlUmVtb3ZlKGNoYW5nZS50YXJnZXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlQWRkKGNoYW5nZS5pdGVtc1swXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnbWVyZ2UnOlxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGlmZiA9IGNoYW5nZS5wcmV2aW91c1N0YXRlLmZpbHRlcigoaXRlbSkgPT4gIWNoYW5nZS5uZXdTdGF0ZS5pbmNsdWRlcyhpdGVtKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgZGlmZikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2aWV3Lmhhcyhwcm92aWRlcihpdGVtKSkgJiYgdmlldy5nZXQocHJvdmlkZXIoaXRlbSkpLmluY2x1ZGVzKGl0ZW0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZVJlbW92ZShpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgY2hhbmdlLml0ZW1zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF2aWV3Lmhhcyhwcm92aWRlcihpdGVtKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlQWRkKGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF2aWV3LmdldChwcm92aWRlcihpdGVtKSkuaW5jbHVkZXMoaXRlbSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZUFkZChpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgY2FuY2VsbGF0aW9uVG9rZW4pO1xuICAgICAgICByZXR1cm4gdmlldztcbiAgICB9XG4gICAgZ3JvdXBCeU11bHRpUHJvdmlkZXIocHJvdmlkZXIsIGNhbmNlbGxhdGlvblRva2VuLCBjb25maWcpIHtcbiAgICAgICAgY29uc3QgdmlldyA9IG5ldyBNYXBEYXRhU291cmNlKCk7XG4gICAgICAgIGZ1bmN0aW9uIGhhbmRsZVJlbW92ZShpdGVtKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGkgb2YgcHJvdmlkZXIoaXRlbSkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBsaXN0ID0gdmlldy5nZXQoaSk7XG4gICAgICAgICAgICAgICAgbGlzdC5zcGxpY2UobGlzdC5pbmRleE9mKGl0ZW0pLCAxKTtcbiAgICAgICAgICAgICAgICBpZiAobGlzdC5sZW5ndGgudmFsdWUgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldy5kZWxldGUoaSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGhhbmRsZUFkZChpdGVtKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGkgb2YgcHJvdmlkZXIoaXRlbSkpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXZpZXcuaGFzKGkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXcuc2V0KGksIG5ldyBBcnJheURhdGFTb3VyY2UoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZpZXcuZ2V0KGkpLnB1c2goaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5saXN0ZW5BbmRSZXBlYXQoKGNoYW5nZSkgPT4ge1xuICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgaWYgKCEoKF9hID0gY29uZmlnID09PSBudWxsIHx8IGNvbmZpZyA9PT0gdm9pZCAwID8gdm9pZCAwIDogY29uZmlnLmlnbm9yZWRPcGVyYXRpb25zKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuaW5jbHVkZXMoY2hhbmdlLm9wZXJhdGlvbkRldGFpbGVkKSkpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGNoYW5nZS5vcGVyYXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnYWRkJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBjaGFuZ2UuaXRlbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVBZGQoaXRlbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAncmVtb3ZlJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBjaGFuZ2UuaXRlbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVSZW1vdmUoaXRlbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAncmVwbGFjZSc6XG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVSZW1vdmUoY2hhbmdlLnRhcmdldCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVBZGQoY2hhbmdlLml0ZW1zWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdtZXJnZSc6XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkaWZmID0gY2hhbmdlLnByZXZpb3VzU3RhdGUuZmlsdGVyKChpdGVtKSA9PiAhY2hhbmdlLm5ld1N0YXRlLmluY2x1ZGVzKGl0ZW0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBkaWZmKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBpIG9mIHByb3ZpZGVyKGl0ZW0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2aWV3LmhhcyhpKSAmJiB2aWV3LmdldChpKS5pbmNsdWRlcyhpdGVtKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlUmVtb3ZlKGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIGNoYW5nZS5pdGVtcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaSBvZiBwcm92aWRlcihpdGVtKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXZpZXcuaGFzKGkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVBZGQoaXRlbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXZpZXcuZ2V0KGkpLmluY2x1ZGVzKGl0ZW0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlQWRkKGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCBjYW5jZWxsYXRpb25Ub2tlbik7XG4gICAgICAgIHJldHVybiB2aWV3O1xuICAgIH1cbiAgICBmaWx0ZXIoY2FsbGJhY2ssIGRlcGVuZGVuY2llcyA9IFtdLCBjYW5jZWxsYXRpb25Ub2tlbiwgY29uZmlnKSB7XG4gICAgICAgIGNvbnN0IHZpZXcgPSBuZXcgRmlsdGVyZWRBcnJheVZpZXcodGhpcywgY2FsbGJhY2ssIGNhbmNlbGxhdGlvblRva2VuLCB0aGlzLm5hbWUgKyAnLmZpbHRlcigpJywgY29uZmlnKTtcbiAgICAgICAgZGVwZW5kZW5jaWVzLmZvckVhY2goKGRlcCkgPT4ge1xuICAgICAgICAgICAgZGVwLmxpc3RlbigoKSA9PiB2aWV3LnJlZnJlc2goKSwgY2FuY2VsbGF0aW9uVG9rZW4pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHZpZXc7XG4gICAgfVxuICAgIGZvckVhY2goY2FsbGJhY2tmbikge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmZvckVhY2goY2FsbGJhY2tmbik7XG4gICAgfVxuICAgIHVwZGF0ZShjaGFuZ2UpIHtcbiAgICAgICAgdGhpcy51cGRhdGVFdmVudC5maXJlKGNoYW5nZSk7XG4gICAgfVxufVxuZXhwb3J0cy5BcnJheURhdGFTb3VyY2UgPSBBcnJheURhdGFTb3VyY2U7XG5jbGFzcyBGbGF0dGVuZWRBcnJheVZpZXcgZXh0ZW5kcyBBcnJheURhdGFTb3VyY2Uge1xuICAgIGNvbnN0cnVjdG9yKHBhcmVudCwgZGVwdGgsIGNhbmNlbGxhdGlvblRva2VuID0gbmV3IGNhbmNlbGxhdGlvbl90b2tlbl9qc18xLkNhbmNlbGxhdGlvblRva2VuKCksIG5hbWUsIGNvbmZpZykge1xuICAgICAgICBzdXBlcihbXSwgbmFtZSk7XG4gICAgICAgIHRoaXMuZGVwdGggPSBkZXB0aDtcbiAgICAgICAgdGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG4gICAgICAgIHRoaXMucmVmcmVzaCgpO1xuICAgICAgICBwYXJlbnQubGlzdGVuKChjaGFuZ2UpID0+IHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIGlmICgoX2EgPSBjb25maWcgPT09IG51bGwgfHwgY29uZmlnID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjb25maWcuaWdub3JlZE9wZXJhdGlvbnMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5pbmNsdWRlcyhjaGFuZ2Uub3BlcmF0aW9uRGV0YWlsZWQpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3dpdGNoIChjaGFuZ2Uub3BlcmF0aW9uRGV0YWlsZWQpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdyZW1vdmVMZWZ0JzpcbiAgICAgICAgICAgICAgICBjYXNlICdyZW1vdmVSaWdodCc6XG4gICAgICAgICAgICAgICAgY2FzZSAncmVtb3ZlJzpcbiAgICAgICAgICAgICAgICBjYXNlICdzd2FwJzpcbiAgICAgICAgICAgICAgICBjYXNlICdyZXBsYWNlJzpcbiAgICAgICAgICAgICAgICBjYXNlICdpbnNlcnQnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ21lcmdlJzpcbiAgICAgICAgICAgICAgICBjYXNlICdwcmVwZW5kJzpcbiAgICAgICAgICAgICAgICBjYXNlICdhcHBlbmQnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2goKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnY2xlYXInOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBjYW5jZWxsYXRpb25Ub2tlbik7XG4gICAgfVxuICAgIHJlZnJlc2goKSB7XG4gICAgICAgIGlmICh0aGlzLnNlc3Npb25Ub2tlbikge1xuICAgICAgICAgICAgdGhpcy5zZXNzaW9uVG9rZW4uY2FuY2VsKCk7XG4gICAgICAgICAgICB0aGlzLnNlc3Npb25Ub2tlbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBkYXRhID0gdGhpcy5wYXJlbnQuZ2V0RGF0YSgpO1xuICAgICAgICBpZiAoZGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBpZiAoZGF0YVswXSBpbnN0YW5jZW9mIEFycmF5RGF0YVNvdXJjZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2Vzc2lvblRva2VuID0gbmV3IGNhbmNlbGxhdGlvbl90b2tlbl9qc18xLkNhbmNlbGxhdGlvblRva2VuKCk7XG4gICAgICAgICAgICAgICAgY29uc3QgY29tYmluYXRpb24gPSBBcnJheURhdGFTb3VyY2UuZnJvbU11bHRpcGxlU291cmNlcyhkYXRhKTtcbiAgICAgICAgICAgICAgICBjb21iaW5hdGlvbi5saXN0ZW4oKGNoYW5nZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcGx5Q29sbGVjdGlvbkNoYW5nZShjaGFuZ2UpO1xuICAgICAgICAgICAgICAgIH0sIHRoaXMuc2Vzc2lvblRva2VuKTtcbiAgICAgICAgICAgICAgICB0aGlzLm1lcmdlKGNvbWJpbmF0aW9uLmdldERhdGEoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1lcmdlKGRhdGEuZmxhdCh0aGlzLmRlcHRoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLkZsYXR0ZW5lZEFycmF5VmlldyA9IEZsYXR0ZW5lZEFycmF5VmlldztcbmNsYXNzIE1hcHBlZEFycmF5VmlldyBleHRlbmRzIEFycmF5RGF0YVNvdXJjZSB7XG4gICAgY29uc3RydWN0b3IocGFyZW50LCBtYXBwZXIsIGNhbmNlbGxhdGlvblRva2VuID0gbmV3IGNhbmNlbGxhdGlvbl90b2tlbl9qc18xLkNhbmNlbGxhdGlvblRva2VuKCksIG5hbWUsIGNvbmZpZykge1xuICAgICAgICBjb25zdCBpbml0aWFsID0gcGFyZW50LmdldERhdGEoKS5tYXAobWFwcGVyKTtcbiAgICAgICAgc3VwZXIoaW5pdGlhbCwgbmFtZSk7XG4gICAgICAgIHRoaXMucGFyZW50ID0gcGFyZW50O1xuICAgICAgICB0aGlzLm1hcHBlciA9IG1hcHBlcjtcbiAgICAgICAgcGFyZW50Lmxpc3RlbigoY2hhbmdlKSA9PiB7XG4gICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICBpZiAoKF9hID0gY29uZmlnID09PSBudWxsIHx8IGNvbmZpZyA9PT0gdm9pZCAwID8gdm9pZCAwIDogY29uZmlnLmlnbm9yZWRPcGVyYXRpb25zKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuaW5jbHVkZXMoY2hhbmdlLm9wZXJhdGlvbkRldGFpbGVkKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN3aXRjaCAoY2hhbmdlLm9wZXJhdGlvbkRldGFpbGVkKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAncmVtb3ZlTGVmdCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlTGVmdChjaGFuZ2UuY291bnQpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdyZW1vdmVSaWdodCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlUmlnaHQoY2hhbmdlLmNvdW50KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAncmVtb3ZlJzpcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGFuZ2UuaXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlKHRoaXMuZGF0YVtjaGFuZ2UuaW5kZXggKyBpXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnY2xlYXInOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3ByZXBlbmQnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc2hpZnQoLi4uY2hhbmdlLml0ZW1zLm1hcCh0aGlzLm1hcHBlcikpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdhcHBlbmQnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcGVuZEFycmF5KGNoYW5nZS5pdGVtcy5tYXAodGhpcy5tYXBwZXIpKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnaW5zZXJ0JzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnNlcnRBdChjaGFuZ2UuaW5kZXgsIC4uLmNoYW5nZS5pdGVtcy5tYXAodGhpcy5tYXBwZXIpKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnc3dhcCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3dhcChjaGFuZ2UuaW5kZXgsIGNoYW5nZS5pbmRleDIpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdyZXBsYWNlJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXQoY2hhbmdlLmluZGV4LCB0aGlzLm1hcHBlcihjaGFuZ2UuaXRlbXNbMF0pKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbWVyZ2UnOlxuICAgICAgICAgICAgICAgICAgICBjb25zdCBvbGQgPSB0aGlzLmRhdGEuc2xpY2UoKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc291cmNlID0gY2hhbmdlLnByZXZpb3VzU3RhdGUuc2xpY2UoKTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGFuZ2UubmV3U3RhdGUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmRhdGEubGVuZ3RoIDw9IGkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEucHVzaCh0aGlzLm1hcHBlcihjaGFuZ2UubmV3U3RhdGVbaV0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2UucHVzaChjaGFuZ2UubmV3U3RhdGVbaV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoc291cmNlW2ldICE9PSBjaGFuZ2UubmV3U3RhdGVbaV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpbmRleCA9IHNvdXJjZS5pbmRleE9mKGNoYW5nZS5uZXdTdGF0ZVtpXSwgaSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhID0gdGhpcy5kYXRhW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBiID0gdGhpcy5kYXRhW2luZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhW2ldID0gYjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhW2luZGV4XSA9IGE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGMgPSBzb3VyY2VbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGQgPSBzb3VyY2VbaW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2VbaV0gPSBkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2VbaW5kZXhdID0gYztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEuc3BsaWNlKGksIDAsIHRoaXMubWFwcGVyKGNoYW5nZS5uZXdTdGF0ZVtpXSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2Uuc3BsaWNlKGksIDAsIGNoYW5nZS5uZXdTdGF0ZVtpXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmRhdGEubGVuZ3RoID4gY2hhbmdlLm5ld1N0YXRlLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhLmxlbmd0aCA9IGNoYW5nZS5uZXdTdGF0ZS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sZW5ndGgudXBkYXRlKHRoaXMuZGF0YS5sZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb246ICdtZXJnZScsXG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25EZXRhaWxlZDogJ21lcmdlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZpb3VzU3RhdGU6IG9sZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXM6IHRoaXMuZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1N0YXRlOiB0aGlzLmRhdGFcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25JdGVtc1JlbW92ZWQuZmlyZShvbGQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uSXRlbXNBZGRlZC5maXJlKHRoaXMuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBjYW5jZWxsYXRpb25Ub2tlbik7XG4gICAgfVxuICAgIHJlZnJlc2goKSB7XG4gICAgICAgIHRoaXMubWVyZ2UodGhpcy5wYXJlbnQuZ2V0RGF0YSgpLm1hcCh0aGlzLm1hcHBlcikpO1xuICAgIH1cbn1cbmV4cG9ydHMuTWFwcGVkQXJyYXlWaWV3ID0gTWFwcGVkQXJyYXlWaWV3O1xuY2xhc3MgUmV2ZXJzZWRBcnJheVZpZXcgZXh0ZW5kcyBBcnJheURhdGFTb3VyY2Uge1xuICAgIGNvbnN0cnVjdG9yKHBhcmVudCwgY2FuY2VsbGF0aW9uVG9rZW4gPSBuZXcgY2FuY2VsbGF0aW9uX3Rva2VuX2pzXzEuQ2FuY2VsbGF0aW9uVG9rZW4oKSwgbmFtZSwgY29uZmlnKSB7XG4gICAgICAgIGNvbnN0IGluaXRpYWwgPSBwYXJlbnQuZ2V0RGF0YSgpLnNsaWNlKCkucmV2ZXJzZSgpO1xuICAgICAgICBzdXBlcihpbml0aWFsLCBuYW1lKTtcbiAgICAgICAgdGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG4gICAgICAgIHBhcmVudC5saXN0ZW4oKGNoYW5nZSkgPT4ge1xuICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgaWYgKChfYSA9IGNvbmZpZyA9PT0gbnVsbCB8fCBjb25maWcgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNvbmZpZy5pZ25vcmVkT3BlcmF0aW9ucykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmluY2x1ZGVzKGNoYW5nZS5vcGVyYXRpb25EZXRhaWxlZCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzd2l0Y2ggKGNoYW5nZS5vcGVyYXRpb25EZXRhaWxlZCkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ3JlbW92ZUxlZnQnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZVJpZ2h0KGNoYW5nZS5jb3VudCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3JlbW92ZVJpZ2h0JzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVMZWZ0KGNoYW5nZS5jb3VudCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3JlbW92ZSc6XG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBjaGFuZ2UuaXRlbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlKGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2NsZWFyJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGVhcigpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdwcmVwZW5kJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHBlbmRBcnJheShjaGFuZ2UuaXRlbXMucmV2ZXJzZSgpKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnYXBwZW5kJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnNoaWZ0KC4uLmNoYW5nZS5pdGVtcy5yZXZlcnNlKCkpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdpbnNlcnQnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1lcmdlKGNoYW5nZS5uZXdTdGF0ZS5zbGljZSgpLnJldmVyc2UoKSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ21lcmdlJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tZXJnZShjaGFuZ2UuaXRlbXMuc2xpY2UoKS5yZXZlcnNlKCkpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdzd2FwJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tZXJnZShjaGFuZ2UubmV3U3RhdGUuc2xpY2UoKS5yZXZlcnNlKCkpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdyZXBsYWNlJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tZXJnZShjaGFuZ2UubmV3U3RhdGUuc2xpY2UoKS5yZXZlcnNlKCkpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgY2FuY2VsbGF0aW9uVG9rZW4pO1xuICAgIH1cbiAgICByZWZyZXNoKCkge1xuICAgICAgICB0aGlzLm1lcmdlKHRoaXMucGFyZW50LmdldERhdGEoKS5zbGljZSgpLnJldmVyc2UoKSk7XG4gICAgfVxufVxuZXhwb3J0cy5SZXZlcnNlZEFycmF5VmlldyA9IFJldmVyc2VkQXJyYXlWaWV3O1xuY2xhc3MgU2xpY2VkQXJyYXlWaWV3IGV4dGVuZHMgQXJyYXlEYXRhU291cmNlIHtcbiAgICBjb25zdHJ1Y3RvcihwYXJlbnQsIHN0YXJ0LCBlbmQsIGNhbmNlbGxhdGlvblRva2VuID0gbmV3IGNhbmNlbGxhdGlvbl90b2tlbl9qc18xLkNhbmNlbGxhdGlvblRva2VuKCksIG5hbWUsIGNvbmZpZykge1xuICAgICAgICBjb25zdCBpbml0aWFsID0gcGFyZW50LmdldERhdGEoKS5zbGljZShzdGFydC52YWx1ZSwgZW5kLnZhbHVlKTtcbiAgICAgICAgc3VwZXIoaW5pdGlhbCwgbmFtZSk7XG4gICAgICAgIHN0YXJ0Lmxpc3RlbigoKSA9PiB0aGlzLm1lcmdlKHBhcmVudC5nZXREYXRhKCkuc2xpY2Uoc3RhcnQudmFsdWUsIGVuZC52YWx1ZSkpLCBjYW5jZWxsYXRpb25Ub2tlbik7XG4gICAgICAgIGVuZC5saXN0ZW4oKCkgPT4gdGhpcy5tZXJnZShwYXJlbnQuZ2V0RGF0YSgpLnNsaWNlKHN0YXJ0LnZhbHVlLCBlbmQudmFsdWUpKSwgY2FuY2VsbGF0aW9uVG9rZW4pO1xuICAgICAgICBwYXJlbnQubGlzdGVuKChjaGFuZ2UpID0+IHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIGlmICgoX2EgPSBjb25maWcgPT09IG51bGwgfHwgY29uZmlnID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjb25maWcuaWdub3JlZE9wZXJhdGlvbnMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5pbmNsdWRlcyhjaGFuZ2Uub3BlcmF0aW9uRGV0YWlsZWQpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3dpdGNoIChjaGFuZ2Uub3BlcmF0aW9uRGV0YWlsZWQpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdyZW1vdmVMZWZ0JzpcbiAgICAgICAgICAgICAgICBjYXNlICdyZW1vdmVSaWdodCc6XG4gICAgICAgICAgICAgICAgY2FzZSAncmVtb3ZlJzpcbiAgICAgICAgICAgICAgICBjYXNlICdhcHBlbmQnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ3ByZXBlbmQnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ2luc2VydCc6XG4gICAgICAgICAgICAgICAgY2FzZSAnc3dhcCc6XG4gICAgICAgICAgICAgICAgY2FzZSAncmVwbGFjZSc6XG4gICAgICAgICAgICAgICAgY2FzZSAnbWVyZ2UnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1lcmdlKHBhcmVudC5nZXREYXRhKCkuc2xpY2Uoc3RhcnQudmFsdWUsIGVuZC52YWx1ZSkpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdjbGVhcic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIGNhbmNlbGxhdGlvblRva2VuKTtcbiAgICB9XG59XG5leHBvcnRzLlNsaWNlZEFycmF5VmlldyA9IFNsaWNlZEFycmF5VmlldztcbmNsYXNzIFVuaXF1ZUFycmF5VmlldyBleHRlbmRzIEFycmF5RGF0YVNvdXJjZSB7XG4gICAgY29uc3RydWN0b3IocGFyZW50LCBjYW5jZWxsYXRpb25Ub2tlbiA9IG5ldyBjYW5jZWxsYXRpb25fdG9rZW5fanNfMS5DYW5jZWxsYXRpb25Ub2tlbigpLCBuYW1lLCBjb25maWcpIHtcbiAgICAgICAgY29uc3QgaW5pdGlhbCA9IEFycmF5LmZyb20obmV3IFNldChwYXJlbnQuZ2V0RGF0YSgpKSk7XG4gICAgICAgIHN1cGVyKGluaXRpYWwsIG5hbWUpO1xuICAgICAgICBsZXQgZmlsdGVyZWRJdGVtcztcbiAgICAgICAgcGFyZW50Lmxpc3RlbigoY2hhbmdlKSA9PiB7XG4gICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICBpZiAoKF9hID0gY29uZmlnID09PSBudWxsIHx8IGNvbmZpZyA9PT0gdm9pZCAwID8gdm9pZCAwIDogY29uZmlnLmlnbm9yZWRPcGVyYXRpb25zKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuaW5jbHVkZXMoY2hhbmdlLm9wZXJhdGlvbkRldGFpbGVkKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN3aXRjaCAoY2hhbmdlLm9wZXJhdGlvbkRldGFpbGVkKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAncmVtb3ZlTGVmdCc6XG4gICAgICAgICAgICAgICAgY2FzZSAncmVtb3ZlUmlnaHQnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ3JlbW92ZSc6XG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBjaGFuZ2UuaXRlbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY2hhbmdlLm5ld1N0YXRlLmluY2x1ZGVzKGl0ZW0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmUoaXRlbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnY2xlYXInOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3ByZXBlbmQnOlxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJlZEl0ZW1zID0gY2hhbmdlLml0ZW1zLmZpbHRlcigoZSkgPT4gIXRoaXMuZGF0YS5pbmNsdWRlcyhlKSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zaGlmdCguLi5maWx0ZXJlZEl0ZW1zKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnYXBwZW5kJzpcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyZWRJdGVtcyA9IGNoYW5nZS5pdGVtcy5maWx0ZXIoKGUpID0+ICF0aGlzLmRhdGEuaW5jbHVkZXMoZSkpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcGVuZEFycmF5KGZpbHRlcmVkSXRlbXMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdpbnNlcnQnOlxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJlZEl0ZW1zID0gY2hhbmdlLml0ZW1zLmZpbHRlcigoZSkgPT4gIXRoaXMuZGF0YS5pbmNsdWRlcyhlKSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5zZXJ0QXQoY2hhbmdlLmluZGV4LCAuLi5maWx0ZXJlZEl0ZW1zKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbWVyZ2UnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1lcmdlKEFycmF5LmZyb20obmV3IFNldChwYXJlbnQuZ2V0RGF0YSgpKSkpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdzd2FwJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zd2FwKGNoYW5nZS5pbmRleCwgY2hhbmdlLmluZGV4Mik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3JlcGxhY2UnOlxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5kYXRhLmluY2x1ZGVzKGNoYW5nZS5pdGVtc1swXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlKGNoYW5nZS50YXJnZXQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXQoY2hhbmdlLmluZGV4LCBjaGFuZ2UuaXRlbXNbMF0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBjYW5jZWxsYXRpb25Ub2tlbik7XG4gICAgfVxufVxuZXhwb3J0cy5VbmlxdWVBcnJheVZpZXcgPSBVbmlxdWVBcnJheVZpZXc7XG5jbGFzcyBTb3J0ZWRBcnJheVZpZXcgZXh0ZW5kcyBBcnJheURhdGFTb3VyY2Uge1xuICAgIGNvbnN0cnVjdG9yKHBhcmVudCwgY29tcGFyYXRvciwgY2FuY2VsbGF0aW9uVG9rZW4gPSBuZXcgY2FuY2VsbGF0aW9uX3Rva2VuX2pzXzEuQ2FuY2VsbGF0aW9uVG9rZW4oKSwgbmFtZSwgY29uZmlnKSB7XG4gICAgICAgIGNvbnN0IGluaXRpYWwgPSBwYXJlbnQuZ2V0RGF0YSgpLnNsaWNlKCkuc29ydChjb21wYXJhdG9yKTtcbiAgICAgICAgc3VwZXIoaW5pdGlhbCwgbmFtZSk7XG4gICAgICAgIHRoaXMucGFyZW50ID0gcGFyZW50O1xuICAgICAgICB0aGlzLmNvbXBhcmF0b3IgPSBjb21wYXJhdG9yO1xuICAgICAgICBwYXJlbnQubGlzdGVuKChjaGFuZ2UpID0+IHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIGlmICgoX2EgPSBjb25maWcgPT09IG51bGwgfHwgY29uZmlnID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjb25maWcuaWdub3JlZE9wZXJhdGlvbnMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5pbmNsdWRlcyhjaGFuZ2Uub3BlcmF0aW9uRGV0YWlsZWQpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3dpdGNoIChjaGFuZ2Uub3BlcmF0aW9uRGV0YWlsZWQpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdyZW1vdmVMZWZ0JzpcbiAgICAgICAgICAgICAgICBjYXNlICdyZW1vdmVSaWdodCc6XG4gICAgICAgICAgICAgICAgY2FzZSAncmVtb3ZlJzpcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIGNoYW5nZS5pdGVtcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmUoaXRlbSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnY2xlYXInOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3ByZXBlbmQnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc2hpZnQoLi4uY2hhbmdlLml0ZW1zKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhLnNvcnQodGhpcy5jb21wYXJhdG9yKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnYXBwZW5kJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHBlbmRTb3J0ZWQoY2hhbmdlLml0ZW1zKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnaW5zZXJ0JzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHBlbmRTb3J0ZWQoY2hhbmdlLml0ZW1zKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbWVyZ2UnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1lcmdlKGNoYW5nZS5pdGVtcy5zbGljZSgpLnNvcnQodGhpcy5jb21wYXJhdG9yKSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3N3YXAnOlxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdyZXBsYWNlJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmUoY2hhbmdlLnRhcmdldCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXBwZW5kU29ydGVkKGNoYW5nZS5pdGVtcyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBjYW5jZWxsYXRpb25Ub2tlbik7XG4gICAgfVxuICAgIGFwcGVuZFNvcnRlZChpdGVtcykge1xuICAgICAgICBpZiAoaXRlbXMubGVuZ3RoID09PSAxICYmIHRoaXMuZGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMucHVzaChpdGVtc1swXSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm1lcmdlKHRoaXMuZGF0YS5jb25jYXQoaXRlbXMpLnNvcnQodGhpcy5jb21wYXJhdG9yKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVmcmVzaCgpIHtcbiAgICAgICAgdGhpcy5tZXJnZSh0aGlzLnBhcmVudC5nZXREYXRhKCkuc2xpY2UoKS5zb3J0KHRoaXMuY29tcGFyYXRvcikpO1xuICAgIH1cbn1cbmV4cG9ydHMuU29ydGVkQXJyYXlWaWV3ID0gU29ydGVkQXJyYXlWaWV3O1xuY2xhc3MgRmlsdGVyZWRBcnJheVZpZXcgZXh0ZW5kcyBBcnJheURhdGFTb3VyY2Uge1xuICAgIGNvbnN0cnVjdG9yKHBhcmVudCwgZmlsdGVyLCBjYW5jZWxsYXRpb25Ub2tlbiA9IG5ldyBjYW5jZWxsYXRpb25fdG9rZW5fanNfMS5DYW5jZWxsYXRpb25Ub2tlbigpLCBuYW1lLCBjb25maWcpIHtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocGFyZW50KSkge1xuICAgICAgICAgICAgcGFyZW50ID0gbmV3IEFycmF5RGF0YVNvdXJjZShwYXJlbnQpO1xuICAgICAgICB9XG4gICAgICAgIGZpbHRlciA9IGZpbHRlciAhPT0gbnVsbCAmJiBmaWx0ZXIgIT09IHZvaWQgMCA/IGZpbHRlciA6ICgoKSA9PiB0cnVlKTtcbiAgICAgICAgY29uc3QgaW5pdGlhbCA9IHBhcmVudC5kYXRhLmZpbHRlcihmaWx0ZXIpO1xuICAgICAgICBzdXBlcihpbml0aWFsLCBuYW1lKTtcbiAgICAgICAgdGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG4gICAgICAgIHRoaXMudmlld0ZpbHRlciA9IGZpbHRlcjtcbiAgICAgICAgcGFyZW50Lmxpc3RlbigoY2hhbmdlKSA9PiB7XG4gICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICBpZiAoKF9hID0gY29uZmlnID09PSBudWxsIHx8IGNvbmZpZyA9PT0gdm9pZCAwID8gdm9pZCAwIDogY29uZmlnLmlnbm9yZWRPcGVyYXRpb25zKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuaW5jbHVkZXMoY2hhbmdlLm9wZXJhdGlvbkRldGFpbGVkKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBmaWx0ZXJlZEl0ZW1zO1xuICAgICAgICAgICAgc3dpdGNoIChjaGFuZ2Uub3BlcmF0aW9uRGV0YWlsZWQpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdjbGVhcic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAncmVtb3ZlTGVmdCc6XG4gICAgICAgICAgICAgICAgY2FzZSAncmVtb3ZlUmlnaHQnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ3JlbW92ZSc6XG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBjaGFuZ2UuaXRlbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlKGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3ByZXBlbmQnOlxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJlZEl0ZW1zID0gY2hhbmdlLml0ZW1zLmZpbHRlcih0aGlzLnZpZXdGaWx0ZXIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc2hpZnQoLi4uZmlsdGVyZWRJdGVtcyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2FwcGVuZCc6XG4gICAgICAgICAgICAgICAgICAgIGZpbHRlcmVkSXRlbXMgPSBjaGFuZ2UuaXRlbXMuZmlsdGVyKHRoaXMudmlld0ZpbHRlcik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXBwZW5kQXJyYXkoZmlsdGVyZWRJdGVtcyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2luc2VydCc6XG4gICAgICAgICAgICAgICAgICAgIGZpbHRlcmVkSXRlbXMgPSBjaGFuZ2UuaXRlbXMuZmlsdGVyKHRoaXMudmlld0ZpbHRlcik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5zZXJ0QXQoY2hhbmdlLmluZGV4LCAuLi5maWx0ZXJlZEl0ZW1zKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbWVyZ2UnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1lcmdlKGNoYW5nZS5pdGVtcy5maWx0ZXIodGhpcy52aWV3RmlsdGVyKSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3N3YXAnOlxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpbmRleEEgPSB0aGlzLmRhdGEuaW5kZXhPZihjaGFuZ2UuaXRlbXNbMF0pO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpbmRleEIgPSB0aGlzLmRhdGEuaW5kZXhPZihjaGFuZ2UuaXRlbXNbMV0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXhBICE9PSAtMSAmJiBpbmRleEIgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN3YXAoaW5kZXhBLCBpbmRleEIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3JlcGxhY2UnOlxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuZGF0YS5pbmRleE9mKGNoYW5nZS50YXJnZXQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhY2NlcHROZXcgPSB0aGlzLnZpZXdGaWx0ZXIoY2hhbmdlLml0ZW1zWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhY2NlcHROZXcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldChpbmRleCwgY2hhbmdlLml0ZW1zWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlKGNoYW5nZS50YXJnZXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBjYW5jZWxsYXRpb25Ub2tlbik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlcGxhY2VzIHRoZSBmaWx0ZXIgZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0gZmlsdGVyXG4gICAgICogQHJldHVybnMgcmV0dXJucyBuZXcgc2l6ZSBvZiBhcnJheSB2aWV3IGFmdGVyIGFwcGx5aW5nIGZpbHRlclxuICAgICAqL1xuICAgIHVwZGF0ZUZpbHRlcihmaWx0ZXIpIHtcbiAgICAgICAgaWYgKHRoaXMudmlld0ZpbHRlciA9PT0gZmlsdGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnZpZXdGaWx0ZXIgPSBmaWx0ZXI7XG4gICAgICAgIHRoaXMucmVmcmVzaCgpO1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmxlbmd0aDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVjYWxjdWxhdGVzIHRoZSBmaWx0ZXIuIE9ubHkgbmVlZGVkIGlmIHlvdXIgZmlsdGVyIGZ1bmN0aW9uIGlzbid0IHB1cmUgYW5kIHlvdSBrbm93IHRoZSByZXN1bHQgd291bGQgYmUgZGlmZmVyZW50IGlmIHJ1biBhZ2FpbiBjb21wYXJlZCB0byBiZWZvcmVcbiAgICAgKi9cbiAgICByZWZyZXNoKCkge1xuICAgICAgICB0aGlzLm1lcmdlKHRoaXMucGFyZW50LmRhdGEuZmlsdGVyKHRoaXMudmlld0ZpbHRlcikpO1xuICAgIH1cbn1cbmV4cG9ydHMuRmlsdGVyZWRBcnJheVZpZXcgPSBGaWx0ZXJlZEFycmF5VmlldztcbmZ1bmN0aW9uIHByb2Nlc3NUcmFuc2Zvcm0ob3BlcmF0aW9ucywgcmVzdWx0KSB7XG4gICAgcmV0dXJuIGFzeW5jICh2KSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IG9wZXJhdGlvbiBvZiBvcGVyYXRpb25zKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChvcGVyYXRpb24ub3BlcmF0aW9uVHlwZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIG9wZXJhdG9yX21vZGVsX2pzXzEuT3BlcmF0aW9uVHlwZS5OT09QOlxuICAgICAgICAgICAgICAgICAgICBjYXNlIG9wZXJhdG9yX21vZGVsX2pzXzEuT3BlcmF0aW9uVHlwZS5NQVA6XG4gICAgICAgICAgICAgICAgICAgICAgICB2ID0gb3BlcmF0aW9uLm9wZXJhdGlvbih2KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIG9wZXJhdG9yX21vZGVsX2pzXzEuT3BlcmF0aW9uVHlwZS5NQVBfREVMQVlfRklMVEVSOlxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdG1wID0gYXdhaXQgb3BlcmF0aW9uLm9wZXJhdGlvbih2KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0bXAuY2FuY2VsbGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdiA9IGF3YWl0IHRtcC5pdGVtO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2Ugb3BlcmF0b3JfbW9kZWxfanNfMS5PcGVyYXRpb25UeXBlLkRFTEFZOlxuICAgICAgICAgICAgICAgICAgICBjYXNlIG9wZXJhdG9yX21vZGVsX2pzXzEuT3BlcmF0aW9uVHlwZS5NQVBfREVMQVk6XG4gICAgICAgICAgICAgICAgICAgICAgICB2ID0gYXdhaXQgb3BlcmF0aW9uLm9wZXJhdGlvbih2KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIG9wZXJhdG9yX21vZGVsX2pzXzEuT3BlcmF0aW9uVHlwZS5ERUxBWV9GSUxURVI6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIShhd2FpdCBvcGVyYXRpb24ub3BlcmF0aW9uKHYpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIG9wZXJhdG9yX21vZGVsX2pzXzEuT3BlcmF0aW9uVHlwZS5GSUxURVI6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW9wZXJhdGlvbi5vcGVyYXRpb24odikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXN1bHQudXBkYXRlKHYpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICByZXN1bHQuZW1pdEVycm9yKGUpO1xuICAgICAgICB9XG4gICAgfTtcbn1cbmV4cG9ydHMucHJvY2Vzc1RyYW5zZm9ybSA9IHByb2Nlc3NUcmFuc2Zvcm07XG5jbGFzcyBNYXBEYXRhU291cmNlIHtcbiAgICBjb25zdHJ1Y3Rvcihpbml0aWFsRGF0YSkge1xuICAgICAgICB0aGlzLmRhdGEgPSBpbml0aWFsRGF0YSAhPT0gbnVsbCAmJiBpbml0aWFsRGF0YSAhPT0gdm9pZCAwID8gaW5pdGlhbERhdGEgOiBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMudXBkYXRlRXZlbnQgPSBuZXcgZXZlbnRfZW1pdHRlcl9qc18xLkV2ZW50RW1pdHRlcigpO1xuICAgICAgICB0aGlzLnVwZGF0ZUV2ZW50T25LZXkgPSBuZXcgTWFwKCk7XG4gICAgfVxuICAgIGNhbmNlbEFsbCgpIHtcbiAgICAgICAgdGhpcy51cGRhdGVFdmVudC5jYW5jZWxBbGwoKTtcbiAgICAgICAgdGhpcy51cGRhdGVFdmVudE9uS2V5LmZvckVhY2goKHYsIGspID0+IHYuY2FuY2VsQWxsKCkpO1xuICAgICAgICB0aGlzLnVwZGF0ZUV2ZW50T25LZXkuY2xlYXIoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ29ubmVjdHMgdG8gYW4gYXVydW0tc2VydmVyIGV4cG9zZWQgbWFwIGRhdGFzb3VyY2UuIFZpZXcgaHR0cHM6Ly9naXRodWIuY29tL0N5YmVyUGhvZW5peDkwL2F1cnVtLXNlcnZlciBmb3IgbW9yZSBpbmZvcm1hdGlvblxuICAgICAqIE5vdGUgdGhhdCB0eXBlIHNhZmV0eSBpcyBub3QgZ3VhcmFudGVlZC4gV2hhdGV2ZXIgdGhlIHNlcnZlciBzZW5kcyBhcyBhbiB1cGRhdGUgd2lsbCBiZSBwcm9wYWdhdGVkLiBNYWtlIHN1cmUgeW91IHRydXN0IHRoZSBzZXJ2ZXJcbiAgICAgKiBAcGFyYW0gIHtBdXJ1bVNlcnZlckluZm99IGF1cnVtU2VydmVySW5mb1xuICAgICAqIEByZXR1cm5zIERhdGFTb3VyY2VcbiAgICAgKi9cbiAgICBzdGF0aWMgZnJvbVJlbW90ZVNvdXJjZShhdXJ1bVNlcnZlckluZm8sIGNhbmNlbGxhdGlvbikge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBuZXcgTWFwRGF0YVNvdXJjZSgpO1xuICAgICAgICAoMCwgYXVydW1fc2VydmVyX2NsaWVudF9qc18xLnN5bmNNYXBEYXRhU291cmNlKShyZXN1bHQsIGF1cnVtU2VydmVySW5mbywgY2FuY2VsbGF0aW9uKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgc3RhdGljIGZyb21NdWx0aXBsZU1hcHMobWFwcywgY2FuY2VsbGF0aW9uVG9rZW4pIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gbmV3IE1hcERhdGFTb3VyY2UoKTtcbiAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICBmb3IgKGNvbnN0IG1hcCBvZiBtYXBzKSB7XG4gICAgICAgICAgICBsZXQgaW5kZXggPSBpO1xuICAgICAgICAgICAgcmVzdWx0LmFzc2lnbihtYXApO1xuICAgICAgICAgICAgbWFwLmxpc3RlbigoY2hhbmdlKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGlzT3ZlcndyaXR0ZW4gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gaW5kZXggKyAxOyBqIDwgbWFwcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAobWFwc1tqXS5oYXMoY2hhbmdlLmtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzT3ZlcndyaXR0ZW4gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFpc092ZXJ3cml0dGVuKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjaGFuZ2UuZGVsZXRlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmRlbGV0ZShjaGFuZ2Uua2V5KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5zZXQoY2hhbmdlLmtleSwgY2hhbmdlLm5ld1ZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIGNhbmNlbGxhdGlvblRva2VuKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBwaXBlKHRhcmdldCwgY2FuY2VsbGF0aW9uKSB7XG4gICAgICAgIHRoaXMubGlzdGVuQW5kUmVwZWF0KChjKSA9PiB0YXJnZXQuYXBwbHlNYXBDaGFuZ2UoYyksIGNhbmNlbGxhdGlvbik7XG4gICAgfVxuICAgIGZvckVhY2goY2FsbGJhY2tmbiwgdGhpc0FyZykge1xuICAgICAgICB0aGlzLmRhdGEuZm9yRWFjaChjYWxsYmFja2ZuLCB0aGlzQXJnKTtcbiAgICB9XG4gICAgdG9TdHJpbmcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgc3RhdGljIHRvTWFwRGF0YVNvdXJjZSh2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBNYXBEYXRhU291cmNlKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IE1hcERhdGFTb3VyY2UodmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFwcGx5TWFwQ2hhbmdlKGNoYW5nZSkge1xuICAgICAgICBpZiAoY2hhbmdlLmRlbGV0ZWQgJiYgdGhpcy5kYXRhLmhhcyhjaGFuZ2Uua2V5KSkge1xuICAgICAgICAgICAgdGhpcy5kZWxldGUoY2hhbmdlLmtleSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIWNoYW5nZS5kZWxldGVkICYmICF0aGlzLmRhdGEuaGFzKGNoYW5nZS5rZXkpKSB7XG4gICAgICAgICAgICB0aGlzLnNldChjaGFuZ2Uua2V5LCBjaGFuZ2UubmV3VmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBkYXRhc291cmNlIGZvciBhIHNpbmdsZSBrZXkgb2YgdGhlIG9iamVjdFxuICAgICAqIEBwYXJhbSBrZXlcbiAgICAgKiBAcGFyYW0gY2FuY2VsbGF0aW9uVG9rZW5cbiAgICAgKi9cbiAgICBwaWNrKGtleSwgY2FuY2VsbGF0aW9uVG9rZW4pIHtcbiAgICAgICAgY29uc3Qgc3ViRGF0YVNvdXJjZSA9IG5ldyBEYXRhU291cmNlKHRoaXMuZGF0YS5nZXQoa2V5KSk7XG4gICAgICAgIHRoaXMubGlzdGVuT25LZXkoa2V5LCAodikgPT4ge1xuICAgICAgICAgICAgc3ViRGF0YVNvdXJjZS51cGRhdGUodi5uZXdWYWx1ZSk7XG4gICAgICAgIH0sIGNhbmNlbGxhdGlvblRva2VuKTtcbiAgICAgICAgcmV0dXJuIHN1YkRhdGFTb3VyY2U7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIExpc3RlbiB0byBjaGFuZ2VzIG9mIHRoZSBvYmplY3RcbiAgICAgKi9cbiAgICBsaXN0ZW4oY2FsbGJhY2ssIGNhbmNlbGxhdGlvblRva2VuKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnVwZGF0ZUV2ZW50LnN1YnNjcmliZShjYWxsYmFjaywgY2FuY2VsbGF0aW9uVG9rZW4pLmNhbmNlbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2FtZSBhcyBsaXN0ZW4gYnV0IHdpbGwgaW1tZWRpYXRlbHkgY2FsbCB0aGUgY2FsbGJhY2sgd2l0aCB0aGUgY3VycmVudCB2YWx1ZSBvZiBlYWNoIGtleVxuICAgICAqL1xuICAgIGxpc3RlbkFuZFJlcGVhdChjYWxsYmFjaywgY2FuY2VsbGF0aW9uVG9rZW4pIHtcbiAgICAgICAgY29uc3QgYyA9IHRoaXMudXBkYXRlRXZlbnQuc3Vic2NyaWJlKGNhbGxiYWNrLCBjYW5jZWxsYXRpb25Ub2tlbikuY2FuY2VsO1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiB0aGlzLmRhdGEua2V5cygpKSB7XG4gICAgICAgICAgICBjYWxsYmFjayh7XG4gICAgICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgICAgIG5ld1ZhbHVlOiB0aGlzLmRhdGEuZ2V0KGtleSksXG4gICAgICAgICAgICAgICAgb2xkVmFsdWU6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBkZWxldGVkOiBmYWxzZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGM7XG4gICAgfVxuICAgIG1hcChtYXBwZXIsIGNhbmNlbGxhdGlvbikge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBuZXcgTWFwRGF0YVNvdXJjZSgpO1xuICAgICAgICBjb25zdCBsaWZlVGltZU1hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5saXN0ZW5BbmRSZXBlYXQoKGNoYW5nZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGNoYW5nZS5kZWxldGVkKSB7XG4gICAgICAgICAgICAgICAgbGlmZVRpbWVNYXAuZ2V0KGNoYW5nZS5rZXkpLmNhbmNlbCgpO1xuICAgICAgICAgICAgICAgIGxpZmVUaW1lTWFwLmRlbGV0ZShjaGFuZ2Uua2V5KTtcbiAgICAgICAgICAgICAgICByZXN1bHQuZGVsZXRlKGNoYW5nZS5rZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbGlmZVRpbWVUb2tlbiA9IG5ldyBjYW5jZWxsYXRpb25fdG9rZW5fanNfMS5DYW5jZWxsYXRpb25Ub2tlbigpO1xuICAgICAgICAgICAgICAgIGlmIChsaWZlVGltZU1hcC5oYXMoY2hhbmdlLmtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgbGlmZVRpbWVNYXAuZ2V0KGNoYW5nZS5rZXkpLmNhbmNlbCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsaWZlVGltZU1hcC5zZXQoY2hhbmdlLmtleSwgbGlmZVRpbWVUb2tlbik7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3SXRlbSA9IG1hcHBlcihjaGFuZ2Uua2V5LCBjaGFuZ2UubmV3VmFsdWUsIGxpZmVUaW1lVG9rZW4pO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5zZXQoY2hhbmdlLmtleSwgbmV3SXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIGNhbmNlbGxhdGlvbik7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIHRvQXJyYXlEYXRhU291cmNlKGNhbmNlbGxhdGlvbikge1xuICAgICAgICBjb25zdCBzdGF0ZU1hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gbmV3IEFycmF5RGF0YVNvdXJjZSgpO1xuICAgICAgICB0aGlzLmxpc3RlbkFuZFJlcGVhdCgoY2hhbmdlKSA9PiB7XG4gICAgICAgICAgICBpZiAoY2hhbmdlLmRlbGV0ZWQgJiYgc3RhdGVNYXAuaGFzKGNoYW5nZS5rZXkpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IHN0YXRlTWFwLmdldChjaGFuZ2Uua2V5KTtcbiAgICAgICAgICAgICAgICByZXN1bHQucmVtb3ZlKGl0ZW0pO1xuICAgICAgICAgICAgICAgIHN0YXRlTWFwLmRlbGV0ZShjaGFuZ2Uua2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHN0YXRlTWFwLmhhcyhjaGFuZ2Uua2V5KSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld0l0ZW0gPSBjaGFuZ2UubmV3VmFsdWU7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnJlcGxhY2Uoc3RhdGVNYXAuZ2V0KGNoYW5nZS5rZXkpLCBuZXdJdGVtKTtcbiAgICAgICAgICAgICAgICBzdGF0ZU1hcC5zZXQoY2hhbmdlLmtleSwgbmV3SXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICghc3RhdGVNYXAuaGFzKGNoYW5nZS5rZXkpICYmICFjaGFuZ2UuZGVsZXRlZCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld0l0ZW0gPSBjaGFuZ2UubmV3VmFsdWU7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2gobmV3SXRlbSk7XG4gICAgICAgICAgICAgICAgc3RhdGVNYXAuc2V0KGNoYW5nZS5rZXksIG5ld0l0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBjYW5jZWxsYXRpb24pO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBjbGVhcigpIHtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgdGhpcy5kYXRhLmtleXMoKSkge1xuICAgICAgICAgICAgdGhpcy5kZWxldGUoa2V5KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBTYW1lIGFzIGxpc3Rlbk9uS2V5IGJ1dCB3aWxsIGltbWVkaWF0ZWx5IGNhbGwgdGhlIGNhbGxiYWNrIHdpdGggdGhlIGN1cnJlbnQgdmFsdWUgZmlyc3RcbiAgICAgKi9cbiAgICBsaXN0ZW5PbktleUFuZFJlcGVhdChrZXksIGNhbGxiYWNrLCBjYW5jZWxsYXRpb25Ub2tlbikge1xuICAgICAgICBjYWxsYmFjayh7XG4gICAgICAgICAgICBrZXksXG4gICAgICAgICAgICBuZXdWYWx1ZTogdGhpcy5kYXRhLmdldChrZXkpLFxuICAgICAgICAgICAgb2xkVmFsdWU6IHVuZGVmaW5lZFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdGVuT25LZXkoa2V5LCBjYWxsYmFjaywgY2FuY2VsbGF0aW9uVG9rZW4pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBMaXN0ZW4gdG8gY2hhbmdlcyBvZiBhIHNpbmdsZSBrZXkgb2YgdGhlIG9iamVjdFxuICAgICAqL1xuICAgIGxpc3Rlbk9uS2V5KGtleSwgY2FsbGJhY2ssIGNhbmNlbGxhdGlvblRva2VuKSB7XG4gICAgICAgIGlmICghdGhpcy51cGRhdGVFdmVudE9uS2V5LmhhcyhrZXkpKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUV2ZW50T25LZXkuc2V0KGtleSwgbmV3IGV2ZW50X2VtaXR0ZXJfanNfMS5FdmVudEVtaXR0ZXIoKSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZXZlbnQgPSB0aGlzLnVwZGF0ZUV2ZW50T25LZXkuZ2V0KGtleSk7XG4gICAgICAgIHJldHVybiBldmVudC5zdWJzY3JpYmUoY2FsbGJhY2ssIGNhbmNlbGxhdGlvblRva2VuKS5jYW5jZWw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYWxsIHRoZSBrZXlzIG9mIHRoZSBvYmplY3QgaW4gdGhlIHNvdXJjZVxuICAgICAqL1xuICAgIGtleXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEua2V5cygpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFsbCB0aGUgdmFsdWVzIG9mIHRoZSBvYmplY3QgaW4gdGhlIHNvdXJjZVxuICAgICAqL1xuICAgIHZhbHVlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS52YWx1ZXMoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogZ2V0IHRoZSBjdXJyZW50IHZhbHVlIG9mIGEga2V5IG9mIHRoZSBvYmplY3RcbiAgICAgKiBAcGFyYW0ga2V5XG4gICAgICovXG4gICAgZ2V0KGtleSkge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldChrZXkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBjaGVjayBpZiBtYXAgaGFzIGEga2V5XG4gICAgICogQHBhcmFtIGtleVxuICAgICAqL1xuICAgIGhhcyhrZXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5oYXMoa2V5KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogZGVsZXRlIGEga2V5IGZyb20gdGhlIG9iamVjdFxuICAgICAqIEBwYXJhbSBrZXlcbiAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgKi9cbiAgICBkZWxldGUoa2V5KSB7XG4gICAgICAgIGlmICghdGhpcy5oYXMoa2V5KSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG9sZCA9IHRoaXMuZGF0YS5nZXQoa2V5KTtcbiAgICAgICAgdGhpcy5kYXRhLmRlbGV0ZShrZXkpO1xuICAgICAgICB0aGlzLnVwZGF0ZUV2ZW50LmZpcmUoeyBvbGRWYWx1ZTogb2xkLCBrZXksIG5ld1ZhbHVlOiB1bmRlZmluZWQsIGRlbGV0ZWQ6IHRydWUgfSk7XG4gICAgICAgIGlmICh0aGlzLnVwZGF0ZUV2ZW50T25LZXkuaGFzKGtleSkpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlRXZlbnRPbktleS5nZXQoa2V5KS5maXJlKHsgb2xkVmFsdWU6IG9sZCwga2V5LCBuZXdWYWx1ZTogdW5kZWZpbmVkIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIHNldCB0aGUgdmFsdWUgZm9yIGEga2V5IG9mIHRoZSBvYmplY3RcbiAgICAgKiBAcGFyYW0ga2V5XG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICovXG4gICAgc2V0KGtleSwgdmFsdWUpIHtcbiAgICAgICAgaWYgKHRoaXMuZGF0YS5nZXQoa2V5KSA9PT0gdmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBvbGQgPSB0aGlzLmRhdGEuZ2V0KGtleSk7XG4gICAgICAgIHRoaXMuZGF0YS5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgICAgIHRoaXMudXBkYXRlRXZlbnQuZmlyZSh7IG9sZFZhbHVlOiBvbGQsIGtleSwgbmV3VmFsdWU6IHRoaXMuZGF0YS5nZXQoa2V5KSB9KTtcbiAgICAgICAgaWYgKHRoaXMudXBkYXRlRXZlbnRPbktleS5oYXMoa2V5KSkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVFdmVudE9uS2V5LmdldChrZXkpLmZpcmUoeyBvbGRWYWx1ZTogb2xkLCBrZXksIG5ld1ZhbHVlOiB0aGlzLmRhdGEuZ2V0KGtleSkgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogTWVyZ2UgdGhlIGtleSB2YWx1ZSBwYWlycyBvZiBhbiBvYmplY3QgaW50byB0aGlzIG9iamVjdCBub24gcmVjdXJzaXZlbHlcbiAgICAgKiBAcGFyYW0gbmV3RGF0YVxuICAgICAqL1xuICAgIGFzc2lnbihuZXdEYXRhKSB7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IG9mIG5ld0RhdGEua2V5cygpKSB7XG4gICAgICAgICAgICB0aGlzLnNldChrZXksIG5ld0RhdGEuZ2V0KGtleSkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBzaGFsbG93IGNvcHkgb2YgdGhlIG1hcFxuICAgICAqL1xuICAgIHRvTWFwKCkge1xuICAgICAgICByZXR1cm4gbmV3IE1hcCh0aGlzLmRhdGEuZW50cmllcygpKTtcbiAgICB9XG59XG5leHBvcnRzLk1hcERhdGFTb3VyY2UgPSBNYXBEYXRhU291cmNlO1xuY2xhc3MgU2V0RGF0YVNvdXJjZSB7XG4gICAgY29uc3RydWN0b3IoaW5pdGlhbERhdGEpIHtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoaW5pdGlhbERhdGEpKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGEgPSBuZXcgU2V0KGluaXRpYWxEYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YSA9IGluaXRpYWxEYXRhICE9PSBudWxsICYmIGluaXRpYWxEYXRhICE9PSB2b2lkIDAgPyBpbml0aWFsRGF0YSA6IG5ldyBTZXQoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnVwZGF0ZUV2ZW50ID0gbmV3IGV2ZW50X2VtaXR0ZXJfanNfMS5FdmVudEVtaXR0ZXIoKTtcbiAgICAgICAgdGhpcy51cGRhdGVFdmVudE9uS2V5ID0gbmV3IE1hcCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDb25uZWN0cyB0byBhbiBhdXJ1bS1zZXJ2ZXIgZXhwb3NlZCBzZXQgZGF0YXNvdXJjZS4gVmlldyBodHRwczovL2dpdGh1Yi5jb20vQ3liZXJQaG9lbml4OTAvYXVydW0tc2VydmVyIGZvciBtb3JlIGluZm9ybWF0aW9uXG4gICAgICogTm90ZSB0aGF0IHR5cGUgc2FmZXR5IGlzIG5vdCBndWFyYW50ZWVkLiBXaGF0ZXZlciB0aGUgc2VydmVyIHNlbmRzIGFzIGFuIHVwZGF0ZSB3aWxsIGJlIHByb3BhZ2F0ZWQuIE1ha2Ugc3VyZSB5b3UgdHJ1c3QgdGhlIHNlcnZlclxuICAgICAqIEBwYXJhbSAge0F1cnVtU2VydmVySW5mb30gYXVydW1TZXJ2ZXJJbmZvXG4gICAgICogQHJldHVybnMgRGF0YVNvdXJjZVxuICAgICAqL1xuICAgIHN0YXRpYyBmcm9tUmVtb3RlU291cmNlKGF1cnVtU2VydmVySW5mbywgY2FuY2VsbGF0aW9uKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBTZXREYXRhU291cmNlKHVuZGVmaW5lZCk7XG4gICAgICAgICgwLCBhdXJ1bV9zZXJ2ZXJfY2xpZW50X2pzXzEuc3luY1NldERhdGFTb3VyY2UpKHJlc3VsdCwgYXVydW1TZXJ2ZXJJbmZvLCBjYW5jZWxsYXRpb24pO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgYWxsIGxpc3RlbmVyc1xuICAgICAqL1xuICAgIGNhbmNlbEFsbCgpIHtcbiAgICAgICAgdGhpcy51cGRhdGVFdmVudC5jYW5jZWxBbGwoKTtcbiAgICB9XG4gICAgYXBwbHlTZXRDaGFuZ2UoY2hhbmdlKSB7XG4gICAgICAgIGlmIChjaGFuZ2UuZXhpc3RzICYmICF0aGlzLmhhcyhjaGFuZ2Uua2V5KSkge1xuICAgICAgICAgICAgdGhpcy5kYXRhLmFkZChjaGFuZ2Uua2V5KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICghY2hhbmdlLmV4aXN0cyAmJiB0aGlzLmhhcyhjaGFuZ2Uua2V5KSkge1xuICAgICAgICAgICAgdGhpcy5kYXRhLmRlbGV0ZShjaGFuZ2Uua2V5KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjbGVhcigpIHtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgdGhpcy5kYXRhLmtleXMoKSkge1xuICAgICAgICAgICAgdGhpcy5kZWxldGUoa2V5KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpc1N1YnNldE9mKG90aGVyU2V0KSB7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IG9mIHRoaXMpIHtcbiAgICAgICAgICAgIGlmICghb3RoZXJTZXQuaGFzKGtleSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlzU3VwZXJzZXRPZihvdGhlclNldCkge1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBvdGhlclNldCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmhhcyhrZXkpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpc0Rpc2pvaW50V2l0aChvdGhlclNldCkge1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBvdGhlclNldCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaGFzKGtleSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGdldCBzaXplKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLnNpemU7XG4gICAgfVxuICAgIGlzSWRlbnRpY2FsVG8ob3RoZXJTZXQpIHtcbiAgICAgICAgaWYgKHRoaXMuc2l6ZSAhPT0gb3RoZXJTZXQuc2l6ZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3Qga2V5IG9mIG90aGVyU2V0KSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuaGFzKGtleSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHN0YXRpYyB0b1NldERhdGFTb3VyY2UodmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgU2V0RGF0YVNvdXJjZSkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBTZXREYXRhU291cmNlKHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBbU3ltYm9sLml0ZXJhdG9yXSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5rZXlzKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYW4gaXRlcmFibGUgb2YgW3Ysdl0gcGFpcnMgZm9yIGV2ZXJ5IHZhbHVlIGB2YCBpbiB0aGUgc2V0LlxuICAgICAqL1xuICAgIGVudHJpZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZW50cmllcygpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFuIGl0ZXJhYmxlIG9mIHZhbHVlcyBpbiB0aGUgc2V0LlxuICAgICAqL1xuICAgIHZhbHVlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS52YWx1ZXMoKTtcbiAgICB9XG4gICAgZGlmZmVyZW5jZShvdGhlclNldCwgY2FuY2VsbGF0aW9uVG9rZW4pIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gbmV3IFNldERhdGFTb3VyY2UoKTtcbiAgICAgICAgY29uc3Qgb3RoZXJTZXRLZXlzID0gbmV3IFNldChvdGhlclNldC5rZXlzKCkpO1xuICAgICAgICB0aGlzLmxpc3RlbkFuZFJlcGVhdCgoY2hhbmdlKSA9PiB7XG4gICAgICAgICAgICBpZiAoY2hhbmdlLmV4aXN0cyAmJiAhb3RoZXJTZXRLZXlzLmhhcyhjaGFuZ2Uua2V5KSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5hZGQoY2hhbmdlLmtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWNoYW5nZS5leGlzdHMpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQuZGVsZXRlKGNoYW5nZS5rZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBjYW5jZWxsYXRpb25Ub2tlbik7XG4gICAgICAgIG90aGVyU2V0Lmxpc3RlbkFuZFJlcGVhdCgoY2hhbmdlKSA9PiB7XG4gICAgICAgICAgICBpZiAoY2hhbmdlLmV4aXN0cykge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5kZWxldGUoY2hhbmdlLmtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWNoYW5nZS5leGlzdHMgJiYgdGhpcy5oYXMoY2hhbmdlLmtleSkpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQuYWRkKGNoYW5nZS5rZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBjYW5jZWxsYXRpb25Ub2tlbik7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIHVuaW9uKG90aGVyU2V0LCBjYW5jZWxsYXRpb25Ub2tlbikge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBuZXcgU2V0RGF0YVNvdXJjZSgpO1xuICAgICAgICB0aGlzLmxpc3RlbkFuZFJlcGVhdCgoY2hhbmdlKSA9PiB7XG4gICAgICAgICAgICBpZiAoY2hhbmdlLmV4aXN0cykge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5hZGQoY2hhbmdlLmtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICghb3RoZXJTZXQuaGFzKGNoYW5nZS5rZXkpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LmRlbGV0ZShjaGFuZ2Uua2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgY2FuY2VsbGF0aW9uVG9rZW4pO1xuICAgICAgICBvdGhlclNldC5saXN0ZW5BbmRSZXBlYXQoKGNoYW5nZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGNoYW5nZS5leGlzdHMpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQuYWRkKGNoYW5nZS5rZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoIXRoaXMuaGFzKGNoYW5nZS5rZXkpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LmRlbGV0ZShjaGFuZ2Uua2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgY2FuY2VsbGF0aW9uVG9rZW4pO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBpbnRlcnNlY3Rpb24ob3RoZXJTZXQsIGNhbmNlbGxhdGlvblRva2VuKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBTZXREYXRhU291cmNlKCk7XG4gICAgICAgIHRoaXMubGlzdGVuQW5kUmVwZWF0KChjaGFuZ2UpID0+IHtcbiAgICAgICAgICAgIGlmIChjaGFuZ2UuZXhpc3RzICYmIG90aGVyU2V0LmhhcyhjaGFuZ2Uua2V5KSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5hZGQoY2hhbmdlLmtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXN1bHQuZGVsZXRlKGNoYW5nZS5rZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBjYW5jZWxsYXRpb25Ub2tlbik7XG4gICAgICAgIG90aGVyU2V0Lmxpc3RlbkFuZFJlcGVhdCgoY2hhbmdlKSA9PiB7XG4gICAgICAgICAgICBpZiAoY2hhbmdlLmV4aXN0cyAmJiB0aGlzLmhhcyhjaGFuZ2Uua2V5KSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5hZGQoY2hhbmdlLmtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXN1bHQuZGVsZXRlKGNoYW5nZS5rZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBjYW5jZWxsYXRpb25Ub2tlbik7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIHN5bW1ldHJpY0RpZmZlcmVuY2Uob3RoZXJTZXQsIGNhbmNlbGxhdGlvblRva2VuKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBTZXREYXRhU291cmNlKCk7XG4gICAgICAgIHRoaXMubGlzdGVuQW5kUmVwZWF0KChjaGFuZ2UpID0+IHtcbiAgICAgICAgICAgIGlmIChjaGFuZ2UuZXhpc3RzICYmICFvdGhlclNldC5oYXMoY2hhbmdlLmtleSkpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQuYWRkKGNoYW5nZS5rZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoIWNoYW5nZS5leGlzdHMgJiYgb3RoZXJTZXQuaGFzKGNoYW5nZS5rZXkpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LmFkZChjaGFuZ2Uua2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNoYW5nZS5leGlzdHMgJiYgb3RoZXJTZXQuaGFzKGNoYW5nZS5rZXkpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LmRlbGV0ZShjaGFuZ2Uua2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCFjaGFuZ2UuZXhpc3RzICYmICFvdGhlclNldC5oYXMoY2hhbmdlLmtleSkpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQuZGVsZXRlKGNoYW5nZS5rZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBjYW5jZWxsYXRpb25Ub2tlbik7XG4gICAgICAgIG90aGVyU2V0Lmxpc3RlbkFuZFJlcGVhdCgoY2hhbmdlKSA9PiB7XG4gICAgICAgICAgICBpZiAoY2hhbmdlLmV4aXN0cyAmJiAhdGhpcy5oYXMoY2hhbmdlLmtleSkpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQuYWRkKGNoYW5nZS5rZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoIWNoYW5nZS5leGlzdHMgJiYgdGhpcy5oYXMoY2hhbmdlLmtleSkpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQuYWRkKGNoYW5nZS5rZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY2hhbmdlLmV4aXN0cyAmJiB0aGlzLmhhcyhjaGFuZ2Uua2V5KSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5kZWxldGUoY2hhbmdlLmtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICghY2hhbmdlLmV4aXN0cyAmJiAhdGhpcy5oYXMoY2hhbmdlLmtleSkpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQuZGVsZXRlKGNoYW5nZS5rZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBjYW5jZWxsYXRpb25Ub2tlbik7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIHRvU3RyaW5nKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBkYXRhc291cmNlIGZvciBhIHNpbmdsZSBrZXkgb2YgdGhlIG9iamVjdFxuICAgICAqIEBwYXJhbSBrZXlcbiAgICAgKiBAcGFyYW0gY2FuY2VsbGF0aW9uVG9rZW5cbiAgICAgKi9cbiAgICBwaWNrKGtleSwgY2FuY2VsbGF0aW9uVG9rZW4pIHtcbiAgICAgICAgY29uc3Qgc3ViRGF0YVNvdXJjZSA9IG5ldyBEYXRhU291cmNlKHRoaXMuZGF0YS5oYXMoa2V5KSk7XG4gICAgICAgIHRoaXMubGlzdGVuT25LZXkoa2V5LCAodikgPT4ge1xuICAgICAgICAgICAgc3ViRGF0YVNvdXJjZS51cGRhdGUodik7XG4gICAgICAgIH0sIGNhbmNlbGxhdGlvblRva2VuKTtcbiAgICAgICAgcmV0dXJuIHN1YkRhdGFTb3VyY2U7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIExpc3RlbiB0byBjaGFuZ2VzIG9mIHRoZSBvYmplY3RcbiAgICAgKi9cbiAgICBsaXN0ZW4oY2FsbGJhY2ssIGNhbmNlbGxhdGlvblRva2VuKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnVwZGF0ZUV2ZW50LnN1YnNjcmliZShjYWxsYmFjaywgY2FuY2VsbGF0aW9uVG9rZW4pLmNhbmNlbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2FtZSBhcyBsaXN0ZW4gYnV0IHdpbGwgaW1tZWRpYXRlbHkgY2FsbCB0aGUgY2FsbGJhY2sgd2l0aCB0aGUgY3VycmVudCB2YWx1ZSBvZiBlYWNoIGtleVxuICAgICAqL1xuICAgIGxpc3RlbkFuZFJlcGVhdChjYWxsYmFjaywgY2FuY2VsbGF0aW9uVG9rZW4pIHtcbiAgICAgICAgY29uc3QgYyA9IHRoaXMudXBkYXRlRXZlbnQuc3Vic2NyaWJlKGNhbGxiYWNrLCBjYW5jZWxsYXRpb25Ub2tlbikuY2FuY2VsO1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiB0aGlzLmRhdGEua2V5cygpKSB7XG4gICAgICAgICAgICBjYWxsYmFjayh7XG4gICAgICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgICAgIGV4aXN0czogdHJ1ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNhbWUgYXMgbGlzdGVuT25LZXkgYnV0IHdpbGwgaW1tZWRpYXRlbHkgY2FsbCB0aGUgY2FsbGJhY2sgd2l0aCB0aGUgY3VycmVudCB2YWx1ZSBmaXJzdFxuICAgICAqL1xuICAgIGxpc3Rlbk9uS2V5QW5kUmVwZWF0KGtleSwgY2FsbGJhY2ssIGNhbmNlbGxhdGlvblRva2VuKSB7XG4gICAgICAgIGNhbGxiYWNrKHRoaXMuaGFzKGtleSkpO1xuICAgICAgICByZXR1cm4gdGhpcy5saXN0ZW5PbktleShrZXksIGNhbGxiYWNrLCBjYW5jZWxsYXRpb25Ub2tlbik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIExpc3RlbiB0byBjaGFuZ2VzIG9mIGEgc2luZ2xlIGtleSBvZiB0aGUgb2JqZWN0XG4gICAgICovXG4gICAgbGlzdGVuT25LZXkoa2V5LCBjYWxsYmFjaywgY2FuY2VsbGF0aW9uVG9rZW4pIHtcbiAgICAgICAgaWYgKCF0aGlzLnVwZGF0ZUV2ZW50T25LZXkuaGFzKGtleSkpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlRXZlbnRPbktleS5zZXQoa2V5LCBuZXcgZXZlbnRfZW1pdHRlcl9qc18xLkV2ZW50RW1pdHRlcigpKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBldmVudCA9IHRoaXMudXBkYXRlRXZlbnRPbktleS5nZXQoa2V5KTtcbiAgICAgICAgcmV0dXJuIGV2ZW50LnN1YnNjcmliZShjYWxsYmFjaywgY2FuY2VsbGF0aW9uVG9rZW4pLmNhbmNlbDtcbiAgICB9XG4gICAgdG9BcnJheURhdGFTb3VyY2UoY2FuY2VsbGF0aW9uVG9rZW4pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFwKChrZXkpID0+IGtleSwgY2FuY2VsbGF0aW9uVG9rZW4pO1xuICAgIH1cbiAgICBtYXAobWFwcGVyLCBjYW5jZWxsYXRpb25Ub2tlbikge1xuICAgICAgICBjb25zdCBzdGF0ZU1hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gbmV3IEFycmF5RGF0YVNvdXJjZSgpO1xuICAgICAgICB0aGlzLmxpc3RlbkFuZFJlcGVhdCgoY2hhbmdlKSA9PiB7XG4gICAgICAgICAgICBpZiAoIWNoYW5nZS5leGlzdHMgJiYgc3RhdGVNYXAuaGFzKGNoYW5nZS5rZXkpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IHN0YXRlTWFwLmdldChjaGFuZ2Uua2V5KTtcbiAgICAgICAgICAgICAgICByZXN1bHQucmVtb3ZlKGl0ZW0pO1xuICAgICAgICAgICAgICAgIHN0YXRlTWFwLmRlbGV0ZShjaGFuZ2Uua2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCFzdGF0ZU1hcC5oYXMoY2hhbmdlLmtleSkgJiYgY2hhbmdlLmV4aXN0cykge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld0l0ZW0gPSBtYXBwZXIoY2hhbmdlLmtleSk7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2gobmV3SXRlbSk7XG4gICAgICAgICAgICAgICAgc3RhdGVNYXAuc2V0KGNoYW5nZS5rZXksIG5ld0l0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBjYW5jZWxsYXRpb25Ub2tlbik7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYWxsIHRoZSBrZXlzIG9mIHRoZSBvYmplY3QgaW4gdGhlIHNvdXJjZVxuICAgICAqL1xuICAgIGtleXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEua2V5cygpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBjaGVjayBpZiBtYXAgaGFzIGEga2V5XG4gICAgICogQHBhcmFtIGtleVxuICAgICAqL1xuICAgIGhhcyhrZXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5oYXMoa2V5KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogZGVsZXRlIGEga2V5IGZyb20gdGhlIG9iamVjdFxuICAgICAqIEBwYXJhbSBrZXlcbiAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgKi9cbiAgICBkZWxldGUoa2V5KSB7XG4gICAgICAgIGlmICh0aGlzLmhhcyhrZXkpKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGEuZGVsZXRlKGtleSk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUV2ZW50LmZpcmUoeyBrZXksIGV4aXN0czogZmFsc2UgfSk7XG4gICAgICAgICAgICBpZiAodGhpcy51cGRhdGVFdmVudE9uS2V5LmhhcyhrZXkpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVFdmVudE9uS2V5LmdldChrZXkpLmZpcmUoZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIHNldCB0aGUgdmFsdWUgZm9yIGEga2V5IG9mIHRoZSBvYmplY3RcbiAgICAgKiBAcGFyYW0ga2V5XG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICovXG4gICAgYWRkKGtleSkge1xuICAgICAgICBpZiAodGhpcy5kYXRhLmhhcyhrZXkpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kYXRhLmFkZChrZXkpO1xuICAgICAgICB0aGlzLnVwZGF0ZUV2ZW50LmZpcmUoeyBrZXksIGV4aXN0czogdHJ1ZSB9KTtcbiAgICAgICAgaWYgKHRoaXMudXBkYXRlRXZlbnRPbktleS5oYXMoa2V5KSkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVFdmVudE9uS2V5LmdldChrZXkpLmZpcmUodHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogTWVyZ2UgdGhlIGtleSB2YWx1ZSBwYWlycyBvZiBhbiBvYmplY3QgaW50byB0aGlzIG9iamVjdCBub24gcmVjdXJzaXZlbHlcbiAgICAgKiBAcGFyYW0gbmV3RGF0YVxuICAgICAqL1xuICAgIGFzc2lnbihuZXdEYXRhKSB7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IG9mIG5ld0RhdGEua2V5cygpKSB7XG4gICAgICAgICAgICB0aGlzLmFkZChrZXkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBzaGFsbG93IGNvcHkgb2YgdGhlIHNldFxuICAgICAqL1xuICAgIHRvU2V0KCkge1xuICAgICAgICByZXR1cm4gbmV3IFNldCh0aGlzLmRhdGEua2V5cygpKTtcbiAgICB9XG4gICAgdG9BcnJheSgpIHtcbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20odGhpcy5kYXRhLmtleXMoKSk7XG4gICAgfVxufVxuZXhwb3J0cy5TZXREYXRhU291cmNlID0gU2V0RGF0YVNvdXJjZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGFfc291cmNlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5kc1BpcGVBbGwgPSBleHBvcnRzLmRzTG9nID0gZXhwb3J0cy5kc0xvYWRCYWxhbmNlID0gZXhwb3J0cy5kc1RhcCA9IGV4cG9ydHMuZHNUaHJvdWdocHV0TWV0ZXIgPSBleHBvcnRzLmRzSGlzdG9yeSA9IGV4cG9ydHMuZHNQaXBlVXAgPSBleHBvcnRzLmRzUGlwZSA9IGV4cG9ydHMuZHNQaWNrID0gZXhwb3J0cy5kc0J1ZmZlciA9IGV4cG9ydHMuZHNUaHJvdHRsZSA9IGV4cG9ydHMuZHNMb2NrID0gZXhwb3J0cy5kc1Rocm90dGxlRnJhbWUgPSBleHBvcnRzLmRzTWljcm9EZWJvdW5jZSA9IGV4cG9ydHMuZHNEZWJvdW5jZSA9IGV4cG9ydHMuZHNEZWxheSA9IGV4cG9ydHMuZHNTdHJpbmdKb2luID0gZXhwb3J0cy5kc1JlZHVjZSA9IGV4cG9ydHMuZHNBd2FpdExhdGVzdCA9IGV4cG9ydHMuZHNBd2FpdE9yZGVyZWQgPSBleHBvcnRzLmRzQXdhaXQgPSBleHBvcnRzLmRzVW5pcXVlID0gZXhwb3J0cy5kc1NlbWFwaG9yZSA9IGV4cG9ydHMuZHNDdXRPZmZEeW5hbWljID0gZXhwb3J0cy5kc0N1dE9mZiA9IGV4cG9ydHMuZHNTa2lwID0gZXhwb3J0cy5kc1NraXBEeW5hbWljID0gZXhwb3J0cy5kc01heCA9IGV4cG9ydHMuZHNNaW4gPSBleHBvcnRzLmRzT2RkID0gZXhwb3J0cy5kc0V2ZW4gPSBleHBvcnRzLmRzRmlsdGVyQXN5bmMgPSBleHBvcnRzLmRzRmlsdGVyID0gZXhwb3J0cy5kc1VwZGF0ZVRva2VuID0gZXhwb3J0cy5kc0RpZmYgPSBleHBvcnRzLmRzTWFwQXN5bmMgPSBleHBvcnRzLmRzRm9yayA9IGV4cG9ydHMuZHNNYXAgPSB2b2lkIDA7XG5jb25zdCBldmVudF9lbWl0dGVyX2pzXzEgPSByZXF1aXJlKFwiLi4vdXRpbGl0aWVzL2V2ZW50X2VtaXR0ZXIuanNcIik7XG5jb25zdCBkYXRhX3NvdXJjZV9qc18xID0gcmVxdWlyZShcIi4vZGF0YV9zb3VyY2UuanNcIik7XG5jb25zdCBzdHJlYW1fanNfMSA9IHJlcXVpcmUoXCIuL3N0cmVhbS5qc1wiKTtcbmNvbnN0IG9wZXJhdG9yX21vZGVsX2pzXzEgPSByZXF1aXJlKFwiLi9vcGVyYXRvcl9tb2RlbC5qc1wiKTtcbmNvbnN0IGNhbmNlbGxhdGlvbl90b2tlbl9qc18xID0gcmVxdWlyZShcIi4uL3V0aWxpdGllcy9jYW5jZWxsYXRpb25fdG9rZW4uanNcIik7XG4vKipcbiAqIE11dGF0ZXMgYW4gdXBkYXRlXG4gKi9cbmZ1bmN0aW9uIGRzTWFwKG1hcHBlcikge1xuICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6ICdtYXAnLFxuICAgICAgICBvcGVyYXRpb25UeXBlOiBvcGVyYXRvcl9tb2RlbF9qc18xLk9wZXJhdGlvblR5cGUuTUFQLFxuICAgICAgICBvcGVyYXRpb246ICh2KSA9PiBtYXBwZXIodilcbiAgICB9O1xufVxuZXhwb3J0cy5kc01hcCA9IGRzTWFwO1xuLyoqXG4gKiBGb3J3YXJkcyBhbiB1cGRhdGUgdG8gb25lIG9mIHR3byBwb3NzaWJsZSBzb3VyY2VzIGJhc2VkIG9uIGEgY29uZGl0aW9uXG4gKi9cbmZ1bmN0aW9uIGRzRm9yayhjb25kaXRpb24sIHRydXRoeVBhdGgsIGZhbHN5UGF0aCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6ICdmb3JrJyxcbiAgICAgICAgb3BlcmF0aW9uVHlwZTogb3BlcmF0b3JfbW9kZWxfanNfMS5PcGVyYXRpb25UeXBlLk5PT1AsXG4gICAgICAgIG9wZXJhdGlvbjogKHYpID0+IHtcbiAgICAgICAgICAgIGlmIChjb25kaXRpb24odikpIHtcbiAgICAgICAgICAgICAgICB0cnV0aHlQYXRoLnVwZGF0ZSh2KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGZhbHN5UGF0aC51cGRhdGUodik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdjtcbiAgICAgICAgfVxuICAgIH07XG59XG5leHBvcnRzLmRzRm9yayA9IGRzRm9yaztcbi8qKlxuICogU2FtZSBhcyBtYXAgYnV0IHdpdGggYW4gYXN5bmMgbWFwcGVyIGZ1bmN0aW9uXG4gKi9cbmZ1bmN0aW9uIGRzTWFwQXN5bmMobWFwcGVyKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZTogJ21hcEFzeW5jJyxcbiAgICAgICAgb3BlcmF0aW9uVHlwZTogb3BlcmF0b3JfbW9kZWxfanNfMS5PcGVyYXRpb25UeXBlLk1BUF9ERUxBWSxcbiAgICAgICAgb3BlcmF0aW9uOiAodikgPT4gbWFwcGVyKHYpXG4gICAgfTtcbn1cbmV4cG9ydHMuZHNNYXBBc3luYyA9IGRzTWFwQXN5bmM7XG4vKipcbiAqIENoYW5nZXMgdXBkYXRlcyB0byBjb250YWluIHRoZSB2YWx1ZSBvZiB0aGUgcHJldmlvdXMgdXBkYXRlIGFzIHdlbGwgYXMgdGhlIGN1cnJlbnRcbiAqL1xuZnVuY3Rpb24gZHNEaWZmKCkge1xuICAgIGxldCBsYXN0VmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZTogJ2RpZmYnLFxuICAgICAgICBvcGVyYXRpb25UeXBlOiBvcGVyYXRvcl9tb2RlbF9qc18xLk9wZXJhdGlvblR5cGUuTUFQLFxuICAgICAgICBvcGVyYXRpb246ICh2KSA9PiB7XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0ge1xuICAgICAgICAgICAgICAgIG9sZFZhbHVlOiBsYXN0VmFsdWUsXG4gICAgICAgICAgICAgICAgbmV3VmFsdWU6IHZcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBsYXN0VmFsdWUgPSB2O1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuICAgIH07XG59XG5leHBvcnRzLmRzRGlmZiA9IGRzRGlmZjtcbi8qKlxuICogQ2hhbmdlcyB1cGRhdGVzIHRvIGNvbnRhaW4gdGhlIHZhbHVlIG9mIHRoZSBwcmV2aW91cyB1cGRhdGUgYXMgd2VsbCBhcyB0aGUgY3VycmVudFxuICovXG5mdW5jdGlvbiBkc1VwZGF0ZVRva2VuKCkge1xuICAgIGxldCB0b2tlbjtcbiAgICByZXR1cm4ge1xuICAgICAgICBuYW1lOiAnZGlmZicsXG4gICAgICAgIG9wZXJhdGlvblR5cGU6IG9wZXJhdG9yX21vZGVsX2pzXzEuT3BlcmF0aW9uVHlwZS5NQVAsXG4gICAgICAgIG9wZXJhdGlvbjogKHYpID0+IHtcbiAgICAgICAgICAgIGlmICh0b2tlbikge1xuICAgICAgICAgICAgICAgIHRva2VuLmNhbmNlbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdG9rZW4gPSBuZXcgY2FuY2VsbGF0aW9uX3Rva2VuX2pzXzEuQ2FuY2VsbGF0aW9uVG9rZW4oKTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdG9rZW4sXG4gICAgICAgICAgICAgICAgdmFsdWU6IHZcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9O1xufVxuZXhwb3J0cy5kc1VwZGF0ZVRva2VuID0gZHNVcGRhdGVUb2tlbjtcbi8qKlxuICogQmxvY2tzIHVwZGF0ZXMgdGhhdCBkb24ndCBwYXNzIHRoZSBmaWx0ZXIgcHJlZGljYXRlXG4gKi9cbmZ1bmN0aW9uIGRzRmlsdGVyKHByZWRpY2F0ZSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6ICdmaWx0ZXInLFxuICAgICAgICBvcGVyYXRpb25UeXBlOiBvcGVyYXRvcl9tb2RlbF9qc18xLk9wZXJhdGlvblR5cGUuRklMVEVSLFxuICAgICAgICBvcGVyYXRpb246ICh2KSA9PiBwcmVkaWNhdGUodilcbiAgICB9O1xufVxuZXhwb3J0cy5kc0ZpbHRlciA9IGRzRmlsdGVyO1xuLyoqXG4gKiBTYW1lIGFzIGZpbHRlciBidXQgd2l0aCBhbiBhc3luYyBwcmVkaWNhdGUgZnVuY3Rpb25cbiAqL1xuZnVuY3Rpb24gZHNGaWx0ZXJBc3luYyhwcmVkaWNhdGUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBuYW1lOiAnZmlsdGVyQXN5bmMnLFxuICAgICAgICBvcGVyYXRpb25UeXBlOiBvcGVyYXRvcl9tb2RlbF9qc18xLk9wZXJhdGlvblR5cGUuREVMQVlfRklMVEVSLFxuICAgICAgICBvcGVyYXRpb246ICh2KSA9PiBwcmVkaWNhdGUodilcbiAgICB9O1xufVxuZXhwb3J0cy5kc0ZpbHRlckFzeW5jID0gZHNGaWx0ZXJBc3luYztcbi8qKlxuICogT25seSBwcm9wYWdhdGUgYW4gdXBkYXRlIGlmIHRoZSB2YWx1ZSBpcyBldmVuXG4gKi9cbmZ1bmN0aW9uIGRzRXZlbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBuYW1lOiAnZXZlbicsXG4gICAgICAgIG9wZXJhdGlvblR5cGU6IG9wZXJhdG9yX21vZGVsX2pzXzEuT3BlcmF0aW9uVHlwZS5GSUxURVIsXG4gICAgICAgIG9wZXJhdGlvbjogKHYpID0+IHYgJSAyID09PSAwXG4gICAgfTtcbn1cbmV4cG9ydHMuZHNFdmVuID0gZHNFdmVuO1xuLyoqXG4gKiBPbmx5IHByb3BhZ2F0ZSBhbiB1cGRhdGUgaWYgdGhlIHZhbHVlIGlzIG9kZFxuICovXG5mdW5jdGlvbiBkc09kZCgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBuYW1lOiAnb2RkJyxcbiAgICAgICAgb3BlcmF0aW9uVHlwZTogb3BlcmF0b3JfbW9kZWxfanNfMS5PcGVyYXRpb25UeXBlLkZJTFRFUixcbiAgICAgICAgb3BlcmF0aW9uOiAodikgPT4gdiAlIDIgIT09IDBcbiAgICB9O1xufVxuZXhwb3J0cy5kc09kZCA9IGRzT2RkO1xuLyoqXG4gKiBPbmx5IHByb3BhZ2F0ZSBhbiB1cGRhdGUgaWYgdGhlIHZhbHVlIGlzIGxvd2VyIHRoYW4gdGhlIHByZXZpb3VzIHVwZGF0ZVxuICovXG5mdW5jdGlvbiBkc01pbigpIHtcbiAgICBsZXQgbGFzdCA9IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSO1xuICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6ICdtaW4nLFxuICAgICAgICBvcGVyYXRpb25UeXBlOiBvcGVyYXRvcl9tb2RlbF9qc18xLk9wZXJhdGlvblR5cGUuRklMVEVSLFxuICAgICAgICBvcGVyYXRpb246ICh2KSA9PiB7XG4gICAgICAgICAgICBpZiAodiA8IGxhc3QpIHtcbiAgICAgICAgICAgICAgICBsYXN0ID0gdjtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG59XG5leHBvcnRzLmRzTWluID0gZHNNaW47XG4vKipcbiAqIE9ubHkgcHJvcGFnYXRlIGFuIHVwZGF0ZSBpZiB0aGUgdmFsdWUgaXMgaGlnaGVyIHRoYW4gdGhlIHByZXZpb3VzIHVwZGF0ZVxuICovXG5mdW5jdGlvbiBkc01heCgpIHtcbiAgICBsZXQgbGFzdCA9IE51bWJlci5NSU5fU0FGRV9JTlRFR0VSO1xuICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6ICdtYXgnLFxuICAgICAgICBvcGVyYXRpb25UeXBlOiBvcGVyYXRvcl9tb2RlbF9qc18xLk9wZXJhdGlvblR5cGUuRklMVEVSLFxuICAgICAgICBvcGVyYXRpb246ICh2KSA9PiB7XG4gICAgICAgICAgICBpZiAodiA+IGxhc3QpIHtcbiAgICAgICAgICAgICAgICBsYXN0ID0gdjtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG59XG5leHBvcnRzLmRzTWF4ID0gZHNNYXg7XG4vKipcbiAqIElnbm9yZSB0aGUgZmlyc3QgTiB1cGRhdGVzIHdoZXJlIE4gZGVwZW5kcyBvbiBhbiBleHRlcm5hbCBzb3VyY2VcbiAqL1xuZnVuY3Rpb24gZHNTa2lwRHluYW1pYyhhbW91bnRMZWZ0KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgb3BlcmF0aW9uVHlwZTogb3BlcmF0b3JfbW9kZWxfanNfMS5PcGVyYXRpb25UeXBlLkZJTFRFUixcbiAgICAgICAgbmFtZTogJ3NraXBEeW5hbWljJyxcbiAgICAgICAgb3BlcmF0aW9uOiAodikgPT4ge1xuICAgICAgICAgICAgaWYgKGFtb3VudExlZnQudmFsdWUgPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGFtb3VudExlZnQudXBkYXRlKGFtb3VudExlZnQudmFsdWUgLSAxKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xufVxuZXhwb3J0cy5kc1NraXBEeW5hbWljID0gZHNTa2lwRHluYW1pYztcbi8qKlxuICogSWdub3JlIHRoZSBmaXJzdCBOIHVwZGF0ZXNcbiAqL1xuZnVuY3Rpb24gZHNTa2lwKGFtb3VudCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIG9wZXJhdGlvblR5cGU6IG9wZXJhdG9yX21vZGVsX2pzXzEuT3BlcmF0aW9uVHlwZS5GSUxURVIsXG4gICAgICAgIG5hbWU6IGBza2lwICR7YW1vdW50fWAsXG4gICAgICAgIG9wZXJhdGlvbjogKHYpID0+IHtcbiAgICAgICAgICAgIGlmIChhbW91bnQgPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGFtb3VudC0tO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG59XG5leHBvcnRzLmRzU2tpcCA9IGRzU2tpcDtcbi8qKlxuICogQWxsb3dzIG9ubHkgYSBjZXJ0YWluIG51bWJlciBvZiB1cGRhdGVzIHRvIHBhc3MgZGVjcmVhc2luZyBhIGNvdW50ZXIgb24gZWFjaCBwYXNzXG4gKiBJZiB0aGUgY291bnRlciByZWFjaGVzIDAgdGhlIHVwZGF0ZXMgYXJlIGxvc3RcbiAqL1xuZnVuY3Rpb24gZHNDdXRPZmYoYW1vdW50KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZTogYGN1dG9mZiAke2Ftb3VudH1gLFxuICAgICAgICBvcGVyYXRpb25UeXBlOiBvcGVyYXRvcl9tb2RlbF9qc18xLk9wZXJhdGlvblR5cGUuRklMVEVSLFxuICAgICAgICBvcGVyYXRpb246ICh2KSA9PiB7XG4gICAgICAgICAgICBpZiAoYW1vdW50ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgYW1vdW50LS07XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xufVxuZXhwb3J0cy5kc0N1dE9mZiA9IGRzQ3V0T2ZmO1xuLyoqXG4gKiBBbGxvd3Mgb25seSBhIGNlcnRhaW4gbnVtYmVyIG9mIHVwZGF0ZXMgdG8gcGFzcyBkZWNyZWFzaW5nIGEgY291bnRlciBvbiBlYWNoIHBhc3MsIHRoZSBjb3VudGVyIGJlaW5nIGFuIGV4dGVybmFsXG4gKiBkYXRhc291cmNlIGNhbiBiZSBjaGFuZ2VkIGV4dGVybmFsbHkuXG4gKiBJZiB0aGUgY291bnRlciByZWFjaGVzIDAgdGhlIHVwZGF0ZXMgYXJlIGxvc3RcbiAqL1xuZnVuY3Rpb24gZHNDdXRPZmZEeW5hbWljKGFtb3VudExlZnQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBuYW1lOiAnY3V0b2ZmRHluYW1pYycsXG4gICAgICAgIG9wZXJhdGlvblR5cGU6IG9wZXJhdG9yX21vZGVsX2pzXzEuT3BlcmF0aW9uVHlwZS5GSUxURVIsXG4gICAgICAgIG9wZXJhdGlvbjogKHYpID0+IHtcbiAgICAgICAgICAgIGlmIChhbW91bnRMZWZ0LnZhbHVlID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgYW1vdW50TGVmdC51cGRhdGUoYW1vdW50TGVmdC52YWx1ZSAtIDEpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbn1cbmV4cG9ydHMuZHNDdXRPZmZEeW5hbWljID0gZHNDdXRPZmZEeW5hbWljO1xuLyoqXG4gKiBBbGxvd3Mgb25seSBhIGNlcnRhaW4gbnVtYmVyIG9mIHVwZGF0ZXMgdG8gcGFzcyBkZWNyZWFzaW5nIGEgY291bnRlciBvbiBlYWNoIHBhc3MsIHRoZSBjb3VudGVyIGJlaW5nIGFuIGV4dGVybmFsXG4gKiBkYXRhc291cmNlIGNhbiBiZSBjaGFuZ2VkIGV4dGVybmFsbHkuXG4gKiBJZiB0aGUgY291bnRlciByZWFjaGVzIDAgdGhlIHVwZGF0ZXMgYXJlIGJ1ZmZlcmVkIHVudGlsIHRoZXkgYXJlIHVubG9ja2VkIGFnYWluXG4gKi9cbmZ1bmN0aW9uIGRzU2VtYXBob3JlKHN0YXRlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgb3BlcmF0aW9uVHlwZTogb3BlcmF0b3JfbW9kZWxfanNfMS5PcGVyYXRpb25UeXBlLkRFTEFZLFxuICAgICAgICBuYW1lOiAnc2VtYXBob3JlJyxcbiAgICAgICAgb3BlcmF0aW9uOiAodikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHN0YXRlLnZhbHVlID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZS51cGRhdGUoc3RhdGUudmFsdWUgLSAxKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh2KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNhbmNlbCA9IHN0YXRlLmxpc3RlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RhdGUudmFsdWUgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FuY2VsKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUudXBkYXRlKHN0YXRlLnZhbHVlIC0gMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh2KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xufVxuZXhwb3J0cy5kc1NlbWFwaG9yZSA9IGRzU2VtYXBob3JlO1xuLyoqXG4gKiBGaWx0ZXJzIG91dCB1cGRhdGVzIGlmIHRoZXkgaGF2ZSB0aGUgc2FtZSB2YWx1ZSBhcyB0aGUgcHJldmlvdXMgdXBkYXRlLCB1c2VzIHJlZmVyZW5jZSBlcXVhbGl0eSBieSBkZWZhdWx0XG4gKi9cbmZ1bmN0aW9uIGRzVW5pcXVlKGlzRXF1YWwpIHtcbiAgICBsZXQgcHJpbWVkID0gZmFsc2U7XG4gICAgbGV0IGxhc3Q7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZTogJ3VuaXF1ZScsXG4gICAgICAgIG9wZXJhdGlvblR5cGU6IG9wZXJhdG9yX21vZGVsX2pzXzEuT3BlcmF0aW9uVHlwZS5GSUxURVIsXG4gICAgICAgIG9wZXJhdGlvbjogKHYpID0+IHtcbiAgICAgICAgICAgIGlmIChwcmltZWQgJiYgKGlzRXF1YWwgPyBpc0VxdWFsKGxhc3QsIHYpIDogdiA9PT0gbGFzdCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBwcmltZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGxhc3QgPSB2O1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbn1cbmV4cG9ydHMuZHNVbmlxdWUgPSBkc1VuaXF1ZTtcbi8qKlxuICogVGFrZXMgcHJvbWlzZXMgYW5kIHVwZGF0ZXMgd2l0aCB0aGUgcmVzb2x2ZWQgdmFsdWUsIGlmIG11bHRpcGxlIHByb21pc2VzIGNvbWUgaW4gcHJvY2Vzc2VzIHVwZGF0ZXMgYXMgcHJvbWlzZXMgcmVzb2x2ZSBpbiBhbnkgb3JkZXJcbiAqL1xuZnVuY3Rpb24gZHNBd2FpdCgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBuYW1lOiAnYXdhaXQnLFxuICAgICAgICBvcGVyYXRpb25UeXBlOiBvcGVyYXRvcl9tb2RlbF9qc18xLk9wZXJhdGlvblR5cGUuTUFQX0RFTEFZLFxuICAgICAgICBvcGVyYXRpb246ICh2KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdjtcbiAgICAgICAgfVxuICAgIH07XG59XG5leHBvcnRzLmRzQXdhaXQgPSBkc0F3YWl0O1xuLyoqXG4gKiBUYWtlcyBwcm9taXNlcyBhbmQgdXBkYXRlcyB3aXRoIHRoZSByZXNvbHZlZCB2YWx1ZSwgaWYgbXVsdGlwbGUgcHJvbWlzZXMgY29tZSBpbiBtYWtlcyBzdXJlIHRoZSB1cGRhdGVzIGZpcmUgaW4gdGhlIHNhbWUgb3JkZXIgdGhhdCB0aGUgcHJvbWlzZXMgY2FtZSBpblxuICovXG5mdW5jdGlvbiBkc0F3YWl0T3JkZXJlZCgpIHtcbiAgICBjb25zdCBxdWV1ZSA9IFtdO1xuICAgIGNvbnN0IG9uRGVxdWV1ZSA9IG5ldyBldmVudF9lbWl0dGVyX2pzXzEuRXZlbnRFbWl0dGVyKCk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgb3BlcmF0aW9uVHlwZTogb3BlcmF0b3JfbW9kZWxfanNfMS5PcGVyYXRpb25UeXBlLk1BUF9ERUxBWSxcbiAgICAgICAgbmFtZTogJ2F3YWl0T3JkZXJlZCcsXG4gICAgICAgIG9wZXJhdGlvbjogYXN5bmMgKHYpID0+IHtcbiAgICAgICAgICAgIHF1ZXVlLnB1c2godik7XG4gICAgICAgICAgICBpZiAocXVldWUubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb2Nlc3NJdGVtKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCB1bnN1YiA9IG9uRGVxdWV1ZS5zdWJzY3JpYmUoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocXVldWVbMF0gPT09IHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVuc3ViLmNhbmNlbCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb2Nlc3NJdGVtKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgYXN5bmMgZnVuY3Rpb24gcHJvY2Vzc0l0ZW0oKSB7XG4gICAgICAgIGF3YWl0IHF1ZXVlWzBdO1xuICAgICAgICBjb25zdCBpdGVtID0gcXVldWUuc2hpZnQoKTtcbiAgICAgICAgb25EZXF1ZXVlLmZpcmUoKTtcbiAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgfVxufVxuZXhwb3J0cy5kc0F3YWl0T3JkZXJlZCA9IGRzQXdhaXRPcmRlcmVkO1xuLyoqXG4gKiBhd2FpdHMgcHJvbWlzZSBhbmQgZm9yd2FyZHMgdGhlIHJlc29sdmVkIHZhbHVlLCBpZiBhIG5ldyBwcm9taXNlIGNvbWVzIGluIHdoaWxlIHRoZSBmaXJzdCBpc24ndCByZXNvbHZlZCB0aGVuIHRoZSBmaXJzdFxuICogcHJvbWlzZSB3aWxsIGJlIGlnbm9yZWQgZXZlbiBpZiBpdCByZXNvbHZlcyBmaXJzdCBhbmQgaW5zdGVhZCB3ZSBmb2N1cyBvbiB0aGUgbmV3ZXN0IHByb21pc2UuIFRoaXMgaXMgdXNlZnVsIGZvciBjYW5jZWxsYWJsZVxuICogYXN5bmMgb3BlcmF0aW9ucyB3aGVyZSB3ZSBvbmx5IGNhcmUgYWJvdXQgdGhlIHJlc3VsdCBpZiBpdCdzIHRoZSBsYXRlc3QgYWN0aW9uXG4gKi9cbmZ1bmN0aW9uIGRzQXdhaXRMYXRlc3QoKSB7XG4gICAgbGV0IGZyZXNobmVzc1Rva2VuO1xuICAgIHJldHVybiB7XG4gICAgICAgIG9wZXJhdGlvblR5cGU6IG9wZXJhdG9yX21vZGVsX2pzXzEuT3BlcmF0aW9uVHlwZS5NQVBfREVMQVlfRklMVEVSLFxuICAgICAgICBuYW1lOiAnYXdhaXRMYXRlc3QnLFxuICAgICAgICBvcGVyYXRpb246IGFzeW5jICh2KSA9PiB7XG4gICAgICAgICAgICBmcmVzaG5lc3NUb2tlbiA9IERhdGUubm93KCk7XG4gICAgICAgICAgICBjb25zdCB0aW1lc3RhbXAgPSBmcmVzaG5lc3NUb2tlbjtcbiAgICAgICAgICAgIGNvbnN0IHJlc29sdmVkID0gYXdhaXQgdjtcbiAgICAgICAgICAgIGlmIChmcmVzaG5lc3NUb2tlbiA9PT0gdGltZXN0YW1wKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbTogcmVzb2x2ZWQsXG4gICAgICAgICAgICAgICAgICAgIGNhbmNlbGxlZDogZmFsc2VcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgICAgICBjYW5jZWxsZWQ6IHRydWVcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbn1cbmV4cG9ydHMuZHNBd2FpdExhdGVzdCA9IGRzQXdhaXRMYXRlc3Q7XG4vKipcbiAqIFJlZHVjZXMgYWxsIHVwZGF0ZXMgZG93biB0byBhIHZhbHVlXG4gKi9cbmZ1bmN0aW9uIGRzUmVkdWNlKHJlZHVjZXIsIGluaXRpYWxWYWx1ZSkge1xuICAgIGxldCBsYXN0ID0gaW5pdGlhbFZhbHVlO1xuICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6ICdyZWR1Y2UnLFxuICAgICAgICBvcGVyYXRpb25UeXBlOiBvcGVyYXRvcl9tb2RlbF9qc18xLk9wZXJhdGlvblR5cGUuTUFQLFxuICAgICAgICBvcGVyYXRpb246ICh2KSA9PiB7XG4gICAgICAgICAgICBsYXN0ID0gcmVkdWNlcihsYXN0LCB2KTtcbiAgICAgICAgICAgIHJldHVybiBsYXN0O1xuICAgICAgICB9XG4gICAgfTtcbn1cbmV4cG9ydHMuZHNSZWR1Y2UgPSBkc1JlZHVjZTtcbi8qKlxuICogQnVpbGRzIGEgc3RyaW5nIHdoZXJlIGVhY2ggdXBkYXRlIGlzIGFwcGVuZWQgdG8gdGhlIHN0cmluZyBvcHRpb25hbGx5IHdpdGggYSBzZXBlcmF0b3JcbiAqL1xuZnVuY3Rpb24gZHNTdHJpbmdKb2luKHNlcGVyYXRvciA9ICcsICcpIHtcbiAgICBsZXQgbGFzdDtcbiAgICByZXR1cm4ge1xuICAgICAgICBuYW1lOiBgc3RyaW5nSm9pbiAke3NlcGVyYXRvcn1gLFxuICAgICAgICBvcGVyYXRpb25UeXBlOiBvcGVyYXRvcl9tb2RlbF9qc18xLk9wZXJhdGlvblR5cGUuTUFQLFxuICAgICAgICBvcGVyYXRpb246ICh2KSA9PiB7XG4gICAgICAgICAgICBpZiAobGFzdCkge1xuICAgICAgICAgICAgICAgIGxhc3QgKz0gc2VwZXJhdG9yICsgdjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGxhc3QgPSB2O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGxhc3Q7XG4gICAgICAgIH1cbiAgICB9O1xufVxuZXhwb3J0cy5kc1N0cmluZ0pvaW4gPSBkc1N0cmluZ0pvaW47XG4vKipcbiAqIEFkZHMgYSBmaXhlZCBhbW91bnQgb2YgbGFnIHRvIHVwZGF0ZXNcbiAqL1xuZnVuY3Rpb24gZHNEZWxheSh0aW1lKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZTogYGRlbGF5ICR7dGltZX1tc2AsXG4gICAgICAgIG9wZXJhdGlvblR5cGU6IG9wZXJhdG9yX21vZGVsX2pzXzEuT3BlcmF0aW9uVHlwZS5ERUxBWSxcbiAgICAgICAgb3BlcmF0aW9uOiAodikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUodik7XG4gICAgICAgICAgICAgICAgfSwgdGltZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG59XG5leHBvcnRzLmRzRGVsYXkgPSBkc0RlbGF5O1xuLyoqXG4gKiBTdGFydHMgYSB0aW1lciB3aGVuIGFuIHVwZGF0ZSBvY2N1cnMsIGRlbGF5cyB0aGUgdXBkYXRlIHVudGlsIHRoZSB0aW1lciBwYXNzZWQgaWYgYSBuZXcgdXBkYXRlIGFycml2ZXMgdGhlIGluaXRpYWxcbiAqIHVwZGF0ZSBpcyBjYW5jZWxsZWQgYW5kIHRoZSBwcm9jZXNzIHN0YXJ0cyBhZ2FpblxuICovXG5mdW5jdGlvbiBkc0RlYm91bmNlKHRpbWUpIHtcbiAgICBsZXQgdGltZW91dDtcbiAgICBsZXQgY2FuY2VsbGVkID0gbmV3IGV2ZW50X2VtaXR0ZXJfanNfMS5FdmVudEVtaXR0ZXIoKTtcbiAgICByZXR1cm4ge1xuICAgICAgICBvcGVyYXRpb25UeXBlOiBvcGVyYXRvcl9tb2RlbF9qc18xLk9wZXJhdGlvblR5cGUuREVMQVlfRklMVEVSLFxuICAgICAgICBuYW1lOiBgZGVib3VuY2UgJHt0aW1lfW1zYCxcbiAgICAgICAgb3BlcmF0aW9uOiAodikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgICAgICAgICAgIGNhbmNlbGxlZC5maXJlKCk7XG4gICAgICAgICAgICAgICAgY2FuY2VsbGVkLnN1YnNjcmliZU9uY2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGNhbmNlbGxlZC5jYW5jZWxBbGwoKTtcbiAgICAgICAgICAgICAgICB9LCB0aW1lKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbn1cbmV4cG9ydHMuZHNEZWJvdW5jZSA9IGRzRGVib3VuY2U7XG4vKipcbiAqIE9ubHkgYWxsb3cgdXAgdG8gMSB1cGRhdGUgdG8gcHJvcGFnYXRlIHBlciBmcmFtZSBtYWtlcyB1cGRhdGUgcnVuIGFzIGEgbWljcm90YXNrXG4gKi9cbmZ1bmN0aW9uIGRzTWljcm9EZWJvdW5jZSgpIHtcbiAgICBsZXQgc2NoZWR1bGVkO1xuICAgIHJldHVybiB7XG4gICAgICAgIG9wZXJhdGlvblR5cGU6IG9wZXJhdG9yX21vZGVsX2pzXzEuT3BlcmF0aW9uVHlwZS5ERUxBWV9GSUxURVIsXG4gICAgICAgIG5hbWU6IGBtaWNyb0RlYm91bmNlYCxcbiAgICAgICAgb3BlcmF0aW9uOiAodikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFzY2hlZHVsZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgc2NoZWR1bGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgcXVldWVNaWNyb3Rhc2soKCkgPT4gcmVzb2x2ZSh0cnVlKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG59XG5leHBvcnRzLmRzTWljcm9EZWJvdW5jZSA9IGRzTWljcm9EZWJvdW5jZTtcbi8qKlxuICogRGVib3VuY2UgdXBkYXRlIHRvIG9jY3VyIGF0IG1vc3Qgb25lIHBlciBhbmltYXRpb24gZnJhbWVcbiAqL1xuZnVuY3Rpb24gZHNUaHJvdHRsZUZyYW1lKCkge1xuICAgIGxldCB0aW1lb3V0O1xuICAgIGxldCBjYW5jZWxsZWQgPSBuZXcgZXZlbnRfZW1pdHRlcl9qc18xLkV2ZW50RW1pdHRlcigpO1xuICAgIHJldHVybiB7XG4gICAgICAgIG9wZXJhdGlvblR5cGU6IG9wZXJhdG9yX21vZGVsX2pzXzEuT3BlcmF0aW9uVHlwZS5ERUxBWV9GSUxURVIsXG4gICAgICAgIG5hbWU6IGB0aHJvdHRsZSBmcmFtZWAsXG4gICAgICAgIG9wZXJhdGlvbjogKHYpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgICAgICAgICBjYW5jZWxsZWQuZmlyZSgpO1xuICAgICAgICAgICAgICAgIGNhbmNlbGxlZC5zdWJzY3JpYmVPbmNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShmYWxzZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGltZW91dCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGNhbmNlbGxlZC5jYW5jZWxBbGwoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbn1cbmV4cG9ydHMuZHNUaHJvdHRsZUZyYW1lID0gZHNUaHJvdHRsZUZyYW1lO1xuLyoqXG4gKiBNYXkgb3IgbWF5IG5vdCBibG9jayBhbGwgdXBkYXRlcyBiYXNlZCBvbiB0aGUgc3RhdGUgcHJvdmlkZWQgYnkgYW5vdGhlciBzb3VyY2VcbiAqIFdoZW4gdW5ibG9ja2VkIHRoZSBsYXN0IHZhbHVlIHRoYXQgd2FzIGJsb2NrZWQgaXMgcGFzc2VkIHRocm91Z2hcbiAqIGxvY2sgc3RhdGVcbiAqIHRydWUgPT4gdXBkYXRlcyBwYXNzIHRocm91Z2hcbiAqIGZhbHNlID0+IGxhdGVzdCB1cGRhdGUgc3RhdGUgaXMgYnVmZmVyZWQgYW5kIHBhc3NlcyBvbmNlIHVubG9ja2VkXG4gKi9cbmZ1bmN0aW9uIGRzTG9jayhzdGF0ZSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6ICdsb2NrJyxcbiAgICAgICAgb3BlcmF0aW9uVHlwZTogb3BlcmF0b3JfbW9kZWxfanNfMS5PcGVyYXRpb25UeXBlLkRFTEFZLFxuICAgICAgICBvcGVyYXRpb246ICh2KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoc3RhdGUudmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh2KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNhbmNlbCA9IHN0YXRlLmxpc3RlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RhdGUudmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYW5jZWwoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHYpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG59XG5leHBvcnRzLmRzTG9jayA9IGRzTG9jaztcbi8qKlxuICogQWxsb3dzIGF0IG1vc3Qgb25lIHVwZGF0ZSBwZXIgTiBtaWxsaXNlY29uZHMgdG8gcGFzcyB0aHJvdWdoXG4gKi9cbmZ1bmN0aW9uIGRzVGhyb3R0bGUodGltZSkge1xuICAgIGxldCBjb29sZG93biA9IGZhbHNlO1xuICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6IGB0aHJvdHRsZSAke3RpbWV9bXNgLFxuICAgICAgICBvcGVyYXRpb25UeXBlOiBvcGVyYXRvcl9tb2RlbF9qc18xLk9wZXJhdGlvblR5cGUuRklMVEVSLFxuICAgICAgICBvcGVyYXRpb246ICh2KSA9PiB7XG4gICAgICAgICAgICBpZiAoIWNvb2xkb3duKSB7XG4gICAgICAgICAgICAgICAgY29vbGRvd24gPSB0cnVlO1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb29sZG93biA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0sIHRpbWUpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbn1cbmV4cG9ydHMuZHNUaHJvdHRsZSA9IGRzVGhyb3R0bGU7XG4vKipcbiAqIFdoZW4gYW4gdXBkYXRlIG9jY3VycyBhIHRpbWVyIGlzIHN0YXJ0ZWQsIGR1cmluZyB0aGF0IHRpbWUgYWxsIHN1YnNlcXVlbnQgdXBkYXRlcyBhcmUgY29sbGVjdGVkIGluIGFuIGFycmF5IGFuZCB0aGVuXG4gKiBvbmNlIHRoZSB0aW1lciBydW5zIG91dCBhbiB1cGRhdGUgaXMgbWFkZSB3aXRoIGFsbCB1cGRhdGVzIGNvbGxlY3RlZCBzbyBmYXIgYXMgYW4gYXJyYXlcbiAqL1xuZnVuY3Rpb24gZHNCdWZmZXIodGltZSkge1xuICAgIGxldCBidWZmZXIgPSBbXTtcbiAgICBsZXQgcHJvbWlzZTtcbiAgICByZXR1cm4ge1xuICAgICAgICBuYW1lOiBgYnVmZmVyICR7dGltZX1tc2AsXG4gICAgICAgIG9wZXJhdGlvblR5cGU6IG9wZXJhdG9yX21vZGVsX2pzXzEuT3BlcmF0aW9uVHlwZS5NQVBfREVMQVlfRklMVEVSLFxuICAgICAgICBvcGVyYXRpb246ICh2KSA9PiB7XG4gICAgICAgICAgICBidWZmZXIucHVzaCh2KTtcbiAgICAgICAgICAgIGlmICghcHJvbWlzZSkge1xuICAgICAgICAgICAgICAgIHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb21pc2UgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYW5jZWxsZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW06IGJ1ZmZlclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBidWZmZXIgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgfSwgdGltZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHtcbiAgICAgICAgICAgICAgICAgICAgY2FuY2VsbGVkOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBpdGVtOiB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG59XG5leHBvcnRzLmRzQnVmZmVyID0gZHNCdWZmZXI7XG4vKipcbiAqIEV4dHJhY3RzIG9ubHkgdGhlIHZhbHVlIG9mIGEga2V5IG9mIHRoZSB1cGRhdGUgdmFsdWVcbiAqL1xuZnVuY3Rpb24gZHNQaWNrKGtleSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6IGBwaWNrICR7a2V5LnRvU3RyaW5nKCl9YCxcbiAgICAgICAgb3BlcmF0aW9uVHlwZTogb3BlcmF0b3JfbW9kZWxfanNfMS5PcGVyYXRpb25UeXBlLk1BUCxcbiAgICAgICAgb3BlcmF0aW9uOiAodikgPT4ge1xuICAgICAgICAgICAgaWYgKHYgIT09IHVuZGVmaW5lZCAmJiB2ICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB2O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbn1cbmV4cG9ydHMuZHNQaWNrID0gZHNQaWNrO1xuLyoqXG4gKiBGb3J3YXJkcyBhbiBldmVudCB0byBhbm90aGVyIHNvdXJjZVxuICovXG5mdW5jdGlvbiBkc1BpcGUodGFyZ2V0KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZTogYHBpcGUgJHt0YXJnZXQubmFtZX1gLFxuICAgICAgICBvcGVyYXRpb25UeXBlOiBvcGVyYXRvcl9tb2RlbF9qc18xLk9wZXJhdGlvblR5cGUuTk9PUCxcbiAgICAgICAgb3BlcmF0aW9uOiAodikgPT4ge1xuICAgICAgICAgICAgaWYgKHRhcmdldCBpbnN0YW5jZW9mIGRhdGFfc291cmNlX2pzXzEuRGF0YVNvdXJjZSB8fCB0YXJnZXQgaW5zdGFuY2VvZiBzdHJlYW1fanNfMS5TdHJlYW0pIHtcbiAgICAgICAgICAgICAgICB0YXJnZXQudXBkYXRlKHYpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LnVwZGF0ZURvd25zdHJlYW0odik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdjtcbiAgICAgICAgfVxuICAgIH07XG59XG5leHBvcnRzLmRzUGlwZSA9IGRzUGlwZTtcbi8qKlxuICogU2FtZSBhcyBwaXBlIGV4Y2VwdCBmb3IgZHVwbGV4IGRhdGEgc291cmNlcyBpdCBwaXBlcyB1cHN0cmVhbVxuICovXG5mdW5jdGlvbiBkc1BpcGVVcCh0YXJnZXQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBuYW1lOiBgcGlwZXVwICR7dGFyZ2V0Lm5hbWV9YCxcbiAgICAgICAgb3BlcmF0aW9uVHlwZTogb3BlcmF0b3JfbW9kZWxfanNfMS5PcGVyYXRpb25UeXBlLk5PT1AsXG4gICAgICAgIG9wZXJhdGlvbjogKHYpID0+IHtcbiAgICAgICAgICAgIGlmICh0YXJnZXQgaW5zdGFuY2VvZiBkYXRhX3NvdXJjZV9qc18xLkRhdGFTb3VyY2UgfHwgdGFyZ2V0IGluc3RhbmNlb2Ygc3RyZWFtX2pzXzEuU3RyZWFtKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LnVwZGF0ZSh2KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRhcmdldC51cGRhdGVVcHN0cmVhbSh2KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB2O1xuICAgICAgICB9XG4gICAgfTtcbn1cbmV4cG9ydHMuZHNQaXBlVXAgPSBkc1BpcGVVcDtcbi8qKlxuICogTGV0cyB5b3Uga2VlcCBhIGhpc3Rvcnkgb2YgdGhlIHVwZGF0ZXMgb2YgYSBzb3VyY2UgYnkgcHVzaGluZyBpdCBvbnRvIGFuIGFycmF5IGRhdGFzb3VyY2VcbiAqL1xuZnVuY3Rpb24gZHNIaXN0b3J5KHJlcG9ydFRhcmdldCwgZ2VuZXJhdGlvbnMsIGNhbmNlbGxhdGlvblRva2VuID0gbmV3IGNhbmNlbGxhdGlvbl90b2tlbl9qc18xLkNhbmNlbGxhdGlvblRva2VuKCkpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBvcGVyYXRpb25UeXBlOiBvcGVyYXRvcl9tb2RlbF9qc18xLk9wZXJhdGlvblR5cGUuTk9PUCxcbiAgICAgICAgbmFtZTogYGhpc3RvcnlgLFxuICAgICAgICBvcGVyYXRpb246ICh2KSA9PiB7XG4gICAgICAgICAgICBpZiAoIWNhbmNlbGxhdGlvblRva2VuLmlzQ2FuY2VsZWQpIHtcbiAgICAgICAgICAgICAgICBpZiAoZ2VuZXJhdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcG9ydFRhcmdldC5sZW5ndGgudmFsdWUgPj0gZ2VuZXJhdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcG9ydFRhcmdldC5yZW1vdmVMZWZ0KHJlcG9ydFRhcmdldC5sZW5ndGgudmFsdWUgLSBnZW5lcmF0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmVwb3J0VGFyZ2V0LnB1c2godik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdjtcbiAgICAgICAgfVxuICAgIH07XG59XG5leHBvcnRzLmRzSGlzdG9yeSA9IGRzSGlzdG9yeTtcbi8qKlxuICogTW9uaXRvcnMgdGhlIG51bWJlciBvZiBldmVudHMgcGVyIGludGVydmFsXG4gKi9cbmZ1bmN0aW9uIGRzVGhyb3VnaHB1dE1ldGVyKHJlcG9ydFRhcmdldCwgaW50ZXJ2YWwsIGNhbmNlbGxhdGlvblRva2VuID0gbmV3IGNhbmNlbGxhdGlvbl90b2tlbl9qc18xLkNhbmNlbGxhdGlvblRva2VuKCkpIHtcbiAgICBsZXQgYW1vdW50ID0gMDtcbiAgICBjYW5jZWxsYXRpb25Ub2tlbi5zZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIHJlcG9ydFRhcmdldC51cGRhdGUoYW1vdW50KTtcbiAgICAgICAgYW1vdW50ID0gMDtcbiAgICB9LCBpbnRlcnZhbCk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgb3BlcmF0aW9uVHlwZTogb3BlcmF0b3JfbW9kZWxfanNfMS5PcGVyYXRpb25UeXBlLk5PT1AsXG4gICAgICAgIG5hbWU6IGB0aHJvdWdocHV0IG1ldGVyYCxcbiAgICAgICAgb3BlcmF0aW9uOiAodikgPT4ge1xuICAgICAgICAgICAgYW1vdW50Kys7XG4gICAgICAgICAgICByZXR1cm4gdjtcbiAgICAgICAgfVxuICAgIH07XG59XG5leHBvcnRzLmRzVGhyb3VnaHB1dE1ldGVyID0gZHNUaHJvdWdocHV0TWV0ZXI7XG4vKipcbiAqIEFsbG93cyBpbnNlcnRpbmcgYSBjYWxsYmFjayB0aGF0IGdldHMgY2FsbGVkIHdpdGggYW4gdXBkYXRlXG4gKi9cbmZ1bmN0aW9uIGRzVGFwKGNiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZTogJ3RhcCcsXG4gICAgICAgIG9wZXJhdGlvblR5cGU6IG9wZXJhdG9yX21vZGVsX2pzXzEuT3BlcmF0aW9uVHlwZS5OT09QLFxuICAgICAgICBvcGVyYXRpb246ICh2KSA9PiB7XG4gICAgICAgICAgICBjYih2KTtcbiAgICAgICAgICAgIHJldHVybiB2O1xuICAgICAgICB9XG4gICAgfTtcbn1cbmV4cG9ydHMuZHNUYXAgPSBkc1RhcDtcbi8qKlxuICogUGlwZXMgdXBkYXRlcyB0byB0aGUgdGFyZ2V0cyBpbiByb3VuZC1yb2JpbiBmYXNoaW9uXG4gKi9cbmZ1bmN0aW9uIGRzTG9hZEJhbGFuY2UodGFyZ2V0cykge1xuICAgIGxldCBpID0gMDtcbiAgICByZXR1cm4ge1xuICAgICAgICBuYW1lOiBgbG9hZEJhbGFuY2UgWyR7dGFyZ2V0cy5tYXAoKHYpID0+IHYubmFtZSkuam9pbigpfV1gLFxuICAgICAgICBvcGVyYXRpb25UeXBlOiBvcGVyYXRvcl9tb2RlbF9qc18xLk9wZXJhdGlvblR5cGUuTk9PUCxcbiAgICAgICAgb3BlcmF0aW9uOiAodikgPT4ge1xuICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGFyZ2V0c1tpKytdO1xuICAgICAgICAgICAgaWYgKGkgPj0gdGFyZ2V0cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBpID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0YXJnZXQgaW5zdGFuY2VvZiBkYXRhX3NvdXJjZV9qc18xLkRhdGFTb3VyY2UgfHwgdGFyZ2V0IGluc3RhbmNlb2Ygc3RyZWFtX2pzXzEuU3RyZWFtKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LnVwZGF0ZSh2KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRhcmdldC51cGRhdGVEb3duc3RyZWFtKHYpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHY7XG4gICAgICAgIH1cbiAgICB9O1xufVxuZXhwb3J0cy5kc0xvYWRCYWxhbmNlID0gZHNMb2FkQmFsYW5jZTtcbi8qKlxuICogTG9ncyB1cGRhdGVzIHRvIHRoZSBjb25zb2xlXG4gKi9cbmZ1bmN0aW9uIGRzTG9nKHByZWZpeCA9ICcnLCBzdWZmaXggPSAnJykge1xuICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6IGBsb2dgLFxuICAgICAgICBvcGVyYXRpb25UeXBlOiBvcGVyYXRvcl9tb2RlbF9qc18xLk9wZXJhdGlvblR5cGUuTk9PUCxcbiAgICAgICAgb3BlcmF0aW9uOiAodikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYCR7cHJlZml4fSR7dn0ke3N1ZmZpeH1gKTtcbiAgICAgICAgICAgIHJldHVybiB2O1xuICAgICAgICB9XG4gICAgfTtcbn1cbmV4cG9ydHMuZHNMb2cgPSBkc0xvZztcbmZ1bmN0aW9uIGRzUGlwZUFsbCguLi5zb3VyY2VzKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZTogYHBpcGVBbGwgWyR7c291cmNlcy5tYXAoKHYpID0+IHYubmFtZSkuam9pbigpfV1gLFxuICAgICAgICBvcGVyYXRpb25UeXBlOiBvcGVyYXRvcl9tb2RlbF9qc18xLk9wZXJhdGlvblR5cGUuTk9PUCxcbiAgICAgICAgb3BlcmF0aW9uOiAodikgPT4ge1xuICAgICAgICAgICAgc291cmNlcy5mb3JFYWNoKChzb3VyY2UpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoc291cmNlIGluc3RhbmNlb2YgZGF0YV9zb3VyY2VfanNfMS5EYXRhU291cmNlIHx8IHNvdXJjZSBpbnN0YW5jZW9mIHN0cmVhbV9qc18xLlN0cmVhbSkge1xuICAgICAgICAgICAgICAgICAgICBzb3VyY2UudXBkYXRlKHYpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc291cmNlLnVwZGF0ZURvd25zdHJlYW0odik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdjtcbiAgICAgICAgfVxuICAgIH07XG59XG5leHBvcnRzLmRzUGlwZUFsbCA9IGRzUGlwZUFsbDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGFfc291cmNlX29wZXJhdG9ycy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMucHJvY2Vzc1RyYW5zZm9ybUR1cGxleCA9IGV4cG9ydHMuRHVwbGV4RGF0YVNvdXJjZSA9IHZvaWQgMDtcbmNvbnN0IGF1cnVtX3NlcnZlcl9jbGllbnRfanNfMSA9IHJlcXVpcmUoXCIuLi9hdXJ1bV9zZXJ2ZXIvYXVydW1fc2VydmVyX2NsaWVudC5qc1wiKTtcbmNvbnN0IGNhbmNlbGxhdGlvbl90b2tlbl9qc18xID0gcmVxdWlyZShcIi4uL3V0aWxpdGllcy9jYW5jZWxsYXRpb25fdG9rZW4uanNcIik7XG5jb25zdCBldmVudF9lbWl0dGVyX2pzXzEgPSByZXF1aXJlKFwiLi4vdXRpbGl0aWVzL2V2ZW50X2VtaXR0ZXIuanNcIik7XG5jb25zdCBkYXRhX3NvdXJjZV9qc18xID0gcmVxdWlyZShcIi4vZGF0YV9zb3VyY2UuanNcIik7XG5jb25zdCBkdXBsZXhfZGF0YV9zb3VyY2Vfb3BlcmF0b3JzX2pzXzEgPSByZXF1aXJlKFwiLi9kdXBsZXhfZGF0YV9zb3VyY2Vfb3BlcmF0b3JzLmpzXCIpO1xuY29uc3Qgb3BlcmF0b3JfbW9kZWxfanNfMSA9IHJlcXVpcmUoXCIuL29wZXJhdG9yX21vZGVsLmpzXCIpO1xuLyoqXG4gKiBTYW1lIGFzIERhdGFTb3VyY2UgZXhjZXB0IGRhdGEgY2FuIGZsb3cgaW4gYm90aCBkaXJlY3Rpb25zXG4gKi9cbmNsYXNzIER1cGxleERhdGFTb3VyY2Uge1xuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIGluaXRpYWxWYWx1ZVxuICAgICAqIEBwYXJhbSByb290Tm9kZSBJZiBhIHdyaXRlIGlzIGRvbmUgcHJvcGFnYXRlIHRoaXMgdXBkYXRlIGJhY2sgZG93biB0byBhbGwgdGhlIGNvbnN1bWVycy4gVXNlZnVsIGF0IHRoZSByb290IG5vZGVcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihpbml0aWFsVmFsdWUsIHJvb3ROb2RlID0gdHJ1ZSwgbmFtZSA9ICdSb290RHVwbGV4RGF0YVNvdXJjZScpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IGluaXRpYWxWYWx1ZTtcbiAgICAgICAgdGhpcy5wcmltZWQgPSBpbml0aWFsVmFsdWUgIT09IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy51cGRhdGVEb3duc3RyZWFtRXZlbnQgPSBuZXcgZXZlbnRfZW1pdHRlcl9qc18xLkV2ZW50RW1pdHRlcigpO1xuICAgICAgICB0aGlzLnVwZGF0ZVVwc3RyZWFtRXZlbnQgPSBuZXcgZXZlbnRfZW1pdHRlcl9qc18xLkV2ZW50RW1pdHRlcigpO1xuICAgICAgICB0aGlzLnByb3BhZ2F0ZVdyaXRlc1RvUmVhZFN0cmVhbSA9IHJvb3ROb2RlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDb25uZWN0cyB0byBhbiBhdXJ1bS1zZXJ2ZXIgZXhwb3NlZCBkYXRhc291cmNlIHZpZXcgaHR0cHM6Ly9naXRodWIuY29tL0N5YmVyUGhvZW5peDkwL2F1cnVtLXNlcnZlciBmb3IgbW9yZSBpbmZvcm1hdGlvblxuICAgICAqIE5vdGUgdGhhdCB0eXBlIHNhZmV0eSBpcyBub3QgZ3VhcmFudGVlZC4gV2hhdGV2ZXIgdGhlIHNlcnZlciBzZW5kcyBhcyBhbiB1cGRhdGUgd2lsbCBiZSBwcm9wYWdhdGVkXG4gICAgICogQHBhcmFtICB7QXVydW1TZXJ2ZXJJbmZvfSBhdXJ1bVNlcnZlckluZm9cbiAgICAgKiBAcmV0dXJucyBEYXRhU291cmNlXG4gICAgICovXG4gICAgc3RhdGljIGZyb21SZW1vdGVTb3VyY2UoYXVydW1TZXJ2ZXJJbmZvLCBjYW5jZWxsYXRpb24pIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gbmV3IER1cGxleERhdGFTb3VyY2UodW5kZWZpbmVkLCBmYWxzZSk7XG4gICAgICAgICgwLCBhdXJ1bV9zZXJ2ZXJfY2xpZW50X2pzXzEuc3luY0R1cGxleERhdGFTb3VyY2UpKHJlc3VsdCwgYXVydW1TZXJ2ZXJJbmZvLCBjYW5jZWxsYXRpb24pO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBzdGF0aWMgdG9EdXBsZXhEYXRhU291cmNlKHZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIER1cGxleERhdGFTb3VyY2UpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRHVwbGV4RGF0YVNvdXJjZSh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogTWFrZXMgaXQgcG9zc2libGUgdG8gaGF2ZSAyIGNvbXBsZXRlbHkgc2VwYXJhdGUgZGF0YSBmbG93IHBpcGVsaW5lcyBmb3IgZWFjaCBkaXJlY3Rpb25cbiAgICAgKiBAcGFyYW0gZG93blN0cmVhbSBzdHJlYW0gdG8gcGlwZSBkb3duc3RyZWFtIGRhdGEgdG9cbiAgICAgKiBAcGFyYW0gdXBzdHJlYW0gIHN0cmVhbSB0byBwaXBlIHVwc3RyZWFtIGRhdGEgdG9cbiAgICAgKi9cbiAgICBzdGF0aWMgZnJvbVR3b0RhdGFTb3VyY2UoZG93blN0cmVhbSwgdXBzdHJlYW0sIGluaXRpYWxWYWx1ZSwgcHJvcGFnYXRlV3JpdGVzVG9SZWFkU3RyZWFtID0gdHJ1ZSkge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBuZXcgRHVwbGV4RGF0YVNvdXJjZShpbml0aWFsVmFsdWUsIHByb3BhZ2F0ZVdyaXRlc1RvUmVhZFN0cmVhbSk7XG4gICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICByZXN1bHQudXBkYXRlRG93bnN0cmVhbUV2ZW50ID0gZG93blN0cmVhbS51cGRhdGVFdmVudDtcbiAgICAgICAgLy9AdHMtaWdub3JlXG4gICAgICAgIHJlc3VsdC51cGRhdGVVcHN0cmVhbUV2ZW50ID0gdXBzdHJlYW0udXBkYXRlRXZlbnQ7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVwZGF0ZXMgdGhlIGRhdGEgc291cmNlIHdpdGggYSB2YWx1ZSBpZiBpdCBoYXMgbmV2ZXIgaGFkIGEgdmFsdWUgYmVmb3JlXG4gICAgICovXG4gICAgd2l0aEluaXRpYWwodmFsdWUpIHtcbiAgICAgICAgaWYgKCF0aGlzLnByaW1lZCkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVEb3duc3RyZWFtKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgdG9TdHJpbmcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFsbG93cyBjcmVhdGluZyBhIGR1cGxleCBzdHJlYW0gdGhhdCBibG9ja3MgZGF0YSBpbiBvbmUgZGlyZWN0aW9uLiBVc2VmdWwgZm9yIHBsdWdnaW5nIGludG8gY29kZSB0aGF0IHVzZXMgdHdvIHdheSBmbG93IGJ1dCBvbmx5IG9uZSB3YXkgaXMgZGVzaXJlZFxuICAgICAqIEBwYXJhbSBkaXJlY3Rpb24gZGlyZWN0aW9uIG9mIHRoZSBkYXRhZmxvdyB0aGF0IGlzIGFsbG93ZWRcbiAgICAgKi9cbiAgICBzdGF0aWMgY3JlYXRlT25lV2F5KGRpcmVjdGlvbiA9IGR1cGxleF9kYXRhX3NvdXJjZV9vcGVyYXRvcnNfanNfMS5EYXRhRmxvdy5ET1dOU1RSRUFNLCBpbml0aWFsVmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBEdXBsZXhEYXRhU291cmNlKGluaXRpYWxWYWx1ZSwgZmFsc2UpLnRyYW5zZm9ybUR1cGxleCgoMCwgZHVwbGV4X2RhdGFfc291cmNlX29wZXJhdG9yc19qc18xLmRkc09uZVdheUZsb3cpKGRpcmVjdGlvbikpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBVcGRhdGVzIHRoZSB2YWx1ZSBpbiB0aGUgZGF0YSBzb3VyY2UgYW5kIGNhbGxzIHRoZSBsaXN0ZW4gY2FsbGJhY2sgZm9yIGFsbCBsaXN0ZW5lcnNcbiAgICAgKiBAcGFyYW0gbmV3VmFsdWUgbmV3IHZhbHVlIGZvciB0aGUgZGF0YSBzb3VyY2VcbiAgICAgKi9cbiAgICB1cGRhdGVEb3duc3RyZWFtKG5ld1ZhbHVlKSB7XG4gICAgICAgIGlmICh0aGlzLnVwZGF0aW5nRG93bnN0cmVhbSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQcm9ibGVtIGluIGRhdGFzIHNvdXJjZTogVW5zdGFibGUgdmFsdWUgcHJvcGFnYXRpb24sIHdoZW4gdXBkYXRpbmcgYSB2YWx1ZSB0aGUgc3RyZWFtIHdhcyB1cGRhdGVkIGJhY2sgYXMgYSBkaXJlY3QgcmVzcG9uc2UuIFRoaXMgY2FuIGxlYWQgdG8gaW5maW5pdGUgbG9vcHMgYW5kIGlzIHRoZXJlZm9yZSBub3QgYWxsb3dlZCcpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucHJpbWVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy51cGRhdGluZ0Rvd25zdHJlYW0gPSB0cnVlO1xuICAgICAgICB0aGlzLnZhbHVlID0gbmV3VmFsdWU7XG4gICAgICAgIHRoaXMudXBkYXRlRG93bnN0cmVhbUV2ZW50LmZpcmUobmV3VmFsdWUpO1xuICAgICAgICB0aGlzLnVwZGF0aW5nRG93bnN0cmVhbSA9IGZhbHNlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBVcGRhdGVzIHRoZSB2YWx1ZSBpbiB0aGUgZGF0YSBzb3VyY2UgYW5kIGNhbGxzIHRoZSBsaXN0ZW4gY2FsbGJhY2sgZm9yIGFsbCBsaXN0ZW5lcnNcbiAgICAgKiBAcGFyYW0gbmV3VmFsdWUgbmV3IHZhbHVlIGZvciB0aGUgZGF0YSBzb3VyY2VcbiAgICAgKi9cbiAgICB1cGRhdGVVcHN0cmVhbShuZXdWYWx1ZSkge1xuICAgICAgICBpZiAodGhpcy51cGRhdGluZ1Vwc3RyZWFtKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Byb2JsZW0gaW4gZGF0YXMgc291cmNlOiBVbnN0YWJsZSB2YWx1ZSBwcm9wYWdhdGlvbiwgd2hlbiB1cGRhdGluZyBhIHZhbHVlIHRoZSBzdHJlYW0gd2FzIHVwZGF0ZWQgYmFjayBhcyBhIGRpcmVjdCByZXNwb25zZS4gVGhpcyBjYW4gbGVhZCB0byBpbmZpbml0ZSBsb29wcyBhbmQgaXMgdGhlcmVmb3JlIG5vdCBhbGxvd2VkJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wcmltZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLnVwZGF0aW5nVXBzdHJlYW0gPSB0cnVlO1xuICAgICAgICB0aGlzLnZhbHVlID0gbmV3VmFsdWU7XG4gICAgICAgIHRoaXMudXBkYXRlVXBzdHJlYW1FdmVudC5maXJlKG5ld1ZhbHVlKTtcbiAgICAgICAgaWYgKHRoaXMucHJvcGFnYXRlV3JpdGVzVG9SZWFkU3RyZWFtKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZURvd25zdHJlYW1FdmVudC5maXJlKG5ld1ZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnVwZGF0aW5nVXBzdHJlYW0gPSBmYWxzZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2FtZSBhcyBsaXN0ZW4gYnV0IHdpbGwgaW1tZWRpYXRlbHkgY2FsbCB0aGUgY2FsbGJhY2sgd2l0aCB0aGUgY3VycmVudCB2YWx1ZSBmaXJzdFxuICAgICAqIEBwYXJhbSBjYWxsYmFjayBDYWxsYmFjayB0byBjYWxsIHdoZW4gdmFsdWUgaXMgdXBkYXRlZFxuICAgICAqIEBwYXJhbSBjYW5jZWxsYXRpb25Ub2tlbiBPcHRpb25hbCB0b2tlbiB0byBjb250cm9sIHRoZSBjYW5jZWxsYXRpb24gb2YgdGhlIHN1YnNjcmlwdGlvblxuICAgICAqIEByZXR1cm5zIENhbmNlbGxhdGlvbiBjYWxsYmFjaywgY2FuIGJlIHVzZWQgdG8gY2FuY2VsIHN1YnNjcmlwdGlvbiB3aXRob3V0IGEgY2FuY2VsbGF0aW9uIHRva2VuXG4gICAgICovXG4gICAgbGlzdGVuQW5kUmVwZWF0KGNhbGxiYWNrLCBjYW5jZWxsYXRpb25Ub2tlbikge1xuICAgICAgICBpZiAodGhpcy5wcmltZWQpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKHRoaXMudmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmxpc3RlbihjYWxsYmFjaywgY2FuY2VsbGF0aW9uVG9rZW4pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBhbGlhcyBmb3IgbGlzdGVuRG93bnN0cmVhbVxuICAgICAqIEBwYXJhbSBjYWxsYmFjayBDYWxsYmFjayB0byBjYWxsIHdoZW4gdmFsdWUgaXMgdXBkYXRlZFxuICAgICAqIEBwYXJhbSBjYW5jZWxsYXRpb25Ub2tlbiBPcHRpb25hbCB0b2tlbiB0byBjb250cm9sIHRoZSBjYW5jZWxsYXRpb24gb2YgdGhlIHN1YnNjcmlwdGlvblxuICAgICAqIEByZXR1cm5zIENhbmNlbGxhdGlvbiBjYWxsYmFjaywgY2FuIGJlIHVzZWQgdG8gY2FuY2VsIHN1YnNjcmlwdGlvbiB3aXRob3V0IGEgY2FuY2VsbGF0aW9uIHRva2VuXG4gICAgICovXG4gICAgbGlzdGVuKGNhbGxiYWNrLCBjYW5jZWxsYXRpb25Ub2tlbikge1xuICAgICAgICByZXR1cm4gdGhpcy5saXN0ZW5JbnRlcm5hbChjYWxsYmFjaywgY2FuY2VsbGF0aW9uVG9rZW4pO1xuICAgIH1cbiAgICBsaXN0ZW5JbnRlcm5hbChjYWxsYmFjaywgY2FuY2VsbGF0aW9uVG9rZW4pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudXBkYXRlRG93bnN0cmVhbUV2ZW50LnN1YnNjcmliZShjYWxsYmFjaywgY2FuY2VsbGF0aW9uVG9rZW4pLmNhbmNlbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU3Vic2NyaWJlcyBleGNsdXNpdmVseSB0byB1cGRhdGVzIG9mIHRoZSBkYXRhIHN0cmVhbSB0aGF0IG9jY3VyIGR1ZSB0byBhbiB1cGRhdGUgZmxvd2luZyB1cHN0cmVhbVxuICAgICAqIEBwYXJhbSBjYWxsYmFjayBDYWxsYmFjayB0byBjYWxsIHdoZW4gdmFsdWUgaXMgdXBkYXRlZFxuICAgICAqIEBwYXJhbSBjYW5jZWxsYXRpb25Ub2tlbiBPcHRpb25hbCB0b2tlbiB0byBjb250cm9sIHRoZSBjYW5jZWxsYXRpb24gb2YgdGhlIHN1YnNjcmlwdGlvblxuICAgICAqIEByZXR1cm5zIENhbmNlbGxhdGlvbiBjYWxsYmFjaywgY2FuIGJlIHVzZWQgdG8gY2FuY2VsIHN1YnNjcmlwdGlvbiB3aXRob3V0IGEgY2FuY2VsbGF0aW9uIHRva2VuXG4gICAgICovXG4gICAgbGlzdGVuVXBzdHJlYW0oY2FsbGJhY2ssIGNhbmNlbGxhdGlvblRva2VuKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnVwZGF0ZVVwc3RyZWFtRXZlbnQuc3Vic2NyaWJlKGNhbGxiYWNrLCBjYW5jZWxsYXRpb25Ub2tlbikuY2FuY2VsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTdWJzY3JpYmVzIGV4Y2x1c2l2ZWx5IHRvIHVwZGF0ZXMgb2YgdGhlIGRhdGEgc3RyZWFtIHRoYXQgb2NjdXIgZHVlIHRvIGFuIHVwZGF0ZSBmbG93aW5nIHVwc3RyZWFtXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIENhbGxiYWNrIHRvIGNhbGwgd2hlbiB2YWx1ZSBpcyB1cGRhdGVkXG4gICAgICogQHBhcmFtIGNhbmNlbGxhdGlvblRva2VuIE9wdGlvbmFsIHRva2VuIHRvIGNvbnRyb2wgdGhlIGNhbmNlbGxhdGlvbiBvZiB0aGUgc3Vic2NyaXB0aW9uXG4gICAgICogQHJldHVybnMgQ2FuY2VsbGF0aW9uIGNhbGxiYWNrLCBjYW4gYmUgdXNlZCB0byBjYW5jZWwgc3Vic2NyaXB0aW9uIHdpdGhvdXQgYSBjYW5jZWxsYXRpb24gdG9rZW5cbiAgICAgKi9cbiAgICBsaXN0ZW5VcHN0cmVhbUFuZFJlcGVhdChjYWxsYmFjaywgY2FuY2VsbGF0aW9uVG9rZW4pIHtcbiAgICAgICAgaWYgKHRoaXMucHJpbWVkKSB7XG4gICAgICAgICAgICBjYWxsYmFjayh0aGlzLnZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy51cGRhdGVVcHN0cmVhbUV2ZW50LnN1YnNjcmliZShjYWxsYmFjaywgY2FuY2VsbGF0aW9uVG9rZW4pLmNhbmNlbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU3Vic2NyaWJlcyBleGNsdXNpdmVseSB0byBvbmUgdXBkYXRlIG9mIHRoZSBkYXRhIHN0cmVhbSB0aGF0IG9jY3VyIGR1ZSB0byBhbiB1cGRhdGUgZmxvd2luZyB1cHN0cmVhbVxuICAgICAqIEBwYXJhbSBjYWxsYmFjayBDYWxsYmFjayB0byBjYWxsIHdoZW4gdmFsdWUgaXMgdXBkYXRlZFxuICAgICAqIEBwYXJhbSBjYW5jZWxsYXRpb25Ub2tlbiBPcHRpb25hbCB0b2tlbiB0byBjb250cm9sIHRoZSBjYW5jZWxsYXRpb24gb2YgdGhlIHN1YnNjcmlwdGlvblxuICAgICAqIEByZXR1cm5zIENhbmNlbGxhdGlvbiBjYWxsYmFjaywgY2FuIGJlIHVzZWQgdG8gY2FuY2VsIHN1YnNjcmlwdGlvbiB3aXRob3V0IGEgY2FuY2VsbGF0aW9uIHRva2VuXG4gICAgICovXG4gICAgbGlzdGVuVXBzdHJlYW1PbmNlKGNhbGxiYWNrLCBjYW5jZWxsYXRpb25Ub2tlbikge1xuICAgICAgICByZXR1cm4gdGhpcy51cGRhdGVVcHN0cmVhbUV2ZW50LnN1YnNjcmliZU9uY2UoY2FsbGJhY2ssIGNhbmNlbGxhdGlvblRva2VuKS5jYW5jZWw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFN1YnNjcmliZXMgZXhjbHVzaXZlbHkgdG8gdXBkYXRlcyBvZiB0aGUgZGF0YSBzdHJlYW0gdGhhdCBvY2N1ciBkdWUgdG8gYW4gdXBkYXRlIGZsb3dpbmcgZG93bnN0cmVhbVxuICAgICAqIEBwYXJhbSBjYWxsYmFjayBDYWxsYmFjayB0byBjYWxsIHdoZW4gdmFsdWUgaXMgdXBkYXRlZFxuICAgICAqIEBwYXJhbSBjYW5jZWxsYXRpb25Ub2tlbiBPcHRpb25hbCB0b2tlbiB0byBjb250cm9sIHRoZSBjYW5jZWxsYXRpb24gb2YgdGhlIHN1YnNjcmlwdGlvblxuICAgICAqIEByZXR1cm5zIENhbmNlbGxhdGlvbiBjYWxsYmFjaywgY2FuIGJlIHVzZWQgdG8gY2FuY2VsIHN1YnNjcmlwdGlvbiB3aXRob3V0IGEgY2FuY2VsbGF0aW9uIHRva2VuXG4gICAgICovXG4gICAgbGlzdGVuRG93bnN0cmVhbShjYWxsYmFjaywgY2FuY2VsbGF0aW9uVG9rZW4pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudXBkYXRlRG93bnN0cmVhbUV2ZW50LnN1YnNjcmliZShjYWxsYmFjaywgY2FuY2VsbGF0aW9uVG9rZW4pLmNhbmNlbDtcbiAgICB9XG4gICAgZG93blN0cmVhbVRvRGF0YVNvdXJjZShjYW5jZWxsYXRpb25Ub2tlbikge1xuICAgICAgICBjb25zdCBkb3duU3RyZWFtRGF0YXNvdXJjZSA9IG5ldyBkYXRhX3NvdXJjZV9qc18xLkRhdGFTb3VyY2UodGhpcy52YWx1ZSk7XG4gICAgICAgIHRoaXMubGlzdGVuRG93bnN0cmVhbSgobmV3VmFsKSA9PiB7XG4gICAgICAgICAgICBkb3duU3RyZWFtRGF0YXNvdXJjZS51cGRhdGUobmV3VmFsKTtcbiAgICAgICAgfSwgY2FuY2VsbGF0aW9uVG9rZW4pO1xuICAgICAgICByZXR1cm4gZG93blN0cmVhbURhdGFzb3VyY2U7XG4gICAgfVxuICAgIGFnZ3JlZ2F0ZShvdGhlclNvdXJjZXMsIGNvbWJpbmF0b3IsIGNhbmNlbGxhdGlvblRva2VuKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgY2FuY2VsbGF0aW9uVG9rZW4gPSBjYW5jZWxsYXRpb25Ub2tlbiAhPT0gbnVsbCAmJiBjYW5jZWxsYXRpb25Ub2tlbiAhPT0gdm9pZCAwID8gY2FuY2VsbGF0aW9uVG9rZW4gOiBuZXcgY2FuY2VsbGF0aW9uX3Rva2VuX2pzXzEuQ2FuY2VsbGF0aW9uVG9rZW4oKTtcbiAgICAgICAgY29uc3QgYWdncmVnYXRlZFNvdXJjZSA9IG5ldyBkYXRhX3NvdXJjZV9qc18xLkRhdGFTb3VyY2UoY29tYmluYXRvcih0aGlzLnZhbHVlLCAuLi5vdGhlclNvdXJjZXMubWFwKChzKSA9PiBzID09PSBudWxsIHx8IHMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHMudmFsdWUpKSk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3RoZXJTb3VyY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAoX2EgPSBvdGhlclNvdXJjZXNbaV0pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5saXN0ZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIGFnZ3JlZ2F0ZWRTb3VyY2UudXBkYXRlKGNvbWJpbmF0b3IodGhpcy52YWx1ZSwgLi4ub3RoZXJTb3VyY2VzLm1hcCgocykgPT4gcyA9PT0gbnVsbCB8fCBzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzLnZhbHVlKSkpO1xuICAgICAgICAgICAgfSwgY2FuY2VsbGF0aW9uVG9rZW4pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubGlzdGVuKCgpID0+IGFnZ3JlZ2F0ZWRTb3VyY2UudXBkYXRlKGNvbWJpbmF0b3IodGhpcy52YWx1ZSwgLi4ub3RoZXJTb3VyY2VzLm1hcCgocykgPT4gcyA9PT0gbnVsbCB8fCBzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzLnZhbHVlKSkpLCBjYW5jZWxsYXRpb25Ub2tlbik7XG4gICAgICAgIHJldHVybiBhZ2dyZWdhdGVkU291cmNlO1xuICAgIH1cbiAgICB0cmFuc2Zvcm1EdXBsZXgob3BlcmF0aW9uQSwgb3BlcmF0aW9uQiwgb3BlcmF0aW9uQywgb3BlcmF0aW9uRCwgb3BlcmF0aW9uRSwgb3BlcmF0aW9uRiwgb3BlcmF0aW9uRywgb3BlcmF0aW9uSCwgb3BlcmF0aW9uSSwgb3BlcmF0aW9uSiwgb3BlcmF0aW9uSywgY2FuY2VsbGF0aW9uVG9rZW4pIHtcbiAgICAgICAgbGV0IHRva2VuO1xuICAgICAgICBjb25zdCBvcGVyYXRpb25zID0gW1xuICAgICAgICAgICAgb3BlcmF0aW9uQSxcbiAgICAgICAgICAgIG9wZXJhdGlvbkIsXG4gICAgICAgICAgICBvcGVyYXRpb25DLFxuICAgICAgICAgICAgb3BlcmF0aW9uRCxcbiAgICAgICAgICAgIG9wZXJhdGlvbkUsXG4gICAgICAgICAgICBvcGVyYXRpb25GLFxuICAgICAgICAgICAgb3BlcmF0aW9uRyxcbiAgICAgICAgICAgIG9wZXJhdGlvbkgsXG4gICAgICAgICAgICBvcGVyYXRpb25JLFxuICAgICAgICAgICAgb3BlcmF0aW9uSixcbiAgICAgICAgICAgIG9wZXJhdGlvbktcbiAgICAgICAgXS5maWx0ZXIoKGUpID0+IGUgJiYgKGUgaW5zdGFuY2VvZiBjYW5jZWxsYXRpb25fdG9rZW5fanNfMS5DYW5jZWxsYXRpb25Ub2tlbiA/ICgodG9rZW4gPSBlKSwgZmFsc2UpIDogdHJ1ZSkpO1xuICAgICAgICBpZiAoY2FuY2VsbGF0aW9uVG9rZW4pIHtcbiAgICAgICAgICAgIHRva2VuID0gY2FuY2VsbGF0aW9uVG9rZW47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmVzdWx0ID0gbmV3IER1cGxleERhdGFTb3VyY2UodW5kZWZpbmVkLCBmYWxzZSwgdGhpcy5uYW1lICsgJyAnICsgb3BlcmF0aW9ucy5tYXAoKHYpID0+IHYubmFtZSkuam9pbignICcpKTtcbiAgICAgICAgKHRoaXMucHJpbWVkID8gdGhpcy5saXN0ZW5BbmRSZXBlYXQgOiB0aGlzLmxpc3RlbikuY2FsbCh0aGlzLCBwcm9jZXNzVHJhbnNmb3JtRHVwbGV4KG9wZXJhdGlvbnMsIHJlc3VsdCwgZHVwbGV4X2RhdGFfc291cmNlX29wZXJhdG9yc19qc18xLkRhdGFGbG93LkRPV05TVFJFQU0pLCB0b2tlbik7XG4gICAgICAgIHJlc3VsdC5saXN0ZW5VcHN0cmVhbS5jYWxsKHJlc3VsdCwgcHJvY2Vzc1RyYW5zZm9ybUR1cGxleChvcGVyYXRpb25zLCB0aGlzLCBkdXBsZXhfZGF0YV9zb3VyY2Vfb3BlcmF0b3JzX2pzXzEuRGF0YUZsb3cuVVBTVFJFQU0pLCB0b2tlbik7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIHRyYW5zZm9ybShvcGVyYXRpb25BLCBvcGVyYXRpb25CLCBvcGVyYXRpb25DLCBvcGVyYXRpb25ELCBvcGVyYXRpb25FLCBvcGVyYXRpb25GLCBvcGVyYXRpb25HLCBvcGVyYXRpb25ILCBvcGVyYXRpb25JLCBvcGVyYXRpb25KLCBvcGVyYXRpb25LLCBjYW5jZWxsYXRpb25Ub2tlbikge1xuICAgICAgICBsZXQgdG9rZW47XG4gICAgICAgIGNvbnN0IG9wZXJhdGlvbnMgPSBbXG4gICAgICAgICAgICBvcGVyYXRpb25BLFxuICAgICAgICAgICAgb3BlcmF0aW9uQixcbiAgICAgICAgICAgIG9wZXJhdGlvbkMsXG4gICAgICAgICAgICBvcGVyYXRpb25ELFxuICAgICAgICAgICAgb3BlcmF0aW9uRSxcbiAgICAgICAgICAgIG9wZXJhdGlvbkYsXG4gICAgICAgICAgICBvcGVyYXRpb25HLFxuICAgICAgICAgICAgb3BlcmF0aW9uSCxcbiAgICAgICAgICAgIG9wZXJhdGlvbkksXG4gICAgICAgICAgICBvcGVyYXRpb25KLFxuICAgICAgICAgICAgb3BlcmF0aW9uS1xuICAgICAgICBdLmZpbHRlcigoZSkgPT4gZSAmJiAoZSBpbnN0YW5jZW9mIGNhbmNlbGxhdGlvbl90b2tlbl9qc18xLkNhbmNlbGxhdGlvblRva2VuID8gKCh0b2tlbiA9IGUpLCBmYWxzZSkgOiB0cnVlKSk7XG4gICAgICAgIGlmIChjYW5jZWxsYXRpb25Ub2tlbikge1xuICAgICAgICAgICAgdG9rZW4gPSBjYW5jZWxsYXRpb25Ub2tlbjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZXN1bHQgPSBuZXcgZGF0YV9zb3VyY2VfanNfMS5EYXRhU291cmNlKHVuZGVmaW5lZCwgdGhpcy5uYW1lICsgJyAnICsgb3BlcmF0aW9ucy5tYXAoKHYpID0+IHYubmFtZSkuam9pbignICcpKTtcbiAgICAgICAgKHRoaXMucHJpbWVkID8gdGhpcy5saXN0ZW5BbmRSZXBlYXQgOiB0aGlzLmxpc3RlbikuY2FsbCh0aGlzLCAoMCwgZGF0YV9zb3VyY2VfanNfMS5wcm9jZXNzVHJhbnNmb3JtKShvcGVyYXRpb25zLCByZXN1bHQpLCB0b2tlbik7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEZvcndhcmRzIGFsbCB1cGRhdGVzIGZyb20gdGhpcyBzb3VyY2UgdG8gYW5vdGhlclxuICAgICAqIEBwYXJhbSB0YXJnZXREYXRhU291cmNlIGRhdGFzb3VyY2UgdG8gcGlwZSB0aGUgdXBkYXRlcyB0b1xuICAgICAqIEBwYXJhbSBjYW5jZWxsYXRpb25Ub2tlbiAgQ2FuY2VsbGF0aW9uIHRva2VuIHRvIGNhbmNlbCB0aGUgc3Vic2NyaXB0aW9ucyBhZGRlZCB0byB0aGUgZGF0YXNvdXJjZXMgYnkgdGhpcyBvcGVyYXRpb25cbiAgICAgKi9cbiAgICBwaXBlKHRhcmdldERhdGFTb3VyY2UsIGNhbmNlbGxhdGlvblRva2VuKSB7XG4gICAgICAgIHRoaXMubGlzdGVuRG93bnN0cmVhbSgobmV3VmFsKSA9PiB0YXJnZXREYXRhU291cmNlLnVwZGF0ZURvd25zdHJlYW0obmV3VmFsKSwgY2FuY2VsbGF0aW9uVG9rZW4pO1xuICAgICAgICB0YXJnZXREYXRhU291cmNlLmxpc3RlblVwc3RyZWFtKChuZXdWYWwpID0+IHRoaXMudXBkYXRlVXBzdHJlYW0obmV3VmFsKSwgY2FuY2VsbGF0aW9uVG9rZW4pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgbGlzdGVuT25jZShjYWxsYmFjaywgY2FuY2VsbGF0aW9uVG9rZW4pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudXBkYXRlRG93bnN0cmVhbUV2ZW50LnN1YnNjcmliZU9uY2UoY2FsbGJhY2ssIGNhbmNlbGxhdGlvblRva2VuKS5jYW5jZWw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgbmV4dCB1cGRhdGUgb2NjdXJzXG4gICAgICogQHBhcmFtIGNhbmNlbGxhdGlvblRva2VuXG4gICAgICovXG4gICAgYXdhaXROZXh0VXBkYXRlKGNhbmNlbGxhdGlvblRva2VuKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5saXN0ZW5PbmNlKCh2YWx1ZSkgPT4gcmVzb2x2ZSh2YWx1ZSksIGNhbmNlbGxhdGlvblRva2VuKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlbW92ZSBhbGwgbGlzdGVuZXJzXG4gICAgICovXG4gICAgY2FuY2VsQWxsKCkge1xuICAgICAgICB0aGlzLnVwZGF0ZURvd25zdHJlYW1FdmVudC5jYW5jZWxBbGwoKTtcbiAgICAgICAgdGhpcy51cGRhdGVVcHN0cmVhbUV2ZW50LmNhbmNlbEFsbCgpO1xuICAgIH1cbiAgICBjYW5jZWxBbGxEb3duc3RyZWFtKCkge1xuICAgICAgICB0aGlzLnVwZGF0ZURvd25zdHJlYW1FdmVudC5jYW5jZWxBbGwoKTtcbiAgICB9XG4gICAgY2FuY2VsQWxsVXBzdHJlYW0oKSB7XG4gICAgICAgIHRoaXMudXBkYXRlVXBzdHJlYW1FdmVudC5jYW5jZWxBbGwoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQXNzaWduIGEgZnVuY3Rpb24gdG8gaGFuZGxlIGVycm9ycyBhbmQgbWFwIHRoZW0gYmFjayB0byByZWd1bGFyIHZhbHVlcy4gUmV0aHJvdyB0aGUgZXJyb3IgaW4gY2FzZSB5b3Ugd2FudCB0byBmYWxsYmFjayB0byBlbWl0dGluZyBlcnJvclxuICAgICAqL1xuICAgIGhhbmRsZUVycm9ycyhjYWxsYmFjaykge1xuICAgICAgICB0aGlzLmVycm9ySGFuZGxlciA9IGNhbGxiYWNrO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgb25FcnJvcihjYWxsYmFjaywgY2FuY2VsbGF0aW9uVG9rZW4pIHtcbiAgICAgICAgdGhpcy5lcnJvckV2ZW50LnN1YnNjcmliZShjYWxsYmFjaywgY2FuY2VsbGF0aW9uVG9rZW4pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgZW1pdEVycm9yKGUsIGRpcmVjdGlvbikge1xuICAgICAgICBpZiAodGhpcy5lcnJvckhhbmRsZXIpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gZHVwbGV4X2RhdGFfc291cmNlX29wZXJhdG9yc19qc18xLkRhdGFGbG93LkRPV05TVFJFQU0pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudXBkYXRlRG93bnN0cmVhbSh0aGlzLmVycm9ySGFuZGxlcihlKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy51cGRhdGVVcHN0cmVhbSh0aGlzLmVycm9ySGFuZGxlcihlKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKG5ld0Vycm9yKSB7XG4gICAgICAgICAgICAgICAgZSA9IG5ld0Vycm9yO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmVycm9yRXZlbnQuaGFzU3Vic2NyaXB0aW9ucygpKSB7XG4gICAgICAgICAgICB0aGlzLmVycm9yRXZlbnQuZmlyZShlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IGU7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLkR1cGxleERhdGFTb3VyY2UgPSBEdXBsZXhEYXRhU291cmNlO1xuZnVuY3Rpb24gcHJvY2Vzc1RyYW5zZm9ybUR1cGxleChvcGVyYXRpb25zLCByZXN1bHQsIGRpcmVjdGlvbikge1xuICAgIHJldHVybiBhc3luYyAodikgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBvcGVyYXRpb24gb2Ygb3BlcmF0aW9ucykge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAob3BlcmF0aW9uLm9wZXJhdGlvblR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBvcGVyYXRvcl9tb2RlbF9qc18xLk9wZXJhdGlvblR5cGUuTk9PUDpcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBvcGVyYXRvcl9tb2RlbF9qc18xLk9wZXJhdGlvblR5cGUuTUFQOlxuICAgICAgICAgICAgICAgICAgICAgICAgdiA9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlyZWN0aW9uID09PSBkdXBsZXhfZGF0YV9zb3VyY2Vfb3BlcmF0b3JzX2pzXzEuRGF0YUZsb3cuRE9XTlNUUkVBTVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IG9wZXJhdGlvbi5vcGVyYXRpb25Eb3duKHYpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogb3BlcmF0aW9uLm9wZXJhdGlvblVwKHYpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2Ugb3BlcmF0b3JfbW9kZWxfanNfMS5PcGVyYXRpb25UeXBlLk1BUF9ERUxBWV9GSUxURVI6XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0bXAgPSBkaXJlY3Rpb24gPT09IGR1cGxleF9kYXRhX3NvdXJjZV9vcGVyYXRvcnNfanNfMS5EYXRhRmxvdy5ET1dOU1RSRUFNXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBhd2FpdCBvcGVyYXRpb24ub3BlcmF0aW9uRG93bih2KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogYXdhaXQgb3BlcmF0aW9uLm9wZXJhdGlvblVwKHYpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRtcC5jYW5jZWxsZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2ID0gYXdhaXQgdG1wLml0ZW07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBvcGVyYXRvcl9tb2RlbF9qc18xLk9wZXJhdGlvblR5cGUuREVMQVk6XG4gICAgICAgICAgICAgICAgICAgIGNhc2Ugb3BlcmF0b3JfbW9kZWxfanNfMS5PcGVyYXRpb25UeXBlLk1BUF9ERUxBWTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHYgPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdGlvbiA9PT0gZHVwbGV4X2RhdGFfc291cmNlX29wZXJhdG9yc19qc18xLkRhdGFGbG93LkRPV05TVFJFQU1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBhd2FpdCBvcGVyYXRpb24ub3BlcmF0aW9uRG93bih2KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGF3YWl0IG9wZXJhdGlvbi5vcGVyYXRpb25VcCh2KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIG9wZXJhdG9yX21vZGVsX2pzXzEuT3BlcmF0aW9uVHlwZS5ERUxBWV9GSUxURVI6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIShkaXJlY3Rpb24gPT09IGR1cGxleF9kYXRhX3NvdXJjZV9vcGVyYXRvcnNfanNfMS5EYXRhRmxvdy5ET1dOU1RSRUFNXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBhd2FpdCBvcGVyYXRpb24ub3BlcmF0aW9uRG93bih2KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogYXdhaXQgb3BlcmF0aW9uLm9wZXJhdGlvblVwKHYpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIG9wZXJhdG9yX21vZGVsX2pzXzEuT3BlcmF0aW9uVHlwZS5GSUxURVI6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIShkaXJlY3Rpb24gPT09IGR1cGxleF9kYXRhX3NvdXJjZV9vcGVyYXRvcnNfanNfMS5EYXRhRmxvdy5ET1dOU1RSRUFNXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBvcGVyYXRpb24ub3BlcmF0aW9uRG93bih2KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogb3BlcmF0aW9uLm9wZXJhdGlvblVwKHYpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkaXJlY3Rpb24gPT09IGR1cGxleF9kYXRhX3NvdXJjZV9vcGVyYXRvcnNfanNfMS5EYXRhRmxvdy5ET1dOU1RSRUFNKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnVwZGF0ZURvd25zdHJlYW0odik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXN1bHQudXBkYXRlVXBzdHJlYW0odik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHJlc3VsdC5lbWl0RXJyb3IoZSwgZGlyZWN0aW9uKTtcbiAgICAgICAgfVxuICAgIH07XG59XG5leHBvcnRzLnByb2Nlc3NUcmFuc2Zvcm1EdXBsZXggPSBwcm9jZXNzVHJhbnNmb3JtRHVwbGV4O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZHVwbGV4X2RhdGFfc291cmNlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5kZHNVbmlxdWUgPSBleHBvcnRzLmRkc0ZpbHRlciA9IGV4cG9ydHMuZGRzT25lV2F5RmxvdyA9IGV4cG9ydHMuZGRzRGVib3VuY2UgPSBleHBvcnRzLmRkc01hcCA9IGV4cG9ydHMuRGF0YUZsb3dCb3RoID0gZXhwb3J0cy5EYXRhRmxvdyA9IHZvaWQgMDtcbmNvbnN0IGRhdGFfc291cmNlX29wZXJhdG9yc19qc18xID0gcmVxdWlyZShcIi4vZGF0YV9zb3VyY2Vfb3BlcmF0b3JzLmpzXCIpO1xuY29uc3Qgb3BlcmF0b3JfbW9kZWxfanNfMSA9IHJlcXVpcmUoXCIuL29wZXJhdG9yX21vZGVsLmpzXCIpO1xudmFyIERhdGFGbG93O1xuKGZ1bmN0aW9uIChEYXRhRmxvdykge1xuICAgIERhdGFGbG93W0RhdGFGbG93W1wiVVBTVFJFQU1cIl0gPSAwXSA9IFwiVVBTVFJFQU1cIjtcbiAgICBEYXRhRmxvd1tEYXRhRmxvd1tcIkRPV05TVFJFQU1cIl0gPSAxXSA9IFwiRE9XTlNUUkVBTVwiO1xufSkoRGF0YUZsb3cgPSBleHBvcnRzLkRhdGFGbG93IHx8IChleHBvcnRzLkRhdGFGbG93ID0ge30pKTtcbnZhciBEYXRhRmxvd0JvdGg7XG4oZnVuY3Rpb24gKERhdGFGbG93Qm90aCkge1xuICAgIERhdGFGbG93Qm90aFtEYXRhRmxvd0JvdGhbXCJVUFNUUkVBTVwiXSA9IDBdID0gXCJVUFNUUkVBTVwiO1xuICAgIERhdGFGbG93Qm90aFtEYXRhRmxvd0JvdGhbXCJET1dOU1RSRUFNXCJdID0gMV0gPSBcIkRPV05TVFJFQU1cIjtcbiAgICBEYXRhRmxvd0JvdGhbRGF0YUZsb3dCb3RoW1wiQk9USFwiXSA9IDJdID0gXCJCT1RIXCI7XG59KShEYXRhRmxvd0JvdGggPSBleHBvcnRzLkRhdGFGbG93Qm90aCB8fCAoZXhwb3J0cy5EYXRhRmxvd0JvdGggPSB7fSkpO1xuZnVuY3Rpb24gZGRzTWFwKG1hcERvd24sIG1hcFVwKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZTogJ21hcCcsXG4gICAgICAgIG9wZXJhdGlvblR5cGU6IG9wZXJhdG9yX21vZGVsX2pzXzEuT3BlcmF0aW9uVHlwZS5NQVAsXG4gICAgICAgIG9wZXJhdGlvbkRvd246ICh2KSA9PiBtYXBEb3duKHYpLFxuICAgICAgICBvcGVyYXRpb25VcDogKHYpID0+IG1hcFVwKHYpXG4gICAgfTtcbn1cbmV4cG9ydHMuZGRzTWFwID0gZGRzTWFwO1xuLyoqXG4gKiBTdGFydHMgYSB0aW1lciB3aGVuIGFuIHVwZGF0ZSBvY2N1cnMsIGRlbGF5cyB0aGUgdXBkYXRlIHVudGlsIHRoZSB0aW1lciBwYXNzZWQgaWYgYSBuZXcgdXBkYXRlIGFycml2ZXMgdGhlIGluaXRpYWxcbiAqIHVwZGF0ZSBpcyBjYW5jZWxsZWQgYW5kIHRoZSBwcm9jZXNzIHN0YXJ0cyBhZ2FpblxuICovXG5mdW5jdGlvbiBkZHNEZWJvdW5jZSh0aW1lLCBkaXJlY3Rpb24pIHtcbiAgICBjb25zdCBkZWJvdW5jZURvd24gPSAoMCwgZGF0YV9zb3VyY2Vfb3BlcmF0b3JzX2pzXzEuZHNEZWJvdW5jZSkodGltZSk7XG4gICAgY29uc3QgZGVib3VuY2VVcCA9ICgwLCBkYXRhX3NvdXJjZV9vcGVyYXRvcnNfanNfMS5kc0RlYm91bmNlKSh0aW1lKTtcbiAgICByZXR1cm4ge1xuICAgICAgICBvcGVyYXRpb25UeXBlOiBvcGVyYXRvcl9tb2RlbF9qc18xLk9wZXJhdGlvblR5cGUuREVMQVlfRklMVEVSLFxuICAgICAgICBuYW1lOiBgZGVib3VuY2UgJHt0aW1lfW1zYCxcbiAgICAgICAgb3BlcmF0aW9uRG93bjogKHYpID0+IHtcbiAgICAgICAgICAgIGlmIChkaXJlY3Rpb24gPT09IHVuZGVmaW5lZCB8fCBkaXJlY3Rpb24gPT09IERhdGFGbG93Qm90aC5ET1dOU1RSRUFNIHx8IGRpcmVjdGlvbiA9PT0gRGF0YUZsb3dCb3RoLkJPVEgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGVib3VuY2VEb3duLm9wZXJhdGlvbih2KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG9wZXJhdGlvblVwOiAodikgPT4ge1xuICAgICAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gdW5kZWZpbmVkIHx8IGRpcmVjdGlvbiA9PT0gRGF0YUZsb3dCb3RoLlVQU1RSRUFNIHx8IGRpcmVjdGlvbiA9PT0gRGF0YUZsb3dCb3RoLkJPVEgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGVib3VuY2VVcC5vcGVyYXRpb24odik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbn1cbmV4cG9ydHMuZGRzRGVib3VuY2UgPSBkZHNEZWJvdW5jZTtcbmZ1bmN0aW9uIGRkc09uZVdheUZsb3coZGlyZWN0aW9uKSB7XG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gRGF0YUZsb3cuRE9XTlNUUkVBTSkge1xuICAgICAgICByZXR1cm4gZGRzRmlsdGVyKCgpID0+IHRydWUsICgpID0+IGZhbHNlKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBkZHNGaWx0ZXIoKCkgPT4gZmFsc2UsICgpID0+IHRydWUpO1xuICAgIH1cbn1cbmV4cG9ydHMuZGRzT25lV2F5RmxvdyA9IGRkc09uZVdheUZsb3c7XG5mdW5jdGlvbiBkZHNGaWx0ZXIocHJlZGljYXRlRG93biwgcHJlZGljYXRlVXApIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBuYW1lOiAnZmlsdGVyJyxcbiAgICAgICAgb3BlcmF0aW9uVHlwZTogb3BlcmF0b3JfbW9kZWxfanNfMS5PcGVyYXRpb25UeXBlLkZJTFRFUixcbiAgICAgICAgb3BlcmF0aW9uRG93bjogKHYpID0+IHByZWRpY2F0ZURvd24odiksXG4gICAgICAgIG9wZXJhdGlvblVwOiAodikgPT4gcHJlZGljYXRlVXAodilcbiAgICB9O1xufVxuZXhwb3J0cy5kZHNGaWx0ZXIgPSBkZHNGaWx0ZXI7XG5mdW5jdGlvbiBkZHNVbmlxdWUoZGlyZWN0aW9uLCBpc0VxdWFsKSB7XG4gICAgbGV0IGxhc3REb3duO1xuICAgIGxldCBsYXN0VXA7XG4gICAgbGV0IHByaW1lZFVwID0gZmFsc2U7XG4gICAgbGV0IHByaW1lZERvd24gPSBmYWxzZTtcbiAgICByZXR1cm4ge1xuICAgICAgICBuYW1lOiAnZmlsdGVyJyxcbiAgICAgICAgb3BlcmF0aW9uVHlwZTogb3BlcmF0b3JfbW9kZWxfanNfMS5PcGVyYXRpb25UeXBlLkZJTFRFUixcbiAgICAgICAgb3BlcmF0aW9uRG93bjogKHYpID0+IHtcbiAgICAgICAgICAgIGlmIChkaXJlY3Rpb24gPT09IHVuZGVmaW5lZCB8fCBkaXJlY3Rpb24gPT09IERhdGFGbG93Qm90aC5ET1dOU1RSRUFNIHx8IGRpcmVjdGlvbiA9PT0gRGF0YUZsb3dCb3RoLkJPVEgpIHtcbiAgICAgICAgICAgICAgICBpZiAocHJpbWVkRG93biAmJiAoaXNFcXVhbCA/IGlzRXF1YWwobGFzdERvd24sIHYpIDogdiA9PT0gbGFzdERvd24pKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHByaW1lZERvd24gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBsYXN0RG93biA9IHY7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBvcGVyYXRpb25VcDogKHYpID0+IHtcbiAgICAgICAgICAgIGlmIChkaXJlY3Rpb24gPT09IHVuZGVmaW5lZCB8fCBkaXJlY3Rpb24gPT09IERhdGFGbG93Qm90aC5VUFNUUkVBTSB8fCBkaXJlY3Rpb24gPT09IERhdGFGbG93Qm90aC5CT1RIKSB7XG4gICAgICAgICAgICAgICAgaWYgKHByaW1lZFVwICYmIChpc0VxdWFsID8gaXNFcXVhbChsYXN0VXAsIHYpIDogdiA9PT0gbGFzdFVwKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsYXN0VXAgPSB2O1xuICAgICAgICAgICAgICAgICAgICBwcmltZWRVcCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbn1cbmV4cG9ydHMuZGRzVW5pcXVlID0gZGRzVW5pcXVlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZHVwbGV4X2RhdGFfc291cmNlX29wZXJhdG9ycy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMudHdlZW5FbWl0dGVyID0gZXhwb3J0cy5hbmltYXRlID0gZXhwb3J0cy53aW5kb3dTaXplRW1pdHRlciA9IGV4cG9ydHMudXJsSGFzaEVtaXR0ZXIgPSBleHBvcnRzLmludGVydmFsRW1pdHRlciA9IHZvaWQgMDtcbmNvbnN0IGRhdGFfc291cmNlX2pzXzEgPSByZXF1aXJlKFwiLi9kYXRhX3NvdXJjZS5qc1wiKTtcbmNvbnN0IHN0cmVhbV9qc18xID0gcmVxdWlyZShcIi4vc3RyZWFtLmpzXCIpO1xuY29uc3QgZHVwbGV4X2RhdGFfc291cmNlX2pzXzEgPSByZXF1aXJlKFwiLi9kdXBsZXhfZGF0YV9zb3VyY2UuanNcIik7XG5jb25zdCBjYW5jZWxsYXRpb25fdG9rZW5fanNfMSA9IHJlcXVpcmUoXCIuLi91dGlsaXRpZXMvY2FuY2VsbGF0aW9uX3Rva2VuLmpzXCIpO1xuY29uc3QgZGF0YV9zb3VyY2Vfb3BlcmF0b3JzX2pzXzEgPSByZXF1aXJlKFwiLi9kYXRhX3NvdXJjZV9vcGVyYXRvcnMuanNcIik7XG4vKipcbiAqIENvbnZlbmllbmNlIGZ1bmN0aW9uIHRvIHVwZGF0ZSBhIHN0cmVhbSBhdCBmaXhlZCBpbnRlcnZhbHNcbiAqL1xuZnVuY3Rpb24gaW50ZXJ2YWxFbWl0dGVyKHRhcmdldCwgaW50ZXJ2YWwsIHZhbHVlLCBjYW5jZWxsYXRpb25Ub2tlbikge1xuICAgIChjYW5jZWxsYXRpb25Ub2tlbiAhPT0gbnVsbCAmJiBjYW5jZWxsYXRpb25Ub2tlbiAhPT0gdm9pZCAwID8gY2FuY2VsbGF0aW9uVG9rZW4gOiBuZXcgY2FuY2VsbGF0aW9uX3Rva2VuX2pzXzEuQ2FuY2VsbGF0aW9uVG9rZW4oKSkuc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICB1cGRhdGVTb3VyY2UodGFyZ2V0LCB2YWx1ZSk7XG4gICAgfSwgaW50ZXJ2YWwpO1xufVxuZXhwb3J0cy5pbnRlcnZhbEVtaXR0ZXIgPSBpbnRlcnZhbEVtaXR0ZXI7XG5mdW5jdGlvbiB1cGRhdGVTb3VyY2UodGFyZ2V0LCB2YWx1ZSkge1xuICAgIGlmICh0YXJnZXQgaW5zdGFuY2VvZiBkYXRhX3NvdXJjZV9qc18xLkFycmF5RGF0YVNvdXJjZSkge1xuICAgICAgICB0YXJnZXQucHVzaCh2YWx1ZSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHRhcmdldCBpbnN0YW5jZW9mIGR1cGxleF9kYXRhX3NvdXJjZV9qc18xLkR1cGxleERhdGFTb3VyY2UpIHtcbiAgICAgICAgdGFyZ2V0LnVwZGF0ZURvd25zdHJlYW0odmFsdWUpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGFyZ2V0LnVwZGF0ZSh2YWx1ZSk7XG4gICAgfVxufVxuZnVuY3Rpb24gdXJsSGFzaEVtaXR0ZXIodGFyZ2V0LCBzdHJpcEluSGFzaFBhcmFtZXRlcnMgPSBmYWxzZSwgY2FuY2VsbGF0aW9uVG9rZW4pIHtcbiAgICB1cGRhdGVTb3VyY2UodGFyZ2V0LCBzdHJpcEluSGFzaFBhcmFtZXRlcnMgPyBnZXRVcmxIYXNoKCkgOiBsb2NhdGlvbi5oYXNoKTtcbiAgICAoY2FuY2VsbGF0aW9uVG9rZW4gIT09IG51bGwgJiYgY2FuY2VsbGF0aW9uVG9rZW4gIT09IHZvaWQgMCA/IGNhbmNlbGxhdGlvblRva2VuIDogbmV3IGNhbmNlbGxhdGlvbl90b2tlbl9qc18xLkNhbmNlbGxhdGlvblRva2VuKCkpLnJlZ2lzdGVyRG9tRXZlbnQod2luZG93LCAnaGFzaGNoYW5nZScsICgpID0+IHtcbiAgICAgICAgdXBkYXRlU291cmNlKHRhcmdldCwgc3RyaXBJbkhhc2hQYXJhbWV0ZXJzID8gZ2V0VXJsSGFzaCgpIDogbG9jYXRpb24uaGFzaCk7XG4gICAgfSk7XG59XG5leHBvcnRzLnVybEhhc2hFbWl0dGVyID0gdXJsSGFzaEVtaXR0ZXI7XG5mdW5jdGlvbiBnZXRVcmxIYXNoKCkge1xuICAgIGNvbnN0IGhhc2ggPSBsb2NhdGlvbi5oYXNoLnN1YnN0cmluZygxKTtcbiAgICBpZiAoaGFzaC5pbmNsdWRlcygnPycpKSB7XG4gICAgICAgIHJldHVybiBoYXNoLnN1YnN0cmluZygwLCBoYXNoLmluZGV4T2YoJz8nKSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGhhc2guaW5jbHVkZXMoJyMnKSkge1xuICAgICAgICByZXR1cm4gaGFzaC5zdWJzdHJpbmcoMCwgaGFzaC5pbmRleE9mKCcjJykpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGhhc2g7XG4gICAgfVxufVxuLyoqXG4gKiBDb252ZW5pZW5jZSBmdW5jdGlvbiB0byBzdHJlYW0gdGhlIHdpbmRvdyBzaXplIHRvIGEgZGF0YSBzb3VyY2VcbiAqL1xuZnVuY3Rpb24gd2luZG93U2l6ZUVtaXR0ZXIodGFyZ2V0LCBkZWJvdW5jZSA9IDEwMCwgY2FuY2VsbGF0aW9uVG9rZW4pIHtcbiAgICBjYW5jZWxsYXRpb25Ub2tlbiAhPT0gbnVsbCAmJiBjYW5jZWxsYXRpb25Ub2tlbiAhPT0gdm9pZCAwID8gY2FuY2VsbGF0aW9uVG9rZW4gOiAoY2FuY2VsbGF0aW9uVG9rZW4gPSBuZXcgY2FuY2VsbGF0aW9uX3Rva2VuX2pzXzEuQ2FuY2VsbGF0aW9uVG9rZW4oKSk7XG4gICAgY29uc3QgdXBkYXRlU3RyZWFtID0gbmV3IGRhdGFfc291cmNlX2pzXzEuRGF0YVNvdXJjZSgpO1xuICAgIGNhbmNlbGxhdGlvblRva2VuLnJlZ2lzdGVyRG9tRXZlbnQod2luZG93LCAncmVzaXplJywgKCkgPT4ge1xuICAgICAgICB1cGRhdGVTdHJlYW0udXBkYXRlKCk7XG4gICAgfSk7XG4gICAgdGFyZ2V0LmFzc2lnbih7XG4gICAgICAgIHdpZHRoOiB3aW5kb3cuaW5uZXJXaWR0aCxcbiAgICAgICAgaGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHRcbiAgICB9KTtcbiAgICB1cGRhdGVTdHJlYW0udHJhbnNmb3JtKCgwLCBkYXRhX3NvdXJjZV9vcGVyYXRvcnNfanNfMS5kc0RlYm91bmNlKShkZWJvdW5jZSksICgwLCBkYXRhX3NvdXJjZV9vcGVyYXRvcnNfanNfMS5kc1RhcCkoKCkgPT4gdGFyZ2V0LmFzc2lnbih7XG4gICAgICAgIHdpZHRoOiB3aW5kb3cuaW5uZXJXaWR0aCxcbiAgICAgICAgaGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHRcbiAgICB9KSkpO1xufVxuZXhwb3J0cy53aW5kb3dTaXplRW1pdHRlciA9IHdpbmRvd1NpemVFbWl0dGVyO1xuLyoqXG4gKiBDYWxscyB0aGUgY2FsbGJhY2sgZXZlcnkgYW5pbWF0aW9uIGZyYW1lIHdpdGggYSBudW1iZXIgZnJvbSAwIHRvIDEgaW5kaWNhdGluZyBob3cgZmFyIGFsb25nIGluIHRoZSBhbmltYXRpb24gdGltZWxpbmUgaXQgaXMuXG4gKlxuICovXG5mdW5jdGlvbiBhbmltYXRlKGNiLCB0aW1lLCBjYW5jZWxsYXRpb25Ub2tlbikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICBjb25zdCBhbmltYXRpb25Ub2tlbiA9IG5ldyBjYW5jZWxsYXRpb25fdG9rZW5fanNfMS5DYW5jZWxsYXRpb25Ub2tlbigpO1xuICAgICAgICBpZiAoY2FuY2VsbGF0aW9uVG9rZW4pIHtcbiAgICAgICAgICAgIGNhbmNlbGxhdGlvblRva2VuLmNoYWluKGFuaW1hdGlvblRva2VuKTtcbiAgICAgICAgfVxuICAgICAgICBhbmltYXRpb25Ub2tlbi5hZGRDYW5jZWxhYmxlKHJlc29sdmUpO1xuICAgICAgICBsZXQgc3RhcnQgPSBEYXRlLm5vdygpO1xuICAgICAgICAoMCwgY2FuY2VsbGF0aW9uX3Rva2VuX2pzXzEucmVnaXN0ZXJBbmltYXRpb25Mb29wKSgoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwcm9ncmVzcyA9IE1hdGgubWluKDEsIChEYXRlLm5vdygpIC0gc3RhcnQpIC8gdGltZSk7XG4gICAgICAgICAgICBjYihwcm9ncmVzcyk7XG4gICAgICAgICAgICBpZiAocHJvZ3Jlc3MgPT09IDEpIHtcbiAgICAgICAgICAgICAgICBhbmltYXRpb25Ub2tlbi5jYW5jZWwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgYW5pbWF0aW9uVG9rZW4pO1xuICAgIH0pO1xufVxuZXhwb3J0cy5hbmltYXRlID0gYW5pbWF0ZTtcbi8qKlxuICogQ29udmVuaWVuY2UgZnVuY3Rpb24gdG8gc3RyZWFtIGFuaW1hdGUgdG8gYSBkYXRhc291cmNlXG4gKi9cbmZ1bmN0aW9uIHR3ZWVuRW1pdHRlcih0YXJnZXQsIGR1cmF0aW9uLCBzdGFydFZhbHVlLCBlbmRWYWx1ZSwgaW50ZXJwb2xhdGlvbiwgY2FuY2VsbGF0aW9uVG9rZW4pIHtcbiAgICBpZiAodGFyZ2V0IGluc3RhbmNlb2YgZGF0YV9zb3VyY2VfanNfMS5EYXRhU291cmNlIHx8IHRhcmdldCBpbnN0YW5jZW9mIGR1cGxleF9kYXRhX3NvdXJjZV9qc18xLkR1cGxleERhdGFTb3VyY2UgfHwgdGFyZ2V0IGluc3RhbmNlb2Ygc3RyZWFtX2pzXzEuU3RyZWFtKSB7XG4gICAgICAgIGlmIChzdGFydFZhbHVlID09PSBlbmRWYWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMpID0+IHNldFRpbWVvdXQocmVzLCBkdXJhdGlvbikpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBhbmltYXRlKChwcm9ncmVzcykgPT4ge1xuICAgICAgICBpZiAoaW50ZXJwb2xhdGlvbikge1xuICAgICAgICAgICAgcHJvZ3Jlc3MgPSBpbnRlcnBvbGF0aW9uKHByb2dyZXNzKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB2YWx1ZSA9IHN0YXJ0VmFsdWUgKyAoZW5kVmFsdWUgLSBzdGFydFZhbHVlKSAqIHByb2dyZXNzO1xuICAgICAgICBpZiAodGFyZ2V0IGluc3RhbmNlb2YgZGF0YV9zb3VyY2VfanNfMS5BcnJheURhdGFTb3VyY2UpIHtcbiAgICAgICAgICAgIHRhcmdldC5wdXNoKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0YXJnZXQgaW5zdGFuY2VvZiBkdXBsZXhfZGF0YV9zb3VyY2VfanNfMS5EdXBsZXhEYXRhU291cmNlKSB7XG4gICAgICAgICAgICB0YXJnZXQudXBkYXRlRG93bnN0cmVhbSh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0YXJnZXQudXBkYXRlKHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH0sIGR1cmF0aW9uLCBjYW5jZWxsYXRpb25Ub2tlbik7XG59XG5leHBvcnRzLnR3ZWVuRW1pdHRlciA9IHR3ZWVuRW1pdHRlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWVtaXR0ZXJzLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5PYmplY3REYXRhU291cmNlID0gdm9pZCAwO1xuY29uc3QgYXVydW1fc2VydmVyX2NsaWVudF9qc18xID0gcmVxdWlyZShcIi4uL2F1cnVtX3NlcnZlci9hdXJ1bV9zZXJ2ZXJfY2xpZW50LmpzXCIpO1xuY29uc3QgZXZlbnRfZW1pdHRlcl9qc18xID0gcmVxdWlyZShcIi4uL3V0aWxpdGllcy9ldmVudF9lbWl0dGVyLmpzXCIpO1xuY29uc3QgZGF0YV9zb3VyY2VfanNfMSA9IHJlcXVpcmUoXCIuL2RhdGFfc291cmNlLmpzXCIpO1xuY29uc3QgZHVwbGV4X2RhdGFfc291cmNlX2pzXzEgPSByZXF1aXJlKFwiLi9kdXBsZXhfZGF0YV9zb3VyY2UuanNcIik7XG5jbGFzcyBPYmplY3REYXRhU291cmNlIHtcbiAgICBjb25zdHJ1Y3Rvcihpbml0aWFsRGF0YSkge1xuICAgICAgICB0aGlzLmRhdGEgPSBpbml0aWFsRGF0YTtcbiAgICAgICAgdGhpcy51cGRhdGVFdmVudCA9IG5ldyBldmVudF9lbWl0dGVyX2pzXzEuRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIHRoaXMudXBkYXRlRXZlbnRPbktleSA9IG5ldyBNYXAoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ29ubmVjdHMgdG8gYW4gYXVydW0tc2VydmVyIGV4cG9zZWQgb2JqZWN0IGRhdGFzb3VyY2UuIFZpZXcgaHR0cHM6Ly9naXRodWIuY29tL0N5YmVyUGhvZW5peDkwL2F1cnVtLXNlcnZlciBmb3IgbW9yZSBpbmZvcm1hdGlvblxuICAgICAqIE5vdGUgdGhhdCB0eXBlIHNhZmV0eSBpcyBub3QgZ3VhcmFudGVlZC4gV2hhdGV2ZXIgdGhlIHNlcnZlciBzZW5kcyBhcyBhbiB1cGRhdGUgd2lsbCBiZSBwcm9wYWdhdGVkLiBNYWtlIHN1cmUgeW91IHRydXN0IHRoZSBzZXJ2ZXJcbiAgICAgKiBAcGFyYW0gIHtBdXJ1bVNlcnZlckluZm99IGF1cnVtU2VydmVySW5mb1xuICAgICAqIEByZXR1cm5zIERhdGFTb3VyY2VcbiAgICAgKi9cbiAgICBzdGF0aWMgZnJvbVJlbW90ZVNvdXJjZShhdXJ1bVNlcnZlckluZm8sIGNhbmNlbGxhdGlvbikge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBuZXcgT2JqZWN0RGF0YVNvdXJjZSh1bmRlZmluZWQpO1xuICAgICAgICAoMCwgYXVydW1fc2VydmVyX2NsaWVudF9qc18xLnN5bmNPYmplY3REYXRhU291cmNlKShyZXN1bHQsIGF1cnVtU2VydmVySW5mbywgY2FuY2VsbGF0aW9uKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgc3RhdGljIHRvT2JqZWN0RGF0YVNvdXJjZSh2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBPYmplY3REYXRhU291cmNlKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IE9iamVjdERhdGFTb3VyY2UodmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHRvU3RyaW5nKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlbW92ZSBhbGwgbGlzdGVuZXJzXG4gICAgICovXG4gICAgY2FuY2VsQWxsKCkge1xuICAgICAgICB0aGlzLnVwZGF0ZUV2ZW50LmNhbmNlbEFsbCgpO1xuICAgICAgICB0aGlzLnVwZGF0ZUV2ZW50T25LZXkuZm9yRWFjaCgodikgPT4gdi5jYW5jZWxBbGwoKSk7XG4gICAgfVxuICAgIHBpY2tPYmplY3Qoa2V5LCBjYW5jZWxsYXRpb25Ub2tlbikge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMuZGF0YVtrZXldID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgY29uc3Qgc3ViRGF0YVNvdXJjZSA9IG5ldyBPYmplY3REYXRhU291cmNlKHRoaXMuZGF0YVtrZXldKTtcbiAgICAgICAgICAgIHN1YkRhdGFTb3VyY2UubGlzdGVuKChjaGFuZ2UpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoY2hhbmdlLmRlbGV0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuZGF0YVtrZXldW2NoYW5nZS5rZXldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXQoa2V5KVtjaGFuZ2Uua2V5XSA9IGNoYW5nZS5uZXdWYWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBjYW5jZWxsYXRpb25Ub2tlbik7XG4gICAgICAgICAgICB0aGlzLmxpc3Rlbk9uS2V5KGtleSwgKHYpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHYubmV3VmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2Lm5ld1ZhbHVlICE9PSBzdWJEYXRhU291cmNlLmRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YkRhdGFTb3VyY2UubWVyZ2Uodi5uZXdWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHN1YkRhdGFTb3VyY2UuY2xlYXIoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBzdWJEYXRhU291cmNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgcGljayBhIG5vbiBvYmplY3Qga2V5Jyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcGlja0FycmF5KGtleSwgY2FuY2VsbGF0aW9uVG9rZW4pIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLmRhdGFba2V5XSkpIHtcbiAgICAgICAgICAgIGNvbnN0IHN1YkRhdGFTb3VyY2UgPSBuZXcgZGF0YV9zb3VyY2VfanNfMS5BcnJheURhdGFTb3VyY2UoKF9hID0gdGhpcy5kYXRhKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Fba2V5XSk7XG4gICAgICAgICAgICBzdWJEYXRhU291cmNlLmxpc3RlbigoY2hhbmdlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXQoa2V5LCBjaGFuZ2UubmV3U3RhdGUpO1xuICAgICAgICAgICAgfSwgY2FuY2VsbGF0aW9uVG9rZW4pO1xuICAgICAgICAgICAgdGhpcy5saXN0ZW5PbktleShrZXksICh2KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodi5uZXdWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHYubmV3VmFsdWUubGVuZ3RoICE9PSBzdWJEYXRhU291cmNlLmxlbmd0aC52YWx1ZSB8fCAhc3ViRGF0YVNvdXJjZS5nZXREYXRhKCkuZXZlcnkoKGl0ZW0sIGluZGV4KSA9PiB2Lm5ld1ZhbHVlW2luZGV4XSA9PT0gaXRlbSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YkRhdGFTb3VyY2UubWVyZ2Uodi5uZXdWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHN1YkRhdGFTb3VyY2UuY2xlYXIoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBzdWJEYXRhU291cmNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgcGljayBhIG5vbiBhcnJheSBrZXknKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgZGF0YXNvdXJjZSBmb3IgYSBzaW5nbGUga2V5IG9mIHRoZSBvYmplY3RcbiAgICAgKiBAcGFyYW0ga2V5XG4gICAgICogQHBhcmFtIGNhbmNlbGxhdGlvblRva2VuXG4gICAgICovXG4gICAgcGljayhrZXksIGNhbmNlbGxhdGlvblRva2VuKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgY29uc3Qgc3ViRGF0YVNvdXJjZSA9IG5ldyBkYXRhX3NvdXJjZV9qc18xLkRhdGFTb3VyY2UoKF9hID0gdGhpcy5kYXRhKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Fba2V5XSk7XG4gICAgICAgIHN1YkRhdGFTb3VyY2UubGlzdGVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2V0KGtleSwgc3ViRGF0YVNvdXJjZS52YWx1ZSk7XG4gICAgICAgIH0sIGNhbmNlbGxhdGlvblRva2VuKTtcbiAgICAgICAgdGhpcy5saXN0ZW5PbktleShrZXksICh2KSA9PiB7XG4gICAgICAgICAgICBpZiAoc3ViRGF0YVNvdXJjZS52YWx1ZSAhPT0gdi5uZXdWYWx1ZSkge1xuICAgICAgICAgICAgICAgIHN1YkRhdGFTb3VyY2UudXBkYXRlKHYubmV3VmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBjYW5jZWxsYXRpb25Ub2tlbik7XG4gICAgICAgIHJldHVybiBzdWJEYXRhU291cmNlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgZHVwbGV4ZGF0YXNvdXJjZSBmb3IgYSBzaW5nbGUga2V5IG9mIHRoZSBvYmplY3RcbiAgICAgKiBAcGFyYW0ga2V5XG4gICAgICogQHBhcmFtIGNhbmNlbGxhdGlvblRva2VuXG4gICAgICovXG4gICAgcGlja0R1cGxleChrZXksIGNhbmNlbGxhdGlvblRva2VuKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgY29uc3Qgc3ViRGF0YVNvdXJjZSA9IG5ldyBkdXBsZXhfZGF0YV9zb3VyY2VfanNfMS5EdXBsZXhEYXRhU291cmNlKChfYSA9IHRoaXMuZGF0YSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hW2tleV0pO1xuICAgICAgICBzdWJEYXRhU291cmNlLmxpc3RlblVwc3RyZWFtKCh2KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldChrZXksIHYpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5saXN0ZW5PbktleShrZXksICh2KSA9PiB7XG4gICAgICAgICAgICBpZiAoc3ViRGF0YVNvdXJjZS52YWx1ZSAhPT0gdi5uZXdWYWx1ZSkge1xuICAgICAgICAgICAgICAgIHN1YkRhdGFTb3VyY2UudXBkYXRlRG93bnN0cmVhbSh2Lm5ld1ZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgY2FuY2VsbGF0aW9uVG9rZW4pO1xuICAgICAgICByZXR1cm4gc3ViRGF0YVNvdXJjZTtcbiAgICB9XG4gICAgaGFzS2V5KGtleSkge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmhhc093blByb3BlcnR5KGtleSk7XG4gICAgfVxuICAgIGFwcGx5T2JqZWN0Q2hhbmdlKGNoYW5nZSkge1xuICAgICAgICBpZiAoY2hhbmdlLmRlbGV0ZWQgJiYgdGhpcy5oYXNLZXkoY2hhbmdlLmtleSkpIHtcbiAgICAgICAgICAgIHRoaXMuZGVsZXRlKGNoYW5nZS5rZXkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNoYW5nZS5uZXdWYWx1ZSAhPT0gdGhpcy5nZXQoY2hhbmdlLmtleSkpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0KGNoYW5nZS5rZXksIGNoYW5nZS5uZXdWYWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogTGlzdGVuIHRvIGNoYW5nZXMgb2YgdGhlIG9iamVjdFxuICAgICAqL1xuICAgIGxpc3RlbihjYWxsYmFjaywgY2FuY2VsbGF0aW9uVG9rZW4pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudXBkYXRlRXZlbnQuc3Vic2NyaWJlKGNhbGxiYWNrLCBjYW5jZWxsYXRpb25Ub2tlbikuY2FuY2VsO1xuICAgIH1cbiAgICBtYXAobWFwcGVyKSB7XG4gICAgICAgIGNvbnN0IHN0YXRlTWFwID0gbmV3IE1hcCgpO1xuICAgICAgICBjb25zdCByZXN1bHQgPSBuZXcgZGF0YV9zb3VyY2VfanNfMS5BcnJheURhdGFTb3VyY2UoKTtcbiAgICAgICAgdGhpcy5saXN0ZW5BbmRSZXBlYXQoKGNoYW5nZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGNoYW5nZS5kZWxldGVkICYmIHN0YXRlTWFwLmhhcyhjaGFuZ2Uua2V5KSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBzdGF0ZU1hcC5nZXQoY2hhbmdlLmtleSk7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnJlbW92ZShpdGVtKTtcbiAgICAgICAgICAgICAgICBzdGF0ZU1hcC5kZWxldGUoY2hhbmdlLmtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChzdGF0ZU1hcC5oYXMoY2hhbmdlLmtleSkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdJdGVtID0gbWFwcGVyKGNoYW5nZS5rZXksIGNoYW5nZS5uZXdWYWx1ZSk7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnJlcGxhY2Uoc3RhdGVNYXAuZ2V0KGNoYW5nZS5rZXkpLCBuZXdJdGVtKTtcbiAgICAgICAgICAgICAgICBzdGF0ZU1hcC5zZXQoY2hhbmdlLmtleSwgbmV3SXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICghc3RhdGVNYXAuaGFzKGNoYW5nZS5rZXkpICYmICFjaGFuZ2UuZGVsZXRlZCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld0l0ZW0gPSBtYXBwZXIoY2hhbmdlLmtleSwgY2hhbmdlLm5ld1ZhbHVlKTtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChuZXdJdGVtKTtcbiAgICAgICAgICAgICAgICBzdGF0ZU1hcC5zZXQoY2hhbmdlLmtleSwgbmV3SXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTYW1lIGFzIGxpc3RlbiBidXQgd2lsbCBpbW1lZGlhdGVseSBjYWxsIHRoZSBjYWxsYmFjayB3aXRoIHRoZSBjdXJyZW50IHZhbHVlIG9mIGVhY2gga2V5XG4gICAgICovXG4gICAgbGlzdGVuQW5kUmVwZWF0KGNhbGxiYWNrLCBjYW5jZWxsYXRpb25Ub2tlbikge1xuICAgICAgICBjb25zdCBjID0gdGhpcy51cGRhdGVFdmVudC5zdWJzY3JpYmUoY2FsbGJhY2ssIGNhbmNlbGxhdGlvblRva2VuKS5jYW5jZWw7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuZGF0YSkge1xuICAgICAgICAgICAgY2FsbGJhY2soe1xuICAgICAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgICAgICBuZXdWYWx1ZTogdGhpcy5kYXRhW2tleV0sXG4gICAgICAgICAgICAgICAgb2xkVmFsdWU6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBkZWxldGVkOiBmYWxzZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNhbWUgYXMgbGlzdGVuT25LZXkgYnV0IHdpbGwgaW1tZWRpYXRlbHkgY2FsbCB0aGUgY2FsbGJhY2sgd2l0aCB0aGUgY3VycmVudCB2YWx1ZSBmaXJzdFxuICAgICAqL1xuICAgIGxpc3Rlbk9uS2V5QW5kUmVwZWF0KGtleSwgY2FsbGJhY2ssIGNhbmNlbGxhdGlvblRva2VuKSB7XG4gICAgICAgIGNhbGxiYWNrKHtcbiAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgIG5ld1ZhbHVlOiB0aGlzLmRhdGFba2V5XSxcbiAgICAgICAgICAgIG9sZFZhbHVlOiB1bmRlZmluZWRcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzLmxpc3Rlbk9uS2V5KGtleSwgY2FsbGJhY2ssIGNhbmNlbGxhdGlvblRva2VuKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTGlzdGVuIHRvIGNoYW5nZXMgb2YgYSBzaW5nbGUga2V5IG9mIHRoZSBvYmplY3RcbiAgICAgKi9cbiAgICBsaXN0ZW5PbktleShrZXksIGNhbGxiYWNrLCBjYW5jZWxsYXRpb25Ub2tlbikge1xuICAgICAgICBpZiAoIXRoaXMudXBkYXRlRXZlbnRPbktleS5oYXMoa2V5KSkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVFdmVudE9uS2V5LnNldChrZXksIG5ldyBldmVudF9lbWl0dGVyX2pzXzEuRXZlbnRFbWl0dGVyKCkpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGV2ZW50ID0gdGhpcy51cGRhdGVFdmVudE9uS2V5LmdldChrZXkpO1xuICAgICAgICByZXR1cm4gZXZlbnQuc3Vic2NyaWJlKGNhbGxiYWNrLCBjYW5jZWxsYXRpb25Ub2tlbikuY2FuY2VsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFsbCB0aGUga2V5cyBvZiB0aGUgb2JqZWN0IGluIHRoZSBzb3VyY2VcbiAgICAgKi9cbiAgICBrZXlzKCkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcy5kYXRhKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbGwgdGhlIHZhbHVlcyBvZiB0aGUgb2JqZWN0IGluIHRoZSBzb3VyY2VcbiAgICAgKi9cbiAgICB2YWx1ZXMoKSB7XG4gICAgICAgIHJldHVybiBPYmplY3QudmFsdWVzKHRoaXMuZGF0YSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIGdldCB0aGUgY3VycmVudCB2YWx1ZSBvZiBhIGtleSBvZiB0aGUgb2JqZWN0XG4gICAgICogQHBhcmFtIGtleVxuICAgICAqL1xuICAgIGdldChrZXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YVtrZXldO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBkZWxldGUgYSBrZXkgZnJvbSB0aGUgb2JqZWN0XG4gICAgICogQHBhcmFtIGtleVxuICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAqL1xuICAgIGRlbGV0ZShrZXkpIHtcbiAgICAgICAgaWYgKHRoaXMuaGFzS2V5KGtleSkpIHtcbiAgICAgICAgICAgIGNvbnN0IG9sZCA9IHRoaXMuZGF0YVtrZXldO1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuZGF0YVtrZXldO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVFdmVudC5maXJlKHsgb2xkVmFsdWU6IG9sZCwga2V5LCBuZXdWYWx1ZTogdW5kZWZpbmVkLCBkZWxldGVkOiB0cnVlIH0pO1xuICAgICAgICAgICAgaWYgKHRoaXMudXBkYXRlRXZlbnRPbktleS5oYXMoa2V5KSkge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlRXZlbnRPbktleS5nZXQoa2V5KS5maXJlKHsgb2xkVmFsdWU6IG9sZCwga2V5LCBuZXdWYWx1ZTogdW5kZWZpbmVkIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIHNldCB0aGUgdmFsdWUgZm9yIGEga2V5IG9mIHRoZSBvYmplY3RcbiAgICAgKiBAcGFyYW0ga2V5XG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICovXG4gICAgc2V0KGtleSwgdmFsdWUpIHtcbiAgICAgICAgaWYgKHRoaXMuZGF0YVtrZXldID09PSB2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG9sZCA9IHRoaXMuZGF0YVtrZXldO1xuICAgICAgICB0aGlzLmRhdGFba2V5XSA9IHZhbHVlO1xuICAgICAgICB0aGlzLnVwZGF0ZUV2ZW50LmZpcmUoeyBvbGRWYWx1ZTogb2xkLCBrZXksIG5ld1ZhbHVlOiB0aGlzLmRhdGFba2V5XSB9KTtcbiAgICAgICAgaWYgKHRoaXMudXBkYXRlRXZlbnRPbktleS5oYXMoa2V5KSkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVFdmVudE9uS2V5LmdldChrZXkpLmZpcmUoeyBvbGRWYWx1ZTogb2xkLCBrZXksIG5ld1ZhbHVlOiB0aGlzLmRhdGFba2V5XSB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBNZXJnZSB0aGUga2V5IHZhbHVlIHBhaXJzIG9mIGFuIG9iamVjdCBpbnRvIHRoaXMgb2JqZWN0IG5vbiByZWN1cnNpdmVseVxuICAgICAqIEBwYXJhbSBuZXdEYXRhXG4gICAgICovXG4gICAgYXNzaWduKG5ld0RhdGEpIHtcbiAgICAgICAgaWYgKG5ld0RhdGEgaW5zdGFuY2VvZiBPYmplY3REYXRhU291cmNlKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBuZXdEYXRhLmtleXMoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0KGtleSwgbmV3RGF0YS5kYXRhW2tleV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMobmV3RGF0YSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldChrZXksIG5ld0RhdGFba2V5XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogTWVyZ2UgdGhlIGtleSB2YWx1ZSBwYWlycyBvZiBhbiBvYmplY3QgaW50byB0aGlzIG9iamVjdCBub24gcmVjdXJzaXZlbHkgYW5kIGRlbGV0ZSBwcm9wZXJ0aWVzIHRoYXQgZG8gbm90IGV4aXN0IGluIHRoZSBuZXdEYXRhXG4gICAgICogQHBhcmFtIG5ld0RhdGFcbiAgICAgKi9cbiAgICBtZXJnZShuZXdEYXRhKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgY29uc3Qga2V5cyA9IG5ldyBTZXQoT2JqZWN0LmtleXMoKF9hID0gdGhpcy5kYXRhKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiB7fSkpO1xuICAgICAgICBpZiAobmV3RGF0YSBpbnN0YW5jZW9mIE9iamVjdERhdGFTb3VyY2UpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IG9mIG5ld0RhdGEua2V5cygpKSB7XG4gICAgICAgICAgICAgICAga2V5cy5kZWxldGUoa2V5KTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldChrZXksIG5ld0RhdGEuZGF0YVtrZXldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKG5ld0RhdGEpKSB7XG4gICAgICAgICAgICAgICAga2V5cy5kZWxldGUoa2V5KTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldChrZXksIG5ld0RhdGFba2V5XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBrZXkgb2Yga2V5cykge1xuICAgICAgICAgICAgdGhpcy5kZWxldGUoa2V5KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBEZWxldGVzIGFsbCBrZXlzXG4gICAgICovXG4gICAgY2xlYXIoKSB7XG4gICAgICAgIGlmICh0aGlzLmRhdGEgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5kYXRhKSB7XG4gICAgICAgICAgICB0aGlzLmRlbGV0ZShrZXkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldERhdGEoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGE7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBzaGFsbG93IGNvcHkgb2YgdGhlIG9iamVjdFxuICAgICAqL1xuICAgIHRvT2JqZWN0KCkge1xuICAgICAgICByZXR1cm4geyAuLi50aGlzLmRhdGEgfTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIHNpbXBsaWZpZWQgdmVyc2lvbiBvZiB0aGlzIGRhdGFzb3VyY2VcbiAgICAgKi9cbiAgICB0b0RhdGFTb3VyY2UoKSB7XG4gICAgICAgIGNvbnN0IHN0cmVhbSA9IG5ldyBkYXRhX3NvdXJjZV9qc18xLkRhdGFTb3VyY2UodGhpcy5kYXRhKTtcbiAgICAgICAgdGhpcy5saXN0ZW4oKHMpID0+IHtcbiAgICAgICAgICAgIHN0cmVhbS51cGRhdGUodGhpcy5kYXRhKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBzdHJlYW07XG4gICAgfVxufVxuZXhwb3J0cy5PYmplY3REYXRhU291cmNlID0gT2JqZWN0RGF0YVNvdXJjZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW9iamVjdF9kYXRhX3NvdXJjZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuT3BlcmF0aW9uVHlwZSA9IHZvaWQgMDtcbnZhciBPcGVyYXRpb25UeXBlO1xuKGZ1bmN0aW9uIChPcGVyYXRpb25UeXBlKSB7XG4gICAgT3BlcmF0aW9uVHlwZVtPcGVyYXRpb25UeXBlW1wiRklMVEVSXCJdID0gMF0gPSBcIkZJTFRFUlwiO1xuICAgIE9wZXJhdGlvblR5cGVbT3BlcmF0aW9uVHlwZVtcIk5PT1BcIl0gPSAxXSA9IFwiTk9PUFwiO1xuICAgIE9wZXJhdGlvblR5cGVbT3BlcmF0aW9uVHlwZVtcIk1BUFwiXSA9IDJdID0gXCJNQVBcIjtcbiAgICBPcGVyYXRpb25UeXBlW09wZXJhdGlvblR5cGVbXCJERUxBWVwiXSA9IDNdID0gXCJERUxBWVwiO1xuICAgIE9wZXJhdGlvblR5cGVbT3BlcmF0aW9uVHlwZVtcIk1BUF9ERUxBWVwiXSA9IDRdID0gXCJNQVBfREVMQVlcIjtcbiAgICBPcGVyYXRpb25UeXBlW09wZXJhdGlvblR5cGVbXCJERUxBWV9GSUxURVJcIl0gPSA1XSA9IFwiREVMQVlfRklMVEVSXCI7XG4gICAgT3BlcmF0aW9uVHlwZVtPcGVyYXRpb25UeXBlW1wiTUFQX0RFTEFZX0ZJTFRFUlwiXSA9IDZdID0gXCJNQVBfREVMQVlfRklMVEVSXCI7XG59KShPcGVyYXRpb25UeXBlID0gZXhwb3J0cy5PcGVyYXRpb25UeXBlIHx8IChleHBvcnRzLk9wZXJhdGlvblR5cGUgPSB7fSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9b3BlcmF0b3JfbW9kZWwuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlN0cmVhbSA9IHZvaWQgMDtcbmNvbnN0IGNhbmNlbGxhdGlvbl90b2tlbl9qc18xID0gcmVxdWlyZShcIi4uL3V0aWxpdGllcy9jYW5jZWxsYXRpb25fdG9rZW4uanNcIik7XG5jb25zdCBkYXRhX3NvdXJjZV9qc18xID0gcmVxdWlyZShcIi4vZGF0YV9zb3VyY2UuanNcIik7XG4vKipcbiAqIExldHMgeW91IGxvZ2ljYWxseSBjb21iaW5lIDIgZGF0YSBzb3VyY2VzIHNvIHRoYXQgdXBkYXRlIGNhbGxzIGdvIHRocm91Z2ggdGhlIGlucHV0IHNvdXJjZSBhbmQgbGlzdGVuIGdvZXMgdG8gdGhlIG91dHB1dCBzb3VyY2VcbiAqL1xuY2xhc3MgU3RyZWFtIHtcbiAgICBjb25zdHJ1Y3RvcigpIHsgfVxuICAgIGdldCBuYW1lKCkge1xuICAgICAgICByZXR1cm4gYElOOiR7dGhpcy5pbnB1dC5uYW1lfSBPVVQ6JHt0aGlzLm91dHB1dC5uYW1lfWA7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRoZSBjdXJyZW50IHZhbHVlIG9mIHRoaXMgZGF0YSBzb3VyY2UsIGNhbiBiZSBjaGFuZ2VkIHRocm91Z2ggdXBkYXRlXG4gICAgICovXG4gICAgZ2V0IHZhbHVlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5vdXRwdXQudmFsdWU7XG4gICAgfVxuICAgIHN0YXRpYyBmcm9tRmV0Y2hSYXcodXJsKSB7XG4gICAgICAgIGNvbnN0IGlucHV0ID0gbmV3IGRhdGFfc291cmNlX2pzXzEuRGF0YVNvdXJjZSgpO1xuICAgICAgICBjb25zdCBvdXRwdXQgPSBuZXcgZGF0YV9zb3VyY2VfanNfMS5EYXRhU291cmNlKCk7XG4gICAgICAgIGlucHV0Lmxpc3RlbigodmFsdWUpID0+IHtcbiAgICAgICAgICAgIG91dHB1dC51cGRhdGUoZmV0Y2godXJsLCB2YWx1ZSkpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIFN0cmVhbS5mcm9tUHJlY29ubmVjdGVkU291cmNlcyhpbnB1dCwgb3V0cHV0KTtcbiAgICB9XG4gICAgc3RhdGljIGZyb21QcmVjb25uZWN0ZWRTb3VyY2VzKGlucHV0U291cmNlLCBvdXRwdXRTb3VyY2UpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gbmV3IFN0cmVhbSgpO1xuICAgICAgICByZXN1bHQuaW5wdXQgPSBpbnB1dFNvdXJjZSAhPT0gbnVsbCAmJiBpbnB1dFNvdXJjZSAhPT0gdm9pZCAwID8gaW5wdXRTb3VyY2UgOiBuZXcgZGF0YV9zb3VyY2VfanNfMS5EYXRhU291cmNlKCk7XG4gICAgICAgIHJlc3VsdC5vdXRwdXQgPSBvdXRwdXRTb3VyY2UgIT09IG51bGwgJiYgb3V0cHV0U291cmNlICE9PSB2b2lkIDAgPyBvdXRwdXRTb3VyY2UgOiByZXN1bHQuaW5wdXQ7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIGFnZ3JlZ2F0ZShvdGhlclNvdXJjZXMsIGNvbWJpbmF0b3IsIGNhbmNlbGxhdGlvblRva2VuKSB7XG4gICAgICAgIGNhbmNlbGxhdGlvblRva2VuID0gY2FuY2VsbGF0aW9uVG9rZW4gIT09IG51bGwgJiYgY2FuY2VsbGF0aW9uVG9rZW4gIT09IHZvaWQgMCA/IGNhbmNlbGxhdGlvblRva2VuIDogbmV3IGNhbmNlbGxhdGlvbl90b2tlbl9qc18xLkNhbmNlbGxhdGlvblRva2VuKCk7XG4gICAgICAgIGNvbnN0IGFnZ3JlZ2F0ZWRTb3VyY2UgPSBuZXcgZGF0YV9zb3VyY2VfanNfMS5EYXRhU291cmNlKGNvbWJpbmF0b3IodGhpcy52YWx1ZSwgLi4ub3RoZXJTb3VyY2VzLm1hcCgocykgPT4gcy52YWx1ZSkpKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvdGhlclNvdXJjZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIG90aGVyU291cmNlc1tpXS5saXN0ZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIGFnZ3JlZ2F0ZWRTb3VyY2UudXBkYXRlKGNvbWJpbmF0b3IodGhpcy52YWx1ZSwgLi4ub3RoZXJTb3VyY2VzLm1hcCgocykgPT4gcy52YWx1ZSkpKTtcbiAgICAgICAgICAgIH0sIGNhbmNlbGxhdGlvblRva2VuKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxpc3RlbigoKSA9PiBhZ2dyZWdhdGVkU291cmNlLnVwZGF0ZShjb21iaW5hdG9yKHRoaXMudmFsdWUsIC4uLm90aGVyU291cmNlcy5tYXAoKHMpID0+IHMudmFsdWUpKSksIGNhbmNlbGxhdGlvblRva2VuKTtcbiAgICAgICAgcmV0dXJuIGFnZ3JlZ2F0ZWRTb3VyY2U7XG4gICAgfVxuICAgIHN0YXRpYyBmcm9tU3RyZWFtVHJhbnNmb3JtYXRpb24ob3BlcmF0aW9uQSwgb3BlcmF0aW9uQiwgb3BlcmF0aW9uQywgb3BlcmF0aW9uRCwgb3BlcmF0aW9uRSwgb3BlcmF0aW9uRiwgb3BlcmF0aW9uRywgb3BlcmF0aW9uSCwgb3BlcmF0aW9uSSwgb3BlcmF0aW9uSikge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBuZXcgU3RyZWFtKCk7XG4gICAgICAgIHJlc3VsdC5pbnB1dCA9IG5ldyBkYXRhX3NvdXJjZV9qc18xLkRhdGFTb3VyY2UoKTtcbiAgICAgICAgcmVzdWx0Lm91dHB1dCA9IHJlc3VsdC5pbnB1dC50cmFuc2Zvcm0ob3BlcmF0aW9uQSwgb3BlcmF0aW9uQiwgb3BlcmF0aW9uQywgb3BlcmF0aW9uRCwgb3BlcmF0aW9uRSwgb3BlcmF0aW9uRiwgb3BlcmF0aW9uRywgb3BlcmF0aW9uSCwgb3BlcmF0aW9uSSwgb3BlcmF0aW9uSik7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIHN0YXRpYyBmcm9tRmV0Y2hQb3N0SnNvbih1cmwsIGJhc2VSZXF1ZXN0RGF0YSkge1xuICAgICAgICBjb25zdCBpbnB1dCA9IG5ldyBkYXRhX3NvdXJjZV9qc18xLkRhdGFTb3VyY2UoKTtcbiAgICAgICAgY29uc3Qgb3V0cHV0ID0gbmV3IGRhdGFfc291cmNlX2pzXzEuRGF0YVNvdXJjZSgpO1xuICAgICAgICBpbnB1dC5saXN0ZW4oYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICBvdXRwdXQudXBkYXRlKGF3YWl0IGZldGNoKHVybCwgT2JqZWN0LmFzc2lnbih7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgYmFzZVJlcXVlc3REYXRhLCB7XG4gICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkodmFsdWUpXG4gICAgICAgICAgICB9KSkudGhlbigocykgPT4gcy5qc29uKCkpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBTdHJlYW0uZnJvbVByZWNvbm5lY3RlZFNvdXJjZXMoaW5wdXQsIG91dHB1dCk7XG4gICAgfVxuICAgIHN0YXRpYyBmcm9tRmV0Y2hHZXRKc29uKHVybCwgYmFzZVJlcXVlc3REYXRhKSB7XG4gICAgICAgIGNvbnN0IGlucHV0ID0gbmV3IGRhdGFfc291cmNlX2pzXzEuRGF0YVNvdXJjZSgpO1xuICAgICAgICBjb25zdCBvdXRwdXQgPSBuZXcgZGF0YV9zb3VyY2VfanNfMS5EYXRhU291cmNlKCk7XG4gICAgICAgIGlucHV0Lmxpc3Rlbihhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBvdXRwdXQudXBkYXRlKGF3YWl0IGZldGNoKHVybCkudGhlbigocykgPT4gcy5qc29uKCkpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBTdHJlYW0uZnJvbVByZWNvbm5lY3RlZFNvdXJjZXMoaW5wdXQsIG91dHB1dCk7XG4gICAgfVxuICAgIHVwZGF0ZShkYXRhKSB7XG4gICAgICAgIHRoaXMuaW5wdXQudXBkYXRlKGRhdGEpO1xuICAgIH1cbiAgICB0cmFuc2Zvcm0ob3BlcmF0aW9uQSwgb3BlcmF0aW9uQiwgb3BlcmF0aW9uQywgb3BlcmF0aW9uRCwgb3BlcmF0aW9uRSwgb3BlcmF0aW9uRiwgb3BlcmF0aW9uRywgb3BlcmF0aW9uSCwgb3BlcmF0aW9uSSwgb3BlcmF0aW9uSiwgb3BlcmF0aW9uSywgY2FuY2VsbGF0aW9uVG9rZW4pIHtcbiAgICAgICAgbGV0IHRva2VuO1xuICAgICAgICBjb25zdCBvcGVyYXRpb25zID0gW1xuICAgICAgICAgICAgb3BlcmF0aW9uQSxcbiAgICAgICAgICAgIG9wZXJhdGlvbkIsXG4gICAgICAgICAgICBvcGVyYXRpb25DLFxuICAgICAgICAgICAgb3BlcmF0aW9uRCxcbiAgICAgICAgICAgIG9wZXJhdGlvbkUsXG4gICAgICAgICAgICBvcGVyYXRpb25GLFxuICAgICAgICAgICAgb3BlcmF0aW9uRyxcbiAgICAgICAgICAgIG9wZXJhdGlvbkgsXG4gICAgICAgICAgICBvcGVyYXRpb25JLFxuICAgICAgICAgICAgb3BlcmF0aW9uSixcbiAgICAgICAgICAgIG9wZXJhdGlvbktcbiAgICAgICAgXS5maWx0ZXIoKGUpID0+IGUgJiYgKGUgaW5zdGFuY2VvZiBjYW5jZWxsYXRpb25fdG9rZW5fanNfMS5DYW5jZWxsYXRpb25Ub2tlbiA/ICgodG9rZW4gPSBlKSwgZmFsc2UpIDogdHJ1ZSkpO1xuICAgICAgICBpZiAoY2FuY2VsbGF0aW9uVG9rZW4pIHtcbiAgICAgICAgICAgIHRva2VuID0gY2FuY2VsbGF0aW9uVG9rZW47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmVzdWx0ID0gbmV3IGRhdGFfc291cmNlX2pzXzEuRGF0YVNvdXJjZSh1bmRlZmluZWQsIHRoaXMub3V0cHV0Lm5hbWUgKyAnICcgKyBvcGVyYXRpb25zLm1hcCgodikgPT4gdi5uYW1lKS5qb2luKCcgJykpO1xuICAgICAgICB0aGlzLmxpc3RlbigoMCwgZGF0YV9zb3VyY2VfanNfMS5wcm9jZXNzVHJhbnNmb3JtKShvcGVyYXRpb25zLCByZXN1bHQpLCB0b2tlbik7XG4gICAgICAgIHJldHVybiBTdHJlYW0uZnJvbVByZWNvbm5lY3RlZFNvdXJjZXModGhpcy5pbnB1dCwgcmVzdWx0KTtcbiAgICB9XG4gICAgZ2V0SW5wdXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlucHV0O1xuICAgIH1cbiAgICBnZXRPdXRwdXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm91dHB1dDtcbiAgICB9XG4gICAgbGlzdGVuKGNhbGxiYWNrLCBjYW5jZWxsYXRpb25Ub2tlbikge1xuICAgICAgICByZXR1cm4gdGhpcy5vdXRwdXQubGlzdGVuKGNhbGxiYWNrLCBjYW5jZWxsYXRpb25Ub2tlbik7XG4gICAgfVxuICAgIGxpc3RlbkFuZFJlcGVhdChjYWxsYmFjaywgY2FuY2VsbGF0aW9uVG9rZW4pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3V0cHV0Lmxpc3RlbkFuZFJlcGVhdChjYWxsYmFjaywgY2FuY2VsbGF0aW9uVG9rZW4pO1xuICAgIH1cbiAgICBsaXN0ZW5PbmNlKGNhbGxiYWNrLCBjYW5jZWxsYXRpb25Ub2tlbikge1xuICAgICAgICByZXR1cm4gdGhpcy5vdXRwdXQubGlzdGVuT25jZShjYWxsYmFjaywgY2FuY2VsbGF0aW9uVG9rZW4pO1xuICAgIH1cbiAgICBhd2FpdE5leHRVcGRhdGUoY2FuY2VsbGF0aW9uVG9rZW4pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3V0cHV0LmF3YWl0TmV4dFVwZGF0ZShjYW5jZWxsYXRpb25Ub2tlbik7XG4gICAgfVxuICAgIGNhbmNlbEFsbCgpIHtcbiAgICAgICAgdGhpcy5pbnB1dC5jYW5jZWxBbGwoKTtcbiAgICAgICAgdGhpcy5vdXRwdXQuY2FuY2VsQWxsKCk7XG4gICAgfVxufVxuZXhwb3J0cy5TdHJlYW0gPSBTdHJlYW07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zdHJlYW0uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlRyZWVEYXRhU291cmNlID0gdm9pZCAwO1xuY29uc3QgY2FuY2VsbGF0aW9uX3Rva2VuX2pzXzEgPSByZXF1aXJlKFwiLi4vdXRpbGl0aWVzL2NhbmNlbGxhdGlvbl90b2tlbi5qc1wiKTtcbmNvbnN0IGV2ZW50X2VtaXR0ZXJfanNfMSA9IHJlcXVpcmUoXCIuLi91dGlsaXRpZXMvZXZlbnRfZW1pdHRlci5qc1wiKTtcbmNvbnN0IHNvdXJjZXNfanNfMSA9IHJlcXVpcmUoXCIuLi91dGlsaXRpZXMvc291cmNlcy5qc1wiKTtcbmNvbnN0IGRhdGFfc291cmNlX2pzXzEgPSByZXF1aXJlKFwiLi9kYXRhX3NvdXJjZS5qc1wiKTtcbmNsYXNzIFRyZWVEYXRhU291cmNlIHtcbiAgICBjb25zdHJ1Y3RvcihjaGlsZHJlbktleSwgcm9vdHMpIHtcbiAgICAgICAgdGhpcy53YXRjaENvdW50ID0gMDtcbiAgICAgICAgdGhpcy5jaGlsZHJlbktleSA9IGNoaWxkcmVuS2V5O1xuICAgICAgICB0aGlzLnJvb3RzID0gZGF0YV9zb3VyY2VfanNfMS5BcnJheURhdGFTb3VyY2UudG9BcnJheURhdGFTb3VyY2Uocm9vdHMpO1xuICAgICAgICB0aGlzLnVwZGF0ZUV2ZW50ID0gbmV3IGV2ZW50X2VtaXR0ZXJfanNfMS5FdmVudEVtaXR0ZXIoKTtcbiAgICB9XG4gICAgd2F0Y2goY2FuY2VsbGF0aW9uVG9rZW4pIHtcbiAgICAgICAgdGhpcy53YXRjaENvdW50Kys7XG4gICAgICAgIGNhbmNlbGxhdGlvblRva2VuLmFkZENhbmNlbGFibGUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy53YXRjaENvdW50LS07XG4gICAgICAgICAgICBpZiAodGhpcy53YXRjaENvdW50ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy53YXRjaFRva2VuLmNhbmNlbCgpO1xuICAgICAgICAgICAgICAgIHRoaXMud2F0Y2hUb2tlbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmICghdGhpcy53YXRjaFRva2VuKSB7XG4gICAgICAgICAgICB0aGlzLndhdGNoVG9rZW4gPSBuZXcgY2FuY2VsbGF0aW9uX3Rva2VuX2pzXzEuQ2FuY2VsbGF0aW9uVG9rZW4oKTtcbiAgICAgICAgICAgIGNvbnN0IHdhdGNoTWFwID0gbmV3IE1hcCgpO1xuICAgICAgICAgICAgaWYgKHRoaXMucm9vdHMgaW5zdGFuY2VvZiBkYXRhX3NvdXJjZV9qc18xLkFycmF5RGF0YVNvdXJjZSkge1xuICAgICAgICAgICAgICAgIHRoaXMucm9vdHMubGlzdGVuKChjaGFuZ2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53YXRjaEhhbmRsZUNoYW5nZShjaGFuZ2UsIHVuZGVmaW5lZCwgd2F0Y2hNYXApO1xuICAgICAgICAgICAgICAgIH0sIHRoaXMud2F0Y2hUb2tlbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHJvb3Qgb2YgdGhpcy5yb290cykge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgeyBub2RlIH0gb2YgdGhpcy5pdGVyYXRlTGV2ZWxXaXRoTWV0YURhdGEocm9vdCwgdGhpcy5yb290cy5sZW5ndGgudmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChub2RlW3RoaXMuY2hpbGRyZW5LZXldIGluc3RhbmNlb2YgZGF0YV9zb3VyY2VfanNfMS5BcnJheURhdGFTb3VyY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdhdGNoTWFwLnNldChub2RlLCBuZXcgY2FuY2VsbGF0aW9uX3Rva2VuX2pzXzEuQ2FuY2VsbGF0aW9uVG9rZW4oKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndhdGNoVG9rZW4uY2hhaW4od2F0Y2hNYXAuZ2V0KG5vZGUpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVbdGhpcy5jaGlsZHJlbktleV0ubGlzdGVuQW5kUmVwZWF0KChjaGFuZ2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndhdGNoSGFuZGxlQ2hhbmdlKGNoYW5nZSwgbm9kZSwgd2F0Y2hNYXApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgd2F0Y2hNYXAuZ2V0KG5vZGUpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICB3YXRjaEhhbmRsZUNoYW5nZShjaGFuZ2UsIHBhcmVudCwgd2F0Y2hNYXApIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBzd2l0Y2ggKGNoYW5nZS5vcGVyYXRpb24pIHtcbiAgICAgICAgICAgIGNhc2UgJ2FkZCc6XG4gICAgICAgICAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBjaGFuZ2UuaXRlbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVFdmVudC5maXJlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZWROb2RlOiBpdGVtLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IGNoYW5nZS5pbmRleCArIGkrKyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudE5vZGU6IHBhcmVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvbjogJ2FkZGVkJ1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1bdGhpcy5jaGlsZHJlbktleV0gaW5zdGFuY2VvZiBkYXRhX3NvdXJjZV9qc18xLkFycmF5RGF0YVNvdXJjZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2F0Y2hNYXAuc2V0KGl0ZW0sIG5ldyBjYW5jZWxsYXRpb25fdG9rZW5fanNfMS5DYW5jZWxsYXRpb25Ub2tlbigpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud2F0Y2hUb2tlbi5jaGFpbih3YXRjaE1hcC5nZXQoaXRlbSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbVt0aGlzLmNoaWxkcmVuS2V5XS5saXN0ZW5BbmRSZXBlYXQoKGNoYW5nZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud2F0Y2hIYW5kbGVDaGFuZ2UoY2hhbmdlLCBpdGVtLCB3YXRjaE1hcCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB3YXRjaE1hcC5nZXQoaXRlbSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAncmVtb3ZlJzpcbiAgICAgICAgICAgICAgICBsZXQgaiA9IDA7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIGNoYW5nZS5pdGVtcykge1xuICAgICAgICAgICAgICAgICAgICAoX2EgPSB3YXRjaE1hcC5nZXQoaXRlbSkpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jYW5jZWwoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVFdmVudC5maXJlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZWROb2RlOiBpdGVtLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IGNoYW5nZS5pbmRleCArIGorKyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudE5vZGU6IHBhcmVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvbjogJ2RlbGV0ZWQnXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ21lcmdlJzpcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZCcpO1xuICAgICAgICAgICAgY2FzZSAncmVwbGFjZSc6XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVFdmVudC5maXJlKHtcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlZE5vZGU6IGNoYW5nZS50YXJnZXQsXG4gICAgICAgICAgICAgICAgICAgIGluZGV4OiBjaGFuZ2UuaW5kZXgsXG4gICAgICAgICAgICAgICAgICAgIHBhcmVudE5vZGU6IHBhcmVudCxcbiAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uOiAnZGVsZXRlZCdcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUV2ZW50LmZpcmUoe1xuICAgICAgICAgICAgICAgICAgICBjaGFuZ2VkTm9kZTogY2hhbmdlLml0ZW1zWzBdLFxuICAgICAgICAgICAgICAgICAgICBpbmRleDogY2hhbmdlLmluZGV4LFxuICAgICAgICAgICAgICAgICAgICBwYXJlbnROb2RlOiBwYXJlbnQsXG4gICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvbjogJ2FkZGVkJ1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIGxpc3RlbihjYWxsYmFjaywgY2FuY2VsbGF0aW9uVG9rZW4pIHtcbiAgICAgICAgdGhpcy53YXRjaChjYW5jZWxsYXRpb25Ub2tlbik7XG4gICAgICAgIHJldHVybiB0aGlzLnVwZGF0ZUV2ZW50LnN1YnNjcmliZShjYWxsYmFjaywgY2FuY2VsbGF0aW9uVG9rZW4pLmNhbmNlbDtcbiAgICB9XG4gICAgbGlzdGVuQW5kUmVwZWF0KGNhbGxiYWNrLCBjYW5jZWxsYXRpb25Ub2tlbikge1xuICAgICAgICBmb3IgKGNvbnN0IHsgcGFyZW50LCBub2RlLCBpbmRleCB9IG9mIHRoaXMuaXRlcmF0ZUxldmVsV2l0aE1ldGFEYXRhKHRoaXMucm9vdHMsIDApKSB7XG4gICAgICAgICAgICBjYWxsYmFjayh7XG4gICAgICAgICAgICAgICAgY2hhbmdlZE5vZGU6IG5vZGUsXG4gICAgICAgICAgICAgICAgaW5kZXgsXG4gICAgICAgICAgICAgICAgcGFyZW50Tm9kZTogcGFyZW50LFxuICAgICAgICAgICAgICAgIG9wZXJhdGlvbjogJ2FkZGVkJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdGVuKGNhbGxiYWNrLCBjYW5jZWxsYXRpb25Ub2tlbik7XG4gICAgfVxuICAgIGFkYXB0Tm9kZUxpc3Qobm9kZXMsIHRva2VuLCBub2RlTGlzdCA9IG5ldyBkYXRhX3NvdXJjZV9qc18xLkFycmF5RGF0YVNvdXJjZSgpKSB7XG4gICAgICAgIGNvbnN0IGFkYXB0TWFwID0gbmV3IE1hcCgpO1xuICAgICAgICBub2Rlcy5saXN0ZW5BbmRSZXBlYXQoKGNoYW5nZSkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoIChjaGFuZ2Uub3BlcmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnYWRkJzpcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIGNoYW5nZS5pdGVtcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRJdGVtKGFkYXB0TWFwLCB0b2tlbiwgaXRlbSwgbm9kZUxpc3QpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3JlbW92ZSc6XG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBjaGFuZ2UuaXRlbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlSXRlbShub2RlTGlzdCwgYWRhcHRNYXAsIGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ21lcmdlJzpcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQnKTtcbiAgICAgICAgICAgICAgICBjYXNlICdyZXBsYWNlJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVJdGVtKG5vZGVMaXN0LCBhZGFwdE1hcCwgY2hhbmdlLnRhcmdldCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkSXRlbShhZGFwdE1hcCwgdG9rZW4sIGNoYW5nZS5pdGVtc1swXSwgbm9kZUxpc3QpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdG9rZW4pO1xuICAgICAgICByZXR1cm4gbm9kZUxpc3Q7XG4gICAgfVxuICAgIGFkYXB0Tm9kZVRyZWUocGFyZW50LCBub2RlcywgbWFwcGVyLCBuZXdLZXksIHRva2VuKSB7XG4gICAgICAgIG5vZGVzID0gZGF0YV9zb3VyY2VfanNfMS5BcnJheURhdGFTb3VyY2UudG9BcnJheURhdGFTb3VyY2Uobm9kZXMpO1xuICAgICAgICBjb25zdCBuZXdSb290cyA9IG5vZGVzLm1hcChtYXBwZXIpO1xuICAgICAgICBpZiAocGFyZW50KSB7XG4gICAgICAgICAgICBwYXJlbnRbbmV3S2V5XSA9IG5ld1Jvb3RzO1xuICAgICAgICB9XG4gICAgICAgIG5vZGVzLmxpc3RlbkFuZFJlcGVhdCgoY2hhbmdlKSA9PiB7XG4gICAgICAgICAgICBzd2l0Y2ggKGNoYW5nZS5vcGVyYXRpb24pIHtcbiAgICAgICAgICAgICAgICBjYXNlICdhZGQnOlxuICAgICAgICAgICAgICAgICAgICBsZXQgaSA9IGNoYW5nZS5pbmRleDtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIGNoYW5nZS5pdGVtcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGFwdE5vZGVUcmVlKG5ld1Jvb3RzLmdldChpKyspLCBpdGVtW25ld0tleV0sIG1hcHBlciwgbmV3S2V5LCB0b2tlbik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbWVyZ2UnOlxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZCcpO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3JlcGxhY2UnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkYXB0Tm9kZVRyZWUobmV3Um9vdHNbY2hhbmdlLmluZGV4XSwgY2hhbmdlLml0ZW1zWzBdW25ld0tleV0sIG1hcHBlciwgbmV3S2V5LCB0b2tlbik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0b2tlbik7XG4gICAgICAgIHJldHVybiBuZXdSb290cztcbiAgICB9XG4gICAgbWFwKG1hcHBlciwgbmV3S2V5ID0gdGhpcy5jaGlsZHJlbktleSwgY2FuY2VsbGF0aW9uVG9rZW4pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBUcmVlRGF0YVNvdXJjZShuZXdLZXksIHRoaXMuYWRhcHROb2RlVHJlZSh1bmRlZmluZWQsIHRoaXMucm9vdHMsIG1hcHBlciwgbmV3S2V5LCBjYW5jZWxsYXRpb25Ub2tlbikpO1xuICAgIH1cbiAgICBhZGRJdGVtKGFkYXB0TWFwLCBwYXJlbnRUb2tlbiwgaXRlbSwgbm9kZUxpc3QpIHtcbiAgICAgICAgbm9kZUxpc3QucHVzaChpdGVtKTtcbiAgICAgICAgYWRhcHRNYXAuc2V0KGl0ZW0sIG5ldyBjYW5jZWxsYXRpb25fdG9rZW5fanNfMS5DYW5jZWxsYXRpb25Ub2tlbigpKTtcbiAgICAgICAgcGFyZW50VG9rZW4uY2hhaW4oYWRhcHRNYXAuZ2V0KGl0ZW0pKTtcbiAgICAgICAgY29uc3QgbGlzdCA9IGRhdGFfc291cmNlX2pzXzEuQXJyYXlEYXRhU291cmNlLnRvQXJyYXlEYXRhU291cmNlKGl0ZW1bdGhpcy5jaGlsZHJlbktleV0pO1xuICAgICAgICB0aGlzLmFkYXB0Tm9kZUxpc3QobGlzdCwgYWRhcHRNYXAuZ2V0KGl0ZW0pLCBub2RlTGlzdCk7XG4gICAgfVxuICAgIHJlbW92ZUl0ZW0obm9kZUxpc3QsIGFkYXB0TWFwLCBpdGVtKSB7XG4gICAgICAgIGFkYXB0TWFwLmdldChpdGVtKS5jYW5jZWwoKTtcbiAgICAgICAgbm9kZUxpc3QucmVtb3ZlKGl0ZW0pO1xuICAgIH1cbiAgICBjcmVhdGVBcnJheURhdGFTb3VyY2VPZk5vZGVzKGNhbmNlbGxhdGlvblRva2VuKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFkYXB0Tm9kZUxpc3QodGhpcy5yb290cywgY2FuY2VsbGF0aW9uVG9rZW4pO1xuICAgIH1cbiAgICAqW1N5bWJvbC5pdGVyYXRvcl0oKSB7XG4gICAgICAgIGZvciAoY29uc3Qgcm9vdCBvZiB0aGlzLnJvb3RzKSB7XG4gICAgICAgICAgICB5aWVsZCogdGhpcy5pdGVyYXRlTGV2ZWwocm9vdCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAqaXRlcmF0ZVdpdGhNZXRhRGF0YSgpIHtcbiAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICBmb3IgKGNvbnN0IHJvb3Qgb2YgdGhpcy5yb290cykge1xuICAgICAgICAgICAgeWllbGQqIHRoaXMuaXRlcmF0ZUxldmVsV2l0aE1ldGFEYXRhKHJvb3QsIHRoaXMucm9vdHMubGVuZ3RoLnZhbHVlLCB1bmRlZmluZWQsIGkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgKml0ZXJhdGVMZXZlbFdpdGhNZXRhRGF0YShub2RlLCBsYXN0SW5kZXgsIHBhcmVudCwgaW5kZXggPSAwLCBsZXZlbCA9IDApIHtcbiAgICAgICAgeWllbGQgeyBub2RlOiBub2RlLCBwYXJlbnQsIGluZGV4LCBsZXZlbCwgbGFzdEluZGV4IH07XG4gICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgZm9yIChjb25zdCBjaGlsZCBvZiBub2RlW3RoaXMuY2hpbGRyZW5LZXldKSB7XG4gICAgICAgICAgICB5aWVsZCogdGhpcy5pdGVyYXRlTGV2ZWxXaXRoTWV0YURhdGEoY2hpbGQsICgwLCBzb3VyY2VzX2pzXzEuZ2V0VmFsdWVPZikobm9kZVt0aGlzLmNoaWxkcmVuS2V5XS5sZW5ndGgpLCBub2RlLCBpKyssIGxldmVsICsgMSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgKml0ZXJhdGVMZXZlbChsZXZlbCkge1xuICAgICAgICB5aWVsZCBsZXZlbDtcbiAgICAgICAgZm9yIChjb25zdCBjaGlsZCBvZiBsZXZlbFt0aGlzLmNoaWxkcmVuS2V5XSkge1xuICAgICAgICAgICAgeWllbGQqIHRoaXMuaXRlcmF0ZUxldmVsKGNoaWxkKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuVHJlZURhdGFTb3VyY2UgPSBUcmVlRGF0YVNvdXJjZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRyZWVfZGF0YV9zb3VyY2UuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkF1cnVtID0gdm9pZCAwO1xuY29uc3QgaW5wdXRfanNfMSA9IHJlcXVpcmUoXCIuLi9ub2Rlcy9pbnB1dC5qc1wiKTtcbmNvbnN0IHNlbGVjdF9qc18xID0gcmVxdWlyZShcIi4uL25vZGVzL3NlbGVjdC5qc1wiKTtcbmNvbnN0IHNpbXBsZV9kb21fbm9kZXNfanNfMSA9IHJlcXVpcmUoXCIuLi9ub2Rlcy9zaW1wbGVfZG9tX25vZGVzLmpzXCIpO1xuY29uc3QgdGV4dGFyZWFfanNfMSA9IHJlcXVpcmUoXCIuLi9ub2Rlcy90ZXh0YXJlYS5qc1wiKTtcbmNvbnN0IGF1cnVtX2VsZW1lbnRfanNfMSA9IHJlcXVpcmUoXCIuLi9yZW5kZXJpbmcvYXVydW1fZWxlbWVudC5qc1wiKTtcbmNvbnN0IGRhdGFfc291cmNlX2pzXzEgPSByZXF1aXJlKFwiLi4vc3RyZWFtL2RhdGFfc291cmNlLmpzXCIpO1xuY29uc3Qgbm9kZU1hcCA9IHtcbiAgICBhZGRyZXNzOiBzaW1wbGVfZG9tX25vZGVzX2pzXzEuQWRkcmVzcyxcbiAgICBrYmQ6IHNpbXBsZV9kb21fbm9kZXNfanNfMS5LYmQsXG4gICAgc2FtcDogc2ltcGxlX2RvbV9ub2Rlc19qc18xLlNhbXAsXG4gICAgb2JqZWN0OiBzaW1wbGVfZG9tX25vZGVzX2pzXzEuT2JqZWN0LFxuICAgIG9wdGdyb3VwOiBzaW1wbGVfZG9tX25vZGVzX2pzXzEuT3B0R3JvdXAsXG4gICAgcGljdHVyZTogc2ltcGxlX2RvbV9ub2Rlc19qc18xLlBpY3R1cmUsXG4gICAgb3V0cHV0OiBzaW1wbGVfZG9tX25vZGVzX2pzXzEuT3V0cHV0LFxuICAgIHBhcmFtOiBzaW1wbGVfZG9tX25vZGVzX2pzXzEuUGFyYW0sXG4gICAgc3Ryb25nOiBzaW1wbGVfZG9tX25vZGVzX2pzXzEuU3Ryb25nLFxuICAgIHRyYWNrOiBzaW1wbGVfZG9tX25vZGVzX2pzXzEuVHJhY2ssXG4gICAgdmFyOiBzaW1wbGVfZG9tX25vZGVzX2pzXzEuVmFyLFxuICAgIHdicjogc2ltcGxlX2RvbV9ub2Rlc19qc18xLldicixcbiAgICBidXR0b246IHNpbXBsZV9kb21fbm9kZXNfanNfMS5CdXR0b24sXG4gICAgY29kZTogc2ltcGxlX2RvbV9ub2Rlc19qc18xLkNvZGUsXG4gICAgaHI6IHNpbXBsZV9kb21fbm9kZXNfanNfMS5IcixcbiAgICBkaXY6IHNpbXBsZV9kb21fbm9kZXNfanNfMS5EaXYsXG4gICAgaW5wdXQ6IGlucHV0X2pzXzEuSW5wdXQsXG4gICAgbGk6IHNpbXBsZV9kb21fbm9kZXNfanNfMS5MaSxcbiAgICBzcGFuOiBzaW1wbGVfZG9tX25vZGVzX2pzXzEuU3BhbixcbiAgICBzdHlsZTogc2ltcGxlX2RvbV9ub2Rlc19qc18xLlN0eWxlLFxuICAgIHVsOiBzaW1wbGVfZG9tX25vZGVzX2pzXzEuVWwsXG4gICAgcDogc2ltcGxlX2RvbV9ub2Rlc19qc18xLlAsXG4gICAgaW1nOiBzaW1wbGVfZG9tX25vZGVzX2pzXzEuSW1nLFxuICAgIGxpbms6IHNpbXBsZV9kb21fbm9kZXNfanNfMS5MaW5rLFxuICAgIGNhbnZhczogc2ltcGxlX2RvbV9ub2Rlc19qc18xLkNhbnZhcyxcbiAgICBhOiBzaW1wbGVfZG9tX25vZGVzX2pzXzEuQSxcbiAgICBhcnRpY2xlOiBzaW1wbGVfZG9tX25vZGVzX2pzXzEuQXJ0aWNsZSxcbiAgICBicjogc2ltcGxlX2RvbV9ub2Rlc19qc18xLkJyLFxuICAgIGZvcm06IHNpbXBsZV9kb21fbm9kZXNfanNfMS5Gb3JtLFxuICAgIGxhYmVsOiBzaW1wbGVfZG9tX25vZGVzX2pzXzEuTGFiZWwsXG4gICAgb2w6IHNpbXBsZV9kb21fbm9kZXNfanNfMS5PbCxcbiAgICBwcmU6IHNpbXBsZV9kb21fbm9kZXNfanNfMS5QcmUsXG4gICAgcHJvZ3Jlc3M6IHNpbXBsZV9kb21fbm9kZXNfanNfMS5Qcm9ncmVzcyxcbiAgICB0YWJsZTogc2ltcGxlX2RvbV9ub2Rlc19qc18xLlRhYmxlLFxuICAgIHRkOiBzaW1wbGVfZG9tX25vZGVzX2pzXzEuVGQsXG4gICAgdHI6IHNpbXBsZV9kb21fbm9kZXNfanNfMS5UcixcbiAgICB0aDogc2ltcGxlX2RvbV9ub2Rlc19qc18xLlRoLFxuICAgIHRleHRhcmVhOiB0ZXh0YXJlYV9qc18xLlRleHRBcmVhLFxuICAgIGgxOiBzaW1wbGVfZG9tX25vZGVzX2pzXzEuSDEsXG4gICAgaDI6IHNpbXBsZV9kb21fbm9kZXNfanNfMS5IMixcbiAgICBoMzogc2ltcGxlX2RvbV9ub2Rlc19qc18xLkgzLFxuICAgIGg0OiBzaW1wbGVfZG9tX25vZGVzX2pzXzEuSDQsXG4gICAgaDU6IHNpbXBsZV9kb21fbm9kZXNfanNfMS5INSxcbiAgICBoNjogc2ltcGxlX2RvbV9ub2Rlc19qc18xLkg2LFxuICAgIGh0bWw6IHNpbXBsZV9kb21fbm9kZXNfanNfMS5IdG1sLFxuICAgIGhlYWQ6IHNpbXBsZV9kb21fbm9kZXNfanNfMS5IZWFkLFxuICAgIGhlYWRlcjogc2ltcGxlX2RvbV9ub2Rlc19qc18xLkhlYWRlcixcbiAgICBmb290ZXI6IHNpbXBsZV9kb21fbm9kZXNfanNfMS5Gb290ZXIsXG4gICAgbmF2OiBzaW1wbGVfZG9tX25vZGVzX2pzXzEuTmF2LFxuICAgIGI6IHNpbXBsZV9kb21fbm9kZXNfanNfMS5CLFxuICAgIGk6IHNpbXBsZV9kb21fbm9kZXNfanNfMS5JLFxuICAgIHNjcmlwdDogc2ltcGxlX2RvbV9ub2Rlc19qc18xLlNjcmlwdCxcbiAgICBhYmJyOiBzaW1wbGVfZG9tX25vZGVzX2pzXzEuQWJicixcbiAgICBhcmVhOiBzaW1wbGVfZG9tX25vZGVzX2pzXzEuQXJlYSxcbiAgICBhc2lkZTogc2ltcGxlX2RvbV9ub2Rlc19qc18xLkFzaWRlLFxuICAgIGF1ZGlvOiBzaW1wbGVfZG9tX25vZGVzX2pzXzEuQXVkaW8sXG4gICAgZW06IHNpbXBsZV9kb21fbm9kZXNfanNfMS5FbSxcbiAgICBoZWFkaW5nOiBzaW1wbGVfZG9tX25vZGVzX2pzXzEuSGVhZGluZyxcbiAgICBpZnJhbWU6IHNpbXBsZV9kb21fbm9kZXNfanNfMS5JRnJhbWUsXG4gICAgbm9zY3JpcHQ6IHNpbXBsZV9kb21fbm9kZXNfanNfMS5Ob1NjcmlwdCxcbiAgICBvcHRpb246IHNpbXBsZV9kb21fbm9kZXNfanNfMS5PcHRpb24sXG4gICAgcTogc2ltcGxlX2RvbV9ub2Rlc19qc18xLlEsXG4gICAgc2VsZWN0OiBzZWxlY3RfanNfMS5TZWxlY3QsXG4gICAgc291cmNlOiBzaW1wbGVfZG9tX25vZGVzX2pzXzEuU291cmNlLFxuICAgIHRpdGxlOiBzaW1wbGVfZG9tX25vZGVzX2pzXzEuVGl0bGUsXG4gICAgdmlkZW86IHNpbXBsZV9kb21fbm9kZXNfanNfMS5WaWRlbyxcbiAgICB0Ym9keTogc2ltcGxlX2RvbV9ub2Rlc19qc18xLlRCb2R5LFxuICAgIHRmb290OiBzaW1wbGVfZG9tX25vZGVzX2pzXzEuVEZvb3QsXG4gICAgbWV0YTogc2ltcGxlX2RvbV9ub2Rlc19qc18xLk1ldGEsXG4gICAgYm9keTogc2ltcGxlX2RvbV9ub2Rlc19qc18xLkJvZHksXG4gICAgdGhlYWQ6IHNpbXBsZV9kb21fbm9kZXNfanNfMS5USGVhZCxcbiAgICBzdW1tYXJ5OiBzaW1wbGVfZG9tX25vZGVzX2pzXzEuU3VtbWFyeSxcbiAgICBkZXRhaWxzOiBzaW1wbGVfZG9tX25vZGVzX2pzXzEuRGV0YWlscyxcbiAgICBzdWI6IHNpbXBsZV9kb21fbm9kZXNfanNfMS5TdWIsXG4gICAgc3VwOiBzaW1wbGVfZG9tX25vZGVzX2pzXzEuU3VwLFxuICAgIHN2Zzogc2ltcGxlX2RvbV9ub2Rlc19qc18xLlN2ZyxcbiAgICBkYXRhOiBzaW1wbGVfZG9tX25vZGVzX2pzXzEuRGF0YSxcbiAgICB0aW1lOiBzaW1wbGVfZG9tX25vZGVzX2pzXzEuVGltZSxcbiAgICB0ZW1wbGF0ZTogc2ltcGxlX2RvbV9ub2Rlc19qc18xLlRlbXBsYXRlLFxuICAgIHNsb3Q6IHNpbXBsZV9kb21fbm9kZXNfanNfMS5TbG90LFxuICAgIGNvbDogc2ltcGxlX2RvbV9ub2Rlc19qc18xLkNvbCxcbiAgICBjb2xncm91cDogc2ltcGxlX2RvbV9ub2Rlc19qc18xLkNvbGdyb3VwLFxuICAgIGNhcHRpb246IHNpbXBsZV9kb21fbm9kZXNfanNfMS5DYXB0aW9uXG59O1xuY2xhc3MgQXVydW0ge1xuICAgIHN0YXRpYyByZWh5ZHJhdGUoYXVydW1SZW5kZXJhYmxlLCBkb20pIHtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZG9tLnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIGRvbS5yZW1vdmUoKTtcbiAgICAgICAgcmV0dXJuIEF1cnVtLmF0dGFjaChhdXJ1bVJlbmRlcmFibGUsIHRhcmdldCk7XG4gICAgfVxuICAgIHN0YXRpYyBhdHRhY2goYXVydW1SZW5kZXJhYmxlLCBkb20pIHtcbiAgICAgICAgY29uc3Qgc2Vzc2lvbiA9ICgwLCBhdXJ1bV9lbGVtZW50X2pzXzEuY3JlYXRlUmVuZGVyU2Vzc2lvbikoKTtcbiAgICAgICAgY29uc3QgY29udGVudCA9ICgwLCBhdXJ1bV9lbGVtZW50X2pzXzEucmVuZGVySW50ZXJuYWwpKGF1cnVtUmVuZGVyYWJsZSwgc2Vzc2lvbik7XG4gICAgICAgIGlmIChjb250ZW50IGluc3RhbmNlb2YgYXVydW1fZWxlbWVudF9qc18xLkF1cnVtRWxlbWVudCkge1xuICAgICAgICAgICAgY29udGVudC5hdHRhY2hUb0RvbShkb20sIGRvbS5jaGlsZE5vZGVzLmxlbmd0aCk7XG4gICAgICAgICAgICBzZXNzaW9uLnNlc3Npb25Ub2tlbi5hZGRDYW5jZWxhYmxlKCgpID0+IGNvbnRlbnQuZGlzcG9zZSgpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KGNvbnRlbnQpKSB7XG4gICAgICAgICAgICBjb25zdCByb290ID0gbmV3IGF1cnVtX2VsZW1lbnRfanNfMS5BcnJheUF1cnVtRWxlbWVudChuZXcgZGF0YV9zb3VyY2VfanNfMS5BcnJheURhdGFTb3VyY2UoY29udGVudCksICgwLCBhdXJ1bV9lbGVtZW50X2pzXzEuY3JlYXRlQVBJKShzZXNzaW9uKSk7XG4gICAgICAgICAgICBzZXNzaW9uLnNlc3Npb25Ub2tlbi5hZGRDYW5jZWxhYmxlKCgpID0+IHJvb3QuZGlzcG9zZSgpKTtcbiAgICAgICAgICAgIHJvb3QuYXR0YWNoVG9Eb20oZG9tLCBkb20uY2hpbGROb2Rlcy5sZW5ndGgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZG9tLmFwcGVuZENoaWxkKGNvbnRlbnQpO1xuICAgICAgICAgICAgc2Vzc2lvbi5zZXNzaW9uVG9rZW4uYWRkQ2FuY2VsYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbnRlbnQuaXNDb25uZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgZG9tLnJlbW92ZUNoaWxkKGNvbnRlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGkgPSBzZXNzaW9uLmF0dGFjaENhbGxzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICBzZXNzaW9uLmF0dGFjaENhbGxzW2ldKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNlc3Npb24uc2Vzc2lvblRva2VuO1xuICAgIH1cbiAgICBzdGF0aWMgZnJhZ21lbnQoKSB7IH1cbiAgICBzdGF0aWMgZmFjdG9yeShub2RlLCBhcmdzLCAuLi5pbm5lck5vZGVzKSB7XG4gICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICBpZiAobm9kZSA9PT0gQXVydW0uZnJhZ21lbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBpbm5lck5vZGVzO1xuICAgICAgICB9XG4gICAgICAgIGxldCBuYW1lO1xuICAgICAgICBsZXQgaW50cmluc2ljID0gZmFsc2U7XG4gICAgICAgIGlmICh0eXBlb2Ygbm9kZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGludHJpbnNpYyA9IHRydWU7XG4gICAgICAgICAgICBuYW1lID0gbm9kZTtcbiAgICAgICAgICAgIGNvbnN0IHR5cGUgPSBub2RlO1xuICAgICAgICAgICAgbm9kZSA9IG5vZGVNYXBbbm9kZV07XG4gICAgICAgICAgICBpZiAobm9kZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBOb2RlICR7dHlwZX0gZG9lcyBub3QgZXhpc3Qgb3IgaXMgbm90IHN1cHBvcnRlZGApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbmFtZSA9IG5vZGUubmFtZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgW2F1cnVtX2VsZW1lbnRfanNfMS5hdXJ1bUVsZW1lbnRNb2RlbElkZW50aXRpeV06IHRydWUsXG4gICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgaXNJbnRyaW5zaWM6IGludHJpbnNpYyxcbiAgICAgICAgICAgIGZhY3Rvcnk6IG5vZGUsXG4gICAgICAgICAgICBwcm9wczogYXJncyxcbiAgICAgICAgICAgIGNoaWxkcmVuOiBpbm5lck5vZGVzXG4gICAgICAgIH07XG4gICAgfVxufVxuZXhwb3J0cy5BdXJ1bSA9IEF1cnVtO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXVydW0uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnJlZ2lzdGVyQW5pbWF0aW9uTG9vcCA9IGV4cG9ydHMuQ2FuY2VsbGF0aW9uVG9rZW4gPSB2b2lkIDA7XG5jbGFzcyBDYW5jZWxsYXRpb25Ub2tlbiB7XG4gICAgY29uc3RydWN0b3IoLi4uY2FuY2VsbGFibGVzKSB7XG4gICAgICAgIHRoaXMuY2FuY2VsYWJsZXMgPSBjYW5jZWxsYWJsZXMgIT09IG51bGwgJiYgY2FuY2VsbGFibGVzICE9PSB2b2lkIDAgPyBjYW5jZWxsYWJsZXMgOiBbXTtcbiAgICAgICAgdGhpcy5faXNDYW5jZWxsZWQgPSBmYWxzZTtcbiAgICB9XG4gICAgZ2V0IGlzQ2FuY2VsZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pc0NhbmNlbGxlZDtcbiAgICB9XG4gICAgc3RhdGljIGZyb21NdWx0aXBsZSh0b2tlbnMpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gbmV3IENhbmNlbGxhdGlvblRva2VuKCk7XG4gICAgICAgIGZvciAoY29uc3QgdG9rZW4gb2YgdG9rZW5zKSB7XG4gICAgICAgICAgICB0b2tlbi5jaGFpbihyZXN1bHQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIGhhc0NhbmNlbGxhYmxlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FuY2VsYWJsZXMubGVuZ3RoID4gMDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQXR0YWNoZXMgYSBuZXcgY2FuY2VsYWJsZSB0byB0aGlzIHRva2VuXG4gICAgICogQHBhcmFtIGRlbGVnYXRlXG4gICAgICovXG4gICAgYWRkQ2FuY2VsYWJsZShkZWxlZ2F0ZSkge1xuICAgICAgICB0aGlzLnRocm93SWZDYW5jZWxsZWQoJ2F0dGVtcHRpbmcgdG8gYWRkIGNhbmNlbGxhYmxlIHRvIHRva2VuIHRoYXQgaXMgYWxyZWFkeSBjYW5jZWxsZWQnKTtcbiAgICAgICAgdGhpcy5jYW5jZWxhYmxlcy5wdXNoKGRlbGVnYXRlKTtcbiAgICAgICAgaWYgKHRoaXMuY2FuY2VsYWJsZXMubGVuZ3RoID09PSAyMDApIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdwb3RlbnRpYWwgbWVtb3J5IGxlYWs6IGNhbmNlbGxhdGlvbiB0b2tlbiBoYXMgb3ZlciAyMDAgY2xlYW4gdXAgY2FsbHMnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcmVtb3ZlQ2FuY2VsYWJsZShkZWxlZ2F0ZSkge1xuICAgICAgICB0aGlzLnRocm93SWZDYW5jZWxsZWQoJ2F0dGVtcHRpbmcgdG8gcmVtb3ZlIGNhbmNlbGxhYmxlIGZyb20gdG9rZW4gdGhhdCBpcyBhbHJlYWR5IGNhbmNlbGxlZCcpO1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuY2FuY2VsYWJsZXMuaW5kZXhPZihkZWxlZ2F0ZSk7XG4gICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuY2FuY2VsYWJsZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgc2V0VGltZW91dChjYiwgdGltZSA9IDApIHtcbiAgICAgICAgY29uc3QgaWQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQ2FuY2VsYWJsZShjYW5jZWxhYmxlKTtcbiAgICAgICAgICAgIGNiKCk7XG4gICAgICAgIH0sIHRpbWUpO1xuICAgICAgICBjb25zdCBjYW5jZWxhYmxlID0gKCkgPT4gY2xlYXJUaW1lb3V0KGlkKTtcbiAgICAgICAgdGhpcy5hZGRDYW5jZWxhYmxlKGNhbmNlbGFibGUpO1xuICAgIH1cbiAgICBzZXRJbnRlcnZhbChjYiwgdGltZSkge1xuICAgICAgICBjb25zdCBpZCA9IHNldEludGVydmFsKGNiLCB0aW1lKTtcbiAgICAgICAgdGhpcy5hZGRDYW5jZWxhYmxlKCgpID0+IGNsZWFySW50ZXJ2YWwoaWQpKTtcbiAgICB9XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGNiKSB7XG4gICAgICAgIGNvbnN0IGlkID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQ2FuY2VsYWJsZShjYW5jZWxhYmxlKTtcbiAgICAgICAgICAgIGNiKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBjYW5jZWxhYmxlID0gKCkgPT4gY2FuY2VsQW5pbWF0aW9uRnJhbWUoaWQpO1xuICAgICAgICB0aGlzLmFkZENhbmNlbGFibGUoY2FuY2VsYWJsZSk7XG4gICAgfVxuICAgIGFuaW1hdGlvbkxvb3AoY2IpIHtcbiAgICAgICAgcmVnaXN0ZXJBbmltYXRpb25Mb29wKGNiLCB0aGlzKTtcbiAgICB9XG4gICAgdGhyb3dJZkNhbmNlbGxlZChtc2cpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNDYW5jZWxlZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1zZyB8fCAnY2FuY2VsbGF0aW9uIHRva2VuIGlzIGNhbmNlbGxlZCcpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNoYWluKHRhcmdldCwgdHdvV2F5cyA9IGZhbHNlKSB7XG4gICAgICAgIGNvbnN0IGNhbmNlbGFibGUgPSAoKSA9PiB0YXJnZXQuY2FuY2VsKCk7XG4gICAgICAgIGlmICh0d29XYXlzKSB7XG4gICAgICAgICAgICB0YXJnZXQuY2hhaW4odGhpcywgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGFyZ2V0LmFkZENhbmNlbGFibGUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc0NhbmNlbGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlQ2FuY2VsYWJsZShjYW5jZWxhYmxlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmFkZENhbmNlbGFibGUoY2FuY2VsYWJsZSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZWdpc3RlcnMgYW4gZXZlbnQgdXNpbmcgYWRkRXZlbnRMaXN0ZW5lciBhbmQgaWYgeW91IGNhbmNlbCB0aGUgdG9rZW4gdGhlIGV2ZW50IHdpbGwgYmUgY2FuY2VsZWQgYXMgd2VsbFxuICAgICAqL1xuICAgIHJlZ2lzdGVyRG9tRXZlbnQoZXZlbnRFbWl0dGVyLCBldmVudCwgY2FsbGJhY2spIHtcbiAgICAgICAgZXZlbnRFbWl0dGVyLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGNhbGxiYWNrKTtcbiAgICAgICAgdGhpcy5hZGRDYW5jZWxhYmxlKCgpID0+IGV2ZW50RW1pdHRlci5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBjYWxsYmFjaykpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FuY2VscyBldmVyeXRoaW5nIGF0dGFjaGVkIHRvIHRoaXMgdG9rZW5cbiAgICAgKi9cbiAgICBjYW5jZWwoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzQ2FuY2VsZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9pc0NhbmNlbGxlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuY2FuY2VsYWJsZXMuZm9yRWFjaCgoYykgPT4gYygpKTtcbiAgICAgICAgdGhpcy5jYW5jZWxhYmxlcyA9IHVuZGVmaW5lZDtcbiAgICB9XG59XG5leHBvcnRzLkNhbmNlbGxhdGlvblRva2VuID0gQ2FuY2VsbGF0aW9uVG9rZW47XG5DYW5jZWxsYXRpb25Ub2tlbi5mb3JldmVyID0gbmV3IENhbmNlbGxhdGlvblRva2VuKCk7XG5jb25zdCBhbmltYXRpb25DYnMgPSBbXTtcbmxldCBsb29waW5nID0gZmFsc2U7XG5mdW5jdGlvbiByZWdpc3RlckFuaW1hdGlvbkxvb3AoY2FsbGJhY2ssIHRva2VuKSB7XG4gICAgYW5pbWF0aW9uQ2JzLnB1c2goY2FsbGJhY2spO1xuICAgIHRva2VuLmFkZENhbmNlbGFibGUoKCkgPT4ge1xuICAgICAgICBhbmltYXRpb25DYnMuc3BsaWNlKGFuaW1hdGlvbkNicy5pbmRleE9mKGNhbGxiYWNrKSwgMSk7XG4gICAgfSk7XG4gICAgaWYgKCFsb29waW5nKSB7XG4gICAgICAgIGxvb3BpbmcgPSB0cnVlO1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcCk7XG4gICAgfVxufVxuZXhwb3J0cy5yZWdpc3RlckFuaW1hdGlvbkxvb3AgPSByZWdpc3RlckFuaW1hdGlvbkxvb3A7XG5mdW5jdGlvbiBsb29wKHRpbWUpIHtcbiAgICBmb3IgKGNvbnN0IGNiIG9mIGFuaW1hdGlvbkNicykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY2IodGltZSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKGFuaW1hdGlvbkNicy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgbG9vcGluZyA9IGZhbHNlO1xuICAgIH1cbiAgICBpZiAobG9vcGluZykge1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcCk7XG4gICAgfVxufVxuQ2FuY2VsbGF0aW9uVG9rZW4uZm9yZXZlci5hZGRDYW5jZWxhYmxlID0gKCkgPT4gdm9pZCAwO1xuQ2FuY2VsbGF0aW9uVG9rZW4uZm9yZXZlci5jYW5jZWwgPSAoKSA9PiB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgY2FuY2VsIGZvcmV2ZXIgdG9rZW4nKTtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jYW5jZWxsYXRpb25fdG9rZW4uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmNvbWJpbmVBdHRyaWJ1dGUgPSBleHBvcnRzLmNvbWJpbmVDbGFzcyA9IGV4cG9ydHMuYXVydW1DbGFzc05hbWUgPSB2b2lkIDA7XG5jb25zdCBkYXRhX3NvdXJjZV9qc18xID0gcmVxdWlyZShcIi4uL3N0cmVhbS9kYXRhX3NvdXJjZS5qc1wiKTtcbmNvbnN0IGR1cGxleF9kYXRhX3NvdXJjZV9qc18xID0gcmVxdWlyZShcIi4uL3N0cmVhbS9kdXBsZXhfZGF0YV9zb3VyY2UuanNcIik7XG5mdW5jdGlvbiBhdXJ1bUNsYXNzTmFtZShkYXRhLCBjYW5jZWxsYXRpb25Ub2tlbikge1xuICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuICAgIGZvciAoY29uc3Qga2V5IGluIGRhdGEpIHtcbiAgICAgICAgaWYgKGRhdGFba2V5XSkge1xuICAgICAgICAgICAgaWYgKGRhdGFba2V5XSBpbnN0YW5jZW9mIGRhdGFfc291cmNlX2pzXzEuRGF0YVNvdXJjZSB8fCBkYXRhW2tleV0gaW5zdGFuY2VvZiBkdXBsZXhfZGF0YV9zb3VyY2VfanNfMS5EdXBsZXhEYXRhU291cmNlKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc291cmNlID0gZGF0YVtrZXldO1xuICAgICAgICAgICAgICAgIGNvbnN0IG1hcHBlZFNvdXJjZSA9IG5ldyBkYXRhX3NvdXJjZV9qc18xLkRhdGFTb3VyY2Uoc291cmNlLnZhbHVlID8ga2V5IDogJycpO1xuICAgICAgICAgICAgICAgIHNvdXJjZS5saXN0ZW4oKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG1hcHBlZFNvdXJjZS51cGRhdGUodmFsdWUgPyBrZXkgOiAnJyk7XG4gICAgICAgICAgICAgICAgfSwgY2FuY2VsbGF0aW9uVG9rZW4pO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKG1hcHBlZFNvdXJjZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG5leHBvcnRzLmF1cnVtQ2xhc3NOYW1lID0gYXVydW1DbGFzc05hbWU7XG5mdW5jdGlvbiBjb21iaW5lQ2xhc3MoY2FuY2VsbGF0aW9uVG9rZW4sIC4uLmFyZ3MpIHtcbiAgICBhcmdzID0gYXJncy5maWx0ZXIoKGUpID0+ICEhZSk7XG4gICAgaWYgKGFyZ3MubGVuZ3RoIDwgMikge1xuICAgICAgICByZXR1cm4gYXJnc1swXTtcbiAgICB9XG4gICAgY29uc3QgY29uc3RhbnRzID0gW107XG4gICAgY29uc3Qgc291cmNlcyA9IFtdO1xuICAgIHJlc29sdmVDb25zdGFudHMoYXJncyk7XG4gICAgZnVuY3Rpb24gcmVzb2x2ZUNvbnN0YW50cyhhcmdzKSB7XG4gICAgICAgIGZvciAoY29uc3QgYXJnIG9mIGFyZ3MpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgYXJnID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIGNvbnN0YW50cy5wdXNoKGFyZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShhcmcpKSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZUNvbnN0YW50cyhhcmcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGFyZyBpbnN0YW5jZW9mIGRhdGFfc291cmNlX2pzXzEuRGF0YVNvdXJjZSB8fCBhcmcgaW5zdGFuY2VvZiBkdXBsZXhfZGF0YV9zb3VyY2VfanNfMS5EdXBsZXhEYXRhU291cmNlKSB7XG4gICAgICAgICAgICAgICAgc291cmNlcy5wdXNoKGFyZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKHNvdXJjZXMubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBzb3VyY2VzWzBdLmFnZ3JlZ2F0ZShzb3VyY2VzLnNsaWNlKDEpLCAoLi4uZGF0YSkgPT4ge1xuICAgICAgICAgICAgaWYgKGNvbnN0YW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YS5mbGF0KCkuY29uY2F0KGNvbnN0YW50cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YS5mbGF0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIGNhbmNlbGxhdGlvblRva2VuKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBjb25zdGFudHM7XG4gICAgfVxufVxuZXhwb3J0cy5jb21iaW5lQ2xhc3MgPSBjb21iaW5lQ2xhc3M7XG5mdW5jdGlvbiBjb21iaW5lQXR0cmlidXRlKGNhbmNlbGxhdGlvblRva2VuLCAuLi5hcmdzKSB7XG4gICAgY29uc3QgY29uc3RhbnRzID0gW107XG4gICAgY29uc3Qgc291cmNlcyA9IFtdO1xuICAgIGZvciAoY29uc3QgYXR0ciBvZiBhcmdzKSB7XG4gICAgICAgIGlmICh0eXBlb2YgYXR0ciA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIGF0dHIgPT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgY29uc3RhbnRzLnB1c2goYXR0cik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGF0dHIgaW5zdGFuY2VvZiBkYXRhX3NvdXJjZV9qc18xLkRhdGFTb3VyY2UgfHwgYXR0ciBpbnN0YW5jZW9mIGR1cGxleF9kYXRhX3NvdXJjZV9qc18xLkR1cGxleERhdGFTb3VyY2UpIHtcbiAgICAgICAgICAgIHNvdXJjZXMucHVzaChhdHRyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoc291cmNlcy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIHNvdXJjZXNbMF0uYWdncmVnYXRlKHNvdXJjZXMuc2xpY2UoMSksICguLi5kYXRhKSA9PiB7XG4gICAgICAgICAgICBpZiAoY29uc3RhbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhLmNvbmNhdChjb25zdGFudHMpLmpvaW4oJyAnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhLmpvaW4oJyAnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgY2FuY2VsbGF0aW9uVG9rZW4pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGNvbnN0YW50cy5qb2luKCcgJyk7XG4gICAgfVxufVxuZXhwb3J0cy5jb21iaW5lQXR0cmlidXRlID0gY29tYmluZUF0dHJpYnV0ZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNsYXNzbmFtZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuRXZlbnRFbWl0dGVyID0gdm9pZCAwO1xuLyoqXG4gKiBFdmVudCBlbWl0dGVyIGlzIGF0IHRoZSBjb3JlIG9mIGF1cnVtcyBzdHJlYW0gc3lzdGVtLiBJdCdzIGEgYmFzaWMgcHViIHN1YiBzdHlsZSB0eXBlc2FmZSBldmVudCBzeXN0ZW0gb3B0aW1pemVkIGZvciBoaWdoIHVwZGF0ZSB0aHJvdWdocHV0XG4gKi9cbmNsYXNzIEV2ZW50RW1pdHRlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuc3Vic2NyaWJlQ2hhbm5lbCA9IFtdO1xuICAgICAgICB0aGlzLnN1YnNjcmliZU9uY2VDaGFubmVsID0gW107XG4gICAgICAgIHRoaXMub25BZnRlckZpcmUgPSBbXTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0IGEgbnVtYmVyIG9mIHN1YnNjcmlwdGlvbnMgdGhhdCBhbnkgZXZlbnQgY2FuIGhhdmUgYXQgbW9zdCBiZWZvcmUgZW1pdHRpbmcgd2FybmluZ3MuIFRoZSBzdWJzY3JpcHRpb25zIHdpbGwgY29udGludWUgd29ya2luZyBidXQgdGhlIHdhcm5pbmdzIGNhbiBiZSB1c2VkXG4gICAgICogdG8gdHJhY2sgcG90ZW50aWFsIHN1YnNjcmlwdGlvbiBtZW1vcnkgbGVha3NcbiAgICAgKi9cbiAgICBzdGF0aWMgc2V0U3Vic2NyaXB0aW9uTGVha1dhcm5pbmdUaHJlc2hvbGQobGltaXQpIHtcbiAgICAgICAgRXZlbnRFbWl0dGVyLmxlYWtXYXJuaW5nVGhyZXNob2xkID0gbGltaXQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIHJldHVybnMgdGhlIGNvdW50IG9mIHN1YnNjcmlwdGlvbnMgYm90aCBvbmUgdGltZSBhbmQgcmVndWxhclxuICAgICAqL1xuICAgIGdldCBzdWJzY3JpcHRpb25zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdWJzY3JpYmVDaGFubmVsLmxlbmd0aCArIHRoaXMuc3Vic2NyaWJlT25jZUNoYW5uZWwubGVuZ3RoO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTdWJzY3JpYmUgdG8gdGhlIGV2ZW50LiBUaGUgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgd2hlbmV2ZXIgdGhlIGV2ZW50IGZpcmVzIGFuIHVwZGF0ZVxuICAgICAqL1xuICAgIHN1YnNjcmliZShjYWxsYmFjaywgY2FuY2VsbGF0aW9uVG9rZW4pIHtcbiAgICAgICAgY29uc3QgeyBmYWNhZGUgfSA9IHRoaXMuY3JlYXRlU3Vic2NyaXB0aW9uKGNhbGxiYWNrLCB0aGlzLnN1YnNjcmliZUNoYW5uZWwsIGNhbmNlbGxhdGlvblRva2VuKTtcbiAgICAgICAgaWYgKEV2ZW50RW1pdHRlci5sZWFrV2FybmluZ1RocmVzaG9sZCAmJiB0aGlzLnN1YnNjcmliZUNoYW5uZWwubGVuZ3RoID4gRXZlbnRFbWl0dGVyLmxlYWtXYXJuaW5nVGhyZXNob2xkKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYE9ic2VydmFibGUgaGFzICR7dGhpcy5zdWJzY3JpYmVDaGFubmVsLmxlbmd0aH0gc3Vic2NyaXB0aW9ucy4gVGhpcyBjb3VsZCBwb3RlbnRpYWxseSBpbmRpY2F0ZSBhIG1lbW9yeSBsZWFrYCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhY2FkZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU3Vic2NyaWJlIHRvIHRoZSBldmVudC4gVGhlIGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHdoZW4gdGhlIGV2ZW50IG5leHQgZmlyZXMgYW4gdXBkYXRlIGFmdGVyIHdoaWNoIHRoZSBzdWJzY3JpcHRpb24gaXMgY2FuY2VsbGVkXG4gICAgICovXG4gICAgc3Vic2NyaWJlT25jZShjYWxsYmFjaywgY2FuY2VsbGF0aW9uVG9rZW4pIHtcbiAgICAgICAgY29uc3QgeyBmYWNhZGUgfSA9IHRoaXMuY3JlYXRlU3Vic2NyaXB0aW9uKGNhbGxiYWNrLCB0aGlzLnN1YnNjcmliZU9uY2VDaGFubmVsLCBjYW5jZWxsYXRpb25Ub2tlbik7XG4gICAgICAgIGlmIChFdmVudEVtaXR0ZXIubGVha1dhcm5pbmdUaHJlc2hvbGQgJiYgdGhpcy5zdWJzY3JpYmVPbmNlQ2hhbm5lbC5sZW5ndGggPiBFdmVudEVtaXR0ZXIubGVha1dhcm5pbmdUaHJlc2hvbGQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgT2JzZXJ2YWJsZSBoYXMgJHt0aGlzLnN1YnNjcmliZU9uY2VDaGFubmVsLmxlbmd0aH0gb25lIHRpbWUgc3Vic2NyaXB0aW9ucy4gVGhpcyBjb3VsZCBwb3RlbnRpYWxseSBpbmRpY2F0ZSBhIG1lbW9yeSBsZWFrYCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhY2FkZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGUgZXZlbnQgaGFzIGFueSBzdWJzY3JpcHRpb25zXG4gICAgICovXG4gICAgaGFzU3Vic2NyaXB0aW9ucygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3Vic2NyaXB0aW9ucyA+IDA7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYWxsIGN1cnJlbnRseSBhY3RpdmUgc3Vic2NyaXB0aW9ucy4gSWYgY2FsbGVkIGluIHRoZSBjYWxsYmFjayBvZiBhIHN1YnNjcmlwdGlvbiB3aWxsIGJlIGRlZmVyZWQgdW50aWwgYWZ0ZXIgdGhlIGZpcmUgZXZlbnQgZmluaXNoZWRcbiAgICAgKi9cbiAgICBjYW5jZWxBbGwoKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgaWYgKCF0aGlzLmlzRmlyaW5nKSB7XG4gICAgICAgICAgICB0aGlzLnN1YnNjcmliZUNoYW5uZWwubGVuZ3RoID0gMDtcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaWJlT25jZUNoYW5uZWwubGVuZ3RoID0gMDtcbiAgICAgICAgICAgIChfYSA9IHRoaXMub25FbXB0eSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmNhbGwodGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm9uQWZ0ZXJGaXJlLnB1c2goKCkgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgICAgICB0aGlzLnN1YnNjcmliZUNoYW5uZWwubGVuZ3RoID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLnN1YnNjcmliZU9uY2VDaGFubmVsLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICAgICAgKF9hID0gdGhpcy5vbkVtcHR5KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFmdGVyRmlyZSgpIHtcbiAgICAgICAgaWYgKHRoaXMub25BZnRlckZpcmUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5vbkFmdGVyRmlyZS5mb3JFYWNoKChjYikgPT4gY2IoKSk7XG4gICAgICAgICAgICB0aGlzLm9uQWZ0ZXJGaXJlLmxlbmd0aCA9IDA7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogUHVibGlzaGVzIGEgbmV3IHZhbHVlIGFsbCBzdWJzY3JpYmVycyB3aWxsIGJlIGNhbGxlZFxuICAgICAqIEVycm9ycyBpbiB0aGUgY2FsbGJhY2tzIGFyZSBjYXVnaHQgYW5kIGRlZmVycmVkIHVudGlsIGFmdGVyIGZpcmUgZmluaXNoZXMgYmVmb3JlIHRocm93aW5nIHRvIGF2b2lkIGludGVycnVwdGluZyB0aGUgcHJvcGFnYXRpb24gb2YgdGhlIGV2ZW50XG4gICAgICogdG8gYWxsIHN1YnNjcmliZXJzIHNpbXBseSBiZWNhdXNlIG9mIG9uZSBmYXVsdHkgc3Vic2NyaWJlclxuICAgICAqL1xuICAgIGZpcmUoZGF0YSkge1xuICAgICAgICBjb25zdCBsZW5ndGggPSB0aGlzLnN1YnNjcmliZUNoYW5uZWwubGVuZ3RoO1xuICAgICAgICBjb25zdCBsZW5ndGhPbmNlID0gdGhpcy5zdWJzY3JpYmVPbmNlQ2hhbm5lbC5sZW5ndGg7XG4gICAgICAgIGlmIChsZW5ndGggPT09IDAgJiYgbGVuZ3RoT25jZSA9PT0gMCkge1xuICAgICAgICAgICAgLy9DdXQgc29tZSBvdmVyaGVhZCBpbiB0aGUgY2FzZSBub3RoaW5nIGlzIGxpc3RlbmluZ1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaXNGaXJpbmcgPSB0cnVlO1xuICAgICAgICBsZXQgZXJyb3IgPSB1bmRlZmluZWQ7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdWJzY3JpYmVDaGFubmVsW2ldLmNhbGxiYWNrKGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBlcnJvciA9IGU7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdWJzY3JpYmVPbmNlQ2hhbm5lbC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aE9uY2U7IGkrKykge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3Vic2NyaWJlT25jZUNoYW5uZWxbaV0uY2FsbGJhY2soZGF0YSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGVycm9yID0gZTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnN1YnNjcmliZU9uY2VDaGFubmVsLmxlbmd0aCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pc0ZpcmluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmFmdGVyRmlyZSgpO1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNyZWF0ZVN1YnNjcmlwdGlvbihjYWxsYmFjaywgY2hhbm5lbCwgY2FuY2VsbGF0aW9uVG9rZW4pIHtcbiAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XG4gICAgICAgIGNvbnN0IHN1YnNjcmlwdGlvbiA9IHtcbiAgICAgICAgICAgIGNhbGxiYWNrXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGZhY2FkZSA9IHtcbiAgICAgICAgICAgIGNhbmNlbCgpIHtcbiAgICAgICAgICAgICAgICB0aGF0LmNhbmNlbChzdWJzY3JpcHRpb24sIGNoYW5uZWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBpZiAoY2FuY2VsbGF0aW9uVG9rZW4gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY2FuY2VsbGF0aW9uVG9rZW4uYWRkQ2FuY2VsYWJsZSgoKSA9PiB0aGF0LmNhbmNlbChzdWJzY3JpcHRpb24sIGNoYW5uZWwpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5pc0ZpcmluZykge1xuICAgICAgICAgICAgdGhpcy5vbkFmdGVyRmlyZS5wdXNoKCgpID0+IGNoYW5uZWwucHVzaChzdWJzY3JpcHRpb24pKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNoYW5uZWwucHVzaChzdWJzY3JpcHRpb24pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IHN1YnNjcmlwdGlvbiwgZmFjYWRlIH07XG4gICAgfVxuICAgIGNhbmNlbChzdWJzY3JpcHRpb24sIGNoYW5uZWwpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBsZXQgaW5kZXggPSBjaGFubmVsLmluZGV4T2Yoc3Vic2NyaXB0aW9uKTtcbiAgICAgICAgaWYgKGluZGV4ID49IDApIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5pc0ZpcmluZykge1xuICAgICAgICAgICAgICAgIGNoYW5uZWwuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaGFzU3Vic2NyaXB0aW9ucygpKSB7XG4gICAgICAgICAgICAgICAgICAgIChfYSA9IHRoaXMub25FbXB0eSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmNhbGwodGhpcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkFmdGVyRmlyZS5wdXNoKCgpID0+IHRoaXMuY2FuY2VsKHN1YnNjcmlwdGlvbiwgY2hhbm5lbCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5FdmVudEVtaXR0ZXIgPSBFdmVudEVtaXR0ZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1ldmVudF9lbWl0dGVyLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy51bndyYXBPYmplY3RSZWN1cnNpdmUgPSBleHBvcnRzLmdldFZhbHVlT2YgPSB2b2lkIDA7XG5jb25zdCBhdXJ1bWpzX2pzXzEgPSByZXF1aXJlKFwiLi4vYXVydW1qcy5qc1wiKTtcbmNvbnN0IGRhdGFfc291cmNlX2pzXzEgPSByZXF1aXJlKFwiLi4vc3RyZWFtL2RhdGFfc291cmNlLmpzXCIpO1xuY29uc3QgZHVwbGV4X2RhdGFfc291cmNlX2pzXzEgPSByZXF1aXJlKFwiLi4vc3RyZWFtL2R1cGxleF9kYXRhX3NvdXJjZS5qc1wiKTtcbmNvbnN0IHN0cmVhbV9qc18xID0gcmVxdWlyZShcIi4uL3N0cmVhbS9zdHJlYW0uanNcIik7XG5mdW5jdGlvbiBnZXRWYWx1ZU9mKHNvdXJjZU9yUHJpbWl0aXZlKSB7XG4gICAgaWYgKHNvdXJjZU9yUHJpbWl0aXZlIGluc3RhbmNlb2YgZGF0YV9zb3VyY2VfanNfMS5EYXRhU291cmNlIHx8IHNvdXJjZU9yUHJpbWl0aXZlIGluc3RhbmNlb2YgZHVwbGV4X2RhdGFfc291cmNlX2pzXzEuRHVwbGV4RGF0YVNvdXJjZSB8fCBzb3VyY2VPclByaW1pdGl2ZSBpbnN0YW5jZW9mIHN0cmVhbV9qc18xLlN0cmVhbSkge1xuICAgICAgICByZXR1cm4gc291cmNlT3JQcmltaXRpdmUudmFsdWU7XG4gICAgfVxuICAgIGlmIChzb3VyY2VPclByaW1pdGl2ZSBpbnN0YW5jZW9mIGRhdGFfc291cmNlX2pzXzEuQXJyYXlEYXRhU291cmNlKSB7XG4gICAgICAgIHJldHVybiBzb3VyY2VPclByaW1pdGl2ZS5nZXREYXRhKCk7XG4gICAgfVxuICAgIHJldHVybiBzb3VyY2VPclByaW1pdGl2ZTtcbn1cbmV4cG9ydHMuZ2V0VmFsdWVPZiA9IGdldFZhbHVlT2Y7XG5mdW5jdGlvbiB1bndyYXBPYmplY3RSZWN1cnNpdmUob2JqZWN0KSB7XG4gICAgaWYgKG9iamVjdCBpbnN0YW5jZW9mIGRhdGFfc291cmNlX2pzXzEuRGF0YVNvdXJjZSB8fCBvYmplY3QgaW5zdGFuY2VvZiBkdXBsZXhfZGF0YV9zb3VyY2VfanNfMS5EdXBsZXhEYXRhU291cmNlIHx8IG9iamVjdCBpbnN0YW5jZW9mIHN0cmVhbV9qc18xLlN0cmVhbSkge1xuICAgICAgICAvL0B0cy1pZ25vcmVcbiAgICAgICAgcmV0dXJuIHVud3JhcE9iamVjdFJlY3Vyc2l2ZShvYmplY3QudmFsdWUpO1xuICAgIH1cbiAgICBpZiAob2JqZWN0IGluc3RhbmNlb2YgZGF0YV9zb3VyY2VfanNfMS5BcnJheURhdGFTb3VyY2UpIHtcbiAgICAgICAgLy9AdHMtaWdub3JlXG4gICAgICAgIHJldHVybiB1bndyYXBPYmplY3RSZWN1cnNpdmUob2JqZWN0LnRvQXJyYXkoKSk7XG4gICAgfVxuICAgIGlmIChvYmplY3QgaW5zdGFuY2VvZiBhdXJ1bWpzX2pzXzEuT2JqZWN0RGF0YVNvdXJjZSkge1xuICAgICAgICAvL0B0cy1pZ25vcmVcbiAgICAgICAgcmV0dXJuIHVud3JhcE9iamVjdFJlY3Vyc2l2ZShvYmplY3QuZ2V0RGF0YSgpKTtcbiAgICB9XG4gICAgaWYgKG9iamVjdCBpbnN0YW5jZW9mIGR1cGxleF9kYXRhX3NvdXJjZV9qc18xLkR1cGxleERhdGFTb3VyY2UpIHtcbiAgICAgICAgLy9AdHMtaWdub3JlXG4gICAgICAgIHJldHVybiB1bndyYXBPYmplY3RSZWN1cnNpdmUob2JqZWN0LnZhbHVlKTtcbiAgICB9XG4gICAgaWYgKG9iamVjdCBpbnN0YW5jZW9mIHN0cmVhbV9qc18xLlN0cmVhbSkge1xuICAgICAgICAvL0B0cy1pZ25vcmVcbiAgICAgICAgcmV0dXJuIHVud3JhcE9iamVjdFJlY3Vyc2l2ZShvYmplY3QudmFsdWUpO1xuICAgIH1cbiAgICBpZiAoQXJyYXkuaXNBcnJheShvYmplY3QpKSB7XG4gICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICByZXR1cm4gb2JqZWN0Lm1hcCh1bndyYXBPYmplY3RSZWN1cnNpdmUpO1xuICAgIH1cbiAgICBpZiAob2JqZWN0IGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHt9O1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBvYmplY3QpIHtcbiAgICAgICAgICAgIHJlc3VsdFtrZXldID0gdW53cmFwT2JqZWN0UmVjdXJzaXZlKG9iamVjdFtrZXldKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICAvL0B0cy1pZ25vcmVcbiAgICByZXR1cm4gb2JqZWN0O1xufVxuZXhwb3J0cy51bndyYXBPYmplY3RSZWN1cnNpdmUgPSB1bndyYXBPYmplY3RSZWN1cnNpdmU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zb3VyY2VzLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5yZXNvbHZlQ2hpbGRyZW4gPSB2b2lkIDA7XG5jb25zdCBkYXRhX3NvdXJjZV9qc18xID0gcmVxdWlyZShcIi4uL3N0cmVhbS9kYXRhX3NvdXJjZS5qc1wiKTtcbmZ1bmN0aW9uIHJlc29sdmVDaGlsZHJlbihjaGlsZHJlbiwgY2FuY2VsbGF0aW9uVG9rZW4sIHZhbGlkYXRpb24pIHtcbiAgICBjb25zdCBjaHVua3MgPSBwcm9jZXNzKGNoaWxkcmVuKTtcbiAgICBjb25zdCByZXN1bHQgPSBkYXRhX3NvdXJjZV9qc18xLkFycmF5RGF0YVNvdXJjZS5mcm9tTXVsdGlwbGVTb3VyY2VzKGNodW5rcywgY2FuY2VsbGF0aW9uVG9rZW4pO1xuICAgIGlmICh2YWxpZGF0aW9uKSB7XG4gICAgICAgIHJlc3VsdC5saXN0ZW4oKGMpID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCAoYy5vcGVyYXRpb24pIHtcbiAgICAgICAgICAgICAgICBjYXNlICdhZGQnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ3JlcGxhY2UnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ21lcmdlJzpcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIGMuaXRlbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb24oaXRlbSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIGNhbmNlbGxhdGlvblRva2VuKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmV4cG9ydHMucmVzb2x2ZUNoaWxkcmVuID0gcmVzb2x2ZUNoaWxkcmVuO1xuZnVuY3Rpb24gcHJvY2VzcyhjaGlsZHJlbikge1xuICAgIGNvbnN0IGNodW5rcyA9IFtdO1xuICAgIGxldCBjdXJyZW50Q2h1bmsgPSBbXTtcbiAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIGNoaWxkcmVuKSB7XG4gICAgICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIGRhdGFfc291cmNlX2pzXzEuQXJyYXlEYXRhU291cmNlKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudENodW5rLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGNodW5rcy5wdXNoKGN1cnJlbnRDaHVuayk7XG4gICAgICAgICAgICAgICAgY3VycmVudENodW5rLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjaHVua3MucHVzaChjaGlsZCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY2hpbGQgaW5zdGFuY2VvZiBkYXRhX3NvdXJjZV9qc18xLkRhdGFTb3VyY2UpIHtcbiAgICAgICAgICAgIGN1cnJlbnRDaHVuay5wdXNoKGNoaWxkKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjaGlsZCBpbnN0YW5jZW9mIGRhdGFfc291cmNlX2pzXzEuRGF0YVNvdXJjZSkge1xuICAgICAgICAgICAgY3VycmVudENodW5rLnB1c2goY2hpbGQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNoaWxkIGluc3RhbmNlb2YgZGF0YV9zb3VyY2VfanNfMS5EYXRhU291cmNlKSB7XG4gICAgICAgICAgICBjdXJyZW50Q2h1bmsucHVzaChjaGlsZCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShjaGlsZCkpIHtcbiAgICAgICAgICAgIGNodW5rcy5wdXNoKC4uLnByb2Nlc3MoY2hpbGQpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGN1cnJlbnRDaHVuay5wdXNoKGNoaWxkKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoY3VycmVudENodW5rLmxlbmd0aCkge1xuICAgICAgICBjaHVua3MucHVzaChjdXJyZW50Q2h1bmspO1xuICAgIH1cbiAgICByZXR1cm4gY2h1bmtzO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dHJhbnNjbHVzaW9uLmpzLm1hcCIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCJ2YXIgZ2V0UHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YgPyAob2JqKSA9PiAoT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iaikpIDogKG9iaikgPT4gKG9iai5fX3Byb3RvX18pO1xudmFyIGxlYWZQcm90b3R5cGVzO1xuLy8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4vLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbi8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuLy8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4vLyBtb2RlICYgMTY6IHJldHVybiB2YWx1ZSB3aGVuIGl0J3MgUHJvbWlzZS1saWtlXG4vLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuXHRpZihtb2RlICYgMSkgdmFsdWUgPSB0aGlzKHZhbHVlKTtcblx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcblx0aWYodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSkge1xuXHRcdGlmKChtb2RlICYgNCkgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuXHRcdGlmKChtb2RlICYgMTYpICYmIHR5cGVvZiB2YWx1ZS50aGVuID09PSAnZnVuY3Rpb24nKSByZXR1cm4gdmFsdWU7XG5cdH1cblx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcblx0dmFyIGRlZiA9IHt9O1xuXHRsZWFmUHJvdG90eXBlcyA9IGxlYWZQcm90b3R5cGVzIHx8IFtudWxsLCBnZXRQcm90byh7fSksIGdldFByb3RvKFtdKSwgZ2V0UHJvdG8oZ2V0UHJvdG8pXTtcblx0Zm9yKHZhciBjdXJyZW50ID0gbW9kZSAmIDIgJiYgdmFsdWU7IHR5cGVvZiBjdXJyZW50ID09ICdvYmplY3QnICYmICF+bGVhZlByb3RvdHlwZXMuaW5kZXhPZihjdXJyZW50KTsgY3VycmVudCA9IGdldFByb3RvKGN1cnJlbnQpKSB7XG5cdFx0T2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoY3VycmVudCkuZm9yRWFjaCgoa2V5KSA9PiAoZGVmW2tleV0gPSAoKSA9PiAodmFsdWVba2V5XSkpKTtcblx0fVxuXHRkZWZbJ2RlZmF1bHQnXSA9ICgpID0+ICh2YWx1ZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChucywgZGVmKTtcblx0cmV0dXJuIG5zO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmYgPSB7fTtcbi8vIFRoaXMgZmlsZSBjb250YWlucyBvbmx5IHRoZSBlbnRyeSBjaHVuay5cbi8vIFRoZSBjaHVuayBsb2FkaW5nIGZ1bmN0aW9uIGZvciBhZGRpdGlvbmFsIGNodW5rc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5lID0gKGNodW5rSWQpID0+IHtcblx0cmV0dXJuIFByb21pc2UuYWxsKE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uZikucmVkdWNlKChwcm9taXNlcywga2V5KSA9PiB7XG5cdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5mW2tleV0oY2h1bmtJZCwgcHJvbWlzZXMpO1xuXHRcdHJldHVybiBwcm9taXNlcztcblx0fSwgW10pKTtcbn07IiwiLy8gVGhpcyBmdW5jdGlvbiBhbGxvdyB0byByZWZlcmVuY2UgYXN5bmMgY2h1bmtzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnUgPSAoY2h1bmtJZCkgPT4ge1xuXHQvLyByZXR1cm4gdXJsIGZvciBmaWxlbmFtZXMgYmFzZWQgb24gdGVtcGxhdGVcblx0cmV0dXJuIFwic3RhdGljL2pzL1wiICsgY2h1bmtJZCArIFwiLmJ1bmRsZS5qc1wiO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwidmFyIGluUHJvZ3Jlc3MgPSB7fTtcbnZhciBkYXRhV2VicGFja1ByZWZpeCA9IFwiYXVydW0ub3JnOlwiO1xuLy8gbG9hZFNjcmlwdCBmdW5jdGlvbiB0byBsb2FkIGEgc2NyaXB0IHZpYSBzY3JpcHQgdGFnXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmwgPSAodXJsLCBkb25lLCBrZXksIGNodW5rSWQpID0+IHtcblx0aWYoaW5Qcm9ncmVzc1t1cmxdKSB7IGluUHJvZ3Jlc3NbdXJsXS5wdXNoKGRvbmUpOyByZXR1cm47IH1cblx0dmFyIHNjcmlwdCwgbmVlZEF0dGFjaDtcblx0aWYoa2V5ICE9PSB1bmRlZmluZWQpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBzY3JpcHRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgcyA9IHNjcmlwdHNbaV07XG5cdFx0XHRpZihzLmdldEF0dHJpYnV0ZShcInNyY1wiKSA9PSB1cmwgfHwgcy5nZXRBdHRyaWJ1dGUoXCJkYXRhLXdlYnBhY2tcIikgPT0gZGF0YVdlYnBhY2tQcmVmaXggKyBrZXkpIHsgc2NyaXB0ID0gczsgYnJlYWs7IH1cblx0XHR9XG5cdH1cblx0aWYoIXNjcmlwdCkge1xuXHRcdG5lZWRBdHRhY2ggPSB0cnVlO1xuXHRcdHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuXG5cdFx0c2NyaXB0LmNoYXJzZXQgPSAndXRmLTgnO1xuXHRcdHNjcmlwdC50aW1lb3V0ID0gMTIwO1xuXHRcdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKSB7XG5cdFx0XHRzY3JpcHQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgX193ZWJwYWNrX3JlcXVpcmVfXy5uYyk7XG5cdFx0fVxuXHRcdHNjcmlwdC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXdlYnBhY2tcIiwgZGF0YVdlYnBhY2tQcmVmaXggKyBrZXkpO1xuXHRcdHNjcmlwdC5zcmMgPSB1cmw7XG5cdH1cblx0aW5Qcm9ncmVzc1t1cmxdID0gW2RvbmVdO1xuXHR2YXIgb25TY3JpcHRDb21wbGV0ZSA9IChwcmV2LCBldmVudCkgPT4ge1xuXHRcdC8vIGF2b2lkIG1lbSBsZWFrcyBpbiBJRS5cblx0XHRzY3JpcHQub25lcnJvciA9IHNjcmlwdC5vbmxvYWQgPSBudWxsO1xuXHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcblx0XHR2YXIgZG9uZUZucyA9IGluUHJvZ3Jlc3NbdXJsXTtcblx0XHRkZWxldGUgaW5Qcm9ncmVzc1t1cmxdO1xuXHRcdHNjcmlwdC5wYXJlbnROb2RlICYmIHNjcmlwdC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHNjcmlwdCk7XG5cdFx0ZG9uZUZucyAmJiBkb25lRm5zLmZvckVhY2goKGZuKSA9PiAoZm4oZXZlbnQpKSk7XG5cdFx0aWYocHJldikgcmV0dXJuIHByZXYoZXZlbnQpO1xuXHR9O1xuXHR2YXIgdGltZW91dCA9IHNldFRpbWVvdXQob25TY3JpcHRDb21wbGV0ZS5iaW5kKG51bGwsIHVuZGVmaW5lZCwgeyB0eXBlOiAndGltZW91dCcsIHRhcmdldDogc2NyaXB0IH0pLCAxMjAwMDApO1xuXHRzY3JpcHQub25lcnJvciA9IG9uU2NyaXB0Q29tcGxldGUuYmluZChudWxsLCBzY3JpcHQub25lcnJvcik7XG5cdHNjcmlwdC5vbmxvYWQgPSBvblNjcmlwdENvbXBsZXRlLmJpbmQobnVsbCwgc2NyaXB0Lm9ubG9hZCk7XG5cdG5lZWRBdHRhY2ggJiYgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xufTsiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi4vXCI7IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwiYXBwXCI6IDBcbn07XG5cbl9fd2VicGFja19yZXF1aXJlX18uZi5qID0gKGNodW5rSWQsIHByb21pc2VzKSA9PiB7XG5cdFx0Ly8gSlNPTlAgY2h1bmsgbG9hZGluZyBmb3IgamF2YXNjcmlwdFxuXHRcdHZhciBpbnN0YWxsZWRDaHVua0RhdGEgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSA/IGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA6IHVuZGVmaW5lZDtcblx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEgIT09IDApIHsgLy8gMCBtZWFucyBcImFscmVhZHkgaW5zdGFsbGVkXCIuXG5cblx0XHRcdC8vIGEgUHJvbWlzZSBtZWFucyBcImN1cnJlbnRseSBsb2FkaW5nXCIuXG5cdFx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEpIHtcblx0XHRcdFx0cHJvbWlzZXMucHVzaChpbnN0YWxsZWRDaHVua0RhdGFbMl0pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYodHJ1ZSkgeyAvLyBhbGwgY2h1bmtzIGhhdmUgSlNcblx0XHRcdFx0XHQvLyBzZXR1cCBQcm9taXNlIGluIGNodW5rIGNhY2hlXG5cdFx0XHRcdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiAoaW5zdGFsbGVkQ2h1bmtEYXRhID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gW3Jlc29sdmUsIHJlamVjdF0pKTtcblx0XHRcdFx0XHRwcm9taXNlcy5wdXNoKGluc3RhbGxlZENodW5rRGF0YVsyXSA9IHByb21pc2UpO1xuXG5cdFx0XHRcdFx0Ly8gc3RhcnQgY2h1bmsgbG9hZGluZ1xuXHRcdFx0XHRcdHZhciB1cmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBfX3dlYnBhY2tfcmVxdWlyZV9fLnUoY2h1bmtJZCk7XG5cdFx0XHRcdFx0Ly8gY3JlYXRlIGVycm9yIGJlZm9yZSBzdGFjayB1bndvdW5kIHRvIGdldCB1c2VmdWwgc3RhY2t0cmFjZSBsYXRlclxuXHRcdFx0XHRcdHZhciBlcnJvciA9IG5ldyBFcnJvcigpO1xuXHRcdFx0XHRcdHZhciBsb2FkaW5nRW5kZWQgPSAoZXZlbnQpID0+IHtcblx0XHRcdFx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpKSB7XG5cdFx0XHRcdFx0XHRcdGluc3RhbGxlZENodW5rRGF0YSA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcblx0XHRcdFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhICE9PSAwKSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSB1bmRlZmluZWQ7XG5cdFx0XHRcdFx0XHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSkge1xuXHRcdFx0XHRcdFx0XHRcdHZhciBlcnJvclR5cGUgPSBldmVudCAmJiAoZXZlbnQudHlwZSA9PT0gJ2xvYWQnID8gJ21pc3NpbmcnIDogZXZlbnQudHlwZSk7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIHJlYWxTcmMgPSBldmVudCAmJiBldmVudC50YXJnZXQgJiYgZXZlbnQudGFyZ2V0LnNyYztcblx0XHRcdFx0XHRcdFx0XHRlcnJvci5tZXNzYWdlID0gJ0xvYWRpbmcgY2h1bmsgJyArIGNodW5rSWQgKyAnIGZhaWxlZC5cXG4oJyArIGVycm9yVHlwZSArICc6ICcgKyByZWFsU3JjICsgJyknO1xuXHRcdFx0XHRcdFx0XHRcdGVycm9yLm5hbWUgPSAnQ2h1bmtMb2FkRXJyb3InO1xuXHRcdFx0XHRcdFx0XHRcdGVycm9yLnR5cGUgPSBlcnJvclR5cGU7XG5cdFx0XHRcdFx0XHRcdFx0ZXJyb3IucmVxdWVzdCA9IHJlYWxTcmM7XG5cdFx0XHRcdFx0XHRcdFx0aW5zdGFsbGVkQ2h1bmtEYXRhWzFdKGVycm9yKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5sKHVybCwgbG9hZGluZ0VuZGVkLCBcImNodW5rLVwiICsgY2h1bmtJZCwgY2h1bmtJZCk7XG5cdFx0XHRcdH0gZWxzZSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHRcdFx0fVxuXHRcdH1cbn07XG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbi8vIG5vIG9uIGNodW5rcyBsb2FkZWRcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKChpZCkgPT4gKGluc3RhbGxlZENodW5rc1tpZF0gIT09IDApKSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmthdXJ1bV9vcmdcIl0gPSBzZWxmW1wid2VicGFja0NodW5rYXVydW1fb3JnXCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsImltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJ2F1cnVtanMnO1xuXG4vLyBlbmFibGVEZWJ1Z01vZGUoKTtcbkV2ZW50RW1pdHRlci5zZXRTdWJzY3JpcHRpb25MZWFrV2FybmluZ1RocmVzaG9sZCgzMDApO1xuaW1wb3J0KCcuL21haW4nKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==