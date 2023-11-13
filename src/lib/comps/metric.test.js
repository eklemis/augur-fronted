import { render } from '@testing-library/svelte';
import Metric from './metric.svelte';

describe('metric', () => {
	test('renders title correctly', () => {
		const { getByText } = render(Metric, {
			title: 'Test Title',
			avg: 506,
			last_month: 607,
			forecast: 700
		});
		expect(getByText('Test Title')).toBeInTheDocument();
	});

	test('renders bars and text for provided data', () => {
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
		expect(container).toHaveTextContent(props.avg.toString());
		expect(container).toHaveTextContent('Last Month');
		expect(container).toHaveTextContent('Forecast');

		// Additional checks can be added for rects (bars) and other elements
	});

	// Additional tests can be added as needed
});
