import React, { useState, useEffect } from 'react';
import * as transactionService from '../../services/Transaction/transactionService';
import '../../assets/styles/Transaction/OrderFom.css';

const OrderForm = () => {
  const [mode, setMode] = useState('buy'); // 'buy' 또는 'sell'
  const userId = localStorage.getItem('userId');
  const coinId = localStorage.getItem('coinId');

  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  let [availableAmount, setAvailableAmount] = useState(0); // 매도 가능한 코인 수량 or 매수 가능한 자산(원)
  let [availableCoin, setAvailableCoin] = useState();
  const [error, setError] = useState('');

  const fetchAvailableAmount = async () => {
    try {
      setError('');
      if (mode === 'buy') {
        const response = await transactionService.getAvailableFunds({ userId });
        setAvailableAmount(response.data.availableAsset);
        console.log('Available Funds', availableAmount);
      } else if (mode === 'sell') {
        const response = await transactionService.getAvailableCoins({ userId, coinId });
        setAvailableCoin(response.data.availableCoin);
      }
    } catch (error) {
      console.error('Failed to fetch available amount:', error);
      setError(error.message || '사용 가능한 자산을 조회하는데 실패했습니다.');
    }
  };

  const handleOrder = async () => {
    const totalOrderPrice = parseFloat(amount) * parseInt(price);

    if (!availableAmount || totalOrderPrice > availableAmount) {
      setError('총 주문 금액/수량이 보유한 자산을 초과할 수 없습니다.');
      return;
    }

    try {
      const orderData = {
        transactionType: mode === 'buy' ? 'BUY' : 'SELL',
        amount: parseFloat(amount),
        price: parseInt(price),
        totalPrice: totalOrderPrice,
        userId: parseInt(userId),
        coinId: parseInt(coinId),
      };

      if (mode === 'buy') {
        await transactionService.createBuyOrder(orderData);
        alert('매수 주문이 성공적으로 생성되었습니다.');
      } else if (mode === 'sell') {
        await transactionService.createSellOrder(orderData);
        alert('매도 주문이 성공적으로 생성되었습니다.');
      }

      setAmount('');
      setPrice('');
      setTotalPrice('');
      setError('');
    } catch (error) {
      console.error('Failed to create order:', error);
      setError('주문 생성에 실패했습니다.');
    }
  };

  useEffect(() => {
    if (amount && price) {
      setTotalPrice(parseFloat(amount) * parseInt(price));
    }
  }, [amount, price]);

  const incrementPrice = () => {
    setPrice((prevPrice) => parseInt(prevPrice) + 1);
  };

  const decrementPrice = () => {
    setPrice((prevPrice) => (parseInt(prevPrice) > 0 ? parseInt(prevPrice) - 1 : 0));
  };

  const resetForm = () => {
    setAmount('');
    setPrice('');
    setTotalPrice('');
    setError('');
  };

  return (
    <div className="order-form-container">
      <div className="mode-switch">
        <button onClick={() => {setMode('buy'); setError('');}} disabled={mode === 'buy'}>
          매수
        </button>
        <button onClick={() => {setMode('sell'); setError('');}} disabled={mode === 'sell'}>
          매도
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      <button onClick={fetchAvailableAmount}>
        {mode === 'buy' ? '사용 가능한 자산 조회' : '사용 가능한 코인 수량 조회'}
      </button>

      {availableAmount !== null && (
        <div className="order-details">
          {mode === 'buy' ? (
            <p>매수 가능: {availableAmount} KRW</p>
          ) : (
            <p>매도 가능: {availableCoin}</p>
          )}
        </div>
      )}

      <div className="price-quantity-container">
        <label>가격(KRW):</label>
        <div className="increment-decrement-buttons">
          <button onClick={decrementPrice}>-</button>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <button onClick={incrementPrice}>+</button>
        </div>
      </div>

      <label>수량:</label>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        disabled={!availableAmount}
      />

      <div className="percentage-buttons">
        <button onClick={() => setAmount((availableAmount * 0.1).toFixed(8))}>10%</button>
        <button onClick={() => setAmount((availableAmount * 0.25).toFixed(8))}>25%</button>
        <button onClick={() => setAmount((availableAmount * 0.5).toFixed(8))}>50%</button>
        <button onClick={() => setAmount((availableAmount * 1).toFixed(8))}>100%</button>
      </div>

      <div className="order-summary">
        <p>총액: {totalPrice ? `${totalPrice} KRW` : '- KRW'}</p>
      </div>

      <div className="button-group">
        <button className="reset-button" onClick={resetForm}>초기화</button>
        <button
          type="submit"
          className={mode === 'buy' ? '' : 'sell'}
          onClick={handleOrder}
          disabled={!amount || !price || totalPrice > availableAmount}
        >
          {mode === 'buy' ? '매수' : '매도'}
        </button>
      </div>
    </div>
  );
};

export default OrderForm;