import {} from '../src/implements.js';
import Interface from '../src/interface.js';







describe('implements',() => {



    it('can use interface-objects', () => {

        expect.assertions(1);

        const IObject = new Interface('IObject');


        class MockClass {
            constructor(){
                MockClass.implements(IObject);
            }
        }

        expect( () => { new MockClass(); } ).not.toThrow(TypeError);


    });



    it('throws TypeError on non interface-objects', () => {

        expect.assertions(1);
        const NonIObject = {};

        class MockClass {
            constructor(){
                MockClass.implements(NonIObject);
            }
        }

        expect( () => { new MockClass(); } ).toThrow(TypeError);
    });



    it('throws Exception if method is not implemented',() => {

        expect.assertions(1);

        const IObject = new Interface('IObject',{
            do      : {},
            doMore  : {},
        });

        class MockClass{
            constructor(){
                MockClass.implements(IObject);
            }
            doMore(){}
        }

        expect( () => { new MockClass(); } ).toThrow(Error);

    });



    it('do not throw Exception if method is implemented',() => {

        expect.assertions(1);

        const IObject = new Interface('IObject',{
            do      : {},
            doMore  : {},
        });

        class MockClass{
            constructor(){
                MockClass.implements(IObject);
            }
            do(){}
            doMore(){}
        }

        expect( () => { new MockClass(); } ).not.toThrow(Error);

    });



    it('throws Exception if method has wrong number of parameters', () => {

        expect.assertions(1);

        const IObject = new Interface('IObject',{
            do      : { a:String, b:String},
            doMore  : { a:String },
        });

        class MockClass{
            constructor(){
                MockClass.implements(IObject);
            }
            do(){}
            doMore(a){}
        }

        expect( () => { new MockClass(); } ).toThrow(Error);

    });



    it('do not throw Exception if method has correct number of parameters', () => {

        expect.assertions(1);

        const IObject = new Interface('IObject',{
            do      : { a:String, b:String},
            doMore  : { a:String },
        });

        class MockClass{
            constructor(){
                MockClass.implements(IObject);
            }
            do(a,b){}
            doMore(a){}
        }

        expect( () => { new MockClass(); } ).not.toThrow(Error);

    });


    it('throws Exception if arguments is of wrong type', () => {

        expect.assertions(4);

        const IObject = new Interface('IObject',{
            do      : { a:String, b:Number},
            doMore  : { a:Object },
        });

        class MockClass{
            constructor(){
                MockClass.implements(IObject);
            }
            do(a,b){}
            doMore(a){}
        }

        const mockObj = new MockClass();
        expect( () => { mockObj.do(1, {} );   } ).toThrow(Error);
        expect( () => { mockObj.doMore('string');   } ).toThrow(Error);
        expect( () => { mockObj.do('string', 1 );   } ).not.toThrow(Error);
        expect( () => { mockObj.doMore({});   } ).not.toThrow(Error);
    });


    it('throws Exception if the return is of wrong type', () => {

        expect.assertions(2);

        const IObject = new Interface('IObject',{
            do      : { a:String, b:Number, return:Number},
            doMore  : { a:Object, return:Object },
        });

        class MockClass{
            constructor(){
                MockClass.implements(IObject);
            }

            //the return typ is wrong, good
            do(a,b){ return a + b; }
            doMore(a){ return a.a}
        }

        const mockObj = new MockClass();
        expect( () => { mockObj.do('1', 2 );   } ).toThrow(Error);
        expect( () => { mockObj.doMore({ a : 1});   } ).toThrow(Error);
    });



    it('do not throw Exception if the return is of correct type', () => {

        expect.assertions(2);




        const IObject = new Interface('IObject', {
            do      : { a:String, b:Number, return:Number},
            doMore  : { a:Object, return:Object },
        });

        class MockClass{

            constructor(){
                MockClass.implements(IObject);
            }

            //the return typ is wrong, good
            do(a,b){ return parseInt(a) + b; }
            doMore(a){ return { a:a }}
        }

        const mockObj = new MockClass();
        expect( () => { mockObj.do('1', 2 );   } ).not.toThrow(Error);
        expect( () => { mockObj.doMore({ a : 1});   } ).not.toThrow(Error);
    });


    beforeEach(() => {
        window.__interfaceStore = {};
    });

});



//mer edge testing, egna typer, egna typer + object. hantera void
