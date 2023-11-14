<script>
	import { createEventDispatcher, onMount } from 'svelte';
	const dispatch = createEventDispatcher();

	import Slider from './slider.svelte';
	const MIN_V = 0;
	const MAX_V = 2500;

	let avg = {
		min: MIN_V,
		max: MAX_V
	};
	let last_month = {
		min: MIN_V,
		max: MAX_V
	};
	let forecast = {
		min: MIN_V,
		max: MAX_V
	};
	let parent_rendered = false;
	onMount(() => {
		if (window) {
			const currentUrl = window.location.href;

			// Create a URLSearchParams object from the current URL
			const searchParams = new URLSearchParams(new URL(currentUrl).search);

			// Get the value of the filter parameters
			avg.min = Number(searchParams.get('avg_min') ?? MIN_V);
			avg.max = Number(searchParams.get('avg_max') ?? MAX_V);

			last_month.min = Number(searchParams.get('lm_min') ?? MIN_V);
			last_month.max = Number(searchParams.get('lm_max') ?? MAX_V);

			forecast.min = Number(searchParams.get('forecast_min') ?? MIN_V);
			forecast.max = Number(searchParams.get('forecast_max') ?? MAX_V);

			//console.log(avg, last_month, forecast);
			parent_rendered = true;
		}
	});
	const get_slider_value = (event) => {
		return { ...event.detail };
	};
	const cosntruct_filter_query = () => {
		let filter_query = `avg_min=${avg.min}&avg_max=${avg.max}&lm_min=${last_month.min}&lm_max=${last_month.max}&forecast_min=${forecast.min}&forecast_max=${forecast.max}`;
		dispatch('filter_apply', {
			filter_query: filter_query
		});
	};
</script>

<section
	class="py-6 bg-primary-50 bg-right bg-[length:260px_227px] bg-no-repeat md:bg-section-bg flex flex-col items-start w-max-[1300px] px-4 lg:px-[70px] md:px-9"
>
	<h3 class="font-bold text-[23.04px] text-accent-700">Filter</h3>

	<div class="flex flex-col gap-y-2">
		<div class="flex items-center gap-x-5">
			<p class=" text-[16px] text-gray-400 w-[90px]">YTD Avg</p>
			{#if parent_rendered}
				<Slider
					default_min={avg.min}
					default_max={avg.max}
					on:value_change={(ev) => (avg = get_slider_value(ev))}
				/>
			{/if}
		</div>
		<div class="flex items-center gap-x-5">
			<p class=" text-[16px] text-gray-400 w-[90px]">Last Month</p>
			{#if parent_rendered}
				<Slider
					default_min={last_month.min}
					default_max={last_month.max}
					on:value_change={(ev) => (last_month = get_slider_value(ev))}
				/>{/if}
		</div>
		<div class="flex items-center gap-x-5">
			<p class=" text-[16px] text-gray-400 w-[90px]">Forecast</p>
			{#if parent_rendered}
				<Slider
					default_min={forecast.min}
					default_max={forecast.max}
					on:value_change={(ev) => (forecast = get_slider_value(ev))}
				/>
			{/if}
		</div>
	</div>
	<div class=" pl-[108px] mt-6">
		<button
			class=" bg-primary-600 border-2 border-primary-600 hover:border-primary-200 active:bg-white active:text-primary-600 transition py-2 px-3 rounded text-white shadow-md"
			on:click={cosntruct_filter_query}>Apply filter</button
		>
	</div>
</section>
