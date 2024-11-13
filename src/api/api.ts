import { CONTACTS } from "@/mock/mock";
import {Contact} from "@/types/types";


export class Api {
  public static async getContacts(): Promise<Contact[]> {
    return await new Promise(resolve => {
      setTimeout(() => resolve( CONTACTS ), 1000);
    })
  }
}
