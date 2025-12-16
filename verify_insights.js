
import { calculateInsights } from './src/utils/insights.js';

const testCases = [
    {
        name: 'Income 0, Expenses 100',
        expenses: [{ type: 'expense', amount: 100, category: 'Food' }],
        expected: 'Should alert about spending > income'
    },
    {
        name: 'Income 100, Expenses 50',
        expenses: [
            { type: 'income', amount: 100 },
            { type: 'expense', amount: 50, category: 'Food' }
        ],
        expected: 'Good Job'
    }
];

testCases.forEach(test => {
    console.log(`\n--- Test: ${test.name} ---`);
    const insights = calculateInsights(test.expenses);
    console.log('Insights:', insights);
});
