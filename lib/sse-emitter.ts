import { EventEmitter } from 'events';
import type { SSEMoqEvent } from './types';

// In-memory singleton. In a multi-instance production deployment,
// replace with Redis pub/sub (ioredis + subscribe/publish).
class MoqEmitter extends EventEmitter {}
export const sseEmitter = new MoqEmitter();
sseEmitter.setMaxListeners(200);

export function broadcastMoqUpdate(event: SSEMoqEvent): void {
  sseEmitter.emit('moq_update', event);
}
