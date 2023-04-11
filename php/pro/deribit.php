<?php

namespace ccxt\pro;

// PLEASE DO NOT EDIT THIS FILE, IT IS GENERATED AND WILL BE OVERWRITTEN:
// https://github.com/ccxt/ccxt/blob/master/CONTRIBUTING.md#how-to-contribute-code

use Exception; // a common import
use ccxt\ExchangeError;
use ccxt\NotSupported;
use React\Async;

class deribit extends \ccxt\async\deribit {

    public function describe() {
        return $this->deep_extend(parent::describe(), array(
            'has' => array(
                'ws' => true,
                'watchBalance' => true,
                'watchTicker' => true,
                'watchTickers' => false,
                'watchTrades' => true,
                'watchMyTrades' => true,
                'watchOrders' => true,
                'watchOrderBook' => true,
                'watchOHLCV' => true,
            ),
            'urls' => array(
                'test' => array(
                    'ws' => 'wss://test.deribit.com/ws/api/v2',
                ),
                'api' => array(
                    'ws' => 'wss://www.deribit.com/ws/api/v2',
                ),
            ),
            'options' => array(
                'timeframes' => array(
                    '1m' => 1,
                    '3m' => 3,
                    '5m' => 5,
                    '15m' => 15,
                    '30m' => 30,
                    '1h' => 60,
                    '2h' => 120,
                    '4h' => 180,
                    '6h' => 360,
                    '12h' => 720,
                    '1d' => '1D',
                ),
                'currencies' => array( 'BTC', 'ETH', 'SOL', 'USDC' ),
            ),
            'streaming' => array(
            ),
            'exceptions' => array(
            ),
        ));
    }

    public function request_id() {
        $requestId = $this->sum($this->safe_integer($this->options, 'requestId', 0), 1);
        $this->options['requestId'] = $requestId;
        return $requestId;
    }

    public function watch_balance($params = array ()) {
        return Async\async(function () use ($params) {
            /**
             * @see https://docs.deribit.com/#user-portfolio-currency
             * query for balance and get the amount of funds available for trading or funds locked in orders
             * @param {array} $params extra parameters specific to the deribit api endpoint
             * @return {array} a ~@link https://docs.ccxt.com/en/latest/manual.html?#balance-structure balance structure~
             */
            $this->authenticate($params);
            $messageHash = 'balance';
            $url = $this->urls['api']['ws'];
            $currencies = $this->safe_value($this->options, 'currencies', array());
            $channels = array();
            for ($i = 0; $i < count($currencies); $i++) {
                $currencyCode = $currencies[$i];
                $channels[] = 'user.portfolio.' . $currencyCode;
            }
            $subscribe = array(
                'jsonrpc' => '2.0',
                'method' => 'private/subscribe',
                'params' => array(
                    'channels' => $channels,
                ),
                'id' => $this->request_id(),
            );
            $request = $this->deep_extend($subscribe, $params);
            return Async\await($this->watch($url, $messageHash, $request, $messageHash, $request));
        }) ();
    }

    public function handle_balance(Client $client, $message) {
        //
        // subscription
        //     {
        //         jsonrpc => '2.0',
        //         method => 'subscription',
        //         $params => {
        //             channel => 'user.portfolio.btc',
        //             $data => {
        //                 total_pl => 0,
        //                 session_upl => 0,
        //                 session_rpl => 0,
        //                 projected_maintenance_margin => 0,
        //                 projected_initial_margin => 0,
        //                 projected_delta_total => 0,
        //                 portfolio_margining_enabled => false,
        //                 options_vega => 0,
        //                 options_value => 0,
        //                 options_theta => 0,
        //                 options_session_upl => 0,
        //                 options_session_rpl => 0,
        //                 options_pl => 0,
        //                 options_gamma => 0,
        //                 options_delta => 0,
        //                 margin_balance => 0.0015,
        //                 maintenance_margin => 0,
        //                 initial_margin => 0,
        //                 futures_session_upl => 0,
        //                 futures_session_rpl => 0,
        //                 futures_pl => 0,
        //                 fee_balance => 0,
        //                 estimated_liquidation_ratio_map => array(),
        //                 estimated_liquidation_ratio => 0,
        //                 equity => 0.0015,
        //                 delta_total_map => array(),
        //                 delta_total => 0,
        //                 currency => 'BTC',
        //                 $balance => 0.0015,
        //                 available_withdrawal_funds => 0.0015,
        //                 available_funds => 0.0015
        //             }
        //         }
        //     }
        //
        $params = $this->safe_value($message, 'params', array());
        $data = $this->safe_value($params, 'data', array());
        $this->balance['info'] = $data;
        $currencyId = $this->safe_string($data, 'currency');
        $currencyCode = $this->safe_currency_code($currencyId);
        $balance = $this->parse_balance($data);
        $this->balance[$currencyCode] = $balance;
        $messageHash = 'balance';
        $client->resolve ($this->balance, $messageHash);
    }

    public function watch_ticker(string $symbol, $params = array ()) {
        return Async\async(function () use ($symbol, $params) {
            /**
             * @see https://docs.deribit.com/#ticker-instrument_name-$interval
             * watches a price ticker, a statistical calculation with the information for a specific $market->
             * @param {string} $symbol unified $symbol of the $market to fetch the ticker for
             * @param {array} $params extra parameters specific to the deribit api endpoint
             * @param {str|null} $params->interval specify aggregation and frequency of notifications. Possible values => 100ms, raw
             * @return {array} a ~@link https://docs.ccxt.com/#/?id=ticker-structure ticker structure~
             */
            $market = $this->market($symbol);
            $url = $this->urls['api']['ws'];
            $interval = $this->safe_string($params, 'interval', '100ms');
            $params = $this->omit($params, 'interval');
            Async\await($this->load_markets());
            if ($interval === 'raw') {
                $this->authenticate();
            }
            $channel = 'ticker.' . $market['id'] . '.' . $interval;
            $message = array(
                'jsonrpc' => '2.0',
                'method' => 'public/subscribe',
                'params' => array(
                    'channels' => [ 'ticker.' . $market['id'] . '.' . $interval ],
                ),
                'id' => $this->request_id(),
            );
            $request = $this->deep_extend($message, $params);
            return Async\await($this->watch($url, $channel, $request, $channel, $request));
        }) ();
    }

    public function handle_ticker(Client $client, $message) {
        //
        //     {
        //         jsonrpc => '2.0',
        //         method => 'subscription',
        //         $params => {
        //             channel => 'ticker.BTC_USDC-PERPETUAL.raw',
        //             $data => {
        //                 timestamp => 1655393725041,
        //                 stats => [Object],
        //                 state => 'open',
        //                 settlement_price => 21729.5891,
        //                 open_interest => 164.501,
        //                 min_price => 20792.9376,
        //                 max_price => 21426.225,
        //                 mark_price => 21109.555,
        //                 last_price => 21132,
        //                 instrument_name => 'BTC_USDC-PERPETUAL',
        //                 index_price => 21122.3937,
        //                 funding_8h => -0.00022427,
        //                 estimated_delivery_price => 21122.3937,
        //                 current_funding => -0.00010782,
        //                 best_bid_price => 21106,
        //                 best_bid_amount => 1.143,
        //                 best_ask_price => 21113,
        //                 best_ask_amount => 0.327
        //             }
        //         }
        //     }
        //
        $params = $this->safe_value($message, 'params', array());
        $data = $this->safe_value($params, 'data', array());
        $marketId = $this->safe_string($data, 'instrument_name');
        $symbol = $this->safe_symbol($marketId);
        $ticker = $this->parse_ticker($data);
        $messageHash = $this->safe_string($params, 'channel');
        $this->tickers[$symbol] = $ticker;
        $client->resolve ($ticker, $messageHash);
    }

    public function watch_trades(string $symbol, ?int $since = null, ?int $limit = null, $params = array ()) {
        return Async\async(function () use ($symbol, $since, $limit, $params) {
            /**
             * get the list of most recent $trades for a particular $symbol
             * @see https://docs.deribit.com/#$trades-instrument_name-$interval
             * @param {string} $symbol unified $symbol of the $market to fetch $trades for
             * @param {int|null} $since timestamp in ms of the earliest trade to fetch
             * @param {int|null} $limit the maximum amount of $trades to fetch
             * @param {array} $params extra parameters specific to the deribit api endpoint
             * @param {str|null} $params->interval specify aggregation and frequency of notifications. Possible values => 100ms, raw
             * @return {[array]} a list of ~@link https://docs.ccxt.com/en/latest/manual.html?#public-$trades trade structures~
             */
            Async\await($this->load_markets());
            $market = $this->market($symbol);
            $url = $this->urls['api']['ws'];
            $interval = $this->safe_string($params, 'interval', '100ms');
            $params = $this->omit($params, 'interval');
            $channel = 'trades.' . $market['id'] . '.' . $interval;
            if ($interval === 'raw') {
                $this->authenticate();
            }
            $message = array(
                'jsonrpc' => '2.0',
                'method' => 'public/subscribe',
                'params' => array(
                    'channels' => array( $channel ),
                ),
                'id' => $this->request_id(),
            );
            $request = $this->deep_extend($message, $params);
            $trades = Async\await($this->watch($url, $channel, $request, $channel, $request));
            return $this->filter_by_since_limit($trades, $since, $limit, 'timestamp', true);
        }) ();
    }

    public function handle_trades(Client $client, $message) {
        //
        //     {
        //         "jsonrpc" => "2.0",
        //         "method" => "subscription",
        //         "params" => {
        //             "channel" => "trades.BTC_USDC-PERPETUAL.100ms",
        //             "data" => [array(
        //                 "trade_seq" => 501899,
        //                 "trade_id" => "USDC-2436803",
        //                 "timestamp" => 1655397355998,
        //                 "tick_direction" => 2,
        //                 "price" => 21026,
        //                 "mark_price" => 21019.9719,
        //                 "instrument_name" => "BTC_USDC-PERPETUAL",
        //                 "index_price" => 21031.7847,
        //                 "direction" => "buy",
        //                 "amount" => 0.049
        //             )]
        //         }
        //     }
        //
        $params = $this->safe_value($message, 'params', array());
        $channel = $this->safe_string($params, 'channel', '');
        $parts = explode('.', $channel);
        $marketId = $this->safe_string($parts, 1);
        $symbol = $this->safe_symbol($marketId);
        $market = $this->safe_market($marketId);
        $trades = $this->safe_value($params, 'data', array());
        $stored = $this->safe_value($this->trades, $symbol);
        if ($stored === null) {
            $limit = $this->safe_integer($this->options, 'tradesLimit', 1000);
            $stored = new ArrayCache ($limit);
            $this->trades[$symbol] = $stored;
        }
        for ($i = 0; $i < count($trades); $i++) {
            $trade = $trades[$i];
            $parsed = $this->parse_trade($trade, $market);
            $stored->append ($parsed);
        }
        $this->trades[$symbol] = $stored;
        $client->resolve ($this->trades[$symbol], $channel);
    }

    public function watch_my_trades(?string $symbol = null, ?int $since = null, ?int $limit = null, $params = array ()) {
        return Async\async(function () use ($symbol, $since, $limit, $params) {
            /**
             * get the list of $trades associated with the user
             * @see https://docs.deribit.com/#user-$trades-instrument_name-$interval
             * @param {string} $symbol unified $symbol of the market to fetch $trades for. Use 'any' to watch all $trades
             * @param {int|null} $since timestamp in ms of the earliest trade to fetch
             * @param {int|null} $limit the maximum amount of $trades to fetch
             * @param {array} $params extra parameters specific to the deribit api endpoint
             * @param {str|null} $params->interval specify aggregation and frequency of notifications. Possible values => 100ms, raw
             * @return {[array]} a list of ~@link https://docs.ccxt.com/en/latest/manual.html?#public-$trades trade structures~
             */
            $this->authenticate($params);
            if ($symbol !== null) {
                Async\await($this->load_markets());
                $symbol = $this->symbol($symbol);
            }
            $url = $this->urls['api']['ws'];
            $interval = $this->safe_string($params, 'interval', 'raw');
            $params = $this->omit($params, 'interval');
            $channel = 'user.trades.any.any.' . $interval;
            $message = array(
                'jsonrpc' => '2.0',
                'method' => 'private/subscribe',
                'params' => array(
                    'channels' => array( $channel ),
                ),
                'id' => $this->request_id(),
            );
            $request = $this->deep_extend($message, $params);
            $trades = Async\await($this->watch($url, $channel, $request, $channel, $request));
            return $this->filter_by_symbol_since_limit($trades, $symbol, $since, $limit, true);
        }) ();
    }

    public function handle_my_trades(Client $client, $message) {
        //
        //     {
        //         "jsonrpc" => "2.0",
        //         "method" => "subscription",
        //         "params" => {
        //             "channel" => "user.trades.any.any.raw",
        //             "data" => [array(
        //                 "trade_seq" => 149546319,
        //                 "trade_id" => "219381310",
        //                 "timestamp" => 1655421193564,
        //                 "tick_direction" => 0,
        //                 "state" => "filled",
        //                 "self_trade" => false,
        //                 "reduce_only" => false,
        //                 "profit_loss" => 0,
        //                 "price" => 20236.5,
        //                 "post_only" => false,
        //                 "order_type" => "market",
        //                 "order_id" => "46108941243",
        //                 "matching_id" => null,
        //                 "mark_price" => 20233.96,
        //                 "liquidity" => "T",
        //                 "instrument_name" => "BTC-PERPETUAL",
        //                 "index_price" => 20253.31,
        //                 "fee_currency" => "BTC",
        //                 "fee" => 2.5e-7,
        //                 "direction" => "buy",
        //                 "amount" => 10
        //             )]
        //         }
        //     }
        //
        $params = $this->safe_value($message, 'params', array());
        $channel = $this->safe_string($params, 'channel', '');
        $trades = $this->safe_value($params, 'data', array());
        $cachedTrades = $this->myTrades;
        if ($cachedTrades === null) {
            $limit = $this->safe_integer($this->options, 'tradesLimit', 1000);
            $cachedTrades = new ArrayCacheBySymbolById ($limit);
        }
        $parsed = $this->parse_trades($trades);
        $marketIds = array();
        for ($i = 0; $i < count($parsed); $i++) {
            $trade = $parsed[$i];
            $cachedTrades->append ($trade);
            $symbol = $trade['symbol'];
            $marketIds[$symbol] = true;
        }
        $client->resolve ($cachedTrades, $channel);
    }

    public function watch_order_book(string $symbol, ?int $limit = null, $params = array ()) {
        return Async\async(function () use ($symbol, $limit, $params) {
            /**
             * @see https://docs.deribit.com/#public-get_book_summary_by_instrument
             * watches information on open orders with bid (buy) and ask (sell) prices, volumes and other data
             * @param {string} $symbol unified $symbol of the $market to fetch the order book for
             * @param {int|null} $limit the maximum amount of order book entries to return
             * @param {array} $params extra parameters specific to the deribit api endpoint
             * @param {string} $params->interval Frequency of notifications. Events will be aggregated over this $interval-> Possible values => 100ms, raw
             * @return {array} A dictionary of ~@link https://docs.ccxt.com/#/?id=order-book-structure order book structures~ indexed by $market symbols
             */
            Async\await($this->load_markets());
            $market = $this->market($symbol);
            $url = $this->urls['api']['ws'];
            $interval = $this->safe_string($params, 'interval', '100ms');
            $params = $this->omit($params, 'interval');
            if ($interval === 'raw') {
                $this->authenticate();
            }
            $channel = 'book.' . $market['id'] . '.' . $interval;
            $subscribe = array(
                'jsonrpc' => '2.0',
                'method' => 'public/subscribe',
                'params' => array(
                    'channels' => array( $channel ),
                ),
                'id' => $this->request_id(),
            );
            $request = $this->deep_extend($subscribe, $params);
            $orderbook = Async\await($this->watch($url, $channel, $request, $channel));
            return $orderbook->limit ();
        }) ();
    }

    public function handle_order_book(Client $client, $message) {
        //
        //  snapshot
        //     {
        //         "jsonrpc" => "2.0",
        //         "method" => "subscription",
        //         "params" => {
        //             "channel" => "book.BTC_USDC-PERPETUAL.raw",
        //             "data" => {
        //                 "type" => "snapshot",
        //                 "timestamp" => 1655395057025,
        //                 "instrument_name" => "BTC_USDC-PERPETUAL",
        //                 "change_id" => 1550694837,
        //                 "bids" => [
        //                     ["new", 20987, 0.487],
        //                     ["new", 20986, 0.238],
        //                 ],
        //                 "asks" => [
        //                     ["new", 20999, 0.092],
        //                     ["new", 21000, 1.238],
        //                 ]
        //             }
        //         }
        //     }
        //
        //  change
        //     {
        //         "jsonrpc" => "2.0",
        //         "method" => "subscription",
        //         "params" => {
        //             "channel" => "book.BTC_USDC-PERPETUAL.raw",
        //             "data" => {
        //                 "type" => "change",
        //                 "timestamp" => 1655395168086,
        //                 "prev_change_id" => 1550724481,
        //                 "instrument_name" => "BTC_USDC-PERPETUAL",
        //                 "change_id" => 1550724483,
        //                 "bids" => [
        //                     ["new", 20977, 0.109],
        //                     ["delete", 20975, 0]
        //                 ],
        //                 "asks" => array()
        //             }
        //         }
        //     }
        //
        $params = $this->safe_value($message, 'params', array());
        $data = $this->safe_value($params, 'data', array());
        $channel = $this->safe_string($params, 'channel');
        $marketId = $this->safe_string($data, 'instrument_name');
        $symbol = $this->safe_symbol($marketId);
        $timestamp = $this->safe_number($data, 'timestamp');
        $storedOrderBook = $this->safe_value($this->orderbooks, $symbol);
        if ($storedOrderBook === null) {
            $storedOrderBook = $this->counted_order_book();
        }
        $asks = $this->safe_value($data, 'asks', array());
        $bids = $this->safe_value($data, 'bids', array());
        $this->handle_deltas($storedOrderBook['asks'], $asks);
        $this->handle_deltas($storedOrderBook['bids'], $bids);
        $storedOrderBook['nonce'] = $timestamp;
        $storedOrderBook['timestamp'] = $timestamp;
        $storedOrderBook['datetime'] = $this->iso8601($timestamp);
        $storedOrderBook['symbol'] = $symbol;
        $this->orderbooks[$symbol] = $storedOrderBook;
        $client->resolve ($storedOrderBook, $channel);
    }

    public function clean_order_book($data) {
        $bids = $this->safe_value($data, 'bids', array());
        $asks = $this->safe_value($data, 'asks', array());
        $cleanedBids = array();
        for ($i = 0; $i < count($bids); $i++) {
            $cleanedBids[] = [ $bids[$i][1], $bids[$i][2] ];
        }
        $cleanedAsks = array();
        for ($i = 0; $i < count($asks); $i++) {
            $cleanedAsks[] = [ $asks[$i][1], $asks[$i][2] ];
        }
        $data['bids'] = $cleanedBids;
        $data['asks'] = $cleanedAsks;
        return $data;
    }

    public function handle_delta($bookside, $delta) {
        $price = $delta[1];
        $amount = $delta[2];
        if ($delta[0] === 'new' || $delta[0] === 'change') {
            $bookside->store ($price, $amount, 1);
        } elseif ($delta[0] === 'delete') {
            $bookside->store ($price, $amount, 0);
        }
    }

    public function handle_deltas($bookside, $deltas) {
        for ($i = 0; $i < count($deltas); $i++) {
            $this->handle_delta($bookside, $deltas[$i]);
        }
    }

    public function watch_orders(?string $symbol = null, ?int $since = null, ?int $limit = null, $params = array ()) {
        return Async\async(function () use ($symbol, $since, $limit, $params) {
            /**
             * @see https://docs.deribit.com/#user-$orders-instrument_name-raw
             * watches information on multiple $orders made by the user
             * @param {string} $symbol unified market $symbol of the market $orders were made in
             * @param {int|null} $since the earliest time in ms to fetch $orders for
             * @param {int|null} $limit the maximum number of  orde structures to retrieve
             * @param {array} $params extra parameters specific to the deribit api endpoint
             * @return {[array]} a list of [order structures]{@link https://docs.ccxt.com/#/?id=order-structure
             */
            Async\await($this->load_markets());
            $this->authenticate($params);
            if ($symbol !== null) {
                $symbol = $this->symbol($symbol);
            }
            $url = $this->urls['api']['ws'];
            $currency = $this->safe_string($params, 'currency', 'any');
            $interval = $this->safe_string($params, 'interval', 'raw');
            $kind = $this->safe_string($params, 'kind', 'any');
            $params = $this->omit($params, 'interval', 'currency', 'kind');
            $channel = 'user.orders.' . $kind . '.' . $currency . '.' . $interval;
            $message = array(
                'jsonrpc' => '2.0',
                'method' => 'private/subscribe',
                'params' => array(
                    'channels' => array( $channel ),
                ),
                'id' => $this->request_id(),
            );
            $request = $this->deep_extend($message, $params);
            $orders = Async\await($this->watch($url, $channel, $request, $channel, $request));
            if ($this->newUpdates) {
                $limit = $orders->getLimit ($symbol, $limit);
            }
            return $this->filter_by_symbol_since_limit($orders, $symbol, $since, $limit, true);
        }) ();
    }

    public function handle_orders(Client $client, $message) {
        // Does not return a snapshot of current $orders
        //
        //     {
        //         jsonrpc => '2.0',
        //         method => 'subscription',
        //         $params => {
        //             $channel => 'user.orders.any.any.raw',
        //             $data => {
        //                 web => true,
        //                 time_in_force => 'good_til_cancelled',
        //                 replaced => false,
        //                 reduce_only => false,
        //                 profit_loss => 0,
        //                 price => 50000,
        //                 post_only => false,
        //                 order_type => 'limit',
        //                 order_state => 'open',
        //                 order_id => '46094375191',
        //                 max_show => 10,
        //                 last_update_timestamp => 1655401625037,
        //                 label => '',
        //                 is_liquidation => false,
        //                 instrument_name => 'BTC-PERPETUAL',
        //                 filled_amount => 0,
        //                 direction => 'sell',
        //                 creation_timestamp => 1655401625037,
        //                 commission => 0,
        //                 average_price => 0,
        //                 api => false,
        //                 amount => 10
        //             }
        //         }
        //     }
        //
        if ($this->orders === null) {
            $limit = $this->safe_integer($this->options, 'ordersLimit', 1000);
            $this->orders = new ArrayCacheBySymbolById ($limit);
        }
        $params = $this->safe_value($message, 'params', array());
        $channel = $this->safe_string($params, 'channel', '');
        $data = $this->safe_value($params, 'data', array());
        $orders = array();
        if (gettype($data) === 'array' && array_keys($data) === array_keys(array_keys($data))) {
            $orders = $this->parse_orders($data);
        } else {
            $order = $this->parse_order($data);
            $orders = array( $order );
        }
        for ($i = 0; $i < count($orders); $i++) {
            $this->orders.append ($orders[$i]);
        }
        $client->resolve ($this->orders, $channel);
    }

    public function watch_ohlcv(string $symbol, $timeframe = '1m', ?int $since = null, ?int $limit = null, $params = array ()) {
        return Async\async(function () use ($symbol, $timeframe, $since, $limit, $params) {
            /**
             * @see https://docs.deribit.com/#chart-trades-instrument_name-resolution
             * watches historical candlestick data containing the open, high, low, and close price, and the volume of a $market
             * @param {string} $symbol unified $symbol of the $market to fetch OHLCV data for
             * @param {string} $timeframe the length of time each candle represents
             * @param {int|null} $since timestamp in ms of the earliest candle to fetch
             * @param {int|null} $limit the maximum amount of candles to fetch
             * @param {array} $params extra parameters specific to the deribit api endpoint
             * @return {[[int]]} A list of candles ordered, open, high, low, close, volume
             */
            Async\await($this->load_markets());
            $market = $this->market($symbol);
            $url = $this->urls['api']['ws'];
            $timeframes = $this->safe_value($this->options, 'timeframes', array());
            $interval = $this->safe_string($timeframes, $timeframe);
            if ($interval === null) {
                throw new NotSupported($this->id . ' this $interval is not supported, please provide one of the supported timeframes');
            }
            $channel = 'chart.trades.' . $market['id'] . '.' . $interval;
            $message = array(
                'jsonrpc' => '2.0',
                'method' => 'public/subscribe',
                'params' => array(
                    'channels' => array( $channel ),
                ),
                'id' => $this->request_id(),
            );
            $request = $this->deep_extend($message, $params);
            $ohlcv = Async\await($this->watch($url, $channel, $request, $channel, $request));
            if ($this->newUpdates) {
                $limit = $ohlcv->getLimit ($market['symbol'], $limit);
            }
            return $this->filter_by_since_limit($ohlcv, $since, $limit, 0, true);
        }) ();
    }

    public function handle_ohlcv(Client $client, $message) {
        //
        //     {
        //         jsonrpc => '2.0',
        //         method => 'subscription',
        //         $params => {
        //             $channel => 'chart.trades.BTC_USDC-PERPETUAL.1',
        //             data => {
        //                 volume => 0,
        //                 tick => 1655403420000,
        //                 open => 20951,
        //                 low => 20951,
        //                 high => 20951,
        //                 cost => 0,
        //                 close => 20951
        //             }
        //         }
        //     }
        //
        $params = $this->safe_value($message, 'params', array());
        $channel = $this->safe_string($params, 'channel', '');
        $parts = explode('.', $channel);
        $marketId = $this->safe_string($parts, 2);
        $symbol = $this->safe_symbol($marketId);
        $ohlcv = $this->safe_value($params, 'data', array());
        $parsed = array(
            $this->safe_number($ohlcv, 'tick'),
            $this->safe_number($ohlcv, 'open'),
            $this->safe_number($ohlcv, 'high'),
            $this->safe_number($ohlcv, 'low'),
            $this->safe_number($ohlcv, 'close'),
            $this->safe_number($ohlcv, 'volume'),
        );
        $stored = $this->safe_value($this->ohlcvs, $symbol);
        if ($stored === null) {
            $limit = $this->safe_integer($this->options, 'OHLCVLimit', 1000);
            $stored = new ArrayCacheByTimestamp ($limit);
        }
        $stored->append ($parsed);
        $this->ohlcvs[$symbol] = $stored;
        $client->resolve ($stored, $channel);
    }

    public function handle_message(Client $client, $message) {
        //
        // $error
        //     {
        //         "jsonrpc" => "2.0",
        //         "id" => 1,
        //         "error" => array(
        //             "message" => "Invalid $params",
        //             "data" => array(
        //                 "reason" => "invalid format",
        //                 "param" => "nonce"
        //             ),
        //             "code" => -32602
        //         ),
        //         "usIn" => "1655391709417993",
        //         "usOut" => "1655391709418049",
        //         "usDiff" => 56,
        //         "testnet" => false
        //     }
        //
        // subscribe
        //     {
        //         jsonrpc => '2.0',
        //         id => 2,
        //         $result => ['ticker.BTC_USDC-PERPETUAL.raw'],
        //         usIn => '1655393625889396',
        //         usOut => '1655393625889518',
        //         usDiff => 122,
        //         testnet => false
        //     }
        //
        // notification
        //     {
        //         jsonrpc => '2.0',
        //         method => 'subscription',
        //         $params => {
        //             $channel => 'ticker.BTC_USDC-PERPETUAL.raw',
        //             data => {
        //                 timestamp => 1655393724752,
        //                 stats => [Object],
        //                 state => 'open',
        //                 settlement_price => 21729.5891,
        //                 open_interest => 164.501,
        //                 min_price => 20792.9001,
        //                 max_price => 21426.1864,
        //                 mark_price => 21109.4757,
        //                 last_price => 21132,
        //                 instrument_name => 'BTC_USDC-PERPETUAL',
        //                 index_price => 21122.3937,
        //                 funding_8h => -0.00022427,
        //                 estimated_delivery_price => 21122.3937,
        //                 current_funding => -0.00011158,
        //                 best_bid_price => 21106,
        //                 best_bid_amount => 1.143,
        //                 best_ask_price => 21113,
        //                 best_ask_amount => 0.402
        //             }
        //         }
        //     }
        //
        $error = $this->safe_value($message, 'error');
        if ($error !== null) {
            throw new ExchangeError($this->id . ' ' . $this->json($error));
        }
        $params = $this->safe_value($message, 'params');
        $channel = $this->safe_string($params, 'channel');
        if ($channel !== null) {
            $parts = explode('.', $channel);
            $channelId = $this->safe_string($parts, 0);
            $userHandlers = array(
                'trades' => array($this, 'handle_my_trades'),
                'portfolio' => array($this, 'handle_balance'),
                'orders' => array($this, 'handle_orders'),
            );
            $handlers = array(
                'ticker' => array($this, 'handle_ticker'),
                'book' => array($this, 'handle_order_book'),
                'trades' => array($this, 'handle_trades'),
                'chart' => array($this, 'handle_ohlcv'),
                'user' => $this->safe_value($userHandlers, $this->safe_string($parts, 1)),
            );
            $handler = $this->safe_value($handlers, $channelId);
            if ($handler !== null) {
                return $handler($client, $message);
            }
            throw new NotSupported($this->id . ' no $handler found for this $message ' . $this->json($message));
        }
        $result = $this->safe_value($message, 'result', array());
        $accessToken = $this->safe_string($result, 'access_token');
        if ($accessToken !== null) {
            return $this->handle_authentication_message($client, $message);
        }
        return $message;
    }

    public function handle_authentication_message(Client $client, $message) {
        //
        //     {
        //         jsonrpc => '2.0',
        //         id => 1,
        //         result => array(
        //             token_type => 'bearer',
        //             scope => 'account:read_write block_trade:read_write connection custody:read_write mainaccount name:ccxt trade:read_write wallet:read_write',
        //             refresh_token => '1686927372328.1EzFBRmt.logRQWXkPA1oE_Tk0gRsls9Hau7YN6a321XUBnxvR4x6cryhbkKcniUJU-czA8_zKXrqQGpQmfoDwhLIjIsWCvRuu6otbg-LKWlrtTX1GQqLcPaTTHAdZGTMV-HM8HiS03QBd9MIXWRfF53sKj2hdR9nZPZ6MH1XrkpAZPB_peuEEB9wlcc3elzWEZFtCmiy1fnQ8TPHwAJMt3nuUmEcMLt_-F554qrsg_-I66D9xMiifJj4dBemdPfV_PkGPRIwIoKlxDjyv2-xfCw-4eKyo6Hu1m2h6gT1DPOTxSXcBgfBQjpi-_uY3iAIj7U6xjC46PHthEdquhEuCTZl7UfCRZSAWwZA',
        //             expires_in => 31536000,
        //             access_token => '1686923272328.1CkwEx-u.qHradpIulmuoeboKMEi8PkQ1_4DF8yFE2zywBTtkD32sruVC53b1HwL5OWRuh2nYAndXff4xuXIMRkkEfMAFCeq24prihxxinoS8DDVkKBxedGx4CUPJFeXjmh7wuRGqQOLg1plXOpbF3fwF2KPEkAuETwcpcVY6K9HUVjutNRfxFe2TR7CvuS9x8TATvoPeu7H1ezYl-LkKSaRifdTXuwituXgp4oDbPRyQLniEBWuYF9rY7qbABxuOJlXI1VZ63u7Bh0mGWei-KeVeqHGNpy6OgrFRPXPxa9_U7vaxCyHW3zZ9959TQ1QUMLWtUX-NLBEv3BT5eCieW9HORYIOKfsgkpd3'
        //         ),
        //         usIn => '1655391872327712',
        //         usOut => '1655391872328515',
        //         usDiff => 803,
        //         testnet => false
        //     }
        //
        $messageHash = 'authenticated';
        $client->resolve ($message, $messageHash);
        return $message;
    }

    public function authenticate($params = array ()) {
        $url = $this->urls['api']['ws'];
        $client = $this->client($url);
        $time = $this->milliseconds();
        $timeString = $this->number_to_string($time);
        $nonce = $timeString;
        $messageHash = 'authenticated';
        $future = $this->safe_value($client->subscriptions, $messageHash);
        if ($future === null) {
            $this->check_required_credentials();
            $requestId = $this->request_id();
            $signature = $this->hmac($this->encode($timeString . '\n' . $nonce . '\n'), $this->encode($this->secret), 'sha256');
            $request = array(
                'jsonrpc' => '2.0',
                'id' => $requestId,
                'method' => 'public/auth',
                'params' => array(
                    'grant_type' => 'client_signature',
                    'client_id' => $this->apiKey,
                    'timestamp' => $time,
                    'signature' => $signature,
                    'nonce' => $nonce,
                    'data' => '',
                ),
            );
            $future = $this->watch($url, $messageHash, array_merge($request, $params), $messageHash);
        }
        return $future;
    }
}
