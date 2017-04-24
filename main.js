/* Блок переменных и инициализации персонажей */

//"флаг" начатой игры

var gameInProgress; //если равен true, то игра загружает сохранение. 

var personList = ""; 

//переменные счетчиков

var meme = 0;
var upgds = 0;

//инициализация персонажей (глобальные объекты)

var Keke = new memePerson("Keke");
var Jane = new memePerson("Jane");
var Basta = new memePerson("Basta");
var Kali = new memePerson("Kalli");
var Oleg = new memePerson("Oleg");

/* Блок конструктора и инициализации объектов персонажей */

function memePerson(name) {
	this.personCost = 10;
	this.memesFirstProd = 1;
	this.memesUpgProd = 0;
	this.upgCost = 10;
	this.upgCount = 0;
	this.namePerson = name;
	this.personIsBuy = false;

}

/* Персонаж Кеке */

function personKeke(param) {
	switch (param)
	{
		case 'buy':
		return buyKeke();
		break;

		case 'upg':
		return upgKeke();
		break;
	}
	function buyKeke() {
		Keke.memesFirstProd = 1;
		Keke.personCost = 10;
		Keke.upgCost = 10;
		Keke.memesUpgProd = 5;

		if (meme >= Keke.personCost) {
			upgds = upgds + Keke.memesFirstProd;
			meme = meme - Keke.personCost;
			personList = personList + " " + Keke.namePerson;
		//Keke.upgCost = Math.floor(10 * Math.pow(1.1, Keke.upgCount));
		document.getElementById('upg').innerHTML = Keke.memesFirstProd;
		document.getElementById('upgCostKeke').innerHTML = Keke.upgCost;
		document.getElementById('upgB1').style.display = 'inline';
		document.getElementById('buyKeke').innerHTML = 'Keke';
		document.getElementById('personList').innerHTML = personList;
		document.getElementById('buyKeke1').disabled = 'disabled';
		document.getElementById('imgPersonKeke').style.WebkitFilter="grayscale(0%)";
		Keke.personIsBuy = true;
		}
	}
	function upgKeke() {
		if (upgPerson.call(Keke) == true && Keke.upgCount < 4) { 
		document.getElementById('buyKeke').innerHTML = "Keke" + " " + "Upgrades: " + Keke.upgCount;
		document.getElementById('upgCostKeke').innerHTML = Keke.upgCost; 
		}
		if (Keke.upgCount == 3) { 
			document.getElementById('upgB1').style.display = 'none',
			document.getElementById('upgCostKeke').innerHTML = ''; 
		}
	}
}

/* Персонаж Жане */

function personJane(param) {
	switch (param)
	{
		case 'buy':
		return buyJane();
		break;

		case 'upg':
		return upgJane();
		break;
	}
	function buyJane() {
		Jane.memesFirstProd = 15;
		Jane.personCost = 50;
		Jane.upgCost = 30;
		Jane.memesUpgProd = 25;

		if (meme >= Jane.personCost) {
			upgds = upgds + Jane.memesFirstProd;
			meme = meme - Jane.personCost;
			personList = personList + " " + Jane.namePerson;
		//Jane.upgCost = Math.floor(10 * Math.pow(1.1, Jane.upgCount));
		document.getElementById('upg').innerHTML = Jane.memesFirstProd;
		document.getElementById('upgCostJane').innerHTML = Jane.upgCost;
		document.getElementById('upgB2').style.display = 'inline';
		document.getElementById('buyJane').innerHTML = 'Jane';
		document.getElementById('personList').innerHTML = personList;
		document.getElementById('buyJane').disabled = 'disabled';
		Jane.personIsBuy = true;
		}
	}
	function upgJane() {
		if (upgPerson.call(Jane) == true && Jane.upgCount < 4) { 
			document.getElementById('buyJane').innerHTML = "Jane" + " " + "Upgrades: " + Jane.upgCount;
			document.getElementById('upgCostJane').innerHTML = Jane.upgCost; 
		}
		if (Jane.upgCount == 3) { 
			document.getElementById('upgB2').style.display = 'none', 
			document.getElementById('upgCostJane').innerHTML = ''; 
		}
	}
}

/* Блок игровых функций */

function memeClick(num) {
	meme = meme + num;	
	document.getElementById('memes').innerHTML = meme;
};

//Функция покупки улучшений для персонажей.

function upgPerson() {
	if (meme >= this.upgCost) {
		this.memesUpgProd = Math.floor(this.memesUpgProd * Math.pow(2, this.upgCount));		
		upgds = upgds + this.memesUpgProd;
		meme = meme - this.upgCost;
		this.upgCount++
		this.upgCost = Math.floor(this.personCost * Math.pow(5, this.upgCount));
		return true;
	}
	if(this == undefined) {
		return false;
	}
}

/* Блок асинхронных событий */

window.setInterval(function(){
	if(gameInProgress = true){
		memeClick(upgds)
	};
	document.getElementById('upg').innerHTML = upgds;
}, 1000);

window.setInterval(function(){
	save();
	document.getElementById('autosave').style.display = "inline"
	document.getElementById('autosave').innerHTML = "autosave complete";
}, 10000);

window.setInterval(function(){
	save();
	document.getElementById('autosave').style.display = "none"
	document.getElementById('autosave').innerHTML = "";
}, 11000);



/* Блок системных функций */

function initGame() {				//Функция инициализации игры
	if (!gameInProgress) {			//Если флаг уже начатой игры равен false, то загрузить начальные значения счетчиков.
		document.getElementById('upg').innerHTML = upgds,
		document.getElementById('memes').innerHTML = meme,
		//initPersons(),
		document.getElementById('imgPersonKeke').style.WebkitFilter="grayscale(100%)";
		gameInProgress = true;
	};
	resumeGame();
}

function save() {

	var save = {
		meme: meme,
		upgds: upgds,
		Keke: Keke,
		Jane: Jane,
		Basta: Basta,
		Kali: Kali,
		Oleg: Oleg,
		personList: personList,
		//Остальные переменные сюда
		}
	localStorage.setItem('save', JSON.stringify(save));
	localStorage['check.gameInProgress'] = gameInProgress;
};

function load() {
	var savegame = JSON.parse(localStorage.getItem("save"));
	if (typeof savegame.meme != "undefined") {
		meme = savegame.meme;
		document.getElementById('memes').innerHTML = meme
		}
	if (typeof savegame.upgds != "undefined") {
		upgds = savegame.upgds;
		document.getElementById('upg').innerHTML = upgds 
		}
	if (typeof savegame.personList != "undefined") {
		personList = savegame.personList;
		document.getElementById('personList').innerHTML = personList;
		}	
	if (savegame.Keke.personIsBuy != false) {
		Keke = savegame.Keke;
		document.getElementById('buyKeke').innerHTML = 'Keke';
		document.getElementById('buyKeke').disabled = 'disabled';
		document.getElementById('upgCostKeke').innerHTML = Keke.upgCost;
		document.getElementById('upgB1').style.display = 'inline';
		document.getElementById('imgPersonKeke').style.WebkitFilter="grayscale(0%)";
			if(Keke.upgCount > 0) { document.getElementById('buyKeke').innerHTML = "Keke" + " " + "Upgrades: " + Keke.upgCount; }
			if (Keke.upgCount == 3) { 
			document.getElementById('upgB1').style.display = 'none',
			document.getElementById('upgCostKeke').innerHTML = ''; 
			}
		}
	if (savegame.Jane.personIsBuy != false) {
		Jane = savegame.Jane;
		document.getElementById('buyJane').innerHTML = 'Jane';
		document.getElementById('buyJane').disabled = 'disabled';
		document.getElementById('upgCostJane').innerHTML = Jane.upgCost;
		document.getElementById('upgB2').style.display = 'inline';
			if (Jane.upgCount > 0) { document.getElementById('buyJane').innerHTML = "Jane" + " " + "Upgrades: " + Jane.upgCount; }
			if (Jane.upgCount == 3) { 
			document.getElementById('upgB2').style.display = 'none', 
			document.getElementById('upgCostJane').innerHTML = ''; 
			}
		}
	if (savegame.Basta.personIsBuy != false) {
		document.getElementById('buyBasta').innerHTML = 'Basta';
		}
	if (savegame.Kali.personIsBuy != false) {
		document.getElementById('buyKali').innerHTML = 'Kali';
		}
	if (savegame.Oleg.personIsBuy != false) {
		document.getElementById('buyOleg').innerHTML = 'Oleg';
		}
}

function resumeGame() {
	gameInProgress = (localStorage['check.gameInProgress'] == "true");
	if (!gameInProgress) { return false };
	load();
}

function removeSave() {
	localStorage.removeItem("save");

}
















/* ==================================================== */

/*
function buyUpg() {
	var upgCost = Math.floor(10 * Math.pow(1.5, upgds)); //релизация формулы экспоненциального роста стоимости апгрейда
	if (meme >= upgCost) {
		upgds = upgds + 1;
		meme = meme - upgCost;
		document.getElementById('upg').innerHTML = upgds;
		document.getElementById('memes').innerHTML = meme;
	};
	var nextCost = Math.floor(10 * Math.pow(1.5, upgds));
	document.getElementById('upgCost').innerHTML = nextCost;
};
*/

/*

function initPersons() {
	var Keke = new memePerson("Кеке");
	Keke.memesFirstProd = 1;
	Keke.personCost = 10;
	Keke.memesUpgProd = 20;
	Keke.upgCount = 0;
	Keke.upgCost = Math.floor(10 * Math.pow(1.1, Keke.upgCount));

	var Jane = new memePerson("Жане");
	Jane.memesFirstProd = 10;
	Jane.personCost = 20;

	var Basta = new memePerson("Баста");
	Basta.memesFirstProd = 15;

	var Kali = new memePerson("Калли");
	Kali.memesFirstProd = 25;

	var Oleg = new memePerson("Олег");
	Oleg.memesFirstProd = 50;

}
*/

/*
function upgKeke() {
	var upgClone = {};	
	for (var key in window.Keke) {
		upgClone[key] = Keke[key];
	}
	upgPerson.call(upgClone);

	if (!upgPerson()) {	upgPerson.call(window.Keke); }

}
*/