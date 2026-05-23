module.exports = {
  testEnvironment: 'jsdom',
  setupFiles: ['<rootDir>/src/setupEnv.js'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/src/__mocks__/fileMock.js',
    'axiosInstance$': '<rootDir>/src/__mocks__/axiosInstance.js',
    '^swiper/react$': '<rootDir>/src/__mocks__/swiperMock.js',
    '^swiper/modules$': '<rootDir>/src/__mocks__/swiperMock.js',
    '^swiper/css.*$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  transformIgnorePatterns: ['/node_modules/'],
};
