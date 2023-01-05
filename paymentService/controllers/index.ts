import { handleGetTest, notFoundRoute } from './controllers';
import { ControllersHub } from './types';

export const controllers: ControllersHub = {
  notFound: notFoundRoute,
  'GET/test': handleGetTest,
};
