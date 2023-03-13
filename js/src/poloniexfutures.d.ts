import { Exchange } from './base/Exchange.js';
export default class poloniexfutures extends Exchange {
    describe(): any;
    fetchMarkets(params?: {}): Promise<any[]>;
    parseTicker(ticker: any, market?: any): import("./base/types.js").Ticker;
    fetchTicker(symbol: any, params?: {}): Promise<import("./base/types.js").Ticker>;
    fetchTickers(symbols?: any, params?: {}): Promise<any>;
    fetchOrderBook(symbol: any, limit?: any, params?: {}): Promise<any>;
    fetchL3OrderBook(symbol: any, limit?: any, params?: {}): Promise<any>;
    parseTrade(trade: any, market?: any): import("./base/types.js").Trade;
    fetchTrades(symbol: any, since?: any, limit?: any, params?: {}): Promise<import("./base/types.js").Trade[]>;
    fetchTime(params?: {}): Promise<number>;
    fetchOHLCV(symbol: any, timeframe?: string, since?: any, limit?: any, params?: {}): Promise<object[]>;
    parseBalance(response: any): object;
    fetchBalance(params?: {}): Promise<object>;
    createOrder(symbol: any, type: any, side: any, amount: any, price?: any, params?: {}): Promise<{
        id: string;
        clientOrderId: any;
        timestamp: any;
        datetime: any;
        lastTradeTimestamp: any;
        symbol: any;
        type: any;
        side: any;
        price: any;
        amount: any;
        cost: any;
        average: any;
        filled: any;
        remaining: any;
        status: any;
        fee: any;
        trades: any;
        timeInForce: any;
        postOnly: any;
        stopPrice: any;
        info: any;
    }>;
    cancelOrder(id: any, symbol?: any, params?: {}): Promise<{
        id: string;
        clientOrderId: any;
        timestamp: any;
        datetime: any;
        lastTradeTimestamp: any;
        symbol: any;
        type: any;
        side: any;
        price: any;
        amount: any;
        cost: any;
        average: any;
        filled: any;
        remaining: any;
        status: any;
        fee: any;
        trades: any;
        timeInForce: any;
        postOnly: any;
        stopPrice: any;
        info: any;
    }>;
    fetchPositions(symbols?: any, params?: {}): Promise<any>;
    parsePosition(position: any, market?: any): {
        info: any;
        id: any;
        symbol: string;
        timestamp: number;
        datetime: string;
        initialMargin: number;
        initialMarginPercentage: number;
        maintenanceMargin: number;
        maintenanceMarginPercentage: number;
        entryPrice: number;
        notional: number;
        leverage: number;
        unrealizedPnl: number;
        contracts: number;
        contractSize: any;
        marginRatio: any;
        liquidationPrice: number;
        markPrice: number;
        collateral: number;
        marginMode: string;
        side: any;
        percentage: number;
    };
    fetchFundingHistory(symbol?: any, since?: any, limit?: any, params?: {}): Promise<any[]>;
    cancelAllOrders(symbol?: any, params?: {}): Promise<any[]>;
    fetchOrdersByStatus(status: any, symbol?: any, since?: any, limit?: any, params?: {}): Promise<object[]>;
    fetchOpenOrders(symbol?: any, since?: any, limit?: any, params?: {}): Promise<object[]>;
    fetchClosedOrders(symbol?: any, since?: any, limit?: any, params?: {}): Promise<object[]>;
    fetchOrder(id?: any, symbol?: any, params?: {}): Promise<any>;
    parseOrder(order: any, market?: any): any;
    fetchFundingRate(symbol: any, params?: {}): Promise<{
        info: any;
        symbol: any;
        markPrice: any;
        indexPrice: any;
        interestRate: any;
        estimatedSettlePrice: any;
        timestamp: any;
        datetime: any;
        fundingRate: number;
        fundingTimestamp: any;
        fundingDatetime: any;
        nextFundingRate: any;
        nextFundingTimestamp: any;
        nextFundingDatetime: any;
        previousFundingRate: number;
        previousFundingTimestamp: number;
        previousFundingDatetime: string;
    }>;
    fetchMyTrades(symbol?: any, since?: any, limit?: any, params?: {}): Promise<import("./base/types.js").Trade[]>;
    setMarginMode(marginMode: any, symbol: any, params?: {}): Promise<any>;
    sign(path: any, api?: string, method?: string, params?: {}, headers?: any, body?: any): {
        url: any;
        method: string;
        body: any;
        headers: any;
    };
    handleErrors(code: any, reason: any, url: any, method: any, headers: any, body: any, response: any, requestHeaders: any, requestBody: any): void;
}
