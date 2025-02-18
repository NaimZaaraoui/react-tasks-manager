import { Toaster } from "react-hot-toast";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AppProvider from "./providers/AppProvider";
import { useEffect, useState } from "react";
import { GridLoader } from "react-spinners";
import TaskStats from "./components/TaskStats";
import Footer from "./components/Footer";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);

  return loading ? (
    <div className="fixed inset-0 grid place-center bg-sky-50">
      <GridLoader
        className="z-30"
        color="blue"
        size={10}
        loading={loading}
      />
    </div>
  ) : (
    <AppProvider>
      <div className="grid grid-rows-[auto_1fr_auto] min-h-dvh">
        <Header />
        <main className="container py-6">
          <Tasks />
        </main>
        <Footer />
        <TaskStats />
        <Toaster
          toastOptions={{
            style: {
              borderRadius: "100vw",
            },
          }}
        />
      </div>
    </AppProvider>
  );
};

export default App;
