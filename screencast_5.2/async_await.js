// A simple function (without async)
// Excecutes line by line top to bottom
console.log("Execution of a normal function\n")

function sayHello() {
    return 'hello';
}

console.log('before')

wish = sayHello()
console.log(wish)

console.log('after')



// Async function
// Created by just adding the keyword 'async' before the keyword 'function'
console.log("\nExecution of an async function\n")

async function sayHello() {
    return 'hello';
}

console.log('before')

wish = sayHello()
console.log(wish)   // This is a promise

console.log('after')


// Use the 'then' method 
// Note the execution order - 'hello' gets printed in the end
console.log("\nUsing 'then' with an async function\n")

async function sayHello() {
    return 'hello';
}

console.log('before')

wish = sayHello()
// console.log(wish)   // This is a promise
wish.then((v) => console.log(v));

console.log('after')


// Add a delay to demonstrate the effect of async  
console.log("\nAdding a delay in async function\n")

async function sayHello_2() {
    return new Promise((resolve, reject) => {
        // resolve after 2 seconds
        // you could be doing non-cpu stuff
        setTimeout(function(){
            resolve('async hello');
        }, 2000);
    });
}

console.log('before function call')

wish2 = sayHello_2()
// console.log(wish2)   // This is a promise
wish2.then((v) => console.log(v));

console.log('at the end')



// 'await' keyword for async functions
// Note: It will throw an error with normal functions
// Note: This will run only in chrome or firefox browser console. Copy paste it in browser console to try this.

// console.log("\nUsing 'await' with async function\n")

// async function sayHello_3() {
//     return new Promise((resolve, reject) => {
//         // resolve after 2 seconds
//         // you could be doing non-cpu stuff
//         setTimeout(function(){
//             resolve('async hello');
//         }, 2000);
//     });
// }

// console.log('before function call')

// wish3 = await sayHello_3()
// console.log(wish3)   // This is a promise
// // wish3.then((v) => console.log(v));

// console.log('at the end')



// Catching error in async functions
// Error is thrown when promise is rejected instead of being resolved
// Copy paste this code in browser console and run
console.log("\nCatching error in async functions\n")

async function sayHello_4() {
    return new Promise((resolve, reject) => {
        // resolve after 2 seconds
        // you could be doing non-cpu stuff
        setTimeout(function(){
            reject('async hello');  // Note that 'reject' is used here instead of resolve.
        }, 2000);
    });
}

console.log('before function call')

wish4 = sayHello_4()
// console.log(wish4)   // This line will throw an error with code: 'ERR_UNHANDLED_REJECTION'
wish4
.then((v) => console.log(v))
.catch(e => {
    console.log('Got error')
    console.log(e);
})

console.log('at the end')



// Catching errors when using 'await' with async functions
// Use 'try/catch' block like we do for any other function
// Copy paste this code in browser console and run
console.log("\nCatching errors when using 'await' with async functions\n")

async function sayHello_5() {
    return new Promise((resolve, reject) => {
        // resolve after 2 seconds
        // you could be doing non-cpu stuff
        setTimeout(function(){
            reject('async hello');  // Note that 'reject' is used here instead of resolve.
        }, 2000);
    });
}

async function greetings(){
    console.log('before')
    try{
        wish5 = await sayHello_5()
        console.log(wish)
        console.log('after')
        return wish
    }catch(e){
        console.log('Got error')
        console.log(e);
    }
    return null
}
x = greetings()


/* Note the difference in catching errors in the following situations
1. With promises, we can simply use the promise.then(do_something).catch(do_something_with_error) style
2. With await functions, we use the try/catch block */