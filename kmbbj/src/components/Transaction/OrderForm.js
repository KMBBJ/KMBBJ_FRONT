import React, { useState, useEffect } from 'react';
import * as transactionService from '../../services/Transaction/transactionService';
import '../../assets/styles/Transaction/OrderFom.css';

const OrderForm = () => {
  const [mode, setMode] = useState('buy'); // 'buy' 또는 'sell'
  const userId = localStorage.getItem('userId');
  const coinId = localStorage.getItem('coinId');

  const [amount, setAmount] = useState('');
  let [price, setPrice] = useState(() => {
    const storedPrice = localStorage.getItem('coinPrice');
    return storedPrice ? parseInt(storedPrice, 10) : 0; // 문자열을 숫자로 변환
  });
  const [totalPrice, setTotalPrice] = useState('');
  let [availableAmount, setAvailableAmount] = useState(0); // 매도 가능한 코인 수량 or 매수 가능한 자산(원)
  let [availableCoin, setAvailableCoin] = useState();
  const [error, setError] = useState('');

  useEffect(() => {
    // coinId가 변경될 때 price를 로컬 저장소에서 다시 불러오기
    const fetchPrice = () => {
      const storedPrice = localStorage.getItem('coinPrice');
      setPrice(storedPrice ? parseInt(storedPrice, 10) : 0);
    };
    fetchPrice();
  }, [coinId]);
  
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

    if (mode === 'buy') {
      // 매수 시: 총 주문 금액이 보유한 자산을 초과하면 안 됨
      if (!availableAmount || totalOrderPrice > availableAmount) {
        setError('총 주문 금액이 보유한 자산을 초과할 수 없습니다.');
        return;
      }
    } else if (mode === 'sell') {
      // 매도 시: 판매 수량이 보유한 코인 수량을 초과하면 안 됨
      if (!availableCoin || amount > availableCoin) {
        setError('매도 수량이 보유한 코인 수량을 초과할 수 없습니다.');
        return;
      }
    }

    try {
      const orderData = {
        transactionType: mode === 'buy' ? 'BUY' : 'SELL',
        amount: parseFloat(amount),
        price: parseInt(price),
        privateGameId : localStorage.getItem("gameId"),
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
      setPrice(localStorage.getItem("coinPrice"));
      setTotalPrice('');
      setError('');
    } catch (error) {
      console.error('Failed to create order:', error);
      setError('주문 생성에 실패했습니다.');
    }
  };

  useEffect(() => {
    if (amount && price) {
      // 총액을 정수로 처리하기 위해 먼저 계산 후 내림 처리
      const total = Math.floor(amount * price);
      
      // 계산된 총액을 설정
      setTotalPrice(total);
    }
  }, [amount, price]);

  const resetForm = () => {
    setAmount('');
    setPrice(parseInt(localStorage.getItem('coinPrice'), 10));
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
          <input
            type="text"  // 숫자만 입력되게 하려면 text 타입을 사용
            value={price}
            onChange={(e) => {
              const value = e.target.value;
              // 숫자만 필터링
              if (/^\d*$/.test(value)) {
                setPrice(value); // 숫자만 입력되도록 설정
              }
            }}
          />
      </div>

      <label>수량:</label>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        disabled={!availableAmount}
      />

      <div className="percentage-buttons">
        <button onClick={() => {
          if (mode === 'buy') {
            let maxTotalPrice = availableAmount * 0.1;
            let totalPrice = Math.floor(maxTotalPrice);
            let calculatedAmount = totalPrice / price;
            setAmount(calculatedAmount.toFixed(8));
          } else {
            let calculatedAmount = availableCoin * 0.1; // 매도 가능 코인 10%
            setAmount(calculatedAmount.toFixed(8));
          }
        }}>10%</button>

        <button onClick={() => {
          if (mode === 'buy') {
            let maxTotalPrice = availableAmount * 0.25;
            let totalPrice = Math.floor(maxTotalPrice);
            let calculatedAmount = totalPrice / price;
            setAmount(calculatedAmount.toFixed(8));
          } else {
            let calculatedAmount = availableCoin * 0.25; // 매도 가능 코인 25%
            setAmount(calculatedAmount.toFixed(8));
          }
        }}>25%</button>

        <button onClick={() => {
          if (mode === 'buy') {
            let maxTotalPrice = availableAmount * 0.5;
            let totalPrice = Math.floor(maxTotalPrice);
            let calculatedAmount = totalPrice / price;
            setAmount(calculatedAmount.toFixed(8));
          } else {
            let calculatedAmount = availableCoin * 0.5; // 매도 가능 코인 50%
            setAmount(calculatedAmount.toFixed(8));
          }
        }}>50%</button>

        <button onClick={() => {
          if (mode === 'buy') {
            let maxTotalPrice = availableAmount;
            let totalPrice = Math.floor(maxTotalPrice);
            let calculatedAmount = totalPrice / price;
            setAmount(calculatedAmount.toFixed(8));
          } else {
            let calculatedAmount = availableCoin; // 매도 가능 코인 100%
            setAmount(calculatedAmount.toFixed(8));
          }
        }}>100%</button>
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
          disabled={
            (mode === 'buy' && (!amount || !price || totalPrice > availableAmount)) ||
            (mode === 'sell' && (!amount || !price || availableAmount >= amount))
          }
        >
          {mode === 'buy' ? '매수' : '매도'}
        </button>
      </div>
    </div>
  );
};

export default OrderForm;