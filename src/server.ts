
import app from './app';

app.listen({
  port: 8000
}, (err, address) => {
  if (err) {
    console.error(err);
  }
});