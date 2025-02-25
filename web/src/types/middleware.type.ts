import { NextRequest, NextResponse, NextFetchEvent } from 'next/server';

export type Middleware = (
  req: NextRequest,
  event: NextFetchEvent,
) => NextResponse | Promise<NextResponse | void>;
