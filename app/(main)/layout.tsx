import { BottomNav } from '@/components/BottomNav';
import { AppHeader } from '@/components/AppHeader';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppHeader />
      <main className="main-content">
        {children}
      </main>
      <BottomNav />
      
      <style>{`
        .main-content {
          padding-top: 56px;
          min-height: 100vh;
        }
        
        @media (min-width: 769px) {
          .main-content {
            margin-left: 240px;
          }
        }
        
        @media (max-width: 768px) {
          .main-content {
            padding-bottom: 72px;
          }
        }
      `}</style>
    </>
  );
}
