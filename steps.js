const webdriver = require('selenium-webdriver');
const driverCreator = require('./webDriver');
const chai =  require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

let driver;

class testData {
	constructor(login,password,repoName,repoDesc){
		this.login = login;
		this.password = password;
		this.repoName = repoName;
		this.repoDesc = repoDesc;
	}

}

async function go() {
	const data = new testData('testautomationuser990@gmail.com','98979897aa',new Date().toLocaleString(),'And Another Repository');
	driver = driverCreator.getDriverSingleton();
	await login(data);
	await createRepo(data);
	await findRepo(data);
}

function closedriver() {
	driver.quit();
}

async function login(data) {
	await driver.get('https://github.com')
	await driverCreator.findElementByLinkText('Sign in').click();
	await driverCreator.findElementByName('login').sendKeys(data.login);
	await driverCreator.findElementByName('password').sendKeys(data.pasword);
	await driverCreator.findElementByName('commit').click();

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
	await searchField.sendKeys('Test');
	const allGitBtn = await driverCreator.findElementById('jump-to-suggestion-search-global');
	await allGitBtn.click();
}

async function testAmazon (data){
	await driver.get('https://amazon.com')
	let element = await driverCreator.findElementByClassName('nav-a nav-a-2');
	await element.click();
	element = await driverCreator.findElementByClassName('a-button a-button-primary a-button-span12');
	await element.click();
	element = await driverCreator.findElementById('ap_email');
	await element.sendKeys(data.login);
	element = await driverCreator.findElementByClassName('ap_password');
	await element.click();
	element = await driverCreator.findElementById('signInSubmit');
	await element.click();
}

go();

module.exports = {
	go
}
