const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex justify-center">
      <div className="text-sm">{currentYear} Produced by Connect Housing</div>
    </div>
  );
};

export default Footer;
