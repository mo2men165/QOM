export async function register() {
  // node-cron must only run in the Node.js runtime, not the Edge runtime
  if (process.env.NEXT_RUNTIME !== 'nodejs') return;

  const cron = (await import('node-cron')).default;
  const { processExpiredPreorders } = await import('./lib/preorder-service');

  // Daily at midnight: expire pre-orders past their deadline and trigger Paymob refunds
  cron.schedule('0 0 * * *', async () => {
    console.log('[cron] Running pre-order deadline check...');
    try {
      await processExpiredPreorders();
      console.log('[cron] Pre-order deadline check complete');
    } catch (err) {
      console.error('[cron] Pre-order deadline check failed:', err);
    }
  });

  console.log('[cron] Pre-order deadline job registered (daily @ midnight)');
}
