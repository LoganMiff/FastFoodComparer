# FastFoodComparer

**FastFoodComparer** is a web application that allows users to select fast-food restaurants and rank their food items based on a ratio between two chosen macronutrient (or calories). The ranking algorithm prioritizes maximizing the **left** macronutrient and minimizing the **right**.

---

## Features
- Covers menu items from **154** fast-food chains.
- Lets users select any two metrics (e.g., protein vs. fat, carbs vs. calories).
- Ranks items by maximizing the left metric and minimizing the right for a balanced comparison.
- Simple, intuitive interface designed for quick insights on fast-food nutritional values.

---

## Installation & Setup

1. **Clone the repository**  
   ```bash
   git clone https://github.com/LoganMiff/FastFoodComparer.git
   ```

2. **Change the working directory**  
   ```bash
   cd FastFoodComparer
   ```

3. **Install all packages**  
   ```bash
   npm install
   ```

4. **Run the server**  
   ```bash
   node ./server/server.js
   ```

5. **Run the website**  
   ```bash
   npm start
   ```

---

## Usage
1. Navigate to the main interface in your browser.
2. Select from the list of available **macronutrients or calories** (e.g., `Protein / Fat`, `Carbs / Calories`).
3. Choose one or more fast-food chains to compare.
4. View the sorted ranking of individual items where:
   - The **left** metric is **maximized**.
   - The **right** metric is **minimized**.
5. Use rankings for quick insights, such as:
   - *Most protein-efficient options*
   - *Lowest-carb-by-calorie meals*
   - *Best calorie-to-protein ratios*

---

## License
Licensed under the **GPL-2.0 License**.
