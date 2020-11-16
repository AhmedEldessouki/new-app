import * as React from 'react'
import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import faker from 'faker'
import Budget from '../components/Budget/Budget'
import {act} from 'react-dom/test-utils'

describe('Budget Component', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  const randomNumber = num => {
    return faker.random.number(num)
  }
  test('Add to Income and Outcome', () => {
    render(<Budget />)
    const budgetName = faker.lorem.words(2)
    const budgetValuePositive = randomNumber(999)
    const budgetValueNegative = randomNumber(-999)

    expect(screen.getByText(/budget Calculator/i)).toBeInTheDocument()
    expect(screen.getByText(/income/i)).toBeInTheDocument()
    expect(screen.getByText(/outcome/i)).toBeInTheDocument()

    expect(screen.getByTestId(/total/i)).toHaveTextContent(0)

    userEvent.type(screen.getByLabelText(/enter name/i), budgetName)
    userEvent.type(
      screen.getByLabelText(/enter value/i),
      `${budgetValuePositive}`,
    )
    userEvent.click(screen.getByLabelText(/add budget/i))

    expect(screen.getByTestId(/total/i)).toHaveTextContent(
      `${budgetValuePositive}`,
    )

    userEvent.type(screen.getByLabelText(/enter name/i), budgetName)
    userEvent.type(
      screen.getByLabelText(/enter value/i),
      `${budgetValueNegative}`,
    )
    userEvent.click(screen.getByLabelText(/add budget/i))

    const total = budgetValuePositive + budgetValueNegative

    expect(screen.getByTestId(/total/i)).toHaveTextContent(`${total}`)

    expect(screen.getAllByText(budgetName)).toHaveLength(2)
  })
  test('add and remove budgets', async () => {
    render(<Budget />)
    const budgetName = faker.lorem.words(2)
    const budgetValuePositive = randomNumber(999)
    const budgetValueNegative = randomNumber(-999)

    expect(screen.getByText(/budget Calculator/i)).toBeInTheDocument()
    expect(screen.getByText(/income/i)).toBeInTheDocument()
    expect(screen.getByText(/outcome/i)).toBeInTheDocument()

    expect(screen.getByTestId(/total/i)).toHaveTextContent(0)

    userEvent.type(screen.getByLabelText(/enter name/i), budgetName)
    userEvent.type(
      screen.getByLabelText(/enter value/i),
      `${budgetValuePositive}`,
    )
    userEvent.click(screen.getByLabelText(/add budget/i))

    expect(screen.getByTestId(/total/i)).toHaveTextContent(
      `${budgetValuePositive}`,
    )

    userEvent.type(screen.getByLabelText(/enter name/i), budgetName)
    userEvent.type(
      screen.getByLabelText(/enter value/i),
      `${budgetValueNegative}`,
    )
    userEvent.click(screen.getByLabelText(/add budget/i))

    const total = budgetValuePositive + budgetValueNegative

    expect(screen.getByTestId(/total/i)).toHaveTextContent(`${total}`)

    expect(screen.getAllByText(budgetName)).toHaveLength(2)

    const budgetNames = screen.getAllByText(budgetName)

    userEvent.hover(budgetNames[0])

    userEvent.click(screen.getByTestId(/del/i))

    expect(screen.getByText(/you sure/i)).toBeInTheDocument()

    expect(screen.getByTestId(/yes/i)).toBeInTheDocument()
    expect(screen.getByTestId(/no/i)).toBeInTheDocument()

    userEvent.click(screen.getByTestId(/yes/i))

    expect(await screen.findByLabelText(/loading/i)).toBeInTheDocument()
    expect(await screen.findByLabelText(/done/i)).toBeInTheDocument()

    userEvent.hover(budgetNames[1])

    userEvent.click(screen.getByTestId(/del/i))

    expect(screen.getByText(/you sure/i)).toBeInTheDocument()

    expect(screen.getByTestId(/yes/i)).toBeInTheDocument()
    expect(screen.getByTestId(/no/i)).toBeInTheDocument()

    userEvent.click(screen.getByTestId(/yes/i))

    expect(await screen.findByLabelText(/loading/i)).toBeInTheDocument()
    expect(await screen.findByLabelText(/done/i)).toBeInTheDocument()

    await waitForElementToBeRemoved(() => screen.queryAllByText(budgetName))

    expect(screen.queryByText(budgetName)).not.toBeInTheDocument()
  })
})
