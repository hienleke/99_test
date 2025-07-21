import { Request, Response } from 'express';
import { Item } from '../models/item';
import { Op } from 'sequelize';

export async function createItem(req: Request, res: Response) {
  try {
    const { name, description } = req.body;
    const item = await Item.create({ name, description });
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create item', details: err });
  }
}

export async function listItems(req: Request, res: Response) {
  try {
    const { name, description, createdAt, createdFrom, createdTo } = req.query;
    const where: any = {};
    if (name) where.name = { [Op.iLike]: `%${name}%` };
    if (description) where.description = { [Op.iLike]: `%${description}%` };
    if (createdAt) where.createdAt = createdAt;
    if (createdFrom || createdTo) {
      where.createdAt = {};
      if (createdFrom) where.createdAt[Op.gte] = createdFrom;
      if (createdTo) where.createdAt[Op.lte] = createdTo;
    }
    const items = await Item.findAll({ where });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Failed to list items', details: err });
  }
}

export async function getItem(req: Request, res: Response) {
  try {
    const item = await Item.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get item', details: err });
  }
}

export async function updateItem(req: Request, res: Response) {
  try {
    const item = await Item.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    const { name, description } = req.body;
    item.name = name ?? item.name;
    item.description = description ?? item.description;
    await item.save();
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update item', details: err });
  }
}

export async function deleteItem(req: Request, res: Response) {
  try {
    const item = await Item.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    await item.destroy();
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete item', details: err });
  }
}
