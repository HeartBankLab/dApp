const solc = require("solc");
const path = require("path");
const fs = require("fs-extra");

const buildPath = path.resolve(__dirname, "../build");
fs.removeSync(buildPath);

const tokenPath = path.resolve(__dirname, "../contracts", "Token.sol");
const source = fs.readFileSync(tokenPath, "utf8");
const output = solc.compile(source, 1).contracts[":Token"];

fs.ensureDirSync(buildPath);
fs.outputJsonSync(path.resolve(buildPath, "Token.json"), output);
