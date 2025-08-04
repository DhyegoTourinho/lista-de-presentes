import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import LoginPage from "@/pages/login";
import AdminPage from "@/pages/admin";
import GiftPage from "@/pages/gift";
import DemoGiftPage from "@/pages/demo-gift";
import PublicListsPage from "@/pages/public-lists";
import { ProtectedRoute } from "@/components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<LoginPage />} path="/login" />
      <Route element={<PublicListsPage />} path="/listas" />
      <Route 
        element={
          <ProtectedRoute>
            <AdminPage />
          </ProtectedRoute>
        } 
        path="/admin/:username" 
      />
      <Route element={<GiftPage />} path="/gift/:username" />
      <Route element={<DemoGiftPage />} path="/gift/demo" />
    </Routes>
  );
}

export default App;
