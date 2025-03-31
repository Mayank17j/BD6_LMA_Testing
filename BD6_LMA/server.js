let { app } = require('./index.js');
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
