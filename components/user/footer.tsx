import {
  RiFacebookBoxFill,
  RiInstagramFill,
  RiTwitterFill,
} from "react-icons/ri";
const Footer = () => {
  return (
    <footer className="flex justify-between items-center mt-8 bg-secondary-blue text-primary-text py-5 px-4 font-bold">
      <div className="md:flex pr-5 md:pr-0  gap-4">
        <a href="#">
          <RiFacebookBoxFill size={22} />
        </a>
        <a href="#">
          <RiInstagramFill size={22} />
        </a>
        <a href="#">
          <RiTwitterFill size={22} />
        </a>
      </div>
      <div>
        <p className="text-sm">&copy; 2024 Crypto Store All rights reserved.</p>
      </div>
      <div>
        <p className="text-sm">Call us: 123-456-7890</p>
      </div>
    </footer>
  );
};

export default Footer;
