import * as moment from 'moment';

export interface ResaInterface {
  /**
   * Date de la réservation par l'utilisateur
   * @var moment.Moment
   */
  dateResa: moment.Moment;

  /**
   * Date et heure de la tournée pour laquelle la réservation
   *   a été effectuée
   * @var moment.Moment
   */
  tourDate: moment.Moment;

  /**
   * Nombre de places réservées
   * @var number
   */
  places: number;

  /**
   * Ajoute une réservation persistante
   */
  add();

  /**
   * Met à jour une réservation persistante
   */
  update();

  /**
   * Supprime une réservation
   */
  remove();
}
