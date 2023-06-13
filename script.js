
const currentDate = document.querySelector(".current-date");
daysTag = document.querySelector(".days");
prevNextIcon = document.querySelectorAll(".icons span");

// On récupère new Date, l'année courante et le mois courant 
let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();

// console.log(date, currYear, currMonth);

//Tableau contenant le nom des mois en français
const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre",  "Novembre", "Décembre"];

const renderCalendar = () => {

    let firstDateofMonth = new Date(currYear, currMonth, 1).getDay(); // On récupère les 1er jours du mois
    let lastDateofMonth = new Date(currYear, currMonth  + 1, 0).getDate(); //On récupère le nombre de jours dans le mois courant
    let lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
    let lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay();
    let liDays = "";

    for (let i = firstDateofMonth; i > 0; i--){ //Crée les li des derniers jours du mois précédent
        liDays += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }

    //On parcours chaque jours du mois courant et les affiches individuellement dans un li
    for (let i = 1; i <= lastDateofMonth; i++){
        let isToday = i === date.getDate() && currMonth === new Date().getMonth() && currYear === new Date().getFullYear() ? "active" : "";
        liDays += `<li class="${isToday}">${i}</li>`;
    }

    for (let i = lastDayofMonth; i < 6; i++ ){ //Crée les li des 1ers jours du mois suivant
        liDays += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
    }

    currentDate.innerText = `${months[currMonth]} ${currYear}`;
    daysTag.innerHTML = liDays;

}
renderCalendar();

prevNextIcon.forEach(icon => {

    // On ajoute un event sur chaque bouton
    icon.addEventListener("click", () => { 
        
        // Si bouton précédent est cliqué, alors currMonth décrémente de 1, sinon incrémente de 1
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

         if(currMonth < 0 || currMonth > 11){ //Si le mois actuel est inférieur à 0 ou supérieur à 11

            //On crée une nouvelle date de l'année et du mois courant et remplace la valeur précédente de date
            date = new Date(currYear, currMonth);

            currYear = date.getFullYear(); //Mise à jour de l'ancienne année courante avec la nouvelle

            currMonth = date.getMonth(); //Mise à jour de l'ancien mois courant avec le nouveau
         }
         else { //Sinon, on passe new Date() comme valeur à date
            date = new Date();
         }
        renderCalendar();

    });

});