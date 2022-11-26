const Manager = require('../lib/Manager');

describe('Manager', () => {
    describe('Initialization', () => {
        it('Should create a manager object and return the role Intern', () => {
            const obj = new Manager();

            expect(obj.getRole()).toEqual('Manager');
        });
        it('Should create an manager object and return its office number', () => {
            const office = '303'
            const obj = new Manager('','','',office);

            expect(obj.officeNumber).toEqual(office);
        });
    });
});