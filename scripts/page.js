console.log(recipes)
const plats = recipes


function genererPlats(plats) {

    for (const plat of plats) {
        const imageElement = document.createElement("img");
        imageElement.src = `../image/${plat.image}`;

        const minute = document.createElement("p")
        minute.innerText = `${plat.time} min `
        minute.className = "minute";

        const TitleElement = document.createElement("h1")
        TitleElement.innerText = plat.name;

        const recette = document.createElement("h2")
        recette.innerText = `RECETTE`;

        const description = document.createElement("p")
        description.innerText = `${plat.description}`;

        const ingredienTitre = document.createElement("h3")
        ingredienTitre.innerText = `Ingrédients`;

        // Conteneur des ingrédients
        const ingredientsContainer = document.createElement("div");
        ingredientsContainer.className = "ingredients-container";

        // Ajout des ingrédients en colonnes
        for (const ingredient of plat.ingredients) {

            const ingredientItem = document.createElement("div");
            ingredientItem.className = "ingredient-item";

            const ingredientName = document.createElement("span");
            ingredientName.className = "name";
            ingredientName.innerText = ingredient.ingredient;

            const ingredientDetails = document.createElement("span");
            ingredientDetails.className = "details";
            ingredientDetails.innerText = `${ingredient.quantity || ""} ${ingredient.unit || ""}`;

            // Ajout des éléments dans le conteneur d'ingrédient
            ingredientItem.appendChild(ingredientName);
            ingredientItem.appendChild(ingredientDetails);
            ingredientsContainer.appendChild(ingredientItem);
        }

        const sectionPlats = document.querySelector(".plats-section");
        const platsElement = document.createElement("article");
        sectionPlats.appendChild(platsElement);
        platsElement.appendChild(imageElement);
        platsElement.appendChild(minute);
        const recetteElement = document.createElement("div")
        recetteElement.className = "recette";
        recetteElement.appendChild(TitleElement);

        recetteElement.appendChild(recette);
        recetteElement.appendChild(description);
        recetteElement.appendChild(ingredienTitre);
        recetteElement.appendChild(ingredientsContainer);
        platsElement.appendChild(recetteElement);

    }
}

populateIngredientList(allIngredients, plats);
populateIngredientListAPP(allAppliances, plats);
populateIngredientListUS(allUstensils, plats);
number(plats)
genererPlats(plats)





let filteredRecipe = [];
let rh = [];



document.querySelector('.search-bar input').addEventListener('input', (e) => {
    const searchQuery = e.target.value.toLowerCase();
    filteredRecipe = []



    if (searchQuery.length >= 3) {

        const hasSelectedItems = selectedINGRS.length > 0 || selectedAPPS.length > 0 || selectedUstensils.length > 0;
        if (hasSelectedItems) {
            rh = applyFilters(filteredRecipe)

        }


        // Filtrer les recettes correspondant à la recherche
        function areCharactersEqualIgnoreCase(char1, char2) {
            const diff = 'a'.charCodeAt(0) - 'A'.charCodeAt(0);
            if (char1 >= 'A' && char1 <= 'Z') {
                char1 = String.fromCharCode(char1.charCodeAt(0) + diff);
            }
            if (char2 >= 'A' && char2 <= 'Z') {
                char2 = String.fromCharCode(char2.charCodeAt(0) + diff);
            }
            return char1 === char2;
        }

        function areStringsEqualIgnoreCase(str1, str2, start) {
            for (let i = 0; i < str2.length; i++) {
                if (!areCharactersEqualIgnoreCase(str1[start + i], str2[i])) {
                    return false;
                }
            }
            return true;
        }

        for (let i = 0; i < plats.length; i++) {
            const plat = plats[i];
            let ingredientMatch = false;

            // Boucle pour vérifier si un des ingrédients contient la recherche sans tenir compte de la casse
            for (let j = 0; j < plat.ingredients.length; j++) {
                const ingredient = plat.ingredients[j].ingredient;

                for (let k = 0; k <= ingredient.length - searchQuery.length; k++) {
                    if (areStringsEqualIgnoreCase(ingredient, searchQuery, k)) {
                        ingredientMatch = true;
                        break;
                    }
                }
                if (ingredientMatch) break;
            }

            // Vérification pour le nom et la description sans tenir compte de la casse
            let nameMatch = false;
            let descriptionMatch = false;
            const name = plat.name;
            const description = plat.description;

            for (let k = 0; k <= name.length - searchQuery.length; k++) {
                if (areStringsEqualIgnoreCase(name, searchQuery, k)) {
                    nameMatch = true;
                    break;
                }
            }

            for (let k = 0; k <= description.length - searchQuery.length; k++) {
                if (areStringsEqualIgnoreCase(description, searchQuery, k)) {
                    descriptionMatch = true;
                    break;
                }
            }

            // Ajouter le plat si l'un des critères est respecté
            if (nameMatch || descriptionMatch || ingredientMatch) {
                filteredRecipe[filteredRecipe.length] = plat;
            }
        }



        // Effacer les plats affichés actuellement
        document.querySelector('.plats-section').innerHTML = '';

        if (filteredRecipe.length >= 1 && !hasSelectedItems) {

            genererPlats(filteredRecipe);


            document.querySelector('.number').innerHTML = '';
            number(filteredRecipe);





            const allIngredientsTag = extractUniqueIngredients(filteredRecipe);
            const allAppliancesTag = extractUniqueAppliances(filteredRecipe);
            const allUstensilsTag = extractUniqueUstensils(filteredRecipe);

            // Effacer tous les éléments avec la classe `.liste1`
            document.querySelectorAll('.liste1').forEach(element => {
                element.innerHTML = '';
            });

            // Faire la même chose pour `.liste` et `.liste2`
            document.querySelectorAll('.liste').forEach(element => {
                element.innerHTML = '';
            });

            document.querySelectorAll('.liste2').forEach(element => {
                element.innerHTML = '';
            });




            populateIngredientList(allIngredientsTag, filteredRecipe);
            populateIngredientListAPP(allAppliancesTag, filteredRecipe);
            populateIngredientListUS(allUstensilsTag, filteredRecipe);

            document.querySelector('.no-results-message').innerHTML = '';


        }

        if (filteredRecipe.length >= 1 && hasSelectedItems && rh.length === 0) {
            const noResultsMessage = document.querySelector('.no-results-message');

            noResultsMessage.textContent = `Aucune recette ne contient « ${searchQuery} ». Vous pouvez chercher « tarte aux pommes », « poisson », etc.`;
            noResultsMessage.style.display = 'block';
            document.querySelector('.number').innerHTML = '';
            number(rh);
            const allIngredientsTag = extractUniqueIngredients(rh);
            const allAppliancesTag = extractUniqueAppliances(rh);
            const allUstensilsTag = extractUniqueUstensils(rh);

            // Effacer tous les éléments avec la classe `.liste1`
            document.querySelectorAll('.liste1').forEach(element => {
                element.innerHTML = '';
            });

            // Faire la même chose pour `.liste` et `.liste2`
            document.querySelectorAll('.liste').forEach(element => {
                element.innerHTML = '';
            });

            document.querySelectorAll('.liste2').forEach(element => {
                element.innerHTML = '';
            });




            populateIngredientList(allIngredientsTag, rh);
            populateIngredientListAPP(allAppliancesTag, rh);
            populateIngredientListUS(allUstensilsTag, rh);


        }
        if (filteredRecipe.length === 0) {
            const noResultsMessage = document.querySelector('.no-results-message');

            noResultsMessage.textContent = `Aucune recette ne contient « ${searchQuery} ». Vous pouvez chercher « tarte aux pommes », « poisson », etc.`;
            noResultsMessage.style.display = 'block';
            document.querySelector('.number').innerHTML = '';
            number(filteredRecipe);
            const allIngredientsTag = extractUniqueIngredients(filteredRecipe);
            const allAppliancesTag = extractUniqueAppliances(filteredRecipe);
            const allUstensilsTag = extractUniqueUstensils(filteredRecipe);

            // Effacer tous les éléments avec la classe `.liste1`
            document.querySelectorAll('.liste1').forEach(element => {
                element.innerHTML = '';
            });

            // Faire la même chose pour `.liste` et `.liste2`
            document.querySelectorAll('.liste').forEach(element => {
                element.innerHTML = '';
            });

            document.querySelectorAll('.liste2').forEach(element => {
                element.innerHTML = '';
            });




            populateIngredientList(allIngredientsTag, filteredRecipe);
            populateIngredientListAPP(allAppliancesTag, filteredRecipe);
            populateIngredientListUS(allUstensilsTag, filteredRecipe);
        }
        if (rh.length >= 1) {

            genererPlats(rh);


            document.querySelector('.number').innerHTML = '';
            number(rh);





            const allIngredientsTag = extractUniqueIngredients(rh);
            const allAppliancesTag = extractUniqueAppliances(rh);
            const allUstensilsTag = extractUniqueUstensils(rh);

            // Effacer tous les éléments avec la classe `.liste1`
            document.querySelectorAll('.liste1').forEach(element => {
                element.innerHTML = '';
            });

            // Faire la même chose pour `.liste` et `.liste2`
            document.querySelectorAll('.liste').forEach(element => {
                element.innerHTML = '';
            });

            document.querySelectorAll('.liste2').forEach(element => {
                element.innerHTML = '';
            });




            populateIngredientList(allIngredientsTag, rh);
            populateIngredientListAPP(allAppliancesTag, rh);
            populateIngredientListUS(allUstensilsTag, rh);

            document.querySelector('.no-results-message').innerHTML = '';


        }

    } else if (searchQuery.length >= 1 && searchQuery.length < 3) {

        document.querySelector('.plats-section').innerHTML = '';





        document.querySelector('.number').innerHTML = '';
        number(plats);

        genererPlats(plats)
        populateIngredientList(allIngredients, plats);
        populateIngredientListAPP(allAppliances, plats);
        populateIngredientListUS(allUstensils, plats);


    } else if (searchQuery.length === 0) {

        filteredRecipe = []

        filteredRecipes = applyFilters(plats);



        document.querySelector('.plats-section').innerHTML = '';
        genererPlats(filteredRecipes);

        document.querySelector('.number').innerHTML = '';
        number(filteredRecipes);


        document.querySelectorAll('.liste').forEach(element => {
            element.innerHTML = '';
        });
        TagINGR = extractUniqueIngredients(filteredRecipes).filter(ingredient => !selectedINGRS.includes(ingredient));
        populateIngredientList(TagINGR, recipes);


        document.querySelectorAll('.liste1').forEach(element => {
            element.innerHTML = '';
        });
        TagApp = extractUniqueAppliances(filteredRecipes).filter(appliance => !selectedAPPS.includes(appliance));
        populateIngredientListAPP(TagApp, filteredRecipes);


        document.querySelectorAll('.liste2').forEach(element => {
            element.innerHTML = '';
        });
        const Tag = extractUniqueUstensils(filteredRecipes).filter(ustensil => !selectedUstensils.includes(ustensil));
        populateIngredientListUS(Tag, filteredRecipes);

    }
});