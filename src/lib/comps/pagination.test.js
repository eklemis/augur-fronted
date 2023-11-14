import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import Pagination from './pagination.svelte';

describe('Pagination', () => {
	it('renders correct number of page buttons', () => {
		const { getAllByText } = render(Pagination, {
			per_page: 10,
			offset: 0,
			total_length: 100
		});

		const pageButtons = getAllByText(/^\d+$/); // Regex to match only the page numbers
		expect(pageButtons.length).toBe(6); // Assuming MAX_BTN_COUNT is 6
	});

	it('first page button is disabled when on first page', () => {
		const { container } = render(Pagination, {
			per_page: 10,
			offset: 0,
			total_length: 100
		});

		// Use a more specific query
		const firstPageButton = container.querySelectorAll('a')[0];
		expect(firstPageButton.textContent).toBe('<<');
		expect(firstPageButton.getAttribute('href')).toBeNull();
	});

	it('last page button is disabled when on last page', () => {
		const { container } = render(Pagination, {
			per_page: 10,
			offset: 90, // Offset indicating the last page
			total_length: 100
		});

		// Use a more specific query to select the last page button
		// Assuming the href for the last page button is unique when it's disabled
		const allLinks = container.querySelectorAll('a');
		const lastPageButton = allLinks[allLinks.length - 1];
		expect(lastPageButton.textContent).toBe('>>');
		expect(lastPageButton.getAttribute('href')).toBeNull();
	});

	it('last page button correctly set when total length is a multiple of per_page', () => {
		const { container } = render(Pagination, {
			per_page: 10,
			offset: 80, // Second to last page when total_length is 100
			total_length: 100
		});

		const lastPageButton =
			container.querySelectorAll('a')[container.querySelectorAll('a').length - 1];
		expect(lastPageButton.getAttribute('href')).not.toBeNull();
	});

	it('last page button correctly set when total length is not a multiple of per_page', () => {
		const { container } = render(Pagination, {
			per_page: 10,
			offset: 85, // Last page when total_length is 95
			total_length: 95
		});

		const lastPageButton =
			container.querySelectorAll('a')[container.querySelectorAll('a').length - 1];
		expect(lastPageButton.getAttribute('href')).toBeNull();
	});

	it('last page button disabled when there is only one page', () => {
		const { container } = render(Pagination, {
			per_page: 100,
			offset: 0, // Only page when total_length is 100
			total_length: 100
		});

		const lastPageButton =
			container.querySelectorAll('a')[container.querySelectorAll('a').length - 1];
		expect(lastPageButton.getAttribute('href')).toBeNull();
	});

	it('last page button enabled when offset is zero', () => {
		const { container } = render(Pagination, {
			per_page: 10,
			offset: 0, // First page
			total_length: 100
		});

		const lastPageButton =
			container.querySelectorAll('a')[container.querySelectorAll('a').length - 1];
		expect(lastPageButton.getAttribute('href')).not.toBeNull();
	});

	it('last page button disabled when offset is greater than MAX_OFFSET', () => {
		const { container } = render(Pagination, {
			per_page: 10,
			offset: 110, // Beyond the last page when total_length is 100
			total_length: 100
		});

		const lastPageButton =
			container.querySelectorAll('a')[container.querySelectorAll('a').length - 1];
		expect(lastPageButton.getAttribute('href')).toBeNull();
	});
});
