// src/services/transactionService.js

import api from '../../api/api';

const handleErrorResponse = (error) => {
  const serverError = error.response?.data?.exception || {};
  const errorMessage = serverError.errorMessage || 'An unknown error occurred';
  const errorCode = serverError.errorCode || 'UNKNOWN_ERROR';

  return new Error(`${errorCode}: ${errorMessage}`);
};

// 매수 주문 생성 요청을 처리하는 함수입니다.
export const createBuyOrder = async (orderData) => {
  try {
    const response = await api.post('/transactions/buy', orderData);
    return response.data;
  } catch (error) {
    console.error('Failed to create buy order:', error);
    throw handleErrorResponse(error);
  }
};

// 매도 주문 생성 요청을 처리하는 함수입니다.
export const createSellOrder = async (orderData) => {
  try {
    const response = await api.post('/transactions/sell', orderData);
    return response.data;
  } catch (error) {
    console.error('Failed to create sell order:', error);
    throw handleErrorResponse(error);
  }
};

// 주문 취소 요청을 처리하는 함수입니다.
export const cancelOrder = async (cancelData) => {
  try {
    const response = await api.post('/transactions/cancel', cancelData);
    return response.data;
  } catch (error) {
    console.error('Failed to cancel order:', error);
    throw handleErrorResponse(error);
  }
};

// 특정 사용자의 거래 내역을 조회하는 함수입니다.
export const getTransactionsByUserId = async (transactionsData) => {
  try {
    const response = await api.post('/transactions/user/transactions', transactionsData);
    return response.data;
  } catch (error) {
    console.error('Failed to get transactions:', error);
    throw handleErrorResponse(error);
  }
};

// 특정 사용자의 자산 상세 정보를 조회하는 함수입니다.
export const getUserAssetDetails = async (userAssetData) => {
  try {
    const response = await api.post('/transactions/user/assets', userAssetData);
    return response.data;
  } catch (error) {
    console.error('Failed to get user asset details:', error);
    throw handleErrorResponse(error);
  }
};

// 특정 사용자의 매수 가능한 자금을 조회하는 함수입니다.
export const getAvailableFunds = async (availableFundsData) => {
  try {
    const response = await api.post('/transactions/user/available-funds', availableFundsData);
    return response.data;
  } catch (error) {
    console.error('Failed to get available funds:', error);
    throw handleErrorResponse(error);
  }
};

// 특정 사용자의 매도 가능한 코인 수량을 조회하는 함수입니다.
export const getAvailableCoins = async (availableCoinsData) => {
  try {
    const response = await api.post('/transactions/user/available-coins', availableCoinsData);
    return response.data;
  } catch (error) {
    console.error('Failed to get available coins:', error);
    throw handleErrorResponse(error);
  }
};