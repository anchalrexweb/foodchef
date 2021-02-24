$(window).on('load', function(){
    $("#dishtable").hide();
    $("#searchtable").hide();
});
	$(document).ready(function(){
		var dishes =[];
		var ingred = [];
if(localStorage.length != null){
	 	dishes =JSON.parse(localStorage.getItem("dishes"));
	 	 
}
// add dishes to table
		$("#add").on("click", function(){
			
		
			$("#dishtable").hide();
			var dish = $("#dish").val();
			var steps = $("#steps").val();
			var image = $("#image").val();
			var ingredients = $("#ingredients").val();
			var quantity = $("#quantity").val();
			var units = $("#units").val();
			$("#dishtbody").empty();
			ingred.push({ingredients,quantity,units});
			dishes.push({dish,steps,image,ingred});

			localStorage.setItem("dishes", JSON.stringify(dishes));
			getdata();
			var dish = $("#dish").val("");
			var steps = $("#steps").val("");
			var image = $("#image").val("");
			var ingredients = $("#ingredients").val("");
			var quantity = $("#quantity").val("");
			var units = $("#units").val("");

		});
// show all record
$("#show").on("click", function(){
	$("#dishtable").show();
	getdata();
});
//delete dish
	$("#dishtable").on("click",".deletebtn", function(){
		var i = $(this).parents("tr").index();
		dishes.splice(i,1);
		$(this).parents("tr").remove();
		localStorage.setItem("dishes",JSON.stringify(dishes));
	});

//add ingre
var i ;
var j;
$("#dishtable").on("click", ".ingadd", function(){
	$("#ingname").val("");
	$("#ingquantity").val("");
	$("#ingunit").val("");
	 i = $(this).parents("tr").index();
	 j=dishes[i].ingred.length;
	
	$("#hiddenform").show();
	
})	;

//new ingre
$(".newing").on("click", function(){

	$(".hiddenform").hide();
	var newIngname = $("#ingname").val();
	var newIngquantity = $("#ingquantity").val();
	var newIngunits = $("#ingunit").val();

	var newelement ={"ingredients" : newIngname ,"quantity" :newIngquantity ,"units" : newIngunits};
		dishes[i].ingred[j] = newelement ;
		
	localStorage.setItem("dishes",JSON.stringify(dishes));
		getdata();
});

//delete button of ingredients

$("#dishtable").on("click",".ingdelete", function(){
var i= $(this).parents("tr").parents("tr").index();
var j= $(this).parents("tr").index();
dishes[i].ingred.splice(j,1);
localStorage.setItem("dishes", JSON.stringify(dishes));
getdata();

});

//edit button of ingredients
var i,j;
$("#dishtable").on("click", ".ingedit", function(){
	i= $(this).parents("tr").parents("tr").index();
	j= $(this).parents("tr").index();
	$("#updatename").val(dishes[i].ingred[j].ingredients);
	$("#updatequantity").val(dishes[i].ingred[j].quantity);
	$("#updateunit").val(dishes[i].ingred[j].units);

});

//update ingredients
$(".updating").on("click", function(){
	var changename = $("#updatename").val();
	var changequantity = $("#updatequantity").val();
	var changeunit = $("#updateunit").val();
	dishes[i].ingred[j].ingredients = changename;
	dishes[i].ingred[j].quantity = changequantity;
	dishes[i].ingred[j].units = changeunit;
	localStorage.setItem("dishes", JSON.stringify(dishes));
	getdata();
});

//edit dish
var i;
$("#dishtable").on("click",".editbtn", function(){

	 i = $(this).parents("tr").index();
	$("#dish").val(dishes[i].dish);
	$("#steps").val(dishes[i].steps);
	$("#image").val(dishes[i].image);
	$("#ingredients").val("");
	$("#quantity").val("");
	$("#units").val("");
	
});

//update dish
$("#update").on("click", function(){
	var newDish  = $("#dish").val();
	var newSteps  = $("#steps").val();
	var newImage  = $("#image").val();
	dishes[i].dish = newDish;
	dishes[i].steps = newSteps;
	dishes[i].image = newImage;
	localStorage.setItem("dishes", JSON.stringify(dishes));
	getdata();
});




//search button
$("#search").on("click", function(){
	var search = $("#searchfield").val();
	var searchArr = search.split(",");
	$("#searchbody").empty();
	var newarray =[];

$.each(searchArr,function(k){
	$.each(dishes, function(i){
	for(var j=0; j<dishes[i].ingred.length; j++){
		if((dishes[i].ingred[j].ingredients)==searchArr[k]){
		
			var dish=dishes[i].dish;
			newarray.push(dish);
		}
	}
});
});

	var counts = {};
	
$.each(newarray, function(key,value) {
  if (!counts.hasOwnProperty(value)) {
    counts[value] = 1;
  } else {
    counts[value]++;
  }
});
console.log(counts);
var td="";
$.each(counts, function(i,v){
	if((v==v) && (v == searchArr.length)){
		$("#searchtable").show();
		$.each(dishes,function(j){
			
			if(dishes[j].dish == i){
				td += `<tr><td>${dishes[j].dish}</td><td>${dishes[j].steps}</td></tr>`;
			}
		});
	
		$("#searchbody").html(td);
	}
});


});



//add ingredients
$("#moreingredients").on("click",function(){
	var dish = $("#dish").val();
	if(dish == ""){
		alert("dish is required");
	}else{
	var ingredients = $("#ingredients").val();
	var quantity = $("#quantity").val();
	var units = $("#units").val();
	ingred.push({ingredients,quantity,units});
	$("#ingredients").val("");
	$("#quantity").val("");
	$("#units").val("");}
});


// display data on the table
function getdata(){
	var newdishes = JSON.parse(localStorage.getItem("dishes"));

			var deletebtn = `<button type="button" class="deletebtn btn btn-danger">DELETE DISH</button>`;
			var editbtn = `<button class="editbtn btn btn-warning">EDIT DISH</button>`;
			
			var ingdelete =`<button class="ingdelete btn btn-danger">DELETE</button>`;
			var ingedit =`<button class="ingedit btn btn-warning" data-toggle="modal" data-target="#updateingred">EDIT</button>`;
			var ingadd = `<button class="ingadd btn btn-primary"data-toggle="modal" data-target="#hiddenform">ADD INGREDIENTS</button>`;
	var td1="";


	$.each(newdishes, function(l){
		td1 += `<tr><td>${newdishes[l].dish}</td>
							<td>${newdishes[l].steps}</td>
							<td>${newdishes[l].image}</td>
							<td>

								<table class="table">
									<thead class="thead-dark">
										<tr>
											<th>NAME</th>
											<th>QUANTITY</th>
											<th>UNITS</th>
											
											<th>EDIT</th>
											<th>DELETE</th>
										</tr>
									</thead>
									<tbody>`;
		for(var m=0; m<newdishes[l].ingred.length; m++){

	
			td1 += `<tr><td>${newdishes[l].ingred[m].ingredients}</td>
						<td>${newdishes[l].ingred[m].quantity}</td>
						<td>${newdishes[l].ingred[m].units}</td>
						
						<td>${ingedit}</td>
						<td>${ingdelete}</td>

					</tr>`;
			
		}
		td1 +=	`</tbody>
								</table>
								
							</td>
							<td>${ingadd}</td>
							<td>${deletebtn}</td>
							<td>${editbtn}</td>`;
	});
	$("#dishtbody").html(td1);
	ingred=[];
}
	
});

