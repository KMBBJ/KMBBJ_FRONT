import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

let stompClient = null;

export const connectWebSocket = (onMessageReceived) => {
  const socket = new SockJS('http://localhost:8080/ws');  // Spring 서버의 WebSocket 엔드포인트
  stompClient = new Client({
    webSocketFactory: () => socket,
    connectHeaders: {},
    debug: (str) => {
      console.log(str);  // 디버그 메시지 출력
    },
    onConnect: (frame) => {
      console.log('Connected: ' + frame);
      stompClient.subscribe('/topic/alarms', (message) => {
        try {
          const receivedAnnouncement = JSON.parse(message.body);
          onMessageReceived(receivedAnnouncement);  // 메시지 수신 시 콜백 실행
        } catch (error) {
          console.error('Error parsing message:', error);  // 메시지 파싱 오류 처리
        }
      });
    },
    onStompError: (frame) => {
      console.error('Broker reported error:', frame);  // 오류 처리
    },
    onWebSocketClose: () => {
      console.log('WebSocket closed');
      // 필요 시 재연결 시도
      setTimeout(() => connectWebSocket(onMessageReceived), 10000);
    },
    onWebSocketError: (error) => {
      console.error('WebSocket error:', error);  // WebSocket 오류 처리
    }
  });

  stompClient.activate();  // WebSocket 연결 활성화
};

export const disconnectWebSocket = () => {
  if (stompClient) {
    stompClient.deactivate();  // WebSocket 연결 해제
    console.log('Disconnected from WebSocket');  // WebSocket 연결 해제 시 로그 출력
  }
};
