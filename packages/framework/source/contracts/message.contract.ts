import { Readable } from "node:stream";

export interface MessageInterface {
  readonly body: Readable;

  readonly headers: Record<string, string>;

  readonly protocol: MessageProtocol;

  clearBody(): this;

  clearHeader(key: string): this;

  clearHeaders(): this;

  setBody(stream: Readable): this;

  setHeader(key: string, value: string): this;

  setHeaders(headers: Record<string, string>): this;
  setHeaders(entries: [string, string][]): this;

  setProtocol(protocol: MessageProtocol): this;
}

export type MessageProtocol =
  | "HTTP/0.9"
  | "HTTP/1.0"
  | "HTTP/1.1"
  | "HTTP/2"
  | "HTTP/3";
