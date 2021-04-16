import React from 'react'
import App from './App'
import { render } from '@testing-library/react'

test('renders app without crashing', () => {
    render(<App />)
})