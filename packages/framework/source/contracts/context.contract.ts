import { RequestInterface, RequestMethod } from "./request.contract.js";

export interface ContextInterface {
  readonly credential?: [string, string] | string;

  readonly hash: string;

  readonly hostname: string;

  readonly href: string;

  readonly method: RequestMethod;

  readonly origin: string;

  readonly path: string;

  readonly port: number;

  readonly queries: Record<string, string>;

  readonly request: RequestInterface;

  readonly scheme: string;

  readonly url: URL;
}
