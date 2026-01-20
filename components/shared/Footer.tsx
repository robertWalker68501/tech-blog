const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className='container py-4'>
        <p className='text-center text-lg'>
          &copy; {currentYear} Tech<span className='text-primary'>Blog</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
