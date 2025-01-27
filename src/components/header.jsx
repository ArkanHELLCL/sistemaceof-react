/* eslint-disable react/prop-types */
export default function Header({title}) {
    return (
      <header className="header text-white pl-4 py-2">
        <h1 className="font-bold text-4xl">{title}</h1>
      </header>
    );
  }