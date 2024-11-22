/* global recipes  */


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
/* eslint-disable no-unused-vars */
const allIngredients = extractUniqueIngredients(recipes);
/* eslint-enable no-unused-vars */


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
/* eslint-disable no-unused-vars */
const allAppliances = extractUniqueAppliances(recipes);
/* eslint-enable no-unused-vars */


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
/* eslint-disable no-unused-vars */
const allUstensils=extractUniqueUstensils(recipes);
/* eslint-enable no-unused-vars */


/* eslint-disable-next-line no-unused-vars */
function number (recipes){
    const number =recipes.length;


    const num=document.querySelector('.number');
    num.innerText = `${number} RECETTES`;



}

