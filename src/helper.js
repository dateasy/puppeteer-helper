

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
            const element = helper.options[index];
            if (helper.normalizeString(element.text.toString().toLowerCase().trim()) === helper.normalizeString(helper.input.toString().toLowerCase().trim()) )
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
    },

    normalizeString: (inputText) => {

        let from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç",
        to   = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
        mapping = {};

    for(let i = 0, j = from.length; i < j; i++ )
        mapping[ from.charAt( i ) ] = to.charAt( i );

        let retString = [];
        for( let i = 0, j = inputText.length; i < j; i++ ) {
            let c = inputText.charAt( i );
            if( mapping.hasOwnProperty( inputText.charAt( i ) ) )
            retString.push( mapping[ c ] );
            else
            retString.push( c );
        }
        return retString.join( '' );
    }

}


module.exports = helper;
