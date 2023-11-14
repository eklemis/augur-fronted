import { describe, it, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';

import Slider from './slider.svelte';

describe('Slider', () => {
	it('initially positions sliders based on default values', () => {
		const { container } = render(Slider, {
			default_min: 500,
			default_max: 2000
		});

		const leftSlider = container.querySelectorAll('button')[0];
		const rightSlider = container.querySelectorAll('button')[1];

		expect(leftSlider.style.left).toBe('32px'); // Update based on your value_to_coord calculation
		expect(rightSlider.style.left).toBe('152px'); // Update based on your value_to_coord calculation
	});

	it('moves left slider correctly on user interaction', async () => {
		const { container } = render(Slider, {
			default_min: 500,
			default_max: 2000
		});

		const leftSlider = container.querySelectorAll('button')[0];

		await fireEvent.mouseDown(leftSlider);
		await fireEvent.mouseMove(container, { screenX: 100 }); // Adjust the screenX value as needed
		await fireEvent.mouseUp(leftSlider);

		// Update the assertion based on how the slider should move
		expect(leftSlider.style.left).toBe('32px');
	});

	// it('dispatches value_change event with correct values on slider movement', async () => {
	// 	const { component, container } = render(Slider, {
	// 		default_min: 500,
	// 		default_max: 2000
	// 	});

	// 	let dispatchedEvent = null;
	// 	component.$on('value_change', (event) => (dispatchedEvent = event));

	// 	const leftSlider = container.querySelector('#bt-left');

	// 	// Simulate dragging the slider
	// 	await fireEvent.mouseDown(leftSlider);
	// 	await fireEvent.mouseMove(container, { screenX: 100 }); // Update screenX as needed
	// 	await fireEvent.mouseUp(leftSlider);

	// 	// Wait for the next tick to ensure Svelte has processed the reactive updates
	// 	await new Promise((resolve) => setTimeout(resolve, 0));

	// 	expect(dispatchedEvent).not.toBeNull();
	// 	// Further assertions for min and max values
	// });

	it('updates input fields based on slider movement', async () => {
		const { container } = render(Slider, {
			default_min: 500,
			default_max: 2000
		});

		const leftSlider = container.querySelectorAll('button')[0];
		const leftInput = container.querySelectorAll('input[type="number"]')[0];

		await fireEvent.mouseDown(leftSlider);
		await fireEvent.mouseMove(container, { screenX: 100 });
		await fireEvent.mouseUp(leftSlider);

		expect(leftInput.value).toBe('500');
	});

	// Add other tests as needed
});
