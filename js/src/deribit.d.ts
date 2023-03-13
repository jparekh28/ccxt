import { Exchange } from './base/Exchange.js';
export default class deribit extends Exchange {
    describe(): any;
    fetchTime(params?: {}): Promise<number>;
    codeFromOptions(methodName: any, params?: {}): any;
    fetchStatus(params?: {}): Promise<{
        status: string;
        updated: number;
        eta: any;
        url: any;
        info: any;
    }>;
    fetchAccounts(params?: {}): Promise<any[]>;
    parseAccount(account: any, currency?: any): {
        info: any;
        id: string;
        type: string;
        code: any;
    };
    fetchMarkets(params?: {}): Promise<any[]>;
    parseBalance(balance: any): object;
    fetchBalance(params?: {}): Promise<object>;
    createDepositAddress(code: any, params?: {}): Promise<{
        currency: any;
        address: string;
        tag: any;
        info: any;
    }>;
    fetchDepositAddress(code: any, params?: {}): Promise<{
        currency: any;
        address: string;
        tag: any;
        network: any;
        info: any;
    }>;
    parseTicker(ticker: any, market?: any): import("./base/types.js").Ticker;
    fetchTicker(symbol: any, params?: {}): Promise<import("./base/types.js").Ticker>;
    fetchTickers(symbols?: any, params?: {}): Promise<any>;
    fetchOHLCV(symbol: any, timeframe?: string, since?: any, limit?: any, params?: {}): Promise<object[]>;
    parseTrade(trade: any, market?: any): import("./base/types.js").Trade;
    fetchTrades(symbol: any, since?: any, limit?: any, params?: {}): Promise<import("./base/types.js").Trade[]>;
    fetchTradingFees(params?: {}): Promise<{}>;
    fetchOrderBook(symbol: any, limit?: any, params?: {}): Promise<import("./base/ws/OrderBook.js").OrderBook>;
    parseOrderStatus(status: any): string;
    parseTimeInForce(timeInForce: any): string;
    parseOrderType(orderType: any): string;
    parseOrder(order: any, market?: any): any;
    fetchOrder(id: any, symbol?: any, params?: {}): Promise<any>;
    createOrder(symbol: any, type: any, side: any, amount: any, price?: any, params?: {}): Promise<any>;
    editOrder(id: any, symbol: any, type: any, side: any, amount?: any, price?: any, params?: {}): Promise<any>;
    cancelOrder(id: any, symbol?: any, params?: {}): Promise<any>;
    cancelAllOrders(symbol?: any, params?: {}): Promise<any>;
    fetchOpenOrders(symbol?: any, since?: any, limit?: any, params?: {}): Promise<object[]>;
    fetchClosedOrders(symbol?: any, since?: any, limit?: any, params?: {}): Promise<object[]>;
    fetchOrderTrades(id: any, symbol?: any, since?: any, limit?: any, params?: {}): Promise<import("./base/types.js").Trade[]>;
    fetchMyTrades(symbol?: any, since?: any, limit?: any, params?: {}): Promise<import("./base/types.js").Trade[]>;
    fetchDeposits(code?: any, since?: any, limit?: any, params?: {}): Promise<object[]>;
    fetchWithdrawals(code?: any, since?: any, limit?: any, params?: {}): Promise<object[]>;
    parseTransactionStatus(status: any): string;
    parseTransaction(transaction: any, currency?: any): {
        info: any;
        id: string;
        txid: string;
        timestamp: number;
        datetime: string;
        address: string;
        addressTo: string;
        addressFrom: any;
        tag: any;
        tagTo: any;
        tagFrom: any;
        type: string;
        amount: number;
        currency: any;
        status: string;
        updated: number;
        fee: any;
    };
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
        contracts: any;
        contractSize: number;
        marginRatio: any;
        liquidationPrice: number;
        markPrice: number;
        collateral: any;
        marginMode: any;
        side: string;
        percentage: number;
    };
    fetchPosition(symbol: any, params?: {}): Promise<{
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
        contracts: any;
        contractSize: number;
        marginRatio: any;
        liquidationPrice: number;
        markPrice: number;
        collateral: any;
        marginMode: any;
        side: string;
        percentage: number;
    }>;
    fetchPositions(symbols?: any, params?: {}): Promise<any>;
    fetchHistoricalVolatility(code: any, params?: {}): Promise<any[]>;
    fetchTransfers(code?: any, since?: any, limit?: any, params?: {}): Promise<object[]>;
    transfer(code: any, amount: any, fromAccount: any, toAccount: any, params?: {}): Promise<{
        info: any;
        id: string;
        status: string;
        amount: number;
        code: any;
        fromAccount: string;
        toAccount: string;
        timestamp: number;
        datetime: string;
    }>;
    parseTransfer(transfer: any, currency?: any): {
        info: any;
        id: string;
        status: string;
        amount: number;
        code: any;
        fromAccount: string;
        toAccount: string;
        timestamp: number;
        datetime: string;
    };
    parseTransferStatus(status: any): string;
    withdraw(code: any, amount: any, address: any, tag?: any, params?: {}): Promise<{
        info: any;
        id: string;
        txid: string;
        timestamp: number;
        datetime: string;
        address: string;
        addressTo: string;
        addressFrom: any;
        tag: any;
        tagTo: any;
        tagFrom: any;
        type: string;
        amount: number;
        currency: any;
        status: string;
        updated: number;
        fee: any;
    }>;
    nonce(): number;
    sign(path: any, api?: string, method?: string, params?: {}, headers?: any, body?: any): {
        url: string;
        method: string;
        body: any;
        headers: any;
    };
    handleErrors(httpCode: any, reason: any, url: any, method: any, headers: any, body: any, response: any, requestHeaders: any, requestBody: any): void;
}
