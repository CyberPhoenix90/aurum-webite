declare module "utilities/cancellation_token" {
    import { Delegate, Callback } from "utilities/common";
    export class CancellationToken {
        private cancelables;
        private _isCancelled;
        get isCanceled(): boolean;
        constructor(...cancellables: Delegate[]);
        static forever: CancellationToken;
        static fromMultiple(tokens: CancellationToken[]): CancellationToken;
        hasCancellables(): boolean;
        /**
         * Attaches a new cancelable to this token
         * @param delegate
         */
        addCancelable(delegate: Delegate): this;
        removeCancelable(delegate: Delegate): this;
        setTimeout(cb: Delegate, time?: number): void;
        setInterval(cb: Delegate, time: number): void;
        requestAnimationFrame(cb: Callback<number>): void;
        animationLoop(cb: Callback<number>): void;
        throwIfCancelled(msg: string): void;
        chain(target: CancellationToken, twoWays?: boolean): CancellationToken;
        /**
         * Registers an event using addEventListener and if you cancel the token the event will be canceled as well
         */
        registerDomEvent(eventEmitter: HTMLElement | Document | Window, event: string, callback: (e: Event) => void): this;
        /**
         * Cancels everything attached to this token
         */
        cancel(): void;
    }
    export function registerAnimationLoop(callback: (time: number) => void, token: CancellationToken): void;
}
declare module "utilities/event_emitter" {
    import { CancellationToken } from "utilities/cancellation_token";
    import { Callback } from "utilities/common";
    /**
     * @internal
     */
    export interface EventSubscriptionFacade {
        cancel(): void;
    }
    /**
     * @internal
     */
    export type EventCallback<T> = (data: T) => void;
    /**
     * Event emitter is at the core of aurums stream system. It's a basic pub sub style typesafe event system optimized for high update throughput
     */
    export class EventEmitter<T> {
        private isFiring;
        private onAfterFire;
        /**
         * Callback that if set is called when all subscriptions are removed
         */
        onEmpty: Callback<void>;
        private static leakWarningThreshold;
        /**
         * Set a number of subscriptions that any event can have at most before emitting warnings. The subscriptions will continue working but the warnings can be used
         * to track potential subscription memory leaks
         */
        static setSubscriptionLeakWarningThreshold(limit: number): void;
        /**
         * returns the count of subscriptions both one time and regular
         */
        get subscriptions(): number;
        private subscribeChannel;
        private subscribeOnceChannel;
        constructor();
        /**
         * Subscribe to the event. The callback will be called whenever the event fires an update
         */
        subscribe(callback: EventCallback<T>, cancellationToken?: CancellationToken): EventSubscriptionFacade;
        /**
         * Subscribe to the event. The callback will be called when the event next fires an update after which the subscription is cancelled
         */
        subscribeOnce(callback: import("utilities/common").Callback<T>, cancellationToken?: CancellationToken): EventSubscriptionFacade;
        /**
         * Whether the event has any subscriptions
         */
        hasSubscriptions(): boolean;
        /**
         * Removes all currently active subscriptions. If called in the callback of a subscription will be defered until after the fire event finished
         */
        cancelAll(): void;
        private afterFire;
        /**
         * Publishes a new value all subscribers will be called
         * Errors in the callbacks are caught and deferred until after fire finishes before throwing to avoid interrupting the propagation of the event
         * to all subscribers simply because of one faulty subscriber
         */
        fire(data?: T): void;
        private createSubscription;
        private cancel;
    }
}
declare module "stream/operator_model" {
    export enum OperationType {
        FILTER = 0,
        NOOP = 1,
        MAP = 2,
        DELAY = 3,
        MAP_DELAY = 4,
        DELAY_FILTER = 5,
        MAP_DELAY_FILTER = 6
    }
    interface SourceOperator {
        operationType: OperationType;
        name: string;
    }
    export interface DataSourceOperator<T, M> extends SourceOperator {
        typescriptLimitationWorkaround?: (value: T) => M;
    }
    export interface DuplexDataSourceOperator<T, M> extends SourceOperator {
        typescriptLimitationWorkaround?: (value: T) => M;
    }
    export interface DataSourceFilterOperator<T> extends DataSourceOperator<T, T> {
        operationType: OperationType.FILTER;
        operation: (value: T) => boolean;
    }
    export interface DuplexDataSourceFilterOperator<T> extends DuplexDataSourceOperator<T, T> {
        operationType: OperationType.FILTER;
        operationDown: (value: T) => boolean;
        operationUp: (value: T) => boolean;
    }
    export interface DuplexDataSourceMapOperator<T, M> extends DuplexDataSourceOperator<T, M> {
        operationType: OperationType.MAP;
        operationDown: (value: T) => M;
        operationUp: (value: M) => T;
    }
    export interface DataSourceMapOperator<T, M> extends DataSourceOperator<T, M> {
        operationType: OperationType.MAP;
        operation: (value: T) => M;
    }
    export interface DataSourceNoopOperator<T> extends DataSourceOperator<T, T> {
        operationType: OperationType.NOOP;
        operation: (value: T) => T;
    }
    export interface DataSourceDelayOperator<T> extends DataSourceOperator<T, T> {
        operationType: OperationType.DELAY;
        operation: (value: T) => Promise<T>;
    }
    export interface DataSourceMapDelayOperator<T, M> extends DataSourceOperator<T, M> {
        operationType: OperationType.MAP_DELAY;
        operation: (value: T) => Promise<M>;
    }
    export interface DataSourceMapDelayFilterOperator<T, M> extends DataSourceOperator<T, M> {
        operationType: OperationType.MAP_DELAY_FILTER;
        operation: (value: T) => Promise<{
            item: M;
            cancelled: boolean;
        }>;
    }
    export interface DuplexDataSourceMapDelayFilterOperator<T, M> extends DuplexDataSourceOperator<T, M> {
        operationType: OperationType.MAP_DELAY_FILTER;
        operationDown: (value: T) => Promise<{
            item: M;
            cancelled: boolean;
        }>;
        operationUp: (value: T) => Promise<{
            item: M;
            cancelled: boolean;
        }>;
    }
    export interface DataSourceDelayFilterOperator<T> extends DataSourceOperator<T, T> {
        operationType: OperationType.DELAY_FILTER;
        operation: (value: T) => Promise<boolean>;
    }
    export interface DuplexDataSourceDelayFilterOperator<T> extends DuplexDataSourceOperator<T, T> {
        operationType: OperationType.DELAY_FILTER;
        operationDown: (value: T) => Promise<boolean>;
        operationUp: (value: T) => Promise<boolean>;
    }
}
declare module "stream/stream" {
    import { DataSourceOperator } from "stream/operator_model";
    import { CancellationToken } from "utilities/cancellation_token";
    import { Callback } from "utilities/common";
    import { DataSource, ReadOnlyDataSource } from "stream/data_source";
    /**
     * Lets you logically combine 2 data sources so that update calls go through the input source and listen goes to the output source
     */
    export class Stream<I, O = I> implements ReadOnlyDataSource<O> {
        private input;
        private output;
        get name(): string;
        /**
         * The current value of this data source, can be changed through update
         */
        get value(): O;
        private constructor();
        static fromFetchRaw(url: string): Stream<void | RequestInit, Promise<Response>>;
        static fromPreconnectedSources<I, O>(inputSource?: DataSource<I>, outputSource?: DataSource<O>): Stream<I, O>;
        /**
         * Combines two sources into a third source that listens to updates from both parent sources.
         * @param otherSource Second parent for the new source
         * @param combinator Method allowing you to combine the data from both parents on update. Called each time a parent is updated with the latest values of both parents
         * @param cancellationToken  Cancellation token to cancel the subscriptions the new datasource has to the two parent datasources
         */
        aggregate<R, A>(otherSources: [ReadOnlyDataSource<A>], combinator: (self: O, other: A) => R, cancellationToken?: CancellationToken): DataSource<R>;
        aggregate<R, A, B>(otherSources: [ReadOnlyDataSource<A>, ReadOnlyDataSource<B>], combinator?: (self: O, second: A, third: B) => R, cancellationToken?: CancellationToken): DataSource<R>;
        aggregate<R, A, B, C>(otherSources: [ReadOnlyDataSource<A>, ReadOnlyDataSource<B>, ReadOnlyDataSource<C>], combinator?: (self: O, second: A, third: B, fourth: C) => R, cancellationToken?: CancellationToken): DataSource<R>;
        aggregate<R, A, B, C, D>(otherSources: [ReadOnlyDataSource<A>, ReadOnlyDataSource<B>, ReadOnlyDataSource<C>, ReadOnlyDataSource<D>], combinator?: (self: O, second: A, third: B, fourth: C, fifth: D) => R, cancellationToken?: CancellationToken): DataSource<R>;
        aggregate<R, A, B, C, D, E>(otherSources: [ReadOnlyDataSource<A>, ReadOnlyDataSource<B>, ReadOnlyDataSource<C>, ReadOnlyDataSource<D>, ReadOnlyDataSource<E>], combinator?: (self: O, second: A, third: B, fourth: C, fifth: D, sixth: E) => R, cancellationToken?: CancellationToken): DataSource<R>;
        aggregate<R, A, B, C, D, E, F>(otherSources: [
            ReadOnlyDataSource<A>,
            ReadOnlyDataSource<B>,
            ReadOnlyDataSource<C>,
            ReadOnlyDataSource<D>,
            ReadOnlyDataSource<E>,
            ReadOnlyDataSource<F>
        ], combinator?: (self: O, second: A, third: B, fourth: C, fifth: D, sixth: E, seventh: F) => R, cancellationToken?: CancellationToken): DataSource<R>;
        aggregate<R, A, B, C, D, E, F, G>(otherSources: [
            ReadOnlyDataSource<A>,
            ReadOnlyDataSource<B>,
            ReadOnlyDataSource<C>,
            ReadOnlyDataSource<D>,
            ReadOnlyDataSource<E>,
            ReadOnlyDataSource<F>,
            ReadOnlyDataSource<G>
        ], combinator?: (self: O, second: A, third: B, fourth: C, fifth: D, sixth: E, seventh: F, eigth: G) => R, cancellationToken?: CancellationToken): DataSource<R>;
        aggregate<R, A, B, C, D, E, F, G, H>(otherSources: [
            ReadOnlyDataSource<A>,
            ReadOnlyDataSource<B>,
            ReadOnlyDataSource<C>,
            ReadOnlyDataSource<D>,
            ReadOnlyDataSource<E>,
            ReadOnlyDataSource<F>,
            ReadOnlyDataSource<G>,
            ReadOnlyDataSource<H>
        ], combinator?: (self: O, second: A, third: B, fourth: C, fifth: D, sixth: E, seventh: F, eigth: G, ninth: H) => R, cancellationToken?: CancellationToken): DataSource<R>;
        aggregate<R, A, B, C, D, E, F, G, H, I>(otherSources: [
            ReadOnlyDataSource<A>,
            ReadOnlyDataSource<B>,
            ReadOnlyDataSource<C>,
            ReadOnlyDataSource<D>,
            ReadOnlyDataSource<E>,
            ReadOnlyDataSource<F>,
            ReadOnlyDataSource<G>,
            ReadOnlyDataSource<H>
        ], combinator?: (self: O, second: A, third: B, fourth: C, fifth: D, sixth: E, seventh: F, eigth: G, ninth: H) => R, cancellationToken?: CancellationToken): DataSource<R>;
        aggregate<R, A, B, C, D, E, F, G, H, I>(otherSources: [
            ReadOnlyDataSource<A>,
            ReadOnlyDataSource<B>,
            ReadOnlyDataSource<C>,
            ReadOnlyDataSource<D>,
            ReadOnlyDataSource<E>,
            ReadOnlyDataSource<F>,
            ReadOnlyDataSource<G>,
            ReadOnlyDataSource<H>,
            ReadOnlyDataSource<I>
        ], combinator?: (self: O, second: A, third: B, fourth: C, fifth: D, sixth: E, seventh: F, eigth: G, ninth: H, tenth: I) => R, cancellationToken?: CancellationToken): DataSource<R>;
        static fromStreamTransformation<A, B = A, C = B, D = C, E = D, F = E, G = F, H = G, Z = H, J = Z, K = J>(operationA?: DataSourceOperator<A, B>, operationB?: DataSourceOperator<B, C>, operationC?: DataSourceOperator<C, D>, operationD?: DataSourceOperator<D, E>, operationE?: DataSourceOperator<E, F>, operationF?: DataSourceOperator<F, G>, operationG?: DataSourceOperator<G, H>, operationH?: DataSourceOperator<H, Z>, operationI?: DataSourceOperator<Z, J>, operationJ?: DataSourceOperator<J, K>): Stream<A, K>;
        static fromFetchPostJson<I, O>(url: string, baseRequestData?: RequestInit): Stream<I, O>;
        static fromFetchGetJson<O>(url: string, baseRequestData?: RequestInit): Stream<void, O>;
        update(data: I): void;
        transform<A, B = A, C = B, D = C, E = D, F = E, G = F, H = G, Z = H, J = Z, K = J>(operationA: DataSourceOperator<O, A>, operationB?: DataSourceOperator<A, B> | CancellationToken, operationC?: DataSourceOperator<B, C> | CancellationToken, operationD?: DataSourceOperator<C, D> | CancellationToken, operationE?: DataSourceOperator<D, E> | CancellationToken, operationF?: DataSourceOperator<E, F> | CancellationToken, operationG?: DataSourceOperator<F, G> | CancellationToken, operationH?: DataSourceOperator<G, H> | CancellationToken, operationI?: DataSourceOperator<H, Z> | CancellationToken, operationJ?: DataSourceOperator<Z, J> | CancellationToken, operationK?: DataSourceOperator<J, K> | CancellationToken, cancellationToken?: CancellationToken): Stream<I, K>;
        getInput(): DataSource<I>;
        getOutput(): DataSource<O>;
        listen(callback: Callback<O>, cancellationToken?: CancellationToken): Callback<void>;
        listenAndRepeat(callback: Callback<O>, cancellationToken?: CancellationToken): Callback<void>;
        listenOnce(callback: Callback<O>, cancellationToken?: CancellationToken): Callback<void>;
        awaitNextUpdate(cancellationToken?: CancellationToken): Promise<O>;
        cancelAll(): void;
    }
}
declare module "stream/data_source_operators" {
    import { ThenArg, Callback } from "utilities/common";
    import { ArrayDataSource, DataSource } from "stream/data_source";
    import { DuplexDataSource } from "stream/duplex_data_source";
    import { Stream } from "stream/stream";
    import { DataSourceMapOperator, DataSourceFilterOperator, DataSourceMapDelayOperator, DataSourceMapDelayFilterOperator, DataSourceDelayOperator, DataSourceDelayFilterOperator, DataSourceNoopOperator } from "stream/operator_model";
    import { CancellationToken } from "utilities/cancellation_token";
    /**
     * Mutates an update
     */
    export function dsMap<T, M>(mapper: (value: T) => M): DataSourceMapOperator<T, M>;
    /**
     * Forwards an update to one of two possible sources based on a condition
     */
    export function dsFork<T>(condition: (value: T) => boolean, truthyPath: {
        update(value: T): void;
    }, falsyPath: {
        update(value: T): void;
    }): DataSourceNoopOperator<T>;
    /**
     * Same as map but with an async mapper function
     */
    export function dsMapAsync<T, M>(mapper: (value: T) => Promise<M>): DataSourceMapDelayOperator<T, M>;
    /**
     * Changes updates to contain the value of the previous update as well as the current
     */
    export function dsDiff<T>(): DataSourceMapOperator<T, {
        newValue: T;
        oldValue: T;
    }>;
    /**
     * Changes updates to contain the value of the previous update as well as the current
     */
    export function dsUpdateToken<T>(): DataSourceMapOperator<T, {
        value: T;
        token: CancellationToken;
    }>;
    /**
     * Blocks updates that don't pass the filter predicate
     */
    export function dsFilter<T>(predicate: (value: T) => boolean): DataSourceFilterOperator<T>;
    /**
     * Same as filter but with an async predicate function
     */
    export function dsFilterAsync<T>(predicate: (value: T) => Promise<boolean>): DataSourceDelayFilterOperator<T>;
    /**
     * Only propagate an update if the value is even
     */
    export function dsEven(): DataSourceFilterOperator<number>;
    /**
     * Only propagate an update if the value is odd
     */
    export function dsOdd(): DataSourceFilterOperator<number>;
    /**
     * Only propagate an update if the value is lower than the previous update
     */
    export function dsMin(): DataSourceFilterOperator<number>;
    /**
     * Only propagate an update if the value is higher than the previous update
     */
    export function dsMax(): DataSourceFilterOperator<number>;
    /**
     * Ignore the first N updates where N depends on an external source
     */
    export function dsSkipDynamic<T>(amountLeft: DataSource<number>): DataSourceFilterOperator<T>;
    /**
     * Ignore the first N updates
     */
    export function dsSkip<T>(amount: number): DataSourceFilterOperator<T>;
    /**
     * Allows only a certain number of updates to pass decreasing a counter on each pass
     * If the counter reaches 0 the updates are lost
     */
    export function dsCutOff<T>(amount: number): DataSourceFilterOperator<T>;
    /**
     * Allows only a certain number of updates to pass decreasing a counter on each pass, the counter being an external
     * datasource can be changed externally.
     * If the counter reaches 0 the updates are lost
     */
    export function dsCutOffDynamic<T>(amountLeft: DataSource<number>): DataSourceFilterOperator<T>;
    /**
     * Allows only a certain number of updates to pass decreasing a counter on each pass, the counter being an external
     * datasource can be changed externally.
     * If the counter reaches 0 the updates are buffered until they are unlocked again
     */
    export function dsSemaphore<T>(state: DataSource<number>): DataSourceDelayOperator<T>;
    /**
     * Filters out updates if they have the same value as the previous update, uses reference equality by default
     */
    export function dsUnique<T>(isEqual?: (valueA: T, valueB: T) => boolean): DataSourceFilterOperator<T>;
    /**
     * Takes promises and updates with the resolved value, if multiple promises come in processes updates as promises resolve in any order
     */
    export function dsAwait<T>(): DataSourceMapDelayOperator<T, ThenArg<T>>;
    /**
     * Takes promises and updates with the resolved value, if multiple promises come in makes sure the updates fire in the same order that the promises came in
     */
    export function dsAwaitOrdered<T>(): DataSourceMapDelayOperator<T, ThenArg<T>>;
    /**
     * awaits promise and forwards the resolved value, if a new promise comes in while the first isn't resolved then the first
     * promise will be ignored even if it resolves first and instead we focus on the newest promise. This is useful for cancellable
     * async operations where we only care about the result if it's the latest action
     */
    export function dsAwaitLatest<T>(): DataSourceMapDelayFilterOperator<T, ThenArg<T>>;
    /**
     * Reduces all updates down to a value
     */
    export function dsReduce<T, M = T>(reducer: (p: M, c: T) => M, initialValue: M): DataSourceMapOperator<T, M>;
    /**
     * Builds a string where each update is appened to the string optionally with a seperator
     */
    export function dsStringJoin(seperator?: string): DataSourceMapOperator<string, string>;
    /**
     * Adds a fixed amount of lag to updates
     */
    export function dsDelay<T>(time: number): DataSourceDelayOperator<T>;
    /**
     * Starts a timer when an update occurs, delays the update until the timer passed if a new update arrives the initial
     * update is cancelled and the process starts again
     */
    export function dsDebounce<T>(time: number): DataSourceDelayFilterOperator<T>;
    /**
     * Only allow up to 1 update to propagate per frame makes update run as a microtask
     */
    export function dsMicroDebounce<T>(): DataSourceDelayFilterOperator<T>;
    /**
     * Debounce update to occur at most one per animation frame
     */
    export function dsThrottleFrame<T>(): DataSourceDelayFilterOperator<T>;
    /**
     * May or may not block all updates based on the state provided by another source
     * When unblocked the last value that was blocked is passed through
     * lock state
     * true => updates pass through
     * false => latest update state is buffered and passes once unlocked
     */
    export function dsLock<T>(state: DataSource<boolean>): DataSourceDelayOperator<T>;
    /**
     * Allows at most one update per N milliseconds to pass through
     */
    export function dsThrottle<T>(time: number): DataSourceFilterOperator<T>;
    /**
     * When an update occurs a timer is started, during that time all subsequent updates are collected in an array and then
     * once the timer runs out an update is made with all updates collected so far as an array
     */
    export function dsBuffer<T>(time: number): DataSourceMapDelayFilterOperator<T, T[]>;
    /**
     * Extracts only the value of a key of the update value
     */
    export function dsPick<T, K extends keyof T>(key: K): DataSourceMapOperator<T, T[K]>;
    /**
     * Forwards an event to another source
     */
    export function dsPipe<T>(target: DataSource<T> | DuplexDataSource<T> | Stream<T, any>): DataSourceNoopOperator<T>;
    /**
     * Same as pipe except for duplex data sources it pipes upstream
     */
    export function dsPipeUp<T>(target: DataSource<T> | DuplexDataSource<T> | Stream<T, any>): DataSourceNoopOperator<T>;
    /**
     * Lets you keep a history of the updates of a source by pushing it onto an array datasource
     */
    export function dsHistory<T>(reportTarget: ArrayDataSource<T>, generations?: number, cancellationToken?: CancellationToken): DataSourceNoopOperator<T>;
    /**
     * Monitors the number of events per interval
     */
    export function dsThroughputMeter<T>(reportTarget: DataSource<number>, interval: number, cancellationToken?: CancellationToken): DataSourceNoopOperator<T>;
    /**
     * Allows inserting a callback that gets called with an update
     */
    export function dsTap<T>(cb: Callback<T>): DataSourceNoopOperator<T>;
    /**
     * Pipes updates to the targets in round-robin fashion
     */
    export function dsLoadBalance<T>(targets: Array<DataSource<T> | DuplexDataSource<T> | Stream<T, any>>): DataSourceNoopOperator<T>;
    /**
     * Logs updates to the console
     */
    export function dsLog<T>(prefix?: string, suffix?: string): DataSourceNoopOperator<T>;
    export function dsPipeAll<T>(...sources: Array<DataSource<T> | DuplexDataSource<T> | Stream<T, any>>): DataSourceNoopOperator<T>;
}
declare module "stream/duplex_data_source_operators" {
    import { DuplexDataSourceDelayFilterOperator, DuplexDataSourceFilterOperator, DuplexDataSourceMapOperator } from "stream/operator_model";
    export enum DataFlow {
        UPSTREAM = 0,
        DOWNSTREAM = 1
    }
    export enum DataFlowBoth {
        UPSTREAM = 0,
        DOWNSTREAM = 1,
        BOTH = 2
    }
    export function ddsMap<T, M>(mapDown: (value: T) => M, mapUp: (value: M) => T): DuplexDataSourceMapOperator<T, M>;
    /**
     * Starts a timer when an update occurs, delays the update until the timer passed if a new update arrives the initial
     * update is cancelled and the process starts again
     */
    export function ddsDebounce<T>(time: number, direction?: DataFlowBoth): DuplexDataSourceDelayFilterOperator<T>;
    export function ddsOneWayFlow<T>(direction: DataFlow): DuplexDataSourceFilterOperator<T>;
    export function ddsFilter<T>(predicateDown: (value: T) => boolean, predicateUp: (value: T) => boolean): DuplexDataSourceFilterOperator<T>;
    export function ddsUnique<T>(direction?: DataFlowBoth, isEqual?: (valueA: T, valueB: T) => boolean): DuplexDataSourceFilterOperator<T>;
}
declare module "stream/duplex_data_source" {
    import { AurumServerInfo } from "aurum_server/aurum_server_client";
    import { CancellationToken } from "utilities/cancellation_token";
    import { Callback } from "utilities/common";
    import { EventEmitter } from "utilities/event_emitter";
    import { DataSource, GenericDataSource, ReadOnlyDataSource } from "stream/data_source";
    import { DataFlow } from "stream/duplex_data_source_operators";
    import { DataSourceOperator, DuplexDataSourceOperator } from "stream/operator_model";
    /**
     * Same as DataSource except data can flow in both directions
     */
    export class DuplexDataSource<T> implements GenericDataSource<T> {
        /**
         * The current value of this data source, can be changed through update
         */
        value: T;
        private primed;
        protected errorHandler: (error: any) => T;
        protected errorEvent: EventEmitter<Error>;
        private updatingUpstream;
        private updatingDownstream;
        private updateDownstreamEvent;
        private updateUpstreamEvent;
        private propagateWritesToReadStream;
        name: string;
        /**
         *
         * @param initialValue
         * @param rootNode If a write is done propagate this update back down to all the consumers. Useful at the root node
         */
        constructor(initialValue?: T, rootNode?: boolean, name?: string);
        /**
         * Connects to an aurum-server exposed datasource view https://github.com/CyberPhoenix90/aurum-server for more information
         * Note that type safety is not guaranteed. Whatever the server sends as an update will be propagated
         * @param  {AurumServerInfo} aurumServerInfo
         * @returns DataSource
         */
        static fromRemoteSource<T>(aurumServerInfo: AurumServerInfo, cancellation: CancellationToken): DuplexDataSource<T>;
        static toDuplexDataSource<T>(value: T | DuplexDataSource<T>): DuplexDataSource<T>;
        /**
         * Makes it possible to have 2 completely separate data flow pipelines for each direction
         * @param downStream stream to pipe downstream data to
         * @param upstream  stream to pipe upstream data to
         */
        static fromTwoDataSource<T>(downStream: DataSource<T>, upstream: DataSource<T>, initialValue?: T, propagateWritesToReadStream?: boolean): DuplexDataSource<T>;
        /**
         * Updates the data source with a value if it has never had a value before
         */
        withInitial(value: T): this;
        toString(): string;
        /**
         * Allows creating a duplex stream that blocks data in one direction. Useful for plugging into code that uses two way flow but only one way is desired
         * @param direction direction of the dataflow that is allowed
         */
        static createOneWay<T>(direction?: DataFlow, initialValue?: T): DuplexDataSource<T>;
        /**
         * Updates the value in the data source and calls the listen callback for all listeners
         * @param newValue new value for the data source
         */
        updateDownstream(newValue: T): void;
        /**
         * Updates the value in the data source and calls the listen callback for all listeners
         * @param newValue new value for the data source
         */
        updateUpstream(newValue: T): void;
        /**
         * Same as listen but will immediately call the callback with the current value first
         * @param callback Callback to call when value is updated
         * @param cancellationToken Optional token to control the cancellation of the subscription
         * @returns Cancellation callback, can be used to cancel subscription without a cancellation token
         */
        listenAndRepeat(callback: Callback<T>, cancellationToken?: CancellationToken): Callback<void>;
        /**
         * alias for listenDownstream
         * @param callback Callback to call when value is updated
         * @param cancellationToken Optional token to control the cancellation of the subscription
         * @returns Cancellation callback, can be used to cancel subscription without a cancellation token
         */
        listen(callback: Callback<T>, cancellationToken?: CancellationToken): Callback<void>;
        private listenInternal;
        /**
         * Subscribes exclusively to updates of the data stream that occur due to an update flowing upstream
         * @param callback Callback to call when value is updated
         * @param cancellationToken Optional token to control the cancellation of the subscription
         * @returns Cancellation callback, can be used to cancel subscription without a cancellation token
         */
        listenUpstream(callback: Callback<T>, cancellationToken?: CancellationToken): Callback<void>;
        /**
         * Subscribes exclusively to updates of the data stream that occur due to an update flowing upstream
         * @param callback Callback to call when value is updated
         * @param cancellationToken Optional token to control the cancellation of the subscription
         * @returns Cancellation callback, can be used to cancel subscription without a cancellation token
         */
        listenUpstreamAndRepeat(callback: Callback<T>, cancellationToken?: CancellationToken): Callback<void>;
        /**
         * Subscribes exclusively to one update of the data stream that occur due to an update flowing upstream
         * @param callback Callback to call when value is updated
         * @param cancellationToken Optional token to control the cancellation of the subscription
         * @returns Cancellation callback, can be used to cancel subscription without a cancellation token
         */
        listenUpstreamOnce(callback: Callback<T>, cancellationToken?: CancellationToken): Callback<void>;
        /**
         * Subscribes exclusively to updates of the data stream that occur due to an update flowing downstream
         * @param callback Callback to call when value is updated
         * @param cancellationToken Optional token to control the cancellation of the subscription
         * @returns Cancellation callback, can be used to cancel subscription without a cancellation token
         */
        listenDownstream(callback: Callback<T>, cancellationToken?: CancellationToken): Callback<void>;
        downStreamToDataSource(cancellationToken?: CancellationToken): DataSource<T>;
        /**
         * Combines two sources into a third source that listens to updates from both parent sources.
         * @param otherSource Second parent for the new source
         * @param combinator Method allowing you to combine the data from both parents on update. Called each time a parent is updated with the latest values of both parents
         * @param cancellationToken  Cancellation token to cancel the subscriptions the new datasource has to the two parent datasources
         */
        aggregate<R, A>(otherSources: [ReadOnlyDataSource<A>], combinator: (self: T, other: A) => R, cancellationToken?: CancellationToken): DataSource<R>;
        aggregate<R, A, B>(otherSources: [ReadOnlyDataSource<A>, ReadOnlyDataSource<B>], combinator?: (self: T, second: A, third: B) => R, cancellationToken?: CancellationToken): DataSource<R>;
        aggregate<R, A, B, C>(otherSources: [ReadOnlyDataSource<A>, ReadOnlyDataSource<B>, ReadOnlyDataSource<C>], combinator?: (self: T, second: A, third: B, fourth: C) => R, cancellationToken?: CancellationToken): DataSource<R>;
        aggregate<R, A, B, C, D>(otherSources: [ReadOnlyDataSource<A>, ReadOnlyDataSource<B>, ReadOnlyDataSource<C>, ReadOnlyDataSource<D>], combinator?: (self: T, second: A, third: B, fourth: C, fifth: D) => R, cancellationToken?: CancellationToken): DataSource<R>;
        aggregate<R, A, B, C, D, E>(otherSources: [ReadOnlyDataSource<A>, ReadOnlyDataSource<B>, ReadOnlyDataSource<C>, ReadOnlyDataSource<D>, ReadOnlyDataSource<E>], combinator?: (self: T, second: A, third: B, fourth: C, fifth: D, sixth: E) => R, cancellationToken?: CancellationToken): DataSource<R>;
        aggregate<R, A, B, C, D, E, F>(otherSources: [
            ReadOnlyDataSource<A>,
            ReadOnlyDataSource<B>,
            ReadOnlyDataSource<C>,
            ReadOnlyDataSource<D>,
            ReadOnlyDataSource<E>,
            ReadOnlyDataSource<F>
        ], combinator?: (self: T, second: A, third: B, fourth: C, fifth: D, sixth: E, seventh: F) => R, cancellationToken?: CancellationToken): DataSource<R>;
        aggregate<R, A, B, C, D, E, F, G>(otherSources: [
            ReadOnlyDataSource<A>,
            ReadOnlyDataSource<B>,
            ReadOnlyDataSource<C>,
            ReadOnlyDataSource<D>,
            ReadOnlyDataSource<E>,
            ReadOnlyDataSource<F>,
            ReadOnlyDataSource<G>
        ], combinator?: (self: T, second: A, third: B, fourth: C, fifth: D, sixth: E, seventh: F, eigth: G) => R, cancellationToken?: CancellationToken): DataSource<R>;
        aggregate<R, A, B, C, D, E, F, G, H>(otherSources: [
            ReadOnlyDataSource<A>,
            ReadOnlyDataSource<B>,
            ReadOnlyDataSource<C>,
            ReadOnlyDataSource<D>,
            ReadOnlyDataSource<E>,
            ReadOnlyDataSource<F>,
            ReadOnlyDataSource<G>,
            ReadOnlyDataSource<H>
        ], combinator?: (self: T, second: A, third: B, fourth: C, fifth: D, sixth: E, seventh: F, eigth: G, ninth: H) => R, cancellationToken?: CancellationToken): DataSource<R>;
        aggregate<R, A, B, C, D, E, F, G, H, I>(otherSources: [
            ReadOnlyDataSource<A>,
            ReadOnlyDataSource<B>,
            ReadOnlyDataSource<C>,
            ReadOnlyDataSource<D>,
            ReadOnlyDataSource<E>,
            ReadOnlyDataSource<F>,
            ReadOnlyDataSource<G>,
            ReadOnlyDataSource<H>,
            ReadOnlyDataSource<I>
        ], combinator?: (self: T, second: A, third: B, fourth: C, fifth: D, sixth: E, seventh: F, eigth: G, ninth: H, tenth: I) => R, cancellationToken?: CancellationToken): DataSource<R>;
        transformDuplex<A, B = A, C = B, D = C, E = D, F = E, G = F, H = G, I = H, J = I, K = J>(operationA: DuplexDataSourceOperator<T, A>, operationB?: DuplexDataSourceOperator<A, B> | CancellationToken, operationC?: DuplexDataSourceOperator<B, C> | CancellationToken, operationD?: DuplexDataSourceOperator<C, D> | CancellationToken, operationE?: DuplexDataSourceOperator<D, E> | CancellationToken, operationF?: DuplexDataSourceOperator<E, F> | CancellationToken, operationG?: DuplexDataSourceOperator<F, G> | CancellationToken, operationH?: DuplexDataSourceOperator<G, H> | CancellationToken, operationI?: DuplexDataSourceOperator<H, I> | CancellationToken, operationJ?: DuplexDataSourceOperator<I, J> | CancellationToken, operationK?: DuplexDataSourceOperator<J, K> | CancellationToken, cancellationToken?: CancellationToken): DuplexDataSource<K>;
        transform<A, B = A, C = B, D = C, E = D, F = E, G = F, H = G, I = H, J = I, K = J>(operationA: DataSourceOperator<T, A>, operationB?: DataSourceOperator<A, B> | CancellationToken, operationC?: DataSourceOperator<B, C> | CancellationToken, operationD?: DataSourceOperator<C, D> | CancellationToken, operationE?: DataSourceOperator<D, E> | CancellationToken, operationF?: DataSourceOperator<E, F> | CancellationToken, operationG?: DataSourceOperator<F, G> | CancellationToken, operationH?: DataSourceOperator<G, H> | CancellationToken, operationI?: DataSourceOperator<H, I> | CancellationToken, operationJ?: DataSourceOperator<I, J> | CancellationToken, operationK?: DataSourceOperator<J, K> | CancellationToken, cancellationToken?: CancellationToken): DataSource<K>;
        /**
         * Forwards all updates from this source to another
         * @param targetDataSource datasource to pipe the updates to
         * @param cancellationToken  Cancellation token to cancel the subscriptions added to the datasources by this operation
         */
        pipe(targetDataSource: DuplexDataSource<T>, cancellationToken?: CancellationToken): this;
        listenOnce(callback: Callback<T>, cancellationToken?: CancellationToken): Callback<void>;
        /**
         * Returns a promise that resolves when the next update occurs
         * @param cancellationToken
         */
        awaitNextUpdate(cancellationToken?: CancellationToken): Promise<T>;
        /**
         * Remove all listeners
         */
        cancelAll(): void;
        cancelAllDownstream(): void;
        cancelAllUpstream(): void;
        /**
         * Assign a function to handle errors and map them back to regular values. Rethrow the error in case you want to fallback to emitting error
         */
        handleErrors(callback: (error: any) => T): this;
        onError(callback: (error: any) => void, cancellationToken?: CancellationToken): this;
        emitError(e: Error, direction: DataFlow): void;
    }
    export function processTransformDuplex<I, O>(operations: DuplexDataSourceOperator<any, any>[], result: DuplexDataSource<O>, direction: DataFlow): Callback<I>;
}
declare module "stream/object_data_source" {
    import { AurumServerInfo } from "aurum_server/aurum_server_client";
    import { CancellationToken } from "utilities/cancellation_token";
    import { Callback } from "utilities/common";
    import { ArrayDataSource, DataSource, ReadOnlyArrayDataSource, ReadOnlyDataSource } from "stream/data_source";
    import { DuplexDataSource } from "stream/duplex_data_source";
    export interface ObjectChange<T, K extends keyof T> {
        key: K;
        oldValue: T[K];
        newValue: T[K];
        deleted?: boolean;
    }
    export interface ReadOnlyObjectDataSource<T> {
        toString(): string;
        pickObject<K extends keyof T>(key: K, cancellationToken?: CancellationToken): ReadOnlyObjectDataSource<T[K]>;
        pickArray<K extends keyof T>(key: K, cancellationToken?: CancellationToken): ReadOnlyArrayDataSource<FlatArray<T[K], 1>>;
        pick<K extends keyof T>(key: K, cancellationToken?: CancellationToken): ReadOnlyDataSource<T[K]>;
        pickDuplex<K extends keyof T>(key: K, cancellationToken?: CancellationToken): DuplexDataSource<T[K]>;
        listen(callback: Callback<ObjectChange<T, keyof T>>, cancellationToken?: CancellationToken): Callback<void>;
        listenAndRepeat(callback: Callback<ObjectChange<T, keyof T>>, cancellationToken?: CancellationToken): Callback<void>;
        map<D>(mapper: (key: keyof T) => D): ArrayDataSource<D>;
        listenOnKey<K extends keyof T>(key: K, callback: Callback<ObjectChange<T, K>>, cancellationToken?: CancellationToken): Callback<void>;
        listenOnKeyAndRepeat<K extends keyof T>(key: K, callback: Callback<ObjectChange<T, keyof T>>, cancellationToken?: CancellationToken): Callback<void>;
        keys(): string[];
        values(): any;
        get<K extends keyof T>(key: K): T[K];
        getData(): Readonly<T>;
        toObject(): T;
        toDataSource(): DataSource<T>;
    }
    export class ObjectDataSource<T> implements ReadOnlyObjectDataSource<T> {
        protected data: T;
        private updateEvent;
        private updateEventOnKey;
        constructor(initialData: T);
        /**
         * Connects to an aurum-server exposed object datasource. View https://github.com/CyberPhoenix90/aurum-server for more information
         * Note that type safety is not guaranteed. Whatever the server sends as an update will be propagated. Make sure you trust the server
         * @param  {AurumServerInfo} aurumServerInfo
         * @returns DataSource
         */
        static fromRemoteSource<T>(aurumServerInfo: AurumServerInfo, cancellation: CancellationToken): ObjectDataSource<T>;
        static toObjectDataSource<T>(value: T | ObjectDataSource<T>): ObjectDataSource<T>;
        toString(): string;
        pickObject<K extends keyof T>(key: K, cancellationToken?: CancellationToken): ObjectDataSource<T[K]>;
        pickArray<K extends keyof T>(key: K, cancellationToken?: CancellationToken): ArrayDataSource<FlatArray<T[K], 1>>;
        /**
         * Creates a datasource for a single key of the object
         * @param key
         * @param cancellationToken
         */
        pick<K extends keyof T>(key: K, cancellationToken?: CancellationToken): DataSource<T[K]>;
        /**
         * Creates a duplexdatasource for a single key of the object
         * @param key
         * @param cancellationToken
         */
        pickDuplex<K extends keyof T>(key: K, cancellationToken?: CancellationToken): DuplexDataSource<T[K]>;
        hasKey(key: keyof T): boolean;
        applyObjectChange(change: ObjectChange<T, keyof T>): void;
        /**
         * Listen to changes of the object
         */
        listen(callback: Callback<ObjectChange<T, keyof T>>, cancellationToken?: CancellationToken): Callback<void>;
        map<D>(mapper: (key: keyof T, value: T[keyof T]) => D): ArrayDataSource<D>;
        /**
         * Same as listen but will immediately call the callback with the current value of each key
         */
        listenAndRepeat(callback: Callback<ObjectChange<T, keyof T>>, cancellationToken?: CancellationToken): Callback<void>;
        /**
         * Same as listenOnKey but will immediately call the callback with the current value first
         */
        listenOnKeyAndRepeat<K extends keyof T>(key: K, callback: Callback<ObjectChange<T, keyof T>>, cancellationToken?: CancellationToken): Callback<void>;
        /**
         * Listen to changes of a single key of the object
         */
        listenOnKey<K extends keyof T>(key: K, callback: Callback<ObjectChange<T, K>>, cancellationToken?: CancellationToken): Callback<void>;
        /**
         * Returns all the keys of the object in the source
         */
        keys(): string[];
        /**
         * Returns all the values of the object in the source
         */
        values(): any;
        /**
         * get the current value of a key of the object
         * @param key
         */
        get<K extends keyof T>(key: K): T[K];
        /**
         * delete a key from the object
         * @param key
         * @param value
         */
        delete<K extends keyof T>(key: K): void;
        /**
         * set the value for a key of the object
         * @param key
         * @param value
         */
        set<K extends keyof T>(key: K, value: T[K]): void;
        /**
         * Merge the key value pairs of an object into this object non recursively
         * @param newData
         */
        assign(newData: Partial<T> | ObjectDataSource<T>): void;
        /**
         * Merge the key value pairs of an object into this object non recursively and delete properties that do not exist in the newData
         * @param newData
         */
        merge(newData: Partial<T> | ObjectDataSource<T>): void;
        /**
         * Deletes all keys
         */
        clear(): void;
        getData(): Readonly<T>;
        /**
         * Returns a shallow copy of the object
         */
        toObject(): T;
        /**
         * Returns a simplified version of this datasource
         */
        toDataSource(): DataSource<T>;
    }
}
declare module "aurum_server/aurum_server_client" {
    import { ArrayDataSource, DataSource, MapDataSource, SetDataSource } from "stream/data_source";
    import { DuplexDataSource } from "stream/duplex_data_source";
    import { ObjectDataSource } from "stream/object_data_source";
    import { CancellationToken } from "utilities/cancellation_token";
    export enum RemoteProtocol {
        HEARTBEAT = 0,
        LISTEN_DATASOURCE = 1,
        LISTEN_DATASOURCE_ERR = 2,
        UPDATE_DATASOURCE = 3,
        UPDATE_DATASOURCE_ERR = 4,
        CANCEL_DATASOURCE = 5,
        PERFORM_RPC = 6,
        PERFORM_RPC_ERR = 7,
        PERFORM_RPC_RESULT = 8,
        PERFORM_RPC_RESULT_ERR = 9,
        LISTEN_DUPLEX_DATASOURCE_ERR = 10,
        LISTEN_DUPLEX_DATASOURCE = 11,
        UPDATE_DUPLEX_DATASOURCE = 12,
        UPDATE_DUPLEX_DATASOURCE_ERR = 13,
        CANCEL_DUPLEX_DATASOURCE = 14,
        LISTEN_ARRAY_DATASOURCE = 15,
        LISTEN_ARRAY_DATASOURCE_ERR = 16,
        UPDATE_ARRAY_DATASOURCE = 17,
        UPDATE_ARRAY_DATASOURCE_ERR = 18,
        CANCEL_ARRAY_DATASOURCE = 19,
        LISTEN_MAP_DATASOURCE = 20,
        LISTEN_MAP_DATASOURCE_ERR = 21,
        UPDATE_MAP_DATASOURCE = 22,
        UPDATE_MAP_DATASOURCE_ERR = 23,
        CANCEL_MAP_DATASOURCE = 24,
        LISTEN_OBJECT_DATASOURCE = 25,
        LISTEN_OBJECT_DATASOURCE_ERR = 26,
        UPDATE_OBJECT_DATASOURCE = 27,
        UPDATE_OBJECT_DATASOURCE_ERR = 28,
        CANCEL_OBJECT_DATASOURCE = 29,
        LISTEN_SET_DATASOURCE = 30,
        LISTEN_SET_DATASOURCE_ERR = 31,
        UPDATE_SET_DATASOURCE = 32,
        UPDATE_SET_DATASOURCE_ERR = 33,
        CANCEL_SET_DATASOURCE = 34
    }
    export interface AurumServerInfo {
        protocol?: 'wss' | 'ws';
        host?: string;
        id: string;
        authenticationToken?: string;
    }
    export function getRemoteFunction<I, O = void>(aurumServerInfo: AurumServerInfo, cancellation: CancellationToken): (input: I) => Promise<O>;
    export function syncSetDataSource(source: SetDataSource<any>, aurumServerInfo: AurumServerInfo, cancellation: CancellationToken): Promise<void>;
    export function syncObjectDataSource(source: ObjectDataSource<any>, aurumServerInfo: AurumServerInfo, cancellation: CancellationToken): Promise<void>;
    export function syncMapDataSource(source: MapDataSource<any, any>, aurumServerInfo: AurumServerInfo, cancellation: CancellationToken): Promise<void>;
    export function syncDataSource(source: DataSource<any>, aurumServerInfo: AurumServerInfo, cancellation: CancellationToken): Promise<void>;
    export function syncArrayDataSource(source: ArrayDataSource<any>, aurumServerInfo: AurumServerInfo, cancellation: CancellationToken): Promise<void>;
    export function syncDuplexDataSource(source: DuplexDataSource<any>, aurumServerInfo: AurumServerInfo, cancellation: CancellationToken): Promise<void>;
}
declare module "debug_mode" {
    import { DataSource } from "stream/data_source";
    export let debugMode: boolean;
    export let diagnosticMode: boolean;
    export function enableDiagnosticMode(): void;
    /**
     * Initializes the debug features of aurum. Required for the use of aurum devtools
     * Run this function before creating any streams or any aurum components for best results
     * Enabling this harms performance and breaks backwards compatibility with some browsers
     * Do not enable in production
     */
    export function enableDebugMode(): void;
    export function debugRegisterStream(stream: DataSource<any>, stack: string): void;
    export function debugRegisterLink(parent: DataSource<any>, child: DataSource<any>): void;
    export function debugRegisterUnlink(parent: DataSource<any>, child: DataSource<any>): void;
    export function debugDeclareUpdate(source: DataSource<any>, value: any, stack: string): void;
    export function debugRegisterConsumer(stream: DataSource<any>, consumer: string, consumerStack: string): void;
    export type SerializedStreamData = Omit<StreamData, 'reference'>;
    export interface StreamData {
        name: string;
        id: number;
        value: any;
        reference: WeakRef<DataSource<any>>;
        parents: number[];
        stack: string;
        timestamp: number;
        children: number[];
        consumers: {
            code: string;
            stack: string;
        }[];
    }
    class WeakRef<T> {
        constructor(item: T);
        deref(): T | undefined;
    }
}
declare module "stream/data_source" {
    import { AurumServerInfo } from "aurum_server/aurum_server_client";
    import { CancellationToken } from "utilities/cancellation_token";
    import { Callback, Predicate } from "utilities/common";
    import { EventEmitter } from "utilities/event_emitter";
    import { DuplexDataSource } from "stream/duplex_data_source";
    import { DataSourceOperator } from "stream/operator_model";
    export interface ReadOnlyDataSource<T> {
        readonly value: T;
        readonly name: string;
        listenAndRepeat(callback: Callback<T>, cancellationToken?: CancellationToken): Callback<void>;
        listen(callback: Callback<T>, cancellationToken?: CancellationToken): Callback<void>;
        listenOnce(callback: Callback<T>, cancellationToken?: CancellationToken): Callback<void>;
        awaitNextUpdate(cancellationToken?: CancellationToken): Promise<T>;
        aggregate<R, A>(otherSources: [ReadOnlyDataSource<A>], combinator: (self: T, other: A) => R, cancellationToken?: CancellationToken): DataSource<R>;
        aggregate<R, A, B>(otherSources: [ReadOnlyDataSource<A>, ReadOnlyDataSource<B>], combinator?: (self: T, second: A, third: B) => R, cancellationToken?: CancellationToken): DataSource<R>;
        aggregate<R, A, B, C>(otherSources: [ReadOnlyDataSource<A>, ReadOnlyDataSource<B>, ReadOnlyDataSource<C>], combinator?: (self: T, second: A, third: B, fourth: C) => R, cancellationToken?: CancellationToken): DataSource<R>;
        aggregate<R, A, B, C, D>(otherSources: [ReadOnlyDataSource<A>, ReadOnlyDataSource<B>, ReadOnlyDataSource<C>, ReadOnlyDataSource<D>], combinator?: (self: T, second: A, third: B, fourth: C, fifth: D) => R, cancellationToken?: CancellationToken): DataSource<R>;
        aggregate<R, A, B, C, D, E>(otherSources: [ReadOnlyDataSource<A>, ReadOnlyDataSource<B>, ReadOnlyDataSource<C>, ReadOnlyDataSource<D>, ReadOnlyDataSource<E>], combinator?: (self: T, second: A, third: B, fourth: C, fifth: D, sixth: E) => R, cancellationToken?: CancellationToken): DataSource<R>;
        aggregate<R, A, B, C, D, E, F>(otherSources: [
            ReadOnlyDataSource<A>,
            ReadOnlyDataSource<B>,
            ReadOnlyDataSource<C>,
            ReadOnlyDataSource<D>,
            ReadOnlyDataSource<E>,
            ReadOnlyDataSource<F>
        ], combinator?: (self: T, second: A, third: B, fourth: C, fifth: D, sixth: E, seventh: F) => R, cancellationToken?: CancellationToken): DataSource<R>;
        aggregate<R, A, B, C, D, E, F, G>(otherSources: [
            ReadOnlyDataSource<A>,
            ReadOnlyDataSource<B>,
            ReadOnlyDataSource<C>,
            ReadOnlyDataSource<D>,
            ReadOnlyDataSource<E>,
            ReadOnlyDataSource<F>,
            ReadOnlyDataSource<G>
        ], combinator?: (self: T, second: A, third: B, fourth: C, fifth: D, sixth: E, seventh: F, eigth: G) => R, cancellationToken?: CancellationToken): DataSource<R>;
        aggregate<R, A, B, C, D, E, F, G, H>(otherSources: [
            ReadOnlyDataSource<A>,
            ReadOnlyDataSource<B>,
            ReadOnlyDataSource<C>,
            ReadOnlyDataSource<D>,
            ReadOnlyDataSource<E>,
            ReadOnlyDataSource<F>,
            ReadOnlyDataSource<G>,
            ReadOnlyDataSource<H>
        ], combinator?: (self: T, second: A, third: B, fourth: C, fifth: D, sixth: E, seventh: F, eigth: G, ninth: H) => R, cancellationToken?: CancellationToken): DataSource<R>;
        aggregate<R, A, B, C, D, E, F, G, H, I>(otherSources: [
            ReadOnlyDataSource<A>,
            ReadOnlyDataSource<B>,
            ReadOnlyDataSource<C>,
            ReadOnlyDataSource<D>,
            ReadOnlyDataSource<E>,
            ReadOnlyDataSource<F>,
            ReadOnlyDataSource<G>,
            ReadOnlyDataSource<H>,
            ReadOnlyDataSource<I>
        ], combinator?: (self: T, second: A, third: B, fourth: C, fifth: D, sixth: E, seventh: F, eigth: G, ninth: H, tenth: I) => R, cancellationToken?: CancellationToken): DataSource<R>;
        aggregate<R>(otherSources: ReadOnlyDataSource<any>[], combinator?: (...data: any[]) => R, cancellationToken?: CancellationToken): DataSource<R>;
        transform<A, B = A, C = B, D = C, E = D, F = E, G = F, H = G, I = H, J = I, K = J>(operationA: DataSourceOperator<T, A>, operationB?: DataSourceOperator<A, B> | CancellationToken, operationC?: DataSourceOperator<B, C> | CancellationToken, operationD?: DataSourceOperator<C, D> | CancellationToken, operationE?: DataSourceOperator<D, E> | CancellationToken, operationF?: DataSourceOperator<E, F> | CancellationToken, operationG?: DataSourceOperator<F, G> | CancellationToken, operationH?: DataSourceOperator<G, H> | CancellationToken, operationI?: DataSourceOperator<H, I> | CancellationToken, operationJ?: DataSourceOperator<I, J> | CancellationToken, operationK?: DataSourceOperator<J, K> | CancellationToken, cancellationToken?: CancellationToken): ReadOnlyDataSource<K>;
    }
    export interface GenericDataSource<T> extends ReadOnlyDataSource<T> {
        readonly value: T;
        readonly name: string;
        listenAndRepeat(callback: Callback<T>, cancellationToken?: CancellationToken): Callback<void>;
        listen(callback: Callback<T>, cancellationToken?: CancellationToken): Callback<void>;
        listenOnce(callback: Callback<T>, cancellationToken?: CancellationToken): Callback<void>;
        awaitNextUpdate(cancellationToken?: CancellationToken): Promise<T>;
        withInitial(value: T): this;
        aggregate<R, A>(otherSources: [ReadOnlyDataSource<A>], combinator: (self: T, other: A) => R, cancellationToken?: CancellationToken): DataSource<R>;
        aggregate<R, A, B>(otherSources: [ReadOnlyDataSource<A>, ReadOnlyDataSource<B>], combinator?: (self: T, second: A, third: B) => R, cancellationToken?: CancellationToken): DataSource<R>;
        aggregate<R, A, B, C>(otherSources: [ReadOnlyDataSource<A>, ReadOnlyDataSource<B>, ReadOnlyDataSource<C>], combinator?: (self: T, second: A, third: B, fourth: C) => R, cancellationToken?: CancellationToken): DataSource<R>;
        aggregate<R, A, B, C, D>(otherSources: [ReadOnlyDataSource<A>, ReadOnlyDataSource<B>, ReadOnlyDataSource<C>, ReadOnlyDataSource<D>], combinator?: (self: T, second: A, third: B, fourth: C, fifth: D) => R, cancellationToken?: CancellationToken): DataSource<R>;
        aggregate<R, A, B, C, D, E>(otherSources: [ReadOnlyDataSource<A>, ReadOnlyDataSource<B>, ReadOnlyDataSource<C>, ReadOnlyDataSource<D>, ReadOnlyDataSource<E>], combinator?: (self: T, second: A, third: B, fourth: C, fifth: D, sixth: E) => R, cancellationToken?: CancellationToken): DataSource<R>;
        aggregate<R, A, B, C, D, E, F>(otherSources: [
            ReadOnlyDataSource<A>,
            ReadOnlyDataSource<B>,
            ReadOnlyDataSource<C>,
            ReadOnlyDataSource<D>,
            ReadOnlyDataSource<E>,
            ReadOnlyDataSource<F>
        ], combinator?: (self: T, second: A, third: B, fourth: C, fifth: D, sixth: E, seventh: F) => R, cancellationToken?: CancellationToken): DataSource<R>;
        aggregate<R, A, B, C, D, E, F, G>(otherSources: [
            ReadOnlyDataSource<A>,
            ReadOnlyDataSource<B>,
            ReadOnlyDataSource<C>,
            ReadOnlyDataSource<D>,
            ReadOnlyDataSource<E>,
            ReadOnlyDataSource<F>,
            ReadOnlyDataSource<G>
        ], combinator?: (self: T, second: A, third: B, fourth: C, fifth: D, sixth: E, seventh: F, eigth: G) => R, cancellationToken?: CancellationToken): DataSource<R>;
        aggregate<R, A, B, C, D, E, F, G, H>(otherSources: [
            ReadOnlyDataSource<A>,
            ReadOnlyDataSource<B>,
            ReadOnlyDataSource<C>,
            ReadOnlyDataSource<D>,
            ReadOnlyDataSource<E>,
            ReadOnlyDataSource<F>,
            ReadOnlyDataSource<G>,
            ReadOnlyDataSource<H>
        ], combinator?: (self: T, second: A, third: B, fourth: C, fifth: D, sixth: E, seventh: F, eigth: G, ninth: H) => R, cancellationToken?: CancellationToken): DataSource<R>;
        aggregate<R, A, B, C, D, E, F, G, H, I>(otherSources: [
            ReadOnlyDataSource<A>,
            ReadOnlyDataSource<B>,
            ReadOnlyDataSource<C>,
            ReadOnlyDataSource<D>,
            ReadOnlyDataSource<E>,
            ReadOnlyDataSource<F>,
            ReadOnlyDataSource<G>,
            ReadOnlyDataSource<H>,
            ReadOnlyDataSource<I>
        ], combinator?: (self: T, second: A, third: B, fourth: C, fifth: D, sixth: E, seventh: F, eigth: G, ninth: H, tenth: I) => R, cancellationToken?: CancellationToken): DataSource<R>;
        aggregate<R>(otherSources: ReadOnlyDataSource<any>[], combinator?: (...data: any[]) => R, cancellationToken?: CancellationToken): DataSource<R>;
        transform<A, B = A, C = B, D = C, E = D, F = E, G = F, H = G, I = H, J = I, K = J>(operationA: DataSourceOperator<T, A>, operationB?: DataSourceOperator<A, B> | CancellationToken, operationC?: DataSourceOperator<B, C> | CancellationToken, operationD?: DataSourceOperator<C, D> | CancellationToken, operationE?: DataSourceOperator<D, E> | CancellationToken, operationF?: DataSourceOperator<E, F> | CancellationToken, operationG?: DataSourceOperator<F, G> | CancellationToken, operationH?: DataSourceOperator<G, H> | CancellationToken, operationI?: DataSourceOperator<H, I> | CancellationToken, operationJ?: DataSourceOperator<I, J> | CancellationToken, operationK?: DataSourceOperator<J, K> | CancellationToken, cancellationToken?: CancellationToken): DataSource<K>;
    }
    /**
     * Datasources wrap a value and allow you to update it in an observable way. Datasources can be manipulated like streams and can be bound directly in the JSX syntax and will update the html whenever the value changes
     */
    export class DataSource<T> implements GenericDataSource<T>, ReadOnlyDataSource<T> {
        /**
         * The current value of this data source, can be changed through update
         */
        value: T;
        private primed;
        private updating;
        name: string;
        protected updateEvent: EventEmitter<T>;
        protected errorHandler: (error: any) => T;
        protected errorEvent: EventEmitter<Error>;
        constructor(initialValue?: T, name?: string);
        toString(): string;
        static toDataSource<T>(value: T | DataSource<T>): DataSource<T>;
        static fromEvent<T>(event: EventEmitter<T>, cancellation: CancellationToken): DataSource<T>;
        /**
         * Connects to an aurum-server exposed datasource. View https://github.com/CyberPhoenix90/aurum-server for more information
         * Note that type safety is not guaranteed. Whatever the server sends as an update will be propagated
         * @param  {AurumServerInfo} aurumServerInfo
         * @returns DataSource
         */
        static fromRemoteSource<T>(aurumServerInfo: AurumServerInfo, cancellation: CancellationToken): DataSource<T>;
        static fromMultipleSources<T>(sources: ReadOnlyDataSource<T>[], cancellation?: CancellationToken): DataSource<T>;
        /**
         * Allows tapping into the stream and calls a function for each value.
         */
        tap(callback: (value: T) => void, cancellationToken?: CancellationToken): DataSource<T>;
        /**
         * Assign a function to handle errors and map them back to regular values. Rethrow the error in case you want to fallback to emitting error
         */
        handleErrors(callback: (error: any) => T): this;
        onError(callback: (error: any) => void, cancellationToken?: CancellationToken): this;
        emitError(e: Error): void;
        /**
         * Updates with the same value as the last value
         */
        repeatLast(): this;
        /**
         * Updates the value in the data source and calls the listen callback for all listeners
         * @param newValue new value for the data source
         */
        update(newValue: T): void;
        /**
         * Updates the data source with a value if it has never had a value before
         */
        withInitial(value: T): this;
        /**
         * Same as listen but will immediately call the callback with the current value first
         * @param callback Callback to call when value is updated
         * @param cancellationToken Optional token to control the cancellation of the subscription
         * @returns Cancellation callback, can be used to cancel subscription without a cancellation token
         */
        listenAndRepeat(callback: Callback<T>, cancellationToken?: CancellationToken): Callback<void>;
        private listenAndRepeatInternal;
        /**
         * Subscribes to the updates of the data stream
         * @param callback Callback to call when value is updated
         * @param cancellationToken Optional token to control the cancellation of the subscription
         * @returns Cancellation callback, can be used to cancel subscription without a cancellation token
         */
        listen(callback: Callback<T>, cancellationToken?: CancellationToken): Callback<void>;
        private listenInternal;
        /**
         * Subscribes to the updates of the data stream for a single update
         * @param callback Callback to call when value is updated
         * @param cancellationToken Optional token to control the cancellation of the subscription
         * @returns Cancellation callback, can be used to cancel subscription without a cancellation token
         */
        listenOnce(callback: Callback<T>, cancellationToken?: CancellationToken): Callback<void>;
        transform<A, B = A, C = B, D = C, E = D, F = E, G = F, H = G, I = H, J = I, K = J>(operationA: DataSourceOperator<T, A>, operationB?: DataSourceOperator<A, B> | CancellationToken, operationC?: DataSourceOperator<B, C> | CancellationToken, operationD?: DataSourceOperator<C, D> | CancellationToken, operationE?: DataSourceOperator<D, E> | CancellationToken, operationF?: DataSourceOperator<E, F> | CancellationToken, operationG?: DataSourceOperator<F, G> | CancellationToken, operationH?: DataSourceOperator<G, H> | CancellationToken, operationI?: DataSourceOperator<H, I> | CancellationToken, operationJ?: DataSourceOperator<I, J> | CancellationToken, operationK?: DataSourceOperator<J, K> | CancellationToken, cancellationToken?: CancellationToken): DataSource<K>;
        static fromAggregation<R, A>(sources: [ReadOnlyDataSource<A>], combinator?: (first: A) => R, cancellationToken?: CancellationToken): DataSource<R>;
        static fromAggregation<R, A, B>(sources: [ReadOnlyDataSource<A>, ReadOnlyDataSource<B>], combinator?: (first: A, second: B) => R, cancellationToken?: CancellationToken): DataSource<R>;
        static fromAggregation<R, A, B, C>(sources: [ReadOnlyDataSource<A>, ReadOnlyDataSource<B>, ReadOnlyDataSource<C>], combinator?: (first: A, second: B, third: C) => R, cancellationToken?: CancellationToken): DataSource<R>;
        static fromAggregation<R, A, B, C, D>(sources: [ReadOnlyDataSource<A>, ReadOnlyDataSource<B>, ReadOnlyDataSource<C>, ReadOnlyDataSource<D>], combinator?: (first: A, second: B, third: C, fourth: D) => R, cancellationToken?: CancellationToken): DataSource<R>;
        static fromAggregation<R, A, B, C, D, E>(sources: [ReadOnlyDataSource<A>, ReadOnlyDataSource<B>, ReadOnlyDataSource<C>, ReadOnlyDataSource<D>, ReadOnlyDataSource<E>], combinator?: (first: A, second: B, third: C, fourth: D, fifth: E) => R, cancellationToken?: CancellationToken): DataSource<R>;
        static fromAggregation<R, A, B, C, D, E, F>(sources: [ReadOnlyDataSource<A>, ReadOnlyDataSource<B>, ReadOnlyDataSource<C>, ReadOnlyDataSource<D>, ReadOnlyDataSource<E>, ReadOnlyDataSource<F>], combinator?: (first: A, second: B, third: C, fourth: D, fifth: E, sixth: F) => R, cancellationToken?: CancellationToken): DataSource<R>;
        static fromAggregation<R, A, B, C, D, E, F, G>(sources: [
            ReadOnlyDataSource<A>,
            ReadOnlyDataSource<B>,
            ReadOnlyDataSource<C>,
            ReadOnlyDataSource<D>,
            ReadOnlyDataSource<E>,
            ReadOnlyDataSource<F>,
            ReadOnlyDataSource<G>
        ], combinator?: (first: A, second: B, third: C, fourth: D, fifth: E, sixth: F, seventh: G) => R, cancellationToken?: CancellationToken): DataSource<R>;
        static fromAggregation<R, A, B, C, D, E, F, G, H>(sources: [
            ReadOnlyDataSource<A>,
            ReadOnlyDataSource<B>,
            ReadOnlyDataSource<C>,
            ReadOnlyDataSource<D>,
            ReadOnlyDataSource<E>,
            ReadOnlyDataSource<F>,
            ReadOnlyDataSource<G>,
            ReadOnlyDataSource<H>
        ], combinator?: (first: A, second: B, third: C, fourth: D, fifth: E, sixth: F, seventh: G, eigth: H) => R, cancellationToken?: CancellationToken): DataSource<R>;
        static fromAggregation<R, A, B, C, D, E, F, G, H, I>(sources: [
            ReadOnlyDataSource<A>,
            ReadOnlyDataSource<B>,
            ReadOnlyDataSource<C>,
            ReadOnlyDataSource<D>,
            ReadOnlyDataSource<E>,
            ReadOnlyDataSource<F>,
            ReadOnlyDataSource<G>,
            ReadOnlyDataSource<H>,
            ReadOnlyDataSource<I>
        ], combinator?: (first: A, second: B, third: C, fourth: D, fifth: E, sixth: F, seventh: G, eigth: H, ninth: I) => R, cancellationToken?: CancellationToken): DataSource<R>;
        /**
         * Combines two or more sources into a new source that listens to updates from both parent sources and combines them
         * @param otherSource Second parent for the new source
         * @param combinator Method allowing you to combine the data from both parents on update. Called each time a parent is updated with the latest values of both parents
         * @param cancellationToken  Cancellation token to cancel the subscriptions the new datasource has to the two parent datasources
         */
        aggregate<R, A>(otherSources: [ReadOnlyDataSource<A>], combinator: (self: T, other: A) => R, cancellationToken?: CancellationToken): DataSource<R>;
        aggregate<R, A, B>(otherSources: [ReadOnlyDataSource<A>, ReadOnlyDataSource<B>], combinator?: (self: T, second: A, third: B) => R, cancellationToken?: CancellationToken): DataSource<R>;
        aggregate<R, A, B, C>(otherSources: [ReadOnlyDataSource<A>, ReadOnlyDataSource<B>, ReadOnlyDataSource<C>], combinator?: (self: T, second: A, third: B, fourth: C) => R, cancellationToken?: CancellationToken): DataSource<R>;
        aggregate<R, A, B, C, D>(otherSources: [ReadOnlyDataSource<A>, ReadOnlyDataSource<B>, ReadOnlyDataSource<C>, ReadOnlyDataSource<D>], combinator?: (self: T, second: A, third: B, fourth: C, fifth: D) => R, cancellationToken?: CancellationToken): DataSource<R>;
        aggregate<R, A, B, C, D, E>(otherSources: [ReadOnlyDataSource<A>, ReadOnlyDataSource<B>, ReadOnlyDataSource<C>, ReadOnlyDataSource<D>, ReadOnlyDataSource<E>], combinator?: (self: T, second: A, third: B, fourth: C, fifth: D, sixth: E) => R, cancellationToken?: CancellationToken): DataSource<R>;
        aggregate<R, A, B, C, D, E, F>(otherSources: [
            ReadOnlyDataSource<A>,
            ReadOnlyDataSource<B>,
            ReadOnlyDataSource<C>,
            ReadOnlyDataSource<D>,
            ReadOnlyDataSource<E>,
            ReadOnlyDataSource<F>
        ], combinator?: (self: T, second: A, third: B, fourth: C, fifth: D, sixth: E, seventh: F) => R, cancellationToken?: CancellationToken): DataSource<R>;
        aggregate<R, A, B, C, D, E, F, G>(otherSources: [
            ReadOnlyDataSource<A>,
            ReadOnlyDataSource<B>,
            ReadOnlyDataSource<C>,
            ReadOnlyDataSource<D>,
            ReadOnlyDataSource<E>,
            ReadOnlyDataSource<F>,
            ReadOnlyDataSource<G>
        ], combinator?: (self: T, second: A, third: B, fourth: C, fifth: D, sixth: E, seventh: F, eigth: G) => R, cancellationToken?: CancellationToken): DataSource<R>;
        aggregate<R, A, B, C, D, E, F, G, H>(otherSources: [
            ReadOnlyDataSource<A>,
            ReadOnlyDataSource<B>,
            ReadOnlyDataSource<C>,
            ReadOnlyDataSource<D>,
            ReadOnlyDataSource<E>,
            ReadOnlyDataSource<F>,
            ReadOnlyDataSource<G>,
            ReadOnlyDataSource<H>
        ], combinator?: (self: T, second: A, third: B, fourth: C, fifth: D, sixth: E, seventh: F, eigth: G, ninth: H) => R, cancellationToken?: CancellationToken): DataSource<R>;
        aggregate<R, A, B, C, D, E, F, G, H, I>(otherSources: [
            ReadOnlyDataSource<A>,
            ReadOnlyDataSource<B>,
            ReadOnlyDataSource<C>,
            ReadOnlyDataSource<D>,
            ReadOnlyDataSource<E>,
            ReadOnlyDataSource<F>,
            ReadOnlyDataSource<G>,
            ReadOnlyDataSource<H>,
            ReadOnlyDataSource<I>
        ], combinator?: (self: T, second: A, third: B, fourth: C, fifth: D, sixth: E, seventh: F, eigth: G, ninth: H, tenth: I) => R, cancellationToken?: CancellationToken): DataSource<R>;
        /**
         * Forwards all updates from this source to another
         * @param targetDataSource datasource to pipe the updates to
         * @param cancellationToken  Cancellation token to cancel the subscription the target datasource has to this datasource
         */
        pipe(targetDataSource: DataSource<T>, cancellationToken?: CancellationToken): this;
        /**
         * Like aggregate except that it aggregates an array data source of datasources
         * @param data Second parent for the new source
         * @param cancellationToken  Cancellation token to cancel the subscriptions the new datasource has to the two parent datasources
         */
        static dynamicAggregation<I, O>(data: ReadOnlyArrayDataSource<ReadOnlyDataSource<I>>, aggregate: (items: readonly I[]) => O, cancellationToken?: CancellationToken): DataSource<O>;
        /**
         * Like aggregate except that no combination method is needed as a result both parents must have the same type and the new stream just exposes the last update recieved from either parent
         * @param otherSource Second parent for the new source
         * @param cancellationToken  Cancellation token to cancel the subscriptions the new datasource has to the two parent datasources
         */
        combine(otherSources: DataSource<T>[], cancellationToken?: CancellationToken): DataSource<T>;
        /**
         * Returns a promise that resolves when the next update occurs
         * @param cancellationToken
         */
        awaitNextUpdate(cancellationToken?: CancellationToken): Promise<T>;
        /**
         * Remove all listeners
         */
        cancelAll(): void;
    }
    type DetailedOperations = 'replace' | 'append' | 'prepend' | 'removeRight' | 'removeLeft' | 'remove' | 'swap' | 'clear' | 'merge' | 'insert';
    export interface CollectionChange<T> {
        operation: 'replace' | 'swap' | 'add' | 'remove' | 'merge';
        operationDetailed: DetailedOperations;
        count?: number;
        index: number;
        index2?: number;
        target?: T;
        items: T[];
        newState: T[];
        previousState?: T[];
    }
    export interface ReadOnlyArrayDataSource<T> {
        [Symbol.iterator](): IterableIterator<T>;
        onItemsAdded: EventEmitter<T[]>;
        onItemsRemoved: EventEmitter<T[]>;
        listenAndRepeat(callback: Callback<CollectionChange<T>>, cancellationToken?: CancellationToken): Callback<void>;
        listen(callback: Callback<CollectionChange<T>>, cancellationToken?: CancellationToken): Callback<void>;
        listenOnce(callback: Callback<CollectionChange<T>>, cancellationToken?: CancellationToken): Callback<void>;
        awaitNextUpdate(cancellationToken?: CancellationToken): Promise<CollectionChange<T>>;
        length: ReadOnlyDataSource<number>;
        getData(): ReadonlyArray<T>;
        get(index: number): T;
        indexOf(item: T): number;
        find(predicate: (value: T, index: number, obj: T[]) => boolean, thisArg?: any): T;
        findIndex(predicate: (value: T, index: number, obj: T[]) => boolean, thisArg?: any): number;
        lastIndexOf(item: T): number;
        includes(item: T): boolean;
        some(cb: (item: T, index: number, array: T[]) => boolean): boolean;
        every(cb: (item: T, index: number, array: T[]) => boolean): boolean;
        toArray(): T[];
        forEach(callbackfn: (value: T, index: number, array: T[]) => void): void;
        reverse(cancellationToken?: CancellationToken, config?: ViewConfig): ReadOnlyArrayDataSource<T>;
        flat(cancellationToken?: CancellationToken, config?: ViewConfig): T extends ReadOnlyArrayDataSource<infer U> ? ReadOnlyArrayDataSource<U> : ReadOnlyArrayDataSource<FlatArray<T, 1>>;
        sort(comparator?: (a: T, b: T) => number, dependencies?: ReadOnlyDataSource<any>[], cancellationToken?: CancellationToken, config?: ViewConfig): ReadOnlyArrayDataSource<T>;
        map<D>(mapper: (data: T) => D, dependencies?: ReadOnlyDataSource<any>[], cancellationToken?: CancellationToken, config?: ViewConfig): ReadOnlyArrayDataSource<D>;
        slice(start: number | DataSource<number>, end?: number | DataSource<number>, cancellationToken?: CancellationToken, config?: ViewConfig): ReadOnlyArrayDataSource<T>;
        reduce<R>(reducer: (acc: R, value: T) => R, initial?: R, cancellationToken?: CancellationToken): DataSource<R>;
        unique(cancellationToken?: CancellationToken, config?: ViewConfig): ReadOnlyArrayDataSource<T>;
        indexBy<K extends keyof T>(key: K, cancellationToken?: CancellationToken, config?: ViewConfig): MapDataSource<T[K], T>;
        indexByProvider<K>(provider: (item: T) => K, cancellationToken?: CancellationToken, config?: ViewConfig): MapDataSource<K, T>;
        groupBy<K extends keyof T>(key: K, cancellationToken?: CancellationToken, config?: ViewConfig): MapDataSource<T[K], ReadOnlyArrayDataSource<T>>;
        groupByProvider<K>(provider: (item: T) => K, cancellationToken?: CancellationToken, config?: ViewConfig): MapDataSource<K, ReadOnlyArrayDataSource<T>>;
        groupByMultiProvider<K>(provider: (item: T) => K[], cancellationToken?: CancellationToken, config?: ViewConfig): MapDataSource<K, ReadOnlyArrayDataSource<T>>;
        filter(callback: Predicate<T>, dependencies?: ReadOnlyDataSource<any>[], cancellationToken?: CancellationToken, config?: ViewConfig): ReadOnlyArrayDataSource<T>;
        toSetDataSource(cancellationToken: CancellationToken): ReadOnlySetDataSource<T>;
        pipe(target: ArrayDataSource<T>, cancellation?: CancellationToken): void;
    }
    export class ArrayDataSource<T> implements ReadOnlyArrayDataSource<T> {
        protected data: T[];
        protected updateEvent: EventEmitter<CollectionChange<T>>;
        private lengthSource;
        private name;
        onItemsAdded: EventEmitter<T[]>;
        onItemsRemoved: EventEmitter<T[]>;
        constructor(initialData?: T[], name?: string);
        [Symbol.iterator](): IterableIterator<T>;
        toSetDataSource(cancellationToken: CancellationToken): ReadOnlySetDataSource<T>;
        toString(): string;
        static fromFetchText(response: Response, config?: {
            onComplete?: () => void;
            itemSeperatorSequence: string;
        }): ArrayDataSource<string>;
        static fromFetchJSON<T>(response: Response, config?: {
            onParseError?: (item: any) => T;
            onComplete?: () => void;
            itemSeperatorSequence: string;
        }): ArrayDataSource<T>;
        /**
         * Connects to an aurum-server exposed array datasource. View https://github.com/CyberPhoenix90/aurum-server for more information
         * Note that type safety is not guaranteed. Whatever the server sends as an update will be propagated
         * @param  {AurumServerInfo} aurumServerInfo
         * @returns DataSource
         */
        static fromRemoteSource<T>(aurumServerInfo: AurumServerInfo, cancellation: CancellationToken): ArrayDataSource<T>;
        static fromMultipleSources<T>(sources: Array<ReadOnlyArrayDataSource<T> | T[] | ReadOnlyDataSource<T>>, cancellationToken?: CancellationToken): ReadOnlyArrayDataSource<T>;
        /**
         * Creates a new array data source where the type T is no longer wrapped by a DataSource however the values of these data sources are observed on the parent
         * array data source and changes are forwarded to the new array data source through array mutations. This makes it possible to use view methods such as map and filter
         * on the raw data instead of on data sources to cover highly dynamic use cases
         */
        static DynamicArrayDataSourceToArrayDataSource<T>(arrayDataSource: ReadOnlyArrayDataSource<ReadOnlyDataSource<T> | T> | ReadOnlyArrayDataSource<DataSource<T> | T> | ReadOnlyArrayDataSource<DataSource<T>> | ReadOnlyArrayDataSource<ReadOnlyDataSource<T>> | ReadOnlyArrayDataSource<GenericDataSource<T>> | ReadOnlyArrayDataSource<DuplexDataSource<T>>, cancellation: CancellationToken): ReadOnlyArrayDataSource<T>;
        static toArrayDataSource<T>(value: T[] | ArrayDataSource<T>): ArrayDataSource<T>;
        pipe(target: ArrayDataSource<T>, cancellation?: CancellationToken): void;
        /**
         * Remove all listeners
         */
        cancelAll(): void;
        /**
         * Same as listen but will immediately call the callback with an append of all existing elements first
         */
        listenAndRepeat(callback: Callback<CollectionChange<T>>, cancellationToken?: CancellationToken): Callback<void>;
        /**
         * Sends a reset signal followed by an append with all items signal. This will force all the views of this source the synchronize can be useful in case your views rely on non pure transformation functions.
         */
        repeatCurrentState(): void;
        listen(callback: Callback<CollectionChange<T>>, cancellationToken?: CancellationToken): Callback<void>;
        listenOnce(callback: Callback<CollectionChange<T>>, cancellationToken?: CancellationToken): Callback<void>;
        /**
         * Applies the changes described in the colleciton change to the array. Useful for synchronizing array data sources over the network or workers by serializing the changes and sending them over
         * @param collectionChange
         */
        applyCollectionChange(collectionChange: CollectionChange<T>): void;
        /**
         * Returns a promise that resolves when the next update occurs
         * @param cancellationToken
         */
        awaitNextUpdate(cancellationToken?: CancellationToken): Promise<CollectionChange<T>>;
        get length(): DataSource<number>;
        getData(): ReadonlyArray<T>;
        get(index: number): T;
        set(index: number, item: T): void;
        indexOf(item: T): number;
        find(predicate: (value: T, index: number, obj: T[]) => boolean, thisArg?: any): T;
        findIndex(predicate: (value: T, index: number, obj: T[]) => boolean, thisArg?: any): number;
        lastIndexOf(item: T): number;
        includes(item: T): boolean;
        replace(item: T, newItem: T): void;
        swap(indexA: number, indexB: number): void;
        swapItems(itemA: T, itemB: T): void;
        appendArray(items: T[]): void;
        splice(index: number, deleteCount: number, ...insertion: T[]): T[];
        insertAt(index: number, ...items: T[]): void;
        push(...items: T[]): void;
        unshift(...items: T[]): void;
        pop(): T;
        merge(newData: T[]): void;
        removeRight(count: number): T[];
        removeLeft(count: number): void;
        removeAt(index: number, count?: number): T[];
        removeRange(start: number, end: number): T[];
        remove(item: T): T;
        clear(): void;
        some(cb: (item: T, index: number, array: T[]) => boolean): boolean;
        every(cb: (item: T, index: number, array: T[]) => boolean): boolean;
        shift(): T;
        toArray(): T[];
        flat(cancellationToken?: CancellationToken, config?: ViewConfig): T extends ReadOnlyArrayDataSource<infer U> ? ReadOnlyArrayDataSource<U> : ReadOnlyArrayDataSource<FlatArray<T, 1>>;
        reduce<R>(reducer: (acc: R, value: T) => R, initial?: R, cancellationToken?: CancellationToken): DataSource<R>;
        reverse(cancellationToken?: CancellationToken, config?: ViewConfig): ReversedArrayView<T>;
        sort(comparator?: (a: T, b: T) => number, dependencies?: ReadOnlyDataSource<any>[], cancellationToken?: CancellationToken, config?: ViewConfig): ReadOnlyArrayDataSource<T>;
        slice(start: number | DataSource<number>, end?: number | DataSource<number>, cancellationToken?: CancellationToken, config?: ViewConfig): ReadOnlyArrayDataSource<T>;
        map<D>(mapper: (data: T) => D, dependencies?: ReadOnlyDataSource<any>[], cancellationToken?: CancellationToken, config?: ViewConfig): ReadOnlyArrayDataSource<D>;
        unique(cancellationToken?: CancellationToken, config?: ViewConfig): UniqueArrayView<T>;
        indexBy<K extends keyof T>(key: K, cancellationToken?: CancellationToken, config?: ViewConfig): MapDataSource<T[K], T>;
        indexByProvider<K>(provider: (item: T) => K, cancellationToken?: CancellationToken, config?: ViewConfig): MapDataSource<K, T>;
        groupBy<K extends keyof T>(key: K, cancellationToken?: CancellationToken, config?: ViewConfig): MapDataSource<T[K], ReadOnlyArrayDataSource<T>>;
        groupByProvider<K>(provider: (item: T) => K, cancellationToken?: CancellationToken, config?: ViewConfig): MapDataSource<K, ReadOnlyArrayDataSource<T>>;
        groupByMultiProvider<K>(provider: (item: T) => K[], cancellationToken?: CancellationToken, config?: ViewConfig): MapDataSource<K, ReadOnlyArrayDataSource<T>>;
        filter(callback: Predicate<T>, dependencies?: ReadOnlyDataSource<any>[], cancellationToken?: CancellationToken, config?: ViewConfig): ReadOnlyArrayDataSource<T>;
        forEach(callbackfn: (value: T, index: number, array: T[]) => void): void;
        protected update(change: CollectionChange<T>): void;
    }
    export interface ViewConfig {
        ignoredOperations?: DetailedOperations[];
    }
    export class FlattenedArrayView<T> extends ArrayDataSource<T> {
        private parent;
        private depth;
        private sessionToken;
        constructor(parent: ArrayDataSource<T[]>, depth: number, cancellationToken?: CancellationToken, name?: string, config?: ViewConfig);
        refresh(): void;
    }
    export class MappedArrayView<D, T> extends ArrayDataSource<T> {
        private parent;
        private mapper;
        constructor(parent: ArrayDataSource<D>, mapper: (a: D) => T, cancellationToken?: CancellationToken, name?: string, config?: ViewConfig);
        refresh(): void;
    }
    export class ReversedArrayView<T> extends ArrayDataSource<T> {
        private parent;
        constructor(parent: ArrayDataSource<T>, cancellationToken?: CancellationToken, name?: string, config?: ViewConfig);
        refresh(): void;
    }
    export class SlicedArrayView<T> extends ArrayDataSource<T> {
        constructor(parent: ArrayDataSource<T>, start: DataSource<number>, end: DataSource<number>, cancellationToken?: CancellationToken, name?: string, config?: ViewConfig);
    }
    export class UniqueArrayView<T> extends ArrayDataSource<T> {
        constructor(parent: ArrayDataSource<T>, cancellationToken?: CancellationToken, name?: string, config?: ViewConfig);
    }
    export class SortedArrayView<T> extends ArrayDataSource<T> {
        private comparator;
        private parent;
        constructor(parent: ArrayDataSource<T>, comparator: (a: T, b: T) => number, cancellationToken?: CancellationToken, name?: string, config?: ViewConfig);
        private appendSorted;
        refresh(): void;
    }
    export class FilteredArrayView<T> extends ArrayDataSource<T> {
        private viewFilter;
        private parent;
        constructor(parent: ArrayDataSource<T> | T[], filter?: Predicate<T>, cancellationToken?: CancellationToken, name?: string, config?: ViewConfig);
        /**
         * Replaces the filter function
         * @param filter
         * @returns returns new size of array view after applying filter
         */
        updateFilter(filter: Predicate<T>): number;
        /**
         * Recalculates the filter. Only needed if your filter function isn't pure and you know the result would be different if run again compared to before
         */
        refresh(): void;
    }
    export function processTransform<I, O>(operations: DataSourceOperator<any, any>[], result: DataSource<O>): Callback<I>;
    export interface MapChange<K, V> {
        key: K;
        oldValue: V;
        newValue: V;
        deleted?: boolean;
    }
    export class MapDataSource<K, V> {
        protected data: Map<K, V>;
        private updateEvent;
        private updateEventOnKey;
        constructor(initialData?: Map<K, V>);
        cancelAll(): void;
        /**
         * Connects to an aurum-server exposed map datasource. View https://github.com/CyberPhoenix90/aurum-server for more information
         * Note that type safety is not guaranteed. Whatever the server sends as an update will be propagated. Make sure you trust the server
         * @param  {AurumServerInfo} aurumServerInfo
         * @returns DataSource
         */
        static fromRemoteSource<K, V>(aurumServerInfo: AurumServerInfo, cancellation: CancellationToken): MapDataSource<K, V>;
        static fromMultipleMaps<K, V>(maps: MapDataSource<K, V>[], cancellationToken?: CancellationToken): MapDataSource<K, V>;
        forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void;
        toString(): string;
        static toMapDataSource<K, V>(value: Map<K, V> | MapDataSource<K, V>): MapDataSource<K, V>;
        applyMapChange(change: MapChange<K, V>): void;
        /**
         * Creates a datasource for a single key of the object
         * @param key
         * @param cancellationToken
         */
        pick(key: K, cancellationToken?: CancellationToken): DataSource<V>;
        /**
         * Listen to changes of the object
         */
        listen(callback: Callback<MapChange<K, V>>, cancellationToken?: CancellationToken): Callback<void>;
        /**
         * Same as listen but will immediately call the callback with the current value of each key
         */
        listenAndRepeat(callback: Callback<MapChange<K, V>>, cancellationToken?: CancellationToken): Callback<void>;
        map<D>(mapper: (key: K, value: V, valueLifetimeToken: CancellationToken) => D, cancellation: CancellationToken): MapDataSource<K, D>;
        toArrayDataSource(cancellation: CancellationToken): ArrayDataSource<V>;
        clear(): void;
        /**
         * Same as listenOnKey but will immediately call the callback with the current value first
         */
        listenOnKeyAndRepeat(key: K, callback: Callback<MapChange<K, V>>, cancellationToken?: CancellationToken): Callback<void>;
        /**
         * Listen to changes of a single key of the object
         */
        listenOnKey(key: K, callback: Callback<MapChange<K, V>>, cancellationToken?: CancellationToken): Callback<void>;
        /**
         * Returns all the keys of the object in the source
         */
        keys(): IterableIterator<K>;
        /**
         * Returns all the values of the object in the source
         */
        values(): IterableIterator<V>;
        /**
         * get the current value of a key of the object
         * @param key
         */
        get(key: K): V;
        /**
         * check if map has a key
         * @param key
         */
        has(key: K): boolean;
        /**
         * delete a key from the object
         * @param key
         * @param value
         */
        delete(key: K): void;
        /**
         * set the value for a key of the object
         * @param key
         * @param value
         */
        set(key: K, value: V): void;
        /**
         * Merge the key value pairs of an object into this object non recursively
         * @param newData
         */
        assign(newData: Map<K, V> | MapDataSource<K, V>): void;
        /**
         * Returns a shallow copy of the map
         */
        toMap(): Map<K, V>;
    }
    export interface SetChange<K> {
        key: K;
        exists: boolean;
    }
    export interface ReadOnlySetDataSource<K> {
        difference(otherSet: ReadOnlySetDataSource<K>, cancellationToken: CancellationToken): ReadOnlySetDataSource<K>;
        union(otherSet: ReadOnlySetDataSource<K>, cancellationToken: CancellationToken): ReadOnlySetDataSource<K>;
        intersection(otherSet: ReadOnlySetDataSource<K>, cancellationToken: CancellationToken): ReadOnlySetDataSource<K>;
        symmetricDifference(otherSet: ReadOnlySetDataSource<K>, cancellationToken: CancellationToken): ReadOnlySetDataSource<K>;
        isSubsetOf(otherSet: ReadOnlySetDataSource<K> | Set<K>): boolean;
        isSupersetOf(otherSet: ReadOnlySetDataSource<K> | Set<K>): boolean;
        isDisjointWith(otherSet: ReadOnlySetDataSource<K> | Set<K>): boolean;
        isIdenticalTo(otherSet: ReadOnlySetDataSource<K> | Set<K>): boolean;
        pick(key: K, cancellationToken?: CancellationToken): DataSource<boolean>;
        listen(callback: Callback<SetChange<K>>, cancellationToken?: CancellationToken): Callback<void>;
        listenAndRepeat(callback: Callback<SetChange<K>>, cancellationToken?: CancellationToken): Callback<void>;
        listenOnKeyAndRepeat(key: K, callback: Callback<boolean>, cancellationToken?: CancellationToken): Callback<void>;
        listenOnKey(key: K, callback: Callback<boolean>, cancellationToken?: CancellationToken): Callback<void>;
        map<D>(mapper: (key: K) => D): ReadOnlyArrayDataSource<D>;
        keys(): IterableIterator<K>;
        has(key: K): boolean;
        toArray(): K[];
        toArrayDataSource(cancellationToken?: CancellationToken): ReadOnlyArrayDataSource<K>;
        toSet(): Set<K>;
        clear(): void;
        [Symbol.iterator](): IterableIterator<K>;
        entries(): IterableIterator<[K, K]>;
        values(): IterableIterator<K>;
        readonly size: number;
    }
    export class SetDataSource<K> implements ReadOnlySetDataSource<K> {
        protected data: Set<K>;
        private updateEvent;
        private updateEventOnKey;
        constructor(initialData?: Set<K> | K[]);
        /**
         * Connects to an aurum-server exposed set datasource. View https://github.com/CyberPhoenix90/aurum-server for more information
         * Note that type safety is not guaranteed. Whatever the server sends as an update will be propagated. Make sure you trust the server
         * @param  {AurumServerInfo} aurumServerInfo
         * @returns DataSource
         */
        static fromRemoteSource<T>(aurumServerInfo: AurumServerInfo, cancellation: CancellationToken): SetDataSource<T>;
        applySetChange(change: SetChange<K>): void;
        clear(): void;
        isSubsetOf(otherSet: ReadOnlySetDataSource<K> | Set<K>): boolean;
        isSupersetOf(otherSet: ReadOnlySetDataSource<K> | Set<K>): boolean;
        isDisjointWith(otherSet: ReadOnlySetDataSource<K> | Set<K>): boolean;
        get size(): number;
        isIdenticalTo(otherSet: ReadOnlySetDataSource<K> | Set<K>): boolean;
        static toSetDataSource<K>(value: Set<K> | SetDataSource<K>): SetDataSource<K>;
        [Symbol.iterator](): IterableIterator<K>;
        /**
         * Returns an iterable of [v,v] pairs for every value `v` in the set.
         */
        entries(): IterableIterator<[K, K]>;
        /**
         * Returns an iterable of values in the set.
         */
        values(): IterableIterator<K>;
        difference(otherSet: ReadOnlySetDataSource<K>, cancellationToken: CancellationToken): ReadOnlySetDataSource<K>;
        union(otherSet: ReadOnlySetDataSource<K>, cancellationToken: CancellationToken): ReadOnlySetDataSource<K>;
        intersection(otherSet: ReadOnlySetDataSource<K>, cancellationToken: CancellationToken): ReadOnlySetDataSource<K>;
        symmetricDifference(otherSet: ReadOnlySetDataSource<K>, cancellationToken: CancellationToken): ReadOnlySetDataSource<K>;
        toString(): string;
        /**
         * Creates a datasource for a single key of the object
         * @param key
         * @param cancellationToken
         */
        pick(key: K, cancellationToken?: CancellationToken): DataSource<boolean>;
        /**
         * Listen to changes of the object
         */
        listen(callback: Callback<SetChange<K>>, cancellationToken?: CancellationToken): Callback<void>;
        /**
         * Same as listen but will immediately call the callback with the current value of each key
         */
        listenAndRepeat(callback: Callback<SetChange<K>>, cancellationToken?: CancellationToken): Callback<void>;
        /**
         * Same as listenOnKey but will immediately call the callback with the current value first
         */
        listenOnKeyAndRepeat(key: K, callback: Callback<boolean>, cancellationToken?: CancellationToken): Callback<void>;
        /**
         * Listen to changes of a single key of the object
         */
        listenOnKey(key: K, callback: Callback<boolean>, cancellationToken?: CancellationToken): Callback<void>;
        toArrayDataSource(cancellationToken?: CancellationToken): ReadOnlyArrayDataSource<K>;
        map<D>(mapper: (key: K) => D, cancellationToken?: CancellationToken): ReadOnlyArrayDataSource<D>;
        /**
         * Returns all the keys of the object in the source
         */
        keys(): IterableIterator<K>;
        /**
         * check if map has a key
         * @param key
         */
        has(key: K): boolean;
        /**
         * delete a key from the object
         * @param key
         * @param value
         */
        delete(key: K): void;
        /**
         * set the value for a key of the object
         * @param key
         * @param value
         */
        add(key: K): void;
        /**
         * Merge the key value pairs of an object into this object non recursively
         * @param newData
         */
        assign(newData: Set<K> | SetDataSource<K>): void;
        /**
         * Returns a shallow copy of the set
         */
        toSet(): Set<K>;
        toArray(): K[];
    }
}
declare module "utilities/common" {
    import { DataSource, ReadOnlyDataSource } from "stream/data_source";
    import { DuplexDataSource } from "stream/duplex_data_source";
    export type AttributeValue = string | ReadOnlyDataSource<string> | ReadOnlyDataSource<boolean> | boolean;
    export type StringSource = string | ReadOnlyDataSource<string>;
    export type ClassType = string | ReadOnlyDataSource<string> | ReadOnlyDataSource<string[]> | Array<string | ReadOnlyDataSource<string>>;
    /**
     * Type alias for a generic calback taking a parameter and not returning anything
     */
    export type Callback<T> = (data?: T) => void;
    export type Delegate = () => void;
    export type Predicate<T> = (data: T) => boolean;
    export type Provider<T> = () => T;
    export type Comparator<T1, T2> = (value1: T1, value2: T2) => boolean;
    export type Constructor<T> = new (...args: any[]) => T;
    export type MapLike<T> = {
        [key: string]: T;
    };
    export type DataDrain<T> = Callback<T> | DataSource<T> | DuplexDataSource<T>;
    export type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;
}
declare module "utilities/classname" {
    import { ReadOnlyDataSource } from "stream/data_source";
    import { CancellationToken } from "utilities/cancellation_token";
    import { AttributeValue, ClassType } from "utilities/common";
    export function aurumClassName(data: {
        [key: string]: boolean | ReadOnlyDataSource<boolean>;
    }, cancellationToken?: CancellationToken): Array<string | ReadOnlyDataSource<string>>;
    export function combineClass(cancellationToken: CancellationToken, ...args: ClassType[]): ClassType;
    export function combineAttribute(cancellationToken: CancellationToken, ...args: AttributeValue[]): AttributeValue;
}
declare module "rendering/aurum_element" {
    import { DataSource, ArrayDataSource, ReadOnlyDataSource, ReadOnlyArrayDataSource } from "stream/data_source";
    import { DuplexDataSource } from "stream/duplex_data_source";
    import { CancellationToken } from "utilities/cancellation_token";
    import { EventEmitter } from "utilities/event_emitter";
    export function createRenderSession(): RenderSession;
    export const aurumElementModelIdentitiy: unique symbol;
    export const nodeData: WeakMap<any, AurumNodeData>;
    export interface AurumNodeData {
    }
    type ResolvedRenderable = AurumElement | HTMLElement | Text | string | number | AurumElementModel<any> | ReadOnlyDataSource<Renderable> | ReadOnlyArrayDataSource<Renderable> | DuplexDataSource<Renderable>;
    export type Renderable = ResolvedRenderable | Promise<ResolvedRenderable>;
    export type Rendered = AurumElement | HTMLElement | Text;
    export interface ComponentLifeCycle {
        onAttach(): void;
        onDetach(): void;
    }
    export interface ComponentLifeCycleInternal extends ComponentLifeCycle {
        attach: EventEmitter<void>;
        detach: EventEmitter<void>;
    }
    export interface AurumComponentAPI {
        synchronizeLifeCycle(lifeCycle: ComponentLifeCycle): void;
        onAttach(cb: () => void): void;
        onDetach(cb: () => void): void;
        cancellationToken: CancellationToken;
        prerender(children: Renderable[], lifeCycle: ComponentLifeCycle): any[];
        prerender(child: Renderable, lifeCycle: ComponentLifeCycle): any;
        className(data: {
            [key: string]: boolean | ReadOnlyDataSource<boolean>;
        }): Array<string | ReadOnlyDataSource<string>>;
    }
    export interface AurumElementModel<T> {
        [aurumElementModelIdentitiy]: boolean;
        props: T;
        name: string;
        isIntrinsic: boolean;
        children: Renderable[];
        factory(props: T, children: Renderable[], api: AurumComponentAPI): Renderable;
    }
    export function createLifeCycle(): ComponentLifeCycle;
    export abstract class AurumElement {
        children: Rendered[];
        protected api: AurumComponentAPI;
        private static id;
        protected contentStartMarker: Comment;
        protected contentEndMarker: Comment;
        protected hostNode: HTMLElement;
        protected lastStartIndex: number;
        protected lastEndIndex: number;
        protected disposed: boolean;
        constructor(dataSource: ArrayDataSource<any> | DataSource<any> | DuplexDataSource<any>, api: AurumComponentAPI);
        dispose(): void;
        attachToDom(node: HTMLElement, index: number): void;
        protected getStartIndex(): number;
        protected getWorkIndex(): number;
        protected getLastIndex(): number;
        protected abstract render(dataSource: DataSource<any> | ArrayDataSource<any> | DuplexDataSource<any>): void;
        protected clearContent(): void;
        protected updateDom(): void;
    }
    /**
     * @internal
     */
    export interface RenderSession {
        attachCalls: Array<() => void>;
        tokens: CancellationToken[];
        sessionToken: CancellationToken;
    }
    /**
     * @internal
     */
    export function renderInternal<T extends Renderable | Renderable[]>(element: T, session: RenderSession, prerendering?: boolean): any;
    /**
     * @internal
     */
    export function createAPI(session: RenderSession): AurumComponentAPI;
    export class ArrayAurumElement extends AurumElement {
        private renderSessions;
        private dataSource;
        constructor(dataSource: ArrayDataSource<any>, api: AurumComponentAPI);
        dispose(): void;
        attachToDom(node: HTMLElement, index: number): void;
        protected render(dataSource: ArrayDataSource<any>): void;
        private spliceChildren;
        private handleNewContent;
        private renderItem;
    }
    export class SingularAurumElement extends AurumElement {
        private renderSession;
        private lastValue;
        private dataSource;
        constructor(dataSource: DataSource<any> | DuplexDataSource<any>, api: AurumComponentAPI);
        dispose(): void;
        attachToDom(node: HTMLElement, index: number): void;
        protected render(dataSource: DataSource<any> | DuplexDataSource<any>): void;
        private handleNewContent;
        private fullRebuild;
        private endSession;
    }
}
declare module "builtin_components/dom_adapter" {
    import { ClassType, DataDrain, Callback, MapLike, AttributeValue } from "utilities/common";
    import { Renderable, AurumComponentAPI } from "rendering/aurum_element";
    import { CancellationToken } from "utilities/cancellation_token";
    export interface HTMLNodeProps<T> {
        id?: AttributeValue;
        name?: AttributeValue;
        draggable?: AttributeValue;
        class?: ClassType;
        tabindex?: AttributeValue;
        style?: AttributeValue;
        title?: AttributeValue;
        role?: AttributeValue;
        slot?: AttributeValue;
        contenteditable?: AttributeValue;
        onContextMenu?: DataDrain<MouseEvent>;
        onDblClick?: DataDrain<MouseEvent>;
        onClick?: DataDrain<MouseEvent>;
        onKeyDown?: DataDrain<KeyboardEvent>;
        onKeyUp?: DataDrain<KeyboardEvent>;
        onMouseDown?: DataDrain<MouseEvent>;
        onMouseUp?: DataDrain<MouseEvent>;
        onMouseEnter?: DataDrain<MouseEvent>;
        onMouseLeave?: DataDrain<MouseEvent>;
        onMouseMove?: DataDrain<MouseEvent>;
        onMouseWheel?: DataDrain<WheelEvent>;
        onBlur?: DataDrain<FocusEvent>;
        onFocus?: DataDrain<FocusEvent>;
        onDrag?: DataDrain<DragEvent>;
        onDragEnd?: DataDrain<DragEvent>;
        onDragEnter?: DataDrain<DragEvent>;
        onDragExit?: DataDrain<DragEvent>;
        onDragLeave?: DataDrain<DragEvent>;
        onDragOver?: DataDrain<DragEvent>;
        onDragStart?: DataDrain<DragEvent>;
        onDrop?: DataDrain<DragEvent>;
        onLoad?: DataDrain<Event>;
        onError?: DataDrain<ErrorEvent>;
        onAttach?: Callback<T>;
        onDetach?: Callback<T>;
    }
    /**
     * @internal
     */
    export const defaultEvents: MapLike<string>;
    /**
     * @internal
     */
    export const defaultAttributes: string[];
    export function DomNodeCreator<T extends HTMLNodeProps<any>>(nodeName: string, extraAttributes?: string[], extraEvents?: MapLike<string>, extraLogic?: (node: HTMLElement, props: T, cleanUp: CancellationToken) => void): (props: T, children: Renderable[], api: AurumComponentAPI) => HTMLElement;
    export function processHTMLNode(node: HTMLElement, props: HTMLNodeProps<any>, cleanUp: CancellationToken, extraAttributes?: string[], extraEvents?: MapLike<string>): void;
    export function createEventHandlers(node: HTMLElement, events: MapLike<string>, props: any): void;
    /**
     * Renders Aurum content synchronously in line.
     * @param content Content to render
     */
    export function aurumToHTML(content: Renderable): {
        content: HTMLElement;
        fireOnAttach(): void;
        dispose(): void;
    };
}
declare module "nodes/input" {
    import { HTMLNodeProps } from "builtin_components/dom_adapter";
    import { AttributeValue, DataDrain } from "utilities/common";
    import { GenericDataSource } from "stream/data_source";
    export interface InputProps extends HTMLNodeProps<HTMLInputElement> {
        placeholder?: AttributeValue;
        readonly?: AttributeValue;
        disabled?: AttributeValue;
        onChange?: DataDrain<InputEvent>;
        onInput?: DataDrain<InputEvent>;
        value?: GenericDataSource<string> | string;
        accept?: AttributeValue;
        alt?: AttributeValue;
        autocomplete?: AttributeValue;
        autofocus?: AttributeValue;
        checked?: GenericDataSource<boolean> | boolean;
        formAction?: AttributeValue;
        formEnctype?: AttributeValue;
        formMethod?: AttributeValue;
        formNoValidate?: AttributeValue;
        formTarget?: AttributeValue;
        step?: AttributeValue;
        list?: AttributeValue;
        max?: AttributeValue;
        maxLength?: AttributeValue;
        min?: AttributeValue;
        minLength?: AttributeValue;
        pattern?: AttributeValue;
        multiple?: AttributeValue;
        required?: AttributeValue;
        type?: AttributeValue;
    }
    /**
     * @internal
     */
    export const Input: (props: InputProps, children: import("aurumjs").Renderable[], api: import("aurumjs").AurumComponentAPI) => HTMLElement;
}
declare module "nodes/select" {
    import { GenericDataSource } from "stream/data_source";
    import { HTMLNodeProps } from "builtin_components/dom_adapter";
    export interface SelectProps extends HTMLNodeProps<HTMLSelectElement> {
        value?: GenericDataSource<string> | string;
        selectedIndex?: GenericDataSource<number> | number;
    }
    /**
     * @internal
     */
    export const Select: (props: SelectProps, children: import("aurumjs").Renderable[], api: import("aurumjs").AurumComponentAPI) => HTMLElement;
}
declare module "nodes/simple_dom_nodes" {
    import { HTMLNodeProps } from "builtin_components/dom_adapter";
    import { AttributeValue, DataDrain } from "utilities/common";
    /**
     * @internal
     */
    export const Code: (props: HTMLNodeProps<HTMLElement>, children: import("aurumjs").Renderable[], api: import("aurumjs").AurumComponentAPI) => HTMLElement;
    /**
     * @internal
     */
    export const Div: (props: HTMLNodeProps<HTMLDivElement>, children: import("aurumjs").Renderable[], api: import("aurumjs").AurumComponentAPI) => HTMLElement;
    /**
     * @internal
     */
    export interface AProps extends HTMLNodeProps<HTMLAnchorElement> {
        href?: AttributeValue;
        hreflang?: AttributeValue;
        media?: AttributeValue;
        download?: AttributeValue;
        target?: AttributeValue;
        ping?: AttributeValue;
        referrerpolicy?: AttributeValue;
        rel?: AttributeValue;
        type?: AttributeValue;
    }
    /**
     * @internal
     */
    export const A: (props: AProps, children: import("aurumjs").Renderable[], api: import("aurumjs").AurumComponentAPI) => HTMLElement;
    /**
     * @internal
     */
    export const Abbr: (props: HTMLNodeProps<HTMLElement>, children: import("aurumjs").Renderable[], api: import("aurumjs").AurumComponentAPI) => HTMLElement;
    /**
     * @internal
     */
    export const Address: (props: HTMLNodeProps<HTMLElement>, children: import("aurumjs").Renderable[], api: import("aurumjs").AurumComponentAPI) => HTMLElement;
    /**
     * @internal
     */
    export const H1: (props: HTMLNodeProps<HTMLElement>, children: import("aurumjs").Renderable[], api: import("aurumjs").AurumComponentAPI) => HTMLElement;
    /**
     * @internal
     */
    export const H2: (props: HTMLNodeProps<HTMLElement>, children: import("aurumjs").Renderable[], api: import("aurumjs").AurumComponentAPI) => HTMLElement;
    /**
     * @internal
     */
    export const H3: (props: HTMLNodeProps<HTMLElement>, children: import("aurumjs").Renderable[], api: import("aurumjs").AurumComponentAPI) => HTMLElement;
    /**
     * @internal
     */
    export const H4: (props: HTMLNodeProps<HTMLElement>, children: import("aurumjs").Renderable[], api: import("aurumjs").AurumComponentAPI) => HTMLElement;
    /**
     * @internal
     */
    export const H5: (props: HTMLNodeProps<HTMLElement>, children: import("aurumjs").Renderable[], api: import("aurumjs").AurumComponentAPI) => HTMLElement;
    /**
     * @internal
     */
    export const H6: (props: HTMLNodeProps<HTMLElement>, children: import("aurumjs").Renderable[], api: import("aurumjs").AurumComponentAPI) => HTMLElement;
    /**
     * @internal
     */
    export interface AreaProps extends HTMLNodeProps<HTMLAreaElement> {
        alt?: AttributeValue;
        coords?: AttributeValue;
        download?: AttributeValue;
        href?: AttributeValue;
        hreflang?: AttributeValue;
        media?: AttributeValue;
        rel?: AttributeValue;
        shape?: AttributeValue;
        target?: AttributeValue;
        type?: AttributeValue;
        ping?: AttributeValue;
        referrerpolicy?: AttributeValue;
    }
    /**
     * @internal
     */
    export const Area: (props: AreaProps, children: import("aurumjs").Renderable[], api: import("aurumjs").AurumComponentAPI) => HTMLElement;
    /**
     * @internal
     */
    export const Article: (props: HTMLNodeProps<HTMLElement>, children: import("aurumjs").Renderable[], api: import("aurumjs").AurumComponentAPI) => HTMLElement;
    /**
     * @internal
     */
    export const Aside: (props: HTMLNodeProps<HTMLElement>, children: import("aurumjs").Renderable[], api: import("aurumjs").AurumComponentAPI) => HTMLElement;
    /**
     * @internal
     */
    export const Span: (props: HTMLNodeProps<HTMLSpanElement>, children: import("aurumjs").Renderable[], api: import("aurumjs").AurumComponentAPI) => HTMLElement;
    /**
     * @internal
     */
    export const NoScript: (props: HTMLNodeProps<HTMLElement>, children: import("aurumjs").Renderable[], api: import("aurumjs").AurumComponentAPI) => HTMLElement;
    /**
     * @internal
     */
    export interface VideoProps extends HTMLNodeProps<HTMLVideoElement> {
        controls?: AttributeValue;
        autoplay?: AttributeValue;
        loop?: AttributeValue;
        muted?: AttributeValue;
        preload?: AttributeValue;
        src?: AttributeValue;
        poster?: AttributeValue;
        width?: AttributeValue;
        height?: AttributeValue;
        autopictureinpicture?: AttributeValue;
        controlslist?: AttributeValue;
        crossorigin?: AttributeValue;
        disablepictureinpicture?: AttributeValue;
        disableremoteplayback?: AttributeValue;
        playsinline?: AttributeValue;
        onCanPlay?: DataDrain<Event>;
        onCanPlayThrough?: DataDrain<Event>;
        onComplete?: DataDrain<Event>;
        onDurationChange?: DataDrain<Event>;
        onEmptied?: DataDrain<Event>;
        onEnded?: DataDrain<Event>;
        onLoadedData?: DataDrain<Event>;
        onLoadedMetadata?: DataDrain<Event>;
        onPause?: DataDrain<Event>;
        onPlay?: DataDrain<Event>;
        onPlaying?: DataDrain<Event>;
        onProgress?: DataDrain<Event>;
        onRateChange?: DataDrain<Event>;
        onSeeked?: DataDrain<Event>;
        onSeeking?: DataDrain<Event>;
        onStalled?: DataDrain<Event>;
        onSuspend?: DataDrain<Event>;
        onTimeUpdate?: DataDrain<Event>;
        onVolumeChange?: DataDrain<Event>;
        onWaiting?: DataDrain<Event>;
    }
    /**
     * @internal
     */
    export const Video: (props: VideoProps, children: import("aurumjs").Renderable[], api: import("aurumjs").AurumComponentAPI) => HTMLElement;
    /**
     * @internal
     */
    export const Ul: (props: HTMLNodeProps<HTMLUListElement>, children: import("aurumjs").Renderable[], api: import("aurumjs").AurumComponentAPI) => HTMLElement;
    /**
     * @internal
     */
    export const Ol: (props: HTMLNodeProps<HTMLOListElement>, children: import("aurumjs").Renderable[], api: import("aurumjs").AurumComponentAPI) => HTMLElement;
    /**
     * @internal
     */
    export const Li: (props: HTMLNodeProps<HTMLLIElement>, children: import("aurumjs").Renderable[], api: import("aurumjs").AurumComponentAPI) => HTMLElement;
    /**
     * @internal
     */
    export const B: (props: HTMLNodeProps<HTMLElement>, children: import("aurumjs").Renderable[], api: import("aurumjs").AurumComponentAPI) => HTMLElement;
    /**
     * @internal
     */
    export const Body: (props: HTMLNodeProps<HTMLBodyElement>, children: import("aurumjs").Renderable[], api: import("aurumjs").AurumComponentAPI) => HTMLElement;
    /**
     * @internal
     */
    export const Title: (props: HTMLNodeProps<HTMLTitleElement>, children: import("aurumjs").Renderable[], api: import("aurumjs").AurumComponentAPI) => HTMLElement;
    /**
     * @internal
     */
    export const Summary: (props: HTMLNodeProps<HTMLElement>, children: import("aurumjs").Renderable[], api: import("aurumjs").AurumComponentAPI) => HTMLElement;
    /**
     * @internal
     */
    export const THead: (props: HTMLNodeProps<HTMLElement>, children: import("aurumjs").Renderable[], api: import("aurumjs").AurumComponentAPI) => HTMLElement;
    /**
     * @internal
     */
    export const Template: (props: HTMLNodeProps<HTMLTemplateElement>, children: import("aurumjs").Renderable[], api: import("aurumjs").AurumComponentAPI) => HTMLElement;
    /**
     * @internal
     */
    export const Q: (props: HTMLNodeProps<HTMLQuoteElement>, children: import("aurumjs").Renderable[], api: import("aurumjs").AurumComponentAPI) => HTMLElement;
    /**
     * @internal
     */
    export const Pre: (props: HTMLNodeProps<HTMLPreElement>, children: import("aurumjs").Renderable[], api: import("aurumjs").AurumComponentAPI) => HTMLElement;
    /**
     * @internal
     */
    export const P: (props: HTMLNodeProps<HTMLParagraphElement>, children: import("aurumjs").Renderable[], api: import("aurumjs").AurumComponentAPI) => HTMLElement;
    /**
     * @internal
     */
    export const Hr: (props: HTMLNodeProps<HTMLHRElement>, children: import("aurumjs").Renderable[], api: import("aurumjs").AurumComponentAPI) => HTMLElement;
    /**
     * @internal
     */
    export interface AudioProps extends HTMLNodeProps<HTMLAudioElement> {
        controls?: AttributeValue;
        autoplay?: AttributeValue;
        loop?: AttributeValue;
        muted?: AttributeValue;
        preload?: AttributeValue;
        src?: AttributeValue;
        crossorigin?: AttributeValue;
        onAudioProcess?: DataDrain<Event>;
        onCanPlay?: DataDrain<Event>;
        onCanPlayThrough?: DataDrain<Event>;
        onComplete?: DataDrain<Event>;
        onDurationChange?: DataDrain<Event>;
        onEmptied?: DataDrain<Event>;
        onEnded?: DataDrain<Event>;
        onLoadedData?: DataDrain<Event>;
        onLoadedMetadata?: DataDrain<Event>;
        onPause?: DataDrain<Event>;
        onPlay?: DataDrain<Event>;
        onPlaying?: DataDrain<Event>;
        onRateChange?: DataDrain<Event>;
        onSeeked?: DataDrain<Event>;
        onSeeking?: DataDrain<Event>;
        onStalled?: DataDrain<Event>;
        onSuspend?: DataDrain<Event>;
        onTimeUpdate?: DataDrain<Event>;
        onVolumeChange?: DataDrain<Event>;
        onWaiting?: DataDrain<Event>;
    }
    /**
     * @internal
     */
    export const Audio: (props: AudioProps, children: import("aurumjs").Renderable[], api: import("aurumjs").AurumComponentAPI) => HTMLElement;
    /**
     * @internal
     */
    export const Br: (props: HTMLNodeProps<HTMLBRElement>, children: import("aurumjs").Renderable[], api: import("aurumjs").AurumComponentAPI) => HTMLElement;
    /**
     * @internal
     */
    export interface ButtonProps extends HTMLNodeProps<HTMLButtonElement> {
        type?: AttributeValue;
        disabled?: AttributeValue;
        autofocus?: AttributeValue;
        form?: AttributeValue;
        formaction?: AttributeValue;
        formenctype?: AttributeValue;
        formmethod?: AttributeValue;
        formnovalidate?: AttributeValue;
        formtarget?: AttributeValue;
    }
    /**
     * @internal
     */
    export const Button: (props: ButtonProps, children: import("aurumjs").Renderable[], api: import("aurumjs").AurumComponentAPI) => HTMLElement;
    /**
     * @internal
     */
    export interface CanvasProps extends HTMLNodeProps<HTMLCanvasElement> {
        width?: AttributeValue;
        height?: AttributeValue;
    }
    /**
     * @internal
     */
    export const Canvas: (props: CanvasProps, children: import("aurumjs").Renderable[], api: import("aurumjs").AurumComponentAPI) => HTMLElement;
    /**
     * @internal
     */
    export interface DataProps extends HTMLNodeProps<HTMLDataElement> {
        value?: AttributeValue;
    }
    /**
     * @internal
     */
    export const Data: (props: DataProps, children: import("aurumjs").Renderable[], api: import("aurumjs").AurumComponentAPI) => HTMLElement;
    /**
     * @internal
     */
    export const Details: (props: HTMLNodeProps<HTMLDetailsElement>, children: import("aurumjs").Renderable[], api: import("aurumjs").AurumComponentAPI) => HTMLElement;
    /**
     * @internal
     */
    export const Em: (props: HTMLNodeProps<HTMLElement>, children: import("aurumjs").Renderable[], api: import("aurumjs").AurumComponentAPI) => HTMLElement;
    /**
     * @internal
     */
    export const Footer: (props: HTMLNodeProps<HTMLElement>, children: import("aurumjs").Renderable[], api: import("aurumjs").AurumComponentAPI) => HTMLElement;
    /**
     * @internal
     */
    export interface FormProps extends HTMLNodeProps<HTMLFormElement> {
        action?: AttributeValue;
        method?: AttributeValue;
        rel?: AttributeValue;
        enctype?: AttributeValue;
        novalidate?: AttributeValue;
        target?: AttributeValue;
        'accept-charset'?: AttributeValue;
        autocomplete?: AttributeValue;
    }
    /**
     * @internal
     */
    export const Form: (props: FormProps, children: import("aurumjs").Renderable[], api: import("aurumjs").AurumComponentAPI) => HTMLElement;
    /**
     * @internal
     */
    export interface MetaProps extends HTMLNodeProps<HTMLMetaElement> {
        ['http-equiv']?: AttributeValue;
        ['charset']?: AttributeValue;
        content?: AttributeValue;
    }
    /**
     * @internal
     */
    export const Meta: (props: MetaProps, children: import("aurumjs").Renderable[], api: import("aurumjs").AurumComponentAPI) => HTMLElement;
    /**
     * @internal
     */
    export interface HtmlProps extends HTMLNodeProps<HTMLHtmlElement> {
        lang?: string;
        xmlns?: string;
    }
    /**
     * @internal
     */
    export const Html: (props: HtmlProps, children: import("aurumjs").Renderable[], api: import("aurumjs").AurumComponentAPI) => HTMLElement;
    /**
     * @internal
     */
    export const Head: (props: HTMLNodeProps<HTMLHeadElement>, children: import("aurumjs").Renderable[], api: import("aurumjs").AurumComponentAPI) => HTMLElement;
    /**
     * @internal
     */
    export const Header: (props: HTMLNodeProps<HTMLElement>, children: import("aurumjs").Renderable[], api: import("aurumjs").AurumComponentAPI) => HTMLElement;
    /**
     * @internal
     */
    export const Heading: (props: HTMLNodeProps<HTMLHeadingElement>, children: import("aurumjs").Renderable[], api: import("aurumjs").AurumComponentAPI) => HTMLElement;
    /**
     * @internal
     */
    export const I: (props: HTMLNodeProps<HTMLElement>, children: import("aurumjs").Renderable[], api: import("aurumjs").AurumComponentAPI) => HTMLElement;
    /**
     * @internal
     */
    export interface IFrameProps extends HTMLNodeProps<HTMLIFrameElement> {
        src?: AttributeValue;
        allow?: AttributeValue;
        allowfullscreen?: AttributeValue;
        allowpaymentrequest?: AttributeValue;
        width?: AttributeValue;
        height?: AttributeValue;
        srcdoc?: AttributeValue;
        loading?: AttributeValue;
        sandbox?: AttributeValue;
        frameborder?: AttributeValue;
        csp?: AttributeValue;
        referrerpolicy?: AttributeValue;
    }
    /**
     * @internal
     */
    export const IFrame: (props: IFrameProps, children: import("aurumjs").Renderable[], api: import("aurumjs").AurumComponentAPI) => HTMLElement;
    /**
     * @internal
     */
    export interface ImgProps extends HTMLNodeProps<HTMLImageElement> {
        src?: AttributeValue;
        alt?: AttributeValue;
        width?: AttributeValue;
        height?: AttributeValue;
        referrerpolicy?: AttributeValue;
        sizes?: AttributeValue;
        srcset?: AttributeValue;
        usemap?: AttributeValue;
        crossorigin?: AttributeValue;
        decoding?: AttributeValue;
        ismap?: AttributeValue;
        loading?: AttributeValue;
    }
    /**
     * @internal
     */
    export const Img: (props: ImgProps, children: import("aurumjs").Renderable[], api: import("aurumjs").AurumComponentAPI) => HTMLElement;
    /**
     * @internal
     */
    export interface LabelProps extends HTMLNodeProps<HTMLLabelElement> {
        for?: AttributeValue;
    }
    /**
     * @internal
     */
    export const Label: (props: LabelProps, children: import("aurumjs").Renderable[], api: import("aurumjs").AurumComponentAPI) => HTMLElement;
    /**
     * @internal
     */
    export interface LinkProps extends HTMLNodeProps<HTMLLinkElement> {
        href?: AttributeValue;
        rel?: AttributeValue;
        media?: AttributeValue;
        as?: AttributeValue;
        disabled?: AttributeValue;
        type?: AttributeValue;
        crossorigin?: AttributeValue;
        hreflang?: AttributeValue;
        referrerpolicy?: AttributeValue;
        sizes?: AttributeValue;
        integrity?: AttributeValue;
        imagesizes?: AttributeValue;
        prefetch?: AttributeValue;
    }
    /**
     * @internal
     */
    export const Link: (props: LinkProps, children: import("aurumjs").Renderable[], api: import("aurumjs").AurumComponentAPI) => HTMLElement;
    /**
     * @internal
     */
    export const Nav: (props: HTMLNodeProps<HTMLElement>, children: import("aurumjs").Renderable[], api: import("aurumjs").AurumComponentAPI) => HTMLElement;
    /**
     * @internal
     */
    export const Sub: (props: HTMLNodeProps<HTMLElement>, children: import("aurumjs").Renderable[], api: import("aurumjs").AurumComponentAPI) => HTMLElement;
    /**
     * @internal
     */
    export const Sup: (props: HTMLNodeProps<HTMLElement>, children: import("aurumjs").Renderable[], api: import("aurumjs").AurumComponentAPI) => HTMLElement;
    /**
     * @internal
     */
    export const Table: (props: HTMLNodeProps<HTMLTableElement>, children: import("aurumjs").Renderable[], api: import("aurumjs").AurumComponentAPI) => HTMLElement;
    /**
     * @internal
     */
    export const TBody: (props: HTMLNodeProps<HTMLElement>, children: import("aurumjs").Renderable[], api: import("aurumjs").AurumComponentAPI) => HTMLElement;
    /**
     * @internal
     */
    export const TFoot: (props: HTMLNodeProps<HTMLElement>, children: import("aurumjs").Renderable[], api: import("aurumjs").AurumComponentAPI) => HTMLElement;
    /**
     * @internal
     */
    export interface ColProps extends HTMLNodeProps<HTMLTableColElement> {
        span?: AttributeValue;
    }
    /**
     * @internal
     */
    export const Col: (props: ColProps, children: import("aurumjs").Renderable[], api: import("aurumjs").AurumComponentAPI) => HTMLElement;
    /**
     * @internal
     */
    export const Colgroup: (props: HTMLNodeProps<HTMLTableColElement>, children: import("aurumjs").Renderable[], api: import("aurumjs").AurumComponentAPI) => HTMLElement;
    /**
     * @internal
     */
    export const Caption: (props: HTMLNodeProps<HTMLTableCaptionElement>, children: import("aurumjs").Renderable[], api: import("aurumjs").AurumComponentAPI) => HTMLElement;
    /**
     * @internal
     */
    export const Tr: (props: HTMLNodeProps<HTMLTableRowElement>, children: import("aurumjs").Renderable[], api: import("aurumjs").AurumComponentAPI) => HTMLElement;
    /**
     * @internal
     */
    export interface TableCellProps extends HTMLNodeProps<HTMLTableCellElement> {
        colspan?: AttributeValue;
        headers?: AttributeValue;
        rowspan?: AttributeValue;
    }
    /**
     * @internal
     */
    export const Td: (props: TableCellProps, children: import("aurumjs").Renderable[], api: import("aurumjs").AurumComponentAPI) => HTMLElement;
    /**
     * @internal
     */
    export const Th: (props: HTMLNodeProps<HTMLTableHeaderCellElement>, children: import("aurumjs").Renderable[], api: import("aurumjs").AurumComponentAPI) => HTMLElement;
    /**
     * @internal
     */
    export interface TimeProps extends HTMLNodeProps<HTMLTimeElement> {
        datetime?: AttributeValue;
    }
    /**
     * @internal
     */
    export const Time: (props: TimeProps, children: import("aurumjs").Renderable[], api: import("aurumjs").AurumComponentAPI) => HTMLElement;
    /**
     * @internal
     */
    export interface StyleProps extends HTMLNodeProps<HTMLStyleElement> {
        media?: AttributeValue;
        type?: AttributeValue;
        nonce?: AttributeValue;
    }
    /**
     * @internal
     */
    export const Style: (props: StyleProps, children: import("aurumjs").Renderable[], api: import("aurumjs").AurumComponentAPI) => HTMLElement;
    /**
     * @internal
     */
    export interface SourceProps extends HTMLNodeProps<HTMLSourceElement> {
        src?: AttributeValue;
        srcset?: AttributeValue;
        media?: AttributeValue;
        sizes?: AttributeValue;
        type?: AttributeValue;
    }
    /**
     * @internal
     */
    export const Source: (props: SourceProps, children: import("aurumjs").Renderable[], api: import("aurumjs").AurumComponentAPI) => HTMLElement;
    /**
     * @internal
     */
    export interface TrackProps extends HTMLNodeProps<HTMLTrackElement> {
        src?: AttributeValue;
        srclang?: AttributeValue;
        label?: AttributeValue;
        kind?: AttributeValue;
        default?: AttributeValue;
    }
    /**
     * @internal
     */
    export const Track: (props: TrackProps, children: import("aurumjs").Renderable[], api: import("aurumjs").AurumComponentAPI) => HTMLElement;
    /**
     * @internal
     */
    export interface ParamProps extends HTMLNodeProps<HTMLParamElement> {
        value?: AttributeValue;
    }
    /**
     * @internal
     */
    export const Param: (props: ParamProps, children: import("aurumjs").Renderable[], api: import("aurumjs").AurumComponentAPI) => HTMLElement;
    /**
     * @internal
     */
    export interface ScriptProps extends HTMLNodeProps<HTMLScriptElement> {
        src?: AttributeValue;
        async?: AttributeValue;
        defer?: AttributeValue;
        integrity?: AttributeValue;
        nomodule?: AttributeValue;
        crossorigin?: AttributeValue;
        type?: AttributeValue;
        referrerpolicy?: AttributeValue;
        text?: AttributeValue;
        nonce?: AttributeValue;
    }
    /**
     * @internal
     */
    export const Script: (props: ScriptProps, children: import("aurumjs").Renderable[], api: import("aurumjs").AurumComponentAPI) => HTMLElement;
    /**
     * @internal
     */
    export interface SvgProps extends HTMLNodeProps<HTMLOrSVGElement> {
        width?: AttributeValue;
        height?: AttributeValue;
    }
    /**
     * @internal
     */
    export const Svg: (props: SvgProps, children: import("aurumjs").Renderable[], api: import("aurumjs").AurumComponentAPI) => HTMLElement;
    /**
     * @internal
     */
    export interface ProgressProps extends HTMLNodeProps<HTMLProgressElement> {
        max?: AttributeValue;
        value?: AttributeValue;
    }
    /**
     * @internal
     */
    export const Progress: (props: ProgressProps, children: import("aurumjs").Renderable[], api: import("aurumjs").AurumComponentAPI) => HTMLElement;
    /**
     * @internal
     */
    export interface OptionProps extends HTMLNodeProps<HTMLElement> {
        value?: AttributeValue;
        disabled?: AttributeValue;
        label?: AttributeValue;
        selected?: AttributeValue;
    }
    /**
     * @internal
     */
    export const Option: (props: OptionProps, children: import("aurumjs").Renderable[], api: import("aurumjs").AurumComponentAPI) => HTMLElement;
    /**
     * @internal
     */
    export interface OptGroupProps extends HTMLNodeProps<HTMLOptGroupElement> {
        disabled?: AttributeValue;
        label?: AttributeValue;
    }
    /**
     * @internal
     */
    export const OptGroup: (props: OptGroupProps, children: import("aurumjs").Renderable[], api: import("aurumjs").AurumComponentAPI) => HTMLElement;
    /**
     * @internal
     */
    export interface SlotProps extends HTMLNodeProps<HTMLSlotElement> {
    }
    /**
     * @internal
     */
    export const Slot: (props: SlotProps, children: import("aurumjs").Renderable[], api: import("aurumjs").AurumComponentAPI) => HTMLElement;
    /**
     * @internal
     */
    export const Strong: (props: HTMLNodeProps<HTMLElement>, children: import("aurumjs").Renderable[], api: import("aurumjs").AurumComponentAPI) => HTMLElement;
    /**
     * @internal
     */
    export const Samp: (props: HTMLNodeProps<HTMLElement>, children: import("aurumjs").Renderable[], api: import("aurumjs").AurumComponentAPI) => HTMLElement;
    /**
     * @internal
     */
    export const Kbd: (props: HTMLNodeProps<HTMLElement>, children: import("aurumjs").Renderable[], api: import("aurumjs").AurumComponentAPI) => HTMLElement;
    /**
     * @internal
     */
    export const Var: (props: HTMLNodeProps<HTMLElement>, children: import("aurumjs").Renderable[], api: import("aurumjs").AurumComponentAPI) => HTMLElement;
    /**
     * @internal
     */
    export const Wbr: (props: HTMLNodeProps<HTMLElement>, children: import("aurumjs").Renderable[], api: import("aurumjs").AurumComponentAPI) => HTMLElement;
    /**
     * @internal
     */
    export const Picture: (props: HTMLNodeProps<HTMLElement>, children: import("aurumjs").Renderable[], api: import("aurumjs").AurumComponentAPI) => HTMLElement;
    /**
     * @internal
     */
    export interface OutputProps extends HTMLNodeProps<HTMLOutputElement> {
        form?: AttributeValue;
        for?: AttributeValue;
    }
    /**
     * @internal
     */
    export const Output: (props: OutputProps, children: import("aurumjs").Renderable[], api: import("aurumjs").AurumComponentAPI) => HTMLElement;
    /**
     * @internal
     */
    export interface ObjectProps extends HTMLNodeProps<HTMLObjectElement> {
        data?: AttributeValue;
        width?: AttributeValue;
        height?: AttributeValue;
        form?: AttributeValue;
        type?: AttributeValue;
        usemap?: AttributeValue;
    }
    /**
     * @internal
     */
    export const Object: (props: ObjectProps, children: import("aurumjs").Renderable[], api: import("aurumjs").AurumComponentAPI) => HTMLElement;
}
declare module "nodes/textarea" {
    import { GenericDataSource } from "stream/data_source";
    import { AttributeValue, DataDrain } from "utilities/common";
    import { HTMLNodeProps } from "builtin_components/dom_adapter";
    export interface TextAreaProps extends HTMLNodeProps<HTMLTextAreaElement> {
        placeholder?: AttributeValue;
        readonly?: AttributeValue;
        disabled?: AttributeValue;
        onChange?: DataDrain<InputEvent>;
        onInput?: DataDrain<InputEvent>;
        value?: GenericDataSource<string> | string;
        cols?: AttributeValue;
        rows?: AttributeValue;
        wrap?: AttributeValue;
        form?: AttributeValue;
        autocomplete?: AttributeValue;
        autofocus?: AttributeValue;
        max?: AttributeValue;
        maxLength?: AttributeValue;
        min?: AttributeValue;
        minLength?: AttributeValue;
        spellcheck?: AttributeValue;
        required?: AttributeValue;
        type?: AttributeValue;
    }
    /**
     * @internal
     */
    export const TextArea: (props: TextAreaProps, children: import("aurumjs").Renderable[], api: import("aurumjs").AurumComponentAPI) => HTMLElement;
}
declare module "utilities/aurum" {
    import { HTMLNodeProps } from "builtin_components/dom_adapter";
    import { InputProps } from "nodes/input";
    import { SelectProps } from "nodes/select";
    import { AProps, AreaProps, AudioProps, ButtonProps, CanvasProps, ColProps, DataProps, FormProps, HtmlProps, IFrameProps, ImgProps, LabelProps, LinkProps, MetaProps, ObjectProps, OptGroupProps, OptionProps, OutputProps, ParamProps, ProgressProps, ScriptProps, SlotProps, SourceProps, StyleProps, SvgProps, TableCellProps, TimeProps, TrackProps, VideoProps } from "nodes/simple_dom_nodes";
    import { TextAreaProps } from "nodes/textarea";
    import { AurumComponentAPI, AurumElementModel, Renderable } from "rendering/aurum_element";
    import { ReadOnlyArrayDataSource, ReadOnlyDataSource } from "stream/data_source";
    import { CancellationToken } from "utilities/cancellation_token";
    import { MapLike } from "utilities/common";
    export class Aurum {
        static rehydrate(aurumRenderable: Renderable, dom: HTMLElement): CancellationToken;
        static attach(aurumRenderable: Renderable, dom: HTMLElement): CancellationToken;
        static fragment(): void;
        static factory(node: string | ((props: any, children: Renderable[], api: AurumComponentAPI) => Renderable), args: MapLike<any>, ...innerNodes: Array<AurumElementModel<any> | ReadOnlyDataSource<any> | ReadOnlyArrayDataSource<any>>): AurumElementModel<any>;
    }
    export namespace Aurum {
        namespace JSX {
            interface IntrinsicElements {
                address: HTMLNodeProps<HTMLElement>;
                wbr: HTMLNodeProps<HTMLElement>;
                samp: HTMLNodeProps<HTMLElement>;
                strong: HTMLNodeProps<HTMLElement>;
                kbd: HTMLNodeProps<HTMLElement>;
                var: HTMLNodeProps<HTMLElement>;
                picture: HTMLNodeProps<HTMLElement>;
                output: OutputProps;
                object: ObjectProps;
                optgroup: OptGroupProps;
                track: TrackProps;
                param: ParamProps;
                code: HTMLNodeProps<HTMLElement>;
                button: ButtonProps;
                hr: HTMLNodeProps<HTMLHRElement>;
                div: HTMLNodeProps<HTMLDivElement>;
                input: InputProps;
                meta: MetaProps;
                li: HTMLNodeProps<HTMLLIElement>;
                span: HTMLNodeProps<HTMLElement>;
                style: StyleProps;
                ul: HTMLNodeProps<HTMLUListElement>;
                p: HTMLNodeProps<HTMLParagraphElement>;
                img: ImgProps;
                link: LinkProps;
                canvas: CanvasProps;
                a: AProps;
                article: HTMLNodeProps<HTMLElement>;
                br: HTMLNodeProps<HTMLBRElement>;
                form: FormProps;
                label: LabelProps;
                ol: HTMLNodeProps<HTMLOListElement>;
                pre: HTMLNodeProps<HTMLPreElement>;
                progress: ProgressProps;
                table: HTMLNodeProps<HTMLTableElement>;
                td: TableCellProps;
                tr: HTMLNodeProps<HTMLTableRowElement>;
                th: TableCellProps;
                textarea: TextAreaProps;
                h1: HTMLNodeProps<HTMLElement>;
                h2: HTMLNodeProps<HTMLElement>;
                h3: HTMLNodeProps<HTMLElement>;
                h4: HTMLNodeProps<HTMLElement>;
                h5: HTMLNodeProps<HTMLElement>;
                h6: HTMLNodeProps<HTMLElement>;
                header: HTMLNodeProps<HTMLElement>;
                footer: HTMLNodeProps<HTMLElement>;
                nav: HTMLNodeProps<HTMLElement>;
                b: HTMLNodeProps<HTMLElement>;
                i: HTMLNodeProps<HTMLElement>;
                script: ScriptProps;
                abbr: HTMLNodeProps<HTMLElement>;
                area: AreaProps;
                slot: SlotProps;
                aside: HTMLNodeProps<HTMLElement>;
                audio: AudioProps;
                em: HTMLNodeProps<HTMLElement>;
                heading: HTMLNodeProps<HTMLHeadingElement>;
                iframe: IFrameProps;
                noscript: HTMLNodeProps<HTMLElement>;
                option: OptionProps;
                q: HTMLNodeProps<HTMLQuoteElement>;
                select: SelectProps;
                source: SourceProps;
                title: HTMLNodeProps<HTMLTitleElement>;
                video: VideoProps;
                tbody: HTMLNodeProps<HTMLElement>;
                tfoot: HTMLNodeProps<HTMLElement>;
                thead: HTMLNodeProps<HTMLElement>;
                summary: HTMLNodeProps<HTMLElement>;
                details: HTMLNodeProps<HTMLDetailsElement>;
                sub: HTMLNodeProps<HTMLElement>;
                sup: HTMLNodeProps<HTMLElement>;
                svg: SvgProps;
                data: DataProps;
                time: TimeProps;
                body: HTMLNodeProps<HTMLBodyElement>;
                head: HTMLNodeProps<HTMLHeadElement>;
                html: HtmlProps;
                template: HTMLNodeProps<HTMLTemplateElement>;
                col: ColProps;
                colgroup: ColProps;
                caption: HTMLNodeProps<HTMLTableCaptionElement>;
            }
        }
    }
}
declare module "rendering/webcomponent" {
    import { AurumComponentAPI, Renderable } from "rendering/aurum_element";
    interface WebComponentProps {
        /**
         * Name of the webcomponent, must be lower case kebab case and must have at least one hyphen as required by the spec
         * example: au-mycomponent
         */
        name: string;
        /**
         * List of attributes of the web component that will be transformed into a data source that reflects the exact state of the attribute in the DOM no matter what changes the attirbute
         */
        observedAttributes?: string[];
        shadowRootMode?: 'open' | 'closed';
        shadowRootDelegatesFocus?: boolean;
    }
    /**
     * Wrapper around native web components allows using aurum style component structure to create native components.
     */
    export function Webcomponent<T>(config: WebComponentProps, logic: (props: T, api: AurumComponentAPI) => Renderable): (props: T, children: Renderable[], api: AurumComponentAPI) => Renderable;
}
declare module "rendering/aurum_style" {
    import { Renderable } from "rendering/aurum_element";
    /**
     * Generates a style tag with the provided style as content, supports data sources, duplex data sources and streams instead of strings in the template.
     * Updates style content if any of the datasources used updates.
     */
    export function css(fragments: TemplateStringsArray, ...input: any[]): Renderable;
}
declare module "builtin_components/router" {
    import { AurumComponentAPI, Renderable } from "rendering/aurum_element";
    import { DataSource } from "stream/data_source";
    export function AurumRouter(props: {}, children: Renderable[], api: AurumComponentAPI): DataSource<Renderable[]>;
    export interface RouteProps {
        href: string;
        onNavigateTo?: () => void;
        onNavigateFrom?: () => void;
    }
    export function Route(props: RouteProps, children: any): undefined;
    export function DefaultRoute(props: Omit<RouteProps, 'href'>, children: any): undefined;
}
declare module "builtin_components/suspense" {
    import { AurumComponentAPI, Renderable } from "rendering/aurum_element";
    export interface SuspenseProps {
        fallback?: Renderable;
    }
    export function Suspense(props: SuspenseProps, children: Renderable[], api: AurumComponentAPI): any;
}
declare module "builtin_components/error_boundary" {
    import { AurumComponentAPI, Renderable } from "rendering/aurum_element";
    import { DataSource } from "stream/data_source";
    export type ErrorRenderer = (error: any) => Renderable;
    export interface ErrorBoundaryProps {
        suspenseFallback?: Renderable;
        errorFallback?: Renderable | ErrorRenderer;
    }
    export function ErrorBoundary(props: ErrorBoundaryProps, children: Renderable[], api: AurumComponentAPI): DataSource<Renderable | Renderable[]>;
}
declare module "builtin_components/switch" {
    import { AurumComponentAPI, Renderable } from "rendering/aurum_element";
    import { ReadOnlyDataSource } from "stream/data_source";
    export interface SwitchProps<T = boolean> {
        state: ReadOnlyDataSource<T>;
    }
    export function Switch<T = boolean>(props: SwitchProps<T>, children: Renderable[], api: AurumComponentAPI): import("stream/data_source").DataSource<Renderable[]>;
    export interface SwitchCaseProps<T> {
        when: T;
    }
    export function SwitchCase<T>(props: SwitchCaseProps<T>, children: any): undefined;
    export function DefaultSwitchCase(props: {}, children: any): undefined;
}
declare module "utilities/sources" {
    import { ObjectDataSource } from "aurumjs";
    import { DataSource, ArrayDataSource } from "stream/data_source";
    import { DuplexDataSource } from "stream/duplex_data_source";
    import { Stream } from "stream/stream";
    export function getValueOf<T>(sourceOrPrimitive: T[] | ArrayDataSource<T>): ReadonlyArray<T>;
    export function getValueOf<T>(sourceOrPrimitive: T | DataSource<T> | DuplexDataSource<T> | Stream<T>): T;
    export type UnwrapObjectRecursive<T> = T extends ArrayDataSource<infer U> ? UnwrapObjectRecursive<U[]> : T extends DataSource<infer U> ? UnwrapObjectRecursive<U> : T extends DuplexDataSource<infer U> ? UnwrapObjectRecursive<U> : T extends ObjectDataSource<infer U> ? UnwrapObjectRecursive<U> : T extends Stream<infer U> ? UnwrapObjectRecursive<U> : {
        [K in keyof T]: T[K] extends DataSource<infer U> ? UnwrapObjectRecursive<U> : T[K] extends DuplexDataSource<infer U> ? UnwrapObjectRecursive<U> : T[K] extends Stream<infer U> ? UnwrapObjectRecursive<U> : T[K] extends ObjectDataSource<infer U> ? UnwrapObjectRecursive<U> : T[K] extends object ? UnwrapObjectRecursive<T[K]> : T[K];
    };
    export function unwrapObjectRecursive<T>(object: T): UnwrapObjectRecursive<T>;
}
declare module "stream/tree_data_source" {
    import { CancellationToken } from "utilities/cancellation_token";
    import { Callback } from "utilities/common";
    import { ArrayDataSource, ReadOnlyArrayDataSource } from "stream/data_source";
    export type GenericTree<T, K extends keyof T> = {
        [P in K]: GenericTree<T, K>[] | ArrayDataSource<any>;
    };
    export interface TreeChange<T> {
        parentNode: T;
        changedNode: T;
        index: number;
        operation: 'added' | 'deleted';
    }
    type TreeIteration<T> = {
        parent: T;
        node: T;
        level: number;
        index: number;
        lastIndex: number;
    };
    export class TreeDataSource<T, K extends keyof T> {
        private childrenKey;
        private roots;
        private updateEvent;
        private watchCount;
        private watchToken;
        constructor(childrenKey: K, roots: Array<GenericTree<T, K>> | ArrayDataSource<GenericTree<T, K>>);
        private watch;
        private watchHandleChange;
        listen(callback: Callback<TreeChange<T>>, cancellationToken: CancellationToken): Callback<void>;
        listenAndRepeat(callback: Callback<TreeChange<T>>, cancellationToken: CancellationToken): Callback<void>;
        private adaptNodeList;
        private adaptNodeTree;
        map<U, K2 extends keyof U>(mapper: (item: T) => U, newKey?: K2, cancellationToken?: CancellationToken): TreeDataSource<U, K2>;
        private addItem;
        private removeItem;
        createArrayDataSourceOfNodes(cancellationToken: CancellationToken): ReadOnlyArrayDataSource<T>;
        [Symbol.iterator](): IterableIterator<T>;
        iterateWithMetaData(): Generator<TreeIteration<T>, void, undefined>;
        private iterateLevelWithMetaData;
        private iterateLevel;
    }
}
declare module "stream/emitters" {
    import { DataSource, ArrayDataSource } from "stream/data_source";
    import { Stream } from "stream/stream";
    import { DuplexDataSource } from "stream/duplex_data_source";
    import { CancellationToken } from "utilities/cancellation_token";
    import { ObjectDataSource } from "stream/object_data_source";
    /**
     * Convenience function to update a stream at fixed intervals
     */
    export function intervalEmitter<T = void>(target: DataSource<T> | DuplexDataSource<T> | Stream<T, any> | ArrayDataSource<T>, interval: number, value: T, cancellationToken?: CancellationToken): void;
    export function urlHashEmitter(target: DataSource<string> | DuplexDataSource<string> | Stream<string, any> | ArrayDataSource<string>, stripInHashParameters?: boolean, cancellationToken?: CancellationToken): void;
    /**
     * Convenience function to stream the window size to a data source
     */
    export function windowSizeEmitter(target: ObjectDataSource<{
        width: number;
        height: number;
    }>, debounce?: number, cancellationToken?: CancellationToken): void;
    /**
     * Calls the callback every animation frame with a number from 0 to 1 indicating how far along in the animation timeline it is.
     *
     */
    export function animate(cb: (progress: number) => void, time: number, cancellationToken: CancellationToken): Promise<void>;
    /**
     * Convenience function to stream animate to a datasource
     */
    export function tweenEmitter(target: DataSource<number> | DuplexDataSource<number> | Stream<number, any> | ArrayDataSource<number>, duration: number, startValue: number, endValue: number, interpolation?: (v: number) => number, cancellationToken?: CancellationToken): Promise<void>;
}
declare module "nodes/string_adapter" {
    export function aurumToString(content: any): Promise<string>;
}
declare module "utilities/transclusion" {
    import { Renderable } from "rendering/aurum_element";
    import { ReadOnlyArrayDataSource } from "stream/data_source";
    import { CancellationToken } from "utilities/cancellation_token";
    export function resolveChildren<T>(children: Renderable[], cancellationToken: CancellationToken, validation?: (child: Renderable) => void): ReadOnlyArrayDataSource<T>;
}
declare module "aurumjs" {
    export * from "rendering/webcomponent";
    export { Renderable, SingularAurumElement, ArrayAurumElement, AurumComponentAPI, ComponentLifeCycle, createAPI, createLifeCycle, createRenderSession, RenderSession, AurumElement, aurumElementModelIdentitiy, AurumElementModel } from "rendering/aurum_element";
    export { AProps, ProgressProps, ColProps, ImgProps, SvgProps, AreaProps, DataProps, FormProps, HtmlProps, LinkProps, MetaProps, SlotProps, TimeProps, ParamProps, AudioProps, LabelProps, StyleProps, TrackProps, VideoProps, ButtonProps, CanvasProps, IFrameProps, ObjectProps, OptionProps, OutputProps, ScriptProps, SourceProps, OptGroupProps, TableCellProps } from "nodes/simple_dom_nodes";
    export { InputProps } from "nodes/input";
    export { SelectProps } from "nodes/select";
    export { TextAreaProps } from "nodes/textarea";
    export * from "rendering/aurum_style";
    export * from "builtin_components/router";
    export * from "builtin_components/suspense";
    export * from "builtin_components/error_boundary";
    export * from "builtin_components/switch";
    export * from "stream/data_source";
    export * from "stream/duplex_data_source";
    export * from "stream/object_data_source";
    export * from "stream/tree_data_source";
    export * from "stream/data_source_operators";
    export * from "stream/duplex_data_source_operators";
    export * from "stream/operator_model";
    export * from "stream/stream";
    export * from "utilities/aurum";
    export * from "utilities/cancellation_token";
    export * from "utilities/event_emitter";
    export * from "utilities/classname";
    export * from "utilities/sources";
    export * from "stream/emitters";
    export * from "nodes/string_adapter";
    export * from "utilities/transclusion";
    export { aurumToHTML } from "builtin_components/dom_adapter";
    export { debugMode, enableDebugMode, enableDiagnosticMode } from "debug_mode";
    export { AttributeValue, ClassType, DataDrain } from "utilities/common";
    export { RemoteProtocol, getRemoteFunction } from "aurum_server/aurum_server_client";
}
//# sourceMappingURL=aurumjs.d.ts.map