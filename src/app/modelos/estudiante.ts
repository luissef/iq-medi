/**
 *
 * @export
 * @class Estudiante
 */
export class Estudiante {

  /**
   * Creates an instance of Estudiante.
   * @param {string} id
   * @param {string} usuario
   * @param {string} ci
   * @param {string} nombres
   * @param {string} apellidos
   * @param {string} fecha_nacimiento
   * @param {boolean} [isactive=false]
   * @memberof Estudiante
   */
  constructor(
    public id: string,
    public usuario: string,
    public ci: string,
    public nombres: string,
    public apellidos: string,
    public fecha_nacimiento: string,
    public isactive: boolean = false
  ) { }
}
