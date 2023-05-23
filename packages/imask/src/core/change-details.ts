import IMask from "./holder";
import { type ClassOptions } from './utils';


type ChangeDetailsOptions = ClassOptions<ChangeDetails>;

/**
  Provides details of changing model value
  @param {Object} [details]
  @param {string} [details.inserted] - Inserted symbols
  @param {boolean} [details.skip] - Can skip chars
  @param {number} [details.removeCount] - Removed symbols count
  @param {number} [details.tailShift] - Additional offset if any changes occurred before tail
*/
export default
class ChangeDetails {
  /** Inserted symbols */
  declare inserted: string;
  /** Can skip chars */
  declare skip: boolean;
  /** Additional offset if any changes occurred before tail */
  declare tailShift: number;
  /** Raw inserted is used by dynamic mask */
  declare rawInserted: string;

  static normalize (prep: string | [string, ChangeDetails]): [string, ChangeDetails] {
    return Array.isArray(prep) ? prep : [
      prep,
      new ChangeDetails(),
    ];
  }

  constructor (details?: Partial<ChangeDetailsOptions>) {
    Object.assign(this, {
      inserted: '',
      rawInserted: '',
      skip: false,
      tailShift: 0,
    }, details);
  }

  /**
    Aggregate changes
    @returns {ChangeDetails} `this`
  */
  aggregate (details: ChangeDetails): this {
    this.rawInserted += details.rawInserted;
    this.skip = this.skip || details.skip;
    this.inserted += details.inserted;
    this.tailShift += details.tailShift;
    return this;
  }

  /** Total offset considering all changes */
  get offset (): number {
    return this.tailShift + this.inserted.length;
  }
}


IMask.ChangeDetails = ChangeDetails;
