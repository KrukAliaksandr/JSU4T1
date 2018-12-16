const steps = require('./steps');
const chai = require('chai').use(require('chai-spies'));
const dataProvider = require('./dataProvider.json');
const expect = chai.expect;

describe('tests final result of webdriver_async module ', () => {
	let spyGo;

	beforeEach(() => {
		spyGo = chai.spy.on(steps, 'go');
	});

	afterEach(() => {
	});

	describe('positive test', () => {

		it(`the summation of [${element.data}] elements with result = [${element.result.add}]`, () => {
			const actualResult = steps.go();
			/* eslint-disable*/
            expect(spyGo).to.be.a.spy;
            expect(spyGo).to.have.been.called.once;
            /* eslint-enable*/
			expect(spyGo).to.have.been.called.with();
			expect(actualResult).to.be.a('Number');
			expect(actualResult).to.be.equal(element.result.add);
		});
	});
});