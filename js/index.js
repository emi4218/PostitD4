let tabPostIt = []

let cookie = readCookie("postIt")
if (cookie != null) {
    JSON.parse(cookie).forEach(post => { // parse change chaîne de caractères en JSON (Objet JavaScript)
        console.log(post)
        if (post != null) {
            tabPostIt.push(new PostIt(tabPostIt.length, post.x, post.y, post.largeur, post.hauteur, post.couleur, post.contenu))
            tabPostIt[tabPostIt.length - 1].affichage()
        }
    });
}
setInterval(() => {
    let cookie2 = JSON.stringify(tabPostIt) // Stringify change Objet/tableau en chaîne de caractères
    console.log(cookie2)
    createCookie("postIt", cookie2, 365)
}, 1000)

let numPostit = -1
let action = ""
let mPX = 0
let mPY = 0

document.getElementById('ajoutP').addEventListener('click', () => {
    tabPostIt.push(new PostIt(tabPostIt.length))
    tabPostIt[tabPostIt.length - 1].affichage()
})

document.addEventListener('mousemove', (event) => {
    mPX = event.clientX
    mPY = event.clientY
    if (numPostit !== -1 && action === "deplace") {
        tabPostIt[numPostit].deplace(mPX - tabPostIt[numPostit].largeur, mPY - tabPostIt[numPostit].hauteur)
        tabPostIt[numPostit].affichage()
    }
    if (numPostit !== -1 && action === "redim") {
        tabPostIt[numPostit].redim(tabPostIt[numPostit].largOrig + (mPX - tabPostIt[numPostit].sourisXOrig), tabPostIt[numPostit].hautOrig + (mPY - tabPostIt[numPostit].sourisYOrig))
        tabPostIt[numPostit].affichage()
    }
})

document.addEventListener('click', () => {
    numPostit = -1
    action = ""
})

document.addEventListener('keydown', (e) => {
    console.log(e)
    if (numPostit !== -1 && action === "edit") {
        if (e.key === "Shift" || e.key === "Control") { }
        else if (e.key === "Enter") {
            tabPostIt[numPostit].edition(tabPostIt[numPostit].contenu + "<br>")
            tabPostIt[numPostit].affichage()
        }
        else if (e.key === "Backspace") {
            tabPostIt[numPostit].edition(tabPostIt[numPostit].contenu.substr(0, tabPostIt[numPostit].contenu.length - 1))
            tabPostIt[numPostit].affichage()
        }
        else {
            tabPostIt[numPostit].edition(tabPostIt[numPostit].contenu + e.key)
            tabPostIt[numPostit].affichage()
        }
    }
})
setInterval(() => {
    document.querySelector('.debug').innerHTML = "numpostit = " + numPostit + " | action = " + action + " | pos souris X = " + mPX + " | pos souris Y = " + mPY
}, 500);

/**
 * Fonction qui supprime un postit dans le tableau
 * 
 * @param {number} num - numéro du post it à supprimer
 */
function suppPostIt(num) {
    //tabPostIt.splice(num, 1)
    delete tabPostIt[num]
    console.log(tabPostIt.length)

}


function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}