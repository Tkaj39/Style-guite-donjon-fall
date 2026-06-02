import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, useSearchParams } from 'react-router-dom'
import Layout from './styleguide/Layout'
import ErrorBoundary from './styleguide/ErrorBoundary'
import { LibPreferenceProvider } from './styleguide/LibPreferenceProvider'

/** Kombinace ErrorBoundary + Suspense — zachytí chyby lazy stránek a zobrazí je čitelně */
function S({ children }) {
  return <ErrorBoundary><Suspense>{children}</Suspense></ErrorBoundary>
}

const ButtonsPage          = lazy(() => import('./pages/ButtonsPage'))
const ButtonGroupsPage     = lazy(() => import('./pages/ButtonGroupsPage'))
const PlaceholderPage      = lazy(() => import('./pages/PlaceholderPage'))
const InputsPage           = lazy(() => import('./pages/InputsPage'))
const BadgesPage           = lazy(() => import('./pages/BadgesPage'))
const CardsPage            = lazy(() => import('./pages/CardsPage'))
const ColorsPage           = lazy(() => import('./pages/ColorsPage'))
const HomePage             = lazy(() => import('./pages/HomePage'))
const ArchitecturePage     = lazy(() => import('./pages/ArchitecturePage'))
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
const NotchMenuPage        = lazy(() => import('./pages/NotchMenuPage'))
const LayoutPage           = lazy(() => import('./pages/LayoutPage'))
const AvatarPage           = lazy(() => import('./pages/AvatarPage'))
const FormPage             = lazy(() => import('./pages/FormPage'))
const MotionPage           = lazy(() => import('./pages/MotionPage'))
const InteractionStatesPage = lazy(() => import('./pages/InteractionStatesPage'))
const ZIndexPage           = lazy(() => import('./pages/ZIndexPage'))
const AccessibilityPage    = lazy(() => import('./pages/AccessibilityPage'))
const ContrastLabPage      = lazy(() => import('./pages/ContrastLabPage'))
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
const ScoopClipPage        = lazy(() => import('./pages/ScoopClipPage'))
const SnippetsPage         = lazy(() => import('./pages/SnippetsPage'))
const ResourceBarPage      = lazy(() => import('./pages/ResourceBarPage'))
const NumericDisplayPage   = lazy(() => import('./pages/NumericDisplayPage'))
const PlayerPanelPage      = lazy(() => import('./pages/PlayerPanelPage'))
const ActionTilePage       = lazy(() => import('./pages/ActionTilePage'))
const EventLogPage         = lazy(() => import('./pages/EventLogPage'))
const PhaseIndicatorPage          = lazy(() => import('./pages/PhaseIndicatorPage'))
const NotificationCenterPage      = lazy(() => import('./pages/NotificationCenterPage'))

export default function App() {
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const lib = searchParams.get('lib')
    const favicon = document.querySelector('link[rel="icon"]')
    if (favicon) favicon.href = lib === 'donjon' ? '/favicon-donjon.svg' : '/favicon-tkajui.svg'
  }, [searchParams])

  return (
    <LibPreferenceProvider>
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<S><HomePage /></S>} />
        <Route path="architecture" element={<S><ArchitecturePage /></S>} />
        <Route path="buttons"      element={<S><ButtonsPage /></S>} />
        <Route path="button-groups" element={<S><ButtonGroupsPage /></S>} />
        <Route path="mood"         element={<S><MoodPage /></S>} />
        <Route path="colors"       element={<S><ColorsPage /></S>} />
        <Route path="typography"   element={<S><TypographyPage /></S>} />
        <Route path="spacing"      element={<S><SpacingPage /></S>} />
        <Route path="pictograms"   element={<S><PictogramsPage /></S>} />
        <Route path="ornaments"    element={<S><OrnamentsPage /></S>} />
        <Route path="shapes"       element={<S><ShapesPage /></S>} />
        <Route path="inputs"       element={<S><InputsPage /></S>} />
        <Route path="badges"       element={<S><BadgesPage /></S>} />
        <Route path="cards"        element={<S><CardsPage /></S>} />
        <Route path="turn"         element={<S><TahPage /></S>} />
        <Route path="actions"      element={<S><AkcePage /></S>} />
        <Route path="victory-points" element={<S><VictoryPointsPage /></S>} />
        <Route path="dialogs"      element={<S><DialogyPage /></S>} />
        <Route path="hexagon"      element={<S><HexagonPage /></S>} />
        <Route path="dice"         element={<S><DicePage /></S>} />
        <Route path="map"          element={<S><MapPage /></S>} />
        <Route path="erb"          element={<S><ErbPage /></S>} />
        <Route path="animations"   element={<S><AnimacePage /></S>} />
        <Route path="float-feedback" element={<S><FloatFeedbackPage /></S>} />
        <Route path="sounds"       element={<S><ZvukyPage /></S>} />
        <Route path="screens"      element={<S><ScreensPage /></S>} />
        <Route path="menu"         element={<S><MenuPage /></S>} />
        <Route path="map-select"   element={<S><MapSelectPage /></S>} />
        <Route path="loading-app"  element={<S><LoadingAppPage /></S>} />
        <Route path="loading-game" element={<S><LoadingGamePage /></S>} />
        <Route path="settings"     element={<S><SettingsPage /></S>} />
        <Route path="todo"         element={<S><TodoPage /></S>} />
        <Route path="components"   element={<S><ComponentsPage /></S>} />
        <Route path="components/:slug" element={<S><ComponentDetailPage /></S>} />
        <Route path="tooltip"      element={<S><TooltipPage /></S>} />
        <Route path="modal"        element={<S><ModalPage /></S>} />
        <Route path="toast"        element={<S><ToastPage /></S>} />
        <Route path="toggle"       element={<S><TogglePage /></S>} />
        <Route path="progress-bar" element={<S><ProgressBarPage /></S>} />
        <Route path="select"       element={<S><SelectPage /></S>} />
        <Route path="slider"       element={<S><SliderPage /></S>} />
        <Route path="tabs"               element={<S><TabsPage /></S>} />
        <Route path="notch-menu"         element={<S><NotchMenuPage /></S>} />
        <Route path="layout"             element={<S><LayoutPage /></S>} />
        <Route path="avatar"             element={<S><AvatarPage /></S>} />
        <Route path="form"               element={<S><FormPage /></S>} />
        <Route path="motion"             element={<S><MotionPage /></S>} />
        <Route path="interaction-states" element={<S><InteractionStatesPage /></S>} />
        <Route path="z-index"            element={<S><ZIndexPage /></S>} />
        <Route path="accessibility"      element={<S><AccessibilityPage /></S>} />
        <Route path="contrast-lab"       element={<S><ContrastLabPage /></S>} />
        <Route path="feedback-hierarchy" element={<S><FeedbackHierarchyPage /></S>} />
        <Route path="error-states"       element={<S><ErrorStatesPage /></S>} />
        <Route path="empty-states"       element={<S><EmptyStatesPage /></S>} />
        <Route path="loading-skeleton"   element={<S><LoadingSkeletonPage /></S>} />
        <Route path="validation"         element={<S><ValidationPage /></S>} />
        <Route path="microcopy"          element={<S><MicrocopyPage /></S>} />
        <Route path="responsive"         element={<S><ResponsivePage /></S>} />
        <Route path="focus-ring"         element={<S><FocusRingPage /></S>} />
        <Route path="glow-shadow"        element={<S><GlowShadowPage /></S>} />
        <Route path="cursor"             element={<S><CursorPage /></S>} />
        <Route path="scrollbar"          element={<S><ScrollbarPage /></S>} />
        <Route path="text-selection"     element={<S><TextSelectionPage /></S>} />
        <Route path="tokens"             element={<S><TokensPage /></S>} />
        <Route path="hud"                element={<S><HudPage /></S>} />
        <Route path="texture"            element={<S><TexturePage /></S>} />
        <Route path="corner-ornament"   element={<S><CornerOrnamentPage /></S>} />
        <Route path="scoop-clip"        element={<S><ScoopClipPage /></S>} />
        <Route path="snippets"          element={<S><SnippetsPage /></S>} />
        <Route path="resource-bar"      element={<S><ResourceBarPage /></S>} />
        <Route path="numeric-display"   element={<S><NumericDisplayPage /></S>} />
        <Route path="player-panel"      element={<S><PlayerPanelPage /></S>} />
        <Route path="action-tile"       element={<S><ActionTilePage /></S>} />
        <Route path="event-log"         element={<S><EventLogPage /></S>} />
        <Route path="phase-indicator"        element={<S><PhaseIndicatorPage /></S>} />
        <Route path="notification-center"    element={<S><NotificationCenterPage /></S>} />
      </Route>
    </Routes>
    </LibPreferenceProvider>
  )
}