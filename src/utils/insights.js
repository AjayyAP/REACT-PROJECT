export const calculateInsights = (expenses) => {
    const insights = [];

    if (!expenses || expenses.length === 0) {
        return ['No data available to generate insights. Add some expenses!'];
    }

    const expenseItems = expenses.filter(item => item.type === 'expense');
    const incomeItems = expenses.filter(item => item.type === 'income');

    const totalExpenses = expenseItems.reduce((acc, curr) => acc + curr.amount, 0);
    const totalIncome = incomeItems.reduce((acc, curr) => acc + curr.amount, 0);

    // 1. Spending vs Income
    if (totalExpenses > totalIncome) {
        insights.push(`⚠️ **Alert**: You are spending more than you earn! Your expenses (₹${totalExpenses.toFixed(2)}) exceed your income (₹${totalIncome.toFixed(2)}).`);
    } else if (totalExpenses > (totalIncome * 0.8) && totalIncome > 0) {
        insights.push(`⚠️ **Warning**: You have spent over 80% of your income. Consider saving more.`);
    } else if (totalIncome > 0) {
        insights.push(`✅ **Good Job**: You are living within your means. You have saved ₹${(totalIncome - totalExpenses).toFixed(2)}.`);
    }

    // 2. Category Analysis
    const categoryTotals = expenseItems.reduce((acc, curr) => {
        acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
        return acc;
    }, {});

    if (Object.keys(categoryTotals).length > 0) {
        const sortedCategories = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1]);
        const topCategory = sortedCategories[0];
        const topCategoryName = topCategory[0];
        const topCategoryAmount = topCategory[1];

        insights.push(`📊 **Top Spending Category**: You spent the most on **${topCategoryName}** (₹${topCategoryAmount.toFixed(2)}).`);

        if (topCategoryName === 'Food' && topCategoryAmount > 500) {
            insights.push(`💡 **Tip**: Your food expenses are quite high. Cooking at home more often could save you money.`);
        }
        if (topCategoryName === 'Shopping' && topCategoryAmount > 300) {
            insights.push(`💡 **Tip**: Consider setting a budget for shopping to avoid impulse buys.`);
        }
    }

    // 3. Subscription/Recurring checks (Simple logic: Same amount same category multiple times)
    // This is a bit complex for simple logic without more data, skipping for now to keep it simple and robust.

    return insights;
};
