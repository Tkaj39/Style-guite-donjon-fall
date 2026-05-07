import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/layout/Layout'
import ButtonsPage from './pages/ButtonsPage'
import ButtonGroupsPage from './pages/ButtonGroupsPage'
import PlaceholderPage from './pages/PlaceholderPage'
import InputsPage from './pages/InputsPage'
import BadgesPage from './pages/BadgesPage'
import CardsPage from './pages/CardsPage'
import ColorsPage from './pages/ColorsPage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/buttons" replace />} />
        <Route path="buttons" element={<ButtonsPage />} />
        <Route path="button-groups" element={<ButtonGroupsPage />} />
        <Route path="colors" element={<ColorsPage />} />
        <Route path="typography" element={<PlaceholderPage title="Typography" />} />
        <Route path="spacing" element={<PlaceholderPage title="Spacing" />} />
        <Route path="pictograms" element={<PlaceholderPage title="Pictograms" />} />
        <Route path="inputs" element={<InputsPage />} />
        <Route path="badges" element={<BadgesPage />} />
        <Route path="cards" element={<CardsPage />} />
        <Route path="turn" element={<PlaceholderPage title="Tah" />} />
        <Route path="actions" element={<PlaceholderPage title="Akce" />} />
        <Route path="victory-points" element={<PlaceholderPage title="Vítězné body" />} />
        <Route path="dialogs" element={<PlaceholderPage title="Dialogy" />} />
        <Route path="hexagon" element={<PlaceholderPage title="Hexagon" />} />
        <Route path="dice" element={<PlaceholderPage title="Kostky" />} />
        <Route path="map" element={<PlaceholderPage title="Mapa" />} />
        <Route path="erb" element={<PlaceholderPage title="Erb" />} />
        <Route path="animations" element={<PlaceholderPage title="Animace" />} />
        <Route path="sounds" element={<PlaceholderPage title="Zvuky" />} />
      </Route>
    </Routes>
  )
}
