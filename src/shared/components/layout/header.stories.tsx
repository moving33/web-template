import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Header } from './header'

const meta: Meta<typeof Header> = {
  title: 'Layout/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
}

export default meta
type Story = StoryObj<typeof Header>

export const Default: Story = {}
