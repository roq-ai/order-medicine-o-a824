import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface PrescriptionInterface {
  id?: string;
  user_id: string;
  doctor_name: string;
  medication: string;
  dosage: string;
  duration: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface PrescriptionGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  doctor_name?: string;
  medication?: string;
  dosage?: string;
  duration?: string;
}
