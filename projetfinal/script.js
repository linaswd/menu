let panier = {};
let total = 0;

function modifierQuantite(nomProduit, prix, changement, idAffichage) {
    if (!panier[nomProduit]) {
        panier[nomProduit] = { prix: prix, quantite: 0 };
    }

    panier[nomProduit].quantite += changement;

    if (panier[nomProduit].quantite < 0) {
        panier[nomProduit].quantite = 0;
    }

    document.getElementById(idAffichage).textContent = panier[nomProduit].quantite;

    // Animation du compteur
    document.getElementById(idAffichage).style.transform = "scale(1.3)";
    setTimeout(() => {
        document.getElementById(idAffichage).style.transform = "scale(1)";
    }, 200);

    calculerTotal();
    afficherPanier();
    majPanierFlottant();
}

function calculerTotal() {
    total = 0;
    for (let item in panier) {
        total += panier[item].prix * panier[item].quantite;
    }
}

function majPanierFlottant() {
    const floatBtn = document.getElementById("cart-floating");
    const floatCount = document.getElementById("float-count");
    const floatTotal = document.getElementById("float-total");
    
    let nbArticles = 0;
    for (let item in panier) {
        nbArticles += panier[item].quantite;
    }

    if (nbArticles > 0) {
        floatBtn.style.display = "flex";
        floatCount.textContent = nbArticles;
        floatTotal.textContent = total;
    } else {
        floatBtn.style.display = "none";
    }
}

function afficherPanier() {
    const liste = document.getElementById("panier-liste");
    const totalSpan = document.getElementById("total");
    liste.innerHTML = "";
    
    let vide = true;
    for (let nom in panier) {
        if (panier[nom].quantite > 0) {
            liste.innerHTML += `<p><strong>${panier[nom].quantite}x</strong> ${nom} <span style="float:right">${panier[nom].prix * panier[nom].quantite} DH</span></p>`;
            vide = false;
        }
    }

    if (vide) {
        liste.innerHTML = "<p style='text-align:center; color:grey'>Votre panier est vide</p>";
    }
    
    totalSpan.textContent = total;
}

function commanderPanier() {
    if (total === 0) {
        alert("Votre panier est vide !");
        return;
    }
    const numero = "212682300363";
    let message = "🍟 *Nouvelle commande Shawarma Al Baik*\n\n";
    
    for (let nom in panier) {
        if (panier[nom].quantite > 0) {
            message += `✅ ${panier[nom].quantite}x ${nom}\n`;
        }
    }
    
    message += `\n💰 *Total : ${total} DH*`;
    window.open(`https://wa.me/${numero}?text=${encodeURIComponent(message)}`, "_blank");
}