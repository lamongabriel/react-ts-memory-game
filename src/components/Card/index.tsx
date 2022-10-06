import './styles.css'

export interface CardProps {
  id: string
  flipped?: boolean
  textContent?: string
  handleClick?: (id: string) => void
}

export function Card({ id, flipped = false, textContent, handleClick }: CardProps){

  const cardContentClasses = ['card__content']
  flipped && cardContentClasses.push('card__content--flipped')

  const handleClickFn = () =>{
    handleClick && handleClick(id)
  }

  return (
    <div className="card" onClick={handleClickFn}>
      <div className={cardContentClasses.join(' ')}>
        <div className="card__face card__face--front">?</div>
        <div className="card__face card__face--back">{textContent}</div>
      </div>
    </div>
  )
}