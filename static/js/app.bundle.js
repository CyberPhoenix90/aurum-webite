/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/aurumjs/prebuilt/esnext/aurum_server/aurum_server_client.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/aurumjs/prebuilt/esnext/aurum_server/aurum_server_client.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RemoteProtocol": () => (/* binding */ RemoteProtocol),
/* harmony export */   "getRemoteFunction": () => (/* binding */ getRemoteFunction),
/* harmony export */   "syncArrayDataSource": () => (/* binding */ syncArrayDataSource),
/* harmony export */   "syncDataSource": () => (/* binding */ syncDataSource),
/* harmony export */   "syncDuplexDataSource": () => (/* binding */ syncDuplexDataSource),
/* harmony export */   "syncMapDataSource": () => (/* binding */ syncMapDataSource),
/* harmony export */   "syncObjectDataSource": () => (/* binding */ syncObjectDataSource),
/* harmony export */   "syncSetDataSource": () => (/* binding */ syncSetDataSource)
/* harmony export */ });
/* harmony import */ var _utilities_cancellation_token_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities/cancellation_token.js */ "./node_modules/aurumjs/prebuilt/esnext/utilities/cancellation_token.js");

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
})(RemoteProtocol || (RemoteProtocol = {}));
const pendingRPCResponses = new Map();
function getRemoteFunction(aurumServerInfo, cancellation) {
    return syncFunction(aurumServerInfo, cancellation);
}
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
async function syncObjectDataSource(source, aurumServerInfo, cancellation) {
    const key = makeKey(aurumServerInfo.protocol, aurumServerInfo.host);
    await ensureConnection(key, aurumServerInfo.protocol, aurumServerInfo.host);
    connections.get(key).syncObjectDataSource(source, aurumServerInfo.id, aurumServerInfo.authenticationToken, cancellation);
}
async function syncMapDataSource(source, aurumServerInfo, cancellation) {
    const key = makeKey(aurumServerInfo.protocol, aurumServerInfo.host);
    await ensureConnection(key, aurumServerInfo.protocol, aurumServerInfo.host);
    connections.get(key).syncMapDataSource(source, aurumServerInfo.id, aurumServerInfo.authenticationToken, cancellation);
}
async function syncDataSource(source, aurumServerInfo, cancellation) {
    const key = makeKey(aurumServerInfo.protocol, aurumServerInfo.host);
    await ensureConnection(key, aurumServerInfo.protocol, aurumServerInfo.host);
    connections.get(key).syncDataSource(source, aurumServerInfo.id, aurumServerInfo.authenticationToken, cancellation);
}
function makeKey(protocol, host) {
    return `${resolveProtocol(protocol)}://${resolveHost(host)}`;
}
async function syncArrayDataSource(source, aurumServerInfo, cancellation) {
    const key = makeKey(aurumServerInfo.protocol, aurumServerInfo.host);
    await ensureConnection(key, aurumServerInfo.protocol, aurumServerInfo.host);
    connections.get(key).syncArrayDataSource(source, aurumServerInfo.id, aurumServerInfo.authenticationToken, cancellation);
}
async function syncDuplexDataSource(source, aurumServerInfo, cancellation) {
    const key = makeKey(aurumServerInfo.protocol, aurumServerInfo.host);
    await ensureConnection(key, aurumServerInfo.protocol, aurumServerInfo.host);
    connections.get(key).syncDuplexDataSource(source, aurumServerInfo.id, aurumServerInfo.authenticationToken, cancellation);
}
const connections = new Map();
const pendingConnections = new Map();
class AurumServerClient {
    masterToken;
    connection;
    synchedDataSources;
    synchedDuplexDataSources;
    synchedArrayDataSources;
    synchedMapDataSources;
    synchedObjectDataSources;
    synchedSetDataSources;
    constructor(connection) {
        this.masterToken = new _utilities_cancellation_token_js__WEBPACK_IMPORTED_MODULE_0__.CancellationToken();
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
        }, _utilities_cancellation_token_js__WEBPACK_IMPORTED_MODULE_0__.CancellationToken.fromMultiple([cancellation, this.masterToken]));
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
        let pendingToken = new _utilities_cancellation_token_js__WEBPACK_IMPORTED_MODULE_0__.CancellationToken();
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

/***/ "./node_modules/aurumjs/prebuilt/esnext/aurumjs.js":
/*!*********************************************************!*\
  !*** ./node_modules/aurumjs/prebuilt/esnext/aurumjs.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ArrayAurumElement": () => (/* reexport safe */ _rendering_aurum_element_js__WEBPACK_IMPORTED_MODULE_1__.ArrayAurumElement),
/* harmony export */   "ArrayDataSource": () => (/* reexport safe */ _stream_data_source_js__WEBPACK_IMPORTED_MODULE_9__.ArrayDataSource),
/* harmony export */   "Aurum": () => (/* reexport safe */ _utilities_aurum_js__WEBPACK_IMPORTED_MODULE_18__.Aurum),
/* harmony export */   "AurumElement": () => (/* reexport safe */ _rendering_aurum_element_js__WEBPACK_IMPORTED_MODULE_1__.AurumElement),
/* harmony export */   "AurumRouter": () => (/* reexport safe */ _builtin_components_router_js__WEBPACK_IMPORTED_MODULE_5__.AurumRouter),
/* harmony export */   "CancellationToken": () => (/* reexport safe */ _utilities_cancellation_token_js__WEBPACK_IMPORTED_MODULE_19__.CancellationToken),
/* harmony export */   "DataFlow": () => (/* reexport safe */ _stream_duplex_data_source_operators_js__WEBPACK_IMPORTED_MODULE_14__.DataFlow),
/* harmony export */   "DataFlowBoth": () => (/* reexport safe */ _stream_duplex_data_source_operators_js__WEBPACK_IMPORTED_MODULE_14__.DataFlowBoth),
/* harmony export */   "DataSource": () => (/* reexport safe */ _stream_data_source_js__WEBPACK_IMPORTED_MODULE_9__.DataSource),
/* harmony export */   "DefaultRoute": () => (/* reexport safe */ _builtin_components_router_js__WEBPACK_IMPORTED_MODULE_5__.DefaultRoute),
/* harmony export */   "DefaultSwitchCase": () => (/* reexport safe */ _builtin_components_switch_js__WEBPACK_IMPORTED_MODULE_8__.DefaultSwitchCase),
/* harmony export */   "DuplexDataSource": () => (/* reexport safe */ _stream_duplex_data_source_js__WEBPACK_IMPORTED_MODULE_10__.DuplexDataSource),
/* harmony export */   "ErrorBoundary": () => (/* reexport safe */ _builtin_components_error_boundary_js__WEBPACK_IMPORTED_MODULE_7__.ErrorBoundary),
/* harmony export */   "EventEmitter": () => (/* reexport safe */ _utilities_event_emitter_js__WEBPACK_IMPORTED_MODULE_20__.EventEmitter),
/* harmony export */   "FilteredArrayView": () => (/* reexport safe */ _stream_data_source_js__WEBPACK_IMPORTED_MODULE_9__.FilteredArrayView),
/* harmony export */   "FlattenedArrayView": () => (/* reexport safe */ _stream_data_source_js__WEBPACK_IMPORTED_MODULE_9__.FlattenedArrayView),
/* harmony export */   "LimitedArrayView": () => (/* reexport safe */ _stream_data_source_js__WEBPACK_IMPORTED_MODULE_9__.LimitedArrayView),
/* harmony export */   "MapDataSource": () => (/* reexport safe */ _stream_data_source_js__WEBPACK_IMPORTED_MODULE_9__.MapDataSource),
/* harmony export */   "MappedArrayView": () => (/* reexport safe */ _stream_data_source_js__WEBPACK_IMPORTED_MODULE_9__.MappedArrayView),
/* harmony export */   "ObjectDataSource": () => (/* reexport safe */ _stream_object_data_source_js__WEBPACK_IMPORTED_MODULE_11__.ObjectDataSource),
/* harmony export */   "OperationType": () => (/* reexport safe */ _stream_operator_model_js__WEBPACK_IMPORTED_MODULE_15__.OperationType),
/* harmony export */   "RemoteProtocol": () => (/* reexport safe */ _aurum_server_aurum_server_client_js__WEBPACK_IMPORTED_MODULE_28__.RemoteProtocol),
/* harmony export */   "ReversedArrayView": () => (/* reexport safe */ _stream_data_source_js__WEBPACK_IMPORTED_MODULE_9__.ReversedArrayView),
/* harmony export */   "Route": () => (/* reexport safe */ _builtin_components_router_js__WEBPACK_IMPORTED_MODULE_5__.Route),
/* harmony export */   "SetDataSource": () => (/* reexport safe */ _stream_data_source_js__WEBPACK_IMPORTED_MODULE_9__.SetDataSource),
/* harmony export */   "SingularAurumElement": () => (/* reexport safe */ _rendering_aurum_element_js__WEBPACK_IMPORTED_MODULE_1__.SingularAurumElement),
/* harmony export */   "SlicedArrayView": () => (/* reexport safe */ _stream_data_source_js__WEBPACK_IMPORTED_MODULE_9__.SlicedArrayView),
/* harmony export */   "SortedArrayView": () => (/* reexport safe */ _stream_data_source_js__WEBPACK_IMPORTED_MODULE_9__.SortedArrayView),
/* harmony export */   "StorageStream": () => (/* reexport safe */ _utilities_storage_stream_js__WEBPACK_IMPORTED_MODULE_24__.StorageStream),
/* harmony export */   "Stream": () => (/* reexport safe */ _stream_stream_js__WEBPACK_IMPORTED_MODULE_16__.Stream),
/* harmony export */   "Suspense": () => (/* reexport safe */ _builtin_components_suspense_js__WEBPACK_IMPORTED_MODULE_6__.Suspense),
/* harmony export */   "Switch": () => (/* reexport safe */ _builtin_components_switch_js__WEBPACK_IMPORTED_MODULE_8__.Switch),
/* harmony export */   "SwitchCase": () => (/* reexport safe */ _builtin_components_switch_js__WEBPACK_IMPORTED_MODULE_8__.SwitchCase),
/* harmony export */   "TreeDataSource": () => (/* reexport safe */ _stream_tree_data_source_js__WEBPACK_IMPORTED_MODULE_12__.TreeDataSource),
/* harmony export */   "UniqueArrayView": () => (/* reexport safe */ _stream_data_source_js__WEBPACK_IMPORTED_MODULE_9__.UniqueArrayView),
/* harmony export */   "UrlStorage": () => (/* reexport safe */ _utilities_url_storage_js__WEBPACK_IMPORTED_MODULE_25__.UrlStorage),
/* harmony export */   "VDOM": () => (/* reexport safe */ _nodes_vdom_adapter_js__WEBPACK_IMPORTED_MODULE_4__.VDOM),
/* harmony export */   "Webcomponent": () => (/* reexport safe */ _rendering_webcomponent_js__WEBPACK_IMPORTED_MODULE_0__.Webcomponent),
/* harmony export */   "animate": () => (/* reexport safe */ _stream_emitters_js__WEBPACK_IMPORTED_MODULE_17__.animate),
/* harmony export */   "aurumClassName": () => (/* reexport safe */ _utilities_classname_js__WEBPACK_IMPORTED_MODULE_21__.aurumClassName),
/* harmony export */   "aurumElementModelIdentitiy": () => (/* reexport safe */ _rendering_aurum_element_js__WEBPACK_IMPORTED_MODULE_1__.aurumElementModelIdentitiy),
/* harmony export */   "aurumToHTML": () => (/* reexport safe */ _builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_2__.aurumToHTML),
/* harmony export */   "aurumToString": () => (/* reexport safe */ _nodes_string_adapter_js__WEBPACK_IMPORTED_MODULE_3__.aurumToString),
/* harmony export */   "aurumToVDOM": () => (/* reexport safe */ _nodes_vdom_adapter_js__WEBPACK_IMPORTED_MODULE_4__.aurumToVDOM),
/* harmony export */   "camelCaseToKebabCase": () => (/* reexport safe */ _utilities_classname_js__WEBPACK_IMPORTED_MODULE_21__.camelCaseToKebabCase),
/* harmony export */   "combineAttribute": () => (/* reexport safe */ _utilities_classname_js__WEBPACK_IMPORTED_MODULE_21__.combineAttribute),
/* harmony export */   "combineClass": () => (/* reexport safe */ _utilities_classname_js__WEBPACK_IMPORTED_MODULE_21__.combineClass),
/* harmony export */   "combineStyle": () => (/* reexport safe */ _utilities_classname_js__WEBPACK_IMPORTED_MODULE_21__.combineStyle),
/* harmony export */   "createAPI": () => (/* reexport safe */ _rendering_aurum_element_js__WEBPACK_IMPORTED_MODULE_1__.createAPI),
/* harmony export */   "createLifeCycle": () => (/* reexport safe */ _rendering_aurum_element_js__WEBPACK_IMPORTED_MODULE_1__.createLifeCycle),
/* harmony export */   "createRenderSession": () => (/* reexport safe */ _rendering_aurum_element_js__WEBPACK_IMPORTED_MODULE_1__.createRenderSession),
/* harmony export */   "ddsDebounce": () => (/* reexport safe */ _stream_duplex_data_source_operators_js__WEBPACK_IMPORTED_MODULE_14__.ddsDebounce),
/* harmony export */   "ddsFilter": () => (/* reexport safe */ _stream_duplex_data_source_operators_js__WEBPACK_IMPORTED_MODULE_14__.ddsFilter),
/* harmony export */   "ddsMap": () => (/* reexport safe */ _stream_duplex_data_source_operators_js__WEBPACK_IMPORTED_MODULE_14__.ddsMap),
/* harmony export */   "ddsOneWayFlow": () => (/* reexport safe */ _stream_duplex_data_source_operators_js__WEBPACK_IMPORTED_MODULE_14__.ddsOneWayFlow),
/* harmony export */   "ddsUnique": () => (/* reexport safe */ _stream_duplex_data_source_operators_js__WEBPACK_IMPORTED_MODULE_14__.ddsUnique),
/* harmony export */   "debugMode": () => (/* reexport safe */ _debug_mode_js__WEBPACK_IMPORTED_MODULE_27__.debugMode),
/* harmony export */   "dsAccumulate": () => (/* reexport safe */ _stream_data_source_operators_js__WEBPACK_IMPORTED_MODULE_13__.dsAccumulate),
/* harmony export */   "dsAwait": () => (/* reexport safe */ _stream_data_source_operators_js__WEBPACK_IMPORTED_MODULE_13__.dsAwait),
/* harmony export */   "dsAwaitLatest": () => (/* reexport safe */ _stream_data_source_operators_js__WEBPACK_IMPORTED_MODULE_13__.dsAwaitLatest),
/* harmony export */   "dsAwaitOrdered": () => (/* reexport safe */ _stream_data_source_operators_js__WEBPACK_IMPORTED_MODULE_13__.dsAwaitOrdered),
/* harmony export */   "dsBuffer": () => (/* reexport safe */ _stream_data_source_operators_js__WEBPACK_IMPORTED_MODULE_13__.dsBuffer),
/* harmony export */   "dsCriticalSection": () => (/* reexport safe */ _stream_data_source_js__WEBPACK_IMPORTED_MODULE_9__.dsCriticalSection),
/* harmony export */   "dsCutOff": () => (/* reexport safe */ _stream_data_source_operators_js__WEBPACK_IMPORTED_MODULE_13__.dsCutOff),
/* harmony export */   "dsCutOffDynamic": () => (/* reexport safe */ _stream_data_source_operators_js__WEBPACK_IMPORTED_MODULE_13__.dsCutOffDynamic),
/* harmony export */   "dsDebounce": () => (/* reexport safe */ _stream_data_source_operators_js__WEBPACK_IMPORTED_MODULE_13__.dsDebounce),
/* harmony export */   "dsDelay": () => (/* reexport safe */ _stream_data_source_operators_js__WEBPACK_IMPORTED_MODULE_13__.dsDelay),
/* harmony export */   "dsDiff": () => (/* reexport safe */ _stream_data_source_operators_js__WEBPACK_IMPORTED_MODULE_13__.dsDiff),
/* harmony export */   "dsEven": () => (/* reexport safe */ _stream_data_source_operators_js__WEBPACK_IMPORTED_MODULE_13__.dsEven),
/* harmony export */   "dsFilter": () => (/* reexport safe */ _stream_data_source_operators_js__WEBPACK_IMPORTED_MODULE_13__.dsFilter),
/* harmony export */   "dsFilterAsync": () => (/* reexport safe */ _stream_data_source_operators_js__WEBPACK_IMPORTED_MODULE_13__.dsFilterAsync),
/* harmony export */   "dsFork": () => (/* reexport safe */ _stream_data_source_operators_js__WEBPACK_IMPORTED_MODULE_13__.dsFork),
/* harmony export */   "dsForkInline": () => (/* reexport safe */ _stream_data_source_js__WEBPACK_IMPORTED_MODULE_9__.dsForkInline),
/* harmony export */   "dsHistory": () => (/* reexport safe */ _stream_data_source_operators_js__WEBPACK_IMPORTED_MODULE_13__.dsHistory),
/* harmony export */   "dsLoadBalance": () => (/* reexport safe */ _stream_data_source_operators_js__WEBPACK_IMPORTED_MODULE_13__.dsLoadBalance),
/* harmony export */   "dsLock": () => (/* reexport safe */ _stream_data_source_operators_js__WEBPACK_IMPORTED_MODULE_13__.dsLock),
/* harmony export */   "dsLog": () => (/* reexport safe */ _stream_data_source_operators_js__WEBPACK_IMPORTED_MODULE_13__.dsLog),
/* harmony export */   "dsMap": () => (/* reexport safe */ _stream_data_source_operators_js__WEBPACK_IMPORTED_MODULE_13__.dsMap),
/* harmony export */   "dsMapAsync": () => (/* reexport safe */ _stream_data_source_operators_js__WEBPACK_IMPORTED_MODULE_13__.dsMapAsync),
/* harmony export */   "dsMax": () => (/* reexport safe */ _stream_data_source_operators_js__WEBPACK_IMPORTED_MODULE_13__.dsMax),
/* harmony export */   "dsMicroDebounce": () => (/* reexport safe */ _stream_data_source_operators_js__WEBPACK_IMPORTED_MODULE_13__.dsMicroDebounce),
/* harmony export */   "dsMin": () => (/* reexport safe */ _stream_data_source_operators_js__WEBPACK_IMPORTED_MODULE_13__.dsMin),
/* harmony export */   "dsOdd": () => (/* reexport safe */ _stream_data_source_operators_js__WEBPACK_IMPORTED_MODULE_13__.dsOdd),
/* harmony export */   "dsPick": () => (/* reexport safe */ _stream_data_source_operators_js__WEBPACK_IMPORTED_MODULE_13__.dsPick),
/* harmony export */   "dsPipe": () => (/* reexport safe */ _stream_data_source_operators_js__WEBPACK_IMPORTED_MODULE_13__.dsPipe),
/* harmony export */   "dsPipeAll": () => (/* reexport safe */ _stream_data_source_operators_js__WEBPACK_IMPORTED_MODULE_13__.dsPipeAll),
/* harmony export */   "dsPipeUp": () => (/* reexport safe */ _stream_data_source_operators_js__WEBPACK_IMPORTED_MODULE_13__.dsPipeUp),
/* harmony export */   "dsReduce": () => (/* reexport safe */ _stream_data_source_operators_js__WEBPACK_IMPORTED_MODULE_13__.dsReduce),
/* harmony export */   "dsSemaphore": () => (/* reexport safe */ _stream_data_source_operators_js__WEBPACK_IMPORTED_MODULE_13__.dsSemaphore),
/* harmony export */   "dsSkip": () => (/* reexport safe */ _stream_data_source_operators_js__WEBPACK_IMPORTED_MODULE_13__.dsSkip),
/* harmony export */   "dsSkipDynamic": () => (/* reexport safe */ _stream_data_source_operators_js__WEBPACK_IMPORTED_MODULE_13__.dsSkipDynamic),
/* harmony export */   "dsStringJoin": () => (/* reexport safe */ _stream_data_source_operators_js__WEBPACK_IMPORTED_MODULE_13__.dsStringJoin),
/* harmony export */   "dsTap": () => (/* reexport safe */ _stream_data_source_operators_js__WEBPACK_IMPORTED_MODULE_13__.dsTap),
/* harmony export */   "dsThrottle": () => (/* reexport safe */ _stream_data_source_operators_js__WEBPACK_IMPORTED_MODULE_13__.dsThrottle),
/* harmony export */   "dsThrottleFrame": () => (/* reexport safe */ _stream_data_source_operators_js__WEBPACK_IMPORTED_MODULE_13__.dsThrottleFrame),
/* harmony export */   "dsThroughputMeter": () => (/* reexport safe */ _stream_data_source_operators_js__WEBPACK_IMPORTED_MODULE_13__.dsThroughputMeter),
/* harmony export */   "dsUnique": () => (/* reexport safe */ _stream_data_source_operators_js__WEBPACK_IMPORTED_MODULE_13__.dsUnique),
/* harmony export */   "dsUpdateToken": () => (/* reexport safe */ _stream_data_source_operators_js__WEBPACK_IMPORTED_MODULE_13__.dsUpdateToken),
/* harmony export */   "enableDebugMode": () => (/* reexport safe */ _debug_mode_js__WEBPACK_IMPORTED_MODULE_27__.enableDebugMode),
/* harmony export */   "enableDiagnosticMode": () => (/* reexport safe */ _debug_mode_js__WEBPACK_IMPORTED_MODULE_27__.enableDiagnosticMode),
/* harmony export */   "getRemoteFunction": () => (/* reexport safe */ _aurum_server_aurum_server_client_js__WEBPACK_IMPORTED_MODULE_28__.getRemoteFunction),
/* harmony export */   "getValueOf": () => (/* reexport safe */ _utilities_sources_js__WEBPACK_IMPORTED_MODULE_22__.getValueOf),
/* harmony export */   "intervalEmitter": () => (/* reexport safe */ _stream_emitters_js__WEBPACK_IMPORTED_MODULE_17__.intervalEmitter),
/* harmony export */   "localStorageStream": () => (/* reexport safe */ _utilities_storage_stream_js__WEBPACK_IMPORTED_MODULE_24__.localStorageStream),
/* harmony export */   "processTransform": () => (/* reexport safe */ _stream_data_source_js__WEBPACK_IMPORTED_MODULE_9__.processTransform),
/* harmony export */   "processTransformDuplex": () => (/* reexport safe */ _stream_duplex_data_source_js__WEBPACK_IMPORTED_MODULE_10__.processTransformDuplex),
/* harmony export */   "promiseIterator": () => (/* reexport safe */ _utilities_iteration_js__WEBPACK_IMPORTED_MODULE_26__.promiseIterator),
/* harmony export */   "registerAnimationLoop": () => (/* reexport safe */ _utilities_cancellation_token_js__WEBPACK_IMPORTED_MODULE_19__.registerAnimationLoop),
/* harmony export */   "resolveChildren": () => (/* reexport safe */ _utilities_transclusion_js__WEBPACK_IMPORTED_MODULE_23__.resolveChildren),
/* harmony export */   "sessionStorageStream": () => (/* reexport safe */ _utilities_storage_stream_js__WEBPACK_IMPORTED_MODULE_24__.sessionStorageStream),
/* harmony export */   "transformAsyncIterator": () => (/* reexport safe */ _utilities_iteration_js__WEBPACK_IMPORTED_MODULE_26__.transformAsyncIterator),
/* harmony export */   "tweenEmitter": () => (/* reexport safe */ _stream_emitters_js__WEBPACK_IMPORTED_MODULE_17__.tweenEmitter),
/* harmony export */   "unwrapObjectRecursive": () => (/* reexport safe */ _utilities_sources_js__WEBPACK_IMPORTED_MODULE_22__.unwrapObjectRecursive),
/* harmony export */   "urlHashEmitter": () => (/* reexport safe */ _stream_emitters_js__WEBPACK_IMPORTED_MODULE_17__.urlHashEmitter),
/* harmony export */   "urlStorageStream": () => (/* reexport safe */ _utilities_storage_stream_js__WEBPACK_IMPORTED_MODULE_24__.urlStorageStream),
/* harmony export */   "windowSizeEmitter": () => (/* reexport safe */ _stream_emitters_js__WEBPACK_IMPORTED_MODULE_17__.windowSizeEmitter)
/* harmony export */ });
/* harmony import */ var _rendering_webcomponent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rendering/webcomponent.js */ "./node_modules/aurumjs/prebuilt/esnext/rendering/webcomponent.js");
/* harmony import */ var _rendering_aurum_element_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rendering/aurum_element.js */ "./node_modules/aurumjs/prebuilt/esnext/rendering/aurum_element.js");
/* harmony import */ var _builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./builtin_components/dom_adapter.js */ "./node_modules/aurumjs/prebuilt/esnext/builtin_components/dom_adapter.js");
/* harmony import */ var _nodes_string_adapter_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./nodes/string_adapter.js */ "./node_modules/aurumjs/prebuilt/esnext/nodes/string_adapter.js");
/* harmony import */ var _nodes_vdom_adapter_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./nodes/vdom_adapter.js */ "./node_modules/aurumjs/prebuilt/esnext/nodes/vdom_adapter.js");
/* harmony import */ var _builtin_components_router_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./builtin_components/router.js */ "./node_modules/aurumjs/prebuilt/esnext/builtin_components/router.js");
/* harmony import */ var _builtin_components_suspense_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./builtin_components/suspense.js */ "./node_modules/aurumjs/prebuilt/esnext/builtin_components/suspense.js");
/* harmony import */ var _builtin_components_error_boundary_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./builtin_components/error_boundary.js */ "./node_modules/aurumjs/prebuilt/esnext/builtin_components/error_boundary.js");
/* harmony import */ var _builtin_components_switch_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./builtin_components/switch.js */ "./node_modules/aurumjs/prebuilt/esnext/builtin_components/switch.js");
/* harmony import */ var _stream_data_source_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./stream/data_source.js */ "./node_modules/aurumjs/prebuilt/esnext/stream/data_source.js");
/* harmony import */ var _stream_duplex_data_source_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./stream/duplex_data_source.js */ "./node_modules/aurumjs/prebuilt/esnext/stream/duplex_data_source.js");
/* harmony import */ var _stream_object_data_source_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./stream/object_data_source.js */ "./node_modules/aurumjs/prebuilt/esnext/stream/object_data_source.js");
/* harmony import */ var _stream_tree_data_source_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./stream/tree_data_source.js */ "./node_modules/aurumjs/prebuilt/esnext/stream/tree_data_source.js");
/* harmony import */ var _stream_data_source_operators_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./stream/data_source_operators.js */ "./node_modules/aurumjs/prebuilt/esnext/stream/data_source_operators.js");
/* harmony import */ var _stream_duplex_data_source_operators_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./stream/duplex_data_source_operators.js */ "./node_modules/aurumjs/prebuilt/esnext/stream/duplex_data_source_operators.js");
/* harmony import */ var _stream_operator_model_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./stream/operator_model.js */ "./node_modules/aurumjs/prebuilt/esnext/stream/operator_model.js");
/* harmony import */ var _stream_stream_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./stream/stream.js */ "./node_modules/aurumjs/prebuilt/esnext/stream/stream.js");
/* harmony import */ var _stream_emitters_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./stream/emitters.js */ "./node_modules/aurumjs/prebuilt/esnext/stream/emitters.js");
/* harmony import */ var _utilities_aurum_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./utilities/aurum.js */ "./node_modules/aurumjs/prebuilt/esnext/utilities/aurum.js");
/* harmony import */ var _utilities_cancellation_token_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./utilities/cancellation_token.js */ "./node_modules/aurumjs/prebuilt/esnext/utilities/cancellation_token.js");
/* harmony import */ var _utilities_event_emitter_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./utilities/event_emitter.js */ "./node_modules/aurumjs/prebuilt/esnext/utilities/event_emitter.js");
/* harmony import */ var _utilities_classname_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./utilities/classname.js */ "./node_modules/aurumjs/prebuilt/esnext/utilities/classname.js");
/* harmony import */ var _utilities_sources_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./utilities/sources.js */ "./node_modules/aurumjs/prebuilt/esnext/utilities/sources.js");
/* harmony import */ var _utilities_transclusion_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./utilities/transclusion.js */ "./node_modules/aurumjs/prebuilt/esnext/utilities/transclusion.js");
/* harmony import */ var _utilities_storage_stream_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./utilities/storage_stream.js */ "./node_modules/aurumjs/prebuilt/esnext/utilities/storage_stream.js");
/* harmony import */ var _utilities_url_storage_js__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./utilities/url_storage.js */ "./node_modules/aurumjs/prebuilt/esnext/utilities/url_storage.js");
/* harmony import */ var _utilities_iteration_js__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./utilities/iteration.js */ "./node_modules/aurumjs/prebuilt/esnext/utilities/iteration.js");
/* harmony import */ var _debug_mode_js__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./debug_mode.js */ "./node_modules/aurumjs/prebuilt/esnext/debug_mode.js");
/* harmony import */ var _aurum_server_aurum_server_client_js__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./aurum_server/aurum_server_client.js */ "./node_modules/aurumjs/prebuilt/esnext/aurum_server/aurum_server_client.js");





























//# sourceMappingURL=aurumjs.js.map

/***/ }),

/***/ "./node_modules/aurumjs/prebuilt/esnext/builtin_components/dom_adapter.js":
/*!********************************************************************************!*\
  !*** ./node_modules/aurumjs/prebuilt/esnext/builtin_components/dom_adapter.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DomNodeCreator": () => (/* binding */ DomNodeCreator),
/* harmony export */   "aurumToHTML": () => (/* binding */ aurumToHTML)
/* harmony export */ });
/* unused harmony exports defaultEvents, defaultAttributes, processHTMLNode, createEventHandlers */
/* harmony import */ var _nodes_rendering_helpers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../nodes/rendering_helpers.js */ "./node_modules/aurumjs/prebuilt/esnext/nodes/rendering_helpers.js");
/* harmony import */ var _rendering_aurum_element_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../rendering/aurum_element.js */ "./node_modules/aurumjs/prebuilt/esnext/rendering/aurum_element.js");
/* harmony import */ var _stream_data_source_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../stream/data_source.js */ "./node_modules/aurumjs/prebuilt/esnext/stream/data_source.js");
/* harmony import */ var _stream_data_source_operators_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../stream/data_source_operators.js */ "./node_modules/aurumjs/prebuilt/esnext/stream/data_source_operators.js");
/* harmony import */ var _stream_duplex_data_source_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../stream/duplex_data_source.js */ "./node_modules/aurumjs/prebuilt/esnext/stream/duplex_data_source.js");





/**
 * @internal
 */
const defaultEvents = {
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
const defaultAttributes = ['id', 'name', 'draggable', 'tabindex', 'role', 'contenteditable', 'slot', 'title'];
function DomNodeCreator(nodeName, extraAttributes, extraEvents, extraLogic, svg = false) {
    return function (props, children, api) {
        let node;
        if (svg) {
            node = document.createElementNS('http://www.w3.org/2000/svg', nodeName);
        }
        else {
            node = document.createElement(nodeName);
        }
        if (props) {
            processHTMLNode(node, props, api.cancellationToken, extraAttributes, extraEvents);
        }
        //@ts-ignore
        const renderedChildren = (0,_rendering_aurum_element_js__WEBPACK_IMPORTED_MODULE_1__.renderInternal)(children, api.renderSession);
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
        extraLogic?.(node, props, api.cancellationToken);
        return node;
    };
}
function connectChildren(target, children) {
    if (children === undefined || children === null || children.length === 0) {
        return;
    }
    for (const child of children) {
        if (!child) {
            continue;
        }
        if (child instanceof Text || child instanceof HTMLElement || child instanceof SVGElement) {
            target.appendChild(child);
        }
        else if (child instanceof _rendering_aurum_element_js__WEBPACK_IMPORTED_MODULE_1__.AurumElement) {
            child.attachToDom(target, target.childNodes.length);
        }
        else {
            if (typeof child === 'function') {
                throw new Error('Unexpected child type passed to DOM Node: function. Did you mean to use a component? To use a component use JSX syntax such as <MyComponent/> it works even with function references. <props.myReference/>');
            }
            throw new Error(`Unexpected child type passed to DOM Node: ${children}`);
        }
    }
}
function processHTMLNode(node, props, cleanUp, extraAttributes, extraEvents) {
    createEventHandlers(node, defaultEvents, props);
    if (extraEvents) {
        createEventHandlers(node, extraEvents, props);
    }
    const dataProps = Object.keys(props).filter((e) => e.includes('-'));
    bindProps(node, defaultAttributes, props, cleanUp, dataProps);
    if (extraAttributes) {
        bindProps(node, extraAttributes, props, cleanUp);
    }
    if (props.style) {
        const result = (0,_nodes_rendering_helpers_js__WEBPACK_IMPORTED_MODULE_0__.handleStyle)(props.style, cleanUp);
        if (result instanceof _stream_data_source_js__WEBPACK_IMPORTED_MODULE_2__.DataSource) {
            result.listenAndRepeat((v) => {
                node.setAttribute('style', v);
            }, cleanUp);
        }
        else {
            node.setAttribute('style', result);
        }
    }
    if (props.class) {
        const result = (0,_nodes_rendering_helpers_js__WEBPACK_IMPORTED_MODULE_0__.handleClass)(props.class, cleanUp);
        if (result instanceof _stream_data_source_js__WEBPACK_IMPORTED_MODULE_2__.DataSource) {
            result.listenAndRepeat((v) => {
                node.className = v;
            }, cleanUp);
        }
        else {
            node.className = result;
        }
    }
}
function createEventHandlers(node, events, props) {
    for (const key in events) {
        if (props[events[key]]) {
            if (props[events[key]] instanceof _stream_data_source_js__WEBPACK_IMPORTED_MODULE_2__.DataSource) {
                //@ts-ignore
                node.addEventListener(key, (e) => props[events[key]].update(e));
            }
            else if (props[events[key]] instanceof _stream_duplex_data_source_js__WEBPACK_IMPORTED_MODULE_4__.DuplexDataSource) {
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
 * Renders Aurum content synchronously in line. In case no lifecycle sync object is provided you have to manually call fireOnAttach and dispose at the appropriate times to ensure proper lifecycle handling such as attach and detach events
 * @param content Content to render
 * @param syncLifecycle Optional lifecycle sync object. If provided the lifecycle of the rendered content will be synchronized with the provided lifecycle (meaning attach and detach events will be fired when the lifecycle fires them)
 */
function aurumToHTML(content, syncLifecycle) {
    const rs = (0,_rendering_aurum_element_js__WEBPACK_IMPORTED_MODULE_1__.createRenderSession)();
    const renderedContent = (0,_rendering_aurum_element_js__WEBPACK_IMPORTED_MODULE_1__.renderInternal)(content, rs);
    if (syncLifecycle) {
        syncLifecycle.onAttach(() => rs.attachCalls.forEach((c) => c()));
        syncLifecycle.onDetach(() => rs.sessionToken.cancel());
    }
    return {
        content: renderedContent,
        fireOnAttach: () => rs.attachCalls.forEach((c) => c()),
        dispose: () => rs.sessionToken.cancel()
    };
}
function assignStringSourceToAttribute(node, data, key, cleanUp) {
    if (typeof data === 'string') {
        node.setAttribute(key, data);
    }
    else if (typeof data === 'boolean') {
        if (data) {
            node.setAttribute(key, '');
        }
    }
    else if (data instanceof _stream_data_source_js__WEBPACK_IMPORTED_MODULE_2__.DataSource || data instanceof _stream_duplex_data_source_js__WEBPACK_IMPORTED_MODULE_4__.DuplexDataSource) {
        if (typeof data.value === 'string') {
            node.setAttribute(key, data.value);
        }
        else if (typeof data.value === 'boolean') {
            if (data.value) {
                node.setAttribute(key, '');
            }
        }
        data.transform((0,_stream_data_source_operators_js__WEBPACK_IMPORTED_MODULE_3__.dsUnique)(), cleanUp).listen((v) => {
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
//# sourceMappingURL=dom_adapter.js.map

/***/ }),

/***/ "./node_modules/aurumjs/prebuilt/esnext/builtin_components/error_boundary.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/aurumjs/prebuilt/esnext/builtin_components/error_boundary.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ErrorBoundary": () => (/* binding */ ErrorBoundary)
/* harmony export */ });
/* harmony import */ var _rendering_aurum_element_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../rendering/aurum_element.js */ "./node_modules/aurumjs/prebuilt/esnext/rendering/aurum_element.js");
/* harmony import */ var _stream_data_source_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../stream/data_source.js */ "./node_modules/aurumjs/prebuilt/esnext/stream/data_source.js");


function ErrorBoundary(props, children, api) {
    const data = new _stream_data_source_js__WEBPACK_IMPORTED_MODULE_1__.DataSource(props?.suspenseFallback);
    const renderFallbackError = typeof props?.errorFallback === 'function' ? props.errorFallback : (error) => props?.errorFallback;
    const lc = (0,_rendering_aurum_element_js__WEBPACK_IMPORTED_MODULE_0__.createLifeCycle)();
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
//# sourceMappingURL=error_boundary.js.map

/***/ }),

/***/ "./node_modules/aurumjs/prebuilt/esnext/builtin_components/router.js":
/*!***************************************************************************!*\
  !*** ./node_modules/aurumjs/prebuilt/esnext/builtin_components/router.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AurumRouter": () => (/* binding */ AurumRouter),
/* harmony export */   "DefaultRoute": () => (/* binding */ DefaultRoute),
/* harmony export */   "Route": () => (/* binding */ Route)
/* harmony export */ });
/* harmony import */ var _stream_data_source_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../stream/data_source.js */ "./node_modules/aurumjs/prebuilt/esnext/stream/data_source.js");
/* harmony import */ var _stream_data_source_operators_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../stream/data_source_operators.js */ "./node_modules/aurumjs/prebuilt/esnext/stream/data_source_operators.js");
/* harmony import */ var _stream_emitters_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../stream/emitters.js */ "./node_modules/aurumjs/prebuilt/esnext/stream/emitters.js");
/* harmony import */ var _utilities_transclusion_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utilities/transclusion.js */ "./node_modules/aurumjs/prebuilt/esnext/utilities/transclusion.js");




function AurumRouter(props, children, api) {
    const resolvedChildren = (0,_utilities_transclusion_js__WEBPACK_IMPORTED_MODULE_3__.resolveChildren)(children, api.cancellationToken, (c) => {
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
    const urlDataSource = new _stream_data_source_js__WEBPACK_IMPORTED_MODULE_0__.DataSource();
    if (typeof window !== 'undefined') {
        (0,_stream_emitters_js__WEBPACK_IMPORTED_MODULE_2__.urlHashEmitter)(urlDataSource, true, api.cancellationToken);
    }
    const activeRoute = new _stream_data_source_js__WEBPACK_IMPORTED_MODULE_0__.DataSource();
    activeRoute.transform((0,_stream_data_source_operators_js__WEBPACK_IMPORTED_MODULE_1__.dsUnique)(), (0,_stream_data_source_operators_js__WEBPACK_IMPORTED_MODULE_1__.dsDiff)(), (0,_stream_data_source_operators_js__WEBPACK_IMPORTED_MODULE_1__.dsTap)(({ newValue, oldValue }) => {
        if (oldValue) {
            oldValue.props?.onNavigateFrom?.();
        }
        if (newValue) {
            newValue.props?.onNavigateTo?.();
        }
    }));
    return urlDataSource
        .transform((0,_stream_data_source_operators_js__WEBPACK_IMPORTED_MODULE_1__.dsUnique)(), api.cancellationToken)
        .withInitial(urlDataSource.value)
        .transform((0,_stream_data_source_operators_js__WEBPACK_IMPORTED_MODULE_1__.dsMap)((p) => selectRoute(p, resolvedChildren, activeRoute)));
}
function selectRoute(url, routes, activeRoute) {
    let selected;
    if (url === undefined || url === null) {
        selected = routes.find((r) => r.factory === DefaultRoute);
    }
    else {
        if (routes.find((r) => r.props?.href === url)) {
            selected = routes.find((r) => r.props?.href === url);
        }
        else {
            const segments = url.split('/');
            segments.pop();
            while (segments.length) {
                const path = segments.join('/');
                if (routes.find((r) => r.props?.href === path)) {
                    selected = routes.find((r) => r.props?.href === path);
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
function DefaultRoute(props, children) {
    return undefined;
}
//# sourceMappingURL=router.js.map

/***/ }),

/***/ "./node_modules/aurumjs/prebuilt/esnext/builtin_components/suspense.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/aurumjs/prebuilt/esnext/builtin_components/suspense.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Suspense": () => (/* binding */ Suspense)
/* harmony export */ });
/* harmony import */ var _utilities_aurum_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities/aurum.js */ "./node_modules/aurumjs/prebuilt/esnext/utilities/aurum.js");
/* harmony import */ var _error_boundary_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./error_boundary.js */ "./node_modules/aurumjs/prebuilt/esnext/builtin_components/error_boundary.js");


function Suspense(props, children, api) {
    return (_utilities_aurum_js__WEBPACK_IMPORTED_MODULE_0__.Aurum.factory(_error_boundary_js__WEBPACK_IMPORTED_MODULE_1__.ErrorBoundary, { suspenseFallback: props?.fallback, errorFallback: (error) => {
            throw error;
        } }, children));
}
//# sourceMappingURL=suspense.js.map

/***/ }),

/***/ "./node_modules/aurumjs/prebuilt/esnext/builtin_components/switch.js":
/*!***************************************************************************!*\
  !*** ./node_modules/aurumjs/prebuilt/esnext/builtin_components/switch.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DefaultSwitchCase": () => (/* binding */ DefaultSwitchCase),
/* harmony export */   "Switch": () => (/* binding */ Switch),
/* harmony export */   "SwitchCase": () => (/* binding */ SwitchCase)
/* harmony export */ });
/* harmony import */ var _rendering_aurum_element_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../rendering/aurum_element.js */ "./node_modules/aurumjs/prebuilt/esnext/rendering/aurum_element.js");
/* harmony import */ var _stream_data_source_operators_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../stream/data_source_operators.js */ "./node_modules/aurumjs/prebuilt/esnext/stream/data_source_operators.js");
/* harmony import */ var _utilities_cancellation_token_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utilities/cancellation_token.js */ "./node_modules/aurumjs/prebuilt/esnext/utilities/cancellation_token.js");



function Switch(props, children, api) {
    children = [].concat.apply([], children.filter((c) => !!c));
    if (children.some((c) => !c[_rendering_aurum_element_js__WEBPACK_IMPORTED_MODULE_0__.aurumElementModelIdentitiy] ||
        !(c.factory === SwitchCase || c.factory === DefaultSwitchCase))) {
        throw new Error('Switch only accepts SwitchCase as children');
    }
    if (children.filter((c) => c.factory === DefaultSwitchCase).length > 1) {
        throw new Error('Too many default switch cases only 0 or 1 allowed');
    }
    const cleanUp = new _utilities_cancellation_token_js__WEBPACK_IMPORTED_MODULE_2__.CancellationToken();
    api.onDetach(() => {
        cleanUp.cancel();
    });
    const u = props.state.transform((0,_stream_data_source_operators_js__WEBPACK_IMPORTED_MODULE_1__.dsUnique)(), cleanUp);
    return u.withInitial(props.state.value).transform((0,_stream_data_source_operators_js__WEBPACK_IMPORTED_MODULE_1__.dsMap)((state) => selectCase(state, children)));
}
function selectCase(state, children) {
    return children.find((c) => c.props?.when === state)?.children ?? children.find((p) => p.factory === DefaultSwitchCase)?.children;
}
function SwitchCase(props, children) {
    return undefined;
}
function DefaultSwitchCase(props, children) {
    return undefined;
}
//# sourceMappingURL=switch.js.map

/***/ }),

/***/ "./node_modules/aurumjs/prebuilt/esnext/debug_mode.js":
/*!************************************************************!*\
  !*** ./node_modules/aurumjs/prebuilt/esnext/debug_mode.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "debugDeclareUpdate": () => (/* binding */ debugDeclareUpdate),
/* harmony export */   "debugMode": () => (/* binding */ debugMode),
/* harmony export */   "debugRegisterConsumer": () => (/* binding */ debugRegisterConsumer),
/* harmony export */   "debugRegisterLink": () => (/* binding */ debugRegisterLink),
/* harmony export */   "debugRegisterStream": () => (/* binding */ debugRegisterStream),
/* harmony export */   "diagnosticMode": () => (/* binding */ diagnosticMode),
/* harmony export */   "enableDebugMode": () => (/* binding */ enableDebugMode),
/* harmony export */   "enableDiagnosticMode": () => (/* binding */ enableDiagnosticMode)
/* harmony export */ });
/* unused harmony export debugRegisterUnlink */
/* harmony import */ var _utilities_event_emitter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utilities/event_emitter.js */ "./node_modules/aurumjs/prebuilt/esnext/utilities/event_emitter.js");

let debugMode = false;
let diagnosticMode = false;
const customWindow = globalThis;
let debugStreamData;
function enableDiagnosticMode() {
    diagnosticMode = true;
}
/**
 * Initializes the debug features of aurum. Required for the use of aurum devtools
 * Run this function before creating any streams or any aurum components for best results
 * Enabling this harms performance and breaks backwards compatibility with some browsers
 * Do not enable in production
 */
function enableDebugMode() {
    debugStreamData = [];
    debugMode = true;
    setInterval(() => garbageCollect(), 60000);
    customWindow.__debugUpdates = new _utilities_event_emitter_js__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    customWindow.__debugNewSource = new _utilities_event_emitter_js__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    customWindow.__debugLinked = new _utilities_event_emitter_js__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    customWindow.__debugUnlinked = new _utilities_event_emitter_js__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    customWindow.__debugGetStreamData = () => debugStreamData.map(serializeStreamData);
}
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
function garbageCollect() {
    debugStreamData = debugStreamData.filter((dsd) => dsd.reference.deref() !== undefined);
}
function findDataByRef(target) {
    return debugStreamData.find((dsd) => dsd.reference.deref() === target);
}
//# sourceMappingURL=debug_mode.js.map

/***/ }),

/***/ "./node_modules/aurumjs/prebuilt/esnext/nodes/input.js":
/*!*************************************************************!*\
  !*** ./node_modules/aurumjs/prebuilt/esnext/nodes/input.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Input": () => (/* binding */ Input)
/* harmony export */ });
/* harmony import */ var _builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../builtin_components/dom_adapter.js */ "./node_modules/aurumjs/prebuilt/esnext/builtin_components/dom_adapter.js");
/* harmony import */ var _stream_data_source_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../stream/data_source.js */ "./node_modules/aurumjs/prebuilt/esnext/stream/data_source.js");
/* harmony import */ var _stream_duplex_data_source_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../stream/duplex_data_source.js */ "./node_modules/aurumjs/prebuilt/esnext/stream/duplex_data_source.js");



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
const Input = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('input', inputProps, inputEvents, (node, props, cleanUp) => {
    const input = node;
    if (props.value) {
        if (props.value instanceof _stream_data_source_js__WEBPACK_IMPORTED_MODULE_1__.DataSource) {
            props.value.listenAndRepeat((v) => {
                input.value = v ?? '';
            }, cleanUp);
            input.addEventListener('input', () => {
                props.value.update(input.value);
            });
        }
        else if (props.value instanceof _stream_duplex_data_source_js__WEBPACK_IMPORTED_MODULE_2__.DuplexDataSource) {
            props.value.listenAndRepeat((v) => {
                input.value = v ?? '';
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
        if (props.checked instanceof _stream_data_source_js__WEBPACK_IMPORTED_MODULE_1__.DataSource) {
            props.checked.listenAndRepeat((v) => {
                input.checked = v ?? false;
            }, cleanUp);
            input.addEventListener('change', () => {
                props.checked.update(input.checked);
            });
        }
        else if (props.checked instanceof _stream_duplex_data_source_js__WEBPACK_IMPORTED_MODULE_2__.DuplexDataSource) {
            props.checked.listenAndRepeat((v) => {
                input.checked = v ?? false;
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

/***/ "./node_modules/aurumjs/prebuilt/esnext/nodes/rendering_helpers.js":
/*!*************************************************************************!*\
  !*** ./node_modules/aurumjs/prebuilt/esnext/nodes/rendering_helpers.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "handleClass": () => (/* binding */ handleClass),
/* harmony export */   "handleStyle": () => (/* binding */ handleStyle)
/* harmony export */ });
/* harmony import */ var _stream_data_source_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../stream/data_source.js */ "./node_modules/aurumjs/prebuilt/esnext/stream/data_source.js");
/* harmony import */ var _stream_data_source_operators_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../stream/data_source_operators.js */ "./node_modules/aurumjs/prebuilt/esnext/stream/data_source_operators.js");
/* harmony import */ var _stream_duplex_data_source_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../stream/duplex_data_source.js */ "./node_modules/aurumjs/prebuilt/esnext/stream/duplex_data_source.js");
/* harmony import */ var _utilities_classname_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utilities/classname.js */ "./node_modules/aurumjs/prebuilt/esnext/utilities/classname.js");




function handleClass(data, cleanUp) {
    if (typeof data === 'string') {
        return data;
    }
    else if (data instanceof _stream_data_source_js__WEBPACK_IMPORTED_MODULE_0__.DataSource || data instanceof _stream_duplex_data_source_js__WEBPACK_IMPORTED_MODULE_2__.DuplexDataSource) {
        return data
            .transform((0,_stream_data_source_operators_js__WEBPACK_IMPORTED_MODULE_1__.dsUnique)(), (0,_stream_data_source_operators_js__WEBPACK_IMPORTED_MODULE_1__.dsMap)((v) => {
            if (Array.isArray(v)) {
                return v.join(' ');
            }
            else {
                return v;
            }
        }), cleanUp)
            .withInitial(data.value);
    }
    else if (data instanceof _stream_data_source_js__WEBPACK_IMPORTED_MODULE_0__.ArrayDataSource) {
        return data.reduce((p, c) => `${p} ${c}`, '', cleanUp);
    }
    else if (data instanceof _stream_data_source_js__WEBPACK_IMPORTED_MODULE_0__.MapDataSource || (typeof data === 'object' && !Array.isArray(data))) {
        const result = (0,_utilities_classname_js__WEBPACK_IMPORTED_MODULE_3__.aurumClassName)(data, cleanUp);
        return handleClass(result, cleanUp);
    }
    else {
        const result = new _stream_data_source_js__WEBPACK_IMPORTED_MODULE_0__.DataSource(buildClass(data));
        for (const i of data) {
            if (i instanceof _stream_data_source_js__WEBPACK_IMPORTED_MODULE_0__.DataSource) {
                i.transform((0,_stream_data_source_operators_js__WEBPACK_IMPORTED_MODULE_1__.dsUnique)(), cleanUp).listen((v) => {
                    result.update(buildClass(data));
                }, cleanUp);
            }
        }
        return result;
    }
}
function buildClass(data) {
    return data.reduce((p, c) => {
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
}
function handleStyle(data, cleanUp) {
    if (typeof data === 'string') {
        return data;
    }
    else if (data instanceof _stream_data_source_js__WEBPACK_IMPORTED_MODULE_0__.DataSource || data instanceof _stream_duplex_data_source_js__WEBPACK_IMPORTED_MODULE_2__.DuplexDataSource) {
        return data.transform((0,_stream_data_source_operators_js__WEBPACK_IMPORTED_MODULE_1__.dsUnique)(), (0,_stream_data_source_operators_js__WEBPACK_IMPORTED_MODULE_1__.dsMap)((v) => {
            return v.toString();
        }), cleanUp);
    }
    else if (data instanceof _stream_data_source_js__WEBPACK_IMPORTED_MODULE_0__.MapDataSource) {
        return data.toEntriesArrayDataSource(cleanUp).reduce((p, c) => {
            return `${p}${(0,_utilities_classname_js__WEBPACK_IMPORTED_MODULE_3__.camelCaseToKebabCase)(c[0])}:${c[1]};`;
        }, '', cleanUp);
    }
    else if (typeof data === 'object' && !Array.isArray(data)) {
        const result = new _stream_data_source_js__WEBPACK_IMPORTED_MODULE_0__.ArrayDataSource();
        let index = 0;
        for (const i in data) {
            if (data[i] instanceof _stream_data_source_js__WEBPACK_IMPORTED_MODULE_0__.DataSource) {
                const myIndex = index;
                result.push([i, data[i].value]);
                data[i].listen((v) => {
                    result.set(myIndex, [i, v]);
                }, cleanUp);
            }
            else {
                result.push([i, data[i]]);
            }
            index++;
        }
        return result.reduce((p, c) => `${p}${(0,_utilities_classname_js__WEBPACK_IMPORTED_MODULE_3__.camelCaseToKebabCase)(c[0])}:${c[1]};`, '', cleanUp);
    }
    else {
        return '';
    }
}
//# sourceMappingURL=rendering_helpers.js.map

/***/ }),

/***/ "./node_modules/aurumjs/prebuilt/esnext/nodes/select.js":
/*!**************************************************************!*\
  !*** ./node_modules/aurumjs/prebuilt/esnext/nodes/select.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Select": () => (/* binding */ Select)
/* harmony export */ });
/* harmony import */ var _stream_data_source_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../stream/data_source.js */ "./node_modules/aurumjs/prebuilt/esnext/stream/data_source.js");
/* harmony import */ var _stream_duplex_data_source_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../stream/duplex_data_source.js */ "./node_modules/aurumjs/prebuilt/esnext/stream/duplex_data_source.js");
/* harmony import */ var _builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../builtin_components/dom_adapter.js */ "./node_modules/aurumjs/prebuilt/esnext/builtin_components/dom_adapter.js");



/**
 * @internal
 */
const selectEvents = { change: 'onChange' };
/**
 * @internal
 */
const Select = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_2__.DomNodeCreator)('select', undefined, selectEvents, (node, props, cleanUp) => {
    const select = node;
    if (props?.value || props?.selectedIndex) {
        // In case props.value is a data source we need to reapply the value when the children change because the children may be unstable/be removed and re-added which would falsify the state.
        if (props.value instanceof _stream_data_source_js__WEBPACK_IMPORTED_MODULE_0__.DataSource || props.value instanceof _stream_duplex_data_source_js__WEBPACK_IMPORTED_MODULE_1__.DuplexDataSource) {
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
        if (props.selectedIndex instanceof _stream_data_source_js__WEBPACK_IMPORTED_MODULE_0__.DataSource || props.selectedIndex instanceof _stream_duplex_data_source_js__WEBPACK_IMPORTED_MODULE_1__.DuplexDataSource) {
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
        if (props.value instanceof _stream_data_source_js__WEBPACK_IMPORTED_MODULE_0__.DataSource) {
            props.value.listenAndRepeat((v) => {
                select.value = v;
            }, cleanUp);
            select.addEventListener('change', () => {
                props.value.update(select.value);
            });
        }
        else if (props.value instanceof _stream_duplex_data_source_js__WEBPACK_IMPORTED_MODULE_1__.DuplexDataSource) {
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
        if (props?.selectedIndex) {
            if (props.selectedIndex instanceof _stream_data_source_js__WEBPACK_IMPORTED_MODULE_0__.DataSource) {
                props.selectedIndex.listenAndRepeat((v) => {
                    select.selectedIndex = v;
                }, cleanUp);
                select.addEventListener('change', () => {
                    props.selectedIndex.update(select.selectedIndex);
                });
            }
            else if (props.selectedIndex instanceof _stream_duplex_data_source_js__WEBPACK_IMPORTED_MODULE_1__.DuplexDataSource) {
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

/***/ "./node_modules/aurumjs/prebuilt/esnext/nodes/simple_dom_nodes.js":
/*!************************************************************************!*\
  !*** ./node_modules/aurumjs/prebuilt/esnext/nodes/simple_dom_nodes.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "A": () => (/* binding */ A),
/* harmony export */   "Abbr": () => (/* binding */ Abbr),
/* harmony export */   "Address": () => (/* binding */ Address),
/* harmony export */   "Area": () => (/* binding */ Area),
/* harmony export */   "Article": () => (/* binding */ Article),
/* harmony export */   "Aside": () => (/* binding */ Aside),
/* harmony export */   "Audio": () => (/* binding */ Audio),
/* harmony export */   "B": () => (/* binding */ B),
/* harmony export */   "Body": () => (/* binding */ Body),
/* harmony export */   "Br": () => (/* binding */ Br),
/* harmony export */   "Button": () => (/* binding */ Button),
/* harmony export */   "Canvas": () => (/* binding */ Canvas),
/* harmony export */   "Caption": () => (/* binding */ Caption),
/* harmony export */   "Circle": () => (/* binding */ Circle),
/* harmony export */   "ClipPath": () => (/* binding */ ClipPath),
/* harmony export */   "Code": () => (/* binding */ Code),
/* harmony export */   "Col": () => (/* binding */ Col),
/* harmony export */   "Colgroup": () => (/* binding */ Colgroup),
/* harmony export */   "Data": () => (/* binding */ Data),
/* harmony export */   "Defs": () => (/* binding */ Defs),
/* harmony export */   "Details": () => (/* binding */ Details),
/* harmony export */   "Div": () => (/* binding */ Div),
/* harmony export */   "Ellipse": () => (/* binding */ Ellipse),
/* harmony export */   "Em": () => (/* binding */ Em),
/* harmony export */   "Footer": () => (/* binding */ Footer),
/* harmony export */   "ForeignObject": () => (/* binding */ ForeignObject),
/* harmony export */   "Form": () => (/* binding */ Form),
/* harmony export */   "G": () => (/* binding */ G),
/* harmony export */   "H1": () => (/* binding */ H1),
/* harmony export */   "H2": () => (/* binding */ H2),
/* harmony export */   "H3": () => (/* binding */ H3),
/* harmony export */   "H4": () => (/* binding */ H4),
/* harmony export */   "H5": () => (/* binding */ H5),
/* harmony export */   "H6": () => (/* binding */ H6),
/* harmony export */   "Head": () => (/* binding */ Head),
/* harmony export */   "Header": () => (/* binding */ Header),
/* harmony export */   "Heading": () => (/* binding */ Heading),
/* harmony export */   "Hr": () => (/* binding */ Hr),
/* harmony export */   "Html": () => (/* binding */ Html),
/* harmony export */   "I": () => (/* binding */ I),
/* harmony export */   "IFrame": () => (/* binding */ IFrame),
/* harmony export */   "Image": () => (/* binding */ Image),
/* harmony export */   "Img": () => (/* binding */ Img),
/* harmony export */   "Kbd": () => (/* binding */ Kbd),
/* harmony export */   "Label": () => (/* binding */ Label),
/* harmony export */   "Li": () => (/* binding */ Li),
/* harmony export */   "Line": () => (/* binding */ Line),
/* harmony export */   "LinearGradient": () => (/* binding */ LinearGradient),
/* harmony export */   "Link": () => (/* binding */ Link),
/* harmony export */   "Marker": () => (/* binding */ Marker),
/* harmony export */   "Mask": () => (/* binding */ Mask),
/* harmony export */   "Meta": () => (/* binding */ Meta),
/* harmony export */   "Nav": () => (/* binding */ Nav),
/* harmony export */   "NoScript": () => (/* binding */ NoScript),
/* harmony export */   "Object": () => (/* binding */ Object),
/* harmony export */   "Ol": () => (/* binding */ Ol),
/* harmony export */   "OptGroup": () => (/* binding */ OptGroup),
/* harmony export */   "Option": () => (/* binding */ Option),
/* harmony export */   "Output": () => (/* binding */ Output),
/* harmony export */   "P": () => (/* binding */ P),
/* harmony export */   "Param": () => (/* binding */ Param),
/* harmony export */   "Path": () => (/* binding */ Path),
/* harmony export */   "Pattern": () => (/* binding */ Pattern),
/* harmony export */   "Picture": () => (/* binding */ Picture),
/* harmony export */   "Polygon": () => (/* binding */ Polygon),
/* harmony export */   "Polyline": () => (/* binding */ Polyline),
/* harmony export */   "Pre": () => (/* binding */ Pre),
/* harmony export */   "Progress": () => (/* binding */ Progress),
/* harmony export */   "Q": () => (/* binding */ Q),
/* harmony export */   "RadialGradient": () => (/* binding */ RadialGradient),
/* harmony export */   "Rect": () => (/* binding */ Rect),
/* harmony export */   "Samp": () => (/* binding */ Samp),
/* harmony export */   "Script": () => (/* binding */ Script),
/* harmony export */   "Slot": () => (/* binding */ Slot),
/* harmony export */   "Source": () => (/* binding */ Source),
/* harmony export */   "Span": () => (/* binding */ Span),
/* harmony export */   "Stop": () => (/* binding */ Stop),
/* harmony export */   "Strong": () => (/* binding */ Strong),
/* harmony export */   "Style": () => (/* binding */ Style),
/* harmony export */   "Sub": () => (/* binding */ Sub),
/* harmony export */   "Summary": () => (/* binding */ Summary),
/* harmony export */   "Sup": () => (/* binding */ Sup),
/* harmony export */   "Svg": () => (/* binding */ Svg),
/* harmony export */   "Symbol": () => (/* binding */ Symbol),
/* harmony export */   "TBody": () => (/* binding */ TBody),
/* harmony export */   "TFoot": () => (/* binding */ TFoot),
/* harmony export */   "THead": () => (/* binding */ THead),
/* harmony export */   "Table": () => (/* binding */ Table),
/* harmony export */   "Td": () => (/* binding */ Td),
/* harmony export */   "Template": () => (/* binding */ Template),
/* harmony export */   "Text": () => (/* binding */ Text),
/* harmony export */   "Th": () => (/* binding */ Th),
/* harmony export */   "Time": () => (/* binding */ Time),
/* harmony export */   "Title": () => (/* binding */ Title),
/* harmony export */   "Tr": () => (/* binding */ Tr),
/* harmony export */   "Track": () => (/* binding */ Track),
/* harmony export */   "Tspan": () => (/* binding */ Tspan),
/* harmony export */   "Ul": () => (/* binding */ Ul),
/* harmony export */   "Use": () => (/* binding */ Use),
/* harmony export */   "Var": () => (/* binding */ Var),
/* harmony export */   "Video": () => (/* binding */ Video),
/* harmony export */   "Wbr": () => (/* binding */ Wbr)
/* harmony export */ });
/* harmony import */ var _builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../builtin_components/dom_adapter.js */ "./node_modules/aurumjs/prebuilt/esnext/builtin_components/dom_adapter.js");

const Code = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('code');
const Div = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('div');
/**
 * @internal
 */
const A = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('a', ['href', 'target', 'hreflang', 'media', 'download', 'ping', 'referrerpolicy', 'rel', 'type']);
/**
 * @internal
 */
const Abbr = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('abbr');
/**
 * @internal
 */
const Address = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('address');
/**
 * @internal
 */
const H1 = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('h1');
/**
 * @internal
 */
const H2 = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('h2');
/**
 * @internal
 */
const H3 = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('h3');
/**
 * @internal
 */
const H4 = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('h4');
/**
 * @internal
 */
const H5 = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('h5');
/**
 * @internal
 */
const H6 = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('h6');
/**
 * @internal
 */
const Area = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('area', [
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
const Article = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('article');
/**
 * @internal
 */
const Aside = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('aside');
/**
 * @internal
 */
const Span = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('span');
/**
 * @internal
 */
const NoScript = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('noscript');
/**
 * @internal
 */
const Video = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('video', [
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
const Ul = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('ul');
/**
 * @internal
 */
const Ol = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('ol');
/**
 * @internal
 */
const Li = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('li');
/**
 * @internal
 */
const B = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('b');
/**
 * @internal
 */
const Body = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('body');
/**
 * @internal
 */
const Title = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('title');
/**
 * @internal
 */
const Summary = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('summary');
/**
 * @internal
 */
const THead = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('thead');
/**
 * @internal
 */
const Template = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('template');
/**
 * @internal
 */
const Q = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('q');
/**
 * @internal
 */
const Pre = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('pre');
/**
 * @internal
 */
const P = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('p');
/**
 * @internal
 */
const Hr = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('hr');
/**
 * @internal
 */
const Audio = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('audio', ['controls', 'autoplay', 'loop', 'muted', 'preload', 'src', 'crossorigin'], {
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
const Br = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('br');
/**
 * @internal
 */
const Button = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('button', [
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
const Canvas = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('canvas', ['width', 'height']);
/**
 * @internal
 */
const Data = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('data', ['value']);
/**
 * @internal
 */
const Details = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('details');
/**
 * @internal
 */
const Em = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('em');
/**
 * @internal
 */
const Footer = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('footer');
/**
 * @internal
 */
const Form = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('form', ['action', 'method', 'rel', 'enctype', 'novalidate', 'target', 'accept-charset', 'autocomplete']);
/**
 * @internal
 */
const Meta = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('meta', ['http-equiv', 'charset', 'content']);
/**
 * @internal
 */
const Html = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('html', ['lang', 'xmlns']);
/**
 * @internal
 */
const Head = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('head');
/**
 * @internal
 */
const Header = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('header');
/**
 * @internal
 */
const Heading = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('heading');
/**
 * @internal
 */
const I = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('i');
/**
 * @internal
 */
const IFrame = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('iframe', [
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
const Img = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('img', [
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
const Label = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('label', ['for']);
/**
 * @internal
 */
const Link = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('link', [
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
const Nav = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('nav');
/**
 * @internal
 */
const Sub = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('sub');
/**
 * @internal
 */
const Sup = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('sup');
/**
 * @internal
 */
const Table = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('table');
/**
 * @internal
 */
const TBody = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('tbody');
/**
 * @internal
 */
const TFoot = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('tfoot');
/**
 * @internal
 */
const Col = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('col', ['span']);
/**
 * @internal
 */
const Colgroup = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('colgroup', ['span']);
/**
 * @internal
 */
const Caption = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('caption');
/**
 * @internal
 */
const Tr = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('tr');
/**
 * @internal
 */
const Td = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('td', ['colspan', 'headers', 'rowspan']);
/**
 * @internal
 */
const Th = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('th', ['scope', 'abbr', 'colspan', 'headers', 'rowspan']);
/**
 * @internal
 */
const Time = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('time', ['datetime']);
/**
 * @internal
 */
const Style = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('style', ['media', 'type', 'nonce']);
/**
 * @internal
 */
const Source = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('source', ['src', 'srcset', 'media', 'sizes', 'type']);
/**
 * @internal
 */
const Track = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('track', ['src', 'srclang', 'label', 'kind', 'default']);
/**
 * @internal
 */
const Param = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('param', ['value']);
/**
 * @internal
 */
const Script = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('script', [
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
const commonSvgProps = [
    'clip-path',
    'clip-rule',
    'color',
    'color-interpolation',
    'color-rendering',
    'cursor',
    'display',
    'fill',
    'fill-opacity',
    'fill-rule',
    'filter',
    'mask',
    'opacity',
    'pointer-events',
    'shape-rendering',
    'stroke',
    'stroke-dasharray',
    'stroke-dashoffset',
    'stroke-linecap',
    'stroke-linejoin',
    'stroke-miterlimit',
    'stroke-opacity',
    'stroke-width',
    'transform',
    'vector-effect',
    'visibility'
];
/**
 * @internal
 */
const Svg = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('svg', [
    'width',
    'height',
    'xmlns',
    'version',
    'x',
    'y',
    'x1',
    'y1',
    'x2',
    'y2',
    'cx',
    'cy',
    'r',
    'rx',
    'ry',
    'd',
    'path',
    'points',
    'viewBox',
    'preserveAspectRatio',
    'xmlns:xlink',
    'xml:space',
    ...commonSvgProps
], undefined, undefined, true);
const Circle = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('circle', ['cx', 'cy', 'r', ...commonSvgProps], undefined, undefined, true);
const Ellipse = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('ellipse', ['cx', 'cy', 'rx', 'ry', ...commonSvgProps], undefined, undefined, true);
const Line = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('line', ['x1', 'y1', 'x2', 'y2', ...commonSvgProps], undefined, undefined, true);
const Polygon = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('polygon', ['points', ...commonSvgProps], undefined, undefined, true);
const Polyline = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('polyline', ['points', ...commonSvgProps], undefined, undefined, true);
const Path = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('path', ['d', ...commonSvgProps], undefined, undefined, true);
const Rect = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('rect', ['x', 'y', 'width', 'height', ...commonSvgProps], undefined, undefined, true);
const Text = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('text', ['dx', 'dy', 'rotate', 'textLength', 'x', 'y', ...commonSvgProps], undefined, undefined, true);
const Tspan = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('tspan', ['dx', 'dy', 'rotate', 'textLength', 'x', 'y', ...commonSvgProps], undefined, undefined, true);
const Image = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('image', ['x', 'y', 'width', 'height', 'href', ...commonSvgProps], undefined, undefined, true);
const G = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('g', [...commonSvgProps], undefined, undefined, true);
const Defs = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('defs', [...commonSvgProps], undefined, undefined, true);
const Symbol = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('symbol', ['viewBox', 'preserveAspectRatio', ...commonSvgProps], undefined, undefined, true);
const Use = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('use', ['href', 'x', 'y', 'width', 'height', ...commonSvgProps], undefined, undefined, true);
const Marker = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('marker', ['viewBox', 'preserveAspectRatio', 'refX', 'refY', 'markerWidth', 'markerHeight', 'orient', ...commonSvgProps], undefined, undefined, true);
const Mask = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('mask', ['x', 'y', 'width', 'height', ...commonSvgProps], undefined, undefined, true);
const LinearGradient = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('linearGradient', ['x1', 'y1', 'x2', 'y2', ...commonSvgProps], undefined, undefined, true);
const RadialGradient = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('radialGradient', ['cx', 'cy', 'r', 'fx', 'fy', 'fr', ...commonSvgProps], undefined, undefined, true);
const Stop = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('stop', ['offset', 'stop-color', 'stop-opacity', ...commonSvgProps], undefined, undefined, true);
const ClipPath = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('clipPath', ['clipPathUnits', ...commonSvgProps], undefined, undefined, true);
const ForeignObject = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('foreignObject', ['x', 'y', 'width', 'height', ...commonSvgProps], undefined, undefined, true);
const Pattern = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('pattern', ['x', 'y', 'width', 'height', 'patternUnits', 'patternContentUnits', 'patternTransform', 'viewBox', 'preserveAspectRatio', ...commonSvgProps], undefined, undefined, true);
/**
 * @internal
 */
const Progress = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('progress', ['max', 'value']);
/**
 * @internal
 */
const Option = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('option', ['value', 'label', 'disabled', 'selected']);
/**
 * @internal
 */
const OptGroup = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('optgroup', ['label', 'disabled']);
/**
 * @internal
 */
const Slot = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('slot');
/**
 * @internal
 */
const Strong = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('strong');
/**
 * @internal
 */
const Samp = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('samp');
/**
 * @internal
 */
const Kbd = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('kbd');
/**
 * @internal
 */
const Var = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('var');
/**
 * @internal
 */
const Wbr = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('wbr');
/**
 * @internal
 */
const Picture = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('picture');
/**
 * @internal
 */
const Output = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('output', ['for', 'form']);
/**
 * @internal
 */
const Object = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_0__.DomNodeCreator)('object', ['data', 'width', 'height', 'form', 'type', 'usemap']);
//# sourceMappingURL=simple_dom_nodes.js.map

/***/ }),

/***/ "./node_modules/aurumjs/prebuilt/esnext/nodes/string_adapter.js":
/*!**********************************************************************!*\
  !*** ./node_modules/aurumjs/prebuilt/esnext/nodes/string_adapter.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "aurumToString": () => (/* binding */ aurumToString)
/* harmony export */ });
/* harmony import */ var _rendering_aurum_element_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../rendering/aurum_element.js */ "./node_modules/aurumjs/prebuilt/esnext/rendering/aurum_element.js");
/* harmony import */ var _stream_data_source_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../stream/data_source.js */ "./node_modules/aurumjs/prebuilt/esnext/stream/data_source.js");
/* harmony import */ var _stream_duplex_data_source_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../stream/duplex_data_source.js */ "./node_modules/aurumjs/prebuilt/esnext/stream/duplex_data_source.js");
/* harmony import */ var _utilities_cancellation_token_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utilities/cancellation_token.js */ "./node_modules/aurumjs/prebuilt/esnext/utilities/cancellation_token.js");




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
    else if (content instanceof _stream_data_source_js__WEBPACK_IMPORTED_MODULE_1__.DataSource) {
        return aurumToString(content.value);
    }
    else if (content instanceof _stream_duplex_data_source_js__WEBPACK_IMPORTED_MODULE_2__.DuplexDataSource) {
        return aurumToString(content.value);
    }
    else if (content instanceof _stream_data_source_js__WEBPACK_IMPORTED_MODULE_1__.ArrayDataSource) {
        return aurumToString(content.getData());
    }
    else {
        const item = content;
        if (!item.isIntrinsic) {
            return aurumToString(item.factory(item.props, item.children, (0,_rendering_aurum_element_js__WEBPACK_IMPORTED_MODULE_0__.createAPI)({
                attachCalls: [],
                sessionToken: new _utilities_cancellation_token_js__WEBPACK_IMPORTED_MODULE_3__.CancellationToken(),
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
        return `<${item.name}${propString.trimEnd()}>${children}</${item.name}>`;
    }
}
//# sourceMappingURL=string_adapter.js.map

/***/ }),

/***/ "./node_modules/aurumjs/prebuilt/esnext/nodes/textarea.js":
/*!****************************************************************!*\
  !*** ./node_modules/aurumjs/prebuilt/esnext/nodes/textarea.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TextArea": () => (/* binding */ TextArea)
/* harmony export */ });
/* harmony import */ var _stream_data_source_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../stream/data_source.js */ "./node_modules/aurumjs/prebuilt/esnext/stream/data_source.js");
/* harmony import */ var _stream_duplex_data_source_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../stream/duplex_data_source.js */ "./node_modules/aurumjs/prebuilt/esnext/stream/duplex_data_source.js");
/* harmony import */ var _builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../builtin_components/dom_adapter.js */ "./node_modules/aurumjs/prebuilt/esnext/builtin_components/dom_adapter.js");



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
const TextArea = (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_2__.DomNodeCreator)('textArea', textAreaProps, textAreaEvents, (node, props, cleanUp) => {
    const textArea = node;
    if (props.value) {
        if (props.value instanceof _stream_data_source_js__WEBPACK_IMPORTED_MODULE_0__.DataSource) {
            props.value.listenAndRepeat((v) => {
                textArea.value = v;
            }, cleanUp);
            textArea.addEventListener('input', () => {
                props.value.update(textArea.value);
            });
        }
        else if (props.value instanceof _stream_duplex_data_source_js__WEBPACK_IMPORTED_MODULE_1__.DuplexDataSource) {
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

/***/ "./node_modules/aurumjs/prebuilt/esnext/nodes/vdom_adapter.js":
/*!********************************************************************!*\
  !*** ./node_modules/aurumjs/prebuilt/esnext/nodes/vdom_adapter.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VDOM": () => (/* binding */ VDOM),
/* harmony export */   "aurumToVDOM": () => (/* binding */ aurumToVDOM)
/* harmony export */ });
/* harmony import */ var _aurumjs_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../aurumjs.js */ "./node_modules/aurumjs/prebuilt/esnext/aurumjs.js");
/* harmony import */ var _rendering_aurum_element_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../rendering/aurum_element.js */ "./node_modules/aurumjs/prebuilt/esnext/rendering/aurum_element.js");
/* harmony import */ var _stream_data_source_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../stream/data_source.js */ "./node_modules/aurumjs/prebuilt/esnext/stream/data_source.js");
/* harmony import */ var _stream_duplex_data_source_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../stream/duplex_data_source.js */ "./node_modules/aurumjs/prebuilt/esnext/stream/duplex_data_source.js");
/* harmony import */ var _utilities_cancellation_token_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utilities/cancellation_token.js */ "./node_modules/aurumjs/prebuilt/esnext/utilities/cancellation_token.js");
/* harmony import */ var _rendering_helpers_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./rendering_helpers.js */ "./node_modules/aurumjs/prebuilt/esnext/nodes/rendering_helpers.js");






class VDOM {
    roots;
    onChange;
    sessionToken;
    constructor(args) {
        this.roots = args.vdom;
        this.sessionToken = args.sessionToken;
        this.onChange = new _aurumjs_js__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    }
    *[Symbol.iterator]() {
        for (const node of this.roots) {
            yield* this.iterateVDOM(node, undefined);
        }
    }
    *iterateVDOM(node, parent) {
        if (node.type === 'virtual') {
            for (const child of node.children) {
                yield* this.iterateVDOM(child, parent);
            }
            return;
        }
        yield { node, parent };
        if (node.children) {
            for (const child of node.children) {
                yield* this.iterateVDOM(child, node);
            }
        }
    }
}
function aurumToVDOM(content, sessionToken) {
    const root = new VDOM({
        vdom: [],
        sessionToken
    });
    let renderToken = new _utilities_cancellation_token_js__WEBPACK_IMPORTED_MODULE_4__.CancellationToken();
    sessionToken.addCancelable(() => {
        if (renderToken) {
            renderToken.cancel();
        }
    });
    const virtualRoot = {
        type: 'virtual',
        children: []
    };
    aurumToVDOMInternal(content, renderToken, root.onChange, virtualRoot);
    root.roots = virtualRoot.children;
    return root;
}
function aurumToVDOMInternal(content, renderToken, change, parent) {
    if (content === undefined || content === null) {
        return {
            tokens: []
        };
    }
    if (Array.isArray(content)) {
        const result = {
            insertAt: -1,
            insertCount: 0,
            tokens: []
        };
        for (const item of content) {
            const output = aurumToVDOMInternal(item, renderToken, change, parent);
            result.tokens.push(...output.tokens);
        }
        return result;
    }
    if (content instanceof Promise) {
        const virtualNode = {
            type: 'virtual',
            children: []
        };
        content.then((c) => {
            aurumToVDOMInternal(c, renderToken, change, virtualNode);
            change.fire({
                changedNode: parent
            });
        });
        parent.children.push(virtualNode);
        return {
            tokens: []
        };
    }
    if (['number', 'string', 'bigint', 'boolean'].includes(typeof content)) {
        parent.children.push({
            type: 'text',
            text: content.toString()
        });
        return {
            tokens: []
        };
    }
    else if (content instanceof _stream_data_source_js__WEBPACK_IMPORTED_MODULE_2__.DataSource || content instanceof _stream_duplex_data_source_js__WEBPACK_IMPORTED_MODULE_3__.DuplexDataSource) {
        const virtualNode = {
            type: 'virtual',
            children: []
        };
        content.listen((v) => {
            virtualNode.children = [];
            insertStats.tokens.forEach((t) => t.cancel());
            insertStats = aurumToVDOMInternal(v, renderToken, change, virtualNode);
            change.fire({
                changedNode: parent
            });
        }, renderToken);
        parent.children.push(virtualNode);
        let insertStats = aurumToVDOMInternal(content.value, renderToken, change, virtualNode);
        return insertStats;
    }
    else if (content instanceof _stream_data_source_js__WEBPACK_IMPORTED_MODULE_2__.ArrayDataSource) {
        const virtualNode = {
            type: 'virtual',
            children: []
        };
        content.listen(() => {
            virtualNode.children = [];
            insertStats.tokens.forEach((t) => t.cancel());
            insertStats = aurumToVDOMInternal(content.getData(), renderToken, change, virtualNode);
            change.fire({
                changedNode: parent
            });
        }, renderToken);
        parent.children.push(virtualNode);
        let insertStats = aurumToVDOMInternal(content.getData(), renderToken, change, virtualNode);
        return insertStats;
    }
    else {
        const item = content;
        if (!item.isIntrinsic) {
            const sessionToken = new _utilities_cancellation_token_js__WEBPACK_IMPORTED_MODULE_4__.CancellationToken();
            const session = {
                attachCalls: [],
                sessionToken: sessionToken,
                tokens: []
            };
            const api = (0,_rendering_aurum_element_js__WEBPACK_IMPORTED_MODULE_1__.createAPI)(session);
            renderToken.addCancelable(() => {
                sessionToken.cancel();
            });
            sessionToken.addCancelable(() => {
                for (const token of session.tokens) {
                    token.cancel();
                }
            });
            const data = aurumToVDOMInternal(item.factory(item.props, item.children, api), sessionToken, change, parent);
            for (const call of session.attachCalls) {
                call();
            }
            return {
                tokens: [...data.tokens, sessionToken]
            };
        }
        const element = {
            type: 'element',
            tag: item.name,
            children: []
        };
        element.attributes = item.props ? observeAttributes(element, item.props, renderToken, change) : undefined;
        parent.children.push(element);
        if (item.props?.onAttach) {
            item.props.onAttach();
        }
        if (item.props?.onDetach) {
            renderToken.addCancelable(() => {
                item.props.onDetach();
            });
        }
        if (item.children) {
            aurumToVDOMInternal(item.children, renderToken, change, element);
        }
        return {
            tokens: []
        };
    }
}
function observeAttributes(node, props, renderToken, change) {
    const result = {};
    for (const key in props) {
        let element;
        if (props.hasOwnProperty(key)) {
            if (key === 'style') {
                element = (0,_rendering_helpers_js__WEBPACK_IMPORTED_MODULE_5__.handleStyle)(props[key], renderToken);
            }
            else if (key === 'class') {
                element = (0,_rendering_helpers_js__WEBPACK_IMPORTED_MODULE_5__.handleClass)(props[key], renderToken);
            }
            else {
                element = props[key];
            }
            if (element instanceof _stream_data_source_js__WEBPACK_IMPORTED_MODULE_2__.DataSource) {
                element.listen(() => {
                    result[key] = element.value;
                    change.fire({
                        changedNode: node
                    });
                }, renderToken);
                result[key] = element.value;
            }
            else if (element instanceof _stream_duplex_data_source_js__WEBPACK_IMPORTED_MODULE_3__.DuplexDataSource) {
                element.listen(() => {
                    result[key] = element.value;
                    change.fire({
                        changedNode: node
                    });
                }, renderToken);
                result[key] = element.value;
            }
            else if (element instanceof _stream_data_source_js__WEBPACK_IMPORTED_MODULE_2__.ArrayDataSource) {
                element.listen(() => {
                    result[key] = element.getData().join(';');
                    change.fire({
                        changedNode: node
                    });
                }, renderToken);
                result[key] = element.getData().join(';');
            }
            else {
                result[key] = element;
            }
        }
    }
    return result;
}
//# sourceMappingURL=vdom_adapter.js.map

/***/ }),

/***/ "./node_modules/aurumjs/prebuilt/esnext/rendering/aurum_element.js":
/*!*************************************************************************!*\
  !*** ./node_modules/aurumjs/prebuilt/esnext/rendering/aurum_element.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ArrayAurumElement": () => (/* binding */ ArrayAurumElement),
/* harmony export */   "AurumElement": () => (/* binding */ AurumElement),
/* harmony export */   "SingularAurumElement": () => (/* binding */ SingularAurumElement),
/* harmony export */   "aurumElementModelIdentitiy": () => (/* binding */ aurumElementModelIdentitiy),
/* harmony export */   "createAPI": () => (/* binding */ createAPI),
/* harmony export */   "createLifeCycle": () => (/* binding */ createLifeCycle),
/* harmony export */   "createRenderSession": () => (/* binding */ createRenderSession),
/* harmony export */   "renderInternal": () => (/* binding */ renderInternal)
/* harmony export */ });
/* unused harmony export nodeData */
/* harmony import */ var _debug_mode_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../debug_mode.js */ "./node_modules/aurumjs/prebuilt/esnext/debug_mode.js");
/* harmony import */ var _stream_data_source_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../stream/data_source.js */ "./node_modules/aurumjs/prebuilt/esnext/stream/data_source.js");
/* harmony import */ var _stream_duplex_data_source_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../stream/duplex_data_source.js */ "./node_modules/aurumjs/prebuilt/esnext/stream/duplex_data_source.js");
/* harmony import */ var _utilities_cancellation_token_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utilities/cancellation_token.js */ "./node_modules/aurumjs/prebuilt/esnext/utilities/cancellation_token.js");
/* harmony import */ var _utilities_event_emitter_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utilities/event_emitter.js */ "./node_modules/aurumjs/prebuilt/esnext/utilities/event_emitter.js");





function createRenderSession() {
    const session = {
        attachCalls: [],
        sessionToken: new _utilities_cancellation_token_js__WEBPACK_IMPORTED_MODULE_3__.CancellationToken(() => {
            for (const token of session.tokens) {
                token.cancel();
            }
        }),
        tokens: []
    };
    return session;
}
const aurumElementModelIdentitiy = Symbol('AurumElementModel');
const nodeData = new WeakMap();
function createLifeCycle() {
    const lc = {
        attach: new _utilities_event_emitter_js__WEBPACK_IMPORTED_MODULE_4__.EventEmitter(),
        detach: new _utilities_event_emitter_js__WEBPACK_IMPORTED_MODULE_4__.EventEmitter(),
        onAttach() {
            lc.attach.fire();
        },
        onDetach() {
            lc.detach.fire();
        }
    };
    return lc;
}
class AurumElement {
    children;
    api;
    static id = 1;
    contentStartMarker;
    contentEndMarker;
    hostNode;
    lastStartIndex;
    lastEndIndex;
    disposed = false;
    constructor(dataSource, api) {
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
                this.hostNode.childNodes[i + workIndex + offset] !== this.children[i + 1]?.contentStartMarker) {
                if (child instanceof HTMLElement || child instanceof Text || child instanceof SVGElement) {
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
                if (child instanceof HTMLElement || child instanceof Text || child instanceof SVGElement) {
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
/**
 * @internal
 */
function renderInternal(element, session, prerendering = false) {
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
            const ds = new _stream_data_source_js__WEBPACK_IMPORTED_MODULE_1__.DataSource();
            element.then((val) => {
                ds.update(val);
            });
            const result = new SingularAurumElement(ds, createAPI(session));
            return result;
        }
        else if (element instanceof _stream_data_source_js__WEBPACK_IMPORTED_MODULE_1__.DataSource || element instanceof _stream_duplex_data_source_js__WEBPACK_IMPORTED_MODULE_2__.DuplexDataSource) {
            const result = new SingularAurumElement(element, createAPI(session));
            return result;
        }
        else if (element instanceof _stream_data_source_js__WEBPACK_IMPORTED_MODULE_1__.ArrayDataSource) {
            const result = new ArrayAurumElement(element, createAPI(session));
            return result;
        }
    }
    if (element[aurumElementModelIdentitiy]) {
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
        if (!model.isIntrinsic && _debug_mode_js__WEBPACK_IMPORTED_MODULE_0__.diagnosticMode) {
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
            componentResult = model.factory(model.props ?? {}, model.children, api);
        }
        return renderInternal(componentResult, session, prerendering);
    }
    // Unsupported types are returned as is in hope that a transclusion component will transform it into something compatible
    return element;
}
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
                token = new _utilities_cancellation_token_js__WEBPACK_IMPORTED_MODULE_3__.CancellationToken();
                session.tokens.push(token);
            }
            token.addCancelable(cb);
        },
        get cancellationToken() {
            if (!token) {
                token = new _utilities_cancellation_token_js__WEBPACK_IMPORTED_MODULE_3__.CancellationToken();
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
        }
    };
    return api;
}
class ArrayAurumElement extends AurumElement {
    renderSessions;
    dataSource;
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
        let removed;
        if (newItems) {
            removed = this.children.splice(index, amount, ...newItems);
        }
        else {
            removed = this.children.splice(index, amount);
        }
        for (const item of removed) {
            this.renderSessions.get(item)?.sessionToken.cancel();
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
                if ((itemA instanceof HTMLElement && itemB instanceof HTMLElement) || (itemA instanceof SVGElement && itemB instanceof SVGElement)) {
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
                throw new Error(`DOM updates from ${change.operationDetailed} are not supported`);
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
    renderSession;
    lastValue;
    dataSource;
    constructor(dataSource, api) {
        super(dataSource, api);
        this.api.cancellationToken.addCancelable(() => this.renderSession?.sessionToken.cancel());
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
//# sourceMappingURL=aurum_element.js.map

/***/ }),

/***/ "./node_modules/aurumjs/prebuilt/esnext/rendering/webcomponent.js":
/*!************************************************************************!*\
  !*** ./node_modules/aurumjs/prebuilt/esnext/rendering/webcomponent.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Webcomponent": () => (/* binding */ Webcomponent)
/* harmony export */ });
/* harmony import */ var _utilities_aurum_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities/aurum.js */ "./node_modules/aurumjs/prebuilt/esnext/utilities/aurum.js");
/* harmony import */ var _aurum_element_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./aurum_element.js */ "./node_modules/aurumjs/prebuilt/esnext/rendering/aurum_element.js");
/* harmony import */ var _stream_data_source_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../stream/data_source.js */ "./node_modules/aurumjs/prebuilt/esnext/stream/data_source.js");
/* harmony import */ var _builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../builtin_components/dom_adapter.js */ "./node_modules/aurumjs/prebuilt/esnext/builtin_components/dom_adapter.js");




/**
 * Wrapper around native web components allows using aurum style component structure to create native components.
 */
function Webcomponent(config, logic) {
    customElements.define(config.name, class extends (config.baseClass ?? HTMLElement) {
        api;
        session;
        props;
        constructor() {
            super();
            if (config.observedAttributes === undefined) {
                config.observedAttributes = [];
            }
            this.props = {};
            for (const attr of config.observedAttributes) {
                this.props[attr] = new _stream_data_source_js__WEBPACK_IMPORTED_MODULE_2__.DataSource();
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
            const template = document.createDocumentFragment();
            this.session = (0,_aurum_element_js__WEBPACK_IMPORTED_MODULE_1__.createRenderSession)();
            this.api = (0,_aurum_element_js__WEBPACK_IMPORTED_MODULE_1__.createAPI)(this.session);
            const content = logic(this.props, this.api);
            for (const cb of this.session.attachCalls) {
                cb();
            }
            _utilities_aurum_js__WEBPACK_IMPORTED_MODULE_0__.Aurum.attach(content, template);
            this.attachShadow({
                mode: config.shadowRootMode ?? 'open',
                delegatesFocus: config.shadowRootDelegatesFocus
            }).appendChild(template);
        }
        disconnectedCallback() {
            this.session.sessionToken.cancel();
        }
    });
    return (0,_builtin_components_dom_adapter_js__WEBPACK_IMPORTED_MODULE_3__.DomNodeCreator)(config.name, config.observedAttributes, undefined, (node, props) => {
        for (const key in props) {
            //@ts-ignore
            if (!(key in node.props)) {
                //@ts-ignore
                node.props[key] = props[key];
            }
        }
    });
}
//# sourceMappingURL=webcomponent.js.map

/***/ }),

/***/ "./node_modules/aurumjs/prebuilt/esnext/stream/data_source.js":
/*!********************************************************************!*\
  !*** ./node_modules/aurumjs/prebuilt/esnext/stream/data_source.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ArrayDataSource": () => (/* binding */ ArrayDataSource),
/* harmony export */   "DataSource": () => (/* binding */ DataSource),
/* harmony export */   "FilteredArrayView": () => (/* binding */ FilteredArrayView),
/* harmony export */   "FlattenedArrayView": () => (/* binding */ FlattenedArrayView),
/* harmony export */   "LimitedArrayView": () => (/* binding */ LimitedArrayView),
/* harmony export */   "MapDataSource": () => (/* binding */ MapDataSource),
/* harmony export */   "MappedArrayView": () => (/* binding */ MappedArrayView),
/* harmony export */   "ReversedArrayView": () => (/* binding */ ReversedArrayView),
/* harmony export */   "SetDataSource": () => (/* binding */ SetDataSource),
/* harmony export */   "SlicedArrayView": () => (/* binding */ SlicedArrayView),
/* harmony export */   "SortedArrayView": () => (/* binding */ SortedArrayView),
/* harmony export */   "UniqueArrayView": () => (/* binding */ UniqueArrayView),
/* harmony export */   "dsCriticalSection": () => (/* binding */ dsCriticalSection),
/* harmony export */   "dsForkInline": () => (/* binding */ dsForkInline),
/* harmony export */   "processTransform": () => (/* binding */ processTransform)
/* harmony export */ });
/* harmony import */ var _aurum_server_aurum_server_client_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../aurum_server/aurum_server_client.js */ "./node_modules/aurumjs/prebuilt/esnext/aurum_server/aurum_server_client.js");
/* harmony import */ var _debug_mode_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../debug_mode.js */ "./node_modules/aurumjs/prebuilt/esnext/debug_mode.js");
/* harmony import */ var _utilities_cancellation_token_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utilities/cancellation_token.js */ "./node_modules/aurumjs/prebuilt/esnext/utilities/cancellation_token.js");
/* harmony import */ var _utilities_event_emitter_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utilities/event_emitter.js */ "./node_modules/aurumjs/prebuilt/esnext/utilities/event_emitter.js");
/* harmony import */ var _utilities_iteration_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utilities/iteration.js */ "./node_modules/aurumjs/prebuilt/esnext/utilities/iteration.js");
/* harmony import */ var _utilities_sources_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utilities/sources.js */ "./node_modules/aurumjs/prebuilt/esnext/utilities/sources.js");
/* harmony import */ var _data_source_operators_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./data_source_operators.js */ "./node_modules/aurumjs/prebuilt/esnext/stream/data_source_operators.js");
/* harmony import */ var _duplex_data_source_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./duplex_data_source.js */ "./node_modules/aurumjs/prebuilt/esnext/stream/duplex_data_source.js");
/* harmony import */ var _operator_model_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./operator_model.js */ "./node_modules/aurumjs/prebuilt/esnext/stream/operator_model.js");









/**
 * Datasources wrap a value and allow you to update it in an observable way. Datasources can be manipulated like streams and can be bound directly in the JSX syntax and will update the html whenever the value changes
 */
class DataSource {
    /**
     * The current value of this data source, can be changed through update
     */
    value;
    primed;
    updating;
    name;
    updateEvent;
    errorHandler;
    errorEvent;
    constructor(initialValue, name = 'RootDataSource') {
        this.name = name;
        this.value = initialValue;
        if (_debug_mode_js__WEBPACK_IMPORTED_MODULE_1__.debugMode) {
            (0,_debug_mode_js__WEBPACK_IMPORTED_MODULE_1__.debugRegisterStream)(this, new Error().stack);
        }
        this.primed = initialValue !== undefined;
        this.errorEvent = new _utilities_event_emitter_js__WEBPACK_IMPORTED_MODULE_3__.EventEmitter();
        this.updateEvent = new _utilities_event_emitter_js__WEBPACK_IMPORTED_MODULE_3__.EventEmitter();
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
        (0,_aurum_server_aurum_server_client_js__WEBPACK_IMPORTED_MODULE_0__.syncDataSource)(result, aurumServerInfo, cancellation);
        return result;
    }
    static fromMultipleSources(sources, cancellation) {
        const result = new DataSource();
        for (const s of sources) {
            if (_debug_mode_js__WEBPACK_IMPORTED_MODULE_1__.debugMode) {
                (0,_debug_mode_js__WEBPACK_IMPORTED_MODULE_1__.debugRegisterLink)(s, result);
            }
            s.listenInternal((v) => result.update(v), cancellation);
        }
        result.name = `Combination of [${sources.map((v) => v.name).join(' & ')}]`;
        return result;
    }
    static fromAsyncIterator(iterator, cancellation) {
        const result = new DataSource();
        (async () => {
            try {
                for await (const item of iterator) {
                    if (cancellation?.isCanceled) {
                        return;
                    }
                    result.update(item);
                }
            }
            catch (e) {
                result.emitError(e);
            }
        })();
        return result;
    }
    static fromPromise(promise, cancellation) {
        const result = new DataSource();
        promise.then((v) => {
            if (cancellation?.isCanceled) {
                return;
            }
            result.update(v);
        }, result.emitError.bind(result));
        return result;
    }
    static fromPromiseArray(promises, cancellation) {
        const result = new DataSource();
        (async () => {
            for await (const promise of (0,_utilities_iteration_js__WEBPACK_IMPORTED_MODULE_4__.promiseIterator)(promises, cancellation)) {
                if (cancellation?.isCanceled) {
                    return;
                }
                if (promise.status === 'fulfilled') {
                    result.update(promise.value);
                }
                else {
                    result.emitError(promise.reason);
                }
            }
        })();
        return result;
    }
    toAsyncIterator(cancellation) {
        return this.updateEvent.toAsyncIterator(cancellation);
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
        //@ts-expect-error Typescript tries to be smart and thinks this could never happen but it can with the any type as T
        if (newValue === this) {
            throw new Error('Cannot update data source with itself');
        }
        this.primed = true;
        if (this.updating) {
            throw new Error('Problem in data source: Unstable value propagation. When updating a value the stream was updated back as a direct response. This can lead to infinite loops and is therefore not allowed');
        }
        this.updating = true;
        this.value = newValue;
        this.updateEvent.fire(newValue);
        if (_debug_mode_js__WEBPACK_IMPORTED_MODULE_1__.debugMode) {
            (0,_debug_mode_js__WEBPACK_IMPORTED_MODULE_1__.debugDeclareUpdate)(this, newValue, new Error().stack);
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
        if (_debug_mode_js__WEBPACK_IMPORTED_MODULE_1__.debugMode) {
            (0,_debug_mode_js__WEBPACK_IMPORTED_MODULE_1__.debugRegisterConsumer)(this, callback.toString(), new Error().stack);
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
        ].filter((e) => e && (e instanceof _utilities_cancellation_token_js__WEBPACK_IMPORTED_MODULE_2__.CancellationToken ? ((token = e), false) : true));
        if (cancellationToken) {
            token = cancellationToken;
        }
        const result = new DataSource(undefined, this.name + ' ' + operations.map((v) => v.name).join(' '));
        if (_debug_mode_js__WEBPACK_IMPORTED_MODULE_1__.debugMode) {
            (0,_debug_mode_js__WEBPACK_IMPORTED_MODULE_1__.debugRegisterLink)(this, result);
        }
        (this.primed ? this.listenAndRepeatInternal : this.listenInternal).call(this, processTransform(operations, result), token);
        this.onError((e) => result.emitError(e), token);
        return result;
    }
    static fromCombination(sources, cancellationToken) {
        if (sources.length === 0) {
            throw new Error('Cannot combine zero data sources');
        }
        return sources[0].combine(sources.slice(1), cancellationToken);
    }
    static fromAggregation(sources, combinator, cancellationToken) {
        cancellationToken = cancellationToken ?? new _utilities_cancellation_token_js__WEBPACK_IMPORTED_MODULE_2__.CancellationToken();
        const aggregatedSource = new DataSource(combinator(...sources.map((s) => s?.value)));
        for (let i = 0; i < sources.length; i++) {
            sources[i]?.listen(() => {
                aggregatedSource.update(combinator(...sources.map((s) => s?.value)));
            }, cancellationToken);
        }
        return aggregatedSource;
    }
    aggregate(otherSources, combinator, cancellationToken) {
        cancellationToken = cancellationToken ?? new _utilities_cancellation_token_js__WEBPACK_IMPORTED_MODULE_2__.CancellationToken();
        const aggregatedSource = new DataSource(combinator(this.value, ...otherSources.map((s) => s?.value)));
        for (let i = 0; i < otherSources.length; i++) {
            otherSources[i]?.listen(() => {
                aggregatedSource.update(combinator(this.value, ...otherSources.map((s) => s?.value)));
            }, cancellationToken);
        }
        this.listen(() => aggregatedSource.update(combinator(this.value, ...otherSources.map((s) => s?.value))), cancellationToken);
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
        cancellationToken = cancellationToken ?? new _utilities_cancellation_token_js__WEBPACK_IMPORTED_MODULE_2__.CancellationToken();
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
            session.set(item, new _utilities_cancellation_token_js__WEBPACK_IMPORTED_MODULE_2__.CancellationToken());
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
        cancellationToken = cancellationToken ?? new _utilities_cancellation_token_js__WEBPACK_IMPORTED_MODULE_2__.CancellationToken();
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
class ArrayDataSource {
    data;
    updateEvent;
    lengthSource;
    name;
    onItemsAdded = new _utilities_event_emitter_js__WEBPACK_IMPORTED_MODULE_3__.EventEmitter();
    onItemsRemoved = new _utilities_event_emitter_js__WEBPACK_IMPORTED_MODULE_3__.EventEmitter();
    constructor(initialData, name = 'RootArrayDataSource') {
        this.name = name;
        if (initialData) {
            this.data = initialData.slice();
        }
        else {
            this.data = [];
        }
        this.lengthSource = new DataSource(this.data.length, this.name + '.length');
        this.updateEvent = new _utilities_event_emitter_js__WEBPACK_IMPORTED_MODULE_3__.EventEmitter();
    }
    *[Symbol.iterator]() {
        yield* this.getData();
        return;
    }
    /**
     * Returns a datasource that always contains the item that is currently at the specified index
     * @param index
     * @param cancellationToken
     * @returns
     */
    pickAt(index, cancellationToken) {
        if (index < 0) {
            throw new Error('Index out of bounds');
        }
        const result = new DataSource(this.data[index], this.name + `[${index}]`);
        this.listen((change) => {
            if (result.value !== change.newState[index]) {
                result.update(change.newState[index]);
            }
        }, cancellationToken);
        return result;
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
                    onComplete?.();
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
        const { onParseError, onComplete, itemSeperatorSequence = '\n' } = config;
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
                    onComplete?.();
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
        (0,_aurum_server_aurum_server_client_js__WEBPACK_IMPORTED_MODULE_0__.syncArrayDataSource)(result, aurumServerInfo, cancellation);
        return result;
    }
    static fromMultipleSources(sources, cancellationToken) {
        const boundaries = [0];
        const result = new ArrayDataSource(undefined, `ArrayDataSource of (${sources.reduce((p, c) => p + (c instanceof ArrayDataSource ? c.name + ' ' : ''), '')})`);
        for (let i = 0; i < sources.length; i++) {
            const item = sources[i];
            if (Array.isArray(item)) {
                result.appendArray(item);
            }
            else if (item instanceof DataSource || item instanceof _duplex_data_source_js__WEBPACK_IMPORTED_MODULE_7__.DuplexDataSource) {
                let index = i;
                item.transform((0,_data_source_operators_js__WEBPACK_IMPORTED_MODULE_6__.dsDiff)(), (0,_data_source_operators_js__WEBPACK_IMPORTED_MODULE_6__.dsTap)(({ newValue, oldValue }) => {
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
                result.appendArray(sources[i].data ?? []);
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
                    result.appendArray(items.map((item) => (0,_utilities_sources_js__WEBPACK_IMPORTED_MODULE_5__.getValueOf)(item)));
                    break;
                case 'prepend':
                    for (const item of items) {
                        listenToItem(item);
                    }
                    result.unshift(...items.map((item) => (0,_utilities_sources_js__WEBPACK_IMPORTED_MODULE_5__.getValueOf)(item)));
                    break;
                case 'merge':
                    for (const item of previousState) {
                        stopLitenToItem(item);
                    }
                    for (const item of newState) {
                        listenToItem(item);
                    }
                    result.merge(newState.map((i) => (0,_utilities_sources_js__WEBPACK_IMPORTED_MODULE_5__.getValueOf)(i)));
                    break;
                case 'insert':
                    for (const item of items) {
                        listenToItem(item);
                    }
                    result.insertAt(index, ...items.map((item) => (0,_utilities_sources_js__WEBPACK_IMPORTED_MODULE_5__.getValueOf)(item)));
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
                    result.set(index, (0,_utilities_sources_js__WEBPACK_IMPORTED_MODULE_5__.getValueOf)(items[0]));
                    break;
                case 'swap':
                    result.swap(index, index2);
                    break;
            }
        }, cancellation);
        return result;
        function listenToItem(item) {
            if (typeof item !== 'object' || !('listen' in item)) {
                return;
            }
            session.set(item, new _utilities_cancellation_token_js__WEBPACK_IMPORTED_MODULE_2__.CancellationToken());
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
    static fromAsyncIterator(iterator, cancellation) {
        const result = new ArrayDataSource();
        (async () => {
            for await (const item of iterator) {
                if (cancellation?.isCanceled) {
                    return;
                }
                result.push(item);
            }
        })();
        return result;
    }
    static fromPromiseArray(promises, cancellation) {
        const result = new ArrayDataSource();
        (async () => {
            for await (const promise of (0,_utilities_iteration_js__WEBPACK_IMPORTED_MODULE_4__.promiseIterator)(promises, cancellation)) {
                if (cancellation?.isCanceled) {
                    return;
                }
                result.push(promise);
            }
        })();
        return result;
    }
    toAsyncIterator(cancellation) {
        return this.updateEvent.toAsyncIterator(cancellation);
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
    removeWhere(reject) {
        const removed = this.data.filter(reject);
        for (const item of removed) {
            this.remove(item);
        }
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
            switch (change.operationDetailed) {
                case 'append':
                    let newVal = result.value;
                    for (const item of change.items) {
                        newVal = reducer(newVal, item);
                    }
                    result.update(newVal);
                    break;
                case 'clear':
                    result.update(initial);
                    break;
                case 'removeRight':
                case 'removeLeft':
                case 'prepend':
                case 'insert':
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
            if (!config?.ignoredOperations?.includes(change.operationDetailed)) {
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
            if (!config?.ignoredOperations?.includes(change.operationDetailed)) {
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
            if (!config?.ignoredOperations?.includes(change.operationDetailed)) {
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
            if (!config?.ignoredOperations?.includes(change.operationDetailed)) {
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
            if (!config?.ignoredOperations?.includes(change.operationDetailed)) {
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
    limit(count, cancellationToken) {
        const view = new LimitedArrayView(this, count, cancellationToken, this.name + '.limit()');
        return view;
    }
    forEach(callbackfn) {
        return this.data.forEach(callbackfn);
    }
    update(change) {
        this.updateEvent.fire(change);
    }
}
class FlattenedArrayView extends ArrayDataSource {
    parent;
    depth;
    sessionToken;
    constructor(parent, depth, cancellationToken = new _utilities_cancellation_token_js__WEBPACK_IMPORTED_MODULE_2__.CancellationToken(), name, config) {
        super([], name);
        this.depth = depth;
        this.parent = parent;
        this.refresh();
        parent.listen((change) => {
            if (config?.ignoredOperations?.includes(change.operationDetailed)) {
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
                this.sessionToken = new _utilities_cancellation_token_js__WEBPACK_IMPORTED_MODULE_2__.CancellationToken();
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
class MappedArrayView extends ArrayDataSource {
    parent;
    mapper;
    constructor(parent, mapper, cancellationToken = new _utilities_cancellation_token_js__WEBPACK_IMPORTED_MODULE_2__.CancellationToken(), name, config) {
        const initial = parent.getData().map(mapper);
        super(initial, name);
        this.parent = parent;
        this.mapper = mapper;
        parent.listen((change) => {
            if (config?.ignoredOperations?.includes(change.operationDetailed)) {
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
class ReversedArrayView extends ArrayDataSource {
    parent;
    constructor(parent, cancellationToken = new _utilities_cancellation_token_js__WEBPACK_IMPORTED_MODULE_2__.CancellationToken(), name, config) {
        const initial = parent.getData().slice().reverse();
        super(initial, name);
        this.parent = parent;
        parent.listen((change) => {
            if (config?.ignoredOperations?.includes(change.operationDetailed)) {
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
class SlicedArrayView extends ArrayDataSource {
    constructor(parent, start, end, cancellationToken = new _utilities_cancellation_token_js__WEBPACK_IMPORTED_MODULE_2__.CancellationToken(), name, config) {
        const initial = parent.getData().slice(start.value, end.value);
        super(initial, name);
        start.listen(() => this.merge(parent.getData().slice(start.value, end.value)), cancellationToken);
        end.listen(() => this.merge(parent.getData().slice(start.value, end.value)), cancellationToken);
        parent.listen((change) => {
            if (config?.ignoredOperations?.includes(change.operationDetailed)) {
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
class UniqueArrayView extends ArrayDataSource {
    constructor(parent, cancellationToken = new _utilities_cancellation_token_js__WEBPACK_IMPORTED_MODULE_2__.CancellationToken(), name, config) {
        const initial = Array.from(new Set(parent.getData()));
        super(initial, name);
        let filteredItems;
        parent.listen((change) => {
            if (config?.ignoredOperations?.includes(change.operationDetailed)) {
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
class SortedArrayView extends ArrayDataSource {
    comparator;
    parent;
    constructor(parent, comparator, cancellationToken = new _utilities_cancellation_token_js__WEBPACK_IMPORTED_MODULE_2__.CancellationToken(), name, config) {
        const initial = parent.getData().slice().sort(comparator);
        super(initial, name);
        this.parent = parent;
        this.comparator = comparator;
        parent.listen((change) => {
            if (config?.ignoredOperations?.includes(change.operationDetailed)) {
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
class FilteredArrayView extends ArrayDataSource {
    viewFilter;
    parent;
    constructor(parent, filter, cancellationToken = new _utilities_cancellation_token_js__WEBPACK_IMPORTED_MODULE_2__.CancellationToken(), name, config) {
        if (Array.isArray(parent)) {
            parent = new ArrayDataSource(parent);
        }
        filter = filter ?? (() => true);
        const initial = parent.data.filter(filter);
        super(initial, name);
        this.parent = parent;
        this.viewFilter = filter;
        parent.listen((change) => {
            if (config?.ignoredOperations?.includes(change.operationDetailed)) {
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
class LimitedArrayView extends ArrayDataSource {
    constructor(parent, sizeLimit, cancellationToken = new _utilities_cancellation_token_js__WEBPACK_IMPORTED_MODULE_2__.CancellationToken(), name) {
        if (Array.isArray(parent)) {
            parent = new ArrayDataSource(parent);
        }
        const initial = parent.data.slice(0, sizeLimit);
        super(initial, name);
        parent.listen((change) => {
            switch (change.operationDetailed) {
                case 'clear':
                    this.clear();
                    break;
                case 'removeLeft':
                case 'removeRight':
                case 'remove':
                    if (change.index < sizeLimit) {
                        this.removeRange(change.index, change.index + Math.min(sizeLimit, change.count));
                        if (this.data.length < sizeLimit) {
                            this.appendArray(change.newState.slice(this.data.length, sizeLimit));
                        }
                    }
                    break;
                case 'prepend':
                    this.removeRight(Math.min(change.count, sizeLimit));
                    this.unshift(...change.items.slice(0, sizeLimit));
                    break;
                case 'append':
                    if (this.data.length < sizeLimit) {
                        this.appendArray(change.items.slice(0, sizeLimit - this.data.length));
                    }
                    break;
                case 'insert':
                    if (change.index < sizeLimit) {
                        this.removeRight(Math.min(change.count, sizeLimit - change.index));
                        this.insertAt(change.index, ...change.items.slice(0, sizeLimit - change.index));
                    }
                    break;
                case 'merge':
                case 'swap':
                    this.merge(change.newState.slice(0, sizeLimit));
                    break;
                case 'replace':
                    if (change.index < sizeLimit) {
                        this.set(change.index, change.items[0]);
                    }
                    break;
            }
        }, cancellationToken);
    }
}
function processTransform(operations, result) {
    return async (v) => {
        try {
            for (const operation of operations) {
                switch (operation.operationType) {
                    case _operator_model_js__WEBPACK_IMPORTED_MODULE_8__.OperationType.NOOP:
                    case _operator_model_js__WEBPACK_IMPORTED_MODULE_8__.OperationType.MAP:
                        v = operation.operation(v);
                        break;
                    case _operator_model_js__WEBPACK_IMPORTED_MODULE_8__.OperationType.MAP_DELAY_FILTER:
                        const tmp = await operation.operation(v);
                        if (tmp.cancelled) {
                            return;
                        }
                        else {
                            v = await tmp.item;
                        }
                        break;
                    case _operator_model_js__WEBPACK_IMPORTED_MODULE_8__.OperationType.DELAY:
                    case _operator_model_js__WEBPACK_IMPORTED_MODULE_8__.OperationType.MAP_DELAY:
                        v = await operation.operation(v);
                        break;
                    case _operator_model_js__WEBPACK_IMPORTED_MODULE_8__.OperationType.DELAY_FILTER:
                        if (!(await operation.operation(v))) {
                            return;
                        }
                        break;
                    case _operator_model_js__WEBPACK_IMPORTED_MODULE_8__.OperationType.FILTER:
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
class MapDataSource {
    data;
    updateEvent;
    updateEventOnKey;
    constructor(initialData) {
        this.data = initialData ?? new Map();
        this.updateEvent = new _utilities_event_emitter_js__WEBPACK_IMPORTED_MODULE_3__.EventEmitter();
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
        (0,_aurum_server_aurum_server_client_js__WEBPACK_IMPORTED_MODULE_0__.syncMapDataSource)(result, aurumServerInfo, cancellation);
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
    toAsyncIterator(cancellation) {
        return this.updateEvent.toAsyncIterator(cancellation);
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
                const lifeTimeToken = new _utilities_cancellation_token_js__WEBPACK_IMPORTED_MODULE_2__.CancellationToken();
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
    toKeysArrayDataSource(cancellation) {
        const result = new ArrayDataSource();
        this.listenAndRepeat((change) => {
            if (change.deleted) {
                result.remove(change.key);
            }
            else if (!change.deleted) {
                if (!result.includes(change.key)) {
                    result.push(change.key);
                }
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
    toEntriesArrayDataSource(cancellation) {
        const stateMap = new Map();
        const result = new ArrayDataSource();
        this.listenAndRepeat((change) => {
            if (change.deleted && stateMap.has(change.key)) {
                const index = result.findIndex((v) => v[0] === change.key);
                result.removeAt(index);
                stateMap.delete(change.key);
            }
            else if (stateMap.has(change.key)) {
                const newItem = change.newValue;
                const index = result.findIndex((v) => v[0] === change.key);
                result.set(index, [change.key, newItem]);
                stateMap.set(change.key, newItem);
            }
            else if (!stateMap.has(change.key) && !change.deleted) {
                const newItem = change.newValue;
                result.push([change.key, newItem]);
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
            this.updateEventOnKey.set(key, new _utilities_event_emitter_js__WEBPACK_IMPORTED_MODULE_3__.EventEmitter());
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
    merge(newData) {
        for (const key of newData.keys()) {
            this.set(key, newData.get(key));
        }
        for (const key of this.keys()) {
            if (!newData.has(key)) {
                this.delete(key);
            }
        }
    }
    entries() {
        return this.data.entries();
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
class SetDataSource {
    data;
    updateEvent;
    updateEventOnKey;
    constructor(initialData) {
        if (Array.isArray(initialData)) {
            this.data = new Set(initialData);
        }
        else {
            this.data = initialData ?? new Set();
        }
        this.updateEvent = new _utilities_event_emitter_js__WEBPACK_IMPORTED_MODULE_3__.EventEmitter();
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
        (0,_aurum_server_aurum_server_client_js__WEBPACK_IMPORTED_MODULE_0__.syncSetDataSource)(result, aurumServerInfo, cancellation);
        return result;
    }
    static fromAsyncIterator(iterator, cancellation) {
        const result = new SetDataSource();
        (async () => {
            for await (const item of iterator) {
                if (cancellation?.isCanceled) {
                    return;
                }
                result.add(item);
            }
        })();
        return result;
    }
    toAsyncIterator(cancellation) {
        return this.updateEvent.toAsyncIterator(cancellation);
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
            this.updateEventOnKey.set(key, new _utilities_event_emitter_js__WEBPACK_IMPORTED_MODULE_3__.EventEmitter());
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
     * Returns a datasource that reflects if the key exists in the set
     * @param key
     * @param cancellationToken
     * @returns
     */
    pickKey(key, cancellationToken) {
        const result = new DataSource(this.has(key));
        this.listenOnKey(key, (v) => result.update(v), cancellationToken);
        return result;
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
    merge(newData) {
        let newItems;
        if (newData instanceof SetDataSource) {
            newItems = newData.data;
        }
        else if (newData instanceof Set) {
            newItems = newData;
        }
        else if (newData instanceof ArrayDataSource) {
            newItems = new Set(newData.getData());
        }
        else {
            newItems = new Set(newData);
        }
        for (const item of this.data) {
            if (!newItems.has(item)) {
                this.delete(item);
            }
        }
        for (const item of newItems) {
            this.add(item);
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
/**
 * Only allows one update to propagate through the operations at a time. If a new update comes in while the previous one is still being processed it will be buffered and processed after the previous one is done
 */
function dsCriticalSection(operationA, operationB, operationC, operationD, operationE, operationF, operationG, operationH, operationI, operationJ, operationK) {
    const lockState = new DataSource(false);
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
    ].filter((v) => v !== undefined);
    const buffer = [];
    lockState.listen((v) => {
        if (!v) {
            if (buffer.length > 0) {
                queueMicrotask(async () => {
                    if (!lockState.value) {
                        lockState.update(true);
                        const item = buffer.shift();
                        try {
                            const value = await processInlineTransform(operations, item.value);
                            item.resolve(value);
                        }
                        catch (e) {
                            item.reject(e);
                        }
                        finally {
                            lockState.update(false);
                        }
                    }
                });
            }
        }
    });
    return {
        name: `CriticalSection<${operations.map((v) => v.name).join(', ')}>`,
        operationType: _operator_model_js__WEBPACK_IMPORTED_MODULE_8__.OperationType.MAP_DELAY_FILTER,
        operation: async (v) => {
            if (!lockState.value) {
                lockState.update(true);
                try {
                    const result = await processInlineTransform(operations, v);
                    return result;
                }
                finally {
                    lockState.update(false);
                }
            }
            return new Promise((resolve, reject) => {
                buffer.push({
                    resolve,
                    reject,
                    value: v
                });
            });
        }
    };
}
function dsForkInline(condition, operationA, operationB, operationC, operationD, operationE, operationF, operationG, operationH, operationI) {
    const ops = [operationA, operationB, operationC, operationD, operationE, operationF, operationG, operationH, operationI].filter((v) => v !== undefined);
    return {
        name: 'fork-inline',
        operationType: _operator_model_js__WEBPACK_IMPORTED_MODULE_8__.OperationType.MAP_DELAY_FILTER,
        operation: async (v) => {
            if (condition(v)) {
                return processInlineTransform(ops, v);
            }
            else {
                return { item: v, cancelled: false };
            }
        }
    };
}
async function processInlineTransform(operations, value) {
    let out;
    let error;
    let hasValue = false;
    const sink = new DataSource();
    sink.listen((result) => {
        out = result;
        hasValue = true;
    });
    sink.handleErrors((e) => {
        error = e;
    });
    await processTransform(operations, sink)(value);
    if (error) {
        throw error;
    }
    return { item: out, cancelled: !hasValue };
}
//# sourceMappingURL=data_source.js.map

/***/ }),

/***/ "./node_modules/aurumjs/prebuilt/esnext/stream/data_source_operators.js":
/*!******************************************************************************!*\
  !*** ./node_modules/aurumjs/prebuilt/esnext/stream/data_source_operators.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dsAccumulate": () => (/* binding */ dsAccumulate),
/* harmony export */   "dsAwait": () => (/* binding */ dsAwait),
/* harmony export */   "dsAwaitLatest": () => (/* binding */ dsAwaitLatest),
/* harmony export */   "dsAwaitOrdered": () => (/* binding */ dsAwaitOrdered),
/* harmony export */   "dsBuffer": () => (/* binding */ dsBuffer),
/* harmony export */   "dsCutOff": () => (/* binding */ dsCutOff),
/* harmony export */   "dsCutOffDynamic": () => (/* binding */ dsCutOffDynamic),
/* harmony export */   "dsDebounce": () => (/* binding */ dsDebounce),
/* harmony export */   "dsDelay": () => (/* binding */ dsDelay),
/* harmony export */   "dsDiff": () => (/* binding */ dsDiff),
/* harmony export */   "dsEven": () => (/* binding */ dsEven),
/* harmony export */   "dsFilter": () => (/* binding */ dsFilter),
/* harmony export */   "dsFilterAsync": () => (/* binding */ dsFilterAsync),
/* harmony export */   "dsFork": () => (/* binding */ dsFork),
/* harmony export */   "dsHistory": () => (/* binding */ dsHistory),
/* harmony export */   "dsLoadBalance": () => (/* binding */ dsLoadBalance),
/* harmony export */   "dsLock": () => (/* binding */ dsLock),
/* harmony export */   "dsLog": () => (/* binding */ dsLog),
/* harmony export */   "dsMap": () => (/* binding */ dsMap),
/* harmony export */   "dsMapAsync": () => (/* binding */ dsMapAsync),
/* harmony export */   "dsMax": () => (/* binding */ dsMax),
/* harmony export */   "dsMicroDebounce": () => (/* binding */ dsMicroDebounce),
/* harmony export */   "dsMin": () => (/* binding */ dsMin),
/* harmony export */   "dsOdd": () => (/* binding */ dsOdd),
/* harmony export */   "dsPick": () => (/* binding */ dsPick),
/* harmony export */   "dsPipe": () => (/* binding */ dsPipe),
/* harmony export */   "dsPipeAll": () => (/* binding */ dsPipeAll),
/* harmony export */   "dsPipeUp": () => (/* binding */ dsPipeUp),
/* harmony export */   "dsReduce": () => (/* binding */ dsReduce),
/* harmony export */   "dsSemaphore": () => (/* binding */ dsSemaphore),
/* harmony export */   "dsSkip": () => (/* binding */ dsSkip),
/* harmony export */   "dsSkipDynamic": () => (/* binding */ dsSkipDynamic),
/* harmony export */   "dsStringJoin": () => (/* binding */ dsStringJoin),
/* harmony export */   "dsTap": () => (/* binding */ dsTap),
/* harmony export */   "dsThrottle": () => (/* binding */ dsThrottle),
/* harmony export */   "dsThrottleFrame": () => (/* binding */ dsThrottleFrame),
/* harmony export */   "dsThroughputMeter": () => (/* binding */ dsThroughputMeter),
/* harmony export */   "dsUnique": () => (/* binding */ dsUnique),
/* harmony export */   "dsUpdateToken": () => (/* binding */ dsUpdateToken)
/* harmony export */ });
/* harmony import */ var _utilities_cancellation_token_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities/cancellation_token.js */ "./node_modules/aurumjs/prebuilt/esnext/utilities/cancellation_token.js");
/* harmony import */ var _utilities_event_emitter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utilities/event_emitter.js */ "./node_modules/aurumjs/prebuilt/esnext/utilities/event_emitter.js");
/* harmony import */ var _data_source_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./data_source.js */ "./node_modules/aurumjs/prebuilt/esnext/stream/data_source.js");
/* harmony import */ var _operator_model_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./operator_model.js */ "./node_modules/aurumjs/prebuilt/esnext/stream/operator_model.js");
/* harmony import */ var _stream_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./stream.js */ "./node_modules/aurumjs/prebuilt/esnext/stream/stream.js");





/**
 * Mutates an update
 */
function dsMap(mapper) {
    return {
        name: 'map',
        operationType: _operator_model_js__WEBPACK_IMPORTED_MODULE_3__.OperationType.MAP,
        operation: (v) => mapper(v)
    };
}
/**
 * Forwards an update to one of two possible sources based on a condition
 */
function dsFork(condition, truthyPath, falsyPath) {
    return {
        name: 'fork',
        operationType: _operator_model_js__WEBPACK_IMPORTED_MODULE_3__.OperationType.NOOP,
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
/**
 * Same as map but with an async mapper function
 */
function dsMapAsync(mapper) {
    return {
        name: 'mapAsync',
        operationType: _operator_model_js__WEBPACK_IMPORTED_MODULE_3__.OperationType.MAP_DELAY,
        operation: (v) => mapper(v)
    };
}
/**
 * Changes updates to contain the value of the previous update as well as the current
 */
function dsDiff() {
    let lastValue = undefined;
    return {
        name: 'diff',
        operationType: _operator_model_js__WEBPACK_IMPORTED_MODULE_3__.OperationType.MAP,
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
/**
 * Changes updates to contain the value of the previous update as well as the current
 */
function dsUpdateToken() {
    let token;
    return {
        name: 'diff',
        operationType: _operator_model_js__WEBPACK_IMPORTED_MODULE_3__.OperationType.MAP,
        operation: (v) => {
            if (token) {
                token.cancel();
            }
            token = new _utilities_cancellation_token_js__WEBPACK_IMPORTED_MODULE_0__.CancellationToken();
            return {
                token,
                value: v
            };
        }
    };
}
/**
 * Blocks updates that don't pass the filter predicate
 */
function dsFilter(predicate) {
    return {
        name: 'filter',
        operationType: _operator_model_js__WEBPACK_IMPORTED_MODULE_3__.OperationType.FILTER,
        operation: (v) => predicate(v)
    };
}
/**
 * Same as filter but with an async predicate function
 */
function dsFilterAsync(predicate) {
    return {
        name: 'filterAsync',
        operationType: _operator_model_js__WEBPACK_IMPORTED_MODULE_3__.OperationType.DELAY_FILTER,
        operation: (v) => predicate(v)
    };
}
/**
 * Only propagate an update if the value is even
 */
function dsEven() {
    return {
        name: 'even',
        operationType: _operator_model_js__WEBPACK_IMPORTED_MODULE_3__.OperationType.FILTER,
        operation: (v) => v % 2 === 0
    };
}
/**
 * Only propagate an update if the value is odd
 */
function dsOdd() {
    return {
        name: 'odd',
        operationType: _operator_model_js__WEBPACK_IMPORTED_MODULE_3__.OperationType.FILTER,
        operation: (v) => v % 2 !== 0
    };
}
/**
 * Only propagate an update if the value is lower than the previous update
 */
function dsMin() {
    let last = Number.MAX_SAFE_INTEGER;
    return {
        name: 'min',
        operationType: _operator_model_js__WEBPACK_IMPORTED_MODULE_3__.OperationType.FILTER,
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
/**
 * Only propagate an update if the value is higher than the previous update
 */
function dsMax() {
    let last = Number.MIN_SAFE_INTEGER;
    return {
        name: 'max',
        operationType: _operator_model_js__WEBPACK_IMPORTED_MODULE_3__.OperationType.FILTER,
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
/**
 * Ignore the first N updates where N depends on an external source
 */
function dsSkipDynamic(amountLeft) {
    return {
        operationType: _operator_model_js__WEBPACK_IMPORTED_MODULE_3__.OperationType.FILTER,
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
/**
 * Ignore the first N updates
 */
function dsSkip(amount) {
    return {
        operationType: _operator_model_js__WEBPACK_IMPORTED_MODULE_3__.OperationType.FILTER,
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
/**
 * Allows only a certain number of updates to pass decreasing a counter on each pass
 * If the counter reaches 0 the updates are lost
 */
function dsCutOff(amount) {
    return {
        name: `cutoff ${amount}`,
        operationType: _operator_model_js__WEBPACK_IMPORTED_MODULE_3__.OperationType.FILTER,
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
/**
 * Allows only a certain number of updates to pass decreasing a counter on each pass, the counter being an external
 * datasource can be changed externally.
 * If the counter reaches 0 the updates are lost
 */
function dsCutOffDynamic(amountLeft) {
    return {
        name: 'cutoffDynamic',
        operationType: _operator_model_js__WEBPACK_IMPORTED_MODULE_3__.OperationType.FILTER,
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
/**
 * Allows only a certain number of updates to pass decreasing a counter on each pass, the counter being an external
 * datasource can be changed externally.
 * If the counter reaches 0 the updates are buffered until they are unlocked again
 */
function dsSemaphore(state) {
    return {
        operationType: _operator_model_js__WEBPACK_IMPORTED_MODULE_3__.OperationType.DELAY,
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
/**
 * Filters out updates if they have the same value as the previous update, uses reference equality by default
 */
function dsUnique(isEqual) {
    let primed = false;
    let last;
    return {
        name: 'unique',
        operationType: _operator_model_js__WEBPACK_IMPORTED_MODULE_3__.OperationType.FILTER,
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
/**
 * Takes promises and updates with the resolved value, if multiple promises come in processes updates as promises resolve in any order
 */
function dsAwait() {
    return {
        name: 'await',
        operationType: _operator_model_js__WEBPACK_IMPORTED_MODULE_3__.OperationType.MAP_DELAY,
        operation: (v) => {
            return v;
        }
    };
}
/**
 * Takes promises and updates with the resolved value, if multiple promises come in makes sure the updates fire in the same order that the promises came in
 */
function dsAwaitOrdered() {
    const queue = [];
    const onDequeue = new _utilities_event_emitter_js__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    return {
        operationType: _operator_model_js__WEBPACK_IMPORTED_MODULE_3__.OperationType.MAP_DELAY,
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
/**
 * awaits promise and forwards the resolved value, if a new promise comes in while the first isn't resolved then the first
 * promise will be ignored even if it resolves first and instead we focus on the newest promise. This is useful for cancellable
 * async operations where we only care about the result if it's the latest action
 */
function dsAwaitLatest() {
    let freshnessToken;
    return {
        operationType: _operator_model_js__WEBPACK_IMPORTED_MODULE_3__.OperationType.MAP_DELAY_FILTER,
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
/**
 * Reduces all updates down to a value
 */
function dsReduce(reducer, initialValue) {
    let last = initialValue;
    return {
        name: 'reduce',
        operationType: _operator_model_js__WEBPACK_IMPORTED_MODULE_3__.OperationType.MAP,
        operation: (v) => {
            last = reducer(last, v);
            return last;
        }
    };
}
/**
 * Builds a string where each update is appened to the string optionally with a seperator
 */
function dsStringJoin(seperator = ', ') {
    let last;
    return {
        name: `stringJoin ${seperator}`,
        operationType: _operator_model_js__WEBPACK_IMPORTED_MODULE_3__.OperationType.MAP,
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
/**
 * Adds a fixed amount of lag to updates
 */
function dsDelay(time) {
    return {
        name: `delay ${time}ms`,
        operationType: _operator_model_js__WEBPACK_IMPORTED_MODULE_3__.OperationType.DELAY,
        operation: (v) => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(v);
                }, time);
            });
        }
    };
}
/**
 * Starts a timer when an update occurs, delays the update until the timer passed if a new update arrives the initial
 * update is cancelled and the process starts again
 */
function dsDebounce(time) {
    let timeout;
    let cancelled = new _utilities_event_emitter_js__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    return {
        operationType: _operator_model_js__WEBPACK_IMPORTED_MODULE_3__.OperationType.DELAY_FILTER,
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
/**
 * Only allow up to 1 update to propagate per frame makes update run as a microtask
 */
function dsMicroDebounce() {
    let scheduled;
    return {
        operationType: _operator_model_js__WEBPACK_IMPORTED_MODULE_3__.OperationType.DELAY_FILTER,
        name: `microDebounce`,
        operation: (v) => {
            return new Promise((resolve) => {
                if (!scheduled) {
                    scheduled = true;
                    queueMicrotask(() => {
                        scheduled = false;
                        resolve(true);
                    });
                }
                else {
                    resolve(false);
                }
            });
        }
    };
}
/**
 * Debounce update to occur at most one per animation frame
 */
function dsThrottleFrame() {
    let timeout;
    let cancelled = new _utilities_event_emitter_js__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    return {
        operationType: _operator_model_js__WEBPACK_IMPORTED_MODULE_3__.OperationType.DELAY_FILTER,
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
/**
 * May or may not block all updates based on the state provided by another source
 * lock state
 * false => updates pass through
 * true => updates are blocked and dropped
 * Not suitable for synchronization purposes. Use dsCriticalSection instead
 */
function dsLock(state) {
    return {
        name: 'lock',
        operationType: _operator_model_js__WEBPACK_IMPORTED_MODULE_3__.OperationType.FILTER,
        operation: (v) => {
            if (!state.value) {
                return true;
            }
            else {
                return false;
            }
        }
    };
}
/**
 * Allows at most one update per N milliseconds to pass through
 */
function dsThrottle(time) {
    let cooldown = false;
    return {
        name: `throttle ${time}ms`,
        operationType: _operator_model_js__WEBPACK_IMPORTED_MODULE_3__.OperationType.FILTER,
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
/**
 * When an update occurs a timer is started, during that time all subsequent updates are collected in an array and then
 * once the timer runs out an update is made with all updates collected so far as an array
 */
function dsBuffer(time) {
    let buffer = [];
    let promise;
    return {
        name: `buffer ${time}ms`,
        operationType: _operator_model_js__WEBPACK_IMPORTED_MODULE_3__.OperationType.MAP_DELAY_FILTER,
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
/**
 * Extracts only the value of a key of the update value
 */
function dsPick(key) {
    return {
        name: `pick ${key.toString()}`,
        operationType: _operator_model_js__WEBPACK_IMPORTED_MODULE_3__.OperationType.MAP,
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
/**
 * Forwards an event to another source
 */
function dsPipe(target) {
    return {
        name: `pipe ${target.name}`,
        operationType: _operator_model_js__WEBPACK_IMPORTED_MODULE_3__.OperationType.NOOP,
        operation: (v) => {
            if (target instanceof _data_source_js__WEBPACK_IMPORTED_MODULE_2__.DataSource || target instanceof _stream_js__WEBPACK_IMPORTED_MODULE_4__.Stream) {
                target.update(v);
            }
            else {
                target.updateDownstream(v);
            }
            return v;
        }
    };
}
/**
 * Same as pipe except for duplex data sources it pipes upstream
 */
function dsPipeUp(target) {
    return {
        name: `pipeup ${target.name}`,
        operationType: _operator_model_js__WEBPACK_IMPORTED_MODULE_3__.OperationType.NOOP,
        operation: (v) => {
            if (target instanceof _data_source_js__WEBPACK_IMPORTED_MODULE_2__.DataSource || target instanceof _stream_js__WEBPACK_IMPORTED_MODULE_4__.Stream) {
                target.update(v);
            }
            else {
                target.updateUpstream(v);
            }
            return v;
        }
    };
}
/**
 * Lets you keep a history of the updates of a source by pushing it onto an array datasource
 */
function dsHistory(reportTarget, generations, cancellationToken = new _utilities_cancellation_token_js__WEBPACK_IMPORTED_MODULE_0__.CancellationToken()) {
    return {
        operationType: _operator_model_js__WEBPACK_IMPORTED_MODULE_3__.OperationType.NOOP,
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
/**
 * Monitors the number of events per interval
 */
function dsThroughputMeter(reportTarget, interval, cancellationToken = new _utilities_cancellation_token_js__WEBPACK_IMPORTED_MODULE_0__.CancellationToken()) {
    let amount = 0;
    cancellationToken.setInterval(() => {
        reportTarget.update(amount);
        amount = 0;
    }, interval);
    return {
        operationType: _operator_model_js__WEBPACK_IMPORTED_MODULE_3__.OperationType.NOOP,
        name: `throughput meter`,
        operation: (v) => {
            amount++;
            return v;
        }
    };
}
/**
 * Allows inserting a callback that gets called with an update
 */
function dsTap(cb) {
    return {
        name: 'tap',
        operationType: _operator_model_js__WEBPACK_IMPORTED_MODULE_3__.OperationType.NOOP,
        operation: (v) => {
            cb(v);
            return v;
        }
    };
}
/**
 * Pipes updates to the targets in round-robin fashion
 */
function dsLoadBalance(targets) {
    let i = 0;
    return {
        name: `loadBalance [${targets.map((v) => v.name).join()}]`,
        operationType: _operator_model_js__WEBPACK_IMPORTED_MODULE_3__.OperationType.NOOP,
        operation: (v) => {
            const target = targets[i++];
            if (i >= targets.length) {
                i = 0;
            }
            if (target instanceof _data_source_js__WEBPACK_IMPORTED_MODULE_2__.DataSource || target instanceof _stream_js__WEBPACK_IMPORTED_MODULE_4__.Stream) {
                target.update(v);
            }
            else {
                target.updateDownstream(v);
            }
            return v;
        }
    };
}
/**
 * Logs updates to the console
 */
function dsLog(prefix = '', suffix = '') {
    return {
        name: `log`,
        operationType: _operator_model_js__WEBPACK_IMPORTED_MODULE_3__.OperationType.NOOP,
        operation: (v) => {
            console.log(`${prefix}${v}${suffix}`);
            return v;
        }
    };
}
function dsPipeAll(...sources) {
    return {
        name: `pipeAll [${sources.map((v) => v.name).join()}]`,
        operationType: _operator_model_js__WEBPACK_IMPORTED_MODULE_3__.OperationType.NOOP,
        operation: (v) => {
            sources.forEach((source) => {
                if (source instanceof _data_source_js__WEBPACK_IMPORTED_MODULE_2__.DataSource || source instanceof _stream_js__WEBPACK_IMPORTED_MODULE_4__.Stream) {
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
function dsAccumulate(initialValue) {
    let sum = initialValue;
    return {
        name: `accumulate`,
        operationType: _operator_model_js__WEBPACK_IMPORTED_MODULE_3__.OperationType.MAP,
        operation: (v) => {
            sum += v;
            return sum;
        }
    };
}
//# sourceMappingURL=data_source_operators.js.map

/***/ }),

/***/ "./node_modules/aurumjs/prebuilt/esnext/stream/duplex_data_source.js":
/*!***************************************************************************!*\
  !*** ./node_modules/aurumjs/prebuilt/esnext/stream/duplex_data_source.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DuplexDataSource": () => (/* binding */ DuplexDataSource),
/* harmony export */   "processTransformDuplex": () => (/* binding */ processTransformDuplex)
/* harmony export */ });
/* harmony import */ var _aurum_server_aurum_server_client_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../aurum_server/aurum_server_client.js */ "./node_modules/aurumjs/prebuilt/esnext/aurum_server/aurum_server_client.js");
/* harmony import */ var _utilities_cancellation_token_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utilities/cancellation_token.js */ "./node_modules/aurumjs/prebuilt/esnext/utilities/cancellation_token.js");
/* harmony import */ var _utilities_event_emitter_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utilities/event_emitter.js */ "./node_modules/aurumjs/prebuilt/esnext/utilities/event_emitter.js");
/* harmony import */ var _utilities_iteration_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utilities/iteration.js */ "./node_modules/aurumjs/prebuilt/esnext/utilities/iteration.js");
/* harmony import */ var _data_source_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./data_source.js */ "./node_modules/aurumjs/prebuilt/esnext/stream/data_source.js");
/* harmony import */ var _duplex_data_source_operators_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./duplex_data_source_operators.js */ "./node_modules/aurumjs/prebuilt/esnext/stream/duplex_data_source_operators.js");
/* harmony import */ var _operator_model_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./operator_model.js */ "./node_modules/aurumjs/prebuilt/esnext/stream/operator_model.js");







/**
 * Same as DataSource except data can flow in both directions
 */
class DuplexDataSource {
    /**
     * The current value of this data source, can be changed through update
     */
    value;
    primed;
    errorHandler;
    errorEvent;
    updatingUpstream;
    updatingDownstream;
    updateDownstreamEvent;
    updateUpstreamEvent;
    propagateWritesToReadStream;
    name;
    /**
     * The top can be viewed as the source of truth and bottom as the derived value. UpdateDownStream means the change is propagated from top to bottom or that the source of truth changed.
     * UpdateUpstream means the change is propagated from bottom to top or that the derived value changed.
     * @param initialValue
     * @param rootNode If a write is done propagate this update back down to all the consumers. Useful at the root node because in case of a tree structure changes from one branch won't propagate to the other without this
     */
    constructor(initialValue, rootNode = true, name = 'RootDuplexDataSource') {
        this.name = name;
        this.value = initialValue;
        this.primed = initialValue !== undefined;
        this.updateDownstreamEvent = new _utilities_event_emitter_js__WEBPACK_IMPORTED_MODULE_2__.EventEmitter();
        this.updateUpstreamEvent = new _utilities_event_emitter_js__WEBPACK_IMPORTED_MODULE_2__.EventEmitter();
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
        (0,_aurum_server_aurum_server_client_js__WEBPACK_IMPORTED_MODULE_0__.syncDuplexDataSource)(result, aurumServerInfo, cancellation);
        return result;
    }
    static fromAsyncIterator(iterator, cancellation) {
        const result = new DuplexDataSource();
        (async () => {
            for await (const item of iterator) {
                if (cancellation?.isCanceled) {
                    return;
                }
                result.updateDownstream(item);
            }
        })();
        return result;
    }
    static fromPromise(promise, cancellation) {
        const result = new DuplexDataSource();
        promise.then((v) => {
            if (cancellation?.isCanceled) {
                return;
            }
            result.updateDownstream(v);
        }, (e) => {
            if (cancellation?.isCanceled) {
                return;
            }
            result.emitError(e, _duplex_data_source_operators_js__WEBPACK_IMPORTED_MODULE_5__.DataFlow.DOWNSTREAM);
        });
        return result;
    }
    static fromPromiseArray(promises, cancellation) {
        const result = new DuplexDataSource();
        (async () => {
            for await (const promise of (0,_utilities_iteration_js__WEBPACK_IMPORTED_MODULE_3__.promiseIterator)(promises, cancellation)) {
                if (cancellation?.isCanceled) {
                    return;
                }
                if (promise.status === 'fulfilled') {
                    result.updateDownstream(promise.value);
                }
                else {
                    result.emitError(promise.reason, _duplex_data_source_operators_js__WEBPACK_IMPORTED_MODULE_5__.DataFlow.DOWNSTREAM);
                }
            }
        })();
        return result;
    }
    toAsyncIterator(cancellation) {
        return this.updateDownstreamEvent.toAsyncIterator(cancellation);
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
    static createOneWay(direction = _duplex_data_source_operators_js__WEBPACK_IMPORTED_MODULE_5__.DataFlow.DOWNSTREAM, initialValue) {
        return new DuplexDataSource(initialValue, false).transformDuplex((0,_duplex_data_source_operators_js__WEBPACK_IMPORTED_MODULE_5__.ddsOneWayFlow)(direction));
    }
    /**
     * Updates the value in the data source and calls the listen callback for all listeners
     * Moves the data from the top to the bottom. Used to reflect changes in the source data to the derived data
     * @param newValue new value for the data source
     */
    updateDownstream(newValue) {
        //@ts-expect-error Typescript tries to be smart and thinks this could never happen but it can with the any type as T
        if (newValue === this) {
            throw new Error('Cannot update data source with itself');
        }
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
     * Updates the value in the data source and calls the listen callback for all listeners.
     * Moves the data from the bottom to the top. Used to reflect changes in derived data back to the source
     * @param newValue new value for the data source
     */
    updateUpstream(newValue) {
        //@ts-expect-error Typescript tries to be smart and thinks this could never happen but it can with the any type as T
        if (newValue === this) {
            throw new Error('Cannot update data source with itself');
        }
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
        const downStreamDatasource = new _data_source_js__WEBPACK_IMPORTED_MODULE_4__.DataSource(this.value);
        this.listenDownstream((newVal) => {
            downStreamDatasource.update(newVal);
        }, cancellationToken);
        return downStreamDatasource;
    }
    aggregate(otherSources, combinator, cancellationToken) {
        cancellationToken = cancellationToken ?? new _utilities_cancellation_token_js__WEBPACK_IMPORTED_MODULE_1__.CancellationToken();
        const aggregatedSource = new _data_source_js__WEBPACK_IMPORTED_MODULE_4__.DataSource(combinator(this.value, ...otherSources.map((s) => s?.value)));
        for (let i = 0; i < otherSources.length; i++) {
            otherSources[i]?.listen(() => {
                aggregatedSource.update(combinator(this.value, ...otherSources.map((s) => s?.value)));
            }, cancellationToken);
        }
        this.listen(() => aggregatedSource.update(combinator(this.value, ...otherSources.map((s) => s?.value))), cancellationToken);
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
        ].filter((e) => e && (e instanceof _utilities_cancellation_token_js__WEBPACK_IMPORTED_MODULE_1__.CancellationToken ? ((token = e), false) : true));
        if (cancellationToken) {
            token = cancellationToken;
        }
        const result = new DuplexDataSource(undefined, false, this.name + ' ' + operations.map((v) => v.name).join(' '));
        (this.primed ? this.listenAndRepeat : this.listen).call(this, processTransformDuplex(operations, result, _duplex_data_source_operators_js__WEBPACK_IMPORTED_MODULE_5__.DataFlow.DOWNSTREAM), token);
        result.listenUpstream.call(result, processTransformDuplex(operations, this, _duplex_data_source_operators_js__WEBPACK_IMPORTED_MODULE_5__.DataFlow.UPSTREAM), token);
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
        ].filter((e) => e && (e instanceof _utilities_cancellation_token_js__WEBPACK_IMPORTED_MODULE_1__.CancellationToken ? ((token = e), false) : true));
        if (cancellationToken) {
            token = cancellationToken;
        }
        const result = new _data_source_js__WEBPACK_IMPORTED_MODULE_4__.DataSource(undefined, this.name + ' ' + operations.map((v) => v.name).join(' '));
        (this.primed ? this.listenAndRepeat : this.listen).call(this, (0,_data_source_js__WEBPACK_IMPORTED_MODULE_4__.processTransform)(operations, result), token);
        return result;
    }
    /**
     * Like aggregate except that no combination method is needed as a result both parents must have the same type and the new stream just exposes the last update recieved from either parent
     * @param otherSource Second parent for the new source
     * @param cancellationToken  Cancellation token to cancel the subscriptions the new datasource has to the two parent datasources
     */
    combine(otherSources, cancellationToken) {
        cancellationToken = cancellationToken ?? new _utilities_cancellation_token_js__WEBPACK_IMPORTED_MODULE_1__.CancellationToken();
        let combinedDataSource;
        if (this.primed) {
            combinedDataSource = new _data_source_js__WEBPACK_IMPORTED_MODULE_4__.DataSource(this.value);
        }
        else {
            combinedDataSource = new _data_source_js__WEBPACK_IMPORTED_MODULE_4__.DataSource();
        }
        this.pipe(combinedDataSource, cancellationToken);
        for (const otherSource of otherSources) {
            otherSource.pipe(combinedDataSource, cancellationToken);
        }
        return combinedDataSource;
    }
    /**
     * Forwards all updates from this source to another
     * @param targetDataSource datasource to pipe the updates to
     * @param cancellationToken  Cancellation token to cancel the subscriptions added to the datasources by this operation
     */
    pipe(targetDataSource, cancellationToken) {
        this.listenDownstream((newVal) => targetDataSource.update(newVal), cancellationToken);
        targetDataSource.listen((newVal) => this.updateUpstream(newVal), cancellationToken);
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
                if (direction === _duplex_data_source_operators_js__WEBPACK_IMPORTED_MODULE_5__.DataFlow.DOWNSTREAM) {
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
function processTransformDuplex(operations, result, direction) {
    return async (v) => {
        try {
            for (const operation of operations) {
                switch (operation.operationType) {
                    case _operator_model_js__WEBPACK_IMPORTED_MODULE_6__.OperationType.NOOP:
                    case _operator_model_js__WEBPACK_IMPORTED_MODULE_6__.OperationType.MAP:
                        v =
                            direction === _duplex_data_source_operators_js__WEBPACK_IMPORTED_MODULE_5__.DataFlow.DOWNSTREAM
                                ? operation.operationDown(v)
                                : operation.operationUp(v);
                        break;
                    case _operator_model_js__WEBPACK_IMPORTED_MODULE_6__.OperationType.MAP_DELAY_FILTER:
                        const tmp = direction === _duplex_data_source_operators_js__WEBPACK_IMPORTED_MODULE_5__.DataFlow.DOWNSTREAM
                            ? await operation.operationDown(v)
                            : await operation.operationUp(v);
                        if (tmp.cancelled) {
                            return;
                        }
                        else {
                            v = await tmp.item;
                        }
                        break;
                    case _operator_model_js__WEBPACK_IMPORTED_MODULE_6__.OperationType.DELAY:
                    case _operator_model_js__WEBPACK_IMPORTED_MODULE_6__.OperationType.MAP_DELAY:
                        v =
                            direction === _duplex_data_source_operators_js__WEBPACK_IMPORTED_MODULE_5__.DataFlow.DOWNSTREAM
                                ? await operation.operationDown(v)
                                : await operation.operationUp(v);
                        break;
                    case _operator_model_js__WEBPACK_IMPORTED_MODULE_6__.OperationType.DELAY_FILTER:
                        if (!(direction === _duplex_data_source_operators_js__WEBPACK_IMPORTED_MODULE_5__.DataFlow.DOWNSTREAM
                            ? await operation.operationDown(v)
                            : await operation.operationUp(v))) {
                            return;
                        }
                        break;
                    case _operator_model_js__WEBPACK_IMPORTED_MODULE_6__.OperationType.FILTER:
                        if (!(direction === _duplex_data_source_operators_js__WEBPACK_IMPORTED_MODULE_5__.DataFlow.DOWNSTREAM
                            ? operation.operationDown(v)
                            : operation.operationUp(v))) {
                            return;
                        }
                        break;
                }
            }
            if (direction === _duplex_data_source_operators_js__WEBPACK_IMPORTED_MODULE_5__.DataFlow.DOWNSTREAM) {
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
//# sourceMappingURL=duplex_data_source.js.map

/***/ }),

/***/ "./node_modules/aurumjs/prebuilt/esnext/stream/duplex_data_source_operators.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/aurumjs/prebuilt/esnext/stream/duplex_data_source_operators.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DataFlow": () => (/* binding */ DataFlow),
/* harmony export */   "DataFlowBoth": () => (/* binding */ DataFlowBoth),
/* harmony export */   "ddsDebounce": () => (/* binding */ ddsDebounce),
/* harmony export */   "ddsFilter": () => (/* binding */ ddsFilter),
/* harmony export */   "ddsMap": () => (/* binding */ ddsMap),
/* harmony export */   "ddsOneWayFlow": () => (/* binding */ ddsOneWayFlow),
/* harmony export */   "ddsUnique": () => (/* binding */ ddsUnique)
/* harmony export */ });
/* harmony import */ var _data_source_operators_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data_source_operators.js */ "./node_modules/aurumjs/prebuilt/esnext/stream/data_source_operators.js");
/* harmony import */ var _operator_model_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./operator_model.js */ "./node_modules/aurumjs/prebuilt/esnext/stream/operator_model.js");


var DataFlow;
(function (DataFlow) {
    DataFlow[DataFlow["UPSTREAM"] = 0] = "UPSTREAM";
    DataFlow[DataFlow["DOWNSTREAM"] = 1] = "DOWNSTREAM";
})(DataFlow || (DataFlow = {}));
var DataFlowBoth;
(function (DataFlowBoth) {
    DataFlowBoth[DataFlowBoth["UPSTREAM"] = 0] = "UPSTREAM";
    DataFlowBoth[DataFlowBoth["DOWNSTREAM"] = 1] = "DOWNSTREAM";
    DataFlowBoth[DataFlowBoth["BOTH"] = 2] = "BOTH";
})(DataFlowBoth || (DataFlowBoth = {}));
function ddsMap(mapDown, mapUp) {
    return {
        name: 'map',
        operationType: _operator_model_js__WEBPACK_IMPORTED_MODULE_1__.OperationType.MAP,
        operationDown: (v) => mapDown(v),
        operationUp: (v) => mapUp(v)
    };
}
/**
 * Starts a timer when an update occurs, delays the update until the timer passed if a new update arrives the initial
 * update is cancelled and the process starts again
 */
function ddsDebounce(time, direction) {
    const debounceDown = (0,_data_source_operators_js__WEBPACK_IMPORTED_MODULE_0__.dsDebounce)(time);
    const debounceUp = (0,_data_source_operators_js__WEBPACK_IMPORTED_MODULE_0__.dsDebounce)(time);
    return {
        operationType: _operator_model_js__WEBPACK_IMPORTED_MODULE_1__.OperationType.DELAY_FILTER,
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
function ddsOneWayFlow(direction) {
    if (direction === DataFlow.DOWNSTREAM) {
        return ddsFilter(() => true, () => false);
    }
    else {
        return ddsFilter(() => false, () => true);
    }
}
function ddsFilter(predicateDown, predicateUp) {
    return {
        name: 'filter',
        operationType: _operator_model_js__WEBPACK_IMPORTED_MODULE_1__.OperationType.FILTER,
        operationDown: (v) => predicateDown(v),
        operationUp: (v) => predicateUp(v)
    };
}
function ddsUnique(direction, isEqual) {
    let lastDown;
    let lastUp;
    let primedUp = false;
    let primedDown = false;
    return {
        name: 'filter',
        operationType: _operator_model_js__WEBPACK_IMPORTED_MODULE_1__.OperationType.FILTER,
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
//# sourceMappingURL=duplex_data_source_operators.js.map

/***/ }),

/***/ "./node_modules/aurumjs/prebuilt/esnext/stream/emitters.js":
/*!*****************************************************************!*\
  !*** ./node_modules/aurumjs/prebuilt/esnext/stream/emitters.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "animate": () => (/* binding */ animate),
/* harmony export */   "intervalEmitter": () => (/* binding */ intervalEmitter),
/* harmony export */   "tweenEmitter": () => (/* binding */ tweenEmitter),
/* harmony export */   "urlHashEmitter": () => (/* binding */ urlHashEmitter),
/* harmony export */   "windowSizeEmitter": () => (/* binding */ windowSizeEmitter)
/* harmony export */ });
/* harmony import */ var _data_source_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data_source.js */ "./node_modules/aurumjs/prebuilt/esnext/stream/data_source.js");
/* harmony import */ var _stream_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stream.js */ "./node_modules/aurumjs/prebuilt/esnext/stream/stream.js");
/* harmony import */ var _duplex_data_source_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./duplex_data_source.js */ "./node_modules/aurumjs/prebuilt/esnext/stream/duplex_data_source.js");
/* harmony import */ var _utilities_cancellation_token_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utilities/cancellation_token.js */ "./node_modules/aurumjs/prebuilt/esnext/utilities/cancellation_token.js");
/* harmony import */ var _data_source_operators_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./data_source_operators.js */ "./node_modules/aurumjs/prebuilt/esnext/stream/data_source_operators.js");





/**
 * Convenience function to update a stream at fixed intervals
 */
function intervalEmitter(target, interval, value, cancellationToken) {
    (cancellationToken ?? new _utilities_cancellation_token_js__WEBPACK_IMPORTED_MODULE_3__.CancellationToken()).setInterval(() => {
        updateSource(target, value);
    }, interval);
}
function updateSource(target, value) {
    if (target instanceof _data_source_js__WEBPACK_IMPORTED_MODULE_0__.ArrayDataSource) {
        target.push(value);
    }
    else if (target instanceof _duplex_data_source_js__WEBPACK_IMPORTED_MODULE_2__.DuplexDataSource) {
        target.updateDownstream(value);
    }
    else {
        target.update(value);
    }
}
function urlHashEmitter(target, stripInHashParameters = false, cancellationToken) {
    updateSource(target, stripInHashParameters ? getUrlHash() : location.hash);
    (cancellationToken ?? new _utilities_cancellation_token_js__WEBPACK_IMPORTED_MODULE_3__.CancellationToken()).registerDomEvent(window, 'hashchange', () => {
        updateSource(target, stripInHashParameters ? getUrlHash() : location.hash);
    });
}
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
    cancellationToken ??= new _utilities_cancellation_token_js__WEBPACK_IMPORTED_MODULE_3__.CancellationToken();
    const updateStream = new _data_source_js__WEBPACK_IMPORTED_MODULE_0__.DataSource();
    cancellationToken.registerDomEvent(window, 'resize', () => {
        updateStream.update();
    });
    target.assign({
        width: window.innerWidth,
        height: window.innerHeight
    });
    updateStream.transform((0,_data_source_operators_js__WEBPACK_IMPORTED_MODULE_4__.dsDebounce)(debounce), (0,_data_source_operators_js__WEBPACK_IMPORTED_MODULE_4__.dsTap)(() => target.assign({
        width: window.innerWidth,
        height: window.innerHeight
    })));
}
/**
 * Calls the callback every animation frame with a number from 0 to 1 indicating how far along in the animation timeline it is.
 *
 */
function animate(cb, time, cancellationToken) {
    return new Promise((resolve) => {
        const animationToken = new _utilities_cancellation_token_js__WEBPACK_IMPORTED_MODULE_3__.CancellationToken();
        if (cancellationToken) {
            cancellationToken.chain(animationToken);
        }
        animationToken.addCancelable(resolve);
        let start = Date.now();
        (0,_utilities_cancellation_token_js__WEBPACK_IMPORTED_MODULE_3__.registerAnimationLoop)(() => {
            const progress = Math.min(1, (Date.now() - start) / time);
            cb(progress);
            if (progress === 1) {
                animationToken.cancel();
            }
        }, animationToken);
    });
}
/**
 * Convenience function to stream animate to a datasource
 */
function tweenEmitter(target, duration, startValue, endValue, interpolation, cancellationToken) {
    if (target instanceof _data_source_js__WEBPACK_IMPORTED_MODULE_0__.DataSource || target instanceof _duplex_data_source_js__WEBPACK_IMPORTED_MODULE_2__.DuplexDataSource || target instanceof _stream_js__WEBPACK_IMPORTED_MODULE_1__.Stream) {
        if (startValue === endValue) {
            return new Promise((res) => setTimeout(res, duration));
        }
    }
    return animate((progress) => {
        if (interpolation) {
            progress = interpolation(progress);
        }
        const value = startValue + (endValue - startValue) * progress;
        if (target instanceof _data_source_js__WEBPACK_IMPORTED_MODULE_0__.ArrayDataSource) {
            target.push(value);
        }
        else if (target instanceof _duplex_data_source_js__WEBPACK_IMPORTED_MODULE_2__.DuplexDataSource) {
            target.updateDownstream(value);
        }
        else {
            target.update(value);
        }
    }, duration, cancellationToken);
}
//# sourceMappingURL=emitters.js.map

/***/ }),

/***/ "./node_modules/aurumjs/prebuilt/esnext/stream/object_data_source.js":
/*!***************************************************************************!*\
  !*** ./node_modules/aurumjs/prebuilt/esnext/stream/object_data_source.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ObjectDataSource": () => (/* binding */ ObjectDataSource)
/* harmony export */ });
/* harmony import */ var _aurum_server_aurum_server_client_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../aurum_server/aurum_server_client.js */ "./node_modules/aurumjs/prebuilt/esnext/aurum_server/aurum_server_client.js");
/* harmony import */ var _utilities_event_emitter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utilities/event_emitter.js */ "./node_modules/aurumjs/prebuilt/esnext/utilities/event_emitter.js");
/* harmony import */ var _data_source_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./data_source.js */ "./node_modules/aurumjs/prebuilt/esnext/stream/data_source.js");
/* harmony import */ var _duplex_data_source_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./duplex_data_source.js */ "./node_modules/aurumjs/prebuilt/esnext/stream/duplex_data_source.js");




class ObjectDataSource {
    data;
    updateEvent;
    updateEventOnKey;
    constructor(initialData) {
        this.data = initialData;
        this.updateEvent = new _utilities_event_emitter_js__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
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
        (0,_aurum_server_aurum_server_client_js__WEBPACK_IMPORTED_MODULE_0__.syncObjectDataSource)(result, aurumServerInfo, cancellation);
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
        if (Array.isArray(this.data[key])) {
            const subDataSource = new _data_source_js__WEBPACK_IMPORTED_MODULE_2__.ArrayDataSource(this.data?.[key]);
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
        const subDataSource = new _data_source_js__WEBPACK_IMPORTED_MODULE_2__.DataSource(this.data?.[key]);
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
        const subDataSource = new _duplex_data_source_js__WEBPACK_IMPORTED_MODULE_3__.DuplexDataSource(this.data?.[key]);
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
        const result = new _data_source_js__WEBPACK_IMPORTED_MODULE_2__.ArrayDataSource();
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
            this.updateEventOnKey.set(key, new _utilities_event_emitter_js__WEBPACK_IMPORTED_MODULE_1__.EventEmitter());
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
        const keys = new Set(Object.keys(this.data ?? {}));
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
        const stream = new _data_source_js__WEBPACK_IMPORTED_MODULE_2__.DataSource(this.data);
        this.listen((s) => {
            stream.update(this.data);
        });
        return stream;
    }
}
//# sourceMappingURL=object_data_source.js.map

/***/ }),

/***/ "./node_modules/aurumjs/prebuilt/esnext/stream/operator_model.js":
/*!***********************************************************************!*\
  !*** ./node_modules/aurumjs/prebuilt/esnext/stream/operator_model.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OperationType": () => (/* binding */ OperationType)
/* harmony export */ });
var OperationType;
(function (OperationType) {
    OperationType[OperationType["FILTER"] = 0] = "FILTER";
    OperationType[OperationType["NOOP"] = 1] = "NOOP";
    OperationType[OperationType["MAP"] = 2] = "MAP";
    OperationType[OperationType["DELAY"] = 3] = "DELAY";
    OperationType[OperationType["MAP_DELAY"] = 4] = "MAP_DELAY";
    OperationType[OperationType["DELAY_FILTER"] = 5] = "DELAY_FILTER";
    OperationType[OperationType["MAP_DELAY_FILTER"] = 6] = "MAP_DELAY_FILTER";
})(OperationType || (OperationType = {}));
//# sourceMappingURL=operator_model.js.map

/***/ }),

/***/ "./node_modules/aurumjs/prebuilt/esnext/stream/stream.js":
/*!***************************************************************!*\
  !*** ./node_modules/aurumjs/prebuilt/esnext/stream/stream.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Stream": () => (/* binding */ Stream)
/* harmony export */ });
/* harmony import */ var _utilities_cancellation_token_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities/cancellation_token.js */ "./node_modules/aurumjs/prebuilt/esnext/utilities/cancellation_token.js");
/* harmony import */ var _data_source_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data_source.js */ "./node_modules/aurumjs/prebuilt/esnext/stream/data_source.js");


/**
 * Lets you logically combine 2 data sources so that update calls go through the input source and listen goes to the output source
 */
class Stream {
    input;
    output;
    get name() {
        return `IN:${this.input.name} OUT:${this.output.name}`;
    }
    /**
     * The current value of this data source, can be changed through update
     */
    get value() {
        return this.output.value;
    }
    constructor() { }
    static fromFunction(func) {
        const result = new Stream();
        result.input = new _data_source_js__WEBPACK_IMPORTED_MODULE_1__.DataSource();
        result.output = new _data_source_js__WEBPACK_IMPORTED_MODULE_1__.DataSource();
        result.input.listen((value) => {
            result.output.update(func(value));
        });
        return result;
    }
    static fromFetchRaw(url) {
        const input = new _data_source_js__WEBPACK_IMPORTED_MODULE_1__.DataSource();
        const output = new _data_source_js__WEBPACK_IMPORTED_MODULE_1__.DataSource();
        input.listen((value) => {
            output.update(fetch(url, value));
        });
        return Stream.fromPreconnectedSources(input, output);
    }
    static fromPreconnectedSources(inputSource, outputSource) {
        const result = new Stream();
        result.input = inputSource ?? new _data_source_js__WEBPACK_IMPORTED_MODULE_1__.DataSource();
        result.output = outputSource ?? result.input;
        return result;
    }
    aggregate(otherSources, combinator, cancellationToken) {
        cancellationToken = cancellationToken ?? new _utilities_cancellation_token_js__WEBPACK_IMPORTED_MODULE_0__.CancellationToken();
        const aggregatedSource = new _data_source_js__WEBPACK_IMPORTED_MODULE_1__.DataSource(combinator(this.value, ...otherSources.map((s) => s.value)));
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
        result.input = new _data_source_js__WEBPACK_IMPORTED_MODULE_1__.DataSource();
        result.output = result.input.transform(operationA, operationB, operationC, operationD, operationE, operationF, operationG, operationH, operationI, operationJ);
        return result;
    }
    static fromFetchPostJson(url, baseRequestData) {
        const input = new _data_source_js__WEBPACK_IMPORTED_MODULE_1__.DataSource();
        const output = new _data_source_js__WEBPACK_IMPORTED_MODULE_1__.DataSource();
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
        const input = new _data_source_js__WEBPACK_IMPORTED_MODULE_1__.DataSource();
        const output = new _data_source_js__WEBPACK_IMPORTED_MODULE_1__.DataSource();
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
        ].filter((e) => e && (e instanceof _utilities_cancellation_token_js__WEBPACK_IMPORTED_MODULE_0__.CancellationToken ? ((token = e), false) : true));
        if (cancellationToken) {
            token = cancellationToken;
        }
        const result = new _data_source_js__WEBPACK_IMPORTED_MODULE_1__.DataSource(undefined, this.output.name + ' ' + operations.map((v) => v.name).join(' '));
        this.listen((0,_data_source_js__WEBPACK_IMPORTED_MODULE_1__.processTransform)(operations, result), token);
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
//# sourceMappingURL=stream.js.map

/***/ }),

/***/ "./node_modules/aurumjs/prebuilt/esnext/stream/tree_data_source.js":
/*!*************************************************************************!*\
  !*** ./node_modules/aurumjs/prebuilt/esnext/stream/tree_data_source.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TreeDataSource": () => (/* binding */ TreeDataSource)
/* harmony export */ });
/* harmony import */ var _utilities_cancellation_token_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities/cancellation_token.js */ "./node_modules/aurumjs/prebuilt/esnext/utilities/cancellation_token.js");
/* harmony import */ var _utilities_event_emitter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utilities/event_emitter.js */ "./node_modules/aurumjs/prebuilt/esnext/utilities/event_emitter.js");
/* harmony import */ var _utilities_sources_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utilities/sources.js */ "./node_modules/aurumjs/prebuilt/esnext/utilities/sources.js");
/* harmony import */ var _data_source_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./data_source.js */ "./node_modules/aurumjs/prebuilt/esnext/stream/data_source.js");




class TreeDataSource {
    childrenKey;
    roots;
    updateEvent;
    watchCount = 0;
    watchToken;
    constructor(childrenKey, roots) {
        this.childrenKey = childrenKey;
        this.roots = _data_source_js__WEBPACK_IMPORTED_MODULE_3__.ArrayDataSource.toArrayDataSource(roots);
        this.updateEvent = new _utilities_event_emitter_js__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
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
            this.watchToken = new _utilities_cancellation_token_js__WEBPACK_IMPORTED_MODULE_0__.CancellationToken();
            const watchMap = new Map();
            if (this.roots instanceof _data_source_js__WEBPACK_IMPORTED_MODULE_3__.ArrayDataSource) {
                this.roots.listen((change) => {
                    this.watchHandleChange(change, undefined, watchMap);
                }, this.watchToken);
            }
            for (const root of this.roots) {
                for (const { node } of this.iterateLevelWithMetaData(root, this.roots.length.value)) {
                    if (node[this.childrenKey] instanceof _data_source_js__WEBPACK_IMPORTED_MODULE_3__.ArrayDataSource) {
                        watchMap.set(node, new _utilities_cancellation_token_js__WEBPACK_IMPORTED_MODULE_0__.CancellationToken());
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
                    if (item[this.childrenKey] instanceof _data_source_js__WEBPACK_IMPORTED_MODULE_3__.ArrayDataSource) {
                        watchMap.set(item, new _utilities_cancellation_token_js__WEBPACK_IMPORTED_MODULE_0__.CancellationToken());
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
                    watchMap.get(item)?.cancel();
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
    adaptNodeList(nodes, token, nodeList = new _data_source_js__WEBPACK_IMPORTED_MODULE_3__.ArrayDataSource()) {
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
        nodes = _data_source_js__WEBPACK_IMPORTED_MODULE_3__.ArrayDataSource.toArrayDataSource(nodes);
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
        adaptMap.set(item, new _utilities_cancellation_token_js__WEBPACK_IMPORTED_MODULE_0__.CancellationToken());
        parentToken.chain(adaptMap.get(item));
        const list = _data_source_js__WEBPACK_IMPORTED_MODULE_3__.ArrayDataSource.toArrayDataSource(item[this.childrenKey]);
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
            yield* this.iterateLevelWithMetaData(child, (0,_utilities_sources_js__WEBPACK_IMPORTED_MODULE_2__.getValueOf)(node[this.childrenKey].length), node, i++, level + 1);
        }
    }
    *iterateLevel(level) {
        yield level;
        for (const child of level[this.childrenKey]) {
            yield* this.iterateLevel(child);
        }
    }
}
//# sourceMappingURL=tree_data_source.js.map

/***/ }),

/***/ "./node_modules/aurumjs/prebuilt/esnext/utilities/aurum.js":
/*!*****************************************************************!*\
  !*** ./node_modules/aurumjs/prebuilt/esnext/utilities/aurum.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Aurum": () => (/* binding */ Aurum)
/* harmony export */ });
/* harmony import */ var _nodes_input_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../nodes/input.js */ "./node_modules/aurumjs/prebuilt/esnext/nodes/input.js");
/* harmony import */ var _nodes_select_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../nodes/select.js */ "./node_modules/aurumjs/prebuilt/esnext/nodes/select.js");
/* harmony import */ var _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../nodes/simple_dom_nodes.js */ "./node_modules/aurumjs/prebuilt/esnext/nodes/simple_dom_nodes.js");
/* harmony import */ var _nodes_textarea_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../nodes/textarea.js */ "./node_modules/aurumjs/prebuilt/esnext/nodes/textarea.js");
/* harmony import */ var _rendering_aurum_element_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../rendering/aurum_element.js */ "./node_modules/aurumjs/prebuilt/esnext/rendering/aurum_element.js");
/* harmony import */ var _stream_data_source_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../stream/data_source.js */ "./node_modules/aurumjs/prebuilt/esnext/stream/data_source.js");






const nodeMap = {
    address: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.Address,
    kbd: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.Kbd,
    samp: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.Samp,
    object: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.Object,
    optgroup: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.OptGroup,
    picture: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.Picture,
    output: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.Output,
    param: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.Param,
    strong: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.Strong,
    track: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.Track,
    var: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.Var,
    wbr: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.Wbr,
    button: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.Button,
    code: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.Code,
    hr: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.Hr,
    div: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.Div,
    input: _nodes_input_js__WEBPACK_IMPORTED_MODULE_0__.Input,
    li: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.Li,
    span: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.Span,
    style: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.Style,
    ul: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.Ul,
    p: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.P,
    img: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.Img,
    link: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.Link,
    canvas: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.Canvas,
    a: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.A,
    article: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.Article,
    br: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.Br,
    form: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.Form,
    label: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.Label,
    ol: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.Ol,
    pre: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.Pre,
    progress: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.Progress,
    table: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.Table,
    td: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.Td,
    tr: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.Tr,
    th: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.Th,
    textarea: _nodes_textarea_js__WEBPACK_IMPORTED_MODULE_3__.TextArea,
    h1: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.H1,
    h2: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.H2,
    h3: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.H3,
    h4: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.H4,
    h5: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.H5,
    h6: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.H6,
    html: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.Html,
    head: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.Head,
    header: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.Header,
    footer: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.Footer,
    nav: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.Nav,
    b: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.B,
    i: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.I,
    script: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.Script,
    abbr: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.Abbr,
    area: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.Area,
    aside: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.Aside,
    audio: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.Audio,
    em: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.Em,
    heading: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.Heading,
    iframe: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.IFrame,
    noscript: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.NoScript,
    option: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.Option,
    q: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.Q,
    select: _nodes_select_js__WEBPACK_IMPORTED_MODULE_1__.Select,
    source: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.Source,
    title: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.Title,
    video: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.Video,
    tbody: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.TBody,
    tfoot: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.TFoot,
    meta: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.Meta,
    body: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.Body,
    thead: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.THead,
    summary: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.Summary,
    details: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.Details,
    sub: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.Sub,
    sup: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.Sup,
    svg: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.Svg,
    data: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.Data,
    time: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.Time,
    template: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.Template,
    slot: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.Slot,
    col: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.Col,
    colgroup: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.Colgroup,
    caption: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.Caption,
    line: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.Line,
    rect: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.Rect,
    defs: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.Defs,
    g: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.G,
    text: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.Text,
    tspan: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.Tspan,
    circle: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.Circle,
    ellipse: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.Ellipse,
    polygon: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.Polygon,
    polyline: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.Polyline,
    path: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.Path,
    image: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.Image,
    symbol: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.Symbol,
    use: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.Use,
    stop: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.Stop,
    lineargradient: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.LinearGradient,
    radialgradient: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.RadialGradient,
    clippath: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.ClipPath,
    pattern: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.Pattern,
    mask: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.Mask,
    foreignobject: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.ForeignObject,
    marker: _nodes_simple_dom_nodes_js__WEBPACK_IMPORTED_MODULE_2__.Marker
};
class Aurum {
    static rehydrate(aurumRenderable, dom) {
        const target = dom.parentElement;
        dom.remove();
        return Aurum.attach(aurumRenderable, target);
    }
    static attach(aurumRenderable, dom) {
        const session = (0,_rendering_aurum_element_js__WEBPACK_IMPORTED_MODULE_4__.createRenderSession)();
        const content = (0,_rendering_aurum_element_js__WEBPACK_IMPORTED_MODULE_4__.renderInternal)(aurumRenderable, session);
        if (content instanceof _rendering_aurum_element_js__WEBPACK_IMPORTED_MODULE_4__.AurumElement) {
            content.attachToDom(dom, dom.childNodes.length);
            session.sessionToken.addCancelable(() => content.dispose());
        }
        else if (Array.isArray(content)) {
            const root = new _rendering_aurum_element_js__WEBPACK_IMPORTED_MODULE_4__.ArrayAurumElement(new _stream_data_source_js__WEBPACK_IMPORTED_MODULE_5__.ArrayDataSource(content), (0,_rendering_aurum_element_js__WEBPACK_IMPORTED_MODULE_4__.createAPI)(session));
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
            [_rendering_aurum_element_js__WEBPACK_IMPORTED_MODULE_4__.aurumElementModelIdentitiy]: true,
            name,
            isIntrinsic: intrinsic,
            factory: node,
            props: args,
            children: innerNodes
        };
    }
}
//# sourceMappingURL=aurum.js.map

/***/ }),

/***/ "./node_modules/aurumjs/prebuilt/esnext/utilities/cancellation_token.js":
/*!******************************************************************************!*\
  !*** ./node_modules/aurumjs/prebuilt/esnext/utilities/cancellation_token.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CancellationToken": () => (/* binding */ CancellationToken),
/* harmony export */   "registerAnimationLoop": () => (/* binding */ registerAnimationLoop)
/* harmony export */ });
class CancellationToken {
    cancelables;
    _isCancelled;
    get isCanceled() {
        return this._isCancelled;
    }
    constructor(...cancellables) {
        this.cancelables = cancellables ?? [];
        this._isCancelled = false;
    }
    static forever = new CancellationToken();
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

/***/ "./node_modules/aurumjs/prebuilt/esnext/utilities/classname.js":
/*!*********************************************************************!*\
  !*** ./node_modules/aurumjs/prebuilt/esnext/utilities/classname.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "aurumClassName": () => (/* binding */ aurumClassName),
/* harmony export */   "camelCaseToKebabCase": () => (/* binding */ camelCaseToKebabCase),
/* harmony export */   "combineAttribute": () => (/* binding */ combineAttribute),
/* harmony export */   "combineClass": () => (/* binding */ combineClass),
/* harmony export */   "combineStyle": () => (/* binding */ combineStyle)
/* harmony export */ });
/* harmony import */ var _stream_data_source_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../stream/data_source.js */ "./node_modules/aurumjs/prebuilt/esnext/stream/data_source.js");
/* harmony import */ var _stream_data_source_operators_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../stream/data_source_operators.js */ "./node_modules/aurumjs/prebuilt/esnext/stream/data_source_operators.js");
/* harmony import */ var _stream_duplex_data_source_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../stream/duplex_data_source.js */ "./node_modules/aurumjs/prebuilt/esnext/stream/duplex_data_source.js");



function aurumClassName(data, cancellationToken) {
    if (data instanceof _stream_data_source_js__WEBPACK_IMPORTED_MODULE_0__.MapDataSource) {
        return handleClassMapDataSource(data, cancellationToken);
    }
    else {
        return handleClassMapLike(data, cancellationToken);
    }
}
function handleClassMapLike(data, cancellationToken) {
    const result = [];
    for (const key in data) {
        if (data[key]) {
            if (data[key] instanceof _stream_data_source_js__WEBPACK_IMPORTED_MODULE_0__.DataSource || data[key] instanceof _stream_duplex_data_source_js__WEBPACK_IMPORTED_MODULE_2__.DuplexDataSource) {
                const source = data[key];
                const mappedSource = new _stream_data_source_js__WEBPACK_IMPORTED_MODULE_0__.DataSource(source.value ? key : '');
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
function handleClassMapDataSource(data, cancellationToken) {
    const stateMap = new Map();
    const result = new _stream_data_source_js__WEBPACK_IMPORTED_MODULE_0__.ArrayDataSource();
    data.listenAndRepeat((change) => {
        if (change.deleted && stateMap.has(change.key)) {
            result.remove(change.key);
            stateMap.delete(change.key);
        }
        else if (stateMap.has(change.key)) {
            const newState = change.newValue;
            if (newState && !stateMap.get(change.key)) {
                result.push(change.key);
            }
            if (!newState && stateMap.get(change.key)) {
                result.remove(change.key);
            }
            stateMap.set(change.key, newState);
        }
        else if (!stateMap.has(change.key) && !change.deleted) {
            const newState = change.newValue;
            if (newState) {
                result.push(change.key);
            }
            stateMap.set(change.key, newState);
        }
    }, cancellationToken);
    return result;
}
function combineClass(cancellationToken, ...args) {
    args = args.filter((e) => !!e);
    if (args.length < 2) {
        return args[0];
    }
    let fixed = '';
    const sources = [];
    const maps = [];
    resolveConstants(args);
    function resolveConstants(args) {
        for (const arg of args) {
            if (typeof arg === 'string') {
                fixed += arg + ' ';
            }
            else if (Array.isArray(arg)) {
                resolveConstants(arg);
            }
            else if (arg instanceof _stream_data_source_js__WEBPACK_IMPORTED_MODULE_0__.DataSource || arg instanceof _stream_duplex_data_source_js__WEBPACK_IMPORTED_MODULE_2__.DuplexDataSource) {
                sources.push(arg);
            }
            else if (arg instanceof _stream_data_source_js__WEBPACK_IMPORTED_MODULE_0__.MapDataSource) {
                maps.push(arg);
            }
            else if (typeof arg === 'object') {
                for (const key in arg) {
                    if (arg[key] instanceof _stream_data_source_js__WEBPACK_IMPORTED_MODULE_0__.DataSource || arg[key] instanceof _stream_duplex_data_source_js__WEBPACK_IMPORTED_MODULE_2__.DuplexDataSource) {
                        sources.push(arg[key].transform((0,_stream_data_source_operators_js__WEBPACK_IMPORTED_MODULE_1__.dsMap)((v) => (v ? key : '')), cancellationToken));
                    }
                    else {
                        fixed += arg[key] ? key + ' ' : '';
                    }
                }
            }
        }
    }
    fixed = fixed.trim();
    if (sources.length || maps.length) {
        const result = new _stream_data_source_js__WEBPACK_IMPORTED_MODULE_0__.DataSource();
        function update() {
            const classes = [fixed];
            for (const source of sources) {
                if (Array.isArray(source.value)) {
                    classes.push(...source.value);
                }
                else {
                    classes.push(source.value);
                }
            }
            for (const map of maps) {
                for (const key of map.keys()) {
                    if (map.get(key)) {
                        classes.push(key);
                    }
                }
            }
            result.update(classes.join(' '));
        }
        update();
        for (const source of sources) {
            source.listen(update, cancellationToken);
        }
        for (const map of maps) {
            map.listen(update, cancellationToken);
        }
        return result;
    }
    else {
        return fixed;
    }
}
function combineAttribute(cancellationToken, ...args) {
    const constants = [];
    const sources = [];
    for (const attr of args) {
        if (typeof attr === 'string' || typeof attr === 'boolean') {
            constants.push(attr);
        }
        if (attr instanceof _stream_data_source_js__WEBPACK_IMPORTED_MODULE_0__.DataSource || attr instanceof _stream_duplex_data_source_js__WEBPACK_IMPORTED_MODULE_2__.DuplexDataSource) {
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
function combineStyle(cancellationToken, ...args) {
    let fixed = '';
    const sources = [];
    const maps = [];
    for (const attr of args) {
        if (typeof attr === 'string') {
            fixed += attr + ';';
        }
        else if (attr instanceof _stream_data_source_js__WEBPACK_IMPORTED_MODULE_0__.DataSource || attr instanceof _stream_duplex_data_source_js__WEBPACK_IMPORTED_MODULE_2__.DuplexDataSource) {
            sources.push(attr);
        }
        else if (attr instanceof _stream_data_source_js__WEBPACK_IMPORTED_MODULE_0__.MapDataSource) {
            maps.push(attr);
        }
        else if (typeof attr === 'object' && !(attr instanceof _stream_data_source_js__WEBPACK_IMPORTED_MODULE_0__.DataSource || attr instanceof _stream_duplex_data_source_js__WEBPACK_IMPORTED_MODULE_2__.DuplexDataSource)) {
            //@ts-ignore
            for (const key in attr) {
                if (attr[key] instanceof _stream_data_source_js__WEBPACK_IMPORTED_MODULE_0__.DataSource) {
                    sources.push(attr[key].transform((v) => `${camelCaseToKebabCase(key)}:${v};`, cancellationToken));
                }
                else {
                    fixed += `${camelCaseToKebabCase(key)}:${attr[key]};`;
                }
            }
        }
    }
    if (sources.length || maps.length) {
        let result = new _stream_data_source_js__WEBPACK_IMPORTED_MODULE_0__.DataSource(computeResult(fixed, sources, maps));
        for (const source of sources) {
            source.listenAndRepeat((change) => {
                result.update(computeResult(fixed, sources, maps));
            }, cancellationToken);
        }
        for (const map of maps) {
            map.listenAndRepeat((change) => {
                result.update(computeResult(fixed, sources, maps));
            }, cancellationToken);
        }
        return result;
    }
    else {
        return fixed;
    }
}
function computeResult(fixed, sources, maps) {
    let result = fixed;
    for (const source of sources) {
        result += source.value;
    }
    for (const map of maps) {
        for (const key of map.keys()) {
            if (map.get(key)) {
                result += `${camelCaseToKebabCase(key)}:${map.get(key)};`;
            }
        }
    }
    return result;
}
function camelCaseToKebabCase(key) {
    return key.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
}
//# sourceMappingURL=classname.js.map

/***/ }),

/***/ "./node_modules/aurumjs/prebuilt/esnext/utilities/event_emitter.js":
/*!*************************************************************************!*\
  !*** ./node_modules/aurumjs/prebuilt/esnext/utilities/event_emitter.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EventEmitter": () => (/* binding */ EventEmitter)
/* harmony export */ });
/**
 * Event emitter is at the core of aurums stream system. It's a basic pub sub style typesafe event system optimized for high update throughput
 */
class EventEmitter {
    isFiring;
    onAfterFire;
    /**
     * Callback that if set is called when all subscriptions are removed
     */
    onEmpty;
    static leakWarningThreshold;
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
    subscribeChannel;
    subscribeOnceChannel;
    constructor() {
        this.subscribeChannel = [];
        this.subscribeOnceChannel = [];
        this.onAfterFire = [];
    }
    toAsyncIterator(cancellationToken) {
        const buffer = new Array();
        let sink;
        cancellationToken?.addCancelable(() => {
            if (sink) {
                sink({
                    done: true,
                    value: undefined
                });
            }
            else {
                buffer.push({
                    done: true,
                    value: undefined
                });
            }
        });
        this.subscribe((value) => {
            if (sink) {
                sink({
                    done: false,
                    value
                });
                sink = undefined;
            }
            else {
                buffer.push({
                    done: false,
                    value
                });
            }
        }, cancellationToken);
        return {
            [Symbol.asyncIterator]() {
                return this;
            },
            async next() {
                if (buffer.length > 0) {
                    return buffer.shift();
                }
                return new Promise((resolve) => {
                    sink = resolve;
                });
            }
        };
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
        if (!this.isFiring) {
            this.subscribeChannel.length = 0;
            this.subscribeOnceChannel.length = 0;
            this.onEmpty?.();
        }
        else {
            this.onAfterFire.push(() => {
                this.subscribeChannel.length = 0;
                this.subscribeOnceChannel.length = 0;
                this.onEmpty?.();
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
        let index = channel.indexOf(subscription);
        if (index >= 0) {
            if (!this.isFiring) {
                channel.splice(index, 1);
                if (!this.hasSubscriptions()) {
                    this.onEmpty?.();
                }
            }
            else {
                this.onAfterFire.push(() => this.cancel(subscription, channel));
            }
        }
    }
}
//# sourceMappingURL=event_emitter.js.map

/***/ }),

/***/ "./node_modules/aurumjs/prebuilt/esnext/utilities/iteration.js":
/*!*********************************************************************!*\
  !*** ./node_modules/aurumjs/prebuilt/esnext/utilities/iteration.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "promiseIterator": () => (/* binding */ promiseIterator),
/* harmony export */   "transformAsyncIterator": () => (/* binding */ transformAsyncIterator)
/* harmony export */ });
/* harmony import */ var _stream_data_source_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../stream/data_source.js */ "./node_modules/aurumjs/prebuilt/esnext/stream/data_source.js");
/* harmony import */ var _stream_operator_model_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../stream/operator_model.js */ "./node_modules/aurumjs/prebuilt/esnext/stream/operator_model.js");
/* harmony import */ var _cancellation_token_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cancellation_token.js */ "./node_modules/aurumjs/prebuilt/esnext/utilities/cancellation_token.js");



const FILTERED = Symbol('filtered');
async function* transformAsyncIterator(asyncIterator, operationA, operationB, operationC, operationD, operationE, operationF, operationG, operationH, operationI, operationJ, operationK, cancellationToken) {
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
    ].filter((e) => e && (e instanceof _cancellation_token_js__WEBPACK_IMPORTED_MODULE_2__.CancellationToken ? ((token = e), false) : true));
    if (cancellationToken) {
        token = cancellationToken;
    }
    const transform = async (v) => {
        try {
            for (const operation of operations) {
                switch (operation.operationType) {
                    case _stream_operator_model_js__WEBPACK_IMPORTED_MODULE_1__.OperationType.NOOP:
                    case _stream_operator_model_js__WEBPACK_IMPORTED_MODULE_1__.OperationType.MAP:
                        v = operation.operation(v);
                        break;
                    case _stream_operator_model_js__WEBPACK_IMPORTED_MODULE_1__.OperationType.MAP_DELAY_FILTER:
                        const tmp = await operation.operation(v);
                        if (tmp.cancelled) {
                            return;
                        }
                        else {
                            v = await tmp.item;
                        }
                        break;
                    case _stream_operator_model_js__WEBPACK_IMPORTED_MODULE_1__.OperationType.DELAY:
                    case _stream_operator_model_js__WEBPACK_IMPORTED_MODULE_1__.OperationType.MAP_DELAY:
                        v = await operation.operation(v);
                        break;
                    case _stream_operator_model_js__WEBPACK_IMPORTED_MODULE_1__.OperationType.DELAY_FILTER:
                        if (!(await operation.operation(v))) {
                            return FILTERED;
                        }
                        break;
                    case _stream_operator_model_js__WEBPACK_IMPORTED_MODULE_1__.OperationType.FILTER:
                        if (!operation.operation(v)) {
                            return FILTERED;
                        }
                        break;
                }
            }
            return v;
        }
        catch (e) {
            throw e;
        }
    };
    for await (const v of asyncIterator) {
        if (token?.isCanceled) {
            return;
        }
        const i = await transform(v);
        if (i !== FILTERED) {
            yield i;
        }
    }
    return;
}
function promiseIterator(promises, cancellation) {
    let pendingCount = promises.length;
    const output = new _stream_data_source_js__WEBPACK_IMPORTED_MODULE_0__.DataSource();
    cancellation = cancellation ?? new _cancellation_token_js__WEBPACK_IMPORTED_MODULE_2__.CancellationToken();
    for (const promise of promises) {
        promise.then((v) => {
            pendingCount--;
            output.update({
                status: 'fulfilled',
                value: v
            });
            if (pendingCount === 0) {
                cancellation.cancel();
            }
        }, (e) => {
            pendingCount--;
            if (pendingCount === 0) {
                cancellation.cancel();
            }
            output.update({
                status: 'rejected',
                reason: e
            });
        });
    }
    return output.toAsyncIterator(cancellation);
}
//# sourceMappingURL=iteration.js.map

/***/ }),

/***/ "./node_modules/aurumjs/prebuilt/esnext/utilities/sources.js":
/*!*******************************************************************!*\
  !*** ./node_modules/aurumjs/prebuilt/esnext/utilities/sources.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getValueOf": () => (/* binding */ getValueOf),
/* harmony export */   "unwrapObjectRecursive": () => (/* binding */ unwrapObjectRecursive)
/* harmony export */ });
/* harmony import */ var _stream_data_source_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../stream/data_source.js */ "./node_modules/aurumjs/prebuilt/esnext/stream/data_source.js");
/* harmony import */ var _stream_duplex_data_source_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../stream/duplex_data_source.js */ "./node_modules/aurumjs/prebuilt/esnext/stream/duplex_data_source.js");
/* harmony import */ var _stream_object_data_source_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../stream/object_data_source.js */ "./node_modules/aurumjs/prebuilt/esnext/stream/object_data_source.js");
/* harmony import */ var _stream_stream_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../stream/stream.js */ "./node_modules/aurumjs/prebuilt/esnext/stream/stream.js");




function getValueOf(sourceOrPrimitive) {
    if (sourceOrPrimitive instanceof _stream_data_source_js__WEBPACK_IMPORTED_MODULE_0__.DataSource || sourceOrPrimitive instanceof _stream_duplex_data_source_js__WEBPACK_IMPORTED_MODULE_1__.DuplexDataSource || sourceOrPrimitive instanceof _stream_stream_js__WEBPACK_IMPORTED_MODULE_3__.Stream) {
        return sourceOrPrimitive.value;
    }
    if (sourceOrPrimitive instanceof _stream_data_source_js__WEBPACK_IMPORTED_MODULE_0__.ArrayDataSource) {
        return sourceOrPrimitive.getData();
    }
    return sourceOrPrimitive;
}
function unwrapObjectRecursive(object) {
    if (object instanceof _stream_data_source_js__WEBPACK_IMPORTED_MODULE_0__.DataSource || object instanceof _stream_duplex_data_source_js__WEBPACK_IMPORTED_MODULE_1__.DuplexDataSource || object instanceof _stream_stream_js__WEBPACK_IMPORTED_MODULE_3__.Stream) {
        //@ts-ignore
        return unwrapObjectRecursive(object.value);
    }
    if (object instanceof _stream_data_source_js__WEBPACK_IMPORTED_MODULE_0__.ArrayDataSource) {
        //@ts-ignore
        return unwrapObjectRecursive(object.toArray());
    }
    if (object instanceof _stream_object_data_source_js__WEBPACK_IMPORTED_MODULE_2__.ObjectDataSource) {
        //@ts-ignore
        return unwrapObjectRecursive(object.getData());
    }
    if (object instanceof _stream_duplex_data_source_js__WEBPACK_IMPORTED_MODULE_1__.DuplexDataSource) {
        //@ts-ignore
        return unwrapObjectRecursive(object.value);
    }
    if (object instanceof _stream_stream_js__WEBPACK_IMPORTED_MODULE_3__.Stream) {
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
//# sourceMappingURL=sources.js.map

/***/ }),

/***/ "./node_modules/aurumjs/prebuilt/esnext/utilities/storage_stream.js":
/*!**************************************************************************!*\
  !*** ./node_modules/aurumjs/prebuilt/esnext/utilities/storage_stream.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StorageStream": () => (/* binding */ StorageStream),
/* harmony export */   "localStorageStream": () => (/* binding */ localStorageStream),
/* harmony export */   "sessionStorageStream": () => (/* binding */ sessionStorageStream),
/* harmony export */   "urlStorageStream": () => (/* binding */ urlStorageStream)
/* harmony export */ });
/* harmony import */ var _stream_data_source_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../stream/data_source.js */ "./node_modules/aurumjs/prebuilt/esnext/stream/data_source.js");
/* harmony import */ var _stream_duplex_data_source_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../stream/duplex_data_source.js */ "./node_modules/aurumjs/prebuilt/esnext/stream/duplex_data_source.js");
/* harmony import */ var _event_emitter_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./event_emitter.js */ "./node_modules/aurumjs/prebuilt/esnext/utilities/event_emitter.js");
/* harmony import */ var _url_storage_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./url_storage.js */ "./node_modules/aurumjs/prebuilt/esnext/utilities/url_storage.js");




class StorageStream {
    storageAPI;
    onChange;
    originalSetItem;
    originalRemoveItem;
    constructor(storageAPI) {
        this.onChange = new _event_emitter_js__WEBPACK_IMPORTED_MODULE_2__.EventEmitter();
        this.storageAPI = storageAPI;
        this.observeStorageAPI(storageAPI);
    }
    observeStorageAPI(storageAPI) {
        this.originalSetItem = storageAPI.setItem.bind(storageAPI);
        storageAPI.setItem = (key, value) => {
            this.originalSetItem(key, value);
            this.onChange.fire({ key, value });
        };
        this.originalRemoveItem = storageAPI.removeItem.bind(storageAPI);
        storageAPI.removeItem = (key) => {
            this.originalRemoveItem(key);
            this.onChange.fire({ key, value: undefined });
        };
        const originalClear = storageAPI.clear.bind(storageAPI);
        storageAPI.clear = () => {
            originalClear();
            this.onChange.fire({ key: '*', value: undefined });
        };
    }
    listenAsString(key, defaultValue, cancellationToken) {
        const stream = new _stream_duplex_data_source_js__WEBPACK_IMPORTED_MODULE_1__.DuplexDataSource().withInitial(this.storageAPI.getItem(key) ?? defaultValue);
        this.onChange.subscribe((e) => {
            if (e.key === key || e.key === '*') {
                stream.updateDownstream(e.value ?? defaultValue);
            }
        }, cancellationToken);
        stream.listenUpstream((v) => {
            if (v === undefined || v === defaultValue) {
                this.originalRemoveItem(key);
            }
            else {
                this.originalSetItem(key, v);
            }
        }, cancellationToken);
        return stream;
    }
    listenAsNumber(key, defaultValue, cancellationToken, radix = 10) {
        const stream = new _stream_duplex_data_source_js__WEBPACK_IMPORTED_MODULE_1__.DuplexDataSource().withInitial(this.storageAPI.getItem(key) ? parseInt(this.storageAPI.getItem(key), radix) : defaultValue);
        this.onChange.subscribe((e) => {
            if (e.key === key || e.key === '*') {
                stream.updateDownstream(e.value != undefined ? parseInt(e.value, radix) : defaultValue);
            }
        }, cancellationToken);
        stream.listenUpstream((v) => {
            if (v === undefined || v === defaultValue) {
                this.originalRemoveItem(key);
            }
            else {
                this.originalSetItem(key, v.toString());
            }
        }, cancellationToken);
        return stream;
    }
    listenAsDate(key, defaultValue, cancellationToken) {
        const stream = new _stream_duplex_data_source_js__WEBPACK_IMPORTED_MODULE_1__.DuplexDataSource().withInitial(this.storageAPI.getItem(key) ? new Date(this.storageAPI.getItem(key)) : defaultValue);
        this.onChange.subscribe((e) => {
            if (e.key === key || e.key === '*') {
                stream.updateDownstream(e.value != undefined ? new Date(e.value) : defaultValue);
            }
        }, cancellationToken);
        stream.listenUpstream((v) => {
            if (v === undefined || v === defaultValue) {
                this.originalRemoveItem(key);
            }
            else {
                this.originalSetItem(key, v.toJSON());
            }
        }, cancellationToken);
        return stream;
    }
    listenAsBoolean(key, defaultValue, cancellationToken) {
        const stream = new _stream_duplex_data_source_js__WEBPACK_IMPORTED_MODULE_1__.DuplexDataSource().withInitial(this.storageAPI.getItem(key) ? this.storageAPI.getItem(key) === 'true' : defaultValue);
        this.onChange.subscribe((e) => {
            if (e.key === key || e.key === '*') {
                stream.updateDownstream(e.value != undefined ? e.value === 'true' : defaultValue);
            }
        }, cancellationToken);
        stream.listenUpstream((v) => {
            if (v === undefined || v === defaultValue) {
                this.originalRemoveItem(key);
            }
            else {
                this.originalSetItem(key, v.toString());
            }
        }, cancellationToken);
        return stream;
    }
    // Since objects can be mutable a provider can be used to regenerate the object on each use of the default value
    listenAsObject(key, defaultValueOrProvider, cancellationToken) {
        const stream = new _stream_duplex_data_source_js__WEBPACK_IMPORTED_MODULE_1__.DuplexDataSource().withInitial(this.storageAPI.getItem(key)
            ? JSON.parse(this.storageAPI.getItem(key))
            : typeof defaultValueOrProvider === 'function'
                ? defaultValueOrProvider()
                : defaultValueOrProvider);
        this.onChange.subscribe((e) => {
            if (e.key === key || e.key === '*') {
                stream.updateDownstream(e.value != undefined
                    ? JSON.parse(e.value)
                    : typeof defaultValueOrProvider === 'function'
                        ? defaultValueOrProvider()
                        : defaultValueOrProvider);
            }
        }, cancellationToken);
        stream.listenUpstream((v) => {
            if (v === undefined) {
                this.originalRemoveItem(key);
            }
            else {
                this.originalSetItem(key, JSON.stringify(v));
            }
        }, cancellationToken);
        return stream;
    }
    listenAsEnum(key, defaultValue, cancellationToken) {
        const stream = new _stream_duplex_data_source_js__WEBPACK_IMPORTED_MODULE_1__.DuplexDataSource().withInitial(this.storageAPI.getItem(key) ?? defaultValue);
        this.onChange.subscribe((e) => {
            if (e.key === key || e.key === '*') {
                stream.updateDownstream(e.value != undefined ? e.value : defaultValue);
            }
        }, cancellationToken);
        stream.listenUpstream((v) => {
            if (v === undefined || v === defaultValue) {
                this.originalRemoveItem(key);
            }
            else {
                this.originalSetItem(key, v.toString());
            }
        }, cancellationToken);
        return stream;
    }
    listenAsArray(key, cancellationToken) {
        const stream = new _stream_data_source_js__WEBPACK_IMPORTED_MODULE_0__.ArrayDataSource(JSON.parse(this.storageAPI.getItem(key) ?? '[]'));
        this.onChange.subscribe((e) => {
            if (e.key === key || e.key === '*') {
                stream.merge(e.value != undefined ? JSON.parse(e.value) : []);
            }
        }, cancellationToken);
        stream.listen((v) => {
            this.originalSetItem(key, JSON.stringify(v.newState));
        }, cancellationToken);
        return stream;
    }
    listenAsSet(key, cancellationToken) {
        const stream = new _stream_data_source_js__WEBPACK_IMPORTED_MODULE_0__.SetDataSource(JSON.parse(this.storageAPI.getItem(key) ?? '[]'));
        this.onChange.subscribe((e) => {
            if (e.key === key || e.key === '*') {
                stream.merge(e.value != undefined ? JSON.parse(e.value) : []);
            }
        }, cancellationToken);
        stream.listen((v) => {
            this.originalSetItem(key, JSON.stringify(stream.toArray()));
        }, cancellationToken);
        return stream;
    }
}
let localStorageStream;
if (typeof localStorage !== 'undefined') {
    localStorageStream = new StorageStream(localStorage);
}
let sessionStorageStream;
if (typeof sessionStorage !== 'undefined') {
    sessionStorageStream = new StorageStream(sessionStorage);
}
let urlStorageStream;
if (typeof location !== 'undefined') {
    urlStorageStream = new StorageStream(new _url_storage_js__WEBPACK_IMPORTED_MODULE_3__.UrlStorage());
}
//# sourceMappingURL=storage_stream.js.map

/***/ }),

/***/ "./node_modules/aurumjs/prebuilt/esnext/utilities/transclusion.js":
/*!************************************************************************!*\
  !*** ./node_modules/aurumjs/prebuilt/esnext/utilities/transclusion.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "resolveChildren": () => (/* binding */ resolveChildren)
/* harmony export */ });
/* harmony import */ var _stream_data_source_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../stream/data_source.js */ "./node_modules/aurumjs/prebuilt/esnext/stream/data_source.js");

function resolveChildren(children, cancellationToken, validation) {
    const chunks = process(children);
    const result = _stream_data_source_js__WEBPACK_IMPORTED_MODULE_0__.ArrayDataSource.fromMultipleSources(chunks, cancellationToken);
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
function process(children) {
    const chunks = [];
    let currentChunk = [];
    for (const child of children) {
        if (child instanceof _stream_data_source_js__WEBPACK_IMPORTED_MODULE_0__.ArrayDataSource) {
            if (currentChunk.length) {
                chunks.push(currentChunk);
                currentChunk.length = 0;
            }
            chunks.push(child);
        }
        else if (child instanceof _stream_data_source_js__WEBPACK_IMPORTED_MODULE_0__.DataSource) {
            currentChunk.push(child);
        }
        else if (child instanceof _stream_data_source_js__WEBPACK_IMPORTED_MODULE_0__.DataSource) {
            currentChunk.push(child);
        }
        else if (child instanceof _stream_data_source_js__WEBPACK_IMPORTED_MODULE_0__.DataSource) {
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

/***/ }),

/***/ "./node_modules/aurumjs/prebuilt/esnext/utilities/url_storage.js":
/*!***********************************************************************!*\
  !*** ./node_modules/aurumjs/prebuilt/esnext/utilities/url_storage.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UrlStorage": () => (/* binding */ UrlStorage)
/* harmony export */ });
class UrlStorage {
    state;
    originalReplaceState;
    updating = false;
    constructor() {
        this.state = {};
        this.observeUrl();
        window.addEventListener('hashchange', () => this.checkUpdate());
        this.checkUpdate();
    }
    observeUrl() {
        this.originalReplaceState = history.replaceState;
        history.replaceState = (...args) => {
            this.originalReplaceState.apply(history, args);
            this.checkUpdate();
        };
    }
    get length() {
        return Object.keys(this.state).length;
    }
    clear() {
        this.state = {};
        this.applyStateToUrl();
    }
    getItem(key) {
        return this.state[key];
    }
    key(index) {
        return Object.keys(this.state)[index];
    }
    removeItem(key) {
        delete this.state[key];
        if (!this.updating) {
            this.applyStateToUrl();
        }
    }
    setItem(key, value) {
        this.state[key] = value;
        if (!this.updating) {
            this.applyStateToUrl();
        }
    }
    applyStateToUrl() {
        // Take the state and turn it into a parameter string and set it as the url
        const url = new URL(location.href);
        for (const param of url.searchParams.entries()) {
            url.searchParams.delete(param[0]);
        }
        for (const key in this.state) {
            url.searchParams.set(key, this.state[key]);
        }
        this.originalReplaceState({}, '', url.href);
    }
    /**
     * For url changes that are not observable such as parent window changes
     */
    refresh() {
        this.checkUpdate();
    }
    checkUpdate() {
        const result = Object.fromEntries(new URL(location.href).searchParams);
        this.updating = true;
        try {
            for (const key in result) {
                if (result[key] !== this.state[key]) {
                    this.setItem(key, result[key]);
                }
            }
            for (const key in this.state) {
                if (result[key] === undefined) {
                    this.removeItem(key);
                }
            }
        }
        finally {
            this.updating = false;
        }
    }
}
//# sourceMappingURL=url_storage.js.map

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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
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
/* harmony import */ var aurumjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aurumjs */ "./node_modules/aurumjs/prebuilt/esnext/aurumjs.js");

// enableDebugMode();
aurumjs__WEBPACK_IMPORTED_MODULE_0__.EventEmitter.setSubscriptionLeakWarningThreshold(300);
Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_css-loader_dist_runtime_api_js-node_modules_css-loader_dist_runtime_sour-7235ae"), __webpack_require__.e("src_main_tsx")]).then(__webpack_require__.bind(__webpack_require__, /*! ./main */ "./src/main.tsx"));

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzREFBc0QsUUFBUTtBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9EQUFvRCwwQkFBMEI7QUFDOUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFdBQVc7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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Q0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixzSEFBc0g7QUFDNUk7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQix5SEFBeUg7QUFDL0k7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQix5SEFBeUg7QUFDL0k7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQiwyR0FBMkc7QUFDakk7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQix5SEFBeUg7QUFDL0k7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQiw0R0FBNEc7QUFDbEk7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IscUhBQXFIO0FBQzNJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsNEhBQTRIO0FBQ2xKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsOEdBQThHO0FBQ3BJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBLHVEQUF1RCwrRUFBaUI7QUFDeEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QywrRUFBaUI7QUFDekQ7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQSx3REFBd0QsK0VBQWlCO0FBQ3pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLHlCQUF5QjtBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsNEJBQTRCO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0EsZ0RBQWdELCtFQUFpQjtBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQLDREQUE0RCwrRUFBaUI7QUFDN0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDTztBQUNQLGdEQUFnRCwrRUFBaUI7QUFDakU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0EsNERBQTRELCtFQUFpQjtBQUM3RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLHFFQUFZO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsaUJBQWlCO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSx1RkFBaUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0MscUVBQVk7QUFDM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLG9CQUFvQjtBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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dEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EscURBQXFELFFBQVE7QUFDN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLE1BQU07QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxtRkFBMEI7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQzlLTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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Q0E7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsbUVBQW1FLGlDQUFpQztXQUNwRztXQUNBO1dBQ0E7V0FDQTs7Ozs7V0N4Q0E7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BOzs7OztXQ0FBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUM7O1dBRWpDO1dBQ0E7V0FDQTtXQUNBLEtBQUs7V0FDTCxlQUFlO1dBQ2Y7V0FDQTtXQUNBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxNQUFNO1dBQ047V0FDQTtXQUNBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLE1BQU0scUJBQXFCO1dBQzNCO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTtXQUNBO1dBQ0E7Ozs7O1dDckZBOzs7Ozs7Ozs7OztBQ0F1QztBQUV2QyxxQkFBcUI7QUFDckIscUZBQWdELENBQUMsR0FBRyxDQUFDLENBQUM7QUFDdEQsc1JBQWdCLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hdXJ1bS5vcmcvLi9ub2RlX21vZHVsZXMvYXVydW1qcy9wcmVidWlsdC9lc25leHQvYXVydW1fc2VydmVyL2F1cnVtX3NlcnZlcl9jbGllbnQuanMiLCJ3ZWJwYWNrOi8vYXVydW0ub3JnLy4vbm9kZV9tb2R1bGVzL2F1cnVtanMvcHJlYnVpbHQvZXNuZXh0L2F1cnVtanMuanMiLCJ3ZWJwYWNrOi8vYXVydW0ub3JnLy4vbm9kZV9tb2R1bGVzL2F1cnVtanMvcHJlYnVpbHQvZXNuZXh0L2J1aWx0aW5fY29tcG9uZW50cy9kb21fYWRhcHRlci5qcyIsIndlYnBhY2s6Ly9hdXJ1bS5vcmcvLi9ub2RlX21vZHVsZXMvYXVydW1qcy9wcmVidWlsdC9lc25leHQvYnVpbHRpbl9jb21wb25lbnRzL2Vycm9yX2JvdW5kYXJ5LmpzIiwid2VicGFjazovL2F1cnVtLm9yZy8uL25vZGVfbW9kdWxlcy9hdXJ1bWpzL3ByZWJ1aWx0L2VzbmV4dC9idWlsdGluX2NvbXBvbmVudHMvcm91dGVyLmpzIiwid2VicGFjazovL2F1cnVtLm9yZy8uL25vZGVfbW9kdWxlcy9hdXJ1bWpzL3ByZWJ1aWx0L2VzbmV4dC9idWlsdGluX2NvbXBvbmVudHMvc3VzcGVuc2UuanMiLCJ3ZWJwYWNrOi8vYXVydW0ub3JnLy4vbm9kZV9tb2R1bGVzL2F1cnVtanMvcHJlYnVpbHQvZXNuZXh0L2J1aWx0aW5fY29tcG9uZW50cy9zd2l0Y2guanMiLCJ3ZWJwYWNrOi8vYXVydW0ub3JnLy4vbm9kZV9tb2R1bGVzL2F1cnVtanMvcHJlYnVpbHQvZXNuZXh0L2RlYnVnX21vZGUuanMiLCJ3ZWJwYWNrOi8vYXVydW0ub3JnLy4vbm9kZV9tb2R1bGVzL2F1cnVtanMvcHJlYnVpbHQvZXNuZXh0L25vZGVzL2lucHV0LmpzIiwid2VicGFjazovL2F1cnVtLm9yZy8uL25vZGVfbW9kdWxlcy9hdXJ1bWpzL3ByZWJ1aWx0L2VzbmV4dC9ub2Rlcy9yZW5kZXJpbmdfaGVscGVycy5qcyIsIndlYnBhY2s6Ly9hdXJ1bS5vcmcvLi9ub2RlX21vZHVsZXMvYXVydW1qcy9wcmVidWlsdC9lc25leHQvbm9kZXMvc2VsZWN0LmpzIiwid2VicGFjazovL2F1cnVtLm9yZy8uL25vZGVfbW9kdWxlcy9hdXJ1bWpzL3ByZWJ1aWx0L2VzbmV4dC9ub2Rlcy9zaW1wbGVfZG9tX25vZGVzLmpzIiwid2VicGFjazovL2F1cnVtLm9yZy8uL25vZGVfbW9kdWxlcy9hdXJ1bWpzL3ByZWJ1aWx0L2VzbmV4dC9ub2Rlcy9zdHJpbmdfYWRhcHRlci5qcyIsIndlYnBhY2s6Ly9hdXJ1bS5vcmcvLi9ub2RlX21vZHVsZXMvYXVydW1qcy9wcmVidWlsdC9lc25leHQvbm9kZXMvdGV4dGFyZWEuanMiLCJ3ZWJwYWNrOi8vYXVydW0ub3JnLy4vbm9kZV9tb2R1bGVzL2F1cnVtanMvcHJlYnVpbHQvZXNuZXh0L25vZGVzL3Zkb21fYWRhcHRlci5qcyIsIndlYnBhY2s6Ly9hdXJ1bS5vcmcvLi9ub2RlX21vZHVsZXMvYXVydW1qcy9wcmVidWlsdC9lc25leHQvcmVuZGVyaW5nL2F1cnVtX2VsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYXVydW0ub3JnLy4vbm9kZV9tb2R1bGVzL2F1cnVtanMvcHJlYnVpbHQvZXNuZXh0L3JlbmRlcmluZy93ZWJjb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vYXVydW0ub3JnLy4vbm9kZV9tb2R1bGVzL2F1cnVtanMvcHJlYnVpbHQvZXNuZXh0L3N0cmVhbS9kYXRhX3NvdXJjZS5qcyIsIndlYnBhY2s6Ly9hdXJ1bS5vcmcvLi9ub2RlX21vZHVsZXMvYXVydW1qcy9wcmVidWlsdC9lc25leHQvc3RyZWFtL2RhdGFfc291cmNlX29wZXJhdG9ycy5qcyIsIndlYnBhY2s6Ly9hdXJ1bS5vcmcvLi9ub2RlX21vZHVsZXMvYXVydW1qcy9wcmVidWlsdC9lc25leHQvc3RyZWFtL2R1cGxleF9kYXRhX3NvdXJjZS5qcyIsIndlYnBhY2s6Ly9hdXJ1bS5vcmcvLi9ub2RlX21vZHVsZXMvYXVydW1qcy9wcmVidWlsdC9lc25leHQvc3RyZWFtL2R1cGxleF9kYXRhX3NvdXJjZV9vcGVyYXRvcnMuanMiLCJ3ZWJwYWNrOi8vYXVydW0ub3JnLy4vbm9kZV9tb2R1bGVzL2F1cnVtanMvcHJlYnVpbHQvZXNuZXh0L3N0cmVhbS9lbWl0dGVycy5qcyIsIndlYnBhY2s6Ly9hdXJ1bS5vcmcvLi9ub2RlX21vZHVsZXMvYXVydW1qcy9wcmVidWlsdC9lc25leHQvc3RyZWFtL29iamVjdF9kYXRhX3NvdXJjZS5qcyIsIndlYnBhY2s6Ly9hdXJ1bS5vcmcvLi9ub2RlX21vZHVsZXMvYXVydW1qcy9wcmVidWlsdC9lc25leHQvc3RyZWFtL29wZXJhdG9yX21vZGVsLmpzIiwid2VicGFjazovL2F1cnVtLm9yZy8uL25vZGVfbW9kdWxlcy9hdXJ1bWpzL3ByZWJ1aWx0L2VzbmV4dC9zdHJlYW0vc3RyZWFtLmpzIiwid2VicGFjazovL2F1cnVtLm9yZy8uL25vZGVfbW9kdWxlcy9hdXJ1bWpzL3ByZWJ1aWx0L2VzbmV4dC9zdHJlYW0vdHJlZV9kYXRhX3NvdXJjZS5qcyIsIndlYnBhY2s6Ly9hdXJ1bS5vcmcvLi9ub2RlX21vZHVsZXMvYXVydW1qcy9wcmVidWlsdC9lc25leHQvdXRpbGl0aWVzL2F1cnVtLmpzIiwid2VicGFjazovL2F1cnVtLm9yZy8uL25vZGVfbW9kdWxlcy9hdXJ1bWpzL3ByZWJ1aWx0L2VzbmV4dC91dGlsaXRpZXMvY2FuY2VsbGF0aW9uX3Rva2VuLmpzIiwid2VicGFjazovL2F1cnVtLm9yZy8uL25vZGVfbW9kdWxlcy9hdXJ1bWpzL3ByZWJ1aWx0L2VzbmV4dC91dGlsaXRpZXMvY2xhc3NuYW1lLmpzIiwid2VicGFjazovL2F1cnVtLm9yZy8uL25vZGVfbW9kdWxlcy9hdXJ1bWpzL3ByZWJ1aWx0L2VzbmV4dC91dGlsaXRpZXMvZXZlbnRfZW1pdHRlci5qcyIsIndlYnBhY2s6Ly9hdXJ1bS5vcmcvLi9ub2RlX21vZHVsZXMvYXVydW1qcy9wcmVidWlsdC9lc25leHQvdXRpbGl0aWVzL2l0ZXJhdGlvbi5qcyIsIndlYnBhY2s6Ly9hdXJ1bS5vcmcvLi9ub2RlX21vZHVsZXMvYXVydW1qcy9wcmVidWlsdC9lc25leHQvdXRpbGl0aWVzL3NvdXJjZXMuanMiLCJ3ZWJwYWNrOi8vYXVydW0ub3JnLy4vbm9kZV9tb2R1bGVzL2F1cnVtanMvcHJlYnVpbHQvZXNuZXh0L3V0aWxpdGllcy9zdG9yYWdlX3N0cmVhbS5qcyIsIndlYnBhY2s6Ly9hdXJ1bS5vcmcvLi9ub2RlX21vZHVsZXMvYXVydW1qcy9wcmVidWlsdC9lc25leHQvdXRpbGl0aWVzL3RyYW5zY2x1c2lvbi5qcyIsIndlYnBhY2s6Ly9hdXJ1bS5vcmcvLi9ub2RlX21vZHVsZXMvYXVydW1qcy9wcmVidWlsdC9lc25leHQvdXRpbGl0aWVzL3VybF9zdG9yYWdlLmpzIiwid2VicGFjazovL2F1cnVtLm9yZy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9hdXJ1bS5vcmcvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYXVydW0ub3JnL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9hdXJ1bS5vcmcvd2VicGFjay9ydW50aW1lL2Vuc3VyZSBjaHVuayIsIndlYnBhY2s6Ly9hdXJ1bS5vcmcvd2VicGFjay9ydW50aW1lL2dldCBqYXZhc2NyaXB0IGNodW5rIGZpbGVuYW1lIiwid2VicGFjazovL2F1cnVtLm9yZy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2F1cnVtLm9yZy93ZWJwYWNrL3J1bnRpbWUvbG9hZCBzY3JpcHQiLCJ3ZWJwYWNrOi8vYXVydW0ub3JnL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYXVydW0ub3JnL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL2F1cnVtLm9yZy93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9hdXJ1bS5vcmcvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL2F1cnVtLm9yZy8uL3NyYy9zZXR1cC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDYW5jZWxsYXRpb25Ub2tlbiB9IGZyb20gJy4uL3V0aWxpdGllcy9jYW5jZWxsYXRpb25fdG9rZW4uanMnO1xuZXhwb3J0IHZhciBSZW1vdGVQcm90b2NvbDtcbihmdW5jdGlvbiAoUmVtb3RlUHJvdG9jb2wpIHtcbiAgICBSZW1vdGVQcm90b2NvbFtSZW1vdGVQcm90b2NvbFtcIkhFQVJUQkVBVFwiXSA9IDBdID0gXCJIRUFSVEJFQVRcIjtcbiAgICBSZW1vdGVQcm90b2NvbFtSZW1vdGVQcm90b2NvbFtcIkxJU1RFTl9EQVRBU09VUkNFXCJdID0gMV0gPSBcIkxJU1RFTl9EQVRBU09VUkNFXCI7XG4gICAgUmVtb3RlUHJvdG9jb2xbUmVtb3RlUHJvdG9jb2xbXCJMSVNURU5fREFUQVNPVVJDRV9FUlJcIl0gPSAyXSA9IFwiTElTVEVOX0RBVEFTT1VSQ0VfRVJSXCI7XG4gICAgUmVtb3RlUHJvdG9jb2xbUmVtb3RlUHJvdG9jb2xbXCJVUERBVEVfREFUQVNPVVJDRVwiXSA9IDNdID0gXCJVUERBVEVfREFUQVNPVVJDRVwiO1xuICAgIFJlbW90ZVByb3RvY29sW1JlbW90ZVByb3RvY29sW1wiVVBEQVRFX0RBVEFTT1VSQ0VfRVJSXCJdID0gNF0gPSBcIlVQREFURV9EQVRBU09VUkNFX0VSUlwiO1xuICAgIFJlbW90ZVByb3RvY29sW1JlbW90ZVByb3RvY29sW1wiQ0FOQ0VMX0RBVEFTT1VSQ0VcIl0gPSA1XSA9IFwiQ0FOQ0VMX0RBVEFTT1VSQ0VcIjtcbiAgICBSZW1vdGVQcm90b2NvbFtSZW1vdGVQcm90b2NvbFtcIlBFUkZPUk1fUlBDXCJdID0gNl0gPSBcIlBFUkZPUk1fUlBDXCI7XG4gICAgUmVtb3RlUHJvdG9jb2xbUmVtb3RlUHJvdG9jb2xbXCJQRVJGT1JNX1JQQ19FUlJcIl0gPSA3XSA9IFwiUEVSRk9STV9SUENfRVJSXCI7XG4gICAgUmVtb3RlUHJvdG9jb2xbUmVtb3RlUHJvdG9jb2xbXCJQRVJGT1JNX1JQQ19SRVNVTFRcIl0gPSA4XSA9IFwiUEVSRk9STV9SUENfUkVTVUxUXCI7XG4gICAgUmVtb3RlUHJvdG9jb2xbUmVtb3RlUHJvdG9jb2xbXCJQRVJGT1JNX1JQQ19SRVNVTFRfRVJSXCJdID0gOV0gPSBcIlBFUkZPUk1fUlBDX1JFU1VMVF9FUlJcIjtcbiAgICBSZW1vdGVQcm90b2NvbFtSZW1vdGVQcm90b2NvbFtcIkxJU1RFTl9EVVBMRVhfREFUQVNPVVJDRV9FUlJcIl0gPSAxMF0gPSBcIkxJU1RFTl9EVVBMRVhfREFUQVNPVVJDRV9FUlJcIjtcbiAgICBSZW1vdGVQcm90b2NvbFtSZW1vdGVQcm90b2NvbFtcIkxJU1RFTl9EVVBMRVhfREFUQVNPVVJDRVwiXSA9IDExXSA9IFwiTElTVEVOX0RVUExFWF9EQVRBU09VUkNFXCI7XG4gICAgUmVtb3RlUHJvdG9jb2xbUmVtb3RlUHJvdG9jb2xbXCJVUERBVEVfRFVQTEVYX0RBVEFTT1VSQ0VcIl0gPSAxMl0gPSBcIlVQREFURV9EVVBMRVhfREFUQVNPVVJDRVwiO1xuICAgIFJlbW90ZVByb3RvY29sW1JlbW90ZVByb3RvY29sW1wiVVBEQVRFX0RVUExFWF9EQVRBU09VUkNFX0VSUlwiXSA9IDEzXSA9IFwiVVBEQVRFX0RVUExFWF9EQVRBU09VUkNFX0VSUlwiO1xuICAgIFJlbW90ZVByb3RvY29sW1JlbW90ZVByb3RvY29sW1wiQ0FOQ0VMX0RVUExFWF9EQVRBU09VUkNFXCJdID0gMTRdID0gXCJDQU5DRUxfRFVQTEVYX0RBVEFTT1VSQ0VcIjtcbiAgICBSZW1vdGVQcm90b2NvbFtSZW1vdGVQcm90b2NvbFtcIkxJU1RFTl9BUlJBWV9EQVRBU09VUkNFXCJdID0gMTVdID0gXCJMSVNURU5fQVJSQVlfREFUQVNPVVJDRVwiO1xuICAgIFJlbW90ZVByb3RvY29sW1JlbW90ZVByb3RvY29sW1wiTElTVEVOX0FSUkFZX0RBVEFTT1VSQ0VfRVJSXCJdID0gMTZdID0gXCJMSVNURU5fQVJSQVlfREFUQVNPVVJDRV9FUlJcIjtcbiAgICBSZW1vdGVQcm90b2NvbFtSZW1vdGVQcm90b2NvbFtcIlVQREFURV9BUlJBWV9EQVRBU09VUkNFXCJdID0gMTddID0gXCJVUERBVEVfQVJSQVlfREFUQVNPVVJDRVwiO1xuICAgIFJlbW90ZVByb3RvY29sW1JlbW90ZVByb3RvY29sW1wiVVBEQVRFX0FSUkFZX0RBVEFTT1VSQ0VfRVJSXCJdID0gMThdID0gXCJVUERBVEVfQVJSQVlfREFUQVNPVVJDRV9FUlJcIjtcbiAgICBSZW1vdGVQcm90b2NvbFtSZW1vdGVQcm90b2NvbFtcIkNBTkNFTF9BUlJBWV9EQVRBU09VUkNFXCJdID0gMTldID0gXCJDQU5DRUxfQVJSQVlfREFUQVNPVVJDRVwiO1xuICAgIFJlbW90ZVByb3RvY29sW1JlbW90ZVByb3RvY29sW1wiTElTVEVOX01BUF9EQVRBU09VUkNFXCJdID0gMjBdID0gXCJMSVNURU5fTUFQX0RBVEFTT1VSQ0VcIjtcbiAgICBSZW1vdGVQcm90b2NvbFtSZW1vdGVQcm90b2NvbFtcIkxJU1RFTl9NQVBfREFUQVNPVVJDRV9FUlJcIl0gPSAyMV0gPSBcIkxJU1RFTl9NQVBfREFUQVNPVVJDRV9FUlJcIjtcbiAgICBSZW1vdGVQcm90b2NvbFtSZW1vdGVQcm90b2NvbFtcIlVQREFURV9NQVBfREFUQVNPVVJDRVwiXSA9IDIyXSA9IFwiVVBEQVRFX01BUF9EQVRBU09VUkNFXCI7XG4gICAgUmVtb3RlUHJvdG9jb2xbUmVtb3RlUHJvdG9jb2xbXCJVUERBVEVfTUFQX0RBVEFTT1VSQ0VfRVJSXCJdID0gMjNdID0gXCJVUERBVEVfTUFQX0RBVEFTT1VSQ0VfRVJSXCI7XG4gICAgUmVtb3RlUHJvdG9jb2xbUmVtb3RlUHJvdG9jb2xbXCJDQU5DRUxfTUFQX0RBVEFTT1VSQ0VcIl0gPSAyNF0gPSBcIkNBTkNFTF9NQVBfREFUQVNPVVJDRVwiO1xuICAgIFJlbW90ZVByb3RvY29sW1JlbW90ZVByb3RvY29sW1wiTElTVEVOX09CSkVDVF9EQVRBU09VUkNFXCJdID0gMjVdID0gXCJMSVNURU5fT0JKRUNUX0RBVEFTT1VSQ0VcIjtcbiAgICBSZW1vdGVQcm90b2NvbFtSZW1vdGVQcm90b2NvbFtcIkxJU1RFTl9PQkpFQ1RfREFUQVNPVVJDRV9FUlJcIl0gPSAyNl0gPSBcIkxJU1RFTl9PQkpFQ1RfREFUQVNPVVJDRV9FUlJcIjtcbiAgICBSZW1vdGVQcm90b2NvbFtSZW1vdGVQcm90b2NvbFtcIlVQREFURV9PQkpFQ1RfREFUQVNPVVJDRVwiXSA9IDI3XSA9IFwiVVBEQVRFX09CSkVDVF9EQVRBU09VUkNFXCI7XG4gICAgUmVtb3RlUHJvdG9jb2xbUmVtb3RlUHJvdG9jb2xbXCJVUERBVEVfT0JKRUNUX0RBVEFTT1VSQ0VfRVJSXCJdID0gMjhdID0gXCJVUERBVEVfT0JKRUNUX0RBVEFTT1VSQ0VfRVJSXCI7XG4gICAgUmVtb3RlUHJvdG9jb2xbUmVtb3RlUHJvdG9jb2xbXCJDQU5DRUxfT0JKRUNUX0RBVEFTT1VSQ0VcIl0gPSAyOV0gPSBcIkNBTkNFTF9PQkpFQ1RfREFUQVNPVVJDRVwiO1xuICAgIFJlbW90ZVByb3RvY29sW1JlbW90ZVByb3RvY29sW1wiTElTVEVOX1NFVF9EQVRBU09VUkNFXCJdID0gMzBdID0gXCJMSVNURU5fU0VUX0RBVEFTT1VSQ0VcIjtcbiAgICBSZW1vdGVQcm90b2NvbFtSZW1vdGVQcm90b2NvbFtcIkxJU1RFTl9TRVRfREFUQVNPVVJDRV9FUlJcIl0gPSAzMV0gPSBcIkxJU1RFTl9TRVRfREFUQVNPVVJDRV9FUlJcIjtcbiAgICBSZW1vdGVQcm90b2NvbFtSZW1vdGVQcm90b2NvbFtcIlVQREFURV9TRVRfREFUQVNPVVJDRVwiXSA9IDMyXSA9IFwiVVBEQVRFX1NFVF9EQVRBU09VUkNFXCI7XG4gICAgUmVtb3RlUHJvdG9jb2xbUmVtb3RlUHJvdG9jb2xbXCJVUERBVEVfU0VUX0RBVEFTT1VSQ0VfRVJSXCJdID0gMzNdID0gXCJVUERBVEVfU0VUX0RBVEFTT1VSQ0VfRVJSXCI7XG4gICAgUmVtb3RlUHJvdG9jb2xbUmVtb3RlUHJvdG9jb2xbXCJDQU5DRUxfU0VUX0RBVEFTT1VSQ0VcIl0gPSAzNF0gPSBcIkNBTkNFTF9TRVRfREFUQVNPVVJDRVwiO1xufSkoUmVtb3RlUHJvdG9jb2wgfHwgKFJlbW90ZVByb3RvY29sID0ge30pKTtcbmNvbnN0IHBlbmRpbmdSUENSZXNwb25zZXMgPSBuZXcgTWFwKCk7XG5leHBvcnQgZnVuY3Rpb24gZ2V0UmVtb3RlRnVuY3Rpb24oYXVydW1TZXJ2ZXJJbmZvLCBjYW5jZWxsYXRpb24pIHtcbiAgICByZXR1cm4gc3luY0Z1bmN0aW9uKGF1cnVtU2VydmVySW5mbywgY2FuY2VsbGF0aW9uKTtcbn1cbmZ1bmN0aW9uIHN5bmNGdW5jdGlvbihhdXJ1bVNlcnZlckluZm8sIGNhbmNlbGxhdGlvbikge1xuICAgIGNvbnN0IGtleSA9IG1ha2VLZXkoYXVydW1TZXJ2ZXJJbmZvLnByb3RvY29sLCBhdXJ1bVNlcnZlckluZm8uaG9zdCk7XG4gICAgcmV0dXJuIGFzeW5jIChpbnB1dCkgPT4ge1xuICAgICAgICBhd2FpdCBlbnN1cmVDb25uZWN0aW9uKGtleSwgYXVydW1TZXJ2ZXJJbmZvLnByb3RvY29sLCBhdXJ1bVNlcnZlckluZm8uaG9zdCk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjbGllbnQgPSBjb25uZWN0aW9ucy5nZXQoa2V5KTtcbiAgICAgICAgICAgIGlmICghY2xpZW50KSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDbGllbnQgbm90IGNvbm5lY3RlZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGNsaWVudC5wZXJmb3JtUlBDKGlucHV0LCBhdXJ1bVNlcnZlckluZm8uaWQsIGF1cnVtU2VydmVySW5mby5hdXRoZW50aWNhdGlvblRva2VuLCBjYW5jZWxsYXRpb24pLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbn1cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzeW5jU2V0RGF0YVNvdXJjZShzb3VyY2UsIGF1cnVtU2VydmVySW5mbywgY2FuY2VsbGF0aW9uKSB7XG4gICAgY29uc3Qga2V5ID0gbWFrZUtleShhdXJ1bVNlcnZlckluZm8ucHJvdG9jb2wsIGF1cnVtU2VydmVySW5mby5ob3N0KTtcbiAgICBhd2FpdCBlbnN1cmVDb25uZWN0aW9uKGtleSwgYXVydW1TZXJ2ZXJJbmZvLnByb3RvY29sLCBhdXJ1bVNlcnZlckluZm8uaG9zdCk7XG4gICAgY29ubmVjdGlvbnMuZ2V0KGtleSkuc3luY1NldERhdGFTb3VyY2Uoc291cmNlLCBhdXJ1bVNlcnZlckluZm8uaWQsIGF1cnVtU2VydmVySW5mby5hdXRoZW50aWNhdGlvblRva2VuLCBjYW5jZWxsYXRpb24pO1xufVxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHN5bmNPYmplY3REYXRhU291cmNlKHNvdXJjZSwgYXVydW1TZXJ2ZXJJbmZvLCBjYW5jZWxsYXRpb24pIHtcbiAgICBjb25zdCBrZXkgPSBtYWtlS2V5KGF1cnVtU2VydmVySW5mby5wcm90b2NvbCwgYXVydW1TZXJ2ZXJJbmZvLmhvc3QpO1xuICAgIGF3YWl0IGVuc3VyZUNvbm5lY3Rpb24oa2V5LCBhdXJ1bVNlcnZlckluZm8ucHJvdG9jb2wsIGF1cnVtU2VydmVySW5mby5ob3N0KTtcbiAgICBjb25uZWN0aW9ucy5nZXQoa2V5KS5zeW5jT2JqZWN0RGF0YVNvdXJjZShzb3VyY2UsIGF1cnVtU2VydmVySW5mby5pZCwgYXVydW1TZXJ2ZXJJbmZvLmF1dGhlbnRpY2F0aW9uVG9rZW4sIGNhbmNlbGxhdGlvbik7XG59XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc3luY01hcERhdGFTb3VyY2Uoc291cmNlLCBhdXJ1bVNlcnZlckluZm8sIGNhbmNlbGxhdGlvbikge1xuICAgIGNvbnN0IGtleSA9IG1ha2VLZXkoYXVydW1TZXJ2ZXJJbmZvLnByb3RvY29sLCBhdXJ1bVNlcnZlckluZm8uaG9zdCk7XG4gICAgYXdhaXQgZW5zdXJlQ29ubmVjdGlvbihrZXksIGF1cnVtU2VydmVySW5mby5wcm90b2NvbCwgYXVydW1TZXJ2ZXJJbmZvLmhvc3QpO1xuICAgIGNvbm5lY3Rpb25zLmdldChrZXkpLnN5bmNNYXBEYXRhU291cmNlKHNvdXJjZSwgYXVydW1TZXJ2ZXJJbmZvLmlkLCBhdXJ1bVNlcnZlckluZm8uYXV0aGVudGljYXRpb25Ub2tlbiwgY2FuY2VsbGF0aW9uKTtcbn1cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzeW5jRGF0YVNvdXJjZShzb3VyY2UsIGF1cnVtU2VydmVySW5mbywgY2FuY2VsbGF0aW9uKSB7XG4gICAgY29uc3Qga2V5ID0gbWFrZUtleShhdXJ1bVNlcnZlckluZm8ucHJvdG9jb2wsIGF1cnVtU2VydmVySW5mby5ob3N0KTtcbiAgICBhd2FpdCBlbnN1cmVDb25uZWN0aW9uKGtleSwgYXVydW1TZXJ2ZXJJbmZvLnByb3RvY29sLCBhdXJ1bVNlcnZlckluZm8uaG9zdCk7XG4gICAgY29ubmVjdGlvbnMuZ2V0KGtleSkuc3luY0RhdGFTb3VyY2Uoc291cmNlLCBhdXJ1bVNlcnZlckluZm8uaWQsIGF1cnVtU2VydmVySW5mby5hdXRoZW50aWNhdGlvblRva2VuLCBjYW5jZWxsYXRpb24pO1xufVxuZnVuY3Rpb24gbWFrZUtleShwcm90b2NvbCwgaG9zdCkge1xuICAgIHJldHVybiBgJHtyZXNvbHZlUHJvdG9jb2wocHJvdG9jb2wpfTovLyR7cmVzb2x2ZUhvc3QoaG9zdCl9YDtcbn1cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzeW5jQXJyYXlEYXRhU291cmNlKHNvdXJjZSwgYXVydW1TZXJ2ZXJJbmZvLCBjYW5jZWxsYXRpb24pIHtcbiAgICBjb25zdCBrZXkgPSBtYWtlS2V5KGF1cnVtU2VydmVySW5mby5wcm90b2NvbCwgYXVydW1TZXJ2ZXJJbmZvLmhvc3QpO1xuICAgIGF3YWl0IGVuc3VyZUNvbm5lY3Rpb24oa2V5LCBhdXJ1bVNlcnZlckluZm8ucHJvdG9jb2wsIGF1cnVtU2VydmVySW5mby5ob3N0KTtcbiAgICBjb25uZWN0aW9ucy5nZXQoa2V5KS5zeW5jQXJyYXlEYXRhU291cmNlKHNvdXJjZSwgYXVydW1TZXJ2ZXJJbmZvLmlkLCBhdXJ1bVNlcnZlckluZm8uYXV0aGVudGljYXRpb25Ub2tlbiwgY2FuY2VsbGF0aW9uKTtcbn1cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzeW5jRHVwbGV4RGF0YVNvdXJjZShzb3VyY2UsIGF1cnVtU2VydmVySW5mbywgY2FuY2VsbGF0aW9uKSB7XG4gICAgY29uc3Qga2V5ID0gbWFrZUtleShhdXJ1bVNlcnZlckluZm8ucHJvdG9jb2wsIGF1cnVtU2VydmVySW5mby5ob3N0KTtcbiAgICBhd2FpdCBlbnN1cmVDb25uZWN0aW9uKGtleSwgYXVydW1TZXJ2ZXJJbmZvLnByb3RvY29sLCBhdXJ1bVNlcnZlckluZm8uaG9zdCk7XG4gICAgY29ubmVjdGlvbnMuZ2V0KGtleSkuc3luY0R1cGxleERhdGFTb3VyY2Uoc291cmNlLCBhdXJ1bVNlcnZlckluZm8uaWQsIGF1cnVtU2VydmVySW5mby5hdXRoZW50aWNhdGlvblRva2VuLCBjYW5jZWxsYXRpb24pO1xufVxuY29uc3QgY29ubmVjdGlvbnMgPSBuZXcgTWFwKCk7XG5jb25zdCBwZW5kaW5nQ29ubmVjdGlvbnMgPSBuZXcgTWFwKCk7XG5jbGFzcyBBdXJ1bVNlcnZlckNsaWVudCB7XG4gICAgbWFzdGVyVG9rZW47XG4gICAgY29ubmVjdGlvbjtcbiAgICBzeW5jaGVkRGF0YVNvdXJjZXM7XG4gICAgc3luY2hlZER1cGxleERhdGFTb3VyY2VzO1xuICAgIHN5bmNoZWRBcnJheURhdGFTb3VyY2VzO1xuICAgIHN5bmNoZWRNYXBEYXRhU291cmNlcztcbiAgICBzeW5jaGVkT2JqZWN0RGF0YVNvdXJjZXM7XG4gICAgc3luY2hlZFNldERhdGFTb3VyY2VzO1xuICAgIGNvbnN0cnVjdG9yKGNvbm5lY3Rpb24pIHtcbiAgICAgICAgdGhpcy5tYXN0ZXJUb2tlbiA9IG5ldyBDYW5jZWxsYXRpb25Ub2tlbigpO1xuICAgICAgICB0aGlzLmNvbm5lY3Rpb24gPSBjb25uZWN0aW9uO1xuICAgICAgICB0aGlzLnN5bmNoZWREYXRhU291cmNlcyA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5zeW5jaGVkRHVwbGV4RGF0YVNvdXJjZXMgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMuc3luY2hlZEFycmF5RGF0YVNvdXJjZXMgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMuc3luY2hlZE1hcERhdGFTb3VyY2VzID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLnN5bmNoZWRPYmplY3REYXRhU291cmNlcyA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5zeW5jaGVkU2V0RGF0YVNvdXJjZXMgPSBuZXcgTWFwKCk7XG4gICAgfVxuICAgIHN5bmNEYXRhU291cmNlKHNvdXJjZSwgaWQsIGF1dGhlbnRpY2F0aW9uVG9rZW4sIGNhbmNlbGxhdGlvbikge1xuICAgICAgICB0aGlzLnN5bmNTb3VyY2UoY2FuY2VsbGF0aW9uLCBpZCwgYXV0aGVudGljYXRpb25Ub2tlbiwgc291cmNlLCB0aGlzLnN5bmNoZWREYXRhU291cmNlcywgUmVtb3RlUHJvdG9jb2wuTElTVEVOX0RBVEFTT1VSQ0UsIFJlbW90ZVByb3RvY29sLkNBTkNFTF9EQVRBU09VUkNFKTtcbiAgICB9XG4gICAgc3luY09iamVjdERhdGFTb3VyY2Uoc291cmNlLCBpZCwgYXV0aGVudGljYXRpb25Ub2tlbiwgY2FuY2VsbGF0aW9uKSB7XG4gICAgICAgIHRoaXMuc3luY1NvdXJjZShjYW5jZWxsYXRpb24sIGlkLCBhdXRoZW50aWNhdGlvblRva2VuLCBzb3VyY2UsIHRoaXMuc3luY2hlZE9iamVjdERhdGFTb3VyY2VzLCBSZW1vdGVQcm90b2NvbC5MSVNURU5fT0JKRUNUX0RBVEFTT1VSQ0UsIFJlbW90ZVByb3RvY29sLkNBTkNFTF9PQkpFQ1RfREFUQVNPVVJDRSk7XG4gICAgfVxuICAgIHBlcmZvcm1SUEMoaW5wdXQsIGVuZHBvaW50SWQsIGF1dGhlbnRpY2F0aW9uVG9rZW4sIGNhbmNlbGxhdGlvbikge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdXVpZCA9IE1hdGgucmFuZG9tKCkudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIHBlbmRpbmdSUENSZXNwb25zZXMuc2V0KHV1aWQsIHsgcmVzb2x2ZSwgcmVqZWN0IH0pO1xuICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uLnNlbmQoSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgIHR5cGU6IFJlbW90ZVByb3RvY29sLlBFUkZPUk1fUlBDLFxuICAgICAgICAgICAgICAgIHRva2VuOiBhdXRoZW50aWNhdGlvblRva2VuLFxuICAgICAgICAgICAgICAgIGlkOiBlbmRwb2ludElkLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBpbnB1dCxcbiAgICAgICAgICAgICAgICB1dWlkXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzeW5jU2V0RGF0YVNvdXJjZShzb3VyY2UsIGlkLCBhdXRoZW50aWNhdGlvblRva2VuLCBjYW5jZWxsYXRpb24pIHtcbiAgICAgICAgdGhpcy5zeW5jU291cmNlKGNhbmNlbGxhdGlvbiwgaWQsIGF1dGhlbnRpY2F0aW9uVG9rZW4sIHNvdXJjZSwgdGhpcy5zeW5jaGVkU2V0RGF0YVNvdXJjZXMsIFJlbW90ZVByb3RvY29sLkxJU1RFTl9TRVRfREFUQVNPVVJDRSwgUmVtb3RlUHJvdG9jb2wuQ0FOQ0VMX1NFVF9EQVRBU09VUkNFKTtcbiAgICB9XG4gICAgc3luY01hcERhdGFTb3VyY2Uoc291cmNlLCBpZCwgYXV0aGVudGljYXRpb25Ub2tlbiwgY2FuY2VsbGF0aW9uKSB7XG4gICAgICAgIHRoaXMuc3luY1NvdXJjZShjYW5jZWxsYXRpb24sIGlkLCBhdXRoZW50aWNhdGlvblRva2VuLCBzb3VyY2UsIHRoaXMuc3luY2hlZE1hcERhdGFTb3VyY2VzLCBSZW1vdGVQcm90b2NvbC5MSVNURU5fTUFQX0RBVEFTT1VSQ0UsIFJlbW90ZVByb3RvY29sLkNBTkNFTF9NQVBfREFUQVNPVVJDRSk7XG4gICAgfVxuICAgIHN5bmNBcnJheURhdGFTb3VyY2Uoc291cmNlLCBpZCwgYXV0aGVudGljYXRpb25Ub2tlbiwgY2FuY2VsbGF0aW9uKSB7XG4gICAgICAgIHRoaXMuc3luY1NvdXJjZShjYW5jZWxsYXRpb24sIGlkLCBhdXRoZW50aWNhdGlvblRva2VuLCBzb3VyY2UsIHRoaXMuc3luY2hlZEFycmF5RGF0YVNvdXJjZXMsIFJlbW90ZVByb3RvY29sLkxJU1RFTl9BUlJBWV9EQVRBU09VUkNFLCBSZW1vdGVQcm90b2NvbC5DQU5DRUxfQVJSQVlfREFUQVNPVVJDRSk7XG4gICAgfVxuICAgIHN5bmNEdXBsZXhEYXRhU291cmNlKHNvdXJjZSwgaWQsIGF1dGhlbnRpY2F0aW9uVG9rZW4sIGNhbmNlbGxhdGlvbikge1xuICAgICAgICB0aGlzLnN5bmNTb3VyY2UoY2FuY2VsbGF0aW9uLCBpZCwgYXV0aGVudGljYXRpb25Ub2tlbiwgc291cmNlLCB0aGlzLnN5bmNoZWREdXBsZXhEYXRhU291cmNlcywgUmVtb3RlUHJvdG9jb2wuTElTVEVOX0RVUExFWF9EQVRBU09VUkNFLCBSZW1vdGVQcm90b2NvbC5DQU5DRUxfRFVQTEVYX0RBVEFTT1VSQ0UpO1xuICAgICAgICBzb3VyY2UubGlzdGVuVXBzdHJlYW0oKHYpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvbi5zZW5kKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICB0eXBlOiBSZW1vdGVQcm90b2NvbC5VUERBVEVfRFVQTEVYX0RBVEFTT1VSQ0UsXG4gICAgICAgICAgICAgICAgdG9rZW46IGF1dGhlbnRpY2F0aW9uVG9rZW4sXG4gICAgICAgICAgICAgICAgdmFsdWU6IHYsXG4gICAgICAgICAgICAgICAgaWRcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfSwgQ2FuY2VsbGF0aW9uVG9rZW4uZnJvbU11bHRpcGxlKFtjYW5jZWxsYXRpb24sIHRoaXMubWFzdGVyVG9rZW5dKSk7XG4gICAgfVxuICAgIHN5bmNTb3VyY2UoY2FuY2VsbGF0aW9uLCBpZCwgYXV0aGVudGljYXRpb25Ub2tlbiwgc291cmNlLCBzeW5jZWRTb3VyY2VzLCBsaXN0ZW5NZXNzYWdlLCBjYW5jZWxNZXNzYWdlKSB7XG4gICAgICAgIGNhbmNlbGxhdGlvbi5hZGRDYW5jZWxhYmxlKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGxpc3RlbmVyc0J5QXV0aCA9IHN5bmNlZFNvdXJjZXMuZ2V0KGlkKTtcbiAgICAgICAgICAgIGNvbnN0IGxpc3RlbmVycyA9IGxpc3RlbmVyc0J5QXV0aC5nZXQoYXV0aGVudGljYXRpb25Ub2tlbik7XG4gICAgICAgICAgICBsaXN0ZW5lcnMubGlzdGVuZXJzLnNwbGljZShsaXN0ZW5lcnMubGlzdGVuZXJzLmZpbmRJbmRleCgocykgPT4gcy5zb3VyY2UgPT09IHNvdXJjZSkpO1xuICAgICAgICAgICAgaWYgKGxpc3RlbmVycy5saXN0ZW5lcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgbGlzdGVuZXJzQnlBdXRoLmRlbGV0ZShhdXRoZW50aWNhdGlvblRva2VuKTtcbiAgICAgICAgICAgICAgICBsaXN0ZW5lcnMuc291cmNlLmNhbmNlbEFsbCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvbi5zZW5kKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogY2FuY2VsTWVzc2FnZSxcbiAgICAgICAgICAgICAgICAgICAgaWQsXG4gICAgICAgICAgICAgICAgICAgIHRva2VuOiBhdXRoZW50aWNhdGlvblRva2VuXG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKCFzeW5jZWRTb3VyY2VzLmhhcyhpZCkpIHtcbiAgICAgICAgICAgIHN5bmNlZFNvdXJjZXMuc2V0KGlkLCBuZXcgTWFwKCkpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghc3luY2VkU291cmNlcy5nZXQoaWQpLmhhcyhhdXRoZW50aWNhdGlvblRva2VuKSkge1xuICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uLnNlbmQoSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgIHR5cGU6IGxpc3Rlbk1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgaWQsXG4gICAgICAgICAgICAgICAgdG9rZW46IGF1dGhlbnRpY2F0aW9uVG9rZW5cbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIHN5bmNlZFNvdXJjZXMuZ2V0KGlkKS5zZXQoYXV0aGVudGljYXRpb25Ub2tlbiwgeyBzb3VyY2UsIGxpc3RlbmVyczogW10gfSk7XG4gICAgICAgIH1cbiAgICAgICAgc3luY2VkU291cmNlcy5nZXQoaWQpLmdldChhdXRoZW50aWNhdGlvblRva2VuKS5saXN0ZW5lcnMucHVzaCh7XG4gICAgICAgICAgICBzb3VyY2UsXG4gICAgICAgICAgICB0b2tlbjogY2FuY2VsbGF0aW9uXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzdGF0aWMgY29ubmVjdChob3N0LCBwcm90b2NvbCkge1xuICAgICAgICBsZXQgcGVuZGluZ1Rva2VuID0gbmV3IENhbmNlbGxhdGlvblRva2VuKCk7XG4gICAgICAgIGxldCBzdGFydGVkID0gZmFsc2U7XG4gICAgICAgIGxldCBsYXRlbmN5ID0gWzAsIDAsIDAsIDAsIDBdO1xuICAgICAgICBsZXQgY3ljbGUgPSAwO1xuICAgICAgICBsZXQgbGF0ZW5jeVRzO1xuICAgICAgICBsZXQgbGFzdEJlYXQ7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBwcm90b2NvbCA9IHJlc29sdmVQcm90b2NvbChwcm90b2NvbCk7XG4gICAgICAgICAgICBob3N0ID0gcmVzb2x2ZUhvc3QoaG9zdCk7XG4gICAgICAgICAgICBjb25zdCBjb25uZWN0aW9uID0gbmV3IFdlYlNvY2tldChgJHtwcm90b2NvbH06Ly8ke2hvc3R9YCk7XG4gICAgICAgICAgICBjb25zdCBjbGllbnQgPSBuZXcgQXVydW1TZXJ2ZXJDbGllbnQoY29ubmVjdGlvbik7XG4gICAgICAgICAgICBjbGllbnQubWFzdGVyVG9rZW4uYWRkQ2FuY2VsYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbnMuZGVsZXRlKG1ha2VLZXkocHJvdG9jb2wsIGhvc3QpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcGVuZGluZ1Rva2VuLnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24uY2xvc2UoNDAwMSwgJ25vIHJlc3BvbnNlJyk7XG4gICAgICAgICAgICAgICAgcmVqZWN0KCk7XG4gICAgICAgICAgICAgICAgY2xpZW50Lm1hc3RlclRva2VuLmNhbmNlbCgpO1xuICAgICAgICAgICAgfSwgNTAwMCk7XG4gICAgICAgICAgICBjb25uZWN0aW9uLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCAobSkgPT4ge1xuICAgICAgICAgICAgICAgIGxhc3RCZWF0ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBtc2cgPSBKU09OLnBhcnNlKG0uZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAobXNnLnR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgUmVtb3RlUHJvdG9jb2wuSEVBUlRCRUFUOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhdGVuY3lbY3ljbGVdID0gRGF0ZS5ub3coKSAtIGxhdGVuY3lUcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKGN5Y2xlICsgMSkgJSBsYXRlbmN5Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgQXVydW1TZXJ2ZXIgbGF0ZW5jeTogJHsobGF0ZW5jeS5yZWR1Y2UoKHAsIGMpID0+IHAgKyBjKSAvIGxhdGVuY3kubGVuZ3RoKS50b0ZpeGVkKDEpfW1zYCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN5Y2xlID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN5Y2xlKys7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBSZW1vdGVQcm90b2NvbC5QRVJGT1JNX1JQQ19SRVNVTFRfRVJSOlxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBSZW1vdGVQcm90b2NvbC5QRVJGT1JNX1JQQ19FUlI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVuZGluZ1JQQ1Jlc3BvbnNlcy5nZXQobXNnLnV1aWQpLnJlamVjdChuZXcgRXJyb3IobXNnLmVycm9yKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVuZGluZ1JQQ1Jlc3BvbnNlcy5kZWxldGUobXNnLnV1aWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBSZW1vdGVQcm90b2NvbC5QRVJGT1JNX1JQQ19SRVNVTFQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVuZGluZ1JQQ1Jlc3BvbnNlcy5nZXQobXNnLnV1aWQpLnJlc29sdmUobXNnLnJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVuZGluZ1JQQ1Jlc3BvbnNlcy5kZWxldGUobXNnLnV1aWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBSZW1vdGVQcm90b2NvbC5VUERBVEVfREFUQVNPVVJDRTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2xpZW50LnN5bmNoZWREYXRhU291cmNlcy5oYXMobXNnLmlkKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBieUF1dGggPSBjbGllbnQuc3luY2hlZERhdGFTb3VyY2VzLmdldChtc2cuaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGRzcyBvZiBieUF1dGgudmFsdWVzKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRzcy5zb3VyY2UudXBkYXRlKG1zZy52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFJlbW90ZVByb3RvY29sLlVQREFURV9BUlJBWV9EQVRBU09VUkNFOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjbGllbnQuc3luY2hlZEFycmF5RGF0YVNvdXJjZXMuaGFzKG1zZy5pZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYnlBdXRoID0gY2xpZW50LnN5bmNoZWRBcnJheURhdGFTb3VyY2VzLmdldChtc2cuaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGRzcyBvZiBieUF1dGgudmFsdWVzKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNoYW5nZSA9IG1zZy5jaGFuZ2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkc3Muc291cmNlLmFwcGx5Q29sbGVjdGlvbkNoYW5nZShjaGFuZ2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBSZW1vdGVQcm90b2NvbC5VUERBVEVfRFVQTEVYX0RBVEFTT1VSQ0U6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNsaWVudC5zeW5jaGVkRHVwbGV4RGF0YVNvdXJjZXMuaGFzKG1zZy5pZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYnlBdXRoID0gY2xpZW50LnN5bmNoZWREdXBsZXhEYXRhU291cmNlcy5nZXQobXNnLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBkc3Mgb2YgYnlBdXRoLnZhbHVlcygpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkc3Muc291cmNlLnVwZGF0ZURvd25zdHJlYW0obXNnLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgUmVtb3RlUHJvdG9jb2wuVVBEQVRFX01BUF9EQVRBU09VUkNFOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjbGllbnQuc3luY2hlZE1hcERhdGFTb3VyY2VzLmhhcyhtc2cuaWQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJ5QXV0aCA9IGNsaWVudC5zeW5jaGVkTWFwRGF0YVNvdXJjZXMuZ2V0KG1zZy5pZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgZHNzIG9mIGJ5QXV0aC52YWx1ZXMoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHNzLnNvdXJjZS5hcHBseU1hcENoYW5nZShtc2cuY2hhbmdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ1JlY2lldmVkIG1hbGZvcm1lZCBtZXNzYWdlIGZyb20gc2VydmVyJyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbm5lY3Rpb24uYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNsaWVudC5tYXN0ZXJUb2tlbi5jYW5jZWwoKTtcbiAgICAgICAgICAgICAgICByZWplY3QoZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbm5lY3Rpb24uYWRkRXZlbnRMaXN0ZW5lcignb3BlbicsICgpID0+IHtcbiAgICAgICAgICAgICAgICBwZW5kaW5nVG9rZW4uY2FuY2VsKCk7XG4gICAgICAgICAgICAgICAgcGVuZGluZ1Rva2VuID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIHN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGxhc3RCZWF0ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgICAgICBjbGllbnQubWFzdGVyVG9rZW4uc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoRGF0ZS5ub3coKSAtIGxhc3RCZWF0ID4gMTAwMDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24uY2xvc2UoNDAwMCwgJ3RpbWVvdXQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBsYXRlbmN5VHMgPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLnNlbmQoSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogUmVtb3RlUHJvdG9jb2wuSEVBUlRCRUFUXG4gICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICB9LCAyNTAwKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKGNsaWVudCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbm5lY3Rpb24uYWRkRXZlbnRMaXN0ZW5lcignY2xvc2UnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY2xpZW50Lm1hc3RlclRva2VuLmNhbmNlbCgpO1xuICAgICAgICAgICAgICAgIGlmIChzdGFydGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGVuc3VyZUNvbm5lY3Rpb24obWFrZUtleShwcm90b2NvbCwgaG9zdCksIHByb3RvY29sLCBob3N0KS50aGVuKChuZXdDbGllbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld0NsaWVudC5taWdyYXRlKGNsaWVudCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBtaWdyYXRlKGNsaWVudCkge1xuICAgICAgICBmb3IgKGNvbnN0IGlkIG9mIGNsaWVudC5zeW5jaGVkRGF0YVNvdXJjZXMua2V5cygpKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGF1dGggb2YgY2xpZW50LnN5bmNoZWREYXRhU291cmNlcy5nZXQoaWQpLmtleXMoKSkge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgeyBzb3VyY2UsIHRva2VuIH0gb2YgY2xpZW50LnN5bmNoZWREYXRhU291cmNlcy5nZXQoaWQpLmdldChhdXRoKS5saXN0ZW5lcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zeW5jRGF0YVNvdXJjZShzb3VyY2UsIGlkLCBhdXRoLCB0b2tlbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgaWQgb2YgY2xpZW50LnN5bmNoZWRBcnJheURhdGFTb3VyY2VzLmtleXMoKSkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBhdXRoIG9mIGNsaWVudC5zeW5jaGVkQXJyYXlEYXRhU291cmNlcy5nZXQoaWQpLmtleXMoKSkge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgeyBzb3VyY2UsIHRva2VuIH0gb2YgY2xpZW50LnN5bmNoZWRBcnJheURhdGFTb3VyY2VzLmdldChpZCkuZ2V0KGF1dGgpLmxpc3RlbmVycykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN5bmNBcnJheURhdGFTb3VyY2Uoc291cmNlLCBpZCwgYXV0aCwgdG9rZW4pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IGlkIG9mIGNsaWVudC5zeW5jaGVkRHVwbGV4RGF0YVNvdXJjZXMua2V5cygpKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGF1dGggb2YgY2xpZW50LnN5bmNoZWREdXBsZXhEYXRhU291cmNlcy5nZXQoaWQpLmtleXMoKSkge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgeyBzb3VyY2UsIHRva2VuIH0gb2YgY2xpZW50LnN5bmNoZWREdXBsZXhEYXRhU291cmNlcy5nZXQoaWQpLmdldChhdXRoKS5saXN0ZW5lcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zeW5jRHVwbGV4RGF0YVNvdXJjZShzb3VyY2UsIGlkLCBhdXRoLCB0b2tlbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgaWQgb2YgY2xpZW50LnN5bmNoZWRNYXBEYXRhU291cmNlcy5rZXlzKCkpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgYXV0aCBvZiBjbGllbnQuc3luY2hlZE1hcERhdGFTb3VyY2VzLmdldChpZCkua2V5cygpKSB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCB7IHNvdXJjZSwgdG9rZW4gfSBvZiBjbGllbnQuc3luY2hlZE1hcERhdGFTb3VyY2VzLmdldChpZCkuZ2V0KGF1dGgpLmxpc3RlbmVycykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN5bmNNYXBEYXRhU291cmNlKHNvdXJjZSwgaWQsIGF1dGgsIHRva2VuKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBpZCBvZiBjbGllbnQuc3luY2hlZE9iamVjdERhdGFTb3VyY2VzLmtleXMoKSkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBhdXRoIG9mIGNsaWVudC5zeW5jaGVkT2JqZWN0RGF0YVNvdXJjZXMuZ2V0KGlkKS5rZXlzKCkpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHsgc291cmNlLCB0b2tlbiB9IG9mIGNsaWVudC5zeW5jaGVkT2JqZWN0RGF0YVNvdXJjZXMuZ2V0KGlkKS5nZXQoYXV0aCkubGlzdGVuZXJzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3luY09iamVjdERhdGFTb3VyY2Uoc291cmNlLCBpZCwgYXV0aCwgdG9rZW4pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IGlkIG9mIGNsaWVudC5zeW5jaGVkU2V0RGF0YVNvdXJjZXMua2V5cygpKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGF1dGggb2YgY2xpZW50LnN5bmNoZWRTZXREYXRhU291cmNlcy5nZXQoaWQpLmtleXMoKSkge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgeyBzb3VyY2UsIHRva2VuIH0gb2YgY2xpZW50LnN5bmNoZWRTZXREYXRhU291cmNlcy5nZXQoaWQpLmdldChhdXRoKS5saXN0ZW5lcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zeW5jU2V0RGF0YVNvdXJjZShzb3VyY2UsIGlkLCBhdXRoLCB0b2tlbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3luY2hlZERhdGFTb3VyY2VzID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLnN5bmNoZWREdXBsZXhEYXRhU291cmNlcyA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5zeW5jaGVkQXJyYXlEYXRhU291cmNlcyA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5zeW5jaGVkTWFwRGF0YVNvdXJjZXMgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMuc3luY2hlZE9iamVjdERhdGFTb3VyY2VzID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLnN5bmNoZWRTZXREYXRhU291cmNlcyA9IG5ldyBNYXAoKTtcbiAgICB9XG59XG5mdW5jdGlvbiByZXNvbHZlUHJvdG9jb2wocHJvdG9jb2wpIHtcbiAgICBpZiAoIXByb3RvY29sKSB7XG4gICAgICAgIGlmICh0eXBlb2YgbG9jYXRpb24gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Byb3RvY29sIGlzIG5vdCBvcHRpb25hbCBpbiBub24gYnJvd3NlciBlbnZpcm9ubWVudHMnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobG9jYXRpb24ucHJvdG9jb2wuc3RhcnRzV2l0aCgnaHR0cHMnKSkge1xuICAgICAgICAgICAgcHJvdG9jb2wgPSAnd3NzJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHByb3RvY29sID0gJ3dzJztcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcHJvdG9jb2w7XG59XG5mdW5jdGlvbiByZXNvbHZlSG9zdChob3N0KSB7XG4gICAgaWYgKCFob3N0KSB7XG4gICAgICAgIGlmICh0eXBlb2YgbG9jYXRpb24gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0hvc3QgaXMgbm90IG9wdGlvbmFsIGluIG5vbiBicm93c2VyIGVudmlyb25tZW50cycpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBsb2NhdGlvbi5ob3N0O1xuICAgIH1cbiAgICByZXR1cm4gaG9zdDtcbn1cbmFzeW5jIGZ1bmN0aW9uIGVuc3VyZUNvbm5lY3Rpb24oa2V5LCBwcm90b2NvbCwgaG9zdCkge1xuICAgIGlmIChjb25uZWN0aW9ucy5oYXMoa2V5KSkge1xuICAgICAgICByZXR1cm4gY29ubmVjdGlvbnMuZ2V0KGtleSk7XG4gICAgfVxuICAgIGxldCBiYWNrb2ZmID0gMTAwMDtcbiAgICBpZiAocGVuZGluZ0Nvbm5lY3Rpb25zLmhhcyhrZXkpKSB7XG4gICAgICAgIHJldHVybiBwZW5kaW5nQ29ubmVjdGlvbnMuZ2V0KGtleSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBjb25zdCBwZW5kaW5nQ29ubmVjdGlvbiA9IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICBhc3luYyBmdW5jdGlvbiB0cnlDb25uZWN0KCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHAgPSBBdXJ1bVNlcnZlckNsaWVudC5jb25uZWN0KGhvc3QsIHByb3RvY29sKTtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjbGllbnQgPSBhd2FpdCBwO1xuICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9ucy5zZXQoa2V5LCBjbGllbnQpO1xuICAgICAgICAgICAgICAgICAgICBwZW5kaW5nQ29ubmVjdGlvbnMuZGVsZXRlKGtleSk7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoY2xpZW50KTtcbiAgICAgICAgICAgICAgICAgICAgYmFja29mZiA9IDEwMDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgYmFja29mZiArPSAxMDAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5Q29ubmVjdCgpO1xuICAgICAgICAgICAgICAgICAgICB9LCBiYWNrb2ZmKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0cnlDb25uZWN0KCk7XG4gICAgICAgIH0pO1xuICAgICAgICBwZW5kaW5nQ29ubmVjdGlvbnMuc2V0KGtleSwgcGVuZGluZ0Nvbm5lY3Rpb24pO1xuICAgICAgICByZXR1cm4gcGVuZGluZ0Nvbm5lY3Rpb247XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXVydW1fc2VydmVyX2NsaWVudC5qcy5tYXAiLCJleHBvcnQgKiBmcm9tICcuL3JlbmRlcmluZy93ZWJjb21wb25lbnQuanMnO1xuZXhwb3J0IHsgU2luZ3VsYXJBdXJ1bUVsZW1lbnQsIEFycmF5QXVydW1FbGVtZW50LCBjcmVhdGVBUEksIGNyZWF0ZUxpZmVDeWNsZSwgY3JlYXRlUmVuZGVyU2Vzc2lvbiwgQXVydW1FbGVtZW50LCBhdXJ1bUVsZW1lbnRNb2RlbElkZW50aXRpeSB9IGZyb20gJy4vcmVuZGVyaW5nL2F1cnVtX2VsZW1lbnQuanMnO1xuZXhwb3J0IHsgYXVydW1Ub0hUTUwgfSBmcm9tICcuL2J1aWx0aW5fY29tcG9uZW50cy9kb21fYWRhcHRlci5qcyc7XG5leHBvcnQgeyBhdXJ1bVRvU3RyaW5nIH0gZnJvbSAnLi9ub2Rlcy9zdHJpbmdfYWRhcHRlci5qcyc7XG5leHBvcnQgeyBhdXJ1bVRvVkRPTSwgVkRPTSB9IGZyb20gJy4vbm9kZXMvdmRvbV9hZGFwdGVyLmpzJztcbmV4cG9ydCAqIGZyb20gJy4vYnVpbHRpbl9jb21wb25lbnRzL3JvdXRlci5qcyc7XG5leHBvcnQgKiBmcm9tICcuL2J1aWx0aW5fY29tcG9uZW50cy9zdXNwZW5zZS5qcyc7XG5leHBvcnQgKiBmcm9tICcuL2J1aWx0aW5fY29tcG9uZW50cy9lcnJvcl9ib3VuZGFyeS5qcyc7XG5leHBvcnQgKiBmcm9tICcuL2J1aWx0aW5fY29tcG9uZW50cy9zd2l0Y2guanMnO1xuZXhwb3J0ICogZnJvbSAnLi9zdHJlYW0vZGF0YV9zb3VyY2UuanMnO1xuZXhwb3J0ICogZnJvbSAnLi9zdHJlYW0vZHVwbGV4X2RhdGFfc291cmNlLmpzJztcbmV4cG9ydCAqIGZyb20gJy4vc3RyZWFtL29iamVjdF9kYXRhX3NvdXJjZS5qcyc7XG5leHBvcnQgKiBmcm9tICcuL3N0cmVhbS90cmVlX2RhdGFfc291cmNlLmpzJztcbmV4cG9ydCAqIGZyb20gJy4vc3RyZWFtL2RhdGFfc291cmNlX29wZXJhdG9ycy5qcyc7XG5leHBvcnQgKiBmcm9tICcuL3N0cmVhbS9kdXBsZXhfZGF0YV9zb3VyY2Vfb3BlcmF0b3JzLmpzJztcbmV4cG9ydCAqIGZyb20gJy4vc3RyZWFtL29wZXJhdG9yX21vZGVsLmpzJztcbmV4cG9ydCAqIGZyb20gJy4vc3RyZWFtL3N0cmVhbS5qcyc7XG5leHBvcnQgKiBmcm9tICcuL3N0cmVhbS9lbWl0dGVycy5qcyc7XG5leHBvcnQgKiBmcm9tICcuL3V0aWxpdGllcy9hdXJ1bS5qcyc7XG5leHBvcnQgKiBmcm9tICcuL3V0aWxpdGllcy9jYW5jZWxsYXRpb25fdG9rZW4uanMnO1xuZXhwb3J0ICogZnJvbSAnLi91dGlsaXRpZXMvZXZlbnRfZW1pdHRlci5qcyc7XG5leHBvcnQgKiBmcm9tICcuL3V0aWxpdGllcy9jbGFzc25hbWUuanMnO1xuZXhwb3J0ICogZnJvbSAnLi91dGlsaXRpZXMvc291cmNlcy5qcyc7XG5leHBvcnQgKiBmcm9tICcuL3V0aWxpdGllcy90cmFuc2NsdXNpb24uanMnO1xuZXhwb3J0ICogZnJvbSAnLi91dGlsaXRpZXMvc3RvcmFnZV9zdHJlYW0uanMnO1xuZXhwb3J0ICogZnJvbSAnLi91dGlsaXRpZXMvdXJsX3N0b3JhZ2UuanMnO1xuZXhwb3J0ICogZnJvbSAnLi91dGlsaXRpZXMvaXRlcmF0aW9uLmpzJztcbmV4cG9ydCB7IGRlYnVnTW9kZSwgZW5hYmxlRGVidWdNb2RlLCBlbmFibGVEaWFnbm9zdGljTW9kZSB9IGZyb20gJy4vZGVidWdfbW9kZS5qcyc7XG5leHBvcnQgeyBSZW1vdGVQcm90b2NvbCwgZ2V0UmVtb3RlRnVuY3Rpb24gfSBmcm9tICcuL2F1cnVtX3NlcnZlci9hdXJ1bV9zZXJ2ZXJfY2xpZW50LmpzJztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWF1cnVtanMuanMubWFwIiwiaW1wb3J0IHsgaGFuZGxlQ2xhc3MsIGhhbmRsZVN0eWxlIH0gZnJvbSAnLi4vbm9kZXMvcmVuZGVyaW5nX2hlbHBlcnMuanMnO1xuaW1wb3J0IHsgQXVydW1FbGVtZW50LCBjcmVhdGVSZW5kZXJTZXNzaW9uLCByZW5kZXJJbnRlcm5hbCB9IGZyb20gJy4uL3JlbmRlcmluZy9hdXJ1bV9lbGVtZW50LmpzJztcbmltcG9ydCB7IERhdGFTb3VyY2UgfSBmcm9tICcuLi9zdHJlYW0vZGF0YV9zb3VyY2UuanMnO1xuaW1wb3J0IHsgZHNVbmlxdWUgfSBmcm9tICcuLi9zdHJlYW0vZGF0YV9zb3VyY2Vfb3BlcmF0b3JzLmpzJztcbmltcG9ydCB7IER1cGxleERhdGFTb3VyY2UgfSBmcm9tICcuLi9zdHJlYW0vZHVwbGV4X2RhdGFfc291cmNlLmpzJztcbi8qKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydCBjb25zdCBkZWZhdWx0RXZlbnRzID0ge1xuICAgIGRyYWc6ICdvbkRyYWcnLFxuICAgIGRyYWdzdGFydDogJ29uRHJhZ1N0YXJ0JyxcbiAgICBkcmFnZW5kOiAnb25EcmFnRW5kJyxcbiAgICBkcmFnZXhpdDogJ29uRHJhZ0V4aXQnLFxuICAgIGRyYWdvdmVyOiAnb25EcmFnT3ZlcicsXG4gICAgZHJhZ2VudGVyOiAnb25EcmFnRW50ZXInLFxuICAgIGRyYWdsZWF2ZTogJ29uRHJhZ0xlYXZlJyxcbiAgICBkcm9wOiAnb25Ecm9wJyxcbiAgICBibHVyOiAnb25CbHVyJyxcbiAgICBmb2N1czogJ29uRm9jdXMnLFxuICAgIGNsaWNrOiAnb25DbGljaycsXG4gICAgZGJsY2xpY2s6ICdvbkRibENsaWNrJyxcbiAgICBrZXlkb3duOiAnb25LZXlEb3duJyxcbiAgICBrZXloaXQ6ICdvbktleUhpdCcsXG4gICAga2V5dXA6ICdvbktleVVwJyxcbiAgICBjb250ZXh0bWVudTogJ29uQ29udGV4dE1lbnUnLFxuICAgIG1vdXNlZG93bjogJ29uTW91c2VEb3duJyxcbiAgICBtb3VzZXVwOiAnb25Nb3VzZVVwJyxcbiAgICBtb3VzZW1vdmU6ICdvbk1vdXNlTW92ZScsXG4gICAgbW91c2VlbnRlcjogJ29uTW91c2VFbnRlcicsXG4gICAgbW91c2VsZWF2ZTogJ29uTW91c2VMZWF2ZScsXG4gICAgbW91c2V3aGVlbDogJ29uTW91c2VXaGVlbCcsXG4gICAgbG9hZDogJ29uTG9hZCcsXG4gICAgZXJyb3I6ICdvbkVycm9yJ1xufTtcbi8qKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydCBjb25zdCBkZWZhdWx0QXR0cmlidXRlcyA9IFsnaWQnLCAnbmFtZScsICdkcmFnZ2FibGUnLCAndGFiaW5kZXgnLCAncm9sZScsICdjb250ZW50ZWRpdGFibGUnLCAnc2xvdCcsICd0aXRsZSddO1xuZXhwb3J0IGZ1bmN0aW9uIERvbU5vZGVDcmVhdG9yKG5vZGVOYW1lLCBleHRyYUF0dHJpYnV0ZXMsIGV4dHJhRXZlbnRzLCBleHRyYUxvZ2ljLCBzdmcgPSBmYWxzZSkge1xuICAgIHJldHVybiBmdW5jdGlvbiAocHJvcHMsIGNoaWxkcmVuLCBhcGkpIHtcbiAgICAgICAgbGV0IG5vZGU7XG4gICAgICAgIGlmIChzdmcpIHtcbiAgICAgICAgICAgIG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgbm9kZU5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobm9kZU5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wcykge1xuICAgICAgICAgICAgcHJvY2Vzc0hUTUxOb2RlKG5vZGUsIHByb3BzLCBhcGkuY2FuY2VsbGF0aW9uVG9rZW4sIGV4dHJhQXR0cmlidXRlcywgZXh0cmFFdmVudHMpO1xuICAgICAgICB9XG4gICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICBjb25zdCByZW5kZXJlZENoaWxkcmVuID0gcmVuZGVySW50ZXJuYWwoY2hpbGRyZW4sIGFwaS5yZW5kZXJTZXNzaW9uKTtcbiAgICAgICAgY29ubmVjdENoaWxkcmVuKG5vZGUsIHJlbmRlcmVkQ2hpbGRyZW4pO1xuICAgICAgICBpZiAocHJvcHMpIHtcbiAgICAgICAgICAgIGlmIChwcm9wcy5vbkF0dGFjaCkge1xuICAgICAgICAgICAgICAgIGFwaS5vbkF0dGFjaCgoKSA9PiBwcm9wcy5vbkF0dGFjaChub2RlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocHJvcHMub25EZXRhY2gpIHtcbiAgICAgICAgICAgICAgICBhcGkub25EZXRhY2goKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAobm9kZS5pc0Nvbm5lY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKG5vZGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHByb3BzLm9uRGV0YWNoKG5vZGUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGV4dHJhTG9naWM/Lihub2RlLCBwcm9wcywgYXBpLmNhbmNlbGxhdGlvblRva2VuKTtcbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfTtcbn1cbmZ1bmN0aW9uIGNvbm5lY3RDaGlsZHJlbih0YXJnZXQsIGNoaWxkcmVuKSB7XG4gICAgaWYgKGNoaWxkcmVuID09PSB1bmRlZmluZWQgfHwgY2hpbGRyZW4gPT09IG51bGwgfHwgY2hpbGRyZW4ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZm9yIChjb25zdCBjaGlsZCBvZiBjaGlsZHJlbikge1xuICAgICAgICBpZiAoIWNoaWxkKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBUZXh0IHx8IGNoaWxkIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgfHwgY2hpbGQgaW5zdGFuY2VvZiBTVkdFbGVtZW50KSB7XG4gICAgICAgICAgICB0YXJnZXQuYXBwZW5kQ2hpbGQoY2hpbGQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNoaWxkIGluc3RhbmNlb2YgQXVydW1FbGVtZW50KSB7XG4gICAgICAgICAgICBjaGlsZC5hdHRhY2hUb0RvbSh0YXJnZXQsIHRhcmdldC5jaGlsZE5vZGVzLmxlbmd0aCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGNoaWxkID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmV4cGVjdGVkIGNoaWxkIHR5cGUgcGFzc2VkIHRvIERPTSBOb2RlOiBmdW5jdGlvbi4gRGlkIHlvdSBtZWFuIHRvIHVzZSBhIGNvbXBvbmVudD8gVG8gdXNlIGEgY29tcG9uZW50IHVzZSBKU1ggc3ludGF4IHN1Y2ggYXMgPE15Q29tcG9uZW50Lz4gaXQgd29ya3MgZXZlbiB3aXRoIGZ1bmN0aW9uIHJlZmVyZW5jZXMuIDxwcm9wcy5teVJlZmVyZW5jZS8+Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuZXhwZWN0ZWQgY2hpbGQgdHlwZSBwYXNzZWQgdG8gRE9NIE5vZGU6ICR7Y2hpbGRyZW59YCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gcHJvY2Vzc0hUTUxOb2RlKG5vZGUsIHByb3BzLCBjbGVhblVwLCBleHRyYUF0dHJpYnV0ZXMsIGV4dHJhRXZlbnRzKSB7XG4gICAgY3JlYXRlRXZlbnRIYW5kbGVycyhub2RlLCBkZWZhdWx0RXZlbnRzLCBwcm9wcyk7XG4gICAgaWYgKGV4dHJhRXZlbnRzKSB7XG4gICAgICAgIGNyZWF0ZUV2ZW50SGFuZGxlcnMobm9kZSwgZXh0cmFFdmVudHMsIHByb3BzKTtcbiAgICB9XG4gICAgY29uc3QgZGF0YVByb3BzID0gT2JqZWN0LmtleXMocHJvcHMpLmZpbHRlcigoZSkgPT4gZS5pbmNsdWRlcygnLScpKTtcbiAgICBiaW5kUHJvcHMobm9kZSwgZGVmYXVsdEF0dHJpYnV0ZXMsIHByb3BzLCBjbGVhblVwLCBkYXRhUHJvcHMpO1xuICAgIGlmIChleHRyYUF0dHJpYnV0ZXMpIHtcbiAgICAgICAgYmluZFByb3BzKG5vZGUsIGV4dHJhQXR0cmlidXRlcywgcHJvcHMsIGNsZWFuVXApO1xuICAgIH1cbiAgICBpZiAocHJvcHMuc3R5bGUpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gaGFuZGxlU3R5bGUocHJvcHMuc3R5bGUsIGNsZWFuVXApO1xuICAgICAgICBpZiAocmVzdWx0IGluc3RhbmNlb2YgRGF0YVNvdXJjZSkge1xuICAgICAgICAgICAgcmVzdWx0Lmxpc3RlbkFuZFJlcGVhdCgodikgPT4ge1xuICAgICAgICAgICAgICAgIG5vZGUuc2V0QXR0cmlidXRlKCdzdHlsZScsIHYpO1xuICAgICAgICAgICAgfSwgY2xlYW5VcCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBub2RlLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCByZXN1bHQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChwcm9wcy5jbGFzcykge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBoYW5kbGVDbGFzcyhwcm9wcy5jbGFzcywgY2xlYW5VcCk7XG4gICAgICAgIGlmIChyZXN1bHQgaW5zdGFuY2VvZiBEYXRhU291cmNlKSB7XG4gICAgICAgICAgICByZXN1bHQubGlzdGVuQW5kUmVwZWF0KCh2KSA9PiB7XG4gICAgICAgICAgICAgICAgbm9kZS5jbGFzc05hbWUgPSB2O1xuICAgICAgICAgICAgfSwgY2xlYW5VcCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBub2RlLmNsYXNzTmFtZSA9IHJlc3VsdDtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVFdmVudEhhbmRsZXJzKG5vZGUsIGV2ZW50cywgcHJvcHMpIHtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBldmVudHMpIHtcbiAgICAgICAgaWYgKHByb3BzW2V2ZW50c1trZXldXSkge1xuICAgICAgICAgICAgaWYgKHByb3BzW2V2ZW50c1trZXldXSBpbnN0YW5jZW9mIERhdGFTb3VyY2UpIHtcbiAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoa2V5LCAoZSkgPT4gcHJvcHNbZXZlbnRzW2tleV1dLnVwZGF0ZShlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChwcm9wc1tldmVudHNba2V5XV0gaW5zdGFuY2VvZiBEdXBsZXhEYXRhU291cmNlKSB7XG4gICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKGtleSwgKGUpID0+IHByb3BzW2V2ZW50c1trZXldXS51cGRhdGVEb3duc3RyZWFtKGUpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiBwcm9wc1tldmVudHNba2V5XV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoa2V5LCAoZSkgPT4gcHJvcHNbZXZlbnRzW2tleV1dKGUpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbmZ1bmN0aW9uIGJpbmRQcm9wcyhub2RlLCBrZXlzLCBwcm9wcywgY2xlYW5VcCwgZHluYW1pY1Byb3BzKSB7XG4gICAgZm9yIChjb25zdCBrZXkgb2Yga2V5cykge1xuICAgICAgICBpZiAocHJvcHNba2V5XSkge1xuICAgICAgICAgICAgYXNzaWduU3RyaW5nU291cmNlVG9BdHRyaWJ1dGUobm9kZSwgcHJvcHNba2V5XSwga2V5LCBjbGVhblVwKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoZHluYW1pY1Byb3BzKSB7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IG9mIGR5bmFtaWNQcm9wcykge1xuICAgICAgICAgICAgaWYgKHByb3BzW2tleV0pIHtcbiAgICAgICAgICAgICAgICBhc3NpZ25TdHJpbmdTb3VyY2VUb0F0dHJpYnV0ZShub2RlLCBwcm9wc1trZXldLCBrZXksIGNsZWFuVXApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuLyoqXG4gKiBSZW5kZXJzIEF1cnVtIGNvbnRlbnQgc3luY2hyb25vdXNseSBpbiBsaW5lLiBJbiBjYXNlIG5vIGxpZmVjeWNsZSBzeW5jIG9iamVjdCBpcyBwcm92aWRlZCB5b3UgaGF2ZSB0byBtYW51YWxseSBjYWxsIGZpcmVPbkF0dGFjaCBhbmQgZGlzcG9zZSBhdCB0aGUgYXBwcm9wcmlhdGUgdGltZXMgdG8gZW5zdXJlIHByb3BlciBsaWZlY3ljbGUgaGFuZGxpbmcgc3VjaCBhcyBhdHRhY2ggYW5kIGRldGFjaCBldmVudHNcbiAqIEBwYXJhbSBjb250ZW50IENvbnRlbnQgdG8gcmVuZGVyXG4gKiBAcGFyYW0gc3luY0xpZmVjeWNsZSBPcHRpb25hbCBsaWZlY3ljbGUgc3luYyBvYmplY3QuIElmIHByb3ZpZGVkIHRoZSBsaWZlY3ljbGUgb2YgdGhlIHJlbmRlcmVkIGNvbnRlbnQgd2lsbCBiZSBzeW5jaHJvbml6ZWQgd2l0aCB0aGUgcHJvdmlkZWQgbGlmZWN5Y2xlIChtZWFuaW5nIGF0dGFjaCBhbmQgZGV0YWNoIGV2ZW50cyB3aWxsIGJlIGZpcmVkIHdoZW4gdGhlIGxpZmVjeWNsZSBmaXJlcyB0aGVtKVxuICovXG5leHBvcnQgZnVuY3Rpb24gYXVydW1Ub0hUTUwoY29udGVudCwgc3luY0xpZmVjeWNsZSkge1xuICAgIGNvbnN0IHJzID0gY3JlYXRlUmVuZGVyU2Vzc2lvbigpO1xuICAgIGNvbnN0IHJlbmRlcmVkQ29udGVudCA9IHJlbmRlckludGVybmFsKGNvbnRlbnQsIHJzKTtcbiAgICBpZiAoc3luY0xpZmVjeWNsZSkge1xuICAgICAgICBzeW5jTGlmZWN5Y2xlLm9uQXR0YWNoKCgpID0+IHJzLmF0dGFjaENhbGxzLmZvckVhY2goKGMpID0+IGMoKSkpO1xuICAgICAgICBzeW5jTGlmZWN5Y2xlLm9uRGV0YWNoKCgpID0+IHJzLnNlc3Npb25Ub2tlbi5jYW5jZWwoKSk7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIGNvbnRlbnQ6IHJlbmRlcmVkQ29udGVudCxcbiAgICAgICAgZmlyZU9uQXR0YWNoOiAoKSA9PiBycy5hdHRhY2hDYWxscy5mb3JFYWNoKChjKSA9PiBjKCkpLFxuICAgICAgICBkaXNwb3NlOiAoKSA9PiBycy5zZXNzaW9uVG9rZW4uY2FuY2VsKClcbiAgICB9O1xufVxuZnVuY3Rpb24gYXNzaWduU3RyaW5nU291cmNlVG9BdHRyaWJ1dGUobm9kZSwgZGF0YSwga2V5LCBjbGVhblVwKSB7XG4gICAgaWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xuICAgICAgICBub2RlLnNldEF0dHJpYnV0ZShrZXksIGRhdGEpO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgZGF0YSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICBub2RlLnNldEF0dHJpYnV0ZShrZXksICcnKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChkYXRhIGluc3RhbmNlb2YgRGF0YVNvdXJjZSB8fCBkYXRhIGluc3RhbmNlb2YgRHVwbGV4RGF0YVNvdXJjZSkge1xuICAgICAgICBpZiAodHlwZW9mIGRhdGEudmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBub2RlLnNldEF0dHJpYnV0ZShrZXksIGRhdGEudmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBkYXRhLnZhbHVlID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgIGlmIChkYXRhLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUoa2V5LCAnJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZGF0YS50cmFuc2Zvcm0oZHNVbmlxdWUoKSwgY2xlYW5VcCkubGlzdGVuKCh2KSA9PiB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHYgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUoa2V5LCB2KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiB2ID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgICAgICBpZiAodikge1xuICAgICAgICAgICAgICAgICAgICBub2RlLnNldEF0dHJpYnV0ZShrZXksICcnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUucmVtb3ZlQXR0cmlidXRlKGtleSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQXR0cmlidXRlcyBvbmx5IHN1cHBvcnQgdHlwZXMgYm9vbGVhbiwgc3RyaW5nLCBudW1iZXIgYW5kIGRhdGEgc291cmNlcycpO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRvbV9hZGFwdGVyLmpzLm1hcCIsImltcG9ydCB7IGNyZWF0ZUxpZmVDeWNsZSB9IGZyb20gJy4uL3JlbmRlcmluZy9hdXJ1bV9lbGVtZW50LmpzJztcbmltcG9ydCB7IERhdGFTb3VyY2UgfSBmcm9tICcuLi9zdHJlYW0vZGF0YV9zb3VyY2UuanMnO1xuZXhwb3J0IGZ1bmN0aW9uIEVycm9yQm91bmRhcnkocHJvcHMsIGNoaWxkcmVuLCBhcGkpIHtcbiAgICBjb25zdCBkYXRhID0gbmV3IERhdGFTb3VyY2UocHJvcHM/LnN1c3BlbnNlRmFsbGJhY2spO1xuICAgIGNvbnN0IHJlbmRlckZhbGxiYWNrRXJyb3IgPSB0eXBlb2YgcHJvcHM/LmVycm9yRmFsbGJhY2sgPT09ICdmdW5jdGlvbicgPyBwcm9wcy5lcnJvckZhbGxiYWNrIDogKGVycm9yKSA9PiBwcm9wcz8uZXJyb3JGYWxsYmFjaztcbiAgICBjb25zdCBsYyA9IGNyZWF0ZUxpZmVDeWNsZSgpO1xuICAgIGFwaS5vbkRldGFjaCgoKSA9PiBsYy5vbkRldGFjaCgpKTtcbiAgICBmdW5jdGlvbiBvbkRvbmUocmVzKSB7XG4gICAgICAgIGlmICghYXBpLmNhbmNlbGxhdGlvblRva2VuLmlzQ2FuY2VsZWQpIHtcbiAgICAgICAgICAgIGRhdGEudXBkYXRlKHJlcyk7XG4gICAgICAgICAgICBsYy5vbkF0dGFjaCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIG9uRXJyb3IoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgIGlmICghYXBpLmNhbmNlbGxhdGlvblRva2VuLmlzQ2FuY2VsZWQpIHtcbiAgICAgICAgICAgIGRhdGEudXBkYXRlKHJlbmRlckZhbGxiYWNrRXJyb3IoZXJyb3IpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyBmdW5jdGlvbiBoYW5kbGVSZW5kZXJlZENoaWxkcmVuKHJlcykge1xuICAgICAgICBpZiAocmVzIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICAgICAgcmVzLnRoZW4oaGFuZGxlUmVuZGVyZWRDaGlsZHJlbiwgb25FcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBuZXN0ZWRSZW5kZXJlZCA9IGFwaS5wcmVyZW5kZXIocmVzLCBsYyk7XG4gICAgICAgICAgICBpZiAobmVzdGVkUmVuZGVyZWQuc29tZSgocykgPT4gcyBpbnN0YW5jZW9mIFByb21pc2UpKSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwobmVzdGVkUmVuZGVyZWQpLnRoZW4oaGFuZGxlUmVuZGVyZWRDaGlsZHJlbiwgb25FcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBvbkRvbmUobmVzdGVkUmVuZGVyZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGFzeW5jIGZ1bmN0aW9uIHJlbmRlckNoaWxkcmVuKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcmVuZGVyZWQgPSBhcGkucHJlcmVuZGVyKGNoaWxkcmVuLCBsYyk7XG4gICAgICAgICAgICBhd2FpdCBoYW5kbGVSZW5kZXJlZENoaWxkcmVuKHJlbmRlcmVkKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIG9uRXJyb3IoZXJyb3IpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlbmRlckNoaWxkcmVuKCk7XG4gICAgcmV0dXJuIGRhdGE7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1lcnJvcl9ib3VuZGFyeS5qcy5tYXAiLCJpbXBvcnQgeyBEYXRhU291cmNlIH0gZnJvbSAnLi4vc3RyZWFtL2RhdGFfc291cmNlLmpzJztcbmltcG9ydCB7IGRzRGlmZiwgZHNNYXAsIGRzVGFwLCBkc1VuaXF1ZSB9IGZyb20gJy4uL3N0cmVhbS9kYXRhX3NvdXJjZV9vcGVyYXRvcnMuanMnO1xuaW1wb3J0IHsgdXJsSGFzaEVtaXR0ZXIgfSBmcm9tICcuLi9zdHJlYW0vZW1pdHRlcnMuanMnO1xuaW1wb3J0IHsgcmVzb2x2ZUNoaWxkcmVuIH0gZnJvbSAnLi4vdXRpbGl0aWVzL3RyYW5zY2x1c2lvbi5qcyc7XG5leHBvcnQgZnVuY3Rpb24gQXVydW1Sb3V0ZXIocHJvcHMsIGNoaWxkcmVuLCBhcGkpIHtcbiAgICBjb25zdCByZXNvbHZlZENoaWxkcmVuID0gcmVzb2x2ZUNoaWxkcmVuKGNoaWxkcmVuLCBhcGkuY2FuY2VsbGF0aW9uVG9rZW4sIChjKSA9PiB7XG4gICAgICAgIGlmIChjLmZhY3RvcnkgIT09IFJvdXRlICYmIGMuZmFjdG9yeSAhPT0gRGVmYXVsdFJvdXRlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0F1cnVtIFJvdXRlciBvbmx5IGFjY2VwdHMgUm91dGUgYW5kIERlZmF1bHRSb3V0ZSBpbnN0YW5jZXMgYXMgY2hpbGRyZW4nKTtcbiAgICAgICAgfVxuICAgIH0pLmZpbHRlcihCb29sZWFuKTtcbiAgICByZXNvbHZlZENoaWxkcmVuXG4gICAgICAgIC5yZWR1Y2UoKGFjYywgYykgPT4ge1xuICAgICAgICBpZiAoYy5mYWN0b3J5ID09PSBEZWZhdWx0Um91dGUpIHtcbiAgICAgICAgICAgIHJldHVybiBhY2MgKyAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgfVxuICAgIH0sIDAsIGFwaS5jYW5jZWxsYXRpb25Ub2tlbilcbiAgICAgICAgLmxpc3RlbkFuZFJlcGVhdCgoY291bnQpID0+IHtcbiAgICAgICAgaWYgKGNvdW50ID4gMSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBUb28gbWFueSBkZWZhdWx0IHJvdXRlcyBvbmx5IDAgb3IgMSBhbGxvd2VkLiBGb3VuZCAke2NvdW50fWApO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgY29uc3QgdXJsRGF0YVNvdXJjZSA9IG5ldyBEYXRhU291cmNlKCk7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHVybEhhc2hFbWl0dGVyKHVybERhdGFTb3VyY2UsIHRydWUsIGFwaS5jYW5jZWxsYXRpb25Ub2tlbik7XG4gICAgfVxuICAgIGNvbnN0IGFjdGl2ZVJvdXRlID0gbmV3IERhdGFTb3VyY2UoKTtcbiAgICBhY3RpdmVSb3V0ZS50cmFuc2Zvcm0oZHNVbmlxdWUoKSwgZHNEaWZmKCksIGRzVGFwKCh7IG5ld1ZhbHVlLCBvbGRWYWx1ZSB9KSA9PiB7XG4gICAgICAgIGlmIChvbGRWYWx1ZSkge1xuICAgICAgICAgICAgb2xkVmFsdWUucHJvcHM/Lm9uTmF2aWdhdGVGcm9tPy4oKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmV3VmFsdWUpIHtcbiAgICAgICAgICAgIG5ld1ZhbHVlLnByb3BzPy5vbk5hdmlnYXRlVG8/LigpO1xuICAgICAgICB9XG4gICAgfSkpO1xuICAgIHJldHVybiB1cmxEYXRhU291cmNlXG4gICAgICAgIC50cmFuc2Zvcm0oZHNVbmlxdWUoKSwgYXBpLmNhbmNlbGxhdGlvblRva2VuKVxuICAgICAgICAud2l0aEluaXRpYWwodXJsRGF0YVNvdXJjZS52YWx1ZSlcbiAgICAgICAgLnRyYW5zZm9ybShkc01hcCgocCkgPT4gc2VsZWN0Um91dGUocCwgcmVzb2x2ZWRDaGlsZHJlbiwgYWN0aXZlUm91dGUpKSk7XG59XG5mdW5jdGlvbiBzZWxlY3RSb3V0ZSh1cmwsIHJvdXRlcywgYWN0aXZlUm91dGUpIHtcbiAgICBsZXQgc2VsZWN0ZWQ7XG4gICAgaWYgKHVybCA9PT0gdW5kZWZpbmVkIHx8IHVybCA9PT0gbnVsbCkge1xuICAgICAgICBzZWxlY3RlZCA9IHJvdXRlcy5maW5kKChyKSA9PiByLmZhY3RvcnkgPT09IERlZmF1bHRSb3V0ZSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBpZiAocm91dGVzLmZpbmQoKHIpID0+IHIucHJvcHM/LmhyZWYgPT09IHVybCkpIHtcbiAgICAgICAgICAgIHNlbGVjdGVkID0gcm91dGVzLmZpbmQoKHIpID0+IHIucHJvcHM/LmhyZWYgPT09IHVybCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBzZWdtZW50cyA9IHVybC5zcGxpdCgnLycpO1xuICAgICAgICAgICAgc2VnbWVudHMucG9wKCk7XG4gICAgICAgICAgICB3aGlsZSAoc2VnbWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcGF0aCA9IHNlZ21lbnRzLmpvaW4oJy8nKTtcbiAgICAgICAgICAgICAgICBpZiAocm91dGVzLmZpbmQoKHIpID0+IHIucHJvcHM/LmhyZWYgPT09IHBhdGgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkID0gcm91dGVzLmZpbmQoKHIpID0+IHIucHJvcHM/LmhyZWYgPT09IHBhdGgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2VnbWVudHMucG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQgPSByb3V0ZXMuZmluZCgocikgPT4gci5mYWN0b3J5ID09PSBEZWZhdWx0Um91dGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChzZWxlY3RlZCkge1xuICAgICAgICBhY3RpdmVSb3V0ZS51cGRhdGUoc2VsZWN0ZWQpO1xuICAgICAgICByZXR1cm4gc2VsZWN0ZWQuY2hpbGRyZW47XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBhY3RpdmVSb3V0ZS51cGRhdGUodW5kZWZpbmVkKTtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gUm91dGUocHJvcHMsIGNoaWxkcmVuKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBEZWZhdWx0Um91dGUocHJvcHMsIGNoaWxkcmVuKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJvdXRlci5qcy5tYXAiLCJpbXBvcnQgeyBBdXJ1bSB9IGZyb20gJy4uL3V0aWxpdGllcy9hdXJ1bS5qcyc7XG5pbXBvcnQgeyBFcnJvckJvdW5kYXJ5IH0gZnJvbSAnLi9lcnJvcl9ib3VuZGFyeS5qcyc7XG5leHBvcnQgZnVuY3Rpb24gU3VzcGVuc2UocHJvcHMsIGNoaWxkcmVuLCBhcGkpIHtcbiAgICByZXR1cm4gKEF1cnVtLmZhY3RvcnkoRXJyb3JCb3VuZGFyeSwgeyBzdXNwZW5zZUZhbGxiYWNrOiBwcm9wcz8uZmFsbGJhY2ssIGVycm9yRmFsbGJhY2s6IChlcnJvcikgPT4ge1xuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH0gfSwgY2hpbGRyZW4pKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXN1c3BlbnNlLmpzLm1hcCIsImltcG9ydCB7IGF1cnVtRWxlbWVudE1vZGVsSWRlbnRpdGl5IH0gZnJvbSAnLi4vcmVuZGVyaW5nL2F1cnVtX2VsZW1lbnQuanMnO1xuaW1wb3J0IHsgZHNNYXAsIGRzVW5pcXVlIH0gZnJvbSAnLi4vc3RyZWFtL2RhdGFfc291cmNlX29wZXJhdG9ycy5qcyc7XG5pbXBvcnQgeyBDYW5jZWxsYXRpb25Ub2tlbiB9IGZyb20gJy4uL3V0aWxpdGllcy9jYW5jZWxsYXRpb25fdG9rZW4uanMnO1xuZXhwb3J0IGZ1bmN0aW9uIFN3aXRjaChwcm9wcywgY2hpbGRyZW4sIGFwaSkge1xuICAgIGNoaWxkcmVuID0gW10uY29uY2F0LmFwcGx5KFtdLCBjaGlsZHJlbi5maWx0ZXIoKGMpID0+ICEhYykpO1xuICAgIGlmIChjaGlsZHJlbi5zb21lKChjKSA9PiAhY1thdXJ1bUVsZW1lbnRNb2RlbElkZW50aXRpeV0gfHxcbiAgICAgICAgIShjLmZhY3RvcnkgPT09IFN3aXRjaENhc2UgfHwgYy5mYWN0b3J5ID09PSBEZWZhdWx0U3dpdGNoQ2FzZSkpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignU3dpdGNoIG9ubHkgYWNjZXB0cyBTd2l0Y2hDYXNlIGFzIGNoaWxkcmVuJyk7XG4gICAgfVxuICAgIGlmIChjaGlsZHJlbi5maWx0ZXIoKGMpID0+IGMuZmFjdG9yeSA9PT0gRGVmYXVsdFN3aXRjaENhc2UpLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUb28gbWFueSBkZWZhdWx0IHN3aXRjaCBjYXNlcyBvbmx5IDAgb3IgMSBhbGxvd2VkJyk7XG4gICAgfVxuICAgIGNvbnN0IGNsZWFuVXAgPSBuZXcgQ2FuY2VsbGF0aW9uVG9rZW4oKTtcbiAgICBhcGkub25EZXRhY2goKCkgPT4ge1xuICAgICAgICBjbGVhblVwLmNhbmNlbCgpO1xuICAgIH0pO1xuICAgIGNvbnN0IHUgPSBwcm9wcy5zdGF0ZS50cmFuc2Zvcm0oZHNVbmlxdWUoKSwgY2xlYW5VcCk7XG4gICAgcmV0dXJuIHUud2l0aEluaXRpYWwocHJvcHMuc3RhdGUudmFsdWUpLnRyYW5zZm9ybShkc01hcCgoc3RhdGUpID0+IHNlbGVjdENhc2Uoc3RhdGUsIGNoaWxkcmVuKSkpO1xufVxuZnVuY3Rpb24gc2VsZWN0Q2FzZShzdGF0ZSwgY2hpbGRyZW4pIHtcbiAgICByZXR1cm4gY2hpbGRyZW4uZmluZCgoYykgPT4gYy5wcm9wcz8ud2hlbiA9PT0gc3RhdGUpPy5jaGlsZHJlbiA/PyBjaGlsZHJlbi5maW5kKChwKSA9PiBwLmZhY3RvcnkgPT09IERlZmF1bHRTd2l0Y2hDYXNlKT8uY2hpbGRyZW47XG59XG5leHBvcnQgZnVuY3Rpb24gU3dpdGNoQ2FzZShwcm9wcywgY2hpbGRyZW4pIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xufVxuZXhwb3J0IGZ1bmN0aW9uIERlZmF1bHRTd2l0Y2hDYXNlKHByb3BzLCBjaGlsZHJlbikge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zd2l0Y2guanMubWFwIiwiaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSAnLi91dGlsaXRpZXMvZXZlbnRfZW1pdHRlci5qcyc7XG5leHBvcnQgbGV0IGRlYnVnTW9kZSA9IGZhbHNlO1xuZXhwb3J0IGxldCBkaWFnbm9zdGljTW9kZSA9IGZhbHNlO1xuY29uc3QgY3VzdG9tV2luZG93ID0gZ2xvYmFsVGhpcztcbmxldCBkZWJ1Z1N0cmVhbURhdGE7XG5leHBvcnQgZnVuY3Rpb24gZW5hYmxlRGlhZ25vc3RpY01vZGUoKSB7XG4gICAgZGlhZ25vc3RpY01vZGUgPSB0cnVlO1xufVxuLyoqXG4gKiBJbml0aWFsaXplcyB0aGUgZGVidWcgZmVhdHVyZXMgb2YgYXVydW0uIFJlcXVpcmVkIGZvciB0aGUgdXNlIG9mIGF1cnVtIGRldnRvb2xzXG4gKiBSdW4gdGhpcyBmdW5jdGlvbiBiZWZvcmUgY3JlYXRpbmcgYW55IHN0cmVhbXMgb3IgYW55IGF1cnVtIGNvbXBvbmVudHMgZm9yIGJlc3QgcmVzdWx0c1xuICogRW5hYmxpbmcgdGhpcyBoYXJtcyBwZXJmb3JtYW5jZSBhbmQgYnJlYWtzIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5IHdpdGggc29tZSBicm93c2Vyc1xuICogRG8gbm90IGVuYWJsZSBpbiBwcm9kdWN0aW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBlbmFibGVEZWJ1Z01vZGUoKSB7XG4gICAgZGVidWdTdHJlYW1EYXRhID0gW107XG4gICAgZGVidWdNb2RlID0gdHJ1ZTtcbiAgICBzZXRJbnRlcnZhbCgoKSA9PiBnYXJiYWdlQ29sbGVjdCgpLCA2MDAwMCk7XG4gICAgY3VzdG9tV2luZG93Ll9fZGVidWdVcGRhdGVzID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIGN1c3RvbVdpbmRvdy5fX2RlYnVnTmV3U291cmNlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIGN1c3RvbVdpbmRvdy5fX2RlYnVnTGlua2VkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIGN1c3RvbVdpbmRvdy5fX2RlYnVnVW5saW5rZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgY3VzdG9tV2luZG93Ll9fZGVidWdHZXRTdHJlYW1EYXRhID0gKCkgPT4gZGVidWdTdHJlYW1EYXRhLm1hcChzZXJpYWxpemVTdHJlYW1EYXRhKTtcbn1cbmZ1bmN0aW9uIHNlcmlhbGl6ZVN0cmVhbURhdGEocmVmKSB7XG4gICAgbGV0IHNlcmlhbGl6ZWRWYWx1ZTtcbiAgICB0cnkge1xuICAgICAgICBzZXJpYWxpemVkVmFsdWUgPSBKU09OLnN0cmluZ2lmeShyZWYudmFsdWUpO1xuICAgIH1cbiAgICBjYXRjaCAoZSkge1xuICAgICAgICBzZXJpYWxpemVkVmFsdWUgPSAnW1Vuc2VyaWFsaXphYmxlXSc7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6IHJlZi5uYW1lLFxuICAgICAgICB2YWx1ZTogc2VyaWFsaXplZFZhbHVlLFxuICAgICAgICBjaGlsZHJlbjogcmVmLmNoaWxkcmVuLFxuICAgICAgICBjb25zdW1lcnM6IHJlZi5jb25zdW1lcnMsXG4gICAgICAgIGlkOiByZWYuaWQsXG4gICAgICAgIHBhcmVudHM6IHJlZi5wYXJlbnRzLFxuICAgICAgICBzdGFjazogcmVmLnN0YWNrLFxuICAgICAgICB0aW1lc3RhbXA6IHJlZi50aW1lc3RhbXBcbiAgICB9O1xufVxuZXhwb3J0IGZ1bmN0aW9uIGRlYnVnUmVnaXN0ZXJTdHJlYW0oc3RyZWFtLCBzdGFjaykge1xuICAgIGNvbnN0IHJlZiA9IHtcbiAgICAgICAgbmFtZTogc3RyZWFtLm5hbWUsXG4gICAgICAgIHZhbHVlOiBzdHJlYW0udmFsdWUsXG4gICAgICAgIGlkOiBNYXRoLnJhbmRvbSgpLFxuICAgICAgICBjaGlsZHJlbjogW10sXG4gICAgICAgIHBhcmVudHM6IFtdLFxuICAgICAgICBzdGFjayxcbiAgICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpLFxuICAgICAgICByZWZlcmVuY2U6IG5ldyBXZWFrUmVmKHN0cmVhbSksXG4gICAgICAgIGNvbnN1bWVyczogW11cbiAgICB9O1xuICAgIGRlYnVnU3RyZWFtRGF0YS5wdXNoKHJlZik7XG4gICAgY3VzdG9tV2luZG93Ll9fZGVidWdOZXdTb3VyY2UuZmlyZSh7XG4gICAgICAgIHNvdXJjZTogc2VyaWFsaXplU3RyZWFtRGF0YShyZWYpXG4gICAgfSk7XG59XG5leHBvcnQgZnVuY3Rpb24gZGVidWdSZWdpc3RlckxpbmsocGFyZW50LCBjaGlsZCkge1xuICAgIGxldCBwcmVmID0gZmluZERhdGFCeVJlZihwYXJlbnQpO1xuICAgIGxldCBjcmVmID0gZmluZERhdGFCeVJlZihjaGlsZCk7XG4gICAgaWYgKCFwcmVmKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignaWxsZWdhbCBzdGF0ZScpO1xuICAgIH1cbiAgICBpZiAoIWNyZWYpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbGxlZ2FsIHN0YXRlJyk7XG4gICAgfVxuICAgIHByZWYuY2hpbGRyZW4ucHVzaChjcmVmLmlkKTtcbiAgICBjcmVmLnBhcmVudHMucHVzaChwcmVmLmlkKTtcbiAgICBjdXN0b21XaW5kb3cuX19kZWJ1Z0xpbmtlZC5maXJlKHtcbiAgICAgICAgY2hpbGQ6IHNlcmlhbGl6ZVN0cmVhbURhdGEoY3JlZiksXG4gICAgICAgIHBhcmVudDogc2VyaWFsaXplU3RyZWFtRGF0YShwcmVmKVxuICAgIH0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGRlYnVnUmVnaXN0ZXJVbmxpbmsocGFyZW50LCBjaGlsZCkge1xuICAgIGxldCBwcmVmID0gZmluZERhdGFCeVJlZihwYXJlbnQpO1xuICAgIGxldCBjcmVmID0gZmluZERhdGFCeVJlZihjaGlsZCk7XG4gICAgaWYgKCFwcmVmKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignaWxsZWdhbCBzdGF0ZScpO1xuICAgIH1cbiAgICBpZiAoIWNyZWYpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbGxlZ2FsIHN0YXRlJyk7XG4gICAgfVxuICAgIGNvbnN0IGNpbmRleCA9IHByZWYuY2hpbGRyZW4uaW5kZXhPZihjcmVmLmlkKTtcbiAgICBpZiAoY2luZGV4ID09PSAtMSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2lsbGVnYWwgc3RhdGUnKTtcbiAgICB9XG4gICAgcHJlZi5jaGlsZHJlbi5zcGxpY2UoY2luZGV4LCAxKTtcbiAgICBjb25zdCBwaW5kZXggPSBjcmVmLnBhcmVudHMuaW5kZXhPZihwcmVmLmlkKTtcbiAgICBpZiAocGluZGV4ID09PSAtMSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2lsbGVnYWwgc3RhdGUnKTtcbiAgICB9XG4gICAgY3JlZi5wYXJlbnRzLnNwbGljZShjaW5kZXgsIDEpO1xuICAgIGN1c3RvbVdpbmRvdy5fX2RlYnVnVW5saW5rZWQuZmlyZSh7XG4gICAgICAgIGNoaWxkOiBzZXJpYWxpemVTdHJlYW1EYXRhKGNyZWYpLFxuICAgICAgICBwYXJlbnQ6IHNlcmlhbGl6ZVN0cmVhbURhdGEocHJlZilcbiAgICB9KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBkZWJ1Z0RlY2xhcmVVcGRhdGUoc291cmNlLCB2YWx1ZSwgc3RhY2spIHtcbiAgICBsZXQgcmVmID0gZmluZERhdGFCeVJlZihzb3VyY2UpO1xuICAgIGlmICghcmVmKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignaWxsZWdhbCBzdGF0ZScpO1xuICAgIH1cbiAgICByZWYudmFsdWUgPSBzb3VyY2UudmFsdWU7XG4gICAgY3VzdG9tV2luZG93Ll9fZGVidWdVcGRhdGVzLmZpcmUoe1xuICAgICAgICBuZXdWYWx1ZTogdmFsdWUsXG4gICAgICAgIHNvdXJjZTogc2VyaWFsaXplU3RyZWFtRGF0YShyZWYpLFxuICAgICAgICBzdGFja1xuICAgIH0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGRlYnVnUmVnaXN0ZXJDb25zdW1lcihzdHJlYW0sIGNvbnN1bWVyLCBjb25zdW1lclN0YWNrKSB7XG4gICAgbGV0IHJlZiA9IGZpbmREYXRhQnlSZWYoc3RyZWFtKTtcbiAgICBpZiAoIXJlZikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2lsbGVnYWwgc3RhdGUnKTtcbiAgICB9XG4gICAgcmVmLmNvbnN1bWVycy5wdXNoKHtcbiAgICAgICAgY29kZTogY29uc3VtZXIsXG4gICAgICAgIHN0YWNrOiBjb25zdW1lclN0YWNrXG4gICAgfSk7XG59XG5mdW5jdGlvbiBnYXJiYWdlQ29sbGVjdCgpIHtcbiAgICBkZWJ1Z1N0cmVhbURhdGEgPSBkZWJ1Z1N0cmVhbURhdGEuZmlsdGVyKChkc2QpID0+IGRzZC5yZWZlcmVuY2UuZGVyZWYoKSAhPT0gdW5kZWZpbmVkKTtcbn1cbmZ1bmN0aW9uIGZpbmREYXRhQnlSZWYodGFyZ2V0KSB7XG4gICAgcmV0dXJuIGRlYnVnU3RyZWFtRGF0YS5maW5kKChkc2QpID0+IGRzZC5yZWZlcmVuY2UuZGVyZWYoKSA9PT0gdGFyZ2V0KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRlYnVnX21vZGUuanMubWFwIiwiaW1wb3J0IHsgRG9tTm9kZUNyZWF0b3IgfSBmcm9tICcuLi9idWlsdGluX2NvbXBvbmVudHMvZG9tX2FkYXB0ZXIuanMnO1xuaW1wb3J0IHsgRGF0YVNvdXJjZSB9IGZyb20gJy4uL3N0cmVhbS9kYXRhX3NvdXJjZS5qcyc7XG5pbXBvcnQgeyBEdXBsZXhEYXRhU291cmNlIH0gZnJvbSAnLi4vc3RyZWFtL2R1cGxleF9kYXRhX3NvdXJjZS5qcyc7XG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5jb25zdCBpbnB1dEV2ZW50cyA9IHsgaW5wdXQ6ICdvbklucHV0JywgY2hhbmdlOiAnb25DaGFuZ2UnIH07XG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5jb25zdCBpbnB1dFByb3BzID0gW1xuICAgICdwbGFjZWhvbGRlcicsXG4gICAgJ3JlYWRvbmx5JyxcbiAgICAnZGlzYWJsZWQnLFxuICAgICdhY2NlcHQnLFxuICAgICdhbHQnLFxuICAgICdhdXRvY29tcGxldGUnLFxuICAgICdhdXRvZm9jdXMnLFxuICAgICdjaGVja2VkJyxcbiAgICAnZGVmYXVsdENoZWNrZWQnLFxuICAgICdmb3JtQWN0aW9uJyxcbiAgICAnZm9ybUVuY3R5cGUnLFxuICAgICdmb3JtTWV0aG9kJyxcbiAgICAnZm9ybU5vVmFsaWRhdGUnLFxuICAgICdmb3JtVGFyZ2V0JyxcbiAgICAnbWF4JyxcbiAgICAnbWF4TGVuZ3RoJyxcbiAgICAnbWluJyxcbiAgICAnbWluTGVuZ3RoJyxcbiAgICAncGF0dGVybicsXG4gICAgJ211bHRpcGxlJyxcbiAgICAncmVxdWlyZWQnLFxuICAgICd0eXBlJyxcbiAgICAnc3RlcCcsXG4gICAgJ2xpc3QnXG5dO1xuLyoqXG4gKiBAaW50ZXJuYWxcbiAqL1xuZXhwb3J0IGNvbnN0IElucHV0ID0gRG9tTm9kZUNyZWF0b3IoJ2lucHV0JywgaW5wdXRQcm9wcywgaW5wdXRFdmVudHMsIChub2RlLCBwcm9wcywgY2xlYW5VcCkgPT4ge1xuICAgIGNvbnN0IGlucHV0ID0gbm9kZTtcbiAgICBpZiAocHJvcHMudmFsdWUpIHtcbiAgICAgICAgaWYgKHByb3BzLnZhbHVlIGluc3RhbmNlb2YgRGF0YVNvdXJjZSkge1xuICAgICAgICAgICAgcHJvcHMudmFsdWUubGlzdGVuQW5kUmVwZWF0KCh2KSA9PiB7XG4gICAgICAgICAgICAgICAgaW5wdXQudmFsdWUgPSB2ID8/ICcnO1xuICAgICAgICAgICAgfSwgY2xlYW5VcCk7XG4gICAgICAgICAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICBwcm9wcy52YWx1ZS51cGRhdGUoaW5wdXQudmFsdWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocHJvcHMudmFsdWUgaW5zdGFuY2VvZiBEdXBsZXhEYXRhU291cmNlKSB7XG4gICAgICAgICAgICBwcm9wcy52YWx1ZS5saXN0ZW5BbmRSZXBlYXQoKHYpID0+IHtcbiAgICAgICAgICAgICAgICBpbnB1dC52YWx1ZSA9IHYgPz8gJyc7XG4gICAgICAgICAgICB9LCBjbGVhblVwKTtcbiAgICAgICAgICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHByb3BzLnZhbHVlLnVwZGF0ZVVwc3RyZWFtKGlucHV0LnZhbHVlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaW5wdXQudmFsdWUgPSBwcm9wcy52YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAocHJvcHMuY2hlY2tlZCkge1xuICAgICAgICBpZiAocHJvcHMuY2hlY2tlZCBpbnN0YW5jZW9mIERhdGFTb3VyY2UpIHtcbiAgICAgICAgICAgIHByb3BzLmNoZWNrZWQubGlzdGVuQW5kUmVwZWF0KCh2KSA9PiB7XG4gICAgICAgICAgICAgICAgaW5wdXQuY2hlY2tlZCA9IHYgPz8gZmFsc2U7XG4gICAgICAgICAgICB9LCBjbGVhblVwKTtcbiAgICAgICAgICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICAgICAgICAgICAgICBwcm9wcy5jaGVja2VkLnVwZGF0ZShpbnB1dC5jaGVja2VkKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHByb3BzLmNoZWNrZWQgaW5zdGFuY2VvZiBEdXBsZXhEYXRhU291cmNlKSB7XG4gICAgICAgICAgICBwcm9wcy5jaGVja2VkLmxpc3RlbkFuZFJlcGVhdCgodikgPT4ge1xuICAgICAgICAgICAgICAgIGlucHV0LmNoZWNrZWQgPSB2ID8/IGZhbHNlO1xuICAgICAgICAgICAgfSwgY2xlYW5VcCk7XG4gICAgICAgICAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcHJvcHMuY2hlY2tlZC51cGRhdGVVcHN0cmVhbShpbnB1dC5jaGVja2VkKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaW5wdXQuY2hlY2tlZCA9IHByb3BzLmNoZWNrZWQ7XG4gICAgICAgIH1cbiAgICB9XG59KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWlucHV0LmpzLm1hcCIsImltcG9ydCB7IEFycmF5RGF0YVNvdXJjZSwgRGF0YVNvdXJjZSwgTWFwRGF0YVNvdXJjZSB9IGZyb20gJy4uL3N0cmVhbS9kYXRhX3NvdXJjZS5qcyc7XG5pbXBvcnQgeyBkc01hcCwgZHNVbmlxdWUgfSBmcm9tICcuLi9zdHJlYW0vZGF0YV9zb3VyY2Vfb3BlcmF0b3JzLmpzJztcbmltcG9ydCB7IER1cGxleERhdGFTb3VyY2UgfSBmcm9tICcuLi9zdHJlYW0vZHVwbGV4X2RhdGFfc291cmNlLmpzJztcbmltcG9ydCB7IGF1cnVtQ2xhc3NOYW1lLCBjYW1lbENhc2VUb0tlYmFiQ2FzZSB9IGZyb20gJy4uL3V0aWxpdGllcy9jbGFzc25hbWUuanMnO1xuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZUNsYXNzKGRhdGEsIGNsZWFuVXApIHtcbiAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbiAgICBlbHNlIGlmIChkYXRhIGluc3RhbmNlb2YgRGF0YVNvdXJjZSB8fCBkYXRhIGluc3RhbmNlb2YgRHVwbGV4RGF0YVNvdXJjZSkge1xuICAgICAgICByZXR1cm4gZGF0YVxuICAgICAgICAgICAgLnRyYW5zZm9ybShkc1VuaXF1ZSgpLCBkc01hcCgodikgPT4ge1xuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdi5qb2luKCcgJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSksIGNsZWFuVXApXG4gICAgICAgICAgICAud2l0aEluaXRpYWwoZGF0YS52YWx1ZSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGRhdGEgaW5zdGFuY2VvZiBBcnJheURhdGFTb3VyY2UpIHtcbiAgICAgICAgcmV0dXJuIGRhdGEucmVkdWNlKChwLCBjKSA9PiBgJHtwfSAke2N9YCwgJycsIGNsZWFuVXApO1xuICAgIH1cbiAgICBlbHNlIGlmIChkYXRhIGluc3RhbmNlb2YgTWFwRGF0YVNvdXJjZSB8fCAodHlwZW9mIGRhdGEgPT09ICdvYmplY3QnICYmICFBcnJheS5pc0FycmF5KGRhdGEpKSkge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBhdXJ1bUNsYXNzTmFtZShkYXRhLCBjbGVhblVwKTtcbiAgICAgICAgcmV0dXJuIGhhbmRsZUNsYXNzKHJlc3VsdCwgY2xlYW5VcCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBuZXcgRGF0YVNvdXJjZShidWlsZENsYXNzKGRhdGEpKTtcbiAgICAgICAgZm9yIChjb25zdCBpIG9mIGRhdGEpIHtcbiAgICAgICAgICAgIGlmIChpIGluc3RhbmNlb2YgRGF0YVNvdXJjZSkge1xuICAgICAgICAgICAgICAgIGkudHJhbnNmb3JtKGRzVW5pcXVlKCksIGNsZWFuVXApLmxpc3RlbigodikgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQudXBkYXRlKGJ1aWxkQ2xhc3MoZGF0YSkpO1xuICAgICAgICAgICAgICAgIH0sIGNsZWFuVXApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxufVxuZnVuY3Rpb24gYnVpbGRDbGFzcyhkYXRhKSB7XG4gICAgcmV0dXJuIGRhdGEucmVkdWNlKChwLCBjKSA9PiB7XG4gICAgICAgIGlmICh0eXBlb2YgYyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHJldHVybiBgJHtwfSAke2N9YDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChjLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGAke3B9ICR7Yy52YWx1ZX1gO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LCAnJyk7XG59XG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlU3R5bGUoZGF0YSwgY2xlYW5VcCkge1xuICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICAgIGVsc2UgaWYgKGRhdGEgaW5zdGFuY2VvZiBEYXRhU291cmNlIHx8IGRhdGEgaW5zdGFuY2VvZiBEdXBsZXhEYXRhU291cmNlKSB7XG4gICAgICAgIHJldHVybiBkYXRhLnRyYW5zZm9ybShkc1VuaXF1ZSgpLCBkc01hcCgodikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHYudG9TdHJpbmcoKTtcbiAgICAgICAgfSksIGNsZWFuVXApO1xuICAgIH1cbiAgICBlbHNlIGlmIChkYXRhIGluc3RhbmNlb2YgTWFwRGF0YVNvdXJjZSkge1xuICAgICAgICByZXR1cm4gZGF0YS50b0VudHJpZXNBcnJheURhdGFTb3VyY2UoY2xlYW5VcCkucmVkdWNlKChwLCBjKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYCR7cH0ke2NhbWVsQ2FzZVRvS2ViYWJDYXNlKGNbMF0pfToke2NbMV19O2A7XG4gICAgICAgIH0sICcnLCBjbGVhblVwKTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGRhdGEgPT09ICdvYmplY3QnICYmICFBcnJheS5pc0FycmF5KGRhdGEpKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBBcnJheURhdGFTb3VyY2UoKTtcbiAgICAgICAgbGV0IGluZGV4ID0gMDtcbiAgICAgICAgZm9yIChjb25zdCBpIGluIGRhdGEpIHtcbiAgICAgICAgICAgIGlmIChkYXRhW2ldIGluc3RhbmNlb2YgRGF0YVNvdXJjZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG15SW5kZXggPSBpbmRleDtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChbaSwgZGF0YVtpXS52YWx1ZV0pO1xuICAgICAgICAgICAgICAgIGRhdGFbaV0ubGlzdGVuKCh2KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5zZXQobXlJbmRleCwgW2ksIHZdKTtcbiAgICAgICAgICAgICAgICB9LCBjbGVhblVwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKFtpLCBkYXRhW2ldXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpbmRleCsrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQucmVkdWNlKChwLCBjKSA9PiBgJHtwfSR7Y2FtZWxDYXNlVG9LZWJhYkNhc2UoY1swXSl9OiR7Y1sxXX07YCwgJycsIGNsZWFuVXApO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJlbmRlcmluZ19oZWxwZXJzLmpzLm1hcCIsImltcG9ydCB7IERhdGFTb3VyY2UgfSBmcm9tICcuLi9zdHJlYW0vZGF0YV9zb3VyY2UuanMnO1xuaW1wb3J0IHsgRHVwbGV4RGF0YVNvdXJjZSB9IGZyb20gJy4uL3N0cmVhbS9kdXBsZXhfZGF0YV9zb3VyY2UuanMnO1xuaW1wb3J0IHsgRG9tTm9kZUNyZWF0b3IgfSBmcm9tICcuLi9idWlsdGluX2NvbXBvbmVudHMvZG9tX2FkYXB0ZXIuanMnO1xuLyoqXG4gKiBAaW50ZXJuYWxcbiAqL1xuY29uc3Qgc2VsZWN0RXZlbnRzID0geyBjaGFuZ2U6ICdvbkNoYW5nZScgfTtcbi8qKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydCBjb25zdCBTZWxlY3QgPSBEb21Ob2RlQ3JlYXRvcignc2VsZWN0JywgdW5kZWZpbmVkLCBzZWxlY3RFdmVudHMsIChub2RlLCBwcm9wcywgY2xlYW5VcCkgPT4ge1xuICAgIGNvbnN0IHNlbGVjdCA9IG5vZGU7XG4gICAgaWYgKHByb3BzPy52YWx1ZSB8fCBwcm9wcz8uc2VsZWN0ZWRJbmRleCkge1xuICAgICAgICAvLyBJbiBjYXNlIHByb3BzLnZhbHVlIGlzIGEgZGF0YSBzb3VyY2Ugd2UgbmVlZCB0byByZWFwcGx5IHRoZSB2YWx1ZSB3aGVuIHRoZSBjaGlsZHJlbiBjaGFuZ2UgYmVjYXVzZSB0aGUgY2hpbGRyZW4gbWF5IGJlIHVuc3RhYmxlL2JlIHJlbW92ZWQgYW5kIHJlLWFkZGVkIHdoaWNoIHdvdWxkIGZhbHNpZnkgdGhlIHN0YXRlLlxuICAgICAgICBpZiAocHJvcHMudmFsdWUgaW5zdGFuY2VvZiBEYXRhU291cmNlIHx8IHByb3BzLnZhbHVlIGluc3RhbmNlb2YgRHVwbGV4RGF0YVNvdXJjZSkge1xuICAgICAgICAgICAgY29uc3QgbW8gPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgc2VsZWN0LnZhbHVlID0gcHJvcHMudmFsdWUudmFsdWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG1vLm9ic2VydmUoc2VsZWN0LCB7XG4gICAgICAgICAgICAgICAgY2hpbGRMaXN0OiB0cnVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNsZWFuVXAuYWRkQ2FuY2VsYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgbW8uZGlzY29ubmVjdCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BzLnNlbGVjdGVkSW5kZXggaW5zdGFuY2VvZiBEYXRhU291cmNlIHx8IHByb3BzLnNlbGVjdGVkSW5kZXggaW5zdGFuY2VvZiBEdXBsZXhEYXRhU291cmNlKSB7XG4gICAgICAgICAgICBjb25zdCBtbyA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHtcbiAgICAgICAgICAgICAgICBzZWxlY3Quc2VsZWN0ZWRJbmRleCA9IHByb3BzLnNlbGVjdGVkSW5kZXgudmFsdWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG1vLm9ic2VydmUoc2VsZWN0LCB7XG4gICAgICAgICAgICAgICAgY2hpbGRMaXN0OiB0cnVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNsZWFuVXAuYWRkQ2FuY2VsYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgbW8uZGlzY29ubmVjdCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BzLnZhbHVlIGluc3RhbmNlb2YgRGF0YVNvdXJjZSkge1xuICAgICAgICAgICAgcHJvcHMudmFsdWUubGlzdGVuQW5kUmVwZWF0KCh2KSA9PiB7XG4gICAgICAgICAgICAgICAgc2VsZWN0LnZhbHVlID0gdjtcbiAgICAgICAgICAgIH0sIGNsZWFuVXApO1xuICAgICAgICAgICAgc2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICAgICAgICAgICAgICBwcm9wcy52YWx1ZS51cGRhdGUoc2VsZWN0LnZhbHVlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHByb3BzLnZhbHVlIGluc3RhbmNlb2YgRHVwbGV4RGF0YVNvdXJjZSkge1xuICAgICAgICAgICAgcHJvcHMudmFsdWUubGlzdGVuQW5kUmVwZWF0KCh2KSA9PiB7XG4gICAgICAgICAgICAgICAgc2VsZWN0LnZhbHVlID0gdjtcbiAgICAgICAgICAgIH0sIGNsZWFuVXApO1xuICAgICAgICAgICAgc2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICAgICAgICAgICAgICBwcm9wcy52YWx1ZS51cGRhdGVVcHN0cmVhbShzZWxlY3QudmFsdWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzZWxlY3QudmFsdWUgPSBwcm9wcy52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcHM/LnNlbGVjdGVkSW5kZXgpIHtcbiAgICAgICAgICAgIGlmIChwcm9wcy5zZWxlY3RlZEluZGV4IGluc3RhbmNlb2YgRGF0YVNvdXJjZSkge1xuICAgICAgICAgICAgICAgIHByb3BzLnNlbGVjdGVkSW5kZXgubGlzdGVuQW5kUmVwZWF0KCh2KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdC5zZWxlY3RlZEluZGV4ID0gdjtcbiAgICAgICAgICAgICAgICB9LCBjbGVhblVwKTtcbiAgICAgICAgICAgICAgICBzZWxlY3QuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBwcm9wcy5zZWxlY3RlZEluZGV4LnVwZGF0ZShzZWxlY3Quc2VsZWN0ZWRJbmRleCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChwcm9wcy5zZWxlY3RlZEluZGV4IGluc3RhbmNlb2YgRHVwbGV4RGF0YVNvdXJjZSkge1xuICAgICAgICAgICAgICAgIHByb3BzLnNlbGVjdGVkSW5kZXgubGlzdGVuQW5kUmVwZWF0KCh2KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdC5zZWxlY3RlZEluZGV4ID0gdjtcbiAgICAgICAgICAgICAgICB9LCBjbGVhblVwKTtcbiAgICAgICAgICAgICAgICBzZWxlY3QuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBwcm9wcy5zZWxlY3RlZEluZGV4LnVwZGF0ZVVwc3RyZWFtKHNlbGVjdC5zZWxlY3RlZEluZGV4KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlbGVjdC5zZWxlY3RlZEluZGV4ID0gcHJvcHMuc2VsZWN0ZWRJbmRleDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2VsZWN0LmpzLm1hcCIsImltcG9ydCB7IERvbU5vZGVDcmVhdG9yIH0gZnJvbSAnLi4vYnVpbHRpbl9jb21wb25lbnRzL2RvbV9hZGFwdGVyLmpzJztcbmV4cG9ydCBjb25zdCBDb2RlID0gRG9tTm9kZUNyZWF0b3IoJ2NvZGUnKTtcbmV4cG9ydCBjb25zdCBEaXYgPSBEb21Ob2RlQ3JlYXRvcignZGl2Jyk7XG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnQgY29uc3QgQSA9IERvbU5vZGVDcmVhdG9yKCdhJywgWydocmVmJywgJ3RhcmdldCcsICdocmVmbGFuZycsICdtZWRpYScsICdkb3dubG9hZCcsICdwaW5nJywgJ3JlZmVycmVycG9saWN5JywgJ3JlbCcsICd0eXBlJ10pO1xuLyoqXG4gKiBAaW50ZXJuYWxcbiAqL1xuZXhwb3J0IGNvbnN0IEFiYnIgPSBEb21Ob2RlQ3JlYXRvcignYWJicicpO1xuLyoqXG4gKiBAaW50ZXJuYWxcbiAqL1xuZXhwb3J0IGNvbnN0IEFkZHJlc3MgPSBEb21Ob2RlQ3JlYXRvcignYWRkcmVzcycpO1xuLyoqXG4gKiBAaW50ZXJuYWxcbiAqL1xuZXhwb3J0IGNvbnN0IEgxID0gRG9tTm9kZUNyZWF0b3IoJ2gxJyk7XG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnQgY29uc3QgSDIgPSBEb21Ob2RlQ3JlYXRvcignaDInKTtcbi8qKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydCBjb25zdCBIMyA9IERvbU5vZGVDcmVhdG9yKCdoMycpO1xuLyoqXG4gKiBAaW50ZXJuYWxcbiAqL1xuZXhwb3J0IGNvbnN0IEg0ID0gRG9tTm9kZUNyZWF0b3IoJ2g0Jyk7XG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnQgY29uc3QgSDUgPSBEb21Ob2RlQ3JlYXRvcignaDUnKTtcbi8qKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydCBjb25zdCBINiA9IERvbU5vZGVDcmVhdG9yKCdoNicpO1xuLyoqXG4gKiBAaW50ZXJuYWxcbiAqL1xuZXhwb3J0IGNvbnN0IEFyZWEgPSBEb21Ob2RlQ3JlYXRvcignYXJlYScsIFtcbiAgICAnYWx0JyxcbiAgICAnY29vcnMnLFxuICAgICdkb3dubG9hZCcsXG4gICAgJ2hyZWYnLFxuICAgICdocmVmbGFuZycsXG4gICAgJ21lZGlhJyxcbiAgICAncmVsJyxcbiAgICAnc2hhcGUnLFxuICAgICd0YXJnZXQnLFxuICAgICd0eXBlJyxcbiAgICAncGluZycsXG4gICAgJ3JlZmVycmVycG9saWN5J1xuXSk7XG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnQgY29uc3QgQXJ0aWNsZSA9IERvbU5vZGVDcmVhdG9yKCdhcnRpY2xlJyk7XG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnQgY29uc3QgQXNpZGUgPSBEb21Ob2RlQ3JlYXRvcignYXNpZGUnKTtcbi8qKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydCBjb25zdCBTcGFuID0gRG9tTm9kZUNyZWF0b3IoJ3NwYW4nKTtcbi8qKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydCBjb25zdCBOb1NjcmlwdCA9IERvbU5vZGVDcmVhdG9yKCdub3NjcmlwdCcpO1xuLyoqXG4gKiBAaW50ZXJuYWxcbiAqL1xuZXhwb3J0IGNvbnN0IFZpZGVvID0gRG9tTm9kZUNyZWF0b3IoJ3ZpZGVvJywgW1xuICAgICdjb250cm9scycsXG4gICAgJ2F1dG9wbGF5JyxcbiAgICAnbG9vcCcsXG4gICAgJ211dGVkJyxcbiAgICAncHJlbG9hZCcsXG4gICAgJ3NyYycsXG4gICAgJ3Bvc3RlcicsXG4gICAgJ3dpZHRoJyxcbiAgICAnaGVpZ2h0JyxcbiAgICAnYXV0b3BpY3R1cmVpbnBpY3R1cmUnLFxuICAgICdjb250cm9sc2xpc3QnLFxuICAgICdjcm9zc29yaWdpbicsXG4gICAgJ2Rpc2FibGVwaWN0dXJlaW5waWN0dXJlJyxcbiAgICAnZGlzYWJsZXJlbW90ZXBsYXliYWNrJyxcbiAgICAncGxheXNpbmxpbmUnXG5dLCB7XG4gICAgY2FuUGxheTogJ29uQ2FuUGxheScsXG4gICAgY2FucGxheXRocm91Z2g6ICdvbkNhblBsYXlUaHJvdWdoJyxcbiAgICBjb21wbGV0ZTogJ29uQ29tcGxldGUnLFxuICAgIGR1cmF0aW9uY2hhbmdlOiAnb25EdXJhdGlvbkNoYW5nZScsXG4gICAgZW1wdGllZDogJ29uRW1wdGllZCcsXG4gICAgZW5kZWQ6ICdvbkVuZGVkJyxcbiAgICBsb2FkZWRkYXRhOiAnb25Mb2FkZWREYXRhJyxcbiAgICBsb2FkZWRtZXRhZGF0YTogJ29uTG9hZGVkTWV0YWRhdGEnLFxuICAgIHBhdXNlOiAnb25QYXVzZScsXG4gICAgcGxheTogJ29uUGxheScsXG4gICAgcGxheWluZzogJ29uUGxheWluZycsXG4gICAgcHJvZ3Jlc3M6ICdvblByb2dyZXNzJyxcbiAgICByYXRlY2hhbmdlOiAnb25SYXRlQ2hhbmdlJyxcbiAgICBzZWVrZWQ6ICdvblNlZWtlZCcsXG4gICAgc2Vla2luZzogJ29uU2Vla2luZycsXG4gICAgc3RhbGxlZDogJ29uU3RhbGxlZCcsXG4gICAgc3VzcGVuZDogJ29uU3VzcGVuZCcsXG4gICAgdGltZXVwZGF0ZTogJ29uVGltZVVwZGF0ZScsXG4gICAgdm9sdW1lY2hhbmdlOiAnb25Wb2x1bWVDaGFuZ2UnLFxuICAgIHdhaXRpbmc6ICdvbldhaXRpbmcnXG59KTtcbi8qKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydCBjb25zdCBVbCA9IERvbU5vZGVDcmVhdG9yKCd1bCcpO1xuLyoqXG4gKiBAaW50ZXJuYWxcbiAqL1xuZXhwb3J0IGNvbnN0IE9sID0gRG9tTm9kZUNyZWF0b3IoJ29sJyk7XG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnQgY29uc3QgTGkgPSBEb21Ob2RlQ3JlYXRvcignbGknKTtcbi8qKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydCBjb25zdCBCID0gRG9tTm9kZUNyZWF0b3IoJ2InKTtcbi8qKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydCBjb25zdCBCb2R5ID0gRG9tTm9kZUNyZWF0b3IoJ2JvZHknKTtcbi8qKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydCBjb25zdCBUaXRsZSA9IERvbU5vZGVDcmVhdG9yKCd0aXRsZScpO1xuLyoqXG4gKiBAaW50ZXJuYWxcbiAqL1xuZXhwb3J0IGNvbnN0IFN1bW1hcnkgPSBEb21Ob2RlQ3JlYXRvcignc3VtbWFyeScpO1xuLyoqXG4gKiBAaW50ZXJuYWxcbiAqL1xuZXhwb3J0IGNvbnN0IFRIZWFkID0gRG9tTm9kZUNyZWF0b3IoJ3RoZWFkJyk7XG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnQgY29uc3QgVGVtcGxhdGUgPSBEb21Ob2RlQ3JlYXRvcigndGVtcGxhdGUnKTtcbi8qKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydCBjb25zdCBRID0gRG9tTm9kZUNyZWF0b3IoJ3EnKTtcbi8qKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydCBjb25zdCBQcmUgPSBEb21Ob2RlQ3JlYXRvcigncHJlJyk7XG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnQgY29uc3QgUCA9IERvbU5vZGVDcmVhdG9yKCdwJyk7XG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnQgY29uc3QgSHIgPSBEb21Ob2RlQ3JlYXRvcignaHInKTtcbi8qKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydCBjb25zdCBBdWRpbyA9IERvbU5vZGVDcmVhdG9yKCdhdWRpbycsIFsnY29udHJvbHMnLCAnYXV0b3BsYXknLCAnbG9vcCcsICdtdXRlZCcsICdwcmVsb2FkJywgJ3NyYycsICdjcm9zc29yaWdpbiddLCB7XG4gICAgYXVkaW9wcm9jZXNzOiAnb25BdWRpb1Byb2Nlc3MnLFxuICAgIGNhbnBsYXk6ICdvbkNhblBsYXknLFxuICAgIGNhbnBsYXl0aHJvdWdoOiAnb25DYW5QbGF5VGhyb3VnaCcsXG4gICAgY29tcGxldGU6ICdvbkNvbXBsZXRlJyxcbiAgICBkdXJhdGlvbmNoYW5nZTogJ29uRHVyYXRpb25DaGFuZ2UnLFxuICAgIGVtcHRpZWQ6ICdvbkVtcHRpZWQnLFxuICAgIGVuZGVkOiAnb25FbmRlZCcsXG4gICAgbG9hZGVkZGF0YTogJ29uTG9hZGVkRGF0YScsXG4gICAgbG9hZGVkbWV0YWRhdGE6ICdvbkxvYWRlZE1ldGFkYXRhJyxcbiAgICBwYXVzZTogJ29uUGF1c2UnLFxuICAgIHBsYXk6ICdvblBsYXknLFxuICAgIHBsYXlpbmc6ICdvblBsYXlpbmcnLFxuICAgIHJhdGVjaGFuZ2U6ICdvblJhdGVDaGFuZ2UnLFxuICAgIHNlZWtlZDogJ29uU2Vla2VkJyxcbiAgICBzZWVraW5nOiAnb25TZWVraW5nJyxcbiAgICBzdGFsbGVkOiAnb25TdGFsbGVkJyxcbiAgICBzdXNwZW5kOiAnb25TdXNwZW5kJyxcbiAgICB0aW1ldXBkYXRlOiAnb25UaW1lVXBkYXRlJyxcbiAgICB2b2x1bWVjaGFuZ2U6ICdvblZvbHVtZUNoYW5nZScsXG4gICAgd2FpdGluZzogJ29uV2FpdGluZydcbn0pO1xuLyoqXG4gKiBAaW50ZXJuYWxcbiAqL1xuZXhwb3J0IGNvbnN0IEJyID0gRG9tTm9kZUNyZWF0b3IoJ2JyJyk7XG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnQgY29uc3QgQnV0dG9uID0gRG9tTm9kZUNyZWF0b3IoJ2J1dHRvbicsIFtcbiAgICAnZGlzYWJsZWQnLFxuICAgICdhdXRvZm9jdXMnLFxuICAgICdmb3JtJyxcbiAgICAnZm9ybWFjdGlvbicsXG4gICAgJ2Zvcm1lbmN0eXBlJyxcbiAgICAnZm9ybW1ldGhvZCcsXG4gICAgJ2Zvcm1ub3ZhbGlkYXRlJyxcbiAgICAnZm9ybXRhcmdldCcsXG4gICAgJ3R5cGUnXG5dKTtcbi8qKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydCBjb25zdCBDYW52YXMgPSBEb21Ob2RlQ3JlYXRvcignY2FudmFzJywgWyd3aWR0aCcsICdoZWlnaHQnXSk7XG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnQgY29uc3QgRGF0YSA9IERvbU5vZGVDcmVhdG9yKCdkYXRhJywgWyd2YWx1ZSddKTtcbi8qKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydCBjb25zdCBEZXRhaWxzID0gRG9tTm9kZUNyZWF0b3IoJ2RldGFpbHMnKTtcbi8qKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydCBjb25zdCBFbSA9IERvbU5vZGVDcmVhdG9yKCdlbScpO1xuLyoqXG4gKiBAaW50ZXJuYWxcbiAqL1xuZXhwb3J0IGNvbnN0IEZvb3RlciA9IERvbU5vZGVDcmVhdG9yKCdmb290ZXInKTtcbi8qKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydCBjb25zdCBGb3JtID0gRG9tTm9kZUNyZWF0b3IoJ2Zvcm0nLCBbJ2FjdGlvbicsICdtZXRob2QnLCAncmVsJywgJ2VuY3R5cGUnLCAnbm92YWxpZGF0ZScsICd0YXJnZXQnLCAnYWNjZXB0LWNoYXJzZXQnLCAnYXV0b2NvbXBsZXRlJ10pO1xuLyoqXG4gKiBAaW50ZXJuYWxcbiAqL1xuZXhwb3J0IGNvbnN0IE1ldGEgPSBEb21Ob2RlQ3JlYXRvcignbWV0YScsIFsnaHR0cC1lcXVpdicsICdjaGFyc2V0JywgJ2NvbnRlbnQnXSk7XG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnQgY29uc3QgSHRtbCA9IERvbU5vZGVDcmVhdG9yKCdodG1sJywgWydsYW5nJywgJ3htbG5zJ10pO1xuLyoqXG4gKiBAaW50ZXJuYWxcbiAqL1xuZXhwb3J0IGNvbnN0IEhlYWQgPSBEb21Ob2RlQ3JlYXRvcignaGVhZCcpO1xuLyoqXG4gKiBAaW50ZXJuYWxcbiAqL1xuZXhwb3J0IGNvbnN0IEhlYWRlciA9IERvbU5vZGVDcmVhdG9yKCdoZWFkZXInKTtcbi8qKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydCBjb25zdCBIZWFkaW5nID0gRG9tTm9kZUNyZWF0b3IoJ2hlYWRpbmcnKTtcbi8qKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydCBjb25zdCBJID0gRG9tTm9kZUNyZWF0b3IoJ2knKTtcbi8qKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydCBjb25zdCBJRnJhbWUgPSBEb21Ob2RlQ3JlYXRvcignaWZyYW1lJywgW1xuICAgICdzcmMnLFxuICAgICdzcmNkb2MnLFxuICAgICd3aWR0aCcsXG4gICAgJ2hlaWdodCcsXG4gICAgJ2FsbG93JyxcbiAgICAnYWxsb3dmdWxsc2NyZWVuJyxcbiAgICAnYWxsb3dwYXltZW50cmVxdWVzdCcsXG4gICAgJ2xvYWRpbmcnLFxuICAgICdzYW5kYm94JyxcbiAgICAnZnJhbWVib3JkZXInLFxuICAgICdjc3AnLFxuICAgICdyZWZlcnJlcnBvbGljeSdcbl0pO1xuLyoqXG4gKiBAaW50ZXJuYWxcbiAqL1xuZXhwb3J0IGNvbnN0IEltZyA9IERvbU5vZGVDcmVhdG9yKCdpbWcnLCBbXG4gICAgJ3NyYycsXG4gICAgJ2FsdCcsXG4gICAgJ3dpZHRoJyxcbiAgICAnaGVpZ2h0JyxcbiAgICAncmVmZXJyZXJwb2xpY3knLFxuICAgICdzaXplcycsXG4gICAgJ3NyY3NldCcsXG4gICAgJ3VzZW1hcCcsXG4gICAgJ2Nyb3Nzb3JpZ2luJyxcbiAgICAnZGVjb2RpbmcnLFxuICAgICdpc21hcCcsXG4gICAgJ2xvYWRpbmcnXG5dKTtcbi8qKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydCBjb25zdCBMYWJlbCA9IERvbU5vZGVDcmVhdG9yKCdsYWJlbCcsIFsnZm9yJ10pO1xuLyoqXG4gKiBAaW50ZXJuYWxcbiAqL1xuZXhwb3J0IGNvbnN0IExpbmsgPSBEb21Ob2RlQ3JlYXRvcignbGluaycsIFtcbiAgICAnaHJlZicsXG4gICAgJ3JlbCcsXG4gICAgJ21lZGlhJyxcbiAgICAnYXMnLFxuICAgICdkaXNhYmxlZCcsXG4gICAgJ3R5cGUnLFxuICAgICdjcm9zc29yaWdpbicsXG4gICAgJ2hyZWZsYW5nJyxcbiAgICAncmVmZXJyZXJwb2xpY3knLFxuICAgICdzaXplcycsXG4gICAgJ2ludGVncml0eScsXG4gICAgJ2ltYWdlc2l6ZXMnLFxuICAgICdwcmVmZXRjaCdcbl0pO1xuLyoqXG4gKiBAaW50ZXJuYWxcbiAqL1xuZXhwb3J0IGNvbnN0IE5hdiA9IERvbU5vZGVDcmVhdG9yKCduYXYnKTtcbi8qKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydCBjb25zdCBTdWIgPSBEb21Ob2RlQ3JlYXRvcignc3ViJyk7XG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnQgY29uc3QgU3VwID0gRG9tTm9kZUNyZWF0b3IoJ3N1cCcpO1xuLyoqXG4gKiBAaW50ZXJuYWxcbiAqL1xuZXhwb3J0IGNvbnN0IFRhYmxlID0gRG9tTm9kZUNyZWF0b3IoJ3RhYmxlJyk7XG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnQgY29uc3QgVEJvZHkgPSBEb21Ob2RlQ3JlYXRvcigndGJvZHknKTtcbi8qKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydCBjb25zdCBURm9vdCA9IERvbU5vZGVDcmVhdG9yKCd0Zm9vdCcpO1xuLyoqXG4gKiBAaW50ZXJuYWxcbiAqL1xuZXhwb3J0IGNvbnN0IENvbCA9IERvbU5vZGVDcmVhdG9yKCdjb2wnLCBbJ3NwYW4nXSk7XG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnQgY29uc3QgQ29sZ3JvdXAgPSBEb21Ob2RlQ3JlYXRvcignY29sZ3JvdXAnLCBbJ3NwYW4nXSk7XG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnQgY29uc3QgQ2FwdGlvbiA9IERvbU5vZGVDcmVhdG9yKCdjYXB0aW9uJyk7XG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnQgY29uc3QgVHIgPSBEb21Ob2RlQ3JlYXRvcigndHInKTtcbi8qKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydCBjb25zdCBUZCA9IERvbU5vZGVDcmVhdG9yKCd0ZCcsIFsnY29sc3BhbicsICdoZWFkZXJzJywgJ3Jvd3NwYW4nXSk7XG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnQgY29uc3QgVGggPSBEb21Ob2RlQ3JlYXRvcigndGgnLCBbJ3Njb3BlJywgJ2FiYnInLCAnY29sc3BhbicsICdoZWFkZXJzJywgJ3Jvd3NwYW4nXSk7XG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnQgY29uc3QgVGltZSA9IERvbU5vZGVDcmVhdG9yKCd0aW1lJywgWydkYXRldGltZSddKTtcbi8qKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydCBjb25zdCBTdHlsZSA9IERvbU5vZGVDcmVhdG9yKCdzdHlsZScsIFsnbWVkaWEnLCAndHlwZScsICdub25jZSddKTtcbi8qKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydCBjb25zdCBTb3VyY2UgPSBEb21Ob2RlQ3JlYXRvcignc291cmNlJywgWydzcmMnLCAnc3Jjc2V0JywgJ21lZGlhJywgJ3NpemVzJywgJ3R5cGUnXSk7XG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnQgY29uc3QgVHJhY2sgPSBEb21Ob2RlQ3JlYXRvcigndHJhY2snLCBbJ3NyYycsICdzcmNsYW5nJywgJ2xhYmVsJywgJ2tpbmQnLCAnZGVmYXVsdCddKTtcbi8qKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydCBjb25zdCBQYXJhbSA9IERvbU5vZGVDcmVhdG9yKCdwYXJhbScsIFsndmFsdWUnXSk7XG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnQgY29uc3QgU2NyaXB0ID0gRG9tTm9kZUNyZWF0b3IoJ3NjcmlwdCcsIFtcbiAgICAnc3JjJyxcbiAgICAnYXN5bmMnLFxuICAgICdkZWZlcicsXG4gICAgJ2ludGVncml0eScsXG4gICAgJ25vbW9kdWxlJyxcbiAgICAndHlwZScsXG4gICAgJ2Nyb3Nzb3JpZ2luJyxcbiAgICAncmVmZXJyZXJwb2xpY3knLFxuICAgICd0ZXh0JyxcbiAgICAnbm9uY2UnXG5dKTtcbmNvbnN0IGNvbW1vblN2Z1Byb3BzID0gW1xuICAgICdjbGlwLXBhdGgnLFxuICAgICdjbGlwLXJ1bGUnLFxuICAgICdjb2xvcicsXG4gICAgJ2NvbG9yLWludGVycG9sYXRpb24nLFxuICAgICdjb2xvci1yZW5kZXJpbmcnLFxuICAgICdjdXJzb3InLFxuICAgICdkaXNwbGF5JyxcbiAgICAnZmlsbCcsXG4gICAgJ2ZpbGwtb3BhY2l0eScsXG4gICAgJ2ZpbGwtcnVsZScsXG4gICAgJ2ZpbHRlcicsXG4gICAgJ21hc2snLFxuICAgICdvcGFjaXR5JyxcbiAgICAncG9pbnRlci1ldmVudHMnLFxuICAgICdzaGFwZS1yZW5kZXJpbmcnLFxuICAgICdzdHJva2UnLFxuICAgICdzdHJva2UtZGFzaGFycmF5JyxcbiAgICAnc3Ryb2tlLWRhc2hvZmZzZXQnLFxuICAgICdzdHJva2UtbGluZWNhcCcsXG4gICAgJ3N0cm9rZS1saW5lam9pbicsXG4gICAgJ3N0cm9rZS1taXRlcmxpbWl0JyxcbiAgICAnc3Ryb2tlLW9wYWNpdHknLFxuICAgICdzdHJva2Utd2lkdGgnLFxuICAgICd0cmFuc2Zvcm0nLFxuICAgICd2ZWN0b3ItZWZmZWN0JyxcbiAgICAndmlzaWJpbGl0eSdcbl07XG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnQgY29uc3QgU3ZnID0gRG9tTm9kZUNyZWF0b3IoJ3N2ZycsIFtcbiAgICAnd2lkdGgnLFxuICAgICdoZWlnaHQnLFxuICAgICd4bWxucycsXG4gICAgJ3ZlcnNpb24nLFxuICAgICd4JyxcbiAgICAneScsXG4gICAgJ3gxJyxcbiAgICAneTEnLFxuICAgICd4MicsXG4gICAgJ3kyJyxcbiAgICAnY3gnLFxuICAgICdjeScsXG4gICAgJ3InLFxuICAgICdyeCcsXG4gICAgJ3J5JyxcbiAgICAnZCcsXG4gICAgJ3BhdGgnLFxuICAgICdwb2ludHMnLFxuICAgICd2aWV3Qm94JyxcbiAgICAncHJlc2VydmVBc3BlY3RSYXRpbycsXG4gICAgJ3htbG5zOnhsaW5rJyxcbiAgICAneG1sOnNwYWNlJyxcbiAgICAuLi5jb21tb25TdmdQcm9wc1xuXSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHRydWUpO1xuZXhwb3J0IGNvbnN0IENpcmNsZSA9IERvbU5vZGVDcmVhdG9yKCdjaXJjbGUnLCBbJ2N4JywgJ2N5JywgJ3InLCAuLi5jb21tb25TdmdQcm9wc10sIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB0cnVlKTtcbmV4cG9ydCBjb25zdCBFbGxpcHNlID0gRG9tTm9kZUNyZWF0b3IoJ2VsbGlwc2UnLCBbJ2N4JywgJ2N5JywgJ3J4JywgJ3J5JywgLi4uY29tbW9uU3ZnUHJvcHNdLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdHJ1ZSk7XG5leHBvcnQgY29uc3QgTGluZSA9IERvbU5vZGVDcmVhdG9yKCdsaW5lJywgWyd4MScsICd5MScsICd4MicsICd5MicsIC4uLmNvbW1vblN2Z1Byb3BzXSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHRydWUpO1xuZXhwb3J0IGNvbnN0IFBvbHlnb24gPSBEb21Ob2RlQ3JlYXRvcigncG9seWdvbicsIFsncG9pbnRzJywgLi4uY29tbW9uU3ZnUHJvcHNdLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdHJ1ZSk7XG5leHBvcnQgY29uc3QgUG9seWxpbmUgPSBEb21Ob2RlQ3JlYXRvcigncG9seWxpbmUnLCBbJ3BvaW50cycsIC4uLmNvbW1vblN2Z1Byb3BzXSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHRydWUpO1xuZXhwb3J0IGNvbnN0IFBhdGggPSBEb21Ob2RlQ3JlYXRvcigncGF0aCcsIFsnZCcsIC4uLmNvbW1vblN2Z1Byb3BzXSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHRydWUpO1xuZXhwb3J0IGNvbnN0IFJlY3QgPSBEb21Ob2RlQ3JlYXRvcigncmVjdCcsIFsneCcsICd5JywgJ3dpZHRoJywgJ2hlaWdodCcsIC4uLmNvbW1vblN2Z1Byb3BzXSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHRydWUpO1xuZXhwb3J0IGNvbnN0IFRleHQgPSBEb21Ob2RlQ3JlYXRvcigndGV4dCcsIFsnZHgnLCAnZHknLCAncm90YXRlJywgJ3RleHRMZW5ndGgnLCAneCcsICd5JywgLi4uY29tbW9uU3ZnUHJvcHNdLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdHJ1ZSk7XG5leHBvcnQgY29uc3QgVHNwYW4gPSBEb21Ob2RlQ3JlYXRvcigndHNwYW4nLCBbJ2R4JywgJ2R5JywgJ3JvdGF0ZScsICd0ZXh0TGVuZ3RoJywgJ3gnLCAneScsIC4uLmNvbW1vblN2Z1Byb3BzXSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHRydWUpO1xuZXhwb3J0IGNvbnN0IEltYWdlID0gRG9tTm9kZUNyZWF0b3IoJ2ltYWdlJywgWyd4JywgJ3knLCAnd2lkdGgnLCAnaGVpZ2h0JywgJ2hyZWYnLCAuLi5jb21tb25TdmdQcm9wc10sIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB0cnVlKTtcbmV4cG9ydCBjb25zdCBHID0gRG9tTm9kZUNyZWF0b3IoJ2cnLCBbLi4uY29tbW9uU3ZnUHJvcHNdLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdHJ1ZSk7XG5leHBvcnQgY29uc3QgRGVmcyA9IERvbU5vZGVDcmVhdG9yKCdkZWZzJywgWy4uLmNvbW1vblN2Z1Byb3BzXSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHRydWUpO1xuZXhwb3J0IGNvbnN0IFN5bWJvbCA9IERvbU5vZGVDcmVhdG9yKCdzeW1ib2wnLCBbJ3ZpZXdCb3gnLCAncHJlc2VydmVBc3BlY3RSYXRpbycsIC4uLmNvbW1vblN2Z1Byb3BzXSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHRydWUpO1xuZXhwb3J0IGNvbnN0IFVzZSA9IERvbU5vZGVDcmVhdG9yKCd1c2UnLCBbJ2hyZWYnLCAneCcsICd5JywgJ3dpZHRoJywgJ2hlaWdodCcsIC4uLmNvbW1vblN2Z1Byb3BzXSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHRydWUpO1xuZXhwb3J0IGNvbnN0IE1hcmtlciA9IERvbU5vZGVDcmVhdG9yKCdtYXJrZXInLCBbJ3ZpZXdCb3gnLCAncHJlc2VydmVBc3BlY3RSYXRpbycsICdyZWZYJywgJ3JlZlknLCAnbWFya2VyV2lkdGgnLCAnbWFya2VySGVpZ2h0JywgJ29yaWVudCcsIC4uLmNvbW1vblN2Z1Byb3BzXSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHRydWUpO1xuZXhwb3J0IGNvbnN0IE1hc2sgPSBEb21Ob2RlQ3JlYXRvcignbWFzaycsIFsneCcsICd5JywgJ3dpZHRoJywgJ2hlaWdodCcsIC4uLmNvbW1vblN2Z1Byb3BzXSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHRydWUpO1xuZXhwb3J0IGNvbnN0IExpbmVhckdyYWRpZW50ID0gRG9tTm9kZUNyZWF0b3IoJ2xpbmVhckdyYWRpZW50JywgWyd4MScsICd5MScsICd4MicsICd5MicsIC4uLmNvbW1vblN2Z1Byb3BzXSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHRydWUpO1xuZXhwb3J0IGNvbnN0IFJhZGlhbEdyYWRpZW50ID0gRG9tTm9kZUNyZWF0b3IoJ3JhZGlhbEdyYWRpZW50JywgWydjeCcsICdjeScsICdyJywgJ2Z4JywgJ2Z5JywgJ2ZyJywgLi4uY29tbW9uU3ZnUHJvcHNdLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdHJ1ZSk7XG5leHBvcnQgY29uc3QgU3RvcCA9IERvbU5vZGVDcmVhdG9yKCdzdG9wJywgWydvZmZzZXQnLCAnc3RvcC1jb2xvcicsICdzdG9wLW9wYWNpdHknLCAuLi5jb21tb25TdmdQcm9wc10sIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB0cnVlKTtcbmV4cG9ydCBjb25zdCBDbGlwUGF0aCA9IERvbU5vZGVDcmVhdG9yKCdjbGlwUGF0aCcsIFsnY2xpcFBhdGhVbml0cycsIC4uLmNvbW1vblN2Z1Byb3BzXSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHRydWUpO1xuZXhwb3J0IGNvbnN0IEZvcmVpZ25PYmplY3QgPSBEb21Ob2RlQ3JlYXRvcignZm9yZWlnbk9iamVjdCcsIFsneCcsICd5JywgJ3dpZHRoJywgJ2hlaWdodCcsIC4uLmNvbW1vblN2Z1Byb3BzXSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHRydWUpO1xuZXhwb3J0IGNvbnN0IFBhdHRlcm4gPSBEb21Ob2RlQ3JlYXRvcigncGF0dGVybicsIFsneCcsICd5JywgJ3dpZHRoJywgJ2hlaWdodCcsICdwYXR0ZXJuVW5pdHMnLCAncGF0dGVybkNvbnRlbnRVbml0cycsICdwYXR0ZXJuVHJhbnNmb3JtJywgJ3ZpZXdCb3gnLCAncHJlc2VydmVBc3BlY3RSYXRpbycsIC4uLmNvbW1vblN2Z1Byb3BzXSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHRydWUpO1xuLyoqXG4gKiBAaW50ZXJuYWxcbiAqL1xuZXhwb3J0IGNvbnN0IFByb2dyZXNzID0gRG9tTm9kZUNyZWF0b3IoJ3Byb2dyZXNzJywgWydtYXgnLCAndmFsdWUnXSk7XG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnQgY29uc3QgT3B0aW9uID0gRG9tTm9kZUNyZWF0b3IoJ29wdGlvbicsIFsndmFsdWUnLCAnbGFiZWwnLCAnZGlzYWJsZWQnLCAnc2VsZWN0ZWQnXSk7XG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnQgY29uc3QgT3B0R3JvdXAgPSBEb21Ob2RlQ3JlYXRvcignb3B0Z3JvdXAnLCBbJ2xhYmVsJywgJ2Rpc2FibGVkJ10pO1xuLyoqXG4gKiBAaW50ZXJuYWxcbiAqL1xuZXhwb3J0IGNvbnN0IFNsb3QgPSBEb21Ob2RlQ3JlYXRvcignc2xvdCcpO1xuLyoqXG4gKiBAaW50ZXJuYWxcbiAqL1xuZXhwb3J0IGNvbnN0IFN0cm9uZyA9IERvbU5vZGVDcmVhdG9yKCdzdHJvbmcnKTtcbi8qKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydCBjb25zdCBTYW1wID0gRG9tTm9kZUNyZWF0b3IoJ3NhbXAnKTtcbi8qKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydCBjb25zdCBLYmQgPSBEb21Ob2RlQ3JlYXRvcigna2JkJyk7XG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnQgY29uc3QgVmFyID0gRG9tTm9kZUNyZWF0b3IoJ3ZhcicpO1xuLyoqXG4gKiBAaW50ZXJuYWxcbiAqL1xuZXhwb3J0IGNvbnN0IFdiciA9IERvbU5vZGVDcmVhdG9yKCd3YnInKTtcbi8qKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydCBjb25zdCBQaWN0dXJlID0gRG9tTm9kZUNyZWF0b3IoJ3BpY3R1cmUnKTtcbi8qKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydCBjb25zdCBPdXRwdXQgPSBEb21Ob2RlQ3JlYXRvcignb3V0cHV0JywgWydmb3InLCAnZm9ybSddKTtcbi8qKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydCBjb25zdCBPYmplY3QgPSBEb21Ob2RlQ3JlYXRvcignb2JqZWN0JywgWydkYXRhJywgJ3dpZHRoJywgJ2hlaWdodCcsICdmb3JtJywgJ3R5cGUnLCAndXNlbWFwJ10pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2ltcGxlX2RvbV9ub2Rlcy5qcy5tYXAiLCJpbXBvcnQgeyBjcmVhdGVBUEkgfSBmcm9tICcuLi9yZW5kZXJpbmcvYXVydW1fZWxlbWVudC5qcyc7XG5pbXBvcnQgeyBBcnJheURhdGFTb3VyY2UsIERhdGFTb3VyY2UgfSBmcm9tICcuLi9zdHJlYW0vZGF0YV9zb3VyY2UuanMnO1xuaW1wb3J0IHsgRHVwbGV4RGF0YVNvdXJjZSB9IGZyb20gJy4uL3N0cmVhbS9kdXBsZXhfZGF0YV9zb3VyY2UuanMnO1xuaW1wb3J0IHsgQ2FuY2VsbGF0aW9uVG9rZW4gfSBmcm9tICcuLi91dGlsaXRpZXMvY2FuY2VsbGF0aW9uX3Rva2VuLmpzJztcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhdXJ1bVRvU3RyaW5nKGNvbnRlbnQsIGNvbmZpZyA9IHt9KSB7XG4gICAgaWYgKGNvbnRlbnQgPT09IHVuZGVmaW5lZCB8fCBjb250ZW50ID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoY29udGVudCkpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBjb250ZW50KSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChhd2FpdCBhdXJ1bVRvU3RyaW5nKGl0ZW0pKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0LmpvaW4oJycpO1xuICAgIH1cbiAgICBpZiAoY29udGVudCBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgcmV0dXJuIGF1cnVtVG9TdHJpbmcoYXdhaXQgY29udGVudCk7XG4gICAgfVxuICAgIGlmIChbJ251bWJlcicsICdzdHJpbmcnLCAnYmlnaW50JywgJ2Jvb2xlYW4nXS5pbmNsdWRlcyh0eXBlb2YgY29udGVudCkpIHtcbiAgICAgICAgcmV0dXJuIGNvbnRlbnQudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoY29udGVudCBpbnN0YW5jZW9mIERhdGFTb3VyY2UpIHtcbiAgICAgICAgcmV0dXJuIGF1cnVtVG9TdHJpbmcoY29udGVudC52YWx1ZSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGNvbnRlbnQgaW5zdGFuY2VvZiBEdXBsZXhEYXRhU291cmNlKSB7XG4gICAgICAgIHJldHVybiBhdXJ1bVRvU3RyaW5nKGNvbnRlbnQudmFsdWUpO1xuICAgIH1cbiAgICBlbHNlIGlmIChjb250ZW50IGluc3RhbmNlb2YgQXJyYXlEYXRhU291cmNlKSB7XG4gICAgICAgIHJldHVybiBhdXJ1bVRvU3RyaW5nKGNvbnRlbnQuZ2V0RGF0YSgpKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSBjb250ZW50O1xuICAgICAgICBpZiAoIWl0ZW0uaXNJbnRyaW5zaWMpIHtcbiAgICAgICAgICAgIHJldHVybiBhdXJ1bVRvU3RyaW5nKGl0ZW0uZmFjdG9yeShpdGVtLnByb3BzLCBpdGVtLmNoaWxkcmVuLCBjcmVhdGVBUEkoe1xuICAgICAgICAgICAgICAgIGF0dGFjaENhbGxzOiBbXSxcbiAgICAgICAgICAgICAgICBzZXNzaW9uVG9rZW46IG5ldyBDYW5jZWxsYXRpb25Ub2tlbigpLFxuICAgICAgICAgICAgICAgIHRva2VuczogW11cbiAgICAgICAgICAgIH0pKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbmZpZy50YWdCbGFja2xpc3QgJiYgY29uZmlnLnRhZ0JsYWNrbGlzdC5pbmNsdWRlcyhpdGVtLm5hbWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbmZpZy50YWdXaGl0ZWxpc3QgJiYgIWNvbmZpZy50YWdXaGl0ZWxpc3QuaW5jbHVkZXMoaXRlbS5uYW1lKSkge1xuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9XG4gICAgICAgIGxldCBwcm9wU3RyaW5nID0gJyAnO1xuICAgICAgICBsZXQgY2hpbGRyZW4gPSAnJztcbiAgICAgICAgaWYgKGl0ZW0uY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIGNoaWxkcmVuID0gYXdhaXQgYXVydW1Ub1N0cmluZyhpdGVtLmNoaWxkcmVuKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IHByb3AgaW4gaXRlbS5wcm9wcykge1xuICAgICAgICAgICAgaWYgKGNvbmZpZy5hdHRyaWJ1dGVCbGFja2xpc3QgJiYgY29uZmlnLmF0dHJpYnV0ZUJsYWNrbGlzdC5pbmNsdWRlcyhwcm9wKSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNvbmZpZy5hdHRyaWJ1dGVXaGl0ZWxpc3QgJiYgIWNvbmZpZy5hdHRyaWJ1dGVXaGl0ZWxpc3QuaW5jbHVkZXMocHJvcCkpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpdGVtLnByb3BzW3Byb3BdICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHByb3BTdHJpbmcgKz0gYCR7cHJvcH09XCIke2l0ZW0ucHJvcHNbcHJvcF0udG9TdHJpbmcoKX1cIiBgO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBgPCR7aXRlbS5uYW1lfSR7cHJvcFN0cmluZy50cmltRW5kKCl9PiR7Y2hpbGRyZW59PC8ke2l0ZW0ubmFtZX0+YDtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zdHJpbmdfYWRhcHRlci5qcy5tYXAiLCJpbXBvcnQgeyBEYXRhU291cmNlIH0gZnJvbSAnLi4vc3RyZWFtL2RhdGFfc291cmNlLmpzJztcbmltcG9ydCB7IER1cGxleERhdGFTb3VyY2UgfSBmcm9tICcuLi9zdHJlYW0vZHVwbGV4X2RhdGFfc291cmNlLmpzJztcbmltcG9ydCB7IERvbU5vZGVDcmVhdG9yIH0gZnJvbSAnLi4vYnVpbHRpbl9jb21wb25lbnRzL2RvbV9hZGFwdGVyLmpzJztcbi8qKlxuICogQGludGVybmFsXG4gKi9cbmNvbnN0IHRleHRBcmVhRXZlbnRzID0geyBpbnB1dDogJ29uSW5wdXQnLCBjaGFuZ2U6ICdvbkNoYW5nZScgfTtcbi8qKlxuICogQGludGVybmFsXG4gKi9cbmNvbnN0IHRleHRBcmVhUHJvcHMgPSBbXG4gICAgJ3BsYWNlaG9sZGVyJyxcbiAgICAncmVhZG9ubHknLFxuICAgICdkaXNhYmxlZCcsXG4gICAgJ2Zvcm0nLFxuICAgICdjb2xzJyxcbiAgICAncm93cycsXG4gICAgJ3dyYXAnLFxuICAgICdhdXRvY29tcGxldGUnLFxuICAgICdhdXRvZm9jdXMnLFxuICAgICdtYXgnLFxuICAgICdtYXhMZW5ndGgnLFxuICAgICdtaW4nLFxuICAgICdzcGVsbGNoZWNrJyxcbiAgICAnbWluTGVuZ3RoJyxcbiAgICAncmVxdWlyZWQnLFxuICAgICd0eXBlJ1xuXTtcbi8qKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydCBjb25zdCBUZXh0QXJlYSA9IERvbU5vZGVDcmVhdG9yKCd0ZXh0QXJlYScsIHRleHRBcmVhUHJvcHMsIHRleHRBcmVhRXZlbnRzLCAobm9kZSwgcHJvcHMsIGNsZWFuVXApID0+IHtcbiAgICBjb25zdCB0ZXh0QXJlYSA9IG5vZGU7XG4gICAgaWYgKHByb3BzLnZhbHVlKSB7XG4gICAgICAgIGlmIChwcm9wcy52YWx1ZSBpbnN0YW5jZW9mIERhdGFTb3VyY2UpIHtcbiAgICAgICAgICAgIHByb3BzLnZhbHVlLmxpc3RlbkFuZFJlcGVhdCgodikgPT4ge1xuICAgICAgICAgICAgICAgIHRleHRBcmVhLnZhbHVlID0gdjtcbiAgICAgICAgICAgIH0sIGNsZWFuVXApO1xuICAgICAgICAgICAgdGV4dEFyZWEuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcHJvcHMudmFsdWUudXBkYXRlKHRleHRBcmVhLnZhbHVlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHByb3BzLnZhbHVlIGluc3RhbmNlb2YgRHVwbGV4RGF0YVNvdXJjZSkge1xuICAgICAgICAgICAgcHJvcHMudmFsdWUubGlzdGVuQW5kUmVwZWF0KCh2KSA9PiB7XG4gICAgICAgICAgICAgICAgdGV4dEFyZWEudmFsdWUgPSB2O1xuICAgICAgICAgICAgfSwgY2xlYW5VcCk7XG4gICAgICAgICAgICB0ZXh0QXJlYS5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICBwcm9wcy52YWx1ZS51cGRhdGVVcHN0cmVhbSh0ZXh0QXJlYS52YWx1ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRleHRBcmVhLnZhbHVlID0gcHJvcHMudmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG59KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRleHRhcmVhLmpzLm1hcCIsImltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJy4uL2F1cnVtanMuanMnO1xuaW1wb3J0IHsgY3JlYXRlQVBJIH0gZnJvbSAnLi4vcmVuZGVyaW5nL2F1cnVtX2VsZW1lbnQuanMnO1xuaW1wb3J0IHsgQXJyYXlEYXRhU291cmNlLCBEYXRhU291cmNlIH0gZnJvbSAnLi4vc3RyZWFtL2RhdGFfc291cmNlLmpzJztcbmltcG9ydCB7IER1cGxleERhdGFTb3VyY2UgfSBmcm9tICcuLi9zdHJlYW0vZHVwbGV4X2RhdGFfc291cmNlLmpzJztcbmltcG9ydCB7IENhbmNlbGxhdGlvblRva2VuIH0gZnJvbSAnLi4vdXRpbGl0aWVzL2NhbmNlbGxhdGlvbl90b2tlbi5qcyc7XG5pbXBvcnQgeyBoYW5kbGVDbGFzcywgaGFuZGxlU3R5bGUgfSBmcm9tICcuL3JlbmRlcmluZ19oZWxwZXJzLmpzJztcbmV4cG9ydCBjbGFzcyBWRE9NIHtcbiAgICByb290cztcbiAgICBvbkNoYW5nZTtcbiAgICBzZXNzaW9uVG9rZW47XG4gICAgY29uc3RydWN0b3IoYXJncykge1xuICAgICAgICB0aGlzLnJvb3RzID0gYXJncy52ZG9tO1xuICAgICAgICB0aGlzLnNlc3Npb25Ub2tlbiA9IGFyZ3Muc2Vzc2lvblRva2VuO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIH1cbiAgICAqW1N5bWJvbC5pdGVyYXRvcl0oKSB7XG4gICAgICAgIGZvciAoY29uc3Qgbm9kZSBvZiB0aGlzLnJvb3RzKSB7XG4gICAgICAgICAgICB5aWVsZCogdGhpcy5pdGVyYXRlVkRPTShub2RlLCB1bmRlZmluZWQpO1xuICAgICAgICB9XG4gICAgfVxuICAgICppdGVyYXRlVkRPTShub2RlLCBwYXJlbnQpIHtcbiAgICAgICAgaWYgKG5vZGUudHlwZSA9PT0gJ3ZpcnR1YWwnKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGNoaWxkIG9mIG5vZGUuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICB5aWVsZCogdGhpcy5pdGVyYXRlVkRPTShjaGlsZCwgcGFyZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB5aWVsZCB7IG5vZGUsIHBhcmVudCB9O1xuICAgICAgICBpZiAobm9kZS5jaGlsZHJlbikge1xuICAgICAgICAgICAgZm9yIChjb25zdCBjaGlsZCBvZiBub2RlLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgeWllbGQqIHRoaXMuaXRlcmF0ZVZET00oY2hpbGQsIG5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGF1cnVtVG9WRE9NKGNvbnRlbnQsIHNlc3Npb25Ub2tlbikge1xuICAgIGNvbnN0IHJvb3QgPSBuZXcgVkRPTSh7XG4gICAgICAgIHZkb206IFtdLFxuICAgICAgICBzZXNzaW9uVG9rZW5cbiAgICB9KTtcbiAgICBsZXQgcmVuZGVyVG9rZW4gPSBuZXcgQ2FuY2VsbGF0aW9uVG9rZW4oKTtcbiAgICBzZXNzaW9uVG9rZW4uYWRkQ2FuY2VsYWJsZSgoKSA9PiB7XG4gICAgICAgIGlmIChyZW5kZXJUb2tlbikge1xuICAgICAgICAgICAgcmVuZGVyVG9rZW4uY2FuY2VsKCk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBjb25zdCB2aXJ0dWFsUm9vdCA9IHtcbiAgICAgICAgdHlwZTogJ3ZpcnR1YWwnLFxuICAgICAgICBjaGlsZHJlbjogW11cbiAgICB9O1xuICAgIGF1cnVtVG9WRE9NSW50ZXJuYWwoY29udGVudCwgcmVuZGVyVG9rZW4sIHJvb3Qub25DaGFuZ2UsIHZpcnR1YWxSb290KTtcbiAgICByb290LnJvb3RzID0gdmlydHVhbFJvb3QuY2hpbGRyZW47XG4gICAgcmV0dXJuIHJvb3Q7XG59XG5mdW5jdGlvbiBhdXJ1bVRvVkRPTUludGVybmFsKGNvbnRlbnQsIHJlbmRlclRva2VuLCBjaGFuZ2UsIHBhcmVudCkge1xuICAgIGlmIChjb250ZW50ID09PSB1bmRlZmluZWQgfHwgY29udGVudCA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdG9rZW5zOiBbXVxuICAgICAgICB9O1xuICAgIH1cbiAgICBpZiAoQXJyYXkuaXNBcnJheShjb250ZW50KSkge1xuICAgICAgICBjb25zdCByZXN1bHQgPSB7XG4gICAgICAgICAgICBpbnNlcnRBdDogLTEsXG4gICAgICAgICAgICBpbnNlcnRDb3VudDogMCxcbiAgICAgICAgICAgIHRva2VuczogW11cbiAgICAgICAgfTtcbiAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIGNvbnRlbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IG91dHB1dCA9IGF1cnVtVG9WRE9NSW50ZXJuYWwoaXRlbSwgcmVuZGVyVG9rZW4sIGNoYW5nZSwgcGFyZW50KTtcbiAgICAgICAgICAgIHJlc3VsdC50b2tlbnMucHVzaCguLi5vdXRwdXQudG9rZW5zKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBpZiAoY29udGVudCBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgY29uc3QgdmlydHVhbE5vZGUgPSB7XG4gICAgICAgICAgICB0eXBlOiAndmlydHVhbCcsXG4gICAgICAgICAgICBjaGlsZHJlbjogW11cbiAgICAgICAgfTtcbiAgICAgICAgY29udGVudC50aGVuKChjKSA9PiB7XG4gICAgICAgICAgICBhdXJ1bVRvVkRPTUludGVybmFsKGMsIHJlbmRlclRva2VuLCBjaGFuZ2UsIHZpcnR1YWxOb2RlKTtcbiAgICAgICAgICAgIGNoYW5nZS5maXJlKHtcbiAgICAgICAgICAgICAgICBjaGFuZ2VkTm9kZTogcGFyZW50XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHBhcmVudC5jaGlsZHJlbi5wdXNoKHZpcnR1YWxOb2RlKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRva2VuczogW11cbiAgICAgICAgfTtcbiAgICB9XG4gICAgaWYgKFsnbnVtYmVyJywgJ3N0cmluZycsICdiaWdpbnQnLCAnYm9vbGVhbiddLmluY2x1ZGVzKHR5cGVvZiBjb250ZW50KSkge1xuICAgICAgICBwYXJlbnQuY2hpbGRyZW4ucHVzaCh7XG4gICAgICAgICAgICB0eXBlOiAndGV4dCcsXG4gICAgICAgICAgICB0ZXh0OiBjb250ZW50LnRvU3RyaW5nKClcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0b2tlbnM6IFtdXG4gICAgICAgIH07XG4gICAgfVxuICAgIGVsc2UgaWYgKGNvbnRlbnQgaW5zdGFuY2VvZiBEYXRhU291cmNlIHx8IGNvbnRlbnQgaW5zdGFuY2VvZiBEdXBsZXhEYXRhU291cmNlKSB7XG4gICAgICAgIGNvbnN0IHZpcnR1YWxOb2RlID0ge1xuICAgICAgICAgICAgdHlwZTogJ3ZpcnR1YWwnLFxuICAgICAgICAgICAgY2hpbGRyZW46IFtdXG4gICAgICAgIH07XG4gICAgICAgIGNvbnRlbnQubGlzdGVuKCh2KSA9PiB7XG4gICAgICAgICAgICB2aXJ0dWFsTm9kZS5jaGlsZHJlbiA9IFtdO1xuICAgICAgICAgICAgaW5zZXJ0U3RhdHMudG9rZW5zLmZvckVhY2goKHQpID0+IHQuY2FuY2VsKCkpO1xuICAgICAgICAgICAgaW5zZXJ0U3RhdHMgPSBhdXJ1bVRvVkRPTUludGVybmFsKHYsIHJlbmRlclRva2VuLCBjaGFuZ2UsIHZpcnR1YWxOb2RlKTtcbiAgICAgICAgICAgIGNoYW5nZS5maXJlKHtcbiAgICAgICAgICAgICAgICBjaGFuZ2VkTm9kZTogcGFyZW50XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgcmVuZGVyVG9rZW4pO1xuICAgICAgICBwYXJlbnQuY2hpbGRyZW4ucHVzaCh2aXJ0dWFsTm9kZSk7XG4gICAgICAgIGxldCBpbnNlcnRTdGF0cyA9IGF1cnVtVG9WRE9NSW50ZXJuYWwoY29udGVudC52YWx1ZSwgcmVuZGVyVG9rZW4sIGNoYW5nZSwgdmlydHVhbE5vZGUpO1xuICAgICAgICByZXR1cm4gaW5zZXJ0U3RhdHM7XG4gICAgfVxuICAgIGVsc2UgaWYgKGNvbnRlbnQgaW5zdGFuY2VvZiBBcnJheURhdGFTb3VyY2UpIHtcbiAgICAgICAgY29uc3QgdmlydHVhbE5vZGUgPSB7XG4gICAgICAgICAgICB0eXBlOiAndmlydHVhbCcsXG4gICAgICAgICAgICBjaGlsZHJlbjogW11cbiAgICAgICAgfTtcbiAgICAgICAgY29udGVudC5saXN0ZW4oKCkgPT4ge1xuICAgICAgICAgICAgdmlydHVhbE5vZGUuY2hpbGRyZW4gPSBbXTtcbiAgICAgICAgICAgIGluc2VydFN0YXRzLnRva2Vucy5mb3JFYWNoKCh0KSA9PiB0LmNhbmNlbCgpKTtcbiAgICAgICAgICAgIGluc2VydFN0YXRzID0gYXVydW1Ub1ZET01JbnRlcm5hbChjb250ZW50LmdldERhdGEoKSwgcmVuZGVyVG9rZW4sIGNoYW5nZSwgdmlydHVhbE5vZGUpO1xuICAgICAgICAgICAgY2hhbmdlLmZpcmUoe1xuICAgICAgICAgICAgICAgIGNoYW5nZWROb2RlOiBwYXJlbnRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCByZW5kZXJUb2tlbik7XG4gICAgICAgIHBhcmVudC5jaGlsZHJlbi5wdXNoKHZpcnR1YWxOb2RlKTtcbiAgICAgICAgbGV0IGluc2VydFN0YXRzID0gYXVydW1Ub1ZET01JbnRlcm5hbChjb250ZW50LmdldERhdGEoKSwgcmVuZGVyVG9rZW4sIGNoYW5nZSwgdmlydHVhbE5vZGUpO1xuICAgICAgICByZXR1cm4gaW5zZXJ0U3RhdHM7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBjb25zdCBpdGVtID0gY29udGVudDtcbiAgICAgICAgaWYgKCFpdGVtLmlzSW50cmluc2ljKSB7XG4gICAgICAgICAgICBjb25zdCBzZXNzaW9uVG9rZW4gPSBuZXcgQ2FuY2VsbGF0aW9uVG9rZW4oKTtcbiAgICAgICAgICAgIGNvbnN0IHNlc3Npb24gPSB7XG4gICAgICAgICAgICAgICAgYXR0YWNoQ2FsbHM6IFtdLFxuICAgICAgICAgICAgICAgIHNlc3Npb25Ub2tlbjogc2Vzc2lvblRva2VuLFxuICAgICAgICAgICAgICAgIHRva2VuczogW11cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjb25zdCBhcGkgPSBjcmVhdGVBUEkoc2Vzc2lvbik7XG4gICAgICAgICAgICByZW5kZXJUb2tlbi5hZGRDYW5jZWxhYmxlKCgpID0+IHtcbiAgICAgICAgICAgICAgICBzZXNzaW9uVG9rZW4uY2FuY2VsKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNlc3Npb25Ub2tlbi5hZGRDYW5jZWxhYmxlKCgpID0+IHtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHRva2VuIG9mIHNlc3Npb24udG9rZW5zKSB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuLmNhbmNlbCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uc3QgZGF0YSA9IGF1cnVtVG9WRE9NSW50ZXJuYWwoaXRlbS5mYWN0b3J5KGl0ZW0ucHJvcHMsIGl0ZW0uY2hpbGRyZW4sIGFwaSksIHNlc3Npb25Ub2tlbiwgY2hhbmdlLCBwYXJlbnQpO1xuICAgICAgICAgICAgZm9yIChjb25zdCBjYWxsIG9mIHNlc3Npb24uYXR0YWNoQ2FsbHMpIHtcbiAgICAgICAgICAgICAgICBjYWxsKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHRva2VuczogWy4uLmRhdGEudG9rZW5zLCBzZXNzaW9uVG9rZW5dXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSB7XG4gICAgICAgICAgICB0eXBlOiAnZWxlbWVudCcsXG4gICAgICAgICAgICB0YWc6IGl0ZW0ubmFtZSxcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbXVxuICAgICAgICB9O1xuICAgICAgICBlbGVtZW50LmF0dHJpYnV0ZXMgPSBpdGVtLnByb3BzID8gb2JzZXJ2ZUF0dHJpYnV0ZXMoZWxlbWVudCwgaXRlbS5wcm9wcywgcmVuZGVyVG9rZW4sIGNoYW5nZSkgOiB1bmRlZmluZWQ7XG4gICAgICAgIHBhcmVudC5jaGlsZHJlbi5wdXNoKGVsZW1lbnQpO1xuICAgICAgICBpZiAoaXRlbS5wcm9wcz8ub25BdHRhY2gpIHtcbiAgICAgICAgICAgIGl0ZW0ucHJvcHMub25BdHRhY2goKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXRlbS5wcm9wcz8ub25EZXRhY2gpIHtcbiAgICAgICAgICAgIHJlbmRlclRva2VuLmFkZENhbmNlbGFibGUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGl0ZW0ucHJvcHMub25EZXRhY2goKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpdGVtLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICBhdXJ1bVRvVkRPTUludGVybmFsKGl0ZW0uY2hpbGRyZW4sIHJlbmRlclRva2VuLCBjaGFuZ2UsIGVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0b2tlbnM6IFtdXG4gICAgICAgIH07XG4gICAgfVxufVxuZnVuY3Rpb24gb2JzZXJ2ZUF0dHJpYnV0ZXMobm9kZSwgcHJvcHMsIHJlbmRlclRva2VuLCBjaGFuZ2UpIHtcbiAgICBjb25zdCByZXN1bHQgPSB7fTtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBwcm9wcykge1xuICAgICAgICBsZXQgZWxlbWVudDtcbiAgICAgICAgaWYgKHByb3BzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgIGlmIChrZXkgPT09ICdzdHlsZScpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0gaGFuZGxlU3R5bGUocHJvcHNba2V5XSwgcmVuZGVyVG9rZW4pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoa2V5ID09PSAnY2xhc3MnKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudCA9IGhhbmRsZUNsYXNzKHByb3BzW2tleV0sIHJlbmRlclRva2VuKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBwcm9wc1trZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBEYXRhU291cmNlKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5saXN0ZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHRba2V5XSA9IGVsZW1lbnQudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZS5maXJlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZWROb2RlOiBub2RlXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0sIHJlbmRlclRva2VuKTtcbiAgICAgICAgICAgICAgICByZXN1bHRba2V5XSA9IGVsZW1lbnQudmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChlbGVtZW50IGluc3RhbmNlb2YgRHVwbGV4RGF0YVNvdXJjZSkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQubGlzdGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0W2tleV0gPSBlbGVtZW50LnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBjaGFuZ2UuZmlyZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2VkTm9kZTogbm9kZVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9LCByZW5kZXJUb2tlbik7XG4gICAgICAgICAgICAgICAgcmVzdWx0W2tleV0gPSBlbGVtZW50LnZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIEFycmF5RGF0YVNvdXJjZSkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQubGlzdGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0W2tleV0gPSBlbGVtZW50LmdldERhdGEoKS5qb2luKCc7Jyk7XG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZS5maXJlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZWROb2RlOiBub2RlXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0sIHJlbmRlclRva2VuKTtcbiAgICAgICAgICAgICAgICByZXN1bHRba2V5XSA9IGVsZW1lbnQuZ2V0RGF0YSgpLmpvaW4oJzsnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlc3VsdFtrZXldID0gZWxlbWVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dmRvbV9hZGFwdGVyLmpzLm1hcCIsImltcG9ydCB7IGRpYWdub3N0aWNNb2RlIH0gZnJvbSAnLi4vZGVidWdfbW9kZS5qcyc7XG5pbXBvcnQgeyBBcnJheURhdGFTb3VyY2UsIERhdGFTb3VyY2UgfSBmcm9tICcuLi9zdHJlYW0vZGF0YV9zb3VyY2UuanMnO1xuaW1wb3J0IHsgRHVwbGV4RGF0YVNvdXJjZSB9IGZyb20gJy4uL3N0cmVhbS9kdXBsZXhfZGF0YV9zb3VyY2UuanMnO1xuaW1wb3J0IHsgQ2FuY2VsbGF0aW9uVG9rZW4gfSBmcm9tICcuLi91dGlsaXRpZXMvY2FuY2VsbGF0aW9uX3Rva2VuLmpzJztcbmltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJy4uL3V0aWxpdGllcy9ldmVudF9lbWl0dGVyLmpzJztcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVSZW5kZXJTZXNzaW9uKCkge1xuICAgIGNvbnN0IHNlc3Npb24gPSB7XG4gICAgICAgIGF0dGFjaENhbGxzOiBbXSxcbiAgICAgICAgc2Vzc2lvblRva2VuOiBuZXcgQ2FuY2VsbGF0aW9uVG9rZW4oKCkgPT4ge1xuICAgICAgICAgICAgZm9yIChjb25zdCB0b2tlbiBvZiBzZXNzaW9uLnRva2Vucykge1xuICAgICAgICAgICAgICAgIHRva2VuLmNhbmNlbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KSxcbiAgICAgICAgdG9rZW5zOiBbXVxuICAgIH07XG4gICAgcmV0dXJuIHNlc3Npb247XG59XG5leHBvcnQgY29uc3QgYXVydW1FbGVtZW50TW9kZWxJZGVudGl0aXkgPSBTeW1ib2woJ0F1cnVtRWxlbWVudE1vZGVsJyk7XG5leHBvcnQgY29uc3Qgbm9kZURhdGEgPSBuZXcgV2Vha01hcCgpO1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUxpZmVDeWNsZSgpIHtcbiAgICBjb25zdCBsYyA9IHtcbiAgICAgICAgYXR0YWNoOiBuZXcgRXZlbnRFbWl0dGVyKCksXG4gICAgICAgIGRldGFjaDogbmV3IEV2ZW50RW1pdHRlcigpLFxuICAgICAgICBvbkF0dGFjaCgpIHtcbiAgICAgICAgICAgIGxjLmF0dGFjaC5maXJlKCk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uRGV0YWNoKCkge1xuICAgICAgICAgICAgbGMuZGV0YWNoLmZpcmUoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIGxjO1xufVxuZXhwb3J0IGNsYXNzIEF1cnVtRWxlbWVudCB7XG4gICAgY2hpbGRyZW47XG4gICAgYXBpO1xuICAgIHN0YXRpYyBpZCA9IDE7XG4gICAgY29udGVudFN0YXJ0TWFya2VyO1xuICAgIGNvbnRlbnRFbmRNYXJrZXI7XG4gICAgaG9zdE5vZGU7XG4gICAgbGFzdFN0YXJ0SW5kZXg7XG4gICAgbGFzdEVuZEluZGV4O1xuICAgIGRpc3Bvc2VkID0gZmFsc2U7XG4gICAgY29uc3RydWN0b3IoZGF0YVNvdXJjZSwgYXBpKSB7XG4gICAgICAgIHRoaXMuY2hpbGRyZW4gPSBbXTtcbiAgICAgICAgdGhpcy5hcGkgPSBhcGk7XG4gICAgICAgIHRoaXMuYXBpLm9uQXR0YWNoKCgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmhvc3ROb2RlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2lsbGVnYWwgc3RhdGU6IEF0dGFjaCBmaXJlZCBidXQgbm90IGFjdHVhbGx5IGF0dGFjaGVkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnJlbmRlcihkYXRhU291cmNlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGRpc3Bvc2UoKSB7XG4gICAgICAgIGlmICh0aGlzLmRpc3Bvc2VkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaG9zdE5vZGUuaXNDb25uZWN0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJDb250ZW50KCk7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnRTdGFydE1hcmtlci5yZW1vdmUoKTtcbiAgICAgICAgICAgIHRoaXMuY29udGVudEVuZE1hcmtlci5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRpc3Bvc2VkID0gdHJ1ZTtcbiAgICB9XG4gICAgYXR0YWNoVG9Eb20obm9kZSwgaW5kZXgpIHtcbiAgICAgICAgaWYgKHRoaXMuaG9zdE5vZGUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQXVydW0gRWxlbWVudCBpcyBhbHJlYWR5IGF0dGFjaGVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaWQgPSBBdXJ1bUVsZW1lbnQuaWQrKztcbiAgICAgICAgdGhpcy5ob3N0Tm9kZSA9IG5vZGU7XG4gICAgICAgIHRoaXMuY29udGVudFN0YXJ0TWFya2VyID0gZG9jdW1lbnQuY3JlYXRlQ29tbWVudCgnU1RBUlQgQXVydW0gTm9kZSAnICsgaWQpO1xuICAgICAgICAvL0B0cy1pZ25vcmVcbiAgICAgICAgdGhpcy5jb250ZW50U3RhcnRNYXJrZXIub3duZXIgPSB0aGlzO1xuICAgICAgICB0aGlzLmNvbnRlbnRFbmRNYXJrZXIgPSBkb2N1bWVudC5jcmVhdGVDb21tZW50KCdFTkQgQXVydW0gTm9kZSAnICsgaWQpO1xuICAgICAgICBpZiAoaW5kZXggPj0gbm9kZS5jaGlsZE5vZGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgbm9kZS5hcHBlbmRDaGlsZCh0aGlzLmNvbnRlbnRTdGFydE1hcmtlcik7XG4gICAgICAgICAgICBub2RlLmFwcGVuZENoaWxkKHRoaXMuY29udGVudEVuZE1hcmtlcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBub2RlLmluc2VydEJlZm9yZSh0aGlzLmNvbnRlbnRTdGFydE1hcmtlciwgbm9kZS5jaGlsZE5vZGVzW2luZGV4XSk7XG4gICAgICAgICAgICBub2RlLmluc2VydEJlZm9yZSh0aGlzLmNvbnRlbnRFbmRNYXJrZXIsIG5vZGUuY2hpbGROb2Rlc1tpbmRleCArIDFdKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXRTdGFydEluZGV4KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRXb3JrSW5kZXgoKSAtIDE7XG4gICAgfVxuICAgIGdldFdvcmtJbmRleCgpIHtcbiAgICAgICAgaWYgKHRoaXMubGFzdFN0YXJ0SW5kZXggIT09IHVuZGVmaW5lZCAmJiB0aGlzLmhvc3ROb2RlLmNoaWxkTm9kZXNbdGhpcy5sYXN0U3RhcnRJbmRleF0gPT09IHRoaXMuY29udGVudFN0YXJ0TWFya2VyKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sYXN0U3RhcnRJbmRleCArIDE7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmhvc3ROb2RlLmNoaWxkTm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmhvc3ROb2RlLmNoaWxkTm9kZXNbaV0gPT09IHRoaXMuY29udGVudFN0YXJ0TWFya2VyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sYXN0U3RhcnRJbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGkgKyAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAtMTtcbiAgICB9XG4gICAgZ2V0TGFzdEluZGV4KCkge1xuICAgICAgICBpZiAodGhpcy5sYXN0RW5kSW5kZXggIT09IHVuZGVmaW5lZCAmJiB0aGlzLmhvc3ROb2RlLmNoaWxkTm9kZXNbdGhpcy5sYXN0RW5kSW5kZXhdID09PSB0aGlzLmNvbnRlbnRFbmRNYXJrZXIpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxhc3RFbmRJbmRleDtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuaG9zdE5vZGUuY2hpbGROb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHRoaXMuaG9zdE5vZGUuY2hpbGROb2Rlc1tpXSA9PT0gdGhpcy5jb250ZW50RW5kTWFya2VyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sYXN0RW5kSW5kZXggPSBpO1xuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAtMTtcbiAgICB9XG4gICAgY2xlYXJDb250ZW50KCkge1xuICAgICAgICBpZiAodGhpcy5ob3N0Tm9kZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2lsbGVnYWwgc3RhdGU6IEF1cnVtIGVsZW1lbnQgd2FzIG5vdCBhdHRjaGVkIHRvIGFueXRoaW5nJyk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHdvcmtJbmRleCA9IHRoaXMuZ2V0V29ya0luZGV4KCk7XG4gICAgICAgIHdoaWxlICh0aGlzLmhvc3ROb2RlLmNoaWxkTm9kZXNbd29ya0luZGV4XSAhPT0gdGhpcy5jb250ZW50RW5kTWFya2VyKSB7XG4gICAgICAgICAgICBpZiAoISh0aGlzLmhvc3ROb2RlLmNoaWxkTm9kZXNbd29ya0luZGV4XSBpbnN0YW5jZW9mIENvbW1lbnQpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ob3N0Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLmhvc3ROb2RlLmNoaWxkTm9kZXNbd29ya0luZGV4XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ob3N0Tm9kZS5jaGlsZE5vZGVzW3dvcmtJbmRleF0ub3duZXIuZGlzcG9zZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgIHRoaXMuaG9zdE5vZGUuY2hpbGROb2Rlc1t3b3JrSW5kZXhdLm93bmVyLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICB1cGRhdGVEb20oKSB7XG4gICAgICAgIGNvbnN0IHdvcmtJbmRleCA9IHRoaXMuZ2V0V29ya0luZGV4KCk7XG4gICAgICAgIGxldCBpO1xuICAgICAgICBsZXQgb2Zmc2V0ID0gMDtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkID0gdGhpcy5jaGlsZHJlbltpXTtcbiAgICAgICAgICAgIGlmIChjaGlsZCA9PT0gdW5kZWZpbmVkIHx8IGNoaWxkID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgb2Zmc2V0LS07XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY2hpbGQgPT09IHRoaXMuaG9zdE5vZGUuY2hpbGROb2Rlc1tpICsgd29ya0luZGV4ICsgb2Zmc2V0XSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgQXVydW1FbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgaWYgKCFjaGlsZC5ob3N0Tm9kZSkge1xuICAgICAgICAgICAgICAgICAgICBjaGlsZC5hdHRhY2hUb0RvbSh0aGlzLmhvc3ROb2RlLCBpICsgd29ya0luZGV4ICsgb2Zmc2V0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkLmdldFN0YXJ0SW5kZXgoKSA9PT0gaSArIHdvcmtJbmRleCArIG9mZnNldCkge1xuICAgICAgICAgICAgICAgICAgICBvZmZzZXQgKz0gY2hpbGQuZ2V0TGFzdEluZGV4KCkgLSBpIC0gb2Zmc2V0IC0gd29ya0luZGV4O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN0YXJ0ID0gY2hpbGQuZ2V0U3RhcnRJbmRleCgpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgZW5kID0gY2hpbGQuZ2V0TGFzdEluZGV4KCk7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHB0ciA9IHN0YXJ0LCBzd2FwSXRlcmF0aW9uID0gMDsgcHRyIDw9IGVuZDsgcHRyKyssIHN3YXBJdGVyYXRpb24rKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbUEgPSB0aGlzLmhvc3ROb2RlLmNoaWxkTm9kZXNbaSArIHdvcmtJbmRleCArIG9mZnNldCArIHN3YXBJdGVyYXRpb25dO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbUIgPSB0aGlzLmhvc3ROb2RlLmNoaWxkTm9kZXNbcHRyXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcmVudEEgPSBpdGVtQS5wYXJlbnROb2RlO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2libGluZ0EgPSBpdGVtQS5uZXh0U2libGluZyA9PT0gaXRlbUIgPyBpdGVtQiA6IGl0ZW1BLm5leHRTaWJsaW5nO1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbUIucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoaXRlbUEsIGl0ZW1CKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudEEuaW5zZXJ0QmVmb3JlKGl0ZW1CLCBzaWJsaW5nQSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0ICs9IGNoaWxkLmdldExhc3RJbmRleCgpIC0gaSAtIG9mZnNldCAtIHdvcmtJbmRleDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5ob3N0Tm9kZS5jaGlsZE5vZGVzW2kgKyB3b3JrSW5kZXggKyBvZmZzZXRdICE9PSB0aGlzLmNvbnRlbnRFbmRNYXJrZXIgJiZcbiAgICAgICAgICAgICAgICB0aGlzLmhvc3ROb2RlLmNoaWxkTm9kZXNbaSArIHdvcmtJbmRleCArIG9mZnNldF0gIT09IHRoaXMuY2hpbGRyZW5baV0gJiZcbiAgICAgICAgICAgICAgICB0aGlzLmhvc3ROb2RlLmNoaWxkTm9kZXNbaSArIHdvcmtJbmRleCArIG9mZnNldF0gIT09IHRoaXMuY2hpbGRyZW5baSArIDFdPy5jb250ZW50U3RhcnRNYXJrZXIpIHtcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCB8fCBjaGlsZCBpbnN0YW5jZW9mIFRleHQgfHwgY2hpbGQgaW5zdGFuY2VvZiBTVkdFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaG9zdE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5ob3N0Tm9kZS5jaGlsZE5vZGVzW2kgKyB3b3JrSW5kZXggKyBvZmZzZXRdKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaG9zdE5vZGUuY2hpbGROb2Rlc1tpICsgd29ya0luZGV4ICsgb2Zmc2V0XSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXN0RW5kSW5kZXgrKztcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaG9zdE5vZGUuaW5zZXJ0QmVmb3JlKGNoaWxkLCB0aGlzLmhvc3ROb2RlLmNoaWxkTm9kZXNbaSArIHdvcmtJbmRleCArIG9mZnNldF0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXN0RW5kSW5kZXgrKztcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaG9zdE5vZGUuYXBwZW5kQ2hpbGQoY2hpbGQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vdCBpbXBsZW1lbnRlZCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50IHx8IGNoaWxkIGluc3RhbmNlb2YgVGV4dCB8fCBjaGlsZCBpbnN0YW5jZW9mIFNWR0VsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaG9zdE5vZGUuY2hpbGROb2Rlc1tpICsgd29ya0luZGV4ICsgb2Zmc2V0XSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXN0RW5kSW5kZXgrKztcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaG9zdE5vZGUuaW5zZXJ0QmVmb3JlKGNoaWxkLCB0aGlzLmhvc3ROb2RlLmNoaWxkTm9kZXNbaSArIHdvcmtJbmRleCArIG9mZnNldF0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXN0RW5kSW5kZXgrKztcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaG9zdE5vZGUuYXBwZW5kQ2hpbGQoY2hpbGQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vdCBpbXBsZW1lbnRlZCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB3aGlsZSAodGhpcy5ob3N0Tm9kZS5jaGlsZE5vZGVzW2kgKyB3b3JrSW5kZXggKyBvZmZzZXRdICE9PSB0aGlzLmNvbnRlbnRFbmRNYXJrZXIpIHtcbiAgICAgICAgICAgIHRoaXMubGFzdEVuZEluZGV4LS07XG4gICAgICAgICAgICB0aGlzLmhvc3ROb2RlLnJlbW92ZUNoaWxkKHRoaXMuaG9zdE5vZGUuY2hpbGROb2Rlc1tpICsgd29ya0luZGV4ICsgb2Zmc2V0XSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVySW50ZXJuYWwoZWxlbWVudCwgc2Vzc2lvbiwgcHJlcmVuZGVyaW5nID0gZmFsc2UpIHtcbiAgICBpZiAoZWxlbWVudCA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZWxlbWVudCkpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBlbGVtZW50KSB7XG4gICAgICAgICAgICBjb25zdCByZW5kZXJlZCA9IHJlbmRlckludGVybmFsKGl0ZW0sIHNlc3Npb24sIHByZXJlbmRlcmluZyk7XG4gICAgICAgICAgICAvLyBGbGF0dGVuIHRoZSByZW5kZXJlZCBjb250ZW50IGludG8gYSBzaW5nbGUgYXJyYXkgdG8gYXZvaWQgaGF2aW5nIHRvIGl0ZXJhdGUgb3ZlciBuZXN0ZWQgYXJyYXlzIGxhdGVyXG4gICAgICAgICAgICBpZiAocmVuZGVyZWQgIT09IHVuZGVmaW5lZCAmJiByZW5kZXJlZCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHJlbmRlcmVkKSkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaCguLi5yZW5kZXJlZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChyZW5kZXJlZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIGlmICghcHJlcmVuZGVyaW5nKSB7XG4gICAgICAgIGNvbnN0IHR5cGUgPSB0eXBlb2YgZWxlbWVudDtcbiAgICAgICAgaWYgKHR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoZWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PT0gJ251bWJlcicgfHwgdHlwZSA9PT0gJ2JpZ2ludCcgfHwgdHlwZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoZWxlbWVudC50b1N0cmluZygpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgICAgIGNvbnN0IGRzID0gbmV3IERhdGFTb3VyY2UoKTtcbiAgICAgICAgICAgIGVsZW1lbnQudGhlbigodmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgZHMudXBkYXRlKHZhbCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBTaW5ndWxhckF1cnVtRWxlbWVudChkcywgY3JlYXRlQVBJKHNlc3Npb24pKTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIERhdGFTb3VyY2UgfHwgZWxlbWVudCBpbnN0YW5jZW9mIER1cGxleERhdGFTb3VyY2UpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBTaW5ndWxhckF1cnVtRWxlbWVudChlbGVtZW50LCBjcmVhdGVBUEkoc2Vzc2lvbikpO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChlbGVtZW50IGluc3RhbmNlb2YgQXJyYXlEYXRhU291cmNlKSB7XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBuZXcgQXJyYXlBdXJ1bUVsZW1lbnQoZWxlbWVudCwgY3JlYXRlQVBJKHNlc3Npb24pKTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKGVsZW1lbnRbYXVydW1FbGVtZW50TW9kZWxJZGVudGl0aXldKSB7XG4gICAgICAgIGNvbnN0IG1vZGVsID0gZWxlbWVudDtcbiAgICAgICAgbGV0IGFwaTtcbiAgICAgICAgLy9PcHRpbWl6YXRpb246IHNraXAgY3JlYXRpbmcgQVBJIGZvciBubyBwcm9wcyBiYXNpYyBodG1sIG5vZGVzIGJlY2F1c2UgdGhleSBhcmUgYnkgZmFyIHRoZSBtb3N0IGZyZXF1ZW50IGFuZCB0aGlzIGNhbiB5aWVsZCBhIG5vdGljYWJsZSBwZXJmb3JtYW5jZSBpbmNyZWFzZVxuICAgICAgICBpZiAoIW1vZGVsLmlzSW50cmluc2ljIHx8IG1vZGVsLnByb3BzKSB7XG4gICAgICAgICAgICBhcGkgPSBjcmVhdGVBUEkoc2Vzc2lvbik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBhcGkgPSB7XG4gICAgICAgICAgICAgICAgcmVuZGVyU2Vzc2lvbjogc2Vzc2lvblxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIW1vZGVsLmlzSW50cmluc2ljICYmIGRpYWdub3N0aWNNb2RlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgUmVuZGVyaW5nICR7bW9kZWwubmFtZX1gKTtcbiAgICAgICAgICAgIGFwaS5vbkF0dGFjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYEF0dGFjaGluZyAke21vZGVsLm5hbWV9YCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGFwaS5vbkRldGFjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYERldGFjaGluZyAke21vZGVsLm5hbWV9YCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgY29tcG9uZW50UmVzdWx0O1xuICAgICAgICBpZiAobW9kZWwuaXNJbnRyaW5zaWMpIHtcbiAgICAgICAgICAgIGNvbXBvbmVudFJlc3VsdCA9IG1vZGVsLmZhY3RvcnkobW9kZWwucHJvcHMsIG1vZGVsLmNoaWxkcmVuLCBhcGkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29tcG9uZW50UmVzdWx0ID0gbW9kZWwuZmFjdG9yeShtb2RlbC5wcm9wcyA/PyB7fSwgbW9kZWwuY2hpbGRyZW4sIGFwaSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlbmRlckludGVybmFsKGNvbXBvbmVudFJlc3VsdCwgc2Vzc2lvbiwgcHJlcmVuZGVyaW5nKTtcbiAgICB9XG4gICAgLy8gVW5zdXBwb3J0ZWQgdHlwZXMgYXJlIHJldHVybmVkIGFzIGlzIGluIGhvcGUgdGhhdCBhIHRyYW5zY2x1c2lvbiBjb21wb25lbnQgd2lsbCB0cmFuc2Zvcm0gaXQgaW50byBzb21ldGhpbmcgY29tcGF0aWJsZVxuICAgIHJldHVybiBlbGVtZW50O1xufVxuLyoqXG4gKiBAaW50ZXJuYWxcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUFQSShzZXNzaW9uKSB7XG4gICAgbGV0IHRva2VuID0gdW5kZWZpbmVkO1xuICAgIGNvbnN0IGFwaSA9IHtcbiAgICAgICAgcmVuZGVyU2Vzc2lvbjogc2Vzc2lvbixcbiAgICAgICAgc3luY2hyb25pemVMaWZlQ3ljbGUobGlmZUN5Y2xlKSB7XG4gICAgICAgICAgICBhcGkub25BdHRhY2goKCkgPT4gbGlmZUN5Y2xlLm9uQXR0YWNoKCkpO1xuICAgICAgICAgICAgYXBpLm9uRGV0YWNoKCgpID0+IGxpZmVDeWNsZS5vbkRldGFjaCgpKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25BdHRhY2g6IChjYikgPT4ge1xuICAgICAgICAgICAgc2Vzc2lvbi5hdHRhY2hDYWxscy5wdXNoKGNiKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25EZXRhY2g6IChjYikgPT4ge1xuICAgICAgICAgICAgaWYgKCF0b2tlbikge1xuICAgICAgICAgICAgICAgIHRva2VuID0gbmV3IENhbmNlbGxhdGlvblRva2VuKCk7XG4gICAgICAgICAgICAgICAgc2Vzc2lvbi50b2tlbnMucHVzaCh0b2tlbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0b2tlbi5hZGRDYW5jZWxhYmxlKGNiKTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0IGNhbmNlbGxhdGlvblRva2VuKCkge1xuICAgICAgICAgICAgaWYgKCF0b2tlbikge1xuICAgICAgICAgICAgICAgIHRva2VuID0gbmV3IENhbmNlbGxhdGlvblRva2VuKCk7XG4gICAgICAgICAgICAgICAgc2Vzc2lvbi50b2tlbnMucHVzaCh0b2tlbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdG9rZW47XG4gICAgICAgIH0sXG4gICAgICAgIHByZXJlbmRlcih0YXJnZXQsIGxpZmVDeWNsZSkge1xuICAgICAgICAgICAgY29uc3QgbGMgPSBsaWZlQ3ljbGU7XG4gICAgICAgICAgICBjb25zdCBzdWJTZXNzaW9uID0gY3JlYXRlUmVuZGVyU2Vzc2lvbigpO1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gcmVuZGVySW50ZXJuYWwodGFyZ2V0LCBzdWJTZXNzaW9uLCB0cnVlKTtcbiAgICAgICAgICAgIGxjLmF0dGFjaC5zdWJzY3JpYmVPbmNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICBzdWJTZXNzaW9uLmF0dGFjaENhbGxzLmZvckVhY2goKGNiKSA9PiBjYigpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbGMuZGV0YWNoLnN1YnNjcmliZU9uY2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxjLmF0dGFjaC5jYW5jZWxBbGwoKTtcbiAgICAgICAgICAgICAgICBzdWJTZXNzaW9uLnNlc3Npb25Ub2tlbi5jYW5jZWwoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIGFwaTtcbn1cbmV4cG9ydCBjbGFzcyBBcnJheUF1cnVtRWxlbWVudCBleHRlbmRzIEF1cnVtRWxlbWVudCB7XG4gICAgcmVuZGVyU2Vzc2lvbnM7XG4gICAgZGF0YVNvdXJjZTtcbiAgICBjb25zdHJ1Y3RvcihkYXRhU291cmNlLCBhcGkpIHtcbiAgICAgICAgc3VwZXIoZGF0YVNvdXJjZSwgYXBpKTtcbiAgICAgICAgdGhpcy5yZW5kZXJTZXNzaW9ucyA9IG5ldyBXZWFrTWFwKCk7XG4gICAgICAgIHRoaXMuZGF0YVNvdXJjZSA9IGRhdGFTb3VyY2U7XG4gICAgfVxuICAgIGRpc3Bvc2UoKSB7XG4gICAgICAgIGlmICh0aGlzLmRpc3Bvc2VkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hcGkuY2FuY2VsbGF0aW9uVG9rZW4uY2FuY2VsKCk7XG4gICAgICAgIHN1cGVyLmRpc3Bvc2UoKTtcbiAgICB9XG4gICAgYXR0YWNoVG9Eb20obm9kZSwgaW5kZXgpIHtcbiAgICAgICAgc3VwZXIuYXR0YWNoVG9Eb20obm9kZSwgaW5kZXgpO1xuICAgICAgICAvL0B0cy1pZ25vcmVcbiAgICAgICAgdGhpcy5jb250ZW50U3RhcnRNYXJrZXIuZGF0YVNvdXJjZSA9IHRoaXMuZGF0YVNvdXJjZTtcbiAgICAgICAgLy9AdHMtaWdub3JlXG4gICAgICAgIHRoaXMuY29udGVudEVuZE1hcmtlci5kYXRhU291cmNlID0gdGhpcy5kYXRhU291cmNlO1xuICAgIH1cbiAgICByZW5kZXIoZGF0YVNvdXJjZSkge1xuICAgICAgICBkYXRhU291cmNlLmxpc3RlbkFuZFJlcGVhdCgobikgPT4ge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmRpc3Bvc2VkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVOZXdDb250ZW50KG4pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0aGlzLmFwaS5jYW5jZWxsYXRpb25Ub2tlbik7XG4gICAgfVxuICAgIHNwbGljZUNoaWxkcmVuKGluZGV4LCBhbW91bnQsIC4uLm5ld0l0ZW1zKSB7XG4gICAgICAgIGxldCByZW1vdmVkO1xuICAgICAgICBpZiAobmV3SXRlbXMpIHtcbiAgICAgICAgICAgIHJlbW92ZWQgPSB0aGlzLmNoaWxkcmVuLnNwbGljZShpbmRleCwgYW1vdW50LCAuLi5uZXdJdGVtcyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZW1vdmVkID0gdGhpcy5jaGlsZHJlbi5zcGxpY2UoaW5kZXgsIGFtb3VudCk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIHJlbW92ZWQpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyU2Vzc2lvbnMuZ2V0KGl0ZW0pPy5zZXNzaW9uVG9rZW4uY2FuY2VsKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaGFuZGxlTmV3Q29udGVudChjaGFuZ2UpIHtcbiAgICAgICAgaWYgKHRoaXMuaG9zdE5vZGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbGxlZ2FsIHN0YXRlOiBBdXJ1bSBlbGVtZW50IHdhcyBub3QgYXR0Y2hlZCB0byBhbnl0aGluZycpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBvcHRpbWl6ZWQgPSBmYWxzZTtcbiAgICAgICAgY29uc3QgYWMgPSBbXTtcbiAgICAgICAgc3dpdGNoIChjaGFuZ2Uub3BlcmF0aW9uRGV0YWlsZWQpIHtcbiAgICAgICAgICAgIGNhc2UgJ21lcmdlJzpcbiAgICAgICAgICAgICAgICBjb25zdCBzb3VyY2UgPSBjaGFuZ2UucHJldmlvdXNTdGF0ZS5zbGljZSgpO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hhbmdlLm5ld1N0YXRlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNoaWxkcmVuLmxlbmd0aCA8PSBpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZW5kZXJlZCA9IHRoaXMucmVuZGVySXRlbShjaGFuZ2UubmV3U3RhdGVbaV0sIGFjKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHJlbmRlcmVkKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hpbGRyZW4ucHVzaCguLi5yZW5kZXJlZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoaWxkcmVuLnB1c2gocmVuZGVyZWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlLnB1c2goY2hhbmdlLm5ld1N0YXRlW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChzb3VyY2VbaV0gIT09IGNoYW5nZS5uZXdTdGF0ZVtpXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSBzb3VyY2UuaW5kZXhPZihjaGFuZ2UubmV3U3RhdGVbaV0sIGkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGEgPSB0aGlzLmNoaWxkcmVuW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGIgPSB0aGlzLmNoaWxkcmVuW2luZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoaWxkcmVuW2ldID0gYjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoaWxkcmVuW2luZGV4XSA9IGE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYyA9IHNvdXJjZVtpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkID0gc291cmNlW2luZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2VbaV0gPSBkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZVtpbmRleF0gPSBjO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVuZGVyZWQgPSB0aGlzLnJlbmRlckl0ZW0oY2hhbmdlLm5ld1N0YXRlW2ldLCBhYyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocmVuZGVyZWQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3BsaWNlQ2hpbGRyZW4oaSwgMCwgLi4ucmVuZGVyZWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zcGxpY2VDaGlsZHJlbihpLCAwLCByZW5kZXJlZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZS5zcGxpY2UoaSwgMCwgY2hhbmdlLm5ld1N0YXRlW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jaGlsZHJlbi5sZW5ndGggPiBjaGFuZ2UubmV3U3RhdGUubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3BsaWNlQ2hpbGRyZW4oY2hhbmdlLm5ld1N0YXRlLmxlbmd0aCwgdGhpcy5jaGlsZHJlbi5sZW5ndGggLSBjaGFuZ2UubmV3U3RhdGUubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdyZW1vdmUnOlxuICAgICAgICAgICAgY2FzZSAncmVtb3ZlTGVmdCc6XG4gICAgICAgICAgICBjYXNlICdyZW1vdmVSaWdodCc6XG4gICAgICAgICAgICAgICAgdGhpcy5zcGxpY2VDaGlsZHJlbihmbGF0dGVuSW5kZXgoY2hhbmdlLm5ld1N0YXRlLCBjaGFuZ2UuaW5kZXgpLCBmbGF0dGVuSW5kZXgoY2hhbmdlLml0ZW1zLCBjaGFuZ2UuaXRlbXMubGVuZ3RoKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdhcHBlbmQnOlxuICAgICAgICAgICAgICAgIGxldCB0YXJnZXRJbmRleCA9IHRoaXMuZ2V0TGFzdEluZGV4KCk7XG4gICAgICAgICAgICAgICAgb3B0aW1pemVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgY2hhbmdlLml0ZW1zKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlbmRlcmVkID0gdGhpcy5yZW5kZXJJdGVtKGl0ZW0sIGFjKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocmVuZGVyZWQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoaWxkcmVuID0gdGhpcy5jaGlsZHJlbi5jb25jYXQocmVuZGVyZWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gcmVuZGVyZWQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVuZGVyZWRbaV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlbmRlcmVkW2ldIGluc3RhbmNlb2YgQXVydW1FbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW5kZXJlZFtpXS5hdHRhY2hUb0RvbSh0aGlzLmhvc3ROb2RlLCB0YXJnZXRJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxhc3RFbmRJbmRleCA9IHRoaXMuZ2V0TGFzdEluZGV4KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRJbmRleCA9IHRoaXMubGFzdEVuZEluZGV4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ob3N0Tm9kZS5pbnNlcnRCZWZvcmUocmVuZGVyZWRbaV0sIHRoaXMuaG9zdE5vZGUuY2hpbGROb2Rlc1t0YXJnZXRJbmRleF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXN0RW5kSW5kZXgrKztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldEluZGV4Kys7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoaWxkcmVuLnB1c2gocmVuZGVyZWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlbmRlcmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlbmRlcmVkIGluc3RhbmNlb2YgQXVydW1FbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbmRlcmVkLmF0dGFjaFRvRG9tKHRoaXMuaG9zdE5vZGUsIHRhcmdldEluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXN0RW5kSW5kZXggPSB0aGlzLmdldExhc3RJbmRleCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRJbmRleCA9IHRoaXMubGFzdEVuZEluZGV4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ob3N0Tm9kZS5pbnNlcnRCZWZvcmUocmVuZGVyZWQsIHRoaXMuaG9zdE5vZGUuY2hpbGROb2Rlc1t0YXJnZXRJbmRleF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxhc3RFbmRJbmRleCsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRJbmRleCsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3JlcGxhY2UnOlxuICAgICAgICAgICAgICAgIGNvbnN0IHJlbmRlcmVkID0gdGhpcy5yZW5kZXJJdGVtKGNoYW5nZS5pdGVtc1swXSwgYWMpO1xuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHJlbmRlcmVkKSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2lsbGVnYWwgc3RhdGUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hpbGRyZW5bY2hhbmdlLmluZGV4XSA9IHJlbmRlcmVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3N3YXAnOlxuICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW1BID0gdGhpcy5jaGlsZHJlbltjaGFuZ2UuaW5kZXhdO1xuICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW1CID0gdGhpcy5jaGlsZHJlbltjaGFuZ2UuaW5kZXgyXTtcbiAgICAgICAgICAgICAgICBpZiAoKGl0ZW1BIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgJiYgaXRlbUIgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkgfHwgKGl0ZW1BIGluc3RhbmNlb2YgU1ZHRWxlbWVudCAmJiBpdGVtQiBpbnN0YW5jZW9mIFNWR0VsZW1lbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdGltaXplZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtQS5wYXJlbnRFbGVtZW50ID09PSBpdGVtQi5wYXJlbnRFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbUEubmV4dFNpYmxpbmcgPT09IGl0ZW1CKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbUIucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoaXRlbUIsIGl0ZW1BKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoaWxkcmVuW2NoYW5nZS5pbmRleDJdID0gaXRlbUE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGlsZHJlbltjaGFuZ2UuaW5kZXhdID0gaXRlbUI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbUIubmV4dFNpYmxpbmcgPT09IGl0ZW1BKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbUIucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoaXRlbUEsIGl0ZW1CKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoaWxkcmVuW2NoYW5nZS5pbmRleDJdID0gaXRlbUE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGlsZHJlbltjaGFuZ2UuaW5kZXhdID0gaXRlbUI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFyZW50QSA9IGl0ZW1BLnBhcmVudE5vZGU7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNpYmxpbmdBID0gaXRlbUEubmV4dFNpYmxpbmcgPT09IGl0ZW1CID8gaXRlbUIgOiBpdGVtQS5uZXh0U2libGluZztcbiAgICAgICAgICAgICAgICAgICAgaXRlbUIucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoaXRlbUEsIGl0ZW1CKTtcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50QS5pbnNlcnRCZWZvcmUoaXRlbUIsIHNpYmxpbmdBKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5jaGlsZHJlbltjaGFuZ2UuaW5kZXgyXSA9IGl0ZW1BO1xuICAgICAgICAgICAgICAgIHRoaXMuY2hpbGRyZW5bY2hhbmdlLmluZGV4XSA9IGl0ZW1CO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAncHJlcGVuZCc6XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IGNoYW5nZS5pdGVtcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpdGVtID0gY2hhbmdlLml0ZW1zW2ldO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZW5kZXJlZCA9IHRoaXMucmVuZGVySXRlbShpdGVtLCBhYyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHJlbmRlcmVkKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbGxlZ2FsIHN0YXRlJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoaWxkcmVuLnVuc2hpZnQocmVuZGVyZWQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnaW5zZXJ0JzpcbiAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSBjaGFuZ2UuaW5kZXg7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIGNoYW5nZS5pdGVtcykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZW5kZXJlZCA9IHRoaXMucmVuZGVySXRlbShpdGVtLCBhYyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHJlbmRlcmVkKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbGxlZ2FsIHN0YXRlJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoaWxkcmVuLnNwbGljZShpbmRleCwgMCwgcmVuZGVyZWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXggKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2NsZWFyJzpcbiAgICAgICAgICAgICAgICB0aGlzLnNwbGljZUNoaWxkcmVuKDAsIHRoaXMuY2hpbGRyZW4ubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlclNlc3Npb25zID0gbmV3IFdlYWtNYXAoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBET00gdXBkYXRlcyBmcm9tICR7Y2hhbmdlLm9wZXJhdGlvbkRldGFpbGVkfSBhcmUgbm90IHN1cHBvcnRlZGApO1xuICAgICAgICB9XG4gICAgICAgIGlmICghb3B0aW1pemVkKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZURvbSgpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgYyBvZiBhYykge1xuICAgICAgICAgICAgYygpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlbmRlckl0ZW0oaXRlbSwgYXR0YWNoQ2FsbHMpIHtcbiAgICAgICAgaWYgKGl0ZW0gPT09IG51bGwgfHwgaXRlbSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcyA9IGNyZWF0ZVJlbmRlclNlc3Npb24oKTtcbiAgICAgICAgY29uc3QgcmVuZGVyZWQgPSByZW5kZXJJbnRlcm5hbChpdGVtLCBzKTtcbiAgICAgICAgaWYgKHJlbmRlcmVkID09PSB1bmRlZmluZWQgfHwgcmVuZGVyZWQgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVuZGVyZWQgaW5zdGFuY2VvZiBBdXJ1bUVsZW1lbnQpIHtcbiAgICAgICAgICAgIHMuc2Vzc2lvblRva2VuLmFkZENhbmNlbGFibGUoKCkgPT4gcmVuZGVyZWQuZGlzcG9zZSgpKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlbmRlclNlc3Npb25zLnNldChyZW5kZXJlZCwgcyk7XG4gICAgICAgIGF0dGFjaENhbGxzLnB1c2goLi4ucy5hdHRhY2hDYWxscyk7XG4gICAgICAgIHJldHVybiByZW5kZXJlZDtcbiAgICB9XG59XG5mdW5jdGlvbiBmbGF0dGVuSW5kZXgoc291cmNlLCBpbmRleCkge1xuICAgIGxldCBmbGF0SW5kZXggPSAwO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5kZXg7IGkrKykge1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShzb3VyY2VbaV0pKSB7XG4gICAgICAgICAgICBmbGF0SW5kZXggKz0gZmxhdHRlbkluZGV4KHNvdXJjZVtpXSwgc291cmNlW2ldLmxlbmd0aCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBmbGF0SW5kZXgrKztcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmxhdEluZGV4O1xufVxuZXhwb3J0IGNsYXNzIFNpbmd1bGFyQXVydW1FbGVtZW50IGV4dGVuZHMgQXVydW1FbGVtZW50IHtcbiAgICByZW5kZXJTZXNzaW9uO1xuICAgIGxhc3RWYWx1ZTtcbiAgICBkYXRhU291cmNlO1xuICAgIGNvbnN0cnVjdG9yKGRhdGFTb3VyY2UsIGFwaSkge1xuICAgICAgICBzdXBlcihkYXRhU291cmNlLCBhcGkpO1xuICAgICAgICB0aGlzLmFwaS5jYW5jZWxsYXRpb25Ub2tlbi5hZGRDYW5jZWxhYmxlKCgpID0+IHRoaXMucmVuZGVyU2Vzc2lvbj8uc2Vzc2lvblRva2VuLmNhbmNlbCgpKTtcbiAgICAgICAgdGhpcy5kYXRhU291cmNlID0gZGF0YVNvdXJjZTtcbiAgICB9XG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzcG9zZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmFwaS5jYW5jZWxsYXRpb25Ub2tlbi5jYW5jZWwoKTtcbiAgICAgICAgc3VwZXIuZGlzcG9zZSgpO1xuICAgIH1cbiAgICBhdHRhY2hUb0RvbShub2RlLCBpbmRleCkge1xuICAgICAgICBzdXBlci5hdHRhY2hUb0RvbShub2RlLCBpbmRleCk7XG4gICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICB0aGlzLmNvbnRlbnRTdGFydE1hcmtlci5kYXRhU291cmNlID0gdGhpcy5kYXRhU291cmNlO1xuICAgICAgICAvL0B0cy1pZ25vcmVcbiAgICAgICAgdGhpcy5jb250ZW50RW5kTWFya2VyLmRhdGFTb3VyY2UgPSB0aGlzLmRhdGFTb3VyY2U7XG4gICAgfVxuICAgIHJlbmRlcihkYXRhU291cmNlKSB7XG4gICAgICAgIGRhdGFTb3VyY2UubGlzdGVuQW5kUmVwZWF0KChuKSA9PiB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuZGlzcG9zZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZU5ld0NvbnRlbnQobik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHRoaXMuYXBpLmNhbmNlbGxhdGlvblRva2VuKTtcbiAgICB9XG4gICAgaGFuZGxlTmV3Q29udGVudChuZXdWYWx1ZSkge1xuICAgICAgICBpZiAodGhpcy5sYXN0VmFsdWUgPT09IG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IG9wdGltaXplZCA9IGZhbHNlO1xuICAgICAgICBpZiAodGhpcy5jaGlsZHJlbi5sZW5ndGggPT09IDEgJiYgdGhpcy5jaGlsZHJlblswXSBpbnN0YW5jZW9mIFRleHQpIHtcbiAgICAgICAgICAgIGNvbnN0IHR5cGUgPSB0eXBlb2YgbmV3VmFsdWU7XG4gICAgICAgICAgICBpZiAodHlwZSA9PT0gJ3N0cmluZycgfHwgdHlwZSA9PT0gJ2JpZ2ludCcgfHwgdHlwZSA9PT0gJ251bWJlcicgfHwgdHlwZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGlsZHJlblswXS5ub2RlVmFsdWUgPSBuZXdWYWx1ZTtcbiAgICAgICAgICAgICAgICBvcHRpbWl6ZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghb3B0aW1pemVkKSB7XG4gICAgICAgICAgICB0aGlzLmZ1bGxSZWJ1aWxkKG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlRG9tKCk7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGNiIG9mIHRoaXMucmVuZGVyU2Vzc2lvbi5hdHRhY2hDYWxscykge1xuICAgICAgICAgICAgICAgIGNiKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5sYXN0VmFsdWUgPSBuZXdWYWx1ZTtcbiAgICB9XG4gICAgZnVsbFJlYnVpbGQobmV3VmFsdWUpIHtcbiAgICAgICAgdGhpcy5jbGVhckNvbnRlbnQoKTtcbiAgICAgICAgdGhpcy5lbmRTZXNzaW9uKCk7XG4gICAgICAgIHRoaXMucmVuZGVyU2Vzc2lvbiA9IGNyZWF0ZVJlbmRlclNlc3Npb24oKTtcbiAgICAgICAgbGV0IHJlbmRlcmVkID0gcmVuZGVySW50ZXJuYWwobmV3VmFsdWUsIHRoaXMucmVuZGVyU2Vzc2lvbik7XG4gICAgICAgIGlmIChyZW5kZXJlZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmNoaWxkcmVuID0gW107XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHJlbmRlcmVkKSkge1xuICAgICAgICAgICAgcmVuZGVyZWQgPSBbcmVuZGVyZWRdO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiByZW5kZXJlZCkge1xuICAgICAgICAgICAgaWYgKGl0ZW0gaW5zdGFuY2VvZiBBdXJ1bUVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlclNlc3Npb24uc2Vzc2lvblRva2VuLmFkZENhbmNlbGFibGUoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpdGVtLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShyZW5kZXJlZCkpIHtcbiAgICAgICAgICAgIHRoaXMuY2hpbGRyZW4gPSByZW5kZXJlZDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbmRTZXNzaW9uKCkge1xuICAgICAgICBpZiAodGhpcy5yZW5kZXJTZXNzaW9uKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlclNlc3Npb24uc2Vzc2lvblRva2VuLmNhbmNlbCgpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJTZXNzaW9uID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXVydW1fZWxlbWVudC5qcy5tYXAiLCJpbXBvcnQgeyBBdXJ1bSB9IGZyb20gJy4uL3V0aWxpdGllcy9hdXJ1bS5qcyc7XG5pbXBvcnQgeyBjcmVhdGVBUEksIGNyZWF0ZVJlbmRlclNlc3Npb24gfSBmcm9tICcuL2F1cnVtX2VsZW1lbnQuanMnO1xuaW1wb3J0IHsgRGF0YVNvdXJjZSB9IGZyb20gJy4uL3N0cmVhbS9kYXRhX3NvdXJjZS5qcyc7XG5pbXBvcnQgeyBEb21Ob2RlQ3JlYXRvciB9IGZyb20gJy4uL2J1aWx0aW5fY29tcG9uZW50cy9kb21fYWRhcHRlci5qcyc7XG4vKipcbiAqIFdyYXBwZXIgYXJvdW5kIG5hdGl2ZSB3ZWIgY29tcG9uZW50cyBhbGxvd3MgdXNpbmcgYXVydW0gc3R5bGUgY29tcG9uZW50IHN0cnVjdHVyZSB0byBjcmVhdGUgbmF0aXZlIGNvbXBvbmVudHMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBXZWJjb21wb25lbnQoY29uZmlnLCBsb2dpYykge1xuICAgIGN1c3RvbUVsZW1lbnRzLmRlZmluZShjb25maWcubmFtZSwgY2xhc3MgZXh0ZW5kcyAoY29uZmlnLmJhc2VDbGFzcyA/PyBIVE1MRWxlbWVudCkge1xuICAgICAgICBhcGk7XG4gICAgICAgIHNlc3Npb247XG4gICAgICAgIHByb3BzO1xuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgICAgIHN1cGVyKCk7XG4gICAgICAgICAgICBpZiAoY29uZmlnLm9ic2VydmVkQXR0cmlidXRlcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgY29uZmlnLm9ic2VydmVkQXR0cmlidXRlcyA9IFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5wcm9wcyA9IHt9O1xuICAgICAgICAgICAgZm9yIChjb25zdCBhdHRyIG9mIGNvbmZpZy5vYnNlcnZlZEF0dHJpYnV0ZXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzW2F0dHJdID0gbmV3IERhdGFTb3VyY2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICAgICAgICAgIHJldHVybiBjb25maWcub2JzZXJ2ZWRBdHRyaWJ1dGVzO1xuICAgICAgICB9XG4gICAgICAgIGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhuYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUpIHtcbiAgICAgICAgICAgIGlmIChvbGRWYWx1ZSAhPT0gbmV3VmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzW25hbWVdLnVwZGF0ZShuZXdWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgICAgICAgICBjb25zdCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICAgICAgICAgIHRoaXMuc2Vzc2lvbiA9IGNyZWF0ZVJlbmRlclNlc3Npb24oKTtcbiAgICAgICAgICAgIHRoaXMuYXBpID0gY3JlYXRlQVBJKHRoaXMuc2Vzc2lvbik7XG4gICAgICAgICAgICBjb25zdCBjb250ZW50ID0gbG9naWModGhpcy5wcm9wcywgdGhpcy5hcGkpO1xuICAgICAgICAgICAgZm9yIChjb25zdCBjYiBvZiB0aGlzLnNlc3Npb24uYXR0YWNoQ2FsbHMpIHtcbiAgICAgICAgICAgICAgICBjYigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgQXVydW0uYXR0YWNoKGNvbnRlbnQsIHRlbXBsYXRlKTtcbiAgICAgICAgICAgIHRoaXMuYXR0YWNoU2hhZG93KHtcbiAgICAgICAgICAgICAgICBtb2RlOiBjb25maWcuc2hhZG93Um9vdE1vZGUgPz8gJ29wZW4nLFxuICAgICAgICAgICAgICAgIGRlbGVnYXRlc0ZvY3VzOiBjb25maWcuc2hhZG93Um9vdERlbGVnYXRlc0ZvY3VzXG4gICAgICAgICAgICB9KS5hcHBlbmRDaGlsZCh0ZW1wbGF0ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgICAgICAgICB0aGlzLnNlc3Npb24uc2Vzc2lvblRva2VuLmNhbmNlbCgpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIERvbU5vZGVDcmVhdG9yKGNvbmZpZy5uYW1lLCBjb25maWcub2JzZXJ2ZWRBdHRyaWJ1dGVzLCB1bmRlZmluZWQsIChub2RlLCBwcm9wcykgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBwcm9wcykge1xuICAgICAgICAgICAgLy9AdHMtaWdub3JlXG4gICAgICAgICAgICBpZiAoIShrZXkgaW4gbm9kZS5wcm9wcykpIHtcbiAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICBub2RlLnByb3BzW2tleV0gPSBwcm9wc1trZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD13ZWJjb21wb25lbnQuanMubWFwIiwiaW1wb3J0IHsgc3luY0FycmF5RGF0YVNvdXJjZSwgc3luY0RhdGFTb3VyY2UsIHN5bmNNYXBEYXRhU291cmNlLCBzeW5jU2V0RGF0YVNvdXJjZSB9IGZyb20gJy4uL2F1cnVtX3NlcnZlci9hdXJ1bV9zZXJ2ZXJfY2xpZW50LmpzJztcbmltcG9ydCB7IGRlYnVnRGVjbGFyZVVwZGF0ZSwgZGVidWdNb2RlLCBkZWJ1Z1JlZ2lzdGVyQ29uc3VtZXIsIGRlYnVnUmVnaXN0ZXJMaW5rLCBkZWJ1Z1JlZ2lzdGVyU3RyZWFtIH0gZnJvbSAnLi4vZGVidWdfbW9kZS5qcyc7XG5pbXBvcnQgeyBDYW5jZWxsYXRpb25Ub2tlbiB9IGZyb20gJy4uL3V0aWxpdGllcy9jYW5jZWxsYXRpb25fdG9rZW4uanMnO1xuaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSAnLi4vdXRpbGl0aWVzL2V2ZW50X2VtaXR0ZXIuanMnO1xuaW1wb3J0IHsgcHJvbWlzZUl0ZXJhdG9yIH0gZnJvbSAnLi4vdXRpbGl0aWVzL2l0ZXJhdGlvbi5qcyc7XG5pbXBvcnQgeyBnZXRWYWx1ZU9mIH0gZnJvbSAnLi4vdXRpbGl0aWVzL3NvdXJjZXMuanMnO1xuaW1wb3J0IHsgZHNEaWZmLCBkc1RhcCB9IGZyb20gJy4vZGF0YV9zb3VyY2Vfb3BlcmF0b3JzLmpzJztcbmltcG9ydCB7IER1cGxleERhdGFTb3VyY2UgfSBmcm9tICcuL2R1cGxleF9kYXRhX3NvdXJjZS5qcyc7XG5pbXBvcnQgeyBPcGVyYXRpb25UeXBlIH0gZnJvbSAnLi9vcGVyYXRvcl9tb2RlbC5qcyc7XG4vKipcbiAqIERhdGFzb3VyY2VzIHdyYXAgYSB2YWx1ZSBhbmQgYWxsb3cgeW91IHRvIHVwZGF0ZSBpdCBpbiBhbiBvYnNlcnZhYmxlIHdheS4gRGF0YXNvdXJjZXMgY2FuIGJlIG1hbmlwdWxhdGVkIGxpa2Ugc3RyZWFtcyBhbmQgY2FuIGJlIGJvdW5kIGRpcmVjdGx5IGluIHRoZSBKU1ggc3ludGF4IGFuZCB3aWxsIHVwZGF0ZSB0aGUgaHRtbCB3aGVuZXZlciB0aGUgdmFsdWUgY2hhbmdlc1xuICovXG5leHBvcnQgY2xhc3MgRGF0YVNvdXJjZSB7XG4gICAgLyoqXG4gICAgICogVGhlIGN1cnJlbnQgdmFsdWUgb2YgdGhpcyBkYXRhIHNvdXJjZSwgY2FuIGJlIGNoYW5nZWQgdGhyb3VnaCB1cGRhdGVcbiAgICAgKi9cbiAgICB2YWx1ZTtcbiAgICBwcmltZWQ7XG4gICAgdXBkYXRpbmc7XG4gICAgbmFtZTtcbiAgICB1cGRhdGVFdmVudDtcbiAgICBlcnJvckhhbmRsZXI7XG4gICAgZXJyb3JFdmVudDtcbiAgICBjb25zdHJ1Y3Rvcihpbml0aWFsVmFsdWUsIG5hbWUgPSAnUm9vdERhdGFTb3VyY2UnKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMudmFsdWUgPSBpbml0aWFsVmFsdWU7XG4gICAgICAgIGlmIChkZWJ1Z01vZGUpIHtcbiAgICAgICAgICAgIGRlYnVnUmVnaXN0ZXJTdHJlYW0odGhpcywgbmV3IEVycm9yKCkuc3RhY2spO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucHJpbWVkID0gaW5pdGlhbFZhbHVlICE9PSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuZXJyb3JFdmVudCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICAgICAgdGhpcy51cGRhdGVFdmVudCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICB9XG4gICAgdG9TdHJpbmcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIHN0YXRpYyB0b0RhdGFTb3VyY2UodmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgRGF0YVNvdXJjZSkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRhU291cmNlKHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWMgZnJvbUV2ZW50KGV2ZW50LCBjYW5jZWxsYXRpb24pIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gbmV3IERhdGFTb3VyY2UoKTtcbiAgICAgICAgZXZlbnQuc3Vic2NyaWJlKCh2KSA9PiByZXN1bHQudXBkYXRlKHYpLCBjYW5jZWxsYXRpb24pO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDb25uZWN0cyB0byBhbiBhdXJ1bS1zZXJ2ZXIgZXhwb3NlZCBkYXRhc291cmNlLiBWaWV3IGh0dHBzOi8vZ2l0aHViLmNvbS9DeWJlclBob2VuaXg5MC9hdXJ1bS1zZXJ2ZXIgZm9yIG1vcmUgaW5mb3JtYXRpb25cbiAgICAgKiBOb3RlIHRoYXQgdHlwZSBzYWZldHkgaXMgbm90IGd1YXJhbnRlZWQuIFdoYXRldmVyIHRoZSBzZXJ2ZXIgc2VuZHMgYXMgYW4gdXBkYXRlIHdpbGwgYmUgcHJvcGFnYXRlZFxuICAgICAqIEBwYXJhbSAge0F1cnVtU2VydmVySW5mb30gYXVydW1TZXJ2ZXJJbmZvXG4gICAgICogQHJldHVybnMgRGF0YVNvdXJjZVxuICAgICAqL1xuICAgIHN0YXRpYyBmcm9tUmVtb3RlU291cmNlKGF1cnVtU2VydmVySW5mbywgY2FuY2VsbGF0aW9uKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBEYXRhU291cmNlKCk7XG4gICAgICAgIHN5bmNEYXRhU291cmNlKHJlc3VsdCwgYXVydW1TZXJ2ZXJJbmZvLCBjYW5jZWxsYXRpb24pO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBzdGF0aWMgZnJvbU11bHRpcGxlU291cmNlcyhzb3VyY2VzLCBjYW5jZWxsYXRpb24pIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gbmV3IERhdGFTb3VyY2UoKTtcbiAgICAgICAgZm9yIChjb25zdCBzIG9mIHNvdXJjZXMpIHtcbiAgICAgICAgICAgIGlmIChkZWJ1Z01vZGUpIHtcbiAgICAgICAgICAgICAgICBkZWJ1Z1JlZ2lzdGVyTGluayhzLCByZXN1bHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcy5saXN0ZW5JbnRlcm5hbCgodikgPT4gcmVzdWx0LnVwZGF0ZSh2KSwgY2FuY2VsbGF0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICByZXN1bHQubmFtZSA9IGBDb21iaW5hdGlvbiBvZiBbJHtzb3VyY2VzLm1hcCgodikgPT4gdi5uYW1lKS5qb2luKCcgJiAnKX1dYDtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgc3RhdGljIGZyb21Bc3luY0l0ZXJhdG9yKGl0ZXJhdG9yLCBjYW5jZWxsYXRpb24pIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gbmV3IERhdGFTb3VyY2UoKTtcbiAgICAgICAgKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgZm9yIGF3YWl0IChjb25zdCBpdGVtIG9mIGl0ZXJhdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjYW5jZWxsYXRpb24/LmlzQ2FuY2VsZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXN1bHQudXBkYXRlKGl0ZW0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LmVtaXRFcnJvcihlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkoKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgc3RhdGljIGZyb21Qcm9taXNlKHByb21pc2UsIGNhbmNlbGxhdGlvbikge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBuZXcgRGF0YVNvdXJjZSgpO1xuICAgICAgICBwcm9taXNlLnRoZW4oKHYpID0+IHtcbiAgICAgICAgICAgIGlmIChjYW5jZWxsYXRpb24/LmlzQ2FuY2VsZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXN1bHQudXBkYXRlKHYpO1xuICAgICAgICB9LCByZXN1bHQuZW1pdEVycm9yLmJpbmQocmVzdWx0KSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIHN0YXRpYyBmcm9tUHJvbWlzZUFycmF5KHByb21pc2VzLCBjYW5jZWxsYXRpb24pIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gbmV3IERhdGFTb3VyY2UoKTtcbiAgICAgICAgKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGZvciBhd2FpdCAoY29uc3QgcHJvbWlzZSBvZiBwcm9taXNlSXRlcmF0b3IocHJvbWlzZXMsIGNhbmNlbGxhdGlvbikpIHtcbiAgICAgICAgICAgICAgICBpZiAoY2FuY2VsbGF0aW9uPy5pc0NhbmNlbGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHByb21pc2Uuc3RhdHVzID09PSAnZnVsZmlsbGVkJykge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQudXBkYXRlKHByb21pc2UudmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmVtaXRFcnJvcihwcm9taXNlLnJlYXNvbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KSgpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICB0b0FzeW5jSXRlcmF0b3IoY2FuY2VsbGF0aW9uKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnVwZGF0ZUV2ZW50LnRvQXN5bmNJdGVyYXRvcihjYW5jZWxsYXRpb24pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBbGxvd3MgdGFwcGluZyBpbnRvIHRoZSBzdHJlYW0gYW5kIGNhbGxzIGEgZnVuY3Rpb24gZm9yIGVhY2ggdmFsdWUuXG4gICAgICovXG4gICAgdGFwKGNhbGxiYWNrLCBjYW5jZWxsYXRpb25Ub2tlbikge1xuICAgICAgICB0aGlzLmxpc3RlbigodmFsdWUpID0+IHtcbiAgICAgICAgICAgIGNhbGxiYWNrKHZhbHVlKTtcbiAgICAgICAgfSwgY2FuY2VsbGF0aW9uVG9rZW4pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQXNzaWduIGEgZnVuY3Rpb24gdG8gaGFuZGxlIGVycm9ycyBhbmQgbWFwIHRoZW0gYmFjayB0byByZWd1bGFyIHZhbHVlcy4gUmV0aHJvdyB0aGUgZXJyb3IgaW4gY2FzZSB5b3Ugd2FudCB0byBmYWxsYmFjayB0byBlbWl0dGluZyBlcnJvclxuICAgICAqL1xuICAgIGhhbmRsZUVycm9ycyhjYWxsYmFjaykge1xuICAgICAgICB0aGlzLmVycm9ySGFuZGxlciA9IGNhbGxiYWNrO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgb25FcnJvcihjYWxsYmFjaywgY2FuY2VsbGF0aW9uVG9rZW4pIHtcbiAgICAgICAgdGhpcy5lcnJvckV2ZW50LnN1YnNjcmliZShjYWxsYmFjaywgY2FuY2VsbGF0aW9uVG9rZW4pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgZW1pdEVycm9yKGUpIHtcbiAgICAgICAgaWYgKHRoaXMuZXJyb3JIYW5kbGVyKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnVwZGF0ZSh0aGlzLmVycm9ySGFuZGxlcihlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAobmV3RXJyb3IpIHtcbiAgICAgICAgICAgICAgICBlID0gbmV3RXJyb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZXJyb3JFdmVudC5oYXNTdWJzY3JpcHRpb25zKCkpIHtcbiAgICAgICAgICAgIHRoaXMuZXJyb3JFdmVudC5maXJlKGUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBVcGRhdGVzIHdpdGggdGhlIHNhbWUgdmFsdWUgYXMgdGhlIGxhc3QgdmFsdWVcbiAgICAgKi9cbiAgICByZXBlYXRMYXN0KCkge1xuICAgICAgICB0aGlzLnVwZGF0ZSh0aGlzLnZhbHVlKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVwZGF0ZXMgdGhlIHZhbHVlIGluIHRoZSBkYXRhIHNvdXJjZSBhbmQgY2FsbHMgdGhlIGxpc3RlbiBjYWxsYmFjayBmb3IgYWxsIGxpc3RlbmVyc1xuICAgICAqIEBwYXJhbSBuZXdWYWx1ZSBuZXcgdmFsdWUgZm9yIHRoZSBkYXRhIHNvdXJjZVxuICAgICAqL1xuICAgIHVwZGF0ZShuZXdWYWx1ZSkge1xuICAgICAgICAvL0B0cy1leHBlY3QtZXJyb3IgVHlwZXNjcmlwdCB0cmllcyB0byBiZSBzbWFydCBhbmQgdGhpbmtzIHRoaXMgY291bGQgbmV2ZXIgaGFwcGVuIGJ1dCBpdCBjYW4gd2l0aCB0aGUgYW55IHR5cGUgYXMgVFxuICAgICAgICBpZiAobmV3VmFsdWUgPT09IHRoaXMpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IHVwZGF0ZSBkYXRhIHNvdXJjZSB3aXRoIGl0c2VsZicpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucHJpbWVkID0gdHJ1ZTtcbiAgICAgICAgaWYgKHRoaXMudXBkYXRpbmcpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUHJvYmxlbSBpbiBkYXRhIHNvdXJjZTogVW5zdGFibGUgdmFsdWUgcHJvcGFnYXRpb24uIFdoZW4gdXBkYXRpbmcgYSB2YWx1ZSB0aGUgc3RyZWFtIHdhcyB1cGRhdGVkIGJhY2sgYXMgYSBkaXJlY3QgcmVzcG9uc2UuIFRoaXMgY2FuIGxlYWQgdG8gaW5maW5pdGUgbG9vcHMgYW5kIGlzIHRoZXJlZm9yZSBub3QgYWxsb3dlZCcpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudXBkYXRpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLnZhbHVlID0gbmV3VmFsdWU7XG4gICAgICAgIHRoaXMudXBkYXRlRXZlbnQuZmlyZShuZXdWYWx1ZSk7XG4gICAgICAgIGlmIChkZWJ1Z01vZGUpIHtcbiAgICAgICAgICAgIGRlYnVnRGVjbGFyZVVwZGF0ZSh0aGlzLCBuZXdWYWx1ZSwgbmV3IEVycm9yKCkuc3RhY2spO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudXBkYXRpbmcgPSBmYWxzZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVXBkYXRlcyB0aGUgZGF0YSBzb3VyY2Ugd2l0aCBhIHZhbHVlIGlmIGl0IGhhcyBuZXZlciBoYWQgYSB2YWx1ZSBiZWZvcmVcbiAgICAgKi9cbiAgICB3aXRoSW5pdGlhbCh2YWx1ZSkge1xuICAgICAgICBpZiAoIXRoaXMucHJpbWVkKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNhbWUgYXMgbGlzdGVuIGJ1dCB3aWxsIGltbWVkaWF0ZWx5IGNhbGwgdGhlIGNhbGxiYWNrIHdpdGggdGhlIGN1cnJlbnQgdmFsdWUgZmlyc3RcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sgQ2FsbGJhY2sgdG8gY2FsbCB3aGVuIHZhbHVlIGlzIHVwZGF0ZWRcbiAgICAgKiBAcGFyYW0gY2FuY2VsbGF0aW9uVG9rZW4gT3B0aW9uYWwgdG9rZW4gdG8gY29udHJvbCB0aGUgY2FuY2VsbGF0aW9uIG9mIHRoZSBzdWJzY3JpcHRpb25cbiAgICAgKiBAcmV0dXJucyBDYW5jZWxsYXRpb24gY2FsbGJhY2ssIGNhbiBiZSB1c2VkIHRvIGNhbmNlbCBzdWJzY3JpcHRpb24gd2l0aG91dCBhIGNhbmNlbGxhdGlvbiB0b2tlblxuICAgICAqL1xuICAgIGxpc3RlbkFuZFJlcGVhdChjYWxsYmFjaywgY2FuY2VsbGF0aW9uVG9rZW4pIHtcbiAgICAgICAgaWYgKHRoaXMucHJpbWVkKSB7XG4gICAgICAgICAgICBjYWxsYmFjayh0aGlzLnZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5saXN0ZW4oY2FsbGJhY2ssIGNhbmNlbGxhdGlvblRva2VuKTtcbiAgICB9XG4gICAgbGlzdGVuQW5kUmVwZWF0SW50ZXJuYWwoY2FsbGJhY2ssIGNhbmNlbGxhdGlvblRva2VuLCBwYXJlbnQpIHtcbiAgICAgICAgY2FsbGJhY2sodGhpcy52YWx1ZSk7XG4gICAgICAgIHJldHVybiB0aGlzLmxpc3RlbkludGVybmFsKGNhbGxiYWNrLCBjYW5jZWxsYXRpb25Ub2tlbiwgcGFyZW50KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU3Vic2NyaWJlcyB0byB0aGUgdXBkYXRlcyBvZiB0aGUgZGF0YSBzdHJlYW1cbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sgQ2FsbGJhY2sgdG8gY2FsbCB3aGVuIHZhbHVlIGlzIHVwZGF0ZWRcbiAgICAgKiBAcGFyYW0gY2FuY2VsbGF0aW9uVG9rZW4gT3B0aW9uYWwgdG9rZW4gdG8gY29udHJvbCB0aGUgY2FuY2VsbGF0aW9uIG9mIHRoZSBzdWJzY3JpcHRpb25cbiAgICAgKiBAcmV0dXJucyBDYW5jZWxsYXRpb24gY2FsbGJhY2ssIGNhbiBiZSB1c2VkIHRvIGNhbmNlbCBzdWJzY3JpcHRpb24gd2l0aG91dCBhIGNhbmNlbGxhdGlvbiB0b2tlblxuICAgICAqL1xuICAgIGxpc3RlbihjYWxsYmFjaywgY2FuY2VsbGF0aW9uVG9rZW4pIHtcbiAgICAgICAgaWYgKGRlYnVnTW9kZSkge1xuICAgICAgICAgICAgZGVidWdSZWdpc3RlckNvbnN1bWVyKHRoaXMsIGNhbGxiYWNrLnRvU3RyaW5nKCksIG5ldyBFcnJvcigpLnN0YWNrKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5saXN0ZW5JbnRlcm5hbChjYWxsYmFjaywgY2FuY2VsbGF0aW9uVG9rZW4pO1xuICAgIH1cbiAgICBsaXN0ZW5JbnRlcm5hbChjYWxsYmFjaywgY2FuY2VsbGF0aW9uVG9rZW4sIHBhcmVudCkge1xuICAgICAgICBjb25zdCBjYW5jZWwgPSB0aGlzLnVwZGF0ZUV2ZW50LnN1YnNjcmliZShjYWxsYmFjaywgY2FuY2VsbGF0aW9uVG9rZW4pLmNhbmNlbDtcbiAgICAgICAgcmV0dXJuIGNhbmNlbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU3Vic2NyaWJlcyB0byB0aGUgdXBkYXRlcyBvZiB0aGUgZGF0YSBzdHJlYW0gZm9yIGEgc2luZ2xlIHVwZGF0ZVxuICAgICAqIEBwYXJhbSBjYWxsYmFjayBDYWxsYmFjayB0byBjYWxsIHdoZW4gdmFsdWUgaXMgdXBkYXRlZFxuICAgICAqIEBwYXJhbSBjYW5jZWxsYXRpb25Ub2tlbiBPcHRpb25hbCB0b2tlbiB0byBjb250cm9sIHRoZSBjYW5jZWxsYXRpb24gb2YgdGhlIHN1YnNjcmlwdGlvblxuICAgICAqIEByZXR1cm5zIENhbmNlbGxhdGlvbiBjYWxsYmFjaywgY2FuIGJlIHVzZWQgdG8gY2FuY2VsIHN1YnNjcmlwdGlvbiB3aXRob3V0IGEgY2FuY2VsbGF0aW9uIHRva2VuXG4gICAgICovXG4gICAgbGlzdGVuT25jZShjYWxsYmFjaywgY2FuY2VsbGF0aW9uVG9rZW4pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudXBkYXRlRXZlbnQuc3Vic2NyaWJlT25jZShjYWxsYmFjaywgY2FuY2VsbGF0aW9uVG9rZW4pLmNhbmNlbDtcbiAgICB9XG4gICAgdHJhbnNmb3JtKG9wZXJhdGlvbkEsIG9wZXJhdGlvbkIsIG9wZXJhdGlvbkMsIG9wZXJhdGlvbkQsIG9wZXJhdGlvbkUsIG9wZXJhdGlvbkYsIG9wZXJhdGlvbkcsIG9wZXJhdGlvbkgsIG9wZXJhdGlvbkksIG9wZXJhdGlvbkosIG9wZXJhdGlvbkssIGNhbmNlbGxhdGlvblRva2VuKSB7XG4gICAgICAgIGxldCB0b2tlbjtcbiAgICAgICAgY29uc3Qgb3BlcmF0aW9ucyA9IFtcbiAgICAgICAgICAgIG9wZXJhdGlvbkEsXG4gICAgICAgICAgICBvcGVyYXRpb25CLFxuICAgICAgICAgICAgb3BlcmF0aW9uQyxcbiAgICAgICAgICAgIG9wZXJhdGlvbkQsXG4gICAgICAgICAgICBvcGVyYXRpb25FLFxuICAgICAgICAgICAgb3BlcmF0aW9uRixcbiAgICAgICAgICAgIG9wZXJhdGlvbkcsXG4gICAgICAgICAgICBvcGVyYXRpb25ILFxuICAgICAgICAgICAgb3BlcmF0aW9uSSxcbiAgICAgICAgICAgIG9wZXJhdGlvbkosXG4gICAgICAgICAgICBvcGVyYXRpb25LXG4gICAgICAgIF0uZmlsdGVyKChlKSA9PiBlICYmIChlIGluc3RhbmNlb2YgQ2FuY2VsbGF0aW9uVG9rZW4gPyAoKHRva2VuID0gZSksIGZhbHNlKSA6IHRydWUpKTtcbiAgICAgICAgaWYgKGNhbmNlbGxhdGlvblRva2VuKSB7XG4gICAgICAgICAgICB0b2tlbiA9IGNhbmNlbGxhdGlvblRva2VuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBEYXRhU291cmNlKHVuZGVmaW5lZCwgdGhpcy5uYW1lICsgJyAnICsgb3BlcmF0aW9ucy5tYXAoKHYpID0+IHYubmFtZSkuam9pbignICcpKTtcbiAgICAgICAgaWYgKGRlYnVnTW9kZSkge1xuICAgICAgICAgICAgZGVidWdSZWdpc3RlckxpbmsodGhpcywgcmVzdWx0KTtcbiAgICAgICAgfVxuICAgICAgICAodGhpcy5wcmltZWQgPyB0aGlzLmxpc3RlbkFuZFJlcGVhdEludGVybmFsIDogdGhpcy5saXN0ZW5JbnRlcm5hbCkuY2FsbCh0aGlzLCBwcm9jZXNzVHJhbnNmb3JtKG9wZXJhdGlvbnMsIHJlc3VsdCksIHRva2VuKTtcbiAgICAgICAgdGhpcy5vbkVycm9yKChlKSA9PiByZXN1bHQuZW1pdEVycm9yKGUpLCB0b2tlbik7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIHN0YXRpYyBmcm9tQ29tYmluYXRpb24oc291cmNlcywgY2FuY2VsbGF0aW9uVG9rZW4pIHtcbiAgICAgICAgaWYgKHNvdXJjZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBjb21iaW5lIHplcm8gZGF0YSBzb3VyY2VzJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNvdXJjZXNbMF0uY29tYmluZShzb3VyY2VzLnNsaWNlKDEpLCBjYW5jZWxsYXRpb25Ub2tlbik7XG4gICAgfVxuICAgIHN0YXRpYyBmcm9tQWdncmVnYXRpb24oc291cmNlcywgY29tYmluYXRvciwgY2FuY2VsbGF0aW9uVG9rZW4pIHtcbiAgICAgICAgY2FuY2VsbGF0aW9uVG9rZW4gPSBjYW5jZWxsYXRpb25Ub2tlbiA/PyBuZXcgQ2FuY2VsbGF0aW9uVG9rZW4oKTtcbiAgICAgICAgY29uc3QgYWdncmVnYXRlZFNvdXJjZSA9IG5ldyBEYXRhU291cmNlKGNvbWJpbmF0b3IoLi4uc291cmNlcy5tYXAoKHMpID0+IHM/LnZhbHVlKSkpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNvdXJjZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHNvdXJjZXNbaV0/Lmxpc3RlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgYWdncmVnYXRlZFNvdXJjZS51cGRhdGUoY29tYmluYXRvciguLi5zb3VyY2VzLm1hcCgocykgPT4gcz8udmFsdWUpKSk7XG4gICAgICAgICAgICB9LCBjYW5jZWxsYXRpb25Ub2tlbik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFnZ3JlZ2F0ZWRTb3VyY2U7XG4gICAgfVxuICAgIGFnZ3JlZ2F0ZShvdGhlclNvdXJjZXMsIGNvbWJpbmF0b3IsIGNhbmNlbGxhdGlvblRva2VuKSB7XG4gICAgICAgIGNhbmNlbGxhdGlvblRva2VuID0gY2FuY2VsbGF0aW9uVG9rZW4gPz8gbmV3IENhbmNlbGxhdGlvblRva2VuKCk7XG4gICAgICAgIGNvbnN0IGFnZ3JlZ2F0ZWRTb3VyY2UgPSBuZXcgRGF0YVNvdXJjZShjb21iaW5hdG9yKHRoaXMudmFsdWUsIC4uLm90aGVyU291cmNlcy5tYXAoKHMpID0+IHM/LnZhbHVlKSkpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG90aGVyU291cmNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgb3RoZXJTb3VyY2VzW2ldPy5saXN0ZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIGFnZ3JlZ2F0ZWRTb3VyY2UudXBkYXRlKGNvbWJpbmF0b3IodGhpcy52YWx1ZSwgLi4ub3RoZXJTb3VyY2VzLm1hcCgocykgPT4gcz8udmFsdWUpKSk7XG4gICAgICAgICAgICB9LCBjYW5jZWxsYXRpb25Ub2tlbik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5saXN0ZW4oKCkgPT4gYWdncmVnYXRlZFNvdXJjZS51cGRhdGUoY29tYmluYXRvcih0aGlzLnZhbHVlLCAuLi5vdGhlclNvdXJjZXMubWFwKChzKSA9PiBzPy52YWx1ZSkpKSwgY2FuY2VsbGF0aW9uVG9rZW4pO1xuICAgICAgICByZXR1cm4gYWdncmVnYXRlZFNvdXJjZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRm9yd2FyZHMgYWxsIHVwZGF0ZXMgZnJvbSB0aGlzIHNvdXJjZSB0byBhbm90aGVyXG4gICAgICogQHBhcmFtIHRhcmdldERhdGFTb3VyY2UgZGF0YXNvdXJjZSB0byBwaXBlIHRoZSB1cGRhdGVzIHRvXG4gICAgICogQHBhcmFtIGNhbmNlbGxhdGlvblRva2VuICBDYW5jZWxsYXRpb24gdG9rZW4gdG8gY2FuY2VsIHRoZSBzdWJzY3JpcHRpb24gdGhlIHRhcmdldCBkYXRhc291cmNlIGhhcyB0byB0aGlzIGRhdGFzb3VyY2VcbiAgICAgKi9cbiAgICBwaXBlKHRhcmdldERhdGFTb3VyY2UsIGNhbmNlbGxhdGlvblRva2VuKSB7XG4gICAgICAgIHRoaXMubGlzdGVuKCh2KSA9PiB0YXJnZXREYXRhU291cmNlLnVwZGF0ZSh2KSwgY2FuY2VsbGF0aW9uVG9rZW4pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogTGlrZSBhZ2dyZWdhdGUgZXhjZXB0IHRoYXQgaXQgYWdncmVnYXRlcyBhbiBhcnJheSBkYXRhIHNvdXJjZSBvZiBkYXRhc291cmNlc1xuICAgICAqIEBwYXJhbSBkYXRhIFNlY29uZCBwYXJlbnQgZm9yIHRoZSBuZXcgc291cmNlXG4gICAgICogQHBhcmFtIGNhbmNlbGxhdGlvblRva2VuICBDYW5jZWxsYXRpb24gdG9rZW4gdG8gY2FuY2VsIHRoZSBzdWJzY3JpcHRpb25zIHRoZSBuZXcgZGF0YXNvdXJjZSBoYXMgdG8gdGhlIHR3byBwYXJlbnQgZGF0YXNvdXJjZXNcbiAgICAgKi9cbiAgICBzdGF0aWMgZHluYW1pY0FnZ3JlZ2F0aW9uKGRhdGEsIGFnZ3JlZ2F0ZSwgY2FuY2VsbGF0aW9uVG9rZW4pIHtcbiAgICAgICAgY2FuY2VsbGF0aW9uVG9rZW4gPSBjYW5jZWxsYXRpb25Ub2tlbiA/PyBuZXcgQ2FuY2VsbGF0aW9uVG9rZW4oKTtcbiAgICAgICAgY29uc3Qgc2Vzc2lvbiA9IG5ldyBXZWFrTWFwKCk7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBEYXRhU291cmNlKCk7XG4gICAgICAgIGRhdGEubGlzdGVuQW5kUmVwZWF0KChjaGFuZ2UpID0+IHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBjaGFuZ2UuaXRlbXMpIHtcbiAgICAgICAgICAgICAgICBsaXN0ZW5Ub1N1YlNvdXJjZShpdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc3VsdC51cGRhdGUoYWdncmVnYXRlKGRhdGEuZ2V0RGF0YSgpLm1hcCgoZSkgPT4gZS52YWx1ZSkpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGRhdGEub25JdGVtc0FkZGVkLnN1YnNjcmliZSgoaXRlbXMpID0+IHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcykge1xuICAgICAgICAgICAgICAgIGxpc3RlblRvU3ViU291cmNlKGl0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgZGF0YS5vbkl0ZW1zUmVtb3ZlZC5zdWJzY3JpYmUoKGl0ZW1zKSA9PiB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICAgICAgICAgICAgICBzZXNzaW9uLmdldChpdGVtKS5jYW5jZWwoKTtcbiAgICAgICAgICAgICAgICBzZXNzaW9uLmRlbGV0ZShpdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIGZ1bmN0aW9uIGxpc3RlblRvU3ViU291cmNlKGl0ZW0pIHtcbiAgICAgICAgICAgIHNlc3Npb24uc2V0KGl0ZW0sIG5ldyBDYW5jZWxsYXRpb25Ub2tlbigpKTtcbiAgICAgICAgICAgIGl0ZW0ubGlzdGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICByZXN1bHQudXBkYXRlKGFnZ3JlZ2F0ZShkYXRhLmdldERhdGEoKS5tYXAoKGUpID0+IGUudmFsdWUpKSk7XG4gICAgICAgICAgICB9LCBzZXNzaW9uLmdldChpdGVtKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogTGlrZSBhZ2dyZWdhdGUgZXhjZXB0IHRoYXQgbm8gY29tYmluYXRpb24gbWV0aG9kIGlzIG5lZWRlZCBhcyBhIHJlc3VsdCBib3RoIHBhcmVudHMgbXVzdCBoYXZlIHRoZSBzYW1lIHR5cGUgYW5kIHRoZSBuZXcgc3RyZWFtIGp1c3QgZXhwb3NlcyB0aGUgbGFzdCB1cGRhdGUgcmVjaWV2ZWQgZnJvbSBlaXRoZXIgcGFyZW50XG4gICAgICogQHBhcmFtIG90aGVyU291cmNlIFNlY29uZCBwYXJlbnQgZm9yIHRoZSBuZXcgc291cmNlXG4gICAgICogQHBhcmFtIGNhbmNlbGxhdGlvblRva2VuICBDYW5jZWxsYXRpb24gdG9rZW4gdG8gY2FuY2VsIHRoZSBzdWJzY3JpcHRpb25zIHRoZSBuZXcgZGF0YXNvdXJjZSBoYXMgdG8gdGhlIHR3byBwYXJlbnQgZGF0YXNvdXJjZXNcbiAgICAgKi9cbiAgICBjb21iaW5lKG90aGVyU291cmNlcywgY2FuY2VsbGF0aW9uVG9rZW4pIHtcbiAgICAgICAgY2FuY2VsbGF0aW9uVG9rZW4gPSBjYW5jZWxsYXRpb25Ub2tlbiA/PyBuZXcgQ2FuY2VsbGF0aW9uVG9rZW4oKTtcbiAgICAgICAgbGV0IGNvbWJpbmVkRGF0YVNvdXJjZTtcbiAgICAgICAgaWYgKHRoaXMucHJpbWVkKSB7XG4gICAgICAgICAgICBjb21iaW5lZERhdGFTb3VyY2UgPSBuZXcgRGF0YVNvdXJjZSh0aGlzLnZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbWJpbmVkRGF0YVNvdXJjZSA9IG5ldyBEYXRhU291cmNlKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5waXBlKGNvbWJpbmVkRGF0YVNvdXJjZSwgY2FuY2VsbGF0aW9uVG9rZW4pO1xuICAgICAgICBmb3IgKGNvbnN0IG90aGVyU291cmNlIG9mIG90aGVyU291cmNlcykge1xuICAgICAgICAgICAgb3RoZXJTb3VyY2UucGlwZShjb21iaW5lZERhdGFTb3VyY2UsIGNhbmNlbGxhdGlvblRva2VuKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29tYmluZWREYXRhU291cmNlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIG5leHQgdXBkYXRlIG9jY3Vyc1xuICAgICAqIEBwYXJhbSBjYW5jZWxsYXRpb25Ub2tlblxuICAgICAqL1xuICAgIGF3YWl0TmV4dFVwZGF0ZShjYW5jZWxsYXRpb25Ub2tlbikge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgIHRoaXMubGlzdGVuT25jZSgodmFsdWUpID0+IHJlc29sdmUodmFsdWUpLCBjYW5jZWxsYXRpb25Ub2tlbik7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgYWxsIGxpc3RlbmVyc1xuICAgICAqL1xuICAgIGNhbmNlbEFsbCgpIHtcbiAgICAgICAgdGhpcy51cGRhdGVFdmVudC5jYW5jZWxBbGwoKTtcbiAgICB9XG59XG5leHBvcnQgY2xhc3MgQXJyYXlEYXRhU291cmNlIHtcbiAgICBkYXRhO1xuICAgIHVwZGF0ZUV2ZW50O1xuICAgIGxlbmd0aFNvdXJjZTtcbiAgICBuYW1lO1xuICAgIG9uSXRlbXNBZGRlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBvbkl0ZW1zUmVtb3ZlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBjb25zdHJ1Y3Rvcihpbml0aWFsRGF0YSwgbmFtZSA9ICdSb290QXJyYXlEYXRhU291cmNlJykge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICBpZiAoaW5pdGlhbERhdGEpIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YSA9IGluaXRpYWxEYXRhLnNsaWNlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmRhdGEgPSBbXTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxlbmd0aFNvdXJjZSA9IG5ldyBEYXRhU291cmNlKHRoaXMuZGF0YS5sZW5ndGgsIHRoaXMubmFtZSArICcubGVuZ3RoJyk7XG4gICAgICAgIHRoaXMudXBkYXRlRXZlbnQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgfVxuICAgICpbU3ltYm9sLml0ZXJhdG9yXSgpIHtcbiAgICAgICAgeWllbGQqIHRoaXMuZ2V0RGF0YSgpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBkYXRhc291cmNlIHRoYXQgYWx3YXlzIGNvbnRhaW5zIHRoZSBpdGVtIHRoYXQgaXMgY3VycmVudGx5IGF0IHRoZSBzcGVjaWZpZWQgaW5kZXhcbiAgICAgKiBAcGFyYW0gaW5kZXhcbiAgICAgKiBAcGFyYW0gY2FuY2VsbGF0aW9uVG9rZW5cbiAgICAgKiBAcmV0dXJuc1xuICAgICAqL1xuICAgIHBpY2tBdChpbmRleCwgY2FuY2VsbGF0aW9uVG9rZW4pIHtcbiAgICAgICAgaWYgKGluZGV4IDwgMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbmRleCBvdXQgb2YgYm91bmRzJyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmVzdWx0ID0gbmV3IERhdGFTb3VyY2UodGhpcy5kYXRhW2luZGV4XSwgdGhpcy5uYW1lICsgYFske2luZGV4fV1gKTtcbiAgICAgICAgdGhpcy5saXN0ZW4oKGNoYW5nZSkgPT4ge1xuICAgICAgICAgICAgaWYgKHJlc3VsdC52YWx1ZSAhPT0gY2hhbmdlLm5ld1N0YXRlW2luZGV4XSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdC51cGRhdGUoY2hhbmdlLm5ld1N0YXRlW2luZGV4XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIGNhbmNlbGxhdGlvblRva2VuKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgdG9TZXREYXRhU291cmNlKGNhbmNlbGxhdGlvblRva2VuKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBTZXREYXRhU291cmNlKCk7XG4gICAgICAgIHRoaXMubGlzdGVuQW5kUmVwZWF0KChjaGFuZ2UpID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCAoY2hhbmdlLm9wZXJhdGlvbikge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2FkZCc6XG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBjaGFuZ2UuaXRlbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5hZGQoaXRlbSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAncmVtb3ZlJzpcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIGNoYW5nZS5pdGVtcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmluY2x1ZGVzKGl0ZW0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmRlbGV0ZShpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdyZXBsYWNlJzpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmluY2x1ZGVzKGNoYW5nZS50YXJnZXQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuZGVsZXRlKGNoYW5nZS50YXJnZXQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBjaGFuZ2UuaXRlbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5hZGQoaXRlbSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbWVyZ2UnOlxuICAgICAgICAgICAgICAgICAgICByZXN1bHQuY2xlYXIoKTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIGNoYW5nZS5pdGVtcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmFkZChpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgY2FuY2VsbGF0aW9uVG9rZW4pO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICB0b1N0cmluZygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS50b1N0cmluZygpO1xuICAgIH1cbiAgICBzdGF0aWMgZnJvbUZldGNoVGV4dChyZXNwb25zZSwgY29uZmlnID0geyBpdGVtU2VwZXJhdG9yU2VxdWVuY2U6ICdcXG4nIH0pIHtcbiAgICAgICAgY29uc3QgZGVjb2RlciA9IG5ldyBUZXh0RGVjb2RlcigndXRmLTgnKTtcbiAgICAgICAgY29uc3Qgc3RyZWFtID0gbmV3IEFycmF5RGF0YVNvdXJjZSgpO1xuICAgICAgICBjb25zdCB7IG9uQ29tcGxldGUsIGl0ZW1TZXBlcmF0b3JTZXF1ZW5jZSB9ID0gY29uZmlnO1xuICAgICAgICBsZXQgYnVmZmVyID0gJyc7XG4gICAgICAgIGNvbnN0IHJlYWRlclN0cmVhbSA9IHJlc3BvbnNlLmJvZHkuZ2V0UmVhZGVyKCk7XG4gICAgICAgIGZ1bmN0aW9uIHJlYWQocmVhZGVyKSB7XG4gICAgICAgICAgICByZWFkZXIucmVhZCgpLnRoZW4oKHsgZG9uZSwgdmFsdWUgfSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghZG9uZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0gKGJ1ZmZlciArIGRlY29kZXIuZGVjb2RlKHZhbHVlKSkuc3BsaXQoaXRlbVNlcGVyYXRvclNlcXVlbmNlKTtcbiAgICAgICAgICAgICAgICAgICAgYnVmZmVyID0gZGF0YS5zcGxpY2UoZGF0YS5sZW5ndGggLSAxLCAxKVswXTtcbiAgICAgICAgICAgICAgICAgICAgc3RyZWFtLmFwcGVuZEFycmF5KGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICByZWFkKHJlYWRlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoYnVmZmVyLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RyZWFtLnB1c2goYnVmZmVyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBvbkNvbXBsZXRlPy4oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZWFkKHJlYWRlclN0cmVhbSk7XG4gICAgICAgIHJldHVybiBzdHJlYW07XG4gICAgfVxuICAgIHN0YXRpYyBmcm9tRmV0Y2hKU09OKHJlc3BvbnNlLCBjb25maWcgPSB7XG4gICAgICAgIGl0ZW1TZXBlcmF0b3JTZXF1ZW5jZTogJ1xcbidcbiAgICB9KSB7XG4gICAgICAgIGNvbnN0IGRlY29kZXIgPSBuZXcgVGV4dERlY29kZXIoJ3V0Zi04Jyk7XG4gICAgICAgIGNvbnN0IHN0cmVhbSA9IG5ldyBBcnJheURhdGFTb3VyY2UoKTtcbiAgICAgICAgY29uc3QgeyBvblBhcnNlRXJyb3IsIG9uQ29tcGxldGUsIGl0ZW1TZXBlcmF0b3JTZXF1ZW5jZSA9ICdcXG4nIH0gPSBjb25maWc7XG4gICAgICAgIGxldCBidWZmZXIgPSAnJztcbiAgICAgICAgY29uc3QgcmVhZGVyU3RyZWFtID0gcmVzcG9uc2UuYm9keS5nZXRSZWFkZXIoKTtcbiAgICAgICAgZnVuY3Rpb24gcmVhZChyZWFkZXIpIHtcbiAgICAgICAgICAgIHJlYWRlci5yZWFkKCkudGhlbigoeyBkb25lLCB2YWx1ZSB9KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFkb25lKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSAoYnVmZmVyICsgZGVjb2Rlci5kZWNvZGUodmFsdWUpKS5zcGxpdChpdGVtU2VwZXJhdG9yU2VxdWVuY2UpO1xuICAgICAgICAgICAgICAgICAgICBidWZmZXIgPSBkYXRhLnNwbGljZShkYXRhLmxlbmd0aCAtIDEsIDEpWzBdO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VBbmRQdXNoKGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJlYWQocmVhZGVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChidWZmZXIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJzZUFuZFB1c2goYnVmZmVyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBvbkNvbXBsZXRlPy4oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZWFkKHJlYWRlclN0cmVhbSk7XG4gICAgICAgIGZ1bmN0aW9uIHBhcnNlQW5kUHVzaChpdGVtKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHN0cmVhbS5wdXNoKEpTT04ucGFyc2UoaXRlbSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBzdHJlYW0ucHVzaChvblBhcnNlRXJyb3IoaXRlbSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBJZ25vcmUgaXRlbSBpZiBpdCBjYW4ndCBiZSBwYXJzZWQgYW5kL29yIG5vIGVycm9yIGhhbmRsZXIgaXMgcHJvdmlkZWRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0cmVhbTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ29ubmVjdHMgdG8gYW4gYXVydW0tc2VydmVyIGV4cG9zZWQgYXJyYXkgZGF0YXNvdXJjZS4gVmlldyBodHRwczovL2dpdGh1Yi5jb20vQ3liZXJQaG9lbml4OTAvYXVydW0tc2VydmVyIGZvciBtb3JlIGluZm9ybWF0aW9uXG4gICAgICogTm90ZSB0aGF0IHR5cGUgc2FmZXR5IGlzIG5vdCBndWFyYW50ZWVkLiBXaGF0ZXZlciB0aGUgc2VydmVyIHNlbmRzIGFzIGFuIHVwZGF0ZSB3aWxsIGJlIHByb3BhZ2F0ZWRcbiAgICAgKiBAcGFyYW0gIHtBdXJ1bVNlcnZlckluZm99IGF1cnVtU2VydmVySW5mb1xuICAgICAqIEByZXR1cm5zIERhdGFTb3VyY2VcbiAgICAgKi9cbiAgICBzdGF0aWMgZnJvbVJlbW90ZVNvdXJjZShhdXJ1bVNlcnZlckluZm8sIGNhbmNlbGxhdGlvbikge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBuZXcgQXJyYXlEYXRhU291cmNlKCk7XG4gICAgICAgIHN5bmNBcnJheURhdGFTb3VyY2UocmVzdWx0LCBhdXJ1bVNlcnZlckluZm8sIGNhbmNlbGxhdGlvbik7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIHN0YXRpYyBmcm9tTXVsdGlwbGVTb3VyY2VzKHNvdXJjZXMsIGNhbmNlbGxhdGlvblRva2VuKSB7XG4gICAgICAgIGNvbnN0IGJvdW5kYXJpZXMgPSBbMF07XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBBcnJheURhdGFTb3VyY2UodW5kZWZpbmVkLCBgQXJyYXlEYXRhU291cmNlIG9mICgke3NvdXJjZXMucmVkdWNlKChwLCBjKSA9PiBwICsgKGMgaW5zdGFuY2VvZiBBcnJheURhdGFTb3VyY2UgPyBjLm5hbWUgKyAnICcgOiAnJyksICcnKX0pYCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc291cmNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgaXRlbSA9IHNvdXJjZXNbaV07XG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShpdGVtKSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5hcHBlbmRBcnJheShpdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGl0ZW0gaW5zdGFuY2VvZiBEYXRhU291cmNlIHx8IGl0ZW0gaW5zdGFuY2VvZiBEdXBsZXhEYXRhU291cmNlKSB7XG4gICAgICAgICAgICAgICAgbGV0IGluZGV4ID0gaTtcbiAgICAgICAgICAgICAgICBpdGVtLnRyYW5zZm9ybShkc0RpZmYoKSwgZHNUYXAoKHsgbmV3VmFsdWUsIG9sZFZhbHVlIH0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNpemVEaWZmID0gMDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG9sZFNpemUgPSAwO1xuICAgICAgICAgICAgICAgICAgICBsZXQgbmV3U2l6ZSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KG9sZFZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2xkU2l6ZSA9IG9sZFZhbHVlLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpemVEaWZmIC09IG9sZFZhbHVlLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChvbGRWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvbGRTaXplID0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpemVEaWZmLS07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkobmV3VmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaXplRGlmZiArPSBuZXdWYWx1ZS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdTaXplID0gbmV3VmFsdWUubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKG5ld1ZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpemVEaWZmKys7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdTaXplID0gMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShuZXdWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmV3VmFsdWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSA8IG9sZFNpemUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnNldChib3VuZGFyaWVzW2luZGV4XSArIGksIG5ld1ZhbHVlW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5pbnNlcnRBdChib3VuZGFyaWVzW2luZGV4XSArIGksIG5ld1ZhbHVlW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAobmV3VmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5ld1NpemUgPD0gb2xkU2l6ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5zZXQoYm91bmRhcmllc1tpbmRleF0sIG5ld1ZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5pbnNlcnRBdChib3VuZGFyaWVzW2luZGV4XSwgbmV3VmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb2xkU2l6ZSAtIG5ld1NpemU7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnJlbW92ZUF0KGJvdW5kYXJpZXNbaW5kZXhdICsgbmV3U2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IGluZGV4ICsgMTsgaSA8IGJvdW5kYXJpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvdW5kYXJpZXNbaV0gKz0gc2l6ZURpZmY7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KSwgY2FuY2VsbGF0aW9uVG9rZW4pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LmFwcGVuZEFycmF5KHNvdXJjZXNbaV0uZGF0YSA/PyBbXSk7XG4gICAgICAgICAgICAgICAgbGV0IGluZGV4ID0gaTtcbiAgICAgICAgICAgICAgICBzb3VyY2VzW2ldLmxpc3RlbigoY2hhbmdlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoY2hhbmdlLm9wZXJhdGlvbkRldGFpbGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdhcHBlbmQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAncHJlcGVuZCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdpbnNlcnQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5pbnNlcnRBdChjaGFuZ2UuaW5kZXggKyBib3VuZGFyaWVzW2luZGV4XSwgLi4uY2hhbmdlLml0ZW1zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gaW5kZXggKyAxOyBpIDwgYm91bmRhcmllcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3VuZGFyaWVzW2ldICs9IGNoYW5nZS5jb3VudDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdyZW1vdmUnOlxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAncmVtb3ZlTGVmdCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdyZW1vdmVSaWdodCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdjbGVhcic6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnJlbW92ZVJhbmdlKGNoYW5nZS5pbmRleCArIGJvdW5kYXJpZXNbaW5kZXhdLCBjaGFuZ2UuaW5kZXggKyBib3VuZGFyaWVzW2luZGV4XSArIGNoYW5nZS5jb3VudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IGluZGV4ICsgMTsgaSA8IGJvdW5kYXJpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm91bmRhcmllc1tpXSAtPSBjaGFuZ2UuY291bnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnbWVyZ2UnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxlbmd0aERpZmYgPSBjaGFuZ2UubmV3U3RhdGUubGVuZ3RoICsgY2hhbmdlLnByZXZpb3VzU3RhdGUubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5yZW1vdmVSYW5nZShjaGFuZ2UuaW5kZXggKyBib3VuZGFyaWVzW2luZGV4XSwgY2hhbmdlLmluZGV4ICsgYm91bmRhcmllc1tpbmRleF0gKyBjaGFuZ2UucHJldmlvdXNTdGF0ZS5sZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5pbnNlcnRBdChjaGFuZ2UuaW5kZXggKyBib3VuZGFyaWVzW2luZGV4XSwgLi4uY2hhbmdlLm5ld1N0YXRlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGVuZ3RoRGlmZiAhPSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSBpbmRleCArIDE7IGkgPCBib3VuZGFyaWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3VuZGFyaWVzW2ldICs9IGxlbmd0aERpZmY7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdyZXBsYWNlJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuc2V0KGNoYW5nZS5pbmRleCArIGJvdW5kYXJpZXNbaW5kZXhdLCBjaGFuZ2UuaXRlbXNbMF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnc3dhcCc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnN3YXAoY2hhbmdlLmluZGV4ICsgYm91bmRhcmllc1tpbmRleF0sIGNoYW5nZS5pbmRleDIgKyBib3VuZGFyaWVzW2luZGV4XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCBjYW5jZWxsYXRpb25Ub2tlbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBib3VuZGFyaWVzLnB1c2gocmVzdWx0Lmxlbmd0aC52YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBhcnJheSBkYXRhIHNvdXJjZSB3aGVyZSB0aGUgdHlwZSBUIGlzIG5vIGxvbmdlciB3cmFwcGVkIGJ5IGEgRGF0YVNvdXJjZSBob3dldmVyIHRoZSB2YWx1ZXMgb2YgdGhlc2UgZGF0YSBzb3VyY2VzIGFyZSBvYnNlcnZlZCBvbiB0aGUgcGFyZW50XG4gICAgICogYXJyYXkgZGF0YSBzb3VyY2UgYW5kIGNoYW5nZXMgYXJlIGZvcndhcmRlZCB0byB0aGUgbmV3IGFycmF5IGRhdGEgc291cmNlIHRocm91Z2ggYXJyYXkgbXV0YXRpb25zLiBUaGlzIG1ha2VzIGl0IHBvc3NpYmxlIHRvIHVzZSB2aWV3IG1ldGhvZHMgc3VjaCBhcyBtYXAgYW5kIGZpbHRlclxuICAgICAqIG9uIHRoZSByYXcgZGF0YSBpbnN0ZWFkIG9mIG9uIGRhdGEgc291cmNlcyB0byBjb3ZlciBoaWdobHkgZHluYW1pYyB1c2UgY2FzZXNcbiAgICAgKi9cbiAgICBzdGF0aWMgRHluYW1pY0FycmF5RGF0YVNvdXJjZVRvQXJyYXlEYXRhU291cmNlKGFycmF5RGF0YVNvdXJjZSwgY2FuY2VsbGF0aW9uKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBBcnJheURhdGFTb3VyY2UoKTtcbiAgICAgICAgY29uc3Qgc2Vzc2lvbiA9IG5ldyBXZWFrTWFwKCk7XG4gICAgICAgIGFycmF5RGF0YVNvdXJjZS5saXN0ZW5BbmRSZXBlYXQoKHsgb3BlcmF0aW9uRGV0YWlsZWQsIGluZGV4LCBpbmRleDIsIGNvdW50LCBpdGVtcywgcHJldmlvdXNTdGF0ZSwgbmV3U3RhdGUsIHRhcmdldCB9KSA9PiB7XG4gICAgICAgICAgICBzd2l0Y2ggKG9wZXJhdGlvbkRldGFpbGVkKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnYXBwZW5kJzpcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaXN0ZW5Ub0l0ZW0oaXRlbSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmFwcGVuZEFycmF5KGl0ZW1zLm1hcCgoaXRlbSkgPT4gZ2V0VmFsdWVPZihpdGVtKSkpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdwcmVwZW5kJzpcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaXN0ZW5Ub0l0ZW0oaXRlbSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnVuc2hpZnQoLi4uaXRlbXMubWFwKChpdGVtKSA9PiBnZXRWYWx1ZU9mKGl0ZW0pKSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ21lcmdlJzpcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIHByZXZpb3VzU3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0b3BMaXRlblRvSXRlbShpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgbmV3U3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpc3RlblRvSXRlbShpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXN1bHQubWVyZ2UobmV3U3RhdGUubWFwKChpKSA9PiBnZXRWYWx1ZU9mKGkpKSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2luc2VydCc6XG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGlzdGVuVG9JdGVtKGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5pbnNlcnRBdChpbmRleCwgLi4uaXRlbXMubWFwKChpdGVtKSA9PiBnZXRWYWx1ZU9mKGl0ZW0pKSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2NsZWFyJzpcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIHByZXZpb3VzU3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0b3BMaXRlblRvSXRlbShpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXN1bHQuY2xlYXIoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAncmVtb3ZlJzpcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdG9wTGl0ZW5Ub0l0ZW0oaXRlbSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnJlbW92ZVJhbmdlKGluZGV4LCBpbmRleCArIGNvdW50KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAncmVtb3ZlTGVmdCc6XG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RvcExpdGVuVG9JdGVtKGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5yZW1vdmVMZWZ0KGNvdW50KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAncmVtb3ZlUmlnaHQnOlxuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0b3BMaXRlblRvSXRlbShpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXN1bHQucmVtb3ZlUmlnaHQoY291bnQpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdyZXBsYWNlJzpcbiAgICAgICAgICAgICAgICAgICAgc3RvcExpdGVuVG9JdGVtKHRhcmdldCk7XG4gICAgICAgICAgICAgICAgICAgIGxpc3RlblRvSXRlbShpdGVtc1swXSk7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5zZXQoaW5kZXgsIGdldFZhbHVlT2YoaXRlbXNbMF0pKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnc3dhcCc6XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5zd2FwKGluZGV4LCBpbmRleDIpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgY2FuY2VsbGF0aW9uKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgZnVuY3Rpb24gbGlzdGVuVG9JdGVtKGl0ZW0pIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgaXRlbSAhPT0gJ29iamVjdCcgfHwgISgnbGlzdGVuJyBpbiBpdGVtKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlc3Npb24uc2V0KGl0ZW0sIG5ldyBDYW5jZWxsYXRpb25Ub2tlbigpKTtcbiAgICAgICAgICAgIGNhbmNlbGxhdGlvbi5jaGFpbihzZXNzaW9uLmdldChpdGVtKSk7XG4gICAgICAgICAgICBpdGVtLmxpc3RlbigodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICByZXN1bHQuc2V0KGFycmF5RGF0YVNvdXJjZS5pbmRleE9mKGl0ZW0pLCB2YWx1ZSk7XG4gICAgICAgICAgICB9LCBzZXNzaW9uLmdldChpdGVtKSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gc3RvcExpdGVuVG9JdGVtKGl0ZW0pIHtcbiAgICAgICAgICAgIGlmIChzZXNzaW9uLmhhcyhpdGVtKSkge1xuICAgICAgICAgICAgICAgIHNlc3Npb24uZ2V0KGl0ZW0pLmNhbmNlbCgpO1xuICAgICAgICAgICAgICAgIHNlc3Npb24uZGVsZXRlKGl0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyBmcm9tQXN5bmNJdGVyYXRvcihpdGVyYXRvciwgY2FuY2VsbGF0aW9uKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBBcnJheURhdGFTb3VyY2UoKTtcbiAgICAgICAgKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGZvciBhd2FpdCAoY29uc3QgaXRlbSBvZiBpdGVyYXRvcikge1xuICAgICAgICAgICAgICAgIGlmIChjYW5jZWxsYXRpb24/LmlzQ2FuY2VsZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChpdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkoKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgc3RhdGljIGZyb21Qcm9taXNlQXJyYXkocHJvbWlzZXMsIGNhbmNlbGxhdGlvbikge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBuZXcgQXJyYXlEYXRhU291cmNlKCk7XG4gICAgICAgIChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBmb3IgYXdhaXQgKGNvbnN0IHByb21pc2Ugb2YgcHJvbWlzZUl0ZXJhdG9yKHByb21pc2VzLCBjYW5jZWxsYXRpb24pKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNhbmNlbGxhdGlvbj8uaXNDYW5jZWxlZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHByb21pc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KSgpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICB0b0FzeW5jSXRlcmF0b3IoY2FuY2VsbGF0aW9uKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnVwZGF0ZUV2ZW50LnRvQXN5bmNJdGVyYXRvcihjYW5jZWxsYXRpb24pO1xuICAgIH1cbiAgICBzdGF0aWMgdG9BcnJheURhdGFTb3VyY2UodmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgQXJyYXlEYXRhU291cmNlKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEFycmF5RGF0YVNvdXJjZSh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcGlwZSh0YXJnZXQsIGNhbmNlbGxhdGlvbikge1xuICAgICAgICB0aGlzLmxpc3RlbkFuZFJlcGVhdCgoYykgPT4gdGFyZ2V0LmFwcGx5Q29sbGVjdGlvbkNoYW5nZShjKSwgY2FuY2VsbGF0aW9uKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGFsbCBsaXN0ZW5lcnNcbiAgICAgKi9cbiAgICBjYW5jZWxBbGwoKSB7XG4gICAgICAgIHRoaXMub25JdGVtc0FkZGVkLmNhbmNlbEFsbCgpO1xuICAgICAgICB0aGlzLm9uSXRlbXNSZW1vdmVkLmNhbmNlbEFsbCgpO1xuICAgICAgICB0aGlzLnVwZGF0ZUV2ZW50LmNhbmNlbEFsbCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTYW1lIGFzIGxpc3RlbiBidXQgd2lsbCBpbW1lZGlhdGVseSBjYWxsIHRoZSBjYWxsYmFjayB3aXRoIGFuIGFwcGVuZCBvZiBhbGwgZXhpc3RpbmcgZWxlbWVudHMgZmlyc3RcbiAgICAgKi9cbiAgICBsaXN0ZW5BbmRSZXBlYXQoY2FsbGJhY2ssIGNhbmNlbGxhdGlvblRva2VuKSB7XG4gICAgICAgIGlmICh0aGlzLmRhdGEubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYWxsYmFjayh7XG4gICAgICAgICAgICAgICAgb3BlcmF0aW9uOiAnYWRkJyxcbiAgICAgICAgICAgICAgICBvcGVyYXRpb25EZXRhaWxlZDogJ2FwcGVuZCcsXG4gICAgICAgICAgICAgICAgaW5kZXg6IDAsXG4gICAgICAgICAgICAgICAgaXRlbXM6IHRoaXMuZGF0YSxcbiAgICAgICAgICAgICAgICBuZXdTdGF0ZTogdGhpcy5kYXRhLFxuICAgICAgICAgICAgICAgIGNvdW50OiB0aGlzLmRhdGEubGVuZ3RoXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5saXN0ZW4oY2FsbGJhY2ssIGNhbmNlbGxhdGlvblRva2VuKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VuZHMgYSByZXNldCBzaWduYWwgZm9sbG93ZWQgYnkgYW4gYXBwZW5kIHdpdGggYWxsIGl0ZW1zIHNpZ25hbC4gVGhpcyB3aWxsIGZvcmNlIGFsbCB0aGUgdmlld3Mgb2YgdGhpcyBzb3VyY2UgdGhlIHN5bmNocm9uaXplIGNhbiBiZSB1c2VmdWwgaW4gY2FzZSB5b3VyIHZpZXdzIHJlbHkgb24gbm9uIHB1cmUgdHJhbnNmb3JtYXRpb24gZnVuY3Rpb25zLlxuICAgICAqL1xuICAgIHJlcGVhdEN1cnJlbnRTdGF0ZSgpIHtcbiAgICAgICAgdGhpcy51cGRhdGUoe1xuICAgICAgICAgICAgb3BlcmF0aW9uOiAncmVtb3ZlJyxcbiAgICAgICAgICAgIG9wZXJhdGlvbkRldGFpbGVkOiAnY2xlYXInLFxuICAgICAgICAgICAgY291bnQ6IHRoaXMuZGF0YS5sZW5ndGgsXG4gICAgICAgICAgICBpbmRleDogMCxcbiAgICAgICAgICAgIGl0ZW1zOiB0aGlzLmRhdGEsXG4gICAgICAgICAgICBuZXdTdGF0ZTogW11cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMudXBkYXRlKHtcbiAgICAgICAgICAgIG9wZXJhdGlvbjogJ2FkZCcsXG4gICAgICAgICAgICBvcGVyYXRpb25EZXRhaWxlZDogJ2FwcGVuZCcsXG4gICAgICAgICAgICBpbmRleDogMCxcbiAgICAgICAgICAgIGl0ZW1zOiB0aGlzLmRhdGEsXG4gICAgICAgICAgICBuZXdTdGF0ZTogdGhpcy5kYXRhLFxuICAgICAgICAgICAgY291bnQ6IHRoaXMuZGF0YS5sZW5ndGhcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGxpc3RlbihjYWxsYmFjaywgY2FuY2VsbGF0aW9uVG9rZW4pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudXBkYXRlRXZlbnQuc3Vic2NyaWJlKGNhbGxiYWNrLCBjYW5jZWxsYXRpb25Ub2tlbikuY2FuY2VsO1xuICAgIH1cbiAgICBsaXN0ZW5PbmNlKGNhbGxiYWNrLCBjYW5jZWxsYXRpb25Ub2tlbikge1xuICAgICAgICByZXR1cm4gdGhpcy51cGRhdGVFdmVudC5zdWJzY3JpYmVPbmNlKGNhbGxiYWNrLCBjYW5jZWxsYXRpb25Ub2tlbikuY2FuY2VsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBcHBsaWVzIHRoZSBjaGFuZ2VzIGRlc2NyaWJlZCBpbiB0aGUgY29sbGVjaXRvbiBjaGFuZ2UgdG8gdGhlIGFycmF5LiBVc2VmdWwgZm9yIHN5bmNocm9uaXppbmcgYXJyYXkgZGF0YSBzb3VyY2VzIG92ZXIgdGhlIG5ldHdvcmsgb3Igd29ya2VycyBieSBzZXJpYWxpemluZyB0aGUgY2hhbmdlcyBhbmQgc2VuZGluZyB0aGVtIG92ZXJcbiAgICAgKiBAcGFyYW0gY29sbGVjdGlvbkNoYW5nZVxuICAgICAqL1xuICAgIGFwcGx5Q29sbGVjdGlvbkNoYW5nZShjb2xsZWN0aW9uQ2hhbmdlKSB7XG4gICAgICAgIHN3aXRjaCAoY29sbGVjdGlvbkNoYW5nZS5vcGVyYXRpb25EZXRhaWxlZCkge1xuICAgICAgICAgICAgY2FzZSAnYXBwZW5kJzpcbiAgICAgICAgICAgICAgICB0aGlzLmFwcGVuZEFycmF5KGNvbGxlY3Rpb25DaGFuZ2UuaXRlbXMpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnY2xlYXInOlxuICAgICAgICAgICAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2luc2VydCc6XG4gICAgICAgICAgICAgICAgdGhpcy5pbnNlcnRBdChjb2xsZWN0aW9uQ2hhbmdlLmluZGV4LCAuLi5jb2xsZWN0aW9uQ2hhbmdlLml0ZW1zKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ21lcmdlJzpcbiAgICAgICAgICAgICAgICB0aGlzLm1lcmdlKGNvbGxlY3Rpb25DaGFuZ2UuaXRlbXMpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAncHJlcGVuZCc6XG4gICAgICAgICAgICAgICAgdGhpcy51bnNoaWZ0KC4uLmNvbGxlY3Rpb25DaGFuZ2UuaXRlbXMpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAncmVtb3ZlJzpcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZVJhbmdlKGNvbGxlY3Rpb25DaGFuZ2UuaW5kZXgsIGNvbGxlY3Rpb25DaGFuZ2UuaW5kZXggKyBjb2xsZWN0aW9uQ2hhbmdlLmNvdW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3JlbW92ZUxlZnQnOlxuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlTGVmdChjb2xsZWN0aW9uQ2hhbmdlLmNvdW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3JlbW92ZVJpZ2h0JzpcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZVJpZ2h0KGNvbGxlY3Rpb25DaGFuZ2UuY291bnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAncmVwbGFjZSc6XG4gICAgICAgICAgICAgICAgdGhpcy5zZXQoY29sbGVjdGlvbkNoYW5nZS5pbmRleCwgY29sbGVjdGlvbkNoYW5nZS5pdGVtc1swXSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdzd2FwJzpcbiAgICAgICAgICAgICAgICB0aGlzLnN3YXAoY29sbGVjdGlvbkNoYW5nZS5pbmRleCwgY29sbGVjdGlvbkNoYW5nZS5pbmRleDIpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgbmV4dCB1cGRhdGUgb2NjdXJzXG4gICAgICogQHBhcmFtIGNhbmNlbGxhdGlvblRva2VuXG4gICAgICovXG4gICAgYXdhaXROZXh0VXBkYXRlKGNhbmNlbGxhdGlvblRva2VuKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5saXN0ZW5PbmNlKCh2YWx1ZSkgPT4gcmVzb2x2ZSh2YWx1ZSksIGNhbmNlbGxhdGlvblRva2VuKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGdldCBsZW5ndGgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxlbmd0aFNvdXJjZTtcbiAgICB9XG4gICAgZ2V0RGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YTtcbiAgICB9XG4gICAgZ2V0KGluZGV4KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGFbaW5kZXhdO1xuICAgIH1cbiAgICBzZXQoaW5kZXgsIGl0ZW0pIHtcbiAgICAgICAgY29uc3Qgb2xkID0gdGhpcy5kYXRhW2luZGV4XTtcbiAgICAgICAgaWYgKG9sZCA9PT0gaXRlbSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGF0YVtpbmRleF0gPSBpdGVtO1xuICAgICAgICB0aGlzLnVwZGF0ZSh7IG9wZXJhdGlvbjogJ3JlcGxhY2UnLCBvcGVyYXRpb25EZXRhaWxlZDogJ3JlcGxhY2UnLCB0YXJnZXQ6IG9sZCwgY291bnQ6IDEsIGluZGV4LCBpdGVtczogW2l0ZW1dLCBuZXdTdGF0ZTogdGhpcy5kYXRhIH0pO1xuICAgICAgICB0aGlzLm9uSXRlbXNSZW1vdmVkLmZpcmUoW29sZF0pO1xuICAgICAgICB0aGlzLm9uSXRlbXNBZGRlZC5maXJlKFtpdGVtXSk7XG4gICAgICAgIGlmICh0aGlzLmxlbmd0aFNvdXJjZS52YWx1ZSAhPT0gdGhpcy5kYXRhLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5sZW5ndGhTb3VyY2UudXBkYXRlKHRoaXMuZGF0YS5sZW5ndGgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGluZGV4T2YoaXRlbSkge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmluZGV4T2YoaXRlbSk7XG4gICAgfVxuICAgIGZpbmQocHJlZGljYXRlLCB0aGlzQXJnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZmluZChwcmVkaWNhdGUsIHRoaXNBcmcpO1xuICAgIH1cbiAgICBmaW5kSW5kZXgocHJlZGljYXRlLCB0aGlzQXJnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZmluZEluZGV4KHByZWRpY2F0ZSwgdGhpc0FyZyk7XG4gICAgfVxuICAgIGxhc3RJbmRleE9mKGl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5sYXN0SW5kZXhPZihpdGVtKTtcbiAgICB9XG4gICAgaW5jbHVkZXMoaXRlbSkge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmluY2x1ZGVzKGl0ZW0pO1xuICAgIH1cbiAgICByZXBsYWNlKGl0ZW0sIG5ld0l0ZW0pIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmluZGV4T2YoaXRlbSk7XG4gICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0KGluZGV4LCBuZXdJdGVtKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzd2FwKGluZGV4QSwgaW5kZXhCKSB7XG4gICAgICAgIGlmIChpbmRleEEgPT09IGluZGV4Qikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGl0ZW1BID0gdGhpcy5kYXRhW2luZGV4QV07XG4gICAgICAgIGNvbnN0IGl0ZW1CID0gdGhpcy5kYXRhW2luZGV4Ql07XG4gICAgICAgIHRoaXMuZGF0YVtpbmRleEJdID0gaXRlbUE7XG4gICAgICAgIHRoaXMuZGF0YVtpbmRleEFdID0gaXRlbUI7XG4gICAgICAgIHRoaXMudXBkYXRlKHsgb3BlcmF0aW9uOiAnc3dhcCcsIG9wZXJhdGlvbkRldGFpbGVkOiAnc3dhcCcsIGluZGV4OiBpbmRleEEsIGluZGV4MjogaW5kZXhCLCBpdGVtczogW2l0ZW1BLCBpdGVtQl0sIG5ld1N0YXRlOiB0aGlzLmRhdGEgfSk7XG4gICAgICAgIGlmICh0aGlzLmxlbmd0aFNvdXJjZS52YWx1ZSAhPT0gdGhpcy5kYXRhLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5sZW5ndGhTb3VyY2UudXBkYXRlKHRoaXMuZGF0YS5sZW5ndGgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN3YXBJdGVtcyhpdGVtQSwgaXRlbUIpIHtcbiAgICAgICAgaWYgKGl0ZW1BID09PSBpdGVtQikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGluZGV4QSA9IHRoaXMuZGF0YS5pbmRleE9mKGl0ZW1BKTtcbiAgICAgICAgY29uc3QgaW5kZXhCID0gdGhpcy5kYXRhLmluZGV4T2YoaXRlbUIpO1xuICAgICAgICBpZiAoaW5kZXhBICE9PSAtMSAmJiBpbmRleEIgIT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGFbaW5kZXhCXSA9IGl0ZW1BO1xuICAgICAgICAgICAgdGhpcy5kYXRhW2luZGV4QV0gPSBpdGVtQjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnVwZGF0ZSh7IG9wZXJhdGlvbjogJ3N3YXAnLCBvcGVyYXRpb25EZXRhaWxlZDogJ3N3YXAnLCBpbmRleDogaW5kZXhBLCBpbmRleDI6IGluZGV4QiwgaXRlbXM6IFtpdGVtQSwgaXRlbUJdLCBuZXdTdGF0ZTogdGhpcy5kYXRhIH0pO1xuICAgICAgICBpZiAodGhpcy5sZW5ndGhTb3VyY2UudmFsdWUgIT09IHRoaXMuZGF0YS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMubGVuZ3RoU291cmNlLnVwZGF0ZSh0aGlzLmRhdGEubGVuZ3RoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhcHBlbmRBcnJheShpdGVtcykge1xuICAgICAgICBpZiAoIWl0ZW1zIHx8IGl0ZW1zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpdGVtcy5sZW5ndGggPD0gNjUwMDApIHtcbiAgICAgICAgICAgIC8vUHVzaCBpcyBzaWduaWZpY2FudGx5IGZhc3RlciB0aGFuIGNvbmNhdCBidXQgaXQgaXMgbGltaXRlZCB0byA2NTUzNSBpdGVtcyBpbiBvbmUgcHVzaFxuICAgICAgICAgICAgdGhpcy5kYXRhLnB1c2guYXBwbHkodGhpcy5kYXRhLCBpdGVtcyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ0FwcGVuZGluZyBvdmVyIDY1MDAwIGl0ZW1zIGluIG9uZSBnbyBjYW4gbGVhZCB0byBwZXJmb3JtYW5jZSBpc3N1ZXMuIENvbnNpZGVyIHN0cmVhbWluZyB5b3VyIGNoYW5nZXMgcHJvZ3Jlc3NpdmVseScpO1xuICAgICAgICAgICAgdGhpcy5kYXRhID0gdGhpcy5kYXRhLmNvbmNhdChpdGVtcyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMubGVuZ3RoU291cmNlLnZhbHVlICE9PSB0aGlzLmRhdGEubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLmxlbmd0aFNvdXJjZS51cGRhdGUodGhpcy5kYXRhLmxlbmd0aCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy51cGRhdGUoe1xuICAgICAgICAgICAgb3BlcmF0aW9uOiAnYWRkJyxcbiAgICAgICAgICAgIG9wZXJhdGlvbkRldGFpbGVkOiAnYXBwZW5kJyxcbiAgICAgICAgICAgIGNvdW50OiBpdGVtcy5sZW5ndGgsXG4gICAgICAgICAgICBpbmRleDogdGhpcy5kYXRhLmxlbmd0aCAtIGl0ZW1zLmxlbmd0aCxcbiAgICAgICAgICAgIGl0ZW1zLFxuICAgICAgICAgICAgbmV3U3RhdGU6IHRoaXMuZGF0YVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5vbkl0ZW1zQWRkZWQuZmlyZShpdGVtcyk7XG4gICAgfVxuICAgIHNwbGljZShpbmRleCwgZGVsZXRlQ291bnQsIC4uLmluc2VydGlvbikge1xuICAgICAgICBsZXQgcmVtb3ZlZCA9IFtdO1xuICAgICAgICBpZiAoZGVsZXRlQ291bnQgPiAwKSB7XG4gICAgICAgICAgICByZW1vdmVkID0gdGhpcy5yZW1vdmVBdChpbmRleCwgZGVsZXRlQ291bnQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpbnNlcnRpb24gJiYgaW5zZXJ0aW9uLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuaW5zZXJ0QXQoaW5kZXgsIC4uLmluc2VydGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlbW92ZWQ7XG4gICAgfVxuICAgIGluc2VydEF0KGluZGV4LCAuLi5pdGVtcykge1xuICAgICAgICBpZiAoaXRlbXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kYXRhLnNwbGljZShpbmRleCwgMCwgLi4uaXRlbXMpO1xuICAgICAgICB0aGlzLnVwZGF0ZSh7XG4gICAgICAgICAgICBvcGVyYXRpb246ICdhZGQnLFxuICAgICAgICAgICAgb3BlcmF0aW9uRGV0YWlsZWQ6ICdpbnNlcnQnLFxuICAgICAgICAgICAgY291bnQ6IGl0ZW1zLmxlbmd0aCxcbiAgICAgICAgICAgIGluZGV4LFxuICAgICAgICAgICAgaXRlbXMsXG4gICAgICAgICAgICBuZXdTdGF0ZTogdGhpcy5kYXRhXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm9uSXRlbXNBZGRlZC5maXJlKGl0ZW1zKTtcbiAgICAgICAgdGhpcy5sZW5ndGhTb3VyY2UudXBkYXRlKHRoaXMuZGF0YS5sZW5ndGgpO1xuICAgIH1cbiAgICBwdXNoKC4uLml0ZW1zKSB7XG4gICAgICAgIHRoaXMuYXBwZW5kQXJyYXkoaXRlbXMpO1xuICAgIH1cbiAgICB1bnNoaWZ0KC4uLml0ZW1zKSB7XG4gICAgICAgIHRoaXMuZGF0YS51bnNoaWZ0KC4uLml0ZW1zKTtcbiAgICAgICAgaWYgKHRoaXMubGVuZ3RoU291cmNlLnZhbHVlICE9PSB0aGlzLmRhdGEubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLmxlbmd0aFNvdXJjZS51cGRhdGUodGhpcy5kYXRhLmxlbmd0aCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy51cGRhdGUoeyBvcGVyYXRpb246ICdhZGQnLCBvcGVyYXRpb25EZXRhaWxlZDogJ3ByZXBlbmQnLCBjb3VudDogaXRlbXMubGVuZ3RoLCBpdGVtcywgaW5kZXg6IDAsIG5ld1N0YXRlOiB0aGlzLmRhdGEgfSk7XG4gICAgICAgIHRoaXMub25JdGVtc0FkZGVkLmZpcmUoaXRlbXMpO1xuICAgIH1cbiAgICBwb3AoKSB7XG4gICAgICAgIC8vVGhpcyBjb3VsZCB0ZWNobmljYWxseSBqdXN0IGNhbGwgcmVtb3ZlUmlnaHQoMSkgYnV0IHJlbW92ZVJpZ2h0IGlzIGJhc2VkIG9uIHNwbGljaW5nIHdoaWNoIGNyZWF0ZXMgYSBuZXcgYXJyYXkgc28gdGhpcyBjYW4gYmUgc2lnbmlmaWNhbnRseSBmYXN0ZXJcbiAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuZGF0YS5wb3AoKTtcbiAgICAgICAgaWYgKHRoaXMubGVuZ3RoU291cmNlLnZhbHVlICE9PSB0aGlzLmRhdGEubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLmxlbmd0aFNvdXJjZS51cGRhdGUodGhpcy5kYXRhLmxlbmd0aCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy51cGRhdGUoe1xuICAgICAgICAgICAgb3BlcmF0aW9uOiAncmVtb3ZlJyxcbiAgICAgICAgICAgIG9wZXJhdGlvbkRldGFpbGVkOiAncmVtb3ZlUmlnaHQnLFxuICAgICAgICAgICAgY291bnQ6IDEsXG4gICAgICAgICAgICBpbmRleDogdGhpcy5kYXRhLmxlbmd0aCxcbiAgICAgICAgICAgIGl0ZW1zOiBbaXRlbV0sXG4gICAgICAgICAgICBuZXdTdGF0ZTogdGhpcy5kYXRhXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm9uSXRlbXNSZW1vdmVkLmZpcmUoW2l0ZW1dKTtcbiAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgfVxuICAgIG1lcmdlKG5ld0RhdGEpIHtcbiAgICAgICAgaWYgKG5ld0RhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jbGVhcigpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuZXdEYXRhID09PSB0aGlzLmRhdGEpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBvbGQgPSB0aGlzLmRhdGE7XG4gICAgICAgIHRoaXMuZGF0YSA9IG5ld0RhdGEuc2xpY2UoKTtcbiAgICAgICAgaWYgKHRoaXMubGVuZ3RoU291cmNlLnZhbHVlICE9PSB0aGlzLmRhdGEubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLmxlbmd0aFNvdXJjZS51cGRhdGUodGhpcy5kYXRhLmxlbmd0aCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy51cGRhdGUoe1xuICAgICAgICAgICAgb3BlcmF0aW9uOiAnbWVyZ2UnLFxuICAgICAgICAgICAgb3BlcmF0aW9uRGV0YWlsZWQ6ICdtZXJnZScsXG4gICAgICAgICAgICBwcmV2aW91c1N0YXRlOiBvbGQsXG4gICAgICAgICAgICBpbmRleDogMCxcbiAgICAgICAgICAgIGl0ZW1zOiB0aGlzLmRhdGEsXG4gICAgICAgICAgICBuZXdTdGF0ZTogdGhpcy5kYXRhXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm9uSXRlbXNSZW1vdmVkLmZpcmUob2xkKTtcbiAgICAgICAgdGhpcy5vbkl0ZW1zQWRkZWQuZmlyZSh0aGlzLmRhdGEpO1xuICAgIH1cbiAgICByZW1vdmVSaWdodChjb3VudCkge1xuICAgICAgICBjb25zdCBsZW5ndGggPSB0aGlzLmRhdGEubGVuZ3RoO1xuICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLmRhdGEuc3BsaWNlKGxlbmd0aCAtIGNvdW50LCBjb3VudCk7XG4gICAgICAgIGlmICh0aGlzLmxlbmd0aFNvdXJjZS52YWx1ZSAhPT0gdGhpcy5kYXRhLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5sZW5ndGhTb3VyY2UudXBkYXRlKHRoaXMuZGF0YS5sZW5ndGgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudXBkYXRlKHsgb3BlcmF0aW9uOiAncmVtb3ZlJywgb3BlcmF0aW9uRGV0YWlsZWQ6ICdyZW1vdmVSaWdodCcsIGNvdW50LCBpbmRleDogbGVuZ3RoIC0gY291bnQsIGl0ZW1zOiByZXN1bHQsIG5ld1N0YXRlOiB0aGlzLmRhdGEgfSk7XG4gICAgICAgIHRoaXMub25JdGVtc1JlbW92ZWQuZmlyZShyZXN1bHQpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICByZW1vdmVMZWZ0KGNvdW50KSB7XG4gICAgICAgIGNvbnN0IHJlbW92ZWQgPSB0aGlzLmRhdGEuc3BsaWNlKDAsIGNvdW50KTtcbiAgICAgICAgaWYgKHRoaXMubGVuZ3RoU291cmNlLnZhbHVlICE9PSB0aGlzLmRhdGEubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLmxlbmd0aFNvdXJjZS51cGRhdGUodGhpcy5kYXRhLmxlbmd0aCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy51cGRhdGUoeyBvcGVyYXRpb246ICdyZW1vdmUnLCBvcGVyYXRpb25EZXRhaWxlZDogJ3JlbW92ZUxlZnQnLCBjb3VudCwgaW5kZXg6IDAsIGl0ZW1zOiByZW1vdmVkLCBuZXdTdGF0ZTogdGhpcy5kYXRhIH0pO1xuICAgICAgICB0aGlzLm9uSXRlbXNSZW1vdmVkLmZpcmUocmVtb3ZlZCk7XG4gICAgfVxuICAgIHJlbW92ZVdoZXJlKHJlamVjdCkge1xuICAgICAgICBjb25zdCByZW1vdmVkID0gdGhpcy5kYXRhLmZpbHRlcihyZWplY3QpO1xuICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgcmVtb3ZlZCkge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmUoaXRlbSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVtb3ZlQXQoaW5kZXgsIGNvdW50ID0gMSkge1xuICAgICAgICBjb25zdCByZW1vdmVkID0gdGhpcy5kYXRhLnNwbGljZShpbmRleCwgY291bnQpO1xuICAgICAgICB0aGlzLnVwZGF0ZSh7IG9wZXJhdGlvbjogJ3JlbW92ZScsIG9wZXJhdGlvbkRldGFpbGVkOiAncmVtb3ZlJywgY291bnQ6IHJlbW92ZWQubGVuZ3RoLCBpbmRleCwgaXRlbXM6IHJlbW92ZWQsIG5ld1N0YXRlOiB0aGlzLmRhdGEgfSk7XG4gICAgICAgIHRoaXMub25JdGVtc1JlbW92ZWQuZmlyZShyZW1vdmVkKTtcbiAgICAgICAgaWYgKHRoaXMubGVuZ3RoU291cmNlLnZhbHVlICE9PSB0aGlzLmRhdGEubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLmxlbmd0aFNvdXJjZS51cGRhdGUodGhpcy5kYXRhLmxlbmd0aCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlbW92ZWQ7XG4gICAgfVxuICAgIHJlbW92ZVJhbmdlKHN0YXJ0LCBlbmQpIHtcbiAgICAgICAgY29uc3QgcmVtb3ZlZCA9IHRoaXMuZGF0YS5zcGxpY2Uoc3RhcnQsIGVuZCAtIHN0YXJ0KTtcbiAgICAgICAgaWYgKHRoaXMubGVuZ3RoU291cmNlLnZhbHVlICE9PSB0aGlzLmRhdGEubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLmxlbmd0aFNvdXJjZS51cGRhdGUodGhpcy5kYXRhLmxlbmd0aCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy51cGRhdGUoeyBvcGVyYXRpb246ICdyZW1vdmUnLCBvcGVyYXRpb25EZXRhaWxlZDogJ3JlbW92ZScsIGNvdW50OiByZW1vdmVkLmxlbmd0aCwgaW5kZXg6IHN0YXJ0LCBpdGVtczogcmVtb3ZlZCwgbmV3U3RhdGU6IHRoaXMuZGF0YSB9KTtcbiAgICAgICAgdGhpcy5vbkl0ZW1zUmVtb3ZlZC5maXJlKHJlbW92ZWQpO1xuICAgICAgICByZXR1cm4gcmVtb3ZlZDtcbiAgICB9XG4gICAgcmVtb3ZlKGl0ZW0pIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmRhdGEuaW5kZXhPZihpdGVtKTtcbiAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVtb3ZlQXQoaW5kZXgpWzBdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjbGVhcigpIHtcbiAgICAgICAgaWYgKHRoaXMuZGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBpdGVtcyA9IHRoaXMuZGF0YTtcbiAgICAgICAgdGhpcy5kYXRhID0gW107XG4gICAgICAgIGlmICh0aGlzLmxlbmd0aFNvdXJjZS52YWx1ZSAhPT0gdGhpcy5kYXRhLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5sZW5ndGhTb3VyY2UudXBkYXRlKHRoaXMuZGF0YS5sZW5ndGgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudXBkYXRlKHtcbiAgICAgICAgICAgIG9wZXJhdGlvbjogJ3JlbW92ZScsXG4gICAgICAgICAgICBvcGVyYXRpb25EZXRhaWxlZDogJ2NsZWFyJyxcbiAgICAgICAgICAgIGNvdW50OiBpdGVtcy5sZW5ndGgsXG4gICAgICAgICAgICBpbmRleDogMCxcbiAgICAgICAgICAgIGl0ZW1zLFxuICAgICAgICAgICAgcHJldmlvdXNTdGF0ZTogaXRlbXMsXG4gICAgICAgICAgICBuZXdTdGF0ZTogdGhpcy5kYXRhXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm9uSXRlbXNSZW1vdmVkLmZpcmUoaXRlbXMpO1xuICAgIH1cbiAgICBzb21lKGNiKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuc29tZShjYik7XG4gICAgfVxuICAgIGV2ZXJ5KGNiKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZXZlcnkoY2IpO1xuICAgIH1cbiAgICBzaGlmdCgpIHtcbiAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuZGF0YS5zaGlmdCgpO1xuICAgICAgICBpZiAodGhpcy5sZW5ndGhTb3VyY2UudmFsdWUgIT09IHRoaXMuZGF0YS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMubGVuZ3RoU291cmNlLnVwZGF0ZSh0aGlzLmRhdGEubGVuZ3RoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnVwZGF0ZSh7IG9wZXJhdGlvbjogJ3JlbW92ZScsIG9wZXJhdGlvbkRldGFpbGVkOiAncmVtb3ZlTGVmdCcsIGl0ZW1zOiBbaXRlbV0sIGNvdW50OiAxLCBpbmRleDogMCwgbmV3U3RhdGU6IHRoaXMuZGF0YSB9KTtcbiAgICAgICAgdGhpcy5vbkl0ZW1zUmVtb3ZlZC5maXJlKFtpdGVtXSk7XG4gICAgICAgIHJldHVybiBpdGVtO1xuICAgIH1cbiAgICB0b0FycmF5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLnNsaWNlKCk7XG4gICAgfVxuICAgIGZsYXQoY2FuY2VsbGF0aW9uVG9rZW4sIGNvbmZpZykge1xuICAgICAgICBjb25zdCB2aWV3ID0gbmV3IEZsYXR0ZW5lZEFycmF5Vmlldyh0aGlzLCAxLCBjYW5jZWxsYXRpb25Ub2tlbiwgdGhpcy5uYW1lICsgJy5mbGF0KCknLCBjb25maWcpO1xuICAgICAgICByZXR1cm4gdmlldztcbiAgICB9XG4gICAgcmVkdWNlKHJlZHVjZXIsIGluaXRpYWwsIGNhbmNlbGxhdGlvblRva2VuKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBEYXRhU291cmNlKGluaXRpYWwpO1xuICAgICAgICB0aGlzLmxpc3RlbkFuZFJlcGVhdCgoY2hhbmdlKSA9PiB7XG4gICAgICAgICAgICBzd2l0Y2ggKGNoYW5nZS5vcGVyYXRpb25EZXRhaWxlZCkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2FwcGVuZCc6XG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXdWYWwgPSByZXN1bHQudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBjaGFuZ2UuaXRlbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1ZhbCA9IHJlZHVjZXIobmV3VmFsLCBpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXN1bHQudXBkYXRlKG5ld1ZhbCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2NsZWFyJzpcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnVwZGF0ZShpbml0aWFsKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAncmVtb3ZlUmlnaHQnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ3JlbW92ZUxlZnQnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ3ByZXBlbmQnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ2luc2VydCc6XG4gICAgICAgICAgICAgICAgY2FzZSAnbWVyZ2UnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ3JlcGxhY2UnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ3N3YXAnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ3JlbW92ZSc6XG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXdWYWwyID0gaW5pdGlhbDtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIGNoYW5nZS5uZXdTdGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3VmFsMiA9IHJlZHVjZXIobmV3VmFsMiwgaXRlbSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnVwZGF0ZShuZXdWYWwyKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIGNhbmNlbGxhdGlvblRva2VuKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgcmV2ZXJzZShjYW5jZWxsYXRpb25Ub2tlbiwgY29uZmlnKSB7XG4gICAgICAgIGNvbnN0IHZpZXcgPSBuZXcgUmV2ZXJzZWRBcnJheVZpZXcodGhpcywgY2FuY2VsbGF0aW9uVG9rZW4sIHRoaXMubmFtZSArICcucmV2ZXJzZSgpJywgY29uZmlnKTtcbiAgICAgICAgcmV0dXJuIHZpZXc7XG4gICAgfVxuICAgIHNvcnQoY29tcGFyYXRvciA9IChhLCBiKSA9PiB7XG4gICAgICAgIGlmIChhID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGIgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBhID09PSAnbnVtYmVyJyAmJiB0eXBlb2YgYiA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHJldHVybiBhIC0gYjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBhLnRvU3RyaW5nKCkubG9jYWxlQ29tcGFyZShiLnRvU3RyaW5nKCkpO1xuICAgICAgICB9XG4gICAgfSwgZGVwZW5kZW5jaWVzID0gW10sIGNhbmNlbGxhdGlvblRva2VuLCBjb25maWcpIHtcbiAgICAgICAgY29uc3QgdmlldyA9IG5ldyBTb3J0ZWRBcnJheVZpZXcodGhpcywgY29tcGFyYXRvciwgY2FuY2VsbGF0aW9uVG9rZW4sIHRoaXMubmFtZSArICcuc29ydCgpJywgY29uZmlnKTtcbiAgICAgICAgZGVwZW5kZW5jaWVzLmZvckVhY2goKGRlcCkgPT4ge1xuICAgICAgICAgICAgZGVwLmxpc3RlbigoKSA9PiB2aWV3LnJlZnJlc2goKSk7XG4gICAgICAgIH0sIGNhbmNlbGxhdGlvblRva2VuKTtcbiAgICAgICAgcmV0dXJuIHZpZXc7XG4gICAgfVxuICAgIHNsaWNlKHN0YXJ0LCBlbmQsIGNhbmNlbGxhdGlvblRva2VuLCBjb25maWcpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBzdGFydCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHN0YXJ0ID0gbmV3IERhdGFTb3VyY2Uoc3RhcnQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgZW5kID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgZW5kID0gbmV3IERhdGFTb3VyY2UoZW5kKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZW5kID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGVuZCA9IHRoaXMubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgU2xpY2VkQXJyYXlWaWV3KHRoaXMsIHN0YXJ0LCBlbmQsIGNhbmNlbGxhdGlvblRva2VuLCB0aGlzLm5hbWUgKyAnLnNsaWNlKCknLCBjb25maWcpO1xuICAgIH1cbiAgICBtYXAobWFwcGVyLCBkZXBlbmRlbmNpZXMgPSBbXSwgY2FuY2VsbGF0aW9uVG9rZW4sIGNvbmZpZykge1xuICAgICAgICBjb25zdCB2aWV3ID0gbmV3IE1hcHBlZEFycmF5Vmlldyh0aGlzLCBtYXBwZXIsIGNhbmNlbGxhdGlvblRva2VuLCB0aGlzLm5hbWUgKyAnLm1hcCgpJywgY29uZmlnKTtcbiAgICAgICAgZGVwZW5kZW5jaWVzLmZvckVhY2goKGRlcCkgPT4ge1xuICAgICAgICAgICAgZGVwLmxpc3RlbigoKSA9PiB2aWV3LnJlZnJlc2goKSk7XG4gICAgICAgIH0sIGNhbmNlbGxhdGlvblRva2VuKTtcbiAgICAgICAgcmV0dXJuIHZpZXc7XG4gICAgfVxuICAgIHVuaXF1ZShjYW5jZWxsYXRpb25Ub2tlbiwgY29uZmlnKSB7XG4gICAgICAgIHJldHVybiBuZXcgVW5pcXVlQXJyYXlWaWV3KHRoaXMsIGNhbmNlbGxhdGlvblRva2VuLCB0aGlzLm5hbWUgKyAnLnVuaXF1ZSgpJywgY29uZmlnKTtcbiAgICB9XG4gICAgaW5kZXhCeShrZXksIGNhbmNlbGxhdGlvblRva2VuLCBjb25maWcpIHtcbiAgICAgICAgY29uc3QgdmlldyA9IG5ldyBNYXBEYXRhU291cmNlKCk7XG4gICAgICAgIHRoaXMubGlzdGVuQW5kUmVwZWF0KChjaGFuZ2UpID0+IHtcbiAgICAgICAgICAgIGlmICghY29uZmlnPy5pZ25vcmVkT3BlcmF0aW9ucz8uaW5jbHVkZXMoY2hhbmdlLm9wZXJhdGlvbkRldGFpbGVkKSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoY2hhbmdlLm9wZXJhdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdhZGQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIGNoYW5nZS5pdGVtcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZXcuc2V0KGl0ZW1ba2V5XSwgaXRlbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAncmVtb3ZlJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBjaGFuZ2UuaXRlbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWV3LmRlbGV0ZShpdGVtW2tleV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3JlcGxhY2UnOlxuICAgICAgICAgICAgICAgICAgICAgICAgdmlldy5kZWxldGUoY2hhbmdlLnRhcmdldFtrZXldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXcuc2V0KGNoYW5nZS5pdGVtc1swXVtrZXldLCBjaGFuZ2UuaXRlbXNbMF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ21lcmdlJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG9sZEtleXMgPSBuZXcgU2V0KHZpZXcua2V5cygpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld0tleXMgPSBuZXcgU2V0KGNoYW5nZS5pdGVtcy5tYXAoKGl0ZW0pID0+IGl0ZW1ba2V5XSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBvbGRLZXkgb2Ygb2xkS2V5cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbmV3S2V5cy5oYXMob2xkS2V5KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWV3LmRlbGV0ZShvbGRLZXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgbmV3S2V5IG9mIG5ld0tleXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW9sZEtleXMuaGFzKG5ld0tleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlldy5zZXQobmV3S2V5LCBjaGFuZ2UuaXRlbXMuZmluZCgoaXRlbSkgPT4gaXRlbVtrZXldID09PSBuZXdLZXkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIGNhbmNlbGxhdGlvblRva2VuKTtcbiAgICAgICAgcmV0dXJuIHZpZXc7XG4gICAgfVxuICAgIGluZGV4QnlQcm92aWRlcihwcm92aWRlciwgY2FuY2VsbGF0aW9uVG9rZW4sIGNvbmZpZykge1xuICAgICAgICBjb25zdCB2aWV3ID0gbmV3IE1hcERhdGFTb3VyY2UoKTtcbiAgICAgICAgdGhpcy5saXN0ZW5BbmRSZXBlYXQoKGNoYW5nZSkgPT4ge1xuICAgICAgICAgICAgaWYgKCFjb25maWc/Lmlnbm9yZWRPcGVyYXRpb25zPy5pbmNsdWRlcyhjaGFuZ2Uub3BlcmF0aW9uRGV0YWlsZWQpKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChjaGFuZ2Uub3BlcmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2FkZCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgY2hhbmdlLml0ZW1zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlldy5zZXQocHJvdmlkZXIoaXRlbSksIGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3JlbW92ZSc6XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgY2hhbmdlLml0ZW1zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlldy5kZWxldGUocHJvdmlkZXIoaXRlbSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3JlcGxhY2UnOlxuICAgICAgICAgICAgICAgICAgICAgICAgdmlldy5kZWxldGUocHJvdmlkZXIoY2hhbmdlLnRhcmdldCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmlldy5zZXQocHJvdmlkZXIoY2hhbmdlLml0ZW1zWzBdKSwgY2hhbmdlLml0ZW1zWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdtZXJnZSc6XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBvbGRLZXlzID0gbmV3IFNldCh2aWV3LmtleXMoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdLZXlzID0gbmV3IFNldChjaGFuZ2UuaXRlbXMubWFwKChpdGVtKSA9PiBwcm92aWRlcihpdGVtKSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBvbGRLZXkgb2Ygb2xkS2V5cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbmV3S2V5cy5oYXMob2xkS2V5KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWV3LmRlbGV0ZShvbGRLZXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgbmV3S2V5IG9mIG5ld0tleXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW9sZEtleXMuaGFzKG5ld0tleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlldy5zZXQobmV3S2V5LCBjaGFuZ2UuaXRlbXMuZmluZCgoaXRlbSkgPT4gcHJvdmlkZXIoaXRlbSkgPT09IG5ld0tleSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgY2FuY2VsbGF0aW9uVG9rZW4pO1xuICAgICAgICByZXR1cm4gdmlldztcbiAgICB9XG4gICAgZ3JvdXBCeShrZXksIGNhbmNlbGxhdGlvblRva2VuLCBjb25maWcpIHtcbiAgICAgICAgY29uc3QgdmlldyA9IG5ldyBNYXBEYXRhU291cmNlKCk7XG4gICAgICAgIGZ1bmN0aW9uIGhhbmRsZVJlbW92ZShpdGVtKSB7XG4gICAgICAgICAgICBjb25zdCBsaXN0ID0gdmlldy5nZXQoaXRlbVtrZXldKTtcbiAgICAgICAgICAgIGxpc3Quc3BsaWNlKGxpc3QuaW5kZXhPZihpdGVtKSwgMSk7XG4gICAgICAgICAgICBpZiAobGlzdC5sZW5ndGgudmFsdWUgPT09IDApIHtcbiAgICAgICAgICAgICAgICB2aWV3LmRlbGV0ZShpdGVtW2tleV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGhhbmRsZUFkZChpdGVtKSB7XG4gICAgICAgICAgICBpZiAoIXZpZXcuaGFzKGl0ZW1ba2V5XSkpIHtcbiAgICAgICAgICAgICAgICB2aWV3LnNldChpdGVtW2tleV0sIG5ldyBBcnJheURhdGFTb3VyY2UoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2aWV3LmdldChpdGVtW2tleV0pLnB1c2goaXRlbSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5saXN0ZW5BbmRSZXBlYXQoKGNoYW5nZSkgPT4ge1xuICAgICAgICAgICAgaWYgKCFjb25maWc/Lmlnbm9yZWRPcGVyYXRpb25zPy5pbmNsdWRlcyhjaGFuZ2Uub3BlcmF0aW9uRGV0YWlsZWQpKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChjaGFuZ2Uub3BlcmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2FkZCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgY2hhbmdlLml0ZW1zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlQWRkKGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3JlbW92ZSc6XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgY2hhbmdlLml0ZW1zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlUmVtb3ZlKGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3JlcGxhY2UnOlxuICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlUmVtb3ZlKGNoYW5nZS50YXJnZXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlQWRkKGNoYW5nZS5pdGVtc1swXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnbWVyZ2UnOlxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGlmZiA9IGNoYW5nZS5wcmV2aW91c1N0YXRlLmZpbHRlcigoaXRlbSkgPT4gIWNoYW5nZS5uZXdTdGF0ZS5pbmNsdWRlcyhpdGVtKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgZGlmZikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2aWV3LmhhcyhpdGVtW2tleV0pICYmIHZpZXcuZ2V0KGl0ZW1ba2V5XSkuaW5jbHVkZXMoaXRlbSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlUmVtb3ZlKGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBjaGFuZ2UuaXRlbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXZpZXcuaGFzKGl0ZW1ba2V5XSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlQWRkKGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF2aWV3LmdldChpdGVtW2tleV0pLmluY2x1ZGVzKGl0ZW0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVBZGQoaXRlbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIGNhbmNlbGxhdGlvblRva2VuKTtcbiAgICAgICAgcmV0dXJuIHZpZXc7XG4gICAgfVxuICAgIGdyb3VwQnlQcm92aWRlcihwcm92aWRlciwgY2FuY2VsbGF0aW9uVG9rZW4sIGNvbmZpZykge1xuICAgICAgICBjb25zdCB2aWV3ID0gbmV3IE1hcERhdGFTb3VyY2UoKTtcbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlUmVtb3ZlKGl0ZW0pIHtcbiAgICAgICAgICAgIGNvbnN0IGxpc3QgPSB2aWV3LmdldChwcm92aWRlcihpdGVtKSk7XG4gICAgICAgICAgICBsaXN0LnNwbGljZShsaXN0LmluZGV4T2YoaXRlbSksIDEpO1xuICAgICAgICAgICAgaWYgKGxpc3QubGVuZ3RoLnZhbHVlID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdmlldy5kZWxldGUocHJvdmlkZXIoaXRlbSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGhhbmRsZUFkZChpdGVtKSB7XG4gICAgICAgICAgICBpZiAoIXZpZXcuaGFzKHByb3ZpZGVyKGl0ZW0pKSkge1xuICAgICAgICAgICAgICAgIHZpZXcuc2V0KHByb3ZpZGVyKGl0ZW0pLCBuZXcgQXJyYXlEYXRhU291cmNlKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmlldy5nZXQocHJvdmlkZXIoaXRlbSkpLnB1c2goaXRlbSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5saXN0ZW5BbmRSZXBlYXQoKGNoYW5nZSkgPT4ge1xuICAgICAgICAgICAgaWYgKCFjb25maWc/Lmlnbm9yZWRPcGVyYXRpb25zPy5pbmNsdWRlcyhjaGFuZ2Uub3BlcmF0aW9uRGV0YWlsZWQpKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChjaGFuZ2Uub3BlcmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2FkZCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgY2hhbmdlLml0ZW1zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlQWRkKGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3JlbW92ZSc6XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgY2hhbmdlLml0ZW1zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlUmVtb3ZlKGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3JlcGxhY2UnOlxuICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlUmVtb3ZlKGNoYW5nZS50YXJnZXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlQWRkKGNoYW5nZS5pdGVtc1swXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnbWVyZ2UnOlxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGlmZiA9IGNoYW5nZS5wcmV2aW91c1N0YXRlLmZpbHRlcigoaXRlbSkgPT4gIWNoYW5nZS5uZXdTdGF0ZS5pbmNsdWRlcyhpdGVtKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgZGlmZikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2aWV3Lmhhcyhwcm92aWRlcihpdGVtKSkgJiYgdmlldy5nZXQocHJvdmlkZXIoaXRlbSkpLmluY2x1ZGVzKGl0ZW0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZVJlbW92ZShpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgY2hhbmdlLml0ZW1zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF2aWV3Lmhhcyhwcm92aWRlcihpdGVtKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlQWRkKGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF2aWV3LmdldChwcm92aWRlcihpdGVtKSkuaW5jbHVkZXMoaXRlbSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZUFkZChpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgY2FuY2VsbGF0aW9uVG9rZW4pO1xuICAgICAgICByZXR1cm4gdmlldztcbiAgICB9XG4gICAgZ3JvdXBCeU11bHRpUHJvdmlkZXIocHJvdmlkZXIsIGNhbmNlbGxhdGlvblRva2VuLCBjb25maWcpIHtcbiAgICAgICAgY29uc3QgdmlldyA9IG5ldyBNYXBEYXRhU291cmNlKCk7XG4gICAgICAgIGZ1bmN0aW9uIGhhbmRsZVJlbW92ZShpdGVtKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGkgb2YgcHJvdmlkZXIoaXRlbSkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBsaXN0ID0gdmlldy5nZXQoaSk7XG4gICAgICAgICAgICAgICAgbGlzdC5zcGxpY2UobGlzdC5pbmRleE9mKGl0ZW0pLCAxKTtcbiAgICAgICAgICAgICAgICBpZiAobGlzdC5sZW5ndGgudmFsdWUgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldy5kZWxldGUoaSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGhhbmRsZUFkZChpdGVtKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGkgb2YgcHJvdmlkZXIoaXRlbSkpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXZpZXcuaGFzKGkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXcuc2V0KGksIG5ldyBBcnJheURhdGFTb3VyY2UoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZpZXcuZ2V0KGkpLnB1c2goaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5saXN0ZW5BbmRSZXBlYXQoKGNoYW5nZSkgPT4ge1xuICAgICAgICAgICAgaWYgKCFjb25maWc/Lmlnbm9yZWRPcGVyYXRpb25zPy5pbmNsdWRlcyhjaGFuZ2Uub3BlcmF0aW9uRGV0YWlsZWQpKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChjaGFuZ2Uub3BlcmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2FkZCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgY2hhbmdlLml0ZW1zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlQWRkKGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3JlbW92ZSc6XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgY2hhbmdlLml0ZW1zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlUmVtb3ZlKGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3JlcGxhY2UnOlxuICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlUmVtb3ZlKGNoYW5nZS50YXJnZXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlQWRkKGNoYW5nZS5pdGVtc1swXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnbWVyZ2UnOlxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGlmZiA9IGNoYW5nZS5wcmV2aW91c1N0YXRlLmZpbHRlcigoaXRlbSkgPT4gIWNoYW5nZS5uZXdTdGF0ZS5pbmNsdWRlcyhpdGVtKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgZGlmZikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaSBvZiBwcm92aWRlcihpdGVtKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmlldy5oYXMoaSkgJiYgdmlldy5nZXQoaSkuaW5jbHVkZXMoaXRlbSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZVJlbW92ZShpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBjaGFuZ2UuaXRlbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGkgb2YgcHJvdmlkZXIoaXRlbSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF2aWV3LmhhcyhpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlQWRkKGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF2aWV3LmdldChpKS5pbmNsdWRlcyhpdGVtKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZUFkZChpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgY2FuY2VsbGF0aW9uVG9rZW4pO1xuICAgICAgICByZXR1cm4gdmlldztcbiAgICB9XG4gICAgZmlsdGVyKGNhbGxiYWNrLCBkZXBlbmRlbmNpZXMgPSBbXSwgY2FuY2VsbGF0aW9uVG9rZW4sIGNvbmZpZykge1xuICAgICAgICBjb25zdCB2aWV3ID0gbmV3IEZpbHRlcmVkQXJyYXlWaWV3KHRoaXMsIGNhbGxiYWNrLCBjYW5jZWxsYXRpb25Ub2tlbiwgdGhpcy5uYW1lICsgJy5maWx0ZXIoKScsIGNvbmZpZyk7XG4gICAgICAgIGRlcGVuZGVuY2llcy5mb3JFYWNoKChkZXApID0+IHtcbiAgICAgICAgICAgIGRlcC5saXN0ZW4oKCkgPT4gdmlldy5yZWZyZXNoKCksIGNhbmNlbGxhdGlvblRva2VuKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB2aWV3O1xuICAgIH1cbiAgICBsaW1pdChjb3VudCwgY2FuY2VsbGF0aW9uVG9rZW4pIHtcbiAgICAgICAgY29uc3QgdmlldyA9IG5ldyBMaW1pdGVkQXJyYXlWaWV3KHRoaXMsIGNvdW50LCBjYW5jZWxsYXRpb25Ub2tlbiwgdGhpcy5uYW1lICsgJy5saW1pdCgpJyk7XG4gICAgICAgIHJldHVybiB2aWV3O1xuICAgIH1cbiAgICBmb3JFYWNoKGNhbGxiYWNrZm4pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5mb3JFYWNoKGNhbGxiYWNrZm4pO1xuICAgIH1cbiAgICB1cGRhdGUoY2hhbmdlKSB7XG4gICAgICAgIHRoaXMudXBkYXRlRXZlbnQuZmlyZShjaGFuZ2UpO1xuICAgIH1cbn1cbmV4cG9ydCBjbGFzcyBGbGF0dGVuZWRBcnJheVZpZXcgZXh0ZW5kcyBBcnJheURhdGFTb3VyY2Uge1xuICAgIHBhcmVudDtcbiAgICBkZXB0aDtcbiAgICBzZXNzaW9uVG9rZW47XG4gICAgY29uc3RydWN0b3IocGFyZW50LCBkZXB0aCwgY2FuY2VsbGF0aW9uVG9rZW4gPSBuZXcgQ2FuY2VsbGF0aW9uVG9rZW4oKSwgbmFtZSwgY29uZmlnKSB7XG4gICAgICAgIHN1cGVyKFtdLCBuYW1lKTtcbiAgICAgICAgdGhpcy5kZXB0aCA9IGRlcHRoO1xuICAgICAgICB0aGlzLnBhcmVudCA9IHBhcmVudDtcbiAgICAgICAgdGhpcy5yZWZyZXNoKCk7XG4gICAgICAgIHBhcmVudC5saXN0ZW4oKGNoYW5nZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGNvbmZpZz8uaWdub3JlZE9wZXJhdGlvbnM/LmluY2x1ZGVzKGNoYW5nZS5vcGVyYXRpb25EZXRhaWxlZCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzd2l0Y2ggKGNoYW5nZS5vcGVyYXRpb25EZXRhaWxlZCkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ3JlbW92ZUxlZnQnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ3JlbW92ZVJpZ2h0JzpcbiAgICAgICAgICAgICAgICBjYXNlICdyZW1vdmUnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ3N3YXAnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ3JlcGxhY2UnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ2luc2VydCc6XG4gICAgICAgICAgICAgICAgY2FzZSAnbWVyZ2UnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ3ByZXBlbmQnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ2FwcGVuZCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaCgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdjbGVhcic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIGNhbmNlbGxhdGlvblRva2VuKTtcbiAgICB9XG4gICAgcmVmcmVzaCgpIHtcbiAgICAgICAgaWYgKHRoaXMuc2Vzc2lvblRva2VuKSB7XG4gICAgICAgICAgICB0aGlzLnNlc3Npb25Ub2tlbi5jYW5jZWwoKTtcbiAgICAgICAgICAgIHRoaXMuc2Vzc2lvblRva2VuID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLnBhcmVudC5nZXREYXRhKCk7XG4gICAgICAgIGlmIChkYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGlmIChkYXRhWzBdIGluc3RhbmNlb2YgQXJyYXlEYXRhU291cmNlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXNzaW9uVG9rZW4gPSBuZXcgQ2FuY2VsbGF0aW9uVG9rZW4oKTtcbiAgICAgICAgICAgICAgICBjb25zdCBjb21iaW5hdGlvbiA9IEFycmF5RGF0YVNvdXJjZS5mcm9tTXVsdGlwbGVTb3VyY2VzKGRhdGEpO1xuICAgICAgICAgICAgICAgIGNvbWJpbmF0aW9uLmxpc3RlbigoY2hhbmdlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXBwbHlDb2xsZWN0aW9uQ2hhbmdlKGNoYW5nZSk7XG4gICAgICAgICAgICAgICAgfSwgdGhpcy5zZXNzaW9uVG9rZW4pO1xuICAgICAgICAgICAgICAgIHRoaXMubWVyZ2UoY29tYmluYXRpb24uZ2V0RGF0YSgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMubWVyZ2UoZGF0YS5mbGF0KHRoaXMuZGVwdGgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydCBjbGFzcyBNYXBwZWRBcnJheVZpZXcgZXh0ZW5kcyBBcnJheURhdGFTb3VyY2Uge1xuICAgIHBhcmVudDtcbiAgICBtYXBwZXI7XG4gICAgY29uc3RydWN0b3IocGFyZW50LCBtYXBwZXIsIGNhbmNlbGxhdGlvblRva2VuID0gbmV3IENhbmNlbGxhdGlvblRva2VuKCksIG5hbWUsIGNvbmZpZykge1xuICAgICAgICBjb25zdCBpbml0aWFsID0gcGFyZW50LmdldERhdGEoKS5tYXAobWFwcGVyKTtcbiAgICAgICAgc3VwZXIoaW5pdGlhbCwgbmFtZSk7XG4gICAgICAgIHRoaXMucGFyZW50ID0gcGFyZW50O1xuICAgICAgICB0aGlzLm1hcHBlciA9IG1hcHBlcjtcbiAgICAgICAgcGFyZW50Lmxpc3RlbigoY2hhbmdlKSA9PiB7XG4gICAgICAgICAgICBpZiAoY29uZmlnPy5pZ25vcmVkT3BlcmF0aW9ucz8uaW5jbHVkZXMoY2hhbmdlLm9wZXJhdGlvbkRldGFpbGVkKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN3aXRjaCAoY2hhbmdlLm9wZXJhdGlvbkRldGFpbGVkKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAncmVtb3ZlTGVmdCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlTGVmdChjaGFuZ2UuY291bnQpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdyZW1vdmVSaWdodCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlUmlnaHQoY2hhbmdlLmNvdW50KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAncmVtb3ZlJzpcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGFuZ2UuaXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlKHRoaXMuZGF0YVtjaGFuZ2UuaW5kZXggKyBpXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnY2xlYXInOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3ByZXBlbmQnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc2hpZnQoLi4uY2hhbmdlLml0ZW1zLm1hcCh0aGlzLm1hcHBlcikpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdhcHBlbmQnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcGVuZEFycmF5KGNoYW5nZS5pdGVtcy5tYXAodGhpcy5tYXBwZXIpKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnaW5zZXJ0JzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnNlcnRBdChjaGFuZ2UuaW5kZXgsIC4uLmNoYW5nZS5pdGVtcy5tYXAodGhpcy5tYXBwZXIpKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnc3dhcCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3dhcChjaGFuZ2UuaW5kZXgsIGNoYW5nZS5pbmRleDIpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdyZXBsYWNlJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXQoY2hhbmdlLmluZGV4LCB0aGlzLm1hcHBlcihjaGFuZ2UuaXRlbXNbMF0pKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbWVyZ2UnOlxuICAgICAgICAgICAgICAgICAgICBjb25zdCBvbGQgPSB0aGlzLmRhdGEuc2xpY2UoKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc291cmNlID0gY2hhbmdlLnByZXZpb3VzU3RhdGUuc2xpY2UoKTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGFuZ2UubmV3U3RhdGUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmRhdGEubGVuZ3RoIDw9IGkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEucHVzaCh0aGlzLm1hcHBlcihjaGFuZ2UubmV3U3RhdGVbaV0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2UucHVzaChjaGFuZ2UubmV3U3RhdGVbaV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoc291cmNlW2ldICE9PSBjaGFuZ2UubmV3U3RhdGVbaV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpbmRleCA9IHNvdXJjZS5pbmRleE9mKGNoYW5nZS5uZXdTdGF0ZVtpXSwgaSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhID0gdGhpcy5kYXRhW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBiID0gdGhpcy5kYXRhW2luZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhW2ldID0gYjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhW2luZGV4XSA9IGE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGMgPSBzb3VyY2VbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGQgPSBzb3VyY2VbaW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2VbaV0gPSBkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2VbaW5kZXhdID0gYztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEuc3BsaWNlKGksIDAsIHRoaXMubWFwcGVyKGNoYW5nZS5uZXdTdGF0ZVtpXSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2Uuc3BsaWNlKGksIDAsIGNoYW5nZS5uZXdTdGF0ZVtpXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmRhdGEubGVuZ3RoID4gY2hhbmdlLm5ld1N0YXRlLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhLmxlbmd0aCA9IGNoYW5nZS5uZXdTdGF0ZS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sZW5ndGgudXBkYXRlKHRoaXMuZGF0YS5sZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb246ICdtZXJnZScsXG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb25EZXRhaWxlZDogJ21lcmdlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZpb3VzU3RhdGU6IG9sZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXM6IHRoaXMuZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1N0YXRlOiB0aGlzLmRhdGFcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25JdGVtc1JlbW92ZWQuZmlyZShvbGQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uSXRlbXNBZGRlZC5maXJlKHRoaXMuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBjYW5jZWxsYXRpb25Ub2tlbik7XG4gICAgfVxuICAgIHJlZnJlc2goKSB7XG4gICAgICAgIHRoaXMubWVyZ2UodGhpcy5wYXJlbnQuZ2V0RGF0YSgpLm1hcCh0aGlzLm1hcHBlcikpO1xuICAgIH1cbn1cbmV4cG9ydCBjbGFzcyBSZXZlcnNlZEFycmF5VmlldyBleHRlbmRzIEFycmF5RGF0YVNvdXJjZSB7XG4gICAgcGFyZW50O1xuICAgIGNvbnN0cnVjdG9yKHBhcmVudCwgY2FuY2VsbGF0aW9uVG9rZW4gPSBuZXcgQ2FuY2VsbGF0aW9uVG9rZW4oKSwgbmFtZSwgY29uZmlnKSB7XG4gICAgICAgIGNvbnN0IGluaXRpYWwgPSBwYXJlbnQuZ2V0RGF0YSgpLnNsaWNlKCkucmV2ZXJzZSgpO1xuICAgICAgICBzdXBlcihpbml0aWFsLCBuYW1lKTtcbiAgICAgICAgdGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG4gICAgICAgIHBhcmVudC5saXN0ZW4oKGNoYW5nZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGNvbmZpZz8uaWdub3JlZE9wZXJhdGlvbnM/LmluY2x1ZGVzKGNoYW5nZS5vcGVyYXRpb25EZXRhaWxlZCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzd2l0Y2ggKGNoYW5nZS5vcGVyYXRpb25EZXRhaWxlZCkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ3JlbW92ZUxlZnQnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZVJpZ2h0KGNoYW5nZS5jb3VudCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3JlbW92ZVJpZ2h0JzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVMZWZ0KGNoYW5nZS5jb3VudCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3JlbW92ZSc6XG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBjaGFuZ2UuaXRlbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlKGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2NsZWFyJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGVhcigpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdwcmVwZW5kJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHBlbmRBcnJheShjaGFuZ2UuaXRlbXMucmV2ZXJzZSgpKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnYXBwZW5kJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnNoaWZ0KC4uLmNoYW5nZS5pdGVtcy5yZXZlcnNlKCkpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdpbnNlcnQnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1lcmdlKGNoYW5nZS5uZXdTdGF0ZS5zbGljZSgpLnJldmVyc2UoKSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ21lcmdlJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tZXJnZShjaGFuZ2UuaXRlbXMuc2xpY2UoKS5yZXZlcnNlKCkpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdzd2FwJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tZXJnZShjaGFuZ2UubmV3U3RhdGUuc2xpY2UoKS5yZXZlcnNlKCkpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdyZXBsYWNlJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tZXJnZShjaGFuZ2UubmV3U3RhdGUuc2xpY2UoKS5yZXZlcnNlKCkpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgY2FuY2VsbGF0aW9uVG9rZW4pO1xuICAgIH1cbiAgICByZWZyZXNoKCkge1xuICAgICAgICB0aGlzLm1lcmdlKHRoaXMucGFyZW50LmdldERhdGEoKS5zbGljZSgpLnJldmVyc2UoKSk7XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIFNsaWNlZEFycmF5VmlldyBleHRlbmRzIEFycmF5RGF0YVNvdXJjZSB7XG4gICAgY29uc3RydWN0b3IocGFyZW50LCBzdGFydCwgZW5kLCBjYW5jZWxsYXRpb25Ub2tlbiA9IG5ldyBDYW5jZWxsYXRpb25Ub2tlbigpLCBuYW1lLCBjb25maWcpIHtcbiAgICAgICAgY29uc3QgaW5pdGlhbCA9IHBhcmVudC5nZXREYXRhKCkuc2xpY2Uoc3RhcnQudmFsdWUsIGVuZC52YWx1ZSk7XG4gICAgICAgIHN1cGVyKGluaXRpYWwsIG5hbWUpO1xuICAgICAgICBzdGFydC5saXN0ZW4oKCkgPT4gdGhpcy5tZXJnZShwYXJlbnQuZ2V0RGF0YSgpLnNsaWNlKHN0YXJ0LnZhbHVlLCBlbmQudmFsdWUpKSwgY2FuY2VsbGF0aW9uVG9rZW4pO1xuICAgICAgICBlbmQubGlzdGVuKCgpID0+IHRoaXMubWVyZ2UocGFyZW50LmdldERhdGEoKS5zbGljZShzdGFydC52YWx1ZSwgZW5kLnZhbHVlKSksIGNhbmNlbGxhdGlvblRva2VuKTtcbiAgICAgICAgcGFyZW50Lmxpc3RlbigoY2hhbmdlKSA9PiB7XG4gICAgICAgICAgICBpZiAoY29uZmlnPy5pZ25vcmVkT3BlcmF0aW9ucz8uaW5jbHVkZXMoY2hhbmdlLm9wZXJhdGlvbkRldGFpbGVkKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN3aXRjaCAoY2hhbmdlLm9wZXJhdGlvbkRldGFpbGVkKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAncmVtb3ZlTGVmdCc6XG4gICAgICAgICAgICAgICAgY2FzZSAncmVtb3ZlUmlnaHQnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ3JlbW92ZSc6XG4gICAgICAgICAgICAgICAgY2FzZSAnYXBwZW5kJzpcbiAgICAgICAgICAgICAgICBjYXNlICdwcmVwZW5kJzpcbiAgICAgICAgICAgICAgICBjYXNlICdpbnNlcnQnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ3N3YXAnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ3JlcGxhY2UnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ21lcmdlJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tZXJnZShwYXJlbnQuZ2V0RGF0YSgpLnNsaWNlKHN0YXJ0LnZhbHVlLCBlbmQudmFsdWUpKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnY2xlYXInOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBjYW5jZWxsYXRpb25Ub2tlbik7XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIFVuaXF1ZUFycmF5VmlldyBleHRlbmRzIEFycmF5RGF0YVNvdXJjZSB7XG4gICAgY29uc3RydWN0b3IocGFyZW50LCBjYW5jZWxsYXRpb25Ub2tlbiA9IG5ldyBDYW5jZWxsYXRpb25Ub2tlbigpLCBuYW1lLCBjb25maWcpIHtcbiAgICAgICAgY29uc3QgaW5pdGlhbCA9IEFycmF5LmZyb20obmV3IFNldChwYXJlbnQuZ2V0RGF0YSgpKSk7XG4gICAgICAgIHN1cGVyKGluaXRpYWwsIG5hbWUpO1xuICAgICAgICBsZXQgZmlsdGVyZWRJdGVtcztcbiAgICAgICAgcGFyZW50Lmxpc3RlbigoY2hhbmdlKSA9PiB7XG4gICAgICAgICAgICBpZiAoY29uZmlnPy5pZ25vcmVkT3BlcmF0aW9ucz8uaW5jbHVkZXMoY2hhbmdlLm9wZXJhdGlvbkRldGFpbGVkKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN3aXRjaCAoY2hhbmdlLm9wZXJhdGlvbkRldGFpbGVkKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAncmVtb3ZlTGVmdCc6XG4gICAgICAgICAgICAgICAgY2FzZSAncmVtb3ZlUmlnaHQnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ3JlbW92ZSc6XG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBjaGFuZ2UuaXRlbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY2hhbmdlLm5ld1N0YXRlLmluY2x1ZGVzKGl0ZW0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmUoaXRlbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnY2xlYXInOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3ByZXBlbmQnOlxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJlZEl0ZW1zID0gY2hhbmdlLml0ZW1zLmZpbHRlcigoZSkgPT4gIXRoaXMuZGF0YS5pbmNsdWRlcyhlKSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zaGlmdCguLi5maWx0ZXJlZEl0ZW1zKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnYXBwZW5kJzpcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyZWRJdGVtcyA9IGNoYW5nZS5pdGVtcy5maWx0ZXIoKGUpID0+ICF0aGlzLmRhdGEuaW5jbHVkZXMoZSkpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcGVuZEFycmF5KGZpbHRlcmVkSXRlbXMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdpbnNlcnQnOlxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJlZEl0ZW1zID0gY2hhbmdlLml0ZW1zLmZpbHRlcigoZSkgPT4gIXRoaXMuZGF0YS5pbmNsdWRlcyhlKSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5zZXJ0QXQoY2hhbmdlLmluZGV4LCAuLi5maWx0ZXJlZEl0ZW1zKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbWVyZ2UnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1lcmdlKEFycmF5LmZyb20obmV3IFNldChwYXJlbnQuZ2V0RGF0YSgpKSkpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdzd2FwJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zd2FwKGNoYW5nZS5pbmRleCwgY2hhbmdlLmluZGV4Mik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3JlcGxhY2UnOlxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5kYXRhLmluY2x1ZGVzKGNoYW5nZS5pdGVtc1swXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlKGNoYW5nZS50YXJnZXQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXQoY2hhbmdlLmluZGV4LCBjaGFuZ2UuaXRlbXNbMF0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBjYW5jZWxsYXRpb25Ub2tlbik7XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIFNvcnRlZEFycmF5VmlldyBleHRlbmRzIEFycmF5RGF0YVNvdXJjZSB7XG4gICAgY29tcGFyYXRvcjtcbiAgICBwYXJlbnQ7XG4gICAgY29uc3RydWN0b3IocGFyZW50LCBjb21wYXJhdG9yLCBjYW5jZWxsYXRpb25Ub2tlbiA9IG5ldyBDYW5jZWxsYXRpb25Ub2tlbigpLCBuYW1lLCBjb25maWcpIHtcbiAgICAgICAgY29uc3QgaW5pdGlhbCA9IHBhcmVudC5nZXREYXRhKCkuc2xpY2UoKS5zb3J0KGNvbXBhcmF0b3IpO1xuICAgICAgICBzdXBlcihpbml0aWFsLCBuYW1lKTtcbiAgICAgICAgdGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG4gICAgICAgIHRoaXMuY29tcGFyYXRvciA9IGNvbXBhcmF0b3I7XG4gICAgICAgIHBhcmVudC5saXN0ZW4oKGNoYW5nZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGNvbmZpZz8uaWdub3JlZE9wZXJhdGlvbnM/LmluY2x1ZGVzKGNoYW5nZS5vcGVyYXRpb25EZXRhaWxlZCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzd2l0Y2ggKGNoYW5nZS5vcGVyYXRpb25EZXRhaWxlZCkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ3JlbW92ZUxlZnQnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ3JlbW92ZVJpZ2h0JzpcbiAgICAgICAgICAgICAgICBjYXNlICdyZW1vdmUnOlxuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgY2hhbmdlLml0ZW1zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZShpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdjbGVhcic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAncHJlcGVuZCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zaGlmdCguLi5jaGFuZ2UuaXRlbXMpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEuc29ydCh0aGlzLmNvbXBhcmF0b3IpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdhcHBlbmQnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcGVuZFNvcnRlZChjaGFuZ2UuaXRlbXMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdpbnNlcnQnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcGVuZFNvcnRlZChjaGFuZ2UuaXRlbXMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdtZXJnZSc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWVyZ2UoY2hhbmdlLml0ZW1zLnNsaWNlKCkuc29ydCh0aGlzLmNvbXBhcmF0b3IpKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnc3dhcCc6XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3JlcGxhY2UnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZShjaGFuZ2UudGFyZ2V0KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHBlbmRTb3J0ZWQoY2hhbmdlLml0ZW1zKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIGNhbmNlbGxhdGlvblRva2VuKTtcbiAgICB9XG4gICAgYXBwZW5kU29ydGVkKGl0ZW1zKSB7XG4gICAgICAgIGlmIChpdGVtcy5sZW5ndGggPT09IDEgJiYgdGhpcy5kYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5wdXNoKGl0ZW1zWzBdKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubWVyZ2UodGhpcy5kYXRhLmNvbmNhdChpdGVtcykuc29ydCh0aGlzLmNvbXBhcmF0b3IpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZWZyZXNoKCkge1xuICAgICAgICB0aGlzLm1lcmdlKHRoaXMucGFyZW50LmdldERhdGEoKS5zbGljZSgpLnNvcnQodGhpcy5jb21wYXJhdG9yKSk7XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIEZpbHRlcmVkQXJyYXlWaWV3IGV4dGVuZHMgQXJyYXlEYXRhU291cmNlIHtcbiAgICB2aWV3RmlsdGVyO1xuICAgIHBhcmVudDtcbiAgICBjb25zdHJ1Y3RvcihwYXJlbnQsIGZpbHRlciwgY2FuY2VsbGF0aW9uVG9rZW4gPSBuZXcgQ2FuY2VsbGF0aW9uVG9rZW4oKSwgbmFtZSwgY29uZmlnKSB7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHBhcmVudCkpIHtcbiAgICAgICAgICAgIHBhcmVudCA9IG5ldyBBcnJheURhdGFTb3VyY2UocGFyZW50KTtcbiAgICAgICAgfVxuICAgICAgICBmaWx0ZXIgPSBmaWx0ZXIgPz8gKCgpID0+IHRydWUpO1xuICAgICAgICBjb25zdCBpbml0aWFsID0gcGFyZW50LmRhdGEuZmlsdGVyKGZpbHRlcik7XG4gICAgICAgIHN1cGVyKGluaXRpYWwsIG5hbWUpO1xuICAgICAgICB0aGlzLnBhcmVudCA9IHBhcmVudDtcbiAgICAgICAgdGhpcy52aWV3RmlsdGVyID0gZmlsdGVyO1xuICAgICAgICBwYXJlbnQubGlzdGVuKChjaGFuZ2UpID0+IHtcbiAgICAgICAgICAgIGlmIChjb25maWc/Lmlnbm9yZWRPcGVyYXRpb25zPy5pbmNsdWRlcyhjaGFuZ2Uub3BlcmF0aW9uRGV0YWlsZWQpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IGZpbHRlcmVkSXRlbXM7XG4gICAgICAgICAgICBzd2l0Y2ggKGNoYW5nZS5vcGVyYXRpb25EZXRhaWxlZCkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2NsZWFyJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGVhcigpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdyZW1vdmVMZWZ0JzpcbiAgICAgICAgICAgICAgICBjYXNlICdyZW1vdmVSaWdodCc6XG4gICAgICAgICAgICAgICAgY2FzZSAncmVtb3ZlJzpcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIGNoYW5nZS5pdGVtcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmUoaXRlbSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAncHJlcGVuZCc6XG4gICAgICAgICAgICAgICAgICAgIGZpbHRlcmVkSXRlbXMgPSBjaGFuZ2UuaXRlbXMuZmlsdGVyKHRoaXMudmlld0ZpbHRlcik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zaGlmdCguLi5maWx0ZXJlZEl0ZW1zKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnYXBwZW5kJzpcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyZWRJdGVtcyA9IGNoYW5nZS5pdGVtcy5maWx0ZXIodGhpcy52aWV3RmlsdGVyKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHBlbmRBcnJheShmaWx0ZXJlZEl0ZW1zKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnaW5zZXJ0JzpcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyZWRJdGVtcyA9IGNoYW5nZS5pdGVtcy5maWx0ZXIodGhpcy52aWV3RmlsdGVyKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnNlcnRBdChjaGFuZ2UuaW5kZXgsIC4uLmZpbHRlcmVkSXRlbXMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdtZXJnZSc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWVyZ2UoY2hhbmdlLml0ZW1zLmZpbHRlcih0aGlzLnZpZXdGaWx0ZXIpKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnc3dhcCc6XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4QSA9IHRoaXMuZGF0YS5pbmRleE9mKGNoYW5nZS5pdGVtc1swXSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4QiA9IHRoaXMuZGF0YS5pbmRleE9mKGNoYW5nZS5pdGVtc1sxXSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmRleEEgIT09IC0xICYmIGluZGV4QiAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3dhcChpbmRleEEsIGluZGV4Qik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAncmVwbGFjZSc6XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5kYXRhLmluZGV4T2YoY2hhbmdlLnRhcmdldCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFjY2VwdE5ldyA9IHRoaXMudmlld0ZpbHRlcihjaGFuZ2UuaXRlbXNbMF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFjY2VwdE5ldykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0KGluZGV4LCBjaGFuZ2UuaXRlbXNbMF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmUoY2hhbmdlLnRhcmdldCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIGNhbmNlbGxhdGlvblRva2VuKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVwbGFjZXMgdGhlIGZpbHRlciBmdW5jdGlvblxuICAgICAqIEBwYXJhbSBmaWx0ZXJcbiAgICAgKiBAcmV0dXJucyByZXR1cm5zIG5ldyBzaXplIG9mIGFycmF5IHZpZXcgYWZ0ZXIgYXBwbHlpbmcgZmlsdGVyXG4gICAgICovXG4gICAgdXBkYXRlRmlsdGVyKGZpbHRlcikge1xuICAgICAgICBpZiAodGhpcy52aWV3RmlsdGVyID09PSBmaWx0ZXIpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGEubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudmlld0ZpbHRlciA9IGZpbHRlcjtcbiAgICAgICAgdGhpcy5yZWZyZXNoKCk7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEubGVuZ3RoO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZWNhbGN1bGF0ZXMgdGhlIGZpbHRlci4gT25seSBuZWVkZWQgaWYgeW91ciBmaWx0ZXIgZnVuY3Rpb24gaXNuJ3QgcHVyZSBhbmQgeW91IGtub3cgdGhlIHJlc3VsdCB3b3VsZCBiZSBkaWZmZXJlbnQgaWYgcnVuIGFnYWluIGNvbXBhcmVkIHRvIGJlZm9yZVxuICAgICAqL1xuICAgIHJlZnJlc2goKSB7XG4gICAgICAgIHRoaXMubWVyZ2UodGhpcy5wYXJlbnQuZGF0YS5maWx0ZXIodGhpcy52aWV3RmlsdGVyKSk7XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIExpbWl0ZWRBcnJheVZpZXcgZXh0ZW5kcyBBcnJheURhdGFTb3VyY2Uge1xuICAgIGNvbnN0cnVjdG9yKHBhcmVudCwgc2l6ZUxpbWl0LCBjYW5jZWxsYXRpb25Ub2tlbiA9IG5ldyBDYW5jZWxsYXRpb25Ub2tlbigpLCBuYW1lKSB7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHBhcmVudCkpIHtcbiAgICAgICAgICAgIHBhcmVudCA9IG5ldyBBcnJheURhdGFTb3VyY2UocGFyZW50KTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBpbml0aWFsID0gcGFyZW50LmRhdGEuc2xpY2UoMCwgc2l6ZUxpbWl0KTtcbiAgICAgICAgc3VwZXIoaW5pdGlhbCwgbmFtZSk7XG4gICAgICAgIHBhcmVudC5saXN0ZW4oKGNoYW5nZSkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoIChjaGFuZ2Uub3BlcmF0aW9uRGV0YWlsZWQpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdjbGVhcic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAncmVtb3ZlTGVmdCc6XG4gICAgICAgICAgICAgICAgY2FzZSAncmVtb3ZlUmlnaHQnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ3JlbW92ZSc6XG4gICAgICAgICAgICAgICAgICAgIGlmIChjaGFuZ2UuaW5kZXggPCBzaXplTGltaXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlUmFuZ2UoY2hhbmdlLmluZGV4LCBjaGFuZ2UuaW5kZXggKyBNYXRoLm1pbihzaXplTGltaXQsIGNoYW5nZS5jb3VudCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZGF0YS5sZW5ndGggPCBzaXplTGltaXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcGVuZEFycmF5KGNoYW5nZS5uZXdTdGF0ZS5zbGljZSh0aGlzLmRhdGEubGVuZ3RoLCBzaXplTGltaXQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdwcmVwZW5kJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVSaWdodChNYXRoLm1pbihjaGFuZ2UuY291bnQsIHNpemVMaW1pdCkpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVuc2hpZnQoLi4uY2hhbmdlLml0ZW1zLnNsaWNlKDAsIHNpemVMaW1pdCkpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdhcHBlbmQnOlxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5kYXRhLmxlbmd0aCA8IHNpemVMaW1pdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHBlbmRBcnJheShjaGFuZ2UuaXRlbXMuc2xpY2UoMCwgc2l6ZUxpbWl0IC0gdGhpcy5kYXRhLmxlbmd0aCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2luc2VydCc6XG4gICAgICAgICAgICAgICAgICAgIGlmIChjaGFuZ2UuaW5kZXggPCBzaXplTGltaXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlUmlnaHQoTWF0aC5taW4oY2hhbmdlLmNvdW50LCBzaXplTGltaXQgLSBjaGFuZ2UuaW5kZXgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5zZXJ0QXQoY2hhbmdlLmluZGV4LCAuLi5jaGFuZ2UuaXRlbXMuc2xpY2UoMCwgc2l6ZUxpbWl0IC0gY2hhbmdlLmluZGV4KSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbWVyZ2UnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ3N3YXAnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1lcmdlKGNoYW5nZS5uZXdTdGF0ZS5zbGljZSgwLCBzaXplTGltaXQpKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAncmVwbGFjZSc6XG4gICAgICAgICAgICAgICAgICAgIGlmIChjaGFuZ2UuaW5kZXggPCBzaXplTGltaXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0KGNoYW5nZS5pbmRleCwgY2hhbmdlLml0ZW1zWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgY2FuY2VsbGF0aW9uVG9rZW4pO1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBwcm9jZXNzVHJhbnNmb3JtKG9wZXJhdGlvbnMsIHJlc3VsdCkge1xuICAgIHJldHVybiBhc3luYyAodikgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBvcGVyYXRpb24gb2Ygb3BlcmF0aW9ucykge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAob3BlcmF0aW9uLm9wZXJhdGlvblR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBPcGVyYXRpb25UeXBlLk5PT1A6XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgT3BlcmF0aW9uVHlwZS5NQVA6XG4gICAgICAgICAgICAgICAgICAgICAgICB2ID0gb3BlcmF0aW9uLm9wZXJhdGlvbih2KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIE9wZXJhdGlvblR5cGUuTUFQX0RFTEFZX0ZJTFRFUjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRtcCA9IGF3YWl0IG9wZXJhdGlvbi5vcGVyYXRpb24odik7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodG1wLmNhbmNlbGxlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYgPSBhd2FpdCB0bXAuaXRlbTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIE9wZXJhdGlvblR5cGUuREVMQVk6XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgT3BlcmF0aW9uVHlwZS5NQVBfREVMQVk6XG4gICAgICAgICAgICAgICAgICAgICAgICB2ID0gYXdhaXQgb3BlcmF0aW9uLm9wZXJhdGlvbih2KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIE9wZXJhdGlvblR5cGUuREVMQVlfRklMVEVSOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEoYXdhaXQgb3BlcmF0aW9uLm9wZXJhdGlvbih2KSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBPcGVyYXRpb25UeXBlLkZJTFRFUjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghb3BlcmF0aW9uLm9wZXJhdGlvbih2KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc3VsdC51cGRhdGUodik7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHJlc3VsdC5lbWl0RXJyb3IoZSk7XG4gICAgICAgIH1cbiAgICB9O1xufVxuZXhwb3J0IGNsYXNzIE1hcERhdGFTb3VyY2Uge1xuICAgIGRhdGE7XG4gICAgdXBkYXRlRXZlbnQ7XG4gICAgdXBkYXRlRXZlbnRPbktleTtcbiAgICBjb25zdHJ1Y3Rvcihpbml0aWFsRGF0YSkge1xuICAgICAgICB0aGlzLmRhdGEgPSBpbml0aWFsRGF0YSA/PyBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMudXBkYXRlRXZlbnQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIHRoaXMudXBkYXRlRXZlbnRPbktleSA9IG5ldyBNYXAoKTtcbiAgICB9XG4gICAgY2FuY2VsQWxsKCkge1xuICAgICAgICB0aGlzLnVwZGF0ZUV2ZW50LmNhbmNlbEFsbCgpO1xuICAgICAgICB0aGlzLnVwZGF0ZUV2ZW50T25LZXkuZm9yRWFjaCgodiwgaykgPT4gdi5jYW5jZWxBbGwoKSk7XG4gICAgICAgIHRoaXMudXBkYXRlRXZlbnRPbktleS5jbGVhcigpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDb25uZWN0cyB0byBhbiBhdXJ1bS1zZXJ2ZXIgZXhwb3NlZCBtYXAgZGF0YXNvdXJjZS4gVmlldyBodHRwczovL2dpdGh1Yi5jb20vQ3liZXJQaG9lbml4OTAvYXVydW0tc2VydmVyIGZvciBtb3JlIGluZm9ybWF0aW9uXG4gICAgICogTm90ZSB0aGF0IHR5cGUgc2FmZXR5IGlzIG5vdCBndWFyYW50ZWVkLiBXaGF0ZXZlciB0aGUgc2VydmVyIHNlbmRzIGFzIGFuIHVwZGF0ZSB3aWxsIGJlIHByb3BhZ2F0ZWQuIE1ha2Ugc3VyZSB5b3UgdHJ1c3QgdGhlIHNlcnZlclxuICAgICAqIEBwYXJhbSAge0F1cnVtU2VydmVySW5mb30gYXVydW1TZXJ2ZXJJbmZvXG4gICAgICogQHJldHVybnMgRGF0YVNvdXJjZVxuICAgICAqL1xuICAgIHN0YXRpYyBmcm9tUmVtb3RlU291cmNlKGF1cnVtU2VydmVySW5mbywgY2FuY2VsbGF0aW9uKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBNYXBEYXRhU291cmNlKCk7XG4gICAgICAgIHN5bmNNYXBEYXRhU291cmNlKHJlc3VsdCwgYXVydW1TZXJ2ZXJJbmZvLCBjYW5jZWxsYXRpb24pO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBzdGF0aWMgZnJvbU11bHRpcGxlTWFwcyhtYXBzLCBjYW5jZWxsYXRpb25Ub2tlbikge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBuZXcgTWFwRGF0YVNvdXJjZSgpO1xuICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgIGZvciAoY29uc3QgbWFwIG9mIG1hcHMpIHtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IGk7XG4gICAgICAgICAgICByZXN1bHQuYXNzaWduKG1hcCk7XG4gICAgICAgICAgICBtYXAubGlzdGVuKChjaGFuZ2UpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgaXNPdmVyd3JpdHRlbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSBpbmRleCArIDE7IGogPCBtYXBzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtYXBzW2pdLmhhcyhjaGFuZ2Uua2V5KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXNPdmVyd3JpdHRlbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIWlzT3ZlcndyaXR0ZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoYW5nZS5kZWxldGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuZGVsZXRlKGNoYW5nZS5rZXkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnNldChjaGFuZ2Uua2V5LCBjaGFuZ2UubmV3VmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgY2FuY2VsbGF0aW9uVG9rZW4pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIHRvQXN5bmNJdGVyYXRvcihjYW5jZWxsYXRpb24pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudXBkYXRlRXZlbnQudG9Bc3luY0l0ZXJhdG9yKGNhbmNlbGxhdGlvbik7XG4gICAgfVxuICAgIHBpcGUodGFyZ2V0LCBjYW5jZWxsYXRpb24pIHtcbiAgICAgICAgdGhpcy5saXN0ZW5BbmRSZXBlYXQoKGMpID0+IHRhcmdldC5hcHBseU1hcENoYW5nZShjKSwgY2FuY2VsbGF0aW9uKTtcbiAgICB9XG4gICAgZm9yRWFjaChjYWxsYmFja2ZuLCB0aGlzQXJnKSB7XG4gICAgICAgIHRoaXMuZGF0YS5mb3JFYWNoKGNhbGxiYWNrZm4sIHRoaXNBcmcpO1xuICAgIH1cbiAgICB0b1N0cmluZygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS50b1N0cmluZygpO1xuICAgIH1cbiAgICBzdGF0aWMgdG9NYXBEYXRhU291cmNlKHZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIE1hcERhdGFTb3VyY2UpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgTWFwRGF0YVNvdXJjZSh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXBwbHlNYXBDaGFuZ2UoY2hhbmdlKSB7XG4gICAgICAgIGlmIChjaGFuZ2UuZGVsZXRlZCAmJiB0aGlzLmRhdGEuaGFzKGNoYW5nZS5rZXkpKSB7XG4gICAgICAgICAgICB0aGlzLmRlbGV0ZShjaGFuZ2Uua2V5KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICghY2hhbmdlLmRlbGV0ZWQgJiYgIXRoaXMuZGF0YS5oYXMoY2hhbmdlLmtleSkpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0KGNoYW5nZS5rZXksIGNoYW5nZS5uZXdWYWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIGRhdGFzb3VyY2UgZm9yIGEgc2luZ2xlIGtleSBvZiB0aGUgb2JqZWN0XG4gICAgICogQHBhcmFtIGtleVxuICAgICAqIEBwYXJhbSBjYW5jZWxsYXRpb25Ub2tlblxuICAgICAqL1xuICAgIHBpY2soa2V5LCBjYW5jZWxsYXRpb25Ub2tlbikge1xuICAgICAgICBjb25zdCBzdWJEYXRhU291cmNlID0gbmV3IERhdGFTb3VyY2UodGhpcy5kYXRhLmdldChrZXkpKTtcbiAgICAgICAgdGhpcy5saXN0ZW5PbktleShrZXksICh2KSA9PiB7XG4gICAgICAgICAgICBzdWJEYXRhU291cmNlLnVwZGF0ZSh2Lm5ld1ZhbHVlKTtcbiAgICAgICAgfSwgY2FuY2VsbGF0aW9uVG9rZW4pO1xuICAgICAgICByZXR1cm4gc3ViRGF0YVNvdXJjZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTGlzdGVuIHRvIGNoYW5nZXMgb2YgdGhlIG9iamVjdFxuICAgICAqL1xuICAgIGxpc3RlbihjYWxsYmFjaywgY2FuY2VsbGF0aW9uVG9rZW4pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudXBkYXRlRXZlbnQuc3Vic2NyaWJlKGNhbGxiYWNrLCBjYW5jZWxsYXRpb25Ub2tlbikuY2FuY2VsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTYW1lIGFzIGxpc3RlbiBidXQgd2lsbCBpbW1lZGlhdGVseSBjYWxsIHRoZSBjYWxsYmFjayB3aXRoIHRoZSBjdXJyZW50IHZhbHVlIG9mIGVhY2gga2V5XG4gICAgICovXG4gICAgbGlzdGVuQW5kUmVwZWF0KGNhbGxiYWNrLCBjYW5jZWxsYXRpb25Ub2tlbikge1xuICAgICAgICBjb25zdCBjID0gdGhpcy51cGRhdGVFdmVudC5zdWJzY3JpYmUoY2FsbGJhY2ssIGNhbmNlbGxhdGlvblRva2VuKS5jYW5jZWw7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IG9mIHRoaXMuZGF0YS5rZXlzKCkpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKHtcbiAgICAgICAgICAgICAgICBrZXksXG4gICAgICAgICAgICAgICAgbmV3VmFsdWU6IHRoaXMuZGF0YS5nZXQoa2V5KSxcbiAgICAgICAgICAgICAgICBvbGRWYWx1ZTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIGRlbGV0ZWQ6IGZhbHNlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYztcbiAgICB9XG4gICAgbWFwKG1hcHBlciwgY2FuY2VsbGF0aW9uKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBNYXBEYXRhU291cmNlKCk7XG4gICAgICAgIGNvbnN0IGxpZmVUaW1lTWFwID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLmxpc3RlbkFuZFJlcGVhdCgoY2hhbmdlKSA9PiB7XG4gICAgICAgICAgICBpZiAoY2hhbmdlLmRlbGV0ZWQpIHtcbiAgICAgICAgICAgICAgICBsaWZlVGltZU1hcC5nZXQoY2hhbmdlLmtleSkuY2FuY2VsKCk7XG4gICAgICAgICAgICAgICAgbGlmZVRpbWVNYXAuZGVsZXRlKGNoYW5nZS5rZXkpO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5kZWxldGUoY2hhbmdlLmtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBsaWZlVGltZVRva2VuID0gbmV3IENhbmNlbGxhdGlvblRva2VuKCk7XG4gICAgICAgICAgICAgICAgaWYgKGxpZmVUaW1lTWFwLmhhcyhjaGFuZ2Uua2V5KSkge1xuICAgICAgICAgICAgICAgICAgICBsaWZlVGltZU1hcC5nZXQoY2hhbmdlLmtleSkuY2FuY2VsKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxpZmVUaW1lTWFwLnNldChjaGFuZ2Uua2V5LCBsaWZlVGltZVRva2VuKTtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdJdGVtID0gbWFwcGVyKGNoYW5nZS5rZXksIGNoYW5nZS5uZXdWYWx1ZSwgbGlmZVRpbWVUb2tlbik7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnNldChjaGFuZ2Uua2V5LCBuZXdJdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgY2FuY2VsbGF0aW9uKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgdG9LZXlzQXJyYXlEYXRhU291cmNlKGNhbmNlbGxhdGlvbikge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBuZXcgQXJyYXlEYXRhU291cmNlKCk7XG4gICAgICAgIHRoaXMubGlzdGVuQW5kUmVwZWF0KChjaGFuZ2UpID0+IHtcbiAgICAgICAgICAgIGlmIChjaGFuZ2UuZGVsZXRlZCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5yZW1vdmUoY2hhbmdlLmtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICghY2hhbmdlLmRlbGV0ZWQpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXJlc3VsdC5pbmNsdWRlcyhjaGFuZ2Uua2V5KSkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChjaGFuZ2Uua2V5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIGNhbmNlbGxhdGlvbik7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIHRvQXJyYXlEYXRhU291cmNlKGNhbmNlbGxhdGlvbikge1xuICAgICAgICBjb25zdCBzdGF0ZU1hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gbmV3IEFycmF5RGF0YVNvdXJjZSgpO1xuICAgICAgICB0aGlzLmxpc3RlbkFuZFJlcGVhdCgoY2hhbmdlKSA9PiB7XG4gICAgICAgICAgICBpZiAoY2hhbmdlLmRlbGV0ZWQgJiYgc3RhdGVNYXAuaGFzKGNoYW5nZS5rZXkpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IHN0YXRlTWFwLmdldChjaGFuZ2Uua2V5KTtcbiAgICAgICAgICAgICAgICByZXN1bHQucmVtb3ZlKGl0ZW0pO1xuICAgICAgICAgICAgICAgIHN0YXRlTWFwLmRlbGV0ZShjaGFuZ2Uua2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHN0YXRlTWFwLmhhcyhjaGFuZ2Uua2V5KSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld0l0ZW0gPSBjaGFuZ2UubmV3VmFsdWU7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnJlcGxhY2Uoc3RhdGVNYXAuZ2V0KGNoYW5nZS5rZXkpLCBuZXdJdGVtKTtcbiAgICAgICAgICAgICAgICBzdGF0ZU1hcC5zZXQoY2hhbmdlLmtleSwgbmV3SXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICghc3RhdGVNYXAuaGFzKGNoYW5nZS5rZXkpICYmICFjaGFuZ2UuZGVsZXRlZCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld0l0ZW0gPSBjaGFuZ2UubmV3VmFsdWU7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2gobmV3SXRlbSk7XG4gICAgICAgICAgICAgICAgc3RhdGVNYXAuc2V0KGNoYW5nZS5rZXksIG5ld0l0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBjYW5jZWxsYXRpb24pO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICB0b0VudHJpZXNBcnJheURhdGFTb3VyY2UoY2FuY2VsbGF0aW9uKSB7XG4gICAgICAgIGNvbnN0IHN0YXRlTWFwID0gbmV3IE1hcCgpO1xuICAgICAgICBjb25zdCByZXN1bHQgPSBuZXcgQXJyYXlEYXRhU291cmNlKCk7XG4gICAgICAgIHRoaXMubGlzdGVuQW5kUmVwZWF0KChjaGFuZ2UpID0+IHtcbiAgICAgICAgICAgIGlmIChjaGFuZ2UuZGVsZXRlZCAmJiBzdGF0ZU1hcC5oYXMoY2hhbmdlLmtleSkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbmRleCA9IHJlc3VsdC5maW5kSW5kZXgoKHYpID0+IHZbMF0gPT09IGNoYW5nZS5rZXkpO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5yZW1vdmVBdChpbmRleCk7XG4gICAgICAgICAgICAgICAgc3RhdGVNYXAuZGVsZXRlKGNoYW5nZS5rZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoc3RhdGVNYXAuaGFzKGNoYW5nZS5rZXkpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3SXRlbSA9IGNoYW5nZS5uZXdWYWx1ZTtcbiAgICAgICAgICAgICAgICBjb25zdCBpbmRleCA9IHJlc3VsdC5maW5kSW5kZXgoKHYpID0+IHZbMF0gPT09IGNoYW5nZS5rZXkpO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5zZXQoaW5kZXgsIFtjaGFuZ2Uua2V5LCBuZXdJdGVtXSk7XG4gICAgICAgICAgICAgICAgc3RhdGVNYXAuc2V0KGNoYW5nZS5rZXksIG5ld0l0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoIXN0YXRlTWFwLmhhcyhjaGFuZ2Uua2V5KSAmJiAhY2hhbmdlLmRlbGV0ZWQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdJdGVtID0gY2hhbmdlLm5ld1ZhbHVlO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKFtjaGFuZ2Uua2V5LCBuZXdJdGVtXSk7XG4gICAgICAgICAgICAgICAgc3RhdGVNYXAuc2V0KGNoYW5nZS5rZXksIG5ld0l0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBjYW5jZWxsYXRpb24pO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBjbGVhcigpIHtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgdGhpcy5kYXRhLmtleXMoKSkge1xuICAgICAgICAgICAgdGhpcy5kZWxldGUoa2V5KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBTYW1lIGFzIGxpc3Rlbk9uS2V5IGJ1dCB3aWxsIGltbWVkaWF0ZWx5IGNhbGwgdGhlIGNhbGxiYWNrIHdpdGggdGhlIGN1cnJlbnQgdmFsdWUgZmlyc3RcbiAgICAgKi9cbiAgICBsaXN0ZW5PbktleUFuZFJlcGVhdChrZXksIGNhbGxiYWNrLCBjYW5jZWxsYXRpb25Ub2tlbikge1xuICAgICAgICBjYWxsYmFjayh7XG4gICAgICAgICAgICBrZXksXG4gICAgICAgICAgICBuZXdWYWx1ZTogdGhpcy5kYXRhLmdldChrZXkpLFxuICAgICAgICAgICAgb2xkVmFsdWU6IHVuZGVmaW5lZFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdGVuT25LZXkoa2V5LCBjYWxsYmFjaywgY2FuY2VsbGF0aW9uVG9rZW4pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBMaXN0ZW4gdG8gY2hhbmdlcyBvZiBhIHNpbmdsZSBrZXkgb2YgdGhlIG9iamVjdFxuICAgICAqL1xuICAgIGxpc3Rlbk9uS2V5KGtleSwgY2FsbGJhY2ssIGNhbmNlbGxhdGlvblRva2VuKSB7XG4gICAgICAgIGlmICghdGhpcy51cGRhdGVFdmVudE9uS2V5LmhhcyhrZXkpKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUV2ZW50T25LZXkuc2V0KGtleSwgbmV3IEV2ZW50RW1pdHRlcigpKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBldmVudCA9IHRoaXMudXBkYXRlRXZlbnRPbktleS5nZXQoa2V5KTtcbiAgICAgICAgcmV0dXJuIGV2ZW50LnN1YnNjcmliZShjYWxsYmFjaywgY2FuY2VsbGF0aW9uVG9rZW4pLmNhbmNlbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbGwgdGhlIGtleXMgb2YgdGhlIG9iamVjdCBpbiB0aGUgc291cmNlXG4gICAgICovXG4gICAga2V5cygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5rZXlzKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYWxsIHRoZSB2YWx1ZXMgb2YgdGhlIG9iamVjdCBpbiB0aGUgc291cmNlXG4gICAgICovXG4gICAgdmFsdWVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLnZhbHVlcygpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBnZXQgdGhlIGN1cnJlbnQgdmFsdWUgb2YgYSBrZXkgb2YgdGhlIG9iamVjdFxuICAgICAqIEBwYXJhbSBrZXlcbiAgICAgKi9cbiAgICBnZXQoa2V5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0KGtleSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIGNoZWNrIGlmIG1hcCBoYXMgYSBrZXlcbiAgICAgKiBAcGFyYW0ga2V5XG4gICAgICovXG4gICAgaGFzKGtleSkge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmhhcyhrZXkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBkZWxldGUgYSBrZXkgZnJvbSB0aGUgb2JqZWN0XG4gICAgICogQHBhcmFtIGtleVxuICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAqL1xuICAgIGRlbGV0ZShrZXkpIHtcbiAgICAgICAgaWYgKCF0aGlzLmhhcyhrZXkpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgb2xkID0gdGhpcy5kYXRhLmdldChrZXkpO1xuICAgICAgICB0aGlzLmRhdGEuZGVsZXRlKGtleSk7XG4gICAgICAgIHRoaXMudXBkYXRlRXZlbnQuZmlyZSh7IG9sZFZhbHVlOiBvbGQsIGtleSwgbmV3VmFsdWU6IHVuZGVmaW5lZCwgZGVsZXRlZDogdHJ1ZSB9KTtcbiAgICAgICAgaWYgKHRoaXMudXBkYXRlRXZlbnRPbktleS5oYXMoa2V5KSkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVFdmVudE9uS2V5LmdldChrZXkpLmZpcmUoeyBvbGRWYWx1ZTogb2xkLCBrZXksIG5ld1ZhbHVlOiB1bmRlZmluZWQgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogc2V0IHRoZSB2YWx1ZSBmb3IgYSBrZXkgb2YgdGhlIG9iamVjdFxuICAgICAqIEBwYXJhbSBrZXlcbiAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgKi9cbiAgICBzZXQoa2V5LCB2YWx1ZSkge1xuICAgICAgICBpZiAodGhpcy5kYXRhLmdldChrZXkpID09PSB2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG9sZCA9IHRoaXMuZGF0YS5nZXQoa2V5KTtcbiAgICAgICAgdGhpcy5kYXRhLnNldChrZXksIHZhbHVlKTtcbiAgICAgICAgdGhpcy51cGRhdGVFdmVudC5maXJlKHsgb2xkVmFsdWU6IG9sZCwga2V5LCBuZXdWYWx1ZTogdGhpcy5kYXRhLmdldChrZXkpIH0pO1xuICAgICAgICBpZiAodGhpcy51cGRhdGVFdmVudE9uS2V5LmhhcyhrZXkpKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUV2ZW50T25LZXkuZ2V0KGtleSkuZmlyZSh7IG9sZFZhbHVlOiBvbGQsIGtleSwgbmV3VmFsdWU6IHRoaXMuZGF0YS5nZXQoa2V5KSB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBtZXJnZShuZXdEYXRhKSB7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IG9mIG5ld0RhdGEua2V5cygpKSB7XG4gICAgICAgICAgICB0aGlzLnNldChrZXksIG5ld0RhdGEuZ2V0KGtleSkpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3Qga2V5IG9mIHRoaXMua2V5cygpKSB7XG4gICAgICAgICAgICBpZiAoIW5ld0RhdGEuaGFzKGtleSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRlbGV0ZShrZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGVudHJpZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZW50cmllcygpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNZXJnZSB0aGUga2V5IHZhbHVlIHBhaXJzIG9mIGFuIG9iamVjdCBpbnRvIHRoaXMgb2JqZWN0IG5vbiByZWN1cnNpdmVseVxuICAgICAqIEBwYXJhbSBuZXdEYXRhXG4gICAgICovXG4gICAgYXNzaWduKG5ld0RhdGEpIHtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgbmV3RGF0YS5rZXlzKCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0KGtleSwgbmV3RGF0YS5nZXQoa2V5KSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIHNoYWxsb3cgY29weSBvZiB0aGUgbWFwXG4gICAgICovXG4gICAgdG9NYXAoKSB7XG4gICAgICAgIHJldHVybiBuZXcgTWFwKHRoaXMuZGF0YS5lbnRyaWVzKCkpO1xuICAgIH1cbn1cbmV4cG9ydCBjbGFzcyBTZXREYXRhU291cmNlIHtcbiAgICBkYXRhO1xuICAgIHVwZGF0ZUV2ZW50O1xuICAgIHVwZGF0ZUV2ZW50T25LZXk7XG4gICAgY29uc3RydWN0b3IoaW5pdGlhbERhdGEpIHtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoaW5pdGlhbERhdGEpKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGEgPSBuZXcgU2V0KGluaXRpYWxEYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YSA9IGluaXRpYWxEYXRhID8/IG5ldyBTZXQoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnVwZGF0ZUV2ZW50ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgICAgICB0aGlzLnVwZGF0ZUV2ZW50T25LZXkgPSBuZXcgTWFwKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENvbm5lY3RzIHRvIGFuIGF1cnVtLXNlcnZlciBleHBvc2VkIHNldCBkYXRhc291cmNlLiBWaWV3IGh0dHBzOi8vZ2l0aHViLmNvbS9DeWJlclBob2VuaXg5MC9hdXJ1bS1zZXJ2ZXIgZm9yIG1vcmUgaW5mb3JtYXRpb25cbiAgICAgKiBOb3RlIHRoYXQgdHlwZSBzYWZldHkgaXMgbm90IGd1YXJhbnRlZWQuIFdoYXRldmVyIHRoZSBzZXJ2ZXIgc2VuZHMgYXMgYW4gdXBkYXRlIHdpbGwgYmUgcHJvcGFnYXRlZC4gTWFrZSBzdXJlIHlvdSB0cnVzdCB0aGUgc2VydmVyXG4gICAgICogQHBhcmFtICB7QXVydW1TZXJ2ZXJJbmZvfSBhdXJ1bVNlcnZlckluZm9cbiAgICAgKiBAcmV0dXJucyBEYXRhU291cmNlXG4gICAgICovXG4gICAgc3RhdGljIGZyb21SZW1vdGVTb3VyY2UoYXVydW1TZXJ2ZXJJbmZvLCBjYW5jZWxsYXRpb24pIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gbmV3IFNldERhdGFTb3VyY2UodW5kZWZpbmVkKTtcbiAgICAgICAgc3luY1NldERhdGFTb3VyY2UocmVzdWx0LCBhdXJ1bVNlcnZlckluZm8sIGNhbmNlbGxhdGlvbik7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIHN0YXRpYyBmcm9tQXN5bmNJdGVyYXRvcihpdGVyYXRvciwgY2FuY2VsbGF0aW9uKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBTZXREYXRhU291cmNlKCk7XG4gICAgICAgIChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBmb3IgYXdhaXQgKGNvbnN0IGl0ZW0gb2YgaXRlcmF0b3IpIHtcbiAgICAgICAgICAgICAgICBpZiAoY2FuY2VsbGF0aW9uPy5pc0NhbmNlbGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmVzdWx0LmFkZChpdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkoKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgdG9Bc3luY0l0ZXJhdG9yKGNhbmNlbGxhdGlvbikge1xuICAgICAgICByZXR1cm4gdGhpcy51cGRhdGVFdmVudC50b0FzeW5jSXRlcmF0b3IoY2FuY2VsbGF0aW9uKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGFsbCBsaXN0ZW5lcnNcbiAgICAgKi9cbiAgICBjYW5jZWxBbGwoKSB7XG4gICAgICAgIHRoaXMudXBkYXRlRXZlbnQuY2FuY2VsQWxsKCk7XG4gICAgfVxuICAgIGFwcGx5U2V0Q2hhbmdlKGNoYW5nZSkge1xuICAgICAgICBpZiAoY2hhbmdlLmV4aXN0cyAmJiAhdGhpcy5oYXMoY2hhbmdlLmtleSkpIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YS5hZGQoY2hhbmdlLmtleSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIWNoYW5nZS5leGlzdHMgJiYgdGhpcy5oYXMoY2hhbmdlLmtleSkpIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YS5kZWxldGUoY2hhbmdlLmtleSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2xlYXIoKSB7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IG9mIHRoaXMuZGF0YS5rZXlzKCkpIHtcbiAgICAgICAgICAgIHRoaXMuZGVsZXRlKGtleSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaXNTdWJzZXRPZihvdGhlclNldCkge1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiB0aGlzKSB7XG4gICAgICAgICAgICBpZiAoIW90aGVyU2V0LmhhcyhrZXkpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpc1N1cGVyc2V0T2Yob3RoZXJTZXQpIHtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgb2Ygb3RoZXJTZXQpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5oYXMoa2V5KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaXNEaXNqb2ludFdpdGgob3RoZXJTZXQpIHtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgb2Ygb3RoZXJTZXQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmhhcyhrZXkpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBnZXQgc2l6ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5zaXplO1xuICAgIH1cbiAgICBpc0lkZW50aWNhbFRvKG90aGVyU2V0KSB7XG4gICAgICAgIGlmICh0aGlzLnNpemUgIT09IG90aGVyU2V0LnNpemUpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBvdGhlclNldCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmhhcyhrZXkpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBzdGF0aWMgdG9TZXREYXRhU291cmNlKHZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIFNldERhdGFTb3VyY2UpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgU2V0RGF0YVNvdXJjZSh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgW1N5bWJvbC5pdGVyYXRvcl0oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEua2V5cygpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFuIGl0ZXJhYmxlIG9mIFt2LHZdIHBhaXJzIGZvciBldmVyeSB2YWx1ZSBgdmAgaW4gdGhlIHNldC5cbiAgICAgKi9cbiAgICBlbnRyaWVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmVudHJpZXMoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbiBpdGVyYWJsZSBvZiB2YWx1ZXMgaW4gdGhlIHNldC5cbiAgICAgKi9cbiAgICB2YWx1ZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEudmFsdWVzKCk7XG4gICAgfVxuICAgIGRpZmZlcmVuY2Uob3RoZXJTZXQsIGNhbmNlbGxhdGlvblRva2VuKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBTZXREYXRhU291cmNlKCk7XG4gICAgICAgIGNvbnN0IG90aGVyU2V0S2V5cyA9IG5ldyBTZXQob3RoZXJTZXQua2V5cygpKTtcbiAgICAgICAgdGhpcy5saXN0ZW5BbmRSZXBlYXQoKGNoYW5nZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGNoYW5nZS5leGlzdHMgJiYgIW90aGVyU2V0S2V5cy5oYXMoY2hhbmdlLmtleSkpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQuYWRkKGNoYW5nZS5rZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFjaGFuZ2UuZXhpc3RzKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LmRlbGV0ZShjaGFuZ2Uua2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgY2FuY2VsbGF0aW9uVG9rZW4pO1xuICAgICAgICBvdGhlclNldC5saXN0ZW5BbmRSZXBlYXQoKGNoYW5nZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGNoYW5nZS5leGlzdHMpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQuZGVsZXRlKGNoYW5nZS5rZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFjaGFuZ2UuZXhpc3RzICYmIHRoaXMuaGFzKGNoYW5nZS5rZXkpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LmFkZChjaGFuZ2Uua2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgY2FuY2VsbGF0aW9uVG9rZW4pO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICB1bmlvbihvdGhlclNldCwgY2FuY2VsbGF0aW9uVG9rZW4pIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gbmV3IFNldERhdGFTb3VyY2UoKTtcbiAgICAgICAgdGhpcy5saXN0ZW5BbmRSZXBlYXQoKGNoYW5nZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGNoYW5nZS5leGlzdHMpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQuYWRkKGNoYW5nZS5rZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoIW90aGVyU2V0LmhhcyhjaGFuZ2Uua2V5KSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5kZWxldGUoY2hhbmdlLmtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIGNhbmNlbGxhdGlvblRva2VuKTtcbiAgICAgICAgb3RoZXJTZXQubGlzdGVuQW5kUmVwZWF0KChjaGFuZ2UpID0+IHtcbiAgICAgICAgICAgIGlmIChjaGFuZ2UuZXhpc3RzKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LmFkZChjaGFuZ2Uua2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCF0aGlzLmhhcyhjaGFuZ2Uua2V5KSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5kZWxldGUoY2hhbmdlLmtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIGNhbmNlbGxhdGlvblRva2VuKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgaW50ZXJzZWN0aW9uKG90aGVyU2V0LCBjYW5jZWxsYXRpb25Ub2tlbikge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBuZXcgU2V0RGF0YVNvdXJjZSgpO1xuICAgICAgICB0aGlzLmxpc3RlbkFuZFJlcGVhdCgoY2hhbmdlKSA9PiB7XG4gICAgICAgICAgICBpZiAoY2hhbmdlLmV4aXN0cyAmJiBvdGhlclNldC5oYXMoY2hhbmdlLmtleSkpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQuYWRkKGNoYW5nZS5rZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LmRlbGV0ZShjaGFuZ2Uua2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgY2FuY2VsbGF0aW9uVG9rZW4pO1xuICAgICAgICBvdGhlclNldC5saXN0ZW5BbmRSZXBlYXQoKGNoYW5nZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGNoYW5nZS5leGlzdHMgJiYgdGhpcy5oYXMoY2hhbmdlLmtleSkpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQuYWRkKGNoYW5nZS5rZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LmRlbGV0ZShjaGFuZ2Uua2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgY2FuY2VsbGF0aW9uVG9rZW4pO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBzeW1tZXRyaWNEaWZmZXJlbmNlKG90aGVyU2V0LCBjYW5jZWxsYXRpb25Ub2tlbikge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBuZXcgU2V0RGF0YVNvdXJjZSgpO1xuICAgICAgICB0aGlzLmxpc3RlbkFuZFJlcGVhdCgoY2hhbmdlKSA9PiB7XG4gICAgICAgICAgICBpZiAoY2hhbmdlLmV4aXN0cyAmJiAhb3RoZXJTZXQuaGFzKGNoYW5nZS5rZXkpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LmFkZChjaGFuZ2Uua2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCFjaGFuZ2UuZXhpc3RzICYmIG90aGVyU2V0LmhhcyhjaGFuZ2Uua2V5KSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5hZGQoY2hhbmdlLmtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjaGFuZ2UuZXhpc3RzICYmIG90aGVyU2V0LmhhcyhjaGFuZ2Uua2V5KSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5kZWxldGUoY2hhbmdlLmtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICghY2hhbmdlLmV4aXN0cyAmJiAhb3RoZXJTZXQuaGFzKGNoYW5nZS5rZXkpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LmRlbGV0ZShjaGFuZ2Uua2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgY2FuY2VsbGF0aW9uVG9rZW4pO1xuICAgICAgICBvdGhlclNldC5saXN0ZW5BbmRSZXBlYXQoKGNoYW5nZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGNoYW5nZS5leGlzdHMgJiYgIXRoaXMuaGFzKGNoYW5nZS5rZXkpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LmFkZChjaGFuZ2Uua2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCFjaGFuZ2UuZXhpc3RzICYmIHRoaXMuaGFzKGNoYW5nZS5rZXkpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LmFkZChjaGFuZ2Uua2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNoYW5nZS5leGlzdHMgJiYgdGhpcy5oYXMoY2hhbmdlLmtleSkpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQuZGVsZXRlKGNoYW5nZS5rZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoIWNoYW5nZS5leGlzdHMgJiYgIXRoaXMuaGFzKGNoYW5nZS5rZXkpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LmRlbGV0ZShjaGFuZ2Uua2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgY2FuY2VsbGF0aW9uVG9rZW4pO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICB0b1N0cmluZygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS50b1N0cmluZygpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgZGF0YXNvdXJjZSBmb3IgYSBzaW5nbGUga2V5IG9mIHRoZSBvYmplY3RcbiAgICAgKiBAcGFyYW0ga2V5XG4gICAgICogQHBhcmFtIGNhbmNlbGxhdGlvblRva2VuXG4gICAgICovXG4gICAgcGljayhrZXksIGNhbmNlbGxhdGlvblRva2VuKSB7XG4gICAgICAgIGNvbnN0IHN1YkRhdGFTb3VyY2UgPSBuZXcgRGF0YVNvdXJjZSh0aGlzLmRhdGEuaGFzKGtleSkpO1xuICAgICAgICB0aGlzLmxpc3Rlbk9uS2V5KGtleSwgKHYpID0+IHtcbiAgICAgICAgICAgIHN1YkRhdGFTb3VyY2UudXBkYXRlKHYpO1xuICAgICAgICB9LCBjYW5jZWxsYXRpb25Ub2tlbik7XG4gICAgICAgIHJldHVybiBzdWJEYXRhU291cmNlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBMaXN0ZW4gdG8gY2hhbmdlcyBvZiB0aGUgb2JqZWN0XG4gICAgICovXG4gICAgbGlzdGVuKGNhbGxiYWNrLCBjYW5jZWxsYXRpb25Ub2tlbikge1xuICAgICAgICByZXR1cm4gdGhpcy51cGRhdGVFdmVudC5zdWJzY3JpYmUoY2FsbGJhY2ssIGNhbmNlbGxhdGlvblRva2VuKS5jYW5jZWw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNhbWUgYXMgbGlzdGVuIGJ1dCB3aWxsIGltbWVkaWF0ZWx5IGNhbGwgdGhlIGNhbGxiYWNrIHdpdGggdGhlIGN1cnJlbnQgdmFsdWUgb2YgZWFjaCBrZXlcbiAgICAgKi9cbiAgICBsaXN0ZW5BbmRSZXBlYXQoY2FsbGJhY2ssIGNhbmNlbGxhdGlvblRva2VuKSB7XG4gICAgICAgIGNvbnN0IGMgPSB0aGlzLnVwZGF0ZUV2ZW50LnN1YnNjcmliZShjYWxsYmFjaywgY2FuY2VsbGF0aW9uVG9rZW4pLmNhbmNlbDtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgdGhpcy5kYXRhLmtleXMoKSkge1xuICAgICAgICAgICAgY2FsbGJhY2soe1xuICAgICAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgICAgICBleGlzdHM6IHRydWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTYW1lIGFzIGxpc3Rlbk9uS2V5IGJ1dCB3aWxsIGltbWVkaWF0ZWx5IGNhbGwgdGhlIGNhbGxiYWNrIHdpdGggdGhlIGN1cnJlbnQgdmFsdWUgZmlyc3RcbiAgICAgKi9cbiAgICBsaXN0ZW5PbktleUFuZFJlcGVhdChrZXksIGNhbGxiYWNrLCBjYW5jZWxsYXRpb25Ub2tlbikge1xuICAgICAgICBjYWxsYmFjayh0aGlzLmhhcyhrZXkpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdGVuT25LZXkoa2V5LCBjYWxsYmFjaywgY2FuY2VsbGF0aW9uVG9rZW4pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBMaXN0ZW4gdG8gY2hhbmdlcyBvZiBhIHNpbmdsZSBrZXkgb2YgdGhlIG9iamVjdFxuICAgICAqL1xuICAgIGxpc3Rlbk9uS2V5KGtleSwgY2FsbGJhY2ssIGNhbmNlbGxhdGlvblRva2VuKSB7XG4gICAgICAgIGlmICghdGhpcy51cGRhdGVFdmVudE9uS2V5LmhhcyhrZXkpKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUV2ZW50T25LZXkuc2V0KGtleSwgbmV3IEV2ZW50RW1pdHRlcigpKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBldmVudCA9IHRoaXMudXBkYXRlRXZlbnRPbktleS5nZXQoa2V5KTtcbiAgICAgICAgcmV0dXJuIGV2ZW50LnN1YnNjcmliZShjYWxsYmFjaywgY2FuY2VsbGF0aW9uVG9rZW4pLmNhbmNlbDtcbiAgICB9XG4gICAgdG9BcnJheURhdGFTb3VyY2UoY2FuY2VsbGF0aW9uVG9rZW4pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWFwKChrZXkpID0+IGtleSwgY2FuY2VsbGF0aW9uVG9rZW4pO1xuICAgIH1cbiAgICBtYXAobWFwcGVyLCBjYW5jZWxsYXRpb25Ub2tlbikge1xuICAgICAgICBjb25zdCBzdGF0ZU1hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gbmV3IEFycmF5RGF0YVNvdXJjZSgpO1xuICAgICAgICB0aGlzLmxpc3RlbkFuZFJlcGVhdCgoY2hhbmdlKSA9PiB7XG4gICAgICAgICAgICBpZiAoIWNoYW5nZS5leGlzdHMgJiYgc3RhdGVNYXAuaGFzKGNoYW5nZS5rZXkpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IHN0YXRlTWFwLmdldChjaGFuZ2Uua2V5KTtcbiAgICAgICAgICAgICAgICByZXN1bHQucmVtb3ZlKGl0ZW0pO1xuICAgICAgICAgICAgICAgIHN0YXRlTWFwLmRlbGV0ZShjaGFuZ2Uua2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCFzdGF0ZU1hcC5oYXMoY2hhbmdlLmtleSkgJiYgY2hhbmdlLmV4aXN0cykge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld0l0ZW0gPSBtYXBwZXIoY2hhbmdlLmtleSk7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2gobmV3SXRlbSk7XG4gICAgICAgICAgICAgICAgc3RhdGVNYXAuc2V0KGNoYW5nZS5rZXksIG5ld0l0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBjYW5jZWxsYXRpb25Ub2tlbik7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYWxsIHRoZSBrZXlzIG9mIHRoZSBvYmplY3QgaW4gdGhlIHNvdXJjZVxuICAgICAqL1xuICAgIGtleXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEua2V5cygpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBjaGVjayBpZiBtYXAgaGFzIGEga2V5XG4gICAgICogQHBhcmFtIGtleVxuICAgICAqL1xuICAgIGhhcyhrZXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5oYXMoa2V5KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIGRhdGFzb3VyY2UgdGhhdCByZWZsZWN0cyBpZiB0aGUga2V5IGV4aXN0cyBpbiB0aGUgc2V0XG4gICAgICogQHBhcmFtIGtleVxuICAgICAqIEBwYXJhbSBjYW5jZWxsYXRpb25Ub2tlblxuICAgICAqIEByZXR1cm5zXG4gICAgICovXG4gICAgcGlja0tleShrZXksIGNhbmNlbGxhdGlvblRva2VuKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBEYXRhU291cmNlKHRoaXMuaGFzKGtleSkpO1xuICAgICAgICB0aGlzLmxpc3Rlbk9uS2V5KGtleSwgKHYpID0+IHJlc3VsdC51cGRhdGUodiksIGNhbmNlbGxhdGlvblRva2VuKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogZGVsZXRlIGEga2V5IGZyb20gdGhlIG9iamVjdFxuICAgICAqIEBwYXJhbSBrZXlcbiAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgKi9cbiAgICBkZWxldGUoa2V5KSB7XG4gICAgICAgIGlmICh0aGlzLmhhcyhrZXkpKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGEuZGVsZXRlKGtleSk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUV2ZW50LmZpcmUoeyBrZXksIGV4aXN0czogZmFsc2UgfSk7XG4gICAgICAgICAgICBpZiAodGhpcy51cGRhdGVFdmVudE9uS2V5LmhhcyhrZXkpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVFdmVudE9uS2V5LmdldChrZXkpLmZpcmUoZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIHNldCB0aGUgdmFsdWUgZm9yIGEga2V5IG9mIHRoZSBvYmplY3RcbiAgICAgKiBAcGFyYW0ga2V5XG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICovXG4gICAgYWRkKGtleSkge1xuICAgICAgICBpZiAodGhpcy5kYXRhLmhhcyhrZXkpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kYXRhLmFkZChrZXkpO1xuICAgICAgICB0aGlzLnVwZGF0ZUV2ZW50LmZpcmUoeyBrZXksIGV4aXN0czogdHJ1ZSB9KTtcbiAgICAgICAgaWYgKHRoaXMudXBkYXRlRXZlbnRPbktleS5oYXMoa2V5KSkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVFdmVudE9uS2V5LmdldChrZXkpLmZpcmUodHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbWVyZ2UobmV3RGF0YSkge1xuICAgICAgICBsZXQgbmV3SXRlbXM7XG4gICAgICAgIGlmIChuZXdEYXRhIGluc3RhbmNlb2YgU2V0RGF0YVNvdXJjZSkge1xuICAgICAgICAgICAgbmV3SXRlbXMgPSBuZXdEYXRhLmRhdGE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobmV3RGF0YSBpbnN0YW5jZW9mIFNldCkge1xuICAgICAgICAgICAgbmV3SXRlbXMgPSBuZXdEYXRhO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG5ld0RhdGEgaW5zdGFuY2VvZiBBcnJheURhdGFTb3VyY2UpIHtcbiAgICAgICAgICAgIG5ld0l0ZW1zID0gbmV3IFNldChuZXdEYXRhLmdldERhdGEoKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBuZXdJdGVtcyA9IG5ldyBTZXQobmV3RGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIHRoaXMuZGF0YSkge1xuICAgICAgICAgICAgaWYgKCFuZXdJdGVtcy5oYXMoaXRlbSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRlbGV0ZShpdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgbmV3SXRlbXMpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkKGl0ZW0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1lcmdlIHRoZSBrZXkgdmFsdWUgcGFpcnMgb2YgYW4gb2JqZWN0IGludG8gdGhpcyBvYmplY3Qgbm9uIHJlY3Vyc2l2ZWx5XG4gICAgICogQHBhcmFtIG5ld0RhdGFcbiAgICAgKi9cbiAgICBhc3NpZ24obmV3RGF0YSkge1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBuZXdEYXRhLmtleXMoKSkge1xuICAgICAgICAgICAgdGhpcy5hZGQoa2V5KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgc2hhbGxvdyBjb3B5IG9mIHRoZSBzZXRcbiAgICAgKi9cbiAgICB0b1NldCgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTZXQodGhpcy5kYXRhLmtleXMoKSk7XG4gICAgfVxuICAgIHRvQXJyYXkoKSB7XG4gICAgICAgIHJldHVybiBBcnJheS5mcm9tKHRoaXMuZGF0YS5rZXlzKCkpO1xuICAgIH1cbn1cbi8qKlxuICogT25seSBhbGxvd3Mgb25lIHVwZGF0ZSB0byBwcm9wYWdhdGUgdGhyb3VnaCB0aGUgb3BlcmF0aW9ucyBhdCBhIHRpbWUuIElmIGEgbmV3IHVwZGF0ZSBjb21lcyBpbiB3aGlsZSB0aGUgcHJldmlvdXMgb25lIGlzIHN0aWxsIGJlaW5nIHByb2Nlc3NlZCBpdCB3aWxsIGJlIGJ1ZmZlcmVkIGFuZCBwcm9jZXNzZWQgYWZ0ZXIgdGhlIHByZXZpb3VzIG9uZSBpcyBkb25lXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkc0NyaXRpY2FsU2VjdGlvbihvcGVyYXRpb25BLCBvcGVyYXRpb25CLCBvcGVyYXRpb25DLCBvcGVyYXRpb25ELCBvcGVyYXRpb25FLCBvcGVyYXRpb25GLCBvcGVyYXRpb25HLCBvcGVyYXRpb25ILCBvcGVyYXRpb25JLCBvcGVyYXRpb25KLCBvcGVyYXRpb25LKSB7XG4gICAgY29uc3QgbG9ja1N0YXRlID0gbmV3IERhdGFTb3VyY2UoZmFsc2UpO1xuICAgIGNvbnN0IG9wZXJhdGlvbnMgPSBbXG4gICAgICAgIG9wZXJhdGlvbkEsXG4gICAgICAgIG9wZXJhdGlvbkIsXG4gICAgICAgIG9wZXJhdGlvbkMsXG4gICAgICAgIG9wZXJhdGlvbkQsXG4gICAgICAgIG9wZXJhdGlvbkUsXG4gICAgICAgIG9wZXJhdGlvbkYsXG4gICAgICAgIG9wZXJhdGlvbkcsXG4gICAgICAgIG9wZXJhdGlvbkgsXG4gICAgICAgIG9wZXJhdGlvbkksXG4gICAgICAgIG9wZXJhdGlvbkosXG4gICAgICAgIG9wZXJhdGlvbktcbiAgICBdLmZpbHRlcigodikgPT4gdiAhPT0gdW5kZWZpbmVkKTtcbiAgICBjb25zdCBidWZmZXIgPSBbXTtcbiAgICBsb2NrU3RhdGUubGlzdGVuKCh2KSA9PiB7XG4gICAgICAgIGlmICghdikge1xuICAgICAgICAgICAgaWYgKGJ1ZmZlci5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgcXVldWVNaWNyb3Rhc2soYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWxvY2tTdGF0ZS52YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9ja1N0YXRlLnVwZGF0ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBidWZmZXIuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBhd2FpdCBwcm9jZXNzSW5saW5lVHJhbnNmb3JtKG9wZXJhdGlvbnMsIGl0ZW0udmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ucmVzb2x2ZSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ucmVqZWN0KGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9ja1N0YXRlLnVwZGF0ZShmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6IGBDcml0aWNhbFNlY3Rpb248JHtvcGVyYXRpb25zLm1hcCgodikgPT4gdi5uYW1lKS5qb2luKCcsICcpfT5gLFxuICAgICAgICBvcGVyYXRpb25UeXBlOiBPcGVyYXRpb25UeXBlLk1BUF9ERUxBWV9GSUxURVIsXG4gICAgICAgIG9wZXJhdGlvbjogYXN5bmMgKHYpID0+IHtcbiAgICAgICAgICAgIGlmICghbG9ja1N0YXRlLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgbG9ja1N0YXRlLnVwZGF0ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBwcm9jZXNzSW5saW5lVHJhbnNmb3JtKG9wZXJhdGlvbnMsIHYpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgbG9ja1N0YXRlLnVwZGF0ZShmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgICAgICBidWZmZXIucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUsXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdCxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHZcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBkc0ZvcmtJbmxpbmUoY29uZGl0aW9uLCBvcGVyYXRpb25BLCBvcGVyYXRpb25CLCBvcGVyYXRpb25DLCBvcGVyYXRpb25ELCBvcGVyYXRpb25FLCBvcGVyYXRpb25GLCBvcGVyYXRpb25HLCBvcGVyYXRpb25ILCBvcGVyYXRpb25JKSB7XG4gICAgY29uc3Qgb3BzID0gW29wZXJhdGlvbkEsIG9wZXJhdGlvbkIsIG9wZXJhdGlvbkMsIG9wZXJhdGlvbkQsIG9wZXJhdGlvbkUsIG9wZXJhdGlvbkYsIG9wZXJhdGlvbkcsIG9wZXJhdGlvbkgsIG9wZXJhdGlvbkldLmZpbHRlcigodikgPT4gdiAhPT0gdW5kZWZpbmVkKTtcbiAgICByZXR1cm4ge1xuICAgICAgICBuYW1lOiAnZm9yay1pbmxpbmUnLFxuICAgICAgICBvcGVyYXRpb25UeXBlOiBPcGVyYXRpb25UeXBlLk1BUF9ERUxBWV9GSUxURVIsXG4gICAgICAgIG9wZXJhdGlvbjogYXN5bmMgKHYpID0+IHtcbiAgICAgICAgICAgIGlmIChjb25kaXRpb24odikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvY2Vzc0lubGluZVRyYW5zZm9ybShvcHMsIHYpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgaXRlbTogdiwgY2FuY2VsbGVkOiBmYWxzZSB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbn1cbmFzeW5jIGZ1bmN0aW9uIHByb2Nlc3NJbmxpbmVUcmFuc2Zvcm0ob3BlcmF0aW9ucywgdmFsdWUpIHtcbiAgICBsZXQgb3V0O1xuICAgIGxldCBlcnJvcjtcbiAgICBsZXQgaGFzVmFsdWUgPSBmYWxzZTtcbiAgICBjb25zdCBzaW5rID0gbmV3IERhdGFTb3VyY2UoKTtcbiAgICBzaW5rLmxpc3RlbigocmVzdWx0KSA9PiB7XG4gICAgICAgIG91dCA9IHJlc3VsdDtcbiAgICAgICAgaGFzVmFsdWUgPSB0cnVlO1xuICAgIH0pO1xuICAgIHNpbmsuaGFuZGxlRXJyb3JzKChlKSA9PiB7XG4gICAgICAgIGVycm9yID0gZTtcbiAgICB9KTtcbiAgICBhd2FpdCBwcm9jZXNzVHJhbnNmb3JtKG9wZXJhdGlvbnMsIHNpbmspKHZhbHVlKTtcbiAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICAgIHJldHVybiB7IGl0ZW06IG91dCwgY2FuY2VsbGVkOiAhaGFzVmFsdWUgfTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGFfc291cmNlLmpzLm1hcCIsImltcG9ydCB7IENhbmNlbGxhdGlvblRva2VuIH0gZnJvbSAnLi4vdXRpbGl0aWVzL2NhbmNlbGxhdGlvbl90b2tlbi5qcyc7XG5pbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICcuLi91dGlsaXRpZXMvZXZlbnRfZW1pdHRlci5qcyc7XG5pbXBvcnQgeyBEYXRhU291cmNlIH0gZnJvbSAnLi9kYXRhX3NvdXJjZS5qcyc7XG5pbXBvcnQgeyBPcGVyYXRpb25UeXBlIH0gZnJvbSAnLi9vcGVyYXRvcl9tb2RlbC5qcyc7XG5pbXBvcnQgeyBTdHJlYW0gfSBmcm9tICcuL3N0cmVhbS5qcyc7XG4vKipcbiAqIE11dGF0ZXMgYW4gdXBkYXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkc01hcChtYXBwZXIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBuYW1lOiAnbWFwJyxcbiAgICAgICAgb3BlcmF0aW9uVHlwZTogT3BlcmF0aW9uVHlwZS5NQVAsXG4gICAgICAgIG9wZXJhdGlvbjogKHYpID0+IG1hcHBlcih2KVxuICAgIH07XG59XG4vKipcbiAqIEZvcndhcmRzIGFuIHVwZGF0ZSB0byBvbmUgb2YgdHdvIHBvc3NpYmxlIHNvdXJjZXMgYmFzZWQgb24gYSBjb25kaXRpb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRzRm9yayhjb25kaXRpb24sIHRydXRoeVBhdGgsIGZhbHN5UGF0aCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6ICdmb3JrJyxcbiAgICAgICAgb3BlcmF0aW9uVHlwZTogT3BlcmF0aW9uVHlwZS5OT09QLFxuICAgICAgICBvcGVyYXRpb246ICh2KSA9PiB7XG4gICAgICAgICAgICBpZiAoY29uZGl0aW9uKHYpKSB7XG4gICAgICAgICAgICAgICAgdHJ1dGh5UGF0aC51cGRhdGUodik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBmYWxzeVBhdGgudXBkYXRlKHYpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHY7XG4gICAgICAgIH1cbiAgICB9O1xufVxuLyoqXG4gKiBTYW1lIGFzIG1hcCBidXQgd2l0aCBhbiBhc3luYyBtYXBwZXIgZnVuY3Rpb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRzTWFwQXN5bmMobWFwcGVyKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZTogJ21hcEFzeW5jJyxcbiAgICAgICAgb3BlcmF0aW9uVHlwZTogT3BlcmF0aW9uVHlwZS5NQVBfREVMQVksXG4gICAgICAgIG9wZXJhdGlvbjogKHYpID0+IG1hcHBlcih2KVxuICAgIH07XG59XG4vKipcbiAqIENoYW5nZXMgdXBkYXRlcyB0byBjb250YWluIHRoZSB2YWx1ZSBvZiB0aGUgcHJldmlvdXMgdXBkYXRlIGFzIHdlbGwgYXMgdGhlIGN1cnJlbnRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRzRGlmZigpIHtcbiAgICBsZXQgbGFzdFZhbHVlID0gdW5kZWZpbmVkO1xuICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6ICdkaWZmJyxcbiAgICAgICAgb3BlcmF0aW9uVHlwZTogT3BlcmF0aW9uVHlwZS5NQVAsXG4gICAgICAgIG9wZXJhdGlvbjogKHYpID0+IHtcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSB7XG4gICAgICAgICAgICAgICAgb2xkVmFsdWU6IGxhc3RWYWx1ZSxcbiAgICAgICAgICAgICAgICBuZXdWYWx1ZTogdlxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGxhc3RWYWx1ZSA9IHY7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgfTtcbn1cbi8qKlxuICogQ2hhbmdlcyB1cGRhdGVzIHRvIGNvbnRhaW4gdGhlIHZhbHVlIG9mIHRoZSBwcmV2aW91cyB1cGRhdGUgYXMgd2VsbCBhcyB0aGUgY3VycmVudFxuICovXG5leHBvcnQgZnVuY3Rpb24gZHNVcGRhdGVUb2tlbigpIHtcbiAgICBsZXQgdG9rZW47XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZTogJ2RpZmYnLFxuICAgICAgICBvcGVyYXRpb25UeXBlOiBPcGVyYXRpb25UeXBlLk1BUCxcbiAgICAgICAgb3BlcmF0aW9uOiAodikgPT4ge1xuICAgICAgICAgICAgaWYgKHRva2VuKSB7XG4gICAgICAgICAgICAgICAgdG9rZW4uY2FuY2VsKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0b2tlbiA9IG5ldyBDYW5jZWxsYXRpb25Ub2tlbigpO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0b2tlbixcbiAgICAgICAgICAgICAgICB2YWx1ZTogdlxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH07XG59XG4vKipcbiAqIEJsb2NrcyB1cGRhdGVzIHRoYXQgZG9uJ3QgcGFzcyB0aGUgZmlsdGVyIHByZWRpY2F0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZHNGaWx0ZXIocHJlZGljYXRlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZTogJ2ZpbHRlcicsXG4gICAgICAgIG9wZXJhdGlvblR5cGU6IE9wZXJhdGlvblR5cGUuRklMVEVSLFxuICAgICAgICBvcGVyYXRpb246ICh2KSA9PiBwcmVkaWNhdGUodilcbiAgICB9O1xufVxuLyoqXG4gKiBTYW1lIGFzIGZpbHRlciBidXQgd2l0aCBhbiBhc3luYyBwcmVkaWNhdGUgZnVuY3Rpb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRzRmlsdGVyQXN5bmMocHJlZGljYXRlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZTogJ2ZpbHRlckFzeW5jJyxcbiAgICAgICAgb3BlcmF0aW9uVHlwZTogT3BlcmF0aW9uVHlwZS5ERUxBWV9GSUxURVIsXG4gICAgICAgIG9wZXJhdGlvbjogKHYpID0+IHByZWRpY2F0ZSh2KVxuICAgIH07XG59XG4vKipcbiAqIE9ubHkgcHJvcGFnYXRlIGFuIHVwZGF0ZSBpZiB0aGUgdmFsdWUgaXMgZXZlblxuICovXG5leHBvcnQgZnVuY3Rpb24gZHNFdmVuKCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6ICdldmVuJyxcbiAgICAgICAgb3BlcmF0aW9uVHlwZTogT3BlcmF0aW9uVHlwZS5GSUxURVIsXG4gICAgICAgIG9wZXJhdGlvbjogKHYpID0+IHYgJSAyID09PSAwXG4gICAgfTtcbn1cbi8qKlxuICogT25seSBwcm9wYWdhdGUgYW4gdXBkYXRlIGlmIHRoZSB2YWx1ZSBpcyBvZGRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRzT2RkKCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6ICdvZGQnLFxuICAgICAgICBvcGVyYXRpb25UeXBlOiBPcGVyYXRpb25UeXBlLkZJTFRFUixcbiAgICAgICAgb3BlcmF0aW9uOiAodikgPT4gdiAlIDIgIT09IDBcbiAgICB9O1xufVxuLyoqXG4gKiBPbmx5IHByb3BhZ2F0ZSBhbiB1cGRhdGUgaWYgdGhlIHZhbHVlIGlzIGxvd2VyIHRoYW4gdGhlIHByZXZpb3VzIHVwZGF0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZHNNaW4oKSB7XG4gICAgbGV0IGxhc3QgPSBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUjtcbiAgICByZXR1cm4ge1xuICAgICAgICBuYW1lOiAnbWluJyxcbiAgICAgICAgb3BlcmF0aW9uVHlwZTogT3BlcmF0aW9uVHlwZS5GSUxURVIsXG4gICAgICAgIG9wZXJhdGlvbjogKHYpID0+IHtcbiAgICAgICAgICAgIGlmICh2IDwgbGFzdCkge1xuICAgICAgICAgICAgICAgIGxhc3QgPSB2O1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbn1cbi8qKlxuICogT25seSBwcm9wYWdhdGUgYW4gdXBkYXRlIGlmIHRoZSB2YWx1ZSBpcyBoaWdoZXIgdGhhbiB0aGUgcHJldmlvdXMgdXBkYXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkc01heCgpIHtcbiAgICBsZXQgbGFzdCA9IE51bWJlci5NSU5fU0FGRV9JTlRFR0VSO1xuICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6ICdtYXgnLFxuICAgICAgICBvcGVyYXRpb25UeXBlOiBPcGVyYXRpb25UeXBlLkZJTFRFUixcbiAgICAgICAgb3BlcmF0aW9uOiAodikgPT4ge1xuICAgICAgICAgICAgaWYgKHYgPiBsYXN0KSB7XG4gICAgICAgICAgICAgICAgbGFzdCA9IHY7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xufVxuLyoqXG4gKiBJZ25vcmUgdGhlIGZpcnN0IE4gdXBkYXRlcyB3aGVyZSBOIGRlcGVuZHMgb24gYW4gZXh0ZXJuYWwgc291cmNlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkc1NraXBEeW5hbWljKGFtb3VudExlZnQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBvcGVyYXRpb25UeXBlOiBPcGVyYXRpb25UeXBlLkZJTFRFUixcbiAgICAgICAgbmFtZTogJ3NraXBEeW5hbWljJyxcbiAgICAgICAgb3BlcmF0aW9uOiAodikgPT4ge1xuICAgICAgICAgICAgaWYgKGFtb3VudExlZnQudmFsdWUgPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGFtb3VudExlZnQudXBkYXRlKGFtb3VudExlZnQudmFsdWUgLSAxKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xufVxuLyoqXG4gKiBJZ25vcmUgdGhlIGZpcnN0IE4gdXBkYXRlc1xuICovXG5leHBvcnQgZnVuY3Rpb24gZHNTa2lwKGFtb3VudCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIG9wZXJhdGlvblR5cGU6IE9wZXJhdGlvblR5cGUuRklMVEVSLFxuICAgICAgICBuYW1lOiBgc2tpcCAke2Ftb3VudH1gLFxuICAgICAgICBvcGVyYXRpb246ICh2KSA9PiB7XG4gICAgICAgICAgICBpZiAoYW1vdW50ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBhbW91bnQtLTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xufVxuLyoqXG4gKiBBbGxvd3Mgb25seSBhIGNlcnRhaW4gbnVtYmVyIG9mIHVwZGF0ZXMgdG8gcGFzcyBkZWNyZWFzaW5nIGEgY291bnRlciBvbiBlYWNoIHBhc3NcbiAqIElmIHRoZSBjb3VudGVyIHJlYWNoZXMgMCB0aGUgdXBkYXRlcyBhcmUgbG9zdFxuICovXG5leHBvcnQgZnVuY3Rpb24gZHNDdXRPZmYoYW1vdW50KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZTogYGN1dG9mZiAke2Ftb3VudH1gLFxuICAgICAgICBvcGVyYXRpb25UeXBlOiBPcGVyYXRpb25UeXBlLkZJTFRFUixcbiAgICAgICAgb3BlcmF0aW9uOiAodikgPT4ge1xuICAgICAgICAgICAgaWYgKGFtb3VudCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGFtb3VudC0tO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbn1cbi8qKlxuICogQWxsb3dzIG9ubHkgYSBjZXJ0YWluIG51bWJlciBvZiB1cGRhdGVzIHRvIHBhc3MgZGVjcmVhc2luZyBhIGNvdW50ZXIgb24gZWFjaCBwYXNzLCB0aGUgY291bnRlciBiZWluZyBhbiBleHRlcm5hbFxuICogZGF0YXNvdXJjZSBjYW4gYmUgY2hhbmdlZCBleHRlcm5hbGx5LlxuICogSWYgdGhlIGNvdW50ZXIgcmVhY2hlcyAwIHRoZSB1cGRhdGVzIGFyZSBsb3N0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkc0N1dE9mZkR5bmFtaWMoYW1vdW50TGVmdCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6ICdjdXRvZmZEeW5hbWljJyxcbiAgICAgICAgb3BlcmF0aW9uVHlwZTogT3BlcmF0aW9uVHlwZS5GSUxURVIsXG4gICAgICAgIG9wZXJhdGlvbjogKHYpID0+IHtcbiAgICAgICAgICAgIGlmIChhbW91bnRMZWZ0LnZhbHVlID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgYW1vdW50TGVmdC51cGRhdGUoYW1vdW50TGVmdC52YWx1ZSAtIDEpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbn1cbi8qKlxuICogQWxsb3dzIG9ubHkgYSBjZXJ0YWluIG51bWJlciBvZiB1cGRhdGVzIHRvIHBhc3MgZGVjcmVhc2luZyBhIGNvdW50ZXIgb24gZWFjaCBwYXNzLCB0aGUgY291bnRlciBiZWluZyBhbiBleHRlcm5hbFxuICogZGF0YXNvdXJjZSBjYW4gYmUgY2hhbmdlZCBleHRlcm5hbGx5LlxuICogSWYgdGhlIGNvdW50ZXIgcmVhY2hlcyAwIHRoZSB1cGRhdGVzIGFyZSBidWZmZXJlZCB1bnRpbCB0aGV5IGFyZSB1bmxvY2tlZCBhZ2FpblxuICovXG5leHBvcnQgZnVuY3Rpb24gZHNTZW1hcGhvcmUoc3RhdGUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBvcGVyYXRpb25UeXBlOiBPcGVyYXRpb25UeXBlLkRFTEFZLFxuICAgICAgICBuYW1lOiAnc2VtYXBob3JlJyxcbiAgICAgICAgb3BlcmF0aW9uOiAodikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHN0YXRlLnZhbHVlID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZS51cGRhdGUoc3RhdGUudmFsdWUgLSAxKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh2KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNhbmNlbCA9IHN0YXRlLmxpc3RlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RhdGUudmFsdWUgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FuY2VsKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUudXBkYXRlKHN0YXRlLnZhbHVlIC0gMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh2KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xufVxuLyoqXG4gKiBGaWx0ZXJzIG91dCB1cGRhdGVzIGlmIHRoZXkgaGF2ZSB0aGUgc2FtZSB2YWx1ZSBhcyB0aGUgcHJldmlvdXMgdXBkYXRlLCB1c2VzIHJlZmVyZW5jZSBlcXVhbGl0eSBieSBkZWZhdWx0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkc1VuaXF1ZShpc0VxdWFsKSB7XG4gICAgbGV0IHByaW1lZCA9IGZhbHNlO1xuICAgIGxldCBsYXN0O1xuICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6ICd1bmlxdWUnLFxuICAgICAgICBvcGVyYXRpb25UeXBlOiBPcGVyYXRpb25UeXBlLkZJTFRFUixcbiAgICAgICAgb3BlcmF0aW9uOiAodikgPT4ge1xuICAgICAgICAgICAgaWYgKHByaW1lZCAmJiAoaXNFcXVhbCA/IGlzRXF1YWwobGFzdCwgdikgOiB2ID09PSBsYXN0KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHByaW1lZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgbGFzdCA9IHY7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xufVxuLyoqXG4gKiBUYWtlcyBwcm9taXNlcyBhbmQgdXBkYXRlcyB3aXRoIHRoZSByZXNvbHZlZCB2YWx1ZSwgaWYgbXVsdGlwbGUgcHJvbWlzZXMgY29tZSBpbiBwcm9jZXNzZXMgdXBkYXRlcyBhcyBwcm9taXNlcyByZXNvbHZlIGluIGFueSBvcmRlclxuICovXG5leHBvcnQgZnVuY3Rpb24gZHNBd2FpdCgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBuYW1lOiAnYXdhaXQnLFxuICAgICAgICBvcGVyYXRpb25UeXBlOiBPcGVyYXRpb25UeXBlLk1BUF9ERUxBWSxcbiAgICAgICAgb3BlcmF0aW9uOiAodikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHY7XG4gICAgICAgIH1cbiAgICB9O1xufVxuLyoqXG4gKiBUYWtlcyBwcm9taXNlcyBhbmQgdXBkYXRlcyB3aXRoIHRoZSByZXNvbHZlZCB2YWx1ZSwgaWYgbXVsdGlwbGUgcHJvbWlzZXMgY29tZSBpbiBtYWtlcyBzdXJlIHRoZSB1cGRhdGVzIGZpcmUgaW4gdGhlIHNhbWUgb3JkZXIgdGhhdCB0aGUgcHJvbWlzZXMgY2FtZSBpblxuICovXG5leHBvcnQgZnVuY3Rpb24gZHNBd2FpdE9yZGVyZWQoKSB7XG4gICAgY29uc3QgcXVldWUgPSBbXTtcbiAgICBjb25zdCBvbkRlcXVldWUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgb3BlcmF0aW9uVHlwZTogT3BlcmF0aW9uVHlwZS5NQVBfREVMQVksXG4gICAgICAgIG5hbWU6ICdhd2FpdE9yZGVyZWQnLFxuICAgICAgICBvcGVyYXRpb246IGFzeW5jICh2KSA9PiB7XG4gICAgICAgICAgICBxdWV1ZS5wdXNoKHYpO1xuICAgICAgICAgICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwcm9jZXNzSXRlbSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdW5zdWIgPSBvbkRlcXVldWUuc3Vic2NyaWJlKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHF1ZXVlWzBdID09PSB2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1bnN1Yi5jYW5jZWwoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwcm9jZXNzSXRlbSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGFzeW5jIGZ1bmN0aW9uIHByb2Nlc3NJdGVtKCkge1xuICAgICAgICBhd2FpdCBxdWV1ZVswXTtcbiAgICAgICAgY29uc3QgaXRlbSA9IHF1ZXVlLnNoaWZ0KCk7XG4gICAgICAgIG9uRGVxdWV1ZS5maXJlKCk7XG4gICAgICAgIHJldHVybiBpdGVtO1xuICAgIH1cbn1cbi8qKlxuICogYXdhaXRzIHByb21pc2UgYW5kIGZvcndhcmRzIHRoZSByZXNvbHZlZCB2YWx1ZSwgaWYgYSBuZXcgcHJvbWlzZSBjb21lcyBpbiB3aGlsZSB0aGUgZmlyc3QgaXNuJ3QgcmVzb2x2ZWQgdGhlbiB0aGUgZmlyc3RcbiAqIHByb21pc2Ugd2lsbCBiZSBpZ25vcmVkIGV2ZW4gaWYgaXQgcmVzb2x2ZXMgZmlyc3QgYW5kIGluc3RlYWQgd2UgZm9jdXMgb24gdGhlIG5ld2VzdCBwcm9taXNlLiBUaGlzIGlzIHVzZWZ1bCBmb3IgY2FuY2VsbGFibGVcbiAqIGFzeW5jIG9wZXJhdGlvbnMgd2hlcmUgd2Ugb25seSBjYXJlIGFib3V0IHRoZSByZXN1bHQgaWYgaXQncyB0aGUgbGF0ZXN0IGFjdGlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gZHNBd2FpdExhdGVzdCgpIHtcbiAgICBsZXQgZnJlc2huZXNzVG9rZW47XG4gICAgcmV0dXJuIHtcbiAgICAgICAgb3BlcmF0aW9uVHlwZTogT3BlcmF0aW9uVHlwZS5NQVBfREVMQVlfRklMVEVSLFxuICAgICAgICBuYW1lOiAnYXdhaXRMYXRlc3QnLFxuICAgICAgICBvcGVyYXRpb246IGFzeW5jICh2KSA9PiB7XG4gICAgICAgICAgICBmcmVzaG5lc3NUb2tlbiA9IERhdGUubm93KCk7XG4gICAgICAgICAgICBjb25zdCB0aW1lc3RhbXAgPSBmcmVzaG5lc3NUb2tlbjtcbiAgICAgICAgICAgIGNvbnN0IHJlc29sdmVkID0gYXdhaXQgdjtcbiAgICAgICAgICAgIGlmIChmcmVzaG5lc3NUb2tlbiA9PT0gdGltZXN0YW1wKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbTogcmVzb2x2ZWQsXG4gICAgICAgICAgICAgICAgICAgIGNhbmNlbGxlZDogZmFsc2VcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgICAgICBjYW5jZWxsZWQ6IHRydWVcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbn1cbi8qKlxuICogUmVkdWNlcyBhbGwgdXBkYXRlcyBkb3duIHRvIGEgdmFsdWVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRzUmVkdWNlKHJlZHVjZXIsIGluaXRpYWxWYWx1ZSkge1xuICAgIGxldCBsYXN0ID0gaW5pdGlhbFZhbHVlO1xuICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6ICdyZWR1Y2UnLFxuICAgICAgICBvcGVyYXRpb25UeXBlOiBPcGVyYXRpb25UeXBlLk1BUCxcbiAgICAgICAgb3BlcmF0aW9uOiAodikgPT4ge1xuICAgICAgICAgICAgbGFzdCA9IHJlZHVjZXIobGFzdCwgdik7XG4gICAgICAgICAgICByZXR1cm4gbGFzdDtcbiAgICAgICAgfVxuICAgIH07XG59XG4vKipcbiAqIEJ1aWxkcyBhIHN0cmluZyB3aGVyZSBlYWNoIHVwZGF0ZSBpcyBhcHBlbmVkIHRvIHRoZSBzdHJpbmcgb3B0aW9uYWxseSB3aXRoIGEgc2VwZXJhdG9yXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkc1N0cmluZ0pvaW4oc2VwZXJhdG9yID0gJywgJykge1xuICAgIGxldCBsYXN0O1xuICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6IGBzdHJpbmdKb2luICR7c2VwZXJhdG9yfWAsXG4gICAgICAgIG9wZXJhdGlvblR5cGU6IE9wZXJhdGlvblR5cGUuTUFQLFxuICAgICAgICBvcGVyYXRpb246ICh2KSA9PiB7XG4gICAgICAgICAgICBpZiAobGFzdCkge1xuICAgICAgICAgICAgICAgIGxhc3QgKz0gc2VwZXJhdG9yICsgdjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGxhc3QgPSB2O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGxhc3Q7XG4gICAgICAgIH1cbiAgICB9O1xufVxuLyoqXG4gKiBBZGRzIGEgZml4ZWQgYW1vdW50IG9mIGxhZyB0byB1cGRhdGVzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkc0RlbGF5KHRpbWUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBuYW1lOiBgZGVsYXkgJHt0aW1lfW1zYCxcbiAgICAgICAgb3BlcmF0aW9uVHlwZTogT3BlcmF0aW9uVHlwZS5ERUxBWSxcbiAgICAgICAgb3BlcmF0aW9uOiAodikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUodik7XG4gICAgICAgICAgICAgICAgfSwgdGltZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG59XG4vKipcbiAqIFN0YXJ0cyBhIHRpbWVyIHdoZW4gYW4gdXBkYXRlIG9jY3VycywgZGVsYXlzIHRoZSB1cGRhdGUgdW50aWwgdGhlIHRpbWVyIHBhc3NlZCBpZiBhIG5ldyB1cGRhdGUgYXJyaXZlcyB0aGUgaW5pdGlhbFxuICogdXBkYXRlIGlzIGNhbmNlbGxlZCBhbmQgdGhlIHByb2Nlc3Mgc3RhcnRzIGFnYWluXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkc0RlYm91bmNlKHRpbWUpIHtcbiAgICBsZXQgdGltZW91dDtcbiAgICBsZXQgY2FuY2VsbGVkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIHJldHVybiB7XG4gICAgICAgIG9wZXJhdGlvblR5cGU6IE9wZXJhdGlvblR5cGUuREVMQVlfRklMVEVSLFxuICAgICAgICBuYW1lOiBgZGVib3VuY2UgJHt0aW1lfW1zYCxcbiAgICAgICAgb3BlcmF0aW9uOiAodikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgICAgICAgICAgIGNhbmNlbGxlZC5maXJlKCk7XG4gICAgICAgICAgICAgICAgY2FuY2VsbGVkLnN1YnNjcmliZU9uY2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGNhbmNlbGxlZC5jYW5jZWxBbGwoKTtcbiAgICAgICAgICAgICAgICB9LCB0aW1lKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbn1cbi8qKlxuICogT25seSBhbGxvdyB1cCB0byAxIHVwZGF0ZSB0byBwcm9wYWdhdGUgcGVyIGZyYW1lIG1ha2VzIHVwZGF0ZSBydW4gYXMgYSBtaWNyb3Rhc2tcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRzTWljcm9EZWJvdW5jZSgpIHtcbiAgICBsZXQgc2NoZWR1bGVkO1xuICAgIHJldHVybiB7XG4gICAgICAgIG9wZXJhdGlvblR5cGU6IE9wZXJhdGlvblR5cGUuREVMQVlfRklMVEVSLFxuICAgICAgICBuYW1lOiBgbWljcm9EZWJvdW5jZWAsXG4gICAgICAgIG9wZXJhdGlvbjogKHYpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghc2NoZWR1bGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHNjaGVkdWxlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHF1ZXVlTWljcm90YXNrKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjaGVkdWxlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG59XG4vKipcbiAqIERlYm91bmNlIHVwZGF0ZSB0byBvY2N1ciBhdCBtb3N0IG9uZSBwZXIgYW5pbWF0aW9uIGZyYW1lXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkc1Rocm90dGxlRnJhbWUoKSB7XG4gICAgbGV0IHRpbWVvdXQ7XG4gICAgbGV0IGNhbmNlbGxlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICByZXR1cm4ge1xuICAgICAgICBvcGVyYXRpb25UeXBlOiBPcGVyYXRpb25UeXBlLkRFTEFZX0ZJTFRFUixcbiAgICAgICAgbmFtZTogYHRocm90dGxlIGZyYW1lYCxcbiAgICAgICAgb3BlcmF0aW9uOiAodikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgICAgICAgICAgIGNhbmNlbGxlZC5maXJlKCk7XG4gICAgICAgICAgICAgICAgY2FuY2VsbGVkLnN1YnNjcmliZU9uY2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aW1lb3V0ID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgY2FuY2VsbGVkLmNhbmNlbEFsbCgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xufVxuLyoqXG4gKiBNYXkgb3IgbWF5IG5vdCBibG9jayBhbGwgdXBkYXRlcyBiYXNlZCBvbiB0aGUgc3RhdGUgcHJvdmlkZWQgYnkgYW5vdGhlciBzb3VyY2VcbiAqIGxvY2sgc3RhdGVcbiAqIGZhbHNlID0+IHVwZGF0ZXMgcGFzcyB0aHJvdWdoXG4gKiB0cnVlID0+IHVwZGF0ZXMgYXJlIGJsb2NrZWQgYW5kIGRyb3BwZWRcbiAqIE5vdCBzdWl0YWJsZSBmb3Igc3luY2hyb25pemF0aW9uIHB1cnBvc2VzLiBVc2UgZHNDcml0aWNhbFNlY3Rpb24gaW5zdGVhZFxuICovXG5leHBvcnQgZnVuY3Rpb24gZHNMb2NrKHN0YXRlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZTogJ2xvY2snLFxuICAgICAgICBvcGVyYXRpb25UeXBlOiBPcGVyYXRpb25UeXBlLkZJTFRFUixcbiAgICAgICAgb3BlcmF0aW9uOiAodikgPT4ge1xuICAgICAgICAgICAgaWYgKCFzdGF0ZS52YWx1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbn1cbi8qKlxuICogQWxsb3dzIGF0IG1vc3Qgb25lIHVwZGF0ZSBwZXIgTiBtaWxsaXNlY29uZHMgdG8gcGFzcyB0aHJvdWdoXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkc1Rocm90dGxlKHRpbWUpIHtcbiAgICBsZXQgY29vbGRvd24gPSBmYWxzZTtcbiAgICByZXR1cm4ge1xuICAgICAgICBuYW1lOiBgdGhyb3R0bGUgJHt0aW1lfW1zYCxcbiAgICAgICAgb3BlcmF0aW9uVHlwZTogT3BlcmF0aW9uVHlwZS5GSUxURVIsXG4gICAgICAgIG9wZXJhdGlvbjogKHYpID0+IHtcbiAgICAgICAgICAgIGlmICghY29vbGRvd24pIHtcbiAgICAgICAgICAgICAgICBjb29sZG93biA9IHRydWU7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvb2xkb3duID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSwgdGltZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xufVxuLyoqXG4gKiBXaGVuIGFuIHVwZGF0ZSBvY2N1cnMgYSB0aW1lciBpcyBzdGFydGVkLCBkdXJpbmcgdGhhdCB0aW1lIGFsbCBzdWJzZXF1ZW50IHVwZGF0ZXMgYXJlIGNvbGxlY3RlZCBpbiBhbiBhcnJheSBhbmQgdGhlblxuICogb25jZSB0aGUgdGltZXIgcnVucyBvdXQgYW4gdXBkYXRlIGlzIG1hZGUgd2l0aCBhbGwgdXBkYXRlcyBjb2xsZWN0ZWQgc28gZmFyIGFzIGFuIGFycmF5XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkc0J1ZmZlcih0aW1lKSB7XG4gICAgbGV0IGJ1ZmZlciA9IFtdO1xuICAgIGxldCBwcm9taXNlO1xuICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6IGBidWZmZXIgJHt0aW1lfW1zYCxcbiAgICAgICAgb3BlcmF0aW9uVHlwZTogT3BlcmF0aW9uVHlwZS5NQVBfREVMQVlfRklMVEVSLFxuICAgICAgICBvcGVyYXRpb246ICh2KSA9PiB7XG4gICAgICAgICAgICBidWZmZXIucHVzaCh2KTtcbiAgICAgICAgICAgIGlmICghcHJvbWlzZSkge1xuICAgICAgICAgICAgICAgIHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb21pc2UgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYW5jZWxsZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW06IGJ1ZmZlclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBidWZmZXIgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgfSwgdGltZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHtcbiAgICAgICAgICAgICAgICAgICAgY2FuY2VsbGVkOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBpdGVtOiB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG59XG4vKipcbiAqIEV4dHJhY3RzIG9ubHkgdGhlIHZhbHVlIG9mIGEga2V5IG9mIHRoZSB1cGRhdGUgdmFsdWVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRzUGljayhrZXkpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBuYW1lOiBgcGljayAke2tleS50b1N0cmluZygpfWAsXG4gICAgICAgIG9wZXJhdGlvblR5cGU6IE9wZXJhdGlvblR5cGUuTUFQLFxuICAgICAgICBvcGVyYXRpb246ICh2KSA9PiB7XG4gICAgICAgICAgICBpZiAodiAhPT0gdW5kZWZpbmVkICYmIHYgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdltrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHY7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xufVxuLyoqXG4gKiBGb3J3YXJkcyBhbiBldmVudCB0byBhbm90aGVyIHNvdXJjZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZHNQaXBlKHRhcmdldCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6IGBwaXBlICR7dGFyZ2V0Lm5hbWV9YCxcbiAgICAgICAgb3BlcmF0aW9uVHlwZTogT3BlcmF0aW9uVHlwZS5OT09QLFxuICAgICAgICBvcGVyYXRpb246ICh2KSA9PiB7XG4gICAgICAgICAgICBpZiAodGFyZ2V0IGluc3RhbmNlb2YgRGF0YVNvdXJjZSB8fCB0YXJnZXQgaW5zdGFuY2VvZiBTdHJlYW0pIHtcbiAgICAgICAgICAgICAgICB0YXJnZXQudXBkYXRlKHYpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LnVwZGF0ZURvd25zdHJlYW0odik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdjtcbiAgICAgICAgfVxuICAgIH07XG59XG4vKipcbiAqIFNhbWUgYXMgcGlwZSBleGNlcHQgZm9yIGR1cGxleCBkYXRhIHNvdXJjZXMgaXQgcGlwZXMgdXBzdHJlYW1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRzUGlwZVVwKHRhcmdldCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6IGBwaXBldXAgJHt0YXJnZXQubmFtZX1gLFxuICAgICAgICBvcGVyYXRpb25UeXBlOiBPcGVyYXRpb25UeXBlLk5PT1AsXG4gICAgICAgIG9wZXJhdGlvbjogKHYpID0+IHtcbiAgICAgICAgICAgIGlmICh0YXJnZXQgaW5zdGFuY2VvZiBEYXRhU291cmNlIHx8IHRhcmdldCBpbnN0YW5jZW9mIFN0cmVhbSkge1xuICAgICAgICAgICAgICAgIHRhcmdldC51cGRhdGUodik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0YXJnZXQudXBkYXRlVXBzdHJlYW0odik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdjtcbiAgICAgICAgfVxuICAgIH07XG59XG4vKipcbiAqIExldHMgeW91IGtlZXAgYSBoaXN0b3J5IG9mIHRoZSB1cGRhdGVzIG9mIGEgc291cmNlIGJ5IHB1c2hpbmcgaXQgb250byBhbiBhcnJheSBkYXRhc291cmNlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkc0hpc3RvcnkocmVwb3J0VGFyZ2V0LCBnZW5lcmF0aW9ucywgY2FuY2VsbGF0aW9uVG9rZW4gPSBuZXcgQ2FuY2VsbGF0aW9uVG9rZW4oKSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIG9wZXJhdGlvblR5cGU6IE9wZXJhdGlvblR5cGUuTk9PUCxcbiAgICAgICAgbmFtZTogYGhpc3RvcnlgLFxuICAgICAgICBvcGVyYXRpb246ICh2KSA9PiB7XG4gICAgICAgICAgICBpZiAoIWNhbmNlbGxhdGlvblRva2VuLmlzQ2FuY2VsZWQpIHtcbiAgICAgICAgICAgICAgICBpZiAoZ2VuZXJhdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcG9ydFRhcmdldC5sZW5ndGgudmFsdWUgPj0gZ2VuZXJhdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcG9ydFRhcmdldC5yZW1vdmVMZWZ0KHJlcG9ydFRhcmdldC5sZW5ndGgudmFsdWUgLSBnZW5lcmF0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmVwb3J0VGFyZ2V0LnB1c2godik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdjtcbiAgICAgICAgfVxuICAgIH07XG59XG4vKipcbiAqIE1vbml0b3JzIHRoZSBudW1iZXIgb2YgZXZlbnRzIHBlciBpbnRlcnZhbFxuICovXG5leHBvcnQgZnVuY3Rpb24gZHNUaHJvdWdocHV0TWV0ZXIocmVwb3J0VGFyZ2V0LCBpbnRlcnZhbCwgY2FuY2VsbGF0aW9uVG9rZW4gPSBuZXcgQ2FuY2VsbGF0aW9uVG9rZW4oKSkge1xuICAgIGxldCBhbW91bnQgPSAwO1xuICAgIGNhbmNlbGxhdGlvblRva2VuLnNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgcmVwb3J0VGFyZ2V0LnVwZGF0ZShhbW91bnQpO1xuICAgICAgICBhbW91bnQgPSAwO1xuICAgIH0sIGludGVydmFsKTtcbiAgICByZXR1cm4ge1xuICAgICAgICBvcGVyYXRpb25UeXBlOiBPcGVyYXRpb25UeXBlLk5PT1AsXG4gICAgICAgIG5hbWU6IGB0aHJvdWdocHV0IG1ldGVyYCxcbiAgICAgICAgb3BlcmF0aW9uOiAodikgPT4ge1xuICAgICAgICAgICAgYW1vdW50Kys7XG4gICAgICAgICAgICByZXR1cm4gdjtcbiAgICAgICAgfVxuICAgIH07XG59XG4vKipcbiAqIEFsbG93cyBpbnNlcnRpbmcgYSBjYWxsYmFjayB0aGF0IGdldHMgY2FsbGVkIHdpdGggYW4gdXBkYXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkc1RhcChjYikge1xuICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6ICd0YXAnLFxuICAgICAgICBvcGVyYXRpb25UeXBlOiBPcGVyYXRpb25UeXBlLk5PT1AsXG4gICAgICAgIG9wZXJhdGlvbjogKHYpID0+IHtcbiAgICAgICAgICAgIGNiKHYpO1xuICAgICAgICAgICAgcmV0dXJuIHY7XG4gICAgICAgIH1cbiAgICB9O1xufVxuLyoqXG4gKiBQaXBlcyB1cGRhdGVzIHRvIHRoZSB0YXJnZXRzIGluIHJvdW5kLXJvYmluIGZhc2hpb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRzTG9hZEJhbGFuY2UodGFyZ2V0cykge1xuICAgIGxldCBpID0gMDtcbiAgICByZXR1cm4ge1xuICAgICAgICBuYW1lOiBgbG9hZEJhbGFuY2UgWyR7dGFyZ2V0cy5tYXAoKHYpID0+IHYubmFtZSkuam9pbigpfV1gLFxuICAgICAgICBvcGVyYXRpb25UeXBlOiBPcGVyYXRpb25UeXBlLk5PT1AsXG4gICAgICAgIG9wZXJhdGlvbjogKHYpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IHRhcmdldHNbaSsrXTtcbiAgICAgICAgICAgIGlmIChpID49IHRhcmdldHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgaSA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGFyZ2V0IGluc3RhbmNlb2YgRGF0YVNvdXJjZSB8fCB0YXJnZXQgaW5zdGFuY2VvZiBTdHJlYW0pIHtcbiAgICAgICAgICAgICAgICB0YXJnZXQudXBkYXRlKHYpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LnVwZGF0ZURvd25zdHJlYW0odik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdjtcbiAgICAgICAgfVxuICAgIH07XG59XG4vKipcbiAqIExvZ3MgdXBkYXRlcyB0byB0aGUgY29uc29sZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZHNMb2cocHJlZml4ID0gJycsIHN1ZmZpeCA9ICcnKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZTogYGxvZ2AsXG4gICAgICAgIG9wZXJhdGlvblR5cGU6IE9wZXJhdGlvblR5cGUuTk9PUCxcbiAgICAgICAgb3BlcmF0aW9uOiAodikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYCR7cHJlZml4fSR7dn0ke3N1ZmZpeH1gKTtcbiAgICAgICAgICAgIHJldHVybiB2O1xuICAgICAgICB9XG4gICAgfTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBkc1BpcGVBbGwoLi4uc291cmNlcykge1xuICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6IGBwaXBlQWxsIFske3NvdXJjZXMubWFwKCh2KSA9PiB2Lm5hbWUpLmpvaW4oKX1dYCxcbiAgICAgICAgb3BlcmF0aW9uVHlwZTogT3BlcmF0aW9uVHlwZS5OT09QLFxuICAgICAgICBvcGVyYXRpb246ICh2KSA9PiB7XG4gICAgICAgICAgICBzb3VyY2VzLmZvckVhY2goKHNvdXJjZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChzb3VyY2UgaW5zdGFuY2VvZiBEYXRhU291cmNlIHx8IHNvdXJjZSBpbnN0YW5jZW9mIFN0cmVhbSkge1xuICAgICAgICAgICAgICAgICAgICBzb3VyY2UudXBkYXRlKHYpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc291cmNlLnVwZGF0ZURvd25zdHJlYW0odik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdjtcbiAgICAgICAgfVxuICAgIH07XG59XG5leHBvcnQgZnVuY3Rpb24gZHNBY2N1bXVsYXRlKGluaXRpYWxWYWx1ZSkge1xuICAgIGxldCBzdW0gPSBpbml0aWFsVmFsdWU7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZTogYGFjY3VtdWxhdGVgLFxuICAgICAgICBvcGVyYXRpb25UeXBlOiBPcGVyYXRpb25UeXBlLk1BUCxcbiAgICAgICAgb3BlcmF0aW9uOiAodikgPT4ge1xuICAgICAgICAgICAgc3VtICs9IHY7XG4gICAgICAgICAgICByZXR1cm4gc3VtO1xuICAgICAgICB9XG4gICAgfTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGFfc291cmNlX29wZXJhdG9ycy5qcy5tYXAiLCJpbXBvcnQgeyBzeW5jRHVwbGV4RGF0YVNvdXJjZSB9IGZyb20gJy4uL2F1cnVtX3NlcnZlci9hdXJ1bV9zZXJ2ZXJfY2xpZW50LmpzJztcbmltcG9ydCB7IENhbmNlbGxhdGlvblRva2VuIH0gZnJvbSAnLi4vdXRpbGl0aWVzL2NhbmNlbGxhdGlvbl90b2tlbi5qcyc7XG5pbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICcuLi91dGlsaXRpZXMvZXZlbnRfZW1pdHRlci5qcyc7XG5pbXBvcnQgeyBwcm9taXNlSXRlcmF0b3IgfSBmcm9tICcuLi91dGlsaXRpZXMvaXRlcmF0aW9uLmpzJztcbmltcG9ydCB7IERhdGFTb3VyY2UsIHByb2Nlc3NUcmFuc2Zvcm0gfSBmcm9tICcuL2RhdGFfc291cmNlLmpzJztcbmltcG9ydCB7IERhdGFGbG93LCBkZHNPbmVXYXlGbG93IH0gZnJvbSAnLi9kdXBsZXhfZGF0YV9zb3VyY2Vfb3BlcmF0b3JzLmpzJztcbmltcG9ydCB7IE9wZXJhdGlvblR5cGUgfSBmcm9tICcuL29wZXJhdG9yX21vZGVsLmpzJztcbi8qKlxuICogU2FtZSBhcyBEYXRhU291cmNlIGV4Y2VwdCBkYXRhIGNhbiBmbG93IGluIGJvdGggZGlyZWN0aW9uc1xuICovXG5leHBvcnQgY2xhc3MgRHVwbGV4RGF0YVNvdXJjZSB7XG4gICAgLyoqXG4gICAgICogVGhlIGN1cnJlbnQgdmFsdWUgb2YgdGhpcyBkYXRhIHNvdXJjZSwgY2FuIGJlIGNoYW5nZWQgdGhyb3VnaCB1cGRhdGVcbiAgICAgKi9cbiAgICB2YWx1ZTtcbiAgICBwcmltZWQ7XG4gICAgZXJyb3JIYW5kbGVyO1xuICAgIGVycm9yRXZlbnQ7XG4gICAgdXBkYXRpbmdVcHN0cmVhbTtcbiAgICB1cGRhdGluZ0Rvd25zdHJlYW07XG4gICAgdXBkYXRlRG93bnN0cmVhbUV2ZW50O1xuICAgIHVwZGF0ZVVwc3RyZWFtRXZlbnQ7XG4gICAgcHJvcGFnYXRlV3JpdGVzVG9SZWFkU3RyZWFtO1xuICAgIG5hbWU7XG4gICAgLyoqXG4gICAgICogVGhlIHRvcCBjYW4gYmUgdmlld2VkIGFzIHRoZSBzb3VyY2Ugb2YgdHJ1dGggYW5kIGJvdHRvbSBhcyB0aGUgZGVyaXZlZCB2YWx1ZS4gVXBkYXRlRG93blN0cmVhbSBtZWFucyB0aGUgY2hhbmdlIGlzIHByb3BhZ2F0ZWQgZnJvbSB0b3AgdG8gYm90dG9tIG9yIHRoYXQgdGhlIHNvdXJjZSBvZiB0cnV0aCBjaGFuZ2VkLlxuICAgICAqIFVwZGF0ZVVwc3RyZWFtIG1lYW5zIHRoZSBjaGFuZ2UgaXMgcHJvcGFnYXRlZCBmcm9tIGJvdHRvbSB0byB0b3Agb3IgdGhhdCB0aGUgZGVyaXZlZCB2YWx1ZSBjaGFuZ2VkLlxuICAgICAqIEBwYXJhbSBpbml0aWFsVmFsdWVcbiAgICAgKiBAcGFyYW0gcm9vdE5vZGUgSWYgYSB3cml0ZSBpcyBkb25lIHByb3BhZ2F0ZSB0aGlzIHVwZGF0ZSBiYWNrIGRvd24gdG8gYWxsIHRoZSBjb25zdW1lcnMuIFVzZWZ1bCBhdCB0aGUgcm9vdCBub2RlIGJlY2F1c2UgaW4gY2FzZSBvZiBhIHRyZWUgc3RydWN0dXJlIGNoYW5nZXMgZnJvbSBvbmUgYnJhbmNoIHdvbid0IHByb3BhZ2F0ZSB0byB0aGUgb3RoZXIgd2l0aG91dCB0aGlzXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoaW5pdGlhbFZhbHVlLCByb290Tm9kZSA9IHRydWUsIG5hbWUgPSAnUm9vdER1cGxleERhdGFTb3VyY2UnKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMudmFsdWUgPSBpbml0aWFsVmFsdWU7XG4gICAgICAgIHRoaXMucHJpbWVkID0gaW5pdGlhbFZhbHVlICE9PSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMudXBkYXRlRG93bnN0cmVhbUV2ZW50ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgICAgICB0aGlzLnVwZGF0ZVVwc3RyZWFtRXZlbnQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIHRoaXMucHJvcGFnYXRlV3JpdGVzVG9SZWFkU3RyZWFtID0gcm9vdE5vZGU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENvbm5lY3RzIHRvIGFuIGF1cnVtLXNlcnZlciBleHBvc2VkIGRhdGFzb3VyY2UgdmlldyBodHRwczovL2dpdGh1Yi5jb20vQ3liZXJQaG9lbml4OTAvYXVydW0tc2VydmVyIGZvciBtb3JlIGluZm9ybWF0aW9uXG4gICAgICogTm90ZSB0aGF0IHR5cGUgc2FmZXR5IGlzIG5vdCBndWFyYW50ZWVkLiBXaGF0ZXZlciB0aGUgc2VydmVyIHNlbmRzIGFzIGFuIHVwZGF0ZSB3aWxsIGJlIHByb3BhZ2F0ZWRcbiAgICAgKiBAcGFyYW0gIHtBdXJ1bVNlcnZlckluZm99IGF1cnVtU2VydmVySW5mb1xuICAgICAqIEByZXR1cm5zIERhdGFTb3VyY2VcbiAgICAgKi9cbiAgICBzdGF0aWMgZnJvbVJlbW90ZVNvdXJjZShhdXJ1bVNlcnZlckluZm8sIGNhbmNlbGxhdGlvbikge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBuZXcgRHVwbGV4RGF0YVNvdXJjZSh1bmRlZmluZWQsIGZhbHNlKTtcbiAgICAgICAgc3luY0R1cGxleERhdGFTb3VyY2UocmVzdWx0LCBhdXJ1bVNlcnZlckluZm8sIGNhbmNlbGxhdGlvbik7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIHN0YXRpYyBmcm9tQXN5bmNJdGVyYXRvcihpdGVyYXRvciwgY2FuY2VsbGF0aW9uKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBEdXBsZXhEYXRhU291cmNlKCk7XG4gICAgICAgIChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBmb3IgYXdhaXQgKGNvbnN0IGl0ZW0gb2YgaXRlcmF0b3IpIHtcbiAgICAgICAgICAgICAgICBpZiAoY2FuY2VsbGF0aW9uPy5pc0NhbmNlbGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmVzdWx0LnVwZGF0ZURvd25zdHJlYW0oaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKCk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIHN0YXRpYyBmcm9tUHJvbWlzZShwcm9taXNlLCBjYW5jZWxsYXRpb24pIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gbmV3IER1cGxleERhdGFTb3VyY2UoKTtcbiAgICAgICAgcHJvbWlzZS50aGVuKCh2KSA9PiB7XG4gICAgICAgICAgICBpZiAoY2FuY2VsbGF0aW9uPy5pc0NhbmNlbGVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzdWx0LnVwZGF0ZURvd25zdHJlYW0odik7XG4gICAgICAgIH0sIChlKSA9PiB7XG4gICAgICAgICAgICBpZiAoY2FuY2VsbGF0aW9uPy5pc0NhbmNlbGVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzdWx0LmVtaXRFcnJvcihlLCBEYXRhRmxvdy5ET1dOU1RSRUFNKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIHN0YXRpYyBmcm9tUHJvbWlzZUFycmF5KHByb21pc2VzLCBjYW5jZWxsYXRpb24pIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gbmV3IER1cGxleERhdGFTb3VyY2UoKTtcbiAgICAgICAgKGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGZvciBhd2FpdCAoY29uc3QgcHJvbWlzZSBvZiBwcm9taXNlSXRlcmF0b3IocHJvbWlzZXMsIGNhbmNlbGxhdGlvbikpIHtcbiAgICAgICAgICAgICAgICBpZiAoY2FuY2VsbGF0aW9uPy5pc0NhbmNlbGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHByb21pc2Uuc3RhdHVzID09PSAnZnVsZmlsbGVkJykge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQudXBkYXRlRG93bnN0cmVhbShwcm9taXNlLnZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5lbWl0RXJyb3IocHJvbWlzZS5yZWFzb24sIERhdGFGbG93LkRPV05TVFJFQU0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkoKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgdG9Bc3luY0l0ZXJhdG9yKGNhbmNlbGxhdGlvbikge1xuICAgICAgICByZXR1cm4gdGhpcy51cGRhdGVEb3duc3RyZWFtRXZlbnQudG9Bc3luY0l0ZXJhdG9yKGNhbmNlbGxhdGlvbik7XG4gICAgfVxuICAgIHN0YXRpYyB0b0R1cGxleERhdGFTb3VyY2UodmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgRHVwbGV4RGF0YVNvdXJjZSkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBEdXBsZXhEYXRhU291cmNlKHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBNYWtlcyBpdCBwb3NzaWJsZSB0byBoYXZlIDIgY29tcGxldGVseSBzZXBhcmF0ZSBkYXRhIGZsb3cgcGlwZWxpbmVzIGZvciBlYWNoIGRpcmVjdGlvblxuICAgICAqIEBwYXJhbSBkb3duU3RyZWFtIHN0cmVhbSB0byBwaXBlIGRvd25zdHJlYW0gZGF0YSB0b1xuICAgICAqIEBwYXJhbSB1cHN0cmVhbSAgc3RyZWFtIHRvIHBpcGUgdXBzdHJlYW0gZGF0YSB0b1xuICAgICAqL1xuICAgIHN0YXRpYyBmcm9tVHdvRGF0YVNvdXJjZShkb3duU3RyZWFtLCB1cHN0cmVhbSwgaW5pdGlhbFZhbHVlLCBwcm9wYWdhdGVXcml0ZXNUb1JlYWRTdHJlYW0gPSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBEdXBsZXhEYXRhU291cmNlKGluaXRpYWxWYWx1ZSwgcHJvcGFnYXRlV3JpdGVzVG9SZWFkU3RyZWFtKTtcbiAgICAgICAgLy9AdHMtaWdub3JlXG4gICAgICAgIHJlc3VsdC51cGRhdGVEb3duc3RyZWFtRXZlbnQgPSBkb3duU3RyZWFtLnVwZGF0ZUV2ZW50O1xuICAgICAgICAvL0B0cy1pZ25vcmVcbiAgICAgICAgcmVzdWx0LnVwZGF0ZVVwc3RyZWFtRXZlbnQgPSB1cHN0cmVhbS51cGRhdGVFdmVudDtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVXBkYXRlcyB0aGUgZGF0YSBzb3VyY2Ugd2l0aCBhIHZhbHVlIGlmIGl0IGhhcyBuZXZlciBoYWQgYSB2YWx1ZSBiZWZvcmVcbiAgICAgKi9cbiAgICB3aXRoSW5pdGlhbCh2YWx1ZSkge1xuICAgICAgICBpZiAoIXRoaXMucHJpbWVkKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZURvd25zdHJlYW0odmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICB0b1N0cmluZygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWUudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWxsb3dzIGNyZWF0aW5nIGEgZHVwbGV4IHN0cmVhbSB0aGF0IGJsb2NrcyBkYXRhIGluIG9uZSBkaXJlY3Rpb24uIFVzZWZ1bCBmb3IgcGx1Z2dpbmcgaW50byBjb2RlIHRoYXQgdXNlcyB0d28gd2F5IGZsb3cgYnV0IG9ubHkgb25lIHdheSBpcyBkZXNpcmVkXG4gICAgICogQHBhcmFtIGRpcmVjdGlvbiBkaXJlY3Rpb24gb2YgdGhlIGRhdGFmbG93IHRoYXQgaXMgYWxsb3dlZFxuICAgICAqL1xuICAgIHN0YXRpYyBjcmVhdGVPbmVXYXkoZGlyZWN0aW9uID0gRGF0YUZsb3cuRE9XTlNUUkVBTSwgaW5pdGlhbFZhbHVlKSB7XG4gICAgICAgIHJldHVybiBuZXcgRHVwbGV4RGF0YVNvdXJjZShpbml0aWFsVmFsdWUsIGZhbHNlKS50cmFuc2Zvcm1EdXBsZXgoZGRzT25lV2F5RmxvdyhkaXJlY3Rpb24pKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVXBkYXRlcyB0aGUgdmFsdWUgaW4gdGhlIGRhdGEgc291cmNlIGFuZCBjYWxscyB0aGUgbGlzdGVuIGNhbGxiYWNrIGZvciBhbGwgbGlzdGVuZXJzXG4gICAgICogTW92ZXMgdGhlIGRhdGEgZnJvbSB0aGUgdG9wIHRvIHRoZSBib3R0b20uIFVzZWQgdG8gcmVmbGVjdCBjaGFuZ2VzIGluIHRoZSBzb3VyY2UgZGF0YSB0byB0aGUgZGVyaXZlZCBkYXRhXG4gICAgICogQHBhcmFtIG5ld1ZhbHVlIG5ldyB2YWx1ZSBmb3IgdGhlIGRhdGEgc291cmNlXG4gICAgICovXG4gICAgdXBkYXRlRG93bnN0cmVhbShuZXdWYWx1ZSkge1xuICAgICAgICAvL0B0cy1leHBlY3QtZXJyb3IgVHlwZXNjcmlwdCB0cmllcyB0byBiZSBzbWFydCBhbmQgdGhpbmtzIHRoaXMgY291bGQgbmV2ZXIgaGFwcGVuIGJ1dCBpdCBjYW4gd2l0aCB0aGUgYW55IHR5cGUgYXMgVFxuICAgICAgICBpZiAobmV3VmFsdWUgPT09IHRoaXMpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IHVwZGF0ZSBkYXRhIHNvdXJjZSB3aXRoIGl0c2VsZicpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnVwZGF0aW5nRG93bnN0cmVhbSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQcm9ibGVtIGluIGRhdGFzIHNvdXJjZTogVW5zdGFibGUgdmFsdWUgcHJvcGFnYXRpb24sIHdoZW4gdXBkYXRpbmcgYSB2YWx1ZSB0aGUgc3RyZWFtIHdhcyB1cGRhdGVkIGJhY2sgYXMgYSBkaXJlY3QgcmVzcG9uc2UuIFRoaXMgY2FuIGxlYWQgdG8gaW5maW5pdGUgbG9vcHMgYW5kIGlzIHRoZXJlZm9yZSBub3QgYWxsb3dlZCcpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucHJpbWVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy51cGRhdGluZ0Rvd25zdHJlYW0gPSB0cnVlO1xuICAgICAgICB0aGlzLnZhbHVlID0gbmV3VmFsdWU7XG4gICAgICAgIHRoaXMudXBkYXRlRG93bnN0cmVhbUV2ZW50LmZpcmUobmV3VmFsdWUpO1xuICAgICAgICB0aGlzLnVwZGF0aW5nRG93bnN0cmVhbSA9IGZhbHNlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBVcGRhdGVzIHRoZSB2YWx1ZSBpbiB0aGUgZGF0YSBzb3VyY2UgYW5kIGNhbGxzIHRoZSBsaXN0ZW4gY2FsbGJhY2sgZm9yIGFsbCBsaXN0ZW5lcnMuXG4gICAgICogTW92ZXMgdGhlIGRhdGEgZnJvbSB0aGUgYm90dG9tIHRvIHRoZSB0b3AuIFVzZWQgdG8gcmVmbGVjdCBjaGFuZ2VzIGluIGRlcml2ZWQgZGF0YSBiYWNrIHRvIHRoZSBzb3VyY2VcbiAgICAgKiBAcGFyYW0gbmV3VmFsdWUgbmV3IHZhbHVlIGZvciB0aGUgZGF0YSBzb3VyY2VcbiAgICAgKi9cbiAgICB1cGRhdGVVcHN0cmVhbShuZXdWYWx1ZSkge1xuICAgICAgICAvL0B0cy1leHBlY3QtZXJyb3IgVHlwZXNjcmlwdCB0cmllcyB0byBiZSBzbWFydCBhbmQgdGhpbmtzIHRoaXMgY291bGQgbmV2ZXIgaGFwcGVuIGJ1dCBpdCBjYW4gd2l0aCB0aGUgYW55IHR5cGUgYXMgVFxuICAgICAgICBpZiAobmV3VmFsdWUgPT09IHRoaXMpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IHVwZGF0ZSBkYXRhIHNvdXJjZSB3aXRoIGl0c2VsZicpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnVwZGF0aW5nVXBzdHJlYW0pIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUHJvYmxlbSBpbiBkYXRhcyBzb3VyY2U6IFVuc3RhYmxlIHZhbHVlIHByb3BhZ2F0aW9uLCB3aGVuIHVwZGF0aW5nIGEgdmFsdWUgdGhlIHN0cmVhbSB3YXMgdXBkYXRlZCBiYWNrIGFzIGEgZGlyZWN0IHJlc3BvbnNlLiBUaGlzIGNhbiBsZWFkIHRvIGluZmluaXRlIGxvb3BzIGFuZCBpcyB0aGVyZWZvcmUgbm90IGFsbG93ZWQnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnByaW1lZCA9IHRydWU7XG4gICAgICAgIHRoaXMudXBkYXRpbmdVcHN0cmVhbSA9IHRydWU7XG4gICAgICAgIHRoaXMudmFsdWUgPSBuZXdWYWx1ZTtcbiAgICAgICAgdGhpcy51cGRhdGVVcHN0cmVhbUV2ZW50LmZpcmUobmV3VmFsdWUpO1xuICAgICAgICBpZiAodGhpcy5wcm9wYWdhdGVXcml0ZXNUb1JlYWRTdHJlYW0pIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlRG93bnN0cmVhbUV2ZW50LmZpcmUobmV3VmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudXBkYXRpbmdVcHN0cmVhbSA9IGZhbHNlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTYW1lIGFzIGxpc3RlbiBidXQgd2lsbCBpbW1lZGlhdGVseSBjYWxsIHRoZSBjYWxsYmFjayB3aXRoIHRoZSBjdXJyZW50IHZhbHVlIGZpcnN0XG4gICAgICogQHBhcmFtIGNhbGxiYWNrIENhbGxiYWNrIHRvIGNhbGwgd2hlbiB2YWx1ZSBpcyB1cGRhdGVkXG4gICAgICogQHBhcmFtIGNhbmNlbGxhdGlvblRva2VuIE9wdGlvbmFsIHRva2VuIHRvIGNvbnRyb2wgdGhlIGNhbmNlbGxhdGlvbiBvZiB0aGUgc3Vic2NyaXB0aW9uXG4gICAgICogQHJldHVybnMgQ2FuY2VsbGF0aW9uIGNhbGxiYWNrLCBjYW4gYmUgdXNlZCB0byBjYW5jZWwgc3Vic2NyaXB0aW9uIHdpdGhvdXQgYSBjYW5jZWxsYXRpb24gdG9rZW5cbiAgICAgKi9cbiAgICBsaXN0ZW5BbmRSZXBlYXQoY2FsbGJhY2ssIGNhbmNlbGxhdGlvblRva2VuKSB7XG4gICAgICAgIGlmICh0aGlzLnByaW1lZCkge1xuICAgICAgICAgICAgY2FsbGJhY2sodGhpcy52YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdGVuKGNhbGxiYWNrLCBjYW5jZWxsYXRpb25Ub2tlbik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIGFsaWFzIGZvciBsaXN0ZW5Eb3duc3RyZWFtXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIENhbGxiYWNrIHRvIGNhbGwgd2hlbiB2YWx1ZSBpcyB1cGRhdGVkXG4gICAgICogQHBhcmFtIGNhbmNlbGxhdGlvblRva2VuIE9wdGlvbmFsIHRva2VuIHRvIGNvbnRyb2wgdGhlIGNhbmNlbGxhdGlvbiBvZiB0aGUgc3Vic2NyaXB0aW9uXG4gICAgICogQHJldHVybnMgQ2FuY2VsbGF0aW9uIGNhbGxiYWNrLCBjYW4gYmUgdXNlZCB0byBjYW5jZWwgc3Vic2NyaXB0aW9uIHdpdGhvdXQgYSBjYW5jZWxsYXRpb24gdG9rZW5cbiAgICAgKi9cbiAgICBsaXN0ZW4oY2FsbGJhY2ssIGNhbmNlbGxhdGlvblRva2VuKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxpc3RlbkludGVybmFsKGNhbGxiYWNrLCBjYW5jZWxsYXRpb25Ub2tlbik7XG4gICAgfVxuICAgIGxpc3RlbkludGVybmFsKGNhbGxiYWNrLCBjYW5jZWxsYXRpb25Ub2tlbikge1xuICAgICAgICByZXR1cm4gdGhpcy51cGRhdGVEb3duc3RyZWFtRXZlbnQuc3Vic2NyaWJlKGNhbGxiYWNrLCBjYW5jZWxsYXRpb25Ub2tlbikuY2FuY2VsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTdWJzY3JpYmVzIGV4Y2x1c2l2ZWx5IHRvIHVwZGF0ZXMgb2YgdGhlIGRhdGEgc3RyZWFtIHRoYXQgb2NjdXIgZHVlIHRvIGFuIHVwZGF0ZSBmbG93aW5nIHVwc3RyZWFtXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIENhbGxiYWNrIHRvIGNhbGwgd2hlbiB2YWx1ZSBpcyB1cGRhdGVkXG4gICAgICogQHBhcmFtIGNhbmNlbGxhdGlvblRva2VuIE9wdGlvbmFsIHRva2VuIHRvIGNvbnRyb2wgdGhlIGNhbmNlbGxhdGlvbiBvZiB0aGUgc3Vic2NyaXB0aW9uXG4gICAgICogQHJldHVybnMgQ2FuY2VsbGF0aW9uIGNhbGxiYWNrLCBjYW4gYmUgdXNlZCB0byBjYW5jZWwgc3Vic2NyaXB0aW9uIHdpdGhvdXQgYSBjYW5jZWxsYXRpb24gdG9rZW5cbiAgICAgKi9cbiAgICBsaXN0ZW5VcHN0cmVhbShjYWxsYmFjaywgY2FuY2VsbGF0aW9uVG9rZW4pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudXBkYXRlVXBzdHJlYW1FdmVudC5zdWJzY3JpYmUoY2FsbGJhY2ssIGNhbmNlbGxhdGlvblRva2VuKS5jYW5jZWw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFN1YnNjcmliZXMgZXhjbHVzaXZlbHkgdG8gdXBkYXRlcyBvZiB0aGUgZGF0YSBzdHJlYW0gdGhhdCBvY2N1ciBkdWUgdG8gYW4gdXBkYXRlIGZsb3dpbmcgdXBzdHJlYW1cbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sgQ2FsbGJhY2sgdG8gY2FsbCB3aGVuIHZhbHVlIGlzIHVwZGF0ZWRcbiAgICAgKiBAcGFyYW0gY2FuY2VsbGF0aW9uVG9rZW4gT3B0aW9uYWwgdG9rZW4gdG8gY29udHJvbCB0aGUgY2FuY2VsbGF0aW9uIG9mIHRoZSBzdWJzY3JpcHRpb25cbiAgICAgKiBAcmV0dXJucyBDYW5jZWxsYXRpb24gY2FsbGJhY2ssIGNhbiBiZSB1c2VkIHRvIGNhbmNlbCBzdWJzY3JpcHRpb24gd2l0aG91dCBhIGNhbmNlbGxhdGlvbiB0b2tlblxuICAgICAqL1xuICAgIGxpc3RlblVwc3RyZWFtQW5kUmVwZWF0KGNhbGxiYWNrLCBjYW5jZWxsYXRpb25Ub2tlbikge1xuICAgICAgICBpZiAodGhpcy5wcmltZWQpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKHRoaXMudmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnVwZGF0ZVVwc3RyZWFtRXZlbnQuc3Vic2NyaWJlKGNhbGxiYWNrLCBjYW5jZWxsYXRpb25Ub2tlbikuY2FuY2VsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTdWJzY3JpYmVzIGV4Y2x1c2l2ZWx5IHRvIG9uZSB1cGRhdGUgb2YgdGhlIGRhdGEgc3RyZWFtIHRoYXQgb2NjdXIgZHVlIHRvIGFuIHVwZGF0ZSBmbG93aW5nIHVwc3RyZWFtXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIENhbGxiYWNrIHRvIGNhbGwgd2hlbiB2YWx1ZSBpcyB1cGRhdGVkXG4gICAgICogQHBhcmFtIGNhbmNlbGxhdGlvblRva2VuIE9wdGlvbmFsIHRva2VuIHRvIGNvbnRyb2wgdGhlIGNhbmNlbGxhdGlvbiBvZiB0aGUgc3Vic2NyaXB0aW9uXG4gICAgICogQHJldHVybnMgQ2FuY2VsbGF0aW9uIGNhbGxiYWNrLCBjYW4gYmUgdXNlZCB0byBjYW5jZWwgc3Vic2NyaXB0aW9uIHdpdGhvdXQgYSBjYW5jZWxsYXRpb24gdG9rZW5cbiAgICAgKi9cbiAgICBsaXN0ZW5VcHN0cmVhbU9uY2UoY2FsbGJhY2ssIGNhbmNlbGxhdGlvblRva2VuKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnVwZGF0ZVVwc3RyZWFtRXZlbnQuc3Vic2NyaWJlT25jZShjYWxsYmFjaywgY2FuY2VsbGF0aW9uVG9rZW4pLmNhbmNlbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU3Vic2NyaWJlcyBleGNsdXNpdmVseSB0byB1cGRhdGVzIG9mIHRoZSBkYXRhIHN0cmVhbSB0aGF0IG9jY3VyIGR1ZSB0byBhbiB1cGRhdGUgZmxvd2luZyBkb3duc3RyZWFtXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIENhbGxiYWNrIHRvIGNhbGwgd2hlbiB2YWx1ZSBpcyB1cGRhdGVkXG4gICAgICogQHBhcmFtIGNhbmNlbGxhdGlvblRva2VuIE9wdGlvbmFsIHRva2VuIHRvIGNvbnRyb2wgdGhlIGNhbmNlbGxhdGlvbiBvZiB0aGUgc3Vic2NyaXB0aW9uXG4gICAgICogQHJldHVybnMgQ2FuY2VsbGF0aW9uIGNhbGxiYWNrLCBjYW4gYmUgdXNlZCB0byBjYW5jZWwgc3Vic2NyaXB0aW9uIHdpdGhvdXQgYSBjYW5jZWxsYXRpb24gdG9rZW5cbiAgICAgKi9cbiAgICBsaXN0ZW5Eb3duc3RyZWFtKGNhbGxiYWNrLCBjYW5jZWxsYXRpb25Ub2tlbikge1xuICAgICAgICByZXR1cm4gdGhpcy51cGRhdGVEb3duc3RyZWFtRXZlbnQuc3Vic2NyaWJlKGNhbGxiYWNrLCBjYW5jZWxsYXRpb25Ub2tlbikuY2FuY2VsO1xuICAgIH1cbiAgICBkb3duU3RyZWFtVG9EYXRhU291cmNlKGNhbmNlbGxhdGlvblRva2VuKSB7XG4gICAgICAgIGNvbnN0IGRvd25TdHJlYW1EYXRhc291cmNlID0gbmV3IERhdGFTb3VyY2UodGhpcy52YWx1ZSk7XG4gICAgICAgIHRoaXMubGlzdGVuRG93bnN0cmVhbSgobmV3VmFsKSA9PiB7XG4gICAgICAgICAgICBkb3duU3RyZWFtRGF0YXNvdXJjZS51cGRhdGUobmV3VmFsKTtcbiAgICAgICAgfSwgY2FuY2VsbGF0aW9uVG9rZW4pO1xuICAgICAgICByZXR1cm4gZG93blN0cmVhbURhdGFzb3VyY2U7XG4gICAgfVxuICAgIGFnZ3JlZ2F0ZShvdGhlclNvdXJjZXMsIGNvbWJpbmF0b3IsIGNhbmNlbGxhdGlvblRva2VuKSB7XG4gICAgICAgIGNhbmNlbGxhdGlvblRva2VuID0gY2FuY2VsbGF0aW9uVG9rZW4gPz8gbmV3IENhbmNlbGxhdGlvblRva2VuKCk7XG4gICAgICAgIGNvbnN0IGFnZ3JlZ2F0ZWRTb3VyY2UgPSBuZXcgRGF0YVNvdXJjZShjb21iaW5hdG9yKHRoaXMudmFsdWUsIC4uLm90aGVyU291cmNlcy5tYXAoKHMpID0+IHM/LnZhbHVlKSkpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG90aGVyU291cmNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgb3RoZXJTb3VyY2VzW2ldPy5saXN0ZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIGFnZ3JlZ2F0ZWRTb3VyY2UudXBkYXRlKGNvbWJpbmF0b3IodGhpcy52YWx1ZSwgLi4ub3RoZXJTb3VyY2VzLm1hcCgocykgPT4gcz8udmFsdWUpKSk7XG4gICAgICAgICAgICB9LCBjYW5jZWxsYXRpb25Ub2tlbik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5saXN0ZW4oKCkgPT4gYWdncmVnYXRlZFNvdXJjZS51cGRhdGUoY29tYmluYXRvcih0aGlzLnZhbHVlLCAuLi5vdGhlclNvdXJjZXMubWFwKChzKSA9PiBzPy52YWx1ZSkpKSwgY2FuY2VsbGF0aW9uVG9rZW4pO1xuICAgICAgICByZXR1cm4gYWdncmVnYXRlZFNvdXJjZTtcbiAgICB9XG4gICAgdHJhbnNmb3JtRHVwbGV4KG9wZXJhdGlvbkEsIG9wZXJhdGlvbkIsIG9wZXJhdGlvbkMsIG9wZXJhdGlvbkQsIG9wZXJhdGlvbkUsIG9wZXJhdGlvbkYsIG9wZXJhdGlvbkcsIG9wZXJhdGlvbkgsIG9wZXJhdGlvbkksIG9wZXJhdGlvbkosIG9wZXJhdGlvbkssIGNhbmNlbGxhdGlvblRva2VuKSB7XG4gICAgICAgIGxldCB0b2tlbjtcbiAgICAgICAgY29uc3Qgb3BlcmF0aW9ucyA9IFtcbiAgICAgICAgICAgIG9wZXJhdGlvbkEsXG4gICAgICAgICAgICBvcGVyYXRpb25CLFxuICAgICAgICAgICAgb3BlcmF0aW9uQyxcbiAgICAgICAgICAgIG9wZXJhdGlvbkQsXG4gICAgICAgICAgICBvcGVyYXRpb25FLFxuICAgICAgICAgICAgb3BlcmF0aW9uRixcbiAgICAgICAgICAgIG9wZXJhdGlvbkcsXG4gICAgICAgICAgICBvcGVyYXRpb25ILFxuICAgICAgICAgICAgb3BlcmF0aW9uSSxcbiAgICAgICAgICAgIG9wZXJhdGlvbkosXG4gICAgICAgICAgICBvcGVyYXRpb25LXG4gICAgICAgIF0uZmlsdGVyKChlKSA9PiBlICYmIChlIGluc3RhbmNlb2YgQ2FuY2VsbGF0aW9uVG9rZW4gPyAoKHRva2VuID0gZSksIGZhbHNlKSA6IHRydWUpKTtcbiAgICAgICAgaWYgKGNhbmNlbGxhdGlvblRva2VuKSB7XG4gICAgICAgICAgICB0b2tlbiA9IGNhbmNlbGxhdGlvblRva2VuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBEdXBsZXhEYXRhU291cmNlKHVuZGVmaW5lZCwgZmFsc2UsIHRoaXMubmFtZSArICcgJyArIG9wZXJhdGlvbnMubWFwKCh2KSA9PiB2Lm5hbWUpLmpvaW4oJyAnKSk7XG4gICAgICAgICh0aGlzLnByaW1lZCA/IHRoaXMubGlzdGVuQW5kUmVwZWF0IDogdGhpcy5saXN0ZW4pLmNhbGwodGhpcywgcHJvY2Vzc1RyYW5zZm9ybUR1cGxleChvcGVyYXRpb25zLCByZXN1bHQsIERhdGFGbG93LkRPV05TVFJFQU0pLCB0b2tlbik7XG4gICAgICAgIHJlc3VsdC5saXN0ZW5VcHN0cmVhbS5jYWxsKHJlc3VsdCwgcHJvY2Vzc1RyYW5zZm9ybUR1cGxleChvcGVyYXRpb25zLCB0aGlzLCBEYXRhRmxvdy5VUFNUUkVBTSksIHRva2VuKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgdHJhbnNmb3JtKG9wZXJhdGlvbkEsIG9wZXJhdGlvbkIsIG9wZXJhdGlvbkMsIG9wZXJhdGlvbkQsIG9wZXJhdGlvbkUsIG9wZXJhdGlvbkYsIG9wZXJhdGlvbkcsIG9wZXJhdGlvbkgsIG9wZXJhdGlvbkksIG9wZXJhdGlvbkosIG9wZXJhdGlvbkssIGNhbmNlbGxhdGlvblRva2VuKSB7XG4gICAgICAgIGxldCB0b2tlbjtcbiAgICAgICAgY29uc3Qgb3BlcmF0aW9ucyA9IFtcbiAgICAgICAgICAgIG9wZXJhdGlvbkEsXG4gICAgICAgICAgICBvcGVyYXRpb25CLFxuICAgICAgICAgICAgb3BlcmF0aW9uQyxcbiAgICAgICAgICAgIG9wZXJhdGlvbkQsXG4gICAgICAgICAgICBvcGVyYXRpb25FLFxuICAgICAgICAgICAgb3BlcmF0aW9uRixcbiAgICAgICAgICAgIG9wZXJhdGlvbkcsXG4gICAgICAgICAgICBvcGVyYXRpb25ILFxuICAgICAgICAgICAgb3BlcmF0aW9uSSxcbiAgICAgICAgICAgIG9wZXJhdGlvbkosXG4gICAgICAgICAgICBvcGVyYXRpb25LXG4gICAgICAgIF0uZmlsdGVyKChlKSA9PiBlICYmIChlIGluc3RhbmNlb2YgQ2FuY2VsbGF0aW9uVG9rZW4gPyAoKHRva2VuID0gZSksIGZhbHNlKSA6IHRydWUpKTtcbiAgICAgICAgaWYgKGNhbmNlbGxhdGlvblRva2VuKSB7XG4gICAgICAgICAgICB0b2tlbiA9IGNhbmNlbGxhdGlvblRva2VuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBEYXRhU291cmNlKHVuZGVmaW5lZCwgdGhpcy5uYW1lICsgJyAnICsgb3BlcmF0aW9ucy5tYXAoKHYpID0+IHYubmFtZSkuam9pbignICcpKTtcbiAgICAgICAgKHRoaXMucHJpbWVkID8gdGhpcy5saXN0ZW5BbmRSZXBlYXQgOiB0aGlzLmxpc3RlbikuY2FsbCh0aGlzLCBwcm9jZXNzVHJhbnNmb3JtKG9wZXJhdGlvbnMsIHJlc3VsdCksIHRva2VuKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTGlrZSBhZ2dyZWdhdGUgZXhjZXB0IHRoYXQgbm8gY29tYmluYXRpb24gbWV0aG9kIGlzIG5lZWRlZCBhcyBhIHJlc3VsdCBib3RoIHBhcmVudHMgbXVzdCBoYXZlIHRoZSBzYW1lIHR5cGUgYW5kIHRoZSBuZXcgc3RyZWFtIGp1c3QgZXhwb3NlcyB0aGUgbGFzdCB1cGRhdGUgcmVjaWV2ZWQgZnJvbSBlaXRoZXIgcGFyZW50XG4gICAgICogQHBhcmFtIG90aGVyU291cmNlIFNlY29uZCBwYXJlbnQgZm9yIHRoZSBuZXcgc291cmNlXG4gICAgICogQHBhcmFtIGNhbmNlbGxhdGlvblRva2VuICBDYW5jZWxsYXRpb24gdG9rZW4gdG8gY2FuY2VsIHRoZSBzdWJzY3JpcHRpb25zIHRoZSBuZXcgZGF0YXNvdXJjZSBoYXMgdG8gdGhlIHR3byBwYXJlbnQgZGF0YXNvdXJjZXNcbiAgICAgKi9cbiAgICBjb21iaW5lKG90aGVyU291cmNlcywgY2FuY2VsbGF0aW9uVG9rZW4pIHtcbiAgICAgICAgY2FuY2VsbGF0aW9uVG9rZW4gPSBjYW5jZWxsYXRpb25Ub2tlbiA/PyBuZXcgQ2FuY2VsbGF0aW9uVG9rZW4oKTtcbiAgICAgICAgbGV0IGNvbWJpbmVkRGF0YVNvdXJjZTtcbiAgICAgICAgaWYgKHRoaXMucHJpbWVkKSB7XG4gICAgICAgICAgICBjb21iaW5lZERhdGFTb3VyY2UgPSBuZXcgRGF0YVNvdXJjZSh0aGlzLnZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbWJpbmVkRGF0YVNvdXJjZSA9IG5ldyBEYXRhU291cmNlKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5waXBlKGNvbWJpbmVkRGF0YVNvdXJjZSwgY2FuY2VsbGF0aW9uVG9rZW4pO1xuICAgICAgICBmb3IgKGNvbnN0IG90aGVyU291cmNlIG9mIG90aGVyU291cmNlcykge1xuICAgICAgICAgICAgb3RoZXJTb3VyY2UucGlwZShjb21iaW5lZERhdGFTb3VyY2UsIGNhbmNlbGxhdGlvblRva2VuKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29tYmluZWREYXRhU291cmNlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBGb3J3YXJkcyBhbGwgdXBkYXRlcyBmcm9tIHRoaXMgc291cmNlIHRvIGFub3RoZXJcbiAgICAgKiBAcGFyYW0gdGFyZ2V0RGF0YVNvdXJjZSBkYXRhc291cmNlIHRvIHBpcGUgdGhlIHVwZGF0ZXMgdG9cbiAgICAgKiBAcGFyYW0gY2FuY2VsbGF0aW9uVG9rZW4gIENhbmNlbGxhdGlvbiB0b2tlbiB0byBjYW5jZWwgdGhlIHN1YnNjcmlwdGlvbnMgYWRkZWQgdG8gdGhlIGRhdGFzb3VyY2VzIGJ5IHRoaXMgb3BlcmF0aW9uXG4gICAgICovXG4gICAgcGlwZSh0YXJnZXREYXRhU291cmNlLCBjYW5jZWxsYXRpb25Ub2tlbikge1xuICAgICAgICB0aGlzLmxpc3RlbkRvd25zdHJlYW0oKG5ld1ZhbCkgPT4gdGFyZ2V0RGF0YVNvdXJjZS51cGRhdGUobmV3VmFsKSwgY2FuY2VsbGF0aW9uVG9rZW4pO1xuICAgICAgICB0YXJnZXREYXRhU291cmNlLmxpc3RlbigobmV3VmFsKSA9PiB0aGlzLnVwZGF0ZVVwc3RyZWFtKG5ld1ZhbCksIGNhbmNlbGxhdGlvblRva2VuKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGxpc3Rlbk9uY2UoY2FsbGJhY2ssIGNhbmNlbGxhdGlvblRva2VuKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnVwZGF0ZURvd25zdHJlYW1FdmVudC5zdWJzY3JpYmVPbmNlKGNhbGxiYWNrLCBjYW5jZWxsYXRpb25Ub2tlbikuY2FuY2VsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIG5leHQgdXBkYXRlIG9jY3Vyc1xuICAgICAqIEBwYXJhbSBjYW5jZWxsYXRpb25Ub2tlblxuICAgICAqL1xuICAgIGF3YWl0TmV4dFVwZGF0ZShjYW5jZWxsYXRpb25Ub2tlbikge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgIHRoaXMubGlzdGVuT25jZSgodmFsdWUpID0+IHJlc29sdmUodmFsdWUpLCBjYW5jZWxsYXRpb25Ub2tlbik7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgYWxsIGxpc3RlbmVyc1xuICAgICAqL1xuICAgIGNhbmNlbEFsbCgpIHtcbiAgICAgICAgdGhpcy51cGRhdGVEb3duc3RyZWFtRXZlbnQuY2FuY2VsQWxsKCk7XG4gICAgICAgIHRoaXMudXBkYXRlVXBzdHJlYW1FdmVudC5jYW5jZWxBbGwoKTtcbiAgICB9XG4gICAgY2FuY2VsQWxsRG93bnN0cmVhbSgpIHtcbiAgICAgICAgdGhpcy51cGRhdGVEb3duc3RyZWFtRXZlbnQuY2FuY2VsQWxsKCk7XG4gICAgfVxuICAgIGNhbmNlbEFsbFVwc3RyZWFtKCkge1xuICAgICAgICB0aGlzLnVwZGF0ZVVwc3RyZWFtRXZlbnQuY2FuY2VsQWxsKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFzc2lnbiBhIGZ1bmN0aW9uIHRvIGhhbmRsZSBlcnJvcnMgYW5kIG1hcCB0aGVtIGJhY2sgdG8gcmVndWxhciB2YWx1ZXMuIFJldGhyb3cgdGhlIGVycm9yIGluIGNhc2UgeW91IHdhbnQgdG8gZmFsbGJhY2sgdG8gZW1pdHRpbmcgZXJyb3JcbiAgICAgKi9cbiAgICBoYW5kbGVFcnJvcnMoY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5lcnJvckhhbmRsZXIgPSBjYWxsYmFjaztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIG9uRXJyb3IoY2FsbGJhY2ssIGNhbmNlbGxhdGlvblRva2VuKSB7XG4gICAgICAgIHRoaXMuZXJyb3JFdmVudC5zdWJzY3JpYmUoY2FsbGJhY2ssIGNhbmNlbGxhdGlvblRva2VuKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGVtaXRFcnJvcihlLCBkaXJlY3Rpb24pIHtcbiAgICAgICAgaWYgKHRoaXMuZXJyb3JIYW5kbGVyKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGlmIChkaXJlY3Rpb24gPT09IERhdGFGbG93LkRPV05TVFJFQU0pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudXBkYXRlRG93bnN0cmVhbSh0aGlzLmVycm9ySGFuZGxlcihlKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy51cGRhdGVVcHN0cmVhbSh0aGlzLmVycm9ySGFuZGxlcihlKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKG5ld0Vycm9yKSB7XG4gICAgICAgICAgICAgICAgZSA9IG5ld0Vycm9yO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmVycm9yRXZlbnQuaGFzU3Vic2NyaXB0aW9ucygpKSB7XG4gICAgICAgICAgICB0aGlzLmVycm9yRXZlbnQuZmlyZShlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IGU7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gcHJvY2Vzc1RyYW5zZm9ybUR1cGxleChvcGVyYXRpb25zLCByZXN1bHQsIGRpcmVjdGlvbikge1xuICAgIHJldHVybiBhc3luYyAodikgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBvcGVyYXRpb24gb2Ygb3BlcmF0aW9ucykge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAob3BlcmF0aW9uLm9wZXJhdGlvblR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBPcGVyYXRpb25UeXBlLk5PT1A6XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgT3BlcmF0aW9uVHlwZS5NQVA6XG4gICAgICAgICAgICAgICAgICAgICAgICB2ID1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXJlY3Rpb24gPT09IERhdGFGbG93LkRPV05TVFJFQU1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBvcGVyYXRpb24ub3BlcmF0aW9uRG93bih2KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IG9wZXJhdGlvbi5vcGVyYXRpb25VcCh2KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIE9wZXJhdGlvblR5cGUuTUFQX0RFTEFZX0ZJTFRFUjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRtcCA9IGRpcmVjdGlvbiA9PT0gRGF0YUZsb3cuRE9XTlNUUkVBTVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gYXdhaXQgb3BlcmF0aW9uLm9wZXJhdGlvbkRvd24odilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGF3YWl0IG9wZXJhdGlvbi5vcGVyYXRpb25VcCh2KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0bXAuY2FuY2VsbGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdiA9IGF3YWl0IHRtcC5pdGVtO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgT3BlcmF0aW9uVHlwZS5ERUxBWTpcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBPcGVyYXRpb25UeXBlLk1BUF9ERUxBWTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHYgPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdGlvbiA9PT0gRGF0YUZsb3cuRE9XTlNUUkVBTVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IGF3YWl0IG9wZXJhdGlvbi5vcGVyYXRpb25Eb3duKHYpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogYXdhaXQgb3BlcmF0aW9uLm9wZXJhdGlvblVwKHYpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgT3BlcmF0aW9uVHlwZS5ERUxBWV9GSUxURVI6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIShkaXJlY3Rpb24gPT09IERhdGFGbG93LkRPV05TVFJFQU1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IGF3YWl0IG9wZXJhdGlvbi5vcGVyYXRpb25Eb3duKHYpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBhd2FpdCBvcGVyYXRpb24ub3BlcmF0aW9uVXAodikpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgT3BlcmF0aW9uVHlwZS5GSUxURVI6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIShkaXJlY3Rpb24gPT09IERhdGFGbG93LkRPV05TVFJFQU1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IG9wZXJhdGlvbi5vcGVyYXRpb25Eb3duKHYpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBvcGVyYXRpb24ub3BlcmF0aW9uVXAodikpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gRGF0YUZsb3cuRE9XTlNUUkVBTSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdC51cGRhdGVEb3duc3RyZWFtKHYpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnVwZGF0ZVVwc3RyZWFtKHYpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICByZXN1bHQuZW1pdEVycm9yKGUsIGRpcmVjdGlvbik7XG4gICAgICAgIH1cbiAgICB9O1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZHVwbGV4X2RhdGFfc291cmNlLmpzLm1hcCIsImltcG9ydCB7IGRzRGVib3VuY2UgfSBmcm9tICcuL2RhdGFfc291cmNlX29wZXJhdG9ycy5qcyc7XG5pbXBvcnQgeyBPcGVyYXRpb25UeXBlIH0gZnJvbSAnLi9vcGVyYXRvcl9tb2RlbC5qcyc7XG5leHBvcnQgdmFyIERhdGFGbG93O1xuKGZ1bmN0aW9uIChEYXRhRmxvdykge1xuICAgIERhdGFGbG93W0RhdGFGbG93W1wiVVBTVFJFQU1cIl0gPSAwXSA9IFwiVVBTVFJFQU1cIjtcbiAgICBEYXRhRmxvd1tEYXRhRmxvd1tcIkRPV05TVFJFQU1cIl0gPSAxXSA9IFwiRE9XTlNUUkVBTVwiO1xufSkoRGF0YUZsb3cgfHwgKERhdGFGbG93ID0ge30pKTtcbmV4cG9ydCB2YXIgRGF0YUZsb3dCb3RoO1xuKGZ1bmN0aW9uIChEYXRhRmxvd0JvdGgpIHtcbiAgICBEYXRhRmxvd0JvdGhbRGF0YUZsb3dCb3RoW1wiVVBTVFJFQU1cIl0gPSAwXSA9IFwiVVBTVFJFQU1cIjtcbiAgICBEYXRhRmxvd0JvdGhbRGF0YUZsb3dCb3RoW1wiRE9XTlNUUkVBTVwiXSA9IDFdID0gXCJET1dOU1RSRUFNXCI7XG4gICAgRGF0YUZsb3dCb3RoW0RhdGFGbG93Qm90aFtcIkJPVEhcIl0gPSAyXSA9IFwiQk9USFwiO1xufSkoRGF0YUZsb3dCb3RoIHx8IChEYXRhRmxvd0JvdGggPSB7fSkpO1xuZXhwb3J0IGZ1bmN0aW9uIGRkc01hcChtYXBEb3duLCBtYXBVcCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6ICdtYXAnLFxuICAgICAgICBvcGVyYXRpb25UeXBlOiBPcGVyYXRpb25UeXBlLk1BUCxcbiAgICAgICAgb3BlcmF0aW9uRG93bjogKHYpID0+IG1hcERvd24odiksXG4gICAgICAgIG9wZXJhdGlvblVwOiAodikgPT4gbWFwVXAodilcbiAgICB9O1xufVxuLyoqXG4gKiBTdGFydHMgYSB0aW1lciB3aGVuIGFuIHVwZGF0ZSBvY2N1cnMsIGRlbGF5cyB0aGUgdXBkYXRlIHVudGlsIHRoZSB0aW1lciBwYXNzZWQgaWYgYSBuZXcgdXBkYXRlIGFycml2ZXMgdGhlIGluaXRpYWxcbiAqIHVwZGF0ZSBpcyBjYW5jZWxsZWQgYW5kIHRoZSBwcm9jZXNzIHN0YXJ0cyBhZ2FpblxuICovXG5leHBvcnQgZnVuY3Rpb24gZGRzRGVib3VuY2UodGltZSwgZGlyZWN0aW9uKSB7XG4gICAgY29uc3QgZGVib3VuY2VEb3duID0gZHNEZWJvdW5jZSh0aW1lKTtcbiAgICBjb25zdCBkZWJvdW5jZVVwID0gZHNEZWJvdW5jZSh0aW1lKTtcbiAgICByZXR1cm4ge1xuICAgICAgICBvcGVyYXRpb25UeXBlOiBPcGVyYXRpb25UeXBlLkRFTEFZX0ZJTFRFUixcbiAgICAgICAgbmFtZTogYGRlYm91bmNlICR7dGltZX1tc2AsXG4gICAgICAgIG9wZXJhdGlvbkRvd246ICh2KSA9PiB7XG4gICAgICAgICAgICBpZiAoZGlyZWN0aW9uID09PSB1bmRlZmluZWQgfHwgZGlyZWN0aW9uID09PSBEYXRhRmxvd0JvdGguRE9XTlNUUkVBTSB8fCBkaXJlY3Rpb24gPT09IERhdGFGbG93Qm90aC5CT1RIKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlYm91bmNlRG93bi5vcGVyYXRpb24odik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBvcGVyYXRpb25VcDogKHYpID0+IHtcbiAgICAgICAgICAgIGlmIChkaXJlY3Rpb24gPT09IHVuZGVmaW5lZCB8fCBkaXJlY3Rpb24gPT09IERhdGFGbG93Qm90aC5VUFNUUkVBTSB8fCBkaXJlY3Rpb24gPT09IERhdGFGbG93Qm90aC5CT1RIKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlYm91bmNlVXAub3BlcmF0aW9uKHYpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG59XG5leHBvcnQgZnVuY3Rpb24gZGRzT25lV2F5RmxvdyhkaXJlY3Rpb24pIHtcbiAgICBpZiAoZGlyZWN0aW9uID09PSBEYXRhRmxvdy5ET1dOU1RSRUFNKSB7XG4gICAgICAgIHJldHVybiBkZHNGaWx0ZXIoKCkgPT4gdHJ1ZSwgKCkgPT4gZmFsc2UpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGRkc0ZpbHRlcigoKSA9PiBmYWxzZSwgKCkgPT4gdHJ1ZSk7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGRkc0ZpbHRlcihwcmVkaWNhdGVEb3duLCBwcmVkaWNhdGVVcCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6ICdmaWx0ZXInLFxuICAgICAgICBvcGVyYXRpb25UeXBlOiBPcGVyYXRpb25UeXBlLkZJTFRFUixcbiAgICAgICAgb3BlcmF0aW9uRG93bjogKHYpID0+IHByZWRpY2F0ZURvd24odiksXG4gICAgICAgIG9wZXJhdGlvblVwOiAodikgPT4gcHJlZGljYXRlVXAodilcbiAgICB9O1xufVxuZXhwb3J0IGZ1bmN0aW9uIGRkc1VuaXF1ZShkaXJlY3Rpb24sIGlzRXF1YWwpIHtcbiAgICBsZXQgbGFzdERvd247XG4gICAgbGV0IGxhc3RVcDtcbiAgICBsZXQgcHJpbWVkVXAgPSBmYWxzZTtcbiAgICBsZXQgcHJpbWVkRG93biA9IGZhbHNlO1xuICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6ICdmaWx0ZXInLFxuICAgICAgICBvcGVyYXRpb25UeXBlOiBPcGVyYXRpb25UeXBlLkZJTFRFUixcbiAgICAgICAgb3BlcmF0aW9uRG93bjogKHYpID0+IHtcbiAgICAgICAgICAgIGlmIChkaXJlY3Rpb24gPT09IHVuZGVmaW5lZCB8fCBkaXJlY3Rpb24gPT09IERhdGFGbG93Qm90aC5ET1dOU1RSRUFNIHx8IGRpcmVjdGlvbiA9PT0gRGF0YUZsb3dCb3RoLkJPVEgpIHtcbiAgICAgICAgICAgICAgICBpZiAocHJpbWVkRG93biAmJiAoaXNFcXVhbCA/IGlzRXF1YWwobGFzdERvd24sIHYpIDogdiA9PT0gbGFzdERvd24pKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHByaW1lZERvd24gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBsYXN0RG93biA9IHY7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBvcGVyYXRpb25VcDogKHYpID0+IHtcbiAgICAgICAgICAgIGlmIChkaXJlY3Rpb24gPT09IHVuZGVmaW5lZCB8fCBkaXJlY3Rpb24gPT09IERhdGFGbG93Qm90aC5VUFNUUkVBTSB8fCBkaXJlY3Rpb24gPT09IERhdGFGbG93Qm90aC5CT1RIKSB7XG4gICAgICAgICAgICAgICAgaWYgKHByaW1lZFVwICYmIChpc0VxdWFsID8gaXNFcXVhbChsYXN0VXAsIHYpIDogdiA9PT0gbGFzdFVwKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsYXN0VXAgPSB2O1xuICAgICAgICAgICAgICAgICAgICBwcmltZWRVcCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWR1cGxleF9kYXRhX3NvdXJjZV9vcGVyYXRvcnMuanMubWFwIiwiaW1wb3J0IHsgRGF0YVNvdXJjZSwgQXJyYXlEYXRhU291cmNlIH0gZnJvbSAnLi9kYXRhX3NvdXJjZS5qcyc7XG5pbXBvcnQgeyBTdHJlYW0gfSBmcm9tICcuL3N0cmVhbS5qcyc7XG5pbXBvcnQgeyBEdXBsZXhEYXRhU291cmNlIH0gZnJvbSAnLi9kdXBsZXhfZGF0YV9zb3VyY2UuanMnO1xuaW1wb3J0IHsgQ2FuY2VsbGF0aW9uVG9rZW4sIHJlZ2lzdGVyQW5pbWF0aW9uTG9vcCB9IGZyb20gJy4uL3V0aWxpdGllcy9jYW5jZWxsYXRpb25fdG9rZW4uanMnO1xuaW1wb3J0IHsgZHNEZWJvdW5jZSwgZHNUYXAgfSBmcm9tICcuL2RhdGFfc291cmNlX29wZXJhdG9ycy5qcyc7XG4vKipcbiAqIENvbnZlbmllbmNlIGZ1bmN0aW9uIHRvIHVwZGF0ZSBhIHN0cmVhbSBhdCBmaXhlZCBpbnRlcnZhbHNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGludGVydmFsRW1pdHRlcih0YXJnZXQsIGludGVydmFsLCB2YWx1ZSwgY2FuY2VsbGF0aW9uVG9rZW4pIHtcbiAgICAoY2FuY2VsbGF0aW9uVG9rZW4gPz8gbmV3IENhbmNlbGxhdGlvblRva2VuKCkpLnNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgdXBkYXRlU291cmNlKHRhcmdldCwgdmFsdWUpO1xuICAgIH0sIGludGVydmFsKTtcbn1cbmZ1bmN0aW9uIHVwZGF0ZVNvdXJjZSh0YXJnZXQsIHZhbHVlKSB7XG4gICAgaWYgKHRhcmdldCBpbnN0YW5jZW9mIEFycmF5RGF0YVNvdXJjZSkge1xuICAgICAgICB0YXJnZXQucHVzaCh2YWx1ZSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHRhcmdldCBpbnN0YW5jZW9mIER1cGxleERhdGFTb3VyY2UpIHtcbiAgICAgICAgdGFyZ2V0LnVwZGF0ZURvd25zdHJlYW0odmFsdWUpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGFyZ2V0LnVwZGF0ZSh2YWx1ZSk7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIHVybEhhc2hFbWl0dGVyKHRhcmdldCwgc3RyaXBJbkhhc2hQYXJhbWV0ZXJzID0gZmFsc2UsIGNhbmNlbGxhdGlvblRva2VuKSB7XG4gICAgdXBkYXRlU291cmNlKHRhcmdldCwgc3RyaXBJbkhhc2hQYXJhbWV0ZXJzID8gZ2V0VXJsSGFzaCgpIDogbG9jYXRpb24uaGFzaCk7XG4gICAgKGNhbmNlbGxhdGlvblRva2VuID8/IG5ldyBDYW5jZWxsYXRpb25Ub2tlbigpKS5yZWdpc3RlckRvbUV2ZW50KHdpbmRvdywgJ2hhc2hjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICAgIHVwZGF0ZVNvdXJjZSh0YXJnZXQsIHN0cmlwSW5IYXNoUGFyYW1ldGVycyA/IGdldFVybEhhc2goKSA6IGxvY2F0aW9uLmhhc2gpO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gZ2V0VXJsSGFzaCgpIHtcbiAgICBjb25zdCBoYXNoID0gbG9jYXRpb24uaGFzaC5zdWJzdHJpbmcoMSk7XG4gICAgaWYgKGhhc2guaW5jbHVkZXMoJz8nKSkge1xuICAgICAgICByZXR1cm4gaGFzaC5zdWJzdHJpbmcoMCwgaGFzaC5pbmRleE9mKCc/JykpO1xuICAgIH1cbiAgICBlbHNlIGlmIChoYXNoLmluY2x1ZGVzKCcjJykpIHtcbiAgICAgICAgcmV0dXJuIGhhc2guc3Vic3RyaW5nKDAsIGhhc2guaW5kZXhPZignIycpKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBoYXNoO1xuICAgIH1cbn1cbi8qKlxuICogQ29udmVuaWVuY2UgZnVuY3Rpb24gdG8gc3RyZWFtIHRoZSB3aW5kb3cgc2l6ZSB0byBhIGRhdGEgc291cmNlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB3aW5kb3dTaXplRW1pdHRlcih0YXJnZXQsIGRlYm91bmNlID0gMTAwLCBjYW5jZWxsYXRpb25Ub2tlbikge1xuICAgIGNhbmNlbGxhdGlvblRva2VuID8/PSBuZXcgQ2FuY2VsbGF0aW9uVG9rZW4oKTtcbiAgICBjb25zdCB1cGRhdGVTdHJlYW0gPSBuZXcgRGF0YVNvdXJjZSgpO1xuICAgIGNhbmNlbGxhdGlvblRva2VuLnJlZ2lzdGVyRG9tRXZlbnQod2luZG93LCAncmVzaXplJywgKCkgPT4ge1xuICAgICAgICB1cGRhdGVTdHJlYW0udXBkYXRlKCk7XG4gICAgfSk7XG4gICAgdGFyZ2V0LmFzc2lnbih7XG4gICAgICAgIHdpZHRoOiB3aW5kb3cuaW5uZXJXaWR0aCxcbiAgICAgICAgaGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHRcbiAgICB9KTtcbiAgICB1cGRhdGVTdHJlYW0udHJhbnNmb3JtKGRzRGVib3VuY2UoZGVib3VuY2UpLCBkc1RhcCgoKSA9PiB0YXJnZXQuYXNzaWduKHtcbiAgICAgICAgd2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoLFxuICAgICAgICBoZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodFxuICAgIH0pKSk7XG59XG4vKipcbiAqIENhbGxzIHRoZSBjYWxsYmFjayBldmVyeSBhbmltYXRpb24gZnJhbWUgd2l0aCBhIG51bWJlciBmcm9tIDAgdG8gMSBpbmRpY2F0aW5nIGhvdyBmYXIgYWxvbmcgaW4gdGhlIGFuaW1hdGlvbiB0aW1lbGluZSBpdCBpcy5cbiAqXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhbmltYXRlKGNiLCB0aW1lLCBjYW5jZWxsYXRpb25Ub2tlbikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICBjb25zdCBhbmltYXRpb25Ub2tlbiA9IG5ldyBDYW5jZWxsYXRpb25Ub2tlbigpO1xuICAgICAgICBpZiAoY2FuY2VsbGF0aW9uVG9rZW4pIHtcbiAgICAgICAgICAgIGNhbmNlbGxhdGlvblRva2VuLmNoYWluKGFuaW1hdGlvblRva2VuKTtcbiAgICAgICAgfVxuICAgICAgICBhbmltYXRpb25Ub2tlbi5hZGRDYW5jZWxhYmxlKHJlc29sdmUpO1xuICAgICAgICBsZXQgc3RhcnQgPSBEYXRlLm5vdygpO1xuICAgICAgICByZWdpc3RlckFuaW1hdGlvbkxvb3AoKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcHJvZ3Jlc3MgPSBNYXRoLm1pbigxLCAoRGF0ZS5ub3coKSAtIHN0YXJ0KSAvIHRpbWUpO1xuICAgICAgICAgICAgY2IocHJvZ3Jlc3MpO1xuICAgICAgICAgICAgaWYgKHByb2dyZXNzID09PSAxKSB7XG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uVG9rZW4uY2FuY2VsKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIGFuaW1hdGlvblRva2VuKTtcbiAgICB9KTtcbn1cbi8qKlxuICogQ29udmVuaWVuY2UgZnVuY3Rpb24gdG8gc3RyZWFtIGFuaW1hdGUgdG8gYSBkYXRhc291cmNlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0d2VlbkVtaXR0ZXIodGFyZ2V0LCBkdXJhdGlvbiwgc3RhcnRWYWx1ZSwgZW5kVmFsdWUsIGludGVycG9sYXRpb24sIGNhbmNlbGxhdGlvblRva2VuKSB7XG4gICAgaWYgKHRhcmdldCBpbnN0YW5jZW9mIERhdGFTb3VyY2UgfHwgdGFyZ2V0IGluc3RhbmNlb2YgRHVwbGV4RGF0YVNvdXJjZSB8fCB0YXJnZXQgaW5zdGFuY2VvZiBTdHJlYW0pIHtcbiAgICAgICAgaWYgKHN0YXJ0VmFsdWUgPT09IGVuZFZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlcykgPT4gc2V0VGltZW91dChyZXMsIGR1cmF0aW9uKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGFuaW1hdGUoKHByb2dyZXNzKSA9PiB7XG4gICAgICAgIGlmIChpbnRlcnBvbGF0aW9uKSB7XG4gICAgICAgICAgICBwcm9ncmVzcyA9IGludGVycG9sYXRpb24ocHJvZ3Jlc3MpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHZhbHVlID0gc3RhcnRWYWx1ZSArIChlbmRWYWx1ZSAtIHN0YXJ0VmFsdWUpICogcHJvZ3Jlc3M7XG4gICAgICAgIGlmICh0YXJnZXQgaW5zdGFuY2VvZiBBcnJheURhdGFTb3VyY2UpIHtcbiAgICAgICAgICAgIHRhcmdldC5wdXNoKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0YXJnZXQgaW5zdGFuY2VvZiBEdXBsZXhEYXRhU291cmNlKSB7XG4gICAgICAgICAgICB0YXJnZXQudXBkYXRlRG93bnN0cmVhbSh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0YXJnZXQudXBkYXRlKHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH0sIGR1cmF0aW9uLCBjYW5jZWxsYXRpb25Ub2tlbik7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1lbWl0dGVycy5qcy5tYXAiLCJpbXBvcnQgeyBzeW5jT2JqZWN0RGF0YVNvdXJjZSB9IGZyb20gJy4uL2F1cnVtX3NlcnZlci9hdXJ1bV9zZXJ2ZXJfY2xpZW50LmpzJztcbmltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJy4uL3V0aWxpdGllcy9ldmVudF9lbWl0dGVyLmpzJztcbmltcG9ydCB7IEFycmF5RGF0YVNvdXJjZSwgRGF0YVNvdXJjZSB9IGZyb20gJy4vZGF0YV9zb3VyY2UuanMnO1xuaW1wb3J0IHsgRHVwbGV4RGF0YVNvdXJjZSB9IGZyb20gJy4vZHVwbGV4X2RhdGFfc291cmNlLmpzJztcbmV4cG9ydCBjbGFzcyBPYmplY3REYXRhU291cmNlIHtcbiAgICBkYXRhO1xuICAgIHVwZGF0ZUV2ZW50O1xuICAgIHVwZGF0ZUV2ZW50T25LZXk7XG4gICAgY29uc3RydWN0b3IoaW5pdGlhbERhdGEpIHtcbiAgICAgICAgdGhpcy5kYXRhID0gaW5pdGlhbERhdGE7XG4gICAgICAgIHRoaXMudXBkYXRlRXZlbnQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIHRoaXMudXBkYXRlRXZlbnRPbktleSA9IG5ldyBNYXAoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ29ubmVjdHMgdG8gYW4gYXVydW0tc2VydmVyIGV4cG9zZWQgb2JqZWN0IGRhdGFzb3VyY2UuIFZpZXcgaHR0cHM6Ly9naXRodWIuY29tL0N5YmVyUGhvZW5peDkwL2F1cnVtLXNlcnZlciBmb3IgbW9yZSBpbmZvcm1hdGlvblxuICAgICAqIE5vdGUgdGhhdCB0eXBlIHNhZmV0eSBpcyBub3QgZ3VhcmFudGVlZC4gV2hhdGV2ZXIgdGhlIHNlcnZlciBzZW5kcyBhcyBhbiB1cGRhdGUgd2lsbCBiZSBwcm9wYWdhdGVkLiBNYWtlIHN1cmUgeW91IHRydXN0IHRoZSBzZXJ2ZXJcbiAgICAgKiBAcGFyYW0gIHtBdXJ1bVNlcnZlckluZm99IGF1cnVtU2VydmVySW5mb1xuICAgICAqIEByZXR1cm5zIERhdGFTb3VyY2VcbiAgICAgKi9cbiAgICBzdGF0aWMgZnJvbVJlbW90ZVNvdXJjZShhdXJ1bVNlcnZlckluZm8sIGNhbmNlbGxhdGlvbikge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBuZXcgT2JqZWN0RGF0YVNvdXJjZSh1bmRlZmluZWQpO1xuICAgICAgICBzeW5jT2JqZWN0RGF0YVNvdXJjZShyZXN1bHQsIGF1cnVtU2VydmVySW5mbywgY2FuY2VsbGF0aW9uKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgc3RhdGljIHRvT2JqZWN0RGF0YVNvdXJjZSh2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBPYmplY3REYXRhU291cmNlKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IE9iamVjdERhdGFTb3VyY2UodmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHRvU3RyaW5nKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlbW92ZSBhbGwgbGlzdGVuZXJzXG4gICAgICovXG4gICAgY2FuY2VsQWxsKCkge1xuICAgICAgICB0aGlzLnVwZGF0ZUV2ZW50LmNhbmNlbEFsbCgpO1xuICAgICAgICB0aGlzLnVwZGF0ZUV2ZW50T25LZXkuZm9yRWFjaCgodikgPT4gdi5jYW5jZWxBbGwoKSk7XG4gICAgfVxuICAgIHBpY2tPYmplY3Qoa2V5LCBjYW5jZWxsYXRpb25Ub2tlbikge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMuZGF0YVtrZXldID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgY29uc3Qgc3ViRGF0YVNvdXJjZSA9IG5ldyBPYmplY3REYXRhU291cmNlKHRoaXMuZGF0YVtrZXldKTtcbiAgICAgICAgICAgIHN1YkRhdGFTb3VyY2UubGlzdGVuKChjaGFuZ2UpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoY2hhbmdlLmRlbGV0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuZGF0YVtrZXldW2NoYW5nZS5rZXldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXQoa2V5KVtjaGFuZ2Uua2V5XSA9IGNoYW5nZS5uZXdWYWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBjYW5jZWxsYXRpb25Ub2tlbik7XG4gICAgICAgICAgICB0aGlzLmxpc3Rlbk9uS2V5KGtleSwgKHYpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHYubmV3VmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2Lm5ld1ZhbHVlICE9PSBzdWJEYXRhU291cmNlLmRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YkRhdGFTb3VyY2UubWVyZ2Uodi5uZXdWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHN1YkRhdGFTb3VyY2UuY2xlYXIoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBzdWJEYXRhU291cmNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgcGljayBhIG5vbiBvYmplY3Qga2V5Jyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcGlja0FycmF5KGtleSwgY2FuY2VsbGF0aW9uVG9rZW4pIHtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5kYXRhW2tleV0pKSB7XG4gICAgICAgICAgICBjb25zdCBzdWJEYXRhU291cmNlID0gbmV3IEFycmF5RGF0YVNvdXJjZSh0aGlzLmRhdGE/LltrZXldKTtcbiAgICAgICAgICAgIHN1YkRhdGFTb3VyY2UubGlzdGVuKChjaGFuZ2UpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldChrZXksIGNoYW5nZS5uZXdTdGF0ZSk7XG4gICAgICAgICAgICB9LCBjYW5jZWxsYXRpb25Ub2tlbik7XG4gICAgICAgICAgICB0aGlzLmxpc3Rlbk9uS2V5KGtleSwgKHYpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2Lm5ld1ZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodi5uZXdWYWx1ZS5sZW5ndGggIT09IHN1YkRhdGFTb3VyY2UubGVuZ3RoLnZhbHVlIHx8ICFzdWJEYXRhU291cmNlLmdldERhdGEoKS5ldmVyeSgoaXRlbSwgaW5kZXgpID0+IHYubmV3VmFsdWVbaW5kZXhdID09PSBpdGVtKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3ViRGF0YVNvdXJjZS5tZXJnZSh2Lm5ld1ZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc3ViRGF0YVNvdXJjZS5jbGVhcigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHN1YkRhdGFTb3VyY2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBwaWNrIGEgbm9uIGFycmF5IGtleScpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBkYXRhc291cmNlIGZvciBhIHNpbmdsZSBrZXkgb2YgdGhlIG9iamVjdFxuICAgICAqIEBwYXJhbSBrZXlcbiAgICAgKiBAcGFyYW0gY2FuY2VsbGF0aW9uVG9rZW5cbiAgICAgKi9cbiAgICBwaWNrKGtleSwgY2FuY2VsbGF0aW9uVG9rZW4pIHtcbiAgICAgICAgY29uc3Qgc3ViRGF0YVNvdXJjZSA9IG5ldyBEYXRhU291cmNlKHRoaXMuZGF0YT8uW2tleV0pO1xuICAgICAgICBzdWJEYXRhU291cmNlLmxpc3RlbigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldChrZXksIHN1YkRhdGFTb3VyY2UudmFsdWUpO1xuICAgICAgICB9LCBjYW5jZWxsYXRpb25Ub2tlbik7XG4gICAgICAgIHRoaXMubGlzdGVuT25LZXkoa2V5LCAodikgPT4ge1xuICAgICAgICAgICAgaWYgKHN1YkRhdGFTb3VyY2UudmFsdWUgIT09IHYubmV3VmFsdWUpIHtcbiAgICAgICAgICAgICAgICBzdWJEYXRhU291cmNlLnVwZGF0ZSh2Lm5ld1ZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgY2FuY2VsbGF0aW9uVG9rZW4pO1xuICAgICAgICByZXR1cm4gc3ViRGF0YVNvdXJjZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIGR1cGxleGRhdGFzb3VyY2UgZm9yIGEgc2luZ2xlIGtleSBvZiB0aGUgb2JqZWN0XG4gICAgICogQHBhcmFtIGtleVxuICAgICAqIEBwYXJhbSBjYW5jZWxsYXRpb25Ub2tlblxuICAgICAqL1xuICAgIHBpY2tEdXBsZXgoa2V5LCBjYW5jZWxsYXRpb25Ub2tlbikge1xuICAgICAgICBjb25zdCBzdWJEYXRhU291cmNlID0gbmV3IER1cGxleERhdGFTb3VyY2UodGhpcy5kYXRhPy5ba2V5XSk7XG4gICAgICAgIHN1YkRhdGFTb3VyY2UubGlzdGVuVXBzdHJlYW0oKHYpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2V0KGtleSwgdik7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmxpc3Rlbk9uS2V5KGtleSwgKHYpID0+IHtcbiAgICAgICAgICAgIGlmIChzdWJEYXRhU291cmNlLnZhbHVlICE9PSB2Lm5ld1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgc3ViRGF0YVNvdXJjZS51cGRhdGVEb3duc3RyZWFtKHYubmV3VmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBjYW5jZWxsYXRpb25Ub2tlbik7XG4gICAgICAgIHJldHVybiBzdWJEYXRhU291cmNlO1xuICAgIH1cbiAgICBoYXNLZXkoa2V5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuaGFzT3duUHJvcGVydHkoa2V5KTtcbiAgICB9XG4gICAgYXBwbHlPYmplY3RDaGFuZ2UoY2hhbmdlKSB7XG4gICAgICAgIGlmIChjaGFuZ2UuZGVsZXRlZCAmJiB0aGlzLmhhc0tleShjaGFuZ2Uua2V5KSkge1xuICAgICAgICAgICAgdGhpcy5kZWxldGUoY2hhbmdlLmtleSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY2hhbmdlLm5ld1ZhbHVlICE9PSB0aGlzLmdldChjaGFuZ2Uua2V5KSkge1xuICAgICAgICAgICAgdGhpcy5zZXQoY2hhbmdlLmtleSwgY2hhbmdlLm5ld1ZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBMaXN0ZW4gdG8gY2hhbmdlcyBvZiB0aGUgb2JqZWN0XG4gICAgICovXG4gICAgbGlzdGVuKGNhbGxiYWNrLCBjYW5jZWxsYXRpb25Ub2tlbikge1xuICAgICAgICByZXR1cm4gdGhpcy51cGRhdGVFdmVudC5zdWJzY3JpYmUoY2FsbGJhY2ssIGNhbmNlbGxhdGlvblRva2VuKS5jYW5jZWw7XG4gICAgfVxuICAgIG1hcChtYXBwZXIpIHtcbiAgICAgICAgY29uc3Qgc3RhdGVNYXAgPSBuZXcgTWFwKCk7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBBcnJheURhdGFTb3VyY2UoKTtcbiAgICAgICAgdGhpcy5saXN0ZW5BbmRSZXBlYXQoKGNoYW5nZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGNoYW5nZS5kZWxldGVkICYmIHN0YXRlTWFwLmhhcyhjaGFuZ2Uua2V5KSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBzdGF0ZU1hcC5nZXQoY2hhbmdlLmtleSk7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnJlbW92ZShpdGVtKTtcbiAgICAgICAgICAgICAgICBzdGF0ZU1hcC5kZWxldGUoY2hhbmdlLmtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChzdGF0ZU1hcC5oYXMoY2hhbmdlLmtleSkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdJdGVtID0gbWFwcGVyKGNoYW5nZS5rZXksIGNoYW5nZS5uZXdWYWx1ZSk7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnJlcGxhY2Uoc3RhdGVNYXAuZ2V0KGNoYW5nZS5rZXkpLCBuZXdJdGVtKTtcbiAgICAgICAgICAgICAgICBzdGF0ZU1hcC5zZXQoY2hhbmdlLmtleSwgbmV3SXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICghc3RhdGVNYXAuaGFzKGNoYW5nZS5rZXkpICYmICFjaGFuZ2UuZGVsZXRlZCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld0l0ZW0gPSBtYXBwZXIoY2hhbmdlLmtleSwgY2hhbmdlLm5ld1ZhbHVlKTtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChuZXdJdGVtKTtcbiAgICAgICAgICAgICAgICBzdGF0ZU1hcC5zZXQoY2hhbmdlLmtleSwgbmV3SXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTYW1lIGFzIGxpc3RlbiBidXQgd2lsbCBpbW1lZGlhdGVseSBjYWxsIHRoZSBjYWxsYmFjayB3aXRoIHRoZSBjdXJyZW50IHZhbHVlIG9mIGVhY2gga2V5XG4gICAgICovXG4gICAgbGlzdGVuQW5kUmVwZWF0KGNhbGxiYWNrLCBjYW5jZWxsYXRpb25Ub2tlbikge1xuICAgICAgICBjb25zdCBjID0gdGhpcy51cGRhdGVFdmVudC5zdWJzY3JpYmUoY2FsbGJhY2ssIGNhbmNlbGxhdGlvblRva2VuKS5jYW5jZWw7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuZGF0YSkge1xuICAgICAgICAgICAgY2FsbGJhY2soe1xuICAgICAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgICAgICBuZXdWYWx1ZTogdGhpcy5kYXRhW2tleV0sXG4gICAgICAgICAgICAgICAgb2xkVmFsdWU6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBkZWxldGVkOiBmYWxzZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNhbWUgYXMgbGlzdGVuT25LZXkgYnV0IHdpbGwgaW1tZWRpYXRlbHkgY2FsbCB0aGUgY2FsbGJhY2sgd2l0aCB0aGUgY3VycmVudCB2YWx1ZSBmaXJzdFxuICAgICAqL1xuICAgIGxpc3Rlbk9uS2V5QW5kUmVwZWF0KGtleSwgY2FsbGJhY2ssIGNhbmNlbGxhdGlvblRva2VuKSB7XG4gICAgICAgIGNhbGxiYWNrKHtcbiAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgIG5ld1ZhbHVlOiB0aGlzLmRhdGFba2V5XSxcbiAgICAgICAgICAgIG9sZFZhbHVlOiB1bmRlZmluZWRcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzLmxpc3Rlbk9uS2V5KGtleSwgY2FsbGJhY2ssIGNhbmNlbGxhdGlvblRva2VuKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTGlzdGVuIHRvIGNoYW5nZXMgb2YgYSBzaW5nbGUga2V5IG9mIHRoZSBvYmplY3RcbiAgICAgKi9cbiAgICBsaXN0ZW5PbktleShrZXksIGNhbGxiYWNrLCBjYW5jZWxsYXRpb25Ub2tlbikge1xuICAgICAgICBpZiAoIXRoaXMudXBkYXRlRXZlbnRPbktleS5oYXMoa2V5KSkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVFdmVudE9uS2V5LnNldChrZXksIG5ldyBFdmVudEVtaXR0ZXIoKSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZXZlbnQgPSB0aGlzLnVwZGF0ZUV2ZW50T25LZXkuZ2V0KGtleSk7XG4gICAgICAgIHJldHVybiBldmVudC5zdWJzY3JpYmUoY2FsbGJhY2ssIGNhbmNlbGxhdGlvblRva2VuKS5jYW5jZWw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYWxsIHRoZSBrZXlzIG9mIHRoZSBvYmplY3QgaW4gdGhlIHNvdXJjZVxuICAgICAqL1xuICAgIGtleXMoKSB7XG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLmRhdGEpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFsbCB0aGUgdmFsdWVzIG9mIHRoZSBvYmplY3QgaW4gdGhlIHNvdXJjZVxuICAgICAqL1xuICAgIHZhbHVlcygpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC52YWx1ZXModGhpcy5kYXRhKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogZ2V0IHRoZSBjdXJyZW50IHZhbHVlIG9mIGEga2V5IG9mIHRoZSBvYmplY3RcbiAgICAgKiBAcGFyYW0ga2V5XG4gICAgICovXG4gICAgZ2V0KGtleSkge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRhW2tleV07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIGRlbGV0ZSBhIGtleSBmcm9tIHRoZSBvYmplY3RcbiAgICAgKiBAcGFyYW0ga2V5XG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICovXG4gICAgZGVsZXRlKGtleSkge1xuICAgICAgICBpZiAodGhpcy5oYXNLZXkoa2V5KSkge1xuICAgICAgICAgICAgY29uc3Qgb2xkID0gdGhpcy5kYXRhW2tleV07XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5kYXRhW2tleV07XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUV2ZW50LmZpcmUoeyBvbGRWYWx1ZTogb2xkLCBrZXksIG5ld1ZhbHVlOiB1bmRlZmluZWQsIGRlbGV0ZWQ6IHRydWUgfSk7XG4gICAgICAgICAgICBpZiAodGhpcy51cGRhdGVFdmVudE9uS2V5LmhhcyhrZXkpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVFdmVudE9uS2V5LmdldChrZXkpLmZpcmUoeyBvbGRWYWx1ZTogb2xkLCBrZXksIG5ld1ZhbHVlOiB1bmRlZmluZWQgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogc2V0IHRoZSB2YWx1ZSBmb3IgYSBrZXkgb2YgdGhlIG9iamVjdFxuICAgICAqIEBwYXJhbSBrZXlcbiAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgKi9cbiAgICBzZXQoa2V5LCB2YWx1ZSkge1xuICAgICAgICBpZiAodGhpcy5kYXRhW2tleV0gPT09IHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgb2xkID0gdGhpcy5kYXRhW2tleV07XG4gICAgICAgIHRoaXMuZGF0YVtrZXldID0gdmFsdWU7XG4gICAgICAgIHRoaXMudXBkYXRlRXZlbnQuZmlyZSh7IG9sZFZhbHVlOiBvbGQsIGtleSwgbmV3VmFsdWU6IHRoaXMuZGF0YVtrZXldIH0pO1xuICAgICAgICBpZiAodGhpcy51cGRhdGVFdmVudE9uS2V5LmhhcyhrZXkpKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUV2ZW50T25LZXkuZ2V0KGtleSkuZmlyZSh7IG9sZFZhbHVlOiBvbGQsIGtleSwgbmV3VmFsdWU6IHRoaXMuZGF0YVtrZXldIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1lcmdlIHRoZSBrZXkgdmFsdWUgcGFpcnMgb2YgYW4gb2JqZWN0IGludG8gdGhpcyBvYmplY3Qgbm9uIHJlY3Vyc2l2ZWx5XG4gICAgICogQHBhcmFtIG5ld0RhdGFcbiAgICAgKi9cbiAgICBhc3NpZ24obmV3RGF0YSkge1xuICAgICAgICBpZiAobmV3RGF0YSBpbnN0YW5jZW9mIE9iamVjdERhdGFTb3VyY2UpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IG9mIG5ld0RhdGEua2V5cygpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXQoa2V5LCBuZXdEYXRhLmRhdGFba2V5XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhuZXdEYXRhKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0KGtleSwgbmV3RGF0YVtrZXldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBNZXJnZSB0aGUga2V5IHZhbHVlIHBhaXJzIG9mIGFuIG9iamVjdCBpbnRvIHRoaXMgb2JqZWN0IG5vbiByZWN1cnNpdmVseSBhbmQgZGVsZXRlIHByb3BlcnRpZXMgdGhhdCBkbyBub3QgZXhpc3QgaW4gdGhlIG5ld0RhdGFcbiAgICAgKiBAcGFyYW0gbmV3RGF0YVxuICAgICAqL1xuICAgIG1lcmdlKG5ld0RhdGEpIHtcbiAgICAgICAgY29uc3Qga2V5cyA9IG5ldyBTZXQoT2JqZWN0LmtleXModGhpcy5kYXRhID8/IHt9KSk7XG4gICAgICAgIGlmIChuZXdEYXRhIGluc3RhbmNlb2YgT2JqZWN0RGF0YVNvdXJjZSkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgbmV3RGF0YS5rZXlzKCkpIHtcbiAgICAgICAgICAgICAgICBrZXlzLmRlbGV0ZShrZXkpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0KGtleSwgbmV3RGF0YS5kYXRhW2tleV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMobmV3RGF0YSkpIHtcbiAgICAgICAgICAgICAgICBrZXlzLmRlbGV0ZShrZXkpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0KGtleSwgbmV3RGF0YVtrZXldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBrZXlzKSB7XG4gICAgICAgICAgICB0aGlzLmRlbGV0ZShrZXkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERlbGV0ZXMgYWxsIGtleXNcbiAgICAgKi9cbiAgICBjbGVhcigpIHtcbiAgICAgICAgaWYgKHRoaXMuZGF0YSA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLmRhdGEpIHtcbiAgICAgICAgICAgIHRoaXMuZGVsZXRlKGtleSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0RGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIHNoYWxsb3cgY29weSBvZiB0aGUgb2JqZWN0XG4gICAgICovXG4gICAgdG9PYmplY3QoKSB7XG4gICAgICAgIHJldHVybiB7IC4uLnRoaXMuZGF0YSB9O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgc2ltcGxpZmllZCB2ZXJzaW9uIG9mIHRoaXMgZGF0YXNvdXJjZVxuICAgICAqL1xuICAgIHRvRGF0YVNvdXJjZSgpIHtcbiAgICAgICAgY29uc3Qgc3RyZWFtID0gbmV3IERhdGFTb3VyY2UodGhpcy5kYXRhKTtcbiAgICAgICAgdGhpcy5saXN0ZW4oKHMpID0+IHtcbiAgICAgICAgICAgIHN0cmVhbS51cGRhdGUodGhpcy5kYXRhKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBzdHJlYW07XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9b2JqZWN0X2RhdGFfc291cmNlLmpzLm1hcCIsImV4cG9ydCB2YXIgT3BlcmF0aW9uVHlwZTtcbihmdW5jdGlvbiAoT3BlcmF0aW9uVHlwZSkge1xuICAgIE9wZXJhdGlvblR5cGVbT3BlcmF0aW9uVHlwZVtcIkZJTFRFUlwiXSA9IDBdID0gXCJGSUxURVJcIjtcbiAgICBPcGVyYXRpb25UeXBlW09wZXJhdGlvblR5cGVbXCJOT09QXCJdID0gMV0gPSBcIk5PT1BcIjtcbiAgICBPcGVyYXRpb25UeXBlW09wZXJhdGlvblR5cGVbXCJNQVBcIl0gPSAyXSA9IFwiTUFQXCI7XG4gICAgT3BlcmF0aW9uVHlwZVtPcGVyYXRpb25UeXBlW1wiREVMQVlcIl0gPSAzXSA9IFwiREVMQVlcIjtcbiAgICBPcGVyYXRpb25UeXBlW09wZXJhdGlvblR5cGVbXCJNQVBfREVMQVlcIl0gPSA0XSA9IFwiTUFQX0RFTEFZXCI7XG4gICAgT3BlcmF0aW9uVHlwZVtPcGVyYXRpb25UeXBlW1wiREVMQVlfRklMVEVSXCJdID0gNV0gPSBcIkRFTEFZX0ZJTFRFUlwiO1xuICAgIE9wZXJhdGlvblR5cGVbT3BlcmF0aW9uVHlwZVtcIk1BUF9ERUxBWV9GSUxURVJcIl0gPSA2XSA9IFwiTUFQX0RFTEFZX0ZJTFRFUlwiO1xufSkoT3BlcmF0aW9uVHlwZSB8fCAoT3BlcmF0aW9uVHlwZSA9IHt9KSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1vcGVyYXRvcl9tb2RlbC5qcy5tYXAiLCJpbXBvcnQgeyBDYW5jZWxsYXRpb25Ub2tlbiB9IGZyb20gJy4uL3V0aWxpdGllcy9jYW5jZWxsYXRpb25fdG9rZW4uanMnO1xuaW1wb3J0IHsgRGF0YVNvdXJjZSwgcHJvY2Vzc1RyYW5zZm9ybSB9IGZyb20gJy4vZGF0YV9zb3VyY2UuanMnO1xuLyoqXG4gKiBMZXRzIHlvdSBsb2dpY2FsbHkgY29tYmluZSAyIGRhdGEgc291cmNlcyBzbyB0aGF0IHVwZGF0ZSBjYWxscyBnbyB0aHJvdWdoIHRoZSBpbnB1dCBzb3VyY2UgYW5kIGxpc3RlbiBnb2VzIHRvIHRoZSBvdXRwdXQgc291cmNlXG4gKi9cbmV4cG9ydCBjbGFzcyBTdHJlYW0ge1xuICAgIGlucHV0O1xuICAgIG91dHB1dDtcbiAgICBnZXQgbmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIGBJTjoke3RoaXMuaW5wdXQubmFtZX0gT1VUOiR7dGhpcy5vdXRwdXQubmFtZX1gO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgY3VycmVudCB2YWx1ZSBvZiB0aGlzIGRhdGEgc291cmNlLCBjYW4gYmUgY2hhbmdlZCB0aHJvdWdoIHVwZGF0ZVxuICAgICAqL1xuICAgIGdldCB2YWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3V0cHV0LnZhbHVlO1xuICAgIH1cbiAgICBjb25zdHJ1Y3RvcigpIHsgfVxuICAgIHN0YXRpYyBmcm9tRnVuY3Rpb24oZnVuYykge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBuZXcgU3RyZWFtKCk7XG4gICAgICAgIHJlc3VsdC5pbnB1dCA9IG5ldyBEYXRhU291cmNlKCk7XG4gICAgICAgIHJlc3VsdC5vdXRwdXQgPSBuZXcgRGF0YVNvdXJjZSgpO1xuICAgICAgICByZXN1bHQuaW5wdXQubGlzdGVuKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgcmVzdWx0Lm91dHB1dC51cGRhdGUoZnVuYyh2YWx1ZSkpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgc3RhdGljIGZyb21GZXRjaFJhdyh1cmwpIHtcbiAgICAgICAgY29uc3QgaW5wdXQgPSBuZXcgRGF0YVNvdXJjZSgpO1xuICAgICAgICBjb25zdCBvdXRwdXQgPSBuZXcgRGF0YVNvdXJjZSgpO1xuICAgICAgICBpbnB1dC5saXN0ZW4oKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICBvdXRwdXQudXBkYXRlKGZldGNoKHVybCwgdmFsdWUpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBTdHJlYW0uZnJvbVByZWNvbm5lY3RlZFNvdXJjZXMoaW5wdXQsIG91dHB1dCk7XG4gICAgfVxuICAgIHN0YXRpYyBmcm9tUHJlY29ubmVjdGVkU291cmNlcyhpbnB1dFNvdXJjZSwgb3V0cHV0U291cmNlKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBTdHJlYW0oKTtcbiAgICAgICAgcmVzdWx0LmlucHV0ID0gaW5wdXRTb3VyY2UgPz8gbmV3IERhdGFTb3VyY2UoKTtcbiAgICAgICAgcmVzdWx0Lm91dHB1dCA9IG91dHB1dFNvdXJjZSA/PyByZXN1bHQuaW5wdXQ7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIGFnZ3JlZ2F0ZShvdGhlclNvdXJjZXMsIGNvbWJpbmF0b3IsIGNhbmNlbGxhdGlvblRva2VuKSB7XG4gICAgICAgIGNhbmNlbGxhdGlvblRva2VuID0gY2FuY2VsbGF0aW9uVG9rZW4gPz8gbmV3IENhbmNlbGxhdGlvblRva2VuKCk7XG4gICAgICAgIGNvbnN0IGFnZ3JlZ2F0ZWRTb3VyY2UgPSBuZXcgRGF0YVNvdXJjZShjb21iaW5hdG9yKHRoaXMudmFsdWUsIC4uLm90aGVyU291cmNlcy5tYXAoKHMpID0+IHMudmFsdWUpKSk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3RoZXJTb3VyY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBvdGhlclNvdXJjZXNbaV0ubGlzdGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBhZ2dyZWdhdGVkU291cmNlLnVwZGF0ZShjb21iaW5hdG9yKHRoaXMudmFsdWUsIC4uLm90aGVyU291cmNlcy5tYXAoKHMpID0+IHMudmFsdWUpKSk7XG4gICAgICAgICAgICB9LCBjYW5jZWxsYXRpb25Ub2tlbik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5saXN0ZW4oKCkgPT4gYWdncmVnYXRlZFNvdXJjZS51cGRhdGUoY29tYmluYXRvcih0aGlzLnZhbHVlLCAuLi5vdGhlclNvdXJjZXMubWFwKChzKSA9PiBzLnZhbHVlKSkpLCBjYW5jZWxsYXRpb25Ub2tlbik7XG4gICAgICAgIHJldHVybiBhZ2dyZWdhdGVkU291cmNlO1xuICAgIH1cbiAgICBzdGF0aWMgZnJvbVN0cmVhbVRyYW5zZm9ybWF0aW9uKG9wZXJhdGlvbkEsIG9wZXJhdGlvbkIsIG9wZXJhdGlvbkMsIG9wZXJhdGlvbkQsIG9wZXJhdGlvbkUsIG9wZXJhdGlvbkYsIG9wZXJhdGlvbkcsIG9wZXJhdGlvbkgsIG9wZXJhdGlvbkksIG9wZXJhdGlvbkopIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gbmV3IFN0cmVhbSgpO1xuICAgICAgICByZXN1bHQuaW5wdXQgPSBuZXcgRGF0YVNvdXJjZSgpO1xuICAgICAgICByZXN1bHQub3V0cHV0ID0gcmVzdWx0LmlucHV0LnRyYW5zZm9ybShvcGVyYXRpb25BLCBvcGVyYXRpb25CLCBvcGVyYXRpb25DLCBvcGVyYXRpb25ELCBvcGVyYXRpb25FLCBvcGVyYXRpb25GLCBvcGVyYXRpb25HLCBvcGVyYXRpb25ILCBvcGVyYXRpb25JLCBvcGVyYXRpb25KKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgc3RhdGljIGZyb21GZXRjaFBvc3RKc29uKHVybCwgYmFzZVJlcXVlc3REYXRhKSB7XG4gICAgICAgIGNvbnN0IGlucHV0ID0gbmV3IERhdGFTb3VyY2UoKTtcbiAgICAgICAgY29uc3Qgb3V0cHV0ID0gbmV3IERhdGFTb3VyY2UoKTtcbiAgICAgICAgaW5wdXQubGlzdGVuKGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgb3V0cHV0LnVwZGF0ZShhd2FpdCBmZXRjaCh1cmwsIE9iamVjdC5hc3NpZ24oe1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIGJhc2VSZXF1ZXN0RGF0YSwge1xuICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHZhbHVlKVxuICAgICAgICAgICAgfSkpLnRoZW4oKHMpID0+IHMuanNvbigpKSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gU3RyZWFtLmZyb21QcmVjb25uZWN0ZWRTb3VyY2VzKGlucHV0LCBvdXRwdXQpO1xuICAgIH1cbiAgICBzdGF0aWMgZnJvbUZldGNoR2V0SnNvbih1cmwsIGJhc2VSZXF1ZXN0RGF0YSkge1xuICAgICAgICBjb25zdCBpbnB1dCA9IG5ldyBEYXRhU291cmNlKCk7XG4gICAgICAgIGNvbnN0IG91dHB1dCA9IG5ldyBEYXRhU291cmNlKCk7XG4gICAgICAgIGlucHV0Lmxpc3Rlbihhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBvdXRwdXQudXBkYXRlKGF3YWl0IGZldGNoKHVybCkudGhlbigocykgPT4gcy5qc29uKCkpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBTdHJlYW0uZnJvbVByZWNvbm5lY3RlZFNvdXJjZXMoaW5wdXQsIG91dHB1dCk7XG4gICAgfVxuICAgIHVwZGF0ZShkYXRhKSB7XG4gICAgICAgIHRoaXMuaW5wdXQudXBkYXRlKGRhdGEpO1xuICAgIH1cbiAgICB0cmFuc2Zvcm0ob3BlcmF0aW9uQSwgb3BlcmF0aW9uQiwgb3BlcmF0aW9uQywgb3BlcmF0aW9uRCwgb3BlcmF0aW9uRSwgb3BlcmF0aW9uRiwgb3BlcmF0aW9uRywgb3BlcmF0aW9uSCwgb3BlcmF0aW9uSSwgb3BlcmF0aW9uSiwgb3BlcmF0aW9uSywgY2FuY2VsbGF0aW9uVG9rZW4pIHtcbiAgICAgICAgbGV0IHRva2VuO1xuICAgICAgICBjb25zdCBvcGVyYXRpb25zID0gW1xuICAgICAgICAgICAgb3BlcmF0aW9uQSxcbiAgICAgICAgICAgIG9wZXJhdGlvbkIsXG4gICAgICAgICAgICBvcGVyYXRpb25DLFxuICAgICAgICAgICAgb3BlcmF0aW9uRCxcbiAgICAgICAgICAgIG9wZXJhdGlvbkUsXG4gICAgICAgICAgICBvcGVyYXRpb25GLFxuICAgICAgICAgICAgb3BlcmF0aW9uRyxcbiAgICAgICAgICAgIG9wZXJhdGlvbkgsXG4gICAgICAgICAgICBvcGVyYXRpb25JLFxuICAgICAgICAgICAgb3BlcmF0aW9uSixcbiAgICAgICAgICAgIG9wZXJhdGlvbktcbiAgICAgICAgXS5maWx0ZXIoKGUpID0+IGUgJiYgKGUgaW5zdGFuY2VvZiBDYW5jZWxsYXRpb25Ub2tlbiA/ICgodG9rZW4gPSBlKSwgZmFsc2UpIDogdHJ1ZSkpO1xuICAgICAgICBpZiAoY2FuY2VsbGF0aW9uVG9rZW4pIHtcbiAgICAgICAgICAgIHRva2VuID0gY2FuY2VsbGF0aW9uVG9rZW47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmVzdWx0ID0gbmV3IERhdGFTb3VyY2UodW5kZWZpbmVkLCB0aGlzLm91dHB1dC5uYW1lICsgJyAnICsgb3BlcmF0aW9ucy5tYXAoKHYpID0+IHYubmFtZSkuam9pbignICcpKTtcbiAgICAgICAgdGhpcy5saXN0ZW4ocHJvY2Vzc1RyYW5zZm9ybShvcGVyYXRpb25zLCByZXN1bHQpLCB0b2tlbik7XG4gICAgICAgIHJldHVybiBTdHJlYW0uZnJvbVByZWNvbm5lY3RlZFNvdXJjZXModGhpcy5pbnB1dCwgcmVzdWx0KTtcbiAgICB9XG4gICAgZ2V0SW5wdXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlucHV0O1xuICAgIH1cbiAgICBnZXRPdXRwdXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm91dHB1dDtcbiAgICB9XG4gICAgbGlzdGVuKGNhbGxiYWNrLCBjYW5jZWxsYXRpb25Ub2tlbikge1xuICAgICAgICByZXR1cm4gdGhpcy5vdXRwdXQubGlzdGVuKGNhbGxiYWNrLCBjYW5jZWxsYXRpb25Ub2tlbik7XG4gICAgfVxuICAgIGxpc3RlbkFuZFJlcGVhdChjYWxsYmFjaywgY2FuY2VsbGF0aW9uVG9rZW4pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3V0cHV0Lmxpc3RlbkFuZFJlcGVhdChjYWxsYmFjaywgY2FuY2VsbGF0aW9uVG9rZW4pO1xuICAgIH1cbiAgICBsaXN0ZW5PbmNlKGNhbGxiYWNrLCBjYW5jZWxsYXRpb25Ub2tlbikge1xuICAgICAgICByZXR1cm4gdGhpcy5vdXRwdXQubGlzdGVuT25jZShjYWxsYmFjaywgY2FuY2VsbGF0aW9uVG9rZW4pO1xuICAgIH1cbiAgICBhd2FpdE5leHRVcGRhdGUoY2FuY2VsbGF0aW9uVG9rZW4pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3V0cHV0LmF3YWl0TmV4dFVwZGF0ZShjYW5jZWxsYXRpb25Ub2tlbik7XG4gICAgfVxuICAgIGNhbmNlbEFsbCgpIHtcbiAgICAgICAgdGhpcy5pbnB1dC5jYW5jZWxBbGwoKTtcbiAgICAgICAgdGhpcy5vdXRwdXQuY2FuY2VsQWxsKCk7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c3RyZWFtLmpzLm1hcCIsImltcG9ydCB7IENhbmNlbGxhdGlvblRva2VuIH0gZnJvbSAnLi4vdXRpbGl0aWVzL2NhbmNlbGxhdGlvbl90b2tlbi5qcyc7XG5pbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICcuLi91dGlsaXRpZXMvZXZlbnRfZW1pdHRlci5qcyc7XG5pbXBvcnQgeyBnZXRWYWx1ZU9mIH0gZnJvbSAnLi4vdXRpbGl0aWVzL3NvdXJjZXMuanMnO1xuaW1wb3J0IHsgQXJyYXlEYXRhU291cmNlIH0gZnJvbSAnLi9kYXRhX3NvdXJjZS5qcyc7XG5leHBvcnQgY2xhc3MgVHJlZURhdGFTb3VyY2Uge1xuICAgIGNoaWxkcmVuS2V5O1xuICAgIHJvb3RzO1xuICAgIHVwZGF0ZUV2ZW50O1xuICAgIHdhdGNoQ291bnQgPSAwO1xuICAgIHdhdGNoVG9rZW47XG4gICAgY29uc3RydWN0b3IoY2hpbGRyZW5LZXksIHJvb3RzKSB7XG4gICAgICAgIHRoaXMuY2hpbGRyZW5LZXkgPSBjaGlsZHJlbktleTtcbiAgICAgICAgdGhpcy5yb290cyA9IEFycmF5RGF0YVNvdXJjZS50b0FycmF5RGF0YVNvdXJjZShyb290cyk7XG4gICAgICAgIHRoaXMudXBkYXRlRXZlbnQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgfVxuICAgIHdhdGNoKGNhbmNlbGxhdGlvblRva2VuKSB7XG4gICAgICAgIHRoaXMud2F0Y2hDb3VudCsrO1xuICAgICAgICBjYW5jZWxsYXRpb25Ub2tlbi5hZGRDYW5jZWxhYmxlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMud2F0Y2hDb3VudC0tO1xuICAgICAgICAgICAgaWYgKHRoaXMud2F0Y2hDb3VudCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMud2F0Y2hUb2tlbi5jYW5jZWwoKTtcbiAgICAgICAgICAgICAgICB0aGlzLndhdGNoVG9rZW4gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoIXRoaXMud2F0Y2hUb2tlbikge1xuICAgICAgICAgICAgdGhpcy53YXRjaFRva2VuID0gbmV3IENhbmNlbGxhdGlvblRva2VuKCk7XG4gICAgICAgICAgICBjb25zdCB3YXRjaE1hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnJvb3RzIGluc3RhbmNlb2YgQXJyYXlEYXRhU291cmNlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yb290cy5saXN0ZW4oKGNoYW5nZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLndhdGNoSGFuZGxlQ2hhbmdlKGNoYW5nZSwgdW5kZWZpbmVkLCB3YXRjaE1hcCk7XG4gICAgICAgICAgICAgICAgfSwgdGhpcy53YXRjaFRva2VuKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAoY29uc3Qgcm9vdCBvZiB0aGlzLnJvb3RzKSB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCB7IG5vZGUgfSBvZiB0aGlzLml0ZXJhdGVMZXZlbFdpdGhNZXRhRGF0YShyb290LCB0aGlzLnJvb3RzLmxlbmd0aC52YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGVbdGhpcy5jaGlsZHJlbktleV0gaW5zdGFuY2VvZiBBcnJheURhdGFTb3VyY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdhdGNoTWFwLnNldChub2RlLCBuZXcgQ2FuY2VsbGF0aW9uVG9rZW4oKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndhdGNoVG9rZW4uY2hhaW4od2F0Y2hNYXAuZ2V0KG5vZGUpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVbdGhpcy5jaGlsZHJlbktleV0ubGlzdGVuQW5kUmVwZWF0KChjaGFuZ2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndhdGNoSGFuZGxlQ2hhbmdlKGNoYW5nZSwgbm9kZSwgd2F0Y2hNYXApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgd2F0Y2hNYXAuZ2V0KG5vZGUpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICB3YXRjaEhhbmRsZUNoYW5nZShjaGFuZ2UsIHBhcmVudCwgd2F0Y2hNYXApIHtcbiAgICAgICAgc3dpdGNoIChjaGFuZ2Uub3BlcmF0aW9uKSB7XG4gICAgICAgICAgICBjYXNlICdhZGQnOlxuICAgICAgICAgICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgY2hhbmdlLml0ZW1zKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlRXZlbnQuZmlyZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2VkTm9kZTogaXRlbSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiBjaGFuZ2UuaW5kZXggKyBpKyssXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnROb2RlOiBwYXJlbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb246ICdhZGRlZCdcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtW3RoaXMuY2hpbGRyZW5LZXldIGluc3RhbmNlb2YgQXJyYXlEYXRhU291cmNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3YXRjaE1hcC5zZXQoaXRlbSwgbmV3IENhbmNlbGxhdGlvblRva2VuKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53YXRjaFRva2VuLmNoYWluKHdhdGNoTWFwLmdldChpdGVtKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtW3RoaXMuY2hpbGRyZW5LZXldLmxpc3RlbkFuZFJlcGVhdCgoY2hhbmdlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53YXRjaEhhbmRsZUNoYW5nZShjaGFuZ2UsIGl0ZW0sIHdhdGNoTWFwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHdhdGNoTWFwLmdldChpdGVtKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdyZW1vdmUnOlxuICAgICAgICAgICAgICAgIGxldCBqID0gMDtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgY2hhbmdlLml0ZW1zKSB7XG4gICAgICAgICAgICAgICAgICAgIHdhdGNoTWFwLmdldChpdGVtKT8uY2FuY2VsKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlRXZlbnQuZmlyZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2VkTm9kZTogaXRlbSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiBjaGFuZ2UuaW5kZXggKyBqKyssXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnROb2RlOiBwYXJlbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb246ICdkZWxldGVkJ1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdtZXJnZSc6XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQnKTtcbiAgICAgICAgICAgIGNhc2UgJ3JlcGxhY2UnOlxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlRXZlbnQuZmlyZSh7XG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZWROb2RlOiBjaGFuZ2UudGFyZ2V0LFxuICAgICAgICAgICAgICAgICAgICBpbmRleDogY2hhbmdlLmluZGV4LFxuICAgICAgICAgICAgICAgICAgICBwYXJlbnROb2RlOiBwYXJlbnQsXG4gICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvbjogJ2RlbGV0ZWQnXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVFdmVudC5maXJlKHtcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlZE5vZGU6IGNoYW5nZS5pdGVtc1swXSxcbiAgICAgICAgICAgICAgICAgICAgaW5kZXg6IGNoYW5nZS5pbmRleCxcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50Tm9kZTogcGFyZW50LFxuICAgICAgICAgICAgICAgICAgICBvcGVyYXRpb246ICdhZGRlZCdcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICBsaXN0ZW4oY2FsbGJhY2ssIGNhbmNlbGxhdGlvblRva2VuKSB7XG4gICAgICAgIHRoaXMud2F0Y2goY2FuY2VsbGF0aW9uVG9rZW4pO1xuICAgICAgICByZXR1cm4gdGhpcy51cGRhdGVFdmVudC5zdWJzY3JpYmUoY2FsbGJhY2ssIGNhbmNlbGxhdGlvblRva2VuKS5jYW5jZWw7XG4gICAgfVxuICAgIGxpc3RlbkFuZFJlcGVhdChjYWxsYmFjaywgY2FuY2VsbGF0aW9uVG9rZW4pIHtcbiAgICAgICAgZm9yIChjb25zdCB7IHBhcmVudCwgbm9kZSwgaW5kZXggfSBvZiB0aGlzLml0ZXJhdGVMZXZlbFdpdGhNZXRhRGF0YSh0aGlzLnJvb3RzLCAwKSkge1xuICAgICAgICAgICAgY2FsbGJhY2soe1xuICAgICAgICAgICAgICAgIGNoYW5nZWROb2RlOiBub2RlLFxuICAgICAgICAgICAgICAgIGluZGV4LFxuICAgICAgICAgICAgICAgIHBhcmVudE5vZGU6IHBhcmVudCxcbiAgICAgICAgICAgICAgICBvcGVyYXRpb246ICdhZGRlZCdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmxpc3RlbihjYWxsYmFjaywgY2FuY2VsbGF0aW9uVG9rZW4pO1xuICAgIH1cbiAgICBhZGFwdE5vZGVMaXN0KG5vZGVzLCB0b2tlbiwgbm9kZUxpc3QgPSBuZXcgQXJyYXlEYXRhU291cmNlKCkpIHtcbiAgICAgICAgY29uc3QgYWRhcHRNYXAgPSBuZXcgTWFwKCk7XG4gICAgICAgIG5vZGVzLmxpc3RlbkFuZFJlcGVhdCgoY2hhbmdlKSA9PiB7XG4gICAgICAgICAgICBzd2l0Y2ggKGNoYW5nZS5vcGVyYXRpb24pIHtcbiAgICAgICAgICAgICAgICBjYXNlICdhZGQnOlxuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgY2hhbmdlLml0ZW1zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZEl0ZW0oYWRhcHRNYXAsIHRva2VuLCBpdGVtLCBub2RlTGlzdCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAncmVtb3ZlJzpcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIGNoYW5nZS5pdGVtcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVJdGVtKG5vZGVMaXN0LCBhZGFwdE1hcCwgaXRlbSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbWVyZ2UnOlxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZCcpO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3JlcGxhY2UnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUl0ZW0obm9kZUxpc3QsIGFkYXB0TWFwLCBjaGFuZ2UudGFyZ2V0KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRJdGVtKGFkYXB0TWFwLCB0b2tlbiwgY2hhbmdlLml0ZW1zWzBdLCBub2RlTGlzdCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0b2tlbik7XG4gICAgICAgIHJldHVybiBub2RlTGlzdDtcbiAgICB9XG4gICAgYWRhcHROb2RlVHJlZShwYXJlbnQsIG5vZGVzLCBtYXBwZXIsIG5ld0tleSwgdG9rZW4pIHtcbiAgICAgICAgbm9kZXMgPSBBcnJheURhdGFTb3VyY2UudG9BcnJheURhdGFTb3VyY2Uobm9kZXMpO1xuICAgICAgICBjb25zdCBuZXdSb290cyA9IG5vZGVzLm1hcChtYXBwZXIpO1xuICAgICAgICBpZiAocGFyZW50KSB7XG4gICAgICAgICAgICBwYXJlbnRbbmV3S2V5XSA9IG5ld1Jvb3RzO1xuICAgICAgICB9XG4gICAgICAgIG5vZGVzLmxpc3RlbkFuZFJlcGVhdCgoY2hhbmdlKSA9PiB7XG4gICAgICAgICAgICBzd2l0Y2ggKGNoYW5nZS5vcGVyYXRpb24pIHtcbiAgICAgICAgICAgICAgICBjYXNlICdhZGQnOlxuICAgICAgICAgICAgICAgICAgICBsZXQgaSA9IGNoYW5nZS5pbmRleDtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIGNoYW5nZS5pdGVtcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGFwdE5vZGVUcmVlKG5ld1Jvb3RzLmdldChpKyspLCBpdGVtW25ld0tleV0sIG1hcHBlciwgbmV3S2V5LCB0b2tlbik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbWVyZ2UnOlxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZCcpO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3JlcGxhY2UnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkYXB0Tm9kZVRyZWUobmV3Um9vdHNbY2hhbmdlLmluZGV4XSwgY2hhbmdlLml0ZW1zWzBdW25ld0tleV0sIG1hcHBlciwgbmV3S2V5LCB0b2tlbik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0b2tlbik7XG4gICAgICAgIHJldHVybiBuZXdSb290cztcbiAgICB9XG4gICAgbWFwKG1hcHBlciwgbmV3S2V5ID0gdGhpcy5jaGlsZHJlbktleSwgY2FuY2VsbGF0aW9uVG9rZW4pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBUcmVlRGF0YVNvdXJjZShuZXdLZXksIHRoaXMuYWRhcHROb2RlVHJlZSh1bmRlZmluZWQsIHRoaXMucm9vdHMsIG1hcHBlciwgbmV3S2V5LCBjYW5jZWxsYXRpb25Ub2tlbikpO1xuICAgIH1cbiAgICBhZGRJdGVtKGFkYXB0TWFwLCBwYXJlbnRUb2tlbiwgaXRlbSwgbm9kZUxpc3QpIHtcbiAgICAgICAgbm9kZUxpc3QucHVzaChpdGVtKTtcbiAgICAgICAgYWRhcHRNYXAuc2V0KGl0ZW0sIG5ldyBDYW5jZWxsYXRpb25Ub2tlbigpKTtcbiAgICAgICAgcGFyZW50VG9rZW4uY2hhaW4oYWRhcHRNYXAuZ2V0KGl0ZW0pKTtcbiAgICAgICAgY29uc3QgbGlzdCA9IEFycmF5RGF0YVNvdXJjZS50b0FycmF5RGF0YVNvdXJjZShpdGVtW3RoaXMuY2hpbGRyZW5LZXldKTtcbiAgICAgICAgdGhpcy5hZGFwdE5vZGVMaXN0KGxpc3QsIGFkYXB0TWFwLmdldChpdGVtKSwgbm9kZUxpc3QpO1xuICAgIH1cbiAgICByZW1vdmVJdGVtKG5vZGVMaXN0LCBhZGFwdE1hcCwgaXRlbSkge1xuICAgICAgICBhZGFwdE1hcC5nZXQoaXRlbSkuY2FuY2VsKCk7XG4gICAgICAgIG5vZGVMaXN0LnJlbW92ZShpdGVtKTtcbiAgICB9XG4gICAgY3JlYXRlQXJyYXlEYXRhU291cmNlT2ZOb2RlcyhjYW5jZWxsYXRpb25Ub2tlbikge1xuICAgICAgICByZXR1cm4gdGhpcy5hZGFwdE5vZGVMaXN0KHRoaXMucm9vdHMsIGNhbmNlbGxhdGlvblRva2VuKTtcbiAgICB9XG4gICAgKltTeW1ib2wuaXRlcmF0b3JdKCkge1xuICAgICAgICBmb3IgKGNvbnN0IHJvb3Qgb2YgdGhpcy5yb290cykge1xuICAgICAgICAgICAgeWllbGQqIHRoaXMuaXRlcmF0ZUxldmVsKHJvb3QpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgKml0ZXJhdGVXaXRoTWV0YURhdGEoKSB7XG4gICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgZm9yIChjb25zdCByb290IG9mIHRoaXMucm9vdHMpIHtcbiAgICAgICAgICAgIHlpZWxkKiB0aGlzLml0ZXJhdGVMZXZlbFdpdGhNZXRhRGF0YShyb290LCB0aGlzLnJvb3RzLmxlbmd0aC52YWx1ZSwgdW5kZWZpbmVkLCBpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgICppdGVyYXRlTGV2ZWxXaXRoTWV0YURhdGEobm9kZSwgbGFzdEluZGV4LCBwYXJlbnQsIGluZGV4ID0gMCwgbGV2ZWwgPSAwKSB7XG4gICAgICAgIHlpZWxkIHsgbm9kZTogbm9kZSwgcGFyZW50LCBpbmRleCwgbGV2ZWwsIGxhc3RJbmRleCB9O1xuICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgIGZvciAoY29uc3QgY2hpbGQgb2Ygbm9kZVt0aGlzLmNoaWxkcmVuS2V5XSkge1xuICAgICAgICAgICAgeWllbGQqIHRoaXMuaXRlcmF0ZUxldmVsV2l0aE1ldGFEYXRhKGNoaWxkLCBnZXRWYWx1ZU9mKG5vZGVbdGhpcy5jaGlsZHJlbktleV0ubGVuZ3RoKSwgbm9kZSwgaSsrLCBsZXZlbCArIDEpO1xuICAgICAgICB9XG4gICAgfVxuICAgICppdGVyYXRlTGV2ZWwobGV2ZWwpIHtcbiAgICAgICAgeWllbGQgbGV2ZWw7XG4gICAgICAgIGZvciAoY29uc3QgY2hpbGQgb2YgbGV2ZWxbdGhpcy5jaGlsZHJlbktleV0pIHtcbiAgICAgICAgICAgIHlpZWxkKiB0aGlzLml0ZXJhdGVMZXZlbChjaGlsZCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD10cmVlX2RhdGFfc291cmNlLmpzLm1hcCIsImltcG9ydCB7IElucHV0IH0gZnJvbSAnLi4vbm9kZXMvaW5wdXQuanMnO1xuaW1wb3J0IHsgU2VsZWN0IH0gZnJvbSAnLi4vbm9kZXMvc2VsZWN0LmpzJztcbmltcG9ydCB7IEEsIEFiYnIsIEFkZHJlc3MsIEFyZWEsIEFydGljbGUsIEFzaWRlLCBBdWRpbywgQiwgQm9keSwgQnIsIEJ1dHRvbiwgQ2FudmFzLCBDYXB0aW9uLCBDb2RlLCBDb2wsIENvbGdyb3VwLCBEYXRhLCBEZWZzLCBEZXRhaWxzLCBEaXYsIEVtLCBGb290ZXIsIEZvcm0sIEcsIEgxLCBIMiwgSDMsIEg0LCBINSwgSDYsIEhlYWQsIEhlYWRlciwgSGVhZGluZywgSHIsIEh0bWwsIEksIElGcmFtZSwgSW1nLCBLYmQsIExhYmVsLCBMaSwgTGluZSwgTGluaywgTWV0YSwgTmF2LCBOb1NjcmlwdCwgT2JqZWN0LCBPbCwgT3B0R3JvdXAsIE9wdGlvbiwgT3V0cHV0LCBQLCBQYXJhbSwgUGljdHVyZSwgUHJlLCBQcm9ncmVzcywgUSwgUmVjdCwgU2FtcCwgU2NyaXB0LCBTbG90LCBTb3VyY2UsIFNwYW4sIFN0cm9uZywgU3R5bGUsIFN1YiwgU3VtbWFyeSwgU3VwLCBTdmcsIFRhYmxlLCBUQm9keSwgVGQsIFRlbXBsYXRlLCBURm9vdCwgVGgsIFRIZWFkLCBUaW1lLCBUaXRsZSwgVHIsIFRyYWNrLCBVbCwgVmFyLCBWaWRlbywgV2JyLCBUZXh0LCBUc3BhbiwgQ2lyY2xlLCBFbGxpcHNlLCBQb2x5Z29uLCBQb2x5bGluZSwgUGF0aCwgSW1hZ2UsIFN5bWJvbCwgTWFzaywgVXNlLCBTdG9wLCBMaW5lYXJHcmFkaWVudCwgUmFkaWFsR3JhZGllbnQsIE1hcmtlciwgQ2xpcFBhdGgsIEZvcmVpZ25PYmplY3QsIFBhdHRlcm4gfSBmcm9tICcuLi9ub2Rlcy9zaW1wbGVfZG9tX25vZGVzLmpzJztcbmltcG9ydCB7IFRleHRBcmVhIH0gZnJvbSAnLi4vbm9kZXMvdGV4dGFyZWEuanMnO1xuaW1wb3J0IHsgQXJyYXlBdXJ1bUVsZW1lbnQsIEF1cnVtRWxlbWVudCwgYXVydW1FbGVtZW50TW9kZWxJZGVudGl0aXksIGNyZWF0ZUFQSSwgY3JlYXRlUmVuZGVyU2Vzc2lvbiwgcmVuZGVySW50ZXJuYWwgfSBmcm9tICcuLi9yZW5kZXJpbmcvYXVydW1fZWxlbWVudC5qcyc7XG5pbXBvcnQgeyBBcnJheURhdGFTb3VyY2UgfSBmcm9tICcuLi9zdHJlYW0vZGF0YV9zb3VyY2UuanMnO1xuY29uc3Qgbm9kZU1hcCA9IHtcbiAgICBhZGRyZXNzOiBBZGRyZXNzLFxuICAgIGtiZDogS2JkLFxuICAgIHNhbXA6IFNhbXAsXG4gICAgb2JqZWN0OiBPYmplY3QsXG4gICAgb3B0Z3JvdXA6IE9wdEdyb3VwLFxuICAgIHBpY3R1cmU6IFBpY3R1cmUsXG4gICAgb3V0cHV0OiBPdXRwdXQsXG4gICAgcGFyYW06IFBhcmFtLFxuICAgIHN0cm9uZzogU3Ryb25nLFxuICAgIHRyYWNrOiBUcmFjayxcbiAgICB2YXI6IFZhcixcbiAgICB3YnI6IFdicixcbiAgICBidXR0b246IEJ1dHRvbixcbiAgICBjb2RlOiBDb2RlLFxuICAgIGhyOiBIcixcbiAgICBkaXY6IERpdixcbiAgICBpbnB1dDogSW5wdXQsXG4gICAgbGk6IExpLFxuICAgIHNwYW46IFNwYW4sXG4gICAgc3R5bGU6IFN0eWxlLFxuICAgIHVsOiBVbCxcbiAgICBwOiBQLFxuICAgIGltZzogSW1nLFxuICAgIGxpbms6IExpbmssXG4gICAgY2FudmFzOiBDYW52YXMsXG4gICAgYTogQSxcbiAgICBhcnRpY2xlOiBBcnRpY2xlLFxuICAgIGJyOiBCcixcbiAgICBmb3JtOiBGb3JtLFxuICAgIGxhYmVsOiBMYWJlbCxcbiAgICBvbDogT2wsXG4gICAgcHJlOiBQcmUsXG4gICAgcHJvZ3Jlc3M6IFByb2dyZXNzLFxuICAgIHRhYmxlOiBUYWJsZSxcbiAgICB0ZDogVGQsXG4gICAgdHI6IFRyLFxuICAgIHRoOiBUaCxcbiAgICB0ZXh0YXJlYTogVGV4dEFyZWEsXG4gICAgaDE6IEgxLFxuICAgIGgyOiBIMixcbiAgICBoMzogSDMsXG4gICAgaDQ6IEg0LFxuICAgIGg1OiBINSxcbiAgICBoNjogSDYsXG4gICAgaHRtbDogSHRtbCxcbiAgICBoZWFkOiBIZWFkLFxuICAgIGhlYWRlcjogSGVhZGVyLFxuICAgIGZvb3RlcjogRm9vdGVyLFxuICAgIG5hdjogTmF2LFxuICAgIGI6IEIsXG4gICAgaTogSSxcbiAgICBzY3JpcHQ6IFNjcmlwdCxcbiAgICBhYmJyOiBBYmJyLFxuICAgIGFyZWE6IEFyZWEsXG4gICAgYXNpZGU6IEFzaWRlLFxuICAgIGF1ZGlvOiBBdWRpbyxcbiAgICBlbTogRW0sXG4gICAgaGVhZGluZzogSGVhZGluZyxcbiAgICBpZnJhbWU6IElGcmFtZSxcbiAgICBub3NjcmlwdDogTm9TY3JpcHQsXG4gICAgb3B0aW9uOiBPcHRpb24sXG4gICAgcTogUSxcbiAgICBzZWxlY3Q6IFNlbGVjdCxcbiAgICBzb3VyY2U6IFNvdXJjZSxcbiAgICB0aXRsZTogVGl0bGUsXG4gICAgdmlkZW86IFZpZGVvLFxuICAgIHRib2R5OiBUQm9keSxcbiAgICB0Zm9vdDogVEZvb3QsXG4gICAgbWV0YTogTWV0YSxcbiAgICBib2R5OiBCb2R5LFxuICAgIHRoZWFkOiBUSGVhZCxcbiAgICBzdW1tYXJ5OiBTdW1tYXJ5LFxuICAgIGRldGFpbHM6IERldGFpbHMsXG4gICAgc3ViOiBTdWIsXG4gICAgc3VwOiBTdXAsXG4gICAgc3ZnOiBTdmcsXG4gICAgZGF0YTogRGF0YSxcbiAgICB0aW1lOiBUaW1lLFxuICAgIHRlbXBsYXRlOiBUZW1wbGF0ZSxcbiAgICBzbG90OiBTbG90LFxuICAgIGNvbDogQ29sLFxuICAgIGNvbGdyb3VwOiBDb2xncm91cCxcbiAgICBjYXB0aW9uOiBDYXB0aW9uLFxuICAgIGxpbmU6IExpbmUsXG4gICAgcmVjdDogUmVjdCxcbiAgICBkZWZzOiBEZWZzLFxuICAgIGc6IEcsXG4gICAgdGV4dDogVGV4dCxcbiAgICB0c3BhbjogVHNwYW4sXG4gICAgY2lyY2xlOiBDaXJjbGUsXG4gICAgZWxsaXBzZTogRWxsaXBzZSxcbiAgICBwb2x5Z29uOiBQb2x5Z29uLFxuICAgIHBvbHlsaW5lOiBQb2x5bGluZSxcbiAgICBwYXRoOiBQYXRoLFxuICAgIGltYWdlOiBJbWFnZSxcbiAgICBzeW1ib2w6IFN5bWJvbCxcbiAgICB1c2U6IFVzZSxcbiAgICBzdG9wOiBTdG9wLFxuICAgIGxpbmVhcmdyYWRpZW50OiBMaW5lYXJHcmFkaWVudCxcbiAgICByYWRpYWxncmFkaWVudDogUmFkaWFsR3JhZGllbnQsXG4gICAgY2xpcHBhdGg6IENsaXBQYXRoLFxuICAgIHBhdHRlcm46IFBhdHRlcm4sXG4gICAgbWFzazogTWFzayxcbiAgICBmb3JlaWdub2JqZWN0OiBGb3JlaWduT2JqZWN0LFxuICAgIG1hcmtlcjogTWFya2VyXG59O1xuZXhwb3J0IGNsYXNzIEF1cnVtIHtcbiAgICBzdGF0aWMgcmVoeWRyYXRlKGF1cnVtUmVuZGVyYWJsZSwgZG9tKSB7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGRvbS5wYXJlbnRFbGVtZW50O1xuICAgICAgICBkb20ucmVtb3ZlKCk7XG4gICAgICAgIHJldHVybiBBdXJ1bS5hdHRhY2goYXVydW1SZW5kZXJhYmxlLCB0YXJnZXQpO1xuICAgIH1cbiAgICBzdGF0aWMgYXR0YWNoKGF1cnVtUmVuZGVyYWJsZSwgZG9tKSB7XG4gICAgICAgIGNvbnN0IHNlc3Npb24gPSBjcmVhdGVSZW5kZXJTZXNzaW9uKCk7XG4gICAgICAgIGNvbnN0IGNvbnRlbnQgPSByZW5kZXJJbnRlcm5hbChhdXJ1bVJlbmRlcmFibGUsIHNlc3Npb24pO1xuICAgICAgICBpZiAoY29udGVudCBpbnN0YW5jZW9mIEF1cnVtRWxlbWVudCkge1xuICAgICAgICAgICAgY29udGVudC5hdHRhY2hUb0RvbShkb20sIGRvbS5jaGlsZE5vZGVzLmxlbmd0aCk7XG4gICAgICAgICAgICBzZXNzaW9uLnNlc3Npb25Ub2tlbi5hZGRDYW5jZWxhYmxlKCgpID0+IGNvbnRlbnQuZGlzcG9zZSgpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KGNvbnRlbnQpKSB7XG4gICAgICAgICAgICBjb25zdCByb290ID0gbmV3IEFycmF5QXVydW1FbGVtZW50KG5ldyBBcnJheURhdGFTb3VyY2UoY29udGVudCksIGNyZWF0ZUFQSShzZXNzaW9uKSk7XG4gICAgICAgICAgICBzZXNzaW9uLnNlc3Npb25Ub2tlbi5hZGRDYW5jZWxhYmxlKCgpID0+IHJvb3QuZGlzcG9zZSgpKTtcbiAgICAgICAgICAgIHJvb3QuYXR0YWNoVG9Eb20oZG9tLCBkb20uY2hpbGROb2Rlcy5sZW5ndGgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZG9tLmFwcGVuZENoaWxkKGNvbnRlbnQpO1xuICAgICAgICAgICAgc2Vzc2lvbi5zZXNzaW9uVG9rZW4uYWRkQ2FuY2VsYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbnRlbnQuaXNDb25uZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgZG9tLnJlbW92ZUNoaWxkKGNvbnRlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGkgPSBzZXNzaW9uLmF0dGFjaENhbGxzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICBzZXNzaW9uLmF0dGFjaENhbGxzW2ldKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNlc3Npb24uc2Vzc2lvblRva2VuO1xuICAgIH1cbiAgICBzdGF0aWMgZnJhZ21lbnQoKSB7IH1cbiAgICBzdGF0aWMgZmFjdG9yeShub2RlLCBhcmdzLCAuLi5pbm5lck5vZGVzKSB7XG4gICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICBpZiAobm9kZSA9PT0gQXVydW0uZnJhZ21lbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBpbm5lck5vZGVzO1xuICAgICAgICB9XG4gICAgICAgIGxldCBuYW1lO1xuICAgICAgICBsZXQgaW50cmluc2ljID0gZmFsc2U7XG4gICAgICAgIGlmICh0eXBlb2Ygbm9kZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGludHJpbnNpYyA9IHRydWU7XG4gICAgICAgICAgICBuYW1lID0gbm9kZTtcbiAgICAgICAgICAgIGNvbnN0IHR5cGUgPSBub2RlO1xuICAgICAgICAgICAgbm9kZSA9IG5vZGVNYXBbbm9kZV07XG4gICAgICAgICAgICBpZiAobm9kZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBOb2RlICR7dHlwZX0gZG9lcyBub3QgZXhpc3Qgb3IgaXMgbm90IHN1cHBvcnRlZGApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbmFtZSA9IG5vZGUubmFtZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgW2F1cnVtRWxlbWVudE1vZGVsSWRlbnRpdGl5XTogdHJ1ZSxcbiAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICBpc0ludHJpbnNpYzogaW50cmluc2ljLFxuICAgICAgICAgICAgZmFjdG9yeTogbm9kZSxcbiAgICAgICAgICAgIHByb3BzOiBhcmdzLFxuICAgICAgICAgICAgY2hpbGRyZW46IGlubmVyTm9kZXNcbiAgICAgICAgfTtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hdXJ1bS5qcy5tYXAiLCJleHBvcnQgY2xhc3MgQ2FuY2VsbGF0aW9uVG9rZW4ge1xuICAgIGNhbmNlbGFibGVzO1xuICAgIF9pc0NhbmNlbGxlZDtcbiAgICBnZXQgaXNDYW5jZWxlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzQ2FuY2VsbGVkO1xuICAgIH1cbiAgICBjb25zdHJ1Y3RvciguLi5jYW5jZWxsYWJsZXMpIHtcbiAgICAgICAgdGhpcy5jYW5jZWxhYmxlcyA9IGNhbmNlbGxhYmxlcyA/PyBbXTtcbiAgICAgICAgdGhpcy5faXNDYW5jZWxsZWQgPSBmYWxzZTtcbiAgICB9XG4gICAgc3RhdGljIGZvcmV2ZXIgPSBuZXcgQ2FuY2VsbGF0aW9uVG9rZW4oKTtcbiAgICBzdGF0aWMgZnJvbU11bHRpcGxlKHRva2Vucykge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBuZXcgQ2FuY2VsbGF0aW9uVG9rZW4oKTtcbiAgICAgICAgZm9yIChjb25zdCB0b2tlbiBvZiB0b2tlbnMpIHtcbiAgICAgICAgICAgIHRva2VuLmNoYWluKHJlc3VsdCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgaGFzQ2FuY2VsbGFibGVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jYW5jZWxhYmxlcy5sZW5ndGggPiAwO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBdHRhY2hlcyBhIG5ldyBjYW5jZWxhYmxlIHRvIHRoaXMgdG9rZW5cbiAgICAgKiBAcGFyYW0gZGVsZWdhdGVcbiAgICAgKi9cbiAgICBhZGRDYW5jZWxhYmxlKGRlbGVnYXRlKSB7XG4gICAgICAgIHRoaXMudGhyb3dJZkNhbmNlbGxlZCgnYXR0ZW1wdGluZyB0byBhZGQgY2FuY2VsbGFibGUgdG8gdG9rZW4gdGhhdCBpcyBhbHJlYWR5IGNhbmNlbGxlZCcpO1xuICAgICAgICB0aGlzLmNhbmNlbGFibGVzLnB1c2goZGVsZWdhdGUpO1xuICAgICAgICBpZiAodGhpcy5jYW5jZWxhYmxlcy5sZW5ndGggPT09IDIwMCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3BvdGVudGlhbCBtZW1vcnkgbGVhazogY2FuY2VsbGF0aW9uIHRva2VuIGhhcyBvdmVyIDIwMCBjbGVhbiB1cCBjYWxscycpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICByZW1vdmVDYW5jZWxhYmxlKGRlbGVnYXRlKSB7XG4gICAgICAgIHRoaXMudGhyb3dJZkNhbmNlbGxlZCgnYXR0ZW1wdGluZyB0byByZW1vdmUgY2FuY2VsbGFibGUgZnJvbSB0b2tlbiB0aGF0IGlzIGFscmVhZHkgY2FuY2VsbGVkJyk7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5jYW5jZWxhYmxlcy5pbmRleE9mKGRlbGVnYXRlKTtcbiAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgdGhpcy5jYW5jZWxhYmxlcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBzZXRUaW1lb3V0KGNiLCB0aW1lID0gMCkge1xuICAgICAgICBjb25zdCBpZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVDYW5jZWxhYmxlKGNhbmNlbGFibGUpO1xuICAgICAgICAgICAgY2IoKTtcbiAgICAgICAgfSwgdGltZSk7XG4gICAgICAgIGNvbnN0IGNhbmNlbGFibGUgPSAoKSA9PiBjbGVhclRpbWVvdXQoaWQpO1xuICAgICAgICB0aGlzLmFkZENhbmNlbGFibGUoY2FuY2VsYWJsZSk7XG4gICAgfVxuICAgIHNldEludGVydmFsKGNiLCB0aW1lKSB7XG4gICAgICAgIGNvbnN0IGlkID0gc2V0SW50ZXJ2YWwoY2IsIHRpbWUpO1xuICAgICAgICB0aGlzLmFkZENhbmNlbGFibGUoKCkgPT4gY2xlYXJJbnRlcnZhbChpZCkpO1xuICAgIH1cbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoY2IpIHtcbiAgICAgICAgY29uc3QgaWQgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVDYW5jZWxhYmxlKGNhbmNlbGFibGUpO1xuICAgICAgICAgICAgY2IoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IGNhbmNlbGFibGUgPSAoKSA9PiBjYW5jZWxBbmltYXRpb25GcmFtZShpZCk7XG4gICAgICAgIHRoaXMuYWRkQ2FuY2VsYWJsZShjYW5jZWxhYmxlKTtcbiAgICB9XG4gICAgYW5pbWF0aW9uTG9vcChjYikge1xuICAgICAgICByZWdpc3RlckFuaW1hdGlvbkxvb3AoY2IsIHRoaXMpO1xuICAgIH1cbiAgICB0aHJvd0lmQ2FuY2VsbGVkKG1zZykge1xuICAgICAgICBpZiAodGhpcy5pc0NhbmNlbGVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnIHx8ICdjYW5jZWxsYXRpb24gdG9rZW4gaXMgY2FuY2VsbGVkJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2hhaW4odGFyZ2V0LCB0d29XYXlzID0gZmFsc2UpIHtcbiAgICAgICAgY29uc3QgY2FuY2VsYWJsZSA9ICgpID0+IHRhcmdldC5jYW5jZWwoKTtcbiAgICAgICAgaWYgKHR3b1dheXMpIHtcbiAgICAgICAgICAgIHRhcmdldC5jaGFpbih0aGlzLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0YXJnZXQuYWRkQ2FuY2VsYWJsZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzQ2FuY2VsZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVDYW5jZWxhYmxlKGNhbmNlbGFibGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYWRkQ2FuY2VsYWJsZShjYW5jZWxhYmxlKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlZ2lzdGVycyBhbiBldmVudCB1c2luZyBhZGRFdmVudExpc3RlbmVyIGFuZCBpZiB5b3UgY2FuY2VsIHRoZSB0b2tlbiB0aGUgZXZlbnQgd2lsbCBiZSBjYW5jZWxlZCBhcyB3ZWxsXG4gICAgICovXG4gICAgcmVnaXN0ZXJEb21FdmVudChldmVudEVtaXR0ZXIsIGV2ZW50LCBjYWxsYmFjaykge1xuICAgICAgICBldmVudEVtaXR0ZXIuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgY2FsbGJhY2spO1xuICAgICAgICB0aGlzLmFkZENhbmNlbGFibGUoKCkgPT4gZXZlbnRFbWl0dGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGNhbGxiYWNrKSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYW5jZWxzIGV2ZXJ5dGhpbmcgYXR0YWNoZWQgdG8gdGhpcyB0b2tlblxuICAgICAqL1xuICAgIGNhbmNlbCgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNDYW5jZWxlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2lzQ2FuY2VsbGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jYW5jZWxhYmxlcy5mb3JFYWNoKChjKSA9PiBjKCkpO1xuICAgICAgICB0aGlzLmNhbmNlbGFibGVzID0gdW5kZWZpbmVkO1xuICAgIH1cbn1cbmNvbnN0IGFuaW1hdGlvbkNicyA9IFtdO1xubGV0IGxvb3BpbmcgPSBmYWxzZTtcbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlckFuaW1hdGlvbkxvb3AoY2FsbGJhY2ssIHRva2VuKSB7XG4gICAgYW5pbWF0aW9uQ2JzLnB1c2goY2FsbGJhY2spO1xuICAgIHRva2VuLmFkZENhbmNlbGFibGUoKCkgPT4ge1xuICAgICAgICBhbmltYXRpb25DYnMuc3BsaWNlKGFuaW1hdGlvbkNicy5pbmRleE9mKGNhbGxiYWNrKSwgMSk7XG4gICAgfSk7XG4gICAgaWYgKCFsb29waW5nKSB7XG4gICAgICAgIGxvb3BpbmcgPSB0cnVlO1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcCk7XG4gICAgfVxufVxuZnVuY3Rpb24gbG9vcCh0aW1lKSB7XG4gICAgZm9yIChjb25zdCBjYiBvZiBhbmltYXRpb25DYnMpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNiKHRpbWUpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChhbmltYXRpb25DYnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGxvb3BpbmcgPSBmYWxzZTtcbiAgICB9XG4gICAgaWYgKGxvb3BpbmcpIHtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApO1xuICAgIH1cbn1cbkNhbmNlbGxhdGlvblRva2VuLmZvcmV2ZXIuYWRkQ2FuY2VsYWJsZSA9ICgpID0+IHZvaWQgMDtcbkNhbmNlbGxhdGlvblRva2VuLmZvcmV2ZXIuY2FuY2VsID0gKCkgPT4ge1xuICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGNhbmNlbCBmb3JldmVyIHRva2VuJyk7XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y2FuY2VsbGF0aW9uX3Rva2VuLmpzLm1hcCIsImltcG9ydCB7IERhdGFTb3VyY2UsIE1hcERhdGFTb3VyY2UsIEFycmF5RGF0YVNvdXJjZSB9IGZyb20gJy4uL3N0cmVhbS9kYXRhX3NvdXJjZS5qcyc7XG5pbXBvcnQgeyBkc01hcCB9IGZyb20gJy4uL3N0cmVhbS9kYXRhX3NvdXJjZV9vcGVyYXRvcnMuanMnO1xuaW1wb3J0IHsgRHVwbGV4RGF0YVNvdXJjZSB9IGZyb20gJy4uL3N0cmVhbS9kdXBsZXhfZGF0YV9zb3VyY2UuanMnO1xuZXhwb3J0IGZ1bmN0aW9uIGF1cnVtQ2xhc3NOYW1lKGRhdGEsIGNhbmNlbGxhdGlvblRva2VuKSB7XG4gICAgaWYgKGRhdGEgaW5zdGFuY2VvZiBNYXBEYXRhU291cmNlKSB7XG4gICAgICAgIHJldHVybiBoYW5kbGVDbGFzc01hcERhdGFTb3VyY2UoZGF0YSwgY2FuY2VsbGF0aW9uVG9rZW4pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGhhbmRsZUNsYXNzTWFwTGlrZShkYXRhLCBjYW5jZWxsYXRpb25Ub2tlbik7XG4gICAgfVxufVxuZnVuY3Rpb24gaGFuZGxlQ2xhc3NNYXBMaWtlKGRhdGEsIGNhbmNlbGxhdGlvblRva2VuKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgZm9yIChjb25zdCBrZXkgaW4gZGF0YSkge1xuICAgICAgICBpZiAoZGF0YVtrZXldKSB7XG4gICAgICAgICAgICBpZiAoZGF0YVtrZXldIGluc3RhbmNlb2YgRGF0YVNvdXJjZSB8fCBkYXRhW2tleV0gaW5zdGFuY2VvZiBEdXBsZXhEYXRhU291cmNlKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc291cmNlID0gZGF0YVtrZXldO1xuICAgICAgICAgICAgICAgIGNvbnN0IG1hcHBlZFNvdXJjZSA9IG5ldyBEYXRhU291cmNlKHNvdXJjZS52YWx1ZSA/IGtleSA6ICcnKTtcbiAgICAgICAgICAgICAgICBzb3VyY2UubGlzdGVuKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBtYXBwZWRTb3VyY2UudXBkYXRlKHZhbHVlID8ga2V5IDogJycpO1xuICAgICAgICAgICAgICAgIH0sIGNhbmNlbGxhdGlvblRva2VuKTtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChtYXBwZWRTb3VyY2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gaGFuZGxlQ2xhc3NNYXBEYXRhU291cmNlKGRhdGEsIGNhbmNlbGxhdGlvblRva2VuKSB7XG4gICAgY29uc3Qgc3RhdGVNYXAgPSBuZXcgTWFwKCk7XG4gICAgY29uc3QgcmVzdWx0ID0gbmV3IEFycmF5RGF0YVNvdXJjZSgpO1xuICAgIGRhdGEubGlzdGVuQW5kUmVwZWF0KChjaGFuZ2UpID0+IHtcbiAgICAgICAgaWYgKGNoYW5nZS5kZWxldGVkICYmIHN0YXRlTWFwLmhhcyhjaGFuZ2Uua2V5KSkge1xuICAgICAgICAgICAgcmVzdWx0LnJlbW92ZShjaGFuZ2Uua2V5KTtcbiAgICAgICAgICAgIHN0YXRlTWFwLmRlbGV0ZShjaGFuZ2Uua2V5KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChzdGF0ZU1hcC5oYXMoY2hhbmdlLmtleSkpIHtcbiAgICAgICAgICAgIGNvbnN0IG5ld1N0YXRlID0gY2hhbmdlLm5ld1ZhbHVlO1xuICAgICAgICAgICAgaWYgKG5ld1N0YXRlICYmICFzdGF0ZU1hcC5nZXQoY2hhbmdlLmtleSkpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChjaGFuZ2Uua2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghbmV3U3RhdGUgJiYgc3RhdGVNYXAuZ2V0KGNoYW5nZS5rZXkpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnJlbW92ZShjaGFuZ2Uua2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN0YXRlTWFwLnNldChjaGFuZ2Uua2V5LCBuZXdTdGF0ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIXN0YXRlTWFwLmhhcyhjaGFuZ2Uua2V5KSAmJiAhY2hhbmdlLmRlbGV0ZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IG5ld1N0YXRlID0gY2hhbmdlLm5ld1ZhbHVlO1xuICAgICAgICAgICAgaWYgKG5ld1N0YXRlKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goY2hhbmdlLmtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdGF0ZU1hcC5zZXQoY2hhbmdlLmtleSwgbmV3U3RhdGUpO1xuICAgICAgICB9XG4gICAgfSwgY2FuY2VsbGF0aW9uVG9rZW4pO1xuICAgIHJldHVybiByZXN1bHQ7XG59XG5leHBvcnQgZnVuY3Rpb24gY29tYmluZUNsYXNzKGNhbmNlbGxhdGlvblRva2VuLCAuLi5hcmdzKSB7XG4gICAgYXJncyA9IGFyZ3MuZmlsdGVyKChlKSA9PiAhIWUpO1xuICAgIGlmIChhcmdzLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgcmV0dXJuIGFyZ3NbMF07XG4gICAgfVxuICAgIGxldCBmaXhlZCA9ICcnO1xuICAgIGNvbnN0IHNvdXJjZXMgPSBbXTtcbiAgICBjb25zdCBtYXBzID0gW107XG4gICAgcmVzb2x2ZUNvbnN0YW50cyhhcmdzKTtcbiAgICBmdW5jdGlvbiByZXNvbHZlQ29uc3RhbnRzKGFyZ3MpIHtcbiAgICAgICAgZm9yIChjb25zdCBhcmcgb2YgYXJncykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBhcmcgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgZml4ZWQgKz0gYXJnICsgJyAnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShhcmcpKSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZUNvbnN0YW50cyhhcmcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYXJnIGluc3RhbmNlb2YgRGF0YVNvdXJjZSB8fCBhcmcgaW5zdGFuY2VvZiBEdXBsZXhEYXRhU291cmNlKSB7XG4gICAgICAgICAgICAgICAgc291cmNlcy5wdXNoKGFyZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChhcmcgaW5zdGFuY2VvZiBNYXBEYXRhU291cmNlKSB7XG4gICAgICAgICAgICAgICAgbWFwcy5wdXNoKGFyZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgYXJnID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIGFyZykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoYXJnW2tleV0gaW5zdGFuY2VvZiBEYXRhU291cmNlIHx8IGFyZ1trZXldIGluc3RhbmNlb2YgRHVwbGV4RGF0YVNvdXJjZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlcy5wdXNoKGFyZ1trZXldLnRyYW5zZm9ybShkc01hcCgodikgPT4gKHYgPyBrZXkgOiAnJykpLCBjYW5jZWxsYXRpb25Ub2tlbikpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZml4ZWQgKz0gYXJnW2tleV0gPyBrZXkgKyAnICcgOiAnJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBmaXhlZCA9IGZpeGVkLnRyaW0oKTtcbiAgICBpZiAoc291cmNlcy5sZW5ndGggfHwgbWFwcy5sZW5ndGgpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gbmV3IERhdGFTb3VyY2UoKTtcbiAgICAgICAgZnVuY3Rpb24gdXBkYXRlKCkge1xuICAgICAgICAgICAgY29uc3QgY2xhc3NlcyA9IFtmaXhlZF07XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHNvdXJjZSBvZiBzb3VyY2VzKSB7XG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoc291cmNlLnZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICBjbGFzc2VzLnB1c2goLi4uc291cmNlLnZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzZXMucHVzaChzb3VyY2UudmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAoY29uc3QgbWFwIG9mIG1hcHMpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBtYXAua2V5cygpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtYXAuZ2V0KGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzZXMucHVzaChrZXkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzdWx0LnVwZGF0ZShjbGFzc2VzLmpvaW4oJyAnKSk7XG4gICAgICAgIH1cbiAgICAgICAgdXBkYXRlKCk7XG4gICAgICAgIGZvciAoY29uc3Qgc291cmNlIG9mIHNvdXJjZXMpIHtcbiAgICAgICAgICAgIHNvdXJjZS5saXN0ZW4odXBkYXRlLCBjYW5jZWxsYXRpb25Ub2tlbik7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBtYXAgb2YgbWFwcykge1xuICAgICAgICAgICAgbWFwLmxpc3Rlbih1cGRhdGUsIGNhbmNlbGxhdGlvblRva2VuKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZpeGVkO1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBjb21iaW5lQXR0cmlidXRlKGNhbmNlbGxhdGlvblRva2VuLCAuLi5hcmdzKSB7XG4gICAgY29uc3QgY29uc3RhbnRzID0gW107XG4gICAgY29uc3Qgc291cmNlcyA9IFtdO1xuICAgIGZvciAoY29uc3QgYXR0ciBvZiBhcmdzKSB7XG4gICAgICAgIGlmICh0eXBlb2YgYXR0ciA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIGF0dHIgPT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgY29uc3RhbnRzLnB1c2goYXR0cik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGF0dHIgaW5zdGFuY2VvZiBEYXRhU291cmNlIHx8IGF0dHIgaW5zdGFuY2VvZiBEdXBsZXhEYXRhU291cmNlKSB7XG4gICAgICAgICAgICBzb3VyY2VzLnB1c2goYXR0cik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKHNvdXJjZXMubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBzb3VyY2VzWzBdLmFnZ3JlZ2F0ZShzb3VyY2VzLnNsaWNlKDEpLCAoLi4uZGF0YSkgPT4ge1xuICAgICAgICAgICAgaWYgKGNvbnN0YW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YS5jb25jYXQoY29uc3RhbnRzKS5qb2luKCcgJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YS5qb2luKCcgJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIGNhbmNlbGxhdGlvblRva2VuKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBjb25zdGFudHMuam9pbignICcpO1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBjb21iaW5lU3R5bGUoY2FuY2VsbGF0aW9uVG9rZW4sIC4uLmFyZ3MpIHtcbiAgICBsZXQgZml4ZWQgPSAnJztcbiAgICBjb25zdCBzb3VyY2VzID0gW107XG4gICAgY29uc3QgbWFwcyA9IFtdO1xuICAgIGZvciAoY29uc3QgYXR0ciBvZiBhcmdzKSB7XG4gICAgICAgIGlmICh0eXBlb2YgYXR0ciA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGZpeGVkICs9IGF0dHIgKyAnOyc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYXR0ciBpbnN0YW5jZW9mIERhdGFTb3VyY2UgfHwgYXR0ciBpbnN0YW5jZW9mIER1cGxleERhdGFTb3VyY2UpIHtcbiAgICAgICAgICAgIHNvdXJjZXMucHVzaChhdHRyKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhdHRyIGluc3RhbmNlb2YgTWFwRGF0YVNvdXJjZSkge1xuICAgICAgICAgICAgbWFwcy5wdXNoKGF0dHIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBhdHRyID09PSAnb2JqZWN0JyAmJiAhKGF0dHIgaW5zdGFuY2VvZiBEYXRhU291cmNlIHx8IGF0dHIgaW5zdGFuY2VvZiBEdXBsZXhEYXRhU291cmNlKSkge1xuICAgICAgICAgICAgLy9AdHMtaWdub3JlXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBhdHRyKSB7XG4gICAgICAgICAgICAgICAgaWYgKGF0dHJba2V5XSBpbnN0YW5jZW9mIERhdGFTb3VyY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgc291cmNlcy5wdXNoKGF0dHJba2V5XS50cmFuc2Zvcm0oKHYpID0+IGAke2NhbWVsQ2FzZVRvS2ViYWJDYXNlKGtleSl9OiR7dn07YCwgY2FuY2VsbGF0aW9uVG9rZW4pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGZpeGVkICs9IGAke2NhbWVsQ2FzZVRvS2ViYWJDYXNlKGtleSl9OiR7YXR0cltrZXldfTtgO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoc291cmNlcy5sZW5ndGggfHwgbWFwcy5sZW5ndGgpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IG5ldyBEYXRhU291cmNlKGNvbXB1dGVSZXN1bHQoZml4ZWQsIHNvdXJjZXMsIG1hcHMpKTtcbiAgICAgICAgZm9yIChjb25zdCBzb3VyY2Ugb2Ygc291cmNlcykge1xuICAgICAgICAgICAgc291cmNlLmxpc3RlbkFuZFJlcGVhdCgoY2hhbmdlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnVwZGF0ZShjb21wdXRlUmVzdWx0KGZpeGVkLCBzb3VyY2VzLCBtYXBzKSk7XG4gICAgICAgICAgICB9LCBjYW5jZWxsYXRpb25Ub2tlbik7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBtYXAgb2YgbWFwcykge1xuICAgICAgICAgICAgbWFwLmxpc3RlbkFuZFJlcGVhdCgoY2hhbmdlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnVwZGF0ZShjb21wdXRlUmVzdWx0KGZpeGVkLCBzb3VyY2VzLCBtYXBzKSk7XG4gICAgICAgICAgICB9LCBjYW5jZWxsYXRpb25Ub2tlbik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBmaXhlZDtcbiAgICB9XG59XG5mdW5jdGlvbiBjb21wdXRlUmVzdWx0KGZpeGVkLCBzb3VyY2VzLCBtYXBzKSB7XG4gICAgbGV0IHJlc3VsdCA9IGZpeGVkO1xuICAgIGZvciAoY29uc3Qgc291cmNlIG9mIHNvdXJjZXMpIHtcbiAgICAgICAgcmVzdWx0ICs9IHNvdXJjZS52YWx1ZTtcbiAgICB9XG4gICAgZm9yIChjb25zdCBtYXAgb2YgbWFwcykge1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBtYXAua2V5cygpKSB7XG4gICAgICAgICAgICBpZiAobWFwLmdldChrZXkpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ICs9IGAke2NhbWVsQ2FzZVRvS2ViYWJDYXNlKGtleSl9OiR7bWFwLmdldChrZXkpfTtgO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG5leHBvcnQgZnVuY3Rpb24gY2FtZWxDYXNlVG9LZWJhYkNhc2Uoa2V5KSB7XG4gICAgcmV0dXJuIGtleS5yZXBsYWNlKC8oW2EtejAtOV18KD89W0EtWl0pKShbQS1aXSkvZywgJyQxLSQyJykudG9Mb3dlckNhc2UoKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNsYXNzbmFtZS5qcy5tYXAiLCIvKipcbiAqIEV2ZW50IGVtaXR0ZXIgaXMgYXQgdGhlIGNvcmUgb2YgYXVydW1zIHN0cmVhbSBzeXN0ZW0uIEl0J3MgYSBiYXNpYyBwdWIgc3ViIHN0eWxlIHR5cGVzYWZlIGV2ZW50IHN5c3RlbSBvcHRpbWl6ZWQgZm9yIGhpZ2ggdXBkYXRlIHRocm91Z2hwdXRcbiAqL1xuZXhwb3J0IGNsYXNzIEV2ZW50RW1pdHRlciB7XG4gICAgaXNGaXJpbmc7XG4gICAgb25BZnRlckZpcmU7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdGhhdCBpZiBzZXQgaXMgY2FsbGVkIHdoZW4gYWxsIHN1YnNjcmlwdGlvbnMgYXJlIHJlbW92ZWRcbiAgICAgKi9cbiAgICBvbkVtcHR5O1xuICAgIHN0YXRpYyBsZWFrV2FybmluZ1RocmVzaG9sZDtcbiAgICAvKipcbiAgICAgKiBTZXQgYSBudW1iZXIgb2Ygc3Vic2NyaXB0aW9ucyB0aGF0IGFueSBldmVudCBjYW4gaGF2ZSBhdCBtb3N0IGJlZm9yZSBlbWl0dGluZyB3YXJuaW5ncy4gVGhlIHN1YnNjcmlwdGlvbnMgd2lsbCBjb250aW51ZSB3b3JraW5nIGJ1dCB0aGUgd2FybmluZ3MgY2FuIGJlIHVzZWRcbiAgICAgKiB0byB0cmFjayBwb3RlbnRpYWwgc3Vic2NyaXB0aW9uIG1lbW9yeSBsZWFrc1xuICAgICAqL1xuICAgIHN0YXRpYyBzZXRTdWJzY3JpcHRpb25MZWFrV2FybmluZ1RocmVzaG9sZChsaW1pdCkge1xuICAgICAgICBFdmVudEVtaXR0ZXIubGVha1dhcm5pbmdUaHJlc2hvbGQgPSBsaW1pdDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogcmV0dXJucyB0aGUgY291bnQgb2Ygc3Vic2NyaXB0aW9ucyBib3RoIG9uZSB0aW1lIGFuZCByZWd1bGFyXG4gICAgICovXG4gICAgZ2V0IHN1YnNjcmlwdGlvbnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN1YnNjcmliZUNoYW5uZWwubGVuZ3RoICsgdGhpcy5zdWJzY3JpYmVPbmNlQ2hhbm5lbC5sZW5ndGg7XG4gICAgfVxuICAgIHN1YnNjcmliZUNoYW5uZWw7XG4gICAgc3Vic2NyaWJlT25jZUNoYW5uZWw7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuc3Vic2NyaWJlQ2hhbm5lbCA9IFtdO1xuICAgICAgICB0aGlzLnN1YnNjcmliZU9uY2VDaGFubmVsID0gW107XG4gICAgICAgIHRoaXMub25BZnRlckZpcmUgPSBbXTtcbiAgICB9XG4gICAgdG9Bc3luY0l0ZXJhdG9yKGNhbmNlbGxhdGlvblRva2VuKSB7XG4gICAgICAgIGNvbnN0IGJ1ZmZlciA9IG5ldyBBcnJheSgpO1xuICAgICAgICBsZXQgc2luaztcbiAgICAgICAgY2FuY2VsbGF0aW9uVG9rZW4/LmFkZENhbmNlbGFibGUoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHNpbmspIHtcbiAgICAgICAgICAgICAgICBzaW5rKHtcbiAgICAgICAgICAgICAgICAgICAgZG9uZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgYnVmZmVyLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBkb25lOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnN1YnNjcmliZSgodmFsdWUpID0+IHtcbiAgICAgICAgICAgIGlmIChzaW5rKSB7XG4gICAgICAgICAgICAgICAgc2luayh7XG4gICAgICAgICAgICAgICAgICAgIGRvbmU6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHNpbmsgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBidWZmZXIucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIGRvbmU6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBjYW5jZWxsYXRpb25Ub2tlbik7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBbU3ltYm9sLmFzeW5jSXRlcmF0b3JdKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFzeW5jIG5leHQoKSB7XG4gICAgICAgICAgICAgICAgaWYgKGJ1ZmZlci5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBidWZmZXIuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNpbmsgPSByZXNvbHZlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTdWJzY3JpYmUgdG8gdGhlIGV2ZW50LiBUaGUgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgd2hlbmV2ZXIgdGhlIGV2ZW50IGZpcmVzIGFuIHVwZGF0ZVxuICAgICAqL1xuICAgIHN1YnNjcmliZShjYWxsYmFjaywgY2FuY2VsbGF0aW9uVG9rZW4pIHtcbiAgICAgICAgY29uc3QgeyBmYWNhZGUgfSA9IHRoaXMuY3JlYXRlU3Vic2NyaXB0aW9uKGNhbGxiYWNrLCB0aGlzLnN1YnNjcmliZUNoYW5uZWwsIGNhbmNlbGxhdGlvblRva2VuKTtcbiAgICAgICAgaWYgKEV2ZW50RW1pdHRlci5sZWFrV2FybmluZ1RocmVzaG9sZCAmJiB0aGlzLnN1YnNjcmliZUNoYW5uZWwubGVuZ3RoID4gRXZlbnRFbWl0dGVyLmxlYWtXYXJuaW5nVGhyZXNob2xkKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYE9ic2VydmFibGUgaGFzICR7dGhpcy5zdWJzY3JpYmVDaGFubmVsLmxlbmd0aH0gc3Vic2NyaXB0aW9ucy4gVGhpcyBjb3VsZCBwb3RlbnRpYWxseSBpbmRpY2F0ZSBhIG1lbW9yeSBsZWFrYCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhY2FkZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU3Vic2NyaWJlIHRvIHRoZSBldmVudC4gVGhlIGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHdoZW4gdGhlIGV2ZW50IG5leHQgZmlyZXMgYW4gdXBkYXRlIGFmdGVyIHdoaWNoIHRoZSBzdWJzY3JpcHRpb24gaXMgY2FuY2VsbGVkXG4gICAgICovXG4gICAgc3Vic2NyaWJlT25jZShjYWxsYmFjaywgY2FuY2VsbGF0aW9uVG9rZW4pIHtcbiAgICAgICAgY29uc3QgeyBmYWNhZGUgfSA9IHRoaXMuY3JlYXRlU3Vic2NyaXB0aW9uKGNhbGxiYWNrLCB0aGlzLnN1YnNjcmliZU9uY2VDaGFubmVsLCBjYW5jZWxsYXRpb25Ub2tlbik7XG4gICAgICAgIGlmIChFdmVudEVtaXR0ZXIubGVha1dhcm5pbmdUaHJlc2hvbGQgJiYgdGhpcy5zdWJzY3JpYmVPbmNlQ2hhbm5lbC5sZW5ndGggPiBFdmVudEVtaXR0ZXIubGVha1dhcm5pbmdUaHJlc2hvbGQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgT2JzZXJ2YWJsZSBoYXMgJHt0aGlzLnN1YnNjcmliZU9uY2VDaGFubmVsLmxlbmd0aH0gb25lIHRpbWUgc3Vic2NyaXB0aW9ucy4gVGhpcyBjb3VsZCBwb3RlbnRpYWxseSBpbmRpY2F0ZSBhIG1lbW9yeSBsZWFrYCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhY2FkZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGUgZXZlbnQgaGFzIGFueSBzdWJzY3JpcHRpb25zXG4gICAgICovXG4gICAgaGFzU3Vic2NyaXB0aW9ucygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3Vic2NyaXB0aW9ucyA+IDA7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYWxsIGN1cnJlbnRseSBhY3RpdmUgc3Vic2NyaXB0aW9ucy4gSWYgY2FsbGVkIGluIHRoZSBjYWxsYmFjayBvZiBhIHN1YnNjcmlwdGlvbiB3aWxsIGJlIGRlZmVyZWQgdW50aWwgYWZ0ZXIgdGhlIGZpcmUgZXZlbnQgZmluaXNoZWRcbiAgICAgKi9cbiAgICBjYW5jZWxBbGwoKSB7XG4gICAgICAgIGlmICghdGhpcy5pc0ZpcmluZykge1xuICAgICAgICAgICAgdGhpcy5zdWJzY3JpYmVDaGFubmVsLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICB0aGlzLnN1YnNjcmliZU9uY2VDaGFubmVsLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICB0aGlzLm9uRW1wdHk/LigpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5vbkFmdGVyRmlyZS5wdXNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnN1YnNjcmliZUNoYW5uZWwubGVuZ3RoID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLnN1YnNjcmliZU9uY2VDaGFubmVsLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkVtcHR5Py4oKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFmdGVyRmlyZSgpIHtcbiAgICAgICAgaWYgKHRoaXMub25BZnRlckZpcmUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5vbkFmdGVyRmlyZS5mb3JFYWNoKChjYikgPT4gY2IoKSk7XG4gICAgICAgICAgICB0aGlzLm9uQWZ0ZXJGaXJlLmxlbmd0aCA9IDA7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogUHVibGlzaGVzIGEgbmV3IHZhbHVlIGFsbCBzdWJzY3JpYmVycyB3aWxsIGJlIGNhbGxlZFxuICAgICAqIEVycm9ycyBpbiB0aGUgY2FsbGJhY2tzIGFyZSBjYXVnaHQgYW5kIGRlZmVycmVkIHVudGlsIGFmdGVyIGZpcmUgZmluaXNoZXMgYmVmb3JlIHRocm93aW5nIHRvIGF2b2lkIGludGVycnVwdGluZyB0aGUgcHJvcGFnYXRpb24gb2YgdGhlIGV2ZW50XG4gICAgICogdG8gYWxsIHN1YnNjcmliZXJzIHNpbXBseSBiZWNhdXNlIG9mIG9uZSBmYXVsdHkgc3Vic2NyaWJlclxuICAgICAqL1xuICAgIGZpcmUoZGF0YSkge1xuICAgICAgICBjb25zdCBsZW5ndGggPSB0aGlzLnN1YnNjcmliZUNoYW5uZWwubGVuZ3RoO1xuICAgICAgICBjb25zdCBsZW5ndGhPbmNlID0gdGhpcy5zdWJzY3JpYmVPbmNlQ2hhbm5lbC5sZW5ndGg7XG4gICAgICAgIGlmIChsZW5ndGggPT09IDAgJiYgbGVuZ3RoT25jZSA9PT0gMCkge1xuICAgICAgICAgICAgLy9DdXQgc29tZSBvdmVyaGVhZCBpbiB0aGUgY2FzZSBub3RoaW5nIGlzIGxpc3RlbmluZ1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaXNGaXJpbmcgPSB0cnVlO1xuICAgICAgICBsZXQgZXJyb3IgPSB1bmRlZmluZWQ7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdWJzY3JpYmVDaGFubmVsW2ldLmNhbGxiYWNrKGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBlcnJvciA9IGU7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdWJzY3JpYmVPbmNlQ2hhbm5lbC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aE9uY2U7IGkrKykge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3Vic2NyaWJlT25jZUNoYW5uZWxbaV0uY2FsbGJhY2soZGF0YSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGVycm9yID0gZTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnN1YnNjcmliZU9uY2VDaGFubmVsLmxlbmd0aCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pc0ZpcmluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmFmdGVyRmlyZSgpO1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNyZWF0ZVN1YnNjcmlwdGlvbihjYWxsYmFjaywgY2hhbm5lbCwgY2FuY2VsbGF0aW9uVG9rZW4pIHtcbiAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XG4gICAgICAgIGNvbnN0IHN1YnNjcmlwdGlvbiA9IHtcbiAgICAgICAgICAgIGNhbGxiYWNrXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGZhY2FkZSA9IHtcbiAgICAgICAgICAgIGNhbmNlbCgpIHtcbiAgICAgICAgICAgICAgICB0aGF0LmNhbmNlbChzdWJzY3JpcHRpb24sIGNoYW5uZWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBpZiAoY2FuY2VsbGF0aW9uVG9rZW4gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY2FuY2VsbGF0aW9uVG9rZW4uYWRkQ2FuY2VsYWJsZSgoKSA9PiB0aGF0LmNhbmNlbChzdWJzY3JpcHRpb24sIGNoYW5uZWwpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5pc0ZpcmluZykge1xuICAgICAgICAgICAgdGhpcy5vbkFmdGVyRmlyZS5wdXNoKCgpID0+IGNoYW5uZWwucHVzaChzdWJzY3JpcHRpb24pKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNoYW5uZWwucHVzaChzdWJzY3JpcHRpb24pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IHN1YnNjcmlwdGlvbiwgZmFjYWRlIH07XG4gICAgfVxuICAgIGNhbmNlbChzdWJzY3JpcHRpb24sIGNoYW5uZWwpIHtcbiAgICAgICAgbGV0IGluZGV4ID0gY2hhbm5lbC5pbmRleE9mKHN1YnNjcmlwdGlvbik7XG4gICAgICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNGaXJpbmcpIHtcbiAgICAgICAgICAgICAgICBjaGFubmVsLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmhhc1N1YnNjcmlwdGlvbnMoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uRW1wdHk/LigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMub25BZnRlckZpcmUucHVzaCgoKSA9PiB0aGlzLmNhbmNlbChzdWJzY3JpcHRpb24sIGNoYW5uZWwpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWV2ZW50X2VtaXR0ZXIuanMubWFwIiwiaW1wb3J0IHsgRGF0YVNvdXJjZSB9IGZyb20gJy4uL3N0cmVhbS9kYXRhX3NvdXJjZS5qcyc7XG5pbXBvcnQgeyBPcGVyYXRpb25UeXBlIH0gZnJvbSAnLi4vc3RyZWFtL29wZXJhdG9yX21vZGVsLmpzJztcbmltcG9ydCB7IENhbmNlbGxhdGlvblRva2VuIH0gZnJvbSAnLi9jYW5jZWxsYXRpb25fdG9rZW4uanMnO1xuY29uc3QgRklMVEVSRUQgPSBTeW1ib2woJ2ZpbHRlcmVkJyk7XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24qIHRyYW5zZm9ybUFzeW5jSXRlcmF0b3IoYXN5bmNJdGVyYXRvciwgb3BlcmF0aW9uQSwgb3BlcmF0aW9uQiwgb3BlcmF0aW9uQywgb3BlcmF0aW9uRCwgb3BlcmF0aW9uRSwgb3BlcmF0aW9uRiwgb3BlcmF0aW9uRywgb3BlcmF0aW9uSCwgb3BlcmF0aW9uSSwgb3BlcmF0aW9uSiwgb3BlcmF0aW9uSywgY2FuY2VsbGF0aW9uVG9rZW4pIHtcbiAgICBsZXQgdG9rZW47XG4gICAgY29uc3Qgb3BlcmF0aW9ucyA9IFtcbiAgICAgICAgb3BlcmF0aW9uQSxcbiAgICAgICAgb3BlcmF0aW9uQixcbiAgICAgICAgb3BlcmF0aW9uQyxcbiAgICAgICAgb3BlcmF0aW9uRCxcbiAgICAgICAgb3BlcmF0aW9uRSxcbiAgICAgICAgb3BlcmF0aW9uRixcbiAgICAgICAgb3BlcmF0aW9uRyxcbiAgICAgICAgb3BlcmF0aW9uSCxcbiAgICAgICAgb3BlcmF0aW9uSSxcbiAgICAgICAgb3BlcmF0aW9uSixcbiAgICAgICAgb3BlcmF0aW9uS1xuICAgIF0uZmlsdGVyKChlKSA9PiBlICYmIChlIGluc3RhbmNlb2YgQ2FuY2VsbGF0aW9uVG9rZW4gPyAoKHRva2VuID0gZSksIGZhbHNlKSA6IHRydWUpKTtcbiAgICBpZiAoY2FuY2VsbGF0aW9uVG9rZW4pIHtcbiAgICAgICAgdG9rZW4gPSBjYW5jZWxsYXRpb25Ub2tlbjtcbiAgICB9XG4gICAgY29uc3QgdHJhbnNmb3JtID0gYXN5bmMgKHYpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZvciAoY29uc3Qgb3BlcmF0aW9uIG9mIG9wZXJhdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKG9wZXJhdGlvbi5vcGVyYXRpb25UeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgT3BlcmF0aW9uVHlwZS5OT09QOlxuICAgICAgICAgICAgICAgICAgICBjYXNlIE9wZXJhdGlvblR5cGUuTUFQOlxuICAgICAgICAgICAgICAgICAgICAgICAgdiA9IG9wZXJhdGlvbi5vcGVyYXRpb24odik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBPcGVyYXRpb25UeXBlLk1BUF9ERUxBWV9GSUxURVI6XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0bXAgPSBhd2FpdCBvcGVyYXRpb24ub3BlcmF0aW9uKHYpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRtcC5jYW5jZWxsZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2ID0gYXdhaXQgdG1wLml0ZW07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBPcGVyYXRpb25UeXBlLkRFTEFZOlxuICAgICAgICAgICAgICAgICAgICBjYXNlIE9wZXJhdGlvblR5cGUuTUFQX0RFTEFZOlxuICAgICAgICAgICAgICAgICAgICAgICAgdiA9IGF3YWl0IG9wZXJhdGlvbi5vcGVyYXRpb24odik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBPcGVyYXRpb25UeXBlLkRFTEFZX0ZJTFRFUjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKGF3YWl0IG9wZXJhdGlvbi5vcGVyYXRpb24odikpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEZJTFRFUkVEO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgT3BlcmF0aW9uVHlwZS5GSUxURVI6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW9wZXJhdGlvbi5vcGVyYXRpb24odikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gRklMVEVSRUQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdjtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgZm9yIGF3YWl0IChjb25zdCB2IG9mIGFzeW5jSXRlcmF0b3IpIHtcbiAgICAgICAgaWYgKHRva2VuPy5pc0NhbmNlbGVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaSA9IGF3YWl0IHRyYW5zZm9ybSh2KTtcbiAgICAgICAgaWYgKGkgIT09IEZJTFRFUkVEKSB7XG4gICAgICAgICAgICB5aWVsZCBpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybjtcbn1cbmV4cG9ydCBmdW5jdGlvbiBwcm9taXNlSXRlcmF0b3IocHJvbWlzZXMsIGNhbmNlbGxhdGlvbikge1xuICAgIGxldCBwZW5kaW5nQ291bnQgPSBwcm9taXNlcy5sZW5ndGg7XG4gICAgY29uc3Qgb3V0cHV0ID0gbmV3IERhdGFTb3VyY2UoKTtcbiAgICBjYW5jZWxsYXRpb24gPSBjYW5jZWxsYXRpb24gPz8gbmV3IENhbmNlbGxhdGlvblRva2VuKCk7XG4gICAgZm9yIChjb25zdCBwcm9taXNlIG9mIHByb21pc2VzKSB7XG4gICAgICAgIHByb21pc2UudGhlbigodikgPT4ge1xuICAgICAgICAgICAgcGVuZGluZ0NvdW50LS07XG4gICAgICAgICAgICBvdXRwdXQudXBkYXRlKHtcbiAgICAgICAgICAgICAgICBzdGF0dXM6ICdmdWxmaWxsZWQnLFxuICAgICAgICAgICAgICAgIHZhbHVlOiB2XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChwZW5kaW5nQ291bnQgPT09IDApIHtcbiAgICAgICAgICAgICAgICBjYW5jZWxsYXRpb24uY2FuY2VsKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIChlKSA9PiB7XG4gICAgICAgICAgICBwZW5kaW5nQ291bnQtLTtcbiAgICAgICAgICAgIGlmIChwZW5kaW5nQ291bnQgPT09IDApIHtcbiAgICAgICAgICAgICAgICBjYW5jZWxsYXRpb24uY2FuY2VsKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvdXRwdXQudXBkYXRlKHtcbiAgICAgICAgICAgICAgICBzdGF0dXM6ICdyZWplY3RlZCcsXG4gICAgICAgICAgICAgICAgcmVhc29uOiBlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBvdXRwdXQudG9Bc3luY0l0ZXJhdG9yKGNhbmNlbGxhdGlvbik7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pdGVyYXRpb24uanMubWFwIiwiaW1wb3J0IHsgRGF0YVNvdXJjZSwgQXJyYXlEYXRhU291cmNlIH0gZnJvbSAnLi4vc3RyZWFtL2RhdGFfc291cmNlLmpzJztcbmltcG9ydCB7IER1cGxleERhdGFTb3VyY2UgfSBmcm9tICcuLi9zdHJlYW0vZHVwbGV4X2RhdGFfc291cmNlLmpzJztcbmltcG9ydCB7IE9iamVjdERhdGFTb3VyY2UgfSBmcm9tICcuLi9zdHJlYW0vb2JqZWN0X2RhdGFfc291cmNlLmpzJztcbmltcG9ydCB7IFN0cmVhbSB9IGZyb20gJy4uL3N0cmVhbS9zdHJlYW0uanMnO1xuZXhwb3J0IGZ1bmN0aW9uIGdldFZhbHVlT2Yoc291cmNlT3JQcmltaXRpdmUpIHtcbiAgICBpZiAoc291cmNlT3JQcmltaXRpdmUgaW5zdGFuY2VvZiBEYXRhU291cmNlIHx8IHNvdXJjZU9yUHJpbWl0aXZlIGluc3RhbmNlb2YgRHVwbGV4RGF0YVNvdXJjZSB8fCBzb3VyY2VPclByaW1pdGl2ZSBpbnN0YW5jZW9mIFN0cmVhbSkge1xuICAgICAgICByZXR1cm4gc291cmNlT3JQcmltaXRpdmUudmFsdWU7XG4gICAgfVxuICAgIGlmIChzb3VyY2VPclByaW1pdGl2ZSBpbnN0YW5jZW9mIEFycmF5RGF0YVNvdXJjZSkge1xuICAgICAgICByZXR1cm4gc291cmNlT3JQcmltaXRpdmUuZ2V0RGF0YSgpO1xuICAgIH1cbiAgICByZXR1cm4gc291cmNlT3JQcmltaXRpdmU7XG59XG5leHBvcnQgZnVuY3Rpb24gdW53cmFwT2JqZWN0UmVjdXJzaXZlKG9iamVjdCkge1xuICAgIGlmIChvYmplY3QgaW5zdGFuY2VvZiBEYXRhU291cmNlIHx8IG9iamVjdCBpbnN0YW5jZW9mIER1cGxleERhdGFTb3VyY2UgfHwgb2JqZWN0IGluc3RhbmNlb2YgU3RyZWFtKSB7XG4gICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICByZXR1cm4gdW53cmFwT2JqZWN0UmVjdXJzaXZlKG9iamVjdC52YWx1ZSk7XG4gICAgfVxuICAgIGlmIChvYmplY3QgaW5zdGFuY2VvZiBBcnJheURhdGFTb3VyY2UpIHtcbiAgICAgICAgLy9AdHMtaWdub3JlXG4gICAgICAgIHJldHVybiB1bndyYXBPYmplY3RSZWN1cnNpdmUob2JqZWN0LnRvQXJyYXkoKSk7XG4gICAgfVxuICAgIGlmIChvYmplY3QgaW5zdGFuY2VvZiBPYmplY3REYXRhU291cmNlKSB7XG4gICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICByZXR1cm4gdW53cmFwT2JqZWN0UmVjdXJzaXZlKG9iamVjdC5nZXREYXRhKCkpO1xuICAgIH1cbiAgICBpZiAob2JqZWN0IGluc3RhbmNlb2YgRHVwbGV4RGF0YVNvdXJjZSkge1xuICAgICAgICAvL0B0cy1pZ25vcmVcbiAgICAgICAgcmV0dXJuIHVud3JhcE9iamVjdFJlY3Vyc2l2ZShvYmplY3QudmFsdWUpO1xuICAgIH1cbiAgICBpZiAob2JqZWN0IGluc3RhbmNlb2YgU3RyZWFtKSB7XG4gICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICByZXR1cm4gdW53cmFwT2JqZWN0UmVjdXJzaXZlKG9iamVjdC52YWx1ZSk7XG4gICAgfVxuICAgIGlmIChBcnJheS5pc0FycmF5KG9iamVjdCkpIHtcbiAgICAgICAgLy9AdHMtaWdub3JlXG4gICAgICAgIHJldHVybiBvYmplY3QubWFwKHVud3JhcE9iamVjdFJlY3Vyc2l2ZSk7XG4gICAgfVxuICAgIGlmIChvYmplY3QgaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0ge307XG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIG9iamVjdCkge1xuICAgICAgICAgICAgcmVzdWx0W2tleV0gPSB1bndyYXBPYmplY3RSZWN1cnNpdmUob2JqZWN0W2tleV0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIC8vQHRzLWlnbm9yZVxuICAgIHJldHVybiBvYmplY3Q7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zb3VyY2VzLmpzLm1hcCIsImltcG9ydCB7IEFycmF5RGF0YVNvdXJjZSwgU2V0RGF0YVNvdXJjZSB9IGZyb20gJy4uL3N0cmVhbS9kYXRhX3NvdXJjZS5qcyc7XG5pbXBvcnQgeyBEdXBsZXhEYXRhU291cmNlIH0gZnJvbSAnLi4vc3RyZWFtL2R1cGxleF9kYXRhX3NvdXJjZS5qcyc7XG5pbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICcuL2V2ZW50X2VtaXR0ZXIuanMnO1xuaW1wb3J0IHsgVXJsU3RvcmFnZSB9IGZyb20gJy4vdXJsX3N0b3JhZ2UuanMnO1xuZXhwb3J0IGNsYXNzIFN0b3JhZ2VTdHJlYW0ge1xuICAgIHN0b3JhZ2VBUEk7XG4gICAgb25DaGFuZ2U7XG4gICAgb3JpZ2luYWxTZXRJdGVtO1xuICAgIG9yaWdpbmFsUmVtb3ZlSXRlbTtcbiAgICBjb25zdHJ1Y3RvcihzdG9yYWdlQVBJKSB7XG4gICAgICAgIHRoaXMub25DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIHRoaXMuc3RvcmFnZUFQSSA9IHN0b3JhZ2VBUEk7XG4gICAgICAgIHRoaXMub2JzZXJ2ZVN0b3JhZ2VBUEkoc3RvcmFnZUFQSSk7XG4gICAgfVxuICAgIG9ic2VydmVTdG9yYWdlQVBJKHN0b3JhZ2VBUEkpIHtcbiAgICAgICAgdGhpcy5vcmlnaW5hbFNldEl0ZW0gPSBzdG9yYWdlQVBJLnNldEl0ZW0uYmluZChzdG9yYWdlQVBJKTtcbiAgICAgICAgc3RvcmFnZUFQSS5zZXRJdGVtID0gKGtleSwgdmFsdWUpID0+IHtcbiAgICAgICAgICAgIHRoaXMub3JpZ2luYWxTZXRJdGVtKGtleSwgdmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5vbkNoYW5nZS5maXJlKHsga2V5LCB2YWx1ZSB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5vcmlnaW5hbFJlbW92ZUl0ZW0gPSBzdG9yYWdlQVBJLnJlbW92ZUl0ZW0uYmluZChzdG9yYWdlQVBJKTtcbiAgICAgICAgc3RvcmFnZUFQSS5yZW1vdmVJdGVtID0gKGtleSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5vcmlnaW5hbFJlbW92ZUl0ZW0oa2V5KTtcbiAgICAgICAgICAgIHRoaXMub25DaGFuZ2UuZmlyZSh7IGtleSwgdmFsdWU6IHVuZGVmaW5lZCB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3Qgb3JpZ2luYWxDbGVhciA9IHN0b3JhZ2VBUEkuY2xlYXIuYmluZChzdG9yYWdlQVBJKTtcbiAgICAgICAgc3RvcmFnZUFQSS5jbGVhciA9ICgpID0+IHtcbiAgICAgICAgICAgIG9yaWdpbmFsQ2xlYXIoKTtcbiAgICAgICAgICAgIHRoaXMub25DaGFuZ2UuZmlyZSh7IGtleTogJyonLCB2YWx1ZTogdW5kZWZpbmVkIH0pO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBsaXN0ZW5Bc1N0cmluZyhrZXksIGRlZmF1bHRWYWx1ZSwgY2FuY2VsbGF0aW9uVG9rZW4pIHtcbiAgICAgICAgY29uc3Qgc3RyZWFtID0gbmV3IER1cGxleERhdGFTb3VyY2UoKS53aXRoSW5pdGlhbCh0aGlzLnN0b3JhZ2VBUEkuZ2V0SXRlbShrZXkpID8/IGRlZmF1bHRWYWx1ZSk7XG4gICAgICAgIHRoaXMub25DaGFuZ2Uuc3Vic2NyaWJlKChlKSA9PiB7XG4gICAgICAgICAgICBpZiAoZS5rZXkgPT09IGtleSB8fCBlLmtleSA9PT0gJyonKSB7XG4gICAgICAgICAgICAgICAgc3RyZWFtLnVwZGF0ZURvd25zdHJlYW0oZS52YWx1ZSA/PyBkZWZhdWx0VmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBjYW5jZWxsYXRpb25Ub2tlbik7XG4gICAgICAgIHN0cmVhbS5saXN0ZW5VcHN0cmVhbSgodikgPT4ge1xuICAgICAgICAgICAgaWYgKHYgPT09IHVuZGVmaW5lZCB8fCB2ID09PSBkZWZhdWx0VmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9yaWdpbmFsUmVtb3ZlSXRlbShrZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vcmlnaW5hbFNldEl0ZW0oa2V5LCB2KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgY2FuY2VsbGF0aW9uVG9rZW4pO1xuICAgICAgICByZXR1cm4gc3RyZWFtO1xuICAgIH1cbiAgICBsaXN0ZW5Bc051bWJlcihrZXksIGRlZmF1bHRWYWx1ZSwgY2FuY2VsbGF0aW9uVG9rZW4sIHJhZGl4ID0gMTApIHtcbiAgICAgICAgY29uc3Qgc3RyZWFtID0gbmV3IER1cGxleERhdGFTb3VyY2UoKS53aXRoSW5pdGlhbCh0aGlzLnN0b3JhZ2VBUEkuZ2V0SXRlbShrZXkpID8gcGFyc2VJbnQodGhpcy5zdG9yYWdlQVBJLmdldEl0ZW0oa2V5KSwgcmFkaXgpIDogZGVmYXVsdFZhbHVlKTtcbiAgICAgICAgdGhpcy5vbkNoYW5nZS5zdWJzY3JpYmUoKGUpID0+IHtcbiAgICAgICAgICAgIGlmIChlLmtleSA9PT0ga2V5IHx8IGUua2V5ID09PSAnKicpIHtcbiAgICAgICAgICAgICAgICBzdHJlYW0udXBkYXRlRG93bnN0cmVhbShlLnZhbHVlICE9IHVuZGVmaW5lZCA/IHBhcnNlSW50KGUudmFsdWUsIHJhZGl4KSA6IGRlZmF1bHRWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIGNhbmNlbGxhdGlvblRva2VuKTtcbiAgICAgICAgc3RyZWFtLmxpc3RlblVwc3RyZWFtKCh2KSA9PiB7XG4gICAgICAgICAgICBpZiAodiA9PT0gdW5kZWZpbmVkIHx8IHYgPT09IGRlZmF1bHRWYWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMub3JpZ2luYWxSZW1vdmVJdGVtKGtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9yaWdpbmFsU2V0SXRlbShrZXksIHYudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIGNhbmNlbGxhdGlvblRva2VuKTtcbiAgICAgICAgcmV0dXJuIHN0cmVhbTtcbiAgICB9XG4gICAgbGlzdGVuQXNEYXRlKGtleSwgZGVmYXVsdFZhbHVlLCBjYW5jZWxsYXRpb25Ub2tlbikge1xuICAgICAgICBjb25zdCBzdHJlYW0gPSBuZXcgRHVwbGV4RGF0YVNvdXJjZSgpLndpdGhJbml0aWFsKHRoaXMuc3RvcmFnZUFQSS5nZXRJdGVtKGtleSkgPyBuZXcgRGF0ZSh0aGlzLnN0b3JhZ2VBUEkuZ2V0SXRlbShrZXkpKSA6IGRlZmF1bHRWYWx1ZSk7XG4gICAgICAgIHRoaXMub25DaGFuZ2Uuc3Vic2NyaWJlKChlKSA9PiB7XG4gICAgICAgICAgICBpZiAoZS5rZXkgPT09IGtleSB8fCBlLmtleSA9PT0gJyonKSB7XG4gICAgICAgICAgICAgICAgc3RyZWFtLnVwZGF0ZURvd25zdHJlYW0oZS52YWx1ZSAhPSB1bmRlZmluZWQgPyBuZXcgRGF0ZShlLnZhbHVlKSA6IGRlZmF1bHRWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIGNhbmNlbGxhdGlvblRva2VuKTtcbiAgICAgICAgc3RyZWFtLmxpc3RlblVwc3RyZWFtKCh2KSA9PiB7XG4gICAgICAgICAgICBpZiAodiA9PT0gdW5kZWZpbmVkIHx8IHYgPT09IGRlZmF1bHRWYWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMub3JpZ2luYWxSZW1vdmVJdGVtKGtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9yaWdpbmFsU2V0SXRlbShrZXksIHYudG9KU09OKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBjYW5jZWxsYXRpb25Ub2tlbik7XG4gICAgICAgIHJldHVybiBzdHJlYW07XG4gICAgfVxuICAgIGxpc3RlbkFzQm9vbGVhbihrZXksIGRlZmF1bHRWYWx1ZSwgY2FuY2VsbGF0aW9uVG9rZW4pIHtcbiAgICAgICAgY29uc3Qgc3RyZWFtID0gbmV3IER1cGxleERhdGFTb3VyY2UoKS53aXRoSW5pdGlhbCh0aGlzLnN0b3JhZ2VBUEkuZ2V0SXRlbShrZXkpID8gdGhpcy5zdG9yYWdlQVBJLmdldEl0ZW0oa2V5KSA9PT0gJ3RydWUnIDogZGVmYXVsdFZhbHVlKTtcbiAgICAgICAgdGhpcy5vbkNoYW5nZS5zdWJzY3JpYmUoKGUpID0+IHtcbiAgICAgICAgICAgIGlmIChlLmtleSA9PT0ga2V5IHx8IGUua2V5ID09PSAnKicpIHtcbiAgICAgICAgICAgICAgICBzdHJlYW0udXBkYXRlRG93bnN0cmVhbShlLnZhbHVlICE9IHVuZGVmaW5lZCA/IGUudmFsdWUgPT09ICd0cnVlJyA6IGRlZmF1bHRWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIGNhbmNlbGxhdGlvblRva2VuKTtcbiAgICAgICAgc3RyZWFtLmxpc3RlblVwc3RyZWFtKCh2KSA9PiB7XG4gICAgICAgICAgICBpZiAodiA9PT0gdW5kZWZpbmVkIHx8IHYgPT09IGRlZmF1bHRWYWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMub3JpZ2luYWxSZW1vdmVJdGVtKGtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9yaWdpbmFsU2V0SXRlbShrZXksIHYudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIGNhbmNlbGxhdGlvblRva2VuKTtcbiAgICAgICAgcmV0dXJuIHN0cmVhbTtcbiAgICB9XG4gICAgLy8gU2luY2Ugb2JqZWN0cyBjYW4gYmUgbXV0YWJsZSBhIHByb3ZpZGVyIGNhbiBiZSB1c2VkIHRvIHJlZ2VuZXJhdGUgdGhlIG9iamVjdCBvbiBlYWNoIHVzZSBvZiB0aGUgZGVmYXVsdCB2YWx1ZVxuICAgIGxpc3RlbkFzT2JqZWN0KGtleSwgZGVmYXVsdFZhbHVlT3JQcm92aWRlciwgY2FuY2VsbGF0aW9uVG9rZW4pIHtcbiAgICAgICAgY29uc3Qgc3RyZWFtID0gbmV3IER1cGxleERhdGFTb3VyY2UoKS53aXRoSW5pdGlhbCh0aGlzLnN0b3JhZ2VBUEkuZ2V0SXRlbShrZXkpXG4gICAgICAgICAgICA/IEpTT04ucGFyc2UodGhpcy5zdG9yYWdlQVBJLmdldEl0ZW0oa2V5KSlcbiAgICAgICAgICAgIDogdHlwZW9mIGRlZmF1bHRWYWx1ZU9yUHJvdmlkZXIgPT09ICdmdW5jdGlvbidcbiAgICAgICAgICAgICAgICA/IGRlZmF1bHRWYWx1ZU9yUHJvdmlkZXIoKVxuICAgICAgICAgICAgICAgIDogZGVmYXVsdFZhbHVlT3JQcm92aWRlcik7XG4gICAgICAgIHRoaXMub25DaGFuZ2Uuc3Vic2NyaWJlKChlKSA9PiB7XG4gICAgICAgICAgICBpZiAoZS5rZXkgPT09IGtleSB8fCBlLmtleSA9PT0gJyonKSB7XG4gICAgICAgICAgICAgICAgc3RyZWFtLnVwZGF0ZURvd25zdHJlYW0oZS52YWx1ZSAhPSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICAgICAgPyBKU09OLnBhcnNlKGUudmFsdWUpXG4gICAgICAgICAgICAgICAgICAgIDogdHlwZW9mIGRlZmF1bHRWYWx1ZU9yUHJvdmlkZXIgPT09ICdmdW5jdGlvbidcbiAgICAgICAgICAgICAgICAgICAgICAgID8gZGVmYXVsdFZhbHVlT3JQcm92aWRlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICA6IGRlZmF1bHRWYWx1ZU9yUHJvdmlkZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBjYW5jZWxsYXRpb25Ub2tlbik7XG4gICAgICAgIHN0cmVhbS5saXN0ZW5VcHN0cmVhbSgodikgPT4ge1xuICAgICAgICAgICAgaWYgKHYgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMub3JpZ2luYWxSZW1vdmVJdGVtKGtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9yaWdpbmFsU2V0SXRlbShrZXksIEpTT04uc3RyaW5naWZ5KHYpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgY2FuY2VsbGF0aW9uVG9rZW4pO1xuICAgICAgICByZXR1cm4gc3RyZWFtO1xuICAgIH1cbiAgICBsaXN0ZW5Bc0VudW0oa2V5LCBkZWZhdWx0VmFsdWUsIGNhbmNlbGxhdGlvblRva2VuKSB7XG4gICAgICAgIGNvbnN0IHN0cmVhbSA9IG5ldyBEdXBsZXhEYXRhU291cmNlKCkud2l0aEluaXRpYWwodGhpcy5zdG9yYWdlQVBJLmdldEl0ZW0oa2V5KSA/PyBkZWZhdWx0VmFsdWUpO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlLnN1YnNjcmliZSgoZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGUua2V5ID09PSBrZXkgfHwgZS5rZXkgPT09ICcqJykge1xuICAgICAgICAgICAgICAgIHN0cmVhbS51cGRhdGVEb3duc3RyZWFtKGUudmFsdWUgIT0gdW5kZWZpbmVkID8gZS52YWx1ZSA6IGRlZmF1bHRWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIGNhbmNlbGxhdGlvblRva2VuKTtcbiAgICAgICAgc3RyZWFtLmxpc3RlblVwc3RyZWFtKCh2KSA9PiB7XG4gICAgICAgICAgICBpZiAodiA9PT0gdW5kZWZpbmVkIHx8IHYgPT09IGRlZmF1bHRWYWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMub3JpZ2luYWxSZW1vdmVJdGVtKGtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9yaWdpbmFsU2V0SXRlbShrZXksIHYudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIGNhbmNlbGxhdGlvblRva2VuKTtcbiAgICAgICAgcmV0dXJuIHN0cmVhbTtcbiAgICB9XG4gICAgbGlzdGVuQXNBcnJheShrZXksIGNhbmNlbGxhdGlvblRva2VuKSB7XG4gICAgICAgIGNvbnN0IHN0cmVhbSA9IG5ldyBBcnJheURhdGFTb3VyY2UoSlNPTi5wYXJzZSh0aGlzLnN0b3JhZ2VBUEkuZ2V0SXRlbShrZXkpID8/ICdbXScpKTtcbiAgICAgICAgdGhpcy5vbkNoYW5nZS5zdWJzY3JpYmUoKGUpID0+IHtcbiAgICAgICAgICAgIGlmIChlLmtleSA9PT0ga2V5IHx8IGUua2V5ID09PSAnKicpIHtcbiAgICAgICAgICAgICAgICBzdHJlYW0ubWVyZ2UoZS52YWx1ZSAhPSB1bmRlZmluZWQgPyBKU09OLnBhcnNlKGUudmFsdWUpIDogW10pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBjYW5jZWxsYXRpb25Ub2tlbik7XG4gICAgICAgIHN0cmVhbS5saXN0ZW4oKHYpID0+IHtcbiAgICAgICAgICAgIHRoaXMub3JpZ2luYWxTZXRJdGVtKGtleSwgSlNPTi5zdHJpbmdpZnkodi5uZXdTdGF0ZSkpO1xuICAgICAgICB9LCBjYW5jZWxsYXRpb25Ub2tlbik7XG4gICAgICAgIHJldHVybiBzdHJlYW07XG4gICAgfVxuICAgIGxpc3RlbkFzU2V0KGtleSwgY2FuY2VsbGF0aW9uVG9rZW4pIHtcbiAgICAgICAgY29uc3Qgc3RyZWFtID0gbmV3IFNldERhdGFTb3VyY2UoSlNPTi5wYXJzZSh0aGlzLnN0b3JhZ2VBUEkuZ2V0SXRlbShrZXkpID8/ICdbXScpKTtcbiAgICAgICAgdGhpcy5vbkNoYW5nZS5zdWJzY3JpYmUoKGUpID0+IHtcbiAgICAgICAgICAgIGlmIChlLmtleSA9PT0ga2V5IHx8IGUua2V5ID09PSAnKicpIHtcbiAgICAgICAgICAgICAgICBzdHJlYW0ubWVyZ2UoZS52YWx1ZSAhPSB1bmRlZmluZWQgPyBKU09OLnBhcnNlKGUudmFsdWUpIDogW10pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBjYW5jZWxsYXRpb25Ub2tlbik7XG4gICAgICAgIHN0cmVhbS5saXN0ZW4oKHYpID0+IHtcbiAgICAgICAgICAgIHRoaXMub3JpZ2luYWxTZXRJdGVtKGtleSwgSlNPTi5zdHJpbmdpZnkoc3RyZWFtLnRvQXJyYXkoKSkpO1xuICAgICAgICB9LCBjYW5jZWxsYXRpb25Ub2tlbik7XG4gICAgICAgIHJldHVybiBzdHJlYW07XG4gICAgfVxufVxuZXhwb3J0IGxldCBsb2NhbFN0b3JhZ2VTdHJlYW07XG5pZiAodHlwZW9mIGxvY2FsU3RvcmFnZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBsb2NhbFN0b3JhZ2VTdHJlYW0gPSBuZXcgU3RvcmFnZVN0cmVhbShsb2NhbFN0b3JhZ2UpO1xufVxuZXhwb3J0IGxldCBzZXNzaW9uU3RvcmFnZVN0cmVhbTtcbmlmICh0eXBlb2Ygc2Vzc2lvblN0b3JhZ2UgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgc2Vzc2lvblN0b3JhZ2VTdHJlYW0gPSBuZXcgU3RvcmFnZVN0cmVhbShzZXNzaW9uU3RvcmFnZSk7XG59XG5leHBvcnQgbGV0IHVybFN0b3JhZ2VTdHJlYW07XG5pZiAodHlwZW9mIGxvY2F0aW9uICE9PSAndW5kZWZpbmVkJykge1xuICAgIHVybFN0b3JhZ2VTdHJlYW0gPSBuZXcgU3RvcmFnZVN0cmVhbShuZXcgVXJsU3RvcmFnZSgpKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXN0b3JhZ2Vfc3RyZWFtLmpzLm1hcCIsImltcG9ydCB7IEFycmF5RGF0YVNvdXJjZSwgRGF0YVNvdXJjZSB9IGZyb20gJy4uL3N0cmVhbS9kYXRhX3NvdXJjZS5qcyc7XG5leHBvcnQgZnVuY3Rpb24gcmVzb2x2ZUNoaWxkcmVuKGNoaWxkcmVuLCBjYW5jZWxsYXRpb25Ub2tlbiwgdmFsaWRhdGlvbikge1xuICAgIGNvbnN0IGNodW5rcyA9IHByb2Nlc3MoY2hpbGRyZW4pO1xuICAgIGNvbnN0IHJlc3VsdCA9IEFycmF5RGF0YVNvdXJjZS5mcm9tTXVsdGlwbGVTb3VyY2VzKGNodW5rcywgY2FuY2VsbGF0aW9uVG9rZW4pO1xuICAgIGlmICh2YWxpZGF0aW9uKSB7XG4gICAgICAgIHJlc3VsdC5saXN0ZW4oKGMpID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCAoYy5vcGVyYXRpb24pIHtcbiAgICAgICAgICAgICAgICBjYXNlICdhZGQnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ3JlcGxhY2UnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ21lcmdlJzpcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIGMuaXRlbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb24oaXRlbSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIGNhbmNlbGxhdGlvblRva2VuKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIHByb2Nlc3MoY2hpbGRyZW4pIHtcbiAgICBjb25zdCBjaHVua3MgPSBbXTtcbiAgICBsZXQgY3VycmVudENodW5rID0gW107XG4gICAgZm9yIChjb25zdCBjaGlsZCBvZiBjaGlsZHJlbikge1xuICAgICAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBBcnJheURhdGFTb3VyY2UpIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50Q2h1bmsubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgY2h1bmtzLnB1c2goY3VycmVudENodW5rKTtcbiAgICAgICAgICAgICAgICBjdXJyZW50Q2h1bmsubGVuZ3RoID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNodW5rcy5wdXNoKGNoaWxkKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjaGlsZCBpbnN0YW5jZW9mIERhdGFTb3VyY2UpIHtcbiAgICAgICAgICAgIGN1cnJlbnRDaHVuay5wdXNoKGNoaWxkKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjaGlsZCBpbnN0YW5jZW9mIERhdGFTb3VyY2UpIHtcbiAgICAgICAgICAgIGN1cnJlbnRDaHVuay5wdXNoKGNoaWxkKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjaGlsZCBpbnN0YW5jZW9mIERhdGFTb3VyY2UpIHtcbiAgICAgICAgICAgIGN1cnJlbnRDaHVuay5wdXNoKGNoaWxkKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KGNoaWxkKSkge1xuICAgICAgICAgICAgY2h1bmtzLnB1c2goLi4ucHJvY2VzcyhjaGlsZCkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY3VycmVudENodW5rLnB1c2goY2hpbGQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChjdXJyZW50Q2h1bmsubGVuZ3RoKSB7XG4gICAgICAgIGNodW5rcy5wdXNoKGN1cnJlbnRDaHVuayk7XG4gICAgfVxuICAgIHJldHVybiBjaHVua3M7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD10cmFuc2NsdXNpb24uanMubWFwIiwiZXhwb3J0IGNsYXNzIFVybFN0b3JhZ2Uge1xuICAgIHN0YXRlO1xuICAgIG9yaWdpbmFsUmVwbGFjZVN0YXRlO1xuICAgIHVwZGF0aW5nID0gZmFsc2U7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7fTtcbiAgICAgICAgdGhpcy5vYnNlcnZlVXJsKCk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdoYXNoY2hhbmdlJywgKCkgPT4gdGhpcy5jaGVja1VwZGF0ZSgpKTtcbiAgICAgICAgdGhpcy5jaGVja1VwZGF0ZSgpO1xuICAgIH1cbiAgICBvYnNlcnZlVXJsKCkge1xuICAgICAgICB0aGlzLm9yaWdpbmFsUmVwbGFjZVN0YXRlID0gaGlzdG9yeS5yZXBsYWNlU3RhdGU7XG4gICAgICAgIGhpc3RvcnkucmVwbGFjZVN0YXRlID0gKC4uLmFyZ3MpID0+IHtcbiAgICAgICAgICAgIHRoaXMub3JpZ2luYWxSZXBsYWNlU3RhdGUuYXBwbHkoaGlzdG9yeSwgYXJncyk7XG4gICAgICAgICAgICB0aGlzLmNoZWNrVXBkYXRlKCk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIGdldCBsZW5ndGgoKSB7XG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLnN0YXRlKS5sZW5ndGg7XG4gICAgfVxuICAgIGNsZWFyKCkge1xuICAgICAgICB0aGlzLnN0YXRlID0ge307XG4gICAgICAgIHRoaXMuYXBwbHlTdGF0ZVRvVXJsKCk7XG4gICAgfVxuICAgIGdldEl0ZW0oa2V5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlW2tleV07XG4gICAgfVxuICAgIGtleShpbmRleCkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcy5zdGF0ZSlbaW5kZXhdO1xuICAgIH1cbiAgICByZW1vdmVJdGVtKGtleSkge1xuICAgICAgICBkZWxldGUgdGhpcy5zdGF0ZVtrZXldO1xuICAgICAgICBpZiAoIXRoaXMudXBkYXRpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuYXBwbHlTdGF0ZVRvVXJsKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2V0SXRlbShrZXksIHZhbHVlKSB7XG4gICAgICAgIHRoaXMuc3RhdGVba2V5XSA9IHZhbHVlO1xuICAgICAgICBpZiAoIXRoaXMudXBkYXRpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuYXBwbHlTdGF0ZVRvVXJsKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXBwbHlTdGF0ZVRvVXJsKCkge1xuICAgICAgICAvLyBUYWtlIHRoZSBzdGF0ZSBhbmQgdHVybiBpdCBpbnRvIGEgcGFyYW1ldGVyIHN0cmluZyBhbmQgc2V0IGl0IGFzIHRoZSB1cmxcbiAgICAgICAgY29uc3QgdXJsID0gbmV3IFVSTChsb2NhdGlvbi5ocmVmKTtcbiAgICAgICAgZm9yIChjb25zdCBwYXJhbSBvZiB1cmwuc2VhcmNoUGFyYW1zLmVudHJpZXMoKSkge1xuICAgICAgICAgICAgdXJsLnNlYXJjaFBhcmFtcy5kZWxldGUocGFyYW1bMF0pO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuc3RhdGUpIHtcbiAgICAgICAgICAgIHVybC5zZWFyY2hQYXJhbXMuc2V0KGtleSwgdGhpcy5zdGF0ZVtrZXldKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm9yaWdpbmFsUmVwbGFjZVN0YXRlKHt9LCAnJywgdXJsLmhyZWYpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBGb3IgdXJsIGNoYW5nZXMgdGhhdCBhcmUgbm90IG9ic2VydmFibGUgc3VjaCBhcyBwYXJlbnQgd2luZG93IGNoYW5nZXNcbiAgICAgKi9cbiAgICByZWZyZXNoKCkge1xuICAgICAgICB0aGlzLmNoZWNrVXBkYXRlKCk7XG4gICAgfVxuICAgIGNoZWNrVXBkYXRlKCkge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBPYmplY3QuZnJvbUVudHJpZXMobmV3IFVSTChsb2NhdGlvbi5ocmVmKS5zZWFyY2hQYXJhbXMpO1xuICAgICAgICB0aGlzLnVwZGF0aW5nID0gdHJ1ZTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHRba2V5XSAhPT0gdGhpcy5zdGF0ZVtrZXldKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0SXRlbShrZXksIHJlc3VsdFtrZXldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLnN0YXRlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdFtrZXldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVJdGVtKGtleSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGluZyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dXJsX3N0b3JhZ2UuanMubWFwIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZiA9IHt9O1xuLy8gVGhpcyBmaWxlIGNvbnRhaW5zIG9ubHkgdGhlIGVudHJ5IGNodW5rLlxuLy8gVGhlIGNodW5rIGxvYWRpbmcgZnVuY3Rpb24gZm9yIGFkZGl0aW9uYWwgY2h1bmtzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmUgPSAoY2h1bmtJZCkgPT4ge1xuXHRyZXR1cm4gUHJvbWlzZS5hbGwoT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5mKS5yZWR1Y2UoKHByb21pc2VzLCBrZXkpID0+IHtcblx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmZba2V5XShjaHVua0lkLCBwcm9taXNlcyk7XG5cdFx0cmV0dXJuIHByb21pc2VzO1xuXHR9LCBbXSkpO1xufTsiLCIvLyBUaGlzIGZ1bmN0aW9uIGFsbG93IHRvIHJlZmVyZW5jZSBhc3luYyBjaHVua3Ncbl9fd2VicGFja19yZXF1aXJlX18udSA9IChjaHVua0lkKSA9PiB7XG5cdC8vIHJldHVybiB1cmwgZm9yIGZpbGVuYW1lcyBiYXNlZCBvbiB0ZW1wbGF0ZVxuXHRyZXR1cm4gXCJzdGF0aWMvanMvXCIgKyBjaHVua0lkICsgXCIuYnVuZGxlLmpzXCI7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCJ2YXIgaW5Qcm9ncmVzcyA9IHt9O1xudmFyIGRhdGFXZWJwYWNrUHJlZml4ID0gXCJhdXJ1bS5vcmc6XCI7XG4vLyBsb2FkU2NyaXB0IGZ1bmN0aW9uIHRvIGxvYWQgYSBzY3JpcHQgdmlhIHNjcmlwdCB0YWdcbl9fd2VicGFja19yZXF1aXJlX18ubCA9ICh1cmwsIGRvbmUsIGtleSwgY2h1bmtJZCkgPT4ge1xuXHRpZihpblByb2dyZXNzW3VybF0pIHsgaW5Qcm9ncmVzc1t1cmxdLnB1c2goZG9uZSk7IHJldHVybjsgfVxuXHR2YXIgc2NyaXB0LCBuZWVkQXR0YWNoO1xuXHRpZihrZXkgIT09IHVuZGVmaW5lZCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHNjcmlwdHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBzID0gc2NyaXB0c1tpXTtcblx0XHRcdGlmKHMuZ2V0QXR0cmlidXRlKFwic3JjXCIpID09IHVybCB8fCBzLmdldEF0dHJpYnV0ZShcImRhdGEtd2VicGFja1wiKSA9PSBkYXRhV2VicGFja1ByZWZpeCArIGtleSkgeyBzY3JpcHQgPSBzOyBicmVhazsgfVxuXHRcdH1cblx0fVxuXHRpZighc2NyaXB0KSB7XG5cdFx0bmVlZEF0dGFjaCA9IHRydWU7XG5cdFx0c2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG5cblx0XHRzY3JpcHQuY2hhcnNldCA9ICd1dGYtOCc7XG5cdFx0c2NyaXB0LnRpbWVvdXQgPSAxMjA7XG5cdFx0aWYgKF9fd2VicGFja19yZXF1aXJlX18ubmMpIHtcblx0XHRcdHNjcmlwdC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKTtcblx0XHR9XG5cdFx0c2NyaXB0LnNldEF0dHJpYnV0ZShcImRhdGEtd2VicGFja1wiLCBkYXRhV2VicGFja1ByZWZpeCArIGtleSk7XG5cdFx0c2NyaXB0LnNyYyA9IHVybDtcblx0fVxuXHRpblByb2dyZXNzW3VybF0gPSBbZG9uZV07XG5cdHZhciBvblNjcmlwdENvbXBsZXRlID0gKHByZXYsIGV2ZW50KSA9PiB7XG5cdFx0Ly8gYXZvaWQgbWVtIGxlYWtzIGluIElFLlxuXHRcdHNjcmlwdC5vbmVycm9yID0gc2NyaXB0Lm9ubG9hZCA9IG51bGw7XG5cdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXHRcdHZhciBkb25lRm5zID0gaW5Qcm9ncmVzc1t1cmxdO1xuXHRcdGRlbGV0ZSBpblByb2dyZXNzW3VybF07XG5cdFx0c2NyaXB0LnBhcmVudE5vZGUgJiYgc2NyaXB0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc2NyaXB0KTtcblx0XHRkb25lRm5zICYmIGRvbmVGbnMuZm9yRWFjaCgoZm4pID0+IChmbihldmVudCkpKTtcblx0XHRpZihwcmV2KSByZXR1cm4gcHJldihldmVudCk7XG5cdH07XG5cdHZhciB0aW1lb3V0ID0gc2V0VGltZW91dChvblNjcmlwdENvbXBsZXRlLmJpbmQobnVsbCwgdW5kZWZpbmVkLCB7IHR5cGU6ICd0aW1lb3V0JywgdGFyZ2V0OiBzY3JpcHQgfSksIDEyMDAwMCk7XG5cdHNjcmlwdC5vbmVycm9yID0gb25TY3JpcHRDb21wbGV0ZS5iaW5kKG51bGwsIHNjcmlwdC5vbmVycm9yKTtcblx0c2NyaXB0Lm9ubG9hZCA9IG9uU2NyaXB0Q29tcGxldGUuYmluZChudWxsLCBzY3JpcHQub25sb2FkKTtcblx0bmVlZEF0dGFjaCAmJiBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG59OyIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiLi9cIjsiLCIvLyBubyBiYXNlVVJJXG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJhcHBcIjogMFxufTtcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5mLmogPSAoY2h1bmtJZCwgcHJvbWlzZXMpID0+IHtcblx0XHQvLyBKU09OUCBjaHVuayBsb2FkaW5nIGZvciBqYXZhc2NyaXB0XG5cdFx0dmFyIGluc3RhbGxlZENodW5rRGF0YSA9IF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpID8gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdIDogdW5kZWZpbmVkO1xuXHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSAhPT0gMCkgeyAvLyAwIG1lYW5zIFwiYWxyZWFkeSBpbnN0YWxsZWRcIi5cblxuXHRcdFx0Ly8gYSBQcm9taXNlIG1lYW5zIFwiY3VycmVudGx5IGxvYWRpbmdcIi5cblx0XHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSkge1xuXHRcdFx0XHRwcm9taXNlcy5wdXNoKGluc3RhbGxlZENodW5rRGF0YVsyXSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZih0cnVlKSB7IC8vIGFsbCBjaHVua3MgaGF2ZSBKU1xuXHRcdFx0XHRcdC8vIHNldHVwIFByb21pc2UgaW4gY2h1bmsgY2FjaGVcblx0XHRcdFx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IChpbnN0YWxsZWRDaHVua0RhdGEgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSBbcmVzb2x2ZSwgcmVqZWN0XSkpO1xuXHRcdFx0XHRcdHByb21pc2VzLnB1c2goaW5zdGFsbGVkQ2h1bmtEYXRhWzJdID0gcHJvbWlzZSk7XG5cblx0XHRcdFx0XHQvLyBzdGFydCBjaHVuayBsb2FkaW5nXG5cdFx0XHRcdFx0dmFyIHVybCA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIF9fd2VicGFja19yZXF1aXJlX18udShjaHVua0lkKTtcblx0XHRcdFx0XHQvLyBjcmVhdGUgZXJyb3IgYmVmb3JlIHN0YWNrIHVud291bmQgdG8gZ2V0IHVzZWZ1bCBzdGFja3RyYWNlIGxhdGVyXG5cdFx0XHRcdFx0dmFyIGVycm9yID0gbmV3IEVycm9yKCk7XG5cdFx0XHRcdFx0dmFyIGxvYWRpbmdFbmRlZCA9IChldmVudCkgPT4ge1xuXHRcdFx0XHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkpIHtcblx0XHRcdFx0XHRcdFx0aW5zdGFsbGVkQ2h1bmtEYXRhID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuXHRcdFx0XHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEgIT09IDApIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IHVuZGVmaW5lZDtcblx0XHRcdFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhKSB7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIGVycm9yVHlwZSA9IGV2ZW50ICYmIChldmVudC50eXBlID09PSAnbG9hZCcgPyAnbWlzc2luZycgOiBldmVudC50eXBlKTtcblx0XHRcdFx0XHRcdFx0XHR2YXIgcmVhbFNyYyA9IGV2ZW50ICYmIGV2ZW50LnRhcmdldCAmJiBldmVudC50YXJnZXQuc3JjO1xuXHRcdFx0XHRcdFx0XHRcdGVycm9yLm1lc3NhZ2UgPSAnTG9hZGluZyBjaHVuayAnICsgY2h1bmtJZCArICcgZmFpbGVkLlxcbignICsgZXJyb3JUeXBlICsgJzogJyArIHJlYWxTcmMgKyAnKSc7XG5cdFx0XHRcdFx0XHRcdFx0ZXJyb3IubmFtZSA9ICdDaHVua0xvYWRFcnJvcic7XG5cdFx0XHRcdFx0XHRcdFx0ZXJyb3IudHlwZSA9IGVycm9yVHlwZTtcblx0XHRcdFx0XHRcdFx0XHRlcnJvci5yZXF1ZXN0ID0gcmVhbFNyYztcblx0XHRcdFx0XHRcdFx0XHRpbnN0YWxsZWRDaHVua0RhdGFbMV0oZXJyb3IpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmwodXJsLCBsb2FkaW5nRW5kZWQsIFwiY2h1bmstXCIgKyBjaHVua0lkLCBjaHVua0lkKTtcblx0XHRcdFx0fSBlbHNlIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdFx0XHR9XG5cdFx0fVxufTtcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuLy8gbm8gb24gY2h1bmtzIGxvYWRlZFxuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblxufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua2F1cnVtX29yZ1wiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmthdXJ1bV9vcmdcIl0gfHwgW107XG5jaHVua0xvYWRpbmdHbG9iYWwuZm9yRWFjaCh3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIDApKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCkpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSAnYXVydW1qcyc7XG5cbi8vIGVuYWJsZURlYnVnTW9kZSgpO1xuRXZlbnRFbWl0dGVyLnNldFN1YnNjcmlwdGlvbkxlYWtXYXJuaW5nVGhyZXNob2xkKDMwMCk7XG5pbXBvcnQoJy4vbWFpbicpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9