import "./Main.css"
import {languages} from "./Languages"
import Lang from "./Lang"
import React from "react"
import Alpha from "./Alpha"
import clsx from "clsx"
import { getFarewellText,randomWord } from "./utils"
import Confetti from "react-confetti"

export default function Main(){
    const[LangArray,setLand] = React.useState(languages)


    const[guss,setGuss] = React.useState([])

    function clickHandler(event){
        setGuss(prev => {
            const newSet = new Set(prev)
            newSet.add(event.target.innerText.toLowerCase())
            return Array.from(newSet)
        })
    }
    
    function MyclickHandle(){
        setCurrentWord(() => randomWord())    
        setGuss([])
    }

    const [currentWord,setCurrentWord]=React.useState(() => randomWord())
    

    const WrongCount = guss.filter(list => !currentWord.includes(list)).length
    

    const Alphabet = "abcdefghijklmnopqrstuvwxyz"

    const isGameLost = WrongCount === 8

    const isGameWon = currentWord.split("").every(letter => guss.includes(letter))

    const isGameOver = isGameLost || isGameWon

    const isLastGussIncorrect = !currentWord.includes(guss[guss.length-1])

    const lastGussed = guss[guss.length - 1]


    const alphaList = Alphabet.split("").map((list,index) => {
        const isGussed = guss.includes(list.toLowerCase())
        const isCorrect = isGussed && currentWord.includes(list.toLowerCase())
        const isWrong = isGussed && !(currentWord.includes(list.toLowerCase))
        const className = isCorrect
            ? "correct"
            : isWrong
                ? "wrong"
                : "buttonWrap";
        
        return(
            <Alpha key={index} click={clickHandler} myclass = {className} letters={list.toUpperCase()} disabled = {isGameOver} lable={`Letter ${list}`}/>
        )
    })

    


    const lanlist = LangArray.map((list,index) => {
        const isLost = index < WrongCount
        const className= clsx("lang-div",isLost && "lost")
        
        return (<Lang color={list.color} className={className} bgcolor={list.backgroundColor} name={list.name} key={list.name}/>)
    })

    const answerList = currentWord.split("").map((list,index) => {
        const ShouldReveal = isGameLost || guss.includes(list)
        const style = {
            color: !guss.includes(list) && isGameLost ? "red" : "yellow"
        }
        return(
            (
                <span style={style} key={index}>{ShouldReveal ? list.toUpperCase() : ""} </span> 
            )
        )
    })

    const style = {
        backgroundColor : isGameOver ?isGameWon ? "#10a958" : "#D02B2B" : isLastGussIncorrect && WrongCount > 0 ? "#7a5ea7" : null
    }

    return(
        <main>
            {isGameWon && <Confetti
                recycle={false}
                numberOfPieces={1000}
            />}
            <section 
            aria-live="polite"
            role="status"
            className="game-status" style={style}>
                {isGameOver ? (
                    isGameWon ? (
                        <>
                            <h2>You Win</h2>
                            <p>Well Done!🎉</p>
                        </>
                    ) : (
                        <>
                            <h2>Game Over !</h2>
                            <p>You lose ! Better start learning Assembly 💀</p>
                        </>
                    )
                ) :isLastGussIncorrect && WrongCount > 0 ? (
                    <p>{getFarewellText(languages[WrongCount - 1].name)}</p>
                ) : (
                    null
                )

                }
            </section>
            <section className="language-list">
                {lanlist}
            </section>
            <section className="answer-holder">
                {answerList}
            </section>

            <section 
                className="sr-only" 
                aria-live="polite" 
                role="status"
            >
                <p>
                    {currentWord.includes(lastGussed) ? `Correct! The letter ${lastGussed} is in the word` : `Sorry! The letter ${lastGussed} is not in the word`}
                    {`You have ${8 - WrongCount} attempts left`}
                </p>
                <p>Current word: {currentWord.split("").map(letter => 
                guss.includes(letter) ? letter + "." : "blank.")
                .join(" ")}</p>
            
            </section>

            <section className="keybord-wrap">
                {alphaList}
            </section>
            <section className="buttons">
                {isGameOver && <Alpha letters={"New Game"} click={MyclickHandle}/>}
            </section>
        </main>
    )
}