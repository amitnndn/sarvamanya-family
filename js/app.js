$(function() {
	var familyData = new Object();
	var currentBirthdays = new Object();
	$.getJSON("../json/document.json",function(data){
		familyData = data;
		prepareData(familyData);		
	});
	function checkDate(type,date,name){
		var momentDateFormat = moment(date,"DD.MM.YYYY");
		var systemDateFormat = momentDateFormat.toDate();
		var today = new Date();
		if(today.getMonth() == systemDateFormat.getMonth()){
			var thisYear = today.getFullYear();
			var birthYear = systemDateFormat.getFullYear();
			var age = thisYear - birthYear;
			var htmlString = ""
			if(type === "anniversaries"){
				htmlString = "<div class='list_element' alt='happy birthday!'>"+name+" <small><br/>("+age+" Years)</small></div>"
			}
			else{
				htmlString = "<div class='list_element' alt='happy birthday!'>"+name+" <small>("+age+" Years)</small></div>";
			}
			if(today.getDate() == systemDateFormat.getDate()){
				$("."+type+" .today_list").append(htmlString);
			}
			else{
				$("."+type+" .month_list").append(htmlString);
			}					
		}
		var todayLength = $("."+type+" .today_list").children().length;
		var monthLength = $("."+type+" .month_list").children().length;
		if(todayLength  == 1){
			$("."+type+" .today_list").hide();
		}
		else{ 
			$("."+type+" .today_list").show();
		}
		if(monthLength  == 1){
			$("."+type+" .month_list").hide();
			$("."+type+" .nothing_to_show").show();
		}
		else{ 
			$("."+type+" .month_list").show();
			$("."+type+" .nothing_to_show").hide();	
		}
	}
	function prepareData(data){
		var htmlString = "<li><div class='insideLi'><div class='profile_image'><img src='data.image_url' height='125px' width='125px' /></div>data.name<div class='info'><div>DOB: data.dob</div><div style='dod.style'>DOD: data.dod</div></div></div>";
		console.log(data);
		$.each(data.members,function(key,value){
			console.log(value);	
			htmlString = htmlString.replace("data.image_url",value.image_url);
			htmlString = htmlString.replace("data.name",value.name);
			htmlString = htmlString.replace("data.dob",value.dob);
			checkDate("birthdays",value.dob,value.name);
			if(value.dod.length != 0){
				checkDate("memorials",value.dod,value.name);
				htmlString = htmlString.replace("data.dod",value.dod);	
				htmlString = htmlString.replace("dod.style","display:block");
			}
			else{
				htmlString = htmlString.replace("dod.style","display:none");
			}
			if(value.partner.name != "unmarried"){
				checkDate("anniversaries",value.partner.dom,value.partner.name + " & " + value.name);
				htmlString += getPartner(value.partner);
			}
			htmlString += "<ul class='child'>";
			htmlString += getChildren(value.children);
			htmlString += "</li>"
		});
		$("#nav").append(htmlString);
	}
	function getChildren(data){
		var fatherString = "";
		$.each(data,function(key,value){
			var htmlString = "<li><div class='insideLi'><div class='profile_image'><img src='data.image_url' height='125px' width='125px' /></div>data.name<div class='info'><div>DOB: data.dob</div><div style='dod.style'>DOD: data.dod</div></div></div>";
			htmlString = htmlString.replace("data.image_url",value.image_url);
			htmlString = htmlString.replace("data.name",value.name);
			htmlString = htmlString.replace("data.dob",value.dob);
			checkDate("birthdays",value.dob,value.name);
			if(value.dod.length != 0){
				checkDate("memorials",value.dod,value.name);
				htmlString = htmlString.replace("data.dod",value.dod);	
				htmlString = htmlString.replace("dod.style","display:block");
			}
			else{
				htmlString = htmlString.replace("dod.style","display:none");
			}
					//console.log(value.partner);
					if(value.partner.name != "unmarried"){
						checkDate("anniversaries",value.partner.dom,value.partner.name + " & " + value.name);
						htmlString += getPartner(value.partner);
					}
					else{
						htmlString += "<div class='clear'></div>";
					}
					if(value.children.length != 0){
						htmlString += "<ul class='child'>";
						htmlString += getChildren(value.children);
						htmlString += "</ul>"
					}
					fatherString += htmlString;
					fatherString += "</li>"
				});
		return fatherString;
	}
	function getPartner(value){
		var htmlString = "<div class='insideLi'><div class='profile_image'><img src='data.image_url' height='125px' width='125px' /></div>data.name<div class='info'><div>DOB: data.dob</div><div style='dod.style'>DOD: data.dod</div></div></div><div class='clear'></div>";
		htmlString = htmlString.replace("data.image_url",value.image_url);
		htmlString = htmlString.replace("data.name",value.name);
		htmlString = htmlString.replace("data.dob",value.dob);
		checkDate("birthdays",value.dob,value.name);
		if(value.dod.length != 0){
			checkDate("memorials",value.dod,value.name);
			htmlString = htmlString.replace("data.dod",value.dod);	
			htmlString = htmlString.replace("dod.style","display:block");
		}
		else{
			htmlString = htmlString.replace("dod.style","display:none");
		}
		return htmlString;
	}
	$("ul#nav").on('click','div',function(e){
		$(this).parent().children("UL").toggle();
	})
	$("ul#nav").find("DIV").click(function(e) {
		$(this).parent().children("UL").toggle();
	});
	var today = new Date();
	var thisYear = today.getFullYear();
	$("footer .footer_content").append("&copy; " + thisYear + " Sarvamanya Family");
});