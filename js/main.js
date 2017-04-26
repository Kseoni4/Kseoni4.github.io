/* Блок переменных и инициализации персонажей */

//"флаг" начатой игры

var gameInProgress; //если равен true, то игра загружает сохранение. 

var personList = ""; //строка приобретённных песонажей

//переменные счетчиков

var meme = 0; //Мемы
var upgds = 0; //Мемы/cек
var pValue = 0; //Прогресс
var winValue = 1000000; //Итоговая сумма
//var winValue = Math.floor(Math.random() * 500000);

//инициализация персонажей (глобальные объекты)

var Keke = new memePerson("Keke");
var Jane = new memePerson("Jane");
var Basta = new memePerson("Basta");
var Cali = new memePerson("Cali");
var Oleg = new memePerson("Oleg");

/* Блок конструктора и инициализации объектов персонажей */

function memePerson(name) {
	this.personCost = 10;
	this.memesFirstProd = 1;
	this.memesUpgProd = 0;
	this.upgCost = 10;
	this.upgCount = 0;
	this.namePerson = name;
	this.personNum = 0;
	this.personIsBuy = false;

}

/* Блок игровых функций */

function memeClick(num) {
	meme = meme + num,
	document.getElementById('memes').innerHTML = meme;
}

//Функции покупки персонажей

function buyPerson_(person) {
	buyPerson.call(person)
}

function buyPerson() {
	if (meme >= this.personCost) {
			upgds = upgds + this.memesFirstProd;
			meme = meme - this.personCost;
			personList = personList + " " + this.namePerson;
		//this.upgCost = Math.floor(10 * Math.pow(1.1, this.upgCount));
		document.getElementById('upg').innerHTML = this.memesFirstProd;
		document.getElementById('upgCost' + this.namePerson).innerHTML = "Update cost: " + this.upgCost;
		document.getElementById('upgB' + this.personNum).style.display = '',
		document.getElementById('upgB' + this.personNum).style.display = 'inline';
		document.getElementById('personList').innerHTML = personList;
		document.getElementById('buy' + this.namePerson).disabled = 'disabled';
		document.getElementById('imgPerson' + this.namePerson).style.WebkitFilter="grayscale(0%)";
		this.personIsBuy = true;
	}
}


//Функции покупки улучшений для персонажей.

function upgPerson_(person) {
	upgPerson.call(person);
		
	}

function upgPerson() {
	if(this.upgCount < 4) { 	
		if (meme >= this.upgCost) {
			this.memesUpgProd = Math.floor(this.memesUpgProd * Math.pow(1.5, this.upgCount));		
			upgds = upgds + this.memesUpgProd;
			meme = meme - this.upgCost;
			this.upgCount++
			this.upgCost = Math.floor(this.upgCost * Math.pow(3, this.upgCount));
			document.getElementById('imgPerson' + this.namePerson).src="img/" + this.namePerson + (this.upgCount + 1) + ".png"; 
			document.getElementById('upgCost' + this.namePerson).innerHTML = "Upgrade cost: " + this.upgCost; 
		}
		if (this.upgCount == 3) { 
			document.getElementById('upgB' + this.personNum).style.display = 'none',
			document.getElementById('upgCost' + this.namePerson).innerHTML = this.namePerson + " " + 'in final form!';
			document.getElementById('imgPerson' + this.namePerson).src="img/" + this.namePerson + "3.png"; 
			document.getElementById('buy' + this.namePerson).style.opacity = 1;
		}
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
		if (sec_ > 0) { 
			hours = (sec_ / 3600);
			hours = parseInt(hours);
			min_= sec_ - (hours * 3600);
			min = parseInt(min_ / 60);
			sec = min_ - (min * 60);
			if (min > 60) { min = min / 60 }
			if (hours < 10) { hours = "0" + hours }
			if (min < 10) { min = "0" + min}
			if (sec < 10) { sec = "0" + sec}
			document.getElementById('timeleft').innerHTML = "Timeleft to max memes: " + hours + ":" + min + ":" + sec;
		} 	else { document.getElementById('timeleft').innerHTML = "Timeleft: " + "00" + ":" + "00" + ":" + "00" + " Over! Pepe is happy!"; }
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
	if (m >= Keke.personCost && !Keke.personIsBuy) { document.getElementById('imgPersonKeke').style.WebkitFilter="grayscale(100%) blur(0px)"; } 
	if (m < Keke.personCost && !Keke.personIsBuy) { document.getElementById('imgPersonKeke').style.WebkitFilter="grayscale(100%) blur(10px)"; }

	if (m >= Jane.personCost && !Jane.personIsBuy) { document.getElementById('imgPersonJane').style.WebkitFilter="grayscale(100%) blur(0px)"; } 
	if (m < Jane.personCost && !Jane.personIsBuy) { document.getElementById('imgPersonJane').style.WebkitFilter="grayscale(100%) blur(10px)"; }
	 	
	if (m >= Basta.personCost && !Basta.personIsBuy) { document.getElementById('imgPersonBasta').style.WebkitFilter="grayscale(100%) blur(0px)"; }
	if (m < Basta.personCost && !Basta.personIsBuy) { document.getElementById('imgPersonBasta').style.WebkitFilter="grayscale(100%) blur(10px)"; }
	
	if (m >= Cali.personCost && !Cali.personIsBuy) { document.getElementById('imgPersonCali').style.WebkitFilter="grayscale(100%) blur(0px)"; } 
	if (m < Cali.personCost && !Cali.personIsBuy) { document.getElementById('imgPersonCali').style.WebkitFilter="grayscale(100%) blur(10px)"; }
	
	if (m >= Oleg.personCost && !Oleg.personIsBuy) { document.getElementById('imgPersonOleg').style.WebkitFilter="grayscale(100%) blur(0px)"; } 
	if (m < Oleg.personCost && !Oleg.personIsBuy) { document.getElementById('imgPersonOleg').style.WebkitFilter="grayscale(100%) blur(10px)"; }
} 

//Функция проверки Пепе

function chkPepe(m) {
	if (m < 10) { document.getElementById('pepe').src="img/1.png" }
	if (m >= 10) { document.getElementById('pepe').src="img/2a.png" }
	if (m >= 100) { document.getElementById('pepe').src="img/2b.png" }
	if (m >= 500) { document.getElementById('pepe').src="img/2.png" }
	if (m >= 1000) { document.getElementById('pepe').src="img/3.png" }
	if (m >= 5000) { document.getElementById('pepe').src="img/5.png" }	
	if (m >= 10000) { document.getElementById('pepe').src="img/4.png" }
	if (m >= 100000) { document.getElementById('pepe').src="img/6.png" }
	if (m >= 1000000) { document.getElementById('pepe').src="img/7.png" }
}

//Округление числа

function chkMeme(m) {
	if (m >= 1000000) { m = Math.round(m / 1000000), document.getElementById('memes').innerHTML = m + "M" };
	if (m >= 1000000000) { m = Math.round(m / 1000000000), document.getElementById('memes').innerHTML = m + "B" };
}

/* Блок асинхронных событий */

//Функция действий раз в секунду.

window.setInterval(function(){
	if(gameInProgress = true){
		memeClick(upgds),
		chkPers(meme)
		chkPrgrs(meme)
		chkPepe(meme)
		chkMeme(meme)
		timeOut(meme, upgds)
	};
	document.getElementById('upg').innerHTML = upgds;
}, 1000);

//Функция автосохранения каждые 10 секунд.

window.setInterval(function(){
	save();
	document.getElementById('autosave').style.display = "inline"
	document.getElementById('autosave').innerHTML = "autosave complete";
}, 10000);

//Функция замещения сообщения об успешном автосохранении

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
		initPersons(); //Инициализация характеристик персонажей
		initStyles();  //Инициализация стилей у картинок.	
		gameInProgress = true;
	}
resumeGame();	
};
	

function initPersons(){ //Инициализация характеристик персонажей
		Keke.personNum = 1;
		Keke.memesFirstProd = 1;
		Keke.personCost = 10;
		Keke.upgCost = 15;
		Keke.memesUpgProd = 5;
		
		Jane.personNum = 2;
		Jane.memesFirstProd = 15;
		Jane.personCost = 300;
		Jane.upgCost = 25;
		Jane.memesUpgProd = 30;
		
		Basta.personNum = 3;
		Basta.memesFirstProd = 50;
		Basta.personCost = 3000;
		Basta.upgCost = 400;
		Basta.memesUpgProd = 150;
		
		Cali.personNum = 4;
		Cali.memesFirstProd = 100;
		Cali.personCost = 9000;
		Cali.upgCost = 1000;
		Cali.memesUpgProd = 250;

		Oleg.personNum = 5;
		Oleg.memesFirstProd = 550;
		Oleg.personCost = 100000;
		Oleg.upgCost = 3500;
		Oleg.memesUpgProd = 1000;
		return true;
}

function initStyles() { //Инициализация стилей у картинок
		document.getElementById('upgB1').style.display = 'none',
		document.getElementById('upgB2').style.display = 'none',
		document.getElementById('upgB3').style.display = 'none',
		document.getElementById('upgB4').style.display = 'none',
		document.getElementById('upgB5').style.display = 'none',

		document.getElementById('imgPersonKeke').style.WebkitFilter="grayscale(100%) blur(10px)";
		document.getElementById('imgPersonKeke').title="Cost: " + Keke.personCost;
		document.getElementById('imgPersonJane').style.WebkitFilter="grayscale(100%) blur(10px)";
		document.getElementById('imgPersonJane').title="Cost: " + Jane.personCost;
		document.getElementById('imgPersonBasta').style.WebkitFilter="grayscale(100%) blur(10px)";
		document.getElementById('imgPersonBasta').title="Cost: " + Basta.personCost;
		document.getElementById('imgPersonCali').style.WebkitFilter="grayscale(100%) blur(10px)";
		document.getElementById('imgPersonCali').title="Cost: " + Cali.personCost;
		document.getElementById('imgPersonOleg').style.WebkitFilter="grayscale(100%) blur(10px)";
		document.getElementById('imgPersonOleg').title="Cost: " + Oleg.personCost;
}

function save() { 

	var save = {
		meme: meme,
		upgds: upgds,
		Keke: Keke,
		Jane: Jane,
		Basta: Basta,
		Cali: Cali,
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
		document.getElementById('imgPerson' + Keke.namePerson).src="img/" + Keke.namePerson + (Keke.upgCount + 1) + ".png"; 
			if (Keke.upgCount == 3) { 
			document.getElementById('upgB1').style.display = 'none',
			document.getElementById('imgPerson' + Keke.namePerson).src="img/" + Keke.namePerson + "3.png"; 
			document.getElementById('upgCostKeke').innerHTML = 'Keke in final form!'; 
			document.getElementById('buyKeke').style.opacity = 1;

			}
		}
	if (savegame.Jane.personIsBuy != false) {
		Jane = savegame.Jane;
		document.getElementById('buyJane').disabled = 'disabled';
		document.getElementById('upgCostJane').innerHTML = Jane.upgCost;
		document.getElementById('upgB2').style.display = 'inline';
		document.getElementById('imgPersonJane').style.WebkitFilter="grayscale(0%)";
		document.getElementById('imgPerson' + Jane.namePerson).src="img/" + Jane.namePerson + (Jane.upgCount + 1) + ".png"; 
			if (Jane.upgCount == 3) { 
			document.getElementById('upgB2').style.display = 'none', 
			document.getElementById('imgPerson' + Jane.namePerson).src="img/" + Jane.namePerson + "3.png"; 
			document.getElementById('upgCostJane').innerHTML = "Jane in final form!"; 
			document.getElementById('buyJane').style.opacity = 1;
			}
		}
	if (savegame.Basta.personIsBuy != false) {
		Basta = savegame.Basta;
		document.getElementById('buyBasta').disabled = 'disabled';
		document.getElementById('upgCostBasta').innerHTML = "Upgrade cost: " + Basta.upgCost;
		document.getElementById('upgB3').style.display = 'inline';
		document.getElementById('imgPersonBasta').style.WebkitFilter="grayscale(0%)";
		document.getElementById('imgPerson' + Basta.namePerson).src="img/" + Basta.namePerson + (Basta.upgCount + 1) + ".png"; 
			if (Basta.upgCount == 3) { 
			document.getElementById('upgB3').style.display = 'none',
			document.getElementById('imgPersonBasta').src="img/Basta3.png";
			document.getElementById('upgCostBasta').innerHTML = 'Basta in final form!'; 
			document.getElementById('buyBasta').style.opacity = 1;
			}
		}

	if (savegame.Cali.personIsBuy != false) {
		Cali = savegame.Cali;
		document.getElementById('buyCali').disabled = 'disabled';
		document.getElementById('upgCostCali').innerHTML = "Upgrade cost: " + Cali.upgCost;
		document.getElementById('upgB4').style.display = 'inline';
		document.getElementById('imgPersonCali').style.WebkitFilter="grayscale(0%)";
		document.getElementById('imgPerson' + Cali.namePerson).src="img/" + Cali.namePerson + (Cali.upgCount + 1) + ".png"; 
			if (Cali.upgCount == 3) { 
			document.getElementById('upgB4').style.display = 'none',
			document.getElementById('imgPerson' + Cali.namePerson).src="img/" + Cali.namePerson + "3.png"; 
			document.getElementById('upgCostCali').innerHTML = 'Cali in final form!'; 
			document.getElementById('buyCali').style.opacity = 1;
			}
		}
	if (savegame.Oleg.personIsBuy != false) {
		Oleg = savegame.Oleg;
		document.getElementById('buyOleg').disabled = 'disabled';
		document.getElementById('upgCostOleg').innerHTML = "Upgrade cost: " + Oleg.upgCost;
		document.getElementById('upgB5').style.display = 'inline';
		document.getElementById('imgPersonOleg').style.WebkitFilter="grayscale(0%)";
		document.getElementById('imgPerson' + Oleg.namePerson).src="img/" + Oleg.namePerson + (Oleg.upgCount + 1) + ".png"; 
			if (Oleg.upgCount == 3) { 
			document.getElementById('upgB5').style.display = 'none',
			document.getElementById('imgPerson' + Oleg.namePerson).src="img/" + Oleg.namePerson + "3.png"; 
			document.getElementById('upgCostOleg').innerHTML = 'Oleg in final form!'; 
			document.getElementById('buyOleg').style.opacity = 1;
			}
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


/* Персонаж Кеке */

/*
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
			document.getElementById('buyKeke').style.opacity = 1;
		}
	}
}
*/

/* Персонаж Жане */
/*
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
		Jane.upgCost = 25;
		Jane.memesUpgProd = 20;

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
			document.getElementById('buyJane').style.opacity = 1;			
		}
	}
}
*/
/* Персонаж Баста */
/*
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
		Basta.memesFirstProd = 25;
		Basta.personCost = 300;
		Basta.upgCost = 400;
		Basta.memesUpgProd = 40;

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
			document.getElementById('buyBasta').style.opacity = 1;			
		}
	}
}
*/
/* Персонаж Калли */
/*
function personKali(param) {
	switch (param)
	{
		case 'buy':
		return buyKali();
		break;

		case 'upg':
		return upgKali();
		break;
	}
	function buyKali() {
		Kali.memesFirstProd = 100;
		Kali.personCost = 3000;
		Kali.upgCost = 1000;
		Kali.memesUpgProd = 250;

		if (meme >= Kali.personCost) {
			upgds = upgds + Kali.memesFirstProd;
			meme = meme - Kali.personCost;
			personList = personList + " " + Kali.namePerson;
		//Kali.upgCost = Math.floor(10 * Math.pow(1.1, Kali.upgCount));
		document.getElementById('upg').innerHTML = Kali.memesFirstProd;
		document.getElementById('upgCostKali').innerHTML = "Update cost: " + Kali.upgCost;
		document.getElementById('upgB4').style.display = '',
		document.getElementById('upgB4').style.display = 'inline';
		document.getElementById('personList').innerHTML = personList;
		document.getElementById('buyKali').disabled = 'disabled';
		document.getElementById('imgPersonKali').style.WebkitFilter="grayscale(0%)";
		Kali.personIsBuy = true;
		}
	}
	function upgKali() {
		if (upgPerson.call(Kali) == true && Kali.upgCount < 4) {
		document.getElementById('imgPersonKali').src="img/kali" + Kali.upgCount + ".png";
		document.getElementById('upgCostKali').innerHTML = "Upgrade cost: " + Kali.upgCost; 
		}
		if (Kali.upgCount == 3) { 
			document.getElementById('upgB4').style.display = 'none',
			document.getElementById('upgCostKali').innerHTML = 'Kali in final form!';
			document.getElementById('buyKali').style.opacity = 1;
		}
	}
}
*/