/* eslint-disable react/prop-types */
export default function Header({title}) {
    return (
      <header className="header text-white pl-4 py-1 text-center">
        <h1 className="font-light text-5xl">{title}</h1>
      </header>
    );
  }