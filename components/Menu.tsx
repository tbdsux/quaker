const Menu = () => {
  return (
    <nav className="py-4 w-11/12 mx-auto flex items-center justify-between">
      <div>
        <h1 className="text-3xl tracking-wide font-extrabold text-teal-600">
          QuaKer
        </h1>
      </div>
      <button className="py-2 px-6 text-teal-600 border-teal-600 border rounded-full flex items-center">
        <div className="h-7 w-7 mr-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <span className="hidden xs:block">Account</span>
      </button>
    </nav>
  )
}

export default Menu
