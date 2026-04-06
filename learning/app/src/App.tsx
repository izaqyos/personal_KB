import { Dashboard } from './components/Dashboard'
import tracksData from '../../config/tracks.yaml'
import scheduleData from '../../config/schedule.yaml'
import type { TracksConfig, Schedule } from './types'

const tracks = tracksData as unknown as TracksConfig
const schedule = scheduleData as unknown as Schedule

function App() {
  return <Dashboard tracks={tracks} schedule={schedule} />
}

export default App
