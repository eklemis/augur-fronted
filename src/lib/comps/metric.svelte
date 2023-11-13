<script>
	import * as d3 from 'd3';

	export let avg;
	export let last_month;
	export let forecast;
	export let title = '';
	let data = [last_month, forecast, avg];
	let colors = ['#1FBCFF', '#FF1F48', '#ffffff'];
	export let width = 229;
	export let height = 90;
	export let marginTop = 30;
	export let marginRight = 4;
	export let marginBottom = 42;
	export let marginLeft = 120;
	const bar_width = 20;

	$: x = d3.scaleLinear([0, data.length - 1], [marginLeft, width - marginRight]);
	$: y = d3.scaleLinear(d3.extent(data), [height - marginBottom, marginTop]);
	$: line = d3.line((d, i) => x(i), y);
</script>

<div class="w-[311px] border border-accent-600 rounded-xl overflow-clip">
	<div class="bg-accent-600 h-12 flex items-center justify-center">
		<h4 class="text-[19.2px] text-white text-center">{title}</h4>
	</div>
	<div class="flex flex-col items-center justify-center border w-full h-[128px]">
		<svg {width} {height}>
			<g fill="#626262">
				<text x="15" y={y(avg)} font-size="16px">{avg}</text>
			</g>
			<g fill="#8F8F8F">
				<text x="15" y={y(avg) + 15} font-size="9.26px">YTD Avg.</text>
			</g>
			<g fill="#A8A8A8" stroke="#A8A8A8" stroke-width="1.5">
				<circle cx={90} cy={y(avg)} r="4" />
			</g>
			<line
				x1={x(0) - 25}
				y1={y(avg)}
				x2={x(1) + 25}
				y2={y(avg)}
				stroke="#A8A8A8"
				stroke-width="1"
				stroke-dasharray="2, 2"
			/>
			<!-- <path fill="none" stroke="currentColor" stroke-width="1.5" d={line(data)} /> -->
			{#each data as d, i}
				{#if i < 2}
					<g fill="#626262">
						<text x={x(i) - 14} y={y(d) - 8} font-size="16px">{d}</text>
					</g>
					<g fill={colors[i]} stroke="currentColor" stroke-width="0">
						<rect
							ket={'r' + i}
							x={x(i) - bar_width / 2}
							y={y(d)}
							width={bar_width}
							height={height - y(d)}
							rx="1"
						/>
					</g>
				{/if}
			{/each}
		</svg>
		<svg {width} height="20" class="border-t">
			<g fill="#8F8F8F">
				<text x={x(0) - 25.5} y={12} font-size="9.26px">Last Month</text>
				<text x={x(1) - 20} y={12} font-size="9.26px">Forecast</text>
			</g>
		</svg>
	</div>
</div>
