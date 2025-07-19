const express = require('express');
const prisma = require('../config/database');

const router = express.Router();

// GET /api/credit-cards - Get all credit cards
router.get('/', async (req, res) => {
  try {
    const creditCards = await prisma.creditCard.findMany({
      include: {
        bank: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    res.json(creditCards);
  } catch (error) {
    console.error('Error fetching credit cards:', error);
    res.status(500).json({ error: 'Failed to fetch credit cards' });
  }
});

// GET /api/credit-cards/:id - Get credit card by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const creditCard = await prisma.creditCard.findUnique({
      where: { id: parseInt(id) },
      include: {
        bank: true,
      },
    });

    if (!creditCard) {
      return res.status(404).json({ error: 'Credit card not found' });
    }

    res.json(creditCard);
  } catch (error) {
    console.error('Error fetching credit card:', error);
    res.status(500).json({ error: 'Failed to fetch credit card' });
  }
});

// POST /api/credit-cards - Create new credit card
router.post('/', async (req, res) => {
  try {
    const { name, bankId } = req.body;

    if (!name || !bankId) {
      return res.status(400).json({ error: 'Credit card name and bank ID are required' });
    }

    // Verify bank exists
    const bank = await prisma.bank.findUnique({
      where: { id: parseInt(bankId) },
    });

    if (!bank) {
      return res.status(400).json({ error: 'Bank not found' });
    }

    const creditCard = await prisma.creditCard.create({
      data: {
        name,
        bankId: parseInt(bankId),
      },
      include: {
        bank: true,
      },
    });

    res.status(201).json(creditCard);
  } catch (error) {
    console.error('Error creating credit card:', error);
    res.status(500).json({ error: 'Failed to create credit card' });
  }
});

// PUT /api/credit-cards/:id - Update credit card
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, bankId } = req.body;

    const existingCreditCard = await prisma.creditCard.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingCreditCard) {
      return res.status(404).json({ error: 'Credit card not found' });
    }

    // If bankId is provided, verify bank exists
    if (bankId) {
      const bank = await prisma.bank.findUnique({
        where: { id: parseInt(bankId) },
      });

      if (!bank) {
        return res.status(400).json({ error: 'Bank not found' });
      }
    }

    const creditCard = await prisma.creditCard.update({
      where: { id: parseInt(id) },
      data: {
        ...(name && { name }),
        ...(bankId && { bankId: parseInt(bankId) }),
      },
      include: {
        bank: true,
      },
    });

    res.json(creditCard);
  } catch (error) {
    console.error('Error updating credit card:', error);
    res.status(500).json({ error: 'Failed to update credit card' });
  }
});

// DELETE /api/credit-cards/:id - Delete credit card
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const existingCreditCard = await prisma.creditCard.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingCreditCard) {
      return res.status(404).json({ error: 'Credit card not found' });
    }

    await prisma.creditCard.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: 'Credit card deleted successfully' });
  } catch (error) {
    console.error('Error deleting credit card:', error);
    res.status(500).json({ error: 'Failed to delete credit card' });
  }
});

module.exports = router;