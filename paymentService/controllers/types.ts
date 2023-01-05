import { IncomingMessage, ServerResponse } from 'node:http';

export type ControllersHub = {
  [key: string]: (req: IncomingMessage, res: ServerResponse) => void;
};
