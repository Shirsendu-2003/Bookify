import React from "react";

class ErrorBoundary extends React.Component {

  constructor(props){

    super(props);

    this.state = {

      hasError:false,

      error:null,

    };

  }

  static getDerivedStateFromError(

    error

  ){

    return {

      hasError:true,

      error,

    };

  }

  componentDidCatch(

    error,

    errorInfo

  ){

    console.error(

      "Application Error:",

      error,

      errorInfo

    );

  }

  handleReload = ()=>{

    window.location.reload();

  };

  render(){

    if(

      this.state.hasError

    ){

      return(

        <div
          className="

min-h-screen

flex
items-center
justify-center

bg-slate-50
px-6

"

        >

          <div
            className="

max-w-xl
w-full

bg-white

rounded-3xl
shadow-xl

p-10

text-center

"

          >

            <h1
              className="

text-4xl
font-bold

text-red-600

mb-6

"

            >

              Something went wrong

            </h1>

            <p
              className="

text-slate-600

mb-8

"

            >

              An unexpected
              application error
              occurred.

            </p>

            <button

              onClick={
                this.handleReload
              }

              className="

px-6
py-3

bg-blue-600
hover:bg-blue-700

text-white

rounded-xl

font-semibold

transition

"

            >

              Reload Application

            </button>

          </div>

        </div>

      );

    }

    return this.props.children;

  }

}

export default ErrorBoundary;