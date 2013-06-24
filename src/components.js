//creates an object, add it to the canvas
function Obj(x, y, sp, size)
{
	this.size = size;
	this.x = x;
	this.y = y;
	//span
	this.color = sp;
	//add it to the world
	this.render = function()
	{
		//mod it canvas style
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.size, this.size);
	}
}

function Worker(x, y, sp)
{
	//creation of this object
	this.type = 'worker';
	this.xtype = new Obj(x,y,sp,2);
	this.backpack = 0;
	this.depot = 4;

	w.objects.push(this);

	//movement
	this.move = function()
	{
		if (this.depot > 0)
		{
			if (this.backpack > 0)
			{
				var coord = moveToNext()
			}
		}
	}
}