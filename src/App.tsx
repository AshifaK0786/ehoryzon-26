import React from "react";
import type { ReactNode, ErrorInfo } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EHorizon from "./pages/ehorizon";
import AboutUs from "./pages/aboutus";
import Schedule from "./pages/schedule";
import PitchRegister from "./pages/pitch";
import RegistrationPage from "./pages/registration";
import EventRegister from "./pages/eventRegister";
import ThiraiTriviaRegister from "./pages/thiraiTrivia";
import MasterchefManiaRegister from "./pages/masterchefMania";
import MecharenaRegister from "./pages/mecharena";
import WebifyRegister from "./pages/webify";
import GameathonRegister from "./pages/gameathon";
import ElectricalOdysseyRegister from "./pages/electricalOdyssey";
import BuildscapeRegister from "./pages/buildscape";
import IplAuctionRegister from "./pages/iplAuction";

// Error Boundary Component
interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ color: "white", textAlign: "center", padding: "20px" }}>
          <h1>Something went wrong</h1>
          <p>{this.state.error?.message}</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<EHorizon/>} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/register/pitch" element={<PitchRegister />} />
            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="/register/thirai-trivia" element={<ThiraiTriviaRegister />} />
            <Route path="/register/masterchef-mania" element={<MasterchefManiaRegister />} />
            
            <Route path="/register/mecharena" element={<MecharenaRegister />} />
            <Route path="/register/webify" element={<WebifyRegister />} />
            <Route path="/register/gameathon" element={<GameathonRegister />} />
            <Route path="/register/electrical-odyssey" element={<ElectricalOdysseyRegister />} />
            <Route path="/register/buildscape" element={<BuildscapeRegister />} />
            <Route path="/register/ipl-auction" element={<IplAuctionRegister />} />
            <Route path="/register/:slug" element={<EventRegister />} />
        <Route path="*" element={<div style={{ color: "white" }}>404</div>} />
      </Routes>
    </Router>
    </ErrorBoundary>
  );
}
