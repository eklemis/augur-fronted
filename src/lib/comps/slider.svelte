<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	const MIN = 0;
	const MAX = 2500;
	const X_MAX = 200;
	export let default_min;
	export let default_max;
	let selected_x_min = MIN;
	let selected_x_max = MAX;
	const coord_to_value = (x) => {
		let result = Math.round((x / X_MAX) * (MAX - MIN));
		return result;
	};
	const value_to_coord = (value) => {
		let result = (value / (MAX - MIN)) * X_MAX;
		return result;
	};

	let isTrackingLeft = false;
	let isTrackingRight = false;
	let btn_r = 8;
	let minButtonLeft = value_to_coord(default_min) - btn_r;
	let maxButtonLeft = value_to_coord(default_max) - btn_r;

	$: selected_x_min = minButtonLeft + btn_r;
	$: selected_x_max = maxButtonLeft + btn_r;
	$: min_value = coord_to_value(selected_x_min);
	$: max_value = coord_to_value(selected_x_max);

	let prev_x = 0;
	function left_m_down(event) {
		isTrackingLeft = true;
		prev_x = event.screenX;
	}

	function right_m_down(event) {
		isTrackingRight = true;
		prev_x = event.screenX;
	}

	const string_width = (s) => {
		let width = String(s).length * 5.12;
		Array.from(String(s)).forEach((char) => {
			const thins = ['1', 'i', '!', '.', ','];
			if (thins.includes(char)) {
				width -= 2;
			}
		});
		return width;
	};
	const buttons_moved = () => {
		let dispatch_value = {
			min: min_value,
			max: max_value
		};
		dispatch('value_change', dispatch_value);
		//console.log('event dispatch', dispatch_value);
	};

	async function mouse_move(event) {
		if (isTrackingLeft) {
			let change = minButtonLeft + (event.screenX - prev_x);
			if (change < maxButtonLeft && change >= -btn_r) {
				minButtonLeft = change;
			}
		}
		if (isTrackingRight) {
			let change = maxButtonLeft + (event.screenX - prev_x);
			if (change > minButtonLeft && change <= X_MAX - btn_r) {
				maxButtonLeft = change;
			}
		}
		prev_x = event.screenX;
	}

	function mouse_up() {
		if (isTrackingLeft || isTrackingRight) {
			//console.log('mouse_up triggered');
			isTrackingLeft = false;
			isTrackingRight = false;
			prev_x = 0;
			buttons_moved();
		}
	}
	const min_input_change_handler = (event) => {
		if (event.target.value < MIN || event.target.value > MAX || event.target.value > max_value) {
			event.preventDefault();
		} else {
			minButtonLeft = value_to_coord(event.target.value) - btn_r;
			buttons_moved();
		}
	};
	const max_input_change_handler = (event) => {
		if (event.target.value < MIN || event.target.value > MAX || event.target.value < min_value) {
			event.preventDefault();
		} else {
			maxButtonLeft = value_to_coord(event.target.value) - btn_r;
			buttons_moved();
		}
	};
</script>

<div class="pl-2 h-8 w-60 pt-2">
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		class="w-[200px] bg-accent-600 rounded-sm h-[2px] max-h-[2px] relative flex items-center"
		on:mousemove={mouse_move}
		on:mouseleave={mouse_up}
	>
		<button
			id="bt-left"
			class="h-[16px] w-[16px] min-h-[16px] min-w-[16px] rounded-full border-2 border-accent-600 bg-white absolute flex items-center justify-center"
			style="left: {minButtonLeft}px;"
			on:mousedown={left_m_down}
			on:mouseup={mouse_up}
		>
			<!-- <span class="border-l border-danger-600 min-w-[1px] min-h-[16px] block" /> -->
		</button>
		<input
			type="number"
			min={MIN}
			max={MAX}
			class="absolute top-[10px] text-[9.26px] text-primary-600 outline-none bg-transparent"
			style="left: {minButtonLeft -
				(string_width(coord_to_value(selected_x_min)) - 16) / 2}px; width: 30px;"
			bind:value={min_value}
			on:change={min_input_change_handler}
		/>

		<button
			id="bt-right"
			class="h-[16px] w-[16px] min-h-[16px] min-w-[16px] rounded-full border-2 border-accent-600 bg-white absolute flex items-center justify-center"
			style="left: {maxButtonLeft}px;"
			on:mousedown={right_m_down}
			on:mouseup={mouse_up}
		>
			<!-- <span class="border-r border-danger-600 min-w-[1px] min-h-[16px] block" /> -->
		</button>
		<input
			type="number"
			min={MIN}
			max={MAX}
			class="absolute top-[10px] text-[9.26px] text-primary-600 outline-none bg-transparent"
			style="left: {maxButtonLeft -
				(string_width(coord_to_value(selected_x_max)) - 16) / 2}px; width: 30px;"
			bind:value={max_value}
			on:change={max_input_change_handler}
		/>
	</div>
</div>
