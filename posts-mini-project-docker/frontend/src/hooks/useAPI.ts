import { useQuery } from 'react-query';
import { getData } from '../utils/api'; 

export const useFetchData = <T>(key: string, url: string) => {
    return useQuery<T>([key], () => getData<T>(url),
      {
        onError: (error: unknown) => {
          if (error instanceof Error) {
            console.error('Fetch error:', error.message);
          } else {
            console.error('Fetch error:', 'Unknown error occurred');
          }
        },
      }
    );
  };