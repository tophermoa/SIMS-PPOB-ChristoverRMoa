const axiosInstance = {
  get: jest.fn((url) => {
    if (url && url.includes('/services')) return Promise.resolve({ data: { status: 0, message: 'Success', data: [{ service_code: 'PBB', service_name: 'PBB', service_icon: '' }] } });
    if (url && url.includes('/transaction/history')) return Promise.resolve({ data: { status: 0, message: 'Success', data: { records: [{ transaction_type: 'TOPUP', description: 'Top Up Saldo', total_amount: 10000, created_on: '2023-10-01T12:00:00Z' }] } } });
    if (url && url.includes('/banner')) return Promise.resolve({ data: { status: 0, message: 'Success', data: [{ banner_name: 'Banner 1', banner_image: '', description: 'Banner 1' }] } });
    return Promise.resolve({ data: { status: 0, message: 'Success', data: [] } });
  }),
  post: jest.fn(() => Promise.resolve({ data: { status: 0, message: 'Success', data: {} } })),
  put: jest.fn(() => Promise.resolve({ data: { status: 0, message: 'Success', data: {} } })),
  delete: jest.fn(() => Promise.resolve({ data: { status: 0, message: 'Success', data: {} } })),
  interceptors: {
    request: { use: jest.fn() },
    response: { use: jest.fn() },
  },
};

export default axiosInstance;
