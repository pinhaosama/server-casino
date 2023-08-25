async function roulette(req) {
    const {number, amount} = req.query;

    return new Promise((resolve, reject) => {
        var rng = Math.floor(Math.random() * 37);
        var retorno;
        if(number == 0){
            if(number == rng){
                retorno = amount * 35;
                resolve(`You Win!\nRoll: `+rng+` Return: $`+retorno);``
            }else{
                resolve(`You Lose! Roll: `+rng);
            }
        }else if(number % 2 == 0){
            if(rng % 2 == 0){
                if(number == rng){
                    retorno = amount * 10;
                    resolve(`You Win!\nRoll: `+rng+` Return: $`+retorno);``
                }else{
                    retorno = amount * 1.5;
                    resolve(`Roll: `+rng+` Return: $`+retorno);
                }
            }else{
                resolve(`You Lose! Roll: `+rng);
            }
        }else if(amount == 69){
            reject("tf");
        }else{
            if(rng % 2 != 0){
                if(number == rng){
                    retorno = amount * 10;
                    resolve(`You Win!\nRoll: `+rng+` Return: $`+retorno);``
                }else{
                    retorno = amount * 1.5;
                    resolve(`Roll: `+rng+` Return: $`+retorno);
                }
            }else{
                resolve(`You Lose! Roll: `+rng);
            }
        }
        
    });
}

async function writeJSON(req) {
    const fs = require('fs');
    const {number, amount} = req.query;

    
    return new Promise((resolve, reject) => {
        resolve(fs.writeFile("./data/bets.json", JSON.stringify({number: number, amount: amount}), "utf8", (err) => {
            if (err) throw err;
        }))
    })
    }

module.exports = {
    roulette,
    writeJSON
};