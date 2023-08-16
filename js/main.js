let pasoAnteriorID = "";
let pasoActualID = "paso-1";
let pasoAnterior = document.getElementById(pasoAnteriorID);
let pasoActual = document.getElementById(pasoActualID);

let pasoCounter = 1;
let seccion = "";
let cuadro = "cuadro";
let imagenAgregado = false;
let file; 
const btnEnmarcaciones = document.getElementById("btnEnmarcaciones");

let cuadroEspec = {
  id: 0,
  tipo: '',
  orientacion: '',
  largo: '',
  ancho: '',
  modelo: '',
  color: '',
  paspartu: '',
  anchoPaspartu: '',
  paspartuDigital: '',
  tipoPaspartu: '',
  cantidad: 0,
  colorImpresion: '',
  nombreImg: '',
  urlImg: '',
}

let totalProd = [];

let productoId = 0;

// $("#Enmarcaciones").click(function() {
//     $("#paso-1").fadeOut();
//     $("#paso-2").fadeIn();
//     $("#div2").fadeIn("slow");
//     $("#div3").fadeIn(3000);
// });

// $(document).ready(() => {
//   // $(".enmarcaciones1").hide();
//   let localTotalProd =  JSON.parse(localStorage.getItem("totalProd"));
//   if(localTotalProd){
//     totalProd = localTotalProd
//     $(".cantCarro").html(totalProd.length);
//     for(let i = 0; i < localTotalProd.length; i++){
//       console.log(localTotalProd[i]);
//       agregarProductoLocalStorage(localTotalProd[i])
//     }
//   }

// });

function agregarProductoLocalStorage(producto){
  let html = `<div class="card-producto mb-10" id="${producto.id}">
                <div class="flex g-40">
                  <div class="img-final imgProductoCarro" class="imageContainer">
                    <img class="enCarroImg uploadedImage${producto.id}" src="assets/svg/cuadroNegroBlanco.svg" alt="Uploaded Image">
                  </div>  
                  <div>
                    <div class="tw-700 f-16">${producto.tipo}</div>
                    <div class="tw-400 f-16">Especificaciones de cuadro</div>          
                    <div class="tw-600 f-16">Tamaño: <span class="tw-400">Ancho ${producto.largo} cm - Largo ${producto.ancho} cm</span></div>          
                    <div class="tw-600 f-16">Modelo de marco: <span class="tw-400">${producto.modelo}</span></div>          
                    <div class="tw-600 f-16">Paspartu: <span class="tw-400">${producto.paspartu}</span></div>          
                    <div class="tw-600 f-16 text-center">...</div>
                    <div class="flex f-align-items-center f-justify-between">
                      <div class="mt-5 flex f-align-items-center g-40 mr-50">
                        <div class="operacion pointer" onclick="operacion('-')">-</div>
                        <div class="detalle-cantidad tw-600 f-16">${producto.cantidad}</div>
                        <div class="operacion pointer" onclick="operacion('+')">+</div>
                      </div>
                      <div class="tw-600 f-16 text-underline pointer" onclick="deleteProd(${producto.id});">Eliminar</div>
                    </div>
                  </div>
                </div>
              </div>
              `
  $("#productos").append(html);

  if(producto.urlImg != ''){
    var uploadedImage = $('.uploadedImage'+cuadroEspec.id);
    var imageContainer = $('.imageContainer');

    // Establecer la fuente (src) de la imagen usando la URL creada
    uploadedImage.attr('src', producto.urlImg);
    imageContainer.css('display', 'block');
  }

}

btnEnmarcaciones.addEventListener("click", function () {
  $(".servicio").hide();
  cuadroEspec.tipo = 'Enmarcación';
  seccion = "enmarcaciones";
  cuadro = cuadro + "Enmarcaciones";
  $("." + seccion + pasoCounter).show();
  console.log("antes: " + pasoCounter);
  pasoCounter++;
  // Esto se activa cuando se vuelve agregar un producto
  $("." + seccion + pasoCounter).show();
  console.log(seccion + pasoCounter);
  $(`li:contains("${pasoCounter}")`).removeClass("step-prox");
  $(`li:contains("${pasoCounter}")`).addClass("step-actual");
});

// Esto es seccion IMPRESION + ENMARCACIONES
$("#btnImpresiones").click(function(){
  $(".servicio").hide();
  cuadroEspec.tipo = "Enmarcación + Impresion";
  seccion = "impresiones";
  cuadro = cuadro + "Impresiones";
  console.log("impresion antes: " + pasoCounter);
  $("." + seccion + pasoCounter).show();
  pasoCounter++;
  console.log("impresion despues: " + pasoCounter);
  $("."+ seccion + pasoCounter).show();
  $(`li:contains("${pasoCounter}")`).removeClass("step-prox");
  $(`li:contains("${pasoCounter}")`).addClass("step-actual");
});

$(".volver").click(() => {
  console.log("inicio volver: " + pasoCounter);
  if (pasoCounter == 1) {
    // $(`li:contains("${pasoCounter}")`).removeClass("step-actual");
    // $(`li:contains("${pasoCounter}")`).addClass("step-prox");
    // pasoCounter--;
    $("." + seccion + pasoCounter).hide();
    $(".servicio").show();
  } else {
    $(`li:contains("${pasoCounter}")`).removeClass("step-actual");
    $(`li:contains("${pasoCounter}")`).addClass("step-prox");
    $("." + seccion + pasoCounter).hide();
    $("." + cuadro + pasoCounter).hide();
    pasoCounter--;
    $("." + seccion + pasoCounter).show();
  }
  console.log("paso Actual: " + pasoCounter)
});

$(".siguiente").click(() => {
  $("." + seccion + pasoCounter).hide();
  pasoCounter++;
  console.log(seccion + pasoCounter);
  $("." + seccion + pasoCounter).show();
  $("." + cuadro + pasoCounter).show();
  console.log(cuadro+pasoCounter);
  $(`li:contains("${pasoCounter}")`).removeClass("step-prox");
  $(`li:contains("${pasoCounter}")`).addClass("step-actual");
  console.log("paso actual: " + pasoCounter);
});

$(".largo").on('blur', function () {
  $(".valorLargo").html($(this).val() + " cm");

});
$(".ancho").on('blur', function () {
  $(".valorAncho").html($(this).val() + " cm");
});


let colorEnmarcacion = "";
let botonPrevio = null;

$(".btnColor").click(function () {
  let textoBoton = $(this).text().trim();
  if (colorEnmarcacion !== "") {
    if (botonPrevio !== null) {
      botonPrevio.removeClass("btnColorBorder");
    }
    botonPrevio = $(".btnColor").filter(function () {
      return $(this).text().trim() === colorEnmarcacion;
    });
    botonPrevio.removeClass("btnColorBorder");
  }
  // Asignamos el botón actual como el nuevo botón previo
  botonPrevio = $(this);
  $(this).addClass("btnColorBorder");
  colorEnmarcacion = textoBoton;
});

$("input[name='radioAnchoPas']").change(function () {
  if ($(this).is(":checked")) {
    console.log("valor del checked: " + $(this).val());
    $(".valorPassport").html($(this).val() + " cm")
  }

})

$("input[name='imp-radioPas']").change(function () {
  if($(this).val() == "Digital"){
    $(".pas-digital").show();
  }else{
    $(".pas-digital").hide();
  }
})

function showModal(modal) {
  $("." + modal).css("visibility", "visible");
}
function closeModal(modal) {
  $("." + modal).css("visibility", "hidden");
}

function operacion(simbolo) {
  if (simbolo == '-') {
    if (cuadroEspec.cantidad > 1) {
      cuadroEspec.cantidad--;
    }
  } else if (simbolo == '+') {
    cuadroEspec.cantidad++;
  }
  $(".detalle-cantidad").html(cuadroEspec.cantidad);
}


function agregarProducto() {
  if(seccion == 'impresiones'){
    cuadroEspec.id = productoId;
    cuadroEspec.colorImpresion = $("input[name='color-impresion']:checked").val();
    cuadroEspec.orientacion = $("input[name='orientacion']:checked").val();
    cuadroEspec.largo = $("#largo").val();
    cuadroEspec.ancho = $("#ancho").val();
    cuadroEspec.modelo = $("input[name='modelo-impresion']:checked").val();
    cuadroEspec.color = $(".btnColorBorder").html();
    cuadroEspec.paspartu = $("input[name='imp-radioPas']:checked").val();
    cuadroEspec.paspartuDigital = $("input[name='pasDigital']:checked").val();
    cuadroEspec.anchoPaspartu = $("input[name='imp-radioAnchoPas']:checked").val();
    cuadroEspec.tipoPaspartu = $("input[name='imp-radioTipo']:checked").val();
    cuadroEspec.cantidad = 1;
    productoId++;

  }else if (seccion == 'enmarcaciones'){
    cuadroEspec.id = productoId;
    cuadroEspec.orientacion = $("input[name='orientacion']:checked").val();
    cuadroEspec.largo = $("#largo").val();
    cuadroEspec.ancho = $("#ancho").val();
    cuadroEspec.modelo = $("input[name='modelo']:checked").val();
    cuadroEspec.color = $(".btnColorBorder").html();
    cuadroEspec.paspartu = $("input[name='radioPas']:checked").val();
    cuadroEspec.anchoPaspartu = $("input[name='radioAnchoPas']:checked").val();
    cuadroEspec.tipoPaspartu = $("input[name='radioTipo']:checked").val();
    cuadroEspec.cantidad = 1;
    productoId++;
  }
  
   totalProd.push(cuadroEspec);
   localStorage.setItem("totalProd", JSON.stringify(totalProd));
  
  $(".cantCarro").html(totalProd.length);
  agregarProductoHTML();
}


function agregarProductoHTML(){  

  $(".detalle-tipo").html(cuadroEspec.tipo);
  $(".detalle-tamaño").html(`Ancho ${cuadroEspec.largo} cm - Largo ${cuadroEspec.ancho} cm`);
  $(".detalle-modelo").html(cuadroEspec.modelo);
  $(".detalle-color").html(cuadroEspec.color);
  $(".detalle-paspartu").html(cuadroEspec.paspartu);
  $(".detalle-tipoPaspartu").html(cuadroEspec.tipoPaspartu);
  $(".detalle-anchoPaspartu").html(cuadroEspec.anchoPaspartu);
  $(".detalle-cantidad").html(cuadroEspec.cantidad)

  let html = `<div class="card-producto mb-10" id="${cuadroEspec.id}">
                <div class="flex g-40">
                  <div class="img-final imgProductoCarro" class="imageContainer">
                    <img class="enCarroImg uploadedImage${cuadroEspec.id}" src="assets/svg/cuadroNegroBlanco.svg" alt="Uploaded Image">
                  </div>  
                  <div>
                    <div class="tw-700 f-16">${cuadroEspec.tipo}</div>
                    <div class="tw-400 f-16">Especificaciones de cuadro</div>          
                    <div class="tw-600 f-16">Tamaño: <span class="tw-400">Ancho ${cuadroEspec.largo} cm - Largo ${cuadroEspec.ancho} cm</span></div>          
                    <div class="tw-600 f-16">Modelo de marco: <span class="tw-400">${cuadroEspec.modelo}</span></div>          
                    <div class="tw-600 f-16">Paspartu: <span class="tw-400">${cuadroEspec.paspartu}</span></div>          
                    <div class="tw-600 f-16 text-center">...</div>
                    <div class="flex f-align-items-center f-justify-between">
                      <div class="mt-5 flex f-align-items-center g-40 mr-50">
                        <div class="operacion pointer" onclick="operacion('-')">-</div>
                        <div class="detalle-cantidad tw-600 f-16">${cuadroEspec.cantidad}</div>
                        <div class="operacion pointer" onclick="operacion('+')">+</div>
                      </div>
                      <div class="tw-600 f-16 text-underline pointer" onclick="deleteProd(${cuadroEspec.id});">Eliminar</div>
                    </div>
                  </div>
                </div>
              </div>
            `
  $("#productos").append(html);

  if(imagenAgregado){
    var imageURL = URL.createObjectURL(file);
    var uploadedImage = $('.uploadedImage'+cuadroEspec.id);
    var imageContainer = $('.imageContainer');
    uploadedImage.attr('src', imageURL);
    imageContainer.css('display', 'block');
  }
}

function inicio() {
  
  $(".carrito").hide();
  $("." + seccion + pasoCounter).hide();
  $(".servicio").show();

  for(let i = 1; i <= pasoCounter; i++){
    $("." + cuadro + i).hide();
    if (i > 1){
      $(`li:contains("${i}")`).removeClass("step-actual");
      $(`li:contains("${i}")`).addClass("step-prox");
    }
  }
  
  //Reiniciar valores del cuadro 
  $(".valorLargo").html("00.0 cm");
  $(".valorAncho").html("00.0 cm");
  $(".valorPassport").html("00 cm");
  $("#largo").val("");
  $("#ancho").val("");
  $('input').prop("checked", false);
  $(".btnColorBorder").removeClass("btnColorBorder");

  pasoCounter = 1;
  $("." + seccion + pasoCounter).hide();
  cuadro = 'cuadro';
  seccion = "";
  colorEnmarcacion = "";
  botonPrevio = null;
  cuadroEspec = {
    tipo: '',
    orientacion: '',
    largo: '',
    ancho: '',
    modelo: '',
    color: '',
    paspartu: '',
    anchoPaspartu: '',
    tipoPaspartu: '',
    cantidad: 0,
    urlImg : ''

  }

  var uploadedImage = $('.uploadedImage');
  uploadedImage.attr('src', "assets/svg/cuadroNegroBlanco.svg");

  imagenAgregado = false;
}

function verCarrito(){
  window.modal_carrito.close();
  console.log(seccion+pasoCounter);
  inicio();
  $(".servicio").hide();
  $(".carrito").show();
}

function deleteProd(ProducID){
  totalProd = totalProd.filter((item) => item.id !== ProducID)
  // totalProd.splice(ProducID,1);
  $(`#${ProducID}`).remove();
  localStorage.setItem("totalProd", JSON.stringify(totalProd));
  console.log("totalProd: ");
  console.log(totalProd);
  $(".cantCarro").html(totalProd.length);
}

$('#uploadInput').on('change', function (event) {
    imagenAgregado = true;  
    var uploadedImage = $('.uploadedImage');
    var imageContainer = $('.imageContainer');

    file = event.target.files[0];

    if (file) {
        var imageURL = URL.createObjectURL(file);
        console.log("imageURL: " + imageURL);
        cuadroEspec.urlImg = imageURL 
        uploadedImage.attr('src', imageURL);
        imageContainer.css('display', 'block');
    }

    var filename = $(this).val().split("\\").pop();
    cuadroEspec.nombreImg = filename;
    $(".nombreImagen").html(filename);


});
