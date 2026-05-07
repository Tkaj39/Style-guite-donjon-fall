import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/layout/Layout'
import ButtonsPage from './pages/ButtonsPage'
import ButtonGroupsPage from './pages/ButtonGroupsPage'
import PlaceholderPage from './pages/PlaceholderPage'
import InputsPage from './pages/InputsPage'
import BadgesPage from './pages/BadgesPage'
import CardsPage from './pages/CardsPage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/buttons" replace />} />
        <Route path="buttons" element={<ButtonsPage />} />
        <Route path="button-groups" element={<ButtonGroupsPage />} />
        <Route path="colors" element={<PlaceholderPage title="Colors" />} />
        <Route path="typography" element={<PlaceholderPage title="Typography" />} />
        <Route path="spacing" element={<PlaceholderPage title="Spacing" />} />
        <Route path="inputs" element={<InputsPage />} />
        <Route path="badges" element={<BadgesPage />} />
        <Route path="cards" element={<CardsPage />} />
      </Route>
    </Routes>
  )
}
