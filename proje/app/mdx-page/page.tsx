import Welcome from '@/content/welcome.mdx'
import { useMDXComponents } from '@/mdx-components';

export default function Page() {
  return(
    <div className='p-10 m-10'>
      <Welcome components={useMDXComponents({})} />
    </div>
  );
}