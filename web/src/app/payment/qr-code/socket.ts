'use client';

import envConfig from '@/config/env.config';
import { io } from 'socket.io-client';

export const socket = io(`${envConfig.NEXT_PUBLIC_SERVER_EXTERNAL}/payment`);
