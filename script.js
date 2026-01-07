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

    // Effet visuel sur le nombre
    const el = document.getElementById(idAffichage);
    el.textContent = panier[nomProduit].quantite;
    el.classList.add('pop-animation');
    setTimeout(() => el.classList.remove('pop-animation'), 300);

    calculerTotal();
    afficherPanier();
    updateBadge();
}

function updateBadge() {
    const badge = document.getElementById('cart-badge');
    let qteTotale = 0;
    for (let item in panier) { qteTotale += panier[item].quantite; }
    
    if(qteTotale > 0) {
        badge.textContent = qteTotale;
        badge.style.display = 'flex';
        badge.classList.add('animate__animated', 'animate__bounceIn');
    } else {
        badge.style.display = 'none';
    }
}

function calculerTotal() {
    total = 0;
    for (let item in panier) {
        total += panier[item].prix * panier[item].quantite;
    }
}

function afficherPanier() {
    const liste = document.getElementById("panier-liste");
    const totalSpan = document.getElementById("total");
    liste.innerHTML = "";
    
    let vide = true;
    for (let nom in panier) {
        if (panier[nom].quantite > 0) {
            liste.innerHTML += `
                <div class="panier-item">
                    <span><strong>${panier[nom].quantite}x</strong> ${nom}</span>
                    <span style="font-weight:bold; color:#7a2e00">${panier[nom].prix * panier[nom].quantite} DH</span>
                </div>`;
            vide = false;
        }
    }

    if (vide) {
        liste.innerHTML = "<p style='text-align:center; color:grey'>Le panier attend vos envies...</p>";
    }
    
    totalSpan.textContent = total;
}

function commanderPanier() {
    if (total === 0) {
        alert("Votre panier est vide ! Choisissez vos délices d'abord.");
        return;
    }
    const numero = "212682300363";
    let message = "🍟 *Nouvelle commande Shawarma Al Baik*\n";
    message += "--------------------------\n";
    
    for (let nom in panier) {
        if (panier[nom].quantite > 0) {
            message += `✅ ${panier[nom].quantite}x ${nom}\n`;
        }
    }
    
    message += "--------------------------\n";
    message += `💰 *TOTAL À PAYER : ${total} DH*`;
    window.open(`https://wa.me/${numero}?text=${encodeURIComponent(message)}`, "_blank");
}

// Micro-interaction : Changement de couleur du nav au scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.backgroundColor = '#421800';
        nav.style.padding = '10px';
    } else {
        nav.style.backgroundColor = '#5a2100';
        nav.style.padding = '15px';
    }
});