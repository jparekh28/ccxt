import { Exchange } from './base/Exchange.js';
export default class coinbase extends Exchange {
    describe(): any;
    fetchTime(params?: {}): Promise<number>;
    fetchAccounts(params?: {}): Promise<any[]>;
    fetchAccountsV2(params?: {}): Promise<any[]>;
    fetchAccountsV3(params?: {}): Promise<any[]>;
    parseAccount(account: any): {
        id: string;
        type: string;
        code: any;
        info: any;
    };
    createDepositAddress(code: any, params?: {}): Promise<{
        currency: any;
        tag: string;
        address: string;
        info: any;
    }>;
    fetchMySells(symbol?: any, since?: any, limit?: any, params?: {}): Promise<import("./base/types.js").Trade[]>;
    fetchMyBuys(symbol?: any, since?: any, limit?: any, params?: {}): Promise<import("./base/types.js").Trade[]>;
    fetchTransactionsWithMethod(method: any, code?: any, since?: any, limit?: any, params?: {}): Promise<object[]>;
    fetchWithdrawals(code?: any, since?: any, limit?: any, params?: {}): Promise<object[]>;
    fetchDeposits(code?: any, since?: any, limit?: any, params?: {}): Promise<object[]>;
    parseTransactionStatus(status: any): string;
    parseTransaction(transaction: any, market?: any): {
        info: any;
        id: string;
        txid: string;
        timestamp: number;
        datetime: string;
        network: any;
        address: any;
        addressTo: any;
        addressFrom: any;
        tag: any;
        tagTo: any;
        tagFrom: any;
        type: string;
        amount: number;
        currency: any;
        status: string;
        updated: number;
        fee: {
            cost: number;
            currency: any;
        };
    };
    parseTrade(trade: any, market?: any): import("./base/types.js").Trade;
    fetchMarkets(params?: {}): Promise<any>;
    fetchMarketsV2(params?: {}): Promise<any[]>;
    fetchMarketsV3(params?: {}): Promise<any[]>;
    fetchCurrenciesFromCache(params?: {}): Promise<any>;
    fetchCurrencies(params?: {}): Promise<{}>;
    fetchTickers(symbols?: any, params?: {}): Promise<any>;
    fetchTickersV2(symbols?: any, params?: {}): Promise<any>;
    fetchTickersV3(symbols?: any, params?: {}): Promise<any>;
    fetchTicker(symbol: any, params?: {}): Promise<import("./base/types.js").Ticker>;
    fetchTickerV2(symbol: any, params?: {}): Promise<import("./base/types.js").Ticker>;
    fetchTickerV3(symbol: any, params?: {}): Promise<import("./base/types.js").Ticker>;
    parseTicker(ticker: any, market?: any): import("./base/types.js").Ticker;
    parseBalance(response: any, params?: {}): object;
    fetchBalance(params?: {}): Promise<object>;
    fetchLedger(code?: any, since?: any, limit?: any, params?: {}): Promise<object[]>;
    parseLedgerEntryStatus(status: any): string;
    parseLedgerEntryType(type: any): string;
    parseLedgerEntry(item: any, currency?: any): {
        info: any;
        id: string;
        timestamp: number;
        datetime: string;
        direction: any;
        account: any;
        referenceId: any;
        referenceAccount: any;
        type: string;
        currency: any;
        amount: number;
        before: any;
        after: any;
        status: string;
        fee: any;
    };
    findAccountId(code: any): Promise<any>;
    prepareAccountRequest(limit?: any, params?: {}): {
        account_id: string;
    };
    prepareAccountRequestWithCurrencyCode(code?: any, limit?: any, params?: {}): Promise<{
        account_id: string;
    }>;
    createOrder(symbol: any, type: any, side: any, amount: any, price?: any, params?: {}): Promise<any>;
    parseOrder(order: any, market?: any): any;
    parseOrderStatus(status: any): string;
    parseOrderType(type: any): string;
    parseTimeInForce(timeInForce: any): string;
    cancelOrder(id: any, symbol?: any, params?: {}): Promise<any>;
    cancelOrders(ids: any, symbol?: any, params?: {}): Promise<object[]>;
    fetchOrder(id: any, symbol?: any, params?: {}): Promise<any>;
    fetchOrders(symbol?: any, since?: any, limit?: number, params?: {}): Promise<object[]>;
    fetchOrdersByStatus(status: any, symbol?: any, since?: any, limit?: any, params?: {}): Promise<object[]>;
    fetchOpenOrders(symbol?: any, since?: any, limit?: any, params?: {}): Promise<object[]>;
    fetchClosedOrders(symbol?: any, since?: any, limit?: any, params?: {}): Promise<object[]>;
    fetchCanceledOrders(symbol?: any, since?: any, limit?: any, params?: {}): Promise<object[]>;
    fetchOHLCV(symbol: any, timeframe?: string, since?: any, limit?: any, params?: {}): Promise<object[]>;
    parseOHLCV(ohlcv: any, market?: any): number[];
    fetchTrades(symbol: any, since?: any, limit?: any, params?: {}): Promise<import("./base/types.js").Trade[]>;
    fetchMyTrades(symbol?: any, since?: any, limit?: any, params?: {}): Promise<import("./base/types.js").Trade[]>;
    sign(path: any, api?: any[], method?: string, params?: {}, headers?: any, body?: any): {
        url: string;
        method: string;
        body: any;
        headers: any;
    };
    handleErrors(code: any, reason: any, url: any, method: any, headers: any, body: any, response: any, requestHeaders: any, requestBody: any): void;
}
