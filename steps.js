const webdriver = require('selenium-webdriver');
const driverCreator = require('./webDriverModule');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
let driver = driverCreator.getDriverSingleton();

class testData {
	constructor(login, password, repoName, repoDesc) {
		this.login = login;
		this.name = login.replace('@gmail.com', '');
		this.password = password;
		this.repoName = repoName;
		this.repoDesc = repoDesc;
	}
}

 function initTestData() {
	const dataInstance =  new testData('testautomationuser990@gmail.com', '98979897aa', new Date().toLocaleString(), 'And Another Repository');
	return dataInstance;
}

async function initDriver() {
	driverInstance = await driver;
	return driverInstance;
}

function closedriver() {
	driver.quit();
}

async function navToGitPage(data) {
	await driver.get('https://github.com');
}

async function pressLogIn() {
	const startLogIn = await driverCreator.findElementByLinkText('Sign in');
	await startLogIn.click();
}

async function fillLoginAndPassword(data) {
	const loginField = await driverCreator.findElementByName('login');
	await loginField.sendKeys(`${data.login}`);
	const passwordField = await driverCreator.findElementByName('password');
	await passwordField.click();
	await passwordField.sendKeys(`${data.password}`);
}

async function pressLogInBtn() {
	const logBtn = await driverCreator.findElementByName('commit')
	await logBtn.click();
}

async function navToMyRepos(data) {
	const navDropDownMenu = await driverCreator.findElementByClassName('HeaderNavlink name mt-1');
	await navDropDownMenu.click();
	const reposItem = await driverCreator.findElementByLinkText('Your repositories');
	await reposItem.click();
}
async function clickNewRepoButton(data) {
	const newRepoBtn = await driverCreator.findElementByClassName('btn btn-primary ml-3');
	await newRepoBtn.click();
}
async function fillRepositoryNameAndDescrFields(data) {
	const repoNameField = await driverCreator.findElementById('repository_name');
	await repoNameField.sendKeys(data.repoName);
	const repoDescField = await driverCreator.findElementByCss('.form-group .form-control.long');
	await repoDescField.sendKeys(data.repoDesc);
}

async function clickCreateRepoBtn(data) {
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
	navToGitPage,
	pressLogIn,
	fillLoginAndPassword,
	pressLogInBtn,
	navToMyRepos,
	clickNewRepoButton,
	fillRepositoryNameAndDescrFields,
	clickCreateRepoBtn,
	findRepo,
	initTestData,
	initDriver
}
