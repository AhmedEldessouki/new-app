/* eslint-disable react/react-in-jsx-scope */
import * as React from 'react'
import {render, screen} from '@testing-library/react'

import App from '../App'

test('Smoke Test', () => {
  render(<App />)

  expect(screen.getByText(/todo/i)).toBeInTheDocument()
  expect(screen.getByText(/budget calculator/i)).toBeInTheDocument()
})
