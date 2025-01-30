export interface Transaction {
    id: string;          // Unique identifier for the transaction
    amount: number;      // Amount of the transaction
    type: 'Income' | 'Expense'; // Type of transaction
    date: Date;          // Date of the transaction
    category: string;    // Category (e.g., Food, Rent, Utilities)
    description?: string; // Optional description or notes
}
