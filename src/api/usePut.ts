import { useState } from 'react';

interface PutOptions {
  url: string;
  body: object;
  token: string; // Token obrigatório
}

interface PutResponse<T> {
  data: T | null;
  error: Error | null;
  success: boolean;
  putData: (options: PutOptions) => Promise<void>;
}

const usePut = <T>(): PutResponse<{ user: T; token: string }> => {
  const [data, setData] = useState<{ user: T; token: string } | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const putData = async ({ url, body, token }: PutOptions) => {
    setSuccess(false);
    try {
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };

      const response = await fetch(`http://localhost:8000/${url}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch');
      }

      const responseData = await response.json();
      setData(responseData);
      setSuccess(true);
    } catch (error) {
      setError(error as Error);
    }
  };

  return { data, error, success, putData };
};

export default usePut;
