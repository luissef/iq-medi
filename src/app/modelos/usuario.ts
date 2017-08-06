export class Usuario {

  constructor(
    public id: string,
    public usuario: string,
    public email: string,
    public isactive: boolean = false
  ) { }
}
