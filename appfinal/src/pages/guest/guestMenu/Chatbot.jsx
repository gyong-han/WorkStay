import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

// 스타일 정의
const ChatContainer = styled.div`
  background-color: #f5f5f5;
  max-width: 940px;
  padding: 2em 3em;
  margin: 50px auto;
  background-color: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
  background: ${(props) => (props.disabled ? "#ccc" : "#049dd9")};
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  margin: 10px;
  cursor: pointer;
  &:hover {
    background: ${(props) => (props.disabled ? "#ccc" : "#0378b3")};
  }
`;

const Input = styled.input`
  width: 70%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const MessageTable = styled.table`
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #ddd;
`;

const TableData = styled.td`
  padding: 10px;
`;

// Chatbot 컴포넌트
const Chatbot = () => {
  const [stompClient, setStompClient] = useState(null);
  const [connected, setConnected] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // 웹소켓 연결
  const connect = () => {
    const socket = new SockJS("/ws"); // Spring Boot의 WebSocket 엔드포인트
    const stomp = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000, // 자동 재연결
      onConnect: (frame) => {
        setConnected(true);

        stomp.subscribe("/topic/public", (message) => {
          setMessages((prev) => [
            ...prev,
            { text: `네이버 챗봇 응답: ${message.body}`, type: "received" },
          ]);
        });
      },
      onDisconnect: () => {
        setConnected(false);
        console.log("Disconnected");
      },
    });

    stomp.activate();
    setStompClient(stomp);
  };

  // 웹소켓 해제
  const disconnect = () => {
    if (stompClient) {
      stompClient.deactivate();
      setConnected(false);
    }
  };

  // 메시지 전송
  const sendMessage = async () => {
    if (message.trim() === "") return;

    try {
      const response = await fetch("/api/chatbot/sendMessage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await response.text();
      setMessages((prev) => [
        ...prev,
        { text: `네이버 챗봇 응답: ${data}`, type: "received" },
      ]);
    } catch (error) {
      console.error("Error sending message:", "반가워요");
    }
  };

  // 컴포넌트 언마운트 시 클린업
  useEffect(() => {
    return () => {
      if (stompClient) {
        stompClient.deactivate();
      }
    };
  }, [stompClient]);

  return (
    <ChatContainer>
      <h2>챗봇</h2>

      <div>
        <Button onClick={connect} disabled={connected}>
          연결
        </Button>
        <Button onClick={disconnect} disabled={!connected}>
          해제
        </Button>
      </div>

      <div>
        <Input
          type="text"
          placeholder="문의사항 입력"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button onClick={sendMessage}>보내기</Button>
      </div>

      <MessageTable>
        <thead></thead>
        <tbody>
          {messages.map((msg, index) => (
            <TableRow key={index}>
              <TableData
                style={{ color: msg.type === "sent" ? "blue" : "black" }}
              >
                {msg.text}
              </TableData>
            </TableRow>
          ))}
        </tbody>
      </MessageTable>
    </ChatContainer>
  );
};

export default Chatbot;
