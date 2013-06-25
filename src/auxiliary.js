function moveToNext(xPos,yPos,type,color,v)
{
	var obj = findNext(xPos,yPos,type,color);
	if (obj==0) return;
	return Array(moveAlongVector(xPos, yPos,
								obj.xtype.x, obj.xtype.y, v),obj);
}

function moveToNextResource(xPos,yPos,worker,v)
{
	var res = findNextRes(xPos,yPos,worker);
	if (res==0) return;
	return Array(moveAlongVector(xPos, yPos,
								res.xtype.x, res.xtype.y, v),res);
}

function findNextRes(xPos,yPos,worker)
{
	var res=0;
	for (i=0;i<w.objects.length;i++)
	{
		if (w.objects[i].type == 'Resource'
			&& w.objects[i].xtype.color == 'green'
			&& (!w.objects[i].xtype.occupied 
				|| (w.objects[i].xtype.occupied 
					&& (w.objects[i].xtype.worker == worker))))
		{
			if (res == 0)
			{
				res = w.objects[i];
			} else if (Math.round(getDistance(xPos,yPos,
						w.objects[i].xtype.x,w.objects[i].xtype.y))
				< Math.round(getDistance(xPos,yPos,
					res.xtype.x,res.xtype.y)))
			{
				res = w.objects[i];
				w.objects[i].xtype.occupied = true;
				w.objects[i].xtype.worker = worker;
			}
		}
	}
	
	return res;
}

function findNext(xPos,yPos,type,color)
{
	var obj=0;
	for (i=0;i<w.objects.length;i++)
	{
		if (w.objects[i].type == type
			&& w.objects[i].xtype.color == color)
		{
			if (obj == 0)
				obj = w.objects[i];

			else if (Math.round(getDistance(xPos,yPos,
						w.objects[i].xtype.x,w.objects[i].xtype.y))
				< Math.round(getDistance(xPos,yPos,
					obj.xtype.x,obj.xtype.y)))

				obj = w.objects[i];
		}
	}
	return obj;
}

function getDistance(xPos,yPos,desXPos,desYPos)
{
	return Math.sqrt(((desXPos -xPos)*(desXPos -xPos))
		+((desYPos-yPos)*(desYPos-yPos)));
}

function moveAlongVector(xPos,yPos,desXPos,desYPos,velocity)
{
	var distance = getDistance(xPos,yPos,desXPos,desYPos);
	if (distance > velocity)
	{
		//TODO
		var newX = Math.round(velocity/distance 
			* (desXPos - xPos) + xPos);
		var newY = Math.round(velocity/distance 
			* (desYPos - yPos) + yPos);
		return Array(newX,newY);
	} else if (distance <= velocity)
		return Array(desXPos, desYPos);
}

function r1(max, min)
{
	return (Math.floor(Math.random() * (max-min))+1);
}
