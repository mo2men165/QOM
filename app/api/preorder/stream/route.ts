import type { NextRequest } from 'next/server';
import { sseEmitter } from '@/lib/sse-emitter';
import type { SSEMoqEvent } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      const send = (data: object) => {
        try {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
        } catch {
          // Client already disconnected
        }
      };

      // Acknowledge connection
      send({ type: 'connected' });

      const onUpdate = (event: SSEMoqEvent) => send(event);
      sseEmitter.on('moq_update', onUpdate);

      req.signal.addEventListener('abort', () => {
        sseEmitter.off('moq_update', onUpdate);
        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no', // Disable nginx buffering
    },
  });
}
