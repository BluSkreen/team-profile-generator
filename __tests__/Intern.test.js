const Intern = require('../lib/Intern');

describe('Intern', () => {
    describe('Initialization', () => {
        it('Should create an intern object and return the role Intern', () => {
            const obj = new Intern();

            expect(obj.getRole()).toEqual('Intern');
        });
        it('Should create an itern object and return its github', () => {
            const school = 'DU'
            const obj = new Intern('','','',school);

            expect(obj.getSchool()).toEqual(school);
        });
    });
});