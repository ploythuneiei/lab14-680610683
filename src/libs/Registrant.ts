import type { Item } from "../components/ModalRegister"

interface Registrant {
  id: number;
  fullName: string;
  gender: string;
  plan: string;
  total: number;
  items: Item[];
}
export type { Registrant };