import { useState } from 'react';

interface PostOptions {
  url: string;
  body: object;
  token?: string;
}

interface PostResponse<T> {
  data: T | null;
  error: Error | null;
  success: boolean;
  postData: (options: PostOptions) => Promise<void>;
}

const usePost = <T>(): PostResponse<{ user: T, token: string }> => {
  const [data, setData] = useState<{ user: T, token: string } | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const postData = async ({ url, body, token }: PostOptions) => {
    setSuccess(false);
    try {
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`http://localhost:8000/api/${url}/`, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
      });
      
   

      const responseData = await response.json();
      console.log(JSON.stringify(responseData));
      if (responseData.refresh==undefined || !responseData.access==undefined ) {
       
        throw new Error('Failed to fetch');
      }
      setData(responseData);
      setSuccess(true); 
    } catch (error) {
    
      setError(error as Error);
    }
  };

  return { data, error, success, postData };
};

export default usePost;
