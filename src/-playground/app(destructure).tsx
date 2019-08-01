console.log("Test");

const person = {
    pname: "Barney",
    age: 6000,
    location: {
        city: "Zion",
        temp: 92
    }
}
const {pname = 'Unknown', age} = person;
const {city, temp} = person.location;

//console.log(`${pname} is ${age}.`);

//console.log(`It's ${temp} in ${city}`);

// class Book {
//     title: string;
//     author: string;
//     publisher: {
//         name?: string
//     }
// };

// const book: Book = {
//     title: "Patriots",
//     author: "James Wesley, Rowles",
//     publisher: {
//         //name: 'paladin press'
//     }
// };

// const {name: publisherName = "Self published"} = book.publisher;

// console.log(publisherName);

/// ARRAY DESTRUCTURING
const address = ['1299 S Juniper Street', 'Indiana', 'Muncie', '47303'];
const [astreet, astate, acity, azip] = address;

console.log(`You are in ${acity} ${astate}.`);

const item = ['crap coffee', '$2.00', '$2.50', '$3.50'];
const [coffee, ,medium, ] = item;

console.log(`A medium ${coffee} costs ${medium}`);