import { getRequest } from './request';

describe('API Request Functions', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  describe('getRequest', () => {
    it('should make a GET request with correct parameters', async () => {
      const mockResponse = { data: 'test' };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      });

      const url = 'https://api.example.com/data';
      const params = { id: 1, name: 'test' };
      const headers = { 'Authorization': 'Bearer token' };
      const options = { mode: 'cors' as RequestMode };

      const result = await getRequest(url, params, headers, options);

      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.example.com/data?id=1&name=test',
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer token',
          }),
          mode: 'cors',
        })
      );
      expect(result).toEqual(mockResponse);
    });

    it('should make a GET request without params', async () => {
      const mockResponse = { data: 'test' };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      });

      const url = 'https://api.example.com/data';

      await getRequest(url);

      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.example.com/data',
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
        })
      );
    });

    it('should handle fetch errors', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      const url = 'https://api.example.com/data';

      await expect(getRequest(url)).rejects.toThrow('Network error');
    });

    it('should handle non-OK responses', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

      const url = 'https://api.example.com/data';

      await expect(getRequest(url)).rejects.toThrow('HTTP error! status: 404');
    });

    it('should handle JSON parsing errors', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockRejectedValueOnce(new Error('Invalid JSON')),
      });

      const url = 'https://api.example.com/data';

      await expect(getRequest(url)).rejects.toThrow('Invalid JSON');
    });

    it('should handle requests with only headers', async () => {
      const mockResponse = { data: 'test' };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      });

      const url = 'https://api.example.com/data';
      const headers = { 'Custom-Header': 'Value' };

      await getRequest(url, undefined, headers);

      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.example.com/data',
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
            'Custom-Header': 'Value',
          }),
        })
      );
    });

    it('should handle requests with only options', async () => {
      const mockResponse = { data: 'test' };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      });

      const url = 'https://api.example.com/data';
      const options = { credentials: 'include' as RequestCredentials };

      await getRequest(url, undefined, undefined, options);

      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.example.com/data',
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
          credentials: 'include',
        })
      );
    });
  });
});