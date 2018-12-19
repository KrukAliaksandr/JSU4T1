const steps = require('./steps');
const chai = require('chai').use(require('chai-spies'));
const expect = chai.expect;
const mocha = require('mocha');
const testdata =  steps.initTestData();

describe('gitHub test', () => {
	const driver =  steps.initDriver();
	console.log(testdata);
	
	it('start Log In', async function () {
		await steps.navToGitPage();
		await steps.pressLogIn();
	});

	it('gitHub test', async function () {
		await steps.fillLoginAndPassword(testdata);
	});

	it('gitHub test', async function () {
		await steps.pressLogInBtn();
	});

	it('gitHub test', async function () {
		await steps.navToMyRepos(testdata);
	});

	it('gitHub test', async function () {
		await steps.clickNewRepoButton(testdata);
	});

	it('gitHub test', async function () {
		await steps.fillRepositoryNameAndDescrFields(testdata);
	});

	it('gitHub test', async function () {
		await steps.clickCreateRepoBtn(testdata);
	});

	it('gitHub test', async function () {
		const repositoryCount = await steps.findRepo(testdata);
		expect(repositoryCount).not.to.be.equal(0, `expected to find at least one repo,found ${repositoryCount}`)
	});

});