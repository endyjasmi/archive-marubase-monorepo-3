import { ContextInterface } from "./context.contract.js";
import { RequestInterface } from "./request.contract.js";
import { ResponseInterface } from "./response.contract.js";

export interface DispatcherInterface {
  dispatch(request: RequestInterface): Promise<ResponseInterface>;
  dispatch(context: ContextInterface, next: NextFn): Promise<ResponseInterface>;

  use(middleware: Middleware): this;
  use(dispatcher: DispatcherInterface): this;
}

export type Middleware = (
  context: ContextInterface,
  next: NextFn,
) => Promise<ResponseInterface>;

export type NextFn = () => Promise<ResponseInterface>;
