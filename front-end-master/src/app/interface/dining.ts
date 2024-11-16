export class Dining {
  constructor(
    public _id: string,
    public restaurant_name: string,
    public restaurant_detail: {
      location: string,
      guest: number,
      menu_detail: string,
      hours: string
    },
    public restaurant_menu: string[],
    public restaurant_signature: {
      images: string,
      describe: string,
      _id: string
    }[]
  ) {}
}