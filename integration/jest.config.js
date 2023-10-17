module.exports = {
    preset: 'jest-puppeteer',
    testRegex: './*\\.test\\.js$',
    setupFilesAfterEnv: ['./setupTests.js']
};
// module.exports = {
//     preset: 'jest-puppeteer',
//     testRegex: './*\\.test\\.ts$', // Указываем .ts вместо .js
//     setupFilesAfterEnv: ['./setupTests.js'],
//     transform: {
//         '^.+\\.ts$': 'ts-jest',
//     },
// };





