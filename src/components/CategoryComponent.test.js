
// CategoryComponent.test.jsx
import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import CategoryComponent from './CategoryComponent';
import { fetchCategory, addCategory } from './categorySlice';
import { renderWithProviders } from './test-utils'; // Adjust the path to test-utils

jest.mock('./categorySlice'); // Mock the actions file

beforeEach(() => {
  fetchCategory.mockClear();
  addCategory.mockClear();

  // Mock implementation for fetchCategory
  fetchCategory.mockImplementation(() => async (dispatch) => {
    dispatch({ type: 'categories/fetchCategory/pending' });
    // Mock a successful response
    dispatch({
      type: 'categories/fetchCategory/fulfilled',
      payload: [{ id: 1, name: 'Category 1' }],
    });
  });

  // Mock implementation for addCategory
  addCategory.mockImplementation((category) => (dispatch) => {
    dispatch({
      type: 'categories/addCategory',
      payload: category,
    });
  });
});

describe('CategoryComponent', () => {
  it('renders category and description inputs and submit button', () => {
    renderWithProviders(<CategoryComponent onSubmitFn={jest.fn()} />, {
      initialState: {
        categories: {
          entities: [],
          loading: false,
        },
      },
    });

    expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('allows user to input category and description and submit the form', async () => {
    const handleSubmit = jest.fn();
    renderWithProviders(<CategoryComponent onSubmit={handleSubmit} />, {
      initialState: {
        categories: {
          entities: [],
          loading: false,
        },
      },
    });

    fireEvent.change(screen.getByLabelText(/category/i), { target: { value: 'Test Category' } });
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'Test Description' } });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith({
        name: 'Test Category',
        description: 'Test Description',
      });
    });

    // Ensure inputs are cleared after submission
    // await waitFor(() => {
    //   expect(screen.getByLabelText(/category/i)).toHaveValue('');
    //   expect(screen.getByLabelText(/description/i)).toHaveValue('');
    // });
  });
});
