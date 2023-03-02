'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// let arr = ['a', 'b', 'c', 'd', 'e'];

// // slice
// console.log(arr.slice(1, 4));

// // splice->和slice的原理一樣，但他會直接改變原arr
// // 常常用來
// // console.log(arr.splice(2));
// // arr.splice(-1);
// // console.log(arr);

// // reverse
// const arr2 = ['j', 'i', 'h', 'g', 'h'];
// console.log(arr2);
// console.log(arr2.reverse());
// console.log(arr2);

// // concat
// const letters = arr.concat(arr2);
// console.log(letters);

// // join
// console.log(letters.join(' - '));

//////////////////////////////////////////////
// const arr = [23, 11, 64];
// console.log(arr[0]);
// console.log(arr.at(0));

// console.log(arr.at(-1));

/////////////////////////////////////////////

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// movements.forEach((v, i, arr) => {
//   console.log(`第${i}個 : ${v}`);
//   console.log(arr)
// });

/////////////////////////////////////////////
// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// currencies.forEach((v, k, map) => {
//   console.log(`${k} : ${v}`);
// });

// ////set/////
// const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
// console.log(currenciesUnique);
// currenciesUnique.forEach((v, i, set) => {
//   console.log(`${i} : ${v}`);
// });

///////////////////////////////////////////////////////////////////////

const displayMovements = function (movements) {
  containerMovements.innerHTML = '';

  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__value">${mov} €</div>
        </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

displayMovements(account1.movements);

const calcPrintBalance = function (movements) {
  const balance = movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${balance} €`;
};

calcPrintBalance(account1.movements);

const calcDisplaySummary = function (movements) {
  const incomes = movements
    .filter(v => v > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes} €`;
  const out = movements.filter(v => v < 0).reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)} €`;

  const interest = movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * 1.2) / 100)
    .filter(v => v >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest} €`;
};
calcDisplaySummary(account1.movements);

const createUsername = accounts => {
  accounts.forEach(account => {
    account.username = account.owner
      .toLowerCase()
      .split(' ')
      .map(v => v[0])
      .join('');
  });
};

createUsername(accounts);
// console.log(accounts);

///////////coding test//////////////////

// data 1 : Julia : [3,5,2,12,7] Kate : [4,1,15,8,3]
// data 2 : Julia : [9,16,6,8,3] Kate : [10,5,6,1,4]

// const checkDogs = function (dogJulia, dogKate) {
//   const newDogJulia = dogJulia.slice(1, -1);
//   // console.log(newDogJulia);
//   const allDog = [...newDogJulia, ...dogKate];
//   // console.log(allDog);
//   allDog.forEach((v, i) => {
//     const text =
//       v >= 3 ? `an adult, and is ${v} years old.` : `still a puppy 🐶.`;
//     // console.log(`Dog number ${i + 1} is ${text}`);
//   });
// };

// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
// checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

// const calcAverageHumanAge = dogAges => {
//   const asHumanAges = dogAges
//     .map(dogAge => (dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4))
//     .filter(dogAge => dogAge >= 18)
//     .reduce((acc, cur, i, arr) => {
//       return acc + cur / arr.length;
//     }, 0);

//   console.log(asHumanAges);
// };
// calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);

/////////////////////////////map method/////////////////////////
// const eurToUsd = 1.1;

// const movementsUSD = movements.map(mov => mov * eurToUsd);

// console.log(movementsUSD);

//////////////////////filter///////////////////////////
// const deposits = movements.filter(function (mov) {
//   return mov > 0;
// });

// console.log(movements);
// console.log(deposits);

// const withdrawals = movements.filter(mov => mov < 0);
// console.log(withdrawals);
// //////////////////////////////reduce///////////////////

// const balance = movements.reduce(function (acc, cur, i, arr) {
//   return acc + cur;
// });
// console.log(balance);
