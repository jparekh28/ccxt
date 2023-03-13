import bittrexRest from '../bittrex.js';
export default class bittrex extends bittrexRest {
    describe(): any;
    getSignalRUrl(negotiation: any): string;
    makeRequest(requestId: any, method: any, args: any): {
        H: string;
        M: any;
        A: any;
        I: any;
    };
    makeRequestToSubscribe(requestId: any, args: any): {
        H: string;
        M: any;
        A: any;
        I: any;
    };
    makeRequestToAuthenticate(requestId: any): {
        H: string;
        M: any;
        A: any;
        I: any;
    };
    requestId(): any;
    sendRequestToSubscribe(negotiation: any, messageHash: any, subscription: any, params?: {}): Promise<any>;
    authenticate(params?: {}): Promise<any>;
    sendRequestToAuthenticate(negotiation: any, expired?: boolean, params?: {}): Promise<any>;
    sendAuthenticatedRequestToSubscribe(authentication: any, messageHash: any, params?: {}): Promise<any>;
    handleAuthenticate(client: any, message: any, subscription: any): void;
    handleAuthenticationExpiringHelper(): Promise<any>;
    handleAuthenticationExpiring(client: any, message: any): void;
    createSignalRQuery(params?: {}): any;
    negotiate(params?: {}): Promise<any>;
    start(negotiation: any, params?: {}): Promise<any>;
    watchOrders(symbol?: any, since?: any, limit?: any, params?: {}): Promise<object[]>;
    subscribeToOrders(authentication: any, params?: {}): Promise<any>;
    handleOrder(client: any, message: any): void;
    watchBalance(params?: {}): Promise<any>;
    subscribeToBalance(authentication: any, params?: {}): Promise<any>;
    handleBalance(client: any, message: any): void;
    watchHeartbeat(params?: {}): Promise<any>;
    subscribeToHeartbeat(negotiation: any, params?: {}): Promise<any>;
    handleHeartbeat(client: any, message: any): void;
    watchTicker(symbol: any, params?: {}): Promise<any>;
    subscribeToTicker(negotiation: any, symbol: any, params?: {}): Promise<any>;
    handleTicker(client: any, message: any): void;
    watchOHLCV(symbol: any, timeframe?: string, since?: any, limit?: any, params?: {}): Promise<object[]>;
    subscribeToOHLCV(negotiation: any, symbol: any, timeframe?: string, params?: {}): Promise<any>;
    handleOHLCV(client: any, message: any): void;
    watchTrades(symbol: any, since?: any, limit?: any, params?: {}): Promise<object[]>;
    subscribeToTrades(negotiation: any, symbol: any, params?: {}): Promise<any>;
    handleTrades(client: any, message: any): void;
    watchMyTrades(symbol?: any, since?: any, limit?: any, params?: {}): Promise<object[]>;
    subscribeToMyTrades(authentication: any, params?: {}): Promise<any>;
    handleMyTrades(client: any, message: any): void;
    watchOrderBook(symbol: any, limit?: any, params?: {}): Promise<any>;
    subscribeToOrderBook(negotiation: any, symbol: any, limit?: any, params?: {}): Promise<any>;
    fetchOrderBookSnapshot(client: any, message: any, subscription: any): Promise<void>;
    handleSubscribeToOrderBook(client: any, message: any, subscription: any): void;
    handleDelta(bookside: any, delta: any): void;
    handleDeltas(bookside: any, deltas: any): void;
    handleOrderBook(client: any, message: any): void;
    handleOrderBookMessage(client: any, message: any, orderbook: any): any;
    handleSystemStatusHelper(): Promise<void>;
    handleSystemStatus(client: any, message: any): any;
    handleSubscriptionStatus(client: any, message: any): any;
    handleMessage(client: any, message: any): void;
}
