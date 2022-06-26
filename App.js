import React from 'react';
import Die from './die';
import {nanoid} from "nanoid";
import Confetti from "react-confetti";
export default function App() {
    const [Dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    React.useEffect(() => {
        const allHeld = Dice.every(die => die.isHeld)
        const firstValue = Dice[0].value
        const allSameValue = Dice.every(die => die.value === firstValue)
        if(allHeld && allSameValue){
            setTenzies(true)
            console.log("You Won!!")    
        }
        
    },[Dice])

    function generateNewDice(){
        return(
            {
                value: Math.ceil(Math.random() * 6) ,
                isHeld: false,
                id: nanoid()
            }

        )
    }

    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDice())
        }
        return newDice;
    }
function rollDice(){
    tenzies ? 
    setDice(allNewDice()) && setTenzies(false):
    setDice(oldDice => oldDice.map(die => {
        return(
            die.isHeld ? die : generateNewDice()
        )
    }))
}
function holdDice(id){
    setDice(oldDice => oldDice.map(die => {
        return (die.id === id ? {...die, isHeld:!die.isHeld} : die)
    }))
}

    return (
        <main>
            {tenzies && <Confetti />}
            <h2 className='title'>Tenzies</h2>
            <p className='info'>Roll until all dice are the same. Click each dice to freeze it at its current value between rolls. </p>
            <div className='diceContainer'>
                
                {Dice.map(die => <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />)}
            </div>
                <button className='button' onClick={rollDice}>{tenzies ? "New Game":"Roll"}</button>
        </main>
    )
}