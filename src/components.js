//Creates a generic object, add it to the canvas
function Obj(x,y,sp,size)
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

function World()
{
	this.objects = new Array();

	this.count = function(type, sp)
	{
		var cnt = 0;
		for (var i=0; i<this.objects.length; i++)
			if(this.objects[i].xtype.color == sp 
				&& this.objects[i].type == type)
				cnt++;
		return cnt;
	}
}

//Peon
function Worker(x,y,sp)
{
	//creation of this object
	this.type = 'Worker';
	//parent type?
	this.xtype = new Obj(x,y,sp,2);
	this.backpack = 0;
	this.depot = 4;

	w.objects.push(this);

	//movement
	this.move = function()
	{
		if (this.depot > 0)
		{
			if (this.backpack == 0)
			//if no resources carried, go get some
			{
				var coord = moveToNext( this.xtype.x, this.xtype.y,
					'Resource', 'green', 10);
				//TODO wut?
				if (this.xtype.x == coord[0][0]
					&& this.xtype.y == coord[0][1])
				{
					this.backpack = 1;
					coord[1].depot -= 1;
				}
			} else
			//got the resource, go back to base
			{
				var coord = moveToNext( this.xtype.x, this.xtype.y,
					'Base', this.xtype.color, 5);

				if (this.xtype.x == coord[0][0]
					&& this.xtype.y == coord[0][1])
				{
					this.backpack = 0;
					coord[1].depot += 1;
				}
			}

			//TODO wut?
			this.xtype.x = coord[0][0];
			this.xtype.y = coord[0][1];
		} else
		{
			//TODO wut?
			this.xtype.size = 3;
			this.xtype.color = 'yellow';
		}
	}
}

function Fighter(x,y,sp)
{
	this.type = 'Fighter';
	//take sides
	if (sp == 'blue')
		this.enemy = 'red';
	else
		this.enemy = 'blue';

	this.xtype = new Obj(x,y,sp,4);
	this.depot = 3;

	w.objects.push(this);

	this.move = function()
	{
		//indicate what to kill
		var fightType = 'Idle';
		if (this.depot > 0)
		{
			//if the enemy has troops, kill them
			if (w.count('Fighter', this.enemy) > 0)
				fightType = 'Fighter';
			else if (w.count('Worker', this.enemy) > 0)
				fightType = 'Worker';
			else if (w.count('Worker', this.enemy) <= 0)
				fightType = 'Base';

			if (fightType!='Idle')
			{
				var coord = moveToNext(this.xtype.x, this.xtype.y,
					fightType, this.enemy, 7);
				if (this.xtype.x == coord[0][0]
					&& this.xtype.y == coord[0][1])
					coord[1].depot -= 1;

				this.xtype.x = coord[0][0];
				this.xtype.y = coord[0][1];
			}
		} else
		{
			this.xtype.size = 3;
			this.xtype.color = 'yellow';
		}
	}
}

function Base(x,y,sp)
{
	this.type = 'Base';
	this.depot = 20;
	this.xtype = new Obj(x,y,sp,10);
	this.side = sp;
	this.lost = false;

	w.objects.push(this);

	this.move = function()
	{
		if (this.depot > 5
			&& w.count ('Worker', this.xtype.color) < 10)
		{
			new Worker(x-2, y+5, this.xtype.color);
			this.depot -= 5;
		} else if(this.depot > 10)
		{
			new Fighter(x-2, y+5, this.xtype.color);
			this.depot -= 10;
		}
	}

	this.checkBankrupt = function()
	{
		if (this.depot < 0
			&& w.count ('Worker', this.xtype.color) == 0
			&& w.count ('Fighter', this.xtype.color) == 0)
			this.lost = true;
	}
}

function Resource(x,y,sp)
{
	this.depot = 30;
	this.type = 'Resource';
	this.xtype = new Obj(x,y,sp,5);

	w.objects.push(this);

	//stay where it is
	this.move = function()
	{

	}
}