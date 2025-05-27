// Problem 1:
function formatString(input: string, toUpper?: boolean): string {
    if (toUpper !== false) {
        return input.toUpperCase();
    } else {
        return input.toLowerCase();
    }
}



// Problem 2:

function filterByRating(items: { title: string; rating: number }[]): { title: string; rating: number }[] {
    return items.filter(item => item.rating >= 4);
}


// Problem 3:
function concatenateArrays<T>(...arrays: T[][]): T[] {
    return arrays.reduce((acc, currentArray) => acc.concat(currentArray), []);
}


//Problem : 4

class Vehicle {
    private make: string;
    private year: number;
    constructor(make: string, year: number) {
        this.make = make;
        this.year = year;
    }
    public getInfo(): string {
        return `Make: ${this.make}, Year: ${this.year}`;
    }
}

class Car extends Vehicle {
    private model: string;
    constructor(make: string, year: number, model: string) {
        super(make, year);
        this.model = model;
    }
    public getModel(): string {
        return `Model: ${this.model}`;
    }
}

//Problem 5 : 

function processValue(value: string | number): number {
    if (typeof value === 'string') {
        return value.length;
    } else {
        return value * 2;
    }
}


//Problem 6 :

//=> Define the Product interface
interface Product {
    name: string;
    price: number;
}

function getMostExpensiveProduct(products: Product[]): Product | null {

    if (products.length === 0) {
        return null;
    }
    return products.reduce((mostExpensive, currentProduct) => {
        return currentProduct.price > mostExpensive.price ? currentProduct : mostExpensive;
    });
}

//Problem : 7 
enum Day {
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday
}

// Function to determine if the day is a Weekday or Weekend
function getDayType(day: Day): string {
    // If the day is Saturday or Sunday, return "Weekend", else return "Weekday"
    if (day === Day.Saturday || day === Day.Sunday) {
        return "Weekend";
    } else {
        return "Weekday";
    }
}

//Problem : 8 
async function squareAsync(n: number): Promise<number> {
    return new Promise((resolve, reject) => {
        if (n < 0) {
            reject(new Error("Negative number not allowed"));
        }
        setTimeout(() => {
            resolve(n * n);
        }, 1000);
    });
}
