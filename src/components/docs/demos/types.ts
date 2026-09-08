export interface DemoExample {
  id: string;
  title: string;
  description?: string;
  client?: "none" | "visible" | "load" | "only";
}
