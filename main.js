document.getElementById('searchButton').addEventListener('click', () => {
    const foodQuery = document.getElementById('foodQueryInput').value;

    const appId = 'cf063b61'; 
    const appKey = '455cc219020ccf6d513f47aa7fc50a74'; 
    const apiUrl = `https://api.edamam.com/api/nutrition-data?app_id=${appId}&app_key=${appKey}&ingr=${encodeURIComponent(foodQuery)}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            displayResult(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});

function displayResult(data) {
    let resultContainer = document.getElementById('result');
    resultContainer.innerHTML = '';

    console.log(data);

    if (data && data.calories !== undefined && data.totalWeight !== undefined) {
        let resultText = `<ul>`;
        resultText += `<li><strong>Calories:</strong> ${data.calories.toFixed(2)} kcal</li>`;
        resultText += `<li><strong>Total Weight:</strong> ${data.totalWeight.toFixed(2)} g</li>`;

        if (data.totalNutrients) {
            resultText += nutrientListItem('Protein', data.totalNutrients.PROCNT);
            resultText += nutrientListItem('Carbohydrates (Net)', data.totalNutrients.CHOCDF.net);
            resultText += nutrientListItem('Carbohydrates (by Difference)', data.totalNutrients.CHOCDF);
            resultText += nutrientListItem('Fat', data.totalNutrients.FAT);
    
            resultText += nutrientListItem('Added Sugar', data.totalNutrients.SUGAR?.added);
            resultText += nutrientListItem('Calcium', data.totalNutrients.CA);
            resultText += nutrientListItem('Cholesterol', data.totalNutrients.CHOLE);
            resultText += nutrientListItem('Fiber', data.totalNutrients.FIBTG);
            resultText += nutrientListItem('Iron', data.totalNutrients.FE);
            resultText += nutrientListItem('Magnesium', data.totalNutrients.MG);
            resultText += nutrientListItem('Niacin', data.totalNutrients.NIA);
            resultText += nutrientListItem('Phosphorus', data.totalNutrients.P);
            resultText += nutrientListItem('Potassium', data.totalNutrients.K);
            resultText += nutrientListItem('Riboflavin', data.totalNutrients.RIBF);
            resultText += nutrientListItem('Sodium', data.totalNutrients.NA);
            resultText += nutrientListItem('Thiamin', data.totalNutrients.THIA);
            resultText += nutrientListItem('Vitamin B-12', data.totalNutrients.VITB12);
            resultText += nutrientListItem('Vitamin B-6', data.totalNutrients.VITB6A);
            resultText += nutrientListItem('Vitamin C', data.totalNutrients.VITC);
            resultText += nutrientListItem('Vitamin D', data.totalNutrients.VITD);
            resultText += nutrientListItem('Vitamin E', data.totalNutrients.TOCPHA);
            resultText += nutrientListItem('Vitamin K', data.totalNutrients.VITK1);
    
            // Adding missing nutrients
            resultText += nutrientListItem('Fatty acids, total monounsaturated', data.totalNutrients.FAMS);
            resultText += nutrientListItem('Fatty acids, total polyunsaturated', data.totalNutrients.FAPU);
            resultText += nutrientListItem('Fatty acids, total saturated', data.totalNutrients.FASAT);
            resultText += nutrientListItem('Fatty acids, total trans', data.totalNutrients.FATRN);
            resultText += nutrientListItem('Folate, DFE', data.totalNutrients.FOLDFE);
            resultText += nutrientListItem('Folate, food', data.totalNutrients.FOLFD);
            resultText += nutrientListItem('Folic acid', data.totalNutrients.FOLAC);
            resultText += nutrientListItem('Sugar alcohols', data.totalNutrients['Sugar.alcohol']);
            resultText += nutrientListItem('Sugars, total', data.totalNutrients.SUGAR);
            resultText += nutrientListItem('Vitamin A, RAE', data.totalNutrients.VITA_RAE);
            resultText += nutrientListItem('Water', data.totalNutrients.WATER);
            resultText += nutrientListItem('Zinc, Zn', data.totalNutrients.ZN);
        }

        if (data.cautions && data.cautions.length > 0) {
            resultText += `<li><strong>Cautions:</strong> ${data.cautions.join(', ')}</li>`;
        }

        if (data.healthLabels && data.healthLabels.length > 0) {
            resultText += `<li><strong>Health Labels:</strong>`;
            resultText += `<ul>`;
            data.healthLabels.forEach(label => {
                resultText += `<li>${label}</li>`;
            });
            resultText += `</ul></li>`;
        }

        resultText += `</ul>`;
        resultContainer.innerHTML = resultText;
    } else {
        resultContainer.textContent = 'No results found or invalid data.';
    }
}

function nutrientListItem(label, nutrient) {
    if (nutrient && nutrient.quantity !== undefined && nutrient.unit && nutrient.label) {
        return `<li style="margin-left: 20px;"><strong>${label}:</strong> ${nutrient.quantity.toFixed(2)} ${nutrient.unit} - ${nutrient.label}</li>`;
    } else {
        return '';
    }
}









