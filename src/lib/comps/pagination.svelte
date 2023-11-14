<script>
	import { onMount } from 'svelte';
	export let per_page;
	export let offset;
	export let total_length;
	let base_url = '';

	onMount(() => {
		let url = window.location.href;
		if (url.split('?').length < 2) {
			url = url + '?';
		}
		base_url = String(url).replace(/&offset=\d+/g, '');
	});

	const MAX_BTN_COUNT = 6;
	const MAX_OFFSET = Math.floor(total_length / per_page) * per_page;
	const MAX_PAGE = Math.floor(total_length / per_page);

	const page_by_offset = (curr_offset) => Math.floor(curr_offset / per_page) + 1;
	const populate_page_numbers = (source_page) => {
		let nav_frame_number =
			source_page % MAX_BTN_COUNT !== 0
				? Math.floor(source_page / MAX_BTN_COUNT) + 1
				: Math.floor(source_page / MAX_BTN_COUNT);
		let number_end = nav_frame_number * MAX_BTN_COUNT;
		let number_start = number_end + 1 - MAX_BTN_COUNT;

		let numbers = [];
		for (let i = number_start; i <= number_end; i++) {
			if (page_by_offset(MAX_OFFSET) >= i) {
				numbers.push(i);
			}
		}
		return numbers;
	};
	$: page = page_by_offset(offset);
	$: curr_page_numbers = populate_page_numbers(page);

	const offset_from = (page_number, per_page) => {
		return (page_number - 1) * per_page;
	};
</script>

<nav class="flex items-center justify-center gap-x-2">
	<a
		class={`w-[30px] h-[30px] flex items-center justify-center border-b-[3px] border-transparent 
        ${
					page === 1
						? 'text-gray-500'
						: ' hover:border-primary-300 active:border-primary-300 active:font-bold'
				}`}
		href={page === 1 ? null : base_url + '&offset=0'}>{'<<'}</a
	>
	<a
		class={`w-[30px] h-[30px] flex items-center justify-center border-b-[3px] border-transparent 
			${
				page === 1
					? 'text-gray-500'
					: ' hover:border-primary-300 active:border-primary-300 active:font-bold'
			}`}
		href={page === 1 ? null : base_url + '&offset=' + offset_from(page - 1, per_page)}>{'<'}</a
	>
	{#each curr_page_numbers as page_number, idx ('btn' + page_number)}
		<a
			class={`w-[30px] h-[30px] flex items-center justify-center border-b-[3px] border-transparent hover:border-primary-300 active:border-primary-300 active:font-bold ${
				page === page_number ? ' font-bold border-primary-300' : ''
			}`}
			href={base_url + '&offset=' + offset_from(page_number, per_page)}>{page_number}</a
		>
	{/each}
	<a
		class={`w-[30px] h-[30px] flex items-center justify-center border-b-[3px] border-transparent 
        ${
					offset >= MAX_OFFSET
						? 'text-gray-500'
						: ' hover:border-primary-300 active:border-primary-300 active:font-bold'
				}`}
		href={offset >= MAX_OFFSET ? null : base_url + '&offset=' + offset_from(page + 1, per_page)}
		>{'>'}</a
	>
	<a
		class={`w-[30px] h-[30px] flex items-center justify-center border-b-[3px] border-transparent 
        ${
					offset >= MAX_OFFSET
						? 'text-gray-500'
						: ' hover:border-primary-300 active:border-primary-300 active:font-bold'
				}`}
		href={page >= MAX_PAGE ? null : base_url + '&offset=' + MAX_OFFSET}>{'>>'}</a
	>
</nav>
