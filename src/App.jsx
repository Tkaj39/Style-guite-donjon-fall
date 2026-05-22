import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './styleguide/Layout'

const ButtonsPage          = lazy(() => import('./pages/ButtonsPage'))
const ButtonGroupsPage     = lazy(() => import('./pages/ButtonGroupsPage'))
const PlaceholderPage      = lazy(() => import('./pages/PlaceholderPage'))
const InputsPage           = lazy(() => import('./pages/InputsPage'))
const BadgesPage           = lazy(() => import('./pages/BadgesPage'))
const CardsPage            = lazy(() => import('./pages/CardsPage'))
const ColorsPage           = lazy(() => import('./pages/ColorsPage'))
const MoodPage             = lazy(() => import('./pages/MoodPage'))
const TypographyPage       = lazy(() => import('./pages/TypographyPage'))
const SpacingPage          = lazy(() => import('./pages/SpacingPage'))
const PictogramsPage       = lazy(() => import('./pages/PictogramsPage'))
const OrnamentsPage        = lazy(() => import('./pages/OrnamentsPage'))
const ShapesPage           = lazy(() => import('./pages/ShapesPage'))
const TahPage              = lazy(() => import('./pages/TahPage'))
const AkcePage             = lazy(() => import('./pages/AkcePage'))
const VictoryPointsPage    = lazy(() => import('./pages/VictoryPointsPage'))
const DialogyPage          = lazy(() => import('./pages/DialogyPage'))
const HexagonPage          = lazy(() => import('./pages/HexagonPage'))
const DicePage             = lazy(() => import('./pages/DicePage'))
const MapPage              = lazy(() => import('./pages/MapPage'))
const ErbPage              = lazy(() => import('./pages/ErbPage'))
const AnimacePage          = lazy(() => import('./pages/AnimacePage'))
const FloatFeedbackPage    = lazy(() => import('./pages/FloatFeedbackPage'))
const ZvukyPage            = lazy(() => import('./pages/ZvukyPage'))
const ScreensPage          = lazy(() => import('./pages/ScreensPage'))
const MenuPage             = lazy(() => import('./pages/MenuPage'))
const MapSelectPage        = lazy(() => import('./pages/MapSelectPage'))
const LoadingAppPage       = lazy(() => import('./pages/LoadingAppPage'))
const LoadingGamePage      = lazy(() => import('./pages/LoadingGamePage'))
const SettingsPage         = lazy(() => import('./pages/SettingsPage'))
const ComponentsPage       = lazy(() => import('./pages/ComponentsPage'))
const TodoPage             = lazy(() => import('./pages/TodoPage'))
const ComponentDetailPage  = lazy(() => import('./pages/ComponentDetailPage'))
const TooltipPage          = lazy(() => import('./pages/TooltipPage'))
const ModalPage            = lazy(() => import('./pages/ModalPage'))
const ToastPage            = lazy(() => import('./pages/ToastPage'))
const TogglePage           = lazy(() => import('./pages/TogglePage'))
const ProgressBarPage      = lazy(() => import('./pages/ProgressBarPage'))
const SelectPage           = lazy(() => import('./pages/SelectPage'))
const SliderPage           = lazy(() => import('./pages/SliderPage'))
const TabsPage             = lazy(() => import('./pages/TabsPage'))
const MotionPage           = lazy(() => import('./pages/MotionPage'))
const InteractionStatesPage = lazy(() => import('./pages/InteractionStatesPage'))
const ZIndexPage           = lazy(() => import('./pages/ZIndexPage'))
const AccessibilityPage    = lazy(() => import('./pages/AccessibilityPage'))
const FeedbackHierarchyPage = lazy(() => import('./pages/FeedbackHierarchyPage'))
const ErrorStatesPage      = lazy(() => import('./pages/ErrorStatesPage'))
const EmptyStatesPage      = lazy(() => import('./pages/EmptyStatesPage'))
const LoadingSkeletonPage  = lazy(() => import('./pages/LoadingSkeletonPage'))
const ValidationPage       = lazy(() => import('./pages/ValidationPage'))
const MicrocopyPage        = lazy(() => import('./pages/MicrocopyPage'))
const ResponsivePage       = lazy(() => import('./pages/ResponsivePage'))
const FocusRingPage        = lazy(() => import('./pages/FocusRingPage'))
const GlowShadowPage       = lazy(() => import('./pages/GlowShadowPage'))
const CursorPage           = lazy(() => import('./pages/CursorPage'))
const ScrollbarPage        = lazy(() => import('./pages/ScrollbarPage'))
const TextSelectionPage    = lazy(() => import('./pages/TextSelectionPage'))
const TokensPage           = lazy(() => import('./pages/TokensPage'))
const HudPage              = lazy(() => import('./pages/HudPage'))
const TexturePage          = lazy(() => import('./pages/TexturePage'))
const CornerOrnamentPage   = lazy(() => import('./pages/CornerOrnamentPage'))
const SnippetsPage         = lazy(() => import('./pages/SnippetsPage'))
const ResourceBarPage      = lazy(() => import('./pages/ResourceBarPage'))
const NumericDisplayPage   = lazy(() => import('./pages/NumericDisplayPage'))
const PlayerPanelPage      = lazy(() => import('./pages/PlayerPanelPage'))
const ActionTilePage       = lazy(() => import('./pages/ActionTilePage'))
const EventLogPage         = lazy(() => import('./pages/EventLogPage'))
const PhaseIndicatorPage   = lazy(() => import('./pages/PhaseIndicatorPage'))

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/mood" replace />} />
        <Route path="buttons"      element={<Suspense><ButtonsPage /></Suspense>} />
        <Route path="button-groups" element={<Suspense><ButtonGroupsPage /></Suspense>} />
        <Route path="mood"         element={<Suspense><MoodPage /></Suspense>} />
        <Route path="colors"       element={<Suspense><ColorsPage /></Suspense>} />
        <Route path="typography"   element={<Suspense><TypographyPage /></Suspense>} />
        <Route path="spacing"      element={<Suspense><SpacingPage /></Suspense>} />
        <Route path="pictograms"   element={<Suspense><PictogramsPage /></Suspense>} />
        <Route path="ornaments"    element={<Suspense><OrnamentsPage /></Suspense>} />
        <Route path="shapes"       element={<Suspense><ShapesPage /></Suspense>} />
        <Route path="inputs"       element={<Suspense><InputsPage /></Suspense>} />
        <Route path="badges"       element={<Suspense><BadgesPage /></Suspense>} />
        <Route path="cards"        element={<Suspense><CardsPage /></Suspense>} />
        <Route path="turn"         element={<Suspense><TahPage /></Suspense>} />
        <Route path="actions"      element={<Suspense><AkcePage /></Suspense>} />
        <Route path="victory-points" element={<Suspense><VictoryPointsPage /></Suspense>} />
        <Route path="dialogs"      element={<Suspense><DialogyPage /></Suspense>} />
        <Route path="hexagon"      element={<Suspense><HexagonPage /></Suspense>} />
        <Route path="dice"         element={<Suspense><DicePage /></Suspense>} />
        <Route path="map"          element={<Suspense><MapPage /></Suspense>} />
        <Route path="erb"          element={<Suspense><ErbPage /></Suspense>} />
        <Route path="animations"   element={<Suspense><AnimacePage /></Suspense>} />
        <Route path="float-feedback" element={<Suspense><FloatFeedbackPage /></Suspense>} />
        <Route path="sounds"       element={<Suspense><ZvukyPage /></Suspense>} />
        <Route path="screens"      element={<Suspense><ScreensPage /></Suspense>} />
        <Route path="menu"         element={<Suspense><MenuPage /></Suspense>} />
        <Route path="map-select"   element={<Suspense><MapSelectPage /></Suspense>} />
        <Route path="loading-app"  element={<Suspense><LoadingAppPage /></Suspense>} />
        <Route path="loading-game" element={<Suspense><LoadingGamePage /></Suspense>} />
        <Route path="settings"     element={<Suspense><SettingsPage /></Suspense>} />
        <Route path="todo"         element={<Suspense><TodoPage /></Suspense>} />
        <Route path="components"   element={<Suspense><ComponentsPage /></Suspense>} />
        <Route path="components/:slug" element={<Suspense><ComponentDetailPage /></Suspense>} />
        <Route path="tooltip"      element={<Suspense><TooltipPage /></Suspense>} />
        <Route path="modal"        element={<Suspense><ModalPage /></Suspense>} />
        <Route path="toast"        element={<Suspense><ToastPage /></Suspense>} />
        <Route path="toggle"       element={<Suspense><TogglePage /></Suspense>} />
        <Route path="progress-bar" element={<Suspense><ProgressBarPage /></Suspense>} />
        <Route path="select"       element={<Suspense><SelectPage /></Suspense>} />
        <Route path="slider"       element={<Suspense><SliderPage /></Suspense>} />
        <Route path="tabs"               element={<Suspense><TabsPage /></Suspense>} />
        <Route path="motion"             element={<Suspense><MotionPage /></Suspense>} />
        <Route path="interaction-states" element={<Suspense><InteractionStatesPage /></Suspense>} />
        <Route path="z-index"            element={<Suspense><ZIndexPage /></Suspense>} />
        <Route path="accessibility"      element={<Suspense><AccessibilityPage /></Suspense>} />
        <Route path="feedback-hierarchy" element={<Suspense><FeedbackHierarchyPage /></Suspense>} />
        <Route path="error-states"       element={<Suspense><ErrorStatesPage /></Suspense>} />
        <Route path="empty-states"       element={<Suspense><EmptyStatesPage /></Suspense>} />
        <Route path="loading-skeleton"   element={<Suspense><LoadingSkeletonPage /></Suspense>} />
        <Route path="validation"         element={<Suspense><ValidationPage /></Suspense>} />
        <Route path="microcopy"          element={<Suspense><MicrocopyPage /></Suspense>} />
        <Route path="responsive"         element={<Suspense><ResponsivePage /></Suspense>} />
        <Route path="focus-ring"         element={<Suspense><FocusRingPage /></Suspense>} />
        <Route path="glow-shadow"        element={<Suspense><GlowShadowPage /></Suspense>} />
        <Route path="cursor"             element={<Suspense><CursorPage /></Suspense>} />
        <Route path="scrollbar"          element={<Suspense><ScrollbarPage /></Suspense>} />
        <Route path="text-selection"     element={<Suspense><TextSelectionPage /></Suspense>} />
        <Route path="tokens"             element={<Suspense><TokensPage /></Suspense>} />
        <Route path="hud"                element={<Suspense><HudPage /></Suspense>} />
        <Route path="texture"            element={<Suspense><TexturePage /></Suspense>} />
        <Route path="corner-ornament"   element={<Suspense><CornerOrnamentPage /></Suspense>} />
        <Route path="snippets"          element={<Suspense><SnippetsPage /></Suspense>} />
        <Route path="resource-bar"      element={<Suspense><ResourceBarPage /></Suspense>} />
        <Route path="numeric-display"   element={<Suspense><NumericDisplayPage /></Suspense>} />
        <Route path="player-panel"      element={<Suspense><PlayerPanelPage /></Suspense>} />
        <Route path="action-tile"       element={<Suspense><ActionTilePage /></Suspense>} />
        <Route path="event-log"         element={<Suspense><EventLogPage /></Suspense>} />
        <Route path="phase-indicator"   element={<Suspense><PhaseIndicatorPage /></Suspense>} />
      </Route>
    </Routes>
  )
}