function HeaderLogo() {
  return (
    <div className="flex items-center h-16 mx-4 group select-none">
      <h1 className="text-[21px] tracking-tighter">
        <span className="font-extrabold text-gray-900">
          Bro
        </span>
        
        <span className="font-normal text-gray-400 group-hover:text-gray-700 transition-colors duration-300">
          Chat
        </span>

        <span className="font-bold text-gray-900 ml-[1px]">
          .
        </span>
      </h1>
    </div>
  );
}

export default HeaderLogo;