const { z } = require('zod');
const createIncomeSchema = z.object({
  categoryId: z.number().int().positive(),
  amount: z.number().positive('Amount must be positive'),
  incomeDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  description: z.string().min(3).max(500),
  payerName: z.string().min(1).max(200).optional(),
  payerType: z.enum(['student', 'corporate', 'individual', 'other']).optional(),
  paymentMethod: z.enum(['cash', 'bank_transfer', 'credit_card', 'online', 'check']).optional(),
  referenceNumber: z.string().optional(),
  isRecurring: z.boolean().optional(),
  recurrencePattern: z.enum(['monthly', 'quarterly', 'yearly']).optional(),
  notes: z.string().optional(),
});
module.exports = { createIncomeSchema };
