let webdriver = require('selenium-webdriver');

let driverSingleton = null;

function getDriverSingleton() {
	driverSingleton = new webdriver.Builder()
		.usingServer('http://localhost:4444/wd/hub')
		.withCapabilities(webdriver.Capabilities.chrome())
		.build();
	driverSingleton.manage().timeouts().setScriptTimeout(10000);
	driverSingleton.manage().window().maximize();
	return driverSingleton;
};

const findElementByName = async function findElementByName( name) {
	const elem = await driverSingleton.wait(webdriver.until.elementLocated(webdriver.By.name(name)), 5000);
	return elem;
};

const findElementByClassName = async function findElementByClassName( className) {
	const elem = await driverSingleton.wait(webdriver.until.elementLocated(webdriver.By.className(className)), 5000);
	return elem;
};

const findElementByCss = async function findElementByCss( css) {
	const elem = await driverSingleton.wait(webdriver.until.elementLocated(webdriver.By.css(css)), 5000);
	return elem;
};

const findElementById = async function findElementById( id) {
	const elem = await driverSingleton.wait(webdriver.until.elementLocated(webdriver.By.id(id)), 5000);
	return elem;
};

const findElementByXPath = async function findElementByXPath( xPath) {
	const elem = await driverSingleton.wait(webdriver.until.elementLocated(webdriver.By.xpath(xPath)), 5000);
	return elem;
};

const findElementByLinkText = async function findElementByLinkText(linkText) {
	const elem = await driverSingleton.wait(webdriver.until.elementLocated(webdriver.By.linkText(linkText)), 5000);
	return elem;
};

module.exports = {
	getDriverSingleton,
	findElementByName,
	findElementByClassName,
	findElementByCss,
	findElementById,
	findElementByLinkText,
	findElementByXPath
};
