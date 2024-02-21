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

    $('#search-btn2').click(function() {
        var query1 = $('#query1').val();
        if (!query1) {
            alert('Please enter a recipe query.');
            return;
        }
        workout(query1);
    });

    $('.btn-secondary').click(function() {
        var query1 = $(this).data('query');
        workout(query1);
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

    function workout(query1) {
        var apiKey = 'AofgH7d/JEk85h6PrFmTjg==dUzgM8ozBwGsBVXS';

        $.ajax({
            method: 'GET',
            url: 'https://api.api-ninjas.com/v1/exercises?muscle=' + query1,
            headers: { 'X-Api-Key': apiKey},
            contentType: 'application/json',
            success: function(result) {
                console.log(result)
                displayworkout(result);
            },
            error: function ajaxError(jqXHR) {
                console.error('Error: ', jqXHR.responseText);
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

    function displayworkout(exercises) {
        var container = $('#workouts');
        if (!container) {
            console.error('Recipes container not found.');
            return;
        }

        container.empty();

        exercises.forEach(function(exercise) {
            var recipeHtml = `
                <div class="grid grid-cols-1 grid-rows-[repeat(1,minmax(0,1fr))]  mb-4">
                    <div class="card bg-[#CDFADB] mx-5 px-4 pt-4 pb-10 my-3 rounded-3xl">
                        <div class="card-body">
                            <h5 class="card-title font-bold underline">${exercise.name}</h5>
                            </br>
                            <p class="card-text"><span class="font-bold underline">Ingredients:</span> ${exercise.type}</p>
                            </br>
                            <p class="card-text"><span class="font-bold underline">Servings:</span> ${exercise.muscle}</p>
                            </br>
                            <p class="card-text"><span class="font-bold underline">Instructions:</span> ${exercise.equipment}</p>
                            </br>
                            <p class="card-text"><span class="font-bold underline">Instructions:</span> ${exercise.difficulty}</p>
                            </br>
                            <p class="card-text"><span class="font-bold underline">Instructions:</span> ${exercise.instructions}</p>
                            
                        </div>
                    </div>
                </div>
            `;
            container.append(recipeHtml);
        });
    }
});
