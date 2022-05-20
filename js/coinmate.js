'use strict';

//  ---------------------------------------------------------------------------

const Exchange = require ('./base/Exchange');
const { ExchangeError, ArgumentsRequired, InvalidOrder, OrderNotFound, RateLimitExceeded, InsufficientFunds, AuthenticationError } = require ('./base/errors');
const Precise = require ('./base/Precise');

//  ---------------------------------------------------------------------------

module.exports = class coinmate extends Exchange {
    describe () {
        return this.deepExtend (super.describe (), {
            'id': 'coinmate',
            'name': 'CoinMate',
            'countries': [ 'GB', 'CZ', 'EU' ], // UK, Czech Republic
            'rateLimit': 1000,
            'has': {
                'CORS': true,
                'spot': true,
                'margin': false,
                'swap': false,
                'future': false,
                'option': false,
                'addMargin': false,
                'cancelOrder': true,
                'createOrder': true,
                'createReduceOnlyOrder': false,
                'fetchBalance': true,
                'fetchBorrowRate': false,
                'fetchBorrowRateHistories': false,
                'fetchBorrowRateHistory': false,
                'fetchBorrowRates': false,
                'fetchBorrowRatesPerSymbol': false,
                'fetchFundingHistory': false,
                'fetchFundingRate': false,
                'fetchFundingRateHistory': false,
                'fetchFundingRates': false,
                'fetchIndexOHLCV': false,
                'fetchLeverage': false,
                'fetchLeverageTiers': false,
                'fetchMarkets': true,
                'fetchMarkOHLCV': false,
                'fetchMyTrades': true,
                'fetchOpenOrders': true,
                'fetchOrder': true,
                'fetchOrderBook': true,
                'fetchOrders': true,
                'fetchPosition': false,
                'fetchPositions': false,
                'fetchPositionsRisk': false,
                'fetchPremiumIndexOHLCV': false,
                'fetchTicker': true,
                'fetchTrades': true,
                'fetchTradingFee': true,
                'fetchTradingFees': false,
                'fetchTransactions': true,
                'reduceMargin': false,
                'setLeverage': false,
                'setMarginMode': false,
                'setPositionMode': false,
                'transfer': false,
                'withdraw': true,
            },
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/51840849/87460806-1c9f3f00-c616-11ea-8c46-a77018a8f3f4.jpg',
                'api': 'https://coinmate.io/api',
                'www': 'https://coinmate.io',
                'fees': 'https://coinmate.io/fees',
                'doc': [
                    'https://coinmate.docs.apiary.io',
                    'https://coinmate.io/developers',
                ],
                'referral': 'https://coinmate.io?referral=YTFkM1RsOWFObVpmY1ZjMGREQmpTRnBsWjJJNVp3PT0',
            },
            'requiredCredentials': {
                'apiKey': true,
                'secret': true,
                'uid': true,
            },
            'api': {
                'public': {
                    'get': [
                        'orderBook',
                        'ticker',
                        'transactions',
                        'tradingPairs',
                    ],
                },
                'private': {
                    'post': [
                        'balances',
                        'bitcoinCashWithdrawal',
                        'bitcoinCashDepositAddresses',
                        'bitcoinDepositAddresses',
                        'bitcoinWithdrawal',
                        'bitcoinWithdrawalFees',
                        'buyInstant',
                        'buyLimit',
                        'cancelOrder',
                        'cancelOrderWithInfo',
                        'createVoucher',
                        'dashDepositAddresses',
                        'dashWithdrawal',
                        'ethereumWithdrawal',
                        'ethereumDepositAddresses',
                        'litecoinWithdrawal',
                        'litecoinDepositAddresses',
                        'openOrders',
                        'order',
                        'orderHistory',
                        'orderById',
                        'pusherAuth',
                        'redeemVoucher',
                        'replaceByBuyLimit',
                        'replaceByBuyInstant',
                        'replaceBySellLimit',
                        'replaceBySellInstant',
                        'rippleDepositAddresses',
                        'rippleWithdrawal',
                        'sellInstant',
                        'sellLimit',
                        'transactionHistory',
                        'traderFees',
                        'tradeHistory',
                        'transfer',
                        'transferHistory',
                        'unconfirmedBitcoinDeposits',
                        'unconfirmedBitcoinCashDeposits',
                        'unconfirmedDashDeposits',
                        'unconfirmedEthereumDeposits',
                        'unconfirmedLitecoinDeposits',
                        'unconfirmedRippleDeposits',
                    ],
                },
            },
            'fees': {
                'trading': {
                    'tierBased': true,
                    'percentage': true,
                    'maker': 0.12 / 100,
                    'taker': 0.25 / 100,
                    'tiers': {
                        'taker': [
                            [ this.parseNumber ('0'), this.parseNumber ('0.0035') ],
                            [ this.parseNumber ('10000'), this.parseNumber ('0.0023') ],
                            [ this.parseNumber ('100000'), this.parseNumber ('0.0021') ],
                            [ this.parseNumber ('250000'), this.parseNumber ('0.0020') ],
                            [ this.parseNumber ('500000'), this.parseNumber ('0.0015') ],
                            [ this.parseNumber ('1000000'), this.parseNumber ('0.0013') ],
                            [ this.parseNumber ('3000000'), this.parseNumber ('0.0010') ],
                            [ this.parseNumber ('15000000'), this.parseNumber ('0.0005') ],
                        ],
                        'maker': [
                            [ this.parseNumber ('0'), this.parseNumber ('0.003') ],
                            [ this.parseNumber ('10000'), this.parseNumber ('0.0011') ],
                            [ this.parseNumber ('100000'), this.parseNumber ('0.0010') ],
                            [ this.parseNumber ('250000'), this.parseNumber ('0.0008') ],
                            [ this.parseNumber ('500000'), this.parseNumber ('0.0005') ],
                            [ this.parseNumber ('1000000'), this.parseNumber ('0.0003') ],
                            [ this.parseNumber ('3000000'), this.parseNumber ('0.0002') ],
                            [ this.parseNumber ('15000000'), this.parseNumber ('0') ],
                        ],
                    },
                },
            },
            'options': {
                'withdraw': {
                    'fillResponsefromRequest': true,
                    'methods': {
                        'BTC': 'privatePostBitcoinWithdrawal',
                        'LTC': 'privatePostLitecoinWithdrawal',
                        'BCH': 'privatePostBitcoinCashWithdrawal',
                        'ETH': 'privatePostEthereumWithdrawal',
                        'XRP': 'privatePostRippleWithdrawal',
                        'DASH': 'privatePostDashWithdrawal',
                        'DAI': 'privatePostDaiWithdrawal',
                    },
                },
            },
            'exceptions': {
                'exact': {
                    'No order with given ID': OrderNotFound,
                },
                'broad': {
                    'Not enough account balance available': InsufficientFunds,
                    'Incorrect order ID': InvalidOrder,
                    'Minimum Order Size ': InvalidOrder,
                    'TOO MANY REQUESTS': RateLimitExceeded,
                    'Access denied.': AuthenticationError, // {"error":true,"errorMessage":"Access denied.","data":null}
                },
            },
        });
    }

    async fetchMarkets (params = {}) {
        /**
         * @method
         * @name coinmate#fetchMarkets
         * @description retrieves data on all markets for coinmate
         * @param {dict} params extra parameters specific to the exchange api endpoint
         * @returns {[dict]} an array of objects representing market data
         */
        const response = await this.publicGetTradingPairs (params);
        //
        //     {
        //         "error":false,
        //         "errorMessage":null,
        //         "data": [
        //             {
        //                 "name":"BTC_EUR",
        //                 "firstCurrency":"BTC",
        //                 "secondCurrency":"EUR",
        //                 "priceDecimals":2,
        //                 "lotDecimals":8,
        //                 "minAmount":0.0002,
        //                 "tradesWebSocketChannelId":"trades-BTC_EUR",
        //                 "orderBookWebSocketChannelId":"order_book-BTC_EUR",
        //                 "tradeStatisticsWebSocketChannelId":"statistics-BTC_EUR"
        //             },
        //         ]
        //     }
        //
        const data = this.safeValue (response, 'data');
        const result = [];
        for (let i = 0; i < data.length; i++) {
            const market = data[i];
            const id = this.safeString (market, 'name');
            const baseId = this.safeString (market, 'firstCurrency');
            const quoteId = this.safeString (market, 'secondCurrency');
            const base = this.safeCurrencyCode (baseId);
            const quote = this.safeCurrencyCode (quoteId);
            const symbol = base + '/' + quote;
            result.push ({
                'id': id,
                'symbol': symbol,
                'base': base,
                'quote': quote,
                'settle': undefined,
                'baseId': baseId,
                'quoteId': quoteId,
                'settleId': undefined,
                'type': 'spot',
                'spot': true,
                'margin': false,
                'swap': false,
                'future': false,
                'option': false,
                'active': undefined,
                'contract': false,
                'linear': undefined,
                'inverse': undefined,
                'contractSize': undefined,
                'expiry': undefined,
                'expiryDatetime': undefined,
                'strike': undefined,
                'optionType': undefined,
                'precision': {
                    'amount': this.safeInteger (market, 'lotDecimals'),
                    'price': this.safeInteger (market, 'priceDecimals'),
                },
                'limits': {
                    'leverage': {
                        'min': undefined,
                        'max': undefined,
                    },
                    'amount': {
                        'min': this.safeNumber (market, 'minAmount'),
                        'max': undefined,
                    },
                    'price': {
                        'min': undefined,
                        'max': undefined,
                    },
                    'cost': {
                        'min': undefined,
                        'max': undefined,
                    },
                },
                'info': market,
            });
        }
        return result;
    }

    parseBalance (response) {
        const balances = this.safeValue (response, 'data');
        const result = { 'info': response };
        const currencyIds = Object.keys (balances);
        for (let i = 0; i < currencyIds.length; i++) {
            const currencyId = currencyIds[i];
            const code = this.safeCurrencyCode (currencyId);
            const balance = this.safeValue (balances, currencyId);
            const account = this.account ();
            account['free'] = this.safeString (balance, 'available');
            account['used'] = this.safeString (balance, 'reserved');
            account['total'] = this.safeString (balance, 'balance');
            result[code] = account;
        }
        return this.safeBalance (result);
    }

    async fetchBalance (params = {}) {
        await this.loadMarkets ();
        const response = await this.privatePostBalances (params);
        return this.parseBalance (response);
    }

    async fetchOrderBook (symbol, limit = undefined, params = {}) {
        /**
         * @method
         * @name coinmate#fetchOrderBook
         * @description fetches information on open orders with bid (buy) and ask (sell) prices, volumes and other data
         * @param {str} symbol unified symbol of the market to fetch the order book for
         * @param {int|undefined} limit the maximum amount of order book entries to return
         * @param {dict} params extra parameters specific to the coinmate api endpoint
         * @returns {dict} A dictionary of [order book structures]{@link https://docs.ccxt.com/en/latest/manual.html#order-book-structure} indexed by market symbols
         */
        await this.loadMarkets ();
        const request = {
            'currencyPair': this.marketId (symbol),
            'groupByPriceLimit': 'False',
        };
        const response = await this.publicGetOrderBook (this.extend (request, params));
        const orderbook = response['data'];
        const timestamp = this.safeTimestamp (orderbook, 'timestamp');
        return this.parseOrderBook (orderbook, symbol, timestamp, 'bids', 'asks', 'price', 'amount');
    }

    async fetchTicker (symbol, params = {}) {
        /**
         * @method
         * @name coinmate#fetchTicker
         * @description fetches a price ticker, a statistical calculation with the information calculated over the past 24 hours for a specific market
         * @param {str} symbol unified symbol of the market to fetch the ticker for
         * @param {dict} params extra parameters specific to the coinmate api endpoint
         * @returns {dict} a [ticker structure]{@link https://docs.ccxt.com/en/latest/manual.html#ticker-structure}
         */
        await this.loadMarkets ();
        const request = {
            'currencyPair': this.marketId (symbol),
        };
        const response = await this.publicGetTicker (this.extend (request, params));
        const ticker = this.safeValue (response, 'data');
        const timestamp = this.safeTimestamp (ticker, 'timestamp');
        const last = this.safeNumber (ticker, 'last');
        return {
            'symbol': symbol,
            'timestamp': timestamp,
            'datetime': this.iso8601 (timestamp),
            'high': this.safeNumber (ticker, 'high'),
            'low': this.safeNumber (ticker, 'low'),
            'bid': this.safeNumber (ticker, 'bid'),
            'bidVolume': undefined,
            'ask': this.safeNumber (ticker, 'ask'),
            'vwap': undefined,
            'askVolume': undefined,
            'open': undefined,
            'close': last,
            'last': last,
            'previousClose': undefined,
            'change': undefined,
            'percentage': undefined,
            'average': undefined,
            'baseVolume': this.safeNumber (ticker, 'amount'),
            'quoteVolume': undefined,
            'info': ticker,
        };
    }

    async fetchTransactions (code = undefined, since = undefined, limit = undefined, params = {}) {
        await this.loadMarkets ();
        const request = {
            'limit': 1000,
        };
        if (limit !== undefined) {
            request['limit'] = limit;
        }
        if (since !== undefined) {
            request['timestampFrom'] = since;
        }
        if (code !== undefined) {
            const currency = this.currency (code);
            request['currency'] = currency['id'];
        }
        const response = await this.privatePostTransferHistory (this.extend (request, params));
        const items = response['data'];
        return this.parseTransactions (items, undefined, since, limit);
    }

    parseTransactionStatus (status) {
        const statuses = {
            'COMPLETED': 'ok',
            'WAITING': 'pending',
            'SENT': 'pending',
            'CREATED': 'pending',
            'OK': 'ok',
            'NEW': 'pending',
            'CANCELED': 'canceled',
        };
        return this.safeString (statuses, status, status);
    }

    parseTransaction (transaction, currency = undefined) {
        //
        // deposits
        //
        //     {
        //         transactionId: 1862815,
        //         timestamp: 1516803982388,
        //         amountCurrency: 'LTC',
        //         amount: 1,
        //         fee: 0,
        //         walletType: 'LTC',
        //         transferType: 'DEPOSIT',
        //         transferStatus: 'COMPLETED',
        //         txid:
        //         'ccb9255dfa874e6c28f1a64179769164025329d65e5201849c2400abd6bce245',
        //         destination: 'LQrtSKA6LnhcwRrEuiborQJnjFF56xqsFn',
        //         destinationTag: null
        //     }
        //
        // withdrawals
        //
        //     {
        //         transactionId: 2140966,
        //         timestamp: 1519314282976,
        //         amountCurrency: 'EUR',
        //         amount: 8421.7228,
        //         fee: 16.8772,
        //         walletType: 'BANK_WIRE',
        //         transferType: 'WITHDRAWAL',
        //         transferStatus: 'COMPLETED',
        //         txid: null,
        //         destination: null,
        //         destinationTag: null
        //     }
        //
        // withdraw
        //
        //     {
        //         "id": 2132583,
        //     }
        //
        const timestamp = this.safeInteger (transaction, 'timestamp');
        const amount = this.safeNumber (transaction, 'amount');
        const fee = this.safeNumber (transaction, 'fee');
        const txid = this.safeString (transaction, 'txid');
        const address = this.safeString (transaction, 'destination');
        const tag = this.safeString (transaction, 'destinationTag');
        const currencyId = this.safeString (transaction, 'amountCurrency');
        const code = this.safeCurrencyCode (currencyId, currency);
        const type = this.safeStringLower (transaction, 'transferType');
        const status = this.parseTransactionStatus (this.safeString (transaction, 'transferStatus'));
        const id = this.safeString2 (transaction, 'transactionId', 'id');
        const network = this.safeString (transaction, 'walletType');
        return {
            'id': id,
            'timestamp': timestamp,
            'datetime': this.iso8601 (timestamp),
            'currency': code,
            'amount': amount,
            'type': type,
            'txid': txid,
            'network': network,
            'address': address,
            'addressTo': undefined,
            'addressFrom': undefined,
            'tag': tag,
            'tagTo': undefined,
            'tagFrom': undefined,
            'status': status,
            'fee': {
                'cost': fee,
                'currency': code,
            },
            'info': transaction,
        };
    }

    async withdraw (code, amount, address, tag = undefined, params = {}) {
        [ tag, params ] = this.handleWithdrawTagAndParams (tag, params);
        this.checkAddress (address);
        await this.loadMarkets ();
        const currency = this.currency (code);
        const withdrawOptions = this.safeValue (this.options, 'withdraw', {});
        const methods = this.safeValue (withdrawOptions, 'methods', {});
        const method = this.safeString (methods, code);
        if (method === undefined) {
            const allowedCurrencies = Object.keys (methods);
            throw new ExchangeError (this.id + ' withdraw() only allows withdrawing the following currencies: ' + allowedCurrencies.join (', '));
        }
        const request = {
            'amount': this.currencyToPrecision (code, amount),
            'address': address,
        };
        if (tag !== undefined) {
            request['destinationTag'] = tag;
        }
        const response = await this[method] (this.extend (request, params));
        //
        //     {
        //         "error": false,
        //         "errorMessage": null,
        //         "data": {
        //             "id": "9e0a37fc-4ab4-4b9d-b9e7-c9c8f7c4c8e0"
        //         }
        //     }
        //
        const data = this.safeValue (response, 'data');
        const transaction = this.parseTransaction (data, currency);
        const fillResponseFromRequest = this.safeValue (withdrawOptions, 'fillResponseFromRequest', true);
        if (fillResponseFromRequest) {
            transaction['amount'] = amount;
            transaction['currency'] = code;
            transaction['address'] = address;
            transaction['tag'] = tag;
            transaction['type'] = 'withdrawal';
            transaction['status'] = 'pending';
        }
        return transaction;
    }

    async fetchMyTrades (symbol = undefined, since = undefined, limit = undefined, params = {}) {
        await this.loadMarkets ();
        if (limit === undefined) {
            limit = 1000;
        }
        const request = {
            'limit': limit,
        };
        if (symbol !== undefined) {
            const market = this.market (symbol);
            request['currencyPair'] = market['id'];
        }
        if (since !== undefined) {
            request['timestampFrom'] = since;
        }
        const response = await this.privatePostTradeHistory (this.extend (request, params));
        const data = this.safeValue (response, 'data', []);
        return this.parseTrades (data, undefined, since, limit);
    }

    parseTrade (trade, market = undefined) {
        //
        // fetchMyTrades (private)
        //
        //     {
        //         transactionId: 2671819,
        //         createdTimestamp: 1529649127605,
        //         currencyPair: 'LTC_BTC',
        //         type: 'BUY',
        //         orderType: 'LIMIT',
        //         orderId: 101810227,
        //         amount: 0.01,
        //         price: 0.01406,
        //         fee: 0,
        //         feeType: 'MAKER'
        //     }
        //
        // fetchTrades (public)
        //
        //     {
        //         "timestamp":1561598833416,
        //         "transactionId":"4156303",
        //         "price":10950.41,
        //         "amount":0.004,
        //         "currencyPair":"BTC_EUR",
        //         "tradeType":"BUY"
        //     }
        //
        const marketId = this.safeString (trade, 'currencyPair');
        market = this.safeMarket (marketId, market, '_');
        const priceString = this.safeString (trade, 'price');
        const amountString = this.safeString (trade, 'amount');
        const side = this.safeStringLower2 (trade, 'type', 'tradeType');
        const type = this.safeStringLower (trade, 'orderType');
        const orderId = this.safeString (trade, 'orderId');
        const id = this.safeString (trade, 'transactionId');
        const timestamp = this.safeInteger2 (trade, 'timestamp', 'createdTimestamp');
        let fee = undefined;
        const feeCostString = this.safeString (trade, 'fee');
        if (feeCostString !== undefined) {
            fee = {
                'cost': feeCostString,
                'currency': market['quote'],
            };
        }
        let takerOrMaker = this.safeString (trade, 'feeType');
        takerOrMaker = (takerOrMaker === 'MAKER') ? 'maker' : 'taker';
        return this.safeTrade ({
            'id': id,
            'info': trade,
            'timestamp': timestamp,
            'datetime': this.iso8601 (timestamp),
            'symbol': market['symbol'],
            'type': type,
            'side': side,
            'order': orderId,
            'takerOrMaker': takerOrMaker,
            'price': priceString,
            'amount': amountString,
            'cost': undefined,
            'fee': fee,
        }, market);
    }

    async fetchTrades (symbol, since = undefined, limit = undefined, params = {}) {
        await this.loadMarkets ();
        const market = this.market (symbol);
        const request = {
            'currencyPair': market['id'],
            'minutesIntoHistory': 10,
        };
        const response = await this.publicGetTransactions (this.extend (request, params));
        //
        //     {
        //         "error":false,
        //         "errorMessage":null,
        //         "data":[
        //             {
        //                 "timestamp":1561598833416,
        //                 "transactionId":"4156303",
        //                 "price":10950.41,
        //                 "amount":0.004,
        //                 "currencyPair":"BTC_EUR",
        //                 "tradeType":"BUY"
        //             }
        //         ]
        //     }
        //
        const data = this.safeValue (response, 'data', []);
        return this.parseTrades (data, market, since, limit);
    }

    async fetchTradingFee (symbol, params = {}) {
        await this.loadMarkets ();
        const market = this.market (symbol);
        const request = {
            'currencyPair': market['id'],
        };
        const response = await this.privatePostTraderFees (this.extend (request, params));
        //
        //     {
        //         error: false,
        //         errorMessage: null,
        //         data: { maker: '0.3', taker: '0.35', timestamp: '1646253217815' }
        //     }
        //
        const data = this.safeValue (response, 'data', {});
        const makerString = this.safeString (data, 'maker');
        const takerString = this.safeString (data, 'taker');
        const maker = this.parseNumber (Precise.stringDiv (makerString, '100'));
        const taker = this.parseNumber (Precise.stringDiv (takerString, '100'));
        return {
            'info': data,
            'symbol': symbol,
            'maker': maker,
            'taker': taker,
            'percentage': true,
            'tierBased': true,
        };
    }

    async fetchOpenOrders (symbol = undefined, since = undefined, limit = undefined, params = {}) {
        const response = await this.privatePostOpenOrders (this.extend ({}, params));
        const extension = { 'status': 'open' };
        return this.parseOrders (response['data'], undefined, since, limit, extension);
    }

    async fetchOrders (symbol = undefined, since = undefined, limit = undefined, params = {}) {
        if (symbol === undefined) {
            throw new ArgumentsRequired (this.id + ' fetchOrders() requires a symbol argument');
        }
        await this.loadMarkets ();
        const market = this.market (symbol);
        const request = {
            'currencyPair': market['id'],
        };
        // offset param that appears in other parts of the API doesn't appear to be supported here
        if (limit !== undefined) {
            request['limit'] = limit;
        }
        const response = await this.privatePostOrderHistory (this.extend (request, params));
        return this.parseOrders (response['data'], market, since, limit);
    }

    parseOrderStatus (status) {
        const statuses = {
            'FILLED': 'closed',
            'CANCELLED': 'canceled',
            'PARTIALLY_FILLED': 'open',
            'OPEN': 'open',
        };
        return this.safeString (statuses, status, status);
    }

    parseOrderType (type) {
        const types = {
            'LIMIT': 'limit',
            'MARKET': 'market',
        };
        return this.safeString (types, type, type);
    }

    parseOrder (order, market = undefined) {
        //
        // limit sell
        //
        //     {
        //         id: 781246605,
        //         timestamp: 1584480015133,
        //         trailingUpdatedTimestamp: null,
        //         type: 'SELL',
        //         currencyPair: 'ETH_BTC',
        //         price: 0.0345,
        //         amount: 0.01,
        //         stopPrice: null,
        //         originalStopPrice: null,
        //         marketPriceAtLastUpdate: null,
        //         marketPriceAtOrderCreation: null,
        //         orderTradeType: 'LIMIT',
        //         hidden: false,
        //         trailing: false,
        //         clientOrderId: null
        //     }
        //
        // limit buy
        //
        //     {
        //         id: 67527001,
        //         timestamp: 1517931722613,
        //         trailingUpdatedTimestamp: null,
        //         type: 'BUY',
        //         price: 5897.24,
        //         remainingAmount: 0.002367,
        //         originalAmount: 0.1,
        //         stopPrice: null,
        //         originalStopPrice: null,
        //         marketPriceAtLastUpdate: null,
        //         marketPriceAtOrderCreation: null,
        //         status: 'CANCELLED',
        //         orderTradeType: 'LIMIT',
        //         hidden: false,
        //         avgPrice: null,
        //         trailing: false,
        //     }
        //
        const id = this.safeString (order, 'id');
        const timestamp = this.safeInteger (order, 'timestamp');
        const side = this.safeStringLower (order, 'type');
        const priceString = this.safeString (order, 'price');
        const amountString = this.safeString (order, 'originalAmount');
        const remainingString = this.safeString2 (order, 'remainingAmount', 'amount');
        const status = this.parseOrderStatus (this.safeString (order, 'status'));
        const type = this.parseOrderType (this.safeString (order, 'orderTradeType'));
        const averageString = this.safeString (order, 'avgPrice');
        const marketId = this.safeString (order, 'currencyPair');
        const symbol = this.safeSymbol (marketId, market, '_');
        const clientOrderId = this.safeString (order, 'clientOrderId');
        const stopPrice = this.safeNumber (order, 'stopPrice');
        return this.safeOrder ({
            'id': id,
            'clientOrderId': clientOrderId,
            'timestamp': timestamp,
            'datetime': this.iso8601 (timestamp),
            'lastTradeTimestamp': undefined,
            'symbol': symbol,
            'type': type,
            'timeInForce': undefined,
            'postOnly': undefined,
            'side': side,
            'price': priceString,
            'stopPrice': stopPrice,
            'amount': amountString,
            'cost': undefined,
            'average': averageString,
            'filled': undefined,
            'remaining': remainingString,
            'status': status,
            'trades': undefined,
            'info': order,
            'fee': undefined,
        }, market);
    }

    async createOrder (symbol, type, side, amount, price = undefined, params = {}) {
        await this.loadMarkets ();
        let method = 'privatePost' + this.capitalize (side);
        const request = {
            'currencyPair': this.marketId (symbol),
        };
        if (type === 'market') {
            if (side === 'buy') {
                request['total'] = this.amountToPrecision (symbol, amount); // amount in fiat
            } else {
                request['amount'] = this.amountToPrecision (symbol, amount); // amount in fiat
            }
            method += 'Instant';
        } else {
            request['amount'] = this.amountToPrecision (symbol, amount); // amount in crypto
            request['price'] = this.priceToPrecision (symbol, price);
            method += this.capitalize (type);
        }
        const response = await this[method] (this.extend (request, params));
        const id = this.safeString (response, 'data');
        return {
            'info': response,
            'id': id,
        };
    }

    async fetchOrder (id, symbol = undefined, params = {}) {
        await this.loadMarkets ();
        const request = {
            'orderId': id,
        };
        let market = undefined;
        if (symbol) {
            market = this.market (symbol);
        }
        const response = await this.privatePostOrderById (this.extend (request, params));
        const data = this.safeValue (response, 'data');
        return this.parseOrder (data, market);
    }

    async cancelOrder (id, symbol = undefined, params = {}) {
        //   {"error":false,"errorMessage":null,"data":{"success":true,"remainingAmount":0.01}}
        const request = { 'orderId': id };
        const response = await this.privatePostCancelOrderWithInfo (this.extend (request, params));
        return {
            'info': response,
        };
    }

    nonce () {
        return this.milliseconds ();
    }

    sign (path, api = 'public', method = 'GET', params = {}, headers = undefined, body = undefined) {
        let url = this.urls['api'] + '/' + path;
        if (api === 'public') {
            if (Object.keys (params).length) {
                url += '?' + this.urlencode (params);
            }
        } else {
            this.checkRequiredCredentials ();
            const nonce = this.nonce ().toString ();
            const auth = nonce + this.uid + this.apiKey;
            const signature = this.hmac (this.encode (auth), this.encode (this.secret));
            body = this.urlencode (this.extend ({
                'clientId': this.uid,
                'nonce': nonce,
                'publicKey': this.apiKey,
                'signature': signature.toUpperCase (),
            }, params));
            headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
            };
        }
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    }

    handleErrors (code, reason, url, method, headers, body, response, requestHeaders, requestBody) {
        if (response !== undefined) {
            if ('error' in response) {
                // {"error":true,"errorMessage":"Minimum Order Size 0.01 ETH","data":null}
                if (response['error']) {
                    const message = this.safeString (response, 'errorMessage');
                    const feedback = this.id + ' ' + message;
                    this.throwExactlyMatchedException (this.exceptions['exact'], message, feedback);
                    this.throwBroadlyMatchedException (this.exceptions['broad'], message, feedback);
                    throw new ExchangeError (this.id + ' ' + this.json (response));
                }
            }
        }
        if (code > 400) {
            if (body) {
                const feedback = this.id + ' ' + body;
                this.throwExactlyMatchedException (this.exceptions['exact'], body, feedback);
                this.throwBroadlyMatchedException (this.exceptions['broad'], body, feedback);
                throw new ExchangeError (feedback); // unknown message
            }
            throw new ExchangeError (this.id + ' ' + body);
        }
    }
};
