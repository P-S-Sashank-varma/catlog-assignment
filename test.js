
const testCase1 = {
    "keys": {
        "n": 4,
        "k": 3
    },
    "1": {
        "base": "10",
        "value": "4"
    },
    "2": {
        "base": "2",
        "value": "111"
    },
    "3": {
        "base": "10",
        "value": "12"
    },
    "6": {
        "base": "4",
        "value": "213"
    }
};


const testCase2 = {
    "keys": {
        "n": 10,
        "k": 7
    },
    "1": {
        "base": "6",
        "value": "13444211440455345511"
    },
    "2": {
        "base": "15",
        "value": "aed7015a346d63"
    },
    "3": {
        "base": "15",
        "value": "6aeeb69631c227c"
    },
    "4": {
        "base": "16",
        "value": "e1b5e05623d881f"
    },
    "5": {
        "base": "8",
        "value": "316034514573652620673"
    },
    "6": {
        "base": "3",
        "value": "2122212201122002221120200210011020220200"
    },
    "7": {
        "base": "3",
        "value": "20120221122211000100210021102001201112121"
    },
    "8": {
        "base": "6",
        "value": "20220554335330240002224253"
    },
    "9": {
        "base": "12",
        "value": "45153788322a1255483"
    },
    "10": {
        "base": "7",
        "value": "1101613130313526312514143"
    }
};

function convertFromBase(value, base) {
    const digits = '0123456789abcdefghijklmnopqrstuvwxyz';
    const baseNum = parseInt(base);
    let result = 0n;
    
    for (let i = 0; i < value.length; i++) {
        const digit = value[i].toLowerCase();
        const digitValue = digits.indexOf(digit);
        if (digitValue >= baseNum || digitValue < 0) {
            throw new Error(`Invalid digit '${digit}' for base ${base}`);
        }
        result = result * BigInt(baseNum) + BigInt(digitValue);
    }
    
    return result;
}


function parsePoints(testCase) {
    const points = [];
    const k = testCase.keys.k;
   
    let count = 0;
    for (let key in testCase) {
        if (key !== 'keys' && count < k) {
            const x = BigInt(key);
            const base = testCase[key].base;
            const encodedValue = testCase[key].value;
            
            const y = convertFromBase(encodedValue, base);
            points.push({x: x, y: y});
            count++;
        }
    }
    
    return points;
}


function lagrangeInterpolation(points) {
    const k = points.length;
    let secret = 0n;
  
    for (let i = 0; i < k; i++) {
        let xi = points[i].x;
        let yi = points[i].y;
        
       
        let numerator = 1n;
        let denominator = 1n;
        
        for (let j = 0; j < k; j++) {
            if (i !== j) {
                let xj = points[j].x;
                numerator *= (0n - xj); 
                denominator *= (xi - xj); 
            }
        }
        
 
        const term = yi * numerator / denominator;
        secret += term;
    }
    
    return secret;
}

function solveTestCase(testCase, caseNumber) {
    console.log(`\n=== Test Case ${caseNumber} ===`);
    console.log(`n: ${testCase.keys.n}, k: ${testCase.keys.k}`);
    
   
    const points = parsePoints(testCase);
    
    console.log('Decoded Points:');
    points.forEach((point, index) => {
        console.log(`Point ${index + 1}: (${point.x}, ${point.y})`);
    });
    
    
    const secret = lagrangeInterpolation(points);
    
    console.log(`\nSecret (constant term c): ${secret}`);
    return secret;
}

function main() {
    console.log('Problem on polynomials');
    
    try {
        
        const secret1 = solveTestCase(testCase1, 1);
        const secret2 = solveTestCase(testCase2, 2);
        
        console.log('\n=== FINAL RESULTS ===');
        console.log(`Test Case 1 ${secret1}`);
        console.log(`Test Case 2  ${secret2}`);
        
    } catch (error) {
        console.error('Error:', error.message);
    }
}



main();



output :


S C:\Users\sasha\desktop> node test.js
Problem on polynomials

=== Test Case 1 ===
n: 4, k: 3
Decoded Points:
Point 1: (1, 4)
Point 2: (2, 7)
Point 3: (3, 12)

Secret (constant term c): 3

=== Test Case 2 ===
n: 10, k: 7
Decoded Points:
Point 1: (1, 995085094601491)
Point 2: (2, 21394886326566393)
Point 3: (3, 196563650089608567)
Point 4: (4, 1016509518118225951)
Point 5: (5, 3711974121218449851)
Point 6: (6, 10788619898233492461)
Point 7: (7, 26709394976508342463)

Secret (constant term c): 79836264049851

=== FINAL RESULTS ===
Test Case 1 3
Test Case 2  79836264049851
 
