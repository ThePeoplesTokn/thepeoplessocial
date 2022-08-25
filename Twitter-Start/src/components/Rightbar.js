import React from "react";
import './Rightbar.css';
import thepeoplesswap from "../images/thepeoplesswap.png";
import thepeoplesbank from "../images/thepeoplesbank.png";
import thepeoplesdonate from "../images/thepeoplesdonate.png";
import thepeoplesstake from "../images/thepeoplesstake.png";
import thepeopleslotto from "../images/thepeopleslotto.png";
import { Input } from "web3uikit";


const Rightbar = () => {
  const trends = [
    {
      img: thepeoplesswap,
      text: "Swap your BSC Tokens in an instant and help a good cause...",
      link: "https://thepeoplesswap.netlify.app",
    },
    {
      img: thepeoplesbank,
      text: "Deposit your BNB and earn up to 15% ThePeoplesToken(TPT) in rewards...",
      link: "https://thepeoplesbank.netlify.app",
    },
    {
      img: thepeoplesdonate,
      text: "Donate BNB and help the homeless...",
      link: "https://thepeoplesdonate.netlify.app",
    },
    {
      img: thepeopleslotto,
      text: "Raffles, Slots, Poker and more!! Try your luck at ThePeoplesLotto...",
      link: "https://thepeopleslotto.com",
    },
    {
      img: thepeoplesstake,
      text: "Stake your BNB and earn up to 15% back...",
      link: "https://thepeoplesstake.netlify.app",
    },
  ];

  return (
    <>
    <div className="rightbarContent">
      <Input
        label="Search ThePeoplesPlace"
        name ="Search ThePeoplesPlace"
        prefixIcon="search"
        labelBgColor="#141d26" 
        >
      </Input>

    <div className="trends">
      News For You
      {trends.map((e) => {
          return(
            <>
            <div className="trend" onClick={() => window.open(e.link)}>
              <img src={e.img} alt=""className="trendImg"></img>
              <div className="trendText">{e.text}</div>
            </div>
            </>
          )
      })}
    </div>

    </div>
    </>
  );
};

export default Rightbar;

