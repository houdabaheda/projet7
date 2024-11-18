function extractUniqueIngredients(recipes) {
    const allIngredients = [];

    // Parcourir chaque recette et chaque ingrédient
    recipes.forEach(recipe => {
        recipe.ingredients.forEach(item => {
            // Ajouter le nom de l'ingrédient s'il n'est pas déjà présent dans le tableau
            if (!allIngredients.includes(item.ingredient)) {
                allIngredients.push(item.ingredient);
            }
        });
    });
    return allIngredients;

}
const allIngredients = extractUniqueIngredients(recipes);


function extractUniqueAppliances(recipes) {

    const allAppliances = [];

    // Boucle sur chaque recette pour ajouter chaque appareil sans doublon
    recipes.forEach(recipe => {
        const appliance = recipe.appliance;
        if (!allAppliances.includes(appliance)) { // Vérifie si l'appareil est déjà dans le tableau
            allAppliances.push(appliance);
        }
    });

    return allAppliances;
}
const allAppliances = extractUniqueAppliances(recipes);

function extractUniqueUstensils(recipes) {
    const allUstensils = [];

    // Boucle sur chaque recette pour ajouter chaque ustensile sans doublon
    recipes.forEach(recipe => {
        recipe.ustensils.forEach(ustensil => {
            if (!allUstensils.includes(ustensil)) { // Vérifie si l'ustensile est déjà dans le tableau
                allUstensils.push(ustensil);
            }
        });
    });
    return allUstensils;

}
const allUstensils=extractUniqueUstensils(recipes);



function number (recipes){
    const number =recipes.length;

    const num=document.querySelector('.number');
    num.innerText = `${number} RECETTES`;



}

