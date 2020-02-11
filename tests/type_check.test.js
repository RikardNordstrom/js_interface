import {} from '../src/implements.js';
import Interface from '../src/interface.js';





describe('type check',() => {
    it('throws Exception if arg do not implement correct interface', () => {


        const ICorrect = new Interface('ICorrect', {
            a : { },
        });

        const IWrong = new Interface('IWrong', {
            b : { },
        });


        class MockClassA {
            constructor() {
                MockClassA.implements(IWrong);
            }
            b(){}
        }

        class MockClassB {
            constructor(a) {
                ICorrect.type(a);
            }
        }

        let mockA = new MockClassA();

        expect( () => { new MockClassB(mockA);  } ).toThrow(Error);

    });



    it('do not throw Exception if arg implement correct interfaces', () => {


        const ICorrectA = new Interface('ICorrectA', {
            a : { },
        });

        const ICorrectB = new Interface('ICorrectB', {
            b : { a : Number, b: String },
            c : { },
        });

        class MockClassA {
            constructor() {
                MockClassA.implements(ICorrectA, ICorrectB);
            }
            a(){}
            b(a, b){}
            c(){}
        }

        class MockClassB {
            constructor(a) {
                ICorrectA.type(a);
                ICorrectB.type(a);
            }
        }

        let mockA = new MockClassA();

        expect( () => { new MockClassB(mockA);  } ).not.toThrow(Error);


    });

    it('can extend another interfaces', () => {


        const ICorrectA = new Interface('ICorrectAc', {
            a : { },
        });

        const ICorrectB = new Interface('ICorrectBc', {
            b : { a : Number, b: String },
            c : { },
        },[ICorrectA]);

        class MockClassA {
            constructor() {
                MockClassA.implements(ICorrectB);
            }
            a(){}
            b(a, b){}
            c(){}
        }

        class MockClassB {
            constructor(a) {
                ICorrectB.type(a);
            }
        }

        let mockA = new MockClassA();

        expect( () => { new MockClassB(mockA);  } ).not.toThrow(Error);

    });

    beforeEach(() => {
        window.__interfaceStore = {};
    });
});
