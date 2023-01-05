import { ControllersHub } from '../controllers/types';

export class GlobalRouter {
  constructor(private controllers: ControllersHub) {}

  public getController(controller: string) {
    return this.controllers[controller] || this.controllers['notFound'];
  }
}
