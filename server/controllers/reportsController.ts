import { Request, Response } from 'express';

import Repairs from '../models/Repairs';
import Clients from '../models/Clients';
import Users from '../models/Users';
import Articles from '../models/Articles';
import Observations from '../models/Observations';

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

  const pendingPaids = await Repairs.findAll({
    where: {       
      [Op.and]: [
        {
          paidNumber: {
            [Op.eq]: ""
          }
        },
        { paidState: false }
      ]    
    },
    include: [
      Clients,
      Observations,
      Articles,
      {
          model: Users,
          as: 'taken',
          attributes: ["name"],
      },
      {
          model: Users,
          as: 'assigned',
          attributes: ["name"],
      },
  ]
  });

  res.json({ pendingPaids });
}