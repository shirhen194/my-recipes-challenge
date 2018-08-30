var RecipeApp = function () {

    var recipes = [
        {
            id: 1,
            name: 'Best Chicken Soup!',
            image: 'https://static01.nyt.com/images/2016/11/29/dining/recipelab-chick-noodle-still/recipelab-chick-noodle-still-master675.jpg',
            ingredients: [
                { name: 'whole chicken', id: 1 },
                { name: 'medium carrots', id: 2 },
                { name: 'onions', id: 3 },
            ]
        }
    ];

    var $recipes = $('.recipes');

    //id's for recipes
    var recId = 2;

    //id's for ingredients
    var ingId = 4;

    var createRecipe = function (name, image) {
        var recipe = {
            name: name,
            image: image,
            ingredients: [],
            id: recId
        };

        //keeps recipe ids unique 
        recId++;

        recipes.push(recipe);
    };

    var createIngredients = function (recipeID, ingredient) {
        //add code
        let recipe = findRecipeById(recipeID);
        recipe.ingredients.push({ name: ingredient, id: ingId })
        ingId++;
        console.log(recipe)
    };

    var findRecipeById = function (id) {
        for (var i = 0; i < recipes.length; i += 1) {
            if (recipes[i].id === id) {
                return recipes[i];
            }
        }
    };

    var findIngredientIndexById = function (recipe, ingredientID) {
        for (var i = 0; i < recipe.ingredients.length; i += 1) {
            if (recipe.ingredients[i].id === ingredientID) {
                return i;
            }
        }
    };

    var removeIngredient = function (ingredientID, recipeID) {
        let recipe = findRecipeById(recipeID);
        let ingredientIndex=findIngredientIndexById(recipe, ingredientID);
        recipe.ingredients.splice(ingredientIndex, 1); 
    }

    var _getIngredientsHTML = function (recipe) {
        var recipesHTML = '';
        for (let i = 0; i < recipe.ingredients.length; i++) {
            recipesHTML += '<li class="ingredient" data-id="' + recipe.ingredients[i].id + '">' + recipe.ingredients[i].name + '     <button class="btn btn-danger btn-sm remove-ingredient">Remove Ingredient</button>' + '</li>'
        }
        return recipesHTML;
    };

    var renderRecipes = function () {
        //empty recipes div
        $recipes.empty();

        for (var i = 0; i < recipes.length; i++) {
            //current recipe in iteration
            var recipe = recipes[i];

            //return HTML for all ingredients
            var ingredients = _getIngredientsHTML(recipe); //add code

            $recipes.append(
                '<div class="recipe col-md-6  offset-md-3 img-fluid shadow" data-id="' + recipe.id + '">' +
                '<h4 class="text-capitalize font-italic text-center">' + recipe.name + '</h4>' +
                '<img class="recipe-img" src="' + recipe.image + '"/>' +
                '<hr>' +
                '<h5 class="font-italic font-bold text-center">ingredients</h5>' +
                '<div class="ingredients-container input-group mb-3">' +
                '<div class="input-group-prepend">' +
                '<span class="add-ingredients input-group-text" id="basic-addon3">Add Ingredients</span>' +
                '</div>' +
                '<input type="text" class="ingredient-name form-control" id="basic-url" aria-describedby="basic-addon3">' +

                '</div>' +
                '<ul class="ingredients">' + ingredients + '</ul>' +
                '</div>'
            );
        }
    };

    return {
        createRecipe: createRecipe,
        renderRecipes: renderRecipes,
        createIngredients: createIngredients,
        removeIngredient: removeIngredient,
        // createIngredients: createIngredients,
    }
};

var app = RecipeApp();

app.renderRecipes();
//--------EVENTS

//add a recipe
$('.add-recipe').on('click', function () {
    //collect input text
    var name = $('#recipe-name').val();
    var image = $('#recipe-image').val();

    //add recipe to array and render
    app.createRecipe(name, image);
    app.renderRecipes();
});


$('.recipes').on('click', '.add-ingredients', function () {
    var $clickedRecipe = $(this).closest('.recipe');
    let ingredient = $clickedRecipe.find('.ingredients-container').find(".ingredient-name").val();
    let recipeID = $clickedRecipe.data().id;
    app.createIngredients(recipeID, ingredient);
    app.renderRecipes();

});

$('.recipes').on('click', '.remove-ingredient', function () {
    // the comment element that we're wanting to remove
    var $clickedIngredient = $(this).closest('.ingredient');
    var ingredientID = $clickedIngredient.data().id;
    var $clickedRecipe = $(this).closest('.recipe');
    var recipeID = $clickedRecipe.data().id;

    app.removeIngredient(ingredientID, recipeID);
    app.renderRecipes();
}); 