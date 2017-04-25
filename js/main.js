/* Блок переменных и инициализации персонажей */

//"флаг" начатой игры

var gameInProgress; //если равен true, то игра загружает сохранение. 

var personList = ""; 

//переменные счетчиков

var meme = 0; //Мемы
var upgds = 0; //Мемы/cек
var pValue = 0; //Прогресс
var winValue = Math.floor(Math.random() * 500000);

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
		document.getElementById('upgCostKeke').innerHTML = "Update cost: " + Keke.upgCost;
		document.getElementById('upgB1').style.display = '',
		document.getElementById('upgB1').style.display = 'inline';
		document.getElementById('personList').innerHTML = personList;
		document.getElementById('buyKeke').disabled = 'disabled';
		document.getElementById('imgPersonKeke').style.WebkitFilter="grayscale(0%)";
		Keke.personIsBuy = true;
		}
	}
	function upgKeke() {
		if (upgPerson.call(Keke) == true && Keke.upgCount < 4) { 
		document.getElementById('upgCostKeke').innerHTML = "Upgrade cost: " + Keke.upgCost; 
		}
		if (Keke.upgCount == 3) { 
			document.getElementById('upgB1').style.display = 'none',
			document.getElementById('upgCostKeke').innerHTML = 'Keke in final form!'; 
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
		document.getElementById('upgCostJane').innerHTML = "Upgrade cost: " + Jane.upgCost;
		document.getElementById('upgB2').style.display = 'inline';
		document.getElementById('personList').innerHTML = personList;
		document.getElementById('buyJane').disabled = 'disabled';
		document.getElementById('imgPersonJane').style.WebkitFilter="grayscale(0%)";
		Jane.personIsBuy = true;
		}
	}
	function upgJane() {
		if (upgPerson.call(Jane) == true && Jane.upgCount < 4) { 
			document.getElementById('upgCostJane').innerHTML = "Upgrade cost: " + Jane.upgCost;

		}
		if (Jane.upgCount == 3) { 
			document.getElementById('upgB2').style.display = 'none', 
			document.getElementById('upgCostJane').innerHTML = 'Jane in final form!'; 
		}
	}
}

/* Персонаж Баста */

function personBasta(param) {
	switch (param)
	{
		case 'buy':
		return buyBasta();
		break;

		case 'upg':
		return upgBasta();
		break;
	}
	function buyBasta() {
		Basta.memesFirstProd = 30;
		Basta.personCost = 250;
		Basta.upgCost = 350;
		Basta.memesUpgProd = 55;

		if (meme >= Basta.personCost) {
			upgds = upgds + Basta.memesFirstProd;
			meme = meme - Basta.personCost;
			personList = personList + " " + Basta.namePerson;
		//Basta.upgCost = Math.floor(10 * Math.pow(1.1, Basta.upgCount));
		document.getElementById('upg').innerHTML = Basta.memesFirstProd;
		document.getElementById('upgCostBasta').innerHTML = "Update cost: " + Basta.upgCost;
		document.getElementById('upgB3').style.display = '',
		document.getElementById('upgB3').style.display = 'inline';
		document.getElementById('personList').innerHTML = personList;
		document.getElementById('buyBasta').disabled = 'disabled';
		document.getElementById('imgPersonBasta').style.WebkitFilter="grayscale(0%)";
		Basta.personIsBuy = true;
		}
	}
	function upgBasta() {
		if (upgPerson.call(Basta) == true && Basta.upgCount < 4) { 
		document.getElementById('upgCostBasta').innerHTML = "Upgrade cost: " + Basta.upgCost; 
		}
		if (Basta.upgCount == 3) { 
			document.getElementById('upgB3').style.display = 'none',
			document.getElementById('imgPersonBasta').src="img/basta3.png"; 
			document.getElementById('upgCostBasta').innerHTML = 'Basta in final form!'; 
		}
	}
}



/* Блок игровых функций */

function memeClick(num) {
	meme = meme + num,
	document.getElementById('memes').innerHTML = meme;
}

//Функция покупки улучшений для персонажей.

function upgPerson() {
	if (meme >= this.upgCost) {
		this.memesUpgProd = Math.floor(this.memesUpgProd * Math.pow(1.5, this.upgCount));		
		upgds = upgds + this.memesUpgProd;
		meme = meme - this.upgCost;
		this.upgCount++
		this.upgCost = Math.floor(this.personCost * Math.pow(3, this.upgCount));
		return true;
	}
	if(this == undefined) {
		return false;
	}
}

//Таймер для отсчёта времени до получения финальной суммы

function timeOut(meme, upgds) {
	if (meme > 0 && upgds > 0){
		p = winValue - meme;
		sec_ = Math.floor(p / upgds);
		if (sec_ > 0){ 
			hours = (sec_ / 3600);
			hours = parseInt(hours);
			min_= sec_ - (hours * 3600);
			min = parseInt(min_ / 60);
			sec = min_ - (min * 60);
			if (min > 60) { min = min / 60 }
			if (hours < 10) { hours = "0" + hours }
			if (min < 10) { min = "0" + min}
			document.getElementById('timeleft').innerHTML = "Timeleft: " + hours + ":" + min + ":" + sec;
			} else { document.getElementById('timeleft').innerHTML = "Timeleft: " + "00" + ":" + "00" + ":" + "00"; }
	}
}


//Функция рассчёта прогресс-бара

function chkPrgrs(m) {
	if (m > 0) {
		pValue = m,
		pValue = ((pValue / winValue) * 100)
		if (pValue <= 100 && m <= winValue){
			$(document).ready(function(){
				$('.progress-bar').css('width', pValue+'%').attr('aria-valuenow', pValue);
			});
			document.getElementById('prgs').innerHTML = m + "/" + winValue;
		}
		if (pValue >= 100 ){	
			document.getElementById('prgs').innerHTML = winValue + "/" + winValue;
			$('.progress-bar').css('background-color', "#00ff00");
		}	
	}
}

//Функция проверки "доступности" покупки героев

function chkPers(m) {
	if (m >= 10 && !Keke.personIsBuy) { document.getElementById('imgPersonKeke').style.WebkitFilter="grayscale(100%) blur(0px)"; } 
	if (m < 10 && !Keke.personIsBuy) { document.getElementById('imgPersonKeke').style.WebkitFilter="grayscale(100%) blur(10px)"; }

	if (m >= 50 && !Jane.personIsBuy) { document.getElementById('imgPersonJane').style.WebkitFilter="grayscale(100%) blur(0px)"; } 
	if (m < 50 && !Jane.personIsBuy) { document.getElementById('imgPersonJane').style.WebkitFilter="grayscale(100%) blur(10px)"; }
	 	
	if (m >= 100 && !Basta.personIsBuy) { document.getElementById('imgPersonBasta').style.WebkitFilter="grayscale(100%) blur(0px)"; }
	if (m < 100 && !Basta.personIsBuy) { document.getElementById('imgPersonBasta').style.WebkitFilter="grayscale(100%) blur(10px)"; }
} 


/* Блок асинхронных событий */

window.setInterval(function(){
	if(gameInProgress = true){
		memeClick(upgds),
		chkPers(meme)
		chkPrgrs(meme)
		timeOut(meme, upgds)
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
		$(document).ready(function(){
			$('.progress-bar').attr('aria-valuemax', winValue);
		});
		document.getElementById('upgB1').style.display = 'none',
		document.getElementById('upgB2').style.display = 'none',
		document.getElementById('upgB3').style.display = 'none',
		//document.getElementById('upgB4').style.display = 'none',
		//document.getElementById('upgB5').style.display = 'none',
		//initPersons(),
		document.getElementById('imgPersonKeke').style.WebkitFilter="grayscale(100%) blur(10px)";
		document.getElementById('imgPersonJane').style.WebkitFilter="grayscale(100%) blur(10px)";
		document.getElementById('imgPersonBasta').style.WebkitFilter="grayscale(100%) blur(10px)";
		//document.getElementById('imgPersonKali').style.WebkitFilter="grayscale(100%)";
		//document.getElementById('imgPersonOleg').style.WebkitFilter="grayscale(100%)";
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
		pValue: pValue,
		winValue: winValue
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
	if (typeof savegame.pValue != "undefined") {
			pValue = savegame.pValue;
		$('.progress-bar').css('width', pValue+'%').attr('aria-valuenow', pValue);
		}
	if (typeof savegame.winValue != "undefined") {
			winValue = savegame.winValue;
		}
	if (typeof savegame.personList != "undefined") {
		personList = savegame.personList;
		document.getElementById('personList').innerHTML = personList;
		}	
	if (savegame.Keke.personIsBuy != false) {
		Keke = savegame.Keke;
		document.getElementById('buyKeke').disabled = 'disabled';
		document.getElementById('upgCostKeke').innerHTML = "Upgrade cost: " + Keke.upgCost;
		document.getElementById('upgB1').style.display = 'inline';
		document.getElementById('imgPersonKeke').style.WebkitFilter="grayscale(0%)";
			if (Keke.upgCount == 3) { 
			document.getElementById('upgB1').style.display = 'none',
			document.getElementById('upgCostKeke').innerHTML = 'Keke in final form!'; 
			}
		}
	if (savegame.Jane.personIsBuy != false) {
		Jane = savegame.Jane;
		document.getElementById('buyJane').disabled = 'disabled';
		document.getElementById('upgCostJane').innerHTML = Jane.upgCost;
		document.getElementById('upgB2').style.display = 'inline';
		document.getElementById('imgPersonJane').style.WebkitFilter="grayscale(0%)";
			if (Jane.upgCount == 3) { 
			document.getElementById('upgB2').style.display = 'none', 
			document.getElementById('upgCostJane').innerHTML = "Jane in final form!"; 
			}
		}
	if (savegame.Basta.personIsBuy != false) {
		Basta = savegame.Basta;
		document.getElementById('buyBasta').disabled = 'disabled';
		document.getElementById('upgCostBasta').innerHTML = "Upgrade cost: " + Basta.upgCost;
		document.getElementById('upgB3').style.display = 'inline';
		document.getElementById('imgPersonBasta').style.WebkitFilter="grayscale(0%)";
			if (Basta.upgCount == 3) { 
			document.getElementById('upgB3').style.display = 'none',
			document.getElementById('imgPersonBasta').src="img/basta3.png";
			document.getElementById('upgCostBasta').innerHTML = 'Basta in final form!'; 
			}
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

/*
function chngColor(m, u) {
	if (m < 50){
		yClr = yClr + m;
		if (yClr > 215 && zClr < 215) { yClr = 215, zClr = zClr + m }
		clr = 'rgb(' + xClr +',' + yClr + ',' + zClr +')';
		document.getElementById('memes').style.color = clr;
	}
	if (m > 50 && m <100){
		yClr = yClr + m;
		if (yClr > 215 && zClr < 215) { yClr = 215 }
		zClr = zClr + m,
		clr = 'rgb(' + xClr +',' + yClr + ',' + zClr +')';
		document.getElementById('memes').style.color = clr;
	}
}
*/