import type { Meta, StoryObj } from '@storybook/react'
import { LuSun as SunIcon } from 'react-icons/lu'

import AppControlPopover from './AppControlPopover'
import AppControlButton from '../AppControlButton'
import AppControlList from '../AppControlList'

/**
 * Menu component that utilizes Radix UI Popover. https://www.radix-ui.com/primitives/docs/components/popover. <br />
 * Internally, implements show/hide logic on hover.
 */
const meta: Meta = {
  title: 'Application Layout/App Popover',
  component: AppControlPopover,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

/** Minimal example. As simple as it gets. */
export const MinimalExample: Story = {
  args: {
    children: (
      <>
        <AppControlPopover.Trigger>Trigger</AppControlPopover.Trigger>
        <AppControlPopover.Content>Content</AppControlPopover.Content>
      </>
    )
  }
}

/** Full example */
export const FullExample: Story = {
  args: {
    children: (
      <>
        <AppControlPopover.Trigger asChild>
          <AppControlButton>
            <SunIcon />
          </AppControlButton>
        </AppControlPopover.Trigger>
        <AppControlPopover.Content>
          <AppControlList>
            <AppControlList.Item>
              <button className="btn" onClick={() => alert('Light')}>
                Light
              </button>
            </AppControlList.Item>
            <AppControlList.Item>
              <button className="btn" onClick={() => alert('Dark')}>
                Dark
              </button>
            </AppControlList.Item>
            <AppControlList.Item>
              <button className="btn" onClick={() => alert('System')}>
                System
              </button>
            </AppControlList.Item>
          </AppControlList>
        </AppControlPopover.Content>
      </>
    )
  }
}
