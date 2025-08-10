export {
  RouterProvider,
  useNavigate,
  usePath,
  useSearchParams,
} from "./router";
export { Route } from "./route";
export { Link } from "./link";

type GlobResult = Record<string, { default?: React.ComponentType } | undefined>;

declare global {
  interface ImportMeta {
    glob<T extends { eager?: boolean } = { eager?: boolean }>(
      pattern: string,
      options: T
    ): T extends { eager: true } ? GlobResult : Promise<GlobResult>;
  }
}
