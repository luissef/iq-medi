export class Estudiante {

  constructor(
    public id: string,
    public usuario: string,
    public nombres: string,
    public apellidos: string,
    public fecha_nacimiento: string,
    public isactive: boolean = false
  ) { }
}
