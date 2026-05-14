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
import ProgressBarPage from './pages/ProgressBarPage'
import SelectPage from './pages/SelectPage'
import SliderPage from './pages/SliderPage'
import TabsPage from './pages/TabsPage'
import MotionPage from './pages/MotionPage'
import InteractionStatesPage from './pages/InteractionStatesPage'
import ZIndexPage from './pages/ZIndexPage'
import AccessibilityPage from './pages/AccessibilityPage'
import FeedbackHierarchyPage from './pages/FeedbackHierarchyPage'
import ErrorStatesPage from './pages/ErrorStatesPage'
import EmptyStatesPage from './pages/EmptyStatesPage'
import LoadingSkeletonPage from './pages/LoadingSkeletonPage'
import ValidationPage from './pages/ValidationPage'
import MicrocopyPage from './pages/MicrocopyPage'
import ResponsivePage from './pages/ResponsivePage'
import FocusRingPage from './pages/FocusRingPage'
import GlowShadowPage from './pages/GlowShadowPage'
import CursorPage from './pages/CursorPage'
import ScrollbarPage from './pages/ScrollbarPage'
import TextSelectionPage from './pages/TextSelectionPage'

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
        <Route path="toggle"       element={<TogglePage />} />
        <Route path="progress-bar" element={<ProgressBarPage />} />
        <Route path="select"       element={<SelectPage />} />
        <Route path="slider"       element={<SliderPage />} />
        <Route path="tabs"               element={<TabsPage />} />
        <Route path="motion"             element={<MotionPage />} />
        <Route path="interaction-states" element={<InteractionStatesPage />} />
        <Route path="z-index"            element={<ZIndexPage />} />
        <Route path="accessibility"      element={<AccessibilityPage />} />
        <Route path="feedback-hierarchy" element={<FeedbackHierarchyPage />} />
        <Route path="error-states"       element={<ErrorStatesPage />} />
        <Route path="empty-states"       element={<EmptyStatesPage />} />
        <Route path="loading-skeleton"   element={<LoadingSkeletonPage />} />
        <Route path="validation"         element={<ValidationPage />} />
        <Route path="microcopy"          element={<MicrocopyPage />} />
        <Route path="responsive"         element={<ResponsivePage />} />
        <Route path="focus-ring"         element={<FocusRingPage />} />
        <Route path="glow-shadow"        element={<GlowShadowPage />} />
        <Route path="cursor"             element={<CursorPage />} />
        <Route path="scrollbar"          element={<ScrollbarPage />} />
        <Route path="text-selection"     element={<TextSelectionPage />} />
      </Route>
    </Routes>
  )
}
