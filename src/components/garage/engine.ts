import environment from '../../environment/environment';
import { EngineStatus, Path } from '../../types/enums';
import { IEngine } from '../../types/interfaces';
import Loader from '../loader/loader';

class Engine extends Loader implements IEngine {
  constructor() {
    super(environment.baseUrl, Path.ENGINE);
  }

  async controlCarEngine(id: number, status: EngineStatus) {
    const requestOptions = {
      method: 'PATCH',
    };
    const response = await super.getResponse(undefined, { id, status }, requestOptions);
    return response;
  }
}

export default Engine;
