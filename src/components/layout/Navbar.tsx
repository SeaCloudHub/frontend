type NavbarProps = {
  isShrink: boolean;
  phoneMode: boolean;
};
const Navbar = ({ isShrink, phoneMode }: NavbarProps) => {
  return <div className={`${phoneMode ? 'ml-0 !important' : ''} nav-bar ${isShrink ? 'nav-bar-shrink' : ''}`}>
    
  </div>;
};

export default Navbar;
