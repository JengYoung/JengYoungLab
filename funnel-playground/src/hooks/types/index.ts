export interface TRouterData {
  pathname: string;
  basePath: string;
  query: Record<string, unknown>;
}

export type TRouter = () => TRouterData;
