

export default class Interface {

    constructor(name, methods = {}, extnds = []){
        this.name = name;
        this.methods = methods;

        for (var i = 0; i < extnds.length; i++) {
            this.methods = Object.assign(this.methods, extnds[i].methods);
        }

        if(window.__interfaceStore[this.name]){
            throw new Error('Interface already exists');
        }

        window.__interfaceStore[this.name] = this;
    }

    methodExistCheck(contextMethods){
        for (let method in this.methods) {
            if (!contextMethods[method] || contextMethods[method].constructor !== Function) {
                throw new Error('Method [' + method  + '] missing from class definition.');
            }
        }
    }

    methodNParamCheck(contextMethods){

        for (let method in this.methods) {

            let nReturns = 0;
            if(this.methods[method].return){
                nReturns = 1;
            }

            if (contextMethods[method].length !== Object.keys(this.methods[method]).length - nReturns) {
                throw new Error('Method [' + method  + '] has ' + contextMethods[method].length +
                                ' number of parameters. expected ' + Object.keys(this.methods[method]).length);
            }
        }
    }

    methodParamTypeCheck(method, ...contextMethodParams){
        let i = 0;
        for (let param in this.methods[method]) {
            if(param === 'return') break;
            if (contextMethodParams[i].constructor !== this.methods[method][param]) {
                throw new TypeError('Argument ' + ( i + 1 ) +
                                ' should be of type [' + this.methods[method][param].name + '], got [' +
                                contextMethodParams[i].constructor.name + ']');
            }
            i++;
        }
    }

    methodReturnTypeCheck(method, contextReturnData){
        if (this.methods[method].return && contextReturnData.constructor !== this.methods[method].return) {
                throw new TypeError('return should be of type [' + this.methods[method].return.name + '], got [' +
                            contextReturnData.constructor.name + ']');
        }
    }


    type(obj){

        let exists = false;

        for (var i = 0; i < obj.__interfaces.length; i++) {
            if(obj.__interfaces[i].name === this.name){
                exists = true;
            }
        }

        if(!exists){
            throw new TypeError('[' + obj.constructor.name + '] do not implement [' + this.name + ']');
        }
    }


}
