<script>
	import { onMount } from 'svelte';
	import search_icon from '$lib/assets/icons/search.svg';
	import section_bg from '$lib/assets/bgs/section_bg.svg';
	import logo from '$lib/assets/icons/logo.svg';
	import Filter from '../lib/comps/filter.svelte';
	import Metric from '$lib/comps/metric.svelte';
	import Pagination from '$lib/comps/pagination.svelte';
	let bg_im_class = `bg-[url('${section_bg}')]`;
	/** @type {import('./$types').PageData} */
	export let data;

	const PER_PAGE = 12;
	let keyword = '';
	let static_keyword = '';

	const search_handler = (event) => {
		if (window) {
			let init_url = window.location.href;
			window.location.replace(
				//init_url.replace(/&keyword=[^&]*/g, '') + '?offest=0&keyword=' + keyword
				init_url.split('?')[0] + '?offest=0&keyword=' + keyword
			);
		}
	};
	const key_pressed_handler = (event) => {
		if (event.key === 'Enter') {
			search_handler();
		}
	};
	const search_keyup_handler = () => {
		if (!keyword && window) {
			let init_url = window.location.href;
			window.location.replace(init_url.split('?')[0]);
		}
	};
	const filter_apply_handler = (event) => {
		if (window) {
			let init_url = window.location.href;
			window.location.replace(
				init_url.split('?')[0] + '?offest=0&keyword=' + keyword + '&' + event.detail.filter_query
			);
		}
	};

	onMount(() => {
		// Get the current URL
		const currentUrl = window.location.href;

		// Create a URLSearchParams object from the current URL
		const searchParams = new URLSearchParams(new URL(currentUrl).search);

		// Get the value of the 'keyword' parameter
		keyword = searchParams.get('keyword') ?? '';
		static_keyword = keyword;
	});
</script>

<header class="sticky top-0 z-50 flex items-center">
	<section
		class="w-full bg-primary-600 h-[72px] flex items-center w-max-[1300px] px-4 md:px-9 lg:px-[70px] justify-between"
	>
		<a href="/">
			<img src={logo} alt="logo" />
		</a>
		<div
			class="w-64 bg-primary-50 rounded-lg h-[41px] flex items-center border-2 border-accent-600 drop-shadow-[0_0_6px_rgba(0,0,0,0.25)] hover:drop-shadow-[8px_8px_8px_rgba(0,0,0,0.25)] overflow-hidden"
		>
			<input
				type="text"
				placeholder="keyword"
				class="text-sm h-full px-2 w-full bg-primary-50 outline-none"
				bind:value={keyword}
				on:keypress={key_pressed_handler}
				on:keyup={search_keyup_handler}
			/>
			<button on:click={search_handler} class="flex items-center justify-center w-8 bg-transparent">
				<img alt="search icon" src={search_icon} />
			</button>
		</div>
	</section>
</header>
<main>
	<Filter on:filter_apply={filter_apply_handler} />
	<section
		class={'mt-8 w-full w-max-[1300px] flex flex-col items-center justify-start md:items-start px-4 lg:px-[72px] md:px-9' +
			bg_im_class}
	>
		<div>
			<h2 class="text-[27.65px] font-bold text-primary-700">Metrics for this month</h2>
			{#if static_keyword}
				<span>
					contain keyword <b>"{static_keyword}"</b>
				</span>
			{/if}
		</div>
		<div class="mt-1 flex w-full items-center justify-center flex-wrap gap-[16px]">
			{#each data.metrics as metric, idx ('metric-' + idx + metric.name)}
				<Metric
					avg={metric.averageShippedYTD}
					last_month={metric.shippedLastMonth}
					forecast={metric.forecastNextMonth}
					title={metric.name}
				/>
			{/each}
		</div>
	</section>

	<section class=" mt-16">
		<Pagination per_page={PER_PAGE} offset={data.offset} total_length={data.total_length} />
	</section>
</main>
<footer
	class="h-[72px] bg-primary-50 flex items-center mt-8 px-[72px] justify-center md:justify-start"
>
	<div>
		<span class="font-bold text-[13.33px]">©</span>
		<a
			href="https://www.linkedin.com/in/eklemis-santo-ndun-a8a2bab6/"
			class="font-bold italic text-[13.33px] text-primary-600 underline">Eklemis Santo Ndun</a
		>
		<span class="text-[13.33px]">2023</span>
	</div>
</footer>
