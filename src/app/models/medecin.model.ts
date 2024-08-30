import {Specialite} from "./specialite.model";
import {User} from "./user.model";

export interface Medecin {
  specialite: Specialite;
  id: number;
  name: string;
  email: string;
  password: string;
  tel: string;
  role: string;
  user_id: number;
  specialite_id: number;
  user:User

}
