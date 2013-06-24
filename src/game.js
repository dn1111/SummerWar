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
	setTimeout('renderWorld()',50);
}

//load the fucking game
window.onload=function()
{
	c = document.getElementById('c');
	ctx = c.getContext('2d');

	w = new World();

	new Base(r1(800,2), r1(500,2), blue);
	new Base(r1(800,2), r1(500,2), red);

	//resources, randomly placed
	for (i=1; i<41;i++)
	{
		new Resource(r1(800,2), r1(500,2), 'green');
	}

	renderWorld();
}