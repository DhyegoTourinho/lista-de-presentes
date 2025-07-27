import Presents from '@/components/presentsv2';
import { ThemeSwitch } from '@/components/theme-switch';
import DefaultLayout from '@/layouts/default';

export default function DocsPage() {
  return (
    <DefaultLayout>
          <div className="text-end">
            <ThemeSwitch />
          </div>
            <Presents />
        </DefaultLayout>
  );
}
