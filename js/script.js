"use strict";

const isNumber = n => !isNaN(parseFloat(n)) && isFinite(n);



	let start = document.getElementById('start'),
		cancel = document.getElementById('cancel'),
		btnPlus = document.getElementsByTagName('button'),
		incomePlus = btnPlus[0],
		expensesPlus = btnPlus[1],
		getCheckBox = document.querySelector('#deposit-check'),
		additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
		budgetMonthValue = document.querySelector('.result-budget_month input'),
		budgetDayValue = document.querySelector('.result-budget_day input'),
		expensesMonthValue = document.querySelector('.result-expenses_month input'),
		additionalIncomevalue = document.querySelector('.result-additional_income input'),
		additionalExpensesvalue = document.querySelector('.result-additional_expenses input'),
		additionalExpensesItem = document.querySelector('.additional_expenses-item'),
		incomePeriodValue = document.querySelector('.result-income_period input'),
		targetMonthValue = document.querySelector('.result-target_month input'),
		salaryAmount = document.querySelector('.salary-amount'),
		getExpenseName = document.getElementsByClassName('expenses-title'),
		expensesItems = document.querySelectorAll('.expenses-items'),
		getTargetAmount = document.querySelector('.target-amount'),
		getSum = document.querySelector('.deposit-amount'),
		additionalExpenses = document.querySelector('.additional_expenses'),
		getProcent = document.querySelector('.deposit-percent'),
		incomeItems = document.querySelectorAll('.income-items'),
		periodSelect = document.querySelector('.period-select'),
		periodAmount = document.querySelector('.period-amount'),
		depositBank = document.querySelector('.deposit-bank'),
		depositAmount = document.querySelector('.deposit-amount'),
		depositPercent = document.querySelector('.deposit-percent'),
		textInputs = document.querySelectorAll('input[type=text]');

	class AppData {
			constructor() {
				this.budget = 0;
				this.budgetDay = 0;
				this.budgetMonth = 0;
				this.income = {};
				this.incomeMonth = 0;
				this.addIncome = [];
				this.expenses = {};
				this.addExpenses = [];
				this.expensesMonth = 0;
				this.deposit = false;
				this.percentDeposit = 0;
				this.moneyDeposit = 0;
			}
		
			reset() {
				this.budget = 0;
				this.budgetDay = 0;
				this.budgetMonth = 0;
				this.income = {};
				this.incomeMonth = 0;
				this.addIncome = [];
				this.expenses = {};
				this.addExpenses = [];
				this.expensesMonth = 0;
				this.deposit = false;
				this.percentDeposit = 0;
				this.moneyDeposit = 0;

				textInputs = document.querySelectorAll('input[type=text]');
		
				textInputs.forEach(item => {
					item.value = '';
					item.removeAttribute('disabled', 'true');
				});
				periodSelect.value = 1;
				periodAmount.textContent = 1;
				getCheckBox.checked = false;
				this.depositHandler();
				this.changePercent();
		
				if (expensesItems[2] && expensesItems[1]) {
					expensesItems[1].remove();
					expensesItems[2].remove();
					expensesPlus.style.display = 'block';
				} else if (expensesItems[1]) {
					expensesItems[1].remove();
				}
		
				if (incomeItems[2] && incomeItems[1]) {
					incomeItems[1].remove();
					incomeItems[2].remove();
					incomePlus.style.display = 'block';
				} else if (incomeItems[1]) {
					incomeItems[1].remove();
				}
			}
		
			start() {
				this.budget = +salaryAmount.value;
				this.getIncome();
				this.getExpenses();
				this.getExpensesMonth();
				this.getAddExpenses();
				this.getAddIncome();
				if (getCheckBox.checked) {
					this.getInfoDeposit();
				}
				this.getBudget();
				this.disableInputs();
		
				this.showResult();
			}

			showResult  ()  {
				const _this = this;
				budgetMonthValue.value = this.budgetMonth;
				budgetDayValue.value = this.budgetDay;
				expensesMonthValue.value = this.expensesMonth;
				additionalExpensesvalue.value = this.addExpenses.join(', ');
				additionalIncomevalue.value = this.addIncome.join(', ');
				targetMonthValue.value = this.getTargetMonth();
				incomePeriodValue.value = this.calcPeriod();
			}
			addExpensesBlock () {
				const cloneExpensesItem = expensesItems[0].cloneNode(true);
				cloneExpensesItem.querySelector('.expenses-title').value = '';
				cloneExpensesItem.querySelector('.expenses-amount').value = '';
				expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
				expensesItems = document.querySelectorAll('.expenses-items');
				if(expensesItems.length === 3) {
					expensesPlus.style.display = 'none';
				}
			}
			getExpenses  () {
				const _this = this;
				expensesItems.forEach(function(item){
					const itemExpenses = item.querySelector('.expenses-title').value;
					const cashExpenses = item.querySelector('.expenses-amount').value;
					if(itemExpenses !== '' && cashExpenses !== '') {
						_this.expenses[itemExpenses] = +cashExpenses;
					}
				});
				
			}
			addIncomeBlock  () {
				const cloneIncomeItem = incomeItems[0].cloneNode(true);
				incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
				incomeItems = document.querySelectorAll('.income-items');
				if(incomeItems.length === 3) {
					incomePlus.style.display = 'none';
				}
				// 
			}
			getIncome (){
				const _this = this;
					incomeItems.forEach(function(item){
					const itemIncome = item.querySelector('.income-title').value;
					const cashIncome = item.querySelector('.income-amount').value;
					if(itemIncome !== '' && cashIncome !== '') {
						_this.income[itemIncome] = cashIncome;
					}
				});
				// 
				for (let key in _this.income) {
					_this.incomeMonth += +_this.income[key];
				}
				// 
			}

			getAddExpenses () {
				const addExpenses = additionalExpensesItem.value.split(", ");
				const _this = this;
				addExpenses.forEach(function(item){
					item = item.trim();
					if (item !== '' ){
						_this.addExpenses.push(item);
					}
				});
			}
	
			getAddIncome  () {
				const _this = this;
				 additionalIncomeItem.forEach(function(item) {
					let itemValue = item.value.trim();
					if (itemValue !== '' ) {
						_this.addIncome.push(itemValue);
					}
				});
			}
			
			getExpensesMonth  () {
				for ( let key in this.expenses) {
					this.expensesMonth += this.expenses[key];
				}
			}

			getBudget  ()  {
				const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
				this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
				this.budgetDay = Math.floor(this.budgetMonth / 30);
				return;
			}
	
			getTargetMonth  ()  {
				return Math.ceil(getTargetAmount.value / this.budgetMonth);
			}
		
			getStatusIncome  ()  {
				if (this.budgetDay >= 1200) {
					return("У вас высокий уровень дохода");
				} else if (this.budgetDay > 600 && this.budgetDay < 1200) {
					return('У вас средний уровень дохода');
				} else if (this.budgetDay <=600 && this.budgetDay  > 0) {
					return('К сожалению у вас уровень дохода ниже среднего');
				} else if (this.budgetDay < 0) {
					return('Что то пошло не так');
				}
			}
			disableInputs() {
				textInputs = document.querySelectorAll('input[type=text]');
				textInputs.forEach(item => {
					item.setAttribute('disabled', 'true');
				});
			}
			calcPeriod  ()  {
				return  this.budgetMonth * periodSelect.value;
				}
			changePercent() {
				const valueSelect = this.value;
				if (valueSelect === 'other') {
					depositPercent.value = '';
					depositPercent.style.display = 'inline-block';
				} else {
					depositPercent.style.display = 'none';
					depositPercent.value = valueSelect;
				}
			}
		
			getInfoDeposit() {
				this.persentItem();
				if (this.deposit) {
					this.percentDeposit = depositPercent.value;
					this.moneyDeposit = depositAmount.value;
				}
			}
		
			persentItem() {
				if (!isNumber(depositPercent.value) || (depositPercent.value < 1 || depositPercent.value === 100)) {
					alert('Введите корректное число в поле "Процент"');
					start.removeEventListener('click');
				} else if (!isNumber(depositAmount.value) || depositAmount.value === '') {
					alert('Введите корректное число в поле "Процент"');
					start.removeEventListener('click');
				}
				
			}
		
			depositHandler() {   //депозит банков 
				if (getCheckBox.checked) {
					depositBank.style.display = 'inline-block';
					depositAmount.style.display = 'inline-block';
					this.deposit = true;
					depositBank.addEventListener('change', this.changePercent);
				} else {
					depositBank.style.display = 'none';
					depositAmount.style.display = 'none';
					depositBank.value = '';
					depositAmount.value = '';
					this.deposit = false;
					depositBank.removeEventListener('change', this.changePercent);
				}
			}

				eventListeners() {
					const _this = this;
					start.addEventListener('click', () => {
						_this.start.bind(_this);
						if (salaryAmount.value === '') {
							alert('Ошибка, поле "Месячный доход пусто"');
							return;
						} else {
							_this.start();
							start.style.display = 'none';
							cancel.style.display = 'block';
						}
					});
					incomePlus.addEventListener('click', _this.addIncomeBlock);
					expensesPlus.addEventListener('click', _this.addExpensesBlock);

					cancel.addEventListener('click', () => {
						const _this = this;
						_this.reset();
						start.style.display = 'block';
						cancel.style.display = 'none';
					});
					periodSelect.addEventListener('input', e => {
						const _this = this;
						periodAmount.textContent = e.target.value;
						incomePeriodValue.value = _this.calcPeriod();
					});
					getCheckBox.addEventListener('change', this.depositHandler.bind(this));
		}
	}

	const appData = new AppData();
	// console.log(appData);
	appData.eventListeners();




	// function isString(n) {
// 	return !isNaN(parseFloat(n)) && isFinite(n);
// }