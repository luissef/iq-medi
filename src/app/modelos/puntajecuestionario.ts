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
   * @memberof Puntajecuestionario
   */
  constructor(
    public tipopregunta: string,
    public puntaje: number
  ) { }
}
