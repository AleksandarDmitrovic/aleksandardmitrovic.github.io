import { Link } from "react-router-dom";
import arrow from "../assets/icons/arrow.svg";

interface InfoBoxProps {
  text: string;
  link: string;
  btnText: string;
}

const InfoBox = ({ text, link, btnText }: InfoBoxProps) => (
  <div className="info-box">
    <p className="font-medium sm:text-xl text-center">{text}</p>
    <Link to={link} className="neo-brutalism-white neo-btn">
      {btnText}
      <img src={arrow} className="w-4 h-4 object-contain" />
    </Link>
  </div>
);

const renderContent: {
  [key: number]: JSX.Element;
} = {
  1: (
    <h1 className="sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5">
      Hello, I am <span className="font-semibold">Aleksandar</span> 👋 <br />A
      Web Developer from Canada
    </h1>
  ),
  2: (
    <InfoBox
      text="Worked with many clients and learned many skills along the way"
      link="/about"
      btnText="Learn More"
    />
  ),
  3: (
    <InfoBox
      text="Developed multiple portfolio over the years"
      link="/portfolio"
      btnText="Check out my portfolio"
    />
  ),
  4: (
    <InfoBox
      text="Need a project done or looking for a developer? Feel free to contact me"
      link="/contact"
      btnText="Let's Connect"
    />
  ),
};

interface Props {
  currentStage: number;
}

const HomeInfo = ({ currentStage }: Props) => {
  return renderContent[currentStage] || null;
};

export default HomeInfo;
