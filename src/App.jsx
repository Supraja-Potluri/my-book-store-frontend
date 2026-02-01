import { useState, useEffect } from 'react'
import './App.css'
import SplashScreen from './components/SplashScreen'
import LaunchScreen from './components/LaunchScreen'
import FormScreen from './components/FormScreen'

function App() {
  // appState can be: 'launch', 'splash', 'form'
  const [appState, setAppState] = useState('launch')

  useEffect(() => {
    if (appState === 'launch') {
      const timer = setTimeout(() => {
        setAppState('splash')
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [appState])

  if (appState === 'launch') {
    return <LaunchScreen />
  }

  if (appState === 'splash') {
    return <SplashScreen onGetStarted={() => setAppState('form')} />
  }

  if (appState === 'form') {
    return <FormScreen goBack={() => setAppState('splash')} />
  }

  return null
}

export default App
