type Container = Record<string, unknown> | undefined;

export type ContainerInputType =
  | Container
  | string
  | unknown[]
  | null
  | undefined;

export function parseContainer(container: ContainerInputType): Container {
  if (container && typeof container === "string") {
    container = JSON.parse(container);
  }

  if (!container || Array.isArray(container) || typeof container !== "object") {
    return;
  }

  return container as Container;
}

export function getTag(container: Container, key: string): string | undefined {
  return (container?.[key] as { content?: string })?.content;
}
