import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export const useQuestionsNavigation = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);

  const questionIdFromUrl = params.get('id');  

  // Check if the window object is available.
  const handleId = typeof window !== 'undefined' ? parseInt(questionIdFromUrl) : null;

  const onSelectQuestionsId = (id) => {
    // window.localStorage.setItem('id', JSON.stringify(id)) // - Do not need to, because the question is accessible from the URL
    
    params.set('id', id);

    replace(`${pathname}?${params.toString()}`);
  };

  return { handleId, onSelectQuestionsId};
};