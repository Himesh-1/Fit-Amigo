/*var query = 'italian wedding soup';
const url="https://api.api-ninjas.com/v1/recipe?query="+query;

const get=async()=>{
    console.log("getting data...");
    let response= await fetch(url);
    console.log(response);
}*/

var query = 'mexican';
const display=document.querySelector("#mexican");

const name = document.getElementById("name");
const serve = document.getElementById("serve");
const ing = document.getElementById("ing");
const inst = document.getElementById("inst");

$.ajax({
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/recipe?query=' + query,
    headers: { 'X-Api-Key': 'AofgH7d/JEk85h6PrFmTjg==dUzgM8ozBwGsBVXS'},
    contentType: 'application/json',
    success: function(data) {
        const result=data[0].title;
        console.log(result);
        data.forEach(element => {
            const div_card = document.createElement('div');
            div_card.setAttribute('class', 'card');
            
            const div_row = document.createElement('div');
            div_row.setAttribute('class', 'row');
            
            const div_column = document.createElement('div');
            div_column.setAttribute('class', 'column');
            
            const image = document.createElement('img');
            image.setAttribute('class', 'thumbnail');
            image.setAttribute('id', 'image');
            
            const title = document.createElement('h3');
            title.setAttribute('id', 'title');

            const center = document.createElement('center');
            
  

            title.innerHTML = `${element.title}`;

            center.appendChild(image);
            div_card.appendChild(title);
            div_column.appendChild(div_card);
            div_row.appendChild(div_column);
            div_card.appendChild(center);
  
        main.appendChild(div_row);
        
        })
    },
    error: function ajaxError(jqXHR) {
        console.error('Error: ', jqXHR.responseText);
    }
});
