'use client';

import useSession from '@/components/auth/useSession';
import envConfig from '@/config/env.config';
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export function useSocket(): Socket | null {
  const { accessToken } = useSession();
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (accessToken && !socket) {
      const newSocket = io(`${envConfig.NEXT_PUBLIC_SERVER_EXTERNAL}/payment`, {
        transports: ['websocket'],
        query: {
          token: `Bearer ${accessToken}`,
        },
      });

      newSocket.on('connect', () => {
        console.log('Socket connected!');
      });

      newSocket.on('disconnect', () => {
        console.log('Socket disconnected!');
      });

      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
        setSocket(null);
      };
    }
  }, [accessToken]);

  return socket;
}
