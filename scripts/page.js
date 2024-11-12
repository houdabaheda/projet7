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
console.log(allIngredients)
populateIngredientListAPP(allAppliances, plats);
populateIngredientListUS(allUstensils, plats);
number(plats)
genererPlats(plats)

let filteredRecipe = []; 





document.querySelector('.search-bar input').addEventListener('input', (e) => {
    const searchQuery = e.target.value.toLowerCase();  // Convertir l'entrée en minuscule pour une recherche insensible à la casse.

    if (searchQuery.length >= 3) {
        // Filtrer les recettes correspondant à la recherche
        filteredRecipe = plats.filter(plat => {
            return (
                plat.name.toLowerCase().includes(searchQuery) ||
                plat.description.toLowerCase().includes(searchQuery) ||
                plat.ingredients.some(ingredient =>
                    ingredient.ingredient.toLowerCase().includes(searchQuery)
                )
            );
        });
        console.log(filteredRecipe)

        // Effacer les plats affichés actuellement
        document.querySelector('.plats-section').innerHTML = '';

        if (filteredRecipe.length >= 1) {
            // Générer les plats filtrés
            genererPlats(filteredRecipe);

            console.log(filteredRecipe);

            document.querySelector('.number').innerHTML = '';
            number(filteredRecipe);





            const allIngredientsTag = extractUniqueIngredients(filteredRecipe);
            console.log(allIngredientsTag)
            const allAppliancesTag = extractUniqueAppliances(filteredRecipe);
            console.log(allAppliancesTag)
            const allUstensilsTag = extractUniqueUstensils(filteredRecipe);
            console.log(allUstensilsTag)

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


        } else {
            const noResultsMessage = document.querySelector('.no-results-message');
           
            noResultsMessage.textContent = `Aucune recette ne contient « ${searchQuery} ». Vous pouvez chercher « tarte aux pommes », « poisson », etc.`;
            noResultsMessage.style.display = 'block';
            document.querySelector('.number').innerHTML = '';
            number(filteredRecipe);
            


        }




    } else if (searchQuery.length >= 1 && searchQuery.length < 3) {

        document.querySelector('.plats-section').innerHTML = ''; // Ex: effacer les plats
        document.querySelector('.selected-items').innerHTML = ''; // Ex: effacer les plats

        document.querySelector('.number').innerHTML = '';
        number(plats);

        genererPlats(plats)
        populateIngredientList(allIngredients, plats);
        populateIngredientListAPP(allAppliances, plats);
        populateIngredientListUS(allUstensils, plats);


    } else if (searchQuery.length === 0) {
        filteredRecipe=[]
        // Si la barre de recherche est vide, afficher la liste complète des plats
        document.querySelector('.plats-section').innerHTML = '';
        genererPlats(plats);
        console.log(plats.length)

        document.querySelector('.number').innerHTML = '';
        number(plats);


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



        populateIngredientList(allIngredients, plats);
        populateIngredientListAPP(allAppliances, plats);
        populateIngredientListUS(allUstensils, plats);

    }
});


