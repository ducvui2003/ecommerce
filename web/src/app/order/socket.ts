'use client';

import useSession from '@/components/auth/useSession';
import envConfig from '@/config/env.config';
import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

export function useSocket() {
  const { accessToken } = useSession(); // Assume this returns a string token
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (accessToken && !socketRef.current) {
      socketRef.current = io(
        `${envConfig.NEXT_PUBLIC_SERVER_EXTERNAL}/payment`,
        {
          path: '',
          transports: ['websocket'],
          extraHeaders: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      socketRef.current.on('connect', () => {
        console.log('Socket connected!');
      });

      socketRef.current.on('disconnect', () => {
        console.log('Socket disconnected!');
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [accessToken]);

  return socketRef.current;
}
