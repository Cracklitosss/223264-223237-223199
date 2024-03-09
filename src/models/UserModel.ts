import mongoose, { Document } from 'mongoose';
import { Schema, Types } from 'mongoose';

interface IUser extends Document {
  email: string;
  name: string;
  password: string;
  sensorData: mongoose.Types.ObjectId[]; 
}

const userSchema = new mongoose.Schema<IUser>({
  email: { type: String, unique: true },
  name: String,
  password: String,
  sensorData: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SensorData' }]
});

const UserModel = mongoose.model<IUser>('User', userSchema);

export default UserModel;
