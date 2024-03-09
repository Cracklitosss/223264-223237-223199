import { Request, Response } from 'express';
import UserModel from '../models/UserModel';
import mongoose from 'mongoose';

const createUser = async (req: Request, res: Response) => {
  try {
    const { email, name, password } = req.body;
    const newUser = await UserModel.create({ email, name, password });
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const getUserWithSensorData = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const userWithSensorData = await UserModel.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(userId) }
      },
      {
        $lookup: {
          from: 'sensordatas',  // Nombre de la colección de SensorData
          localField: '_id',
          foreignField: 'userId',
          as: 'sensorData'
        }
      }
    ]);

    res.status(200).json(userWithSensorData);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const deletedUser = await UserModel.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json({ message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

export default { createUser, getUsers, getUserWithSensorData, deleteUser };
