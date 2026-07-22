import app from './app.js';
import { env } from './config/env.js';

const port = env.data.PORT;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
