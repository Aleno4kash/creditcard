
$(function() {

	var cc = $(".credit_card");
	var expiration = $(".expiration");
	var cvv = $(".cvv");
	var button=$(".blank_but");
	var input=$("input");
	var general=0;
	cc.mask("9999 9999 9999 9999");
	expiration.mask("99  /  2099");	
	cvv.mask("999");

	button.on('click', function(){
			general=0;
			/*console.log("!!!"+general);*/
			general=checkType(cc);
			general+=checkExpiration(expiration);
			general+=checkCVV(cvv);
			if(general==3)
				alert("Successful validation!");
			else
				alert("Failed validation!");
		});
	expiration.on('click', function(){
			clean(expiration);
		});
	input.on('keyup',function(){
		
		cc.css("border-color", "transparent");
		expiration.css("border-color", "transparent");
		cvv.css("border-color", "transparent");
	});
});
function func(){}
function checkCVV(cvv)
{
	var str=cvv.val();
	if(str.length<3)
	{
		markRed(cvv);
		return 0;
	}
	return 1;
}
function clean(expiration)
{
	expiration.val("");
}
function checkExpiration(expiration)
{
	var Months = {
				  1 :"January",
				  2 :"February",
				  3 :"March",
				  4 :"April",
				  5 :"May",
				  6 :"June",
				  7 :"Jule",
				  8 :"August",
				  9 :"September",
				  10 :"October",
				  11 :"November",
				  12 :"December"
	};
	var str=expiration.val();
	var month=String(str.match(/^\d{2}/g));
	var year=Number(str.match(/\s\s\d{4}/g));
	var date = new Date();
	var cur_month=date.getMonth()+1;
	var cur_year=date.getFullYear();

	if(/^[A-Za-z]+/g.test(str)) //якщо вже був визначений місяць
	{
		expiration.css("border-color", "transparent");
		return 1;
	}
	if((/^0\d|10|11|12$/g.test(month))==false)
	{
		markRed(expiration);
		return 0;
	}
	else if(year<cur_year)
	{
		markRed(expiration);
		return 0;
	}
	else if(year==cur_year&&month<cur_month)
	{
		
		markRed(expiration);
		return 0;
	}

	var tmp=Number(month);
	for(var i in Months)
	{
		if(Months.hasOwnProperty(i))
		{
			if(i==tmp)
				{
					expiration.val(Months[i]+"  /  "+year);
					/*console.log(i);*/
				}
		}
	}
	return 1;
}

function markRed(obj)
{
	obj.css("border-color", "red");
}
function checkType(cc)
{
	var icon = $(".card_icon");
	var result=cc.val()
	result=result.match(/^\d{2}/g);
	var str=String(result);
	if(str.split("")[0]=='4')
	{
		/*alert("VISA");*/
		icon.attr("src","img/visa.png");
		return 1;
	}
	else if(str=='51'||str=='52'||str=='53'||str=='54'||str=='55')
	{
		/*alert("MasterCard");*/
		icon.attr("src","img/mastercard.png");
		return 1;
	}
	else
	{
		/*alert("Unknown card. Enter card number one more time");*/
		markRed(cc);
		icon.attr("src","");
		cc.val("");
		return 0;
	}
}