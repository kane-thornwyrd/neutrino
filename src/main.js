
const configuration = require('./services/configuration');
const logging = require('./services/logging');

async function Main() {
  const settings = await configuration();
  const log = await logging(settings.logging);

  process.stdin.on('readable', () => {
    const chunk = process.stdin.read();
    if (chunk !== null) {
      if (chunk.toString().match(/(exit)/i)) {
        process.exit(0);
      }
    }
  });

  if (process.env.NODE_ENV === 'dev') {
    log.debug('---DEBUG MODE---');
  }

  process.on('uncaughtException', (err) => {
    log.error('Critical Error: uncaught exception failed', err, err.stack);
  });
}

Main();
