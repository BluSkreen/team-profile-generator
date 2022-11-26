const Engineer = require('../lib/Engineer');

describe('Engineer', () => {
    describe('Initialization', () => {
        it('Should create an engineer object and return the role', () => {
            const obj = new Engineer();

            expect(obj.getRole()).toEqual('Engineer');
        });
        it('Should create an engineer object and return the github property', () => {
            const github = 'jbreezy'
            const obj = new Engineer('','','',github);

            expect(obj.getGithub()).toEqual(github);
        });
    });
});