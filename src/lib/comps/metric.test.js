import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import Metric from './metric.svelte';

describe('metric', () => {
	it('renders title correctly', () => {
		const { getByText } = render(Metric, {
			title: 'Test Title',
			avg: 506,
			last_month: 607,
			forecast: 700
		});
		expect(getByText('Test Title')).toBeTruthy();
	});

	it('renders bars and text for provided data', () => {
		const props = {
			avg: 50,
			last_month: 40,
			forecast: 60,
			title: 'Data Visualization'
		};

		const { container } = render(Metric, props);

		// Check for SVG elements
		const svgElements = container.querySelectorAll('svg');
		expect(svgElements.length).toBeGreaterThan(0);

		// Check for specific text elements
		expect(container.textContent).toContain(props.avg.toString());
		expect(container.textContent).toContain('Last Month');
		expect(container.textContent).toContain('Forecast');
	});
});
