const Employee = require('../lib/Employee');

describe('Employee', () => {
    describe('Initialization', () => {
        it('Should create an object with a \'name\' property set to the \'name\' argument provided when called with the \'new\' keyword', () => {
            const name = 'jason'
            const obj = new Employee(name);

            expect(obj.name).toEqual(name);
        });
        it('Should create an object with an \'id\' property set to the \'id\' argument provided when called with the \'new\' keyword', () => {
            const id = '111'
            const obj = new Employee('',id);

            expect(obj.id).toEqual(id);
        });
        it('Should create an object with an \'email\' property set to the \'email\' argument provided when called with the \'new\' keyword', () => {
            const email = 'abc@gitmail.co'
            const obj = new Employee('','',email);

            expect(obj.email).toEqual(email);
        });
        it('Should create an object with a \'name\' property and getName() should return the property', () => { 
            const name = 'jason';
            const obj = new Employee(name);

            expect(obj.getName()).toEqual(name);
        });
        it('Shoudld create an object with an \'id\' property and getName() should return the property', () => {
            const id = '111';
            const obj = new Employee('',id);

            expect(obj.getId()).toEqual(id);
        });
        it('Should create an object with an \'email\' property and getName() should return the property', () => {
            const email = 'something@somewhere';
            const obj = new Employee('','',email);

            expect(obj.getEmail()).toEqual(email);
        });
        it('Should create an object that returns the role employee', () => {
            const obj = new Employee();

            expect(obj.getRole()).toEqual('Employee');
        });
    });
});