import { forwardRef } from "react";

const className = "rounded-md p-2 text-white outline-green-500 bg-slate-700";

const Input = forwardRef((props, ref) => {
  if (props.label) {
    return <div className="flex flex-col gap-2">
      <label>{props.label}</label>
      <input ref={ref} {...props} className={props.className + " " + className}/>
    </div>
  } else return <input {...props} className={props.className + " " + className}/>
});

export default Input;