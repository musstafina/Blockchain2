import ReactDOM from 'react-dom/client'
import { App } from './app'

import { Buffer } from 'buffer'

window.Buffer = Buffer

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
