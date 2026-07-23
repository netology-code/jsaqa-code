const launch = {
  headless: false,
  defaultViewport: null,
  args: ["--start-maximized"],
};

if (process.env.PUPPETEER_EXECUTABLE_PATH) {
  launch.executablePath = process.env.PUPPETEER_EXECUTABLE_PATH;
}

module.exports = {
  launch,
};
