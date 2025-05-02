import { useCallback, useEffect, useState } from "react";

import { WidthContext } from ".";

export function WidthProvider({ children }) {
  const [squareRef, { width = 0 }] = useElementSize();

  return (
    <div ref={squareRef}>
      <WidthContext.Provider value={width}>{children}</WidthContext.Provider>
    </div>
  );
}

/**
 * @deprecated - Use `useResizeObserver` instead.
 * A hook for tracking the size of a DOM element.
 * @template T - The type of the DOM element. Defaults to `HTMLDivElement`.
 * @param {?UseElementSizeOptions} [options] - The options for customizing the behavior of the hook (optional).
 * @param {?boolean} [options.initializeWithValue] - If `true` (default), the hook will initialize reading the element's size. In SSR, you should set it to `false`.
 * @returns The ref-setting function and the size of the element. Either as an tuple [ref, size] or as an object { ref, width, height }.
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-element-size)
 * @example
 * const [ref, { width = 0, height = 0 }] = useElementSize();
 * // or
 * const { ref, width = 0, height = 0 } = useElementSize();
 *
 * return (
 *   <div ref={ref}>
 *     My size is {size.width}x{size.height}
 *   </div>
 * );
 */
function useElementSize(options = {}) {
  const { initializeWithValue = true } = options;

  // Mutable values like 'ref.current' aren't valid dependencies
  // because mutating them doesn't re-render the component.
  // Instead, we use a state as a ref to be reactive.
  const [ref, setRef] = useState(null);

  const readValue = useCallback(() => {
    return {
      height: ref?.offsetHeight ?? undefined,
      width: ref?.offsetWidth ?? undefined,
    };
  }, [ref?.offsetHeight, ref?.offsetWidth]);

  const [size, setSize] = useState(() => {
    if (initializeWithValue) {
      return readValue();
    }
    return { height: undefined, width: undefined };
  });

  // Prevent too many rendering using useCallback
  const handleSize = useCallback(() => {
    setSize(readValue());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref?.offsetHeight, ref?.offsetWidth]);

  // TODO: Prefer incoming useResizeObserver hook
  useWindowListener("resize", handleSize);

  useEffect(() => {
    handleSize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref?.offsetHeight, ref?.offsetWidth]);

  const result = [setRef, size];

  // Support object destructuring
  result.ref = result[0];
  result.width = size.width;
  result.height = size.height;

  return result;
}

function useWindowListener(eventType, listener) {
  useEffect(() => {
    window.addEventListener(eventType, listener);
    return () => {
      window.removeEventListener(eventType, listener);
    };
  }, [eventType, listener]);
}
