import { json } from '@sveltejs/kit';
import { promises as fs } from 'fs';
import path from 'path';
/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
	const MAX_ITEMS = 12;
	let offset = Number(url.searchParams.get('offset') ?? '0');
	let keyword = url.searchParams.get('keyword') ?? '';

	if (offset < 0) {
		offset = 0;
	}
	const end = offset + MAX_ITEMS;
	// console.log('offset:', offset);
	try {
		const filePath = path.resolve(process.cwd(), 'distributor_mock_data.json'); // Adjust the path according to your file's location
		const data = await fs.readFile(filePath, 'utf-8');
		let jsonData = filter_by_keyword(JSON.parse(data), keyword, 'name');
		const avg_min = url.searchParams.get('avg_min');
		const avg_max = url.searchParams.get('avg_max');
		const lm_min = url.searchParams.get('lm_min');
		const lm_max = url.searchParams.get('lm_max');
		const forecast_min = url.searchParams.get('forecast_min');
		const forecast_max = url.searchParams.get('forecast_max');
		const is_filter_by_value =
			avg_min && avg_max && lm_min && lm_max && forecast_min && forecast_max;
		if (is_filter_by_value) {
			jsonData = filter_by_values(
				jsonData,
				avg_min,
				avg_max,
				lm_min,
				lm_max,
				forecast_min,
				forecast_max
			);
		}
		//console.log(avg_min, avg_max, lm_min, lm_max, forecast_min, forecast_max);
		const max_length = jsonData.length;

		if (offset > max_length - 1) {
			offset = Math.floor(max_length / MAX_ITEMS) * MAX_ITEMS;
		}
		const data_slices = jsonData.slice(offset, end < max_length ? end : max_length);

		return { metrics: data_slices, offset: offset, total_length: max_length };
	} catch (error) {
		return json({
			status: 500,
			body: {
				error: 'Error reading the JSON file.'
			}
		});
	}
}

function filter_by_keyword(data, keyword, column_name) {
	if (!keyword) {
		return data;
	}
	return data.filter((item) =>
		String(item[column_name]).trim().toLowerCase().includes(String(keyword).trim().toLowerCase())
	);
}

function filter_by_values(data, min_avg, max_avg, min_lm, max_lm, min_forecast, max_forecast) {
	// console.log(min_avg, max_avg, min_lm, max_lm, min_forecast, max_forecast);
	// console.log(data);
	return data.filter(
		(item) =>
			item.averageShippedYTD >= min_avg &&
			item.averageShippedYTD <= max_avg &&
			item.shippedLastMonth >= min_lm &&
			item.shippedLastMonth <= max_lm &&
			item.forecastNextMonth >= min_forecast &&
			item.forecastNextMonth <= max_forecast
	);
}
