import { TooltipProvider } from '@/components/ui/tooltip';
import { Builder } from '@/modules/builder/components/builder';

function App() {
  return (
    <TooltipProvider>
      <Builder />
    </TooltipProvider>
  );
}

export default App;
