import { Request, Response } from 'express';
import Articles from '../models/Articles';
import Repairs from '../models/Repairs';

const { Op, Sequelize } = require("sequelize");

export const getLackingArticles = async( req: Request , res: Response ) => {

    const articles = await Articles.findAll({
      where: {
        stock: {
          [Op.lte]: Sequelize.col('poo'),
        }
      },
    });

    res.json({ articles });
}

export const getRepairs = async( req: Request , res: Response ) => {

  const repairs = await Repairs.findAll({});

  res.json({ repairs });
}

export const getPendingPaids = async( req: Request , res: Response ) => {

  const pendingPaids = await Repairs.findAll({});

  res.json({ pendingPaids });
}