const className = "bg-slate-700 p-2 rounded-md border-2 border-slate-700 hover:bg-transparent";

const Button = (props) => {
  return <button {...props} className={props.className + " " + className}></button>
}

export default Button;