// @ts-check

/** Get default port argument. */
let DEFAULT_PORT = 54000;
try {
  const newPort = parseInt(process.argv[2]);
  DEFAULT_PORT = isNaN(newPort) ? DEFAULT_PORT : newPort;
} catch (e) {
}

const PORT = process.env.PORT || DEFAULT_PORT;

module.exports = { PORT };