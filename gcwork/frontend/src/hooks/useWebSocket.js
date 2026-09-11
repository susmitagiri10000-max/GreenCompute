import { useCallback, useEffect, useRef, useState } from "react";

const useWebSocket = (url, options = {}) => {
  const {
    enabled = true,
    reconnect = true,
    reconnectInterval = 5000,
    maxReconnectAttempts = 10,
    onOpen,
    onMessage,
    onError,
    onClose,
  } = options;

  const socketRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);
  const reconnectAttemptsRef = useRef(0);
  const manuallyClosedRef = useRef(false);

  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState(null);
  const [error, setError] = useState(null);

  const connect = useCallback(() => {
    if (!enabled || !url) {
      return;
    }

    if (
      socketRef.current &&
      socketRef.current.readyState === WebSocket.OPEN
    ) {
      return;
    }

    manuallyClosedRef.current = false;

    try {
      const socket = new WebSocket(url);

      socketRef.current = socket;

      socket.onopen = (event) => {
        setIsConnected(true);
        setError(null);
        reconnectAttemptsRef.current = 0;

        if (onOpen) {
          onOpen(event);
        }
      };

      socket.onmessage = (event) => {
        let parsedData = event.data;

        try {
          parsedData = JSON.parse(event.data);
        } catch {
          // Keep original message if it is not valid JSON.
        }

        setLastMessage(parsedData);

        if (onMessage) {
          onMessage(parsedData);
        }
      };

      socket.onerror = (event) => {
        setError("WebSocket connection error.");

        if (onError) {
          onError(event);
        }
      };

      socket.onclose = (event) => {
        setIsConnected(false);
        socketRef.current = null;

        if (onClose) {
          onClose(event);
        }

        if (
          reconnect &&
          !manuallyClosedRef.current &&
          reconnectAttemptsRef.current < maxReconnectAttempts
        ) {
          reconnectAttemptsRef.current += 1;

          reconnectTimeoutRef.current = setTimeout(() => {
            connect();
          }, reconnectInterval);
        }
      };
    } catch (err) {
      setIsConnected(false);
      setError(err?.message || "Unable to establish WebSocket connection.");
    }
  }, [
    enabled,
    url,
    reconnect,
    reconnectInterval,
    maxReconnectAttempts,
    onOpen,
    onMessage,
    onError,
    onClose,
  ]);

  const disconnect = useCallback(() => {
    manuallyClosedRef.current = true;

    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    if (socketRef.current) {
      socketRef.current.close();
      socketRef.current = null;
    }

    setIsConnected(false);
  }, []);

  const sendMessage = useCallback((message) => {
    if (
      !socketRef.current ||
      socketRef.current.readyState !== WebSocket.OPEN
    ) {
      console.warn("WebSocket is not connected.");
      return false;
    }

    const data =
      typeof message === "string"
        ? message
        : JSON.stringify(message);

    socketRef.current.send(data);

    return true;
  }, []);

  useEffect(() => {
    if (!enabled || !url) {
      return;
    }

    connect();

    return () => {
      manuallyClosedRef.current = true;

      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }

      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }

      setIsConnected(false);
    };
  }, [connect, enabled, url]);

  return {
    isConnected,
    lastMessage,
    error,
    connect,
    disconnect,
    sendMessage,
  };
};

export default useWebSocket;