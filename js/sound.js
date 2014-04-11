//make some noise

var chinese = [262,294,329,392,440,524,588,658,784,880];//1,2,3,5,6 pentatonic (5)
var japanese = [247,262,329,349,440,494,524,658,698,880];//7,1,3,4,6 iwato scale
var korean = [262,294,349,392,440,524,588,698];//1,2,4,5,6

var russian = [294,329,349,392,415,466,494,554,587,659,698];//6,7,1,2,3
// var indian = [262,294,311,349,392,440,466,524,588,622,698,784,880,932];//
var indian = [233,262,311,392,466,587,698,880,1046];// bb,c,eb,g,bb,d,f,a,c,d
var thai = [262,329,392,440,524,658,784,880];


var chinese_init = [chinese[0],chinese[1],chinese[2]];
var japanese_init = [japanese[0],japanese[1],japanese[2]];
var korean_init = [korean[0],korean[1],korean[2]];
var russian_init = [russian[0],russian[1],russian[2]];
var indian_init = [indian[0],indian[1],indian[2]];
//generated new triad chords from the old one, change just one note of the old chord

function generatenew(sequence,old)
{
	 var index_tochange = parseInt(Math.random()*3);//will return 0/1/2
	 old_firstnote_in_scale_index = sequence.indexOf(old[0]);
	 old_secondnote_in_scale_index = sequence.indexOf(old[1]);
	 old_thirdnote_in_scale_index = sequence.indexOf(old[2]);
	 if (index_tochange == 0)
	 {
	// 	//<middle note
		var newnote = sequence[parseInt(Math.random()*(old_secondnote_in_scale_index))];
		//console.log("change the first note!");
		return [newnote,old[1],old[2]];
	 }
	 else if (index_tochange ==1)
	 {
	// 	//between1,3 note
		 var newnote = sequence[parseInt(Math.random()*(old_thirdnote_in_scale_index-old_firstnote_in_scale_index)+old_firstnote_in_scale_index)];
		 //console.log("change the second note!");
		 return [old[0],newnote,old[2]];
	 }	
	 else
	 {
		//>middle note
		 var newnote = sequence[parseInt(Math.random()*(sequence.length-old_secondnote_in_scale_index)+old_secondnote_in_scale_index)];
		 //console.log("change the third note!");
		 return [old[0],old[1],newnote];
	 }
}

function generatenew_smallstep(sequence,old)
{
	 var index_tochange = parseInt(Math.random()*sequence.length);//will return 0-length
	 var decision = 0; // -1:minus 0:do nothing 1:plus the first note
	 
	 old_firstnote_in_scale_index = sequence.indexOf(old[0]);

	 
	 decision = prob(old_firstnote_in_scale_index,old_firstnote_in_scale_index+1);//40 is the parameter to control whether repeat itself
	 var newbegin = old_firstnote_in_scale_index + decision;
	 console.log(decision);
	 return [sequence[newbegin],sequence[newbegin+1],sequence[newbegin+2]];
}

function prob(firsthold,secondhold)
//will return -1,0,1 according to two fed in       
{
	var dice = Math.random();
	if (dice>=-1&&dice<(firsthold/10))
		dice = -1;
	else if (dice>=firsthold/10&&dice<secondhold/10)
		dice = 0;
	else
		dice = 1;
	return dice;
}

function play (triad,speed)
{
// if ((typeof(speed)==undefined))
// 	speed = 1;
var oscillator = [];
var gains = 0;
	for (var i = 0; i<=2; i++)
	{
	oscillator[i] = ctx.createOscillator();
	gains = ctx.createGain();
	oscillator[i].type = 2;
	oscillator[i].frequency.value = triad[i];
	oscillator[i].connect(gains);
	gains.gain.setValueAtTime(-0.9,ctx.currentTime+i/speed);
	gains.gain.linearRampToValueAtTime(0.4,ctx.currentTime+i/speed+0.4);
	// gain[i].gain.setValueAtTime(1,ctx.currentTime+i/speed+0.4);
	gains.gain.linearRampToValueAtTime(0.0,ctx.currentTime+i/speed+1.0);
	gains.connect(ctx.destination);
	oscillator[i].start(ctx.currentTime+i/speed);
	oscillator[i].stop(ctx.currentTime+(i+1)/speed);
	// console.log(triad[i]);
	}
}


function playtriad (triad,speed,time,timbre,dynamic,adsr)
//triad: [freq1,freq2,freq3], speed: 2 is OK, time: start at which seconds, 
//timbre:1,2,3,4=>four waves, dynamic:0-1; adsr: 0.1-0.9
{

var oscillator = [];
var pans = [];
var gainnode = ctx.createGain();//put gainnode here......
// var gains = [];
	for (var i = 0; i<=2; i++)
	{
	oscillator[i] = ctx.createOscillator();

	// pans[i] = ctx.createPanner();
	// pans[i].setVelocity(Math.random(),Math.random(),Math.random());
	oscillator[i].type = timbre;
	oscillator[i].frequency.value = triad[i];
	
	
	gainnode.gain.setValueAtTime(0,ctx.currentTime+i/speed+time);
	// gainnode.gain.linearRampToValueAtTime(0.4*dynamic,ctx.currentTime+i/speed+0.4+time);
	// gain[i].gain.setValueAtTime(1,ctx.currentTime+i/speed+0.4);
	gainnode.gain.linearRampToValueAtTime(0.4*dynamic,ctx.currentTime+i/speed+adsr/speed+time);
	// gainnode.gain.linearRampToValueAtTime(0.0,ctx.currentTime+i/speed+1.0+time);
	gainnode.gain.linearRampToValueAtTime(0.0,ctx.currentTime+(i+1)/speed+time);
	oscillator[i].connect(gainnode);
	gainnode.connect(ctx.destination);
	// pans[i].connect(ctx.destination);
	oscillator[i].start(ctx.currentTime+i/speed+time);
	oscillator[i].stop(ctx.currentTime+(i+1)/speed+time);
	console.log(triad[i]);
	}
}

function playsection(sequence,duration,starttime,formersequence,dynamic)
{

//generated section
	var timbre = 3;
	var adsr = 0.3;	
	var speed = 2;
	var interval = 0.25;
	var flag = 0;
	old = [sequence[0],sequence[1],sequence[2]];
	// console.log(old[0]);
	// console.log(old.length);
	// console.log(typeof(old));
	// console.log(chinese_init[0]);
	// console.log(chinese_init.length);
	// console.log(typeof(chinese_init));
	//old == chinese_init useless!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	// if (old[0]==chinese_init[0]&&old[1]==chinese_init[1]&&old[2]==chinese_init[2]||formersequence == chinese)
	if (formersequence == chinese)
	{
		timbre = 0;
	  	adsr = 0.8;
	  	speed = 1;
	  	interval = 0.314;
	  	flag = 1;
	  	if (typeof(dynamic) == 'undefined')
	  	dynamic = 0.5;
	}
	// else if (old[0]==japanese_init[0]&&old[1]==japanese_init[1]&&old[2]==japanese_init[2]||formersequence == japanese)
	else if (formersequence == japanese)
	{
	  	timbre = 3;
	  	adsr = 0.01;
	  	speed = 2;
	  	interval = 0.25;//0.4
	  	flag = 2;
	  	if (typeof(dynamic) == 'undefined')
	  	dynamic = 0.5;
	}
// else if (old[0]==korean_init[0]&&old[1]==korean_init[1]&&old[2]==korean_init[2]||formersequence == korean)
	else if (formersequence == korean)
	{
	  	timbre = 1;
	  	adsr = 0.6;
	  	speed = 1;
	  	interval = 0.5;//0.25//0.125
	  	flag = 3;
	  	if (typeof(dynamic) == 'undefined')
	  	dynamic = 0.3;
	}
// else if (old[0]==russian_init[0]&&old[1]==russian_init[1]&&old[2]==russian_init[2]||formersequence == russian)
	else if (formersequence == russian)
	{
	  	timbre = 2;
	  	speed = 3;
	  	adsr = 0.1;
	  	interval = 0.25;
	  	flag = 4;
	  	if (typeof(dynamic) == 'undefined')
	  	dynamic = 0.5;
	}
// else if (old[0]==indian_init[0]&&old[1]==indian_init[1]&&old[2]==indian_init[2] || formersequence == indian)
	else if (formersequence == indian)
	{
	  	timbre = 1;
	  	adsr = 0.99;
	  	speed = 1;
	  	interval = 0.5;
	  	flag = 5;
	  	if (typeof(dynamic) == 'undefined')
	  	dynamic = 0.4;
	}

	else if (formersequence == thai)
	{
	  	timbre = 3;
	  	adsr = 0.99;
	  	speed = 2;
	  	interval = 0.5;
	  	flag = 6;
	  	if (typeof(dynamic) == 'undefined')
	  	dynamic = 0.4;
	}

	var timepoint = 0; 
	var currentinterval = interval;
	// var old = japanese_init;
	if (flag == 3 || flag == 4)
	while (timepoint<=duration)
	{
	// interval+=0.005;
	old = generatenew_smallstep(sequence,old);
	
	var dice = Math.random();
	if (dice<0.2&&flag==3) interval = currentinterval*2;//rhythmic chance
	else interval = currentinterval;

	playtriad (old,speed,timepoint+starttime,timbre,dynamic,adsr)//playtriad (triad,speed,time,timbre,dynamic,adsr)
	
	timepoint += interval;
	console.log("small step");
	}
	else 
	while (timepoint<=duration)
	{
	old = generatenew(sequence,old);
	
	//**************
	var dice = Math.random();
	if (dice<0.5) interval = currentinterval*2;//rhythmic chance
	else interval = currentinterval;
	
	playtriad (old,speed,timepoint+starttime,timbre,dynamic,adsr)//playtriad (triad,speed,time,timbre,dynamic,adsr)
	timepoint += interval;
	console.log("not small step");
	}
	

	//ambient section
	var ambient = ctx.createBufferSource();
	var gain = ctx.createGain();
	gain.gain.value = 0.5;
	ambient.loop = true;
	ambient.buffer = buf[flag+1]; //src is buf[]
	ambient.connect(gain);
	gain.connect(ctx.destination);
	ambient.start(ctx.currentTime + starttime);//1 是grain从原曲的一秒长里选
	ambient.stop(ctx.currentTime + starttime + duration+1);
}

function sorta(array)
{
	var length = array.length;
	var temp = 0;
	for (var i=0;i<=length-1;i++)
		for (var j=0;j<=length-1;j++)
			if (array[j]>array[j+1])
				{
					temp = array[j+1];
					array[j+1] = array[j];
					array[j] = temp;
				}
	return array;
}

function granular(src,grainsize, duration,sectionlength)
//src is buf[],grainsize is in seconds,durantion is in seconds
//granular(buf[1],0.1,0.5,1)
{


	// piece.start(ctx.currentTime+i/1000,Math.random()*10);//10 seconds, first second as the src to grain
	// piece.stop(ctx.currentTime+i/1000+grainsize);
var i=0;
var j =0;
var bufduration = src.duration;
while((j-1)*grainsize<duration)
{
	if ((i-1)*grainsize>=bufduration)
		i=0;
	var piece = ctx.createBufferSource();
	var gain = ctx.createGain();
	gain.gain.value = 0.4;
	piece.buffer = src; //src is buf[]
	piece.connect(gain);
	gain.connect(ctx.destination);
	// piece.start(ctx.currentTime+i/1000,i/1000+Math.random());//10 seconds, first second as the src to grain
	// piece.stop(ctx.currentTime+i/1000+grainsize);

	piece.start(ctx.currentTime+j*grainsize,i*grainsize+Math.random()*sectionlength);//1 是grain从原曲的一秒长里选
	piece.stop(ctx.currentTime+(j+1)*grainsize);
	i+=1;
	j+=1;
}
}
function composition_three()
{
	var dict = {0:chinese,1:chinese,2:chinese,3:chinese,4:japanese,5:korean,6:russian,7:indian,8:thai};
	var start = 0;
	//find none empty drink types
	var playlist = [];
	var tracktime = [];
	for (var i = 0;i<=9;i++)
		if (soda.drinks[i]!=0)
		{
			playlist.push(dict[i]);
			tracktime.push(soda.drinks[i]*2.0);//playing time of each country
		}
	console.log(playlist);
	console.log(tracktime);
	



	// //granular(buf[1],0.02,52,2.0);

	var piece = ctx.createBufferSource();
	var gain = ctx.createGain();
	gain.gain.value = 0.4;
	piece.loop = true;
	piece.buffer = buf[1]; //src is buf[]
	piece.connect(gain);
	gain.connect(ctx.destination);
	// piece.start(ctx.currentTime+i/1000,i/1000+Math.random());//10 seconds, first second as the src to grain
	// piece.stop(ctx.currentTime+i/1000+grainsize);

	piece.start(ctx.currentTime);//1 是grain从原曲的一秒长里选
	piece.stop(ctx.currentTime+soda.sum*2);



	
	for (var i = 0; i<=playlist.length-2;i++)
	{
		playsection(playlist[i],tracktime[i]*0.9,start,playlist[i]);
		//playsection(sequence,duration,starttime,formersequence)
		start += tracktime[i]*0.7;
		playsection(sorta(playlist[i].concat(playlist[i+1])),tracktime[i]*0.25,start,playlist[i],0.3);
		// playsection(sorta(playlist[i].concat(playlist[i+1])),tracktime*0.25,start,playlist[i]);
		start += tracktime[i]*0.31;

	}
	playsection(playlist[i],tracktime[i],start,playlist[i]);
}
// var fillingsrc;
$(document).ready(function(){ // must have this line...
init();
    fillingsrc = ctx.createBufferSource(); 
$("#pushbutton" ).mousedown(function() {
	// var fillingsrc = ctx.createBufferSource(); 
    fillingsrc.loop = true;
    fillingsrc.buffer = buf[0];
    fillingsrc.connect(ctx.destination);
    fillingsrc.start(0);
    console.log("qnmd");});
$("#pushbutton" ).mouseup(function() {
	fillingsrc.stop(0);
	fillingsrc = ctx.createBufferSource(); 
    console.log("cnm");});
});

