class PostIt {
    x
    y
    largeur
    hauteur
    couleur
    contenu
    num

    /**
     *  Constructeur de la classe PostIt 
     * @param {number} num - id du post-it
     * @param {number} x - position en x du post-it
     * @param {number} y - position en y du post-it
     * @param {number} l - largeur du post-it
     * @param {number} h - hauteur du post-it
     * @param {String} couleur - couleur du post-it
     * @param {String} contenu - contenu du post-it
     */
    constructor(num, x = 100, y = 100, l = 200, h = 200, couleur = "pink", contenu = "") {
        this.num = num
        this.x = x
        this.y = y
        this.contenu = contenu
        this.largeur = l
        this.hauteur = h
        this.couleur = couleur
    }

    /**
     * Permet de déplacer un post-it 
     * @param {number} x - position en x du post-it
     * @param {number} y - position en y du post-it
     */
    deplace(x, y) {
        this.x = x
        this.y = y
    }

    /**
     *  Permet de redimensionner le post-it
     * @param {number} a - largeur du post-it
     * @param {number} b - hauteur du post-it
     */
    redim(a, b) {
        this.largeur = a
        this.hauteur = b
    }

    /**
     * Permet d'écrire dans le post-it
     * @param {String} t - texte du post-it (contenu)
     */
    edition(t) {
        this.contenu = t
    }

    /**
     * Affiche le post-it 
     */
    affichage() {
        let newPost = false
        let monPost = document.getElementById("postit" + this.num)
        if (monPost === null) {
            newPost = true
            monPost = document.createElement('div')
            monPost.classList.add('postIt')
            monPost.id = "postit" + this.num
        }

        monPost.style.position = "fixed"
        monPost.style.top = this.y + "px"
        monPost.style.left = this.x + "px"
        monPost.style.width = this.largeur + "px"
        monPost.style.height = this.hauteur + "px"
        monPost.style.backgroundColor = this.couleur
        monPost.innerHTML = this.contenu

        let menu = document.createElement('div')
        menu.classList.add('bottomMenu')

        let btnDel = document.createElement('i')
        btnDel.classList.add("fas", "fa-eraser")
        btnDel.addEventListener('click', (e) => {
            document.body.removeChild(monPost)
            suppPostIt(this.num)
            e.stopPropagation()
        })
        menu.appendChild(btnDel)

        let btnEdit = document.createElement('i')
        btnEdit.classList.add("fas", "fa-user-edit")
        btnEdit.addEventListener('click', (e) => {
            if (numPostit !== this.num) {
                numPostit = this.num
                action = "edit"
            } else {
                numPostit = -1
                action = ""
            }
            e.stopPropagation()
        })
        menu.appendChild(btnEdit)

        let btnResize = document.createElement('i')
        btnResize.title = "redim"
        btnResize.classList.add("fas", "fa-crop-alt")
        btnResize.addEventListener('click', (e) => {
            if (numPostit !== this.num) {
                numPostit = this.num
                action = "redim"
                this.largOrig = this.largeur
                this.hautOrig = this.hauteur
                this.sourisXOrig = mPX
                this.sourisYOrig = mPY
            } else {
                numPostit = -1
                action = ""
            }
            e.stopPropagation()
        })
        menu.appendChild(btnResize)

        let btnDeplace = document.createElement('i')
        btnDeplace.classList.add("fas", "fa-suitcase-rolling")
        btnDeplace.addEventListener('click', e => {
            if (numPostit !== this.num) {
                numPostit = this.num
                action = "deplace"
            } else {
                numPostit = -1
                action = ""
            }
            e.stopPropagation()
        })
        menu.appendChild(btnDeplace)

        monPost.appendChild(menu)

        if (newPost) {
            document.body.appendChild(monPost)
        }

    }
}