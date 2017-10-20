/**
 *
 * @export
 * @class Puntajecuestionario
 */
export class Puntajecuestionario {

  /**
   * Creates an instance of Puntajecuestionario.
   * @param {string} tipopregunta
   * @param {number} puntaje
   * @param {number} categoria
   * @param {boolean} opcional
   * @memberof Puntajecuestionario
   */
  constructor(
    public tipopregunta: string,
    public puntaje: number,
    public categoria: number,
    public opcional: boolean
  ) { }
}
