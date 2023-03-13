import { Exchange } from './base/Exchange.js';
export default class woo extends Exchange {
    describe(): any;
    fetchMarkets(params?: {}): Promise<any[]>;
    fetchTrades(symbol: any, since?: any, limit?: any, params?: {}): Promise<import("./base/types.js").Trade[]>;
    parseTrade(trade: any, market?: any): import("./base/types.js").Trade;
    parseTokenAndFeeTemp(item: any, feeTokenKey: any, feeAmountKey: any): any;
    fetchTradingFees(params?: {}): Promise<{}>;
    fetchCurrencies(params?: {}): Promise<{}>;
    createOrder(symbol: any, type: any, side: any, amount: any, price?: any, params?: {}): Promise<any>;
    editOrder(id: any, symbol: any, type: any, side: any, amount: any, price?: any, params?: {}): Promise<any>;
    cancelOrder(id: any, symbol?: any, params?: {}): Promise<any>;
    cancelAllOrders(symbol?: any, params?: {}): Promise<any>;
    fetchOrder(id: any, symbol?: any, params?: {}): Promise<any>;
    fetchOrders(symbol?: any, since?: any, limit?: any, params?: {}): Promise<object[]>;
    parseTimeInForce(timeInForce: any): string;
    parseOrder(order: any, market?: any): any;
    parseOrderStatus(status: any): any;
    fetchOrderBook(symbol: any, limit?: any, params?: {}): Promise<import("./base/ws/OrderBook.js").OrderBook>;
    fetchOHLCV(symbol: any, timeframe?: string, since?: any, limit?: any, params?: {}): Promise<object[]>;
    parseOHLCV(ohlcv: any, market?: any): number[];
    fetchOrderTrades(id: any, symbol?: any, since?: any, limit?: any, params?: {}): Promise<import("./base/types.js").Trade[]>;
    fetchMyTrades(symbol?: any, since?: any, limit?: any, params?: {}): Promise<import("./base/types.js").Trade[]>;
    fetchAccounts(params?: {}): Promise<any[]>;
    parseAccount(account: any): {
        info: any;
        id: string;
        name: string;
        code: any;
        type: string;
    };
    fetchBalance(params?: {}): Promise<object>;
    parseBalance(response: any): object;
    fetchDepositAddress(code: any, params?: {}): Promise<{
        currency: any;
        address: string;
        tag: string;
        network: string;
        info: any;
    }>;
    getAssetHistoryRows(code?: any, since?: any, limit?: any, params?: {}): Promise<any[]>;
    fetchLedger(code?: any, since?: any, limit?: any, params?: {}): Promise<object[]>;
    parseLedgerEntry(item: any, currency?: any): {
        id: string;
        currency: any;
        account: string;
        referenceAccount: any;
        referenceId: string;
        status: string;
        amount: number;
        before: any;
        after: any;
        fee: any;
        direction: string;
        timestamp: number;
        datetime: string;
        type: string;
        info: any;
    };
    parseLedgerEntryType(type: any): string;
    getCurrencyFromChaincode(networkizedCode: any, currency: any): any;
    fetchDeposits(code?: any, since?: any, limit?: any, params?: {}): Promise<object[]>;
    fetchWithdrawals(code?: any, since?: any, limit?: any, params?: {}): Promise<object[]>;
    fetchTransactions(code?: any, since?: any, limit?: any, params?: {}): Promise<object[]>;
    parseTransaction(transaction: any, currency?: any): {
        id: string;
        txid: string;
        timestamp: number;
        datetime: string;
        address: any;
        addressFrom: string;
        addressTo: string;
        tag: string;
        type: string;
        amount: number;
        currency: any;
        status: string;
        updated: number;
        fee: any;
        info: any;
    };
    parseTransactionStatus(status: any): string;
    transfer(code: any, amount: any, fromAccount: any, toAccount: any, params?: {}): Promise<{
        id: string;
        timestamp: number;
        datetime: string;
        currency: any;
        amount: number;
        fromAccount: any;
        toAccount: any;
        status: string;
        info: any;
    }>;
    fetchTransfers(code?: any, since?: any, limit?: any, params?: {}): Promise<object[]>;
    parseTransfer(transfer: any, currency?: any): {
        id: string;
        timestamp: number;
        datetime: string;
        currency: any;
        amount: number;
        fromAccount: any;
        toAccount: any;
        status: string;
        info: any;
    };
    parseTransferStatus(status: any): string;
    withdraw(code: any, amount: any, address: any, tag?: any, params?: {}): Promise<{
        id: string;
        txid: string;
        timestamp: number;
        datetime: string;
        address: any;
        addressFrom: string;
        addressTo: string;
        tag: string;
        type: string;
        amount: number;
        currency: any;
        status: string;
        updated: number;
        fee: any;
        info: any;
    }>;
    repayMargin(code: any, amount: any, symbol?: any, params?: {}): Promise<any>;
    parseMarginLoan(info: any, currency?: any): {
        id: any;
        currency: any;
        amount: any;
        symbol: any;
        timestamp: any;
        datetime: any;
        info: any;
    };
    nonce(): number;
    sign(path: any, section?: string, method?: string, params?: {}, headers?: any, body?: any): {
        url: any;
        method: string;
        body: any;
        headers: any;
    };
    handleErrors(httpCode: any, reason: any, url: any, method: any, headers: any, body: any, response: any, requestHeaders: any, requestBody: any): void;
    parseIncome(income: any, market?: any): {
        info: any;
        symbol: any;
        code: any;
        timestamp: number;
        datetime: string;
        id: string;
        amount: number;
        rate: number;
    };
    fetchFundingHistory(symbol?: any, since?: any, limit?: any, params?: {}): Promise<object[]>;
    parseFundingRate(fundingRate: any, market?: any): {
        info: any;
        symbol: any;
        markPrice: any;
        indexPrice: any;
        interestRate: number;
        estimatedSettlePrice: any;
        timestamp: number;
        datetime: string;
        fundingRate: number;
        fundingTimestamp: number;
        fundingDatetime: string;
        nextFundingRate: any;
        nextFundingTimestamp: any;
        nextFundingDatetime: any;
        previousFundingRate: number;
        previousFundingTimestamp: number;
        previousFundingDatetime: string;
    };
    fetchFundingRate(symbol: any, params?: {}): Promise<{
        info: any;
        symbol: any;
        markPrice: any;
        indexPrice: any;
        interestRate: number;
        estimatedSettlePrice: any;
        timestamp: number;
        datetime: string;
        fundingRate: number;
        fundingTimestamp: number;
        fundingDatetime: string;
        nextFundingRate: any;
        nextFundingTimestamp: any;
        nextFundingDatetime: any;
        previousFundingRate: number;
        previousFundingTimestamp: number;
        previousFundingDatetime: string;
    }>;
    fetchFundingRates(symbols?: any, params?: {}): Promise<any>;
    fetchFundingRateHistory(symbol?: any, since?: any, limit?: any, params?: {}): Promise<object[]>;
    fetchLeverage(symbol: any, params?: {}): Promise<{
        info: any;
        leverage: number;
    }>;
    setLeverage(leverage: any, symbol?: any, params?: {}): Promise<any>;
    fetchPosition(symbol?: any, params?: {}): Promise<{
        info: any;
        id: any;
        symbol: string;
        timestamp: number;
        datetime: string;
        initialMargin: any;
        initialMarginPercentage: any;
        maintenanceMargin: any;
        maintenanceMarginPercentage: any;
        entryPrice: number;
        notional: number;
        leverage: any;
        unrealizedPnl: number;
        contracts: number;
        contractSize: number;
        marginRatio: any;
        liquidationPrice: number;
        markPrice: number;
        collateral: any;
        marginMode: string;
        marginType: any;
        side: any;
        percentage: any;
    }>;
    fetchPositions(symbols?: any, params?: {}): Promise<any>;
    parsePosition(position: any, market?: any): {
        info: any;
        id: any;
        symbol: string;
        timestamp: number;
        datetime: string;
        initialMargin: any;
        initialMarginPercentage: any;
        maintenanceMargin: any;
        maintenanceMarginPercentage: any;
        entryPrice: number;
        notional: number;
        leverage: any;
        unrealizedPnl: number;
        contracts: number;
        contractSize: number;
        marginRatio: any;
        liquidationPrice: number;
        markPrice: number;
        collateral: any;
        marginMode: string;
        marginType: any;
        side: any;
        percentage: any;
    };
    defaultNetworkCodeForCurrency(code: any): any;
}
