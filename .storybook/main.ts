import type { StorybookConfig } from '@storybook/experimental-nextjs-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/experimental-addon-test'
  ],
  framework: '@storybook/experimental-nextjs-vite',
  staticDirs: ['..\\public'],
  docs: {
    autodocs: true
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript'
  }
}
export default config
