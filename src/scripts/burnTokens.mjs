//const fetch = require('node-fetch');
//import fetch from 'node-fetch';
const apiKey = 'GNY6X65WD9GSC1962Z6DKNCAVBJJT9GEZC'; // Replace with your BscScan API key
const tokenAddress = '0x94d79c325268c898d2902050730f27a478c56cc1'; // Replace with the ERC20 token address
const burnAddress = '0x0000000000000000000000000000000000000000'; // Common burn address
const fromAddress1 = '0xe8831eaab999ea3f051ed2fd31891ab4ab259b0b'; // Replace with the source address
const fromAddress2 = '0xe8831eaab999ea3f051ed2fd31891ab4ab259b0b'; // Replace with the source address
const toAddress = '0x0000000000000000000000000000000000000000'; // Replace with the destination address
const tokenDecimals = 18


export const getBurns = async () => {
    try {
        const url1 = `https://api.bscscan.com/api?module=account&action=tokentx&address=${fromAddress1}&startblock=0&endblock=99999999&sort=asc&apikey=${apiKey}`;
        const url2 = `https://api.bscscan.com/api?module=account&action=tokentx&address=${fromAddress2}&startblock=0&endblock=99999999&sort=asc&apikey=${apiKey}`;
        const response = await fetch(url1);
        const data = await response.json();

        // Filter and format transactions
        const filteredTransfers = data.result.filter(tx =>
            tx.contractAddress.toLowerCase() === tokenAddress.toLowerCase() &&
            tx.from.toLowerCase() === fromAddress1.toLowerCase() &&
            tx.to.toLowerCase() === toAddress.toLowerCase()
        ).map(tx => {
            return {
                timestamp: formatDate(tx.timeStamp),
                hash: tx.hash,
                url_bscscan: `https://bscscan.com/tx/${tx.hash}`,
                value: formatTokenValue(tx.value, tokenDecimals)
            }
        })

        console.log('RESULT AVANT !!')
        console.dir(filteredTransfers)

        let initialSupply = 20000000 
        let result = transformArray(filteredTransfers, initialSupply);
        
        console.log('RESULT !!')
        console.dir(result)
        return result;
    } catch (error) {
        console.error('Error fetching filtered transfers:', error);
        throw error;
    }
};

// Function tthat transforms the amount burnt by the remaining supply
function transformArray(arr, initialSupply) {
    let currentSupply = initialSupply;

    return arr.map((obj) => {
        currentSupply -= obj.value;
        return {
            timestamp: obj.timestamp,
            hash: obj.hash,
            url_bscscan: obj.url_bscscan,
            totalSupply: currentSupply,
            supplyBurnt: obj.value
        };
    });
}



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

// Function to convert Unix timestamp to human-readable date
function formatDate(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000);
    return date.toLocaleString(); // or use date.toISOString() for ISO format
}

// Usage (Try it with the command 'node src/scripts/burnTokens.js')

(async () => {
    try {
        const transfers = await getBurns();
        console.log('Filtered Transfers:', transfers);
    } catch (error) {
        console.error('Error:', error);
    }
})();
