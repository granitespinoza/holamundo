import { InteractiveMascot } from '@/components/home/InteractiveMascot';
import { LoginForm } from '@/components/home/LoginForm';
import { BrandingSection } from '@/components/home/BrandingSection';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center min-h-screen">
          
          {/* Left Column - Branding and Mascot */}
          <div className="flex flex-col items-center justify-center space-y-8">
            <BrandingSection />
            <InteractiveMascot />
          </div>

          {/* Right Column - Login Panel */}
          <div className="flex items-center justify-center">
            <LoginForm />
          </div>
          
        </div>
      </div>
    </div>
  );
}