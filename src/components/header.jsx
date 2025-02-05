/* eslint-disable react/prop-types */
export default function Header({title}) {
    return (
      <header className="header text-white pl-0 py-3 text-left">
        <h1 className="font-light text-3xl">{title}</h1>
      </header>
    );
  }