var app = require("./server");
var config = require("./config");
const PORT = config.PORT;

app.listen(PORT, () => console.log(`listening at http://localhost:${PORT}`));
