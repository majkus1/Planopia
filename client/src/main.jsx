// import './axiosSetup.js'
// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App'
// import { HelmetProvider } from 'react-helmet-async'
// import './i18n.js';

// const root = ReactDOM.createRoot(document.getElementById('root'))
// root.render(
// 	<HelmetProvider>
// 		<React.StrictMode>
// 			<App />
// 		</React.StrictMode>
// 	</HelmetProvider>
// )
import './axiosSetup.js'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { HelmetProvider } from 'react-helmet-async'
import './i18n.js'
import { registerSW } from 'virtual:pwa-register'

registerSW({
  onNeedRefresh() {
    console.log('New content available. Refresh to update.')
  },
  onOfflineReady() {
    console.log('App ready to work offline.')
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <HelmetProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </HelmetProvider>
)
