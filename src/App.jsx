import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/layout/Layout'
import ButtonsPage from './pages/ButtonsPage'
import ButtonGroupsPage from './pages/ButtonGroupsPage'
import PlaceholderPage from './pages/PlaceholderPage'
import InputsPage from './pages/InputsPage'
import BadgesPage from './pages/BadgesPage'
import CardsPage from './pages/CardsPage'
import ColorsPage from './pages/ColorsPage'
import MoodPage from './pages/MoodPage'
import TypographyPage from './pages/TypographyPage'
import SpacingPage from './pages/SpacingPage'
import PictogramsPage from './pages/PictogramsPage'
import OrnamentsPage from './pages/OrnamentsPage'
import ShapesPage from './pages/ShapesPage'
import TahPage from './pages/TahPage'
import AkcePage from './pages/AkcePage'
import VictoryPointsPage from './pages/VictoryPointsPage'
import DialogyPage from './pages/DialogyPage'
import HexagonPage from './pages/HexagonPage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/mood" replace />} />
        <Route path="buttons" element={<ButtonsPage />} />
        <Route path="button-groups" element={<ButtonGroupsPage />} />
        <Route path="mood" element={<MoodPage />} />
        <Route path="colors" element={<ColorsPage />} />
        <Route path="typography" element={<TypographyPage />} />
        <Route path="spacing" element={<SpacingPage />} />
        <Route path="pictograms" element={<PictogramsPage />} />
        <Route path="ornaments" element={<OrnamentsPage />} />
        <Route path="shapes" element={<ShapesPage />} />
        <Route path="inputs" element={<InputsPage />} />
        <Route path="badges" element={<BadgesPage />} />
        <Route path="cards" element={<CardsPage />} />
        <Route path="turn" element={<TahPage />} />
        <Route path="actions" element={<AkcePage />} />
        <Route path="victory-points" element={<VictoryPointsPage />} />
        <Route path="dialogs" element={<DialogyPage />} />
        <Route path="hexagon" element={<HexagonPage />} />
        <Route path="dice" element={<PlaceholderPage title="Kostky" />} />
        <Route path="map" element={<PlaceholderPage title="Mapa" />} />
        <Route path="erb" element={<PlaceholderPage title="Erb" />} />
        <Route path="animations" element={<PlaceholderPage title="Animace" />} />
        <Route path="sounds" element={<PlaceholderPage title="Zvuky" />} />
      </Route>
    </Routes>
  )
}
