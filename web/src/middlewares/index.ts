import { authMiddleware } from '@/middlewares/auth.middleware';
import loggingMiddleware from '@/middlewares/logging.middleware';
import { NextRequest, NextResponse, NextFetchEvent } from 'next/server';

// ✅ Define middleware type
export type Middleware = (
  req: NextRequest,
  event: NextFetchEvent,
) => NextResponse | Promise<NextResponse | void>;

const composeMiddleware =
  (...middlewares: Middleware[]) =>
  async (req: NextRequest, event: NextFetchEvent) => {
    for (const middleware of middlewares) {
      const res = await middleware(req, event);
      if (res) return res; // Stop execution if middleware returns a response
    }
    return NextResponse.next();
  };

const middlewares: Middleware[] = [loggingMiddleware];

export default composeMiddleware(...middlewares);
