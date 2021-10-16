<?php

namespace ccxt;

// PLEASE DO NOT EDIT THIS FILE, IT IS GENERATED AND WILL BE OVERWRITTEN:
// https://github.com/ccxt/ccxt/blob/master/CONTRIBUTING.md#how-to-contribute-code

use Exception; // a common import
use \ccxt\ExchangeError;
use \ccxt\ArgumentsRequired;

class bitbns extends Exchange {

    public function describe() {
        return $this->deep_extend(parent::describe (), array(
            'id' => 'bitbns',
            'name' => 'Bitbns',
            'countries' => array( 'IN' ), // India
            'rateLimit' => 1000,
            'certified' => false,
            'pro' => false,
            // new metainfo interface
            'has' => array(
                'cancelOrder' => true,
                'createOrder' => true,
                'fetchBalance' => true,
                'fetchDepositAddress' => true,
                'fetchDeposits' => true,
                'fetchMarkets' => true,
                'fetchMyTrades' => true,
                'fetchOHLCV' => null,
                'fetchOpenOrders' => true,
                'fetchOrder' => true,
                'fetchOrderBook' => true,
                'fetchStatus' => true,
                'fetchTicker' => 'emulated',
                'fetchTickers' => true,
                'fetchTrades' => null,
                'fetchWithdrawals' => true,
            ),
            'timeframes' => array(
            ),
            'urls' => array(
                'logo' => 'https://user-images.githubusercontent.com/1294454/117201933-e7a6e780-adf5-11eb-9d80-98fc2a21c3d6.jpg',
                'api' => array(
                    'ccxt' => 'https://bitbns.com/order',
                    'v1' => 'https://api.bitbns.com/api/trade/v1',
                    'v2' => 'https://api.bitbns.com/api/trade/v2',
                ),
                'www' => 'https://bitbns.com',
                'referral' => 'https://ref.bitbns.com/1090961',
                'doc' => array(
                    'https://bitbns.com/trade/#/api-trading/',
                ),
                'fees' => 'https://bitbns.com/fees',
            ),
            'api' => array(
                'ccxt' => array(
                    'get' => array(
                        'fetchMarkets',
                        'fetchTickers',
                        'fetchOrderbook',
                    ),
                ),
                'v1' => array(
                    'get' => array(
                        'platform/status',
                        'tickers',
                        'orderbook/sell/{symbol}',
                        'orderbook/buy/{symbol}',
                    ),
                    'post' => array(
                        'currentCoinBalance/EVERYTHING',
                        'getApiUsageStatus/USAGE',
                        'getOrderSocketToken/USAGE',
                        'currentCoinBalance/{symbol}',
                        'orderStatus/{symbol}',
                        'depositHistory/{symbol}',
                        'withdrawHistory/{symbol}',
                        'listOpenOrders/{symbol}',
                        'listOpenStopOrders/{symbol}',
                        'getCoinAddress/{symbol}',
                        'placeSellOrder/{symbol}',
                        'placeBuyOrder/{symbol}',
                        'buyStopLoss/{symbol}',
                        'placeSellOrder/{symbol}',
                        'cancelOrder/{symbol}',
                        'cancelStopLossOrder/{symbol}',
                        'listExecutedOrders/{symbol}',
                        'placeMarketOrder/{symbol}',
                        'placeMarketOrderQnty/{symbol}',
                    ),
                ),
                'v2' => array(
                    'post' => array(
                        'orders',
                        'cancel',
                        'getordersnew',
                        'marginOrders',
                    ),
                ),
            ),
            'fees' => array(
                'trading' => array(
                    'feeSide' => 'quote',
                    'tierBased' => false,
                    'percentage' => true,
                    'taker' => $this->parse_number('0.0025'),
                    'maker' => $this->parse_number('0.0025'),
                ),
            ),
            'exceptions' => array(
                'exact' => array(
                    '400' => '\\ccxt\\BadRequest', // array("msg":"Invalid Request","status":-1,"code":400)
                    '409' => '\\ccxt\\BadSymbol', // array("data":"","status":0,"error":"coin name not supplied or not yet supported","code":409)
                    '416' => '\\ccxt\\InsufficientFunds', // array("data":"Oops ! Not sufficient currency to sell","status":0,"error":null,"code":416)
                    '417' => '\\ccxt\\OrderNotFound', // array("data":array(),"status":0,"error":"Nothing to show","code":417)
                ),
                'broad' => array(),
            ),
        ));
    }

    public function fetch_status($params = array ()) {
        $response = $this->v1GetPlatformStatus ($params);
        //
        //     {
        //         "data":array(
        //             "BTC":array("$status":1),
        //             "ETH":array("$status":1),
        //             "XRP":array("$status":1),
        //         ),
        //         "$status":1,
        //         "error":null,
        //         "code":200
        //     }
        //
        $status = $this->safe_string($response, 'status');
        if ($status !== null) {
            $status = ($status === '1') ? 'ok' : 'maintenance';
            $this->status = array_merge($this->status, array(
                'status' => $status,
                'updated' => $this->milliseconds(),
            ));
        }
        return $this->status;
    }

    public function fetch_markets($params = array ()) {
        $response = $this->ccxtGetFetchMarkets ($params);
        //
        //     array(
        //         array(
        //             "$id":"BTC",
        //             "$symbol":"BTC/INR",
        //             "$base":"BTC",
        //             "$quote":"INR",
        //             "$baseId":"BTC",
        //             "$quoteId":"",
        //             "active":true,
        //             "limits":array(
        //                 "amount":array("min":"0.00017376","max":20),
        //                 "price":array("min":2762353.2359999996,"max":6445490.883999999),
        //                 "cost":array("min":800,"max":128909817.67999998)
        //             ),
        //             "$precision":array(
        //                 "amount":8,
        //                 "price":2
        //             ),
        //             "info":array()
        //         ),
        //     )
        //
        $result = array();
        for ($i = 0; $i < count($response); $i++) {
            $market = $response[$i];
            $id = $this->safe_string($market, 'id');
            $baseId = $this->safe_string($market, 'base');
            $quoteId = $this->safe_string($market, 'quote');
            $base = $this->safe_currency_code($baseId);
            $quote = $this->safe_currency_code($quoteId);
            $symbol = $base . '/' . $quote;
            $marketPrecision = $this->safe_value($market, 'precision', array());
            $precision = array(
                'amount' => $this->safe_integer($marketPrecision, 'amount'),
                'price' => $this->safe_integer($marketPrecision, 'price'),
            );
            $marketLimits = $this->safe_value($market, 'limits', array());
            $amountLimits = $this->safe_value($marketLimits, 'amount', array());
            $priceLimits = $this->safe_value($marketLimits, 'price', array());
            $costLimits = $this->safe_value($marketLimits, 'cost', array());
            $usdt = ($quoteId === 'USDT');
            // INR markets don't need a _INR prefix
            $uppercaseId = $usdt ? ($baseId . '_' . $quoteId) : $baseId;
            $result[] = array(
                'id' => $id,
                'uppercaseId' => $uppercaseId,
                'symbol' => $symbol,
                'base' => $base,
                'quote' => $quote,
                'baseId' => $baseId,
                'quoteId' => $quoteId,
                'info' => $market,
                'active' => null,
                'precision' => $precision,
                'limits' => array(
                    'amount' => array(
                        'min' => $this->safe_number($amountLimits, 'min'),
                        'max' => $this->safe_number($amountLimits, 'max'),
                    ),
                    'price' => array(
                        'min' => $this->safe_number($priceLimits, 'min'),
                        'max' => $this->safe_number($priceLimits, 'max'),
                    ),
                    'cost' => array(
                        'min' => $this->safe_number($costLimits, 'min'),
                        'max' => $this->safe_number($costLimits, 'max'),
                    ),
                ),
            );
        }
        return $result;
    }

    public function fetch_order_book($symbol, $limit = null, $params = array ()) {
        $this->load_markets();
        $market = $this->market($symbol);
        $request = array(
            'symbol' => $market['id'],
        );
        if ($limit !== null) {
            $request['limit'] = $limit; // default 100, max 5000, see https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#order-book
        }
        $response = $this->ccxtGetFetchOrderbook (array_merge($request, $params));
        //
        //     {
        //         "bids":[
        //             [49352.04,0.843948],
        //             [49352.03,0.742048],
        //             [49349.78,0.686239],
        //         ],
        //         "asks":[
        //             [49443.59,0.065137],
        //             [49444.63,0.098211],
        //             [49449.01,0.066309],
        //         ],
        //         "$timestamp":1619172786577,
        //         "datetime":"2021-04-23T10:13:06.577Z",
        //         "nonce":""
        //     }
        //
        $timestamp = $this->safe_integer($response, 'timestamp');
        return $this->parse_order_book($response, $timestamp);
    }

    public function parse_ticker($ticker, $market = null) {
        //
        //     {
        //         "$symbol":"BTC/INR",
        //         "info":array(
        //             "highest_buy_bid":4368494.31,
        //             "lowest_sell_bid":4374835.09,
        //             "last_traded_price":4374835.09,
        //             "yes_price":4531016.27,
        //             "volume":array("max":"4569119.23","min":"4254552.13","volume":62.17722344)
        //         ),
        //         "$timestamp":1619100020845,
        //         "datetime":1619100020845,
        //         "high":"4569119.23",
        //         "low":"4254552.13",
        //         "bid":4368494.31,
        //         "bidVolume":"",
        //         "ask":4374835.09,
        //         "askVolume":"",
        //         "vwap":"",
        //         "open":4531016.27,
        //         "close":4374835.09,
        //         "$last":4374835.09,
        //         "baseVolume":62.17722344,
        //         "quoteVolume":"",
        //         "previousClose":"",
        //         "change":-156181.1799999997,
        //         "percentage":-3.446934874943623,
        //         "average":4452925.68
        //     }
        //
        $timestamp = $this->safe_integer($ticker, 'timestamp');
        $marketId = $this->safe_string($ticker, 'symbol');
        $symbol = $this->safe_symbol($marketId, $market);
        $last = $this->safe_number($ticker, 'last');
        return $this->safe_ticker(array(
            'symbol' => $symbol,
            'timestamp' => $timestamp,
            'datetime' => $this->iso8601($timestamp),
            'high' => $this->safe_number($ticker, 'high'),
            'low' => $this->safe_number($ticker, 'low'),
            'bid' => $this->safe_number($ticker, 'bid'),
            'bidVolume' => $this->safe_number($ticker, 'bidVolume'),
            'ask' => $this->safe_number($ticker, 'ask'),
            'askVolume' => $this->safe_number($ticker, 'askVolume'),
            'vwap' => $this->safe_number($ticker, 'vwap'),
            'open' => $this->safe_number($ticker, 'open'),
            'close' => $last,
            'last' => $last,
            'previousClose' => $this->safe_number($ticker, 'previousClose'), // previous day close
            'change' => $this->safe_number($ticker, 'change'),
            'percentage' => $this->safe_number($ticker, 'percentage'),
            'average' => $this->safe_number($ticker, 'average'),
            'baseVolume' => $this->safe_number($ticker, 'baseVolume'),
            'quoteVolume' => $this->safe_number($ticker, 'quoteVolume'),
            'info' => $ticker,
        ), $market);
    }

    public function fetch_tickers($symbols = null, $params = array ()) {
        $this->load_markets();
        $response = $this->ccxtGetFetchTickers ($params);
        //
        //     {
        //         "BTC/INR":{
        //             "symbol":"BTC/INR",
        //             "info":array(
        //                 "highest_buy_bid":4368494.31,
        //                 "lowest_sell_bid":4374835.09,
        //                 "last_traded_price":4374835.09,
        //                 "yes_price":4531016.27,
        //                 "volume":array("max":"4569119.23","min":"4254552.13","volume":62.17722344)
        //             ),
        //             "timestamp":1619100020845,
        //             "datetime":1619100020845,
        //             "high":"4569119.23",
        //             "low":"4254552.13",
        //             "bid":4368494.31,
        //             "bidVolume":"",
        //             "ask":4374835.09,
        //             "askVolume":"",
        //             "vwap":"",
        //             "open":4531016.27,
        //             "close":4374835.09,
        //             "last":4374835.09,
        //             "baseVolume":62.17722344,
        //             "quoteVolume":"",
        //             "previousClose":"",
        //             "change":-156181.1799999997,
        //             "percentage":-3.446934874943623,
        //             "average":4452925.68
        //         }
        //     }
        //
        return $this->parse_tickers($response, $symbols);
    }

    public function fetch_balance($params = array ()) {
        $this->load_markets();
        $response = $this->v1PostCurrentCoinBalanceEVERYTHING ($params);
        //
        //     {
        //         "$data":array(
        //             "availableorderMoney":0,
        //             "availableorderBTC":0,
        //             "availableorderXRP":0,
        //             "inorderMoney":0,
        //             "inorderBTC":0,
        //             "inorderXRP":0,
        //             "inorderNEO":0,
        //         ),
        //         "status":1,
        //         "error":null,
        //         "$code":200
        //     }
        //
        $timestamp = null;
        $result = array(
            'info' => $response,
            'timestamp' => $timestamp,
            'datetime' => $this->iso8601($timestamp),
        );
        $data = $this->safe_value($response, 'data', array());
        $keys = is_array($data) ? array_keys($data) : array();
        for ($i = 0; $i < count($keys); $i++) {
            $key = $keys[$i];
            $parts = explode('availableorder', $key);
            $numParts = is_array($parts) ? count($parts) : 0;
            if ($numParts > 1) {
                $currencyId = $this->safe_string($parts, 1);
                if ($currencyId !== 'Money') {
                    $code = $this->safe_currency_code($currencyId);
                    $account = $this->account();
                    $account['free'] = $this->safe_string($data, $key);
                    $account['used'] = $this->safe_string($data, 'inorder' . $currencyId);
                    $result[$code] = $account;
                }
            }
        }
        return $this->parse_balance($result);
    }

    public function parse_order_status($status) {
        $statuses = array(
            '0' => 'open',
            // 'PARTIALLY_FILLED' => 'open',
            // 'FILLED' => 'closed',
            // 'CANCELED' => 'canceled',
            // 'PENDING_CANCEL' => 'canceling', // currently unused
            // 'REJECTED' => 'rejected',
            // 'EXPIRED' => 'expired',
        );
        return $this->safe_string($statuses, $status, $status);
    }

    public function parse_order($order, $market = null) {
        //
        // createOrder
        //
        //     {
        //         "data":"Successfully placed bid to purchase currency",
        //         "$status":1,
        //         "error":null,
        //         "$id":5424475,
        //         "code":200
        //     }
        //
        // fetchOrder
        //
        //     {
        //         "entry_id":5424475,
        //         "btc":0.01,
        //         "rate":2000,
        //         "time":"2021-04-25T17:05:42.000Z",
        //         "$type":0,
        //         "$status":0,
        //         "total":0.01,
        //         "avg_cost":null,
        //         "$side":"BUY",
        //         "$amount":0.01,
        //         "$remaining":0.01,
        //         "$filled":0,
        //         "$cost":null,
        //         "$fee":0.05
        //     }
        //
        // fetchOpenOrders
        //
        //     {
        //         "entry_id":5424475,
        //         "btc":0.01,
        //         "rate":2000,
        //         "time":"2021-04-25T17:05:42.000Z",
        //         "$type":0,
        //         "$status":0
        //     }
        //
        $id = $this->safe_string_2($order, 'id', 'entry_id');
        $marketId = $this->safe_string($order, 'symbol');
        $symbol = $this->safe_symbol($marketId, $market);
        $timestamp = $this->parse8601($this->safe_string($order, 'time'));
        $price = $this->safe_number($order, 'rate');
        $amount = $this->safe_number_2($order, 'amount', 'btc');
        $filled = $this->safe_number($order, 'filled');
        $remaining = $this->safe_number($order, 'remaining');
        $average = $this->safe_number($order, 'avg_cost');
        $cost = $this->safe_number($order, 'cost');
        $type = $this->safe_string_lower($order, 'type');
        if ($type === '0') {
            $type = 'limit';
        }
        $status = $this->parse_order_status($this->safe_string($order, 'status'));
        $side = $this->safe_string_lower($order, 'side');
        $feeCost = $this->safe_number($order, 'fee');
        $fee = null;
        if ($feeCost !== null) {
            $feeCurrencyCode = null;
            $fee = array(
                'cost' => $feeCost,
                'currency' => $feeCurrencyCode,
            );
        }
        return $this->safe_order(array(
            'info' => $order,
            'id' => $id,
            'clientOrderId' => null,
            'timestamp' => $timestamp,
            'datetime' => $this->iso8601($timestamp),
            'lastTradeTimestamp' => null,
            'symbol' => $symbol,
            'type' => $type,
            'timeInForce' => null,
            'postOnly' => null,
            'side' => $side,
            'price' => $price,
            'stopPrice' => null,
            'amount' => $amount,
            'cost' => $cost,
            'average' => $average,
            'filled' => $filled,
            'remaining' => $remaining,
            'status' => $status,
            'fee' => $fee,
            'trades' => null,
        ));
    }

    public function create_order($symbol, $type, $side, $amount, $price = null, $params = array ()) {
        if ($type !== 'limit' && $type !== 'market') {
            throw new ExchangeError($this->id . ' allows limit and $market orders only');
        }
        $this->load_markets();
        $market = $this->market($symbol);
        $request = array(
            'side' => strtoupper($side),
            'symbol' => $market['uppercaseId'],
            'quantity' => $this->amount_to_precision($symbol, $amount),
            // 'target_rate' => $this->price_to_precision($symbol, targetRate),
            // 't_rate' => $this->price_to_precision($symbol, stopPrice),
            // 'trail_rate' => $this->price_to_precision($symbol, trailRate),
            // To Place Simple Buy or Sell Order use rate
            // To Place Stoploss Buy or Sell Order use rate & t_rate
            // To Place Bracket Buy or Sell Order use rate , t_rate, target_rate & trail_rate
        );
        if ($type === 'limit') {
            $request['rate'] = $this->price_to_precision($symbol, $price);
            $response = $this->v2PostOrders (array_merge($request, $params));
            return $this->parse_order($response, $market);
        } else if ($type === 'market') {
            $request['market'] = $market['quoteId'];
            $response = $this->v1PostPlaceMarketOrderQntySymbol (array_merge($request, $params));
            return $this->parse_order($response, $market);
        } else {
            throw new ExchangeError($this->id . ' allows limit and $market orders only');
        }
        //
        //     {
        //         "data":"Successfully placed bid to purchase currency",
        //         "status":1,
        //         "error":null,
        //         "id":5424475,
        //         "code":200
        //     }
        //
    }

    public function cancel_order($id, $symbol = null, $params = array ()) {
        if ($symbol === null) {
            throw new ArgumentsRequired($this->id . ' cancelOrder() requires a $symbol argument');
        }
        $this->load_markets();
        $market = $this->market($symbol);
        $quoteSide = ($market['quoteId'] === 'USDT') ? 'usdtcancelOrder' : 'cancelOrder';
        $request = array(
            'entry_id' => $id,
            'symbol' => $market['uppercaseId'],
            'side' => $quoteSide,
        );
        $response = $this->v2PostCancel (array_merge($request, $params));
        return $this->parse_order($response, $market);
    }

    public function fetch_order($id, $symbol = null, $params = array ()) {
        if ($symbol === null) {
            throw new ArgumentsRequired($this->id . ' fetchOrder() requires a $symbol argument');
        }
        $this->load_markets();
        $market = $this->market($symbol);
        $request = array(
            'symbol' => $market['id'],
            'entry_id' => $id,
        );
        $response = $this->v1PostOrderStatusSymbol (array_merge($request, $params));
        //
        //     {
        //         "$data":array(
        //             {
        //                 "entry_id":5424475,
        //                 "btc":0.01,
        //                 "rate":2000,
        //                 "time":"2021-04-25T17:05:42.000Z",
        //                 "type":0,
        //                 "status":0,
        //                 "total":0.01,
        //                 "avg_cost":null,
        //                 "side":"BUY",
        //                 "amount":0.01,
        //                 "remaining":0.01,
        //                 "filled":0,
        //                 "cost":null,
        //                 "fee":0.05
        //             }
        //         ),
        //         "status":1,
        //         "error":null,
        //         "code":200
        //     }
        //
        $data = $this->safe_value($response, 'data', array());
        $first = $this->safe_value($data, 0);
        return $this->parse_order($first, $market);
    }

    public function fetch_open_orders($symbol = null, $since = null, $limit = null, $params = array ()) {
        if ($symbol === null) {
            throw new ArgumentsRequired($this->id . ' fetchOrders() requires a $symbol argument');
        }
        $this->load_markets();
        $market = $this->market($symbol);
        $quoteSide = ($market['quoteId'] === 'USDT') ? 'usdtListOpenOrders' : 'listOpenOrders';
        $request = array(
            'symbol' => $market['uppercaseId'],
            'side' => $quoteSide,
            'page' => 0,
        );
        $response = $this->v2PostGetordersnew (array_merge($request, $params));
        //
        //     {
        //         "$data":array(
        //             {
        //                 "entry_id":5424475,
        //                 "btc":0.01,
        //                 "rate":2000,
        //                 "time":"2021-04-25T17:05:42.000Z",
        //                 "type":0,
        //                 "status":0
        //             }
        //         ),
        //         "status":1,
        //         "error":null,
        //         "code":200
        //     }
        //
        $data = $this->safe_value($response, 'data', array());
        return $this->parse_orders($data, $market, $since, $limit);
    }

    public function parse_trade($trade, $market = null) {
        //
        // fetchMyTrades
        //
        //     {
        //         "type" => "BTC Sell order executed",
        //         "typeI" => 6,
        //         "crypto" => 5000,
        //         "$amount" => 35.4,
        //         "rate" => 709800,
        //         "date" => "2020-05-22T15:05:34.000Z",
        //         "unit" => "INR",
        //         "$factor" => 100000000,
        //         "$fee" => 0.09,
        //         "delh_btc" => -5000,
        //         "delh_inr" => 0,
        //         "del_btc" => 0,
        //         "del_inr" => 35.4,
        //         "id" => "2938823"
        //     }
        //
        $market = $this->safe_market(null, $market);
        $orderId = $this->safe_string($trade, 'id');
        $timestamp = $this->parse8601($this->safe_string($trade, 'date'));
        $amountString = $this->safe_string($trade, 'amount');
        $priceString = $this->safe_string($trade, 'rate');
        $price = $this->parse_number($priceString);
        $factor = $this->safe_string($trade, 'factor');
        $amountScaled = Precise::string_div($amountString, $factor);
        $amount = $this->parse_number($amountScaled);
        $cost = $this->parse_number(Precise::string_mul($priceString, $amountScaled));
        $symbol = $market['symbol'];
        $side = $this->safe_string_lower($trade, 'type');
        if (mb_strpos($side, 'sell') !== false) {
            $side = 'sell';
        } else if (mb_strpos($side, 'buy') !== false) {
            $side = 'buy';
        }
        $fee = null;
        $feeCost = $this->safe_number($trade, 'fee');
        if ($feeCost !== null) {
            $feeCurrencyCode = $market['quote'];
            $fee = array(
                'cost' => $feeCost,
                'currency' => $feeCurrencyCode,
            );
        }
        return array(
            'info' => $trade,
            'timestamp' => $timestamp,
            'datetime' => $this->iso8601($timestamp),
            'symbol' => $symbol,
            'id' => null,
            'order' => $orderId,
            'type' => null,
            'side' => $side,
            'takerOrMaker' => null,
            'price' => $price,
            'amount' => $amount,
            'cost' => $cost,
            'fee' => $fee,
        );
    }

    public function fetch_my_trades($symbol = null, $since = null, $limit = null, $params = array ()) {
        if ($symbol === null) {
            throw new ArgumentsRequired($this->id . ' fetchOrders() requires a $symbol argument');
        }
        $this->load_markets();
        $market = $this->market($symbol);
        $request = array(
            'symbol' => $market['id'],
            'page' => 0,
        );
        if ($since !== null) {
            $request['since'] = $this->iso8601($since);
        }
        $response = $this->v1PostListExecutedOrdersSymbol (array_merge($request, $params));
        //
        //     {
        //         "$data" => array(
        //             array(
        //                 "type" => "BTC Sell order executed",
        //                 "typeI" => 6,
        //                 "crypto" => 5000,
        //                 "amount" => 35.4,
        //                 "rate" => 709800,
        //                 "date" => "2020-05-22T15:05:34.000Z",
        //                 "unit" => "INR",
        //                 "factor" => 100000000,
        //                 "fee" => 0.09,
        //                 "delh_btc" => -5000,
        //                 "delh_inr" => 0,
        //                 "del_btc" => 0,
        //                 "del_inr" => 35.4,
        //                 "id" => "2938823"
        //             ),
        //             {
        //                 "type" => "BTC Sell order executed",
        //                 "typeI" => 6,
        //                 "crypto" => 195000,
        //                 "amount" => 1380.58,
        //                 "rate" => 709765.5,
        //                 "date" => "2020-05-22T15:05:34.000Z",
        //                 "unit" => "INR",
        //                 "factor" => 100000000,
        //                 "fee" => 3.47,
        //                 "delh_btc" => -195000,
        //                 "delh_inr" => 0,
        //                 "del_btc" => 0,
        //                 "del_inr" => 1380.58,
        //                 "id" => "2938823"
        //             }
        //         ),
        //         "status" => 1,
        //         "error" => null,
        //         "code" => 200
        //     }
        //
        $data = $this->safe_value($response, 'data', array());
        return $this->parse_trades($data, $market, $since, $limit);
    }

    public function fetch_deposits($code = null, $since = null, $limit = null, $params = array ()) {
        if ($code === null) {
            throw new ArgumentsRequired($this->id . ' fetchDeposits() requires a $currency $code argument');
        }
        $this->load_markets();
        $currency = $this->currency($code);
        $request = array(
            'symbol' => $currency['id'],
            'page' => 0,
        );
        $response = $this->v1PostDepositHistorySymbol (array_merge($request, $params));
        //
        //     {
        //         "$data":array(
        //             {
        //                 "type":"USDT deposited",
        //                 "typeI":1,
        //                 "amount":100,
        //                 "date":"2021-04-24T14:56:04.000Z",
        //                 "unit":"USDT",
        //                 "factor":100,
        //                 "fee":0,
        //                 "delh_btc":0,
        //                 "delh_inr":0,
        //                 "rate":0,
        //                 "del_btc":10000,
        //                 "del_inr":0
        //             }
        //         ),
        //         "status":1,
        //         "error":null,
        //         "$code":200
        //     }
        //
        $data = $this->safe_value($response, 'data', array());
        return $this->parse_transactions($data, $currency, $since, $limit);
    }

    public function fetch_withdrawals($code = null, $since = null, $limit = null, $params = array ()) {
        if ($code === null) {
            throw new ArgumentsRequired($this->id . ' fetchWithdrawals() requires a $currency $code argument');
        }
        $this->load_markets();
        $currency = $this->currency($code);
        $request = array(
            'symbol' => $currency['id'],
            'page' => 0,
        );
        $response = $this->v1PostWithdrawHistorySymbol (array_merge($request, $params));
        //
        //     ...
        //
        $data = $this->safe_value($response, 'data', array());
        return $this->parse_transactions($data, $currency, $since, $limit);
    }

    public function parse_transaction_status_by_type($status, $type = null) {
        $statusesByType = array(
            'deposit' => array(
                '0' => 'pending',
                '1' => 'ok',
            ),
            'withdrawal' => array(
                '0' => 'pending', // Email Sent
                '1' => 'canceled', // Cancelled (different from 1 = ok in deposits)
                '2' => 'pending', // Awaiting Approval
                '3' => 'failed', // Rejected
                '4' => 'pending', // Processing
                '5' => 'failed', // Failure
                '6' => 'ok', // Completed
            ),
        );
        $statuses = $this->safe_value($statusesByType, $type, array());
        return $this->safe_string($statuses, $status, $status);
    }

    public function parse_transaction($transaction, $currency = null) {
        //
        // fetchDeposits
        //
        //     {
        //         "$type":"USDT deposited",
        //         "typeI":1,
        //         "$amount":100,
        //         "date":"2021-04-24T14:56:04.000Z",
        //         "unit":"USDT",
        //         "factor":100,
        //         "$fee":0,
        //         "delh_btc":0,
        //         "delh_inr":0,
        //         "rate":0,
        //         "del_btc":10000,
        //         "del_inr":0
        //     }
        //
        // fetchWithdrawals
        //
        //     ...
        //
        $currencyId = $this->safe_string($transaction, 'unit');
        $code = $this->safe_currency_code($currencyId, $currency);
        $timestamp = $this->parse8601($this->safe_string($transaction, 'date'));
        $type = $this->safe_string($transaction, 'type');
        $status = null;
        if ($type !== null) {
            if (mb_strpos($type, 'deposit') !== false) {
                $type = 'deposit';
                $status = 'ok';
            } else if (mb_strpos($type, 'withdraw') !== false) {
                $type = 'withdrawal';
            }
        }
        // $status = $this->parse_transaction_status_by_type($this->safe_string($transaction, 'status'), $type);
        $amount = $this->safe_number($transaction, 'amount');
        $feeCost = $this->safe_number($transaction, 'fee');
        $fee = null;
        if ($feeCost !== null) {
            $fee = array( 'currency' => $code, 'cost' => $feeCost );
        }
        return array(
            'info' => $transaction,
            'id' => null,
            'txid' => null,
            'timestamp' => $timestamp,
            'datetime' => $this->iso8601($timestamp),
            'address' => null,
            'addressTo' => null,
            'addressFrom' => null,
            'tag' => null,
            'tagTo' => null,
            'tagFrom' => null,
            'type' => $type,
            'amount' => $amount,
            'currency' => $code,
            'status' => $status,
            'updated' => null,
            'internal' => null,
            'fee' => $fee,
        );
    }

    public function fetch_deposit_address($code, $params = array ()) {
        $this->load_markets();
        $currency = $this->currency($code);
        $request = array(
            'symbol' => $currency['id'],
        );
        $response = $this->v1PostGetCoinAddressSymbol (array_merge($request, $params));
        //
        //     {
        //         "$data":array(
        //             "token":"0x680dee9edfff0c397736e10b017cf6a0aee4ba31",
        //             "expiry":"2022-04-24 22:30:11"
        //         ),
        //         "status":1,
        //         "error":null
        //     }
        //
        $data = $this->safe_value($response, 'data', array());
        $address = $this->safe_string($data, 'token');
        $tag = $this->safe_string($data, 'tag');
        $this->check_address($address);
        return array(
            'currency' => $code,
            'address' => $address,
            'tag' => $tag,
            'info' => $response,
        );
    }

    public function nonce() {
        return $this->milliseconds();
    }

    public function sign($path, $api = 'v1', $method = 'GET', $params = array (), $headers = null, $body = null) {
        $this->check_required_credentials();
        $baseUrl = $this->implode_hostname($this->urls['api'][$api]);
        $url = $baseUrl . '/' . $this->implode_params($path, $params);
        $query = $this->omit($params, $this->extract_params($path));
        $nonce = (string) $this->nonce();
        $headers = array(
            'X-BITBNS-APIKEY' => $this->apiKey,
        );
        if ($method === 'GET') {
            if ($query) {
                $url .= '?' . $this->urlencode($query);
            }
        } else if ($method === 'POST') {
            if ($query) {
                $body = $this->json($query);
            } else {
                $body = '{}';
            }
            $auth = array(
                'timeStamp_nonce' => $nonce,
                'body' => $body,
            );
            $payload = base64_encode($this->json($auth));
            $signature = $this->hmac($payload, $this->encode($this->secret), 'sha512');
            $headers['X-BITBNS-PAYLOAD'] = $this->decode($payload);
            $headers['X-BITBNS-SIGNATURE'] = $signature;
            $headers['Content-Type'] = 'application/x-www-form-urlencoded';
        }
        return array( 'url' => $url, 'method' => $method, 'body' => $body, 'headers' => $headers );
    }

    public function handle_errors($httpCode, $reason, $url, $method, $headers, $body, $response, $requestHeaders, $requestBody) {
        if ($response === null) {
            return; // fallback to default $error handler
        }
        //
        //     array("msg":"Invalid Request","status":-1,"$code":400)
        //     array("data":array(),"status":0,"$error":"Nothing to show","$code":417)
        //
        $code = $this->safe_string($response, 'code');
        $message = $this->safe_string($response, 'msg');
        $error = ($code !== null) && ($code !== '200');
        if ($error || ($message !== null)) {
            $feedback = $this->id . ' ' . $body;
            $this->throw_exactly_matched_exception($this->exceptions['exact'], $code, $feedback);
            $this->throw_exactly_matched_exception($this->exceptions['exact'], $message, $feedback);
            $this->throw_broadly_matched_exception($this->exceptions['broad'], $message, $feedback);
            throw new ExchangeError($feedback); // unknown $message
        }
    }
}
