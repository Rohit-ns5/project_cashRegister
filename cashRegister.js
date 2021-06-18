//first we create an object that holds all the denominations, we multiply it by 100 to convert all to whole numbers
const currency = {
    'PENNY': 1,
    'NICKEL': 5,
    'DIME': 10,
    'QUARTER': 25,
    'ONE': 100,
    'FIVE': 500,
    'TEN': 1000,
    'TWENTY': 2000,
    'ONE HUNDRED': 10000
}

function cashRegister (price, cash, cid) {
    let changeSum = cash * 100 - price * 100;
    let changeSumChk = changeSum;
//we create another var and assign the same value as we mutate the changeSum
    let change = [];
    let status = '';
    
    let cidSum = 0;
    let filteredCid = cid.filter(item => item[1] !== 0).reverse();
//here we filter out all the denominations that are 0

//we go thro the cash drawer one denomination at a time
    filteredCid.forEach(item => {
        let cur = item[0];
        let curSum = item[1] * 100;
        cidSum += curSum; //calculate the cash in drawer
        
        let amount = 0;
   //calculate the change to return with available denominations     
        while(changeSum >= currency[cur] && curSum > 0) {
            amount += currency[cur];
            changeSum -= currency[cur];
            curSum -= currency[cur];
        }
   //push the array containing the change to return and the denominations  
        if (amount !== 0) {
            currency.push([cur, amount / 100]);
        }
    });
  //return status and change depending on the available cash in drawer  
    if (changeSum > 0) {
        status = 'INSUFFICIENT_FUNDS';
        change = [];
    } else if(changeSum == 0 && changeSumChk == cidSum) {
        status = 'CLOSED';
        change = cid;
    } else {
        status = 'OPEN';
    }

    return {'status': status, 'change': change};
}