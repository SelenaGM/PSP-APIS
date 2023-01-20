export interface Game {
  id?:number; //el ? no es obligatorio
  title:string;
  subtitle:string;
  description: string;
  image:string;
  favorite: boolean;
  created_at?: string;

}
