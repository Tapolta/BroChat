import { useEffect, useCallback } from 'react';

const listeners = new Set<() => void>();

export const triggerSidebarRefresh = () => {
  listeners.forEach((listener) => listener());
};

export const useSidebarRefreshListener = (onRefresh: () => void) => {
  const memoizedCallback = useCallback(onRefresh, [onRefresh]);

  useEffect(() => {
    listeners.add(memoizedCallback);

    return () => {
      listeners.delete(memoizedCallback);
    };
  }, [memoizedCallback]);
};