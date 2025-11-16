
function togglePopup(nom) {
    let popup = document.getElementById("popup-" + nom);
    popup.classList.toggle("open");

    popup.addEventListener("click", function(event) {
        if (event.target === popup) {
            popup.classList.remove("open");
        }
    });
}

function defilement() {
    const navLiens = document.querySelectorAll('ul li a');

    navLiens.forEach(lien=> {
        lien.addEventListener('click', function(event) {
            event.preventDefault(); // Empêche le comportement par défaut du lien
            
            const cibleId = lien.getAttribute('data-target');
            const cibleElement = document.getElementById(cibleId);

            if (cibleElement) {
                cibleElement.scrollIntoView({ 
                    behavior: 'smooth' 
                });
            }
        });
    });
}


document.addEventListener('DOMContentLoaded', defilement);

/* Labubu Yeux qui bougent */
document.addEventListener("mousemove", (e) => {
  const yeux = document.querySelectorAll(".pupille");
  yeux.forEach(pupille => {
    const rect = pupille.parentElement.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    const angle = Math.atan2(y, x);
    const distance = Math.min(10, Math.hypot(x, y) / 20); // limite le déplacement

    const moveX = Math.cos(angle) * distance;
    const moveY = Math.sin(angle) * distance;

    pupille.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });
});
/* Labubu yeux qui bougent */

/* Labubu yeux qui bougent2 pour le graphique empilé */

document.addEventListener("mousemove", (e) => {
  const yeux = document.querySelectorAll(".pupille2");
  yeux.forEach(pupille2 => {
    const rect = pupille2.parentElement.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    const angle = Math.atan2(y, x);
    const distance = Math.min(10, Math.hypot(x, y) / 20); // limite le déplacement

    const moveX = Math.cos(angle) * distance;
    const moveY = Math.sin(angle) * distance;

    pupille2.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });
});
/* Labubu yeux qui bougent2 pour le graphique empilé */

/* Labubu Yeux qui bougent3 carte */

document.addEventListener("mousemove", (e) => {
  const yeux = document.querySelectorAll(".pupille3");
  yeux.forEach(pupille3 => {
    const rect = pupille3.parentElement.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    const angle = Math.atan2(y, x);
    const distance = Math.min(10, Math.hypot(x, y) / 20); // limite le déplacement

    const moveX = Math.cos(angle) * distance;
    const moveY = Math.sin(angle) * distance;

    pupille3.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });
});



/* Labubu Yeux qui bougent3 carte */


document.querySelector('.remonte_page').addEventListener('click', function(test){
    const CibleLogo = document.querySelector('.logo');
    document.querySelector('body').scrollIntoView({behavior: 'smooth'})
})


window.addEventListener("scroll", function () {
    let positionY = window.scrollY; // position verticale actuelle du scroll
    let bouton = document.querySelector(".remonte_page");
    let footer = document.querySelector('footer');
    let windowHeight = window.innerHeight; // Hauteur de la fenêtre

    if (positionY > 500) {
        bouton.classList.add('visible');
    } 
    else {
        bouton.classList.remove('visible');
    }

    let footerTop = footer.getBoundingClientRect().top + window.scrollY;
    let distanceFooter = footerTop - (positionY + windowHeight);

    if (distanceFooter < 0) {
        bouton.style.bottom = Math.abs(distanceFooter) + -50 + "px";
    } 
    else {
        bouton.style.bottom = "50px";
    }
});


document.querySelector('.menu-responsive').addEventListener('click', function(){
    document.querySelector('.menu-responsive').style.display = 'none';
})
document.querySelector('.menu-logo-responsive').addEventListener('click', function(){
    document.querySelector('.menu-responsive').style.display = 'block';
})
