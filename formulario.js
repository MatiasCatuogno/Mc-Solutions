const expresiones = {
 nombre: /^[a-zA-ZÀ-ÿ\s]{1,30}$/,
 asunto: /^[a-zA-ZÀ-ÿ\s]{1,20}$/,
 email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
 mensaje: /^.{4,500}$/,
};

const campos = {
 nombre: false,
 asunto: false,
 email: false,
 mensaje: false,
};

const inputNombre = document.getElementById("nombre");
const inputAsunto = document.getElementById("asunto");
const inputEmail = document.getElementById("email");
const inputMensaje = document.getElementById("mensaje");

const formulario = document.getElementById("formulario");

const validarNombre = (evento) => {
 if (expresiones.nombre.test(evento.target.value)) {
  document.querySelector("#grupo_nombre i").classList.remove("icono_input_con_error");
  document.querySelector("#grupo_nombre input").classList.remove("formulario_input_con_error");
  document.querySelector("#grupo_nombre p").classList.remove("formulario_input_error_activo");

  campos.nombre = true;
 } else {
  document.querySelector("#grupo_nombre i").classList.add("icono_input_con_error");
  document.querySelector("#grupo_nombre input").classList.add("formulario_input_con_error");
  document.querySelector("#grupo_nombre p").classList.add("formulario_input_error_activo");

  campos.nombre = false;
 }
};

const validarAsunto = (evento) => {
 if (expresiones.asunto.test(evento.target.value)) {
  document.querySelector("#grupo_asunto i").classList.remove("icono_input_con_error");
  document.querySelector("#grupo_asunto input").classList.remove("formulario_input_con_error");
  document.querySelector("#grupo_asunto p").classList.remove("formulario_input_error_activo");

  campos.asunto = true;
 } else {
  document.querySelector("#grupo_asunto i").classList.add("icono_input_con_error");
  document.querySelector("#grupo_asunto input").classList.add("formulario_input_con_error");
  document.querySelector("#grupo_asunto p").classList.add("formulario_input_error_activo");

  campos.asunto = false;
 }
};

const validarEmail = (evento) => {
 if (expresiones.email.test(evento.target.value)) {
  document.querySelector("#grupo_email i").classList.remove("icono_input_con_error");
  document.querySelector("#grupo_email input").classList.remove("formulario_input_con_error");
  document.querySelector("#grupo_email p").classList.remove("formulario_input_error_activo");

  campos.email = true;
 } else {
  document.querySelector("#grupo_email i").classList.add("icono_input_con_error");
  document.querySelector("#grupo_email input").classList.add("formulario_input_con_error");
  document.querySelector("#grupo_email p").classList.add("formulario_input_error_activo");

  campos.email = false;
 }
};

const validarMensaje = (evento) => {
 if (expresiones.mensaje.test(evento.target.value)) {
  document.querySelector("#grupo_mensaje i").classList.remove("icono_input_con_error");
  document.querySelector("#grupo_mensaje textarea").classList.remove("formulario_input_con_error");
  document.querySelector("#grupo_mensaje p").classList.remove("formulario_input_error_activo");

  campos.mensaje = true;
 } else {
  document.querySelector("#grupo_mensaje i").classList.add("icono_input_con_error");
  document.querySelector("#grupo_mensaje textarea").classList.add("formulario_input_con_error");
  document.querySelector("#grupo_mensaje p").classList.add("formulario_input_error_activo");

  campos.mensaje = false;
 }
};

inputNombre.addEventListener("input", validarNombre);
inputAsunto.addEventListener("input", validarAsunto);
inputEmail.addEventListener("input", validarEmail);
inputMensaje.addEventListener("input", validarMensaje);

inputNombre.addEventListener("blur", validarNombre);
inputAsunto.addEventListener("blur", validarAsunto);
inputEmail.addEventListener("blur", validarEmail);
inputMensaje.addEventListener("blur", validarMensaje);

formulario.addEventListener("submit", async function (event) {
 event.preventDefault();

 if ((campos.nombre && campos.asunto && campos.email && campos.mensaje) === true) {

  let formData = new FormData(this);

  try {
   let response = await fetch("./enviar.php", {
    method: "POST",
    body: formData,
   });

   let result = await response.json();

   if (result.status === "success") {
    document.getElementById("formulario_mensaje_correcto").classList.add("formulario_mensaje_correcto_activo");

    setTimeout(() => {
     document.getElementById("formulario_mensaje_correcto").classList.remove("formulario_mensaje_correcto_activo");
    }, 5000);

    this.reset();
   } else {
    alert("Error: " + result.message);
   }
  } catch (error) {
   document.getElementById("formulario_mensaje").classList.add("formulario_mensaje_error_activo");

   setTimeout(() => {
    document.getElementById("formulario_mensaje").classList.remove("formulario_mensaje_error_activo");
   }, 5000);

   console.error("Error", error);
  }
 } else {
  document.getElementById("formulario_mensaje").classList.add("formulario_mensaje_error_activo");

  setTimeout(() => {
   document.getElementById("formulario_mensaje").classList.remove("formulario_mensaje_error_activo");
  }, 5000);
 }
});