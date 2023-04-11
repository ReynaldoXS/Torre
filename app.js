//Definicion de variables para la API
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const apiUrl = 'https://torre.bio/api/bios/';
//Definicion variables para mostrar en la web
const nameId = document.getElementById("nameId");
const profilePic = document.getElementById("profilePic");
const article = document.querySelector('article');

//Definicion de matrices para determinar el nivel de habilidad
// const skills = data.strengths;
const masterSkills = [];
const proficientSkills = [];
const noviceSkills = [];
const interestedSkills = [];

// Funcion para mostrar la carta con los datos de usuario
function mostrarArticulo() {
    article.style.display = 'block';
}

const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
  event.preventDefault(); // Evitar que el formulario se envíe por defecto
  
  //Limpieza de las listas para que se arreglen independientemente de cada usuario
  masterSkills.length = 0;
  proficientSkills.length = 0;
  noviceSkills.length = 0;
  interestedSkills.length = 0;

  const usernameInput = document.querySelector('#username-input');
  const username = usernameInput.value.trim(); // Obtener el valor del campo de entrada de datos

  if (username.length === 0) {
    // Validacion en caso de que el campo se encuentre vacío.
    const resultsDiv = document.getElementById('results');
    resultsDiv.textContent = 'Por favor ingrese un nombre de usuario';
    return;
}
const apiUrlDynamic = apiUrl + username;
fetch(proxyUrl + apiUrlDynamic)
    .then(response => response.json())
    .then(data => {

        console.log(data)

        //Llamado del nombre del usuario
        const name=data.person.name
        nameId.innerHTML = name;
        //Llamado de la foto del usuario
        const photo=data.person.picture
        profilePic.src=photo


        // const skills = data.strengths.map(strength => strength.name);
        const skills = data.strengths.map(strength => ({ name: strength.name, proficiency: strength.proficiency }));
        console.log(skills[1])

        //Funcion de recorrido para obtener el nivel de habilidad\
        skills.forEach(skills =>{
            if(skills.proficiency=="master"){
                masterSkills.push(skills.name)
                console.log(masterSkills)
            } else if(skills.proficiency=="proficient"){
                proficientSkills.push(skills.name)
                console.log(proficientSkills)
            } else if(skills.proficiency=="novice"){
                noviceSkills.push(skills.name)
                console.log(noviceSkills)
            } else{
                interestedSkills.push(skills.name)
                console.log(interestedSkills)
            }
        });

        // Definicion de habilidad segun el nivel
        const listMaster = document.getElementById("resMaster")
        listMaster.innerHTML=''
        masterSkills.forEach(name1 =>{
            const li = document.createElement('li');
            li.textContent = name1;
            listMaster.appendChild(li);
        })

        const listProf = document.getElementById('resProficient');
        listProf.innerHTML=''
        proficientSkills.forEach(name2 =>{
            const li1 = document.createElement('li');
            li1.textContent = name2;
            listProf.appendChild(li1);
        })

        const listNov = document.getElementById("resNovice")
        listNov.innerHTML=''
        noviceSkills.forEach(name3 =>{
            const li2 = document.createElement('li');
            li2.textContent = name3;
            listNov.appendChild(li2);
        })

        const listInT = document.getElementById("resInterest")
        listInT.innerHTML=''
        interestedSkills.forEach(name4 =>{
            const li3 = document.createElement('li');
            li3.textContent = name4;
            listInT.appendChild(li3);
        })      

        mostrarArticulo();

    })
    .catch(error => {
        console.error(error);
        const resultsDiv = document.getElementById('results');
        resultsDiv.textContent = 'No se pudieron obtener los datos';
    });
});