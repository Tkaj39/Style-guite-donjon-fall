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
import DicePage from './pages/DicePage'
import MapPage from './pages/MapPage'
import ErbPage from './pages/ErbPage'
import AnimacePage from './pages/AnimacePage'
import ZvukyPage from './pages/ZvukyPage'
import ScreensPage from './pages/ScreensPage'
import MenuPage from './pages/MenuPage'
import MapSelectPage from './pages/MapSelectPage'
import LoadingAppPage from './pages/LoadingAppPage'
import LoadingGamePage from './pages/LoadingGamePage'
import SettingsPage from './pages/SettingsPage'
import ComponentsPage from './pages/ComponentsPage'
import ComponentDetailPage from './pages/ComponentDetailPage'
import TooltipPage from './pages/TooltipPage'
import ModalPage from './pages/ModalPage'
import ToastPage from './pages/ToastPage'
import TogglePage from './pages/TogglePage'

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
        <Route path="dice" element={<DicePage />} />
        <Route path="map" element={<MapPage />} />
        <Route path="erb" element={<ErbPage />} />
        <Route path="animations" element={<AnimacePage />} />
        <Route path="sounds" element={<ZvukyPage />} />
        <Route path="screens" element={<ScreensPage />} />
        <Route path="menu" element={<MenuPage />} />
        <Route path="map-select" element={<MapSelectPage />} />
        <Route path="loading-app" element={<LoadingAppPage />} />
        <Route path="loading-game" element={<LoadingGamePage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="components" element={<ComponentsPage />} />
        <Route path="components/:slug" element={<ComponentDetailPage />} />
        <Route path="tooltip" element={<TooltipPage />} />
        <Route path="modal" element={<ModalPage />} />
        <Route path="toast" element={<ToastPage />} />
        <Route path="toggle" element={<TogglePage />} />
      </Route>
    </Routes>
  )
}
