import { useState } from "react";
import { motion } from "motion/react";
import { BiAnalyse } from "react-icons/bi";
import { MdEmojiObjects } from "react-icons/md";
import { MdOutlineClearAll } from "react-icons/md";
import { TypewriterEffect } from "./ui/typewriter-effect";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";

function MainSection() {
    const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
    const [input, setInput] = useState<string>("");
    const [spamEmail, setSpamEmail] = useState<number>(0);

    console.log(input);

    const demoClickHandler = () => {
        if (!isAnalyzing) {
            setInput(
                "Congratulations! You have won a $1000 Walmart gift card. Click here to claim now!"
            );
        }
    };

    const AnalyseClickHandler = () => {
        if (input) {
            setIsAnalyzing(true);
            axios
                .post("https://dsbda-mini-project-1s6v.onrender.com/predict", {
                    message: input,
                })
                .then((res) => {
                    console.log(res.data)
                    setIsAnalyzing(false);
                    if (res.data.prediction === "Spam") {
                        setSpamEmail(1);
                        console.log("spammm")
                    } else {
                        setSpamEmail(-1);
                        console.log("no spam")
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    };

    const shadow = `shadow-[0_1px_12px_rgba(255,255,255,0.5),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)]`;
    return (
        <motion.div
            initial={{
                opacity: 0,
                scale: 0.98,
                filter: "blur(10px)",
            }}
            animate={{
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
            }}
            transition={{
                duration: 0.5,
                delay: 0.6,
                ease: "easeInOut",
            }}
            className={` border-purple-900 border-[1px] ${shadow} md:p-10 p-8 rounded-lg`}
        >
            <h3 className="text-zinc-100 text-xl sm:text-[25px] md: mb-2">
                <span className="text-red-300 ">Spam</span> Mail Detection
                System
            </h3>
            <hr className="border-zinc-500 my-4" />
            <div className="inputBoxandTitle text-zinc-400">
                <span className="flex justify-between items-center mt-2 sm:mt-8 md:mt-10">
                    <h3 className="text-[13px] mt-2 mb-1">Enter Mail Here</h3>
                    {isAnalyzing ? (
                        <button
                            onClick={() => setIsAnalyzing(false)}
                            className={`bg-red-400 flex justify-center items-center gap-1 px-2 py-[1px] text-[10px] rounded-lg text-white mr-1 transition-opacity duration-700  ${
                                input ? "opacity-100" : "opacity-0"
                            }`}
                        >
                            Stop <RxCross2 />
                        </button>
                    ) : (
                        <button
                            onClick={() => {setInput(""); setSpamEmail(0)}}
                            className={`bg-zinc-200 flex justify-center items-center gap-1 px-2 py-[1px] text-[10px] rounded-lg text-black mr-1 transition-opacity duration-700  ${
                                input ? "opacity-100" : "opacity-0"
                            }`}
                        >
                            clear <MdOutlineClearAll />
                        </button>
                    )}
                </span>
                <div className="w-full">
                    <textarea
                        value={input}
                        disabled={isAnalyzing}
                        onChange={(e) => {setInput(e.target.value); setSpamEmail(0)}}
                        maxLength={500}
                        placeholder=""
                        className="border-zinc-100 border-[1px] rounded-lg py-1 px-2 w-full max-h-[250px] h-16 md:h-20 text-[12px] lg:text-[15px] my-1 md:my-4"
                    />
                    <div className="flex justify-center items-center gap-3">
                        <motion.button
                            initial={{
                                opacity: 0,
                            }}
                            animate={{
                                opacity: 1,
                            }}
                            transition={{
                                duration: 1,
                                delay: 1,
                            }}
                            onClick={demoClickHandler}
                            className={`bg-pink-800 text-white text-[12px] sm:text-[14px] px-7 py-2 rounded-xl mt-4 flex justify-center items-center gap-2 pl-6 ${shadow} `}
                        >
                            Demo{" "}
                            <motion.span>
                                <MdEmojiObjects />
                            </motion.span>
                        </motion.button>
                        <motion.button
                            initial={{
                                opacity: 0,
                            }}
                            animate={{
                                opacity: 1,
                            }}
                            transition={{
                                duration: 1,
                                delay: 1,
                            }}
                            onClick={AnalyseClickHandler}
                            className={`${
                                input ? "bg-zinc-200" : "bg-zinc-500"
                            } transition-colors duration-300 text-black text-[12px] sm:text-[14px] px-4 py-2 rounded-xl mt-4 flex justify-center items-center gap-2 pl-6 ${shadow}`}
                        >
                            Analyse{" "}
                            <motion.span
                                className={`rounded-full px-1 py-1 ${
                                    isAnalyzing && "animate-spin"
                                }`}
                            >
                                <BiAnalyse />
                            </motion.span>
                        </motion.button>
                    </div>
                </div>
                <div className="mt-5">
                    {spamEmail === 1 && (
                        <TypewriterEffect
                            words={[
                                {
                                    text: "X",
                                    className: "dark:text-red-500"

                                },
                                {
                                    text: "Spam",
                                    className: "dark:text-red-400",
                                },
                                {
                                    text: "mail",
                                },
                                {
                                    text: "detected",
                                },
                            ]}
                        />
                    )}
                    {spamEmail === -1 &&
                        
                            <TypewriterEffect
                                words={[
                                    {
                                        text: "✅",
                                        
                                    },
                                    {
                                        text: "No",
                                        className:"dark:text-green-200"
                                        
                                    },
                                    {
                                        text: "Spam",
                                        className:"dark:text-green-200"
                                    },
                                    {
                                        text:"Mail"
                                    },
                                    {
                                        text: "detected",
                                    },
                                ]}
                            />
                        
                    }
                    {spamEmail === 0 &&
                        
                        <TypewriterEffect
                            words={[
                                {
                                    text: "Enter",
                                    
                                },
                                {
                                    text: "Mail",
                                },
                                {
                                    text:"and"
                                },
                                {
                                    text: "Click",
                                },
                                {
                                    text: "on",
                                },
                                {
                                    text: "Analyse.",
                                },
                            ]}
                        />
                    
                }
                </div>
            </div>
        </motion.div>
    );
}

export default MainSection;
