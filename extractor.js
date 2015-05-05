javascript:(function()
{
	try
	{
		var inp = prompt("tag attr regStr=?", 'a innerHTML <img ');
		var ary = do_ret(inp);
		
		if(ary.length == 0)
		{
			alert("no objs");
			return;
		}
		
		var isBr = (prompt("do br=?", "") == null) ? false : true;
		var buf = "";
		for(var i = 0; i < ary.length; i++)
		{
			buf += ary[i].outerHTML + (isBr ? "<br />\n" : "\n");
		}
		
		document.body.innerHTML = buf;
	}
	catch(e)
	{
		alert(e);
	}
	
	function do_ret(str)
	{
		var ary = str.split(' ');
		if(ary.length >= 4)
		{
			for(var x = 3; x < ary.length; x++)
			{
				ary[2] += " " + ary[x];
			}
			while(ary.length >= 4)
			{
				ary.pop();
			}
		}
		
		if(ary.length != 3)
		{
			alert("input error!");
			return [];
		}

		var tag = ary[0];
		var attr = ary[1];
		var reg = new RegExp(ary[2], 'i');
		
		var ret = [];
		var ory = document.getElementsByTagName(tag);
				
		if(attr == 'innerHTML')
		{
			for(var i = ory.length - 1; i >= 0; i--)
			{
				var obj = ory[i];
				if(obj.innerHTML.match(reg))
				{
					ret.unshift(obj);
				}
			}
		}
		else if(attr == 'outerHTML')
		{
			for(var i = ory.length - 1; i >= 0; i--)
			{
				var obj = ory[i];
				if(obj.outerHTML.match(reg))
				{
					ret.unshift(obj);
				}
			}
		}
		else
		{	
			for(var i = ory.length - 1; i >= 0; i--)
			{
				var obj = ory[i];
				if(obj.hasAttribute(attr) == true)
				{
					var att = obj.getAttribute(attr);
					if(att.match(reg))
					{
						ret.unshift(obj);
					}
				}
			}
		}	
		return ret;
	}
	
})();
