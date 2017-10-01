/**
 *
 * @export
 * @class Usuario
 */
export class Usuario {

  /**
   * Creates an instance of Usuario.
   * @param {string} id
   * @param {string} usuario
   * @param {string} email
   * @param {boolean} [isactive=false]
   * @memberof Usuario
   */
  constructor(
    public id: string,
    public usuario: string,
    public email: string,
    public isactive: boolean = false
  ) { }
}
