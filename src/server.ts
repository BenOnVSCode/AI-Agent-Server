import app from './app';

app.listen({
  port: 8000,
  host: '0.0.0.0', // This is mainly for digital ocean.
}, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
});