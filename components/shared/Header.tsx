import Navbar from '@/components/shared/navigation/Navbar';

const Header = () => {
  return (
    <header className='sticky top-0 left-0 z-50 w-full backdrop-blur-md backdrop-saturate-50'>
      <div className='container'>
        <Navbar />
      </div>
    </header>
  );
};

export default Header;
