import { useEffect } from "react";

export function useDocumentTitle(title?: string): void {
  const defaultTitle = "Auto Sale";

  useEffect(() => {
    document.title = title ? `${defaultTitle} - ${title}` : defaultTitle;

    return () => {
      document.title = defaultTitle;
    };
  }, [title]);
}
