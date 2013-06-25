//draw the map
renderWorld = function()
{
	var spliceArray = Array();

	objectCount = w.objects.length;
	ctx.clearRect(0,0,c.width,c.height);

	var i=0;
	while (i < objectCount)
	{
		w.objects[i].move();
		w.objects[i].xtype.render();
		if (w.objects[i].depot < 1)
			spliceArray.push(i);
		i++;
	}
	for (var j=0; j<spliceArray.length;j++)
		w.objects.splice(spliceArray[j],1);

	renderTimer = setTimeout('renderWorld()',20);
}

play = function()
{
	w.blue.checkBankrupt();
	w.red.checkBankrupt();

	if (w.blue.lost)
	{
		//alert("Red wins!");
		gameOver();
	} else if (w.red.lost)
	{
		//alert("Blue wins!");
		gameOver();
	}

	playTimer = setTimeout('play()',20);
}

gameOver = function()
{
	clearTimeout(renderTimer);
	clearTimeout(playTimer);
	newGame();
}

//load the fucking game
newGame = function()
{
	c = document.getElementById('canvas');
	ctx = c.getContext('2d');

	w = new World();

	w.blue = new Base(r1(800,2), r1(500,2), 'blue');
	w.red  = new Base(r1(800,2), r1(500,2), 'red');

	//resources, randomly placed
	for (i=1; i<50;i++)
	{
		new Resource(r1(800,2), r1(500,2), 'green');
	}

	//timer
	var renderTimer;
	var playTimer;

	renderWorld();
	play();
}

window.onload = newGame;