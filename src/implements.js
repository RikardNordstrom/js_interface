import Interface from './interface.js';

Function.prototype.implements = function(...ifaces) {

    //check that the objects is of type interface
    for (let i = 0; i < ifaces.length; i++) {

        if(ifaces[i].constructor !==  Interface){
            throw TypeError('Only [Interface] may be implemented');
        }
    }


    for (let i = 0; i < ifaces.length; i++) {

        let iface = ifaces[i];

        iface.methodExistCheck(this.prototype);
        iface.methodNParamCheck(this.prototype);
        for (let method in iface.methods) {

            let contextMethod = this.prototype[method];

            //rewrite context function to make runtime type check
            this.prototype[method] = function(...args){

                //run arguments type check
                iface.methodParamTypeCheck(method, ...args);

                //run original contextMember
                let contextReturn = contextMethod.bind(this)(...args);

                //run return type check
                iface.methodReturnTypeCheck(method, contextReturn);

                return contextReturn;
            };

        }
    }
    this.prototype.__interfaces = ifaces;
}

window.__interfaceStore = {};
