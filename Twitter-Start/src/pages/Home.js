import React from "react";
import "./Home.css";
import { defaultImgs } from "../defaultimgs";
import { Icon, Input } from "web3uikit";
import { useState, useRef } from "react";
import TweetInFeed from "../components/TweetInFeed";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";

const Home = () => {

  const { Moralis } = useMoralis();
  const user = Moralis.User.current();
  const contractProcessor = useWeb3ExecuteFunction();

  const inputFile = useRef(null);
  const [selectedFile, setSelectedFile] = useState();
  const [theFile, setTheFile] = useState();
  const [tweet, setTweet] = useState();

  async function maticTweet() {

    if (!tweet) return;

    let img;
    if (theFile) {
      const data = theFile;
      const file = new Moralis.File(data.name, data);
      await file.saveIPFS();
      img = file.ipfs();
    }else{
      img = "No Img"
    }

    let options = {
      contractAddress: "0x28D289FB34A749f4C51c10471c927Dd270E4b1ad",
      functionName: "addTweet",
      abi: [{
        "inputs": [
          {
            "internalType": "string",
            "name": "tweetTxt",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "tweetImg",
            "type": "string"
          }
        ],
        "name": "addTweet",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      }],
      params: {
        tweetTxt: tweet,
        tweetImg: img,
      },
      msgValue: Moralis.Units.ETH(1),
    }

    await contractProcessor.fetch({
      params: options,
      onSuccess: () => {
        saveTweet();
      },
      onError: (error) => {
        console.log(error.data.message)
      }
    });

  }


  async function saveTweet() {

    if(!tweet) return;

    const Tweets = Moralis.Object.extend("Tweets");

    const newTweet = new Tweets();

    newTweet.set("tweetTxt", tweet);
    newTweet.set("tweeterPfp", user.attributes.pfp);
    newTweet.set("tweeterAcc", user.attributes.ethAddress);
    newTweet.set("tweeterUserName", user.attributes.username);

    if (theFile) {
      const data = theFile;
      const file = new Moralis.File(data.name, data);
      await file.saveIPFS();
      newTweet.set("tweetImg", file.ipfs());
    }

    await newTweet.save();
    window.location.reload();

  }

  const onImageClick = () => {
    inputFile.current.click();
  };

  const changeHandler = (event) => {
    const img = event.target.files[0];
    setTheFile(img);
    setSelectedFile(URL.createObjectURL(img));
  };

  return (
    <>
    <div className="pageIdentify">Home</div>
      <div className="mainContent">
        <div className="profileTweet">
          <img src={user.attributes.pfp ? user.attributes.pfp : defaultImgs[0]} alt=""className="profilePic"></img>
          <div className="tweetBox">
            <Input
              label="Post your thoughts here.."
              name="tweetTxtArea"
              labelBgColor="#141d26"
              type="text"
              onChange={(e) => setTweet(e.target.value)}
              width="100%"
            ></Input>
            {selectedFile && (
              <img src={selectedFile} alt=""className="tweetImg"></img>
            )}
            <div className="imgOrTweet">
              <div className="imgDiv" onClick={onImageClick}>
              <input
                  type="file"
                  name="file"
                  ref={inputFile}
                  onChange={changeHandler}
                  style={{ display: "none"}}
                />
                <Icon fill="#1DA1F2" size={20} svg="image"></Icon>
              </div>
              <div className="tweetOptions">
                <div className="tweet" onClick={saveTweet}>Post</div>
                <div className="tweet" onClick={maticTweet} style={{ backgroundColor: "#f0b90b" }}>
                  <Icon fill="#ffffff" size={20} svg="bnb" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <TweetInFeed profile={false}/>
      </div>
    </>
  );
};

export default Home;
