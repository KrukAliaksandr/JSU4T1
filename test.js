const steps = require('./steps');
const chai = require('chai').use(require('chai-spies'));
const expect = chai.expect;
const mocha = require('mocha');

describe('tests simple github functions', () => {
	let spyGo;

	beforeEach(() => {
		spyGo = chai.spy.on(steps, 'go');
	});

	describe('gitHub test', () => {

		it('gitHub test', async function() {
			const actualResult = await steps.go();
			/* eslint-disable*/
			await expect(actualResult).to.be.not.equal(0);
		});
	});
});