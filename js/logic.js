var amount = [0,0,0,0,0,0,0,0,0];
var dict = {0:'coke',1:'sprite',2:'fanta',3:'smart',4:'qoo',5:'greentea',6:'kvass',7:'thumsup',8:'cafezu',9:'water'};
var currentsoda = 0;//0:coke,1:sprite,fanta:3,smart:4,qoo:5,tea:6,thumsup:7,cafezu:8,kvass:9,water:10

function bottle(coke,sprite,fanta,smart,qoo,tea,kvass,thumsup,cafezu,water)
{
	this.drinks = [coke,sprite,fanta,smart,qoo,tea,kvass,thumsup,cafezu,water];
	this.currentsoda = 0;
	this.currentamount = 0.0;
	this.string = "";
	this.sum = 0;
}


bottle.prototype.fill = function()
{
	var type = this.currentsoda;
	var something = this;
	if (something.currentamount<=99)
	{
		fillingcounter = setInterval(function()
			{
			console.log("enter accumulating");
			if(something.currentamount<=99)
			{
				something.drinks[type]+=1;
				something.currentamount+=1;
				$('#stat').html('<p>'.concat(something.statusstring()).concat('</p>'));
				$('#sum').html('<title3> your drink<br>'.concat(something.sum).concat('%</title3>'));
			}
			else
			{clearInterval(fillingcounter);$('#sum').html('<p> your drink<br>100%<br> spilling out!</p>'+'<button onclick = \'composition_three()\'> LISTEN</button>');}},100)};
	};

//	console.log(this.drinks);



bottle.prototype.stop = function()
{
	clearInterval(fillingcounter);
	// this.currentamount = 0;
	// for (var i =0; i<=8;i++)
	// 	this.currentamount += this.drinks[i];
};

bottle.prototype.choosedrink = function(type)
{
	this.currentsoda = type;
};

bottle.prototype.statusstring = function()
{
	this.string = "";
	this.sum = 0;
	for (var i = 0; i<=9; i++)
	{
		if (this.drinks[i]!=0)
		{
			this.string += dict[i].concat(": "+this.drinks[i]).concat('<br>');
		}
		this.sum += this.drinks[i]; 
	}
	return this.string;
};

