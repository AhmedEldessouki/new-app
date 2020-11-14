import * as React from 'react'
import {getByLabelText, render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import faker from 'faker'
import Todo from '../components/Todo/Todo'

describe('Todo Component', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })
  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })
  test('Add to ToDo', () => {
    render(<Todo />)
    const todo = faker.lorem.sentence(30)
    expect(screen.getByText(/todo/i)).toBeInTheDocument()

    userEvent.type(screen.getByLabelText(/enter todo/i), todo)
    userEvent.click(screen.getByLabelText(/add todo/i))

    expect(screen.getByText(todo)).toBeInTheDocument()

    userEvent.hover(screen.getByText(todo))
    const buttons = screen.getAllByRole('button')

    expect(buttons[0]).toHaveAttribute('type', 'submit')
    expect(buttons[1]).toHaveAttribute('data-testid', 'del')
    expect(buttons[2]).toHaveAttribute('data-testid', 'done')
  })
  test('add Todo and mark it done', async () => {
    render(<Todo />)
    const todo = faker.lorem.sentence(30)
    expect(screen.getByText(/todo/i)).toBeInTheDocument()

    userEvent.type(screen.getByLabelText(/enter todo/i), todo)
    userEvent.click(screen.getByLabelText(/add todo/i))

    expect(screen.getByText(todo)).toBeInTheDocument()

    userEvent.hover(screen.getByText(todo))
    const buttons = screen.getAllByRole('button')

    expect(buttons[0]).toHaveAttribute('type', 'submit')
    expect(buttons[1]).toHaveAttribute('data-testid', 'del')
    expect(buttons[2]).toHaveAttribute('data-testid', 'done')

    userEvent.click(buttons[1])

    expect(screen.getByTestId(/yes/i)).toBeInTheDocument()
    expect(screen.getByTestId(/no/i)).toBeInTheDocument()

    userEvent.click(screen.getByTestId(/no/i))

    expect(screen.queryByTestId(/yes/i)).not.toBeInTheDocument()
    expect(screen.queryByTestId(/no/i)).not.toBeInTheDocument()

    userEvent.click(buttons[2])

    expect(await screen.findByLabelText(/loading/i)).toBeInTheDocument()
    expect(await screen.findByLabelText(/done/i)).toBeInTheDocument()
    expect(await screen.findByTestId(/del/i)).toBeInTheDocument()

    expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument()
    expect(screen.queryByLabelText(/done/i)).not.toBeInTheDocument()

    expect(screen.queryByTestId(/done/i)).not.toBeInTheDocument()
    expect(screen.getByTestId(/del/i)).toBeInTheDocument()
  })
})
