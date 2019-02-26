// JavaScript Document
$(document).ready(function() {
	$('#mundial .crear-mono').click(function(){
		var img = $('#name-mono').val();
		$('.circulo-mono').html('<img style="width: 85%;margin: 10px auto;" src="images/monos/'+img+'.png" />');
		
	});
	$('#mundial .enviar-mono').click(function(){
		var valido = true;
		$('.formulario .dato-nombre input').css('border-color','#ccc');
		$('.formulario .dato-dni input').css('border-color','#ccc');
		$('.formulario .dato-email input').css('border-color','#ccc');
		if(soloLetras($('.formulario .dato-nombre input').val()) == false){
			valido = false;
			$('.formulario .dato-nombre input').css('border-color','#c90000');
		}
		if(comprobarDni($('.formulario .dato-dni input').val()) == false){
			valido = false;
			$('.formulario .dato-dni input').css('border-color','#c90000');
		}
		if(caracteresCorreoValido($('.formulario .dato-email input').val()) == false){
			valido = false;
			$('.formulario .dato-email input').css('border-color','#c90000');
		}
		if( valido == true){
			var data = {
				'nombre': $('.formulario .dato-nombre input').val(),
				'dni': $('.formulario .dato-dni input').val(),
				'email': $('.formulario .dato-email input').val(),
				'personaje': $('#name-mono').val(),
			};
			$.ajax({
				type: "POST",
				url : "php/guardar.php",
				data : data,
				dataType: "jsonp",
				jsonp: "jsoncallback",
				success: function(d){
					$(".ingresa.indicador").removeClass("activo");
					$(".ingresa.indicador").addClass("usado");
					$(".comparte.indicador").addClass("activo");
					// vista compartir
					$(".invita-crear").removeClass("parte-2-compartir");
					$(".compartir-mono").addClass("parte-2-compartir");
					$('#nombre-usuario').html($('.formulario .dato-nombre input').val());
					$("html, body").animate({
						scrollTop: $("#comp").offset().top
					});
					obtener_num_socios();
					$('#numero-hincha').html(readCookie('num_soc'));
					$('#mono-creado img').attr('src','images/monos/'+$('#name-mono').val()+'.png');
					
				},
				error: function (xhr, ajaxOptions, thrownError) {
					$(".ingresa.indicador").removeClass("activo");
					$(".ingresa.indicador").addClass("usado");
					$(".comparte.indicador").addClass("activo");
					// vista compartir
					$(".invita-crear").removeClass("parte-2-compartir");
					$(".compartir-mono").addClass("parte-2-compartir");
					$('#nombre-usuario').html($('.formulario .dato-nombre input').val());
					$("html, body").animate({
						scrollTop: $("#comp").offset().top
					});
					obtener_num_socios();
					$('#numero-hincha').html(readCookie('num_soc'));
					$('#mono-creado img').attr('src','images/monos/'+$('#name-mono').val()+'.png');
					$('.mono-actual').html('<div class="relative pers-tam"><div class="over-pers"><div>Num socio:'+readCookie('num_soc')+'</div><div>'+$('.formulario .dato-nombre input').val()+'</div></div><img src="images/monos/'+$('#name-mono').val()+'.png" /></div>');
					$('.fondo-cancha').slick('slickGoTo', 1);
				}
			});
		}
	});
	$( "#thanks" ).click(function(){
		$( "#thanks" ).dialog('close');
	});
	$('#container-opciones div .img-opcion').click(function(){
		$('.container-opciones.active').removeClass('active');
		$(this).parent().children('.container-opciones').addClass('active');
	});
	$('#enviar-mono').click(function(){
		var result_final = "";
		if($('.container-cuerpo input[name="especial"]').val() == ""){
			$('.container-cuerpo input').each(function(){
				if($(this).attr('name')!="especial"){
					if($(this).val()==""){
						return false;
					}else{
						result_final += $(this).val();
					}
				}
			});
		}else{
			result_final += $(this).val();
		}
		$('input[name="personaje"]').val(result_final);
	});
	
	var aux=0;
	
	$('.compartir-mono .boton-amarillo a').click(function(){
		event.returnValue = false;
		shareOverrideOGMeta(
			window.location.href,
			'Landing Mundial',
			'Participa',
			window.location.href+'images/monos/'+$('#name-mono').val()+'.png'
		);
	});
});
function obtener_num_socios(){
	$.ajax({
		type: "POST",
		url : "php/num_gente.php",
		dataType: "jsonp",
		jsonp: "jsoncallback",
		success: function(d){
			console.log(d);
			$('#numero-hincha').html(d);
		},
		error: function (xhr, ajaxOptions, thrownError) {

		}
	});
}
function actualizar_compartido(){
	var data = {
		'num_soc': readCookie('num_soc')
	};
	$.ajax({
		type: "POST",
		url : "php/act_compartido.php",
		data: data, 
		dataType: "jsonp",
		jsonp: "jsoncallback",
		success: function(d){
		},
		error: function (xhr, ajaxOptions, thrownError) {

		}
	});
}
function jsoncallback(data){
	$('#numero-hincha').html(data);
}
function obtener_info_socios(){
	$.ajax({
		type: "POST",
		url : "php/info_gente.php",
		dataType: "jsonp",
		jsonp: "jsoncallbackinfo",
		success: function(d){
			console.log($('.fondo-cancha .item').width());
			var maxiw = $('.fondo-cancha .item').width();
			var maxih = $('.fondo-cancha .item').height();
			var sectores = [];
			var u = 0;
			var restoh=0;
			var restow = 0;
			for (var e = 0; e<2;e++){
				for(var o = 0;o<3;o++){
					sectores[u] = [];
					restoh = $('#mundial .pers-tam').height();
					restow = $('#mundial .pers-tam').width();
					sectores[u][0]=Math.round(($('.fondo-cancha .item').width()/3)*(o+1))-restow;
					sectores[u][1]=Math.round(($('.fondo-cancha .item').height()/3)*(e+1))-restoh;
					u++;
				}
			}
			$('.fondo-cancha .item').each(function(){
				
				console.log(sectores);
				$(this).html('');
				for(var i = 0; i<6;i++){
					var salto = valorAleatorio(1,3);
					var pers = valorAleatorio(0,d.length - 1);
					if(i<3){
						if(i==0){
							var html = '<div class="relative pers-tam salto-'+salto+'" style="top:'+valorAleatorio(0,sectores[i][1])+'px;left:'+valorAleatorio(0,sectores[i][0])+'px"><div class="over-pers"><div>Num socio:'+d[pers].id+'</div><div>'+d[pers].nombre+'</div></div><img src="images/monos/'+d[pers].id_personaje+'.png" alt=""></div>';
						}else{
							var html = '<div class="relative pers-tam salto-'+salto+'" style="top:'+valorAleatorio(0,sectores[i][1])+'px;left:'+valorAleatorio(sectores[i-1][0],sectores[i][0])+'px"><div class="over-pers"><div>Num socio:'+d[pers].id+'</div><div>'+d[pers].nombre+'</div></div><img src="images/monos/'+d[pers].id_personaje+'.png" alt=""></div>';
						}
						
					}else{
						if(i==3){
							var html = '<div class="relative pers-tam salto-'+salto+'" style="top:'+valorAleatorio(sectores[i-1][1],sectores[i][1])+'px;left:'+valorAleatorio(0,sectores[i][0])+'px"><div class="over-pers"><div>Num socio:'+d[pers].id+'</div><div>'+d[pers].nombre+'</div></div><img src="images/monos/'+d[pers].id_personaje+'.png" alt=""></div>';
						}else{
							
							var html = '<div class="relative pers-tam salto-'+salto+'" style="top:'+valorAleatorio(sectores[0][1],sectores[i][1])+'px;left:'+valorAleatorio(sectores[i-1][0],sectores[i][0])+'px"><div class="over-pers"><div>Num socio:'+d[pers].id+'</div><div>'+d[pers].nombre+'</div></div><img src="images/monos/'+d[pers].id_personaje+'.png" alt=""></div>';
						}						
					}
					
					$(this).append(html);
				}
			});
			$('.mono-actual').html('<div class="relative pers-tam"><div class="over-pers"><div>Num socio:'+readCookie('num_soc')+'</div><div>'+$('.formulario .dato-nombre input').val()+'</div></div><img src="images/monos/'+$('#name-mono').val()+'.png" /></div>');
		},
		error: function (xhr, ajaxOptions, thrownError) {

		}
	});
}
function jsoncallbackinfo(data){
	console.log('jsoncallbackinfo');
}
function valorAleatorio(min, max){
	return Math.round(Math.random() * (max - min) + min);
}
// Adapatado de http://www.quirksmode.org/js/cookies.html#script
function readCookie(name) {
	
var nameEQ = name + "=";
var ca = document.cookie.split(';');
for(var i=0;i < ca.length;i++) { var c = ca[i]; while (c.charAt(0)==' ') c = c.substring(1,c.length); if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length); } return null; 
}
function caracteresCorreoValido(email, div){
    var caract = new RegExp(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/);
    if (caract.test(email) == false){
        return false;
    }else{
        return true;
    }
}
function comprobarDni(str = ""){
	if ($.isNumeric(str) == true){
		if(str.length >= 8 && str.length<10){
			return true;
		}else{
			return false;
		}
    }else{
        return false;
    }
}
function soloLetras(str = ""){
	if (str.match(/^[a-zA-ZñÑ ]+$/)){
        return true;
    }else{
        return false;
    }
}
function shareOverrideOGMeta(overrideLink, overrideTitle, overrideDescription, overrideImage)
{
	FB.ui({
		method: 'share_open_graph',
		action_type: 'og.shares',
		action_properties: JSON.stringify({
			object: {
				'og:url': overrideLink,
				'og:title': overrideTitle,
				'og:description': overrideDescription,
				'og:image': overrideImage
			}
		})
	},
	function (response) {
		if(response != undefined){
			$(".compartir-mono").removeClass("parte-2-compartir");
			$(".invitados-compartidos").addClass("parte-2-compartir");
			$(".fondo-cancha").slick({
				dots:false,
				infinite: false,
				speed: 300,
				autoplay: false,
				arrows:true,
				slidesToShow: 3,
				slidesToScroll: 1,
				responsive: [
					{
					  breakpoint: 768,
					  settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
					  }
					},
					{
					  breakpoint: 700,
					  settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
					  }
					}
				  ]
			});
			obtener_info_socios();
			if($(window).width()<700){
				$('.fondo-cancha').slick('slickGoTo', 2);
			}else{
				$('.fondo-cancha').slick('slickGoTo', 1);
			}
			actualizar_compartido();
			$('#numero-mono').html(readCookie('num_soc'));
		}
	});
}
 
function shareOriginal()
{
	FB.ui({
		method: 'share',
		href: window.location.href
	},
	function (response) {
	// Action after response
	});
	
	return false;
}
