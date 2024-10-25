import { Hono } from '@hono';
import { logger } from '@hono/logger';
import { serveStatic } from '@hono/deno';

const app = new Hono();

app.use('/api/*', logger());

app.get('/api', (c) => c.json({ message: 'Hello World!!! #####' }));

app.use('*', serveStatic({ root: './client/dist' }));
app.get('*', serveStatic({ path: '../../client/dist/index.html' }));

export { app };
