//const fetch = require('node-fetch');
//import fetch from 'node-fetch';
const apiKey = 'GNY6X65WD9GSC1962Z6DKNCAVBJJT9GEZC'; // Replace with your BscScan API key
const tokenAddress = '0x94d79c325268c898d2902050730f27a478c56cc1'; // Replace with the ERC20 token address
const burnAddress = '0x0000000000000000000000000000000000000000'; // Common burn address
/** There are 3 addresses that can bun IMO tokens  */
const fromAddress1 = '0xe8831eaab999ea3f051ed2fd31891ab4ab259b0b'; 
const fromAddress2 = '0xf110dB08D35F76010d6B8d0c1717D946D0F4fCc4'; 
const fromAddress3 = '0x0Da399352580b0C662AA4c98c8a2c2c2ea033251'; 
const tokenDecimals = 18


export const getBurns = async () => {
    try {
        //Burns are made by 2 addresses so we need to get burns by these 2
        const url1 = `https://api.bscscan.com/api?module=account&action=tokentx&contractaddress=${tokenAddress}&address=${fromAddress1}&to=${burnAddress}&sort=asc&apikey=${apiKey}`;
        const url2 = `https://api.bscscan.com/api?module=account&action=tokentx&contractaddress=${tokenAddress}&address=${fromAddress2}&to=${burnAddress}&sort=asc&apikey=${apiKey}`;
        const url3 = `https://api.bscscan.com/api?module=account&action=tokentx&contractaddress=${tokenAddress}&address=${fromAddress3}&to=${burnAddress}&sort=asc&apikey=${apiKey}`;
        const response1 = await fetch(url1);
        const response2 = await fetch(url2);
        const response3 = await fetch(url3);
        const data1 = await response1.json();
        const data2 = await response2.json();
        const data3 = await response3.json();

        // Filter and format transactions
        let result1, result2, result3 = []
        result1 = data1.result
        result2 = data2.result
        result3 = data3.result
        let burnTransfers1 = result1
            .filter(tx => tx.to === burnAddress)
            
        let burnTransfers2 = result2
            .filter(tx => tx.to === burnAddress)

        let burnTransfers3 = result3
            .filter(tx => tx.to === burnAddress)

        const burnTransfers_ = [...burnTransfers1, ...burnTransfers2, ...burnTransfers3]
        //Sort Burn transfers by date ASC
        burnTransfers_.sort((a, b) => a.timeStamp - b.timeStamp);
                    
        const burnTransfers = burnTransfers_
            .map(tx => {
                return {
                    timestamp: parseInt(tx.timeStamp),
                    date_fr: timestampToFrenchFormat(tx.timeStamp),
                    date_en: timestampToUSFormat(tx.timeStamp),
                    hash: tx.hash,
                    url_bscscan: `https://bscscan.com/tx/${tx.hash}`,
                    value: formatTokenValue(tx.value, tokenDecimals)
                }
            })    

        
        //Add the birth of IMO with initial Supply at the beginning of the array
        burnTransfers.unshift({
            timestamp: 1616243040,
            date_fr: timestampToFrenchFormat(1616243040),
            date_en: timestampToUSFormat(1616243040),
            hash: '0x4c00e3f6fa189341ec243bb16bfc4f7a4604d5fee05320f403f8331f78660c90',
            url_bscscan: `https://bscscan.com/tx/0x4c00e3f6fa189341ec243bb16bfc4f7a4604d5fee05320f403f8331f78660c90`,
            value: 0
        })

        let initialSupply = 20000000 
        let result = transformArray(burnTransfers, initialSupply);
        return result;

    } catch (error) {
        console.error('Error fetching filtered transfers:', error);
        throw error;
    }
};

//------------------------------------------------------------------------------------------
// Function tthat transforms the amount burnt by the remaining supply
function transformArray(arr, initialSupply) {
    let currentSupply = initialSupply;

    return arr.map((obj) => {
        currentSupply -= obj.value;
        return {
            timestamp: obj.timestamp,
            date_fr: obj.date_fr,
            date_en: obj.date_en,
            hash: obj.hash,
            url_bscscan: obj.url_bscscan,
            totalSupply: currentSupply,
            supplyBurnt: obj.value
        };
    });
}



//------------------------------------------------------------------------------------------
// Function to format token supply
function formatTokenValue(value, decimals) {
    let formattedValue = value / Math.pow(10, decimals);
    formattedValue = Math.round(formattedValue * 100) / 100; // Round to two decimal places

    // Check if rounding up requires an addition of only 0.01
    if (Math.ceil(formattedValue) - formattedValue === 0.01) {
        formattedValue = Math.ceil(formattedValue);
    }

    return formattedValue;
}

//------------------------------------------------------------------------------------------
const isValidTimestamp = (input) => {
    // Check if the input is a number
    if (typeof input !== 'number') {
        return false;
    }

    // Create a date object using the input
    const date = new Date(input);

    // Check if the date object represents a valid date
    // The value is valid if it's not 'Invalid Date' and the input equals the date's timestamp
    return !isNaN(date.getTime()) && date.getTime() === input;
}

//------------------------------------------------------------------------------------------
const timestampToFrenchFormat = (timestamp) => {
    const date = new Date(timestamp*1000);
    // Format the date in DD/MM/YYYY format using template literals
    const formattedDate = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
    return formattedDate;
}

//------------------------------------------------------------------------------------------
const timestampToUSFormat = (timestamp) => {
    const date = new Date(timestamp*1000);    
    // Format the date in MM/DD/YYYY format using template literals
    const formattedDate = `${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}/${date.getFullYear()}`;
    return formattedDate;
}


// Usage (Try it with the command 'node src/scripts/burnTokens.js')
/*
(async () => {
    try {
        const transfers = await getBurns();
        console.log('Filtered Transfers:', transfers);
    } catch (error) {
        console.error('Error:', error);
    }
})();
*/