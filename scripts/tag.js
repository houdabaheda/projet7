const selectBox = document.getElementById('selectBox');
const ingredientList = document.getElementById('ingredientList');
const arrow = document.getElementById('arrow');


const selectBoxAPP = document.getElementById('selectBoxAPP');
const ingredientListAPP = document.getElementById('ingredientListAPP');
const arrowAPP = document.getElementById('arrowAPP');


const selectBoxUS = document.getElementById('selectBoxUS');
const ingredientListUS = document.getElementById('ingredientListUS');
const arrowUS = document.getElementById('arrowUS');



const selectedItems = document.getElementById('selectedItems');
let isDropdownOpen = false;


function toggleDropdown(ingredientList, arrow) {
    if (isDropdownOpen) {
        ingredientList.style.display = 'none';
        arrow.classList.remove('fa-chevron-up');
        arrow.classList.add('fa-chevron-down');  
        isDropdownOpen = false;
    } else {
        ingredientList.style.display = 'block';
        arrow.classList.remove('fa-chevron-down'); 
        arrow.classList.add('fa-chevron-up');      
        isDropdownOpen = true;
    }
}

selectBox.addEventListener('click', () => toggleDropdown(ingredientList, arrow));
selectBoxAPP.addEventListener('click', () => toggleDropdown(ingredientListAPP, arrowAPP));
selectBoxUS.addEventListener('click', () => toggleDropdown(ingredientListUS, arrowUS));


// Cacher la liste si l'utilisateur clique en dehors de la dropdown
document.addEventListener('click', (event) => {
    if (!event.target.closest('.dropdown')) {
        ingredientList.style.display = 'none';
        arrow.classList.remove('fa-chevron-up');
        arrow.classList.add('fa-chevron-down');

        ingredientListAPP.style.display = 'none';
        arrowAPP.classList.remove('fa-chevron-up');
        arrowAPP.classList.add('fa-chevron-down');

        ingredientListUS.style.display = 'none';
        arrowUS.classList.remove('fa-chevron-up');
        arrowUS.classList.add('fa-chevron-down');
        isDropdownOpen = false;
    }
});


function applyFilters(recipes) {
    return recipes.filter(recipe =>
        selectedINGRS.every(ingredient =>
            recipe.ingredients.some(item => item.ingredient.toLowerCase() === ingredient.toLowerCase()) // correspondance insensible à la casse
        ) &&
        selectedAPPS.every(appliance =>
            recipe.appliance.toLowerCase() === appliance.toLowerCase() // correspondance insensible à la casse pour un appareil
        ) &&
        selectedUstensils.every(ustensil =>
            recipe.ustensils.some(item => item.toLowerCase() === ustensil.toLowerCase()) // correspondance insensible à la casse pour chaque ustensile
        )
    );
}




let filteredRecipes;
let selectedINGRS = [];
let TagINGR = [];


function populateIngredientList(allIngredients, recipes) {

    const searchBar = document.getElementById('searchInput');
    searchBar.addEventListener('input', filterIngredients);
    const list = document.createElement('div');
    list.classList.add('liste')
    ingredientList.appendChild(list);


    allIngredients.forEach(ingredient => {
        const item = document.createElement('div');
        item.classList.add('item');
        item.textContent = ingredient;


        item.addEventListener('click', (event) => {
            selectIngredient(ingredient, recipes);
            const selectedINGR = event.target.textContent;
            if (!selectedINGRS.includes(selectedINGR)) {
                selectedINGRS.push(selectedINGR);
            }
            const filteredRecipes = applyFilters(recipes);

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
            Tag = extractUniqueUstensils(filteredRecipes).filter(ustensil => !selectedUstensils.includes(ustensil));
            populateIngredientListUS(Tag, filteredRecipes);



        });


        list.appendChild(item);
    });
}

// Fonction pour gérer la sélection d'un ingrédient
function selectIngredient(ingredient, recipes) {
    if (!Array.from(selectedItems.children).some(item => item.textContent === ingredient)) {
        const div = document.createElement('div');
        div.classList.add('selected-item-container');

        const close = document.createElement('span');
        close.innerHTML = '<i class="fa-solid fa-xmark"></i>';

        const selectedItem = document.createElement('li');
        selectedItem.classList.add('item-container');
        selectedItem.textContent = ingredient;
        div.appendChild(selectedItem)
        div.appendChild(close)

        selectedItems.appendChild(div);

        close.addEventListener('click', () => {
            div.remove();
            const selectedText = selectedItem.textContent;
            selectedINGRS = selectedINGRS.filter(ingredient => ingredient !== selectedText);

            if (selectedINGRS.length > 0 || selectedAPPS.length > 0 || selectedUstensils.length > 0) {

                if (filteredRecipe.length === 0) {
                    filteredRecipes = applyFilters(plats); 
                } else {
                    filteredRecipes = applyFilters(filteredRecipe);
                }
                
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

            } else {
                if (filteredRecipe.length > 0) {

                    document.querySelector('.plats-section').innerHTML = '';
                    genererPlats(filteredRecipe);


                    document.querySelector('.number').innerHTML = '';
                    number(filteredRecipe);


                    document.querySelectorAll('.liste2').forEach(element => {
                        element.innerHTML = '';
                    });
                    Tag = extractUniqueUstensils(filteredRecipe);
                    populateIngredientListUS(Tag, filteredRecipe);


                    document.querySelectorAll('.liste1').forEach(element => {
                        element.innerHTML = '';
                    });
                    TagApp = extractUniqueAppliances(filteredRecipe);
                    populateIngredientListAPP(TagApp, filteredRecipe);



                    document.querySelectorAll('.liste').forEach(element => {
                        element.innerHTML = '';
                    });
                    TagINGR = extractUniqueIngredients(filteredRecipe);
                    populateIngredientList(TagINGR, filteredRecipe);

                } else {

                    document.querySelector('.plats-section').innerHTML = '';
                    genererPlats(plats);


                    document.querySelector('.number').innerHTML = '';
                    number(plats);


                    document.querySelectorAll('.liste2').forEach(element => {
                        element.innerHTML = '';
                    });
                    Tag = extractUniqueUstensils(plats);
                    populateIngredientListUS(Tag, plats);


                    document.querySelectorAll('.liste1').forEach(element => {
                        element.innerHTML = '';
                    });
                    TagApp = extractUniqueAppliances(plats);
                    populateIngredientListAPP(TagApp, plats);



                    document.querySelectorAll('.liste').forEach(element => {
                        element.innerHTML = '';
                    });
                    TagINGR = extractUniqueIngredients(plats);
                    populateIngredientList(TagINGR, plats);


                }

            }


        });
    }
    toggleDropdown(ingredientList, arrow)
}





let selectedAPPS = [];
let TagApp = [];

function populateIngredientListAPP(allAppliances, recipes) {


    const searchBarAPP = document.getElementById('searchInputAPP');
    searchBarAPP.addEventListener('input', filterIngredientsAPP);
    const list = document.createElement('div');
    list.classList.add('liste1')

    ingredientListAPP.appendChild(list);



    allAppliances.forEach(Appliance => {
        const item = document.createElement('div');
        item.classList.add('item');
        item.textContent = Appliance;
        item.addEventListener('click', (event) => {
            selectIngredientAPP(Appliance, recipes);
            const selectedAPP = event.target.textContent;
            if (!selectedAPPS.includes(selectedAPP)) {
                selectedAPPS.push(selectedAPP);
            }
            const filteredRecipes = applyFilters(recipes);


            document.querySelector('.plats-section').innerHTML = '';
            genererPlats(filteredRecipes);


            document.querySelector('.number').innerHTML = '';
            number(filteredRecipes);


            document.querySelectorAll('.liste1').forEach(element => {
                element.innerHTML = '';
            });
            TagApp = extractUniqueAppliances(filteredRecipes).filter(appliance => !selectedAPPS.includes(appliance));
            populateIngredientListAPP(TagApp, recipes);


            document.querySelectorAll('.liste2').forEach(element => {
                element.innerHTML = '';
            });
            Tag = extractUniqueUstensils(filteredRecipes).filter(ustensil => !selectedUstensils.includes(ustensil));
            populateIngredientListUS(Tag, filteredRecipes);


            document.querySelectorAll('.liste').forEach(element => {
                element.innerHTML = '';
            });
            TagINGR = extractUniqueIngredients(filteredRecipes).filter(ingredient => !selectedINGRS.includes(ingredient));
            populateIngredientList(TagINGR, filteredRecipes);
        });


        list.appendChild(item);
    });
}


function selectIngredientAPP(Appliance, recipes) {
    if (!Array.from(selectedItems.children).some(item => item.textContent === Appliance)) {
        const div = document.createElement('div');
        div.classList.add('selected-item-container');

        const close = document.createElement('span');
        close.innerHTML = '<i class="fa-solid fa-xmark"></i>';

        const selectedItem = document.createElement('li');
        selectedItem.classList.add('item-container');
        selectedItem.textContent = Appliance;
        div.appendChild(selectedItem)
        div.appendChild(close)

        selectedItems.appendChild(div);

        close.addEventListener('click', () => {
            div.remove();
            const selectedText = selectedItem.textContent;
            selectedAPPS = selectedAPPS.filter(appliance => appliance !== selectedText);


            if (selectedINGRS.length > 0 || selectedAPPS.length > 0 || selectedUstensils.length > 0) {

                if (filteredRecipe.length === 0) {
                    filteredRecipes = applyFilters(plats); 
                } else {
                    filteredRecipes = applyFilters(filteredRecipe);
                }



                document.querySelector('.plats-section').innerHTML = '';
                genererPlats(filteredRecipes);
                document.querySelector('.number').innerHTML = '';
                number(filteredRecipes);

                document.querySelectorAll('.liste1').forEach(element => {
                    element.innerHTML = '';
                });
                TagApp = extractUniqueAppliances(filteredRecipes).filter(appliance => !selectedAPPS.includes(appliance));
                populateIngredientListAPP(TagApp, recipes);


                document.querySelectorAll('.liste2').forEach(element => {
                    element.innerHTML = '';
                });
                const Tag = extractUniqueUstensils(filteredRecipes).filter(ustensil => !selectedUstensils.includes(ustensil));
                populateIngredientListUS(Tag, filteredRecipes);


                document.querySelectorAll('.liste').forEach(element => {
                    element.innerHTML = '';
                });
                TagINGR = extractUniqueIngredients(filteredRecipes).filter(ingredient => !selectedINGRS.includes(ingredient));
                populateIngredientList(TagINGR, filteredRecipes);

            } else {
                if (filteredRecipe.length > 0) {
                    document.querySelector('.plats-section').innerHTML = '';
                    genererPlats(filteredRecipe);


                    document.querySelector('.number').innerHTML = '';
                    number(filteredRecipe);

                    document.querySelectorAll('.liste2').forEach(element => {
                        element.innerHTML = '';
                    });
                    Tag = extractUniqueUstensils(filteredRecipe).filter(ustensil => !selectedUstensils.includes(ustensil));
                    populateIngredientListUS(Tag, filteredRecipe);


                    document.querySelectorAll('.liste1').forEach(element => {
                        element.innerHTML = '';
                    });
                    TagApp = extractUniqueAppliances(filteredRecipe);
                    populateIngredientListAPP(TagApp, filteredRecipe);


                    document.querySelectorAll('.liste').forEach(element => {
                        element.innerHTML = '';
                    });
                    TagINGR = extractUniqueIngredients(filteredRecipe);
                    populateIngredientList(TagINGR, filteredRecipe);

                } else {

                    document.querySelector('.plats-section').innerHTML = '';
                    genererPlats(plats);


                    document.querySelector('.number').innerHTML = '';
                    number(plats);


                    document.querySelectorAll('.liste2').forEach(element => {
                        element.innerHTML = '';
                    });
                    Tag = extractUniqueUstensils(plats).filter(ustensil => !selectedUstensils.includes(ustensil));

                    populateIngredientListUS(Tag, plats);


                    document.querySelectorAll('.liste1').forEach(element => {
                        element.innerHTML = '';
                    });
                    TagApp = extractUniqueAppliances(plats);
                    populateIngredientListAPP(TagApp, plats);

                    document.querySelectorAll('.liste').forEach(element => {
                        element.innerHTML = '';
                    });
                    TagINGR = extractUniqueIngredients(plats);
                    populateIngredientList(TagINGR, plats);

                }

            }


        });
    }
    toggleDropdown(ingredientListAPP, arrowAPP)// Fermer la liste après sélection
}


let selectedUstensils = [];
let Tag = [];

function populateIngredientListUS(allUstensils, recipes) {


    const searchBarUS = document.getElementById('searchInputUS');
    searchBarUS.addEventListener('input', filterIngredientsUS);

    const list = document.createElement('div');
    list.classList.add('liste2')

    ingredientListUS.appendChild(list);

    allUstensils.forEach(Ustensil => {
        const item = document.createElement('div');
        item.classList.add('item');
        item.textContent = Ustensil;


        item.addEventListener('click', (event) => {
            selectIngredientUS(Ustensil, recipes);


            const selectedUstensil = event.target.textContent;
            if (!selectedUstensils.includes(selectedUstensil)) {
                selectedUstensils.push(selectedUstensil);
            }
            
            const filteredRecipes = applyFilters(recipes);

            document.querySelector('.plats-section').innerHTML = '';
            genererPlats(filteredRecipes);


            document.querySelector('.number').innerHTML = '';
            number(filteredRecipes);

            document.querySelectorAll('.liste2').forEach(element => {
                element.innerHTML = '';
            });
            Tag = extractUniqueUstensils(filteredRecipes).filter(ustensil => !selectedUstensils.includes(ustensil));
            populateIngredientListUS(Tag, recipes);

            document.querySelectorAll('.liste1').forEach(element => {
                element.innerHTML = '';
            });
            TagApp = extractUniqueAppliances(filteredRecipes).filter(appliance => !selectedAPPS.includes(appliance));
            
            populateIngredientListAPP(TagApp, filteredRecipes);


            document.querySelectorAll('.liste').forEach(element => {
                element.innerHTML = '';
            });
            TagINGR = extractUniqueIngredients(filteredRecipes).filter(ingredient => !selectedINGRS.includes(ingredient));
            populateIngredientList(TagINGR, filteredRecipes);
        });
        list.appendChild(item);
    });


}


function selectIngredientUS(Ustensil, recipes) {
    if (!Array.from(selectedItems.children).some(item => item.textContent === Ustensil)) {
        const div = document.createElement('div');
        div.classList.add('selected-item-container');

        const close = document.createElement('span');
        close.innerHTML = '<i class="fa-solid fa-xmark"></i>';

        const selectedItem = document.createElement('li');
        selectedItem.classList.add('item-container');
        selectedItem.textContent = Ustensil;
        div.appendChild(selectedItem)
        div.appendChild(close)

        selectedItems.appendChild(div);

        close.addEventListener('click', () => {
            div.remove();
            const selectedText = selectedItem.textContent;
            selectedUstensils = selectedUstensils.filter(ustensil => ustensil !== selectedText);

            if (selectedINGRS.length > 0 || selectedAPPS.length > 0 || selectedUstensils.length > 0) {
                if (filteredRecipe.length === 0) {
                    filteredRecipes = applyFilters(plats); // Initialisation de filteredRecipes
                } else {
                    filteredRecipes = applyFilters(filteredRecipe);
                }

                document.querySelector('.plats-section').innerHTML = '';
                genererPlats(filteredRecipes);


                document.querySelector('.number').innerHTML = '';
                number(filteredRecipes);

                document.querySelectorAll('.liste2').forEach(element => {
                    element.innerHTML = '';
                });
                Tag = extractUniqueUstensils(filteredRecipes).filter(ustensil => !selectedUstensils.includes(ustensil));
                populateIngredientListUS(Tag, recipes);


                document.querySelectorAll('.liste1').forEach(element => {
                    element.innerHTML = '';
                });
                TagApp = extractUniqueAppliances(filteredRecipes).filter(appliance => !selectedAPPS.includes(appliance));
                populateIngredientListAPP(TagApp, filteredRecipes);



                document.querySelectorAll('.liste').forEach(element => {
                    element.innerHTML = '';
                });
                TagINGR = extractUniqueIngredients(filteredRecipes).filter(ingredient => !selectedINGRS.includes(ingredient));
                populateIngredientList(TagINGR, filteredRecipes);

            } else {
                if (filteredRecipe.length > 0) {

                    document.querySelector('.plats-section').innerHTML = '';
                    genererPlats(filteredRecipe);


                    document.querySelector('.number').innerHTML = '';
                    number(filteredRecipe);


                    document.querySelectorAll('.liste2').forEach(element => {
                        element.innerHTML = '';
                    });
                    Tag = extractUniqueUstensils(filteredRecipe).filter(ustensil => !selectedUstensils.includes(ustensil));
                    populateIngredientListUS(Tag, filteredRecipe);


                    document.querySelectorAll('.liste1').forEach(element => {
                        element.innerHTML = '';
                    });
                    TagApp = extractUniqueAppliances(filteredRecipe);
                    populateIngredientListAPP(TagApp, filteredRecipe);



                    document.querySelectorAll('.liste').forEach(element => {
                        element.innerHTML = '';
                    });
                    TagINGR = extractUniqueIngredients(filteredRecipe);
                    populateIngredientList(TagINGR, filteredRecipe);

                } else {

                    document.querySelector('.plats-section').innerHTML = '';
                    genererPlats(plats);


                    document.querySelector('.number').innerHTML = '';
                    number(plats);


                    document.querySelectorAll('.liste2').forEach(element => {
                        element.innerHTML = '';
                    });
                    Tag = extractUniqueUstensils(plats).filter(ustensil => !selectedUstensils.includes(ustensil));
                    populateIngredientListUS(Tag, plats);


                    document.querySelectorAll('.liste1').forEach(element => {
                        element.innerHTML = '';
                    });
                    TagApp = extractUniqueAppliances(plats);
                    populateIngredientListAPP(TagApp, plats);



                    document.querySelectorAll('.liste').forEach(element => {
                        element.innerHTML = '';
                    });
                    TagINGR = extractUniqueIngredients(plats);
                    populateIngredientList(TagINGR, plats);


                }
            }
        });


    }
    toggleDropdown(ingredientListUS, arrowUS)// Fermer la liste après sélection
}




function filterIngredients() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const items = ingredientList.querySelectorAll('.item');
    items.forEach(item => {
        if (item.textContent.toLowerCase().includes(searchTerm)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
}

function filterIngredientsAPP() {
    const searchTermAPP = document.getElementById('searchInputAPP').value.toLowerCase();
    const items = ingredientListAPP.querySelectorAll('.item');
    items.forEach(item => {
        if (item.textContent.toLowerCase().includes(searchTermAPP)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
}

function filterIngredientsUS() {
    const searchTermUS = document.getElementById('searchInputUS').value.toLowerCase();
    const items = ingredientListUS.querySelectorAll('.item');
    items.forEach(item => {
        if (item.textContent.toLowerCase().includes(searchTermUS)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
}