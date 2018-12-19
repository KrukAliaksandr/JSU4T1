const steps = require('./steps');
const chai = require('chai').use(require('chai-spies'));
const expect = chai.expect;
const mocha = require('mocha');
const webdriver = require('selenium-webdriver');

describe('tests simple github functions', () => {
	let spyGo;

	beforeEach(() => {
		spyGo = chai.spy.on(steps, 'go');
	});

	describe('gitHub test', () => {

		it('stat Log In', async function () {
			steps.pressLogIn();
		});

		it('gitHub test', async function () {
			steps.fillLoginAndPassword();
		});

		it('gitHub test', async function () {
			steps.pressLogInBtn();
		});

		it('gitHub test', async function () {
			steps.navToMyRepos();
		});

		it('gitHub test', async function () {
			steps.clickNewRepoButton();
		});

		it('gitHub test', async function () {
			steps.fillRepositoryNameAndDescrFields();
		});

		it('gitHub test', async function () {
			steps.clickCreateRepoBtn();
		});

		it('gitHub test', async function () {
			const repositoryCount = steps.findRepo();
			expect(repositoryCount).not.to.be.equal(0, `expected to find at least one repo,found ${repositoryCount}`)
		});

	});
});