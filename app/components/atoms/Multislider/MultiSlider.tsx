import React from "react";
import ReactSlider, { ReactSliderProps } from "react-slider";
import cn from "classnames";

const MultiSlider = <T extends number | readonly number[]>(
  _props: ReactSliderProps<T>
) => {
  const isVertical = _props.orientation === "vertical";
  return (
    <ReactSlider
      {..._props}
      className={cn(_props.className, "bg-PRIMARY rounded-md ")}
      renderThumb={(props, state) => (
        <div
          {...props}
          key={`thumb-${state.index}`} // Adding unique key prop
          className={cn({
            // "h-full": !isVertical,
            // "w-full": isVertical,
            "aspect-square h-4 w-6 rounded-md mt-1 bg-SECONDARY text-xs text-white flex items-center justify-center cursor-grab":
              true,
            
          })}
        >
          {state.valueNow}
        </div>
      )}
      renderTrack={(props, state) => {
        const points = Array.isArray(state.value) ? state.value.length : null;
        const isMulti = points && points > 0;
        const isLast = isMulti ? state.index === points : state.index != 0;
        const isFirst = state.index === 0;
        return (
          <div
            {...props}
            key={`track-${state.index}`} // Adding unique key prop
            className={cn({
              "h-1 top-1/2 -translate-y-1/2": !isVertical,
              "w-[95%] left-1/2 -translate-x-1/2": isVertical,
              "rounded-full": true,
              "bg-PRIMARY": isMulti ? isFirst || isLast : isLast,
              "bg-SECONDARY": isMulti ? !isFirst || !isLast : isFirst,
            })}
          ></div>
        );
      }}
      renderMark={(props) => (
        <div
          {...props}
          key={`mark-${props.key}`} // Using props.key if available
          className={cn({
            "top-1/2 -translate-y-1/2": !isVertical,
            "left-1/2 -translate-x-1/2": isVertical,
            "h-1 w-1": true,
            "rounded-full bg-indigo-500": true,
          })}
        ></div>
      )}
    />
  );
};
export default MultiSlider;