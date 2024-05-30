import { Buffer } from 'buffer'
import ReactDOM from 'react-dom/client'
import { App } from './app'

window.Buffer = Buffer

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
