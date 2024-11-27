let price = 19.5;
let cid = [
  ['PENNY', 0.5],
  ['NICKEL', 0],
  ['DIME', 0],
  ['QUARTER', 0],
  ['ONE', 0],
  ['FIVE', 0],
  ['TEN', 0],
  ['TWENTY', 0],
  ['ONE HUNDRED', 0]
];
const values = [0.01, 0.05, 0.10, 0.25, 1, 5, 10, 20, 100];
let indexArray = [];
let j = 0;

const cash = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const changeDue = document.getElementById("change-due");
const credit = parseFloat(cash.value);

const calculatePurchase = credit => {
  changeDue.innerText = "Status: ";
  let balance = credit - price;
  const registerCash = cid.reduce((total, denomination) => total + denomination[1], 0);
  if (registerCash === balance) {
    changeDue.innerText = "Status: CLOSED";
    cid.forEach(([denomination, amount]) => {
      if (amount > 0) {
        changeDue.innerText += ` ${denomination}: $${amount.toFixed(2)}`;
      }
    });
    return;
  }
  for (let i = 8; i >= 0; i--) {
    while (balance >= values[i] && cid[i][1] >= values[i]) {
      balance = balance.toFixed(2) - values[i];
      cid[i][1] -= values[i];
      j++;
    }
    if (j) {
      changeDue.innerText += ` OPEN ${cid[i][0]}: $${j*values[i]}`;
      j = 0;
    }
  }
  if (balance !== 0) {
    changeDue.innerText = "Status: INSUFFICIENT_FUNDS";
  }
}

purchaseBtn.addEventListener("click", () => {
  const credit = parseFloat(cash.value);
  if (credit < price) {
    alert("Customer does not have enough money to purchase the item");
  }
  else if (credit == price) {
    changeDue.innerText = "No change due - customer paid with exact cash";
  }
  else {
    changeDue.innerText = "Status: CLOSED";
    calculatePurchase(credit);
  }
})
