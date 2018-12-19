const webdriver = require('selenium-webdriver');
const driverCreator = require('./webDriver');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const startLogIn =  driverCreator.findElementByLinkText('Sign in');
const loginField =  driverCreator.findElementByName('login');
const passwordField =  driverCreator.findElementByName('password');
const logBtn =  driverCreator.findElementByName('commit')
const navDropDownMenu =  driverCreator.findElementByClassName('HeaderNavlink name mt-1');
const reposItem =  driverCreator.findElementByLinkText('Your repositories');
const newRepoBtn =  driverCreator.findElementByClassName('btn btn-primary ml-3');
const repoNameField =  driverCreator.findElementById('repository_name');
const repoDescField =  driverCreator.findElementByCss('.form-group .form-control.long');
const createBtn =  driverCreator.findElementByXPath('//button[@class=\'btn btn-primary first-in-line\']');
const searchField =  driverCreator.findElementByCss('.Header .header-search-input');
const allGitBtn =  driverCreator.findElementById('jump-to-suggestion-search-global');
const results =  driver.findElements(webdriver.By.css('li[class=\'repo-list-item d-flex flex-column flex-md-row flex-justify-start py-4 public source\']'));
let driver;

class testData {
	constructor(login, password, repoName, repoDesc) {
		this.login = login;
		this.name = login.replace('@gmail.com', '');
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

async function navToPage(data) {
	await driver.get('https://github.com');
}
async function pressLogIn(data) {
	await startLogIn.click();
}
async function fillLoginAndPassword(data) {
	await loginField.sendKeys(`${data.login}`);
	await passwordField.click();
	await passwordField.sendKeys(`${data.password}`);
}
async function pressLogInBtn(data) {
	await logBtn.click();
}

async function navToMyRepos(data) {
	await navDropDownMenu.click();
	await reposItem.click();
}
async function clickNewRepoButton(data) {
	await newRepoBtn.click();
}
async function fillRepositoryNameAndDescrFields(data) {
	await repoNameField.sendKeys(data.repoName);
	await repoDescField.sendKeys(data.repoDesc);
}

async function clickCreateRepoBtn(data) {
	await createBtn.click();
}

async function findRepo(data) {
	await driver.navigate().back();
	await searchField.sendKeys(`${data.name}/`);
	await allGitBtn.click();
	return results.length;
}

module.exports = {
	go,
	navToPage,
	pressLogIn,
	fillLoginAndPassword,
	pressLogInBtn,
	navToMyRepos,
	clickNewRepoButton,
	fillRepositoryNameAndDescrFields,
	clickCreateRepoBtn,
	findRepo
}
