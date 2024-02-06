$(document).ready(function() {
    $('#search-btn').click(function() {
        var query = $('#query').val();
        if (!query) {
            alert('Please enter a recipe query.');
            return;
        }
        searchRecipes(query);
    });

    $('.btn-secondary').click(function() {
        var query = $(this).data('query');
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
            var recipeHtml = `
                <div class="grid grid-cols-1 grid-rows-[repeat(1,minmax(0,1fr))]  mb-4">
                    <div class="card mx-5 px-4 pt-4 pb-10 my-3 rounded-3xl">
                        <div class="card-body">
                            <h5 class="card-title font-bold underline">${recipe.title}</h5>
                            </br>
                            <p class="card-text"><span class="font-bold underline">Ingredients:</span> ${recipe.ingredients}</p>
                            </br>
                            <p class="card-text"><span class="font-bold underline">Servings:</span> ${recipe.servings}</p>
                            </br>
                            <p class="card-text"><span class="font-bold underline">Instructions:</span> ${recipe.instructions}</p>
                        </div>
                    </div>
                </div>
            `;
            container.append(recipeHtml);
        });
    }
});
