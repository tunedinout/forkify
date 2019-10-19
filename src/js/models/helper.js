// Try edit msg
export class Fraction {
    /**
     * @param string to match
     * @returns the first fraction match
     */

    static getNumeratorDenominator(someFraction) {
        const numRegex = /[1-9][0-9]*/,
            denomRegex = /[1-9][0-9]*$/;

        let numerator = parseInt(someFraction.match(numRegex));
        let denominator = parseInt(someFraction.match(denomRegex));

        return { numerator: numerator, denominator: denominator };
    }
    constructor(fractionString) {
        const divideAndReduce = (numerator, denominator) => {
            if (numerator === denominator) return { numerator: 1, denominator: 1 };
            const getPrimesSeive = n => {
                let isPrime = new Array(n + 1);
                for (let i = 2; i <= n; i++) isPrime[i] = true;

                let allPrimes = new Array();
                for (let i = 2; i * i < n; i++) {
                    if (isPrime[i] === true) {
                        allPrimes.push(i);

                        for (let j = i * i; j <= n; j += i) {
                            isPrime[j] = false;
                        }
                    }
                }

                return allPrimes;
            };

            //check if not directly divisble
            if (numerator % denominator === 0) {
                return { numerator: numerator / denominator, denominator: 1 };
            } else if (denominator % numerator === 0 && numerator !== 1) {

                //console.log({ denominator: denominator / numerator, numerator: 1 });
                return { denominator: denominator / numerator, numerator: 1 };
            } else if (denominator % numerator === 0 && numerator === 1) {
                return { numerator: numerator, denominator: denominator };
            }

            // use seive to divide the numbers
            let limit = numerator > denominator ? numerator : denominator;

            //get all prime numbers less than and equal to the limit
            let primes = getPrimesSeive(limit);

            primes.forEach(element => {
                if (numerator % element === 0 && denominator % element === 0) {
                    numerator = numerator / element;
                    denominator = denominator / element;
                }
            });

            return { numerator: numerator, denominator: denominator };
        };

        let fractionObj = Fraction.getNumeratorDenominator(fractionString);
        fractionObj = divideAndReduce(
            fractionObj.numerator,
            fractionObj.denominator
        );
        //console.log(fractionObj);
        this.numerator = fractionObj.numerator;
        this.denominator = fractionObj.denominator;
    }

    /**
     *
     * @param {Another Fraction object} otherFraction
     * @returns {A new fraction object}
     *
     */
    multiply(otherFraction) {
        if (!(typeof otherFraction === typeof this)) return null;

        let num = this.numerator * otherFraction.numerator;
        let denom = this.denominator * otherFraction.denominator;

        let fractionObj = new Fraction(num + "/" + denom);
        return fractionObj;
    }

    add(otherFraction) {
        if (!(typeof otherFraction === typeof this)) return null;

        let num =
            this.numerator * otherFraction.denominator +
            otherFraction.numerator * this.denominator;
        let denom = this.denominator * otherFraction.denominator;

        return new Fraction(`${num}/${denom}`);
    }
    getFractionNotation() {
        ////console.log(this);
        if (this.denominator === 1) return this.numerator + "";
        if (this.numerator === 1) return this.getFractionString();
        if (this.denominator > this.numerator) return this.getFractionString();
        else {
            let divisor = Math.floor(this.numerator / this.denominator);
            let rem = this.numerator % this.denominator;
            let fraction = `${rem}/${this.denominator}`;
            return `${divisor} ${fraction}`;
        }
    }
    getFractionString() {
        return this.numerator + "/" + this.denominator;
    }
    getValue(){
        return this.numerator / this.denominator;
    }
}