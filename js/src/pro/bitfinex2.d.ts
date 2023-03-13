import bitfinex2Rest from '../bitfinex2.js';
export default class bitfinex2 extends bitfinex2Rest {
    describe(): any;
    subscribe(channel: any, symbol: any, params?: {}): Promise<any>;
    subscribePrivate(messageHash: any): Promise<any>;
    watchOHLCV(symbol: any, timeframe?: string, since?: any, limit?: any, params?: {}): Promise<object[]>;
    handleOHLCV(client: any, message: any, subscription: any): void;
    watchTrades(symbol: any, since?: any, limit?: any, params?: {}): Promise<object[]>;
    watchMyTrades(symbol?: any, since?: any, limit?: any, params?: {}): Promise<object[]>;
    watchTicker(symbol: any, params?: {}): Promise<any>;
    handleMyTrade(client: any, message: any, subscription?: {}): void;
    handleTrades(client: any, message: any, subscription: any): any;
    parseWsTrade(trade: any, isPublic?: boolean, market?: any): import("../base/types.js").Trade;
    handleTicker(client: any, message: any, subscription: any): void;
    parseWsTicker(ticker: any, market?: any): import("../base/types.js").Ticker;
    watchOrderBook(symbol: any, limit?: any, params?: {}): Promise<any>;
    handleOrderBook(client: any, message: any, subscription: any): void;
    handleChecksum(client: any, message: any, subscription: any): void;
    watchBalance(params?: {}): Promise<any>;
    handleBalance(client: any, message: any, subscription: any): void;
    parseWsBalance(balance: any): {
        free: any;
        used: any;
        total: any;
    };
    handleSystemStatus(client: any, message: any): any;
    handleSubscriptionStatus(client: any, message: any): any;
    authenticate(params?: {}): any;
    handleAuthenticationMessage(client: any, message: any): void;
    watchOrders(symbol?: any, since?: any, limit?: any, params?: {}): Promise<object[]>;
    handleOrders(client: any, message: any, subscription: any): void;
    parseWsOrderStatus(status: any): string;
    parseWsOrder(order: any, market?: any): any;
    handleMessage(client: any, message: any): any;
}
