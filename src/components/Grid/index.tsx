import { ChangeEvent, useRef, useState } from "react";
import { duplicateRegenerateSortArray } from "../../utils/card-utils";
import { Card, CardProps } from "../Card";

import { cardsOBJ } from '../../data/cards'

import './styles.css'

export function Grid() {
  const [ cardArray, setCardArray ] = useState<CardProps[]>(() => duplicateRegenerateSortArray(cardsOBJ[0].item))

  const [ inputValue, setInputValue] = useState<number>(4)

  const first = useRef<CardProps | null>(null)
  const second = useRef<CardProps | null>(null)
  const unflip = useRef<boolean>(false)

  const [matches, setMatches] = useState<number>(0)
  const [moves, setMoves] = useState<number>(0)

  const handleClick = (id: string) => {
    const newStateCards = cardArray.map(card => {      
      if(card.id !== id) return card
      if(card.flipped) return card

      card.flipped = true

      if(unflip.current && first.current && second.current){
        first.current.flipped = false
        second.current.flipped = false
        first.current = null
        second.current = null
        unflip.current = false
      }

      if(first.current === null){
        first.current = card
      } else if(second.current === null){
        second.current = card
      }

      if(first.current && second.current){
        if(first.current.textContent != second.current.textContent){
          unflip.current = true
        } else{
          setMatches(matches => matches + 1)
          first.current = null
          second.current = null
        }
        setMoves(moves => moves + 1)
      }

      return card
    })
    setCardArray(newStateCards)
  }

  const handleReset = () => {
    setCardArray(duplicateRegenerateSortArray(cardsOBJ[0].item))
    setMatches(0)
    setMoves(0)
    setInputValue(4)

    first.current = null
    second.current = null
    unflip.current = false
  }

  const handleInput = (e: ChangeEvent<HTMLInputElement>) =>{
    if(e){
      let inputContent = parseInt(e.target.value)
      handleGameSize(inputContent)
    }
  }

  const handleGameSize = (e: number) =>{
    let roundedInput = e
    if(e % 2 != 0){
      e > inputValue ? roundedInput += 1 : roundedInput -= 1
    }
    if(cardsOBJ.length > 0){
      handleReset()
      let newCardArray = cardsOBJ.find(cardItem => cardItem.numberOfCards === roundedInput)?.item ?? cardsOBJ[0].item
      newCardArray && setCardArray(duplicateRegenerateSortArray(newCardArray))
      setInputValue(roundedInput)
    }
  }

  return (
    <>
      <div className="header">
        <div className="creator">{'<lamongabriel/>'}</div>
        <h1>React + TS <br/>Memory Game</h1>
        <div className="buttons">
          <button onClick={handleReset} className="reset">Reset</button>
          <input type="number" onChange={handleInput} value={inputValue} min="4" max="10"/>
          <div>
            <p>Moves: <strong>{moves}</strong></p>
            <p>Matches: <strong>{matches}</strong></p>
          </div>
        </div>
      </div>
      <div className="grid">
        {cardArray.map(card => <Card {...card} handleClick={handleClick} key={card.id} flipped={card.flipped}/>)}
      </div>
    </>
  )
}