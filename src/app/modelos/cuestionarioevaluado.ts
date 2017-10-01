/**
 *
 * @export
 * @class Cuestionarioevaluado
 */
export class Cuestionarioevaluado {

  /**
   * Creates an instance of Cuestionarioevaluado.
   * @param {number} numeropregunta
   * @param {string} tipopregunta
   * @param {number} tiempo
   * @param {number} puntaje
   * @memberof Cuestionarioevaluado
   */
  constructor(
    public numeropregunta: number,
    public tipopregunta: string,
    public tiempo: number,
    public puntaje: number
  ) { }
}
