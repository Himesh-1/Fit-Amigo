$(document).ready(function() {
    $('#search-btn').click(function() {
        var query = $('#query').val();
        if (!query) {
            alert('Please enter a recipe query.');
            return;
        }
        searchRecipes(query);
    });

    function searchRecipes(query) {
        var apiKey = 'AofgH7d/JEk85h6PrFmTjg==dUzgM8ozBwGsBVXS';

        $.ajax({
            method: 'GET',
            url: 'https://api.api-ninjas.com/v1/recipe?query=' + query,
            headers: { 'X-Api-Key': apiKey },
            contentType: 'application/json',
            success: function(result) {
                displayRecipes(result);
            },
            error: function(jqXHR) {
                console.error('Error:', jqXHR.responseText);
            }
        });
    }

    function displayRecipes(recipes) {
        var container = $('#recipes-container');
        if (!container) {
            console.error('Recipes container not found.');
            return;
        }

        container.empty();

        recipes.forEach(function(recipe) {
            var ingredientsArray = recipe.ingredients.split('|');
            var instructionsArray = recipe.instructions.split('|');

            var ingredientsList = ingredientsArray.join('<br>');
            var instructionsList = instructionsArray.join('<br>');

            var recipeHtml = `
                <div class="col-md-4 mb-4">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${recipe.title}</h5>
                            <p class="card-text">Ingredients: ${ingredientsList}</p>
                            <p class="card-text">Servings: ${recipe.servings}</p>
                            <p class="card-text">Instructions: ${instructionsList}</p>
                        </div>
                    </div>
                </div>
            `;
            container.append(recipeHtml);
        });
    }
});
