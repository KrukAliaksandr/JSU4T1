const webdriver = require('selenium-webdriver');
const driverCreator = require('./webDriver');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

let driver;

class testData {
	constructor(login, password, repoName, repoDesc) {
		this.login = login;
		this.name = login.replace('@gmail.com','');
		this.password = password;
		this.repoName = repoName;
		this.repoDesc = repoDesc;
	}

}

async function go() {
	const data = new testData('testautomationuser990@gmail.com', '98979897aa', new Date().toLocaleString(), 'And Another Repository');
	driver = driverCreator.getDriverSingleton();
	await login(data);
	await createRepo(data);
	const results = await findRepo(data);
	return results;
}

function closedriver() {
	driver.quit();
}

async function login(data) {
	await driver.get('https://github.com')
	let element = await driverCreator.findElementByLinkText('Sign in');
	await element.click();
	element = await driverCreator.findElementByName('login');
	await element.sendKeys(`${data.login}`);
	element = await driverCreator.findElementByName('password');
	await element.click();
	await element.sendKeys(`${data.password}`);
	element = await driverCreator.findElementByName('commit')
	await element.click();
}

async function createRepo(data) {
	const navDropDownMenu = await driverCreator.findElementByClassName('HeaderNavlink name mt-1');
	await navDropDownMenu.click();
	const reposItem = await driverCreator.findElementByLinkText('Your repositories');
	await reposItem.click();
	const newRepoBtn = await driverCreator.findElementByClassName('btn btn-primary ml-3');
	await newRepoBtn.click();
	const repoNameField = await driverCreator.findElementById('repository_name');
	await repoNameField.sendKeys(data.repoName);
	const repoDescField = await driverCreator.findElementByCss('.form-group .form-control.long');
	await repoDescField.sendKeys(data.repoDesc);
	const createBtn = await driverCreator.findElementByXPath('//button[@class=\'btn btn-primary first-in-line\']');
	await createBtn.click();
}

async function findRepo(data) {
	await driver.navigate().back();
	const searchField = await driverCreator.findElementByCss('.Header .header-search-input');
	await searchField.sendKeys(`${data.name}/`);
	const allGitBtn = await driverCreator.findElementById('jump-to-suggestion-search-global');
	await allGitBtn.click();
	const results = await driver.findElements(webdriver.By.css('li[class=\'repo-list-item d-flex flex-column flex-md-row flex-justify-start py-4 public source\']'));
	return results.length;
}

module.exports = {
	go
}
