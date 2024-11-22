var Application = require("./lib/app");
var Server = require("./lib/server");
var sdk = require("./lib/sdk");
var config = require("./config");

var app = new Application(null, config);
var server = new Server(config, app);
var router = express.Router();
var routes = require("./routes/index");
const verbiageBuilder = require("./verbiageBuilder");
const cors = require("cors");

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use("/api/botdata", routes);
sdk.checkNodeVersion();

verbiage_En_RespData = verbiageBuilder("ESI_PHA_BOT_RESP_BUILDER_EN_CA.xlsx");
verbiage_Fr_RespData = verbiageBuilder("ESI_PHA_BOT_RESP_BUILDER_FR_CA.xlsx");  

server.start();

sdk.registerBot(require("./SimpleConversationalBot.js"));
