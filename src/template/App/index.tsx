import { Grid } from '../../components/Grid'

import backgroundIMG from '../../images/background.png'
import './styles.css'

export function App() {
  document.body.style.backgroundImage = `url(${backgroundIMG})`

  return (
      <Grid />
  )
}
