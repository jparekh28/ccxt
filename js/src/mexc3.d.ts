import { Exchange } from './base/Exchange.js';
export default class mexc3 extends Exchange {
    describe(): any;
    fetchStatus(params?: {}): Promise<{
        status: any;
        updated: any;
        url: any;
        eta: any;
        info: any;
    }>;
    fetchTime(params?: {}): Promise<number>;
    fetchCurrencies(params?: {}): Promise<{}>;
    safeNetwork(networkId: any): string;
    fetchMarkets(params?: {}): Promise<any>;
    fetchSpotMarkets(params?: {}): Promise<any[]>;
    fetchSwapMarkets(params?: {}): Promise<any[]>;
    fetchOrderBook(symbol: any, limit?: any, params?: {}): Promise<any>;
    fetchTrades(symbol: any, since?: any, limit?: any, params?: {}): Promise<import("./base/types.js").Trade[]>;
    parseTrade(trade: any, market?: any): import("./base/types.js").Trade;
    syntheticTradeId(market?: any, timestamp?: any, side?: any, amount?: any, price?: any, orderType?: any, takerOrMaker?: any): string;
    fetchOHLCV(symbol: any, timeframe?: string, since?: any, limit?: any, params?: {}): Promise<object[]>;
    parseOHLCV(ohlcv: any, market?: any): number[];
    fetchTickers(symbols?: any, params?: {}): Promise<any>;
    fetchTicker(symbol: any, params?: {}): Promise<import("./base/types.js").Ticker>;
    parseTicker(ticker: any, market?: any): import("./base/types.js").Ticker;
    fetchBidsAsks(symbols?: any, params?: {}): Promise<any>;
    createOrder(symbol: any, type: any, side: any, amount: any, price?: any, params?: {}): Promise<any>;
    createSpotOrder(market: any, type: any, side: any, amount: any, price?: any, marginMode?: any, params?: {}): Promise<any>;
    createSwapOrder(market: any, type: any, side: any, amount: any, price?: any, marginMode?: any, params?: {}): Promise<any>;
    fetchOrder(id: any, symbol?: any, params?: {}): Promise<any>;
    fetchOrders(symbol?: any, since?: any, limit?: any, params?: {}): Promise<object[]>;
    fetchOrdersByIds(ids: any, symbol?: any, params?: {}): Promise<object[]>;
    fetchOpenOrders(symbol?: any, since?: any, limit?: any, params?: {}): Promise<object[]>;
    fetchClosedOrders(symbol?: any, since?: any, limit?: any, params?: {}): Promise<object[]>;
    fetchCanceledOrders(symbol?: any, since?: any, limit?: any, params?: {}): Promise<object[]>;
    fetchOrdersByState(state: any, symbol?: any, since?: any, limit?: any, params?: {}): Promise<object[]>;
    cancelOrder(id: any, symbol?: any, params?: {}): Promise<any>;
    cancelOrders(ids: any, symbol?: any, params?: {}): Promise<object[]>;
    cancelAllOrders(symbol?: any, params?: {}): Promise<object[]>;
    parseOrder(order: any, market?: any): any;
    parseOrderSide(status: any): string;
    parseOrderType(status: any): string;
    parseOrderStatus(status: any): string;
    parseOrderTimeInForce(status: any): string;
    fetchAccountHelper(type: any, params: any): Promise<any>;
    fetchAccounts(params?: {}): Promise<any[]>;
    fetchTradingFees(params?: {}): Promise<{}>;
    parseBalance(response: any, marketType: any): object;
    parseBalanceHelper(entry: any): {
        free: any;
        used: any;
        total: any;
    };
    fetchBalance(params?: {}): Promise<object>;
    fetchMyTrades(symbol?: any, since?: any, limit?: any, params?: {}): Promise<import("./base/types.js").Trade[]>;
    fetchOrderTrades(id: any, symbol?: any, since?: any, limit?: any, params?: {}): Promise<import("./base/types.js").Trade[]>;
    modifyMarginHelper(symbol: any, amount: any, addOrReduce: any, params?: {}): Promise<any>;
    reduceMargin(symbol: any, amount: any, params?: {}): Promise<any>;
    addMargin(symbol: any, amount: any, params?: {}): Promise<any>;
    setLeverage(leverage: any, symbol?: any, params?: {}): Promise<any>;
    fetchFundingHistory(symbol?: any, since?: any, limit?: any, params?: {}): Promise<any[]>;
    parseFundingRate(contract: any, market?: any): {
        info: any;
        symbol: any;
        markPrice: any;
        indexPrice: any;
        interestRate: any;
        estimatedSettlePrice: any;
        timestamp: number;
        datetime: string;
        fundingRate: number;
        fundingTimestamp: number;
        fundingDatetime: string;
        nextFundingRate: any;
        nextFundingTimestamp: any;
        nextFundingDatetime: any;
        previousFundingRate: any;
        previousFundingTimestamp: any;
        previousFundingDatetime: any;
    };
    fetchFundingRate(symbol: any, params?: {}): Promise<{
        info: any;
        symbol: any;
        markPrice: any;
        indexPrice: any;
        interestRate: any;
        estimatedSettlePrice: any;
        timestamp: number;
        datetime: string;
        fundingRate: number;
        fundingTimestamp: number;
        fundingDatetime: string;
        nextFundingRate: any;
        nextFundingTimestamp: any;
        nextFundingDatetime: any;
        previousFundingRate: any;
        previousFundingTimestamp: any;
        previousFundingDatetime: any;
    }>;
    fetchFundingRateHistory(symbol?: any, since?: any, limit?: any, params?: {}): Promise<object[]>;
    fetchLeverageTiers(symbols?: any, params?: {}): Promise<{}>;
    parseMarketLeverageTiers(info: any, market: any): any[];
    parseDepositAddress(depositAddress: any, currency?: any): {
        currency: any;
        address: string;
        tag: any;
        network: string;
        info: any;
    };
    fetchDepositAddressesByNetwork(code: any, params?: {}): Promise<any[]>;
    fetchDepositAddress(code: any, params?: {}): Promise<any>;
    fetchDeposits(code?: any, since?: any, limit?: any, params?: {}): Promise<object[]>;
    fetchWithdrawals(code?: any, since?: any, limit?: any, params?: {}): Promise<object[]>;
    parseTransaction(transaction: any, currency?: any): {
        info: any;
        id: string;
        txid: string;
        timestamp: number;
        datetime: string;
        network: string;
        address: string;
        addressTo: string;
        addressFrom: any;
        tag: string;
        tagTo: any;
        tagFrom: any;
        type: string;
        amount: number;
        currency: any;
        status: string;
        updated: any;
        fee: any;
    };
    parseTransactionStatus(status: any): string;
    fetchPosition(symbol: any, params?: {}): Promise<any>;
    fetchPositions(symbols?: any, params?: {}): Promise<any>;
    parsePosition(position: any, market?: any): {
        info: any;
        id: any;
        symbol: any;
        contracts: number;
        contractSize: any;
        entryPrice: number;
        collateral: any;
        side: string;
        unrealizedProfit: any;
        leverage: number;
        percentage: any;
        marginType: string;
        notional: any;
        markPrice: any;
        liquidationPrice: number;
        initialMargin: number;
        initialMarginPercentage: any;
        maintenanceMargin: any;
        maintenanceMarginPercentage: any;
        marginRatio: any;
        timestamp: number;
        datetime: string;
    };
    fetchTransfer(id: any, since?: any, limit?: any, params?: {}): Promise<{
        info: any;
        id: string;
        timestamp: number;
        datetime: string;
        currency: any;
        amount: number;
        fromAccount: string;
        toAccount: string;
        status: string;
    }>;
    fetchTransfers(code?: any, since?: any, limit?: any, params?: {}): Promise<object[]>;
    transfer(code: any, amount: any, fromAccount: any, toAccount: any, params?: {}): Promise<any>;
    parseTransfer(transfer: any, currency?: any): {
        info: any;
        id: string;
        timestamp: number;
        datetime: string;
        currency: any;
        amount: number;
        fromAccount: string;
        toAccount: string;
        status: string;
    };
    parseAccountId(status: any): string;
    parseTransferStatus(status: any): string;
    withdraw(code: any, amount: any, address: any, tag?: any, params?: {}): Promise<{
        info: any;
        id: string;
        txid: string;
        timestamp: number;
        datetime: string;
        network: string;
        address: string;
        addressTo: string;
        addressFrom: any;
        tag: string;
        tagTo: any;
        tagFrom: any;
        type: string;
        amount: number;
        currency: any;
        status: string;
        updated: any;
        fee: any;
    }>;
    setPositionMode(hedged: any, symbol?: any, params?: {}): Promise<any>;
    fetchPositionMode(symbol?: any, params?: {}): Promise<{
        info: any;
        hedged: boolean;
    }>;
    borrowMargin(code: any, amount: any, symbol?: any, params?: {}): Promise<any>;
    repayMargin(code: any, amount: any, symbol?: any, params?: {}): Promise<any>;
    fetchTransactionFees(codes?: any, params?: {}): Promise<{
        withdraw: {};
        deposit: {};
        info: any;
    }>;
    parseTransactionFees(response: any, codes?: any): {
        withdraw: {};
        deposit: {};
        info: any;
    };
    parseTransactionFee(transaction: any, currency?: any): {};
    fetchDepositWithdrawFees(codes?: any, params?: {}): Promise<{}>;
    parseDepositWithdrawFee(fee: any, currency?: any): any;
    parseMarginLoan(info: any, currency?: any): {
        id: string;
        currency: any;
        amount: any;
        symbol: any;
        timestamp: any;
        datetime: any;
        info: any;
    };
    handleMarginModeAndParams(methodName: any, params?: {}, defaultValue?: any): any[];
    sign(path: any, api?: string, method?: string, params?: {}, headers?: any, body?: any): {
        url: any;
        method: string;
        body: any;
        headers: any;
    };
    handleErrors(code: any, reason: any, url: any, method: any, headers: any, body: any, response: any, requestHeaders: any, requestBody: any): void;
}
