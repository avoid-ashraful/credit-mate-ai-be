const express = require('express');
const prisma = require('../config/database');

const router = express.Router();

// GET /api/banks - Get all banks
router.get('/', async (req, res) => {
  try {
    const banks = await prisma.bank.findMany({
      include: {
        creditCards: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    res.json(banks);
  } catch (error) {
    console.error('Error fetching banks:', error);
    res.status(500).json({ error: 'Failed to fetch banks' });
  }
});

// GET /api/banks/:id - Get bank by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const bank = await prisma.bank.findUnique({
      where: { id: parseInt(id) },
      include: {
        creditCards: true,
      },
    });

    if (!bank) {
      return res.status(404).json({ error: 'Bank not found' });
    }

    res.json(bank);
  } catch (error) {
    console.error('Error fetching bank:', error);
    res.status(500).json({ error: 'Failed to fetch bank' });
  }
});

// POST /api/banks - Create new bank
router.post('/', async (req, res) => {
  try {
    const { name, website } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Bank name is required' });
    }

    const bank = await prisma.bank.create({
      data: {
        name,
        website,
      },
    });

    res.status(201).json(bank);
  } catch (error) {
    console.error('Error creating bank:', error);
    res.status(500).json({ error: 'Failed to create bank' });
  }
});

// PUT /api/banks/:id - Update bank
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, website } = req.body;

    const existingBank = await prisma.bank.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingBank) {
      return res.status(404).json({ error: 'Bank not found' });
    }

    const bank = await prisma.bank.update({
      where: { id: parseInt(id) },
      data: {
        ...(name && { name }),
        ...(website !== undefined && { website }),
      },
    });

    res.json(bank);
  } catch (error) {
    console.error('Error updating bank:', error);
    res.status(500).json({ error: 'Failed to update bank' });
  }
});

// DELETE /api/banks/:id - Delete bank
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const existingBank = await prisma.bank.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingBank) {
      return res.status(404).json({ error: 'Bank not found' });
    }

    await prisma.bank.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: 'Bank deleted successfully' });
  } catch (error) {
    console.error('Error deleting bank:', error);
    res.status(500).json({ error: 'Failed to delete bank' });
  }
});

module.exports = router;