//const fetch = require('node-fetch');
//import fetch from 'node-fetch';
const apiKey = 'GNY6X65WD9GSC1962Z6DKNCAVBJJT9GEZC'; // Replace with your BscScan API key
const tokenAddress = '0x94d79c325268c898d2902050730f27a478c56cc1'; // Replace with the ERC20 token address
const burnAddress = '0x0000000000000000000000000000000000000000'; // Common burn address
const fromAddress1 = '0xe8831eaab999ea3f051ed2fd31891ab4ab259b0b'; // Replace with the source address
const fromAddress2 = '0xf110dB08D35F76010d6B8d0c1717D946D0F4fCc4'; // Replace with the source address
const tokenDecimals = 18


export const getBurns = async () => {
    try {
        //Burns are made by 2 addresses so we need to get burns by these 2
        const url1 = `https://api.bscscan.com/api?module=account&action=tokentx&contractaddress=${tokenAddress}&address=${fromAddress1}&to=${burnAddress}&sort=asc&apikey=${apiKey}`;
        const url2 = `https://api.bscscan.com/api?module=account&action=tokentx&contractaddress=${tokenAddress}&address=${fromAddress2}&to=${burnAddress}&sort=asc&apikey=${apiKey}`;
        const response1 = await fetch(url1);
        const response2 = await fetch(url2);
        const data1 = await response1.json();
        const data2 = await response2.json();

        console.log('DATA')
        console.log(data1)
        console.log(data2)
        // Filter and format transactions
        let burnTransfers1 = data1.result
            .filter(tx => tx.to == burnAddress)
            
        let burnTransfers2 = data2.result
            .filter(tx => tx.to == burnAddress)

        const burnTransfers_ = [...burnTransfers1, ...burnTransfers2]
        burnTransfers_.sort((a, b) => a.timeStamp - b.timeStamp);
                    
        // console.log('DATA BURNS SORTED')
        // console.log(burnTransfers)

        const burnTransfers = burnTransfers_
            .map(tx => {
                return {
                    timestamp: formatDate(tx.timeStamp),
                    hash: tx.hash,
                    url_bscscan: `https://bscscan.com/tx/${tx.hash}`,
                    value: formatTokenValue(tx.value, tokenDecimals)
                }
            })    

        
        console.log('DATA BURNS')
        console.log(burnTransfers)
        
        //Add the birth of IMO with initial Supply at the beginning of the array
        burnTransfers.unshift({
            timestamp: formatDate(1616243040),
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
// function formatDate(unixTimestamp) {
//     const date = new Date(unixTimestamp * 1000);
//     return date.toLocaleString(); // or use date.toISOString() for ISO format
// }

function formatDate(timestamp) {
    var date = new Date(timestamp * 1000);
    var options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    console.log(timestamp)
    console.log('date')
    const dt = date.toLocaleDateString('en-GB', options)
    console.log(dt)
    return dt
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
