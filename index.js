const renderMeal = (meal = {}) => {
  const { strMeal, strMealThumb, strInstructions, strCategory, strArea } = meal;
  document.getElementById("app").innerHTML = `
    <div
        class="flex flex-col max-w-3xl bg-white border border-gray-200 rounded-lg shadow mb-4"
      >
        <a href="#">
          <img
            class="rounded-t-lg w-full"
            src="${strMealThumb}"
            alt="${strMeal}"
          />
        </a>
        <div class="my-4">
          <span class="text-blue-700 mx-2 my-2 px-2 py-1 bg-blue-300 border rounded-md">${strCategory}</span>
          <span class="text-blue-700 mx-2 my-2 px-2 py-1 bg-blue-300 border rounded-md">${strArea}</span>
        </div>
        <div class="p-5">
          <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">
              ${strMeal}
            </h5>
          </a>
          <p class="mb-3 font-normal text-gray-700">
            ${strInstructions}
          </p>
          <div>
             <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">ingredients</h5>
             <div>${renderIngredients(meal)}</div>
          </div>
        </div>
      </div>
    `;
};

function renderIngredients(meal = {}) {
  const mealKeys = Object.keys(meal);

  const ingredientKeys = mealKeys.filter((mealKey) => {
    return mealKey.includes("Ingredient") && meal[mealKey];
  });

  const ingredientValues = ingredientKeys.map((ingredientKey) => {
    const ingredientName = meal[ingredientKey];
    const ingredientMeasureKey = ingredientKey.replace("Ingredient", "Measure");
    const ingredientMeasure = meal[ingredientMeasureKey];
    return `${ingredientName} - ${ingredientMeasure}`;
  });

  return ingredientValues;
}

axios
  .get("https://themealdb.com/api/json/v1/1/random.php")
  .then((response) => renderMeal(response.data.meals[0]));
