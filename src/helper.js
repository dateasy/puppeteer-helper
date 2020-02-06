

const helper = {
    ElementHandle:null,
    selector: null,
    input: null,
    options:null,

    findSelectOption: async (ElementHandle,selector,input) => {
        const options = await ElementHandle.evaluate(optionSelector => {
            return Array.from(document.querySelectorAll(optionSelector + " > option"))
                .filter(o => o.value)
                .map(o => {
                    return {
                        text: o.text,
                        value: o.value
                    };
                });
        }, selector);

        helper.ElementHandle    = ElementHandle;
        helper.selector         = selector;
        helper.input            = input;
        helper.options          = options;
        await helper.findElementOption();
        //return options;
    },
    findElementOption: async () => {
        for (let index = 0; index < helper.options.length; index++) {
            const element = options[index];
            if (element.text.toString().toLowerCase().trim() === helper.input.toString().toLowerCase().trim() )
            {
                await helper.ElementHandle.select(helper.selector,element.value);
                return;
            }
        }
        throw "Error: Couldnt find coincidence for selector:." + helper.selector + " and input :" + helper.input;
    },
    optionsToArray: async (ElementHandle,selector) => {
        return await ElementHandle.evaluate(optionSelector => {
            return Array.from(document.querySelectorAll(optionSelector + " > option"))
                .filter(o => o.value)
                .map(o => {
                    return {
                        text: o.text,
                        value: o.value
                    };
                });
        }, selector);
    }

}


module.exports = helper;
